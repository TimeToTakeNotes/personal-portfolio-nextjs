import type React from "react"
import { cn } from "@arno/lib/utils"
import { Rule } from "@arno/components/ui/Reveal"

interface SectionProps {
  children: React.ReactNode
  id: string
  /** Two-digit section number shown in the header row, for example "01" */
  index: string
  /** Short section name shown next to the number */
  label: string
  /** Optional text on the right of the header row */
  aside?: React.ReactNode
  className?: string
}

/**
 * Section - editorial section shell.
 *
 * Renders a numbered header row above a hairline rule, then the content.
 * Sections are separated by space and rules, not by background fills.
 */
export function Section({ children, id, index, label, aside, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className={cn("relative py-24 md:py-36", className)}>
      <div className="container-page">
        <div className="eyebrow flex items-baseline justify-between gap-6 pb-4">
          <p id={`${id}-label`} className="flex items-baseline gap-4">
            <span className="figures text-primary">{index}</span>
            <span className="text-foreground">{label}</span>
          </p>
          {aside && <div className="text-right">{aside}</div>}
        </div>
        <Rule strong />
        <div className="pt-12 md:pt-20">{children}</div>
      </div>
    </section>
  )
}
