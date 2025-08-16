"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "app-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>("system")

  useEffect(() => {
    const applyTheme = (theme: Theme) => {
      const root = document.documentElement;
      root.classList.remove("light", "dark");

      const applied =
        theme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : theme;

      root.classList.add(applied);
      localStorage.setItem(storageKey, theme);
      setThemeState(theme);
    };

    const savedTheme = localStorage.getItem(storageKey) as Theme | null;

    const resolvedTheme =
      savedTheme ||
      (defaultTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : defaultTheme);

    applyTheme(resolvedTheme);
    setThemeState(resolvedTheme);
  }, [defaultTheme, storageKey]);

  // This is the function exposed for switching themes from UI
  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    const applied =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    root.classList.add(applied);
    localStorage.setItem(storageKey, theme);
    setThemeState(theme);
  };

  const value: ThemeProviderState = {
    theme,
    setTheme: applyTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}