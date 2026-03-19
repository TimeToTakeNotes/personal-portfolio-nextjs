"use client";

/**
 * useStagger - delay calculator for manually staggered lists.
 *
 * @example
 * const { getDelay } = useStagger(items.length, 0.1);
 * items.map((item, i) => (
 *   <motion.div key={item.id} variants={fadeUp} transition={{ delay: getDelay(i) }} />
 * ))
 */
export function useStagger(count: number, baseDelay = 0.1) {
  const getDelay = (index: number): number => baseDelay * index;
  const getTotalDuration = (itemDuration = 0.5): number =>
    baseDelay * Math.max(count - 1, 0) + itemDuration;

  return { getDelay, getTotalDuration };
}
