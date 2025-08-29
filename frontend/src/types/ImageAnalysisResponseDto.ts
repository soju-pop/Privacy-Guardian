export interface ImageAnalysisResponseDto {
  file_path: string;
  results: Array<{
    text: string;
    label: string;
    polygon: Array<Array<number>>;
  }>;
  status: string;
}
