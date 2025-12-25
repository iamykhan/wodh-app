"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Pillar = "XR" | "Games" | "3D" | "CreativeTech";

type ServiceIndexItem = {
  id: string;
  pillar: Pillar;
  title: string; // big typography
  subtitle: string; // small detail line
  bullets: string[]; // compact “what you get”
  href: string; // view more
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** WODH v1 tokens */
const TOKENS = {
  bg: "#0C0722",
  xr: "#9EF315",
  games: "#7C3AED",
};

const ITEMS: ServiceIndexItem[] = [
  {
    id: "xr",
    pillar: "XR",
    title: "XR Development",
    subtitle:
      "Training, simulation, and spatial product storytelling — built for deployment, not demos.",
    bullets: ["Quest / AR", "Unity / Unreal", "Digital twins", "Enterprise rollout"],
    href: "/services/xr",
  },
  {
    id: "games",
    pillar: "Games",
    title: "Game Development",
    subtitle:
      "Studio-grade pipelines from prototype to production — with co-dev and live content velocity.",
    bullets: ["Full production", "Co-dev squads", "Live ops", "Performance + QA"],
    href: "/services/games",
  },
  {
    id: "art",
    pillar: "3D",
    title: "3D Art & Design",
    subtitle:
      "High-craft assets and real-time ready visuals — characters, environments, tech art, and polish.",
    bullets: ["3D modeling", "Rigging + animation", "Tech art + shaders", "Optimization"],
    href: "/services/3d",
  },
  {
    id: "creative-tech",
    pillar: "CreativeTech",
    title: "Creative Tech",
    subtitle:
      "Interactive experiences across web, installations, and real-time systems — engineered for wow + reliability.",
    bullets: ["Interactive web", "Installations", "Real-time systems", "Generative visuals"],
    href: "/services/creative-tech",
  },
];

function accentFor(p: Pillar) {
  if (p === "XR") return { a: TOKENS.xr, b: "rgba(158,243,21,0.22)" };
  if (p === "Games") return { a: TOKENS.games, b: "rgba(124,58,237,0.22)" };
  return { a: "rgba(255,255,255,0.85)", b: "rgba(255,255,255,0.10)" };
}

function BloomRow({ active, pillar }: { active: boolean; pillar: Pillar }) {
  const isDual = pillar === "3D" || pillar === "CreativeTech";
  const xrSoft = "rgba(158,243,21,0.18)";
  const xrHard = "rgba(158,243,21,0.32)";
  const gSoft = "rgba(124,58,237,0.18)";
  const gHard = "rgba(124,58,237,0.32)";

  const bg = isDual
    ? `radial-gradient(55% 70% at 18% 35%, ${xrHard}, transparent 60%),
       radial-gradient(55% 70% at 82% 65%, ${gHard}, transparent 60%),
       radial-gradient(120% 140% at 50% 50%, rgba(255,255,255,0.10), transparent 65%)`
    : pillar === "XR"
      ? `radial-gradient(60% 70% at 20% 45%, ${xrHard}, transparent 62%),
         radial-gradient(120% 140% at 50% 50%, ${xrSoft}, transparent 70%)`
      : `radial-gradient(60% 70% at 20% 45%, ${gHard}, transparent 62%),
         radial-gradient(120% 140% at 50% 50%, ${gSoft}, transparent 70%)`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[28px]"
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1.01 : 0.99,
        }}
        transition={{ duration: 0.18 }}
        style={{
          background: bg,
          filter: "blur(22px)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[18px]"
        initial={false}
        animate={{ opacity: active ? 0.55 : 0 }}
        transition={{ duration: 0.18 }}
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />
    </>
  );
}

