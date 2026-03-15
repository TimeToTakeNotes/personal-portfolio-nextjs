"use client"

import * as React from "react"
import { cn } from "@arno/lib/utils"

interface MarqueeProps {
  items: string[]
  /** Total animation duration in seconds - longer = slower */
  duration?: number
  className?: string
}

/**
 * Infinite horizontal marquee using a CSS animation for performance.
 * Renders items twice for seamless looping. Pauses on hover.
 */
export function Marquee({ items, duration = 32, className }: MarqueeProps) {
  return (
    <div
      className={cn("overflow-hidden relative select-none", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      {/* Left fade mask */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      {/* Right fade mask */}
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrolling track - two copies for seamless loop */}
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-0 flex-shrink-0"
            aria-hidden={i >= items.length}
          >
            <span className="text-sm font-medium text-muted-foreground px-5 whitespace-nowrap">
              {item}
            </span>
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-primary/35 flex-shrink-0"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
