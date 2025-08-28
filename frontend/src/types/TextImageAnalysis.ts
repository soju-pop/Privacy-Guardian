import type { DetectedTextItem } from "./DetectedTextItem.ts";
import type { TextImageAnalysisResponseDto } from "./TextImageAnalysisResponseDto.ts";

export interface TextImageAnalysis {
  preview: string;
  detected: DetectedTextItem[];
}

export function mapTextImageAnalysisResponse(dto: TextImageAnalysisResponseDto): TextImageAnalysis {
  return {
    preview: dto.preview,
    detected: dto.detected.map(d => ({ type: d.type, value: d.value })),
  };
}
