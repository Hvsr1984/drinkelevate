import { useEffect, useState } from "react";

type Theme = "system" | "light" | "dark";

const THEME_KEY = "elevate-theme-preference";

const getStored = (): Theme => {
  const v = localStorage.getItem(THEME_KEY);
  return v === "light" || v === "dark" ? v : "system";
};

const applyTheme = (theme: Theme) => {
  const dark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
};

export const useSystemTheme = () => {
  const [theme, setThemeState] = useState<Theme>(getStored);

  const setTheme = (t: Theme) => {
    localStorage.setItem(THEME_KEY, t);
    setThemeState(t);
    applyTheme(t);
  };

  const toggle = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  useEffect(() => {
    applyTheme(theme);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (getStored() === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  return { theme, setTheme, toggle, isDark };
};
