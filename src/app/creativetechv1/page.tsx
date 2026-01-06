"use client";

import React, { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* =======================================================================================
   WODH — CREATIVE TECH SERVICES (Way 1: Neon Lab Console)
   - Wodh v1 structure + rhythms
   - Primary accent: Electric Cyan / Aqua
   - Optional micro-status: Neon Green
   - More glow + animated schematics (disciplined)
   Sections + IDs:
   1) creative-hero
   2) creative-what-we-build
   3) creative-capability-matrix
   4) creative-tech-plays
   5) creative-pipeline
   6) creative-proof
   7) creative-integrations
   8) creative-engagement
   9) creative-faq
   10) creative-cta
======================================================================================= */

type StageKey = "prototype" | "production" | "deploy" | "operate";
type Level = 0 | 1 | 2 | 3;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------ Accent Tokens ------------------------------ */
/**
 * We keep Wodh indigo base + Electric Cyan primary accent.
 * We use Neon Green only for "status/success" micro indicators.
 *
 * Tailwind note: we rely on arbitrary values (bg-[#...]) so no theme config required.
 */
const ACCENT_CYAN = "rgba(67, 232, 255, 1)"; // electric cyan
const ACCENT_GREEN = "rgba(158, 243, 21, 1)"; // wodh neon green (micro-status)

const PAGE = {
  title: "Creative Tech Services",
  subtitle:
    "Creative technology that turns ideas into interactive realities — shipped as systems, not just demos.",
  chips: ["Prototype-first", "Offline-ready deployments", "Telemetry built-in"],
};

const WHAT_WE_BUILD = [
  {
    title: "Interactive brand experiences",
    outcome: "Launch moments people can touch, explore, and share.",
    uses: ["Microsites", "Product storytelling", "Campaign activations"],
    stack: ["WebGL", "Three.js", "GSAP", "Analytics"],
  },
  {
    title: "Real-time 3D / WebGL microsites",
    outcome: "High-performance 3D on the web — smooth, measurable, scalable.",
    uses: ["Configurators", "3D narratives", "Data-driven visuals"],
    stack: ["Three.js", "R3F", "CDN", "Perf budget"],
  },
  {
    title: "Event + installation systems",
    outcome: "Kiosk-ready, offline-first systems with remote content updates.",
    uses: ["Expo kiosks", "Interactive walls", "Museums"],
    stack: ["Kiosk mode", "Remote sync", "Show-control"],
  },
  {
    title: "AR campaigns (lightweight)",
    outcome: "Fast-to-market AR that fits real timelines and real devices.",
    uses: ["Filters", "WebAR", "AR previews"],
    stack: ["WebAR", "Lens/Web", "Tracking", "Landing"],
  },
  {
    title: "Generative visuals & content engines",
    outcome: "Brand-safe generative systems that scale content production.",
    uses: ["Templates", "Asset variations", "Automations"],
    stack: ["Pipelines", "Tooling", "Guardrails", "Review"],
  },
  {
    title: "Realtime stages / virtual production",
    outcome: "Real-time lookdev + stage-ready content workflows (if applicable).",
    uses: ["Previs", "Interactive stage", "Realtime lighting"],
    stack: ["Unreal", "DMX/OSC", "Realtime IO"],
  },
] as const;

type CapabilityRow = {
  key: string;
  title: string;
  desc: string;
  tags: string[];
  levels: Record<StageKey, Level>;
  details: {
    why: string;
    deliverables: string[];
    signals: string[];
  };
};

const CAPABILITY_COLUMNS: Array<{ key: StageKey; label: string; hint: string }> =
  [
    { key: "prototype", label: "Prototype", hint: "Fast demo with clear IO" },
    { key: "production", label: "Production", hint: "Hardened build + QA" },
    { key: "deploy", label: "Deploy", hint: "Devices, kiosks, stores, web" },
    { key: "operate", label: "Operate", hint: "Updates, metrics, iteration" },
  ];

const CAPABILITIES: CapabilityRow[] = [
  {
    key: "realtime-rendering",
    title: "Real-time rendering",
    desc: "Smooth visuals under constraints — measured, tuned, predictable.",
    tags: ["Perf budget", "LOD", "Shader discipline"],
    levels: { prototype: 3, production: 3, deploy: 2, operate: 2 },
    details: {
      why: "If performance is not designed, it becomes a surprise late in delivery.",
      deliverables: ["Perf budget + targets", "Scene optimization pass", "Device test matrix"],
      signals: ["Stable FPS targets", "Low input latency", "Predictable load times"],
    },
  },
  {
    key: "interaction-design",
    title: "Interaction design",
    desc: "Inputs → feedback → outcomes. Every action has a reason.",
    tags: ["UX loops", "Micro-feedback", "Error states"],
    levels: { prototype: 3, production: 2, deploy: 2, operate: 1 },
    details: {
      why: "Creative tech succeeds when interaction is obvious, responsive, and forgiving.",
      deliverables: ["Interaction map", "Motion system", "Accessibility passes"],
      signals: ["Fast comprehension", "Reduced drop-off", "Confident user flow"],
    },
  },
  {
    key: "device-sensor-input",
    title: "Device + sensor input",
    desc: "Camera, IMU, QR/NFC, depth — integrated cleanly and safely.",
    tags: ["Camera", "IMU", "Depth", "QR/NFC"],
    levels: { prototype: 2, production: 2, deploy: 3, operate: 2 },
    details: {
      why: "Input is where real-world messiness enters — handle it intentionally.",
      deliverables: ["Input fallback plan", "Calibration flow", "Permission UX"],
      signals: ["Stable tracking", "Graceful fallbacks", "Low failure rate"],
    },
  },
  {
    key: "web-mobile-delivery",
    title: "Web + mobile delivery",
    desc: "Fast, reliable delivery across browsers/devices with a clear baseline.",
    tags: ["Cross-browser", "Mobile-first", "Bundle discipline"],
    levels: { prototype: 3, production: 3, deploy: 3, operate: 3 },
    details: {
      why: "Delivery isn’t just ‘it loads’ — it’s speed, stability, and maintainability.",
      deliverables: ["Release checklist", "Monitoring hooks", "Fallback content states"],
      signals: ["Consistent LCP", "Low crash rate", "Incremental updates"],
    },
  },
  {
    key: "kiosk-show-control",
    title: "Show-control / kiosk mode",
    desc: "Offline-first deployments with remote updates and operator sanity.",
    tags: ["Offline", "Autostart", "Remote update"],
    levels: { prototype: 1, production: 2, deploy: 3, operate: 3 },
    details: {
      why: "Events are unforgiving — the system must run even when networks don’t.",
      deliverables: ["Kiosk runbook", "Recovery flows", "Remote sync strategy"],
      signals: ["Auto-recovery", "Operator confidence", "Stable unattended runs"],
    },
  },
  {
    key: "backend-analytics",
    title: "Backend + analytics",
    desc: "Telemetry, content updates, and event logging that teams can trust.",
    tags: ["Telemetry", "CMS hooks", "Audit logs"],
    levels: { prototype: 1, production: 2, deploy: 2, operate: 3 },
    details: {
      why: "Without measurement, you can’t iterate — and you can’t prove ROI.",
      deliverables: ["Event schema", "Dashboard hooks", "Privacy-aware tracking"],
      signals: ["Readable funnels", "Actionable insights", "Safe data handling"],
    },
  },
  {
    key: "tooling-pipelines",
    title: "Tooling + content pipelines",
    desc: "Repeatable workflows that turn assets into shipping experiences.",
    tags: ["Pipelines", "Automation", "Guardrails"],
    levels: { prototype: 1, production: 2, deploy: 2, operate: 3 },
    details: {
      why: "The best creative tech is a system — tooling keeps it scalable.",
      deliverables: ["Content schema", "Validation rules", "Publish workflow"],
      signals: ["Fewer regressions", "Faster updates", "Lower ops cost"],
    },
  },
];

