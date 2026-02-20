"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * WODH — 3D & Art Design
 * Variant B — Production Breakdown (trust-building)
 * Accent: Gold / Amber (no green/purple)
 *
 * Goals:
 * - Prove process + quality gates
 * - Show delivery discipline (packs, standards)
 * - Still feel premium + lookdev-forward
 */

type Category = "All" | "Characters" | "Environments" | "Product" | "ArchViz" | "Stylized";
type PipelineStepId =
  | "brief"
  | "blockout"
  | "highlow"
  | "uv"
  | "texture"
  | "lookdev"
  | "rigsim"
  | "optimize"
  | "export";

type GateId =
  | "silhouette"
  | "topology"
  | "uv"
  | "texel"
  | "materials"
  | "lighting"
  | "performance"
  | "naming"
  | "engine";

type Work = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  tags: string[];
  thumb: string;
  notes: string;
};

const AMBER = "#F7C948";
const AMBER_SOFT = "rgba(247, 201, 72, 0.25)";
const AMBER_GLOW = "rgba(247, 201, 72, 0.18)";


function dataSvgPlaceholder(label: string) {
  const safe = label.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#070A14"/>
        <stop offset="45%" stop-color="#111A34"/>
        <stop offset="100%" stop-color="#070A14"/>
      </linearGradient>
      <radialGradient id="r" cx="78%" cy="18%" r="62%">
        <stop offset="0%" stop-color="rgba(247,201,72,0.40)"/>
        <stop offset="65%" stop-color="rgba(247,201,72,0.10)"/>
        <stop offset="100%" stop-color="rgba(247,201,72,0.00)"/>
      </radialGradient>
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="
          0 0 0 0 0.7
          0 0 0 0 0.7
          0 0 0 0 0.7
          0 0 0 .08 0"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#r)"/>
    <rect width="100%" height="100%" filter="url(#n)" opacity="0.65"/>
    <circle cx="1050" cy="170" r="240" fill="rgba(247,201,72,0.10)"/>
    <path d="M1400 700 C1120 640 980 620 720 675 C420 740 240 800 0 850 L0 900 L1400 900 Z"
      fill="rgba(255,255,255,0.04)"/>
    <text x="70" y="120" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial"
      font-size="48" fill="rgba(255,255,255,0.88)" font-weight="700">${safe}</text>
    <text x="70" y="168" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial"
      font-size="22" fill="rgba(255,255,255,0.55)">Replace with a real render · WODH 3D & Art</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function SmartImg({
  src,
  alt,
  fallbackLabel,
  className,
}: {
  src: string;
  alt: string;
  fallbackLabel: string;
  className?: string;
}) {
  const [err, setErr] = useState(false);
  const finalSrc = err ? dataSvgPlaceholder(fallbackLabel) : src;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={finalSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setErr(true)}
      draggable={false}
    />
  );
}

function SoftHr() {
  return (
    <div
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.00), rgba(255,255,255,0.14), rgba(247,201,72,0.22), rgba(255,255,255,0.14), rgba(255,255,255,0.00))",
      }}
    />
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  right,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
      <div>
        <div className="text-xs font-semibold tracking-wider text-white/55">{eyebrow}</div>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">{title}</h2>
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="w-full md:w-auto">{right}</div> : null}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/70">
      {children}
    </span>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="text-xs font-semibold text-white/55">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-white/90">{value}</div>
    </div>
  );
}

