import { useState } from "@lynx-js/react";


import { useTheme } from "../theme/ThemeProvider.tsx";
import { Button } from "../common/Button.tsx";
import { Toast } from "../common/Toast.tsx";
import { sampleImages, SampleImagePickerModal } from "../components/SampleImagePickerModal.tsx";
import { ScrollContainer } from "../common/ScrollContainer.tsx";
import { SectionHeader } from "../common/SectionHeader.tsx";

export function ImageAnalysisView() {
  const [file, setFile] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();

  function analyzeImage() {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      const result = {
        preview: file,
        detected: [
          { type: "FACE", value: "Detected face" },
          { type: "LICENSE_PLATE", value: "ABC-1234" },
        ],
      };
      setAnalysis(result);
      setLoading(false);
      if (result.detected && result.detected.length > 0) {
        setShowToast(true);
      }
    }, 1200);
  }

  return (
    <ScrollContainer>
      <SectionHeader
        title="Image PII Detection"
        subtitle="Protect sensitive data in your images"
      />
      <view style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
        <Button
          style={{
            background: theme.secondary,
            color: theme.textSecondary,
            borderRadius: theme.borderRadius,
            fontWeight: "600",
            marginBottom: "20px",
            padding: "10px 20px",
            width: "320px",
          }}
          bindtap={() => setShowModal(true)}
        >
          {file ? "Change Image" : "Upload Image"}
        </Button>
      </view>

      <SampleImagePickerModal
        show={showModal}
        images={sampleImages}
        selected={file}
        onSelect={img => {
          setFile(img);
          setShowModal(false);
        }}
        onClose={() => setShowModal(false)}
      />

      {file && !analysis && (
        <view style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
          <image
            src={file}
            auto-size={true}
            mode="aspectFit"
            style={{
              maxWidth: "400px",
              maxHeight: "300px",
              width: "250px",
              height: "250px",
              borderRadius: theme.borderRadius,
              boxShadow: theme.boxShadow,
              display: "block",
            }}
          />
        </view>
      )}

      <view style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <Button
          bindtap={analyzeImage}
          disabled={loading || !file}
          style={{
            background: theme.primary,
            borderRadius: theme.borderRadius,
            padding: "10px 20px",
            fontWeight: "600",
            width: "320px",
          }}
        >
          {loading ? "Analyzing..." : "Analyze Image"}
        </Button>
      </view>

      {analysis && (
        <>
          <view
            style={{
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <img
              src={analysis.preview}
              alt="Uploaded preview"
              style={{
                maxWidth: "100%",
                borderRadius: theme.borderRadius,
                boxShadow: theme.boxShadow,
              }}
            />
          </view>

          <view
            style={{
              background: theme.highlight,
              border: `1px solid ${theme.primary}`,
              borderRadius: theme.borderRadius,
              padding: "18px",
              marginBottom: "20px",
            }}
          >
            <text
              style={{
                color: theme.danger,
                fontWeight: "700",
                fontSize: "18px",
                marginBottom: "12px",
                display: "block",
              }}
            >
              Detected Sensitive Data ({analysis.detected.length})
            </text>
            {analysis.detected.map((item: any, i: number) => (
              <view
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                <text
                  style={{
                    background: theme.tagBg,
                    borderRadius: "8px",
                    padding: "2px 8px",
                    fontSize: "13px",
                    color: theme.tagText,
                  }}
                >
                  {item.type}
                </text>
                <text
                  style={{
                    fontWeight: "600",
                    fontSize: "15px",
                    color: theme.text,
                    letterSpacing: 0.5,
                  }}
                >
                  {item.value}
                </text>
              </view>
            ))}
          </view>
        </>
      )}

      <Toast
        message={
          analysis && analysis.detected
            ? `Sensitive Data Detected\nFound ${analysis.detected.length} instances`
            : ""
        }
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </ScrollContainer>
  );
}
