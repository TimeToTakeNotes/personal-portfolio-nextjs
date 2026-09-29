"use client"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react"

export type Theme = "dark" | "light" | "system"

/** Viewport point that the theme change spreads out from */
export interface ThemeOrigin {
  x: number
  y: number
}

type ThemeProviderProps = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  /** Applies a theme. With an origin, the change spreads out from that point as a circle. */
  setTheme: (theme: Theme, origin?: ThemeOrigin) => void
}

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined)

/** Duration of the circular theme wipe in milliseconds */
const WIPE_MS = 700

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

  const setTheme = useCallback(
    (newTheme: Theme, origin?: ThemeOrigin) => {
      const root = document.documentElement
      const changesColours = !root.classList.contains(resolveTheme(newTheme))
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      // Fall back to an instant change when the View Transitions API is not
      // available, the colours do not change, or the user prefers reduced motion.
      if (!origin || !changesColours || reducedMotion || !document.startViewTransition) {
        applyTheme(newTheme)
        return
      }

      const radius = Math.hypot(
        Math.max(origin.x, window.innerWidth - origin.x),
        Math.max(origin.y, window.innerHeight - origin.y)
      )
      const transition = document.startViewTransition(() => applyTheme(newTheme))
      transition.ready
        .then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${origin.x}px ${origin.y}px)`,
                `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
              ],
            },
            {
              duration: WIPE_MS,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          )
        })
        .catch(() => {
          // The transition was skipped; the theme is already applied.
        })
    },
    [applyTheme]
  )

  useEffect(() => {
    const saved = localStorage.getItem(storageKey) as Theme | null
    applyTheme(saved ?? defaultTheme)
  }, [defaultTheme, storageKey, applyTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
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
