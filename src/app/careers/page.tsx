"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Studio = "XR" | "Games" | "Hybrid";
type RoleType = "Full-time" | "Contract" | "Internship";
type Level = "Junior" | "Mid" | "Senior" | "Lead";
type WorkMode = "Remote" | "On-site" | "Hybrid";
type Department = "Engineering" | "Design" | "Art" | "Production" | "QA" | "Business" | "Operations";

type CaseTile = {
  id: string;
  title: string;
  studio: Studio;
  tags: string[];
  platform: string;
  thumb: string;
  hover: string;
};

type Role = {
  id: string;
  title: string;
  studio: Studio;
  department: Department;
  location: string;
  workMode: WorkMode;
  type: RoleType;
  level: Level;
  summary: string;
  mission: string;
  outcomes90: string[];
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  tools: string[];
  applyUrl?: string;
  updatedAt: string;
  featured?: boolean;
};

type Principle = {
  id: string;
  title: string;
  line: string;
  receipts: string[];
};

type Receipt = {
  id: string;
  type: "Demo Day" | "Design Review" | "Playtest" | "Client Feedback" | "Tooling" | "QA";
  title: string;
  detail: string;
  meta: string;
  studio: Studio | "All";
  thumb: string;
};

type LifeShot = {
  id: string;
  title: string;
  caption: string;
  studio: Studio | "All";
  src: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const BRAND = {
  bg: "#0C0722",
  xr: "#9EF315",
  games: "#7C3AED",
};

type Tone = "xr" | "games" | "hybrid";

function studioTone(studio: Studio): Tone {
  if (studio === "XR") return "xr";
  if (studio === "Games") return "games";
  return "hybrid";
}

function toneClasses(tone: Tone) {
  const rim =
    tone === "xr"
      ? "shadow-[0_0_0_1px_rgba(158,243,21,.26),0_20px_90px_rgba(158,243,21,.14),0_0_60px_rgba(158,243,21,.10)] hover:shadow-[0_0_0_1px_rgba(158,243,21,.42),0_26px_120px_rgba(158,243,21,.18),0_0_80px_rgba(158,243,21,.14)]"
      : tone === "games"
      ? "shadow-[0_0_0_1px_rgba(124,58,237,.26),0_20px_90px_rgba(124,58,237,.16),0_0_60px_rgba(124,58,237,.12)] hover:shadow-[0_0_0_1px_rgba(124,58,237,.42),0_26px_120px_rgba(124,58,237,.20),0_0_80px_rgba(124,58,237,.16)]"
      : "shadow-[0_0_0_1px_rgba(158,243,21,.16),0_0_0_1px_rgba(124,58,237,.16),0_20px_90px_rgba(124,58,237,.12),0_0_60px_rgba(158,243,21,.08)] hover:shadow-[0_0_0_1px_rgba(158,243,21,.28),0_0_0_1px_rgba(124,58,237,.28),0_26px_120px_rgba(124,58,237,.18),0_0_80px_rgba(158,243,21,.12)]";

  const chip =
    tone === "xr"
      ? "border-[rgba(158,243,21,.28)] text-[rgba(225,255,198,.96)] bg-[rgba(158,243,21,.10)]"
      : tone === "games"
      ? "border-[rgba(124,58,237,.28)] text-[rgba(235,226,255,.96)] bg-[rgba(124,58,237,.11)]"
      : "border-[rgba(255,255,255,.18)] text-[rgba(245,245,255,.92)] bg-[rgba(255,255,255,.07)]";

  const dot =
    tone === "xr"
      ? "bg-[rgba(158,243,21,.92)] shadow-[0_0_26px_rgba(158,243,21,.42)]"
      : tone === "games"
      ? "bg-[rgba(124,58,237,.92)] shadow-[0_0_26px_rgba(124,58,237,.42)]"
      : "bg-[linear-gradient(90deg,rgba(158,243,21,.92),rgba(124,58,237,.92))] shadow-[0_0_28px_rgba(124,58,237,.30)]";

  const bloom =
    tone === "xr"
      ? "bg-[radial-gradient(circle_at_24%_18%,rgba(158,243,21,.26),transparent_58%)]"
      : tone === "games"
      ? "bg-[radial-gradient(circle_at_24%_18%,rgba(124,58,237,.28),transparent_58%)]"
      : "bg-[radial-gradient(circle_at_20%_20%,rgba(158,243,21,.20),transparent_58%),radial-gradient(circle_at_82%_84%,rgba(124,58,237,.22),transparent_60%)]";

  const headline =
    tone === "xr"
      ? "from-[rgba(158,243,21,.98)] via-[rgba(255,255,255,.92)] to-[rgba(158,243,21,.78)]"
      : tone === "games"
      ? "from-[rgba(124,58,237,.98)] via-[rgba(255,255,255,.92)] to-[rgba(124,58,237,.78)]"
      : "from-[rgba(158,243,21,.98)] via-[rgba(255,255,255,.92)] to-[rgba(124,58,237,.98)]";

  const gradText =
    tone === "xr"
      ? "linear-gradient(90deg, rgba(158,243,21,.98), rgba(255,255,255,.92), rgba(158,243,21,.78))"
      : tone === "games"
      ? "linear-gradient(90deg, rgba(124,58,237,.98), rgba(255,255,255,.92), rgba(124,58,237,.78))"
      : "linear-gradient(90deg, rgba(158,243,21,.98), rgba(255,255,255,.92), rgba(124,58,237,.98))";

  return { rim, chip, dot, bloom, headline, gradText };
}

function BloomLayer({ tone }: { tone: Tone }) {
  const t = toneClasses(tone);
  return (
    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <div className={cx("absolute -inset-10", t.bloom)} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,0))] opacity-[0.55]" />
    </div>
  );
}

function Divider() {
  return <div className="h-px w-full bg-[linear-gradient(90deg,rgba(158,243,21,.0),rgba(255,255,255,.14),rgba(124,58,237,.0))]" />;
}

function Chip({ children, active, onClick, tone = "hybrid" }: { children: React.ReactNode; active?: boolean; onClick?: () => void; tone?: Tone }) {
  const t = toneClasses(tone);
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "px-3 py-1.5 rounded-full border text-xs md:text-[13px] transition-all",
        active ? cx("shadow-[0_0_0_1px_rgba(255,255,255,.10),0_10px_40px_rgba(0,0,0,.25)]", t.chip) : "border-white/14 text-white/70 bg-white/[0.04] hover:bg-white/[0.07] hover:text-white/85"
      )}
    >
      {children}
    </button>
  );
}

function SectionTitle({ eyebrow, title, desc, accent = "hybrid" }: { eyebrow: string; title: string; desc?: string; accent?: Tone }) {
  const t = toneClasses(accent);
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center gap-3">
        <span className={cx("h-[10px] w-[10px] rounded-full", t.dot)} />
        <div className="text-xs tracking-[0.28em] uppercase text-white/60">{eyebrow}</div>
      </div>
      <h2 className="text-2xl md:text-4xl font-semibold text-white/95 leading-tight">{title}</h2>
      {desc ? <p className="mt-2 max-w-3xl text-sm text-white/70 md:text-base">{desc}</p> : null}
    </div>
  );
}

