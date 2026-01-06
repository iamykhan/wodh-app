"use client";

/* =======================================================================================
   Wodh — Portfolio Page (Variant F: Proof Stories — most premium + simple)
   - Reads like mini-stories (not a grid, not a library)
   - Each project = one “chapter” (hero headline + one strong media + outcomes + proof artifact)
   - Active chapter gets “spotlight” (others gently dim)
   - Scroll-spy + sticky chapter rail (desktop) for fast navigation
   - Indigo night base + ALWAYS blended typography (XR green ↔ Games violet)
   - Subtle grain + haze + heading halo
   - Prefers-reduced-motion respected
======================================================================================= */

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Studio = "XR" | "Games";

type ProofArtifact = {
  label: string; // e.g. “Proof Artifact”
  title: string; // e.g. “Training Completion Lift”
  value: string; // e.g. “+38%”
  note: string; // short 1-liner
};

type Chapter = {
  id: string;
  studio: Studio;
  year: number;
  title: string;
  subtitle: string;
  heroLine: string; // one editorial line
  outcomes: string[];
  platforms: string[];
  tags: string[];
  artifact: ProofArtifact;
  thumb: string;
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

/** Replace with your real cases + real proof values */
const CHAPTERS: Chapter[] = [
  {
    id: "ops-training-sim",
    studio: "XR",
    year: 2025,
    featured: true,
    title: "Operations Training Simulator",
    subtitle: "Safety + workflows — repeatable drills that scale across teams.",
    heroLine: "Turn risky procedures into calm, repeatable practice.",
    outcomes: ["Faster onboarding", "Repeatable drills", "Lower training cost"],
    platforms: ["Meta Quest", "PC"],
    tags: ["Training", "Simulation", "Safety"],
    artifact: {
      label: "Proof artifact",
      title: "Training run consistency",
      value: "3×",
      note: "Standardized sessions across sites with the same outcomes.",
    },
    thumb:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=2200&q=70",
    caseStudy: true,
    href: "/portfolio/operations-training-simulator",
  },
  {
    id: "coop-multiplayer",
    studio: "Games",
    year: 2025,
    featured: true,
    title: "Co-op Multiplayer Systems",
    subtitle: "Lobbies, matchmaking, progression — production-ready stability.",
    heroLine: "Make the session feel invisible. Players should only feel flow.",
    outcomes: ["Stable sessions", "Smooth matchmaking", "Scalable backend hooks"],
    platforms: ["PC", "Console"],
    tags: ["Multiplayer", "Systems", "Live Ops"],
    artifact: {
      label: "Proof artifact",
      title: "Session stability targets",
      value: "99.9%",
      note: "Designed around reliability budgets, telemetry, and graceful fallback.",
    },
    thumb:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2200&q=70",
    caseStudy: true,
    href: "/portfolio/co-op-multiplayer-systems",
  },
  {
    id: "product-configurator",
    studio: "XR",
    year: 2024,
    title: "Real-time Product Configurator",
    subtitle: "Photoreal variants — clarity-first buying decisions.",
    heroLine: "Make choice feel obvious — with lighting, detail, and speed.",
    outcomes: ["Higher intent clicks", "Fewer pre-sales questions", "Fast iterations"],
    platforms: ["Web", "Mobile"],
    tags: ["Configurator", "Commerce", "3D"],
    artifact: {
      label: "Proof artifact",
      title: "Variant system throughput",
      value: "1 day",
      note: "Add or change variants without redoing the pipeline.",
    },
    thumb:
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=2200&q=70",
    caseStudy: true,
    href: "/portfolio/product-configurator",
  },
  {
    id: "game-ui-ux",
    studio: "Games",
    year: 2025,
    title: "Game UI/UX Refresh",
    subtitle: "Clarity-first HUD + menus — designed for flow and readability.",
    heroLine: "Reduce friction until the game feels like instinct.",
    outcomes: ["Better retention", "Cleaner navigation", "Lower support load"],
    platforms: ["PC", "Console"],
    tags: ["UI/UX", "Design", "Systems"],
    artifact: {
      label: "Proof artifact",
      title: "Menu depth reduction",
      value: "-42%",
      note: "Fewer steps to core actions with better readability under stress.",
    },
    thumb:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=2200&q=70",
    caseStudy: true,
    href: "/portfolio/game-ui-ux-refresh",
  },
  {
    id: "spatial-demo",
    studio: "XR",
    year: 2025,
    title: "Spatial Demo Experience",
    subtitle: "A guided spatial narrative built for stakeholder confidence.",
    heroLine: "When the room understands it, the decision becomes easy.",
    outcomes: ["Clearer demos", "Faster approvals", "Premium brand feel"],
    platforms: ["Apple Vision Pro"],
    tags: ["Spatial", "Showcase", "Prototype"],
    artifact: {
      label: "Proof artifact",
      title: "Demo confidence signal",
      value: "1 call",
      note: "A guided flow that answers stakeholder questions in sequence.",
    },
    thumb:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=2200&q=70",
    caseStudy: false,
  },
];

/* =======================================================================================
   Page
======================================================================================= */

export default function PortfolioProofStories() {
  const reduceMotion = useReducedMotion() ?? false;

  const chapters = useMemo(() => {
    // Premium ordering: featured first, then newest
    const list = [...CHAPTERS];
    list.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || b.year - a.year);
    return list;
  }, []);

  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");
  const [hoverId, setHoverId] = useState<string | null>(null);

  const activeIndex = useMemo(
    () => Math.max(0, chapters.findIndex((c) => c.id === activeId)),
    [chapters, activeId]
  );

  // Scroll spy (IntersectionObserver)
  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(`chapter-${c.id}`))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // choose the most visible intersecting chapter
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible?.target) return;

        const id = (visible.target as HTMLElement).dataset.chapterId;
        if (id) setActiveId(id);
      },
      {
        root: null,
        threshold: [0.12, 0.22, 0.35, 0.5, 0.65],
        rootMargin: "-20% 0px -55% 0px",
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  const focusedId = hoverId ?? activeId;

  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(1200px 800px at 10% 0%, rgba(158,243,21,0.10), transparent 55%),
          radial-gradient(1000px 700px at 90% 10%, rgba(91,45,220,0.12), transparent 55%),
          radial-gradient(900px 700px at 60% 110%, rgba(91,45,220,0.08), transparent 55%),
          linear-gradient(180deg, ${BASE_BG} 0%, #050611 100%)
        `,
      }}
    >
      <style>{`
        :root{
          --wodh-xr:${ACCENT_XR};
          --wodh-games:${ACCENT_GAMES};
        }
        ::selection{ background: rgba(158,243,21,0.22); }
        .wodh-grain{
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl border border-white/10 bg-white/[0.04]" />
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">Wodh</div>
              <div className="text-[11px] text-white/55">Portfolio — Proof Stories</div>
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

      {/* HERO */}
      <section id="portfolio-hero" className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] sm:p-10">
          <div aria-hidden className="pointer-events-none absolute inset-0 wodh-grain opacity-[0.08]" />
          <CornerLights />

          <div className="relative flex flex-col gap-7">
            <div className="flex flex-wrap items-center gap-2">
              <Chip>Portfolio</Chip>
              <Chip tone="muted">Variant F — Proof Stories</Chip>
              <Chip tone="muted">Premium + simple</Chip>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Proof, told as chapters.
                <span className="block text-white/70">
                  One narrative — <BlendWord>XR</BlendWord> and <BlendWord alt>Games</BlendWord> in the same voice.
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
                Each story is one screen. Outcomes are explicit. One proof artifact anchors belief.
              </p>

              <p className="max-w-3xl text-sm leading-relaxed text-white/55 sm:text-base">
                Scroll like a magazine. Click chapters to jump. This is built to feel expensive.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <StatPill label="Chapters" value={String(chapters.length)} glow />
                <StatPill
                  label="Active"
                  value={`${String(activeIndex + 1).padStart(2, "0")}/${String(chapters.length).padStart(2, "0")}`}
                />
                <StatPill label="Mode" value="Stories" />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    document.getElementById(`chapter-${chapters[0]?.id}`)?.scrollIntoView({
                      behavior: reduceMotion ? "auto" : "smooth",
                      block: "start",
                    })
                  }
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.05]"
                >
                  Start reading
                </button>
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
                  Talk to us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT: Sticky Rail + Chapters */}
      <section id="portfolio-stories" className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.42fr_1fr]">
          {/* Sticky chapter rail (desktop) */}
          <aside className="relative hidden lg:block">
            <div className="sticky top-[84px]">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-white/70">Chapters</div>
                  <div className="text-[11px] text-white/50">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {chapters.map((c, idx) => {
                    const isActive = c.id === activeId;
                    const isFocused = c.id === focusedId;
                    return (
                      <button
                        key={c.id}
                        onMouseEnter={() => setHoverId(c.id)}
                        onMouseLeave={() => setHoverId(null)}
                        onClick={() =>
                          document.getElementById(`chapter-${c.id}`)?.scrollIntoView({
                            behavior: reduceMotion ? "auto" : "smooth",
                            block: "start",
                          })
                        }
                        className={cx(
                          "w-full rounded-2xl border px-3 py-3 text-left transition-colors",
                          isActive ? "border-white/20 bg-white/[0.05]" : "border-white/10 bg-white/[0.02]",
                          isFocused ? "text-white" : "text-white/75"
                        )}
                        style={
                          isActive
                            ? ({
                                boxShadow:
                                  "0 0 0 1px rgba(255,255,255,0.06), 0 0 22px rgba(158,243,21,0.08), 0 0 22px rgba(91,45,220,0.08)",
                              } as React.CSSProperties)
                            : undefined
                        }
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-[11px] font-semibold text-white/60">
                            #{String(idx + 1).padStart(2, "0")}
                          </div>
                          <ChipSmall studio={c.studio} />
                        </div>
                        <div className="mt-2 text-sm font-semibold tracking-[-0.02em] text-white/85">
                          {c.title}
                        </div>
                        <div
                          className="mt-1 text-[11px]"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(158,243,21,0.90), rgba(255,255,255,0.60) 45%, rgba(91,45,220,0.90))",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                          }}
                        >
                          {c.heroLine}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="text-[11px] font-semibold text-white/70">Spotlight</div>
                  <div className="mt-1 text-[11px] text-white/55">
                    The active chapter stays bright. Everything else recedes.
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Chapters */}
          <div className="relative">
            <div className="space-y-6">
              {chapters.map((c, idx) => (
                <ChapterBlock
                  key={c.id}
                  chapter={c}
                  index={idx}
                  isActive={c.id === activeId}
                  isFocused={c.id === focusedId}
                  focusedId={focusedId}
                  onHover={(v) => setHoverId(v)}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>

            {/* Final CTA */}
            <div className="mt-10">
              <FinalCTA />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =======================================================================================
   Chapter Block
======================================================================================= */

function ChapterBlock({
  chapter,
  index,
  isActive,
  isFocused,
  focusedId,
  onHover,
  reduceMotion,
}: {
  chapter: Chapter;
  index: number;
  isActive: boolean;
  isFocused: boolean;
  focusedId: string;
  onHover: (id: string | null) => void;
  reduceMotion: boolean;
}) {
  const isXR = chapter.studio === "XR";
  const edge = isXR ? "rgba(158,243,21,0.26)" : "rgba(91,45,220,0.26)";
  const glow = isXR ? "rgba(158,243,21,0.12)" : "rgba(91,45,220,0.12)";

  const dim = focusedId && focusedId !== chapter.id; // dim when another is focused

  return (
    <motion.section
      id={`chapter-${chapter.id}`}
      data-chapter-id={chapter.id}
      onMouseEnter={() => onHover(chapter.id)}
      onMouseLeave={() => onHover(null)}
      className={cx(
        "relative overflow-hidden rounded-3xl border bg-white/[0.03] shadow-[0_26px_110px_rgba(0,0,0,0.45)]",
        isActive ? "border-white/20" : "border-white/10"
      )}
      initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      style={
        isActive
          ? ({
              boxShadow: `0 26px 110px rgba(0,0,0,0.50), inset 0 0 0 1px ${edge}, 0 0 80px ${glow}`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {/* Spotlight dim layer */}
      <AnimatePresence>
        {dim ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[5]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            style={{
              background: "linear-gradient(180deg, rgba(2,3,8,0.55) 0%, rgba(2,3,8,0.72) 100%)",
            }}
          />
        ) : null}
      </AnimatePresence>

      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 wodh-grain opacity-[0.07]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(158,243,21,0.10), transparent 62%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(91,45,220,0.10), transparent 62%)" }}
      />

      <div className="relative z-10 grid grid-cols-1 gap-0 lg:grid-cols-12">
        {/* Media */}
        <div className={cx("relative lg:col-span-6", index % 2 === 1 && "lg:order-2")}>
          <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full lg:min-h-[420px]">
            <motion.img
              src={chapter.thumb}
              alt={chapter.title}
              className="absolute inset-0 h-full w-full object-cover opacity-90"
              style={{ filter: "saturate(0.95) contrast(1.06)" }}
              loading="lazy"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

            {/* Chapter strip */}
            <div className="absolute left-5 top-5 flex items-center gap-2">
              <Chip>{chapter.studio}</Chip>
              <Chip tone="muted">{chapter.year}</Chip>
              {chapter.featured ? <Chip tone="muted">Featured</Chip> : null}
              {chapter.caseStudy ? <Chip tone="muted">Case</Chip> : <Chip tone="muted">Snapshot</Chip>}
            </div>

            {/* Bottom caption (tight, editorial) */}
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-[11px] font-semibold text-white/60">
                CHAPTER {String(index + 1).padStart(2, "0")}
              </div>
              <div
                className="mt-1 text-base font-semibold tracking-[-0.02em] sm:text-lg"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.78) 48%, rgba(91,45,220,0.95))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {chapter.heroLine}
              </div>
            </div>

            {/* Edge glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${edge}, 0 0 70px ${glow}` }} />
          </div>
        </div>

        {/* Copy */}
        <div className={cx("p-6 sm:p-8 lg:col-span-6", index % 2 === 1 && "lg:order-1")}>
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="muted">Proof story</Chip>
                <Chip tone="muted">#{String(index + 1).padStart(2, "0")}</Chip>
              </div>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                {chapter.title}
              </h2>

              <p
                className="mt-2 text-sm leading-relaxed sm:text-base"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.74) 0%, rgba(91,45,220,0.70) 55%, rgba(158,243,21,0.70) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {chapter.subtitle}
              </p>
            </div>

            {/* Outcomes */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
              <div className="text-[11px] font-semibold text-white/65">Outcomes</div>
              <div className="mt-3 space-y-2">
                {chapter.outcomes.slice(0, 3).map((o) => (
                  <div key={o} className="flex gap-2 text-sm text-white/70">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(158,243,21,0.92), rgba(255,255,255,0.70) 44%, rgba(91,45,220,0.92))",
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
            </div>

            {/* Proof Artifact */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
                style={{ background: isXR ? "radial-gradient(circle, rgba(158,243,21,0.14), transparent 62%)" : "radial-gradient(circle, rgba(91,45,220,0.14), transparent 62%)" }}
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[11px] font-semibold text-white/65">{chapter.artifact.label}</div>
                  <ChipSmall studio={chapter.studio} />
                </div>

                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-white/85">{chapter.artifact.title}</div>
                    <div className="mt-1 text-sm text-white/60">{chapter.artifact.note}</div>
                  </div>

                  <div
                    className="text-3xl font-semibold tracking-[-0.03em]"
                    style={{
                      background:
                        chapter.studio === "XR"
                          ? "linear-gradient(90deg, rgba(158,243,21,0.98), rgba(255,255,255,0.78))"
                          : "linear-gradient(90deg, rgba(91,45,220,0.98), rgba(255,255,255,0.78))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {chapter.artifact.value}
                  </div>
                </div>
              </div>
            </div>

            {/* Platforms + Tags */}
            <div className="flex flex-wrap gap-2">
              {chapter.platforms.slice(0, 3).map((p) => (
                <Chip key={p} tone="muted">
                  {p}
                </Chip>
              ))}
              {chapter.tags.slice(0, 5).map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/55">
                  {t}
                </span>
              ))}
            </div>

            {/* Action */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {chapter.caseStudy ? (
                <button
                  onClick={() => (window.location.href = chapter.href || "#")}
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

              <div className="text-[11px] text-white/45 sm:ml-auto">
                {isActive ? "Now reading" : "Chapter"} • {chapter.year}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* =======================================================================================
   CTA
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

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>Next chapter</Chip>
            <Chip tone="muted">XR + Games</Chip>
            <Chip tone="muted">Production-ready</Chip>
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
            Want your story to read like this — and ship like this?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            Bring your constraints. We’ll propose a plan: scope, timeline, and the fastest path to proof.
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
  );
}

/* =======================================================================================
   Small UI
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

function ChipSmall({ studio }: { studio: Studio }) {
  const isXR = studio === "XR";
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-2 py-1 text-[11px] font-semibold"
      style={{
        color: "rgba(255,255,255,0.75)",
        boxShadow: isXR ? "0 0 18px rgba(158,243,21,0.08)" : "0 0 18px rgba(91,45,220,0.08)",
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: isXR ? "rgba(158,243,21,0.85)" : "rgba(91,45,220,0.85)" }}
      />
      {studio}
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
