/**
 * Component: HyperspeedBackground
 * Animated hyperspeed/galaxy background with optional video
 * Extracted from Hero section for reusability
 */

"use client";

import React from "react";
import { colors } from "@/lib/design-tokens";

interface HyperspeedBackgroundProps {
  videoUrl?: string;
  opacity?: number;
}

/**
 * Hyperspeed animated background with streaks
 *
 * @example
 * <HyperspeedBackground videoUrl="/videos/galaxy.mp4" opacity={0.28} />
 */
export function HyperspeedBackground({
  videoUrl,
  opacity = 0.28,
}: HyperspeedBackgroundProps) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        {/* Optional video layer */}
        {videoUrl && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={videoUrl} />
          </video>
        )}

        {/* Hyperspeed streaks (works even without video) */}
        <div className="absolute inset-0 hyperspeed-layer" />

        {/* Ambient glows on top of streaks */}
        <div
          className="absolute -top-56 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full blur-3xl opacity-35"
          style={{
            background: `radial-gradient(circle, ${colors.violet.base}66 0%, transparent 60%)`,
          }}
        />
        <div
          className="absolute -bottom-64 right-[-10%] h-[820px] w-[820px] rounded-full blur-3xl opacity-30"
          style={{
            background: `radial-gradient(circle, ${colors.neon.base}55 0%, transparent 65%)`,
          }}
        />
      </div>

      {/* Inline styles for hyperspeed animation */}
      <style jsx>{`
        .hyperspeed-layer {
          background: radial-gradient(
              1200px 700px at 50% -10%,
              rgba(91, 45, 220, 0.2),
              transparent 60%
            ),
            radial-gradient(
              1000px 600px at 80% 110%,
              rgba(158, 243, 21, 0.18),
              transparent 60%
            );
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .hyperspeed-layer::before,
        .hyperspeed-layer::after {
          content: "";
          position: absolute;
          inset: -40% -40%;
          background-image: repeating-linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.06) 0px,
            rgba(255, 255, 255, 0.06) 1px,
            transparent 1px,
            transparent 22px
          );
          transform: rotate(12deg);
          animation: hyperspeed-move 7s linear infinite;
          opacity: 0.55;
          filter: blur(1px);
        }

        .hyperspeed-layer::after {
          animation-duration: 11s;
          opacity: 0.35;
          transform: rotate(-9deg) scale(1.1);
        }

        @keyframes hyperspeed-move {
          0% {
            transform: translateY(0) translateX(0) rotate(12deg);
          }
          100% {
            transform: translateY(35%) translateX(-15%) rotate(12deg);
          }
        }
      `}</style>
    </>
  );
}
