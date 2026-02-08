"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * WODH — 3D & Art Portfolio (Single Project)
 * Variant E — Cinematic Timeline Cut (story-first, still portfolio)
 * Accent: Amber / Gold only
 *
 * Structure:
 * - Hero (key render + minimal facts)
 * - Timeline chapters (5–7) with: image + editorial note + proof chips
 * - Final gallery strip + delivery pack
 * - Lightbox (← →, ESC)
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

type Shot = {
  id: string;
  label: string;
  image: string;
  hint?: string;
};

type Chapter = {
  id: string;
  k: string; // small label e.g. CHAPTER 01
  title: string;
  copy: string;
  proof: string[];
  shot: Shot;
};

const PROJECT = {
  title: "Aurum Watch — Product Lookdev",
  subtitle: "A short cinematic build log — from reference to final frames.",
  year: "2026",
  role: "3D Artist · Lookdev · Lighting",
  type: "Portfolio Single (3D/Art)",
  hero: "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2800&q=85",
  quickFacts: [
    { k: "Timeline", v: "7–10 days" },
    { k: "Renderer", v: "Octane/Cycles" },
    { k: "Textures", v: "4× 4K PBR" },
    { k: "Output", v: "4K stills + PNG alpha" },
  ],
};

const CHAPTERS: Chapter[] = [
  {
    id: "c1",
    k: "CHAPTER 01",
    title: "Brief & references",
    copy: "We lock the look: premium metal response, calm highlights, and a silhouette that reads instantly at thumbnail scale.",
    proof: ["Moodboard locked", "Lens/angle plan", "Hero lighting target"],
    shot: {
      id: "s1",
      label: "Reference direction",
      image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=2400&q=85",
      hint: "Targets: reflections, value control",
    },
  },
  {
    id: "c2",
    k: "CHAPTER 02",
    title: "Blockout & proportion",
    copy: "Before details, we validate proportions and mechanical believability. If the blockout reads, everything else becomes easier.",
    proof: ["Primary forms", "Scale/pivots", "Camera-readability"],
    shot: {
      id: "s2",
      label: "Blockout stage",
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=2400&q=80",
      hint: "Silhouette first",
    },
  },
  {
    id: "c3",
    k: "CHAPTER 03",
    title: "High detail & chamfers",
    copy: "Premium look is mostly edge discipline. Micro chamfers give controlled highlights and prevent that “CG sharpness”.",
    proof: ["Edge library", "Clean curvature", "Reflection stability"],
    shot: {
      id: "s3",
      label: "Form refinement",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=2000&q=85",
      hint: "Highlight roll-off",
    },
  },
  {
    id: "c4",
    k: "CHAPTER 04",
    title: "UVs, bake & texture logic",
    copy: "Textures are kept physically plausible. Roughness is where realism lives — tiny breakup and consistent PBR ranges.",
    proof: ["Bake clean", "Roughness breakup", "PBR ranges checked"],
    shot: {
      id: "s4",
      label: "Texture response",
      image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=2400&q=85",
      hint: "Micro detail",
    },
  },
  {
    id: "c5",
    k: "CHAPTER 05",
    title: "Lookdev lighting",
    copy: "We sculpt reflections like a photographer. The goal is expensive highlights with readable materials — not brightness.",
    proof: ["Studio key/fill/rim", "Hotspot control", "Consistency across angles"],
    shot: {
      id: "s5",
      label: "Lookdev lighting",
      image: "https://images.unsplash.com/photo-1518544889284-7d9a3f3821e6?auto=format&fit=crop&w=2400&q=85",
      hint: "Calm specular",
    },
  },
  {
    id: "c6",
    k: "CHAPTER 06",
    title: "Final frames & variants",
    copy: "Once the hero is approved, we expand to angles and colorways. This is where the system proves it can scale.",
    proof: ["Hero + angles", "Variant-ready mats", "Export pack prepared"],
    shot: {
      id: "s6",
      label: "Final hero frame",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2400&q=85",
      hint: "Marketing angles",
    },
  },
];

