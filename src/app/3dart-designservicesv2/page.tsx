"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* =======================================================================================
   WODH — 3D ART & DESIGN SERVICES
   Variant B — Production Breakdown (Gold/Amber Accent)
   ✅ Wodh v1 atmosphere: indigo base + subtle noise + corner glows
   ✅ “Clay → Final” hero scrub slider (interactive)
   ✅ Proof-first sections: budgets, LODs, wireframes, maps, engine packs
   ✅ Portfolio cards with Beauty/Wire toggle + quick specs
   ✅ Breakdown Viewer modal (Beauty / Clay / Wire / Maps / LODs / Engine / Specs)
   ✅ Online images used where easy (Unsplash static URLs) — safe placeholders
   ✅ Section IDs for easy navigation
======================================================================================= */

type Category = "Characters" | "Environments" | "Product" | "Props";
type StyleTag = "Realtime" | "Cinematic" | "Stylized" | "Realistic" | "Mobile/Quest" | "UE5" | "Unity";
type TabKey = "beauty" | "clay" | "wire" | "maps" | "lods" | "engine" | "specs";

type BudgetLine = {
  label: string;
  target: string;
  notes: string;
};

type PortfolioItem = {
  id: string;
  title: string;
  category: Category;
  tags: StyleTag[];
  subtitle: string;
  // Online placeholders (swap later with your real renders)
  beautyUrl: string;
  clayUrl: string;
  wireUrl: string;
  engineUrl: string; // screenshot-ish placeholder
  specs: Array<{ k: string; v: string }>;
  budget: Array<{ k: string; v: string }>;
  lods: Array<{ name: string; tris: string; tex: string }>;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ----------------------------- Design Tokens ----------------------------- */
const TOKENS = {
  base: "#0C0722", // locked Wodh bg reference
  amber: "#F7B84B",
  amber2: "#FFD57A",
  violet: "#5B2DDC", // micro-accent only
  green: "#9EF315", // micro-accent only
};

/* ------------------------------ Nav + Sections ------------------------------ */
const NAV = [
  { id: "hero", label: "Overview" },
  { id: "showcase", label: "Breakdown" },
  { id: "services", label: "Deliverables" },
  { id: "proof", label: "Budgets" },
  { id: "pipeline", label: "Pipeline" },
  { id: "portfolio", label: "Portfolio" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "Get a Quote" },
] as const;

/* ------------------------------ Data (placeholders) ------------------------------ */
/**
 * NOTE: These Unsplash URLs are stable-ish placeholders.
 * Replace with your real portfolio images later; layout won’t change.
 */
const IMG = {
  heroBeauty:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
  heroClay:
    "https://images.unsplash.com/photo-1520975958225-8fefb3c52f9b?auto=format&fit=crop&w=1600&q=80",
  heroWire:
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3cef?auto=format&fit=crop&w=1600&q=80",
  charA:
    "https://images.unsplash.com/photo-1520975958225-8fefb3c52f9b?auto=format&fit=crop&w=1400&q=80",
  charB:
    "https://images.unsplash.com/photo-1520975869018-2c9e3bba5b7c?auto=format&fit=crop&w=1400&q=80",
  envA:
    "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1400&q=80",
  envB:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
  prodA:
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1400&q=80",
  prodB:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80",
  engineA:
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3cef?auto=format&fit=crop&w=1400&q=80",
  engineB:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=80",
};

const PORTFOLIO: PortfolioItem[] = [
  {
    id: "pb-01",
    title: "Hero Character — Game-Ready Build",
    category: "Characters",
    subtitle: "Topology, bakes, PBR maps, and engine validation — not just a render.",
    tags: ["Realtime", "Realistic", "UE5"],
    beautyUrl: IMG.charB,
    clayUrl: IMG.charA,
    wireUrl: IMG.heroWire,
    engineUrl: IMG.engineA,
    budget: [
      { k: "Target", v: "Realtime (PC/Console)" },
      { k: "Textures", v: "2K–4K sets (as needed)" },
      { k: "LODs", v: "LOD0–LOD3 (silhouette-safe)" },
      { k: "Deliver", v: "FBX + maps + engine pack" },
    ],
    lods: [
      { name: "LOD0", tris: "55k", tex: "4×2K" },
      { name: "LOD1", tris: "28k", tex: "4×2K" },
      { name: "LOD2", tris: "14k", tex: "2×2K" },
      { name: "LOD3", tris: "7k", tex: "2×1K" },
    ],
    specs: [
      { k: "Topo", v: "Deformation-friendly edge flow" },
      { k: "Bakes", v: "Clean normals + AO + curvature" },
      { k: "Maps", v: "Albedo/Normal/Rough/AO" },
      { k: "Engine", v: "UE5 material instance + test scene" },
    ],
  },
  {
    id: "pb-02",
    title: "Modular Alley Kit — Performance Pack",
    category: "Environments",
    subtitle: "Trim sheets + decals + LOD chain + batching-friendly pivots.",
    tags: ["Realtime", "Stylized", "Unity"],
    beautyUrl: IMG.envA,
    clayUrl: IMG.envB,
    wireUrl: IMG.heroWire,
    engineUrl: IMG.engineB,
    budget: [
      { k: "Kit", v: "42 modular pieces + decals" },
      { k: "Textures", v: "Trims + atlases" },
      { k: "LODs", v: "LOD chain for props" },
      { k: "Deliver", v: "Prefab pack + demo scene" },
    ],
    lods: [
      { name: "LOD0", tris: "—", tex: "Trim" },
      { name: "Props", tris: "8k–20k", tex: "1–2K" },
      { name: "LODs", tris: "50–70% reduction", tex: "downscaled" },
      { name: "Drawcalls", tris: "batched", tex: "atlased" },
    ],
    specs: [
      { k: "Workflow", v: "Modular + trims + decals" },
      { k: "Pivots", v: "Grid-aligned, snap-friendly" },
      { k: "Engine", v: "Unity prefabs + instancing notes" },
      { k: "Perf", v: "Budget notes + LOD plan" },
    ],
  },
  {
    id: "pb-03",
    title: "Product Viz — Marketing + Realtime",
    category: "Product",
    subtitle: "Beauty shots plus maps + material variants + in-engine lookdev.",
    tags: ["Cinematic", "Realistic", "UE5"],
    beautyUrl: IMG.prodA,
    clayUrl: IMG.prodB,
    wireUrl: IMG.heroWire,
    engineUrl: IMG.engineA,
    budget: [
      { k: "Shots", v: "Hero + macro + angles" },
      { k: "Variants", v: "Material/Colorways" },
      { k: "Maps", v: "Full PBR bundle" },
      { k: "Deliver", v: "PNG pack + engine scene (opt)" },
    ],
    lods: [
      { name: "LOD0", tris: "40k", tex: "4K" },
      { name: "LOD1", tris: "20k", tex: "2K" },
      { name: "LOD2", tris: "10k", tex: "1K" },
      { name: "LOD3", tris: "5k", tex: "1K" },
    ],
    specs: [
      { k: "Lookdev", v: "Lighting rigs + variants" },
      { k: "Maps", v: "Albedo/Normal/Rough/AO" },
      { k: "Exports", v: "FBX + GLB (optional)" },
      { k: "Notes", v: "Roughness calibration checklist" },
    ],
  },
];

/* ------------------------------ Service + Quality ------------------------------ */
const SERVICE_CARDS: Array<{
  title: string;
  desc: string;
  bullets: string[];
}> = [
  {
    title: "Characters (Game-ready)",
    desc: "Topology, bakes, maps, and engine validation — designed to animate and ship.",
    bullets: ["Clay → final progression", "Wireframes + maps bundle", "Rig-ready topology"],
  },
  {
    title: "Environments (Modular kits)",
    desc: "Modular pieces, trims, decals, and scene assembly with clean budgets.",
    bullets: ["Kit breakdowns", "LODs + batching notes", "Engine demo scenes"],
  },
  {
    title: "Product Visualization",
    desc: "Marketing-grade shots backed by production maps and material accuracy.",
    bullets: ["Variants + lookdev rigs", "Turntables (web-ready)", "Engine-ready scene (optional)"],
  },
  {
    title: "Props & Asset Sets",
    desc: "Hard-surface and organic props delivered as clean, reusable libraries.",
    bullets: ["Consistent scale + pivots", "LOD chains", "Atlas/trim workflows"],
  },
  {
    title: "Rigging (Optional)",
    desc: "Clean deformation setups and export-friendly control rigs.",
    bullets: ["IK/FK systems", "Skinning tests", "Engine export profiles"],
  },
  {
    title: "Optimization (XR/Mobile)",
    desc: "Quest/mobile budgets with measurable performance decisions.",
    bullets: ["Texture budgets", "Draw call hygiene", "Profiling notes"],
  },
];

const BUDGET_TABLE: BudgetLine[] = [
  {
    label: "Hero Character (Realtime)",
    target: "LOD0 40k–70k tris • 2K–4K maps",
    notes: "Depends on camera distance + platform; we provide LOD plan.",
  },
  {
    label: "Environment Props (Realtime)",
    target: "2k–20k tris • 1K–2K maps",
    notes: "Atlas/trims preferred for consistency + perf.",
  },
  {
    label: "XR / Mobile Props",
    target: "1k–10k tris • 512–1K maps",
    notes: "Quest/mobile safe budgets; LODs often mandatory.",
  },
  {
    label: "Product Viz",
    target: "20k–60k tris • 2K–4K maps",
    notes: "Beauty shots plus optional realtime pack.",
  },
];

const PIPELINE = [
  { k: "01", title: "Brief + Budgets", desc: "Targets (tris/maps/LODs), platform constraints, style refs." },
  { k: "02", title: "Blockout", desc: "Silhouette + proportions locked early for fast iteration." },
  { k: "03", title: "High/Low + Bakes", desc: "Normals/AO/curvature — clean, artifact-free foundation." },
  { k: "04", title: "Maps + Materials", desc: "PBR maps + calibrated roughness response." },
  { k: "05", title: "Wireframe + LOD Plan", desc: "Proof + measurable optimization decisions." },
  { k: "06", title: "Engine Validation", desc: "UE5/Unity import + material setup + test scene." },
  { k: "07", title: "Final Polish", desc: "Controlled pass after lookdev lock." },
  { k: "08", title: "Handoff Pack", desc: "Files + documentation + optional integration help." },
];

const FAQ = [
  {
    q: "Do you provide wireframes, maps, and LODs by default?",
    a: "Yes — Variant B is designed around proof. We include wireframes/maps/specs and add LOD chains based on your platform needs.",
  },
  {
    q: "Can you deliver UE5/Unity-ready packs?",
    a: "Yes. We can deliver FBX/GLB + materials, plus a small test scene or prefabs to validate imports and shading.",
  },
  {
    q: "How do you keep revisions under control?",
    a: "We lock silhouette at blockout, lock materials at lookdev, and then polish. Each stage has clear approval gates.",
  },
  {
    q: "Do you optimize for Quest/mobile?",
    a: "Yes — we plan budgets early and provide LODs, texture constraints, and draw-call friendly layouts.",
  },
];

/* -------------------------------- UI Bits -------------------------------- */
function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "amber" | "violet" | "green";
}) {
  const toneCls =
    tone === "amber"
      ? "border-[rgba(247,184,75,.35)] text-[rgba(255,213,122,.92)] bg-[rgba(247,184,75,.08)]"
      : tone === "violet"
      ? "border-[rgba(91,45,220,.35)] text-[rgba(209,195,255,.92)] bg-[rgba(91,45,220,.08)]"
      : tone === "green"
      ? "border-[rgba(158,243,21,.28)] text-[rgba(210,255,140,.92)] bg-[rgba(158,243,21,.06)]"
      : "border-white/12 text-white/75 bg-white/5";

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs tracking-[-0.01em] backdrop-blur",
        toneCls
      )}
    >
      {children}
    </span>
  );
}

