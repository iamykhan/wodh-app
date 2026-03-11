"use client";

/* =======================================================================================
   Wodh — Portfolio Page (Variant C: Cinematic Reel — most viral)
   - Reel-strip hero (cinematic, scroll-friendly, “moment” thumbnails)
   - Studio switch (All / XR / Games) changes accent light (not layout)
   - “Now Playing” featured case with reel scrub + autoplay-on-hover feel
   - Viral poster-grade tiles (bigger media, fewer words, outcome tags)
   - Subtle film grain + haze + glow as signal (XR green / Games violet)
   - Prefers-reduced-motion respected
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
  thumb: string; // poster still
  reel?: string[]; // optional: additional stills for “scrub”
};

const ACCENT_XR = "colors.neon.base";
const ACCENT_GAMES = "colors.violet.base";
const BASE_BG = "colors.background.primary";

/** Demo items (replace later) */
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
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1800&q=70",
    reel: [
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1800&q=70",
      "https://images.unsplash.com/photo-1581091215367-59ab6b5d0f3c?auto=format&fit=crop&w=1800&q=70",
      "https://images.unsplash.com/photo-1581091870627-3f98d8a11963?auto=format&fit=crop&w=1800&q=70",
    ],
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
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=70",
    reel: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=70",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1800&q=70",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1800&q=70",
    ],
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
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1800&q=70",
    reel: [
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1800&q=70",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1800&q=70",
      "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1800&q=70",
    ],
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
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1800&q=70",
    reel: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1800&q=70",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1800&q=70",
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1800&q=70",
    ],
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
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1800&q=70",
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
      "https://images.unsplash.com/photo-1520975958225-74ef12a2f6fb?auto=format&fit=crop&w=1800&q=70",
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
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=70",
  },
];

