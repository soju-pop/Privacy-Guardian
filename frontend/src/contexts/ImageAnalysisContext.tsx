import { createContext, useContext, useState } from "@lynx-js/react";
import type { ReactNode } from "@lynx-js/react";

import { useToast } from "./ToastContext.tsx";
import { useVlmApi, useVlmRedactApi } from "../hooks/useApi.ts";
import { imageFileToBase64 } from "../utils/image.ts";
import {
  mapImageAnalysisResponse,
  type ImageAnalysis,
} from "../types/ImageAnalysis.ts";
import {
  mapImageRedactResponse,
  type ImageRedact,
} from "../types/ImageRedact.ts";

interface ImageAnalysisState {
  file: any;
  setFile: (f: any) => void;
  analysis: ImageAnalysis | null;
  setAnalysis: (a: ImageAnalysis | null) => void;
  analysisLoading: boolean;
  setAnalysisLoading: (l: boolean) => void;
  showModal: boolean;
  setShowModal: (s: boolean) => void;
  redactedPreview: ImageRedact | null;
  setRedactedPreview: (r: ImageRedact | null) => void;
  redactingLoading: boolean;
  setRedactingLoading: (l: boolean) => void;
  handleSelect: (img: any) => void;
  handleUpload: () => void;
  handleRemove: () => void;
  handleAnalyse: () => Promise<void>;
  handleToggleDetected: (idx: number) => void;
  handleRedact: () => Promise<void>;
}

const ImageAnalysisContext = createContext<ImageAnalysisState | undefined>(
  undefined
);

export function useImageAnalysis() {
  const ctx = useContext(ImageAnalysisContext);
  if (!ctx)
    throw new Error(
      "useImageAnalysis must be used within ImageAnalysisProvider"
    );
  return ctx;
}

export function ImageAnalysisProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<any>(null);
  const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [redactedPreview, setRedactedPreview] = useState<ImageRedact | null>(
    null
  );
  const [redactingLoading, setRedactingLoading] = useState(false);
  const { showToast } = useToast();
  const vlmApi = useVlmApi();
  const vlmRedactApi = useVlmRedactApi();

  function handleUpload() {
    setShowModal(true);
  }

  function handleSelect(img: any) {
    setFile(img);
    setShowModal(false);
    setAnalysis(null);
    setRedactedPreview(null);
  }

  function handleRemove() {
    setFile(null);
    setAnalysis(null);
    setRedactedPreview(null);
  }

  async function handleAnalyse() {
    if (!file) return;
    setAnalysisLoading(true);

    try {
      const base64 = await imageFileToBase64(file);
      const result = await vlmApi.call({
        image_base64: base64,
      });

      setAnalysisLoading(false);
      if (!result) return;

      const mappedResult = mapImageAnalysisResponse(result);
      setAnalysis(mappedResult);
      setRedactedPreview(null);
      if (mappedResult.detected && mappedResult.detected.length > 0) {
        showToast({
          message: `Sensitive Data Detected\nFound ${mappedResult.detected.length} instances`,
        });
      }
    } catch (error) {
      showToast({
        message: `Error processing image: ${error}`,
      });
      setAnalysisLoading(false);
    }
  }

  function handleToggleDetected(idx: number) {
    setAnalysis((analysis) => {
      if (!analysis) return null;
      const detected = analysis.detected.map((item, i) =>
        i === idx ? { ...item, checked: !item.checked } : item
      );
      return { ...analysis, detected };
    });
  }

  async function handleRedact() {
    if (!file || !analysis) return;
    setRedactingLoading(true);

    const selectedPolygons = analysis.detected
      .filter((item) => item.checked)
      .map((item) => item.polygon);

    const result = await vlmRedactApi.call({
      file_path: analysis.filePath,
      polygon: selectedPolygons,
    });

    setRedactingLoading(false);
    if (!result) return;

    const mappedResult = mapImageRedactResponse(result);
    setRedactedPreview(mappedResult);
  }

  return (
    <ImageAnalysisContext.Provider
      value={{
        file,
        setFile,
        analysis,
        setAnalysis,
        analysisLoading,
        setAnalysisLoading,
        showModal,
        setShowModal,
        redactedPreview,
        setRedactedPreview,
        redactingLoading,
        setRedactingLoading,
        handleSelect,
        handleUpload,
        handleRemove,
        handleAnalyse,
        handleToggleDetected,
        handleRedact,
      }}
    >
      {children}
    </ImageAnalysisContext.Provider>
  );
}