function SectionHeader({
  chip,
  title,
  desc,
}: {
  chip: React.ReactNode;
  title: React.ReactNode;
  desc: string;
}) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="mb-3 flex flex-wrap items-center gap-2">{chip}</div>
      <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-pretty text-sm leading-6 text-white/62 sm:text-[15px]">
        {desc}
      </p>
    </div>
  );
}

/* ----------------------------- Atmosphere Layers ----------------------------- */
function Noise() {
  const svg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 0.35 0"/>
      </filter>
      <rect width="160" height="160" filter="url(#n)" opacity="0.55"/>
    </svg>
  `);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
      style={{ backgroundImage: `url("data:image/svg+xml,${svg}")` }}
    />
  );
}

function CornerGlows() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(247,184,75,.22), rgba(247,184,75,0) 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-48 -bottom-48 h-[600px] w-[600px] rounded-full blur-[90px]"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, rgba(255,213,122,.18), rgba(255,213,122,0) 70%)",
        }}
      />
      {/* micro v1 cross-studio accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-28 h-44 w-44 rounded-full blur-[70px] opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(91,45,220,.18), rgba(91,45,220,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-12 bottom-24 h-44 w-44 rounded-full blur-[70px] opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(158,243,21,.14), rgba(158,243,21,0) 70%)",
        }}
      />
    </>
  );
}

/* --------------------------- Cursor Studio Light --------------------------- */
function useStudioLight(ref: React.RefObject<HTMLElement>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let raf = 0;
    let mx = 0;
    let my = 0;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${mx}px`);
        el.style.setProperty("--my", `${my}px`);
        raf = 0;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [ref, enabled]);
}

