import { useState } from "@lynx-js/react";
import { ThemeProvider } from "../theme/ThemeProvider.tsx";
import { Button } from "../common/Button.tsx";
import { Toast } from "../common/Toast.tsx";

export function TextAnalysisView() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function analyzeText() {
    setLoading(true);
    setTimeout(() => {
      const result = {
        preview:
          "Hi my name is Fikri and this is my phone number [PHONE_NUMBER] and my credit card number is [CREDIT_CARD_NUMBER].",
        detected: [
          { type: "PHONE", value: "6582223231" },
          { type: "CREDIT_CARD", value: "1312 12312" },
          { type: "PHONE", value: "3123 1231" },
        ],
      };
      setAnalysis(result);
      setLoading(false);
      if (result.detected && result.detected.length > 0) {
        setShowToast(true);
      }
    }, 800);
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
            background: "#0f0f0f", // TikTok dark
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
              Text PII Detection
            </text>
            <text style={{ fontSize: 14, color: "#aaa" }}>
              Protect your data before sending to AI
            </text>
          </view>

          <textarea
            // @ts-ignore
            bindinput={(e: any) => setInput(e.detail.value)}
            value={input}
            placeholder="Paste or type your text here..."
            style={{
              width: "100%",
              minHeight: 100,
              border: "1px solid #333",
              borderRadius: 12,
              padding: 14,
              fontSize: 16,
              marginBottom: 20,
              background: "#1f1f1f",
              color: "#fff",
            }}
          />

          <view style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <Button
              bindtap={analyzeText}
              disabled={loading}
              style={{
                background: "#ff0050",
                borderRadius: 12,
                padding: "10px 20px",
                fontWeight: "600",
                width: "500px",
              }}
            >
              {loading ? "Analyzing..." : "Analyze Text"}
            </Button>
            <Button
              style={{
                background: "#00f2ea",
                borderRadius: 12,
                padding: "10px 20px",
                fontWeight: "600",
                width: "500px",
              }}
              disabled={!analysis}
              bindtap={() => {}}
            >
              Export Safe Text
            </Button>
          </view>

          <view
            style={{
              background: "#1a1a1a",
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
            }}
          >
            <text style={{ fontWeight: "600", color: "#fff" }}>
              Analysis Preview:
            </text>
            <text style={{ display: "block", marginTop: 10, color: "#ddd" }}>
              {analysis?.preview}
            </text>
          </view>

          {analysis && (
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
          )}

          <Toast
            message={
              analysis && analysis.detected
                ? `PII Detected\nFound ${analysis.detected.length} sensitive data instances`
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
