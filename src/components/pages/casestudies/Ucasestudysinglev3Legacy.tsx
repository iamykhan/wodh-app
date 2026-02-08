"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* =======================================================================================
   CASE STUDY SINGLE v2 — RACER
   Variant A — Trailer-First (Cinematic) — FULL PAGE CODE

   Goals implemented (latest changes):
   ✅ Racing-consistent placeholder media (remote) + bulletproof fallback (never breaks)
   ✅ Hero cinematic authority: grain + scanlines + vignette + speed/track motif + metadata line
   ✅ Outcomes tiles include proof “metrics”
   ✅ Reel strip feels like a reel: Scene 01/02/03 + scroll progress indicator
   ✅ Under-the-hood has a visual “Architecture map preview” anchor
   ✅ Lightbox polish: ← → hint + in-image overlay title/tags + keyboard support
======================================================================================= */

type Platform = "App Store" | "Google Play" | "Steam";
type Tone = "green" | "purple" | "neutral";
type Tag = { label: string; tone?: Tone };

type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  tags: Tag[];
  src: string;
  ratio?: "16:9" | "4:3" | "21:9";
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
  techStack: [
    "Unity 3D",
    "C#",
    "Azure Server",
    "AWS Server",
    "Multiplayer (Photon PUN 2)",
    "MVC architecture",
  ],
  platforms: ["App Store", "Google Play", "Steam"] as Platform[],
};

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

