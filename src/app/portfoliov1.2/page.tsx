"use client";

/* =======================================================================================
   Wodh — Portfolio Page (Variant E: Signal Matrix — most modern + understandable)
   - A “problem-first” matrix: Rows = Use-cases, Columns = Outcomes
   - Each cell shows SIGNAL density (XR green + Games violet always blended)
   - Hover highlights a row/column (command-center feel)
   - Click a cell to open a side panel with the exact matching projects
   - Studio filter changes weighting + chip accents, but typography stays blended
   - Subtle scan-line + grain + neon haze (premium, not loud)
   - Prefers-reduced-motion respected
======================================================================================= */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Studio = "All" | "XR" | "Games";

type OutcomeKey =
  | "Speed to Launch"
  | "Conversion"
  | "Retention"
  | "Safety & Compliance"
  | "Performance"
  | "Scalability";

type UseCaseKey =
  | "Training & Simulation"
  | "Spatial Demos"
  | "Product Configurators"
  | "AR Marketing"
  | "Multiplayer Systems"
  | "Game UI/UX"
  | "3D Art Pipeline"
  | "Live Ops & Telemetry";

type Signal = Record<OutcomeKey, 0 | 1 | 2 | 3>;

type Project = {
  id: string;
  title: string;
  studio: Exclude<Studio, "All">;
  year: number;
  useCases: UseCaseKey[];
  platforms: string[];
  tags: string[];
  subtitle: string;

  /** signal intensity per outcome */
  signal: Signal;

  /** media */
  thumb: string;

  /** deep link */
  caseStudy?: boolean;
  href?: string;
  featured?: boolean;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const BASE_BG = "#070814";
const ACCENT_XR = "#9EF315";
const ACCENT_GAMES = "#5B2DDC";

/** Matrix axes (locked order) */
const OUTCOMES: OutcomeKey[] = [
  "Speed to Launch",
  "Conversion",
  "Retention",
  "Safety & Compliance",
  "Performance",
  "Scalability",
];

const USE_CASES: UseCaseKey[] = [
  "Training & Simulation",
  "Spatial Demos",
  "Product Configurators",
  "AR Marketing",
  "Multiplayer Systems",
  "Game UI/UX",
  "3D Art Pipeline",
  "Live Ops & Telemetry",
];

/** Demo data (replace with your real portfolio set later) */
const PROJECTS: Project[] = [
  {
    id: "ops-training-sim",
    title: "Operations Training Simulator",
    studio: "XR",
    year: 2025,
    useCases: ["Training & Simulation", "Live Ops & Telemetry"],
    platforms: ["Meta Quest", "PC"],
    tags: ["Simulation", "Safety", "Training"],
    subtitle: "Repeatable drills and safety workflows for distributed teams.",
    signal: {
      "Speed to Launch": 2,
      Conversion: 1,
      Retention: 2,
      "Safety & Compliance": 3,
      Performance: 2,
      Scalability: 2,
    },
    thumb:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1800&q=70",
    caseStudy: true,
    href: "/portfolio/operations-training-simulator",
    featured: true,
  },
  {
    id: "spatial-demo",
    title: "Spatial Demo Experience",
    studio: "XR",
    year: 2025,
    useCases: ["Spatial Demos", "Training & Simulation"],
    platforms: ["Apple Vision Pro"],
    tags: ["Spatial", "Prototype", "Stakeholders"],
    subtitle: "A guided spatial narrative designed for stakeholder confidence.",
    signal: {
      "Speed to Launch": 2,
      Conversion: 2,
      Retention: 2,
      "Safety & Compliance": 1,
      Performance: 2,
      Scalability: 1,
    },
    thumb:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1800&q=70",
    caseStudy: false,
  },
  {
    id: "product-configurator",
    title: "Real-time Product Configurator",
    studio: "XR",
    year: 2024,
    useCases: ["Product Configurators", "AR Marketing"],
    platforms: ["Web", "Mobile"],
    tags: ["Commerce", "3D", "Configurator"],
    subtitle: "Photoreal variants — clarity-first buying decisions.",
    signal: {
      "Speed to Launch": 2,
      Conversion: 3,
      Retention: 2,
      "Safety & Compliance": 0,
      Performance: 2,
      Scalability: 2,
    },
    thumb:
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1800&q=70",
    caseStudy: true,
    href: "/portfolio/product-configurator",
    featured: true,
  },
  {
    id: "ar-microsite",
    title: "AR Marketing Microsite",
    studio: "XR",
    year: 2024,
    useCases: ["AR Marketing"],
    platforms: ["Web", "Mobile"],
    tags: ["AR", "Brand", "Microsite"],
    subtitle: "Lightweight AR moment — fast, shareable, brand-safe.",
    signal: {
      "Speed to Launch": 3,
      Conversion: 2,
      Retention: 1,
      "Safety & Compliance": 0,
      Performance: 2,
      Scalability: 1,
    },
    thumb:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=70",
    caseStudy: false,
  },
  {
    id: "coop-systems",
    title: "Co-op Multiplayer Systems",
    studio: "Games",
    year: 2025,
    useCases: ["Multiplayer Systems", "Live Ops & Telemetry"],
    platforms: ["PC", "Console"],
    tags: ["Netcode", "Matchmaking", "Systems"],
    subtitle: "Stable sessions, lobbies, matchmaking and progression hooks.",
    signal: {
      "Speed to Launch": 1,
      Conversion: 1,
      Retention: 3,
      "Safety & Compliance": 0,
      Performance: 3,
      Scalability: 3,
    },
    thumb:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=70",
    caseStudy: true,
    href: "/portfolio/co-op-multiplayer-systems",
    featured: true,
  },
  {
    id: "game-ui-ux",
    title: "Game UI/UX Refresh",
    studio: "Games",
    year: 2025,
    useCases: ["Game UI/UX"],
    platforms: ["PC", "Console"],
    tags: ["HUD", "Menus", "Accessibility"],
    subtitle: "Clarity-first HUD + menus — built for flow and readability.",
    signal: {
      "Speed to Launch": 2,
      Conversion: 1,
      Retention: 3,
      "Safety & Compliance": 0,
      Performance: 2,
      Scalability: 2,
    },
    thumb:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1800&q=70",
    caseStudy: true,
    href: "/portfolio/game-ui-ux-refresh",
  },
  {
    id: "art-pipeline",
    title: "Stylized Art Pipeline",
    studio: "Games",
    year: 2024,
    useCases: ["3D Art Pipeline"],
    platforms: ["PC", "Mobile"],
    tags: ["Look-dev", "Optimization", "3D"],
    subtitle: "Look-dev, characters and environments — consistent shippable style.",
    signal: {
      "Speed to Launch": 2,
      Conversion: 0,
      Retention: 2,
      "Safety & Compliance": 0,
      Performance: 2,
      Scalability: 2,
    },
    thumb:
      "https://images.unsplash.com/photo-1520975958225-74ef12a2f6fb?auto=format&fit=crop&w=1800&q=70",
    caseStudy: false,
  },
  {
    id: "live-ops",
    title: "Live Ops Telemetry Layer",
    studio: "Games",
    year: 2025,
    useCases: ["Live Ops & Telemetry", "Multiplayer Systems"],
    platforms: ["PC", "Console"],
    tags: ["Telemetry", "Dashboards", "Ops"],
    subtitle: "Instrumentation, events, dashboards and live tuning support.",
    signal: {
      "Speed to Launch": 1,
      Conversion: 0,
      Retention: 2,
      "Safety & Compliance": 0,
      Performance: 2,
      Scalability: 3,
    },
    thumb:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1800&q=70",
    caseStudy: false,
  },
];

/* =======================================================================================
   Page
======================================================================================= */

export default function PortfolioSignalMatrix() {
  const reduceMotion = useReducedMotion();

  const [studio, setStudio] = useState<Studio>("All");
  const [q, setQ] = useState("");
  const [hoverRow, setHoverRow] = useState<UseCaseKey | null>(null);
  const [hoverCol, setHoverCol] = useState<OutcomeKey | null>(null);

  const [openCell, setOpenCell] = useState<{ row: UseCaseKey; col: OutcomeKey } | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const accentA = ACCENT_XR;
  const accentB = ACCENT_GAMES;

  const filteredProjects = useMemo(() => {
    const query = q.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      if (studio !== "All" && p.studio !== studio) return false;
      if (!query) return true;

      const hay = [
        p.title,
        p.subtitle,
        p.studio,
        String(p.year),
        p.useCases.join(" "),
        p.platforms.join(" "),
        p.tags.join(" "),
        OUTCOMES.map((k) => `${k}:${p.signal[k]}`).join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(query);
    });
  }, [studio, q]);

  const cellProjects = useMemo(() => {
    if (!openCell) return [];
    return filteredProjects
      .filter((p) => p.useCases.includes(openCell.row))
      .filter((p) => p.signal[openCell.col] > 0)
      .sort((a, b) => (b.signal[openCell.col] ?? 0) - (a.signal[openCell.col] ?? 0) || b.year - a.year);
  }, [openCell, filteredProjects]);

  const totals = useMemo(() => {
    // simple “density” totals for UI stats
    const total = filteredProjects.length;
    const xr = filteredProjects.filter((p) => p.studio === "XR").length;
    const games = filteredProjects.filter((p) => p.studio === "Games").length;
    return { total, xr, games };
  }, [filteredProjects]);

  // close panel on ESC + click outside
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenCell(null);
    const onClick = (e: MouseEvent) => {
      if (!openCell) return;
      const t = e.target as Node;
      if (panelRef.current && panelRef.current.contains(t)) return;
      // click outside panel closes (but ignore clicks inside matrix that will open a new cell)
      const el = e.target as HTMLElement;
      if (el?.closest?.("[data-matrix]")) return;
      setOpenCell(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [openCell]);

  return (
    <div
      className="min-h-screen"
      style={
        {
          background: `
            radial-gradient(1200px 800px at 10% 0%, rgba(158,243,21,0.10), transparent 55%),
            radial-gradient(1000px 700px at 90% 10%, rgba(91,45,220,0.12), transparent 55%),
            radial-gradient(900px 700px at 60% 110%, rgba(91,45,220,0.08), transparent 55%),
            linear-gradient(180deg, ${BASE_BG} 0%, #050611 100%)
          `,
        } as React.CSSProperties
      }
    >
      <style>{`
        :root{
          --wodh-xr:${ACCENT_XR};
          --wodh-games:${ACCENT_GAMES};
        }
        ::selection{ background: rgba(158,243,21,0.22); }

        /* Premium grain + scanline (very subtle) */
        .wodh-grain{
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
        }
        .wodh-scan{
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.04) 0px,
            rgba(255,255,255,0.04) 1px,
            transparent 2px,
            transparent 6px
          );
        }
      `}</style>

      {/* ===================================================================================
          HEADER
      =================================================================================== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl border border-white/10 bg-white/[0.04]" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">Wodh</div>
              <div className="text-[11px] text-white/55">Portfolio — Signal Matrix</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/services"
              className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/70 transition-colors hover:bg-white/[0.05]"
            >
              Services
            </a>
            <a
              href="/contact"
              className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/70 transition-colors hover:bg-white/[0.05]"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* ===================================================================================
          HERO + CONTROLS
      =================================================================================== */}
      <section id="portfolio-hero" className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-10">
          {/* atmosphere */}
          <div aria-hidden className="pointer-events-none absolute inset-0 wodh-grain opacity-[0.08]" />
          <div aria-hidden className="pointer-events-none absolute inset-0 wodh-scan opacity-[0.05]" />
          <CornerLights />

          <div className="relative flex flex-col gap-7">
            <div className="flex flex-wrap items-center gap-2">
              <Chip>Portfolio</Chip>
              <Chip tone="muted">Variant E — Signal Matrix</Chip>
              <Chip tone="muted">Modern + understandable</Chip>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Find “something like my problem.”
                <span className="block text-white/70">
                  A matrix where <BlendWord>XR</BlendWord> and <BlendWord alt>Games</BlendWord> share one language.
                </span>
              </h1>

              <p
                className="max-w-3xl text-pretty text-sm leading-relaxed sm:text-base"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.72) 42%, rgba(91,45,220,0.92))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Rows are use-cases. Columns are outcomes. Each cell shows density — click a cell to see the exact proof.
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-white/55">
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">
                  XR signal: <span style={{ color: "rgba(158,243,21,0.95)" }}>green</span>
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">
                  Games signal: <span style={{ color: "rgba(91,45,220,0.95)" }}>violet</span>
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">
                  Base: indigo night
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SegmentedStudio studio={studio} setStudio={setStudio} />

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <SearchBox q={q} setQ={setQ} />
                <StatPill label="Results" value={String(totals.total)} glow />
                <div className="hidden sm:flex">
                  <StatPill label="XR" value={String(totals.xr)} />
                </div>
                <div className="hidden sm:flex">
                  <StatPill label="Games" value={String(totals.games)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================================
          MATRIX
      =================================================================================== */}
      <section id="portfolio-matrix" className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div aria-hidden className="pointer-events-none absolute inset-0 wodh-grain opacity-[0.06]" />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(158,243,21,0.14), transparent 62%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(91,45,220,0.14), transparent 62%)" }}
          />

          <div className="relative p-4 sm:p-6" data-matrix>
            {/* Column headers */}
            <div className="grid grid-cols-[220px_repeat(6,minmax(0,1fr))] gap-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                <div className="text-[11px] font-semibold text-white/65">Use-case →</div>
                <div className="mt-1 text-xs text-white/50">
                  Hover a row/column to focus. Click a cell for proof.
                </div>
              </div>

              {OUTCOMES.map((col) => (
                <ColumnHeader
                  key={col}
                  col={col}
                  active={hoverCol === col}
                  onEnter={() => setHoverCol(col)}
                  onLeave={() => setHoverCol(null)}
                />
              ))}
            </div>

            <div className="mt-2 h-px w-full bg-white/10" />

            {/* Rows */}
            <div className="mt-3 space-y-2">
              {USE_CASES.map((row) => (
                <MatrixRow
                  key={row}
                  row={row}
                  cols={OUTCOMES}
                  projects={filteredProjects}
                  studio={studio}
                  hoverRow={hoverRow}
                  hoverCol={hoverCol}
                  setHoverRow={setHoverRow}
                  setHoverCol={setHoverCol}
                  openCell={openCell}
                  setOpenCell={setOpenCell}
                  reduceMotion={reduceMotion}
                  accentA={accentA}
                  accentB={accentB}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <LegendCard
                title="Signal density"
                desc="Cells brighten when multiple projects match, or when a single project has strong intensity."
              />
              <LegendCard
                title="Blend is the identity"
                desc="Typography stays mixed green↔violet so the page represents both studios together."
              />
              <LegendCard
                title="Understandable by default"
                desc="No scrolling through dozens of cards — you go straight from problem → proof."
              />
            </div>
          </div>
        </div>

        {/* ===================================================================================
            RIGHT PANEL (cell details)
        =================================================================================== */}
        <AnimatePresence>
          {openCell ? (
            <motion.div
              ref={panelRef}
              className="fixed right-0 top-0 z-[80] h-full w-full border-l border-white/10 bg-[#070814]/92 backdrop-blur-xl sm:w-[520px]"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
              transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="relative h-full overflow-auto">
                <div aria-hidden className="pointer-events-none absolute inset-0 wodh-grain opacity-[0.07]" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(158,243,21,0.12), transparent 62%)" }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(91,45,220,0.12), transparent 62%)" }}
                />

                <div className="relative p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip>Cell</Chip>
                        <Chip tone="muted">{openCell.row}</Chip>
                        <Chip tone="muted">{openCell.col}</Chip>
                      </div>
                      <div className="mt-3 text-xl font-semibold tracking-[-0.02em] text-white">
                        Proof in this intersection
                      </div>
                      <div
                        className="mt-2 text-sm"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.72) 44%, rgba(91,45,220,0.95))",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        These projects match the use-case and contribute signal to the outcome.
                      </div>
                    </div>

                    <button
                      onClick={() => setOpenCell(null)}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/75 hover:bg-white/[0.06]"
                    >
                      Close
                    </button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {cellProjects.length === 0 ? (
                      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-white/65">
                        No matches inside current filters.
                      </div>
                    ) : (
                      cellProjects.map((p) => (
                        <ProjectCard key={p.id} p={p} col={openCell.col} reduceMotion={reduceMotion} />
                      ))
                    )}
                  </div>

                  <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                    <div className="text-xs font-semibold text-white/75">Next move</div>
                    <div className="mt-2 text-sm text-white/60">
                      If your project looks like this intersection, we can propose scope + timeline in one call.
                    </div>
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                      <button
                        onClick={() => (window.location.href = "/contact")}
                        className="rounded-2xl px-4 py-3 text-sm font-semibold text-black"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.82) 100%)",
                          boxShadow:
                            "0 18px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08), 0 0 28px rgba(158,243,21,0.10), 0 0 28px rgba(91,45,220,0.10)",
                        }}
                      >
                        Start a project
                      </button>
                      <button
                        onClick={() => (window.location.href = "mailto:hello@wodh.io")}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.05]"
                      >
                        Email us
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 text-[11px] text-white/45">
                    Tip: replace thumbnails with real media for maximum credibility.
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>
    </div>
  );
}

