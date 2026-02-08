/**
 * Design Tokens: Typography
 * Font sizes, weights, and line heights
 */

export const fontSize = {
  // Body text
  xs: "0.75rem",       // 12px
  sm: "0.875rem",      // 14px
  base: "1rem",        // 16px
  lg: "1.125rem",      // 18px
  xl: "1.25rem",       // 20px

  // Headings
  "2xl": "1.5rem",     // 24px
  "3xl": "1.875rem",   // 30px
  "4xl": "2.25rem",    // 36px
  "5xl": "3rem",       // 48px
  "6xl": "3.75rem",    // 60px
  "7xl": "4.5rem",     // 72px
  "8xl": "6rem",       // 96px
  "9xl": "8rem",       // 128px
} as const;

export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export const lineHeight = {
  none: 1,
  tight: 1.02,
  snug: 1.15,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
  ultra: "0.25em",
  mega: "0.35em",
} as const;

export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type LineHeight = typeof lineHeight;
export type LetterSpacing = typeof letterSpacing;
