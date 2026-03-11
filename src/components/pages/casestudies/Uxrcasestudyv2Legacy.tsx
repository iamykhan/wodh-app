"use client";

import React, { useEffect, useMemo, useState } from "react";

/* =======================================================================================
   WODH — XR Portfolio Single (Case Study)
   Idea B — Device-Lens Case Study (Quest / Vision Pro / Pico)
   - One page, but content “lenses” switch per device:
     specs, constraints, moments, performance notes, outcomes, gallery
   - Dark indigo/black base, Neon Green primary, Violet secondary ink
   - Dummy data included (swap later)
   - SafeImage fallback (page never looks broken)
======================================================================================= */

type DeviceKey = "quest" | "vision" | "pico";

type Device = {
  key: DeviceKey;
  name: string;
  short: string;
  tone?: "green" | "violet";
  headline: string;
  subline: string;
  chips: string[];
  heroImg: string;

  quickFacts: { label: string; value: string }[];
  constraints: string[];
  moments: { label: string; title: string; blurb: string; img: string }[];
  chapters: { kicker: string; title: string; body: string; bullets: string[]; img: string }[];
  performance: { label: string; value: string; note?: string }[];
  comfort: string[];
  outcomes: { label: string; value: string; note: string }[];
  gallery: { title: string; img: string; variant: "scene" | "ui" | "device" }[];
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
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
          <text x="90" y="140" font-size="36" opacity="0.85">XR Placeholder</text>
          <text x="90" y="190" font-size="18" opacity="0.55">Replace with real captures. Layout stays stable.</text>
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

function GlowField() {
  return (
    <>
      <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-[62%] h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_10%,rgba(33,243,140,0.12),transparent_60%),radial-gradient(900px_600px_at_80%_30%,rgba(124,58,237,0.10),transparent_60%),radial-gradient(900px_900px_at_20%_80%,rgba(33,243,140,0.08),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_700px_at_50%_70%,rgba(255,255,255,0.06),transparent_60%)] opacity-40" />
    </>
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
        <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-white/25" />
        <p className={cx("text-xs uppercase tracking-[0.28em]", kickerTone)}>{kicker}</p>
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

function SegmentedDeviceControl({
  value,
  onChange,
  compact = false,
}: {
  value: DeviceKey;
  onChange: (k: DeviceKey) => void;
  compact?: boolean;
}) {
  const items: { key: DeviceKey; label: string; hint: string; tone?: "green" | "violet" }[] = [
    { key: "quest", label: "Meta Quest", hint: "Thermals + FPS discipline", tone: "green" },
    { key: "vision", label: "Vision Pro", hint: "Fidelity + comfort clarity", tone: "violet" },
    { key: "pico", label: "Pico", hint: "Consistency + deployment", tone: "green" },
  ];

  return (
    <div
      className={cx(
        "rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl",
        compact ? "w-full" : "w-full sm:w-fit"
      )}
      role="tablist"
      aria-label="Device lens selector"
    >
      <div className={cx("grid gap-1", compact ? "grid-cols-3" : "grid-cols-3")}>
        {items.map((it) => {
          const active = value === it.key;
          const activeClass =
            it.tone === "violet"
              ? "border-violet-300/35 bg-violet-300/12 text-violet-100"
              : "border-emerald-300/35 bg-emerald-300/12 text-emerald-100";

          return (
            <button
              key={it.key}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(it.key)}
              className={cx(
                "group rounded-xl border px-3 py-2 text-left text-xs transition focus:outline-none focus:ring-2 focus:ring-emerald-300/30",
                active
                  ? activeClass
                  : "border-white/10 bg-white/0 text-white/70 hover:bg-white/7"
              )}
            >
              <div className={cx("flex items-center justify-between gap-2")}>
                <span className="font-semibold tracking-[-0.01em]">{it.label}</span>
                <span
                  className={cx(
                    "h-1.5 w-1.5 rounded-full",
                    active
                      ? it.tone === "violet"
                        ? "bg-violet-300"
                        : "bg-emerald-300"
                      : "bg-white/25"
                  )}
                />
              </div>
              <div className={cx("mt-1 hidden text-[11px] leading-snug sm:block", active ? "text-white/70" : "text-white/45")}>
                {it.hint}
              </div>
            </button>
          );
        })}
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
          <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">{s.label}</p>
          <p className="mt-1 text-sm font-semibold text-white">{s.value}</p>
        </div>
      ))}
    </div>
  );
}

