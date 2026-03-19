"use client";

/**
 * AnimatedText - word-by-word or block text animation.
 *
 * mode="words" (default) - splits into words, staggers them in
 * mode="block"           - animates whole text as one unit
 * mode="chars"           - character-by-character (use sparingly)
 *
 * @example
 * <AnimatedText as="h2" className="text-4xl font-bold">
 *   Intelligence is not optional.
 * </AnimatedText>
 */
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { wordReveal, textBlock } from "../variants/text";
import { makeStagger } from "../variants/stagger";
import { useReducedMotion } from "../hooks/useReducedMotion";

type TextTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
type Mode = "words" | "chars" | "block";

const motionTags: Record<TextTag, React.ElementType> = {
  h1: motion.h1, h2: motion.h2, h3: motion.h3,
  h4: motion.h4, h5: motion.h5, h6: motion.h6,
  p:  motion.p,  span: motion.span,
};

interface AnimatedTextProps {
  children: string;
  className?: string;
  as?: TextTag;
  mode?: Mode;
  variant?: Variants;
  staggerDelay?: number;
  amount?: number;
  delay?: number;
}

export function AnimatedText({
  children,
  className,
  as: Tag = "p",
  mode = "words",
  variant,
  staggerDelay = 0.07,
  amount = 0.3,
  delay = 0,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount });
  const prefersReduced = useReducedMotion();

  const MotionTag = motionTags[Tag];

  if (prefersReduced) {
    return (
      <MotionTag
        ref={ref}
        className={className}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay }}
      >
        {children}
      </MotionTag>
    );
  }

  if (mode === "block") {
    const blockVariant = variant ?? textBlock;
    const resolved = delay
      ? {
          hidden: blockVariant.hidden,
          visible: {
            ...(blockVariant.visible as object),
            transition: {
              ...((blockVariant.visible as { transition?: object })?.transition ?? {}),
              delay,
            },
          },
        }
      : blockVariant;

    return (
      <MotionTag
        ref={ref}
        className={className}
        variants={resolved}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </MotionTag>
    );
  }

  const units = mode === "chars" ? children.split("") : children.split(" ");
  const childVariant = variant ?? wordReveal;
  const containerVariant = makeStagger(staggerDelay, delay);

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={containerVariant}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={children}
      style={{ display: "flex", flexWrap: "wrap", columnGap: mode === "chars" ? "0" : "0.3em" }}
    >
      {units.map((unit, i) => (
        <motion.span
          key={i}
          variants={childVariant}
          aria-hidden="true"
          style={{ display: "inline-block", transformOrigin: "bottom center" }}
        >
          {unit}
          {mode === "chars" && unit === " " ? "\u00A0" : null}
        </motion.span>
      ))}
    </MotionTag>
  );
}
