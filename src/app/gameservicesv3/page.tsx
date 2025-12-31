"use client";

/* =======================================================================================
   WODH — GAME SERVICES PAGE (FULL REBUILD, PATCH SET v2 INCLUDED)
   - Indigo base + Purple-only accent (no green)
   - Editorial headers (2-sentence sublines) + halo glow
   - Accent typography (indigo→purple) used sparingly
   - Pills feel clickable (segmented control behavior + microcopy)
   - Core offerings redesigned (Engineering vs Content split) — NOT same as “What we build”
   - Platforms & Devices kept as switcher, but stronger hierarchy + “Selected” framing
   - Tools/Tech = confidence wall (QA strip + ledger + dock + category grid)
   - Portfolio = media-first mosaic + outcomes
   - Pipeline = connected timeline (desktop track + mobile vertical)
   - IDs + data-section labels on every section

   NOTE ON NAV/FOOTER:
   This page sets CSS var --wodh-accent to purple on the root wrapper.
   If your global Nav/Footer uses var(--wodh-accent) for active pills/CTAs, it will auto-switch.
======================================================================================= */

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";function Segmented({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "inline-flex flex-wrap items-center gap-1 rounded-full border border-white/12 bg-white/[0.04] p-1 backdrop-blur",
        className
      )}
      style={{ boxShadow: "0 0 0 1px rgba(91,45,220,0.10) inset" }}
    >
      {children}
    </div>
  );
}

function SegItem({
  active,
  children,
  onClick,
  ariaLabel,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={cx(
        "relative rounded-full px-4 py-2 text-xs transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
        active
          ? "text-white"
          : "text-white/70 hover:text-white hover:bg-white/[0.06]"
      )}
      style={
        active
          ? {
              background: "rgba(255,255,255,0.10)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.10) inset, 0 0 0 1px rgba(91,45,220,0.40), 0 0 28px rgba(91,45,220,0.18)",
            }
          : undefined
      }
    >
      {active ? (
        <span
          aria-hidden
          className="absolute left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
          style={{ background: TOKENS.accent, boxShadow: "0 0 16px rgba(91,45,220,0.55)" }}
        />
      ) : null}
      <span className={cx(active ? "pl-3" : "")}>{children}</span>
    </button>
  );
}


function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* --------------------------------- TOKENS --------------------------------- */
const TOKENS = {
  bg: "#0C0722",
  accent: "#5B2DDC", // Games purple (ONLY)
  accentSoft: "rgba(91,45,220,0.18)",
  accentMid: "rgba(91,45,220,0.28)",
  accentStrong: "rgba(91,45,220,0.42)",
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

/* -------------------------------- UI PARTS -------------------------------- */

function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/80",
        className
      )}
    >
      {children}
    </span>
  );
}

function MetaPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[11px] text-white/70",
        className
      )}
    >
      {children}
    </span>
  );
}

function Button({
  children,
  href,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-medium transition will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:translate-y-[-1px] active:translate-y-0"
      : "border border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.06] hover:translate-y-[-1px] active:translate-y-0";
  const Comp: any = href ? "a" : "button";
  return (
    <Comp
      href={href}
      className={cx(
        base,
        styles,
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
        className
      )}
    >
      {children}
    </Comp>
  );
}

function AccentText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(170,150,255,0.92), rgba(91,45,220,1))",
        filter: "drop-shadow(0 0 16px rgba(91,45,220,0.28))",
      }}
    >
      {children}
    </span>
  );
}

function SectionHeader({
  kicker,
  title,
  lead,
  subtitle,
  microRow,
  right,
}: {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  subtitle?: React.ReactNode;
  microRow?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {kicker ? <div className="mb-2 flex flex-wrap items-center gap-2">{kicker}</div> : null}

        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          <span className="relative inline-block">
            {/* title halo - stronger purple blur */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -inset-y-5 rounded-full blur-3xl opacity-85"
              style={{
                background:
                  "radial-gradient(320px 120px at 50% 50%, rgba(91,45,220,0.52), rgba(91,45,220,0))",
              }}
            />
            <span className="relative">{title}</span>
          </span>
        </h2>

        {lead ? (
          <p
            className="mt-2 text-pretty text-sm leading-relaxed sm:text-base"
            style={{
              color: "rgba(220,210,255,0.92)",
              filter: "drop-shadow(0 0 12px rgba(91,45,220,0.24))",
            }}
          >
            {lead}
          </p>
        ) : null}

        {subtitle ? (
          <p className="mt-2 text-pretty text-sm leading-relaxed text-white/70 sm:text-base">
            {subtitle}
          </p>
        ) : null}

        {microRow ? <div className="mt-3 flex flex-wrap gap-2">{microRow}</div> : null}
      </div>

      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto my-10 h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/12 to-transparent sm:my-14" />
  );
}

/* -------------------------------- Pills -------------------------------- */

function Pill({
  active,
  children,
  onClick,
  ariaLabel,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={cx(
        "relative rounded-full border px-4 py-2 text-xs transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
        active
          ? "border-white/18 bg-white/[0.10] text-white"
          : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
      )}
      style={
        active
          ? {
              boxShadow:
                "0 0 0 1px rgba(91,45,220,0.38), 0 0 26px rgba(91,45,220,0.18)",
            }
          : undefined
      }
    >
      {/* active indicator */}
      {active ? (
        <span
          aria-hidden
          className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
          style={{ background: TOKENS.accent, boxShadow: "0 0 16px rgba(91,45,220,0.55)" }}
        />
      ) : null}
      {children}
    </button>
  );
}

/* ------------------------------ Atmosphere ------------------------------ */

function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: TOKENS.bg }} />

      {/* Purple corner glows (stronger than v1 patch) */}
      <div
        className="absolute -left-44 -top-44 h-[560px] w-[560px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle at center, rgba(91,45,220,0.78), rgba(91,45,220,0) 65%)",
        }}
      />
      <div
        className="absolute -right-52 -bottom-52 h-[680px] w-[680px] rounded-full blur-3xl opacity-34"
        style={{
          background:
            "radial-gradient(circle at center, rgba(91,45,220,0.72), rgba(91,45,220,0) 65%)",
        }}
      />

      {/* Mid-page wash (prevents “flat between corners”) */}
      <div
        className="absolute left-1/2 top-[44%] h-[560px] w-[860px] -translate-x-1/2 rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(closest-side, rgba(91,45,220,0.55), rgba(91,45,220,0))",
        }}
      />

      {/* Soft top wash */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          background:
            "radial-gradient(1200px 700px at 50% -10%, rgba(255,255,255,0.22), rgba(255,255,255,0) 55%)",
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px]" />
    </div>
  );
}

/* ------------------------------ Logos (minimal inline marks) ------------------------------ */

type LogoKey =
  | "unity"
  | "unreal"
  | "steam"
  | "apple"
  | "android"
  | "webgl"
  | "git"
  | "jira"
  | "firebase"
  | "playfab"
  | "analytics"
  | "crash";