export default function Uportfoliov3Legacy() {
  const reduceMotion = useReducedMotion() ?? false;

  const [studio, setStudio] = useState<Studio>("All");
  const [activeId, setActiveId] = useState<string>(CASES[0]?.id ?? "xr-training-sim");
  const [scrub, setScrub] = useState(0); // 0..1

  const accent = studio === "XR" ? ACCENT_XR : studio === "Games" ? ACCENT_GAMES : ACCENT_XR;
  const accent2 = studio === "All" ? ACCENT_GAMES : accent;

  const list = useMemo(() => {
    let items = [...CASES];
    if (studio !== "All") items = items.filter((c) => c.studio === studio);
    // Viral reel: featured first, newest next
    items.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.year - a.year);
    return items;
  }, [studio]);

  useEffect(() => {
    // keep active in filtered list
    if (!list.find((x) => x.id === activeId)) setActiveId(list[0]?.id ?? CASES[0].id);
    // reset scrub on mode switch
    setScrub(0);
  }, [studio]); // eslint-disable-line react-hooks/exhaustive-deps

  const active = useMemo(() => list.find((x) => x.id === activeId) ?? list[0], [list, activeId]);

  const poster = useMemo(() => {
    const frames = active?.reel ?? [active?.thumb].filter(Boolean) as string[];
    if (!frames.length) return active?.thumb;
    if (frames.length === 1) return frames[0];
    const idx = Math.min(frames.length - 1, Math.max(0, Math.round(scrub * (frames.length - 1))));
    return frames[idx];
  }, [active, scrub]);

  return (
    <div
      className="min-h-screen"
      style={
        {
          background: `radial-gradient(1200px 800px at 10% 0%, rgba(158,243,21,0.12), transparent 55%),
                       radial-gradient(1000px 700px at 90% 10%, rgba(91,45,220,0.12), transparent 55%),
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
              <div className="text-[11px] text-white/55">Portfolio — Cinematic Reel</div>
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
          SECTION 1 — HERO (Cinematic headline + Reel strip)
      =================================================================================== */}
      <section id="portfolio-hero" className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-10">
          {/* Atmosphere lights */}
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
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                studio === "XR"
                  ? "radial-gradient(circle, rgba(158,243,21,0.14), transparent 62%)"
                  : studio === "Games"
                    ? "radial-gradient(circle, rgba(91,45,220,0.14), transparent 62%)"
                    : "radial-gradient(circle, rgba(255,255,255,0.06), transparent 60%)",
            }}
          />

          <div className="relative flex flex-col gap-7">
            <div className="flex flex-wrap items-center gap-2">
              <Chip>Portfolio</Chip>
              <Chip variant="default">Variant C — Cinematic Reel</Chip>
              <Chip variant="default">Most viral</Chip>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                A reel of moments.
                <span className="block text-white/70">Pick a scene. Feel the craft.</span>
              </h1>
              <p className="max-w-2xl text-pretty text-sm leading-relaxed text-white/60 sm:text-base">
                This view is designed for social sharing and instant wow — while still keeping studio clarity and outcomes.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SegmentedStudio studio={studio} setStudio={setStudio} />
              <div className="flex flex-wrap items-center gap-2">
                <GhostPill label="Now playing" value={active?.studio ?? "—"} glow />
                <GhostPill label="Items" value={String(list.length)} />
                <GhostPill label="Mode" value={studio} />
              </div>
            </div>

            {/* Reel strip */}
            <ReelStrip
              studio={studio}
              items={list}
              activeId={activeId}
              onSelect={(id) => setActiveId(id)}
              reduceMotion={reduceMotion}
            />
          </div>
        </div>
      </section>

      {/* ===================================================================================
          SECTION 2 — NOW PLAYING (poster-grade featured)
      =================================================================================== */}
      <section id="portfolio-now-playing" className="relative mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 sm:pt-10">
        {active ? (
          <NowPlaying
            item={active}
            poster={poster}
            scrub={scrub}
            setScrub={setScrub}
            reduceMotion={reduceMotion}
          />
        ) : null}
      </section>

      {/* ===================================================================================
          SECTION 3 — VIRAL GRID (bigger tiles, mood-first)
      =================================================================================== */}
      <section id="portfolio-grid" className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
              Moments
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Poster-grade tiles. Hover for outcomes — click to open case studies when available.
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Chip variant="default">Bigger media</Chip>
            <Chip variant="default">Fewer words</Chip>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {list.map((c, idx) => (
            <ViralTile
              key={c.id}
              item={c}
              active={c.id === activeId}
              onSelect={() => setActiveId(c.id)}
              reduceMotion={reduceMotion}
              span={idx % 7 === 0 ? "md:col-span-7" : idx % 7 === 1 ? "md:col-span-5" : "md:col-span-4"}
            />
          ))}
        </div>
      </section>

      {/* ===================================================================================
          SECTION 4 — CTA (shareable tone)
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
                <Chip>Next scene</Chip>
                <Chip variant="default">XR + Games</Chip>
                <Chip variant="default">Production-ready</Chip>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                Want your product to look like this — and ship like this?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Bring your constraints. We’ll propose a real plan — timeline, scope, and the fastest path to proof.
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
   Components
======================================================================================= */

function GhostPill({ label, value, glow }: { label: string; value: string; glow?: boolean }) {
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
        transition={{ duration: duration.fast, ease: easing.smooth }}
      />
      <div className="relative grid grid-cols-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setStudio(opt)}
            className={cn("rounded-xl px-3 py-2 text-xs font-semibold transition-colors", opt === studio ? "text-white" : "text-white/60 hover:text-white/80")}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* --- Reel Strip (select scenes) --- */
function ReelStrip({
  studio,
  items,
  activeId,
  onSelect,
  reduceMotion,
}: {
  studio: Studio;
  items: CaseItem[];
  activeId: string;
  onSelect: (id: string) => void;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  // gentle drift for “viral” feel (disabled on reduced motion)
  const drift = reduceMotion ? undefined : { x: [0, -90] };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-xs font-semibold text-white/70">Reel</div>
        <div className="text-[11px] text-white/45">Click a frame to play</div>
      </div>
      <div className="h-px w-full bg-white/10" />

      <motion.div
        ref={ref}
        className="relative flex gap-2 p-3"
        animate={drift}
        transition={reduceMotion ? undefined : { duration: 12, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
      >
        {items.concat(items.slice(0, 4)).map((c, idx) => {
          const active = c.id === activeId;
          const isXR = c.studio === "XR";
          const edge = isXR ? "rgba(158,243,21,0.30)" : "rgba(91,45,220,0.30)";
          const glow = isXR ? "rgba(158,243,21,0.18)" : "rgba(91,45,220,0.18)";
          return (
            <button
              key={`${c.id}-${idx}`}
              onClick={() => onSelect(c.id)}
              className={cn(
                "group relative h-24 w-44 flex-none overflow-hidden rounded-xl border bg-white/[0.03] text-left",
                active ? "border-white/20" : "border-white/10"
              )}
              style={
                active
                  ? ({
                      boxShadow: `inset 0 0 0 1px ${edge}, 0 0 40px ${glow}`,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <img
                src={c.thumb}
                alt=""
                className="h-full w-full object-cover opacity-80"
                style={{ filter: "saturate(0.92) contrast(1.05)" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-[10px] font-semibold text-white/85">{clampText(c.title, 26)}</div>
                <div className="mt-0.5 text-[10px] text-white/55">{c.studio}</div>
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10)" }} />
            </button>
          );
        })}

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

/* --- Now Playing --- */
function NowPlaying({
  item,
  poster,
  scrub,
  setScrub,
  reduceMotion,
}: {
  item: CaseItem;
  poster: string | undefined;
  scrub: number;
  setScrub: (v: number) => void;
  reduceMotion: boolean;
}) {
  const isXR = item.studio === "XR";
  const edge = isXR ? "rgba(158,243,21,0.26)" : "rgba(91,45,220,0.26)";
  const glow = isXR ? "rgba(158,243,21,0.14)" : "rgba(91,45,220,0.14)";
  const frames = item.reel ?? [item.thumb];
  const hasReel = frames.length > 1;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Poster stage */}
        <div className="relative min-h-[320px] overflow-hidden lg:min-h-[520px]">
          <motion.img
            key={poster || item.thumb}
            src={poster || item.thumb}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : duration.fast, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ filter: "saturate(0.95) contrast(1.06)" }}
          />
          {/* grading */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/05" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

          {/* subtle grain */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E)",
            }}
          />

          {/* studio edge */}
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${edge}, 0 0 90px ${glow}` }} />

          <div className="absolute left-5 top-5 flex items-center gap-2">
            <Chip>{item.studio}</Chip>
            {item.caseStudy ? <Chip variant="default">Case Study</Chip> : <Chip variant="default">Snapshot</Chip>}
            {item.featured ? <Chip variant="default">Featured</Chip> : null}
            <Chip variant="default">{item.year}</Chip>
          </div>

          {/* scrub bar */}
          {hasReel ? (
            <div className="absolute bottom-5 left-5 right-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-[11px] font-semibold text-white/70">Scrub</div>
                <div className="text-[11px] text-white/45">{Math.round(scrub * 100)}%</div>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(scrub * 100)}
                onChange={(e) => setScrub(Number(e.target.value) / 100)}
                className="w-full accent-white"
              />
              <div className="mt-2 text-[11px] text-white/45">
                Reel frames: {frames.length} (swap to real video later)
              </div>
            </div>
          ) : null}
        </div>

        {/* Details */}
        <div className="relative p-6 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, ${glow}, transparent 62%)` }}
          />
          <div className="relative flex flex-col gap-6">
            <div>
              <div className="text-[11px] font-semibold text-white/55">NOW PLAYING</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{item.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoBlock label="Outcomes" items={item.outcomes.slice(0, 3)} />
              <InfoBlock label="What we did" items={item.role.slice(0, 3)} />
              <InfoBlock label="Platforms" items={item.platform.slice(0, 3)} />
              <InfoBlock label="Tech" items={item.tech.slice(0, 3)} />
            </div>

            <div className="flex flex-wrap gap-2">
              {item.tags.slice(0, 6).map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/60">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {item.caseStudy ? (
                <button
                  onClick={() => (window.location.href = item.href || "#")}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-black"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.82) 100%)",
                    boxShadow:
                      "0 18px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08), 0 0 28px rgba(158,243,21,0.10), 0 0 28px rgba(91,45,220,0.10)",
                  }}
                >
                  Open case study
                </button>
              ) : (
                <button
                  onClick={() => document.getElementById("portfolio-grid")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.05]"
                >
                  Browse moments
                </button>
              )}
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.05]"
                title="Copy page link"
              >
                Copy link
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs font-semibold text-white/75">Viral rule</div>
              <div className="mt-1 text-sm text-white/60">
                Let the stills do the talking. Words exist only to explain outcomes.
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

