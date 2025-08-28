import { useTheme } from "../../theme/ThemeProvider.tsx";

export function TextAnalysisPreview({ preview }: { preview?: string }) {
    const theme = useTheme();
    
    return (
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
                {preview ? (
                    <text style={{ color: theme.previewText }}>{preview}</text>
                ) : (
                    <text style={{ color: theme.previewText, opacity: 0.25 }}>
                        No preview available.
                    </text>
                )}
            </view>
        </view>
    );
}
