import { useState } from "@lynx-js/react";

import { useTheme } from "../theme/ThemeProvider.tsx";
import { Button } from "../common/Button.tsx";
import { Toast } from "../common/Toast.tsx";

export function TextAnalysisView() {
    const [input, setInput] = useState("");
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const theme = useTheme();

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
                    background: theme.card, // TikTok dark
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
                        Text PII Detection
                    </text>
                    <text style={{ fontSize: "14px", color: theme.muted }}>
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
                        border: `1px solid ${theme.inputBorder}`,
                        borderRadius: theme.borderRadius,
                        padding: "14px",
                        fontSize: "16px",
                        marginBottom: "20px",
                        background: theme.inputBg,
                        color: theme.inputTextColor,
                    }}
                />

                <view style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
                    <Button
                        bindtap={analyzeText}
                        disabled={loading}
                        style={{
                            background: theme.primary,
                            borderRadius: theme.borderRadius,
                            padding: "10px 20px",
                            fontWeight: "600",
                            width: "500px",
                        }}
                    >
                        {loading ? "Analyzing..." : "Analyze Text"}
                    </Button>
                    <Button
                        style={{
                            background: theme.secondary,
                            color: theme.textSecondary,
                            borderRadius: theme.borderRadius,
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
                        background: theme.previewBg,
                        borderRadius: theme.borderRadius,
                        padding: "16px",
                        marginBottom: "20px",
                    }}
                >
                    <text style={{ fontWeight: "600", color: theme.text }}>
                        Analysis Preview:
                    </text>
                    <view style={{ display: "block", marginTop: "10px" }}>
                        {analysis?.preview
                            ? <text style={{ color: theme.previewText }}>
                                {analysis?.preview}
                            </text>
                            : <text style={{ color: theme.previewText, opacity: 0.25 }}>
                                No preview available.
                            </text>
                        }
                    </view>
                </view>

                {analysis && (
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
    );
}
