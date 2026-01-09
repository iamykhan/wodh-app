"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/* =======================================================================================
   WODH — XR Portfolio Single (Case Study)
   Idea C — Field Guide / Operational Log
   Vibe: documentary, deployment-truth, enterprise credibility
   - Reads like an operational field guide: environment → constraints → log → decisions → rollout → measurement
   - Dark indigo/black base, neon green primary accent, violet secondary ink
   - Dummy data included (swap later)
   - SafeImage fallback (page never looks broken)
======================================================================================= */

type Tag = "EXPERIENCE" | "SYSTEMS" | "OPS" | "PERFORMANCE" | "MEASUREMENT" | "SAFETY";

type LogEntry = {
  id: string;
  day: string; // e.g., "D-14", "D-3", "D+7"
  dateLabel: string; // e.g., "Week 2", "Pilot Day"
  title: string;
  body: string;
  tags: Tag[];
  bullets?: string[];
  media?: { title: string; img: string; variant: "scene" | "ui" | "device" }[];
  severity?: "NOTE" | "RISK" | "BLOCKER";
};

type ChecklistItem = {
  label: string;
  status: "READY" | "IN-PROGRESS" | "BLOCKED";
  note: string;
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
          <text x="90" y="140" font-size="36" opacity="0.85">XR Field Guide Placeholder</text>
          <text x="90" y="190" font-size="18" opacity="0.55">Swap with headset captures / deployment photos.</text>
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

function TagPill({ tag, active, onClick }: { tag: Tag; active: boolean; onClick: () => void }) {
  const tone =
    tag === "SYSTEMS" || tag === "MEASUREMENT" ? "violet" : "green";

  const activeClass =
    tone === "violet"
      ? "border-violet-300/35 bg-violet-300/12 text-violet-100"
      : "border-emerald-300/35 bg-emerald-300/12 text-emerald-100";

  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full border px-3 py-1 text-xs tracking-wide backdrop-blur-xl transition",
        active ? activeClass : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
      )}
      aria-pressed={active}
    >
      {tag}
    </button>
  );
}

function StatusPill({ status }: { status: ChecklistItem["status"] }) {
  const styles =
    status === "READY"
      ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
      : status === "IN-PROGRESS"
      ? "border-white/15 bg-white/7 text-white/80"
      : "border-violet-300/25 bg-violet-300/10 text-violet-100";
  return (
    <span className={cx("rounded-full border px-2.5 py-1 text-[11px] tracking-[0.22em]", styles)}>
      {status}
    </span>
  );
}

function useStickyShow(threshold = 260) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return show;
}

