import { createContext, useContext, useMemo, useState } from "react";

const lightTheme = {
  palette: {
    mode: "light",
    header: {
      background: "#e3f2fd",
      color: "rgba(0,0,0,.9)",
    },
    sidebar: {
      background: "#f8f6f2",
      color: "#676153",
    },
  },
};

const darkTheme = {
  palette: {
    mode: "dark",
    header: {
      background: "#212529",
      color: "#fff",
    },
    sidebar: {
      background: "linear-gradient(0deg,#ba54f5,#e14eca)",
      color: "#fff",
    },
  },
};

const ThemeContext = createContext();
export const ThemeWrapper = ({ children }) => {
  const defaultTheme = localStorage.getItem("themeMode")
    ? localStorage.getItem("themeMode")
    : "light";
  const [themeMode, setThemeMode] = useState(defaultTheme);
  localStorage.setItem("themeMode", themeMode);
  const resetTheme = () => {
    setThemeMode("light");
  };
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  const theme = useMemo(() => {
    return themeMode === "light" ? lightTheme : darkTheme;
  }, [themeMode]);
  const themeVal = {
    theme,
    themeMode,
    toggleTheme,
    resetTheme,
  };

  return (
    <ThemeContext.Provider value={themeVal}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
