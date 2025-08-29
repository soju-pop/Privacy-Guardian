import logo from "../assets/logo.png";
import { useTheme } from "../theme/ThemeProvider.tsx";

export function Header() {
  const {
    headerTextColor: headerText,
    headerSubTextColor: headerSubText,
    card,
    borderRadius,
  } = useTheme();
  return (
    <view
      style={{
        display: "flex",
        alignItems: "center",
        gap: "18px",
        maxWidth: "900px",
        margin: "0 auto",
        borderRadius: borderRadius,
      }}
    >
      <image
        src={logo}
        style={{ width: "38px", height: "38px", marginLeft: "10px" }}
      />
      <view>
        <text
          style={{ fontWeight: "700", fontSize: "22px", color: headerText }}
        >
          Privacy Guardian
        </text>
        <text
          style={{ fontSize: "14px", color: headerSubText, fontWeight: "500" }}
        >
          Local PII detection and redaction
        </text>
      </view>
    </view>
  );
}
