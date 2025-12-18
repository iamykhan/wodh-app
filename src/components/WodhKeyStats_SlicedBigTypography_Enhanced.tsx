"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const COLORS = {
  bg: "#0C0722",
  panel: "#0F0A26",
  neon: "#9EF315",
  neonSoft: "#9EF31533",
  violet: "#5B2DDC",
  violetSoft: "#5B2DDC60",
  border: "#2A1E55",
  tint: "#D1C6FF",
  tintSoft: "#A8A8C3",
};

const FONT_STACK =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

type StatBase = {
  label: string;
  note: string;
  value: number;
  suffix?: string;
};

const MAIN_STAT: StatBase = {
  label: "Years in XR & Game Development",
  value: 8,
  suffix: "+",
  note: "Hands-on production and R&D in immersive tech.",
};

const OTHER_STATS: StatBase[] = [
  {
    label: "AR / VR Projects Delivered",
    value: 45,
    suffix: "+",
    note: "Prototypes, pilots and full-scale experiences.",
  },
  {
    label: "Games Shipped",
    value: 12,
    suffix: "+",
    note: "Across PC, mobile and headset platforms.",
  },
  {
    label: "Active R&D Tracks",
    value: 4,
    note: "AI, procedural worlds, spatial UX and haptics.",
  },
];

// Simple count-up hook
function useCountUp(target: number, durationMs: number, startWhen: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startWhen) return;

    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const next = Math.round(target * eased);
      setValue(next);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs, startWhen]);

  return value;
}

export default function WodhKeyStats_SlicedBigTypography_Enhanced() {
  const [animateNumbers, setAnimateNumbers] = useState(false);

  const heroValue = useCountUp(MAIN_STAT.value, 1300, animateNumbers);
  const otherValues = OTHER_STATS.map((s, i) =>
    useCountUp(s.value, 1100 + i * 150, animateNumbers)
  );

  return (
    <section
      className="w-full py-28 px-6 md:px-12 lg:px-20 relative"
      style={{ background: COLORS.bg, fontFamily: FONT_STACK }}
    >
      {/* subtle background glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -top-24 left-1/3 w-80 h-80 rounded-full blur-3xl"
          style={{ background: COLORS.neonSoft }}
        />
        <div
          className="absolute bottom-[-80px] right-1/5 w-96 h-96 rounded-full blur-3xl"
          style={{ background: COLORS.violetSoft }}
        />
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto space-y-10"
        onViewportEnter={() => setAnimateNumbers(true)}
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* HEADER */}
        <header className="space-y-3 max-w-3xl">
          <p
            className="text-xs md:text-sm uppercase tracking-[0.3em]"
            style={{ color: COLORS.tintSoft }}
          >
            WODH IN NUMBERS
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white">
            Key stats you{" "}
            <span
              style={{
                color: COLORS.neon,
                textShadow: `0 0 24px ${COLORS.neonSoft}`,
              }}
            >
              see at a glance.
            </span>
          </h2>
          <p className="text-sm md:text-base" style={{ color: COLORS.tint }}>
            No sliders, no extra clicks — just the core XR numbers that show
            what Wodh has actually shipped and explored.
          </p>
        </header>

        {/* MAIN SLICE (NEON HERO) */}
        <motion.section
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-3xl cursor-default"
          style={{
            background: COLORS.neon,
            color: "#02010A",
            boxShadow: `0 26px 60px ${COLORS.neonSoft}`,
          }}
        >
          {/* decorative glow */}
          <div
            className="pointer-events-none absolute -right-24 -top-32 w-96 h-96 rounded-full blur-3xl opacity-70"
            style={{ background: "#FFFFFF66" }}
          />
          <div
            className="pointer-events-none absolute -left-20 bottom-[-60px] w-72 h-72 rounded-full blur-3xl opacity-60"
            style={{ background: "#7FD01566" }}
          />

          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 px-6 md:px-10 lg:px-12 py-10 md:py-12">
            <div className="space-y-3 max-w-xl">
              <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] font-semibold">
                Core Experience
              </p>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                {MAIN_STAT.label}
              </h3>
              <p className="text-sm md:text-base" style={{ color: "#15210A" }}>
                {MAIN_STAT.note}
              </p>
            </div>

            <div className="md:text-right flex md:block items-end justify-between w-full md:w-auto">
              <p className="text-[11px] md:text-xs mb-1 md:mb-2 uppercase tracking-[0.2em]">
                Total Years
              </p>
              <div className="flex items-baseline md:justify-end gap-2">
                <span className="text-5xl md:text-6xl lg:text-7xl font-black leading-none">
                  {heroValue}
                  {MAIN_STAT.suffix && (
                    <span className="text-3xl align-super">
                      {MAIN_STAT.suffix}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* OTHER SLICES */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {OTHER_STATS.map((stat, index) => (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="relative overflow-hidden rounded-3xl border cursor-default"
              style={{
                background:
                  index === 1
                    ? "linear-gradient(135deg, #0F0A26 0%, #1D1633 100%)"
                    : COLORS.panel,
                borderColor: COLORS.border,
                boxShadow: `0 18px 40px ${COLORS.violetSoft}`,
              }}
            >
              {/* left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{
                  background: index === 0 ? COLORS.violet : COLORS.neon,
                }}
              />

              <div className="relative px-6 md:px-7 py-7 md:py-8 flex flex-col gap-3">
                <p
                  className="text-[11px] md:text-xs uppercase tracking-[0.2em]"
                  style={{ color: COLORS.tintSoft }}
                >
                  {stat.label}
                </p>

                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl md:text-4xl font-extrabold leading-none"
                    style={{
                      color: COLORS.neon,
                      textShadow: `0 0 18px ${COLORS.neonSoft}`,
                    }}
                  >
                    {otherValues[index]}
                    {stat.suffix && (
                      <span className="text-2xl align-super">
                        {stat.suffix}
                      </span>
                    )}
                  </span>
                </div>

                <p className="text-xs md:text-sm" style={{ color: COLORS.tint }}>
                  {stat.note}
                </p>
              </div>
            </motion.article>
          ))}
        </section>
      </motion.div>
    </section>
  );
}

