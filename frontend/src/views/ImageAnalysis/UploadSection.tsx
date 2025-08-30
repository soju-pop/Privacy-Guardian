import { Button } from "../../common/Button.tsx";
import { useTheme } from "../../theme/ThemeProvider.tsx";
import { useState, useEffect } from "react";

interface UploadSectionProps {
  file: string | null;
  onUpload: () => void;
  onRemove: () => void;
  redactedPreview?: string | null;
}

function ImageDisplay({
  src,
  redactedSrc,
  showToggle,
}: {
  src: string;
  redactedSrc?: string | null;
  showToggle: boolean;
}) {
  const theme = useTheme();
  const [showRedacted, setShowRedacted] = useState(false);

  useEffect(() => {
    if (redactedSrc && !showRedacted) {
      setShowRedacted(true);
    }
  }, [redactedSrc]);

  const currentSrc = showRedacted && redactedSrc ? redactedSrc.trim() : src;
  const currentLabel = showRedacted ? "Redacted Version" : "Original Image";

  return (
    <view style={{ position: "relative", width: "100%", height: "100%" }}>
      <image
        src={currentSrc}
        auto-size={true}
        mode="aspectFit"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow,
        }}
      />

      {/* Toggle control with text and icon side by side */}
      {showToggle && redactedSrc && (
        <view
          bindtap={() => setShowRedacted(!showRedacted)}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.7)",
            borderRadius: theme.borderRadius,
            padding: "4px 8px",
            gap: "8px",
          }}
        >
          <text
            style={{
              color: "white",
              fontSize: "10px",
              fontWeight: "600",
            }}
          >
            {currentLabel} 🔄
          </text>
        </view>
      )}
    </view>
  );
}

function ImagePlaceholder() {
  const theme = useTheme();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: theme.textSecondary,
        height: "100%",
      }}
    >
      <text
        style={{
          fontSize: "48px",
          marginBottom: "16px",
          opacity: 0.5,
        }}
      >
        📷
      </text>
      <text
        style={{
          fontSize: "16px",
          fontWeight: "500",
          color: theme.text,
          opacity: 0.7,
        }}
      >
        No image selected
      </text>
    </view>
  );
}

function ImageArea({
  file,
  redactedPreview,
}: {
  file: string | null;
  redactedPreview?: string | null;
}) {
  return (
    <view
      style={{
        width: "100%",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
        minHeight: "300px",
      }}
    >
      {file ? (
        <ImageDisplay
          src={file}
          redactedSrc={redactedPreview}
          showToggle={!!redactedPreview}
        />
      ) : (
        <ImagePlaceholder />
      )}
    </view>
  );
}

function UploadButton({ onUpload }: { onUpload: () => void }) {
  const theme = useTheme();

  return (
    <view style={{ display: "flex", justifyContent: "center" }}>
      <Button
        style={{
          background: theme.secondary,
          color: theme.textSecondary,
          borderRadius: theme.borderRadius,
          fontWeight: "600",
          padding: "12px 24px",
          width: "200px",
          fontSize: "16px",
        }}
        bindtap={onUpload}
      >
        Upload Image
      </Button>
    </view>
  );
}

function ImageControls({
  onUpload,
  onRemove,
}: {
  onUpload: () => void;
  onRemove: () => void;
}) {
  const theme = useTheme();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "12px",
        justifyContent: "center",
      }}
    >
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
          padding: "10px 20px",
          width: "150px",
        }}
        bindtap={onRemove}
      >
        Remove Image
      </Button>
    </view>
  );
}

function ButtonArea({
  file,
  onUpload,
  onRemove,
}: {
  file: string | null;
  onUpload: () => void;
  onRemove: () => void;
}) {
  return (
    <view style={{ width: "100%" }}>
      {file ? (
        <ImageControls onUpload={onUpload} onRemove={onRemove} />
      ) : (
        <UploadButton onUpload={onUpload} />
      )}
    </view>
  );
}

export function UploadSection({
  file,
  onUpload,
  onRemove,
  redactedPreview,
}: UploadSectionProps) {
  const theme = useTheme();

  return (
    <view
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
        background: theme.previewBg,
        borderRadius: theme.borderRadius,
        padding: "20px",
        minHeight: "400px",
        justifyContent: "space-between",
      }}
    >
      <ImageArea file={file} redactedPreview={redactedPreview} />
      <ButtonArea file={file} onUpload={onUpload} onRemove={onRemove} />
    </view>
  );
}
