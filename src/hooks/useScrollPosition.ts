/**
 * Hook: useScrollPosition
 * Tracks window scroll position with optional threshold
 * Replaces manual scroll event listeners in components
 */

"use client";

import { useState, useEffect } from "react";

interface UseScrollPositionOptions {
  threshold?: number;
}

interface ScrollPosition {
  scrollY: number;
  scrolled: boolean;
}

/**
 * Track window scroll position
 *
 * @param options - Configuration options
 * @param options.threshold - Scroll threshold in pixels (default: 8)
 * @returns Object with scrollY position and scrolled boolean
 *
 * @example
 * const { scrolled } = useScrollPosition({ threshold: 10 });
 * // scrolled will be true when scroll > 10px
 */
export function useScrollPosition(
  options: UseScrollPositionOptions = {}
): ScrollPosition {
  const { threshold = 8 } = options;

  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrolled: false,
  });

  useEffect(() => {
    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition({
        scrollY: currentScrollY,
        scrolled: currentScrollY > threshold,
      });
    };

    // Set initial position
    updateScrollPosition();

    // Add scroll listener
    window.addEventListener("scroll", updateScrollPosition, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, [threshold]);

  return scrollPosition;
}
