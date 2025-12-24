"use client";

import React, { useMemo, useState } from "react";

/* =========================================================
   TYPES
========================================================= */
type Studio = "XR" | "Games" | "Hybrid";

type Industry = {
  id: string;
  name: string;
  studio: Studio;
  outcomes: string[];
  seoTitle: string;
  seoIntro: string;
  useCases: string[];
  platforms: string[];
};

type Playbook = {
  id: string;
  industry: string;
  studio: Studio;
  goal: string;
  typicalBuild: string;
  keySystems: string[];
  shipChecklist: string[];
};

type Topic =
  | "Overview"
  | "Timeline"
  | "Pricing"
  | "Platforms"
  | "Security"
  | "Process"
  | "IP"
  | "Support";

type FAQ = {
  id: string;
  topic: Topic;
  studio: Studio;
  q: string;
  a: string;
  keywords: string[];
  linkHref?: string;
  linkLabel?: string;
};

/* =========================================================
   UTILS
========================================================= */
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* =========================================================
   DATA — INDUSTRIES (your locked set)
========================================================= */
const INDUSTRIES: Industry[] = [
  {
    id: "training-simulation",
    name: "Training & Simulation",
    studio: "XR",
    outcomes: ["Faster onboarding", "Safer ops", "Lower training cost"],
    seoTitle: "XR Training & Simulation Systems",
    seoIntro:
      "Production-ready XR training that scales across teams — from safety modules to operations simulation and digital twin workflows.",
    useCases: [
      "Safety & compliance training",
      "Machine / process simulation",
      "Onboarding playbooks",
      "Digital twin visualization",
    ],
    platforms: ["Meta Quest", "WebXR", "Unity"],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    studio: "Hybrid",
    outcomes: ["Better learning retention", "Clear patient education", "Measured outcomes"],
    seoTitle: "XR & Interactive Experiences for Healthcare",
    seoIntro:
      "Immersive training, therapy support, and patient education — built with a careful UX approach, privacy awareness, and performance discipline.",
    useCases: [
      "Clinical training modules",
      "Patient education experiences",
      "Therapy support tools",
      "3D anatomy visualization",
    ],
    platforms: ["Meta Quest", "Mobile AR", "Unity"],
  },
  {
    id: "education",
    name: "Education & eLearning",
    studio: "Hybrid",
    outcomes: ["Higher engagement", "Gamified learning", "Reusable content"],
    seoTitle: "Gamified Learning for Education & eLearning",
    seoIntro:
      "Interactive learning experiences that feel premium — from lesson-based XR modules to game-like engagement loops for students.",
    useCases: [
      "Gamified curricula",
      "Virtual labs & demos",
      "Interactive storytelling",
      "Assessment & progress systems",
    ],
    platforms: ["WebXR", "Mobile", "Unity"],
  },
  {
    id: "real-estate",
    name: "Real Estate & Architecture",
    studio: "XR",
    outcomes: ["More qualified leads", "Fewer revisions", "Faster approvals"],
    seoTitle: "XR Walkthroughs for Real Estate & Architecture",
    seoIntro:
      "High-quality interactive walkthroughs and configurators that help teams sell, validate, and iterate — without friction.",
    useCases: [
      "Interactive walkthroughs",
      "3D configurators",
      "Design review sessions",
      "Stakeholder presentations",
    ],
    platforms: ["WebXR", "Mobile AR", "Unreal"],
  },
  {
    id: "retail",
    name: "Retail & eCommerce",
    studio: "XR",
    outcomes: ["Higher conversion", "Lower returns", "Stronger product clarity"],
    seoTitle: "AR Product Visualization for Retail & eCommerce",
    seoIntro:
      "AR try-on and product visualization that looks clean and feels fast — built to reduce uncertainty and drive purchase confidence.",
    useCases: [
      "AR try-on / preview",
      "3D product configurators",
      "Interactive product pages",
      "In-store XR experiences",
    ],
    platforms: ["Mobile AR", "WebXR", "Unity"],
  },
  {
    id: "automotive",
    name: "Automotive",
    studio: "Hybrid",
    outcomes: ["Sales enablement", "Training at scale", "Premium configurators"],
    seoTitle: "XR & Interactive Configurators for Automotive",
    seoIntro:
      "From showroom-grade configurators to training systems — built with performance, polish, and deployment realities in mind.",
    useCases: ["Showroom configurators", "Mechanic / ops training", "Interactive product tours", "Event demos"],
    platforms: ["WebXR", "Meta Quest", "Unreal"],
  },
  {
    id: "events",
    name: "Events & Experiences",
    studio: "Hybrid",
    outcomes: ["Higher booth engagement", "Memorable demos", "Shareable moments"],
    seoTitle: "Interactive Experiences for Events & Activations",
    seoIntro:
      "Branded interactive worlds, installations, and XR demos — designed to perform in real venues with real constraints.",
    useCases: ["XR booth demos", "Interactive installations", "Branded mini-games", "Audience participation systems"],
    platforms: ["Meta Quest", "PC", "Unity"],
  },
  {
    id: "media-entertainment",
    name: "Media & Entertainment",
    studio: "Games",
    outcomes: ["Stronger storytelling", "Replayability", "High-quality visuals"],
    seoTitle: "Game-Quality Interactive Media & Entertainment",
    seoIntro:
      "Narrative experiences, interactive worlds, and entertainment builds that ship — with a studio-grade art + engineering pipeline.",
    useCases: ["Interactive storytelling", "World building", "Gameplay systems", "Performance optimization"],
    platforms: ["PC / Console", "Mobile", "Unreal"],
  },
  {
    id: "sports-fitness",
    name: "Sports & Fitness",
    studio: "Games",
    outcomes: ["Habit-building loops", "Competition systems", "Better retention"],
    seoTitle: "Engagement-Driven Games for Sports & Fitness",
    seoIntro:
      "Fitness and sports experiences built like real games — progression, scoring, and feedback loops that keep users coming back.",
    useCases: ["Training mini-games", "Leaderboards & seasons", "Motion-based gameplay", "Live content pipeline"],
    platforms: ["Mobile", "PC", "Unity"],
  },
  {
    id: "tourism-culture",
    name: "Tourism & Culture",
    studio: "Hybrid",
    outcomes: ["More discovery", "Accessible storytelling", "Richer exhibits"],
    seoTitle: "XR Storytelling for Tourism & Culture",
    seoIntro:
      "Virtual exhibits, heritage experiences, and guided discovery — built for clarity, performance, and emotional impact.",
    useCases: ["Virtual museums", "Guided tours", "Interactive exhibits", "Educational narratives"],
    platforms: ["WebXR", "Mobile", "Unity"],
  },
];

const INDUSTRY_SUGGESTIONS = INDUSTRIES.map((x) => x.name);

/* =========================================================
   STUDIO META (shared)
========================================================= */
function studioDot(studio: Studio) {
  if (studio === "XR") return { bg: "#9EF315", glow: "rgba(158,243,21,0.35)", label: "XR Studio" };
  if (studio === "Games") return { bg: "#A78BFA", glow: "rgba(167,139,250,0.35)", label: "Games Studio" };
  return { bg: "linear-gradient(90deg,#9EF315,#A78BFA)", glow: "rgba(255,255,255,0.18)", label: "Hybrid" };
}

