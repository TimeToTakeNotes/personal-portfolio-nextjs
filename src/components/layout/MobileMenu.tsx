"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import clsx from "clsx"
import { ThemeToggle } from "@arno/components/ui/ThemeToggle"
import { TextLink } from "@arno/components/ui/TextLink"
import { navLinks, siteData } from "@arno/assets/site"
import { easings, durations } from "@arno/lib/animations"

interface Props {
  open: boolean
  onClose: () => void
  activeSection: string
}

/**
 * MobileMenu - full-screen navigation for screens narrower than 1024px.
 * Locks page scroll while open and closes on Escape.
 */
export default function MobileMenu({ open, onClose, activeSection }: Props) {
  React.useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-[1000] overflow-y-auto bg-background lg:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: durations.slow, ease: easings.expo }}
        >
          <div className="container-page flex min-h-full flex-col py-10">
            <nav aria-label="Mobile">
              <ul>
                {navLinks.map(({ label, href }, i) => {
                  const isActive = activeSection === href.replace("#", "")
                  return (
                    <li key={href} className="overflow-hidden border-b border-border">
                      <motion.a
                        href={href}
                        onClick={onClose}
                        aria-current={isActive ? "true" : undefined}
                        className="flex items-baseline gap-4 py-5"
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: durations.xslow, ease: easings.expo, delay: 0.15 + i * 0.06 }}
                      >
                        <span className="eyebrow figures">{String(i + 1).padStart(2, "0")}</span>
                        <span
                          className={clsx(
                            "font-serif text-5xl leading-none",
                            isActive ? "italic text-primary" : "text-foreground"
                          )}
                        >
                          {label}
                        </span>
                      </motion.a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <motion.div
              className="mt-auto flex items-end justify-between gap-6 pt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: durations.slow, delay: 0.45 }}
            >
              <ul className="space-y-2 text-sm">
                <li>
                  <TextLink href={`mailto:${siteData.email}`}>{siteData.email}</TextLink>
                </li>
                <li>
                  <TextLink href={siteData.links.github} arrow="up-right" external>
                    GitHub
                  </TextLink>
                </li>
                <li>
                  <TextLink href={siteData.links.linkedin} arrow="up-right" external>
                    LinkedIn
                  </TextLink>
                </li>
              </ul>
              <ThemeToggle />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
