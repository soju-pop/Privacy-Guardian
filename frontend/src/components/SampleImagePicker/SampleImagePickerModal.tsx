import { useTheme } from "../../theme/ThemeProvider.tsx";
import { useState, useEffect } from "@lynx-js/react";
import "./SampleImagePickerModal.css";
import { SampleImagePickerHeader } from "./SampleImagePickerHeader.tsx";
import { SampleImagePickerTabs } from "./SampleImagePickerTabs.tsx";
import { ImagesGrid } from "./ImagesGrid.tsx";
import { sampleImages } from "./sampleImages.ts";

export { sampleImages };

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
                <SampleImagePickerHeader 
                    currentSelection={currentSelection}
                    onClose={handleClose}
                    onAdd={handleAdd}
                />

                <SampleImagePickerTabs />

                <ImagesGrid 
                    images={images}
                    currentSelection={currentSelection}
                    onImageSelect={handleImageSelect}
                />
            </view>
        </view>
    );
}
