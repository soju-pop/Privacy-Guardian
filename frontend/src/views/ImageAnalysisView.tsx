import { useState } from "@lynx-js/react";


import { useTheme } from "../theme/ThemeProvider.tsx";
import { Button } from "../common/Button.tsx";
import { Toast } from "../common/Toast.tsx";
import { sampleImages, SampleImagePickerModal } from "../components/SampleImagePickerModal.tsx";
import { ScrollContainer } from "../common/ScrollContainer.tsx";
import { SectionHeader } from "../common/SectionHeader.tsx";
import { ImageAnalysisActions } from "./ImageAnalysis/Actions.tsx";
import { ImageAnalysisDetected } from "./ImageAnalysis/Detected.tsx";
import { FinalPreview } from "./ImageAnalysis/FinalPreview.tsx";

export function ImageAnalysisView() {
  const [file, setFile] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [detected, setDetected] = useState<any[]>([]);
  const [redactedPreview, setRedactedPreview] = useState<string>("");
  const theme = useTheme();

  function handleUpload() {
    setShowModal(true);
  }

  function handleRemove() {
    setFile(null);
    setAnalysis(null);
    setDetected([]);
    setRedactedPreview("");
  }

  function analyzeImage() {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      const result = {
        preview: file,
        detected: [
          { type: "FACE", value: "Detected face", checked: true },
          { type: "LICENSE_PLATE", value: "ABC-1234", checked: true },
        ],
      };
      setAnalysis(result);
      setDetected(result.detected);
      setLoading(false);
      if (result.detected && result.detected.length > 0) {
        setShowToast(true);
      }
    }, 1200);
  }

  function handleToggleDetected(idx: number) {
    setDetected(detected => detected.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item));
  }

  function handleRedact() {
    setLoading(true);
    setTimeout(() => {
      setRedactedPreview(file + "?redacted=" + detected.filter(d => d.checked).map(d => d.type).join(","));
      setLoading(false);
    }, 1000);
  }

  return (
    <ScrollContainer>
      <SectionHeader
        title="Image PII Detection"
        subtitle="Protect sensitive data in your images"
      />
      <ImageAnalysisActions
        file={file}
        showModal={showModal}
        loading={loading}
        onUpload={handleUpload}
        onRemove={handleRemove}
        onAnalyze={analyzeImage}
        onModalClose={() => setShowModal(false)}
        onModalSelect={img => {
          setFile(img);
          setShowModal(false);
          setAnalysis(null);
          setDetected([]);
          setRedactedPreview("");
        }}
        analysis={analysis}
      />

      {analysis && (
        <>
          <FinalPreview src={redactedPreview || analysis.preview} />
          <ImageAnalysisDetected detected={detected} onToggle={handleToggleDetected} />
          <view style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <Button
              bindtap={handleRedact}
              disabled={loading || !detected.some(d => d.checked)}
              style={{
                background: theme.danger,
                borderRadius: theme.borderRadius,
                padding: "10px 20px",
                fontWeight: "600",
                width: "320px",
              }}
            >
              {loading ? "Redacting..." : "Redact"}
            </Button>
          </view>
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
