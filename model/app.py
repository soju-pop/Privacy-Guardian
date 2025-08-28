from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Dict
import spacy
from PIL import Image
import cv2
import numpy as np
import re
from paddleocr import PaddleOCR
import os
import atexit
import glob
import logging
import sys
import base64

# Configure logging
logging.basicConfig(
    level=logging.INFO,        
    format="%(asctime)s [%(levelname)s] %(message)s",
    stream=sys.stdout            
)
logger = logging.getLogger(__name__)


######################################################################## pydantic request models ########################################################################
class NERRequest(BaseModel):
    text: str

class NERResponse(BaseModel):
    text: str
    entities: Dict[str, List[str]]  # e.g., {"NRIC": ["S1234567A"], ...}
    status: str

# For /vlm endpoint
class VLMENTity(BaseModel):
    text: str
    label: str
    polygon: List[List[int]]  # [[x1, y1], [x2, y2], ...]

class VLMRequest(BaseModel):
    image_base64: str  # base64-encoded image string

class VLMResponse(BaseModel):
    file_path: str
    results: List[VLMENTity]
    status: str

class RedactRequest(BaseModel):
    file_path: str
    polygon: List[List[List[int]]]  # list of polygons, each polygon is a list of [x, y] points

class RedactResponse(BaseModel):
    file_path: str
    image_base64: str

######################################################################### Helper ########################################################################
punct_to_remove = r"[\.,;:!?\"’`]"
def clean_text(text: str):
    """Remove unwanted punctuation but keep - and #."""
    return re.sub(punct_to_remove, "", text)


def regex_fallback(text):
    patterns = {
        "NRIC": re.compile(r"\b[STFGM]\d{7}[A-Z]\b", re.IGNORECASE),
        "BANK_NUMBER": re.compile(r"\b\d{7,12}\b"),
        "ADDRESS": re.compile(r"\b\d{1,4}\s+[A-Za-z0-9\s]+(?:Street|St|Road|Rd|Avenue|Ave|Lane|Ln|Drive|Dr|Boulevard|Blvd|Crescent|Cres|Close|Cl|Walk)\b", re.IGNORECASE),
        "CREDIT_CARD": re.compile(r"\b(?:\d[ -]*?){13,19}\b")
    }
    results = {}
    for label, pattern in patterns.items():
        matches = pattern.findall(text)
        if matches:
            results[label] = matches
    return results

def polygons_equal(poly1, poly2):
    if len(poly1) != len(poly2):
        return False
    return all(p1 == p2 for p1, p2 in zip(poly1, poly2))

######################################################################### Load pretrain SpaCy NER Model ########################################################################
if spacy.prefer_gpu():
    print("GPU is available and enabled.")
else:
    print("GPU not available, using CPU instead.")
nlp = spacy.load("NER-model")

######################################################################### Load OCR ########################################################################
ocr = PaddleOCR(use_angle_cls=True, lang="en")

# PII labels to search for a match
PII_ENTITIES = [
    "ADDRESS", 
    "BANK_NUMBER", 
    "CREDIT_CARD", 
    "NRIC", 
    "PHONE_NUMBER"
]

######################################################################## FastAPI endpoints ########################################################################
app = FastAPI()

@app.post("/ner", response_model=NERResponse)
async def ner(request: NERRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="No text provided")
    doc = nlp(request.text)
    entities = {
        "NRIC": [], 
        "BANK_NUMBER": [],
        "ADDRESS": [],
        "CREDIT_CARD": [] 
    }
    processed_text = request.text
    # Add spaCy detected entities
    for ent in doc.ents:
        label = ent.label_.upper()
        if label in entities:
            entities[label].append(ent.text.strip())
            processed_text = processed_text.replace(ent.text, f"[{label}]")

    # Fallback to regex for missing entities
    regex_entities = regex_fallback(request.text)
    for label, matches in regex_entities.items():
        if not entities[label] and matches:
            entities[label] = matches
            for m in matches:
                processed_text = processed_text.replace(m, f"[{label}]")

    # Drop keys with no matches
    entities = {k: v for k, v in entities.items() if v}

    return {
        "text": processed_text,
        "entities": entities,
        "status": "success" if entities else "nil"
    }

