"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ConstellationMap, ConstellationMapDemo } from "@/components/ConstellationMap";

/**
 * Wodh — Contact Page
 * Concept B: Split Story + Human Trust
 * Map: Static SVG (city-level pins)
 *
 * Drop into: src/pages/Contact.tsx
 * Tailwind required. Framer Motion optional (but used lightly).
 */

type CityKey = "pk" | "uk" | "dubai";

const ACCENT_GREEN = "rgb(158, 243, 21)"; // Wodh neon green
const ACCENT_PURPLE = "rgb(91, 45, 220)"; // Wodh purple

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function NeonFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl",
        "shadow-[0_0_0_1px_rgba(158,243,21,0.08),0_0_60px_rgba(91,45,220,0.12)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl">
        <div
          className="absolute inset-0 rounded-2xl opacity-70"
          style={{
            background:
              "linear-gradient(135deg, rgba(158,243,21,0.18), rgba(91,45,220,0.16), rgba(0,0,0,0))",
          }}
        />
        <div
          className="absolute -inset-px rounded-2xl opacity-70"
          style={{
            background:
              "linear-gradient(90deg, rgba(158,243,21,0.40), rgba(91,45,220,0.35), rgba(158,243,21,0.18))",
            maskImage:
              "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
            borderRadius: 16,
          }}
        />
      </div>
      {children}
    </div>
  );
}

function Pill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "green" | "purple";
}) {
  const styles =
    tone === "green"
      ? "border-[rgba(158,243,21,0.25)] bg-[rgba(158,243,21,0.08)] text-[rgba(214,255,158,0.95)]"
      : tone === "purple"
      ? "border-[rgba(91,45,220,0.25)] bg-[rgba(91,45,220,0.10)] text-[rgba(210,195,255,0.95)]"
      : "border-white/10 bg-white/5 text-white/80";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        styles
      )}
    >
      {children}
    </span>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <div className="flex items-end justify-between">
        <span className="text-xs font-medium text-white/70">{label}</span>
        {hint ? <span className="text-xs text-white/40">{hint}</span> : null}
      </div>
      <div className="mt-2">{children}</div>
    </label>
  );
}


function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "green" | "purple";
}) {
  const styles =
    tone === "green"
      ? "border-[rgba(158,243,21,0.25)] bg-[rgba(158,243,21,0.08)] text-[rgba(214,255,158,0.95)]"
      : tone === "purple"
      ? "border-[rgba(91,45,220,0.25)] bg-[rgba(91,45,220,0.10)] text-[rgba(210,195,255,0.95)]"
      : "border-white/10 bg-white/5 text-white/80";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        styles
      )}
    >
      {children}
    </span>
  );
}

function Dot({ tone }: { tone: "green" | "purple" }) {
  return (
    <span
      className="inline-block h-2.5 w-2.5 rounded-full"
      style={{
        backgroundColor: tone === "green" ? ACCENT_GREEN : ACCENT_PURPLE,
        boxShadow:
          tone === "green"
            ? "0 0 14px rgba(158,243,21,0.55)"
            : "0 0 14px rgba(91,45,220,0.55)",
      }}
    />
  );
}

function SoftGridBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 600px at 10% 15%, rgba(91,45,220,0.18), transparent 60%), radial-gradient(900px 600px at 90% 25%, rgba(158,243,21,0.10), transparent 60%), radial-gradient(1200px 800px at 60% 90%, rgba(91,45,220,0.10), transparent 65%)",
        }}
      />
    </div>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_16px_50px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35",
        "outline-none transition focus:border-[rgba(158,243,21,0.30)] focus:ring-2 focus:ring-[rgba(158,243,21,0.10)]"
      )}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white",
        "outline-none transition focus:border-[rgba(158,243,21,0.30)] focus:ring-2 focus:ring-[rgba(158,243,21,0.10)]"
      )}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35",
        "outline-none transition focus:border-[rgba(158,243,21,0.30)] focus:ring-2 focus:ring-[rgba(158,243,21,0.10)]"
      )}
    />
  );
}

