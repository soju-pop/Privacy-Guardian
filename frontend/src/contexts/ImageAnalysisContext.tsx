
import { createContext, useContext, useState } from "@lynx-js/react";
import type { ReactNode } from "@lynx-js/react";

import type { DetectedImageItem } from "../types/DetectedImageItem.ts";
import type { ImageAnalysis } from "../types/ImageAnalysis.ts";
import type { ImageRedact } from "../types/ImageRedact.ts";
import { useToast } from "./ToastContext.tsx";

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
    const [showModal, setShowModal] = useState(false);
    const [redactedPreview, setRedactedPreview] = useState<ImageRedact | null>(null);
    const [redactingLoading, setRedactingLoading] = useState(false);
    const { showToast } = useToast();

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
            // Convert image URL to base64
            const response = await fetch(file);
            const blob = await response.blob();
            const reader = new FileReader();

            reader.onload = () => {
                const base64 = reader.result as string;

                // TODO: Call the backend API to analyse the image with base64
                setTimeout(() => {
                    const result: ImageAnalysis = {
                        detected: [
                            { type: "FACE", value: "Detected face", checked: true },
                            { type: "LICENSE_PLATE", value: "ABC-1234", checked: true },
                        ],
                    };
                    setAnalysis(result);
                    setAnalysisLoading(false);
                    if (result.detected && result.detected.length > 0) {
                        showToast({
                            message: `Sensitive Data Detected\nFound ${result.detected.length} instances`
                        });
                    }
                }, 1200);
            };

            reader.onerror = () => {
                showToast({
                    message: "Error converting image to base64"
                });
                setAnalysisLoading(false);
            };

            reader.readAsDataURL(blob);
        } catch (error) {
            showToast({
                message: `Error fetching image: ${error}`
            });
            setAnalysisLoading(false);
        }
    }

    function handleToggleDetected(idx: number) {
        setAnalysis(analysis => {
            if (!analysis) return null;
            const detected = analysis.detected.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item);
            return { ...analysis, detected };
        });
    }

    async function handleRedact() {
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
