/**
 * Stagger container variants - orchestrate children animations.
 *
 * Usage: apply a stagger variant to a parent motion element.
 * Children should use an entrance variant (e.g. fadeUp, cardEntrance).
 *
 * The container itself fades in (opacity 0→1) so it doesn't flash
 * while children are animating in.
 */
import { Variants } from "framer-motion";

/** Default stagger - balanced for most grids and feature lists */
export const staggerContainer: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/** Tight stagger - for compact lists, nav items, tags */
export const staggerTight: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

/** Loose stagger - for featured sections, hero stats, large cards */
export const staggerLoose: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.15 },
  },
};

/** Cascade - slow initial delay, then fast stagger - dramatic entrance */
export const staggerCascade: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

/**
 * Factory for custom stagger configuration.
 *
 * @example
 * const myStagger = makeStagger(0.1, 0.2);
 */
export function makeStagger(
  staggerChildren: number,
  delayChildren = 0
): Variants {
  return {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren, delayChildren },
    },
  };
}
