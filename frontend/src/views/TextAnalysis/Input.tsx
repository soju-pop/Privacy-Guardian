import { useTheme } from "../../theme/ThemeProvider.tsx";

interface TextAnalysisInputProps {
    input: string;
    setInput: (val: string) => void;
}

export function TextAnalysisInput({ input, setInput }: TextAnalysisInputProps) {
    const theme = useTheme();
    
    return (
        <textarea
            // Need to ignore as bindinput doesn't exist in the react types but exist on lynx
            // @ts-ignore
            bindinput={(e: any) => setInput(e.detail.value)}
            value={input}
            placeholder="Paste or type your text here..."
            style={{
                width: "100%",
                minHeight: "100px",
                border: `1px solid ${theme.inputBorder}`,
                borderRadius: theme.borderRadius,
                padding: "14px",
                fontSize: "16px",
                marginBottom: "20px",
                background: theme.inputBg,
                color: theme.inputTextColor,
            }}
        />
    );
}
