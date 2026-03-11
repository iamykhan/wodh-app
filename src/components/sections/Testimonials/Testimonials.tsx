/**
 * Component: Testimonials
 * Client testimonials carousel with hero quotes
 * Refactored to use clean architecture with content separation
 */

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "@/lib/design-tokens";
import { testimonialsContent, testimonials, clientLogos } from "@/content/home/testimonials";

/**
 * Testimonials section with auto-rotating carousel and client logos
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});
  const autoTimerRef = useRef<number | null>(null);

  const active = testimonials[index];
  const total = testimonials.length;

  const goTo = (nextIndex: number) => {
    const normalized = (nextIndex + total) % total;
    setIndex(normalized);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const onManualNav = (fn: () => void) => {
    setIsManual(true);
    fn();
  };

  // Auto rotate
  useEffect(() => {
    if (isManual || isHovered) return;

    autoTimerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, testimonialsContent.autoRotateMs);

    return () => {
      if (autoTimerRef.current) window.clearInterval(autoTimerRef.current);
    };
  }, [isManual, isHovered, total]);

  const toggleExpanded = (id: number) => {
    setExpandedMap((m) => ({ ...m, [id]: !m[id] }));
  };

  const marqueeLogos = useMemo(() => [...clientLogos, ...clientLogos], []);

  return (
    <section
      className="relative w-full overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-10 xl:px-16 lg:py-24"
      style={{ background: colors.background.primary }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-40 -left-32 h-72 w-72 rounded-full blur-3xl"
          style={{ background: `${colors.neon.base}33` }}
          animate={{ x: [0, 16, 0], y: [0, 10, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full blur-3xl"
          style={{ background: `${colors.violet.base}66` }}
          animate={{ x: [0, -20, 0], y: [0, -12, 0] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Top split hero */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          {/* LEFT: Loud hero text */}
          <div className="flex-1">
            <p
              className="text-xs font-medium uppercase tracking-[0.25em]"
              style={{ color: colors.violet.light }}
            >
              {testimonialsContent.eyebrow}
            </p>
            <AnimatePresence mode="wait">
              <motion.h2
                key={active.id}
                className="mt-4 text-3xl font-semibold leading-[1.12] text-white sm:text-4xl lg:text-6xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <span className="block" style={{ color: colors.neon.base }}>
                  "{active.heroQuote}
                </span>
                <span className="block">"</span>
              </motion.h2>
            </AnimatePresence>

            <div className="mt-5 text-sm" style={{ color: colors.text.pale }}>
              <span className="font-semibold text-white">{active.name}</span> · {active.role} at{" "}
              <span style={{ color: colors.neon.base }}>{active.company}</span>
            </div>

            {/* Navigation buttons */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onManualNav(prev)}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: colors.border.primary,
                  background: `${colors.background.panel}CC`,
                  color: colors.violet.pale,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.neon.base;
                  e.currentTarget.style.color = colors.text.primary;
                  e.currentTarget.style.boxShadow = `0 0 18px ${colors.neon.base}59`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border.primary;
                  e.currentTarget.style.color = colors.violet.pale;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => onManualNav(next)}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition-all hover:-translate-y-0.5"
                style={{
                  borderColor: colors.border.primary,
                  background: `${colors.background.panel}CC`,
                  color: colors.violet.pale,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.neon.base;
                  e.currentTarget.style.color = colors.text.primary;
                  e.currentTarget.style.boxShadow = `0 0 18px ${colors.neon.base}59`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border.primary;
                  e.currentTarget.style.color = colors.violet.pale;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Next →
              </button>
              <div className="ml-2 text-xs" style={{ color: colors.text.pale }}>
                {index + 1} / {total}
              </div>
            </div>
          </div>

          {/* RIGHT: Review card */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="rounded-3xl border p-7 sm:p-8"
                style={{
                  background: colors.background.panel,
                  borderColor: colors.border.primary,
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45 }}
              >
                <p className="text-sm leading-relaxed sm:text-base" style={{ color: colors.violet.pale }}>
                  {expandedMap[active.id]
                    ? active.reviewText
                    : active.reviewText.slice(0, 180) + (active.reviewText.length > 180 ? "..." : "")}
                </p>
                {active.reviewText.length > 180 && (
                  <button
                    onClick={() => toggleExpanded(active.id)}
                    className="mt-3 text-xs font-semibold underline"
                    style={{ color: colors.neon.base }}
                  >
                    {expandedMap[active.id] ? "Show less" : "Read more"}
                  </button>
                )}
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold"
                    style={{
                      borderColor: colors.border.primary,
                      background: colors.background.overlay,
                      color: colors.neon.base,
                    }}
                  >
                    {active.initials}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-white">{active.name}</div>
                    <div style={{ color: colors.text.pale }}>
                      {active.role}, {active.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Client logos marquee */}
        <div className="mt-16 overflow-hidden">
          <p
            className="mb-4 text-center text-xs uppercase tracking-[0.25em]"
            style={{ color: colors.violet.light }}
          >
            Trusted by teams worldwide
          </p>
          <div className="relative flex">
            <motion.div
              className="flex gap-8"
              animate={{ x: [0, -50 + "%"] }}
              transition={{
                duration: testimonialsContent.logoMarqueeDuration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {marqueeLogos.map((logo, i) => (
                <div
                  key={`${logo.id}-${i}`}
                  className="flex shrink-0 flex-col items-center gap-1 rounded-2xl border px-8 py-4"
                  style={{
                    borderColor: colors.border.primary,
                    background: colors.background.panel,
                  }}
                >
                  <span className="text-sm font-semibold text-white">{logo.name}</span>
                  {logo.label && (
                    <span className="text-[11px]" style={{ color: colors.text.pale }}>
                      {logo.label}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
