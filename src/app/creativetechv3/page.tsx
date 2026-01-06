"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* =======================================================================================
   WODH — CREATIVE TECH SERVICES (Way 3: Modular Product Catalog)
   - Same Wodh v1 signature structure + section IDs
   - Primary accent: Electric Cyan / Aqua
   - Page vibe: “catalog of deployable modules” (filters, compare, detail drawer)
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

type Studio = "Creative Tech";
type CatalogCategory =
  | "Interactive Experiences"
  | "Realtime 3D"
  | "Installations"
  | "AR"
  | "Generative Systems"
  | "Tooling & Pipelines";

type Target = "Web" | "iOS" | "Android" | "Kiosk" | "LED Wall" | "XR Device";
type Input =
  | "Camera"
  | "IMU"
  | "Depth"
  | "QR/NFC"
  | "APIs"
  | "DMX/OSC"
  | "Touch"
  | "Microphone";

type Maturity = "Prototype" | "Production" | "Deploy" | "Operate";
type Complexity = "Lite" | "Standard" | "Advanced";

type Product = {
  id: string;
  studio: Studio;
  category: CatalogCategory;
  name: string;
  subtitle: string;
  outcome: string; // ultra-short
  bullets: string[]; // 3–6 features
  targets: Target[];
  inputs: Input[];
  telemetry: boolean;
  offlineReady: boolean;
  complexity: Complexity;
  maturity: Record<Maturity, 0 | 1 | 2 | 3>;
  typicalTimeline: string; // "2–4w", "6–12w", etc.
  stack: string[];
  deliverables: string[];
};

type CapabilityRow = {
  key: string;
  title: string;
  desc: string;
  tags: string[];
  stages: Record<Maturity, 0 | 1 | 2 | 3>;
  signals: string[];
};

