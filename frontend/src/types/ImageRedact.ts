import type { ImageRedactResponseDto } from "./ImageRedactResponseDto.ts";

export interface ImageRedact {
  preview: string;
}

export function mapImageRedactResponse(dto: ImageRedactResponseDto): ImageRedact {
  return {
    preview: dto.image_base64,
  };
}
