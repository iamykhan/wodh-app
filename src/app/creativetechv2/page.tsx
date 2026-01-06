"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* =======================================================================================
   WODH — CREATIVE TECH SERVICES (Way 2: Cinematic Storyboard)
   - Same Wodh v1 signature structure + section IDs
   - Primary accent: Electric Cyan / Aqua
   - Cinematic “reel + storyboard” feel: frames, captions, scene tags, film grain, vignette
   Sections + IDs (locked):
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
type MomentKey = "webgl" | "installation" | "ar" | "generative" | "realtime3d";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ACCENT_CYAN = "rgba(67, 232, 255, 1)";
const ACCENT_GREEN = "rgba(158, 243, 21, 1)";

/* =======================================================================================
   Content
======================================================================================= */

const PAGE = {
  title: "Creative Tech Services",
  heroLine:
    "Creative technology that turns ideas into interactive realities.",
  heroLead:
    "A studio-built delivery process: prototype, production, deployment, and operation — with performance budgets, telemetry, and runbooks.",
  chips: ["Prototype-first", "Deployment-safe", "Telemetry-ready"],
};

const MOMENTS: Array<{
  key: MomentKey;
  title: string;
  subtitle: string;
  tags: string[];
  caption: string;
  io: { input: string[]; output: string[] };
}> = [
  {
    key: "webgl",
    title: "Interactive WebGL Microsite",
    subtitle: "3D storytelling that loads fast and measures well.",
    tags: ["Scene discipline", "Perf budgets", "Analytics"],
    caption: "Scene → Interaction → Outcome",
    io: { input: ["3D assets", "Copy blocks", "Interaction map"], output: ["Microsite", "Events schema", "Fallback states"] },
  },
  {
    key: "installation",
    title: "Installation System",
    subtitle: "Offline-first kiosks with operator-friendly recovery.",
    tags: ["Kiosk mode", "Remote updates", "Runbooks"],
    caption: "Input → Feedback → Recovery",
    io: { input: ["Content packs", "Sensors", "Device config"], output: ["Kiosk build", "Operator guide", "Monitoring hooks"] },
  },
  {
    key: "ar",
    title: "Lightweight AR Campaign",
    subtitle: "AR flows designed for real devices and real timelines.",
    tags: ["Permission UX", "Fallback content", "Share hooks"],
    caption: "Scan → Experience → Share",
    io: { input: ["Targets", "Props", "CTA flow"], output: ["AR experience", "Landing", "Tracking"] },
  },
  {
    key: "generative",
    title: "Generative Visual Engine",
    subtitle: "Brand-safe variations at scale with guardrails.",
    tags: ["Rules", "Templates", "Review loop"],
    caption: "Rules → Variations → Approvals",
    io: { input: ["Templates", "Brand tokens", "Constraints"], output: ["Exports", "Audit trail", "Pipelines"] },
  },
  {
    key: "realtime3d",
    title: "Realtime 3D Visualizer",
    subtitle: "Data + rules → instant 3D updates.",
    tags: ["Rules engine", "Device matrix", "Exports"],
    caption: "Rules → Render → Export",
    io: { input: ["CAD/3D", "Rules", "Data"], output: ["Visualizer", "Snapshots", "Config states"] },
  },
];

const WHAT_WE_BUILD = [
  {
    chapter: "Chapter 01",
    title: "Interactive brand experiences",
    outcome: "Launch moments people can touch, explore, and remember.",
    uses: ["Microsites", "Product storytelling", "Campaign activations"],
    stack: ["WebGL", "Three.js", "Analytics"],
  },
  {
    chapter: "Chapter 02",
    title: "Event + installation systems",
    outcome: "Kiosk-ready, offline-first deployments with operator sanity.",
    uses: ["Expo kiosks", "Interactive walls", "Museums & retail"],
    stack: ["Kiosk mode", "Remote sync", "Runbooks"],
  },
  {
    chapter: "Chapter 03",
    title: "AR campaigns (lightweight)",
    outcome: "Fast-to-market AR experiences designed for actual devices.",
    uses: ["Filters", "WebAR", "AR previews"],
    stack: ["WebAR", "Tracking", "Landing flows"],
  },
  {
    chapter: "Chapter 04",
    title: "Generative visuals & content engines",
    outcome: "Brand-safe generative systems with guardrails and review loops.",
    uses: ["Templates", "Variations", "Automations"],
    stack: ["Tooling", "Pipelines", "Audit"],
  },
] as const;

type CapabilityRow = {
  key: string;
  title: string;
  desc: string;
  sceneNote: string;
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
    { key: "prototype", label: "Prototype", hint: "Proof the feel + IO" },
    { key: "production", label: "Production", hint: "Harden the build" },
    { key: "deploy", label: "Deploy", hint: "Ship to targets" },
    { key: "operate", label: "Operate", hint: "Update + measure" },
  ];

