"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* =======================================================================================
   WODH — CREATIVE TECH SERVICES
   Variant A — Neon Lab Console (Systems-first)
   Accent: Electric Cyan / Aqua
   - Hero = Command Console (headline + live dashboard cards)
   - Capability Matrix is the star (clean grid, hover highlight)
   - Tech Plays = “modules / packages” with spec chips
   - Proof = Ship Log (project entries with outcomes + stack chips)
   - CTA = Terminal prompt intake bar

   Section IDs (kept from your structure):
   1)  creative-hero
   2)  creative-what-we-build
   3)  creative-capability-matrix
   4)  creative-tech-plays
   5)  creative-pipeline
   6)  creative-proof
   7)  creative-integrations
   8)  creative-engagement
   9)  creative-faq
   10) creative-cta
======================================================================================= */

type Stage = "Prototype" | "Production" | "Deploy" | "Operate";
type Severity = "info" | "ok" | "warn";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ACCENT = "rgba(67,232,255,1)"; // electric cyan
const ACCENT_SOFT = "rgba(67,232,255,.14)";
const GREEN = "rgba(158,243,21,1)"; // Wodh XR green (kept subtle as system signal)
const PURPLE = "rgba(91,45,220,1)";

const STAGES: Stage[] = ["Prototype", "Production", "Deploy", "Operate"];

const WHAT_WE_BUILD = [
  {
    title: "Interactive brand experiences",
    outcome: "Higher engagement, clear measurement",
    uses: ["Campaign launches", "Product reveals", "Story microsites"],
    stack: ["WebGL", "Telemetry", "CMS pipeline"],
  },
  {
    title: "Real-time 3D microsites",
    outcome: "Explain complex products fast",
    uses: ["Configurators", "Explainers", "Visualizers"],
    stack: ["Three.js", "Perf budgets", "Device QA"],
  },
  {
    title: "Event + installation systems",
    outcome: "Reliable, unattended runtime",
    uses: ["Kiosks", "LED walls", "Show control"],
    stack: ["Offline packs", "Runbooks", "Remote updates"],
  },
  {
    title: "AR filters / lightweight AR",
    outcome: "Fast-to-launch with fallbacks",
    uses: ["QR entry", "Social share hooks", "Activation booths"],
    stack: ["Camera UX", "Fallbacks", "Metrics"],
  },
  {
    title: "Generative visuals engines",
    outcome: "Brand-safe scale + consistency",
    uses: ["Template systems", "Batch exports", "Guardrails"],
    stack: ["Tokens", "Approvals", "Audit trail"],
  },
  {
    title: "Tooling + content pipelines",
    outcome: "Sustainable updates post-launch",
    uses: ["Schema validation", "Preview/staging", "Rollback"],
    stack: ["Validation", "Automation", "Docs"],
  },
] as const;

const CAPABILITY_ROWS: Array<{
  key: string;
  title: string;
  desc: string;
  levels: Record<Stage, 0 | 1 | 2 | 3>;
  signals: string[];
}> = [
  {
    key: "realtime-render",
    title: "Real-time rendering",
    desc: "Performance-first visuals under constraints.",
    levels: { Prototype: 3, Production: 3, Deploy: 2, Operate: 2 },
    signals: ["Stable FPS targets", "Predictable load times", "Low input latency"],
  },
  {
    key: "interaction",
    title: "Interaction design",
    desc: "Inputs → feedback → outcomes (error-safe).",
    levels: { Prototype: 3, Production: 2, Deploy: 2, Operate: 1 },
    signals: ["Fast comprehension", "Reduced drop-off", "Clear recovery states"],
  },
  {
    key: "device-input",
    title: "Device + sensor input",
    desc: "Camera/IMU/depth/QR — with fallbacks.",
    levels: { Prototype: 2, Production: 2, Deploy: 3, Operate: 2 },
    signals: ["Stable tracking", "Graceful fallback UX", "Low failure rate"],
  },
  {
    key: "delivery",
    title: "Web + mobile delivery",
    desc: "Speed, stability, maintainability.",
    levels: { Prototype: 3, Production: 3, Deploy: 3, Operate: 3 },
    signals: ["Consistent LCP", "Low crash rate", "Incremental updates"],
  },
  {
    key: "kiosk",
    title: "Kiosk / show-control",
    desc: "Offline-first with runbooks and recovery.",
    levels: { Prototype: 1, Production: 2, Deploy: 3, Operate: 3 },
    signals: ["Auto-recovery", "Operator confidence", "Unattended stability"],
  },
  {
    key: "telemetry",
    title: "Telemetry + analytics",
    desc: "Measure, prove, iterate.",
    levels: { Prototype: 1, Production: 2, Deploy: 2, Operate: 3 },
    signals: ["Readable funnels", "Actionable insights", "Privacy-aware events"],
  },
  {
    key: "pipelines",
    title: "Tooling + pipelines",
    desc: "Repeatable workflows that scale.",
    levels: { Prototype: 1, Production: 2, Deploy: 2, Operate: 3 },
    signals: ["Fewer regressions", "Faster updates", "Lower ops cost"],
  },
];

