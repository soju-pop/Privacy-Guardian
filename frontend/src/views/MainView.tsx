import { useState } from "@lynx-js/react";

import { useTheme } from "../theme/ThemeProvider.tsx";
import { Header } from "../common/Header.tsx";
import { ImageAnalysisView } from "./ImageAnalysisView.tsx";
import { TabGroup, TabPanel } from "../common/TabGroup.tsx";
import { TextAnalysisView } from "./TextAnalysisView.tsx";

export function MainView() {
  const [tab, setTab] = useState("text");
  const theme = useTheme();

  const tabs = [
    { label: "Text Analysis", value: "text" },
    { label: "Image Analysis", value: "image" },
  ];

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
        <TabGroup
          tabs={tabs}
          activeTab={tab}
          onTabChange={setTab}
        >
          <TabPanel value="text">
            <TextAnalysisView />
          </TabPanel>
          <TabPanel value="image">
            <ImageAnalysisView />
          </TabPanel>
        </TabGroup>
      </view>
    </view>
  );
}