const FINAL_GALLERY: Shot[] = [
  { id: "g1", label: "Hero frame", image: "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2400&q=85", hint: "Key frame" },
  { id: "g2", label: "Angle — 45°", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2400&q=85", hint: "Primary angle" },
  { id: "g3", label: "Macro — crown", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=2000&q=85", hint: "Detail" },
  { id: "g4", label: "Macro — reflections", image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=2400&q=85", hint: "Material response" },
  { id: "g5", label: "Studio frame", image: "https://images.unsplash.com/photo-1518544889284-7d9a3f3821e6?auto=format&fit=crop&w=2400&q=85", hint: "Calm highlights" },
];

const DELIVERY_PACK = [
  { path: "/Meshes", hint: "FBX/GLB, pivots, scale, optional LODs" },
  { path: "/Textures", hint: "BaseColor, Roughness, Metallic, Normal, AO" },
  { path: "/Materials", hint: "Shader notes, variants, presets" },
  { path: "/Renders", hint: "Angles, packshots, PNG alpha" },
  { path: "/Docs", hint: "Readme, settings, naming rules" },
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

function ChapterCard({
  chapter,
  index,
  onOpen,
}: {
  chapter: Chapter;
  index: number;
  onOpen: (id: string) => void;
}) {
  const reducedMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      id={chapter.id}
      className="relative grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-8"
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
    >
      {/* Timeline spine */}
      <div className="hidden lg:block lg:col-span-1">
        <div className="relative mx-auto flex h-full w-full justify-center">
          <div className="absolute top-0 h-full w-[2px] bg-white/10" />
          <div
            className="sticky top-28 mt-8 h-3.5 w-3.5 rounded-full"
            style={{ background: AMBER, boxShadow: `0 0 0 10px ${AMBER_SOFT}` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className={cn("lg:col-span-5", isEven ? "lg:order-1" : "lg:order-2")}>
        <div className="rounded-[2.1rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold tracking-wider text-white/55">{chapter.k}</div>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white/92">{chapter.title}</h3>
            </div>
            <span
              className="mt-1 h-2.5 w-2.5 rounded-full"
              style={{ background: AMBER, boxShadow: `0 0 0 8px ${AMBER_SOFT}` }}
            />
          </div>

          <p className="mt-3 text-sm leading-relaxed text-white/70">{chapter.copy}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {chapter.proof.map((p) => (
              <Pill key={p}>{p}</Pill>
            ))}
          </div>

          <div className="mt-5">
            <SoftHr />
          </div>

          <button
            onClick={() => onOpen(chapter.shot.id)}
            className="mt-5 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.10]"
            style={{ boxShadow: `0 18px 70px ${AMBER_GLOW}` }}
          >
            Open chapter frame
          </button>
        </div>
      </div>

      {/* Frame */}
      <div className={cn("lg:col-span-6", isEven ? "lg:order-2" : "lg:order-1")}>
        <button
          onClick={() => onOpen(chapter.shot.id)}
          className="group relative w-full overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/[0.02] text-left"
          style={{ boxShadow: "0 34px 150px rgba(0,0,0,0.58)" }}
        >
          <div className="relative aspect-[16/10]">
            <SmartImg
              src={chapter.shot.image}
              alt={chapter.shot.label}
              fallbackLabel={chapter.shot.label}
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
            <div
              className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(120% 120% at 55% 0%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 70%)",
              }}
            />
            <FilmGrain />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-white/92">{chapter.shot.label}</div>
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: AMBER, boxShadow: `0 0 0 8px ${AMBER_SOFT}` }}
                />
              </div>
              {chapter.shot.hint ? <div className="mt-1 text-xs text-white/55">{chapter.shot.hint}</div> : null}
            </div>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

export default function ThreeDCaseStudySingleVELegacy() {
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });

  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.985]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -16]);
  const heroDim = useTransform(scrollYProgress, [0, 0.22], [0, 0.55]);

  const ALL_SHOTS: Shot[] = useMemo(() => {
    const map = new Map<string, Shot>();
    CHAPTERS.forEach((c) => map.set(c.shot.id, c.shot));
    FINAL_GALLERY.forEach((s) => map.set(s.id, s));
    return Array.from(map.values());
  }, []);

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

      {/* HERO */}
      <section id="section-hero" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-28">
          <motion.div style={{ scale: heroScale, y: heroY }} className="relative">
            <div className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.03]">
              <div className="relative aspect-[21/9] min-h-[360px]">
                <SmartImg
                  src={PROJECT.hero}
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
                      <Pill>ESC closes lightbox</Pill>
                      <Pill>← → for frames</Pill>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {PROJECT.quickFacts.map((s) => (
                        <div key={s.k} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                          <div className="text-xs font-semibold text-white/55">{s.k}</div>
                          <div className="mt-0.5 text-sm font-semibold text-white/90">{s.v}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <a
                        href="#section-timeline"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.10] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.14]"
                        style={{ boxShadow: `0 24px 110px ${AMBER_GLOW}` }}
                      >
                        Watch the build log
                      </a>
                      <button
                        onClick={() => openLightbox(CHAPTERS[0].shot.id)}
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] hover:text-white"
                      >
                        Open first frame
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
                    A portfolio page that reads like a short documentary — proof without becoming a services page.
                  </div>
                  <a href="#section-final" className="text-sm font-semibold text-white/80 hover:text-white">
                    Skip to final →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="section-timeline" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold tracking-wider text-white/55">TIMELINE</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                Chapters. <span className="text-white/70">One clear story.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                Each chapter is a single frame plus proof points. Simple, cinematic, and credible.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Brief", "Blockout", "Detail", "Texture", "Lookdev", "Final"].map((x) => (
                <Pill key={x}>{x}</Pill>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-10 md:space-y-14">
            {CHAPTERS.map((c, i) => (
              <ChapterCard key={c.id} chapter={c} index={i} onOpen={openLightbox} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section id="section-final" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-6 md:px-8">
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] p-6 md:p-10">
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="text-xs font-semibold tracking-wider text-white/55">FINAL</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  Final frames. <span className="text-white/70">Hero + angles.</span>
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  The “wow” lands here — but the timeline above is what makes it believable.
                </p>
              </div>
              <button
                onClick={() => openLightbox(FINAL_GALLERY[0].id)}
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                style={{ boxShadow: `0 18px 80px ${AMBER_GLOW}` }}
              >
                Open hero frame
              </button>
            </div>

            <div className="mt-7">
              <SoftHr />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-12">
              {FINAL_GALLERY.map((s, idx) => {
                const span = idx === 0 ? "md:col-span-8" : "md:col-span-4";
                return (
                  <button
                    key={s.id}
                    onClick={() => openLightbox(s.id)}
                    className={cn(
                      "group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] text-left",
                      span
                    )}
                    style={{ boxShadow: "0 30px 140px rgba(0,0,0,0.55)" }}
                  >
                    <div className={cn("relative", idx === 0 ? "aspect-[16/9]" : "aspect-[1/1]")}>
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
                            "radial-gradient(120% 120% at 55% 0%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 70%)",
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
                        {s.hint ? <div className="mt-1 text-xs text-white/55">{s.hint}</div> : null}
                      </div>
                    </div>
                  </button>
                );
              })}
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
                Hand-off pack. <span className="text-white/70">Clean and reusable.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                This keeps it “portfolio” while still showing professional discipline.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-semibold text-white/90">Delivery structure</div>
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
              <div className="text-xs font-semibold tracking-wider text-white/55">QUALITY NOTES</div>
              <h3 className="mt-2 text-xl font-semibold text-white/90">Checks that keep it premium</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {[
                  "Scale + pivots validated",
                  "Material values documented",
                  "Naming + folder hygiene",
                  "Angles match the hero lookdev",
                  "Variants don’t break the shader response",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <span style={{ color: AMBER }}>•</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="text-sm font-semibold text-white/90">Mini takeaway</div>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  The “cinematic timeline” gives you a portfolio page that feels authored — not a template.
                </p>
              </div>
            </div>
          </div>
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
                  Want a build log like this? <span className="text-white/70">Send references.</span>
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

          <footer className="mt-8 text-center text-xs text-white/45">
            © {new Date().getFullYear()} WODH · 3D & Art · Portfolio Single · Variant E
          </footer>
        </div>
      </section>

      {/* LIGHTBOX */}
      <Lightbox open={!!activeId} onClose={closeLightbox} shot={activeShot} onPrev={prevShot} onNext={nextShot} />
    </div>
  );
}
