"use client";

/* =======================================================================================
   Wodh — Portfolio Page (Variant B: Case Library — most scalable)
   - Search-first + sticky filter console
   - Studio switch (All / XR / Games) + Sort + View toggle
   - Multi-filter (Tags / Platforms / Tech) with compact dropdown pickers
   - Scalable grid with "Load more" pagination (infinite-ready)
   - Quiet base, neon as signal (XR green / Games violet)
   - Prefers-reduced-motion respected
======================================================================================= */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Studio = "All" | "XR" | "Games";
type SortMode = "Featured" | "Latest" | "A-Z";
type ViewMode = "Grid" | "List";

type CaseItem = {
  id: string;
  title: string;
  studio: Exclude<Studio, "All">;
  subtitle: string;
  outcomes: string[];
  role: string[];
  platform: string[];
  tech: string[];
  tags: string[];
  year: number;
  featured?: boolean;
  caseStudy?: boolean;
  href?: string;
  thumb: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** --- Wodh Canonical accents --- */
const ACCENT_XR = "#9EF315";
const ACCENT_GAMES = "#5B2DDC";
const BASE_BG = "#070814";

/** --- Placeholder library data (replace later) --- */
const CASES: CaseItem[] = [
  {
    id: "xr-training-sim",
    title: "Operations Training Simulator",
    studio: "XR",
    subtitle: "Hands-on safety & workflows — shipped for multi-site teams.",
    outcomes: ["Faster onboarding", "Repeatable drills", "Lower training cost"],
    role: ["XR interaction design", "Simulation logic", "Device optimization"],
    platform: ["Meta Quest", "PC"],
    tech: ["Unity", "Photon", "C#"],
    tags: ["Training", "Simulation", "Safety"],
    year: 2025,
    featured: true,
    caseStudy: true,
    href: "/portfolio/operations-training-simulator",
    thumb:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1600&q=70",
  },
  {
    id: "games-coop-system",
    title: "Co-op Multiplayer Systems",
    studio: "Games",
    subtitle: "Low-latency sessions, lobbies, progression — production-ready.",
    outcomes: ["Stable sessions", "Smooth matchmaking", "Scalable backend hooks"],
    role: ["Netcode integration", "Lobby & session UX", "Live telemetry"],
    platform: ["PC", "Console"],
    tech: ["Unreal", "C++", "PlayFab"],
    tags: ["Multiplayer", "Systems", "Live Ops"],
    year: 2025,
    featured: true,
    caseStudy: true,
    href: "/portfolio/co-op-multiplayer-systems",
    thumb:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=70",
  },
  {
    id: "xr-configurator",
    title: "Real-time Product Configurator",
    studio: "XR",
    subtitle: "Photoreal variants in real time — built for conversion & clarity.",
    outcomes: ["Higher intent clicks", "Fewer pre-sales questions", "Fast iterations"],
    role: ["Realtime rendering", "Variant system", "Web performance"],
    platform: ["Web", "Mobile"],
    tech: ["Three.js", "WebGL", "Node"],
    tags: ["Configurator", "Commerce", "3D"],
    year: 2024,
    caseStudy: true,
    href: "/portfolio/product-configurator",
    thumb:
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1600&q=70",
  },
  {
    id: "games-ui-ux",
    title: "Game UI/UX Refresh",
    studio: "Games",
    subtitle: "Clarity-first HUD & menus — designed for flow and readability.",
    outcomes: ["Better retention", "Cleaner navigation", "Reduced support tickets"],
    role: ["HUD redesign", "Menu IA", "Accessibility passes"],
    platform: ["PC", "Console"],
    tech: ["Figma", "Unreal UMG"],
    tags: ["UI/UX", "Design", "Systems"],
    year: 2025,
    caseStudy: true,
    href: "/portfolio/game-ui-ux-refresh",
    thumb:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=70",
  },
  {
    id: "xr-visionpro-demo",
    title: "Spatial Demo Experience",
    studio: "XR",
    subtitle: "A crisp, guided spatial narrative designed for stakeholders.",
    outcomes: ["Clearer demos", "Faster approvals", "Premium brand feel"],
    role: ["Spatial UI", "Narrative flow", "Prototype polish"],
    platform: ["Apple Vision Pro"],
    tech: ["Unity", "XR Interaction Toolkit"],
    tags: ["Spatial", "Showcase", "Prototype"],
    year: 2025,
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1600&q=70",
  },
  {
    id: "games-art-pack",
    title: "Stylized Art Pipeline",
    studio: "Games",
    subtitle: "Characters, environments & look-dev — consistent, shippable style.",
    outcomes: ["Faster content throughput", "Style consistency", "Cleaner reviews"],
    role: ["Look-dev guides", "Asset production", "Optimization"],
    platform: ["PC", "Mobile"],
    tech: ["Blender", "Substance", "Unity"],
    tags: ["Art", "Pipeline", "3D"],
    year: 2024,
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1520975958225-74ef12a2f6fb?auto=format&fit=crop&w=1600&q=70",
  },
  {
    id: "xr-ar-marketing",
    title: "AR Marketing Microsite",
    studio: "XR",
    subtitle: "Lightweight AR moment — fast, shareable, brand-safe.",
    outcomes: ["Higher engagement", "Fast load", "Clean brand control"],
    role: ["WebAR integration", "Micro-interactions", "Performance budget"],
    platform: ["Web", "Mobile"],
    tech: ["WebXR", "Three.js"],
    tags: ["AR", "Marketing", "Microsite"],
    year: 2024,
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=70",
  },
  {
    id: "games-prototype",
    title: "Vertical Slice Prototype",
    studio: "Games",
    subtitle: "A polished slice to prove fun — and unlock funding confidence.",
    outcomes: ["Clear direction", "Playable proof", "Faster greenlight"],
    role: ["Core loop", "Combat feel", "Level slice"],
    platform: ["PC"],
    tech: ["Unity", "C#"],
    tags: ["Prototype", "Gameplay", "Production"],
    year: 2023,
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1600&q=70",
  },
];

/** Build facets from data (scales with library size) */
function uniqSorted(xs: string[]) {
  return Array.from(new Set(xs)).sort((a, b) => a.localeCompare(b));
}
const FACETS = (() => {
  const tags = uniqSorted(CASES.flatMap((c) => c.tags));
  const platforms = uniqSorted(CASES.flatMap((c) => c.platform));
  const tech = uniqSorted(CASES.flatMap((c) => c.tech));
  return { tags, platforms, tech };
})();

function clampText(text: string, max = 84) {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trim() + "…";
}

export default function PortfolioCaseLibrary() {
  const reduceMotion = useReducedMotion();

  const [studio, setStudio] = useState<Studio>("All");
  const [sort, setSort] = useState<SortMode>("Featured");
  const [view, setView] = useState<ViewMode>("Grid");

  const [q, setQ] = useState("");
  const [onlyCaseStudies, setOnlyCaseStudies] = useState(false);

  const [tags, setTags] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [tech, setTech] = useState<string[]>([]);

  const [pageSize, setPageSize] = useState(12);

  // Accent variables: change the light, not the typography.
  const accent = studio === "XR" ? ACCENT_XR : studio === "Games" ? ACCENT_GAMES : ACCENT_XR;
  const accent2 = studio === "All" ? ACCENT_GAMES : accent;

  const filtered = useMemo(() => {
    let list = [...CASES];

    // Studio
    if (studio !== "All") list = list.filter((c) => c.studio === studio);

    // Case studies only
    if (onlyCaseStudies) list = list.filter((c) => !!c.caseStudy);

    // Search
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter((c) => {
        const hay = [
          c.title,
          c.subtitle,
          c.studio,
          c.outcomes.join(" "),
          c.role.join(" "),
          c.platform.join(" "),
          c.tech.join(" "),
          c.tags.join(" "),
          String(c.year),
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(query);
      });
    }

    // Facets
    if (tags.length) list = list.filter((c) => tags.every((t) => c.tags.includes(t)));
    if (platforms.length) list = list.filter((c) => platforms.every((p) => c.platform.includes(p)));
    if (tech.length) list = list.filter((c) => tech.every((t) => c.tech.includes(t)));

    // Sort
    if (sort === "Featured") {
      list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.year - a.year || a.title.localeCompare(b.title));
    } else if (sort === "Latest") {
      list.sort((a, b) => b.year - a.year || Number(!!b.featured) - Number(!!a.featured) || a.title.localeCompare(b.title));
    } else {
      list.sort((a, b) => a.title.localeCompare(b.title) || b.year - a.year);
    }

    return list;
  }, [studio, onlyCaseStudies, q, tags, platforms, tech, sort]);

  const visible = useMemo(() => filtered.slice(0, pageSize), [filtered, pageSize]);
  const remaining = Math.max(0, filtered.length - visible.length);

  // Reset pagination whenever query/filters change
  useEffect(() => {
    setPageSize(12);
  }, [studio, sort, view, q, onlyCaseStudies, tags, platforms, tech]);

  const activeFilterCount =
    tags.length + platforms.length + tech.length + (onlyCaseStudies ? 1 : 0) + (q.trim() ? 1 : 0);

  return (
    <div
      className="min-h-screen"
      style={
        {
          background: `radial-gradient(1200px 800px at 10% 0%, rgba(158,243,21,0.10), transparent 55%),
                       radial-gradient(1000px 700px at 90% 10%, rgba(91,45,220,0.10), transparent 55%),
                       radial-gradient(900px 700px at 60% 110%, rgba(91,45,220,0.08), transparent 55%),
                       linear-gradient(180deg, ${BASE_BG} 0%, #050611 100%)`,
        } as React.CSSProperties
      }
    >
      <style>{`
        :root{
          --wodh-xr:${ACCENT_XR};
          --wodh-games:${ACCENT_GAMES};
          --wodh-accent:${accent};
          --wodh-accent2:${accent2};
        }
        ::selection{ background: rgba(158,243,21,0.22); }
      `}</style>

      {/* ===================================================================================
          HEADER (minimal)
      =================================================================================== */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl border border-white/10 bg-white/[0.04]" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">Wodh</div>
              <div className="text-[11px] text-white/55">Portfolio — Case Library</div>
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
      </div>

      {/* ===================================================================================
          SECTION 1 — HERO (Search-first, scalable)
      =================================================================================== */}
      <section id="portfolio-hero" className="relative mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-10">
          {/* Quiet corner lights */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(158,243,21,0.18), transparent 62%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(91,45,220,0.16), transparent 62%)" }}
          />

          <div className="relative flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <Chip>Portfolio</Chip>
              <Chip tone="muted">Variant B — Case Library</Chip>
              <Chip tone="muted">Search + Filters</Chip>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Find the closest proof.
                <span className="block text-white/70">
                  Search outcomes, platforms, and systems — then narrow with precision.
                </span>
              </h1>
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-white/60 sm:text-base">
                This layout scales cleanly from 10 projects to 200+. Quiet base, neon as instrumentation.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SegmentedStudio studio={studio} setStudio={setStudio} />
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <SearchBox q={q} setQ={setQ} />
                <div className="hidden sm:flex">
                  <MiniStat label="Results" value={String(filtered.length)} />
                </div>
                <div className="hidden sm:flex">
                  <MiniStat label="Active" value={String(activeFilterCount)} glow />
                </div>
              </div>
            </div>

            {/* Quick info row */}
            <div className="flex flex-wrap gap-2">
              <ProofChip label="Studio" value={studio} glow />
              <ProofChip label="Sort" value={sort} />
              <ProofChip label="View" value={view} />
              <ProofChip label="Library" value="Scalable grid" />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================================
          SECTION 2 — STICKY FILTER CONSOLE (always available)
      =================================================================================== */}
      <section id="portfolio-console" className="relative mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6">
        <div className="sticky top-[56px] z-40">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-3 backdrop-blur-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <FacetDropdown
                  label="Tags"
                  values={FACETS.tags}
                  selected={tags}
                  onChange={setTags}
                  hint="Use-cases / industries"
                />
                <FacetDropdown
                  label="Platforms"
                  values={FACETS.platforms}
                  selected={platforms}
                  onChange={setPlatforms}
                  hint="Devices & targets"
                />
                <FacetDropdown
                  label="Tech"
                  values={FACETS.tech}
                  selected={tech}
                  onChange={setTech}
                  hint="Engines / stacks"
                />

                <TogglePill
                  label="Case studies"
                  active={onlyCaseStudies}
                  onToggle={() => setOnlyCaseStudies((v) => !v)}
                />
              </div>

              <div className="flex items-center justify-between gap-2 sm:justify-end">
                <SelectPill
                  label="Sort"
                  value={sort}
                  options={["Featured", "Latest", "A-Z"]}
                  onChange={(v) => setSort(v as SortMode)}
                />

                <SelectPill
                  label="View"
                  value={view}
                  options={["Grid", "List"]}
                  onChange={(v) => setView(v as ViewMode)}
                />

                <button
                  onClick={() => {
                    setQ("");
                    setOnlyCaseStudies(false);
                    setTags([]);
                    setPlatforms([]);
                    setTech([]);
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/[0.05]"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Active filter chips row (scales) */}
            <div className="mt-3 flex flex-wrap gap-2">
              {q.trim() ? (
                <ActiveChip label={`Search: ${q.trim()}`} onRemove={() => setQ("")} />
              ) : null}
              {onlyCaseStudies ? (
                <ActiveChip label="Case studies" onRemove={() => setOnlyCaseStudies(false)} />
              ) : null}
              {tags.map((t) => (
                <ActiveChip key={`t-${t}`} label={t} onRemove={() => setTags(tags.filter((x) => x !== t))} />
              ))}
              {platforms.map((p) => (
                <ActiveChip
                  key={`p-${p}`}
                  label={p}
                  onRemove={() => setPlatforms(platforms.filter((x) => x !== p))}
                />
              ))}
              {tech.map((t) => (
                <ActiveChip key={`x-${t}`} label={t} onRemove={() => setTech(tech.filter((x) => x !== t))} />
              ))}
              {!activeFilterCount ? (
                <div className="text-[11px] text-white/45">No filters — showing full selection.</div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================================
          SECTION 3 — RESULTS
      =================================================================================== */}
      <section id="portfolio-results" className="relative mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
              Results
              <span className="ml-2 text-white/55">({filtered.length})</span>
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Hover for “what we did”. Open case studies when available.
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Chip tone="muted">{studio}</Chip>
            <Chip tone="muted">{sort}</Chip>
            <Chip tone="muted">{view}</Chip>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-white/70">
            No matches. Try removing a filter or searching a broader term.
          </div>
        ) : view === "List" ? (
          <div className="space-y-3">
            {visible.map((item) => (
              <CaseRow key={item.id} item={item} reduceMotion={reduceMotion} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <CaseCard key={item.id} item={item} reduceMotion={reduceMotion} />
            ))}
          </div>
        )}

        {/* Load more */}
        {remaining > 0 ? (
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              onClick={() => setPageSize((n) => n + 12)}
              className="rounded-2xl px-5 py-3 text-sm font-semibold text-black"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.82) 100%)",
                boxShadow:
                  "0 18px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08), 0 0 28px rgba(158,243,21,0.10), 0 0 28px rgba(91,45,220,0.10)",
              }}
            >
              Load more
              <span className="ml-2 text-[11px] font-semibold text-black/60">({remaining} remaining)</span>
            </button>
            <div className="text-[11px] text-white/45">
              Case Library scales: we can swap this to infinite scroll later.
            </div>
          </div>
        ) : null}
      </section>

      {/* ===================================================================================
          SECTION 4 — CTA
      =================================================================================== */}
      <section id="portfolio-cta" className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-28 -bottom-28 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(158,243,21,0.18), transparent 62%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-28 -bottom-28 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(91,45,220,0.18), transparent 62%)" }}
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <Chip>Next step</Chip>
                <Chip tone="muted">Fast response</Chip>
                <Chip tone="muted">NDA-friendly</Chip>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                Show us your constraints. We’ll ship inside them.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Platform, timeline, scope — we’ll respond with a clear plan and realistic execution path.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
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
        </div>
      </section>
    </div>
  );
}

