import type { ImageDedactResponseDto } from "./ImageRedactResponseDto.ts";

export interface ImageRedact {
  preview: string;
}

export function mapImageRedactResponse(dto: ImageDedactResponseDto): ImageRedact {
  return {
    preview: dto.preview,
  };
}
