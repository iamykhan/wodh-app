"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

/**
 * WODH — 3D & Art Design
 * Variant C — Cinematic Reel (most “wow”)
 * Accent: Gold / Amber only (no green/purple)
 *
 * Design goals:
 * - Full-bleed cinematic "reel" hero with kinetic headlines
 * - Scroll-driven chapter system (moments)
 * - Minimal but strong narrative + proof-ish details
 * - Still practical: images have fallbacks, no external libs
 */

type MomentId = "characters" | "environments" | "product" | "archviz" | "stylized";
type Category = "All" | "Characters" | "Environments" | "Product" | "ArchViz" | "Stylized";

type Moment = {
  id: MomentId;
  eyebrow: string;
  title: string;
  lead: string;
  bullets: string[];
  accent: string;
  image: string;
  imageAlt: string;
  overlay: string; // subtle cinematic overlay
  meta: { tris: string; tex: string; output: string };
};

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
      font-size="22" fill="rgba(255,255,255,0.55)">Placeholder image (swap with your real reel frames)</text>
    <text x="72" y="920" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial"
      font-size="18" fill="rgba(247,201,72,0.60)">WODH · 3D & Art Design</text>
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

function CornerGlows() {
  return (
    <>
      <div
        className="pointer-events-none absolute -left-28 -top-28 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 62%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-28 -top-44 h-[640px] w-[640px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(247,201,72,0.14), rgba(247,201,72,0.00) 64%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-56 left-1/2 h-[680px] w-[980px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(247,201,72,0.10), rgba(247,201,72,0.00) 68%)",
        }}
      />
    </>
  );
}

