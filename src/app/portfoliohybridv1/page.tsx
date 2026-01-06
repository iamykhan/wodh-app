"use client";

/* =======================================================================================
   Wodh — Portfolio Page (Hybrid Spec: Hero → Selector → Featured 4 → Outcomes → Collage
                          → Mini Pipeline → Proof Wall → Case Study Teasers → Final CTA)

   Notes:
   - Base atmosphere: dark indigo / black
   - Category accents:
       XR  = neon green  (#9EF315)
       Games = violet/indigo (#5B2DDC)  (still distinct from base)
       3D  = amber/gold  (#F6B74A)
   - Selector includes: All + XR + Games + 3D
   - Featured 4:
       - In All: pick "featured" first, then newest
       - In category: featured-in-category then newest, fallback if fewer
   - Collage grid:
       - CSS grid "tetris" spans (stable, premium, no masonry lib)
       - Accent edge + minimal tags, hover reveals
   - Motion:
       - Framer Motion used, respects prefers-reduced-motion
       - Subtle glows, no loud RGB
======================================================================================= */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Category = "All" | "XR" | "Games" | "3D";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<Category, "All">;
  year: number;
  featured?: boolean;
  caseStudy?: boolean;
  href?: string;

  thumb: string;
  video?: string;

  platforms: string[];
  tags: string[];
  outcomes?: string[]; // for collage hover / internal use
};

type Quote = {
  text: string;
  name: string;
  role: string;
};

type DeepDive = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  problem: string;
  solution: string;
  metricLabel: string;
  metricValue: string;
  caseStudy?: boolean;
  href?: string;
};

/* =======================================================================================
   Design tokens
======================================================================================= */

