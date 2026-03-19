/**
 * Entrance variants - used for scroll-triggered and load-time entrances.
 * All follow hidden → visible convention.
 * Pair with AnimatedSection or StaggerGroup wrappers.
 */
import { Variants } from "framer-motion";
import { easings } from "../config/easings";
import { durations } from "../config/durations";

/** Simple opacity fade */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.base, ease: easings.smooth } },
};

/** Fade + rise from below - default for most section content */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.slow, ease: easings.smooth } },
};

/** Fade + drop from above - good for sticky headers / top elements */
export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -32 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.slow, ease: easings.smooth } },
};

/** Fade + slide from right edge - good for right-aligned panels */
export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: durations.slow, ease: easings.smooth } },
};

/** Fade + slide from left edge - good for left-aligned panels */
export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: durations.slow, ease: easings.smooth } },
};

/** Scale up from slightly smaller - good for cards, modals */
export const scaleUp: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: durations.base, ease: easings.back } },
};

/** Scale down from slightly larger - good for overlays */
export const scaleDown: Variants = {
  hidden:  { opacity: 0, scale: 1.12 },
  visible: { opacity: 1, scale: 1, transition: { duration: durations.base, ease: easings.smooth } },
};

/** Blur + fade + rise - premium feel for hero text */
export const blurReveal: Variants = {
  hidden:  { opacity: 0, filter: "blur(10px)", y: 20 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0,
    transition: { duration: durations.xslow, ease: easings.smooth } },
};

/** Horizontal clip reveal - wipe-in effect for images / dividers */
export const clipRevealX: Variants = {
  hidden:  { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: { clipPath: "inset(0 0% 0 0)", opacity: 1,
    transition: { duration: durations.slow, ease: easings.smooth } },
};

/** Vertical clip reveal - curtain-drop for sections */
export const clipRevealY: Variants = {
  hidden:  { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: { clipPath: "inset(0 0 0% 0)", opacity: 1,
    transition: { duration: durations.slow, ease: easings.smooth } },
};

/** Card entrance - subtle 3D tilt unfold */
export const cardEntrance: Variants = {
  hidden:  { opacity: 0, y: 32, rotateX: -10, transformPerspective: 800 },
  visible: { opacity: 1, y: 0, rotateX: 0, transformPerspective: 800,
    transition: { duration: durations.slow, ease: easings.smooth } },
};

/** Icon pop - for small decorative icons */
export const iconPop: Variants = {
  hidden:  { opacity: 0, scale: 0, rotate: -30 },
  visible: { opacity: 1, scale: 1, rotate: 0,
    transition: { duration: durations.base, ease: easings.back } },
};
