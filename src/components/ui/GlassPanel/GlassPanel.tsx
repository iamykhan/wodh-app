/**
 * Component: GlassPanel
 * Reusable glassmorphism container with glow effects
 * Used for cards, panels, and containers throughout the app
 */

"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { colors, rgba } from "@/lib/design-tokens";

interface GlassPanelProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  mode?: "xr" | "games" | "neutral";
  hover?: boolean;
  glow?: boolean;
  className?: string;
}

/**
 * Glass panel with backdrop blur and optional glow effects
 *
 * @example
 * <GlassPanel mode="xr" hover glow>
 *   <h2>Content here</h2>
 * </GlassPanel>
 */
export function GlassPanel({
  children,
  mode = "neutral",
  hover = false,
  glow = false,
  className,
  ...props
}: GlassPanelProps) {
  const baseStyles = "relative rounded-3xl border overflow-hidden";

  const { background, borderColor, glowColor } = getColorsByMode(mode);

  return (
    <motion.div
      className={cn(baseStyles, "group", className)}
      style={{
        background,
        borderColor,
        boxShadow: glow ? `inset 0 0 70px ${glowColor}` : undefined,
        backdropFilter: "blur(2px)",
      }}
      whileHover={hover ? { y: -6, scale: 1.015 } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {/* Hover glow effect */}
      {hover && mode !== "neutral" && (
        <div
          className={cn(
            "pointer-events-none absolute h-80 w-80 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            mode === "xr" ? "-right-28 -top-28" : "-left-28 -top-28"
          )}
          style={{
            background:
              mode === "xr" ? `${colors.neon.base}55` : `${colors.violet.base}66`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Helper function to get colors based on mode
function getColorsByMode(mode: "xr" | "games" | "neutral") {
  const BG = colors.background.primary;
  const PANEL = colors.background.panel;
  const MID = colors.border.primary;
  const NEON = colors.neon.base;
  const VIOLET = colors.violet.base;

  switch (mode) {
    case "xr":
      return {
        background: `radial-gradient(1000px 650px at 15% 10%, ${rgba(NEON, 0.22)}, transparent 60%), linear-gradient(180deg, ${PANEL}ee, ${BG}ee)`,
        borderColor: MID,
        glowColor: rgba(NEON, 0.06),
      };
    case "games":
      return {
        background: `radial-gradient(1000px 650px at 85% 10%, ${rgba(VIOLET, 0.33)}, transparent 60%), linear-gradient(180deg, ${PANEL}ee, ${BG}ee)`,
        borderColor: MID,
        glowColor: rgba(VIOLET, 0.1),
      };
    case "neutral":
    default:
      return {
        background: `linear-gradient(180deg, ${PANEL}ee, ${BG}ee)`,
        borderColor: MID,
        glowColor: rgba(MID, 0.05),
      };
  }
}
