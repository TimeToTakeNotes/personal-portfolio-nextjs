"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { easings } from "@arno/lib/animations"

export function BackToTop() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.25, ease: easings.back }}
          whileHover="hovered"
          className="fixed bottom-6 right-6 z-50 h-11 w-11 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center overflow-hidden group"
        >
          {/* Ripple fill on hover */}
          <motion.span
            className="absolute inset-0 rounded-xl bg-white/15"
            initial={{ scale: 0, opacity: 0 }}
            variants={{
              hovered: { scale: 1, opacity: 1 },
            }}
            transition={{ duration: 0.25, ease: easings.smooth }}
          />

          {/* Arrow - shoots up and a fresh one enters from below */}
          <motion.span
            className="relative flex items-center justify-center"
            variants={{
              hovered: { y: -28 },
            }}
            transition={{ duration: 0.22, ease: "easeIn" }}
          >
            <ArrowUp className="h-4 w-4" />
          </motion.span>

          <motion.span
            className="absolute flex items-center justify-center"
            initial={{ y: 28 }}
            variants={{
              hovered: { y: 0 },
            }}
            transition={{ duration: 0.22, ease: easings.smooth, delay: 0.04 }}
          >
            <ArrowUp className="h-4 w-4" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
