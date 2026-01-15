"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* =======================================================================================
   WODH — Game Portfolio Single (Case Study)
   Variant B — Systems-First (Engineering Credibility)
   Project: RACER
   Role: Full game build

   Notes:
   - Uses ONLINE images via source.unsplash.com for display (no asset setup required).
   - Uses <img> (not next/image) to avoid domain config.
   - Section IDs included for fast navigation + Cursor search.
======================================================================================= */

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
    | "spark"
    | "chip"
    | "cpu"
    | "net"
    | "db"
    | "ui"
    | "shield"
    | "graph";
  className?: string;
}) {
  const c = className ?? "h-5 w-5";
  switch (name) {
    case "play":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" opacity="0.95" />
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
          <path d="M12 3 3 8l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
          <path d="M3 12l9 5 9-5" stroke="currentColor" strokeWidth="1.6" opacity="0.6" />
          <path d="M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.6" opacity="0.45" />
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
          <path d="M14 5h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 14 19 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

    case "cpu":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 9h6v6H9V9Z"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.9"
          />
          <path
            d="M7 4v2M11 4v2M13 4v2M17 4v2M7 18v2M11 18v2M13 18v2M17 18v2M4 7h2M4 11h2M4 13h2M4 17h2M18 7h2M18 11h2M18 13h2M18 17h2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M7 7h10v10H7V7Z"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.6"
          />
        </svg>
      );
    case "net":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.7"
          />
          <path
            d="M4 12h16M12 4c2.8 2.9 2.8 13.1 0 16M12 4c-2.8 2.9-2.8 13.1 0 16"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.8"
          />
        </svg>
      );
    case "db":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 7c0-1.7 2.7-3 6-3s6 1.3 6 3-2.7 3-6 3-6-1.3-6-3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.75"
          />
          <path
            d="M6 7v10c0 1.7 2.7 3 6 3s6-1.3 6-3V7"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <path
            d="M6 12c0 1.7 2.7 3 6 3s6-1.3 6-3"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.55"
          />
        </svg>
      );
    case "ui":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 6h14v12H5V6Z"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.75"
          />
          <path
            d="M5 9h14"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.55"
          />
          <path
            d="M8 12h4M8 15h8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      );
    case "shield":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3 20 7v6c0 5-3.6 8.4-8 9-4.4-.6-8-4-8-9V7l8-4Z"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.75"
          />
          <path
            d="M9 12.3 10.8 14 15 9.8"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </svg>
      );
    case "graph":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 19V5"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <path
            d="M5 19h14"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <path
            d="M7 15l3-3 3 2 5-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
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
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[12px] tracking-wide backdrop-blur", toneClass)}>
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

  const inner = <span className={cn(base, styles, dis, className)}>{iconLeft}{children}{iconRight}</span>;

  if (href && !disabled) {
    const isExternal = href.startsWith("http");
    return isExternal ? (
      <a href={href} target="_blank" rel="noreferrer" className="inline-flex">
        {inner}
      </a>
    ) : (
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
          <Chip tone="violet">{eyebrow}</Chip>
          <Chip>RACER</Chip>
        </div>
        <h2 className="text-balance text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
          <span className="bg-[linear-gradient(90deg,rgba(255,255,255,0.98),rgba(195,176,255,0.95),rgba(166,255,220,0.9))] bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-white/70 sm:text-base">{subtitle}</p>
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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
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

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function RacerCaseStudy_SystemsFirst() {
  const reduceMotion = useReducedMotion();

  // Online images for display (stable enough for placeholders; replace later with your assets)
  const IMG = useMemo(
    () => ({
      hero: "https://source.unsplash.com/1600x900/?racecar,track,cinematic",
      systemA: "https://source.unsplash.com/1200x900/?server,datacenter,lights",
      systemB: "https://source.unsplash.com/1200x900/?network,technology,connections",
      systemC: "https://source.unsplash.com/1200x900/?code,programming,terminal",
      systemD: "https://source.unsplash.com/1200x900/?ui,dashboard,interface",
      gallery1: "https://source.unsplash.com/1400x900/?racing,simulator,car",
      gallery2: "https://source.unsplash.com/1400x900/?sports-car,garage,detail",
      gallery3: "https://source.unsplash.com/1400x900/?speed,motion,road",
      gallery4: "https://source.unsplash.com/1400x900/?engine,mechanical,closeup",
    }),
    []
  );

  const [open, setOpen] = useState<null | "arch" | "mp" | "hud" | "backend" | "perf">(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string; title: string; note: string }>(() => ({
    open: false,
    src: "",
    title: "",
    note: "",
  }));

  const nav = useMemo(
    () => [
      { id: "hero", label: "Overview" },
      { id: "systemsMap", label: "Systems" },
      { id: "architecture", label: "Architecture" },
      { id: "multiplayer", label: "Multiplayer" },
      { id: "telemetry", label: "Telemetry" },
      { id: "backend", label: "Backend" },
      { id: "performance", label: "Performance" },
      { id: "stack", label: "Stack" },
      { id: "gallery", label: "Evidence" },
      { id: "cta", label: "CTA" },
    ],
    []
  );

  const metrics = useMemo(
    () => [
      { k: "Frame Target", v: "60 FPS (target)", tone: "green" as const, icon: <Icon name="cpu" /> },
      { k: "Multiplayer", v: "Photon PUN 2", tone: "violet" as const, icon: <Icon name="net" /> },
      { k: "Architecture", v: "MVC in Unity", tone: "neutral" as const, icon: <Icon name="stack" /> },
      { k: "Backend", v: "Azure + AWS", tone: "violet" as const, icon: <Icon name="db" /> },
      { k: "Role", v: "Full game build", tone: "neutral" as const, icon: <Icon name="proof" /> },
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

      {/* Sticky Nav */}
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
              <Chip tone="violet">Systems-First</Chip>
              <Chip tone="green">RACER</Chip>
            </div>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollToId(n.id)}
                className="rounded-xl px-3 py-2 text-xs tracking-wide text-white/65 transition hover:bg-white/6 hover:text-white"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Chip tone="violet">
              <span className="inline-flex items-center gap-1">
                <Icon name="spark" className="h-4 w-4" />
                Engineering Credibility
              </span>
            </Chip>
          </div>
        </div>
      </div>

      {/* HERO (Systems-first: compact hero + immediate proof) */}
      <section id="hero" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Chip tone="violet">Games Case Study</Chip>
                <Chip tone="green">Racing Simulator</Chip>
                <Chip>Full game build</Chip>
              </div>

              <h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                <span className="bg-[linear-gradient(90deg,rgba(255,255,255,0.98),rgba(195,176,255,0.95),rgba(166,255,220,0.9))] bg-clip-text text-transparent">
                  RACER
                </span>
              </h1>

              <p className="mt-4 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
                Built like a production system: clean architecture, multiplayer foundation, telemetry-first HUD, and a backend path designed for scale.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setLightbox({ open: true, src: IMG.hero, title: "Cinematic Preview (Placeholder)", note: "Replace with your trailer / gameplay capture later." })}
                  iconLeft={<Icon name="play" />}
                >
                  Watch Preview (Placeholder)
                </Button>
                <Button variant="ghost" href="#systemsMap" iconLeft={<Icon name="stack" />}>
                  Jump to Systems
                </Button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {metrics.map((m) => (
                  <div
                    key={m.k}
                    className={cn(
                      "rounded-2xl border bg-white/5 px-4 py-4 backdrop-blur",
                      m.tone === "green"
                        ? "border-emerald-300/18"
                        : m.tone === "violet"
                          ? "border-violet-300/18"
                          : "border-white/10"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-white/80">
                        {m.icon}
                      </span>
                      <div>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">{m.k}</div>
                        <div className="mt-1 text-sm text-white/85">{m.v}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_25px_90px_rgba(0,0,0,0.55)]">
                <div className="absolute -inset-1 rounded-[28px] bg-[radial-gradient(900px_360px_at_20%_20%,rgba(16,185,129,0.24),transparent_60%)]" />
                <div className="absolute -inset-1 rounded-[28px] bg-[radial-gradient(900px_380px_at_80%_10%,rgba(139,92,246,0.22),transparent_60%)]" />
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/18 to-black/10" />
                  <img
                    src={IMG.hero}
                    alt="RACER hero placeholder image"
                    className="h-[320px] w-full object-cover sm:h-[380px]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Chip tone="violet">Systems Snapshot</Chip>
                      <Chip tone="green">Telemetry-first</Chip>
                      <Chip>Multiplayer-ready</Chip>
                    </div>
                    <div className="mt-3 text-sm text-white/70">
                      This variant leads with architecture and proof — visuals support credibility, not the other way around.
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="primary" href="#architecture" iconLeft={<Icon name="stack" />}>
                        Architecture Map
                      </Button>
                      <Button variant="ghost" href="#gallery" iconLeft={<Icon name="grid" />}>
                        Evidence Gallery
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-white/80">
                    <Icon name="ui" />
                    <span className="text-sm font-medium">HUD clarity</span>
                  </div>
                  <p className="mt-2 text-sm text-white/65">Readable telemetry at speed. Minimal surprises.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-white/80">
                    <Icon name="net" />
                    <span className="text-sm font-medium">Race sessions</span>
                  </div>
                  <p className="mt-2 text-sm text-white/65">Multiplayer foundation designed for stability.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="flex items-center gap-2 text-white/80">
                    <Icon name="shield" />
                    <span className="text-sm font-medium">Production-ready</span>
                  </div>
                  <p className="mt-2 text-sm text-white/65">Scalable backend path (Azure + AWS).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEMS MAP (the “engineering-first” centerpiece) */}
      <section id="systemsMap" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Systems Map"
            title="A racing simulator is a stack, not a screen"
            subtitle="This section is the point: what we built, how it connects, and why it holds under production pressure."
            icon={<Icon name="graph" />}
          />

          <div className="grid gap-4 lg:grid-cols-12">
            {/* Systems grid */}
            <div className="lg:col-span-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setOpen("arch")}
                  className="group rounded-3xl border border-violet-300/18 bg-white/5 p-5 text-left backdrop-blur transition hover:-translate-y-0.5 hover:border-violet-300/26"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-500/12 text-violet-200">
                      <Icon name="stack" />
                    </div>
                    <span className="text-xs text-white/55 group-hover:text-white/70">Open ↗</span>
                  </div>
                  <div className="mt-3 text-base font-medium text-white">Architecture (MVC)</div>
                  <p className="mt-2 text-sm text-white/65">
                    Separation of concerns to keep features shippable: UI, game state, services, and presentation.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip tone="violet">Maintainable</Chip>
                    <Chip>Feature-ready</Chip>
                  </div>
                </button>

                <button
                  onClick={() => setOpen("mp")}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur transition hover:-translate-y-0.5 hover:border-white/14"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-white/85">
                      <Icon name="net" />
                    </div>
                    <span className="text-xs text-white/55 group-hover:text-white/70">Open ↗</span>
                  </div>
                  <div className="mt-3 text-base font-medium text-white">Multiplayer (Photon PUN 2)</div>
                  <p className="mt-2 text-sm text-white/65">
                    Rooms, sync-critical gameplay state, race events, and latency-aware UX hooks.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip tone="violet">Session stability</Chip>
                    <Chip>Race events</Chip>
                  </div>
                </button>

                <button
                  onClick={() => setOpen("hud")}
                  className="group rounded-3xl border border-emerald-300/18 bg-white/5 p-5 text-left backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300/26"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-500/12 text-emerald-200">
                      <Icon name="ui" />
                    </div>
                    <span className="text-xs text-white/55 group-hover:text-white/70">Open ↗</span>
                  </div>
                  <div className="mt-3 text-base font-medium text-white">HUD & Telemetry</div>
                  <p className="mt-2 text-sm text-white/65">
                    Glanceability at speed: position, laps, speed, scenario cues, camera controls.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip tone="green">Readable</Chip>
                    <Chip>Telemetry-first</Chip>
                  </div>
                </button>

                <button
                  onClick={() => setOpen("backend")}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur transition hover:-translate-y-0.5 hover:border-white/14"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/25 text-white/85">
                      <Icon name="db" />
                    </div>
                    <span className="text-xs text-white/55 group-hover:text-white/70">Open ↗</span>
                  </div>
                  <div className="mt-3 text-base font-medium text-white">Backend Services</div>
                  <p className="mt-2 text-sm text-white/65">
                    Azure + AWS split for scaling: auth, telemetry, events, and future LiveOps hooks.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip tone="violet">Scalable</Chip>
                    <Chip>Service-ready</Chip>
                  </div>
                </button>
              </div>
            </div>

            {/* Evidence column */}
            <div className="lg:col-span-4">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <div className="relative">
                  <img src={IMG.systemC} alt="Code placeholder" className="h-48 w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-sm font-medium text-white">Engineering posture</div>
                    <div className="mt-1 text-sm text-white/65">
                      This layout is designed for credibility: clear systems, clean connections, honest proof.
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <Chip tone="violet">Unity 3D</Chip>
                    <Chip>C#</Chip>
                    <Chip tone="violet">Photon PUN 2</Chip>
                    <Chip tone="green">60 FPS target</Chip>
                    <Chip>Mobile + Steam</Chip>
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/70">
                    Want to make this page feel “real”? Add 3–5 measurable constraints here later (build size, load time, memory budget, input latency).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modals (Systems details) */}
          <Modal open={open === "arch"} onClose={() => setOpen(null)} ariaLabel="Architecture details">
            <div className="grid gap-5 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                  <div className="flex items-center gap-2 text-white/85">
                    <Icon name="stack" />
                    <span className="text-sm font-medium">MVC in Unity — Practical split</span>
                  </div>
                  <p className="mt-2 text-sm text-white/65">
                    The goal is simple: keep the sim shippable. UI shouldn’t leak into gameplay state, networking shouldn’t pollute presentation, and backend calls shouldn’t block frames.
                  </p>

                  {/* Inline architecture diagram */}
                  <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
                    <svg viewBox="0 0 760 260" className="h-auto w-full" aria-label="Architecture diagram">
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="rgba(16,185,129,0.35)" />
                          <stop offset="55%" stopColor="rgba(139,92,246,0.28)" />
                          <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
                        </linearGradient>
                      </defs>
                      <rect x="10" y="10" width="740" height="240" rx="18" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)" />
                      <path d="M90 140H670" stroke="url(#g1)" strokeWidth="3" opacity="0.9" />
                      {/* Nodes */}
                      {[
                        { x: 95, y: 70, t: "UI (View)", s: "HUD • Menus • Overlays", c: "rgba(16,185,129,0.18)" },
                        { x: 310, y: 70, t: "Controller", s: "Input • Flow • Events", c: "rgba(139,92,246,0.16)" },
                        { x: 525, y: 70, t: "Model (State)", s: "Race • Vehicle • Rules", c: "rgba(255,255,255,0.10)" },
                        { x: 190, y: 170, t: "Net Layer", s: "Photon Sync", c: "rgba(139,92,246,0.14)" },
                        { x: 430, y: 170, t: "Services", s: "Azure/AWS", c: "rgba(16,185,129,0.14)" },
                        { x: 640, y: 170, t: "Telemetry", s: "Metrics • Logs", c: "rgba(255,255,255,0.08)" },
                      ].map((n, i) => (
                        <g key={i}>
                          <rect x={n.x - 80} y={n.y - 26} width="160" height="72" rx="14" fill={n.c} stroke="rgba(255,255,255,0.12)" />
                          <text x={n.x} y={n.y} textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize="14" fontFamily="ui-sans-serif, system-ui">
                            {n.t}
                          </text>
                          <text x={n.x} y={n.y + 20} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="12" fontFamily="ui-sans-serif, system-ui">
                            {n.s}
                          </text>
                        </g>
                      ))}
                      {/* Links */}
                      <path d="M175 106 C 230 106, 250 106, 305 106" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
                      <path d="M390 106 C 445 106, 465 106, 520 106" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
                      <path d="M310 140 C 260 150, 240 155, 210 170" stroke="rgba(139,92,246,0.30)" strokeWidth="2" />
                      <path d="M525 140 C 490 155, 470 160, 450 170" stroke="rgba(16,185,129,0.30)" strokeWidth="2" />
                      <path d="M525 140 C 575 155, 600 160, 640 170" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/70">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">Why it matters</div>
                      <div className="mt-2">Keeps features addable without regressions and prevents “spaghetti” in live production.</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/70">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">What to add later</div>
                      <div className="mt-2">Concrete modules: input manager, state machine, event bus, service adapters.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <img src={IMG.systemD} alt="UI placeholder" className="h-44 w-full object-cover" loading="lazy" />
                  <div className="p-4">
                    <div className="text-sm font-medium text-white">Design consequence</div>
                    <p className="mt-2 text-sm text-white/65">
                      A clean architecture gives UI freedom: HUD clarity improves without touching core simulation state.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Chip tone="violet">Maintainable</Chip>
                      <Chip tone="green">HUD iteration</Chip>
                      <Chip>Production-friendly</Chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <Modal open={open === "mp"} onClose={() => setOpen(null)} ariaLabel="Multiplayer details">
            <div className="grid gap-5 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                  <div className="flex items-center gap-2 text-white/85">
                    <Icon name="net" />
                    <span className="text-sm font-medium">Photon PUN 2 — Race sessions & sync</span>
                  </div>
                  <p className="mt-2 text-sm text-white/65">
                    Multiplayer credibility comes from stability: deterministic race events, clean ownership rules, and latency-aware feedback loops.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      { t: "Room Lifecycle", d: "Create → join → ready-check → start → finish → teardown" },
                      { t: "Sync-critical State", d: "Position, velocity, lap state, checkpoints, penalties, events" },
                      { t: "Ownership Rules", d: "Who simulates what; authoritative moments; event validation hooks" },
                      { t: "Latency UX", d: "Clear indicators; predictable behavior; minimal HUD surprises" },
                    ].map((x) => (
                      <div key={x.t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm font-medium text-white">{x.t}</div>
                        <div className="mt-1 text-sm text-white/65">{x.d}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/70">
                    Add your real notes later: prediction approach, interpolation, event timing, and disconnect handling.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <img src={IMG.systemB} alt="Network placeholder" className="h-44 w-full object-cover" loading="lazy" />
                  <div className="p-4">
                    <div className="text-sm font-medium text-white">Engineering proof angle</div>
                    <p className="mt-2 text-sm text-white/65">
                      Present multiplayer as a system: room lifecycle, sync set, and failure states — not just “we used Photon”.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Chip tone="violet">Session stability</Chip>
                      <Chip>Sync set</Chip>
                      <Chip>Failure handling</Chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <Modal open={open === "hud"} onClose={() => setOpen(null)} ariaLabel="Telemetry details">
            <div className="grid gap-5 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-emerald-300/18 bg-black/35 p-5">
                  <div className="flex items-center gap-2 text-white/85">
                    <Icon name="ui" />
                    <span className="text-sm font-medium">HUD & Telemetry — Glanceability at speed</span>
                  </div>
                  <p className="mt-2 text-sm text-white/65">
                    Racing HUD must read in 150ms. Telemetry is a UX system: priorities, hierarchy, and stateful clarity.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      { t: "Primary", d: "Position, lap, speed, scenario state" },
                      { t: "Controls", d: "Camera modes, rear view, mirror toggle, pause" },
                      { t: "Feedback", d: "False start, penalties, race events, nitro/funds if applicable" },
                      { t: "Typography", d: "High contrast, minimal decoration, consistent placement" },
                    ].map((x) => (
                      <div key={x.t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm font-medium text-white">{x.t}</div>
                        <div className="mt-1 text-sm text-white/65">{x.d}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-emerald-300/18 bg-emerald-500/10 p-4 text-sm text-white/70">
                    Add later: telemetry sampling rate, HUD update cadence, and camera transition rules (for motion sickness / clarity).
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <img src={IMG.systemD} alt="HUD placeholder" className="h-44 w-full object-cover" loading="lazy" />
                  <div className="p-4">
                    <div className="text-sm font-medium text-white">The credibility move</div>
                    <p className="mt-2 text-sm text-white/65">
                      Treat HUD as telemetry product design: strict hierarchy, controlled states, and clear failure messaging.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Chip tone="green">Readable</Chip>
                      <Chip>Stateful</Chip>
                      <Chip>Minimal</Chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <Modal open={open === "backend"} onClose={() => setOpen(null)} ariaLabel="Backend details">
            <div className="grid gap-5 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
                  <div className="flex items-center gap-2 text-white/85">
                    <Icon name="db" />
                    <span className="text-sm font-medium">Azure + AWS — Service-ready foundation</span>
                  </div>
                  <p className="mt-2 text-sm text-white/65">
                    Backend is presented as a path: start stable with core services, then add LiveOps and telemetry expansion without re-architecting.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      { t: "Auth & Profile", d: "Identity, profiles, entitlement-ready patterns" },
                      { t: "Telemetry", d: "Session metrics, errors, performance signals" },
                      { t: "Events", d: "Seasonal hooks, challenges, race events (future)" },
                      { t: "Observability", d: "Logging strategy & monitoring touchpoints" },
                    ].map((x) => (
                      <div key={x.t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="text-sm font-medium text-white">{x.t}</div>
                        <div className="mt-1 text-sm text-white/65">{x.d}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/70">
                    Add later: which service lives where (Azure vs AWS) and why (latency, cost, integration).
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <img src={IMG.systemA} alt="Datacenter placeholder" className="h-44 w-full object-cover" loading="lazy" />
                  <div className="p-4">
                    <div className="text-sm font-medium text-white">How this reads to clients</div>
                    <p className="mt-2 text-sm text-white/65">
                      Not “we used cloud”. It’s “we built an extensible service foundation with a clean growth path”.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Chip tone="violet">Scalable</Chip>
                      <Chip>Observable</Chip>
                      <Chip>LiveOps-ready</Chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </section>

      {/* ARCHITECTURE (standalone section for anchors + expanded narrative) */}
      <section id="architecture" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Architecture"
            title="Built to stay clean as scope grows"
            subtitle="RACER is framed as an engineering product: modular code structure, predictable flows, and replaceable service boundaries."
            icon={<Icon name="stack" />}
          />

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Chip tone="violet">MVC</Chip>
                  <Chip>Modular UI</Chip>
                  <Chip tone="green">Frame-safe</Chip>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { t: "UI Layer", d: "HUD, menus, overlays; no gameplay state leakage", i: <Icon name="ui" /> },
                    { t: "State Layer", d: "Race rules, lap state, checkpoints, penalties", i: <Icon name="stack" /> },
                    { t: "Network Layer", d: "Photon sync set, events, ownership rules", i: <Icon name="net" /> },
                    { t: "Services Layer", d: "Backend calls, telemetry, config, updates", i: <Icon name="db" /> },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <div className="flex items-center gap-2 text-white/85">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80">
                          {x.i}
                        </span>
                        <div className="text-sm font-medium text-white">{x.t}</div>
                      </div>
                      <div className="mt-2 text-sm text-white/65">{x.d}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => setOpen("arch")} iconRight={<Icon name="arrowRight" />}>
                    Open Architecture Diagram
                  </Button>
                  <Button variant="ghost" href="#stack" iconLeft={<Icon name="stack" />}>
                    Jump to Stack
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <img src={IMG.systemC} alt="Programming placeholder" className="h-56 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <div className="text-sm font-medium text-white">Engineering credibility</div>
                  <p className="mt-2 text-sm text-white/65">
                    This page structure is designed for technical buyers. It makes your decisions legible: what’s separated, what’s synchronous, what’s async, what’s measurable.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip tone="violet">Legible decisions</Chip>
                    <Chip>Measurable</Chip>
                    <Chip tone="green">Shippable</Chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MULTIPLAYER */}
      <section id="multiplayer" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Multiplayer"
            title="Race sessions designed for stability"
            subtitle="We present multiplayer as a lifecycle + sync set + failure handling — the three things clients actually care about."
            icon={<Icon name="net" />}
          />

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { t: "Lifecycle", d: "Match → ready → start → lap events → finish → summary" },
                    { t: "Sync Set", d: "Position/velocity + lap state + checkpoint events" },
                    { t: "Ownership", d: "Clear simulation ownership boundaries per car" },
                    { t: "Failure States", d: "Disconnect / rejoin / timeout / session cleanup" },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <div className="text-sm font-medium text-white">{x.t}</div>
                      <div className="mt-1 text-sm text-white/65">{x.d}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/70">
                  Add later: interpolation/prediction approach, event timing strategy, and anti-cheat posture (if applicable).
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => setOpen("mp")} iconRight={<Icon name="arrowRight" />}>
                    Open Multiplayer Notes
                  </Button>
                  <Button variant="ghost" href="#telemetry" iconLeft={<Icon name="ui" />}>
                    Next: Telemetry
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <img src={IMG.systemB} alt="Networking placeholder" className="h-56 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <div className="text-sm font-medium text-white">Client-friendly framing</div>
                  <p className="mt-2 text-sm text-white/65">
                    “Photon” is not the story. The story is predictable race outcomes and stable sessions at scale.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip tone="violet">Stable sessions</Chip>
                    <Chip>Race events</Chip>
                    <Chip>Failure handling</Chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TELEMETRY */}
      <section id="telemetry" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Telemetry"
            title="HUD built for glanceability"
            subtitle="The HUD is treated like a system: hierarchy, state, and update cadence — not decorations."
            icon={<Icon name="ui" />}
          />

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-emerald-300/18 bg-white/5 p-6 backdrop-blur">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Chip tone="green">Readable</Chip>
                  <Chip>Stateful</Chip>
                  <Chip tone="violet">Camera modes</Chip>
                </div>

                <div className="space-y-3">
                  {[
                    { t: "Primary telemetry", d: "Position, laps, speed, scenario state" },
                    { t: "Camera controls", d: "Rear view, mirror toggle, pause" },
                    { t: "Failure messaging", d: "False start, penalties, race events" },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <div className="text-sm font-medium text-white">{x.t}</div>
                      <div className="mt-1 text-sm text-white/65">{x.d}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="primary" onClick={() => setOpen("hud")} iconRight={<Icon name="arrowRight" />}>
                    Telemetry Notes
                  </Button>
                  <Button variant="ghost" href="#performance" iconLeft={<Icon name="cpu" />}>
                    Performance
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <img src={IMG.systemD} alt="HUD placeholder image" className="h-[360px] w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-sm font-medium text-white">Design meets engineering</div>
                  <p className="mt-2 text-sm text-white/65">
                    The HUD stays readable because the data model is clean, updates are controlled, and states are explicit.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip tone="green">Glanceability</Chip>
                    <Chip>Explicit states</Chip>
                    <Chip tone="violet">UX at speed</Chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BACKEND */}
      <section id="backend" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Backend"
            title="Service foundation with a growth path"
            subtitle="Azure + AWS positioned as a scalable path: start stable, then expand LiveOps and telemetry without rewrites."
            icon={<Icon name="db" />}
          />

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { t: "Auth & Profiles", d: "Identity + profile structure ready for growth" },
                    { t: "Telemetry pipeline", d: "Session metrics + error signals + performance markers" },
                    { t: "Events", d: "Seasonal hooks, challenges, and content drops (future-ready)" },
                    { t: "Observability", d: "Logging points and monitoring posture" },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <div className="text-sm font-medium text-white">{x.t}</div>
                      <div className="mt-1 text-sm text-white/65">{x.d}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="secondary" onClick={() => setOpen("backend")} iconRight={<Icon name="arrowRight" />}>
                    Backend Notes
                  </Button>
                  <Button variant="ghost" href="#stack" iconLeft={<Icon name="stack" />}>
                    Full Stack
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <img src={IMG.systemA} alt="Backend placeholder" className="h-56 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <div className="text-sm font-medium text-white">Credibility line</div>
                  <p className="mt-2 text-sm text-white/65">
                    Backend is explained as a system boundary — not a bullet list — so it reads enterprise-ready.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip tone="violet">Enterprise-ready</Chip>
                    <Chip>Service boundary</Chip>
                    <Chip>Observable</Chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERFORMANCE */}
      <section id="performance" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Performance"
            title="Optimization is a product requirement"
            subtitle="We frame performance as budgets + instrumentation + repeatable passes — the way real teams ship."
            icon={<Icon name="cpu" />}
          />

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { t: "Frame budget", v: "16.6ms @ 60fps (target)" },
                    { t: "Input → response", v: "Tuned for responsiveness (placeholder)" },
                    { t: "Thermals", v: "Mobile stability posture (placeholder)" },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">{x.t}</div>
                      <div className="mt-2 text-sm text-white/80">{x.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { t: "Optimization passes", d: "CPU hotspots, draw calls, shader cost, texture budgets, pooling" },
                    { t: "Instrumentation", d: "Telemetry markers for FPS drops, stutters, and error spikes" },
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl border border-white/10 bg-black/25 p-4">
                      <div className="text-sm font-medium text-white">{x.t}</div>
                      <div className="mt-1 text-sm text-white/65">{x.d}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-emerald-300/18 bg-emerald-500/10 p-4 text-sm text-white/70">
                  Add later: real numbers (avg FPS on target devices, build size, load time, memory).
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <img src={IMG.systemC} alt="Performance placeholder" className="h-56 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <div className="text-sm font-medium text-white">How to sound premium</div>
                  <p className="mt-2 text-sm text-white/65">
                    Don’t say “optimized”. Say “we shipped against budgets and instrumented the build to stay healthy.”
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip tone="green">Budgets</Chip>
                    <Chip>Instrumentation</Chip>
                    <Chip tone="violet">Repeatable passes</Chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Tech Stack"
            title="Simple, scannable, credible"
            subtitle="This is the “buyer scan” block — clean chips, no noise, just the truth."
            icon={<Icon name="stack" />}
          />

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="mb-3 text-sm font-medium text-white">Core Technologies</div>
                <div className="flex flex-wrap gap-2">
                  <Chip tone="green">Unity 3D</Chip>
                  <Chip>C#</Chip>
                  <Chip tone="violet">Photon PUN 2</Chip>
                  <Chip tone="violet">MVC Architecture</Chip>
                  <Chip>Azure Server</Chip>
                  <Chip>AWS Server</Chip>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">Platforms</div>
                    <div className="mt-1 text-sm text-white/80">App Store • Google Play • Steam</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">Role</div>
                    <div className="mt-1 text-sm text-white/80">Full game build</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="mb-2 flex items-center gap-2 text-white/85">
                  <Icon name="proof" />
                  <div className="text-sm font-medium">Proof points</div>
                </div>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>• Architecture that stays maintainable</li>
                  <li>• Multiplayer framed as lifecycle + sync set</li>
                  <li>• Telemetry-first HUD hierarchy</li>
                  <li>• Scalable backend growth path</li>
                </ul>
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-xs text-white/60">
                  Add 3 real metrics later = instant “senior team” impression.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY (Evidence, but placed late on purpose) */}
      <section id="gallery" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeader
            eyebrow="Evidence Gallery"
            title="Screens and frames that back the claims"
            subtitle="In this variant, visuals come after the stack — they validate the engineering story."
            icon={<Icon name="grid" />}
          />

          <div className="grid grid-cols-12 gap-4">
            {[
              { src: IMG.gallery1, t: "Cinematic track presence", n: "Wide shots that sell speed + atmosphere." },
              { src: IMG.gallery2, t: "Garage detail pass", n: "Material fidelity, decals, silhouette." },
              { src: IMG.gallery3, t: "Speed readability", n: "Camera + motion tuned for clarity." },
              { src: IMG.gallery4, t: "Mechanical credibility", n: "Closeups that feel grounded." },
            ].map((x, idx) => (
              <button
                key={idx}
                onClick={() => setLightbox({ open: true, src: x.src, title: x.t, note: x.n })}
                className={cn(
                  "group relative col-span-12 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/14",
                  idx === 0 ? "lg:col-span-7 lg:row-span-2" : idx === 1 ? "lg:col-span-5" : "lg:col-span-6"
                )}
              >
                <div className="relative">
                  <img src={x.src} alt={x.t} className="h-[220px] w-full object-cover lg:h-[260px]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-white">{x.t}</div>
                        <div className="mt-1 text-xs text-white/60">{x.n}</div>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70 opacity-0 transition group-hover:opacity-100">
                        View <Icon name="arrowRight" className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <Modal open={lightbox.open} onClose={() => setLightbox({ open: false, src: "", title: "", note: "" })} ariaLabel="Evidence lightbox">
            <div className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-9">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/35">
                  <img src={lightbox.src} alt={lightbox.title} className="w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-sm font-medium text-white">{lightbox.title}</div>
                    <div className="mt-1 text-xs text-white/60">{lightbox.note}</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-white/85">
                    <Icon name="proof" />
                    <span className="text-sm font-medium">Why this is here</span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/70">
                    In a systems-first case study, each image should validate a claim: readability, fidelity, stability posture, or production polish.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Chip tone="violet">Credible</Chip>
                    <Chip tone="green">Readable</Chip>
                    <Chip>Grounded</Chip>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-7 shadow-[0_25px_90px_rgba(0,0,0,0.55)] backdrop-blur sm:p-10">
            <div className="absolute -inset-1 rounded-[30px] bg-[radial-gradient(900px_400px_at_20%_20%,rgba(16,185,129,0.28),transparent_60%)]" />
            <div className="absolute -inset-1 rounded-[30px] bg-[radial-gradient(900px_420px_at_80%_10%,rgba(139,92,246,0.26),transparent_60%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/35" />

            <div className="relative grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Chip tone="violet">One team. Two studios.</Chip>
                  <Chip tone="green">Games • Multiplayer • Racing</Chip>
                </div>
                <h3 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  Want a systems-first build like RACER?
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
                  If you care about maintainability, scalability, and performance — we build with budgets, clear architecture, and production credibility from day one.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button variant="primary" href="/contact" iconRight={<Icon name="arrowRight" />}>
                    Start a Project
                  </Button>
                  <Button variant="ghost" href="mailto:hello@wodh.io" iconLeft={<Icon name="email" />}>
                    hello@wodh.io
                  </Button>
                  <Button variant="ghost" onClick={() => scrollToId("hero")} iconLeft={<Icon name="arrowLeft" />}>
                    Back to top
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/55">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Maintainable architecture</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Multiplayer posture</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Telemetry-first HUD</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Scalable backend path</span>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                  <div className="text-sm font-medium text-white">How to make this page unbeatable</div>
                  <ol className="mt-3 space-y-2 text-sm text-white/70">
                    <li>1) Add 3 real metrics (FPS, build size, load time)</li>
                    <li>2) Add 1 failure state story (multiplayer edge case)</li>
                    <li>3) Add 1 diagram screenshot from your tooling</li>
                  </ol>
                  <div className="mt-4 flex gap-2">
                    <Button variant="secondary" href="/portfolio" iconLeft={<Icon name="grid" />}>
                      More Work
                    </Button>
                    <Button variant="ghost" onClick={() => scrollToId("systemsMap")} iconLeft={<Icon name="stack" />}>
                      Systems
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/55">
            <span>© Wodh • Case Study: RACER</span>
            <span className="inline-flex items-center gap-2">
              <Icon name="external" className="h-4 w-4" />
              Online images are placeholders
            </span>
          </div>
        </div>
      </section>

      {/* Preview Modal (from hero button) */}
      <Modal
        open={!!lightbox.open && lightbox.title === "Cinematic Preview (Placeholder)"}
        onClose={() => setLightbox({ open: false, src: "", title: "", note: "" })}
        ariaLabel="Preview modal"
      >
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <div className="relative">
                <img src={IMG.hero} alt="Preview placeholder" className="w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-sm font-medium text-white">Preview Placeholder</div>
                  <div className="mt-1 text-sm text-white/65">
                    Swap with real trailer (YouTube/Vimeo) or MP4 when ready.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 flex items-center gap-2 text-white/85">
                <Icon name="proof" />
                <span className="text-sm font-medium">What to show in 35 seconds</span>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Multiplayer moment (pack racing)</li>
                <li>• HUD legibility at speed</li>
                <li>• Garage detail (materials)</li>
                <li>• One edge-case (false start / penalty)</li>
              </ul>
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-3 text-xs text-white/60">
                Systems-first trailer = show proof, not slogans.
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

