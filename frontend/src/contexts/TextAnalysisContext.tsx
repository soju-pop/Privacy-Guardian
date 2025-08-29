import { createContext, useContext, useState } from "@lynx-js/react";
import type { ReactNode } from "@lynx-js/react";

import { useNerApi } from "../hooks/useApi.ts";
import { useToast } from "./ToastContext.tsx";
import type { TextImageAnalysis } from "../types/TextImageAnalysis.ts";
import { mapTextImageAnalysisResponse } from "../types/TextImageAnalysis.ts";

interface TextAnalysisState {
  input: string;
  setInput: (input: string) => void;
  analysis: TextImageAnalysis | null;
  setAnalysis: (a: TextImageAnalysis | null) => void;
  loading: boolean;
  setLoading: (l: boolean) => void;
  handleAnalyse: () => void;
}

const TextAnalysisContext = createContext<TextAnalysisState | undefined>(
  undefined
);

export function useTextAnalysis() {
  const ctx = useContext(TextAnalysisContext);
  if (!ctx)
    throw new Error("useTextAnalysis must be used within TextAnalysisProvider");

  return ctx;
}

export function TextAnalysisProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<TextImageAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const nerApi = useNerApi();

  async function handleAnalyse() {
    setLoading(true);

    try {
      const result = await nerApi.call({
        text: input,
      });

      setLoading(false);
      if (!result) return;

      const mappedResult = mapTextImageAnalysisResponse(result);
      setAnalysis(mappedResult);
      if (mappedResult.preview && mappedResult.detected.length > 0) {
        showToast({
          message: `PII detected\nFound ${mappedResult.detected.length} sensitive data instances`,
        });
      }
    } catch (error: any) {
      setLoading(false);
      showToast({
        message: `Error: ${error.message}`,
      });
    }
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
