"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type PillarKey = "XR" | "Games" | "3D" | "CreativeTech";

type PortalCard = {
  id: string;
  pillar: PillarKey;
  title: string;
  paragraph: string;
  href: string;
  services: string[];
};

const TOKENS = {
  xr: "#9EF315",
  games: "#7C3AED",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function pillarLabel(p: PillarKey) {
  if (p === "CreativeTech") return "Creative Tech";
  return p;
}

function pillarAccent(p: PillarKey) {
  if (p === "XR") return TOKENS.xr;
  if (p === "Games") return TOKENS.games;
  return "rgba(255,255,255,0.85)";
}

function pillarGradient(p: PillarKey) {
  if (p === "XR") return "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.95))";
  if (p === "Games") return "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(124,58,237,0.95))";
  if (p === "3D") return "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.78))";
  return "linear-gradient(90deg, rgba(158,243,21,0.70), rgba(255,255,255,0.92), rgba(124,58,237,0.70))";
}

const FOUR_PILLARS: PortalCard[] = [
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

function Bloom({ pillar, active }: { pillar: PillarKey; active: boolean }) {
  const xrHard = "rgba(158,243,21,0.34)";
  const gHard = "rgba(124,58,237,0.34)";
  const xrSoft = "rgba(158,243,21,0.16)";
  const gSoft = "rgba(124,58,237,0.16)";

  const hard =
    pillar === "XR"
      ? xrHard
      : pillar === "Games"
        ? gHard
        : pillar === "CreativeTech"
          ? "rgba(255,255,255,0.24)"
          : "rgba(255,255,255,0.22)";

  const wash =
    pillar === "XR"
      ? `radial-gradient(120% 120% at 20% 10%, ${xrSoft}, transparent 55%),
         radial-gradient(120% 120% at 80% 90%, ${xrSoft}, transparent 55%)`
      : pillar === "Games"
        ? `radial-gradient(120% 120% at 20% 10%, ${gSoft}, transparent 55%),
           radial-gradient(120% 120% at 80% 90%, ${gSoft}, transparent 55%)`
        : pillar === "CreativeTech"
          ? `radial-gradient(120% 120% at 18% 35%, ${xrSoft}, transparent 60%),
             radial-gradient(120% 120% at 82% 60%, ${gSoft}, transparent 60%)`
          : `radial-gradient(120% 120% at 50% 40%, rgba(255,255,255,0.14), transparent 58%)`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[44px]"
        initial={{ opacity: 0.35, scale: 0.98 }}
        animate={{ opacity: active ? 1 : 0.38, scale: active ? 1.02 : 0.98 }}
        transition={{ duration: 0.25 }}
        style={{
          background: `radial-gradient(60% 60% at 50% 40%, ${hard}, transparent 65%)`,
          filter: "blur(24px)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        initial={{ opacity: 0.25 }}
        animate={{ opacity: active ? 0.65 : 0.28 }}
        transition={{ duration: 0.25 }}
        style={{ background: wash }}
      />
    </>
  );
}

function KeyServicesBar({
  pillar,
  services,
  href,
  max = { base: 4, sm: 5, lg: 6 },
}: {
  pillar: PillarKey;
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

  const baseVisible = services.slice(0, max.base);
  const smVisible = services.slice(0, max.sm);
  const lgVisible = services.slice(0, max.lg);

  const baseMore = Math.max(0, services.length - max.base);
  const smMore = Math.max(0, services.length - max.sm);
  const lgMore = Math.max(0, services.length - max.lg);

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

  const ServiceChip = ({ s }: { s: string }) => (
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
              <ServiceChip key={s} s={s} />
            ))}
            <MoreChip n={baseMore} />
          </div>

          <div className="mt-2 hidden sm:flex sm:flex-nowrap sm:gap-2 sm:overflow-hidden lg:hidden">
            {smVisible.map((s) => (
              <ServiceChip key={s} s={s} />
            ))}
            <MoreChip n={smMore} />
          </div>

          <div className="mt-2 hidden lg:flex lg:flex-nowrap lg:gap-2 lg:overflow-hidden">
            {lgVisible.map((s) => (
              <ServiceChip key={s} s={s} />
            ))}
            <MoreChip n={lgMore} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FourPillarCard({ card }: { card: PortalCard }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const label = pillarLabel(card.pillar);
  const dot = pillarAccent(card.pillar);

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
        <Bloom pillar={card.pillar} active={active} />

        <div className="relative flex min-h-[440px] flex-col justify-between p-7 sm:min-h-[480px] sm:p-10 lg:min-h-[520px] lg:p-12">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
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
                style={{ WebkitTextFillColor: "transparent", backgroundImage: pillarGradient(card.pillar) }}
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

export default function ServicesPortal2x2() {
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
        {FOUR_PILLARS.map((c) => (
          <div key={c.id} className="flex flex-col gap-4">
            <FourPillarCard card={c} />
            <KeyServicesBar pillar={c.pillar} services={c.services} href={c.href} />
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