type Engagement = {
  key: "sprint" | "build" | "lab";
  title: string;
  bestFor: string;
  timeline: string;
  includes: string[];
  deliverables: string[];
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ACCENT = "rgba(67,232,255,1)";
const ACCENT_SOFT = "rgba(67,232,255,.16)";
const GREEN = "rgba(158,243,21,1)";

/* =======================================================================================
   Data
======================================================================================= */

const PRODUCTS: Product[] = [
  {
    id: "microsite-engine",
    studio: "Creative Tech",
    category: "Interactive Experiences",
    name: "Interactive Microsite Engine",
    subtitle: "WebGL storytelling with a content pipeline.",
    outcome: "High-impact launch, measurable engagement.",
    bullets: [
      "Scene budget + device matrix",
      "SEO-safe fallback + progressive enhancement",
      "Analytics events + funnel hooks",
      "A/B-ready content structure",
    ],
    targets: ["Web"],
    inputs: ["Touch", "APIs"],
    telemetry: true,
    offlineReady: false,
    complexity: "Standard",
    maturity: { Prototype: 3, Production: 3, Deploy: 3, Operate: 2 },
    typicalTimeline: "4–8 weeks",
    stack: ["Three.js", "WebGL", "GSAP/Framer", "Analytics"],
    deliverables: ["Microsite", "Content schema", "Telemetry events", "Fallback states", "Release checklist"],
  },
  {
    id: "realtime-visualizer",
    studio: "Creative Tech",
    category: "Realtime 3D",
    name: "Realtime 3D Visualizer",
    subtitle: "Rules + data → instant 3D updates.",
    outcome: "Interactive demo that sells and explains.",
    bullets: [
      "Rules engine + config states",
      "Realtime snapshots + export modes",
      "Asset LOD + perf discipline",
      "Shareable outputs",
    ],
    targets: ["Web", "iOS", "Android", "Kiosk"],
    inputs: ["Touch", "APIs"],
    telemetry: true,
    offlineReady: true,
    complexity: "Advanced",
    maturity: { Prototype: 2, Production: 3, Deploy: 3, Operate: 3 },
    typicalTimeline: "6–12 weeks",
    stack: ["WebGL", "Rules engine", "Device QA", "Telemetry"],
    deliverables: ["Visualizer", "Rules schema", "Export pipeline", "Device matrix", "Monitoring hooks"],
  },
  {
    id: "installation-loop",
    studio: "Creative Tech",
    category: "Installations",
    name: "Installation Loop System",
    subtitle: "Offline-first kiosk + remote updates.",
    outcome: "Reliable experience that runs unattended.",
    bullets: [
      "Kiosk mode + autostart",
      "Offline content packs",
      "Remote updates + rollback",
      "Operator runbook + recovery flows",
    ],
    targets: ["Kiosk", "LED Wall"],
    inputs: ["Touch", "Camera", "APIs", "DMX/OSC"],
    telemetry: true,
    offlineReady: true,
    complexity: "Advanced",
    maturity: { Prototype: 2, Production: 3, Deploy: 3, Operate: 3 },
    typicalTimeline: "6–10 weeks",
    stack: ["Kiosk runtime", "Remote sync", "Runbooks", "Monitoring"],
    deliverables: ["Kiosk build", "Operator runbook", "Recovery UX", "Remote update system", "Telemetry dashboard hooks"],
  },
  {
    id: "sensor-stage",
    studio: "Creative Tech",
    category: "Installations",
    name: "Sensor Stage Controller",
    subtitle: "Inputs → show-control behaviors.",
    outcome: "Interactive stage that reacts live.",
    bullets: [
      "Sensor normalization layer",
      "DMX/OSC routing + mapping UI",
      "Latency budget + rehearsal tooling",
      "Fail-safe modes",
    ],
    targets: ["Kiosk", "LED Wall"],
    inputs: ["IMU", "Depth", "Camera", "DMX/OSC", "APIs"],
    telemetry: true,
    offlineReady: true,
    complexity: "Advanced",
    maturity: { Prototype: 2, Production: 2, Deploy: 3, Operate: 2 },
    typicalTimeline: "4–8 weeks",
    stack: ["OSC/DMX", "Mapping UI", "Realtime loop", "Fail-safes"],
    deliverables: ["Controller", "Input mapping UI", "Runbook", "Rehearsal tools", "Fallback behaviors"],
  },
  {
    id: "ar-campaign-kit",
    studio: "Creative Tech",
    category: "AR",
    name: "AR Campaign Kit",
    subtitle: "AR experience + landing + metrics.",
    outcome: "Fast launch with measurable outcomes.",
    bullets: [
      "Permission UX + fallbacks",
      "QR entry + share hooks",
      "Campaign landing flows",
      "Tracking events + dashboards",
    ],
    targets: ["Web", "iOS", "Android"],
    inputs: ["Camera", "Touch", "QR/NFC"],
    telemetry: true,
    offlineReady: false,
    complexity: "Standard",
    maturity: { Prototype: 3, Production: 2, Deploy: 2, Operate: 2 },
    typicalTimeline: "3–6 weeks",
    stack: ["WebAR", "Landing", "Tracking", "Media pipeline"],
    deliverables: ["AR experience", "Landing page", "Tracking schema", "Fallback content", "Launch checklist"],
  },
  {
    id: "generative-brand-engine",
    studio: "Creative Tech",
    category: "Generative Systems",
    name: "Generative Brand Engine",
    subtitle: "Brand-safe variations at scale.",
    outcome: "Consistent creative output, faster iteration.",
    bullets: [
      "Template + token system",
      "Guardrails + approvals",
      "Batch export + audit trail",
      "Content pipelines",
    ],
    targets: ["Web"],
    inputs: ["APIs"],
    telemetry: false,
    offlineReady: false,
    complexity: "Standard",
    maturity: { Prototype: 2, Production: 2, Deploy: 2, Operate: 3 },
    typicalTimeline: "4–10 weeks",
    stack: ["Templates", "Validation", "Pipelines", "Exports"],
    deliverables: ["Template system", "Validation rules", "Export tooling", "Audit logs", "Admin UI"],
  },
  {
    id: "content-pipeline",
    studio: "Creative Tech",
    category: "Tooling & Pipelines",
    name: "Content Pipeline Kit",
    subtitle: "Ship updates without breaking builds.",
    outcome: "Sustainable operations post-launch.",
    bullets: [
      "Content schema + lint rules",
      "Preview builds + staging",
      "Publish workflow + rollback",
      "Asset optimization pipeline",
    ],
    targets: ["Web", "Kiosk"],
    inputs: ["APIs"],
    telemetry: true,
    offlineReady: true,
    complexity: "Standard",
    maturity: { Prototype: 1, Production: 2, Deploy: 2, Operate: 3 },
    typicalTimeline: "2–6 weeks",
    stack: ["Schema", "Validation", "Staging", "Rollbacks"],
    deliverables: ["Content schema", "Publisher workflow", "Preview tooling", "Rollback plan", "Docs + handover"],
  },
];

const CATEGORIES: CatalogCategory[] = [
  "Interactive Experiences",
  "Realtime 3D",
  "Installations",
  "AR",
  "Generative Systems",
  "Tooling & Pipelines",
];

const TARGETS: Target[] = ["Web", "iOS", "Android", "Kiosk", "LED Wall", "XR Device"];
const INPUTS: Input[] = ["Touch", "Camera", "IMU", "Depth", "QR/NFC", "APIs", "DMX/OSC", "Microphone"];
const COMPLEXITY: Complexity[] = ["Lite", "Standard", "Advanced"];
const MATURITY: Maturity[] = ["Prototype", "Production", "Deploy", "Operate"];

const CAPABILITIES: CapabilityRow[] = [
  {
    key: "realtime-rendering",
    title: "Real-time rendering",
    desc: "Performance-first visuals under constraints.",
    tags: ["Perf budget", "LOD", "Shader discipline"],
    stages: { Prototype: 3, Production: 3, Deploy: 2, Operate: 2 },
    signals: ["Stable FPS targets", "Predictable load times", "Low input latency"],
  },
  {
    key: "interaction-design",
    title: "Interaction design",
    desc: "Inputs → feedback → outcomes.",
    tags: ["UX loops", "Micro-feedback", "Error states"],
    stages: { Prototype: 3, Production: 2, Deploy: 2, Operate: 1 },
    signals: ["Fast comprehension", "Reduced drop-off", "Confident flow"],
  },
  {
    key: "device-input",
    title: "Device + sensor input",
    desc: "Camera, IMU, depth, QR/NFC — with fallbacks.",
    tags: ["Calibration", "Permissions", "Fallbacks"],
    stages: { Prototype: 2, Production: 2, Deploy: 3, Operate: 2 },
    signals: ["Stable tracking", "Graceful fallbacks", "Low failure rate"],
  },
  {
    key: "delivery",
    title: "Web + mobile delivery",
    desc: "Speed, stability, maintainability.",
    tags: ["Cross-browser", "Mobile-first", "Bundle discipline"],
    stages: { Prototype: 3, Production: 3, Deploy: 3, Operate: 3 },
    signals: ["Consistent LCP", "Low crash rate", "Incremental updates"],
  },
  {
    key: "kiosk",
    title: "Kiosk / show-control",
    desc: "Offline-first with runbooks and recovery.",
    tags: ["Offline", "Autostart", "Remote update"],
    stages: { Prototype: 1, Production: 2, Deploy: 3, Operate: 3 },
    signals: ["Auto-recovery", "Operator confidence", "Stable unattended runs"],
  },
  {
    key: "telemetry",
    title: "Telemetry + analytics",
    desc: "Measure, prove, iterate.",
    tags: ["Event schema", "Dashboards", "Privacy-aware"],
    stages: { Prototype: 1, Production: 2, Deploy: 2, Operate: 3 },
    signals: ["Readable funnels", "Actionable insights", "Safe data handling"],
  },
  {
    key: "pipelines",
    title: "Tooling + pipelines",
    desc: "Repeatable workflows that scale.",
    tags: ["Validation", "Automation", "Guardrails"],
    stages: { Prototype: 1, Production: 2, Deploy: 2, Operate: 3 },
    signals: ["Fewer regressions", "Faster updates", "Lower ops cost"],
  },
];

const PIPELINE = [
  { step: "01", title: "Discover & concept", desc: "Outcomes, constraints, and system boundaries.", artifacts: ["System map", "Risks + constraints", "Perf targets"] },
  { step: "02", title: "Prototype sprint", desc: "A real interactive slice to validate IO + feel.", artifacts: ["Clickable slice", "Input plan", "Tech spikes"] },
  { step: "03", title: "Production build", desc: "Harden the build: QA, edge cases, polish.", artifacts: ["QA matrix", "Perf tuning", "Content schema"] },
  { step: "04", title: "Deployment", desc: "Ship to targets with runbooks and monitoring.", artifacts: ["Deploy plan", "Operator guide", "Monitoring hooks"] },
  { step: "05", title: "Operate & iterate", desc: "Measure, update, improve safely.", artifacts: ["Telemetry loop", "Update cadence", "Backlog iteration"] },
] as const;

const ENGAGEMENTS: Engagement[] = [
  {
    key: "sprint",
    title: "Prototype Sprint",
    bestFor: "Validating interaction, IO, and feasibility fast.",
    timeline: "2–4 weeks",
    includes: ["System map", "Prototype build", "Tech spikes", "Next-step plan"],
    deliverables: ["Prototype repo", "Constraints report", "Device test plan", "Scope + timeline for production"],
  },
  {
    key: "build",
    title: "Production Build",
    bestFor: "Shipping a hardened system to real targets.",
    timeline: "6–12 weeks",
    includes: ["Production build", "QA matrix", "Deploy plan", "Telemetry schema"],
    deliverables: ["Production release", "Runbooks", "Monitoring hooks", "Handover docs"],
  },
  {
    key: "lab",
    title: "Ongoing Lab / Retainer",
    bestFor: "Continuous updates, experiments, and ops support.",
    timeline: "Monthly",
    includes: ["Update cadence", "Monitoring + fixes", "New modules", "Experiment loop"],
    deliverables: ["Release notes cadence", "Ops dashboard", "Backlog iterations", "New module roadmap"],
  },
];

const FAQS = [
  { q: "Can you build a prototype first?", a: "Yes — we recommend a prototype sprint to validate interaction, IO, and deployment constraints before full production." },
  { q: "Do you handle on-site installs or kiosks?", a: "We support kiosk deployments with runbooks, recovery flows, operator-friendly controls, and coordination with your AV/venue team." },
  { q: "Can it run offline?", a: "Yes. For installations we design offline-first behavior, cached content packs, resilient recovery workflows, and safe update/rollback paths." },
  { q: "What devices do you support?", a: "Web, mobile, kiosks, LED walls, and XR devices — we define a device matrix early and test against it continuously." },
  { q: "Who owns the source + assets?", a: "You do. We deliver source and production assets per engagement model, plus handover documentation and runbooks." },
] as const;

/* =======================================================================================
   UI Primitives
======================================================================================= */

function Chip({
  children,
  tone = "soft",
  onClick,
  active,
}: {
  children: React.ReactNode;
  tone?: "soft" | "cyan" | "green" | "neutral";
  onClick?: () => void;
  active?: boolean;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs leading-none transition";
  const cls =
    tone === "cyan"
      ? cx(
          "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.08)] text-[rgba(179,247,255,.95)] hover:bg-[rgba(67,232,255,.12)]",
          active && "bg-[rgba(67,232,255,.14)]"
        )
      : tone === "green"
      ? cx(
          "border-[rgba(158,243,21,.35)] bg-[rgba(158,243,21,.08)] text-[rgba(222,255,168,.95)] hover:bg-[rgba(158,243,21,.12)]",
          active && "bg-[rgba(158,243,21,.14)]"
        )
      : tone === "neutral"
      ? cx("border-white/12 bg-white/6 text-white/75 hover:bg-white/10", active && "bg-white/12")
      : cx("border-white/10 bg-white/5 text-white/80 hover:bg-white/8", active && "bg-white/10");

  const Comp: any = onClick ? "button" : "span";

  return (
    <Comp onClick={onClick} className={cx(base, cls)} type={onClick ? "button" : undefined}>
      <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
      {children}
    </Comp>
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
   Background
======================================================================================= */

function BackgroundCatalog() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_15%_10%,rgba(67,232,255,.12),transparent_60%),radial-gradient(900px_650px_at_85%_20%,rgba(67,232,255,.10),transparent_55%),radial-gradient(900px_700px_at_55%_95%,rgba(91,45,220,.08),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.10] mix-blend-soft-light [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_900px_at_50%_35%,transparent_38%,rgba(7,5,26,.72)_80%,rgba(7,5,26,.92))]" />
      {!reduceMotion ? (
        <motion.div
          className="absolute -inset-40 opacity-[0.20]"
          animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="h-full w-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <linearGradient id="catLine" x1="0" y1="0" x2="1200" y2="800">
                <stop stopColor="rgba(67,232,255,.42)" />
                <stop offset="1" stopColor="rgba(67,232,255,0)" />
              </linearGradient>
            </defs>
            {[110, 190, 270, 360, 470, 590, 690].map((y, i) => (
              <path
                key={i}
                d={`M-80 ${y} C 220 ${y - 40}, 560 ${y + 30}, 1280 ${y - 10}`}
                stroke="url(#catLine)"
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
   Page
======================================================================================= */

export default function CreativeTechServices_ModularProductCatalog() {
  const reduceMotion = useReducedMotion();

  // Catalog state
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CatalogCategory | "All">("All");
  const [targets, setTargets] = useState<Set<Target>>(new Set());
  const [inputs, setInputs] = useState<Set<Input>>(new Set());
  const [complexity, setComplexity] = useState<Complexity | "All">("All");
  const [requireTelemetry, setRequireTelemetry] = useState(false);
  const [offlineOnly, setOfflineOnly] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Compare
  const [compare, setCompare] = useState<Set<string>>(new Set());

  const selected = useMemo(
    () => PRODUCTS.find((p) => p.id === selectedId) ?? null,
    [selectedId]
  );

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();

    return PRODUCTS.filter((p) => {
      if (cat !== "All" && p.category !== cat) return false;
      if (complexity !== "All" && p.complexity !== complexity) return false;
      if (requireTelemetry && !p.telemetry) return false;
      if (offlineOnly && !p.offlineReady) return false;

      if (targets.size) {
        const ok = [...targets].every((t) => p.targets.includes(t));
        if (!ok) return false;
      }
      if (inputs.size) {
        const ok = [...inputs].every((i) => p.inputs.includes(i));
        if (!ok) return false;
      }

      if (!qq) return true;
      const hay = [
        p.name,
        p.subtitle,
        p.outcome,
        p.category,
        p.targets.join(" "),
        p.inputs.join(" "),
        p.stack.join(" "),
        p.bullets.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(qq);
    });
  }, [q, cat, targets, inputs, complexity, requireTelemetry, offlineOnly]);

  const compareList = useMemo(() => {
    const items = PRODUCTS.filter((p) => compare.has(p.id));
    return items.slice(0, 2);
  }, [compare]);

  const compareEnabled = compareList.length === 2;

  // Sticky header anchor behavior (optional quality)
  const headerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // No-op; placeholder for future.
  }, []);

  function toggleSet<T>(set: Set<T>, value: T, setter: (s: Set<T>) => void) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  }

  function clearFilters() {
    setQ("");
    setCat("All");
    setTargets(new Set());
    setInputs(new Set());
    setComplexity("All");
    setRequireTelemetry(false);
    setOfflineOnly(false);
  }

  function toggleCompare(id: string) {
    setCompare((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        if (next.size >= 2) {
          // replace the oldest-ish: remove first iterated
          const first = next.values().next().value as string | undefined;
          if (first) next.delete(first);
        }
        next.add(id);
      }
      return next;
    });
  }

  return (
    <main className="relative min-h-screen bg-[#07051A] text-white">
      <BackgroundCatalog />
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-white/10" />

      {/* ===================================================================================
          SECTION 1 — Hero (ID: creative-hero)
      =================================================================================== */}
      <section
        id="creative-hero"
        className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-14 sm:pt-16 pb-12 sm:pb-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left */}
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="neutral">Creative Tech</Chip>
              <Chip tone="cyan">Modular Product Catalog</Chip>
              <Chip tone="soft">Deployable modules</Chip>
            </div>

            <h1 className="mt-5 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.02]">
              <span className="text-white">Pick modules.</span>{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(67,232,255,1), rgba(179,247,255,.95), rgba(255,255,255,.85))",
                }}
              >
                Ship systems.
              </span>{" "}
              <span className="text-white">Measure outcomes.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
              Creative technology that turns ideas into interactive realities — delivered as a catalog of proven building blocks:
              inputs, targets, telemetry, offline behavior, and runbooks.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Chip tone="soft">Prototype-first</Chip>
              <Chip tone="cyan">Telemetry-ready</Chip>
              <Chip tone="green">Offline-capable</Chip>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="#creative-tech-plays" variant="primary">
                Browse modules
              </Button>
              <Button href="#creative-capability-matrix" variant="secondary">
                Capability matrix
              </Button>
              <Button href="#creative-cta" variant="ghost">
                Start a project →
              </Button>
            </div>

            {/* Compare hint */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between text-[11px] text-white/55">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                  tip: <span className="text-white/80">select 2 modules to compare</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
                  focus: <span className="text-white/80">deployment confidence</span>
                </span>
              </div>
              <div className="mt-2 text-xs text-white/60">
                Catalog-first design helps buyers choose a clear deliverable — not a vague “service”.
              </div>
            </div>
          </div>

          {/* Right: Catalog console */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(720px_360px_at_70%_20%,rgba(67,232,255,.16),transparent_60%),radial-gradient(520px_300px_at_20%_90%,rgba(91,45,220,.10),transparent_60%)]" />
              <div className="relative" ref={headerRef}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-white/25" />
                    <span className="text-xs font-medium text-white/75">Catalog Console</span>
                  </div>
                  <span className="text-[11px] text-white/45">{filtered.length} modules</span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-7">
                    <SearchInput value={q} onChange={setQ} placeholder="Search modules, targets, inputs, stacks…" />
                  </div>
                  <div className="sm:col-span-5">
                    <SelectPill
                      label="Category"
                      value={cat}
                      options={["All", ...CATEGORIES]}
                      onChange={(v) => setCat(v as any)}
                    />
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <SelectPill
                    label="Complexity"
                    value={complexity}
                    options={["All", ...COMPLEXITY]}
                    onChange={(v) => setComplexity(v as any)}
                  />
                  <TogglePill label="Telemetry" value={requireTelemetry} onChange={setRequireTelemetry} />
                  <TogglePill label="Offline-ready" value={offlineOnly} onChange={setOfflineOnly} />
                  <Button variant="ghost" onClick={clearFilters}>
                    Reset
                  </Button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <MultiPick
                    title="Targets"
                    items={TARGETS}
                    picked={targets}
                    onToggle={(t) => toggleSet(targets, t, setTargets)}
                  />
                  <MultiPick
                    title="Inputs"
                    items={INPUTS}
                    picked={inputs}
                    onToggle={(i) => toggleSet(inputs, i, setInputs)}
                  />
                </div>

                {/* Compare dock */}
                <div className="mt-4 rounded-2xl border border-white/10 bg-[#06041A] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-medium text-white/80">Compare</div>
                      <div className="mt-1 text-[11px] text-white/55">
                        Select up to <span className="text-white/80">2</span> modules to compare IO, deployment, and maturity.
                      </div>
                    </div>
                    <span
                      className={cx(
                        "inline-flex items-center rounded-full border px-3 py-1 text-[11px]",
                        compareEnabled
                          ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-white"
                          : "border-white/10 bg-white/5 text-white/55"
                      )}
                    >
                      {compareList.length}/2
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <CompareSlot product={compareList[0]} />
                    <CompareSlot product={compareList[1]} />
                  </div>

                  {compareEnabled ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          // open detail drawer to a synthetic compare view:
                          setSelectedId(compareList[0].id);
                        }}
                      >
                        Compare details
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => setCompare(new Set())}
                      >
                        Clear compare
                      </Button>
                    </div>
                  ) : (
                    <div className="mt-3 text-[11px] text-white/50">
                      Tip: use filters to narrow down to deployment constraints first (targets + offline), then choose the module.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-[#06041A] p-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/60">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                  catalog: <span className="text-white/80">modules + outcomes</span>
                </span>
                <span className="text-white/35">•</span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(255,255,255,.35)" }} />
                  buyer-ready: <span className="text-white/80">clear deliverables</span>
                </span>
                <span className="text-white/35">•</span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "rgba(158,243,21,.55)" }} />
                  ops-ready: <span className="text-white/80">runbooks + telemetry</span>
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
            <Chip tone="cyan">Catalog categories</Chip>
          </div>
        }
        title={
          <>
            A modular library across <span className="text-white/85">experiences</span>, not one-offs.
          </>
        }
        lead="These categories map to buyer intent and deployment reality. Pick a category to jump into the catalog."
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Categories */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.map((c, idx) => (
              <motion.button
                key={c}
                type="button"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.03 }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                onClick={() => {
                  setCat(c);
                  scrollToId("creative-tech-plays");
                }}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-5 text-left overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(640px_260px_at_30%_20%,rgba(67,232,255,.12),transparent_60%)] opacity-55" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-white/75">{c}</span>
                    <span className="rounded-full border border-white/10 bg-[#06041A] px-3 py-1 text-[11px] text-white/60">
                      {PRODUCTS.filter((p) => p.category === c).length} modules
                    </span>
                  </div>
                  <div className="mt-3 text-sm text-white/70">
                    {categoryLine(c)}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {categoryTags(c).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-[11px] text-white/55">
                    click to filter & browse →
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: Quick facts */}
          <div className="md:col-span-4 rounded-2xl border border-white/10 bg-[#06041A] p-5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(520px_320px_at_60%_20%,rgba(67,232,255,.14),transparent_60%)] opacity-60" />
            <div className="relative">
              <div className="text-xs font-medium text-white/75">How we package work</div>
              <div className="mt-3 space-y-3">
                <StatLine label="Modules" value={`${PRODUCTS.length}`} />
                <StatLine label="Telemetry-ready" value={`${PRODUCTS.filter((p) => p.telemetry).length}`} />
                <StatLine label="Offline-capable" value={`${PRODUCTS.filter((p) => p.offlineReady).length}`} />
                <StatLine label="Device targets" value={`${TARGETS.length}`} />
              </div>
              <div className="mt-5 h-px w-full bg-white/10" />
              <div className="mt-4 text-xs text-white/60 leading-relaxed">
                This catalog is a starting point. We combine modules into a complete system tuned to your constraints.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Chip tone="cyan">deliverables</Chip>
                <Chip tone="soft">runbooks</Chip>
                <Chip tone="green">signals</Chip>
              </div>
            </div>
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
            <Chip tone="cyan">Capability matrix</Chip>
          </div>
        }
        title={
          <>
            The matrix that makes Creative Tech <span className="text-white/85">serious</span>.
          </>
        }
        lead="Stages map to: Prototype → Production → Deploy → Operate. Hover a row to see signals."
      >
        <CapabilityMatrix reduceMotion={reduceMotion} />
      </SectionShell>

      {/* ===================================================================================
          SECTION 4 — Tech Plays (ID: creative-tech-plays)
          (Catalog grid with filters + compare + detail drawer)
      =================================================================================== */}
      <SectionShell
        id="creative-tech-plays"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">Catalog</Chip>
            <Chip tone="cyan">Modules</Chip>
          </div>
        }
        title={
          <>
            Browse modules like products — <span className="text-white/85">choose</span> a deliverable.
          </>
        }
        lead="Each module includes inputs, targets, maturity, and deliverables. This is how Creative Tech ships reliably."
      >
        {/* Catalog bar */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="cyan" active={cat === "All"} onClick={() => setCat("All")}>
                All
              </Chip>
              {CATEGORIES.map((c) => (
                <Chip key={c} tone="soft" active={cat === c} onClick={() => setCat(c)}>
                  {c}
                </Chip>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              <div className="lg:col-span-6">
                <SearchInput value={q} onChange={setQ} placeholder="Search modules…" />
              </div>
              <div className="lg:col-span-3">
                <SelectPill
                  label="Complexity"
                  value={complexity}
                  options={["All", ...COMPLEXITY]}
                  onChange={(v) => setComplexity(v as any)}
                />
              </div>
              <div className="lg:col-span-3 flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#06041A] px-4 py-3">
                <div className="text-xs text-white/70">
                  Results: <span className="text-white/90 font-medium">{filtered.length}</span>
                </div>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[11px] text-white/60 hover:text-white/80 transition"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              <div className="lg:col-span-5">
                <MultiPick
                  title="Targets"
                  items={TARGETS}
                  picked={targets}
                  onToggle={(t) => toggleSet(targets, t, setTargets)}
                />
              </div>
              <div className="lg:col-span-5">
                <MultiPick
                  title="Inputs"
                  items={INPUTS}
                  picked={inputs}
                  onToggle={(i) => toggleSet(inputs, i, setInputs)}
                />
              </div>
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-white/10 bg-[#06041A] p-4">
                  <div className="text-xs font-medium text-white/75">Requirements</div>
                  <div className="mt-3 space-y-2">
                    <ToggleRow
                      label="Telemetry"
                      value={requireTelemetry}
                      onChange={setRequireTelemetry}
                    />
                    <ToggleRow
                      label="Offline-ready"
                      value={offlineOnly}
                      onChange={setOfflineOnly}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Catalog grid */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((p, idx) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  reduceMotion={reduceMotion}
                  index={idx}
                  onOpen={() => setSelectedId(p.id)}
                  onCompare={() => toggleCompare(p.id)}
                  compared={compare.has(p.id)}
                />
              ))}
              {filtered.length === 0 ? (
                <div className="sm:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="text-sm font-semibold">No modules match.</div>
                  <div className="mt-2 text-sm text-white/70">
                    Try removing constraints (targets/inputs) or clearing filters.
                  </div>
                  <div className="mt-4">
                    <Button variant="secondary" onClick={clearFilters}>
                      Clear filters
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Side: Compare panel */}
          <div className="md:col-span-4">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-[#06041A] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium text-white/75">Compare</div>
                    <div className="mt-1 text-[11px] text-white/55">
                      Choose <span className="text-white/80">2</span> modules to compare maturity + deployment shape.
                    </div>
                  </div>
                  <span
                    className={cx(
                      "inline-flex items-center rounded-full border px-3 py-1 text-[11px]",
                      compareEnabled
                        ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-white"
                        : "border-white/10 bg-white/5 text-white/55"
                    )}
                  >
                    {compareList.length}/2
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <CompareTile product={compareList[0]} />
                  <CompareTile product={compareList[1]} />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    variant={compareEnabled ? "secondary" : "ghost"}
                    onClick={() => {
                      if (!compareEnabled) return;
                      // open drawer on first item; compare table rendered inside drawer if compareEnabled
                      setSelectedId(compareList[0].id);
                    }}
                  >
                    {compareEnabled ? "Open compare view" : "Pick two modules"}
                  </Button>
                  <Button variant="ghost" onClick={() => setCompare(new Set())}>
                    Clear
                  </Button>
                </div>

                <div className="mt-4 h-px w-full bg-white/10" />
                <div className="mt-4 text-[11px] text-white/55">
                  Decision rule: pick deployment constraints first (targets + offline), then choose the module.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-medium text-white/75">Want a custom bundle?</div>
                <div className="mt-2 text-sm text-white/70 leading-relaxed">
                  We combine modules into a single system — with a pipeline, runbooks, and telemetry.
                </div>
                <div className="mt-4">
                  <Button href="#creative-cta" variant="primary">
                    Describe your idea
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Drawer */}
        <AnimatePresence>
          {selected ? (
            <ProductDrawer
              product={selected}
              onClose={() => setSelectedId(null)}
              compareEnabled={compareEnabled}
              compare={compareList}
              onPick={(id) => setSelectedId(id)}
              reduceMotion={reduceMotion}
            />
          ) : null}
        </AnimatePresence>
      </SectionShell>

      {/* ===================================================================================
          SECTION 5 — Shared Pipeline (ID: creative-pipeline)
      =================================================================================== */}
      <SectionShell
        id="creative-pipeline"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">Shared pipeline</Chip>
            <Chip tone="cyan">Module delivery</Chip>
          </div>
        }
        title={
          <>
            How modules become a <span className="text-white/85">shipped system</span>.
          </>
        }
        lead="Same connected-track logic as your other pages — tuned for Creative Tech: prototypes, deployment, and ops."
      >
        <ConnectedPipeline reduceMotion={reduceMotion} />
      </SectionShell>

      {/* ===================================================================================
          SECTION 6 — Proof Grid (ID: creative-proof)
      =================================================================================== */}
      <SectionShell
        id="creative-proof"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">Proof</Chip>
            <Chip tone="cyan">Signals</Chip>
          </div>
        }
        title={
          <>
            Proof is <span className="text-white/85">measurable</span>: reliability, telemetry, resilience.
          </>
        }
        lead="A catalog-driven approach makes outcomes and constraints explicit — which reduces risk."
      >
        <ProofGrid />
      </SectionShell>

      {/* ===================================================================================
          SECTION 7 — Integration & Delivery (ID: creative-integrations)
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
            Devices and inputs are part of the <span className="text-white/85">spec</span>.
          </>
        }
        lead="Because Creative Tech lives or dies by deployment."
      >
        <IntegrationBands />
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
            Choose a model, still get the <span className="text-white/85">system</span>.
          </>
        }
        lead="Prototype-first, production build, or ongoing lab — each includes delivery artifacts and handover."
      >
        <EngagementCards reduceMotion={reduceMotion} />
      </SectionShell>

      {/* ===================================================================================
          SECTION 9 — FAQ (ID: creative-faq)
      =================================================================================== */}
      <SectionShell
        id="creative-faq"
        eyebrow={
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="soft">FAQ</Chip>
            <Chip tone="cyan">Answers</Chip>
          </div>
        }
        title={
          <>
            Practical answers for <span className="text-white/85">buyers</span>.
          </>
        }
        lead="Short, direct, and deployment-aware."
      >
        <FAQAccordion />
      </SectionShell>

      {/* ===================================================================================
          SECTION 10 — Final CTA (ID: creative-cta)
      =================================================================================== */}
      <section id="creative-cta" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-14 sm:pt-16 pb-20">
        <FinalCTA />
        <div className="mt-10 h-px w-full bg-white/10" />
        <div className="mt-6 text-xs text-white/45">
          © {new Date().getFullYear()} Wodh. Creative Tech Services — Modular Product Catalog.
        </div>
      </section>
    </main>
  );
}

