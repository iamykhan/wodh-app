/**
 * Utility: Scroll helpers
 * Smooth scrolling functions for navigation
 */

/**
 * Smooth scroll to element by ID
 *
 * @param id - Element ID to scroll to (without # prefix)
 * @param options - ScrollIntoView options
 *
 * @example
 * scrollToId("hero")
 * scrollToId("contact", { block: "center" })
 */
export function scrollToId(
  id: string,
  options?: ScrollIntoViewOptions
): void {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
    ...options,
  });
}

/**
 * Smooth scroll to element by selector
 *
 * @param selector - CSS selector (e.g., "#hero", ".section")
 * @param options - ScrollIntoView options
 *
 * @example
 * scrollToSelector("#project-inquiry")
 * scrollToSelector(".hero-section", { block: "center" })
 */
export function scrollToSelector(
  selector: string,
  options?: ScrollIntoViewOptions
): void {
  if (typeof window === "undefined") return;

  const el = document.querySelector(selector);
  if (!el || !("scrollIntoView" in el)) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
    ...options,
  });
}

/**
 * Smooth scroll to top of page
 *
 * @example
 * scrollToTop()
 */
export function scrollToTop(): void {
  if (typeof window === "undefined") return;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
