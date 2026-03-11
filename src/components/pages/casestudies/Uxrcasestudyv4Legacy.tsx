"use client";

import React, { useMemo, useState } from "react";

/* =======================================================================================
   WODH — XR Portfolio Single (Case Study)
   Idea D — Spatial UI Showcase (UI / Interaction-first)
   Vibe: premium spatial UX, interaction credibility, “designed in headset”
   - Hero: Spatial HUD stage + interaction chips
   - Section: UI System (depth rules, hierarchy, tokens)
   - Section: Interaction Patterns (grab/poke/gaze/gesture/controller)
   - Section: Microinteractions (feedback timing, easing, state)
   - Section: Accessibility & Comfort (legibility, fatigue, motion)
   - Section: UI Gallery (UI frames, components, states)
   - Dummy data + SafeImage fallback (never breaks)
   - Wodh Design System v1 (dark indigo/black, neon green + violet accents)
======================================================================================= */

type InputMode = "Hands" | "Controllers" | "Gaze" | "Pinch" | "Pointer";
type UiComponentKind = "Panel" | "Dock" | "Toast" | "Modal" | "Tooltip" | "Chip" | "Meter";

type UiFrame = {
  id: string;
  title: string;
  note: string;
  img: string;
  variant: "ui" | "scene";
  tags: string[];
};

type ComponentCard = {
  kind: UiComponentKind;
  title: string;
  blurb: string;
  rules: string[];
  states: string[];
};

