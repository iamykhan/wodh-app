"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * WODH — XR DEVELOPMENT (Single Service Page)
 * Wodh Design System v1 (Canonical):
 * - Dark indigo base (#0C0722-ish)
 * - Neon green primary + violet secondary
 * - Subtle glow, glass depth, hover lifts, editorial typography
 * - XR ↔ Games signature language, but this page focuses XR
 */

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const BG = "#0C0722";
const GREEN = "#9EF315";
const VIOLET = "#6D28FF";

type Pill = { label: string; hint?: string };
type Bento = { title: string; desc: string; bullets: string[]; accent: "g" | "v" | "mix" };

const OUTCOMES: Pill[] = [
  { label: "Faster onboarding", hint: "Repeatable skill transfer" },
  { label: "Safer operations", hint: "Risk-free simulation" },
  { label: "Higher retention", hint: "Learn-by-doing" },
  { label: "Lower training cost", hint: "Scale content, not instructors" },
  { label: "Measurable performance", hint: "Telemetry + scoring" },
];

const XR_CAPABILITIES: Bento[] = [
  {
    title: "Training & Simulation",
    desc: "Scenario-based learning that drives real performance — from SOPs to high-risk operations.",
    bullets: ["Safety & compliance modules", "Equipment procedures", "Assessments & scoring", "LMS / SSO integration"],
    accent: "g",
  },
  {
    title: "Digital Twins & Visualization",
    desc: "Operational clarity through spatial interfaces — bring complex systems into a shared 3D truth.",
    bullets: ["Facility / asset twin", "Real-time telemetry overlays", "Guided troubleshooting", "WebXR + headset modes"],
    accent: "mix",
  },
  {
    title: "AR Product Experiences",
    desc: "Show, customize, and explain products in the real world — optimized for conversion and field teams.",
    bullets: ["AR configurators", "Interactive product demos", "Retail / showroom activations", "iOS (ARKit) + Android (ARCore)"],
    accent: "v",
  },
  {
    title: "Collaboration & Remote Assist",
    desc: "Bring experts to the现场 without travel — shared context, annotations, and step-by-step guidance.",
    bullets: ["Multi-user sessions", "3D markup + snapshots", "Remote expert workflows", "Role-based permissions"],
    accent: "mix",
  },
];

const PIPELINE = [
  {
    k: "01",
    t: "Discovery",
    d: "Use-cases, constraints, success metrics, environments, and hardware realities.",
  },
  {
    k: "02",
    t: "Prototype",
    d: "Proof a key interaction + performance target fast, then validate with users.",
  },
  { k: "03", t: "Production", d: "Content pipeline + engineering standards + QA in device conditions." },
  { k: "04", t: "Deploy", d: "Distribution, MDM, analytics, versioning, and training for admins." },
  { k: "05", t: "Iterate", d: "Telemetry-led improvements, new scenarios, and feature expansion." },
];

const STACK = [
  { group: "Engines", items: ["Unity", "Unreal (when needed)"] },
  { group: "XR Platforms", items: ["Meta Quest", "PICO", "Apple Vision Pro (as scope demands)", "WebXR"] },
  { group: "AR", items: ["ARKit", "ARCore"] },
  { group: "Backend", items: ["Node/.NET APIs", "Realtime sockets", "Auth/SSO"] },
  { group: "Ops", items: ["Analytics", "Crash reporting", "MDM distribution", "CI/CD"] },
];

const FAQ = [
  {
    q: "How do we choose between VR, AR, and WebXR?",
    a: "We map the task to the environment: VR for repeatable training/simulation, AR for in-field guidance and product experiences, WebXR for broad accessibility. Many systems combine them as tiers.",
  },
  {
    q: "What about performance and comfort in headsets?",
    a: "We design for frame-time budgets from day one: optimized shaders, LODs, baked lighting where appropriate, fixed foveation, and device-native interaction patterns to reduce motion discomfort.",
  },
  {
    q: "Can you integrate with our LMS or internal systems?",
    a: "Yes. We commonly integrate SSO, role management, and reporting pipelines. XR doesn’t have to be a silo — telemetry can feed your existing analytics stack.",
  },
  {
    q: "Do you create 3D assets too?",
    a: "Yes — from lightweight optimization to full production assets. If you already have CAD/3D sources, we build a conversion pipeline to make them XR-ready.",
  },
];

const CASES = [
  {
    title: "Safety Training Simulator",
    type: "VR • Training",
    desc: "Scenario-based safety program with scoring, remediation paths, and admin reporting.",
    tags: ["Quest", "Telemetry", "Assessments"],
  },
  {
    title: "AR Product Configurator",
    type: "AR • Commerce",
    desc: "Real-world placement, material swaps, and guided explainer mode for sales teams.",
    tags: ["ARKit", "ARCore", "3D Optimization"],
  },
  {
    title: "Digital Twin Viewer",
    type: "XR • Ops",
    desc: "Facility visualization with layered data, role-based views, and troubleshooting flows.",
    tags: ["Realtime", "WebXR", "Access Control"],
  },
];

function GlowBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(900px 500px at 15% 10%, rgba(158,243,21,.18), transparent 60%),
            radial-gradient(800px 520px at 85% 90%, rgba(109,40,255,.16), transparent 60%),
            radial-gradient(700px 420px at 70% 18%, rgba(158,243,21,.08), transparent 55%),
            linear-gradient(to bottom, rgba(255,255,255,.03), transparent 35%, rgba(0,0,0,.25))
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.7]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,.08) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,.9), rgba(0,0,0,.2), rgba(0,0,0,.9))",
        }}
      />
    </>
  );
}