export default function XRPortfolioSingle_FieldGuide() {
  const data = useMemo(() => {
    const quickFacts = [
      { label: "Devices", value: "Quest 3 • Vision Pro • Pico 4" },
      { label: "Engine", value: "Unity + OpenXR" },
      { label: "Target", value: "90 FPS (comfort-first)" },
      { label: "Mode", value: "Offline-first + Sync" },
      { label: "Deployment", value: "Enterprise (MDM-ready)" },
      { label: "Timeline", value: "8 weeks → Pilot" },
      { label: "Team", value: "6–8 specialists" },
      { label: "Sessions", value: "3–10 minutes" },
    ];

    const environment = {
      title: "The environment isn’t a lab. It’s real people, real lighting, real constraints.",
      body: [
        "This project was deployed for training in spaces that aren’t XR-perfect: mixed lighting, varying floor layouts, inconsistent network, and users with no headset experience.",
        "The goal of this page is operational truth: what we planned, what broke, what we changed, and what proved outcomes.",
      ],
      blocks: [
        { label: "Users", value: "First-time XR trainees", note: "Zero onboarding time" },
        { label: "Space", value: "Mixed room sizes", note: "Boundaries vary" },
        { label: "Lighting", value: "Variable / reflective", note: "Tracking stress" },
        { label: "Network", value: "Unreliable", note: "Offline-first required" },
      ],
      media: {
        title: "Deployment context (placeholder)",
        img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=70",
        variant: "device" as const,
      },
    };

    const constraints = [
      "Comfort discipline (motion sensitivity across users)",
      "Stable frame pacing (no spikes)",
      "Tracking robustness under poor lighting",
      "Offline operation with later sync",
      "Operator-friendly start/reset flows",
      "Device fragmentation (input + OS differences)",
      "Privacy expectations in enterprise environments",
    ];

    const checklist: ChecklistItem[] = [
      { label: "Comfort baseline", status: "READY", note: "Snap-turn + pacing, no forced locomotion" },
      { label: "Performance budgets", status: "READY", note: "Frame time targets + asset discipline" },
      { label: "Offline telemetry", status: "READY", note: "Local queue + later sync" },
      { label: "Operator reset path", status: "IN-PROGRESS", note: "Safe re-entry and session reset patterns" },
      { label: "SSO / enterprise hooks", status: "IN-PROGRESS", note: "Pluggable auth + integration surface" },
      { label: "Fleet rollout", status: "BLOCKED", note: "Waiting on MDM constraints from IT" },
    ];

    const log: LogEntry[] = [
      {
        id: "log-01",
        day: "D-21",
        dateLabel: "Week 1",
        title: "Field assumption audit (the ‘reality check’)",
        body:
          "Before building anything fancy, we listed every assumption that breaks in real deployments. This created our non-negotiables: comfort, stability, recovery, measurement.",
        tags: ["OPS", "SAFETY", "MEASUREMENT"],
        bullets: [
          "Defined worst-case lighting + space conditions",
          "Identified operator needs (launch, reset, monitor)",
          "Set outcome signals that matter (completion, errors, dwell time, comfort drop-offs)",
        ],
        severity: "NOTE",
      },
      {
        id: "log-02",
        day: "D-14",
        dateLabel: "Week 2",
        title: "Interaction model locked (hands + controllers parity)",
        body:
          "We committed to consistent interaction affordances across devices. Users should never feel that ‘this headset is different’ — only that the experience is clear.",
        tags: ["EXPERIENCE", "SYSTEMS"],
        bullets: ["Unified affordances: grab/poke/select", "Depth-safe UI hierarchy", "Clear recovery cues"],
        media: [
          {
            title: "Spatial affordances (placeholder)",
            img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1600&q=70",
            variant: "scene",
          },
        ],
        severity: "NOTE",
      },
      {
        id: "log-03",
        day: "D-10",
        dateLabel: "Week 3",
        title: "Performance budgets set (visual language redesigned around them)",
        body:
          "We treated performance as a design constraint. Instead of fighting budgets, we designed a premium look inside them: controlled glow, stable lighting, clean silhouettes.",
        tags: ["PERFORMANCE", "SYSTEMS"],
        bullets: ["Lighting: baked + probes", "LOD discipline", "No expensive ‘wow’ passes that spike frames"],
        severity: "RISK",
      },
      {
        id: "log-04",
        day: "D-7",
        dateLabel: "Week 4",
        title: "Tracking drift observed in reflective environments",
        body:
          "We saw drift patterns in reflective spaces. The fix wasn’t only technical; we also added ‘soft recovery’ UX so users don’t get stuck when tracking is imperfect.",
        tags: ["SAFETY", "EXPERIENCE", "SYSTEMS"],
        bullets: ["Recovery cues", "Re-center path", "Guardrails to prevent dead-ends"],
        severity: "RISK",
      },
      {
        id: "log-05",
        day: "D-3",
        dateLabel: "Week 6",
        title: "Offline-first telemetry implemented (events, not guesses)",
        body:
          "We built a structured event stream from the core loop. Sessions queue locally and sync later. This is what makes outcomes measurable in unreliable network conditions.",
        tags: ["MEASUREMENT", "OPS", "SYSTEMS"],
        bullets: ["Event schema aligned to KPIs", "Local queue", "Sync with idempotent replay"],
        media: [
          {
            title: "Telemetry view (placeholder)",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=70",
            variant: "ui",
          },
        ],
        severity: "NOTE",
      },
      {
        id: "log-06",
        day: "D+0",
        dateLabel: "Pilot Day",
        title: "Pilot rollout: operator flow mattered more than expected",
        body:
          "The experience was solid, but the operational flow (launch/reset/monitor) became the biggest real-world multiplier. We refined operator controls and reduced steps.",
        tags: ["OPS", "EXPERIENCE"],
        bullets: ["Simplified start flow", "Added safe reset", "Reduced operator decision points"],
        severity: "BLOCKER",
      },
      {
        id: "log-07",
        day: "D+7",
        dateLabel: "Week 8",
        title: "Outcomes stabilized (comfort drop-offs reduced)",
        body:
          "After pacing + recovery adjustments, drop-offs decreased. The experience stayed calm, and measurement confirmed improvements rather than ‘feeling better’.",
        tags: ["MEASUREMENT", "PERFORMANCE", "SAFETY"],
        bullets: ["Comfort complaints reduced", "Completion improved", "Errors reduced in tricky steps"],
        severity: "NOTE",
      },
    ];

    const outcomes = [
      { label: "Training time reduced", value: "−32%", note: "Pilot group vs baseline" },
      { label: "First-try completion", value: "+41%", note: "Onboarding + recovery improvements" },
      { label: "Comfort complaints", value: "−58%", note: "Motion + pacing decisions" },
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
        title: "Telemetry / analytics dashboard",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=70",
        variant: "ui" as const,
      },
      {
        title: "Deployment context / site rollout",
        img: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=70",
        variant: "device" as const,
      },
    ];

    return { quickFacts, environment, constraints, checklist, log, outcomes, gallery };
  }, []);

  const allTags: Tag[] = useMemo(
    () => ["EXPERIENCE", "SYSTEMS", "OPS", "PERFORMANCE", "MEASUREMENT", "SAFETY"],
    []
  );

  const [activeTags, setActiveTags] = useState<Tag[]>(["OPS", "EXPERIENCE"]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "log-06": true });

  const showSticky = useStickyShow(300);

  const filteredLog = useMemo(() => {
    if (!activeTags.length) return data.log;
    return data.log.filter((e) => e.tags.some((t) => activeTags.includes(t)));
  }, [data.log, activeTags]);

  const toggleTag = (tag: Tag) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const expandAll = () => {
    const map: Record<string, boolean> = {};
    filteredLog.forEach((e) => (map[e.id] = true));
    setExpanded(map);
  };
  const collapseAll = () => setExpanded({});

  const specRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen bg-[#070A14] text-white">
      {/* Sticky Field Guide Bar */}
      <div
        className={cx(
          "fixed left-0 right-0 top-0 z-50 transition duration-300",
          showSticky ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0 pointer-events-none"
        )}
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#070A14]/55 p-2 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <Chip tone="green" className="hidden sm:inline-flex">
                Field Guide
              </Chip>
              <button onClick={() => scrollTo("xrcs-hero")} className="text-xs text-white/70 hover:text-white/85">
                XR Case Study
              </button>
              <span className="text-white/25">/</span>
              <button onClick={() => scrollTo("xrcs-log")} className="text-xs text-white/60 hover:text-white/80">
                Log
              </button>
              <button onClick={() => scrollTo("xrcs-outcomes")} className="hidden text-xs text-white/60 hover:text-white/80 sm:inline">
                Outcomes
              </button>
              <button onClick={() => scrollTo("xrcs-gallery")} className="hidden text-xs text-white/60 hover:text-white/80 sm:inline">
                Gallery
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTags([])}
                className="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 transition hover:bg-white/10 sm:inline-flex"
              >
                Clear filters
              </button>
              <button
                onClick={() => (Object.keys(expanded).length ? collapseAll() : expandAll())}
                className="rounded-xl border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-300/15"
              >
                {Object.keys(expanded).length ? "Collapse" : "Expand"} entries
              </button>
            </div>
          </div>
        </div>
      </div>

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
              <Chip tone="green">XR Case Study</Chip>
              <Chip tone="violet">Idea C — Field Guide</Chip>
              <Chip>Operational Log</Chip>
            </div>

            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              <div className="md:col-span-6">
                <div className="relative">
                  <div className="pointer-events-none absolute -left-10 -top-12 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
                  <div className="pointer-events-none absolute left-32 top-0 h-32 w-32 rounded-full bg-violet-500/12 blur-3xl" />

                  <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">
                    Documentary deployment truth • comfort-first • outcome-led
                  </p>
                  <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                    XR, as it actually ships:
                    <span className="text-white/80"> constraints, </span>
                    <span className="bg-gradient-to-r from-emerald-200 via-white/90 to-violet-200 bg-clip-text text-transparent">
                      decisions, and proof
                    </span>
                    .
                  </h1>

                  <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/75 sm:text-base">
                    This page is written like a field report. Not a marketing gallery — an operational guide:
                    what we assumed, what broke, what we changed, and what outcomes we measured.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <Chip tone="green">Quest • Vision Pro • Pico</Chip>
                  <Chip tone="green">Offline-first telemetry</Chip>
                  <Chip tone="violet">Enterprise rollout</Chip>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => scrollTo("xrcs-log")}
                    className="inline-flex items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-100 backdrop-blur-xl transition hover:bg-emerald-300/15"
                  >
                    Read the operational log <span className="ml-2 text-emerald-200/90">→</span>
                  </button>
                  <button
                    onClick={() => scrollTo("xrcs-outcomes")}
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/10"
                  >
                    Jump to outcomes
                  </button>
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/55">How to use this page</p>
                  <p className="mt-1 text-sm text-white/75">
                    Filter the log by tags (OPS / SYSTEMS / SAFETY / MEASUREMENT). Expand entries when you want the details.
                    This structure is perfect when you don’t have “pretty media” yet.
                  </p>
                </div>
              </div>

              <div className="md:col-span-6">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
                  <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(33,243,140,0.10),transparent_70%)]" />
                  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070A14]/35">
                    <div className="relative aspect-[16/10]">
                      <SafeImage
                        src={data.environment.media.img}
                        alt={data.environment.media.title}
                        fallbackVariant={data.environment.media.variant}
                        className="absolute inset-0 h-full w-full object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/80 via-[#070A14]/25 to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip tone="green">Deployment context</Chip>
                        <Chip tone="violet">Documentary frame</Chip>
                        <Chip>Fallback-safe</Chip>
                      </div>
                      <p className="mt-2 text-sm text-white/70">
                        Swap this later with real rollout photos, headset captures, or a behind-the-scenes shot. This page remains solid without it.
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {[
                      { label: "Environment", id: "xrcs-environment" },
                      { label: "Operational Log", id: "xrcs-log" },
                      { label: "Checklist", id: "xrcs-checklist" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => scrollTo(t.id)}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                      >
                        {t.label}
                      </button>
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
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6" ref={specRef}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <Chip>Quick Facts</Chip>
                <Chip tone="green">XR Specs</Chip>
                <Chip tone="violet">Operational framing</Chip>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {data.quickFacts.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl transition hover:bg-white/7"
                  >
                    <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">{s.label}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            ENVIRONMENT — xrcs-environment
        =================================================================================== */}
        <section id="xrcs-environment" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="ENVIRONMENT"
              title={data.environment.title}
              lead={data.environment.body.join(" ")}
              accent="green"
            />

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.26em] text-white/55">Field context</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {data.environment.blocks.map((b) => (
                      <div key={b.label} className="rounded-2xl border border-white/10 bg-[#070A14]/35 p-5">
                        <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">{b.label}</p>
                        <p className="mt-2 text-base font-semibold text-white">{b.value}</p>
                        <p className="mt-2 text-sm text-white/65">{b.note}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    In XR, environment is the system. We designed comfort, recovery, and measurement to survive imperfect reality.
                  </p>
                </div>
              </div>

              <div className="md:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Chip tone="green">Constraints</Chip>
                    <Chip tone="violet">Non-negotiables</Chip>
                  </div>

                  <div className="space-y-2">
                    {data.constraints.map((c) => (
                      <div key={c} className="rounded-2xl border border-white/10 bg-[#070A14]/35 px-4 py-3 text-sm text-white/80">
                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                        {c}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-violet-300/15 bg-violet-300/5 p-4">
                    <p className="text-xs uppercase tracking-[0.26em] text-violet-200/80">Field rule</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      If a constraint is real, it should appear in the case study. That’s what makes the page believable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            CHECKLIST — xrcs-checklist
        =================================================================================== */}
        <section id="xrcs-checklist" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="OPERATIONAL CHECKLIST"
              title="What had to be true before we shipped a pilot."
              lead="This reads like an internal readiness sheet — and that’s the point."
              accent="violet"
            />

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Chip tone="green">Comfort</Chip>
                <Chip tone="violet">Ops readiness</Chip>
                <Chip>Deployment truth</Chip>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10">
                <div className="grid grid-cols-12 bg-[#070A14]/40 px-4 py-3 text-[11px] uppercase tracking-[0.26em] text-white/55">
                  <div className="col-span-5">Item</div>
                  <div className="col-span-3">Status</div>
                  <div className="col-span-4">Note</div>
                </div>
                {data.checklist.map((it, idx) => (
                  <div
                    key={it.label}
                    className={cx(
                      "grid grid-cols-12 items-center gap-2 px-4 py-4",
                      idx !== data.checklist.length - 1 ? "border-b border-white/10" : ""
                    )}
                  >
                    <div className="col-span-12 md:col-span-5">
                      <p className="text-sm font-semibold text-white">{it.label}</p>
                    </div>
                    <div className="col-span-12 md:col-span-3">
                      <StatusPill status={it.status} />
                    </div>
                    <div className="col-span-12 md:col-span-4">
                      <p className="text-sm text-white/70">{it.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                This checklist is a signature credibility block for XR. When you paste real data, these become your “trust anchors.”
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            LOG — xrcs-log
        =================================================================================== */}
        <section id="xrcs-log" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="OPERATIONAL LOG"
              title="Timeline of decisions — what changed, and why."
              lead="Filter by tags. Expand entries when you want details. This is the heart of the Field Guide concept."
              accent="green"
            />

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="green">Filter</Chip>
                {allTags.map((t) => (
                  <TagPill key={t} tag={t} active={activeTags.includes(t)} onClick={() => toggleTag(t)} />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={collapseAll}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 transition hover:bg-white/10"
                >
                  Collapse all
                </button>
                <button
                  onClick={expandAll}
                  className="rounded-xl border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-300/15"
                >
                  Expand all
                </button>
              </div>
            </div>

            <div className="relative grid gap-4 md:grid-cols-12">
              {/* Left: timeline */}
              <div className="md:col-span-8">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl md:p-6">
                  <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(33,243,140,0.10),transparent_70%)]" />
                  <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

                  <div className="relative">
                    {/* Vertical rail */}
                    <div className="absolute left-4 top-4 hidden h-[calc(100%-32px)] w-[2px] bg-gradient-to-b from-emerald-300/40 via-white/15 to-violet-300/25 md:block" />

                    <div className="space-y-4">
                      {filteredLog.map((e) => {
                        const isOpen = !!expanded[e.id];
                        const sevTone =
                          e.severity === "BLOCKER"
                            ? "violet"
                            : e.severity === "RISK"
                            ? "neutral"
                            : "green";

                        return (
                          <div
                            key={e.id}
                            className="relative rounded-2xl border border-white/10 bg-[#070A14]/35"
                          >
                            <button
                              onClick={() => setExpanded((p) => ({ ...p, [e.id]: !p[e.id] }))}
                              className="w-full p-5 text-left"
                              aria-expanded={isOpen}
                            >
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                  <div className="mt-0.5 hidden h-8 w-8 shrink-0 rounded-full border border-white/10 bg-white/5 md:grid md:place-items-center">
                                    <span className="h-2 w-2 rounded-full bg-emerald-300/80" />
                                  </div>

                                  <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <Chip tone="green">{e.day}</Chip>
                                      <Chip tone="violet">{e.dateLabel}</Chip>
                                      <Chip tone={sevTone as any}>{e.severity ?? "NOTE"}</Chip>
                                    </div>
                                    <h3 className="mt-2 text-balance text-lg font-semibold tracking-[-0.02em] text-white">
                                      {e.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-white/70">{e.body}</p>
                                  </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                  {e.tags.slice(0, 2).map((t) => (
                                    <Chip key={t} tone={t === "SYSTEMS" || t === "MEASUREMENT" ? "violet" : "green"}>
                                      {t}
                                    </Chip>
                                  ))}
                                  <span className="text-xs text-white/50">{isOpen ? "−" : "+"}</span>
                                </div>
                              </div>
                            </button>

                            <div className={cx("px-5 pb-5", isOpen ? "block" : "hidden")}>
                              {e.bullets?.length ? (
                                <ul className="mt-2 space-y-2">
                                  {e.bullets.map((b) => (
                                    <li key={b} className="flex gap-3 text-sm text-white/75">
                                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                                      <span>{b}</span>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}

                              {/* tags */}
                              <div className="mt-4 flex flex-wrap gap-2">
                                {e.tags.map((t) => (
                                  <Chip key={t} tone={t === "SYSTEMS" || t === "MEASUREMENT" ? "violet" : "green"}>
                                    {t}
                                  </Chip>
                                ))}
                              </div>

                              {/* media */}
                              {e.media?.length ? (
                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                  {e.media.map((m) => (
                                    <div
                                      key={m.title}
                                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                                    >
                                      <div className="relative aspect-[16/10]">
                                        <SafeImage
                                          src={m.img}
                                          alt={m.title}
                                          fallbackVariant={m.variant}
                                          className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/75 via-[#070A14]/20 to-transparent" />
                                      </div>
                                      <div className="p-4">
                                        <p className="text-xs font-semibold text-white">{m.title}</p>
                                        <p className="mt-1 text-xs text-white/60">Replace with real capture later.</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        );
                      })}

                      {!filteredLog.length ? (
                        <div className="rounded-2xl border border-white/10 bg-[#070A14]/35 p-6">
                          <p className="text-sm text-white/70">
                            No entries match these filters. Try clearing filters to see the full operational log.
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: “Field notes” */}
              <div className="md:col-span-4">
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(124,58,237,0.12),transparent_70%)]" />
                    <div className="relative">
                      <Chip tone="violet">Field notes</Chip>
                      <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white">
                        What this log proves
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        XR credibility comes from constraints + recovery + measurement. A log makes that visible — without overselling.
                      </p>

                      <div className="mt-5 rounded-2xl border border-emerald-300/15 bg-emerald-300/5 p-4">
                        <p className="text-xs uppercase tracking-[0.26em] text-emerald-200/80">Rule of thumb</p>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">
                          If it can break in the field, it deserves a paragraph in the case study.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <Chip tone="green">Quick actions</Chip>
                      <Chip tone="violet">Navigation</Chip>
                    </div>

                    <div className="grid gap-2">
                      {[
                        { label: "Environment", id: "xrcs-environment" },
                        { label: "Checklist", id: "xrcs-checklist" },
                        { label: "Outcomes", id: "xrcs-outcomes" },
                        { label: "Gallery", id: "xrcs-gallery" },
                      ].map((x) => (
                        <button
                          key={x.id}
                          onClick={() => scrollTo(x.id)}
                          className="rounded-2xl border border-white/10 bg-[#070A14]/35 px-4 py-3 text-left text-sm text-white/80 transition hover:bg-white/7"
                        >
                          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                          {x.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <Chip tone="violet">Filtering tip</Chip>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      Try: <span className="text-emerald-200/90">OPS</span> + <span className="text-emerald-200/90">SAFETY</span>{" "}
                      to see deployment risks. Or <span className="text-violet-200/90">MEASUREMENT</span> to see proof-building work.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveTags(["OPS", "SAFETY"])}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10"
                      >
                        OPS + SAFETY
                      </button>
                      <button
                        onClick={() => setActiveTags(["MEASUREMENT"])}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10"
                      >
                        MEASUREMENT
                      </button>
                      <button
                        onClick={() => setActiveTags(["PERFORMANCE", "SYSTEMS"])}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10"
                      >
                        PERF + SYSTEMS
                      </button>
                      <button
                        onClick={() => setActiveTags([])}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 transition hover:bg-white/10"
                      >
                        Clear
                      </button>
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
              title="Measured results — tied to actual usage."
              lead="Dummy metrics for now. Replace with real pilot numbers per site or per cohort."
              accent="green"
            />

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-8">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {data.outcomes.map((o) => (
                      <div key={o.label} className="rounded-2xl border border-white/10 bg-[#070A14]/35 p-5">
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

                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    Field guide pages shine when you can point to improvements that happened after specific log decisions.
                  </p>
                </div>
              </div>

              <div className="md:col-span-4">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(124,58,237,0.12),transparent_70%)]" />
                  <div className="relative">
                    <Chip tone="violet">Proof method</Chip>
                    <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white">
                      Measured, not assumed
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Completion, errors, dwell time, and comfort drop-offs. Logged offline. Synced later. Reported by cohort.
                    </p>

                    <div className="mt-5 space-y-2">
                      {["Completion rate", "Critical errors", "Time-to-competency", "Comfort drop-offs", "Re-entries"].map((t) => (
                        <div key={t} className="rounded-2xl border border-white/10 bg-[#070A14]/35 px-4 py-3 text-sm text-white/80">
                          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-violet-300/80" />
                          {t}
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-2xl border border-emerald-300/15 bg-emerald-300/5 p-4">
                      <p className="text-xs uppercase tracking-[0.26em] text-emerald-200/80">When you add real data</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        We’ll map each metric back to a specific log entry so the story becomes: “We changed X → Y improved.”
                      </p>
                    </div>
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
              title="A curated set of proof frames."
              lead="Not a dump. Just enough to visualize the system, the UI, and the deployment context."
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
                    <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">{i === 0 ? "PRIMARY" : "DETAIL"}</p>
                    <p className="mt-2 text-sm font-semibold text-white">{g.title}</p>
                    <p className="mt-1 text-sm text-white/65">
                      Replace with real captures when you have them — the page is designed to still feel premium without them.
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
                  <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">
                    Field guide format locked
                  </p>
                  <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                    Want this to become a real case study? Paste rough notes — we’ll turn them into a log.
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                    Even if you don’t have metrics yet, this structure works. Once you do, we map each metric to a decision entry.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Chip tone="green">Constraints-first</Chip>
                    <Chip tone="violet">Decision trace</Chip>
                    <Chip>Ops credibility</Chip>
                    <Chip>Outcome proof</Chip>
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="grid gap-3">
                    <button
                      onClick={() => scrollTo("xrcs-hero")}
                      className="inline-flex items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-100 backdrop-blur-xl transition hover:bg-emerald-300/15"
                    >
                      Back to top <span className="ml-2 text-emerald-200/90">↑</span>
                    </button>
                    <button
                      onClick={() => scrollTo("xrcs-log")}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/10"
                    >
                      Back to log
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-[#070A14]/35 p-4">
                    <p className="text-xs uppercase tracking-[0.26em] text-white/55">What to send later</p>
                    <p className="mt-1 text-sm text-white/70">
                      Just 6 bullets: environment, constraints, what broke, what you changed, performance targets, and any outcome signals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-white/55">
              <p>© Wodh — XR Studio • Case Study Single • Field Guide</p>
              <div className="flex items-center gap-3">
                <button onClick={() => scrollTo("xrcs-environment")} className="hover:text-white/75">
                  Environment
                </button>
                <button onClick={() => scrollTo("xrcs-checklist")} className="hover:text-white/75">
                  Checklist
                </button>
                <button onClick={() => scrollTo("xrcs-log")} className="hover:text-white/75">
                  Log
                </button>
                <button onClick={() => scrollTo("xrcs-outcomes")} className="hover:text-white/75">
                  Outcomes
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
