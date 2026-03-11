"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * WODH — 3D & Art Portfolio (Single Project)
 * Variant F — Spec Sheet + Gallery (studio / client-ready)
 * Accent: Amber / Gold only
 *
 * Key idea:
 * - Gallery-first, but with a persistent right-side "Spec Sheet" panel on desktop.
 * - The spec sheet feels like an AAA handoff / client-ready artifact:
 *   - Asset facts (poly/tex), materials, outputs
 *   - Delivery pack, checklist, approvals
 *   - Download/Contact CTAs
 *
 * Features:
 * - Masonry-ish gallery (CSS columns) + lightbox (ESC, ← →)
 * - Sticky spec sheet on desktop, collapsible on mobile
 * - "Shot filter" tabs (Final / Clay / Wire / Maps) – all still portfolio, not services
 */

const AMBER = "#F7C948";
const AMBER_SOFT = "rgba(247, 201, 72, 0.25)";
const AMBER_GLOW = "rgba(247, 201, 72, 0.18)";


function dataSvgPlaceholder(label: string) {
  const safe = label.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#070A14"/>
        <stop offset="45%" stop-color="#121A33"/>
        <stop offset="100%" stop-color="#070A14"/>
      </linearGradient>
      <radialGradient id="r" cx="78%" cy="18%" r="62%">
        <stop offset="0%" stop-color="rgba(247,201,72,0.38)"/>
        <stop offset="62%" stop-color="rgba(247,201,72,0.10)"/>
        <stop offset="100%" stop-color="rgba(247,201,72,0.00)"/>
      </radialGradient>
      <filter id="n">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="
          0 0 0 0 0.7
          0 0 0 0 0.7
          0 0 0 0 0.7
          0 0 0 .07 0"/>
      </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#r)"/>
    <rect width="100%" height="100%" filter="url(#n)" opacity="0.65"/>
    <circle cx="1200" cy="160" r="260" fill="rgba(247,201,72,0.10)"/>
    <path d="M1600 760 C1240 680 1020 670 760 740 C420 850 240 920 0 980 L0 1000 L1600 1000 Z"
      fill="rgba(255,255,255,0.04)"/>
    <text x="72" y="140" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial"
      font-size="52" fill="rgba(255,255,255,0.90)" font-weight="750">${safe}</text>
    <text x="72" y="196" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial"
      font-size="22" fill="rgba(255,255,255,0.55)">Placeholder (swap with real render)</text>
    <text x="72" y="920" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial"
      font-size="18" fill="rgba(247,201,72,0.60)">WODH · 3D & Art Portfolio</text>
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

function FilmGrain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22160%22%20height%3D%22160%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.75%22%20numOctaves%3D%222%22/%3E%3C/filter%3E%3Crect%20width%3D%22160%22%20height%3D%22160%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.7%22/%3E%3C/svg%3E')",
      }}
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/70">
      {children}
    </span>
  );
}

type ShotCategory = "Final" | "Clay" | "Wire" | "Maps";

type Shot = {
  id: string;
  label: string;
  image: string;
  hint?: string;
  height?: "sm" | "md" | "lg";
  cat: ShotCategory;
};

const PROJECT = {
  title: "Aurum Watch — Client-Ready Asset Pack",
  subtitle: "A portfolio single presented like a studio spec sheet: visuals + disciplined handoff.",
  year: "2026",
  role: "3D Artist · Lookdev · Lighting",
  client: "Confidential (demo)",
  type: "Product Visualization",
  hero: "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2800&q=85",
  heroAlt: "Aurum Watch hero render",
  tools: ["Blender/Maya", "Substance", "Photoshop", "Unreal/Unity (optional)"],
  deliverables: ["4K packshots", "PNG alpha cutouts", "Material variants", "Turntable optional"],
};

