import { Button } from "../../common/Button.tsx";
import { useTheme } from "../../theme/ThemeProvider.tsx";
import { useToast } from "../../contexts/ToastContext.tsx";

interface TextAnalysisActionsProps {
  loading: boolean;
  analysis: any;
  onAnalyse: () => void;
}

export function TextAnalysisActions({
  loading,
  analysis,
  onAnalyse,
}: TextAnalysisActionsProps) {
  const theme = useTheme();
  const toast = useToast();

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
        disabled={!analysis || !analysis.preview}
        style={{
          background: theme.secondary,
          color: theme.textSecondary,
          borderRadius: theme.borderRadius,
          padding: "10px 20px",
          fontWeight: "600",
          width: "500px",
        }}
        bindtap={() => {
          toast.showToast({
            message: "Copied text to clipboard!",
            background: theme.greenToastBg,
          });
        }}
      >
        Export Safe Text
      </Button>
    </view>
  );
}
