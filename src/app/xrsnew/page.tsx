"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * WODH — XR SERVICES PAGE (Wodh Design System v1 — XR mode)
 * ✅ Indigo base + subtle noise + STRONG neon-green glows (XR only)
 * ✅ Two-tone typography (white + green) — NO tri-color, NO violet
 * ✅ Section pattern anti-fatigue: every section has a different layout grammar
 * ✅ Clear Section IDs + banner comments for fast navigation
 *
 * Requirements implemented:
 * - Hero
 * - What we build
 * - Outcomes strip (added)
 * - Core XR service offerings
 * - Platforms & devices
 * - Tools section
 * - Integration capability
 * - Related project portfolio
 * - FAQ (command palette style)
 */

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

/* =======================================================================================
   PAGE — XR SERVICES
======================================================================================= */

export default function XRServicesPage() {
  const reduceMotion = useReducedMotion() ?? false;

  // Shared "chapter" navigation (optional)
  const SECTIONS = useMemo(
    () => [
      { id: "xr-hero", label: "Hero" },
      { id: "xr-what-we-build", label: "What we build" },
      { id: "xr-outcomes", label: "Outcomes" },
      { id: "xr-core-offerings", label: "Core offerings" },
      { id: "xr-platforms-devices", label: "Platforms" },
      { id: "xr-tools", label: "Tools" },
      { id: "xr-integration", label: "Integrations" },
      { id: "xr-portfolio", label: "Portfolio" },
      { id: "xr-faq", label: "FAQ" },
    ],
    []
  );

  return (
    <main className="relative min-h-screen bg-[#0C0722] text-white">
      <GlobalAtmosphere reduceMotion={reduceMotion} />

      {/* Top utility: subtle anchor nav (keeps page feeling “crafted”) */}
      <TopAnchorNav sections={SECTIONS} />

      <div className="relative">
        {/* ===================================================================================
            SECTION 1 — Hero (xr-hero)
        =================================================================================== */}
        <XR_Hero />

        {/* ===================================================================================
            SECTION 2 — What we build (xr-what-we-build)
        =================================================================================== */}
        <XR_WhatWeBuild />

        {/* ===================================================================================
            SECTION 3 — Outcomes strip (xr-outcomes)
        =================================================================================== */}
        <XR_OutcomesStrip />

        {/* ===================================================================================
            SECTION 4 — Core XR service offerings (xr-core-offerings)
        =================================================================================== */}
        <XR_CoreOfferingsMatrix />

        {/* ===================================================================================
            SECTION 5 — Platforms & devices (xr-platforms-devices)
        =================================================================================== */}
        <XR_PlatformsDevices />

        {/* ===================================================================================
            SECTION 6 — Tools section (xr-tools)
        =================================================================================== */}
        <XR_ToolsToolchain />

        {/* ===================================================================================
            SECTION 7 — Integration capability (xr-integration)
        =================================================================================== */}
        <XR_IntegrationMap />

        {/* ===================================================================================
            SECTION 8 — Related project portfolio (xr-portfolio)
        =================================================================================== */}
        <XR_RelatedPortfolio />

        {/* ===================================================================================
            SECTION 9 — FAQ (xr-faq)
        =================================================================================== */}
        <XR_FAQCommand />

        <FooterMicro />
      </div>
    </main>
  );
}

/* =======================================================================================
   GLOBAL — ATMOSPHERE (XR neon-green only)
======================================================================================= */

function GlobalAtmosphere({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base noise */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.25'/%3E%3C/svg%3E)",
        }}
      />

      {/* Neon green glow anchors */}
      <div className="absolute -left-40 -top-44 h-[520px] w-[520px] rounded-full bg-[#9EF315] opacity-[0.18] blur-[90px]" />
      <div className="absolute -right-48 top-[18vh] h-[620px] w-[620px] rounded-full bg-[#9EF315] opacity-[0.12] blur-[110px]" />
      <div className="absolute left-[20%] bottom-[-240px] h-[740px] w-[740px] rounded-full bg-[#9EF315] opacity-[0.14] blur-[130px]" />

      {/* Subtle “XR beam” that repeats faintly */}
      <motion.div
        className="absolute left-1/2 top-0 h-full w-px opacity-[0.18]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(158,243,21,0) 0%, rgba(158,243,21,0.35) 18%, rgba(158,243,21,0.10) 50%, rgba(158,243,21,0.32) 78%, rgba(158,243,21,0) 100%)",
        }}
        initial={{ y: 0 }}
        animate={reduceMotion ? undefined : { y: [0, -18, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 8.5, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(255,255,255,0.07),rgba(12,7,34,0)_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1000px_650px_at_50%_110%,rgba(0,0,0,0.35),rgba(12,7,34,0)_55%)]" />
    </div>
  );
}

/* =======================================================================================
   GLOBAL — TOP ANCHOR NAV
======================================================================================= */

function TopAnchorNav({
  sections,
}: {
  sections: Array<{ id: string; label: string }>;
}) {
  const [active, setActive] = useState<string>("xr-hero");
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;

    const ids = sections.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, threshold: [0.2, 0.35, 0.5], rootMargin: "-12% 0px -70% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mounted, sections]);

  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-[#0C0722]/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/15 bg-white/5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#9EF315] shadow-[0_0_18px_rgba(158,243,21,0.75)]" />
          </span>
          <span className="text-sm font-medium tracking-[-0.01em] text-white/90 group-hover:text-white">
            Wodh XR
          </span>
        </Link>

        <div className="hidden flex-wrap items-center gap-1.5 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cx(
                "rounded-full px-3 py-1 text-xs transition",
                active === s.id
                  ? "border border-[#9EF315]/35 bg-[#9EF315]/10 text-white shadow-[0_0_18px_rgba(158,243,21,0.28)]"
                  : "border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
              )}
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#xr-portfolio"
            className="hidden rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:border-white/25 hover:text-white sm:inline-flex"
          >
            See work
          </a>
          <a
            href="#xr-faq"
            className="rounded-full border border-[#9EF315]/35 bg-[#9EF315]/10 px-3 py-1.5 text-xs font-medium text-white shadow-[0_0_22px_rgba(158,243,21,0.25)] hover:bg-[#9EF315]/14"
          >
            Ask a question
          </a>
        </div>
      </div>
    </div>
  );
}

/* =======================================================================================
   SECTION 1 — HERO (xr-hero)
   Pattern: Split editorial + neon stack object (signature)
======================================================================================= */

