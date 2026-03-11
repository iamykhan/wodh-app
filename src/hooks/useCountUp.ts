/**
 * Hook: useCountUp
 * Animated number counter with easing
 * Extracted from KeyStats component for reusability
 */

"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Count up animation for numbers
 *
 * @param target - Target number to count to
 * @param durationMs - Duration of animation in milliseconds
 * @param startWhen - Boolean to trigger animation
 * @returns Current animated value
 *
 * @example
 * const [isVisible, setIsVisible] = useState(false);
 * const count = useCountUp(100, 1500, isVisible);
 */
export function useCountUp(
  target: number,
  durationMs: number = 1500,
  startWhen: boolean = true
): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startWhen) return;

    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      // easeOutCubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(target * eased);
      setValue(next);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, durationMs, startWhen]);

  return value;
}