function SegmentedControl({
  value,
  onChange,
  options,
}: {
  value: Category;
  onChange: (v: Category) => void;
  options: Category[];
}) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "relative rounded-xl px-3 py-2 text-sm font-medium transition",
              active
                ? "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset]"
                : "text-white/70 hover:text-white hover:bg-white/[0.06]"
            )}
            style={active ? { boxShadow: `0 0 0 1px rgba(255,255,255,0.10) inset, 0 12px 40px ${AMBER_GLOW}` } : {}}
            aria-pressed={active}
          >
            <span className="relative z-10">{opt}</span>
            {active && (
              <span
                className="pointer-events-none absolute inset-0 rounded-xl opacity-70"
                style={{
                  background:
                    "radial-gradient(80% 120% at 50% 0%, rgba(247,201,72,0.22), rgba(247,201,72,0.00) 62%)",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

const CATEGORIES: Category[] = ["All", "Characters", "Environments", "Product", "ArchViz", "Stylized"];

const WORKS: Work[] = [
  {
    id: "w1",
    title: "Hero Character — Lookdev Standard",
    category: "Characters",
    tags: ["SSS", "Groom", "Turntable"],
    thumb: "https://images.unsplash.com/photo-1612036782180-6f0b6cd0f1d6?auto=format&fit=crop&w=1800&q=80",
    notes: "Skin response is tuned for calm highlights; roughness breakup avoids plastic sheen.",
  },
  {
    id: "w2",
    title: "Environment — Mood + Value Control",
    category: "Environments",
    tags: ["Fog", "Decals", "Modular"],
    thumb: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1800&q=80",
    notes: "Lighting tiers (key/fill/rim) keep forms readable in gameplay and cinematic keys.",
  },
  {
    id: "w3",
    title: "Product Render — Studio Packshots",
    category: "Product",
    tags: ["Hard-surface", "Reflections", "Angles"],
    thumb: "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=1800&q=80",
    notes: "Specular roll-off is controlled; materials remain physically plausible across HDRIs.",
  },
  {
    id: "w4",
    title: "ArchViz — Realism + Warm Bounce",
    category: "ArchViz",
    tags: ["GI", "Materials", "Camera"],
    thumb: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1800&q=80",
    notes: "Clean blacks + warm mids; bounce lighting is believable without overexposure.",
  },
  {
    id: "w5",
    title: "Stylized Props — Palette Discipline",
    category: "Stylized",
    tags: ["Hand-painted", "Shapes", "Readability"],
    thumb: "https://images.unsplash.com/photo-1520975958225-9e9b08e0a3f0?auto=format&fit=crop&w=1800&q=80",
    notes: "Shape language stays consistent; values are constrained for instant readability.",
  },
];

const PIPELINE: Array<{
  id: PipelineStepId;
  title: string;
  subtitle: string;
  outputs: string[];
  checks: GateId[];
}> = [
  {
    id: "brief",
    title: "Brief & Targets",
    subtitle: "Style references + engine constraints",
    outputs: ["Reference board", "Scale/unit rules", "LOD + texture budgets"],
    checks: ["engine", "performance", "naming"],
  },
  {
    id: "blockout",
    title: "Blockout",
    subtitle: "Silhouette-first shapes",
    outputs: ["Primary forms", "Proportions lock", "Camera checks"],
    checks: ["silhouette"],
  },
  {
    id: "highlow",
    title: "High / Low",
    subtitle: "Detail where it matters",
    outputs: ["High sculpt/model", "Low poly", "Bake setup notes"],
    checks: ["topology", "silhouette"],
  },
  {
    id: "uv",
    title: "UV & Baking",
    subtitle: "Clean maps, no surprises",
    outputs: ["UV unwrap", "Bakes (normal/AO)", "Padding rules"],
    checks: ["uv", "naming"],
  },
  {
    id: "texture",
    title: "Texturing",
    subtitle: "PBR discipline + breakup",
    outputs: ["Albedo/Rough/Metal", "Normals/AO", "Optional masks"],
    checks: ["materials", "texel"],
  },
  {
    id: "lookdev",
    title: "Lookdev",
    subtitle: "Lighting + material response",
    outputs: ["Material presets", "HDRI tests", "Turntable / angles"],
    checks: ["materials", "lighting"],
  },
  {
    id: "rigsim",
    title: "Rig / Sim",
    subtitle: "If needed (characters/cloth)",
    outputs: ["Rig controls", "Skin weights", "Sim cache (optional)"],
    checks: ["topology"],
  },
  {
    id: "optimize",
    title: "Optimization",
    subtitle: "LOD, instancing, sanity",
    outputs: ["LODs", "Collision", "Draw-call strategy"],
    checks: ["performance", "texel"],
  },
  {
    id: "export",
    title: "Export & Delivery",
    subtitle: "Packs that integrate cleanly",
    outputs: ["FBX/GLB", "Textures", "Readme + import notes"],
    checks: ["naming", "engine"],
  },
];

const QUALITY_GATES: Record<
  GateId,
  { title: string; why: string; bullets: string[] }
> = {
  silhouette: {
    title: "Silhouette Readability",
    why: "If the silhouette fails, detail won’t save it.",
    bullets: ["Primary forms read at distance", "No noisy edges", "Camera-angle checks"],
  },
  topology: {
    title: "Topology & Shading Safety",
    why: "Good topo avoids shading artifacts and supports deformation.",
    bullets: ["Even density where needed", "Clean normals", "No pinching in bends"],
  },
  uv: {
    title: "UV Hygiene",
    why: "UV issues become production fires later.",
    bullets: ["No overlaps (unless intended)", "Proper padding", "Consistent orientation"],
  },
  texel: {
    title: "Texel Density Control",
    why: "Consistency keeps assets cohesive across a set.",
    bullets: ["Target px/m where relevant", "Hero vs background tiers", "No wasted resolution"],
  },
  materials: {
    title: "PBR Discipline",
    why: "Materials must behave across lighting, not just one render.",
    bullets: ["Roughness breakup", "Energy conservation", "No “wet plastic” look"],
  },
  lighting: {
    title: "Lookdev Lighting Checks",
    why: "Assets should hold up under multiple keys.",
    bullets: ["Key/fill/rim tests", "HDRI rotation test", "Value control (no blown highlights)"],
  },
  performance: {
    title: "Performance Budget",
    why: "Trust comes from meeting constraints reliably.",
    bullets: ["Triangle budgets per LOD", "Draw calls & instancing", "Texture memory sanity"],
  },
  naming: {
    title: "Naming & Structure",
    why: "Clean delivery prevents pipeline friction.",
    bullets: ["Predictable folder layout", "Consistent naming", "Readme/import notes"],
  },
  engine: {
    title: "Engine Integration",
    why: "Final success is in your runtime, not in a screenshot.",
    bullets: ["Correct scale + pivots", "Material hookups", "LOD/collision validation"],
  },
};

const SAMPLE_PACK = [
  { path: "/Meshes", hint: "FBX/GLB, LODs, collisions" },
  { path: "/Textures", hint: "Albedo, Rough, Metal, Normal, AO" },
  { path: "/Materials", hint: "Presets, shader notes, masks" },
  { path: "/Renders", hint: "Turntables, angles, packshots (optional)" },
  { path: "/Docs", hint: "Readme, budgets, import settings" },
];

function CornerGlows() {
  return (
    <>
      <div
        className="pointer-events-none absolute -left-28 -top-28 h-[460px] w-[460px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 62%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-28 -top-44 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(247,201,72,0.14), rgba(247,201,72,0.00) 64%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 left-1/2 h-[620px] w-[840px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(247,201,72,0.10), rgba(247,201,72,0.00) 68%)",
        }}
      />
    </>
  );
}

function GateAccordion({
  open,
  onToggle,
  gate,
}: {
  open: boolean;
  onToggle: () => void;
  gate: { id: GateId; title: string; why: string; bullets: string[] };
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="flex items-start gap-3">
          <span
            className="mt-1 h-2.5 w-2.5 rounded-full"
            style={{ background: AMBER, boxShadow: `0 0 0 8px ${AMBER_SOFT}` }}
          />
          <div>
            <div className="text-sm font-semibold text-white/90">{gate.title}</div>
            <div className="mt-1 text-xs text-white/55">{gate.why}</div>
          </div>
        </div>
        <span className="text-xs font-semibold text-white/60">{open ? "Hide" : "Show"}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="px-5 pb-5"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <ul className="space-y-2 text-sm text-white/70">
                {gate.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span style={{ color: AMBER }}>•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ThreeDArtCaseStudyV2Legacy() {
  const reducedMotion = useReducedMotion();

  // Gallery filter
  const [category, setCategory] = useState<Category>("All");
  const filteredWorks = useMemo(() => {
    if (category === "All") return WORKS;
    return WORKS.filter((w) => w.category === category);
  }, [category]);

  // Pipeline selection
  const [stepId, setStepId] = useState<PipelineStepId>("texture");
  const step = useMemo(() => PIPELINE.find((s) => s.id === stepId)!, [stepId]);

  // Gates accordion
  const stepGates = useMemo(() => step.checks.map((g) => ({ id: g, ...QUALITY_GATES[g] })), [step]);
  const [openGate, setOpenGate] = useState<GateId | null>(stepGates[0]?.id ?? null);

  useEffect(() => {
    setOpenGate(stepGates[0]?.id ?? null);
  }, [stepId]); // reset when step changes

  return (
    <div className="min-h-screen bg-[#070A14] text-white">
      {/* BACKDROP */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_18%_0%,rgba(255,255,255,0.05),rgba(255,255,255,0)_55%),radial-gradient(1000px_700px_at_82%_10%,rgba(247,201,72,0.10),rgba(247,201,72,0)_58%),radial-gradient(900px_700px_at_50%_100%,rgba(255,255,255,0.03),rgba(255,255,255,0)_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22120%22%20height%3D%22120%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%222%22/%3E%3C/filter%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.7%22/%3E%3C/svg%3E')]" />
      </div>

      {/* SECTION: Top Nav */}
      <header id="section-topnav" className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.03]"
              style={{ boxShadow: `0 18px 80px ${AMBER_GLOW}` }}
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide text-white/90">WODH</div>
              <div className="text-xs font-medium text-white/55">3D & Art · Production Breakdown</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#section-pipeline">
              Pipeline
            </a>
            <a className="hover:text-white" href="#section-gates">
              Quality Gates
            </a>
            <a className="hover:text-white" href="#section-pack">
              Delivery Pack
            </a>
            <a className="hover:text-white" href="#section-work">
              Work
            </a>
            <a className="hover:text-white" href="#section-cta">
              Contact
            </a>
          </nav>

          <Link
            href="#section-cta"
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/[0.06]"
            style={{ boxShadow: `0 16px 60px ${AMBER_GLOW}` }}
          >
            Start a lookdev
          </Link>
        </div>
      </header>

      {/* SECTION: Hero */}
      <section id="section-hero" className="relative z-10">
        <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-10 md:px-8 md:pb-14 md:pt-14">
          <CornerGlows />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-white/70">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: AMBER, boxShadow: `0 0 0 6px ${AMBER_SOFT}` }}
                />
                Trust-building production · budgets · QA gates · clean delivery packs
              </div>

              <h1 className="mt-5 text-[2.15rem] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[3.2rem]">
                Beautiful renders are easy.
                <span className="block text-white/75">
                  Reliable production is the <span style={{ color: AMBER }}>real</span> craft.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                We build assets with a visible pipeline: budgets, reviews, and quality gates — so your final pack integrates
                cleanly in Unreal/Unity or offline pipelines. No guesswork. No surprises.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#section-pipeline"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                  style={{ boxShadow: `0 22px 90px ${AMBER_GLOW}` }}
                >
                  See the pipeline
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full transition group-hover:translate-x-0.5"
                    style={{ background: AMBER }}
                  />
                </Link>
                <Link
                  href="#section-pack"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] hover:text-white"
                >
                  View delivery pack
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatChip label="Iteration" value="Lookdev checks" />
                <StatChip label="Standards" value="Budgets + gates" />
                <StatChip label="Delivery" value="Clean packs" />
                <StatChip label="Integration" value="Engine-ready" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <div
                  className="pointer-events-none absolute -right-28 -top-28 h-[420px] w-[420px] rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(247,201,72,0.22), rgba(247,201,72,0.00) 62%)",
                  }}
                />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold tracking-wider text-white/55">PRODUCTION PROMISE</div>
                    <Pill>Quality gates</Pill>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-white/90">Every delivery includes:</h3>

                  <div className="mt-4 space-y-3">
                    {[
                      ["Budgets upfront", "Triangles / texel density / texture memory tiers"],
                      ["Multi-light lookdev", "HDRI rotation + key/fill/rim tests"],
                      ["Pipeline hygiene", "Naming, structure, pivots, scale rules"],
                      ["Engine validation", "LOD/collision/material hookups checked"],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold text-white/90">{k}</div>
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: AMBER, boxShadow: `0 0 0 7px ${AMBER_SOFT}` }}
                          />
                        </div>
                        <div className="mt-1 text-sm text-white/65">{v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5">
                    <SoftHr />
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      This page is intentionally “systems-first” — because trust is built in how you ship, not how you
                      talk.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1.5 p-1.5">
                  {WORKS.slice(0, 3).map((w) => (
                    <div key={w.id} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                      <div className="relative aspect-[4/5]">
                        <SmartImg
                          src={w.thumb}
                          alt={w.title}
                          fallbackLabel={w.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="text-[11px] font-semibold text-white/90 line-clamp-2">{w.title}</div>
                          <div className="mt-1 text-[10px] font-medium text-white/55">{w.category}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Pipeline */}
      <section id="section-pipeline" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <SectionHeading
            eyebrow="PRODUCTION PIPELINE"
            title={
              <>
                A connected track. <span className="text-white/70">With gates at every step.</span>
              </>
            }
            subtitle={
              <>
                Pick a step to see outputs and checks. This is how we keep assets consistent across a full set — and why
                integration stays smooth.
              </>
            }
          />

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Connected track */}
            <div className="lg:col-span-8">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-white/90">Track</div>
                  <div className="flex flex-wrap gap-2">
                    <Pill>Budgets</Pill>
                    <Pill>Reviews</Pill>
                    <Pill>Delivery Pack</Pill>
                  </div>
                </div>

                {/* horizontal on desktop, vertical on mobile */}
                <div className="mt-5">
                  <div className="hidden md:block">
                    <div className="relative">
                      <div
                        className="absolute left-3 right-3 top-6 h-[2px] opacity-80"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(255,255,255,0.12), rgba(247,201,72,0.28), rgba(255,255,255,0.12))",
                        }}
                      />
                      <div className="grid grid-cols-9 gap-2">
                        {PIPELINE.map((s) => {
                          const active = s.id === stepId;
                          return (
                            <button
                              key={s.id}
                              onClick={() => setStepId(s.id)}
                              className={cn(
                                "relative rounded-2xl border px-2 pb-3 pt-2 text-left transition",
                                active
                                  ? "border-white/20 bg-white/[0.08]"
                                  : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                              )}
                              style={active ? { boxShadow: `0 18px 70px ${AMBER_GLOW}` } : {}}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className="h-2.5 w-2.5 rounded-full"
                                  style={{
                                    background: active ? AMBER : "rgba(255,255,255,0.25)",
                                    boxShadow: active ? `0 0 0 8px ${AMBER_SOFT}` : "none",
                                  }}
                                />
                                <div className="text-[11px] font-semibold text-white/85 line-clamp-1">{s.title}</div>
                              </div>
                              <div className="mt-1 text-[10px] font-medium text-white/55 line-clamp-2">{s.subtitle}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="md:hidden space-y-2">
                    {PIPELINE.map((s) => {
                      const active = s.id === stepId;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setStepId(s.id)}
                          className={cn(
                            "w-full rounded-2xl border p-4 text-left transition",
                            active ? "border-white/20 bg-white/[0.08]" : "border-white/10 bg-white/[0.02]"
                          )}
                          style={active ? { boxShadow: `0 18px 70px ${AMBER_GLOW}` } : {}}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-semibold text-white/90">{s.title}</div>
                              <div className="mt-1 text-xs text-white/60">{s.subtitle}</div>
                            </div>
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{
                                background: active ? AMBER : "rgba(255,255,255,0.25)",
                                boxShadow: active ? `0 0 0 8px ${AMBER_SOFT}` : "none",
                              }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6">
                  <SoftHr />
                </div>

                {/* Step details */}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="text-xs font-semibold tracking-wider text-white/55">SELECTED STEP</div>
                    <div className="mt-2 text-lg font-semibold text-white/95">{step.title}</div>
                    <div className="mt-1 text-sm text-white/65">{step.subtitle}</div>

                    <div className="mt-4">
                      <div className="text-xs font-semibold tracking-wider text-white/55">OUTPUTS</div>
                      <ul className="mt-3 space-y-2 text-sm text-white/70">
                        {step.outputs.map((o) => (
                          <li key={o} className="flex gap-2">
                            <span style={{ color: AMBER }}>•</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="text-xs font-semibold tracking-wider text-white/55">QUALITY CHECKS</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      These gates are verified before moving forward — so issues don’t stack up late in production.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.checks.map((g) => (
                        <span
                          key={g}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/75"
                        >
                          {QUALITY_GATES[g].title}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
                      <div className="text-sm font-semibold text-white/90">Review cadence</div>
                      <div className="mt-2 text-sm text-white/65">
                        Short review loops keep quality stable: <span className="text-white/80">blockout</span> →{" "}
                        <span className="text-white/80">lookdev</span> → <span className="text-white/80">export</span>.
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Sticky trust sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-6 space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-semibold tracking-wider text-white/55">TRUST SIGNALS</div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <StatChip label="Budgets" value="Defined early" />
                    <StatChip label="Lookdev" value="Multi-light" />
                    <StatChip label="QA" value="Gate-based" />
                    <StatChip label="Pack" value="Structured" />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-semibold tracking-wider text-white/55">WHAT YOU RECEIVE</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    <li className="flex gap-2">
                      <span style={{ color: AMBER }}>•</span> Meshes + LODs + collisions
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: AMBER }}>•</span> PBR textures + masks
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: AMBER }}>•</span> Material presets + notes
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: AMBER }}>•</span> Import settings + readme
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-semibold tracking-wider text-white/55">FAST START</div>
                  <Link
                    href="#section-cta"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                    style={{ boxShadow: `0 22px 90px ${AMBER_GLOW}` }}
                  >
                    Send references → get plan
                  </Link>
                  <p className="mt-3 text-xs leading-relaxed text-white/55">
                    Share a moodboard + target platform. We’ll propose budgets + a gate checklist before production.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SECTION: Quality Gates */}
      <section id="section-gates" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <SectionHeading
            eyebrow="QUALITY GATES"
            title={
              <>
                The checklist that protects you. <span className="text-white/70">Every time.</span>
              </>
            }
            subtitle={
              <>
                These gates are the difference between “looks good in a render” and “works in production”. Open each to
                see what we validate.
              </>
            }
          />

          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7 space-y-3">
              {stepGates.map((g) => (
                <GateAccordion
                  key={g.id}
                  open={openGate === g.id}
                  onToggle={() => setOpenGate((prev) => (prev === g.id ? null : g.id))}
                  gate={g}
                />
              ))}
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
                <div className="text-xs font-semibold tracking-wider text-white/55">WHY THIS MATTERS</div>
                <h3 className="mt-2 text-xl font-semibold text-white/90">Less rework. More consistency.</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Gates prevent late-stage fixes (UV rebuilds, shader surprises, blown memory). They also keep multi-asset
                  sets cohesive: texel density, material response, and lighting behavior stay consistent.
                </p>

                <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="text-sm font-semibold text-white/90">Example: “Lighting test”</div>
                  <p className="mt-2 text-sm text-white/65">
                    We rotate HDRIs + run key/fill/rim presets. If the asset only looks good in one setup, the lookdev
                    isn’t done.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Pill>HDRI rotate</Pill>
                    <Pill>Value control</Pill>
                    <Pill>Specular roll-off</Pill>
                  </div>
                </div>

                <div className="mt-6">
                  <SoftHr />
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <StatChip label="Result" value="Predictable" />
                    <StatChip label="Outcome" value="Integrates" />
                    <StatChip label="Feeling" value="Premium" />
                    <StatChip label="Cost" value="Controlled" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Delivery Pack */}
      <section id="section-pack" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <SectionHeading
            eyebrow="DELIVERY PACK"
            title={
              <>
                The “no-friction” asset handoff. <span className="text-white/70">Structured, predictable, clean.</span>
              </>
            }
            subtitle={
              <>
                This is what you get at the end — a pack that your team can import without digging through files.
              </>
            }
          />

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/90">Sample structure</div>
                  <Pill>Readme included</Pill>
                </div>

                <div className="mt-5 space-y-2">
                  {SAMPLE_PACK.map((row) => (
                    <div
                      key={row.path}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: AMBER, boxShadow: `0 0 0 7px ${AMBER_SOFT}` }}
                        />
                        <div className="text-sm font-semibold text-white/85">{row.path}</div>
                      </div>
                      <div className="text-xs text-white/55">{row.hint}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <SoftHr />
                  <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                      <div className="text-sm font-semibold text-white/90">Import notes</div>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">
                        We include scale, pivot conventions, material hookups, and LOD/collision instructions — so your
                        integration is repeatable.
                      </p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                      <div className="text-sm font-semibold text-white/90">Budgets summary</div>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">
                        Triangle targets, texture tiers, and memory assumptions are documented — no hidden costs.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
                <div className="text-xs font-semibold tracking-wider text-white/55">TOOLS & STANDARDS</div>
                <h3 className="mt-2 text-xl font-semibold text-white/90">Pipeline-compatible stack</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  We match your workflow and deliver in formats your team expects — with PBR discipline and stable naming.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {["Blender/Maya", "ZBrush", "Substance", "Marmoset", "Unreal", "Unity"].map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-5">
                  <div className="text-sm font-semibold text-white/90">Optional add-ons</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    {[
                      "Turntables / packshots",
                      "Wireframe & texture breakdown sheets",
                      "UDIM workflow (if needed)",
                      "Style bible for multi-asset sets",
                    ].map((x) => (
                      <li key={x} className="flex gap-2">
                        <span style={{ color: AMBER }}>•</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="#section-cta"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                  style={{ boxShadow: `0 22px 90px ${AMBER_GLOW}` }}
                >
                  Request a delivery plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Work (curated, still trust-forward) */}
      <section id="section-work" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <SectionHeading
            eyebrow="CURATED WORK"
            title={
              <>
                A small set. <span className="text-white/70">Chosen to show range and discipline.</span>
              </>
            }
            subtitle={
              <>
                Filter by category. Each piece includes notes that reference production logic — not marketing fluff.
              </>
            }
            right={<SegmentedControl value={category} onChange={setCategory} options={CATEGORIES} />}
          />

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorks.map((w, idx) => (
              <motion.div
                key={w.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.03, 0.18) }}
              >
                <div className="relative aspect-[16/11]">
                  <SmartImg
                    src={w.thumb}
                    alt={w.title}
                    fallbackLabel={w.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
                  <div
                    className="absolute inset-0 opacity-0 transition duration-500 hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(120% 120% at 50% 0%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 70%)",
                    }}
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] font-semibold text-white/80">
                      {w.category}
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] font-semibold text-white/65">
                      proof notes
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-white/95">{w.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">{w.notes}</p>
                    </div>
                    <span
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: AMBER, boxShadow: `0 0 0 8px ${AMBER_SOFT}` }}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: CTA */}
      <section id="section-cta" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-6 md:px-8 md:pb-20">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.03] p-7 md:p-10">
            <div
              className="pointer-events-none absolute -right-28 -top-28 h-[560px] w-[560px] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 60% 40%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 62%)",
              }}
            />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <div className="text-xs font-semibold tracking-wider text-white/55">START WITH CLARITY</div>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  Budgets + gates first. <span className="text-white/70">Then we build.</span>
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  Send your references and target platform. We’ll reply with a short plan: pipeline steps, budgets, quality
                  gates, and what the delivery pack includes.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="text-sm font-semibold text-white/90">You send</div>
                    <div className="mt-2 text-sm text-white/70">
                      Moodboard + asset list + target (Unreal/Unity/offline).
                    </div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="text-sm font-semibold text-white/90">We respond</div>
                    <div className="mt-2 text-sm text-white/70">
                      Budgets + QA gates + delivery structure + timeline.
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur">
                  <div className="text-sm font-semibold text-white/90">Quick intake</div>
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    {[
                      { k: "Asset type", v: "Character / Env / Product / ArchViz" },
                      { k: "Style", v: "Realistic / Stylized" },
                      { k: "Target", v: "Unreal / Unity / Offline render" },
                      { k: "Need", v: "Lookdev only / Full production" },
                    ].map((r) => (
                      <div
                        key={r.k}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                      >
                        <div className="text-xs font-semibold text-white/60">{r.k}</div>
                        <div className="text-xs font-semibold text-white/85">{r.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="mailto:hello@wodh.io"
                      className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                      style={{ boxShadow: `0 22px 90px ${AMBER_GLOW}` }}
                    >
                      Email: hello@wodh.io
                    </a>
                    <a
                      href="#section-pipeline"
                      className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] hover:text-white"
                    >
                      Back to pipeline
                    </a>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-white/55">
                    Tip: If you already have budgets (tris/tex/memory), send them — we’ll match exactly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-8 text-center text-xs text-white/45">
            © {new Date().getFullYear()} WODH · 3D & Art Design · Variant B — Production Breakdown
          </footer>
        </div>
      </section>
    </div>
  );
}