/* =======================================================================================
   Matrix pieces
======================================================================================= */

function MatrixRow({
  row,
  cols,
  projects,
  studio,
  hoverRow,
  hoverCol,
  setHoverRow,
  setHoverCol,
  openCell,
  setOpenCell,
  reduceMotion,
  accentA,
  accentB,
}: {
  row: UseCaseKey;
  cols: OutcomeKey[];
  projects: Project[];
  studio: Studio;
  hoverRow: UseCaseKey | null;
  hoverCol: OutcomeKey | null;
  setHoverRow: (v: UseCaseKey | null) => void;
  setHoverCol: (v: OutcomeKey | null) => void;
  openCell: { row: UseCaseKey; col: OutcomeKey } | null;
  setOpenCell: (v: { row: UseCaseKey; col: OutcomeKey } | null) => void;
  reduceMotion: boolean;
  accentA: string;
  accentB: string;
}) {
  const rowActive = hoverRow === row;

  return (
    <div
      className="grid grid-cols-[220px_repeat(6,minmax(0,1fr))] gap-2"
      onMouseEnter={() => setHoverRow(row)}
      onMouseLeave={() => setHoverRow(null)}
    >
      <div
        className={cx(
          "rounded-2xl border p-3 transition-colors",
          rowActive ? "border-white/20 bg-white/[0.05]" : "border-white/10 bg-white/[0.02]"
        )}
        style={
          rowActive
            ? ({
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.06), 0 0 22px rgba(158,243,21,0.07), 0 0 22px rgba(91,45,220,0.07)",
              } as React.CSSProperties)
            : undefined
        }
      >
        <div className="text-xs font-semibold text-white/80">{row}</div>
        <div
          className="mt-1 text-[11px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(158,243,21,0.92), rgba(255,255,255,0.65) 40%, rgba(91,45,220,0.90))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Click a cell to see proof.
        </div>
      </div>

      {cols.map((col) => (
        <MatrixCell
          key={`${row}-${col}`}
          row={row}
          col={col}
          projects={projects}
          studio={studio}
          hoverRow={hoverRow}
          hoverCol={hoverCol}
          setHoverCol={setHoverCol}
          open={openCell?.row === row && openCell?.col === col}
          onOpen={() => setOpenCell({ row, col })}
          reduceMotion={reduceMotion}
          accentA={accentA}
          accentB={accentB}
        />
      ))}
    </div>
  );
}