const MODULES: Array<{
  id: string;
  name: string;
  subtitle: string;
  builtFor: string;
  specs: Array<{ k: string; v: string }>;
  inputs: string[];
  targets: string[];
  delivery: string[];
}> = [
  {
    id: "pkg-microsite-engine",
    name: "Interactive Microsite Engine",
    subtitle: "WebGL storytelling + content pipeline + telemetry.",
    builtFor: "Launches that need measurable engagement.",
    specs: [
      { k: "Runtime", v: "WebGL" },
      { k: "Perf", v: "Budgeted" },
      { k: "Telemetry", v: "Events schema" },
      { k: "Fallback", v: "SEO-safe" },
    ],
    inputs: ["Touch", "APIs"],
    targets: ["Web"],
    delivery: ["CI/CD", "Release checklist", "Analytics hooks"],
  },
  {
    id: "pkg-realtime-visualizer",
    name: "Realtime 3D Visualizer",
    subtitle: "Rules + data → instant 3D state changes.",
    builtFor: "Explainers, configurators, sales demos.",
    specs: [
      { k: "Runtime", v: "WebGL / Native" },
      { k: "State", v: "Rules engine" },
      { k: "Export", v: "Snapshots" },
      { k: "QA", v: "Device matrix" },
    ],
    inputs: ["Touch", "APIs"],
    targets: ["Web", "iOS", "Android", "Kiosk"],
    delivery: ["Perf tuning", "Test plan", "Monitoring hooks"],
  },
  {
    id: "pkg-installation-loop",
    name: "Installation Loop System",
    subtitle: "Offline-first kiosk + remote updates + runbooks.",
    builtFor: "Exhibitions, venues, unattended runtime.",
    specs: [
      { k: "Offline", v: "Content packs" },
      { k: "Update", v: "Rollback" },
      { k: "Mode", v: "Kiosk" },
      { k: "Ops", v: "Runbook" },
    ],
    inputs: ["Touch", "Camera", "APIs"],
    targets: ["Kiosk", "LED Wall"],
    delivery: ["Operator guide", "Auto-recovery", "Remote sync"],
  },
  {
    id: "pkg-ar-kit",
    name: "AR Campaign Kit",
    subtitle: "AR + landing + metrics + fallbacks.",
    builtFor: "Fast activations with clear tracking.",
    specs: [
      { k: "Entry", v: "QR" },
      { k: "Camera", v: "Permission UX" },
      { k: "Metrics", v: "Tracking events" },
      { k: "Fallback", v: "Non-AR path" },
    ],
    inputs: ["Camera", "QR/NFC"],
    targets: ["Web", "iOS", "Android"],
    delivery: ["Launch checklist", "Dashboards", "Share hooks"],
  },
];

const SHIP_LOG: Array<{
  date: string;
  title: string;
  outcome: string;
  severity: Severity;
  stack: string[];
}> = [
  {
    date: "Log • Week 01",
    title: "Kiosk installation runtime (offline-first)",
    outcome: "Unattended stability + remote update + rollback",
    severity: "ok",
    stack: ["Kiosk mode", "Offline packs", "Runbooks", "Monitoring"],
  },
  {
    date: "Log • Week 02",
    title: "Realtime 3D product visualizer",
    outcome: "Config states + export snapshots + device QA matrix",
    severity: "info",
    stack: ["WebGL", "Rules engine", "Perf budgets", "Telemetry"],
  },
  {
    date: "Log • Week 03",
    title: "Campaign microsite engine",
    outcome: "SEO-safe fallback + analytics events + A/B-ready content",
    severity: "ok",
    stack: ["Three.js", "CMS schema", "Events", "CI/CD"],
  },
  {
    date: "Log • Week 04",
    title: "Sensor-driven stage controller",
    outcome: "Low-latency IO mapping + fail-safe modes",
    severity: "warn",
    stack: ["Inputs", "OSC/DMX", "Realtime loop", "Recovery UX"],
  },
];

const PIPELINE: Array<{ step: string; title: string; desc: string; outputs: string[] }> = [
  { step: "01", title: "Discover & constraints", desc: "Define targets, inputs, success metrics.", outputs: ["System map", "Device matrix", "Risk list"] },
  { step: "02", title: "Prototype sprint", desc: "Validate IO + feel with a real interactive slice.", outputs: ["Working slice", "Perf budget", "Next-step plan"] },
  { step: "03", title: "Production build", desc: "Harden: QA, fallbacks, stability, polish.", outputs: ["QA matrix", "Edge cases", "Release candidate"] },
  { step: "04", title: "Deploy & operate", desc: "Ship with runbooks + monitoring + updates.", outputs: ["Deploy plan", "Runbook", "Telemetry hooks"] },
];

const FAQS = [
  { q: "Can you build a prototype first?", a: "Yes — we recommend a prototype sprint to validate IO, deployment constraints, and “feel” before full production." },
  { q: "Do you handle kiosk / event deployments?", a: "Yes — we provide kiosk mode, offline packs, operator runbooks, auto-recovery flows, and coordination support." },
  { q: "Can it run offline?", a: "Yes — for installations we design offline-first behavior, cached content, and safe update/rollback paths." },
  { q: "Who owns the source + assets?", a: "You do. We deliver source, assets, and handover documentation per the engagement model." },
] as const;

/* =======================================================================================
   Page
======================================================================================= */

