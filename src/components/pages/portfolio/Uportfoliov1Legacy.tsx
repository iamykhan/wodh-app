"use client";

/* =======================================================================================
   Wodh — Portfolio Page (Variant A: Curated Museum)
   - Premium / museum-grade curation (quiet base, neon as signal)
   - XR ↔ Games studio switch (accent light changes, layout stays calm)
   - One featured case + curated grid + small “by capability” index + CTA
   - Subtle glow, restrained motion, prefers-reduced-motion respected
======================================================================================= */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { colors } from "@/lib/design-tokens/colors";
import { duration, easing } from "@/lib/design-tokens/animations";
import { cn } from "@/lib/utils/cn";
import { clampText } from "@/lib/utils/text";
import { Chip } from "@/components/ui/Chip";
import { GlassCard } from "@/components/ui/GlassCard/GlassCard";

type Studio = "All" | "XR" | "Games";

type CaseItem = {
  id: string;
  title: string;
  studio: Exclude<Studio, "All">;
  subtitle: string; // editorial 1-liner
  outcomes: string[]; // 2–4 outcomes
  role: string[]; // what we did
  platform: string[]; // e.g., Meta Quest, Apple Vision Pro
  tech: string[]; // e.g., Unity, Unreal, WebXR
  tags: string[]; // use-case / industry tags
  year?: string;
  hero?: boolean; // preferred featured
  caseStudy?: boolean; // has detail page
  href?: string; // case study link
  thumb: string; // image URL (placeholder ok)
};

/** --- Wodh Canonical accents --- */
const ACCENT_XR = colors.neon.base;
const ACCENT_GAMES = colors.violet.base;
const BASE_BG = colors.background.primary;

/** --- Demo curated work (replace with real items) --- */
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
    year: "2025",
    hero: true,
    caseStudy: true,
    href: "/portfolio/operations-training-simulator",
    thumb:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1600&q=70",
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
    year: "2024",
    caseStudy: true,
    href: "/portfolio/product-configurator",
    thumb:
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1600&q=70",
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
    year: "2025",
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1600&q=70",
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
    year: "2025",
    hero: true,
    caseStudy: true,
    href: "/portfolio/co-op-multiplayer-systems",
    thumb:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=70",
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
    year: "2024",
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1520975958225-74ef12a2f6fb?auto=format&fit=crop&w=1600&q=70",
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
    year: "2025",
    caseStudy: true,
    href: "/portfolio/game-ui-ux-refresh",
    thumb:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=70",
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
    year: "2024",
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
    year: "2023",
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1600&q=70",
  },
];

const ALL_TAGS = [
  "Training",
  "Simulation",
  "Safety",
  "Configurator",
  "Commerce",
  "3D",
  "Spatial",
  "Showcase",
  "Prototype",
  "Multiplayer",
  "Systems",
  "Live Ops",
  "Art",
  "Pipeline",
  "UI/UX",
  "Design",
  "AR",
  "Marketing",
  "Microsite",
  "Gameplay",
  "Production",
];

const PLATFORM_TAGS = ["Meta Quest", "Apple Vision Pro", "Web", "Mobile", "PC", "Console"];
const TECH_TAGS = ["Unity", "Unreal", "Three.js", "WebXR", "Photon", "PlayFab", "Blender", "Substance"];

/* =======================================================================================
   Page
======================================================================================= */

