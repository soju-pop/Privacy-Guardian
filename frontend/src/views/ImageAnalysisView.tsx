
import { useImageAnalysis } from "../contexts/ImageAnalysisContext.tsx";

import { useTheme } from "../theme/ThemeProvider.tsx";
import { ImageAnalysisActions } from "./ImageAnalysis/Actions.tsx";
import { ImageAnalysisDetected } from "./ImageAnalysis/Detected.tsx";
import { RedactSection } from "./ImageAnalysis/RedactSection.tsx";
import { ScrollContainer } from "../common/ScrollContainer.tsx";
import { SectionHeader } from "../common/SectionHeader.tsx";
import { Toast } from "../common/Toast.tsx";

export function ImageAnalysisView() {
  const {
    file,
    analysis,
    analysisLoading,
    showToast,
    setShowToast,
    showModal,
    setShowModal,
    detected,
    redactedPreview,
    redactingLoading,
    handleSelect,
    handleUpload,
    handleRemove,
    analyzeImage,
    handleToggleDetected,
    handleRedact,
  } = useImageAnalysis();
  const theme = useTheme();

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
        onAnalyze={analyzeImage}
        onModalClose={() => setShowModal(false)}
        onModalSelect={handleSelect}
        analysis={analysis}
      />

      {analysis && (
        <>
          <ImageAnalysisDetected detected={detected} onToggle={handleToggleDetected} />
          <RedactSection
            detected={detected}
            redactedPreview={redactedPreview}
            redactingLoading={redactingLoading}
            analysisLoading={analysisLoading}
            onRedact={handleRedact}
          />
        </>
      )}

      <Toast
        message={
          analysis && detected.length
            ? `Sensitive Data Detected\nFound ${detected.length} instances`
            : ""
        }
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </ScrollContainer>
  );
}