function IconDot({ tone }: { tone: "green" | "purple" }) {
  return (
    <span
      className="inline-block h-2.5 w-2.5 rounded-full"
      style={{
        backgroundColor: tone === "green" ? ACCENT_GREEN : ACCENT_PURPLE,
        boxShadow:
          tone === "green"
            ? "0 0 14px rgba(158,243,21,0.55)"
            : "0 0 14px rgba(91,45,220,0.55)",
      }}
    />
  );
}

function Button({
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
}) {
  if (variant === "ghost") {
    return (
      <button
        {...props}
        className={cn(
          "rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/85",
          "transition hover:border-white/20 hover:bg-white/[0.06] active:scale-[0.99]"
        )}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      {...props}
      className={cn(
        "relative overflow-hidden rounded-xl px-4 py-3 text-sm font-semibold text-black",
        "active:scale-[0.99] transition"
      )}
      style={{
        background: `linear-gradient(90deg, rgba(158,243,21,0.95), rgba(91,45,220,0.85))`,
        boxShadow:
          "0 10px 30px rgba(91,45,220,0.18), 0 10px 30px rgba(158,243,21,0.10)",
      }}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "radial-gradient(600px 220px at 30% 20%, rgba(255,255,255,0.55), transparent 55%)",
        }}
      />
    </button>
  );
}

function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker?: React.ReactNode;
  title: string;
  desc?: string;
}) {
  return (
    <div>
      {kicker ? <div className="mb-3">{kicker}</div> : null}
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {desc ? <p className="mt-2 text-sm text-white/65">{desc}</p> : null}
    </div>
  );
}

function StoryStep({
  n,
  title,
  desc,
}: {
  n: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-sm font-semibold text-white/85">
        {n}
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-white/65">{desc}</p>
      </div>
    </div>
  );
}

function ContactCard({
  title,
  desc,
  href,
  cta,
  tone,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
  tone: "green" | "purple";
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur",
        "transition hover:border-white/20 hover:bg-white/[0.06]"
      )}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl opacity-40"
        style={{
          background:
            tone === "green"
              ? "radial-gradient(circle, rgba(158,243,21,0.55), transparent 60%)"
              : "radial-gradient(circle, rgba(91,45,220,0.55), transparent 60%)",
        }}
      />
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <IconDot tone={tone} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-white">{title}</p>
            <span className="text-xs text-white/40">•</span>
            <p className="text-xs text-white/60">{cta}</p>
          </div>
          <p className="mt-1 text-sm text-white/70">{desc}</p>
        </div>
      </div>
      <div className="mt-4 text-xs font-medium text-white/70 transition group-hover:text-white">
        Open →
      </div>
    </a>
  );
}

function CityCard({
  city,
  region,
  tone,
  active,
  onHover,
  onLeave,
}: {
  city: string;
  region: string;
  tone: "green" | "purple";
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "group relative cursor-default overflow-hidden rounded-2xl border bg-white/[0.04] p-5 backdrop-blur",
        active ? "border-white/25" : "border-white/10",
        "transition"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl opacity-40",
          active ? "opacity-70" : "opacity-35"
        )}
        style={{
          background:
            tone === "green"
              ? "radial-gradient(circle, rgba(158,243,21,0.55), transparent 60%)"
              : "radial-gradient(circle, rgba(91,45,220,0.55), transparent 60%)",
        }}
      />
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <IconDot tone={tone} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{city}</p>
          <p className="mt-1 text-sm text-white/65">{region}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Pill tone={tone === "green" ? "green" : "purple"}>
              City-level presence
            </Pill>
            <Pill>Remote-friendly</Pill>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-white/55">
        Hover to spotlight on the map →
      </div>
    </div>
  );
}

