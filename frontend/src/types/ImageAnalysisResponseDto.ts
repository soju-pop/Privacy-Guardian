export interface ImageAnalysisResponseDto {
  detected: Array<{
    type: string;
    value: string;
  }>;
}
