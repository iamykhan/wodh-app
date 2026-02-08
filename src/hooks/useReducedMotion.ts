/**
 * Hook: useReducedMotion
 * Detects user's motion preference for accessibility
 * Returns true if user prefers reduced motion
 */

"use client";

import { useState, useEffect } from "react";

/**
 * Check if user prefers reduced motion (accessibility)
 *
 * @returns boolean - true if reduced motion is preferred, false otherwise
 *
 * @example
 * const prefersReducedMotion = useReducedMotion();
 * const duration = prefersReducedMotion ? 0 : 0.6;
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if matchMedia is supported
    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Update on change
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add listener (handle both modern and legacy browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}