const SPEC = {
  asset: {
    triangles: "120k (LOD0) · 65k (LOD1) · 28k (LOD2)",
    uv: "Single UV set · non-overlapping · packed",
    texel: "Consistent texel density",
    scale: "Real-world scale (cm) · pivots validated",
  },
  textures: {
    size: "4K (Primary) · 2K (LOD)",
    maps: "BaseColor · Roughness · Metallic · Normal · AO",
    format: "PNG/TIF (source) · JPG/PNG (exports)",
    pbr: "Metal/Rough workflow · values checked",
  },
  rendering: {
    renderer: "Cycles/Octane (demo)",
    lighting: "Studio key/fill/rim · reflection cards",
    color: "Neutral grade · print-safe highlights",
    outputs: "4K PNG/JPG · optional alpha · sRGB",
  },
  compatibility: {
    engines: "Unity/Unreal ready (optional)",
    exports: "FBX · GLB · USD (optional)",
    materials: "PBR presets + notes",
    naming: "Clean naming + folder hygiene",
  },
};

const DELIVERY_PACK = [
  { path: "/Meshes", hint: "FBX/GLB, pivots, scale, optional LODs" },
  { path: "/Textures", hint: "PBR maps, source + export" },
  { path: "/Materials", hint: "Variants + shader notes" },
  { path: "/Renders", hint: "Angles, packshots, alpha cutouts" },
  { path: "/Docs", hint: "Readme, settings, naming rules" },
];

const QA_CHECKS = [
  "Edge highlights behave (no razor sharp CG edges)",
  "Roughness breakup reads at macro + micro",
  "No crushed blacks, no blown highlights (print-safe)",
  "Consistent look across camera angles",
  "Exports open cleanly with correct scale & pivots",
];

const SHOTS: Shot[] = [
  // Final
  {
    id: "f1",
    cat: "Final",
    label: "Hero packshot",
    height: "lg",
    image: "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2400&q=85",
    hint: "Primary frame",
  },
  {
    id: "f2",
    cat: "Final",
    label: "Angle — 45°",
    height: "md",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2400&q=85",
    hint: "Marketing angle",
  },
  {
    id: "f3",
    cat: "Final",
    label: "Macro — crown",
    height: "lg",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=2000&q=85",
    hint: "Detail",
  },
  {
    id: "f4",
    cat: "Final",
    label: "Macro — dial",
    height: "md",
    image: "https://images.unsplash.com/photo-1518544889284-7d9a3f3821e6?auto=format&fit=crop&w=2400&q=85",
    hint: "Material response",
  },
  // Clay
  {
    id: "c1",
    cat: "Clay",
    label: "Clay — silhouette check",
    height: "md",
    image: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=2400&q=80",
    hint: "Value discipline",
  },
  {
    id: "c2",
    cat: "Clay",
    label: "Clay — angles",
    height: "sm",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=2400&q=80",
    hint: "Proportion read",
  },
  // Wire
  {
    id: "w1",
    cat: "Wire",
    label: "Wire — density",
    height: "md",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2400&q=70",
    hint: "Curvature control",
  },
  {
    id: "w2",
    cat: "Wire",
    label: "Wire — edges",
    height: "sm",
    image: "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2400&q=70",
    hint: "Highlight stability",
  },
  // Maps
  {
    id: "m1",
    cat: "Maps",
    label: "Maps — roughness breakup",
    height: "md",
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=2400&q=70",
    hint: "Believable response",
  },
  {
    id: "m2",
    cat: "Maps",
    label: "Maps — PBR discipline",
    height: "sm",
    image: "https://images.unsplash.com/photo-1518544889284-7d9a3f3821e6?auto=format&fit=crop&w=2400&q=70",
    hint: "No fake gloss",
  },
];

function heightToAspect(height?: Shot["height"]) {
  if (height === "lg") return "aspect-[4/5] md:aspect-[3/4]";
  if (height === "sm") return "aspect-[16/11]";
  return "aspect-[1/1]";
}

