"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * SERVICES HUB — FINAL (Wodh Signature)
 *
 * Page sections (final order):
 * 1) Hero
 * 2) Split Portal (2×2) + Uniform Key Services Bar
 * 3) Engagement Models — Idea 2 (Contracts)
 * 4) Shared Pipeline (Signature grid)
 * 5) Proof Grid (Filtered proof grid)
 * 6) Final CTA
 */

/* =======================================================================================
   ✅ IMPORT YOUR LOCKED SECTIONS
======================================================================================= */

import ServicesPortal2x2 from "./_sections/ServicesPortal2x2";
import { EngagementModelsIdea2_Contracts } from "./_sections/EngagementModelsIdea2_Contracts";

/* =======================================================================================
   WODH v1 TOKENS + HELPERS
======================================================================================= */

const TOKENS = {
  bg: "#0C0722",
  xr: "#9EF315",
  games: "#7C3AED",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "xr" | "games" | "dual";
}) {
  const ring =
    tone === "xr"
      ? "ring-[rgba(158,243,21,0.22)] text-[rgba(221,255,180,0.92)]"
      : tone === "games"
        ? "ring-[rgba(124,58,237,0.22)] text-[rgba(228,220,255,0.92)]"
        : tone === "dual"
          ? "ring-white/14 text-white/85"
          : "ring-white/14 text-white/80";

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs ring-1 backdrop-blur",
        ring
      )}
    >
      {children}
    </span>
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="h-px w-full bg-white/10" />
    </div>
  );
}

function GlobalBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_0%,rgba(158,243,21,0.12),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_82%_100%,rgba(124,58,237,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_50%_120%,rgba(0,0,0,0.80),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:22px_22px]" />
    </div>
  );
}