const TOKENS = {
  bg0: "#070814",
  bg1: "#050611",
  ink: "#0B0D22",
  xr: "#9EF315",
  games: "#5B2DDC",
  d3: "#F6B74A",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function accentFor(cat: Exclude<Category, "All">) {
  if (cat === "XR") return TOKENS.xr;
  if (cat === "Games") return TOKENS.games;
  return TOKENS.d3;
}

function labelFor(cat: Category) {
  if (cat === "XR") return "XR";
  if (cat === "Games") return "Games";
  if (cat === "3D") return "3D";
  return "All";
}

// PATCH 0 — New helper functions
function laneAccent(cat: Exclude<Category, "All">) {
  if (cat === "XR") return TOKENS.xr;
  if (cat === "Games") return TOKENS.games;
  return TOKENS.d3;
}

function laneName(cat: Category) {
  if (cat === "XR") return "XR";
  if (cat === "Games") return "Games";
  if (cat === "3D") return "3D";
  return "All";
}

function laneSub(cat: Category) {
  if (cat === "XR") return "Immersive / Spatial";
  if (cat === "Games") return "Systems / Play";
  if (cat === "3D") return "Lookdev / Assets";
  return "Everything";
}

function laneUnderline(cat: Category) {
  if (cat === "XR") return `linear-gradient(90deg, ${rgba(TOKENS.xr, 0.9)}, ${rgba(TOKENS.xr, 0.1)})`;
  if (cat === "Games") return `linear-gradient(90deg, ${rgba(TOKENS.games, 0.9)}, ${rgba(TOKENS.games, 0.1)})`;
  if (cat === "3D") return `linear-gradient(90deg, ${rgba(TOKENS.d3, 0.9)}, ${rgba(TOKENS.d3, 0.1)})`;
  return `linear-gradient(90deg, ${rgba(TOKENS.xr, 0.65)}, ${rgba("#ffffff", 0.08)} 50%, ${rgba(TOKENS.games, 0.65)})`;
}

function cardTintOverlay(accentHex: string) {
  return `
    linear-gradient(180deg, ${rgba(accentHex, 0.10)} 0%, ${rgba("#000000", 0.0)} 38%, ${rgba("#000000", 0.78)} 100%),
    linear-gradient(90deg, ${rgba(accentHex, 0.10)} 0%, ${rgba("#000000", 0.0)} 55%, ${rgba("#000000", 0.22)} 100%)
  `;
}

/* =======================================================================================
   Demo data — replace with real portfolio items later
======================================================================================= */

const PROJECTS: Project[] = [
  // Featured 4 (mark featured: true)
  {
    id: "ops-training-sim",
    title: "Operations Training Simulator",
    subtitle: "Safety + workflows — repeatable drills that scale across teams.",
    category: "XR",
    year: 2025,
    featured: true,
    caseStudy: true,
    href: "/portfolio/operations-training-simulator",
    thumb:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=2400&q=70",
    platforms: ["Meta Quest", "PC"],
    tags: ["Training", "Simulation"],
    outcomes: ["Faster onboarding", "Safer ops", "Lower training cost"],
  },
  {
    id: "coop-multiplayer",
    title: "Co-op Multiplayer Systems",
    subtitle: "Matchmaking, lobbies, progression — production-ready reliability.",
    category: "Games",
    year: 2025,
    featured: true,
    caseStudy: true,
    href: "/portfolio/co-op-multiplayer-systems",
    thumb:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2400&q=70",
    platforms: ["PC", "Console"],
    tags: ["Multiplayer", "Systems"],
    outcomes: ["Stable sessions", "Scalable hooks", "Telemetry-ready"],
  },
  {
    id: "cinematic-lookdev",
    title: "Cinematic Lookdev Pack",
    subtitle: "Characters + lighting + materials — consistent shippable style.",
    category: "3D",
    year: 2025,
    featured: true,
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1520975958225-74ef12a2f6fb?auto=format&fit=crop&w=2400&q=70",
    platforms: ["Unreal", "DCC"],
    tags: ["Lookdev", "Characters"],
    outcomes: ["Style consistency", "Faster reviews", "Clean handoff"],
  },
  {
    id: "product-configurator",
    title: "Real-time Product Configurator",
    subtitle: "Photoreal variants — clarity-first buying decisions.",
    category: "XR",
    year: 2024,
    featured: true,
    caseStudy: true,
    href: "/portfolio/product-configurator",
    thumb:
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=2400&q=70",
    platforms: ["Web", "Mobile"],
    tags: ["3D", "Commerce"],
    outcomes: ["Higher intent clicks", "Fewer questions", "Fast variants"],
  },

  // Collage items
  {
    id: "spatial-demo",
    title: "Spatial Demo Experience",
    subtitle: "A guided spatial narrative built for stakeholder confidence.",
    category: "XR",
    year: 2025,
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=2400&q=70",
    platforms: ["Apple Vision Pro"],
    tags: ["Spatial", "Prototype"],
    outcomes: ["Clearer demos", "Faster approvals", "Premium feel"],
  },
  {
    id: "hud-refresh",
    title: "Game UI/HUD Refresh",
    subtitle: "Clarity-first HUD + menus — designed for flow and readability.",
    category: "Games",
    year: 2025,
    caseStudy: true,
    href: "/portfolio/game-ui-ux-refresh",
    thumb:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=2400&q=70",
    platforms: ["PC", "Console"],
    tags: ["UI/UX", "Systems"],
    outcomes: ["Less friction", "Better retention", "Cleaner navigation"],
  },
  {
    id: "ar-microsite",
    title: "AR Marketing Microsite",
    subtitle: "Lightweight AR moment — fast, shareable, brand-safe.",
    category: "XR",
    year: 2024,
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=70",
    platforms: ["Web", "Mobile"],
    tags: ["AR", "Microsite"],
    outcomes: ["Higher engagement", "Fast load", "Clean control"],
  },
  {
    id: "environment-pack",
    title: "Stylized Environment Pack",
    subtitle: "Modular environments designed for performance and scale.",
    category: "3D",
    year: 2024,
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=2400&q=70",
    platforms: ["Unreal", "Unity"],
    tags: ["Environments", "Optimization"],
    outcomes: ["Stable FPS", "Reusable kits", "Faster production"],
  },
  {
    id: "live-ops-telemetry",
    title: "Live Ops Telemetry Layer",
    subtitle: "Events, dashboards, tuning loops — built for live iteration.",
    category: "Games",
    year: 2025,
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=2400&q=70",
    platforms: ["PC", "Console"],
    tags: ["Telemetry", "Ops"],
    outcomes: ["Better decisions", "Faster iteration", "Stable launches"],
  },
  {
    id: "product-render-suite",
    title: "Product Render Suite",
    subtitle: "Photoreal renders + turntables for premium product storytelling.",
    category: "3D",
    year: 2025,
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=2400&q=70",
    platforms: ["DCC", "Web"],
    tags: ["Renders", "Lighting"],
    outcomes: ["Premium visuals", "Fast output", "Clean brand feel"],
  },
];

const QUOTES: Quote[] = [
  {
    text: "They don’t just build visuals — they build confidence. The demo made decisions easy.",
    name: "Product Lead",
    role: "Enterprise XR",
  },
  {
    text: "Solid engineering, clean communication, and a real sense of craft — the kind you ship with.",
    name: "Studio Director",
    role: "Games",
  },
];

const DEEP_DIVES: DeepDive[] = [
  {
    id: "dd-training",
    title: "Training Simulator — From risk to repeatable practice",
    category: "XR",
    problem: "High-risk workflows were inconsistent across teams and locations.",
    solution: "A guided simulation with standardized scoring + repeatable drills.",
    metricLabel: "Consistency uplift",
    metricValue: "3×",
    caseStudy: true,
    href: "/portfolio/operations-training-simulator",
  },
  {
    id: "dd-mp",
    title: "Multiplayer Systems — Reliability budgets that scale",
    category: "Games",
    problem: "Session stability and matchmaking quality needed measurable targets.",
    solution: "Reliability budgets, telemetry, and graceful fallback strategies.",
    metricLabel: "Stability target",
    metricValue: "99.9%",
    caseStudy: true,
    href: "/portfolio/co-op-multiplayer-systems",
  },
  {
    id: "dd-3d",
    title: "3D Lookdev — Style consistency across a full pipeline",
    category: "3D",
    problem: "Assets drifted in style and quality between artists and scenes.",
    solution: "Lookdev templates + review gates + performance-aware materials.",
    metricLabel: "Review cycles",
    metricValue: "-40%",
    caseStudy: false,
  },
];

/* =======================================================================================
   Page
======================================================================================= */

export default function PortfolioHybridV1Page() {
  const reduceMotion = useReducedMotion() ?? false;
  const [cat, setCat] = useState<Category>("All");
  const [query, setQuery] = useState("");

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  // Filtered list (for collage)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (!q) return true;
      const hay = [
        p.title,
        p.subtitle,
        p.category,
        String(p.year),
        p.platforms.join(" "),
        p.tags.join(" "),
        (p.outcomes || []).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    }).sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.year - a.year);
  }, [cat, query]);

  // Featured 4
  const featured4 = useMemo(() => {
    const pool =
      cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);

    const featured = pool.filter((p) => p.featured);
    const nonFeatured = pool.filter((p) => !p.featured);

    const sortedFeatured = [...featured].sort((a, b) => b.year - a.year);
    const sortedNon = [...nonFeatured].sort((a, b) => b.year - a.year);

    const pick = [...sortedFeatured, ...sortedNon].slice(0, 4);
    return pick;
  }, [cat]);

  const counts = useMemo(() => {
    const by = { All: PROJECTS.length, XR: 0, Games: 0, "3D": 0 } as Record<Category, number>;
    PROJECTS.forEach((p) => (by[p.category] += 1));
    return by;
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(1200px 800px at 12% 0%, rgba(158,243,21,0.10), transparent 56%),
          radial-gradient(1000px 700px at 90% 10%, rgba(91,45,220,0.12), transparent 56%),
          radial-gradient(900px 650px at 60% 110%, rgba(246,183,74,0.08), transparent 60%),
          linear-gradient(180deg, ${TOKENS.bg0} 0%, ${TOKENS.bg1} 100%)
        `,
      }}
    >
      <GlobalStyles />

      {/* ===================================================================================
          HEADER
      =================================================================================== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl border border-white/10 bg-white/[0.04]" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">Wodh</div>
              <div className="text-[11px] text-white/55">Portfolio</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              onClick={() => scrollToId("portfolio-featured")}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/70 hover:bg-white/[0.05]"
            >
              Featured
            </button>
            <button
              onClick={() => scrollToId("portfolio-grid")}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/70 hover:bg-white/[0.05]"
            >
              Library
            </button>
            <a
              href="/contact"
              className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/70 hover:bg-white/[0.05]"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* ===================================================================================
          SECTION 1 — HERO
      =================================================================================== */}
      <section id="portfolio-hero" className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-10">
          <Atmosphere />

          <div className="relative flex flex-col gap-7">
            <div className="flex flex-wrap items-center gap-2">
              <Chip>Portfolio</Chip>
              <Chip tone="muted">XR • Games • 3D</Chip>
              <Chip tone="muted">Curated proof</Chip>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Work that reads as proof —
                <span className="block text-white/70">not just screenshots.</span>
              </h1>

              <p
                className="max-w-3xl text-pretty text-sm leading-relaxed sm:text-base"
                style={blendTextStyle()}
              >
                Browse by studio. Start with our strongest four. Then explore the full collage — built to
                feel premium, fast, and easy to understand.
              </p>

              <p className="max-w-3xl text-sm leading-relaxed text-white/55 sm:text-base">
                Each category has its own signal: <span style={{ color: TOKENS.xr }}>XR</span>,{" "}
                <span style={{ color: TOKENS.games }}>Games</span>,{" "}
                <span style={{ color: TOKENS.d3 }}>3D</span>. The page stays one world.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <StatPill label="Projects" value={String(filtered.length)} glow />
                <StatPill label="Mode" value={labelFor(cat)} />
                <StatPill label="Featured" value="4" />
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <button
                  onClick={() => scrollToId("portfolio-featured")}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.05]"
                >
                  View featured
                </button>
                <button
                  onClick={() => (window.location.href = "/contact")}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-black"
                  style={primaryBtnStyle()}
                >
                  Start a project
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================================
          SECTION 2 — SELECTOR STRIP (All / XR / Games / 3D)
      =================================================================================== */}
      <section id="portfolio-selector" className="relative mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <SegmentedCategory cat={cat} setCat={setCat} counts={counts} />

          <SearchBox query={query} setQuery={setQuery} />
        </div>
      </section>

      {/* ===================================================================================
          SECTION 3 — FEATURED 4 (2×2 big cards)
      =================================================================================== */}
      <section id="portfolio-featured" className="relative mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <SectionHeader
          chip="Featured"
          title="Four projects we’d show first."
          lead="Big cards. Minimal tags. One glance to understand the caliber."
        />

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featured4.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} reduceMotion={reduceMotion} />
          ))}
        </div>
      </section>

      {/* ===================================================================================
          SECTION 4 — OUTCOMES STRIP
      =================================================================================== */}
      <section id="portfolio-outcomes" className="relative mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        <OutcomesStrip cat={cat} />
      </section>

      {/* ===================================================================================
          SECTION 5 — COLLAGE PORTFOLIO GRID
      =================================================================================== */}
      <section id="portfolio-grid" className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <SectionHeader
          chip="Library"
          title="A collage you can skim."
          lead="A tetris-style grid that keeps variety high — and fatigue low."
        />

        <div className="mt-6">
          <CollageGrid items={filtered.filter((p) => !p.featured)} reduceMotion={reduceMotion} />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] text-white/50">
          <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">
            Tip: replace images with real portfolio media for maximum trust.
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">
            Hover to reveal outcomes.
          </span>
        </div>
      </section>

      {/* ===================================================================================
          SECTION 6 — MINI PIPELINE (How We Ship)
      =================================================================================== */}
      <section id="portfolio-pipeline" className="relative mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14">
        <SectionHeader
          chip="Delivery"
          title="How we ship (short version)."
          lead="A simple track that makes the work feel enterprise-ready."
        />
        <MiniPipeline />
      </section>

      {/* ===================================================================================
          SECTION 7 — PROOF WALL (logos + 2 quotes)
      =================================================================================== */}
      <section id="portfolio-proof" className="relative mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14">
        <SectionHeader
          chip="Trust"
          title="Proof carries better when others say it."
          lead="A small, premium trust layer — no clutter."
        />
        <ProofWall quotes={QUOTES} reduceMotion={reduceMotion} />
      </section>

      {/* ===================================================================================
          SECTION 8 — CASE STUDY TEASERS (3 deep dives)
      =================================================================================== */}
      <section id="portfolio-deep-dives" className="relative mx-auto w-full max-w-6xl px-4 pt-12 sm:px-6 sm:pt-14">
        <SectionHeader
          chip="Deep dives"
          title="Selected case studies."
          lead="Only three. Enough depth to convert serious buyers."
        />
        <DeepDives items={DEEP_DIVES} reduceMotion={reduceMotion} />
      </section>

      {/* ===================================================================================
          SECTION 9 — FINAL CTA
      =================================================================================== */}
      <section id="portfolio-cta" className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-14">
        <FinalCTA />
      </section>
    </div>
  );
}

/* =======================================================================================
   Global styles + atmosphere
======================================================================================= */

function GlobalStyles() {
  return (
    <style>{`
      :root{
        --wodh-xr:${TOKENS.xr};
        --wodh-games:${TOKENS.games};
        --wodh-3d:${TOKENS.d3};
      }
      ::selection{ background: rgba(158,243,21,0.22); }

      .wodh-grain{
        background-image:
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
      }
      .wodh-scan{
        background: repeating-linear-gradient(
          to bottom,
          rgba(255,255,255,0.035) 0px,
          rgba(255,255,255,0.035) 1px,
          transparent 2px,
          transparent 7px
        );
      }
    `}</style>
  );
}

function Atmosphere() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 wodh-grain opacity-[0.08]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 wodh-scan opacity-[0.05]" />
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
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[120%] h-[420px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(246,183,74,0.10), transparent 62%)" }}
      />
    </>
  );
}

/* =======================================================================================
   Section header
======================================================================================= */

function SectionHeader({ chip, title, lead }: { chip: string; title: string; lead: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Chip>{chip}</Chip>
        <Chip tone="muted">Portfolio</Chip>
      </div>
      <h2 className="text-balance text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
        {title}
      </h2>
      <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base" style={blendTextStyle()}>
        {lead}
      </p>
    </div>
  );
}

/* =======================================================================================
   Selector strip + search
======================================================================================= */

function SegmentedCategory({
  cat,
  setCat,
  counts,
}: {
  cat: Category;
  setCat: (c: Category) => void;
  counts: Record<Category, number>;
}) {
  const reduceMotion = useReducedMotion();
  const options: Category[] = ["All", "XR", "Games", "3D"];
  const activeIndex = Math.max(0, options.indexOf(cat));

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-2">
      {/* background grain */}
      <div aria-hidden className="pointer-events-none absolute inset-0 wodh-grain opacity-[0.06]" />

      {/* active plate */}
      <motion.div
        className="absolute top-2 h-[calc(100%-16px)] rounded-2xl"
        style={{
          width: `calc((100% - 24px) / 4)`,
          left: `calc(${activeIndex} * ((100% - 24px) / 4) + 12px)`,
          background: "rgba(255,255,255,0.06)",
          boxShadow:
            cat === "XR"
              ? "0 0 0 1px rgba(255,255,255,0.08), 0 0 34px rgba(158,243,21,0.22)"
              : cat === "Games"
                ? "0 0 0 1px rgba(255,255,255,0.08), 0 0 34px rgba(91,45,220,0.22)"
                : cat === "3D"
                  ? "0 0 0 1px rgba(255,255,255,0.08), 0 0 34px rgba(246,183,74,0.22)"
                  : "0 0 0 1px rgba(255,255,255,0.06), 0 0 30px rgba(0,0,0,0.25)",
        }}
        layout
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.2, 0.8, 0.2, 1] }}
      />

      {/* underline rail */}
      <div className="pointer-events-none absolute bottom-2 left-3 right-3 h-px bg-white/10" />
      <motion.div
        className="pointer-events-none absolute bottom-2 left-3 h-[2px] rounded-full"
        style={{
          width: `calc((100% - 24px) / 4)`,
          background: laneUnderline(cat),
        }}
        animate={{
          x: `calc(${activeIndex} * ((100% - 24px) / 4))`,
        }}
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.2, 0.8, 0.2, 1] }}
      />

      <div className="relative grid grid-cols-4 gap-2">
        {options.map((opt) => {
          const active = opt === cat;
          const dot =
            opt === "XR"
              ? TOKENS.xr
              : opt === "Games"
                ? TOKENS.games
                : opt === "3D"
                  ? TOKENS.d3
                  : "rgba(255,255,255,0.40)";

          return (
            <button
              key={opt}
              onClick={() => setCat(opt)}
              className={cx(
                "rounded-2xl px-3 py-3 text-left transition-colors",
                active ? "text-white" : "text-white/60 hover:text-white/80"
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background: dot,
                    boxShadow:
                      opt === "XR"
                        ? "0 0 16px rgba(158,243,21,0.20)"
                        : opt === "Games"
                          ? "0 0 16px rgba(91,45,220,0.20)"
                          : opt === "3D"
                            ? "0 0 16px rgba(246,183,74,0.20)"
                            : "none",
                  }}
                />
                <div className="text-sm font-semibold">{laneName(opt)}</div>
                <div className="ml-auto text-[11px] font-semibold text-white/45">{counts[opt]}</div>
              </div>

              <div className={cx("mt-1 text-[11px]", active ? "text-white/60" : "text-white/40")}>
                {laneSub(opt)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SearchBox({ query, setQuery }: { query: string; setQuery: (v: string) => void }) {
  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search “training”, “multiplayer”, “lookdev”…'
        className={cx(
          "w-full rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/85 placeholder:text-white/40",
          "outline-none focus:border-white/20"
        )}
      />
      {query ? (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-semibold text-white/70 hover:bg-white/[0.06]"
        >
          Clear
        </button>
      ) : null}
    </div>
  );
}

/* =======================================================================================
   Featured Cards (2×2)
======================================================================================= */

function FeaturedCard({
  project,
  index,
  reduceMotion,
}: {
  project: Project;
  index: number;
  reduceMotion: boolean;
}) {
  const a = accentFor(project.category);
  const edge = rgba(a, 0.26);
  const glow = rgba(a, 0.12);

  return (
    <motion.article
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        boxShadow: `0 30px 120px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)`,
      }}
    >
      {/* media */}
      <div className="relative h-[260px] overflow-hidden sm:h-[320px]">
        {project.video ? (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <motion.img
            src={project.thumb}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            loading="lazy"
            style={{ filter: "saturate(0.95) contrast(1.06)" }}
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          />
        )}

        <div
          className="absolute inset-0"
          style={{
            background: cardTintOverlay(laneAccent(project.category)),
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/22 via-transparent to-black/18" />

        {/* subtle shine */}
        {!reduceMotion ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-20 top-0 h-full w-24 opacity-[0.16]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 45%, transparent 100%)",
              transform: "skewX(-12deg)",
            }}
            animate={{ x: ["0%", "260%"] }}
            transition={{ duration: 4.1, ease: "linear", repeat: Infinity, repeatDelay: 1.4 }}
          />
        ) : null}

        {/* edge glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${edge}, 0 0 90px ${glow}` }}
        />

        {/* minimal overlay */}
        <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
          <ChipSmall dot={a}>{project.category}</ChipSmall>
          <Chip tone="muted">{project.year}</Chip>
          {project.caseStudy ? <Chip tone="muted">Case</Chip> : <Chip tone="muted">Snapshot</Chip>}
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="text-[11px] font-semibold text-white/60">FEATURED {index + 1}</div>
          <div className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
            {project.title}
          </div>
          <div className="mt-1 line-clamp-2 text-sm text-white/70">{project.subtitle}</div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {/* minimal tags */}
            {(project.platforms || []).slice(0, 2).map((p) => (
              <Chip key={p} tone="muted">
                {p}
              </Chip>
            ))}
            {(project.tags || []).slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* bottom action (minimal) */}
      <div className="flex items-center justify-between gap-3 p-5">
        <div className="text-[11px] text-white/50">
          {project.caseStudy ? "Open case study" : "Details on request"}
        </div>
        <button
          onClick={() => {
            if (project.caseStudy && project.href) window.location.href = project.href;
          }}
          className={cx(
            "rounded-2xl border px-3 py-2 text-xs font-semibold",
            project.caseStudy
              ? "border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.06]"
              : "border-white/10 bg-white/[0.02] text-white/55"
          )}
        >
          {project.caseStudy ? "View →" : "NDA"}
        </button>
      </div>
    </motion.article>
  );
}