type TechPlay = {
  key: string;
  title: string;
  pitch: string;
  builtFor: string[];
  inputs: string[];
  outputs: string[];
  deploy: string[];
  notes: string[];
};

const TECH_PLAYS: TechPlay[] = [
  {
    key: "microsite-engine",
    title: "Interactive Microsite Engine",
    pitch: "WebGL storytelling with a content pipeline that teams can update.",
    builtFor: ["Brand campaigns", "Product launches", "Agency delivery"],
    inputs: ["3D assets", "Copy blocks", "Media", "Interaction map"],
    outputs: ["Responsive WebGL site", "Analytics events", "Perf budget report"],
    deploy: ["CDN deploy", "A/B ready", "SEO-safe fallback"],
    notes: ["Perf-first scene discipline", "Modular sections", "Telemetry baked in"],
  },
  {
    key: "installation-loop",
    title: "Installation Loop System",
    pitch: "Offline-first kiosk experiences with remote content updates + recovery.",
    builtFor: ["Expos", "Museums", "Retail", "Brand activations"],
    inputs: ["Content packs", "Device config", "Input sensors"],
    outputs: ["Kiosk app", "Operator runbook", "Remote update pipeline"],
    deploy: ["Kiosk mode", "Autostart", "Remote monitoring"],
    notes: ["Auto-recovery", "Fallback states", "Operator-safe controls"],
  },
  {
    key: "realtime-visualizer",
    title: "Realtime Visualizer",
    pitch: "Real-time 3D visualization for products, architecture, or data.",
    builtFor: ["Sales enablement", "Digital twins", "Interactive demos"],
    inputs: ["CAD/3D", "Config rules", "Datasets"],
    outputs: ["Configurator", "Snapshots/exports", "Interactive scenes"],
    deploy: ["Web", "Tablet", "Kiosk"],
    notes: ["Config rules engine", "Optimized pipelines", "Share-ready outputs"],
  },
  {
    key: "ar-campaign-kit",
    title: "AR Campaign Kit",
    pitch: "AR experiences with landing flows + measurable outcomes.",
    builtFor: ["Campaigns", "Packaging activations", "Social integrations"],
    inputs: ["Targets", "3D props", "CTA flows"],
    outputs: ["AR experience", "Landing + tracking", "Share hooks"],
    deploy: ["WebAR", "Filter platforms", "QR entry"],
    notes: ["Permission UX", "Fallback content", "Fast iteration cycles"],
  },
  {
    key: "generative-tool",
    title: "Generative Content Tool",
    pitch: "Brand-safe generative systems that produce variations at scale.",
    builtFor: ["Content teams", "Product marketing", "Creative ops"],
    inputs: ["Templates", "Rules", "Brand tokens"],
    outputs: ["Approved variations", "Exports", "Audit trail"],
    deploy: ["Internal tool", "API hooks", "Review workflow"],
    notes: ["Guardrails", "Human review loops", "Repeatable outputs"],
  },
];

const PIPELINE = [
  {
    key: "discover",
    title: "Discover & concept",
    desc: "Clarify outcomes, constraints, and the system boundaries.",
    deliverables: ["System map", "Risk list", "Perf targets"],
  },
  {
    key: "prototype",
    title: "Prototype (fast demo)",
    desc: "Build a real interactive slice to validate IO and feel.",
    deliverables: ["Clickable prototype", "Input plan", "Tech spikes"],
  },
  {
    key: "production",
    title: "Production build",
    desc: "Harden the experience — QA, performance, edge cases, polish.",
    deliverables: ["Production build", "QA checklist", "Content schema"],
  },
  {
    key: "deploy",
    title: "Deployment",
    desc: "Ship to web, devices, kiosks, stores, or events with runbooks.",
    deliverables: ["Deploy plan", "Operator guide", "Monitoring hooks"],
  },
  {
    key: "operate",
    title: "Operate & iterate",
    desc: "Measure, update, and improve — without breaking the system.",
    deliverables: ["Telemetry dashboard", "Update cadence", "Backlog loop"],
  },
] as const;

