/**
 * EngineCard Component
 * Individual engine/technology card with features and usage
 */

"use client";

import { colors } from "@/lib/design-tokens";
import { Engine, EngineKey } from "@/content/home/technologies";

interface EngineCardProps {
  engine: Engine;
}

function getStripColor(key: EngineKey): string {
  switch (key) {
    case "unity":
      return `linear-gradient(180deg, ${colors.neon.base}, transparent)`;
    case "unreal":
      return `linear-gradient(180deg, ${colors.violet.base}, transparent)`;
    case "blender":
      return `linear-gradient(180deg, ${colors.neon.base}B3, ${colors.violet.base}CC)`;
  }
}

export function EngineCard({ engine }: EngineCardProps) {
  return (
    <div
      className="relative rounded-2xl border overflow-hidden h-full transition-transform duration-300 hover:-translate-y-1"
      style={{
        borderColor: colors.border.primary,
        background: colors.background.panel,
        boxShadow: "0 0 0 transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 35px ${colors.neon.base}73`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 transparent";
      }}
    >
      <div className="flex h-full">
        {/* Vertical accent strip */}
        <div className="w-1 md:w-[6px]" style={{ background: getStripColor(engine.key) }} />

        <div className="flex-1 p-5 md:p-6 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.23em]"
                style={{ color: colors.violet.light }}
              >
                {engine.eyebrow}
              </p>
              <h3 className="mt-1 text-lg md:text-xl font-semibold text-white">
                {engine.name}
              </h3>
              <p
                className="text-[11px] uppercase tracking-[0.16em] mt-1"
                style={{ color: colors.text.pale }}
              >
                {engine.role}
              </p>
            </div>
            <span
              className="rounded-full px-3 py-1 text-[11px]"
              style={{
                background: `${colors.border.muted}CC`,
                color: colors.violet.pale,
              }}
            >
              Engine
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: colors.violet.pale }}>
            {engine.description}
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-2 text-[11px]" style={{ color: colors.text.pale }}>
            {engine.features.map((feature) => (
              <span
                key={feature}
                className="rounded-full px-2.5 py-1"
                style={{ background: `${colors.border.muted}CC` }}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Usage chips */}
          <div className="flex flex-wrap gap-2 text-[11px]" style={{ color: colors.text.secondary }}>
            {engine.usage.map((use) => (
              <span
                key={use}
                className="rounded-full px-2.5 py-1"
                style={{ background: `${colors.border.muted}B3` }}
              >
                {use}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
