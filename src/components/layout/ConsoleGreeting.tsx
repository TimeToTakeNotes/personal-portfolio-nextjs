"use client"

import { useEffect } from "react"
import { siteData } from "@arno/assets/site"

// Module-level flag: React Strict Mode runs effects twice in development.
let greeted = false

/**
 * ConsoleGreeting - prints a short styled note in the browser console for
 * visitors who open the developer tools. Renders nothing.
 */
export function ConsoleGreeting() {
  useEffect(() => {
    if (greeted) return
    greeted = true

    const styles = getComputedStyle(document.documentElement)
    const accent = styles.getPropertyValue("--primary").trim()
    const text = styles.getPropertyValue("--foreground").trim()
    const copy = siteData.sections.console

    console.log(`%c${siteData.name}`, `font: 400 28px Georgia, serif; color: ${accent};`)
    console.log(
      `%c${copy.greeting}\n\n${copy.sourceLabel} %s\n${copy.contactLabel} %s`,
      `font: 12px ui-monospace, SFMono-Regular, monospace; line-height: 1.6; color: ${text};`,
      siteData.links.source,
      siteData.email
    )
  }, [])

  return null
}