function StickyLensBar({
  device,
  setDevice,
}: {
  device: DeviceKey;
  setDevice: (k: DeviceKey) => void;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // show after a small scroll so it feels intentional
      setShow(window.scrollY > 240);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cx(
        "fixed left-0 right-0 top-0 z-50 transition duration-300",
        show ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0 pointer-events-none"
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#070A14]/55 p-2 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Chip className="hidden sm:inline-flex">
              Device Lens
            </Chip>
            <a href="#xrcs-hero" className="text-xs text-white/70 hover:text-white/85">
              XR Case Study
            </a>
            <span className="text-white/25">/</span>
            <a href="#xrcs-quickfacts" className="text-xs text-white/60 hover:text-white/80">
              Quick Facts
            </a>
            <a href="#xrcs-system" className="hidden text-xs text-white/60 hover:text-white/80 sm:inline">
              Systems
            </a>
            <a href="#xrcs-gallery" className="hidden text-xs text-white/60 hover:text-white/80 sm:inline">
              Gallery
            </a>
          </div>

          <div className="w-[320px] max-w-[55vw]">
            <SegmentedDeviceControl value={device} onChange={setDevice} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

function MomentGrid({ moments }: { moments: Device["moments"] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>Moments</Chip>
          <Chip>Device-specific scenes</Chip>
        </div>

        <div className="hidden items-center gap-2 md:flex">
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

      <div className="grid gap-3 md:grid-cols-12">
        {/* Active big */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#070A14]/35 md:col-span-7">
          <div className="relative aspect-[16/10]">
            <SafeImage
              src={moments[active].img}
              alt={moments[active].title}
              fallbackVariant="scene"
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/80 via-[#070A14]/25 to-transparent" />
            <div className="pointer-events-none absolute -inset-16 opacity-0 transition duration-500 group-hover:opacity-100">
              <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-emerald-400/18 blur-3xl" />
              <div className="absolute right-10 bottom-10 h-32 w-32 rounded-full bg-violet-500/12 blur-3xl" />
            </div>
          </div>

          <div className="p-5">
            <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-200/80">
              {moments[active].label}
            </p>
            <p className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white">
              {moments[active].title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {moments[active].blurb}
            </p>
          </div>
        </div>

        {/* Thumbs */}
        <div className="grid gap-3 md:col-span-5">
          {moments.map((m, i) => (
            <button
              key={m.label}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cx(
                "group relative overflow-hidden rounded-2xl border text-left transition",
                i === active
                  ? "border-emerald-300/25 bg-white/7"
                  : "border-white/10 bg-white/5 hover:bg-white/7"
              )}
            >
              <div className="flex items-stretch gap-3 p-3">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#070A14]/35">
                  <SafeImage
                    src={m.img}
                    alt={m.title}
                    fallbackVariant="scene"
                    className="absolute inset-0 h-full w-full object-cover opacity-85 transition duration-500 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/70 via-[#070A14]/20 to-transparent" />
                </div>
                <div className="min-w-0 py-0.5">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">
                    {m.label}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-semibold text-white">
                    {m.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/60">
                    {m.blurb}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetricsGrid({ items }: { items: { label: string; value: string; note: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((o) => (
        <div
          key={o.label}
          className="rounded-2xl border border-white/10 bg-[#070A14]/35 p-5"
        >
          <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">{o.label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-white">
            <span className="bg-gradient-to-r from-emerald-200 via-white/90 to-violet-200 bg-clip-text text-transparent">
              {o.value}
            </span>
          </p>
          <p className="mt-2 text-sm text-white/65">{o.note}</p>
        </div>
      ))}
    </div>
  );
}

export default function Uxrcasestudyv2Legacy() {
  const devices = useMemo<Record<DeviceKey, Device>>(() => {
    const baseTitle = "XR Training Simulation";
    return {
      quest: {
        key: "quest",
        name: "Meta Quest 3",
        short: "Quest",
        tone: "green",
        headline: `${baseTitle}, tuned for Quest’s thermals.`,
        subline:
          "This lens emphasizes frame stability, thermal discipline, and controller/hand parity under real-world lighting.",
        chips: ["90 FPS target", "Thermal budgeting", "Hands + Controllers", "Offline-first telemetry"],
        heroImg:
          "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1600&q=70",

        quickFacts: [
          { label: "Device", value: "Meta Quest 3" },
          { label: "Engine", value: "Unity + OpenXR" },
          { label: "Target", value: "90 FPS (comfort-first)" },
          { label: "Input", value: "Hands + Controllers" },
          { label: "Lighting", value: "Baked + probes" },
          { label: "Mode", value: "Offline-first + Sync" },
          { label: "Session", value: "3–8 min" },
          { label: "Deploy", value: "Enterprise / MDM-ready" },
        ],
        constraints: [
          "Thermal & battery pacing for consistent sessions",
          "Frame spikes kill comfort — strict budgets required",
          "Mixed input modes (hands/controllers) must stay consistent",
          "Variable lighting + reflective surfaces",
          "Offline operation with later sync",
          "Fast onboarding for first-time XR users",
        ],
        moments: [
          {
            label: "CALIBRATE",
            title: "Quick calibration without ceremony",
            blurb:
              "A single action teaches the interaction model. No walls of UI. Users feel confident immediately.",
            img: "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?auto=format&fit=crop&w=1600&q=70",
          },
          {
            label: "INTERACT",
            title: "Tactile affordances on a budget",
            blurb:
              "Feedback timing + constrained motion creates ‘tactility’ without expensive visuals.",
            img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1600&q=70",
          },
          {
            label: "RECOVER",
            title: "Edge-case recovery is the real UX",
            blurb:
              "If tracking drifts or user hesitates, the experience gently self-corrects and continues.",
            img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1600&q=70",
          },
          {
            label: "MEASURE",
            title: "Telemetry that survives offline",
            blurb:
              "Events queue locally, then sync. Outcomes remain measurable even in unreliable networks.",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=70",
          },
        ],
        chapters: [
          {
            kicker: "CHAPTER 01",
            title: "Onboarding built for first-time users",
            body:
              "Quest deployments often involve new XR users. The experience front-loads clarity: what’s interactive, what’s safe, what to do next.",
            bullets: ["Hands-first onboarding", "One success moment early", "Clear recovery cues"],
            img: "https://images.unsplash.com/photo-1618477371303-b2a56f422d9e?auto=format&fit=crop&w=1600&q=70",
          },
          {
            kicker: "CHAPTER 02",
            title: "Frame budgeting as a design tool",
            body:
              "We designed the visual language around stable performance: controlled glow, predictable lighting, and readable panels at motion.",
            bullets: ["Lighting discipline", "LOD + streaming", "Depth-safe UI"],
            img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=70",
          },
          {
            kicker: "CHAPTER 03",
            title: "Outcome measurement tied to the loop",
            body:
              "Events are emitted from the core loop (not bolted on). That keeps analytics meaningful and consistent.",
            bullets: ["Event schema aligned to KPIs", "Offline queue + later sync", "Comfort signals tracked"],
            img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1600&q=70",
          },
        ],
        performance: [
          { label: "FPS target", value: "90", note: "Comfort baseline; stable frametime" },
          { label: "Lighting", value: "Baked + probes", note: "Predictable + cheap" },
          { label: "Assets", value: "LOD + streaming", note: "No stutters; memory discipline" },
          { label: "UI", value: "Depth-safe panels", note: "Readable under motion + lighting" },
        ],
        comfort: [
          "Snap turn default, optional smooth turn",
          "No forced continuous locomotion by default",
          "Contextual vignette only when needed",
          "Clear rest states and session pacing",
        ],
        outcomes: [
          { label: "First-try completion", value: "+41%", note: "Onboarding + recovery improvements" },
          { label: "Comfort complaints", value: "−58%", note: "Motion + pacing decisions" },
          { label: "Training time", value: "−32%", note: "Pilot group vs baseline" },
          { label: "Offline sessions", value: "100%", note: "Telemetry retained and synced later" },
        ],
        gallery: [
          {
            title: "In-headset onboarding frame (Quest)",
            img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=70",
            variant: "scene",
          },
          {
            title: "UI panel close-up (budgeted)",
            img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=70",
            variant: "ui",
          },
          {
            title: "Telemetry / event stream view",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=70",
            variant: "ui",
          },
          {
            title: "Device fleet / enterprise context",
            img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=70",
            variant: "device",
          },
        ],
      },

      vision: {
        key: "vision",
        name: "Apple Vision Pro",
        short: "Vision Pro",
        tone: "violet",
        headline: `${baseTitle}, re-framed for Vision Pro clarity.`,
        subline:
          "This lens emphasizes spatial UI readability, visual fidelity discipline, and comfort clarity for longer attention spans.",
        chips: ["High fidelity", "Spatial UI clarity", "Comfort pacing", "Enterprise distribution"],
        heroImg:
          "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1600&q=70",

        quickFacts: [
          { label: "Device", value: "Apple Vision Pro" },
          { label: "Runtime", value: "OpenXR / VisionOS layer" },
          { label: "Focus", value: "Readability + comfort" },
          { label: "UI", value: "Spatial panels + depth rules" },
          { label: "Fidelity", value: "Premium visuals (budgeted)" },
          { label: "Mode", value: "Secure enterprise contexts" },
          { label: "Session", value: "5–12 min" },
          { label: "Deploy", value: "Enterprise distribution" },
        ],
        constraints: [
          "Spatial UI must be readable at depth, not just beautiful",
          "Avoid cognitive overload: fewer panels, more intent",
          "Fidelity discipline: premium look without noise",
          "Comfort pacing for longer attention spans",
          "Input modalities vary by scenario; interaction must stay obvious",
          "Enterprise expectations: privacy and stability",
        ],
        moments: [
          {
            label: "SETUP",
            title: "First view: calm, legible, intentional",
            blurb:
              "The scene opens with a single focal point. UI appears only when invited — never as clutter.",
            img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=70",
          },
          {
            label: "DEPTH",
            title: "Panels obey depth rules",
            blurb:
              "Readable size, stable anchoring, and consistent hierarchy — designed for comfort, not novelty.",
            img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1600&q=70",
          },
          {
            label: "FLOW",
            title: "A guided loop with fewer decisions",
            blurb:
              "We reduce branching. The system gently guides users through a high-confidence path.",
            img: "https://images.unsplash.com/photo-1618477371303-b2a56f422d9e?auto=format&fit=crop&w=1600&q=70",
          },
          {
            label: "PROOF",
            title: "Measurement without distraction",
            blurb:
              "Analytics is invisible to the user, but structured enough to tie behavior to outcomes.",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=70",
          },
        ],
        chapters: [
          {
            kicker: "CHAPTER 01",
            title: "Spatial UI that reads like editorial design",
            body:
              "We treated depth as typography. Hierarchy, spacing, and panel density were set to keep attention calm and focused.",
            bullets: ["Depth-safe hierarchy", "Minimal panel density", "Clear focal intent"],
            img: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1600&q=70",
          },
          {
            kicker: "CHAPTER 02",
            title: "Fidelity discipline: premium, not noisy",
            body:
              "We avoided ‘wow overload’. The look stays clean, with controlled glow and carefully limited motion.",
            bullets: ["Controlled glow", "Reduced visual noise", "Motion used only for meaning"],
            img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=70",
          },
          {
            kicker: "CHAPTER 03",
            title: "Comfort pacing and micro-rest states",
            body:
              "Longer sessions need pacing. We built natural rest moments and reduced cognitive spikes.",
            bullets: ["Intentional pacing", "Rest states", "Clear recovery behaviors"],
            img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1600&q=70",
          },
        ],
        performance: [
          { label: "Priority", value: "Readability", note: "Spatial UI that stays calm" },
          { label: "Motion", value: "Meaningful only", note: "No decorative motion loops" },
          { label: "Fidelity", value: "Premium + restrained", note: "Controlled glow, clean lighting" },
          { label: "Privacy", value: "Enterprise-friendly", note: "Measurement without leakage" },
        ],
        comfort: [
          "Less branching: fewer decisions, clearer intent",
          "Micro-rest states embedded in the loop",
          "Motion only when it communicates state",
          "UI density capped by depth rules",
        ],
        outcomes: [
          { label: "Time-to-clarity", value: "−45%", note: "Users understand the flow faster" },
          { label: "UI errors", value: "−38%", note: "Depth + hierarchy improvements" },
          { label: "Session completion", value: "+29%", note: "Pacing + rest states" },
          { label: "User confidence", value: "+33%", note: "Reduced cognitive spikes" },
        ],
        gallery: [
          {
            title: "Spatial UI panel (Vision lens)",
            img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=70",
            variant: "ui",
          },
          {
            title: "Fidelity detail: controlled glow",
            img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=70",
            variant: "scene",
          },
          {
            title: "Telemetry that stays invisible",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=70",
            variant: "ui",
          },
          {
            title: "Enterprise context / rollout",
            img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=70",
            variant: "device",
          },
        ],
      },

      pico: {
        key: "pico",
        name: "Pico 4",
        short: "Pico",
        tone: "green",
        headline: `${baseTitle}, optimized for consistency on Pico.`,
        subline:
          "This lens emphasizes predictable behavior across deployments: stable input, robust onboarding, and easy fleet rollout.",
        chips: ["Deployment consistency", "Stable UX", "Offline-first", "Fleet readiness"],
        heroImg:
          "https://images.unsplash.com/photo-1618477371303-b2a56f422d9e?auto=format&fit=crop&w=1600&q=70",

        quickFacts: [
          { label: "Device", value: "Pico 4" },
          { label: "Engine", value: "Unity + OpenXR" },
          { label: "Target", value: "72–90 FPS (scenario)" },
          { label: "Input", value: "Controllers-first" },
          { label: "Rollout", value: "Fleet / site installs" },
          { label: "Mode", value: "Offline-first + Sync" },
          { label: "Session", value: "3–10 min" },
          { label: "Ops", value: "Low-friction updates" },
        ],
        constraints: [
          "Consistency across many headsets/sites",
          "Controller-first UX must stay obvious",
          "Reliable update path for fleets",
          "Network variability across deployments",
          "Minimal training for operators",
          "Content must survive imperfect conditions",
        ],
        moments: [
          {
            label: "START",
            title: "No-friction start for fleets",
            blurb:
              "Operators can launch sessions quickly and repeatedly — no special setup ritual required.",
            img: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1600&q=70",
          },
          {
            label: "GUIDE",
            title: "Guided tasks that prevent dead ends",
            blurb:
              "We designed guardrails so users can’t block themselves, and operators can reset safely.",
            img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1600&q=70",
          },
          {
            label: "SYNC",
            title: "Offline-first with clean sync",
            blurb:
              "Sessions record locally and sync later, keeping outcome measurement consistent across sites.",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=70",
          },
          {
            label: "ROLL OUT",
            title: "Update path that doesn’t break ops",
            blurb:
              "We planned versioning and update cadence so fleets can keep running without surprises.",
            img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=70",
          },
        ],
        chapters: [
          {
            kicker: "CHAPTER 01",
            title: "Operator-friendly onboarding",
            body:
              "Fleets need predictability. The start flow is repeatable, fast, and safe for non-technical operators.",
            bullets: ["Repeatable start", "Simple resets", "Minimal training overhead"],
            img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=70",
          },
          {
            kicker: "CHAPTER 02",
            title: "Consistency beats cleverness",
            body:
              "We kept interactions consistent across scenarios to reduce confusion and operator support load.",
            bullets: ["Consistent affordances", "Clear failure states", "Predictable recovery"],
            img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1600&q=70",
          },
          {
            kicker: "CHAPTER 03",
            title: "Deployment discipline",
            body:
              "Versioning, content delivery, and analytics sync were designed from day one to support multi-site rollout.",
            bullets: ["Versioned content", "Safe update cadence", "Site-based analytics"],
            img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=70",
          },
        ],
        performance: [
          { label: "Stability", value: "Predictable UX", note: "Consistent input + guidance" },
          { label: "Rollout", value: "Fleet discipline", note: "Versioning + safe updates" },
          { label: "Analytics", value: "Site-based sync", note: "Offline-first events" },
          { label: "Ops", value: "Low support load", note: "Repeatable start + resets" },
        ],
        comfort: [
          "Guardrails prevent dead ends",
          "Clear recovery + reset affordances",
          "No motion spikes; pacing stays steady",
          "Operator control surfaces kept minimal",
        ],
        outcomes: [
          { label: "Operator setup time", value: "−52%", note: "Repeatable launch flow" },
          { label: "Support tickets", value: "−34%", note: "Consistency + recovery" },
          { label: "Site rollout", value: "6 locations", note: "Fleet-ready deployment" },
          { label: "Data completeness", value: "98%", note: "Offline-first event sync" },
        ],
        gallery: [
          {
            title: "Fleet start / operator view",
            img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=70",
            variant: "device",
          },
          {
            title: "Guided interaction frame",
            img: "https://images.unsplash.com/photo-1618477371303-b2a56f422d9e?auto=format&fit=crop&w=1600&q=70",
            variant: "scene",
          },
          {
            title: "Offline sync / telemetry panel",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=70",
            variant: "ui",
          },
          {
            title: "Deployment context / site rollout",
            img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=70",
            variant: "device",
          },
        ],
      },
    };
  }, []);

  const [deviceKey, setDeviceKey] = useState<DeviceKey>("quest");
  const d = devices[deviceKey];

  return (
    <div className="relative min-h-screen bg-[#070A14] text-white">
      <StickyLensBar device={deviceKey} setDevice={setDeviceKey} />

      <div className="relative overflow-hidden">
        <GlowField />

        {/* subtle grid */}
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
              <Chip>XR Case Study</Chip>
              <Chip>Idea B — Device Lens</Chip>
              <Chip>Dummy Data</Chip>
            </div>

            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              {/* Left */}
              <div className="md:col-span-6">
                <div className="relative">
                  <div className="pointer-events-none absolute -left-10 -top-12 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
                  <div className="pointer-events-none absolute left-32 top-0 h-32 w-32 rounded-full bg-violet-500/12 blur-3xl" />

                  <p
                    className={cx(
                      "text-xs uppercase tracking-[0.28em]",
                      d.tone === "violet" ? "text-violet-200/80" : "text-emerald-200/80"
                    )}
                  >
                    Device Lens: {d.name}
                  </p>

                  <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                    <span className="text-white/85">{d.headline.split(",")[0]},</span>{" "}
                    <span className="bg-gradient-to-r from-emerald-200 via-white/90 to-violet-200 bg-clip-text text-transparent">
                      {d.headline.split(",").slice(1).join(",").trim()}
                    </span>
                  </h1>

                  <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/75 sm:text-base">
                    {d.subline}
                  </p>
                </div>

                <div className="mt-6">
                  <SegmentedDeviceControl value={deviceKey} onChange={setDeviceKey} />
                  <p className="mt-2 text-xs text-white/55">
                    Switching devices updates the story: constraints, moments, performance, outcomes, and gallery.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {d.chips.map((c) => (
                    <Chip key={c} tone={d.tone === "violet" ? "violet" : "green"}>
                      {c}
                    </Chip>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#xrcs-quickfacts"
                    className="inline-flex items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-100 backdrop-blur-xl transition hover:bg-emerald-300/15"
                  >
                    Start with quick facts <span className="ml-2 text-emerald-200/90">→</span>
                  </a>
                  <a
                    href="#xrcs-system"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/10"
                  >
                    Jump to systems proof
                  </a>
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/55">Lens principle</p>
                  <p className="mt-1 text-sm text-white/75">
                    Same project. Different device realities. This page shows how the experience and engineering shift per headset —
                    without rewriting the whole case study.
                  </p>
                </div>
              </div>

              {/* Right hero media */}
              <div className="md:col-span-6">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
                  <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(33,243,140,0.10),transparent_70%)]" />
                  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070A14]/35">
                    <div className="relative aspect-[16/10]">
                      <SafeImage
                        src={d.heroImg}
                        alt={`${d.name} hero`}
                        fallbackVariant="scene"
                        className="absolute inset-0 h-full w-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/80 via-[#070A14]/25 to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip>Hero Frame</Chip>
                        <Chip tone={d.tone === "violet" ? "violet" : "green"}>{d.short} Lens</Chip>
                        <Chip>Fallback-safe</Chip>
                      </div>
                      <p className="mt-2 text-sm text-white/70">
                        Replace with your real headset capture. The layout stays premium even when assets are missing.
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {["Experience", "Systems", "Outcomes"].map((t, i) => (
                      <a
                        key={t}
                        href={i === 0 ? "#xrcs-moments" : i === 1 ? "#xrcs-system" : "#xrcs-outcomes"}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                      >
                        {t}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            QUICK FACTS — xrcs-quickfacts
        =================================================================================== */}
        <section id="xrcs-quickfacts" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="QUICK FACTS"
              title={`What changes on ${d.name}? The reality in one strip.`}
              lead="This is the ‘instant credibility’ block. Keep it tight and specific per device."
              accent={d.tone === "violet" ? "violet" : "green"}
            />

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <Chip>Specs</Chip>
                <Chip tone={d.tone === "violet" ? "violet" : "green"}>{d.short} Lens</Chip>
                <Chip>Production constraints</Chip>
              </div>
              <SpecStrip specs={d.quickFacts} />
            </div>
          </div>
        </section>

        {/* ===================================================================================
            CONSTRAINTS — xrcs-constraints
        =================================================================================== */}
        <section id="xrcs-constraints" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="CONSTRAINTS"
              title={`The constraints that shape the ${d.short} build.`}
              lead="XR case studies are trustworthy when constraints are explicit."
              accent={d.tone === "violet" ? "violet" : "green"}
            />

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Chip>Real-world</Chip>
                    <Chip>Engineering truth</Chip>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {d.constraints.map((c) => (
                      <div key={c} className="rounded-2xl border border-white/10 bg-[#070A14]/35 p-4">
                        <div className="flex items-start gap-3">
                          <span
                            className={cx(
                              "mt-1 h-2 w-2 rounded-full",
                              d.tone === "violet" ? "bg-violet-300/80" : "bg-emerald-300/80"
                            )}
                          />
                          <p className="text-sm text-white/80">{c}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    The device lens exists to show these tradeoffs clearly — and make the decisions feel intentional rather than “it depends.”
                  </p>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(124,58,237,0.14),transparent_70%)]" />
                  <div className="relative">
                    <Chip tone={d.tone === "violet" ? "violet" : "green"}>Lens note</Chip>
                    <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white">
                      Same story. Different pressure points.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Quest cares about stable performance. Vision cares about clarity and restraint. Pico cares about consistency at scale.
                      Your page should show that without sounding like excuses.
                    </p>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-[#070A14]/35 p-4">
                      <p className="text-xs uppercase tracking-[0.26em] text-white/55">What to swap later</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        Replace these constraints with real ones from your deployment: lighting, space, comfort, offline needs, SSO/compliance, etc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            MOMENTS — xrcs-moments
        =================================================================================== */}
        <section id="xrcs-moments" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="MOMENTS"
              title={`How the experience feels on ${d.name}.`}
              lead="Device-specific moments highlight what changes in UX and what stays consistent."
              accent="green"
            />
            <MomentGrid moments={d.moments} />
          </div>
        </section>

        {/* ===================================================================================
            EXPERIENCE CHAPTERS — xrcs-experience
        =================================================================================== */}
        <section id="xrcs-experience" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="EXPERIENCE"
              title={`Three chapters — written for the ${d.short} lens.`}
              lead="Editorial, specific, and short. Enough to feel premium without becoming a report."
              accent={d.tone === "violet" ? "violet" : "green"}
            />

            <div className="space-y-6">
              {d.chapters.map((ch, idx) => {
                const flip = idx % 2 === 1;
                return (
                  <div
                    key={ch.title}
                    className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:grid-cols-12 md:gap-6 md:p-6"
                  >
                    <div className={cx("md:col-span-6", flip && "md:order-2")}>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Chip>{ch.kicker}</Chip>
                        <Chip tone={d.tone === "violet" ? "violet" : "green"}>{d.short} lens</Chip>
                      </div>

                      <h3 className="text-balance text-xl font-semibold tracking-[-0.02em] text-white">
                        {ch.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">{ch.body}</p>

                      <ul className="mt-4 space-y-2">
                        {ch.bullets.map((b) => (
                          <li key={b} className="flex gap-3 text-sm text-white/75">
                            <span
                              className={cx(
                                "mt-2 h-1.5 w-1.5 rounded-full",
                                d.tone === "violet" ? "bg-violet-300/80" : "bg-emerald-300/80"
                              )}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={cx("md:col-span-6", flip && "md:order-1")}>
                      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#070A14]/35">
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
                          <p className="text-xs uppercase tracking-[0.26em] text-white/55">Replace later</p>
                          <p className="mt-1 text-sm text-white/70">
                            Swap this for a headset capture or UI panel that’s specific to {d.short}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================================
            SYSTEMS — xrcs-system
        =================================================================================== */}
        <section id="xrcs-system" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="SYSTEMS"
              title={`Systems proof — what we tuned for ${d.name}.`}
              lead="Keep this practical: the choices that protect stability, comfort, and deployability."
              accent="violet"
            />

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-8">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Chip>Performance</Chip>
                    <Chip>Comfort-first</Chip>
                    <Chip>{d.short} tuning</Chip>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {d.performance.map((p) => (
                      <div key={p.label} className="rounded-2xl border border-white/10 bg-[#070A14]/35 p-5">
                        <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">{p.label}</p>
                        <p className="mt-2 text-base font-semibold text-white">{p.value}</p>
                        {p.note ? <p className="mt-2 text-sm text-white/65">{p.note}</p> : null}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    The device lens keeps this honest: the same experience can be “the same,” but the engineering emphasis shifts.
                  </p>
                </div>
              </div>

              <div className="md:col-span-4">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/16 blur-3xl" />
                  <Chip>Comfort decisions</Chip>
                  <ul className="mt-4 space-y-3 text-sm text-white/75">
                    {d.comfort.map((t) => (
                      <li key={t} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 rounded-2xl border border-violet-300/15 bg-violet-300/5 p-4">
                    <p className="text-xs uppercase tracking-[0.26em] text-violet-200/80">Why this matters</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Comfort is the baseline. Without it, “features” don’t matter — outcomes never happen.
                    </p>
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
              title={`Measured outcomes — reported for the ${d.short} lens.`}
              lead="Dummy metrics for now. Replace with pilot numbers or client KPIs per device rollout."
              accent="green"
            />

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-8">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <MetricsGrid items={d.outcomes} />
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    A device lens is especially useful when outcomes differ by deployment context (training time, operator load, UI errors).
                  </p>
                </div>
              </div>

              <div className="md:col-span-4">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(33,243,140,0.10),transparent_70%)]" />
                  <Chip>Measurement note</Chip>
                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white">
                    What we measured (and why)
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Completion, errors, dwell time, and comfort drop-offs — tied to business KPIs. Logged offline, synced later.
                  </p>

                  <div className="mt-5 space-y-2">
                    {["Completion rate", "Critical errors", "Dwell time", "Comfort drop-offs", "Re-entries"].map((t) => (
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
              title={`Curated frames for ${d.name}.`}
              lead="This gallery swaps per lens. Keep it curated: in-headset frames, UI panels, and deployment context."
              accent={d.tone === "violet" ? "violet" : "green"}
            />

            <div className="grid gap-4 md:grid-cols-12">
              {d.gallery.map((g, i) => (
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
                      {i === 0 ? "PRIMARY" : "DETAIL"}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">{g.title}</p>
                    <p className="mt-1 text-sm text-white/65">
                      Replace with real {d.short} captures later. Page stays premium if assets fail.
                    </p>
                  </div>
                </div>
              ))}
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
                  <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Device lens locked</p>
                  <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                    When you share real case data, we’ll replace every lens cleanly.
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                    You can paste: per-device constraints, input mode, performance targets, screenshots, and outcomes. The structure is already built.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Chip>Quest</Chip>
                    <Chip>Vision Pro</Chip>
                    <Chip>Pico</Chip>
                    <Chip>One page • Three realities</Chip>
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="grid gap-3">
                    <a
                      href="#xrcs-hero"
                      className="inline-flex items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-100 backdrop-blur-xl transition hover:bg-emerald-300/15"
                    >
                      Back to top <span className="ml-2 text-emerald-200/90">↑</span>
                    </a>
                    <a
                      href="#xrcs-quickfacts"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/10"
                    >
                      Quick facts
                    </a>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-[#070A14]/35 p-4">
                    <p className="text-xs uppercase tracking-[0.26em] text-white/55">Tip</p>
                    <p className="mt-1 text-sm text-white/70">
                      Keep the device lens switcher. It’s the signature differentiator that makes this XR page feel “real”.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-white/55">
              <p>© Wodh — XR Studio • Case Study Single • Device Lens</p>
              <div className="flex items-center gap-3">
                <a href="#xrcs-constraints" className="hover:text-white/75">Constraints</a>
                <a href="#xrcs-system" className="hover:text-white/75">Systems</a>
                <a href="#xrcs-gallery" className="hover:text-white/75">Gallery</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
