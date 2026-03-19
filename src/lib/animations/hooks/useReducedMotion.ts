"use client";

/**
 * useReducedMotion - site-wide accessibility gate for motion.
 *
 * Wraps Framer Motion's useReducedMotion so all animation components
 * import from one place. Returns true if the OS/browser requests reduced motion.
 *
 * @example
 * const prefersReduced = useReducedMotion();
 * if (prefersReduced) return <>{children}</>;
 */
import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
