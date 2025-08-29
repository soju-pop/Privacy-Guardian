import { Checkbox } from "../../common/Checkbox.tsx";
import { useTheme } from "../../theme/ThemeProvider.tsx";
import type { DetectedImageItem } from "../../types/DetectedImageItem.ts";

interface DetectedProps {
  detected: DetectedImageItem[];
  onToggle: (idx: number) => void;
}

export function ImageAnalysisDetected({ detected, onToggle }: DetectedProps) {
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
          <Checkbox
            checked={item.checked}
            onChange={() => onToggle(i)}
            style={{ marginBottom: "10px" }}
          >
            <text
              style={{
                background: theme.tagBg,
                borderRadius: "8px",
                padding: "2px 8px",
                fontSize: "11px",
                color: theme.tagText,
                marginRight: "8px",
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
          </Checkbox>
        </view>
      ))}
    </view>
  );
}
