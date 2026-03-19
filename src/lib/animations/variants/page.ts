/**
 * Page-level transition variants - route enter and exit animations.
 *
 * These are used ONLY by PageTransition component (in layout.tsx).
 * They use initial / animate / exit states - NOT hidden / visible.
 *
 * Next.js App Router caveat:
 *   Exit animations require AnimatePresence mode="wait" with key={pathname}.
 *   The old page stays mounted until exit completes, then the new page enters.
 *   This is handled automatically by PageTransition - do not use these variants
 *   directly on page components.
 */
import { Variants } from "framer-motion";
import { easings } from "../config/easings";

/**
 * Fade up - default for most route transitions.
 * Enters from slightly below, exits upward.
 */
export const pageFadeUp: Variants = {
  initial: { opacity: 0, y: 18, filter: "blur(4px)" },
  animate: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.45, ease: easings.smooth },
  },
  exit: {
    opacity: 0, y: -10, filter: "blur(2px)",
    transition: { duration: 0.28, ease: easings.in },
  },
};

/**
 * Pure fade - minimal, professional.
 */
export const pageFade: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, ease: easings.smooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.22, ease: easings.smooth },
  },
};

/**
 * Scale fade - premium app-like feel.
 */
export const pageScale: Variants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: {
    opacity: 1, scale: 1,
    transition: { duration: 0.42, ease: easings.smooth },
  },
  exit: {
    opacity: 0, scale: 1.02,
    transition: { duration: 0.25, ease: easings.smooth },
  },
};

/**
 * Slide left - drill-down / forward navigation feel.
 */
export const pageSlideLeft: Variants = {
  initial: { opacity: 0, x: 48 },
  animate: {
    opacity: 1, x: 0,
    transition: { duration: 0.42, ease: easings.smooth },
  },
  exit: {
    opacity: 0, x: -48,
    transition: { duration: 0.28, ease: easings.sharp },
  },
};