/* --- Viral Tile --- */
function ViralTile({
  item,
  active,
  onSelect,
  reduceMotion,
  span,
}: {
  item: CaseItem;
  active: boolean;
  onSelect: () => void;
  reduceMotion: boolean;
  span: string;
}) {
  const isXR = item.studio === "XR";
  const edge = isXR ? "rgba(158,243,21,0.26)" : "rgba(91,45,220,0.26)";
  const glow = isXR ? "rgba(158,243,21,0.12)" : "rgba(91,45,220,0.12)";

  return (
    <motion.button
      onClick={onSelect}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-left",
        "shadow-[0_26px_100px_rgba(0,0,0,0.45)]",
        span
      )}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: duration.fast, ease: easing.smooth }}
      style={
        active
          ? ({
              boxShadow: `0 26px 100px rgba(0,0,0,0.45), inset 0 0 0 1px ${edge}, 0 0 70px ${glow}`,
            } as React.CSSProperties)
          : undefined
      }
    >
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={item.thumb}
          alt={item.title}
          className="h-full w-full object-cover opacity-90"
          loading="lazy"
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          transition={{ duration: duration.normal, ease: easing.smooth }}
          style={{ filter: "saturate(0.95) contrast(1.06)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${edge}, 0 0 56px ${glow}` }}
        />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Chip>{item.studio}</Chip>
          {item.caseStudy ? <Chip variant="default">Case</Chip> : <Chip variant="default">Snap</Chip>}
          {item.featured ? <Chip variant="default">★</Chip> : null}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-sm font-semibold tracking-[-0.02em] text-white">{item.title}</div>
          <div className="mt-1 text-xs text-white/70">{clampText(item.subtitle, 58)}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.outcomes.slice(0, 2).map((o) => (
              <span key={o} className="rounded-full border border-white/10 bg-white/[0.02] px-2 py-1 text-[11px] text-white/65">
                {o}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