const PROOF_TILES = [
  {
    key: "case-1",
    kind: "case" as const,
    title: "Product launch microsite",
    sub: "WebGL storytelling → measurable engagement",
    bullets: ["Perf budget discipline", "Analytics events schema", "CMS-ready content"],
    stat: "LCP-focused delivery",
  },
  {
    key: "claim-1",
    kind: "claim" as const,
    title: "Offline-ready kiosk mode",
    sub: "No Wi-Fi? Still runs. Still recovers.",
    bullets: ["Autostart + watchdog", "Fallback states", "Operator-safe reset"],
    stat: "Unattended stability",
  },
  {
    key: "case-2",
    kind: "case" as const,
    title: "Interactive installation",
    sub: "Sensor inputs → real-time feedback loop",
    bullets: ["Input calibration flow", "Latency-aware feedback", "On-site runbook"],
    stat: "Low failure rate design",
  },
  {
    key: "claim-2",
    kind: "claim" as const,
    title: "Multi-device sync",
    sub: "Tablets + screens + kiosks, orchestrated as one system.",
    bullets: ["Shared state model", "Graceful disconnects", "Operator controls"],
    stat: "Orchestrated experiences",
  },
  {
    key: "case-3",
    kind: "case" as const,
    title: "Realtime configurator",
    sub: "Rules engine → instant 3D updates",
    bullets: ["Config constraints", "Export snapshots", "Performance tuning"],
    stat: "Sales enablement-ready",
  },
  {
    key: "claim-3",
    kind: "claim" as const,
    title: "Telemetry built-in",
    sub: "Event logs that teams can actually use.",
    bullets: ["Privacy-aware tracking", "Readable funnels", "Iteration hooks"],
    stat: "Proof over opinions",
  },
] as const;

const INTEGRATIONS = {
  devices: ["Web", "iOS", "Android", "Kiosk", "LED wall", "XR devices"],
  inputs: ["Camera", "IMU", "Depth", "QR/NFC", "APIs", "DMX/OSC"],
  data: ["Telemetry", "Logs", "Dashboards", "CMS updates", "A/B hooks"],
  delivery: ["Offline-first", "Remote sync", "Runbooks", "Monitoring", "Rollback"],
};

type EngagementKey = "sprint" | "build" | "lab";
const ENGAGEMENTS: Array<{
  key: EngagementKey;
  label: string;
  title: string;
  desc: string;
  timeline: string;
  includes: string[];
  bestFor: string[];
}> = [
  {
    key: "sprint",
    label: "Prototype Sprint",
    title: "Validate the experience fast",
    desc: "A real interactive slice that proves IO, feel, and feasibility — with clear next steps.",
    timeline: "2–4 weeks",
    includes: ["System map", "Prototype build", "Tech spikes", "Next-step plan"],
    bestFor: ["New ideas", "Pitch support", "Risk reduction"],
  },
  {
    key: "build",
    label: "Production Build",
    title: "Ship a production-ready system",
    desc: "Performance, QA, deployment, runbooks, and measurable outcomes — ready for real users.",
    timeline: "6–12 weeks",
    includes: ["Production build", "QA & device matrix", "Deploy plan", "Telemetry schema"],
    bestFor: ["Launches", "Installations", "Sales enablement"],
  },
  {
    key: "lab",
    label: "Ongoing Lab",
    title: "Operate & iterate like a product",
    desc: "Continuous improvements, content updates, experiments, and system reliability as an ongoing partnership.",
    timeline: "Monthly",
    includes: ["Update cadence", "Monitoring + fixes", "New modules", "Experiment loop"],
    bestFor: ["Long-running experiences", "Content pipelines", "Multi-phase rollouts"],
  },
];

const FAQS = [
  {
    q: "Can you build a prototype first?",
    a: "Yes. We typically start with a prototype sprint that validates the interaction, inputs, and delivery constraints before production.",
  },
  {
    q: "Do you handle on-site installations?",
    a: "We can support installation deployments with runbooks, kiosk modes, recovery flows, and operator training — and coordinate with your venue or AV team.",
  },
  {
    q: "Can it run offline?",
    a: "Yes. For events and kiosks we design offline-first behavior, cached content packs, and resilient recovery workflows.",
  },
  {
    q: "What devices do you support?",
    a: "Web, iOS/Android, kiosk systems, large displays/LED walls, and XR devices — we’ll define a device matrix early and test against it.",
  },
  {
    q: "Who owns the source and assets?",
    a: "You do — we deliver source code and production assets per the engagement model, with clear licensing and handover documentation.",
  },
] as const;

/* =======================================================================================
   Small UI Primitives
======================================================================================= */

function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "cyan" | "green" | "soft";
}) {
  const toneClass =
    tone === "cyan"
      ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.08)] text-[rgba(179,247,255,.95)]"
      : tone === "green"
        ? "border-[rgba(158,243,21,.35)] bg-[rgba(158,243,21,.08)] text-[rgba(222,255,168,.95)]"
        : tone === "soft"
          ? "border-white/10 bg-white/5 text-white/80"
          : "border-white/10 bg-white/5 text-white/80";

  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs leading-none",
        toneClass
      )}
    >
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
    >
      {children}
    </Comp>
  );
}

