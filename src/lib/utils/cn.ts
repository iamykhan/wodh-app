/**
 * Utility: className merger
 * Combines multiple className strings using clsx
 * Supports conditional classes and handles duplicates
 */

import { clsx, type ClassValue } from "clsx";

/**
 * Merge className strings conditionally
 *
 * @example
 * cn("base-class", isActive && "active-class", "another-class")
 * // Returns: "base-class active-class another-class" (if isActive is true)
 *
 * @param inputs - className values to merge
 * @returns Merged className string
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
