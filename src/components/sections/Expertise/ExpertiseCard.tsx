/**
 * Component: ExpertiseCard
 * Individual expertise/service card with hover reveal
 * Refactored to use hooks instead of DOM manipulation
 */

"use client";

import React from "react";
import { GradientText } from "@/components/ui/GradientText";
import { colors } from "@/lib/design-tokens";
import { useIsInViewport } from "@/hooks";
import type { ExpertiseItem } from "@/content/home/expertise";

interface ExpertiseCardProps {
  item: ExpertiseItem;
  index: number;
  onVisible: (index: number) => void;
}

/**
 * Expertise card with gradient text reveal on hover
 */
export function ExpertiseCard({ item, index, onVisible }: ExpertiseCardProps) {
  const [ref, isVisible] = useIsInViewport<HTMLDivElement>({
    threshold: 0.4,
    freezeOnceVisible: true,
  });

  // Notify parent when card becomes visible
  React.useEffect(() => {
    if (isVisible) {
      onVisible(index);
    }
  }, [isVisible, index, onVisible]);

  return (
    <div
      ref={ref}
      className="relative group w-full text-center cursor-pointer transition-all duration-500"
    >
      {/* Base visible title */}
      <h3
        className="text-5xl md:text-7xl lg:text-[7.5rem] font-extrabold uppercase tracking-tight
        select-none transition-all duration-700 ease-out
        group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.4)]"
        style={{
          color: colors.border.muted,
          WebkitTextStroke: `1px ${colors.border.muted}`,
        }}
      >
        {item.title}
      </h3>

      {/* Hover enhancement */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center
        opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out"
      >
        <GradientText
          mode={item.gradient}
          as="h3"
          className="text-5xl md:text-7xl lg:text-[7.5rem] font-extrabold uppercase tracking-tight drop-shadow-[0_0_16px_rgba(158,243,21,0.45)]"
        >
          {item.title}
        </GradientText>
        <p className="mt-3 text-white text-xs md:text-sm max-w-xl mx-auto px-4">
          {item.description}
        </p>
        <a
          href="#case-studies"
          className="mt-2 text-xs border-b transition-colors"
          style={{
            color: colors.neon.base,
            borderColor: colors.neon.base,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.text.primary;
            e.currentTarget.style.borderColor = colors.text.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.neon.base;
            e.currentTarget.style.borderColor = colors.neon.base;
          }}
        >
          {item.link}
        </a>
      </div>
    </div>
  );
}