function SignatureCTA({ href = "#cta", label = "Start a project" }: { href?: string; label?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.a
      href={href}
      className={cx(
        "group relative inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white",
        "bg-white/[0.06] ring-1 ring-white/14 backdrop-blur",
        "hover:bg-white/[0.10] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      )}
      whileHover={reduceMotion ? {} : { y: -1 }}
      transition={{ duration: 0.18 }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-full opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 70% at 30% 30%, rgba(158,243,21,0.18), transparent 60%), radial-gradient(60% 70% at 70% 70%, rgba(124,58,237,0.18), transparent 60%)",
        }}
      />
      <span className="relative">{label}</span>
      <motion.span
        aria-hidden
        className="relative"
        initial={false}
        animate={{ x: 0 }}
        whileHover={reduceMotion ? {} : { x: 2 }}
        transition={{ duration: 0.18 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

/* =======================================================================================
   SECTION 1 — HERO (Wodh Signature)
======================================================================================= */

function ServicesHero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-12 sm:pt-16">
      <div className="relative overflow-hidden rounded-[32px] bg-white/[0.04] ring-1 ring-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(1000px 520px at 16% 20%, rgba(158,243,21,0.14), transparent 62%), radial-gradient(1000px 520px at 86% 78%, rgba(124,58,237,0.16), transparent 62%), radial-gradient(900px 520px at 50% -10%, rgba(255,255,255,0.08), transparent 60%)",
              backgroundSize: "160% 160%",
              filter: "blur(10px)",
            }}
            animate={reduceMotion ? { opacity: 1 } : { backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={reduceMotion ? {} : { duration: 18, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.20),transparent_40%,rgba(0,0,0,0.45))]" />
        </div>

        <div className="relative p-8 sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Chip>Services</Chip>
              <Chip tone="dual">XR • Games • 3D • Creative Tech</Chip>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="#proof"
                className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm text-white/80 ring-1 ring-white/14 backdrop-blur hover:bg-white/[0.10] hover:text-white transition"
              >
                View proof <span aria-hidden>→</span>
              </a>
              <SignatureCTA href="#cta" label="Start a project" />
            </div>
          </div>

          <h1 className="mt-10 text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
            Serious delivery for{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                WebkitTextFillColor: "transparent",
                backgroundImage:
                  "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.92), rgba(124,58,237,0.95))",
              }}
            >
              XR, Games, 3D, and Creative Tech
            </span>
            .
          </h1>

          <p className="mt-4 max-w-[72ch] text-sm leading-relaxed text-white/72 sm:text-base">
            One team, one production system. Choose a pillar, see the process, then review proof — built to feel clean
            for decision-makers and exciting for product teams.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <Chip>Procurement-friendly</Chip>
            <Chip>Stage gates</Chip>
            <Chip>Weekly demos</Chip>
            <Chip>QA + perf budgets</Chip>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =======================================================================================
   SECTION 4 — SHARED PIPELINE (Signature Grid)
======================================================================================= */

type PipelineFilter = "all" | "xr" | "games";
type StageId = "discovery" | "prototype" | "production" | "qa" | "launch" | "support";

type Focus = { inputs: string[]; outputs: string[]; dod: string };
type Stage = {
  id: StageId;
  num: string;
  title: string;
  subtitle: Record<PipelineFilter, string>;
  focus: Record<PipelineFilter, Focus>;
};

const STAGES: Stage[] = [
  {
    id: "discovery",
    num: "01",
    title: "Discovery",
    subtitle: {
      all: "Goals, constraints, and success metrics.",
      xr: "Use-cases, devices, comfort constraints, and rollout context.",
      games: "Core loop, target platform, audience, and content direction.",
    },
    focus: {
      all: {
        inputs: ["Business goals", "Constraints & stakeholders", "Reference materials"],
        outputs: ["Success metrics", "Scope hypothesis", "Risk map"],
        dod: "Goals + success metrics are locked; key risks are identified and owned.",
      },
      xr: {
        inputs: ["Devices & environments", "Safety/comfort constraints", "Ops/training context"],
        outputs: ["Comfort targets", "Perf constraints", "Interaction assumptions"],
        dod: "Comfort + device constraints are defined and accepted.",
      },
      games: {
        inputs: ["Audience & platform", "Genre references", "Monetization constraints (if any)"],
        outputs: ["Loop hypothesis", "Content direction", "Production assumptions"],
        dod: "Core loop direction is agreed and measurable.",
      },
    },
  },
  {
    id: "prototype",
    num: "02",
    title: "Prototype",
    subtitle: {
      all: "Risk-killing proof, fast iteration loops.",
      xr: "Interaction proof + comfort validation on real devices.",
      games: "Playable proof of loop + pacing, early fun validation.",
    },
    focus: {
      all: {
        inputs: ["Scope hypothesis", "Key unknowns", "Constraints"],
        outputs: ["Working slice", "Validated direction", "Next-step plan"],
        dod: "Critical risks reduced; a production path exists.",
      },
      xr: {
        inputs: ["Comfort targets", "Hardware constraints", "Interaction assumptions"],
        outputs: ["On-device prototype", "Comfort findings", "Perf baseline"],
        dod: "Prototype runs on target device with acceptable comfort/perf.",
      },
      games: {
        inputs: ["Loop hypothesis", "Content direction", "Platform specs"],
        outputs: ["Playable loop", "Pacing insights", "Retention signals"],
        dod: "Playable loop validated with clear next improvements.",
      },
    },
  },
  {
    id: "production",
    num: "03",
    title: "Production",
    subtitle: {
      all: "Systems + content pipeline, sprint cadence.",
      xr: "Modules + device-ready iterations with stable cadence.",
      games: "Gameplay systems + content pipeline with sprint rhythm.",
    },
    focus: {
      all: {
        inputs: ["Backlog", "Design rules", "Prototype learnings"],
        outputs: ["Shippable increments", "Stable builds", "Weekly demos"],
        dod: "Features meet acceptance criteria and pass checks.",
      },
      xr: {
        inputs: ["Device budgets", "Interaction patterns", "Roadmap"],
        outputs: ["Device-ready builds", "Interaction system", "Integration-ready modules"],
        dod: "Builds stay within device budgets as features grow.",
      },
      games: {
        inputs: ["Systems roadmap", "Content plan", "Balancing targets"],
        outputs: ["Systems integrated", "Content pipeline", "Playable milestones"],
        dod: "Core systems stable; pipeline operational.",
      },
    },
  },
  {
    id: "qa",
    num: "04",
    title: "QA & Polish",
    subtitle: {
      all: "Performance, edge-cases, platform standards.",
      xr: "Comfort checks, device regressions, performance budgets.",
      games: "Frame-time, input feel, balance passes, edge-case coverage.",
    },
    focus: {
      all: {
        inputs: ["Milestone builds", "Perf budgets", "Edge-case list"],
        outputs: ["QA reports", "Perf notes", "Release readiness"],
        dod: "QA gates pass; budgets met; candidate stable.",
      },
      xr: {
        inputs: ["Comfort targets", "Device matrix", "Deployment constraints"],
        outputs: ["Comfort validation", "Regression report", "Optimizations"],
        dod: "Comfort + stability proven across target devices.",
      },
      games: {
        inputs: ["Perf targets", "Balance goals", "Store/cert constraints"],
        outputs: ["Stability report", "Balance changes", "Cert readiness"],
        dod: "Build stable, performant, and aligned with platform standards.",
      },
    },
  },
  {
    id: "launch",
    num: "05",
    title: "Launch",
    subtitle: {
      all: "Release support, assets, deployment.",
      xr: "Rollout plan + device ops support and monitoring.",
      games: "Submission + rollout planning and monitoring.",
    },
    focus: {
      all: {
        inputs: ["Release candidate", "Deployment needs", "Handover checklist"],
        outputs: ["Release checklist", "Monitoring setup", "Handover pack"],
        dod: "Release live, monitored, and handover-ready.",
      },
      xr: {
        inputs: ["Deployment plan", "Ops constraints", "Usage context"],
        outputs: ["Rollout checklist", "Monitoring signals", "Ops pack"],
        dod: "Deployment validated; support paths in place.",
      },
      games: {
        inputs: ["Store requirements", "Cert checklists", "Release plan"],
        outputs: ["Submission pack", "Release monitoring", "Patch strategy"],
        dod: "Submission ready; release monitored; patch plan exists.",
      },
    },
  },
  {
    id: "support",
    num: "06",
    title: "Support",
    subtitle: {
      all: "Roadmap, updates, continuous improvement.",
      xr: "Continuous improvements + new modules with stable ops.",
      games: "Patches, content drops, balancing, live updates.",
    },
    focus: {
      all: {
        inputs: ["Usage data", "Feedback", "Roadmap priorities"],
        outputs: ["Update cadence", "Improvements", "Roadmap execution"],
        dod: "Stable post-launch cadence established and maintained.",
      },
      xr: {
        inputs: ["Ops feedback", "Device metrics", "New module requests"],
        outputs: ["Module iterations", "Stability upgrades", "Ops improvements"],
        dod: "Reliability stays high while features evolve.",
      },
      games: {
        inputs: ["Player feedback", "Telemetry", "Live roadmap"],
        outputs: ["Patches", "Content drops", "Balance iterations"],
        dod: "Cadence predictable with measurable improvements.",
      },
    },
  },
];

function PipelineBackground({ filter }: { filter: PipelineFilter }) {
  const xrA = filter === "xr" ? 0.18 : filter === "games" ? 0.08 : 0.14;
  const gA = filter === "games" ? 0.2 : filter === "xr" ? 0.08 : 0.16;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(900px 620px at 18% 25%, rgba(158,243,21,${xrA}), transparent 62%),
                       radial-gradient(900px 640px at 82% 30%, rgba(124,58,237,${gA}), transparent 62%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(1000px_800px_at_50%_120%,rgba(0,0,0,0.78),transparent_58%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),transparent_40%,rgba(0,0,0,0.38))]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:26px_26px]" />
    </div>
  );
}

