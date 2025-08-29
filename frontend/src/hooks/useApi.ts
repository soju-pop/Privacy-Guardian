import { useState } from "@lynx-js/react";
import { useToast } from "../contexts/ToastContext.tsx";

type ApiEndpoint = "vlm" | "ner";

interface ApiConfig {
  baseUrl?: string;
  headers?: Record<string, string>;
  method?: string;
}

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const DEFAULT_CONFIG: ApiConfig = {
  baseUrl: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
  method: "POST",
};

export function useApi<TResponse = any>(
  endpoint: ApiEndpoint,
  config: ApiConfig = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  async function call(body: Record<string, any>): Promise<TResponse | null> {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = `${mergedConfig.baseUrl}/${endpoint}`;
      const response = await fetch(apiUrl, {
        method: mergedConfig.method,
        headers: mergedConfig.headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorMessage = `API Error: ${response.status} ${response.statusText}`;
        setError(errorMessage);
        showToast({
          message: errorMessage,
        });
        setLoading(false);
        return null;
      }

      const result = (await response.json()) as TResponse;
      setLoading(false);
      return result;
    } catch (err) {
      const errorMessage = `Network Error: ${err instanceof Error ? err.message : "Unknown error"}`;
      setError(errorMessage);
      showToast({
        message: errorMessage,
      });
      setLoading(false);
      return null;
    }
  }

  return {
    call,
    loading,
    error,
    clearError: () => setError(null),
  };
}

export function useVlmApi() {
  return useApi<import("../types/ImageAnalysisResponseDto.ts").ImageAnalysisResponseDto>("vlm");
}

export function useNerApi() {
  return useApi<import("../types/TextImageAnalysisResponseDto.ts").TextImageAnalysisResponseDto>("ner");
}
