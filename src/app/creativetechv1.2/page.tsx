"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* =======================================================================================
   WODH — CREATIVE TECH SERVICES
   Variant B — Immersive Storyboard (Narrative-first)
   Vibe: cinematic + creative — “this is how experiences come alive”

   Structure (same IDs as your blueprint):
   1)  creative-hero
   2)  creative-what-we-build
   3)  creative-capability-matrix
   4)  creative-tech-plays
   5)  creative-pipeline
   6)  creative-proof
   7)  creative-integrations
   8)  creative-engagement
   9)  creative-faq
   10) creative-cta
======================================================================================= */

type MomentKey = "Microsite" | "Installation" | "AR" | "Generative" | "Configurator";
type StageKey = "Idea" | "Interaction" | "System" | "Outcome";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ACCENT = "rgba(67,232,255,1)"; // Electric Cyan / Aqua
const VIOLET = "rgba(167,139,250,1)";
const GREEN = "rgba(158,243,21,1)";

const REEL: Array<{
  key: MomentKey;
  label: string;
  line: string;
  image: string;
  chips: string[];
}> = [
  {
    key: "Microsite",
    label: "Microsite Moment",
    line: "Story → interaction → measurable outcome.",
    image:
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1800&q=70",
    chips: ["WebGL", "Telemetry", "SEO-safe fallback"],
  },
  {
    key: "Installation",
    label: "Installation Moment",
    line: "Offline-first runtime, show-control cues, recovery paths.",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1800&q=70",
    chips: ["Kiosk mode", "Offline packs", "Runbooks"],
  },
  {
    key: "AR",
    label: "AR Moment",
    line: "Camera entry, permission UX, fallbacks, sharing hooks.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1800&q=70",
    chips: ["Camera UX", "QR entry", "Metrics"],
  },
  {
    key: "Generative",
    label: "Generative Moment",
    line: "Brand-safe scale with guardrails and approvals.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1800&q=70",
    chips: ["Templates", "Guardrails", "Audit trail"],
  },
  {
    key: "Configurator",
    label: "Configurator Moment",
    line: "Rules + state → instant visual feedback across devices.",
    image:
      "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=1800&q=70",
    chips: ["Rules engine", "Perf budget", "Device QA"],
  },
];

const TIMELINE: Array<{
  stage: StageKey;
  title: string;
  quote: string;
  body: string;
  bullets: string[];
}> = [
  {
    stage: "Idea",
    title: "It starts as a feeling.",
    quote: "“The concept is the camera move.”",
    body:
      "We define what the audience should feel and what success looks like. Then we identify constraints: targets, inputs, and environments.",
    bullets: ["Audience + intent", "Targets + constraints", "Success metric"],
  },
  {
    stage: "Interaction",
    title: "The moment becomes a mechanic.",
    quote: "“Touch, motion, camera — the story listens back.”",
    body:
      "We design the interaction loop: input → feedback → outcome. Clear affordances, safe fallbacks, and a path back when reality gets messy.",
    bullets: ["Input mapping", "Feedback timing", "Fallback UX"],
  },
  {
    stage: "System",
    title: "The magic becomes a system.",
    quote: "“Behind the glow is an engine.”",
    body:
      "We build the runtime and pipelines: content schema, performance budgets, device QA matrix, deployment mode, and telemetry events.",
    bullets: ["Runtime + pipeline", "Perf budget", "Device QA plan"],
  },
  {
    stage: "Outcome",
    title: "The system ships as proof.",
    quote: "“What you ship is what you can measure.”",
    body:
      "We deploy with runbooks, monitoring hooks, and dashboards. The work becomes repeatable: updates, experiments, and measurable performance.",
    bullets: ["Deploy plan + runbook", "Telemetry + dashboards", "Iteration cadence"],
  },
];

const CAP_MATRIX = [
  { name: "Real-time rendering", line: "Performance-first visuals under constraints." },
  { name: "Interaction design", line: "Inputs → feedback → outcomes (error-safe)." },
  { name: "Device + sensor input", line: "Camera/IMU/depth/QR — with fallbacks." },
  { name: "Web + mobile delivery", line: "Speed, stability, maintainability." },
  { name: "Kiosk / show-control", line: "Offline-first with recovery." },
  { name: "Backend + analytics", line: "Measure, prove, iterate." },
  { name: "Tooling + content pipelines", line: "Repeatable workflows that scale." },
];

