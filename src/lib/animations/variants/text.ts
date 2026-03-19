/**
 * Text-specific variants - for use with AnimatedText component.
 *
 * block variants  → animate the entire text node as one unit
 * word/char variants → animate per word/character (used by AnimatedText internally)
 */
import { Variants } from "framer-motion";
import { easings } from "../config/easings";
import { durations } from "../config/durations";

// ─── Block (whole-text) variants ────────────────────────────────────────────

/** Blur + fade + rise - default for hero headlines */
export const textBlock: Variants = {
  hidden:  { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: durations.xslow, ease: easings.smooth } },
};

/** Large headline with slight scale - for H1/H2 hero text */
export const headline: Variants = {
  hidden:  { opacity: 0, y: 48, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1,
    transition: { duration: durations.xslow, ease: easings.smooth } },
};

/** Clean slide-in from left - for body paragraphs */
export const textSlideIn: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0,
    transition: { duration: durations.slow, ease: easings.smooth } },
};

/** Badge / label pop - for small accent labels */
export const badgePop: Variants = {
  hidden:  { opacity: 0, scale: 0.8, y: -12 },
  visible: { opacity: 1, scale: 1, y: 0,
    transition: { duration: durations.base, ease: easings.back } },
};

// ─── Word-level variants (used by AnimatedText mode="words") ─────────────────

/** Word rise with perspective flip - eye-catching headline reveal */
export const wordReveal: Variants = {
  hidden:  { opacity: 0, y: 22, rotateX: -35, filter: "blur(3px)" },
  visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
    transition: { duration: durations.slow, ease: easings.smooth } },
};

/** Simple word fade-up - subtler alternative to wordReveal */
export const wordFadeUp: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,
    transition: { duration: durations.quick, ease: easings.out } },
};

/** Word slide from left - good for body copy */
export const wordSlide: Variants = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0,
    transition: { duration: durations.quick, ease: easings.smooth } },
};

// ─── Character-level variants (used by AnimatedText mode="chars") ────────────

/** Char drop - tight, fast character-by-character reveal */
export const charDrop: Variants = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0,
    transition: { duration: durations.fast, ease: easings.out } },
};
