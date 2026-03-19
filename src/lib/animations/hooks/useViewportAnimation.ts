"use client";

/**
 * useViewportAnimation - scroll-triggered animation hook.
 *
 * Returns a ref to attach to the element you want to watch, and an isInView
 * boolean to drive animate={isInView ? "visible" : "hidden"}.
 *
 * Defaults:
 *   once: true   - animates in once and stays (standard for landing pages)
 *   amount: 0.1  - triggers when 10% of element is visible
 *   margin: -50px - slight offset so elements don't fire right at the edge
 *
 * @example
 * const { ref, isInView } = useViewportAnimation({ amount: 0.2 });
 * <motion.div ref={ref} variants={fadeUp} animate={isInView ? "visible" : "hidden"} />
 */
import { useRef } from "react";
import { useInView, UseInViewOptions } from "framer-motion";

export function useViewportAnimation(options?: UseInViewOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "-50px" as UseInViewOptions["margin"],
    ...options,
  });

  return { ref, isInView };
}

export type ViewportAnimationOptions = UseInViewOptions;
