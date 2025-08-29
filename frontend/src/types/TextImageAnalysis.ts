import type { DetectedTextItem } from "./DetectedTextItem.ts";
import type { TextImageAnalysisResponseDto } from "./TextImageAnalysisResponseDto.ts";

export interface TextImageAnalysis {
  preview: string;
  detected: DetectedTextItem[];
}

export function mapTextImageAnalysisResponse(
  dto: TextImageAnalysisResponseDto
): TextImageAnalysis {
  return {
    preview: dto.text,
    detected: Object.entries(dto.entities)
      .map(([key, values]) =>
        (Array.isArray(values) ? values : [values]).map((value) => ({
          type: key,
          value,
        }))
      )
      .flat()
  };
}