function StageCard({
  stage,
  active,
  onClick,
  filter,
}: {
  stage: Stage;
  active: boolean;
  onClick: () => void;
  filter: PipelineFilter;
}) {
  const reduceMotion = useReducedMotion();
  const tone = filter === "xr" ? "xr" : filter === "games" ? "games" : "dual";

  const topAccent =
    tone === "xr"
      ? "linear-gradient(90deg, rgba(158,243,21,0.0), rgba(158,243,21,0.45), rgba(158,243,21,0.0))"
      : tone === "games"
        ? "linear-gradient(90deg, rgba(124,58,237,0.0), rgba(124,58,237,0.45), rgba(124,58,237,0.0))"
        : "linear-gradient(90deg, rgba(158,243,21,0.0), rgba(255,255,255,0.22), rgba(124,58,237,0.0))";

  return (
    <motion.button
      onClick={onClick}
      className={cx(
        "group relative text-left rounded-[22px] p-5",
        "bg-white/[0.05] ring-1 ring-white/10 backdrop-blur",
        "transition hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      )}
      initial={false}
      animate={reduceMotion ? {} : { y: active ? -2 : 0 }}
      transition={{ duration: 0.18 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[22px] overflow-hidden"
        style={{
          background:
            "radial-gradient(420px 260px at 18% 22%, rgba(158,243,21,0.08), transparent 62%), radial-gradient(420px 260px at 82% 78%, rgba(124,58,237,0.08), transparent 62%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-5 right-5 top-3 h-px opacity-70"
        style={{ background: topAccent }}
      />

      <span
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-0 rounded-[22px] opacity-0 ring-1 transition-opacity duration-200",
          active && "opacity-100"
        )}
        style={{ boxShadow: active ? "inset 0 0 0 1px rgba(255,255,255,0.18)" : undefined }}
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="text-xs text-white/55">{stage.num}</div>
          <div className="h-px w-10 bg-white/10" />
        </div>

        <div className="mt-3 text-[15px] font-semibold tracking-[-0.01em] text-white">{stage.title}</div>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{stage.subtitle[filter]}</p>
      </div>
    </motion.button>
  );
}

function StageFocusPanel({ stage, filter }: { stage: Stage; filter: PipelineFilter }) {
  const reduceMotion = useReducedMotion();
  const f = stage.focus[filter];

  const titleGrad =
    filter === "xr"
      ? "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.92))"
      : filter === "games"
        ? "linear-gradient(90deg, rgba(255,255,255,0.92), rgba(124,58,237,0.95))"
        : "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.82))";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${stage.id}-${filter}`}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.18 }}
        className="mt-6 rounded-[22px] bg-white/[0.05] p-5 ring-1 ring-white/10"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Chip>Stage focus</Chip>
            <div
              className="text-sm font-semibold tracking-[-0.01em] bg-clip-text text-transparent"
              style={{ WebkitTextFillColor: "transparent", backgroundImage: titleGrad }}
            >
              {stage.title}
            </div>
          </div>
          <Chip>Definition of done</Chip>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Inputs</div>
            <ul className="mt-3 space-y-2">
              {f.inputs.map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">Outputs</div>
            <ul className="mt-3 space-y-2">
              {f.outputs.map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">DoD</div>
            <div className="mt-3 text-sm leading-relaxed text-white/80">{f.dod}</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function SharedPipelineSection() {
  const [filter, setFilter] = useState<PipelineFilter>("all");
  const [activeId, setActiveId] = useState<StageId>("prototype");

  const activeIndex = useMemo(() => STAGES.findIndex((s) => s.id === activeId), [activeId]);
  const activeStage = useMemo(() => STAGES[Math.max(0, activeIndex)] ?? STAGES[0], [activeIndex]);

  return (
    <section id="pipeline" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-14">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>Shared Pipeline</Chip>
            <Chip>One team. One production system.</Chip>
          </div>
          <SignatureCTA href="#cta" label="Start a project" />
        </div>

        <h2 className="text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
          A delivery system that stays consistent —{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              WebkitTextFillColor: "transparent",
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.92), rgba(158,243,21,0.90), rgba(124,58,237,0.90))",
            }}
          >
            even when scope evolves
          </span>
          .
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Chip>Procurement-friendly</Chip>
            <Chip>Stage gates</Chip>
            <Chip>Weekly demos</Chip>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={cx(
                "rounded-full px-3 py-1.5 text-xs ring-1 backdrop-blur transition",
                filter === "all"
                  ? "bg-white/12 ring-white/22 text-white"
                  : "bg-white/6 text-white/70 ring-white/14 hover:bg-white/10 hover:text-white"
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilter("xr")}
              className={cx(
                "rounded-full px-3 py-1.5 text-xs ring-1 backdrop-blur transition",
                filter === "xr"
                  ? "bg-[rgba(158,243,21,0.12)] ring-[rgba(158,243,21,0.32)] text-white"
                  : "bg-white/6 text-white/70 ring-white/14 hover:bg-white/10 hover:text-white"
              )}
            >
              XR
            </button>
            <button
              onClick={() => setFilter("games")}
              className={cx(
                "rounded-full px-3 py-1.5 text-xs ring-1 backdrop-blur transition",
                filter === "games"
                  ? "bg-[rgba(124,58,237,0.14)] ring-[rgba(124,58,237,0.35)] text-white"
                  : "bg-white/6 text-white/70 ring-white/14 hover:bg-white/10 hover:text-white"
              )}
            >
              Games
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="relative overflow-hidden rounded-[28px] bg-white/[0.04] ring-1 ring-white/10">
          <PipelineBackground filter={filter} />

          <div className="relative p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {STAGES.map((s) => (
                <StageCard
                  key={s.id}
                  stage={s}
                  active={s.id === activeId}
                  onClick={() => setActiveId(s.id)}
                  filter={filter}
                />
              ))}
            </div>

            <StageFocusPanel stage={activeStage} filter={filter} />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[20px] bg-white/[0.05] p-4 ring-1 ring-white/10">
              <div className="flex flex-wrap gap-2">
                <Chip>Weekly demos</Chip>
                <Chip>QA gates</Chip>
                <Chip>Perf budgets</Chip>
                <Chip>Source + docs handover</Chip>
              </div>
              <div className="text-xs text-white/60">
                Active stage: <span className="text-white/80">{activeStage.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =======================================================================================
   SECTION 5 — PROOF GRID (Filtered)
======================================================================================= */

type ProofStudio = "All" | "XR" | "Games" | "3D" | "Creative";

type ProofItem = {
  id: string;
  studio: ProofStudio;
  title: string;
  outcome: string;
  tags: string[];
  tone: "xr" | "games" | "neutral";
};

const PROOF: ProofItem[] = [
  {
    id: "a",
    studio: "XR",
    title: "Safety Training Suite",
    outcome: "Reduced onboarding time with device-ready rollout.",
    tags: ["Quest", "Comfort pass", "Analytics"],
    tone: "xr",
  },
  {
    id: "b",
    studio: "XR",
    title: "Digital Twin Prototype",
    outcome: "Validated interaction assumptions and risk early.",
    tags: ["Simulation", "UX", "Perf baseline"],
    tone: "xr",
  },
  {
    id: "c",
    studio: "Games",
    title: "Co-dev Shooter Module",
    outcome: "Stable frame-time, clean handoff, fast iteration.",
    tags: ["Perf pass", "Netcode", "Tooling"],
    tone: "games",
  },
  {
    id: "d",
    studio: "Games",
    title: "Live Ops Pipeline",
    outcome: "Weekly cadence with QA gates and fewer regressions.",
    tags: ["CI/CD", "QA gates", "Builds"],
    tone: "games",
  },
  {
    id: "e",
    studio: "3D",
    title: "Stylized Character Pack",
    outcome: "Optimized assets with rig-ready delivery.",
    tags: ["Rigging", "LOD", "Shaders"],
    tone: "neutral",
  },
  {
    id: "f",
    studio: "Creative",
    title: "Interactive Web Experience",
    outcome: "High engagement without chaos — engineered motion systems.",
    tags: ["Three.js", "Motion", "Realtime"],
    tone: "neutral",
  },
];

function ProofCard({ item }: { item: ProofItem }) {
  const reduceMotion = useReducedMotion();
  const bloom =
    item.tone === "xr"
      ? "radial-gradient(60% 70% at 25% 30%, rgba(158,243,21,0.16), transparent 62%)"
      : item.tone === "games"
        ? "radial-gradient(60% 70% at 75% 30%, rgba(124,58,237,0.18), transparent 62%)"
        : "radial-gradient(60% 70% at 30% 35%, rgba(255,255,255,0.12), transparent 62%)";

  return (
    <motion.a
      href="/work"
      className={cx(
        "group relative overflow-hidden rounded-[22px] p-5",
        "bg-white/[0.05] ring-1 ring-white/10 backdrop-blur",
        "transition hover:bg-white/[0.07]"
      )}
      whileHover={reduceMotion ? {} : { y: -2 }}
      transition={{ duration: 0.18 }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-[26px] opacity-0 blur-2xl transition-opacity duration-200 group-hover:opacity-100"
        style={{ background: bloom }}
      />
      <div className="flex items-center justify-between gap-3">
        <Chip tone={item.tone === "xr" ? "xr" : item.tone === "games" ? "games" : "neutral"}>{item.studio}</Chip>
        <span className="text-xs text-white/55">View →</span>
      </div>
      <div className="mt-4 text-base font-semibold tracking-[-0.02em] text-white">{item.title}</div>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{item.outcome}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.slice(0, 3).map((t) => (
          <span key={t} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
            {t}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

function ProofGridSection() {
  const [filter, setFilter] = useState<ProofStudio>("All");
  const items = useMemo(() => (filter === "All" ? PROOF : PROOF.filter((p) => p.studio === filter)), [filter]);

  return (
    <section id="proof" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-14">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>Proof</Chip>
            <Chip>Selected work</Chip>
          </div>
          <a
            href="/work"
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm text-white/80 ring-1 ring-white/14 backdrop-blur hover:bg-white/[0.10] hover:text-white transition"
          >
            View all case studies <span aria-hidden>→</span>
          </a>
        </div>

        <h2 className="text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
          Proof you can scan fast — outcomes, scope, and craft.
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {(["All", "XR", "Games", "3D", "Creative"] as ProofStudio[]).map((x) => (
            <button
              key={x}
              onClick={() => setFilter(x)}
              className={cx(
                "rounded-full px-3 py-1.5 text-xs ring-1 backdrop-blur transition",
                filter === x
                  ? "bg-white/12 ring-white/22 text-white"
                  : "bg-white/6 text-white/70 ring-white/14 hover:bg-white/10 hover:text-white"
              )}
            >
              {x === "3D" ? "3D Art" : x}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((item) => (
          <ProofCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

/* =======================================================================================
   SECTION 6 — FINAL CTA (Signature behavior)
======================================================================================= */

function FinalCTA() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="cta" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-14">
      <div className="relative overflow-hidden rounded-[30px] bg-white/[0.05] ring-1 ring-white/10">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 520px at 18% 25%, rgba(158,243,21,0.14), transparent 62%), radial-gradient(900px 520px at 82% 80%, rgba(124,58,237,0.16), transparent 62%), linear-gradient(to bottom, rgba(255,255,255,0.06), transparent 60%)",
              filter: "blur(10px)",
            }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: [0.9, 1, 0.9] }}
            transition={reduceMotion ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18),transparent_40%,rgba(0,0,0,0.40))]" />
        </div>

        <div className="relative p-8 sm:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Chip>Ready to move?</Chip>
                <Chip tone="dual">One team. Two studios.</Chip>
              </div>
              <h3 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Tell us your goal — we’ll recommend the best track.
              </h3>
              <p className="mt-3 max-w-[70ch] text-sm leading-relaxed text-white/72 sm:text-base">
                Procurement-friendly process, clear scope, weekly demos, and a clean handover path.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Chip>Response in 24–48h</Chip>
                <Chip>Stage gates</Chip>
                <Chip>QA + perf budgets</Chip>
                <Chip>Docs + source handover</Chip>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <SignatureCTA href="/contact" label="Start a project" />
              <motion.a
                href="mailto:hello@wodh.io"
                className="inline-flex items-center justify-center rounded-full bg-white/[0.06] px-4 py-2 text-sm text-white/80 ring-1 ring-white/14 backdrop-blur hover:bg-white/[0.10] hover:text-white transition"
                whileHover={reduceMotion ? {} : { y: -1 }}
                transition={{ duration: 0.18 }}
              >
                Email us
              </motion.a>
              <div className="text-center text-xs text-white/55">Prefer NDA-first? Mention it.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =======================================================================================
   FINAL PAGE — MERGED
======================================================================================= */

export default function ServiceHubFinal() {
  return (
    <div className="min-h-screen w-full" style={{ background: TOKENS.bg }}>
      <GlobalBackground />

      <main className="relative pb-20">
        <ServicesHero />

        <div className="mt-14">
          <SectionDivider />
        </div>

        <section id="portal" className="py-14">
          <ServicesPortal2x2 />
        </section>

        <SectionDivider />

        <section id="models" className="py-14">
          <EngagementModelsIdea2_Contracts />
        </section>

        <SectionDivider />

        <SharedPipelineSection />

        <SectionDivider />

        <ProofGridSection />

        <SectionDivider />

        <FinalCTA />
      </main>
    </div>
  );
}


