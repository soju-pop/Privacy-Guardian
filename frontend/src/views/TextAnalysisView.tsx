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
                        background: "#0f0f0f", // TikTok dark
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
                            Text PII Detection
                        </text>
                        <text style={{ fontSize: "14px", color: "#aaa" }}>
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
                            minHeight: "100px",
                            border: "1px solid #333",
                            borderRadius: "12px",
                            padding: "14px",
                            fontSize: "16px",
                            marginBottom: "20px",
                            background: "#1f1f1f",
                            color: "#fff",
                        }}
                    />

                    <view style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
                        <Button
                            bindtap={analyzeText}
                            disabled={loading}
                            style={{
                                background: "#ff0050",
                                borderRadius: "12px",
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
                                borderRadius: "12px",
                                padding: "10px 20px",
                                fontWeight: "600",
                                width: "500px",
                            }}
                            disabled={!analysis}
                            bindtap={() => { }}
                        >
                            Export Safe Text
                        </Button>
                    </view>

                    <view
                        style={{
                            background: "#1a1a1a",
                            borderRadius: "12px",
                            padding: "16px",
                            marginBottom: "20px",
                        }}
                    >
                        <text style={{ fontWeight: "600", color: "#fff" }}>
                            Analysis Preview:
                        </text>
                        <text style={{ display: "block", marginTop: "10px", color: "#ddd" }}>
                            {analysis?.preview}
                        </text>
                    </view>

                    {analysis && (
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
