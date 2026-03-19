/**
 * Easing curves - cubic-bezier values for consistent motion feel.
 * Use these everywhere instead of raw arrays or string literals.
 *
 * Visualise: https://cubic-bezier.com
 */
export const easings = {
  /** Standard ease-out - most UI transitions */
  smooth:  [0.25, 0.46, 0.45, 0.94] as const,
  /** Overshoot/snap - badges, popovers, icons */
  spring:  [0.68, -0.55, 0.265, 1.55] as const,
  /** BackOut - slight overshoot then snap-settle (badges, CTAs, icon pops) */
  back:    [0.34, 1.56, 0.64, 1] as const,
  /** Material-design standard - form inputs, tabs */
  gentle:  [0.4, 0.0, 0.2, 1] as const,
  /** Fast in, fast out - quick dismissals */
  sharp:   [0.4, 0.0, 0.6, 1] as const,
  /** Fast in, slow out - large entrances */
  out:     [0.0, 0.0, 0.2, 1] as const,
  /** Slow in, fast out - exits */
  in:      [0.4, 0.0, 1.0, 1] as const,
} as const;

export type EasingKey = keyof typeof easings;