function XR_Hero() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section id="xr-hero" className="relative">
      <div className="mx-auto w-full max-w-6xl px-4 pt-14 sm:px-6 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          {/* Editorial */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/75">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9EF315] shadow-[0_0_14px_rgba(158,243,21,0.75)]" />
              XR Development Studio
              <span className="text-white/35">•</span>
              Production-grade builds
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Build{" "}
              <span className="text-white/85">XR experiences</span>{" "}
              with{" "}
              <span className="text-[#9EF315] drop-shadow-[0_0_18px_rgba(158,243,21,0.40)]">
                real-world performance
              </span>
              .
            </h1>

            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/72">
              We ship XR training, product experiences, remote assist, and
              visualization systems that are fast to deploy, easy to maintain,
              and designed for scale — from prototype to rollout.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#xr-portfolio"
                className="inline-flex items-center justify-center rounded-2xl border border-[#9EF315]/35 bg-[#9EF315]/12 px-5 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(158,243,21,0.25)] hover:bg-[#9EF315]/16"
              >
                View related work
                <span className="ml-2 inline-block text-[#9EF315]">↗</span>
              </a>

              <a
                href="#xr-faq"
                className="inline-flex items-center justify-center rounded-2xl border border-white/14 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 hover:border-white/24 hover:text-white"
              >
                Ask about your use-case
              </a>

              <div className="hidden sm:block text-xs text-white/45">
                Typical kickoff: 7–10 days
              </div>
            </div>

            {/* Trust chips */}
            <div className="mt-8 flex flex-wrap gap-2">
              <MiniChip>Performance-first</MiniChip>
              <MiniChip>Quest / Vision Pro / Mobile AR</MiniChip>
              <MiniChip>Security & NDA ready</MiniChip>
              <MiniChip>Live ops & iteration</MiniChip>
            </div>
          </div>

          {/* Signature XR stack object */}
          <div className="relative">
            <XRStackObject reduceMotion={reduceMotion} />
          </div>
        </div>

        {/* Subtle divider */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>
    </section>
  );
}

function XRStackObject({ reduceMotion }: { reduceMotion: boolean }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative mx-auto w-full max-w-[460px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Neon halo */}
      <div className="absolute -inset-6 rounded-[32px] bg-[#9EF315]/10 blur-2xl" />
      <div className="absolute -inset-10 rounded-[40px] bg-[#9EF315]/10 blur-3xl opacity-60" />

      <motion.div
        className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/5 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.45)]"
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : {
                y: hover ? -6 : 0,
                rotateX: hover ? 6 : 0,
                rotateY: hover ? -8 : 0,
              }
        }
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Top glow line */}
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#9EF315]/55 to-transparent" />

        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold tracking-[-0.02em]">
              XR Delivery Stack
            </div>
            <div className="mt-1 text-xs text-white/60">
              From discovery → deployment → iteration
            </div>
          </div>
          <span className="inline-flex items-center rounded-full border border-[#9EF315]/30 bg-[#9EF315]/10 px-2 py-1 text-[11px] text-white shadow-[0_0_18px_rgba(158,243,21,0.18)]">
            Neon-ready
          </span>
        </div>

        <div className="mt-5 grid gap-3">
          <StackCard
            title="Build"
            desc="Interactive XR modules with production performance budgets."
            kpi="Target FPS • Memory budgets"
          />
          <StackCard
            title="Integrate"
            desc="Connect SSO, APIs, content systems, analytics, and devices."
            kpi="SSO • REST/GraphQL • Webhooks"
          />
          <StackCard
            title="Scale"
            desc="Rollout support, QA pipelines, telemetry, and live iteration."
            kpi="Telemetry • A/B tests • Live ops"
          />
        </div>

        {/* Bottom scanline */}
        <motion.div
          className="absolute left-0 top-0 h-full w-full opacity-[0.10]"
          style={{
            background:
              "repeating-linear-gradient(to bottom, rgba(158,243,21,0.0) 0px, rgba(158,243,21,0.0) 10px, rgba(158,243,21,0.25) 11px)",
          }}
          animate={reduceMotion ? undefined : { y: [0, 14, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </motion.div>
    </div>
  );
}

function StackCard({
  title,
  desc,
  kpi,
}: {
  title: string;
  desc: string;
  kpi: string;
}) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#0C0722]/35 p-4">
      <div className="absolute -left-2 top-4 h-10 w-1 rounded-full bg-[#9EF315]/60 blur-[1px]" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold tracking-[-0.02em]">{title}</div>
          <div className="mt-1 text-xs leading-relaxed text-white/70">{desc}</div>
        </div>
        <div className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">
          {kpi}
        </div>
      </div>
    </div>
  );
}

/* =======================================================================================
   SECTION 2 — WHAT WE BUILD (xr-what-we-build)
   Pattern: 2×2 portal worlds (each tile uses different internal layout)
======================================================================================= */

type BuildWorld = {
  id: string;
  title: string;
  desc: string;
  chips: string[];
  layout: "diagram" | "strip" | "steps" | "metrics";
};

const BUILD_WORLDS: BuildWorld[] = [
  {
    id: "training",
    title: "Training & Simulation",
    desc: "Safety, onboarding, and operations training with measurable skill lift.",
    chips: ["Scenario design", "Assessments", "Offline mode"],
    layout: "diagram",
  },
  {
    id: "showrooms",
    title: "Product Showrooms",
    desc: "Interactive product stories, configurators, and guided demos in XR.",
    chips: ["Configurator", "Guided flow", "Content updates"],
    layout: "strip",
  },
  {
    id: "assist",
    title: "Remote Assist",
    desc: "Hands-free guidance, annotations, and expert support for field teams.",
    chips: ["Live calls", "Annotations", "Session logs"],
    layout: "steps",
  },
  {
    id: "twin",
    title: "Visualization / Digital Twin",
    desc: "Spatial visualization for assets, environments, and operational insight.",
    chips: ["Data overlays", "Realtime feeds", "Dashboards"],
    layout: "metrics",
  },
];

function XR_WhatWeBuild() {
  return (
    <section id="xr-what-we-build" className="relative">
      <Container>
        <SectionHeader
          kicker="What we build"
          title={
            <>
              XR solutions designed to{" "}
              <span className="text-[#9EF315] drop-shadow-[0_0_16px_rgba(158,243,21,0.35)]">
                deploy in the real world
              </span>
            </>
          }
          subtitle="Pick a category — each one maps to a different production pattern and outcome."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {BUILD_WORLDS.map((w) => (
            <PortalWorldCard key={w.id} world={w} />
          ))}
        </div>

        <SoftDivider />
      </Container>
    </section>
  );
}

