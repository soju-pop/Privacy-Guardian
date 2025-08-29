import { useTheme } from "../../theme/ThemeProvider.tsx";

export function FinalPreview({ src }: { src: string }) {
    const theme = useTheme();

    if (!src) return null;

    const cleanSrc = src.trim();
        
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
                Redacted Preview:
            </text>
            <image
                src={cleanSrc}
                auto-size={true}
                mode="aspectFit"
                style={{
                    width: "100%",
                    marginTop: "10px",
                    borderRadius: theme.borderRadius,
                    boxShadow: theme.boxShadow,
                }}
            />
        </view>
    );
}
