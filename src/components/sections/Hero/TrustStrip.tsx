/**
 * Component: TrustStrip
 * Logo carousel for trusted partners
 * Refactored from Hero section
 */

"use client";

import { motion } from "framer-motion";
import { colors } from "@/lib/design-tokens";
import type { TrustLogo } from "@/content/home/hero";

interface TrustStripProps {
  title: string;
  logos: TrustLogo[];
}

/**
 * Animated logo strip with infinite scroll
 */
export function TrustStrip({ title, logos }: TrustStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-10 rounded-2xl border px-4 py-4 sm:px-6 sm:py-5"
      style={{
        borderColor: colors.border.primary,
        background: `${colors.background.overlay}88`,
      }}
    >
      {/* Title */}
      <p className="mb-3 text-xs tracking-[0.25em] text-white/55">{title}</p>

      {/* Logo carousel */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex items-center gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="shrink-0 opacity-80 hover:opacity-100 transition"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-7 sm:h-8 md:h-9 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
