import { useTheme } from "../theme/ThemeProvider.tsx";
import { Button } from "./Button.tsx";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  children?: any;
  style?: any;
  disabled?: boolean;
}

export function Checkbox({
  checked,
  onChange,
  style,
  children,
  disabled,
}: CheckboxProps) {
  const theme = useTheme();

  return (
    <Button
      bindtap={onChange}
      disabled={disabled}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "none",
        border: "none",
        boxShadow: "none",
        cursor: "pointer",
        padding: 0,
        minWidth: 0,
        ...style,
      }}
    >
      <view
        style={{
          width: "20px",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `2px solid ${checked ? theme.primary : theme.inputBorder}`,
          borderRadius: "6px",
          background: checked ? theme.primary : theme.inputBg,
          color: checked ? theme.text : theme.inputTextColor,
          fontWeight: "700",
          fontSize: "16px",
          transition: "all 0.15s",
          marginRight: "8px",
        }}
      >
        <text>{checked ? "✓" : " "}</text>
      </view>
      <view style={{ display: "flex", alignItems: "center" }}>{children}</view>
    </Button>
  );
}
