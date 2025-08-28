export interface TextImageAnalysisResponseDto {
  preview: string;
  detected: Array<{
    type: string;
    value: string;
  }>;
}
