"use client"

import * as React from "react"
import { useMotionValueEvent, useScroll } from "framer-motion"
import clsx from "clsx"
import Logo from "@arno/components/ui/Logo"
import { ThemeToggle } from "@arno/components/ui/ThemeToggle"
import MobileMenu from "@arno/components/layout/MobileMenu"
import { CommandMenuTrigger } from "@arno/components/layout/CommandMenu"
import { navLinks } from "@arno/assets/site"

const SECTIONS = ["home", ...navLinks.map((link) => link.href.replace("#", ""))]

function useActiveSection() {
  const [active, setActive] = React.useState("home")

  React.useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return active
}

/**
 * MainNavigation - fixed site header. It stays visible at all times and
 * gets a background and a bottom rule after the page scrolls.
 */
export default function MainNavigation() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const activeSection = useActiveSection()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (current) => setScrolled(current > 12))

  // Close the mobile menu when the viewport grows to desktop width
  React.useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)")
    const onChange = () => query.matches && setMenuOpen(false)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1100] focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-[1001] transition-[background-color,border-color] duration-300",
          scrolled || menuOpen
            ? "border-b border-border bg-background/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
            <ul className="flex items-center gap-8">
              {navLinks.map(({ label, href }, i) => {
                const isActive = activeSection === href.replace("#", "")
                return (
                  <li key={href}>
                    <a
                      href={href}
                      aria-current={isActive ? "true" : undefined}
                      className={clsx(
                        "group inline-flex items-baseline gap-1.5 text-sm transition-colors",
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={clsx(
                          "h-1 w-1 self-center rounded-full bg-primary transition-transform duration-300",
                          isActive ? "scale-100" : "scale-0"
                        )}
                      />
                      <span className="link-draw">{label}</span>
                      <sup className="figures font-mono text-[0.6rem] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </sup>
                    </a>
                  </li>
                )
              })}
            </ul>
            <div className="flex items-center gap-3">
              <CommandMenuTrigger />
              <ThemeToggle />
            </div>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="eyebrow flex h-10 cursor-pointer items-center gap-3 text-foreground lg:hidden"
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-2.5 w-5">
              <span
                className={clsx(
                  "absolute left-0 h-px w-5 bg-foreground transition-transform duration-500",
                  menuOpen ? "top-1/2 rotate-45" : "top-0"
                )}
              />
              <span
                className={clsx(
                  "absolute left-0 h-px w-5 bg-foreground transition-transform duration-500",
                  menuOpen ? "top-1/2 -rotate-45" : "top-full"
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeSection={activeSection} />
    </>
  )
}
