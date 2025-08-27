import { useState } from "@lynx-js/react";
import { ThemeProvider } from "../theme/ThemeProvider.tsx";
import { Button } from "../common/Button.tsx";
import { Toast } from "../common/Toast.tsx";

export function ImageAnalysisView() {
  const [file, setFile] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
    <ThemeProvider>
      <scroll-view
        scroll-orientation="vertical"
        style={{
          flex: 1,
          overflow: "auto",
          maxWidth: 720,
          margin: "0 auto",
          background: "#161616",
          borderRadius: 20,
          boxShadow: "0 4px 20px #0006",
          padding: 24,
          height: "80vh",
        }}
      >
        <view
          style={{
            background: "#0f0f0f",
            minHeight: "100vh",
            padding: "20px",
            color: "#fff",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <view style={{ marginBottom: 24 }}>
            <text
              style={{
                fontWeight: "800",
                fontSize: 26,
                color: "#fff",
              }}
            >
              Image PII Detection
            </text>
            <text style={{ fontSize: 14, color: "#aaa" }}>
              Protect sensitive data in your images
            </text>
          </view>

          <input
            type="file"
            accept="image/*"
            onChange={(e: any) => setFile(e.target.files[0])}
            style={{
              marginBottom: 20,
              color: "#fff",
            }}
          />

          <view style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <Button
              bindtap={analyzeImage}
              disabled={loading || !file}
              style={{
                background: "#ff0050",
                borderRadius: 12,
                padding: "10px 20px",
                fontWeight: "600",
              }}
            >
              {loading ? "Analyzing..." : "Analyze Image"}
            </Button>
          </view>

          {analysis && (
            <>
              <view
                style={{
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                <img
                  src={analysis.preview}
                  alt="Uploaded preview"
                  style={{
                    maxWidth: "100%",
                    borderRadius: 12,
                    boxShadow: "0 2px 12px #0009",
                  }}
                />
              </view>

              <view
                style={{
                  background: "#2a0f12",
                  border: "1px solid #ff0050",
                  borderRadius: 12,
                  padding: 18,
                  marginBottom: 20,
                }}
              >
                <text
                  style={{
                    color: "#ff4d6d",
                    fontWeight: "700",
                    fontSize: 18,
                    marginBottom: 12,
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
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <text
                      style={{
                        background: "#00f2ea22",
                        borderRadius: 8,
                        padding: "2px 8px",
                        fontSize: 13,
                        color: "#00f2ea",
                      }}
                    >
                      {item.type}
                    </text>
                    <text
                      style={{
                        fontWeight: "600",
                        fontSize: 15,
                        color: "#fff",
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
    </ThemeProvider>
  );
}