function MatrixCell({
  row,
  col,
  projects,
  studio,
  hoverRow,
  hoverCol,
  setHoverCol,
  open,
  onOpen,
  reduceMotion,
  accentA,
  accentB,
}: {
  row: UseCaseKey;
  col: OutcomeKey;
  projects: Project[];
  studio: Studio;
  hoverRow: UseCaseKey | null;
  hoverCol: OutcomeKey | null;
  setHoverCol: (v: OutcomeKey | null) => void;
  open: boolean;
  onOpen: () => void;
  reduceMotion: boolean;
  accentA: string;
  accentB: string;
}) {
  const colActive = hoverCol === col;
  const rowActive = hoverRow === row;
  const focused = colActive || rowActive;

  const matches = useMemo(() => {
    // projects in this row with signal > 0
    return projects
      .filter((p) => p.useCases.includes(row))
      .filter((p) => p.signal[col] > 0)
      .sort((a, b) => (b.signal[col] ?? 0) - (a.signal[col] ?? 0) || b.year - a.year);
  }, [projects, row, col]);

  const density = useMemo(() => {
    if (!matches.length) return 0;
    // weighted density: sum of intensities capped
    const sum = matches.reduce((acc, p) => acc + (p.signal[col] ?? 0), 0);
    return Math.min(10, sum); // 0..10
  }, [matches, col]);

  const top = matches.slice(0, 3);

  // studio blend stays ALWAYS, but we can slightly bias intensity by filter
  const bias = studio === "XR" ? 0.06 : studio === "Games" ? 0.06 : 0;
  const a = clamp01(0.06 + density * 0.028 + bias); // green alpha
  const b = clamp01(0.06 + density * 0.026 + bias); // violet alpha

  return (
    <motion.button
      type="button"
      className={cx(
        "group relative h-[92px] overflow-hidden rounded-2xl border p-3 text-left transition-colors",
        open ? "border-white/20" : "border-white/10",
        focused ? "bg-white/[0.04]" : "bg-white/[0.02]"
      )}
      onMouseEnter={() => setHoverCol(col)}
      onMouseLeave={() => setHoverCol(null)}
      onClick={onOpen}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
      aria-label={`${row} × ${col}: ${matches.length} projects`}
      style={{
        boxShadow: open
          ? "0 0 0 1px rgba(255,255,255,0.08), 0 0 24px rgba(158,243,21,0.10), 0 0 24px rgba(91,45,220,0.10)"
          : focused
            ? "0 0 0 1px rgba(255,255,255,0.05)"
            : "none",
      }}
    >
      {/* Signal wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(120px 120px at 20% 20%, rgba(158,243,21,${a}), transparent 60%),
            radial-gradient(140px 120px at 85% 30%, rgba(91,45,220,${b}), transparent 62%),
            radial-gradient(220px 160px at 50% 110%, rgba(255,255,255,${clamp01(0.02 + density * 0.01)}), transparent 70%)
          `,
        }}
      />

      {/* Tiny “scan shimmer” */}
      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-10 top-0 h-full w-20 opacity-[0.18]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 45%, transparent 100%)",
            transform: "skewX(-12deg)",
          }}
          animate={{ x: ["0%", "260%"] }}
          transition={{ duration: 3.2, ease: "linear", repeat: Infinity, repeatDelay: 1.2 }}
        />
      ) : null}

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center justify-between gap-2">
          <div className="text-[11px] font-semibold text-white/70">
            {matches.length ? (
              <>
                <span className="text-white/85">{matches.length}</span> match
                {matches.length === 1 ? "" : "es"}
              </>
            ) : (
              <span className="text-white/45">—</span>
            )}
          </div>
          <div className="text-[11px] text-white/45">{density ? `signal ${density}/10` : ""}</div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          {/* micro project dots */}
          {top.map((p) => (
            <span
              key={p.id}
              className="h-2.5 w-2.5 rounded-full border border-white/20"
              style={{
                background:
                  p.studio === "XR"
                    ? `rgba(158,243,21,${0.55 + p.signal[col] * 0.12})`
                    : `rgba(91,45,220,${0.55 + p.signal[col] * 0.12})`,
                boxShadow:
                  p.studio === "XR"
                    ? "0 0 16px rgba(158,243,21,0.18)"
                    : "0 0 16px rgba(91,45,220,0.18)",
              }}
              title={`${p.title}`}
            />
          ))}

          {/* micro label */}
          <div
            className="text-[11px] font-semibold"
            style={{
              background: `linear-gradient(90deg, ${accentA}, rgba(255,255,255,0.75) 45%, ${accentB})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {matches.length ? top[0]?.title : "No proof here"}
          </div>
        </div>

        <div className="mt-2 text-[11px] text-white/50 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          Click → open
        </div>
      </div>
    </motion.button>
  );
}

/* =======================================================================================
   Panel cards
======================================================================================= */

function ProjectCard({ p, col, reduceMotion }: { p: Project; col: OutcomeKey; reduceMotion: boolean }) {
  const isXR = p.studio === "XR";
  const edge = isXR ? "rgba(158,243,21,0.26)" : "rgba(91,45,220,0.26)";
  const glow = isXR ? "rgba(158,243,21,0.12)" : "rgba(91,45,220,0.12)";

  return (
    <motion.a
      href={p.href || "#"}
      onClick={(e) => {
        if (!p.caseStudy) e.preventDefault();
      }}
      className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        boxShadow: `0 26px 100px rgba(0,0,0,0.40), inset 0 0 0 1px rgba(255,255,255,0.04)`,
      }}
    >
      <div className="relative h-40 overflow-hidden">
        <motion.img
          src={p.thumb}
          alt={p.title}
          className="h-full w-full object-cover opacity-90"
          loading="lazy"
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
          transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ filter: "saturate(0.95) contrast(1.06)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${edge}, 0 0 70px ${glow}` }}
        />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Chip>{p.studio}</Chip>
          <Chip tone="muted">{p.year}</Chip>
          {p.caseStudy ? <Chip tone="muted">Case</Chip> : <Chip tone="muted">Snap</Chip>}
          {p.featured ? <Chip tone="muted">Featured</Chip> : null}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-sm font-semibold tracking-[-0.02em] text-white">{p.title}</div>
          <div className="mt-1 text-xs text-white/70">{p.subtitle}</div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {p.platforms.slice(0, 3).map((x) => (
            <Chip key={x} tone="muted">
              {x}
            </Chip>
          ))}
          {p.tags.slice(0, 3).map((x) => (
            <span
              key={x}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/55"
            >
              {x}
            </span>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="text-[11px] font-semibold text-white/70">Signal contribution</div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="text-sm text-white/70">{col}</div>
            <SignalMeter value={p.signal[col]} isXR={isXR} />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-white/50">
          <span>{p.caseStudy ? "Open case study →" : "Snapshot (no deep link)"}</span>
          <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">Proof artifact</span>
        </div>
      </div>
    </motion.a>
  );
}

/* =======================================================================================
   UI bits
======================================================================================= */

function CornerLights() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(158,243,21,0.16), transparent 62%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(91,45,220,0.16), transparent 62%)" }}
      />
    </>
  );
}

