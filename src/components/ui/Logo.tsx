"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteData } from "@arno/assets/site"
import { cn } from "@arno/lib/utils"

interface LogoProps {
  href?: string
  className?: string
}

/**
 * Logo - serif wordmark. On the home page it scrolls to the top instead of navigating.
 */
export default function Logo({ href = "/", className }: LogoProps) {
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent) => {
    if (pathname === href) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn("font-serif text-2xl leading-none tracking-[-0.01em] transition-colors hover:text-primary", className)}
    >
      {siteData.name}
    </Link>
  )
}
