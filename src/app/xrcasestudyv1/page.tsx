"use client";

import React, { useMemo, useState } from "react";

/* =======================================================================================
   WODH — XR Portfolio Single (Case Study)
   Idea A — Moment Reel + Dual Narrative
   - Dark indigo/black base
   - Neon green primary XR accent
   - Violet secondary ink
   - Editorial typography + cinematic glow + crafted narrative
   - Dummy data included (replace later)
======================================================================================= */

type Moment = {
  label: string;
  title: string;
  blurb: string;
  img: string;
};

type Chapter = {
  kicker: string;
  title: string;
  body: string;
  img: string;
  bullets?: string[];
};

type SystemBlock = {
  kicker: string;
  title: string;
  body: string;
  points: { label: string; value: string; note?: string }[];
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SafeImage({
  src,
  alt,
  className,
  fallbackVariant = "scene",
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackVariant?: "scene" | "ui" | "device";
}) {
  const [broken, setBroken] = useState(false);

  const fallback = useMemo(() => {
    const variants: Record<string, { a: string; b: string; c: string }> = {
      scene: { a: "#0B1020", b: "#12324B", c: "#21F38C" },
      ui: { a: "#0B1020", b: "#1A1F3A", c: "#7C3AED" },
      device: { a: "#070A14", b: "#162042", c: "#21F38C" },
    };
    const v = variants[fallbackVariant] ?? variants.scene;

    // Simple inline SVG fallback (no external requests).
    const svg = encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="${v.a}"/>
            <stop offset="0.55" stop-color="${v.b}"/>
            <stop offset="1" stop-color="${v.c}" stop-opacity="0.65"/>
          </linearGradient>
          <radialGradient id="r" cx="70%" cy="20%" r="70%">
            <stop offset="0" stop-color="${v.c}" stop-opacity="0.35"/>
            <stop offset="1" stop-color="${v.a}" stop-opacity="0"/>
          </radialGradient>
          <filter id="n">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.12 0"/>
          </filter>
        </defs>
        <rect width="1600" height="1000" fill="url(#g)"/>
        <rect width="1600" height="1000" fill="url(#r)"/>
        <rect width="1600" height="1000" filter="url(#n)" opacity="0.65"/>
        <g opacity="0.9">
          <path d="M120 760 C 360 640, 520 900, 760 780 S 1180 660, 1460 760" fill="none" stroke="${v.c}" stroke-opacity="0.35" stroke-width="2"/>
          <path d="M140 800 C 420 700, 560 940, 820 820 S 1240 700, 1500 820" fill="none" stroke="${v.c}" stroke-opacity="0.18" stroke-width="2"/>
          <circle cx="1220" cy="180" r="130" fill="${v.c}" opacity="0.12"/>
          <circle cx="1220" cy="180" r="70" fill="${v.c}" opacity="0.12"/>
        </g>
        <g font-family="ui-sans-serif, system-ui" fill="#EAF0FF">
          <text x="90" y="140" font-size="36" opacity="0.85">XR Capture Placeholder</text>
          <text x="90" y="190" font-size="18" opacity="0.55">Replace with your real headset frames / UI panels.</text>
        </g>
      </svg>
    `);

    return `data:image/svg+xml;charset=utf-8,${svg}`;
  }, [fallbackVariant]);

  return (
    <img
      src={broken ? fallback : src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
    />
  );
}

function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "green" | "violet";
  className?: string;
}) {
  const tones =
    tone === "green"
      ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
      : tone === "violet"
      ? "border-violet-300/25 bg-violet-300/10 text-violet-100"
      : "border-white/10 bg-white/5 text-white/80";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide backdrop-blur-md",
        tones,
        className
      )}
    >
      {children}
    </span>
  );
}

function SectionHeader({
  kicker,
  title,
  lead,
  accent = "green",
}: {
  kicker: string;
  title: string;
  lead?: string;
  accent?: "green" | "violet";
}) {
  const kickerTone =
    accent === "violet" ? "text-violet-200/85" : "text-emerald-200/85";

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span
          className={cx(
            "h-[1px] w-10 bg-gradient-to-r from-transparent to-white/25"
          )}
        />
        <p className={cx("text-xs uppercase tracking-[0.28em]", kickerTone)}>
          {kicker}
        </p>
      </div>

      <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
        {title}
      </h2>

      {lead ? (
        <p className="mt-2 max-w-3xl text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

function GlowField() {
  return (
    <>
      {/* Base corner glows */}
      <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-[62%] h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

      {/* Soft vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_10%,rgba(33,243,140,0.12),transparent_60%),radial-gradient(900px_600px_at_80%_30%,rgba(124,58,237,0.10),transparent_60%),radial-gradient(900px_900px_at_20%_80%,rgba(33,243,140,0.08),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_700px_at_50%_70%,rgba(255,255,255,0.06),transparent_60%)] opacity-40" />
    </>
  );
}

function MomentReel({ moments }: { moments: Moment[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Chip tone="green">Moment Reel</Chip>
          <Chip className="hidden sm:inline-flex">Hover to expand</Chip>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          {moments.map((m, i) => (
            <button
              key={m.label}
              onClick={() => setActive(i)}
              className={cx(
                "h-8 w-8 rounded-full border text-xs backdrop-blur-md transition",
                i === active
                  ? "border-emerald-300/40 bg-emerald-300/15 text-emerald-100"
                  : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
              )}
              aria-label={`Select moment ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
        {/* Halo */}
        <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(33,243,140,0.12),transparent_70%)]" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

        {/* Reel */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
          {moments.map((m, i) => (
            <button
              key={m.label}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={cx(
                "group relative overflow-hidden rounded-xl border text-left transition-all",
                i === active
                  ? "border-emerald-300/30 bg-white/5 md:col-span-2"
                  : "border-white/10 bg-white/0 hover:bg-white/5 md:col-span-1"
              )}
            >
              <div className="relative aspect-[16/10]">
                <SafeImage
                  src={m.img}
                  alt={m.title}
                  fallbackVariant="scene"
                  className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/80 via-[#070A14]/25 to-transparent" />
                <div className="pointer-events-none absolute -inset-10 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-emerald-400/20 blur-2xl" />
                  <div className="absolute right-6 bottom-6 h-24 w-24 rounded-full bg-violet-500/15 blur-2xl" />
                </div>
              </div>

              <div className="p-4">
                <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">
                  {m.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">{m.title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/65">
                  {m.blurb}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={cx(
                      "h-1.5 w-1.5 rounded-full",
                      i === active ? "bg-emerald-300" : "bg-white/25"
                    )}
                  />
                  <span className="text-xs text-white/55">
                    {i === active ? "Active scene" : "Preview"}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active caption (mobile / clarity) */}
        <div className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 md:hidden">
          <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">
            {moments[active]?.label}
          </p>
          <p className="mt-1 text-sm font-semibold text-white">
            {moments[active]?.title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/70">
            {moments[active]?.blurb}
          </p>
        </div>
      </div>
    </div>
  );
}

function SpecStrip({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {specs.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl transition hover:bg-white/7"
        >
          <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">
            {s.label}
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{s.value}</p>
        </div>
      ))}
    </div>
  );
}

function ConnectedTrack({
  steps,
}: {
  steps: { title: string; note: string; accent?: "green" | "violet" }[];
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(33,243,140,0.10),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Chip tone="green">Connected Track</Chip>
        <Chip tone="violet">System Layer</Chip>
      </div>

      <div className="relative">
        <div className="absolute left-3 top-3 hidden h-[calc(100%-24px)] w-[2px] bg-gradient-to-b from-emerald-300/40 via-white/15 to-violet-300/25 md:block" />

        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((st, idx) => (
            <div
              key={st.title}
              className="relative rounded-2xl border border-white/10 bg-[#070A14]/35 p-5"
            >
              <div className="absolute left-0 top-0 h-full w-full rounded-2xl bg-[radial-gradient(600px_260px_at_30%_10%,rgba(33,243,140,0.08),transparent_55%)] opacity-70" />

              <div className="relative flex items-start gap-3">
                <div
                  className={cx(
                    "mt-0.5 h-7 w-7 shrink-0 rounded-full border backdrop-blur",
                    st.accent === "violet"
                      ? "border-violet-300/30 bg-violet-300/10"
                      : "border-emerald-300/30 bg-emerald-300/10"
                  )}
                >
                  <div
                    className={cx(
                      "mx-auto mt-[9px] h-2 w-2 rounded-full",
                      st.accent === "violet" ? "bg-violet-300" : "bg-emerald-300"
                    )}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/55">
                    Step {String(idx + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {st.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/70">
                    {st.note}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* bottom rule */}
        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <p className="mt-3 text-xs leading-relaxed text-white/60">
          Built as a production-ready XR system: reliable tracking, predictable
          performance, and clean integration points — not just a pretty demo.
        </p>
      </div>
    </div>
  );
}

export default function XRPortfolioSingleCaseStudyA() {
  const data = useMemo(() => {
    const moments: Moment[] = [
      {
        label: "ONBOARDING",
        title: "First 30 seconds that feel effortless",
        blurb:
          "Hands-only onboarding with quick calibration, safety cues, and one clear action that teaches the whole experience.",
        img: "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?auto=format&fit=crop&w=1600&q=70",
      },
      {
        label: "INTERACTION",
        title: "Tactile feedback without UI clutter",
        blurb:
          "Spatial affordances, subtle haptics, and constrained motion so users stay confident — even in noisy real-world environments.",
        img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1600&q=70",
      },
      {
        label: "DATA LAYER",
        title: "Live information as a calm overlay",
        blurb:
          "Context appears only when needed. Panels stay readable under motion and lighting changes with depth-aware placement.",
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=70",
      },
      {
        label: "MULTI-USER",
        title: "Shared state you can trust",
        blurb:
          "Low-latency sync with resilient recovery. Users stay aligned even when networking fluctuates or sessions restart.",
        img: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1600&q=70",
      },
      {
        label: "MEASUREMENT",
        title: "Outcomes tracked, not guessed",
        blurb:
          "Analytics built into the core loop: completion, errors, dwell time, and comfort signals — tied to business KPIs.",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=70",
      },
    ];

    const specs = [
      { label: "Devices", value: "Quest 3 • Vision Pro • Pico 4" },
      { label: "Engine", value: "Unity + OpenXR" },
      { label: "Target", value: "90 FPS (comfort-first)" },
      { label: "Deployment", value: "Enterprise (MDM-ready)" },
      { label: "Mode", value: "Offline-first + Sync" },
      { label: "Sessions", value: "3–8 minutes" },
      { label: "Team", value: "6–8 specialists" },
      { label: "Timeline", value: "8 weeks → Pilot" },
    ];

    const problem = {
      title: "An XR experience that works in the real world — not just in perfect conditions.",
      body: [
        "The client needed an XR training simulation that felt intuitive for first-time users, stayed stable across devices, and ran smoothly under real-world lighting, space, and network constraints.",
        "Our job was to make the experience feel simple while the system stayed bulletproof: reliable tracking, predictable comfort, and clean measurement tied to outcomes.",
      ],
      constraints: [
        "Variable lighting + reflective surfaces",
        "Users unfamiliar with XR (zero training)",
        "Comfort constraints (motion sensitivity)",
        "Thermal limits + battery session budgeting",
        "Offline operation with later sync",
        "Device fragmentation (input + OS differences)",
      ],
    };

    const chapters: Chapter[] = [
      {
        kicker: "CHAPTER 01",
        title: "Onboarding that teaches the entire experience",
        body:
          "We designed the first 30 seconds to communicate everything: how to move, what is interactive, and how to recover if something goes wrong — without dumping instructions.",
        img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1600&q=70",
        bullets: [
          "Hands-first onboarding with a single clear action",
          "Safety cues: boundaries, comfort reminders, pacing",
          "Instant success moment to build trust",
        ],
      },
      {
        kicker: "CHAPTER 02",
        title: "A core loop that stays calm under pressure",
        body:
          "Instead of more UI, we used spatial affordances and feedback timing. Users never feel blocked — even when they make mistakes.",
        img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1600&q=70",
        bullets: [
          "Depth-aware prompts that appear only when needed",
          "Progress feedback through motion + sound + micro-haptics",
          "Guardrails for edge cases and easy recovery",
        ],
      },
      {
        kicker: "CHAPTER 03",
        title: "Measurement built into the loop",
        body:
          "We treated analytics as a first-class feature. The experience emits structured events so outcomes can be evaluated — not assumed.",
        img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1600&q=70",
        bullets: [
          "Event schema aligned to training KPIs",
          "Session replay breadcrumbs (privacy-safe)",
          "Comfort signals captured to refine pacing",
        ],
      },
    ];

    const systemA: SystemBlock = {
      kicker: "SYSTEMS",
      title: "Architecture that stays stable across devices",
      body:
        "A clean runtime pipeline: input → interaction → state → rendering → measurement. Built with predictable failure modes and graceful recovery.",
      points: [
        { label: "Input", value: "Hands + Controllers", note: "OpenXR actions" },
        { label: "State", value: "Deterministic Core", note: "Rejoin-safe" },
        { label: "Rendering", value: "Budgeted Frames", note: "90 FPS target" },
        { label: "Analytics", value: "Event Stream", note: "Offline-first" },
      ],
    };

    const systemB: SystemBlock = {
      kicker: "PERFORMANCE",
      title: "Comfort-first performance and thermal discipline",
      body:
        "XR is unforgiving. We set budgets early, then designed the visuals to feel premium inside those budgets — without spikes.",
      points: [
        { label: "Target FPS", value: "90", note: "Comfort baseline" },
        { label: "Lighting", value: "Baked + Probes", note: "Stable + cheap" },
        { label: "Assets", value: "LOD + Streaming", note: "No stutters" },
        { label: "UI", value: "Depth-safe Panels", note: "Readable motion" },
      ],
    };

    const trackSteps = [
      { title: "Sensors & Inputs", note: "Hands, controllers, eye/passthrough hooks where available.", accent: "green" as const },
      { title: "Interaction Layer", note: "Unified affordances: grab, poke, gaze — consistent across devices.", accent: "green" as const },
      { title: "State & Sync", note: "Resilient state with optional multi-user sync + reconnect recovery.", accent: "violet" as const },
      { title: "Rendering Budget", note: "Strict frame budgeting, LOD discipline, and stable lighting strategy.", accent: "green" as const },
      { title: "Telemetry & KPIs", note: "Offline-first event stream: outcomes measured and exportable.", accent: "violet" as const },
      { title: "Deployment", note: "Enterprise distribution, device fleet management ready.", accent: "green" as const },
    ];

    const outcomes = [
      { label: "Training time reduced", value: "−32%", note: "Pilot group vs baseline" },
      { label: "First-try completion", value: "+41%", note: "Improved onboarding + recovery" },
      { label: "Comfort complaints", value: "−58%", note: "Motion decisions + pacing" },
      { label: "Deployments", value: "3 sites", note: "Enterprise rollout" },
    ];

    const gallery = [
      {
        title: "In-headset onboarding frame",
        img: "https://images.unsplash.com/photo-1618477371303-b2a56f422d9e?auto=format&fit=crop&w=1600&q=70",
        variant: "scene" as const,
      },
      {
        title: "Spatial UI panel (depth-safe)",
        img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=70",
        variant: "ui" as const,
      },
      {
        title: "System dashboard / telemetry",
        img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=70",
        variant: "ui" as const,
      },
      {
        title: "Device fleet / deployment context",
        img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=70",
        variant: "device" as const,
      },
    ];

    return {
      moments,
      specs,
      problem,
      chapters,
      systemA,
      systemB,
      trackSteps,
      outcomes,
      gallery,
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070A14] text-white">
      <div className="relative overflow-hidden">
        <GlowField />

        {/* top subtle grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent_70%)] opacity-50" />
        </div>

        {/* ===================================================================================
            HERO — xrcs-hero
        =================================================================================== */}
        <section id="xrcs-hero" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Chip tone="green">XR Case Study</Chip>
              <Chip tone="violet">Idea A — Moment Reel</Chip>
              <Chip>Wodh Canon</Chip>
            </div>

            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              {/* Left copy */}
              <div className="md:col-span-6">
                <div className="relative">
                  {/* Heading halo */}
                  <div className="pointer-events-none absolute -left-10 -top-12 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
                  <div className="pointer-events-none absolute left-32 top-0 h-32 w-32 rounded-full bg-violet-500/12 blur-3xl" />
                  <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">
                    Training Simulation • Multi-device • Offline-first
                  </p>
                  <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                    A calm XR experience —
                    <span className="text-white/80"> backed by </span>
                    <span className="bg-gradient-to-r from-emerald-200 via-white/90 to-violet-200 bg-clip-text text-transparent">
                      production-grade systems
                    </span>
                    .
                  </h1>
                  <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/75 sm:text-base">
                    Dummy case study content — replace with real data later. This layout is
                    built to tell two stories at once: <span className="text-emerald-200/90">the experience</span>{" "}
                    users feel in-headset, and the <span className="text-violet-200/90">engineering</span> that makes it reliable
                    in the real world.
                  </p>
                </div>

                {/* Device pills */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <Chip tone="green">Meta Quest 3</Chip>
                  <Chip tone="green">Apple Vision Pro</Chip>
                  <Chip tone="green">Pico 4</Chip>
                  <Chip className="hidden sm:inline-flex">90 FPS Target</Chip>
                </div>

                {/* CTAs */}
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#xrcs-experience"
                    className="inline-flex items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-100 backdrop-blur-xl transition hover:bg-emerald-300/15"
                  >
                    Watch the walkthrough
                    <span className="ml-2 text-emerald-200/90">→</span>
                  </a>
                  <a
                    href="#xrcs-system"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/10"
                  >
                    Jump to systems proof
                  </a>
                </div>

                {/* Small trust line */}
                <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/55">
                    What you’re seeing
                  </p>
                  <p className="mt-1 text-sm text-white/75">
                    A single-page XR case study rhythm with reliable image fallback, glow discipline,
                    and alternating narrative blocks (Experience ↔ Systems).
                  </p>
                </div>
              </div>

              {/* Right reel */}
              <div className="md:col-span-6">
                <MomentReel moments={data.moments} />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            QUICK FACTS — xrcs-quickfacts
        =================================================================================== */}
        <section id="xrcs-quickfacts" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <Chip>Quick Facts</Chip>
                <Chip tone="green">XR Specs</Chip>
                <Chip tone="violet">Production Constraints</Chip>
              </div>
              <SpecStrip specs={data.specs} />
            </div>
          </div>
        </section>

        {/* ===================================================================================
            PROBLEM — xrcs-problem
        =================================================================================== */}
        <section id="xrcs-problem" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="THE PROBLEM"
              title={data.problem.title}
              lead={data.problem.body.join(" ")}
              accent="green"
            />

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/55">
                    Real-world constraints
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {data.problem.constraints.map((c) => (
                      <div
                        key={c}
                        className="rounded-2xl border border-white/10 bg-[#070A14]/35 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300/80" />
                          <p className="text-sm text-white/80">{c}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    We treated constraints as design inputs. Comfort, performance, and recovery paths were built into the
                    experience — not added at the end.
                  </p>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(124,58,237,0.12),transparent_70%)]" />
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-[0.26em] text-violet-200/80">
                      Outcome lens
                    </p>
                    <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white">
                      “Make it feel simple.”
                      <span className="text-white/70"> (while the system stays bulletproof)</span>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      The best XR work disappears. Users feel clarity and confidence — and the engineering quietly enforces
                      stability, measurement, and deployment readiness.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Chip tone="green">Comfort-first</Chip>
                      <Chip tone="violet">Recovery paths</Chip>
                      <Chip>Offline-first telemetry</Chip>
                    </div>
                  </div>

                  <div className="border-t border-white/10 p-4">
                    <p className="text-xs text-white/60">
                      Tip: when you add real content, keep this block as your editorial anchor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            EXPERIENCE WALKTHROUGH — xrcs-experience
        =================================================================================== */}
        <section id="xrcs-experience" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="EXPERIENCE WALKTHROUGH"
              title="Three chapters that show what users feel — and why it works."
              lead="Each chapter is paired with a systems block. The experience stays human. The proof stays technical."
              accent="green"
            />

            <div className="space-y-6">
              {data.chapters.map((ch, idx) => {
                const flip = idx % 2 === 1;
                return (
                  <div
                    key={ch.title}
                    className={cx(
                      "grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:grid-cols-12 md:gap-6 md:p-6"
                    )}
                  >
                    <div className={cx("md:col-span-6", flip && "md:order-2")}>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Chip tone="green">{ch.kicker}</Chip>
                        <Chip tone="violet">Experience Layer</Chip>
                      </div>

                      <h3 className="text-balance text-xl font-semibold tracking-[-0.02em] text-white">
                        {ch.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">
                        {ch.body}
                      </p>

                      {ch.bullets?.length ? (
                        <ul className="mt-4 space-y-2">
                          {ch.bullets.map((b) => (
                            <li key={b} className="flex gap-3 text-sm text-white/75">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>

                    <div className={cx("md:col-span-6", flip && "md:order-1")}>
                      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#070A14]/35">
                        <div className="pointer-events-none absolute -inset-24 opacity-0 transition duration-500 group-hover:opacity-100">
                          <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-emerald-400/18 blur-3xl" />
                          <div className="absolute right-10 bottom-10 h-32 w-32 rounded-full bg-violet-500/12 blur-3xl" />
                        </div>

                        <div className="relative aspect-[16/10]">
                          <SafeImage
                            src={ch.img}
                            alt={ch.title}
                            fallbackVariant="scene"
                            className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/70 via-[#070A14]/20 to-transparent" />
                        </div>

                        <div className="p-4">
                          <p className="text-xs uppercase tracking-[0.26em] text-white/55">
                            Frame note
                          </p>
                          <p className="mt-1 text-sm text-white/70">
                            Replace this with a headset capture or spatial UI panel for maximum credibility.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dual narrative pivot */}
            <div className="mt-8 grid gap-4 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.26em] text-emerald-200/80">
                    The shift
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white">
                    Now we show the systems that make the experience reliable.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    XR credibility comes from predictable performance, comfort discipline, and integration clarity — not buzzwords.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Chip tone="green">Budgeted frames</Chip>
                    <Chip tone="violet">Rejoin-safe state</Chip>
                    <Chip>MDM-ready deployment</Chip>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7">
                <ConnectedTrack steps={data.trackSteps} />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            SYSTEMS — xrcs-system
        =================================================================================== */}
        <section id="xrcs-system" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker={data.systemA.kicker}
              title={data.systemA.title}
              lead={data.systemA.body}
              accent="violet"
            />

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Chip tone="green">Runtime pipeline</Chip>
                    <Chip tone="violet">Recovery-ready</Chip>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {data.systemA.points.map((p) => (
                      <div
                        key={p.label}
                        className="rounded-2xl border border-white/10 bg-[#070A14]/35 p-5"
                      >
                        <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">
                          {p.label}
                        </p>
                        <p className="mt-2 text-base font-semibold text-white">
                          {p.value}
                        </p>
                        {p.note ? (
                          <p className="mt-2 text-sm text-white/65">{p.note}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    The goal wasn’t “more features.” It was stability under real constraints — with clean places to extend:
                    analytics, integrations, and multi-user layers.
                  </p>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(124,58,237,0.14),transparent_70%)]" />

                  <div className="relative">
                    <Chip tone="violet">Integration surface</Chip>
                    <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white">
                      Designed for enterprise hooks
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Offline-first event stream, optional SSO, and clean APIs so deployments don’t become a maze.
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {["SSO", "LMS", "Webhooks", "Analytics"].map((t) => (
                        <div
                          key={t}
                          className="rounded-2xl border border-white/10 bg-[#070A14]/35 px-4 py-3 text-sm text-white/80"
                        >
                          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-violet-300/80" />
                          {t}
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-2xl border border-emerald-300/15 bg-emerald-300/5 p-4">
                      <p className="text-xs uppercase tracking-[0.26em] text-emerald-200/80">
                        Practical note
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        When you share real case data, we’ll swap these into real integrations (SAP, Dynamics, custom APIs, etc.).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PERFORMANCE BLOCK */}
            <div className="mt-10">
              <SectionHeader
                kicker={data.systemB.kicker}
                title={data.systemB.title}
                lead={data.systemB.body}
                accent="green"
              />

              <div className="grid gap-4 md:grid-cols-12">
                <div className="md:col-span-8">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {data.systemB.points.map((p) => (
                        <div
                          key={p.label}
                          className="rounded-2xl border border-white/10 bg-[#070A14]/35 p-5"
                        >
                          <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">
                            {p.label}
                          </p>
                          <p className="mt-2 text-base font-semibold text-white">
                            {p.value}
                          </p>
                          {p.note ? (
                            <p className="mt-2 text-sm text-white/65">{p.note}</p>
                          ) : null}
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      We chose a visual style that looks premium inside budgets: controlled glow, stable lighting, and readable panels.
                      The result is calm comfort — not flashy chaos.
                    </p>
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/16 blur-3xl" />

                    <Chip tone="green">Comfort decisions</Chip>
                    <ul className="mt-4 space-y-3 text-sm text-white/75">
                      {[
                        "Snap turn + gentle acceleration limits",
                        "No forced continuous locomotion by default",
                        "Vignette only when needed (contextual)",
                        "Clear rest states & session pacing",
                      ].map((t) => (
                        <li key={t} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 rounded-2xl border border-violet-300/15 bg-violet-300/5 p-4">
                      <p className="text-xs uppercase tracking-[0.26em] text-violet-200/80">
                        Why this matters
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        Comfort isn’t a feature — it’s the baseline. Without it, outcomes never happen.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            OUTCOMES — xrcs-outcomes
        =================================================================================== */}
        <section id="xrcs-outcomes" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="OUTCOMES"
              title="Measured results — tied to real usage."
              lead="Dummy metrics for now. Replace with pilot numbers, analytics snapshots, or client KPIs."
              accent="green"
            />

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-8">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {data.outcomes.map((o) => (
                      <div
                        key={o.label}
                        className="rounded-2xl border border-white/10 bg-[#070A14]/35 p-5"
                      >
                        <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">
                          {o.label}
                        </p>
                        <p className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white">
                          <span className="bg-gradient-to-r from-emerald-200 via-white/90 to-violet-200 bg-clip-text text-transparent">
                            {o.value}
                          </span>
                        </p>
                        <p className="mt-2 text-sm text-white/65">{o.note}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    Outcomes are only trustworthy when measurement is built-in. This page structure makes room for “what we
                    measured” and “how we measured” without turning into a report.
                  </p>
                </div>
              </div>

              <div className="md:col-span-4">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(33,243,140,0.10),transparent_70%)]" />
                  <Chip tone="violet">What we measured</Chip>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white">
                    The signals that matter
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Completion, errors, time-to-competency, and comfort indicators. The system emits events you can trust — even offline.
                  </p>

                  <div className="mt-5 space-y-2">
                    {[
                      "Completion rate",
                      "Critical errors",
                      "Dwell time per step",
                      "Comfort drop-offs",
                      "Session re-entries",
                    ].map((t) => (
                      <div
                        key={t}
                        className="rounded-2xl border border-white/10 bg-[#070A14]/35 px-4 py-3 text-sm text-white/80"
                      >
                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-violet-300/80" />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            GALLERY — xrcs-gallery
        =================================================================================== */}
        <section id="xrcs-gallery" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="GALLERY"
              title="Frames, panels, and system context."
              lead="Curated — not a dump. Swap these with your real headset frames, UI captures, and deployment photos."
              accent="violet"
            />

            <div className="grid gap-4 md:grid-cols-12">
              {data.gallery.map((g, i) => (
                <div
                  key={g.title}
                  className={cx(
                    "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl",
                    i === 0 ? "md:col-span-7" : "md:col-span-5"
                  )}
                >
                  <div className="pointer-events-none absolute -inset-24 opacity-0 transition duration-500 group-hover:opacity-100">
                    <div className="absolute left-10 top-10 h-36 w-36 rounded-full bg-emerald-400/16 blur-3xl" />
                    <div className="absolute right-10 bottom-10 h-36 w-36 rounded-full bg-violet-500/12 blur-3xl" />
                  </div>

                  <div className="relative aspect-[16/10]">
                    <SafeImage
                      src={g.img}
                      alt={g.title}
                      fallbackVariant={g.variant}
                      className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/75 via-[#070A14]/20 to-transparent" />
                  </div>

                  <div className="p-5">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">
                      {i === 0 ? "HERO FRAME" : "DETAIL"}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">
                      {g.title}
                    </p>
                    <p className="mt-1 text-sm text-white/65">
                      Replace this with your real asset — the layout remains stable even if images fail.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================================
            TESTIMONIAL — xrcs-testimonial
        =================================================================================== */}
        <section id="xrcs-testimonial" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Chip tone="violet">Testimonial</Chip>
                <Chip>Dummy quote</Chip>
              </div>

              <div className="grid gap-6 md:grid-cols-12 md:items-start">
                <div className="md:col-span-8">
                  <p className="text-balance text-xl font-semibold leading-snug tracking-[-0.02em] text-white sm:text-2xl">
                    “The experience felt effortless for first-time users — and the system stayed stable across devices.
                    We could finally measure outcomes with confidence.”
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5" />
                    <div>
                      <p className="text-sm font-semibold text-white">Head of Training</p>
                      <p className="text-sm text-white/60">Enterprise Client • (Replace later)</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="relative overflow-hidden rounded-2xl border border-emerald-300/15 bg-emerald-300/5 p-5">
                    <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-400/18 blur-3xl" />
                    <p className="text-xs uppercase tracking-[0.26em] text-emerald-200/80">
                      Snapshot
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      This block is where you’ll paste the real stack + deployment detail: devices, environment, and KPI focus.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Chip tone="green">Unity</Chip>
                      <Chip tone="green">OpenXR</Chip>
                      <Chip tone="violet">Telemetry</Chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            CTA — xrcs-cta
        =================================================================================== */}
        <section id="xrcs-cta" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl md:p-10">
              <div className="pointer-events-none absolute -inset-32 bg-[radial-gradient(closest-side,rgba(33,243,140,0.14),transparent_70%)]" />
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative grid gap-6 md:grid-cols-12 md:items-center">
                <div className="md:col-span-8">
                  <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">
                    Ready to turn this into a real case study?
                  </p>
                  <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                    Share your XR project details — we’ll replace the dummy content with production truth.
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                    If you don’t have metrics yet, we can structure the page around constraints, chapters, and system proof — then
                    swap in numbers after the pilot.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Chip tone="green">Experience-first</Chip>
                    <Chip tone="violet">Systems proof</Chip>
                    <Chip>Enterprise-ready tone</Chip>
                    <Chip>Fallback-safe media</Chip>
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="grid gap-3">
                    <a
                      href="#xrcs-hero"
                      className="inline-flex items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-100 backdrop-blur-xl transition hover:bg-emerald-300/15"
                    >
                      Back to top
                      <span className="ml-2 text-emerald-200/90">↑</span>
                    </a>
                    <a
                      href="#xrcs-quickfacts"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/10"
                    >
                      Jump to quick facts
                    </a>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-[#070A14]/35 p-4">
                    <p className="text-xs uppercase tracking-[0.26em] text-white/55">
                      Next step
                    </p>
                    <p className="mt-1 text-sm text-white/70">
                      When you’re ready, paste your case study data (even rough). I’ll wire it into this structure cleanly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer micro */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-white/55">
              <p>© Wodh — XR Studio • Case Study Single</p>
              <div className="flex items-center gap-3">
                <a href="#xrcs-system" className="hover:text-white/75">
                  Systems
                </a>
                <a href="#xrcs-outcomes" className="hover:text-white/75">
                  Outcomes
                </a>
                <a href="#xrcs-gallery" className="hover:text-white/75">
                  Gallery
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