/* =======================================================================================
   UI Primitives
======================================================================================= */

function Chip({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "muted";
}) {
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

function ProofChip({ label, value, glow }: { label: string; value: string; glow?: boolean }) {
  return (
    <div
      className={cx(
        "flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70",
        glow && "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
      )}
      style={
        glow
          ? ({
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06), 0 0 30px rgba(158,243,21,0.08), 0 0 30px rgba(91,45,220,0.08)",
            } as React.CSSProperties)
          : undefined
      }
    >
      <span className="text-white/55">{label}:</span>
      <span className="text-white/85">{value}</span>
    </div>
  );
}

function MiniStat({ label, value, glow }: { label: string; value: string; glow?: boolean }) {
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

function SegmentedStudio({
  studio,
  setStudio,
}: {
  studio: Studio;
  setStudio: (s: Studio) => void;
}) {
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
    <div className="relative w-full sm:w-[360px]">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/45">⌘</div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='Search “training”, “multiplayer”, “Vision Pro”…'
        className={cx(
          "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-3 text-sm text-white/85 placeholder:text-white/40",
          "outline-none focus:border-white/20"
        )}
        style={{
          boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 0 24px rgba(255,255,255,0.03)",
        }}
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

function TogglePill({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={cx(
        "inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-semibold transition-colors",
        active ? "border-white/20 bg-white/10 text-white" : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.05]"
      )}
      style={
        active
          ? ({
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.08), 0 0 22px rgba(158,243,21,0.08), 0 0 22px rgba(91,45,220,0.08)",
            } as React.CSSProperties)
          : undefined
      }
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)" }}
      />
      {label}
    </button>
  );
}

