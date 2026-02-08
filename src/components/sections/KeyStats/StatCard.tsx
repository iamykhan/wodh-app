/**
 * Component: StatCard
 * Individual stat card with animated counter
 * Refactored from KeyStats monolithic component
 */

"use client";

import { motion } from "framer-motion";
import { colors } from "@/lib/design-tokens";
import { useCountUp } from "@/hooks";
import type { Stat } from "@/content/home/keystats";

interface StatCardProps {
  stat: Stat;
  index: number;
  animate: boolean;
}

/**
 * Stat card with count-up animation
 */
export function StatCard({ stat, index, animate }: StatCardProps) {
  const value = useCountUp(stat.value, 1100 + index * 150, animate);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="relative overflow-hidden rounded-3xl border cursor-default"
      style={{
        background:
          index === 1
            ? `linear-gradient(135deg, ${colors.background.panel} 0%, ${colors.border.muted} 100%)`
            : colors.background.panel,
        borderColor: colors.border.primary,
        boxShadow: `0 18px 40px ${colors.violet.base}60`,
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{
          background: index === 0 ? colors.violet.base : colors.neon.base,
        }}
      />

      <div className="relative px-6 md:px-7 py-7 md:py-8 flex flex-col gap-3">
        <p
          className="text-[11px] md:text-xs uppercase tracking-[0.2em]"
          style={{ color: colors.white[60] }}
        >
          {stat.label}
        </p>

        <div className="flex items-baseline gap-2">
          <span
            className="text-3xl md:text-4xl font-extrabold leading-none"
            style={{
              color: colors.neon.base,
              textShadow: `0 0 18px ${colors.neon.glow}`,
            }}
          >
            {value}
            {stat.suffix && (
              <span className="text-2xl align-super">{stat.suffix}</span>
            )}
          </span>
        </div>

        <p className="text-xs md:text-sm" style={{ color: colors.violet.pale }}>
          {stat.note}
        </p>
      </div>
    </motion.article>
  );
}