function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "muted" }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium",
        tone === "default"
          ? "border-white/12 bg-white/[0.04] text-white/80"
          : "border-white/10 bg-white/[0.02] text-white/60"
      )}
    >
      {children}
    </span>
  );
}

function BlendWord({ children, alt }: { children: React.ReactNode; alt?: boolean }) {
  return (
    <span
      style={{
        background: alt
          ? "linear-gradient(90deg, rgba(91,45,220,0.95), rgba(255,255,255,0.70) 50%, rgba(158,243,21,0.95))"
          : "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.70) 50%, rgba(91,45,220,0.95))",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}

function SegmentedStudio({ studio, setStudio }: { studio: Studio; setStudio: (s: Studio) => void }) {
  const options: Studio[] = ["All", "XR", "Games"];
  const activeIndex = options.indexOf(studio);

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-white/[0.03] p-1 sm:w-[360px]">
      <motion.div
        className="absolute top-1 h-[calc(100%-8px)] rounded-xl"
        style={{
          width: `calc((100% - 8px) / 3)`,
          left: `calc(${activeIndex} * ((100% - 8px) / 3) + 4px)`,
          background: "rgba(255,255,255,0.06)",
          boxShadow:
            studio === "XR"
              ? "0 0 0 1px rgba(255,255,255,0.08), 0 0 28px rgba(158,243,21,0.18)"
              : studio === "Games"
                ? "0 0 0 1px rgba(255,255,255,0.08), 0 0 28px rgba(91,45,220,0.18)"
                : "0 0 0 1px rgba(255,255,255,0.06)",
        }}
        layout
        transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
      />
      <div className="relative grid grid-cols-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setStudio(opt)}
            className={cx(
              "rounded-xl px-3 py-2 text-xs font-semibold transition-colors",
              opt === studio ? "text-white" : "text-white/60 hover:text-white/80"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function SearchBox({ q, setQ }: { q: string; setQ: (v: string) => void }) {
  return (
    <div className="relative w-full sm:w-[340px]">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/45">⌘</div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='Search “training”, “multiplayer”, “configurator”…'
        className={cx(
          "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-3 text-sm text-white/85 placeholder:text-white/40",
          "outline-none focus:border-white/20"
        )}
      />
      {q ? (
        <button
          onClick={() => setQ("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-white/70 hover:bg-white/[0.06]"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}

function StatPill({ label, value, glow }: { label: string; value: string; glow?: boolean }) {
  return (
    <div
      className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2"
      style={
        glow
          ? ({
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06), 0 0 22px rgba(158,243,21,0.10), 0 0 22px rgba(91,45,220,0.10)",
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className="text-[10px] font-semibold text-white/55">{label}</div>
      <div className="text-xs font-semibold text-white/85">{value}</div>
    </div>
  );
}

function ColumnHeader({
  col,
  active,
  onEnter,
  onLeave,
}: {
  col: OutcomeKey;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl border p-3 transition-colors",
        active ? "border-white/20 bg-white/[0.05]" : "border-white/10 bg-white/[0.02]"
      )}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={
        active
          ? ({
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06), 0 0 18px rgba(158,243,21,0.07), 0 0 18px rgba(91,45,220,0.07)",
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className="text-xs font-semibold text-white/80">{col}</div>
      <div
        className="mt-1 text-[11px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(158,243,21,0.90), rgba(255,255,255,0.65) 46%, rgba(91,45,220,0.90))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Outcome focus
      </div>
    </div>
  );
}

function LegendCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
      <div className="text-sm font-semibold text-white/80">{title}</div>
      <div className="mt-2 text-sm text-white/60">{desc}</div>
    </div>
  );
}

function SignalMeter({ value, isXR }: { value: 0 | 1 | 2 | 3; isXR: boolean }) {
  const pct = (value / 3) * 100;
  return (
    <div className="w-36">
      <div className="h-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
        <div
          className="h-full"
          style={{
            width: `${pct}%`,
            background: isXR
              ? "linear-gradient(90deg, rgba(158,243,21,0.85), rgba(158,243,21,0.35))"
              : "linear-gradient(90deg, rgba(91,45,220,0.85), rgba(91,45,220,0.35))",
          }}
        />
      </div>
      <div className="mt-1 text-right text-[11px] text-white/55">{value}/3</div>
    </div>
  );
}

/* =======================================================================================
   Helpers
======================================================================================= */

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}
