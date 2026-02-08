/**
 * Component: Button
 * Reusable button component with multiple variants
 * Supports XR/Games modes with appropriate styling
 */

"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { colors } from "@/lib/design-tokens";
import { ButtonVariant, ButtonSize, ColorMode } from "./Button.types";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  mode?: ColorMode;
  fullWidth?: boolean;
  disabled?: boolean;
}

/**
 * Button component with variants and modes
 *
 * @example
 * <Button variant="primary" mode="xr">Click Me</Button>
 * <Button variant="secondary" size="large">Secondary Button</Button>
 */
export function Button({
  children,
  href,
  variant = "primary",
  size = "medium",
  mode = "xr",
  fullWidth = false,
  disabled = false,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all";

  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-5 py-3 text-base",
    large: "px-6 py-4 text-lg",
  };

  const variantStyles = {
    primary: getPrimaryStyles(mode),
    secondary: getSecondaryStyles(),
    ghost: getGhostStyles(mode),
    outline: getOutlineStyles(mode),
  };

  const widthStyles = fullWidth ? "w-full" : "";

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "hover:-translate-y-0.5 active:translate-y-0";

  const combinedClassName = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant].className,
    widthStyles,
    disabledStyles,
    className
  );

  // If href provided, render as Link
  if (href) {
    return (
      <Link
        href={href}
        className={combinedClassName}
        style={variantStyles[variant].style}
      >
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={combinedClassName}
      style={variantStyles[variant].style}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Variant style generators
function getPrimaryStyles(mode: ColorMode) {
  const accentColor = mode === "xr" ? colors.neon.base : colors.violet.base;
  const textColor = mode === "xr" ? colors.black[100] : colors.text.primary;

  return {
    className: "",
    style: {
      background:
        mode === "xr"
          ? accentColor
          : `linear-gradient(90deg, ${colors.violet.base}, ${colors.neon.base}55)`,
      color: textColor,
      boxShadow: `0 0 44px ${accentColor}55`,
    },
  };
}

function getSecondaryStyles() {
  return {
    className: "text-white",
    style: {
      background: colors.background.overlay,
      border: `1px solid ${colors.border.primary}`,
    },
  };
}

function getGhostStyles(mode: ColorMode) {
  const accentColor = mode === "xr" ? colors.neon.base : colors.violet.base;

  return {
    className: "hover:bg-white/5",
    style: {
      color: accentColor,
      background: "transparent",
    },
  };
}

function getOutlineStyles(mode: ColorMode) {
  const accentColor = mode === "xr" ? colors.neon.base : colors.violet.base;

  return {
    className: "",
    style: {
      color: accentColor,
      background: "transparent",
      border: `1px solid ${accentColor}`,
    },
  };
}
