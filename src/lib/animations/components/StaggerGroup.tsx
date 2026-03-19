"use client";

/**
 * StaggerGroup - scroll-triggered stagger container.
 *
 * @example
 * <StaggerGroup stagger="loose" className="grid grid-cols-3 gap-6">
 *   {items.map(item => (
 *     <motion.div key={item.id} variants={cardEntrance}>
 *       <Card />
 *     </motion.div>
 *   ))}
 * </StaggerGroup>
 */
import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { staggerContainer, staggerTight, staggerLoose, staggerCascade } from "../variants/stagger";
import { useReducedMotion } from "../hooks/useReducedMotion";

type StaggerPreset = "default" | "tight" | "loose" | "cascade";

const presets: Record<StaggerPreset, Variants> = {
  default: staggerContainer,
  tight:   staggerTight,
  loose:   staggerLoose,
  cascade: staggerCascade,
};

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  stagger?: StaggerPreset | Variants;
  amount?: number;
  once?: boolean;
  as?: "div" | "ul" | "ol" | "section" | "article" | "nav";
}

export function StaggerGroup({
  children,
  className,
  style,
  stagger = "default",
  amount = 0.1,
  once = true,
  as: Tag = "div",
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const prefersReduced = useReducedMotion();

  const variant: Variants =
    typeof stagger === "string" ? presets[stagger] : stagger;

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      variants={prefersReduced ? undefined : variant}
      initial={prefersReduced ? false : "hidden"}
      animate={prefersReduced ? false : isInView ? "visible" : "hidden"}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}
