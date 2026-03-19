/**
 * Interactive variants - hover, tap, and focus states.
 * Use with whileHover / whileTap / whileFocus props,
 * or as named states in a variants object.
 *
 * These are intentionally fast (< 0.3s) - interaction feedback must feel instant.
 */
import { Variants } from "framer-motion";
import { easings } from "../config/easings";

// ─── Hover effects ───────────────────────────────────────────────────────────

/** Lift on hover - standard card / button hover */
export const hoverLift: Variants = {
  rest:  { y: 0, scale: 1,    transition: { duration: 0.2, ease: "easeOut" } },
  hover: { y: -5, scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } },
};

/** Grow on hover - icon buttons, logo marks */
export const hoverGrow: Variants = {
  rest:  { scale: 1,    transition: { duration: 0.2 } },
  hover: { scale: 1.08, transition: { duration: 0.2, ease: "easeOut" } },
};

/** Subtle tilt - playful interactive cards */
export const hoverTilt: Variants = {
  rest:  { rotateZ: 0, scale: 1,    transition: { duration: 0.2 } },
  hover: { rotateZ: 2, scale: 1.02, transition: { duration: 0.2 } },
};

/** Glow pulse - CTA buttons, key action elements */
export const hoverGlow: Variants = {
  rest:  { boxShadow: "0 0 0px rgba(158,54,58,0)",
    transition: { duration: 0.3 } },
  hover: { boxShadow: "0 0 24px rgba(158,54,58,0.35), 0 0 8px rgba(158,54,58,0.2)",
    transition: { duration: 0.3 } },
};

/** Underline slide - nav links, text links */
export const hoverUnderline: Variants = {
  rest:  { scaleX: 0, transition: { duration: 0.2, ease: "easeOut" } },
  hover: { scaleX: 1, transition: { duration: 0.2, ease: "easeOut" } },
};

// ─── Combined entrance + interactive (for buttons, links) ────────────────────

/** Full button variant - entrance + hover + tap states */
export const buttonPress: Variants = {
  hidden:  { opacity: 0, y: 16, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  hover:   { scale: 1.04, transition: { duration: 0.18, ease: "easeOut" } },
  tap:     { scale: 0.97, transition: { duration: 0.08 } },
};

/** Icon with entrance + hover spin */
export const iconSpin: Variants = {
  hidden:  { scale: 0, rotate: -180, opacity: 0 },
  visible: (delay: number = 0) => ({
    scale: 1, rotate: 0, opacity: 1,
    transition: { duration: 0.5, delay, ease: easings.back },
  }),
  hover: { scale: 1.2, rotate: 12, transition: { duration: 0.2 } },
};

// ─── Tap / press states (standalone - use with whileTap) ─────────────────────

/** Standard press down */
export const tapPress = { scale: 0.97 } as const;

/** Harder press - for large interactive areas */
export const tapShrink = { scale: 0.94 } as const;
