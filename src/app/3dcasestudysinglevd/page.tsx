"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

/**
 * WODH — 3D & Art Portfolio (Single Project)
 * Variant D — ArtStation Editorial (gallery-first, minimal text)
 * Accent: Amber / Gold only
 *
 * Notes:
 * - Masonry-ish gallery via CSS columns (simple + reliable).
 * - Lightbox supports ← → and ESC.
 * - Process drawer is collapsible (Clay/Wire/Maps).
 * - Swap the dummy project + images with real ones.
 */

const AMBER = "#F7C948";
const AMBER_SOFT = "rgba(247, 201, 72, 0.25)";
const AMBER_GLOW = "rgba(247, 201, 72, 0.18)";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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
        <stop offset="0%" stop-color="rgba(247,201,72,0.40)"/>
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
  height?: "sm" | "md" | "lg";
};

type Pass = "Clay" | "Wireframe" | "Maps";

const PROJECT = {
  title: "Aurum Watch — Product Lookdev",
  subtitle: "Minimal words. Maximum frames. Studio-grade reflections and materials.",
  year: "2026",
  role: "3D Artist · Lookdev",
  type: "Product Visualization",
  tools: ["Blender/Maya", "Substance", "Photoshop", "Unreal/Unity (optional)"],
  chips: ["4K stills", "PBR textures", "Variant-ready materials", "Turntable optional"],
  hero: "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2800&q=85",
  heroAlt: "Aurum watch hero render",
  specs: [
    { k: "Triangles", v: "120k (LOD0)" },
    { k: "Textures", v: "4× 4K (PBR)" },
    { k: "UV", v: "Single set" },
    { k: "Output", v: "4K PNG/JPG" },
  ],
};

const GALLERY: Shot[] = [
  {
    id: "g1",
    label: "Hero frame",
    height: "lg",
    image: "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2400&q=85",
    hint: "Clean specular roll-off",
  },
  {
    id: "g2",
    label: "Angle — 45°",
    height: "md",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2400&q=85",
    hint: "Marketing readability",
  },
  {
    id: "g3",
    label: "Macro — crown",
    height: "lg",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1800&q=85",
    hint: "Tight edge highlights",
  },
  {
    id: "g4",
    label: "Macro — dial",
    height: "md",
    image: "https://images.unsplash.com/photo-1518544889284-7d9a3f3821e6?auto=format&fit=crop&w=2400&q=85",
    hint: "Material breakup",
  },
  {
    id: "g5",
    label: "Studio frame",
    height: "md",
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=2400&q=85",
    hint: "Calm reflections",
  },
  {
    id: "g6",
    label: "Alternate mood",
    height: "lg",
    image: "https://images.unsplash.com/photo-1520975958225-9e9b08e0a3f0?auto=format&fit=crop&w=2400&q=85",
    hint: "Variant grade",
  },
  {
    id: "g7",
    label: "Detail — strap",
    height: "sm",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=2000&q=85",
    hint: "Micro roughness",
  },
  {
    id: "g8",
    label: "Product on set",
    height: "sm",
    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=2000&q=85",
    hint: "Context frame",
  },
];

const PROCESS_PASSES: Record<Pass, Shot[]> = {
  Clay: [
    {
      id: "p1",
      label: "Clay pass — silhouette",
      height: "md",
      image: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=2400&q=80",
      hint: "Form hierarchy check",
    },
    {
      id: "p2",
      label: "Clay pass — angles",
      height: "sm",
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=2400&q=80",
      hint: "Value control",
    },
  ],
  Wireframe: [
    {
      id: "p3",
      label: "Wireframe — density",
      height: "md",
      image: "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2400&q=70",
      hint: "Edge control",
    },
    {
      id: "p4",
      label: "Wireframe — curvature",
      height: "sm",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=2400&q=70",
      hint: "Reflection stability",
    },
  ],
  Maps: [
    {
      id: "p5",
      label: "Maps — roughness breakup",
      height: "md",
      image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=2400&q=70",
      hint: "Believable response",
    },
    {
      id: "p6",
      label: "Maps — PBR discipline",
      height: "sm",
      image: "https://images.unsplash.com/photo-1518544889284-7d9a3f3821e6?auto=format&fit=crop&w=2400&q=70",
      hint: "No fake gloss",
    },
  ],
};