const CASES: CaseTile[] = [
  {
    id: "case-xr-safety",
    title: "Safety Training XR Module",
    studio: "XR",
    platform: "Meta Quest",
    tags: ["Simulation", "Telemetry", "Ops-ready"],
    thumb: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1600&q=70",
    hover: "Own interaction loops, performance budgets, and measurable training outcomes.",
  },
  {
    id: "case-xr-digital-twin",
    title: "Digital Twin Walkthrough",
    studio: "XR",
    platform: "PCVR",
    tags: ["Real-time", "3D pipeline", "UX clarity"],
    thumb: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=70",
    hover: "Ship navigation, annotation tools, and enterprise-grade stability.",
  },
  {
    id: "case-games-combat",
    title: "Combat Prototype → Polish",
    studio: "Games",
    platform: "PC",
    tags: ["Gameplay feel", "Iteration", "QA loop"],
    thumb: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1600&q=70",
    hover: "Build systems with great feel, debug tooling, and fast tuning loops.",
  },
  {
    id: "case-games-world",
    title: "World Slice + Art Direction",
    studio: "Games",
    platform: "Console/PC",
    tags: ["World-building", "Lighting", "Performance"],
    thumb: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1600&q=70",
    hover: "Own a feature lane, collaborate with art/design, keep perf stable.",
  },
  {
    id: "case-hybrid-ui",
    title: "Studio Systems Dashboard",
    studio: "Hybrid",
    platform: "Web",
    tags: ["Design system", "Workflow", "Polish"],
    thumb: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=70",
    hover: "Design/ship workflow UI that reduces friction and scales across teams.",
  },
  {
    id: "case-hybrid-pipeline",
    title: "Production Pipeline Upgrade",
    studio: "Hybrid",
    platform: "Process",
    tags: ["Milestones", "Docs", "Delivery"],
    thumb: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=70",
    hover: "Run calm production: clarity, risk logs, milestones, release confidence.",
  },
];

const RECEIPTS: Receipt[] = [
  {
    id: "r-demo",
    type: "Demo Day",
    title: "Weekly Demo Day",
    detail: "We ship small, show progress, and make decisions with evidence.",
    meta: "Every cycle • cross-team review • short notes",
    studio: "All",
    thumb: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=70",
  },
  {
    id: "r-review",
    type: "Design Review",
    title: "Critique with taste",
    detail: "Clear bar, constructive feedback, and a bias toward polish.",
    meta: "UI/UX + 3D • weekly",
    studio: "Hybrid",
    thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=70",
  },
  {
    id: "r-playtest",
    type: "Playtest",
    title: "Playtest notes that matter",
    detail: "We measure ‘feel’ by iteration speed and clarity.",
    meta: "Games lane • rapid tuning loops",
    studio: "Games",
    thumb: "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&w=1600&q=70",
  },
  {
    id: "r-qa",
    type: "QA",
    title: "Release confidence",
    detail: "Acceptance criteria + reproduction clarity + stable builds.",
    meta: "Milestones • checklists • triage",
    studio: "All",
    thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=70",
  },
  {
    id: "r-tooling",
    type: "Tooling",
    title: "Debug tools / cheats",
    detail: "We invest in iteration speed so craft doesn’t suffer.",
    meta: "Engine tooling • profiling • automation",
    studio: "All",
    thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=70",
  },
  {
    id: "r-client",
    type: "Client Feedback",
    title: "Trust-forward delivery",
    detail: "Calm comms, crisp docs, and no surprises.",
    meta: "Enterprise-ready • delivery discipline",
    studio: "All",
    thumb: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=70",
  },
];

const PRINCIPLES: Principle[] = [
  {
    id: "p-craft",
    title: "Craft, not chaos",
    line: "High standards, calm production, and deliberate polish.",
    receipts: ["r-review", "r-qa"],
  },
  {
    id: "p-ship",
    title: "Ship with discipline",
    line: "Milestones, demos, and measurable outcomes.",
    receipts: ["r-demo", "r-client"],
  },
  {
    id: "p-ownership",
    title: "Ownership is the default",
    line: "Small teams. Real responsibility. Clear expectations.",
    receipts: ["r-demo", "r-tooling"],
  },
  {
    id: "p-iteration",
    title: "Iteration wins",
    line: "We invest in tooling and loops that make quality practical.",
    receipts: ["r-tooling", "r-playtest"],
  },
];

const ROLES: Role[] = [
  {
    id: "role-xr-unity",
    title: "XR Unity Engineer",
    studio: "XR",
    department: "Engineering",
    location: "Pakistan",
    workMode: "Hybrid",
    type: "Full-time",
    level: "Mid",
    summary: "Own interaction systems + performance for production XR training.",
    mission: "Build reliable XR interaction systems that feel natural, run smoothly, and support measurable training outcomes.",
    outcomes90: [
      "Ship a complete interaction loop with telemetry hooks.",
      "Reduce frame-time spikes via profiling and targeted optimizations.",
      "Deliver reusable prefabs + short docs for future modules.",
    ],
    responsibilities: [
      "Implement XR interactions (hands/controllers), UI/state flows.",
      "Optimize for headset constraints (Quest/PCVR).",
      "Partner with design/art to keep UX clear and fidelity high.",
      "Ship production-ready code with clean architecture.",
    ],
    requirements: [
      "2+ years Unity (C#) with shipped real-time projects.",
      "Strong debugging/profiling habits.",
      "Clean system design and reuse mindset.",
      "Portfolio showing ownership and iteration.",
    ],
    niceToHave: ["OpenXR, XR Interaction Toolkit.", "Quest performance experience.", "Analytics/event design."],
    tools: ["Unity", "C#", "OpenXR", "Quest", "Git", "Jira"],
    applyUrl: "https://forms.gle/REPLACE_WITH_YOUR_GOOGLE_FORM",
    updatedAt: "2025-12-18",
    featured: true,
  },
  {
    id: "role-games-unreal",
    title: "Unreal Gameplay Programmer",
    studio: "Games",
    department: "Engineering",
    location: "Remote",
    workMode: "Remote",
    type: "Contract",
    level: "Senior",
    summary: "Ship gameplay systems with great feel, iteration speed, and stability.",
    mission: "Build gameplay systems that are fun, responsive, and maintainable — with fast tuning loops across design and QA.",
    outcomes90: [
      "Ship one major feature: prototype → polish → release-ready.",
      "Improve iteration speed via debug tooling / cheats.",
      "Contribute to performance and stability milestones.",
    ],
    responsibilities: [
      "Implement gameplay features in Unreal (C++/Blueprints).",
      "Collaborate with design to tune feel and pacing.",
      "Own debugging, profiling, and perf improvements.",
      "Support build stability and bug triage.",
    ],
    requirements: ["Strong Unreal experience (C++ or advanced Blueprint).", "Shipped games/production work.", "Ownership mindset."],
    niceToHave: ["GAS familiarity.", "Networked gameplay basics.", "Console profiling experience."],
    tools: ["Unreal", "C++", "Blueprints", "Perforce/Git", "Profilers"],
    applyUrl: "https://forms.gle/REPLACE_WITH_YOUR_GOOGLE_FORM",
    updatedAt: "2025-12-10",
    featured: true,
  },
  {
    id: "role-prod-lead",
    title: "Producer / Project Lead",
    studio: "Hybrid",
    department: "Production",
    location: "UAE",
    workMode: "Hybrid",
    type: "Full-time",
    level: "Lead",
    summary: "Run milestones, reduce chaos, keep quality high across teams.",
    mission: "Enable teams to ship on time with clarity — great planning, crisp communication, and strong acceptance standards.",
    outcomes90: [
      "Introduce a milestone cadence with crisp definitions of done.",
      "Reduce cycle slippage via risk logs and weekly reviews.",
      "Create a lightweight production playbook tailored to Wodh.",
    ],
    responsibilities: [
      "Own scheduling, scope, and delivery communication.",
      "Facilitate reviews, standups, decision logs.",
      "Coordinate QA, acceptance criteria, releases.",
      "Improve process without slowing the team down.",
    ],
    requirements: ["Proven production leadership.", "Excellent written communication.", "Client-facing delivery comfort."],
    niceToHave: ["Games/XR production experience.", "Pragmatic agile experience."],
    tools: ["Jira", "Notion", "Docs", "Boards"],
    applyUrl: "https://forms.gle/REPLACE_WITH_YOUR_GOOGLE_FORM",
    updatedAt: "2025-12-02",
    featured: true,
  },
  {
    id: "role-design-systems",
    title: "Product Designer (Studio Systems)",
    studio: "Hybrid",
    department: "Design",
    location: "Pakistan",
    workMode: "On-site",
    type: "Full-time",
    level: "Senior",
    summary: "Design premium workflow UI for tools, dashboards, and pipelines.",
    mission: "Design interfaces that reduce friction and scale across teams — from internal tools to client-facing dashboards.",
    outcomes90: [
      "Deliver a design system extension aligned to Wodh v1.",
      "Ship one workflow redesign with measurable speed-up.",
      "Align stakeholders via crisp prototypes and docs.",
    ],
    responsibilities: [
      "Own UX from discovery to polished UI.",
      "Prototype fast, then refine for premium finish.",
      "Build reusable components/tokens/guidelines.",
      "Partner with engineers for pixel-perfect implementation.",
    ],
    requirements: ["Strong portfolio of systems/UI work.", "Typography/layout craft.", "Shipped work with engineers."],
    niceToHave: ["Motion/interaction design.", "XR UX familiarity.", "Figma component mastery."],
    tools: ["Figma", "Design Systems", "Prototyping", "Docs"],
    applyUrl: "https://forms.gle/REPLACE_WITH_YOUR_GOOGLE_FORM",
    updatedAt: "2025-11-28",
  },
];

