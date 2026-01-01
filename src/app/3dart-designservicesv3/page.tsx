"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* =======================================================================================
   WODH — 3D ART & DESIGN SERVICES
   Variant C — Cinematic Reel (Gold/Amber Accent)
   ✅ Wodh v1 atmosphere: indigo base + subtle noise + corner glows
   ✅ “Cinematic Reel Rail” (scroll-driven feel without heavy libs)
   ✅ Chaptered portfolio: Characters → Environments → Product → Props
   ✅ Sticky chapter header + progress pill
   ✅ Reel modal: plays “shot deck” style (beauty frames) + breakdown tabs
   ✅ Online images used where easy (Unsplash static URLs) — safe placeholders
   ✅ Section IDs for easy navigation
======================================================================================= */

type Category = "Characters" | "Environments" | "Product" | "Props";
type StyleTag = "Realtime" | "Cinematic" | "Stylized" | "Realistic" | "Mobile/Quest" | "UE5" | "Unity";
type ReelTab = "shots" | "wire" | "maps" | "specs";

type ReelShot = {
  id: string;
  src: string;
  label: string;
};

type ReelItem = {
  id: string;
  title: string;
  category: Category;
  tags: StyleTag[];
  subtitle: string;
  cover: string;
  shots: ReelShot[];
  wire: string;
  maps: string;
  specs: Array<{ k: string; v: string }>;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ----------------------------- Nav + Sections ----------------------------- */
const NAV = [
  { id: "hero", label: "Overview" },
  { id: "reel", label: "Reel" },
  { id: "services", label: "Deliverables" },
  { id: "chapters", label: "Chapters" },
  { id: "portfolio", label: "Portfolio" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "Get a Quote" },
] as const;

/* ------------------------------ Image placeholders ------------------------------ */
const IMG = {
  hero:
    "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1800&q=80",
  shot1:
    "https://images.unsplash.com/photo-1520975958225-8fefb3c52f9b?auto=format&fit=crop&w=1600&q=80",
  shot2:
    "https://images.unsplash.com/photo-1520975869018-2c9e3bba5b7c?auto=format&fit=crop&w=1600&q=80",
  shot3:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  shot4:
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3cef?auto=format&fit=crop&w=1600&q=80",
  env1:
    "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=1600&q=80",
  env2:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  prod1:
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1600&q=80",
  prod2:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
  wire:
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3cef?auto=format&fit=crop&w=1600&q=80",
  maps:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
};

const REEL_ITEMS: ReelItem[] = [
  {
    id: "rc-char-01",
    title: "Hero Character — Cinematic Shots",
    category: "Characters",
    subtitle: "Shot deck: close-ups, silhouette, material beats.",
    tags: ["Cinematic", "Realistic", "UE5"],
    cover: IMG.shot2,
    shots: [
      { id: "s1", src: IMG.shot2, label: "Hero keylight" },
      { id: "s2", src: IMG.shot1, label: "Material close-up" },
      { id: "s3", src: IMG.shot4, label: "Silhouette rim" },
      { id: "s4", src: IMG.shot3, label: "Mood pass" },
    ],
    wire: IMG.wire,
    maps: IMG.maps,
    specs: [
      { k: "Delivery", v: "Shot deck + turntable + breakdown pack" },
      { k: "Maps", v: "Albedo/Normal/Rough/AO + notes" },
      { k: "Engine", v: "UE5 scene (optional)" },
      { k: "Style", v: "Realistic PBR calibration" },
    ],
  },
  {
    id: "rc-env-01",
    title: "Environment Set — Chapter Shots",
    category: "Environments",
    subtitle: "Establishing shots + detail passes + atmosphere.",
    tags: ["Cinematic", "Stylized", "Unity"],
    cover: IMG.env1,
    shots: [
      { id: "s1", src: IMG.env1, label: "Establishing" },
      { id: "s2", src: IMG.env2, label: "Detail pass" },
      { id: "s3", src: IMG.shot3, label: "Lighting beat" },
      { id: "s4", src: IMG.shot4, label: "Composition" },
    ],
    wire: IMG.wire,
    maps: IMG.maps,
    specs: [
      { k: "Workflow", v: "Modular + trims + decals" },
      { k: "Delivery", v: "Scene + shot deck + breakdown" },
      { k: "Engine", v: "Unity scene (optional)" },
      { k: "Notes", v: "Atmosphere + readability" },
    ],
  },
  {
    id: "rc-prod-01",
    title: "Product Viz — Studio Cinematic",
    category: "Product",
    subtitle: "Hero angles + macro shots + variant beats.",
    tags: ["Cinematic", "Realistic", "UE5"],
    cover: IMG.prod1,
    shots: [
      { id: "s1", src: IMG.prod1, label: "Hero angle" },
      { id: "s2", src: IMG.prod2, label: "Macro detail" },
      { id: "s3", src: IMG.shot4, label: "Reflection sweep" },
      { id: "s4", src: IMG.shot1, label: "Variant mood" },
    ],
    wire: IMG.wire,
    maps: IMG.maps,
    specs: [
      { k: "Delivery", v: "PNG pack + shot deck + breakdown" },
      { k: "Variants", v: "Colorways/material swaps" },
      { k: "Maps", v: "Full PBR maps bundle" },
      { k: "Motion", v: "Short loop (optional)" },
    ],
  },
];

/* Chaptered portfolio: we’ll expand reel items into chapter lists (you can replace with your real work later) */
const CHAPTERS: Array<{ key: Category; title: string; desc: string }> = [
  {
    key: "Characters",
    title: "Characters",
    desc: "Silhouette, anatomy, materials — delivered with breakdown proof and engine-ready options.",
  },
  {
    key: "Environments",
    title: "Environments",
    desc: "World-building, modular kits, mood lighting — staged like a cinematic set.",
  },
  {
    key: "Product",
    title: "Product Renders",
    desc: "Studio-grade visuals with controlled highlights, macro detail, and variant packs.",
  },
  {
    key: "Props",
    title: "Props & Asset Sets",
    desc: "Reusable libraries: scale, pivots, naming, and performance thinking baked in.",
  },
];

/* Services (short + cinematic wording) */
const SERVICES = [
  { t: "Cinematic Shot Decks", d: "A curated set of shots that sells the asset in seconds." },
  { t: "Realtime-Ready Assets", d: "Clean bakes + PBR maps + export packs when needed." },
  { t: "Environments & Kits", d: "Modular pieces, trims, decals, and set dressing." },
  { t: "Product Visualization", d: "Hero angles, macro shots, and variant packs." },
  { t: "Breakdown Proof", d: "Wireframes, maps, specs — confidence for technical teams." },
  { t: "Optimization (XR/Mobile)", d: "Budgets and LOD planning when performance matters." },
];

const FAQ = [
  {
    q: "Is this page only for cinematic renders?",
    a: "No — Variant C uses cinematic presentation to sell the work, but we can deliver realtime-ready assets with maps, LODs, and engine packs.",
  },
  {
    q: "Do you provide breakdowns behind the shots?",
    a: "Yes. Every reel item can include wireframes, maps, specs, and engine validation (optional).",
  },
  {
    q: "How do you organize a 3D portfolio without it feeling messy?",
    a: "We use chapters (Characters → Environments → Product → Props) and keep each chapter focused with curated ‘shot decks.’",
  },
  {
    q: "Can you match our game’s art style?",
    a: "Yes — we run a style calibration pass early (palette, roughness response, bevel language) and keep it consistent across assets.",
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
                <div className="text-xs text-white/55">Cinematic Reel Viewer</div>
                <div className="truncate text-sm font-semibold tracking-[-0.01em] text-white">{title}</div>
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
  overlay?: "none" | "wire" | "maps";
}) {
  const overlayLayer =
    overlay === "wire"
      ? "repeating-linear-gradient(90deg, rgba(255,255,255,.14) 0 1px, rgba(255,255,255,0) 1px 18px), repeating-linear-gradient(0deg, rgba(255,255,255,.10) 0 1px, rgba(255,255,255,0) 1px 18px)"
      : overlay === "maps"
      ? "linear-gradient(135deg, rgba(91,45,220,.16), rgba(247,184,75,.14))"
      : "";

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover opacity-[0.92]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/45" />
      {overlay !== "none" ? <div className="absolute inset-0 opacity-[0.55]" style={{ background: overlayLayer }} /> : null}
      <Noise />
    </div>
  );
}