function SelectPill({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 pr-8 text-xs font-semibold text-white/80 outline-none hover:bg-white/[0.05]"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#070814] text-white">
            {label}: {o}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/55">▾</div>
    </div>
  );
}

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-white/70 hover:bg-white/[0.05]"
      title="Remove"
    >
      <span className="text-white/85">{label}</span>
      <span className="rounded-full border border-white/10 bg-white/[0.02] px-1.5 py-0.5 text-[10px] text-white/60 group-hover:text-white/80">
        ✕
      </span>
    </button>
  );
}

/* =======================================================================================
   Facet Dropdown (compact multi-select)
======================================================================================= */

function FacetDropdown({
  label,
  hint,
  values,
  selected,
  onChange,
}: {
  label: string;
  hint: string;
  values: string[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [localQ, setLocalQ] = useState("");
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (wrapRef.current && !wrapRef.current.contains(t)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const filtered = useMemo(() => {
    const q = localQ.trim().toLowerCase();
    if (!q) return values;
    return values.filter((v) => v.toLowerCase().includes(q));
  }, [values, localQ]);

  function toggle(v: string) {
    if (selected.includes(v)) onChange(selected.filter((x) => x !== v));
    else onChange([...selected, v]);
  }

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cx(
          "inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-semibold transition-colors",
          open || selected.length
            ? "border-white/20 bg-white/10 text-white"
            : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.05]"
        )}
        style={
          open || selected.length
            ? ({
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.08), 0 0 18px rgba(158,243,21,0.08), 0 0 18px rgba(91,45,220,0.08)",
              } as React.CSSProperties)
            : undefined
        }
      >
        {label}
        <span className="rounded-full border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[10px] text-white/60">
          {selected.length}
        </span>
        <span className="text-white/55">▾</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="absolute left-0 z-50 mt-2 w-[320px] overflow-hidden rounded-3xl border border-white/10 bg-[#070814]/92 shadow-[0_40px_120px_rgba(0,0,0,0.60)] backdrop-blur-xl"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
            transition={{ duration: reduceMotion ? 0 : 0.16, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-white/80">{label}</div>
                  <div className="mt-1 text-[11px] text-white/55">{hint}</div>
                </div>
                <button
                  onClick={() => onChange([])}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-white/65 hover:bg-white/[0.06]"
                >
                  Clear
                </button>
              </div>

              <div className="mt-3">
                <input
                  value={localQ}
                  onChange={(e) => setLocalQ(e.target.value)}
                  placeholder={`Search ${label.toLowerCase()}…`}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/80 placeholder:text-white/40 outline-none focus:border-white/20"
                />
              </div>

              <div className="mt-3 max-h-[260px] overflow-auto pr-1">
                <div className="flex flex-wrap gap-2">
                  {filtered.map((v) => {
                    const active = selected.includes(v);
                    return (
                      <button
                        key={v}
                        onClick={() => toggle(v)}
                        className={cx(
                          "rounded-full border px-3 py-2 text-[11px] font-semibold transition-colors",
                          active
                            ? "border-white/20 bg-white/10 text-white"
                            : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.05]"
                        )}
                      >
                        {v}
                      </button>
                    );
                  })}
                  {filtered.length === 0 ? (
                    <div className="text-[11px] text-white/50">No matches.</div>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-[11px] text-white/45">{selected.length} selected</div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/[0.05]"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* =======================================================================================
   Result Cards (Grid + List)
======================================================================================= */

function CaseCard({ item, reduceMotion }: { item: CaseItem; reduceMotion: boolean }) {
  const isXR = item.studio === "XR";
  const glow = isXR ? "rgba(158,243,21,0.18)" : "rgba(91,45,220,0.18)";
  const edge = isXR ? "rgba(158,243,21,0.24)" : "rgba(91,45,220,0.24)";

  return (
    <motion.a
      href={item.href || "#"}
      className={cx(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]",
        "shadow-[0_26px_100px_rgba(0,0,0,0.45)]"
      )}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      onClick={(e) => {
        if (!item.caseStudy) e.preventDefault();
      }}
    >
      <div className="relative h-44 overflow-hidden">
        <motion.img
          src={item.thumb}
          alt={item.title}
          className="h-full w-full object-cover opacity-90"
          loading="lazy"
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ filter: "saturate(0.95) contrast(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${edge}, 0 0 48px ${glow}` }}
        />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Chip>{item.studio}</Chip>
          {item.caseStudy ? <Chip tone="muted">Case Study</Chip> : <Chip tone="muted">Snapshot</Chip>}
          {item.featured ? <Chip tone="muted">Featured</Chip> : null}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-sm font-semibold tracking-[-0.02em] text-white">{item.title}</div>
          <div className="mt-1 text-xs text-white/70">{clampText(item.subtitle, 64)}</div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {item.platform.slice(0, 2).map((p) => (
            <Chip key={p} tone="muted">
              {p}
            </Chip>
          ))}
          {item.tech.slice(0, 1).map((t) => (
            <Chip key={t} tone="muted">
              {t}
            </Chip>
          ))}
          <Chip tone="muted">{item.year}</Chip>
        </div>

        <div className="mt-4">
          <div className="text-[11px] font-semibold text-white/70">What we did</div>
          <ul className="mt-2 space-y-1 text-sm text-white/65">
            {item.role.slice(0, 3).map((r) => (
              <li key={r} className="flex gap-2">
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/35 transition-colors group-hover:bg-white/60" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.02] px-2 py-1 text-[11px] text-white/60"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-white/50">
          <span>{item.caseStudy ? "Open →" : "Preview"}</span>
          <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {item.caseStudy ? "Details" : "Snapshot"}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function CaseRow({ item, reduceMotion }: { item: CaseItem; reduceMotion: boolean }) {
  const isXR = item.studio === "XR";
  const edge = isXR ? "rgba(158,243,21,0.24)" : "rgba(91,45,220,0.24)";
  const glow = isXR ? "rgba(158,243,21,0.12)" : "rgba(91,45,220,0.12)";

  return (
    <motion.a
      href={item.href || "#"}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      onClick={(e) => {
        if (!item.caseStudy) e.preventDefault();
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${edge}, 0 0 60px ${glow}` }}
      />
      <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-28 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <img
              src={item.thumb}
              alt={item.title}
              className="h-full w-full object-cover opacity-85"
              loading="lazy"
              style={{ filter: "saturate(0.95) contrast(1.05)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Chip>{item.studio}</Chip>
              {item.caseStudy ? <Chip tone="muted">Case Study</Chip> : <Chip tone="muted">Snapshot</Chip>}
              {item.featured ? <Chip tone="muted">Featured</Chip> : null}
              <Chip tone="muted">{item.year}</Chip>
            </div>
            <div className="mt-2 text-sm font-semibold tracking-[-0.02em] text-white">{item.title}</div>
            <div className="mt-1 text-xs text-white/65">{clampText(item.subtitle, 90)}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          {item.platform.slice(0, 2).map((p) => (
            <Chip key={p} tone="muted">
              {p}
            </Chip>
          ))}
          {item.tech.slice(0, 2).map((t) => (
            <Chip key={t} tone="muted">
              {t}
            </Chip>
          ))}
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/55">
            {item.caseStudy ? "Open →" : "Preview"}
          </span>
        </div>
      </div>
    </motion.a>
  );
}
