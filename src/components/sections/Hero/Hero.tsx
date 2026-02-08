/**
 * Component: Hero
 * Main hero section for landing page
 * Refactored from 740-line monolithic component to ~120 lines
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { HeroCard } from "./HeroCard";
import { TrustStrip } from "./TrustStrip";
import { HyperspeedBackground } from "@/components/backgrounds";
import { colors } from "@/lib/design-tokens";
import { heroCards, heroContent } from "@/content/home/hero";

/**
 * Hero section with dual XR/Games cards and trust strip
 * Clean, composable architecture using UI primitives
 */
export function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden text-white"
      style={{
        background: colors.background.primary,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,"Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      }}
    >
      {/* Animated background */}
      <HyperspeedBackground videoUrl={heroContent.videoUrl} />

      {/* Content container */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-14 sm:py-18 lg:py-22">
        {/* Top eyebrow + micro trust */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-wrap items-center justify-between gap-3"
        >
          <p className="text-xs sm:text-sm tracking-[0.35em] text-white/70">
            {heroContent.eyebrow.studio}
          </p>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/60">
            <Sparkles size={14} style={{ color: colors.neon.base }} />
            {heroContent.eyebrow.tagline}
          </div>
        </motion.div>

        {/* Split hero cards */}
        <div className="relative grid gap-4 lg:grid-cols-2">
          {/* XR Card */}
          <HeroCard data={heroCards.xr} delay={0} />

          {/* Games Card */}
          <HeroCard data={heroCards.games} delay={0.08} />

          {/* Diagonal energy divider */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <div
              className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 opacity-60"
              style={{
                background: `linear-gradient(180deg, transparent, ${colors.border.primary}, transparent)`,
                transform: "skewX(-8deg)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-55"
              style={{
                background: `radial-gradient(circle, ${colors.neon.base}44, ${colors.violet.base}33, transparent 65%)`,
              }}
            />
          </div>
        </div>

        {/* Trust strip */}
        <TrustStrip
          title={heroContent.trustStrip.title}
          logos={heroContent.trustStrip.logos}
        />
      </div>
    </section>
  );
}
