"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, CornerDownLeft, Search } from "lucide-react"
import clsx from "clsx"
import { useTheme } from "@arno/components/layout/ThemeProvider"
import type { Theme, ThemeOrigin } from "@arno/components/layout/ThemeProvider"
import { navLinks, siteData } from "@arno/assets/site"
import { copyText } from "@arno/lib/clipboard"
import { durations, easings } from "@arno/lib/animations"

const copy = siteData.sections.commandMenu

/** Time in milliseconds that a command's confirmation stays visible before the menu closes */
const CONFIRM_MS = 700

// ── Context ────────────────────────────────────────────────────────────────

interface CommandMenuState {
  open: () => void
}

const CommandMenuContext = React.createContext<CommandMenuState | undefined>(undefined)

export function useCommandMenu() {
  const context = React.useContext(CommandMenuContext)
  if (!context) throw new Error("useCommandMenu must be used within a CommandMenuProvider")
  return context
}

// ── Commands ───────────────────────────────────────────────────────────────

interface CommandContext {
  close: () => void
  confirm: (id: string) => void
  setTheme: (theme: Theme, origin?: ThemeOrigin) => void
  origin: () => ThemeOrigin | undefined
}

interface Command {
  id: string
  group: "Go to" | "Actions" | "Theme"
  label: string
  /** Extra words that match the search */
  keywords?: string
  /** Label shown after the command runs, before the menu closes */
  confirmation?: string
  theme?: Theme
  run: (ctx: CommandContext) => void | Promise<void>
}

function scrollToSection(id: string) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer")
}

const COMMANDS: Command[] = [
  ...[{ label: "Top", href: "#home" }, ...navLinks].map(({ label, href }) => ({
    id: `go-${href.slice(1)}`,
    group: "Go to" as const,
    label,
    keywords: "section navigate scroll",
    run: ({ close }: CommandContext) => {
      close()
      // Wait one tick so the page scroll lock is released before scrolling
      setTimeout(() => scrollToSection(href.slice(1)), 50)
    },
  })),
  {
    id: "copy-email",
    group: "Actions",
    label: "Copy email address",
    keywords: `mail contact ${siteData.email}`,
    confirmation: siteData.sections.contact.copied,
    run: async ({ confirm, close }) => {
      const ok = await copyText(siteData.email)
      if (ok) confirm("copy-email")
      else {
        close()
        window.location.href = `mailto:${siteData.email}`
      }
    },
  },
  {
    id: "download-cv",
    group: "Actions",
    label: siteData.cv.label,
    keywords: "resume pdf",
    run: ({ close }) => {
      const link = document.createElement("a")
      link.href = siteData.cv.href
      link.download = siteData.cv.href.slice(1)
      link.click()
      close()
    },
  },
  {
    id: "open-github",
    group: "Actions",
    label: "Open GitHub",
    keywords: "code repositories profile",
    run: ({ close }) => {
      openExternal(siteData.links.github)
      close()
    },
  },
  {
    id: "open-linkedin",
    group: "Actions",
    label: "Open LinkedIn",
    keywords: "profile network",
    run: ({ close }) => {
      openExternal(siteData.links.linkedin)
      close()
    },
  },
  {
    id: "view-source",
    group: "Actions",
    label: "View the source of this site",
    keywords: "code github repository",
    run: ({ close }) => {
      openExternal(siteData.links.source)
      close()
    },
  },
  ...(["light", "dark", "system"] as const).map((theme) => ({
    id: `theme-${theme}`,
    group: "Theme" as const,
    label: `${theme[0].toUpperCase()}${theme.slice(1)} theme`,
    keywords: "appearance mode colour color",
    theme,
    run: ({ setTheme, origin, close }: CommandContext) => {
      // Read the origin first, then close the menu. Start the wipe after the
      // menu exit animation ends, so the page snapshot does not include the menu.
      const point = origin()
      close()
      setTimeout(() => setTheme(theme, point), durations.quick * 1000 + 50)
    },
  })),
]

const matches = (command: Command, query: string) => {
  const haystack = `${command.group} ${command.label} ${command.keywords ?? ""}`.toLowerCase()
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word))
}

// ── Dialog ─────────────────────────────────────────────────────────────────

