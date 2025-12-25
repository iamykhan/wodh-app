"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type EngagementModelKeyV5 = "fixed" | "dedicated" | "codev";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ENGAGEMENT_TOKENS_V5 = {
  xr: "#9EF315",
  games: "#7C3AED",
};

const ENGAGEMENT_MODELS_V5: Array<{
  key: EngagementModelKeyV5;
  name: string;
  short: string;
  bestFor: string[];
  whatYouGet: string[];
  timeline: string;
  cadence: string;
  comms: string;
  ownership: string;
  tone: "xr" | "games" | "dual";
}> = [
  {
    key: "fixed",
    name: "Fixed Scope",
    short: "Milestone delivery with clear acceptance criteria.",
    bestFor: ["Defined roadmap", "Tight deadlines", "Budget control"],
    whatYouGet: ["Milestone plan + scope", "Acceptance criteria", "Staged releases", "Documentation + handover"],
    timeline: "2–10+ weeks",
    cadence: "Weekly demos • milestone gates",
    comms: "PM-led cadence • async updates",
    ownership: "Client owns IP • full source handover",
    tone: "xr",
  },
  {
    key: "dedicated",
    name: "Dedicated Team",
    short: "A stable team embedded into your roadmap and rituals.",
    bestFor: ["Long roadmaps", "Fast iteration", "Continuous delivery"],
    whatYouGet: ["Dedicated squad", "Sprint planning", "Backlog grooming", "Velocity tracking"],
    timeline: "Monthly / ongoing",
    cadence: "Sprints • weekly demos",
    comms: "Daily async • weekly sync",
    ownership: "Client owns IP • repo-first workflow",
    tone: "games",
  },
  {
    key: "codev",
    name: "Co-Dev Squads",
    short: "Specialist squads plugged into your pipeline.",
    bestFor: ["Capacity boost", "Specialist needs", "Parallel streams"],
    whatYouGet: ["Feature squads", "Art/UI pods", "QA gates", "Integration support"],
    timeline: "4–16+ weeks / ongoing",
    cadence: "Sprint-based • integration checkpoints",
    comms: "Squad lead • shared tooling",
    ownership: "Client owns IP • clean deliverables",
    tone: "dual",
  },
];

function EngagementChipV5({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "xr" | "games" | "dual";
}) {
  const ring =
    tone === "xr"
      ? "ring-[rgba(158,243,21,0.22)] text-[rgba(221,255,180,0.95)]"
      : tone === "games"
        ? "ring-[rgba(124,58,237,0.22)] text-[rgba(228,220,255,0.95)]"
        : tone === "dual"
          ? "ring-white/14 text-white/85"
          : "ring-white/14 text-white/80";
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs",
        "bg-white/[0.06] ring-1 backdrop-blur",
        ring
      )}
    >
      {children}
    </span>
  );
}

function EngagementPrimaryButtonV5({
  href,
  children,
  tone = "neutral",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "neutral" | "xr" | "games" | "dual";
}) {
  const cls =
    tone === "xr"
      ? "bg-[rgba(158,243,21,0.14)] ring-[rgba(158,243,21,0.38)] hover:bg-[rgba(158,243,21,0.18)]"
      : tone === "games"
        ? "bg-[rgba(124,58,237,0.16)] ring-[rgba(124,58,237,0.40)] hover:bg-[rgba(124,58,237,0.20)]"
        : "bg-white/10 ring-white/22 hover:bg-white/14";

  return (
    <a
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium text-white",
        "ring-1 backdrop-blur transition-all duration-200",
        "hover:-translate-y-[1px] hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
        cls
      )}
    >
      {children}
    </a>
  );
}

function EngagementGhostButtonV5({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium",
        "bg-transparent text-white/85 ring-1 ring-white/14 backdrop-blur",
        "transition-all duration-200 hover:bg-white/6 hover:text-white hover:-translate-y-[1px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      )}
    >
      {children}
    </a>
  );
}