export default function Uportfoliov1Legacy() {
  const reduceMotion = useReducedMotion() ?? false;

  const [studio, setStudio] = useState<Studio>("All");
  const [q, setQ] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [platformFilters, setPlatformFilters] = useState<string[]>([]);
  const [techFilters, setTechFilters] = useState<string[]>([]);
  const [onlyCaseStudies, setOnlyCaseStudies] = useState(false);

  // Accent variables: change the “light”, not the layout.
  const accent = studio === "XR" ? ACCENT_XR : studio === "Games" ? ACCENT_GAMES : ACCENT_XR; // base fallback
  const accent2 = studio === "All" ? ACCENT_GAMES : accent;

  const curated = useMemo(() => {
    let list = [...CASES];

    // Studio filter
    if (studio !== "All") list = list.filter((c) => c.studio === studio);

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
          c.year ?? "",
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(query);
      });
    }

    // Tag filters
    if (tagFilters.length) list = list.filter((c) => tagFilters.every((t) => c.tags.includes(t) || c.tags.includes(t)));
    if (platformFilters.length)
      list = list.filter((c) => platformFilters.every((p) => c.platform.includes(p)));
    if (techFilters.length) list = list.filter((c) => techFilters.every((t) => c.tech.includes(t)));
    if (onlyCaseStudies) list = list.filter((c) => !!c.caseStudy);

    // Curated Museum: keep it tight (selected work).
    // If you have more items later, keep “selected” list via a `featured` flag.
    return list.slice(0, 12);
  }, [studio, q, tagFilters, platformFilters, techFilters, onlyCaseStudies]);

  const featured = useMemo(() => {
    const heroPick =
      curated.find((c) => c.hero && (studio === "All" ? true : c.studio === studio)) ??
      curated[0] ??
      CASES[0];
    return heroPick;
  }, [curated, studio]);

  const byCapability = useMemo(
    () => [
      { id: "cap-training", label: "Training & Simulation", preset: { tags: ["Training", "Simulation"] } },
      { id: "cap-spatial", label: "Spatial / Vision Pro", preset: { platforms: ["Apple Vision Pro"], tags: ["Spatial"] } },
      { id: "cap-config", label: "Configurators", preset: { tags: ["Configurator", "3D"] } },
      { id: "cap-mp", label: "Multiplayer Systems", preset: { tags: ["Multiplayer", "Systems"] } },
      { id: "cap-ar", label: "AR Marketing", preset: { tags: ["AR", "Marketing"] } },
      { id: "cap-ui", label: "UI/UX", preset: { tags: ["UI/UX", "Design"] } },
    ],
    []
  );

  function applyPreset(preset: { tags?: string[]; platforms?: string[]; tech?: string[] }) {
    setTagFilters(preset.tags ?? []);
    setPlatformFilters(preset.platforms ?? []);
    setTechFilters(preset.tech ?? []);
    setOnlyCaseStudies(false);
    setDrawerOpen(false);
    // gentle scroll to grid
    document.getElementById("portfolio-grid")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

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
      {/* Accent “light” controller */}
      <style>{`
        :root {
          --wodh-xr: ${ACCENT_XR};
          --wodh-games: ${ACCENT_GAMES};
          --wodh-accent: ${accent};
          --wodh-accent2: ${accent2};
        }
        ::selection { background: rgba(158,243,21,0.22); }
      `}</style>

      <Header />

      {/* ===================================================================================
          SECTION 1 — Hero (Proof, not promises)
      =================================================================================== */}
      <section id="portfolio-hero" className="relative mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6 sm:pt-16">
        <GlassCard className="p-6 sm:p-10">
          {/* Ambient corner glows (quiet) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(158,243,21,0.22), transparent 60%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(91,45,220,0.20), transparent 60%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 left-1/2 h-96 w-[520px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                studio === "XR"
                  ? "radial-gradient(circle, rgba(158,243,21,0.18), transparent 62%)"
                  : studio === "Games"
                    ? "radial-gradient(circle, rgba(91,45,220,0.18), transparent 62%)"
                    : "radial-gradient(circle, rgba(255,255,255,0.06), transparent 60%)",
            }}
          />

          <div className="relative flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Chip>Portfolio</Chip>
                <Chip variant="default">Curated Museum</Chip>
                <Chip variant="default">Selected Work</Chip>
              </div>

              <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Proof you can feel.
                <span className="block text-white/70">
                  A calm, curated set of XR and Games work — built for real shipping, not just screenshots.
                </span>
              </h1>

              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-white/60 sm:text-base">
                Browse by studio, search by outcomes, or open filters when you need precision. Neon is used like a signal — the work stays true.
              </p>
            </div>

            {/* Studio switch + Search */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SegmentedStudio studio={studio} setStudio={setStudio} />
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <SearchBox q={q} setQ={setQ} />
                <Button
                  variant="glass"
                  onClick={() => setDrawerOpen(true)}
                  className="w-full sm:w-auto"
                  title="Open filters"
                >
                  Filters
                  <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
                    {tagFilters.length + platformFilters.length + techFilters.length + (onlyCaseStudies ? 1 : 0)}
                  </span>
                </Button>
              </div>
            </div>

            {/* Proof chips */}
            <div className="flex flex-wrap gap-2">
              <ProofChip label="Studios" value="XR + Games" />
              <ProofChip label="Focus" value="Shipping & polish" />
              <ProofChip label="Signals" value="Outcomes-first" />
              <ProofChip label="Modes" value={studio} glow />
            </div>

            {/* Quiet reel strip (blurred thumbnails) */}
            <ReelStrip studio={studio} reduceMotion={reduceMotion} />
          </div>
        </GlassCard>
      </section>

      {/* ===================================================================================
          SECTION 2 — Featured Case (one authoritative anchor)
      =================================================================================== */}
      <section id="portfolio-featured" className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <FeaturedCaseCard item={featured} studio={studio} reduceMotion={reduceMotion} />
      </section>

      {/* ===================================================================================
          SECTION 3 — Curated Grid
      =================================================================================== */}
      <section id="portfolio-grid" className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">Selected work</h2>
            <p className="mt-1 text-sm text-white/60">
              Curated set — quiet base, neon as signal. Hover for what we did.
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Chip>{curated.length} items</Chip>
            {onlyCaseStudies && <Chip>Case studies only</Chip>}
          </div>
        </div>

        {curated.length === 0 ? (
          <GlassCard className="p-8 text-white/70">
            No matches. Try clearing filters or searching a broader term.
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {curated.map((item) => (
              <CaseCard key={item.id} item={item} reduceMotion={reduceMotion} />
            ))}
          </div>
        )}
      </section>

      {/* ===================================================================================
          SECTION 4 — Outcomes Strip (results, not gallery)
      =================================================================================== */}
      <section id="portfolio-outcomes" className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <GlassCard className="overflow-hidden">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="max-w-xl">
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-white">Outcome-led craft</h3>
              <p className="mt-1 text-sm text-white/60">
                Portfolio reads better when it speaks in outcomes: speed, clarity, stability, performance — the things that ship.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <OutcomePill>Clarity-first UX</OutcomePill>
              <OutcomePill>Device optimization</OutcomePill>
              <OutcomePill>Production-ready systems</OutcomePill>
              <OutcomePill>Clean pipelines</OutcomePill>
            </div>
          </div>
          <div className="h-px w-full bg-white/10" />
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-3">
            <Metric label="Shipping mindset" value="Prototype → Production" />
            <Metric label="Signal design" value="Neon as instrumentation" />
            <Metric label="Work curation" value="Selected, not everything" />
          </div>
        </GlassCard>
      </section>

      {/* ===================================================================================
          SECTION 5 — By Capability Index (fast navigation)
      =================================================================================== */}
      <section id="portfolio-capabilities" className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="mb-5">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">Browse by capability</h2>
          <p className="mt-1 text-sm text-white/60">
            Quick lanes that apply filters — designed to reduce scrolling and help clients find “something similar”.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {byCapability.map((c) => (
            <button
              key={c.id}
              onClick={() => applyPreset(c.preset)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left",
                "transition-transform duration-200 will-change-transform hover:-translate-y-0.5"
              )}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(900px 260px at 50% 0%, rgba(255,255,255,0.08), transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold tracking-[-0.01em] text-white">{c.label}</h3>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      boxShadow:
                        studio === "XR"
                          ? `0 0 0 6px rgba(158,243,21,0.10)`
                          : studio === "Games"
                            ? `0 0 0 6px rgba(91,45,220,0.10)`
                            : `0 0 0 6px rgba(255,255,255,0.06)`,
                      background:
                        studio === "XR" ? "rgba(158,243,21,0.9)" : studio === "Games" ? "rgba(91,45,220,0.9)" : "rgba(255,255,255,0.65)",
                    }}
                  />
                </div>
                <p className="mt-2 text-sm text-white/60">
                  Apply a focused view and jump straight to relevant work.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(c.preset.tags ?? []).slice(0, 3).map((t) => (
                    <Chip key={t} variant="default">
                      {t}
                    </Chip>
                  ))}
                  {(c.preset.platforms ?? []).slice(0, 2).map((p) => (
                    <Chip key={p} variant="default">
                      {p}
                    </Chip>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ===================================================================================
          SECTION 6 — Final CTA (conversion, still premium)
      =================================================================================== */}
      <section id="portfolio-cta" className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pb-20">
        <GlassCard className="p-7 sm:p-10">
          {/* Dual-studio haze (signature, subtle) */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(158,243,21,0.18), transparent 62%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-28 -bottom-24 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(91,45,220,0.18), transparent 62%)" }}
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <Chip>Next step</Chip>
                <Chip variant="default">NDA-friendly</Chip>
                <Chip variant="default">Fast response</Chip>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                Bring us a problem worth shipping.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Tell us your target platform, timeline, and what “success” means. We’ll reply with clarity — scope, approach, and next steps.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <Button variant="primary" onClick={() => (window.location.href = "/contact")}>
                Start a project
              </Button>
              <Button variant="glass" onClick={() => (window.location.href = "mailto:hello@wodh.io")}>
                Email us
              </Button>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* ===================================================================================
          Filters Drawer (quiet power UI)
      =================================================================================== */}
      <FiltersDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        studio={studio}
        tagFilters={tagFilters}
        setTagFilters={setTagFilters}
        platformFilters={platformFilters}
        setPlatformFilters={setPlatformFilters}
        techFilters={techFilters}
        setTechFilters={setTechFilters}
        onlyCaseStudies={onlyCaseStudies}
        setOnlyCaseStudies={setOnlyCaseStudies}
        onClear={() => {
          setTagFilters([]);
          setPlatformFilters([]);
          setTechFilters([]);
          setOnlyCaseStudies(false);
        }}
        onApply={() => setDrawerOpen(false)}
      />
    </div>
  );
}

/* =======================================================================================
   Components
======================================================================================= */

function Header() {
  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl border border-white/10 bg-white/[0.04]" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">Wodh</div>
            <div className="text-[11px] text-white/55">Portfolio</div>
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
  );
}


