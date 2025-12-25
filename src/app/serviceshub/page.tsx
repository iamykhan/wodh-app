"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { ReactNode } from "react";

type Studio = "XR" | "Games" | "Hybrid";

type ServicePillar = {
  title: string;
  blurb: string;
  bullets: string[];
  platforms: string[];
  href: string;
  studio: Exclude<Studio, "Hybrid">;
};

type CaseTile = {
  id: string;
  title: string;
  studio: Studio;
  tags: string[];
  platform: string;
  thumb: string;
  hover: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** WODH — Tokens (tight + premium) */
const TOKENS = {
  bg: "#0C0722",
  xr: "#9EF315", // neon green
  games: "#7C3AED", // violet
};

const PILLARS: ServicePillar[] = [
  {
    studio: "XR",
    title: "XR Studio",
    blurb:
      "Production-ready XR systems for training, simulation, product storytelling, and spatial workflows — built to deploy, not demo.",
    bullets: [
      "XR Training & Simulation (Quest / AR)",
      "Digital Twins & Ops Visualization",
      "Spatial Product Demos & Sales Enablement",
      "WebXR & Lightweight Browser Experiences",
      "Enterprise Deployment + Device Ops",
    ],
    platforms: ["Meta Quest", "iOS AR", "Android AR", "WebXR", "Unity", "Unreal"],
    href: "/services/xr",
  },
  {
    studio: "Games",
    title: "Games Studio",
    blurb:
      "Game development with studio-grade pipelines — from prototyping to full production, co-dev, and live content velocity.",
    bullets: [
      "Full-Cycle Game Development",
      "Co-Development (Engineering / Art / UI)",
      "Live Ops, Updates & Content Drops",
      "Optimization & Performance Passes",
      "Multiplayer / Systems / Tools Support",
    ],
    platforms: ["PC", "Console", "Mobile", "Unity", "Unreal", "Backend Hooks"],
    href: "/services/games",
  },
];

const PIPELINE: Array<{ step: string; title: string; desc: string }> = [
  { step: "01", title: "Discovery", desc: "Goals, constraints, and success metrics." },
  { step: "02", title: "Prototype", desc: "Risk-killing proof, fast iteration loops." },
  { step: "03", title: "Production", desc: "Systems + content pipeline, sprint cadence." },
  { step: "04", title: "QA & Polish", desc: "Performance, edge-cases, platform standards." },
  { step: "05", title: "Launch", desc: "Release support, store assets, deployment." },
  { step: "06", title: "Support", desc: "Roadmap, updates, and continuous improvement." },
];

const CASES: CaseTile[] = [
  {
    id: "case-01",
    title: "Safety Training Module",
    studio: "XR",
    tags: ["Training", "Compliance", "Quest"],
    platform: "Meta Quest",
    thumb: "/placeholder/case-xr-1.jpg",
    hover: "/placeholder/case-xr-1h.jpg",
  },
  {
    id: "case-02",
    title: "Interactive Product Walkthrough",
    studio: "XR",
    tags: ["Sales", "Demo", "WebXR"],
    platform: "WebXR",
    thumb: "/placeholder/case-xr-2.jpg",
    hover: "/placeholder/case-xr-2h.jpg",
  },
  {
    id: "case-03",
    title: "Simulation + Digital Twin",
    studio: "XR",
    tags: ["Ops", "Twin", "Visualization"],
    platform: "Unity",
    thumb: "/placeholder/case-xr-3.jpg",
    hover: "/placeholder/case-xr-3h.jpg",
  },
  {
    id: "case-04",
    title: "Prototype to Production Game",
    studio: "Games",
    tags: ["Prototype", "Gameplay", "Systems"],
    platform: "Unity",
    thumb: "/placeholder/case-g-1.jpg",
    hover: "/placeholder/case-g-1h.jpg",
  },
  {
    id: "case-05",
    title: "Co-Dev Content Pipeline",
    studio: "Games",
    tags: ["Co-dev", "Content", "UI"],
    platform: "Unreal",
    thumb: "/placeholder/case-g-2.jpg",
    hover: "/placeholder/case-g-2h.jpg",
  },
  {
    id: "case-06",
    title: "Performance + Live Ops",
    studio: "Games",
    tags: ["Live Ops", "Optimization", "Mobile"],
    platform: "Mobile",
    thumb: "/placeholder/case-g-3.jpg",
    hover: "/placeholder/case-g-3h.jpg",
  },
];

const CAPABILITIES = {
  engines: ["Unity", "Unreal Engine", "WebXR", "Three.js"],
  xr: ["Meta Quest", "ARKit", "ARCore", "VisionOS-ready"],
  games: ["PC", "Console", "Mobile", "Multiplayer-ready"],
  craft: ["UI/UX", "3D Art", "Tech Art", "VFX", "QA", "Production"],
};

function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
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
  children: ReactNode;
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

function GhostButton({ href, children }: { href: string; children: ReactNode }) {
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
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cx("relative mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </section>
  );
}

function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
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

/** Controlled bloom layer */
function Bloom({ studio, active }: { studio: Exclude<Studio, "Hybrid">; active: boolean }) {
  const soft = studio === "XR" ? "rgba(158,243,21,0.22)" : "rgba(124,58,237,0.22)";
  const hard = studio === "XR" ? "rgba(158,243,21,0.38)" : "rgba(124,58,237,0.38)";

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[44px]"
        initial={{ opacity: 0.35, scale: 0.98 }}
        animate={{ opacity: active ? 1 : 0.38, scale: active ? 1.02 : 0.98 }}
        transition={{ duration: 0.25 }}
        style={{
          background: `radial-gradient(60% 60% at 50% 40%, ${hard}, transparent 65%)`,
          filter: "blur(24px)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        initial={{ opacity: 0.25 }}
        animate={{ opacity: active ? 0.65 : 0.28 }}
        transition={{ duration: 0.25 }}
        style={{
          background: `radial-gradient(120% 120% at 20% 10%, ${soft}, transparent 55%),
                       radial-gradient(120% 120% at 80% 90%, ${soft}, transparent 55%)`,
        }}
      />
    </>
  );
}

function CaseCard({ tile }: { tile: CaseTile }) {
  const [hovered, setHovered] = useState(false);
  const tone = tile.studio === "XR" ? "xr" : tile.studio === "Games" ? "games" : "neutral";

  return (
    <a
      href="/work"
      className={cx(
        "group relative overflow-hidden rounded-2xl",
        "bg-white/[0.06] ring-1 ring-white/10 backdrop-blur",
        "transition-all duration-200 hover:-translate-y-[2px] hover:ring-white/18"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80 transition-opacity duration-200 group-hover:opacity-95"
          style={{ backgroundImage: `url(${hovered ? tile.hover : tile.thumb})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="relative p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-white">{tile.title}</div>
            <div className="mt-1 text-xs text-white/70">{tile.platform}</div>
          </div>
          <Chip tone={tone}>{tile.studio}</Chip>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tile.tags.slice(0, 3).map((t) => (
            <Chip key={t} tone="neutral">
              {t}
            </Chip>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function ServicesHub() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Studio>("Hybrid");

  const filteredCases = useMemo(() => {
    if (filter === "Hybrid") return CASES;
    return CASES.filter((c) => c.studio === filter);
  }, [filter]);

  const heroIn = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen w-full" style={{ background: TOKENS.bg }}>
      {/* Global background depth */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_0%,rgba(158,243,21,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_80%_100%,rgba(124,58,237,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_50%_120%,rgba(0,0,0,0.80),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative h-10 sm:h-14" />

      {/* HERO */}
      <Section className="relative pt-8 sm:pt-12">
        <motion.div {...heroIn} transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Chip tone="neutral">Services</Chip>
              <Chip tone="neutral">One team. Two studios.</Chip>
              <Chip tone="neutral">Production-first</Chip>
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-[-0.02em] text-white sm:text-6xl">
              Build with a studio that ships —{" "}
              <span className="relative inline-block">
                <span
                  className="bg-gradient-to-r from-[rgba(158,243,21,0.95)] via-white to-[rgba(124,58,237,0.95)] bg-clip-text text-transparent"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  XR ↔ Games
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
              Premium, reliable delivery across immersive experiences and game production — with a shared pipeline,
              rigorous QA, and studio-grade craft.
            </p>

            <div className="flex flex-wrap gap-3">
              <PrimaryButton href="/services/xr" tone="xr">
                Explore XR Services
              </PrimaryButton>
              <PrimaryButton href="/services/games" tone="games">
                Explore Game Services
              </PrimaryButton>
              <GhostButton href="#pipeline">How we work</GhostButton>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              <Chip tone="xr">XR: Training • Simulation • Spatial Demos</Chip>
              <Chip tone="games">Games: Full Production • Co-dev • Live Ops</Chip>
              <Chip tone="neutral">Weekly reporting • QA gates • Clear milestones</Chip>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* FOUR PILLARS (copied from splitportals style) */}
      <div className="relative mt-10 sm:mt-14">
        <FinalFourPillarsSection />
      </div>

      {/* PIPELINE */}
      <Section id="pipeline" className="relative mt-14 sm:mt-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Chip tone="neutral">Pipeline</Chip>
              <Chip tone="neutral">One production system</Chip>
            </div>
            <GhostButton href="/contact">Start a project</GhostButton>
          </div>

          <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
            A shared delivery pipeline — consistent outcomes across both studios.
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {PIPELINE.map((s) => (
              <div
                key={s.step}
                className={cx(
                  "relative rounded-2xl p-5",
                  "bg-white/[0.05] ring-1 ring-white/10 backdrop-blur",
                  "shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-white/60">{s.step}</div>
                  <div className="h-[1px] w-12 bg-white/10" />
                </div>
                <div className="mt-3 text-sm font-semibold text-white">{s.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/72">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROOF GRID */}
      <Section className="relative mt-14 sm:mt-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Chip tone="neutral">Proof</Chip>
              <Chip tone="neutral">Selected work</Chip>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className={cx(
                  "rounded-full px-3 py-1 text-xs ring-1 backdrop-blur transition",
                  filter === "Hybrid"
                    ? "bg-white/12 text-white ring-white/22"
                    : "bg-white/6 text-white/75 ring-white/14 hover:bg-white/10"
                )}
                onClick={() => setFilter("Hybrid")}
              >
                All
              </button>
              <button
                className={cx(
                  "rounded-full px-3 py-1 text-xs ring-1 backdrop-blur transition",
                  filter === "XR"
                    ? "bg-[rgba(158,243,21,0.14)] text-white ring-[rgba(158,243,21,0.35)]"
                    : "bg-white/6 text-white/75 ring-white/14 hover:bg-white/10"
                )}
                onClick={() => setFilter("XR")}
              >
                XR
              </button>
              <button
                className={cx(
                  "rounded-full px-3 py-1 text-xs ring-1 backdrop-blur transition",
                  filter === "Games"
                    ? "bg-[rgba(124,58,237,0.16)] text-white ring-[rgba(124,58,237,0.38)]"
                    : "bg-white/6 text-white/75 ring-white/14 hover:bg-white/10"
                )}
                onClick={() => setFilter("Games")}
              >
                Games
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredCases.map((c) => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22 }}
                >
                  <CaseCard tile={c} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-white/65">Want deeper breakdowns? Browse the full portfolio.</div>
            <PrimaryButton href="/work" tone="neutral">
              View Work
            </PrimaryButton>
          </div>
        </div>
      </Section>

      {/* CAPABILITIES */}
      <Section className="relative mt-14 sm:mt-20">
        <GlassCard className="p-6 sm:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Chip tone="neutral">Capabilities</Chip>
              <Chip tone="neutral">Engines • Platforms • Craft</Chip>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <div className="text-sm font-semibold text-white">Engines</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {CAPABILITIES.engines.map((x) => (
                    <Chip key={x} tone="neutral">
                      {x}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">XR Platforms</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {CAPABILITIES.xr.map((x) => (
                    <Chip key={x} tone="xr">
                      {x}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Game Platforms</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {CAPABILITIES.games.map((x) => (
                    <Chip key={x} tone="games">
                      {x}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div>
              <div className="text-sm font-semibold text-white">Craft</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {CAPABILITIES.craft.map((x) => (
                  <Chip key={x} tone="neutral">
                    {x}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
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
                  <Chip tone="neutral">Ready to build?</Chip>
                  <Chip tone="neutral">Fast kickoff</Chip>
                  <Chip tone="neutral">Clear milestones</Chip>
                </div>
                <h3 className="mt-4 text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
                  Tell us what you’re building — we’ll recommend the best track.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/72">
                  Choose XR or Games, share your timeline and goals, and we’ll respond with a scoped plan and delivery
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

type PillarKey = "XR" | "Games" | "3D" | "CreativeTech";

type PortalCardV4Like = {
  id: string;
  pillar: PillarKey;
  title: string;
  paragraph: string;
  href: string;
  services: string[];
};

const FOUR_PILLARS: PortalCardV4Like[] = [
  {
    id: "xr",
    pillar: "XR",
    title: "XR Studio",
    paragraph:
      "Training, simulation, and spatial product storytelling — engineered for deployment, device ops, and real outcomes.",
    href: "/services/xr",
    services: ["Quest / AR", "Training sims", "Digital twins", "Unity / Unreal", "Enterprise rollout", "Analytics"],
  },
  {
    id: "games",
    pillar: "Games",
    title: "Games Studio",
    paragraph:
      "Studio-grade pipelines from prototype to production — co-dev squads, performance passes, and live content velocity.",
    href: "/services/games",
    services: ["Full production", "Co-dev squads", "Live ops", "Optimization", "QA gates", "Platform compliance"],
  },
  {
    id: "art",
    pillar: "3D",
    title: "3D Art & Design",
    paragraph:
      "High-craft real-time assets — characters, environments, animation, and tech art tuned for performance and polish.",
    href: "/services/3d",
    services: ["Modeling", "Rig + animation", "Environment art", "Tech art", "Shaders", "Optimization"],
  },
  {
    id: "creative",
    pillar: "CreativeTech",
    title: "Creative Tech",
    paragraph:
      "Interactive experiences across web, installations, and real-time systems — engineered for wow without chaos.",
    href: "/services/creative-tech",
    services: ["Interactive web", "Installations", "Realtime systems", "Motion systems", "Three.js / Unity", "Generative visuals"],
  },
];

function pillarLabel(p: PillarKey) {
  if (p === "CreativeTech") return "Creative Tech";
  return p;
}

function pillarAccent(p: PillarKey) {
  if (p === "XR") return TOKENS.xr;
  if (p === "Games") return TOKENS.games;
  return "rgba(255,255,255,0.85)";
}

function pillarGradient(p: PillarKey) {
  if (p === "XR") return "linear-gradient(90deg, rgba(158,243,21,0.95), rgba(255,255,255,0.95))";
  if (p === "Games") return "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(124,58,237,0.95))";
  if (p === "3D")
    return "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.78))";
  return "linear-gradient(90deg, rgba(158,243,21,0.70), rgba(255,255,255,0.92), rgba(124,58,237,0.70))";
}

function BloomFourPillars({ pillar, active }: { pillar: PillarKey; active: boolean }) {
  const xrHard = "rgba(158,243,21,0.34)";
  const gHard = "rgba(124,58,237,0.34)";
  const xrSoft = "rgba(158,243,21,0.16)";
  const gSoft = "rgba(124,58,237,0.16)";

  const hard =
    pillar === "XR"
      ? xrHard
      : pillar === "Games"
        ? gHard
        : pillar === "CreativeTech"
          ? "rgba(255,255,255,0.24)"
          : "rgba(255,255,255,0.22)";

  const wash =
    pillar === "XR"
      ? `radial-gradient(120% 120% at 20% 10%, ${xrSoft}, transparent 55%),
         radial-gradient(120% 120% at 80% 90%, ${xrSoft}, transparent 55%)`
      : pillar === "Games"
        ? `radial-gradient(120% 120% at 20% 10%, ${gSoft}, transparent 55%),
           radial-gradient(120% 120% at 80% 90%, ${gSoft}, transparent 55%)`
        : pillar === "CreativeTech"
          ? `radial-gradient(120% 120% at 18% 35%, ${xrSoft}, transparent 60%),
             radial-gradient(120% 120% at 82% 60%, ${gSoft}, transparent 60%)`
          : `radial-gradient(120% 120% at 50% 40%, rgba(255,255,255,0.14), transparent 58%)`;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[44px]"
        initial={{ opacity: 0.35, scale: 0.98 }}
        animate={{ opacity: active ? 1 : 0.38, scale: active ? 1.02 : 0.98 }}
        transition={{ duration: 0.25 }}
        style={{
          background: `radial-gradient(60% 60% at 50% 40%, ${hard}, transparent 65%)`,
          filter: "blur(24px)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px]"
        initial={{ opacity: 0.25 }}
        animate={{ opacity: active ? 0.65 : 0.28 }}
        transition={{ duration: 0.25 }}
        style={{ background: wash }}
      />
    </>
  );
}

function KeyServicesBar({
  pillar,
  services,
  href,
  max = { base: 4, sm: 5, lg: 6 },
}: {
  pillar: PillarKey;
  services: string[];
  href: string;
  max?: { base: number; sm: number; lg: number };
}) {
  const isXR = pillar === "XR";
  const isG = pillar === "Games";
  const isDual = pillar === "3D" || pillar === "CreativeTech";

  const ring = isXR
    ? "ring-[rgba(158,243,21,0.22)]"
    : isG
      ? "ring-[rgba(124,58,237,0.22)]"
      : "ring-white/12";
  const labelTone = isXR
    ? "text-[rgba(221,255,180,0.92)]"
    : isG
      ? "text-[rgba(228,220,255,0.92)]"
      : "text-white/78";

  const baseVisible = services.slice(0, max.base);
  const smVisible = services.slice(0, max.sm);
  const lgVisible = services.slice(0, max.lg);

  const baseMore = Math.max(0, services.length - max.base);
  const smMore = Math.max(0, services.length - max.sm);
  const lgMore = Math.max(0, services.length - max.lg);

  const MoreChip = ({ n }: { n: number }) =>
    n > 0 ? (
      <a
        href={href}
        className={cx(
          "inline-flex items-center rounded-full px-3 py-1 text-xs whitespace-nowrap",
          "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur text-white/80",
          "transition hover:bg-white/[0.10] hover:text-white"
        )}
      >
        +{n} more
      </a>
    ) : null;

  const ServiceChip = ({ s }: { s: string }) => (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs whitespace-nowrap",
        "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur text-white/82"
      )}
    >
      {s}
    </span>
  );

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-[22px]",
        "bg-white/[0.05] ring-1 backdrop-blur-xl shadow-[0_22px_70px_rgba(0,0,0,0.45)]",
        ring
      )}
    >
      <div
        aria-hidden
        className={cx("pointer-events-none absolute inset-0 opacity-65", isDual ? "" : "hidden")}
        style={{
          background:
            "radial-gradient(55% 65% at 18% 45%, rgba(158,243,21,0.10), transparent 60%), radial-gradient(55% 65% at 82% 55%, rgba(124,58,237,0.10), transparent 60%)",
        }}
      />

      <div className="relative flex h-[88px] items-center px-4">
        <div className="w-full">
          <div className="flex items-center justify-between gap-3">
            <div className={cx("text-[11px] font-semibold uppercase tracking-[0.14em]", labelTone)}>Key services</div>
            <a href={href} className="text-xs font-medium text-white/70 hover:text-white transition whitespace-nowrap">
              View →
            </a>
          </div>

          <div className="mt-2 flex flex-nowrap gap-2 overflow-hidden sm:hidden">
            {baseVisible.map((s) => (
              <ServiceChip key={s} s={s} />
            ))}
            <MoreChip n={baseMore} />
          </div>

          <div className="mt-2 hidden sm:flex sm:flex-nowrap sm:gap-2 sm:overflow-hidden lg:hidden">
            {smVisible.map((s) => (
              <ServiceChip key={s} s={s} />
            ))}
            <MoreChip n={smMore} />
          </div>

          <div className="mt-2 hidden lg:flex lg:flex-nowrap lg:gap-2 lg:overflow-hidden">
            {lgVisible.map((s) => (
              <ServiceChip key={s} s={s} />
            ))}
            <MoreChip n={lgMore} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FourPillarCard({ card }: { card: PortalCardV4Like }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const label = pillarLabel(card.pillar);
  const dot = pillarAccent(card.pillar);

  return (
    <div className="relative" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
      <motion.div
        className={cx(
          "relative overflow-hidden rounded-[30px]",
          "bg-white/[0.06] ring-1 ring-white/12 backdrop-blur-xl",
          "shadow-[0_44px_140px_rgba(0,0,0,0.60)]"
        )}
        animate={reduceMotion ? {} : { y: active ? -3 : 0 }}
        transition={{ duration: 0.22 }}
      >
        <BloomFourPillars pillar={card.pillar} active={active} />

        <div className="relative flex min-h-[440px] flex-col justify-between p-7 sm:min-h-[480px] sm:p-10 lg:min-h-[520px] lg:p-12">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">{label}</span>
            </div>

            <a
              href={card.href}
              className={cx(
                "group inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium",
                "text-white/85 ring-1 ring-white/12 bg-white/[0.04] backdrop-blur",
                "transition-all duration-200 hover:-translate-y-[1px] hover:bg-white/[0.07] hover:text-white",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              )}
            >
              View more
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-[2px]">
                →
              </span>
            </a>
          </div>

          <div className="mt-6">
            <div className={cx("text-balance font-semibold tracking-[-0.04em] leading-[0.95]", "text-5xl sm:text-6xl lg:text-7xl")}>
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{ WebkitTextFillColor: "transparent", backgroundImage: pillarGradient(card.pillar) }}
              >
                {card.title}
              </span>
            </div>
            <p className="mt-5 max-w-[56ch] text-sm leading-relaxed text-white/74 sm:text-base">{card.paragraph}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-white/55">
            <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-white/10">
              Production-first
            </span>
            <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-white/10">
              QA gates
            </span>
            <span className="inline-flex items-center rounded-full bg-white/[0.05] px-3 py-1 ring-1 ring-white/10">
              Weekly demos
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FinalFourPillarsSection() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 final-four-pillars-section">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/80 ring-1 ring-white/15 backdrop-blur">
            Services
          </span>
          <span className="inline-flex items-center rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/70 ring-1 ring-white/12 backdrop-blur">
            XR • Games • 3D • Creative Tech
          </span>
        </div>

        <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
          Four pillars. One production standard.
        </h2>

        <p className="max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
          Each track has a dedicated page — this portal helps clients self-select fast, without noise.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {FOUR_PILLARS.map((c) => (
          <div key={c.id} className="flex flex-col gap-4">
            <FourPillarCard card={c} />
            <KeyServicesBar pillar={c.pillar} services={c.services} href={c.href} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-white/55">Want help choosing? Share your goal — we’ll recommend the best track.</div>
        <a href="/contact" className="text-xs font-medium text-white/80 transition hover:text-white">
          Start a project →
        </a>
      </div>
    </section>
  );
}

function PortalCard({ pillar, index }: { pillar: ServicePillar; index: number }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  const tone = pillar.studio === "XR" ? "xr" : "games";
  const accent = pillar.studio === "XR" ? TOKENS.xr : TOKENS.games;

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="relative" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
        <GlassCard className="group p-6 sm:p-8">
          <Bloom studio={pillar.studio} active={active} />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-20 top-0 h-full w-40 rotate-12"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: active ? 0.35 : 0, x: active ? 220 : -40 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
              filter: "blur(2px)",
            }}
          />

          <motion.div
            className="relative"
            animate={reduceMotion ? {} : { y: active ? -2 : 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Chip tone={tone}>{pillar.title}</Chip>
              <span className="text-xs font-medium text-white/60">WODH Studio</span>
            </div>

            <h3 className="mt-4 text-balance text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
              {pillar.studio === "XR" ? (
                <>
                  Spatial systems with{" "}
                  <span
                    className="bg-gradient-to-r from-[rgba(158,243,21,0.95)] to-white bg-clip-text text-transparent"
                    style={{ WebkitTextFillColor: "transparent" }}
                  >
                    controlled neon clarity
                  </span>
                  .
                </>
              ) : (
                <>
                  Game production with{" "}
                  <span
                    className="bg-gradient-to-r from-white to-[rgba(124,58,237,0.95)] bg-clip-text text-transparent"
                    style={{ WebkitTextFillColor: "transparent" }}
                  >
                    studio-grade pipelines
                  </span>
                  .
                </>
              )}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-white/74">{pillar.blurb}</p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">What we deliver</div>
                <ul className="mt-3 space-y-2">
                  {pillar.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
                      <span className="text-pretty">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">Platforms</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pillar.platforms.map((x) => (
                    <Chip key={x} tone={tone}>
                      {x}
                    </Chip>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <PrimaryButton href={pillar.href} tone={tone}>
                    View {pillar.studio} Services
                  </PrimaryButton>
                  <GhostButton href="/contact">Talk to us</GhostButton>
                </div>

                <div className="mt-4 text-xs text-white/60">
                  Typical kickoff: <span className="text-white/80">1–2 weeks</span> • Weekly demos • QA gates
                </div>
              </div>
            </div>
          </motion.div>
        </GlassCard>
      </div>
    </motion.div>
  );
}