/** SVG fallback that always renders (no network). */
function fallbackDataURI(label: string) {
  const safe = label.replace(/[^\w\s-]/g, "").slice(0, 38);
  const svg = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#070A12"/>
        <stop offset="0.5" stop-color="#090B14"/>
        <stop offset="1" stop-color="#12091F"/>
      </linearGradient>

      <radialGradient id="glow" cx="70%" cy="32%" r="70%">
        <stop offset="0" stop-color="#9EF315" stop-opacity="0.24"/>
        <stop offset="0.55" stop-color="#5B2DDC" stop-opacity="0.12"/>
        <stop offset="1" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>

      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 .10 0"/>
      </filter>

      <linearGradient id="track" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#9EF315" stop-opacity="0.35"/>
        <stop offset="0.55" stop-color="#9EF315" stop-opacity="0.14"/>
        <stop offset="1" stop-color="#9EF315" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#glow)"/>
    <rect width="100%" height="100%" filter="url(#noise)" opacity="0.35"/>

    <g fill="none">
      <path d="M120 720 C 420 520, 760 520, 1010 360 C 1220 230, 1400 240, 1540 290"
        stroke="url(#track)" stroke-width="4" />
      <path d="M120 744 C 420 544, 760 544, 1010 384 C 1220 254, 1400 264, 1540 314"
        stroke="rgba(255,255,255,0.10)" stroke-width="1" />
    </g>

    <g font-family="ui-sans-serif, system-ui" fill="#e5e7eb">
      <text x="90" y="130" font-size="54" font-weight="700" opacity="0.92">${safe}</text>
      <text x="92" y="170" font-size="18" opacity="0.68">Replace with real racing frames • Fallback never breaks layout</text>
    </g>

    <g opacity="0.15">
      <rect x="90" y="210" width="420" height="10" fill="#ffffff"/>
      <rect x="90" y="235" width="320" height="10" fill="#ffffff"/>
      <rect x="90" y="260" width="380" height="10" fill="#ffffff"/>
    </g>
  </svg>`);
  return `data:image/svg+xml;charset=utf-8,${svg}`;
}

/** A resilient image component: if remote fails, swap to SVG fallback. */
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

/* ----------------------------- UI Primitives ----------------------------- */

function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
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
      <path d="M10 8.5v7l6-3.5-6-3.5z" fill="currentColor" opacity="0.95" />
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
          <p className="mt-2 text-pretty text-sm leading-relaxed text-white/70 sm:text-[15px]">
            {desc}
          </p>
        ) : null}
      </div>
      {rightSlot ? <div className="hidden sm:block">{rightSlot}</div> : null}
    </div>
  );
}

/* ----------------------------- Page ----------------------------- */

export default function Ucasestudysinglev3Legacy() {
  const reduceMotion = useReducedMotion() ?? false;

  /**
   * Racing-consistent online placeholders:
   * NOTE: Even if remote fails, SmartImage falls back to SVG.
   *
   * Using "source.unsplash.com" gives racing-themed visuals.
   * Some networks may block it — fallback keeps layout premium.
   */
  const MEDIA = useMemo(
    () => ({
      trailerPoster: "https://source.unsplash.com/1600x900/?racecar,track",
      reel1: "https://source.unsplash.com/1200x800/?motorsport,track",
      reel2: "https://source.unsplash.com/1200x800/?racing,car",
      reel3: "https://source.unsplash.com/1200x800/?car,cockpit",
      galCover: "https://source.unsplash.com/1600x900/?supercar,track",
      galGarage: "https://source.unsplash.com/1200x800/?car,garage",
      galHUD: "https://source.unsplash.com/1200x800/?car,interior",
      galTelemetry: "https://source.unsplash.com/1200x800/?race,track",
      galMulti: "https://source.unsplash.com/1200x800/?sports-car,track",
      galCine: "https://source.unsplash.com/1600x900/?car,night,track",
    }),
    []
  );

  const moments: MomentItem[] = useMemo(
    () => [
      {
        id: "m-track",
        title: "Track moment",
        desc: "Wide lens + speed feel — while keeping key HUD elements readable at pace.",
        tags: [
          { label: "Cinematic", tone: "purple" },
          { label: "Readable", tone: "green" },
        ],
        src: MEDIA.reel1,
      },
      {
        id: "m-garage",
        title: "Garage detail",
        desc: "Lighting and materials tuned to feel premium without crushing performance budgets.",
        tags: [
          { label: "Lookdev", tone: "purple" },
          { label: "Performance-aware", tone: "green" },
        ],
        src: MEDIA.reel2,
      },
      {
        id: "m-telemetry",
        title: "HUD / telemetry",
        desc: "Telemetry-first UI: the data you need stays legible across motion and lighting shifts.",
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
        caption: "Hero cinematic angle used for trailer opener + store presence.",
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
        caption: "Detail pass: materials, lighting, and pacing tuned for a premium feel.",
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
        caption: "Readable UI states that stay clear under speed and motion.",
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
        caption: "Hooks designed for tuning driving feel and progression with iteration speed.",
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
        caption: "A calmer frame used to sell atmosphere and balance the intensity.",
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
        desc: "Room lifecycle, race state, and event timing structured for predictable iteration.",
        bullets: ["Room & match lifecycle", "Race state + event sync", "Iteration-friendly structure"],
        badge: "Core",
      },
      {
        id: "s-hud",
        title: "HUD & telemetry layer",
        desc: "Readable UI designed to stay legible under speed, motion, and lighting changes.",
        bullets: ["HUD state machine", "Telemetry hooks", "Data-driven layout"],
        badge: "Gameplay",
      },
      {
        id: "s-arch",
        title: "MVC architecture in Unity",
        desc: "Readable code structure so systems remain modular and maintainable.",
        bullets: ["Separation of concerns", "Reusable services", "Clean ownership boundaries"],
        badge: "Engineering",
      },
      {
        id: "s-backend",
        title: "Backend services (Azure / AWS)",
        desc: "Backend support for player services, analytics, and iteration readiness.",
        bullets: ["Service boundaries", "Data storage & retrieval", "Telemetry-ready pipeline"],
        badge: "Infra",
      },
      {
        id: "s-perf",
        title: "Performance targeting",
        desc: "Performance budget mindset for consistent frame pacing and gameplay feel.",
        bullets: ["Frame pacing goals", "Profiling-driven iteration", "Asset + scene hygiene"],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox.open]);

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      {/* Atmospheric background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-56 left-[-18%] h-[640px] w-[640px] rounded-full bg-emerald-400/12 blur-[90px]" />
        <div className="absolute top-44 right-[-16%] h-[620px] w-[620px] rounded-full bg-violet-500/12 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
        {/* subtle noise */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%223%22/%3E%3C/filter%3E%3Crect%20width=%22120%22%20height=%22120%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
      </div>

      {/* Top bar */}
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
            <Chip>
              <IconSpark className="h-3.5 w-3.5" />
              Trailer-first case study
            </Chip>
            <Chip>Racing simulator</Chip>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section id="hero" className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 sm:pt-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left copy */}
            <div className="lg:col-span-4">
              <div className="flex flex-wrap gap-2">
                <Chip>Game Portfolio</Chip>
                <Chip>{PROJECT.role}</Chip>
                <Chip>{PROJECT.subtitle}</Chip>
              </div>

              <div className="mt-5">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs text-violet-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-300/80" />
                  Cinematic delivery, engineering-clean systems
                </div>

                <h1 className="text-balance text-[42px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[56px]">
                  {PROJECT.name}
                </h1>

                <p className="mt-3 text-pretty text-sm leading-relaxed text-white/72 sm:text-[15px]">
                  A trailer-led, telemetry-driven racing experience — built end-to-end in Unity with
                  multiplayer foundations and a clean, readable HUD.
                </p>

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

                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip>Unity 3D</Chip>
                  <Chip>C#</Chip>
                  <Chip>Photon PUN 2</Chip>
                  <Chip>MVC</Chip>
                  <Chip>Azure</Chip>
                  <Chip>AWS</Chip>
                </div>
              </div>
            </div>

            {/* Trailer frame */}
            <div className="lg:col-span-8">
              <div
                id="trailer"
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
              >
                {/* Glow + atmosphere */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/18 blur-[70px]" />
                  <div className="absolute -right-24 -top-10 h-72 w-72 rounded-full bg-violet-500/16 blur-[80px]" />
                </div>

                <div className="relative aspect-[16/9] w-full">
                  <SmartImage
                    src={MEDIA.trailerPoster}
                    alt="RACER trailer poster"
                    labelForFallback="RACER — Trailer Frame"
                    priority
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Cinematic overlays */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/62 via-black/18 to-black/22" />
                  {/* Vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_35%,rgba(0,0,0,0.55)_100%)]" />
                  {/* Emerald + purple lens glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(158,243,21,0.14),transparent_55%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_60%,rgba(91,45,220,0.12),transparent_55%)]" />
                  {/* Scanlines */}
                  <div className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,rgba(255,255,255,0)_3px,rgba(255,255,255,0)_6px)]" />
                  {/* Grain */}
                  <div className="absolute inset-0 opacity-[0.07] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.8%22%20numOctaves=%223%22/%3E%3C/filter%3E%3Crect%20width=%22120%22%20height=%22120%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

                  {/* Speed / track motif */}
                  <div aria-hidden className="pointer-events-none absolute inset-0">
                    <svg
                      className="absolute left-[-6%] top-[58%] h-[40%] w-[112%] opacity-[0.55] blur-[0.2px]"
                      viewBox="0 0 1200 300"
                      fill="none"
                    >
                      <defs>
                        <linearGradient id="spd" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0" stopColor="rgba(158,243,21,0.45)" />
                          <stop offset="0.55" stopColor="rgba(158,243,21,0.18)" />
                          <stop offset="1" stopColor="rgba(158,243,21,0)" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M30 230 C 260 90, 520 110, 720 60 C 930 10, 1060 60, 1180 100"
                        stroke="url(#spd)"
                        strokeWidth="5"
                      />
                      <path
                        d="M30 252 C 260 112, 520 132, 720 82 C 930 32, 1060 82, 1180 122"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>

                  {/* Top chips */}
                  <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                    <Chip>Trailer</Chip>
                    <Chip>Gameplay</Chip>
                    <Chip>Garage + HUD</Chip>
                  </div>

                  {/* Play CTA */}
                  <div className="absolute inset-0 grid place-items-center">
                    <button
                      type="button"
                      onClick={() => openLightbox(0)}
                      className={cx(
                        "group relative inline-flex items-center gap-3 rounded-2xl border border-white/14 bg-black/25 px-5 py-3.5 backdrop-blur-md transition hover:bg-black/35",
                        "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_60px_rgba(0,0,0,0.45)]"
                      )}
                    >
                      <span className="absolute -inset-8 -z-10 rounded-[28px] bg-emerald-400/10 blur-[34px]" />
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

                  {/* Bottom chips */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      <Chip>Engine: Unity 3D</Chip>
                      <Chip>Netcode: Photon PUN 2</Chip>
                      <Chip>Arch: MVC</Chip>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Chip>Role: Full game build</Chip>
                      <Chip>Cinematic grade</Chip>
                    </div>
                  </div>
                </div>

                {/* Spec strip */}
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

        {/* Outcomes */}
        <section id="outcomes" className="mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
          <SectionHeader
            kicker={
              <>
                <Chip>Proof</Chip>
                <Chip>{PROJECT.name}</Chip>
              </>
            }
            title="Outcomes that feel real"
            desc="Cinematic delivery, engineered like a product: clean systems, predictable iteration, and readable gameplay UI."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
            <ProofTile
              className="lg:col-span-7"
             
              metric="60 FPS target"
              title="Trailer-first presentation with gameplay clarity"
              desc="A cinematic frame language that still keeps HUD readable at speed—built to sell, built to play."
              meta={["Cinematic frames", "Readable HUD", "Performance-aware"]}
            />
            <ProofTile
              className="lg:col-span-5"
             
              metric="Room lifecycle"
              title="Multiplayer foundation (Photon PUN 2)"
              desc="Room flow + race-state foundations so new features can be added without chaos."
              meta={["Rooms + sync", "Race state", "Iteration-friendly"]}
            />
            <ProofTile
              className="lg:col-span-4"
             
              metric="iOS + Android + Steam"
              title="Cross-platform delivery"
              desc="App Store, Google Play, and Steam readiness designed into the build workflow."
              meta={["UI scaling", "Input patterns", "Build discipline"]}
            />
            <ProofTile
              className="lg:col-span-4"
             
              metric="Telemetry hooks"
              title="HUD & telemetry layer"
              desc="Telemetry hooks designed to tune driving feel, balance, and progression."
              meta={["HUD states", "Data-driven", "Iteration speed"]}
            />
            <ProofTile
              className="lg:col-span-4"
             
              metric="MVC separation"
              title="Clean architecture (MVC in Unity)"
              desc="A readable codebase that stays maintainable as the simulator grows."
              meta={["Separation", "Modules", "Consistency"]}
            />
          </div>
        </section>

        {/* Moments (reel strip) */}
        <section id="moments" className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14">
          <SectionHeader
            kicker={
              <>
                <Chip>Trailer chapters</Chip>
                <Chip>{PROJECT.name}</Chip>
              </>
            }
            title="Three moments that sell the sim"
            desc="Structured like a reel: the track moment, the detail moment, and the HUD moment."
            rightSlot={<div className="text-xs text-white/55">Tip: drag/scroll • hover to preview</div>}
          />

          <ReelStrip items={moments} onOpen={() => openLightbox(0)} />
        </section>

        {/* Gallery (media wall) */}
        <section id="gallery" className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14">
          <SectionHeader
            kicker={
              <>
                <Chip>Media wall</Chip>
                <Chip>{PROJECT.name}</Chip>
              </>
            }
            title="Cinematic frames & gameplay clarity"
            desc="Premium gallery layout (not empty placeholder blocks). Click any frame for a lightbox."
            rightSlot={
              <button
                onClick={() => openLightbox(0)}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/75 transition hover:bg-white/[0.06]"
              >
                View all frames
              </button>
            }
          />

          <div className="grid grid-cols-12 gap-3">
            <MediaTile
              className="col-span-12 lg:col-span-7"
              item={gallery[0]}
              onClick={() => openLightbox(0)}
              variant="hero"
            />
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
            Replace online placeholders with real RACER screenshots anytime — fallback keeps everything working even if
            remote images fail.
          </div>
        </section>

        {/* Under the hood */}
        <section id="systems" className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14">
          <SectionHeader
            kicker={
              <>
                <Chip>Extras</Chip>
                <Chip>How we built it (systems)</Chip>
              </>
            }
            title="Under the hood (expand if you want the details)"
            desc="Trailer-first up top. Engineering depth here—kept secondary so it doesn’t steal the emotion."
          />

          {/* Visual anchor: architecture map preview */}
          <div className="mb-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:p-6">
              <div className="max-w-2xl">
                <div className="flex flex-wrap gap-2">
                  <Chip>Architecture map (preview)</Chip>
                  <Chip>Unity MVC</Chip>
                  <Chip>Multiplayer</Chip>
                  <Chip>HUD/Telemetry</Chip>
                  <Chip>Backend</Chip>
                </div>
                <div className="mt-3 text-sm font-semibold text-white">A systems snapshot — before you expand modules</div>
                <p className="mt-1 text-sm leading-relaxed text-white/70">
                  A quick visual anchor so this section feels “real”, not just a list. Expand the modules below for details.
                </p>
              </div>

              <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/60">Preview diagram</div>
                <div className="mt-3 space-y-2">
                  <DiagramRow left="Input + Controls" mid="Gameplay Systems" right="HUD/Telemetry" />
                  <DiagramRow left="Photon Rooms" mid="Race State" right="Events + Sync" />
                  <DiagramRow left="MVC Views" mid="Controllers" right="Models" />
                  <DiagramRow left="Azure/AWS" mid="Services" right="Analytics" />
                </div>
              </div>
            </div>
          </div>

          <Accordion items={systems} />
        </section>

        {/* Timeline */}
        <section id="timeline" className="mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14">
          <SectionHeader
            kicker={
              <>
                <Chip>Production track</Chip>
                <Chip>{PROJECT.name}</Chip>
              </>
            }
            title="A connected track from prototype → release"
            desc="A clean production flow with clear gates, so the project stays on rails."
          />

          <TrackTimeline
            steps={[
              { n: "01", title: "Pre-production", desc: "Scope, systems map, tech decisions.", gate: "Plan locked" },
              { n: "02", title: "Prototype", desc: "Driving core + HUD baseline + reel frames.", gate: "Prototype approved" },
              { n: "03", title: "Multiplayer", desc: "Rooms + state + event foundations.", gate: "Netcode stable" },
              { n: "04", title: "Content pass", desc: "Garage, tuning, polish, iteration loops.", gate: "Content locked" },
              { n: "05", title: "Release path", desc: "Store readiness + stability + performance.", gate: "Release ready" },
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
                  <Chip>Game Studio</Chip>
                  <Chip>Trailer-first delivery</Chip>
                  <Chip>Engineering-clean systems</Chip>
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
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                      Share your target platforms & scope
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-300/80" />
                      We propose a production track + milestones
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/50" />
                      Prototype → polish → release path
                    </li>
                  </ol>

                  <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white/60">
                    <span className="text-white/75">Tip:</span> Replace placeholders with your real RACER media later —
                    the cinematic overlays and layout stay intact.
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

      {/* LIGHTBOX */}
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
                  <div className="truncate text-xs text-white/60">{gallery[lightbox.index]?.caption}</div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:block text-xs text-white/50">Use ← → to navigate</div>
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

                {/* cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/12 to-black/22" />
                <div className="absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,rgba(255,255,255,0)_3px,rgba(255,255,255,0)_6px)]" />

                {/* in-image overlay (title + tags) */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div className="max-w-[75%] rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-md">
                    <div className="text-sm font-semibold text-white">{gallery[lightbox.index]?.title}</div>
                    <div className="mt-1 line-clamp-2 text-xs text-white/70">
                      {gallery[lightbox.index]?.caption}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {gallery[lightbox.index]?.tags?.map((t, i) => (
                        <Chip key={`${t.label}-${i}`} tone={t.tone ?? "neutral"}>
                          {t.label}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  <div className="hidden sm:block text-xs text-white/55">
                    {lightbox.index + 1}/{gallery.length}
                  </div>
                </div>
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
  tone = "neutral",
  metric,
  className,
}: {
  title: string;
  desc: string;
  meta: string[];
  tone?: Tone;
  metric?: string;
  className?: string;
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
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white">{title}</div>
            <p className="mt-2 text-sm leading-relaxed text-white/68">{desc}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {metric ? (
              <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] text-white/60">
                {metric}
              </span>
            ) : null}
            <span
              className={cx(
                "mt-0.5 h-2 w-2 shrink-0 rounded-full",
                tone === "green"
                  ? "bg-emerald-300/80"
                  : tone === "purple"
                    ? "bg-violet-300/80"
                    : "bg-white/45"
              )}
            />
          </div>
        </div>

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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return setProgress(0);
      setProgress(Math.min(1, Math.max(0, el.scrollLeft / max)));
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
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
              <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/15 to-black/22" />
              <div className="absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,rgba(255,255,255,0)_3px,rgba(255,255,255,0)_6px)]" />

              <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-white/70">
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
      <div className="mt-3 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-300/70 via-white/20 to-violet-300/50"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => {
            const active = progress >= i / 2 - 0.001;
            return (
              <span
                key={i}
                className={cx(
                  "h-1.5 w-1.5 rounded-full",
                  active ? "bg-emerald-300/80" : "bg-white/25"
                )}
              />
            );
          })}
        </div>
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
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/18 to-black/22" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,rgba(255,255,255,0)_3px,rgba(255,255,255,0)_6px)]" />

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
          <div className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/70">{item.caption}</div>
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
          <div key={it.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <button
              type="button"
              onClick={() => setOpenId((v) => (v === it.id ? null : it.id))}
              className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-white/[0.04]"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="truncate text-sm font-semibold text-white">{it.title}</div>
                  {it.badge ? <Chip>{it.badge}</Chip> : null}
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
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-xs text-white/60">Diagram (placeholder)</div>
                      <div className="mt-3 space-y-2">
                        <DiagramLine />
                        <DiagramLine />
                        <DiagramLine />
                        <DiagramLine />
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

function DiagramLine({ tone = "neutral" }: { tone?: Tone }) {
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

function DiagramRow({
  left,
  mid,
  right,
  tone,
}: {
  left: string;
  mid: string;
  right: string;
  tone?: Tone;
}) {
  const c =
    tone === "green"
      ? "border-emerald-400/20 bg-emerald-400/8"
      : tone === "purple"
        ? "border-violet-400/20 bg-violet-400/8"
        : "border-white/10 bg-white/[0.04]";
  return (
    <div className={cx("grid grid-cols-3 gap-2 rounded-2xl border px-3 py-2 text-[11px]", c)}>
      <span className="text-white/75">{left}</span>
      <span className="text-white/65">{mid}</span>
      <span className="text-white/55">{right}</span>
    </div>
  );
}

function TrackTimeline({
  steps,
  reduceMotion,
}: {
  steps: { n: string; title: string; desc: string; gate: string }[];
  reduceMotion: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      {/* Track line */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-10 hidden sm:block">
        <div className="mx-6 h-[2px] bg-gradient-to-r from-emerald-400/35 via-white/12 to-violet-500/35" />
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
                    ? "bg-emerald-300/80 shadow-[0_0_0_7px_rgba(158,243,21,0.10)]"
                    : idx === 4
                      ? "bg-violet-300/80 shadow-[0_0_0_7px_rgba(91,45,220,0.10)]"
                      : "bg-white/45"
                )}
              />
            </div>

            <div className="mt-2 text-sm font-semibold text-white">{s.title}</div>
            <div className="mt-1 text-xs leading-relaxed text-white/65">{s.desc}</div>

            <div className="mt-3 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/65">
              Gate: <span className="ml-1 text-white/80">{s.gate}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white/60">
        Swap these steps to your real milestones anytime — the “track” styling remains consistent.
      </div>
    </div>
  );
}
