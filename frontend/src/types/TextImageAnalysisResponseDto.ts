export interface TextImageAnalysisResponseDto {
  text: string;
  entities: [key: string, value: string[]];
}