export function ServicesHubEditorialIndex({
  title = "Services",
  eyebrow = "What we do",
}: {
  title?: string;
  eyebrow?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/80 ring-1 ring-white/15 backdrop-blur">
            {eyebrow}
          </span>
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/70 ring-1 ring-white/12 backdrop-blur">
            XR • Games • 3D • Creative Tech
          </span>
        </div>

        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          {title} — a studio stack built to ship.
        </h2>

        <p className="max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
          Big-picture clarity here. Full detail on dedicated pages.
        </p>
      </div>

      <div className="divide-y divide-white/10 rounded-[22px] bg-white/[0.03] ring-1 ring-white/10 backdrop-blur-xl">
        {ITEMS.map((item) => {
          const isActive = activeId === item.id;
          const isDual = item.pillar === "3D" || item.pillar === "CreativeTech";
          const accent =
            item.pillar === "XR"
              ? TOKENS.xr
              : item.pillar === "Games"
                ? TOKENS.games
                : "rgba(255,255,255,0.85)";

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId(null)}
              className={cx(
                "relative px-4 py-6 sm:px-6 sm:py-8",
                "transition-colors duration-200"
              )}
              initial={false}
              animate={reduceMotion ? {} : { y: isActive ? -1 : 0, opacity: 1 }}
              transition={{ duration: 0.18 }}
            >
              <BloomRow active={isActive} pillar={item.pillar} />

              <div className="relative grid grid-cols-1 gap-5 md:grid-cols-12 md:items-center">
                <div className="md:col-span-6">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: isDual
                          ? "linear-gradient(90deg, rgba(158,243,21,0.9), rgba(124,58,237,0.9))"
                          : accent,
                      }}
                    />
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                      {item.pillar === "CreativeTech" ? "Creative Tech" : item.pillar}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                      <span className="relative inline-block">
                        {item.title}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -bottom-2 left-0 h-[10px] w-full opacity-0 blur-xl transition-opacity duration-200"
                          style={{
                            opacity: isActive ? 0.9 : 0,
                            background: isDual
                              ? "linear-gradient(90deg, rgba(158,243,21,0.25), rgba(124,58,237,0.25))"
                              : item.pillar === "XR"
                                ? "rgba(158,243,21,0.28)"
                                : "rgba(124,58,237,0.28)",
                          }}
                        />
                      </span>
                    </div>

                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/74">{item.subtitle}</p>
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="flex flex-wrap gap-2">
                    {item.bullets.map((b) => (
                      <span
                        key={b}
                        className={cx(
                          "inline-flex items-center rounded-full px-3 py-1 text-xs",
                          "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur",
                          item.pillar === "XR"
                            ? "text-[rgba(221,255,180,0.95)] ring-[rgba(158,243,21,0.22)]"
                            : item.pillar === "Games"
                              ? "text-[rgba(228,220,255,0.95)] ring-[rgba(124,58,237,0.22)]"
                              : "text-white/80 ring-white/12"
                        )}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 md:justify-self-end">
                  <a
                    href={item.href}
                    className={cx(
                      "group inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium",
                      "text-white/85 ring-1 ring-white/12 bg-white/[0.04] backdrop-blur",
                      "transition-all duration-200 hover:-translate-y-[1px] hover:bg-white/[0.07] hover:text-white",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    )}
                  >
                    View more
                    <span
                      className={cx("transition-transform duration-200", "group-hover:translate-x-[2px]")}
                      aria-hidden
                    >
                      →
                    </span>
                  </a>

                  <div className="mt-2 text-xs text-white/55">Full details & deliverables</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-white/55">
          Tip: This section is designed to stay calm — neon only blooms on hover.
        </div>
        <a href="/contact" className="text-xs font-medium text-white/80 transition hover:text-white">
          Start a project →
        </a>
      </div>
    </section>
  );
}

type PortalCard = {
  id: string;
  pillar: Pillar;
  title: string; // huge typography
  paragraph: string;
  href: string;
  pills: string[]; // key services / outcomes
};

const PORTAL: PortalCard[] = [
  {
    id: "xr",
    pillar: "XR",
    title: "XR Studio",
    paragraph:
      "Training, simulation, and spatial product storytelling — engineered for deployment, device ops, and real outcomes.",
    href: "/services/xr",
    pills: ["Quest / AR", "Training sims", "Digital twins", "Enterprise rollout", "Unity / Unreal"],
  },
  {
    id: "games",
    pillar: "Games",
    title: "Games Studio",
    paragraph:
      "Studio-grade pipelines from prototype to production — co-dev squads, performance passes, and live content velocity.",
    href: "/services/games",
    pills: ["Full production", "Co-dev squads", "Live ops", "Optimization", "Unity / Unreal"],
  },
  {
    id: "art",
    pillar: "3D",
    title: "3D Art & Design",
    paragraph:
      "High-craft real-time assets — characters, environments, animation, and tech art tuned for performance and polish.",
    href: "/services/3d",
    pills: ["Modeling", "Rig + animation", "Tech art", "Shaders", "Optimization"],
  },
  {
    id: "creative",
    pillar: "CreativeTech",
    title: "Creative Tech",
    paragraph:
      "Interactive experiences across web, installations, and real-time systems — engineered for wow without chaos.",
    href: "/services/creative-tech",
    pills: ["Interactive web", "Installations", "Realtime systems", "Motion systems", "Generative visuals"],
  },
];

function pillarLabel(p: Pillar) {
  if (p === "CreativeTech") return "Creative Tech";
  return p === "3D" ? "3D" : p;
}

function portalAccentFor(p: Pillar) {
  if (p === "XR") return TOKENS.xr;
  if (p === "Games") return TOKENS.games;
  return "rgba(255,255,255,0.86)";
}

/** Balanced neon blooms (Wodh v1: controlled, premium) */
function Bloom({ pillar, active }: { pillar: Pillar; active: boolean }) {
  const xrSoft = "rgba(158,243,21,0.18)";
  const xrHard = "rgba(158,243,21,0.34)";
  const gSoft = "rgba(124,58,237,0.18)";
  const gHard = "rgba(124,58,237,0.34)";

  const isDual = pillar === "3D" || pillar === "CreativeTech";

  const bloom = isDual
    ? `radial-gradient(55% 70% at 20% 35%, ${xrHard}, transparent 60%),
       radial-gradient(55% 70% at 80% 65%, ${gHard}, transparent 60%),
       radial-gradient(120% 140% at 50% 50%, rgba(255,255,255,0.10), transparent 65%)`
    : pillar === "XR"
      ? `radial-gradient(60% 75% at 20% 45%, ${xrHard}, transparent 62%),
         radial-gradient(120% 150% at 55% 60%, ${xrSoft}, transparent 70%)`
      : `radial-gradient(60% 75% at 20% 45%, ${gHard}, transparent 62%),
         radial-gradient(120% 150% at 55% 60%, ${gSoft}, transparent 70%)`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-12 rounded-[42px]"
        initial={false}
        animate={{ opacity: active ? 1 : 0.35, scale: active ? 1.02 : 0.99 }}
        transition={{ duration: 0.22 }}
        style={{ background: bloom, filter: "blur(26px)" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        initial={false}
        animate={{ opacity: active ? 0.55 : 0.25 }}
        transition={{ duration: 0.22 }}
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.06), transparent 60%)" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        initial={false}
        animate={{ opacity: active ? 1 : 0.7 }}
        transition={{ duration: 0.22 }}
        style={{
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 0 0 2px rgba(0,0,0,0.0)",
        }}
      />
    </>
  );
}

/** A lightweight “running background animation” that stays premium (no messy particles). */
function RunningBackdrop({ pillar }: { pillar: Pillar }) {
  const reduceMotion = useReducedMotion();

  const xr = "rgba(158,243,21,0.14)";
  const g = "rgba(124,58,237,0.14)";
  const dualA = "rgba(158,243,21,0.10)";
  const dualB = "rgba(124,58,237,0.10)";

  const base =
    pillar === "XR"
      ? `radial-gradient(55% 65% at 20% 30%, ${xr}, transparent 60%),
         radial-gradient(65% 70% at 85% 80%, rgba(255,255,255,0.06), transparent 62%)`
      : pillar === "Games"
        ? `radial-gradient(55% 65% at 20% 30%, ${g}, transparent 60%),
           radial-gradient(65% 70% at 85% 80%, rgba(255,255,255,0.06), transparent 62%)`
        : `radial-gradient(55% 65% at 20% 30%, ${dualA}, transparent 60%),
           radial-gradient(55% 65% at 85% 80%, ${dualB}, transparent 62%),
           radial-gradient(65% 70% at 50% 55%, rgba(255,255,255,0.06), transparent 62%)`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-70"
        style={{ background: base }}
        animate={reduceMotion ? { opacity: 0.7 } : { backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={
          reduceMotion
            ? {}
            : { duration: 12, ease: "linear", repeat: Infinity, repeatType: "mirror" as const }
        }
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-full w-56 rotate-12 opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          filter: "blur(2px)",
        }}
        animate={reduceMotion ? { x: 0, opacity: 0 } : { x: ["-40%", "140%"], opacity: [0.0, 0.25, 0.0] }}
        transition={
          reduceMotion ? {} : { duration: 9, ease: [0.2, 0.8, 0.2, 1], repeat: Infinity }
        }
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-[0.10]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
    </>
  );
}

function PillStrip({ pillar, pills }: { pillar: Pillar; pills: string[] }) {
  const isXR = pillar === "XR";
  const isG = pillar === "Games";
  const isDual = pillar === "3D" || pillar === "CreativeTech";

  const ring = isXR
    ? "ring-[rgba(158,243,21,0.22)]"
    : isG
      ? "ring-[rgba(124,58,237,0.22)]"
      : "ring-white/12";

  const glowBg = isDual ? "bg-white/[0.04]" : "bg-white/[0.045]";

  return (
    <div className={cx("mt-3 rounded-2xl p-3", glowBg, "ring-1 backdrop-blur", ring)}>
      <div className="flex flex-wrap gap-2">
        {pills.map((p) => (
          <span
            key={p}
            className={cx(
              "inline-flex items-center rounded-full px-3 py-1 text-xs",
              "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur text-white/80"
            )}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

function PortalTile({ card }: { card: PortalCard }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  const accent = portalAccentFor(card.pillar);
  const label = pillarLabel(card.pillar);

  return (
    <div className="relative" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
      <motion.div
        className={cx(
          "relative overflow-hidden rounded-[28px]",
          "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl",
          "shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
        )}
        animate={reduceMotion ? {} : { y: active ? -2 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Bloom pillar={card.pillar} active={active} />
        <RunningBackdrop pillar={card.pillar} />

        <div className="relative p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background:
                    card.pillar === "3D" || card.pillar === "CreativeTech"
                      ? "linear-gradient(90deg, rgba(158,243,21,0.9), rgba(124,58,237,0.9))"
                      : accent,
                }}
              />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{label}</span>
            </div>

            <a
              href={card.href}
              className={cx(
                "group inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium",
                "text-white/85 ring-1 ring-white/12 bg-white/[0.04] backdrop-blur",
                "transition-all duration-200 hover:-translate-y-[1px] hover:bg-white/[0.07] hover:text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              )}
            >
              View more
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-[2px]">
                →
              </span>
            </a>
          </div>

          <div className="mt-5">
            <div
              className={cx(
                "text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl",
                "bg-gradient-to-r bg-clip-text text-transparent"
              )}
              style={{
                WebkitTextFillColor: "transparent",
                backgroundImage: `linear-gradient(90deg, ${
                  card.pillar === "XR"
                    ? "rgba(158,243,21,0.95), rgba(255,255,255,0.95)"
                    : card.pillar === "Games"
                      ? "rgba(255,255,255,0.95), rgba(124,58,237,0.95)"
                      : "rgba(255,255,255,0.95), rgba(255,255,255,0.88)"
                })`,
              }}
            >
              {card.title}
            </div>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/74">{card.paragraph}</p>
          </div>

          <PillStrip pillar={card.pillar} pills={card.pills} />
        </div>
      </motion.div>
    </div>
  );
}

export function ServicesPortal2x2() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/80 ring-1 ring-white/15 backdrop-blur">
            Services
          </span>
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/70 ring-1 ring-white/12 backdrop-blur">
            XR • Games • 3D • Creative Tech
          </span>
        </div>

        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          A portal into how we build — four pillars, one production standard.
        </h2>

        <p className="max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
          Open each track for full details, deliverables, and proof. Neon stays controlled — it blooms when you focus.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {PORTAL.map((c) => (
          <PortalTile key={c.id} card={c} />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-white/55">
          Want help choosing? Tell us your goal — we’ll recommend the best track.
        </div>
        <a href="/contact" className="text-xs font-medium text-white/80 transition hover:text-white">
          Start a project →
        </a>
      </div>
    </section>
  );
}

type PortalCardV2 = {
  id: string;
  pillar: Pillar;
  title: string; // huge typography
  paragraph: string;
  href: string;
  pills: string[]; // key services / outcomes (shown OUTSIDE big card)
};

const PORTAL_V2: PortalCardV2[] = [
  {
    id: "xr",
    pillar: "XR",
    title: "XR Studio",
    paragraph:
      "Training, simulation, and spatial product storytelling — engineered for deployment, device ops, and real outcomes.",
    href: "/services/xr",
    pills: ["Quest / AR", "Training sims", "Digital twins", "Enterprise rollout", "Unity / Unreal"],
  },
  {
    id: "games",
    pillar: "Games",
    title: "Games Studio",
    paragraph:
      "Studio-grade pipelines from prototype to production — co-dev squads, performance passes, and live content velocity.",
    href: "/services/games",
    pills: ["Full production", "Co-dev squads", "Live ops", "Optimization", "Unity / Unreal"],
  },
  {
    id: "art",
    pillar: "3D",
    title: "3D Art & Design",
    paragraph:
      "High-craft real-time assets — characters, environments, animation, and tech art tuned for performance and polish.",
    href: "/services/3d",
    pills: ["Modeling", "Rig + animation", "Tech art", "Shaders", "Optimization"],
  },
  {
    id: "creative",
    pillar: "CreativeTech",
    title: "Creative Tech",
    paragraph:
      "Interactive experiences across web, installations, and real-time systems — engineered for wow without chaos.",
    href: "/services/creative-tech",
    pills: ["Interactive web", "Installations", "Realtime systems", "Motion systems", "Generative visuals"],
  },
];

function accentDotV2(p: Pillar) {
  if (p === "XR") return TOKENS.xr;
  if (p === "Games") return TOKENS.games;
  return "linear-gradient(90deg, rgba(158,243,21,0.9), rgba(124,58,237,0.9))";
}

/** Controlled bloom (Wodh v1) */
function BloomV2({ pillar, active }: { pillar: Pillar; active: boolean }) {
  const xrSoft = "rgba(158,243,21,0.18)";
  const xrHard = "rgba(158,243,21,0.34)";
  const gSoft = "rgba(124,58,237,0.18)";
  const gHard = "rgba(124,58,237,0.34)";
  const isDual = pillar === "3D" || pillar === "CreativeTech";

  const bloom = isDual
    ? `radial-gradient(55% 70% at 20% 35%, ${xrHard}, transparent 60%),
       radial-gradient(55% 70% at 80% 65%, ${gHard}, transparent 60%),
       radial-gradient(120% 140% at 50% 50%, rgba(255,255,255,0.10), transparent 65%)`
    : pillar === "XR"
      ? `radial-gradient(60% 75% at 20% 45%, ${xrHard}, transparent 62%),
         radial-gradient(120% 150% at 55% 60%, ${xrSoft}, transparent 70%)`
      : `radial-gradient(60% 75% at 20% 45%, ${gHard}, transparent 62%),
         radial-gradient(120% 150% at 55% 60%, ${gSoft}, transparent 70%)`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-14 rounded-[46px]"
        initial={false}
        animate={{ opacity: active ? 1 : 0.35, scale: active ? 1.02 : 0.99 }}
        transition={{ duration: 0.22 }}
        style={{ background: bloom, filter: "blur(28px)" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[30px]"
        initial={false}
        animate={{ opacity: active ? 0.6 : 0.25 }}
        transition={{ duration: 0.22 }}
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.06), transparent 62%)",
        }}
      />
    </>
  );
}

/** Premium ambient motion (no messy particles) */
function RunningBackdropV2({ pillar }: { pillar: Pillar }) {
  const reduceMotion = useReducedMotion();

  const xr = "rgba(158,243,21,0.14)";
  const g = "rgba(124,58,237,0.14)";
  const dualA = "rgba(158,243,21,0.10)";
  const dualB = "rgba(124,58,237,0.10)";

  const base =
    pillar === "XR"
      ? `radial-gradient(55% 65% at 20% 30%, ${xr}, transparent 60%),
         radial-gradient(65% 70% at 85% 80%, rgba(255,255,255,0.06), transparent 62%)`
      : pillar === "Games"
        ? `radial-gradient(55% 65% at 20% 30%, ${g}, transparent 60%),
           radial-gradient(65% 70% at 85% 80%, rgba(255,255,255,0.06), transparent 62%)`
        : `radial-gradient(55% 65% at 20% 30%, ${dualA}, transparent 60%),
           radial-gradient(55% 65% at 85% 80%, ${dualB}, transparent 62%),
           radial-gradient(65% 70% at 50% 55%, rgba(255,255,255,0.06), transparent 62%)`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[30px] opacity-75"
        style={{ background: base, backgroundSize: "200% 200%" }}
        animate={reduceMotion ? { opacity: 0.75 } : { backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={
          reduceMotion
            ? {}
            : { duration: 14, ease: "linear", repeat: Infinity, repeatType: "mirror" as const }
        }
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-0 h-full w-64 rotate-12 opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          filter: "blur(2px)",
        }}
        animate={reduceMotion ? { x: 0, opacity: 0 } : { x: ["-40%", "160%"], opacity: [0.0, 0.26, 0.0] }}
        transition={reduceMotion ? {} : { duration: 10, ease: [0.2, 0.8, 0.2, 1], repeat: Infinity }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[30px] opacity-[0.10]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />
    </>
  );
}

/** OUTSIDE mini panel (horizontal) */
function PillMiniCardV2({ pillar, pills }: { pillar: Pillar; pills: string[] }) {
  const isXR = pillar === "XR";
  const isG = pillar === "Games";
  const isDual = pillar === "3D" || pillar === "CreativeTech";

  const ring = isXR
    ? "ring-[rgba(158,243,21,0.22)]"
    : isG
      ? "ring-[rgba(124,58,237,0.22)]"
      : "ring-white/12";

  const hint = isXR
    ? "text-[rgba(221,255,180,0.95)]"
    : isG
      ? "text-[rgba(228,220,255,0.95)]"
      : "text-white/80";

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[22px]",
        "bg-white/[0.05] ring-1 backdrop-blur-xl shadow-[0_22px_70px_rgba(0,0,0,0.45)]",
        ring
      )}
    >
      <div
        aria-hidden
        className={cx("pointer-events-none absolute inset-0 opacity-65", isDual ? "" : "hidden")}
        style={{
          background:
            "radial-gradient(55% 65% at 18% 45%, rgba(158,243,21,0.10), transparent 60%), radial-gradient(55% 65% at 82% 55%, rgba(124,58,237,0.10), transparent 60%)",
        }}
      />

      <div className="relative flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-center gap-2">
          <span className={cx("text-xs font-semibold uppercase tracking-[0.14em]", hint)}>Highlights</span>
          <span className="h-[1px] w-10 bg-white/10" />
        </div>

        <div className="flex flex-wrap gap-2">
          {pills.map((p) => (
            <span
              key={p}
              className={cx(
                "inline-flex items-center rounded-full px-3 py-1 text-xs",
                "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur text-white/80"
              )}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BigPortalCardV2({ card }: { card: PortalCardV2 }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  const label = pillarLabel(card.pillar);

  return (
    <div className="relative" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
      <motion.div
        className={cx(
          "relative overflow-hidden rounded-[30px]",
          "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl",
          "shadow-[0_44px_140px_rgba(0,0,0,0.60)]"
        )}
        animate={reduceMotion ? {} : { y: active ? -3 : 0 }}
        transition={{ duration: 0.22 }}
      >
        <BloomV2 pillar={card.pillar} active={active} />
        <RunningBackdropV2 pillar={card.pillar} />

        <div className="relative flex min-h-[440px] flex-col justify-between p-7 sm:min-h-[480px] sm:p-10 lg:min-h-[520px] lg:p-12">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: accentDotV2(card.pillar) as any }} />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{label}</span>
            </div>

            <a
              href={card.href}
              className={cx(
                "group inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium",
                "text-white/85 ring-1 ring-white/12 bg-white/[0.04] backdrop-blur",
                "transition-all duration-200 hover:-translate-y-[1px] hover:bg-white/[0.07] hover:text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              )}
            >
              View more
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-[2px]">
                →
              </span>
            </a>
          </div>

          <div className="mt-6">
            <div
              className={cx(
                "text-balance font-semibold tracking-[-0.04em] leading-[0.95]",
                "text-5xl sm:text-6xl lg:text-7xl text-white"
              )}
            >
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  WebkitTextFillColor: "transparent",
                  backgroundImage:
                    card.pillar === "XR"
                      ? "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.95))"
                      : card.pillar === "Games"
                        ? "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(124,58,237,0.95))"
                        : "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.86))",
                }}
              >
                {card.title}
              </span>
            </div>

            <p className="mt-5 max-w-[56ch] text-sm leading-relaxed text-white/74 sm:text-base">{card.paragraph}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-white/55">
            <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-white/10">
              Production-first
            </span>
            <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-white/10">
              QA gates
            </span>
            <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-white/10">
              Weekly demos
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ServicesPortal2x2OutsidePills() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/80 ring-1 ring-white/15 backdrop-blur">
            Services
          </span>
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/70 ring-1 ring-white/12 backdrop-blur">
            XR • Games • 3D • Creative Tech
          </span>
        </div>

        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          Four pillars. One production standard.
        </h2>

        <p className="max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
          Each track has a dedicated page — this portal helps clients self-select fast, without noise.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {PORTAL_V2.map((c) => (
          <div key={c.id} className="flex flex-col gap-4">
            <BigPortalCardV2 card={c} />
            <PillMiniCardV2 pillar={c.pillar} pills={c.pills} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-white/55">
          Want help choosing? Share your goal — we’ll recommend the best track.
        </div>
        <a href="/contact" className="text-xs font-medium text-white/80 transition hover:text-white">
          Start a project →
        </a>
      </div>
    </section>
  );
}

type PortalCardV3 = {
  id: string;
  pillar: Pillar;
  title: string; // huge typography
  paragraph: string;
  href: string;
  outcomes: string[];
  services: string[];
};

const PORTAL_V3: PortalCardV3[] = [
  {
    id: "xr",
    pillar: "XR",
    title: "XR Studio",
    paragraph:
      "Training, simulation, and spatial product storytelling — engineered for deployment, device ops, and real outcomes.",
    href: "/services/xr",
    outcomes: ["Faster onboarding", "Safer ops"],
    services: ["Quest / AR", "Training sims", "Digital twins", "Enterprise rollout", "Unity / Unreal"],
  },
  {
    id: "games",
    pillar: "Games",
    title: "Games Studio",
    paragraph:
      "Studio-grade pipelines from prototype to production — co-dev squads, performance passes, and live content velocity.",
    href: "/services/games",
    outcomes: ["More velocity", "Stable performance"],
    services: ["Full production", "Co-dev squads", "Live ops", "Optimization", "Unity / Unreal"],
  },
  {
    id: "art",
    pillar: "3D",
    title: "3D Art & Design",
    paragraph:
      "High-craft real-time assets — characters, environments, animation, and tech art tuned for performance and polish.",
    href: "/services/3d",
    outcomes: ["Higher craft", "Real-time ready"],
    services: ["Modeling", "Rig + animation", "Tech art", "Shaders", "Optimization"],
  },
  {
    id: "creative",
    pillar: "CreativeTech",
    title: "Creative Tech",
    paragraph:
      "Interactive experiences across web, installations, and real-time systems — engineered for wow without chaos.",
    href: "/services/creative-tech",
    outcomes: ["Higher engagement", "Reliable delivery"],
    services: ["Interactive web", "Installations", "Realtime systems", "Motion systems", "Generative visuals"],
  },
];

function accentDotV3(p: Pillar) {
  if (p === "XR") return TOKENS.xr;
  if (p === "Games") return TOKENS.games;
  return "linear-gradient(90deg, rgba(158,243,21,0.9), rgba(124,58,237,0.9))";
}

/** NEW: refined mini module bar (Outcomes | Key services) */
function HighlightsBarV3({
  pillar,
  outcomes,
  services,
}: {
  pillar: Pillar;
  outcomes: string[];
  services: string[];
}) {
  const isXR = pillar === "XR";
  const isG = pillar === "Games";
  const isDual = pillar === "3D" || pillar === "CreativeTech";

  const ring = isXR
    ? "ring-[rgba(158,243,21,0.22)]"
    : isG
      ? "ring-[rgba(124,58,237,0.22)]"
      : "ring-white/12";

  const labelTone = isXR
    ? "text-[rgba(221,255,180,0.92)]"
    : isG
      ? "text-[rgba(228,220,255,0.92)]"
      : "text-white/78";

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[22px]",
        "bg-white/[0.05] ring-1 backdrop-blur-xl shadow-[0_22px_70px_rgba(0,0,0,0.45)]",
        ring
      )}
    >
      <div
        aria-hidden
        className={cx("pointer-events-none absolute inset-0 opacity-65", isDual ? "" : "hidden")}
        style={{
          background:
            "radial-gradient(55% 65% at 18% 45%, rgba(158,243,21,0.10), transparent 60%), radial-gradient(55% 65% at 82% 55%, rgba(124,58,237,0.10), transparent 60%)",
        }}
      />

      <div className="relative grid grid-cols-1 gap-3 p-4 sm:grid-cols-12 sm:items-center sm:gap-4">
        <div className="sm:col-span-5">
          <div className={cx("text-[11px] font-semibold uppercase tracking-[0.14em]", labelTone)}>Outcomes</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {outcomes.slice(0, 2).map((o) => (
              <span
                key={o}
                className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/82 ring-1 ring-white/12 backdrop-blur"
              >
                {o}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden sm:col-span-1 sm:block">
          <div className="mx-auto h-10 w-px bg-white/10" />
        </div>

        <div className="sm:col-span-6">
          <div className={cx("text-[11px] font-semibold uppercase tracking-[0.14em]", labelTone)}>Key services</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {services.slice(0, 5).map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/82 ring-1 ring-white/12 backdrop-blur"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Big card with cursor-follow hotspot (premium micro-delight) */
function BigPortalCardV3({ card }: { card: PortalCardV3 }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const label = pillarLabel(card.pillar);

  const hotspotColor =
    card.pillar === "XR"
      ? "rgba(158,243,21,0.14)"
      : card.pillar === "Games"
        ? "rgba(124,58,237,0.14)"
        : "rgba(255,255,255,0.10)";

  function onMove(e: React.MouseEvent) {
    if (reduceMotion) return;
    const el = wrapRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    });
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={onMove}
      style={
        {
          ["--mx" as any]: "50%",
          ["--my" as any]: "45%",
        } as React.CSSProperties
      }
    >
      <motion.div
        className={cx(
          "relative overflow-hidden rounded-[30px]",
          "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl",
          "shadow-[0_44px_140px_rgba(0,0,0,0.60)]"
        )}
        animate={reduceMotion ? {} : { y: active ? -3 : 0 }}
        transition={{ duration: 0.22 }}
      >
        <BloomV2 pillar={card.pillar} active={active} />
        <RunningBackdropV2 pillar={card.pillar} />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[30px]"
          initial={false}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          style={{
            background: `radial-gradient(220px circle at var(--mx) var(--my), ${hotspotColor}, transparent 60%)`,
            filter: "blur(1px)",
          }}
        />

        <div className="relative flex min-h-[440px] flex-col justify-between p-7 sm:min-h-[480px] sm:p-10 lg:min-h-[520px] lg:p-12">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: accentDotV3(card.pillar) as any }} />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{label}</span>
            </div>

            <a
              href={card.href}
              className={cx(
                "group inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium",
                "text-white/85 ring-1 ring-white/12 bg-white/[0.04] backdrop-blur",
                "transition-all duration-200 hover:-translate-y-[1px] hover:bg-white/[0.07] hover:text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              )}
            >
              View more
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-[2px]">
                →
              </span>
            </a>
          </div>

          <div className="mt-6">
            <div
              className={cx(
                "text-balance font-semibold tracking-[-0.04em] leading-[0.95]",
                "text-5xl sm:text-6xl lg:text-7xl"
              )}
            >
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  WebkitTextFillColor: "transparent",
                  backgroundImage:
                    card.pillar === "XR"
                      ? "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.95))"
                      : card.pillar === "Games"
                        ? "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(124,58,237,0.95))"
                        : "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.86))",
                }}
              >
                {card.title}
              </span>
            </div>

            <p className="mt-5 max-w-[56ch] text-sm leading-relaxed text-white/74 sm:text-base">{card.paragraph}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-white/55">
            <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-white/10">
              Production-first
            </span>
            <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-white/10">
              QA gates
            </span>
            <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-white/10">
              Weekly demos
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ServicesPortal2x2OutcomesServicesHotspot() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/80 ring-1 ring-white/15 backdrop-blur">
            Services
          </span>
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/70 ring-1 ring-white/12 backdrop-blur">
            XR • Games • 3D • Creative Tech
          </span>
        </div>

        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          Four pillars. One production standard.
        </h2>

        <p className="max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
          Each track has a dedicated page — this portal helps clients self-select fast, without noise.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {PORTAL_V3.map((c) => (
          <div key={c.id} className="flex flex-col gap-4">
            <BigPortalCardV3 card={c} />
            <HighlightsBarV3 pillar={c.pillar} outcomes={c.outcomes} services={c.services} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-white/55">Want help choosing? Share your goal — we’ll recommend the best track.</div>
        <a href="/contact" className="text-xs font-medium text-white/80 transition hover:text-white">
          Start a project →
        </a>
      </div>
    </section>
  );
}

type PortalCardV4 = {
  id: string;
  pillar: Pillar;
  title: string;
  paragraph: string;
  href: string;
  services: string[]; // key services only (for uniform mini bar)
};

const PORTAL_V4: PortalCardV4[] = [
  {
    id: "xr",
    pillar: "XR",
    title: "XR Studio",
    paragraph:
      "Training, simulation, and spatial product storytelling — engineered for deployment, device ops, and real outcomes.",
    href: "/services/xr",
    services: ["Quest / AR", "Training sims", "Digital twins", "Unity / Unreal", "Enterprise rollout", "Analytics"],
  },
  {
    id: "games",
    pillar: "Games",
    title: "Games Studio",
    paragraph:
      "Studio-grade pipelines from prototype to production — co-dev squads, performance passes, and live content velocity.",
    href: "/services/games",
    services: ["Full production", "Co-dev squads", "Live ops", "Optimization", "QA gates", "Platform compliance"],
  },
  {
    id: "art",
    pillar: "3D",
    title: "3D Art & Design",
    paragraph:
      "High-craft real-time assets — characters, environments, animation, and tech art tuned for performance and polish.",
    href: "/services/3d",
    services: ["Modeling", "Rig + animation", "Environment art", "Tech art", "Shaders", "Optimization"],
  },
  {
    id: "creative",
    pillar: "CreativeTech",
    title: "Creative Tech",
    paragraph:
      "Interactive experiences across web, installations, and real-time systems — engineered for wow without chaos.",
    href: "/services/creative-tech",
    services: ["Interactive web", "Installations", "Realtime systems", "Motion systems", "Three.js / Unity", "Generative visuals"],
  },
];

/**
 * NEW: Uniform Key Services bar
 * - fixed height (same for all)
 * - single-line chips (no wrap growth)
 * - max chips shown, then "+N more"
 */
function KeyServicesBarV4({
  pillar,
  services,
  href,
  max = { base: 4, sm: 5, lg: 6 },
}: {
  pillar: Pillar;
  services: string[];
  href: string;
  max?: { base: number; sm: number; lg: number };
}) {
  const isXR = pillar === "XR";
  const isG = pillar === "Games";
  const isDual = pillar === "3D" || pillar === "CreativeTech";

  const ring = isXR
    ? "ring-[rgba(158,243,21,0.22)]"
    : isG
      ? "ring-[rgba(124,58,237,0.22)]"
      : "ring-white/12";
  const labelTone = isXR
    ? "text-[rgba(221,255,180,0.92)]"
    : isG
      ? "text-[rgba(228,220,255,0.92)]"
      : "text-white/78";

  const baseCount = max.base;
  const smCount = max.sm;
  const lgCount = max.lg;

  const baseVisible = services.slice(0, baseCount);
  const smVisible = services.slice(0, smCount);
  const lgVisible = services.slice(0, lgCount);

  const baseMore = Math.max(0, services.length - baseCount);
  const smMore = Math.max(0, services.length - smCount);
  const lgMore = Math.max(0, services.length - lgCount);

  const MoreChip = ({ n }: { n: number }) =>
    n > 0 ? (
      <a
        href={href}
        className={cx(
          "inline-flex items-center rounded-full px-3 py-1 text-xs whitespace-nowrap",
          "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur text-white/80",
          "transition hover:bg-white/[0.10] hover:text-white"
        )}
      >
        +{n} more
      </a>
    ) : null;

  const Chip = ({ s }: { s: string }) => (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs whitespace-nowrap",
        "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur text-white/82"
      )}
    >
      {s}
    </span>
  );

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[22px]",
        "bg-white/[0.05] ring-1 backdrop-blur-xl shadow-[0_22px_70px_rgba(0,0,0,0.45)]",
        ring
      )}
    >
      <div
        aria-hidden
        className={cx("pointer-events-none absolute inset-0 opacity-65", isDual ? "" : "hidden")}
        style={{
          background:
            "radial-gradient(55% 65% at 18% 45%, rgba(158,243,21,0.10), transparent 60%), radial-gradient(55% 65% at 82% 55%, rgba(124,58,237,0.10), transparent 60%)",
        }}
      />

      <div className="relative flex h-[88px] items-center px-4">
        <div className="w-full">
          <div className="flex items-center justify-between gap-3">
            <div className={cx("text-[11px] font-semibold uppercase tracking-[0.14em]", labelTone)}>Key services</div>
            <a href={href} className="text-xs font-medium text-white/70 hover:text-white transition whitespace-nowrap">
              View →
            </a>
          </div>

          <div className="mt-2 flex flex-nowrap gap-2 overflow-hidden sm:hidden">
            {baseVisible.map((s) => (
              <Chip key={s} s={s} />
            ))}
            <MoreChip n={baseMore} />
          </div>

          <div className="mt-2 hidden sm:flex sm:flex-nowrap sm:gap-2 sm:overflow-hidden lg:hidden">
            {smVisible.map((s) => (
              <Chip key={s} s={s} />
            ))}
            <MoreChip n={smMore} />
          </div>

          <div className="mt-2 hidden lg:flex lg:flex-nowrap lg:gap-2 lg:overflow-hidden">
            {lgVisible.map((s) => (
              <Chip key={s} s={s} />
            ))}
            <MoreChip n={lgMore} />
          </div>
        </div>
      </div>
    </div>
  );
}

function BigPortalCardV4({ card }: { card: PortalCardV4 }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const label = pillarLabel(card.pillar);
  const hotspotColor =
    card.pillar === "XR"
      ? "rgba(158,243,21,0.14)"
      : card.pillar === "Games"
        ? "rgba(124,58,237,0.14)"
        : "rgba(255,255,255,0.10)";

  function onMove(e: React.MouseEvent) {
    if (reduceMotion) return;
    const el = wrapRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    });
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={onMove}
      style={
        {
          ["--mx" as any]: "50%",
          ["--my" as any]: "45%",
        } as React.CSSProperties
      }
    >
      <motion.div
        className={cx(
          "relative overflow-hidden rounded-[30px]",
          "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl",
          "shadow-[0_44px_140px_rgba(0,0,0,0.60)]"
        )}
        animate={reduceMotion ? {} : { y: active ? -3 : 0 }}
        transition={{ duration: 0.22 }}
      >
        <BloomV2 pillar={card.pillar} active={active} />
        <RunningBackdropV2 pillar={card.pillar} />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[30px]"
          initial={false}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.18 }}
          style={{
            background: `radial-gradient(220px circle at var(--mx) var(--my), ${hotspotColor}, transparent 60%)`,
            filter: "blur(1px)",
          }}
        />

        <div className="relative flex min-h-[440px] flex-col justify-between p-7 sm:min-h-[480px] sm:p-10 lg:min-h-[520px] lg:p-12">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: accentDotV3(card.pillar) as any }} />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{label}</span>
            </div>

            <a
              href={card.href}
              className={cx(
                "group inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium",
                "text-white/85 ring-1 ring-white/12 bg-white/[0.04] backdrop-blur",
                "transition-all duration-200 hover:-translate-y-[1px] hover:bg-white/[0.07] hover:text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              )}
            >
              View more
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-[2px]">
                →
              </span>
            </a>
          </div>

          <div className="mt-6">
            <div className={cx("text-balance font-semibold tracking-[-0.04em] leading-[0.95]", "text-5xl sm:text-6xl lg:text-7xl")}>
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  WebkitTextFillColor: "transparent",
                  backgroundImage:
                    card.pillar === "XR"
                      ? "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.95))"
                      : card.pillar === "Games"
                        ? "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(124,58,237,0.95))"
                        : "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.86))",
                }}
              >
                {card.title}
              </span>
            </div>

            <p className="mt-5 max-w-[56ch] text-sm leading-relaxed text-white/74 sm:text-base">{card.paragraph}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-white/55">
            <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-white/10">
              Production-first
            </span>
            <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-white/10">
              QA gates
            </span>
            <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-white/10">
              Weekly demos
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ServicesPortal2x2UniformKeyServices() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 final-four-pillars-section">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/80 ring-1 ring-white/15 backdrop-blur">
            Services
          </span>
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/70 ring-1 ring-white/12 backdrop-blur">
            XR • Games • 3D • Creative Tech
          </span>
        </div>

        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          Four pillars. One production standard.
        </h2>

        <p className="max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
          Each track has a dedicated page — this portal helps clients self-select fast, without noise.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {PORTAL_V4.map((c) => (
          <div key={c.id} className="flex flex-col gap-4">
            <BigPortalCardV4 card={c} />
            <KeyServicesBarV4 pillar={c.pillar} services={c.services} href={c.href} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-white/55">Want help choosing? Share your goal — we’ll recommend the best track.</div>
        <a href="/contact" className="text-xs font-medium text-white/80 transition hover:text-white">
          Start a project →
        </a>
      </div>
    </section>
  );
}

/**
 * WODH v1 — ENGAGEMENT MODELS (3 IDEAS)
 * (Namespaced to avoid collisions with other sections in this file.)
 */
type EngagementModelKeyV5 = "fixed" | "dedicated" | "codev";

const ENGAGEMENT_MODELS_V5: Array<{
  key: EngagementModelKeyV5;
  name: string;
  short: string;
  bestFor: string[];
  whatYouGet: string[];
  timeline: string;
  cadence: string;
  comms: string;
  ownership: string;
  tone: "xr" | "games" | "dual";
}> = [
  {
    key: "fixed",
    name: "Fixed Scope",
    short: "Milestone delivery with clear acceptance criteria.",
    bestFor: ["Defined roadmap", "Tight deadlines", "Budget control"],
    whatYouGet: ["Milestone plan + scope", "Acceptance criteria", "Staged releases", "Documentation + handover"],
    timeline: "2–10+ weeks",
    cadence: "Weekly demos • milestone gates",
    comms: "PM-led cadence • async updates",
    ownership: "Client owns IP • full source handover",
    tone: "xr",
  },
  {
    key: "dedicated",
    name: "Dedicated Team",
    short: "A stable team embedded into your roadmap and rituals.",
    bestFor: ["Long roadmaps", "Fast iteration", "Continuous delivery"],
    whatYouGet: ["Dedicated squad", "Sprint planning", "Backlog grooming", "Velocity tracking"],
    timeline: "Monthly / ongoing",
    cadence: "Sprints • weekly demos",
    comms: "Daily async • weekly sync",
    ownership: "Client owns IP • repo-first workflow",
    tone: "games",
  },
  {
    key: "codev",
    name: "Co-Dev Squads",
    short: "Specialist squads plugged into your pipeline.",
    bestFor: ["Capacity boost", "Specialist needs", "Parallel streams"],
    whatYouGet: ["Feature squads", "Art/UI pods", "QA gates", "Integration support"],
    timeline: "4–16+ weeks / ongoing",
    cadence: "Sprint-based • integration checkpoints",
    comms: "Squad lead • shared tooling",
    ownership: "Client owns IP • clean deliverables",
    tone: "dual",
  },
];

function EngagementChipV5({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "xr" | "games" | "dual";
}) {
  const ring =
    tone === "xr"
      ? "ring-[rgba(158,243,21,0.22)] text-[rgba(221,255,180,0.95)]"
      : tone === "games"
        ? "ring-[rgba(124,58,237,0.22)] text-[rgba(228,220,255,0.95)]"
        : tone === "dual"
          ? "ring-white/14 text-white/85"
          : "ring-white/14 text-white/80";
  return (
    <span className={cx("inline-flex items-center rounded-full px-3 py-1 text-xs", "bg-white/[0.06] ring-1 backdrop-blur", ring)}>
      {children}
    </span>
  );
}

function EngagementPrimaryButtonV5({
  href,
  children,
  tone = "neutral",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "neutral" | "xr" | "games" | "dual";
}) {
  const cls =
    tone === "xr"
      ? "bg-[rgba(158,243,21,0.14)] ring-[rgba(158,243,21,0.38)] hover:bg-[rgba(158,243,21,0.18)]"
      : tone === "games"
        ? "bg-[rgba(124,58,237,0.16)] ring-[rgba(124,58,237,0.40)] hover:bg-[rgba(124,58,237,0.20)]"
        : "bg-white/10 ring-white/22 hover:bg-white/14";

  return (
    <a
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium text-white",
        "ring-1 backdrop-blur transition-all duration-200",
        "hover:-translate-y-[1px] hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
        cls
      )}
    >
      {children}
    </a>
  );
}

function EngagementGhostButtonV5({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium",
        "bg-transparent text-white/85 ring-1 ring-white/14 backdrop-blur",
        "transition-all duration-200 hover:bg-white/6 hover:text-white hover:-translate-y-[1px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      )}
    >
      {children}
    </a>
  );
}

function EngagementGlassCardV5({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[28px]",
        "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl",
        "shadow-[0_40px_120px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function BalancedBloomV5({ tone, active }: { tone: "xr" | "games" | "dual"; active?: boolean }) {
  const xrHard = "rgba(158,243,21,0.32)";
  const gHard = "rgba(124,58,237,0.32)";
  const xrSoft = "rgba(158,243,21,0.16)";
  const gSoft = "rgba(124,58,237,0.16)";

  const bg =
    tone === "xr"
      ? `radial-gradient(60% 70% at 25% 25%, ${xrHard}, transparent 62%),
         radial-gradient(80% 90% at 70% 75%, ${xrSoft}, transparent 68%)`
      : tone === "games"
        ? `radial-gradient(60% 70% at 25% 25%, ${gHard}, transparent 62%),
           radial-gradient(80% 90% at 70% 75%, ${gSoft}, transparent 68%)`
        : `radial-gradient(55% 70% at 22% 30%, ${xrHard}, transparent 62%),
           radial-gradient(55% 70% at 78% 70%, ${gHard}, transparent 62%),
           radial-gradient(100% 120% at 50% 50%, rgba(255,255,255,0.10), transparent 65%)`;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -inset-24 blur-3xl"
      initial={false}
      animate={{ opacity: active ? 0.95 : 0.45 }}
      transition={{ duration: 0.22 }}
      style={{ background: bg }}
    />
  );
}

export function EngagementModelsIdea1_SelectorV5() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<EngagementModelKeyV5>("fixed");

  const current = useMemo(() => ENGAGEMENT_MODELS_V5.find((m) => m.key === active)!, [active]);
  const tone = current.tone;

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <EngagementChipV5>Engagement Models</EngagementChipV5>
          <EngagementChipV5>Idea 1 — Selector</EngagementChipV5>
        </div>
        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          Pick the working model — get the plan instantly.
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
          A product-like selector: clients self-select in seconds, then read the serious details.
        </p>
      </div>

      <EngagementGlassCardV5 className="p-5 sm:p-7">
        <BalancedBloomV5 tone={tone} active />

        <div className="relative flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {ENGAGEMENT_MODELS_V5.map((m) => {
              const isOn = m.key === active;
              const tabTone = m.tone;
              const clsOn =
                tabTone === "xr"
                  ? "bg-[rgba(158,243,21,0.14)] ring-[rgba(158,243,21,0.35)] text-white"
                  : tabTone === "games"
                    ? "bg-[rgba(124,58,237,0.16)] ring-[rgba(124,58,237,0.38)] text-white"
                    : "bg-white/12 ring-white/22 text-white";

              return (
                <button
                  key={m.key}
                  onClick={() => setActive(m.key)}
                  className={cx(
                    "rounded-full px-3 py-2 text-xs ring-1 backdrop-blur transition",
                    isOn ? clsOn : "bg-white/6 text-white/75 ring-white/14 hover:bg-white/10"
                  )}
                >
                  {m.name}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-start">
            <div className="md:col-span-6">
              <div className="flex flex-wrap gap-2">
                <EngagementChipV5 tone={tone === "xr" ? "xr" : tone === "games" ? "games" : "dual"}>Best for</EngagementChipV5>
                {current.bestFor.slice(0, 3).map((b) => (
                  <EngagementChipV5 key={b}>{b}</EngagementChipV5>
                ))}
              </div>

              <div className="mt-4 text-balance text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                {current.name}
              </div>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/74 sm:text-base">{current.short}</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <EngagementPrimaryButtonV5 href="/contact" tone={tone === "xr" ? "xr" : tone === "games" ? "games" : "dual"}>
                  Request proposal
                </EngagementPrimaryButtonV5>
                <EngagementGhostButtonV5 href="/contact">Talk to us</EngagementGhostButtonV5>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">What you get</div>
                <ul className="mt-3 space-y-2">
                  {current.whatYouGet.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    ["Timeline", current.timeline],
                    ["Cadence", current.cadence],
                    ["Comms", current.comms],
                    ["Ownership", current.ownership],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{k}</div>
                      <div className="mt-2 text-sm text-white/80">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="flex flex-wrap gap-2">
              <EngagementChipV5>Weekly demos</EngagementChipV5>
              <EngagementChipV5>QA gates</EngagementChipV5>
              <EngagementChipV5>Source + docs handover</EngagementChipV5>
            </div>
            <div className="text-xs text-white/60">Procurement-friendly • Clear acceptance criteria</div>
          </div>
        </div>
      </EngagementGlassCardV5>
    </section>
  );
}

export function EngagementModelsIdea2_ContractsV5() {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = useState<EngagementModelKeyV5 | null>(null);

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <EngagementChipV5>Engagement Models</EngagementChipV5>
          <EngagementChipV5>Idea 2 — Contracts</EngagementChipV5>
        </div>
        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          Three contract shapes — built for serious delivery.
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
          Reads like procurement: scope, cadence, communication, ownership — clean and confident.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {ENGAGEMENT_MODELS_V5.map((m) => {
          const tone = m.tone;
          const isOn = hover === m.key;

          const edge =
            tone === "xr"
              ? "rgba(158,243,21,0.55)"
              : tone === "games"
                ? "rgba(124,58,237,0.55)"
                : "rgba(255,255,255,0.22)";

          const titleGrad =
            tone === "xr"
              ? "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.95))"
              : tone === "games"
                ? "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(124,58,237,0.95))"
                : "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.86))";

          return (
            <motion.div
              key={m.key}
              onMouseEnter={() => setHover(m.key)}
              onMouseLeave={() => setHover(null)}
              className={cx(
                "relative overflow-hidden rounded-[28px]",
                "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl",
                "shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
              )}
              initial={false}
              animate={reduceMotion ? {} : { y: isOn ? -2 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <BalancedBloomV5 tone={tone} active={!!isOn} />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[28px]"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 0 0 2px rgba(0,0,0,0), 0 0 0 1px rgba(0,0,0,0)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-full w-[3px] opacity-70"
                style={{ background: `linear-gradient(180deg, ${edge}, transparent 70%)` }}
              />

              <div className="relative flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <EngagementChipV5 tone={tone === "xr" ? "xr" : tone === "games" ? "games" : "dual"}>
                    {m.name}
                  </EngagementChipV5>
                  <span className="text-xs text-white/60">{m.timeline}</span>
                </div>

                <div className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white">
                  <span className="bg-clip-text text-transparent" style={{ WebkitTextFillColor: "transparent", backgroundImage: titleGrad }}>
                    {m.name}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/72">{m.short}</p>

                <div className="mt-5 space-y-3">
                  {[
                    ["Scope", m.whatYouGet[0] ?? "Milestone plan + scope definition"],
                    ["Cadence", m.cadence],
                    ["Communication", m.comms],
                    ["Ownership", m.ownership],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{k}</div>
                      <div className="mt-2 text-sm text-white/80">{v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <EngagementChipV5>Best when</EngagementChipV5>
                  {m.bestFor.slice(0, 2).map((b) => (
                    <EngagementChipV5 key={b}>{b}</EngagementChipV5>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <EngagementPrimaryButtonV5 href="/contact" tone={tone === "xr" ? "xr" : tone === "games" ? "games" : "dual"}>
                    Request proposal
                  </EngagementPrimaryButtonV5>
                  <EngagementGhostButtonV5 href="/contact">Ask a question</EngagementGhostButtonV5>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function LadderGlowV5() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 h-full w-full"
      initial={false}
      animate={reduceMotion ? { opacity: 0.6 } : { opacity: 0.75, backgroundPosition: ["0% 0%", "100% 100%"] }}
      transition={reduceMotion ? {} : { duration: 10, ease: "linear", repeat: Infinity, repeatType: "mirror" as const }}
      style={{
        backgroundImage:
          "radial-gradient(600px 320px at 15% 20%, rgba(158,243,21,0.14), transparent 60%), radial-gradient(600px 320px at 85% 80%, rgba(124,58,237,0.16), transparent 60%)",
        backgroundSize: "200% 200%",
      }}
    />
  );
}

export function EngagementModelsIdea3_DeliveryLadderV5() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<EngagementModelKeyV5>("fixed");
  const activeIndex = ENGAGEMENT_MODELS_V5.findIndex((m) => m.key === active);

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <EngagementChipV5>Engagement Models</EngagementChipV5>
          <EngagementChipV5>Idea 3 — Delivery Ladder</EngagementChipV5>
        </div>
        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          Choose based on risk, speed, and scope clarity.
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
          A decision-first ladder: the model is a tradeoff, not a pitch.
        </p>
      </div>

      <EngagementGlassCardV5 className="p-6 sm:p-8">
        <LadderGlowV5 key={activeIndex} />

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Delivery ladder</div>

            <div className="relative mt-4">
              <div className="absolute left-3 top-0 h-full w-px bg-white/12" />

              <div className="space-y-3">
                {ENGAGEMENT_MODELS_V5.map((m) => {
                  const isOn = m.key === active;
                  const dot =
                    m.tone === "xr"
                      ? "bg-[rgba(158,243,21,0.85)]"
                      : m.tone === "games"
                        ? "bg-[rgba(124,58,237,0.85)]"
                        : "bg-white/60";
                  return (
                    <button
                      key={m.key}
                      onClick={() => setActive(m.key)}
                      className={cx(
                        "relative w-full rounded-2xl p-4 text-left transition",
                        "bg-white/[0.05] ring-1 ring-white/10 hover:bg-white/[0.07]",
                        isOn && "ring-white/20"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cx("mt-1 h-2.5 w-2.5 rounded-full", dot)} aria-hidden />
                        <div className="min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-semibold text-white">{m.name}</div>
                            <div className="text-xs text-white/60">{m.timeline}</div>
                          </div>
                          <div className="mt-1 text-sm text-white/72">{m.short}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10"
              >
                {(() => {
                  const m = ENGAGEMENT_MODELS_V5.find((x) => x.key === active)!;
                  const tone = m.tone;
                  return (
                    <>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          <EngagementChipV5 tone={tone === "xr" ? "xr" : tone === "games" ? "games" : "dual"}>{m.name}</EngagementChipV5>
                          {m.bestFor.slice(0, 3).map((b) => (
                            <EngagementChipV5 key={b}>{b}</EngagementChipV5>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <EngagementPrimaryButtonV5 href="/contact" tone={tone === "xr" ? "xr" : tone === "games" ? "games" : "dual"}>
                            Request proposal
                          </EngagementPrimaryButtonV5>
                          <EngagementGhostButtonV5 href="/contact">Talk to us</EngagementGhostButtonV5>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Tradeoff</div>
                          <div className="mt-2 text-sm text-white/80">
                            {active === "fixed" && "Max clarity • least flexibility • strongest budget control"}
                            {active === "dedicated" && "Max flexibility • sustained velocity • continuous roadmap"}
                            {active === "codev" && "Max throughput • specialist coverage • integration complexity"}
                          </div>
                        </div>

                        <div className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">What you get</div>
                          <ul className="mt-2 space-y-2">
                            {m.whatYouGet.slice(0, 3).map((x) => (
                              <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                                <span>{x}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Cadence</div>
                          <div className="mt-2 text-sm text-white/80">{m.cadence}</div>
                        </div>

                        <div className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Ownership</div>
                          <div className="mt-2 text-sm text-white/80">{m.ownership}</div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex flex-wrap gap-2">
              <EngagementChipV5>Weekly demos</EngagementChipV5>
              <EngagementChipV5>QA gates</EngagementChipV5>
              <EngagementChipV5>Acceptance criteria</EngagementChipV5>
              <EngagementChipV5>Source + docs handover</EngagementChipV5>
            </div>
          </div>
        </div>
      </EngagementGlassCardV5>
    </section>
  );
}

/**
 * WODH v1 — SHARED PIPELINE (ONE TEAM, ONE PRODUCTION SYSTEM)
 * Namespaced (V6) to avoid collisions with other sections in this file.
 */
type PipelineToneV6 = "xr" | "games" | "dual";

function PipelineBloomV6({ tone, active = true }: { tone: PipelineToneV6; active?: boolean }) {
  const xrHard = "rgba(158,243,21,0.32)";
  const gHard = "rgba(124,58,237,0.32)";
  const xrSoft = "rgba(158,243,21,0.14)";
  const gSoft = "rgba(124,58,237,0.14)";

  const bg =
    tone === "xr"
      ? `radial-gradient(60% 70% at 25% 25%, ${xrHard}, transparent 62%),
         radial-gradient(80% 90% at 70% 75%, ${xrSoft}, transparent 68%)`
      : tone === "games"
        ? `radial-gradient(60% 70% at 25% 25%, ${gHard}, transparent 62%),
           radial-gradient(80% 90% at 70% 75%, ${gSoft}, transparent 68%)`
        : `radial-gradient(55% 70% at 20% 30%, ${xrHard}, transparent 62%),
           radial-gradient(55% 70% at 80% 70%, ${gHard}, transparent 62%),
           radial-gradient(100% 120% at 50% 50%, rgba(255,255,255,0.10), transparent 65%)`;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -inset-24 blur-3xl"
      initial={false}
      animate={{ opacity: active ? 0.95 : 0.35 }}
      transition={{ duration: 0.22 }}
      style={{ background: bg }}
    />
  );
}

function PipelineChipV6({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/80 ring-1 ring-white/14 backdrop-blur">
      {children}
    </span>
  );
}

function PipelineAccentDotV6({ tone }: { tone: PipelineToneV6 }) {
  const style =
    tone === "xr"
      ? { background: TOKENS.xr }
      : tone === "games"
        ? { background: TOKENS.games }
        : { background: "linear-gradient(90deg, rgba(158,243,21,0.9), rgba(124,58,237,0.9))" as any };

  return <span className="h-2 w-2 rounded-full" style={style as any} />;
}

function PipelineGlassCardV6({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[28px]",
        "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl",
        "shadow-[0_40px_120px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function PipelineSectionHeaderV6({
  eyebrow,
  title,
  subtitle,
  rightTag,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  rightTag: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8">
      <div className="flex flex-wrap items-center gap-2">
        <PipelineChipV6>{eyebrow}</PipelineChipV6>
        <PipelineChipV6>{rightTag}</PipelineChipV6>
      </div>
      <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">{title}</h2>
      <p className="max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">{subtitle}</p>
    </div>
  );
}

/* =======================================================================================
   IDEA 1 — Pipeline Timeline (cinematic horizontal stages)
======================================================================================= */

type PipelineStageV6 = {
  id: string;
  name: string;
  line: string;
  deliverables: string[];
};

const PIPELINE_STAGES_V6: PipelineStageV6[] = [
  {
    id: "discovery",
    name: "Discovery",
    line: "We align goals, constraints, and success metrics.",
    deliverables: ["Goals & risks", "User flows", "Tech constraints"],
  },
  { id: "planning", name: "Planning", line: "We map scope into a plan you can approve.", deliverables: ["Milestones", "Backlog", "Estimates"] },
  {
    id: "prototype",
    name: "Prototype",
    line: "We validate direction early with a playable/usable slice.",
    deliverables: ["Prototype build", "Design system", "Feedback loop"],
  },
  { id: "production", name: "Production", line: "We build features with steady cadence and demos.", deliverables: ["Feature delivery", "Art pipeline", "Integrations"] },
  {
    id: "qa",
    name: "QA & Optimization",
    line: "We harden for performance, stability, and edge cases.",
    deliverables: ["QA gates", "Perf passes", "Bug triage"],
  },
  {
    id: "launch",
    name: "Launch",
    line: "Release support, checklists, and rollout confidence.",
    deliverables: ["Release plan", "Store / deploy", "Monitoring"],
  },
  { id: "support", name: "Live Support", line: "Post-launch improvements and long-term velocity.", deliverables: ["Updates", "Content drops", "Roadmap support"] },
];

function PipelineStageCardV6({
  stage,
  active,
  onEnter,
}: {
  stage: PipelineStageV6;
  active: boolean;
  onEnter: () => void;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.button
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className={cx(
        "relative min-w-[280px] snap-start text-left",
        "rounded-[24px] bg-white/[0.05] p-5 ring-1 ring-white/10 backdrop-blur",
        "transition hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      )}
      initial={false}
      animate={reduceMotion ? {} : { y: active ? -2 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[30px]"
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        style={{
          background:
            "radial-gradient(55% 70% at 25% 30%, rgba(158,243,21,0.22), transparent 60%), radial-gradient(55% 70% at 75% 70%, rgba(124,58,237,0.22), transparent 60%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Stage</div>
          <div className="text-xs text-white/55">{stage.id.toUpperCase()}</div>
        </div>

        <div className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">{stage.name}</div>
        <p className="mt-2 text-sm leading-relaxed text-white/72">{stage.line}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {stage.deliverables.slice(0, 3).map((d) => (
            <span key={d} className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/78 ring-1 ring-white/12">
              {d}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export function SharedPipelineIdea1_TimelineV6() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(PIPELINE_STAGES_V6[2].id);

  const idx = PIPELINE_STAGES_V6.findIndex((s) => s.id === activeId);
  const progress = Math.max(0, idx) / Math.max(1, PIPELINE_STAGES_V6.length - 1);

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <PipelineSectionHeaderV6
        eyebrow="Shared Pipeline"
        rightTag="Idea 1 — Timeline"
        title="One team. One production system."
        subtitle="A cinematic, end-to-end pipeline clients can understand instantly — with shared quality gates across everything we ship."
      />

      <PipelineGlassCardV6 className="p-5 sm:p-7">
        <PipelineBloomV6 tone="dual" active />

        <div className="relative">
          <div className="relative mb-5 h-[14px] overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/10">
            <motion.div
              aria-hidden
              className="absolute inset-y-0 left-0"
              initial={false}
              animate={{ width: `${Math.round(progress * 100)}%` }}
              transition={reduceMotion ? {} : { duration: 0.35 }}
              style={{
                background: "linear-gradient(90deg, rgba(158,243,21,0.35), rgba(255,255,255,0.22), rgba(124,58,237,0.35))",
              }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-0 opacity-40"
              initial={false}
              animate={reduceMotion ? { opacity: 0.4 } : { backgroundPosition: ["0% 0%", "100% 100%"] }}
              transition={reduceMotion ? {} : { duration: 10, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
              style={{
                backgroundImage:
                  "radial-gradient(800px 220px at 10% 50%, rgba(158,243,21,0.18), transparent 65%), radial-gradient(800px 220px at 90% 50%, rgba(124,58,237,0.18), transparent 65%)",
                backgroundSize: "200% 200%",
              }}
            />
          </div>

          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {PIPELINE_STAGES_V6.map((s) => (
              <PipelineStageCardV6 key={s.id} stage={s} active={s.id === activeId} onEnter={() => setActiveId(s.id)} />
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="flex flex-wrap gap-2">
              <PipelineChipV6>Weekly demos</PipelineChipV6>
              <PipelineChipV6>QA gates</PipelineChipV6>
              <PipelineChipV6>Perf targets</PipelineChipV6>
              <PipelineChipV6>Source + docs handover</PipelineChipV6>
            </div>
            <div className="text-xs text-white/60">Stage focus: {PIPELINE_STAGES_V6[idx]?.name}</div>
          </div>
        </div>
      </PipelineGlassCardV6>
    </section>
  );
}

/* =======================================================================================
   IDEA 2 — Dual-Lane + Shared Gates (XR lane + Games lane with shared gates)
======================================================================================= */

type PipelineGateV6 = {
  id: string;
  name: string;
  xr: string;
  games: string;
  shared: string[];
};

const PIPELINE_GATES_V6: PipelineGateV6[] = [
  { id: "kickoff", name: "Kickoff Gate", xr: "Device targets + comfort constraints", games: "Platform targets + gameplay goals", shared: ["Scope + plan", "Risks", "Success metrics"] },
  { id: "art", name: "Art Gate", xr: "Performance-ready assets for XR constraints", games: "Art direction + level/character pipeline", shared: ["Naming + hierarchy", "Export rules", "Review passes"] },
  { id: "build", name: "Build Gate", xr: "Interaction, tracking, and deployment-ready builds", games: "Core loops, systems, and progression integration", shared: ["CI builds", "Feature flags", "Telemetry hooks"] },
  { id: "qa", name: "QA Gate", xr: "Comfort + stability + device regression", games: "Frame time + input + edge-case coverage", shared: ["Bug triage", "Perf budget", "Acceptance criteria"] },
  { id: "release", name: "Release Gate", xr: "Rollout + device ops support", games: "Store / patch / certification readiness", shared: ["Release checklist", "Monitoring", "Handover pack"] },
];

function PipelineGateRowV6({ gate, active, onEnter }: { gate: PipelineGateV6; active: boolean; onEnter: () => void }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      onMouseEnter={onEnter}
      className={cx(
        "relative rounded-[24px] bg-white/[0.05] p-5 ring-1 ring-white/10 backdrop-blur",
        "transition hover:bg-white/[0.07]"
      )}
      initial={false}
      animate={reduceMotion ? {} : { y: active ? -1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[28px]"
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        style={{
          background:
            "radial-gradient(55% 70% at 20% 35%, rgba(158,243,21,0.20), transparent 60%), radial-gradient(55% 70% at 80% 65%, rgba(124,58,237,0.20), transparent 60%)",
          filter: "blur(18px)",
        }}
      />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <PipelineAccentDotV6 tone="dual" />
            <div className="text-sm font-semibold text-white">{gate.name}</div>
          </div>
          <div className="text-xs text-white/60">Gate {gate.id.toUpperCase()}</div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12 md:items-start">
          <div className="md:col-span-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgba(221,255,180,0.90)]">XR lane</div>
            <div className="mt-2 text-sm text-white/80">{gate.xr}</div>
          </div>

          <div className="md:col-span-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">Shared gate</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {gate.shared.map((s) => (
                <span key={s} className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/78 ring-1 ring-white/12">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[rgba(228,220,255,0.90)]">Games lane</div>
            <div className="mt-2 text-sm text-white/80">{gate.games}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SharedPipelineIdea2_DualLaneGatesV6() {
  const [activeId, setActiveId] = useState(PIPELINE_GATES_V6[0].id);

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <PipelineSectionHeaderV6
        eyebrow="Shared Pipeline"
        rightTag="Idea 2 — Dual-Lane + Gates"
        title="Different outputs. Same discipline."
        subtitle="XR and Games may ship different experiences — but every build goes through the same quality gates, cadence, and release system."
      />

      <PipelineGlassCardV6 className="p-5 sm:p-7">
        <PipelineBloomV6 tone="dual" active />

        <div className="relative space-y-4">
          {PIPELINE_GATES_V6.map((g) => (
            <PipelineGateRowV6 key={g.id} gate={g} active={g.id === activeId} onEnter={() => setActiveId(g.id)} />
          ))}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="flex flex-wrap gap-2">
              <PipelineChipV6>CI builds</PipelineChipV6>
              <PipelineChipV6>Review passes</PipelineChipV6>
              <PipelineChipV6>Perf budgets</PipelineChipV6>
              <PipelineChipV6>Release checklist</PipelineChipV6>
            </div>
            <div className="text-xs text-white/60">Active gate: {PIPELINE_GATES_V6.find((x) => x.id === activeId)?.name}</div>
          </div>
        </div>
      </PipelineGlassCardV6>
    </section>
  );
}

/* =======================================================================================
   IDEA 3 — Quality System Board (enterprise/procurement-ready)
======================================================================================= */

type PipelineBoardPillarV6 = {
  id: string;
  title: string;
  tone: PipelineToneV6;
  checks: string[];
  receive: string[];
  measure: string[];
};

const PIPELINE_BOARD_V6: PipelineBoardPillarV6[] = [
  { id: "planning", title: "Planning & Scope", tone: "xr", checks: ["Clear milestones", "Acceptance criteria", "Risk register"], receive: ["Scope doc", "Milestone plan", "Prioritized backlog"], measure: ["Scope clarity", "Change control", "On-time milestones"] },
  { id: "cadence", title: "Delivery Cadence", tone: "games", checks: ["Weekly demos", "Sprint rituals", "Visible roadmap"], receive: ["Weekly demo builds", "Sprint notes", "Velocity reporting"], measure: ["Cycle time", "Throughput", "Predictability"] },
  { id: "quality", title: "Quality Gates", tone: "dual", checks: ["QA gates", "Perf budgets", "Regression checks"], receive: ["QA reports", "Perf pass notes", "Bug triage log"], measure: ["Crash rate", "Frame time", "Defect escape rate"] },
  { id: "ownership", title: "Ownership & Handover", tone: "dual", checks: ["Repo-first workflow", "Docs + assets", "Clean packaging"], receive: ["Source code", "Documentation", "Handover checklist"], measure: ["Deployment readiness", "Maintainability", "Handover completeness"] },
];

function PipelineBoardCardV6({ p, active, onEnter }: { p: PipelineBoardPillarV6; active: boolean; onEnter: () => void }) {
  const reduceMotion = useReducedMotion();

  const titleGrad =
    p.tone === "xr"
      ? "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.95))"
      : p.tone === "games"
        ? "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(124,58,237,0.95))"
        : "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.86))";

  return (
    <motion.div
      onMouseEnter={onEnter}
      className={cx(
        "relative overflow-hidden rounded-[28px]",
        "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl",
        "shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
      )}
      initial={false}
      animate={reduceMotion ? {} : { y: active ? -2 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <PipelineBloomV6 tone={p.tone} active={active} />

      <div className="relative p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <PipelineAccentDotV6 tone={p.tone} />
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">System pillar</div>
          </div>
          <div className="text-xs text-white/60">{p.id.toUpperCase()}</div>
        </div>

        <div className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-white">
          <span className="bg-clip-text text-transparent" style={{ WebkitTextFillColor: "transparent", backgroundImage: titleGrad }}>
            {p.title}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Checks</div>
            <ul className="mt-3 space-y-2">
              {p.checks.map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">You receive</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.receive.map((x) => (
                <span key={x} className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/78 ring-1 ring-white/12">
                  {x}
                </span>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">We measure</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.measure.map((x) => (
                <span key={x} className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/78 ring-1 ring-white/12">
                  {x}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <PipelineChipV6>Weekly demos</PipelineChipV6>
          <PipelineChipV6>QA gates</PipelineChipV6>
          <PipelineChipV6>Release checklist</PipelineChipV6>
        </div>
      </div>
    </motion.div>
  );
}

export function SharedPipelineIdea3_QualityBoardV6() {
  const [activeId, setActiveId] = useState(PIPELINE_BOARD_V6[0].id);

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <PipelineSectionHeaderV6
        eyebrow="Shared Pipeline"
        rightTag="Idea 3 — Quality Board"
        title="A production system you can trust."
        subtitle="Enterprise-friendly proof: planning, cadence, quality gates, and ownership — written the way procurement teams think."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {PIPELINE_BOARD_V6.map((p) => (
          <PipelineBoardCardV6 key={p.id} p={p} active={p.id === activeId} onEnter={() => setActiveId(p.id)} />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-white/60">
          Active pillar: <span className="text-white/80">{PIPELINE_BOARD_V6.find((x) => x.id === activeId)?.title}</span>
        </div>
        <a href="/contact" className="text-xs font-medium text-white/80 hover:text-white transition">
          Start a project →
        </a>
      </div>
    </section>
  );
}

/**
 * WODH v1 — Shared Pipeline (REFINED TIMELINE)
 * Namespaced (V7) to avoid collisions with other sections in this file.
 */
type PipelineToneV7 = "xr" | "games" | "dual";
type PipelineStageIdV7 = "discovery" | "planning" | "prototype" | "production" | "qa" | "launch" | "support";

function PipelineChipV7({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/80 ring-1 ring-white/14 backdrop-blur">
      {children}
    </span>
  );
}

function PipelineGlassCardV7({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[28px]",
        "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl",
        "shadow-[0_40px_120px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function PipelineBloomV7({ tone, active = true }: { tone: PipelineToneV7; active?: boolean }) {
  const xrHard = "rgba(158,243,21,0.30)";
  const gHard = "rgba(124,58,237,0.30)";
  const xrSoft = "rgba(158,243,21,0.14)";
  const gSoft = "rgba(124,58,237,0.14)";

  const bg =
    tone === "xr"
      ? `radial-gradient(60% 70% at 25% 25%, ${xrHard}, transparent 62%),
         radial-gradient(80% 90% at 70% 75%, ${xrSoft}, transparent 68%)`
      : tone === "games"
        ? `radial-gradient(60% 70% at 25% 25%, ${gHard}, transparent 62%),
           radial-gradient(80% 90% at 70% 75%, ${gSoft}, transparent 68%)`
        : `radial-gradient(55% 70% at 20% 30%, ${xrHard}, transparent 62%),
           radial-gradient(55% 70% at 80% 70%, ${gHard}, transparent 62%),
           radial-gradient(100% 120% at 50% 50%, rgba(255,255,255,0.10), transparent 65%)`;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -inset-24 blur-3xl"
      initial={false}
      animate={{ opacity: active ? 0.9 : 0.35 }}
      transition={{ duration: 0.22 }}
      style={{ background: bg }}
    />
  );
}

type PipelineStageV7 = {
  id: PipelineStageIdV7;
  name: string;
  verbLine: string;
  deliverables: string[];
  inputs: string[];
  outputs: string[];
  dod: string;
  badge?: { label: "QA Gates" | "Handover Pack"; tone: PipelineToneV7 };
};

const PIPELINE_STAGES_V7: PipelineStageV7[] = [
  {
    id: "discovery",
    name: "Discovery",
    verbLine: "Align goals, constraints, and success metrics.",
    deliverables: ["Goals & risks", "Users & flows", "Tech constraints"],
    inputs: ["Business goals", "Current materials", "Constraints & devices"],
    outputs: ["Success metrics", "Risk map", "Scope hypothesis"],
    dod: "Everyone agrees what “success” means and what we will not do.",
  },
  {
    id: "planning",
    name: "Planning",
    verbLine: "Map scope into a plan you can approve.",
    deliverables: ["Milestones", "Backlog", "Estimates"],
    inputs: ["Scope hypothesis", "Technical choices", "Timeline needs"],
    outputs: ["Milestone plan", "Acceptance criteria", "Delivery schedule"],
    dod: "Plan, risks, and acceptance criteria are approved.",
  },
  {
    id: "prototype",
    name: "Prototype",
    verbLine: "Validate direction early with a working slice.",
    deliverables: ["Prototype build", "Design direction", "Feedback loop"],
    inputs: ["Plan", "References", "Key assumptions"],
    outputs: ["Playable slice", "Design rules", "Go/no-go signals"],
    dod: "Core interaction/loop is validated with real feedback.",
  },
  {
    id: "production",
    name: "Production",
    verbLine: "Build features with steady cadence and demos.",
    deliverables: ["Feature delivery", "Art pipeline", "Integrations"],
    inputs: ["Backlog", "Design rules", "Approved targets"],
    outputs: ["Shippable increments", "Integration-ready builds", "Weekly demos"],
    dod: "Features meet acceptance criteria and pass internal checks.",
  },
  {
    id: "qa",
    name: "QA & Optimization",
    verbLine: "Harden for performance, stability, and edge cases.",
    deliverables: ["QA gates", "Perf passes", "Bug triage"],
    inputs: ["Production builds", "Perf budgets", "Edge-case list"],
    outputs: ["Stable build", "Perf report", "Regression checklist"],
    dod: "Passes QA gates, meets perf budgets, and is release-ready.",
    badge: { label: "QA Gates", tone: "dual" },
  },
  {
    id: "launch",
    name: "Launch",
    verbLine: "Release with checklists, rollout, and confidence.",
    deliverables: ["Release plan", "Deploy/store", "Monitoring"],
    inputs: ["Release candidate", "Store/deploy needs", "Handover checklist"],
    outputs: ["Released build", "Monitoring setup", "Handover pack"],
    dod: "Release is live, monitored, and fully handover-ready.",
    badge: { label: "Handover Pack", tone: "dual" },
  },
  {
    id: "support",
    name: "Live Support",
    verbLine: "Support updates, content, and long-term velocity.",
    deliverables: ["Updates", "Content drops", "Roadmap support"],
    inputs: ["Post-launch data", "User feedback", "Roadmap priorities"],
    outputs: ["Patch cadence", "Improvements", "Ongoing roadmap delivery"],
    dod: "A stable post-launch cadence is established and maintained.",
  },
];

function PipelineToneChipStyleV7(tone: PipelineToneV7) {
  if (tone === "xr") return "ring-[rgba(158,243,21,0.24)] text-[rgba(221,255,180,0.92)]";
  if (tone === "games") return "ring-[rgba(124,58,237,0.24)] text-[rgba(228,220,255,0.92)]";
  return "ring-white/14 text-white/85";
}

function PipelineBadgePillV7({ label, tone }: { label: string; tone: PipelineToneV7 }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs",
        "bg-white/[0.06] ring-1 backdrop-blur",
        PipelineToneChipStyleV7(tone)
      )}
    >
      {label}
    </span>
  );
}

function PipelineIconButtonV7({
  onClick,
  disabled,
  children,
  title,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-3 py-2 text-sm font-medium",
        "bg-white/[0.06] text-white/85 ring-1 ring-white/14 backdrop-blur",
        "transition hover:bg-white/[0.10] hover:text-white hover:-translate-y-[1px]",
        "disabled:opacity-45 disabled:hover:translate-y-0",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      )}
    >
      {children}
    </button>
  );
}

function PipelinePathV7({ activeIndex, count }: { activeIndex: number; count: number }) {
  const reduceMotion = useReducedMotion();
  const progress = count <= 1 ? 0 : activeIndex / (count - 1);

  return (
    <div className="relative">
      <div className="relative h-[16px] overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-white/10">
        <motion.div
          aria-hidden
          className="absolute inset-y-0 left-0"
          initial={false}
          animate={{ width: `${Math.round(progress * 100)}%` }}
          transition={reduceMotion ? {} : { duration: 0.35 }}
          style={{
            background:
              "linear-gradient(90deg, rgba(158,243,21,0.32), rgba(255,255,255,0.18), rgba(124,58,237,0.32))",
          }}
        />

        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-30"
          initial={false}
          animate={reduceMotion ? { opacity: 0.3 } : { backgroundPosition: ["0% 50%", "200% 50%"] }}
          transition={reduceMotion ? {} : { duration: 7.5, ease: "linear", repeat: Infinity }}
          style={{
            backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
            backgroundSize: "40% 100%",
          }}
        />

        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-35"
          initial={false}
          animate={reduceMotion ? { opacity: 0.35 } : { backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={reduceMotion ? {} : { duration: 10, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          style={{
            backgroundImage:
              "radial-gradient(800px 220px at 10% 50%, rgba(158,243,21,0.18), transparent 65%), radial-gradient(800px 220px at 90% 50%, rgba(124,58,237,0.18), transparent 65%)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
        {Array.from({ length: count }).map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <div key={i} className="relative">
              <div className="h-2.5 w-2.5 rounded-full bg-white/35" />
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full"
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
                transition={{ duration: 0.22 }}
                style={{
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.16), 0 0 0 6px rgba(0,0,0,0)",
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(158,243,21,0.30), transparent 60%), radial-gradient(circle at 70% 70%, rgba(124,58,237,0.30), transparent 60%)",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PipelineStageFocusPanelV7({ stage }: { stage: PipelineStageV7 }) {
  return (
    <div className="mt-6 rounded-[26px] bg-white/[0.05] p-5 ring-1 ring-white/10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Stage focus</span>
          <span className="h-[1px] w-10 bg-white/10" />
          <span className="text-sm font-semibold text-white">{stage.name}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {stage.badge ? <PipelineBadgePillV7 label={stage.badge.label} tone={stage.badge.tone} /> : null}
          <PipelineChipV7>Definition of done</PipelineChipV7>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Inputs</div>
          <ul className="mt-3 space-y-2">
            {stage.inputs.map((x) => (
              <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Outputs</div>
          <ul className="mt-3 space-y-2">
            {stage.outputs.map((x) => (
              <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">DoD</div>
          <div className="mt-3 text-sm leading-relaxed text-white/80">{stage.dod}</div>
        </div>
      </div>
    </div>
  );
}

function PipelineClosestIndexByCenterV7(container: HTMLDivElement, itemSelector = "[data-stage-card='1']") {
  const items = Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
  if (!items.length) return 0;

  const cRect = container.getBoundingClientRect();
  const cCenter = cRect.left + cRect.width / 2;

  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;

  items.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    const elCenter = r.left + r.width / 2;
    const dist = Math.abs(elCenter - cCenter);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  });

  return best;
}

function PipelineScrollToIndexV7(container: HTMLDivElement, index: number) {
  const items = Array.from(container.querySelectorAll<HTMLElement>("[data-stage-card='1']"));
  const el = items[index];
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
}

/** Stage card (refined) */
function PipelineStageCardV7({
  stage,
  active,
  onSelect,
}: {
  stage: PipelineStageV7;
  active: boolean;
  onSelect: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = useState(false);

  return (
    <motion.button
      data-stage-card="1"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onClick={onSelect}
      className={cx(
        "relative min-w-[290px] snap-start text-left",
        "rounded-[24px] bg-white/[0.05] p-5 ring-1 ring-white/10 backdrop-blur",
        "transition hover:bg-white/[0.07]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      )}
      initial={false}
      animate={reduceMotion ? {} : { y: active || hover ? -2 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[30px]"
        initial={false}
        animate={{ opacity: active ? 1 : hover ? 0.75 : 0 }}
        transition={{ duration: 0.18 }}
        style={{
          background:
            "radial-gradient(55% 70% at 25% 30%, rgba(158,243,21,0.22), transparent 60%), radial-gradient(55% 70% at 75% 70%, rgba(124,58,237,0.22), transparent 60%)",
          filter: "blur(20px)",
        }}
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Stage</div>
          <div className="text-xs text-white/55">{stage.id.toUpperCase()}</div>
        </div>

        <motion.div initial={false} animate={reduceMotion ? {} : { x: hover ? 1 : 0 }} transition={{ duration: 0.18 }}>
          <div className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">{stage.name}</div>
          <p className="mt-2 text-sm leading-relaxed text-white/72">{stage.verbLine}</p>
        </motion.div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {stage.badge ? <PipelineBadgePillV7 label={stage.badge.label} tone={stage.badge.tone} /> : null}
          {stage.deliverables.slice(0, 3).map((d) => (
            <span key={d} className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/78 ring-1 ring-white/12">
              {d}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

export function SharedPipelineIdea1_TimelineRefinedV7() {
  const reduceMotion = useReducedMotion();

  const [activeId, setActiveId] = useState<PipelineStageIdV7>("prototype");
  const activeIndex = useMemo(() => PIPELINE_STAGES_V7.findIndex((s) => s.id === activeId), [activeId]);
  const activeStage = useMemo(() => PIPELINE_STAGES_V7[activeIndex] ?? PIPELINE_STAGES_V7[0], [activeIndex]);

  const activeIdRef = useRef(activeId);
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf: number | null = null;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const idx = PipelineClosestIndexByCenterV7(el);
        const id = PIPELINE_STAGES_V7[idx]?.id;
        if (id && id !== activeIdRef.current) setActiveId(id);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  function goPrev() {
    const el = scrollerRef.current;
    if (!el) return;
    const next = Math.max(0, activeIndex - 1);
    PipelineScrollToIndexV7(el, next);
    setActiveId(PIPELINE_STAGES_V7[next].id);
  }

  function goNext() {
    const el = scrollerRef.current;
    if (!el) return;
    const next = Math.min(PIPELINE_STAGES_V7.length - 1, activeIndex + 1);
    PipelineScrollToIndexV7(el, next);
    setActiveId(PIPELINE_STAGES_V7[next].id);
  }

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <PipelineChipV7>Shared Pipeline</PipelineChipV7>
          <PipelineChipV7>Idea 1 — Timeline (Refined)</PipelineChipV7>
        </div>

        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          One team. One production system.
        </h2>

        <p className="max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
          A guided, cinematic timeline — with shared gates, clear handoffs, and a procurement-friendly definition of done.
        </p>
      </div>

      <PipelineGlassCardV7 className="p-5 sm:p-7">
        <PipelineBloomV7 tone="dual" active />

        <div className="relative">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <PipelineIconButtonV7 onClick={goPrev} disabled={activeIndex === 0} title="Previous stage">
                ←
              </PipelineIconButtonV7>
              <PipelineIconButtonV7 onClick={goNext} disabled={activeIndex === PIPELINE_STAGES_V7.length - 1} title="Next stage">
                →
              </PipelineIconButtonV7>

              <span className="ml-2 hidden text-xs text-white/55 sm:inline">Drag to explore • Snap timeline</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <PipelineChipV7>Weekly demos</PipelineChipV7>
              <PipelineChipV7>QA gates</PipelineChipV7>
              <PipelineChipV7>Handover pack</PipelineChipV7>
            </div>
          </div>

          <PipelinePathV7 activeIndex={activeIndex} count={PIPELINE_STAGES_V7.length} />

          <div
            ref={scrollerRef}
            className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {PIPELINE_STAGES_V7.map((s) => (
              <PipelineStageCardV7 key={s.id} stage={s} active={s.id === activeId} onSelect={() => setActiveId(s.id)} />
            ))}
          </div>

          <PipelineStageFocusPanelV7 stage={activeStage} />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="flex flex-wrap gap-2">
              <PipelineChipV7>Typical kickoff: 1–2 weeks</PipelineChipV7>
              <PipelineChipV7>Weekly demos</PipelineChipV7>
              <PipelineChipV7>QA gates</PipelineChipV7>
              <PipelineChipV7>Source + docs</PipelineChipV7>
            </div>
            <div className="text-xs text-white/60">
              Current stage: <span className="text-white/80">{activeStage.name}</span>
            </div>
          </div>
        </div>
      </PipelineGlassCardV7>
    </section>
  );
}

/**
 * WODH v1 — Shared Pipeline (REFINED TIMELINE v2)
 * Namespaced (V8) to avoid collisions with other sections in this file.
 */
type PipelineToneV8 = "xr" | "games" | "dual";
type PipelineStageIdV8 = "discovery" | "planning" | "prototype" | "production" | "qa" | "launch" | "support";

type PipelineStageV8 = {
  id: PipelineStageIdV8;
  name: string;
  verbLine: string;
  deliverables: string[];
  inputs: string[];
  outputs: string[];
  dod: string;
  badge?: { label: "QA Gates" | "Handover Pack"; tone: PipelineToneV8 };
};

const PIPELINE_STAGES_V8: PipelineStageV8[] = [
  {
    id: "discovery",
    name: "Discovery",
    verbLine: "Align goals, constraints, and success metrics.",
    deliverables: ["Goals & risks", "Users & flows", "Tech constraints"],
    inputs: ["Business goals", "Current materials", "Constraints & devices"],
    outputs: ["Success metrics", "Risk map", "Scope hypothesis"],
    dod: "Everyone agrees what “success” means and what we will not do.",
  },
  {
    id: "planning",
    name: "Planning",
    verbLine: "Map scope into a plan you can approve.",
    deliverables: ["Milestones", "Backlog", "Estimates"],
    inputs: ["Scope hypothesis", "Technical choices", "Timeline needs"],
    outputs: ["Milestone plan", "Acceptance criteria", "Delivery schedule"],
    dod: "Plan, risks, and acceptance criteria are approved.",
  },
  {
    id: "prototype",
    name: "Prototype",
    verbLine: "Validate direction early with a working slice.",
    deliverables: ["Prototype build", "Design direction", "Feedback loop"],
    inputs: ["Plan", "References", "Key assumptions"],
    outputs: ["Playable slice", "Design rules", "Go/no-go signals"],
    dod: "Core interaction/loop is validated with real feedback.",
  },
  {
    id: "production",
    name: "Production",
    verbLine: "Build features with steady cadence and demos.",
    deliverables: ["Feature delivery", "Art pipeline", "Integrations"],
    inputs: ["Backlog", "Design rules", "Approved targets"],
    outputs: ["Shippable increments", "Integration-ready builds", "Weekly demos"],
    dod: "Features meet acceptance criteria and pass internal checks.",
  },
  {
    id: "qa",
    name: "QA & Optimization",
    verbLine: "Harden for performance, stability, and edge cases.",
    deliverables: ["QA gates", "Perf passes", "Bug triage"],
    inputs: ["Production builds", "Perf budgets", "Edge-case list"],
    outputs: ["Stable build", "Perf report", "Regression checklist"],
    dod: "Passes QA gates, meets perf budgets, and is release-ready.",
    badge: { label: "QA Gates", tone: "dual" },
  },
  {
    id: "launch",
    name: "Launch",
    verbLine: "Release with checklists, rollout, and confidence.",
    deliverables: ["Release plan", "Deploy/store", "Monitoring"],
    inputs: ["Release candidate", "Store/deploy needs", "Handover checklist"],
    outputs: ["Released build", "Monitoring setup", "Handover pack"],
    dod: "Release is live, monitored, and fully handover-ready.",
    badge: { label: "Handover Pack", tone: "dual" },
  },
  {
    id: "support",
    name: "Live Support",
    verbLine: "Support updates, content, and long-term velocity.",
    deliverables: ["Updates", "Content drops", "Roadmap support"],
    inputs: ["Post-launch data", "User feedback", "Roadmap priorities"],
    outputs: ["Patch cadence", "Improvements", "Ongoing roadmap delivery"],
    dod: "A stable post-launch cadence is established and maintained.",
  },
];

function PipelineChipV8({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/80 ring-1 ring-white/14 backdrop-blur">
      {children}
    </span>
  );
}

function PipelineBadgePillV8({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/85 ring-1 ring-white/14 backdrop-blur">
      {label}
    </span>
  );
}

function PipelineGlassCardV8({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[28px]",
        "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl",
        "shadow-[0_40px_120px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Reduced glow: only corners, never washes content */
function PipelineCornerGlowV8({ active = true }: { active?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      initial={false}
      animate={{ opacity: active ? 1 : 0.6 }}
      transition={{ duration: 0.22 }}
      style={{
        WebkitMaskImage:
          "radial-gradient(70% 65% at 18% 22%, black 0%, transparent 70%), radial-gradient(70% 65% at 82% 82%, black 0%, transparent 70%)",
        maskImage:
          "radial-gradient(70% 65% at 18% 22%, black 0%, transparent 70%), radial-gradient(70% 65% at 82% 82%, black 0%, transparent 70%)",
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={reduceMotion ? { opacity: 1 } : { backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={reduceMotion ? {} : { duration: 14, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
        style={{
          opacity: 0.55,
          background:
            "radial-gradient(600px 360px at 18% 20%, rgba(158,243,21,0.16), transparent 65%), radial-gradient(600px 360px at 82% 82%, rgba(124,58,237,0.16), transparent 65%)",
          backgroundSize: "200% 200%",
          filter: "blur(18px)",
        }}
      />
    </motion.div>
  );
}

/** Premium SVG path (thin, clean, nodes, active ring) */
function PremiumPipelinePathV8({ activeIndex, count }: { activeIndex: number; count: number }) {
  const reduceMotion = useReducedMotion();
  const t = count <= 1 ? 0 : activeIndex / (count - 1);
  const xs = Array.from({ length: count }).map((_, i) => (count === 1 ? 50 : (i / (count - 1)) * 100));

  const ids = {
    line: "wodhLineV8",
    shimmer: "wodhShimmerV8",
    glow: "softGlowV8",
  };

  return (
    <div className="relative mt-2">
      <div className="relative rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/10">
        <svg viewBox="0 0 100 24" className="h-10 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={ids.line} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="rgba(158,243,21,0.70)" />
              <stop offset="0.5" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="1" stopColor="rgba(124,58,237,0.70)" />
            </linearGradient>

            <linearGradient id={ids.shimmer} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="rgba(255,255,255,0)" />
              <stop offset="0.5" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="1" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            <filter id={ids.glow} x="-50%" y="-200%" width="200%" height="400%">
              <feGaussianBlur stdDeviation="1.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <line x1="4" y1="12" x2="96" y2="12" stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" />

          <line x1="4" y1="12" x2={4 + 92 * t} y2="12" stroke={`url(#${ids.line})`} strokeWidth="1.8" filter={`url(#${ids.glow})`} />

          {!reduceMotion && (
            <motion.line
              x1="4"
              y1="12"
              x2="40"
              y2="12"
              stroke={`url(#${ids.shimmer})`}
              strokeWidth="2.2"
              initial={{ x: -20 }}
              animate={{ x: 120 }}
              transition={{ duration: 5.5, ease: "linear", repeat: Infinity }}
              opacity="0.30"
            />
          )}

          {xs.map((x, i) => {
            const isActive = i === activeIndex;
            const cxp = 4 + (92 * x) / 100;
            return (
              <g key={i}>
                <circle cx={cxp} cy="12" r="2.2" fill="rgba(255,255,255,0.35)" />
                {isActive && (
                  <>
                    <circle cx={cxp} cy="12" r="6" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
                    <circle cx={cxp} cy="12" r="7.2" fill="none" stroke="rgba(158,243,21,0.28)" strokeWidth="1" filter={`url(#${ids.glow})`} />
                    <circle cx={cxp} cy="12" r="8.2" fill="none" stroke="rgba(124,58,237,0.28)" strokeWidth="1" filter={`url(#${ids.glow})`} />
                  </>
                )}
              </g>
            );
          })}
        </svg>

        <div className="mt-2 flex items-center justify-between text-xs text-white/55">
          <span>Start</span>
          <span>Release</span>
        </div>
      </div>
    </div>
  );
}

function PipelineStageCardV8({ stage, active, onSelect }: { stage: PipelineStageV8; active: boolean; onSelect: () => void }) {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onClick={onSelect}
      className={cx(
        "relative min-w-[290px] snap-start text-left",
        "rounded-[24px] bg-white/[0.05] p-5 ring-1 ring-white/10 backdrop-blur",
        "transition hover:bg-white/[0.07]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      )}
      initial={false}
      animate={reduceMotion ? {} : { y: active || hover ? -2 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px]"
        initial={false}
        animate={{ opacity: active ? 1 : hover ? 0.7 : 0 }}
        transition={{ duration: 0.18 }}
        style={{
          background:
            "radial-gradient(260px 180px at 18% 25%, rgba(158,243,21,0.12), transparent 60%), radial-gradient(260px 180px at 82% 75%, rgba(124,58,237,0.12), transparent 60%)",
        }}
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Stage</div>
          <div className="text-xs text-white/55">{stage.id.toUpperCase()}</div>
        </div>

        <motion.div initial={false} animate={reduceMotion ? {} : { x: hover ? 1 : 0 }} transition={{ duration: 0.18 }}>
          <div className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">{stage.name}</div>
          <p className="mt-2 text-sm leading-relaxed text-white/72">{stage.verbLine}</p>
        </motion.div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {stage.badge ? <PipelineBadgePillV8 label={stage.badge.label} /> : null}
          {stage.deliverables.slice(0, 3).map((d) => (
            <span key={d} className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/78 ring-1 ring-white/12">
              {d}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

function PipelineStageFocusPanelV8({ stage }: { stage: PipelineStageV8 }) {
  return (
    <div className="mt-6 rounded-[26px] bg-white/[0.05] p-5 ring-1 ring-white/10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Stage focus</span>
          <span className="h-[1px] w-10 bg-white/10" />
          <span className="text-sm font-semibold text-white">{stage.name}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {stage.badge ? <PipelineBadgePillV8 label={stage.badge.label} /> : null}
          <PipelineChipV8>Definition of done</PipelineChipV8>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Inputs</div>
          <ul className="mt-3 space-y-2">
            {stage.inputs.map((x) => (
              <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Outputs</div>
          <ul className="mt-3 space-y-2">
            {stage.outputs.map((x) => (
              <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">DoD</div>
          <div className="mt-3 text-sm leading-relaxed text-white/80">{stage.dod}</div>
        </div>
      </div>
    </div>
  );
}

function PipelineIconButtonV8({
  onClick,
  disabled,
  children,
  title,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-3 py-2 text-sm font-medium",
        "bg-white/[0.08] text-white/90 ring-1 ring-white/16 backdrop-blur",
        "transition hover:bg-white/[0.12] hover:text-white hover:-translate-y-[1px]",
        "disabled:opacity-50 disabled:hover:translate-y-0",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      )}
    >
      {children}
    </button>
  );
}

function PipelineScrollToIndexV8(container: HTMLDivElement, index: number) {
  const items = Array.from(container.querySelectorAll<HTMLElement>("[data-stage-item-v8='1']"));
  const el = items[index];
  if (!el) return;
  const left = el.offsetLeft - container.offsetLeft;
  container.scrollTo({ left, behavior: "smooth" });
}

function PipelineClosestIndexByCenterV8(container: HTMLDivElement) {
  const items = Array.from(container.querySelectorAll<HTMLElement>("[data-stage-item-v8='1']"));
  if (!items.length) return 0;

  const cCenter = container.scrollLeft + container.clientWidth / 2;
  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;

  items.forEach((el, i) => {
    const elCenter = el.offsetLeft + el.clientWidth / 2;
    const dist = Math.abs(elCenter - cCenter);
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  });

  return best;
}

export function SharedPipelineIdea1_TimelineRefinedV2_V8() {
  const [activeId, setActiveId] = useState<PipelineStageIdV8>("prototype");
  const activeIndex = useMemo(() => PIPELINE_STAGES_V8.findIndex((s) => s.id === activeId), [activeId]);
  const activeStage = useMemo(() => PIPELINE_STAGES_V8[activeIndex] ?? PIPELINE_STAGES_V8[0], [activeIndex]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const programmaticLockRef = useRef(false);
  const lockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf: number | null = null;
    const onScroll = () => {
      if (programmaticLockRef.current) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const idx = PipelineClosestIndexByCenterV8(el);
        const id = PIPELINE_STAGES_V8[idx]?.id;
        if (id && id !== activeId) setActiveId(id);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [activeId]);

  useEffect(() => {
    return () => {
      if (lockTimerRef.current) window.clearTimeout(lockTimerRef.current);
    };
  }, []);

  function withProgrammaticLock(fn: () => void) {
    programmaticLockRef.current = true;
    if (lockTimerRef.current) window.clearTimeout(lockTimerRef.current);
    fn();
    lockTimerRef.current = window.setTimeout(() => {
      programmaticLockRef.current = false;
    }, 420);
  }

  function goPrev() {
    const el = scrollerRef.current;
    if (!el) return;
    const next = Math.max(0, activeIndex - 1);
    withProgrammaticLock(() => {
      setActiveId(PIPELINE_STAGES_V8[next].id);
      PipelineScrollToIndexV8(el, next);
    });
  }

  function goNext() {
    const el = scrollerRef.current;
    if (!el) return;
    const next = Math.min(PIPELINE_STAGES_V8.length - 1, activeIndex + 1);
    withProgrammaticLock(() => {
      setActiveId(PIPELINE_STAGES_V8[next].id);
      PipelineScrollToIndexV8(el, next);
    });
  }

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <PipelineChipV8>Shared Pipeline</PipelineChipV8>
          <PipelineChipV8>Idea 1 — Timeline (Refined v2)</PipelineChipV8>
        </div>

        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          One team. One production system.
        </h2>

        <p className="max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
          Guided timeline with clean gates, premium visuals, and stable navigation.
        </p>
      </div>

      <PipelineGlassCardV8 className="p-5 sm:p-7">
        <PipelineCornerGlowV8 active />

        <div className="relative z-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <PipelineIconButtonV8 onClick={goPrev} disabled={activeIndex === 0} title="Previous stage">
                ←
              </PipelineIconButtonV8>
              <PipelineIconButtonV8 onClick={goNext} disabled={activeIndex === PIPELINE_STAGES_V8.length - 1} title="Next stage">
                →
              </PipelineIconButtonV8>

              <span className="ml-2 hidden text-xs text-white/55 sm:inline">Drag to explore • Snap</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <PipelineChipV8>Typical kickoff: 1–2 weeks</PipelineChipV8>
              <PipelineChipV8>Weekly demos</PipelineChipV8>
              <PipelineChipV8>QA gates</PipelineChipV8>
            </div>
          </div>

          <PremiumPipelinePathV8 activeIndex={activeIndex} count={PIPELINE_STAGES_V8.length} />

          <div
            ref={scrollerRef}
            className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {PIPELINE_STAGES_V8.map((s) => (
              <div key={s.id} data-stage-item-v8="1" className="snap-start">
                <PipelineStageCardV8 stage={s} active={s.id === activeId} onSelect={() => setActiveId(s.id)} />
              </div>
            ))}
          </div>

          <PipelineStageFocusPanelV8 stage={activeStage} />

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="flex flex-wrap gap-2">
              <PipelineChipV8>Source + docs</PipelineChipV8>
              <PipelineChipV8>Release checklist</PipelineChipV8>
              <PipelineChipV8>Handover pack</PipelineChipV8>
            </div>
            <div className="text-xs text-white/60">
              Current stage: <span className="text-white/80">{activeStage.name}</span>
            </div>
          </div>
        </div>
      </PipelineGlassCardV8>
    </section>
  );
}

/**
 * WODH v1 — Shared Pipeline (Screenshot Grid Style) — Upgraded
 * Namespaced (V9) to avoid collisions with other pipeline variants in this file.
 */
type PipelineGridFilterV9 = "all" | "xr" | "games";
type PipelineGridStageIdV9 = "discovery" | "prototype" | "production" | "qa" | "launch" | "support";

type PipelineGridFocusV9 = {
  inputs: string[];
  outputs: string[];
  dod: string;
};

type PipelineGridStageV9 = {
  id: PipelineGridStageIdV9;
  num: string;
  title: string;
  subtitle: Record<PipelineGridFilterV9, string>;
  focus: Record<PipelineGridFilterV9, PipelineGridFocusV9>;
};

const PIPELINE_GRID_STAGES_V9: PipelineGridStageV9[] = [
  {
    id: "discovery",
    num: "01",
    title: "Discovery",
    subtitle: {
      all: "Goals, constraints, and success metrics.",
      xr: "Use-cases, devices, comfort constraints, and rollout context.",
      games: "Core loop, target platform, audience, and content direction.",
    },
    focus: {
      all: {
        inputs: ["Business goals", "Constraints & stakeholders", "Reference materials"],
        outputs: ["Success metrics", "Scope hypothesis", "Risk map"],
        dod: "Goals + success metrics are locked; key risks are identified and owned.",
      },
      xr: {
        inputs: ["Devices & environments", "Safety/comfort constraints", "Ops or training context"],
        outputs: ["Comfort targets", "Device/perf constraints", "Interaction assumptions"],
        dod: "Comfort + device constraints are defined and accepted.",
      },
      games: {
        inputs: ["Audience & platform", "Genre references", "Monetization constraints (if any)"],
        outputs: ["Loop hypothesis", "Content direction", "Production assumptions"],
        dod: "Core loop direction is agreed and measurable.",
      },
    },
  },
  {
    id: "prototype",
    num: "02",
    title: "Prototype",
    subtitle: {
      all: "Risk-killing proof, fast iteration loops.",
      xr: "Interaction proof + comfort validation on real devices.",
      games: "Playable proof of loop + pacing, early fun validation.",
    },
    focus: {
      all: {
        inputs: ["Scope hypothesis", "Key unknowns", "References + constraints"],
        outputs: ["Working slice", "Validated direction", "Next-step plan"],
        dod: "Critical risks are reduced and a clear production path exists.",
      },
      xr: {
        inputs: ["Comfort targets", "Hardware constraints", "Interaction assumptions"],
        outputs: ["On-device prototype", "Comfort findings", "Perf baseline"],
        dod: "Prototype runs on target device with acceptable comfort/perf.",
      },
      games: {
        inputs: ["Loop hypothesis", "Content direction", "Target platform specs"],
        outputs: ["Playable loop", "Pacing insights", "Fun/retention signals"],
        dod: "A playable loop is validated with clear next improvements.",
      },
    },
  },
  {
    id: "production",
    num: "03",
    title: "Production",
    subtitle: {
      all: "Systems + content pipeline, sprint cadence.",
      xr: "Build modules + device-ready iterations with stable cadence.",
      games: "Gameplay systems + content pipeline with sprint rhythm.",
    },
    focus: {
      all: {
        inputs: ["Backlog", "Design rules", "Prototype learnings"],
        outputs: ["Shippable increments", "Stable builds", "Weekly demos"],
        dod: "Features meet acceptance criteria and pass internal checks.",
      },
      xr: {
        inputs: ["Target device budgets", "Interaction patterns", "Module roadmap"],
        outputs: ["Device-ready builds", "Interaction system", "Integration-ready modules"],
        dod: "Builds stay within device/perf budgets while features grow.",
      },
      games: {
        inputs: ["Core systems roadmap", "Content plan", "Balancing targets"],
        outputs: ["Systems integrated", "Content pipeline", "Playable milestones"],
        dod: "Core systems are stable and content pipeline is operational.",
      },
    },
  },
  {
    id: "qa",
    num: "04",
    title: "QA & Polish",
    subtitle: {
      all: "Performance, edge-cases, platform standards.",
      xr: "Comfort checks, device regressions, performance budgets.",
      games: "Frame-time, input feel, balance passes, edge-case coverage.",
    },
    focus: {
      all: {
        inputs: ["Milestone builds", "Perf budgets", "Edge-case list"],
        outputs: ["QA reports", "Perf pass notes", "Release candidate readiness"],
        dod: "QA gates pass; perf budgets met; release candidate is stable.",
      },
      xr: {
        inputs: ["Comfort targets", "Device matrix", "Deployment constraints"],
        outputs: ["Comfort validation", "Device regression report", "Perf optimizations"],
        dod: "Comfort + device stability are proven across the target matrix.",
      },
      games: {
        inputs: ["Performance targets", "Balance goals", "Store/cert constraints"],
        outputs: ["Stability + perf report", "Balance changes", "Cert readiness notes"],
        dod: "Build is stable, performant, and aligned with platform standards.",
      },
    },
  },
  {
    id: "launch",
    num: "05",
    title: "Launch",
    subtitle: {
      all: "Release support, store assets, deployment.",
      xr: "Rollout plan + device ops support and monitoring.",
      games: "Store/cert submission + rollout planning and monitoring.",
    },
    focus: {
      all: {
        inputs: ["Release candidate", "Deployment needs", "Handover checklist"],
        outputs: ["Release checklist", "Monitoring setup", "Handover pack"],
        dod: "Release is live, monitored, and handover-ready.",
      },
      xr: {
        inputs: ["Device deployment plan", "Ops constraints", "Training/usage context"],
        outputs: ["Rollout checklist", "Monitoring signals", "Ops handover pack"],
        dod: "Deployment is validated and support paths are in place.",
      },
      games: {
        inputs: ["Store requirements", "Cert checklists", "Release plan"],
        outputs: ["Submission pack", "Release monitoring", "Patch strategy"],
        dod: "Submission is ready; release is monitored; patch plan exists.",
      },
    },
  },
  {
    id: "support",
    num: "06",
    title: "Support",
    subtitle: {
      all: "Roadmap, updates, and continuous improvement.",
      xr: "Continuous improvements + new modules with stable ops support.",
      games: "Patches, content drops, balancing, and live updates.",
    },
    focus: {
      all: {
        inputs: ["Usage data", "Feedback", "Roadmap priorities"],
        outputs: ["Update cadence", "Improvements", "Long-term roadmap execution"],
        dod: "A stable post-launch cadence is established and maintained.",
      },
      xr: {
        inputs: ["Ops feedback", "Device metrics", "New module requests"],
        outputs: ["Module iterations", "Stability upgrades", "Operational improvements"],
        dod: "Operational reliability stays high while features evolve.",
      },
      games: {
        inputs: ["Player feedback", "Telemetry", "Live roadmap"],
        outputs: ["Patches", "Content drops", "Balance iterations"],
        dod: "Live cadence is predictable with measurable improvements.",
      },
    },
  },
];

function PipelineGridChipV9({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "xr" | "games";
}) {
  const ring =
    tone === "xr"
      ? "ring-[rgba(158,243,21,0.22)] text-[rgba(221,255,180,0.92)]"
      : tone === "games"
        ? "ring-[rgba(124,58,237,0.22)] text-[rgba(228,220,255,0.92)]"
        : "ring-white/14 text-white/80";

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs ring-1 backdrop-blur",
        ring
      )}
    >
      {children}
    </span>
  );
}

function PipelineGridFilterPillV9({
  active,
  children,
  onClick,
  tone,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  tone: PipelineGridFilterV9;
}) {
  const on =
    tone === "xr"
      ? "bg-[rgba(158,243,21,0.12)] ring-[rgba(158,243,21,0.32)] text-white"
      : tone === "games"
        ? "bg-[rgba(124,58,237,0.14)] ring-[rgba(124,58,237,0.35)] text-white"
        : "bg-white/12 ring-white/22 text-white";

  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full px-3 py-1.5 text-xs ring-1 backdrop-blur transition",
        active ? on : "bg-white/6 text-white/70 ring-white/14 hover:bg-white/10 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

function PipelineGridSignatureCTA_V9({ href = "/contact" }: { href?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.a
      href={href}
      className={cx(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white",
        "bg-white/[0.06] ring-1 ring-white/14 backdrop-blur",
        "hover:bg-white/[0.10] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      )}
      whileHover={reduceMotion ? {} : { y: -1 }}
      transition={{ duration: 0.18 }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-full opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 70% at 30% 30%, rgba(158,243,21,0.18), transparent 60%), radial-gradient(60% 70% at 70% 70%, rgba(124,58,237,0.18), transparent 60%)",
        }}
      />
      <span className="relative">Start a project</span>
      <motion.span
        aria-hidden
        className="relative"
        initial={false}
        animate={{ x: 0 }}
        whileHover={reduceMotion ? {} : { x: 2 }}
        transition={{ duration: 0.18 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

function PipelineGridBackgroundPolishV9() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_0%,rgba(158,243,21,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_82%_100%,rgba(124,58,237,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_50%_120%,rgba(0,0,0,0.78),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:22px_22px]" />
    </div>
  );
}

function PipelineGridConnectorsV9({ activeIndex }: { activeIndex: number }) {
  const points = useMemo(
    () => [
      { x: 16.5, y: 28 },
      { x: 50.0, y: 28 },
      { x: 83.5, y: 28 },
      { x: 16.5, y: 74 },
      { x: 50.0, y: 74 },
      { x: 83.5, y: 74 },
    ],
    []
  );

  const t = points.length <= 1 ? 0 : activeIndex / (points.length - 1);

  const ids = {
    grad: "wodhConnV9",
    blur: "connBlurV9",
  };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <linearGradient id={ids.grad} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(158,243,21,0.22)" />
            <stop offset="0.5" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="1" stopColor="rgba(124,58,237,0.22)" />
          </linearGradient>
          <filter id={ids.blur}>
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        <path
          d={`M ${points[0].x} ${points[0].y}
              L ${points[1].x} ${points[1].y}
              L ${points[2].x} ${points[2].y}
              L ${points[5].x} ${points[5].y}
              L ${points[4].x} ${points[4].y}
              L ${points[3].x} ${points[3].y}`}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="0.6"
        />

        <path
          d={`M ${points[0].x} ${points[0].y}
              L ${points[1].x} ${points[1].y}
              L ${points[2].x} ${points[2].y}
              L ${points[5].x} ${points[5].y}
              L ${points[4].x} ${points[4].y}
              L ${points[3].x} ${points[3].y}`}
          fill="none"
          stroke={`url(#${ids.grad})`}
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeDasharray={`${t * 260} 260`}
          filter={`url(#${ids.blur})`}
          opacity="0.55"
        />

        {points.map((p, i) => {
          const isActive = i === activeIndex;
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="1.5" fill="rgba(255,255,255,0.22)" />
              {isActive && (
                <>
                  <circle cx={p.x} cy={p.y} r="3.2" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
                  <circle cx={p.x} cy={p.y} r="3.9" fill="none" stroke="rgba(158,243,21,0.26)" strokeWidth="0.6" />
                  <circle cx={p.x} cy={p.y} r="4.6" fill="none" stroke="rgba(124,58,237,0.26)" strokeWidth="0.6" />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function PipelineGridStageCardV9({
  stage,
  active,
  onClick,
  filter,
}: {
  stage: PipelineGridStageV9;
  active: boolean;
  onClick: () => void;
  filter: PipelineGridFilterV9;
}) {
  const reduceMotion = useReducedMotion();
  const tone: PipelineToneV9 = filter === "xr" ? "xr" : filter === "games" ? "games" : "dual";

  const topAccent =
    tone === "xr"
      ? "linear-gradient(90deg, rgba(158,243,21,0.0), rgba(158,243,21,0.45), rgba(158,243,21,0.0))"
      : tone === "games"
        ? "linear-gradient(90deg, rgba(124,58,237,0.0), rgba(124,58,237,0.45), rgba(124,58,237,0.0))"
        : "linear-gradient(90deg, rgba(158,243,21,0.0), rgba(255,255,255,0.26), rgba(124,58,237,0.0))";

  return (
    <motion.button
      onClick={onClick}
      className={cx(
        "group relative text-left rounded-[22px] p-5",
        "bg-white/[0.05] ring-1 ring-white/10 backdrop-blur",
        "transition hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      )}
      initial={false}
      animate={reduceMotion ? {} : { y: active ? -2 : 0 }}
      transition={{ duration: 0.18 }}
    >
      <span aria-hidden className="pointer-events-none absolute left-5 right-5 top-3 h-px opacity-70" style={{ background: topAccent }} />

      <span
        aria-hidden
        className={cx(
          "pointer-events-none absolute -inset-3 rounded-[26px] opacity-0 blur-2xl transition-opacity duration-200",
          "group-hover:opacity-100"
        )}
        style={{
          background:
            tone === "xr"
              ? "radial-gradient(60% 70% at 25% 30%, rgba(158,243,21,0.16), transparent 62%)"
              : tone === "games"
                ? "radial-gradient(60% 70% at 75% 70%, rgba(124,58,237,0.18), transparent 62%)"
                : "radial-gradient(60% 70% at 25% 30%, rgba(158,243,21,0.12), transparent 62%), radial-gradient(60% 70% at 75% 70%, rgba(124,58,237,0.12), transparent 62%)",
        }}
      />

      <span
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-0 rounded-[22px] opacity-0 ring-1 transition-opacity duration-200",
          active && "opacity-100"
        )}
        style={{
          boxShadow: active ? "inset 0 0 0 1px rgba(255,255,255,0.18), 0 0 0 1px rgba(0,0,0,0)" : undefined,
        }}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="text-xs text-white/55">{stage.num}</div>
          <div className="h-px w-10 bg-white/10" />
        </div>

        <div className="mt-3 text-[15px] font-semibold tracking-[-0.01em] text-white">{stage.title}</div>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{stage.subtitle[filter]}</p>
      </div>
    </motion.button>
  );
}

function PipelineGridStageFocusPanelV9({ stage, filter }: { stage: PipelineGridStageV9; filter: PipelineGridFilterV9 }) {
  const reduceMotion = useReducedMotion();
  const f = stage.focus[filter];

  const headerTone = filter === "xr" ? "xr" : filter === "games" ? "games" : "neutral";
  const titleGrad =
    filter === "xr"
      ? "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.92))"
      : filter === "games"
        ? "linear-gradient(90deg, rgba(255,255,255,0.92), rgba(124,58,237,0.95))"
        : "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.82))";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${stage.id}-${filter}`}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.18 }}
        className="mt-6 rounded-[22px] bg-white/[0.05] p-5 ring-1 ring-white/10"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <PipelineGridChipV9 tone={headerTone}>Stage focus</PipelineGridChipV9>
            <div
              className="text-sm font-semibold tracking-[-0.01em] bg-clip-text text-transparent"
              style={{ WebkitTextFillColor: "transparent", backgroundImage: titleGrad }}
            >
              {stage.title}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <PipelineGridChipV9>Definition of done</PipelineGridChipV9>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Inputs</div>
            <ul className="mt-3 space-y-2">
              {f.inputs.map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Outputs</div>
            <ul className="mt-3 space-y-2">
              {f.outputs.map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">DoD</div>
            <div className="mt-3 text-sm leading-relaxed text-white/80">{f.dod}</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function SharedPipelineGridSignatureV9() {
  const [filter, setFilter] = useState<PipelineGridFilterV9>("all");
  const [activeId, setActiveId] = useState<PipelineGridStageIdV9>("prototype");

  const activeIndex = useMemo(() => PIPELINE_GRID_STAGES_V9.findIndex((s) => s.id === activeId), [activeId]);
  const activeStage = useMemo(() => PIPELINE_GRID_STAGES_V9[Math.max(0, activeIndex)] ?? PIPELINE_GRID_STAGES_V9[0], [activeIndex]);

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <PipelineGridChipV9>Pipeline</PipelineGridChipV9>
            <PipelineGridChipV9>One production system</PipelineGridChipV9>
          </div>
          <PipelineGridSignatureCTA_V9 href="/contact" />
        </div>

        <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
          A shared delivery pipeline —{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              WebkitTextFillColor: "transparent",
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.92), rgba(158,243,21,0.90), rgba(124,58,237,0.90))",
            }}
          >
            consistent
          </span>{" "}
          outcomes across both studios.
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <PipelineGridChipV9>Procurement-friendly</PipelineGridChipV9>
            <PipelineGridChipV9>Stage gates</PipelineGridChipV9>
            <PipelineGridChipV9>Weekly demos</PipelineGridChipV9>
          </div>

          <div className="flex items-center gap-2">
            <PipelineGridFilterPillV9 active={filter === "all"} onClick={() => setFilter("all")} tone="all">
              All
            </PipelineGridFilterPillV9>
            <PipelineGridFilterPillV9 active={filter === "xr"} onClick={() => setFilter("xr")} tone="xr">
              XR
            </PipelineGridFilterPillV9>
            <PipelineGridFilterPillV9 active={filter === "games"} onClick={() => setFilter("games")} tone="games">
              Games
            </PipelineGridFilterPillV9>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="relative overflow-hidden rounded-[28px] bg-white/[0.04] ring-1 ring-white/10">
          <PipelineGridBackgroundPolishV9 />

          <div className="relative p-5 sm:p-6">
            <div className="relative">
              <PipelineGridConnectorsV9 activeIndex={Math.max(0, activeIndex)} />

              <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3">
                {PIPELINE_GRID_STAGES_V9.map((s) => (
                  <PipelineGridStageCardV9
                    key={s.id}
                    stage={s}
                    active={s.id === activeId}
                    onClick={() => setActiveId(s.id)}
                    filter={filter}
                  />
                ))}
              </div>
            </div>

            <PipelineGridStageFocusPanelV9 stage={activeStage} filter={filter} />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[20px] bg-white/[0.05] p-4 ring-1 ring-white/10">
              <div className="flex flex-wrap gap-2">
                <PipelineGridChipV9>Weekly demos</PipelineGridChipV9>
                <PipelineGridChipV9>QA gates</PipelineGridChipV9>
                <PipelineGridChipV9>Perf budgets</PipelineGridChipV9>
                <PipelineGridChipV9>Source + docs handover</PipelineGridChipV9>
              </div>
              <div className="text-xs text-white/60">
                Active stage: <span className="text-white/80">{activeStage.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Services Portal — Color Distribution Like Screenshot (V10)
 * Namespaced to avoid collisions with other sections in this file.
 */
type PortalToneV10 = "xr" | "games" | "art" | "creative";

const TOKENS_V10 = {
  ...TOKENS,
  art: "#22D3EE",
  creative: "#F59E0B",
};

function PortalToneTitleGradientV10(tone: PortalToneV10) {
  if (tone === "xr") return "linear-gradient(90deg, rgba(158,243,21,0.98), rgba(255,255,255,0.92))";
  if (tone === "games") return "linear-gradient(90deg, rgba(255,255,255,0.92), rgba(124,58,237,0.98))";
  if (tone === "art") return "linear-gradient(90deg, rgba(34,211,238,0.98), rgba(255,255,255,0.90))";
  return "linear-gradient(90deg, rgba(255,255,255,0.92), rgba(245,158,11,0.98))";
}

function PortalCardAtmosphereV10({ tone }: { tone: PortalToneV10 }) {
  const reduceMotion = useReducedMotion();

  const wash =
    tone === "xr"
      ? {
          a: "radial-gradient(900px 520px at 18% 22%, rgba(158,243,21,0.16), transparent 60%)",
          b: "radial-gradient(800px 520px at 78% 75%, rgba(158,243,21,0.08), transparent 60%)",
        }
      : tone === "games"
        ? {
            a: "radial-gradient(900px 560px at 20% 70%, rgba(124,58,237,0.18), transparent 62%)",
            b: "radial-gradient(800px 520px at 78% 25%, rgba(124,58,237,0.08), transparent 60%)",
          }
        : tone === "art"
          ? {
              a: "radial-gradient(900px 560px at 18% 28%, rgba(34,211,238,0.14), transparent 62%)",
              b: "radial-gradient(800px 520px at 80% 78%, rgba(34,211,238,0.07), transparent 60%)",
            }
          : {
              a: "radial-gradient(900px 560px at 20% 25%, rgba(245,158,11,0.12), transparent 62%)",
              b: "radial-gradient(800px 520px at 78% 78%, rgba(124,58,237,0.07), transparent 60%)",
            };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={reduceMotion ? { opacity: 1 } : { backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={reduceMotion ? {} : { duration: 16, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
        style={{
          backgroundImage: `${wash.a}, ${wash.b}`,
          backgroundSize: "180% 180%",
          filter: "blur(10px)",
          opacity: 0.95,
        }}
      />

      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:26px_26px]" />

      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_50%_10%,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_50%_120%,rgba(0,0,0,0.75),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.20),transparent_35%,rgba(0,0,0,0.35))]" />
    </div>
  );
}

function PortalPillV10({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/75 ring-1 ring-white/12 backdrop-blur">
      {children}
    </span>
  );
}

function PortalViewMoreV10({ href = "#" }: { href?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.a
      href={href}
      className="group inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-white/80 ring-1 ring-white/12 backdrop-blur hover:bg-white/[0.10] hover:text-white transition"
      whileHover={reduceMotion ? {} : { y: -1 }}
      transition={{ duration: 0.18 }}
    >
      View more
      <motion.span
        aria-hidden
        initial={false}
        animate={{ x: 0 }}
        whileHover={reduceMotion ? {} : { x: 2 }}
        transition={{ duration: 0.18 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

function PortalCardV10({
  tone,
  label,
  title,
  desc,
  pills,
  href,
}: {
  tone: PortalToneV10;
  label: string;
  title: string;
  desc: string;
  pills: string[];
  href?: string;
}) {
  const reduceMotion = useReducedMotion();

  const dot =
    tone === "xr"
      ? TOKENS_V10.xr
      : tone === "games"
        ? TOKENS_V10.games
        : tone === "art"
          ? TOKENS_V10.art
          : TOKENS_V10.creative;

  const titleGrad = PortalToneTitleGradientV10(tone);

  return (
    <motion.div
      className={cx(
        "relative overflow-hidden rounded-[32px] p-8 sm:p-10",
        "bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-xl",
        "shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
      )}
      whileHover={reduceMotion ? {} : { y: -3 }}
      transition={{ duration: 0.22 }}
    >
      <PortalCardAtmosphereV10 tone={tone} />

      <div className="relative z-10 flex h-full min-h-[360px] flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
            <div className="text-xs font-semibold tracking-[0.18em] text-white/65">{label}</div>
          </div>
          <PortalViewMoreV10 href={href} />
        </div>

        <div className="mt-14">
          <div
            className="whitespace-pre-line text-5xl font-semibold tracking-[-0.04em] sm:text-6xl"
            style={{
              backgroundImage: titleGrad,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>

          <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-white/70">{desc}</p>
        </div>

        <div className="mt-auto pt-10">
          <div className="flex flex-wrap gap-2">
            {pills.map((p) => (
              <PortalPillV10 key={p}>{p}</PortalPillV10>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesPortal_ColorDistributionLikeScreenshot_V10() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PortalCardV10
          tone="xr"
          label="XR"
          title="XR Studio"
          desc="Training, simulation, and spatial product storytelling — engineered for deployment, device ops, and real outcomes."
          pills={["Production-first", "QA gates", "Weekly demos"]}
          href="/services/xr"
        />
        <PortalCardV10
          tone="games"
          label="GAMES"
          title={"Games\nStudio"}
          desc="Studio-grade pipelines from prototype to production — co-dev squads, performance passes, and live content velocity."
          pills={["Production-first", "QA gates", "Weekly demos"]}
          href="/services/games"
        />
      </div>
    </section>
  );
}

/**
 * WODH v1 — Shared Pipeline (Grid Style) — Color Distribution FIX (V11)
 * - Left-side XR green atmosphere + right-side Games purple atmosphere
 * - Filter controls wash intensity (All balanced / XR green bias / Games purple bias)
 * - Subtle per-card internal wash (never hides readability)
 * - Connector tint follows the wash
 */
type PipelineGridFilterV11 = "all" | "xr" | "games";
type PipelineGridToneV11 = "xr" | "games" | "dual";
type PipelineGridStageV11 = (typeof PIPELINE_GRID_STAGES_V9)[number];

function PipelineGridChipV11({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "xr" | "games";
}) {
  const ring =
    tone === "xr"
      ? "ring-[rgba(158,243,21,0.22)] text-[rgba(221,255,180,0.92)]"
      : tone === "games"
        ? "ring-[rgba(124,58,237,0.22)] text-[rgba(228,220,255,0.92)]"
        : "ring-white/14 text-white/80";

  return (
    <span className={cx("inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs ring-1 backdrop-blur", ring)}>
      {children}
    </span>
  );
}

function PipelineGridFilterPillV11({
  active,
  children,
  onClick,
  tone,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  tone: PipelineGridFilterV11;
}) {
  const on =
    tone === "xr"
      ? "bg-[rgba(158,243,21,0.12)] ring-[rgba(158,243,21,0.32)] text-white"
      : tone === "games"
        ? "bg-[rgba(124,58,237,0.14)] ring-[rgba(124,58,237,0.35)] text-white"
        : "bg-white/12 ring-white/22 text-white";

  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full px-3 py-1.5 text-xs ring-1 backdrop-blur transition",
        active ? on : "bg-white/6 text-white/70 ring-white/14 hover:bg-white/10 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

function PipelineGridSignatureCTA_V11({ href = "/contact" }: { href?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.a
      href={href}
      className={cx(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white",
        "bg-white/[0.06] ring-1 ring-white/14 backdrop-blur",
        "hover:bg-white/[0.10] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      )}
      whileHover={reduceMotion ? {} : { y: -1 }}
      transition={{ duration: 0.18 }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-full opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 70% at 30% 30%, rgba(158,243,21,0.16), transparent 60%), radial-gradient(60% 70% at 70% 70%, rgba(124,58,237,0.18), transparent 60%)",
        }}
      />
      <span className="relative">Start a project</span>
      <motion.span
        aria-hidden
        className="relative"
        initial={false}
        animate={{ x: 0 }}
        whileHover={reduceMotion ? {} : { x: 2 }}
        transition={{ duration: 0.18 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

function PipelineGridBackgroundPolishV11({ filter }: { filter: PipelineGridFilterV11 }) {
  const xrA = filter === "xr" ? 0.18 : filter === "games" ? 0.08 : 0.14;
  const xrB = filter === "xr" ? 0.10 : filter === "games" ? 0.06 : 0.08;
  const gA = filter === "games" ? 0.20 : filter === "xr" ? 0.08 : 0.16;
  const gB = filter === "games" ? 0.10 : filter === "xr" ? 0.06 : 0.08;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(255,255,255,0.08),transparent_60%)]" />

      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(900px 620px at 18% 25%, rgba(158,243,21,${xrA}), transparent 62%),
                       radial-gradient(800px 520px at 26% 75%, rgba(158,243,21,${xrB}), transparent 64%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(900px 640px at 82% 30%, rgba(124,58,237,${gA}), transparent 62%),
                       radial-gradient(800px 520px at 74% 82%, rgba(124,58,237,${gB}), transparent 64%)`,
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(1000px_800px_at_50%_120%,rgba(0,0,0,0.78),transparent_58%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),transparent_40%,rgba(0,0,0,0.38))]" />

      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:26px_26px]" />
    </div>
  );
}

function PipelineGridConnectorsV11({ activeIndex, filter }: { activeIndex: number; filter: PipelineGridFilterV11 }) {
  const points = useMemo(
    () => [
      { x: 16.5, y: 28 },
      { x: 50.0, y: 28 },
      { x: 83.5, y: 28 },
      { x: 16.5, y: 74 },
      { x: 50.0, y: 74 },
      { x: 83.5, y: 74 },
    ],
    []
  );

  const t = points.length <= 1 ? 0 : activeIndex / (points.length - 1);

  const leftStop = filter === "games" ? "rgba(255,255,255,0.10)" : "rgba(158,243,21,0.22)";
  const rightStop = filter === "xr" ? "rgba(255,255,255,0.10)" : "rgba(124,58,237,0.22)";

  const ids = { grad: "wodhConnV11", blur: "connBlurV11" };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <linearGradient id={ids.grad} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={leftStop} />
            <stop offset="0.5" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="1" stopColor={rightStop} />
          </linearGradient>
          <filter id={ids.blur}>
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        <path
          d={`M ${points[0].x} ${points[0].y}
              L ${points[1].x} ${points[1].y}
              L ${points[2].x} ${points[2].y}
              L ${points[5].x} ${points[5].y}
              L ${points[4].x} ${points[4].y}
              L ${points[3].x} ${points[3].y}`}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="0.6"
        />

        <path
          d={`M ${points[0].x} ${points[0].y}
              L ${points[1].x} ${points[1].y}
              L ${points[2].x} ${points[2].y}
              L ${points[5].x} ${points[5].y}
              L ${points[4].x} ${points[4].y}
              L ${points[3].x} ${points[3].y}`}
          fill="none"
          stroke={`url(#${ids.grad})`}
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeDasharray={`${t * 260} 260`}
          filter={`url(#${ids.blur})`}
          opacity="0.55"
        />

        {points.map((p, i) => {
          const isActive = i === activeIndex;
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="1.5" fill="rgba(255,255,255,0.22)" />
              {isActive && (
                <>
                  <circle cx={p.x} cy={p.y} r="3.2" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
                  <circle cx={p.x} cy={p.y} r="3.9" fill="none" stroke="rgba(158,243,21,0.24)" strokeWidth="0.6" />
                  <circle cx={p.x} cy={p.y} r="4.6" fill="none" stroke="rgba(124,58,237,0.24)" strokeWidth="0.6" />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function PipelineGridCardWashV11({ tone }: { tone: PipelineGridToneV11 }) {
  const xr = tone === "xr" ? 0.12 : tone === "dual" ? 0.08 : 0.04;
  const g = tone === "games" ? 0.14 : tone === "dual" ? 0.08 : 0.04;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[22px] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(420px 260px at 18% 22%, rgba(158,243,21,${xr}), transparent 62%),
                       radial-gradient(420px 260px at 82% 78%, rgba(124,58,237,${g}), transparent 62%)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.10),transparent_40%,rgba(0,0,0,0.18))]" />
    </div>
  );
}

function PipelineGridStageCardV11({
  stage,
  active,
  onClick,
  filter,
}: {
  stage: PipelineGridStageV11;
  active: boolean;
  onClick: () => void;
  filter: PipelineGridFilterV11;
}) {
  const reduceMotion = useReducedMotion();
  const tone: PipelineGridToneV11 = filter === "xr" ? "xr" : filter === "games" ? "games" : "dual";

  const topAccent =
    tone === "xr"
      ? "linear-gradient(90deg, rgba(158,243,21,0.0), rgba(158,243,21,0.45), rgba(158,243,21,0.0))"
      : tone === "games"
        ? "linear-gradient(90deg, rgba(124,58,237,0.0), rgba(124,58,237,0.45), rgba(124,58,237,0.0))"
        : "linear-gradient(90deg, rgba(158,243,21,0.0), rgba(255,255,255,0.22), rgba(124,58,237,0.0))";

  return (
    <motion.button
      onClick={onClick}
      className={cx(
        "group relative text-left rounded-[22px] p-5",
        "bg-white/[0.05] ring-1 ring-white/10 backdrop-blur",
        "transition hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      )}
      initial={false}
      animate={reduceMotion ? {} : { y: active ? -2 : 0 }}
      transition={{ duration: 0.18 }}
    >
      <PipelineGridCardWashV11 tone={tone} />

      <span aria-hidden className="pointer-events-none absolute left-5 right-5 top-3 h-px opacity-70" style={{ background: topAccent }} />

      <span
        aria-hidden
        className={cx(
          "pointer-events-none absolute -inset-3 rounded-[26px] opacity-0 blur-2xl transition-opacity duration-200",
          "group-hover:opacity-100"
        )}
        style={{
          background:
            tone === "xr"
              ? "radial-gradient(60% 70% at 25% 30%, rgba(158,243,21,0.14), transparent 62%)"
              : tone === "games"
                ? "radial-gradient(60% 70% at 75% 70%, rgba(124,58,237,0.16), transparent 62%)"
                : "radial-gradient(60% 70% at 25% 30%, rgba(158,243,21,0.10), transparent 62%), radial-gradient(60% 70% at 75% 70%, rgba(124,58,237,0.10), transparent 62%)",
        }}
      />

      <span
        aria-hidden
        className={cx("pointer-events-none absolute inset-0 rounded-[22px] opacity-0 ring-1 transition-opacity duration-200", active && "opacity-100")}
        style={{
          boxShadow: active ? "inset 0 0 0 1px rgba(255,255,255,0.18)" : undefined,
        }}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="text-xs text-white/55">{stage.num}</div>
          <div className="h-px w-10 bg-white/10" />
        </div>

        <div className="mt-3 text-[15px] font-semibold tracking-[-0.01em] text-white">{stage.title}</div>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{stage.subtitle[filter]}</p>
      </div>
    </motion.button>
  );
}

function PipelineGridStageFocusPanelV11({ stage, filter }: { stage: PipelineGridStageV11; filter: PipelineGridFilterV11 }) {
  const reduceMotion = useReducedMotion();
  const f = stage.focus[filter];

  const headerTone = filter === "xr" ? "xr" : filter === "games" ? "games" : "neutral";
  const titleGrad =
    filter === "xr"
      ? "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.92))"
      : filter === "games"
        ? "linear-gradient(90deg, rgba(255,255,255,0.92), rgba(124,58,237,0.95))"
        : "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.82))";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${stage.id}-${filter}`}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.18 }}
        className="mt-6 rounded-[22px] bg-white/[0.05] p-5 ring-1 ring-white/10"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <PipelineGridChipV11 tone={headerTone}>Stage focus</PipelineGridChipV11>
            <div
              className="text-sm font-semibold tracking-[-0.01em] bg-clip-text text-transparent"
              style={{ WebkitTextFillColor: "transparent", backgroundImage: titleGrad }}
            >
              {stage.title}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <PipelineGridChipV11>Definition of done</PipelineGridChipV11>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Inputs</div>
            <ul className="mt-3 space-y-2">
              {f.inputs.map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Outputs</div>
            <ul className="mt-3 space-y-2">
              {f.outputs.map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">DoD</div>
            <div className="mt-3 text-sm leading-relaxed text-white/80">{f.dod}</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function SharedPipelineGrid_ColorDistributionFix_V11() {
  const [filter, setFilter] = useState<PipelineGridFilterV11>("all");
  const [activeId, setActiveId] = useState<(typeof PIPELINE_GRID_STAGES_V9)[number]["id"]>("prototype");

  const activeIndex = useMemo(() => PIPELINE_GRID_STAGES_V9.findIndex((s) => s.id === activeId), [activeId]);
  const activeStage = useMemo(() => PIPELINE_GRID_STAGES_V9[Math.max(0, activeIndex)] ?? PIPELINE_GRID_STAGES_V9[0], [activeIndex]);

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <PipelineGridChipV11>Pipeline</PipelineGridChipV11>
            <PipelineGridChipV11>Color distribution fix</PipelineGridChipV11>
          </div>
          <PipelineGridSignatureCTA_V11 href="/contact" />
        </div>

        <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
          Grid pipeline with anchored XR + Games atmosphere — tuned per filter.
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <PipelineGridChipV11>Procurement-friendly</PipelineGridChipV11>
            <PipelineGridChipV11>Stage gates</PipelineGridChipV11>
            <PipelineGridChipV11>Weekly demos</PipelineGridChipV11>
          </div>

          <div className="flex items-center gap-2">
            <PipelineGridFilterPillV11 active={filter === "all"} onClick={() => setFilter("all")} tone="all">
              All
            </PipelineGridFilterPillV11>
            <PipelineGridFilterPillV11 active={filter === "xr"} onClick={() => setFilter("xr")} tone="xr">
              XR
            </PipelineGridFilterPillV11>
            <PipelineGridFilterPillV11 active={filter === "games"} onClick={() => setFilter("games")} tone="games">
              Games
            </PipelineGridFilterPillV11>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="relative overflow-hidden rounded-[28px] bg-white/[0.04] ring-1 ring-white/10">
          <PipelineGridBackgroundPolishV11 filter={filter} />

          <div className="relative p-5 sm:p-6">
            <div className="relative">
              <PipelineGridConnectorsV11 activeIndex={Math.max(0, activeIndex)} filter={filter} />

              <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3">
                {PIPELINE_GRID_STAGES_V9.map((s) => (
                  <PipelineGridStageCardV11
                    key={s.id}
                    stage={s}
                    active={s.id === activeId}
                    onClick={() => setActiveId(s.id)}
                    filter={filter}
                  />
                ))}
              </div>
            </div>

            <PipelineGridStageFocusPanelV11 stage={activeStage} filter={filter} />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[20px] bg-white/[0.05] p-4 ring-1 ring-white/10">
              <div className="flex flex-wrap gap-2">
                <PipelineGridChipV11>Weekly demos</PipelineGridChipV11>
                <PipelineGridChipV11>QA gates</PipelineGridChipV11>
                <PipelineGridChipV11>Perf budgets</PipelineGridChipV11>
                <PipelineGridChipV11>Source + docs handover</PipelineGridChipV11>
              </div>
              <div className="text-xs text-white/60">
                Active stage: <span className="text-white/80">{activeStage.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * WODH v1 — Proof Grid (3 Ideas) (V12)
 * Namespaced to avoid collisions with other sections in this file.
 */
type ProofStudioV12 = "XR" | "Games" | "3D" | "Creative";
type ProofKindV12 = "Case Study" | "Prototype" | "Production" | "R&D";
type ProofPlatformV12 = "Meta Quest" | "iOS" | "Android" | "Web" | "PC" | "PS5" | "Unity" | "Unreal";

type ProofItemV12 = {
  id: string;
  title: string;
  studio: ProofStudioV12;
  kind: ProofKindV12;
  outcomes: string[];
  tags: string[];
  platforms: ProofPlatformV12[];
  tone: "xr" | "games" | "neutral";
  kpi?: { label: string; value: string };
};

type ProofOutcomeToggleV12 = "Speed" | "Quality" | "Performance" | "Deployment" | "Engagement";

const PROOF_V12: ProofItemV12[] = [
  {
    id: "p1",
    title: "Safety Training Suite (Quest)",
    studio: "XR",
    kind: "Production",
    outcomes: ["Faster onboarding", "Higher retention", "Device-ready rollout"],
    tags: ["Comfort pass", "Device ops", "Analytics"],
    platforms: ["Meta Quest", "Unity", "Web"],
    tone: "xr",
    kpi: { label: "Training time", value: "-32%" },
  },
  {
    id: "p2",
    title: "Simulation Prototype (Digital Twin)",
    studio: "XR",
    kind: "Prototype",
    outcomes: ["Risk reduction", "Fewer incidents", "Team alignment"],
    tags: ["Digital twin", "Rapid prototyping", "UX"],
    platforms: ["PC", "Unity", "Web"],
    tone: "xr",
    kpi: { label: "Prototype cycle", value: "2 wks" },
  },
  {
    id: "p3",
    title: "Co-dev Shooter Module",
    studio: "Games",
    kind: "Production",
    outcomes: ["Stable 60 FPS", "Content velocity", "Clean handoff"],
    tags: ["Perf pass", "Netcode", "Tooling"],
    platforms: ["PC", "Unreal", "PS5"],
    tone: "games",
    kpi: { label: "Frame stability", value: "60 FPS" },
  },
  {
    id: "p4",
    title: "Live Ops Content Pipeline",
    studio: "Games",
    kind: "Production",
    outcomes: ["Faster drops", "Fewer regressions", "Better QA cadence"],
    tags: ["Build pipeline", "QA gates", "CI/CD"],
    platforms: ["PC", "Unity", "Web"],
    tone: "games",
    kpi: { label: "Release cadence", value: "Weekly" },
  },
  {
    id: "p5",
    title: "Stylized Character Pack",
    studio: "3D",
    kind: "Production",
    outcomes: ["Consistent style", "Optimized assets", "Rig-ready delivery"],
    tags: ["Rigging", "LOD", "PBR"],
    platforms: ["Unity", "Unreal", "PC"],
    tone: "neutral",
    kpi: { label: "Asset budget", value: "Optimized" },
  },
  {
    id: "p6",
    title: "Product Story Trailer (CG)",
    studio: "Creative",
    kind: "Case Study",
    outcomes: ["Higher engagement", "Clear messaging", "Brand lift"],
    tags: ["Motion", "Edit", "Sound"],
    platforms: ["Web", "iOS", "Android"],
    tone: "neutral",
    kpi: { label: "Engagement", value: "+41%" },
  },
  {
    id: "p7",
    title: "Mixed Reality Demo",
    studio: "XR",
    kind: "R&D",
    outcomes: ["Interaction proof", "Stakeholder buy-in", "Clear next steps"],
    tags: ["MR", "Occlusion", "Hand tracking"],
    platforms: ["Meta Quest", "Unity"],
    tone: "xr",
    kpi: { label: "Stakeholder signoff", value: "Fast" },
  },
  {
    id: "p8",
    title: "UI/UX Systems Kit",
    studio: "Creative",
    kind: "Production",
    outcomes: ["Faster iteration", "Consistency", "Handoff clarity"],
    tags: ["Design system", "Tokens", "Specs"],
    platforms: ["Web", "iOS"],
    tone: "neutral",
    kpi: { label: "Design throughput", value: "+2x" },
  },
];

function ProofSectionShellV12({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-14">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-balance text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white">{title}</h2>
            <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-white/70">{subtitle}</p>
          </div>
          {right}
        </div>
      </div>

      <div className="mt-8">{children}</div>
    </section>
  );
}

function ProofChipV12({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "xr" | "games";
}) {
  const ring =
    tone === "xr"
      ? "ring-[rgba(158,243,21,0.22)] text-[rgba(221,255,180,0.92)]"
      : tone === "games"
        ? "ring-[rgba(124,58,237,0.22)] text-[rgba(228,220,255,0.92)]"
        : "ring-white/14 text-white/80";

  return (
    <span className={cx("inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs ring-1 backdrop-blur", ring)}>
      {children}
    </span>
  );
}

function ProofPillButtonV12({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full px-3 py-1.5 text-xs ring-1 backdrop-blur transition",
        active ? "bg-white/12 ring-white/22 text-white" : "bg-white/6 text-white/70 ring-white/14 hover:bg-white/10 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

function ProofControlledBloomV12({ tone, className }: { tone: ProofItemV12["tone"]; className?: string }) {
  const bg =
    tone === "xr"
      ? "radial-gradient(60% 70% at 25% 30%, rgba(158,243,21,0.16), transparent 62%), radial-gradient(60% 70% at 75% 75%, rgba(255,255,255,0.08), transparent 65%)"
      : tone === "games"
        ? "radial-gradient(60% 70% at 75% 30%, rgba(124,58,237,0.18), transparent 62%), radial-gradient(60% 70% at 25% 75%, rgba(255,255,255,0.08), transparent 65%)"
        : "radial-gradient(60% 70% at 30% 35%, rgba(255,255,255,0.10), transparent 62%), radial-gradient(60% 70% at 70% 70%, rgba(255,255,255,0.06), transparent 65%)";

  return (
    <span
      aria-hidden
      className={cx(
        "pointer-events-none absolute -inset-4 rounded-[26px] opacity-0 blur-2xl transition-opacity duration-200 group-hover:opacity-100",
        className
      )}
      style={{ background: bg }}
    />
  );
}

function ProofCardV12({
  item,
  variant = "standard",
  expanded,
  onToggle,
}: {
  item: ProofItemV12;
  variant?: "standard" | "kpi";
  expanded?: boolean;
  onToggle?: () => void;
}) {
  const reduceMotion = useReducedMotion();

  const badgeTone = item.tone === "xr" ? "xr" : item.tone === "games" ? "games" : "neutral";
  const topAccent =
    item.tone === "xr"
      ? "linear-gradient(90deg, rgba(158,243,21,0.0), rgba(158,243,21,0.45), rgba(158,243,21,0.0))"
      : item.tone === "games"
        ? "linear-gradient(90deg, rgba(124,58,237,0.0), rgba(124,58,237,0.45), rgba(124,58,237,0.0))"
        : "linear-gradient(90deg, rgba(255,255,255,0.0), rgba(255,255,255,0.25), rgba(255,255,255,0.0))";

  return (
    <motion.button
      onClick={onToggle}
      className={cx(
        "group relative w-full text-left rounded-[22px] p-5",
        "bg-white/[0.05] ring-1 ring-white/10 backdrop-blur",
        "transition hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      )}
      whileHover={reduceMotion ? {} : { y: -2 }}
      transition={{ duration: 0.18 }}
    >
      <ProofControlledBloomV12 tone={item.tone} />

      <span aria-hidden className="pointer-events-none absolute left-5 right-5 top-3 h-px opacity-70" style={{ background: topAccent }} />

      <div className="relative mb-4 h-[120px] overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/10">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              item.tone === "xr"
                ? "radial-gradient(900px 360px at 10% 25%, rgba(158,243,21,0.18), transparent 55%), radial-gradient(700px 360px at 90% 80%, rgba(255,255,255,0.06), transparent 60%)"
                : item.tone === "games"
                  ? "radial-gradient(900px 360px at 90% 25%, rgba(124,58,237,0.20), transparent 55%), radial-gradient(700px 360px at 10% 80%, rgba(255,255,255,0.06), transparent 60%)"
                  : "radial-gradient(900px 360px at 30% 20%, rgba(255,255,255,0.12), transparent 55%), radial-gradient(700px 360px at 80% 90%, rgba(255,255,255,0.06), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:26px_26px]" />
      </div>

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <ProofChipV12 tone={badgeTone}>{item.studio}</ProofChipV12>
          <ProofChipV12>{item.kind}</ProofChipV12>
        </div>
        <div className="text-xs text-white/55">{item.platforms.slice(0, 2).join(" • ")}</div>
      </div>

      {variant === "kpi" && item.kpi ? (
        <div className="relative mt-4">
          <div className="text-4xl font-semibold tracking-[-0.04em] text-white">{item.kpi.value}</div>
          <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/55">{item.kpi.label}</div>
          <div className="mt-3 text-sm font-semibold tracking-[-0.02em] text-white">{item.title}</div>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{item.outcomes[0]}</p>
        </div>
      ) : (
        <div className="relative mt-4">
          <div className="text-base font-semibold tracking-[-0.02em] text-white">{item.title}</div>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{item.outcomes.join(" • ")}</p>
        </div>
      )}

      <div className="relative mt-4 flex flex-wrap gap-2">
        {item.tags.slice(0, 3).map((t) => (
          <span key={t} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
            {t}
          </span>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {!!expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 14 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.18 }}
            className="relative overflow-hidden rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">How we did it</div>
            <ul className="mt-3 space-y-2">
              {item.tags.map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.platforms.map((p) => (
                <ProofChipV12 key={p}>{p}</ProofChipV12>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mt-4 text-xs text-white/55">
        <span className="opacity-70">Click</span> {expanded ? "to collapse" : "to expand"}
      </div>
    </motion.button>
  );
}

function ProofGrid_Idea1_V12() {
  const [filter, setFilter] = useState<ProofStudioV12 | "All">("All");

  const items = useMemo(() => {
    if (filter === "All") return PROOF_V12;
    return PROOF_V12.filter((p) => p.studio === filter);
  }, [filter]);

  return (
    <ProofSectionShellV12
      title="Proof Grid — Idea 1: Filtered Proof Grid"
      subtitle="Selected work across XR, Games, 3D Art, and Creative Tech — filter by studio and scan outcomes fast."
      right={
        <div className="flex flex-wrap items-center gap-2">
          {(["All", "XR", "Games", "3D", "Creative"] as const).map((x) => (
            <ProofPillButtonV12 key={x} active={filter === x} onClick={() => setFilter(x)}>
              {x === "3D" ? "3D Art" : x}
            </ProofPillButtonV12>
          ))}
          <a
            href="/work"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm text-white/80 ring-1 ring-white/14 backdrop-blur hover:bg-white/[0.10] hover:text-white transition"
          >
            View all case studies <span aria-hidden>→</span>
          </a>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.slice(0, 9).map((item) => (
          <ProofCardV12 key={item.id} item={item} />
        ))}
      </div>
    </ProofSectionShellV12>
  );
}

function ProofMosaicTileV12({ item, size }: { item: ProofItemV12; size: "hero" | "md" | "sm" }) {
  const reduceMotion = useReducedMotion();
  const badgeTone = item.tone === "xr" ? "xr" : item.tone === "games" ? "games" : "neutral";

  const h = size === "hero" ? "min-h-[420px]" : size === "md" ? "min-h-[260px]" : "min-h-[200px]";
  const kpi = item.kpi?.value ?? (item.outcomes[0] ? item.outcomes[0].slice(0, 18) + "…" : "Proof");

  return (
    <motion.a
      href="/work"
      className={cx(
        "group relative overflow-hidden rounded-[26px] p-6",
        h,
        "bg-white/[0.05] ring-1 ring-white/10 backdrop-blur",
        "transition hover:bg-white/[0.07]"
      )}
      whileHover={reduceMotion ? {} : { y: -3 }}
      transition={{ duration: 0.18 }}
    >
      <ProofControlledBloomV12 tone={item.tone} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            item.tone === "xr"
              ? "radial-gradient(900px 520px at 18% 25%, rgba(158,243,21,0.16), transparent 60%), radial-gradient(800px 520px at 82% 75%, rgba(255,255,255,0.06), transparent 60%)"
              : item.tone === "games"
                ? "radial-gradient(900px 520px at 82% 25%, rgba(124,58,237,0.18), transparent 60%), radial-gradient(800px 520px at 18% 75%, rgba(255,255,255,0.06), transparent 60%)"
                : "radial-gradient(900px 520px at 30% 20%, rgba(255,255,255,0.12), transparent 60%), radial-gradient(800px 520px at 80% 85%, rgba(255,255,255,0.06), transparent 60%)",
          opacity: 0.95,
        }}
      />
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.20),transparent_45%,rgba(0,0,0,0.40))]" />

      <div className="relative flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ProofChipV12 tone={badgeTone}>{item.studio}</ProofChipV12>
          <ProofChipV12>{item.kind}</ProofChipV12>
        </div>
        <span className="text-xs text-white/60">View →</span>
      </div>

      <div className="relative mt-8">
        <div className={cx("font-semibold tracking-[-0.04em] text-white", size === "hero" ? "text-5xl" : size === "md" ? "text-3xl" : "text-2xl")}>
          {kpi}
        </div>
        <div className="mt-3 text-base font-semibold text-white">{item.title}</div>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{item.outcomes.slice(0, 2).join(" • ")}</p>
      </div>

      <div className="relative mt-auto pt-8 flex flex-wrap gap-2">
        {item.tags.slice(0, 3).map((t) => (
          <span key={t} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

function ProofGrid_Idea2_V12() {
  const items = PROOF_V12;

  return (
    <ProofSectionShellV12
      title="Proof Grid — Idea 2: Editorial Tetris Mosaic"
      subtitle="A cinematic mosaic grid: one hero proof tile, supporting tiles, and outcome-led scanning — premium without being messy."
      right={
        <div className="flex flex-wrap items-center gap-2">
          <ProofChipV12 tone="xr">XR accent</ProofChipV12>
          <ProofChipV12 tone="games">Games accent</ProofChipV12>
          <a
            href="/work"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm text-white/80 ring-1 ring-white/14 backdrop-blur hover:bg-white/[0.10] hover:text-white transition"
          >
            View all work <span aria-hidden>→</span>
          </a>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ProofMosaicTileV12 item={items[0]} size="hero" />
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          <ProofMosaicTileV12 item={items[2]} size="md" />
          <ProofMosaicTileV12 item={items[4]} size="md" />
        </div>

        <div className="lg:col-span-4">
          <ProofMosaicTileV12 item={items[6]} size="sm" />
        </div>
        <div className="lg:col-span-4">
          <ProofMosaicTileV12 item={items[3]} size="sm" />
        </div>
        <div className="lg:col-span-4">
          <ProofMosaicTileV12 item={items[5]} size="sm" />
        </div>
      </div>
    </ProofSectionShellV12>
  );
}

function ProofGrid_Idea3_V12() {
  const [toggle, setToggle] = useState<ProofOutcomeToggleV12>("Speed");
  const [openId, setOpenId] = useState<string | null>(PROOF_V12[0]?.id ?? null);

  const mapped = useMemo(() => {
    const order = [...PROOF_V12];
    if (toggle === "Performance") order.sort((a, b) => (a.studio === "Games" ? -1 : 1));
    if (toggle === "Deployment") order.sort((a, b) => (a.studio === "XR" ? -1 : 1));
    if (toggle === "Engagement") order.sort((a, b) => (a.studio === "Creative" ? -1 : 1));
    if (toggle === "Quality") order.sort((a, b) => (a.kind === "Production" ? -1 : 1));
    return order;
  }, [toggle]);

  return (
    <ProofSectionShellV12
      title="Proof Grid — Idea 3: KPI / Outcome-First Grid"
      subtitle="Procurement-friendly proof: big KPI, one-line ship statement, and expandable “how we did it” drawer."
      right={
        <div className="flex flex-wrap items-center gap-2">
          {(["Speed", "Quality", "Performance", "Deployment", "Engagement"] as const).map((t) => (
            <ProofPillButtonV12 key={t} active={toggle === t} onClick={() => setToggle(t)}>
              {t}
            </ProofPillButtonV12>
          ))}
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {mapped.slice(0, 9).map((item) => (
          <ProofCardV12
            key={item.id}
            item={item}
            variant="kpi"
            expanded={openId === item.id}
            onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
          />
        ))}
      </div>
    </ProofSectionShellV12>
  );
}

export function ProofGrid_AllIdeas_V12() {
  return (
    <div className="relative">
      <ProofGrid_Idea1_V12 />
      <ProofGrid_Idea2_V12 />
      <ProofGrid_Idea3_V12 />
    </div>
  );
}

export default function SplitPortalsPage() {
  return (
    <div className="min-h-screen w-full bg-[#0C0722] text-white">
      <div className="relative h-10 sm:h-14" />
      <ServicesHubEditorialIndex />
      <div className="mt-14 sm:mt-20" />
      <ServicesPortal2x2 />
      <div className="mt-14 sm:mt-20" />
      <ServicesPortal2x2OutsidePills />
      <div className="mt-14 sm:mt-20" />
      <ServicesPortal2x2OutcomesServicesHotspot />
      <div className="mt-14 sm:mt-20" />
      <ServicesPortal2x2UniformKeyServices />
      <div className="mt-14 sm:mt-20" />
      <div className="space-y-14 pb-6">
        <EngagementModelsIdea1_SelectorV5 />
        <EngagementModelsIdea2_ContractsV5 />
        <EngagementModelsIdea3_DeliveryLadderV5 />
      </div>
      <div className="mt-14 sm:mt-20" />
      <div className="space-y-14 pb-6">
        <SharedPipelineIdea1_TimelineV6 />
        <SharedPipelineIdea2_DualLaneGatesV6 />
        <SharedPipelineIdea3_QualityBoardV6 />
      </div>
      <div className="mt-14 sm:mt-20" />
      <SharedPipelineIdea1_TimelineRefinedV7 />
      <div className="mt-14 sm:mt-20" />
      <SharedPipelineIdea1_TimelineRefinedV2_V8 />
      <div className="mt-14 sm:mt-20" />
      <SharedPipelineGridSignatureV9 />
      <div className="mt-14 sm:mt-20" />
      <ServicesPortal_ColorDistributionLikeScreenshot_V10 />
      <div className="mt-14 sm:mt-20" />
      <SharedPipelineGrid_ColorDistributionFix_V11 />
      <div className="mt-14 sm:mt-20" />
      <ProofGrid_AllIdeas_V12 />
      <div className="h-16 sm:h-20" />
    </div>
  );
}