function TrustRow({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "green" | "purple";
}) {
  const chip =
    tone === "green"
      ? "bg-[rgba(158,243,21,0.10)] text-[rgba(214,255,158,0.95)] border-[rgba(158,243,21,0.22)]"
      : tone === "purple"
      ? "bg-[rgba(91,45,220,0.12)] text-[rgba(210,195,255,0.95)] border-[rgba(91,45,220,0.22)]"
      : "bg-white/[0.04] text-white/80 border-white/10";

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
      <span className="text-sm text-white/65">{label}</span>
      <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold", chip)}>
        {value}
      </span>
    </div>
  );
}

function CityRow({
  city,
  region,
  tone,
  active,
  onHover,
  onLeave,
}: {
  city: string;
  region: string;
  tone: "green" | "purple";
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "group cursor-default rounded-2xl border bg-white/[0.04] p-4 backdrop-blur transition",
        active ? "border-white/25" : "border-white/10",
        "hover:border-white/20"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Dot tone={tone} />
            <p className="text-sm font-semibold text-white">{city}</p>
          </div>
          <p className="mt-1 text-sm text-white/65">{region}</p>
        </div>

        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70">
          City-level
        </span>
      </div>

      <div className="mt-3 text-xs text-white/50">
        Hover to spotlight on map →
      </div>
    </div>
  );
}

function StaticWorldMap({ active }: { active: CityKey | null }) {
  const pins = useMemo(
    () => ({
      pk: { x: 675, y: 255, label: "Pakistan" },
      dubai: { x: 650, y: 270, label: "Dubai" },
      uk: { x: 505, y: 195, label: "United Kingdom" },
    }),
    []
  );

  const isActive = (k: CityKey) => active === k;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(900px 520px at 30% 20%, rgba(91,45,220,0.20), transparent 60%), radial-gradient(900px 520px at 70% 70%, rgba(158,243,21,0.10), transparent 60%)",
        }}
      />
      <div className="relative p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-white/80">Minimal Dark Map</p>
            <p className="text-xs text-white/45">City-level pins only</p>
          </div>
          <Badge tone="neutral">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white/70" />
              Static SVG
            </span>
          </Badge>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30">
          <svg
            viewBox="0 0 1000 520"
            className="h-[320px] w-full sm:h-[360px]"
            role="img"
            aria-label="World map with city-level presence pins"
          >
            <defs>
              <linearGradient id="landB" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
                <stop offset="1" stopColor="rgba(255,255,255,0.04)" />
              </linearGradient>

              <radialGradient id="glowGreenB">
                <stop offset="0" stopColor="rgba(158,243,21,0.95)" />
                <stop offset="1" stopColor="rgba(158,243,21,0.0)" />
              </radialGradient>

              <radialGradient id="glowPurpleB">
                <stop offset="0" stopColor="rgba(91,45,220,0.95)" />
                <stop offset="1" stopColor="rgba(91,45,220,0.0)" />
              </radialGradient>

              <filter id="softBlurB">
                <feGaussianBlur stdDeviation="6" />
              </filter>

              <filter id="hardGlowB">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* stylized continents */}
            <path
              d="M120,165 C210,120 320,120 370,175 C410,220 355,260 295,275 C245,290 195,305 170,330 C150,350 110,325 90,295 C65,255 70,200 120,165 Z"
              fill="url(#landB)"
              stroke="rgba(255,255,255,0.06)"
            />
            <path
              d="M430,145 C480,110 560,110 610,145 C670,190 680,245 630,270 C595,288 548,285 520,315 C495,342 465,340 440,320 C410,290 395,190 430,145 Z"
              fill="url(#landB)"
              stroke="rgba(255,255,255,0.06)"
            />
            <path
              d="M640,165 C710,130 820,135 880,190 C930,235 900,300 835,330 C770,360 720,360 690,325 C650,280 595,205 640,165 Z"
              fill="url(#landB)"
              stroke="rgba(255,255,255,0.06)"
            />
            <path
              d="M540,300 C585,285 640,300 660,350 C680,400 640,440 590,445 C545,448 500,420 495,380 C490,340 505,315 540,300 Z"
              fill="url(#landB)"
              stroke="rgba(255,255,255,0.06)"
            />
            <path
              d="M820,360 C855,350 900,360 915,395 C930,435 900,470 855,472 C820,474 790,450 790,420 C790,390 800,370 820,360 Z"
              fill="url(#landB)"
              stroke="rgba(255,255,255,0.06)"
            />

            {/* subtle routes */}
            <path
              d="M505 195 C560 210 615 235 650 270"
              stroke="rgba(91,45,220,0.22)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M650 270 C660 265 670 260 675 255"
              stroke="rgba(158,243,21,0.18)"
              strokeWidth="2"
              fill="none"
            />

            {(Object.keys(pins) as CityKey[]).map((k) => {
              const p = pins[k];
              const activeK = isActive(k);
              const tone = k === "uk" ? "purple" : "green";
              const glowId = tone === "green" ? "glowGreenB" : "glowPurpleB";

              return (
                <g key={k}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={activeK ? 44 : 26}
                    fill={`url(#${glowId})`}
                    opacity={activeK ? 0.60 : 0.28}
                    filter="url(#softBlurB)"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={activeK ? 6.5 : 4.8}
                    fill={
                      tone === "green"
                        ? "rgba(158,243,21,0.95)"
                        : "rgba(91,45,220,0.95)"
                    }
                    filter="url(#hardGlowB)"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={activeK ? 16 : 11}
                    fill="none"
                    stroke={
                      tone === "green"
                        ? "rgba(158,243,21,0.40)"
                        : "rgba(91,45,220,0.40)"
                    }
                    strokeWidth="2"
                    opacity={activeK ? 0.95 : 0.55}
                  />
                  <g opacity={activeK ? 1 : 0.70}>
                    <rect
                      x={p.x + 10}
                      y={p.y - 18}
                      width={140}
                      height={26}
                      rx={10}
                      fill="rgba(0,0,0,0.35)"
                      stroke="rgba(255,255,255,0.12)"
                    />
                    <text
                      x={p.x + 20}
                      y={p.y}
                      fill="rgba(255,255,255,0.85)"
                      fontSize="12"
                      fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
                    >
                      {p.label}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/55">
          <span className="inline-flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: ACCENT_GREEN,
                boxShadow: "0 0 12px rgba(158,243,21,0.55)",
              }}
            />
            Delivery regions
          </span>
          <span className="text-white/30">•</span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: ACCENT_PURPLE,
                boxShadow: "0 0 12px rgba(91,45,220,0.55)",
              }}
            />
            Partner presence
          </span>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-sm font-semibold text-white">{q}</span>
        <span className="text-white/55">{open ? "–" : "+"}</span>
      </button>
      {open ? (
        <div className="px-5 pb-5 text-sm text-white/70">{a}</div>
      ) : null}
    </div>
  );
}

function GridBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(158,243,21,0.18) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.30]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(91,45,220,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(91,45,220,0.12) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 600px at 15% 20%, rgba(91,45,220,0.20), transparent 60%), radial-gradient(900px 600px at 80% 10%, rgba(158,243,21,0.14), transparent 55%), radial-gradient(1200px 800px at 60% 80%, rgba(91,45,220,0.14), transparent 55%)",
        }}
      />
    </div>
  );
}

function GlowOrb({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl opacity-50",
        className
      )}
      style={{
        background:
          "radial-gradient(circle at 30% 30%, rgba(158,243,21,0.55), rgba(91,45,220,0.35), rgba(0,0,0,0))",
      }}
    />
  );
}

export default function Contact() {
  const [activeCity, setActiveCity] = useState<CityKey | null>(null);

  // Form state (UI-only; wire to your backend later)
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "10k-25k",
    interest: {
      xr: true,
      games: false,
      rAndD: false,
      art3d: false,
    },
    message: "",
  });

  const interestCount = Object.values(form.interest).filter(Boolean).length;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only action. Replace with your API/Form handler.
    alert("Message captured (UI only). Wire this to your backend when ready.");
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* background */}
      <GridBackdrop />
      <GlowOrb className="left-[-120px] top-[-80px] h-[420px] w-[420px]" />
      <GlowOrb className="right-[-140px] top-[120px] h-[520px] w-[520px]" />
      <GlowOrb className="left-[10%] bottom-[-160px] h-[560px] w-[560px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8">
        {/* HERO */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="green">
                <span className="inline-flex items-center gap-2">
                  <Dot tone="green" />
                  Human-first collaboration
                </span>
              </Badge>
              <Badge tone="purple">
                <span className="inline-flex items-center gap-2">
                  <Dot tone="purple" />
                  Clear process
                </span>
              </Badge>
              <Badge>24–48h response</Badge>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              Tell us what you're building —{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(91,45,220,0.95))",
                }}
              >
                we'll guide the next step
              </span>
              .
            </motion.h1>

            <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
              Wodh is designed for teams that want **clarity, momentum, and real partnership** — not
              confusion. Share your goals and we'll recommend a build path that fits your timeline and
              platform.
            </p>

            <div className="mt-8 grid gap-5">
              <StoryStep
                n="1"
                title="We understand the vision"
                desc="We'll ask the right questions: platform, users, core loop, scope, and timeline."
              />
              <StoryStep
                n="2"
                title="We propose the best path"
                desc="Prototype sprint or full build — with milestones, risks, and technical approach."
              />
              <StoryStep
                n="3"
                title="We ship & iterate"
                desc="Weekly updates, transparent progress, and a clean handoff with documentation."
              />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <TrustRow label="Typical response time" value="24–48 hours" tone="green" />
              <TrustRow label="Engagement model" value="Fixed / Retainer" tone="purple" />
              <TrustRow label="NDA friendly" value="Yes" />
              <TrustRow label="Prototype sprints" value="Available" tone="green" />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#contact-form">
                <Button>Send a message</Button>
              </a>
              <a href="mailto:hello@wodh.io">
                <Button variant="ghost">Email hello@wodh.io</Button>
              </a>
            </div>

            <p className="mt-4 text-sm text-white/55">
              Prefer WhatsApp? Replace the link below with your real number:
              <span className="ml-2">
                <a
                  className="font-semibold text-white/80 hover:text-white"
                  href="https://wa.me/"
                >
                  Open WhatsApp →
                </a>
              </span>
            </p>
          </div>

          {/* FORM */}
          <div className="lg:col-span-6">
            <NeonFrame className="p-5 sm:p-6" >
              <div id="contact-form" className="relative">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Send a brief</p>
                    <p className="mt-1 text-sm text-white/60">
                      The more context, the faster we can estimate and propose.
                    </p>
                  </div>
                  <Pill tone="default">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-white/70" />
                      UI-only
                    </span>
                  </Pill>
                </div>

                <form onSubmit={onSubmit} className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name">
                      <Input
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Email">
                      <Input
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="you@company.com"
                        autoComplete="email"
                        type="email"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Company / Studio" hint="Optional">
                      <Input
                        value={form.company}
                        onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                        placeholder="Wodh client / team"
                      />
                    </Field>
                    <Field label="Budget range">
                      <Select
                        value={form.budget}
                        onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
                      >
                        <option value="under-10k">Under $10k</option>
                        <option value="10k-25k">$10k–$25k</option>
                        <option value="25k-50k">$25k–$50k</option>
                        <option value="50k-plus">$50k+</option>
                      </Select>
                    </Field>
                  </div>

                  <div>
                    <div className="mb-2 flex items-end justify-between">
                      <span className="text-xs font-medium text-white/70">
                        What do you need?
                      </span>
                      <span className="text-xs text-white/40">
                        {interestCount} selected
                      </span>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {[
                        { key: "xr" as const, label: "XR Experience (Quest / Vision Pro / WebXR)" },
                        { key: "games" as const, label: "Game Development (PC / Mobile / Console)" },
                        { key: "rAndD" as const, label: "R&D Lab (Prototypes / Experiments)" },
                        { key: "art3d" as const, label: "3D / Art (Assets, Characters, Environments)" },
                      ].map((it) => (
                        <label
                          key={it.key}
                          className={cn(
                            "flex items-start gap-3 rounded-xl border border-white/10 bg-black/30 p-3",
                            "transition hover:border-white/20"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={form.interest[it.key]}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                interest: { ...p.interest, [it.key]: e.target.checked },
                              }))
                            }
                            className="mt-1 h-4 w-4 accent-[rgba(158,243,21,0.95)]"
                          />
                          <span className="text-sm text-white/75">{it.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Field label="Project details" hint="Goals, platform, timeline">
                    <Textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="e.g., We need a multiplayer XR prototype for Quest 3 within 6 weeks. Core loop: ..."
                    />
                  </Field>

                  <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-white/50">
                      By sending, you agree we can contact you about this request.
                    </div>
                    <div className="flex gap-3">
                      <Button type="button" variant="ghost" onClick={() => setForm({
                        name: "",
                        email: "",
                        company: "",
                        budget: "10k-25k",
                        interest: { xr: true, games: false, rAndD: false, art3d: false },
                        message: "",
                      })}>
                        Reset
                      </Button>
                      <Button type="submit">Send brief</Button>
                    </div>
                  </div>
                </form>
              </div>
            </NeonFrame>
          </div>
        </div>

        {/* GLOBAL PRESENCE + MAP */}
        <div className="mt-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Global presence</h2>
              <p className="mt-1 text-sm text-white/65">
                City-level presence, remote-first execution. Hover a city to spotlight it.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill tone="green">
                <span className="inline-flex items-center gap-2">
                  <IconDot tone="green" />
                  Delivery regions
                </span>
              </Pill>
              <Pill tone="purple">
                <span className="inline-flex items-center gap-2">
                  <IconDot tone="purple" />
                  Partner presence
                </span>
              </Pill>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="grid gap-4 lg:col-span-5">
              <CityCard
                city="Pakistan"
                region="Lahore / Islamabad / Karachi"
                tone="green"
                active={activeCity === "pk"}
                onHover={() => setActiveCity("pk")}
                onLeave={() => setActiveCity(null)}
              />
              <CityCard
                city="Dubai"
                region="UAE presence (city-level)"
                tone="green"
                active={activeCity === "dubai"}
                onHover={() => setActiveCity("dubai")}
                onLeave={() => setActiveCity(null)}
              />
              <CityCard
                city="United Kingdom"
                region="UK presence (city-level)"
                tone="purple"
                active={activeCity === "uk"}
                onHover={() => setActiveCity("uk")}
                onLeave={() => setActiveCity(null)}
              />
            </div>

            <div className="lg:col-span-7">
              <ConstellationMap active={activeCity} />
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-14">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">Quick answers</h2>
            <p className="mt-1 text-sm text-white/65">
              A few things clients usually ask before we start.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <FAQItem
              q="How fast can you start?"
              a="If the scope is clear, we can kick off within a few days. For larger builds, we'll align on milestones and start with a prototype sprint."
            />
            <FAQItem
              q="Do you sign NDAs?"
              a="Yes. We're NDA-friendly and used to handling confidential product work."
            />
            <FAQItem
              q="Which engines / stacks do you use?"
              a="Unity and Unreal for XR & games, plus WebXR for browser-based experiences. We select based on performance, platform, and delivery timeline."
            />
            <FAQItem
              q="Can you do R&D prototypes?"
              a="Absolutely. We run short R&D sprints to validate risky ideas fast before moving to full production."
            />
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="mt-14">
          <NeonFrame className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold text-white/60">Next step</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Want a quick estimate or a prototype plan?
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-white/65">
                  Share your target platform, desired experience, and deadline — we'll reply with a recommended
                  build path and realistic timeline.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#contact-form">
                  <Button>Send brief</Button>
                </a>
                <a href="mailto:hello@wodh.io">
                  <Button variant="ghost">Email hello@wodh.io</Button>
                </a>
              </div>
            </div>
          </NeonFrame>
        </div>
      </div>
    </div>
  );
}