/* ------------------------------- Modal Shell ------------------------------- */
function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-md" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[rgba(10,6,25,.72)] shadow-[0_30px_120px_rgba(0,0,0,.55)]"
            initial={{ y: 12, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 12, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="absolute inset-0">
              <CornerGlows />
              <Noise />
            </div>

            <div className="relative flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div className="min-w-0">
                <div className="text-xs text-white/55">Production Breakdown Viewer</div>
                <div className="truncate text-sm font-semibold tracking-[-0.01em] text-white">
                  {title}
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-xs text-white/75 hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div className="relative p-5">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ------------------------------- Image Plate ------------------------------ */
function ImgPlate({
  src,
  alt,
  overlay = "none",
}: {
  src: string;
  alt: string;
  overlay?: "none" | "wire" | "maps" | "grid";
}) {
  const overlayLayer =
    overlay === "wire"
      ? "repeating-linear-gradient(90deg, rgba(255,255,255,.14) 0 1px, rgba(255,255,255,0) 1px 18px), repeating-linear-gradient(0deg, rgba(255,255,255,.10) 0 1px, rgba(255,255,255,0) 1px 18px)"
      : overlay === "maps"
      ? "linear-gradient(135deg, rgba(91,45,220,.16), rgba(247,184,75,.14))"
      : overlay === "grid"
      ? "repeating-linear-gradient(90deg, rgba(255,255,255,.07) 0 1px, rgba(255,255,255,0) 1px 22px), repeating-linear-gradient(0deg, rgba(255,255,255,.06) 0 1px, rgba(255,255,255,0) 1px 22px)"
      : "";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover opacity-[0.92]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/45" />
      {overlay !== "none" ? (
        <div className="absolute inset-0 opacity-[0.55]" style={{ background: overlayLayer }} />
      ) : null}
      <Noise />
    </div>
  );
}

/* -------------------------- Clay → Final Scrubber -------------------------- */
function ClayFinalScrub({
  claySrc,
  finalSrc,
  wireSrc,
  value,
  onChange,
  reduceMotion,
}: {
  claySrc: string;
  finalSrc: string;
  wireSrc?: string;
  value: number; // 0..100
  onChange: (v: number) => void;
  reduceMotion: boolean;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-4 backdrop-blur">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-xs text-white/55">Hero Breakdown</div>
          <div className="text-sm font-semibold text-white">Clay → Final (Scrub)</div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="amber">Production Proof</Chip>
          <Chip>Budgets</Chip>
          <Chip>Maps</Chip>
        </div>
      </div>

      <div className="relative h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        {/* Clay base */}
        <div className="absolute inset-0">
          <ImgPlate src={claySrc} alt="Clay render" overlay="grid" />
        </div>

        {/* Final overlay clipped */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - v}% 0 0 round 16px)`,
          }}
        >
          <ImgPlate src={finalSrc} alt="Final render" overlay="none" />
        </div>

        {/* Divider line */}
        <div
          aria-hidden
          className="absolute top-0 h-full w-[2px] bg-[rgba(255,213,122,.75)]"
          style={{ left: `${v}%`, transform: "translateX(-1px)" }}
        />

        {/* Optional subtle wire stamp */}
        {wireSrc ? (
          <div className="absolute right-4 top-4 hidden w-48 sm:block">
            <div className="rounded-2xl border border-white/10 bg-[rgba(0,0,0,.24)] p-2 backdrop-blur">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-[10px] text-white/55">Wireframe</div>
                <Chip tone="amber">Proof</Chip>
              </div>
              <div className="h-24">
                <ImgPlate src={wireSrc} alt="Wireframe preview" overlay="wire" />
              </div>
            </div>
          </div>
        ) : null}

        {/* Micro annotations */}
        <div className="absolute left-4 bottom-4 rounded-2xl border border-white/10 bg-[rgba(0,0,0,.22)] px-3 py-2 backdrop-blur">
          <div className="text-[10px] text-white/55">Scrub: {v}% Final</div>
          <div className="text-xs font-semibold text-white">Silhouette lock → maps → engine test</div>
        </div>

        {!reduceMotion ? (
          <motion.div
            className="pointer-events-none absolute -left-1/3 top-[-35%] h-[170%] w-[55%] rotate-12 opacity-55"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,213,122,0) 0%, rgba(255,213,122,.16) 45%, rgba(255,213,122,0) 100%)",
              filter: "blur(10px)",
              mixBlendMode: "screen",
            }}
            animate={{ x: ["-20%", "120%"] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <div className="text-xs text-white/55">Move the slider to compare</div>
          <div className="text-sm text-white/70">
            Clay (form) → Final (materials). This is how we keep production predictable.
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-white/55">Clay</span>
          <input
            aria-label="Clay to final slider"
            type="range"
            min={0}
            max={100}
            value={v}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-44 accent-[rgba(255,213,122,.9)]"
          />
          <span className="text-xs text-white/55">Final</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Main Page ------------------------------- */
export default function Page_3DArt_ProductionBreakdown() {
  const reduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  useStudioLight(pageRef, !reduceMotion);

  const [scrub, setScrub] = useState(55);

  const [filter, setFilter] = useState<Category | "All">("All");
  const [active, setActive] = useState<PortfolioItem | null>(null);
  const [tab, setTab] = useState<TabKey>("beauty");

  useEffect(() => {
    if (!active) return;
    setTab("beauty");
  }, [active]);

  const filtered = useMemo(() => {
    if (filter === "All") return PORTFOLIO;
    return PORTFOLIO.filter((p) => p.category === filter);
  }, [filter]);

  // per-card quick wire toggle
  const [wireOn, setWireOn] = useState<Record<string, boolean>>({});
  const toggleWire = (id: string) => setWireOn((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-[#0C0722] text-white"
      style={{
        backgroundImage:
          "radial-gradient(1000px circle at var(--mx, 50%) var(--my, 30%), rgba(247,184,75,.10), rgba(12,7,34,0) 55%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <CornerGlows />
        <Noise />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px circle at 50% -10%, rgba(255,255,255,.06), rgba(255,255,255,0) 55%)",
          }}
        />
      </div>

      {/* Sticky Top Nav */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(12,7,34,.55)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl border border-white/10 bg-white/5" />
            <div className="leading-tight">
              <div className="text-xs text-white/55">WODH • 3D Studio</div>
              <div className="text-sm font-semibold tracking-[-0.01em] text-white">
                3D Art & Design Services
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#portfolio"
              className="rounded-full border border-[rgba(247,184,75,.25)] bg-[rgba(247,184,75,.08)] px-3 py-1.5 text-xs text-[rgba(255,213,122,.92)] hover:bg-[rgba(247,184,75,.12)]"
            >
              View Portfolio
            </a>
            <a
              href="#cta"
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        {/* =========================
           SECTION 1 — HERO (id=hero)
        ========================== */}
        <section id="hero" className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Chip tone="amber">Variant B — Production Breakdown</Chip>
                <Chip>Gold/Amber Accent</Chip>
                <Chip tone="violet">Games-ready</Chip>
                <Chip tone="green">XR-ready</Chip>
              </div>

              <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Proof-first 3D art:{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.85), rgba(255,255,255,.75))",
                  }}
                >
                  wireframes, maps, LODs
                </span>{" "}
                — ready for engine.
              </h1>

              <p className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-white/62 sm:text-[15px]">
                This variant is built to win trust fast. We show budgets, breakdowns, and delivery packs — so clients
                know exactly what they’re buying and how it will ship.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <a
                  href="#cta"
                  className="rounded-2xl border border-[rgba(247,184,75,.25)] bg-[rgba(247,184,75,.10)] px-4 py-2 text-sm text-[rgba(255,213,122,.95)] hover:bg-[rgba(247,184,75,.14)]"
                >
                  Request estimate
                </a>
                <a
                  href="#showcase"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                >
                  See breakdowns
                </a>
              </div>

              <div className="mt-7 grid gap-2 sm:grid-cols-3">
                {[
                  { k: "Breakdowns", v: "Clay / wire / maps" },
                  { k: "Budgets", v: "Tris / textures / LODs" },
                  { k: "Engine packs", v: "UE5 / Unity validation" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <div className="text-xs text-white/55">{s.k}</div>
                    <div className="mt-1 text-sm font-semibold tracking-[-0.01em] text-white">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <ClayFinalScrub
              claySrc={IMG.heroClay}
              finalSrc={IMG.heroBeauty}
              wireSrc={IMG.heroWire}
              value={scrub}
              onChange={setScrub}
              reduceMotion={!!reduceMotion}
            />
          </div>
        </section>

        {/* =========================
           SECTION 2 — BREAKDOWN (id=showcase)
        ========================== */}
        <section id="showcase" className="relative mt-16">
          <SectionHeader
            chip={
              <>
                <Chip tone="amber">Signature</Chip>
                <Chip>Breakdown-first presentation</Chip>
              </>
            }
            title={
              <>
                Show the{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  production
                </span>{" "}
                — not just the beauty.
              </>
            }
            desc="This section is your credibility engine: budgets, proof panels, and what “engine-ready” actually means."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-5 backdrop-blur lg:col-span-2">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-white/55">Proof Panels</div>
                  <div className="text-sm font-semibold text-white">Beauty + Wire + Maps</div>
                </div>
                <Chip tone="amber">Client-safe proof</Chip>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="h-44">
                  <ImgPlate src={IMG.charB} alt="Beauty preview" />
                </div>
                <div className="h-44">
                  <ImgPlate src={IMG.heroWire} alt="Wire preview" overlay="wire" />
                </div>
                <div className="h-44">
                  <ImgPlate src={IMG.engineA} alt="Maps preview" overlay="maps" />
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-xs text-white/55">What clients understand instantly</div>
                    <div className="text-sm font-semibold text-white">
                      “Clean bakes + calibrated materials + predictable delivery”
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip>Normals</Chip>
                    <Chip>Roughness</Chip>
                    <Chip tone="amber">LOD plan</Chip>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-4 backdrop-blur">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">Budget Checklist</div>
                  <Chip tone="amber">Required</Chip>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  {[
                    "Tris target + LOD chain",
                    "Texture set sizes (1K/2K/4K)",
                    "Draw calls + instancing notes",
                    "Export formats + naming conventions",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(255,213,122,.75)]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-4 backdrop-blur">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">Engine Pack</div>
                  <Chip tone="amber">Optional</Chip>
                </div>
                <div className="text-sm text-white/62">
                  UE5 material instance / Unity prefabs + small test scene to validate shading and scale.
                </div>
                <div className="mt-3 h-28">
                  <ImgPlate src={IMG.engineB} alt="Engine pack preview" overlay="grid" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
           SECTION 3 — SERVICES (id=services)
        ========================== */}
        <section id="services" className="relative mt-16">
          <SectionHeader
            chip={
              <>
                <Chip tone="amber">Deliverables</Chip>
                <Chip>Procurement-friendly outputs</Chip>
              </>
            }
            title={
              <>
                What you{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  receive
                </span>{" "}
                (every time)
              </>
            }
            desc="Variant B keeps everything measurable and shippable. Beauty is included, but production proof leads."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CARDS.map((s) => (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-5 backdrop-blur"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div
                    className="absolute -left-24 -top-24 h-56 w-56 rounded-full blur-[60px]"
                    style={{
                      background:
                        "radial-gradient(circle at 40% 40%, rgba(247,184,75,.18), rgba(247,184,75,0) 70%)",
                    }}
                  />
                </div>

                <div className="relative">
                  <div className="text-sm font-semibold tracking-[-0.01em] text-white">{s.title}</div>
                  <div className="mt-1 text-sm text-white/62">{s.desc}</div>

                  <ul className="mt-4 space-y-2 text-sm text-white/70">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(255,213,122,.75)]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                    <div className="text-xs text-white/55">Included</div>
                    <div className="text-xs font-semibold text-white/80">Wire • Maps • Specs • (LODs as needed)</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================
           SECTION 4 — BUDGETS (id=proof)
        ========================== */}
        <section id="proof" className="relative mt-16">
          <SectionHeader
            chip={
              <>
                <Chip tone="amber">Budgets</Chip>
                <Chip>Performance + scope clarity</Chip>
              </>
            }
            title={
              <>
                Budgets that keep{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  production predictable
                </span>
              </>
            }
            desc="These aren’t hard limits — they’re targets we align on early, then validate with proof packs."
          />

          <div className="grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
            <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-5 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-white">Typical targets</div>
                <Chip tone="amber">Scope signal</Chip>
              </div>

              <div className="space-y-3">
                {BUDGET_TABLE.map((b) => (
                  <div key={b.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="text-sm font-semibold text-white">{b.label}</div>
                      <Chip>{b.target}</Chip>
                    </div>
                    <div className="mt-2 text-sm text-white/62">{b.notes}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-5 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-white">Proof included</div>
                <Chip tone="amber">Risk reducer</Chip>
              </div>

              <div className="space-y-2">
                {[
                  { k: "Wireframes", v: "Topology clarity + bake sanity checks" },
                  { k: "Maps", v: "PBR bundle + roughness calibration" },
                  { k: "LODs", v: "Measured reductions with silhouette safety" },
                  { k: "Engine test", v: "Import validation (UE/Unity)" },
                ].map((x) => (
                  <div key={x.k} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs text-white/55">{x.k}</div>
                    <div className="mt-1 text-sm font-semibold text-white">{x.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/55">Default gates</div>
                <div className="mt-1 text-sm font-semibold text-white">
                  Blockout lock → Lookdev lock → Final polish
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
           SECTION 5 — PIPELINE (id=pipeline)
        ========================== */}
        <section id="pipeline" className="relative mt-16">
          <SectionHeader
            chip={
              <>
                <Chip tone="amber">Pipeline</Chip>
                <Chip>Approval gates</Chip>
              </>
            }
            title={
              <>
                A pipeline built for{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  scale
                </span>{" "}
                and consistency
              </>
            }
            desc="Variant B emphasizes measurable checkpoints so collaboration stays clean and decisions stay fast."
          />

          <div className="grid gap-3 lg:grid-cols-4">
            {PIPELINE.map((p) => (
              <div
                key={p.k}
                className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-5 backdrop-blur"
              >
                <div className="flex items-center justify-between">
                  <Chip tone="amber">{p.k}</Chip>
                  <span className="text-[10px] text-white/45">Step</span>
                </div>
                <div className="mt-3 text-sm font-semibold text-white">{p.title}</div>
                <div className="mt-1 text-sm text-white/62">{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================
           SECTION 6 — PORTFOLIO (id=portfolio)
        ========================== */}
        <section id="portfolio" className="relative mt-16">
          <SectionHeader
            chip={
              <>
                <Chip tone="amber">Portfolio</Chip>
                <Chip>Toggle wire • open breakdown viewer</Chip>
              </>
            }
            title={
              <>
                Portfolio that{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  proves
                </span>{" "}
                production quality
              </>
            }
            desc="Filter by category. Toggle wireframe on each card. Click to open the full breakdown viewer."
          />

          <div className="mb-4 flex flex-wrap items-center gap-2">
            {(["All", "Characters", "Environments", "Product", "Props"] as const).map((c) => {
              const on = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={cx(
                    "rounded-full border px-3 py-1.5 text-xs backdrop-blur transition",
                    on
                      ? "border-[rgba(247,184,75,.30)] bg-[rgba(247,184,75,.12)] text-[rgba(255,213,122,.95)]"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <div key={p.id} className="group relative">
                <button
                  onClick={() => setActive(p)}
                  className="w-full text-left"
                  aria-label={`Open breakdown for ${p.title}`}
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-4 backdrop-blur">
                    <div className="relative flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold tracking-[-0.01em] text-white">{p.title}</div>
                        <div className="mt-1 text-sm text-white/62">{p.subtitle}</div>
                      </div>
                      <Chip tone="amber">{p.category}</Chip>
                    </div>

                    <div className="relative mt-3 flex flex-wrap gap-2">
                      {p.tags.slice(0, 3).map((t) => (
                        <Chip key={t} tone={t === "UE5" || t === "Cinematic" ? "amber" : "neutral"}>
                          {t}
                        </Chip>
                      ))}
                    </div>

                    {/* Visual */}
                    <div className="relative mt-4 h-44">
                      <ImgPlate
                        src={wireOn[p.id] ? p.wireUrl : p.beautyUrl}
                        alt={`${p.title} preview`}
                        overlay={wireOn[p.id] ? "wire" : "none"}
                      />
                      <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-black/30 px-2 py-1 text-[10px] text-white/70 backdrop-blur">
                        {wireOn[p.id] ? "Wireframe" : "Beauty"}
                      </div>
                    </div>

                    {/* Quick proof chips */}
                    <div className="relative mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                      <div className="text-xs text-white/55">Click for: Clay • Maps • LODs • Engine • Specs</div>
                      <div className="text-xs font-semibold text-[rgba(255,213,122,.92)]">Breakdown Viewer</div>
                    </div>
                  </div>
                </button>

                {/* Wire toggle (separate button) */}
                <button
                  onClick={() => toggleWire(p.id)}
                  className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
                  aria-label={`Toggle wireframe for ${p.title}`}
                >
                  {wireOn[p.id] ? "Beauty" : "Wire"}
                </button>
              </div>
            ))}
          </div>

          {/* Breakdown Modal */}
          <Modal
            open={!!active}
            onClose={() => setActive(null)}
            title={active ? `${active.title} — ${active.category}` : "Breakdown Viewer"}
          >
            {active ? (
              <div className="grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-xs text-white/55">{active.subtitle}</div>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {active.tags.map((t) => (
                          <Chip key={t} tone={t === "UE5" || t === "Cinematic" ? "amber" : "neutral"}>
                            {t}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {(["beauty", "clay", "wire", "maps", "lods", "engine", "specs"] as const).map((t) => {
                        const on = tab === t;
                        return (
                          <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={cx(
                              "rounded-full border px-3 py-1.5 text-xs transition",
                              on
                                ? "border-[rgba(247,184,75,.30)] bg-[rgba(247,184,75,.12)] text-[rgba(255,213,122,.95)]"
                                : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                            )}
                          >
                            {t === "beauty"
                              ? "Beauty"
                              : t === "clay"
                              ? "Clay"
                              : t === "wire"
                              ? "Wire"
                              : t === "maps"
                              ? "Maps"
                              : t === "lods"
                              ? "LODs"
                              : t === "engine"
                              ? "Engine"
                              : "Specs"}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="relative h-[380px]">
                    {tab === "specs" ? (
                      <div className="h-full rounded-2xl border border-white/10 bg-black/20 p-5">
                        <div className="text-sm font-semibold text-white">Tech sheet</div>
                        <div className="mt-3 space-y-2">
                          {active.specs.map((s) => (
                            <div
                              key={s.k}
                              className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-3"
                            >
                              <div className="text-sm text-white/70">{s.k}</div>
                              <div className="text-sm font-semibold text-white text-right">{s.v}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : tab === "lods" ? (
                      <div className="h-full rounded-2xl border border-white/10 bg-black/20 p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="text-sm font-semibold text-white">LOD Plan</div>
                          <Chip tone="amber">Performance</Chip>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {active.lods.map((l) => (
                            <div key={l.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold text-white">{l.name}</div>
                                <Chip>{l.tris}</Chip>
                              </div>
                              <div className="mt-2 text-sm text-white/62">Textures: {l.tex}</div>
                              <div className="mt-3 h-20">
                                <ImgPlate src={active.wireUrl} alt="LOD wire preview" overlay="wire" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : tab === "maps" ? (
                      <div className="h-full rounded-2xl border border-white/10 bg-black/20 p-5">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="text-sm font-semibold text-white">Maps Bundle</div>
                          <Chip tone="amber">PBR</Chip>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {[
                            { n: "Albedo", src: active.beautyUrl, o: "none" as const },
                            { n: "Normal", src: active.engineUrl, o: "maps" as const },
                            { n: "Roughness", src: active.clayUrl, o: "grid" as const },
                            { n: "AO", src: active.wireUrl, o: "wire" as const },
                          ].map((m) => (
                            <div key={m.n} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                              <div className="mb-2 text-xs text-white/55">{m.n}</div>
                              <div className="h-32">
                                <ImgPlate src={m.src} alt={`${m.n} map`} overlay={m.o} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : tab === "engine" ? (
                      <div className="h-full">
                        <ImgPlate src={active.engineUrl} alt="Engine validation preview" overlay="grid" />
                        <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                          <div className="text-xs text-white/55">Engine validation</div>
                          <div className="mt-1 text-sm font-semibold text-white">
                            Import test • scale check • shader sanity • lighting response
                          </div>
                        </div>
                      </div>
                    ) : (
                      <ImgPlate
                        src={
                          tab === "beauty"
                            ? active.beautyUrl
                            : tab === "clay"
                            ? active.clayUrl
                            : active.wireUrl
                        }
                        alt="Breakdown view"
                        overlay={tab === "wire" ? "wire" : tab === "clay" ? "grid" : "none"}
                      />
                    )}
                  </div>
                </div>

                {/* Right column: budgets + CTA */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold text-white">Budget Snapshot</div>
                  <div className="mt-3 space-y-2">
                    {active.budget.map((b) => (
                      <div key={b.k} className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <div className="text-xs text-white/55">{b.k}</div>
                        <div className="mt-1 text-sm font-semibold text-white">{b.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs text-white/55">Why this converts</div>
                    <div className="mt-1 text-sm text-white/70 leading-6">
                      Clients don’t have to guess. They can see the topology discipline, map quality, LOD plan, and
                      engine readiness — before they say yes.
                    </div>
                  </div>

                  <a
                    href="#cta"
                    onClick={() => setActive(null)}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-[rgba(247,184,75,.25)] bg-[rgba(247,184,75,.10)] px-4 py-2 text-sm text-[rgba(255,213,122,.95)] hover:bg-[rgba(247,184,75,.14)]"
                  >
                    Request estimate for similar work
                  </a>
                </div>
              </div>
            ) : null}
          </Modal>
        </section>

        {/* =========================
           SECTION 7 — FAQ (id=faq)
        ========================== */}
        <section id="faq" className="relative mt-16">
          <SectionHeader
            chip={
              <>
                <Chip tone="amber">FAQ</Chip>
                <Chip>Fast answers</Chip>
              </>
            }
            title={
              <>
                Procurement-friendly{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  clarity
                </span>
              </>
            }
            desc="Designed to remove ambiguity and speed up decisions."
          />

          <div className="grid gap-3 lg:grid-cols-2">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-5 backdrop-blur"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-white">
                  <span className="flex items-center justify-between gap-3">
                    {f.q}
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/60 group-open:bg-white/10">
                      Open
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-white/62">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* =========================
           SECTION 8 — FINAL CTA (id=cta)
        ========================== */}
        <section id="cta" className="relative mt-16">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(255,255,255,.04)] p-6 backdrop-blur sm:p-8">
            <div className="absolute inset-0">
              <CornerGlows />
              <Noise />
              <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/35" />
            </div>

            <div className="relative grid gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Chip tone="amber">Variant B</Chip>
                  <Chip>Breakdowns included</Chip>
                  <Chip>Budgets first</Chip>
                </div>

                <h3 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                  Send 3 references + platform — we’ll reply with a clean estimate + budget plan.
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
                  We’ll propose deliverables (beauty + wire + maps + LODs), a timeline, and an engine-ready option if you
                  need it.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href="mailto:hello@wodh.io"
                    className="rounded-2xl border border-[rgba(247,184,75,.25)] bg-[rgba(247,184,75,.10)] px-4 py-2 text-sm text-[rgba(255,213,122,.95)] hover:bg-[rgba(247,184,75,.14)]"
                  >
                    Email us
                  </a>
                  <a
                    href="#portfolio"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                  >
                    Browse work
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-semibold text-white">Include in your message</div>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {[
                    "Category: Characters / Environments / Product / Props",
                    "Target platform: PC/Console/Mobile/Quest",
                    "Style reference: links or images",
                    "Deliverables: breakdown pack / engine pack / renders",
                    "Deadline + budget range (optional)",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(255,213,122,.75)]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/55">Default output</div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    Beauty + Clay + Wire + Maps + Specs (LODs + Engine pack as needed)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/10 bg-[rgba(12,7,34,.35)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-white/60 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} WODH — 3D Art & Design Studio</div>
          <div className="flex items-center gap-2">
            <Chip tone="amber">Variant B</Chip>
            <Chip>Production Breakdown</Chip>
          </div>
        </div>
      </footer>
    </div>
  );
}
