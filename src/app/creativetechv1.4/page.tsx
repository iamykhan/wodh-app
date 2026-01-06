"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* =======================================================================================
   WODH — CREATIVE TECH SERVICES (Simplified, Editorial-first) — PATCH v1.1
   Fixes applied (based on your screenshot feedback):
   - Hero: remove “dashboard” feel (no shimmer bar, no stat grid) → one calm editorial panel
   - Stronger type hierarchy + clearer section rhythm (H2/lead/body + divider)
   - Remove repeating “Editorial” pill noise
   - Offerings: prioritize top 2, reduce label density (Outcome/Best-for becomes cleaner lines)
   - Proof: default = Setup + Outcome; Build is expandable (no wall of text)
   - Pipeline: reduced padding; desktop becomes 2×2 grid + subtle connected track
   - Delivery: add Tag tone="violet" and use it for Inputs
   - Normalize spacing across sections
======================================================================================= */

type FocusKey = "Microsite" | "Installation" | "AR";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const ACCENT = "rgba(67,232,255,1)"; // Electric Cyan / Aqua
const VIOLET = "rgba(167,139,250,1)";

const HERO_TILES: Array<{
  key: FocusKey;
  title: string;
  sub: string;
  image: string;
  chips: string[];
}> = [
  {
    key: "Microsite",
    title: "Interactive Microsites",
    sub: "Story-first WebGL experiences that load fast and feel premium.",
    image:
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=2000&q=70",
    chips: ["WebGL", "Motion", "Analytics-ready"],
  },
  {
    key: "Installation",
    title: "Event & Installation Systems",
    sub: "Offline-ready, stable, and easy to operate on-site.",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=2000&q=70",
    chips: ["Kiosk", "Offline", "Remote updates"],
  },
  {
    key: "AR",
    title: "AR Campaigns",
    sub: "Camera-led moments built for sharing and measurable reach.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=2000&q=70",
    chips: ["Camera UX", "QR entry", "Metrics"],
  },
];

const OFFERINGS: Array<{
  title: string;
  outcome: string;
  bestFor: string;
  chips: string[];
  featured?: boolean;
}> = [
  {
    title: "Interactive Microsites",
    outcome: "A cinematic story users can explore — not just watch.",
    bestFor: "Launches, product reveals, premium campaigns.",
    chips: ["WebGL", "Framer/GSAP", "CMS-ready"],
    featured: true,
  },
  {
    title: "Event / Installation Systems",
    outcome: "Offline-first experiences that run all day without drama.",
    bestFor: "Booths, museums, retail, LED walls, kiosks.",
    chips: ["Offline packs", "Kiosk mode", "Runbooks"],
    featured: true,
  },
  {
    title: "AR Campaigns",
    outcome: "Camera moments that feel simple, not fragile.",
    bestFor: "Social activations, try-ons, experiential.",
    chips: ["Camera", "Lightweight AR", "Sharing hooks"],
  },
  {
    title: "Real-time 3D Configurators",
    outcome: "Pick, change, see it instantly — live 3D feedback.",
    bestFor: "Products, interiors, automotive, architecture.",
    chips: ["Rules", "Perf budget", "Device QA"],
  },
  {
    title: "Generative Visuals",
    outcome: "Brand-safe scale with templates and approvals.",
    bestFor: "Content engines, personalization, variants.",
    chips: ["Templates", "Approvals", "Audit trail"],
  },
  {
    title: "Virtual Production (Optional)",
    outcome: "Realtime scenes for previs, pitch, or stage workflows.",
    bestFor: "Previs, realtime sets, live visuals.",
    chips: ["Realtime", "Pipelines", "Playback"],
  },
];

