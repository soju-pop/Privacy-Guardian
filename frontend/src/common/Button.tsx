import { useTheme } from "../theme/ThemeProvider.tsx";

export function Button({
  children,
  bindtap,
  type = "button",
  style = {},
  disabled = false,
  ...props
}: any) {
  const theme = useTheme();
  const buttonColor = style.color || theme.text;
  const fontSize = style.fontSize || "14px";
  return (
    <view
      bindtap={!disabled ? bindtap : undefined}
      style={{
        background: disabled ? "#ccc" : theme.primary,
        color: buttonColor,
        border: "none",
        borderRadius: "6px",
        padding: "10px 18px",
        fontWeight: "600",
        fontFamily: theme.fontFamily,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.25 : 1,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
      {...props}
    >
      <text style={{ color: buttonColor, fontSize: fontSize }}>{children}</text>
    </view>
  );
}
