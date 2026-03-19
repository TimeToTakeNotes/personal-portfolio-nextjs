"use client";

/**
 * AnimatedSection - scroll-triggered wrapper for any section or block.
 *
 * @example
 * <AnimatedSection variant={blurReveal} delay={0.2}>
 *   <HeroContent />
 * </AnimatedSection>
 */
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { fadeUp } from "../variants/entrance";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  variant?: Variants;
  className?: string;
  style?: React.CSSProperties;
  amount?: number;
  delay?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "main" | "li";
}

export function AnimatedSection({
  children,
  variant = fadeUp,
  className,
  style,
  amount = 0.1,
  delay,
  once = true,
  as: Tag = "div",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const prefersReduced = useReducedMotion();

  const resolved: Variants = delay
    ? {
        hidden: variant.hidden,
        visible: {
          ...(variant.visible as object),
          transition: {
            ...((variant.visible as { transition?: object })?.transition ?? {}),
            delay,
          },
        },
      }
    : variant;

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      variants={prefersReduced ? undefined : resolved}
      initial={prefersReduced ? { opacity: 1 } : "hidden"}
      animate={prefersReduced ? { opacity: 1 } : isInView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}