const TECH_PLAYS = [
  {
    name: "Interactive Microsite Engine",
    line: "Cinematic WebGL storytelling + content pipeline + telemetry.",
    chips: ["WebGL", "Telemetry", "SEO-safe"],
    image:
      "https://images.unsplash.com/photo-1529336953121-a0a29c2c24b3?auto=format&fit=crop&w=1800&q=70",
  },
  {
    name: "Installation Loop System",
    line: "Offline-ready kiosk runtime with remote updates + rollback + runbooks.",
    chips: ["Offline packs", "Kiosk mode", "Runbooks"],
    image:
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1800&q=70",
  },
  {
    name: "AR Campaign Kit",
    line: "AR + landing + metrics + fallbacks for reliable activations.",
    chips: ["Camera UX", "QR entry", "Dashboards"],
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1800&q=70",
  },
  {
    name: "Realtime Visualizer",
    line: "Rules + data → instant 3D state changes across devices.",
    chips: ["Rules engine", "Perf budget", "Device QA"],
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1800&q=70",
  },
  {
    name: "Generative Content Tool",
    line: "Brand-safe templates + approvals + audit trails for scale.",
    chips: ["Templates", "Guardrails", "Audit"],
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1800&q=70",
  },
];

const BTS = [
  {
    label: "Prototype clip",
    note: "Fast interactive slice to validate IO + “feel”.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=70",
  },
  {
    label: "Iteration notes",
    note: "Performance budgets, fallback states, edge-case coverage.",
    image:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1600&q=70",
  },
  {
    label: "Deployment photo",
    note: "Targets, runbooks, recovery path, and monitoring hooks.",
    image:
      "https://images.unsplash.com/photo-1527244782565-093c4f6b3a1e?auto=format&fit=crop&w=1600&q=70",
  },
];

const PROOF_GALLERY = [
  {
    title: "Static → Interactive",
    before: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1400&q=70",
    after: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=70",
    tags: ["Realtime loop", "Telemetry", "Fallback UX"],
  },
  {
    title: "Poster → System",
    before: "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1400&q=70",
    after: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1400&q=70",
    tags: ["Offline packs", "Runbooks", "Remote updates"],
  },
  {
    title: "Concept → Configurator",
    before: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?auto=format&fit=crop&w=1400&q=70",
    after: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=70",
    tags: ["Rules engine", "Perf budget", "Device QA"],
  },
];

const FAQS = [
  { q: "Can you build a prototype first?", a: "Yes. We recommend a prototype sprint to validate targets, inputs, and “feel” before full production." },
  { q: "Can you handle on-site installations?", a: "We can support deployment planning, kiosk mode, runbooks, recovery flows, and coordination. On-site depends on location and scope." },
  { q: "Can it run offline?", a: "Yes. For venues and installations we design offline-first behavior, cached content packs, and safe update/rollback paths." },
  { q: "Who owns the source + assets?", a: "You do. We deliver source, assets, and handover documentation per the engagement model." },
];

/* =======================================================================================
   Page
======================================================================================= */