const CAPABILITIES: CapabilityRow[] = [
  {
    key: "realtime-rendering",
    title: "Real-time rendering",
    desc: "Performance-first visuals under constraints.",
    sceneNote: "Director note: design the budget early, not at the end.",
    tags: ["Perf budget", "LOD", "Shader discipline"],
    levels: { prototype: 3, production: 3, deploy: 2, operate: 2 },
    details: {
      why: "If performance is not designed, it becomes a surprise late in delivery.",
      deliverables: ["Perf budget + targets", "Optimization pass", "Device test matrix"],
      signals: ["Stable FPS targets", "Predictable load times", "Low input latency"],
    },
  },
  {
    key: "interaction-design",
    title: "Interaction design",
    desc: "Inputs → feedback → outcomes. Every action has a reason.",
    sceneNote: "Director note: clarity beats cleverness.",
    tags: ["UX loops", "Micro-feedback", "Error states"],
    levels: { prototype: 3, production: 2, deploy: 2, operate: 1 },
    details: {
      why: "Creative tech succeeds when interaction is obvious, responsive, and forgiving.",
      deliverables: ["Interaction map", "Motion system", "A11y passes"],
      signals: ["Fast comprehension", "Reduced drop-off", "Confident flow"],
    },
  },
  {
    key: "device-sensor-input",
    title: "Device + sensor input",
    desc: "Camera, IMU, depth, QR/NFC — integrated cleanly.",
    sceneNote: "Director note: always plan fallbacks.",
    tags: ["Camera", "IMU", "Depth", "QR/NFC"],
    levels: { prototype: 2, production: 2, deploy: 3, operate: 2 },
    details: {
      why: "Input is where real-world messiness enters — handle it intentionally.",
      deliverables: ["Fallback plan", "Calibration flow", "Permission UX"],
      signals: ["Stable tracking", "Graceful fallbacks", "Low failure rate"],
    },
  },
  {
    key: "web-mobile-delivery",
    title: "Web + mobile delivery",
    desc: "Fast, reliable delivery across browsers and devices.",
    sceneNote: "Director note: ship a baseline you can maintain.",
    tags: ["Cross-browser", "Mobile-first", "Bundle discipline"],
    levels: { prototype: 3, production: 3, deploy: 3, operate: 3 },
    details: {
      why: "Delivery isn’t just ‘it loads’ — it’s speed, stability, and maintainability.",
      deliverables: ["Release checklist", "Monitoring hooks", "Fallback states"],
      signals: ["Consistent LCP", "Low crash rate", "Incremental updates"],
    },
  },
  {
    key: "kiosk-show-control",
    title: "Show-control / kiosk mode",
    desc: "Offline-first deployments with recovery and runbooks.",
    sceneNote: "Director note: events are unforgiving — design resilience.",
    tags: ["Offline", "Autostart", "Remote update"],
    levels: { prototype: 1, production: 2, deploy: 3, operate: 3 },
    details: {
      why: "Events demand stability — the system must run even when networks don’t.",
      deliverables: ["Kiosk runbook", "Recovery flows", "Remote sync strategy"],
      signals: ["Auto-recovery", "Operator confidence", "Stable unattended runs"],
    },
  },
  {
    key: "backend-analytics",
    title: "Backend + analytics",
    desc: "Telemetry, content updates, logs — readable and useful.",
    sceneNote: "Director note: if you can’t measure it, you can’t improve it.",
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
    desc: "Repeatable workflows that keep shipping sustainable.",
    sceneNote: "Director note: tooling is what makes it scalable.",
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
  posterTag: string;
  title: string;
  logline: string;
  builtFor: string[];
  inputs: string[];
  outputs: string[];
  deploy: string[];
};

const TECH_PLAYS: TechPlay[] = [
  {
    key: "microsite-engine",
    posterTag: "POSTER A",
    title: "Interactive Microsite Engine",
    logline: "WebGL storytelling with a content pipeline teams can actually use.",
    builtFor: ["Brand campaigns", "Product launches", "Agency delivery"],
    inputs: ["3D assets", "Copy blocks", "Interaction map"],
    outputs: ["Microsite", "Analytics events", "Fallback states"],
    deploy: ["CDN deploy", "SEO-safe fallback", "A/B-ready hooks"],
  },
  {
    key: "installation-loop",
    posterTag: "POSTER B",
    title: "Installation Loop System",
    logline: "Offline-first kiosk experiences with remote updates + recovery flows.",
    builtFor: ["Expos", "Museums", "Retail activations"],
    inputs: ["Content packs", "Device config", "Sensor IO"],
    outputs: ["Kiosk build", "Operator runbook", "Monitoring hooks"],
    deploy: ["Kiosk mode", "Autostart", "Remote monitoring"],
  },
  {
    key: "realtime-visualizer",
    posterTag: "POSTER C",
    title: "Realtime Visualizer",
    logline: "Rules + data → instant 3D updates, exports, and shareable outputs.",
    builtFor: ["Sales enablement", "Digital twins", "Interactive demos"],
    inputs: ["CAD/3D", "Rules", "Datasets"],
    outputs: ["Visualizer", "Snapshots", "Config states"],
    deploy: ["Web", "Tablet", "Kiosk"],
  },
  {
    key: "ar-campaign-kit",
    posterTag: "POSTER D",
    title: "AR Campaign Kit",
    logline: "AR experience + landing flows + measurable outcomes.",
    builtFor: ["Campaigns", "Packaging activations", "Social integrations"],
    inputs: ["Targets", "Props", "CTA flow"],
    outputs: ["AR experience", "Landing", "Tracking"],
    deploy: ["WebAR", "QR entry", "Share hooks"],
  },
];

const PIPELINE = [
  {
    key: "discover",
    act: "Act I",
    title: "Discover & concept",
    desc: "Clarify outcomes, constraints, and system boundaries.",
    bts: ["System map", "Risks + constraints", "Perf targets"],
  },
  {
    key: "prototype",
    act: "Act I",
    title: "Prototype (fast demo)",
    desc: "Build a real interactive slice to validate IO and feel.",
    bts: ["Clickable slice", "Input plan", "Tech spikes"],
  },
  {
    key: "production",
    act: "Act II",
    title: "Production build",
    desc: "Harden the experience — QA, edge cases, polish.",
    bts: ["QA matrix", "Perf tuning", "Content schema"],
  },
  {
    key: "deploy",
    act: "Act II",
    title: "Deployment",
    desc: "Ship to targets with runbooks and monitoring hooks.",
    bts: ["Deploy plan", "Operator guide", "Monitoring"],
  },
  {
    key: "operate",
    act: "Act III",
    title: "Operate & iterate",
    desc: "Measure, update, and improve safely.",
    bts: ["Telemetry loop", "Update cadence", "Backlog iteration"],
  },
] as const;

const PROOF_TILES = [
  {
    key: "hero-proof",
    size: "xl" as const,
    label: "Hero proof",
    title: "A deployment that feels effortless",
    sub: "Because resilience is designed, not hoped for.",
    bullets: ["Offline-first paths", "Operator runbooks", "Auto-recovery flows", "Telemetry hooks"],
  },
  {
    key: "case-1",
    size: "md" as const,
    label: "Case snapshot",
    title: "Launch microsite",
    sub: "WebGL story + measurable engagement",
    bullets: ["Perf budget discipline", "SEO-safe fallback", "Event schema"],
  },
  {
    key: "case-2",
    size: "md" as const,
    label: "Case snapshot",
    title: "Interactive kiosk",
    sub: "Sensors + realtime feedback loop",
    bullets: ["Calibration UX", "Low-latency feedback", "Operator controls"],
  },
  {
    key: "claim-1",
    size: "sm" as const,
    label: "Technical claim",
    title: "Telemetry built-in",
    sub: "Proof over opinions.",
    bullets: ["Funnels", "Logs", "Privacy-aware tracking"],
  },
  {
    key: "claim-2",
    size: "sm" as const,
    label: "Technical claim",
    title: "Multi-device sync",
    sub: "Orchestrated experiences.",
    bullets: ["Shared state", "Graceful disconnects", "Recovery flows"],
  },
] as const;

const INTEGRATIONS = {
  bands: [
    {
      title: "Delivery targets",
      desc: "Where it runs — defined early, tested often.",
      items: ["Web", "iOS", "Android", "Kiosk", "LED wall", "XR devices"],
      dot: "cyan" as const,
    },
    {
      title: "Inputs",
      desc: "How reality enters the system.",
      items: ["Camera", "IMU", "Depth", "QR/NFC", "APIs", "DMX/OSC"],
      dot: "green" as const,
    },
    {
      title: "Measurement",
      desc: "How we prove and improve.",
      items: ["Telemetry", "Logs", "Dashboards", "A/B hooks", "Audit trails"],
      dot: "cyan" as const,
    },
    {
      title: "Ops & updates",
      desc: "How it stays alive after launch.",
      items: ["Offline-first", "Remote sync", "Runbooks", "Monitoring", "Rollback"],
      dot: "soft" as const,
    },
  ],
};

type EngagementKey = "act1" | "act2" | "act3";
const ENGAGEMENTS: Array<{
  key: EngagementKey;
  label: string;
  title: string;
  desc: string;
  timeline: string;
  includes: string[];
}> = [
  {
    key: "act1",
    label: "Act I — Prototype Sprint",
    title: "Prove the feel + IO",
    desc: "A real interactive slice that validates interaction, inputs, and delivery constraints.",
    timeline: "2–4 weeks",
    includes: ["System map", "Prototype build", "Tech spikes", "Next-step plan"],
  },
  {
    key: "act2",
    label: "Act II — Production Build",
    title: "Ship the system",
    desc: "Harden the build: performance, QA, edge cases, runbooks, and telemetry hooks.",
    timeline: "6–12 weeks",
    includes: ["Production build", "QA & device matrix", "Deploy plan", "Telemetry schema"],
  },
  {
    key: "act3",
    label: "Act III — Ongoing Lab",
    title: "Operate + iterate",
    desc: "Continuous improvements, content updates, and reliability as an ongoing partnership.",
    timeline: "Monthly",
    includes: ["Update cadence", "Monitoring + fixes", "New modules", "Experiment loop"],
  },
];

const FAQS = [
  {
    q: "Can you prototype first?",
    a: "Yes — we recommend a prototype sprint to validate interaction, IO, and deployment constraints before full production.",
  },
  {
    q: "Do you handle kiosks and event installs?",
    a: "We support kiosk deployments with runbooks, recovery flows, and operator-friendly controls — and coordinate with your AV/venue team.",
  },
  {
    q: "Can it run offline?",
    a: "Yes. For kiosks and installations, we design offline-first behavior, cached content packs, and resilient recovery workflows.",
  },
  {
    q: "Who owns the source + assets?",
    a: "You do. We deliver source and production assets per the engagement model, including handover documentation.",
  },
] as const;

/* =======================================================================================
   Primitives
======================================================================================= */

function Chip({
  children,
  tone = "soft",
}: {
  children: React.ReactNode;
  tone?: "soft" | "cyan" | "green" | "neutral";
}) {
  const cls =
    tone === "cyan"
      ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.08)] text-[rgba(179,247,255,.95)]"
      : tone === "green"
        ? "border-[rgba(158,243,21,.35)] bg-[rgba(158,243,21,.08)] text-[rgba(222,255,168,.95)]"
        : tone === "neutral"
          ? "border-white/12 bg-white/6 text-white/75"
          : "border-white/10 bg-white/5 text-white/80";

  return (
    <span className={cx("inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs leading-none", cls)}>
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
   Background (cinematic grain + vignette + soft cyan “stage lights”)
======================================================================================= */

function BackgroundCinematic() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Atmos lights */}
      <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_15%_10%,rgba(67,232,255,.12),transparent_60%),radial-gradient(800px_600px_at_85%_20%,rgba(67,232,255,.10),transparent_55%),radial-gradient(900px_700px_at_55%_90%,rgba(91,45,220,.08),transparent_55%)]" />

      {/* Vignette (film) */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_900px_at_50%_30%,rgba(255,255,255,.06),transparent_60%)] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_900px_at_50%_50%,transparent_35%,rgba(7,5,26,.75)_80%,rgba(7,5,26,.95))]" />

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.085] mix-blend-soft-light [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22300%22%20height=%22300%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22300%22%20height=%22300%22%20filter=%22url(%23n)%22%20opacity=%220.35%22/%3E%3C/svg%3E')]" />

      {/* Slow drifting frame-lines */}
      {!reduceMotion ? (
        <motion.div
          className="absolute -inset-40 opacity-[0.22]"
          animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="h-full w-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <linearGradient id="cinLine" x1="0" y1="0" x2="1200" y2="800">
                <stop stopColor="rgba(67,232,255,.45)" />
                <stop offset="1" stopColor="rgba(67,232,255,0)" />
              </linearGradient>
            </defs>
            {[90, 160, 260, 350, 470, 580, 680].map((y, i) => (
              <path
                key={i}
                d={`M-80 ${y} C 220 ${y - 40}, 560 ${y + 30}, 1280 ${y - 10}`}
                stroke="url(#cinLine)"
                strokeWidth="1"
                opacity="0.45"
              />
            ))}
          </svg>
        </motion.div>
      ) : null}
    </div>
  );
}

