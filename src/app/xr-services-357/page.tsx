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

const GREEN = "#9EF315";

function XRGradientH1({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="text-balance text-[2.15rem] sm:text-5xl md:text-6xl font-semibold tracking-[-0.05em] leading-[1.02]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,.92), rgba(158,243,21,.92))`,
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </h1>
  );
}

function CTA({
  primary = "Start XR Discovery",
  secondary = "View XR Work",
}: {
  primary?: string;
  secondary?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href="#xr-portfolio"
        className="group inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium
                   bg-white text-black hover:bg-white/90 transition"
      >
        {primary}
        <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">→</span>
      </a>
      <a
        href="#xr-portfolio"
        className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium
                   border border-white/15 bg-white/[0.02] hover:bg-white/[0.05] transition text-white/85"
      >
        {secondary}
      </a>
    </div>
  );
}

function MicroTrustLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 text-xs sm:text-sm text-white/55">
      <span
        aria-hidden
        className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-[-1px]"
        style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
      />
      {children}
    </div>
  );
}

/* =======================================================================================
   PAGE — XR SERVICES
======================================================================================= */

export default function XRServicesPage() {
  const reduceMotion = useReducedMotion() ?? false;

  // Shared “chapter” navigation (optional)
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

        {/* Header_V2 section from xrservicessections */}
        <section id="xr-what-we-build-v2" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
          >
            <Header_V2 />

            {/* Bento grid: 2 wide top, 4 normal below */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {/* Order is already arranged so first two are wide. */}
              {TILES_V2.map((t, idx) => (
                <TileCard key={t.title} tile={t} index={idx} />
              ))}
            </div>

            {/* Handoff clarity row */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-1 h-2.5 w-2.5 rounded-full"
                  style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
                />
                <div className="text-sm text-white/70 leading-relaxed">
                  <span className="text-white/85 font-medium">Typical delivery:</span>{" "}
                  Discovery → Prototype → Production build → Deployment + iteration.{" "}
                  We validate comfort and performance on-device before scaling content.
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===================================================================================
            SECTION 2 — Outcomes strip (xr-outcomes)
        =================================================================================== */}
        <XR_OutcomesStrip />

        {/* ===================================================================================
            SECTION 4 — Core XR service offerings (xr-core-offerings)
        =================================================================================== */}
        <XR_CoreOfferingsMatrix />

        {/* ===================================================================================
            SECTION 4.5 — Tools & Stack Ledger V2 (xr-tools-v2)
        =================================================================================== */}
        <XR_Tools_StackLedger_V2 />

        {/* ===================================================================================
            SECTION 6 — Integration capability (xr-integration)
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
   Pattern: Equal-height editorial + snapshot (HERO_IDEA_1_EQUAL_HEIGHT)
======================================================================================= */

function XR_Hero() {
  const reduceMotion = useReducedMotion() ?? false;

  const rows = [
    { k: "Devices", v: "Meta Quest • PICO • WebXR" },
    { k: "AR", v: "ARKit • ARCore" },
    { k: "Build", v: "Performance budgets + comfort-first interaction" },
    { k: "Rollout", v: "Telemetry-ready + deploy planning" },
  ];

  return (
    <section id="xr-hero" className={cx("relative mx-auto w-full max-w-6xl px-4 sm:px-6", "pt-14 sm:pt-20 pb-10 sm:pb-14")}>
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        {/* Equal-height grid */}
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
          {/* Left (make it stretch and distribute nicely) */}
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="flex flex-col gap-5">
              <XRGradientH1>Production-ready XR for training, simulation, and spatial operations.</XRGradientH1>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
                We build XR systems that perform on real hardware, integrate with your stack, and scale from pilot to rollout —
                designed for comfort, clarity, and long-term iteration.
              </p>

              <CTA primary="Start XR Discovery" secondary="View XR Work" />

              <MicroTrustLine>
                Quest / PICO / WebXR / ARKit / ARCore — engineered for adoption, not demos.
              </MicroTrustLine>
            </div>

            {/* Optional quiet bottom hint (still clean) */}
            <div className="hidden sm:block text-xs text-white/45">
              Typical flow: Discovery → Prototype → Production → Deploy → Iterate
            </div>
          </div>

          {/* Right (Snapshot) — forced to match left height */}
          <div className="h-full">
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_12px_45px_rgba(0,0,0,.35)]">
              <div className="flex h-full flex-col p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-white/85">XR Delivery Snapshot</div>
                  <span className="text-xs text-white/50">How we ship</span>
                </div>

                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                {/* Rows */}
                <div className="mt-4 grid gap-3">
                  {rows.map((r) => (
                    <div key={r.k} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-xs text-white/55">{r.k}</div>
                        <div className="text-xs text-white/80 text-right">{r.v}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Spacer to push footer to bottom (keeps equal-height feel premium) */}
                <div className="flex-1" />

                {/* Footer */}
                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: GREEN, boxShadow: "0 0 18px rgba(158,243,21,.45)" }}
                    />
                    <div className="text-xs text-white/70">XR-first checks: comfort • fps • usability • telemetry</div>
                  </div>
                </div>
              </div>

              {/* XR green depth only */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    radial-gradient(780px 260px at 20% 0%, rgba(158,243,21,.16), transparent 60%),
                    radial-gradient(600px 220px at 85% 100%, rgba(158,243,21,.10), transparent 62%)
                  `,
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,.38), transparent)" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   HEADER_V2 SECTION (from xrservicessections)
   Includes: Header_V2, TILES_V2 grid, and delivery text
======================================================================================= */

type Specs_V2 = {
  platform?: string; // VR / headset
  ar?: string; // mobile AR
  web?: string; // WebXR
};

type Tile_V2 = {
  title: string;
  oneLiner: string;
  whatYouGet: string[];
  specs: Specs_V2;
  trust?: string;
  emphasis?: "wide" | "normal";
};

const TILES_V2: Tile_V2[] = [
  {
    title: "VR Training System",
    oneLiner: "Scenario-based onboarding with assessments, reporting, and updateable content.",
    whatYouGet: [
      "Scenario flows + scoring / pass criteria",
      "Admin reporting + user progression tracking",
      "Content pipeline for versioned updates",
    ],
    specs: { platform: "Meta Quest • PICO" },
    trust: "Comfort-first • Performance budgeted • Telemetry-ready",
    emphasis: "wide",
  },
  {
    title: "Digital Twin Interface",
    oneLiner: "A spatial 3D viewer for assets and layers — built for clarity, access control, and iteration.",
    whatYouGet: [
      "3D navigation + layer toggles / states",
      "Data overlays via APIs + permissioned views",
      "Scene optimization + streaming strategy",
    ],
    specs: { web: "WebXR", platform: "Headset mode (optional)" },
    trust: "Clarity-first • Optimized for FPS • Instrumented events",
    emphasis: "wide",
  },
  {
    title: "Simulation & Scenarios",
    oneLiner: "High-fidelity practice for complex workflows — without real-world risk.",
    whatYouGet: [
      "Scenario engine + step guidance / branching",
      "Role-based scenarios + checkpoints",
      "Telemetry on timing, errors, and completion",
    ],
    specs: { platform: "Meta Quest • PICO" },
    trust: "Comfort-first • Performance budgeted • QA on-device",
    emphasis: "normal",
  },
  {
    title: "AR Field Workflows",
    oneLiner: "Real-world guidance that reduces mistakes and speeds up procedures in the field.",
    whatYouGet: [
      "Guided procedures + checklists",
      "Anchors + annotations / 3D cues",
      "Offline-ready patterns (when needed)",
    ],
    specs: { ar: "ARKit • ARCore" },
    trust: "Readable UX • Robust tracking • Telemetry-ready",
    emphasis: "normal",
  },
  {
    title: "AR Product Experience",
    oneLiner: "AR demos and configurators that explain products in real space — fast and convincing.",
    whatYouGet: [
      "AR placement + interactions",
      "Variant / configuration logic",
      "Capture/share mode + analytics events",
    ],
    specs: { ar: "ARKit • ARCore" },
    trust: "Fast load • Stable tracking • Measurable funnels",
    emphasis: "normal",
  },
  {
    title: "WebXR Experience",
    oneLiner: "XR in the browser for broad reach — low friction, fast iteration, measurable results.",
    whatYouGet: [
      "WebXR build + hosting / deployment setup",
      "Performance-optimized 3D delivery",
      "Analytics events + iteration loop",
    ],
    specs: { web: "WebXR (browser)" },
    trust: "Low friction • Optimized delivery • Telemetry-ready",
    emphasis: "normal",
  },
];

function Header_V2() {
  return (
    <div className="mb-7 sm:mb-9">
      <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
        What we build — <span className="text-white/70">XR systems you can scope, ship, and roll out.</span>
      </h2>

      <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
        A practical catalog of XR deliverables — designed for real environments, real users, and long-term iteration.
        We prioritize comfort, frame-time, and adoption from day one.
      </p>

      {/* scope line (no chips) */}
      <div className="mt-4 text-sm text-white/60">
        <span className="text-white/45">Scope:</span>{" "}
        VR Training • Simulation • Digital Twins • Field AR • Product AR • WebXR
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      {/* single trust line */}
      <div className="mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2">
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
        />
        Device-tested builds mjhy kro please • optimized 3D pipeline • rollout-ready delivery
      </div>
    </div>
  );
}

function AccentLine_V2() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

function Bullet_V2({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
      <span>{children}</span>
    </li>
  );
}

function SpecRow({ specs }: { specs: Specs_V2 }) {
  const items: Array<{ k: string; v: string }> = [];
  if (specs.platform) items.push({ k: "Platform", v: specs.platform });
  if (specs.ar) items.push({ k: "AR", v: specs.ar });
  if (specs.web) items.push({ k: "Web", v: specs.web });

  return (
    <div className="mt-4 grid gap-2">
      {items.map((it) => (
        <div key={it.k} className="flex items-start justify-between gap-3 text-xs text-white/60">
          <span className="text-white/45">{it.k}</span>
          <span className="text-right text-white/70">{it.v}</span>
        </div>
      ))}
    </div>
  );
}

function TileCard({
  tile,
  index,
}: {
  tile: Tile_V2;
  index: number;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const wide = tile.emphasis === "wide";

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: 0.05 * index, ease: [0.21, 1, 0.21, 1] }}
      className={cx(wide ? "sm:col-span-2" : "sm:col-span-1")}
    >
      <div
        className={cx(
          "group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
          "shadow-[0_10px_40px_rgba(0,0,0,.35)] transition",
          "hover:border-white/15 hover:bg-white/[0.04] hover:-translate-y-[2px]"
        )}
      >
        {/* hover sweep (subtle) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-24 -top-24 h-48 rotate-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(158,243,21,.10), transparent)",
            filter: "blur(1px)",
          }}
        />

        {/* XR green depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px 180px at 22% 100%, rgba(158,243,21,.14), transparent 65%)",
          }}
        />

        <div className={cx("relative p-5 sm:p-6", wide && "sm:p-7")}>
          <AccentLine_V2 />

          {/* hierarchy */}
          <div className={cx("mt-3 font-semibold tracking-[-0.02em] text-white", wide ? "text-xl" : "text-lg")}>
            {tile.title}
          </div>

          <p className={cx("mt-2 text-sm leading-relaxed text-white/70", wide && "sm:text-base")}>
            {tile.oneLiner}
          </p>

          {/* What you get label */}
          <div className="mt-4 text-xs tracking-[0.22em] uppercase text-white/55">
            What you get
          </div>

          <ul className="mt-2 grid gap-2">
            {tile.whatYouGet.map((b) => (
              <Bullet_V2 key={b}>{b}</Bullet_V2>
            ))}
          </ul>

          <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* specs as key/value */}
          <SpecRow specs={tile.specs} />

          {/* micro trust line */}
          {tile.trust ? (
            <div className="mt-4 text-xs text-white/50">
              {tile.trust}
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

/* =======================================================================================
   SECTION 2 — OUTCOMES STRIP (xr-outcomes)
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
   SECTION 4.5 — TOOLS & STACK LEDGER V2 (xr-tools-v2)
   Pattern: Featured triptych (Vision Pro, Quest, PICO) + tiered ledger rows
======================================================================================= */

function simpleIcon(slug: string) {
  return `https://cdn.simpleicons.org/${slug}/ffffff`;
}

function SectionHeader_Tools() {
  return (
    <div className="mb-7 sm:mb-9">
      <h2 className="text-balance text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white">
        Tools & stack — <span className="text-white/70">how we ship XR.</span>
      </h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
        Not a logo wall — a delivery stack. We build for the three primary targets{" "}
        <span className="text-white/85">Apple Vision Pro</span>,{" "}
        <span className="text-white/85">Meta Quest</span>, and{" "}
        <span className="text-white/85">PICO</span> — then support the rest through standards, testing, and repeatable
        pipelines.
      </p>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2">
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
        />
        <span>Production builds • device QA • frame-time budgets • instrumentation</span>
      </div>
    </div>
  );
}

function AccentLine_Tools() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

function Bullet_Tools({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
      <span>{children}</span>
    </li>
  );
}

function InlineMark({
  label,
  icon = "chip",
}: {
  label: string;
  icon?: "headset" | "chip" | "cube" | "globe" | "code";
}) {
  const glyph =
    icon === "headset" ? (
      <>
        <path
          d="M7 10c0-2.5 2-4.5 4.5-4.5h1C15 5.5 17 7.5 17 10v4c0 2.5-2 4.5-4.5 4.5h-1C9 18.5 7 16.5 7 14v-4Z"
          stroke="rgba(255,255,255,.78)"
          strokeWidth="1.6"
        />
        <path
          d="M5.5 12h-1.2c-1 0-1.8.8-1.8 1.8v.4C2.5 15.2 3.3 16 4.3 16h1.2"
          stroke="rgba(255,255,255,.35)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M18.5 12h1.2c1 0 1.8.8 1.8 1.8v.4c0 1-.8 1.8-1.8 1.8h-1.2"
          stroke="rgba(255,255,255,.35)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ) : icon === "cube" ? (
      <>
        <path d="M12 2 20 6.5 12 11 4 6.5 12 2Z" stroke="rgba(255,255,255,.78)" strokeWidth="1.6" />
        <path d="M20 6.5V17.5L12 22V11" stroke="rgba(255,255,255,.40)" strokeWidth="1.6" />
        <path d="M4 6.5V17.5L12 22" stroke="rgba(255,255,255,.40)" strokeWidth="1.6" />
      </>
    ) : icon === "globe" ? (
      <>
        <path
          d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
          stroke="rgba(255,255,255,.78)"
          strokeWidth="1.6"
        />
        <path d="M3 12h18" stroke="rgba(255,255,255,.35)" strokeWidth="1.6" />
        <path d="M12 3c3 3 3 15 0 18" stroke="rgba(255,255,255,.35)" strokeWidth="1.6" />
      </>
    ) : icon === "code" ? (
      <>
        <path d="M9 8 5 12l4 4" stroke="rgba(255,255,255,.78)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M15 8l4 4-4 4" stroke="rgba(255,255,255,.78)" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ) : (
      <>
        <path
          d="M9 3h6v3h3v6h-3v3H9v-3H6V6h3V3Z"
          stroke="rgba(255,255,255,.78)"
          strokeWidth="1.6"
        />
        <path d="M9 21h6" stroke="rgba(255,255,255,.35)" strokeWidth="1.6" strokeLinecap="round" />
      </>
    );

  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-white/12 bg-white/[0.03]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          {glyph}
        </svg>
      </span>
      <span className="text-xs text-white/85">{label}</span>
    </div>
  );
}

type LogoItem = {
  name: string;
  hint?: string;
  src?: string;
  kind?: "img" | "inline";
  inline?: React.ReactNode;
};

function LogoBadge({ item }: { item: LogoItem }) {
  const hasImg = item.kind !== "inline" && !!item.src;

  return (
    <div
      className={cx(
        "group relative inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02]",
        "px-3 py-2 transition",
        "hover:border-white/14 hover:bg-white/[0.03]"
      )}
      style={{ boxShadow: "0 10px 30px rgba(0,0,0,.18)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-3 right-3 bottom-0 h-[2px] rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, rgba(158,243,21,.70), rgba(158,243,21,0))",
          boxShadow: "0 0 18px rgba(158,243,21,.14)",
        }}
      />

      {hasImg ? (
        <img
          src={item.src}
          alt={item.name}
          loading="lazy"
          className="h-5 w-5 opacity-90 group-hover:opacity-100 transition-opacity"
          draggable={false}
        />
      ) : (
        <span className="opacity-95">{item.inline}</span>
      )}

      <div className="flex flex-col leading-none">
        <span className="text-xs text-white/90">{item.name}</span>
        {item.hint ? <span className="mt-1 text-[11px] text-white/45">{item.hint}</span> : null}
      </div>
    </div>
  );
}

function MoreToggle({ open, onClick, count }: { open: boolean; onClick: () => void; count: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs transition",
        "border-white/10 bg-white/[0.02] text-white/70 hover:text-white hover:border-white/14 hover:bg-white/[0.03]"
      )}
    >
      <span
        aria-hidden
        className="h-2 w-2 rounded-full"
        style={{
          background: open ? GREEN : "rgba(255,255,255,.35)",
          boxShadow: open ? "0 0 14px rgba(158,243,21,.28)" : "none",
        }}
      />
      {open ? "Hide" : `More (${count})`}
    </button>
  );
}

function SpotlightCard({
  watermark,
  eyebrow,
  title,
  desc,
  chips,
  bestFor,
  deliveryBullets,
  iconGlyph,
}: {
  watermark: string;
  eyebrow: string;
  title: string;
  desc: string;
  chips: LogoItem[];
  bestFor: string;
  deliveryBullets: string[];
  iconGlyph?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
      {/* XR depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(158,243,21,.18), transparent 60%)",
          filter: "blur(8px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(158,243,21,.10), transparent 62%)",
          filter: "blur(12px)",
        }}
      />

      {/* watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-3 select-none text-[64px] sm:text-[84px] font-semibold tracking-[-0.06em]"
        style={{
          color: "rgba(255,255,255,.04)",
          WebkitTextStroke: "1px rgba(255,255,255,.06)",
        }}
      >
        {watermark}
      </div>

      <div className="relative">
        <div className="text-xs tracking-[0.24em] uppercase text-white/55">{eyebrow}</div>
        <div className="mt-2 text-2xl sm:text-3xl font-semibold tracking-[-0.04em] text-white">{title}</div>
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/70">{desc}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((c) => (
            <LogoBadge key={c.name} item={c} />
          ))}
        </div>

        <div className="mt-4 text-xs text-white/55">
          Best for: <span className="text-white/70">{bestFor}</span>
        </div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-4 text-xs tracking-[0.22em] uppercase text-white/55">Typical delivery</div>
        <ul className="mt-2 grid gap-2">
          {deliveryBullets.map((b) => (
            <Bullet_Tools key={b}>{b}</Bullet_Tools>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-3">
          <span
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.03]"
            style={{ boxShadow: "0 0 18px rgba(158,243,21,.12)" }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              {iconGlyph ?? (
                <path
                  d="M6.8 11.2c.2-2.7 2.3-4.9 5-5.2l4.4-.5c3.2-.4 6.1 1.8 6.7 5l.6 3.3c.3 1.9-1.1 3.6-3 3.6H8.9c-2.1 0-3.8-1.7-3.8-3.8v-2.4Z"
                  stroke="rgba(255,255,255,.75)"
                  strokeWidth="1.6"
                />
              )}
              <path
                d="M9 18.2c.5 1.5 1.7 2.6 3.5 2.6h2.9c1.8 0 3-1.1 3.5-2.6"
                stroke="rgba(158,243,21,.55)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div className="text-xs text-white/55">
            This platform is treated as a{" "}
            <span className="text-white/70">first-class target</span> in our QA and performance budgets.
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedTriptych() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {/* Apple Vision Pro */}
      <SpotlightCard
        watermark="visionOS"
        eyebrow="Featured platform"
        title="Apple Vision Pro"
        desc="Spatial experiences for training, visualization, and high-trust demos — built with platform-native constraints in mind (comfort, performance, interaction clarity)."
        chips={[
          { name: "Apple", hint: "Hardware", src: simpleIcon("apple") },
          { name: "visionOS", hint: "Platform", kind: "inline", inline: <InlineMark label="visionOS" icon="chip" /> },
          { name: "RealityKit", hint: "Rendering", kind: "inline", inline: <InlineMark label="RealityKit" icon="cube" /> },
          { name: "ARKit", hint: "Spatial APIs", kind: "inline", inline: <InlineMark label="ARKit" icon="globe" /> },
          { name: "Swift", hint: "Language", src: simpleIcon("swift") },
        ]}
        bestFor="spatial training • product visualization • executive demos"
        deliveryBullets={[
          "Interaction design tuned for gaze + hands",
          "Performance budgets validated on-device",
          "Instrumentation for adoption and iteration",
        ]}
      />

      {/* Meta Quest */}
      <SpotlightCard
        watermark="QUEST"
        eyebrow="Featured platform"
        title="Meta Quest"
        desc="Headset-first XR delivery for training and simulation — optimized for comfort, framerate stability, and repeatable rollouts across teams."
        chips={[
          { name: "Meta Quest", hint: "VR/MR", kind: "inline", inline: <InlineMark label="Quest" icon="headset" /> },
          { name: "Meta XR SDK", hint: "Platform stack", kind: "inline", inline: <InlineMark label="Meta XR" icon="chip" /> },
          { name: "OpenXR", hint: "Standard", kind: "inline", inline: <InlineMark label="OpenXR" icon="globe" /> },
          { name: "Unity", hint: "Engine", src: simpleIcon("unity") },
          { name: "C#", hint: "Language", src: simpleIcon("csharp") },
        ]}
        bestFor="XR training • safety simulation • multi-user sessions"
        deliveryBullets={[
          "Comfort-first UX + locomotion decisions",
          "Stable frame-time budgets (72/90Hz targets as required)",
          "Telemetry for scenario completion + drop-offs",
        ]}
      />

      {/* PICO */}
      <SpotlightCard
        watermark="PICO"
        eyebrow="Featured platform"
        title="PICO"
        desc="Enterprise headset delivery with practical deployment realities — performance optimization, device behavior consistency, and operational constraints baked in."
        chips={[
          { name: "PICO", hint: "VR headsets", kind: "inline", inline: <InlineMark label="PICO" icon="headset" /> },
          { name: "PICO XR SDK", hint: "Platform stack", kind: "inline", inline: <InlineMark label="PICO XR" icon="chip" /> },
          { name: "OpenXR", hint: "Standard", kind: "inline", inline: <InlineMark label="OpenXR" icon="globe" /> },
          { name: "Unity", hint: "Engine", src: simpleIcon("unity") },
          { name: "C#", hint: "Language", src: simpleIcon("csharp") },
        ]}
        bestFor="enterprise training • controlled environments • repeatable rollouts"
        deliveryBullets={[
          "Performance + thermal budgets validated on-device",
          "Operational rollout posture (updates, versioning, staging)",
          "Instrumentation for adoption and iteration",
        ]}
      />
    </div>
  );
}

type Group = {
  title: string;
  purpose: string;
  primary: LogoItem[];
  more?: LogoItem[];
};

function GroupRow({
  group,
  open,
  onToggle,
}: {
  group: Group;
  open: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const moreCount = group.more?.length ?? 0;

  return (
    <div className="py-6 sm:py-7 border-t border-white/10">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr] lg:items-start">
        <div className="flex flex-col gap-2">
          <div className="text-lg sm:text-xl font-semibold tracking-[-0.02em] text-white">{group.title}</div>
          <p className="text-sm leading-relaxed text-white/70">{group.purpose}</p>
        </div>

        <div className="relative">
          <div className="flex flex-wrap gap-2">
            {group.primary.map((it) => (
              <LogoBadge key={it.name} item={it} />
            ))}
            {moreCount > 0 ? <MoreToggle open={open} onClick={onToggle} count={moreCount} /> : null}
          </div>

          <AnimatePresence initial={false}>
            {open && moreCount > 0 ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="text-xs tracking-[0.22em] uppercase text-white/55 px-1 pb-2">Additional tools</div>
                  <div className="flex flex-wrap gap-2">
                    {group.more!.map((it) => (
                      <LogoBadge key={it.name} item={it} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -top-8 h-28"
            style={{
              background: "radial-gradient(520px 160px at 28% 0%, rgba(158,243,21,.08), transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function XR_Tools_StackLedger_V2() {
  const reduceMotion = useReducedMotion() ?? false;

  const groups: Group[] = useMemo(
    () => [
      {
        title: "Hardware & devices (beyond headsets)",
        purpose: "We validate across supporting devices and environments — especially for mobile AR and admin workflows.",
        primary: [
          { name: "iPhone / iPad", hint: "Mobile AR", src: simpleIcon("apple") },
          { name: "Android", hint: "Mobile AR", src: simpleIcon("android") },
          { name: "Windows", hint: "Workstations", src: simpleIcon("windows") },
          { name: "Web", hint: "Browser delivery", kind: "inline", inline: <InlineMark label="Web" icon="globe" /> },
        ],
        more: [{ name: "Device rollout", hint: "project-specific", kind: "inline", inline: <InlineMark label="Rollout" icon="chip" /> }],
      },
      {
        title: "Platforms & standards",
        purpose: "We target platform layers and keep compatibility through standards and validated patterns.",
        primary: [
          { name: "OpenXR", hint: "Cross-device XR", kind: "inline", inline: <InlineMark label="OpenXR" icon="globe" /> },
          { name: "WebXR", hint: "Browser XR", kind: "inline", inline: <InlineMark label="WebXR" icon="globe" /> },
          { name: "ARKit", hint: "iOS / spatial APIs", kind: "inline", inline: <InlineMark label="ARKit" icon="globe" /> },
          { name: "ARCore", hint: "Android AR", kind: "inline", inline: <InlineMark label="ARCore" icon="globe" /> },
        ],
        more: [
          { name: "AR Foundation", hint: "Unity AR", kind: "inline", inline: <InlineMark label="ARF" icon="chip" /> },
          { name: "XR Interaction", hint: "patterns", kind: "inline", inline: <InlineMark label="XR UX" icon="chip" /> },
        ],
      },
      {
        title: "Programming languages",
        purpose: "Practical language set behind XR delivery — engines, native stacks, web, and tooling.",
        primary: [
          { name: "C#", hint: "Unity", src: simpleIcon("csharp") },
          { name: "Swift", hint: "visionOS/iOS", src: simpleIcon("swift") },
          { name: "TypeScript", hint: "WebXR", src: simpleIcon("typescript") },
          { name: "Kotlin", hint: "Android", src: simpleIcon("kotlin") },
        ],
        more: [
          { name: "C++", hint: "Unreal/native", src: simpleIcon("cplusplus") },
          { name: "JavaScript", hint: "WebXR", src: simpleIcon("javascript") },
          { name: "Python", hint: "tooling", src: simpleIcon("python") },
          { name: "Shaders", hint: "HLSL/GLSL", kind: "inline", inline: <InlineMark label="FX" icon="code" /> },
        ],
      },
      {
        title: "Engines & runtime",
        purpose: "We select engines by constraints and rollout needs — then enforce performance budgets for comfort.",
        primary: [
          { name: "Unity", hint: "XR builds", src: simpleIcon("unity") },
          { name: "Unreal Engine", hint: "High-fidelity", src: simpleIcon("unrealengine") },
          { name: "Three.js", hint: "WebXR", src: simpleIcon("threedotjs") },
          { name: "Babylon.js", hint: "WebXR", src: simpleIcon("babylondotjs") },
        ],
      },
      {
        title: "3D & content pipeline",
        purpose: "Asset creation, optimization, and versioning — tuned for fast load and stable tracking.",
        primary: [
          { name: "Blender", hint: "Modeling", src: simpleIcon("blender") },
          { name: "Autodesk Maya", hint: "Animation", src: simpleIcon("autodeskmaya") },
          { name: "Substance 3D", hint: "Materials", src: simpleIcon("adobesubstance3d") },
          { name: "Figma", hint: "UX flows", src: simpleIcon("figma") },
        ],
      },
      {
        title: "Performance & profiling",
        purpose: "Frame-time budgets, GPU/CPU hotspots, and device-level checks — before scale.",
        primary: [
          { name: "RenderDoc", hint: "GPU capture", src: simpleIcon("renderdoc") },
          { name: "Xcode", hint: "Instruments", src: simpleIcon("xcode") },
          { name: "Android Studio", hint: "Profilers", src: simpleIcon("androidstudio") },
          { name: "Unity Profiler", hint: "Frame-time", kind: "inline", inline: <InlineMark label="Profiler" icon="chip" /> },
        ],
      },
      {
        title: "Collaboration, delivery & telemetry",
        purpose: "Repeatable builds, clear handoffs, and instrumentation so you can iterate based on real usage.",
        primary: [
          { name: "GitHub", hint: "Repo + CI", src: simpleIcon("github") },
          { name: "GitLab", hint: "Repo + CI", src: simpleIcon("gitlab") },
          { name: "Jira", hint: "Tracking", src: simpleIcon("jira") },
          { name: "Firebase", hint: "Events", src: simpleIcon("firebase") },
        ],
        more: [
          { name: "Amplitude", hint: "Analytics", src: simpleIcon("amplitude") },
          { name: "Sentry", hint: "Crashes", src: simpleIcon("sentry") },
          { name: "Notion", hint: "Docs", src: simpleIcon("notion") },
          { name: "Slack", hint: "Comms", src: simpleIcon("slack") },
          { name: "Custom events", hint: "schema-led", kind: "inline", inline: <InlineMark label="Events" icon="code" /> },
        ],
      },
    ],
    []
  );

  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section id="xr-tools-v2" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Tools />

        <div className="relative">
          {/* subtle watermark behind the whole section */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-8 right-0 select-none text-[88px] sm:text-[120px] font-semibold tracking-[-0.07em]"
            style={{
              color: "rgba(255,255,255,.03)",
              WebkitTextStroke: "1px rgba(255,255,255,.05)",
            }}
          >
            XR STACK
          </div>

          {/* FEATURED: three primary targets */}
          <FeaturedTriptych />

          {/* Ledger body */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(158,243,21,.10), transparent 62%)",
                filter: "blur(12px)",
              }}
            />
            <div className="relative p-6 sm:p-7">
              {groups.map((g) => {
                const key = g.title;
                const open = openKey === key;
                return (
                  <GroupRow key={key} group={g} open={open} onToggle={() => setOpenKey(open ? null : key)} />
                );
              })}
            </div>
          </div>

          {/* Guarantees strip (single, non-redundant) */}
          <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.35)" }}
                />
                Frame-time budgets enforced
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-2 w-2 rounded-full bg-white/35" />
                Device QA checklist
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-2 w-2 rounded-full bg-white/35" />
                Telemetry events included
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-2 w-2 rounded-full bg-white/35" />
                Repeatable build pipeline
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   SECTION 6 — INTEGRATION CAPABILITY (xr-integration)
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
          subtitle="Most XR fails at the “enterprise layer.” We design integrations from day one."
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