function SectionShell({
  id,
  eyebrow,
  title,
  lead,
  children,
  compact = false,
}: {
  id: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      id={id}
      className={cx(
        "relative mx-auto w-full max-w-6xl px-4 sm:px-6",
        compact ? "py-12 sm:py-14" : "py-14 sm:py-16"
      )}
    >
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

/* =======================================================================================
   Background Layers (Wodh v1 + Creative Tech motif)
======================================================================================= */

function BackgroundAtmosphere() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_20%_10%,rgba(67,232,255,.10),transparent_60%),radial-gradient(900px_700px_at_80%_15%,rgba(158,243,21,.07),transparent_55%),radial-gradient(1000px_900px_at_60%_90%,rgba(91,45,220,.08),transparent_55%)]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(255,255,255,.06),transparent_55%)] opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,26,0),rgba(7,5,26,.65)_55%,rgba(7,5,26,.92))]" />

      {/* Subtle noise */}
      <div className="absolute inset-0 opacity-[0.07] mix-blend-soft-light [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22300%22%20height=%22300%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.8%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22300%22%20height=%22300%22%20filter=%22url(%23n)%22%20opacity=%220.35%22/%3E%3C/svg%3E')]" />

      {/* Animated schematic layer */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <svg
          className="absolute left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 opacity-[0.14]"
          viewBox="0 0 1200 1200"
          fill="none"
        >
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1200" y2="1200">
              <stop stopColor="rgba(67,232,255,.85)" />
              <stop offset="1" stopColor="rgba(67,232,255,0)" />
            </linearGradient>
            <radialGradient id="g2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(600 600) rotate(90) scale(520)">
              <stop stopColor="rgba(67,232,255,.35)" />
              <stop offset="1" stopColor="rgba(67,232,255,0)" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feColorMatrix
                in="b"
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0.3
                        0 0 1 0 0.7
                        0 0 0 0.75 0"
                result="c"
              />
              <feMerge>
                <feMergeNode in="c" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <mask id="fade">
              <rect width="1200" height="1200" fill="url(#g2)" />
            </mask>
          </defs>

          {/* Rings */}
          <circle cx="600" cy="600" r="420" stroke="rgba(67,232,255,.22)" strokeWidth="1" mask="url(#fade)" />
          <circle cx="600" cy="600" r="300" stroke="rgba(67,232,255,.16)" strokeWidth="1" mask="url(#fade)" />
          <circle cx="600" cy="600" r="180" stroke="rgba(67,232,255,.12)" strokeWidth="1" mask="url(#fade)" />

          {/* Paths */}
          <path
            d="M220 420 C 420 220, 780 220, 980 420"
            stroke="url(#g1)"
            strokeWidth="1.2"
            mask="url(#fade)"
            filter="url(#glow)"
          />
          <path
            d="M250 820 C 470 640, 730 640, 950 820"
            stroke="rgba(67,232,255,.22)"
            strokeWidth="1"
            mask="url(#fade)"
          />
          <path
            d="M420 980 C 520 820, 680 820, 780 980"
            stroke="rgba(67,232,255,.18)"
            strokeWidth="1"
            mask="url(#fade)"
          />

          {/* Nodes (animated pulse) */}
          {[{ x: 220, y: 420 }, { x: 980, y: 420 }, { x: 250, y: 820 }, { x: 950, y: 820 }, { x: 600, y: 600 }].map(
            (p, i) => (
              <g key={i} mask="url(#fade)">
                <circle cx={p.x} cy={p.y} r="3" fill="rgba(67,232,255,.65)" />
                {!reduceMotion ? (
                  <motion.circle
                    cx={p.x}
                    cy={p.y}
                    r="6"
                    fill="transparent"
                    stroke="rgba(67,232,255,.55)"
                    strokeWidth="1"
                    initial={{ opacity: 0.0, scale: 0.8 }}
                    animate={{ opacity: [0.0, 0.35, 0.0], scale: [0.8, 1.3, 1.8] }}
                    transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
                  />
                ) : null}
              </g>
            )
          )}
        </svg>
      </motion.div>
    </div>
  );
}

/* =======================================================================================
   Page
======================================================================================= */

