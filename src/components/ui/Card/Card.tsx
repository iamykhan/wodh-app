/**
 * Component: Card
 * Simple card container (lighter than GlassPanel)
 * Used for simpler layouts without heavy glassmorphism
 */

"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { colors } from "@/lib/design-tokens";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  hover?: boolean;
  padding?: "none" | "small" | "medium" | "large";
  className?: string;
}

/**
 * Simple card container
 *
 * @example
 * <Card hover padding="medium">
 *   <h3>Card Title</h3>
 *   <p>Card content...</p>
 * </Card>
 */
export function Card({
  children,
  hover = false,
  padding = "medium",
  className,
  ...props
}: CardProps) {
  const paddingStyles = {
    none: "",
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  };

  return (
    <motion.div
      className={cn(
        "rounded-2xl border",
        paddingStyles[padding],
        className
      )}
      style={{
        borderColor: colors.border.primary,
        background: `${colors.background.overlay}88`,
      }}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.25 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
