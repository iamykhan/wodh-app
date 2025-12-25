"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Studio = "XR" | "Games" | "Hybrid";
type EngagementModel = "Fixed Scope" | "Dedicated Team" | "Co-Dev";

type CatalogItem = {
  id: string;
  studio: Exclude<Studio, "Hybrid">;
  title: string;
  whoFor: string;
  outcomes: string[];
  deliverables: string[];
  timeline: string;
  href: string;
  tags: string[];
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** WODH v1 tokens (Apple-clean base + neon accents) */
const TOKENS = {
  bg: "#0C0722",
  xr: "#9EF315",
  games: "#7C3AED",
};

const CATALOG: CatalogItem[] = [
  // XR
  {
    id: "xr-training",
    studio: "XR",
    title: "XR Training & Simulation",
    whoFor: "Operations, safety, onboarding, compliance teams.",
    outcomes: ["Faster onboarding", "Lower training cost", "Safer ops"],
    deliverables: ["Training modules", "Analytics hooks", "Device-ready builds", "Admin docs"],
    timeline: "4–10 weeks",
    href: "/services/xr#training",
    tags: ["Quest", "Unity", "Compliance"],
  },
  {
    id: "xr-digital-twin",
    studio: "XR",
    title: "Digital Twins & Ops Visualization",
    whoFor: "Industrial, logistics, facilities, and monitoring workflows.",
    outcomes: ["Better visibility", "Fewer errors", "Faster decisions"],
    deliverables: ["3D twin scene", "Data overlays", "Operator UI", "Deployment plan"],
    timeline: "6–12 weeks",
    href: "/services/xr#digital-twins",
    tags: ["Unity", "Data", "Visualization"],
  },
  {
    id: "xr-product-demo",
    studio: "XR",
    title: "Spatial Product Demos",
    whoFor: "Sales, marketing, product teams needing immersive storytelling.",
    outcomes: ["Higher engagement", "Clearer value", "Shorter sales cycle"],
    deliverables: ["Interactive demo", "Content pipeline", "Scene templates", "Showroom mode"],
    timeline: "3–8 weeks",
    href: "/services/xr#product-demos",
    tags: ["AR", "Showroom", "Storytelling"],
  },
  {
    id: "xr-webxr",
    studio: "XR",
    title: "WebXR & Browser Experiences",
    whoFor: "Teams that need reach-first XR without app installs.",
    outcomes: ["Instant access", "Wider reach", "Fast iteration"],
    deliverables: ["WebXR build", "Performance pass", "Hosting guidance", "Analytics"],
    timeline: "2–6 weeks",
    href: "/services/xr#webxr",
    tags: ["WebXR", "Three.js", "Performance"],
  },

  // Games
  {
    id: "g-full-production",
    studio: "Games",
    title: "Full-Cycle Game Development",
    whoFor: "Studios and publishers shipping complete titles.",
    outcomes: ["Predictable delivery", "High craft", "Platform readiness"],
    deliverables: ["Production plan", "Core systems", "Content pipeline", "Launch support"],
    timeline: "8–24+ weeks",
    href: "/services/games#full-production",
    tags: ["Unity", "Unreal", "Pipeline"],
  },
  {
    id: "g-codev",
    studio: "Games",
    title: "Co-Development (Engineering / Art / UI)",
    whoFor: "Teams augmenting capacity without losing velocity.",
    outcomes: ["More throughput", "Faster milestones", "Specialist coverage"],
    deliverables: ["Feature squads", "UI kits", "Art batches", "Weekly reporting"],
    timeline: "4–16+ weeks",
    href: "/services/games#co-dev",
    tags: ["Co-dev", "UI", "Art"],
  },
  {
    id: "g-liveops",
    studio: "Games",
    title: "Live Ops & Content Drops",
    whoFor: "Live games needing cadence, events, and updates.",
    outcomes: ["Higher retention", "Content velocity", "Stable performance"],
    deliverables: ["Event pipeline", "Season content", "Balancing support", "A/B hooks"],
    timeline: "Ongoing",
    href: "/services/games#live-ops",
    tags: ["Live Ops", "Events", "Mobile"],
  },
  {
    id: "g-optimization",
    studio: "Games",
    title: "Optimization & Performance Pass",
    whoFor: "Teams needing smooth FPS and platform compliance.",
    outcomes: ["Better FPS", "Fewer crashes", "Store readiness"],
    deliverables: ["Profiling report", "Optimization sprints", "QA gate checklist", "Final pass"],
    timeline: "2–6 weeks",
    href: "/services/games#optimization",
    tags: ["Performance", "QA", "Console"],
  },
];

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: "How do you price projects?",
    a: "We offer fixed-scope milestones, dedicated teams, or co-dev squads. Pricing depends on scope, timeline, and required disciplines.",
  },
  {
    q: "What does a kickoff look like?",
    a: "We start with discovery, define success metrics, and deliver a prototype plan. You’ll get a clear roadmap, risks, and timelines.",
  },
  {
    q: "How do you manage quality?",
    a: "QA gates, performance checks, and weekly demos are built into the cadence. We track acceptance criteria per milestone.",
  },
  {
    q: "Can you integrate with our team?",
    a: "Yes — we can plug into your tools and rituals (Jira, Linear, Slack, GitHub) and operate as an embedded squad.",
  },
  {
    q: "Who owns IP?",
    a: "You do. We work under client-first IP terms with clean handover, documentation, and asset/source delivery.",
  },
  {
    q: "Which engines do you support?",
    a: "Unity and Unreal are our core, plus WebXR/Three.js for browser experiences. We choose based on platform and constraints.",
  },
];