@app.post("/vlm", response_model = VLMResponse)
async def vlm(request: VLMRequest):
    # Ensure data folder exists
    os.makedirs("data", exist_ok=True)

    # Determine the next file index to avoid overwriting
    existing_files = [f for f in os.listdir("data") if f.startswith("temp_") and f.endswith(".png")]
    if existing_files:
        # Extract numbers from filenames like temp_1.png, temp_2.png
        indices = [int(f.split("_")[1].split(".")[0]) for f in existing_files]
        next_index = max(indices) + 1
    else:
        next_index = 1

    # Decode the base64 string
    try:
        image_data = base64.b64decode(request.image_base64)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid base64 string")

    # Save to a unique temporary file
    input_path = f"data/temp_{next_index}.png"
    with open(input_path, "wb") as f:
        f.write(image_data)

    image = cv2.imread(input_path)
    if image is None:
        raise HTTPException(status_code=400, detail="Invalid image file")

    entities = {"NRIC": [], "BANK_NUMBER": [], "ADDRESS": [], "CREDIT_CARD": []}
    results = []

    # Run OCR
    ocr_results = ocr.predict(input_path)

    for page in ocr_results:
        rec_texts = page["rec_texts"]
        rec_polys = page["rec_polys"]

        for text, poly in zip(rec_texts, rec_polys):
            doc = nlp(clean_text(text))
            sensitive = [ent for ent in doc.ents if ent.label_ in PII_ENTITIES]

            for ent in sensitive:
                label = ent.label_.upper()
                if label in entities:
                    results.append({
                        "text": ent.text.strip(),
                        "label": label,
                        "polygon": np.array(poly, dtype=int).tolist()
                    })

    return {
        "file_path": input_path,
        "results": results,
        "status": "success" if results else "nil"
    }


########################################## Redaction logic ##########################################
redaction_store = {}  # { "file.png": [polygon}, ... ] }

def render_redactions(file_path: str):
    logger.info(f"Rendering redactions for file: {file_path}")

    image = cv2.imread(file_path)
    if image is None:
        raise HTTPException(status_code=400, detail="Image not found")

    expand_px, padding = 20, 15

    for item in redaction_store.get(file_path, []):
        poly = np.array(item["polygon"], dtype=np.int32)

        # Clip poly
        poly[:, 0] = np.clip(poly[:, 0], 0, image.shape[1]-1)
        poly[:, 1] = np.clip(poly[:, 1], 0, image.shape[0]-1)

        # Expand polygon outward
        center = poly.mean(axis=0)
        direction = poly - center
        norm = np.linalg.norm(direction, axis=1, keepdims=True)
        norm[norm == 0] = 1
        poly_expanded = poly + direction / norm * np.array([expand_px*2, expand_px])
        poly_expanded = poly_expanded.astype(np.int32)

        # Convex hull
        hull = cv2.convexHull(poly_expanded)
        hull[:, 0, 0] = np.clip(hull[:, 0, 0], 0, image.shape[1]-1)
        hull[:, 0, 1] = np.clip(hull[:, 0, 1], 0, image.shape[0]-1)

        # Mask
        mask = np.zeros(image.shape[:2], dtype=np.uint8)
        cv2.fillPoly(mask, [hull], 255)

        # Extra padding
        x, y, w, h = cv2.boundingRect(hull)
        x = max(x - padding, 0)
        y = max(y - padding, 0)
        w = min(w + 2*padding, image.shape[1] - x)
        h = min(h + 2*padding, image.shape[0] - y)
        mask[y:y+h, x:x+w] = 255

        # Apply redaction
        image[mask == 255] = (0, 0, 0)

    output_path = file_path.split(".")[0] + "_redacted" + ".png"
    Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB)).save(output_path)

    # Open the image in binary mode and encode it to base64
    with open(output_path, "rb") as image_file:
        image_base64 = base64.b64encode(image_file.read()).decode("utf-8")

    return image_base64

# Redact (add + re-render)
@app.post("/vlm/redact", response_model=RedactResponse)
async def vlm_redact(request: RedactRequest):
    logger.info(f"Received redact request for file_path: {request.file_path}, polygons: {request.polygon}")
    if request.file_path not in redaction_store:
        redaction_store[request.file_path] = []

    # Add the polygon to the store
    for poly in request.polygon:
        redaction_store[request.file_path].append({
            "polygon": poly
        })

    image_base64 = render_redactions(request.file_path)
    return {
        "file_path": request.file_path,   
        "image_base64": image_base64  # base64 string of the redacted image
    }


# Unredact (remove + re-render)
@app.post("/vlm/unredact", response_model=RedactResponse)
async def vlm_unredact(request: RedactRequest):
    if request.file_path not in redaction_store:
        raise HTTPException(status_code=404, detail="No redactions found for this file")

    # remove requested polygons
    for remove_poly in request.polygon:  # support multiple polygons
        redaction_store[request.file_path] = [
            existing for existing in redaction_store[request.file_path]
            if not polygons_equal(existing["polygon"], remove_poly)
        ]


    image_base64 = render_redactions(request.file_path)
    return {
        "file_path": request.file_path,   
        "image_base64": image_base64  # base64 string of the redacted image
    }


#################################################### Cleanup on shutdown #################################################################################
def cleanup_images():
    # Absolute path to the data folder
    data_dir = os.path.join(os.getcwd(), "data")
    patterns = ["temp_*"]

    for pattern in patterns:
        full_pattern = os.path.join(data_dir, pattern)
        files = glob.glob(full_pattern)
        for file in files:
            try:
                if os.path.isfile(file):
                    os.remove(file)
                    logger.info(f"Deleted file: {file}")
            except Exception as e:
                logger.error(f"Failed to delete {file}: {e}")

# Register the cleanup function
atexit.register(cleanup_images)