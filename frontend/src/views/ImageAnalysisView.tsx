
import { useImageAnalysis } from "../contexts/ImageAnalysisContext.tsx";

import { ImageAnalysisActions } from "./ImageAnalysis/Actions.tsx";
import { ImageAnalysisDetected } from "./ImageAnalysis/Detected.tsx";
import { RedactSection } from "./ImageAnalysis/RedactSection.tsx";
import { ScrollContainer } from "../common/ScrollContainer.tsx";
import { SectionHeader } from "../common/SectionHeader.tsx";

export function ImageAnalysisView() {
  const {
    file,
    analysis,
    analysisLoading,
    showModal,
    setShowModal,
    redactedPreview,
    redactingLoading,
    handleSelect,
    handleUpload,
    handleRemove,
    handleAnalyse,
    handleToggleDetected,
    handleRedact,
  } = useImageAnalysis();

  return (
    <ScrollContainer>
      <SectionHeader
        title="Image PII Detection"
        subtitle="Protect sensitive data in your images"
      />
      <ImageAnalysisActions
        file={file}
        showModal={showModal}
        analysisLoading={analysisLoading}
        redactingLoading={redactingLoading}
        onUpload={handleUpload}
        onRemove={handleRemove}
        onAnalyse={handleAnalyse}
        onModalClose={() => setShowModal(false)}
        onModalSelect={handleSelect}
        analysis={analysis}
      />

      {analysis && (
        <>
          <ImageAnalysisDetected detected={analysis.detected} onToggle={handleToggleDetected} />
          <RedactSection
            detected={analysis.detected}
            redactedPreview={redactedPreview}
            redactingLoading={redactingLoading}
            analysisLoading={analysisLoading}
            onRedact={handleRedact}
          />
        </>
      )}
    </ScrollContainer>
  );
}
