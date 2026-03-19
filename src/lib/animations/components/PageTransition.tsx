"use client";

/**
 * PageTransition - route-level enter/exit animation wrapper.
 *
 * Place ONCE in root layout.tsx, wrapping {children}.
 * Reads the current pathname and uses it as the AnimatePresence key.
 *
 * @example - in layout.tsx
 * <PageTransition>{children}</PageTransition>
 */
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { pageFadeUp } from "../variants/page";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: Variants;
}

export function PageTransition({ children, variant = pageFadeUp }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variant}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
