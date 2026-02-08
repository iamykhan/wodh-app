/**
 * Component: Chip
 * Small tag/badge component for labels and categories
 */

"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { colors } from "@/lib/design-tokens";

interface ChipProps {
  children: ReactNode;
  variant?: "default" | "accent";
  mode?: "xr" | "games";
  className?: string;
}

/**
 * Chip component for tags and labels
 *
 * @example
 * <Chip>AR • VR • MR</Chip>
 * <Chip variant="accent" mode="xr">Featured</Chip>
 */
export function Chip({
  children,
  variant = "default",
  mode = "xr",
  className,
}: ChipProps) {
  const baseStyles =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border";

  const variantStyles = {
    default: {
      className: "text-white/75",
      style: {
        borderColor: colors.border.primary,
        background: `${colors.background.overlay}66`,
      },
    },
    accent: {
      className: "",
      style: {
        color: mode === "xr" ? colors.neon.base : colors.violet.base,
        borderColor: mode === "xr" ? colors.neon.base : colors.violet.base,
        background: `${mode === "xr" ? colors.neon.base : colors.violet.base}11`,
      },
    },
  };

  const styles = variantStyles[variant];

  return (
    <span
      className={cn(baseStyles, styles.className, className)}
      style={styles.style}
    >
      {children}
    </span>
  );
}
