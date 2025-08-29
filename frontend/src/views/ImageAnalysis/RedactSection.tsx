import { useTheme } from "../../theme/ThemeProvider.tsx";
import { Button } from "../../common/Button.tsx";
import type { DetectedImageItem } from "../../types/DetectedImageItem.ts";

interface RedactSectionProps {
    detected: DetectedImageItem[];
    redactingLoading: boolean;
    analysisLoading: boolean;
    onRedact: () => void;
}

export function RedactSection({
    detected,
    redactingLoading,
    analysisLoading,
    onRedact
}: RedactSectionProps) {
    const theme = useTheme();

    return (
        <view style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <Button
                bindtap={onRedact}
                disabled={redactingLoading || analysisLoading || !detected.some(d => d.checked)}
                style={{
                    background: theme.danger,
                    borderRadius: theme.borderRadius,
                    padding: "10px 20px",
                    fontWeight: "600",
                    width: "320px",
                }}
            >
                {redactingLoading ? "Redacting..." : "Redact"}
            </Button>
        </view>
    );
}
