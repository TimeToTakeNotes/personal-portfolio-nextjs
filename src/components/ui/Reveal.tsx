"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { easings, durations, useViewportAnimation } from "@arno/lib/animations"
import { cn } from "@arno/lib/utils"

type RevealTag = "h1" | "h2" | "h3" | "p" | "span" | "div"

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const

interface RevealTextProps {
  children: string
  as?: RevealTag
  className?: string
  /** Delay in seconds before the first word starts */
  delay?: number
  /** Delay in seconds between words */
  stagger?: number
  /** Start on mount instead of when the element enters the viewport */
  onMount?: boolean
}

/**
 * RevealText - masked word-by-word reveal.
 *
 * Each word slides up from behind a clipping mask. Screen readers get the
 * full string once, through a visually hidden copy.
 */
export function RevealText({
  children,
  as = "span",
  className,
  delay = 0,
  stagger = 0.045,
  onMount = false,
}: RevealTextProps) {
  const { ref, isInView: inView } = useViewportAnimation({ margin: "0px 0px -12% 0px" })
  const visible = onMount || inView
  // All tags share the motion.div ref type; the element type differs only in name.
  const Tag = motionTags[as] as typeof motion.div
  const words = children.split(" ")

  return (
    <Tag ref={ref} className={className}>
      <span className="visually-hidden">{children}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span
                className="inline-block will-change-transform"
                initial={{ y: "110%" }}
                animate={visible ? { y: "0%" } : { y: "110%" }}
                transition={{ duration: durations.xslow, ease: easings.expo, delay: delay + i * stagger }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </span>
    </Tag>
  )
}

interface RuleProps {
  className?: string
  delay?: number
  /** Use the strong (ink) colour instead of the hairline border colour */
  strong?: boolean
}

/**
 * Rule - horizontal hairline that draws from left to right when it enters
 * the viewport. Use it to separate content instead of boxed containers.
 */
export function Rule({ className, delay = 0, strong = false }: RuleProps) {
  const { ref, isInView: inView } = useViewportAnimation({ margin: "0px 0px -8% 0px" })

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn("h-px w-full origin-left", strong ? "bg-border-strong" : "bg-border", className)}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: durations.crawl, ease: easings.expo, delay }}
    />
  )
}

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "div" | "li" | "dl" | "ul"
}

/**
 * FadeIn - short fade and rise for supporting content (body copy, lists).
 */
export function FadeIn({ children, className, delay = 0, as = "div" }: FadeInProps) {
  const { ref, isInView: inView } = useViewportAnimation({ margin: "0px 0px -10% 0px" })
  const Tag = motion[as] as typeof motion.div

  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: durations.xslow, ease: easings.expo, delay }}
    >
      {children}
    </Tag>
  )
}
