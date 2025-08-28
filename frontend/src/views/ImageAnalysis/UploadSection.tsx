import { Button } from "../../common/Button.tsx";
import { useTheme } from "../../theme/ThemeProvider.tsx";

interface UploadSectionProps {
    file: string | null;
    onUpload: () => void;
    onRemove: () => void;
}

export function UploadSection({ file, onUpload, onRemove }: UploadSectionProps) {
    const theme = useTheme();

    return (
        <view style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "20px" }}>
            {file ? (
                <>
                    <image
                        src={file}
                        auto-size={true}
                        mode="aspectFit"
                        style={{
                            width: "100%",
                            borderRadius: theme.borderRadius,
                            boxShadow: theme.boxShadow,
                            display: "block",
                            marginBottom: "12px",
                        }}
                    />
                    <view style={{ display: "flex", flexDirection: "row", gap: "12px", marginBottom: "12px" }}>
                        <Button
                            style={{
                                background: theme.secondary,
                                color: theme.textSecondary,
                                borderRadius: theme.borderRadius,
                                fontWeight: "600",
                                padding: "10px 20px",
                                width: "150px",
                            }}
                            bindtap={onUpload}
                        >
                            Change Image
                        </Button>
                        <Button
                            style={{
                                background: theme.danger,
                                color: theme.text,
                                borderRadius: theme.borderRadius,
                                fontWeight: "600",
                                padding: "8px 20px",
                                width: "150px",
                            }}
                            bindtap={onRemove}
                        >
                            Remove Image
                        </Button>
                    </view>
                </>
            ) : (
                <Button
                    style={{
                        background: theme.secondary,
                        color: theme.textSecondary,
                        borderRadius: theme.borderRadius,
                        fontWeight: "600",
                        marginBottom: "20px",
                        padding: "10px 20px",
                        width: "320px",
                    }}
                    bindtap={onUpload}
                >
                    Upload Image
                </Button>
            )}
        </view>
    );
}
