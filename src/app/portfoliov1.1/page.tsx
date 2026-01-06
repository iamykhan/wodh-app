"use client";

/* =======================================================================================
   Wodh — Portfolio Page (Variant D: Spectrum Spine — signature + premium)
   - Single “spine” (green ↔ violet) that anchors the entire narrative
   - Projects dock into the spine as nodes (XR/Games mix in one universe)
   - Headings + lead lines use indigo base + green/violet blend in text
   - Filters are minimal (All / XR / Games) but layout stays unified
   - Subtle energy shimmer + node “magnet” hover
   - Prefers-reduced-motion respected
======================================================================================= */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Studio = "All" | "XR" | "Games";

type CaseItem = {
  id: string;
  title: string;
  studio: Exclude<Studio, "All">;
  subtitle: string;
  outcomes: string[];
  platforms: string[];
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

const BASE_BG = "#070814";
const INDIGO_INK = "#0A0B1B";
const ACCENT_XR = "#9EF315";
const ACCENT_GAMES = "#5B2DDC";

/** Replace this with real cases later */
const CASES: CaseItem[] = [
  {
    id: "ops-training-sim",
    title: "Operations Training Simulator",
    studio: "XR",
    subtitle: "Safety + workflows — scalable training for distributed teams.",
    outcomes: ["Faster onboarding", "Repeatable drills", "Lower training cost"],
    platforms: ["Meta Quest", "PC"],
    tags: ["Training", "Simulation", "Safety"],
    year: 2025,
    featured: true,
    caseStudy: true,
    href: "/portfolio/operations-training-simulator",
    thumb:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "coop-multiplayer",
    title: "Co-op Multiplayer Systems",
    studio: "Games",
    subtitle: "Lobbies, matchmaking, progression — production-ready stability.",
    outcomes: ["Stable sessions", "Smooth matchmaking", "Scalable hooks"],
    platforms: ["PC", "Console"],
    tags: ["Multiplayer", "Systems", "Live Ops"],
    year: 2025,
    featured: true,
    caseStudy: true,
    href: "/portfolio/co-op-multiplayer-systems",
    thumb:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "product-configurator",
    title: "Real-time Product Configurator",
    studio: "XR",
    subtitle: "Photoreal variants — clarity-first buying decisions.",
    outcomes: ["Higher intent clicks", "Fewer pre-sales questions", "Fast iterations"],
    platforms: ["Web", "Mobile"],
    tags: ["Configurator", "Commerce", "3D"],
    year: 2024,
    caseStudy: true,
    href: "/portfolio/product-configurator",
    thumb:
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "ui-ux-refresh",
    title: "Game UI/UX Refresh",
    studio: "Games",
    subtitle: "Clarity-first HUD + menus — built for flow and readability.",
    outcomes: ["Better retention", "Cleaner navigation", "Less friction"],
    platforms: ["PC", "Console"],
    tags: ["UI/UX", "Design", "Systems"],
    year: 2025,
    caseStudy: true,
    href: "/portfolio/game-ui-ux-refresh",
    thumb:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "spatial-demo",
    title: "Spatial Demo Experience",
    studio: "XR",
    subtitle: "A guided spatial narrative designed for stakeholder confidence.",
    outcomes: ["Clearer demos", "Faster approvals", "Premium feel"],
    platforms: ["Apple Vision Pro"],
    tags: ["Spatial", "Showcase", "Prototype"],
    year: 2025,
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "stylized-art",
    title: "Stylized Art Pipeline",
    studio: "Games",
    subtitle: "Look-dev, characters, environments — consistent shippable style.",
    outcomes: ["Faster throughput", "Style consistency", "Cleaner reviews"],
    platforms: ["PC", "Mobile"],
    tags: ["Art", "Pipeline", "3D"],
    year: 2024,
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1520975958225-74ef12a2f6fb?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "ar-microsite",
    title: "AR Marketing Microsite",
    studio: "XR",
    subtitle: "Lightweight AR moment — fast, shareable, brand-safe.",
    outcomes: ["Higher engagement", "Fast load", "Clean brand control"],
    platforms: ["Web", "Mobile"],
    tags: ["AR", "Marketing", "Microsite"],
    year: 2024,
    caseStudy: false,
    thumb:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=70",
  },
];

/* =======================================================================================
   Main
======================================================================================= */

export default function PortfolioSpectrumSpine() {
  const reduceMotion = useReducedMotion();

  const [studio, setStudio] = useState<Studio>("All");
  const [activeId, setActiveId] = useState<string>(CASES[0]?.id ?? "");

  const list = useMemo(() => {
    let items = [...CASES];
    if (studio !== "All") items = items.filter((c) => c.studio === studio);
    items.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.year - a.year);
    return items;
  }, [studio]);

  useEffect(() => {
    if (!list.find((x) => x.id === activeId)) setActiveId(list[0]?.id ?? "");
  }, [list, activeId]);

  const active = useMemo(() => list.find((x) => x.id === activeId) ?? list[0], [list, activeId]);

  return (
    <div
      className="min-h-screen"
      style={
        {
          background: `
            radial-gradient(1200px 800px at 12% 0%, rgba(158,243,21,0.10), transparent 55%),
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
          --wodh-ink:${INDIGO_INK};
        }
        ::selection{ background: rgba(158,243,21,0.22); }
        /* subtle film grain */
        .wodh-grain{
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
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
              <div className="text-[11px] text-white/55">Portfolio — Spectrum Spine</div>
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
          SECTION 1 — HERO
      =================================================================================== */}
      <section id="portfolio-hero" className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-10">
          {/* atmosphere */}
          <div aria-hidden className="pointer-events-none absolute inset-0 wodh-grain opacity-[0.08]" />
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

          <div className="relative flex flex-col gap-7">
            <div className="flex flex-wrap items-center gap-2">
              <Chip>Portfolio</Chip>
              <Chip tone="muted">Variant D — Signature</Chip>
              <Chip tone="muted">XR + Games</Chip>
            </div>

            <div className="flex flex-col gap-3">
              {/* headline with indigo → violet wash + green highlight */}
              <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Proof, arranged on a spine.
                <span className="block text-white/70">
                  One universe — <GradientWord>XR</GradientWord> and <GradientWord alt>Games</GradientWord> in one narrative.
                </span>
              </h1>

              {/* lead line uses green ↔ violet gradient */}
              <p
                className="max-w-2xl text-pretty text-sm leading-relaxed sm:text-base"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.70) 42%, rgba(91,45,220,0.92))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Browse moments that dock into a continuous arc — outcomes first, craft always visible.
              </p>

              <p className="max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
                The layout never splits by studio. The <span className="text-white/70">signal</span> does.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SegmentedStudio studio={studio} setStudio={setStudio} />
              <div className="flex flex-wrap items-center gap-2">
                <StatPill label="Projects" value={String(list.length)} glow />
                <StatPill label="Active" value={active?.studio ?? "—"} />
                <StatPill label="Mode" value={studio} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================================
          SECTION 2 — SPINE LAYOUT
      =================================================================================== */}
      <section id="portfolio-spine" className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* left: nodes + spine */}
          <div className="relative">
            <SpineRail reduceMotion={reduceMotion} />

            <div className="relative space-y-4">
              {list.map((item, idx) => (
                <SpineNode
                  key={item.id}
                  item={item}
                  index={idx}
                  active={item.id === activeId}
                  onSelect={() => setActiveId(item.id)}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>

          {/* right: preview panel */}
          <aside className="relative">
            <PreviewPanel item={active} reduceMotion={reduceMotion} />
          </aside>
        </div>

        {/* CTA */}
        <div className="mt-10">
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
                  <Chip>Next</Chip>
                  <Chip tone="muted">NDA-friendly</Chip>
                  <Chip tone="muted">Fast response</Chip>
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                  If you have constraints, we have a spine for them.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Platform, timeline, scope — we’ll reply with a clear plan and the fastest path to proof.
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
        </div>
      </section>
    </div>
  );
}

/* =======================================================================================
   Spine Rail
======================================================================================= */

function SpineRail({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute left-[14px] top-0 h-full w-[2px] overflow-hidden">
      {/* base rail */}
      <div className="absolute inset-0 bg-white/10" />
      {/* gradient rail */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(180deg, rgba(158,243,21,0.00) 0%, rgba(158,243,21,0.45) 18%, rgba(255,255,255,0.18) 40%, rgba(91,45,220,0.48) 66%, rgba(91,45,220,0.00) 100%)",
        }}
      />
      {/* energy shimmer */}
      {!reduceMotion ? (
        <motion.div
          className="absolute left-0 top-0 h-36 w-full opacity-60 blur-[1px]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(158,243,21,0.55) 20%, rgba(255,255,255,0.20) 55%, rgba(91,45,220,0.55) 85%, transparent 100%)",
          }}
          animate={{ y: ["-20%", "120%"] }}
          transition={{ duration: 5.5, ease: "linear", repeat: Infinity }}
        />
      ) : null}
    </div>
  );
}

/* =======================================================================================
   Nodes + Preview
======================================================================================= */

function SpineNode({
  item,
  index,
  active,
  onSelect,
  reduceMotion,
}: {
  item: CaseItem;
  index: number;
  active: boolean;
  onSelect: () => void;
  reduceMotion: boolean;
}) {
  const isXR = item.studio === "XR";
  const edge = isXR ? "rgba(158,243,21,0.26)" : "rgba(91,45,220,0.26)";
  const glow = isXR ? "rgba(158,243,21,0.14)" : "rgba(91,45,220,0.14)";

  return (
    <motion.button
      onClick={onSelect}
      className={cx(
        "group relative w-full text-left",
        "rounded-3xl border bg-white/[0.03] p-5 sm:p-6",
        active ? "border-white/20" : "border-white/10"
      )}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      style={
        active
          ? ({
              boxShadow: `0 22px 90px rgba(0,0,0,0.45), inset 0 0 0 1px ${edge}, 0 0 60px ${glow}`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {/* node dot + connector */}
      <div className="absolute left-[6px] top-1/2 -translate-y-1/2">
        <div
          className="h-5 w-5 rounded-full border border-white/20 bg-black/40"
          style={{
            boxShadow: active ? `0 0 0 1px rgba(255,255,255,0.10), 0 0 18px ${glow}` : "0 0 0 1px rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="mx-auto mt-[6px] h-2 w-2 rounded-full"
            style={{ background: isXR ? "rgba(158,243,21,0.85)" : "rgba(91,45,220,0.85)" }}
          />
        </div>
      </div>

      {/* content */}
      <div className="pl-6">
        <div className="flex flex-wrap items-center gap-2">
          <Chip>{item.studio}</Chip>
          {item.featured ? <Chip tone="muted">Featured</Chip> : null}
          <Chip tone="muted">{item.year}</Chip>
          {item.caseStudy ? <Chip tone="muted">Case study</Chip> : <Chip tone="muted">Snapshot</Chip>}
        </div>

        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold tracking-[-0.02em] text-white sm:text-base">
              {item.title}
            </div>

            {/* indigo → violet wash + green hint for text */}
            <div
              className="mt-1 text-xs leading-relaxed sm:text-sm"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.70) 0%, rgba(91,45,220,0.72) 55%, rgba(158,243,21,0.70) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {item.subtitle}
            </div>
          </div>

          <div className="hidden shrink-0 sm:block">
            <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/55">
              #{String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.outcomes.slice(0, 3).map((o) => (
            <OutcomePill key={o} text={o} isXR={isXR} />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.platforms.slice(0, 2).map((p) => (
            <Chip key={p} tone="muted">
              {p}
            </Chip>
          ))}
          {item.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/55">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] text-white/50">
          <span>{item.caseStudy ? "Open →" : "Preview"}</span>
          <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Docked to spine
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function PreviewPanel({ item, reduceMotion }: { item?: CaseItem; reduceMotion: boolean }) {
  if (!item) return null;
  const isXR = item.studio === "XR";
  const edge = isXR ? "rgba(158,243,21,0.26)" : "rgba(91,45,220,0.26)";
  const glow = isXR ? "rgba(158,243,21,0.14)" : "rgba(91,45,220,0.14)";

  return (
    <div className="sticky top-[74px]">
      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
        style={{ boxShadow: `0 30px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)` }}
      >
        {/* image */}
        <div className="relative h-56 overflow-hidden sm:h-64">
          <motion.img
            key={item.id}
            src={item.thumb}
            alt={item.title}
            className="h-full w-full object-cover opacity-90"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ filter: "saturate(0.95) contrast(1.06)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${edge}, 0 0 70px ${glow}` }} />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <Chip>{item.studio}</Chip>
            <Chip tone="muted">{item.year}</Chip>
            {item.caseStudy ? <Chip tone="muted">Case</Chip> : <Chip tone="muted">Snap</Chip>}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-base font-semibold tracking-[-0.02em] text-white">{item.title}</div>
            <div className="mt-1 text-xs text-white/70">{item.subtitle}</div>
          </div>
        </div>

        {/* content */}
        <div className="p-6">
          <div className="text-[11px] font-semibold text-white/55">OUTCOMES</div>
          <div className="mt-3 space-y-2">
            {item.outcomes.slice(0, 3).map((o) => (
              <div key={o} className="flex gap-2 text-sm text-white/70">
                <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/40" />
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.70) 44%, rgba(91,45,220,0.95))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {o}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {item.platforms.slice(0, 3).map((p) => (
              <Chip key={p} tone="muted">
                {p}
              </Chip>
            ))}
            {item.tags.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/55">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
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
              <button className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.05]">
                Request details
              </button>
            )}

            <button
              onClick={() => (window.location.href = "/contact")}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.05]"
            >
              Talk to us
            </button>
          </div>

          <div className="mt-5 text-[11px] text-white/45">
            Tip: Replace preview image with real project media for maximum impact.
          </div>
        </div>
      </div>
    </div>
  );
}

/* =======================================================================================
   Small UI bits
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

function OutcomePill({ text, isXR }: { text: string; isXR: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold"
      style={{
        borderColor: "rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
        color: "rgba(255,255,255,0.75)",
        boxShadow: isXR ? "0 0 20px rgba(158,243,21,0.06)" : "0 0 20px rgba(91,45,220,0.06)",
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: isXR ? "rgba(158,243,21,0.85)" : "rgba(91,45,220,0.85)" }} />
      {text}
    </span>
  );
}

function GradientWord({ children, alt }: { children: React.ReactNode; alt?: boolean }) {
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
            className={cx("rounded-xl px-3 py-2 text-xs font-semibold transition-colors", opt === studio ? "text-white" : "text-white/60 hover:text-white/80")}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
