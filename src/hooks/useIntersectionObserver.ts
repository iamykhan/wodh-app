/**
 * Hook: useIntersectionObserver
 * Observes element visibility in viewport
 * Replaces manual IntersectionObserver setup
 */

"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * Observe element visibility in viewport
 *
 * @param options - IntersectionObserver options
 * @returns [ref, entry] - Ref to attach to element and intersection entry
 *
 * @example
 * const [ref, entry] = useIntersectionObserver({ threshold: 0.5 });
 * const isVisible = entry?.isIntersecting;
 *
 * return <div ref={ref}>{isVisible ? "Visible!" : "Not visible"}</div>;
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<T | null>, IntersectionObserverEntry | null] {
  const {
    threshold = 0,
    root = null,
    rootMargin = "0px",
    freezeOnceVisible = false,
  } = options;

  const elementRef = useRef<T | null>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    const element = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;

    // Don't observe if already frozen or no support
    if (!hasIOSupport || frozen || !element) {
      return;
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      setEntry(entries[0]);
    };

    const observerOptions = { threshold, root, rootMargin };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, frozen]);

  return [elementRef, entry];
}

/**
 * Simple hook to check if element is in viewport
 * Returns just a boolean for simpler use cases
 *
 * @example
 * const [ref, isVisible] = useIsInViewport({ threshold: 0.3 });
 */
export function useIsInViewport<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<T | null>, boolean] {
  const [ref, entry] = useIntersectionObserver<T>(options);
  return [ref, entry?.isIntersecting ?? false];
}
