import { useTheme } from "../theme/ThemeProvider.tsx";

interface SectionHeaderProps {
    title: string;
    subtitle: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    const theme = useTheme();

    return (
        <view style={{ marginBottom: "24px" }}>
            <text
                style={{
                    fontWeight: "800",
                    fontSize: "24px",
                    color: theme.text,
                }}
            >
                {title}
            </text>
            <text style={{ fontSize: "14px", color: theme.muted }}>
                {subtitle}
            </text>
        </view>
    );
}
