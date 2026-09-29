"use client"

import type React from "react"
import { MotionConfig } from "framer-motion"

/**
 * MotionProvider - site-wide motion settings.
 *
 * reducedMotion="user" makes Framer Motion skip transform and layout
 * animations when the operating system requests reduced motion.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
