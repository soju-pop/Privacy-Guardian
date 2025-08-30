import { useTheme } from "../../theme/ThemeProvider.tsx";

interface SampleImagePickerHeaderProps {
    currentSelection: string | null;
    onClose: () => void;
    onAdd: () => void;
}

export function SampleImagePickerHeader({ currentSelection, onClose, onAdd }: SampleImagePickerHeaderProps) {
    const theme = useTheme();

    return (
        <view style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: `1px solid ${theme.border}`,
            background: theme.card,
        }}>
            <text 
                style={{ 
                    color: theme.primary, 
                    fontSize: "17px",
                    cursor: "pointer"
                }}
                bindtap={onClose}
            >
                Cancel
            </text>
            <text style={{ 
                color: theme.text, 
                fontSize: "17px", 
                fontWeight: "600" 
            }}>
                Gallery
            </text>
            <text 
                style={{ 
                    color: currentSelection ? theme.primary : theme.muted, 
                    fontSize: "17px",
                    fontWeight: "600",
                    cursor: currentSelection ? "pointer" : "default"
                }}
                bindtap={currentSelection ? onAdd : undefined}
            >
                Add
            </text>
        </view>
    );
}
