import { Button } from "../common/Button.tsx";
import { useTheme } from "../theme/ThemeProvider.tsx";
import "./SampleImagePickerModal.css";

export const sampleImages = [
    require("../assets/samples/cc1.jpg"),
    require("../assets/samples/cc1.jpg"),
    require("../assets/samples/cc1.jpg"),
    require("../assets/samples/cc1.jpg"),
    require("../assets/samples/cc1.jpg"),
    require("../assets/samples/cc1.jpg"),
    require("../assets/samples/cc1.jpg"),
    require("../assets/samples/cc1.jpg"),
];

interface SampleImagePickerModalProps {
    show: boolean;
    images: string[];
    selected: string | null;
    onSelect: (img: string) => void;
    onClose: () => void;
}

export function SampleImagePickerModal({ show, images, selected, onSelect, onClose }: SampleImagePickerModalProps) {
    const theme = useTheme();
    if (!show) return null;

    return (
        <view style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: theme.background,
            zIndex: 1000,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",

        }}
            bindtap={onClose}>
            <view
                className="sample-image-modal-drawer"
                style={{
                    background: theme.card,
                    width: "100vw",
                    height: "100vh",
                    animation: "slideUpFull 0.38s cubic-bezier(.33,1,.68,1) both",
                    display: "flex",
                    flexDirection: "column",
                    padding: "50px 24px 24px 24px",
                    overflowY: "auto"
                }}
            >
                <text style={{ fontWeight: "700", fontSize: "20px", marginBottom: "18px", display: "block", textAlign: "center", color: theme.text }}>
                    Select a Sample Image
                </text>
                <view style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "16px" }}>
                    {images.map((img, idx) => (
                        <image
                            key={idx}
                            src={img}
                            style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "cover",
                                borderRadius: theme.borderRadius,
                                border: selected === img ? `2px solid ${theme.primary}` : `2px solid transparent`,
                                cursor: "pointer",
                                boxShadow: selected === img ? theme.boxShadow : undefined,
                                transition: "border 0.2s, box-shadow 0.2s",
                            }}
                            bindtap={() => onSelect(img)}
                        />
                    ))}
                </view>
                <Button
                    style={{ marginTop: "auto", width: "100%" }}
                    bindtap={onClose}
                >
                    Cancel
                </Button>
            </view>
        </view>
    );
}
