"use client"

import * as React from "react"
import { animate, motion, useMotionValue, useTransform } from "framer-motion"

export function HeroIntro() {
  const [visible, setVisible] = React.useState(true)
  const radius = useMotionValue(0)

  // Mask: transparent circle (shows hero) grows outward through black overlay (hides hero)
  const maskImage = useTransform(
    radius,
    (r) => `radial-gradient(circle at 50% 50%, transparent ${r}px, black ${r + 5}px)`
  )

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false)
      return
    }

    // Distance from center to the farthest corner - ensures the circle covers the full screen
    const maxR = Math.hypot(window.innerWidth / 2, window.innerHeight / 2) + 80

    const controls = animate(radius, maxR, {
      delay: 0.2,
      duration: 1.05,
      ease: [0.16, 1, 0.3, 1], // strong ease-out: snaps open fast, settles smoothly
      onComplete: () => setVisible(false),
    })

    return () => controls.stop()
  }, [radius])

  if (!visible) return null

  return (
    <motion.div
      className="fixed inset-0 z-[200] pointer-events-none select-none"
      style={{ backgroundColor: "#9e363a", maskImage, WebkitMaskImage: maskImage }}
      aria-hidden
    />
  )
}
