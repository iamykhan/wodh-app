"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* =======================================================================================
   WODH — 3D ART & DESIGN SERVICES
   Variant A — Lookdev Studio (Gold/Amber Accent)
   ✅ Wodh v1 atmosphere: indigo base + subtle noise + corner glows
   ✅ Cursor studio-light (subtle)
   ✅ Depth-stacked cards + tilt micro-parallax
   ✅ Wireframe reveal + specular sweep
   ✅ Filterable portfolio + Lookdev modal (Beauty/Wire/Maps/Specs)
   ✅ Section IDs for easy navigation
======================================================================================= */

type Studio = "3D";
type Category = "Characters" | "Environments" | "Product" | "Props";
type StyleTag = "Realtime" | "Cinematic" | "Stylized" | "Realistic" | "Mobile/Quest" | "UE5" | "Unity";

type PortfolioItem = {
  id: string;
  title: string;
  category: Category;
  tags: StyleTag[];
  subtitle: string;
  // Visuals are represented with lightweight “themes” (no heavy viewers)
  theme: "amberGlass" | "amberSteel" | "amberClay" | "amberNeon";
  // “tech sheet” proof in modal
  specs: Array<{ k: string; v: string }>;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ----------------------------- Design Tokens ----------------------------- */
const TOKENS = {
  base: "#0C0722", // locked Wodh bg reference
  ink: "text-white/90",
  muted: "text-white/62",
  line: "border-white/10",
  amber: "#F7B84B",
  amber2: "#FFD57A",
  violet: "#5B2DDC", // micro-accent only
  green: "#9EF315", // micro-accent only
};

/* ------------------------------ Data Models ------------------------------ */
const NAV = [
  { id: "hero", label: "Overview" },
  { id: "showcase", label: "Showcase" },
  { id: "services", label: "Deliverables" },
  { id: "proof", label: "Quality Bar" },
  { id: "pipeline", label: "Pipeline" },
  { id: "portfolio", label: "Portfolio" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "Get a Quote" },
] as const;

const SERVICE_CARDS: Array<{
  title: string;
  desc: string;
  bullets: string[];
  icon: "char" | "env" | "prod" | "rig" | "anim" | "opt";
}> = [
  {
    title: "Character Art",
    desc: "Game-ready characters with clean topology, bakes, and PBR sets.",
    bullets: ["Stylized / realistic", "UV + texel density", "Rig-ready delivery"],
    icon: "char",
  },
  {
    title: "Environment & Modular Kits",
    desc: "World-building with modular systems, decals, trims, and set dressing.",
    bullets: ["Modular kits", "Hero props + set", "UE/Unity scene assembly"],
    icon: "env",
  },
  {
    title: "Product & Visualization",
    desc: "Premium product renders with real-time lookdev and material fidelity.",
    bullets: ["Lookdev + lighting", "Turntables", "Marketing packs"],
    icon: "prod",
  },
  {
    title: "Rigging & Skinning",
    desc: "Humanoid and creature rigs with stable deformation.",
    bullets: ["IK/FK controls", "Facial basics", "Game-export friendly"],
    icon: "rig",
  },
  {
    title: "Animation",
    desc: "Polished loops and cinematics-ready motion.",
    bullets: ["Game loops", "Cinematics beats", "Mocap cleanup (optional)"],
    icon: "anim",
  },
  {
    title: "Optimization",
    desc: "Performance budgets for XR/mobile and real-time pipelines.",
    bullets: ["LODs + impostors", "Draw call hygiene", "Quest/mobile constraints"],
    icon: "opt",
  },
];

const QUALITY_POINTS = [
  {
    title: "Topology & Deformation",
    desc: "Edge flow that rigs cleanly and bakes without artifacts.",
    metric: "Clean bakes",
  },
  {
    title: "UVs & Texel Density",
    desc: "Consistent texel density, logical splits, packed UVs with padding.",
    metric: "Consistent density",
  },
  {
    title: "PBR Consistency",
    desc: "Material response matches real-world references across lighting setups.",
    metric: "Lookdev checks",
  },
  {
    title: "Engine-Ready Delivery",
    desc: "Naming conventions, pivots, export profiles, and test imports.",
    metric: "UE / Unity",
  },
  {
    title: "Performance Budgets",
    desc: "LODs, texture budgets, and scene profiling aligned with target platforms.",
    metric: "XR / Mobile",
  },
];

const PIPELINE = [
  { k: "01", title: "Brief + References", desc: "We align on style, budget, target platform, and deliverables." },
  { k: "02", title: "Blockout", desc: "Proportions + silhouette locked early for fast iteration." },
  { k: "03", title: "High / Low + Bakes", desc: "Clean normal bakes, AO, curvature — artifact-free fundamentals." },
  { k: "04", title: "Texturing (PBR)", desc: "Material definition, wear, and story — reference-driven." },
  { k: "05", title: "Lookdev + Lighting", desc: "Studio setups + in-engine validation for consistent response." },
  { k: "06", title: "Rig / Anim (if needed)", desc: "Controls, skinning, and test cycles with your runtime targets." },
  { k: "07", title: "Optimization + LODs", desc: "Budgets, draw calls, and memory aligned to platform constraints." },
  { k: "08", title: "Handoff + Integration", desc: "Clean exports + documentation; optional engine integration." },
];

const PORTFOLIO: PortfolioItem[] = [
  {
    id: "p-amber-01",
    title: "Hero Character — Realtime Lookdev",
    category: "Characters",
    subtitle: "Skin + fabric material response under studio HDRIs.",
    tags: ["Realtime", "Realistic", "UE5"],
    theme: "amberGlass",
    specs: [
      { k: "Topology", v: "Game-ready, deformation-friendly loops" },
      { k: "Textures", v: "4× 2K sets (Albedo/Normal/Rough/AO)" },
      { k: "Export", v: "FBX + UE5 material instance" },
      { k: "Extras", v: "Turntable + lighting presets" },
    ],
  },
  {
    id: "p-amber-02",
    title: "Modular Alley Kit — Environment",
    category: "Environments",
    subtitle: "Trim sheets + decals + modular pieces for fast scene builds.",
    tags: ["Realtime", "Stylized", "Unity"],
    theme: "amberSteel",
    specs: [
      { k: "Kit", v: "42 modular pieces + decal set" },
      { k: "Textures", v: "Trim sheet workflow + atlased props" },
      { k: "Perf", v: "LOD chain + batching-friendly pivots" },
      { k: "Handoff", v: "Unity prefab pack + scene demo" },
    ],
  },
  {
    id: "p-amber-03",
    title: "Product Viz — Studio Pack",
    category: "Product",
    subtitle: "Material accuracy with specular sweeps and controlled highlights.",
    tags: ["Cinematic", "Realistic", "UE5"],
    theme: "amberNeon",
    specs: [
      { k: "Renders", v: "Keyshots + hero angles + macro details" },
      { k: "Lookdev", v: "Material variants + lighting rigs" },
      { k: "Motion", v: "Short loop turntable (web-ready)" },
      { k: "Delivery", v: "PNG + layered PSD (optional)" },
    ],
  },
  {
    id: "p-amber-04",
    title: "Creature — Clay → Final",
    category: "Characters",
    subtitle: "Sculpt fidelity preserved through bakes and clean PBR.",
    tags: ["Realtime", "Stylized", "UE5"],
    theme: "amberClay",
    specs: [
      { k: "Sculpt", v: "High poly → low poly bake pipeline" },
      { k: "Maps", v: "Normal/AO/Curvature for smart masks" },
      { k: "Rig", v: "Rig-ready topology (optional rigging)" },
      { k: "Notes", v: "Artifact checks across light rigs" },
    ],
  },
  {
    id: "p-amber-05",
    title: "Industrial Props Set",
    category: "Props",
    subtitle: "Hard-surface detail with clean bevel language.",
    tags: ["Realtime", "Realistic", "Mobile/Quest"],
    theme: "amberSteel",
    specs: [
      { k: "Set", v: "18 props + material variants" },
      { k: "Perf", v: "Quest-friendly texture budgets" },
      { k: "LODs", v: "LOD0–LOD3 with stable silhouettes" },
      { k: "Export", v: "FBX + naming conventions" },
    ],
  },
  {
    id: "p-amber-06",
    title: "Showroom Environment — Product Stage",
    category: "Environments",
    subtitle: "Lighting-first staging with controlled reflections.",
    tags: ["Cinematic", "Realistic", "UE5"],
    theme: "amberGlass",
    specs: [
      { k: "Lighting", v: "Three rigs: soft, dramatic, neutral" },
      { k: "Materials", v: "Calibrated roughness response" },
      { k: "Shots", v: "Camera set + turntable path" },
      { k: "Handoff", v: "UE5 level + post-process presets" },
    ],
  },
];

const FAQ = [
  {
    q: "Do you deliver assets ready for UE5/Unity integration?",
    a: "Yes — we deliver clean exports, naming conventions, pivots, and (when requested) in-engine test scenes/material instances.",
  },
  {
    q: "What do you need from us to start?",
    a: "3–5 references, target platform (PC/console/mobile/Quest), style target, and desired deliverables (turntables, renders, engine-ready assets).",
  },
  {
    q: "How do revisions work?",
    a: "We lock silhouettes during blockout, materials during lookdev, and then do controlled polish passes — so revisions stay predictable and fast.",
  },
  {
    q: "Can you match an existing art style?",
    a: "Yes. We run a style calibration pass early (palette, roughness response, bevel language, shader rules) and keep it consistent across assets.",
  },
  {
    q: "Do you optimize for XR/mobile?",
    a: "Yes — LODs, texture budgets, batching-friendly setups, and performance targets are part of our standard delivery when XR/mobile is in scope.",
  },
];

/* --------------------------------- UI Bits -------------------------------- */
function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "amber" | "violet" | "green";
}) {
  const toneCls =
    tone === "amber"
      ? "border-[rgba(247,184,75,.35)] text-[rgba(255,213,122,.9)] bg-[rgba(247,184,75,.08)]"
      : tone === "violet"
      ? "border-[rgba(91,45,220,.35)] text-[rgba(209,195,255,.9)] bg-[rgba(91,45,220,.08)]"
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

function Icon({ kind }: { kind: "char" | "env" | "prod" | "rig" | "anim" | "opt" }) {
  const common = "h-5 w-5";
  switch (kind) {
    case "char":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 9a7 7 0 0 1 14 0"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "env":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 20V9l8-5 8 5v11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M9 20v-6h6v6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "prod":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M7 7h10v10H7z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M4 11V7a3 3 0 0 1 3-3h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M20 13v4a3 3 0 0 1-3 3h-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "rig":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3v7m0 4v7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M7 8l5 2 5-2M7 16l5-2 5 2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "anim":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M8 7v10l10-5-10-5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M4 6v12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "opt":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M5 19V9m7 10V5m7 14v-7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M4 9h2m5-4h2m5 7h2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

/* --------------------------- Cursor Studio Light -------------------------- */
function useStudioLight(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
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

/* ------------------------------ Tilt Parallax ----------------------------- */
function useTilt(enabled: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;

      const rx = (y - 0.5) * -6;
      const ry = (x - 0.5) * 10;

      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--px", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--py", `${(y * 100).toFixed(1)}%`);
    };

    const onLeave = () => {
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
      el.style.setProperty("--px", `50%`);
      el.style.setProperty("--py", `50%`);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  return ref;
}

/* ------------------------------ Noise Overlay ----------------------------- */
function Noise() {
  // lightweight SVG noise (no external assets)
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
      style={{
        backgroundImage: `url("data:image/svg+xml,${svg}")`,
      }}
    />
  );
}

function CornerGlows() {
  return (
    <>
      {/* amber corner glows */}
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
      {/* micro v1 cross-studio accents (very subtle) */}
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

/* ------------------------------- Modal Shell ------------------------------ */
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
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-md" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[rgba(10,6,25,.72)] shadow-[0_30px_120px_rgba(0,0,0,.55)]"
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
                <div className="text-xs text-white/55">Lookdev Viewer</div>
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

/* ------------------------------ Portfolio Visuals ------------------------------ */
function VisualPane({
  theme,
  mode,
}: {
  theme: PortfolioItem["theme"];
  mode: "beauty" | "wire" | "maps";
}) {
  // Simple “studio render” plates using gradients + patterns (fast, no external assets).
  // You can swap these divs with real images later without changing layout.
  const base =
    theme === "amberGlass"
      ? "radial-gradient(1200px circle at 30% 25%, rgba(255,213,122,.18), rgba(12,7,34,0) 55%), radial-gradient(900px circle at 70% 60%, rgba(247,184,75,.15), rgba(12,7,34,0) 60%), linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,0) 35%), linear-gradient(120deg, rgba(91,45,220,.12), rgba(158,243,21,.08))"
      : theme === "amberSteel"
      ? "radial-gradient(1000px circle at 25% 30%, rgba(247,184,75,.18), rgba(12,7,34,0) 55%), radial-gradient(900px circle at 80% 70%, rgba(255,213,122,.12), rgba(12,7,34,0) 60%), linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,0) 40%), linear-gradient(120deg, rgba(255,213,122,.08), rgba(255,255,255,.03))"
      : theme === "amberClay"
      ? "radial-gradient(900px circle at 30% 30%, rgba(255,213,122,.16), rgba(12,7,34,0) 60%), radial-gradient(900px circle at 70% 70%, rgba(247,184,75,.12), rgba(12,7,34,0) 62%), linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,0) 45%), linear-gradient(120deg, rgba(255,213,122,.06), rgba(91,45,220,.06))"
      : "radial-gradient(900px circle at 30% 25%, rgba(247,184,75,.22), rgba(12,7,34,0) 60%), radial-gradient(1100px circle at 75% 70%, rgba(91,45,220,.14), rgba(12,7,34,0) 62%), linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,0) 40%), linear-gradient(120deg, rgba(158,243,21,.06), rgba(255,213,122,.06))";

  const wireOverlay =
    "repeating-linear-gradient(90deg, rgba(255,255,255,.12) 0 1px, rgba(255,255,255,0) 1px 18px), repeating-linear-gradient(0deg, rgba(255,255,255,.08) 0 1px, rgba(255,255,255,0) 1px 18px)";

  const mapsPlate =
    "linear-gradient(135deg, rgba(91,45,220,.16), rgba(247,184,75,.14)), radial-gradient(900px circle at 30% 30%, rgba(255,213,122,.12), rgba(12,7,34,0) 65%)";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[rgba(255,255,255,.04)]">
      <div className="absolute inset-0" style={{ background: base }} />
      <Noise />

      {/* “subject silhouette” hint */}
      <div
        className="absolute left-[12%] top-[12%] h-[76%] w-[76%] rounded-[28px] border border-white/10 bg-white/[0.035]"
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.06), 0 40px 140px rgba(0,0,0,.35)",
          transform: "rotate(-2deg)",
        }}
      />

      {/* mode overlays */}
      {mode === "wire" ? (
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: wireOverlay }} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(800px circle at 50% 40%, rgba(255,213,122,.22), rgba(255,213,122,0) 60%)",
              mixBlendMode: "screen",
              opacity: 0.9,
            }}
          />
        </div>
      ) : null}

      {mode === "maps" ? (
        <div className="absolute inset-0 p-4">
          <div className="h-full w-full rounded-xl border border-white/10 bg-[rgba(0,0,0,.22)] p-4">
            <div className="grid h-full grid-cols-2 gap-3">
              {[
                { name: "Albedo", plate: "linear-gradient(135deg, rgba(255,213,122,.16), rgba(255,255,255,.05))" },
                { name: "Normal", plate: "linear-gradient(135deg, rgba(70,120,255,.18), rgba(91,45,220,.10))" },
                { name: "Roughness", plate: "linear-gradient(135deg, rgba(255,255,255,.07), rgba(0,0,0,.18))" },
                { name: "AO", plate: "linear-gradient(135deg, rgba(0,0,0,.22), rgba(255,255,255,.05))" },
              ].map((m) => (
                <div key={m.name} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="absolute inset-0" style={{ background: m.plate }} />
                  <div className="absolute inset-0 opacity-70" style={{ background: mapsPlate }} />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/25" />
                  <div className="relative flex h-full items-end justify-between p-3">
                    <div className="text-xs text-white/70">{m.name}</div>
                    <div className="text-[10px] text-white/40">Map</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* subtle specular “studio sweep” */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ mixBlendMode: "screen" }}
      >
        <div
          className="absolute -left-1/3 top-[-25%] h-[160%] w-[55%] rotate-12"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,213,122,0) 0%, rgba(255,213,122,.22) 45%, rgba(255,213,122,0) 100%)",
            filter: "blur(8px)",
            transform: "translateX(var(--sweep, -30%))",
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------- Page Component ------------------------------- */
export default function Page_3DArt_LookdevStudio() {
  const reduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  useStudioLight(pageRef, !reduceMotion);

  const [filter, setFilter] = useState<Category | "All">("All");
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const filtered = useMemo(() => {
    if (filter === "All") return PORTFOLIO;
    return PORTFOLIO.filter((p) => p.category === filter);
  }, [filter]);

  // Modal tabs
  const [tab, setTab] = useState<"beauty" | "wire" | "maps" | "specs">("beauty");
  useEffect(() => {
    if (!active) return;
    setTab("beauty");
  }, [active]);

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-[#0C0722] text-white"
      style={{
        // studio light follows cursor using CSS vars updated by useStudioLight
        backgroundImage:
          "radial-gradient(1000px circle at var(--mx, 50%) var(--my, 30%), rgba(247,184,75,.10), rgba(12,7,34,0) 55%)",
      }}
    >
      {/* shared atmosphere */}
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
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Chip tone="amber">Variant A — Lookdev Studio</Chip>
                <Chip>Gold/Amber Accent</Chip>
                <Chip tone="violet">Games-ready</Chip>
                <Chip tone="green">XR-ready</Chip>
              </div>

              <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Studio-grade{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.85), rgba(255,255,255,.75))",
                  }}
                >
                  lookdev
                </span>{" "}
                & 3D art that ships in real-time.
              </h1>

              <p className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-white/62 sm:text-[15px]">
                Characters, environments, product visuals — built with PBR consistency, clean bakes, and engine-ready
                deliverables. This page is designed like a studio: lighting, materials, and proof.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <a
                  href="#cta"
                  className="rounded-2xl border border-[rgba(247,184,75,.25)] bg-[rgba(247,184,75,.10)] px-4 py-2 text-sm text-[rgba(255,213,122,.95)] hover:bg-[rgba(247,184,75,.14)]"
                >
                  Request estimate
                </a>
                <a
                  href="#portfolio"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                >
                  See portfolio
                </a>
              </div>

              <div className="mt-7 grid gap-2 sm:grid-cols-3">
                {[
                  { k: "Realtime lookdev", v: "UE5 / Unity validation" },
                  { k: "Material fidelity", v: "Reference-driven PBR" },
                  { k: "Production proof", v: "Wireframes + maps + specs" },
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

            {/* Hero Right — Lookdev plates */}
            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-4 backdrop-blur">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-xs text-white/55">Studio Light Rig</div>
                  <div className="flex items-center gap-2">
                    <Chip tone="amber">Amber Key</Chip>
                    <Chip>Soft Fill</Chip>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="group relative h-44">
                    <VisualPane theme="amberGlass" mode="beauty" />
                    {/* subtle sweep animation hook */}
                    <style jsx global>{`
                      .group:hover { --sweep: 120%; }
                      .group { --sweep: -30%; transition: --sweep 650ms ease; }
                    `}</style>
                  </div>

                  <div className="group relative h-44">
                    <VisualPane theme="amberSteel" mode="beauty" />
                  </div>

                  <div className="group relative h-44">
                    <VisualPane theme="amberClay" mode="beauty" />
                  </div>

                  <div className="group relative h-44">
                    <VisualPane theme="amberNeon" mode="beauty" />
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-xs text-white/55">What you get</div>
                      <div className="text-sm font-semibold text-white">Beauty + wireframe + maps + specs</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Chip tone="amber">Turntables</Chip>
                      <Chip>Lighting presets</Chip>
                      <Chip>Engine test</Chip>
                    </div>
                  </div>
                </div>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-[50px]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(255,213,122,.22), rgba(255,213,122,0) 70%)",
                }}
              />
            </div>
          </div>
        </section>

        {/* =========================
           SECTION 2 — SHOWCASE (id=showcase)
        ========================== */}
        <section id="showcase" className="relative mt-14 sm:mt-18">
          <SectionHeader
            chip={
              <>
                <Chip tone="amber">Signature</Chip>
                <Chip>Lookdev-first gallery</Chip>
              </>
            }
            title={
              <>
                Lighting, materials,{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  and response
                </span>{" "}
                — before polish.
              </>
            }
            desc="Variant A prioritizes material definition and studio lighting. Each piece is presented like a controlled lookdev test so clients immediately trust the craft."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {/* Big hero reel tile */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-5 backdrop-blur lg:col-span-2">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs text-white/55">Showcase Reel (loop)</div>
                  <div className="truncate text-sm font-semibold text-white">Specular sweeps • HDRI rotations • close-ups</div>
                </div>
                <div className="flex items-center gap-2">
                  <Chip tone="amber">Lookdev</Chip>
                  <Chip>Realtime</Chip>
                </div>
              </div>

              {/* “reel” plate */}
              <div className="relative h-60 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(900px circle at 25% 30%, rgba(255,213,122,.18), rgba(12,7,34,0) 60%), radial-gradient(900px circle at 75% 70%, rgba(91,45,220,.12), rgba(12,7,34,0) 62%), linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,0) 40%), linear-gradient(120deg, rgba(247,184,75,.10), rgba(255,255,255,.03))",
                  }}
                />
                <Noise />
                <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/40" />

                {/* motion “scan” */}
                {!reduceMotion ? (
                  <motion.div
                    className="absolute -left-1/3 top-[-35%] h-[170%] w-[55%] rotate-12 opacity-70"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,213,122,0) 0%, rgba(255,213,122,.18) 45%, rgba(255,213,122,0) 100%)",
                      filter: "blur(10px)",
                      mixBlendMode: "screen",
                    }}
                    animate={{ x: ["-30%", "140%"] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : null}

                <div className="relative flex h-full items-end justify-between p-5">
                  <div>
                    <div className="text-xs text-white/55">Inclusions</div>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <Chip>Beauty</Chip>
                      <Chip>Wireframe</Chip>
                      <Chip>Maps</Chip>
                      <Chip tone="amber">Lighting rigs</Chip>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/55">Best for</div>
                    <div className="text-sm font-semibold text-white">Pitch decks, portfolios, demos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Material balls / lookdev micro tiles */}
            <div className="grid gap-4">
              {[
                { t: "Glass / Clearcoat", d: "Controlled highlights, clean reflections.", theme: "amberGlass" as const },
                { t: "Brushed Metal", d: "Roughness range + bevel response.", theme: "amberSteel" as const },
                { t: "Clay / Neutral", d: "Form readability before texturing.", theme: "amberClay" as const },
              ].map((m) => (
                <div
                  key={m.t}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-4 backdrop-blur"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm font-semibold text-white">{m.t}</div>
                    <Chip tone="amber">Lookdev</Chip>
                  </div>
                  <div className="text-sm text-white/62">{m.d}</div>
                  <div className="mt-3 h-28">
                    <VisualPane theme={m.theme} mode="beauty" />
                  </div>
                </div>
              ))}
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
                <Chip>Characters • Environments • Product</Chip>
              </>
            }
            title={
              <>
                What we{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  produce
                </span>{" "}
                for your pipeline
              </>
            }
            desc="Clear, procurement-friendly outputs — and every asset can be delivered as beauty + breakdowns + engine-ready packages."
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

                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold tracking-[-0.01em] text-white">{s.title}</div>
                    <div className="mt-1 text-sm text-white/62">{s.desc}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-2 text-[rgba(255,213,122,.9)]">
                    <Icon kind={s.icon} />
                  </div>
                </div>

                <ul className="relative mt-4 space-y-2 text-sm text-white/70">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(255,213,122,.75)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* specular sweep micro */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -left-1/2 top-[-35%] h-[170%] w-[60%] rotate-12 opacity-0 transition-opacity duration-300 group-hover:opacity-80"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,213,122,0) 0%, rgba(255,213,122,.18) 45%, rgba(255,213,122,0) 100%)",
                    filter: "blur(10px)",
                    mixBlendMode: "screen",
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* =========================
           SECTION 4 — QUALITY BAR (id=proof)
        ========================== */}
        <section id="proof" className="relative mt-16">
          <SectionHeader
            chip={
              <>
                <Chip tone="amber">Quality Bar</Chip>
                <Chip>Risk reducer</Chip>
              </>
            }
            title={
              <>
                The{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  standards
                </span>{" "}
                we ship with
              </>
            }
            desc="We sell predictable results — not just pretty renders. These checkpoints keep production clean, consistent, and engine-ready."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-5 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-white">Production checkpoints</div>
                <Chip tone="amber">Lookdev-first</Chip>
              </div>
              <div className="space-y-3">
                {QUALITY_POINTS.map((q) => (
                  <div
                    key={q.title}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{q.title}</div>
                        <div className="mt-1 text-sm text-white/62">{q.desc}</div>
                      </div>
                      <Chip>{q.metric}</Chip>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* proof panel */}
            <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-5 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-sm font-semibold text-white">Delivery formats</div>
                <Chip tone="amber">Procurement-friendly</Chip>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { t: "Beauty renders", d: "Keyshots + macros + lighting sets" },
                  { t: "Wireframe proofs", d: "Topo clarity + bake sanity checks" },
                  { t: "Maps bundle", d: "Albedo/Normal/Rough/AO + notes" },
                  { t: "Engine pack", d: "FBX + materials + test scene (optional)" },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="text-sm font-semibold text-white">{x.t}</div>
                    <div className="mt-1 text-sm text-white/62">{x.d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/55">Typical review rhythm</div>
                <div className="mt-1 text-sm text-white/80">
                  Blockout (fast) → Lookdev lock → Final polish
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
                <Chip>Predictable delivery</Chip>
              </>
            }
            title={
              <>
                A studio pipeline that{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  stays on budget
                </span>
              </>
            }
            desc="Clear gates, clean handoffs, and strong lookdev discipline — so your art stays consistent across characters, environments, and products."
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
                <Chip>Lookdev cards + breakdown viewer</Chip>
              </>
            }
            title={
              <>
                A{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  visual-first
                </span>{" "}
                portfolio — with proof
              </>
            }
            desc="Filter by category. Hover for wireframe reveal and studio sweeps. Click to open the Lookdev Viewer."
          />

          {/* Filters */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {(["All", "Characters", "Environments", "Product", "Props"] as const).map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={cx(
                    "rounded-full border px-3 py-1.5 text-xs backdrop-blur transition",
                    active
                      ? "border-[rgba(247,184,75,.30)] bg-[rgba(247,184,75,.12)] text-[rgba(255,213,122,.95)]"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  )}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Portfolio Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PortfolioCard key={p.id} item={p} reduceMotion={!!reduceMotion} onOpen={() => setActive(p)} />
            ))}
          </div>

          {/* Modal Viewer */}
          <Modal
            open={!!active}
            onClose={() => setActive(null)}
            title={active ? `${active.title} — ${active.category}` : "Lookdev Viewer"}
          >
            {active ? (
              <div className="grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
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

                    <div className="flex items-center gap-2">
                      {(["beauty", "wire", "maps", "specs"] as const).map((t) => {
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
                            {t === "beauty" ? "Beauty" : t === "wire" ? "Wireframe" : t === "maps" ? "Maps" : "Specs"}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="group relative h-[360px]">
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
                    ) : (
                      <VisualPane theme={active.theme} mode={tab === "beauty" ? "beauty" : tab === "wire" ? "wire" : "maps"} />
                    )}
                  </div>
                </div>

                {/* Right column: “Lookdev notes” */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold text-white">Lookdev Notes</div>
                  <p className="mt-2 text-sm leading-6 text-white/62">
                    Variant A communicates craft through material response and controlled lighting. Use this viewer to
                    show clients that your assets behave consistently across rigs — not just in one “hero” render.
                  </p>

                  <div className="mt-4 space-y-2">
                    {[
                      { k: "Consistency", v: "Materials read correctly under multiple setups" },
                      { k: "Proof", v: "Wireframes + maps show production cleanliness" },
                      { k: "Delivery", v: "Engine-ready exports when needed" },
                    ].map((x) => (
                      <div key={x.k} className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <div className="text-xs text-white/55">{x.k}</div>
                        <div className="text-sm font-semibold text-white">{x.v}</div>
                      </div>
                    ))}
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
                <Chip>Quick answers</Chip>
              </>
            }
            title={
              <>
                Questions we{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  hear
                </span>{" "}
                a lot
              </>
            }
            desc="Short, procurement-friendly answers — built for fast decision making."
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
                  <Chip tone="amber">Start in 24–48h</Chip>
                  <Chip>Clear deliverables</Chip>
                  <Chip>Lookdev-first</Chip>
                </div>

                <h3 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                  Send 3 references + platform — we’ll reply with a clean estimate.
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
                  Tell us what you’re building (game, XR, product viz). We’ll propose an art plan, timeline, and
                  delivery format (beauty + breakdown + engine-ready).
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
                    "Deliverables: engine pack / renders / turntables",
                    "Deadline + budget range (optional)",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(255,213,122,.75)]" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/55">Typical output</div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    Beauty + Wireframe + Maps + Specs (and Engine pack if needed)
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
            <Chip tone="amber">Variant A</Chip>
            <Chip>Wodh v1 Atmosphere</Chip>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------ Portfolio Card ------------------------------ */
function PortfolioCard({
  item,
  reduceMotion,
  onOpen,
}: {
  item: PortfolioItem;
  reduceMotion: boolean;
  onOpen: () => void;
}) {
  const tiltRef = useTilt(!reduceMotion);

  return (
    <button
      onClick={onOpen}
      className="group relative text-left"
      aria-label={`Open ${item.title}`}
    >
      <div
        ref={tiltRef}
        className={cx(
          "relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-4 backdrop-blur transition",
          "focus:outline-none focus:ring-2 focus:ring-[rgba(255,213,122,.35)]"
        )}
        style={{
          transform: reduceMotion ? undefined : "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
          transformStyle: "preserve-3d",
        }}
      >
        {/* depth backplate */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <div
            className="absolute -left-24 -top-24 h-56 w-56 rounded-full blur-[70px]"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, rgba(247,184,75,.18), rgba(247,184,75,0) 70%)",
            }}
          />
          <div
            className="absolute -right-28 -bottom-28 h-64 w-64 rounded-full blur-[80px]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,213,122,.14), rgba(255,213,122,0) 70%)",
            }}
          />
        </div>

        {/* header */}
        <div className="relative flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-[-0.01em] text-white">{item.title}</div>
            <div className="mt-1 text-sm text-white/62">{item.subtitle}</div>
          </div>
          <Chip tone="amber">{item.category}</Chip>
        </div>

        {/* tags */}
        <div className="relative mt-3 flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((t) => (
            <Chip key={t} tone={t === "UE5" || t === "Cinematic" ? "amber" : "neutral"}>
              {t}
            </Chip>
          ))}
        </div>

        {/* visual area: beauty + wireframe reveal */}
        <div className="relative mt-4 h-44">
          {/* beauty */}
          <div className="group relative h-full">
            <VisualPane theme={item.theme} mode="beauty" />

            {/* wireframe reveal (diagonal wipe) */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <div
                className="absolute inset-0"
                style={{
                  clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
                }}
              />
              <div
                className="absolute inset-0 transition-all duration-500 ease-out group-hover:opacity-100 opacity-0"
                style={{
                  clipPath: "polygon(0 0, 70% 0, 35% 100%, 0 100%)",
                }}
              >
                <VisualPane theme={item.theme} mode="wire" />
              </div>
            </div>
          </div>

          {/* specular sweep */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ mixBlendMode: "screen" }}
          >
            <div
              className="absolute -left-1/2 top-[-35%] h-[170%] w-[60%] rotate-12"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,213,122,0) 0%, rgba(255,213,122,.22) 45%, rgba(255,213,122,0) 100%)",
                filter: "blur(10px)",
              }}
            />
          </div>
        </div>

        {/* footer proof */}
        <div className="relative mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
          <div className="text-xs text-white/55">Click for Lookdev Viewer</div>
          <div className="text-xs font-semibold text-[rgba(255,213,122,.92)]">Beauty • Wire • Maps • Specs</div>
        </div>
      </div>
    </button>
  );
}
