"use client"

import * as React from "react"
import { Check, Moon, Sun } from "lucide-react"
import { Button } from "@arno/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@arno/components/ui/DropdownMenu"
import { useTheme } from "@arno/components/layout/ThemeProvider"

const OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  // The theme change spreads out from the centre of the toggle button
  const origin = () => {
    const rect = triggerRef.current?.getBoundingClientRect()
    return rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button ref={triggerRef} variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
          <Sun
            aria-hidden="true"
            className="h-4 w-4 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0"
          />
          <Moon
            aria-hidden="true"
            className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100"
          />
          <span className="visually-hidden">Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[9rem]">
        {OPTIONS.map(({ value, label }) => (
          <DropdownMenuItem key={value} onClick={() => setTheme(value, origin())} className="justify-between">
            {label}
            {theme === value && <Check aria-hidden="true" className="h-3.5 w-3.5" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