/* =======================================================================================
   Page
======================================================================================= */

export default function CreativeTechServices_CinematicStoryboard() {
  const reduceMotion = useReducedMotion() ?? false;

  const [activeMoment, setActiveMoment] = useState<MomentKey>("webgl");
  const moment = useMemo(() => MOMENTS.find((m) => m.key === activeMoment)!, [activeMoment]);

  const [capHover, setCapHover] = useState<string>(CAPABILITIES[0]?.key ?? "");
  const activeCap = useMemo(
    () => CAPABILITIES.find((c) => c.key === capHover) ?? CAPABILITIES[0],
    [capHover]
  );

  const [eng, setEng] = useState<EngagementKey>("act1");
  const engagement = useMemo(() => ENGAGEMENTS.find((e) => e.key === eng)!, [eng]);

  return (
    <main className="relative min-h-screen bg-[#07051A] text-white">
      <BackgroundCinematic />
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-white/10" />

      {/* ===================================================================================
          SECTION 1 — Hero (ID: creative-hero)
      =================================================================================== */}
      <section
        id="creative-hero"
        className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-14 sm:pt-16 pb-12 sm:pb-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left: editorial */}
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="neutral">Creative Tech</Chip>
              <Chip tone="cyan">Cinematic Storyboard</Chip>
              <Chip tone="soft">Reel-first</Chip>
            </div>

            <h1 className="mt-5 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.02]">
              <span className="text-white">Creative technology</span>{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(67,232,255,1), rgba(179,247,255,.95), rgba(255,255,255,.85))",
                }}
              >
                staged like a film
              </span>{" "}
              <span className="text-white">— shipped like a system.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
              {PAGE.heroLead}
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
                Browse posters →
              </Button>
            </div>

            {/* Director slate */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between text-[11px] text-white/55">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT_CYAN }} />
                  slate: <span className="text-white/80">creative-tech</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT_GREEN }} />
                  status: <span className="text-white/80">deploy-ready</span>
                </span>
              </div>
              <div className="mt-2 text-xs text-white/60">
                “Show the system, not just the service.”
              </div>
            </div>
          </div>

          {/* Right: Reel strip */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(700px_360px_at_70%_20%,rgba(67,232,255,.16),transparent_60%),radial-gradient(520px_300px_at_20%_90%,rgba(91,45,220,.10),transparent_60%)]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-white/25" />
                    <span className="text-xs font-medium text-white/75">Storyboard Reel</span>
                  </div>
                  <span className="text-[11px] text-white/45">hover a frame</span>
                </div>

                {/* Reel */}
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {MOMENTS.map((m, i) => (
                    <ReelCard
                      key={m.key}
                      reduceMotion={reduceMotion}
                      moment={m}
                      active={m.key === activeMoment}
                      onEnter={() => setActiveMoment(m.key)}
                      index={i}
                    />
                  ))}
                </div>

                {/* Expanded moment details */}
                <div className="mt-4 rounded-2xl border border-white/10 bg-[#06041A] p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-white/55">Selected scene</div>
                      <div className="mt-1 text-lg font-semibold tracking-[-0.03em]">
                        {moment.title}
                      </div>
                      <div className="mt-1 text-sm text-white/70">{moment.subtitle}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Chip tone="cyan">{moment.caption}</Chip>
                      <Chip tone="soft">Scene tags</Chip>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {moment.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <IOBox title="Input" items={moment.io.input} dot="cyan" />
                    <IOBox title="Output" items={moment.io.output} dot="green" />
                  </div>
                </div>
              </div>
            </div>

            {/* Caption strip */}
            <div className="mt-3 rounded-2xl border border-white/10 bg-[#06041A] p-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/60">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(67,232,255,.65)" }} />
                  reel: <span className="text-white/80">interactive moments</span>
                </span>
                <span className="text-white/35">•</span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                  style: <span className="text-white/80">film frames + captions</span>
                </span>
                <span className="text-white/35">•</span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(158,243,21,.55)" }} />
                  goal: <span className="text-white/80">deploy safely</span>
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
            <Chip tone="cyan">Chapters</Chip>
          </div>
        }
        title={
          <>
            A page that reads like a <span className="text-white/85">storyboard</span>.
          </>
        }
        lead="Each chapter is a deliverable: outcome, use cases, and a stack — framed so decision-makers instantly get what ships."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left narrative rail */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-medium text-white/70">Story beats</div>
              <div className="mt-3 space-y-3">
                {WHAT_WE_BUILD.map((c) => (
                  <a
                    key={c.chapter}
                    href={`#wb-${c.chapter.replace(/\s/g, "").toLowerCase()}`}
                    className="group block rounded-xl border border-white/10 bg-[#06041A] px-3 py-2 hover:bg-white/5 transition"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] text-white/55">{c.chapter}</span>
                      <span className="text-[11px] text-white/45 group-hover:text-white/70">jump →</span>
                    </div>
                    <div className="mt-1 text-sm font-semibold tracking-[-0.02em]">{c.title}</div>
                  </a>
                ))}
              </div>

              <div className="mt-5 h-px w-full bg-white/10" />
              <div className="mt-4 text-xs text-white/60 leading-relaxed">
                Cinematic rule: big editorial moments + small captions, like a film board.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Chip tone="cyan">frames</Chip>
                <Chip tone="soft">captions</Chip>
                <Chip tone="green">signals</Chip>
              </div>
            </div>
          </div>

          {/* Right chapters */}
          <div className="lg:col-span-8 space-y-4">
            {WHAT_WE_BUILD.map((item, idx) => (
              <motion.div
                key={item.chapter}
                id={`wb-${item.chapter.replace(/\s/g, "").toLowerCase()}`}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.03 }}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(640px_280px_at_30%_20%,rgba(67,232,255,.12),transparent_60%)] opacity-45" />
                <div className="relative">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-white/55">{item.chapter}</div>
                      <div className="mt-1 text-xl font-semibold tracking-[-0.03em]">{item.title}</div>
                      <div className="mt-2 text-sm text-white/70 leading-relaxed">{item.outcome}</div>
                    </div>

                    <span className="mt-1 inline-flex items-center rounded-full border border-white/10 bg-[#06041A] px-3 py-1 text-[11px] text-white/60">
                      scene {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-7 rounded-2xl border border-white/10 bg-[#06041A] p-4">
                      <div className="text-xs font-medium text-white/75">Use cases</div>
                      <ul className="mt-2 space-y-1.5 text-xs text-white/60">
                        {item.uses.map((u) => (
                          <li key={u} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/25" />
                            <span>{u}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="sm:col-span-5 rounded-2xl border border-white/10 bg-[#06041A] p-4">
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

                  <div className="mt-4 flex items-center justify-between text-[11px] text-white/55">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-1 w-10 rounded-full" style={{ background: "rgba(67,232,255,.35)" }} />
                      caption
                    </span>
                    <span className="text-white/40">“Outcome → System → Measure”</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
            <Chip tone="cyan">Director’s board</Chip>
          </div>
        }
        title={
          <>
            A capability board with <span className="text-white/85">director notes</span>.
          </>
        }
        lead="Hover a row to see the ‘why’, the deliverables, and the signals. This keeps Creative Tech grounded in reality."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Board */}
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
                          <div className="mt-2 text-[11px] text-white/45 italic">{row.sceneNote}</div>
                        </div>
                        <span
                          className={cx(
                            "mt-0.5 inline-flex h-6 items-center rounded-full border px-2 text-[10px]",
                            active
                              ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-[rgba(179,247,255,.95)]"
                              : "border-white/10 bg-white/5 text-white/55"
                          )}
                        >
                          {active ? "selected" : "scene"}
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
                        <StoryboardLevel level={row.levels[c.key]} active={active} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notes panel */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#06041A] p-5 overflow-hidden">
            <div className="relative">
              <div className="absolute -inset-8 bg-[radial-gradient(520px_320px_at_60%_20%,rgba(67,232,255,.16),transparent_60%)]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-medium text-white/70">Director notes</div>
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
                  <Chip tone="cyan">scene clarity</Chip>
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
            <Chip tone="cyan">Posters</Chip>
          </div>
        }
        title={
          <>
            Productized systems — presented as <span className="text-white/85">posters</span>.
          </>
        }
        lead="Each poster has a logline, defined inputs/outputs, and a deployment shape — so it’s easy to sell and easy to ship."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {TECH_PLAYS.map((p, idx) => (
            <motion.div
              key={p.key}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.03 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
            >
              {/* Poster header */}
              <div className="relative p-5">
                <div className="absolute inset-0 bg-[radial-gradient(680px_320px_at_30%_20%,rgba(67,232,255,.14),transparent_60%)] opacity-70" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[11px] text-white/55">{p.posterTag}</div>
                    <span className="inline-flex items-center rounded-full border border-[rgba(67,232,255,.25)] bg-[rgba(67,232,255,.08)] px-2.5 py-1 text-[10px] text-[rgba(179,247,255,.95)]">
                      system poster
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{p.logline}</p>

                  {/* Frame line */}
                  <div className="mt-4 h-px w-full bg-white/10" />

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <PosterBox title="Built for" items={p.builtFor} />
                    <PosterBox title="Inputs" items={p.inputs} />
                    <PosterBox title="Outputs" items={p.outputs} />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.deploy.map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Poster footer caption */}
              <div className="border-t border-white/10 bg-[#06041A] p-4">
                <div className="flex items-center justify-between gap-3 text-[11px] text-white/55">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1 w-10 rounded-full" style={{ background: "rgba(67,232,255,.35)" }} />
                    caption
                  </span>
                  <span className="text-white/45">“Define IO. Ship clean. Measure outcomes.”</span>
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
            <Chip tone="cyan">Narrative timeline</Chip>
          </div>
        }
        title={
          <>
            A timeline that reads like <span className="text-white/85">acts</span>.
          </>
        }
        lead="The storyboard behind delivery — with behind-the-scenes callouts and concrete artifacts."
      >
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(780px_360px_at_60%_15%,rgba(67,232,255,.14),transparent_60%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Timeline rail */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-white/10 bg-[#06041A] p-5">
                <div className="text-xs font-medium text-white/70">Timeline overview</div>
                <div className="mt-3 space-y-3">
                  {["Act I — Define", "Act II — Build", "Act III — Operate"].map((x) => (
                    <div key={x} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75">
                      {x}
                    </div>
                  ))}
                </div>
                <div className="mt-5 h-px w-full bg-white/10" />
                <div className="mt-4 text-xs text-white/60 leading-relaxed">
                  Cinematic rule: every step has an artifact — not just a label.
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="lg:col-span-8">
              <div className="relative pl-6">
                {/* vertical line */}
                <div className="absolute left-2 top-1 bottom-1 w-px bg-white/10" />
                <div className="space-y-4">
                  {PIPELINE.map((step, i) => (
                    <div key={step.key} className="relative">
                      <div className="absolute left-[-2px] top-5 h-4 w-4 rounded-full border border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)]" />
                      <div className="rounded-2xl border border-white/10 bg-[#06041A] p-5">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="text-[11px] text-white/55">{step.act}</div>
                            <div className="mt-1 text-lg font-semibold tracking-[-0.03em]">{step.title}</div>
                            <div className="mt-2 text-sm text-white/70 leading-relaxed">{step.desc}</div>
                          </div>
                          <span className="mt-1 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/65">
                            step {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="text-xs font-medium text-white/75">Behind the scenes</div>
                            <div className="mt-2 space-y-2 text-xs text-white/60">
                              {step.bts.map((x) => (
                                <div key={x} className="flex items-start gap-2">
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/25" />
                                  <span>{x}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <div className="text-xs font-medium text-white/75">Caption</div>
                            <div className="mt-2 text-xs text-white/60 leading-relaxed">
                              {step.act === "Act I"
                                ? "We define constraints before we design the shine."
                                : step.act === "Act II"
                                  ? "We ship reliability as part of the experience."
                                  : "We treat the experience like a product: measure, update, improve."}
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Chip tone="soft">artifact</Chip>
                              <Chip tone="cyan">system</Chip>
                              <Chip tone="green">signal</Chip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/60">
                <Chip tone="cyan">Typical timelines</Chip>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                  Prototype: 2–4 weeks
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                  Production: 6–12 weeks
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                  Operate: monthly cadence
                </span>
              </div>
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
            <Chip tone="cyan">Collage grid</Chip>
          </div>
        }
        title={
          <>
            A proof collage — big moments, small <span className="text-white/85">claims</span>.
          </>
        }
        lead="A cinematic layout that still reads like engineering: resilience, measurement, deployment confidence."
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {PROOF_TILES.map((t, idx) => {
            const span =
              t.size === "xl"
                ? "md:col-span-12"
                : t.size === "md"
                  ? "md:col-span-6"
                  : "md:col-span-3";
            return (
              <div
                key={t.key}
                className={cx("relative rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden", span)}
              >
                <div className="absolute inset-0 bg-[radial-gradient(760px_320px_at_30%_20%,rgba(67,232,255,.12),transparent_60%)] opacity-40" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-white/55">{t.label}</div>
                      <div className={cx("mt-1 font-semibold tracking-[-0.03em]", t.size === "xl" ? "text-2xl sm:text-3xl" : "text-lg")}>
                        {t.title}
                      </div>
                      <div className="mt-2 text-sm text-white/70">{t.sub}</div>
                    </div>
                    <span className="mt-1 inline-flex items-center rounded-full border border-white/10 bg-[#06041A] px-3 py-1 text-[11px] text-white/60">
                      take {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {t.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "rgba(67,232,255,.55)" }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[11px] text-white/55">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-1 w-10 rounded-full" style={{ background: "rgba(67,232,255,.35)" }} />
                      caption
                    </span>
                    <span className="text-white/45">“Ship it. Measure it. Improve it.”</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button href="#creative-cta" variant="secondary">
            Get a proof plan
          </Button>
          <span className="text-xs text-white/55">We’ll map your constraints and propose a prototype-first deliverable.</span>
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
            <Chip tone="cyan">Ecosystem bands</Chip>
          </div>
        }
        title={
          <>
            The ecosystem is part of the <span className="text-white/85">story</span>.
          </>
        }
        lead="We design device targets, inputs, measurement, and ops as first-class elements — so the experience survives the real world."
      >
        <div className="grid grid-cols-1 gap-4">
          {INTEGRATIONS.bands.map((b) => (
            <div key={b.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(920px_320px_at_25%_20%,rgba(67,232,255,.10),transparent_60%)] opacity-35" />
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        background:
                          b.dot === "cyan"
                            ? "rgba(67,232,255,.55)"
                            : b.dot === "green"
                              ? "rgba(158,243,21,.55)"
                              : "rgba(255,255,255,.35)",
                      }}
                    />
                    {b.title}
                  </div>
                  <div className="mt-2 text-sm text-white/70 leading-relaxed">{b.desc}</div>
                </div>
                <div className="lg:col-span-8 flex flex-wrap gap-2">
                  {b.items.map((x) => (
                    <span
                      key={x}
                      className="rounded-full border border-white/10 bg-[#06041A] px-3 py-1 text-[11px] text-white/70"
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
            <Chip tone="cyan">Acts</Chip>
          </div>
        }
        title={
          <>
            Choose an <span className="text-white/85">act</span>.
          </>
        }
        lead="A simple narrative structure that keeps delivery honest: define → build → operate."
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          {/* Act tabs */}
          <div className="flex flex-wrap gap-2">
            {ENGAGEMENTS.map((e) => {
              const on = e.key === eng;
              return (
                <button
                  key={e.key}
                  onClick={() => setEng(e.key)}
                  className={cx(
                    "rounded-full border px-4 py-2 text-sm font-medium transition",
                    on
                      ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-white"
                      : "border-white/10 bg-[#06041A] text-white/70 hover:text-white hover:bg-white/5"
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
                  <div className="text-lg font-semibold tracking-[-0.03em]">{engagement.title}</div>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">{engagement.desc}</p>
                </div>
                <span className="mt-1 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                  {engagement.timeline}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-medium text-white/75">Includes</div>
                  <ul className="mt-2 space-y-2 text-xs text-white/60">
                    {engagement.includes.map((x) => (
                      <li key={x} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "rgba(67,232,255,.55)" }} />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-medium text-white/75">Caption</div>
                  <div className="mt-2 text-xs text-white/60 leading-relaxed">
                    {eng === "act1"
                      ? "We prove feasibility with a real interactive slice."
                      : eng === "act2"
                        ? "We ship a hardened build with runbooks and telemetry."
                        : "We iterate safely with measurement and updates."}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip tone="soft">handover</Chip>
                    <Chip tone="cyan">reliability</Chip>
                    <Chip tone="green">signals</Chip>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <Button href="#creative-cta" variant="primary">
                  Start this act
                </Button>
                <Button href="#creative-pipeline" variant="secondary">
                  See timeline
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#06041A] p-5">
              <div className="text-xs font-medium text-white/75">What you get</div>
              <div className="mt-3 space-y-3">
                <DeliverableLine label="Clarity" value="constraints + system map" />
                <DeliverableLine label="Craft" value="interaction + polish" />
                <DeliverableLine label="Reliability" value="QA matrix + runbooks" />
                <DeliverableLine label="Proof" value="telemetry + outcomes" />
              </div>
              <div className="mt-5 h-px w-full bg-white/10" />
              <div className="mt-4 text-[11px] text-white/55 leading-relaxed">
                Cinematic approach, engineering delivery: the “story” ends in deployment.
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ===================================================================================
          SECTION 9 — FAQ (ID: creative-faq)
      =================================================================================== */}
      <SectionShell
        id="creative-faq"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">FAQ</Chip>
            <Chip tone="cyan">Soft accordion</Chip>
          </div>
        }
        title={
          <>
            Delivery doubts, answered with <span className="text-white/85">clarity</span>.
          </>
        }
        lead="Short, direct answers — designed to keep the pitch clean."
      >
        <CinematicFAQ />
      </SectionShell>

      {/* ===================================================================================
          SECTION 10 — Final CTA (ID: creative-cta)
      =================================================================================== */}
      <section id="creative-cta" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-14 sm:pt-16 pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#06041A] p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(820px_360px_at_25%_20%,rgba(67,232,255,.18),transparent_60%),radial-gradient(620px_300px_at_80%_80%,rgba(91,45,220,.10),transparent_60%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="cyan">Final nudge</Chip>
                <Chip tone="soft">Storyboard → system</Chip>
                <Chip tone="green">deploy-ready</Chip>
              </div>

              <h2 className="mt-4 text-balance text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em]">
                Let’s storyboard your experience — then{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(67,232,255,1), rgba(179,247,255,.95), rgba(255,255,255,.85))",
                  }}
                >
                  ship it safely
                </span>
                .
              </h2>

              <p className="mt-3 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
                Share the goal, devices, and constraints. We’ll respond with a prototype-first plan that explains what ships, how it deploys, and how we measure outcomes.
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
              <div id="creative-cta-form" className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-medium text-white/75">Quick intake</div>
                <div className="mt-3 space-y-3">
                  <Field label="Project type" placeholder="e.g., WebGL microsite / kiosk / AR / tool" />
                  <Field label="Target devices" placeholder="e.g., Web + kiosk + tablet" />
                  <Field label="Timeline" placeholder="e.g., 6–8 weeks" />
                  <Field label="Outcome" placeholder="e.g., measurable engagement + reliable deployment" />
                </div>
                <div className="mt-4 text-[11px] text-white/55">
                  Include constraints (offline, venue, sensors, analytics requirements).
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-[11px] text-white/60">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT_CYAN }} />
                    tone: <span className="text-white/80">cinematic</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT_GREEN }} />
                    delivery: <span className="text-white/80">systems-first</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                    proof: <span className="text-white/80">measured</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-white/10" />
        <div className="mt-6 text-xs text-white/45">
          © {new Date().getFullYear()} Wodh. Creative Tech Services — Cinematic Storyboard.
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

function FrameBackdrop({ variant }: { variant: MomentKey }) {
  // Pure CSS/SVG vibe (no external images). Each variant shifts the "scene light".
  const bg =
    variant === "webgl"
      ? "bg-[radial-gradient(520px_240px_at_30%_20%,rgba(67,232,255,.26),transparent_60%),radial-gradient(420px_220px_at_80%_90%,rgba(255,255,255,.08),transparent_60%)]"
      : variant === "installation"
        ? "bg-[radial-gradient(520px_240px_at_30%_20%,rgba(158,243,21,.18),transparent_60%),radial-gradient(420px_220px_at_80%_90%,rgba(67,232,255,.12),transparent_60%)]"
        : variant === "ar"
          ? "bg-[radial-gradient(520px_240px_at_30%_20%,rgba(67,232,255,.18),transparent_60%),radial-gradient(420px_220px_at_80%_90%,rgba(91,45,220,.14),transparent_60%)]"
          : variant === "generative"
            ? "bg-[radial-gradient(520px_240px_at_30%_20%,rgba(255,255,255,.10),transparent_60%),radial-gradient(420px_220px_at_80%_90%,rgba(67,232,255,.16),transparent_60%)]"
            : "bg-[radial-gradient(520px_240px_at_30%_20%,rgba(91,45,220,.16),transparent_60%),radial-gradient(420px_220px_at_80%_90%,rgba(67,232,255,.14),transparent_60%)]";

  return (
    <div className={cx("absolute inset-0", bg)}>
      <div className="absolute inset-0 opacity-[0.12] mix-blend-soft-light [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute inset-0 bg-[radial-gradient(520px_240px_at_50%_50%,transparent_35%,rgba(6,4,26,.75)_85%,rgba(6,4,26,.90))]" />
    </div>
  );
}

function ReelCard({
  reduceMotion,
  moment,
  active,
  onEnter,
  index,
}: {
  reduceMotion: boolean;
  moment: (typeof MOMENTS)[number];
  active: boolean;
  onEnter: () => void;
  index: number;
}) {
  return (
    <motion.div
      onMouseEnter={onEnter}
      onFocus={onEnter}
      tabIndex={0}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.03 }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      className={cx(
        "relative min-w-[240px] sm:min-w-[260px] rounded-2xl border bg-[#06041A] overflow-hidden outline-none cursor-pointer",
        active ? "border-[rgba(67,232,255,.35)]" : "border-white/10 hover:border-white/16"
      )}
      style={{ boxShadow: active ? "0 0 26px rgba(67,232,255,.18)" : "none" }}
    >
      <FrameBackdrop variant={moment.key} />
      <div className="relative p-4">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[11px] text-white/55">frame</span>
          <span
            className={cx(
              "inline-flex items-center rounded-full border px-2 py-1 text-[10px]",
              active
                ? "border-[rgba(67,232,255,.25)] bg-[rgba(67,232,255,.08)] text-[rgba(179,247,255,.95)]"
                : "border-white/10 bg-white/5 text-white/55"
            )}
          >
            {active ? "selected" : "hover"}
          </span>
        </div>

        <div className="mt-2 text-sm font-semibold tracking-[-0.02em]">{moment.title}</div>
        <div className="mt-1 text-[11px] text-white/60">{moment.subtitle}</div>

        <div className="mt-3 flex flex-wrap gap-2">
          {moment.tags.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70">
              {t}
            </span>
          ))}
        </div>

        {!reduceMotion ? (
          <motion.div
            className="mt-3 h-[2px] w-full rounded-full bg-white/10 overflow-hidden"
            initial={false}
          >
            <motion.div
              className="h-full w-1/2 rounded-full"
              style={{ background: "rgba(67,232,255,.45)" }}
              animate={{ x: active ? ["-10%", "110%"] : "0%" }}
              transition={{ duration: 1.8, repeat: active ? Infinity : 0, ease: "easeInOut" }}
            />
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}

function IOBox({
  title,
  items,
  dot,
}: {
  title: string;
  items: string[];
  dot: "cyan" | "green";
}) {
  const d = dot === "cyan" ? "rgba(67,232,255,.55)" : "rgba(158,243,21,.55)";
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-xs font-medium text-white/75">
        <span className="h-2 w-2 rounded-full" style={{ background: d }} />
        {title}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((x) => (
          <span key={x} className="rounded-full border border-white/10 bg-[#06041A] px-2.5 py-1 text-[11px] text-white/70">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

function StoryboardLevel({ level, active }: { level: Level; active: boolean }) {
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
                    ? "border-[rgba(67,232,255,.40)] bg-[rgba(67,232,255,.20)]"
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

function PosterBox({ title, items }: { title: string; items: string[] }) {
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

function DeliverableLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <span className="text-xs text-white/70">{label}</span>
      <span className="text-[11px] text-white/55">{value}</span>
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

function CinematicFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#06041A] overflow-hidden">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="p-4">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left outline-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-semibold tracking-[-0.02em]">{f.q}</div>
                  <span className="mt-1 text-[11px] text-white/45">{isOpen ? "hide" : "open"}</span>
                </div>
                <div className="mt-2 text-[11px] text-white/55">
                  caption: “clarity removes friction”
                </div>
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
                      <Chip tone="soft">delivery</Chip>
                      <Chip tone="cyan">system</Chip>
                      <Chip tone="green">deploy</Chip>
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
        <span className="text-xs text-white/55">We’ll answer with concrete steps and timelines.</span>
      </div>
    </div>
  );
}

