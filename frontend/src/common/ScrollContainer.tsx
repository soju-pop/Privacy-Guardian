import { useTheme } from "../theme/ThemeProvider.tsx";

export function ScrollContainer({ children }: { children: any }) {
    const theme = useTheme();

    return (
        <scroll-view
            scroll-orientation="vertical"
            style={{
                flex: 1,
                overflow: "auto",
                margin: "0 auto",
                background: theme.background,
                borderRadius: theme.borderRadius,
                boxShadow: theme.boxShadow,
                height: "75vh",
            }}
        >
            <view
                style={{
                    background: theme.card,
                    minHeight: "100vh",
                    padding: "20px",
                    color: theme.text,
                    fontFamily: theme.fontFamily,
                }}
            >
                {children}
            </view>
        </scroll-view>
    );
}
