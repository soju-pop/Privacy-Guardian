import { useTheme } from "../../theme/ThemeProvider.tsx";

interface TabProps {
    title: string;
    active: boolean;
}

function Tab({ title, active }: TabProps) {
    const theme = useTheme();

    return (
        <view style={{
            background: active ? theme.primary : theme.backgroundSecondary,
            height: "32px",
            padding: "8px 16px",
            borderRadius: "20px",
            marginRight: "12px",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
        }}>
            <text style={{ 
                color: active ? "white" : theme.muted, 
                fontSize: "15px", 
                fontWeight: active ? "600" : "500",
            }}>
                {title}
            </text>
        </view>
    );
}

export function SampleImagePickerTabs() {
    const theme = useTheme();

    return (
        <view style={{
            display: "flex",
            padding: "16px 20px",
            background: theme.card,
            borderBottom: `1px solid ${theme.border}`,
            alignItems: "center"
        }}>
            <Tab title="All" active={true} />
            <Tab title="Screenshots" active={false} />
            <Tab title="Downloads" active={false} />
        </view>
    );
}