/* ------------------------------- Reel Rail ------------------------------- */
/**
 * A cinematic “rail”:
 * - horizontal scroll with snap
 * - left/right buttons
 * - optional wheel-to-horizontal
 */
function ReelRail({
  items,
  onOpen,
  reduceMotion,
}: {
  items: ReelItem[];
  onOpen: (item: ReelItem) => void;
  reduceMotion: boolean;
}) {
  const railRef = useRef<HTMLDivElement | null>(null);

  // Optional wheel-to-horizontal (desktop)
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // if user is scrolling vertically over rail, convert to horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const amount = Math.max(320, Math.floor(el.clientWidth * 0.7));
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-xs text-white/55">Cinematic Reel Rail</div>
          <div className="text-sm font-semibold text-white">Curated shot decks • chapter preview</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollBy(-1)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
          >
            Prev
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
          >
            Next
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className={cx(
          "flex gap-4 overflow-x-auto pb-2",
          "snap-x snap-mandatory scroll-smooth",
          "[-webkit-overflow-scrolling:touch]"
        )}
      >
        {items.map((it, idx) => (
          <motion.button
            key={it.id}
            onClick={() => onOpen(it)}
            className={cx(
              "group relative snap-start",
              "min-w-[280px] max-w-[280px] sm:min-w-[340px] sm:max-w-[340px]",
              "rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-4 backdrop-blur",
              "text-left"
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.25, delay: idx * 0.03 }}
          >
            <div className="relative h-44">
              <ImgPlate src={it.cover} alt={it.title} />
              <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-black/35 px-2 py-1 text-[10px] text-white/70 backdrop-blur">
                Reel • {it.category}
              </div>
            </div>

            <div className="mt-3 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-white">{it.title}</div>
                <div className="mt-1 line-clamp-2 text-sm text-white/62">{it.subtitle}</div>
              </div>
              <Chip tone="amber">Open</Chip>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {it.tags.slice(0, 3).map((t) => (
                <Chip key={t} tone={t === "UE5" || t === "Cinematic" ? "amber" : "neutral"}>
                  {t}
                </Chip>
              ))}
            </div>

            {!reduceMotion ? (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-1/2 top-[-35%] h-[170%] w-[60%] rotate-12 opacity-0 group-hover:opacity-80"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,213,122,0) 0%, rgba(255,213,122,.18) 45%, rgba(255,213,122,0) 100%)",
                  filter: "blur(10px)",
                  mixBlendMode: "screen",
                }}
                whileHover={{ x: 40 }}
                transition={{ duration: 0.35 }}
              />
            ) : null}
          </motion.button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Chip tone="amber">Tip</Chip>
        <span className="text-xs text-white/60">Scroll wheel over the rail to scrub horizontally (desktop).</span>
      </div>
    </div>
  );
}

