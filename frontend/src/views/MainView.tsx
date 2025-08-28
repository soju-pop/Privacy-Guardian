import { useState } from "@lynx-js/react";

import { TextAnalysisView } from "./TextAnalysisView.tsx";
import { ImageAnalysisView } from "./ImageAnalysisView.tsx";
import { Header } from "../common/Header.tsx";

export function MainView() {
  const [tab, setTab] = useState("text");
  return (
    <view
      style={{
        minHeight: "100vh",
        background: "#000000ff",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        boxSizing: "border-box",
      }}
    >
      <Header />
      <view
        style={{
          display: "flex",
          gap: "0px",
          width: "100%",
          margin: "32px auto 0 auto",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 1px 8px #0001",
          border: "3px solid #222",
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
              tab === "text" ? "3px solid #2563eb" : "3px solid transparent",
            background: tab === "text" ? "#222" : "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <text style={{ color: "#fff" }}>Text Analysis</text>
        </view>
        <view
          bindtap={() => setTab("image")}
          style={{
            flex: "1 1 0%",
            padding: "16px",
            fontWeight: "600",
            fontSize: "16px",
            background: tab === "image" ? "#222" : "transparent",
            borderBottom:
              tab === "image" ? "3px solid #2563eb" : "3px solid transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <text style={{ color: "#fff" }}>Image Analysis</text>
        </view>
      </view>
      <view style={{ minHeight: "400px" }}>
        {tab === "text" ? <TextAnalysisView /> : <ImageAnalysisView />}
      </view>
    </view>
  );
}