/* =======================================================================================
   Helpers
======================================================================================= */

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function categoryLine(c: CatalogCategory) {
  switch (c) {
    case "Interactive Experiences":
      return "Launch-ready interactive experiences designed for speed, stability, and measurement.";
    case "Realtime 3D":
      return "Realtime visual systems that respond to data, rules, and user choices.";
    case "Installations":
      return "Offline-first installations with show-control, recovery flows, and runbooks.";
    case "AR":
      return "Lightweight AR designed for real devices, permission UX, and fallbacks.";
    case "Generative Systems":
      return "Brand-safe generative engines with guardrails, templates, and approvals.";
    case "Tooling & Pipelines":
      return "Tooling that makes shipping and updating sustainable post-launch.";
  }
}

function categoryTags(c: CatalogCategory) {
  switch (c) {
    case "Interactive Experiences":
      return ["WebGL", "Analytics", "Launch playbooks"];
    case "Realtime 3D":
      return ["Rules", "Exports", "Device matrix"];
    case "Installations":
      return ["Offline", "Runbooks", "Remote updates"];
    case "AR":
      return ["Camera", "Fallbacks", "Share hooks"];
    case "Generative Systems":
      return ["Templates", "Guardrails", "Audit"];
    case "Tooling & Pipelines":
      return ["Schema", "Validation", "Rollbacks"];
  }
}

