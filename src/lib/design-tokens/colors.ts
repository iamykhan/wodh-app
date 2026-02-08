/**
 * Design Tokens: Colors
 * Centralized color palette for the entire application
 * Single source of truth for all color values
 */

export const colors = {
  // Base backgrounds
  background: {
    primary: "#0C0722",    // Main background - deep indigo
    panel: "#0F0A26",      // Panel background - slightly lighter
    overlay: "#0A061A",    // Overlay/modal background
  },

  // Border colors
  border: {
    primary: "#2A1E55",    // Main border color - mid purple
    muted: "#1D1633",      // Subtle borders
  },

  // Accent colors (XR Studio)
  neon: {
    base: "#9EF315",       // Primary neon green
    light: "#B5F750",      // Lighter variant
    glow: "#9EF31555",     // For glow effects (with alpha)
  },

  // Accent colors (Games Studio)
  violet: {
    base: "#5B2DDC",       // Primary violet
    light: "#B9A8FF",      // Light violet (text)
    pale: "#D1C6FF",       // Pale violet
    glow: "#5B2DDC66",     // For glow effects (with alpha)
  },

  // Text colors
  text: {
    primary: "#FFFFFF",    // Pure white
    secondary: "#F3F3F3",  // Off-white
    muted: "#EDEDED",      // Muted white
    violet: "#B9A8FF",     // Violet text
    pale: "#D1C6FF",       // Pale violet text
  },

  // Opacity variants (for quick access)
  white: {
    100: "rgba(255, 255, 255, 1)",
    90: "rgba(255, 255, 255, 0.9)",
    80: "rgba(255, 255, 255, 0.8)",
    75: "rgba(255, 255, 255, 0.75)",
    70: "rgba(255, 255, 255, 0.7)",
    65: "rgba(255, 255, 255, 0.65)",
    60: "rgba(255, 255, 255, 0.6)",
    55: "rgba(255, 255, 255, 0.55)",
    50: "rgba(255, 255, 255, 0.5)",
    40: "rgba(255, 255, 255, 0.4)",
    35: "rgba(255, 255, 255, 0.35)",
    30: "rgba(255, 255, 255, 0.3)",
    20: "rgba(255, 255, 255, 0.2)",
    15: "rgba(255, 255, 255, 0.15)",
    10: "rgba(255, 255, 255, 0.1)",
  },

  black: {
    100: "rgba(0, 0, 0, 1)",
    90: "rgba(0, 0, 0, 0.9)",
    80: "rgba(0, 0, 0, 0.8)",
    70: "rgba(0, 0, 0, 0.7)",
    60: "rgba(0, 0, 0, 0.6)",
    50: "rgba(0, 0, 0, 0.5)",
    40: "rgba(0, 0, 0, 0.4)",
    30: "rgba(0, 0, 0, 0.3)",
    20: "rgba(0, 0, 0, 0.2)",
    10: "rgba(0, 0, 0, 0.1)",
  },
} as const;

/**
 * Helper function to create RGBA color with custom opacity
 * @param hex - Hexadecimal color value
 * @param alpha - Opacity value (0-1)
 */
export function rgba(hex: string, alpha: number): string {
  // Remove # if present
  hex = hex.replace("#", "");

  // Parse hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Get accent color based on mode
 * @param mode - "xr" or "games"
 */
export function getAccentColor(mode: "xr" | "games"): string {
  return mode === "xr" ? colors.neon.base : colors.violet.base;
}

/**
 * Get glow color based on mode
 * @param mode - "xr" or "games"
 */
export function getGlowColor(mode: "xr" | "games"): string {
  return mode === "xr" ? colors.neon.glow : colors.violet.glow;
}

// Type exports for TypeScript
export type ColorMode = "xr" | "games";
export type Colors = typeof colors;
