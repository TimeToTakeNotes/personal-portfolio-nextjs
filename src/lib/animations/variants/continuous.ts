/**
 * Continuous / looping variants - ambient, decorative motion.
 * These always use animate state (no hidden/visible convention).
 *
 * Usage: <motion.div variants={floatY} animate="animate" />
 *
 * All respect reduced-motion via the AnimatedSection wrapper or
 * directly with useReducedMotion() in the consuming component.
 */
import { Variants } from "framer-motion";

/** Gentle vertical float - decorative icons, hero graphics */
export const floatY: Variants = {
  animate: {
    y: [-6, 6, -6],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

/** Float + slight rotation - more organic feel */
export const floatYRotate: Variants = {
  animate: {
    y: [-5, 5, -5],
    rotate: [-1.5, 1.5, -1.5],
    transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
  },
};

/** Horizontal drift - background decorative elements */
export const driftX: Variants = {
  animate: {
    x: [-8, 8, -8],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

/** Opacity pulse - glows, status indicators */
export const pulse: Variants = {
  animate: {
    opacity: [0.3, 0.7, 0.3],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  },
};

/** Scale pulse - for blobs, background shapes */
export const pulseSlow: Variants = {
  animate: {
    scale: [1, 1.06, 1],
    opacity: [0.25, 0.5, 0.25],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

/** Slow spin - loading indicators, decorative rings */
export const spinSlow: Variants = {
  animate: {
    rotate: [0, 360],
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  },
};

/** Fast spin - loading spinners */
export const spinFast: Variants = {
  animate: {
    rotate: [0, 360],
    transition: { duration: 0.8, repeat: Infinity, ease: "linear" },
  },
};

/** Shimmer sweep - skeleton loaders, loading states */
export const shimmerSweep: Variants = {
  animate: {
    backgroundPosition: ["-200% 0", "200% 0"],
    transition: { duration: 1.8, repeat: Infinity, ease: "linear" },
  },
};