function ProofChip({ label, value, glow }: { label: string; value: string; glow?: boolean }) {
  return (
    <div
      className={cn(
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

function Button({
  children,
  onClick,
  variant = "glass",
  className,
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "glass";
  className?: string;
  title?: string;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold tracking-[-0.01em] transition-transform duration-150 active:scale-[0.99]",
        variant === "primary"
          ? "text-black"
          : "border border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.05]",
        className
      )}
      style={
        variant === "primary"
          ? ({
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.82) 100%)",
              boxShadow:
                "0 18px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08), 0 0 36px rgba(158,243,21,0.10), 0 0 36px rgba(91,45,220,0.10)",
            } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </button>
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
      {/* active pill */}
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
        transition={{ duration: duration.fast, ease: easing.smooth }}
      />

      <div className="relative grid grid-cols-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setStudio(opt)}
            className={cn(
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
    <div className="relative w-full sm:w-[320px]">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/45">⌘</div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='Search "training", "multiplayer", "Vision Pro"…'
        className={cn(
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

function ReelStrip({ studio, reduceMotion }: { studio: Studio; reduceMotion: boolean }) {
  const items = useMemo(() => CASES.slice(0, 8), []);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-xs font-semibold text-white/70">A quiet reel of moments</div>
        <div className="text-[11px] text-white/45">Hover the grid for details</div>
      </div>
      <div className="h-px w-full bg-white/10" />
      <motion.div
        className="relative flex gap-2 p-3"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -120] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 14, ease: "linear", repeat: Infinity, repeatType: "mirror" }
        }
      >
        {items.concat(items.slice(0, 3)).map((c, idx) => (
          <div
            key={`${c.id}-${idx}`}
            className="relative h-20 w-36 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
          >
            <img
              src={c.thumb}
              alt=""
              className="h-full w-full object-cover opacity-70"
              style={{ filter: "saturate(0.92) contrast(1.05)" }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 text-[10px] font-semibold text-white/80">
              {clampText(c.title, 24)}
            </div>
          </div>
        ))}
        {/* Studio light overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              studio === "XR"
                ? "radial-gradient(900px 220px at 30% 20%, rgba(158,243,21,0.12), transparent 60%)"
                : studio === "Games"
                  ? "radial-gradient(900px 220px at 30% 20%, rgba(91,45,220,0.12), transparent 60%)"
                  : "radial-gradient(900px 220px at 30% 20%, rgba(255,255,255,0.06), transparent 60%)",
          }}
        />
      </motion.div>
    </div>
  );
}

function FeaturedCaseCard({
  item,
  studio,
  reduceMotion,
}: {
  item: CaseItem;
  studio: Studio;
  reduceMotion: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
        {/* Media */}
        <div className="relative min-h-[260px] overflow-hidden lg:min-h-[420px]">
          <motion.img
            key={item.id}
            src={item.thumb}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: duration.normal, ease: easing.smooth }}
            style={{ filter: "saturate(0.95) contrast(1.06)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Studio edge glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow:
                item.studio === "XR"
                  ? "inset 0 0 0 1px rgba(158,243,21,0.14), 0 0 80px rgba(158,243,21,0.12)"
                  : "inset 0 0 0 1px rgba(91,45,220,0.14), 0 0 80px rgba(91,45,220,0.12)",
            }}
          />

          <div className="absolute left-5 top-5 flex items-center gap-2">
            <Chip mode={item.studio === "XR" ? "xr" : "games"}>{item.studio}</Chip>
            {item.caseStudy ? <Chip variant="default">Case Study</Chip> : <Chip variant="default">Snapshot</Chip>}
            {item.year ? <Chip variant="default">{item.year}</Chip> : null}
          </div>

          <div className="absolute bottom-5 left-5 right-5">
            <div className="text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
              {item.title}
            </div>
            <div className="mt-1 text-sm text-white/70">{item.subtitle}</div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 sm:p-8">
          {/* Quiet studio light */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
            style={{
              background:
                item.studio === "XR"
                  ? "radial-gradient(circle, rgba(158,243,21,0.14), transparent 62%)"
                  : "radial-gradient(circle, rgba(91,45,220,0.14), transparent 62%)",
            }}
          />

          <div className="relative flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
                Featured work
              </h2>
              <p className="mt-1 text-sm text-white/60">
                One anchor case that represents the craft: calm UX, sharp systems, real-world constraints.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoBlock label="Outcomes" items={item.outcomes.slice(0, 3)} />
              <InfoBlock label="What we did" items={item.role.slice(0, 3)} />
              <InfoBlock label="Platforms" items={item.platform.slice(0, 3)} />
              <InfoBlock label="Tech" items={item.tech.slice(0, 3)} />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {item.caseStudy ? (
                <Button
                  variant="primary"
                  onClick={() => (window.location.href = item.href || "#")}
                  className="w-full sm:w-auto"
                >
                  Explore case study
                </Button>
              ) : (
                <Button variant="glass" className="w-full sm:w-auto" onClick={() => document.getElementById("portfolio-grid")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })}>
                  View selected work
                </Button>
              )}
              <div className="flex flex-wrap gap-2">
                {item.tags.slice(0, 4).map((t) => (
                  <Chip key={t} variant="default">
                    {t}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs font-semibold text-white/75">Museum rule</div>
              <div className="mt-1 text-sm text-white/60">
                Neon appears on intent: hover, focus, and studio mode — never as constant noise.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="text-[11px] font-semibold text-white/70">{label}</div>
      <ul className="mt-2 space-y-1 text-sm text-white/70">
        {items.map((x) => (
          <li key={x} className="flex gap-2">
            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/40" />
            <span>{x}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseCard({ item, reduceMotion }: { item: CaseItem; reduceMotion: boolean }) {
  const isXR = item.studio === "XR";
  const glow = isXR ? "rgba(158,243,21,0.18)" : "rgba(91,45,220,0.18)";
  const edge = isXR ? "rgba(158,243,21,0.24)" : "rgba(91,45,220,0.24)";

  return (
    <motion.a
      href={item.href || "#"}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]",
        "shadow-[0_26px_100px_rgba(0,0,0,0.45)]"
      )}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: duration.fast, ease: easing.smooth }}
      onClick={(e) => {
        if (!item.caseStudy) e.preventDefault(); // snapshots don't navigate by default
      }}
    >
      {/* Media */}
      <div className="relative h-44 overflow-hidden">
        <motion.img
          src={item.thumb}
          alt={item.title}
          className="h-full w-full object-cover opacity-90"
          loading="lazy"
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          transition={{ duration: duration.normal, ease: easing.smooth }}
          style={{ filter: "saturate(0.95) contrast(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        {/* Hover edge glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 0 1px ${edge}, 0 0 48px ${glow}`,
          }}
        />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Chip mode={item.studio === "XR" ? "xr" : "games"}>{item.studio}</Chip>
          {item.caseStudy ? <Chip variant="default">Case Study</Chip> : <Chip variant="default">Snapshot</Chip>}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-sm font-semibold tracking-[-0.02em] text-white">{item.title}</div>
          <div className="mt-1 text-xs text-white/70">{clampText(item.subtitle, 64)}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {item.platform.slice(0, 2).map((p) => (
            <Chip key={p} variant="default">
              {p}
            </Chip>
          ))}
          {item.tech.slice(0, 1).map((t) => (
            <Chip key={t} variant="default">
              {t}
            </Chip>
          ))}
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
          <span>{item.year ? item.year : "—"}</span>
          <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            {item.caseStudy ? "Open →" : "Preview"}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function OutcomePill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/70"
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.03)" }}
    >
      {children}
    </span>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-white/10 p-6 sm:border-t-0 sm:border-l">
      <div className="text-[11px] font-semibold text-white/60">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white/85">{value}</div>
      <div className="mt-2 h-px w-10 bg-white/10" />
    </div>
  );
}

/* =======================================================================================
   Filters Drawer
======================================================================================= */

function FiltersDrawer(props: {
  open: boolean;
  onClose: () => void;
  studio: Studio;
  tagFilters: string[];
  setTagFilters: (v: string[]) => void;
  platformFilters: string[];
  setPlatformFilters: (v: string[]) => void;
  techFilters: string[];
  setTechFilters: (v: string[]) => void;
  onlyCaseStudies: boolean;
  setOnlyCaseStudies: (v: boolean) => void;
  onClear: () => void;
  onApply: () => void;
}) {
  const {
    open,
    onClose,
    studio,
    tagFilters,
    setTagFilters,
    platformFilters,
    setPlatformFilters,
    techFilters,
    setTechFilters,
    onlyCaseStudies,
    setOnlyCaseStudies,
    onClear,
    onApply,
  } = props;

  const reduceMotion = useReducedMotion() ?? false;
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function toggle(list: string[], value: string, set: (v: string[]) => void) {
    if (list.includes(value)) set(list.filter((x) => x !== value));
    else set([...list, value]);
  }

  const studioGlow =
    studio === "XR"
      ? "rgba(158,243,21,0.14)"
      : studio === "Games"
        ? "rgba(91,45,220,0.14)"
        : "rgba(255,255,255,0.06)";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : duration.fast }}
        >
          {/* scrim */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={onClose}
            aria-hidden
          />

          {/* panel */}
          <motion.div
            ref={panelRef}
            className="absolute right-0 top-0 h-full w-full max-w-[520px] overflow-y-auto border-l border-white/10 bg-[#070814]/90 backdrop-blur-xl"
            initial={reduceMotion ? { x: 0 } : { x: 20, opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduceMotion ? { x: 0 } : { x: 20, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : duration.fast, ease: easing.smooth }}
          >
            <div className="relative p-6 sm:p-7">
              {/* quiet glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle, ${studioGlow}, transparent 62%)` }}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip>Filters</Chip>
                    <Chip variant="default">Curated control</Chip>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-white">Refine the selection</h3>
                  <p className="mt-1 text-sm text-white/60">
                    Keep it clean. Filters are here when you need precision.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70 hover:bg-white/[0.05]"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-white/80">Case studies only</div>
                    <button
                      onClick={() => setOnlyCaseStudies(!onlyCaseStudies)}
                      className={cn(
                        "relative h-7 w-12 rounded-full border border-white/10 transition-colors",
                        onlyCaseStudies ? "bg-white/10" : "bg-white/[0.03]"
                      )}
                      style={{
                        boxShadow: onlyCaseStudies
                          ? "0 0 0 1px rgba(255,255,255,0.08), 0 0 22px rgba(158,243,21,0.10), 0 0 22px rgba(91,45,220,0.10)"
                          : "0 0 0 1px rgba(255,255,255,0.03)",
                      }}
                    >
                      <span
                        className={cn(
                          "absolute top-1 h-5 w-5 rounded-full bg-white/80 transition-transform",
                          onlyCaseStudies ? "translate-x-6" : "translate-x-1"
                        )}
                      />
                    </button>
                  </div>
                  <div className="mt-2 text-xs text-white/55">
                    Portfolio stays curated — this just hides snapshots.
                  </div>
                </div>

                <FilterGroup
                  title="Use-cases / tags"
                  subtitle="Pick a few. Curated pages hate clutter."
                  values={ALL_TAGS}
                  selected={tagFilters}
                  onToggle={(v) => toggle(tagFilters, v, setTagFilters)}
                />

                <FilterGroup
                  title="Platforms"
                  subtitle="Choose target devices."
                  values={PLATFORM_TAGS}
                  selected={platformFilters}
                  onToggle={(v) => toggle(platformFilters, v, setPlatformFilters)}
                />

                <FilterGroup
                  title="Tech"
                  subtitle="Engines and stacks."
                  values={TECH_TAGS}
                  selected={techFilters}
                  onToggle={(v) => toggle(techFilters, v, setTechFilters)}
                />
              </div>

              <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={onClear}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/75 hover:bg-white/[0.05]"
                >
                  Clear
                </button>
                <button
                  onClick={onApply}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-black"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.82) 100%)",
                    boxShadow:
                      "0 18px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08), 0 0 28px rgba(158,243,21,0.10), 0 0 28px rgba(91,45,220,0.10)",
                  }}
                >
                  Apply filters
                </button>
              </div>

              <div className="mt-6 text-[11px] text-white/45">
                Tip: Keep 1–3 filters for premium clarity.
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function FilterGroup({
  title,
  subtitle,
  values,
  selected,
  onToggle,
}: {
  title: string;
  subtitle: string;
  values: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="text-sm font-semibold text-white/80">{title}</div>
      <div className="mt-1 text-xs text-white/55">{subtitle}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {values.map((v) => {
          const active = selected.includes(v);
          return (
            <button
              key={v}
              onClick={() => onToggle(v)}
              className={cn(
                "rounded-full border px-3 py-2 text-xs font-semibold transition-colors",
                active
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.05]"
              )}
              style={
                active
                  ? ({
                      boxShadow:
                        "0 0 0 1px rgba(255,255,255,0.08), 0 0 26px rgba(158,243,21,0.08), 0 0 26px rgba(91,45,220,0.08)",
                    } as React.CSSProperties)
                  : undefined
              }
            >
              {v}
            </button>
          );
        })}
      </div>
    </div>
  );
}
