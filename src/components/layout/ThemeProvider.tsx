"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
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

function resolveTheme(theme: Theme): "dark" | "light" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }
  return theme
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "app-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)

  const applyTheme = useCallback(
    (newTheme: Theme) => {
      const root = document.documentElement
      root.classList.remove("light", "dark")
      root.classList.add(resolveTheme(newTheme))
      localStorage.setItem(storageKey, newTheme)
      setThemeState(newTheme)
    },
    [storageKey]
  )

  useEffect(() => {
    const saved = localStorage.getItem(storageKey) as Theme | null
    applyTheme(saved ?? defaultTheme)
  }, [defaultTheme, storageKey, applyTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: applyTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
