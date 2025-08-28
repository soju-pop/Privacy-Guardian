import { Button } from "../../common/Button.tsx";
import { SampleImagePickerModal, sampleImages } from "../../components/SampleImagePickerModal.tsx";
import { UploadSection } from "./UploadSection.tsx";
import { useTheme } from "../../theme/ThemeProvider.tsx";

interface ImageAnalysisActionsProps {
    file: string | null;
    showModal: boolean;
    analysisLoading: boolean;
    redactingLoading: boolean;
    onUpload: () => void;
    onRemove: () => void;
    onAnalyze: () => void;
    onModalClose: () => void;
    onModalSelect: (img: string) => void;
    analysis: any;
}

export function ImageAnalysisActions({
    file,
    showModal,
    analysisLoading,
    redactingLoading,
    onUpload,
    onRemove,
    onAnalyze,
    onModalClose,
    onModalSelect,
    analysis,
}: ImageAnalysisActionsProps) {
    const theme = useTheme();

    return (
        <>
            <UploadSection file={file} onUpload={onUpload} onRemove={onRemove} />
            <SampleImagePickerModal
                show={showModal}
                images={sampleImages}
                selected={file}
                onSelect={onModalSelect}
                onClose={onModalClose}
            />
            <view style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <Button
                    bindtap={onAnalyze}
                    disabled={analysisLoading || redactingLoading || !file}
                    style={{
                        background: theme.primary,
                        borderRadius: theme.borderRadius,
                        padding: "10px 20px",
                        fontWeight: "600",
                        width: "320px",
                    }}
                >
                    {analysisLoading ? (analysis ? "Reanalyzing..." : "Analyzing...") : (analysis ? "Reanalyze" : "Analyze")}
                </Button>
            </view>
        </>
    );
}
