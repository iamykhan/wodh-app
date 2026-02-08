"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* =======================================================================================
   WODH — Game Portfolio Single (Case Study)
   Variant A — Trailer-First (Cinematic)
   Project: RACER
   Role: Full game build
   Notes:
   - Replace MEDIA paths with your real images (put them in /public/portfolio/racer/*)
   - Trailer + Store links are placeholders (swap when ready)
   - Section IDs are included for fast navigation + Cursor search
======================================================================================= */

type MediaItem = {
  id: string;
  src: string; // /public path
  alt: string;
  kind?: "image" | "video";
  hint?: string;
  span?: string; // tailwind grid span string
};

type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  mediaId: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Icon({
  name,
  className,
}: {
  name:
    | "play"
    | "close"
    | "arrowRight"
    | "arrowLeft"
    | "grid"
    | "stack"
    | "timeline"
    | "proof"
    | "external"
    | "email"
    | "spark";
  className?: string;
}) {
  const c = className ?? "h-5 w-5";
  switch (name) {
    case "play":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M10 8.5v7l6-3.5-6-3.5Z"
            fill="currentColor"
            opacity="0.95"
          />
          <path
            d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </svg>
      );
    case "close":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "arrowRight":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M10 7l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "arrowLeft":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M14 7l-5 5 5 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "grid":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      );
    case "stack":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3 3 8l9 5 9-5-9-5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.8"
          />
          <path
            d="M3 12l9 5 9-5"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.6"
          />
          <path
            d="M3 16l9 5 9-5"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.45"
          />
        </svg>
      );
    case "timeline":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 7h10M7 12h7M7 17h10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M5 7a1 1 0 1 0 0.001 0ZM5 12a1 1 0 1 0 0.001 0ZM5 17a1 1 0 1 0 0.001 0Z"
            fill="currentColor"
            opacity="0.7"
          />
        </svg>
      );
    case "proof":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 12.5 11 14.5 15 10.5"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </svg>
      );
    case "external":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M14 5h5v5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 14 19 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      );
    case "email":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 8.5 12 13.5 20 8.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          <path
            d="M6 6h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </svg>
      );
    case "spark":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2l1.2 4.3L17.5 8l-4.3 1.2L12 13.5l-1.2-4.3L6.5 8l4.3-1.7L12 2Z"
            fill="currentColor"
            opacity="0.85"
          />
          <path
            d="M5 14l.8 2.7L9 18l-3.2.9L5 22l-.8-3.1L1 18l3.2-1.3L5 14Z"
            fill="currentColor"
            opacity="0.55"
          />
        </svg>
      );
    default:
      return null;
  }
}

function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "violet" | "green";
}) {
  const toneClass =
    tone === "violet"
      ? "border-violet-400/25 bg-violet-500/10 text-violet-200"
      : tone === "green"
        ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200"
        : "border-white/10 bg-white/5 text-white/80";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[12px] tracking-wide backdrop-blur",
        toneClass
      )}
    >
      {children}
    </span>
  );
}

