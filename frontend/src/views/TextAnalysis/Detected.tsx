import { useTheme } from "../../theme/ThemeProvider.tsx";
import type { DetectedTextItem } from "../../types/DetectedTextItem.ts";

interface DetectedProps {
  detected: DetectedTextItem[];
}

export function TextAnalysisDetected({ detected }: DetectedProps) {
  const theme = useTheme();

  if (!detected || detected.length === 0) return null;

  return (
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
        Detected Sensitive Data ({detected.length})
      </text>

      {detected.map((item, i) => (
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
              fontSize: "11px",
              color: theme.tagText,
            }}
          >
            {item.type}
          </text>
          <text
            style={{
              fontWeight: "600",
              fontSize: "13px",
              color: theme.text,
              letterSpacing: 0.5,
            }}
          >
            {item.value}
          </text>
        </view>
      ))}
    </view>
  );
}