export default function CreativeTechServices_VariantA_NeonLabConsole() {
  const reduceMotion = useReducedMotion();
  const [activeRow, setActiveRow] = useState(CAPABILITY_ROWS[0].key);
  const active = useMemo(() => CAPABILITY_ROWS.find((r) => r.key === activeRow)!, [activeRow]);

  return (
    <main className="relative min-h-screen bg-[#07051A] text-white">
      <BackgroundLab />

      {/* top hairline */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-white/10" />

      {/* ===================================================================================
          SECTION 1 — Hero (ID: creative-hero)
      =================================================================================== */}
      <section id="creative-hero" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-14 sm:pt-16 pb-12 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left: editorial */}
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="neutral">Creative Tech</Chip>
              <Chip tone="cyan">Neon Lab Console</Chip>
              <Chip tone="soft">Systems-first</Chip>
            </div>

            <h1 className="mt-5 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.02]">
              Creative technology that{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(67,232,255,1), rgba(179,247,255,.95), rgba(255,255,255,.86))",
                }}
              >
                ships complex systems
              </span>
              .
            </h1>

            <p className="mt-4 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
              Enterprise-grade interactive builds: defined targets, clear constraints, operational runbooks, and telemetry-ready delivery.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Chip tone="cyan">Deployment-ready</Chip>
              <Chip tone="soft">Device matrix</Chip>
              <Chip tone="green">Offline-first (when needed)</Chip>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="#creative-capability-matrix" variant="primary">
                View capability matrix
              </Button>
              <Button href="#creative-tech-plays" variant="secondary">
                Browse modules
              </Button>
              <Button href="#creative-cta" variant="ghost">
                Start a project →
              </Button>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-[11px] text-white/55">Console note</div>
              <div className="mt-2 text-sm text-white/70">
                We don’t sell “cool tech”. We ship <span className="text-white/85 font-medium">reliable systems</span>.
              </div>
            </div>
          </div>

          {/* Right: Command Console Dashboard */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(860px_420px_at_70%_15%,rgba(67,232,255,.16),transparent_60%),radial-gradient(520px_320px_at_15%_90%,rgba(91,45,220,.10),transparent_60%)]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-white/25" />
                    <span className="text-xs font-medium text-white/75">Command Console</span>
                  </div>
                  <span className="text-[11px] text-white/45">status: ready</span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <DashboardCard
                    className="sm:col-span-6"
                    label="Latency budget"
                    value="Low input-to-feedback"
                    meta="measured per target"
                    accent="cyan"
                  />
                  <DashboardCard
                    className="sm:col-span-6"
                    label="Devices supported"
                    value="Web • Mobile • Kiosk"
                    meta="matrix defined early"
                    accent="neutral"
                  />
                  <DashboardCard
                    className="sm:col-span-6"
                    label="Offline-ready"
                    value="Installations mode"
                    meta="packs + recovery"
                    accent="green"
                  />
                  <DashboardCard
                    className="sm:col-span-6"
                    label="Deployment modes"
                    value="Web • App • Show-control"
                    meta="runbooks included"
                    accent="cyan"
                  />
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-[#06041A] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-medium text-white/75">Live system signals</div>
                    <span className="text-[11px] text-white/45">console view</span>
                  </div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <SignalPill label="Perf budget" value="defined" tone="cyan" />
                    <SignalPill label="Fallback UX" value="included" tone="neutral" />
                    <SignalPill label="Telemetry" value="ready" tone="cyan" />
                  </div>

                  {!reduceMotion ? (
                    <motion.div
                      className="mt-4 h-10 rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                      initial={false}
                      animate={{ backgroundPositionX: ["0%", "100%"] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(67,232,255,.16) 35%, rgba(255,255,255,0) 70%)",
                        backgroundSize: "240% 100%",
                      }}
                    />
                  ) : (
                    <div className="mt-4 h-10 rounded-xl border border-white/10 bg-white/5" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-[#06041A] p-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/60">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                  enterprise: <span className="text-white/80">deliverables + runbooks</span>
                </span>
                <span className="text-white/35">•</span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
                  ops: <span className="text-white/80">offline + recovery</span>
                </span>
                <span className="text-white/35">•</span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                  proof: <span className="text-white/80">telemetry-ready</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-white/10" />
      </section>

      {/* ===================================================================================
          SECTION 2 — What We Build (ID: creative-what-we-build)
      =================================================================================== */}
      <SectionShell
        id="creative-what-we-build"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">What we build</Chip>
            <Chip tone="cyan">Outcomes-first</Chip>
          </div>
        }
        title={
          <>
            Built for <span className="text-white/85">deployment</span>, not demos.
          </>
        }
        lead="Short outcomes, common use-cases, and the typical stack signals buyers care about."
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHAT_WE_BUILD.map((t) => (
              <div key={t.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(720px_300px_at_30%_15%,rgba(67,232,255,.12),transparent_60%)] opacity-45" />
                <div className="relative">
                  <div className="text-lg font-semibold tracking-[-0.03em]">{t.title}</div>
                  <div className="mt-2 text-sm text-white/70">
                    <span className="text-white/85 font-medium">Outcome:</span> {t.outcome}
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    {t.uses.slice(0, 3).map((u) => (
                      <MiniLine key={u} dot="cyan" text={u} />
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.stack.map((s) => (
                      <SpecChip key={s} tone="neutral">
                        {s}
                      </SpecChip>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-[#06041A] p-5 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(520px_340px_at_70%_20%,rgba(67,232,255,.16),transparent_60%)] opacity-55" />
              <div className="relative">
                <div className="text-xs font-medium text-white/75">Buyer-ready deliverables</div>
                <div className="mt-3 space-y-3">
                  <KeyValue label="Device matrix" value="targets + QA plan" />
                  <KeyValue label="Runbooks" value="operate + recovery" />
                  <KeyValue label="Telemetry" value="events + dashboards" />
                  <KeyValue label="Fallback UX" value="safe degradation" />
                </div>
                <div className="mt-5 h-px w-full bg-white/10" />
                <div className="mt-4 text-xs text-white/60 leading-relaxed">
                  Procurement-friendly format: clear scope, clear outputs, clear operational plan.
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip tone="cyan">scope clarity</Chip>
                  <Chip tone="soft">risk reduction</Chip>
                  <Chip tone="green">ops readiness</Chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ===================================================================================
          SECTION 3 — Capability Matrix (ID: creative-capability-matrix)
      =================================================================================== */}
      <SectionShell
        id="creative-capability-matrix"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">Signature</Chip>
            <Chip tone="cyan">Capability matrix</Chip>
          </div>
        }
        title={
          <>
            The grid that says: <span className="text-white/85">we can deliver</span>.
          </>
        }
        lead="Hover a capability to highlight stages. Prototype → Production → Deploy → Operate."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Matrix */}
          <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="grid grid-cols-12 gap-0 border-b border-white/10 bg-[#06041A]">
              <div className="col-span-5 p-4">
                <div className="text-xs font-medium text-white/70">Capability</div>
                <div className="mt-1 text-[11px] text-white/45">hover to highlight</div>
              </div>
              <div className="col-span-7 p-4">
                <div className="grid grid-cols-4 gap-3">
                  {STAGES.map((s) => (
                    <div key={s} className="text-xs font-medium text-white/80">
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {CAPABILITY_ROWS.map((row) => {
                const is = row.key === activeRow;
                return (
                  <button
                    key={row.key}
                    type="button"
                    onMouseEnter={() => setActiveRow(row.key)}
                    onFocus={() => setActiveRow(row.key)}
                    className={cx(
                      "w-full text-left grid grid-cols-12 gap-0 outline-none transition",
                      is ? "bg-[rgba(67,232,255,.06)]" : "hover:bg-white/[0.04]"
                    )}
                  >
                    <div className="col-span-5 p-4">
                      <div className="text-sm font-semibold tracking-[-0.02em]">{row.title}</div>
                      <div className="mt-1 text-[11px] text-white/60">{row.desc}</div>
                    </div>
                    <div className="col-span-7 p-4">
                      <div className="grid grid-cols-4 gap-3">
                        {STAGES.map((s) => (
                          <StageBars key={s} level={row.levels[s]} active={is} />
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Signals panel */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#06041A] p-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(520px_340px_at_60%_20%,rgba(67,232,255,.18),transparent_60%)] opacity-55" />
            <div className="relative">
              <div className="text-xs font-medium text-white/75">Signals</div>
              <div className="mt-3 text-lg font-semibold tracking-[-0.03em]">{active.title}</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">{active.desc}</div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-medium text-white/75">What we look for</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.signals.map((s) => (
                    <SpecChip key={s} tone="cyan">
                      {s}
                    </SpecChip>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Chip tone="cyan">prototype-first</Chip>
                <Chip tone="soft">production discipline</Chip>
                <Chip tone="green">operate-ready</Chip>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ===================================================================================
          SECTION 4 — Tech Plays (ID: creative-tech-plays)
      =================================================================================== */}
      <SectionShell
        id="creative-tech-plays"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">Tech plays</Chip>
            <Chip tone="cyan">Modules / packages</Chip>
          </div>
        }
        title={
          <>
            Modules that feel like <span className="text-white/85">packages</span>.
          </>
        }
        lead="Spec chips show runtime, targets, inputs, and delivery artifacts — simple and procurement-friendly."
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MODULES.map((m) => (
              <div key={m.id} className="relative rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(760px_320px_at_30%_15%,rgba(67,232,255,.12),transparent_60%)] opacity-45" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-white/55">{m.id}</div>
                      <div className="mt-1 text-lg font-semibold tracking-[-0.03em]">{m.name}</div>
                      <div className="mt-1 text-sm text-white/70">{m.subtitle}</div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-[#06041A] px-3 py-1 text-[11px] text-white/65">
                      module
                    </span>
                  </div>

                  <div className="mt-3 text-sm text-white/70">
                    <span className="text-white/85 font-medium">Built for:</span> {m.builtFor}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {m.specs.map((s) => (
                      <div key={s.k} className="rounded-xl border border-white/10 bg-[#06041A] px-3 py-2">
                        <div className="text-[10px] text-white/45">{s.k}</div>
                        <div className="mt-1 text-xs font-medium text-white/80">{s.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <div className="text-[11px] text-white/55">Targets</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.targets.map((t) => (
                        <SpecChip key={t} tone="neutral">
                          {t}
                        </SpecChip>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-2">
                    <MiniLine dot="cyan" text={`Inputs: ${m.inputs.join(" • ")}`} />
                    <MiniLine dot="green" text={`Delivery: ${m.delivery.join(" • ")}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-[#06041A] p-5 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(520px_340px_at_60%_20%,rgba(67,232,255,.16),transparent_60%)] opacity-55" />
              <div className="relative">
                <div className="text-xs font-medium text-white/75">How modules combine</div>
                <div className="mt-3 text-sm text-white/70 leading-relaxed">
                  We compose modules into a single system. The “glue” is the pipeline: constraints, QA matrix, runbooks, and telemetry.
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-medium text-white/75">Common bundles</div>
                  <div className="mt-3 space-y-2">
                    <BundleLine title="Microsite + Telemetry" desc="Launch + measure + iterate" />
                    <BundleLine title="Visualizer + Kiosk" desc="Demo + event runtime" />
                    <BundleLine title="AR + Landing" desc="Activation + tracking" />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button href="#creative-pipeline" variant="secondary">
                    See pipeline
                  </Button>
                  <Button href="#creative-cta" variant="primary">
                    Start intake
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-medium text-white/75">Procurement signal</div>
              <div className="mt-2 text-[11px] text-white/55">
                Modules = clearer SOW. Each has runtime, targets, inputs, and delivery artifacts.
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ===================================================================================
          SECTION 5 — Shared Pipeline (ID: creative-pipeline)
      =================================================================================== */}
      <SectionShell
        id="creative-pipeline"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">Pipeline</Chip>
            <Chip tone="cyan">Connected track</Chip>
          </div>
        }
        title={
          <>
            A simple track for <span className="text-white/85">complex delivery</span>.
          </>
        }
        lead="Same rhythm as your other pages — but simplified and console-clean."
      >
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(860px_420px_at_60%_15%,rgba(67,232,255,.14),transparent_60%)]" />
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#06041A] p-5">
                <div className="text-xs font-medium text-white/75">Typical timelines</div>
                <div className="mt-3 space-y-3">
                  <KeyValue label="Prototype sprint" value="2–4 weeks" />
                  <KeyValue label="Production build" value="6–12 weeks" />
                  <KeyValue label="Operate / updates" value="monthly cadence" />
                </div>
                <div className="mt-5 h-px w-full bg-white/10" />
                <div className="mt-4 text-xs text-white/60 leading-relaxed">
                  Deliverables always include: device matrix, runbook, and telemetry plan (when applicable).
                </div>
              </div>

              <div className="lg:col-span-8 relative pl-6">
                <div className="absolute left-2 top-2 bottom-2 w-px bg-white/10" />
                <div className="space-y-4">
                  {PIPELINE.map((p) => (
                    <div key={p.step} className="relative">
                      <div className="absolute left-[-2px] top-6 h-4 w-4 rounded-full border border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)]" />
                      <div className="rounded-2xl border border-white/10 bg-[#06041A] p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="text-[11px] text-white/55">step {p.step}</div>
                            <div className="mt-1 text-lg font-semibold tracking-[-0.03em]">{p.title}</div>
                            <div className="mt-2 text-sm text-white/70 leading-relaxed">{p.desc}</div>
                          </div>
                          <span className="mt-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/65">
                            outputs
                          </span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.outputs.map((o) => (
                            <SpecChip key={o} tone="neutral">
                              {o}
                            </SpecChip>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip tone="cyan">device QA</Chip>
                  <Chip tone="soft">fallback UX</Chip>
                  <Chip tone="green">runbooks</Chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ===================================================================================
          SECTION 6 — Proof (ID: creative-proof) — Ship Log
      =================================================================================== */}
      <SectionShell
        id="creative-proof"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">Proof</Chip>
            <Chip tone="cyan">Ship log</Chip>
          </div>
        }
        title={
          <>
            Proof that reads like an <span className="text-white/85">engineering log</span>.
          </>
        }
        lead="Project entries: outcomes + stack signals. Simple. Trust-building."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="border-b border-white/10 bg-[#06041A] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs font-medium text-white/75">Ship Log</div>
                <span className="text-[11px] text-white/45">format: outcome + stack</span>
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {SHIP_LOG.map((e, idx) => (
                <div key={idx} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-white/55">{e.date}</div>
                      <div className="mt-1 text-lg font-semibold tracking-[-0.03em]">{e.title}</div>
                      <div className="mt-2 text-sm text-white/70">
                        <span className="text-white/85 font-medium">Outcome:</span> {e.outcome}
                      </div>
                    </div>
                    <Badge severity={e.severity} />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <SpecChip key={s} tone="neutral">
                        {s}
                      </SpecChip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-[#06041A] p-5 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(520px_340px_at_60%_20%,rgba(67,232,255,.16),transparent_60%)] opacity-55" />
              <div className="relative">
                <div className="text-xs font-medium text-white/75">What buyers want to hear</div>
                <div className="mt-3 space-y-3">
                  <KeyValue label="Reliability" value="runbooks + recovery" />
                  <KeyValue label="Measurement" value="telemetry + dashboards" />
                  <KeyValue label="Risk control" value="constraints + QA matrix" />
                  <KeyValue label="Ownership" value="handover + source" />
                </div>
                <div className="mt-5 h-px w-full bg-white/10" />
                <div className="mt-4 text-sm text-white/70 leading-relaxed">
                  We present work like systems: what runs where, what happens when it fails, and how you measure success.
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ===================================================================================
          SECTION 7 — Integrations & Delivery (ID: creative-integrations)
      =================================================================================== */}
      <SectionShell
        id="creative-integrations"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">Integrations</Chip>
            <Chip tone="cyan">Targets + inputs</Chip>
          </div>
        }
        title={
          <>
            Deployment clarity: <span className="text-white/85">targets</span>, inputs, analytics.
          </>
        }
        lead="Creative Tech lives or dies by real-world constraints. This section exists to reduce risk."
      >
        <div className="grid grid-cols-1 gap-4">
          <Band
            title="Device targets"
            desc="Define where it runs — then test it like that."
            chips={["Web", "iOS", "Android", "Kiosk", "LED Wall", "XR Devices"]}
            dot="cyan"
          />
          <Band
            title="Inputs"
            desc="Reality → system. Always with fallbacks."
            chips={["Camera", "IMU", "Depth", "QR/NFC", "Touch", "APIs", "DMX/OSC", "Microphone"]}
            dot="green"
          />
          <Band
            title="Measurement"
            desc="Proof loops for stakeholders."
            chips={["Telemetry events", "Funnels", "Logs", "Dashboards", "A/B hooks"]}
            dot="cyan"
          />
          <Band
            title="Ops & updates"
            desc="The thing procurement asks about."
            chips={["Offline packs", "Remote sync", "Runbooks", "Monitoring", "Rollback"]}
            dot="neutral"
          />
        </div>
      </SectionShell>

      {/* ===================================================================================
          SECTION 8 — Engagement Models (ID: creative-engagement)
      =================================================================================== */}
      <SectionShell
        id="creative-engagement"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">Engagement</Chip>
            <Chip tone="cyan">3 models</Chip>
          </div>
        }
        title={
          <>
            Choose a model. Still get the <span className="text-white/85">system</span>.
          </>
        }
        lead="Keep it simple and procurement-friendly."
      >
        <EngagementStrip />
      </SectionShell>

      {/* ===================================================================================
          SECTION 9 — FAQ (ID: creative-faq)
      =================================================================================== */}
      <SectionShell
        id="creative-faq"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">FAQ</Chip>
            <Chip tone="cyan">Short answers</Chip>
          </div>
        }
        title={
          <>
            Practical answers for <span className="text-white/85">buyers</span>.
          </>
        }
        lead="Direct, deployment-aware, no fluff."
      >
        <FAQAccordion />
      </SectionShell>

      {/* ===================================================================================
          SECTION 10 — CTA (ID: creative-cta) — Terminal prompt
      =================================================================================== */}
      <section id="creative-cta" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-14 sm:pt-16 pb-20">
        <TerminalCTA />
        <div className="mt-10 h-px w-full bg-white/10" />
        <div className="mt-6 text-xs text-white/45">
          © {new Date().getFullYear()} Wodh. Creative Tech — Neon Lab Console.
        </div>
      </section>
    </main>
  );
}

/* =======================================================================================
   Background
======================================================================================= */

function BackgroundLab() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* glow layers */}
      <div className="absolute inset-0 bg-[radial-gradient(1000px_720px_at_12%_10%,rgba(67,232,255,.14),transparent_60%),radial-gradient(900px_680px_at_88%_18%,rgba(67,232,255,.10),transparent_55%),radial-gradient(900px_700px_at_50%_95%,rgba(91,45,220,.10),transparent_55%)]" />

      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.10] mix-blend-soft-light [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_900px_at_50%_35%,transparent_38%,rgba(7,5,26,.72)_80%,rgba(7,5,26,.92))]" />

      {/* animated schematic sweep */}
      {!reduceMotion ? (
        <motion.div
          className="absolute -inset-40 opacity-[0.20]"
          animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="h-full w-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <linearGradient id="labLine" x1="0" y1="0" x2="1200" y2="800">
                <stop stopColor="rgba(67,232,255,.42)" />
                <stop offset="1" stopColor="rgba(67,232,255,0)" />
              </linearGradient>
              <linearGradient id="labLine2" x1="1200" y1="0" x2="0" y2="800">
                <stop stopColor="rgba(91,45,220,.22)" />
                <stop offset="1" stopColor="rgba(91,45,220,0)" />
              </linearGradient>
            </defs>
            {[120, 200, 290, 380, 500, 610, 700].map((y, i) => (
              <path
                key={i}
                d={`M-80 ${y} C 220 ${y - 40}, 560 ${y + 30}, 1280 ${y - 10}`}
                stroke="url(#labLine)"
                strokeWidth="1"
                opacity="0.42"
              />
            ))}
            {[150, 330, 540, 740].map((y, i) => (
              <path
                key={`p${i}`}
                d={`M-60 ${y} C 280 ${y + 60}, 680 ${y - 30}, 1260 ${y + 30}`}
                stroke="url(#labLine2)"
                strokeWidth="1"
                opacity="0.42"
              />
            ))}
          </svg>
        </motion.div>
      ) : null}
    </div>
  );
}

/* =======================================================================================
   Primitives
======================================================================================= */

function SectionShell({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
      <div className="mb-8 sm:mb-10">
        {eyebrow ? <div className="mb-3">{eyebrow}</div> : null}
        <h2 className="text-balance text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em] text-white">
          {title}
        </h2>
        {lead ? (
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed">
            {lead}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Chip({
  children,
  tone = "soft",
}: {
  children: React.ReactNode;
  tone?: "soft" | "cyan" | "green" | "neutral";
}) {
  const base = "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs leading-none";
  const cls =
    tone === "cyan"
      ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.08)] text-[rgba(179,247,255,.95)]"
      : tone === "green"
      ? "border-[rgba(158,243,21,.35)] bg-[rgba(158,243,21,.08)] text-[rgba(222,255,168,.95)]"
      : tone === "neutral"
      ? "border-white/12 bg-white/6 text-white/75"
      : "border-white/10 bg-white/5 text-white/80";

  return (
    <span className={cx(base, cls)}>
      <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
      {children}
    </span>
  );
}

function Button({
  children,
  variant = "primary",
  href,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition will-change-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#07051A]";
  const styles =
    variant === "primary"
      ? "bg-[rgba(67,232,255,.14)] text-white border border-[rgba(67,232,255,.35)] hover:bg-[rgba(67,232,255,.18)] hover:-translate-y-[1px] focus:ring-[rgba(67,232,255,.55)]"
      : variant === "secondary"
      ? "bg-white/6 text-white border border-white/12 hover:bg-white/9 hover:-translate-y-[1px] focus:ring-white/30"
      : "bg-transparent text-white/80 border border-transparent hover:text-white hover:bg-white/5 focus:ring-white/20";

  const Comp: any = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={cx(base, styles)}
      {...(href ? { rel: "noreferrer" } : {})}
      type={href ? undefined : "button"}
    >
      {children}
    </Comp>
  );
}

function SpecChip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "cyan" | "green";
}) {
  const cls =
    tone === "cyan"
      ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-white"
      : tone === "green"
      ? "border-[rgba(158,243,21,.35)] bg-[rgba(158,243,21,.10)] text-white"
      : "border-white/10 bg-[#06041A] text-white/70";
  return <span className={cx("rounded-full border px-3 py-1 text-[11px]", cls)}>{children}</span>;
}

/* =======================================================================================
   Hero console cards
======================================================================================= */

function DashboardCard({
  label,
  value,
  meta,
  accent = "cyan",
  className,
}: {
  label: string;
  value: string;
  meta: string;
  accent?: "cyan" | "green" | "neutral";
  className?: string;
}) {
  const dot =
    accent === "green" ? GREEN : accent === "neutral" ? "rgba(255,255,255,.45)" : ACCENT;

  return (
    <div className={cx("relative rounded-2xl border border-white/10 bg-[#06041A] p-4 overflow-hidden", className)}>
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            accent === "green"
              ? "radial-gradient(520px 260px at 30% 15%, rgba(158,243,21,.12), transparent 60%)"
              : accent === "neutral"
              ? "radial-gradient(520px 260px at 30% 15%, rgba(255,255,255,.08), transparent 60%)"
              : "radial-gradient(520px 260px at 30% 15%, rgba(67,232,255,.14), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <div className="text-[11px] text-white/55">{label}</div>
          <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
        </div>
        <div className="mt-2 text-sm font-semibold text-white/90">{value}</div>
        <div className="mt-1 text-[11px] text-white/45">{meta}</div>
      </div>
    </div>
  );
}

function SignalPill({ label, value, tone }: { label: string; value: string; tone: "cyan" | "neutral" | "green" }) {
  const cls =
    tone === "cyan"
      ? "border-[rgba(67,232,255,.25)] bg-[rgba(67,232,255,.08)]"
      : tone === "green"
      ? "border-[rgba(158,243,21,.22)] bg-[rgba(158,243,21,.06)]"
      : "border-white/10 bg-white/5";

  return (
    <div className={cx("rounded-xl border px-3 py-2", cls)}>
      <div className="text-[10px] text-white/45">{label}</div>
      <div className="mt-1 text-xs font-medium text-white/85">{value}</div>
    </div>
  );
}

/* =======================================================================================
   Matrix bars
======================================================================================= */

function StageBars({ level, active }: { level: 0 | 1 | 2 | 3; active: boolean }) {
  const bars = [1, 2, 3] as const;
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="flex items-center gap-1.5">
        {bars.map((b) => {
          const on = level >= b;
          return (
            <span
              key={b}
              className={cx(
                "h-1.5 flex-1 rounded-full border transition",
                on
                  ? active
                    ? "border-[rgba(67,232,255,.45)] bg-[rgba(67,232,255,.22)]"
                    : "border-[rgba(67,232,255,.30)] bg-[rgba(67,232,255,.14)]"
                  : "border-white/10 bg-[#06041A]"
              )}
            />
          );
        })}
      </div>
      <div className="mt-2 text-[10px] text-white/45">
        {level === 0 ? "—" : level === 1 ? "base" : level === 2 ? "strong" : "best"}
      </div>
    </div>
  );
}

/* =======================================================================================
   Misc UI
======================================================================================= */

function MiniLine({ dot, text }: { dot: "cyan" | "green" | "neutral"; text: string }) {
  const c =
    dot === "green" ? "rgba(158,243,21,.55)" : dot === "neutral" ? "rgba(255,255,255,.35)" : "rgba(67,232,255,.55)";
  return (
    <div className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: c }} />
      <span>{text}</span>
    </div>
  );
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <span className="text-xs text-white/70">{label}</span>
      <span className="text-[11px] text-white/55">{value}</span>
    </div>
  );
}

function BundleLine({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#06041A] p-3">
      <div className="text-xs font-medium text-white/80">{title}</div>
      <div className="mt-1 text-[11px] text-white/55">{desc}</div>
    </div>
  );
}

function Badge({ severity }: { severity: Severity }) {
  const cls =
    severity === "ok"
      ? "border-[rgba(67,232,255,.30)] bg-[rgba(67,232,255,.10)] text-white"
      : severity === "warn"
      ? "border-[rgba(158,243,21,.25)] bg-[rgba(158,243,21,.08)] text-white"
      : "border-white/10 bg-white/5 text-white/70";

  const label = severity === "ok" ? "stable" : severity === "warn" ? "live IO" : "shipped";
  return <span className={cx("rounded-full border px-3 py-1 text-[11px]", cls)}>{label}</span>;
}

function Band({
  title,
  desc,
  chips,
  dot,
}: {
  title: string;
  desc: string;
  chips: string[];
  dot: "cyan" | "green" | "neutral";
}) {
  const c =
    dot === "green" ? "rgba(158,243,21,.55)" : dot === "neutral" ? "rgba(255,255,255,.35)" : "rgba(67,232,255,.55)";
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(920px_320px_at_25%_20%,rgba(67,232,255,.10),transparent_60%)] opacity-30" />
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2 text-xs font-medium text-white/80">
            <span className="h-2 w-2 rounded-full" style={{ background: c }} />
            {title}
          </div>
          <div className="mt-2 text-sm text-white/70 leading-relaxed">{desc}</div>
        </div>
        <div className="lg:col-span-8 flex flex-wrap gap-2">
          {chips.map((x) => (
            <SpecChip key={x} tone={dot === "green" ? "green" : dot === "cyan" ? "cyan" : "neutral"}>
              {x}
            </SpecChip>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =======================================================================================
   Engagement strip
======================================================================================= */

function EngagementStrip() {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState<"sprint" | "build" | "lab">("sprint");

  const data = useMemo(() => {
    if (tab === "sprint") {
      return {
        title: "Prototype Sprint",
        bestFor: "Validate IO, constraints, and “feel” fast.",
        timeline: "2–4 weeks",
        includes: ["System map", "Interactive slice", "Perf budget", "Next-step plan"],
        deliverables: ["Prototype build", "Device matrix", "Risks + constraints", "Production scope"],
      };
    }
    if (tab === "build") {
      return {
        title: "Production Build",
        bestFor: "Ship a hardened system to real targets.",
        timeline: "6–12 weeks",
        includes: ["QA matrix", "Fallback UX", "Deploy plan", "Telemetry schema"],
        deliverables: ["Production release", "Runbooks", "Monitoring hooks", "Handover docs"],
      };
    }
    return {
      title: "Ongoing Lab / Retainer",
      bestFor: "Updates, experiments, and ops support.",
      timeline: "Monthly",
      includes: ["Update cadence", "Monitoring + fixes", "New modules", "Experiment loop"],
      deliverables: ["Release notes", "Ops dashboard", "Backlog iterations", "Module roadmap"],
    };
  }, [tab]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        <SegBtn active={tab === "sprint"} onClick={() => setTab("sprint")}>
          Prototype Sprint
        </SegBtn>
        <SegBtn active={tab === "build"} onClick={() => setTab("build")}>
          Production Build
        </SegBtn>
        <SegBtn active={tab === "lab"} onClick={() => setTab("lab")}>
          Ongoing Lab
        </SegBtn>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4"
        >
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#06041A] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold tracking-[-0.03em]">{data.title}</div>
                <div className="mt-2 text-sm text-white/70 leading-relaxed">{data.bestFor}</div>
              </div>
              <SpecChip tone="cyan">{data.timeline}</SpecChip>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-medium text-white/75">Includes</div>
                <div className="mt-3 space-y-2">
                  {data.includes.map((x) => (
                    <MiniLine key={x} dot="cyan" text={x} />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-medium text-white/75">Deliverables</div>
                <div className="mt-3 space-y-2">
                  {data.deliverables.map((x) => (
                    <MiniLine key={x} dot="neutral" text={x} />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button href="#creative-cta" variant="primary">
                Start this model
              </Button>
              <Button href="#creative-capability-matrix" variant="secondary">
                See matrix
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#06041A] p-5">
            <div className="text-xs font-medium text-white/75">Consistent across all models</div>
            <div className="mt-3 space-y-3">
              <KeyValue label="Device matrix" value="targets + QA" />
              <KeyValue label="Runbooks" value="operate + recovery" />
              <KeyValue label="Telemetry plan" value="measure + iterate" />
              <KeyValue label="Handover" value="source + docs" />
            </div>
            <div className="mt-5 h-px w-full bg-white/10" />
            <div className="mt-4 text-[11px] text-white/55">
              Different contract, same systems-first delivery.
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SegBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "rounded-full border px-4 py-2 text-sm font-medium transition",
        active
          ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-white"
          : "border-white/10 bg-[#06041A] text-white/70 hover:text-white hover:bg-white/5"
      )}
    >
      {children}
    </button>
  );
}

/* =======================================================================================
   FAQ
======================================================================================= */

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#06041A] overflow-hidden">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="p-4">
              <button type="button" onClick={() => setOpen(isOpen ? null : i)} className="w-full text-left outline-none">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-semibold tracking-[-0.02em]">{f.q}</div>
                  <span className="mt-1 text-[11px] text-white/45">{isOpen ? "hide" : "open"}</span>
                </div>
                <div className="mt-2 text-[11px] text-white/55">buyer note: “deployment clarity”</div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-white/70 leading-relaxed">{f.a}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Chip tone="soft">prototype</Chip>
                      <Chip tone="cyan">deploy</Chip>
                      <Chip tone="green">operate</Chip>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button href="#creative-cta" variant="secondary">
          Ask a specific question
        </Button>
        <span className="text-xs text-white/55">We’ll reply with steps, timelines, and deliverables.</span>
      </div>
    </div>
  );
}

/* =======================================================================================
   CTA — Terminal prompt intake bar
======================================================================================= */

function TerminalCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#06041A] p-6 sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(820px_360px_at_25%_20%,rgba(67,232,255,.18),transparent_60%),radial-gradient(620px_300px_at_80%_80%,rgba(91,45,220,.10),transparent_60%)]" />
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="cyan">Final CTA</Chip>
            <Chip tone="soft">Terminal intake</Chip>
            <Chip tone="green">NDA-ready</Chip>
          </div>

          <h2 className="mt-4 text-balance text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em]">
            Tell us constraints — we’ll return a{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(67,232,255,1), rgba(179,247,255,.95), rgba(255,255,255,.86))",
              }}
            >
              system plan
            </span>
            .
          </h2>

          <p className="mt-3 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
            Share targets, inputs, and success metric. We’ll propose modules + a prototype-first pipeline with delivery artifacts.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="primary" href="mailto:hello@wodh.io">
              Email the team
            </Button>
            <Button variant="secondary" href="#creative-tech-plays">
              Browse modules
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/55">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Runbooks included</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Device QA matrix</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Telemetry plan</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Source + handover</span>
          </div>
        </div>

        <div className="lg:col-span-5">
          {/* Terminal bar */}
          <div className="rounded-2xl border border-[rgba(67,232,255,.22)] bg-[rgba(67,232,255,.06)] p-5 overflow-hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="text-xs font-medium text-white/80">Terminal prompt</div>
              <span className="text-[11px] text-white/55">intake v1</span>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-[#050318] p-4 font-mono">
              <div className="text-[11px] text-white/55">
                <span style={{ color: ACCENT }}>wodh@lab</span>:<span className="text-white/70">~</span>$ describe-project
              </div>

              <div className="mt-3 space-y-2 text-[11px] text-white/60">
                <LinePrompt k="targets" v="web + kiosk + LED wall" />
                <LinePrompt k="inputs" v="camera + depth + touch + APIs" />
                <LinePrompt k="offline" v="required (venue constraints)" />
                <LinePrompt k="success" v="engagement + dwell time + conversions" />
              </div>

              <div className="mt-3 text-[11px] text-white/55">
                output → <span className="text-white/80">module bundle</span> +{" "}
                <span className="text-white/80">timeline</span> +{" "}
                <span className="text-white/80">deliverables</span>
              </div>

              {!reduceMotion ? (
                <motion.div
                  className="mt-3 h-3 w-2 rounded-[2px]"
                  style={{ background: "rgba(67,232,255,.75)" }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : (
                <div className="mt-3 h-3 w-2 rounded-[2px] bg-white/40" />
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="primary" href="mailto:hello@wodh.io?subject=Creative%20Tech%20Intake&body=Targets:%20%0AInputs:%20%0AOffline:%20%0ASuccess%20metric:%20%0ATimeline:%20">
                Send intake
              </Button>
              <Button variant="ghost" href="#creative-capability-matrix">
                See matrix →
              </Button>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-[11px] text-white/60">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                accent: <span className="text-white/80">electric cyan</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: PURPLE }} />
                depth: <span className="text-white/80">violet glow</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
                signal: <span className="text-white/80">ops-ready</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LinePrompt({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-white/45">{k}:</span>
      <span className="text-white/80">{v}</span>
    </div>
  );
}