function Lightbox({
  open,
  onClose,
  shot,
  onPrev,
  onNext,
}: {
  open: boolean;
  onClose: () => void;
  shot: Shot | null;
  onPrev: () => void;
  onNext: () => void;
}) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {open && shot && (
        <motion.div
          className="fixed inset-0 z-[90]"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={reducedMotion ? false : { y: 18, opacity: 0, scale: 0.99 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { y: 12, opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-6xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#070A14]"
              style={{ boxShadow: "0 40px 160px rgba(0,0,0,0.60), 0 0 0 1px rgba(255,255,255,0.06) inset" }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(120% 120% at 70% 18%, rgba(247,201,72,0.20), rgba(247,201,72,0.00) 60%)",
                }}
              />

              <div className="relative">
                <div className="relative aspect-[16/9] bg-black">
                  <SmartImg
                    src={shot.image}
                    alt={shot.label}
                    fallbackLabel={shot.label}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                  <FilmGrain />
                </div>

                <div className="flex flex-col gap-3 border-t border-white/10 bg-white/[0.02] px-5 py-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: AMBER, boxShadow: `0 0 0 8px ${AMBER_SOFT}` }}
                    />
                    <div className="text-sm font-semibold text-white/90">{shot.label}</div>
                    <span className="text-xs text-white/55">· {shot.cat}</span>
                    {shot.hint ? <span className="text-xs text-white/55">· {shot.hint}</span> : null}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={onPrev}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/75 hover:bg-white/[0.06]"
                    >
                      Prev
                    </button>
                    <button
                      onClick={onNext}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/75 hover:bg-white/[0.06]"
                    >
                      Next
                    </button>
                    <button
                      onClick={onClose}
                      className="rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-white hover:bg-white/[0.10]"
                      style={{ boxShadow: `0 14px 60px ${AMBER_GLOW}` }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <div className="text-xs font-semibold text-white/55">{k}</div>
      <div className="text-sm font-semibold text-white/85 text-right">{v}</div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-semibold tracking-wider text-white/55">{children}</div>;
}

export default function ThreeDCaseStudySingleVFLegacy() {
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });

  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.985]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -16]);
  const heroDim = useTransform(scrollYProgress, [0, 0.22], [0, 0.55]);

  const [cat, setCat] = useState<ShotCategory>("Final");
  const [mobileSpecOpen, setMobileSpecOpen] = useState(false);

  const filtered = useMemo(() => SHOTS.filter((s) => s.cat === cat), [cat]);

  const ALL_SHOTS = useMemo(() => SHOTS, []);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIndex = useMemo(() => ALL_SHOTS.findIndex((s) => s.id === activeId), [ALL_SHOTS, activeId]);
  const activeShot = useMemo(() => ALL_SHOTS.find((s) => s.id === activeId) ?? null, [ALL_SHOTS, activeId]);

  const openLightbox = (id: string) => setActiveId(id);
  const closeLightbox = () => setActiveId(null);

  const prevShot = () => {
    if (activeIndex < 0) return;
    const nextIndex = (activeIndex - 1 + ALL_SHOTS.length) % ALL_SHOTS.length;
    setActiveId(ALL_SHOTS[nextIndex].id);
  };

  const nextShot = () => {
    if (activeIndex < 0) return;
    const nextIndex = (activeIndex + 1) % ALL_SHOTS.length;
    setActiveId(ALL_SHOTS[nextIndex].id);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#070A14] text-white">
      {/* BACKDROP */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_850px_at_20%_0%,rgba(255,255,255,0.05),rgba(255,255,255,0)_55%),radial-gradient(1100px_750px_at_82%_12%,rgba(247,201,72,0.10),rgba(247,201,72,0)_58%),radial-gradient(1000px_700px_at_50%_100%,rgba(255,255,255,0.03),rgba(255,255,255,0)_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22120%22%20height%3D%22120%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%222%22/%3E%3C/filter%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.7%22/%3E%3C/svg%3E')]" />
      </div>

      {/* TOP NAV */}
      <header id="section-topnav" className="sticky top-0 z-40 border-b border-white/10 bg-[#070A14]/55 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.03]"
              style={{ boxShadow: `0 18px 80px ${AMBER_GLOW}` }}
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide text-white/90">WODH</div>
              <div className="text-xs font-medium text-white/55">3D & Art · Portfolio Single · Variant F</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#section-gallery">
              Gallery
            </a>
            <a className="hover:text-white" href="#section-specsheet">
              Spec Sheet
            </a>
            <a className="hover:text-white" href="#section-delivery">
              Delivery
            </a>
          </nav>

          <Link
            href="#section-contact"
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/[0.06]"
            style={{ boxShadow: `0 16px 60px ${AMBER_GLOW}` }}
          >
            Contact
          </Link>
        </div>

        <div className="h-[2px] w-full bg-white/5">
          <motion.div
            className="h-[2px]"
            style={{
              width: useTransform(scrollYProgress, (v) => `${Math.max(0, Math.min(100, v * 100))}%`),
              background: "linear-gradient(90deg, rgba(247,201,72,0.35), rgba(247,201,72,0.95))",
            }}
          />
        </div>
      </header>

      {/* HERO */}
      <section id="section-hero" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pt-10 md:px-8 md:pt-14">
          <motion.div style={{ scale: heroScale, y: heroY }} className="relative">
            <div className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-[21/9] min-h-[360px]">
                <SmartImg
                  src={PROJECT.hero}
                  alt={PROJECT.heroAlt}
                  fallbackLabel={PROJECT.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 120% at 70% 18%, rgba(247,201,72,0.22), rgba(247,201,72,0.00) 62%)",
                  }}
                />
                <FilmGrain />

                <div className="absolute inset-0 flex items-end">
                  <div className="w-full p-6 md:p-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white/75">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: AMBER, boxShadow: `0 0 0 6px ${AMBER_SOFT}` }}
                      />
                      {PROJECT.type} · {PROJECT.year}
                    </div>

                    <h1 className="mt-4 text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[3.35rem]">
                      {PROJECT.title}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
                      {PROJECT.subtitle}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Pill>{PROJECT.role}</Pill>
                      <Pill>Client: {PROJECT.client}</Pill>
                      {PROJECT.tools.slice(0, 2).map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <a
                        href="#section-gallery"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.10] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.14]"
                        style={{ boxShadow: `0 24px 110px ${AMBER_GLOW}` }}
                      >
                        View shots
                      </a>
                      <a
                        href="#section-specsheet"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] hover:text-white"
                      >
                        Jump to spec sheet
                      </a>
                      <button
                        onClick={() => openLightbox("f1")}
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] hover:text-white"
                      >
                        Open hero shot
                      </button>
                    </div>

                    <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: heroDim }}>
                      <div className="absolute inset-0 bg-black/40" />
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 bg-white/[0.02] px-6 py-4 md:px-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm text-white/70">
                    Studio-ready presentation: gallery + sticky specs + delivery discipline.
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT.deliverables.map((d) => (
                      <Pill key={d}>{d}</Pill>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN: Gallery + Spec Sheet */}
      <section id="section-gallery" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* LEFT: GALLERY */}
            <div className="lg:col-span-7">
              <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-white/55">GALLERY</div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                    Shots + passes. <span className="text-white/70">Quick proof.</span>
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
                    Filter by category. Click any tile to open lightbox (ESC, ← →).
                  </p>
                </div>

                {/* Mobile spec toggle */}
                <button
                  onClick={() => setMobileSpecOpen((v) => !v)}
                  className="lg:hidden rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                  style={{ boxShadow: `0 18px 80px ${AMBER_GLOW}` }}
                >
                  {mobileSpecOpen ? "Hide" : "Show"} Spec Sheet
                </button>
              </div>

              {/* Category tabs */}
              <div className="mt-6 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
                {(["Final", "Clay", "Wire", "Maps"] as ShotCategory[]).map((c) => {
                  const active = c === cat;
                  return (
                    <button
                      key={c}
                      onClick={() => setCat(c)}
                      className={cn(
                        "relative rounded-xl px-3 py-2 text-sm font-medium transition",
                        active ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                      )}
                      style={active ? { boxShadow: `0 16px 70px ${AMBER_GLOW}` } : {}}
                    >
                      <span className="relative z-10">{c}</span>
                      {active && (
                        <span
                          className="pointer-events-none absolute inset-0 rounded-xl opacity-70"
                          style={{
                            background:
                              "radial-gradient(90% 120% at 50% 0%, rgba(247,201,72,0.22), rgba(247,201,72,0.00) 62%)",
                          }}
                        />
                      )}
                    </button>
                  );
                })}
                <div className="ml-auto hidden items-center gap-2 pr-2 text-xs text-white/55 md:flex">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: AMBER, boxShadow: `0 0 0 7px ${AMBER_SOFT}` }}
                  />
                  {filtered.length} shots
                </div>
              </div>

              <div className="mt-6 rounded-[2.2rem] border border-white/10 bg-white/[0.02] p-3 md:p-4">
                <div className="columns-1 gap-4 sm:columns-2 [column-fill:_balance]">
                  {filtered.map((s, i) => (
                    <motion.button
                      key={s.id}
                      onClick={() => openLightbox(s.id)}
                      className="group mb-4 w-full break-inside-avoid overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.02] text-left"
                      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.15) }}
                      style={{ boxShadow: "0 28px 130px rgba(0,0,0,0.55)" }}
                    >
                      <div className={cn("relative", heightToAspect(s.height))}>
                        <SmartImg
                          src={s.image}
                          alt={s.label}
                          fallbackLabel={s.label}
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
                        <div
                          className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(120% 120% at 50% 0%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 70%)",
                          }}
                        />
                        <FilmGrain />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-sm font-semibold text-white/92">{s.label}</div>
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ background: AMBER, boxShadow: `0 0 0 8px ${AMBER_SOFT}` }}
                            />
                          </div>
                          <div className="mt-1 flex items-center justify-between gap-3">
                            <div className="text-xs text-white/55">{s.hint ?? "—"}</div>
                            <div className="text-xs font-semibold text-white/60">{s.cat}</div>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: SPEC SHEET (sticky desktop) */}
            <aside id="section-specsheet" className="lg:col-span-5">
              {/* Mobile collapsible */}
              <AnimatePresence initial={false}>
                {mobileSpecOpen && (
                  <motion.div
                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="lg:hidden overflow-hidden"
                  >
                    <SpecSheet />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop sticky */}
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <SpecSheet />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* DELIVERY SECTION (full width) */}
      <section id="section-delivery" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-14 md:px-8 md:pb-20">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-7 md:p-10">
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="text-xs font-semibold tracking-wider text-white/55">DELIVERY</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  Delivery pack. <span className="text-white/70">Predictable & clean.</span>
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  This is how the portfolio becomes “client-ready” without turning into a sales page.
                </p>
              </div>
              <a
                href="#section-contact"
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                style={{ boxShadow: `0 18px 80px ${AMBER_GLOW}` }}
              >
                Request similar pack
              </a>
            </div>

            <div className="mt-7">
              <SoftHr />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6">
                <div className="text-sm font-semibold text-white/90">Folder structure</div>
                <div className="mt-4 space-y-2">
                  {DELIVERY_PACK.map((row) => (
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
              </div>

              <div className="lg:col-span-5 rounded-[2rem] border border-white/10 bg-black/25 p-6 backdrop-blur">
                <div className="text-xs font-semibold tracking-wider text-white/55">QC CHECKLIST</div>
                <h3 className="mt-2 text-xl font-semibold text-white/90">Checks we run before shipping</h3>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {QA_CHECKS.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span style={{ color: AMBER }}>•</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-sm font-semibold text-white/90">Approval note</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    If a single hero frame is approved, this pipeline expands into angles, variants, and a clean export
                    pack without breaking the look.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-8 text-center text-xs text-white/45">
            © {new Date().getFullYear()} WODH · 3D & Art · Portfolio Single · Variant F
          </footer>
        </div>
      </section>

      {/* CONTACT */}
      <section id="section-contact" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-14 md:px-8 md:pb-20">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-7 md:p-10">
            <div
              className="pointer-events-none absolute -right-32 -top-32 h-[680px] w-[680px] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 60% 40%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 62%)",
              }}
            />
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs font-semibold tracking-wider text-white/55">CONTACT</div>
                <div className="mt-2 text-2xl font-semibold text-white/92">
                  Need an asset pack like this? <span className="text-white/70">Send references.</span>
                </div>
                <div className="mt-2 text-sm text-white/65">Email: hello@wodh.io</div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:hello@wodh.io"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                  style={{ boxShadow: `0 22px 90px ${AMBER_GLOW}` }}
                >
                  Email us
                </a>
                <a
                  href="#section-hero"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] hover:text-white"
                >
                  Back to top
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <Lightbox open={!!activeId} onClose={closeLightbox} shot={activeShot} onPrev={prevShot} onNext={nextShot} />
    </div>
  );
}