function PortalWorldCard({ world }: { world: BuildWorld }) {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/5 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={false}
      animate={
        reduceMotion
          ? undefined
          : {
              y: hover ? -6 : 0,
            }
      }
      transition={{ type: "spring", stiffness: 170, damping: 18 }}
    >
      {/* Portal glow edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#9EF315]/45 to-transparent" />
      <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#9EF315]/12 blur-[70px]" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold tracking-[-0.02em]">
            {world.title}
          </div>
          <div className="mt-2 text-sm leading-relaxed text-white/70">
            {world.desc}
          </div>
        </div>

        <span className="shrink-0 rounded-full border border-[#9EF315]/25 bg-[#9EF315]/10 px-2 py-1 text-[11px] text-white shadow-[0_0_18px_rgba(158,243,21,0.16)]">
          XR
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {world.chips.map((c) => (
          <MiniChip key={c}>{c}</MiniChip>
        ))}
      </div>

      <div className="mt-5">
        {world.layout === "diagram" && <WorldDiagram />}
        {world.layout === "strip" && <WorldThumbnailStrip />}
        {world.layout === "steps" && <WorldSteps />}
        {world.layout === "metrics" && <WorldMetrics />}
      </div>
    </motion.div>
  );
}

function WorldDiagram() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-[#0C0722]/30 p-4">
      <div className="text-xs text-white/60">Typical flow</div>
      <div className="mt-3 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-2 text-xs">
        <Node label="Learn" />
        <Connector />
        <Node label="Practice" />
        <Connector />
        <Node label="Assess" />
      </div>
      <div className="mt-3 text-[11px] text-white/55">
        Includes scenarios, scoring, and completion reporting.
      </div>
    </div>
  );
}

function Node({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-[#9EF315]/25 bg-[#9EF315]/10 px-3 py-1 text-center text-[11px] text-white shadow-[0_0_18px_rgba(158,243,21,0.12)]">
      {label}
    </div>
  );
}
function Connector() {
  return (
    <div className="h-px w-full bg-gradient-to-r from-white/0 via-white/22 to-white/0" />
  );
}

function WorldThumbnailStrip() {
  // Placeholder thumbnails (swap later). Uses gradients, not images, to keep it self-contained.
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0C0722]/30 p-4">
      <div className="text-xs text-white/60">Demo modules</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-xl border border-white/10 bg-[radial-gradient(circle_at_30%_25%,rgba(158,243,21,0.25),rgba(255,255,255,0.04)_45%,rgba(12,7,34,0.25)_80%)]"
          />
        ))}
      </div>
      <div className="mt-3 text-[11px] text-white/55">
        Content can be updated without rebuilding the app.
      </div>
    </div>
  );
}

function WorldSteps() {
  const steps = [
    { t: "Capture", d: "Call + camera feed + context." },
    { t: "Guide", d: "Overlays, pointers, annotations." },
    { t: "Record", d: "Session logs and outcomes." },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0C0722]/30 p-4">
      <div className="text-xs text-white/60">Operational steps</div>
      <div className="mt-3 grid gap-2">
        {steps.map((s, i) => (
          <div key={s.t} className="flex items-start gap-3">
            <div className="mt-0.5 h-6 w-6 shrink-0 rounded-full border border-[#9EF315]/25 bg-[#9EF315]/10 text-center text-[11px] leading-6 text-white shadow-[0_0_18px_rgba(158,243,21,0.12)]">
              {i + 1}
            </div>
            <div>
              <div className="text-xs font-medium">{s.t}</div>
              <div className="text-[11px] text-white/60">{s.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorldMetrics() {
  const metrics = [
    { k: "Latency", v: "< 120ms" },
    { k: "FPS", v: "72–90" },
    { k: "Feeds", v: "Realtime" },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0C0722]/30 p-4">
      <div className="text-xs text-white/60">Performance targets</div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {metrics.map((m) => (
          <div
            key={m.k}
            className="rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <div className="text-[11px] text-white/55">{m.k}</div>
            <div className="mt-1 text-sm font-semibold tracking-[-0.02em]">
              {m.v}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[11px] text-white/55">
        Tuned to device constraints and comfort guidelines.
      </div>
    </div>
  );
}

/* =======================================================================================
   SECTION 3 — OUTCOMES STRIP (xr-outcomes)
   Pattern: full-width KPI band (tight + punchy) — no cards grid
======================================================================================= */

function XR_OutcomesStrip() {
  const stats = [
    {
      k: "Onboarding time",
      v: "↓ 30–60%",
      d: "Compress training cycles with simulation and repetition.",
    },
    {
      k: "Operational errors",
      v: "↓ 15–35%",
      d: "Reduce mistakes via guided practice and assessments.",
    },
    {
      k: "Engagement",
      v: "↑ 2–4×",
      d: "Increase retention with interactive XR experiences.",
    },
    {
      k: "Rollout",
      v: "Weeks → Days",
      d: "Ship modular content updates and iterate quickly.",
    },
  ];

  return (
    <section id="xr-outcomes" className="relative">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[26px] border border-[#9EF315]/20 bg-[#9EF315]/8 p-5 shadow-[0_0_60px_rgba(158,243,21,0.18)]">
          <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[#9EF315]/18 blur-[70px]" />
          <div className="absolute -right-24 -bottom-28 h-64 w-64 rounded-full bg-[#9EF315]/14 blur-[90px]" />

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs text-white/70">Outcomes</div>
              <div className="mt-1 text-lg font-semibold tracking-[-0.02em]">
                Measurable improvements — not just “cool XR”
              </div>
            </div>
            <div className="text-xs text-white/55">
              Benchmarks vary by use-case and rollout scope.
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.k}
                className="rounded-2xl border border-white/10 bg-[#0C0722]/28 p-4"
              >
                <div className="text-[11px] text-white/60">{s.k}</div>
                <div className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-white">
                  {s.v}
                </div>
                <div className="mt-2 text-[11px] leading-relaxed text-white/60">
                  {s.d}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      </div>
    </section>
  );
}

/* =======================================================================================
   SECTION 4 — CORE XR SERVICE OFFERINGS (xr-core-offerings)
   Pattern: capability matrix (rows/columns) — avoids repeated cards
======================================================================================= */

type OfferingRow = {
  name: string;
  deliverables: string[];
  outcomes: string[];
  bestFor: string;
};

const OFFERINGS: OfferingRow[] = [
  {
    name: "Discovery & XR Strategy",
    deliverables: ["Use-case mapping", "Device & platform plan", "Prototype scope"],
    outcomes: ["Faster alignment", "Clear roadmap", "Lower risk"],
    bestFor: "New XR initiatives",
  },
  {
    name: "XR Experience Development",
    deliverables: ["Interaction design", "3D optimization", "Performance budgets"],
    outcomes: ["Stable FPS", "Comfort-first UX", "Production readiness"],
    bestFor: "Training, demos, simulations",
  },
  {
    name: "3D / Spatial Content Pipeline",
    deliverables: ["Assets & scenes", "LOD + baking", "Runtime optimization"],
    outcomes: ["Smaller builds", "Faster loads", "Better device fit"],
    bestFor: "Product/industrial scenes",
  },
  {
    name: "QA, Device Testing, Launch",
    deliverables: ["Device matrix testing", "Crash/perf profiling", "Release readiness"],
    outcomes: ["Fewer regressions", "Smoother rollout", "Better ratings"],
    bestFor: "Enterprise deployments",
  },
  {
    name: "Live Ops & Iteration",
    deliverables: ["Telemetry plan", "Content updates", "Continuous improvement"],
    outcomes: ["Higher adoption", "Faster fixes", "Sustained value"],
    bestFor: "Long-term XR products",
  },
];

function XR_CoreOfferingsMatrix() {
  return (
    <section id="xr-core-offerings" className="relative">
      <Container>
        <SectionHeader
          kicker="Core XR service offerings"
          title={
            <>
              A{" "}
              <span className="text-[#9EF315] drop-shadow-[0_0_16px_rgba(158,243,21,0.35)]">
                production pipeline
              </span>{" "}
              — not a one-off prototype
            </>
          }
          subtitle="Each line item maps to deliverables you can scope, review, and ship."
        />

        <div className="mt-8 overflow-hidden rounded-[28px] border border-white/12 bg-white/5">
          <div className="grid grid-cols-12 gap-0 border-b border-white/10 bg-white/4 px-5 py-4 text-[11px] text-white/65">
            <div className="col-span-4 font-medium text-white/80">Service</div>
            <div className="col-span-3 font-medium text-white/80">Deliverables</div>
            <div className="col-span-3 font-medium text-white/80">Outcomes</div>
            <div className="col-span-2 font-medium text-white/80">Best for</div>
          </div>

          <div className="divide-y divide-white/10">
            {OFFERINGS.map((row) => (
              <OfferingMatrixRow key={row.name} row={row} />
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/60">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9EF315]" />
            Scoping-ready
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9EF315]" />
            Performance budgets
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9EF315]" />
            Enterprise rollout
          </span>
        </div>

        <SoftDivider />
      </Container>
    </section>
  );
}

function OfferingMatrixRow({ row }: { row: OfferingRow }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <div className="px-5 py-4">
      <div className="grid grid-cols-12 items-start gap-4">
        <div className="col-span-12 md:col-span-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold tracking-[-0.02em]">
                {row.name}
              </div>
              <div className="mt-1 text-xs text-white/60">
                {row.deliverables[0]}
              </div>
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden rounded-full border border-white/12 bg-white/5 px-2 py-1 text-[11px] text-white/70 hover:border-white/22 hover:text-white"
            >
              {open ? "Less" : "More"}
            </button>
          </div>
        </div>

        <div className="col-span-12 md:col-span-3">
          <ul className="hidden list-disc space-y-1 pl-4 text-[11px] text-white/65 md:block">
            {row.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <AnimatePresence>
            {open && (
              <motion.ul
                className="md:hidden mt-3 list-disc space-y-1 pl-4 text-[11px] text-white/65"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.22, ease: "easeOut" }
                }
              >
                {row.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="col-span-12 md:col-span-3">
          <ul className="hidden list-disc space-y-1 pl-4 text-[11px] text-white/65 md:block">
            {row.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
          <AnimatePresence>
            {open && (
              <motion.ul
                className="md:hidden mt-3 list-disc space-y-1 pl-4 text-[11px] text-white/65"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.22, ease: "easeOut" }
                }
              >
                {row.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="col-span-12 md:col-span-2">
          <div className="inline-flex rounded-full border border-[#9EF315]/20 bg-[#9EF315]/10 px-2 py-1 text-[11px] text-white shadow-[0_0_14px_rgba(158,243,21,0.14)]">
            {row.bestFor}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =======================================================================================
   SECTION 5 — PLATFORMS & DEVICES (xr-platforms-devices)
   Pattern: filter chips + logo/device rail (utility-first)
======================================================================================= */

type Platform = "Headset" | "Mobile AR" | "WebXR" | "Desktop" | "Hybrid";

type PlatformItem = {
  id: string;
  name: string;
  type: Platform;
  notes: string;
};

const PLATFORMS: PlatformItem[] = [
  { id: "quest", name: "Meta Quest", type: "Headset", notes: "Standalone VR deployments." },
  { id: "visionpro", name: "Apple Vision Pro", type: "Headset", notes: "Spatial computing builds." },
  { id: "openxr", name: "OpenXR", type: "Hybrid", notes: "Cross-device runtime strategy." },
  { id: "arcore", name: "ARCore", type: "Mobile AR", notes: "Android AR experiences." },
  { id: "arkit", name: "ARKit", type: "Mobile AR", notes: "iOS AR experiences." },
  { id: "webxr", name: "WebXR", type: "WebXR", notes: "Browser-based XR access." },
  { id: "pcvr", name: "PC VR", type: "Desktop", notes: "High-end tethered VR." },
  { id: "tablet", name: "Tablet AR", type: "Mobile AR", notes: "Retail and field workflows." },
];

const PLATFORM_FILTERS: Platform[] = ["Headset", "Mobile AR", "WebXR", "Desktop", "Hybrid"];

function XR_PlatformsDevices() {
  const [filter, setFilter] = useState<Platform | "All">("All");

  const filtered = useMemo(() => {
    if (filter === "All") return PLATFORMS;
    return PLATFORMS.filter((p) => p.type === filter);
  }, [filter]);

  return (
    <section id="xr-platforms-devices" className="relative">
      <Container>
        <SectionHeader
          kicker="Platforms & devices"
          title={
            <>
              Built to run where your teams{" "}
              <span className="text-[#9EF315] drop-shadow-[0_0_16px_rgba(158,243,21,0.35)]">
                actually deploy
              </span>
            </>
          }
          subtitle="Filter by platform — we optimize for performance, comfort, and rollout realities."
        />

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter("All")}
            className={cx(
              "rounded-full border px-3 py-1 text-xs transition",
              filter === "All"
                ? "border-[#9EF315]/35 bg-[#9EF315]/10 text-white shadow-[0_0_18px_rgba(158,243,21,0.22)]"
                : "border-white/10 bg-white/5 text-white/70 hover:border-white/22 hover:text-white"
            )}
          >
            All
          </button>
          {PLATFORM_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cx(
                "rounded-full border px-3 py-1 text-xs transition",
                filter === f
                  ? "border-[#9EF315]/35 bg-[#9EF315]/10 text-white shadow-[0_0_18px_rgba(158,243,21,0.22)]"
                  : "border-white/10 bg-white/5 text-white/70 hover:border-white/22 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Rail */}
        <div className="mt-6 overflow-hidden rounded-[28px] border border-white/12 bg-white/5">
          <div className="flex items-stretch gap-3 overflow-x-auto px-5 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="min-w-[240px] shrink-0 rounded-2xl border border-white/10 bg-[#0C0722]/30 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-semibold tracking-[-0.02em]">
                    {p.name}
                  </div>
                  <span className="rounded-full border border-[#9EF315]/20 bg-[#9EF315]/10 px-2 py-0.5 text-[11px] text-white">
                    {p.type}
                  </span>
                </div>
                <div className="mt-2 text-[11px] leading-relaxed text-white/62">
                  {p.notes}
                </div>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-[#9EF315]/25 to-transparent" />
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <MiniChip>Perf budgets</MiniChip>
                  <MiniChip>Comfort</MiniChip>
                  <MiniChip>Deploy</MiniChip>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SoftDivider />
      </Container>
    </section>
  );
}

/* =======================================================================================
   SECTION 6 — TOOLS (xr-tools)
   Pattern: toolchain timeline rail (Design → Build → Test → Deploy)
======================================================================================= */

type ToolStage = {
  stage: string;
  desc: string;
  tools: string[];
};

const TOOLCHAIN: ToolStage[] = [
  {
    stage: "Design",
    desc: "Flow, interaction, spatial UI, and comfort-first experience design.",
    tools: ["Figma", "Miro", "Blender", "Reference rigs"],
  },
  {
    stage: "Build",
    desc: "Engine implementation, interactions, asset pipeline, optimization.",
    tools: ["Unity", "Unreal", "OpenXR", "C# / C++"],
  },
  {
    stage: "Test",
    desc: "Device matrix testing, profiling, performance & stability checks.",
    tools: ["Profiler", "RenderDoc", "Device labs", "CI checks"],
  },
  {
    stage: "Deploy",
    desc: "Release workflows, telemetry, updates, and rollout support.",
    tools: ["Build pipelines", "Analytics", "Crash reporting", "Content updates"],
  },
];

function XR_ToolsToolchain() {
  const reduceMotion = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % TOOLCHAIN.length), 4200);
    return () => clearInterval(t);
  }, [reduceMotion]);

  return (
    <section id="xr-tools" className="relative">
      <Container>
        <SectionHeader
          kicker="Tools"
          title={
            <>
              A toolchain tuned for{" "}
              <span className="text-[#9EF315] drop-shadow-[0_0_16px_rgba(158,243,21,0.35)]">
                performance
              </span>{" "}
              and maintainability
            </>
          }
          subtitle="We pick tools for the deployment reality — devices, teams, and update cadence."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: focused stage */}
          <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/5 p-5">
            <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#9EF315]/12 blur-[70px]" />
            <div className="text-xs text-white/65">Current stage</div>
            <div className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
              {TOOLCHAIN[idx].stage}
            </div>
            <div className="mt-2 text-sm leading-relaxed text-white/70">
              {TOOLCHAIN[idx].desc}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {TOOLCHAIN[idx].tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[#9EF315]/20 bg-[#9EF315]/10 px-3 py-1 text-xs text-white shadow-[0_0_16px_rgba(158,243,21,0.16)]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              {TOOLCHAIN.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={cx(
                    "h-2.5 w-2.5 rounded-full border transition",
                    idx === i
                      ? "border-[#9EF315]/60 bg-[#9EF315]/60 shadow-[0_0_18px_rgba(158,243,21,0.35)]"
                      : "border-white/20 bg-white/5 hover:border-white/35"
                  )}
                  aria-label={`Go to ${TOOLCHAIN[i].stage}`}
                />
              ))}
            </div>
          </div>

          {/* Right: timeline rail */}
          <div className="overflow-hidden rounded-[28px] border border-white/12 bg-white/5">
            <div className="flex items-stretch gap-3 overflow-x-auto px-5 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TOOLCHAIN.map((s, i) => (
                <button
                  key={s.stage}
                  onClick={() => setIdx(i)}
                  className={cx(
                    "min-w-[260px] shrink-0 rounded-2xl border p-4 text-left transition",
                    idx === i
                      ? "border-[#9EF315]/30 bg-[#9EF315]/10 shadow-[0_0_24px_rgba(158,243,21,0.18)]"
                      : "border-white/10 bg-[#0C0722]/28 hover:border-white/22"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-semibold tracking-[-0.02em]">
                      {s.stage}
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/65">
                      {i + 1}/4
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] leading-relaxed text-white/62">
                    {s.desc}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.tools.slice(0, 3).map((t) => (
                      <MiniChip key={t}>{t}</MiniChip>
                    ))}
                    {s.tools.length > 3 && <MiniChip>+{s.tools.length - 3}</MiniChip>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <SoftDivider />
      </Container>
    </section>
  );
}

/* =======================================================================================
   SECTION 7 — INTEGRATION CAPABILITY (xr-integration)
   Pattern: systems node map (center + spokes) — diagram-first
======================================================================================= */

type IntegrationNode = {
  label: string;
  items: string[];
};

const INTEGRATIONS: IntegrationNode[] = [
  { label: "Identity", items: ["SSO / SAML", "OAuth", "RBAC"] },
  { label: "Data / APIs", items: ["REST / GraphQL", "Webhooks", "Realtime feeds"] },
  { label: "Content", items: ["CMS", "Remote config", "Asset delivery"] },
  { label: "Analytics", items: ["Events", "Funnels", "Telemetry"] },
  { label: "Enterprise", items: ["ERP", "IoT", "Digital twin feeds"] },
  { label: "Comms", items: ["Voice/Video", "Session logs", "Support tools"] },
];

function XR_IntegrationMap() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section id="xr-integration" className="relative">
      <Container>
        <SectionHeader
          kicker="Integration capability"
          title={
            <>
              XR that plugs into your{" "}
              <span className="text-[#9EF315] drop-shadow-[0_0_16px_rgba(158,243,21,0.35)]">
                existing systems
              </span>
            </>
          }
          subtitle="Most XR fails at the 'enterprise layer.' We design integrations from day one."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* Node map */}
          <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/5 p-6">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#9EF315]/12 blur-[90px]" />
            <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-[#9EF315]/10 blur-[100px]" />

            <div className="relative mx-auto aspect-square w-full max-w-[520px]">
              <CenterNode />
              <OrbitNodes reduceMotion={reduceMotion} />
            </div>

            <div className="mt-6 text-xs text-white/60">
              Integration patterns are validated early in discovery to avoid late-stage surprises.
            </div>
          </div>

          {/* Structured list */}
          <div className="rounded-[28px] border border-white/12 bg-white/5 p-6">
            <div className="text-xs text-white/65">Common integrations</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {INTEGRATIONS.map((n) => (
                <div
                  key={n.label}
                  className="rounded-2xl border border-white/10 bg-[#0C0722]/28 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold tracking-[-0.02em]">
                      {n.label}
                    </div>
                    <span className="h-2 w-2 rounded-full bg-[#9EF315] shadow-[0_0_16px_rgba(158,243,21,0.55)]" />
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-[11px] text-white/62">
                    {n.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#9EF315]/18 bg-[#9EF315]/8 p-4">
              <div className="text-sm font-semibold tracking-[-0.02em]">
                Need something specific?
              </div>
              <div className="mt-1 text-xs text-white/65">
                Share your stack and rollout constraints — we’ll propose a practical integration plan.
              </div>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <a
                  href="#xr-faq"
                  className="inline-flex items-center justify-center rounded-xl border border-[#9EF315]/30 bg-[#9EF315]/12 px-4 py-2 text-xs font-medium text-white shadow-[0_0_18px_rgba(158,243,21,0.20)] hover:bg-[#9EF315]/16"
                >
                  Ask in FAQ
                </a>
                <a
                  href="#xr-portfolio"
                  className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 hover:border-white/22 hover:text-white"
                >
                  See integration examples
                </a>
              </div>
            </div>
          </div>
        </div>

        <SoftDivider />
      </Container>
    </section>
  );
}

function CenterNode() {
  return (
    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <div className="relative rounded-full border border-[#9EF315]/30 bg-[#9EF315]/10 px-6 py-5 text-center shadow-[0_0_36px_rgba(158,243,21,0.22)]">
        <div className="text-sm font-semibold tracking-[-0.02em]">XR Experience</div>
        <div className="mt-1 text-[11px] text-white/65">
          Identity • Data • Content • Analytics
        </div>
        <div className="absolute inset-0 -z-10 rounded-full bg-[#9EF315]/10 blur-2xl" />
      </div>
    </div>
  );
}

function OrbitNodes({ reduceMotion }: { reduceMotion: boolean }) {
  const nodes = [
    { t: "SSO", x: 50, y: 6 },
    { t: "APIs", x: 88, y: 32 },
    { t: "CMS", x: 86, y: 72 },
    { t: "Analytics", x: 52, y: 92 },
    { t: "ERP/IoT", x: 14, y: 72 },
    { t: "Comms", x: 12, y: 32 },
  ];

  return (
    <motion.div
      className="absolute inset-0"
      animate={reduceMotion ? undefined : { rotate: [0, 6, 0, -6, 0] }}
      transition={
        reduceMotion
          ? undefined
          : { duration: 10, repeat: Infinity, ease: "easeInOut" }
      }
      style={{ transformOrigin: "50% 50%" }}
    >
      {/* Orbit ring */}
      <div className="absolute left-1/2 top-1/2 h-[76%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />

      {nodes.map((n) => (
        <div
          key={n.t}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className="rounded-full border border-white/12 bg-white/6 px-3 py-2 text-[11px] text-white/80 shadow-[0_0_18px_rgba(158,243,21,0.10)]">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#9EF315] shadow-[0_0_12px_rgba(158,243,21,0.75)]" />
            {n.t}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* =======================================================================================
   SECTION 8 — RELATED PROJECT PORTFOLIO (xr-portfolio)
   Pattern: proof mosaic wall (Tetris-style) — avoids “cards row”
======================================================================================= */

type CaseTile = {
  id: string;
  title: string;
  type: string;
  outcome: string;
  tags: string[];
};

const CASES: CaseTile[] = [
  {
    id: "case-featured",
    title: "XR Training System",
    type: "Training & Simulation",
    outcome: "Faster onboarding + fewer errors",
    tags: ["Assessments", "Offline-ready", "Device rollout"],
  },
  {
    id: "case-2",
    title: "Product XR Configurator",
    type: "Showroom",
    outcome: "Higher engagement + clearer decisions",
    tags: ["Content updates", "Analytics", "Guided flow"],
  },
  {
    id: "case-3",
    title: "Remote Assist Workflow",
    type: "Field Ops",
    outcome: "Reduced downtime + better support",
    tags: ["Session logs", "SSO", "Video/voice"],
  },
  {
    id: "case-4",
    title: "Digital Twin Visualization",
    type: "Visualization",
    outcome: "Operational clarity + faster insights",
    tags: ["Realtime feeds", "Dashboards", "3D optimization"],
  },
];

function XR_RelatedPortfolio() {
  return (
    <section id="xr-portfolio" className="relative">
      <Container>
        <SectionHeader
          kicker="Related project portfolio"
          title={
            <>
              Proof built for{" "}
              <span className="text-[#9EF315] drop-shadow-[0_0_16px_rgba(158,243,21,0.35)]">
                real deployments
              </span>
            </>
          }
          subtitle="A small snapshot of patterns we ship — and the outcomes they drive."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          {/* Featured large */}
          <MosaicFeatured tile={CASES[0]} />

          {/* KPI tiles */}
          <MosaicKPI
            title="Performance"
            value="72–90 FPS"
            note="Budgeted per device"
            className="lg:col-span-3"
          />
          <MosaicKPI
            title="Rollout"
            value="Multi-site"
            note="Enterprise-ready"
            className="lg:col-span-3"
          />

          {/* Case tiles */}
          <MosaicCase tile={CASES[1]} className="lg:col-span-4" />
          <MosaicCase tile={CASES[2]} className="lg:col-span-4" />

          {/* Testimonial snippet */}
          <MosaicQuote className="lg:col-span-4" />

          {/* Case tile */}
          <MosaicCase tile={CASES[3]} className="lg:col-span-4" />

          {/* CTA mini tile */}
          <MosaicCTA className="lg:col-span-8" />
        </div>

        <SoftDivider />
      </Container>
    </section>
  );
}

function MosaicFeatured({ tile }: { tile: CaseTile }) {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-[28px] border border-white/12 bg-white/5 p-6 lg:col-span-6 lg:row-span-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={false}
      animate={reduceMotion ? undefined : { y: hover ? -6 : 0 }}
      transition={{ type: "spring", stiffness: 170, damping: 18 }}
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#9EF315]/14 blur-[95px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#9EF315]/45 to-transparent" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-white/60">{tile.type}</div>
          <div className="mt-1 text-2xl font-semibold tracking-[-0.03em]">
            {tile.title}
          </div>
          <div className="mt-3 text-sm leading-relaxed text-white/70">
            Outcome:{" "}
            <span className="text-white/88">{tile.outcome}</span>
          </div>
        </div>
        <span className="rounded-full border border-[#9EF315]/25 bg-[#9EF315]/10 px-2 py-1 text-[11px] text-white shadow-[0_0_18px_rgba(158,243,21,0.16)]">
          Featured
        </span>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {tile.tags.map((t) => (
          <div
            key={t}
            className="rounded-2xl border border-white/10 bg-[#0C0722]/30 p-3"
          >
            <div className="text-[11px] text-white/65">{t}</div>
            <div className="mt-1 h-1 w-10 rounded-full bg-[#9EF315]/55 shadow-[0_0_14px_rgba(158,243,21,0.40)]" />
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#0C0722]/28 p-4">
        <div className="text-xs text-white/60">What you get</div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <Bullet>Module design + scoring</Bullet>
          <Bullet>Device rollout support</Bullet>
          <Bullet>Performance budgets</Bullet>
          <Bullet>Telemetry + iteration</Bullet>
        </div>
      </div>
    </motion.div>
  );
}

function MosaicKPI({
  title,
  value,
  note,
  className,
}: {
  title: string;
  value: string;
  note: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[28px] border border-white/12 bg-white/5 p-6",
        className
      )}
    >
      <div className="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[#9EF315]/10 blur-[85px]" />
      <div className="text-xs text-white/60">{title}</div>
      <div className="mt-2 text-3xl font-semibold tracking-[-0.03em]">{value}</div>
      <div className="mt-2 text-sm text-white/65">{note}</div>
      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-[#9EF315]/25 to-transparent" />
      <div className="mt-4 flex flex-wrap gap-2">
        <MiniChip>Measured</MiniChip>
        <MiniChip>Repeatable</MiniChip>
      </div>
    </div>
  );
}

function MosaicCase({ tile, className }: { tile: CaseTile; className?: string }) {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      className={cx(
        "relative overflow-hidden rounded-[28px] border border-white/12 bg-white/5 p-6",
        className
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={false}
      animate={reduceMotion ? undefined : { y: hover ? -5 : 0 }}
      transition={{ type: "spring", stiffness: 170, damping: 18 }}
    >
      <div className="absolute -right-20 -bottom-24 h-56 w-56 rounded-full bg-[#9EF315]/10 blur-[90px]" />

      <div className="text-xs text-white/60">{tile.type}</div>
      <div className="mt-1 text-lg font-semibold tracking-[-0.02em]">
        {tile.title}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-white/70">
        {tile.outcome}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tile.tags.slice(0, 3).map((t) => (
          <MiniChip key={t}>{t}</MiniChip>
        ))}
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="mt-4 text-xs text-white/60">
        Click-to-open case study (hook up later)
      </div>
    </motion.div>
  );
}

function MosaicQuote({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[28px] border border-white/12 bg-white/5 p-6",
        className
      )}
    >
      <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[#9EF315]/10 blur-[110px]" />
      <div className="text-xs text-white/60">Client note</div>
      <div className="mt-3 text-pretty text-lg leading-relaxed text-white/80">
        “The XR rollout finally felt{" "}
        <span className="text-[#9EF315] drop-shadow-[0_0_14px_rgba(158,243,21,0.35)]">
          production-grade
        </span>
        . Performance stayed stable across devices, and iteration was fast.”
      </div>
      <div className="mt-4 text-xs text-white/55">
        — Placeholder testimonial (swap with real)
      </div>
    </div>
  );
}

function MosaicCTA({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[28px] border border-[#9EF315]/20 bg-[#9EF315]/8 p-6 shadow-[0_0_60px_rgba(158,243,21,0.14)]",
        className
      )}
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#9EF315]/18 blur-[110px]" />
      <div className="text-xs text-white/70">Next step</div>
      <div className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
        Want a rollout plan for your use-case?
      </div>
      <div className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
        Share device targets, environment constraints, and integration needs — we’ll propose a practical scope and timeline.
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <a
          href="#xr-faq"
          className="inline-flex items-center justify-center rounded-2xl border border-[#9EF315]/30 bg-[#9EF315]/12 px-5 py-3 text-sm font-medium text-white shadow-[0_0_22px_rgba(158,243,21,0.22)] hover:bg-[#9EF315]/16"
        >
          Ask in FAQ
        </a>
        <a
          href="#xr-hero"
          className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 hover:border-white/22 hover:text-white"
        >
          Back to top
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <MiniChip>Kickoff 7–10 days</MiniChip>
        <MiniChip>NDA-ready</MiniChip>
        <MiniChip>Performance budgets</MiniChip>
      </div>
    </div>
  );
}

/* =======================================================================================
   SECTION 9 — FAQ (xr-faq)
   Pattern: Command Palette FAQ (search + grouped results)
======================================================================================= */

type FAQItem = {
  q: string;
  a: string;
  tag: "Scope" | "Devices" | "Timeline" | "Security" | "Integrations" | "Costs";
};

const FAQS: FAQItem[] = [
  {
    q: "What do you need to start?",
    a: "A clear use-case, target devices, deployment environment, and any integration constraints. We’ll propose scope, milestones, and performance targets.",
    tag: "Scope",
  },
  {
    q: "Which headsets do you support?",
    a: "We typically work with Quest and Vision Pro plus OpenXR-compatible paths when appropriate. We confirm device targets early to budget performance and UX.",
    tag: "Devices",
  },
  {
    q: "How long does an XR project take?",
    a: "Most projects start with discovery + prototype, then a production phase. Timelines vary by content complexity, integrations, and rollout size — we’ll define it in a clear plan.",
    tag: "Timeline",
  },
  {
    q: "Can you integrate SSO and enterprise systems?",
    a: "Yes — SSO (SAML/OAuth), APIs (REST/GraphQL), analytics, content systems, and enterprise feeds. We validate integration patterns early.",
    tag: "Integrations",
  },
  {
    q: "Do you sign NDAs and handle security requirements?",
    a: "Yes. We can work under NDA and align on access control, telemetry boundaries, and enterprise deployment requirements.",
    tag: "Security",
  },
  {
    q: "How do you price XR work?",
    a: "We scope based on outcomes, device targets, content needs, integrations, and rollout support. We’ll propose phased delivery so you can validate value early.",
    tag: "Costs",
  },
];

function XR_FAQCommand() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<FAQItem["tag"] | "All">("All");

  const tags: Array<FAQItem["tag"]> = useMemo(
    () => ["Scope", "Devices", "Timeline", "Integrations", "Security", "Costs"],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const matchTag = activeTag === "All" ? true : f.tag === activeTag;
      const matchQ =
        !q ||
        f.q.toLowerCase().includes(q) ||
        f.a.toLowerCase().includes(q) ||
        f.tag.toLowerCase().includes(q);
      return matchTag && matchQ;
    });
  }, [query, activeTag]);

  return (
    <section id="xr-faq" className="relative">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9EF315] shadow-[0_0_14px_rgba(158,243,21,0.75)]" />
              FAQ
            </div>

            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Ask anything about{" "}
              <span className="text-[#9EF315] drop-shadow-[0_0_16px_rgba(158,243,21,0.35)]">
                XR delivery
              </span>
              .
            </h2>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
              Search or filter — this section is designed to reduce back-and-forth and help you scope quickly.
            </p>

            <div className="mt-6 rounded-[22px] border border-white/12 bg-white/5 p-4">
              <div className="text-xs text-white/60">Search</div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: Quest, SSO, timeline, pricing…"
                className="mt-2 w-full rounded-xl border border-white/10 bg-[#0C0722]/30 px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-[#9EF315]/35 focus:ring-2 focus:ring-[#9EF315]/15"
              />

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTag("All")}
                  className={cx(
                    "rounded-full border px-3 py-1 text-xs transition",
                    activeTag === "All"
                      ? "border-[#9EF315]/35 bg-[#9EF315]/10 text-white shadow-[0_0_18px_rgba(158,243,21,0.22)]"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/22 hover:text-white"
                  )}
                >
                  All
                </button>
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t)}
                    className={cx(
                      "rounded-full border px-3 py-1 text-xs transition",
                      activeTag === t
                        ? "border-[#9EF315]/35 bg-[#9EF315]/10 text-white shadow-[0_0_18px_rgba(158,243,21,0.22)]"
                        : "border-white/10 bg-white/5 text-white/70 hover:border-white/22 hover:text-white"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-4 text-xs text-white/55">
                Results: <span className="text-white/80">{filtered.length}</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="rounded-[28px] border border-white/12 bg-white/5 p-4 sm:p-5">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#0C0722]/28 p-5 text-sm text-white/70">
                No matches. Try a different keyword like “SSO”, “Quest”, or “timeline”.
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((f) => (
                  <FAQRow key={f.q} item={f} />
                ))}
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-[#9EF315]/18 bg-[#9EF315]/8 p-4">
              <div className="text-sm font-semibold tracking-[-0.02em]">
                Still unsure?
              </div>
              <div className="mt-1 text-xs text-white/65">
                Tell us your use-case + target devices — we’ll respond with a practical plan.
              </div>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <a
                  href="#xr-hero"
                  className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 hover:border-white/22 hover:text-white"
                >
                  Back to top
                </a>
                <a
                  href="#xr-portfolio"
                  className="inline-flex items-center justify-center rounded-xl border border-[#9EF315]/28 bg-[#9EF315]/12 px-4 py-2 text-xs font-medium text-white shadow-[0_0_18px_rgba(158,243,21,0.18)] hover:bg-[#9EF315]/16"
                >
                  Review proof
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      </Container>
    </section>
  );
}

function FAQRow({ item }: { item: FAQItem }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0C0722]/28">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 p-4 text-left"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#9EF315]/20 bg-[#9EF315]/10 px-2 py-0.5 text-[11px] text-white">
              {item.tag}
            </span>
            <div className="text-sm font-semibold tracking-[-0.02em]">
              {item.q}
            </div>
          </div>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.22, ease: "easeOut" }
                }
              >
                <div className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-1 shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">
          {open ? "–" : "+"}
        </div>
      </button>
    </div>
  );
}

/* =======================================================================================
   SHARED PRIMITIVES
======================================================================================= */

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
      {children}
    </div>
  );
}

