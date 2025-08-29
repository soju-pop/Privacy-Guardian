import { Button } from "../common/Button.tsx";
import { useTheme } from "../theme/ThemeProvider.tsx";
import { useState, useEffect } from "@lynx-js/react";
import "./SampleImagePickerModal.css";
import "./SampleImagePickerModal.css";

export const sampleImages = [
    require("../assets/samples/cc1.jpg"),
    require("../assets/samples/lorem1.jpg"),
    require("../assets/samples/lorem2.jpg"),
    require("../assets/samples/lorem3.jpg"),
    require("../assets/samples/lorem4.jpg"),
    require("../assets/samples/lorem5.jpg"),
    require("../assets/samples/lorem6.jpg"),
    require("../assets/samples/lorem7.jpg"),
    require("../assets/samples/lorem8.jpg"),
    require("../assets/samples/lorem9.jpg"),
    require("../assets/samples/lorem10.jpg"),
    require("../assets/samples/lorem11.jpg"),
    require("../assets/samples/lorem12.jpg"),
    require("../assets/samples/lorem13.jpg"),
    require("../assets/samples/lorem14.jpg"),
    require("../assets/samples/lorem15.jpg"),
    require("../assets/samples/lorem16.jpg"),
    require("../assets/samples/lorem17.jpg"),
    require("../assets/samples/lorem18.jpg"),
    require("../assets/samples/lorem19.jpg"),
    require("../assets/samples/lorem20.jpg"),
    require("../assets/samples/lorem21.jpg"),
    require("../assets/samples/lorem22.jpg"),
    require("../assets/samples/lorem23.jpg"),
    require("../assets/samples/lorem24.jpg"),
    require("../assets/samples/lorem25.jpg"),
    require("../assets/samples/lorem26.jpg"),
    require("../assets/samples/lorem27.jpg"),
    require("../assets/samples/lorem28.jpg"),
    require("../assets/samples/lorem29.jpg"),
    require("../assets/samples/lorem30.jpg"),
    require("../assets/samples/lorem31.jpg"),
    require("../assets/samples/lorem32.jpg"),
    require("../assets/samples/lorem33.jpg"),
    require("../assets/samples/lorem34.jpg"),
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
    const [currentSelection, setCurrentSelection] = useState<string | null>(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (show) {
            setCurrentSelection(selected);
            setIsClosing(false);
        }
    }, [show, selected]);

    if (!show) return null;

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleAdd = () => {
        if (currentSelection) {
            onSelect(currentSelection);
        }
    };

    const handleImageSelect = (img: string) => {
        if (currentSelection === img) {
            setCurrentSelection(null);
        } else {
            setCurrentSelection(img);
        }
    };
    if (!show) return null;

    return (
        <view 
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.8)",
                zIndex: 1000,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
            }}
        >
            <view
                className="sample-image-modal-drawer"
                style={{
                    background: theme.background,
                    width: "100vw",
                    height: "60vh",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    animation: isClosing 
                        ? "slideDownFull 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both"
                        : "slideUpFull 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
                    overflow: "hidden",
                }}
            >
                {/* Header */}
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
                        bindtap={handleClose}
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
                        bindtap={currentSelection ? handleAdd : undefined}
                    >
                        Add
                    </text>
                </view>

                {/* Tab-like section */}
                <view style={{
                    display: "flex",
                    padding: "16px 20px",
                    background: theme.card,
                    borderBottom: `1px solid ${theme.border}`,
                }}>
                    <view style={{
                        background: theme.primary,
                        height: "25px",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        marginRight: "12px",
                        justifyContent: "center"
                    }}>
                        <text style={{ 
                            color: "white", 
                            fontSize: "15px", 
                            fontWeight: "500", 
                        }}>
                            All
                        </text>
                    </view>
                </view>

                {/* Images Grid */}
                <scroll-view
                    scroll-orientation="vertical"
                    style={{
                        height: "100%",
                        width: "100%"
                    }}
                >
                    <view style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "2px",
                        padding: "4px",
                    }}>
                        {images.map((img, idx) => (
                            <view
                                key={idx}
                                style={{
                                    position: "relative",
                                    cursor: "pointer",
                                    width: "calc(25% - 2px)",
                                    height: "120px",
                                }}
                                bindtap={() => handleImageSelect(img)}
                            >
                                <image
                                    src={img}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "2px",
                                    }}
                                />
                                {currentSelection === img && (
                                    <view style={{
                                        position: "absolute",
                                        top: "8px",
                                        right: "8px",
                                        width: "24px",
                                        height: "24px",
                                        background: theme.primary,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "2px solid white",
                                    }}>
                                        <text style={{ 
                                            color: "white", 
                                            fontSize: "14px", 
                                            fontWeight: "bold" 
                                        }}>
                                            ✓
                                        </text>
                                    </view>
                                )}
                                {currentSelection === img && (
                                    <view style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: "rgba(255, 0, 80, 0.3)",
                                        borderRadius: "2px",
                                        border: `3px solid ${theme.primary}`,
                                    }} />
                                )}
                            </view>
                        ))}
                    </view>
                </scroll-view>
            </view>
        </view>
    );
}