function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "xr" | "games";
}) {
  const ring =
    tone === "xr"
      ? "ring-[rgba(158,243,21,0.25)] text-[rgba(221,255,180,0.95)]"
      : tone === "games"
        ? "ring-[rgba(124,58,237,0.28)] text-[rgba(228,220,255,0.95)]"
        : "ring-white/15 text-white/80";

  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs",
        "bg-white/[0.06] ring-1 backdrop-blur",
        ring
      )}
    >
      {children}
    </span>
  );
}

function PrimaryButton({
  href,
  children,
  tone = "neutral",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "neutral" | "xr" | "games";
}) {
  const cls =
    tone === "xr"
      ? "bg-[rgba(158,243,21,0.14)] text-white ring-[rgba(158,243,21,0.45)] hover:bg-[rgba(158,243,21,0.18)]"
      : tone === "games"
        ? "bg-[rgba(124,58,237,0.16)] text-white ring-[rgba(124,58,237,0.48)] hover:bg-[rgba(124,58,237,0.20)]"
        : "bg-white/10 text-white ring-white/25 hover:bg-white/13";

  return (
    <a
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium",
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

function GhostButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium",
        "bg-transparent text-white/85 ring-1 ring-white/15 backdrop-blur",
        "transition-all duration-200 hover:bg-white/6 hover:text-white hover:-translate-y-[1px]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      )}
    >
      {children}
    </a>
  );
}

function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cx("relative mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </section>
  );
}

function GlassCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
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

function BloomEdge({ studio }: { studio: Exclude<Studio, "Hybrid"> }) {
  const soft =
    studio === "XR" ? "rgba(158,243,21,0.18)" : "rgba(124,58,237,0.18)";
  const hard =
    studio === "XR" ? "rgba(158,243,21,0.28)" : "rgba(124,58,237,0.28)";
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-24 opacity-75 blur-3xl"
        style={{
          background: `radial-gradient(45% 55% at 25% 20%, ${hard}, transparent 60%),
                       radial-gradient(45% 55% at 75% 80%, ${soft}, transparent 60%)`,
        }}
      />
    </>
  );
}

