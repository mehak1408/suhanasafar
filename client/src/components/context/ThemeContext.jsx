import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const forceTheme = (forcedTheme) => {
    document.documentElement.classList.toggle("dark", forcedTheme === "dark");
  };

  const restoreTheme = () => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, forceTheme, restoreTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}