/**
 * Component: Technologies
 * Core engine/technology showcase section
 * Refactored to use clean architecture with content separation
 */

"use client";

import { EngineCard } from "./EngineCard";
import { EngineName } from "./EngineName";
import { colors } from "@/lib/design-tokens";
import { technologiesContent, engines } from "@/content/home/technologies";

/**
 * Technologies section with engine showcase cards
 */
export function Technologies() {
  return (
    <section className="w-full py-20 px-4" style={{ backgroundColor: colors.background.primary }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div
            className="mb-2 flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.25em]"
            style={{ color: colors.violet.light }}
          >
            <span
              className="h-[1px] w-6"
              style={{
                background: `linear-gradient(90deg, ${colors.neon.base}, ${colors.violet.base})`,
              }}
            />
            {technologiesContent.eyebrow}
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-semibold text-white">
            {technologiesContent.heading}
          </h2>
          <p
            className="mt-2 text-sm md:text-[15px] leading-relaxed max-w-2xl"
            style={{ color: colors.text.pale }}
          >
            {technologiesContent.description}
          </p>
        </div>

        {/* 3 aligned rows: LEFT big word + RIGHT card */}
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[0.9fr_1.1fr]">
          {engines.map((engine) => (
            <div key={engine.key} className="contents">
              {/* LEFT – big hero word with neon glow */}
              <EngineName name={engine.name} engineKey={engine.key} />

              {/* RIGHT – engine card */}
              <EngineCard engine={engine} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