function studioMeta(studio: Studio) {
  if (studio === "XR") {
    return {
      studio,
      label: "XR Studio",
      dot: "#9EF315",
      glow: "rgba(158,243,21,0.20)",
      rail: "linear-gradient(180deg, rgba(158,243,21,0.0), rgba(158,243,21,0.9), rgba(158,243,21,0.0))",
      line: "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.85), rgba(158,243,21,0))",
      tint: "radial-gradient(900px 420px at 20% 10%, rgba(158,243,21,0.10), rgba(12,7,34,0) 55%)",
    };
  }
  if (studio === "Games") {
    return {
      studio,
      label: "Games Studio",
      dot: "#A78BFA",
      glow: "rgba(167,139,250,0.20)",
      rail: "linear-gradient(180deg, rgba(167,139,250,0.0), rgba(167,139,250,0.9), rgba(167,139,250,0.0))",
      line: "linear-gradient(90deg, rgba(167,139,250,0), rgba(167,139,250,0.85), rgba(167,139,250,0))",
      tint: "radial-gradient(900px 420px at 20% 10%, rgba(167,139,250,0.10), rgba(12,7,34,0) 55%)",
    };
  }
  return {
    studio,
    label: "Hybrid",
    dot: "linear-gradient(90deg,#9EF315,#A78BFA)",
    glow: "rgba(255,255,255,0.14)",
    rail: "linear-gradient(180deg, rgba(158,243,21,0.0), rgba(158,243,21,0.75), rgba(167,139,250,0.75), rgba(167,139,250,0.0))",
    line: "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.75), rgba(167,139,250,0.75), rgba(167,139,250,0))",
    tint: "radial-gradient(900px 420px at 20% 10%, rgba(158,243,21,0.08), rgba(12,7,34,0) 52%), radial-gradient(900px 420px at 80% 10%, rgba(167,139,250,0.08), rgba(12,7,34,0) 52%)",
  };
}

/* =========================================================
   VISUAL HELPERS (shared)
========================================================= */
function GlowLayer() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute -top-28 -left-28 h-[560px] w-[560px] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(158,243,21,0.9), rgba(158,243,21,0.0) 62%)",
        }}
      />
      <div
        className="absolute -bottom-32 -right-28 h-[620px] w-[620px] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, rgba(167,139,250,0.9), rgba(167,139,250,0.0) 64%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(circle at 50% 0%, black 0%, black 55%, transparent 78%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 520px at 50% 0%, rgba(255,255,255,0.06), rgba(12,7,34,0) 62%), radial-gradient(900px 520px at 50% 100%, rgba(0,0,0,0.26), rgba(0,0,0,0) 62%)",
        }}
      />
    </div>
  );
}

function Underline({ studio }: { studio: Studio }) {
  const bg =
    studio === "XR"
      ? "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.9), rgba(158,243,21,0))"
      : studio === "Games"
      ? "linear-gradient(90deg, rgba(167,139,250,0), rgba(167,139,250,0.9), rgba(167,139,250,0))"
      : "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.75), rgba(167,139,250,0.75), rgba(167,139,250,0))";

  return <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px opacity-80" style={{ background: bg }} />;
}

function Dot({ studio, color, className }: { studio?: Studio; color?: string; className?: string }) {
  const bg =
    color ??
    (studio === "XR"
      ? "#9EF315"
      : studio === "Games"
      ? "#A78BFA"
      : "linear-gradient(90deg,#9EF315,#A78BFA)");

  return <span className={cx("h-2 w-2 rounded-full", className)} style={{ background: bg }} />;
}

function TrustChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/65">
      {children}
    </span>
  );
}

function ProofChip({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/65">
      {text}
    </span>
  );
}

function Pill({ label, active, onClick }: { label: Studio; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "relative inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition",
        active
          ? "border-white/20 bg-white/[0.06] text-white"
          : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
      )}
    >
      <Dot studio={label} className="h-1.5 w-1.5" />
      {label}
    </button>
  );
}