export default function CreativeTechServices_VariantB_ImmersiveStoryboard() {
  const reduceMotion = useReducedMotion();
  const [activeMoment, setActiveMoment] = useState<MomentKey>("Microsite");

  return (
    <main className="relative min-h-screen bg-[#07051A] text-white">
      <CinematicBackground />

      {/* ===================================================================================
          SECTION 1 — Hero (ID: creative-hero)
          Hero = Cinematic Reel Strip (full-bleed band)
      =================================================================================== */}
      <section id="creative-hero" className="relative">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-14 sm:pt-16 pb-10">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="soft">Creative Tech</Pill>
            <Pill tone="cyan">Immersive Storyboard</Pill>
            <Pill tone="neutral">Narrative-first</Pill>
          </div>

          <h1 className="mt-6 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.04em] leading-[1.02]">
            Creative tech, told in{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(67,232,255,1), rgba(167,139,250,1), rgba(255,255,255,.85))",
              }}
            >
              cinematic moments
            </span>
            .
          </h1>

          <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed">
            A narrative page for creative directors: see how ideas become interactions, interactions become systems,
            and systems ship as proof.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <LinkBtn href="#creative-what-we-build" variant="primary">
              Watch the storyboard
            </LinkBtn>
            <LinkBtn href="#creative-capability-matrix" variant="secondary">
              See capabilities
            </LinkBtn>
            <LinkBtn href="#creative-cta" variant="ghost">
              Start a project →
            </LinkBtn>
          </div>
        </div>

        {/* Full-bleed reel band */}
        <div className="relative w-full">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,5,26,0),rgba(7,5,26,.85))]" />
          <div className="mx-auto w-full max-w-[1400px] px-2 sm:px-6 pb-10">
            <div className="relative rounded-[28px] border border-white/10 bg-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_15%_25%,rgba(67,232,255,.16),transparent_60%),radial-gradient(900px_520px_at_85%_30%,rgba(167,139,250,.10),transparent_60%)]" />
              <div className="relative p-3 sm:p-4">
                <div className="flex items-center justify-between gap-3 px-2 sm:px-3 pb-3">
                  <div className="text-xs font-medium text-white/70">Cinematic Reel Strip</div>
                  <div className="text-[11px] text-white/45">hover a moment to expand</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  {REEL.map((m) => {
                    const is = m.key === activeMoment;
                    return (
                      <motion.button
                        key={m.key}
                        type="button"
                        onMouseEnter={() => setActiveMoment(m.key)}
                        onFocus={() => setActiveMoment(m.key)}
                        className={cx(
                          "relative overflow-hidden rounded-2xl border text-left transition outline-none",
                          is ? "border-[rgba(67,232,255,.28)] bg-white/10" : "border-white/10 bg-white/5"
                        )}
                        style={{
                          gridColumn:
                            // expand active in desktop: 5 cols, others 2-ish
                            !is ? undefined : undefined,
                        }}
                        initial={false}
                        animate={
                          reduceMotion
                            ? {}
                            : {
                                scale: is ? 1.01 : 1,
                              }
                        }
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `url(${m.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "saturate(1.05) contrast(1.05)",
                          }}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,5,26,.92),rgba(7,5,26,.20))]" />
                        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(520px_240px_at_25%_20%,rgba(67,232,255,.16),transparent_60%)]" />

                        <div className="relative p-5 min-h-[190px] flex flex-col justify-end">
                          <div className="flex items-center justify-between gap-3">
                            <div className="text-[11px] text-white/60">{m.label}</div>
                            <span className="h-2 w-2 rounded-full" style={{ background: is ? ACCENT : "rgba(255,255,255,.35)" }} />
                          </div>
                          <div className="mt-2 text-lg font-semibold tracking-[-0.03em]">{m.key}</div>
                          <div className="mt-1 text-sm text-white/75">{m.line}</div>

                          <AnimatePresence>
                            {is ? (
                              <motion.div
                                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                                exit={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                                transition={{ duration: 0.22, ease: "easeOut" }}
                                className="mt-3 flex flex-wrap gap-2"
                              >
                                {m.chips.map((c) => (
                                  <Tag key={c} tone="cyan">
                                    {c}
                                  </Tag>
                                ))}
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-3 px-2 sm:px-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/55">
                  <span className="inline-flex items-center gap-2">
                    active: <span className="text-white/80">{activeMoment}</span>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                  </span>
                  <span className="inline-flex items-center gap-2">
                    style: <span className="text-white/80">cinematic + editorial</span>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: VIOLET }} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================================
          SECTION 2 — What We Build (ID: creative-what-we-build)
          Scrollytelling timeline: Idea → Interaction → System → Outcome
      =================================================================================== */}
      <Chapter
        id="creative-what-we-build"
        eyebrow={<ChapterEyebrow left="Chapter 01" right="What we build (story arc)" />}
        title={
          <>
            A timeline from <span className="text-white/85">idea</span> to outcome.
          </>
        }
        lead="Scrollytelling: each chapter is a cinematic beat — minimal UI, big editorial quotes."
      >
        <StoryTimeline />
      </Chapter>

      {/* ===================================================================================
          SECTION 3 — Capability Matrix (ID: creative-capability-matrix)
          Narrative version: minimal grid + “chapter quote”
      =================================================================================== */}
      <Chapter
        id="creative-capability-matrix"
        eyebrow={<ChapterEyebrow left="Chapter 02" right="Capabilities (serious, but quiet)" />}
        title={
          <>
            The craft behind the moment.
          </>
        }
        lead="A clean capability grid—kept minimal to preserve the cinematic rhythm."
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          <EditorialQuote
            className="lg:col-span-4"
            quote="“The experience is the surface. The system is the promise.”"
            byline="Wodh delivery philosophy"
          />
          <div className="lg:col-span-8 rounded-[24px] border border-white/10 bg-white/5 overflow-hidden">
            <div className="border-b border-white/10 bg-[#06041A] p-4">
              <div className="text-xs font-medium text-white/70">Capability Grid</div>
              <div className="mt-1 text-[11px] text-white/45">kept quiet — built for trust</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {CAP_MATRIX.map((c, idx) => (
                <div key={idx} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold tracking-[-0.02em]">{c.name}</div>
                      <div className="mt-1 text-sm text-white/70 leading-relaxed">{c.line}</div>
                    </div>
                    <span className="mt-1 h-2 w-2 rounded-full" style={{ background: idx % 2 === 0 ? ACCENT : "rgba(255,255,255,.28)" }} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Tag tone="neutral">prototype-first</Tag>
                    <Tag tone="cyan">deploy-ready</Tag>
                    <Tag tone="neutral">ops notes</Tag>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Chapter>

      {/* ===================================================================================
          SECTION 4 — Tech Plays (ID: creative-tech-plays)
          “Moments” as mini posters (cinematic cards)
      =================================================================================== */}
      <Chapter
        id="creative-tech-plays"
        eyebrow={<ChapterEyebrow left="Chapter 03" right="Tech plays (mini posters)" />}
        title={<>Reusable plays you can pitch as a reel.</>}
        lead="Each play reads like a scene: a promise, a style, a measurable endpoint."
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {TECH_PLAYS.map((p, i) => (
            <div
              key={p.name}
              className={cx(
                "md:col-span-6 relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5"
              )}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${p.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "saturate(1.1) contrast(1.06)",
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,5,26,.94),rgba(7,5,26,.30))]" />
              <div className="absolute inset-0 bg-[radial-gradient(720px_360px_at_20%_15%,rgba(67,232,255,.14),transparent_60%)] opacity-70" />

              <div className="relative p-6 min-h-[260px] flex flex-col justify-end">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] text-white/55">Play {String(i + 1).padStart(2, "0")}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60">
                    reel-ready
                  </span>
                </div>
                <div className="mt-2 text-xl font-semibold tracking-[-0.03em]">{p.name}</div>
                <div className="mt-2 text-sm text-white/75 leading-relaxed">{p.line}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.chips.map((c) => (
                    <Tag key={c} tone={c.includes("Offline") ? "green" : "cyan"}>
                      {c}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Chapter>

      {/* ===================================================================================
          SECTION 5 — Pipeline (ID: creative-pipeline)
          Connected track + behind-the-scenes callouts
      =================================================================================== */}
      <Chapter
        id="creative-pipeline"
        eyebrow={<ChapterEyebrow left="Chapter 04" right="Behind the scenes" />}
        title={<>How the reel gets made.</>}
        lead="A connected track with BTS callouts: prototype clips, iteration notes, deployment photos."
      >
        <PipelineBTS />
      </Chapter>

      {/* ===================================================================================
          SECTION 6 — Proof (ID: creative-proof)
          Gallery grid with Before/After (static → interactive)
      =================================================================================== */}
      <Chapter
        id="creative-proof"
        eyebrow={<ChapterEyebrow left="Chapter 05" right="Proof (gallery)" />}
        title={<>Before / After: static becomes interactive.</>}
        lead="Gallery-style proof that reads like a pitch deck slide."
      >
        <ProofGallery />
      </Chapter>

      {/* ===================================================================================
          SECTION 7 — Integrations (ID: creative-integrations)
          Minimal chapter cards (targets, inputs, analytics, updates)
      =================================================================================== */}
      <Chapter
        id="creative-integrations"
        eyebrow={<ChapterEyebrow left="Chapter 06" right="Delivery reality" />}
        title={<>Where it runs. What it listens to. How it reports back.</>}
        lead="A narrative-friendly integrations section: short, confident, deployment-aware."
      >
        <IntegrationsChapters />
      </Chapter>

      {/* ===================================================================================
          SECTION 8 — Engagement (ID: creative-engagement)
          Narrative 3 cards (Prototype / Build / Lab)
      =================================================================================== */}
      <Chapter
        id="creative-engagement"
        eyebrow={<ChapterEyebrow left="Chapter 07" right="Engagement models" />}
        title={<>Pick a pace. Keep the story.</>}
        lead="Best for brand/creative directors—simple options that still ship real systems."
      >
        <EngagementCards />
      </Chapter>

      {/* ===================================================================================
          SECTION 9 — FAQ (ID: creative-faq)
          Minimal UI + editorial quote header
      =================================================================================== */}
      <Chapter
        id="creative-faq"
        eyebrow={<ChapterEyebrow left="Chapter 08" right="FAQ" />}
        title={<>Questions buyers ask before saying yes.</>}
        lead="Short answers. No fluff."
      >
        <FAQMinimal />
      </Chapter>

      {/* ===================================================================================
          SECTION 10 — CTA (ID: creative-cta)
          Cinematic final banner
      =================================================================================== */}
      <section id="creative-cta" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-16">
        <FinalCinematicCTA />
        <div className="mt-10 h-px w-full bg-white/10" />
        <div className="mt-6 text-xs text-white/45">
          © {new Date().getFullYear()} Wodh. Creative Tech — Immersive Storyboard.
        </div>
      </section>
    </main>
  );
}

/* =======================================================================================
   Sections / Components
======================================================================================= */

function CinematicBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* base glows */}
      <div className="absolute inset-0 bg-[radial-gradient(1000px_720px_at_12%_10%,rgba(67,232,255,.13),transparent_60%),radial-gradient(900px_680px_at_88%_22%,rgba(167,139,250,.10),transparent_60%),radial-gradient(900px_700px_at_50%_95%,rgba(158,243,21,.06),transparent_60%)]" />
      {/* film grain-ish */}
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:3px_3px]" />
      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-soft-light [background-image:linear-gradient(rgba(255,255,255,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:28px_28px]" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_900px_at_50%_35%,transparent_36%,rgba(7,5,26,.72)_80%,rgba(7,5,26,.92))]" />

      {/* slow light sweep */}
      {!reduceMotion ? (
        <motion.div
          className="absolute -inset-40 opacity-[0.12]"
          animate={{ x: [0, 22, 0], y: [0, -14, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-full w-full bg-[radial-gradient(700px_360px_at_35%_25%,rgba(67,232,255,.22),transparent_60%)]" />
        </motion.div>
      ) : null}
    </div>
  );
}

function Chapter({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
      <div className="mb-9 sm:mb-10">
        {eyebrow ? <div className="mb-3">{eyebrow}</div> : null}
        <h2 className="text-balance text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em]">
          {title}
        </h2>
        {lead ? (
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed">{lead}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function ChapterEyebrow({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone="neutral">{left}</Pill>
        <Pill tone="cyan">{right}</Pill>
      </div>
      <span className="text-[11px] text-white/45">cinematic narrative</span>
    </div>
  );
}

function EditorialQuote({ quote, byline, className }: { quote: string; byline: string; className?: string }) {
  return (
    <div className={cx("rounded-[24px] border border-white/10 bg-[#06041A] p-6 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(720px_360px_at_30%_20%,rgba(67,232,255,.14),transparent_60%)] opacity-70" />
      <div className="relative">
        <div className="text-2xl sm:text-3xl font-semibold tracking-[-0.04em] leading-tight">
          {quote.split("“").join("")}
        </div>
        <div className="mt-3 text-sm text-white/60">{byline}</div>
        <div className="mt-5 h-px w-full bg-white/10" />
        <div className="mt-4 text-sm text-white/70 leading-relaxed">
          Minimal UI, strong narrative—designed for pitch decks and creative stakeholders.
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag tone="cyan">wow factor</Tag>
          <Tag tone="neutral">still shippable</Tag>
          <Tag tone="neutral">systems under the hood</Tag>
        </div>
      </div>
    </div>
  );
}

/* =======================================================================================
   What We Build — Story Timeline (scroll highlight)
======================================================================================= */

function StoryTimeline() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible) return;
        const idx = els.indexOf(visible.target as HTMLDivElement);
        if (idx >= 0) setActive(idx);
      },
      { root: null, threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const current = TIMELINE[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
      {/* left: sticky quote */}
      <div className="lg:col-span-4 lg:sticky lg:top-16">
        <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(720px_360px_at_30%_20%,rgba(67,232,255,.14),transparent_60%)] opacity-60" />
          <div className="relative">
            <div className="text-[11px] text-white/55">active stage</div>
            <div className="mt-2 text-lg font-semibold tracking-[-0.03em]">
              {current.stage}
              <span className="text-white/50"> — </span>
              <span className="text-white/85">{current.title}</span>
            </div>

            <div className="mt-4 text-2xl font-semibold tracking-[-0.04em] leading-tight">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(67,232,255,1), rgba(167,139,250,1), rgba(255,255,255,.85))",
                }}
              >
                {current.quote.replace(/“|”/g, "")}
              </span>
            </div>

            <div className="mt-4 text-sm text-white/70 leading-relaxed">{current.body}</div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Tag tone="cyan">minimal UI</Tag>
              <Tag tone="neutral">big quotes</Tag>
              <Tag tone="neutral">clear arc</Tag>
            </div>
          </div>
        </div>
      </div>

      {/* right: scrolly cards */}
      <div className="lg:col-span-8 space-y-4">
        {TIMELINE.map((t, i) => {
          const is = i === active;
          return (
            <motion.div
              key={t.stage}
              ref={(el) => (refs.current[i] = el)}
              className={cx(
                "relative rounded-[24px] border overflow-hidden",
                is ? "border-[rgba(67,232,255,.28)] bg-white/10" : "border-white/10 bg-white/5"
              )}
              initial={false}
              animate={
                reduceMotion
                  ? {}
                  : {
                      y: is ? -2 : 0,
                    }
              }
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(760px_320px_at_18%_20%,rgba(67,232,255,.12),transparent_60%)] opacity-50" />
              <div className="relative p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[11px] text-white/55">stage</div>
                    <div className="mt-1 text-xl font-semibold tracking-[-0.03em]">{t.stage}</div>
                    <div className="mt-2 text-sm text-white/70 leading-relaxed">{t.body}</div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-[#06041A] px-3 py-1 text-[11px] text-white/60">
                    {String(i + 1).padStart(2, "0")}/04
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.bullets.map((b) => (
                    <Tag key={b} tone={i % 2 === 0 ? "cyan" : "neutral"}>
                      {b}
                    </Tag>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* =======================================================================================
   Pipeline + BTS callouts
======================================================================================= */

function PipelineBTS() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
      <EditorialQuote
        className="lg:col-span-4"
        quote="“Prototype clips. Iteration notes. Deployment photos.”"
        byline="What stakeholders actually want"
      />

      <div className="lg:col-span-8 rounded-[24px] border border-white/10 bg-white/5 overflow-hidden">
        <div className="border-b border-white/10 bg-[#06041A] p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-medium text-white/70">Connected Track</div>
            <span className="text-[11px] text-white/45">with behind-the-scenes callouts</span>
          </div>
        </div>

        <div className="p-6">
          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-white/10" />
            <div className="space-y-4">
              {[
                { step: "01", title: "Discover & concept", line: "Define arc, constraints, and success metric." },
                { step: "02", title: "Prototype (interactive beat)", line: "A real slice — validate IO + feel." },
                { step: "03", title: "Production build", line: "Harden: QA, fallbacks, perf budgets." },
                { step: "04", title: "Deploy & operate", line: "Runbooks, recovery, monitoring, updates." },
              ].map((x, i) => (
                <div key={x.step} className="relative">
                  <div className="absolute left-[-2px] top-6 h-4 w-4 rounded-full border border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)]" />
                  <div className="rounded-[20px] border border-white/10 bg-[#06041A] p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[11px] text-white/55">step {x.step}</div>
                        <div className="mt-1 text-lg font-semibold tracking-[-0.03em]">{x.title}</div>
                        <div className="mt-2 text-sm text-white/70 leading-relaxed">{x.line}</div>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60">
                        track
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                      {BTS.map((b) => (
                        <div key={b.label} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                          <div
                            className="h-24 w-full"
                            style={{
                              backgroundImage: `url(${b.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          />
                          <div className="p-3">
                            <div className="text-[11px] text-white/55">{b.label}</div>
                            <div className="mt-1 text-xs text-white/70">{b.note}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Tag tone={i === 0 ? "cyan" : "neutral"}>constraints</Tag>
                      <Tag tone={i === 1 ? "cyan" : "neutral"}>prototype</Tag>
                      <Tag tone={i === 2 ? "cyan" : "neutral"}>harden</Tag>
                      <Tag tone={i === 3 ? "cyan" : "neutral"}>operate</Tag>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Tag tone="cyan">prototype clips</Tag>
            <Tag tone="neutral">iteration notes</Tag>
            <Tag tone="green">deployment proof</Tag>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =======================================================================================
   Proof gallery — Before / After hover reveal
======================================================================================= */

function ProofGallery() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {PROOF_GALLERY.map((g) => (
        <div key={g.title} className="md:col-span-4 rounded-[24px] border border-white/10 bg-white/5 overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-[#06041A]">
            <div className="text-xs font-medium text-white/75">{g.title}</div>
            <div className="mt-1 text-[11px] text-white/45">hover to reveal “after”</div>
          </div>

          <div className="relative h-[260px] overflow-hidden group">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${g.before})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "saturate(1.05) contrast(1.05)",
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,5,26,.72),rgba(7,5,26,.10))]" />

            {/* After layer */}
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={reduceMotion ? {} : { clipPath: "inset(0 100% 0 0)" }}
            />
            <div
              className="absolute inset-0 transition-all duration-300 ease-out will-change-transform"
              style={{
                backgroundImage: `url(${g.after})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "saturate(1.08) contrast(1.08)",
                clipPath: "inset(0 100% 0 0)",
              }}
            />
            {/* reveal on hover via overlay "wipe" */}
            <div
              className="absolute inset-0 transition-[clip-path] duration-300 ease-out group-hover:[clip-path:inset(0_0%_0_0)]"
              style={{
                backgroundImage: `url(${g.after})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "saturate(1.08) contrast(1.08)",
                clipPath: "inset(0 100% 0 0)",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(620px_320px_at_20%_20%,rgba(67,232,255,.14),transparent_60%)] opacity-70" />

            <div className="absolute left-4 bottom-4 right-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] text-white/55">before</span>
                <span className="text-[11px] text-white/55">after</span>
              </div>
              <div className="mt-2 h-px w-full bg-white/10" />
              <div className="mt-3 flex flex-wrap gap-2">
                {g.tags.map((t) => (
                  <Tag key={t} tone="cyan">
                    {t}
                  </Tag>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="text-sm text-white/70 leading-relaxed">
              A pitch-deck proof format: the “after” is the interactive system.
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =======================================================================================
   Integrations — narrative chapter cards
======================================================================================= */

function IntegrationsChapters() {
  const blocks = [
    {
      title: "Targets",
      line: "Web, iOS/Android, kiosks, LED walls, XR devices.",
      chips: ["Web", "iOS", "Android", "Kiosk", "LED Wall", "XR"],
      tone: "cyan" as const,
    },
    {
      title: "Inputs",
      line: "Camera, depth, IMU, QR/NFC, APIs — with fallbacks.",
      chips: ["Camera", "Depth", "IMU", "QR/NFC", "APIs"],
      tone: "green" as const,
    },
    {
      title: "Analytics",
      line: "Telemetry events, funnels, logs, dashboards.",
      chips: ["Events", "Funnels", "Logs", "Dashboards"],
      tone: "cyan" as const,
    },
    {
      title: "Updates",
      line: "Offline packs, remote updates, rollback, runbooks.",
      chips: ["Offline packs", "Remote updates", "Rollback", "Runbooks"],
      tone: "neutral" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {blocks.map((b) => (
        <div key={b.title} className="md:col-span-6 rounded-[24px] border border-white/10 bg-white/5 p-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(760px_320px_at_18%_20%,rgba(67,232,255,.12),transparent_60%)] opacity-40" />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-semibold tracking-[-0.03em]">{b.title}</div>
              <span className="h-2 w-2 rounded-full" style={{ background: b.tone === "green" ? GREEN : b.tone === "cyan" ? ACCENT : "rgba(255,255,255,.35)" }} />
            </div>
            <div className="mt-2 text-sm text-white/70 leading-relaxed">{b.line}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {b.chips.map((c) => (
                <Tag key={c} tone={b.tone === "green" ? "green" : b.tone === "cyan" ? "cyan" : "neutral"}>
                  {c}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =======================================================================================
   Engagement — 3 cinematic cards
======================================================================================= */

function EngagementCards() {
  const cards = [
    {
      title: "Prototype Sprint",
      line: "A short reel cut: validate IO + feel + constraints fast.",
      chips: ["2–4 weeks", "Interactive slice", "Next-step plan"],
      accent: "cyan" as const,
    },
    {
      title: "Production Build",
      line: "The full feature: harden, QA matrix, deploy plan, telemetry.",
      chips: ["6–12 weeks", "Runbooks", "Device QA"],
      accent: "neutral" as const,
    },
    {
      title: "Ongoing Lab",
      line: "Seasonal episodes: updates, experiments, new moments.",
      chips: ["Monthly", "Iteration cadence", "Dashboards"],
      accent: "green" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {cards.map((c) => (
        <div key={c.title} className="md:col-span-4 rounded-[24px] border border-white/10 bg-white/5 p-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(760px_320px_at_18%_20%,rgba(67,232,255,.12),transparent_60%)] opacity-35" />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <div className="text-lg font-semibold tracking-[-0.03em]">{c.title}</div>
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: c.accent === "green" ? GREEN : c.accent === "cyan" ? ACCENT : "rgba(255,255,255,.35)" }}
              />
            </div>
            <div className="mt-2 text-sm text-white/70 leading-relaxed">{c.line}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {c.chips.map((x) => (
                <Tag key={x} tone={c.accent === "green" ? "green" : c.accent === "cyan" ? "cyan" : "neutral"}>
                  {x}
                </Tag>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <LinkBtn href="#creative-cta" variant={c.accent === "cyan" ? "primary" : "secondary"}>
                Start with {c.title}
              </LinkBtn>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =======================================================================================
   FAQ — minimal accordion
======================================================================================= */

function FAQMinimal() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 overflow-hidden">
      <div className="border-b border-white/10 bg-[#06041A] p-5">
        <div className="text-xs font-medium text-white/70">Short answers</div>
        <div className="mt-1 text-[11px] text-white/45">designed for stakeholders</div>
      </div>

      <div className="divide-y divide-white/10">
        {FAQS.map((f, i) => {
          const is = open === i;
          return (
            <div key={f.q} className="p-5">
              <button type="button" onClick={() => setOpen(is ? null : i)} className="w-full text-left outline-none">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-semibold tracking-[-0.02em]">{f.q}</div>
                  <span className="text-[11px] text-white/45">{is ? "close" : "open"}</span>
                </div>
                <div className="mt-2 text-[11px] text-white/55">deployment-aware</div>
              </button>

              <AnimatePresence initial={false}>
                {is ? (
                  <motion.div
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 text-sm text-white/70 leading-relaxed">{f.a}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Tag tone="cyan">prototype</Tag>
                      <Tag tone="neutral">deploy</Tag>
                      <Tag tone="green">operate</Tag>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =======================================================================================
   Final CTA — cinematic banner
======================================================================================= */

function FinalCinematicCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=2200&q=70)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(1.08) contrast(1.06)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,5,26,.92),rgba(7,5,26,.55),rgba(7,5,26,.88))]" />
      <div className="absolute inset-0 bg-[radial-gradient(820px_420px_at_25%_25%,rgba(67,232,255,.18),transparent_60%),radial-gradient(720px_420px_at_80%_50%,rgba(167,139,250,.12),transparent_60%)]" />

      <div className="relative p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="cyan">Final CTA</Pill>
            <Pill tone="soft">Pitch-deck friendly</Pill>
            <Pill tone="neutral">Systems underneath</Pill>
          </div>

          <h2 className="mt-5 text-balance text-3xl sm:text-4xl font-semibold tracking-[-0.04em] leading-[1.05]">
            If you can describe the <span className="text-white/90">moment</span>, we’ll build the{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, rgba(67,232,255,1), rgba(167,139,250,1), rgba(255,255,255,.85))",
              }}
            >
              system behind it
            </span>
            .
          </h2>

          <p className="mt-4 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
            Share targets, inputs, and what success means. We’ll reply with a storyboard plan + prototype beat + delivery artifacts.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <LinkBtn href="mailto:hello@wodh.io?subject=Creative%20Tech%20Storyboard%20Intake" variant="primary">
              Describe your idea
            </LinkBtn>
            <LinkBtn href="#creative-tech-plays" variant="secondary">
              Browse tech plays
            </LinkBtn>
            <LinkBtn href="#creative-proof" variant="ghost">
              See proof →
            </LinkBtn>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/55">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">NDA-ready</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Prototype-first</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Runbooks + handover</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Global delivery</span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-[24px] border border-[rgba(67,232,255,.22)] bg-[rgba(67,232,255,.06)] p-6 overflow-hidden">
            <div className="text-xs font-medium text-white/75">Storyboard intake</div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-[#050318] p-4">
              <div className="text-[11px] text-white/55">Prompt</div>
              <div className="mt-2 text-sm text-white/80 leading-relaxed">
                “We want a <span className="text-white">moment</span> where the audience interacts with{" "}
                <span className="text-white">X</span>, on <span className="text-white">Y targets</span>, measured by{" "}
                <span className="text-white">Z outcomes</span>.”
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Tag tone="cyan">targets</Tag>
                <Tag tone="neutral">inputs</Tag>
                <Tag tone="green">offline?</Tag>
                <Tag tone="cyan">metrics</Tag>
              </div>

              {!reduceMotion ? (
                <motion.div
                  className="mt-4 h-10 rounded-xl border border-white/10 bg-white/5"
                  animate={{ backgroundPositionX: ["0%", "100%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(67,232,255,.18) 35%, rgba(255,255,255,0) 70%)",
                    backgroundSize: "240% 100%",
                  }}
                />
              ) : (
                <div className="mt-4 h-10 rounded-xl border border-white/10 bg-white/5" />
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/60">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                cyan glow
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: VIOLET }} />
                violet depth
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />
                ops signal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =======================================================================================
   UI Primitives
======================================================================================= */

function Pill({ children, tone = "soft" }: { children: React.ReactNode; tone?: "soft" | "cyan" | "neutral" }) {
  const base = "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs leading-none";
  const cls =
    tone === "cyan"
      ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.08)] text-[rgba(179,247,255,.95)]"
      : tone === "neutral"
      ? "border-white/12 bg-white/6 text-white/75"
      : "border-white/10 bg-white/5 text-white/80";

  return (
    <span className={cx(base, cls)}>
      <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
      {children}
    </span>
  );
}

function Tag({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "cyan" | "green" }) {
  const cls =
    tone === "cyan"
      ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-white"
      : tone === "green"
      ? "border-[rgba(158,243,21,.30)] bg-[rgba(158,243,21,.08)] text-white"
      : "border-white/10 bg-[#06041A] text-white/70";
  return <span className={cx("rounded-full border px-3 py-1 text-[11px]", cls)}>{children}</span>;
}

function LinkBtn({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition will-change-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#07051A]";
  const cls =
    variant === "primary"
      ? "bg-[rgba(67,232,255,.14)] text-white border border-[rgba(67,232,255,.35)] hover:bg-[rgba(67,232,255,.18)] hover:-translate-y-[1px] focus:ring-[rgba(67,232,255,.55)]"
      : variant === "secondary"
      ? "bg-white/6 text-white border border-white/12 hover:bg-white/9 hover:-translate-y-[1px] focus:ring-white/30"
      : "bg-transparent text-white/80 border border-transparent hover:text-white hover:bg-white/5 focus:ring-white/20";

  return (
    <a href={href} className={cx(base, cls)} rel="noreferrer">
      {children}
    </a>
  );
}