/* =======================================================================================
   Catalog UI
======================================================================================= */

function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#06041A] px-4 py-3">
      <div className="text-[11px] text-white/55">Search</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full bg-transparent text-sm text-white/85 placeholder:text-white/30 outline-none"
      />
    </div>
  );
}

function SelectPill({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: any;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#06041A] px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[11px] text-white/55">{label}</div>
        <div className="text-[11px] text-white/40">▼</div>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-transparent text-sm text-white/85 outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#07051A]">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function TogglePill({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={cx(
        "rounded-full border px-4 py-2 text-sm font-medium transition",
        value
          ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-white"
          : "border-white/10 bg-[#06041A] text-white/70 hover:text-white hover:bg-white/5"
      )}
    >
      {label}
    </button>
  );
}

function ToggleRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={cx(
        "w-full rounded-xl border px-3 py-2 text-left text-xs transition",
        value
          ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-white"
          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/8"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span>{label}</span>
        <span
          className={cx(
            "inline-flex h-5 w-9 items-center rounded-full border p-0.5 transition",
            value ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.14)]" : "border-white/10 bg-white/5"
          )}
        >
          <span
            className={cx(
              "h-4 w-4 rounded-full transition",
              value ? "translate-x-4" : "translate-x-0",
              value ? "bg-white" : "bg-white/35"
            )}
          />
        </span>
      </div>
    </button>
  );
}

