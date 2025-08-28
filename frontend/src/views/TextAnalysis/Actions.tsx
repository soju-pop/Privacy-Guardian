import { Button } from "../../common/Button.tsx";
import { useTheme } from "../../theme/ThemeProvider.tsx";

interface TextAnalysisActionsProps {
    loading: boolean;
    analysis: any;
    onAnalyse: () => void;
}

export function TextAnalysisActions({ loading, analysis, onAnalyse }: TextAnalysisActionsProps) {
    const theme = useTheme();

    return (
        <view style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            <Button
                bindtap={onAnalyse}
                disabled={loading}
                style={{
                    background: theme.primary,
                    borderRadius: theme.borderRadius,
                    padding: "10px 20px",
                    fontWeight: "600",
                    width: "500px",
                }}
            >
                {loading ? "Analysing..." : "Analyse Text"}
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
    );
}
