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

    async function handleAnalyse() {
        setLoading(true);

        // TODO: Call the backend API to analyse the text
        const apiUrl = "http://localhost:4000/ner";
        const response =  await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: input,
                }),
            });

        const result = await response.json() as TextImageAnalysis;
        setAnalysis(result);
        setLoading(false);
        if (result.detected && result.detected.length > 0) {
            showToast({
                message: `PII Detected\nFound ${result.detected.length} sensitive data instances`
            });
        };
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