const FEATURED_ROLES = ROLES.filter((r) => r.featured).map((r) => ({
  id: r.id,
  title: r.title,
  studio: r.studio,
  meta: `${r.workMode} • ${r.location} • ${r.type}`,
}));

const EXEC = [
  { name: "CEO", role: "Studio Direction", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=70" },
  { name: "CTO", role: "Engineering Systems", img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=900&q=70" },
  { name: "Head of XR", role: "Training & Simulation", img: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=900&q=70" },
  { name: "Head of Games", role: "Gameplay & Production", img: "https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&w=900&q=70" },
];

const CREW = Array.from({ length: 12 }).map((_, i) => ({
  name: `Team Member ${i + 1}`,
  role: ["Engineer", "Designer", "Artist", "Producer", "QA"][i % 5],
  img: [
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=70",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=70",
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=70",
    "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=800&q=70",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=800&q=70",
  ][i % 5],
}));

const LIFE_AT_WODH: LifeShot[] = [
  {
    id: "life-1",
    title: "Demo Day",
    caption: "Weekly shipping ritual — show, decide, move.",
    studio: "Hybrid",
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "life-2",
    title: "Design Critique",
    caption: "Taste + clarity. No vague feedback.",
    studio: "Hybrid",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "life-3",
    title: "XR Build Check",
    caption: "Comfort budgets, perf profiling, stable handoffs.",
    studio: "XR",
    src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "life-4",
    title: "Playtest Friday",
    caption: "Feel is a product. Notes get shipped.",
    studio: "Games",
    src: "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "life-5",
    title: "Studio Corners",
    caption: "Quiet focus + clean setups = better work.",
    studio: "All",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=70",
  },
  {
    id: "life-6",
    title: "Client Review",
    caption: "Trust-forward delivery. No surprises.",
    studio: "All",
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=70",
  },
];

function HeroCover({ onJump, rolesRef, cultureRef }: { onJump: (ref: React.RefObject<HTMLDivElement>) => void; rolesRef: React.RefObject<HTMLDivElement>; cultureRef: React.RefObject<HTMLDivElement>; }) {
  const hybrid = toneClasses("hybrid");
  const xr = toneClasses("xr");
  const games = toneClasses("games");

  return (
    <>
      <style>{`
        @keyframes wodhMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .wodh-marquee {
          animation: wodhMarquee 18s linear infinite;
        }
        .wodh-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute -top-28 -left-28 h-80 w-80 rounded-full" style={{ background: "radial-gradient(circle, rgba(158,243,21,.28), transparent 60%)" }} />
        <div className="pointer-events-none absolute -bottom-28 -right-28 h-96 w-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,.30), transparent 60%)" }} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,0))]" />

        <div className="relative border-b border-white/10 bg-black/25 backdrop-blur-md">
          <div className="flex flex-col gap-3 px-6 py-5 md:px-9 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className={cx("h-[10px] w-[10px] rounded-full", hybrid.dot)} />
              <div className="text-[11px] tracking-[0.38em] uppercase text-white/60">Wodh Guild</div>
              <span className="text-white/30">•</span>
              <div className="text-[11px] tracking-[0.38em] uppercase text-white/50">Careers Issue</div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Chip active tone="hybrid">
                Studio Magazine
              </Chip>
              <Chip active tone="xr">
                XR
              </Chip>
              <Chip active tone="games">
                Games
              </Chip>
              <Chip>Pakistan • UAE • UK • USA</Chip>
            </div>
          </div>
        </div>

        <div className="relative p-7 md:p-10">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:items-stretch">
            <div className="flex min-w-0 flex-col justify-between">
              <div>
                <h1 className="text-3xl md:text-6xl font-semibold leading-[1.02] tracking-[-0.03em] text-white/95">
                  The studio that hires for{" "}
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: hybrid.gradText }}>
                    ownership
                  </span>
                  .
                </h1>

                <p className="mt-4 max-w-xl text-sm text-white/70 md:text-lg">
                  Demos, critique, playtests, and calm delivery. This page reads like a studio magazine — because that’s how we work.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {[
                    { tone: "xr" as Tone, head: "Feature", line: "XR training systems that scale", sub: "comfort • perf budgets • outcomes" },
                    { tone: "games" as Tone, head: "Feature", line: "Gameplay feel: prototype → polish", sub: "tooling • tuning loops • QA stability" },
                    { tone: "hybrid" as Tone, head: "Column", line: "Ship without chaos", sub: "milestones • decision logs • crisp docs" },
                    { tone: "hybrid" as Tone, head: "Open Pods", line: "High-signal roles this month", sub: "engineers • producers • designers" },
                  ].map((x) => (
                    <motion.div key={x.line} whileHover={{ y: -2 }} className={cx("group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition", toneClasses(x.tone).rim)}>
                      <BloomLayer tone={x.tone} />
                      <div className="relative">
                        <div className="text-[11px] tracking-[0.34em] uppercase text-white/55">{x.head}</div>
                        <div className="mt-2 text-sm font-semibold text-white/92 md:text-base">{x.line}</div>
                        <div className="mt-1 text-xs text-white/60">{x.sub}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onJump(rolesRef)}
                    className={cx(
                      "h-11 rounded-xl bg-white px-5 text-sm font-medium text-black transition hover:bg-white/90",
                      "shadow-[0_0_0_1px_rgba(255,255,255,.14),0_22px_110px_rgba(158,243,21,.16),0_18px_100px_rgba(124,58,237,.16)]",
                      "hover:shadow-[0_0_0_1px_rgba(255,255,255,.18),0_28px_140px_rgba(158,243,21,.22),0_22px_120px_rgba(124,58,237,.22)]"
                    )}
                  >
                    Open roles
                  </button>

                  <button
                    onClick={() => onJump(cultureRef)}
                    className={cx(
                      "h-11 rounded-xl border border-white/14 bg-white/[0.04] px-5 text-sm text-white/92 transition hover:bg-white/[0.08]",
                      "shadow-[0_0_0_1px_rgba(158,243,21,.14),0_0_0_1px_rgba(124,58,237,.14)]"
                    )}
                  >
                    How we work
                  </button>

                  <div className="text-xs text-white/55">Apply via role link (ATS/Google Form). Talent Network = future fits.</div>
                </div>
              </div>

              <div className="mt-7 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-[11px] tracking-[0.34em] uppercase text-white/55">Role ticker</div>

                <div className="relative mt-3 overflow-hidden">
                  <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-[linear-gradient(90deg,rgba(12,7,34,1),rgba(12,7,34,0))]" />
                  <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-[linear-gradient(270deg,rgba(12,7,34,1),rgba(12,7,34,0))]" />

                  <div className="w-full">
                    <div className="wodh-marquee flex w-[200%] gap-2">
                      {[...FEATURED_ROLES, ...FEATURED_ROLES].map((r, i) => {
                        const tone = studioTone(r.studio);
                        const t = toneClasses(tone);
                        return (
                          <button
                            key={`${r.id}-${i}`}
                            className={cx("group relative shrink-0 overflow-hidden rounded-full border px-3 py-2 text-left transition", "border-white/12 bg-white/[0.03] hover:bg-white/[0.06]", t.rim)}
                            onClick={() => onJump(rolesRef)}
                            type="button"
                          >
                            <BloomLayer tone={tone} />
                            <div className="relative">
                              <div className="text-xs font-medium text-white/90">{r.title}</div>
                              <div className="text-[11px] text-white/60">{r.meta}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-white/45">Hover to pause • Click to jump to roles</div>
              </div>
            </div>

            <div className="flex h-full min-h-0 flex-col rounded-[26px] border border-white/10 bg-white/[0.03] p-4 md:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] tracking-[0.34em] uppercase text-white/55">Chapters</div>
                  <div className="mt-1 text-sm text-white/70">Two studios • one guild</div>
                </div>
                <div className="flex gap-2">
                  <span className={cx("rounded-full border px-2.5 py-1 text-xs", xr.chip)}>XR</span>
                  <span className={cx("rounded-full border px-2.5 py-1 text-xs", games.chip)}>Games</span>
                </div>
              </div>

              <div className="mt-3 flex min-h-0 flex-1 flex-col gap-3">
                <motion.button type="button" whileHover={{ y: -2 }} onClick={() => onJump(rolesRef)} className={cx("group relative flex-1 min-h-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] text-left", xr.rim)}>
                  <BloomLayer tone="xr" />
                  <div
                    className="absolute inset-0 opacity-[0.92]"
                    style={{
                      backgroundImage: "linear-gradient(180deg, rgba(12,7,34,.10), rgba(12,7,34,.90)), url(https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=2200&q=70)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="relative flex h-full flex-col justify-between p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[11px] tracking-[0.38em] uppercase text-white/60">Chapter 01</div>
                        <div className="mt-2 text-lg font-semibold text-white/95 md:text-xl">XR Studio</div>
                        <div className="mt-1 text-sm text-white/72">Training • Simulation • Digital twins</div>
                      </div>

                      <div className={cx("grid h-12 w-12 place-items-center rounded-2xl border border-white/12", xr.chip)}>
                        <span className="text-[11px] font-semibold tracking-[0.28em] text-white/90">XR</span>
                      </div>
                    </div>

                    <div className="mt-3 rounded-2xl border border-white/12 bg-black/40 px-4 py-3">
                      <div className="text-[11px] tracking-[0.34em] uppercase text-white/60">Issue notes</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {["Comfort budgets", "Profiling discipline", "Outcome-led"].map((x) => (
                          <span key={x} className={cx("rounded-full border px-2.5 py-1 text-xs", xr.chip)}>
                            {x}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>

                <motion.button type="button" whileHover={{ y: -2 }} onClick={() => onJump(rolesRef)} className={cx("group relative flex-1 min-h-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] text-left", games.rim)}>
                  <BloomLayer tone="games" />
                  <div
                    className="absolute inset-0 opacity-[0.92]"
                    style={{
                      backgroundImage: "linear-gradient(180deg, rgba(12,7,34,.10), rgba(12,7,34,.90)), url(https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2200&q=70)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="relative flex h-full flex-col justify-between p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[11px] tracking-[0.38em] uppercase text-white/60">Chapter 02</div>
                        <div className="mt-2 text-lg font-semibold text-white/95 md:text-xl">Games Studio</div>
                        <div className="mt-1 text-sm text-white/72">Gameplay • Worlds • Production</div>
                      </div>

                      <div className={cx("grid h-12 w-12 place-items-center rounded-2xl border border-white/12", games.chip)}>
                        <span className="text-[11px] font-semibold tracking-[0.28em] text-white/90">GM</span>
                      </div>
                    </div>

                    <div className="mt-3 rounded-2xl border border-white/12 bg-black/40 px-4 py-3">
                      <div className="text-[11px] tracking-[0.34em] uppercase text-white/60">Issue notes</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {["Prototype → polish", "Debug tooling", "Stability rituals"].map((x) => (
                          <span key={x} className={cx("rounded-full border px-2.5 py-1 text-xs", games.chip)}>
                            {x}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              </div>

              <div className="mt-3 text-[11px] text-white/45">50/50 cover split • chapters share height • magazine density</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CareersWodhGuildStudioMagazine() {
  const [activeStudio, setActiveStudio] = useState<Studio | "All">("All");
  const [activePrincipleId, setActivePrincipleId] = useState(PRINCIPLES[0]?.id ?? "p-craft");
  const [selectedRoleId, setSelectedRoleId] = useState<string>(ROLES.find((r) => r.featured)?.id ?? ROLES[0]?.id ?? "");
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const coverRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);
  const chaptersRef = useRef<HTMLDivElement | null>(null);
  const cultureRef = useRef<HTMLDivElement | null>(null);
  const rolesRef = useRef<HTMLDivElement | null>(null);
  const peopleRef = useRef<HTMLDivElement | null>(null);
  const lifeRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const activePrinciple = useMemo(() => PRINCIPLES.find((p) => p.id === activePrincipleId) ?? PRINCIPLES[0], [activePrincipleId]);

  const receiptsForPrinciple = useMemo(() => {
    const ids = new Set(activePrinciple?.receipts ?? []);
    return RECEIPTS.filter((r) => ids.has(r.id)).filter((r) => activeStudio === "All" || r.studio === "All" || r.studio === activeStudio);
  }, [activePrinciple, activeStudio]);

  const casesFiltered = useMemo(() => CASES.filter((c) => (activeStudio === "All" ? true : c.studio === activeStudio)), [activeStudio]);

  const featuredRoles = useMemo(() => {
    const list = ROLES.filter((r) => r.featured);
    return activeStudio === "All" ? list : list.filter((r) => r.studio === activeStudio);
  }, [activeStudio]);

  const allRoles = useMemo(() => {
    const list = activeStudio === "All" ? ROLES : ROLES.filter((r) => r.studio === activeStudio);
    return [...list].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0));
  }, [activeStudio]);

  const selectedRole = useMemo(() => ROLES.find((r) => r.id === selectedRoleId) ?? ROLES[0], [selectedRoleId]);

  function jumpTo(ref: React.RefObject<HTMLDivElement>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function apply(role: Role) {
    if (role.applyUrl) window.open(role.applyUrl, "_blank", "noopener,noreferrer");
    else alert("Apply link not configured. Add applyUrl to the role data.");
  }

  const nav = [
    { k: "Cover", ref: coverRef },
    { k: "Work", ref: workRef },
    { k: "Chapters", ref: chaptersRef },
    { k: "Culture", ref: cultureRef },
    { k: "Roles", ref: rolesRef },
    { k: "People", ref: peopleRef },
    { k: "Life", ref: lifeRef },
    { k: "FAQ", ref: faqRef },
  ];

  const navAccent: Tone = activeStudio === "All" ? "hybrid" : studioTone(activeStudio);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: BRAND.bg }}>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(1200px 820px at 12% 10%, rgba(158,243,21,0.20), transparent 56%),
              radial-gradient(1150px 980px at 88% 92%, rgba(124,58,237,0.22), transparent 58%),
              radial-gradient(900px 520px at 45% 55%, rgba(255,255,255,0.06), transparent 60%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
            backgroundSize: "76px 76px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"180\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"180\" height=\"180\" filter=\"url(%23n)\" opacity=\"0.55\"/></svg>')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,7,34,0.0)_0%,rgba(12,7,34,0.42)_45%,rgba(12,7,34,0.84)_100%)]" />
      </div>

      <main className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="sticky top-3 z-30 pt-3">
          <div className="rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md px-3 py-2 shadow-[0_18px_70px_rgba(0,0,0,.35)]">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-between gap-3 md:justify-start">
                <div className="text-xs tracking-[0.28em] uppercase text-white/55">Wodh Guild • Careers</div>
                <div className="hidden items-center gap-2 md:flex">
                  <span className={cx("h-[6px] w-[6px] rounded-full", toneClasses(navAccent).dot)} />
                  <span className="text-xs text-white/60">Studio Magazine</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {nav.map((n) => (
                  <button
                    key={n.k}
                    onClick={() => jumpTo(n.ref)}
                    className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-xs text-white/75 transition hover:bg-white/[0.07] hover:text-white/90"
                  >
                    {n.k}
                  </button>
                ))}
                <span className="mx-1 hidden h-4 w-px bg-white/10 md:block" />
                <Chip tone="xr" active={activeStudio === "XR"} onClick={() => setActiveStudio((s) => (s === "XR" ? "All" : "XR"))}>
                  XR
                </Chip>
                <Chip tone="games" active={activeStudio === "Games"} onClick={() => setActiveStudio((s) => (s === "Games" ? "All" : "Games"))}>
                  Games
                </Chip>
                <Chip tone="hybrid" active={activeStudio === "Hybrid"} onClick={() => setActiveStudio((s) => (s === "Hybrid" ? "All" : "Hybrid"))}>
                  Hybrid
                </Chip>
              </div>
            </div>
          </div>
        </div>

        <section className="pb-12 pt-10 md:pt-16" ref={coverRef}>
          <HeroCover onJump={jumpTo} rolesRef={rolesRef} cultureRef={cultureRef} />
        </section>

        <Divider />

        <section className="py-14 md:py-18" ref={workRef}>
          <SectionTitle eyebrow="The Work" title="Work we’re proud of" desc="A tastefully curated slice. Hover to see what you’d own on projects like these." accent={navAccent} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {casesFiltered.map((c) => {
              const tone = studioTone(c.studio);
              const t = toneClasses(tone);
              return (
                <motion.div key={c.id} whileHover={{ y: -2 }} className={cx("group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] min-h-[260px]", t.rim)}>
                  <BloomLayer tone={tone} />
                  <div
                    className="absolute inset-0 opacity-[0.88]"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(12,7,34,.22), rgba(12,7,34,.84)), url(${c.thumb})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="relative p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className={cx("rounded-full border px-2.5 py-1 text-xs", t.chip)}>{c.studio}</span>
                      <span className="text-xs text-white/60">{c.platform}</span>
                    </div>
                    <div className="mt-4 text-lg font-semibold text-white/92">{c.title}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.tags.map((x) => (
                        <span key={x} className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-xs text-white/78">
                          {x}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 translate-y-2 rounded-2xl border border-white/10 bg-black/40 p-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="text-xs tracking-[0.28em] uppercase text-white/55">You’d do</div>
                      <div className="mt-2 text-sm leading-relaxed text-white/78">{c.hover}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <Divider />

        <section className="py-14 md:py-18" ref={chaptersRef}>
          <SectionTitle eyebrow="Chapters" title="Two studios, one bar" desc="Same discipline. Different craft focus. Choose your lane — or build across both." accent="hybrid" />

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[260px_1fr]">
            <div className="lg:sticky lg:top-20">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs tracking-[0.28em] uppercase text-white/55">Reading index</div>
                <div className="mt-3 flex flex-col gap-2">
                  <button
                    className={cx(
                      "text-left rounded-2xl border px-3 py-2 transition",
                      "border-[rgba(158,243,21,.22)] bg-[rgba(158,243,21,.08)] text-white/92 hover:bg-[rgba(158,243,21,.12)]"
                    )}
                    onClick={() => setActiveStudio("XR")}
                  >
                    <div className="text-sm font-medium">Chapter 01 — XR</div>
                    <div className="mt-0.5 text-xs text-white/65">Training • Simulation • Twins</div>
                  </button>
                  <button
                    className={cx(
                      "text-left rounded-2xl border px-3 py-2 transition",
                      "border-[rgba(124,58,237,.22)] bg-[rgba(124,58,237,.08)] text-white/92 hover:bg-[rgba(124,58,237,.12)]"
                    )}
                    onClick={() => setActiveStudio("Games")}
                  >
                    <div className="text-sm font-medium">Chapter 02 — Games</div>
                    <div className="mt-0.5 text-xs text-white/65">Gameplay • Worlds • Production</div>
                  </button>
                  <button
                    className="text-left rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-2 text-white/92 transition hover:bg-white/[0.06]"
                    onClick={() => setActiveStudio("Hybrid")}
                  >
                    <div className="text-sm font-medium">Chapter 03 — Hybrid</div>
                    <div className="mt-0.5 text-xs text-white/65">Systems • Pipeline • Tools</div>
                  </button>
                  <button className="mt-2 rounded-2xl border border-white/12 bg-white/[0.03] px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.07]" onClick={() => setActiveStudio("All")}>
                    Clear filter
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <ChapterBlock
                studio="XR"
                headline="XR Studio — training that scales"
                sub="Production-ready XR training with measurable outcomes, built for real headset constraints."
                bullets={[
                  "Safety & compliance modules with realistic interaction loops.",
                  "Performance budgets that keep comfort and fidelity balanced.",
                  "Reusable prefabs, documentation, and device-ready delivery.",
                ]}
                chips={["Unity", "OpenXR", "Quest", "Perf profiling", "Telemetry"]}
              />
              <ChapterBlock
                studio="Games"
                headline="Games Studio — feel and craft"
                sub="Gameplay systems with taste — iteration speed, stability, and polish that holds up."
                bullets={[
                  "Mechanics with great feel: prototype → tune → polish.",
                  "Tooling that keeps iteration fast and quality practical.",
                  "Release confidence through QA loops and build stability.",
                ]}
                chips={["Unreal", "C++/Blueprints", "Playtests", "Debug tools", "Stability"]}
              />
              <ChapterBlock
                studio="Hybrid"
                headline="Hybrid — systems that enable shipping"
                sub="Design systems, dashboards, and production workflows that reduce chaos without slowing the team."
                bullets={[
                  "Workflow UI that removes friction and scales across teams.",
                  "Documentation discipline: decisions stay searchable and clear.",
                  "Production rituals that keep outcomes measurable and calm.",
                ]}
                chips={["Design Systems", "Docs", "QA", "Pipeline", "Delivery"]}
              />
            </div>
          </div>
        </section>

        <Divider />

        <section className="py-14 md:py-18" ref={cultureRef}>
          <SectionTitle eyebrow="Culture" title="Principles, backed by receipts" desc="Not “values posters.” We show how we work with real proof artifacts." accent="hybrid" />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.05fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
              <div className="text-xs tracking-[0.28em] uppercase text-white/55">Principles</div>
              <div className="mt-3 space-y-2">
                {PRINCIPLES.map((p) => {
                  const open = p.id === activePrincipleId;
                  return (
                    <div key={p.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                      <button className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-white/[0.06]" onClick={() => setActivePrincipleId(p.id)} type="button">
                        <div>
                          <div className="text-sm font-medium text-white/90 md:text-base">{p.title}</div>
                          <div className="mt-1 text-xs text-white/60">{p.line}</div>
                        </div>
                        <div className="text-white/60">{open ? "–" : "+"}</div>
                      </button>
                      <AnimatePresence initial={false}>
                        {open ? (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}>
                            <div className="px-4 pb-4 text-sm leading-relaxed text-white/72">We keep it operational: short notes, decisions logged, and demos that drive alignment.</div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Chip active={activeStudio === "All"} onClick={() => setActiveStudio("All")}>
                  All
                </Chip>
                <Chip tone="xr" active={activeStudio === "XR"} onClick={() => setActiveStudio("XR")}>
                  XR
                </Chip>
                <Chip tone="games" active={activeStudio === "Games"} onClick={() => setActiveStudio("Games")}>
                  Games
                </Chip>
                <Chip tone="hybrid" active={activeStudio === "Hybrid"} onClick={() => setActiveStudio("Hybrid")}>
                  Hybrid
                </Chip>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs tracking-[0.28em] uppercase text-white/55">Receipts</div>
                  <div className="mt-1 text-sm text-white/70">Artifacts that prove the principle.</div>
                </div>
                <div className="text-xs text-white/55">{receiptsForPrinciple.length} items</div>
              </div>

              <div className="mt-4 space-y-3">
                {receiptsForPrinciple.map((r) => (
                  <ReceiptCard key={r.id} r={r} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        <section className="py-14 md:py-18" ref={rolesRef}>
          <SectionTitle eyebrow="Roles" title="Recruitment deck" desc="Pick a role pod. Open a full role sheet (mission, outcomes, signals). Apply via the role link." accent={navAccent} />

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_1.15fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs tracking-[0.28em] uppercase text-white/55">Featured pods</div>
                  <div className="mt-1 text-sm text-white/70">High-priority lanes we’re hiring for.</div>
                </div>
                <button
                  onClick={() => {
                    setActiveStudio("All");
                    setSelectedRoleId(ROLES.find((r) => r.featured)?.id ?? ROLES[0].id);
                  }}
                  className="h-9 rounded-xl border border-white/12 bg-white/[0.04] px-3 text-xs text-white/85 transition hover:bg-white/[0.08]"
                  type="button"
                >
                  Reset
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {featuredRoles.map((role) => (
                  <RolePod
                    key={role.id}
                    role={role}
                    active={role.id === selectedRoleId}
                    onClick={() => {
                      setSelectedRoleId(role.id);
                      if (isMobile) setMobileSheetOpen(true);
                    }}
                  />
                ))}

                {featuredRoles.length === 0 ? <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm text-white/70">No featured roles in this studio filter. Clear filter to see all.</div> : null}
              </div>

              <div className="mt-5">
                <div className="text-xs tracking-[0.28em] uppercase text-white/55">All roles</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {allRoles.map((r) => (
                    <Chip
                      key={r.id}
                      tone={studioTone(r.studio)}
                      active={r.id === selectedRoleId}
                      onClick={() => {
                        setSelectedRoleId(r.id);
                        if (isMobile) setMobileSheetOpen(true);
                      }}
                    >
                      {r.title}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              {selectedRole ? <RoleSheet role={selectedRole} onApply={() => apply(selectedRole)} /> : <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-white/70">Select a role to open the sheet.</div>}
            </div>
          </div>

          <AnimatePresence>
            {isMobile && mobileSheetOpen && selectedRole ? (
              <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="absolute inset-0 bg-black/60" onClick={() => setMobileSheetOpen(false)} />
                <motion.div
                  className="absolute left-0 right-0 bottom-0 max-h-[86vh] overflow-auto rounded-t-3xl border border-white/12 bg-[#0C0722]"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="text-sm text-white/70">Role sheet</div>
                    <button className="h-9 rounded-xl border border-white/12 bg-white/[0.04] px-3 text-xs text-white/85 transition hover:bg-white/[0.08]" onClick={() => setMobileSheetOpen(false)} type="button">
                      Close
                    </button>
                  </div>
                  <div className="px-4 pb-5">
                    <RoleSheet role={selectedRole} onApply={() => apply(selectedRole)} />
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>

        <Divider />

        <section className="py-14 md:py-18" ref={peopleRef}>
          <SectionTitle eyebrow="People" title="Meet the crew" desc="Leadership up top, then the wider crew. Premium, human, and trust-forward." accent="hybrid" />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {EXEC.map((p, idx) => {
              const tone: Tone = idx % 2 === 0 ? "xr" : "games";
              const t = toneClasses(tone);
              return (
                <motion.div key={p.name} whileHover={{ y: -2 }} className={cx("group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]", t.rim)}>
                  <BloomLayer tone={tone} />
                  <div className="relative grid grid-cols-[120px_1fr]">
                    <div
                      className="h-full min-h-[120px] w-full"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(12,7,34,.20), rgba(12,7,34,.78)), url(${p.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="p-5">
                      <div className="text-sm font-semibold text-white/92">{p.name}</div>
                      <div className="mt-1 text-xs text-white/60">{p.role}</div>
                      <div className="mt-3 text-sm text-white/72">“Calm production. High taste. Ship what matters.”</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-xs tracking-[0.28em] uppercase text-white/55">Crew wall</div>
                <div className="mt-2 text-lg font-semibold text-white/92">The wider team</div>
                <div className="mt-1 text-sm text-white/70">A compact, studio-style grid.</div>
              </div>
              <div className="hidden gap-2 md:flex">
                <Chip tone="xr">Engineering</Chip>
                <Chip tone="games">Design</Chip>
                <Chip>Art</Chip>
                <Chip>Production</Chip>
                <Chip>QA</Chip>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {CREW.map((m, i) => {
                const tone: Tone = i % 3 === 0 ? "xr" : i % 3 === 1 ? "games" : "hybrid";
                const t = toneClasses(tone);
                return (
                  <div key={m.name} className={cx("group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition", t.rim)}>
                    <BloomLayer tone={tone} />
                    <div
                      className="relative h-20 w-full"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(12,7,34,.12), rgba(12,7,34,.74)), url(${m.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                    <div className="relative p-3">
                      <div className="truncate text-xs font-medium text-white/90">{m.name}</div>
                      <div className="truncate text-[11px] text-white/60">{m.role}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Divider />

        <section className="py-14 md:py-18" ref={lifeRef}>
          <LifeAtWodhSection activeStudio={activeStudio} />
        </section>

        <Divider />

        <section className="py-14 md:py-18">
          <SectionTitle eyebrow="Join" title="Don’t see your role?" desc="Join the Talent Network and we’ll reach out when something aligns. Confidential. No spam." accent="hybrid" />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.05fr_.95fr]">
            <div className={cx("group relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8", toneClasses("xr").rim)}>
              <BloomLayer tone="xr" />
              <div className="relative">
                <div className="text-lg font-semibold text-white/92">Talent Network</div>
                <div className="mt-1 text-sm text-white/70">Lightweight form — applications go through role Apply links.</div>
                <TalentNetworkForm />
                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip active tone="xr">
                    Confidential
                  </Chip>
                  <Chip active tone="hybrid">
                    No spam
                  </Chip>
                  <Chip active tone="games">
                    We reply
                  </Chip>
                </div>
              </div>
            </div>

            <div className={cx("group relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8", toneClasses("games").rim)}>
              <BloomLayer tone="games" />
              <div className="relative">
                <div className="text-lg font-semibold text-white/92">Hiring process</div>
                <div className="mt-1 text-sm text-white/70">Calm, respectful, and clear.</div>
                <div className="mt-4 space-y-3">
                  {[
                    { n: "01", t: "Intro call", d: "Fit, goals, role expectations." },
                    { n: "02", t: "Portfolio / review", d: "Shipped work, ownership, craft." },
                    { n: "03", t: "Team interview", d: "Collaboration and problem-solving." },
                    { n: "04", t: "Offer + onboarding", d: "Smooth ramp with measurable goals." },
                  ].map((s, i) => {
                    const tone: Tone = i % 2 === 0 ? "xr" : "games";
                    const t = toneClasses(tone);
                    return (
                      <div key={s.n} className={cx("group relative rounded-2xl border border-white/10 bg-white/[0.02] p-4 overflow-hidden", t.rim)}>
                        <BloomLayer tone={tone} />
                        <div className="relative">
                          <div className="text-xs tracking-[0.28em] uppercase text-white/55">{s.n}</div>
                          <div className="mt-1 text-sm font-semibold text-white/92">{s.t}</div>
                          <div className="mt-1 text-sm text-white/70">{s.d}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        <section className="pb-24 pt-14 md:py-18" ref={faqRef}>
          <SectionTitle eyebrow="FAQ" title="Answers, quickly" desc="Practical details candidates usually ask — clear and direct." accent="hybrid" />
          <FaqBlock />
        </section>
      </main>
    </div>
  );
}

function ChapterBlock({ studio, headline, sub, bullets, chips }: { studio: Studio; headline: string; sub: string; bullets: string[]; chips: string[] }) {
  const tone = studioTone(studio);
  const t = toneClasses(tone);
  return (
    <motion.div whileHover={{ y: -2 }} className={cx("group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-7", t.rim)}>
      <BloomLayer tone={tone} />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className={cx("h-[10px] w-[10px] rounded-full", t.dot)} />
              <div className="text-xs tracking-[0.28em] uppercase text-white/55">{studio} chapter</div>
            </div>
            <div className="mt-3 text-xl font-semibold text-white/95 md:text-2xl">{headline}</div>
            <div className="mt-2 text-sm text-white/70">{sub}</div>
          </div>
          <div className={cx("grid h-12 w-12 place-items-center rounded-2xl border border-white/12", t.chip)}>
            <span className="text-[11px] font-semibold tracking-[0.28em] text-white/90">{studio === "XR" ? "XR" : studio === "Games" ? "GM" : "HX"}</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="text-sm font-semibold text-white/92">What great looks like</div>
            <ul className="mt-2 space-y-2 text-sm text-white/70">
              {bullets.map((b, i) => (
                <li key={i}>• {b}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="text-sm font-semibold text-white/92">Tools we love</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span key={c} className={cx("rounded-full border px-2.5 py-1 text-xs", t.chip)}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ReceiptCard({ r }: { r: Receipt }) {
  const tone: Tone = r.studio === "All" ? "hybrid" : studioTone(r.studio);
  const t = toneClasses(tone);
  return (
    <motion.div whileHover={{ y: -2 }} className={cx("group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]", t.rim)}>
      <BloomLayer tone={tone} />
      <div className="relative grid grid-cols-[108px_1fr]">
        <div
          className="h-full min-h-[92px] w-full"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(12,7,34,.18), rgba(12,7,34,.82)), url(${r.thumb})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="p-4">
          <div className="flex items-center justify-between gap-3">
            <span className={cx("rounded-full border px-2.5 py-1 text-xs", t.chip)}>{r.type}</span>
            <span className="text-xs text-white/55">{r.meta}</span>
          </div>
          <div className="mt-2 text-sm font-semibold text-white/92">{r.title}</div>
          <div className="mt-1 text-sm leading-relaxed text-white/70">{r.detail}</div>
        </div>
      </div>
    </motion.div>
  );
}

function RolePod({ role, active, onClick }: { role: Role; active?: boolean; onClick: () => void }) {
  const tone = studioTone(role.studio);
  const t = toneClasses(tone);
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition",
        active ? "border-white/20 bg-white/[0.07]" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]",
        t.rim
      )}
    >
      <BloomLayer tone={tone} />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-white/92">{role.title}</div>
            <div className="mt-1 line-clamp-2 text-sm text-white/70">{role.summary}</div>
          </div>
          <div className={cx("grid h-10 w-10 place-items-center rounded-2xl border border-white/12", t.chip)}>
            <span className="text-[10px] font-semibold tracking-[0.26em] text-white/90">{role.studio === "XR" ? "XR" : role.studio === "Games" ? "GM" : "HX"}</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className={cx("rounded-full border px-2.5 py-1 text-xs", t.chip)}>{role.studio}</span>
          <span className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-xs text-white/78">{role.level}</span>
          <span className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-xs text-white/78">{role.type}</span>
          <span className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-xs text-white/78">
            {role.workMode} • {role.location}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-white/50">Updated {role.updatedAt}</div>
          <div className="text-xs text-white/75">Open sheet →</div>
        </div>
      </div>
    </button>
  );
}

function RoleSheet({ role, onApply }: { role: Role; onApply: () => void }) {
  const tone = studioTone(role.studio);
  const t = toneClasses(tone);
  return (
    <div className={cx("group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-7", t.rim)}>
      <BloomLayer tone={tone} />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs tracking-[0.28em] uppercase text-white/55">Role sheet</div>
            <div className="mt-2 text-2xl font-semibold leading-tight text-white/95 md:text-3xl">{role.title}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className={cx("rounded-full border px-2.5 py-1 text-xs", t.chip)}>{role.studio}</span>
              <span className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-xs text-white/78">{role.department}</span>
              <span className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-xs text-white/78">{role.level}</span>
              <span className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-xs text-white/78">{role.type}</span>
              <span className="rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-xs text-white/78">
                {role.workMode} • {role.location}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <button
              onClick={onApply}
              className={cx(
                "h-11 rounded-xl bg-white px-5 text-sm font-medium text-black transition hover:bg-white/90",
                tone === "xr"
                  ? "shadow-[0_20px_90px_rgba(158,243,21,.18)] hover:shadow-[0_26px_120px_rgba(158,243,21,.22)]"
                  : tone === "games"
                  ? "shadow-[0_20px_90px_rgba(124,58,237,.20)] hover:shadow-[0_26px_120px_rgba(124,58,237,.24)]"
                  : "shadow-[0_22px_90px_rgba(158,243,21,.14),0_18px_80px_rgba(124,58,237,.16)] hover:shadow-[0_28px_120px_rgba(158,243,21,.18),0_22px_100px_rgba(124,58,237,.20)]"
              )}
              type="button"
            >
              Apply
            </button>
            <div className="text-[11px] text-white/55">Updated {role.updatedAt}</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold text-white/92">Mission</div>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{role.mission}</p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="text-sm font-semibold text-white/92">You’ll ship (90 days)</div>
            <ul className="mt-2 space-y-2 text-sm text-white/70">
              {role.outcomes90.map((x, i) => (
                <li key={i}>• {x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="text-sm font-semibold text-white/92">Tools</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {role.tools.map((x) => (
                <span key={x} className={cx("rounded-full border px-2.5 py-1 text-xs", t.chip)}>
                  {x}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="text-sm font-semibold text-white/92">Responsibilities</div>
          <ul className="mt-2 space-y-2 text-sm text-white/70">
            {role.responsibilities.map((x, i) => (
              <li key={i}>• {x}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="text-sm font-semibold text-white/92">Must-have</div>
            <ul className="mt-2 space-y-2 text-sm text-white/70">
              {role.requirements.map((x, i) => (
                <li key={i}>• {x}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="text-sm font-semibold text-white/92">Nice-to-have</div>
            <ul className="mt-2 space-y-2 text-sm text-white/70">
              {role.niceToHave.map((x, i) => (
                <li key={i}>• {x}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/28 p-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-white/78">
            <span className="font-medium text-white/92">Portfolio signals:</span> shipped work, ownership, constraints, and quality bar.
          </div>
          <button
            onClick={onApply}
            className={cx(
              "h-10 rounded-xl border border-white/12 bg-white/[0.04] px-4 text-sm text-white/90 transition hover:bg-white/[0.08]",
              tone === "xr"
                ? "shadow-[0_0_0_1px_rgba(158,243,21,.18)]"
                : tone === "games"
                ? "shadow-[0_0_0_1px_rgba(124,58,237,.18)]"
                : "shadow-[0_0_0_1px_rgba(158,243,21,.14),0_0_0_1px_rgba(124,58,237,.14)]"
            )}
            type="button"
          >
            Apply now →
          </button>
        </div>
      </div>
    </div>
  );
}

function LifeAtWodhSection({ activeStudio }: { activeStudio: Studio | "All" }) {
  const [open, setOpen] = useState<LifeShot | null>(null);

  const shots = useMemo(() => {
    if (activeStudio === "All") return LIFE_AT_WODH;
    return LIFE_AT_WODH.filter((s) => s.studio === "All" || s.studio === activeStudio);
  }, [activeStudio]);

  return (
    <>
      <SectionTitle eyebrow="Life at Wodh" title="A real studio, not a poster" desc="Office moments, demos, critiques, playtests — the rhythm that builds quality." accent="hybrid" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {shots.slice(0, 6).map((s, idx) => {
          const tone: Tone = s.studio === "XR" ? "xr" : s.studio === "Games" ? "games" : "hybrid";
          const t = toneClasses(tone);

          const span = idx === 0 ? "lg:col-span-7 lg:row-span-2" : idx === 1 ? "lg:col-span-5" : idx === 2 ? "lg:col-span-5" : "lg:col-span-4";

          return (
            <motion.button
              key={s.id}
              type="button"
              onClick={() => setOpen(s)}
              whileHover={{ y: -2 }}
              className={cx("group relative min-h-[240px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-left", span, t.rim)}
            >
              <BloomLayer tone={tone} />
              <div
                className="absolute inset-0 opacity-[0.90]"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(12,7,34,.18), rgba(12,7,34,.82)), url(${s.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <div className="relative p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className={cx("rounded-full border px-2.5 py-1 text-xs", t.chip)}>{s.studio === "All" ? "Studio" : s.studio}</span>
                  <span className="text-xs text-white/60">Open →</span>
                </div>

                <div className="mt-4 text-lg font-semibold text-white/92 md:text-xl">{s.title}</div>
                <div className="mt-2 max-w-[48ch] text-sm text-white/72">{s.caption}</div>

                <div className="mt-5 text-xs tracking-[0.24em] uppercase text-white/45">Life at Wodh • Studio Notes</div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs tracking-[0.28em] uppercase text-white/55">Office Tour</div>
            <div className="mt-2 text-lg font-semibold text-white/92">Corners of the studio</div>
            <div className="mt-1 text-sm text-white/70">Quick scroll. Replace placeholders with your real office photos.</div>
          </div>
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {shots.map((s) => {
            const tone: Tone = s.studio === "XR" ? "xr" : s.studio === "Games" ? "games" : "hybrid";
            const t = toneClasses(tone);
            return (
              <button key={"strip-" + s.id} type="button" onClick={() => setOpen(s)} className={cx("group relative h-[150px] w-[260px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition", t.rim)}>
                <BloomLayer tone={tone} />
                <div
                  className="relative h-full w-full"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(12,7,34,.12), rgba(12,7,34,.72)), url(${s.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-[60]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(null)} />
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="absolute left-1/2 top-1/2 w-[min(980px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/12 bg-[#0C0722]"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4">
                <div className="text-sm text-white/85">{open.title}</div>
                <button className="h-9 rounded-xl border border-white/12 bg-white/[0.04] px-3 text-xs text-white/85 transition hover:bg-white/[0.08]" onClick={() => setOpen(null)} type="button">
                  Close
                </button>
              </div>
              <div
                className="h-[52vh] w-full"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(12,7,34,.10), rgba(12,7,34,.82)), url(${open.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="p-5">
                <div className="text-sm text-white/85">{open.caption}</div>
                <div className="mt-2 text-xs tracking-[0.24em] uppercase text-white/45">Life at Wodh • {open.studio === "All" ? "Studio" : open.studio}</div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function TalentNetworkForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studio, setStudio] = useState<Studio | "Any">("Any");
  const [interest, setInterest] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    console.log("Talent Network:", { name, email, studio, interest, note });
    setTimeout(() => setSent(false), 2400);
    setName("");
    setEmail("");
    setStudio("Any");
    setInterest("");
    setNote("");
  }

  const focusGlow = "focus:border-[rgba(158,243,21,.30)] focus:shadow-[0_0_0_4px_rgba(158,243,21,.12),0_0_0_1px_rgba(124,58,237,.10)]";

  return (
    <form onSubmit={submit} className="mt-5 space-y-3">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] tracking-[0.18em] uppercase text-white/45">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={cx("h-11 rounded-xl border border-white/12 bg-white/[0.05] px-4 text-sm text-white/90 outline-none placeholder:text-white/35", focusGlow)}
            placeholder="Your name"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] tracking-[0.18em] uppercase text-white/45">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={cx("h-11 rounded-xl border border-white/12 bg-white/[0.05] px-4 text-sm text-white/90 outline-none placeholder:text-white/35", focusGlow)}
            placeholder="you@domain.com"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-[11px] tracking-[0.18em] uppercase text-white/45">Studio preference</span>
          <select value={studio} onChange={(e) => setStudio(e.target.value as any)} className={cx("h-11 rounded-xl border border-white/12 bg-white/[0.05] px-3 text-sm text-white/90 outline-none", focusGlow)}>
            <option value="Any">Any</option>
            <option value="XR">XR</option>
            <option value="Games">Games</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[11px] tracking-[0.18em] uppercase text-white/45">Role interest</span>
          <input value={interest} onChange={(e) => setInterest(e.target.value)} className={cx("h-11 rounded-xl border border-white/12 bg-white/[0.05] px-4 text-sm text-white/90 outline-none placeholder:text-white/35", focusGlow)} placeholder="e.g., Unity XR Engineer / 3D Artist" />
        </label>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-[11px] tracking-[0.18em] uppercase text-white/45">Note (optional)</span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className={cx(
            "rounded-xl border border-white/12 bg-white/[0.05] px-4 py-3 text-sm text-white/90 outline-none placeholder:text-white/35",
            "focus:border-[rgba(124,58,237,.30)] focus:shadow-[0_0_0_4px_rgba(124,58,237,.12),0_0_0_1px_rgba(158,243,21,.10)]"
          )}
          placeholder="Share links + what you want to build."
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className={cx(
            "h-11 rounded-xl bg-white px-5 text-sm font-medium text-black transition hover:bg-white/90",
            "shadow-[0_18px_80px_rgba(158,243,21,.14),0_16px_70px_rgba(124,58,237,.14)] hover:shadow-[0_24px_110px_rgba(158,243,21,.18),0_20px_95px_rgba(124,58,237,.18)]"
          )}
        >
          Join Talent Network
        </button>
        <AnimatePresence>
          {sent ? (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} className="text-sm text-white/80">
              Submitted — thanks.
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}

function FaqBlock() {
  const faq = useMemo(
    () => [
      { q: "Do you hire remote?", a: "Yes for select roles. Each role specifies Remote / On-site / Hybrid." },
      { q: "What should my portfolio include?", a: "Show what you shipped, what you owned, constraints you navigated, and the quality bar you held. For engineers: systems-level work and problem-solving depth." },
      { q: "How long does the hiring process take?", a: "We aim to keep it respectful and fast. Timing varies by role and availability." },
      { q: "Do you offer internships?", a: "Yes for specific cycles. Internship roles appear in Open Roles when active." },
      { q: "Do you use an ATS?", a: "We recommend applying via the role’s Apply link (Google Form/ATS) so applications stay structured and easy to review." },
    ],
    []
  );

  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(faq[0]?.q ?? null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return faq;
    return faq.filter((x) => (x.q + " " + x.a).toLowerCase().includes(s));
  }, [q, faq]);

  return (
    <div className={cx("group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-7", toneClasses("hybrid").rim)}>
      <BloomLayer tone="hybrid" />
      <div className="relative">
        <label className="block">
          <span className="text-[11px] tracking-[0.18em] uppercase text-white/45">Search</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a keyword…"
            className={cx(
              "mt-1 h-11 w-full rounded-xl border border-white/12 bg-white/[0.05] px-4 text-sm text-white/90 outline-none placeholder:text-white/35",
              "focus:border-[rgba(158,243,21,.28)] focus:shadow-[0_0_0_4px_rgba(158,243,21,.12),0_0_0_1px_rgba(124,58,237,.10)]"
            )}
          />
        </label>

        <div className="mt-5 space-y-3">
          {filtered.map((item, idx) => {
            const isOpen = open === item.q;
            const tone: Tone = idx % 2 === 0 ? "xr" : "games";
            const t = toneClasses(tone);
            return (
              <div key={item.q} className={cx("group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]", t.rim)}>
                <BloomLayer tone={tone} />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.q)}
                  className="relative flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/[0.06]"
                >
                  <div className="text-sm font-medium text-white/90 md:text-base">{item.q}</div>
                  <div className="text-white/60">{isOpen ? "–" : "+"}</div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}>
                      <div className="px-5 pb-5 text-sm leading-relaxed text-white/72">{item.a}</div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
          {filtered.length === 0 ? <div className="text-sm text-white/65">No FAQ matched your search.</div> : null}
        </div>
      </div>
    </div>
  );
}

export default CareersWodhGuildStudioMagazine;

