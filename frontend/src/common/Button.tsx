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
  return (
    <view
      bindtap={!disabled ? bindtap : undefined}
      style={{
        background: disabled ? "#ccc" : theme.primary,
        color: "#fff",
        border: "none",
        borderRadius: 6,
        padding: "10px 18px",
        fontWeight: "600",
        fontFamily: theme.fontFamily,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
      {...props}
    >
      <text style={{ color: "#fff" }}>{children}</text>
    </view>
  );
}
