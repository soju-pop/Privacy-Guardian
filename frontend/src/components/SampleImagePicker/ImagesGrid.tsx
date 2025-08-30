import { useTheme } from "../../theme/ThemeProvider.tsx";

interface ImagesGridProps {
  images: string[];
  currentSelection: string | null;
  onImageSelect: (img: string) => void;
}

export function ImagesGrid({
  images,
  currentSelection,
  onImageSelect,
}: ImagesGridProps) {
  const theme = useTheme();

  return (
    <scroll-view
      scroll-orientation="vertical"
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <view
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2px",
          padding: "4px",
        }}
      >
        {images.map((img, idx) => (
          <view
            key={idx}
            style={{
              position: "relative",
              cursor: "pointer",
              width: "calc(25% - 2px)",
              height: "120px",
            }}
            bindtap={() => onImageSelect(img)}
          >
            <image
              src={img}
              mode="aspectFill"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "2px",
              }}
            />
            {currentSelection === img && (
              <view
                style={{
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
                }}
              >
                <text
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  ✓
                </text>
              </view>
            )}
            {currentSelection === img && (
              <view
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(255, 0, 80, 0.3)",
                  borderRadius: "2px",
                  border: `3px solid ${theme.primary}`,
                }}
              />
            )}
          </view>
        ))}
      </view>
    </scroll-view>
  );
}