function EngagementGlassCardV5({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[28px]",
        "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl",
        "shadow-[0_40px_120px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function BalancedBloomV5({ tone, active }: { tone: "xr" | "games" | "dual"; active?: boolean }) {
  const xrHard = "rgba(158,243,21,0.32)";
  const gHard = "rgba(124,58,237,0.32)";
  const xrSoft = "rgba(158,243,21,0.16)";
  const gSoft = "rgba(124,58,237,0.16)";

  const bloom =
    tone === "dual"
      ? `radial-gradient(55% 70% at 20% 35%, ${xrHard}, transparent 60%),
         radial-gradient(55% 70% at 80% 65%, ${gHard}, transparent 60%),
         radial-gradient(120% 140% at 50% 50%, rgba(255,255,255,0.10), transparent 65%)`
      : tone === "xr"
        ? `radial-gradient(60% 75% at 20% 45%, ${xrHard}, transparent 62%),
           radial-gradient(120% 150% at 55% 60%, ${xrSoft}, transparent 70%)`
        : `radial-gradient(60% 75% at 20% 45%, ${gHard}, transparent 62%),
           radial-gradient(120% 150% at 55% 60%, ${gSoft}, transparent 70%)`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-14 rounded-[46px]"
        initial={false}
        animate={{ opacity: active ? 1 : 0.35, scale: active ? 1.02 : 0.99 }}
        transition={{ duration: 0.22 }}
        style={{ background: bloom, filter: "blur(28px)" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        initial={false}
        animate={{ opacity: active ? 0.6 : 0.25 }}
        transition={{ duration: 0.22 }}
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.06), transparent 62%)",
        }}
      />
    </>
  );
}

export function EngagementModelsIdea2_ContractsV5() {
  const reduceMotion = useReducedMotion();
  const [hover, setHover] = useState<EngagementModelKeyV5 | null>(null);

  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <EngagementChipV5>Engagement Models</EngagementChipV5>
          <EngagementChipV5>Idea 2 — Contracts</EngagementChipV5>
        </div>
        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          Three contract shapes — built for serious delivery.
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
          Reads like procurement: scope, cadence, communication, ownership — clean and confident.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {ENGAGEMENT_MODELS_V5.map((m) => {
          const tone = m.tone;
          const isOn = hover === m.key;

          const edge =
            tone === "xr"
              ? "rgba(158,243,21,0.55)"
              : tone === "games"
                ? "rgba(124,58,237,0.55)"
                : "rgba(255,255,255,0.22)";

          const titleGrad =
            tone === "xr"
              ? "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.95))"
              : tone === "games"
                ? "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(124,58,237,0.95))"
                : "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.86))";

          return (
            <motion.div
              key={m.key}
              onMouseEnter={() => setHover(m.key)}
              onMouseLeave={() => setHover(null)}
              className={cx(
                "relative overflow-hidden rounded-[28px]",
                "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl",
                "shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
              )}
              initial={false}
              animate={reduceMotion ? {} : { y: isOn ? -2 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <BalancedBloomV5 tone={tone} active={!!isOn} />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[28px]"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 0 0 2px rgba(0,0,0,0), 0 0 0 1px rgba(0,0,0,0)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-full w-[3px] opacity-70"
                style={{ background: `linear-gradient(180deg, ${edge}, transparent 70%)` }}
              />

              <div className="relative flex h-full flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <EngagementChipV5 tone={tone === "xr" ? "xr" : tone === "games" ? "games" : "dual"}>
                    {m.name}
                  </EngagementChipV5>
                  <span className="text-xs text-white/60">{m.timeline}</span>
                </div>

                <div className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white">
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ WebkitTextFillColor: "transparent", backgroundImage: titleGrad }}
                  >
                    {m.name}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/72">{m.short}</p>

                <div className="mt-5 space-y-3">
                  {[
                    ["Scope", m.whatYouGet[0] ?? "Milestone plan + scope definition"],
                    ["Cadence", m.cadence],
                    ["Communication", m.comms],
                    ["Ownership", m.ownership],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{k}</div>
                      <div className="mt-2 text-sm text-white/80">{v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <EngagementChipV5>Best when</EngagementChipV5>
                  {m.bestFor.slice(0, 2).map((b) => (
                    <EngagementChipV5 key={b}>{b}</EngagementChipV5>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <EngagementPrimaryButtonV5
                    href="/contact"
                    tone={tone === "xr" ? "xr" : tone === "games" ? "games" : "dual"}
                  >
                    Request proposal
                  </EngagementPrimaryButtonV5>
                  <EngagementGhostButtonV5 href="/contact">Ask a question</EngagementGhostButtonV5>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <EngagementGlassCardV5 className="mt-5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
          <div className="flex flex-wrap gap-2">
            <EngagementChipV5>Weekly demos</EngagementChipV5>
            <EngagementChipV5>QA gates</EngagementChipV5>
            <EngagementChipV5>Source + docs handover</EngagementChipV5>
          </div>
          <div className="text-xs text-white/60">Procurement-friendly • Clear acceptance criteria</div>
        </div>
        <div className="mt-3 text-xs text-white/50">
          Accent tokens: XR {ENGAGEMENT_TOKENS_V5.xr} • Games {ENGAGEMENT_TOKENS_V5.games}
        </div>
      </EngagementGlassCardV5>
    </section>
  );
}

// Export the expected name for the final page import.
export { EngagementModelsIdea2_ContractsV5 as EngagementModelsIdea2_Contracts };


