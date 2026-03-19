/**
 * Animation system - single import point.
 *
 *   import { AnimatedSection, fadeUp, staggerContainer } from "@arno/lib/animations";
 *
 * ─── Architecture ────────────────────────────────────────────────────────────
 *
 *  config/        Pure constants. No React, no imports from outside config/.
 *    easings      Cubic-bezier curves (smooth, spring, gentle, sharp, out, in)
 *    durations    Duration tokens in seconds (instant → crawl)
 *    springs      Spring physics presets (snappy, fluid, bouncy, gentle, slow)
 *
 *  variants/      Pure Framer Motion Variants objects. No React.
 *    entrance     Scroll/load entrances: fadeUp, blurReveal, cardEntrance, etc.
 *    text         Text-specific: textBlock, headline, wordReveal, badgePop, etc.
 *    interactive  Hover/tap states: hoverLift, hoverGlow, buttonPress, etc.
 *    stagger      Container orchestration: staggerContainer, makeStagger, etc.
 *    continuous   Looping ambient: floatY, pulse, shimmerSweep, spinSlow, etc.
 *    page         Route transitions: pageFadeUp, pageFade, pageScale, pageSlideLeft
 *
 *  hooks/         React hooks. Runtime logic only - no JSX.
 *    useViewportAnimation   Scroll trigger (ref + isInView)
 *    useStagger             Per-item delay calculator
 *    useReducedMotion       Accessibility gate
 *
 *  components/    Drop-in React wrappers.
 *    AnimatedSection   Scroll-triggered wrapper
 *    AnimatedText      Word-by-word or block text animation
 *    StaggerGroup      Stagger container for grids and lists
 *    PageTransition    Route-level enter/exit (use once in layout.tsx)
 */

// Config
export * from "./config/easings";
export * from "./config/durations";
export * from "./config/springs";

// Variants
// Note: fadeIn is excluded here - the legacy compat section below exports it
// as { initial, animate, transition } so existing spread-prop usage doesn't break.
export {
  fadeUp, fadeDown, fadeLeft, fadeRight,
  scaleUp, scaleDown, blurReveal,
  clipRevealX, clipRevealY,
  cardEntrance, iconPop,
} from "./variants/entrance";
export * from "./variants/text";
export * from "./variants/interactive";
export * from "./variants/stagger";
export * from "./variants/continuous";
export * from "./variants/page";

// Hooks
export { useViewportAnimation } from "./hooks/useViewportAnimation";
export type { ViewportAnimationOptions } from "./hooks/useViewportAnimation";
export { useStagger } from "./hooks/useStagger";
export { useReducedMotion } from "./hooks/useReducedMotion";

// Components
export { AnimatedSection } from "./components/AnimatedSection";
export { AnimatedText } from "./components/AnimatedText";
export { StaggerGroup } from "./components/StaggerGroup";
export { PageTransition } from "./components/PageTransition";

// ─── Legacy compatibility exports ─────────────────────────────────────────────
// These preserve the old { initial, animate, transition } spread-prop API so
// existing section components don't break until they migrate to hidden/visible.
import { easings } from "./config/easings";
import { durations } from "./config/durations";

export const easeOut = easings.smooth;

// fadeIn excluded from entrance barrel to avoid HTML `hidden` attribute collision.
// This version uses { initial, animate, transition } so {…fadeIn} spreads work correctly.
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: durations.fast, ease: easings.smooth },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: durations.quick, ease: easings.smooth },
};

export const slideInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: durations.slow, ease: easings.smooth },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: durations.quick, ease: easings.smooth },
};

export const slideInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: durations.quick, ease: easings.smooth },
};

export const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: durations.fast, ease: easings.smooth },
};

export const glowOnHover = {
  whileHover: {
    boxShadow: "0 0 20px rgba(158,54,58,0.3)",
    transition: { duration: durations.fast },
  },
};
