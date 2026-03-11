/**
 * Component: HeroCard
 * Reusable hero card for XR/Games sections
 * Refactored from monolithic Hero component
 */

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { GradientText } from "@/components/ui/GradientText";
import { cn } from "@/lib/utils";
import { colors } from "@/lib/design-tokens";
import type { HeroCardData } from "@/content/home/hero";

interface HeroCardProps {
  data: HeroCardData;
  delay?: number;
}

/**
 * Hero card with glassmorphism effect and hover animations
 */
export function HeroCard({ data, delay = 0 }: HeroCardProps) {
  const { mode, eyebrow, title, titleAccent, description, chips, buttons } =
    data;

  const isXR = mode === "xr";
  const accentColor = isXR ? colors.neon.base : colors.violet.base;
  const textColor = isXR ? colors.violet.light : colors.violet.light;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay }}
      whileHover={{ y: -6, scale: 1.015 }}
      className={cn(
        "group relative rounded-3xl border p-7 sm:p-9 min-h-[420px] overflow-hidden"
      )}
      style={{
        background: isXR
          ? `radial-gradient(1000px 650px at 15% 10%, ${colors.neon.base}22, transparent 60%), linear-gradient(180deg, ${colors.background.panel}ee, ${colors.background.primary}ee)`
          : `radial-gradient(1000px 650px at 85% 10%, ${colors.violet.base}33, transparent 60%), linear-gradient(180deg, ${colors.background.panel}ee, ${colors.background.primary}ee)`,
        borderColor: colors.border.primary,
        boxShadow: isXR
          ? `inset 0 0 70px ${colors.neon.base}0F`
          : `inset 0 0 70px ${colors.violet.base}1A`,
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Hover glow effect */}
      <div
        className={cn(
          "pointer-events-none absolute h-80 w-80 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          isXR ? "-right-28 -top-28" : "-left-28 -top-28"
        )}
        style={{
          background: isXR
            ? `${colors.neon.base}55`
            : `${colors.violet.base}66`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          {/* Eyebrow */}
          <p className="text-sm tracking-[0.25em] text-white/65">{eyebrow}</p>

          {/* Title */}
          <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.02]">
            {title}
            <br />
            <GradientText mode={mode} as="span">
              {titleAccent}
            </GradientText>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-md text-base sm:text-lg text-white/80">
            {description}
          </p>

          {/* Chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button variant="primary" mode={mode}>
            {buttons.primary.text} <ArrowRight size={16} />
          </Button>
          <Button variant="secondary">{buttons.secondary.text}</Button>
        </div>
      </div>
    </motion.div>
  );
}
