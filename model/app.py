from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import spacy
from PIL import Image
import cv2
import numpy as np
import re
from paddleocr import PaddleOCR
import os
import shutil

######################################################################## pydantic request models ########################################################################
class TextRequest(BaseModel):
    text: str

class FileDeleteRequest(BaseModel):
    filepath: str

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

@app.post("/ner")
async def ner(request: TextRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="No text provided")
    doc = nlp(request.text)
    entities = {
        "NRIC": [], 
        "BANK_NUMBER": [],
        "ADDRESS": [],
        "CREDIT_CARD": [] 
    }

    # Add spaCy detected entities
    for ent in doc.ents:
        label = ent.label_.upper()
        if label in entities:
            entities[label].append(ent.text.strip())

    # Fallback to regex for missing entities
    regex_entities = regex_fallback(request.text)
    for label, matches in regex_entities.items():
        if not entities[label]:
            entities[label] = matches

    return {
            "entities": entities,
            "status": "success" if any(entities.values()) else "nil"
        }


# Process image
@app.post("/vlm")
async def vlm(file: UploadFile = File(...)):
    # Save uploaded image temporarily
    input_path = f"temp_{file.filename}"
    output_path = f"redacted_{file.filename}"
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Load image
    image = cv2.imread(input_path)
    if image is None:
        raise HTTPException(status_code=400, detail="Invalid image file")

    entities = {
        "NRIC": [], 
        "BANK_NUMBER": [],
        "ADDRESS": [],
        "CREDIT_CARD": [] 
    }

    expand_px=20
    padding=15

    # Run OCR
    ocr_results = ocr.predict(input_path)  # returns list of dicts

    for page in ocr_results:
        rec_texts = page["rec_texts"]
        rec_polys = page["rec_polys"]

        for text, poly in zip(rec_texts, rec_polys):
            doc = nlp(clean_text(text))
            sensitive = [ent for ent in doc.ents if ent.label_ in PII_ENTITIES]

            if sensitive:
                poly = np.array(poly, dtype=np.int32)

                # Clip to image bounds
                poly[:, 0] = np.clip(poly[:, 0], 0, image.shape[1]-1)
                poly[:, 1] = np.clip(poly[:, 1], 0, image.shape[0]-1)

                # Expand polygon outward non-uniformly
                center = poly.mean(axis=0)
                direction = poly - center
                norm = np.linalg.norm(direction, axis=1, keepdims=True)
                norm[norm == 0] = 1

                # Expand more horizontally for long text
                poly_expanded = poly + direction / norm * np.array([expand_px*2, expand_px])
                poly_expanded = poly_expanded.astype(np.int32)

                # Convex hull for tight coverage
                hull = cv2.convexHull(poly_expanded)

                # Clip hull to image bounds
                hull[:, 0, 0] = np.clip(hull[:, 0, 0], 0, image.shape[1]-1)
                hull[:, 0, 1] = np.clip(hull[:, 0, 1], 0, image.shape[0]-1)

                # Create mask
                mask = np.zeros(image.shape[:2], dtype=np.uint8)
                cv2.fillPoly(mask, [hull], 255)

                # Extra padding using bounding rectangle
                x, y, w, h = cv2.boundingRect(hull)
                x = max(x - padding, 0)
                y = max(y - padding, 0)
                w = min(w + 2*padding, image.shape[1] - x)
                h = min(h + 2*padding, image.shape[0] - y)
                mask[y:y+h, x:x+w] = 255

                # Apply black fill
                image[mask == 255] = (0, 0, 0)

                # Update entities dictionary
                for ent in sensitive:
                    label = ent.label_.upper()
                    if label in entities:
                        entities[label].append(ent.text.strip())

    # Save redacted image
    redacted_image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    redacted_image.save(output_path)

    # Cleanup temp input
    os.remove(input_path)

    return {
        "entities": entities,
        "file_path": output_path,
        "status": "success" if any(entities.values()) else "nil",
    }


@app.post("/cleanup")
async def cleanup_file(request: FileDeleteRequest):
    try:
        if os.path.exists(request.filepath):
            os.remove(request.filepath)
            return JSONResponse(content={"message": f"File {request.filepath} deleted successfully"})
        else:
            raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))