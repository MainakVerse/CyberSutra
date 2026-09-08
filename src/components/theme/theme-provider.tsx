"use client";

import * as React from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "cybersutra-theme";

function applyThemeClass(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("light");

  React.useEffect(() => {
    let initial: Theme = "light";
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        initial = stored;
      } else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        initial = prefersDark ? "dark" : "light";
      }
    } catch {
      // sandboxed environments: fall back to system preference in state only
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      initial = prefersDark ? "dark" : "light";
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync of React state to the theme already applied by the inline anti-flash script
    setThemeState(initial);
    applyThemeClass(initial);
  }, []);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event: MediaQueryListEvent) => {
      let hasStored = false;
      try {
        hasStored = window.localStorage.getItem(STORAGE_KEY) !== null;
      } catch {
        hasStored = false;
      }
      if (!hasStored) {
        const next = event.matches ? "dark" : "light";
        setThemeState(next);
        applyThemeClass(next);
      }
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next);
    applyThemeClass(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore persistence failures (sandboxed / private browsing)
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyThemeClass(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore persistence failures
      }
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