/* -------------------------- Sticky Chapter Progress -------------------------- */
function useScrollProgress(sectionId: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress from entering viewport to leaving
      const start = vh * 0.15;
      const end = vh * 0.85;
      const total = (r.height + (end - start)) || 1;
      const current = (start - r.top);
      const p = Math.max(0, Math.min(1, current / total));
      setProgress(Math.round(p * 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionId]);

  return progress;
}

/* ------------------------------- Main Page ------------------------------- */
export default function Page_3DArt_CinematicReel() {
  const reduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  useStudioLight(pageRef, !reduceMotion);

  const [active, setActive] = useState<ReelItem | null>(null);
  const [tab, setTab] = useState<ReelTab>("shots");
  const [shotIndex, setShotIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    setTab("shots");
    setShotIndex(0);
  }, [active]);

  const chapterProgress = useScrollProgress("portfolio");

  // Build chapter lists (for now, re-use reel items; you can expand to many items later)
  const chapterItems = useMemo(() => {
    const byCat: Record<Category, ReelItem[]> = {
      Characters: [],
      Environments: [],
      Product: [],
      Props: [],
    };
    REEL_ITEMS.forEach((x) => byCat[x.category].push(x));
    return byCat;
  }, []);

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
              Chapters
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

      {/* Sticky chapter progress pill (appears after some scroll) */}
      <div className="pointer-events-none sticky top-[56px] z-30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mt-3 flex justify-end">
            <div className="pointer-events-none inline-flex items-center gap-2 rounded-full border border-white/10 bg-[rgba(12,7,34,.45)] px-3 py-1.5 text-xs text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[rgba(255,213,122,.8)]" />
              <span>Portfolio chapters</span>
              <span className="text-[rgba(255,213,122,.9)]">{chapterProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      <main className="relative mx-auto max-w-6xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
        {/* =========================
           SECTION 1 — HERO (id=hero)
        ========================== */}
        <section id="hero" className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Chip tone="amber">Variant C — Cinematic Reel</Chip>
                <Chip>Gold/Amber Accent</Chip>
                <Chip tone="violet">Games-ready</Chip>
                <Chip tone="green">XR-ready</Chip>
              </div>

              <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Sell your work like a{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.85), rgba(255,255,255,.75))",
                  }}
                >
                  cinematic reel
                </span>{" "}
                — not a grid.
              </h1>

              <p className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-white/62 sm:text-[15px]">
                This variant feels like a studio reel: curated shot decks, chapters, and a smooth narrative flow.
                It’s still production-ready — but presented with cinematic intent.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <a
                  href="#reel"
                  className="rounded-2xl border border-[rgba(247,184,75,.25)] bg-[rgba(247,184,75,.10)] px-4 py-2 text-sm text-[rgba(255,213,122,.95)] hover:bg-[rgba(247,184,75,.14)]"
                >
                  Watch the reel rail
                </a>
                <a
                  href="#portfolio"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                >
                  Jump to chapters
                </a>
              </div>

              <div className="mt-7 grid gap-2 sm:grid-cols-3">
                {[
                  { k: "Curation", v: "Shot decks per asset" },
                  { k: "Narrative", v: "Chaptered portfolio flow" },
                  { k: "Proof", v: "Wire/maps/specs behind the reel" },
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="text-xs text-white/55">{s.k}</div>
                    <div className="mt-1 text-sm font-semibold tracking-[-0.01em] text-white">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero cinematic plate */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-4 backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-xs text-white/55">Hero Frame</div>
                  <div className="text-sm font-semibold text-white">Mood • composition • highlight control</div>
                </div>
                <Chip tone="amber">Cinematic</Chip>
              </div>
              <div className="relative h-[360px]">
                <ImgPlate src={IMG.hero} alt="Cinematic hero frame" />
                {!reduceMotion ? (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute -left-1/3 top-[-35%] h-[170%] w-[55%] rotate-12 opacity-55"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(255,213,122,0) 0%, rgba(255,213,122,.18) 45%, rgba(255,213,122,0) 100%)",
                      filter: "blur(10px)",
                      mixBlendMode: "screen",
                    }}
                    animate={{ x: ["-20%", "120%"] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                ) : null}
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-xs text-white/55">Format</div>
                    <div className="text-sm font-semibold text-white">Reel rail → chapters → deep dive viewer</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Chip>Shots</Chip>
                    <Chip>Wire</Chip>
                    <Chip>Maps</Chip>
                    <Chip tone="amber">Specs</Chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
           SECTION 2 — REEL (id=reel)
        ========================== */}
        <section id="reel" className="relative mt-16">
          <SectionHeader
            chip={
              <>
                <Chip tone="amber">Signature</Chip>
                <Chip>Cinematic Reel Rail</Chip>
              </>
            }
            title={
              <>
                A reel you can{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  scroll
                </span>
                .
              </>
            }
            desc="Curated shot decks that feel like a studio reel. Click any item to open the cinematic viewer with breakdown tabs."
          />

          <ReelRail items={REEL_ITEMS} onOpen={(it) => setActive(it)} reduceMotion={!!reduceMotion} />
        </section>

        {/* =========================
           SECTION 3 — SERVICES (id=services)
        ========================== */}
        <section id="services" className="relative mt-16">
          <SectionHeader
            chip={
              <>
                <Chip tone="amber">Deliverables</Chip>
                <Chip>What we ship</Chip>
              </>
            }
            title={
              <>
                Deliverables that make{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  art feel expensive
                </span>{" "}
                (and safe).
              </>
            }
            desc="Cinematic presentation on the outside, production clarity underneath — so both marketing and technical teams trust the work."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.t}
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
                  <div className="text-sm font-semibold text-white">{s.t}</div>
                  <div className="mt-1 text-sm text-white/62">{s.d}</div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                    <div className="text-xs text-white/55">Why it matters</div>
                    <div className="text-xs font-semibold text-white/80">
                      Curation → confidence → faster decisions
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================
           SECTION 4 — CHAPTERS (id=chapters)
        ========================== */}
        <section id="chapters" className="relative mt-16">
          <SectionHeader
            chip={
              <>
                <Chip tone="amber">Structure</Chip>
                <Chip>Chapters</Chip>
              </>
            }
            title={
              <>
                Chaptered portfolio:{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  Characters → Environments → Product → Props
                </span>
              </>
            }
            desc="Instead of dumping everything into one grid, we group work into chapters with consistent pacing and clear categories."
          />

          <div className="grid gap-4 lg:grid-cols-4">
            {CHAPTERS.map((c, idx) => (
              <motion.a
                key={c.key}
                href={`#chapter-${c.key.toLowerCase()}`}
                className="group rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-5 backdrop-blur"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.25, delay: idx * 0.03 }}
              >
                <div className="flex items-center justify-between">
                  <Chip tone="amber">{String(idx + 1).padStart(2, "0")}</Chip>
                  <span className="text-[10px] text-white/45">Jump</span>
                </div>
                <div className="mt-3 text-sm font-semibold text-white">{c.title}</div>
                <div className="mt-1 text-sm text-white/62">{c.desc}</div>

                <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                  <div className="text-xs text-white/55">View chapter</div>
                  <div className="text-xs font-semibold text-[rgba(255,213,122,.92)]">→</div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* =========================
           SECTION 5 — PORTFOLIO (id=portfolio)
        ========================== */}
        <section id="portfolio" className="relative mt-16">
          <SectionHeader
            chip={
              <>
                <Chip tone="amber">Portfolio</Chip>
                <Chip>Chaptered grid</Chip>
              </>
            }
            title={
              <>
                Chapters that keep your work{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  memorable
                </span>
              </>
            }
            desc="Each chapter has a curated set of hero pieces. Click any item to open the reel viewer."
          />

          {/* Chapter: Characters */}
          <ChapterSection
            id="chapter-characters"
            title="Characters"
            desc="Close-ups, silhouette beats, material reads."
            items={chapterItems.Characters}
            reduceMotion={!!reduceMotion}
            onOpen={(it) => setActive(it)}
          />

          {/* Chapter: Environments */}
          <ChapterSection
            id="chapter-environments"
            title="Environments"
            desc="Establishing shots, detail passes, atmosphere."
            items={chapterItems.Environments}
            reduceMotion={!!reduceMotion}
            onOpen={(it) => setActive(it)}
          />

          {/* Chapter: Product */}
          <ChapterSection
            id="chapter-product"
            title="Product Renders"
            desc="Hero angles, macro details, reflection control."
            items={chapterItems.Product}
            reduceMotion={!!reduceMotion}
            onOpen={(it) => setActive(it)}
          />

          {/* Chapter: Props (empty state demo) */}
          <EmptyChapter
            id="chapter-props"
            title="Props & Asset Sets"
            desc="This chapter becomes powerful once you add your prop libraries and set dressing packs."
          />
        </section>

        {/* =========================
           SECTION 6 — FAQ (id=faq)
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
                A reel is great — but{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,213,122,1), rgba(247,184,75,.9), rgba(255,255,255,.7))",
                  }}
                >
                  can you ship?
                </span>
              </>
            }
            desc="Yes. This variant sells with cinematic pacing, but still delivers production proof behind the scenes."
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
           SECTION 7 — FINAL CTA (id=cta)
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
                  <Chip tone="amber">Variant C</Chip>
                  <Chip>Cinematic selling</Chip>
                  <Chip>Proof behind it</Chip>
                </div>

                <h3 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                  Send 3 references + platform — we’ll craft a mini “shot deck” and estimate.
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
                  Tell us if you want a cinematic reel vibe, or if the priority is realtime integration. We’ll propose
                  the right deliverables either way.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href="mailto:hello@wodh.io"
                    className="rounded-2xl border border-[rgba(247,184,75,.25)] bg-[rgba(247,184,75,.10)] px-4 py-2 text-sm text-[rgba(255,213,122,.95)] hover:bg-[rgba(247,184,75,.14)]"
                  >
                    Email us
                  </a>
                  <a
                    href="#reel"
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                  >
                    Rewatch rail
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-semibold text-white">Include in your message</div>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {[
                    "Chapter: Characters / Environments / Product / Props",
                    "Target platform: PC/Console/Mobile/Quest",
                    "Style reference: links or images",
                    "Deliverables: shot deck / engine pack / breakdowns",
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
                    Reel shots + wire/maps/specs (engine pack optional)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
           MODAL — CINEMATIC VIEWER
        ========================== */}
        <Modal
          open={!!active}
          onClose={() => setActive(null)}
          title={active ? `${active.title} — ${active.category}` : "Cinematic Viewer"}
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
                    {(["shots", "wire", "maps", "specs"] as const).map((t) => {
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
                          {t === "shots" ? "Shots" : t === "wire" ? "Wire" : t === "maps" ? "Maps" : "Specs"}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Main viewer */}
                <div className="relative h-[420px]">
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
                  ) : tab === "wire" ? (
                    <ImgPlate src={active.wire} alt="Wireframe view" overlay="wire" />
                  ) : tab === "maps" ? (
                    <ImgPlate src={active.maps} alt="Maps view" overlay="maps" />
                  ) : (
                    <ImgPlate src={active.shots[shotIndex]?.src ?? active.cover} alt="Shot view" />
                  )}
                </div>

                {/* Shot strip */}
                {tab === "shots" ? (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {active.shots.map((s, i) => {
                      const on = i === shotIndex;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setShotIndex(i)}
                          className={cx(
                            "relative h-16 w-28 flex-none overflow-hidden rounded-xl border",
                            on ? "border-[rgba(247,184,75,.35)]" : "border-white/10",
                            "bg-white/5"
                          )}
                        >
                          <img src={s.src} alt={s.label} className="h-full w-full object-cover opacity-[0.92]" />
                          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/55" />
                          <div className="absolute bottom-1 left-1 right-1 text-[10px] text-white/75 truncate">
                            {s.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              {/* Right rail: story + CTA */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold text-white">Why this works</div>
                <p className="mt-2 text-sm leading-6 text-white/62">
                  Cinematic selling is about curation. Instead of a noisy grid, you show a short sequence of shots that
                  makes the asset feel intentional — then you back it up with proof (wire/maps/specs).
                </p>

                <div className="mt-4 space-y-2">
                  {[
                    { k: "Curation", v: "Shot decks make assets feel premium" },
                    { k: "Clarity", v: "Chapters reduce cognitive load" },
                    { k: "Trust", v: "Proof tabs satisfy technical reviewers" },
                  ].map((x) => (
                    <div key={x.k} className="rounded-xl border border-white/10 bg-black/20 p-3">
                      <div className="text-xs text-white/55">{x.k}</div>
                      <div className="mt-1 text-sm font-semibold text-white">{x.v}</div>
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

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-white/55">Tip</div>
                  <div className="mt-1 text-sm text-white/70">
                    Replace these placeholder images with your real renders — keep the shot deck structure.
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </Modal>
      </main>

      <footer className="relative border-t border-white/10 bg-[rgba(12,7,34,.35)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-white/60 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} WODH — 3D Art & Design Studio</div>
          <div className="flex items-center gap-2">
            <Chip tone="amber">Variant C</Chip>
            <Chip>Cinematic Reel</Chip>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------- Chapter Blocks ------------------------------- */
function ChapterSection({
  id,
  title,
  desc,
  items,
  reduceMotion,
  onOpen,
}: {
  id: string;
  title: string;
  desc: string;
  items: ReelItem[];
  reduceMotion: boolean;
  onOpen: (item: ReelItem) => void;
}) {
  return (
    <div id={id} className="mb-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="amber">Chapter</Chip>
            <Chip>{title}</Chip>
          </div>
          <div className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white">{title}</div>
          <div className="mt-1 text-sm text-white/62">{desc}</div>
        </div>
        <a
          href="#reel"
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10"
        >
          Back to reel
        </a>
      </div>

      {items.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, idx) => (
            <motion.button
              key={it.id}
              onClick={() => onOpen(it)}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-4 backdrop-blur text-left"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.25, delay: idx * 0.03 }}
            >
              <div className="relative h-44">
                <ImgPlate src={it.cover} alt={it.title} />
                <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-black/35 px-2 py-1 text-[10px] text-white/70 backdrop-blur">
                  Shot deck • {it.category}
                </div>
              </div>

              <div className="mt-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-white">{it.title}</div>
                  <div className="mt-1 line-clamp-2 text-sm text-white/62">{it.subtitle}</div>
                </div>
                <Chip tone="amber">Open</Chip>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {it.tags.slice(0, 3).map((t) => (
                  <Chip key={t} tone={t === "UE5" || t === "Cinematic" ? "amber" : "neutral"}>
                    {t}
                  </Chip>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                <div className="text-xs text-white/55">Shots + Proof tabs</div>
                <div className="text-xs font-semibold text-[rgba(255,213,122,.92)]">Viewer →</div>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-6 backdrop-blur">
          <div className="text-sm font-semibold text-white">No items yet</div>
          <div className="mt-2 text-sm text-white/62">
            Add your real portfolio items to this chapter and it will become a powerful narrative block.
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyChapter({ id, title, desc }: { id: string; title: string; desc: string }) {
  return (
    <div id={id} className="mb-10">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="amber">Chapter</Chip>
            <Chip>{title}</Chip>
          </div>
          <div className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white">{title}</div>
          <div className="mt-1 text-sm text-white/62">{desc}</div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(255,255,255,.04)] p-6 backdrop-blur">
        <div className="absolute inset-0">
          <CornerGlows />
          <Noise />
        </div>
        <div className="relative">
          <div className="text-sm font-semibold text-white">Drop your prop libraries here</div>
          <div className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
            Add 6–12 prop sets with 3–5 “shot deck” frames each (beauty, scale, material close-up). This chapter
            becomes the “volume proof” for production teams.
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {["Prop set A", "Prop set B", "Prop set C"].map((x) => (
              <div key={x} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-sm font-semibold text-white">{x}</div>
                <div className="mt-1 text-sm text-white/62">Placeholder card</div>
                <div className="mt-3 h-24">
                  <ImgPlate src={IMG.maps} alt="Placeholder" overlay="maps" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
