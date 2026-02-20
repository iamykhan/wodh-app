/**
 * ProcessStageCard Component
 * Individual stage card in the production pipeline
 */

"use client";

import { motion } from "framer-motion";
import { colors } from "@/lib/design-tokens";
import { ProcessStage } from "@/content/home/process";

interface ProcessStageCardProps {
  stage: ProcessStage;
  index: number;
}

export function ProcessStageCard({ stage, index }: ProcessStageCardProps) {
  const Icon = stage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group relative rounded-2xl border p-5 md:p-6"
      style={{
        background: colors.background.panel,
        borderColor: colors.border.primary,
      }}
    >
      {/* Step index */}
      <div
        className="absolute -top-3 left-5 rounded-full px-2 py-[2px] text-xs font-semibold border"
        style={{
          background: colors.background.primary,
          borderColor: `${colors.neon.base}70`,
          color: colors.neon.base,
          boxShadow: `0 0 10px ${colors.neon.glow}`,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Icon + Title */}
      <div className="mb-3 flex items-center gap-2">
        <div
          className="rounded-xl border p-2"
          style={{
            borderColor: colors.border.primary,
            background: `linear-gradient(180deg, ${colors.neon.base}19, ${colors.violet.base}14)`,
          }}
        >
          <Icon size={18} style={{ color: colors.neon.base }} />
        </div>
        <h3 className="text-lg font-semibold tracking-wide">{stage.title}</h3>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: colors.text.pale }}>
        {stage.description}
      </p>

      {/* Micro tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {stage.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border px-2.5 py-1 text-[11px] font-medium"
            style={{
              borderColor: colors.border.primary,
              color: colors.violet.pale,
              background: `linear-gradient(90deg, ${colors.neon.base}14, ${colors.violet.base}19)`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 0 1px ${colors.neon.base}30, 0 0 36px ${colors.neon.base}12`,
        }}
      />
    </motion.div>
  );
}
