import { useState } from "@lynx-js/react";

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
    <scroll-view
      scroll-orientation="vertical"
      style={{
        flex: 1,
        overflow: "auto",
        maxWidth: "720px",
        margin: "0 auto",
        background: "#161616",
        borderRadius: "20px",
        boxShadow: "0 4px 20px #0006",
        padding: "24px",
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
        <view style={{ marginBottom: "24px" }}>
          <text
            style={{
              fontWeight: "800",
              fontSize: "26px",
              color: "#fff",
            }}
          >
            Image PII Detection
          </text>
          <text style={{ fontSize: "14px", color: "#aaa" }}>
            Protect sensitive data in your images
          </text>
        </view>

        <input
          type="file"
          accept="image/*"
          onChange={(e: any) => setFile(e.target.files[0])}
          style={{
            marginBottom: "20px",
            color: "#fff",
          }}
        />

        <view style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <Button
            bindtap={analyzeImage}
            disabled={loading || !file}
            style={{
              background: "#ff0050",
              borderRadius: "12px",
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
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              <img
                src={analysis.preview}
                alt="Uploaded preview"
                style={{
                  maxWidth: "100%",
                  borderRadius: "12px",
                  boxShadow: "0 2px 12px #0009",
                }}
              />
            </view>

            <view
              style={{
                background: "#2a0f12",
                border: "1px solid #ff0050",
                borderRadius: "12px",
                padding: "18px",
                marginBottom: "20px",
              }}
            >
              <text
                style={{
                  color: "#ff4d6d",
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
                      background: "#00f2ea22",
                      borderRadius: "8px",
                      padding: "2px 8px",
                      fontSize: "13px",
                      color: "#00f2ea",
                    }}
                  >
                    {item.type}
                  </text>
                  <text
                    style={{
                      fontWeight: "600",
                      fontSize: "15px",
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
  );
}
