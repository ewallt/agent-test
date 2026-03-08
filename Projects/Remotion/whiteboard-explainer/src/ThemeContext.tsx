import React, { createContext, useContext } from "react";
import { Theme, THEMES } from "./themes";

type ThemeContextValue = {
  theme: Theme;
  themeName: string;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: THEMES.warmPaper,
  themeName: "warmPaper",
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{
  themeName: string;
  children: React.ReactNode;
}> = ({ themeName, children }) => {
  const theme = THEMES[themeName] ?? THEMES.warmPaper;
  return (
    <ThemeContext.Provider value={{ theme, themeName }}>
      {children}
    </ThemeContext.Provider>
  );
};
