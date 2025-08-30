import { useTheme } from "../../theme/ThemeProvider.tsx";
import { useToast } from "../../contexts/ToastContext.tsx";
import { Button } from "../../common/Button.tsx";
import type { DetectedImageItem } from "../../types/DetectedImageItem.ts";
import type { ImageRedact } from "../../types/ImageRedact.ts";

interface RedactSectionProps {
  detected: DetectedImageItem[];
  redactingLoading: boolean;
  analysisLoading: boolean;
  onRedact: () => void;
  redactedPreview: ImageRedact | null;
}

export function RedactSection({
  detected,
  redactingLoading,
  analysisLoading,
  onRedact,
  redactedPreview,
}: RedactSectionProps) {
  const theme = useTheme();
  const { showToast } = useToast();

  return (
    <view
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      {redactedPreview ? (
        <Button
          bindtap={() => {
            showToast({
              message: "Saved image to gallery!",
              background: theme.greenToastBg,
            });
          }}
          disabled={
            redactingLoading ||
            analysisLoading ||
            !detected.some((d) => d.checked)
          }
          style={{
            background: theme.secondary,
            borderRadius: theme.borderRadius,
            color: theme.textSecondary,
            padding: "10px 20px",
            fontWeight: "600",
            width: "320px",
          }}
        >
          Export Redacted Image
        </Button>
      ) : (
        <Button
          bindtap={onRedact}
          disabled={
            redactingLoading ||
            analysisLoading ||
            !detected.some((d) => d.checked)
          }
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
      )}
    </view>
  );
}
