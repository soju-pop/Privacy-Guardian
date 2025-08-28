import { createContext, useContext } from "@lynx-js/react";

export const ThemeContext = createContext({
  primary: "#ff0050",
  secondary: "#00f2ea",
  danger: "#ef4444",
  border: "#333",
  background: "#161616",
  text: "#fff",
  fontFamily: "Inter, sans-serif",
  card: "#0f0f0f",
  cardAlt: "#1a1a1a",
  highlight: "#2a0f12",
  tagBg: "#00f2ea22",
  tagText: "#00f2ea",
  muted: "#aaa",
  previewBg: "#1a1a1a",
  previewText: "#ddd",
  borderRadius: "12px",
  boxShadow: "0 4px 20px #0006",
  inputBg: "#1f1f1f",
  inputBorder: "#333",
  inputText: "#fff",
  headerText: "#fff",
  headerSubText: "#aaa",
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: any }) {
  const theme = {
    primary: "#ff0050",
    secondary: "#00f2ea",
    danger: "#ef4444",
    border: "#333",
    background: "#161616",
    text: "#fff",
    fontFamily: "Inter, sans-serif",
    card: "#0f0f0f",
    cardAlt: "#1a1a1a",
    highlight: "#2a0f12",
    tagBg: "#00f2ea22",
    tagText: "#00f2ea",
    muted: "#aaa",
    previewBg: "#1a1a1a",
    previewText: "#ddd",
    borderRadius: "12px",
    boxShadow: "0 4px 20px #0006",
    inputBg: "#1f1f1f",
    inputBorder: "#333",
    inputText: "#fff",
    headerText: "#fff",
    headerSubText: "#aaa",
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