function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "green" | "violet";
}) {
  const ring =
    tone === "green"
      ? "ring-[rgba(158,243,21,.30)] bg-[rgba(158,243,21,.08)] text-[rgba(215,255,170,.92)]"
      : tone === "violet"
        ? "ring-[rgba(109,40,255,.30)] bg-[rgba(109,40,255,.10)] text-[rgba(214,200,255,.92)]"
        : "ring-white/10 bg-white/[0.04] text-white/80";
  return (
    <span className={cx("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ring-1", ring)}>
      {children}
    </span>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,.35)]",
        "hover:border-white/15 transition-colors",
        className
      )}
    >
      {children}
    </div>
  );
}

function AccentLine({ accent }: { accent: "g" | "v" | "mix" }) {
  const bg =
    accent === "g"
      ? `linear-gradient(90deg, rgba(158,243,21,.55), rgba(158,243,21,0))`
      : accent === "v"
        ? `linear-gradient(90deg, rgba(109,40,255,.60), rgba(109,40,255,0))`
        : `linear-gradient(90deg, rgba(158,243,21,.45), rgba(109,40,255,.45), rgba(255,255,255,0))`;
  return <div aria-hidden className="h-[2px] w-full rounded-full" style={{ background: bg }} />;
}

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  desc?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3">
      {eyebrow ? <div className="flex flex-wrap items-center gap-2">{eyebrow}</div> : null}
      <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">{title}</h2>
      {desc ? (
        <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-white/70">{desc}</p>
      ) : null}
    </div>
  );
}

function GradientH1({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="text-balance text-[2.15rem] sm:text-5xl md:text-6xl font-semibold tracking-[-0.05em] leading-[1.02]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,.92), rgba(158,243,21,.90), rgba(109,40,255,.90))`,
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </h1>
  );
}

