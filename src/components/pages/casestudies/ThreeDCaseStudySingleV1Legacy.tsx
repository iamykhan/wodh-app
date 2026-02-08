"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * WODH — 3D & Art Portfolio
 * Single Project Page (Portfolio Single)
 * Accent: Gold / Amber only (3D/Art language)
 *
 * Replace dummy project data + images with your real case assets.
 */

const AMBER = "#F7C948";
const AMBER_SOFT = "rgba(247, 201, 72, 0.25)";
const AMBER_GLOW = "rgba(247, 201, 72, 0.18)";


function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

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
      font-size="22" fill="rgba(255,255,255,0.55)">Placeholder (swap with your real render)</text>
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

type Shot = { id: string; label: string; image: string; aspect?: "wide" | "tall" | "square" };

type BreakdownTab = "Beauty" | "Clay" | "Wireframe" | "Maps";

const PROJECT = {
  title: "Aurum Watch — Product Lookdev",
  subtitle: "Premium product visualization · studio-grade reflections · clean materials",
  year: "2026",
  type: "Product Render / Lookdev",
  role: "3D Artist · Lookdev · Lighting",
  client: "Internal / Demo",
  timeline: "7–10 days",
  heroImage: "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2800&q=85",
  brief:
    "A premium watch visualization focused on calm highlights, believable materials, and clean silhouette readability. Built to scale into multiple colorways and marketing angles without breaking material response.",
  highlights: [
    "Material library supports quick colorway swaps",
    "Reflection control designed for “expensive” highlights",
    "Turntable + packshots + transparent PNG exports",
  ],
  specs: [
    { k: "Triangles (LOD0)", v: "120k" },
    { k: "Textures", v: "4× 4K (PBR)" },
    { k: "UV / UDIM", v: "Single UV set" },
    { k: "Renderer", v: "Octane / Cycles (swap)" },
    { k: "Output", v: "4K stills + PNG alpha" },
    { k: "Delivery", v: "FBX/GLB + textures + notes" },
  ],
  tools: ["Blender/Maya", "Substance 3D Painter", "Photoshop", "Marmoset (optional)", "Unreal/Unity (optional)"],
  deliveryPack: [
    { path: "/Meshes", hint: "FBX/GLB, pivots, scale, optional LODs" },
    { path: "/Textures", hint: "BaseColor, Roughness, Metallic, Normal, AO" },
    { path: "/Materials", hint: "Presets, shader notes, variants" },
    { path: "/Renders", hint: "Packshots, angles, turntable (optional)" },
    { path: "/Docs", hint: "Readme, settings, naming rules" },
  ],
};

const SHOTS: Shot[] = [
  {
    id: "s1",
    label: "Hero frame",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "s2",
    label: "Angle — 45°",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "s3",
    label: "Closeup — crown",
    aspect: "tall",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "s4",
    label: "Macro — reflections",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "s5",
    label: "Studio frame",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1518544889284-7d9a3f3821e6?auto=format&fit=crop&w=2400&q=85",
  },
  {
    id: "s6",
    label: "Colorway alt",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1520975958225-9e9b08e0a3f0?auto=format&fit=crop&w=2400&q=85",
  },
];

