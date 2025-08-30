import type { ReactNode } from "@lynx-js/react";

import { useTheme } from "../theme/ThemeProvider.tsx";
import { Tab } from "./Tab.tsx";

interface TabItem {
    label: string;
    value: string;
}

interface TabPanelProps {
    value: string;
    children: ReactNode;
}

export function TabPanel({ value, children }: TabPanelProps) {
    return <>{children}</>;
}

interface TabGroupProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (value: string) => void;
    children: ReactNode[];
}

export function TabGroup({ tabs, activeTab, onTabChange, children }: TabGroupProps) {
    const theme = useTheme();

    const activeTabPanel = children.find((child: any) =>
        child?.props?.value === activeTab
    );

    return (
        <view
            style={{
                margin: "32px auto 0 auto",
                width: "100%",
            }}>
            <view
                style={{
                    display: "flex",
                    gap: "0px",
                    borderRadius: theme.borderRadius,
                    overflow: "hidden",
                    boxShadow: theme.boxShadow,
                    border: `3px solid ${theme.border}`,
                }}
            >
                {tabs.map(tab => (
                    <Tab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                        isActive={activeTab === tab.value}
                        onClick={onTabChange}
                    />
                ))}
            </view>
            <view style={{ minHeight: "400px", width: "100%", margin: "auto" }}>
                {activeTabPanel}
            </view>
        </view>
    );
}