function MultiPick<T extends string>({
  title,
  items,
  picked,
  onToggle,
}: {
  title: string;
  items: T[];
  picked: Set<T>;
  onToggle: (v: T) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#06041A] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-medium text-white/75">{title}</div>
        <span className="text-[11px] text-white/45">{picked.size} selected</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((x) => {
          const on = picked.has(x);
          return (
            <button
              key={x}
              type="button"
              onClick={() => onToggle(x)}
              className={cx(
                "rounded-full border px-3 py-1 text-[11px] transition",
                on
                  ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-white"
                  : "border-white/10 bg-white/5 text-white/70 hover:bg-white/8"
              )}
            >
              {x}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StatLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <span className="text-xs text-white/70">{label}</span>
      <span className="text-xs font-medium text-white/85">{value}</span>
    </div>
  );
}

/* =======================================================================================
   Compare Components
======================================================================================= */

function CompareSlot({ product }: { product?: Product }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 min-h-[88px]">
      {product ? (
        <>
          <div className="text-xs font-medium text-white/85">{product.name}</div>
          <div className="mt-1 text-[11px] text-white/55">{product.category}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.offlineReady ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70">
                Offline
              </span>
            ) : null}
            {product.telemetry ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70">
                Telemetry
              </span>
            ) : null}
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70">
              {product.typicalTimeline}
            </span>
          </div>
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-[11px] text-white/45">
          Select a module
        </div>
      )}
    </div>
  );
}

function CompareTile({ product }: { product?: Product }) {
  if (!product) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-[11px] text-white/45">
        Empty slot — select a module to compare.
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs font-medium text-white/85">{product.name}</div>
      <div className="mt-1 text-[11px] text-white/55">{product.outcome}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full border border-white/10 bg-[#06041A] px-2.5 py-1 text-[10px] text-white/70">
          {product.category}
        </span>
        <span className="rounded-full border border-white/10 bg-[#06041A] px-2.5 py-1 text-[10px] text-white/70">
          {product.complexity}
        </span>
        {product.offlineReady ? (
          <span className="rounded-full border border-white/10 bg-[#06041A] px-2.5 py-1 text-[10px] text-white/70">
            Offline
          </span>
        ) : null}
        {product.telemetry ? (
          <span className="rounded-full border border-white/10 bg-[#06041A] px-2.5 py-1 text-[10px] text-white/70">
            Telemetry
          </span>
        ) : null}
      </div>
    </div>
  );
}

