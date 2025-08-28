
import { createContext, useContext, useState } from "@lynx-js/react";
import type { ReactNode } from "@lynx-js/react";

import type { DetectedImageItem } from "../types/DetectedImageItem.ts";
import type { ImageAnalysis } from "../types/ImageAnalysis.ts";
import type { ImageRedact } from "../types/ImageRedact.ts";

interface ImageAnalysisState {
    file: any;
    setFile: (f: any) => void;
    analysis: ImageAnalysis | null;
    setAnalysis: (a: ImageAnalysis | null) => void;
    analysisLoading: boolean;
    setAnalysisLoading: (l: boolean) => void;
    showToast: boolean;
    setShowToast: (s: boolean) => void;
    showModal: boolean;
    setShowModal: (s: boolean) => void;
    detected: DetectedImageItem[];
    setDetected: (d: DetectedImageItem[]) => void;
    redactedPreview: ImageRedact | null;
    setRedactedPreview: (r: ImageRedact | null) => void;
    redactingLoading: boolean;
    setRedactingLoading: (l: boolean) => void;
    handleSelect: (img: any) => void;
    handleUpload: () => void;
    handleRemove: () => void;
    analyzeImage: () => void;
    handleToggleDetected: (idx: number) => void;
    handleRedact: () => void;
}

const ImageAnalysisContext = createContext<ImageAnalysisState | undefined>(undefined);

export function useImageAnalysis() {
    const ctx = useContext(ImageAnalysisContext);
    if (!ctx) throw new Error("useImageAnalysis must be used within ImageAnalysisProvider");
    return ctx;
}

export function ImageAnalysisProvider({ children }: { children: ReactNode }) {
    const [file, setFile] = useState<any>(null);
    const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null);
    const [analysisLoading, setAnalysisLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [detected, setDetected] = useState<DetectedImageItem[]>([]);
    const [redactedPreview, setRedactedPreview] = useState<ImageRedact | null>(null);
    const [redactingLoading, setRedactingLoading] = useState(false);

    function handleUpload() {
        setShowModal(true);
    }

    function handleSelect(img: any) {
        setFile(img);
        setShowModal(false);
        setAnalysis(null);
        setDetected([]);
        setRedactedPreview(null);
    }

    function handleRemove() {
        setFile(null);
        setAnalysis(null);
        setDetected([]);
        setRedactedPreview(null);
    }

    function analyzeImage() {
        if (!file) return;
        setAnalysisLoading(true);

        // TODO: Call the backend API to analyze the image
        setTimeout(() => {
            const result: ImageAnalysis = {
                detected: [
                    { type: "FACE", value: "Detected face", checked: true },
                    { type: "LICENSE_PLATE", value: "ABC-1234", checked: true },
                ],
            };
            setAnalysis(result);
            setDetected(result.detected);
            setAnalysisLoading(false);
            if (result.detected && result.detected.length > 0) {
                setShowToast(true);
            }
        }, 1200);
    }

    function handleToggleDetected(idx: number) {
        setDetected(detected => detected.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item));
    }

    function handleRedact() {
        setRedactingLoading(true);

        // TODO: Call the backend API to redact the image
        setTimeout(() => {
            setRedactedPreview({ preview: file });
            setRedactingLoading(false);
        }, 1000);
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
                showToast,
                setShowToast,
                showModal,
                setShowModal,
                detected,
                setDetected,
                redactedPreview,
                setRedactedPreview,
                redactingLoading,
                setRedactingLoading,
                handleSelect,
                handleUpload,
                handleRemove,
                analyzeImage,
                handleToggleDetected,
                handleRedact,
            }}
        >
            {children}
        </ImageAnalysisContext.Provider>
    );
}
