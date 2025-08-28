import { createContext, useContext, useState } from "@lynx-js/react";
import type { ReactNode } from "@lynx-js/react";

import { useToast } from "./ToastContext.tsx";
import type { TextImageAnalysis } from "../types/TextImageAnalysis.ts";

interface TextAnalysisState {
    input: string;
    setInput: (input: string) => void;
    analysis: TextImageAnalysis | null;
    setAnalysis: (a: TextImageAnalysis | null) => void;
    loading: boolean;
    setLoading: (l: boolean) => void;
    handleAnalyse: () => void;
}

const TextAnalysisContext = createContext<TextAnalysisState | undefined>(undefined);

export function useTextAnalysis() {
    const ctx = useContext(TextAnalysisContext);
    if (!ctx) throw new Error("useTextAnalysis must be used within TextAnalysisProvider");

    return ctx;
}

export function TextAnalysisProvider({ children }: { children: ReactNode }) {
    const [input, setInput] = useState("");
    const [analysis, setAnalysis] = useState<TextImageAnalysis | null>(null);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    function handleAnalyse() {
        setLoading(true);

        // TODO: Call the backend API to analyse the text
        setTimeout(() => {
            const result: TextImageAnalysis = {
                preview:
                    "Hi my name is Fikri and this is my phone number [PHONE_NUMBER] and my credit card number is [CREDIT_CARD_NUMBER].",
                detected: [
                    { type: "PHONE", value: "6582223231" },
                    { type: "CREDIT_CARD", value: "1312 12312" },
                    { type: "PHONE", value: "3123 1231" },
                ],
            };
            setAnalysis(result);
            setLoading(false);
            if (result.detected && result.detected.length > 0) {
                showToast({
                    message: `PII Detected\nFound ${result.detected.length} sensitive data instances`
                });
            }
        }, 800);
    }

    return (
        <TextAnalysisContext.Provider
            value={{
                input,
                setInput,
                analysis,
                setAnalysis,
                loading,
                setLoading,
                handleAnalyse,
            }}
        >
            {children}
        </TextAnalysisContext.Provider>
    );
}
