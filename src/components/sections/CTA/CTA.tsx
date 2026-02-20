/**
 * Component: CTA
 * Call-to-action section
 * Refactored to use clean architecture with content separation
 */

"use client";

import { motion } from "framer-motion";
import { colors } from "@/lib/design-tokens";
import { ctaContent } from "@/content/home/cta";

/**
 * CTA section with gradient background and dual action buttons
 */
export function CTA() {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-10 xl:px-16 lg:py-24"
      style={{ background: colors.background.primary }}
    >
      {/* Gradient wave backdrop */}
      <motion.div
        className="absolute inset-0 opacity-70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: `radial-gradient(1200px circle at 10% -10%, ${colors.neon.base}40, transparent 60%), radial-gradient(1000px circle at 90% 120%, ${colors.violet.base}A6, transparent 55%)`,
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.h2
          className="text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {ctaContent.heading.main}
          <span style={{ color: colors.neon.base }}>
            {ctaContent.heading.highlight}
          </span>
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-2xl text-sm sm:text-base"
          style={{ color: colors.violet.pale }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          {ctaContent.description}
        </motion.p>

        <motion.div
          className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <a
            href={ctaContent.primaryButton.href}
            className="inline-flex items-center justify-center rounded-full border px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition-all hover:-translate-y-0.5"
            style={{
              borderColor: colors.neon.base,
              background: colors.neon.base,
              color: colors.background.primary,
              boxShadow: `0 0 0 ${colors.neon.base}00`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 30px ${colors.neon.base}F2`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 ${colors.neon.base}00`;
            }}
          >
            {ctaContent.primaryButton.text}
          </a>
          <a
            href={ctaContent.secondaryButton.href}
            className="text-xs font-medium uppercase tracking-[0.22em] transition-colors hover:text-white"
            style={{ color: colors.neon.soft }}
          >
            {ctaContent.secondaryButton.text}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
