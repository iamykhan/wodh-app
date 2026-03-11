"use client";

import { colors } from "@/lib/design-tokens/colors";

interface AtmosphereProps {
  mode?: "xr" | "games" | "neutral";
}

export function Atmosphere({ mode = "neutral" }: AtmosphereProps) {
  const glowColor = mode === "xr"
    ? colors.neon.base
    : mode === "games"
    ? colors.violet.base
    : colors.background.overlay;

  return (
    <>
      {/* Base gradient */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor}08 0%, transparent 50%)`,
        }}
      />

      {/* Noise texture */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Accent glows */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: glowColor }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ backgroundColor: glowColor }}
        />
      </div>
    </>
  );
}