export default function CreativeTechServicesPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const [capHover, setCapHover] = useState<string>(CAPABILITIES[0]?.key ?? "");
  const activeCap = useMemo(
    () => CAPABILITIES.find((c) => c.key === capHover) ?? CAPABILITIES[0],
    [capHover]
  );

  return (
    <main className="relative min-h-screen bg-[#07051A] text-white">
      <BackgroundAtmosphere />

      {/* Top hairline */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-white/10" />

      {/* ===================================================================================
          SECTION 1 — Hero (ID: creative-hero)
      =================================================================================== */}
      <section id="creative-hero" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-14 sm:pt-16 pb-12 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left: editorial */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="soft">Creative Tech</Chip>
              <Chip tone="cyan">Neon Lab Console</Chip>
              <Chip tone="green">Shipping systems</Chip>
            </div>

            <h1 className="mt-5 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.02]">
              <span className="text-white">Creative technology</span>{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(67,232,255,1), rgba(179,247,255,.95), rgba(158,243,21,.75))",
                }}
              >
                that turns ideas
              </span>{" "}
              <span className="text-white">into interactive realities.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
              Build experiences that run reliably in the real world — across web, devices, kiosks, and installations —
              with performance budgets, telemetry, and deployment runbooks baked in.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {PAGE.chips.map((c) => (
                <Chip key={c} tone="soft">
                  {c}
                </Chip>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="#creative-cta" variant="primary">
                Start a project
              </Button>
              <Button href="#creative-capability-matrix" variant="secondary">
                See capabilities
              </Button>
              <Button href="#creative-tech-plays" variant="ghost">
                Browse modules →
              </Button>
            </div>

            {/* Mini trust line */}
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-white/55">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(67,232,255,.65)" }} />
                NDA-ready
              </span>
              <span className="text-white/30">•</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(158,243,21,.55)" }} />
                Production team
              </span>
              <span className="text-white/30">•</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                Global delivery
              </span>
            </div>
          </div>

          {/* Right: Live modules stack */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(600px_320px_at_70%_20%,rgba(67,232,255,.16),transparent_55%),radial-gradient(520px_260px_at_20%_85%,rgba(158,243,21,.10),transparent_55%)]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-white/25" />
                    <span className="text-xs font-medium text-white/75">Live Modules</span>
                  </div>
                  <span className="text-[11px] text-white/50">Input → Process → Output</span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ModuleCard
                    reduceMotion={reduceMotion}
                    title="WebGL Runtime"
                    status="LIVE"
                    accent="cyan"
                    io={["3D assets", "Interaction map", "Perf budget"]}
                    out={["Responsive microsite", "Analytics events", "Fallback states"]}
                  />
                  <ModuleCard
                    reduceMotion={reduceMotion}
                    title="Sensor IO"
                    status="READY"
                    accent="green"
                    io={["Camera", "IMU/Depth", "QR/NFC"]}
                    out={["Calibrated input", "Low-latency feedback", "Fallbacks"]}
                  />
                  <ModuleCard
                    reduceMotion={reduceMotion}
                    title="Telemetry Layer"
                    status="ON"
                    accent="cyan"
                    io={["Event schema", "Privacy rules", "Dashboards"]}
                    out={["Funnels", "Logs", "Iteration signals"]}
                  />
                  <ModuleCard
                    reduceMotion={reduceMotion}
                    title="Realtime 3D"
                    status="TUNED"
                    accent="cyan"
                    io={["Rules engine", "Datasets", "LOD strategy"]}
                    out={["Instant updates", "Exports", "Device matrix"]}
                  />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Chip tone="cyan">Offline-ready option</Chip>
                  <Chip tone="soft">Device matrix</Chip>
                  <Chip tone="soft">Runbooks</Chip>
                </div>
              </div>
            </div>

            {/* Mini console strip */}
            <div className="mt-3 rounded-2xl border border-white/10 bg-[#06041A] p-3 overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/60">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(67,232,255,.65)" }} />
                  latency: <span className="text-white/80">low</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(158,243,21,.55)" }} />
                  status: <span className="text-white/80">deploy-ready</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                  ops: <span className="text-white/80">monitoring attached</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
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
            <Chip tone="cyan">Outcome tiles</Chip>
          </div>
        }
        title={
          <>
            Built as <span className="text-white/85">systems</span> — delivered as{" "}
            <span className="text-white/85">experiences</span>.
          </>
        }
        lead="Each offering is framed as IO: outcomes, use cases, and a typical stack — so stakeholders instantly understand what ships."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WHAT_WE_BUILD.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(520px_240px_at_30%_20%,rgba(67,232,255,.14),transparent_60%)]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <span className="mt-0.5 inline-flex items-center gap-2 text-[11px] text-white/55">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(67,232,255,.55)" }} />
                    IO-ready
                  </span>
                </div>

                <p className="mt-2 text-sm text-white/70 leading-relaxed">{item.outcome}</p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-7">
                    <div className="text-xs font-medium text-white/75">Use cases</div>
                    <ul className="mt-2 space-y-1 text-xs text-white/60">
                      {item.uses.map((u) => (
                        <li key={u} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/25" />
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="sm:col-span-5">
                    <div className="text-xs font-medium text-white/75">Typical stack</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* schematic micro-line */}
                <div className="mt-5 h-px w-full bg-white/10" />
                <div className="mt-3 flex items-center justify-between text-[11px] text-white/55">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full" style={{ background: "rgba(67,232,255,.6)" }} />
                    Trigger
                  </span>
                  <span className="text-white/30">→</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-white/35" />
                    Experience
                  </span>
                  <span className="text-white/30">→</span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full" style={{ background: "rgba(158,243,21,.55)" }} />
                    Measure
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ===================================================================================
          SECTION 3 — Signature Capability Matrix (ID: creative-capability-matrix)
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
            From <span className="text-white/85">prototype</span> to{" "}
            <span className="text-white/85">operate</span> — mapped clearly.
          </>
        }
        lead="Hover a capability to see what we ship, why it matters, and the signals we measure. This is how Creative Tech stays reliable at delivery."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Matrix */}
          <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="grid grid-cols-12 gap-0 border-b border-white/10 bg-[#06041A]">
              <div className="col-span-4 p-4 text-xs font-medium text-white/70">Capability</div>
              {CAPABILITY_COLUMNS.map((c) => (
                <div key={c.key} className="col-span-2 p-4">
                  <div className="text-xs font-medium text-white/80">{c.label}</div>
                  <div className="mt-1 text-[11px] text-white/45">{c.hint}</div>
                </div>
              ))}
            </div>

            <div className="divide-y divide-white/10">
              {CAPABILITIES.map((row) => {
                const active = row.key === capHover;
                return (
                  <div
                    key={row.key}
                    onMouseEnter={() => setCapHover(row.key)}
                    onFocus={() => setCapHover(row.key)}
                    tabIndex={0}
                    className={cx(
                      "grid grid-cols-12 gap-0 cursor-pointer outline-none transition-colors",
                      active ? "bg-[rgba(67,232,255,.06)]" : "hover:bg-white/[0.04]"
                    )}
                  >
                    <div className="col-span-4 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold tracking-[-0.02em]">{row.title}</div>
                          <div className="mt-1 text-[11px] text-white/60">{row.desc}</div>
                        </div>
                        <span
                          className={cx(
                            "mt-0.5 inline-flex h-6 items-center rounded-full border px-2 text-[10px]",
                            active
                              ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-[rgba(179,247,255,.95)]"
                              : "border-white/10 bg-white/5 text-white/55"
                          )}
                        >
                          {active ? "active" : "hover"}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {row.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/65"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {CAPABILITY_COLUMNS.map((c) => (
                      <div key={c.key} className="col-span-2 p-4 flex items-center">
                        <LevelBar level={row.levels[c.key]} active={active} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#06041A] p-5 overflow-hidden">
            <div className="relative">
              <div className="absolute -inset-8 bg-[radial-gradient(420px_260px_at_60%_20%,rgba(67,232,255,.16),transparent_60%)]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-medium text-white/70">Capability detail</div>
                  <span className="text-[11px] text-white/45">hover a row</span>
                </div>

                <div className="mt-4">
                  <div className="text-lg font-semibold tracking-[-0.03em]">{activeCap?.title}</div>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{activeCap?.details.why}</p>
                </div>

                <div className="mt-5">
                  <div className="text-xs font-medium text-white/75">Deliverables</div>
                  <ul className="mt-2 space-y-2 text-xs text-white/60">
                    {activeCap?.details.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "rgba(67,232,255,.55)" }} />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5">
                  <div className="text-xs font-medium text-white/75">Signals we track</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeCap?.details.signals.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 h-px w-full bg-white/10" />
                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip tone="cyan">systems-first</Chip>
                  <Chip tone="soft">measurable</Chip>
                  <Chip tone="green">deploy-safe</Chip>
                </div>
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
            <Chip tone="cyan">Mini products</Chip>
          </div>
        }
        title={
          <>
            Packaged modules you can <span className="text-white/85">ship</span>.
          </>
        }
        lead="These are repeatable systems — each with defined inputs, outputs, and deployment patterns."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {TECH_PLAYS.map((p, idx) => (
            <motion.div
              key={p.key}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.03 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(560px_260px_at_30%_20%,rgba(67,232,255,.14),transparent_60%)]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.03em]">{p.title}</h3>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">{p.pitch}</p>
                  </div>
                  <span className="mt-1 inline-flex items-center rounded-full border border-[rgba(67,232,255,.25)] bg-[rgba(67,232,255,.08)] px-2.5 py-1 text-[10px] text-[rgba(179,247,255,.95)]">
                    module
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <MiniSpec title="Built for" items={p.builtFor} />
                  <MiniSpec title="Inputs" items={p.inputs} />
                  <MiniSpec title="Outputs" items={p.outputs} />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.deploy.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <div className="mt-4 h-px w-full bg-white/10" />
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.notes.map((n) => (
                    <Chip key={n} tone="soft">
                      {n}
                    </Chip>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
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
            Build → Ship → <span className="text-white/85">Operate</span>.
          </>
        }
        lead="A delivery track designed for real-world deployments — with runbooks, monitoring hooks, and iteration loops."
      >
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(640px_280px_at_70%_20%,rgba(67,232,255,.14),transparent_60%)]" />
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {PIPELINE.map((step, i) => (
                <div key={step.key} className="relative">
                  {/* Connector line */}
                  {i < PIPELINE.length - 1 ? (
                    <div className="hidden lg:block absolute left-[calc(50%+18px)] top-[22px] h-px w-[calc(100%-36px)] bg-white/10" />
                  ) : null}

                  <div className="rounded-2xl border border-white/10 bg-[#06041A] p-4">
                    <div className="flex items-center gap-3">
                      <Node index={i} />
                      <div>
                        <div className="text-xs text-white/55">Step {i + 1}</div>
                        <div className="text-sm font-semibold tracking-[-0.02em]">{step.title}</div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-white/65 leading-relaxed">{step.desc}</p>
                    <div className="mt-3 space-y-1.5 text-[11px] text-white/60">
                      {step.deliverables.map((d) => (
                        <div key={d} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/25" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/60">
              <Chip tone="cyan">Typical timelines</Chip>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                Prototype sprint: 2–4 weeks
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                Production build: 6–12 weeks
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                Operate: monthly cadence
              </span>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ===================================================================================
          SECTION 6 — Proof Grid (ID: creative-proof)
      =================================================================================== */}
      <SectionShell
        id="creative-proof"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">Proof</Chip>
            <Chip tone="cyan">Cases + claims</Chip>
          </div>
        }
        title={
          <>
            Proof-first: <span className="text-white/85">ship</span>, measure, iterate.
          </>
        }
        lead="A mix of case snapshots and technical claims — because Creative Tech is only as good as its deployment reliability."
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {PROOF_TILES.map((t, idx) => {
            const span =
              idx === 0 ? "md:col-span-7" : idx === 1 ? "md:col-span-5" : idx === 2 ? "md:col-span-5" : idx === 3 ? "md:col-span-7" : "md:col-span-6";
            return (
              <div
                key={t.key}
                className={cx(
                  "relative rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden",
                  span
                )}
              >
                <div className="absolute inset-0 bg-[radial-gradient(520px_240px_at_30%_20%,rgba(67,232,255,.12),transparent_60%)] opacity-40" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-white/55">
                        {t.kind === "case" ? "Case snapshot" : "Technical claim"}
                      </div>
                      <div className="mt-1 text-lg font-semibold tracking-[-0.03em]">{t.title}</div>
                      <div className="mt-1 text-sm text-white/70">{t.sub}</div>
                    </div>
                    <span
                      className={cx(
                        "mt-1 inline-flex items-center rounded-full border px-2.5 py-1 text-[10px]",
                        t.kind === "case"
                          ? "border-white/12 bg-white/5 text-white/60"
                          : "border-[rgba(158,243,21,.25)] bg-[rgba(158,243,21,.08)] text-[rgba(222,255,168,.95)]"
                      )}
                    >
                      {t.stat}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs text-white/60">
                    {t.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "rgba(67,232,255,.55)" }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/55">
          <Chip tone="soft">Want similar proof for your use case?</Chip>
          <Button href="#creative-cta" variant="secondary">
            Talk to the team
          </Button>
        </div>
      </SectionShell>

      {/* ===================================================================================
          SECTION 7 — Integration & Delivery (ID: creative-integrations)
      =================================================================================== */}
      <SectionShell
        id="creative-integrations"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">Integration</Chip>
            <Chip tone="cyan">Delivery authority</Chip>
          </div>
        }
        title={
          <>
            Deployment confidence is a <span className="text-white/85">feature</span>.
          </>
        }
        lead="Creative Tech lives or dies by integration. We design the device matrix, input fallbacks, analytics, and updates early — not at the end."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <IntegrationBlock
            className="lg:col-span-6"
            title="Device targets"
            items={INTEGRATIONS.devices}
            dot="cyan"
          />
          <IntegrationBlock
            className="lg:col-span-6"
            title="Inputs"
            items={INTEGRATIONS.inputs}
            dot="green"
          />
          <IntegrationBlock
            className="lg:col-span-6"
            title="Data & measurement"
            items={INTEGRATIONS.data}
            dot="cyan"
          />
          <IntegrationBlock
            className="lg:col-span-6"
            title="Delivery & ops"
            items={INTEGRATIONS.delivery}
            dot="soft"
          />
        </div>
      </SectionShell>

      {/* ===================================================================================
          SECTION 8 — Engagement Models (ID: creative-engagement)
      =================================================================================== */}
      <EngagementSection />

      {/* ===================================================================================
          SECTION 9 — FAQ (ID: creative-faq)
      =================================================================================== */}
      <FAQSection />

      {/* ===================================================================================
          SECTION 10 — Final CTA (ID: creative-cta)
      =================================================================================== */}
      <section id="creative-cta" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-14 sm:pt-16 pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#06041A] p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(700px_320px_at_30%_20%,rgba(67,232,255,.18),transparent_60%),radial-gradient(520px_260px_at_80%_80%,rgba(158,243,21,.10),transparent_60%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="cyan">Describe your idea</Chip>
                <Chip tone="soft">Prototype-first</Chip>
                <Chip tone="green">Production-ready</Chip>
              </div>

              <h2 className="mt-4 text-balance text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em]">
                Let’s build a creative system you can{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(67,232,255,1), rgba(179,247,255,.95), rgba(158,243,21,.75))",
                  }}
                >
                  deploy with confidence
                </span>
                .
              </h2>

              <p className="mt-3 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
                Share your goals, constraints, devices, and timeline. We’ll reply with a prototype-first plan that
                clarifies scope, risk, and what ships.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="primary" onClick={() => scrollToId("creative-cta-form")}>
                  Describe your idea
                </Button>
                <Button variant="secondary" href="mailto:hello@wodh.io">
                  Email the team
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/55">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">NDA-ready</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Runbooks included</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Telemetry hooks</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Global delivery</span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                id="creative-cta-form"
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="text-xs font-medium text-white/75">Quick intake</div>
                <div className="mt-3 space-y-3">
                  <Field label="Project type" placeholder="e.g., WebGL microsite / kiosk / AR / generative tool" />
                  <Field label="Target devices" placeholder="e.g., Web + kiosk + tablet" />
                  <Field label="Timeline" placeholder="e.g., 6–8 weeks" />
                  <Field label="Outcome" placeholder="e.g., measurable engagement + reliable deployment" />
                </div>
                <div className="mt-4 text-[11px] text-white/55">
                  Tip: include any constraints (offline, venue, sensors, analytics requirements).
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-[11px] text-white/60">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT_CYAN }} />
                    response: <span className="text-white/80">fast</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT_GREEN }} />
                    approach: <span className="text-white/80">prototype-first</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                    handover: <span className="text-white/80">clean</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom hairline */}
        <div className="mt-10 h-px w-full bg-white/10" />
        <div className="mt-6 text-xs text-white/45">
          © {new Date().getFullYear()} Wodh. Creative Tech Services — Neon Lab Console.
        </div>
      </section>
    </main>
  );
}

/* =======================================================================================
   Subcomponents
======================================================================================= */

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ModuleCard({
  reduceMotion,
  title,
  status,
  accent,
  io,
  out,
}: {
  reduceMotion: boolean;
  title: string;
  status: string;
  accent: "cyan" | "green";
  io: string[];
  out: string[];
}) {
  const glow =
    accent === "cyan"
      ? "bg-[radial-gradient(280px_160px_at_50%_0%,rgba(67,232,255,.18),transparent_60%)]"
      : "bg-[radial-gradient(280px_160px_at_50%_0%,rgba(158,243,21,.12),transparent_60%)]";

  const badge =
    accent === "cyan"
      ? "border-[rgba(67,232,255,.25)] bg-[rgba(67,232,255,.08)] text-[rgba(179,247,255,.95)]"
      : "border-[rgba(158,243,21,.22)] bg-[rgba(158,243,21,.08)] text-[rgba(222,255,168,.95)]";

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      className="group relative rounded-2xl border border-white/10 bg-[#06041A] p-4 overflow-hidden"
    >
      <div className={cx("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300", glow)} />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="text-sm font-semibold tracking-[-0.02em]">{title}</div>
          <span className={cx("inline-flex items-center rounded-full border px-2 py-1 text-[10px]", badge)}>
            {status}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2 text-[11px] text-white/60">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="text-[10px] text-white/45">Input</div>
            <div className="mt-1 flex flex-wrap gap-2">
              {io.map((x) => (
                <span key={x} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
                  {x}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div className="text-[10px] text-white/45">Output</div>
            <div className="mt-1 flex flex-wrap gap-2">
              {out.map((x) => (
                <span key={x} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
                  {x}
                </span>
              ))}
            </div>
          </div>
        </div>

        {!reduceMotion ? (
          <div className="mt-3 flex items-center gap-2 text-[10px] text-white/45">
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <motion.span
              animate={{ opacity: [0.35, 0.9, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2"
            >
              signal active
            </motion.span>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

function LevelBar({ level, active }: { level: Level; active: boolean }) {
  const bars = [1, 2, 3] as const;
  return (
    <div className="w-full">
      <div className="flex items-center gap-1.5">
        {bars.map((b) => {
          const on = level >= b;
          return (
            <span
              key={b}
              className={cx(
                "h-1.5 flex-1 rounded-full border",
                on
                  ? active
                    ? "border-[rgba(67,232,255,.40)] bg-[rgba(67,232,255,.22)]"
                    : "border-white/18 bg-white/10"
                  : "border-white/10 bg-white/5"
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

function MiniSpec({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#06041A] p-3">
      <div className="text-xs font-medium text-white/75">{title}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.slice(0, 5).map((x) => (
          <span key={x} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

function Node({ index }: { index: number }) {
  const reduceMotion = useReducedMotion() ?? false;
  const delay = index * 0.22;
  return (
    <div className="relative h-9 w-9">
      <div
        className="absolute inset-0 rounded-full border border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)]"
        style={{ boxShadow: "0 0 24px rgba(67,232,255,.18)" }}
      />
      {!reduceMotion ? (
        <motion.div
          className="absolute inset-0 rounded-full border border-[rgba(67,232,255,.45)]"
          initial={{ opacity: 0.0, scale: 0.9 }}
          animate={{ opacity: [0, 0.35, 0], scale: [0.9, 1.25, 1.55] }}
          transition={{ duration: 2.8, repeat: Infinity, delay, ease: "easeInOut" }}
        />
      ) : null}
      <div className="absolute inset-0 grid place-items-center text-xs font-semibold text-white/80">
        {index + 1}
      </div>
    </div>
  );
}

function IntegrationBlock({
  className,
  title,
  items,
  dot,
}: {
  className?: string;
  title: string;
  items: string[];
  dot: "cyan" | "green" | "soft";
}) {
  const dotColor =
    dot === "cyan"
      ? "rgba(67,232,255,.55)"
      : dot === "green"
        ? "rgba(158,243,21,.55)"
        : "rgba(255,255,255,.35)";

  return (
    <div className={cx("rounded-2xl border border-white/10 bg-white/5 p-5", className)}>
      <div className="flex items-center gap-2 text-xs font-medium text-white/75">
        <span className="h-2 w-2 rounded-full" style={{ background: dotColor }} />
        {title}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((x) => (
          <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <div className="text-[11px] font-medium text-white/70">{label}</div>
      <div className="mt-2 rounded-xl border border-white/10 bg-[#050318] px-3 py-2 text-sm text-white/80">
        <span className="text-white/35">{placeholder}</span>
      </div>
    </label>
  );
}

/* =======================================================================================
   Engagement Section (segmented controls)
======================================================================================= */

function EngagementSection() {
  const [active, setActive] = useState<EngagementKey>("sprint");
  const item = useMemo(() => ENGAGEMENTS.find((e) => e.key === active)!, [active]);

  return (
    <SectionShell
      id="creative-engagement"
      eyebrow={
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="soft">Engagement</Chip>
          <Chip tone="cyan">Segmented controls</Chip>
        </div>
      }
      title={
        <>
          Choose how we <span className="text-white/85">engage</span>.
        </>
      }
      lead="Prototype sprint → production build → ongoing lab. Clear deliverables, clean handover, and a system-first workflow."
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-medium text-white/70">Select a model</div>
          <div className="text-[11px] text-white/45">all models are NDA-ready</div>
        </div>

        {/* Segmented control */}
        <div className="mt-4 inline-flex w-full flex-wrap rounded-2xl border border-white/10 bg-[#06041A] p-1">
          {ENGAGEMENTS.map((e) => {
            const isOn = e.key === active;
            return (
              <button
                key={e.key}
                onClick={() => setActive(e.key)}
                className={cx(
                  "flex-1 rounded-xl px-4 py-2 text-sm font-medium transition",
                  isOn
                    ? "bg-[rgba(67,232,255,.14)] text-white border border-[rgba(67,232,255,.25)]"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                {e.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#06041A] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold tracking-[-0.03em]">{item.title}</div>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{item.desc}</p>
              </div>
              <span className="mt-1 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                {item.timeline}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-medium text-white/75">Includes</div>
                <ul className="mt-2 space-y-2 text-xs text-white/60">
                  {item.includes.map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "rgba(67,232,255,.55)" }} />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-medium text-white/75">Best for</div>
                <ul className="mt-2 space-y-2 text-xs text-white/60">
                  {item.bestFor.map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "rgba(158,243,21,.50)" }} />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button href="#creative-cta" variant="primary">
                Start this engagement
              </Button>
              <Button href="#creative-pipeline" variant="secondary">
                See the pipeline
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#06041A] p-5">
            <div className="text-xs font-medium text-white/75">What you get</div>
            <div className="mt-3 space-y-3">
              <DeliverableLine label="Clarity" value="system map + constraints" />
              <DeliverableLine label="Reliability" value="device matrix + QA" />
              <DeliverableLine label="Deployment" value="runbooks + monitoring" />
              <DeliverableLine label="Iteration" value="telemetry + loop" />
            </div>

            <div className="mt-5 h-px w-full bg-white/10" />
            <div className="mt-4 text-[11px] text-white/55 leading-relaxed">
              We’ll recommend the smallest engagement that can safely validate IO and deployment constraints — then scale.
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function DeliverableLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <span className="text-xs text-white/70">{label}</span>
      <span className="text-[11px] text-white/55">{value}</span>
    </div>
  );
}

/* =======================================================================================
   FAQ Section (command palette style)
======================================================================================= */

function FAQSection() {
  const [q, setQ] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return FAQS.map((f, i) => ({ ...f, i }));
    return FAQS.map((f, i) => ({ ...f, i })).filter(
      (f) => f.q.toLowerCase().includes(s) || f.a.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <SectionShell
      id="creative-faq"
      eyebrow={
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="soft">FAQ</Chip>
          <Chip tone="cyan">Command palette</Chip>
        </div>
      }
      title={
        <>
          Ask anything — we’ll keep it <span className="text-white/85">clear</span>.
        </>
      }
      lead="Search and expand. This section is designed to remove delivery doubts early."
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
        <div className="rounded-2xl border border-white/10 bg-[#06041A] px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full" style={{ background: "rgba(67,232,255,.55)" }} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search questions… (prototype, offline, devices, ownership)"
              className="w-full bg-transparent text-sm text-white/80 placeholder:text-white/35 outline-none"
            />
            <span className="text-[11px] text-white/45">{filtered.length}/{FAQS.length}</span>
          </div>
        </div>

        <div className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#06041A] overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-5 text-sm text-white/60">No results. Try different keywords.</div>
          ) : (
            filtered.map((f) => (
              <div key={f.i} className="p-4">
                <button
                  onClick={() => setOpenIdx(openIdx === f.i ? null : f.i)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-semibold tracking-[-0.02em]">{f.q}</div>
                    <span className="mt-1 text-[11px] text-white/45">
                      {openIdx === f.i ? "hide" : "open"}
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openIdx === f.i ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm text-white/70 leading-relaxed">{f.a}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Chip tone="soft">delivery-safe</Chip>
                        <Chip tone="cyan">system clarity</Chip>
                        <Chip tone="green">ops ready</Chip>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ))
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button href="#creative-cta" variant="secondary">
            Still have a question?
          </Button>
          <span className="text-xs text-white/55">We’ll answer with concrete steps and timelines.</span>
        </div>
      </div>
    </SectionShell>
  );
}

