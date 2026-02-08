/**
 * Component: ParticleField
 * Floating particle animation background
 * Extracted from Expertise section for reusability
 */

"use client";

import React from "react";

interface Particle {
  top: string;
  left: string;
  delay: string;
  duration: string;
  size: string;
  background: string;
}

interface ParticleFieldProps {
  count?: number;
}

/**
 * Animated floating particles background
 *
 * @example
 * <ParticleField count={6} />
 */
export function ParticleField({ count = 4 }: ParticleFieldProps) {
  // Predefined particle configurations
  const defaultParticles: Particle[] = [
    {
      top: "20%",
      left: "15%",
      delay: "0s",
      duration: "14s",
      size: "6px",
      background: "rgba(158, 243, 21, 0.8)",
    },
    {
      top: "70%",
      left: "60%",
      delay: "2s",
      duration: "18s",
      size: "6px",
      background: "rgba(91, 45, 220, 0.9)",
    },
    {
      top: "35%",
      left: "80%",
      delay: "4s",
      duration: "20s",
      size: "6px",
      background: "rgba(185, 168, 255, 0.9)",
    },
    {
      top: "55%",
      left: "30%",
      delay: "0s",
      duration: "16s",
      size: "4px",
      background: "rgba(158, 243, 21, 0.6)",
    },
    {
      top: "10%",
      left: "45%",
      delay: "1s",
      duration: "15s",
      size: "5px",
      background: "rgba(91, 45, 220, 0.7)",
    },
    {
      top: "85%",
      left: "75%",
      delay: "3s",
      duration: "17s",
      size: "4px",
      background: "rgba(158, 243, 21, 0.5)",
    },
  ];

  const particles = defaultParticles.slice(0, count);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="particle-animated"
            style={{
              position: "absolute",
              width: particle.size,
              height: particle.size,
              borderRadius: "9999px",
              background: particle.background,
              top: particle.top,
              left: particle.left,
              opacity: 0.4,
              animation: `floatParticle ${particle.duration} linear infinite`,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Particle animation keyframes */}
      <style jsx>{`
        @keyframes floatParticle {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0.15;
          }
          25% {
            opacity: 0.5;
          }
          50% {
            transform: translate3d(12px, -18px, 0);
            opacity: 0.35;
          }
          75% {
            opacity: 0.6;
          }
          100% {
            transform: translate3d(-10px, -32px, 0);
            opacity: 0.1;
          }
        }
      `}</style>
    </>
  );
}