const CASES: Array<{
  title: string;
  setup: string;
  build: string;
  outcome: string;
  tags: string[];
  image: string;
}> = [
  {
    title: "Static landing → a live, interactive story",
    setup: "A product needed a launch experience that felt premium — not just a video.",
    build: "We built a WebGL microsite with guided story beats, smooth transitions, and analytics events.",
    outcome: "More time-on-page, clearer understanding, and a shareable launch asset.",
    tags: ["WebGL", "Story beats", "Analytics"],
    image:
      "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=2000&q=70",
  },
  {
    title: "Fragile demo → an installation that runs all day",
    setup: "The venue required offline reliability, a clean operator flow, and easy recovery.",
    build: "We shipped a kiosk runtime with offline packs, remote updates, rollback, and a simple runbook.",
    outcome: "Stable show-floor operation, fewer resets, and confident handover.",
    tags: ["Offline-first", "Kiosk mode", "Runbooks"],
    image:
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=2000&q=70",
  },
  {
    title: "Campaign idea → a camera moment that converts",
    setup: "The brief was a shareable AR moment with a smooth entry path and measurable performance.",
    build: "We designed camera UX, QR entry, fallbacks, and event tracking end-to-end.",
    outcome: "More completions, fewer drop-offs, and clean metrics for stakeholders.",
    tags: ["Camera UX", "QR entry", "Metrics"],
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2000&q=70",
  },
];

const WORK_STEPS: Array<{
  num: string;
  title: string;
  text: string;
}> = [
  {
    num: "01",
    title: "Concept",
    text: "Define the moment: audience, intent, constraints, and what success means.",
  },
  {
    num: "02",
    title: "Prototype",
    text: "A fast interactive slice to validate targets, inputs, and feel before production.",
  },
  {
    num: "03",
    title: "Build",
    text: "Harden it: performance budgets, device QA, fallbacks, and content workflows.",
  },
  {
    num: "04",
    title: "Launch + Support",
    text: "Deployment planning, runbooks, updates, and iteration after day one.",
  },
];

const RUNS_ON = {
  targets: ["Web", "iOS / Android", "Kiosks", "LED walls", "XR headsets"],
  inputs: ["Camera", "QR / NFC", "IMU / sensors", "APIs", "Content feeds"],
  operations: ["Offline-ready", "Remote updates", "Monitoring", "Analytics events", "Handover docs"],
};

const FAQS = [
  {
    q: "Can you build a prototype first?",
    a: "Yes. We recommend a prototype sprint so stakeholders can feel the experience early and make confident decisions.",
  },
  {
    q: "Can it run offline for events or venues?",
    a: "Yes. For installations we design offline-first behavior, cached content packs, and safe update / rollback paths.",
  },
  {
    q: "Do you support multiple devices and environments?",
    a: "Yes. We define target devices up front and test across a clear QA matrix so it stays consistent.",
  },
  {
    q: "Who owns the source and assets?",
    a: "You do. We deliver source, assets, and handover notes as part of delivery.",
  },
];

