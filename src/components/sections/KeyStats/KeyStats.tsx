/**
 * Component: KeyStats
 * Key statistics section with animated numbers
 * Refactored from 260-line monolithic component to clean composable structure
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { StatCard } from "./StatCard";
import { AmbientGlow } from "@/components/backgrounds";
import { colors } from "@/lib/design-tokens";
import { useCountUp } from "@/hooks";
import { keyStatsContent } from "@/content/home/keystats";

/**
 * Key stats section with hero stat and grid of smaller stats
 */
export function KeyStats() {
  const [animateNumbers, setAnimateNumbers] = useState(false);
  const heroValue = useCountUp(
    keyStatsContent.mainStat.value,
    1300,
    animateNumbers
  );

  return (
    <section
      className="w-full py-28 px-6 md:px-12 lg:px-20 relative"
      style={{ background: colors.background.primary }}
    >
      {/* Ambient background glow */}
      <AmbientGlow
        glows={[
          {
            color: `radial-gradient(circle, ${colors.neon.glow}, transparent)`,
            size: "320px",
            position: { top: "-96px", left: "33%" },
            opacity: 1,
            blur: "blur-3xl",
          },
          {
            color: `radial-gradient(circle, ${colors.violet.glow}, transparent)`,
            size: "384px",
            position: { bottom: "-80px", right: "20%" },
            opacity: 1,
            blur: "blur-3xl",
          },
        ]}
      />

      <motion.div
        className="relative max-w-7xl mx-auto space-y-10"
        onViewportEnter={() => setAnimateNumbers(true)}
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Header */}
        <header className="space-y-3 max-w-3xl">
          <p
            className="text-xs md:text-sm uppercase tracking-[0.3em]"
            style={{ color: colors.white[60] }}
          >
            {keyStatsContent.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white">
            {keyStatsContent.title}{" "}
            <span
              style={{
                color: colors.neon.base,
                textShadow: `0 0 24px ${colors.neon.glow}`,
              }}
            >
              {keyStatsContent.titleAccent}
            </span>
          </h2>
          <p
            className="text-sm md:text-base"
            style={{ color: colors.violet.pale }}
          >
            {keyStatsContent.description}
          </p>
        </header>

        {/* Main hero stat (Neon highlight) */}
        <motion.section
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl cursor-default"
          style={{
            background: colors.neon.base,
            color: "#02010A",
            boxShadow: `0 26px 60px ${colors.neon.glow}`,
          }}
        >
          {/* Decorative glow */}
          <div
            className="pointer-events-none absolute -right-24 -top-32 w-96 h-96 rounded-full blur-3xl opacity-70"
            style={{ background: "#FFFFFF66" }}
          />
          <div
            className="pointer-events-none absolute -left-20 bottom-[-60px] w-72 h-72 rounded-full blur-3xl opacity-60"
            style={{ background: "#7FD01566" }}
          />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 px-6 md:px-10 lg:px-12 py-10 md:py-12">
            <div className="space-y-3 max-w-xl">
              <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] font-semibold">
                Core Experience
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                {keyStatsContent.mainStat.label}
              </h3>
              <p className="text-sm md:text-base" style={{ color: "#15210A" }}>
                {keyStatsContent.mainStat.note}
              </p>
            </div>

            <div className="md:text-right flex md:block items-end justify-between w-full md:w-auto">
              <p className="text-[11px] md:text-xs mb-1 md:mb-2 uppercase tracking-[0.2em]">
                Total Years
              </p>
              <div className="flex items-baseline md:justify-end gap-2">
                <span className="text-5xl md:text-6xl lg:text-7xl font-black leading-none">
                  {heroValue}
                  {keyStatsContent.mainStat.suffix && (
                    <span className="text-3xl align-super">
                      {keyStatsContent.mainStat.suffix}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Grid of other stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {keyStatsContent.stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              animate={animateNumbers}
            />
          ))}
        </section>
      </motion.div>
    </section>
  );
}