/* =======================================================================================
   Outcomes strip
======================================================================================= */

function OutcomesStrip({ cat }: { cat: Category }) {
  const items = useMemo(() => {
    if (cat === "XR") return ["Faster onboarding", "Safer operations", "Repeatable training", "Stakeholder clarity", "Premium demos", "Lower training cost"];
    if (cat === "Games") return ["Stable sessions", "Better retention", "Clean UX flow", "Performance budgets", "Live tuning loops", "Scalable systems"];
    if (cat === "3D") return ["Style consistency", "Clean lookdev", "Optimized assets", "Faster reviews", "Premium renders", "Reusable kits"];
    return ["Clarity-first delivery", "Production readiness", "Performance budgets", "Premium visuals", "Reliable systems", "Fast iteration"];
  }, [cat]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
      <div aria-hidden className="pointer-events-none absolute inset-0 wodh-grain opacity-[0.05]" />

      {/* top accent hairline */}
      <div className="h-px w-full bg-white/10" />
      <div className="h-[2px] w-full" style={{ background: laneUnderline(cat) }} />

      <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <div className="text-xs font-semibold text-white/70">Outcomes</div>
          <div className="mt-1 text-sm text-white/55">A quick signal of what this work is built to achieve.</div>
        </div>

        {/* editorial chips (less button-like) */}
        <div className="flex flex-wrap gap-2">
          {items.map((x) => (
            <span
              key={x}
              className="rounded-full border border-white/10 bg-white/[0.015] px-3 py-1 text-[11px] font-semibold text-white/70"
              style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)" }}
            >
              {x}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =======================================================================================
   Collage Grid (tetris-ish spans)
======================================================================================= */

function CollageGrid({ items, reduceMotion }: { items: Project[]; reduceMotion: boolean }) {
  const grid = useMemo(() => {
    // deterministic span pattern (repeat)
    const pattern = [
      { c: 6, r: 2 },
      { c: 3, r: 2 },
      { c: 3, r: 2 },
      { c: 4, r: 2 },
      { c: 4, r: 2 },
      { c: 4, r: 2 },
      { c: 3, r: 2 },
      { c: 6, r: 2 },
      { c: 3, r: 2 },
    ];
    return items.map((it, i) => ({ it, span: pattern[i % pattern.length] }));
  }, [items]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {grid.map(({ it, span }, idx) => (
        <CollageCard
          key={it.id}
          project={it}
          reduceMotion={reduceMotion}
          colSpan={span.c}
          rowSpan={span.r}
          index={idx}
        />
      ))}
    </div>
  );
}

function CollageCard({
  project,
  reduceMotion,
  colSpan,
  rowSpan,
  index,
}: {
  project: Project;
  reduceMotion: boolean;
  colSpan: number;
  rowSpan: number;
  index: number;
}) {
  const a = accentFor(project.category);
  const edge = rgba(a, 0.24);
  const glow = rgba(a, 0.10);

  return (
    <motion.article
      className={cx(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]",
        "lg:col-span-12"
      )}
      style={{
        // Tailwind can't generate dynamic col-span classes reliably in build.
        // So we set spans via inline style instead for safety.
        gridColumn: `span ${Math.min(12, Math.max(3, colSpan))} / span ${Math.min(12, Math.max(3, colSpan))}`,
        gridRow: `span ${Math.max(2, rowSpan)} / span ${Math.max(2, rowSpan)}`,
        boxShadow: "0 22px 90px rgba(0,0,0,0.42), inset 0 0 0 1px rgba(255,255,255,0.04)",
      }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="relative h-full min-h-[220px]">
        <motion.img
          src={project.thumb}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          loading="lazy"
          style={{ filter: "saturate(0.95) contrast(1.06)" }}
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: cardTintOverlay(laneAccent(project.category)),
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/18" />

        {/* edge glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${edge}, 0 0 80px ${glow}` }}
        />

        {/* overlay */}
        <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
          <ChipSmall dot={a}>{project.category}</ChipSmall>
          <Chip tone="muted">{project.year}</Chip>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-sm font-semibold tracking-[-0.02em] text-white sm:text-base">
            {project.title}
          </div>
          <div className="mt-1 line-clamp-2 text-xs text-white/70 sm:text-sm">
            {project.subtitle}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {(project.tags || []).slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/60"
              >
                {t}
              </span>
            ))}
            {(project.platforms || []).slice(0, 2).map((p) => (
              <Chip key={p} tone="muted">
                {p}
              </Chip>
            ))}
          </div>

          {/* hover outcomes */}
          <div className="mt-3 overflow-hidden">
            <div className="flex flex-wrap gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {(project.outcomes || []).slice(0, 3).map((o) => (
                <span
                  key={o}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] font-semibold"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* click affordance */}
        <button
          onClick={() => {
            if (project.caseStudy && project.href) window.location.href = project.href;
          }}
          className={cx(
            "absolute right-4 top-4 rounded-2xl border px-3 py-2 text-[11px] font-semibold transition-colors",
            project.caseStudy
              ? "border-white/10 bg-white/[0.03] text-white/75 hover:bg-white/[0.06]"
              : "border-white/10 bg-white/[0.02] text-white/55"
          )}
          aria-label={project.caseStudy ? "Open case study" : "NDA / details on request"}
        >
          {project.caseStudy ? "View →" : "NDA"}
        </button>
      </div>
    </motion.article>
  );
}

/* =======================================================================================
   Mini Pipeline
======================================================================================= */

function MiniPipeline() {
  const steps = [
    { title: "Discover", desc: "Goals, constraints, success metrics." },
    { title: "Prototype", desc: "Fast proof with clear interaction." },
    { title: "Production", desc: "Build systems, content, pipelines." },
    { title: "QA / Perf", desc: "Budgets, devices, stability." },
    { title: "Launch + Support", desc: "Shipping, tuning, iteration." },
  ];

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div aria-hidden className="pointer-events-none absolute inset-0 wodh-grain opacity-[0.05]" />

      <div className="relative p-6 sm:p-8">
        {/* rail */}
        <div className="pointer-events-none absolute left-8 right-8 top-[40px] hidden h-px bg-white/10 sm:block" />
        <div
          className="pointer-events-none absolute left-8 right-8 top-[40px] hidden h-[2px] opacity-70 sm:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(158,243,21,0.55), rgba(255,255,255,0.10) 45%, rgba(91,45,220,0.55))",
          }}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          {steps.map((s) => (
            <div key={s.title} className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-5">
              {/* node */}
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.60)",
                    boxShadow: "0 0 18px rgba(255,255,255,0.12)",
                  }}
                />
                <div className="text-sm font-semibold text-white/85">{s.title}</div>
              </div>

              <div className="text-sm text-white/60">{s.desc}</div>

              {/* subtle inner edge */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =======================================================================================
   Proof Wall (logos marquee + quotes)
======================================================================================= */

function LogoMark(word: string) {
  return (
    <svg width="92" height="16" viewBox="0 0 92 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="0.5" y="0.5" width="91" height="15" rx="7.5" stroke="rgba(255,255,255,0.10)" />
      <text
        x="46"
        y="11.2"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="700"
        letterSpacing="1.2"
        fill="rgba(255,255,255,0.70)"
        style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" }}
      >
        {word}
      </text>
    </svg>
  );
}

function ProofWall({ quotes, reduceMotion }: { quotes: Quote[]; reduceMotion: boolean }) {
  const marks = [
    { name: "Meta", svg: LogoMark("META") },
    { name: "Unity", svg: LogoMark("UNITY") },
    { name: "Unreal", svg: LogoMark("UNREAL") },
    { name: "Vision Pro", svg: LogoMark("VISION") },
    { name: "Steam", svg: LogoMark("STEAM") },
    { name: "WebXR", svg: LogoMark("WEBXR") },
    { name: "Console", svg: LogoMark("CONSOLE") },
    { name: "Enterprise", svg: LogoMark("ENTERPRISE") },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* logos */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-7">
        <div className="text-xs font-semibold text-white/70">Trusted signals</div>
        <div className="mt-1 text-sm text-white/55">Platforms, engines, and delivery contexts we ship into.</div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <motion.div
            className="flex items-center gap-4 p-4"
            animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={reduceMotion ? undefined : { duration: 22, ease: "linear", repeat: Infinity }}
            style={{ width: "200%" }}
          >
            {[...marks, ...marks].map((m, i) => (
              <div
                key={`${m.name}-${i}`}
                className="flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-5"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.02)" }}
                aria-label={m.name}
                title={m.name}
              >
                {m.svg}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/50">
          <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">NDA-friendly</span>
          <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">Enterprise-ready</span>
          <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1">Clear communication</span>
        </div>
      </div>

      {/* quotes */}
      <div className="grid gap-4 lg:col-span-5">
        {quotes.slice(0, 2).map((q) => (
          <div key={q.text} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div
              className="text-sm leading-relaxed"
              style={{
                background:
                  "linear-gradient(90deg, rgba(158,243,21,0.92), rgba(255,255,255,0.70) 44%, rgba(91,45,220,0.92))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              "{q.text}"
            </div>
            <div className="mt-4 text-sm font-semibold text-white/80">{q.name}</div>
            <div className="text-[11px] text-white/55">{q.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =======================================================================================
   Deep Dives (Case study teasers)
======================================================================================= */

function DeepDives({ items, reduceMotion }: { items: DeepDive[]; reduceMotion: boolean }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
      {items.map((d) => {
        const a = accentFor(d.category);
        const edge = rgba(a, 0.26);
        const glow = rgba(a, 0.12);

        return (
          <motion.article
            key={d.id}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            whileHover={reduceMotion ? undefined : { y: -2 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              boxShadow: `0 26px 110px rgba(0,0,0,0.40), inset 0 0 0 1px rgba(255,255,255,0.04)`,
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
              style={{ background: `radial-gradient(circle, ${rgba(a, 0.18)}, transparent 62%)` }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100"
              style={{ boxShadow: `inset 0 0 0 1px ${edge}, 0 0 70px ${glow}` }}
            />

            <div className="relative flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <ChipSmall dot={a}>{d.category}</ChipSmall>
                {d.caseStudy ? <Chip tone="muted">Case study</Chip> : <Chip tone="muted">NDA</Chip>}
              </div>

              <div className="text-lg font-semibold tracking-[-0.02em] text-white">{d.title}</div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-[11px] font-semibold text-white/65">Problem</div>
                <div className="mt-1 text-sm text-white/60">{d.problem}</div>
                <div className="mt-3 text-[11px] font-semibold text-white/65">Solution</div>
                <div className="mt-1 text-sm text-white/60">{d.solution}</div>
              </div>

              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold text-white/60">{d.metricLabel}</div>
                  <div className="text-sm text-white/55">Key signal</div>
                </div>
                <div
                  className="text-3xl font-semibold tracking-[-0.03em]"
                  style={{
                    background: `linear-gradient(90deg, ${rgba(a, 0.95)}, rgba(255,255,255,0.78))`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {d.metricValue}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] text-white/50">
                <span>{d.caseStudy ? "Read full story" : "Available on request"}</span>
                <button
                  onClick={() => {
                    if (d.caseStudy && d.href) window.location.href = d.href;
                  }}
                  className={cx(
                    "rounded-2xl border px-3 py-2 text-xs font-semibold",
                    d.caseStudy
                      ? "border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.02] text-white/55"
                  )}
                >
                  {d.caseStudy ? "Open →" : "NDA"}
                </button>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

/* =======================================================================================
   Final CTA
======================================================================================= */

function FinalCTA() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 wodh-grain opacity-[0.06]" />
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
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-[-140px] h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(246,183,74,0.14), transparent 62%)" }}
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>Next</Chip>
            <Chip tone="muted">One team. Three lanes.</Chip>
            <Chip tone="muted">Fast response</Chip>
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
            Tell us your constraints — we’ll reply with a plan.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Platform, timeline, scope — we’ll suggest the fastest path to proof (and to shipping).
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <button
            onClick={() => (window.location.href = "/contact")}
            className="rounded-2xl px-4 py-3 text-sm font-semibold text-black"
            style={primaryBtnStyle()}
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
  );
}

/* =======================================================================================
   Small UI
======================================================================================= */

function Chip({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "muted" }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium",
        tone === "default" ? "border-white/12 bg-white/[0.04] text-white/80" : "border-white/10 bg-white/[0.02] text-white/60"
      )}
    >
      {children}
    </span>
  );
}

function ChipSmall({ children, dot }: { children: React.ReactNode; dot: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[11px] font-semibold text-white/75">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot, boxShadow: `0 0 14px ${rgba(dot, 0.22)}` }} />
      {children}
    </span>
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
                "0 0 0 1px rgba(255,255,255,0.06), 0 0 22px rgba(158,243,21,0.10), 0 0 22px rgba(91,45,220,0.10), 0 0 18px rgba(246,183,74,0.07)",
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className="text-[10px] font-semibold text-white/55">{label}</div>
      <div className="text-xs font-semibold text-white/85">{value}</div>
    </div>
  );
}

/* =======================================================================================
   Helpers
======================================================================================= */

function primaryBtnStyle(): React.CSSProperties {
  return {
    background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.82) 100%)",
    boxShadow:
      "0 18px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08), 0 0 28px rgba(158,243,21,0.10), 0 0 28px rgba(91,45,220,0.10), 0 0 24px rgba(246,183,74,0.08)",
  };
}

function blendTextStyle(): React.CSSProperties {
  return {
    background:
      "linear-gradient(90deg, rgba(158,243,21,0.92), rgba(255,255,255,0.62) 40%, rgba(91,45,220,0.92))",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };
}

/**
 * rgba helper that accepts:
 *  - hex color like "#RRGGBB"
 *  - already-rgba color (returns as-is)
 */
function rgba(hexOrRgba: string, a: number) {
  if (hexOrRgba.startsWith("rgba")) return hexOrRgba;
  const hex = hexOrRgba.replace("#", "").trim();
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
