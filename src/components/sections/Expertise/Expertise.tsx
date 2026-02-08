/**
 * Component: Expertise
 * Main expertise section with scroll-based progress
 * Refactored from 190-line component with DOM manipulation to clean hook-based approach
 */

"use client";

import React, { useState, useCallback } from "react";
import { ExpertiseCard } from "./ExpertiseCard";
import { ParticleField, AmbientGlow } from "@/components/backgrounds";
import { colors } from "@/lib/design-tokens";
import { expertiseItems, expertiseContent } from "@/content/home/expertise";

/**
 * Expertise section with typography stack and scroll progress
 */
export function Expertise() {
  const [maxVisibleIndex, setMaxVisibleIndex] = useState(-1);

  // Calculate progress bar height based on visible cards
  const progressHeight = maxVisibleIndex >= 0
    ? 20 + (maxVisibleIndex / (expertiseItems.length - 1 || 1)) * 80
    : 20;

  const handleCardVisible = useCallback((index: number) => {
    setMaxVisibleIndex((prev) => Math.max(prev, index));
  }, []);

  return (
    <section
      id="expertise"
      aria-label="Wodh Expertise Typography Stack"
      className="relative text-white py-28 overflow-hidden"
      style={{ background: colors.background.primary }}
    >
      {/* Ambient background glow */}
      <AmbientGlow mode="dual" />

      {/* Floating particles */}
      <ParticleField count={4} />

      {/* Left progress bar (desktop only) */}
      <div className="hidden md:flex flex-col items-center gap-2 absolute left-8 top-40 bottom-24 z-20">
        <div className="w-px h-full rounded-full relative overflow-hidden" style={{ background: colors.border.muted }}>
          <div
            className="absolute bottom-0 w-full rounded-full transition-all duration-500"
            style={{
              height: `${progressHeight}%`,
              background: `linear-gradient(to top, ${colors.neon.base}, ${colors.violet.base}, transparent)`,
            }}
          />
        </div>
        <span className="text-[8px] tracking-[0.16em] uppercase" style={{ color: colors.violet.light }}>
          Services
        </span>
      </div>

      {/* Section heading */}
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 text-center space-y-4 mb-24">
        <p
          className="uppercase tracking-[0.25em] text-xs md:text-sm"
          style={{ color: colors.violet.light }}
        >
          {expertiseContent.eyebrow}
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: colors.text.secondary }}>
          {expertiseContent.title}
        </h2>
        <p
          className="text-sm md:text-base max-w-2xl mx-auto"
          style={{ color: colors.violet.pale }}
        >
          {expertiseContent.description}
        </p>
      </div>

      {/* Typography hero stack */}
      <div className="relative max-w-7xl mx-auto flex flex-col items-center gap-24 px-6 lg:px-10">
        {expertiseItems.map((item, index) => (
          <ExpertiseCard
            key={item.title}
            item={item}
            index={index}
            onVisible={handleCardVisible}
          />
        ))}
      </div>
    </section>
  );
}
