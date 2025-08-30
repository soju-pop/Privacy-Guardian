import { useTextAnalysis } from "../contexts/TextAnalysisContext.tsx";

import { ScrollContainer } from "../common/ScrollContainer.tsx";
import { SectionHeader } from "../common/SectionHeader.tsx";
import { TextAnalysisInput } from "./TextAnalysis/Input.tsx";
import { TextAnalysisActions } from "./TextAnalysis/Actions.tsx";
import { TextAnalysisPreview } from "./TextAnalysis/Preview.tsx";
import { TextAnalysisDetected } from "./TextAnalysis/Detected.tsx";

export function TextAnalysisView() {
  const { input, setInput, analysis, loading, handleAnalyse } =
    useTextAnalysis();

  return (
    <ScrollContainer>
      <SectionHeader
        title="Text PII Detection"
        subtitle="Protect your data before sending to AI"
      />
      <TextAnalysisInput input={input} setInput={setInput} />
      <TextAnalysisActions
        loading={loading}
        analysis={analysis}
        onAnalyse={handleAnalyse}
        input={input}
      />
      <TextAnalysisPreview preview={analysis?.preview} />
      {analysis && <TextAnalysisDetected detected={analysis.detected} />}
    </ScrollContainer>
  );
}
