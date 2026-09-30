import * as React from "react"
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react"
import { cn } from "@arno/lib/utils"

const arrows = {
  "up-right": ArrowUpRight,
  right: ArrowRight,
  down: ArrowDown,
  up: ArrowUp,
} as const

// Hover motion for each arrow direction. The arrow moves in the direction it points.
const arrowMotion = {
  "up-right": "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  right: "group-hover:translate-x-1",
  down: "group-hover:translate-y-0.5",
  up: "group-hover:-translate-y-0.5",
} as const

interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  arrow?: keyof typeof arrows
  /** Opens in a new tab with safe rel attributes */
  external?: boolean
  /** "draw" shows the underline on hover only. "underline" shows it always. */
  underline?: "draw" | "underline"
}

/**
 * TextLink - inline text link with an optional directional arrow.
 * Use it for all navigation and outbound links instead of button-styled links.
 */
export function TextLink({
  href,
  arrow,
  external = false,
  underline = "draw",
  className,
  children,
  ...props
}: TextLinkProps) {
  const Icon = arrow ? arrows[arrow] : null

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn("group inline-flex items-baseline gap-1.5 transition-colors hover:text-primary", className)}
      {...props}
    >
      <span className={underline === "draw" ? "link-draw" : "link-underline"}>{children}</span>
      {Icon && arrow && (
        <Icon
          aria-hidden="true"
          className={cn(
            "h-[0.85em] w-[0.85em] shrink-0 self-center transition-transform duration-300",
            arrowMotion[arrow]
          )}
        />
      )}
      {external && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  )
}