const BREAKDOWN: Record<BreakdownTab, { image: string; note: string }[]> = {
  Beauty: [
    {
      image: "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2400&q=85",
      note: "Beauty render with calm highlights and controlled specular roll-off.",
    },
    {
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2400&q=85",
      note: "Secondary angle tuned for marketing readability (no harsh hotspots).",
    },
  ],
  Clay: [
    { image: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=2400&q=80", note: "Clay pass to validate silhouette and value read." },
    { image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=2400&q=80", note: "Form hierarchy check — primary, secondary, tertiary shapes." },
  ],
  Wireframe: [
    { image: "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2400&q=70", note: "Topology tuned for smooth shading and tight chamfer control." },
    { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2400&q=70", note: "Density focused where reflections need clean curvature." },
  ],
  Maps: [
    { image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=2400&q=70", note: "Roughness breakup + micro detail for believable response." },
    { image: "https://images.unsplash.com/photo-1518544889284-7d9a3f3821e6?auto=format&fit=crop&w=2400&q=70", note: "PBR discipline: no fake wet gloss, energy-conserving values." },
  ],
};

const RELATED = [
  {
    id: "r1",
    title: "Luxe Sneaker — Studio Packshots",
    tag: "Product",
    image: "https://images.unsplash.com/photo-1520975958225-9e9b08e0a3f0?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: "r2",
    title: "Desk Setup — ArchViz Still",
    tag: "ArchViz",
    image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=2000&q=85",
  },
  {
    id: "r3",
    title: "Hero Prop Set — Stylized",
    tag: "Stylized",
    image: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=2000&q=85",
  },
];

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
          className="fixed inset-0 z-[80]"
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
                    <span className="text-xs text-white/55">· Use ← →</span>
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

export default function ThreeDCaseStudySingleV1Legacy() {
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });

  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.985]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -16]);
  const heroDim = useTransform(scrollYProgress, [0, 0.22], [0, 0.55]);

  const [activeShotId, setActiveShotId] = useState<string | null>(null);
  const activeShotIndex = useMemo(() => SHOTS.findIndex((s) => s.id === activeShotId), [activeShotId]);
  const activeShot = useMemo(() => SHOTS.find((s) => s.id === activeShotId) ?? null, [activeShotId]);

  const [tab, setTab] = useState<BreakdownTab>("Beauty");

  const openLightbox = (id: string) => setActiveShotId(id);
  const closeLightbox = () => setActiveShotId(null);

  const prevShot = () => {
    if (activeShotIndex < 0) return;
    const nextIndex = (activeShotIndex - 1 + SHOTS.length) % SHOTS.length;
    setActiveShotId(SHOTS[nextIndex].id);
  };

  const nextShot = () => {
    if (activeShotIndex < 0) return;
    const nextIndex = (activeShotIndex + 1) % SHOTS.length;
    setActiveShotId(SHOTS[nextIndex].id);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-[#070A14] text-white">
      {/* BACKDROP */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_850px_at_20%_0%,rgba(255,255,255,0.05),rgba(255,255,255,0)_55%),radial-gradient(1100px_750px_at_82%_12%,rgba(247,201,72,0.10),rgba(247,201,72,0)_58%),radial-gradient(1000px_700px_at_50%_100%,rgba(255,255,255,0.03),rgba(255,255,255,0)_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22120%22%20height%3D%22120%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%222%22/%3E%3C/filter%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.7%22/%3E%3C/svg%3E')]" />
      </div>

      {/* HERO */}
      <section id="section-hero" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-28">
          <motion.div style={{ scale: heroScale, y: heroY }} className="relative">
            <div className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-[21/9] min-h-[360px]">
                <SmartImg
                  src={PROJECT.heroImage}
                  alt={PROJECT.title}
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
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                      <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white/75">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: AMBER, boxShadow: `0 0 0 6px ${AMBER_SOFT}` }}
                          />
                          {PROJECT.type} · {PROJECT.year}
                        </div>

                        <h1 className="mt-4 text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[3.4rem]">
                          {PROJECT.title}
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
                          {PROJECT.subtitle}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          <Pill>{PROJECT.role}</Pill>
                          <Pill>{PROJECT.timeline}</Pill>
                          <Pill>{PROJECT.client}</Pill>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                          <StatChip label="Focus" value="Lookdev" />
                          <StatChip label="Style" value="Premium" />
                          <StatChip label="Output" value="4K stills" />
                          <StatChip label="Pack" value="Engine-ready" />
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <button
                          onClick={() => openLightbox("s1")}
                          className="rounded-3xl border border-white/10 bg-black/35 px-5 py-4 text-left backdrop-blur hover:bg-white/[0.06]"
                          style={{ boxShadow: `0 26px 120px ${AMBER_GLOW}` }}
                        >
                          <div className="text-xs font-semibold tracking-wider text-white/55">OPEN HERO FRAME</div>
                          <div className="mt-2 text-sm font-semibold text-white/90">Lightbox · use ← →</div>
                          <div className="mt-2 text-xs text-white/60">Click to view shots full-screen</div>
                        </button>
                      </div>
                    </div>

                    <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: heroDim }}>
                      <div className="absolute inset-0 bg-black/40" />
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 bg-white/[0.02] px-6 py-4 md:px-10">
                <p className="text-sm leading-relaxed text-white/70">{PROJECT.brief}</p>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 flex justify-center">
            <div
              className="h-[2px] w-[88%] max-w-3xl rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.10), rgba(247,201,72,0.55), rgba(255,255,255,0.10))",
              }}
            />
          </div>
        </div>
      </section>

      {/* SHOTS */}
      <section id="section-shots" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold tracking-wider text-white/55">SHOTS</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                Key frames & angles. <span className="text-white/70">Click any shot.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                This is a portfolio page: show the visuals first, then the proof behind them.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {PROJECT.highlights.map((h) => (
                <Pill key={h}>{h}</Pill>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12">
            {SHOTS.map((s, i) => {
              const span =
                s.aspect === "wide" ? "md:col-span-8" : s.aspect === "tall" ? "md:col-span-4 md:row-span-2" : "md:col-span-4";
              const aspect =
                s.aspect === "wide" ? "aspect-[16/9]" : s.aspect === "tall" ? "aspect-[3/4]" : "aspect-[1/1]";

              return (
                <motion.button
                  key={s.id}
                  onClick={() => openLightbox(s.id)}
                  className={cn(
                    "group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] text-left",
                    span
                  )}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.2) }}
                  style={{ boxShadow: "0 30px 140px rgba(0,0,0,0.55)" }}
                >
                  <div className={cn("relative", aspect)}>
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
                      <div className="mt-1 text-xs text-white/55">Open full-screen</div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* BREAKDOWN */}
      <section id="section-breakdown" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-6 md:px-8">
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] p-6 md:p-10">
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="text-xs font-semibold tracking-wider text-white/55">BREAKDOWN</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  Beauty → proof passes. <span className="text-white/70">Clay, wireframe, maps.</span>
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  This section makes the portfolio feel real: show what’s underneath the “wow”.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
                {(["Beauty", "Clay", "Wireframe", "Maps"] as BreakdownTab[]).map((t) => {
                  const active = t === tab;
                  return (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={cn(
                        "relative rounded-xl px-3 py-2 text-sm font-medium transition",
                        active ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                      )}
                      style={active ? { boxShadow: `0 16px 70px ${AMBER_GLOW}` } : {}}
                      aria-pressed={active}
                    >
                      <span className="relative z-10">{t}</span>
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
              </div>
            </div>

            <div className="mt-7">
              <SoftHr />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {BREAKDOWN[tab].map((b, idx) => (
                    <div
                      key={b.image + idx}
                      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]"
                    >
                      <div className="relative aspect-[16/10]">
                        <SmartImg
                          src={b.image}
                          alt={`${tab} ${idx + 1}`}
                          fallbackLabel={`${tab} ${idx + 1}`}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(120% 120% at 70% 18%, rgba(247,201,72,0.14), rgba(247,201,72,0.00) 66%)",
                          }}
                        />
                        <FilmGrain />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold text-white/92">{tab} pass</div>
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: AMBER, boxShadow: `0 0 0 8px ${AMBER_SOFT}` }}
                          />
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-white/65">{b.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-[2rem] border border-white/10 bg-black/25 p-6 backdrop-blur">
                  <div className="text-xs font-semibold tracking-wider text-white/55">NOTES</div>
                  <h3 className="mt-2 text-xl font-semibold text-white/90">What makes it “premium”</h3>
                  <ul className="mt-4 space-y-2 text-sm text-white/70">
                    {[
                      "Calm specular highlights (no harsh hotspots)",
                      "Roughness breakup for believable response",
                      "Chamfer discipline for clean reflections",
                      "Value control so the form reads instantly",
                      "Variant-ready materials (colorway swaps)",
                    ].map((x) => (
                      <li key={x} className="flex gap-2">
                        <span style={{ color: AMBER }}>•</span>
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="text-sm font-semibold text-white/90">Approval flow</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      Clay → material response → hero frame → angles → exports. This keeps visuals consistent when you add
                      more products later.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Clay", "Lookdev", "Angles", "Exports"].map((p) => (
                        <Pill key={p}>{p}</Pill>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section id="section-specs" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold tracking-wider text-white/55">TECH SPECS</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                The boring details. <span className="text-white/70">That build trust.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                Replace these with your real numbers per project. Keep it short, clean, credible.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PROJECT.specs.map((s) => (
              <div key={s.k} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-xs font-semibold tracking-wider text-white/55">{s.k}</div>
                <div className="mt-2 text-lg font-semibold text-white/92">{s.v}</div>
                <div className="mt-4">
                  <SoftHr />
                </div>
                <div className="mt-4 text-sm text-white/65">
                  Documenting this prevents surprises when scaling production.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="section-tools" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-6 md:px-8">
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] p-6 md:p-10">
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="text-xs font-semibold tracking-wider text-white/55">TOOLS</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  Stack used. <span className="text-white/70">Kept practical.</span>
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  Use real logos later if you want — but pills work fine and stay fast.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {PROJECT.tools.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="section-delivery" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold tracking-wider text-white/55">DELIVERY</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                What ships with the project. <span className="text-white/70">Clean pack.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                Portfolio pages feel legit when you show “how it would be handed off”.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-semibold text-white/90">Sample structure</div>
              <div className="mt-4 space-y-2">
                {PROJECT.deliveryPack.map((row) => (
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
              <div className="text-xs font-semibold tracking-wider text-white/55">QA NOTES</div>
              <h3 className="mt-2 text-xl font-semibold text-white/90">Small checks that prevent chaos</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {[
                  "Scale + pivots validated",
                  "Naming + folder hygiene",
                  "Material hookups documented",
                  "Renders match lookdev standard",
                  "Variant system (colorways) prepared",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span style={{ color: AMBER }}>•</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-sm font-semibold text-white/90">Tip</div>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  When you replace the dummy images with real renders, keep the same structure: shots → breakdown → specs
                  → delivery. It reads premium and “studio-grade”.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section id="section-related" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-6 md:px-8">
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] p-6 md:p-10">
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="text-xs font-semibold tracking-wider text-white/55">RELATED</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  More projects. <span className="text-white/70">Same taste.</span>
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  Link these tiles to your real portfolio routes later.
                </p>
              </div>
              <Link
                href="#section-contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                style={{ boxShadow: `0 22px 90px ${AMBER_GLOW}` }}
              >
                Work with us
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
              {RELATED.map((r) => (
                <div key={r.id} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]">
                  <div className="relative aspect-[16/11]">
                    <SmartImg
                      src={r.image}
                      alt={r.title}
                      fallbackLabel={r.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
                    <FilmGrain />
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-white/80">
                        {r.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-white/92">{r.title}</div>
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: AMBER, boxShadow: `0 0 0 8px ${AMBER_SOFT}` }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-white/55">Open project</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="section-contact" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-10 md:px-8 md:pb-20">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-7 md:p-10">
            <div
              className="pointer-events-none absolute -right-32 -top-32 h-[680px] w-[680px] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 60% 40%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 62%)",
              }}
            />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <div className="text-xs font-semibold tracking-wider text-white/55">LET’S BUILD THE NEXT ONE</div>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  Want visuals like this? <span className="text-white/70">Send references.</span>
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  Moodboard + asset list + target platform is enough. We’ll propose a lookdev direction, then produce with
                  clean delivery packs.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="text-sm font-semibold text-white/90">You send</div>
                    <div className="mt-2 text-sm text-white/70">References, angles needed, and format requirements.</div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="text-sm font-semibold text-white/90">We deliver</div>
                    <div className="mt-2 text-sm text-white/70">Shots + breakdown + clean pack ready to integrate.</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur">
                  <div className="text-sm font-semibold text-white/90">Quick contact</div>
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    {[
                      { k: "Email", v: "hello@wodh.io" },
                      { k: "What to include", v: "Moodboard + scope + deadline" },
                      { k: "Ideal formats", v: "FBX/GLB + PNG/JPG + textures" },
                      { k: "Optional", v: "Turntable + wireframe/maps" },
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
                      Email us
                    </a>
                    <a
                      href="#section-hero"
                      className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] hover:text-white"
                    >
                      Back to top
                    </a>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-white/55">
                    Replace the dummy data with your real project content and this becomes a perfect “single portfolio” page.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-8 text-center text-xs text-white/45">
            © {new Date().getFullYear()} WODH · 3D & Art · Portfolio Single
          </footer>
        </div>
      </section>

      {/* LIGHTBOX */}
      <Lightbox
        open={!!activeShotId}
        onClose={closeLightbox}
        shot={activeShot}
        onPrev={prevShot}
        onNext={nextShot}
      />
    </div>
  );
}