/** Spec Sheet Component (sticky on desktop) */
function SpecSheet() {
  return (
    <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] p-6 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-wider text-white/55">SPEC SHEET</div>
          <div className="mt-2 text-xl font-semibold text-white/92">Asset summary</div>
          <div className="mt-2 text-sm text-white/65">Everything needed to review or reuse the work.</div>
        </div>
        <span
          className="mt-2 h-2.5 w-2.5 rounded-full"
          style={{ background: AMBER, boxShadow: `0 0 0 8px ${AMBER_SOFT}` }}
        />
      </div>

      <div className="mt-5">
        <SoftHr />
      </div>

      <div className="mt-5 space-y-5" id="section-specsheet">
        <div className="space-y-2">
          <SectionLabel>ASSET</SectionLabel>
          <SpecRow k="Triangles" v={SPEC.asset.triangles} />
          <SpecRow k="UV" v={SPEC.asset.uv} />
          <SpecRow k="Texel density" v={SPEC.asset.texel} />
          <SpecRow k="Scale & pivots" v={SPEC.asset.scale} />
        </div>

        <div className="space-y-2">
          <SectionLabel>TEXTURES</SectionLabel>
          <SpecRow k="Size" v={SPEC.textures.size} />
          <SpecRow k="Maps" v={SPEC.textures.maps} />
          <SpecRow k="Format" v={SPEC.textures.format} />
          <SpecRow k="Workflow" v={SPEC.textures.pbr} />
        </div>

        <div className="space-y-2">
          <SectionLabel>RENDERING</SectionLabel>
          <SpecRow k="Renderer" v={SPEC.rendering.renderer} />
          <SpecRow k="Lighting" v={SPEC.rendering.lighting} />
          <SpecRow k="Color" v={SPEC.rendering.color} />
          <SpecRow k="Outputs" v={SPEC.rendering.outputs} />
        </div>

        <div className="space-y-2">
          <SectionLabel>COMPATIBILITY</SectionLabel>
          <SpecRow k="Engines" v={SPEC.compatibility.engines} />
          <SpecRow k="Exports" v={SPEC.compatibility.exports} />
          <SpecRow k="Materials" v={SPEC.compatibility.materials} />
          <SpecRow k="Naming" v={SPEC.compatibility.naming} />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
          <div className="text-sm font-semibold text-white/90">Quick actions</div>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <a
              href="#section-delivery"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/[0.10]"
              style={{ boxShadow: `0 18px 70px ${AMBER_GLOW}` }}
            >
              Delivery pack
            </a>
            <a
              href="mailto:hello@wodh.io"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/[0.06] hover:text-white"
            >
              Request export
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {["ESC closes lightbox", "← → to navigate", "Spec sheet = trust"].map((x) => (
              <Pill key={x}>{x}</Pill>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
