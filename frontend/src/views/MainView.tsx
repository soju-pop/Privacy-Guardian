import { useState } from "@lynx-js/react";

import { useTheme } from "../theme/ThemeProvider.tsx";
import { Header } from "../common/Header.tsx";
import { ImageAnalysisView } from "./ImageAnalysisView.tsx";
import { TextAnalysisView } from "./TextAnalysisView.tsx";

export function MainView() {
  const [tab, setTab] = useState("text");
  const theme = useTheme();

  return (
    <view
      style={{
        minHeight: "100vh",
        background: theme.background,
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        boxSizing: "border-box",
      }}
    >
      <view
        style={{
          padding: "10px 24px 0 0"
        }}>
        <Header />
        <view
          style={{
            display: "flex",
            gap: "0px",
            width: "100%",
            margin: "32px auto 0 auto",
            borderRadius: theme.borderRadius,
            overflow: "hidden",
            boxShadow: theme.boxShadow,
            border: `3px solid ${theme.border}`,
          }}
        >
          <view
            bindtap={() => setTab("text")}
            style={{
              flex: "1 1 0%",
              padding: "16px",
              fontWeight: "600",
              fontSize: "16px",
              borderBottom:
                tab === "text" ? `3px solid ${theme.secondary}` : "3px solid transparent",
              background: tab === "text" ? theme.tab : "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <text style={{ color: theme.text }}>Text Analysis</text>
          </view>
          <view
            bindtap={() => setTab("image")}
            style={{
              flex: "1 1 0%",
              padding: "16px",
              fontWeight: "600",
              fontSize: "16px",
              background: tab === "image" ? theme.tab : "transparent",
              borderBottom:
                tab === "image" ? `3px solid ${theme.secondary}` : "3px solid transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <text style={{ color: theme.text }}>Image Analysis</text>
          </view>
        </view>
        <view style={{ minHeight: "400px", width: "100%", margin: "auto" }}>
          {tab === "text" ? <TextAnalysisView /> : <ImageAnalysisView />}
        </view>
      </view>
    </view>
  );
}