function LogoMark({ k, className }: { k: LogoKey; className?: string }) {
  const common = "h-5 w-5 text-white/80";
  switch (k) {
    case "unity":
      return (
        <svg viewBox="0 0 24 24" className={cx(common, className)} fill="none">
          <path d="M12 2.5 20.5 7.5v9L12 21.5 3.5 16.5v-9L12 2.5Z" stroke="currentColor" strokeWidth="1.6" opacity="0.95" />
          <path d="M12 6.2 17.2 9.2v5.6L12 17.8 6.8 14.8V9.2L12 6.2Z" stroke="currentColor" strokeWidth="1.6" opacity="0.75" />
        </svg>
      );
    case "unreal":
      return (
        <svg viewBox="0 0 24 24" className={cx(common, className)} fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" opacity="0.95" />
          <path d="M9 7.8v7.1c0 1.3 1 2.3 2.3 2.3h1.4c1.3 0 2.3-1 2.3-2.3V7.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "steam":
      return (
        <svg viewBox="0 0 24 24" className={cx(common, className)} fill="none">
          <circle cx="16.6" cy="7.7" r="3.1" stroke="currentColor" strokeWidth="1.6" opacity="0.95" />
          <path d="M3.8 15.2 9.7 18a4 4 0 0 0 5.3-2l1.2-2.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="10.4" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.6" opacity="0.75" />
        </svg>
      );
    case "apple":
      return (
        <svg viewBox="0 0 24 24" className={cx(common, className)} fill="none">
          <path
            d="M15.2 6.2c.8-1 1.3-2.1 1.2-3.2-1.1.1-2.4.7-3.2 1.7-.7.8-1.3 2-1.1 3.1 1.2.1 2.3-.5 3.1-1.6Z"
            fill="currentColor"
            opacity="0.85"
          />
          <path
            d="M12.2 8.1c1.4 0 2-.8 3.5-.8 1.2 0 2.7.7 3.3 1.7-2.9 1.6-2.4 5.8.6 6.9-.5 1.3-1.2 2.6-2.1 3.7-.8 1-1.6 2-2.9 2s-1.8-.8-3.3-.8-2 .8-3.3.8-2.1-1.1-2.9-2.1C2.9 18 2 15.5 2 13c0-3.2 1.9-5.5 4.6-5.5 1.4 0 2.6.8 3.4.8Z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      );
    case "android":
      return (
        <svg viewBox="0 0 24 24" className={cx(common, className)} fill="none">
          <path
            d="M7.5 9.2c0-2.6 2.1-4.7 4.7-4.7h-.4c2.6 0 4.7 2.1 4.7 4.7v7.8c0 1.1-.9 2-2 2H9.5c-1.1 0-2-.9-2-2V9.2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            opacity="0.95"
          />
          <path d="M9 5.8 7.6 3.7M15 5.8l1.4-2.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
          <circle cx="10.3" cy="9.2" r="0.7" fill="currentColor" opacity="0.85" />
          <circle cx="13.7" cy="9.2" r="0.7" fill="currentColor" opacity="0.85" />
        </svg>
      );
    case "webgl":
      return (
        <svg viewBox="0 0 24 24" className={cx(common, className)} fill="none">
          <path d="M12 3.5 20 8v8l-8 4.5L4 16V8l8-4.5Z" stroke="currentColor" strokeWidth="1.6" opacity="0.95" />
          <path d="M12 3.5V12m8-4-8 4-8-4" stroke="currentColor" strokeWidth="1.6" opacity="0.65" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" className={cx(common, className)} fill="none">
          <path d="M7.5 6.8v10.4c0 1.2 1 2.2 2.2 2.2h4.6c1.2 0 2.2-1 2.2-2.2V9.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="7.5" cy="6.8" r="1.7" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16.5" cy="9.8" r="1.7" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16.5" cy="17.2" r="1.7" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "jira":
      return (
        <svg viewBox="0 0 24 24" className={cx(common, className)} fill="none">
          <path d="M8 6.5h8l-4 4-4-4Z" stroke="currentColor" strokeWidth="1.6" opacity="0.95" />
          <path d="M6.5 10.5h8l-4 4-4-4Z" stroke="currentColor" strokeWidth="1.6" opacity="0.75" />
          <path d="M9.5 14.5h8l-4 4-4-4Z" stroke="currentColor" strokeWidth="1.6" opacity="0.55" />
        </svg>
      );
    case "firebase":
      return (
        <svg viewBox="0 0 24 24" className={cx(common, className)} fill="none">
          <path d="M8.2 21 12 3.8 15.8 21 12 18.7 8.2 21Z" stroke="currentColor" strokeWidth="1.6" opacity="0.95" />
          <path d="M10.6 11.2 12 7.6l1.4 3.6L12 12.2l-1.4-1Z" fill="currentColor" opacity="0.75" />
        </svg>
      );
    case "playfab":
      return (
        <svg viewBox="0 0 24 24" className={cx(common, className)} fill="none">
          <path d="M7 4.8h7.2c2.4 0 4.3 1.9 4.3 4.3 0 2.4-1.9 4.3-4.3 4.3H10.6V19H7V4.8Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "analytics":
      return (
        <svg viewBox="0 0 24 24" className={cx(common, className)} fill="none">
          <path d="M5 19V10m5 9V5m5 14v-7m5 7v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
        </svg>
      );
    case "crash":
      return (
        <svg viewBox="0 0 24 24" className={cx(common, className)} fill="none">
          <path d="M12 3 2.8 20.5h18.4L12 3Z" stroke="currentColor" strokeWidth="1.6" opacity="0.95" />
          <path d="M12 9v5m0 3.2h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function labelForLogo(k: LogoKey) {
  switch (k) {
    case "unity":
      return "Unity";
    case "unreal":
      return "Unreal Engine";
    case "steam":
      return "Steam";
    case "apple":
      return "iOS";
    case "android":
      return "Android";
    case "webgl":
      return "WebGL";
    case "git":
      return "Git";
    case "jira":
      return "Jira";
    case "firebase":
      return "Firebase";
    case "playfab":
      return "PlayFab";
    case "analytics":
      return "Analytics";
    case "crash":
      return "Crash Reporting";
    default:
      return "Tool";
  }
}

/* ------------------------------ Real Brand Logos (SimpleIcons CDN) ------------------------------ */

type BrandKey =
  | "unity"
  | "unrealengine"
  | "steam"
  | "apple"
  | "android"
  | "git"
  | "jira"
  | "firebase"
  | "playfab"
  | "googleanalytics"
  | "sentry";

const BRAND_SLUG: Record<LogoKey, BrandKey> = {
  unity: "unity",
  unreal: "unrealengine",
  steam: "steam",
  apple: "apple",
  android: "android",
  webgl: "unity", // fallback
  git: "git",
  jira: "jira",
  firebase: "firebase",
  playfab: "playfab",
  analytics: "googleanalytics",
  crash: "sentry",
};

function toBrand(k: LogoKey): BrandKey {
  return BRAND_SLUG[k] || "unity";
}

function BrandLogo({
  k,
  size = 20,
  className,
}: {
  k: BrandKey;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={`https://cdn.simpleicons.org/${k}/ffffff`}
      alt={k}
      width={size}
      height={size}
      className={cx("opacity-90", className)}
      loading="lazy"
      draggable={false}
    />
  );
}

/* --------------------------------- DATA --------------------------------- */

const OUTCOMES = [
  { k: "Performance", v: "Stable FPS & budgets", hint: "Profiling-first, mid-tier friendly." },
  { k: "Polish", v: "Premium feel", hint: "UI/UX, juice, responsiveness." },
  { k: "Production", v: "Predictable shipping", hint: "Milestones + weekly builds." },
  { k: "Retention", v: "Loops that stick", hint: "Progression, tuning, analytics-ready." },
  { k: "Store-ready", v: "Submission safe", hint: "Compliance + QA checklists." },
];

const OFFERS = [
  {
    title: "Full-Cycle Game Production",
    bestFor: "End-to-end build + launch.",
    deliverables: ["Pre-prod → Production plan", "Art + gameplay systems", "QA + optimization passes", "Store submission support"],
    timeline: "8–24+ weeks",
  },
  {
    title: "Co-Development (Engineering)",
    bestFor: "Scale features fast with senior oversight.",
    deliverables: ["Gameplay systems", "Tools & pipeline support", "Performance passes", "Refactors + stabilization"],
    timeline: "4–12+ weeks",
  },
  {
    title: "Live Ops & Content Updates",
    bestFor: "Momentum after launch — events, seasons, tuning.",
    deliverables: ["Content pipeline", "Remote config", "Analytics hooks", "Update cadence"],
    timeline: "Ongoing",
  },
  {
    title: "Multiplayer & Backend",
    bestFor: "Online play + persistence foundations.",
    deliverables: ["Lobbies/matchmaking", "Economy & inventory", "Cloud saves", "Service integration"],
    timeline: "6–16+ weeks",
  },
  {
    title: "Porting & Optimization",
    bestFor: "Ship across devices with consistent feel.",
    deliverables: ["Device matrix plan", "GPU/CPU profiling", "Memory tuning", "Input + UI parity"],
    timeline: "3–10+ weeks",
  },
  {
    title: "UI/UX & Monetization Loops",
    bestFor: "Improve conversion + retention with taste.",
    deliverables: ["HUD frameworks", "Accessibility pass", "IAP/store UI", "Progression tuning"],
    timeline: "2–8 weeks",
  },
];

type PortfolioItem = {
  id: string;
  title: string;
  platform: "Mobile" | "PC" | "Web" | "Console-ready";
  engine: "Unity" | "Unreal" | "Other";
  role: string;
  outcome: string;
  tags: string[];
  span: string; // Tailwind spans
  hue: "A" | "B" | "C";
};

const PORTFOLIO: PortfolioItem[] = [
  {
    id: "p1",
    title: "Action Prototype — Combat Loop",
    platform: "PC",
    engine: "Unreal",
    role: "Gameplay systems + feel",
    outcome: "Tight input + readable hit feedback.",
    tags: ["Gameplay", "FX", "Tuning"],
    span: "col-span-6 sm:col-span-3 lg:col-span-4 row-span-2",
    hue: "A",
  },
  {
    id: "p2",
    title: "Mobile Runner — Performance Pass",
    platform: "Mobile",
    engine: "Unity",
    role: "Optimization + profiling",
    outcome: "Stabilized frame pacing on mid-tier devices.",
    tags: ["60fps", "Thermals", "Memory"],
    span: "col-span-6 sm:col-span-3 lg:col-span-2 row-span-1",
    hue: "B",
  },
  {
    id: "p3",
    title: "Live Ops — Events & Remote Config",
    platform: "Mobile",
    engine: "Unity",
    role: "Live ops foundations",
    outcome: "Remote tuning without rebuild cycles.",
    tags: ["Remote config", "Analytics"],
    span: "col-span-6 sm:col-span-3 lg:col-span-2 row-span-1",
    hue: "C",
  },
  {
    id: "p4",
    title: "Co-op Lobby — Backend Hooks",
    platform: "Console-ready",
    engine: "Unreal",
    role: "Online systems",
    outcome: "Auth + lobby flow with clear states.",
    tags: ["Lobbies", "Auth", "Cloud"],
    span: "col-span-6 sm:col-span-3 lg:col-span-2 row-span-1",
    hue: "A",
  },
  {
    id: "p5",
    title: "UI System — HUD Framework",
    platform: "Mobile",
    engine: "Unity",
    role: "HUD architecture",
    outcome: "Scalable UI with input parity.",
    tags: ["UI", "Accessibility", "Input"],
    span: "col-span-6 sm:col-span-6 lg:col-span-4 row-span-1",
    hue: "B",
  },
];

/* =======================================================================================
   PAGE
======================================================================================= */

export default function GameServicesPage_RebuildV2() {
  const reduceMotion = useReducedMotion();

  const [platformFilter, setPlatformFilter] = useState<"All" | PortfolioItem["platform"]>("All");
  const [engineFilter, setEngineFilter] = useState<"All" | PortfolioItem["engine"]>("All");

  const filteredPortfolio = useMemo(() => {
    return PORTFOLIO.filter((it) => {
      const pOK = platformFilter === "All" ? true : it.platform === platformFilter;
      const eOK = engineFilter === "All" ? true : it.engine === engineFilter;
      return pOK && eOK;
    });
  }, [platformFilter, engineFilter]);

  return (
    <div
      className="relative min-h-screen text-white"
      data-studio="games"
      style={
        {
          ["--wodh-accent" as any]: TOKENS.accent,
          ["--wodh-accent-soft" as any]: TOKENS.accentSoft,
        } as React.CSSProperties
      }
    >
      <Atmosphere />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-14">
        {/* =======================================================================================
           SECTION 1 — Hero
           id: hero-game
        ======================================================================================= */}
        <section id="hero-game" data-section="Hero (Game Services)">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start"
          >
            <motion.div variants={fadeUp} className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <Chip>Games Studio</Chip>
                <Chip className="border-white/12 bg-white/[0.03]">Indigo + Purple only</Chip>
              </div>

              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Game development that feels <AccentText>premium</AccentText> — and ships on schedule.
              </h1>

              <p className="mt-4 text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
                Full-cycle production, co-development, multiplayer, live ops, porting, and performance optimization —
                delivered with a production-first pipeline and a quality bar teams can trust. We bias toward clarity,
                predictable milestones, and weekly playable progress.
              </p>

              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
                <Button href="#final-cta">Book a call</Button>
                <Button href="#game-portfolio" variant="ghost">
                  See portfolio
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
                <MetaPill>Weekly builds</MetaPill>
                <MetaPill>Performance budgets</MetaPill>
                <MetaPill>Device matrix QA</MetaPill>
                <MetaPill>NDA-friendly</MetaPill>
              </motion.div>
            </motion.div>

            {/* Right: media-first proof */}
            <motion.div variants={fadeUp} className="relative">
              <div className="grid gap-3">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-75"
                    style={{
                      background:
                        "radial-gradient(650px 280px at 25% 20%, rgba(91,45,220,0.28), rgba(91,45,220,0) 60%)",
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-white">Showreel</div>
                      <MetaPill>Loop (muted)</MetaPill>
                    </div>

                    {/* Media placeholder */}
                    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                      <div className="relative h-44">
                        <div
                          aria-hidden
                          className="absolute inset-0"
                          style={{
                            background:
                              "radial-gradient(900px 420px at 20% 20%, rgba(255,255,255,0.10), rgba(255,255,255,0) 55%), radial-gradient(700px 380px at 70% 80%, rgba(91,45,220,0.24), rgba(91,45,220,0) 60%)",
                          }}
                        />
                        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
                        <div className="absolute left-4 top-4 text-xs text-white/75">
                          Replace with real key art / clips
                        </div>
                        <div
                          className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-xs text-white/85"
                          style={{ boxShadow: "0 0 26px rgba(91,45,220,0.16)" }}
                        >
                          <span className="h-2 w-2 rounded-full" style={{ background: TOKENS.accent }} />
                          Taste + production confidence
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <MetaPill>Unity</MetaPill>
                      <MetaPill>Unreal</MetaPill>
                      <MetaPill>Mobile</MetaPill>
                      <MetaPill>PC</MetaPill>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { t: "Performance", d: "Budgets, profiling passes, and stable frame pacing — planned early." },
                    { t: "Systems", d: "Scalable gameplay/UI architecture with clean handoffs and docs." },
                  ].map((x, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-70"
                        style={{
                          background:
                            "radial-gradient(520px 260px at 20% 20%, rgba(91,45,220,0.18), rgba(91,45,220,0) 60%)",
                        }}
                      />
                      <div className="relative">
                        <div className="text-sm font-semibold text-white">{x.t}</div>
                        <div className="mt-2 text-sm leading-relaxed text-white/70">{x.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 rounded-[32px] opacity-45 blur-2xl"
                style={{
                  background:
                    "radial-gradient(520px 320px at 50% 30%, rgba(91,45,220,0.22), rgba(91,45,220,0) 65%)",
                }}
              />
            </motion.div>
          </motion.div>
        </section>

        <Divider />

        {/* =======================================================================================
           SECTION 2 — Outcomes
           id: outcomes
        ======================================================================================= */}
        <section id="outcomes" data-section="Outcomes (What you get)">
          <SectionHeader
            kicker={<Chip>Outcomes</Chip>}
            title={
              <>
                Built for <AccentText>performance</AccentText>, polish, and predictable shipping.
              </>
            }
            subtitle={
              <>
                Buyers don’t purchase “features” — they purchase stability, feel, and delivery confidence.
                These outcomes keep scope grounded and expectations clean from the first call.
              </>
            }
            microRow={
              <>
                <MetaPill>Deliverable: weekly builds</MetaPill>
                <MetaPill>Quality gate: budgets</MetaPill>
                <MetaPill>Handoff: docs + notes</MetaPill>
              </>
            }
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {OUTCOMES.map((o, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(420px 200px at 30% 30%, rgba(91,45,220,0.18), rgba(91,45,220,0) 60%)",
                  }}
                />
                <div className="relative">
                  <div className="text-xs text-white/60">{o.k}</div>
                  <div className="mt-1 text-sm font-medium text-white">{o.v}</div>
                  <div className="mt-2 text-xs leading-relaxed text-white/65">{o.hint}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* =======================================================================================
           SECTION 3 — What we build
           id: what-we-build
        ======================================================================================= */}
        <section id="what-we-build" data-section="What we build (Productized Services)">
          <SectionHeader
            kicker={<Chip>Services</Chip>}
            title={
              <>
                What we build — <AccentText>easy to scope</AccentText>, easy to ship.
              </>
            }
            subtitle={
              <>
                Clear packages make procurement smoother and reduce back-and-forth during kickoff.
                Each offer maps to deliverables, milestones, and a realistic timeline range.
              </>
            }
          />

          <div className="grid gap-3 lg:grid-cols-3">
            {OFFERS.map((o, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:
                      "radial-gradient(520px 260px at 20% 20%, rgba(91,45,220,0.16), rgba(91,45,220,0) 60%)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-base font-semibold text-white">{o.title}</div>
                    <MetaPill>{o.timeline}</MetaPill>
                  </div>
                  <div className="mt-1 text-sm text-white/70">{o.bestFor}</div>

                  <div className="mt-4 space-y-2">
                    {o.deliverables.map((d, idx) => (
                      <div key={idx} className="flex gap-2 text-sm text-white/75">
                        <span
                          className="mt-1 inline-block h-1.5 w-1.5 rounded-full"
                          style={{ background: TOKENS.accent }}
                        />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <MetaPill>Milestone-safe</MetaPill>
                    <Button href="#final-cta" variant="ghost" className="px-3 py-2 text-xs">
                      Get estimate
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* =======================================================================================
           SECTION 4 — Core offerings (REDESIGNED)
           id: core-offerings
        ======================================================================================= */}
        <CoreOfferingsSplit />

        <Divider />

        {/* =======================================================================================
           SECTION 5 — Platforms & devices (pills, but premium + encouraging)
           id: platforms-devices
        ======================================================================================= */}
        <PlatformsDevicesV2 />

        <Divider />

        {/* =======================================================================================
           SECTION 6 — Tools, tech & integrations (confidence wall)
           id: tools-tech
        ======================================================================================= */}
        <ToolsTechV2 />

        <Divider />

        {/* =======================================================================================
           SECTION 7 — Portfolio Mosaic
           id: game-portfolio
        ======================================================================================= */}
        <section id="game-portfolio" data-section="Portfolio (Mosaic Proof)">
          <SectionHeader
            kicker={<Chip>Proof</Chip>}
            title={
              <>
                Featured work — <AccentText>media-first</AccentText> proof, not text lists.
              </>
            }
            lead="Portfolio tiles show real outcomes: what role we played and what actually shipped."
            subtitle={
              <>
                Games are visual: this grid is designed for key art, screenshots, and clip posters.
                Each tile pairs a role and an outcome so buyers understand what you actually shipped.
              </>
            }
            microRow={
              <>
                <MetaPill>Role clarity</MetaPill>
                <MetaPill>Outcome line</MetaPill>
                <MetaPill>Skimmable tags</MetaPill>
              </>
            }
            right={
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <MetaPill>Platform</MetaPill>
                  <Segmented>
                    <SegItem active={platformFilter === "All"} onClick={() => setPlatformFilter("All")}>
                      All
                    </SegItem>
                    {(["Mobile", "PC", "Web", "Console-ready"] as const).map((p) => (
                      <SegItem key={p} active={platformFilter === p} onClick={() => setPlatformFilter(p)}>
                        {p}
                      </SegItem>
                    ))}
                  </Segmented>
                </div>
                <div className="hidden sm:flex flex-wrap items-center gap-2">
                  <MetaPill>Engine</MetaPill>
                  <Segmented>
                    <SegItem active={engineFilter === "All"} onClick={() => setEngineFilter("All")}>
                      All
                    </SegItem>
                    {(["Unity", "Unreal", "Other"] as const).map((e) => (
                      <SegItem key={e} active={engineFilter === e} onClick={() => setEngineFilter(e)}>
                        {e}
                      </SegItem>
                    ))}
                  </Segmented>
                </div>
              </div>
            }
          />

          <div className="grid auto-rows-[120px] grid-cols-6 gap-3 sm:auto-rows-[140px] lg:auto-rows-[160px]">
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  transition={{ duration: 0.22 }}
                  className={cx(
                    "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4",
                    p.span
                  )}
                >
                  {/* Media layer placeholder */}
                  <div className="absolute inset-0">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-95"
                      style={{
                        background:
                          p.hue === "A"
                            ? "radial-gradient(900px 400px at 20% 20%, rgba(91,45,220,0.32), rgba(91,45,220,0) 60%), radial-gradient(900px 420px at 70% 80%, rgba(255,255,255,0.12), rgba(255,255,255,0) 55%)"
                            : p.hue === "B"
                            ? "radial-gradient(900px 420px at 30% 20%, rgba(255,255,255,0.14), rgba(255,255,255,0) 55%), radial-gradient(900px 400px at 70% 80%, rgba(91,45,220,0.28), rgba(91,45,220,0) 60%)"
                            : "radial-gradient(900px 420px at 60% 10%, rgba(91,45,220,0.30), rgba(91,45,220,0) 60%), radial-gradient(900px 420px at 20% 90%, rgba(255,255,255,0.10), rgba(255,255,255,0) 55%)",
                      }}
                    />
                    <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(520px 260px at 30% 30%, rgba(91,45,220,0.26), rgba(91,45,220,0) 60%)",
                      }}
                    />
                  </div>

                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <MetaPill>{p.platform}</MetaPill>
                        <MetaPill>{p.engine}</MetaPill>
                      </div>
                      <div className="mt-2 text-sm font-semibold text-white">{p.title}</div>
                      <div className="mt-1 text-xs text-white/75">{p.role}</div>
                    </div>

                    <div>
                      <div className="text-xs text-white/80">{p.outcome}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.tags.slice(0, 3).map((t, i) => (
                          <MetaPill key={i}>{t}</MetaPill>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 sm:hidden">
            <MetaPill>Engine</MetaPill>
            <Segmented>
              <SegItem active={engineFilter === "All"} onClick={() => setEngineFilter("All")}>
                All
              </SegItem>
              {(["Unity", "Unreal", "Other"] as const).map((e) => (
                <SegItem key={e} active={engineFilter === e} onClick={() => setEngineFilter(e)}>
                  {e}
                </SegItem>
              ))}
            </Segmented>
          </div>
        </section>

        <Divider />

        {/* =======================================================================================
           SECTION 8 — Pipeline (CONNECTED)
           id: production-pipeline
        ======================================================================================= */}
        <PipelineConnected />

        <Divider />

        {/* =======================================================================================
           SECTION 9 — Engagement models
           id: engagement-models
        ======================================================================================= */}
        <EngagementModels />

        <Divider />

        {/* =======================================================================================
           SECTION 10 — FAQ
           id: faq
        ======================================================================================= */}
        <FAQ />

        <Divider />

        {/* =======================================================================================
           SECTION 11 — Final CTA
           id: final-cta
        ======================================================================================= */}
        <FinalCTA />
      </div>
    </div>
  );
}

/* =======================================================================================
   SECTION 4 — Core Offerings (Split)
======================================================================================= */

function CoreOfferingsSplit() {
  return (
    <section id="core-offerings" data-section="Core offerings (Split)">
      <SectionHeader
        kicker={<Chip>Capabilities</Chip>}
        title={
          <>
            Core offerings that match <AccentText>real production</AccentText>.
          </>
        }
        subtitle={
          <>
            Instead of another “card list,” this section shows how the studio operates: Engineering Systems and Content & Feel.
            Each lane includes deliverables and a quality bar so buyers know what “done” means.
          </>
        }
        microRow={
          <>
            <MetaPill>Lane model</MetaPill>
            <MetaPill>Quality bar</MetaPill>
            <MetaPill>Deliverables</MetaPill>
          </>
        }
      />

      <div className="grid gap-3 lg:grid-cols-2">
        {/* Engineering lane */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
          <div
            aria-hidden
            className="absolute inset-0 opacity-65"
            style={{
              background:
                "radial-gradient(720px 320px at 20% 20%, rgba(91,45,220,0.22), rgba(91,45,220,0) 60%)",
            }}
          />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">Engineering Systems</div>
                <div className="mt-1 text-sm text-white/70">
                  Gameplay architecture, UI frameworks, online foundations, tools, and stability.
                </div>
              </div>
              <MetaPill>Lane A</MetaPill>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { t: "Gameplay Systems", b: ["Combat / movement", "AI behaviors", "Inventory / quests", "Physics + interactions"] },
                { t: "UI Architecture", b: ["HUD frameworks", "Input parity", "Navigation patterns", "Accessibility hooks"] },
                { t: "Online & Backend", b: ["Lobbies / matchmaking", "Persistence", "Economy", "Service integration"] },
                { t: "Optimization & Stability", b: ["CPU/GPU profiling", "Memory budgets", "Load time tuning", "Crash/ANR fixes"] },
              ].map((m, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-sm font-semibold text-white">{m.t}</div>
                  <div className="mt-3 space-y-2">
                    {m.b.map((x, idx) => (
                      <div key={idx} className="flex gap-2 text-sm text-white/75">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full" style={{ background: TOKENS.accent }} />
                        <span>{x}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs text-white/60">Quality bar</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <MetaPill>Budgets locked early</MetaPill>
                <MetaPill>Weekly playable builds</MetaPill>
                <MetaPill>Device matrix QA</MetaPill>
                <MetaPill>Clean handoff notes</MetaPill>
              </div>
            </div>
          </div>
        </div>

        {/* Content lane */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-6">
          <div
            aria-hidden
            className="absolute inset-0 opacity-65"
            style={{
              background:
                "radial-gradient(720px 320px at 80% 20%, rgba(91,45,220,0.20), rgba(91,45,220,0) 60%)",
            }}
          />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">Content & Feel</div>
                <div className="mt-1 text-sm text-white/70">
                  Art pipeline, animation, VFX, UX polish, and the “juice” that makes it feel premium.
                </div>
              </div>
              <MetaPill>Lane B</MetaPill>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { t: "Art Pipeline", b: ["Characters / environments", "Rigging + animation", "VFX pipeline", "Tech art support"] },
                { t: "Experience Polish", b: ["Camera feel", "Readability", "Feedback loops", "Tuning support"] },
                { t: "UI/UX Design", b: ["HUD layout", "Store/IAP UX", "Accessibility", "Micro-interactions"] },
                { t: "Audio/Integration", b: ["SFX hooks", "Mix points", "Middleware-ready", "UX audio cues"] },
              ].map((m, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-sm font-semibold text-white">{m.t}</div>
                  <div className="mt-3 space-y-2">
                    {m.b.map((x, idx) => (
                      <div key={idx} className="flex gap-2 text-sm text-white/75">
                        <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full" style={{ background: TOKENS.accent }} />
                        <span>{x}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs text-white/60">Quality bar</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <MetaPill>Readable + responsive</MetaPill>
                <MetaPill>Consistency across platforms</MetaPill>
                <MetaPill>Accessibility-friendly</MetaPill>
                <MetaPill>Performance-aware polish</MetaPill>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =======================================================================================
   SECTION 5 — Platforms & Devices (V2)
======================================================================================= */

function PlatformsDevicesV2() {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState<"Mobile" | "PC" | "Web" | "Console-ready">("Mobile");

  const spec = useMemo(() => {
    if (tab === "Mobile") {
      return {
        title: "Mobile",
        line: "iOS + Android builds with mid-tier constraints in mind — thermals, memory, and input clarity.",
        bullets: ["Thermals & memory budgets", "Touch-first UX + controller optional", "Multiple aspect ratios & safe areas"],
        budgets: { fps: "60fps target", mem: "Low/Med", build: "Size-aware" },
        integrations: ["apple", "android", "firebase", "analytics", "crash"] as LogoKey[],
      };
    }
    if (tab === "PC") {
      return {
        title: "PC",
        line: "PC-ready architecture with scalable quality settings, input parity, and patch-friendly delivery.",
        bullets: ["Controller + KB/M parity", "Steam-friendly workflows", "Scalable quality + resolution"],
        budgets: { fps: "60+ fps", mem: "Scalable", build: "Patch-friendly" },
        integrations: ["steam", "git", "analytics", "crash"] as LogoKey[],
      };
    }
    if (tab === "Web") {
      return {
        title: "Web",
        line: "Fast-loading Web builds (WebGL) with UX polish and strict performance discipline.",
        bullets: ["Bundle size discipline", "Loading UX polish", "Browser constraints & memory"],
        budgets: { fps: "30–60fps", mem: "Tight", build: "Small bundles" },
        integrations: ["webgl", "analytics", "crash"] as LogoKey[],
      };
    }
    return {
      title: "Console-ready",
      line: "Console-ready architecture and compliance-aware workflows — or port support if your pipeline requires it.",
      bullets: ["Input abstraction", "Performance budgets", "Submission readiness"],
      budgets: { fps: "Targeted", mem: "Budgeted", build: "Submission-ready" },
      integrations: ["git", "jira", "analytics", "crash"] as LogoKey[],
    };
  }, [tab]);

  return (
    <section id="platforms-devices" data-section="Platforms & Devices (V2)">
      <SectionHeader
        kicker={<Chip>Platforms</Chip>}
        title={
          <>
            Platforms & devices — <AccentText>constraints-first</AccentText>.
          </>
        }
        lead="Each platform has unique constraints: we ship with those limits in mind, not as an afterthought."
        subtitle={
          <>
            Platform success is mostly constraints: input, memory, thermals, resolution, and store requirements.
            Switch a platform to see the production assumptions and the integrations we typically wire in.
          </>
        }
        microRow={
          <>
            <MetaPill>Tip: click a segment</MetaPill>
            <MetaPill>Selected framing</MetaPill>
            <MetaPill>Spec snapshot</MetaPill>
          </>
        }
      />

      <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <Segmented>
            {(["Mobile", "PC", "Web", "Console-ready"] as const).map((t) => (
              <SegItem
                key={t}
                active={tab === t}
                onClick={() => setTab(t)}
                ariaLabel={`Select platform ${t}`}
              >
                {t}
              </SegItem>
            ))}
          </Segmented>

          <div className="mt-3 text-xs text-white/55">
            Switch to explore constraints + integrations. The active platform lights up — it’s a selector, not a tag.
          </div>

          <div className="mt-5">
            <div className="text-sm font-semibold text-white">
              Selected: <span style={{ color: "rgba(220,210,255,0.95)" }}>{spec.title}</span>
            </div>
            <div className="mt-2 text-sm text-white/70">{spec.line}</div>

            <div className="mt-4 space-y-2">
              {spec.bullets.map((b, i) => (
                <div key={i} className="flex gap-2 text-sm text-white/75">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full" style={{ background: TOKENS.accent }} />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <MetaPill>Mid-tier friendly</MetaPill>
              <MetaPill>Input parity</MetaPill>
              <MetaPill>Resolution scaling</MetaPill>
              <MetaPill>Store readiness</MetaPill>
            </div>
          </div>
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5"
        >
          {/* panel notch / glow */}
          <div
            aria-hidden
            className="absolute left-0 top-0 h-full w-1.5 opacity-70"
            style={{
              background: "linear-gradient(to bottom, rgba(91,45,220,0.65), rgba(91,45,220,0))",
              boxShadow: "0 0 26px rgba(91,45,220,0.25)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-65"
            style={{
              background:
                "radial-gradient(640px 280px at 25% 20%, rgba(91,45,220,0.22), rgba(91,45,220,0) 60%)",
            }}
          />

          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white">Spec snapshot</div>
              <MetaPill>Selected: {tab}</MetaPill>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { k: "FPS", v: spec.budgets.fps },
                { k: "Memory", v: spec.budgets.mem },
                { k: "Build", v: spec.budgets.build },
              ].map((x, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="text-[11px] text-white/55 tracking-wide">{x.k}</div>
                  <div className="mt-1 text-sm font-medium text-white">{x.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 text-xs text-white/60">Common integrations</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {spec.integrations.map((k, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <BrandLogo k={toBrand(k)} size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm text-white/80">{labelForLogo(k)}</div>
                    <div className="truncate text-xs text-white/55">Production-ready integration</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <MetaPill>Weekly builds + sprint demos</MetaPill>
              <Button href="#final-cta" variant="ghost" className="px-3 py-2 text-xs">
                Talk about your platform
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =======================================================================================
   SECTION 6 — Tools / Tech / Integrations (V2)
======================================================================================= */

type ToolTab = "Platforms" | "Engines" | "Tools" | "Services";

function ToolsTechV2() {
  const reduceMotion = useReducedMotion();
  const [tab, setTab] = useState<ToolTab>("Platforms");

  const tabs: Array<{
    t: ToolTab;
    items: Array<{ label: string; k: LogoKey; note: string }>;
  }> = useMemo(
    () => [
      {
        t: "Platforms",
        items: [
          { label: "iOS", k: "apple", note: "Safe areas, aspect ratios, store readiness." },
          { label: "Android", k: "android", note: "Thermals + mid-tier profiling discipline." },
          { label: "Steam", k: "steam", note: "PC builds, patches, controller parity." },
          { label: "WebGL", k: "webgl", note: "Bundle discipline + browser constraints." },
        ],
      },
      {
        t: "Engines",
        items: [
          { label: "Unity", k: "unity", note: "Mobile-first systems, UI frameworks, tools." },
          { label: "Unreal Engine", k: "unreal", note: "High-fidelity gameplay + cinematic delivery." },
        ],
      },
      {
        t: "Tools",
        items: [
          { label: "Git", k: "git", note: "Review discipline + clean merges." },
          { label: "Jira", k: "jira", note: "Milestones, sprints, delivery transparency." },
        ],
      },
      {
        t: "Services",
        items: [
          { label: "PlayFab", k: "playfab", note: "Economy, inventory, online services." },
          { label: "Firebase", k: "firebase", note: "Auth, data, notifications, tooling." },
          { label: "Analytics", k: "analytics", note: "Events, funnels, tuning loops." },
          { label: "Crash Reporting", k: "crash", note: "Stability + fast hotfix cycles." },
        ],
      },
    ],
    []
  );

  const active = tabs.find((x) => x.t === tab)!;
  const dockItems = useMemo(() => [...active.items, ...active.items, ...active.items], [active.items]);
  const duration = reduceMotion ? 0 : 22;

  return (
    <section id="tools-tech" data-section="Tools, Tech & Integrations (V2)">
      <SectionHeader
        kicker={<Chip>Stack</Chip>}
        title={
          <>
            Tools & integrations that signal <AccentText>production maturity</AccentText>.
          </>
        }
        lead="Real brand logos signal real experience: we use production-ready tools, not experimental ones."
        subtitle={
          <>
            Logos alone don't sell. Buyers want reliability: QA discipline, compatibility coverage, and a stack that supports iteration.
            Use the tabs to explore categories — the section is built like a studio dashboard, not a logo dump.
          </>
        }
        microRow={
          <>
            <MetaPill>QA matrix</MetaPill>
            <MetaPill>Curated stack</MetaPill>
            <MetaPill>Clear "why"</MetaPill>
          </>
        }
      />

      {/* QA / Compatibility Matrix strip */}
      <div className="mb-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-semibold text-white">QA & compatibility matrix</div>
          <MetaPill>Quality bar</MetaPill>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <MetaPill>Device matrix testing</MetaPill>
          <MetaPill>Controller + touch parity</MetaPill>
          <MetaPill>Resolution scaling</MetaPill>
          <MetaPill>Memory + thermal profiling</MetaPill>
          <MetaPill>Store submission checklist</MetaPill>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
        {/* Left: selector + ledger */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <Segmented>
            {(["Platforms", "Engines", "Tools", "Services"] as const).map((t) => (
              <SegItem key={t} active={tab === t} onClick={() => setTab(t)} ariaLabel={`Select tools tab ${t}`}>
                {t}
              </SegItem>
            ))}
          </Segmented>
          <div className="mt-3 text-xs text-white/55">
            Switch categories — active tab highlights and the right dock updates with the same set.
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { t: "Build discipline", d: "Repeatable releases, fewer surprises." },
              { t: "Profiling-first", d: "Budgets enforced throughout production." },
              { t: "Data-driven tuning", d: "Balance without rebuild pain." },
            ].map((x, i) => (
              <div key={i} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-4">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:
                      "radial-gradient(420px 220px at 20% 20%, rgba(91,45,220,0.14), rgba(91,45,220,0) 60%)",
                  }}
                />
                <div className="relative">
                  <div className="text-sm font-semibold text-white">{x.t}</div>
                  <div className="mt-2 text-xs leading-relaxed text-white/70">{x.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Ledger rows (why it matters) */}
          <div className="mt-5 space-y-3">
            {active.items.slice(0, 4).map((it) => (
              <div
                key={it.label}
                className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/[0.02] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                    <BrandLogo k={toBrand(it.k)} size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{it.label}</div>
                    <div className="text-xs text-white/65">{it.note}</div>
                  </div>
                </div>
                <MetaPill>Production-ready</MetaPill>
              </div>
            ))}
          </div>
        </div>

        {/* Right: dock + full category tiles */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(680px 320px at 30% 20%, rgba(91,45,220,0.20), rgba(91,45,220,0) 60%)",
            }}
          />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white">Capability dock</div>
              <MetaPill>Selected: {tab}</MetaPill>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              <motion.div
                className="flex gap-4 px-4 py-3"
                animate={reduceMotion ? undefined : { x: ["0%", "-33%"] }}
                transition={reduceMotion ? undefined : { duration, ease: "linear", repeat: Infinity }}
                style={{ width: "300%" }}
              >
                {dockItems.map((it, idx) => (
                  <div
                    key={`${it.label}-${idx}`}
                    className="flex min-w-[160px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-2"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                      <BrandLogo k={toBrand(it.k)} size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm text-white/85">{it.label}</div>
                      <div className="truncate text-xs text-white/55">Production-ready</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {active.items.map((it) => (
                <div key={it.label} className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-2xl transition group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(350px 180px at 30% 30%, rgba(91,45,220,0.28), rgba(91,45,220,0) 60%)",
                    }}
                  />
                  <div className="relative flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <BrandLogo k={toBrand(it.k)} size={24} />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-white">{it.label}</div>
                      <div className="mt-1 text-xs leading-relaxed text-white/65">{it.note}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <MetaPill>Curated stack</MetaPill>
              <Button href="#final-cta" variant="ghost" className="px-3 py-2 text-xs">
                Share your stack
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =======================================================================================
   SECTION 8 — Pipeline (Connected)
======================================================================================= */

function PipelineConnected() {
  const stages = [
    { t: "Pre-Production", d: "Scope, prototype, art direction, tech plan.", gate: "Scope + risks aligned" },
    { t: "Vertical Slice", d: "Playable slice proving feel + pipeline.", gate: "Feel approved + budgets locked" },
    { t: "Production", d: "Systems, content, tools, weekly builds.", gate: "Milestone cadence stable" },
    { t: "Beta", d: "Optimization, stability, device matrix QA.", gate: "Perf + stability pass" },
    { t: "Launch & Live Ops", d: "Submission, events, analytics, updates.", gate: "Store-ready + ops plan" },
  ];

  return (
    <section id="production-pipeline" data-section="Pipeline (Connected Timeline)">
      <SectionHeader
        kicker={<Chip>Process</Chip>}
        title={
          <>
            How we ship — <AccentText>connected</AccentText> pipeline with gates.
          </>
        }
        lead="Each stage connects to the next: deliverables and gates keep progress visible and quality enforced."
        subtitle={
          <>
            This isn't a "five cards" list. It's a production track: each stage has a deliverable and an approval gate.
            Buyers get confidence because progress is visible and quality is enforced before launch crunch.
          </>
        }
        microRow={
          <>
            <MetaPill>Deliverables</MetaPill>
            <MetaPill>Approval gates</MetaPill>
            <MetaPill>Weekly demos</MetaPill>
          </>
        }
      />

      {/* Desktop: true connected track */}
      <div className="hidden lg:block">
        <div className="relative rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(900px 360px at 20% 20%, rgba(91,45,220,0.22), rgba(91,45,220,0) 60%)",
            }}
          />
          <div className="relative">
            {/* Connected track line */}
            <div className="absolute left-12 right-12 top-[48px] h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ boxShadow: "0 0 8px rgba(91,45,220,0.18)" }} />

            <div className="grid grid-cols-5 gap-6">
              {stages.map((s, i) => (
                <div key={i} className="relative">
                  {/* Numbered node */}
                  <div
                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-white/18 bg-white/[0.08] text-base font-semibold text-white"
                    style={{
                      boxShadow: "0 0 0 2px rgba(91,45,220,0.25), 0 0 32px rgba(91,45,220,0.20)",
                    }}
                  >
                    {i + 1}
                  </div>

                  {/* Stage card */}
                  <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                    <div className="text-sm font-semibold text-white">{s.t}</div>
                    <div className="mt-2 text-sm leading-relaxed text-white/70">{s.d}</div>

                    {/* Gate mini-box */}
                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                      <div className="text-[11px] text-white/55 tracking-wide uppercase">Gate</div>
                      <div className="mt-1 text-xs font-medium text-white/85">{s.gate}</div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <MetaPill>Weekly builds</MetaPill>
                      <MetaPill>Clear approvals</MetaPill>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <MetaPill>Transparent task board</MetaPill>
              <Button href="#final-cta" variant="ghost" className="px-3 py-2 text-xs">
                Discuss pipeline
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: vertical timeline with connector */}
      <div className="lg:hidden space-y-4">
        {stages.map((s, i) => (
          <div key={i} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div
              aria-hidden
              className="absolute inset-0 opacity-55"
              style={{
                background:
                  "radial-gradient(520px 260px at 20% 20%, rgba(91,45,220,0.16), rgba(91,45,220,0) 60%)",
              }}
            />
            <div className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-white/18 bg-white/[0.08] text-sm font-semibold text-white"
                  style={{
                    boxShadow: "0 0 0 2px rgba(91,45,220,0.25), 0 0 24px rgba(91,45,220,0.18)",
                  }}
                >
                  {i + 1}
                </div>
                {i !== stages.length - 1 ? (
                  <div className="mt-3 h-full w-[2px] bg-gradient-to-b from-white/20 via-white/12 to-transparent" style={{ boxShadow: "0 0 4px rgba(91,45,220,0.12)" }} />
                ) : null}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{s.t}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">{s.d}</div>
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="text-[11px] text-white/55 tracking-wide uppercase">Gate</div>
                  <div className="mt-1 text-xs font-medium text-white/85">{s.gate}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =======================================================================================
   SECTION 9 — Engagement Models
======================================================================================= */

function EngagementModels() {
  return (
    <section id="engagement-models" data-section="Engagement Models">
      <SectionHeader
        kicker={<Chip>Engagement</Chip>}
        title={
          <>
            Engagement models — built for <AccentText>procurement clarity</AccentText>.
          </>
        }
        subtitle={
          <>
            Choose the buying model that matches your scope and risk tolerance.
            We keep milestones explicit, approvals clean, and communication predictable.
          </>
        }
        microRow={
          <>
            <MetaPill>Fixed scope</MetaPill>
            <MetaPill>Dedicated pod</MetaPill>
            <MetaPill>Co-dev</MetaPill>
          </>
        }
      />

      <div className="grid gap-3 lg:grid-cols-3">
        {[
          {
            t: "Fixed Scope (Milestones)",
            d: "Clear requirements and defined deliverables with gates.",
            bullets: ["Milestone plan", "Acceptance criteria", "Predictable cost"],
          },
          {
            t: "Dedicated Pod (Monthly)",
            d: "Ongoing development with evolving scope and weekly builds.",
            bullets: ["Team pod", "Sprint cadence", "Fast iteration"],
          },
          {
            t: "Co-Dev / Augmentation",
            d: "Plug into your team for specific needs and ownership areas.",
            bullets: ["Feature squads", "Optimization passes", "Tools support"],
          },
        ].map((m, i) => (
          <div key={i} className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5">
            <div
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(560px 260px at 20% 20%, rgba(91,45,220,0.16), rgba(91,45,220,0) 60%)",
              }}
            />
            <div className="relative">
              <div className="text-sm font-semibold text-white">{m.t}</div>
              <div className="mt-2 text-sm text-white/70">{m.d}</div>
              <div className="mt-4 space-y-2">
                {m.bullets.map((b, idx) => (
                  <div key={idx} className="flex gap-2 text-sm text-white/75">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full" style={{ background: TOKENS.accent }} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                <div className="text-xs text-white/60">Typical pod</div>
                <div className="mt-1 text-xs text-white/75">PM • Engineer(s) • Artist/Tech Art • QA (as needed)</div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <MetaPill>NDA-friendly</MetaPill>
                <Button href="#final-cta" variant="ghost" className="px-3 py-2 text-xs">
                  Discuss model
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =======================================================================================
   SECTION 10 — FAQ
======================================================================================= */

function FAQ() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who owns the source code and assets?",
      a: "Typically, the client owns deliverables upon payment (contract-defined). We’re NDA-friendly and can align with your legal terms.",
    },
    {
      q: "Can you work with an existing codebase?",
      a: "Yes. We can audit, refactor, optimize, and extend existing projects with clear milestones and safe integration practices.",
    },
    {
      q: "How do you handle performance targets?",
      a: "We define budgets early (FPS/memory/load time) and run profiling passes throughout. Stability is treated as a first-class deliverable.",
    },
    {
      q: "Do you support multiplayer and live ops?",
      a: "Yes. We can implement/integrate online systems, persistence, analytics hooks, remote config, and update pipelines.",
    },
    {
      q: "What does communication look like?",
      a: "Weekly builds + demos, sprint cadence, transparent task board, and clear approval gates at every milestone.",
    },
  ];

  return (
    <section id="faq" data-section="FAQ">
      <SectionHeader
        kicker={<Chip>FAQ</Chip>}
        title={
          <>
            Ask anything — <AccentText>clear answers</AccentText>.
          </>
        }
        subtitle={
          <>
            This section is here to remove friction before the first call.
            Ownership, process, performance, and collaboration are addressed up front.
          </>
        }
      />

      <div className="grid gap-3 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <button
                  onClick={() => setOpen((v) => (v === i ? null : i))}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <div className="text-sm font-semibold text-white">{f.q}</div>
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white/80"
                    style={
                      isOpen
                        ? {
                            boxShadow:
                              "0 0 0 1px rgba(91,45,220,0.38), 0 0 26px rgba(91,45,220,0.18)",
                          }
                        : undefined
                    }
                  >
                    {isOpen ? "–" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1, transition: { duration: reduceMotion ? 0 : 0.22 } }}
                      exit={{ height: 0, opacity: 0, transition: { duration: reduceMotion ? 0 : 0.18 } }}
                    >
                      <div className="px-5 pb-5 text-sm leading-relaxed text-white/70">{f.a}</div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(650px 300px at 25% 20%, rgba(91,45,220,0.20), rgba(91,45,220,0) 60%)",
            }}
          />
          <div className="relative">
            <div className="text-sm font-semibold text-white">What you’ll receive</div>
            <div className="mt-3 space-y-2">
              {["A scoped plan with milestones", "A pod/team recommendation", "Platform + performance assumptions", "Timeline estimate + risks"].map(
                (b, i) => (
                  <div key={i} className="flex gap-2 text-sm text-white/75">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full" style={{ background: TOKENS.accent }} />
                    <span>{b}</span>
                  </div>
                )
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <MetaPill>Fast response</MetaPill>
              <MetaPill>Clear deliverables</MetaPill>
              <MetaPill>Senior oversight</MetaPill>
            </div>

            <div className="mt-6">
              <Button href="#final-cta" className="w-full">
                Request a proposal
              </Button>
              <Button href="#hero-game" variant="ghost" className="mt-2 w-full">
                Back to top
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =======================================================================================
   SECTION 11 — Final CTA
======================================================================================= */

function FinalCTA() {
  return (
    <section id="final-cta" data-section="Final CTA">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div
          aria-hidden
          className="absolute inset-0 opacity-75"
          style={{
            background:
              "radial-gradient(900px 360px at 20% 20%, rgba(91,45,220,0.28), rgba(91,45,220,0) 60%)",
          }}
        />
        <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <Chip>Start a project</Chip>
              <MetaPill>Games Studio</MetaPill>
            </div>
            <h3 className="mt-4 text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
              Tell us your platform, scope, and timeline — we’ll reply with a <AccentText>proposal plan</AccentText>.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70 sm:text-base">
              We’ll recommend the right engagement model, outline milestones, and share a delivery plan that matches your quality bar.
              If you already have a build, we can start with an audit and a stabilization roadmap.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <MetaPill>Weekly builds</MetaPill>
              <MetaPill>Performance budgets</MetaPill>
              <MetaPill>Device matrix QA</MetaPill>
              <MetaPill>NDA-friendly</MetaPill>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
            <div className="text-sm font-semibold text-white">Quick intake</div>
            <div className="mt-3 grid gap-2">
              <div className="grid grid-cols-2 gap-2">
                <select className="rounded-2xl border border-white/12 bg-white/[0.04] px-3 py-2 text-xs text-white/80 outline-none">
                  <option>Platform</option>
                  <option>Mobile</option>
                  <option>PC</option>
                  <option>Web</option>
                  <option>Console-ready</option>
                </select>
                <select className="rounded-2xl border border-white/12 bg-white/[0.04] px-3 py-2 text-xs text-white/80 outline-none">
                  <option>Scope</option>
                  <option>Prototype</option>
                  <option>Vertical slice</option>
                  <option>Full production</option>
                  <option>Optimization / Port</option>
                </select>
              </div>
              <select className="rounded-2xl border border-white/12 bg-white/[0.04] px-3 py-2 text-xs text-white/80 outline-none">
                <option>Timeline</option>
                <option>2–4 weeks</option>
                <option>1–3 months</option>
                <option>3–6 months</option>
                <option>6+ months</option>
              </select>

              <Button href="#" className="mt-1 w-full">
                Book a call
              </Button>
              <Button href="#" variant="ghost" className="w-full">
                Email us
              </Button>

              <div className="mt-2 text-center text-xs text-white/55">
                Replace CTAs with your real links (Calendly / mailto).
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
