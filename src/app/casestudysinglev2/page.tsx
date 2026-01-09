"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* =======================================================================================
   RACER — Portfolio Single (Variant A — Trailer-First / Cinematic)
   Notes:
   - Uses robust image fallback (so page still looks premium if remote images fail).
   - Remote images are just for visualization; replace with your real screenshots later.
   - TailwindCSS + Framer Motion.
======================================================================================= */

type Platform = "App Store" | "Google Play" | "Steam";
type Tag = { label: string; tone?: "green" | "purple" | "neutral" };

type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  tags: Tag[];
  src: string;
  ratio?: "16:9" | "4:3" | "1:1" | "21:9";
};

type MomentItem = {
  id: string;
  title: string;
  desc: string;
  tags: Tag[];
  src: string;
};

type SystemItem = {
  id: string;
  title: string;
  desc: string;
  bullets: string[];
  badge?: string;
};

const PROJECT = {
  name: "RACER",
  subtitle: "Realistic Racing Simulator",
  role: "Full game build",
  tech: ["Unity 3D", "C#", "Photon PUN 2", "MVC Architecture", "Azure Server", "AWS Server"],
  platforms: ["App Store", "Google Play", "Steam"] as Platform[],
};

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

/** Inline SVG fallback (no external calls). */
function fallbackDataURI(label: string) {
  const safe = label.replace(/[^\w\s-]/g, "").slice(0, 28);
  const svg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0b1020"/>
        <stop offset="0.55" stop-color="#090b12"/>
        <stop offset="1" stop-color="#12091f"/>
      </linearGradient>
      <radialGradient id="r" cx="70%" cy="35%" r="65%">
        <stop offset="0" stop-color="#9EF315" stop-opacity="0.22"/>
        <stop offset="0.55" stop-color="#5B2DDC" stop-opacity="0.12"/>
        <stop offset="1" stop-color="#000" stop-opacity="0"/>
      </radialGradient>
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 .12 0"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#r)"/>
    <rect width="100%" height="100%" filter="url(#n)" opacity="0.35"/>
    <g fill="none" stroke="#9EF315" stroke-opacity="0.25">
      <path d="M120 760 C 420 540, 760 520, 980 360 C 1190 210, 1400 210, 1520 260" stroke-width="3"/>
      <path d="M120 780 C 420 560, 760 540, 980 380 C 1190 230, 1400 230, 1520 280" stroke-width="1.5"/>
    </g>
    <g font-family="ui-sans-serif, system-ui" fill="#e5e7eb">
      <text x="90" y="120" font-size="54" font-weight="700" opacity="0.92">${safe}</text>
      <text x="92" y="160" font-size="18" opacity="0.68">Placeholder frame (replace with your real media)</text>
    </g>
  </svg>`);
  return `data:image/svg+xml;charset=utf-8,${svg}`;
}

/** A resilient image that never breaks the layout. */
function SmartImage({
  src,
  alt,
  className,
  labelForFallback,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  labelForFallback: string;
  priority?: boolean;
}) {
  const [err, setErr] = useState(false);
  const finalSrc = err ? fallbackDataURI(labelForFallback) : src;

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      onError={() => setErr(true)}
      draggable={false}
    />
  );
}

/* --- Small UI primitives --- */

function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "green" | "purple" | "neutral";
  className?: string;
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs leading-none";
  const styles =
    tone === "green"
      ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
      : tone === "purple"
        ? "border-violet-400/25 bg-violet-400/10 text-violet-200"
        : "border-white/10 bg-white/[0.04] text-white/75";
  return <span className={cx(base, styles, className)}>{children}</span>;
}

function SectionHeader({
  kicker,
  title,
  desc,
  rightSlot,
}: {
  kicker?: React.ReactNode;
  title: string;
  desc?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="max-w-3xl">
        {kicker ? <div className="mb-2 flex flex-wrap gap-2">{kicker}</div> : null}
        <h2 className="text-balance text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
          {title}
        </h2>
        {desc ? (
          <p className="mt-2 text-pretty text-sm leading-relaxed text-white/68 sm:text-[15px]">
            {desc}
          </p>
        ) : null}
      </div>
      {rightSlot ? <div className="hidden sm:block">{rightSlot}</div> : null}
    </div>
  );
}

function IconArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPlay(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10 8.5v7l6-3.5-6-3.5z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M12 22a10 10 0 100-20 10 10 0 000 20z"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.6"
      />
    </svg>
  );
}

function IconSpark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2l1.2 5.2L18 9l-4.8 1.8L12 16l-1.2-5.2L6 9l4.8-1.8L12 2z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M19.5 13l.8 3.4 3.2 1.2-3.2 1.2-.8 3.4-.8-3.4-3.2-1.2 3.2-1.2.8-3.4z"
        fill="currentColor"
        opacity="0.65"
      />
    </svg>
  );
}

/* =======================================================================================
   Page
======================================================================================= */

export default function PortfolioGameSingle_Racer_VariantA() {
  const reduceMotion = useReducedMotion() ?? false;

  // Remote "visualization" images (robust fallback included).
  // To guarantee something loads even if these fail, SmartImage swaps to SVG fallback.
  const MEDIA = useMemo(
    () => ({
      trailerPoster: "https://source.unsplash.com/1600x900/?racecar,track",
      reel1: "https://source.unsplash.com/1200x800/?motorsport,track",
      reel2: "https://source.unsplash.com/1200x800/?racing,car",
      reel3: "https://source.unsplash.com/1200x800/?race,track",
      galCover: "https://source.unsplash.com/1600x900/?supercar,track",
      galHUD: "https://source.unsplash.com/1200x800/?car,cockpit",
      galGarage: "https://source.unsplash.com/1200x800/?sports-car,track",
      galMulti: "https://source.unsplash.com/1200x800/?race,track",
      galCine: "https://source.unsplash.com/1600x900/?car,night,track",
      galTelemetry: "https://source.unsplash.com/1200x800/?racing,car",
    }),
    []
  );

  const moments: MomentItem[] = useMemo(
    () => [
      {
        id: "m-track",
        title: "Track moment",
        desc: "The cinematic chase shot: wide lens, speed feel, and clean readability at speed.",
        tags: [
          { label: "Cinematic", tone: "purple" },
          { label: "Readable", tone: "green" },
        ],
        src: MEDIA.reel1,
      },
      {
        id: "m-garage",
        title: "Garage detail",
        desc: "Micro surfaces and lighting tuned to feel premium—without crushing performance.",
        tags: [
          { label: "Lookdev", tone: "purple" },
          { label: "Performance-aware", tone: "green" },
        ],
        src: MEDIA.reel2,
      },
      {
        id: "m-telemetry",
        title: "HUD / telemetry",
        desc: "Telemetry-first HUD where the important data stays readable across lighting & motion.",
        tags: [
          { label: "HUD", tone: "green" },
          { label: "Telemetry", tone: "green" },
        ],
        src: MEDIA.reel3,
      },
    ],
    [MEDIA.reel1, MEDIA.reel2, MEDIA.reel3]
  );

  const gallery: GalleryItem[] = useMemo(
    () => [
      {
        id: "g-cover",
        title: "Cover frame",
        caption: "Hero cinematic angle used for the trailer opener and store presence.",
        tags: [
          { label: "Trailer", tone: "purple" },
          { label: "Cinematic", tone: "purple" },
        ],
        src: MEDIA.galCover,
        ratio: "16:9",
      },
      {
        id: "g-garage",
        title: "Garage / detail",
        caption: "Material & lighting pass inside the garage scene—built for clarity, not noise.",
        tags: [
          { label: "Lookdev", tone: "purple" },
          { label: "Unity", tone: "neutral" },
        ],
        src: MEDIA.galGarage,
        ratio: "4:3",
      },
      {
        id: "g-hud",
        title: "HUD clarity",
        caption: "Readable HUD layout and state changes without visual clutter.",
        tags: [
          { label: "HUD", tone: "green" },
          { label: "Readability", tone: "green" },
        ],
        src: MEDIA.galHUD,
        ratio: "4:3",
      },
      {
        id: "g-telemetry",
        title: "Telemetry layer",
        caption: "Telemetry hooks and display logic designed for iteration and tuning.",
        tags: [
          { label: "Telemetry", tone: "green" },
          { label: "MVC", tone: "neutral" },
        ],
        src: MEDIA.galTelemetry,
        ratio: "4:3",
      },
      {
        id: "g-multi",
        title: "Multiplayer moment",
        caption: "Race scenarios with predictable state updates and clear player feedback.",
        tags: [
          { label: "Multiplayer", tone: "green" },
          { label: "Photon PUN 2", tone: "neutral" },
        ],
        src: MEDIA.galMulti,
        ratio: "4:3",
      },
      {
        id: "g-cine",
        title: "Cinematic shot",
        caption: "A calmer frame used to balance intensity and sell the atmosphere.",
        tags: [
          { label: "Cinematic", tone: "purple" },
          { label: "Atmosphere", tone: "purple" },
        ],
        src: MEDIA.galCine,
        ratio: "21:9",
      },
    ],
    [
      MEDIA.galCover,
      MEDIA.galGarage,
      MEDIA.galHUD,
      MEDIA.galTelemetry,
      MEDIA.galMulti,
      MEDIA.galCine,
    ]
  );

  const systems: SystemItem[] = useMemo(
    () => [
      {
        id: "s-multi",
        title: "Multiplayer foundation (Photon PUN 2)",
        desc: "Room flow, race state, and event timing structured for predictable iteration.",
        bullets: ["Room & match lifecycle", "Race state + event sync", "Iteration-friendly architecture"],
        badge: "Core",
      },
      {
        id: "s-hud",
        title: "HUD & telemetry layer",
        desc: "A clean, readable HUD designed to stay legible under speed, motion blur, and lighting.",
        bullets: ["HUD state machine", "Telemetry hooks", "Data-driven layout"],
        badge: "Gameplay",
      },
      {
        id: "s-arch",
        title: "MVC architecture in Unity",
        desc: "Readable code structure for a growing simulator: systems are modular and testable.",
        bullets: ["Separation of concerns", "Reusable services", "Clean ownership boundaries"],
        badge: "Engineering",
      },
      {
        id: "s-backend",
        title: "Backend services (Azure / AWS)",
        desc: "Backend built to support iterative content + analytics + multiplayer services.",
        bullets: ["Service boundaries", "Data storage & retrieval", "Telemetry/analytics ready"],
        badge: "Infra",
      },
      {
        id: "s-perf",
        title: "Performance targeting",
        desc: "Performance budget mindset for stable gameplay and consistent feel.",
        bullets: ["Frame pacing goals", "Asset/scene hygiene", "Profiling-driven iteration"],
        badge: "Quality",
      },
    ],
    []
  );

  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }));
  const nextLightbox = () =>
    setLightbox((s) => ({ ...s, index: (s.index + 1) % gallery.length }));
  const prevLightbox = () =>
    setLightbox((s) => ({ ...s, index: (s.index - 1 + gallery.length) % gallery.length }));

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!lightbox.open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open, gallery.length]);

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      {/* Background atmosphere */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-[-18%] h-[560px] w-[560px] rounded-full bg-emerald-400/12 blur-[80px]" />
        <div className="absolute top-40 right-[-14%] h-[520px] w-[520px] rounded-full bg-violet-500/12 blur-[90px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%223%22/%3E%3C/filter%3E%3Crect%20width=%22120%22%20height=%22120%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
      </div>

      {/* Top nav */}
      <header className="relative z-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pb-2 pt-5 sm:px-6 sm:pt-6">
          <a
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <IconArrowRight className="h-4 w-4 rotate-180" />
            </span>
            <span className="hidden sm:inline">Back to Portfolio</span>
            <span className="sm:hidden">Back</span>
          </a>

          <div className="flex items-center gap-2">
            <Chip tone="purple">
              <IconSpark className="h-3.5 w-3.5" />
              Trailer-first case study
            </Chip>
            <Chip tone="green">Realistic racing</Chip>
          </div>
        </div>
      </header>

      {/* HERO (Trailer dominates) */}
      <main className="relative z-10">
        <section id="hero" className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left copy */}
            <div className="lg:col-span-4">
              <div className="flex flex-wrap gap-2">
                <Chip tone="purple">Game Portfolio</Chip>
                <Chip tone="neutral">{PROJECT.role}</Chip>
                <Chip tone="green">{PROJECT.subtitle}</Chip>
              </div>

              <div className="mt-5">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs text-violet-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-300/80" />
                  Cinematic delivery, engineering-clean systems
                </div>

                <h1 className="text-balance text-[40px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[52px]">
                  {PROJECT.name}
                </h1>

                <p className="mt-3 text-pretty text-sm leading-relaxed text-white/70 sm:text-[15px]">
                  A trailer-led, telemetry-driven racing experience — built end-to-end in Unity with
                  multiplayer foundations and a clean, readable HUD.
                </p>

                {/* Primary actions */}
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <a
                    href="#trailer"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-2.5 text-sm font-medium text-emerald-100 shadow-[0_0_0_1px_rgba(158,243,21,0.12)] transition hover:bg-emerald-400/14"
                  >
                    <IconPlay className="h-5 w-5" />
                    Watch Trailer (placeholder)
                  </a>
                  <a
                    href="#gallery"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/[0.06]"
                  >
                    Explore Gallery
                    <IconArrowRight className="h-4 w-4" />
                  </a>
                </div>

                {/* Platforms */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {PROJECT.platforms.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                      {p}
                    </span>
                  ))}
                </div>

                {/* Tech pills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip tone="neutral">Unity 3D</Chip>
                  <Chip tone="neutral">C#</Chip>
                  <Chip tone="green">Photon PUN 2</Chip>
                  <Chip tone="purple">MVC</Chip>
                  <Chip tone="neutral">Azure</Chip>
                  <Chip tone="neutral">AWS</Chip>
                </div>
              </div>
            </div>

            {/* Trailer frame (dominant) */}
            <div className="lg:col-span-8">
              <div
                id="trailer"
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
              >
                {/* Neon rim */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/18 blur-[70px]" />
                  <div className="absolute -right-24 -top-10 h-72 w-72 rounded-full bg-violet-500/16 blur-[80px]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_55%)]" />
                </div>

                {/* Media */}
                <div className="relative aspect-[16/9] w-full">
                  <SmartImage
                    src={MEDIA.trailerPoster}
                    alt="RACER trailer poster"
                    labelForFallback="RACER — Trailer Frame"
                    priority
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* cinematic overlays */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/18 to-black/20" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(158,243,21,0.16),transparent_55%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_60%,rgba(91,45,220,0.14),transparent_55%)]" />
                  {/* Film overlays */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]" />
                  <div className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
                  <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%223%22/%3E%3C/filter%3E%3Crect%20width=%22120%22%20height=%22120%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
                  {/* Speed-line overlay */}
                  <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 1600 900" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="speedLine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(16,185,129,0.4)" />
                        <stop offset="50%" stopColor="rgba(16,185,129,0.2)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 600 Q 400 550, 800 580 T 1600 600"
                      stroke="url(#speedLine)"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.6"
                      style={{ filter: "blur(1px)" }}
                    />
                  </svg>

                  {/* Top bar */}
                  <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                    <Chip tone="neutral">Trailer</Chip>
                    <Chip tone="green">Gameplay</Chip>
                    <Chip tone="neutral">Garage + HUD</Chip>
                  </div>

                  {/* Play CTA */}
                  <div className="absolute inset-0 grid place-items-center">
                    <button
                      type="button"
                      onClick={() => {
                        // You can replace this with your real trailer modal later.
                        openLightbox(0);
                      }}
                      className={cx(
                        "group relative inline-flex items-center gap-3 rounded-2xl border border-white/14 bg-black/25 px-5 py-3.5 backdrop-blur-md transition hover:bg-black/35",
                        "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_60px_rgba(0,0,0,0.45)]"
                      )}
                    >
                      <span className="absolute -inset-8 -z-10 rounded-[28px] bg-emerald-400/8 blur-[30px]" />
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/12 text-emerald-200">
                        <IconPlay className="h-7 w-7" />
                      </span>
                      <span className="text-left">
                        <span className="block text-sm font-semibold text-white">
                          Play trailer (placeholder)
                        </span>
                        <span className="block text-xs text-white/70">
                          Trailer Cut • 0:47 • Gameplay + HUD • Multiplayer moment
                        </span>
                      </span>
                      <span className="ml-2 inline-flex items-center text-white/70 transition group-hover:text-white">
                        <IconArrowRight className="h-4 w-4" />
                      </span>
                    </button>
                  </div>

                  {/* bottom metrics */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      <Chip tone="neutral">Engine: Unity 3D</Chip>
                      <Chip tone="neutral">Netcode: Photon PUN 2</Chip>
                      <Chip tone="neutral">Arch: MVC</Chip>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Chip tone="green">Role: Full game build</Chip>
                      <Chip tone="purple">Cinematic grade</Chip>
                    </div>
                  </div>
                </div>

                {/* Spec strip (clean) */}
                <div className="grid grid-cols-2 gap-3 border-t border-white/10 p-4 sm:grid-cols-4 sm:gap-4">
                  <Spec label="Role" value="Full game build" />
                  <Spec label="Language" value="C#" />
                  <Spec label="Multiplayer" value="Photon PUN 2" />
                  <Spec label="Backend" value="Azure + AWS" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes (proof tiles) */}
        <section id="outcomes" className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
          <SectionHeader
            kicker={
              <>
                <Chip tone="purple">Proof</Chip>
                <Chip tone="neutral">{PROJECT.name}</Chip>
              </>
            }
            title="Outcomes that feel real"
            desc="Cinematic delivery, but engineered like a product: clean systems, predictable iteration, and readable gameplay UI."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
            {/* hero tile */}
            <ProofTile
              className="lg:col-span-7"
              tone="green"
              title="Trailer-first presentation with gameplay clarity"
              desc="A cinematic frame language that still keeps HUD readable at speed—built to sell, built to play."
              meta={["Cinematic frames", "Readable HUD", "Performance-aware"]}
              metric="60 FPS target"
            />
            <ProofTile
              className="lg:col-span-5"
              tone="purple"
              title="Multiplayer foundation (Photon PUN 2)"
              desc="Structured room flow + race-state foundations so features can be added without chaos."
              meta={["Room lifecycle", "Race state", "Iteration-friendly"]}
              metric="Room lifecycle"
            />
            <ProofTile
              className="lg:col-span-4"
              tone="neutral"
              title="Cross-platform delivery"
              desc="App Store, Google Play, and Steam readiness designed into the flow."
              meta={["Input patterns", "UI scaling", "Build discipline"]}
              metric="iOS + Android + Steam"
            />
            <ProofTile
              className="lg:col-span-4"
              tone="green"
              title="HUD & telemetry layer"
              desc="Telemetry hooks designed to tune driving feel, balance, and progression."
              meta={["Telemetry hooks", "HUD states", "Data-driven layout"]}
              metric="Telemetry hooks"
            />
            <ProofTile
              className="lg:col-span-4"
              tone="purple"
              title="Clean architecture (MVC in Unity)"
              desc="Readable codebase that stays maintainable as the simulator grows."
              meta={["Separation", "Modules", "Consistency"]}
              metric="MVC separation"
            />
          </div>
        </section>

        {/* Moments (reel strip) */}
        <section id="moments" className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14">
          <SectionHeader
            kicker={
              <>
                <Chip tone="purple">Trailer chapters</Chip>
                <Chip tone="neutral">{PROJECT.name}</Chip>
              </>
            }
            title="Three moments that sell the sim"
            desc="Structured like a reel: the track moment, the detail moment, and the HUD moment."
            rightSlot={
              <div className="text-xs text-white/55">
                Tip: drag/scroll horizontally • hover to preview
              </div>
            }
          />

          <ReelStrip items={moments} onOpen={(id) => openLightbox(Math.max(0, gallery.findIndex((g) => g.id === "g-cover")))} />
        </section>

        {/* Gallery (media wall + lightbox) */}
        <section id="gallery" className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14">
          <SectionHeader
            kicker={
              <>
                <Chip tone="green">Media wall</Chip>
                <Chip tone="neutral">{PROJECT.name}</Chip>
              </>
            }
            title="Cinematic frames & gameplay clarity"
            desc="A premium gallery layout (not placeholder blocks). Click any frame for a lightbox."
          />

          <div className="grid grid-cols-12 gap-3">
            {/* Big hero */}
            <MediaTile
              className="col-span-12 lg:col-span-7"
              item={gallery[0]}
              onClick={() => openLightbox(0)}
              variant="hero"
            />
            {/* Stack right */}
            <MediaTile
              className="col-span-12 md:col-span-6 lg:col-span-5"
              item={gallery[1]}
              onClick={() => openLightbox(1)}
            />
            <MediaTile
              className="col-span-12 md:col-span-6 lg:col-span-5"
              item={gallery[2]}
              onClick={() => openLightbox(2)}
            />
            {/* Bottom row */}
            <MediaTile
              className="col-span-12 md:col-span-6 lg:col-span-4"
              item={gallery[3]}
              onClick={() => openLightbox(3)}
            />
            <MediaTile
              className="col-span-12 md:col-span-6 lg:col-span-4"
              item={gallery[4]}
              onClick={() => openLightbox(4)}
            />
            <MediaTile
              className="col-span-12 lg:col-span-4"
              item={gallery[5]}
              onClick={() => openLightbox(5)}
              variant="wide"
            />
          </div>

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-white/60">
            Replace images with your real frames under <span className="text-white/80">gallery[]</span>.
            This layout and lightbox will keep working.
          </div>
        </section>

        {/* Under the hood (secondary / tucked) */}
        <section id="systems" className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14">
          <SectionHeader
            kicker={
              <>
                <Chip tone="neutral">Extras</Chip>
                <Chip tone="purple">How we built it (systems)</Chip>
              </>
            }
            title="Under the hood (expand if you want the details)"
            desc="Trailer-first up top. Engineering depth here—kept secondary so it doesn't steal the emotion."
          />

          {/* Architecture map preview */}
          <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">Architecture map (preview)</div>
                <div className="mt-1 text-xs text-white/65">
                  Unity MVC • Multiplayer • HUD/Telemetry • Backend
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <DiagramLine tone="green" />
              <DiagramLine tone="purple" />
              <DiagramLine tone="neutral" />
              <DiagramLine tone="green" />
              <DiagramLine tone="purple" />
              <DiagramLine tone="neutral" />
            </div>
            <div className="mt-3 text-xs text-white/55">
              Expand modules below for details.
            </div>
          </div>

          <Accordion items={systems} />
        </section>

        {/* Timeline (track-like) */}
        <section id="timeline" className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14">
          <SectionHeader
            kicker={
              <>
                <Chip tone="green">Production track</Chip>
                <Chip tone="neutral">{PROJECT.name}</Chip>
              </>
            }
            title="A connected track from prototype → release"
            desc="A clean production flow with clear gates, so the project stays on rails."
          />

          <TrackTimeline
            steps={[
              { n: "01", title: "Pre-production", desc: "Scope, systems map, and tech decisions." },
              { n: "02", title: "Prototype", desc: "Core driving + HUD baseline + first reel frames." },
              { n: "03", title: "Multiplayer", desc: "Rooms + state + race event foundations." },
              { n: "04", title: "Content pass", desc: "Garage, tuning, polish, and iteration loops." },
              { n: "05", title: "Release path", desc: "Store readiness + stability + performance." },
            ]}
            reduceMotion={reduceMotion}
          />
        </section>

        {/* CTA */}
        <section id="cta" className="mx-auto w-full max-w-6xl px-4 pb-14 pt-14 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-400/10 via-white/[0.03] to-violet-500/10 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-8">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-emerald-400/18 blur-[80px]" />
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/16 blur-[90px]" />
            </div>

            <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="mb-2 flex flex-wrap gap-2">
                  <Chip tone="green">Game Studio</Chip>
                  <Chip tone="purple">Trailer-first delivery</Chip>
                  <Chip tone="neutral">Engineering-clean systems</Chip>
                </div>
                <h3 className="text-balance text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                  Want a racing simulator built with this level of polish?
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
                  We can take your concept from prototype → multiplayer-ready build → release path,
                  with cinematic presentation and clean systems underneath.
                </p>

                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/12 px-4 py-2.5 text-sm font-medium text-emerald-100 transition hover:bg-emerald-400/16"
                  >
                    Start a project
                    <IconArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:hello@wodh.io"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/[0.06]"
                  >
                    hello@wodh.io
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/60">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                    Production-ready
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                    Multiplayer-ready
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1">
                    Performance-minded
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur">
                  <div className="text-xs text-white/60">Next steps</div>
                  <ol className="mt-2 space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                      Share your target platforms & scope
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-300/80" />
                      We propose a production track + milestones
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
                      Prototype → polish → release path
                    </li>
                  </ol>

                  <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white/60">
                    <span className="text-white/75">Note:</span> Swap placeholder media with your real screenshots
                    anytime—layout stays intact.
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-6 text-xs text-white/45">
              © Wodh • Game Portfolio • {PROJECT.name}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.currentTarget === e.target) closeLightbox();
            }}
          >
            <motion.div
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#070A12] shadow-[0_40px_160px_rgba(0,0,0,0.75)]"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">
                    {gallery[lightbox.index]?.title}
                  </div>
                  <div className="truncate text-xs text-white/60">
                    {gallery[lightbox.index]?.caption}
                  </div>
                  <div className="mt-1 text-[11px] text-white/50">
                    Use ← → to navigate
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevLightbox}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75 transition hover:bg-white/[0.06]"
                  >
                    Prev
                  </button>
                  <button
                    onClick={nextLightbox}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75 transition hover:bg-white/[0.06]"
                  >
                    Next
                  </button>
                  <button
                    onClick={closeLightbox}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/75 transition hover:bg-white/[0.06]"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="relative aspect-[16/9] w-full">
                <SmartImage
                  src={gallery[lightbox.index]?.src ?? fallbackDataURI("RACER")}
                  alt={gallery[lightbox.index]?.title ?? "Gallery frame"}
                  labelForFallback={`RACER — ${gallery[lightbox.index]?.title ?? "Frame"}`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/10 to-black/20" />
                {/* Bottom-left overlay */}
                <div className="absolute bottom-4 left-4 max-w-[60%] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
                  <div className="text-sm font-semibold text-white">
                    {gallery[lightbox.index]?.title}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {gallery[lightbox.index]?.tags?.slice(0, 3).map((t, i) => (
                      <Chip key={`${t.label}-${i}`} tone={t.tone ?? "neutral"}>
                        {t.label}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 p-4">
                {gallery[lightbox.index]?.tags?.map((t, i) => (
                  <Chip key={`${t.label}-${i}`} tone={t.tone ?? "neutral"}>
                    {t.label}
                  </Chip>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* =======================================================================================
   Components
======================================================================================= */

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2">
      <div className="text-[11px] text-white/55">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-white/85">{value}</div>
    </div>
  );
}

function ProofTile({
  title,
  desc,
  meta,
  tone,
  className,
  metric,
}: {
  title: string;
  desc: string;
  meta: string[];
  tone: "green" | "purple" | "neutral";
  className?: string;
  metric?: string;
}) {
  const glow =
    tone === "green"
      ? "shadow-[0_0_0_1px_rgba(158,243,21,0.10)]"
      : tone === "purple"
        ? "shadow-[0_0_0_1px_rgba(91,45,220,0.12)]"
        : "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]";

  const accent =
    tone === "green"
      ? "from-emerald-400/16 via-white/[0.03] to-transparent"
      : tone === "purple"
        ? "from-violet-500/16 via-white/[0.03] to-transparent"
        : "from-white/[0.06] via-white/[0.03] to-transparent";

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4",
        glow,
        className
      )}
    >
      <div aria-hidden className={cx("absolute inset-0 bg-gradient-to-br", accent)} />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="flex items-center gap-2">
            {metric ? (
              <span className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[11px] text-white/60">
                {metric}
              </span>
            ) : null}
            <span
              className={cx(
                "h-2 w-2 shrink-0 rounded-full",
                tone === "green"
                  ? "bg-emerald-300/80"
                  : tone === "purple"
                    ? "bg-violet-300/80"
                    : "bg-white/45"
              )}
            />
          </div>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/68">{desc}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {meta.map((m) => (
            <span
              key={m}
              className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] text-white/65"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReelStrip({
  items,
  onOpen,
}: {
  items: MomentItem[];
  onOpen?: (id: string) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateProgress = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;
      setScrollProgress(maxScroll > 0 ? scrollLeft / maxScroll : 0);
    };

    el.addEventListener("scroll", updateProgress);
    updateProgress();
    return () => el.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#070A12] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#070A12] to-transparent" />

      <div
        ref={scrollerRef}
        className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((m, idx) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onOpen?.(m.id)}
            className="group relative w-[320px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition hover:bg-white/[0.05] sm:w-[360px]"
          >
            <div className="relative aspect-[16/10]">
              <SmartImage
                src={m.src}
                alt={m.title}
                labelForFallback={`RACER — ${m.title}`}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/15 to-black/20" />
              <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[11px] font-mono text-white/60">
                  Scene {String(idx + 1).padStart(2, "0")}
                </span>
                {m.tags.map((t, i) => (
                  <Chip key={`${t.label}-${i}`} tone={t.tone ?? "neutral"}>
                    {t.label}
                  </Chip>
                ))}
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-white">{m.title}</div>
                  <span className="inline-flex items-center gap-2 text-xs text-white/75">
                    Expand <IconArrowRight className="h-4 w-4" />
                  </span>
                </div>
                <div className="mt-1 text-xs leading-relaxed text-white/70">{m.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Scroll progress indicator */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {items.map((_, idx) => (
          <div
            key={idx}
            className={cx(
              "h-1.5 w-1.5 rounded-full transition",
              scrollProgress >= idx / (items.length - 1) - 0.15
                ? "bg-emerald-400/60"
                : "bg-white/20"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function MediaTile({
  item,
  onClick,
  className,
  variant,
}: {
  item: GalleryItem;
  onClick: () => void;
  className?: string;
  variant?: "hero" | "wide";
}) {
  const ratio =
    variant === "hero" ? "aspect-[16/9]" : variant === "wide" ? "aspect-[21/9]" : "aspect-[4/3]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition hover:bg-white/[0.05]",
        className
      )}
    >
      <div className={cx("relative w-full", ratio)}>
        <SmartImage
          src={item.src}
          alt={item.title}
          labelForFallback={`RACER — ${item.title}`}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/18 to-black/20" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {item.tags.slice(0, 2).map((t, i) => (
            <Chip key={`${t.label}-${i}`} tone={t.tone ?? "neutral"}>
              {t.label}
            </Chip>
          ))}
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-white">{item.title}</div>
            <span className="inline-flex items-center gap-2 text-xs text-white/75">
              Expand <IconArrowRight className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/70">
            {item.caption}
          </div>
        </div>
      </div>
    </button>
  );
}

function Accordion({ items }: { items: SystemItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-1 gap-3">
      {items.map((it) => {
        const open = openId === it.id;
        return (
          <div
            key={it.id}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
          >
            <button
              type="button"
              onClick={() => setOpenId((v) => (v === it.id ? null : it.id))}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-white/[0.04]"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="truncate text-sm font-semibold text-white">{it.title}</div>
                  {it.badge ? <Chip tone="neutral">{it.badge}</Chip> : null}
                </div>
                <div className="mt-1 text-xs leading-relaxed text-white/65">{it.desc}</div>
              </div>
              <div className="shrink-0 rounded-xl border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/70">
                {open ? "Collapse" : "Expand"}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="border-t border-white/10"
                >
                  <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
                    {/* Diagram thumbnail placeholder */}
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-xs text-white/60">Diagram (placeholder)</div>
                      <div className="mt-3 space-y-2">
                        <DiagramLine tone="green" />
                        <DiagramLine tone="purple" />
                        <DiagramLine tone="neutral" />
                        <DiagramLine tone="green" />
                      </div>
                      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/12 blur-[40px]" />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-xs text-white/60">Implementation notes</div>
                      <ul className="mt-2 space-y-2 text-sm text-white/80">
                        {it.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/50" />
                            <span className="leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function DiagramLine({ tone }: { tone: "green" | "purple" | "neutral" }) {
  const bg =
    tone === "green"
      ? "from-emerald-300/30 via-emerald-300/10 to-transparent"
      : tone === "purple"
        ? "from-violet-300/30 via-violet-300/10 to-transparent"
        : "from-white/18 via-white/8 to-transparent";
  return (
    <div className="h-3 rounded-full border border-white/10 bg-gradient-to-r px-2">
      <div className={cx("h-full rounded-full bg-gradient-to-r", bg)} />
    </div>
  );
}

function TrackTimeline({
  steps,
  reduceMotion,
}: {
  steps: { n: string; title: string; desc: string }[];
  reduceMotion: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      {/* Track line */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-10 hidden sm:block">
        <div className="mx-6 h-[2px] bg-gradient-to-r from-emerald-400/30 via-white/10 to-violet-500/30" />
        <div className="mx-6 mt-1 h-[1px] bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.06)_40%,rgba(255,255,255,0)_100%)]" />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-4">
        {steps.map((s, idx) => (
          <motion.div
            key={s.n}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.22, delay: idx * 0.04 }}
            className="relative rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-white/60">Step {s.n}</div>
              <div
                className={cx(
                  "h-2.5 w-2.5 rounded-full",
                  idx === 2
                    ? "bg-emerald-300/80 shadow-[0_0_0_6px_rgba(158,243,21,0.10)]"
                    : idx === 4
                      ? "bg-violet-300/80 shadow-[0_0_0_6px_rgba(91,45,220,0.10)]"
                      : "bg-white/45"
                )}
              />
            </div>
            <div className="mt-2 text-sm font-semibold text-white">{s.title}</div>
            <div className="mt-1 text-xs leading-relaxed text-white/65">{s.desc}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white/60">
        Swap these steps to your real milestones anytime — the “track” styling remains consistent.
      </div>
    </div>
  );
}