export default function CreativeTechServices_SimplifiedEditorial_PatchV11() {
  const [focus, setFocus] = useState<FocusKey>("Microsite");
  const focusTile = useMemo(() => HERO_TILES.find((t) => t.key === focus)!, [focus]);

  return (
    <main className="relative min-h-screen bg-[#07051A] text-white">
      <Atmosphere />

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07051A]/70 backdrop-blur">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Dot />
            <span className="text-sm font-semibold tracking-[-0.02em]">Creative Tech</span>
            <span className="text-xs text-white/45 hidden sm:inline">— interactive experiences, built to ship</span>
          </div>
          <nav className="hidden sm:flex items-center gap-1 text-xs text-white/60">
            <NavLink href="#creative-what-we-build">What we build</NavLink>
            <NavLink href="#creative-proof">Proof</NavLink>
            <NavLink href="#creative-pipeline">How we work</NavLink>
            <NavLink href="#creative-cta">Start</NavLink>
          </nav>
        </div>
      </header>

      {/* ===================================================================================
          SECTION 1 — Hero (ID: creative-hero)
      =================================================================================== */}
      <section id="creative-hero" className="relative">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-12 sm:pt-16 pb-10">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="cyan">Creative Tech</Pill>
            <Pill tone="neutral">Simple. Cinematic. Shippable.</Pill>
          </div>

          <h1 className="mt-6 text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.05em] leading-[1.02]">
            Creative technology that turns ideas into{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(67,232,255,1), rgba(167,139,250,1), rgba(255,255,255,.88))",
              }}
            >
              interactive realities
            </span>
            .
          </h1>

          <p className="mt-4 max-w-3xl text-sm sm:text-base text-white/70 leading-relaxed">
            We build interactive experiences for brands and studios — from WebGL microsites to offline-ready
            installations and camera-led AR. The promise is straightforward: it should feel premium, run reliably,
            and be easy to explain to stakeholders.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Btn href="#creative-cta" variant="primary">
              Start a project
            </Btn>
            <Btn href="#creative-proof" variant="secondary">
              See examples
            </Btn>
            <Btn href="#creative-what-we-build" variant="ghost">
              Explore what we build →
            </Btn>
          </div>
        </div>

        {/* Hero visual */}
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-12 sm:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {HERO_TILES.map((t) => {
                  const is = t.key === focus;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onMouseEnter={() => setFocus(t.key)}
                      onFocus={() => setFocus(t.key)}
                      onClick={() => setFocus(t.key)}
                      className={cx(
                        "group relative overflow-hidden rounded-[22px] border text-left outline-none transition",
                        is
                          ? "border-[rgba(67,232,255,.32)] bg-white/10"
                          : "border-white/10 bg-white/5 hover:bg-white/8"
                      )}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url(${t.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          filter: "saturate(1.05) contrast(1.05)",
                        }}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,5,26,.92),rgba(7,5,26,.24))]" />
                      <div className="absolute inset-0 opacity-70 bg-[radial-gradient(520px_240px_at_25%_20%,rgba(67,232,255,.16),transparent_60%)]" />

                      <div className="relative p-5 min-h-[170px] flex flex-col justify-end">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[11px] text-white/60">focus</span>
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: is ? ACCENT : "rgba(255,255,255,.30)" }}
                          />
                        </div>
                        <div className="mt-2 text-base font-semibold tracking-[-0.03em]">{t.key}</div>
                        <div className="mt-2 text-xs text-white/75 leading-relaxed">{t.sub}</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {t.chips.map((c) => (
                            <Tag key={c} tone={is ? "cyan" : "neutral"}>
                              {c}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PATCH: Calm editorial panel (no stats grid, no shimmer) */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-6">
                <div className="absolute inset-0 bg-[radial-gradient(760px_320px_at_18%_20%,rgba(67,232,255,.14),transparent_60%)] opacity-55" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] text-white/55">selected</div>
                      <div className="mt-1 text-xl font-semibold tracking-[-0.03em]">{focusTile.title}</div>
                    </div>
                    <Pill tone="cyan">preview</Pill>
                  </div>

                  <p className="mt-3 text-sm text-white/70 leading-relaxed">
                    This work succeeds when it’s <span className="text-white/85">clear</span> on the surface and{" "}
                    <span className="text-white/85">stable</span> underneath. We design the moment, then engineer the
                    delivery — performance, devices, and real-world conditions included.
                  </p>

                  <div className="mt-4 h-px w-full bg-white/10" />

                  <div className="mt-4 text-sm text-white/70 leading-relaxed">
                    Expect: <span className="text-white/85">premium feel</span>,{" "}
                    <span className="text-white/85">reliable runtime</span>, and{" "}
                    <span className="text-white/85">a clean path to ship</span>.
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Tag tone="cyan">prototype-first</Tag>
                    <Tag tone="neutral">device-aware</Tag>
                    <Tag tone="neutral">offline-ready</Tag>
                    <Tag tone="neutral">measurable</Tag>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================================
          SECTION 2 — What We Build (ID: creative-what-we-build)
      =================================================================================== */}
      <Section
        id="creative-what-we-build"
        eyebrow="What we build"
        title={
          <>
            Pick what you’re building — we’ll shape it into a{" "}
            <span className="text-white/90">real experience</span>.
          </>
        }
        lead="A simple menu for stakeholders. Each offering is written in plain language with clear outcomes — so it’s easy to understand and easy to approve."
        body="Creative tech works when it’s both beautiful and dependable. We build experiences that read clearly in a pitch, feel premium in the first seconds, and remain stable under real-world constraints."
      >
        <div className="mt-6 h-px w-full bg-white/10" />

        <div className="mt-7 grid grid-cols-1 md:grid-cols-12 gap-4">
          {OFFERINGS.map((o) => (
            <div
              key={o.title}
              className={cx(
                "md:col-span-6 rounded-[24px] border bg-white/5 p-6 overflow-hidden relative",
                o.featured
                  ? "border-[rgba(67,232,255,.26)] bg-[rgba(67,232,255,.06)]"
                  : "border-white/10"
              )}
            >
              <div
                className={cx(
                  "absolute inset-0 opacity-0",
                  o.featured ? "opacity-60" : "opacity-35"
                )}
                style={{
                  background:
                    o.featured
                      ? "radial-gradient(720px 320px at 18% 20%, rgba(67,232,255,.14), transparent 60%)"
                      : "radial-gradient(720px 320px at 18% 20%, rgba(255,255,255,.06), transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-lg font-semibold tracking-[-0.03em]">{o.title}</div>
                  {o.featured ? (
                    <span className="rounded-full border border-[rgba(67,232,255,.30)] bg-[rgba(67,232,255,.10)] px-3 py-1 text-[11px] text-white/90">
                      Recommended
                    </span>
                  ) : (
                    <span className="h-2 w-2 rounded-full mt-2" style={{ background: "rgba(255,255,255,.28)" }} />
                  )}
                </div>

                {/* PATCH: reduced label density */}
                <p className="mt-2 text-sm text-white/75 leading-relaxed">{o.outcome}</p>
                <p className="mt-2 text-sm text-white/60 leading-relaxed">
                  Best for: <span className="text-white/75">{o.bestFor}</span>
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {o.chips.map((c) => (
                    <Tag key={c} tone={o.featured ? "cyan" : "neutral"}>
                      {c}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ===================================================================================
          SECTION 3 — Proof (ID: creative-proof)
      =================================================================================== */}
      <Section
        id="creative-proof"
        eyebrow="Proof"
        title={
          <>
            Show, don’t claim — here’s what “interactive” looks like when it’s{" "}
            <span className="text-white/90">done properly</span>.
          </>
        }
        lead="Three calm mini case-stories with a clear setup and outcome. The “build” details are optional — expand when needed."
        body="The difference between a flashy demo and production-ready work is reliability: fallbacks, device behavior, and how it holds up when real users show up."
      >
        <div className="mt-6 h-px w-full bg-white/10" />

        <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {CASES.map((c) => (
            <ProofCard key={c.title} data={c} />
          ))}
        </div>

        <div className="mt-6 rounded-[22px] border border-white/10 bg-[#06041A] p-5">
          <div className="text-sm text-white/70 leading-relaxed">
            Want this formatted like a pitch deck slide? We can provide a one-page storyboard summary: targets, inputs,
            the “moment”, and a clear plan to prototype and ship.
          </div>
        </div>
      </Section>

      {/* ===================================================================================
          SECTION 4 — How we work (ID: creative-pipeline)
      =================================================================================== */}
      <Section
        id="creative-pipeline"
        eyebrow="How we work"
        title={
          <>
            A simple process — with enough structure to keep the work{" "}
            <span className="text-white/90">predictable</span>.
          </>
        }
        lead="A clear path from concept to prototype to launch — written for stakeholders."
        body="Creative tech becomes stressful when the process is vague. We keep the flow understandable with concrete checkpoints: you’ll see a prototype early, you’ll know what’s shipping, and you’ll have a plan for launch."
      >
        <div className="mt-6 h-px w-full bg-white/10" />

        {/* PATCH: 2×2 desktop grid + subtle connected track */}
        <div className="mt-7 rounded-[28px] border border-white/10 bg-white/5 overflow-hidden relative">
          <div className="border-b border-white/10 bg-[#06041A] p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-medium text-white/80">4-Step Track</div>
              <span className="text-[11px] text-white/45">clarity over complexity</span>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            {/* connector lines (desktop only) */}
            <div className="hidden lg:block pointer-events-none absolute left-0 right-0 top-[92px] bottom-0">
              {/* vertical center line */}
              <div className="absolute left-1/2 top-8 bottom-8 w-px bg-white/10" />
              {/* horizontal center line */}
              <div className="absolute top-1/2 left-8 right-8 h-px bg-white/10" />
              {/* subtle glow */}
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(720px_320px_at_18%_20%,rgba(67,232,255,.12),transparent_60%)]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {WORK_STEPS.map((s, idx) => (
                <div
                  key={s.num}
                  className="rounded-[22px] border border-white/10 bg-[#06041A] p-5 relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-35 bg-[radial-gradient(720px_320px_at_18%_20%,rgba(67,232,255,.10),transparent_60%)]" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[11px] text-white/55">step {s.num}</div>
                        <div className="mt-1 text-lg font-semibold tracking-[-0.03em]">{s.title}</div>
                      </div>
                      <span
                        className="mt-1 h-2 w-2 rounded-full"
                        style={{ background: idx === 1 ? ACCENT : "rgba(255,255,255,.28)" }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">{s.text}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Tag tone={idx === 1 ? "cyan" : "neutral"}>{s.title.toLowerCase()}</Tag>
                      <Tag tone="neutral">stakeholder-clear</Tag>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <InfoCard title="Prototype timeline" text="Typically 2–4 weeks for a strong interactive beat." />
              <InfoCard title="Full build timeline" text="Often 6–12 weeks depending on targets and scope." />
              <InfoCard title="Launch readiness" text="Runbooks, QA, and a plan for updates after day one." />
            </div>
          </div>
        </div>
      </Section>

      {/* ===================================================================================
          SECTION 5 — Delivery (ID: creative-integrations)
      =================================================================================== */}
      <Section
        id="creative-integrations"
        eyebrow="Delivery confidence"
        title={
          <>
            Where it runs. What it listens to. How it stays{" "}
            <span className="text-white/90">reliable</span>.
          </>
        }
        lead="Practical answers that decide whether the project succeeds."
        body="We plan device targets, inputs, and operations early so the experience doesn’t break when it meets the real world — network variability, venue conditions, or hardware constraints."
      >
        <div className="mt-6 h-px w-full bg-white/10" />

        <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <DeliveryCol
            title="Targets"
            kicker="Where it runs"
            desc="The screens and platforms the experience is designed to support."
            items={RUNS_ON.targets}
            tone="cyan"
          />
          <DeliveryCol
            title="Inputs"
            kicker="What it listens to"
            desc="Camera, sensors, QR entry, APIs — with fallbacks when conditions aren’t perfect."
            items={RUNS_ON.inputs}
            tone="violet"
          />
          <DeliveryCol
            title="Operations"
            kicker="How it stays stable"
            desc="Offline support, updates, monitoring, analytics, and handover documentation."
            items={RUNS_ON.operations}
            tone="neutral"
          />
        </div>
      </Section>

      {/* ===================================================================================
          SECTION 6 — FAQ (ID: creative-faq)
      =================================================================================== */}
      <Section
        id="creative-faq"
        eyebrow="FAQ"
        title={<>The questions people ask before they approve the work.</>}
        lead="Short, direct answers — written for buyers and stakeholders."
        body="If you want, we can provide a one-page technical summary that explains targets, constraints, and delivery approach in simple terms."
      >
        <div className="mt-6 h-px w-full bg-white/10" />
        <div className="mt-7">
          <FAQ />
        </div>
      </Section>

      {/* ===================================================================================
          SECTION 7 — Final CTA (ID: creative-cta)
      =================================================================================== */}
      <section id="creative-cta" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-14">
        <FinalCTA />
        <div className="mt-10 h-px w-full bg-white/10" />
        <div className="mt-6 text-xs text-white/45">
          © {new Date().getFullYear()} Wodh — Creative Tech Services.
        </div>
      </section>
    </main>
  );
}

/* =======================================================================================
   Proof Card (expand build)
======================================================================================= */

function ProofCard({ data }: { data: (typeof CASES)[number] }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:col-span-4 relative overflow-hidden rounded-[26px] border border-white/10 bg-white/5">
      <div
        className="h-40 w-full"
        style={{
          backgroundImage: `url(${data.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(1.06) contrast(1.06)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_top,rgba(7,5,26,.92),rgba(7,5,26,.15))]" />

      <div className="p-6">
        <div className="text-base font-semibold tracking-[-0.03em]">{data.title}</div>

        {/* PATCH: default = Setup + Outcome only */}
        <div className="mt-4 space-y-3 text-sm leading-relaxed">
          <p className="text-white/72">
            <span className="text-white/85 font-medium">Setup:</span> {data.setup}
          </p>
          <p className="text-white/72">
            <span className="text-white/85 font-medium">Outcome:</span> {data.outcome}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {data.tags.map((t) => (
            <Tag key={t} tone="cyan">
              {t}
            </Tag>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-5 w-full rounded-xl border border-white/10 bg-[#06041A] px-4 py-2 text-sm text-white/80 hover:bg-white/5 transition"
        >
          {open ? "Hide build details" : "Show build details"}
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-2xl border border-white/10 bg-[#06041A] p-4">
                <div className="text-[11px] text-white/55">Build</div>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{data.build}</p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* =======================================================================================
   Layout helpers
======================================================================================= */

function Section({
  id,
  eyebrow,
  title,
  lead,
  body,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-14">
      <div className="mb-7 sm:mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="neutral">{eyebrow}</Pill>
        </div>

        {/* PATCH: stronger hierarchy */}
        <h2 className="mt-4 text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.045em] leading-[1.05]">
          {title}
        </h2>

        <p className="mt-4 max-w-3xl text-base sm:text-lg text-white/75 leading-relaxed">{lead}</p>
        <p className="mt-3 max-w-3xl text-sm sm:text-base text-white/60 leading-relaxed">{body}</p>
      </div>

      {children}
    </section>
  );
}

function Atmosphere() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_720px_at_12%_10%,rgba(67,232,255,.14),transparent_60%),radial-gradient(900px_680px_at_88%_22%,rgba(167,139,250,.10),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:3px_3px]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_900px_at_50%_35%,transparent_35%,rgba(7,5,26,.72)_80%,rgba(7,5,26,.92))]" />

      {!reduceMotion ? (
        <motion.div
          className="absolute -inset-40 opacity-[0.10]"
          animate={{ x: [0, 22, 0], y: [0, -14, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-full w-full bg-[radial-gradient(700px_360px_at_35%_25%,rgba(67,232,255,.28),transparent_60%)]" />
        </motion.div>
      ) : null}
    </div>
  );
}

/* =======================================================================================
   Small UI pieces
======================================================================================= */

function Dot() {
  return <span className="h-2 w-2 rounded-full" style={{ background: ACCENT }} />;
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="rounded-lg px-2 py-1 hover:bg-white/5 hover:text-white transition text-white/60">
      {children}
    </a>
  );
}

function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "cyan" | "neutral" }) {
  const base = "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs leading-none";
  const cls =
    tone === "cyan"
      ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.08)] text-[rgba(179,247,255,.95)]"
      : "border-white/10 bg-white/5 text-white/75";
  return (
    <span className={cx(base, cls)}>
      <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
      {children}
    </span>
  );
}

/* PATCH: Tag now supports violet */
function Tag({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "cyan" | "violet";
}) {
  const cls =
    tone === "cyan"
      ? "border-[rgba(67,232,255,.35)] bg-[rgba(67,232,255,.10)] text-white"
      : tone === "violet"
      ? "border-[rgba(167,139,250,.30)] bg-[rgba(167,139,250,.10)] text-white"
      : "border-white/10 bg-[#06041A] text-white/70";
  return <span className={cx("rounded-full border px-3 py-1 text-[11px]", cls)}>{children}</span>;
}

function Btn({
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

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#06041A] p-5">
      <div className="text-sm font-semibold tracking-[-0.02em]">{title}</div>
      <div className="mt-2 text-sm text-white/70 leading-relaxed">{text}</div>
    </div>
  );
}

function DeliveryCol({
  title,
  kicker,
  desc,
  items,
  tone,
}: {
  title: string;
  kicker: string;
  desc: string;
  items: string[];
  tone: "cyan" | "violet" | "neutral";
}) {
  const ring =
    tone === "cyan"
      ? "border-[rgba(67,232,255,.22)]"
      : tone === "violet"
      ? "border-[rgba(167,139,250,.18)]"
      : "border-white/10";

  const glow =
    tone === "cyan"
      ? "bg-[radial-gradient(760px_320px_at_18%_20%,rgba(67,232,255,.12),transparent_60%)]"
      : tone === "violet"
      ? "bg-[radial-gradient(760px_320px_at_18%_20%,rgba(167,139,250,.10),transparent_60%)]"
      : "bg-[radial-gradient(760px_320px_at_18%_20%,rgba(255,255,255,.06),transparent_60%)]";

  const dot = tone === "cyan" ? ACCENT : tone === "violet" ? VIOLET : "rgba(255,255,255,.30)";
  const tagTone = tone === "cyan" ? "cyan" : tone === "violet" ? "violet" : "neutral";

  return (
    <div className={cx("lg:col-span-4 rounded-[26px] border bg-white/5 p-6 overflow-hidden relative", ring)}>
      <div className={cx("absolute inset-0 opacity-50", glow)} />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] text-white/55">{kicker}</div>
            <div className="mt-1 text-lg font-semibold tracking-[-0.03em]">{title}</div>
          </div>
          <span className="h-2 w-2 rounded-full mt-2" style={{ background: dot }} />
        </div>

        <p className="mt-2 text-sm text-white/70 leading-relaxed">{desc}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {items.map((x) => (
            <Tag key={x} tone={tagTone}>
              {x}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =======================================================================================
   FAQ
======================================================================================= */

function FAQ() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 overflow-hidden">
      <div className="border-b border-white/10 bg-[#06041A] p-5">
        <div className="text-sm font-medium text-white/80">FAQ</div>
        <div className="mt-1 text-xs text-white/45">simple answers, production-aware</div>
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
                      <Tag tone="neutral">reliability</Tag>
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
   Final CTA
======================================================================================= */

function FinalCTA() {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1529336953121-a0a29c2c24b3?auto=format&fit=crop&w=2200&q=70)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(1.06) contrast(1.06)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,5,26,.92),rgba(7,5,26,.62),rgba(7,5,26,.90))]" />
      <div className="absolute inset-0 bg-[radial-gradient(920px_520px_at_25%_25%,rgba(67,232,255,.18),transparent_60%),radial-gradient(720px_420px_at_80%_50%,rgba(167,139,250,.12),transparent_60%)]" />

      <div className="relative p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="cyan">Start here</Pill>
            <Pill tone="neutral">One clear next step</Pill>
          </div>

          <h3 className="mt-5 text-balance text-3xl sm:text-4xl font-semibold tracking-[-0.05em] leading-[1.05]">
            Tell us what you want to build — we’ll reply with a{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(67,232,255,1), rgba(167,139,250,1), rgba(255,255,255,.88))",
              }}
            >
              clear plan
            </span>{" "}
            and a realistic path to ship.
          </h3>

          <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/70 leading-relaxed">
            Share the moment you’re aiming for, your target devices, and what “success” means. We’ll propose a prototype
            beat (so you can feel it fast) and an approach for production and launch.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Btn
              href="mailto:hello@wodh.io?subject=Creative%20Tech%20Project%20Intake&body=Hi%20Wodh%2C%0A%0AWe%20want%20to%20build%20an%20interactive%20experience.%0A%0A1)%20What%20is%20the%20moment%3F%0A2)%20Targets%20(web%2Fmobile%2Fkiosk%2Fxr)%3A%0A3)%20Inputs%20(camera%2Fqr%2Fsensors%2Fapi)%3A%0A4)%20Timeline%3A%0A5)%20Success%20metric%3A%0A%0AThanks!"
              variant="primary"
            >
              Describe your idea
            </Btn>
            <Btn href="#creative-proof" variant="secondary">
              Review proof
            </Btn>
            <Btn href="#creative-what-we-build" variant="ghost">
              Browse offerings →
            </Btn>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/55">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Prototype-first</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Delivery aware</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Handover docs</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Global delivery</span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-[26px] border border-[rgba(67,232,255,.22)] bg-[rgba(67,232,255,.06)] p-6 overflow-hidden">
            <div className="text-sm font-semibold tracking-[-0.02em]">A simple intake prompt</div>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Copy this into your message — it helps us respond fast and clearly.
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-[#050318] p-4">
              <div className="text-[11px] text-white/55">Prompt</div>
              <div className="mt-2 text-sm text-white/80 leading-relaxed">
                “We want an interactive experience where users <span className="text-white">do X</span> on{" "}
                <span className="text-white">Y targets</span>, using <span className="text-white">Z inputs</span>.
                Success looks like <span className="text-white">…</span>.”
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Tag tone="cyan">targets</Tag>
                <Tag tone="violet">inputs</Tag>
                <Tag tone="neutral">timeline</Tag>
                <Tag tone="neutral">success</Tag>
              </div>
            </div>

            <div className="mt-5 h-10 rounded-xl border border-white/10 bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
