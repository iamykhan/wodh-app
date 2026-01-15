"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

/**
 * WODH — 3D & Art Design
 * Variant A — Lookdev Studio (premium + simplest)
 * Accent: Amber/Gold (no green/purple)
 */

type Category = "All" | "Characters" | "Environments" | "Product" | "ArchViz" | "Stylized";
type Mode = "Beauty" | "Wireframe" | "AO";

type Work = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  tags: string[];
  summary: string;
  thumb: string;
  beauty: string;
  wire?: string; // optional alternate
  meta: {
    tris: string;
    tex: string;
    render: string;
    delivery: string[];
  };
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
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0B1022"/>
        <stop offset="50%" stop-color="#121A33"/>
        <stop offset="100%" stop-color="#0A0F1F"/>
      </linearGradient>
      <radialGradient id="r" cx="78%" cy="22%" r="60%">
        <stop offset="0%" stop-color="rgba(247,201,72,0.45)"/>
        <stop offset="60%" stop-color="rgba(247,201,72,0.10)"/>
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
    <rect width="100%" height="100%" filter="url(#n)" opacity="0.6"/>
    <circle cx="960" cy="170" r="220" fill="rgba(247,201,72,0.10)"/>
    <path d="M1200 620 C980 560 860 540 650 590 C430 642 250 700 0 740 L0 800 L1200 800 Z"
      fill="rgba(255,255,255,0.04)"/>
    <text x="60" y="92" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial"
      font-size="42" fill="rgba(255,255,255,0.86)" font-weight="650">${safe}</text>
    <text x="60" y="138" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial"
      font-size="20" fill="rgba(255,255,255,0.55)">Placeholder render (swap with your real lookdev)</text>
    <text x="60" y="720" font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial"
      font-size="18" fill="rgba(247,201,72,0.60)">WODH · 3D & Art Design</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function SmartImg({
  src,
  alt,
  className,
  fallbackLabel,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel: string;
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
    <div className="w-full">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={cn(
                "relative rounded-xl px-3 py-2 text-sm font-medium transition",
                "border border-transparent",
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
    </div>
  );
}

function ModePills({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const opts: Mode[] = ["Beauty", "Wireframe", "AO"];
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
      {opts.map((m) => {
        const active = m === mode;
        return (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-xl px-3 py-2 text-xs font-semibold transition",
              active ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/[0.06]"
            )}
            aria-pressed={active}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
}

function WireOverlay({ strength = 0.55 }: { strength?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity: strength,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        mixBlendMode: "overlay",
      }}
    />
  );
}

function AOOverlay({ strength = 0.65 }: { strength?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        opacity: strength,
        background:
          "radial-gradient(80% 120% at 50% 10%, rgba(0,0,0,0.05), rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.78) 100%)",
        mixBlendMode: "multiply",
      }}
    />
  );
}

function BeforeAfter({
  before,
  after,
  label,
}: {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  label: string;
}) {
  const [v, setV] = useState(62);
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="absolute left-5 top-5 z-20 flex items-center gap-2">
        <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold text-white/80">
          {label}
        </span>
        <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold text-white/70">
          Drag
        </span>
      </div>

      <div className="relative aspect-[16/10]">
        <SmartImg
          src={after.src}
          alt={after.alt}
          fallbackLabel="After"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}>
          <SmartImg
            src={before.src}
            alt={before.alt}
            fallbackLabel="Before"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Divider */}
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${v}%` }}>
          <div className="h-full w-[2px] bg-white/70 shadow-[0_0_0_1px_rgba(0,0,0,0.4)]" />
          <div
            className="absolute -left-4 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full border border-white/20 bg-black/45 backdrop-blur"
            style={{ boxShadow: `0 14px 50px ${AMBER_GLOW}` }}
          />
        </div>
      </div>

      <div className="p-5">
        <input
          aria-label="Before after slider"
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => setV(parseInt(e.target.value, 10))}
          className="w-full accent-white"
          style={{
            filter: "drop-shadow(0 10px 26px rgba(0,0,0,0.35))",
          }}
        />
        <div className="mt-2 flex items-center justify-between text-xs text-white/55">
          <span>Raw / Clay</span>
          <span>Final Lookdev</span>
        </div>
      </div>
    </div>
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
        className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 62%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-24 -top-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(247,201,72,0.14), rgba(247,201,72,0.00) 64%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[560px] w-[760px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, rgba(247,201,72,0.10), rgba(247,201,72,0.00) 68%)",
        }}
      />
    </>
  );
}

const CATEGORIES: Category[] = ["All", "Characters", "Environments", "Product", "ArchViz", "Stylized"];

const WORKS: Work[] = [
  {
    id: "w1",
    title: "Hero Character · Lookdev Pass",
    category: "Characters",
    tags: ["Sculpt", "Groom", "Skin/SSS", "Turntable"],
    summary: "Production-ready character lookdev with clean materials, readable forms, and controlled highlights.",
    thumb:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd0f1d6?auto=format&fit=crop&w=1600&q=80",
    beauty:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd0f1d6?auto=format&fit=crop&w=2200&q=80",
    meta: {
      tris: "68k (LOD0)",
      tex: "4×2K (PBR)",
      render: "Marmoset / Unreal-ready",
      delivery: ["FBX + textures", "LOD set", "Material presets"],
    },
  },
  {
    id: "w2",
    title: "Cinematic Environment · Mood Lighting",
    category: "Environments",
    tags: ["Modular", "Decals", "Fog", "Lighting"],
    summary: "Environment lookdev built for depth: haze, rims, and value control that reads instantly.",
    thumb:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1600&q=80",
    beauty:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=2200&q=80",
    meta: {
      tris: "1.2M scene (modular)",
      tex: "Trim sheets + 2K decals",
      render: "Unreal / offline optional",
      delivery: ["Mod kit", "Master materials", "Lighting profile"],
    },
  },
  {
    id: "w3",
    title: "Product Render · Studio Grade",
    category: "Product",
    tags: ["Hard-surface", "Clean reflections", "Packshots"],
    summary: "Crisp product lookdev with physically-plausible materials and controlled specular roll-off.",
    thumb:
      "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=1600&q=80",
    beauty:
      "https://images.unsplash.com/photo-1526402461046-f522de6f4f0a?auto=format&fit=crop&w=2200&q=80",
    meta: {
      tris: "120k",
      tex: "2×4K (PBR)",
      render: "Keyshot / Blender Cycles",
      delivery: ["4 angles + hero", "Transparent PNGs", "Material library"],
    },
  },
  {
    id: "w4",
    title: "ArchViz · Warm Modern Interior",
    category: "ArchViz",
    tags: ["GI", "Materials", "Camera", "Post-grade"],
    summary: "ArchViz lighting and materials tuned for realism: believable bounce, clean blacks, and warm mids.",
    thumb:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1600&q=80",
    beauty:
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=2200&q=80",
    meta: {
      tris: "Scene-based",
      tex: "Mixed 2K/4K",
      render: "V-Ray / Cycles",
      delivery: ["High-res stills", "Camera pack", "Material set"],
    },
  },
  {
    id: "w5",
    title: "Stylized Prop Set · Color Discipline",
    category: "Stylized",
    tags: ["Hand-painted", "Shapes", "Palette"],
    summary: "Stylized lookdev focused on shape language + palette control for consistent art direction.",
    thumb:
      "https://images.unsplash.com/photo-1520975958225-9e9b08e0a3f0?auto=format&fit=crop&w=1600&q=80",
    beauty:
      "https://images.unsplash.com/photo-1520975958225-9e9b08e0a3f0?auto=format&fit=crop&w=2200&q=80",
    meta: {
      tris: "18k",
      tex: "1×2K (stylized)",
      render: "Unity / Unreal",
      delivery: ["FBX", "Atlas texture", "Shader presets"],
    },
  },
  {
    id: "w6",
    title: "Creature Bust · Material Study",
    category: "Characters",
    tags: ["ZBrush", "Micro-detail", "Roughness breakup"],
    summary: "Material study with readable breakup: roughness variation, micro details, and calm highlights.",
    thumb:
      "https://images.unsplash.com/photo-1542395975-d6d3ddf91d20?auto=format&fit=crop&w=1600&q=80",
    beauty:
      "https://images.unsplash.com/photo-1542395975-d6d3ddf91d20?auto=format&fit=crop&w=2200&q=80",
    meta: {
      tris: "55k",
      tex: "2×2K (PBR)",
      render: "Marmoset",
      delivery: ["Turntable", "Material breakdown", "Texture sets"],
    },
  },
];

const PROOF_BEFORE_AFTER = [
  {
    label: "Clay → Final Grade",
    before: {
      src: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=2200&q=80",
      alt: "Clay look placeholder",
    },
    after: {
      src: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=2200&q=80",
      alt: "Final look placeholder",
    },
  },
  {
    label: "Raw Lighting → Lookdev",
    before: {
      src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=2200&q=80",
      alt: "Raw light placeholder",
    },
    after: {
      src: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=2200&q=80",
      alt: "Lookdev placeholder",
    },
  },
];

export default function Page() {
  const reducedMotion = useReducedMotion();

  // SECTION: state
  const [category, setCategory] = useState<Category>("All");
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeWork = useMemo(() => WORKS.find((w) => w.id === activeId) ?? null, [activeId]);

  const filtered = useMemo(() => {
    if (category === "All") return WORKS;
    return WORKS.filter((w) => w.category === category);
  }, [category]);

  // Modal mode
  const [mode, setMode] = useState<Mode>("Beauty");

  // Close modal on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Reset mode on work change
  useEffect(() => {
    setMode("Beauty");
  }, [activeId]);

  return (
    <div className="min-h-screen bg-[#070A14] text-white">
      {/* BACKDROP / ATMOSPHERE */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_20%_0%,rgba(255,255,255,0.05),rgba(255,255,255,0)_55%),radial-gradient(1000px_700px_at_80%_10%,rgba(247,201,72,0.10),rgba(247,201,72,0)_58%),radial-gradient(900px_700px_at_50%_100%,rgba(255,255,255,0.03),rgba(255,255,255,0)_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22120%22%20height%3D%22120%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%222%22/%3E%3C/filter%3E%3Crect%20width%3D%22120%22%20height%3D%22120%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.7%22/%3E%3C/svg%3E')]" />
      </div>

      {/* SECTION: Top Nav (minimal) */}
      <header id="section-topnav" className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-2xl border border-white/10 bg-white/[0.03]"
              style={{ boxShadow: `0 18px 80px ${AMBER_GLOW}` }}
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide text-white/90">WODH</div>
              <div className="text-xs font-medium text-white/55">3D & Art Design</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a className="hover:text-white" href="#section-gallery">
              Gallery
            </a>
            <a className="hover:text-white" href="#section-proof">
              Proof
            </a>
            <a className="hover:text-white" href="#section-tools">
              Tools
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
                Lookdev Studio · Materials · Lighting · Final-grade renders
              </div>

              <h1 className="mt-5 text-[2.15rem] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[3.2rem]">
                Make every asset look <span style={{ color: AMBER }}>expensive</span>.
                <span className="block text-white/75">From clay to final lookdev — production-ready.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
                We craft characters, environments, and product visuals with calm highlights, clean materials, and strong
                value control. You get a delivery pack that plugs into pipelines — Unreal/Unity or offline render.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#section-gallery"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                  style={{ boxShadow: `0 22px 90px ${AMBER_GLOW}` }}
                >
                  Explore the gallery
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full transition group-hover:translate-x-0.5"
                    style={{ background: AMBER }}
                  />
                </Link>
                <Link
                  href="#section-cta"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] hover:text-white"
                >
                  Get a quote
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatChip label="Focus" value="Lookdev-first" />
                <StatChip label="Quality" value="Studio-grade" />
                <StatChip label="Output" value="Engine-ready" />
                <StatChip label="Pace" value="Fast iterations" />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <div className="absolute inset-0 opacity-70">
                  <div
                    className="absolute -right-28 -top-28 h-[420px] w-[420px] rounded-full blur-3xl"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(247,201,72,0.22), rgba(247,201,72,0.00) 62%)",
                    }}
                  />
                </div>

                <div className="relative">
                  <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-white/80">
                      Reel Strip
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-white/65">
                      hover hints
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 p-1.5">
                    {WORKS.slice(0, 6).map((w) => (
                      <button
                        key={w.id}
                        onClick={() => setActiveId(w.id)}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-left"
                      >
                        <div className="relative aspect-[4/5]">
                          <SmartImg
                            src={w.thumb}
                            alt={w.title}
                            fallbackLabel={w.title}
                            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/0" />
                          <div
                            className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                            style={{
                              background:
                                "radial-gradient(140% 100% at 50% 0%, rgba(247,201,72,0.16), rgba(247,201,72,0.00) 70%)",
                            }}
                          />
                          <div className="absolute bottom-3 left-3 right-3">
                            <div className="text-[11px] font-semibold text-white/90 line-clamp-2">{w.title}</div>
                            <div className="mt-1 text-[10px] font-medium text-white/55">{w.category}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-5">
                  <SoftHr />
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    Clean value control. Calm highlights. Materials that behave. This page is intentionally simple —
                    just enough narrative, and lots of proof.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Gallery */}
      <section id="section-gallery" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold tracking-wider text-white/55">LOOKDEV GALLERY</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                Pick a craft. <span className="text-white/70">See the standard.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                Filter by asset type. Open any piece to view beauty, wireframe, and AO-style inspection — plus delivery
                specs.
              </p>
            </div>

            <div className="w-full md:w-[520px]">
              <SegmentedControl value={category} onChange={setCategory} options={CATEGORIES} />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-9">
              {/* Masonry-ish columns */}
              <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
                {filtered.map((w, idx) => (
                  <motion.button
                    key={w.id}
                    onClick={() => setActiveId(w.id)}
                    className="group mb-4 w-full break-inside-avoid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-left"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: Math.min(idx * 0.03, 0.18) }}
                  >
                    <div className="relative">
                      <div className="relative aspect-[16/11]">
                        <SmartImg
                          src={w.thumb}
                          alt={w.title}
                          fallbackLabel={w.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                        <div
                          className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(120% 120% at 50% 0%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 70%)",
                          }}
                        />
                      </div>

                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] font-semibold text-white/80">
                          {w.category}
                        </span>
                        <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[11px] font-semibold text-white/65">
                          Open
                        </span>
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-sm font-semibold text-white/95">{w.title}</div>
                            <p className="mt-1 text-xs leading-relaxed text-white/60 line-clamp-2">{w.summary}</p>
                          </div>
                          <div
                            className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ background: AMBER, boxShadow: `0 0 0 8px ${AMBER_SOFT}` }}
                          />
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {w.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-white/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-3">
              <div className="sticky top-6 space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-semibold tracking-wider text-white/55">QUALITY SIGNALS</div>
                  <div className="mt-3 space-y-3">
                    {[
                      ["Highlights", "Calm specular + clean roll-off"],
                      ["Materials", "PBR discipline + breakup"],
                      ["Lighting", "Value control + readable forms"],
                      ["Delivery", "Engine-ready packs"],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                        <div className="text-xs font-semibold text-white/85">{k}</div>
                        <div className="mt-1 text-xs leading-relaxed text-white/60">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="text-xs font-semibold tracking-wider text-white/55">DELIVERABLES</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    <li className="flex gap-2">
                      <span style={{ color: AMBER }}>•</span> FBX/GLB + textures (PBR)
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: AMBER }}>•</span> LODs + naming standards
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: AMBER }}>•</span> Material presets / master shaders
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: AMBER }}>•</span> Turntables / packshots on request
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SECTION: Proof */}
      <section id="section-proof" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="text-xs font-semibold tracking-wider text-white/55">PROOF MODULES</div>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  Inspect the craft. <span className="text-white/70">Not just pretty shots.</span>
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  We review lookdev with toggles and comparisons — so the final asset holds up under production lighting.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <BeforeAfter
                  label={PROOF_BEFORE_AFTER[0].label}
                  before={PROOF_BEFORE_AFTER[0].before}
                  after={PROOF_BEFORE_AFTER[0].after}
                />
              </div>
              <div className="lg:col-span-5">
                <BeforeAfter
                  label={PROOF_BEFORE_AFTER[1].label}
                  before={PROOF_BEFORE_AFTER[1].before}
                  after={PROOF_BEFORE_AFTER[1].after}
                />
              </div>
            </div>

            <div className="mt-8">
              <SoftHr />
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Wireframe / AO inspection",
                    body: "Quick checks for topology flow, silhouette stability, and shading safety.",
                  },
                  {
                    title: "Material discipline",
                    body: "Breakup in roughness + believable response in highlights under different keys.",
                  },
                  {
                    title: "Engine-ready delivery",
                    body: "Export presets, naming, LODs, and shader templates to keep integration clean.",
                  },
                ].map((c) => (
                  <div key={c.title} className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-white/90">{c.title}</div>
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ background: AMBER, boxShadow: `0 0 0 7px ${AMBER_SOFT}` }}
                      />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Tools */}
      <section id="section-tools" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold tracking-wider text-white/55">TOOLS & STANDARDS</div>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                Built on the industry stack. <span className="text-white/70">Delivered with discipline.</span>
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                We can adapt to your pipeline — and we ship assets in a clean structure with predictable naming and
                exports.
              </p>
            </div>

            <div className="flex w-full items-center justify-start gap-2 md:w-auto md:justify-end">
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/70">
                PBR
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/70">
                LODs
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-white/70">
                UDIM (if needed)
              </span>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                "Blender",
                "Maya",
                "ZBrush",
                "Substance",
                "Houdini",
                "Marmoset",
                "Unreal",
                "Unity",
                "Marvelous",
                "Keyshot",
                "Photoshop",
                "After Effects",
              ].map((tool) => (
                <div
                  key={tool}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 text-center"
                >
                  <div className="text-sm font-semibold text-white/85">{tool}</div>
                  <div className="mt-1 text-xs text-white/55">pipeline-ready</div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <SoftHr />
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="text-sm font-semibold text-white/90">Delivery pack (example)</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/70">
                    <li className="flex gap-2">
                      <span style={{ color: AMBER }}>•</span> /Meshes (FBX/GLB)
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: AMBER }}>•</span> /Textures (Albedo/Rough/Metal/Normal/AO)
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: AMBER }}>•</span> /Materials (presets + notes)
                    </li>
                    <li className="flex gap-2">
                      <span style={{ color: AMBER }}>•</span> /LODs + naming + scale
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="text-sm font-semibold text-white/90">Quality gates</div>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    We validate topology flow, silhouette stability, texel density, and shading safety under multiple
                    keys — so assets don’t “break” in production lighting.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Texel density", "Naming", "Pivots", "Normals", "Roughness breakup"].map((t) => (
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
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: CTA */}
      <section id="section-cta" className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-6 md:px-8 md:pb-20">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.03] p-7 md:p-10">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 60% 40%, rgba(247,201,72,0.18), rgba(247,201,72,0.00) 62%)",
              }}
            />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <div className="text-xs font-semibold tracking-wider text-white/55">START A LOOKDEV</div>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  Send references. <span className="text-white/70">We’ll match the standard.</span>
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                  Share moodboards, target engine, and asset list. We’ll propose a clean delivery pack and timeline — with
                  lookdev checks built in.
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
                      <div key={r.k} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
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
                      href="#section-gallery"
                      className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] hover:text-white"
                    >
                      Back to gallery
                    </a>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-white/55">
                    Tip: if you have a target reference (ArtStation/Behance/Pinterest board), send it — we’ll match lighting
                    + materials, then lock a lookdev standard before scaling production.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-8 text-center text-xs text-white/45">
            © {new Date().getFullYear()} WODH · 3D & Art Design · Lookdev Studio Variant A
          </footer>
        </div>
      </section>

      {/* MODAL: Work Inspector */}
      <AnimatePresence>
        {activeWork && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setActiveId(null)} />
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={reducedMotion ? false : { y: 18, opacity: 0, scale: 0.99 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { y: 12, opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#070A14]"
                style={{ boxShadow: `0 40px 160px rgba(0,0,0,0.60), 0 0 0 1px rgba(255,255,255,0.06) inset` }}
              >
                <div className="absolute inset-0 opacity-50">
                  <div
                    className="absolute -right-28 -top-36 h-[560px] w-[560px] rounded-full blur-3xl"
                    style={{
                      background:
                        "radial-gradient(circle at 55% 45%, rgba(247,201,72,0.20), rgba(247,201,72,0.00) 62%)",
                    }}
                  />
                </div>

                <div className="relative grid grid-cols-1 lg:grid-cols-12">
                  {/* Image */}
                  <div className="lg:col-span-8">
                    <div className="relative">
                      <div className="flex items-center justify-between gap-4 p-5">
                        <div>
                          <div className="text-xs font-semibold tracking-wider text-white/55">{activeWork.category}</div>
                          <div className="mt-1 text-lg font-semibold text-white/95">{activeWork.title}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <ModePills mode={mode} setMode={setMode} />
                          <button
                            onClick={() => setActiveId(null)}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-white/75 hover:bg-white/[0.06]"
                          >
                            Close
                          </button>
                        </div>
                      </div>

                      <div className="relative aspect-[16/10] overflow-hidden border-y border-white/10 bg-white/[0.02]">
                        <SmartImg
                          src={activeWork.beauty}
                          alt={activeWork.title}
                          fallbackLabel={activeWork.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />

                        {/* Mode overlays */}
                        {mode === "Wireframe" && (
                          <>
                            <div className="absolute inset-0 bg-black/20" />
                            <WireOverlay strength={0.62} />
                            <div
                              className="absolute inset-0"
                              style={{
                                background:
                                  "radial-gradient(120% 140% at 50% 0%, rgba(255,255,255,0.10), rgba(255,255,255,0.00) 60%)",
                                mixBlendMode: "overlay",
                              }}
                            />
                          </>
                        )}

                        {mode === "AO" && (
                          <>
                            <div className="absolute inset-0 bg-white/5" />
                            <AOOverlay strength={0.72} />
                          </>
                        )}

                        <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
                          <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-white/80">
                            {mode}
                          </span>
                          <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-white/65">
                            Inspect
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="text-sm leading-relaxed text-white/70">{activeWork.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {activeWork.tags.map((t) => (
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
                  </div>

                  {/* Specs */}
                  <div className="lg:col-span-4">
                    <div className="h-full border-t border-white/10 bg-white/[0.02] p-5 lg:border-l lg:border-t-0">
                      <div className="text-xs font-semibold tracking-wider text-white/55">DELIVERY SPECS</div>
                      <div className="mt-4 space-y-3">
                        {[
                          ["Triangles", activeWork.meta.tris],
                          ["Textures", activeWork.meta.tex],
                          ["Render", activeWork.meta.render],
                        ].map(([k, v]) => (
                          <div
                            key={k}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                          >
                            <div className="text-xs font-semibold text-white/60">{k}</div>
                            <div className="text-xs font-semibold text-white/85">{v}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5">
                        <div className="text-xs font-semibold tracking-wider text-white/55">INCLUDED</div>
                        <ul className="mt-3 space-y-2 text-sm text-white/70">
                          {activeWork.meta.delivery.map((d) => (
                            <li key={d} className="flex gap-2">
                              <span style={{ color: AMBER }}>•</span> {d}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 rounded-3xl border border-white/10 bg-black/30 p-4">
                        <div className="text-sm font-semibold text-white/90">Want this standard?</div>
                        <p className="mt-2 text-sm leading-relaxed text-white/65">
                          Send a reference board + target platform. We’ll lock lookdev first, then scale production.
                        </p>
                        <div className="mt-4 flex flex-col gap-2">
                          <a
                            href="#section-cta"
                            onClick={() => setActiveId(null)}
                            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white hover:bg-white/[0.10]"
                            style={{ boxShadow: `0 18px 70px ${AMBER_GLOW}` }}
                          >
                            Start a lookdev
                          </a>
                          <button
                            onClick={() => setActiveId(null)}
                            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/[0.06] hover:text-white"
                          >
                            Keep browsing
                          </button>
                        </div>
                      </div>

                      <p className="mt-4 text-xs leading-relaxed text-white/50">
                        Note: Wireframe/AO views here are “inspection-style” overlays for presentation. Replace with your
                        real beauty/wire/AO renders anytime.
                      </p>
                    </div>
                  </div>
                </div>

                {/* bottom bar */}
                <div className="relative border-t border-white/10 bg-white/[0.02] px-5 py-4">
                  <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="text-xs font-semibold text-white/55">
                      Tip: press <span className="text-white/80">ESC</span> to close
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const idx = filtered.findIndex((x) => x.id === activeWork.id);
                          const prev = filtered[(idx - 1 + filtered.length) % filtered.length];
                          setActiveId(prev?.id ?? null);
                        }}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white/75 hover:bg-white/[0.06]"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => {
                          const idx = filtered.findIndex((x) => x.id === activeWork.id);
                          const next = filtered[(idx + 1) % filtered.length];
                          setActiveId(next?.id ?? null);
                        }}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white/75 hover:bg-white/[0.06]"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
