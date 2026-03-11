/**
 * Component: AmbientGlow
 * Ambient background glow effects
 * Reusable colored gradient orbs for atmospheric effects
 */

"use client";

import { colors } from "@/lib/design-tokens";

interface GlowConfig {
  color: string;
  size: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  opacity?: number;
  blur?: string;
}

interface AmbientGlowProps {
  glows?: GlowConfig[];
  mode?: "xr" | "games" | "dual";
}

/**
 * Ambient glow orbs for atmospheric background effects
 *
 * @example
 * <AmbientGlow mode="xr" />
 * <AmbientGlow mode="dual" />
 */
export function AmbientGlow({ glows, mode = "dual" }: AmbientGlowProps) {
  // Default glow configurations based on mode
  const defaultGlows: Record<string, GlowConfig[]> = {
    xr: [
      {
        color: `radial-gradient(circle, ${colors.neon.base}55, transparent)`,
        size: "600px",
        position: { top: "-150px", left: "20%" },
        opacity: 0.4,
        blur: "blur-3xl",
      },
    ],
    games: [
      {
        color: `radial-gradient(circle, ${colors.violet.base}66, transparent)`,
        size: "600px",
        position: { top: "-150px", right: "20%" },
        opacity: 0.4,
        blur: "blur-3xl",
      },
    ],
    dual: [
      {
        color: `radial-gradient(circle, ${colors.violet.base}44, transparent)`,
        size: "500px",
        position: { top: "-200px", right: "-50px" },
        opacity: 0.7,
        blur: "blur-3xl",
      },
      {
        color: `radial-gradient(circle, ${colors.neon.base}22, transparent)`,
        size: "450px",
        position: { bottom: "-150px", left: "-50px" },
        opacity: 0.7,
        blur: "blur-3xl",
      },
    ],
  };

  const glowsToRender = glows || defaultGlows[mode];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {glowsToRender.map((glow, index) => (
        <div
          key={index}
          className={`absolute rounded-full ${glow.blur || "blur-3xl"}`}
          style={{
            width: glow.size,
            height: glow.size,
            background: glow.color,
            opacity: glow.opacity || 0.5,
            ...glow.position,
          }}
        />
      ))}
    </div>
  );
}