function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: React.ReactNode;
  subtitle: string;
}) {
  return (
    <div>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-[#9EF315] shadow-[0_0_14px_rgba(158,243,21,0.75)]" />
        {kicker}
      </div>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
        {subtitle}
      </p>
    </div>
  );
}

function MiniChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
      {children}
    </span>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-xs text-white/70">
      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#9EF315] shadow-[0_0_12px_rgba(158,243,21,0.65)]" />
      <span>{children}</span>
    </div>
  );
}

function SoftDivider() {
  return (
    <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />
  );
}

/* =======================================================================================
   FOOTER MICRO
======================================================================================= */

function FooterMicro() {
  return (
    <footer className="relative">
      <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
        <div className="flex flex-col gap-3 rounded-[26px] border border-white/12 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold tracking-[-0.02em]">
              Wodh XR Studio
            </div>
            <div className="mt-1 text-xs text-white/60">
              Neon-green XR delivery — designed for real-world deployments.
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              href="#xr-portfolio"
              className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 hover:border-white/22 hover:text-white"
            >
              View work
            </a>
            <a
              href="#xr-faq"
              className="inline-flex items-center justify-center rounded-2xl border border-[#9EF315]/30 bg-[#9EF315]/12 px-4 py-2 text-sm font-medium text-white shadow-[0_0_22px_rgba(158,243,21,0.20)] hover:bg-[#9EF315]/16"
            >
              Ask a question
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Wodh — XR Studio
        </div>
      </div>
    </footer>
  );
}
