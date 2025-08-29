import type { DetectedImageItem } from "./DetectedImageItem.ts";
import type { ImageAnalysisResponseDto } from "./ImageAnalysisResponseDto.ts";

export interface ImageAnalysis {
  filePath: string;
  detected: DetectedImageItem[];
}

export function mapImageAnalysisResponse(dto: ImageAnalysisResponseDto): ImageAnalysis {
  return {
    filePath: dto.file_path,
    detected: dto.results.map(d => ({
      type: d.label,
      value: d.text,
      polygon: d.polygon,
      checked: true
    })),
  };
}
