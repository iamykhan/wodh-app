/**
 * EngineName Component
 * Large hero text for engine name with gradient and glow effects
 */

"use client";

import { colors } from "@/lib/design-tokens";
import { EngineKey } from "@/content/home/technologies";

interface EngineNameProps {
  name: string;
  engineKey: EngineKey;
}

function getWordGradient(key: EngineKey): string {
  switch (key) {
    case "unity":
      return `linear-gradient(120deg, ${colors.neon.base}, #d7ffa0)`;
    case "unreal":
      return `linear-gradient(120deg, ${colors.violet.base}, #9b5aff)`;
    case "blender":
      return `linear-gradient(120deg, ${colors.violet.light}, ${colors.neon.base}E6)`;
  }
}

function getGlowBackground(key: EngineKey): string {
  switch (key) {
    case "unity":
      return `radial-gradient(circle, ${colors.neon.base}66, transparent 70%)`;
    case "unreal":
      return `radial-gradient(circle, ${colors.violet.base}80, transparent 70%)`;
    case "blender":
      return `radial-gradient(circle, ${colors.violet.light}73, transparent 70%)`;
  }
}

function getUnderlineGradient(key: EngineKey): string {
  switch (key) {
    case "unity":
      return `linear-gradient(90deg, ${colors.neon.base}, #e5ff9c)`;
    case "unreal":
      return `linear-gradient(90deg, ${colors.violet.base}, #9b5aff)`;
    case "blender":
      return `linear-gradient(90deg, ${colors.violet.light}, ${colors.neon.base})`;
  }
}

export function EngineName({ name, engineKey }: EngineNameProps) {
  return (
    <div className="flex items-stretch">
      <div className="relative flex h-full items-center">
        <div className="relative group">
          {/* Radial neon glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
            style={{
              width: "140%",
              height: "80%",
              borderRadius: "999px",
              background: getGlowBackground(engineKey),
            }}
          />

          {/* Word + underline wrapper */}
          <div className="transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
            <span
              className="uppercase font-semibold leading-none tracking-[-0.06em] text-[56px] md:text-[80px] lg:text-[104px] block"
              style={{
                background: getWordGradient(engineKey),
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {name.toUpperCase()}
            </span>

            {/* Underline glow – expands on hover */}
            <div className="mt-3 h-[3px] w-0 rounded-full bg-transparent overflow-hidden transition-all duration-300 group-hover:w-full">
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: getUnderlineGradient(engineKey),
                  boxShadow: `0 0 25px ${colors.neon.base}99`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