function SegButton({
  active,
  onClick,
  children,
  tone = "neutral",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tone?: "neutral" | "xr" | "games";
}) {
  const clsActive =
    tone === "xr"
      ? "bg-[rgba(158,243,21,0.14)] ring-[rgba(158,243,21,0.35)] text-white"
      : tone === "games"
        ? "bg-[rgba(124,58,237,0.16)] ring-[rgba(124,58,237,0.38)] text-white"
        : "bg-white/12 ring-white/22 text-white";

  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full px-3 py-1.5 text-xs ring-1 backdrop-blur transition",
        active ? clsActive : "bg-white/6 text-white/75 ring-white/14 hover:bg-white/10"
      )}
    >
      {children}
    </button>
  );
}

function AccordionItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.05] ring-1 ring-white/10">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
      >
        <span className="text-sm font-semibold text-white">{q}</span>
        <span className="text-xs text-white/60">{open ? "—" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 text-sm leading-relaxed text-white/72">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicesHub2() {
  const reduceMotion = useReducedMotion();

  const [studio, setStudio] = useState<Studio>("XR");
  const [model, setModel] = useState<EngagementModel>("Fixed Scope");
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATALOG.filter((x) => {
      const studioOk = studio === "Hybrid" ? true : x.studio === studio;
      const qOk =
        !q ||
        x.title.toLowerCase().includes(q) ||
        x.whoFor.toLowerCase().includes(q) ||
        x.tags.some((t) => t.toLowerCase().includes(q));
      return studioOk && qOk;
    });
  }, [studio, query]);

  const heroIn = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen w-full" style={{ background: TOKENS.bg }}>
      {/* Background depth (Balanced Neon System, restrained) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_18%_0%,rgba(158,243,21,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_82%_100%,rgba(124,58,237,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_50%_120%,rgba(0,0,0,0.80),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative h-10 sm:h-14" />

      {/* HERO + CONTROLS */}
      <Section className="relative pt-8 sm:pt-12">
        <motion.div {...heroIn} transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Chip tone="neutral">Services</Chip>
              <Chip tone="neutral">Catalog</Chip>
              <Chip tone="neutral">Serious delivery</Chip>
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-[-0.02em] text-white sm:text-6xl">
              A structured services catalog —{" "}
              <span className="relative inline-block">
                <span
                  className="bg-gradient-to-r from-[rgba(158,243,21,0.95)] via-white to-[rgba(124,58,237,0.95)] bg-clip-text text-transparent"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  XR + Games
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-6 -inset-y-3 rounded-3xl opacity-40 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(55% 70% at 50% 40%, rgba(158,243,21,0.25), transparent 60%), radial-gradient(55% 70% at 50% 60%, rgba(124,58,237,0.25), transparent 60%)",
                  }}
                />
              </span>
            </h1>

            <p className="max-w-2xl text-pretty text-base leading-relaxed text-white/78 sm:text-lg">
              Switch between XR and Games, search by need, and open each module to see deliverables, timelines, and the
              right engagement model.
            </p>

            <div className="flex flex-wrap gap-3">
              <PrimaryButton href="/contact" tone="neutral">
                Start a project
              </PrimaryButton>
              <GhostButton href="/services/xr">XR page</GhostButton>
              <GhostButton href="/services/games">Games page</GhostButton>
            </div>
          </div>
        </motion.div>

        <div className="mt-8">
          <GlassCard className="p-5 sm:p-6">
            <BloomEdge studio={studio === "Games" ? "Games" : "XR"} />

            <div className="relative flex flex-col gap-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                {/* Studio switcher */}
                <div className="flex flex-wrap items-center gap-2">
                  <SegButton active={studio === "XR"} tone="xr" onClick={() => setStudio("XR")}>
                    XR
                  </SegButton>
                  <SegButton active={studio === "Games"} tone="games" onClick={() => setStudio("Games")}>
                    Games
                  </SegButton>
                  <SegButton active={studio === "Hybrid"} tone="neutral" onClick={() => setStudio("Hybrid")}>
                    Hybrid (All)
                  </SegButton>
                </div>

                {/* Search */}
                <div className="w-full md:w-[360px]">
                  <div className="flex items-center gap-2 rounded-2xl bg-white/[0.06] px-3 py-2 ring-1 ring-white/12">
                    <span className="text-xs text-white/55">Search</span>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="training, co-dev, WebXR, performance…"
                      className="w-full bg-transparent text-sm text-white/85 placeholder:text-white/40 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Engagement model */}
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                  Engagement model
                </div>
                <div className="flex flex-wrap gap-2">
                  <SegButton active={model === "Fixed Scope"} onClick={() => setModel("Fixed Scope")} tone="neutral">
                    Fixed scope
                  </SegButton>
                  <SegButton active={model === "Dedicated Team"} onClick={() => setModel("Dedicated Team")} tone="neutral">
                    Dedicated team
                  </SegButton>
                  <SegButton active={model === "Co-Dev"} onClick={() => setModel("Co-Dev")} tone="neutral">
                    Co-dev squads
                  </SegButton>
                </div>
              </div>

              {/* Model summary */}
              <div className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm font-semibold text-white">{model}</div>
                  <div className="text-sm text-white/70">
                    {model === "Fixed Scope" &&
                      "Milestone-based delivery with clear acceptance criteria and staged releases."}
                    {model === "Dedicated Team" &&
                      "A stable team embedded into your roadmap, sprint cadence, and tooling."}
                    {model === "Co-Dev" &&
                      "Specialist squads (engineering / art / UI) plugged into your production pipeline."}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip tone="neutral">Weekly demos</Chip>
                  <Chip tone="neutral">QA gates</Chip>
                  <Chip tone="neutral">Source + docs handover</Chip>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* CATALOG LIST */}
      <Section className="relative mt-10 sm:mt-14">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Chip tone="neutral">Catalog</Chip>
            <Chip tone="neutral">{items.length} modules</Chip>
            <Chip tone={studio === "XR" ? "xr" : studio === "Games" ? "games" : "neutral"}>
              {studio}
            </Chip>
          </div>
          <GhostButton href="/work">View work</GhostButton>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {items.map((x) => (
              <CatalogCard key={x.id} item={x} />
            ))}
          </AnimatePresence>
        </div>

        {items.length === 0 && (
          <div className="mt-8 rounded-2xl bg-white/[0.05] p-6 text-sm text-white/70 ring-1 ring-white/10">
            No matches. Try a different keyword (e.g., <span className="text-white/85">Quest</span>,{" "}
            <span className="text-white/85">WebXR</span>, <span className="text-white/85">co-dev</span>,{" "}
            <span className="text-white/85">performance</span>).
          </div>
        )}
      </Section>

      {/* ENGAGEMENT MODELS (serious section) */}
      <Section className="relative mt-14 sm:mt-20">
        <GlassCard className="p-6 sm:p-8">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <Chip tone="neutral">Engagement</Chip>
              <Chip tone="neutral">How we work</Chip>
            </div>

            <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
              Choose the engagement model that matches your risk and timeline.
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <ModelCard
                title="Fixed scope"
                blurb="Milestones, acceptance criteria, and staged releases."
                bullets={["Defined deliverables", "Scope control", "Predictable milestones"]}
              />
              <ModelCard
                title="Dedicated team"
                blurb="A stable team embedded into your roadmap and tooling."
                bullets={["Best for long roadmaps", "Velocity + continuity", "Transparent reporting"]}
              />
              <ModelCard
                title="Co-dev squads"
                blurb="Specialist squads plugged into your pipeline."
                bullets={["Engineering / Art / UI", "Faster throughput", "Flexible staffing"]}
              />
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* FAQ */}
      <Section className="relative mt-14 sm:mt-20">
        <div className="flex flex-wrap items-center gap-3">
          <Chip tone="neutral">FAQ</Chip>
          <Chip tone="neutral">Procurement-friendly</Chip>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          {FAQ.map((f, idx) => (
            <AccordionItem
              key={f.q}
              q={f.q}
              a={f.a}
              open={openFaq === idx}
              onToggle={() => setOpenFaq(openFaq === idx ? null : idx)}
            />
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="relative mt-14 pb-20 sm:mt-20">
        <div className="relative overflow-hidden rounded-[28px] bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-24 opacity-80 blur-3xl"
            style={{
              background:
                "radial-gradient(50% 60% at 25% 20%, rgba(158,243,21,0.22), transparent 60%), radial-gradient(50% 60% at 75% 80%, rgba(124,58,237,0.22), transparent 60%)",
            }}
          />
          <div className="relative p-6 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <div className="flex flex-wrap gap-2">
                  <Chip tone="neutral">One team. Two studios.</Chip>
                  <Chip tone="neutral">Fast kickoff</Chip>
                  <Chip tone="neutral">Clear milestones</Chip>
                </div>
                <h3 className="mt-4 text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                  Share your goal — we’ll recommend the right module and model.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/72">
                  Tell us your platform, timeline, and target outcomes. We’ll respond with a scoped plan and delivery
                  approach.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <PrimaryButton href="/services/xr" tone="xr">
                  XR Services
                </PrimaryButton>
                <PrimaryButton href="/services/games" tone="games">
                  Game Services
                </PrimaryButton>
                <GhostButton href="/contact">Start a project</GhostButton>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

/** --- Catalog Card --- */
function CatalogCard({ item }: { item: CatalogItem }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const tone = item.studio === "XR" ? "xr" : "games";
  const accent = item.studio === "XR" ? TOKENS.xr : TOKENS.games;

  return (
    <motion.div
      layout
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.22 }}
      className="relative"
    >
      <div
        className={cx(
          "relative overflow-hidden rounded-2xl",
          "bg-white/[0.06] ring-1 ring-white/10 backdrop-blur",
          "transition-all duration-200 hover:-translate-y-[2px] hover:ring-white/18",
          "shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
        )}
      >
        {/* Controlled bloom edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-20 opacity-0 blur-3xl transition-opacity duration-200 group-hover:opacity-80"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(120% 120% at 20% 10%, ${
              item.studio === "XR" ? "rgba(158,243,21,0.12)" : "rgba(124,58,237,0.12)"
            }, transparent 55%),
                         radial-gradient(120% 120% at 80% 90%, ${
                           item.studio === "XR" ? "rgba(158,243,21,0.10)" : "rgba(124,58,237,0.10)"
                         }, transparent 55%)`,
          }}
        />

        <div className="relative p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone={tone}>{item.studio}</Chip>
                <Chip tone="neutral">{item.timeline}</Chip>
              </div>
              <div className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white">
                {item.title}
              </div>
              <div className="mt-2 text-sm text-white/72">{item.whoFor}</div>
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              className={cx(
                "rounded-full px-3 py-1 text-xs ring-1 backdrop-blur transition",
                open
                  ? "bg-white/12 text-white ring-white/22"
                  : "bg-white/6 text-white/75 ring-white/14 hover:bg-white/10"
              )}
            >
              {open ? "Hide details" : "View details"}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.slice(0, 4).map((t) => (
              <Chip key={t} tone="neutral">
                {t}
              </Chip>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                Outcomes
              </div>
              <ul className="mt-3 space-y-2">
                {item.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                    <span className="text-pretty">{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                Quick actions
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <PrimaryButton href={item.href} tone={tone}>
                  Open module
                </PrimaryButton>
                <GhostButton href="/contact">Talk to us</GhostButton>
              </div>
              <div className="mt-4 text-xs text-white/60">
                Includes weekly demos • QA gates • source + docs handover
              </div>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="mt-5 rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                  <div className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                    Deliverables
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {item.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-2 text-sm text-white/80">
                        <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                        <span className="text-pretty">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

/** --- Engagement model card --- */
function ModelCard({
  title,
  blurb,
  bullets,
}: {
  title: string;
  blurb: string;
  bullets: string[];
}) {
  return (
    <div
      className={cx(
        "relative rounded-2xl p-5",
        "bg-white/[0.05] ring-1 ring-white/10 backdrop-blur",
        "shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
      )}
    >
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 text-sm text-white/72">{blurb}</div>
      <div className="mt-4 space-y-2">
        {bullets.map((b) => (
          <div key={b} className="flex items-start gap-2 text-sm text-white/80">
            <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/35" />
            <span>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