/* =========================================================
   SECTION 1 — HERO + INDEX + SEO DETAILS
========================================================= */
function IndustriesHeroIndexDetails() {
  const [studio, setStudio] = useState<Studio | "All">("All");

  const filtered = useMemo(() => {
    if (studio === "All") return INDUSTRIES;
    return INDUSTRIES.filter((x) => x.studio === studio);
  }, [studio]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-28 -left-28 h-[560px] w-[560px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(158,243,21,0.9), rgba(158,243,21,0.0) 62%)",
            }}
          />
          <div
            className="absolute -bottom-32 -right-28 h-[620px] w-[620px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at 70% 70%, rgba(167,139,250,0.9), rgba(167,139,250,0.0) 64%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.14]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage: "radial-gradient(circle at 45% 18%, black 0%, black 55%, transparent 78%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(1200px 520px at 50% 6%, rgba(255,255,255,0.06), rgba(12,7,34,0) 62%), radial-gradient(900px 600px at 50% 100%, rgba(0,0,0,0.28), rgba(0,0,0,0) 62%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-16 sm:pt-20 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9EF315]" />
              <span className="font-medium text-white/80">One team.</span>
              <span className="text-white/50">Two studios.</span>
              <span className="text-white/40">·</span>
              <span className="text-white/60">Industries</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-white/55">
              <span className="hidden sm:inline">Focus:</span>
              {(["All", "XR", "Games", "Hybrid"] as const).map((k) => {
                const active = studio === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setStudio(k)}
                    className={cx("relative rounded-full px-3 py-1 transition", active ? "text-white" : "text-white/55 hover:text-white/80")}
                  >
                    {k === "All" ? "All" : k}
                    <span
                      className={cx("pointer-events-none absolute inset-x-2 -bottom-0.5 h-px opacity-0 transition-opacity", active && "opacity-100")}
                      style={{
                        background:
                          k === "XR"
                            ? "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.9), rgba(158,243,21,0))"
                            : k === "Games"
                            ? "linear-gradient(90deg, rgba(167,139,250,0), rgba(167,139,250,0.9), rgba(167,139,250,0))"
                            : "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.85), rgba(167,139,250,0.85), rgba(167,139,250,0))",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
            Industry focus,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, rgba(158,243,21,1) 0%, rgba(167,139,250,1) 55%, rgba(255,255,255,0.92) 100%)",
              }}
            >
              studio-grade execution
            </span>
            .
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            Wodh ships enterprise XR systems and premium game experiences. This page is a clean index — pick your industry, see outcomes, then dive into details.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={() => scrollToId("industries-index")}
              className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              Browse industries
              <span className="text-white/60 transition group-hover:translate-x-0.5">→</span>
            </button>

            <button
              onClick={() => scrollToId("project-inquiry")}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0C0722] transition hover:-translate-y-[1px]"
            >
              Start a project
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/45">
            <span>Enterprise-ready delivery</span>
            <span>Design + Dev + Ship</span>
            <span>Unity / Unreal / WebXR</span>
          </div>
        </div>
      </section>

      {/* Index */}
      <section id="industries-index" className="relative mx-auto max-w-7xl px-6 pb-8 pt-6 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">Industries index</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">Minimal rows. Clear outcomes. Jump straight to the section you need.</p>
          </div>

          <button
            type="button"
            onClick={() => scrollToId("industries-sections")}
            className="hidden items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white sm:inline-flex"
          >
            Jump to details <span className="text-white/50">↓</span>
          </button>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ul className="divide-y divide-white/10">
              {filtered.map((it) => {
                const meta = studioDot(it.studio);
                return (
                  <li key={it.id} className="group">
                    <button type="button" onClick={() => scrollToId(`industry-${it.id}`)} className="relative w-full py-5 text-left">
                      <span
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background:
                            it.studio === "XR"
                              ? "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.9), rgba(158,243,21,0))"
                              : it.studio === "Games"
                              ? "linear-gradient(90deg, rgba(167,139,250,0), rgba(167,139,250,0.9), rgba(167,139,250,0))"
                              : "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.85), rgba(167,139,250,0.85), rgba(167,139,250,0))",
                        }}
                      />

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ background: meta.bg, boxShadow: `0 0 0 6px ${meta.glow}` }} />
                            <div className="text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">{it.name}</div>
                            <span className="hidden rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-white/55 sm:inline-flex">{meta.label}</span>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-2">
                            {it.outcomes.map((o) => (
                              <span key={o} className="text-sm text-white/60">
                                {o}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition group-hover:translate-x-0.5 group-hover:text-white/80">
                          View <span className="text-white/45">→</span>
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="border-l border-white/10 pl-6">
              <div className="text-xs font-semibold text-white/75">Legend</div>
              <div className="mt-3 space-y-3 text-sm text-white/60">
                {(["XR", "Games", "Hybrid"] as const).map((k) => {
                  const meta = studioDot(k);
                  return (
                    <div key={k} className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.bg, boxShadow: `0 0 0 6px ${meta.glow}` }} />
                      <span className="text-white/75">{meta.label}</span>
                      <span className="text-white/45">—</span>
                      <span className="text-white/55">
                        {k === "XR" ? "systems & rollout" : k === "Games" ? "experience & gameplay" : "mixed pipelines"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-xs text-white/45">SEO note: each industry below has a dedicated H2 + paragraph + bullets.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section id="industries-sections" className="relative mx-auto max-w-7xl px-6 pb-10 pt-8 lg:px-10">
        <div className="space-y-16">
          {INDUSTRIES.map((it) => {
            const meta = studioDot(it.studio);
            return (
              <article key={it.id} id={`industry-${it.id}`} className="scroll-mt-24">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-2 text-xs text-white/55">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.bg, boxShadow: `0 0 0 6px ${meta.glow}` }} />
                      <span className="text-white/75">{meta.label}</span>
                      <span className="text-white/35">·</span>
                      <span className="text-white/55">{it.name}</span>
                    </div>

                    <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">{it.seoTitle}</h2>

                    <p className="mt-3 text-pretty text-sm leading-relaxed text-white/65 sm:text-base">{it.seoIntro}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => scrollToId("project-inquiry")}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.08]"
                    >
                      Get a proposal
                    </button>
                    <button type="button" onClick={() => scrollToId("industries-index")} className="text-sm font-semibold text-white/60 transition hover:text-white/80">
                      Back to index ↑
                    </button>
                  </div>
                </div>

                <div
                  className="mt-6 h-px w-full opacity-70"
                  style={{
                    background:
                      it.studio === "XR"
                        ? "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.65), rgba(255,255,255,0.08))"
                        : it.studio === "Games"
                        ? "linear-gradient(90deg, rgba(167,139,250,0), rgba(167,139,250,0.65), rgba(255,255,255,0.08))"
                        : "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.55), rgba(167,139,250,0.55), rgba(255,255,255,0.08))",
                  }}
                />

                <div className="mt-6 grid gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <div className="text-xs font-semibold text-white/75">What we build</div>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/65">
                      {it.useCases.map((u) => (
                        <li key={u} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="text-xs font-semibold text-white/75">Common platforms</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {it.platforms.map((p) => (
                        <span key={p} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                          {p}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 text-xs text-white/45">
                      Want a dedicated landing page for {it.name}? This structure can become <span className="text-white/65">/industries/{it.id}</span>.
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div id="project-inquiry" className="sr-only" />
    </>
  );
}

/* =========================================================
   SECTION 2 — MINI PLAYBOOK TABS
========================================================= */
const PLAYBOOKS: Playbook[] = [
  {
    id: "training-simulation",
    industry: "Training & Simulation",
    studio: "XR",
    goal: "Ship XR training that scales across teams",
    typicalBuild:
      "Modular training flows with safety gates, task scoring, content tools, device-aware UX, and a rollout plan for headsets + updates.",
    keySystems: ["Module builder", "Task scoring", "Device UX", "Content pipeline", "Offline mode"],
    shipChecklist: ["Comfort pass + safety", "Perf budget (72/90fps)", "Analytics events", "QA on target hardware", "Deployment & updates"],
  },
  {
    id: "healthcare",
    industry: "Healthcare",
    studio: "Hybrid",
    goal: "Immersive training + patient education with measured outcomes",
    typicalBuild:
      "Clinical modules, interactive education flows, privacy-aware data handling, content review tools, and measurable outcomes.",
    keySystems: ["Module system", "Content approval", "Privacy-aware telemetry", "3D anatomy", "Access control"],
    shipChecklist: ["Stakeholder review loop", "Device/perf constraints", "Analytics + dashboards", "Security checklist", "Release gates"],
  },
  {
    id: "education",
    industry: "Education & eLearning",
    studio: "Hybrid",
    goal: "Gamified learning that stays premium and reusable",
    typicalBuild:
      "Lesson flows with game-like progression, reusable content structure, assessments, and a clean deployment story across web/mobile/XR.",
    keySystems: ["Progression", "Assessments", "Content templates", "Teacher/admin tools", "Multi-platform build"],
    shipChecklist: ["Content scaling plan", "UX pacing pass", "Accessibility pass", "Analytics for retention", "QA across devices"],
  },
  {
    id: "media-entertainment",
    industry: "Media & Entertainment",
    studio: "Games",
    goal: "Game-quality interactive storytelling and worlds",
    typicalBuild:
      "Narrative/world building with strong performance discipline, production pipeline, and polish passes that ship cleanly.",
    keySystems: ["World building", "Gameplay systems", "Cinematics tools", "VFX pipeline", "Optimization"],
    shipChecklist: ["Frame-time profiling", "Content cadence plan", "Save/state system", "QA + regression", "Launch checklist"],
  },
  {
    id: "sports-fitness",
    industry: "Sports & Fitness",
    studio: "Games",
    goal: "Habit-building loops with competition + retention",
    typicalBuild:
      "Training mini-games with progression, seasons/leaderboards, feedback loops, and telemetry-driven iteration.",
    keySystems: ["Progression", "Leaderboards", "Sessions", "Rewards", "Telemetry"],
    shipChecklist: ["Core loop validation", "Retention metrics", "Anti-cheat basics", "Performance pass", "Live updates plan"],
  },
  {
    id: "retail",
    industry: "Retail & eCommerce",
    studio: "XR",
    goal: "AR product clarity that reduces uncertainty and drives conversion",
    typicalBuild:
      "3D product visualization + configurators, web/mobile XR delivery, performance budgets, and measurement for conversion impact.",
    keySystems: ["3D pipeline", "Configurator", "WebXR delivery", "Asset LOD", "Analytics events"],
    shipChecklist: ["Asset optimization", "Load-time budgets", "Cross-device QA", "Conversion measurement", "Release plan"],
  },
];

function hrefFor(p: Playbook) {
  return `/industries/${p.id}`;
}

function FilterPill({ label, active, onClick, dot, glow }: { label: string; active: boolean; onClick: () => void; dot: any; glow: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition",
        active
          ? "border-white/20 bg-white/[0.06] text-white"
          : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
      )}
      style={active ? { boxShadow: `0 0 0 6px ${glow}` } : undefined}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
      {label}
    </button>
  );
}

function MiniPlaybookCard({ p }: { p: Playbook }) {
  const m = studioMeta(p.studio);
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 opacity-90" style={{ backgroundImage: m.tint }} />
      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-white/60">
              <span className="h-2 w-2 rounded-full" style={{ background: m.dot as any, boxShadow: `0 0 0 6px ${m.glow}` }} />
              {m.label}
              <span className="text-white/35">·</span>
              <span className="text-white/70">{p.industry}</span>
            </div>
            <div className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white/90">{p.goal}</div>
          </div>

          <a href={hrefFor(p)} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#0C0722] transition hover:-translate-y-[1px]">
            Open page <span className="opacity-70">→</span>
          </a>
        </div>

        <div className="mt-6 h-px w-full bg-white/10" />

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">Typical build</div>
            <div className="mt-2 text-sm leading-relaxed text-white/70">{p.typicalBuild}</div>

            <div className="mt-5 text-xs font-semibold tracking-[0.18em] uppercase text-white/55">Key systems</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.keySystems.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">Ship checklist</div>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {p.shipChecklist.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 h-px w-full bg-white/10" />
            <div className="mt-4 text-xs text-white/50">
              This “mini playbook” becomes the top fold for <span className="text-white/70 font-semibold">/industries/{p.id}</span>.
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px opacity-70" style={{ background: m.line }} />
    </div>
  );
}

function MiniPlaybookTabs() {
  const [studio, setStudio] = useState<Studio | "All">("All");
  const list = useMemo(() => (studio === "All" ? PLAYBOOKS : PLAYBOOKS.filter((p) => p.studio === studio)), [studio]);
  const [active, setActive] = useState<string>(PLAYBOOKS[0]?.id ?? "");

  const activePlaybook = useMemo(() => {
    const inList = list.find((p) => p.id === active);
    return inList ?? list[0];
  }, [list, active]);

  const xr = studioMeta("XR");
  const hy = studioMeta("Hybrid");
  const gm = studioMeta("Games");

  return (
    <section className="relative bg-[#0C0722]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(255,255,255,0.06),rgba(12,7,34,0)_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">What we build per industry</div>
            <div className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">Mini Playbook Tabs</div>
            <div className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
              Choose an industry on the left. The right shows a compact playbook: goal → build → systems → ship checklist.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <FilterPill label="All" active={studio === "All"} onClick={() => setStudio("All")} dot="rgba(255,255,255,0.55)" glow="rgba(255,255,255,0.12)" />
            <FilterPill label="XR" active={studio === "XR"} onClick={() => setStudio("XR")} dot={xr.dot} glow={xr.glow} />
            <FilterPill label="Hybrid" active={studio === "Hybrid"} onClick={() => setStudio("Hybrid")} dot={hy.dot as any} glow={hy.glow} />
            <FilterPill label="Games" active={studio === "Games"} onClick={() => setStudio("Games")} dot={gm.dot} glow={gm.glow} />
          </div>
        </div>

        <div className="mt-6 h-px w-full bg-white/10" />

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <div className="px-5 py-4 text-xs font-semibold text-white/55">Industries</div>
              <div className="h-px w-full bg-white/10" />
              <ul className="divide-y divide-white/10">
                {list.map((p) => {
                  const m = studioMeta(p.studio);
                  const isActive = p.id === activePlaybook?.id;
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => setActive(p.id)}
                        className={cx("group relative w-full px-5 py-4 text-left transition", "hover:bg-white/[0.03]", isActive && "bg-white/[0.03]")}
                      >
                        <span className="pointer-events-none absolute left-0 top-0 h-full w-px opacity-70" style={{ background: m.rail }} />
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="mt-1 h-2 w-2 rounded-full" style={{ background: m.dot as any, boxShadow: `0 0 0 6px ${m.glow}` }} />
                              <div className="truncate text-sm font-semibold text-white/85 group-hover:text-white">{p.industry}</div>
                            </div>
                            <div className="mt-1 text-xs text-white/50">{m.label}</div>
                          </div>
                          <div className="mt-1 text-sm font-semibold text-white/35 transition group-hover:translate-x-0.5 group-hover:text-white/70">→</div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-4 text-xs text-white/45">Click any industry to open its mini playbook.</div>
          </div>

          <div className="lg:col-span-8">{activePlaybook ? <MiniPlaybookCard p={activePlaybook} /> : null}</div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 3 — PROOF STRIP (Signal Bar)
========================================================= */
function Stat({ value, label, accent }: { value: string; label: string; accent: "xr" | "games" | "hybrid" }) {
  const underline =
    accent === "xr"
      ? "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.9), rgba(158,243,21,0))"
      : accent === "games"
      ? "linear-gradient(90deg, rgba(167,139,250,0), rgba(167,139,250,0.9), rgba(167,139,250,0))"
      : "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.82), rgba(167,139,250,0.82), rgba(167,139,250,0))";

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4">
      <div className="text-2xl font-semibold tracking-[-0.03em] text-white/90">{value}</div>
      <div className="mt-1 text-xs font-semibold tracking-[0.14em] uppercase text-white/55">{label}</div>
      <span className="pointer-events-none absolute inset-x-3 bottom-0 h-px opacity-70" style={{ background: underline }} />
    </div>
  );
}

function Quote({ text, from }: { text: string; from: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4">
      <div className="text-sm leading-relaxed text-white/70">“{text}”</div>
      <div className="mt-2 text-xs font-semibold text-white/50">{from}</div>
    </div>
  );
}

function ProofSignalBar() {
  return (
    <section className="relative bg-[#0C0722]">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-22"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(158,243,21,0.9), rgba(158,243,21,0.0) 62%)",
          }}
        />
        <div
          className="absolute -bottom-28 -right-24 h-[560px] w-[560px] rounded-full blur-3xl opacity-22"
          style={{
            background:
              "radial-gradient(circle at 70% 70%, rgba(167,139,250,0.9), rgba(167,139,250,0.0) 64%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_520px_at_50%_0%,rgba(255,255,255,0.06),rgba(12,7,34,0)_62%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">Proof</div>
            <div className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              Trusted by teams building real products
            </div>
            <div className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">Numbers + micro-quotes in a single premium bar. No noise.</div>
          </div>

          <div className="text-xs text-white/45">Studio-grade execution · enterprise discipline</div>
        </div>

        <div className="mt-6 h-px w-full bg-white/10" />

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md sm:p-5">
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-3">
                <Stat value="800+" label="Deliveries" accent="hybrid" />
                <Stat value="8+ yrs" label="Pipeline maturity" accent="xr" />
                <Stat value="Global" label="Clients shipped" accent="games" />
              </div>
              <div className="mt-4 text-xs text-white/45">Replace these with your real numbers (or remove stats entirely).</div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <Quote text="Clear process, fast iterations, and strong performance discipline." from="Product Lead · Enterprise Team" />
                <Quote text="Polish was genuinely ‘game-quality’ — shipped smoothly under deadline." from="Founder · Consumer App" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <ProofChip text="Security-aware delivery" />
          <ProofChip text="Perf budgets + profiling" />
          <ProofChip text="QA checklists + rollback plans" />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 4 — CAPABILITY MATRIX (Radar + Breakdown)
========================================================= */
type Axis = {
  key: string;
  label: string;
  xr: number;
  games: number;
  note: string;
  seo: string;
};

const AXES: Axis[] = [
  { key: "ux", label: "Experience UX", xr: 0.9, games: 0.85, note: "XR: comfort + spatial UX · Games: loop + pacing UX", seo: "XR spatial UX comfort design and Games core loop pacing design" },
  { key: "systems", label: "Systems", xr: 0.75, games: 0.95, note: "XR: modules + tasks · Games: economies + progression", seo: "XR training modules task systems and Games progression economy systems" },
  { key: "perf", label: "Performance", xr: 0.95, games: 0.9, note: "Frame-time budgets + profiling discipline", seo: "XR 72/90fps performance optimization and Games profiling frame time budgets" },
  { key: "art", label: "Art pipeline", xr: 0.85, games: 0.95, note: "Real-time LOD + world-building discipline", seo: "XR real-time asset optimization LOD and Games world building VFX pipeline" },
  { key: "shipping", label: "Shipping", xr: 0.85, games: 0.85, note: "QA gates, release checklists, deployment readiness", seo: "XR hardware QA deployment and Games release pipelines regression QA" },
  { key: "analytics", label: "Analytics", xr: 0.8, games: 0.9, note: "Telemetry design + dashboards for iteration", seo: "XR training analytics task time and Games telemetry dashboards retention" },
];

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function polarPoints(values: number[], radius: number, cx0: number, cy0: number) {
  const n = values.length;
  return values
    .map((v, i) => {
      const a = -Math.PI / 2 + (i * (2 * Math.PI)) / n;
      const r = radius * clamp01(v);
      const x = cx0 + r * Math.cos(a);
      const y = cy0 + r * Math.sin(a);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function axisLabelPos(i: number, n: number, radius: number, cx0: number, cy0: number) {
  const a = -Math.PI / 2 + (i * (2 * Math.PI)) / n;
  const r = radius + 18;
  const x = cx0 + r * Math.cos(a);
  const y = cy0 + r * Math.sin(a);
  const anchor = Math.cos(a) > 0.35 ? "start" : Math.cos(a) < -0.35 ? "end" : "middle";
  const baseline = Math.sin(a) > 0.35 ? "hanging" : Math.sin(a) < -0.35 ? "baseline" : "middle";
  return { x, y, anchor, baseline };
}

function deltaLabel(xr: number, games: number) {
  const d = Math.round((xr - games) * 100);
  if (d === 0) return { text: "Δ 0", tone: "neutral" as const };
  if (d > 0) return { text: `Δ +${d} XR`, tone: "xr" as const };
  return { text: `Δ +${Math.abs(d)} Games`, tone: "games" as const };
}

function DeltaBadge({ xr, games }: { xr: number; games: number }) {
  const d = deltaLabel(xr, games);
  const border = d.tone === "xr" ? "border-[rgba(158,243,21,0.22)]" : d.tone === "games" ? "border-[rgba(167,139,250,0.22)]" : "border-white/10";
  const bg = d.tone === "xr" ? "bg-[rgba(158,243,21,0.06)]" : d.tone === "games" ? "bg-[rgba(167,139,250,0.06)]" : "bg-white/[0.03]";
  const text = d.tone === "xr" ? "text-[rgba(158,243,21,0.95)]" : d.tone === "games" ? "text-[rgba(167,139,250,0.95)]" : "text-white/70";

  return <span className={cx("inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold", border, bg, text)}>{d.text}</span>;
}

function StrengthTag({ xr, games }: { xr: number; games: number }) {
  const bothHigh = xr >= 0.9 && games >= 0.9;
  if (!bothHigh) return null;
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold text-white/70">
      Shared strength
    </span>
  );
}

function Bar({ value, tone }: { value: number; tone: "xr" | "games" }) {
  const width = `${Math.round(clamp01(value) * 100)}%`;
  const fill = tone === "xr" ? "linear-gradient(90deg, rgba(158,243,21,0.0), rgba(158,243,21,0.85))" : "linear-gradient(90deg, rgba(167,139,250,0.0), rgba(167,139,250,0.85))";
  return (
    <div className="h-1.5 w-full rounded-full bg-white/10">
      <div className="h-1.5 rounded-full" style={{ width, background: fill }} />
    </div>
  );
}

function SegPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={cx("relative rounded-full px-3 py-2 text-xs font-semibold transition", active ? "text-white" : "text-white/55 hover:text-white/80")}>
      {label}
      <span
        className={cx("pointer-events-none absolute inset-x-2 -bottom-0.5 h-px opacity-0 transition-opacity", active && "opacity-100")}
        style={{
          background:
            "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.85), rgba(167,139,250,0.85), rgba(167,139,250,0))",
        }}
      />
    </button>
  );
}

function RadarCard({ axes, highlightKey, onHoverAxis }: { axes: Axis[]; highlightKey: string | null; onHoverAxis: (k: string | null) => void }) {
  const size = 330;
  const cx0 = size / 2;
  const cy0 = size / 2;
  const R = 118;

  const xrVals = axes.map((a) => a.xr);
  const gmVals = axes.map((a) => a.games);

  const xrPoly = polarPoints(xrVals, R, cx0, cy0);
  const gmPoly = polarPoints(gmVals, R, cx0, cy0);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(260px 260px at 50% 46%, rgba(255,255,255,0.06), rgba(255,255,255,0) 62%)",
        }}
      />

      <div className="relative flex items-center justify-between">
        <div className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">Overview</div>
        <div className="flex items-center gap-3 text-xs font-semibold text-white/55">
          <span className="inline-flex items-center gap-2">
            <Dot color="#9EF315" className="h-1.5 w-1.5" /> XR
          </span>
          <span className="inline-flex items-center gap-2">
            <Dot color="#A78BFA" className="h-1.5 w-1.5" /> Games
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} onMouseLeave={() => onHoverAxis(null)}>
          {[0.25, 0.5, 0.75, 1].map((k) => (
            <circle
              key={k}
              cx={cx0}
              cy={cy0}
              r={R * k}
              fill="none"
              stroke={k === 1 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)"}
              strokeWidth={k === 1 ? 1.2 : 1}
            />
          ))}

          {axes.map((a, i) => {
            const n = axes.length;
            const ang = -Math.PI / 2 + (i * (2 * Math.PI)) / n;
            const x = cx0 + R * Math.cos(ang);
            const y = cy0 + R * Math.sin(ang);
            const pos = axisLabelPos(i, n, R, cx0, cy0);
            const isHi = highlightKey === a.key;

            return (
              <g key={a.key} onMouseEnter={() => onHoverAxis(a.key)} style={{ cursor: "default" }}>
                <line x1={cx0} y1={cy0} x2={x} y2={y} stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
                <text
                  x={pos.x}
                  y={pos.y}
                  fill={isHi ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)"}
                  fontSize="11"
                  fontWeight="600"
                  textAnchor={pos.anchor as any}
                  dominantBaseline={pos.baseline as any}
                >
                  {a.label}
                </text>
              </g>
            );
          })}

          <polygon points={xrPoly} fill="rgba(158,243,21,0.12)" stroke="rgba(158,243,21,0.62)" strokeWidth="1.6" style={{ filter: "drop-shadow(0 0 8px rgba(158,243,21,0.20))" }} />
          <polygon points={gmPoly} fill="rgba(167,139,250,0.10)" stroke="rgba(167,139,250,0.62)" strokeWidth="1.6" style={{ filter: "drop-shadow(0 0 8px rgba(167,139,250,0.18))" }} />

          <circle cx={cx0} cy={cy0} r={3} fill="rgba(255,255,255,0.45)" />
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/55">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#9EF315]" />
          XR emphasis
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
          Games emphasis
        </span>
        {highlightKey ? (
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/70">
            Hovering: <span className="ml-2 text-white/85">{axes.find((a) => a.key === highlightKey)?.label}</span>
          </span>
        ) : null}
      </div>
    </div>
  );
}

function BreakdownRow({ axis, compact }: { axis: Axis; compact: boolean }) {
  const d = deltaLabel(axis.xr, axis.games);
  const showXR = compact ? Math.round(axis.xr * 100) : null;
  const showGames = compact ? Math.round(axis.games * 100) : null;

  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 transition hover:border-white/20 hover:bg-white/[0.04]">
      <span className="sr-only">{axis.seo}</span>

      <div className="grid gap-3 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-3">
          <div className="text-sm font-semibold tracking-[-0.02em] text-white/85">{axis.label}</div>
          <div className="mt-1 flex flex-wrap gap-2">
            <DeltaBadge xr={axis.xr} games={axis.games} />
            <StrengthTag xr={axis.xr} games={axis.games} />
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex w-14 items-center gap-2 text-[11px] font-semibold text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9EF315]" />
                XR
              </span>
              <div className="flex-1">
                <Bar value={axis.xr} tone="xr" />
              </div>
              {compact ? (
                <span className="w-10 text-right text-[11px] font-semibold text-white/55">{showXR}</span>
              ) : (
                <span className="w-10 text-right text-[11px] font-semibold text-white/0 transition-colors group-hover:text-white/55">
                  {Math.round(axis.xr * 100)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex w-14 items-center gap-2 text-[11px] font-semibold text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
                Games
              </span>
              <div className="flex-1">
                <Bar value={axis.games} tone="games" />
              </div>
              {compact ? (
                <span className="w-10 text-right text-[11px] font-semibold text-white/55">{showGames}</span>
              ) : (
                <span className="w-10 text-right text-[11px] font-semibold text-white/0 transition-colors group-hover:text-white/55">
                  {Math.round(axis.games * 100)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="text-xs leading-relaxed text-white/60">{axis.note}</div>
          <div
            className={cx(
              "mt-2 text-[11px] font-semibold",
              d.tone === "xr"
                ? "text-[rgba(158,243,21,0.9)]"
                : d.tone === "games"
                ? "text-[rgba(167,139,250,0.9)]"
                : "text-white/55"
            )}
          >
            {d.text}
          </div>
        </div>
      </div>

      <span
        className="pointer-events-none absolute inset-x-4 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, rgba(158,243,21,0), rgba(158,243,21,0.75), rgba(167,139,250,0.75), rgba(167,139,250,0))",
        }}
      />
    </div>
  );
}

// function CapabilityRadarBreakdown_Refined() {
//   const [view, setView] = useState<"Both" | "Overview" | "Breakdown">("Both");
//   const [highlightKey, setHighlightKey] = useState<string | null>(null);

//   const compact = view === "Breakdown";

//   const hint = useMemo(() => {
//     if (!highlightKey) return "Hover an axis label on the radar to highlight it.";
//     const axis = AXES.find((a) => a.key === highlightKey);
//     return axis ? `Focused: ${axis.label}` : "Focused";
//   }, [highlightKey]);

//   const orderedAxes = useMemo(() => {
//     if (!highlightKey) return AXES;
//     if (view !== "Breakdown") return AXES;
//     const a = AXES.find((x) => x.key === highlightKey);
//     if (!a) return AXES;
//     return [a, ...AXES.filter((x) => x.key !== highlightKey)];
//   }, [highlightKey, view]);

//   return (
//     <section className="relative bg-[#0C0722]">
//       <GlowLayer />
//       <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//           <div>
//             <div className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">Capability matrix</div>
//             <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
//               XR vs Games — capability radar (minimal)
//             </h2>
//             <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
//               A subtle SVG overview plus a compact breakdown. Designed to read fast (not “chart-y”).
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/65 backdrop-blur-md">
//               <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
//               {hint}
//             </div>

//             <div className="flex items-center gap-2 text-xs font-semibold text-white/55">
//               <span className="hidden sm:inline">View:</span>
//               <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md">
//                 <SegPill label="Both" active={view === "Both"} onClick={() => setView("Both")} />
//                 <SegPill label="Overview" active={view === "Overview"} onClick={() => setView("Overview")} />
//                 <SegPill label="Breakdown" active={view === "Breakdown"} onClick={() => setView("Breakdown")} />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 h-px w-full bg-white/10" />

//         <div className="mt-8 grid gap-6 lg:grid-cols-12">
//           {(view === "Both" || view === "Overview") && (
//             <div className={cx("lg:col-span-5", view === "Overview" && "lg:col-span-12")}>
//               <RadarCard axes={AXES} highlightKey={highlightKey} onHoverAxis={setHighlightKey} />
//               <div className="mt-4 text-xs text-white/45">Tip: axis labels are interactive — hover to focus the matching breakdown row.</div>
//             </div>
//           )}

//           {(view === "Both" || view === "Breakdown") && (
//             <div className={cx("lg:col-span-7", view === "Breakdown" && "lg:col-span-12")}>
//               <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
//                 <div className="flex items-end justify-between gap-4">
//                   <div className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">Breakdown</div>
//                   <div className="text-xs text-white/45">Hover shows raw scores · Δ badge shows lead</div>
//                 </div>

//                 <div className="mt-4 space-y-2">
//                   {orderedAxes.map((axis) => (
//                     <div
//                       key={axis.key}
//                       className={cx(highlightKey && highlightKey !== axis.key && "opacity-55", highlightKey === axis.key && "opacity-100")}
//                       onMouseEnter={() => setHighlightKey(axis.key)}
//                       onMouseLeave={() => setHighlightKey(null)}
//                     >
//                       <BreakdownRow axis={axis} compact={compact} />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-4 text-xs text-white/45">SEO note: each axis includes a hidden semantic phrase for search without changing visuals.</div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

const RADAR_AXES_REFINED: Axis[] = [
  {
    key: "ux",
    label: "Experience UX",
    xr: 0.9,
    games: 0.85,
    note: "XR: comfort + spatial UX · Games: loop + pacing UX",
    seo: "XR spatial UX comfort design and Games core loop pacing design",
  },
  {
    key: "systems",
    label: "Systems",
    xr: 0.75,
    games: 0.95,
    note: "XR: modules + tasks · Games: economies + progression",
    seo: "XR training modules task systems and Games progression economy systems",
  },
  {
    key: "perf",
    label: "Performance",
    xr: 0.95,
    games: 0.9,
    note: "Frame-time budgets + profiling discipline",
    seo: "XR 72/90fps performance optimization and Games profiling frame time budgets",
  },
  {
    key: "art",
    label: "Art pipeline",
    xr: 0.85,
    games: 0.95,
    note: "Real-time LOD + world-building discipline",
    seo: "XR real-time asset optimization LOD and Games world building VFX pipeline",
  },
  {
    key: "shipping",
    label: "Shipping",
    xr: 0.85,
    games: 0.85,
    note: "QA gates, release checklists, deployment readiness",
    seo: "XR hardware QA deployment and Games release pipelines regression QA",
  },
  {
    key: "analytics",
    label: "Analytics",
    xr: 0.8,
    games: 0.9,
    note: "Telemetry design + dashboards for iteration",
    seo: "XR training analytics task time and Games telemetry dashboards retention",
  },
];

function CapabilityRadarBreakdown_Refined() {
  const [view, setView] = useState<"Both" | "Overview" | "Breakdown">("Both");
  const [highlightKey, setHighlightKey] = useState<string | null>(null);

  const compact = view === "Breakdown";

  const hint = useMemo(() => {
    if (!highlightKey) return "Hover an axis label on the radar to highlight it.";
    const axis = RADAR_AXES_REFINED.find((a) => a.key === highlightKey);
    return axis ? `Focused: ${axis.label}` : "Focused";
  }, [highlightKey]);

  const orderedAxes = useMemo(() => {
    if (!highlightKey) return RADAR_AXES_REFINED;
    if (view !== "Breakdown") return RADAR_AXES_REFINED;
    const a = RADAR_AXES_REFINED.find((x) => x.key === highlightKey);
    if (!a) return RADAR_AXES_REFINED;
    return [a, ...RADAR_AXES_REFINED.filter((x) => x.key !== highlightKey)];
  }, [highlightKey, view]);

  return (
    <section className="relative bg-[#0C0722]">
      <GlowLayer />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">Capability matrix</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
              XR vs Games — capability radar (refined)
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
              SVG-only view with hover-to-focus breakdown. Fast to scan, not “chart-y”.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/65 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              {hint}
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-white/55">
              <span className="hidden sm:inline">View:</span>
              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md">
                <SegPill label="Both" active={view === "Both"} onClick={() => setView("Both")} />
                <SegPill label="Overview" active={view === "Overview"} onClick={() => setView("Overview")} />
                <SegPill label="Breakdown" active={view === "Breakdown"} onClick={() => setView("Breakdown")} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 h-px w-full bg-white/10" />

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {(view === "Both" || view === "Overview") && (
            <div className={cx("lg:col-span-5", view === "Overview" && "lg:col-span-12")}>
              <RadarCard axes={RADAR_AXES_REFINED} highlightKey={highlightKey} onHoverAxis={setHighlightKey} />
              <div className="mt-4 text-xs text-white/45">
                Tip: axis labels are interactive — hover to focus the matching breakdown row.
              </div>
            </div>
          )}

          {(view === "Both" || view === "Breakdown") && (
            <div className={cx("lg:col-span-7", view === "Breakdown" && "lg:col-span-12")}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
                <div className="flex items-end justify-between gap-4">
                  <div className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">Breakdown</div>
                  <div className="text-xs text-white/45">Hover shows raw scores · Δ badge shows lead</div>
                </div>

                <div className="mt-4 space-y-2">
                  {orderedAxes.map((axis) => (
                    <div
                      key={axis.key}
                      className={cx(highlightKey && highlightKey !== axis.key && "opacity-55", highlightKey === axis.key && "opacity-100")}
                      onMouseEnter={() => setHighlightKey(axis.key)}
                      onMouseLeave={() => setHighlightKey(null)}
                    >
                      <BreakdownRow axis={axis} compact={compact} />
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs text-white/45">
                  SEO note: each axis includes a hidden semantic phrase for search without changing visuals.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
/* =========================================================
   SECTION 5 — FAQs (Editorial Accordion)
========================================================= */
const TOPICS: Topic[] = ["Overview", "Timeline", "Pricing", "Platforms", "Security", "Process", "IP", "Support"];

const FAQS: FAQ[] = [
  {
    id: "faq-overview-1",
    topic: "Overview",
    studio: "Hybrid",
    q: "Do you do both XR systems and game experiences?",
    a: "Yes — Wodh runs as one team with two studios. XR focuses on enterprise-grade deployment and spatial UX; Games focuses on gameplay loops, content cadence, and polish. Hybrid projects merge pipelines.",
    keywords: ["XR studio", "games studio", "hybrid", "one team two studios"],
  },
  {
    id: "faq-timeline-1",
    topic: "Timeline",
    studio: "XR",
    q: "How fast can we ship a first prototype?",
    a: "Most teams start with a focused prototype slice (1–3 core flows). We align scope, performance budget, and device targets early to avoid rework.",
    keywords: ["XR prototype timeline", "MVP", "slice", "performance budget"],
  },
  {
    id: "faq-pricing-1",
    topic: "Pricing",
    studio: "Hybrid",
    q: "How do you price projects?",
    a: "We price by scope + risk + delivery complexity. For enterprise XR, rollout and device constraints affect effort; for games, content scale and live features matter most.",
    keywords: ["pricing", "scope", "enterprise XR", "game development pricing"],
  },
  {
    id: "faq-platforms-1",
    topic: "Platforms",
    studio: "XR",
    q: "Which platforms do you build for?",
    a: "Common targets: Meta Quest, WebXR, Mobile AR, and PC. We recommend platforms based on distribution, performance, and the constraints of your environment.",
    keywords: ["Meta Quest", "WebXR", "Mobile AR", "PC XR", "platform recommendation"],
  },
  {
    id: "faq-security-1",
    topic: "Security",
    studio: "Hybrid",
    q: "Can you work with enterprise security and privacy requirements?",
    a: "Yes. We design data flows intentionally (what’s collected, where it’s stored, and how it’s accessed). For sensitive projects we can align with your internal review process and NDA needs.",
    keywords: ["enterprise security", "privacy", "NDA", "data flows"],
  },
  {
    id: "faq-process-1",
    topic: "Process",
    studio: "Games",
    q: "What’s your build process for game-quality experiences?",
    a: "We start with a playable slice and performance targets, then scale content with a disciplined pipeline. Telemetry and iteration loops are planned early to reduce guesswork.",
    keywords: ["game pipeline", "playable slice", "telemetry", "iteration"],
  },
  {
    id: "faq-ip-1",
    topic: "IP",
    studio: "Hybrid",
    q: "Who owns the IP and assets?",
    a: "Your company owns the deliverables as defined in the agreement. We keep our internal tools/patterns, but your project IP remains yours.",
    keywords: ["IP ownership", "assets", "deliverables"],
  },
  {
    id: "faq-support-1",
    topic: "Support",
    studio: "XR",
    q: "Do you provide post-launch support and updates?",
    a: "Yes — we can structure maintenance, content updates, and device/platform updates depending on the product lifecycle and your rollout needs.",
    keywords: ["support", "maintenance", "updates", "rollout"],
  },
];

function TopicPill({ t, active, onClick }: { t: Topic; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "w-full rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition",
        active
          ? "border-white/20 bg-white/[0.06] text-white"
          : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
      )}
    >
      {t}
    </button>
  );
}

function AccordionItem({ item, open, onToggle }: { item: FAQ; open: boolean; onToggle: () => void }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-white/20 hover:bg-white/[0.04]">
      <button type="button" onClick={onToggle} className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Dot studio={item.studio} />
            <div className="truncate text-sm font-semibold tracking-[-0.02em] text-white/85">{item.q}</div>
          </div>
          <div className="mt-1 text-xs font-semibold text-white/45">
            {item.studio} · {item.topic}
          </div>
        </div>
        <div className="mt-1 text-sm font-semibold text-white/40">{open ? "–" : "+"}</div>
      </button>

      {open ? (
        <div className="px-4 pb-4">
          <div className="text-sm leading-relaxed text-white/65">{item.a}</div>
          {item.linkHref ? (
            <a href={item.linkHref} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white">
              {item.linkLabel ?? "Learn more"} <span className="text-white/45">→</span>
            </a>
          ) : null}
          <span className="sr-only">{item.keywords.join(" ")}</span>
        </div>
      ) : null}

      <Underline studio={item.studio} />
    </div>
  );
}

function FAQs_TopicsRailAccordion() {
  const [topic, setTopic] = useState<Topic>("Timeline");
  const [openId, setOpenId] = useState<string | null>(FAQS[0]?.id ?? null);

  const list = useMemo(() => {
    if (topic === "Overview") return FAQS;
    return FAQS.filter((x) => x.topic === topic);
  }, [topic]);

  return (
    <section className="relative bg-[#0C0722]">
      <GlowLayer />
      <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">Industry FAQs</div>
            <div className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">
              Sticky Topics Rail + Accordion
            </div>
            <div className="mt-2 max-w-2xl text-sm leading-relaxed text-white/65">
              Topics stay sticky; answers appear on the right. Compact and easy to scan.
            </div>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white/80 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            Start a project <span className="text-white/50">→</span>
          </a>
        </div>

        <div className="mt-6 h-px w-full bg-white/10" />

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md">
                <div className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">Topics</div>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:hidden">
                  {TOPICS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={cx(
                        "shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition",
                        topic === t
                          ? "border-white/20 bg-white/[0.06] text-white"
                          : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="mt-3 hidden space-y-2 lg:block">
                  {TOPICS.map((t) => (
                    <TopicPill key={t} t={t} active={topic === t} onClick={() => setTopic(t)} />
                  ))}
                </div>
              </div>

              <div className="mt-4 text-xs text-white/45">SEO note: topic clusters match search intent (timeline, pricing, platforms, security…).</div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-2">
              {list.map((item) => (
                <AccordionItem key={item.id} item={item} open={openId === item.id} onToggle={() => setOpenId(openId === item.id ? null : item.id)} />
              ))}
              {list.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 text-sm text-white/60">
                  No FAQs under this topic yet. Add 4–8 per topic for maximum SEO coverage.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION 6 — FINAL CTA (Idea 1)
========================================================= */
function FinalCTA_IndustrySelector() {
  const [studio, setStudio] = useState<Studio>("Hybrid");
  const [industry, setIndustry] = useState<string>(INDUSTRY_SUGGESTIONS[0] ?? "Training & Simulation");
  const [note, setNote] = useState<string>("");

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Wodh Build Map — ${industry} (${studio})`);
    const body = encodeURIComponent(
      `Hi Wodh,\n\nIndustry: ${industry}\nStudio focus: ${studio}\n\nBrief:\n${note || "-"}\n\nPlease share a build map (scope, milestones, platform recommendation, and risks).\n`
    );
    return `mailto:hello@wodh.io?subject=${subject}&body=${body}`;
  }, [industry, studio, note]);

  return (
    <section className="relative bg-[#0C0722]">
      <GlowLayer />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-md">
          <div className="relative px-6 py-10 sm:px-10">
            <Underline studio={studio} />
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase text-white/60">
                  Final CTA
                </div>

                <h3 className="mt-4 text-balance text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                  Tell us your industry —{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, rgba(158,243,21,1) 0%, rgba(167,139,250,1) 60%, rgba(255,255,255,0.92) 100%)",
                    }}
                  >
                    we’ll map the build
                  </span>
                  .
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                  We’ll reply with a compact build map: recommended platform, milestones, risks + mitigation, and what to ship first.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <TrustChip>Response in 24–48h</TrustChip>
                  <TrustChip>NDA-friendly</TrustChip>
                  <TrustChip>Scope → milestones</TrustChip>
                  <TrustChip>Unity / Unreal / WebXR</TrustChip>
                </div>
              </div>

              <div className="w-full max-w-xl">
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="text-xs font-semibold tracking-[0.18em] uppercase text-white/55">Quick details</div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Pill label="XR" active={studio === "XR"} onClick={() => setStudio("XR")} />
                    <Pill label="Hybrid" active={studio === "Hybrid"} onClick={() => setStudio("Hybrid")} />
                    <Pill label="Games" active={studio === "Games"} onClick={() => setStudio("Games")} />
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-white/55">Industry</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85 outline-none transition focus:border-white/20"
                      >
                        {INDUSTRY_SUGGESTIONS.map((x) => (
                          <option key={x} value={x} className="bg-[#0C0722]">
                            {x}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-white/55">Brief (optional)</label>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="What are you trying to ship? Any platform constraints?"
                        rows={3}
                        className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85 placeholder:text-white/35 outline-none transition focus:border-white/20"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={mailto}
                      className="inline-flex flex-1 items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-[#0C0722] transition hover:-translate-y-[1px]"
                    >
                      Get my build map
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.08]"
                    >
                      Open inquiry form
                    </a>
                  </div>

                  <div className="mt-3 text-xs text-white/45">
                    Email route uses <span className="text-white/65">hello@wodh.io</span> (change as needed).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sr-only">
          Final CTA to request a build map by industry for XR development and game development projects including platform recommendations, milestones, and delivery planning.
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FINAL — ONE MERGED INDUSTRIES PAGE
========================================================= */
export default function IndustriesPage() {
  return (
    <main className="bg-[#0C0722] text-white">
      <IndustriesHeroIndexDetails />
      <MiniPlaybookTabs />
      <ProofSignalBar />
      <CapabilityRadarBreakdown_Refined />
      <FAQs_TopicsRailAccordion />
      <FinalCTA_IndustrySelector />
      <div className="pb-10" />
    </main>
  );
}


