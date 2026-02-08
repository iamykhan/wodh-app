/**
 * Component: GradientText
 * Text with gradient color effect
 * Supports XR/Games modes with appropriate gradients
 */

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { colors } from "@/lib/design-tokens";

interface GradientTextProps {
  children: React.ReactNode;
  mode?: "xr" | "games" | "dual";
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  className?: string;
}

/**
 * Text with gradient color effect
 *
 * @example
 * <GradientText mode="xr" as="h1">SPATIAL REALITIES</GradientText>
 * <GradientText mode="dual">XR + Games</GradientText>
 */
export function GradientText({
  children,
  mode = "xr",
  as: Component = "span",
  className,
}: GradientTextProps) {
  const gradientStyles = {
    xr: `linear-gradient(90deg, ${colors.neon.base}, ${colors.neon.light})`,
    games: `linear-gradient(90deg, ${colors.violet.base}, ${colors.violet.light})`,
    dual: `linear-gradient(90deg, ${colors.neon.base}, ${colors.violet.base})`,
  };

  return (
    <Component
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        className
      )}
      style={{
        backgroundImage: gradientStyles[mode],
      }}
    >
      {children}
    </Component>
  );
}
