import type { DetectedImageItem } from "./DetectedImageItem.ts";
import type { ImageAnalysisResponseDto } from "./ImageAnalysisResponseDto.ts";

export interface ImageAnalysis {
  detected: DetectedImageItem[];
}

export function mapImageAnalysisResponse(dto: ImageAnalysisResponseDto): ImageAnalysis {
  return {
    detected: dto.detected.map(d => ({ ...d, checked: true })),
  };
}