const RELATED = [
  {
    id: "r1",
    title: "Luxe Sneaker — Packshots",
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

function heightToAspect(height?: Shot["height"]) {
  // Used only to vary the tile aspect ratio in masonry (visual rhythm)
  if (height === "lg") return "aspect-[4/5] md:aspect-[3/4]";
  if (height === "sm") return "aspect-[16/11]";
  return "aspect-[1/1]";
}

export default function Page() {
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });

  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.985]);
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -14]);
  const heroDim = useTransform(scrollYProgress, [0, 0.22], [0, 0.55]);

  const [drawerOpen, setDrawerOpen] = useState(true);
  const [pass, setPass] = useState<Pass>("Clay");

  const ALL_SHOTS: Shot[] = useMemo(() => {
    const proc = Object.values(PROCESS_PASSES).flat();
    // Keep unique by id (just in case)
    const map = new Map<string, Shot>();
    [...GALLERY, ...proc].forEach((s) => map.set(s.id, s));
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

      {/* TOP NAV (minimal) */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070A14]/55 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.03]"
              style={{ boxShadow: `0 18px 80px ${AMBER_GLOW}` }}
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide text-white/90">WODH</div>
              <div className="text-xs font-medium text-white/55">3D & Art · Portfolio Single · Variant D</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#section-gallery">
              Gallery
            </a>
            <a className="hover:text-white" href="#section-process">
              Process
            </a>
            <a className="hover:text-white" href="#section-related">
              Related
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

      {/* HERO (minimal editorial) */}
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

                    <h1 className="mt-4 text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[3.5rem]">
                      {PROJECT.title}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
                      {PROJECT.subtitle}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <Pill>{PROJECT.role}</Pill>
                      {PROJECT.tools.slice(0, 3).map((t) => (
                        <Pill key={t}>{t}</Pill>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {PROJECT.specs.map((s) => (
                        <div key={s.k} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                          <div className="text-xs font-semibold text-white/55">{s.k}</div>
                          <div className="mt-0.5 text-sm font-semibold text-white/90">{s.v}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <a
                        href="#section-gallery"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.10] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.14]"
                        style={{ boxShadow: `0 24px 110px ${AMBER_GLOW}` }}
                      >
                        View gallery
                      </a>
                      <button
                        onClick={() => openLightbox("g1")}
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
                <div className="flex flex-wrap gap-2">
                  {PROJECT.chips.map((c) => (
                    <Pill key={c}>{c}</Pill>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GALLERY (masonry) */}
      <section id="section-gallery" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold tracking-wider text-white/55">GALLERY</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                Frames first. <span className="text-white/70">Minimal text.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                Masonry layout that feels like ArtStation — click any tile to open the lightbox.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Pill>ESC to close</Pill>
              <Pill>← → to navigate</Pill>
            </div>
          </div>

          <div className="mt-8 rounded-[2.2rem] border border-white/10 bg-white/[0.02] p-3 md:p-4">
            {/* CSS columns masonry */}
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
              {GALLERY.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => openLightbox(s.id)}
                  className="group mb-4 w-full break-inside-avoid overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.02] text-left"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.03, 0.18) }}
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
                      {s.hint ? <div className="mt-1 text-xs text-white/55">{s.hint}</div> : null}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS DRAWER (collapsible) */}
      <section id="section-process" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-6 md:px-8">
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] p-6 md:p-10">
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="text-xs font-semibold tracking-wider text-white/55">PROCESS</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  Proof drawer. <span className="text-white/70">Open when needed.</span>
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  Keep the page gallery-first. This drawer adds credibility without turning the page into “services”.
                </p>
              </div>

              <button
                onClick={() => setDrawerOpen((v) => !v)}
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                style={{ boxShadow: `0 18px 80px ${AMBER_GLOW}` }}
              >
                {drawerOpen ? "Collapse" : "Expand"} drawer
              </button>
            </div>

            <div className="mt-7">
              <SoftHr />
            </div>

            <AnimatePresence initial={false}>
              {drawerOpen && (
                <motion.div
                  initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
                      {(["Clay", "Wireframe", "Maps"] as Pass[]).map((p) => {
                        const active = p === pass;
                        return (
                          <button
                            key={p}
                            onClick={() => setPass(p)}
                            className={cn(
                              "relative rounded-xl px-3 py-2 text-sm font-medium transition",
                              active
                                ? "bg-white/10 text-white"
                                : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                            )}
                            style={active ? { boxShadow: `0 16px 70px ${AMBER_GLOW}` } : {}}
                          >
                            <span className="relative z-10">{p}</span>
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

                    <div className="text-sm text-white/65 lg:max-w-md">
                      <div className="text-xs font-semibold tracking-wider text-white/55">WHY THIS MATTERS</div>
                      <p className="mt-2 leading-relaxed">
                        These passes show silhouette discipline, topology intent, and PBR values. It’s the fastest way to
                        communicate quality in a portfolio.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Value control", "Edge highlights", "Roughness breakup", "Clean topology"].map((x) => (
                          <Pill key={x}>{x}</Pill>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {PROCESS_PASSES[pass].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => openLightbox(s.id)}
                        className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] text-left"
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
                            {s.hint ? <div className="mt-1 text-xs text-white/55">{s.hint}</div> : null}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section id="section-related" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold tracking-wider text-white/55">RELATED</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                More work. <span className="text-white/70">Same taste.</span>
              </h2>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
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
                  <div className="mt-2 text-xs text-white/55">Link to project</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT (minimal) */}
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
                  Want visuals like this? <span className="text-white/70">Send references.</span>
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
            © {new Date().getFullYear()} WODH · 3D & Art · Portfolio Single · Variant D
          </footer>
        </div>
      </section>

      {/* LIGHTBOX */}
      <Lightbox open={!!activeId} onClose={closeLightbox} shot={activeShot} onPrev={prevShot} onNext={nextShot} />
    </div>
  );
}