function Button({
  children,
  href,
  onClick,
  variant = "primary",
  disabled,
  className,
  iconLeft,
  iconRight,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80";
  const styles =
    variant === "primary"
      ? "border border-emerald-300/25 bg-emerald-400/15 text-white shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_12px_40px_rgba(16,185,129,0.15)] hover:bg-emerald-400/20"
      : variant === "secondary"
        ? "border border-violet-300/25 bg-violet-500/12 text-white shadow-[0_0_0_1px_rgba(139,92,246,0.12),0_12px_40px_rgba(139,92,246,0.15)] hover:bg-violet-500/18"
        : "border border-white/10 bg-white/5 text-white/85 hover:bg-white/7";
  const dis = disabled ? "pointer-events-none opacity-50" : "";

  const inner = (
    <span className={cn(base, styles, dis, className)}>
      {iconLeft}
      {children}
      {iconRight}
    </span>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className="inline-flex">
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="inline-flex">
      {inner}
    </button>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  icon,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="max-w-2xl">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Chip>{eyebrow}</Chip>
          <Chip>RACER</Chip>
        </div>
        <h2 className="text-balance text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
          <span className="bg-[linear-gradient(90deg,rgba(255,255,255,0.98),rgba(195,176,255,0.95),rgba(166,255,220,0.9))] bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
          {subtitle}
        </p>
      </div>
      {icon ? (
        <div className="hidden rounded-2xl border border-white/10 bg-white/5 p-3 text-white/80 backdrop-blur sm:block">
          {icon}
        </div>
      ) : null}
    </div>
  );
}

function Modal({
  open,
  onClose,
  children,
  ariaLabel,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  const reduceMotion = useReducedMotion();
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/12 bg-[#080812]/70 shadow-[0_30px_120px_rgba(0,0,0,0.6)] backdrop-blur"
            initial={{ y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: reduceMotion ? 0 : 8, scale: reduceMotion ? 1 : 0.99, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-10 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
            >
              <Icon name="close" className="h-4 w-4" />
              Close
            </button>
            <div className="p-4 sm:p-6">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function useActiveSection(ids: string[], rootMargin = "-40% 0px -55% 0px") {
  const [active, setActive] = useState<string>(ids[0] ?? "hero");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { root: null, threshold: [0.08, 0.12, 0.18, 0.25], rootMargin }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, rootMargin]);

  return active;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function UcasestudysingleLegacy() {
  const reduceMotion = useReducedMotion();

  // Replace these with your real /public paths
  const MEDIA: MediaItem[] = useMemo(
    () => [
      {
        id: "heroPoster",
        src: "/portfolio/racer/hero-poster.png",
        alt: "RACER — cinematic hero poster",
        hint: "Hero Poster",
      },
      {
        id: "titleCard",
        src: "/portfolio/racer/title-card.png",
        alt: "RACER title card",
        hint: "Title Card",
      },
      {
        id: "cover",
        src: "/portfolio/racer/cover.png",
        alt: "RACER — cover shot",
        hint: "Cover",
      },
      {
        id: "garage",
        src: "/portfolio/racer/garage.png",
        alt: "RACER — garage / car detail",
        hint: "Garage / Detail",
      },
      {
        id: "hudA",
        src: "/portfolio/racer/hud-1.png",
        alt: "RACER — gameplay HUD (rear view)",
        hint: "HUD / Telemetry",
      },
      {
        id: "hudB",
        src: "/portfolio/racer/hud-2.png",
        alt: "RACER — gameplay HUD (curve)",
        hint: "HUD / Race",
      },
      {
        id: "hudC",
        src: "/portfolio/racer/hud-3.png",
        alt: "RACER — cockpit / camera",
        hint: "Camera Modes",
      },
      {
        id: "beauty",
        src: "/portfolio/racer/beauty.png",
        alt: "RACER — beauty shot",
        hint: "Cinematic Shot",
      },
    ],
    []
  );

  // Tetris grid spans (desktop) — tweak freely
  const GALLERY: MediaItem[] = useMemo(
    () => [
      { ...MEDIA.find((m) => m.id === "cover")!, span: "col-span-12 lg:col-span-7 lg:row-span-2" },
      { ...MEDIA.find((m) => m.id === "garage")!, span: "col-span-12 lg:col-span-5 lg:row-span-1" },
      { ...MEDIA.find((m) => m.id === "hudA")!, span: "col-span-12 lg:col-span-5 lg:row-span-1" },
      { ...MEDIA.find((m) => m.id === "hudB")!, span: "col-span-12 lg:col-span-6 lg:row-span-1" },
      { ...MEDIA.find((m) => m.id === "hudC")!, span: "col-span-12 lg:col-span-6 lg:row-span-1" },
      { ...MEDIA.find((m) => m.id === "beauty")!, span: "col-span-12 lg:col-span-12 lg:row-span-1" },
    ],
    [MEDIA]
  );

  const CHAPTERS: Chapter[] = useMemo(
    () => [
      {
        id: "chapter1",
        title: "Track Presence",
        subtitle: "Wide shots that sell speed, scale, and realism.",
        mediaId: "cover",
      },
      {
        id: "chapter2",
        title: "Garage Detail",
        subtitle: "Material fidelity, decals, and race-ready silhouette.",
        mediaId: "garage",
      },
      {
        id: "chapter3",
        title: "Race Telemetry",
        subtitle: "Clean HUD + camera controls built for readable racing.",
        mediaId: "hudA",
      },
    ],
    []
  );

  const sections = useMemo(
    () => ["hero", "outcomes", "chapters", "gallery", "systems", "timeline", "stack", "cta"],
    []
  );
  const active = useActiveSection(sections);

  const [videoOpen, setVideoOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lbItem = GALLERY[lightboxIndex];

  const stats = useMemo(
    () => [
      { k: "Role", v: "Full game build" },
      { k: "Engine", v: "Unity 3D" },
      { k: "Language", v: "C#" },
      { k: "Architecture", v: "MVC" },
      { k: "Multiplayer", v: "Photon PUN 2" },
      { k: "Backend", v: "Azure + AWS" },
      { k: "Platforms", v: "App Store • Google Play • Steam" },
    ],
    []
  );

  const outcomes = useMemo(
    () => [
      { tone: "green" as const, label: "60 FPS target (HUD telemetry-ready)" },
      { tone: "violet" as const, label: "Multiplayer foundation (Photon PUN 2)" },
      { tone: "neutral" as const, label: "Multi-camera + rear view support" },
      { tone: "green" as const, label: "Readable race HUD & telemetry" },
      { tone: "violet" as const, label: "Cross-platform release path (Mobile + Steam)" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#05050a] text-white">
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_70%_10%,rgba(139,92,246,0.20),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_15%_20%,rgba(16,185,129,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_60%_90%,rgba(99,102,241,0.16),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black" />
      </div>

      {/* Sticky mini-nav */}
      <div className="sticky top-0 z-40 border-b border-white/8 bg-black/35 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/8"
            >
              <Icon name="arrowLeft" className="h-4 w-4" />
              Back to Portfolio
            </Link>
            <div className="hidden items-center gap-2 sm:flex">
              <Chip>Games Case Study</Chip>
              <Chip>RACER</Chip>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {sections.map((id) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToId(id)}
                  className={cn(
                    "rounded-xl px-3 py-2 text-xs tracking-wide transition",
                    isActive
                      ? "border border-emerald-300/25 bg-emerald-400/10 text-white"
                      : "text-white/65 hover:bg-white/6 hover:text-white"
                  )}
                >
                  {id === "hero"
                    ? "Overview"
                    : id === "outcomes"
                      ? "Outcomes"
                      : id === "chapters"
                        ? "Chapters"
                        : id === "gallery"
                          ? "Gallery"
                          : id === "systems"
                            ? "Systems"
                            : id === "timeline"
                              ? "Timeline"
                              : id === "stack"
                                ? "Stack"
                                : "CTA"}
                </button>
              );
            })}
          </nav>

          {/* tiny progress */}
          <div className="hidden w-[220px] items-center gap-2 md:flex">
            <span className="text-[11px] text-white/55">Progress</span>
            <div className="relative h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-400/60 via-violet-400/50 to-white/30"
                initial={{ width: "0%" }}
                animate={{
                  width:
                    active === "hero"
                      ? "10%"
                      : active === "outcomes"
                        ? "20%"
                        : active === "chapters"
                          ? "35%"
                          : active === "gallery"
                            ? "55%"
                            : active === "systems"
                              ? "70%"
                              : active === "timeline"
                                ? "82%"
                                : active === "stack"
                                  ? "92%"
                                  : "100%",
                }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section id="hero" data-section="hero" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid items-start gap-8 lg:grid-cols-12">
            {/* Left */}
            <div className="lg:col-span-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Chip>
                  <span className="inline-flex items-center gap-1">
                    <Icon name="spark" className="h-4 w-4" />
                    Trailer-First Case Study
                  </span>
                </Chip>
                <Chip>Realistic Racing Simulator</Chip>
              </div>

              <h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                <span className="bg-[linear-gradient(90deg,rgba(255,255,255,0.98),rgba(195,176,255,0.95),rgba(166,255,220,0.9))] bg-clip-text text-transparent">
                  RACER
                </span>
              </h1>

              <p className="mt-4 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
                A cinematic, telemetry-driven racing experience — built end-to-end in Unity with
                multiplayer foundations and a clean, readable HUD.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  onClick={() => setVideoOpen(true)}
                  iconLeft={<Icon name="play" />}
                >
                  Watch Trailer (Placeholder)
                </Button>
                <Button
                  variant="secondary"
                  href="#gallery"
                  iconLeft={<Icon name="grid" />}
                >
                  Explore Gallery
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Button
                  variant="ghost"
                  disabled
                  href="#"
                  iconLeft={<Icon name="external" />}
                >
                  App Store (Placeholder)
                </Button>
                <Button
                  variant="ghost"
                  disabled
                  href="#"
                  iconLeft={<Icon name="external" />}
                >
                  Google Play (Placeholder)
                </Button>
                <Button
                  variant="ghost"
                  disabled
                  href="#"
                  iconLeft={<Icon name="external" />}
                >
                  Steam (Placeholder)
                </Button>
              </div>
            </div>

            {/* Right: Trailer Stage */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_25px_90px_rgba(0,0,0,0.55)]">
                {/* Poster background */}
                <div
                  className="absolute inset-0 opacity-[0.92]"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.65)), url('${MEDIA.find(
                      (m) => m.id === "heroPoster"
                    )?.src}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Glass edge glow */}
                <div className="absolute -inset-1 rounded-[28px] bg-[radial-gradient(800px_260px_at_20%_20%,rgba(16,185,129,0.30),transparent_60%)]" />
                <div className="absolute -inset-1 rounded-[28px] bg-[radial-gradient(900px_320px_at_80%_10%,rgba(139,92,246,0.26),transparent_60%)]" />

                <div className="relative p-4 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Chip>Trailer Stage</Chip>
                      <Chip>Gameplay • Garage • HUD</Chip>
                    </div>
                    <div className="hidden items-center gap-2 sm:flex">
                      <span className="text-xs text-white/55">Press</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/75">
                        Space
                      </span>
                      <span className="text-xs text-white/55">to play</span>
                    </div>
                  </div>

                  {/* Fake player */}
                  <button
                    onClick={() => setVideoOpen(true)}
                    className="group relative mt-4 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
                    aria-label="Open trailer modal"
                  >
                    <div className="aspect-[16/9] w-full" />
                    <div className="absolute inset-0 bg-[radial-gradient(650px_380px_at_55%_45%,rgba(255,255,255,0.12),transparent_60%)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 backdrop-blur transition group-hover:bg-white/8">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-400/15 shadow-[0_0_0_1px_rgba(16,185,129,0.12),0_18px_70px_rgba(16,185,129,0.18)]">
                          <Icon name="play" className="h-6 w-6" />
                        </span>
                        <div>
                          <div className="text-sm font-medium text-white">Play Trailer</div>
                          <div className="text-xs text-white/60">
                            Placeholder video • replace with real link later
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Facts */}
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {stats.map((s) => (
                      <div
                        key={s.k}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                      >
                        <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                          {s.k}
                        </div>
                        <div className="mt-1 text-sm text-white/85">{s.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Micro note */}
                  <div className="mt-4 text-xs text-white/55">
                    Tip: Put your real screenshots in{" "}
                    <span className="text-white/75">/public/portfolio/racer/</span> and replace{" "}
                    <span className="text-white/75">MEDIA</span> paths.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Modal */}
        <Modal open={videoOpen} onClose={() => setVideoOpen(false)} ariaLabel="Trailer modal">
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                <div className="aspect-[16/9] w-full" />
                <div className="p-4">
                  <div className="text-sm font-medium text-white">Trailer Placeholder</div>
                  <p className="mt-1 text-sm text-white/65">
                    Replace this block with your real trailer embed (YouTube/Vimeo) or an MP4 player.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-white/85">
                  <Icon name="proof" />
                  <span className="text-sm font-medium">What this trailer should show</span>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>• Opening track shot → speed + atmosphere</li>
                  <li>• Garage closeups → materials + decals</li>
                  <li>• HUD readability → telemetry + camera mode</li>
                  <li>• Multiplayer moment → race pack / overtakes</li>
                </ul>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-3 text-xs text-white/60">
                  Want: 30–45 seconds, fast cuts, minimal text.
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </section>

      {/* OUTCOMES */}
      <section id="outcomes" data-section="outcomes" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Proof Strip"
            title="Outcomes that feel real"
            subtitle="A quick, honest snapshot of what RACER delivers — framed as engineering proof, not marketing fluff."
            icon={<Icon name="proof" />}
          />

          <div className="grid gap-3 md:grid-cols-2">
            {outcomes.map((o, idx) => (
              <div
                key={idx}
                className={cn(
                  "rounded-2xl border bg-white/5 px-4 py-4 backdrop-blur",
                  o.tone === "green"
                    ? "border-emerald-300/18"
                    : o.tone === "violet"
                      ? "border-violet-300/18"
                      : "border-white/10"
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl border",
                      o.tone === "green"
                        ? "border-emerald-300/20 bg-emerald-400/12 text-emerald-200"
                        : o.tone === "violet"
                          ? "border-violet-300/20 bg-violet-500/12 text-violet-200"
                          : "border-white/10 bg-white/5 text-white/70"
                    )}
                  >
                    <Icon name="spark" className="h-5 w-5" />
                  </span>
                  <div className="text-sm leading-relaxed text-white/80">{o.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      <section id="chapters" data-section="chapters" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Trailer Chapters"
            title="Three moments that sell the sim"
            subtitle="Structured like a reel: one cinematic track moment, one detail moment, and one HUD moment."
            icon={<Icon name="spark" />}
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {CHAPTERS.map((ch) => {
              const m = MEDIA.find((x) => x.id === ch.mediaId);
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    const index = Math.max(0, GALLERY.findIndex((g) => g.id === ch.mediaId));
                    openLightbox(index);
                  }}
                  className="group text-left"
                >
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_18px_70px_rgba(0,0,0,0.45)] backdrop-blur transition hover:-translate-y-0.5 hover:border-white/14">
                    <div
                      className="h-44 w-full bg-black/25 sm:h-52"
                      style={{
                        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.05)), url('${m?.src}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(520px_220px_at_30%_15%,rgba(139,92,246,0.20),transparent_60%)] opacity-0 transition group-hover:opacity-100" />
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-base font-medium text-white">{ch.title}</div>
                        <span className="inline-flex items-center gap-1 text-xs text-white/55">
                          Open
                          <Icon name="arrowRight" className="h-4 w-4" />
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">{ch.subtitle}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Chip>Cinematic</Chip>
                        <Chip>Readable</Chip>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" data-section="gallery" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Tetris Gallery"
            title="Cinematic frames & gameplay clarity"
            subtitle="A signature Wodh grid: hover for captions, click for a full-screen lightbox."
            icon={<Icon name="grid" />}
          />

          <div className="grid grid-cols-12 gap-4">
            {GALLERY.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => openLightbox(idx)}
                className={cn("group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/14", m.span)}
              >
                <div
                  className="h-full min-h-[180px] w-full bg-black/25 lg:min-h-[220px]"
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.70), rgba(0,0,0,0.08)), url('${m.src}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(700px_340px_at_25%_15%,rgba(16,185,129,0.22),transparent_60%)] opacity-0 transition group-hover:opacity-100" />
                <div className="absolute inset-0 bg-[radial-gradient(700px_340px_at_75%_15%,rgba(139,92,246,0.20),transparent_60%)] opacity-0 transition group-hover:opacity-100" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-white">{m.hint ?? "Frame"}</div>
                      <div className="mt-1 text-xs text-white/60">
                        Click to open • swipe/arrow through
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70 opacity-0 transition group-hover:opacity-100">
                      View <Icon name="arrowRight" className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70 backdrop-blur">
            <span className="text-white/85">Replace images:</span> Put your real files under{" "}
            <span className="text-white/85">/public/portfolio/racer/</span> and update the{" "}
            <span className="text-white/85">MEDIA</span> array.
          </div>
        </div>

        {/* Lightbox */}
        <Modal
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          ariaLabel="Gallery lightbox"
        >
          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/35">
                <div
                  className="aspect-[16/9] w-full"
                  style={{
                    backgroundImage: `url('${lbItem?.src ?? ""}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-sm font-medium text-white">{lbItem?.hint ?? "Frame"}</div>
                  <div className="mt-1 text-xs text-white/60">{lbItem?.alt ?? ""}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setLightboxIndex((p) => (p - 1 + GALLERY.length) % GALLERY.length)}
                  iconLeft={<Icon name="arrowLeft" />}
                >
                  Prev
                </Button>
                <div className="text-xs text-white/55">
                  {lightboxIndex + 1} / {GALLERY.length}
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setLightboxIndex((p) => (p + 1) % GALLERY.length)}
                  iconRight={<Icon name="arrowRight" />}
                >
                  Next
                </Button>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-white/85">
                  <Icon name="grid" />
                  <span className="text-sm font-medium">Caption System</span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Keep captions short, HUD-like, and technical. This page reads like a mini
                  documentary.
                </p>
                <div className="mt-4 space-y-2 text-sm text-white/70">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                      Example
                    </div>
                    <div className="mt-1 text-sm text-white/80">
                      “Rear-view camera + telemetry overlay.”
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip>Cinematic</Chip>
                  <Chip>Readable</Chip>
                  <Chip>Realistic</Chip>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </section>

      {/* SYSTEMS */}
      <section id="systems" data-section="systems" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Systems Breakdown"
            title="What we built under the hood"
            subtitle="Expandable modules that prove engineering maturity without bloating the page. Replace copy with your specific implementation details when ready."
            icon={<Icon name="stack" />}
          />

          <div className="grid gap-4 lg:grid-cols-2">
            {[
              {
                title: "Multiplayer Foundation (Photon PUN 2)",
                points: [
                  "Room creation, matchmaking flow, and session stability patterns.",
                  "Sync-critical gameplay state: position, velocity, lap state, and race events.",
                  "Latency-aware UX: clear feedback, minimal surprises, readable HUD states.",
                ],
                accent: "violet",
              },
              {
                title: "Vehicle Handling & Feel",
                points: [
                  "Tunable parameters for grip, drift bias, braking, and acceleration curves.",
                  "Camera + FOV tuning for speed perception without losing readability.",
                  "Physics/visual polish pass to keep the sim grounded and cinematic.",
                ],
                accent: "green",
              },
              {
                title: "HUD & Telemetry Layer",
                points: [
                  "Readable race data: position, laps, speed, and scenario cues.",
                  "Camera controls: rear view, mirror toggle, pause controls.",
                  "HUD states designed for glanceability at speed.",
                ],
                accent: "green",
              },
              {
                title: "Backend Services (Azure + AWS)",
                points: [
                  "Service separation for scalable features (auth, telemetry, events).",
                  "Future-proofing for LiveOps: seasonal events, challenges, updates.",
                  "Safe integration approach with clear monitoring points.",
                ],
                accent: "violet",
              },
              {
                title: "Architecture (MVC in Unity)",
                points: [
                  "Separation of concerns: UI, game state, services, and presentation.",
                  "Modular UI components for HUD, menus, and overlays.",
                  "Maintainable patterns for feature additions and iteration speed.",
                ],
                accent: "neutral",
              },
              {
                title: "Performance Targeting",
                points: [
                  "60 FPS target mindset (as shown in HUD frames).",
                  "Optimizing scene complexity while preserving cinematic look.",
                  "Clean input + camera loop for responsive racing feel.",
                ],
                accent: "neutral",
              },
            ].map((card) => (
              <details
                key={card.title}
                className={cn(
                  "group overflow-hidden rounded-3xl border bg-white/5 backdrop-blur",
                  card.accent === "green"
                    ? "border-emerald-300/18"
                    : card.accent === "violet"
                      ? "border-violet-300/18"
                      : "border-white/10"
                )}
              >
                <summary className="cursor-pointer list-none px-5 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-base font-medium text-white">{card.title}</div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70 transition group-open:bg-white/8">
                      Expand <Icon name="arrowRight" className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-white/60">
                    Click to reveal implementation notes (placeholder copy).
                  </div>
                </summary>
                <div className="border-t border-white/10 px-5 pb-5 pt-4">
                  <ul className="space-y-2 text-sm leading-relaxed text-white/70">
                    {card.points.map((p, i) => (
                      <li key={i}>• {p}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" data-section="timeline" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Production Timeline"
            title="A connected track from prototype → release"
            subtitle="A true connected pipeline strip. Keep it tight and visual, like a race track map."
            icon={<Icon name="timeline" />}
          />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            {/* track line */}
            <div className="absolute left-6 right-6 top-1/2 hidden h-[2px] -translate-y-1/2 bg-gradient-to-r from-emerald-400/35 via-violet-400/30 to-white/20 md:block" />
            <div className="grid gap-4 md:grid-cols-5">
              {[
                { t: "Pre encourage", s: "Scope + sim feel target" },
                { t: "Prototype", s: "Core driving + HUD loop" },
                { t: "Multiplayer", s: "Photon rooms + race events" },
                { t: "Content Pass", s: "Tracks, cars, polish" },
                { t: "Release", s: "Mobile + Steam path" },
              ].map((n, i) => (
                <div key={i} className="relative">
                  <div className="flex items-center gap-3 md:flex-col md:items-start">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-white/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-white">{n.t}</div>
                      <div className="mt-1 text-sm text-white/65">{n.s}</div>
                    </div>
                  </div>
                  {/* node glow */}
                  <div className="pointer-events-none absolute -left-6 top-1/2 hidden h-28 w-28 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),transparent_60%)] md:block" />
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/65">
              Swap timeline labels with your real milestones (dates optional). Keep each stage:{" "}
              <span className="text-white/80">deliverable-driven</span>.
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" data-section="stack" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Tech Stack"
            title="Built for scale, iteration, and clarity"
            subtitle="A credibility block that’s clean, compact, and instantly scannable."
            icon={<Icon name="stack" />}
          />

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="mb-3 text-sm font-medium text-white">Core Technologies</div>
                <div className="flex flex-wrap gap-2">
                  <Chip>Unity 3D</Chip>
                  <Chip>C#</Chip>
                  <Chip>Photon PUN 2</Chip>
                  <Chip>MVC Architecture</Chip>
                  <Chip>Azure Server</Chip>
                  <Chip>AWS Server</Chip>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                      Platforms
                    </div>
                    <div className="mt-1 text-sm text-white/80">
                      App Store • Google Play • Steam
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                      Role
                    </div>
                    <div className="mt-1 text-sm text-white/80">Full game build</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="mb-2 flex items-center gap-2 text-white/85">
                  <Icon name="proof" />
                  <div className="text-sm font-medium">Engineering proof points</div>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>• Stable HUD readability at speed</li>
                  <li>• Multiplayer-ready architecture</li>
                  <li>• Modular codebase for iteration</li>
                  <li>• Cross-platform delivery path</li>
                </ul>
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-xs text-white/60">
                  Add real metrics later (build size, load time, crash-free %, etc.) when you want.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" data-section="cta" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-[0_25px_90px_rgba(0,0,0,0.55)] backdrop-blur sm:p-10">
            <div className="absolute -inset-1 rounded-[30px] bg-[radial-gradient(900px_400px_at_20%_20%,rgba(16,185,129,0.28),transparent_60%)]" />
            <div className="absolute -inset-1 rounded-[30px] bg-[radial-gradient(900px_420px_at_80%_10%,rgba(139,92,246,0.26),transparent_60%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/35" />

            <div className="relative grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Chip>One team. Two studios.</Chip>
                  <Chip>Games • Racing • Multiplayer</Chip>
                </div>
                <h3 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  Want a racing simulator built with this level of polish?
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
                  We can take your concept from prototype → multiplayer-ready build → release path,
                  with cinematic presentation and clean systems underneath.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button variant="primary" href="/contact" iconRight={<Icon name="arrowRight" />}>
                    Start a Project
                  </Button>
                  <Button
                    variant="ghost"
                    href="mailto:hello@wodh.io"
                    iconLeft={<Icon name="email" />}
                  >
                    hello@wodh.io
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/55">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Production-friendly
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Real-time performance mindset
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    Multiplayer-ready
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                  <div className="text-sm font-medium text-white">Next steps</div>
                  <ol className="mt-3 space-y-2 text-sm text-white/70">
                    <li>1) Share your target platform + scope</li>
                    <li>2) We outline systems & milestones</li>
                    <li>3) Prototype → vertical slice → build</li>
                  </ol>
                  <div className="mt-4 flex gap-2">
                    <Button variant="secondary" href="/portfolio" iconLeft={<Icon name="grid" />}>
                      More Work
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => scrollToId("hero")}
                      iconLeft={<Icon name="arrowLeft" />}
                    >
                      Back to top
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer nav (optional) */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/55">
            <span>© Wodh • Case Study: RACER</span>
            <span className="inline-flex items-center gap-2">
              <Icon name="external" className="h-4 w-4" />
              Replace store links when ready
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