type Pattern = {
  name: string;
  why: string;
  do: string[];
  avoid: string[];
  inputs: InputMode[];
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ---------- SafeImage (fallback-safe) ---------- */
function SafeImage({
  src,
  alt,
  className,
  fallbackVariant = "ui",
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackVariant?: "scene" | "ui";
}) {
  const [broken, setBroken] = useState(false);

  const fallback = useMemo(() => {
    const variants: Record<string, { a: string; b: string; c: string }> = {
      ui: { a: "#0B1020", b: "#1A1F3A", c: "#7C3AED" },
      scene: { a: "#0B1020", b: "#12324B", c: "#21F38C" },
    };
    const v = variants[fallbackVariant] ?? variants.ui;

    const svg = encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="${v.a}"/>
            <stop offset="0.55" stop-color="${v.b}"/>
            <stop offset="1" stop-color="${v.c}" stop-opacity="0.55"/>
          </linearGradient>
          <filter id="n">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.12 0"/>
          </filter>
          <radialGradient id="r" cx="65%" cy="28%" r="70%">
            <stop offset="0" stop-color="${v.c}" stop-opacity="0.26"/>
            <stop offset="1" stop-color="${v.a}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1600" height="1000" fill="url(#g)"/>
        <rect width="1600" height="1000" fill="url(#r)"/>
        <rect width="1600" height="1000" filter="url(#n)" opacity="0.7"/>
        <g opacity="0.9">
          <rect x="180" y="230" width="640" height="420" rx="28" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)"/>
          <rect x="880" y="290" width="540" height="320" rx="28" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)"/>
          <circle cx="1180" cy="240" r="95" fill="${v.c}" opacity="0.12"/>
          <path d="M240 690 C 420 610, 560 740, 760 670 S 1120 610, 1340 680" fill="none" stroke="${v.c}" stroke-opacity="0.25" stroke-width="2"/>
        </g>
        <g font-family="ui-sans-serif, system-ui" fill="#EAF0FF">
          <text x="180" y="170" font-size="36" opacity="0.86">Spatial UI Placeholder</text>
          <text x="180" y="214" font-size="18" opacity="0.55">Swap with headset UI frames later — layout remains stable.</text>
        </g>
      </svg>
    `);

    return `data:image/svg+xml;charset=utf-8,${svg}`;
  }, [fallbackVariant]);

  return (
    <img
      src={broken ? fallback : src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
    />
  );
}

/* ---------- Primitives ---------- */
function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "green" | "violet";
  className?: string;
}) {
  const tones =
    tone === "green"
      ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
      : tone === "violet"
      ? "border-violet-300/25 bg-violet-300/10 text-violet-100"
      : "border-white/10 bg-white/5 text-white/80";

  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide backdrop-blur-md",
        tones,
        className
      )}
    >
      {children}
    </span>
  );
}

function GlowField() {
  return (
    <>
      <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-[62%] h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_10%,rgba(33,243,140,0.12),transparent_60%),radial-gradient(900px_600px_at_80%_30%,rgba(124,58,237,0.10),transparent_60%),radial-gradient(900px_900px_at_20%_80%,rgba(33,243,140,0.08),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_700px_at_50%_70%,rgba(255,255,255,0.06),transparent_60%)] opacity-40" />
    </>
  );
}

function SectionHeader({
  kicker,
  title,
  lead,
  accent = "green",
}: {
  kicker: string;
  title: string;
  lead?: string;
  accent?: "green" | "violet";
}) {
  const kickerTone =
    accent === "violet" ? "text-violet-200/85" : "text-emerald-200/85";
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-white/25" />
        <p className={cx("text-xs uppercase tracking-[0.28em]", kickerTone)}>{kicker}</p>
      </div>
      <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-2 max-w-3xl text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/* ---------- Segmented Control ---------- */
function Segmented({
  value,
  items,
  onChange,
}: {
  value: string;
  items: { key: string; label: string; hint?: string; tone: "green" | "violet" }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
      <div className="grid grid-cols-3 gap-1">
        {items.map((it) => {
          const active = it.key === value;
          const tone = it.tone ?? "green";
          const activeClass =
            tone === "violet"
              ? "border-violet-300/35 bg-violet-300/12 text-violet-100"
              : "border-emerald-300/35 bg-emerald-300/12 text-emerald-100";
          return (
            <button
              key={it.key}
              onClick={() => onChange(it.key)}
              className={cx(
                "rounded-xl border px-3 py-2 text-left text-xs transition focus:outline-none focus:ring-2 focus:ring-emerald-300/30",
                active ? activeClass : "border-white/10 bg-white/0 text-white/70 hover:bg-white/7"
              )}
              aria-pressed={active}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{it.label}</span>
                <span
                  className={cx(
                    "h-1.5 w-1.5 rounded-full",
                    active ? (tone === "violet" ? "bg-violet-300" : "bg-emerald-300") : "bg-white/25"
                  )}
                />
              </div>
              {it.hint ? <div className={cx("mt-1 text-[11px] leading-snug", active ? "text-white/70" : "text-white/45")}>{it.hint}</div> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- UI Stage (fake spatial HUD) ---------- */
function SpatialStage({
  focus,
  onFocus,
}: {
  focus: "HUD" | "Panel" | "Modal";
  onFocus: (f: "HUD" | "Panel" | "Modal") => void;
}) {
  const items: Array<{ key: "HUD" | "Panel" | "Modal"; label: string; tone: "green" | "violet" }> = [
    { key: "HUD", label: "Dock + HUD", tone: "green" },
    { key: "Panel", label: "Spatial Panel", tone: "violet" },
    { key: "Modal", label: "Modal + Toast", tone: "green" },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
      <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(33,243,140,0.10),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070A14]/35">
        <div className="relative aspect-[16/10]">
          {/* Background scene */}
          <div className="absolute inset-0">
            <SafeImage
              src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1600&q=70"
              alt="XR scene placeholder"
              fallbackVariant="scene"
              className="h-full w-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/80 via-[#070A14]/25 to-transparent" />
          </div>

          {/* “Spatial UI overlays” */}
          <div className="absolute inset-0 p-6">
            {/* Top guidance line */}
            <div className="absolute left-6 right-6 top-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-300/90" />
                <span className="text-xs font-semibold text-white/80">Spatial UI Showcase</span>
              </div>
              <div className="text-[11px] uppercase tracking-[0.26em] text-white/55">UI / Interaction-first</div>
            </div>

            {/* HUD Dock */}
            <div
              className={cx(
                "absolute bottom-6 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border bg-white/5 p-3 backdrop-blur-xl transition",
                focus === "HUD" ? "border-emerald-300/35" : "border-white/10"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {["Home", "Steps", "Hint", "Reset"].map((t) => (
                    <div
                      key={t}
                      className={cx(
                        "rounded-xl border px-3 py-2 text-xs font-semibold transition",
                        focus === "HUD"
                          ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                          : "border-white/10 bg-white/5 text-white/70"
                      )}
                    >
                      {t}
                    </div>
                  ))}
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-xs text-white/55">Depth</span>
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[62%] rounded-full bg-emerald-300/40" />
                  </div>
                </div>
              </div>
            </div>

            {/* Panel */}
            <div
              className={cx(
                "absolute left-10 top-24 w-[52%] rounded-3xl border bg-white/5 p-5 backdrop-blur-xl transition",
                focus === "Panel" ? "border-violet-300/35" : "border-white/10"
              )}
              style={{ transform: "perspective(900px) rotateY(-10deg) rotateX(2deg)" }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">Spatial Panel</p>
                  <p className="mt-1 text-sm font-semibold text-white">Task Guidance</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">
                  Depth-safe
                </span>
              </div>
              <div className="mt-4 space-y-2">
                {["Step 1: Align object", "Step 2: Confirm placement", "Step 3: Execute action"].map((t, i) => (
                  <div key={t} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#070A14]/30 px-3 py-2">
                    <span className="text-xs text-white/75">{t}</span>
                    <span className={cx("text-[11px] uppercase tracking-[0.22em]", i === 0 ? "text-emerald-200/80" : "text-white/45")}>
                      {i === 0 ? "ACTIVE" : "LOCKED"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <p className="mt-3 text-xs text-white/60">
                Panels use strict hierarchy: one primary action, minimal density, predictable states.
              </p>
            </div>

            {/* Modal / Toast */}
            <div
              className={cx(
                "absolute right-10 top-28 w-[38%] rounded-3xl border bg-white/5 p-5 backdrop-blur-xl transition",
                focus === "Modal" ? "border-emerald-300/35" : "border-white/10"
              )}
              style={{ transform: "perspective(900px) rotateY(10deg) rotateX(2deg)" }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">Modal</p>
                  <p className="mt-1 text-sm font-semibold text-white">Confirm Action</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/70">
                  Calm
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/65">
                Confirmation UI appears only when needed. It avoids blocking flow unless the action is irreversible.
              </p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/75">
                  Cancel
                </button>
                <button className="flex-1 rounded-2xl border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-100">
                  Confirm
                </button>
              </div>
              <div className="mt-3 rounded-2xl border border-violet-300/15 bg-violet-300/7 px-3 py-2">
                <p className="text-xs text-violet-100/90">
                  Toast: “Saved locally. Sync later.” <span className="text-white/50">(offline-first)</span>
                </p>
              </div>
            </div>

            {/* Focus hint */}
            <div className="absolute bottom-24 left-6">
              <div className="rounded-2xl border border-white/10 bg-[#070A14]/45 px-3 py-2 text-xs text-white/70">
                Click a lens below to “focus” a UI layer.
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Chip>UI Stage</Chip>
              <Chip>Spatial hierarchy</Chip>
              <Chip>Comfort-first</Chip>
            </div>

            <div className="flex items-center gap-2">
              {items.map((it) => (
                <button
                  key={it.key}
                  onClick={() => onFocus(it.key)}
                  className={cx(
                    "rounded-full border px-3 py-1 text-xs backdrop-blur-xl transition",
                    focus === it.key
                      ? it.tone === "violet"
                        ? "border-violet-300/35 bg-violet-300/12 text-violet-100"
                        : "border-emerald-300/35 bg-emerald-300/12 text-emerald-100"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  )}
                >
                  {it.label}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-3 text-sm text-white/70">
            The showcase is intentionally UI-first: we prove interaction discipline, depth rules, and state clarity — not just pretty scenes.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main Page ---------- */
export default function Uxrcasestudyv4Legacy() {
  const data = useMemo(() => {
    const inputs: { key: string; label: InputMode; hint: string; tone: "green" | "violet" }[] = [
      { key: "Hands", label: "Hands", hint: "Natural affordances", tone: "green" },
      { key: "Controllers", label: "Controllers", hint: "Reliable precision", tone: "green" },
      { key: "Gaze", label: "Gaze", hint: "Fast focus / glance", tone: "violet" },
      { key: "Pinch", label: "Pinch", hint: "Low-effort confirm", tone: "violet" },
      { key: "Pointer", label: "Pointer", hint: "UI selection on distance", tone: "green" },
    ];

    const tokens = [
      { label: "Base", value: "#070A14", note: "Dark indigo/black foundation" },
      { label: "Neon", value: "#21F38C", note: "XR primary glow" },
      { label: "Violet", value: "#7C3AED", note: "Secondary editorial ink" },
      { label: "Type", value: "Tight hierarchy", note: "Big headline, calm body" },
      { label: "Radius", value: "16–24px", note: "Glassy, premium rounding" },
      { label: "Depth", value: "3 layers", note: "Scene → panel → modal" },
    ];

    const depthRules = [
      "One primary panel per context. Avoid multiple competing planes.",
      "UI density caps: fewer items, larger targets, calm spacing.",
      "Panels respect comfortable reading distance (avoid tiny UI).",
      "Use depth as hierarchy (primary closer, secondary further).",
      "Modal overlays only for irreversible actions; otherwise prefer toasts.",
      "Use a ‘rest state’ composition (nothing flashing by default).",
    ];

    const components: ComponentCard[] = [
      {
        kind: "Dock",
        title: "Dock (HUD layer)",
        blurb: "Persistent controls with minimal cognitive load. Always predictable, never loud.",
        rules: ["4–6 actions max", "Icon + label (optional)", "No scrolling inside dock"],
        states: ["Default", "Active", "Disabled", "Pressed"],
      },
      {
        kind: "Panel",
        title: "Spatial Panel (primary guidance)",
        blurb: "The main instruction surface. Designed for legibility under motion and lighting changes.",
        rules: ["1 primary action", "2–4 items max", "Large targets, clean hierarchy"],
        states: ["Idle", "Active step", "Locked", "Complete"],
      },
      {
        kind: "Modal",
        title: "Modal (confirmation only)",
        blurb: "Used sparingly. Must be calm. Must not create panic or motion spikes.",
        rules: ["Only for irreversible actions", "Short copy", "Two actions max"],
        states: ["Enter", "Idle", "Confirm", "Exit"],
      },
      {
        kind: "Toast",
        title: "Toast (non-blocking feedback)",
        blurb: "A small truth marker. Perfect for offline-first systems: “Saved locally; sync later.”",
        rules: ["Auto-dismiss", "No stacking >2", "Never cover primary target"],
        states: ["Show", "Hold", "Dismiss"],
      },
      {
        kind: "Tooltip",
        title: "Tooltip (micro guidance)",
        blurb: "Short, contextual. Used when users hesitate — not always visible.",
        rules: ["One sentence", "Anchor to object", "Fade in/out, no bounce"],
        states: ["Hidden", "Reveal", "Fade"],
      },
      {
        kind: "Meter",
        title: "Meter (progress / health)",
        blurb: "Progress that reduces anxiety. Should feel steady and trustworthy.",
        rules: ["Slow easing", "No jitter", "Numbers optional"],
        states: ["Idle", "Update", "Complete"],
      },
    ];

    const patterns: Pattern[] = [
      {
        name: "Target + Confirm (distance-safe)",
        why: "Users can act precisely without leaning or stepping into unsafe zones.",
        do: ["Use a clear highlight state", "Confirm with pinch/trigger", "Provide short ‘success’ feedback"],
        avoid: ["Tiny hit targets", "Hidden confirmations", "Ambiguous success states"],
        inputs: ["Gaze", "Pinch", "Controllers"],
      },
      {
        name: "Grab + Place (tactile illusion)",
        why: "Feels physical without expensive visuals. Timing is the secret.",
        do: ["Snap to guides", "Add micro haptics", "Use simple shadows for depth cue"],
        avoid: ["Overly soft physics", "Bouncy easing", "Hard resets without explanation"],
        inputs: ["Hands", "Controllers"],
      },
      {
        name: "Progressive Disclosure",
        why: "Spatial UI gets cluttered fast. Reveal only what the user needs now.",
        do: ["One primary panel", "Secondary info behind hover/hold", "Use toasts for status"],
        avoid: ["Always-on walls of UI", "Multiple panels competing", "Too much text"],
        inputs: ["Hands", "Pointer", "Gaze"],
      },
      {
        name: "Recovery Path (when tracking is imperfect)",
        why: "XR is messy in real environments. Recovery is part of UX, not an edge-case.",
        do: ["Show a calm reset affordance", "Allow re-center", "Keep state persistent"],
        avoid: ["Restart the whole session", "Blame the user", "Panic motion"],
        inputs: ["Controllers", "Hands", "Pointer"],
      },
    ];

    const frames: UiFrame[] = [
      {
        id: "f-01",
        title: "Dock + HUD layer (baseline)",
        note: "Persistent actions; predictable structure; no clutter.",
        img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=70",
        variant: "ui",
        tags: ["Dock", "Comfort", "Baseline"],
      },
      {
        id: "f-02",
        title: "Spatial panel (depth-safe typography)",
        note: "One panel. One primary action. Density capped.",
        img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=70",
        variant: "ui",
        tags: ["Panel", "Hierarchy", "Depth"],
      },
      {
        id: "f-03",
        title: "Confirmation modal (calm, short copy)",
        note: "Only for irreversible actions. Otherwise: toast.",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=70",
        variant: "ui",
        tags: ["Modal", "Safety", "Clarity"],
      },
      {
        id: "f-04",
        title: "Tooltip micro-guidance (contextual)",
        note: "Appears when user hesitates. Never always-on.",
        img: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=1600&q=70",
        variant: "scene",
        tags: ["Tooltip", "Assist", "UX"],
      },
      {
        id: "f-05",
        title: "Progress meter (steady, trustworthy)",
        note: "Slow easing; no jitter. Reduces anxiety.",
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=70",
        variant: "ui",
        tags: ["Meter", "Feedback", "Progress"],
      },
      {
        id: "f-06",
        title: "Offline toast (system truth)",
        note: "Small “saved locally; sync later” marker.",
        img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=1600&q=70",
        variant: "scene",
        tags: ["Toast", "Offline-first", "Systems"],
      },
    ];

    const micro = [
      {
        title: "Feedback timing (the secret sauce)",
        blurb: "XR feels ‘tactile’ when feedback arrives at the right moment — not when visuals are flashy.",
        bullets: ["Haptic pulse within 50–90ms", "Highlight state instantly", "Success toast within 200ms"],
        tone: "green" as const,
      },
      {
        title: "Easing discipline (no bounce)",
        blurb: "Avoid playful motion. Use calm easing to reduce sickness and keep enterprise tone.",
        bullets: ["Ease-out only", "No overshoot", "Prefer fades + small translations"],
        tone: "violet" as const,
      },
      {
        title: "State clarity (never ambiguous)",
        blurb: "Every interactive element has clear states — default, hover, active, disabled, success.",
        bullets: ["High contrast edges", "Readable labels", "One primary action"],
        tone: "green" as const,
      },
    ];

    const accessibility = [
      { label: "Legibility", value: "Large type + spacing", note: "Designed to read at depth" },
      { label: "Targets", value: "Comfortable hit areas", note: "No tiny UI interactions" },
      { label: "Motion", value: "Calm transitions", note: "No decorative motion loops" },
      { label: "Color", value: "Neon as accent", note: "Avoid full neon walls" },
      { label: "Fatigue", value: "Low effort flows", note: "Less reaching, fewer steps" },
      { label: "Recovery", value: "Always a path back", note: "No dead ends or panic states" },
    ];

    return { inputs, tokens, depthRules, components, patterns, frames, micro, accessibility };
  }, []);

  const [lens, setLens] = useState<"Tokens" | "Depth" | "Components">("Tokens");
  const [focus, setFocus] = useState<"HUD" | "Panel" | "Modal">("Panel");
  const [selectedInput, setSelectedInput] = useState<InputMode>("Hands");
  const [frameTag, setFrameTag] = useState<string>("All");

  const uniqueFrameTags = useMemo(() => {
    const tags = new Set<string>();
    data.frames.forEach((f) => f.tags.forEach((t) => tags.add(t)));
    return ["All", ...Array.from(tags)];
  }, [data.frames]);

  const filteredFrames = useMemo(() => {
    if (frameTag === "All") return data.frames;
    return data.frames.filter((f) => f.tags.includes(frameTag));
  }, [data.frames, frameTag]);

  const patternsForInput = useMemo(() => {
    return data.patterns.filter((p) => p.inputs.includes(selectedInput));
  }, [data.patterns, selectedInput]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen bg-[#070A14] text-white">
      <div className="relative overflow-hidden">
        <GlowField />

        {/* subtle grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:72px_72px]" />
          <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent_70%)] opacity-50" />
        </div>

        {/* ===================================================================================
            HERO — xrcs-hero
        =================================================================================== */}
        <section id="xrcs-hero" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Chip>XR Case Study</Chip>
              <Chip>Idea D — Spatial UI Showcase</Chip>
              <Chip>UI / Interaction-first</Chip>
            </div>

            <div className="grid gap-10 md:grid-cols-12 md:items-start">
              {/* Left */}
              <div className="md:col-span-6">
                <div className="relative">
                  <div className="pointer-events-none absolute -left-10 -top-12 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
                  <div className="pointer-events-none absolute left-32 top-0 h-32 w-32 rounded-full bg-violet-500/12 blur-3xl" />

                  <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">
                    Designed in-headset • depth-safe • comfort-first
                  </p>

                  <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                    Spatial UI that{" "}
                    <span className="bg-gradient-to-r from-emerald-200 via-white/90 to-violet-200 bg-clip-text text-transparent">
                      reads clearly
                    </span>{" "}
                    and{" "}
                    <span className="text-white/85">
                      behaves predictably
                    </span>
                    .
                  </h1>

                  <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/75 sm:text-base">
                    This case study is UI-first: interaction patterns, depth rules, and state clarity. The goal is credibility — not “pretty screens.”
                  </p>
                </div>

                <div className="mt-6 grid gap-3">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Chip>Input lens</Chip>
                      <Chip>Interaction</Chip>
                      <Chip>Choose one</Chip>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {data.inputs.map((it) => {
                        const active = it.label === selectedInput;
                        return (
                          <button
                            key={it.key}
                            onClick={() => setSelectedInput(it.label)}
                            className={cx(
                              "rounded-full border px-3 py-2 text-left text-xs transition backdrop-blur-xl",
                              active
                                ? it.tone === "violet"
                                  ? "border-violet-300/35 bg-violet-300/12 text-violet-100"
                                  : "border-emerald-300/35 bg-emerald-300/12 text-emerald-100"
                                : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                            )}
                          >
                            <div className="font-semibold">{it.label}</div>
                            <div className={cx("mt-0.5 text-[11px] leading-snug", active ? "text-white/70" : "text-white/45")}>
                              {it.hint}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-[#070A14]/35 p-4">
                      <p className="text-xs uppercase tracking-[0.26em] text-white/55">Patterns for {selectedInput}</p>
                      <div className="mt-2 space-y-2">
                        {patternsForInput.slice(0, 2).map((p) => (
                          <div
                            key={p.name}
                            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                          >
                            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                            {p.name}
                          </div>
                        ))}
                        {patternsForInput.length === 0 ? (
                          <p className="text-sm text-white/65">No patterns mapped yet (dummy data). Add later.</p>
                        ) : null}
                      </div>
                      <button
                        onClick={() => scrollTo("xrcs-patterns")}
                        className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-200/90 hover:text-emerald-100"
                      >
                        See full interaction patterns <span className="ml-2">→</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => scrollTo("xrcs-ui-system")}
                      className="inline-flex items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-100 backdrop-blur-xl transition hover:bg-emerald-300/15"
                    >
                      UI system <span className="ml-2 text-emerald-200/90">→</span>
                    </button>
                    <button
                      onClick={() => scrollTo("xrcs-gallery")}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/10"
                    >
                      UI gallery
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Stage */}
              <div className="md:col-span-6">
                <SpatialStage focus={focus} onFocus={setFocus} />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            UI SYSTEM — xrcs-ui-system
        =================================================================================== */}
        <section id="xrcs-ui-system" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="UI SYSTEM"
              title="A spatial UI system — tokens, depth rules, and component discipline."
              lead="This is the credibility block: we show that UI is an engineered system, not a screenshot collection."
              accent="violet"
            />

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Chip>UI lens</Chip>
                    <Chip>System</Chip>
                    <Chip>Switch views</Chip>
                  </div>

                  <Segmented
                    value={lens}
                    onChange={(v) => setLens(v as any)}
                    items={[
                      { key: "Tokens", label: "Tokens", hint: "Color / type / depth", tone: "violet" },
                      { key: "Depth", label: "Depth Rules", hint: "Hierarchy in space", tone: "green" },
                      { key: "Components", label: "Components", hint: "System pieces", tone: "violet" },
                    ]}
                  />

                  <div className="mt-4 rounded-2xl border border-white/10 bg-[#070A14]/35 p-4">
                    {lens === "Tokens" ? (
                      <>
                        <p className="text-xs uppercase tracking-[0.26em] text-white/55">Tokens</p>
                        <div className="mt-3 space-y-2">
                          {data.tokens.map((t) => (
                            <div key={t.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                              <div>
                                <p className="text-sm font-semibold text-white">{t.label}</p>
                                <p className="text-xs text-white/60">{t.note}</p>
                              </div>
                              <div className="text-sm text-white/75">{t.value}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : lens === "Depth" ? (
                      <>
                        <p className="text-xs uppercase tracking-[0.26em] text-white/55">Depth rules</p>
                        <ul className="mt-3 space-y-2">
                          {data.depthRules.map((r) => (
                            <li key={r} className="flex gap-3 text-sm text-white/75">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-300/80" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <>
                        <p className="text-xs uppercase tracking-[0.26em] text-white/55">System note</p>
                        <p className="mt-2 text-sm leading-relaxed text-white/70">
                          Components are designed as a family: shared states, shared spacing, shared behavior. That consistency is what feels “premium.”
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {data.components.slice(0, 4).map((c) => (
                            <Chip key={c.kind}>
                              {c.kind}
                            </Chip>
                          ))}
                        </div>
                        <button
                          onClick={() => scrollTo("xrcs-components")}
                          className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-200/90 hover:text-emerald-100"
                        >
                          View component library <span className="ml-2">→</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
                  <div className="pointer-events-none absolute -inset-24 bg-[radial-gradient(closest-side,rgba(124,58,237,0.12),transparent_70%)]" />
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070A14]/35">
                    <div className="relative aspect-[16/10]">
                      <SafeImage
                        src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1600&q=70"
                        alt="UI system frame"
                        fallbackVariant="ui"
                        className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/80 via-[#070A14]/25 to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip>System frame</Chip>
                        <Chip>Depth-safe</Chip>
                        <Chip>Replace later</Chip>
                      </div>
                      <p className="mt-2 text-sm text-white/70">
                        Swap this with a real headset capture of your UI system screen (or a UI “style guide” frame).
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {[
                      { label: "Components", id: "xrcs-components" },
                      { label: "Patterns", id: "xrcs-patterns" },
                      { label: "Microinteractions", id: "xrcs-micro" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => scrollTo(t.id)}
                        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            COMPONENT LIBRARY — xrcs-components
        =================================================================================== */}
        <section id="xrcs-components" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="COMPONENT LIBRARY"
              title="A small set of components, with strict behavior."
              lead="Spatial UI is not web UI. We keep components few, large, readable, and predictable."
              accent="green"
            />

            <div className="grid gap-4 md:grid-cols-12">
              {data.components.map((c, idx) => (
                <div
                  key={c.kind}
                  className={cx(
                    "rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl",
                    idx === 0 ? "md:col-span-7" : "md:col-span-5"
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Chip>{c.kind}</Chip>
                      <Chip>Component</Chip>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.26em] text-white/55">System</span>
                  </div>

                  <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{c.blurb}</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-[#070A14]/35 p-4">
                      <p className="text-xs uppercase tracking-[0.26em] text-white/55">Rules</p>
                      <ul className="mt-2 space-y-2">
                        {c.rules.map((r) => (
                          <li key={r} className="flex gap-3 text-sm text-white/75">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#070A14]/35 p-4">
                      <p className="text-xs uppercase tracking-[0.26em] text-white/55">States</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {c.states.map((s) => (
                          <Chip key={s}>
                            {s}
                          </Chip>
                        ))}
                      </div>
                      <div className="mt-3 rounded-2xl border border-violet-300/15 bg-violet-300/7 px-3 py-2">
                        <p className="text-xs text-white/70">State clarity is comfort.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================================
            INTERACTION PATTERNS — xrcs-patterns
        =================================================================================== */}
        <section id="xrcs-patterns" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="INTERACTION PATTERNS"
              title="Patterns that prevent confusion and reduce fatigue."
              lead="We define patterns by what they solve (safety, precision, clarity) — not by tech novelty."
              accent="violet"
            />

            <div className="grid gap-4 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <Chip>Input mode</Chip>
                    <Chip>Filter</Chip>
                  </div>

                  <div className="space-y-2">
                    {(["Hands", "Controllers", "Gaze", "Pinch", "Pointer"] as InputMode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedInput(m)}
                        className={cx(
                          "w-full rounded-2xl border px-4 py-3 text-left text-sm transition",
                          selectedInput === m
                            ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                            : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{m}</span>
                          <span className="text-xs text-white/50">{selectedInput === m ? "Active" : ""}</span>
                        </div>
                        <p className="mt-1 text-xs text-white/60">
                          Show patterns compatible with {m}.
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-[#070A14]/35 p-4">
                    <p className="text-xs uppercase tracking-[0.26em] text-white/55">Guideline</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      The best XR UX is obvious. If a user needs a tutorial to click a button, the UI is wrong.
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-8">
                <div className="space-y-4">
                  {patternsForInput.map((p) => (
                    <div key={p.name} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Chip>Pattern</Chip>
                          <Chip>{selectedInput}</Chip>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {p.inputs.map((i) => (
                            <Chip key={i}>
                              {i}
                            </Chip>
                          ))}
                        </div>
                      </div>

                      <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white">{p.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{p.why}</p>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/5 p-4">
                          <p className="text-xs uppercase tracking-[0.26em] text-emerald-200/80">Do</p>
                          <ul className="mt-2 space-y-2">
                            {p.do.map((d) => (
                              <li key={d} className="flex gap-3 text-sm text-white/75">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl border border-violet-300/15 bg-violet-300/7 p-4">
                          <p className="text-xs uppercase tracking-[0.26em] text-violet-200/80">Avoid</p>
                          <ul className="mt-2 space-y-2">
                            {p.avoid.map((a) => (
                              <li key={a} className="flex gap-3 text-sm text-white/75">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-300/80" />
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}

                  {patternsForInput.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                      <p className="text-sm text-white/70">
                        No patterns mapped for this input yet (dummy set). Add your real patterns per device and scenario.
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            MICROINTERACTIONS — xrcs-micro
        =================================================================================== */}
        <section id="xrcs-micro" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="MICROINTERACTIONS"
              title="Small timing decisions that make XR feel premium."
              lead="This is where UI becomes ‘tactile’ — without expensive visuals."
              accent="green"
            />

            <div className="grid gap-4 md:grid-cols-12">
              {data.micro.map((m, idx) => (
                <div
                  key={m.title}
                  className={cx(
                    "relative overflow-hidden rounded-3xl border bg-white/5 p-6 backdrop-blur-xl",
                    m.tone === "violet" ? "border-violet-300/15" : "border-emerald-300/15",
                    idx === 0 ? "md:col-span-7" : "md:col-span-5"
                  )}
                >
                  <div className="pointer-events-none absolute -inset-24 opacity-70">
                    <div
                      className={cx(
                        "absolute left-10 top-10 h-40 w-40 rounded-full blur-3xl",
                        m.tone === "violet" ? "bg-violet-500/10" : "bg-emerald-400/10"
                      )}
                    />
                  </div>

                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-2">
                      <Chip tone={m.tone}>{m.tone === "violet" ? "Motion" : "Feedback"}</Chip>
                      <Chip>Micro</Chip>
                    </div>

                    <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{m.blurb}</p>

                    <ul className="mt-4 space-y-2">
                      {m.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm text-white/75">
                          <span className={cx("mt-2 h-1.5 w-1.5 rounded-full", m.tone === "violet" ? "bg-violet-300/80" : "bg-emerald-300/80")} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================================
            ACCESSIBILITY & COMFORT — xrcs-accessibility
        =================================================================================== */}
        <section id="xrcs-accessibility" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="ACCESSIBILITY & COMFORT"
              title="Legible, calm, and low-fatigue."
              lead="A UI-first case study must prove comfort discipline — otherwise it’s just pretty panels."
              accent="violet"
            />

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Chip>Comfort baseline</Chip>
                <Chip>Accessibility</Chip>
                <Chip>Field-ready</Chip>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {data.accessibility.map((a) => (
                  <div key={a.label} className="rounded-2xl border border-white/10 bg-[#070A14]/35 p-5">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-white/55">{a.label}</p>
                    <p className="mt-2 text-base font-semibold text-white">{a.value}</p>
                    <p className="mt-2 text-sm text-white/65">{a.note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Comfort decisions are UX decisions. The UI is designed to reduce uncertainty — not to entertain.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================================
            UI GALLERY — xrcs-gallery
        =================================================================================== */}
        <section id="xrcs-gallery" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <SectionHeader
              kicker="UI GALLERY"
              title="Curated UI frames — components, states, and proof."
              lead="Filter the gallery by tag. Keep this curated (6–12 frames), not a dump."
              accent="green"
            />

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Chip>Filter</Chip>
                <div className="flex flex-wrap gap-2">
                  {uniqueFrameTags.map((t) => (
                    <button
                      key={t}
                      onClick={() => setFrameTag(t)}
                      className={cx(
                        "rounded-full border px-3 py-1 text-xs tracking-wide backdrop-blur-xl transition",
                        frameTag === t
                          ? "border-emerald-300/35 bg-emerald-300/12 text-emerald-100"
                          : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setFrameTag("All")}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 transition hover:bg-white/10"
              >
                Reset
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-12">
              {filteredFrames.map((f, i) => (
                <div
                  key={f.id}
                  className={cx(
                    "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl",
                    i === 0 ? "md:col-span-7" : "md:col-span-5"
                  )}
                >
                  <div className="pointer-events-none absolute -inset-24 opacity-0 transition duration-500 group-hover:opacity-100">
                    <div className="absolute left-10 top-10 h-36 w-36 rounded-full bg-emerald-400/16 blur-3xl" />
                    <div className="absolute right-10 bottom-10 h-36 w-36 rounded-full bg-violet-500/12 blur-3xl" />
                  </div>

                  <div className="relative aspect-[16/10]">
                    <SafeImage
                      src={f.img}
                      alt={f.title}
                      fallbackVariant={f.variant}
                      className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070A14]/75 via-[#070A14]/20 to-transparent" />
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Chip>Frame</Chip>
                      {f.tags.slice(0, 2).map((t) => (
                        <Chip key={t}>
                          {t}
                        </Chip>
                      ))}
                    </div>

                    <p className="mt-2 text-sm font-semibold text-white">{f.title}</p>
                    <p className="mt-1 text-sm text-white/65">{f.note}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {f.tags.map((t) => (
                        <span key={t} className="rounded-full border border-white/10 bg-[#070A14]/35 px-2.5 py-1 text-[11px] text-white/65">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFrames.length === 0 ? (
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <p className="text-sm text-white/70">No frames match this filter.</p>
              </div>
            ) : null}
          </div>
        </section>

        {/* ===================================================================================
            CTA — xrcs-cta
        =================================================================================== */}
        <section id="xrcs-cta" className="relative">
          <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl md:p-10">
              <div className="pointer-events-none absolute -inset-32 bg-[radial-gradient(closest-side,rgba(33,243,140,0.14),transparent_70%)]" />
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative grid gap-6 md:grid-cols-12 md:items-center">
                <div className="md:col-span-8">
                  <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Spatial UI showcase locked</p>
                  <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                    When you have real UI frames, this becomes your most “believable” XR case study.
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
                    Paste your component list, depth rules, and 6–12 headset captures. We’ll map them into this structure cleanly.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Chip>UI discipline</Chip>
                    <Chip>Interaction patterns</Chip>
                    <Chip>Comfort baseline</Chip>
                    <Chip>State clarity</Chip>
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="grid gap-3">
                    <button
                      onClick={() => scrollTo("xrcs-hero")}
                      className="inline-flex items-center justify-center rounded-2xl border border-emerald-300/30 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-100 backdrop-blur-xl transition hover:bg-emerald-300/15"
                    >
                      Back to top <span className="ml-2 text-emerald-200/90">↑</span>
                    </button>
                    <button
                      onClick={() => scrollTo("xrcs-gallery")}
                      className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/10"
                    >
                      Back to gallery
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-[#070A14]/35 p-4">
                    <p className="text-xs uppercase tracking-[0.26em] text-white/55">What to send later</p>
                    <p className="mt-1 text-sm text-white/70">
                      1) Component list, 2) depth rules, 3) inputs (hands/controllers), 4) microinteraction notes, 5) 6–12 captures.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-white/55">
              <p>© Wodh — XR Studio • Case Study Single • Spatial UI Showcase</p>
              <div className="flex items-center gap-3">
                <button onClick={() => scrollTo("xrcs-ui-system")} className="hover:text-white/75">UI System</button>
                <button onClick={() => scrollTo("xrcs-components")} className="hover:text-white/75">Components</button>
                <button onClick={() => scrollTo("xrcs-patterns")} className="hover:text-white/75">Patterns</button>
                <button onClick={() => scrollTo("xrcs-gallery")} className="hover:text-white/75">Gallery</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
