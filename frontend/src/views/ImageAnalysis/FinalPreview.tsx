import { useTheme } from "../../theme/ThemeProvider.tsx";

export function FinalPreview({ src }: { src: string }) {
    const theme = useTheme();

    if (!src) return null;

    return (
        <view style={{ marginBottom: "20px", textAlign: "center" }}>
            <image
                src={src}
                style={{
                    maxWidth: "100%",
                    borderRadius: theme.borderRadius,
                    boxShadow: theme.boxShadow,
                }}
            />
        </view>
    );
}
