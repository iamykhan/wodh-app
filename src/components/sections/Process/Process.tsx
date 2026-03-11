/**
 * Component: Process
 * 5-step production pipeline section
 * Refactored to use clean architecture with content separation
 */

"use client";

import { motion } from "framer-motion";
import { ProcessStageCard } from "./ProcessStageCard";
import { colors } from "@/lib/design-tokens";
import { processContent, processStages } from "@/content/home/process";

/**
 * Process section with animated pipeline and stage cards
 */
export function Process() {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-10 xl:px-16 lg:py-24"
      style={{ background: colors.background.primary }}
    >
      {/* Background wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(1100px circle at 8% -10%, ${colors.neon.base}26, transparent 60%), radial-gradient(1000px circle at 92% 120%, ${colors.violet.base}8C, transparent 55%)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-10 text-center lg:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.35em] uppercase"
            style={{ color: colors.violet.light }}
          >
            {processContent.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold"
          >
            {processContent.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mx-auto mt-4 max-w-2xl text-sm sm:text-base"
            style={{ color: colors.text.pale }}
          >
            {processContent.description}
          </motion.p>
        </div>

        {/* Pipeline wrapper */}
        <div className="relative">
          {/* Animated neon line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden md:block">
            <motion.div
              className="h-[2px] w-full"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              style={{
                background: `linear-gradient(90deg, ${colors.neon.base}, ${colors.violet.base}, ${colors.neon.base})`,
                boxShadow: `0 0 20px ${colors.neon.glow}`,
                transformOrigin: "left",
              }}
            />
            {/* Drifting glow overlay */}
            <motion.div
              className="absolute inset-0 h-[2px] w-1/3"
              initial={{ x: "-40%", opacity: 0.25 }}
              animate={{ x: "140%" }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: `linear-gradient(90deg, transparent, ${colors.neon.base}, ${colors.violet.base}, transparent)`,
                filter: "blur(2px)",
              }}
            />
          </div>

          {/* Mobile vertical neon spine */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-2 top-0 bottom-0 w-[2px] md:hidden"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{
              background: `linear-gradient(180deg, ${colors.neon.base}, ${colors.violet.base})`,
              boxShadow: `0 0 14px ${colors.neon.glow}`,
              transformOrigin: "top",
            }}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-5">
            {processStages.map((stage, i) => (
              <ProcessStageCard key={stage.title} stage={stage} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