function CommandDialog({ onClose }: { onClose: () => void }) {
  const { theme, setTheme } = useTheme()
  const [query, setQuery] = React.useState("")
  const [active, setActive] = React.useState(0)
  const [confirmed, setConfirmed] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listId = React.useId()

  const results = React.useMemo(() => COMMANDS.filter((c) => matches(c, query)), [query])
  const activeCommand = results[active]
  const optionId = (id: string) => `${listId}-${id}`

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Keep the active option in view while moving with the arrow keys
  React.useEffect(() => {
    if (!activeCommand) return
    document.getElementById(optionId(activeCommand.id))?.scrollIntoView({ block: "nearest" })
    // optionId only depends on listId, which is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCommand])

  const run = (command: Command) => {
    void command.run({
      close: onClose,
      confirm: (id) => {
        setConfirmed(id)
        setTimeout(onClose, CONFIRM_MS)
      },
      setTheme,
      origin: () => {
        const rect = document.getElementById(optionId(command.id))?.getBoundingClientRect()
        return rect ? { x: rect.left + 24, y: rect.top + rect.height / 2 } : undefined
      },
    })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      if (results.length === 0) return
      const step = e.key === "ArrowDown" ? 1 : -1
      setActive((i) => (i + step + results.length) % results.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (activeCommand) run(activeCommand)
    } else if (e.key === "Escape") {
      e.preventDefault()
      onClose()
    } else if (e.key === "Tab") {
      // Focus stays in the search field; the arrow keys move through the list
      e.preventDefault()
    }
  }

  let lastGroup = ""

  return (
    <motion.div
      className="fixed inset-0 z-[1100] flex items-start justify-center px-4 pt-[14vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: durations.fast }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-foreground/25 backdrop-blur-[2px]" onClick={onClose} />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={copy.triggerLabel}
        className="relative w-full max-w-xl overflow-hidden rounded-sm border border-border-strong/20 bg-popover text-popover-foreground shadow-[0_24px_60px_-20px_rgb(0_0_0/0.35)]"
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: durations.quick, ease: easings.expo }}
      >
        <div className="flex items-center gap-3 border-b border-border px-5">
          <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={activeCommand ? optionId(activeCommand.id) : undefined}
            aria-autocomplete="list"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={onKeyDown}
            placeholder={copy.placeholder}
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground/70 focus-visible:outline-none"
          />
          <kbd className="eyebrow shrink-0 rounded-sm border border-border px-1.5 py-0.5">Esc</kbd>
        </div>

        <ul id={listId} role="listbox" aria-label={copy.triggerLabel} className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 && <li className="px-5 py-6 text-sm text-muted-foreground">{copy.empty}</li>}
          {results.map((command, i) => {
            const showGroup = command.group !== lastGroup
            lastGroup = command.group
            const isActive = i === active
            const isConfirmed = confirmed === command.id
            const isCurrentTheme = command.theme !== undefined && command.theme === theme

            return (
              <React.Fragment key={command.id}>
                {showGroup && (
                  <li role="presentation" className="eyebrow px-5 pb-1 pt-3">
                    {command.group}
                  </li>
                )}
                <li
                  id={optionId(command.id)}
                  role="option"
                  aria-selected={isActive}
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(command)}
                  className={clsx(
                    "relative flex cursor-pointer items-center justify-between gap-4 px-5 py-2.5 text-sm transition-colors",
                    isActive ? "bg-muted text-foreground" : "text-foreground/80"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "absolute inset-y-1.5 left-0 w-0.5 origin-center bg-primary transition-transform duration-300",
                      isActive ? "scale-y-100" : "scale-y-0"
                    )}
                  />
                  <span className={clsx("transition-transform duration-300", isActive && "translate-x-1")}>
                    {isConfirmed ? <span className="italic text-primary">{command.confirmation}</span> : command.label}
                  </span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    {isCurrentTheme && <Check aria-label="Current" className="h-3.5 w-3.5 text-primary" />}
                    {isActive && <CornerDownLeft aria-hidden="true" className="h-3.5 w-3.5" />}
                  </span>
                </li>
              </React.Fragment>
            )
          })}
        </ul>

        <div className="eyebrow flex gap-5 border-t border-border px-5 py-3">
          <span>↑ ↓ Move</span>
          <span>Enter Select</span>
          <span>Esc Close</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Provider ───────────────────────────────────────────────────────────────

/**
 * CommandMenuProvider - keyboard command menu, opened with Cmd+K or Ctrl+K,
 * or from a trigger that calls useCommandMenu().open().
 */
export function CommandMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const returnFocus = React.useRef<HTMLElement | null>(null)

  const open = React.useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null
    setIsOpen(true)
  }, [])

  const close = React.useCallback(() => {
    setIsOpen(false)
    returnFocus.current?.focus?.()
  }, [])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        if (isOpen) close()
        else open()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, open, close])

  // Lock page scroll while the menu is open
  React.useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  const value = React.useMemo(() => ({ open }), [open])

  return (
    <CommandMenuContext.Provider value={value}>
      {children}
      <AnimatePresence>{isOpen && <CommandDialog key="command-menu" onClose={close} />}</AnimatePresence>
    </CommandMenuContext.Provider>
  )
}

// ── Trigger ────────────────────────────────────────────────────────────────

/**
 * CommandMenuTrigger - small button that shows the keyboard shortcut for the
 * current platform and opens the command menu.
 */
export function CommandMenuTrigger({ className }: { className?: string }) {
  const { open } = useCommandMenu()
  const [shortcut, setShortcut] = React.useState("Ctrl K")

  React.useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.userAgent)) setShortcut("⌘ K")
  }, [])

  return (
    <button
      type="button"
      onClick={open}
      aria-label={copy.triggerLabel}
      aria-keyshortcuts="Meta+K Control+K"
      className={clsx(
        "eyebrow cursor-pointer rounded-sm border border-border px-2 py-1 text-foreground/80 transition-colors hover:border-foreground/60 hover:text-foreground",
        className
      )}
    >
      {shortcut}
    </button>
  )
}
