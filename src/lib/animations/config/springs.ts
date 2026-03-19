/**
 * Spring physics presets - for natural, physics-based motion.
 * Use springs for interactive elements (drag, hover, resize).
 * Use tween (easings) for entrance / exit sequences.
 *
 * stiffness → how fast it moves  (higher = snappier)
 * damping   → how quickly it stops (lower = more bounce)
 * mass      → inertia (higher = slower to start and stop)
 */
export const springs = {
  /** Snappy - toolbars, dropdowns */
  snappy: { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.8 },
  /** Fluid - cards, panels */
  fluid:  { type: "spring" as const, stiffness: 200, damping: 20, mass: 1.0 },
  /** Bouncy - badges, icons, fun elements */
  bouncy: { type: "spring" as const, stiffness: 300, damping: 15, mass: 0.8 },
  /** Gentle - large layout shifts */
  gentle: { type: "spring" as const, stiffness: 100, damping: 15, mass: 1.0 },
  /** Slow - background / decorative elements */
  slow:   { type: "spring" as const, stiffness: 60,  damping: 12, mass: 1.5 },
} as const;

export type SpringKey = keyof typeof springs;
