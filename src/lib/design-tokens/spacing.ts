/**
 * Design Tokens: Spacing
 * Consistent spacing scale across the application
 */

export const spacing = {
  // Container padding
  container: {
    mobile: "1.25rem",    // 20px
    tablet: "2rem",       // 32px
    desktop: "3rem",      // 48px
  },

  // Section spacing (vertical)
  section: {
    small: "4rem",        // 64px
    medium: "7rem",       // 112px
    large: "10rem",       // 160px
  },

  // Component gaps
  gap: {
    xs: "0.5rem",         // 8px
    sm: "0.75rem",        // 12px
    md: "1rem",           // 16px
    lg: "1.5rem",         // 24px
    xl: "2rem",           // 32px
    "2xl": "3rem",        // 48px
  },
} as const;

export const maxWidth = {
  container: "80rem",     // 1280px - main container
  content: "75rem",       // 1200px - content width
  prose: "42rem",         // 672px - readable text width
} as const;

export type Spacing = typeof spacing;
export type MaxWidth = typeof maxWidth;
