"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Testimonial = {
  id: number;
  heroQuote: string; // short, loud line for left hero
  reviewText: string; // longer text for right card
  name: string;
  role: string;
  company: string;
  photoUrl?: string;
  initials?: string;
};

type ClientLogo = {
  id: number;
  name: string;
  label?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    heroQuote:
      "Shipping with Wodh felt like unlocking a new studio inside our team.",
    reviewText:
      "We expected a vendor; we got a partner. Wodh handled performance, polish, and iteration speed without ever losing the original creative intent. Every milestone came back sharper than the last. Their calm production rhythm made a hard launch feel smooth.",
    name: "Julia Meyer",
    role: "Senior Producer",
    company: "Bright Arcade Studios",
    initials: "JM",
  },
  {
    id: 2,
    heroQuote:
      "They understood our XR vision in the first call — then shipped beyond it.",
    reviewText:
      "Wodh didn't just build our experience; they protected it. Scope stayed clean, deadlines stayed real, and quality never dipped. We felt like we were co-building with an in-house team instead of outsourcing. The final delivery was sharper than our internal benchmark.",
    name: "Omar Al Nahyan",
    role: "Director of Digital Experiences",
    company: "Mirage City Developments",
    initials: "ON",
  },
  {
    id: 3,
    heroQuote:
      "Minimal back-and-forth. Maximum clarity, speed, and craft.",
    reviewText:
      "Their communication is unusually calm and structured for a creative studio. We moved from prototype to production with almost no friction. Strong taste, strong engineering, and the right amount of challenge to our assumptions.",
    name: "Elena Rossi",
    role: "Head of XR Innovation",
    company: "Nordic Vision Lab",
    initials: "ER",
  },
  {
    id: 4,
    heroQuote: "The team kept latency low and the magic high.",
    reviewText:
      "We've worked with many teams, but Wodh balanced design, performance, and iteration pace in a rare way. Our stakeholders noticed immediately, and players felt the difference in the first session.",
    name: "Hannah Clarke",
    role: "Experience Director",
    company: "Museum Timewarp",
    initials: "HC",
  },
];

const CLIENT_LOGOS: ClientLogo[] = [
  { id: 1, name: "TraceAR", label: "City XR" },
  { id: 2, name: "Bright Arcade", label: "Game Studio" },
  { id: 3, name: "Museum Timewarp", label: "Cultural XR" },
  { id: 4, name: "Neo Retail Lab", label: "Retail Innovation" },
  { id: 5, name: "Skyline EDU", label: "Learning XR" },
  { id: 6, name: "XR Sandbox", label: "R&D" },
];

// --- config knobs ---
const AUTO_ROTATE_MS = 6500;
const LOGO_MARQUEE_DURATION = 36; // slower = more premium

