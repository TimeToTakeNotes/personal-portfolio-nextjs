/**
 * Duration tokens (seconds) - use these instead of magic numbers.
 *
 * Rule of thumb:
 *   instant/fast  → micro-interactions (hover, tap feedback)
 *   quick/base    → most UI transitions
 *   slow/xslow    → entrances, hero elements
 *   crawl         → ambient / background effects
 */
export const durations = {
  instant: 0.1,
  fast:    0.2,
  quick:   0.35,
  base:    0.5,
  slow:    0.7,
  xslow:   1.0,
  crawl:   1.5,
} as const;

export type DurationKey = keyof typeof durations;