export default function XRServices() {
  const reduceMotion = useReducedMotion();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
      show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 1, 0.21, 1] as const } },
    }),
    [reduceMotion]
  );

  return (
    <main className="relative min-h-screen text-white" style={{ background: BG }}>
      <GlowBackdrop />

      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* HERO */}
      <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-14 sm:pt-20 pb-10 sm:pb-14">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="green">XR Studio</Chip>
            <Chip>Service</Chip>
            <Chip tone="violet">Production-ready</Chip>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
            <div className="flex flex-col gap-5">
              <GradientH1>XR Development that ships — training, twins, and real-world experiences.</GradientH1>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
                We build XR systems that perform in device conditions, integrate with your stack, and scale from pilot to
                rollout — without losing clarity, comfort, or craft.
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium bg-white text-black hover:bg-white/90 transition"
                >
                  Start an XR project
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <a
                  href="#capabilities"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium border border-white/15 bg-white/[0.02] hover:bg-white/[0.05] transition"
                >
                  Explore capabilities
                </a>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {OUTCOMES.map((p) => (
                  <span
                    key={p.label}
                    className="group relative inline-flex items-center rounded-full px-3 py-1.5 text-xs ring-1 ring-white/10 bg-white/[0.03]"
                  >
                    <span className="text-white/85">{p.label}</span>
                    {p.hint ? (
                      <span className="ml-2 hidden sm:inline text-white/45 group-hover:text-white/60 transition-colors">
                        • {p.hint}
                      </span>
                    ) : null}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero Right: KPI/Scope Panel */}
            <Card className="overflow-hidden">
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-white/85">XR Delivery Snapshot</div>
                  <span className="text-xs text-white/50">Comfort • Performance • Proof</span>
                </div>

                <div className="mt-4 grid gap-3">
                  {[
                    { k: "Hardware-first", v: "Quest / PICO / Vision Pro / WebXR" },
                    { k: "Telemetry", v: "Analytics, scoring, and reporting baked-in" },
                    { k: "Integration", v: "SSO, LMS, APIs, data pipelines" },
                    { k: "Content Pipeline", v: "3D optimization + iteration velocity" },
                  ].map((row) => (
                    <div key={row.k} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-xs text-white/55">{row.k}</div>
                        <div className="text-xs text-white/80 text-right">{row.v}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: GREEN, boxShadow: "0 0 18px rgba(158,243,21,.45)" }}
                    />
                    <div className="text-xs text-white/70">Typical engagement: discovery → prototype → production</div>
                  </div>
                  <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="mt-2 text-xs text-white/55">
                    We’ll recommend the right scope and tech after discovery — no overbuild.
                  </div>
                </div>
              </div>

              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-24"
                style={{
                  background:
                    "linear-gradient(to top, rgba(109,40,255,.14), transparent), radial-gradient(420px 120px at 18% 100%, rgba(158,243,21,.16), transparent 65%)",
                }}
              />
            </Card>
          </div>
        </motion.div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <SectionTitle
          eyebrow={
            <>
              <Chip>What we build</Chip>
              <Chip tone="green">XR Capabilities</Chip>
            </>
          }
          title={
            <>
              Four pillars, one production system — <span className="text-white/70">designed to scale from pilot to rollout.</span>
            </>
          }
          desc="These are the most common XR service lines we ship. Each one follows the same performance-first approach and integration discipline."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {XR_CAPABILITIES.map((c) => (
            <Card key={c.title} className="p-5 sm:p-6">
              <div className="flex flex-col gap-3">
                <AccentLine accent={c.accent} />
                <div className="flex items-start justify-between gap-4">
                  <div className="text-lg font-semibold tracking-[-0.02em]">{c.title}</div>
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        background:
                          c.accent === "g"
                            ? GREEN
                            : c.accent === "v"
                              ? VIOLET
                              : "linear-gradient(90deg,#9EF315,#6D28FF)",
                        boxShadow:
                          c.accent === "g"
                            ? "0 0 18px rgba(158,243,21,.45)"
                            : c.accent === "v"
                              ? "0 0 18px rgba(109,40,255,.45)"
                              : "0 0 18px rgba(158,243,21,.28), 0 0 18px rgba(109,40,255,.28)",
                      }}
                    />
                    <span className="text-xs text-white/55">Wodh XR</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-white/70">{c.desc}</p>

                <ul className="mt-1 grid gap-2">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-white/70">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "rgba(255,255,255,.55)" }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SHARED PIPELINE */}
      <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <SectionTitle
          eyebrow={
            <>
              <Chip>How we ship</Chip>
              <Chip tone="violet">Pipeline</Chip>
            </>
          }
          title={
            <>
              A delivery pipeline built for XR realities — <span className="text-white/70">devices, comfort, performance, and adoption.</span>
            </>
          }
          desc="XR succeeds when it fits the real environment. We validate early, engineer for frame-time budgets, and deploy with analytics so results can be proven."
        />

        <div className="grid gap-3 md:grid-cols-5">
          {PIPELINE.map((s) => (
            <Card key={s.k} className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs text-white/55">Step</div>
                <div className="text-xs font-medium text-white/80">{s.k}</div>
              </div>
              <div className="mt-2 text-sm font-semibold">{s.t}</div>
              <p className="mt-2 text-xs leading-relaxed text-white/65">{s.d}</p>
              <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="mt-2 text-[11px] text-white/45">XR-first checks: comfort • fps • usability</div>
            </Card>
          ))}
        </div>
      </section>

      {/* PROOF GRID */}
      <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <SectionTitle
          eyebrow={
            <>
              <Chip>Proof</Chip>
              <Chip tone="green">Selected work types</Chip>
            </>
          }
          title={
            <>
              Work that holds up in production — <span className="text-white/70">measured, maintained, and iterated.</span>
            </>
          }
          desc="Swap these cards with real case studies when ready. The layout is designed to feel like a premium proof grid without getting noisy."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {CASES.map((c) => (
            <Card key={c.title} className="p-5 sm:p-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-white/55">{c.type}</div>
                    <div className="mt-1 text-lg font-semibold tracking-[-0.02em]">{c.title}</div>
                  </div>
                  <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center">
                    <span className="text-sm" style={{ color: "rgba(255,255,255,.75)" }}>
                      ⬡
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-white/70">{c.desc}</p>

                <div className="mt-1 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2.5 py-1 text-xs ring-1 ring-white/10 bg-white/[0.03] text-white/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <a
                  href="#contact"
                  className="text-xs font-medium text-white/75 hover:text-white transition inline-flex items-center gap-2"
                >
                  Discuss a similar build <span className="opacity-70">→</span>
                </a>
              </div>

              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-20"
                style={{
                  background:
                    "radial-gradient(340px 120px at 18% 100%, rgba(158,243,21,.12), transparent 60%), radial-gradient(340px 120px at 82% 100%, rgba(109,40,255,.12), transparent 60%)",
                }}
              />
            </Card>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <SectionTitle
          eyebrow={
            <>
              <Chip>Technology</Chip>
              <Chip tone="violet">Stack</Chip>
            </>
          }
          title={
            <>
              The tools we use — <span className="text-white/70">chosen for performance, maintainability, and rollout.</span>
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          {STACK.map((g) => (
            <Card key={g.group} className="p-5">
              <div className="text-sm font-semibold">{g.group}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span key={it} className="rounded-full px-3 py-1.5 text-xs ring-1 ring-white/10 bg-white/[0.03] text-white/75">
                    {it}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <SectionTitle
          eyebrow={
            <>
              <Chip>FAQ</Chip>
              <Chip tone="green">Ask anything</Chip>
            </>
          }
          title={
            <>
              Common questions — <span className="text-white/70">answered in plain English.</span>
            </>
          }
        />

        <div className="grid gap-4 lg:grid-cols-[1fr_.85fr] lg:items-start">
          <Card className="p-4 sm:p-5">
            <div className="flex flex-col gap-2">
              {FAQ.map((item, idx) => {
                const open = activeFaq === idx;
                return (
                  <div key={item.q} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(open ? null : idx)}
                      className="w-full px-4 py-3 text-left flex items-start justify-between gap-4"
                    >
                      <div className="text-sm font-medium text-white/85">{item.q}</div>
                      <span className="text-white/60 mt-0.5">{open ? "–" : "+"}</span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.28, ease: "easeOut" }}
                        >
                          <div className="px-4 pb-4 text-sm leading-relaxed text-white/70">{item.a}</div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="green">Best practice</Chip>
                <Chip>XR adoption</Chip>
              </div>

              <div className="text-lg font-semibold tracking-[-0.02em]">XR wins when it’s deployed like a product — not a demo.</div>

              <p className="text-sm leading-relaxed text-white/70">
                We’ll help you define rollout, governance, and analytics early — so stakeholders can see impact, and teams
                can sustain the system.
              </p>

              <div className="grid gap-2">
                {[
                  "Start with 1–2 high-impact scenarios",
                  "Validate comfort and usability in real environments",
                  "Instrument metrics (time, errors, completion, retention)",
                  "Ship updates like software: versioning + feedback loop",
                ].map((x) => (
                  <div key={x} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full" style={{ background: "rgba(255,255,255,.55)" }} />
                    <span>{x}</span>
                  </div>
                ))}
              </div>

              <div aria-hidden className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="text-xs text-white/55">
                Want this page to match your Service Hub “Shared Pipeline” component exactly? Replace this section with your
                locked pipeline component and keep IDs.
              </div>
            </div>

            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-20"
              style={{
                background:
                  "radial-gradient(420px 140px at 85% 100%, rgba(109,40,255,.14), transparent 60%), radial-gradient(420px 140px at 15% 100%, rgba(158,243,21,.10), transparent 60%)",
              }}
            />
          </Card>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pb-16 sm:pb-24">
        <Card className="overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip>Next step</Chip>
                  <Chip tone="green">XR Discovery</Chip>
                  <Chip tone="violet">Fast prototype</Chip>
                </div>

                <div className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em]">
                  Tell us what you’re trying to achieve — we’ll map the fastest XR path.
                </div>

                <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
                  Share your use-case, audience, hardware preferences, and any integration requirements. We’ll respond with
                  a tight plan: scope, milestones, and the most realistic route to measurable outcomes.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium bg-white text-black hover:bg-white/90 transition"
                >
                  Go to Contact
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium border border-white/15 bg-white/[0.02] hover:bg-white/[0.05] transition"
                >
                  Back to Services
                </a>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                { k: "Response", v: "Typically within 24–48 hours" },
                { k: "Format", v: "Discovery call + written scope" },
                { k: "Deliverable", v: "Plan + prototype roadmap" },
              ].map((x) => (
                <div key={x.k} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-xs text-white/55">{x.k}</div>
                  <div className="mt-1 text-sm font-medium text-white/85">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(900px 260px at 18% 0%, rgba(158,243,21,.14), transparent 60%),
                radial-gradient(900px 260px at 82% 100%, rgba(109,40,255,.14), transparent 60%)
              `,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </Card>
      </section>

      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
    </main>
  );
}