const WodhTestimonials_LoudHero_V2_A_UnderButtons_Final: React.FC = () => {
  const [index, setIndex] = useState(0);
  // autoplay logic
  const [isManual, setIsManual] = useState(false); // if true, auto never resumes
  const [isHovered, setIsHovered] = useState(false);
  const autoTimerRef = useRef<number | null>(null);

  // read-more toggles per slide
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({});

  const active = TESTIMONIALS[index];
  const total = TESTIMONIALS.length;

  const goTo = (nextIndex: number) => {
    const normalized = (nextIndex + total) % total;
    setIndex(normalized);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const onManualNav = (fn: () => void) => {
    setIsManual(true); // locks manual mode
    fn();
  };

  // Auto rotate (only if user never clicked manual && not hovered)
  useEffect(() => {
    if (isManual || isHovered) return;

    autoTimerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_ROTATE_MS);

    return () => {
      if (autoTimerRef.current) window.clearInterval(autoTimerRef.current);
    };
  }, [isManual, isHovered, total]);

  const toggleExpanded = (id: number) => {
    setExpandedMap((m) => ({ ...m, [id]: !m[id] }));
  };

  // Duplicate logos for seamless marquee
  const marqueeLogos = useMemo(
    () => [...CLIENT_LOGOS, ...CLIENT_LOGOS],
    []
  );

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0C0722] px-4 py-16 text-white sm:px-6 lg:px-10 xl:px-16 lg:py-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-40 -left-32 h-72 w-72 rounded-full bg-[#9EF31533] blur-3xl"
          animate={{ x: [0, 16, 0], y: [0, 10, 0] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-[#5B2DDC66] blur-3xl"
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
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#B9A8FF]">
              {" "}
              Client Voices / Highlight{" "}
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
                <span className="block text-[#9EF315]">
                  "{active.heroQuote}
                </span>
                <span className="block">"</span>
              </motion.h2>
            </AnimatePresence>

            {/* Person line */}
            <div className="mt-5 text-sm text-[#A8A8C3]">
              <span className="font-semibold text-white">{active.name}</span> ·{" "}
              {active.role} at{" "}
              <span className="text-[#9EF315]">{active.company}</span>
            </div>

            {/* Buttons under text */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onManualNav(prev)}
                className="inline-flex items-center gap-2 rounded-full border border-[#2A1E55] bg-[#0F0A26]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#D1C6FF] transition-all hover:-translate-y-0.5 hover:border-[#9EF315] hover:text-white hover:shadow-[0_0_18px_rgba(158,243,21,0.35)]"
              >
                {" "}
                ← Prev{" "}
              </button>
              <button
                type="button"
                onClick={() => onManualNav(next)}
                className="inline-flex items-center gap-2 rounded-full border border-[#9EF315] bg-[#9EF3151A] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#E8FFD0] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(158,243,21,0.6)]"
              >
                {" "}
                Next →{" "}
              </button>
              {/* slide count */}
              <div className="ml-1 text-[11px] text-[#6E6E90]">
                {" "}
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}{" "}
              </div>
            </div>

            {/* auto/manual hint */}
            <div className="mt-2 text-[11px] text-[#6E6E90]">
              {" "}
              {isManual ? "Manual mode" : isHovered ? "Paused" : "Auto-rotating"}{" "}
            </div>
          </div>

          {/* RIGHT: Big photo + long review card */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="relative mx-auto max-w-md"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Outer neon frame */}
                <motion.div
                  className="absolute -inset-[2px] rounded-[32px] bg-gradient-to-br from-[#9EF315] via-[#5B2DDC] to-[#9EF315] opacity-70 blur-md"
                  animate={{ opacity: [0.25, 0.7, 0.25] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
                <motion.div
                  className="relative overflow-hidden rounded-[28px] border border-[#2A1E55] bg-[#0F0A26]/95"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                >
                  {/* Photo area (taller now) */}
                  <div className="relative h-72 w-full bg-gradient-to-br from-[#050314] via-[#1D1633] to-[#050314] sm:h-80 lg:h-96">
                    {active.photoUrl ? (
                      <img
                        src={active.photoUrl}
                        alt={active.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[#2A1E55] text-3xl font-semibold text-[#9EF315]">
                          {active.initials ??
                            active.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                        </div>
                      </div>
                    )}
                    {/* subtle neon wash */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(158,243,21,0.28),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(91,45,220,0.55),transparent_60%)] opacity-80 mix-blend-screen" />
                  </div>

                  {/* Review text area */}
                  <div className="px-6 py-6 sm:px-7 sm:py-7">
                    <div className="mb-3">
                      <div className="text-sm font-semibold text-white">
                        {active.name}
                      </div>
                      <div className="text-xs text-[#A8A8C3]">
                        {active.role} · {active.company}
                      </div>
                    </div>

                    {/* Clamp to ~5 lines unless expanded */}
                    <p
                      className={[
                        "text-sm leading-relaxed text-[#D1C6FF] sm:text-[15px]",
                        expandedMap[active.id] ? "" : "line-clamp-5",
                      ].join(" ")}
                    >
                      "{active.reviewText}"
                    </p>

                    {/* Read more toggle */}
                    <button
                      type="button"
                      onClick={() => toggleExpanded(active.id)}
                      className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9EF315] hover:text-[#E8FFD0]"
                    >
                      {expandedMap[active.id] ? "Read less" : "Read more"}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom auto-scrolling logo strip */}
        <div className="mt-12 border-t border-[#2A1E55] pt-7">
          <div className="mb-3 flex items-center justify-between text-xs text-[#A8A8C3]">
            <span className="font-medium uppercase tracking-[0.25em] text-[#6E6E90]">
              {" "}
              Teams building with Wodh{" "}
            </span>
            <span className="text-[11px] text-[#6E6E90]"> Auto-scrolling </span>
          </div>
          <div className="relative overflow-hidden">
            {/* edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0C0722] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0C0722] to-transparent" />
            <motion.div
              className="flex gap-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: LOGO_MARQUEE_DURATION,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {marqueeLogos.map((logo, i) => (
                <div
                  key={`${logo.id}-${i}`}
                  className="group flex flex-col items-center justify-center rounded-full border border-transparent px-4 py-2 text-xs text-[#D1C6FF] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2A1E55] hover:bg-[#0F0A26] sm:text-sm hover:shadow-[0_0_18px_rgba(158,243,21,0.25)]"
                >
                  <span className="font-semibold tracking-wide text-white group-hover:text-[#9EF315]">
                    {logo.name}
                  </span>
                  {logo.label && (
                    <span className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-[#6E6E90]">
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
};

export default WodhTestimonials_LoudHero_V2_A_UnderButtons_Final;

