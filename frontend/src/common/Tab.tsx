import { useTheme } from "../theme/ThemeProvider.tsx";

interface TabProps {
    label: string;
    value: string;
    isActive: boolean;
    onClick: (value: string) => void;
}

export function Tab({ label, value, isActive, onClick }: TabProps) {
    const theme = useTheme();

    return (
        <view
            bindtap={() => onClick(value)}
            style={{
                flex: "1 1 0%",
                padding: "16px",
                fontWeight: "600",
                fontSize: "16px",
                borderBottom: isActive ? `3px solid ${theme.secondary}` : "3px solid transparent",
                background: isActive ? theme.tab : "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <text style={{ color: theme.text }}>{label}</text>
        </view>
    );
}
