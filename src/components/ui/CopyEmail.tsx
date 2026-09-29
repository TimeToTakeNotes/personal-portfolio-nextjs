"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { siteData } from "@arno/assets/site"
import { copyText } from "@arno/lib/clipboard"
import { cn } from "@arno/lib/utils"
import { durations, easings } from "@arno/lib/animations"

const copy = siteData.sections.contact

/** Time in milliseconds that the "Copied" state stays visible */
const COPIED_MS = 2200

/**
 * CopyEmail - large email address that copies itself to the clipboard.
 *
 * On success the address slides up and a confirmation slides in from below.
 * If the clipboard is not available, the click opens the mail app instead.
 */
export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout>>(null)

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  const handleClick = async () => {
    const ok = await copyText(siteData.email)
    if (!ok) {
      window.location.href = `mailto:${siteData.email}`
      return
    }
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), COPIED_MS)
  }

  const Icon = copied ? Check : Copy

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleClick}
        className="group inline-flex max-w-full cursor-pointer items-center gap-4 text-left font-serif text-[clamp(1.75rem,5.5vw,4.5rem)] leading-none transition-colors hover:text-primary"
      >
        <span className="inline-grid overflow-hidden pb-[0.12em]">
          <AnimatePresence initial={false}>
            <motion.span
              key={copied ? "copied" : "email"}
              className={cn("col-start-1 row-start-1 break-all", copied ? "italic text-primary" : "link-underline")}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-110%" }}
              transition={{ duration: durations.slow, ease: easings.expo }}
            >
              {copied ? copy.copied : siteData.email}
            </motion.span>
          </AnimatePresence>
        </span>
        <Icon
          aria-hidden="true"
          className={cn(
            "h-[0.5em] w-[0.5em] shrink-0 transition-transform duration-500",
            copied ? "text-primary" : "group-hover:-translate-y-1"
          )}
        />
        <span className="visually-hidden">{copy.copyHint}</span>
      </button>

      <p className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-1 text-sm text-muted-foreground">
        <span className="eyebrow">{copy.copyHint}</span>
        <a href={`mailto:${siteData.email}`} className="link-underline hover:text-foreground">
          {copy.mailAppLabel}
        </a>
      </p>

      {/* Announces the result to screen readers */}
      <span role="status" aria-live="polite" className="visually-hidden">
        {copied ? copy.copied : ""}
      </span>
    </div>
  )
}
