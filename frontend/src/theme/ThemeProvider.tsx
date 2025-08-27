import { createContext, useContext } from "@lynx-js/react";

export const ThemeContext = createContext({
  primary: "#2563eb",
  secondary: "#f1f5f9",
  danger: "#ef4444",
  border: "#e5e7eb",
  background: "#fff",
  text: "#222",
  fontFamily: "Inter, sans-serif",
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: any }) {
  const theme = {
    primary: "#2563eb",
    secondary: "#f1f5f9",
    danger: "#ef4444",
    border: "#e5e7eb",
    background: "#fff",
    text: "#222",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