function SegmentedNav({
  active,
  setActive,
  items,
}: {
  active: MomentId;
  setActive: (id: MomentId) => void;
  items: Array<{ id: MomentId; label: string }>;
}) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
      {items.map((it) => {
        const is = it.id === active;
        return (
          <button
            key={it.id}
            onClick={() => setActive(it.id)}
            className={cn(
              "relative rounded-xl px-3 py-2 text-sm font-medium transition",
              is ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/[0.06]"
            )}
            style={is ? { boxShadow: `0 16px 70px ${AMBER_GLOW}` } : {}}
            aria-pressed={is}
          >
            <span className="relative z-10">{it.label}</span>
            {is && (
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
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="text-xs font-semibold text-white/55">{label}</div>
      <div className="mt-0.5 text-sm font-semibold text-white/90">{value}</div>
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const MOMENTS: Moment[] = [
  {
    id: "characters",
    eyebrow: "CHARACTERS",
    title: "Skin, fabric, metal — tuned to behave.",
    lead:
      "We lock silhouette and material response first, then detail with discipline. Assets stay stable under different keys.",
    bullets: ["SSS & roughness breakup", "Groom/cloth as needed", "Turntable + angles for approval"],
    accent: AMBER,
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd0f1d6?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Character lookdev placeholder",
    overlay:
      "radial-gradient(120% 120% at 70% 20%, rgba(247,201,72,0.22), rgba(247,201,72,0.00) 62%)",
    meta: { tris: "55–85k (LOD0)", tex: "2–4×2K PBR", output: "Engine-ready pack" },
  },
  {
    id: "environments",
    eyebrow: "ENVIRONMENTS",
    title: "Mood lighting that still reads in gameplay.",
    lead:
      "We build modular, readable spaces and validate value control so environments don’t collapse into noise.",
    bullets: ["Modular kits + decals", "Fog & depth stacks", "Trim sheets where sensible"],
    accent: AMBER,
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Environment mood placeholder",
    overlay:
      "radial-gradient(120% 120% at 40% 10%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 64%)",
    meta: { tris: "Budgeted by kit", tex: "Trim + 2K decals", output: "Mod kit + master materials" },
  },
  {
    id: "product",
    eyebrow: "PRODUCT",
    title: "Studio packshots with calm reflections.",
    lead:
      "Hard-surface, clean highlights, physically plausible materials. Looks premium without over-sharpening or fake gloss.",
    bullets: ["Angles + hero frame", "Transparent PNGs", "Material library for variants"],
    accent: AMBER,
    image:
      "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Product render placeholder",
    overlay:
      "radial-gradient(120% 120% at 50% 10%, rgba(247,201,72,0.20), rgba(247,201,72,0.00) 66%)",
    meta: { tris: "As needed", tex: "2–4K PBR", output: "Packshots + assets" },
  },
  {
    id: "archviz",
    eyebrow: "ARCHVIZ",
    title: "Warm bounce. Clean blacks. Believable realism.",
    lead:
      "We tune GI and materials for realism that feels expensive. Camera and grade are part of the craft.",
    bullets: ["GI stability", "Camera pack", "High-res stills / flythrough optional"],
    accent: AMBER,
    image:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "ArchViz interior placeholder",
    overlay:
      "radial-gradient(120% 120% at 70% 20%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 66%)",
    meta: { tris: "Scene-based", tex: "Mix 2K/4K", output: "Stills + camera pack" },
  },
  {
    id: "stylized",
    eyebrow: "STYLIZED",
    title: "Shape language + palette discipline.",
    lead:
      "Stylized doesn’t mean sloppy. We control values, edges, and palettes so sets stay cohesive at scale.",
    bullets: ["Atlas or hand-painted", "Readable silhouettes", "Shader presets"],
    accent: AMBER,
    image:
      "https://images.unsplash.com/photo-1520975958225-9e9b08e0a3f0?auto=format&fit=crop&w=2400&q=80",
    imageAlt: "Stylized props placeholder",
    overlay:
      "radial-gradient(120% 120% at 40% 10%, rgba(247,201,72,0.20), rgba(247,201,72,0.00) 66%)",
    meta: { tris: "Tiered", tex: "1–2K", output: "FBX + shader notes" },
  },
];

const REEL_TILES: Array<{
  id: string;
  category: Exclude<Category, "All">;
  title: string;
  image: string;
}> = [
  {
    id: "r1",
    category: "Characters",
    title: "Hero Character — Lookdev Lock",
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd0f1d6?auto=format&fit=crop&w=2200&q=80",
  },
  {
    id: "r2",
    category: "Environments",
    title: "Environment — Cinematic Depth",
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=2200&q=80",
  },
  {
    id: "r3",
    category: "Product",
    title: "Product — Studio Specular Control",
    image:
      "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2200&q=80",
  },
  {
    id: "r4",
    category: "ArchViz",
    title: "ArchViz — Warm Realism",
    image:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=2200&q=80",
  },
  {
    id: "r5",
    category: "Stylized",
    title: "Stylized — Palette Discipline",
    image:
      "https://images.unsplash.com/photo-1520975958225-9e9b08e0a3f0?auto=format&fit=crop&w=2200&q=80",
  },
];

function LightFilmGrain() {
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

function ArrowDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-80">
      <path
        d="M12 5v13m0 0l-6-6m6 6l6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ReelTile({
  title,
  image,
  onOpen,
}: {
  title: string;
  image: string;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="group relative w-[78vw] max-w-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] text-left sm:w-[420px]"
      style={{ boxShadow: "0 30px 140px rgba(0,0,0,0.55)" }}
    >
      <div className="relative aspect-[16/10]">
        <SmartImg
          src={image}
          alt={title}
          fallbackLabel={title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
        <div
          className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 0%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 70%)",
          }}
        />
        <LightFilmGrain />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="text-sm font-semibold text-white/92">{title}</div>
          <span
            className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: AMBER, boxShadow: `0 0 0 8px ${AMBER_SOFT}` }}
          />
        </div>
        <div className="mt-2 text-xs text-white/60">Open moment</div>
      </div>
    </button>
  );
}

function MomentOverlayModal({
  open,
  moment,
  onClose,
}: {
  open: boolean;
  moment: Moment;
  onClose: () => void;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={reducedMotion ? false : { y: 18, opacity: 0, scale: 0.99 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { y: 12, opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#070A14]"
              style={{ boxShadow: "0 40px 160px rgba(0,0,0,0.60), 0 0 0 1px rgba(255,255,255,0.06) inset" }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(120% 120% at 70% 18%, rgba(247,201,72,0.20), rgba(247,201,72,0.00) 60%)",
                }}
              />
              <div className="relative grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r">
                    <SmartImg
                      src={moment.image}
                      alt={moment.imageAlt}
                      fallbackLabel={moment.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                    <div className="absolute inset-0" style={{ background: moment.overlay }} />
                    <LightFilmGrain />

                    <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-white/80">
                        {moment.eyebrow}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-white/65">
                        Moment
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <div className="p-6 lg:p-7">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold tracking-wider text-white/55">DETAILS</div>
                      <button
                        onClick={onClose}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/75 hover:bg-white/[0.06]"
                      >
                        Close
                      </button>
                    </div>
                    <div className="mt-3 text-lg font-semibold text-white/95">{moment.title}</div>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">{moment.lead}</p>

                    <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-sm font-semibold text-white/90">Quality notes</div>
                      <ul className="mt-3 space-y-2 text-sm text-white/70">
                        {moment.bullets.map((b) => (
                          <li key={b} className="flex gap-2">
                            <span style={{ color: AMBER }}>•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                        <div className="text-xs font-semibold text-white/55">Triangles</div>
                        <div className="mt-0.5 text-sm font-semibold text-white/90">{moment.meta.tris}</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                        <div className="text-xs font-semibold text-white/55">Textures</div>
                        <div className="mt-0.5 text-sm font-semibold text-white/90">{moment.meta.tex}</div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                        <div className="text-xs font-semibold text-white/55">Output</div>
                        <div className="mt-0.5 text-sm font-semibold text-white/90">{moment.meta.output}</div>
                      </div>
                    </div>

                    <Link
                      href="#section-cta"
                      onClick={onClose}
                      className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                      style={{ boxShadow: `0 22px 90px ${AMBER_GLOW}` }}
                    >
                      Start a lookdev
                    </Link>

                    <p className="mt-3 text-xs leading-relaxed text-white/55">
                      Replace these images with your real frames. The modal is built to feel like a “director’s notes”
                      panel.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative border-t border-white/10 bg-white/[0.02] px-6 py-4 text-xs text-white/55">
                Tip: press <span className="text-white/75">ESC</span> to close
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Page() {
  const reducedMotion = useReducedMotion();

  // Sticky cinematic progress (hero -> chapters)
  const pageRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });

  // cinematic header transforms
  const heroScale = useTransform(scrollYProgress, [0, 0.16], [1, 0.985]);
  const heroY = useTransform(scrollYProgress, [0, 0.16], [0, -20]);
  const heroDim = useTransform(scrollYProgress, [0, 0.22], [0, 0.55]);
  const topLineW = useTransform(scrollYProgress, [0, 0.35], ["12%", "88%"]);

  const [activeMoment, setActiveMoment] = useState<MomentId>("characters");
  const moment = useMemo(() => MOMENTS.find((m) => m.id === activeMoment)!, [activeMoment]);

  const [modalOpen, setModalOpen] = useState(false);

  // close modal on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // mini reel filter (optional)
  const [category, setCategory] = useState<Category>("All");
  const reel = useMemo(() => {
    if (category === "All") return REEL_TILES;
    return REEL_TILES.filter((t) => t.category === category);
  }, [category]);

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
              <div className="text-xs font-medium text-white/55">3D & Art · Cinematic Reel</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#section-reel">
              Reel
            </a>
            <a className="hover:text-white" href="#section-moments">
              Moments
            </a>
            <a className="hover:text-white" href="#section-proof">
              Proof
            </a>
            <a className="hover:text-white" href="#section-cta">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="#section-cta"
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/[0.06]"
              style={{ boxShadow: `0 16px 60px ${AMBER_GLOW}` }}
            >
              Start a lookdev
            </Link>
          </div>
        </div>

        {/* subtle progress bar */}
        <div className="h-[2px] w-full bg-white/5">
          <motion.div
            className="h-[2px]"
            style={{
              width: useTransform(scrollYProgress, (v) => `${clamp(v * 100, 0, 100)}%`),
              background: "linear-gradient(90deg, rgba(247,201,72,0.35), rgba(247,201,72,0.90))",
            }}
          />
        </div>
      </header>

      {/* HERO: Full-bleed Cinematic */}
      <section id="section-hero" className="relative z-10">
        <div className="relative mx-auto max-w-7xl px-5 pt-10 md:px-8 md:pt-14">
          <CornerGlows />

          <motion.div style={{ scale: heroScale, y: heroY }} className="relative">
            <div className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-white/[0.03]">
              {/* full-bleed reel frame */}
              <div className="relative aspect-[21/9] min-h-[360px]">
                <SmartImg
                  src={moment.image}
                  alt={moment.imageAlt}
                  fallbackLabel={moment.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
                <div className="absolute inset-0" style={{ background: moment.overlay }} />
                <LightFilmGrain />

                {/* hero editorial content */}
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full p-6 md:p-10">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                      <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white/75">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: AMBER, boxShadow: `0 0 0 6px ${AMBER_SOFT}` }}
                          />
                          CINEMATIC REEL · LOOKDEV & ART PRODUCTION
                        </div>

                        <h1 className="mt-4 text-[2.1rem] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[3.4rem]">
                          <span className="text-white/95">3D that feels</span>{" "}
                          <span style={{ color: AMBER }}>expensive</span>.
                          <span className="block text-white/70">
                            A reel that proves taste — with production discipline underneath.
                          </span>
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
                          Scroll through moments: characters, environments, product, ArchViz, stylized. Each one is a
                          “director’s note” on what makes the asset hold up under real lighting.
                        </p>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                          <button
                            onClick={() => setModalOpen(true)}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.10] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.14]"
                            style={{ boxShadow: `0 24px 110px ${AMBER_GLOW}` }}
                          >
                            Open director’s notes
                          </button>

                          <a
                            href="#section-reel"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] hover:text-white"
                          >
                            Enter the reel <ArrowDown />
                          </a>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                          <MiniStat label="Accent" value="Amber-only" />
                          <MiniStat label="Vibe" value="Cinematic" />
                          <MiniStat label="Core" value="Lookdev" />
                          <MiniStat label="Output" value="Engine-ready" />
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <div className="rounded-3xl border border-white/10 bg-black/35 p-4 backdrop-blur">
                          <div className="text-xs font-semibold tracking-wider text-white/55">NOW PLAYING</div>
                          <div className="mt-2 text-sm font-semibold text-white/90">{moment.eyebrow}</div>
                          <div className="mt-2 text-xs text-white/60">{moment.title}</div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/75">
                              {moment.meta.tris}
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/75">
                              {moment.meta.tex}
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/75">
                              {moment.meta.output}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* hero dim layer as you scroll */}
                    <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: heroDim }}>
                      <div className="absolute inset-0 bg-black/40" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* bottom "film edge" */}
              <div className="relative border-t border-white/10 bg-white/[0.02] px-6 py-4 md:px-10">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="text-xs font-semibold tracking-wider text-white/55">CHAPTER SELECTOR</div>
                  <SegmentedNav
                    active={activeMoment}
                    setActive={setActiveMoment}
                    items={[
                      { id: "characters", label: "Characters" },
                      { id: "environments", label: "Environments" },
                      { id: "product", label: "Product" },
                      { id: "archviz", label: "ArchViz" },
                      { id: "stylized", label: "Stylized" },
                    ]}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* underline kinetic bar */}
          <div className="mt-8 flex justify-center">
            <motion.div
              className="h-[2px] rounded-full"
              style={{
                width: topLineW,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.10), rgba(247,201,72,0.55), rgba(255,255,255,0.10))",
              }}
            />
          </div>
        </div>
      </section>

      {/* SECTION: Reel (horizontal strip with snap-ish feel) */}
      <section id="section-reel" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold tracking-wider text-white/55">THE REEL</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                A set of frames. <span className="text-white/70">Designed to be remembered.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                Scroll sideways for “moments”. Each tile opens a director-style breakdown in the modal.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/70">
                Filter:
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/80 outline-none"
              >
                {(["All", "Characters", "Environments", "Product", "ArchViz", "Stylized"] as Category[]).map((c) => (
                  <option key={c} value={c} className="bg-[#070A14]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-7">
            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {reel.map((t) => (
                <ReelTile
                  key={t.id}
                  title={t.title}
                  image={t.image}
                  onOpen={() => {
                    // map category -> moment
                    const map: Record<Exclude<Category, "All">, MomentId> = {
                      Characters: "characters",
                      Environments: "environments",
                      Product: "product",
                      ArchViz: "archviz",
                      Stylized: "stylized",
                    };
                    setActiveMoment(map[t.category]);
                    setModalOpen(true);
                  }}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-white/55">
              <span>Tip: swap each tile image with your real renders.</span>
              <a href="#section-moments" className="inline-flex items-center gap-2 text-white/70 hover:text-white">
                Go to moments <ArrowDown />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Moments (big editorial chapters) */}
      <section id="section-moments" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-6 md:px-8">
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.03] p-6 md:p-10">
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="text-xs font-semibold tracking-wider text-white/55">MOMENTS</div>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  Director’s notes, not bullet spam.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  Each chapter explains what we look for: value control, material response, and production hygiene.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                style={{ boxShadow: `0 22px 90px ${AMBER_GLOW}` }}
              >
                Open current moment
              </button>
            </div>

            <div className="mt-7">
              <SoftHr />
            </div>

            <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* left editorial */}
              <div className="lg:col-span-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-xs font-semibold text-white/70">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: AMBER, boxShadow: `0 0 0 6px ${AMBER_SOFT}` }}
                  />
                  {moment.eyebrow}
                </div>

                <h3 className="mt-4 text-[1.75rem] font-semibold leading-[1.06] tracking-[-0.02em] md:text-[2.15rem]">
                  {moment.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">{moment.lead}</p>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="text-sm font-semibold text-white/90">What we validate</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    {moment.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span style={{ color: AMBER }}>•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <MiniStat label="Triangles" value={moment.meta.tris} />
                  <MiniStat label="Textures" value={moment.meta.tex} />
                  <MiniStat label="Output" value={moment.meta.output} />
                </div>
              </div>

              {/* right frame */}
              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02]">
                  <div className="relative aspect-[16/10]">
                    <SmartImg
                      src={moment.image}
                      alt={moment.imageAlt}
                      fallbackLabel={moment.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                    <div className="absolute inset-0" style={{ background: moment.overlay }} />
                    <LightFilmGrain />
                    <div className="absolute left-5 top-5 flex items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-white/80">
                        Frame
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-white/65">
                        {moment.eyebrow}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-sm font-semibold text-white/90">Color & highlight control</div>
                      <span className="text-xs font-semibold text-white/55">cinematic grade</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">
                      Amber accents are subtle — used like a rim light. The goal is “premium”, not neon.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Value control", "Roughness breakup", "Calm specular", "Readable silhouettes"].map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
                  <div className="text-xs font-semibold tracking-wider text-white/55">CHAPTER SELECT</div>
                  <div className="mt-3">
                    <SegmentedNav
                      active={activeMoment}
                      setActive={setActiveMoment}
                      items={[
                        { id: "characters", label: "Characters" },
                        { id: "environments", label: "Environments" },
                        { id: "product", label: "Product" },
                        { id: "archviz", label: "ArchViz" },
                        { id: "stylized", label: "Stylized" },
                      ]}
                    />
                  </div>
                  <div className="mt-4 text-xs text-white/55">
                    Pro tip: replace moment images with real shots and keep the narrative copy — it reads like a studio.
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Proof (lightweight, cinematic) */}
      <section id="section-proof" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold tracking-wider text-white/55">PRODUCTION PROOF</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                Not just frames. <span className="text-white/70">Delivery discipline.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                The “wow” is the reel. The trust is the pack: predictable structure, documented budgets, and import notes.
              </p>
            </div>

            <Link
              href="#section-cta"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
              style={{ boxShadow: `0 22px 90px ${AMBER_GLOW}` }}
            >
              Request a plan
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-semibold text-white/90">Delivery pack structure</div>
              <div className="mt-4 space-y-2">
                {[
                  ["/Meshes", "FBX/GLB, LODs, collisions"],
                  ["/Textures", "Albedo, Rough, Metal, Normal, AO"],
                  ["/Materials", "Presets + shader notes"],
                  ["/Renders", "Turntables / packshots (optional)"],
                  ["/Docs", "Readme, budgets, import settings"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: AMBER, boxShadow: `0 0 0 7px ${AMBER_SOFT}` }}
                      />
                      <div className="text-sm font-semibold text-white/85">{k}</div>
                    </div>
                    <div className="text-xs text-white/55">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm font-semibold text-white/90">Quality gates (light)</div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Even in this cinematic variant, we still show the backbone: naming, texel density, shading safety, scale,
                pivots, and engine validation.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Texel density", "Shading safety", "Roughness breakup", "Scale & pivots", "LOD sanity", "Import notes"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/70"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-black/25 p-5">
                <div className="text-sm font-semibold text-white/90">Tools</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Blender/Maya", "ZBrush", "Substance", "Marmoset", "Unreal", "Unity"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/55">
                  Swap these pills with real logos later — layout is prepared for it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: CTA */}
      <section id="section-cta" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-2 md:px-8 md:pb-20">
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
                <div className="text-xs font-semibold tracking-wider text-white/55">START THE REEL</div>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  Send references. <span className="text-white/70">We’ll match the mood — then ship the pack.</span>
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  Moodboard + target platform is enough to start. We’ll propose budgets and a lookdev approval flow —
                  then production becomes predictable.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="text-sm font-semibold text-white/90">Best for</div>
                    <div className="mt-2 text-sm text-white/70">
                      Characters, environments, prop sets, product renders, ArchViz stills.
                    </div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="text-sm font-semibold text-white/90">Typical outputs</div>
                    <div className="mt-2 text-sm text-white/70">
                      Engine-ready assets + turntables / packshots + texture breakdowns.
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
                      href="#section-hero"
                      className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] hover:text-white"
                    >
                      Back to top
                    </a>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-white/55">
                    Tip: If you have a target reference board (ArtStation/Behance/Pinterest), send it — we’ll match lighting
                    + materials, then lock a lookdev standard before scaling.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-8 text-center text-xs text-white/45">
            © {new Date().getFullYear()} WODH · 3D & Art Design · Variant C — Cinematic Reel
          </footer>
        </div>
      </section>

      {/* MODAL */}
      <MomentOverlayModal open={modalOpen} moment={moment} onClose={() => setModalOpen(false)} />
    </div>
  );
}