/* =======================================================================================
   Product Card + Drawer
======================================================================================= */

function ProductCard({
  product,
  reduceMotion,
  index,
  onOpen,
  onCompare,
  compared,
}: {
  product: Product;
  reduceMotion: boolean;
  index: number;
  onOpen: () => void;
  onCompare: () => void;
  compared: boolean;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.03 }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(760px_320px_at_30%_20%,rgba(67,232,255,.12),transparent_60%)] opacity-50" />
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] text-white/55">{product.category}</div>
            <div className="mt-1 text-lg font-semibold tracking-[-0.03em]">{product.name}</div>
            <div className="mt-1 text-sm text-white/70">{product.subtitle}</div>
          </div>
          <span className="inline-flex items-center rounded-full border border-white/10 bg-[#06041A] px-3 py-1 text-[11px] text-white/60">
            {product.typicalTimeline}
          </span>
        </div>

        <div className="mt-3 text-sm text-white/70">
          <span className="text-white/85 font-medium">Outcome:</span> {product.outcome}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2">
          {product.bullets.slice(0, 3).map((b) => (
            <div key={b} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/25" />
              <span>{b}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <TagPill label={product.complexity} tone="neutral" />
          {product.telemetry ? <TagPill label="Telemetry" tone="cyan" /> : <TagPill label="Telemetry (optional)" tone="soft" />}
          {product.offlineReady ? <TagPill label="Offline-ready" tone="green" /> : <TagPill label="Online-first" tone="soft" />}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <MiniList title="Targets" items={product.targets.slice(0, 4)} />
          <MiniList title="Inputs" items={product.inputs.slice(0, 4)} />
        </div>

        <div className="mt-4">
          <MaturityBar maturity={product.maturity} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={onOpen}>
            View module
          </Button>
          <button
            type="button"
            onClick={onCompare}
            className={cx(
              "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition border",
              compared
                ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-white"
                : "border-white/12 bg-white/6 text-white hover:bg-white/9"
            )}
          >
            {compared ? "Selected" : "Compare"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductDrawer({
  product,
  onClose,
  compareEnabled,
  compare,
  onPick,
  reduceMotion,
}: {
  product: Product;
  onClose: () => void;
  compareEnabled: boolean;
  compare: Product[];
  onPick: (id: string) => void;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.aside
        ref={ref}
        className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[560px] bg-[#07051A] border-l border-white/10 shadow-2xl"
        initial={reduceMotion ? { x: 0 } : { x: 40, opacity: 0.6 }}
        animate={reduceMotion ? { x: 0 } : { x: 0, opacity: 1 }}
        exit={reduceMotion ? { x: 0 } : { x: 40, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="h-full overflow-y-auto">
          <div className="sticky top-0 z-10 border-b border-white/10 bg-[#07051A]/90 backdrop-blur px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] text-white/55">{product.category}</div>
                <div className="mt-1 text-lg font-semibold tracking-[-0.03em]">{product.name}</div>
                <div className="mt-1 text-sm text-white/70">{product.subtitle}</div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 hover:bg-white/8 transition"
              >
                Close
              </button>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-medium text-white/80">Outcome</div>
              <div className="mt-2 text-sm text-white/75 leading-relaxed">{product.outcome}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <TagPill label={product.typicalTimeline} tone="neutral" />
                <TagPill label={product.complexity} tone="neutral" />
                {product.telemetry ? <TagPill label="Telemetry" tone="cyan" /> : <TagPill label="Telemetry optional" tone="soft" />}
                {product.offlineReady ? <TagPill label="Offline-ready" tone="green" /> : <TagPill label="Online-first" tone="soft" />}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Block title="Targets" items={product.targets} />
              <Block title="Inputs" items={product.inputs} />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-medium text-white/80">Maturity</div>
              <div className="mt-3">
                <MaturityTable maturity={product.maturity} />
              </div>
              <div className="mt-3 text-[11px] text-white/55">
                Interpretation: higher bars mean the module is more “productized” for that stage.
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-medium text-white/80">What’s inside</div>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {product.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "rgba(67,232,255,.55)" }} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Block title="Stack" items={product.stack} />
              <Block title="Deliverables" items={product.deliverables} />
            </div>

            {compareEnabled ? (
              <div className="rounded-2xl border border-[rgba(67,232,255,.25)] bg-[rgba(67,232,255,.06)] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-medium text-white/90">Compare view</div>
                  <div className="text-[11px] text-white/65">2 modules selected</div>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-3">
                  <CompareTable a={compare[0]} b={compare[1]} onPick={onPick} />
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-medium text-white/80">Next step</div>
                <div className="mt-2 text-sm text-white/70 leading-relaxed">
                  Want to bundle modules into one system? We’ll map constraints and propose a prototype-first plan.
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button href="#creative-cta" variant="primary">
                    Describe your idea
                  </Button>
                  <Button variant="secondary" href="#creative-pipeline">
                    See pipeline
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs font-medium text-white/80">{title}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((x) => (
          <span key={x} className="rounded-full border border-white/10 bg-[#06041A] px-2.5 py-1 text-[11px] text-white/70">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

function TagPill({ label, tone }: { label: string; tone: "soft" | "cyan" | "green" | "neutral" }) {
  const cls =
    tone === "cyan"
      ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-white"
      : tone === "green"
      ? "border-[rgba(158,243,21,.35)] bg-[rgba(158,243,21,.10)] text-white"
      : tone === "neutral"
      ? "border-white/12 bg-white/6 text-white/80"
      : "border-white/10 bg-white/5 text-white/70";
  return (
    <span className={cx("rounded-full border px-3 py-1 text-[11px]", cls)}>{label}</span>
  );
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#06041A] p-3">
      <div className="text-[11px] text-white/55">{title}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((x) => (
          <span key={x} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70">
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

function MaturityBar({ maturity }: { maturity: Product["maturity"] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#06041A] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[11px] text-white/55">Maturity</div>
        <div className="text-[11px] text-white/45">Prototype → Operate</div>
      </div>
      <div className="mt-3 space-y-2">
        {MATURITY.map((k) => (
          <div key={k} className="flex items-center gap-3">
            <div className="w-20 text-[10px] text-white/55">{k}</div>
            <LevelBars level={maturity[k]} />
          </div>
        ))}
      </div>
    </div>
  );
}

function LevelBars({ level }: { level: 0 | 1 | 2 | 3 }) {
  const bars = [1, 2, 3] as const;
  return (
    <div className="flex w-full items-center gap-1.5">
      {bars.map((b) => {
        const on = level >= b;
        return (
          <span
            key={b}
            className={cx(
              "h-1.5 flex-1 rounded-full border",
              on ? "border-[rgba(67,232,255,.40)] bg-[rgba(67,232,255,.20)]" : "border-white/10 bg-white/5"
            )}
          />
        );
      })}
    </div>
  );
}

function MaturityTable({ maturity }: { maturity: Product["maturity"] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#06041A] overflow-hidden">
      <div className="grid grid-cols-4 gap-0 border-b border-white/10">
        {MATURITY.map((m) => (
          <div key={m} className="p-3 text-xs font-medium text-white/75">
            {m}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-0">
        {MATURITY.map((m) => (
          <div key={m} className="p-3">
            <div className="text-[11px] text-white/55">level</div>
            <div className="mt-2">
              <LevelBars level={maturity[m]} />
            </div>
            <div className="mt-2 text-[11px] text-white/45">
              {maturity[m] === 0 ? "—" : maturity[m] === 1 ? "base" : maturity[m] === 2 ? "strong" : "best"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareTable({
  a,
  b,
  onPick,
}: {
  a: Product;
  b: Product;
  onPick: (id: string) => void;
}) {
  const rows: Array<{ label: string; a: React.ReactNode; b: React.ReactNode }> = [
    { label: "Outcome", a: a.outcome, b: b.outcome },
    { label: "Category", a: a.category, b: b.category },
    { label: "Complexity", a: a.complexity, b: b.complexity },
    { label: "Timeline", a: a.typicalTimeline, b: b.typicalTimeline },
    { label: "Targets", a: a.targets.join(", "), b: b.targets.join(", ") },
    { label: "Inputs", a: a.inputs.join(", "), b: b.inputs.join(", ") },
    { label: "Telemetry", a: a.telemetry ? "Yes" : "Optional", b: b.telemetry ? "Yes" : "Optional" },
    { label: "Offline", a: a.offlineReady ? "Yes" : "No", b: b.offlineReady ? "Yes" : "No" },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#06041A] overflow-hidden">
      <div className="grid grid-cols-12 gap-0 border-b border-white/10 bg-white/5">
        <div className="col-span-4 p-3 text-[11px] text-white/60">Field</div>
        <div className="col-span-4 p-3">
          <button type="button" onClick={() => onPick(a.id)} className="text-left">
            <div className="text-xs font-medium text-white/85">{a.name}</div>
            <div className="text-[11px] text-white/50">click to view</div>
          </button>
        </div>
        <div className="col-span-4 p-3">
          <button type="button" onClick={() => onPick(b.id)} className="text-left">
            <div className="text-xs font-medium text-white/85">{b.name}</div>
            <div className="text-[11px] text-white/50">click to view</div>
          </button>
        </div>
      </div>

      <div className="divide-y divide-white/10">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-12 gap-0">
            <div className="col-span-4 p-3 text-[11px] text-white/55">{r.label}</div>
            <div className="col-span-4 p-3 text-[11px] text-white/70">{r.a}</div>
            <div className="col-span-4 p-3 text-[11px] text-white/70">{r.b}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="text-[11px] text-white/55">Maturity comparison</div>
        <div className="mt-2 grid grid-cols-1 gap-2">
          <MaturityCompareRow label="Prototype" a={a.maturity.Prototype} b={b.maturity.Prototype} />
          <MaturityCompareRow label="Production" a={a.maturity.Production} b={b.maturity.Production} />
          <MaturityCompareRow label="Deploy" a={a.maturity.Deploy} b={b.maturity.Deploy} />
          <MaturityCompareRow label="Operate" a={a.maturity.Operate} b={b.maturity.Operate} />
        </div>
      </div>
    </div>
  );
}

function MaturityCompareRow({ label, a, b }: { label: string; a: 0 | 1 | 2 | 3; b: 0 | 1 | 2 | 3 }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[11px] text-white/60">{label}</div>
        <div className="text-[11px] text-white/45">
          A:{a} • B:{b}
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <LevelBars level={a} />
        <LevelBars level={b} />
      </div>
    </div>
  );
}

/* =======================================================================================
   Capability Matrix
======================================================================================= */

function CapabilityMatrix({ reduceMotion }: { reduceMotion: boolean }) {
  const [hover, setHover] = useState(CAPABILITIES[0].key);
  const active = useMemo(() => CAPABILITIES.find((c) => c.key === hover) ?? CAPABILITIES[0], [hover]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="grid grid-cols-12 gap-0 border-b border-white/10 bg-[#06041A]">
          <div className="col-span-5 p-4 text-xs font-medium text-white/70">Capability</div>
          {MATURITY.map((m) => (
            <div key={m} className="col-span-7/4 p-4">
              <div className="text-xs font-medium text-white/80">{m}</div>
              <div className="mt-1 text-[11px] text-white/45">productization</div>
            </div>
          ))}
        </div>

        <div className="divide-y divide-white/10">
          {CAPABILITIES.map((row, idx) => {
            const is = row.key === hover;
            return (
              <motion.div
                key={row.key}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.02 }}
                onMouseEnter={() => setHover(row.key)}
                onFocus={() => setHover(row.key)}
                tabIndex={0}
                className={cx(
                  "grid grid-cols-12 gap-0 cursor-pointer outline-none transition-colors",
                  is ? "bg-[rgba(67,232,255,.06)]" : "hover:bg-white/[0.04]"
                )}
              >
                <div className="col-span-5 p-4">
                  <div className="text-sm font-semibold tracking-[-0.02em]">{row.title}</div>
                  <div className="mt-1 text-[11px] text-white/60">{row.desc}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {row.tags.slice(0, 2).map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4 stage columns = 7 cols left; do 7 with 4 blocks by spanning */}
                <div className="col-span-7 p-4">
                  <div className="grid grid-cols-4 gap-3">
                    {MATURITY.map((m) => (
                      <div key={m} className="min-w-0">
                        <LevelBars level={row.stages[m]} />
                        <div className="mt-2 text-[10px] text-white/45">
                          {row.stages[m] === 0 ? "—" : row.stages[m] === 1 ? "base" : row.stages[m] === 2 ? "strong" : "best"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#06041A] p-5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(520px_320px_at_60%_20%,rgba(67,232,255,.16),transparent_60%)] opacity-60" />
        <div className="relative">
          <div className="text-xs font-medium text-white/75">Signals we track</div>
          <div className="mt-3 text-lg font-semibold tracking-[-0.03em]">{active.title}</div>
          <div className="mt-2 text-sm text-white/70 leading-relaxed">
            {active.desc}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-medium text-white/75">Signals</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {active.signals.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-[#06041A] px-2.5 py-1 text-[11px] text-white/70"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Chip tone="cyan">systems-first</Chip>
            <Chip tone="soft">buyer-ready</Chip>
            <Chip tone="green">deploy-safe</Chip>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =======================================================================================
   Pipeline
======================================================================================= */

function ConnectedPipeline({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(780px_360px_at_60%_15%,rgba(67,232,255,.14),transparent_60%)]" />
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-[#06041A] p-5">
              <div className="text-xs font-medium text-white/70">Typical timelines</div>
              <div className="mt-3 space-y-3">
                <TimelinePill label="Prototype" value="2–4 weeks" />
                <TimelinePill label="Production" value="6–12 weeks" />
                <TimelinePill label="Operate" value="Monthly cadence" />
              </div>
              <div className="mt-5 h-px w-full bg-white/10" />
              <div className="mt-4 text-xs text-white/60 leading-relaxed">
                Modules ship as a system: deploy plan + runbooks + telemetry hooks.
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="relative pl-6">
              <div className="absolute left-2 top-1 bottom-1 w-px bg-white/10" />
              <div className="space-y-4">
                {PIPELINE.map((s, idx) => (
                  <motion.div
                    key={s.step}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, ease: "easeOut", delay: idx * 0.03 }}
                    className="relative"
                  >
                    <div className="absolute left-[-2px] top-6 h-4 w-4 rounded-full border border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)]" />
                    <div className="rounded-2xl border border-white/10 bg-[#06041A] p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-[11px] text-white/55">step {s.step}</div>
                          <div className="mt-1 text-lg font-semibold tracking-[-0.03em]">{s.title}</div>
                          <div className="mt-2 text-sm text-white/70 leading-relaxed">{s.desc}</div>
                        </div>
                        <span className="mt-1 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/65">
                          artifact-driven
                        </span>
                      </div>

                      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs font-medium text-white/75">Artifacts</div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {s.artifacts.map((a) => (
                            <span
                              key={a}
                              className="rounded-full border border-white/10 bg-[#06041A] px-2.5 py-1 text-[11px] text-white/70"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Chip tone="cyan">deploy plan</Chip>
              <Chip tone="soft">operator runbook</Chip>
              <Chip tone="green">telemetry loop</Chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelinePill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-white/70">{label}</span>
        <span className="text-xs font-medium text-white/85">{value}</span>
      </div>
    </div>
  );
}

/* =======================================================================================
   Proof
======================================================================================= */

function ProofGrid() {
  const tiles = [
    {
      k: "deploy",
      title: "Deployment confidence",
      sub: "Reliability is designed, not hoped for.",
      bullets: ["Offline-first paths", "Operator runbooks", "Auto-recovery flows", "Rollback plans"],
      tag: "ops-ready",
    },
    {
      k: "telemetry",
      title: "Telemetry built-in",
      sub: "Proof over opinions.",
      bullets: ["Event schema", "Funnels", "Logs", "Dashboards"],
      tag: "measured",
    },
    {
      k: "matrix",
      title: "Device matrix discipline",
      sub: "We test what we ship.",
      bullets: ["Targets defined early", "QA matrix", "Perf budgets", "Fallback states"],
      tag: "ship-safe",
    },
    {
      k: "systems",
      title: "Systems-first delivery",
      sub: "Modules that combine cleanly.",
      bullets: ["Schemas", "Pipelines", "Validation", "Handover docs"],
      tag: "sustainable",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-7 rounded-2xl border border-white/10 bg-white/5 p-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(860px_360px_at_30%_20%,rgba(67,232,255,.14),transparent_60%)] opacity-60" />
        <div className="relative">
          <div className="text-[11px] text-white/55">Signature claim</div>
          <div className="mt-2 text-2xl sm:text-3xl font-semibold tracking-[-0.03em]">
            Creative Tech that ships like{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, rgba(67,232,255,1), rgba(179,247,255,.95), rgba(255,255,255,.85))" }}
            >
              product
            </span>
            .
          </div>
          <div className="mt-3 text-sm text-white/70 leading-relaxed max-w-xl">
            The catalog approach keeps deliverables explicit: inputs, targets, telemetry, offline behavior, and runbooks — so there are fewer surprises.
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Metric label="Modules" value={`${PRODUCTS.length}`} />
            <Metric label="Offline-capable" value={`${PRODUCTS.filter((p) => p.offlineReady).length}`} />
            <Metric label="Telemetry-ready" value={`${PRODUCTS.filter((p) => p.telemetry).length}`} />
            <Metric label="Categories" value={`${CATEGORIES.length}`} />
          </div>
        </div>
      </div>

      <div className="md:col-span-5 grid grid-cols-1 gap-4">
        {tiles.map((t) => (
          <div key={t.k} className="rounded-2xl border border-white/10 bg-white/5 p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(680px_280px_at_30%_20%,rgba(67,232,255,.12),transparent_60%)] opacity-40" />
            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold tracking-[-0.03em]">{t.title}</div>
                  <div className="mt-1 text-sm text-white/70">{t.sub}</div>
                </div>
                <span className="rounded-full border border-white/10 bg-[#06041A] px-3 py-1 text-[11px] text-white/60">
                  {t.tag}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2">
                {t.bullets.map((b) => (
                  <div key={b} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "rgba(67,232,255,.55)" }} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#06041A] p-4">
      <div className="text-[11px] text-white/55">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{value}</div>
      <div className="mt-2 h-px w-full bg-white/10" />
      <div className="mt-2 text-[11px] text-white/45">catalog signal</div>
    </div>
  );
}

/* =======================================================================================
   Integrations
======================================================================================= */

function IntegrationBands() {
  const bands = [
    {
      title: "Delivery targets",
      desc: "Where it runs — defined early, tested often.",
      items: TARGETS,
      tone: "cyan" as const,
    },
    {
      title: "Inputs",
      desc: "How reality enters the system.",
      items: INPUTS,
      tone: "green" as const,
    },
    {
      title: "Measurement",
      desc: "Proof and iteration loops.",
      items: ["Telemetry", "Logs", "Dashboards", "A/B hooks", "Audit trails"],
      tone: "cyan" as const,
    },
    {
      title: "Ops & updates",
      desc: "How it stays alive after launch.",
      items: ["Offline packs", "Remote sync", "Runbooks", "Monitoring", "Rollback"],
      tone: "soft" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {bands.map((b) => (
        <div key={b.title} className="relative rounded-2xl border border-white/10 bg-white/5 p-5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(920px_320px_at_25%_20%,rgba(67,232,255,.10),transparent_60%)] opacity-35" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background:
                      b.tone === "cyan"
                        ? "rgba(67,232,255,.55)"
                        : b.tone === "green"
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
  );
}

/* =======================================================================================
   Engagement
======================================================================================= */

function EngagementCards({ reduceMotion }: { reduceMotion: boolean }) {
  const [active, setActive] = useState<Engagement["key"]>("sprint");
  const current = useMemo(() => ENGAGEMENTS.find((e) => e.key === active)!, [active]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {ENGAGEMENTS.map((e) => {
          const on = e.key === active;
          return (
            <button
              key={e.key}
              type="button"
              onClick={() => setActive(e.key)}
              className={cx(
                "rounded-full border px-4 py-2 text-sm font-medium transition",
                on
                  ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-white"
                  : "border-white/10 bg-[#06041A] text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              {e.title}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <motion.div
          key={current.key}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#06041A] p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-lg font-semibold tracking-[-0.03em]">{current.title}</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">{current.bestFor}</div>
            </div>
            <span className="mt-1 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
              {current.timeline}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-medium text-white/75">Includes</div>
              <ul className="mt-2 space-y-2 text-xs text-white/60">
                {current.includes.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "rgba(67,232,255,.55)" }} />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-medium text-white/75">Deliverables</div>
              <ul className="mt-2 space-y-2 text-xs text-white/60">
                {current.deliverables.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/25" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button href="#creative-cta" variant="primary">
              Start this model
            </Button>
            <Button href="#creative-tech-plays" variant="secondary">
              Pick modules
            </Button>
          </div>
        </motion.div>

        <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#06041A] p-5">
          <div className="text-xs font-medium text-white/75">What stays consistent</div>
          <div className="mt-3 space-y-3">
            <ConsistencyLine label="Deployment plan" value="targets + runbooks" />
            <ConsistencyLine label="Performance" value="budget + QA matrix" />
            <ConsistencyLine label="Telemetry" value="events + dashboards" />
            <ConsistencyLine label="Handover" value="docs + source" />
          </div>
          <div className="mt-5 h-px w-full bg-white/10" />
          <div className="mt-4 text-[11px] text-white/55">
            Different engagement. Same systems-first delivery.
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Chip tone="cyan">clean deliverables</Chip>
            <Chip tone="soft">safe deploy</Chip>
            <Chip tone="green">operate-ready</Chip>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsistencyLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <span className="text-xs text-white/70">{label}</span>
      <span className="text-[11px] text-white/55">{value}</span>
    </div>
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
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left outline-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-semibold tracking-[-0.02em]">{f.q}</div>
                  <span className="mt-1 text-[11px] text-white/45">{isOpen ? "hide" : "open"}</span>
                </div>
                <div className="mt-2 text-[11px] text-white/55">
                  buyer note: “deployment clarity”
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
   CTA
======================================================================================= */

function FinalCTA() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#06041A] p-6 sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(820px_360px_at_25%_20%,rgba(67,232,255,.18),transparent_60%),radial-gradient(620px_300px_at_80%_80%,rgba(91,45,220,.10),transparent_60%)]" />
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="cyan">Final CTA</Chip>
            <Chip tone="soft">catalog → system</Chip>
            <Chip tone="green">deploy-safe</Chip>
          </div>

          <h2 className="mt-4 text-balance text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em]">
            Describe your idea — we’ll respond with a{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(67,232,255,1), rgba(179,247,255,.95), rgba(255,255,255,.85))",
              }}
            >
              module plan
            </span>
            .
          </h2>

          <p className="mt-3 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
            Share your goal, targets, and constraints. We’ll propose a prototype-first delivery plan with a clear module bundle, timeline, and operational artifacts.
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
              <Field label="Project type" placeholder="e.g., kiosk + show-control / WebGL microsite / AR" />
              <Field label="Targets" placeholder="e.g., Web + kiosk + LED wall" />
              <Field label="Inputs" placeholder="e.g., camera + depth + DMX/OSC" />
              <Field label="Timeline" placeholder="e.g., 6–8 weeks" />
            </div>
            <div className="mt-4 text-[11px] text-white/55">
              Add constraints (offline, venue, sensors, analytics requirements) and your success metric.
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between text-[11px] text-white/60">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                accent: <span className="text-white/80">electric cyan</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
                delivery: <span className="text-white/80">systems-first</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                output: <span className="text-white/80">module plan</span>
              </span>
            </div>
          </div>
        </div>
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

