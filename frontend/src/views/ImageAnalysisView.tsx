import { useState } from "@lynx-js/react";


import { useTheme } from "../theme/ThemeProvider.tsx";
import { Button } from "../common/Button.tsx";
import { Toast } from "../common/Toast.tsx";
export function ImageAnalysisView() {
  const [file, setFile] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const theme = useTheme();

  function analyzeImage() {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      const result = {
        preview: URL.createObjectURL(file),
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
    <scroll-view
      scroll-orientation="vertical"
      style={{
        flex: 1,
        overflow: "auto",
        margin: "0 auto",
        background: theme.background,
        borderRadius: theme.borderRadius,
        boxShadow: theme.boxShadow,
        height: "80vh",
      }}
    >
      <view
        style={{
          background: theme.card,
          minHeight: "100vh",
          padding: "20px",
          color: theme.text,
          fontFamily: theme.fontFamily,
        }}
      >
        <view style={{ marginBottom: "24px" }}>
          <text
            style={{
              fontWeight: "800",
              fontSize: "24px",
              color: theme.text,
            }}
          >
            Image PII Detection
          </text>
          <text style={{ fontSize: "14px", color: theme.muted }}>
            Protect sensitive data in your images
          </text>
        </view>

        <input
          type="file"
          accept="image/*"
          onChange={(e: any) => setFile(e.target.files[0])}
          style={{
            marginBottom: "20px",
            color: theme.inputTextColor,
          }}
        />

        <view style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <Button
            bindtap={analyzeImage}
            disabled={loading || !file}
            style={{
              background: theme.primary,
              borderRadius: theme.borderRadius,
              padding: "10px 20px",
              fontWeight: "600",
              width: "500px",
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
      </view>
    </scroll-view>
  );
}
