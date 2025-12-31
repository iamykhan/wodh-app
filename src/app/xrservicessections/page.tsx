"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — HERO IDEAS (1 FILE)
 * Wodh Design System v1 (XR Theme): GREEN-forward. (No violet.)
 * Background base: #0C0722
 *
 * Each hero is a standalone section with a clear ID so you can find + copy fast.
 * =======================================================================================
 */

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const BG = "#0C0722";
const GREEN = "#9EF315";

function PageBackdrop() {
  return (
    <>
      {/* base */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: BG }} />

      {/* green aurora + depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(900px 520px at 12% 10%, rgba(158,243,21,.20), transparent 62%),
            radial-gradient(760px 480px at 86% 22%, rgba(158,243,21,.08), transparent 60%),
            radial-gradient(820px 520px at 70% 92%, rgba(158,243,21,.10), transparent 60%),
            linear-gradient(to bottom, rgba(255,255,255,.04), transparent 34%, rgba(0,0,0,.32))
          `,
        }}
      />

      {/* subtle dotted grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,.08) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,.92), rgba(0,0,0,.35), rgba(0,0,0,.92))",
        }}
      />

      {/* top divider */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(255,255,255,.16), transparent)",
        }}
      />
    </>
  );
}

function XRGradientH1({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="text-balance text-[2.15rem] sm:text-5xl md:text-6xl font-semibold tracking-[-0.05em] leading-[1.02]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,.92), rgba(158,243,21,.92))`,
        WebkitBackgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </h1>
  );
}

function SoftCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
        "shadow-[0_10px_40px_rgba(0,0,0,.35)]",
        "hover:border-white/15 transition-colors",
        className
      )}
    >
      {children}
    </div>
  );
}

function DividerLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="my-10 sm:my-14 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <div className="text-xs tracking-[0.24em] text-white/50 uppercase">{children}</div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>
    </div>
  );
}

function CTA({
  primary = "Start XR Discovery",
  secondary = "View XR Work",
}: {
  primary?: string;
  secondary?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href="#"
        className="group inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium
                   bg-white text-black hover:bg-white/90 transition"
      >
        {primary}
        <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">→</span>
      </a>
      <a
        href="#"
        className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium
                   border border-white/15 bg-white/[0.02] hover:bg-white/[0.05] transition text-white/85"
      >
        {secondary}
      </a>
    </div>
  );
}

const PROOF_LINES = [
  { k: "Hardware-first", v: "Quest / PICO / WebXR" },
  { k: "Comfort + performance", v: "Frame-time budgets from day one" },
  { k: "Rollout-ready", v: "Analytics + deployment planning included" },
];

const OUTCOME_STRIP = ["Onboarding time ↓", "Errors ↓", "Retention ↑", "Cost ↓", "Standardization ↑"];

const SECTION_WRAP = "relative mx-auto w-full max-w-6xl px-4 sm:px-6";
const HERO_PAD = "pt-14 sm:pt-20 pb-10 sm:pb-14";

function FadeWrap({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * =======================================================================================
 * HERO IDEA 1 — "XR Systems That Ship" (Editorial + Proof Column)
 * ID: xr-hero-idea-1
 * Find tag: [HERO_IDEA_1]
 * =======================================================================================
 */
export function XR_HeroIdea1_SystemsThatShip() {
  return (
    <section id="xr-hero-idea-1" className={cx(SECTION_WRAP, HERO_PAD)}>
      {/* [HERO_IDEA_1] */}
      <FadeWrap>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
          <div className="flex flex-col gap-5">
            <XRGradientH1>XR Development that ships — training, twins, and real-world experiences.</XRGradientH1>

            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              We build production-ready XR systems that perform on real hardware, integrate with your stack, and scale
              from pilot to rollout — without sacrificing comfort, clarity, or craft.
            </p>

            <CTA primary="Start XR Discovery" secondary="View XR Work" />

            <div className="mt-2 text-xs text-white/50">
              Built for device conditions • Designed for adoption • Instrumented for measurable outcomes
            </div>
          </div>

          <SoftCard className="overflow-hidden">
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium text-white/85">XR Delivery Snapshot</div>
                <span className="text-xs text-white/50">Trust signals</span>
              </div>

              <div className="mt-4 grid gap-3">
                {PROOF_LINES.map((r) => (
                  <div key={r.k} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-xs text-white/55">{r.k}</div>
                      <div className="text-xs text-white/80 text-right">{r.v}</div>
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
                  <div className="text-xs text-white/70">XR-first checks: comfort • fps • usability</div>
                </div>
                <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="mt-2 text-xs text-white/55">
                  Discovery → Prototype → Production → Deploy. No overbuild, just what ships.
                </div>
              </div>
            </div>

            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-28"
              style={{
                background:
                  "linear-gradient(to top, rgba(158,243,21,.12), transparent), radial-gradient(520px 160px at 18% 100%, rgba(158,243,21,.14), transparent 65%)",
              }}
            />
          </SoftCard>
        </div>
      </FadeWrap>
    </section>
  );
}

/**
 * =======================================================================================
 * HERO IDEA 2 — "Use-Case First" (Centered editorial + outcome strip)
 * ID: xr-hero-idea-2
 * Find tag: [HERO_IDEA_2]
 * =======================================================================================
 */
export function XR_HeroIdea2_UseCaseFirst() {
  return (
    <section id="xr-hero-idea-2" className={cx(SECTION_WRAP, HERO_PAD)}>
      {/* [HERO_IDEA_2] */}
      <FadeWrap>
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <XRGradientH1>Turn training, operations, and product experiences into immersive XR systems.</XRGradientH1>

          <p className="text-base sm:text-lg leading-relaxed text-white/70">
            We build XR that improves time-to-competency, reduces errors, and scales across teams — designed for real
            environments and measured with telemetry.
          </p>

          <CTA primary="Start XR Project" secondary="See Platforms" />

          {/* outcome strip (text separators, not capsules) */}
          <div className="mt-3 w-full">
            <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-white/75">
                {OUTCOME_STRIP.map((x, idx) => (
                  <span key={x} className="inline-flex items-center gap-4">
                    <span className="whitespace-nowrap">{x}</span>
                    {idx !== OUTCOME_STRIP.length - 1 ? (
                      <span className="hidden sm:inline-block h-4 w-px bg-white/12" />
                    ) : null}
                  </span>
                ))}
              </div>
              <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="mt-3 text-xs text-white/50">
                Focused pilots → rollout-ready systems • VR training • AR workflows • digital twins • WebXR experiences
              </div>
            </div>
          </div>
        </div>
      </FadeWrap>
    </section>
  );
}

/**
 * =======================================================================================
 * HERO IDEA 3 — "The XR Promise" (Cinematic minimal split — calm + premium)
 * ID: xr-hero-idea-3
 * Find tag: [HERO_IDEA_3]
 * =======================================================================================
 */
export function XR_HeroIdea3_XRPromise() {
  return (
    <section id="xr-hero-idea-3" className={cx(SECTION_WRAP, HERO_PAD)}>
      {/* [HERO_IDEA_3] */}
      <FadeWrap>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
          <div className="flex flex-col gap-5">
            <XRGradientH1>XR Development for real environments.</XRGradientH1>

            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              Comfort-first, device-tested, rollout-ready — from VR training and simulation to digital twins and AR
              experiences that support teams in the field.
            </p>

            <CTA primary="Talk to XR Team" secondary="Explore What We Build" />

            <div className="mt-1 text-xs text-white/50">
              Designed for frame-time • Built for adoption • Delivered like a product, not a demo
            </div>

            {/* micro trust line */}
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {[
                { k: "Devices", v: "Quest / PICO / WebXR" },
                { k: "Approach", v: "Performance budgets" },
                { k: "Proof", v: "Telemetry + QA" },
              ].map((x) => (
                <div key={x.k} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="text-xs text-white/55">{x.k}</div>
                  <div className="mt-1 text-xs font-medium text-white/80">{x.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiet visual zone */}
          <SoftCard className="overflow-hidden">
            <div className="relative h-full min-h-[260px] sm:min-h-[320px]">
              {/* glass pane */}
              <div className="absolute inset-0 p-5 sm:p-6">
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
                  {/* coordinate ticks */}
                  <div className="relative h-full">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.55]"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
                        backgroundSize: "44px 44px",
                        maskImage:
                          "radial-gradient(70% 70% at 50% 40%, rgba(0,0,0,.95), rgba(0,0,0,.35) 70%, transparent 100%)",
                      }}
                    />

                    {/* green volumetric glow */}
                    <div
                      aria-hidden
                      className="absolute -inset-24"
                      style={{
                        background:
                          "radial-gradient(520px 320px at 55% 40%, rgba(158,243,21,.22), transparent 60%)",
                        filter: "blur(2px)",
                      }}
                    />

                    {/* single overlay line */}
                    <div className="absolute left-5 right-5 bottom-5 sm:left-6 sm:right-6 sm:bottom-6">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-xs text-white/55">XR field</div>
                        <div className="text-xs text-white/75">
                          Designed for frame-time. Built for adoption.
                        </div>
                      </div>
                      <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                      <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.45)" }}
                        />
                        <span>Comfort-first interactions • device QA • rollout planning</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* bottom fade */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,.35), transparent)" }}
              />
            </div>
          </SoftCard>
        </div>
      </FadeWrap>
    </section>
  );
}

/**
 * =======================================================================================
 * DEMO PAGE (renders all 3 heroes in one file)
 * You can delete this wrapper and import the hero you want.
 * =======================================================================================
 */
export default function XR_HeroIdeas_AllInOne() {
  return (
    <main className="relative min-h-screen text-white">
      <PageBackdrop />

      <XR_HeroIdea1_SystemsThatShip />
      <DividerLabel>HERO IDEA 2</DividerLabel>
      <XR_HeroIdea2_UseCaseFirst />
      <DividerLabel>HERO IDEA 3</DividerLabel>
      <XR_HeroIdea3_XRPromise />
      <DividerLabel>HERO IDEA 1 — EQUAL HEIGHT</DividerLabel>
      <XR_HeroIdea1_SystemsThatShip_EqualHeight />
      <DividerLabel>WHAT WE BUILD — IDEA 1</DividerLabel>
      <XR_WhatWeBuild_Idea1_SystemsLibrary />
      <DividerLabel>WHAT WE BUILD — IDEA 2</DividerLabel>
      <XR_WhatWeBuild_Idea2_ChooseUseCase />
      <DividerLabel>WHAT WE BUILD — IDEA 3</DividerLabel>
      <XR_WhatWeBuild_Idea3_FromProblemToSystem />
      <DividerLabel>WHAT WE BUILD — LOCK CANDIDATE</DividerLabel>
      <XR_WhatWeBuild />
      <DividerLabel>WHAT WE BUILD — REFINED IDEA 1</DividerLabel>
      <XR_WhatWeBuild_Idea1_SystemsLibrary_Refined />
      <DividerLabel>WHAT WE BUILD — REFINED IDEA 2</DividerLabel>
      <XR_WhatWeBuild_Idea2_ChooseUseCase_Refined />
      <DividerLabel>WHAT WE BUILD — REFINED IDEA 3</DividerLabel>
      <XR_WhatWeBuild_Idea3_ProblemBuildOutcome />
      <DividerLabel>WHAT WE BUILD — IDEA 1 V2 REFINED</DividerLabel>
      <XR_WhatWeBuild_Idea1_V2_Refined />
      <DividerLabel>WHAT WE BUILD — IDEA 1 V2 UNIFORM GRID</DividerLabel>
      <XR_WhatWeBuild_Idea1_V2_UniformGrid />
      <DividerLabel>CORE XR SERVICE OFFERINGS — IDEA 1</DividerLabel>
      <XR_CoreOfferings_Idea1_FourPillars />
      <DividerLabel>CORE XR SERVICE OFFERINGS — IDEA 2</DividerLabel>
      <XR_CoreOfferings_Idea2_CapabilityMatrix />
      <DividerLabel>CORE XR SERVICE OFFERINGS — IDEA 3</DividerLabel>
      <XR_CoreOfferings_Idea3_StackedPillars />
      <DividerLabel>CORE XR SERVICE OFFERINGS — OPTION A</DividerLabel>
      <XR_CoreOfferings_OptionA_EditorialPillars />
      <DividerLabel>CORE XR SERVICE OFFERINGS — OPTION B</DividerLabel>
      <XR_CoreOfferings_OptionB_SplitNarrativeRows />
      <DividerLabel>CORE XR SERVICE OFFERINGS — OPTION C</DividerLabel>
      <XR_CoreOfferings_OptionC_DeliveryMap />
      <DividerLabel>PLATFORMS & DEVICES — IDEA 1</DividerLabel>
      <XR_Platforms_Idea1_DeviceFamilies />
      <DividerLabel>PLATFORMS & DEVICES — IDEA 2</DividerLabel>
      <XR_Platforms_Idea2_CompatibilityMatrix />
      <DividerLabel>PLATFORMS & DEVICES — IDEA 3</DividerLabel>
      <XR_Platforms_Idea3_InteractiveSelector />
      <DividerLabel>PLATFORMS & DEVICES — OPTION B V2</DividerLabel>
      <XR_Platforms_OptionB_V2_SplitSignature />
      <DividerLabel>TOOLS & STACK LEDGER</DividerLabel>
      <XR_Tools_StackLedger />
      <DividerLabel>TOOLS & STACK LEDGER — V2</DividerLabel>
      <XR_Tools_StackLedger_V2 />
      <DividerLabel>INTEGRATION CAPABILITY — IDEA 1</DividerLabel>
      <XR_Integration_Idea1_Ledger />
      <DividerLabel>INTEGRATION CAPABILITY — IDEA 2</DividerLabel>
      <XR_Integration_Idea2_Map />
      <DividerLabel>INTEGRATION CAPABILITY — IDEA 3</DividerLabel>
      <XR_Integration_Idea3_Guarantees />
      <DividerLabel>INTEGRATION CAPABILITY — OPTION A</DividerLabel>
      <XR_Integration_OptionA_HubDiagram />
      <DividerLabel>INTEGRATION CAPABILITY — OPTION B</DividerLabel>
      <XR_Integration_OptionB_BeforeAfterStory />
      <DividerLabel>INTEGRATION CAPABILITY — OPTION C</DividerLabel>
      <XR_Integration_OptionC_ImplementationGuarantees />

      {/* bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,.38), transparent)" }}
      />
    </main>
  );
}

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — HERO IDEAS (REVISED • ULTRA CLEAN)
 * XR Theme: GREEN-forward. No violet. No capsules. No snapshot panels. No outcome strip.
 * Background base: #0C0722
 *
 * Each hero is a standalone section with:
 * - Named export
 * - Clear ID (for quick search)
 * - Find tags
 * =======================================================================================
 */

function MicroTrustLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 text-xs sm:text-sm text-white/55">
      <span
        aria-hidden
        className="mr-2 inline-block h-2.5 w-2.5 rounded-full align-[-1px]"
        style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
      />
      {children}
    </div>
  );
}

function SoftGlass({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
        "shadow-[0_12px_45px_rgba(0,0,0,.35)]",
        className
      )}
    >
      {/* inner pane */}
      <div className="absolute inset-4 rounded-2xl border border-white/10 bg-white/[0.02]" />

      {/* coordinate grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage:
            "radial-gradient(72% 72% at 55% 45%, rgba(0,0,0,.95), rgba(0,0,0,.35) 70%, transparent 100%)",
        }}
      />

      {/* volumetric green */}
      <div
        aria-hidden
        className="absolute -inset-24"
        style={{
          background: "radial-gradient(520px 340px at 55% 40%, rgba(158,243,21,.22), transparent 60%)",
          filter: "blur(2px)",
        }}
      />

      {/* subtle bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,.38), transparent)" }}
      />
    </div>
  );
}

/**
 * =======================================================================================
 * HERO IDEA 1 — "XR Systems That Ship" (Pure editorial + quiet visual)
 * ID: xr-hero-idea-1
 * Find tag: [HERO_IDEA_1_CLEAN]
 * =======================================================================================
 */
export function XR_HeroIdea1_SystemsThatShip_Clean() {
  return (
    <section id="xr-hero-idea-1" className={cx(SECTION_WRAP, HERO_PAD)}>
      {/* [HERO_IDEA_1_CLEAN] */}
      <FadeWrap>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-stretch">
          <div className="flex flex-col gap-5">
            <XRGradientH1>XR Development that ships — built for real environments.</XRGradientH1>

            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              We design and build production-ready XR systems: VR training, simulation, digital twins, and AR experiences
              — engineered for device performance and rollout, not demos.
            </p>

            <CTA primary="Start XR Discovery" secondary="View XR Work" />

            <MicroTrustLine>Meta Quest • PICO • WebXR • ARKit/ARCore — performance-first, adoption-ready.</MicroTrustLine>
          </div>

          {/* quiet visual (no snapshot, no lists) */}
          <div className="min-h-[240px] sm:min-h-[320px]">
            <SoftGlass className="h-full" />
          </div>
        </div>
      </FadeWrap>
    </section>
  );
}

/**
 * =======================================================================================
 * HERO IDEA 2 — "Use-Case First" (Centered editorial, no outcome strip)
 * ID: xr-hero-idea-2
 * Find tag: [HERO_IDEA_2_CLEAN]
 * =======================================================================================
 */
export function XR_HeroIdea2_UseCaseFirst_Clean() {
  return (
    <section id="xr-hero-idea-2" className={cx(SECTION_WRAP, HERO_PAD)}>
      {/* [HERO_IDEA_2_CLEAN] */}
      <FadeWrap>
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-5">
          <XRGradientH1>Immersive XR systems for training, operations, and product experiences.</XRGradientH1>

          <p className="text-base sm:text-lg leading-relaxed text-white/70">
            From VR learning and simulation to AR guidance and spatial visualization — we build XR that teams actually use,
            maintain, and improve over time.
          </p>

          <CTA primary="Start XR Project" secondary="Explore What We Build" />

          <MicroTrustLine>
            Built on real hardware, measured with telemetry, delivered with production discipline.
          </MicroTrustLine>
        </div>
      </FadeWrap>
    </section>
  );
}

/**
 * =======================================================================================
 * HERO IDEA 3 — "The XR Promise" (Cinematic minimal split, even cleaner)
 * ID: xr-hero-idea-3
 * Find tag: [HERO_IDEA_3_CLEAN]
 * =======================================================================================
 */
export function XR_HeroIdea3_XRPromise_Clean() {
  return (
    <section id="xr-hero-idea-3" className={cx(SECTION_WRAP, HERO_PAD)}>
      {/* [HERO_IDEA_3_CLEAN] */}
      <FadeWrap>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
          <div className="flex flex-col gap-5">
            <XRGradientH1>XR Development for real environments.</XRGradientH1>

            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
              Comfort-first interaction. Device-tested performance. Rollout-ready delivery. We build XR that feels natural
              on-headset and valuable on day one.
            </p>

            <CTA primary="Talk to XR Team" secondary="View XR Work" />

            <MicroTrustLine>Designed for frame-time budgets • Built for adoption • Shipped like a product.</MicroTrustLine>
          </div>

          <div className="min-h-[260px] sm:min-h-[340px]">
            <SoftGlass className="h-full" />
          </div>
        </div>
      </FadeWrap>
    </section>
  );
}

/**
 * =======================================================================================
 * DEMO PAGE (renders all 3 revised heroes)
 * You can delete this wrapper and import only the hero you want.
 * =======================================================================================
 */
export function XR_HeroIdeas_AllInOne_Revised() {
  return (
    <main className="relative min-h-screen text-white">
      <PageBackdrop />

      <XR_HeroIdea1_SystemsThatShip_Clean />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="my-10 sm:my-14 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>
      <XR_HeroIdea2_UseCaseFirst_Clean />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="my-10 sm:my-14 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>
      <XR_HeroIdea3_XRPromise_Clean />

      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,.40), transparent)" }}
      />
    </main>
  );
}

/**
 * =======================================================================================
 * HERO IDEA 1 — REFINED (Equal-height Snapshot + New Headline)
 * ID: xr-hero-idea-1
 * Find tag: [HERO_IDEA_1_EQUAL_HEIGHT]
 * =======================================================================================
 */
export function XR_HeroIdea1_SystemsThatShip_EqualHeight() {
  const reduceMotion = useReducedMotion();

  const rows = [
    { k: "Devices", v: "Meta Quest • PICO • WebXR" },
    { k: "AR", v: "ARKit • ARCore" },
    { k: "Build", v: "Performance budgets + comfort-first interaction" },
    { k: "Rollout", v: "Telemetry-ready + deploy planning" },
  ];

  return (
    <section id="xr-hero-idea-1" className={cx("relative mx-auto w-full max-w-6xl px-4 sm:px-6", "pt-14 sm:pt-20 pb-10 sm:pb-14")}>
      {/* [HERO_IDEA_1_EQUAL_HEIGHT] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        {/* Equal-height grid */}
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
          {/* Left (make it stretch and distribute nicely) */}
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="flex flex-col gap-5">
              <XRGradientH1>Production-ready XR for training, simulation, and spatial operations.</XRGradientH1>

              <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-white/70">
                We build XR systems that perform on real hardware, integrate with your stack, and scale from pilot to rollout —
                designed for comfort, clarity, and long-term iteration.
              </p>

              <CTA primary="Start XR Discovery" secondary="View XR Work" />

              <MicroTrustLine>
                Quest / PICO / WebXR / ARKit / ARCore — engineered for adoption, not demos.
              </MicroTrustLine>
            </div>

            {/* Optional quiet bottom hint (still clean) */}
            <div className="hidden sm:block text-xs text-white/45">
              Typical flow: Discovery → Prototype → Production → Deploy → Iterate
            </div>
          </div>

          {/* Right (Snapshot) — forced to match left height */}
          <div className="h-full">
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_12px_45px_rgba(0,0,0,.35)]">
              <div className="flex h-full flex-col p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-white/85">XR Delivery Snapshot</div>
                  <span className="text-xs text-white/50">How we ship</span>
                </div>

                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

                {/* Rows */}
                <div className="mt-4 grid gap-3">
                  {rows.map((r) => (
                    <div key={r.k} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-xs text-white/55">{r.k}</div>
                        <div className="text-xs text-white/80 text-right">{r.v}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Spacer to push footer to bottom (keeps equal-height feel premium) */}
                <div className="flex-1" />

                {/* Footer */}
                <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: GREEN, boxShadow: "0 0 18px rgba(158,243,21,.45)" }}
                    />
                    <div className="text-xs text-white/70">XR-first checks: comfort • fps • usability • telemetry</div>
                  </div>
                </div>
              </div>

              {/* XR green depth only */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    radial-gradient(780px 260px at 20% 0%, rgba(158,243,21,.16), transparent 60%),
                    radial-gradient(600px 220px at 85% 100%, rgba(158,243,21,.10), transparent 62%)
                  `,
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,.38), transparent)" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — SECTION 2: WHAT WE BUILD (3 IDEAS IN ONE FILE)
 * Wodh Design System v1 (XR Theme): GREEN-forward. No violet.
 * Base background: #0C0722
 *
 * Each idea is a standalone section with:
 * - Clear ID
 * - Named export
 * - Find tags
 * =======================================================================================
 */

const WRAP_WHATWE = "relative mx-auto w-full max-w-6xl px-4 sm:px-6";
const PAD_WHATWE = "py-10 sm:py-14";

function AccentLine() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.60), rgba(158,243,21,0))" }}
    />
  );
}

function SectionHeader({
  title,
  desc,
  align = "left",
}: {
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cx("mb-6 flex flex-col gap-3", align === "center" && "text-center items-center")}>
      <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
        {title}
      </h2>
      {desc ? (
        <p className={cx("text-sm sm:text-base leading-relaxed text-white/70", align === "center" ? "max-w-3xl" : "max-w-2xl")}>
          {desc}
        </p>
      ) : null}
      <div className="mt-1 h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/12 to-transparent" />
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span
        className="mt-1.5 h-1.5 w-1.5 rounded-full"
        style={{ background: "rgba(255,255,255,.55)" }}
      />
      <span>{children}</span>
    </li>
  );
}

function MicroLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs text-white/55 flex items-center gap-2">
      <span
        aria-hidden
        className="h-2.5 w-2.5 rounded-full"
        style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
      />
      <span>{children}</span>
    </div>
  );
}

function FadeIn({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.21, 1, 0.21, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Shared data
 */
type BuildTile = {
  title: string;
  oneLiner: string;
  deliverables: string[];
  runsOn: string;
};

const BUILD_TILES: BuildTile[] = [
  {
    title: "VR Training Modules",
    oneLiner: "Structured learning in immersive environments — consistent, repeatable, measurable.",
    deliverables: ["Scenario flows + assessments", "Scoring + completion tracking", "Content pipeline for updates"],
    runsOn: "Meta Quest • PICO",
  },
  {
    title: "Simulation Systems",
    oneLiner: "High-fidelity practice for complex or high-risk operations — without real-world risk.",
    deliverables: ["Procedural simulation + guidance", "Role-based flows", "Performance telemetry"],
    runsOn: "Meta Quest • PICO",
  },
  {
    title: "Digital Twin Viewers",
    oneLiner: "Spatial interfaces for operations — visualize assets, layers, and data in 3D.",
    deliverables: ["3D twin viewer + navigation", "Data overlays + states", "Admin-controlled views"],
    runsOn: "WebXR • Headsets (as needed)",
  },
  {
    title: "AR Field Workflows",
    oneLiner: "Step-by-step guidance in the real world — reduce errors and speed up tasks.",
    deliverables: ["Guided procedures + checklists", "3D anchors + annotations", "Offline-first options (if needed)"],
    runsOn: "ARKit • ARCore",
  },
  {
    title: "AR Product Experiences",
    oneLiner: "Explain, configure, and demo products in real space — for sales, retail, and marketing.",
    deliverables: ["AR placement + interactions", "Variants/configurator", "Explainer mode + capture"],
    runsOn: "ARKit • ARCore",
  },
  {
    title: "WebXR Experiences",
    oneLiner: "XR in the browser — fast access, broad reach, no install barriers.",
    deliverables: ["WebXR build + hosting setup", "Performance-optimized 3D", "Analytics events + iteration loop"],
    runsOn: "WebXR (browser)",
  },
];

/**
 * =======================================================================================
 * IDEA 1 — "XR Systems Library" (Editorial + 6 tiles)
 * ID: xr-what-we-build-idea-1
 * Find tag: [WHAT_WE_BUILD_IDEA_1]
 * =======================================================================================
 */
export function XR_WhatWeBuild_Idea1_SystemsLibrary() {
  return (
    <section id="xr-what-we-build-idea-1" className={cx(WRAP_WHATWE, PAD_WHATWE)}>
      {/* [WHAT_WE_BUILD_IDEA_1] */}
      <FadeIn>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="flex flex-col gap-4">
            <SectionHeader
              title={
                <>
                  What we build — <span className="text-white/70">XR systems, not prototypes.</span>
                </>
              }
              desc={
                <>
                  These are the most common XR systems we ship. Each one is designed for real environments, real users,
                  and long-term iteration — with performance and adoption as first principles.
                </>
              }
            />
            <MicroLine>Clear deliverables • real hardware constraints • rollout-ready planning</MicroLine>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {BUILD_TILES.map((t) => (
              <SoftCard key={t.title} className="p-5 sm:p-6">
                <div className="flex flex-col gap-3">
                  <AccentLine />
                  <div className="text-lg font-semibold tracking-[-0.02em] text-white">{t.title}</div>
                  <p className="text-sm leading-relaxed text-white/70">{t.oneLiner}</p>
                  <ul className="mt-1 grid gap-2">
                    {t.deliverables.map((d) => (
                      <Bullet key={d}>{d}</Bullet>
                    ))}
                  </ul>

                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="text-xs text-white/55">Runs on: {t.runsOn}</div>
                </div>

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
                  style={{
                    background:
                      "radial-gradient(380px 140px at 20% 100%, rgba(158,243,21,.14), transparent 65%)",
                  }}
                />
              </SoftCard>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/**
 * =======================================================================================
 * IDEA 2 — "Choose Your Use-Case" (Minimal switcher)
 * ID: xr-what-we-build-idea-2
 * Find tag: [WHAT_WE_BUILD_IDEA_2]
 * =======================================================================================
 */

type TabKey = "training" | "simulation" | "twins" | "field-ar" | "product-ar" | "webxr";

const TABS: Array<{ key: TabKey; label: string; title: string; story: string; deliverables: string[]; metrics: string[]; runsOn: string }> =
  [
    {
      key: "training",
      label: "Training",
      title: "XR Training System",
      story:
        "Immersive training that standardizes onboarding and transfers skills faster through repetition and assessment.",
      deliverables: ["Training scenarios + assessments", "Admin reporting", "Content pipeline for updates"],
      metrics: ["Time-to-competency ↓", "Retention ↑", "Error rate ↓"],
      runsOn: "Meta Quest • PICO",
    },
    {
      key: "simulation",
      label: "Simulation",
      title: "Simulation & Scenarios",
      story:
        "Practice complex tasks in a controlled environment — ideal for high-risk workflows and process validation.",
      deliverables: ["Scenario engine + guidance", "Role-based flows", "Performance telemetry"],
      metrics: ["Incidents ↓", "Consistency ↑", "Rework ↓"],
      runsOn: "Meta Quest • PICO",
    },
    {
      key: "twins",
      label: "Twins",
      title: "Digital Twin Interface",
      story:
        "Bring operational systems into a shared spatial view — understand, explain, and troubleshoot in 3D.",
      deliverables: ["3D twin viewer", "Layered data overlays", "Permissioned views"],
      metrics: ["Decision time ↓", "Clarity ↑", "Downtime ↓"],
      runsOn: "WebXR • Headset modes",
    },
    {
      key: "field-ar",
      label: "Field AR",
      title: "AR Field Workflows",
      story:
        "Step-by-step guidance for teams in the real world — reduce mistakes and speed up procedures.",
      deliverables: ["Guided procedures", "Anchors + annotations", "Offline-ready options"],
      metrics: ["Task time ↓", "Errors ↓", "First-time success ↑"],
      runsOn: "ARKit • ARCore",
    },
    {
      key: "product-ar",
      label: "Product AR",
      title: "AR Product Experiences",
      story:
        "AR demos and configurators that help customers and sales teams understand the product instantly.",
      deliverables: ["AR placement + interaction", "Configurator + variants", "Capture/share mode"],
      metrics: ["Engagement ↑", "Conversion ↑", "Returns ↓"],
      runsOn: "ARKit • ARCore",
    },
    {
      key: "webxr",
      label: "WebXR",
      title: "WebXR Experiences",
      story:
        "XR in the browser for maximum reach — fast access, minimal friction, easy iteration.",
      deliverables: ["WebXR build + hosting setup", "Optimized 3D", "Analytics events"],
      metrics: ["Reach ↑", "Time-to-first-use ↓", "Iteration speed ↑"],
      runsOn: "WebXR (browser)",
    },
  ];

function SegmentedTabs({
  value,
  onChange,
}: {
  value: TabKey;
  onChange: (v: TabKey) => void;
}) {
  return (
    <div className="inline-flex flex-wrap rounded-2xl border border-white/10 bg-white/[0.02] p-1">
      {TABS.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={cx(
              "px-3 py-2 text-xs sm:text-sm rounded-xl transition",
              active
                ? "bg-white text-black"
                : "text-white/75 hover:text-white hover:bg-white/[0.06]"
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export function XR_WhatWeBuild_Idea2_ChooseUseCase() {
  const [tab, setTab] = useState<TabKey>("training");
  const reduceMotion = useReducedMotion();

  const current = useMemo(() => TABS.find((t) => t.key === tab)!, [tab]);

  return (
    <section id="xr-what-we-build-idea-2" className={cx(WRAP_WHATWE, PAD_WHATWE)}>
      {/* [WHAT_WE_BUILD_IDEA_2] */}
      <FadeIn>
        <SectionHeader
          align="center"
          title={
            <>
              What we build — <span className="text-white/70">choose your use-case.</span>
            </>
          }
          desc="If you're not sure what XR format fits your goal, start here. Pick a use-case and see the typical build, deliverables, and success signals."
        />

        <div className="flex justify-center">
          <SegmentedTabs value={tab} onChange={setTab} />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_.9fr] lg:items-stretch">
          <SoftCard className="p-6 sm:p-7">
            <div className="flex flex-col gap-3">
              <AccentLine />
              <div className="text-lg sm:text-xl font-semibold tracking-[-0.02em]">{current.title}</div>
              <p className="text-sm sm:text-base leading-relaxed text-white/70">{current.story}</p>

              <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="text-sm font-medium text-white/85">Typical deliverables</div>
              <ul className="mt-2 grid gap-2">
                {current.deliverables.map((d) => (
                  <Bullet key={d}>{d}</Bullet>
                ))}
              </ul>

              <div className="mt-4 text-xs text-white/55">Runs on: {current.runsOn}</div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
              style={{
                background:
                  "radial-gradient(520px 160px at 20% 100%, rgba(158,243,21,.12), transparent 65%)",
              }}
            />
          </SoftCard>

          <SoftCard className="p-6 sm:p-7">
            <div className="flex flex-col gap-4">
              <div className="text-sm font-medium text-white/85">Success signals</div>
              <div className="grid gap-3">
                {current.metrics.map((m) => (
                  <div key={m} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
                      />
                      <div className="text-sm text-white/80">{m}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="text-sm font-medium text-white/85">What this helps you decide</div>
              <p className="text-sm leading-relaxed text-white/70">
                The best XR format depends on where the task happens: headset for repetition and safety, mobile AR for
                field guidance and demos, and WebXR for broad access with low friction.
              </p>

              <div className="text-xs text-white/55">
                Tip: start with 1–2 scenarios, validate comfort + performance, then scale content.
              </div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
              style={{
                background:
                  "radial-gradient(520px 160px at 80% 100%, rgba(158,243,21,.10), transparent 65%)",
              }}
            />
          </SoftCard>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-0"
          />
        </AnimatePresence>
      </FadeIn>
    </section>
  );
}

/**
 * =======================================================================================
 * IDEA 3 — "From Problem to System" (3 big editorial blocks)
 * ID: xr-what-we-build-idea-3
 * Find tag: [WHAT_WE_BUILD_IDEA_3]
 * =======================================================================================
 */

const STORY_BLOCKS = [
  {
    problem: "We need faster onboarding and consistent SOPs across teams.",
    build: "XR Training System",
    includes: ["Scenario-based learning", "Assessments + reporting", "Content pipeline for ongoing updates"],
    runsOn: "Meta Quest • PICO",
  },
  {
    problem: "We need operational clarity — a shared 3D view of complex systems.",
    build: "Digital Twin Interface",
    includes: ["Spatial visualization", "Layered data overlays", "Role-based views + access control"],
    runsOn: "WebXR • Headset modes",
  },
  {
    problem: "We need real-world guidance or product demos that reduce mistakes and increase confidence.",
    build: "AR Experience System",
    includes: ["AR guidance or product interaction", "Anchors + annotations", "Capture/share + field workflow support"],
    runsOn: "ARKit • ARCore",
  },
];

export function XR_WhatWeBuild_Idea3_FromProblemToSystem() {
  return (
    <section id="xr-what-we-build-idea-3" className={cx(WRAP_WHATWE, PAD_WHATWE)}>
      {/* [WHAT_WE_BUILD_IDEA_3] */}
      <FadeIn>
        <SectionHeader
          title={
            <>
              What we build — <span className="text-white/70">from problem to system.</span>
            </>
          }
          desc="A clearer way to think about XR: start with the real-world constraint, then design the system that teams will actually adopt."
        />

        <div className="grid gap-4">
          {STORY_BLOCKS.map((b) => (
            <SoftCard key={b.build} className="p-6 sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
                <div className="flex flex-col gap-3">
                  <AccentLine />
                  <div className="text-xs tracking-[0.22em] uppercase text-white/55">Problem</div>
                  <div className="text-lg sm:text-xl font-semibold tracking-[-0.02em] text-white">{b.problem}</div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="text-xs tracking-[0.22em] uppercase text-white/55">What we build</div>
                  <div className="text-lg font-semibold">{b.build}</div>
                  <div className="mt-1 text-sm font-medium text-white/85">What it includes</div>
                  <ul className="mt-1 grid gap-2">
                    {b.includes.map((x) => (
                      <Bullet key={x}>{x}</Bullet>
                    ))}
                  </ul>

                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="text-xs text-white/55">Runs on: {b.runsOn}</div>
                </div>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                style={{
                  background:
                    "radial-gradient(820px 220px at 20% 100%, rgba(158,243,21,.12), transparent 65%)",
                }}
              />
            </SoftCard>
          ))}
        </div>

        <div className="mt-6">
          <MicroLine>Start with the highest-impact workflow, validate on-device, then scale scenarios and content.</MicroLine>
        </div>
      </FadeIn>
    </section>
  );
}

/**
 * =======================================================================================
 * SECTION 2 — WHAT WE BUILD (LOCK CANDIDATE)
 * XR Theme: GREEN-forward (no violet)
 * ID: xr-what-we-build
 * Find tag: [SECTION_WHAT_WE_BUILD]
 * =======================================================================================
 */

type BuildItem = {
  title: string;
  oneLiner: string;
  bullets: string[];
  runsOn: string;
};

const WHAT_WE_BUILD: BuildItem[] = [
  {
    title: "VR Training Modules",
    oneLiner: "Structured learning in immersive environments — consistent, repeatable, measurable.",
    bullets: ["Scenario flows + assessments", "Scoring + completion tracking", "Content pipeline for updates"],
    runsOn: "Meta Quest • PICO",
  },
  {
    title: "Simulation Systems",
    oneLiner: "High-fidelity practice for complex or high-risk operations — without real-world risk.",
    bullets: ["Procedural simulation + guidance", "Role-based scenarios", "Performance telemetry"],
    runsOn: "Meta Quest • PICO",
  },
  {
    title: "Digital Twin Viewers",
    oneLiner: "Spatial interfaces for operations — visualize assets, layers, and data in 3D.",
    bullets: ["3D twin navigation", "Data overlays + states", "Role-based views"],
    runsOn: "WebXR • Headset modes",
  },
  {
    title: "AR Field Workflows",
    oneLiner: "Step-by-step guidance in the real world — reduce errors and speed up tasks.",
    bullets: ["Guided procedures + checklists", "3D anchors + annotations", "Offline-ready options (if needed)"],
    runsOn: "ARKit • ARCore",
  },
  {
    title: "AR Product Experiences",
    oneLiner: "Explain, configure, and demo products in real space — for sales, retail, and marketing.",
    bullets: ["AR placement + interactions", "Variants / configurator", "Capture + share mode"],
    runsOn: "ARKit • ARCore",
  },
  {
    title: "WebXR Experiences",
    oneLiner: "XR in the browser — fast access, broad reach, no install barriers.",
    bullets: ["WebXR build + hosting setup", "Performance-optimized 3D", "Analytics events + iteration loop"],
    runsOn: "WebXR (browser)",
  },
];

function AccentLine_WhatWeBuild() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

function Card_WhatWeBuild({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
        "shadow-[0_10px_40px_rgba(0,0,0,.35)] transition",
        "hover:border-white/15 hover:bg-white/[0.04] hover:-translate-y-[2px]",
        className
      )}
    >
      {children}
    </div>
  );
}

function Bullet_WhatWeBuild({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
      <span>{children}</span>
    </li>
  );
}

export function XR_WhatWeBuild() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-what-we-build" className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      {/* [SECTION_WHAT_WE_BUILD] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        {/* Header (editorial, no capsules) */}
        <div className="mb-7 sm:mb-9">
          <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
            What we build — <span className="text-white/70">XR systems, not prototypes.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
            Clear deliverables you can scope, ship, and roll out. Each build is designed for real environments, real users,
            and long-term iteration — with comfort and performance as first principles.
          </p>

          <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

          <div className="mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2">
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
            />
            Device-tested builds • optimized 3D pipeline • rollout-ready planning
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_WE_BUILD.map((item) => (
            <Card_WhatWeBuild key={item.title} className="p-5 sm:p-6">
              <div className="flex h-full flex-col gap-3">
                <AccentLine_WhatWeBuild />

                <div className="text-lg font-semibold tracking-[-0.02em] text-white">{item.title}</div>

                <p className="text-sm leading-relaxed text-white/70">{item.oneLiner}</p>

                <ul className="mt-1 grid gap-2">
                  {item.bullets.map((b) => (
                    <Bullet_WhatWeBuild key={b}>{b}</Bullet_WhatWeBuild>
                  ))}
                </ul>

                <div className="mt-auto">
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="mt-3 text-xs text-white/55">Runs on: {item.runsOn}</div>
                </div>
              </div>

              {/* subtle XR depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(520px 170px at 22% 100%, rgba(158,243,21,.14), transparent 65%)",
                }}
              />
            </Card_WhatWeBuild>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — "WHAT WE BUILD" (REFINED VERSIONS)
 * Wodh Design System v1 (XR Theme): GREEN-forward, NO violet.
 * Base background expected: #0C0722 (page-level)
 *
 * Sections:
 * 1) XR Systems Library (6 tiles)      — ID: xr-what-we-build-idea-1-refined
 * 2) Choose Your Use-Case (switcher)   — ID: xr-what-we-build-idea-2-refined
 * 3) Problem → Build → Outcome         — ID: xr-what-we-build-idea-3-refined
 * =======================================================================================
 */

const WRAP_REFINED = "relative mx-auto w-full max-w-6xl px-4 sm:px-6";
const PAD_REFINED = "py-12 sm:py-16";

function SectionHeader_Refined({
  title,
  desc,
  align = "left",
}: {
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cx("mb-7 sm:mb-9", align === "center" && "text-center")}>
      <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
        {title}
      </h2>
      {desc ? (
        <p
          className={cx(
            "mt-3 text-sm sm:text-base leading-relaxed text-white/70",
            align === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"
          )}
        >
          {desc}
        </p>
      ) : null}

      <div className={cx("mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent")} />

      <div className={cx("mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2", align === "center" && "justify-center")}>
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
        />
        <span>XR deliverables • device constraints • rollout-ready mindset</span>
      </div>
    </div>
  );
}

function Card_Refined({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
        "shadow-[0_10px_40px_rgba(0,0,0,.35)] transition",
        "hover:border-white/15 hover:bg-white/[0.04] hover:-translate-y-[2px]",
        className
      )}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(520px 170px at 22% 100%, rgba(158,243,21,.14), transparent 65%)",
        }}
      />
    </div>
  );
}

function AccentLine_Refined() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

function Bullet_Refined({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
      <span>{children}</span>
    </li>
  );
}

/* =======================================================================================
   IDEA 1 — XR Systems Library (6 tiles) — REFINED
   ID: xr-what-we-build-idea-1-refined
   Find tag: [WHAT_WE_BUILD_IDEA_1_REFINED]
======================================================================================= */

type BuildTile_Refined = {
  title: string;
  oneLiner: string;
  bullets: string[];
  runsOn: string;
};

const SYSTEMS_REFINED: BuildTile_Refined[] = [
  {
    title: "VR Training Modules",
    oneLiner: "Structured learning in immersive environments — consistent, repeatable, measurable.",
    bullets: ["Scenario flows + assessments", "Scoring + completion tracking", "Content pipeline for updates"],
    runsOn: "Meta Quest • PICO",
  },
  {
    title: "Simulation Systems",
    oneLiner: "High-fidelity practice for complex or high-risk operations — without real-world risk.",
    bullets: ["Procedural simulation + guidance", "Role-based scenarios", "Performance telemetry"],
    runsOn: "Meta Quest • PICO",
  },
  {
    title: "Digital Twin Viewers",
    oneLiner: "Spatial interfaces for operations — visualize assets, layers, and data in 3D.",
    bullets: ["3D twin navigation", "Layered data overlays", "Role-based views"],
    runsOn: "WebXR • Headset modes",
  },
  {
    title: "AR Field Workflows",
    oneLiner: "Step-by-step guidance in the real world — reduce errors and speed up tasks.",
    bullets: ["Guided procedures + checklists", "Anchors + annotations", "Offline-ready options (if needed)"],
    runsOn: "ARKit • ARCore",
  },
  {
    title: "AR Product Experiences",
    oneLiner: "Explain, configure, and demo products in real space — for sales, retail, and marketing.",
    bullets: ["AR placement + interactions", "Variants / configurator", "Capture + share mode"],
    runsOn: "ARKit • ARCore",
  },
  {
    title: "WebXR Experiences",
    oneLiner: "XR in the browser — fast access, broad reach, no install barriers.",
    bullets: ["WebXR build + hosting setup", "Performance-optimized 3D", "Analytics events + iteration loop"],
    runsOn: "WebXR (browser)",
  },
];

export function XR_WhatWeBuild_Idea1_SystemsLibrary_Refined() {
  const reduceMotion = useReducedMotion();
  return (
    <section id="xr-what-we-build-idea-1-refined" className={cx(WRAP_REFINED, PAD_REFINED)}>
      {/* [WHAT_WE_BUILD_IDEA_1_REFINED] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Refined
          title={
            <>
              What we build — <span className="text-white/70">XR systems, not prototypes.</span>
            </>
          }
          desc="A clear catalog of XR deliverables you can scope and ship — built for real environments, real users, and long-term iteration."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SYSTEMS_REFINED.map((s) => (
            <Card_Refined key={s.title} className="p-5 sm:p-6">
              <div className="flex h-full flex-col gap-3">
                <AccentLine_Refined />
                <div className="text-lg font-semibold tracking-[-0.02em] text-white">{s.title}</div>
                <p className="text-sm leading-relaxed text-white/70">{s.oneLiner}</p>

                <ul className="mt-1 grid gap-2">
                  {s.bullets.map((b) => (
                    <Bullet_Refined key={b}>{b}</Bullet_Refined>
                  ))}
                </ul>

                <div className="mt-auto">
                  <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="mt-3 text-xs text-white/55">Runs on: {s.runsOn}</div>
                </div>
              </div>
            </Card_Refined>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   IDEA 2 — Choose Your Use-Case (minimal switcher) — REFINED
   ID: xr-what-we-build-idea-2-refined
   Find tag: [WHAT_WE_BUILD_IDEA_2_REFINED]
======================================================================================= */

type TabKey_Refined = "training" | "simulation" | "twins" | "field-ar" | "product-ar" | "webxr";

const TABS_REFINED: Array<{
  key: TabKey_Refined;
  label: string;
  title: string;
  story: string;
  deliverables: string[];
  signals: string[];
  runsOn: string;
}> = [
  {
    key: "training",
    label: "Training",
    title: "XR Training System",
    story: "Immersive learning that standardizes onboarding and transfers skills faster through repetition and assessment.",
    deliverables: ["Scenario modules + assessments", "Admin reporting", "Updateable content pipeline"],
    signals: ["Time-to-competency ↓", "Retention ↑", "Consistency ↑"],
    runsOn: "Meta Quest • PICO",
  },
  {
    key: "simulation",
    label: "Simulation",
    title: "Simulation & Scenarios",
    story: "Practice complex workflows safely — ideal for high-risk tasks and process validation.",
    deliverables: ["Scenario engine + guidance", "Role-based flows", "Performance telemetry"],
    signals: ["Incidents ↓", "Errors ↓", "Rework ↓"],
    runsOn: "Meta Quest • PICO",
  },
  {
    key: "twins",
    label: "Twins",
    title: "Digital Twin Interface",
    story: "A shared spatial view of systems — understand, explain, and troubleshoot in 3D with layered data.",
    deliverables: ["Twin viewer + navigation", "Data overlays + states", "Permissioned views"],
    signals: ["Decision time ↓", "Clarity ↑", "Downtime ↓"],
    runsOn: "WebXR • Headset modes",
  },
  {
    key: "field-ar",
    label: "Field AR",
    title: "AR Field Workflows",
    story: "Real-world, step-by-step guidance that reduces mistakes and speeds up procedures for field teams.",
    deliverables: ["Guided procedures + checklists", "Anchors + annotations", "Offline options (if needed)"],
    signals: ["Task time ↓", "First-time success ↑", "Errors ↓"],
    runsOn: "ARKit • ARCore",
  },
  {
    key: "product-ar",
    label: "Product AR",
    title: "AR Product Experiences",
    story: "AR demos and configurators that help customers and sales teams understand the product instantly.",
    deliverables: ["AR placement + interactions", "Variants / configurator", "Capture + share mode"],
    signals: ["Engagement ↑", "Confidence ↑", "Conversion ↑"],
    runsOn: "ARKit • ARCore",
  },
  {
    key: "webxr",
    label: "WebXR",
    title: "WebXR Experiences",
    story: "XR in the browser for maximum reach — fast access, minimal friction, easy iteration.",
    deliverables: ["WebXR build + hosting", "Optimized 3D delivery", "Analytics events"],
    signals: ["Reach ↑", "Time-to-first-use ↓", "Iteration speed ↑"],
    runsOn: "WebXR (browser)",
  },
];

function SegmentedTabs_Refined({
  value,
  onChange,
}: {
  value: TabKey_Refined;
  onChange: (v: TabKey_Refined) => void;
}) {
  return (
    <div className="inline-flex flex-wrap rounded-2xl border border-white/10 bg-white/[0.02] p-1">
      {TABS_REFINED.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={cx(
              "px-3 py-2 text-xs sm:text-sm rounded-xl transition",
              active ? "bg-white text-black" : "text-white/75 hover:text-white hover:bg-white/[0.06]"
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export function XR_WhatWeBuild_Idea2_ChooseUseCase_Refined() {
  const [tab, setTab] = useState<TabKey_Refined>("training");
  const reduceMotion = useReducedMotion();
  const current = useMemo(() => TABS_REFINED.find((t) => t.key === tab)!, [tab]);

  return (
    <section id="xr-what-we-build-idea-2-refined" className={cx(WRAP_REFINED, PAD_REFINED)}>
      {/* [WHAT_WE_BUILD_IDEA_2_REFINED] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Refined
          align="center"
          title={
            <>
              What we build — <span className="text-white/70">choose your use-case.</span>
            </>
          }
          desc="Pick the closest goal and we'll show the typical system, deliverables, and success signals — without overwhelming detail."
        />

        <div className="flex justify-center">
          <SegmentedTabs_Refined value={tab} onChange={setTab} />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_.9fr] lg:items-stretch">
          <Card_Refined className="p-6 sm:p-7">
            <div className="flex flex-col gap-3">
              <AccentLine_Refined />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <div className="text-lg sm:text-xl font-semibold tracking-[-0.02em] text-white">
                    {current.title}
                  </div>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/70">{current.story}</p>

                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className="mt-4 text-sm font-medium text-white/85">Typical deliverables</div>
                  <ul className="mt-2 grid gap-2">
                    {current.deliverables.map((d) => (
                      <Bullet_Refined key={d}>{d}</Bullet_Refined>
                    ))}
                  </ul>

                  <div className="mt-4 text-xs text-white/55">Runs on: {current.runsOn}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Card_Refined>

          <Card_Refined className="p-6 sm:p-7">
            <div className="flex flex-col gap-4">
              <div className="text-sm font-medium text-white/85">Success signals</div>

              <div className="grid gap-3">
                {current.signals.map((s) => (
                  <div key={s} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
                      />
                      <div className="text-sm text-white/80">{s}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="text-sm font-medium text-white/85">How to choose</div>
              <p className="text-sm leading-relaxed text-white/70">
                Headsets work best for repetition and safety. Mobile AR fits field guidance and product demos. WebXR is best
                when reach and low friction matter most.
              </p>

              <div className="text-xs text-white/55">
                Start with 1–2 high-impact scenarios, validate on-device, then scale content.
              </div>
            </div>
          </Card_Refined>
        </div>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   IDEA 3 — Problem → Build → Outcome (3 editorial blocks) — REFINED
   ID: xr-what-we-build-idea-3-refined
   Find tag: [WHAT_WE_BUILD_IDEA_3_REFINED]
======================================================================================= */

const STORY_BLOCKS_REFINED = [
  {
    problem: "Onboarding is inconsistent — we need training that's repeatable and measurable.",
    build: "XR Training System",
    includes: ["Scenario-based learning", "Assessments + reporting", "Updateable content pipeline"],
    outcome: "Time-to-competency ↓ • Retention ↑ • Standardization ↑",
    runsOn: "Meta Quest • PICO",
  },
  {
    problem: "Operations are complex — we need clarity and a shared 3D view of systems.",
    build: "Digital Twin Interface",
    includes: ["Spatial visualization", "Layered data overlays", "Role-based views"],
    outcome: "Decision time ↓ • Clarity ↑ • Downtime ↓",
    runsOn: "WebXR • Headset modes",
  },
  {
    problem: "Field teams need guidance — or customers need a real-world product understanding.",
    build: "AR Experience System",
    includes: ["Guided workflows or demos", "Anchors + annotations", "Capture/share + support tools"],
    outcome: "Errors ↓ • Speed ↑ • Confidence ↑",
    runsOn: "ARKit • ARCore",
  },
];

export function XR_WhatWeBuild_Idea3_ProblemBuildOutcome() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-what-we-build-idea-3-refined" className={cx(WRAP_REFINED, PAD_REFINED)}>
      {/* [WHAT_WE_BUILD_IDEA_3_REFINED] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Refined
          title={
            <>
              What we build — <span className="text-white/70">from problem to system.</span>
            </>
          }
          desc="A clearer way to think about XR: start with the real-world constraint, then build the system teams will actually adopt."
        />

        <div className="grid gap-4">
          {STORY_BLOCKS_REFINED.map((b) => (
            <Card_Refined key={b.build} className="p-6 sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
                <div className="flex flex-col gap-3">
                  <AccentLine_Refined />
                  <div className="text-xs tracking-[0.22em] uppercase text-white/55">Problem</div>
                  <div className="text-lg sm:text-xl font-semibold tracking-[-0.02em] text-white">
                    {b.problem}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="text-xs tracking-[0.22em] uppercase text-white/55">What we build</div>
                  <div className="text-lg font-semibold text-white">{b.build}</div>

                  <div className="mt-1 text-sm font-medium text-white/85">What it includes</div>
                  <ul className="mt-1 grid gap-2">
                    {b.includes.map((x) => (
                      <Bullet_Refined key={x}>{x}</Bullet_Refined>
                    ))}
                  </ul>

                  <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className="text-xs text-white/55">Runs on: {b.runsOn}</div>
                  <div className="text-sm text-white/75">
                    <span className="text-white/55">Outcome: </span>
                    {b.outcome}
                  </div>
                </div>
              </div>
            </Card_Refined>
          ))}
        </div>

        <div className="mt-6 text-xs sm:text-sm text-white/55 flex items-center gap-2">
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
          />
          Start with the highest-impact workflow, validate on-device, then scale scenarios and content.
        </div>
      </motion.div>
    </section>
  );
}

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — WHAT WE BUILD (IDEA 1 v2 — REFINED)
 * Implements refinements: 1–10 (XR-green only)
 *
 * ✅ 1) Enterprise-clear header + scope line (no chips)
 * ✅ 2) Stronger tile hierarchy (title > one-liner > deliverables)
 * ✅ 3) "What you get" micro-label
 * ✅ 4) Spec-line format (Platform / AR / Web) only when relevant
 * ✅ 5) Optional tiny trust microline (comfort • perf • telemetry)
 * ✅ 6) Bento emphasis (2 wide tiles + 4 standard)
 * ✅ 7) Subtle motion: stagger in-view + hover sweep
 * ✅ 8) Handoff clarity row below grid
 * ✅ 9) Content upgraded to "system" language (deliverables)
 * ✅ 10) XR-green consistency (no violet)
 *
 * SECTION ID: xr-what-we-build
 * Find tag: [WHAT_WE_BUILD_IDEA_1_V2]
 * =======================================================================================
 */

type Specs_V2 = {
  platform?: string; // VR / headset
  ar?: string; // mobile AR
  web?: string; // WebXR
};

type Tile_V2 = {
  title: string;
  oneLiner: string;
  whatYouGet: string[];
  specs: Specs_V2;
  trust?: string;
  emphasis?: "wide" | "normal";
};

const TILES_V2: Tile_V2[] = [
  {
    title: "VR Training System",
    oneLiner: "Scenario-based onboarding with assessments, reporting, and updateable content.",
    whatYouGet: [
      "Scenario flows + scoring / pass criteria",
      "Admin reporting + user progression tracking",
      "Content pipeline for versioned updates",
    ],
    specs: { platform: "Meta Quest • PICO" },
    trust: "Comfort-first • Performance budgeted • Telemetry-ready",
    emphasis: "wide",
  },
  {
    title: "Digital Twin Interface",
    oneLiner: "A spatial 3D viewer for assets and layers — built for clarity, access control, and iteration.",
    whatYouGet: [
      "3D navigation + layer toggles / states",
      "Data overlays via APIs + permissioned views",
      "Scene optimization + streaming strategy",
    ],
    specs: { web: "WebXR", platform: "Headset mode (optional)" },
    trust: "Clarity-first • Optimized for FPS • Instrumented events",
    emphasis: "wide",
  },
  {
    title: "Simulation & Scenarios",
    oneLiner: "High-fidelity practice for complex workflows — without real-world risk.",
    whatYouGet: [
      "Scenario engine + step guidance / branching",
      "Role-based scenarios + checkpoints",
      "Telemetry on timing, errors, and completion",
    ],
    specs: { platform: "Meta Quest • PICO" },
    trust: "Comfort-first • Performance budgeted • QA on-device",
    emphasis: "normal",
  },
  {
    title: "AR Field Workflows",
    oneLiner: "Real-world guidance that reduces mistakes and speeds up procedures in the field.",
    whatYouGet: [
      "Guided procedures + checklists",
      "Anchors + annotations / 3D cues",
      "Offline-ready patterns (when needed)",
    ],
    specs: { ar: "ARKit • ARCore" },
    trust: "Readable UX • Robust tracking • Telemetry-ready",
    emphasis: "normal",
  },
  {
    title: "AR Product Experience",
    oneLiner: "AR demos and configurators that explain products in real space — fast and convincing.",
    whatYouGet: [
      "AR placement + interactions",
      "Variant / configuration logic",
      "Capture/share mode + analytics events",
    ],
    specs: { ar: "ARKit • ARCore" },
    trust: "Fast load • Stable tracking • Measurable funnels",
    emphasis: "normal",
  },
  {
    title: "WebXR Experience",
    oneLiner: "XR in the browser for broad reach — low friction, fast iteration, measurable results.",
    whatYouGet: [
      "WebXR build + hosting / deployment setup",
      "Performance-optimized 3D delivery",
      "Analytics events + iteration loop",
    ],
    specs: { web: "WebXR (browser)" },
    trust: "Low friction • Optimized delivery • Telemetry-ready",
    emphasis: "normal",
  },
];

function Header_V2() {
  return (
    <div className="mb-7 sm:mb-9">
      <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
        What we build — <span className="text-white/70">XR systems you can scope, ship, and roll out.</span>
      </h2>

      <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
        A practical catalog of XR deliverables — designed for real environments, real users, and long-term iteration.
        We prioritize comfort, frame-time, and adoption from day one.
      </p>

      {/* scope line (no chips) */}
      <div className="mt-4 text-sm text-white/60">
        <span className="text-white/45">Scope:</span>{" "}
        VR Training • Simulation • Digital Twins • Field AR • Product AR • WebXR
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      {/* single trust line */}
      <div className="mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2">
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
        />
        Device-tested builds mjhy kro please • optimized 3D pipeline • rollout-ready delivery
      </div>
    </div>
  );
}

function AccentLine_V2() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

function Bullet_V2({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
      <span>{children}</span>
    </li>
  );
}

function SpecRow({ specs }: { specs: Specs_V2 }) {
  const items: Array<{ k: string; v: string }> = [];
  if (specs.platform) items.push({ k: "Platform", v: specs.platform });
  if (specs.ar) items.push({ k: "AR", v: specs.ar });
  if (specs.web) items.push({ k: "Web", v: specs.web });

  return (
    <div className="mt-4 grid gap-2">
      {items.map((it) => (
        <div key={it.k} className="flex items-start justify-between gap-3 text-xs text-white/60">
          <span className="text-white/45">{it.k}</span>
          <span className="text-right text-white/70">{it.v}</span>
        </div>
      ))}
    </div>
  );
}

function TileCard({
  tile,
  index,
}: {
  tile: Tile_V2;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const wide = tile.emphasis === "wide";

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: 0.05 * index, ease: [0.21, 1, 0.21, 1] }}
      className={cx(wide ? "sm:col-span-2" : "sm:col-span-1")}
    >
      <div
        className={cx(
          "group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
          "shadow-[0_10px_40px_rgba(0,0,0,.35)] transition",
          "hover:border-white/15 hover:bg-white/[0.04] hover:-translate-y-[2px]"
        )}
      >
        {/* hover sweep (subtle) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-24 -top-24 h-48 rotate-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(158,243,21,.10), transparent)",
            filter: "blur(1px)",
          }}
        />

        {/* XR green depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px 180px at 22% 100%, rgba(158,243,21,.14), transparent 65%)",
          }}
        />

        <div className={cx("relative p-5 sm:p-6", wide && "sm:p-7")}>
          <AccentLine_V2 />

          {/* hierarchy */}
          <div className={cx("mt-3 font-semibold tracking-[-0.02em] text-white", wide ? "text-xl" : "text-lg")}>
            {tile.title}
          </div>

          <p className={cx("mt-2 text-sm leading-relaxed text-white/70", wide && "sm:text-base")}>
            {tile.oneLiner}
          </p>

          {/* What you get label */}
          <div className="mt-4 text-xs tracking-[0.22em] uppercase text-white/55">
            What you get
          </div>

          <ul className="mt-2 grid gap-2">
            {tile.whatYouGet.map((b) => (
              <Bullet_V2 key={b}>{b}</Bullet_V2>
            ))}
          </ul>

          <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* specs as key/value */}
          <SpecRow specs={tile.specs} />

          {/* micro trust line */}
          {tile.trust ? (
            <div className="mt-4 text-xs text-white/50">
              {tile.trust}
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export function XR_WhatWeBuild_Idea1_V2_Refined() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-what-we-build-v2" className={cx(WRAP_REFINED, PAD_REFINED)}>
      {/* [WHAT_WE_BUILD_IDEA_1_V2] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <Header_V2 />

        {/* Bento grid: 2 wide top, 4 normal below */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {/* Order is already arranged so first two are wide. */}
          {TILES_V2.map((t, idx) => (
            <TileCard key={t.title} tile={t} index={idx} />
          ))}
        </div>

        {/* Handoff clarity row */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-1 h-2.5 w-2.5 rounded-full"
              style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
            />
            <div className="text-sm text-white/70 leading-relaxed">
              <span className="text-white/85 font-medium">Typical delivery:</span>{" "}
              Discovery → Prototype → Production build → Deployment + iteration.{" "}
              We validate comfort and performance on-device before scaling content.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — WHAT WE BUILD (IDEA 1 v2 — REFINED, UNIFORM 6 GRID)
 * XR Theme: GREEN-forward, NO violet.
 *
 * ✅ Keeps refinements 1–10
 * ❌ Removes bento/wide tiles (uniform 6-tile grid)
 *
 * SECTION ID: xr-what-we-build
 * Find tag: [WHAT_WE_BUILD_IDEA_1_V2_UNIFORM]
 * =======================================================================================
 */

type Specs_Uniform = {
  platform?: string; // VR / headset
  ar?: string; // mobile AR
  web?: string; // WebXR
};

type Tile_Uniform = {
  title: string;
  oneLiner: string;
  whatYouGet: string[];
  specs: Specs_Uniform;
  trust?: string;
};

const TILES_Uniform: Tile_Uniform[] = [
  {
    title: "VR Training System",
    oneLiner: "Scenario-based onboarding with assessments, reporting, and updateable content.",
    whatYouGet: [
      "Scenario flows + scoring / pass criteria",
      "Admin reporting + user progression tracking",
      "Content pipeline for versioned updates",
    ],
    specs: { platform: "Meta Quest • PICO" },
    trust: "Comfort-first • Performance budgeted • Telemetry-ready",
  },
  {
    title: "Simulation & Scenarios",
    oneLiner: "High-fidelity practice for complex workflows — without real-world risk.",
    whatYouGet: [
      "Scenario engine + step guidance / branching",
      "Role-based scenarios + checkpoints",
      "Telemetry on timing, errors, and completion",
    ],
    specs: { platform: "Meta Quest • PICO" },
    trust: "Comfort-first • Performance budgeted • QA on-device",
  },
  {
    title: "Digital Twin Interface",
    oneLiner: "A spatial 3D viewer for assets and layers — built for clarity, access control, and iteration.",
    whatYouGet: [
      "3D navigation + layer toggles / states",
      "Data overlays via APIs + permissioned views",
      "Scene optimization + streaming strategy",
    ],
    specs: { web: "WebXR", platform: "Headset mode (optional)" },
    trust: "Clarity-first • Optimized for FPS • Instrumented events",
  },
  {
    title: "AR Field Workflows",
    oneLiner: "Real-world guidance that reduces mistakes and speeds up procedures in the field.",
    whatYouGet: [
      "Guided procedures + checklists",
      "Anchors + annotations / 3D cues",
      "Offline-ready patterns (when needed)",
    ],
    specs: { ar: "ARKit • ARCore" },
    trust: "Readable UX • Robust tracking • Telemetry-ready",
  },
  {
    title: "AR Product Experience",
    oneLiner: "AR demos and configurators that explain products in real space — fast and convincing.",
    whatYouGet: [
      "AR placement + interactions",
      "Variant / configuration logic",
      "Capture/share mode + analytics events",
    ],
    specs: { ar: "ARKit • ARCore" },
    trust: "Fast load • Stable tracking • Measurable funnels",
  },
  {
    title: "WebXR Experience",
    oneLiner: "XR in the browser for broad reach — low friction, fast iteration, measurable results.",
    whatYouGet: [
      "WebXR build + hosting / deployment setup",
      "Performance-optimized 3D delivery",
      "Analytics events + iteration loop",
    ],
    specs: { web: "WebXR (browser)" },
    trust: "Low friction • Optimized delivery • Telemetry-ready",
  },
];

function Header_Uniform() {
  return (
    <div className="mb-7 sm:mb-9">
      <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
        What we build — <span className="text-white/70">XR systems you can scope, ship, and roll out.</span>
      </h2>

      <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
        A practical catalog of XR deliverables — designed for real environments, real users, and long-term iteration.
        We prioritize comfort, frame-time, and adoption from day one.
      </p>

      {/* scope line (no chips) */}
      <div className="mt-4 text-sm text-white/60">
        <span className="text-white/45">Scope:</span>{" "}
        VR Training • Simulation • Digital Twins • Field AR • Product AR • WebXR
      </div>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2">
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
        />
        Device-tested builds • optimized 3D pipeline • rollout-ready delivery
      </div>
    </div>
  );
}

function AccentLine_Uniform() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

function Bullet_Uniform({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
      <span>{children}</span>
    </li>
  );
}

function SpecRow_Uniform({ specs }: { specs: Specs_Uniform }) {
  const items: Array<{ k: string; v: string }> = [];
  if (specs.platform) items.push({ k: "Platform", v: specs.platform });
  if (specs.ar) items.push({ k: "AR", v: specs.ar });
  if (specs.web) items.push({ k: "Web", v: specs.web });

  return (
    <div className="mt-4 grid gap-2">
      {items.map((it) => (
        <div key={it.k} className="flex items-start justify-between gap-3 text-xs text-white/60">
          <span className="text-white/45">{it.k}</span>
          <span className="text-right text-white/70">{it.v}</span>
        </div>
      ))}
    </div>
  );
}

function TileCard_Uniform({ tile, index }: { tile: Tile_Uniform; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: 0.05 * index, ease: [0.21, 1, 0.21, 1] }}
      className="h-full"
    >
      <div
        className={cx(
          "group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
          "shadow-[0_10px_40px_rgba(0,0,0,.35)] transition",
          "hover:border-white/15 hover:bg-white/[0.04] hover:-translate-y-[2px]"
        )}
      >
        {/* hover sweep (subtle) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-24 -top-24 h-48 rotate-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(158,243,21,.10), transparent)",
            filter: "blur(1px)",
          }}
        />

        {/* XR green depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(600px 180px at 22% 100%, rgba(158,243,21,.14), transparent 65%)",
          }}
        />

        <div className="relative p-5 sm:p-6">
          <AccentLine_Uniform />

          <div className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white">
            {tile.title}
          </div>

          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {tile.oneLiner}
          </p>

          <div className="mt-4 text-xs tracking-[0.22em] uppercase text-white/55">
            What you get
          </div>

          <ul className="mt-2 grid gap-2">
            {tile.whatYouGet.map((b) => (
              <Bullet_Uniform key={b}>{b}</Bullet_Uniform>
            ))}
          </ul>

          <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <SpecRow_Uniform specs={tile.specs} />

          {tile.trust ? (
            <div className="mt-4 text-xs text-white/50">{tile.trust}</div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

export function XR_WhatWeBuild_Idea1_V2_UniformGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-what-we-build-uniform" className={cx(WRAP_REFINED, PAD_REFINED)}>
      {/* [WHAT_WE_BUILD_IDEA_1_V2_UNIFORM] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <Header_Uniform />

        {/* Uniform 6-tile grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {TILES_Uniform.map((t, idx) => (
            <TileCard_Uniform key={t.title} tile={t} index={idx} />
          ))}
        </div>

        {/* Handoff clarity row */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="mt-1 h-2.5 w-2.5 rounded-full"
              style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
            />
            <div className="text-sm text-white/70 leading-relaxed">
              <span className="text-white/85 font-medium">Typical delivery:</span>{" "}
              Discovery → Prototype → Production build → Deployment + iteration.{" "}
              We validate comfort and performance on-device before scaling content.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — SECTION 3: CORE XR SERVICE OFFERINGS (3 IDEAS)
 * Wodh Design System v1 (XR Theme): GREEN-forward, NO violet.
 * Base background expected: #0C0722 (page-level)
 *
 * 1) 4 Pillars + What's Included     — ID: xr-core-offerings-idea-1
 * 2) Capability Matrix (Services×Phases) — ID: xr-core-offerings-idea-2
 * 3) Stacked Pillars (Editorial blocks)  — ID: xr-core-offerings-idea-3
 * =======================================================================================
 */

const WRAP_CORE = "relative mx-auto w-full max-w-6xl px-4 sm:px-6";
const PAD_CORE = "py-12 sm:py-16";

function SectionHeader_Core({
  title,
  desc,
  align = "left",
}: {
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cx("mb-7 sm:mb-9", align === "center" && "text-center")}>
      <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
        {title}
      </h2>
      {desc ? (
        <p
          className={cx(
            "mt-3 text-sm sm:text-base leading-relaxed text-white/70",
            align === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"
          )}
        >
          {desc}
        </p>
      ) : null}

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className={cx("mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2", align === "center" && "justify-center")}>
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
        />
        <span>Service pillars • deliverables • production delivery</span>
      </div>
    </div>
  );
}

function AccentLine_Core() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

function Card_Core({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
        "shadow-[0_10px_40px_rgba(0,0,0,.35)] transition",
        "hover:border-white/15 hover:bg-white/[0.04] hover:-translate-y-[2px]",
        className
      )}
    >
      {children}
      {/* subtle XR depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(520px 170px at 22% 100%, rgba(158,243,21,.14), transparent 65%)",
        }}
      />
    </div>
  );
}

function Bullet_Core({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
      <span>{children}</span>
    </li>
  );
}

function TagLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-xs text-white/55">
      <span className="text-white/45">{label}: </span>
      <span className="text-white/70">{value}</span>
    </div>
  );
}

/* =======================================================================================
   IDEA 1 — 4 Pillars + What's Included
   ID: xr-core-offerings-idea-1
   Find tag: [XR_CORE_OFFERINGS_IDEA_1]
======================================================================================= */

type Pillar = {
  title: string;
  promise: string;
  includes: string[];
  bestFor: string;
};

const PILLARS: Pillar[] = [
  {
    title: "XR Training & Simulation",
    promise: "Repeatable learning and safe practice — designed for comfort, assessment, and scale.",
    includes: [
      "Scenario design + flow mapping",
      "Assessments, scoring + completion criteria",
      "Admin reporting + learner progression",
      "Performance budgets (fps / comfort) baked in",
      "Telemetry events for iteration",
    ],
    bestFor: "Onboarding, safety, SOPs, high-risk workflows",
  },
  {
    title: "Digital Twins & Spatial Ops",
    promise: "3D interfaces for complex systems — understand, explain, and troubleshoot in a shared spatial view.",
    includes: [
      "3D twin viewer + navigation",
      "Layered data overlays via APIs",
      "Role-based access + permissions",
      "Scene optimization + streaming strategy",
      "Dashboards / admin controls (as needed)",
    ],
    bestFor: "Operations, asset visibility, training + troubleshooting",
  },
  {
    title: "AR Experiences (Field + Product)",
    promise: "AR guidance and demos in real space — fast, stable tracking and clear UX.",
    includes: [
      "AR anchors + annotations / 3D cues",
      "Guided procedures + checklists",
      "Variant/configurator logic (product AR)",
      "Capture/share mode (as needed)",
      "Offline-ready patterns (when needed)",
    ],
    bestFor: "Field workflows, maintenance, sales enablement, retail",
  },
  {
    title: "WebXR & Rapid Prototypes",
    promise: "XR in the browser for low friction — validate ideas, reach more users, iterate quickly.",
    includes: [
      "WebXR build + deployment setup",
      "Optimized 3D delivery (loading / LOD)",
      "Cross-device compatibility checks",
      "Analytics events + iteration loop",
      "Prototype-to-production planning",
    ],
    bestFor: "Marketing experiences, lightweight training, broad reach pilots",
  },
];

export function XR_CoreOfferings_Idea1_FourPillars() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-core-offerings-idea-1" className={cx(WRAP_CORE, PAD_CORE)}>
      {/* [XR_CORE_OFFERINGS_IDEA_1] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Core
          title={
            <>
              Core XR service offerings — <span className="text-white/70">your pillars.</span>
            </>
          }
          desc="Four service pillars that cover most XR programs — from training and simulation to digital twins and AR workflows. Each pillar is scoped as a system you can ship and maintain."
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <Card_Core key={p.title} className="p-5 sm:p-6">
              <div className="flex flex-col gap-3">
                <AccentLine_Core />
                <div className="mt-2 text-lg font-semibold tracking-[-0.02em] text-white">{p.title}</div>
                <p className="text-sm leading-relaxed text-white/70">{p.promise}</p>

                <div className="mt-3 text-xs tracking-[0.22em] uppercase text-white/55">
                  What's included
                </div>
                <ul className="mt-2 grid gap-2">
                  {p.includes.map((x) => (
                    <Bullet_Core key={x}>{x}</Bullet_Core>
                  ))}
                </ul>

                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <TagLine label="Best for" value={p.bestFor} />
              </div>
            </Card_Core>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   IDEA 2 — Capability Matrix (Services × Phases)
   ID: xr-core-offerings-idea-2
   Find tag: [XR_CORE_OFFERINGS_IDEA_2]
======================================================================================= */

type Phase = "Discovery" | "Design" | "Build" | "QA" | "Deploy";
const PHASES: Phase[] = ["Discovery", "Design", "Build", "QA", "Deploy"];

type ServiceRow = {
  service: string;
  note: string;
  coverage: Record<Phase, boolean>;
};

const MATRIX: ServiceRow[] = [
  {
    service: "VR Training",
    note: "Scenario-based learning + reporting",
    coverage: { Discovery: true, Design: true, Build: true, QA: true, Deploy: true },
  },
  {
    service: "Simulation",
    note: "High-risk workflows + telemetry",
    coverage: { Discovery: true, Design: true, Build: true, QA: true, Deploy: true },
  },
  {
    service: "Digital Twins",
    note: "3D spatial interface + data overlays",
    coverage: { Discovery: true, Design: true, Build: true, QA: true, Deploy: true },
  },
  {
    service: "AR Field Workflows",
    note: "Guided procedures + annotations",
    coverage: { Discovery: true, Design: true, Build: true, QA: true, Deploy: true },
  },
  {
    service: "AR Product",
    note: "Demos + configurators",
    coverage: { Discovery: true, Design: true, Build: true, QA: true, Deploy: true },
  },
  {
    service: "WebXR",
    note: "Browser-based XR + analytics",
    coverage: { Discovery: true, Design: true, Build: true, QA: true, Deploy: true },
  },
  {
    service: "Analytics",
    note: "Events + dashboards (as needed)",
    coverage: { Discovery: true, Design: true, Build: true, QA: true, Deploy: true },
  },
  {
    service: "Deployment",
    note: "Packaging + rollout planning",
    coverage: { Discovery: true, Design: false, Build: true, QA: true, Deploy: true },
  },
];

function Check({ on }: { on: boolean }) {
  return (
    <div
      className={cx(
        "mx-auto flex h-6 w-6 items-center justify-center rounded-lg border",
        on ? "border-white/12 bg-white/[0.03]" : "border-white/8 bg-transparent"
      )}
      aria-label={on ? "Included" : "Optional"}
    >
      {on ? (
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 14px rgba(158,243,21,.35)" }}
        />
      ) : (
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/20" />
      )}
    </div>
  );
}

export function XR_CoreOfferings_Idea2_CapabilityMatrix() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-core-offerings-idea-2" className={cx(WRAP_CORE, PAD_CORE)}>
      {/* [XR_CORE_OFFERINGS_IDEA_2] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Core
          title={
            <>
              Core XR service offerings — <span className="text-white/70">capability matrix.</span>
            </>
          }
          desc="A quick coverage view: what we deliver across the full lifecycle — from discovery through deployment."
        />

        <Card_Core className="p-0 overflow-hidden">
          <div className="p-5 sm:p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-white/85">Services × Delivery Phases</div>
                <div className="mt-1 text-xs text-white/55">Green dot = included • Grey dot = optional</div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-white/55">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: GREEN, boxShadow: "0 0 14px rgba(158,243,21,.35)" }} />
                Included
                <span className="ml-3 h-1.5 w-1.5 rounded-full bg-white/25" />
                Optional
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

          <div className="overflow-x-auto">
            <table className="min-w-[860px] w-full">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.22em] text-white/55">
                  <th className="px-5 sm:px-6 py-4 w-[280px]">Service</th>
                  {PHASES.map((p) => (
                    <th key={p} className="px-4 py-4 text-center">
                      {p}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row, idx) => (
                  <tr key={row.service} className={cx(idx !== 0 && "border-t border-white/10")}>
                    <td className="px-5 sm:px-6 py-4">
                      <div className="text-sm font-medium text-white/85">{row.service}</div>
                      <div className="mt-1 text-xs text-white/55">{row.note}</div>
                    </td>
                    {PHASES.map((p) => (
                      <td key={p} className="px-4 py-4 text-center">
                        <Check on={row.coverage[p]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 sm:p-6">
            <div className="text-sm text-white/70 leading-relaxed">
              We tailor the exact mix per project — but our default posture is production: device QA, performance budgets,
              and telemetry for iteration.
            </div>
          </div>
        </Card_Core>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   IDEA 3 — Stacked Pillars (Editorial blocks)
   ID: xr-core-offerings-idea-3
   Find tag: [XR_CORE_OFFERINGS_IDEA_3]
======================================================================================= */

type StackBlock = {
  title: string;
  story: string;
  deliverables: string[];
  outcomes: string[];
  runsOn: string;
};

const STACK: StackBlock[] = [
  {
    title: "XR Training & Simulation",
    story:
      "Build repeatable training that scales across teams — designed for comfort, assessment, and measurable progression.",
    deliverables: ["Scenario design + assessments", "Admin reporting + completion tracking", "Telemetry events for iteration"],
    outcomes: ["Time-to-competency ↓", "Errors ↓", "Retention ↑"],
    runsOn: "Meta Quest • PICO",
  },
  {
    title: "Digital Twins & Spatial Ops",
    story:
      "Create a spatial interface for complex systems — layered, permissioned, and optimized for clarity and performance.",
    deliverables: ["3D twin viewer + overlays", "API-driven data states", "Optimization + scene streaming"],
    outcomes: ["Decision time ↓", "Clarity ↑", "Downtime ↓"],
    runsOn: "WebXR • Headset modes",
  },
  {
    title: "AR Workflows & Product AR",
    story:
      "Deliver AR that feels stable and usable in real environments — guidance for teams or demos for customers.",
    deliverables: ["Anchors + annotations", "Guided checklists / demos", "Capture/share (as needed)"],
    outcomes: ["Task time ↓", "First-time success ↑", "Confidence ↑"],
    runsOn: "ARKit • ARCore",
  },
  {
    title: "WebXR & Rapid Validation",
    story:
      "Launch browser-based XR to reduce friction and expand reach — ideal for pilots, demos, and lightweight training.",
    deliverables: ["WebXR build + hosting setup", "Optimized 3D delivery", "Analytics + iteration loop"],
    outcomes: ["Reach ↑", "Time-to-first-use ↓", "Iteration speed ↑"],
    runsOn: "WebXR (browser)",
  },
];

export function XR_CoreOfferings_Idea3_StackedPillars() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-core-offerings-idea-3" className={cx(WRAP_CORE, PAD_CORE)}>
      {/* [XR_CORE_OFFERINGS_IDEA_3] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Core
          title={
            <>
              Core XR service offerings — <span className="text-white/70">built as systems.</span>
            </>
          }
          desc="Four core XR offerings, written like chapters: what it is, what you get, and how it drives outcomes — without fluff."
        />

        <div className="grid gap-4">
          {STACK.map((b) => (
            <Card_Core key={b.title} className="p-6 sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
                <div className="flex flex-col gap-3">
                  <AccentLine_Core />
                  <div className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white">{b.title}</div>
                  <p className="text-sm sm:text-base leading-relaxed text-white/70">{b.story}</p>

                  <div className="mt-4 flex items-center gap-2 text-xs text-white/55">
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
                    />
                    Runs on: <span className="text-white/70">{b.runsOn}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <div className="text-xs tracking-[0.22em] uppercase text-white/55">Deliverables</div>
                    <ul className="mt-2 grid gap-2">
                      {b.deliverables.map((x) => (
                        <Bullet_Core key={x}>{x}</Bullet_Core>
                      ))}
                    </ul>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div>
                    <div className="text-xs tracking-[0.22em] uppercase text-white/55">Outcomes</div>
                    <div className="mt-2 flex flex-wrap gap-2 text-sm text-white/70">
                      {b.outcomes.map((o) => (
                        <span key={o} className="inline-flex items-center gap-2">
                          <span
                            aria-hidden
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: "rgba(255,255,255,.55)" }}
                          />
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card_Core>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — CORE XR SERVICE OFFERINGS (NO "GRID OF CARDS" OPTIONS)
 * Wodh Design System v1 (XR Theme): GREEN-forward, NO violet.
 * Base background expected: #0C0722 (page-level)
 *
 * Option A — Editorial Pillars (stacked chapters, dividers)  ID: xr-core-offerings-a
 * Option B — Split Narrative + Row List (hover underline)    ID: xr-core-offerings-b
 * Option C — XR Delivery Map (timeline/pipeline)             ID: xr-core-offerings-c
 *
 * Each option is minimal, premium, and avoids repeating card grids.
 * =======================================================================================
 */

const WRAP_NOGRID = "relative mx-auto w-full max-w-6xl px-4 sm:px-6";
const PAD_NOGRID = "py-12 sm:py-16";

function SectionHeader_NoGrid({
  title,
  desc,
  align = "left",
}: {
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cx("mb-7 sm:mb-9", align === "center" && "text-center")}>
      <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
        {title}
      </h2>
      {desc ? (
        <p
          className={cx(
            "mt-3 text-sm sm:text-base leading-relaxed text-white/70",
            align === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"
          )}
        >
          {desc}
        </p>
      ) : null}

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className={cx("mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2", align === "center" && "justify-center")}>
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
        />
        <span>XR offering pillars • production delivery • adoption-first</span>
      </div>
    </div>
  );
}

function Bullet_NoGrid({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
      <span>{children}</span>
    </li>
  );
}

function SoftDivider() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />;
}

function XRGlowRail() {
  return (
    <div
      aria-hidden
      className="absolute left-0 top-0 bottom-0 w-px"
      style={{
        background: "linear-gradient(to bottom, transparent, rgba(158,243,21,.55), transparent)",
        boxShadow: "0 0 24px rgba(158,243,21,.18)",
      }}
    />
  );
}

function AccentLine_NoGrid() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

/* =======================================================================================
   OPTION A — Editorial Pillars (no cards, stacked chapters + dividers)
   ID: xr-core-offerings-a
   Find tag: [XR_CORE_OFFERINGS_OPTION_A]
======================================================================================= */

const PILLARS_A = [
  {
    title: "XR Training & Simulation",
    story:
      "Repeatable learning and safe practice — designed for comfort, assessment, and long-term content scaling.",
    bullets: [
      "Scenario design + flow mapping",
      "Assessments, scoring, completion criteria",
      "Admin reporting + learner progression",
    ],
    micro: "Best for: onboarding, safety, SOPs, high-risk workflows • Runs on: Quest / PICO",
  },
  {
    title: "Digital Twins & Spatial Ops",
    story:
      "Spatial interfaces for complex systems — layered, permissioned, and optimized for clarity and performance.",
    bullets: [
      "3D twin viewer + navigation",
      "API-driven overlays + states",
      "Role-based access + views",
    ],
    micro: "Best for: ops visibility, training + troubleshooting • Runs on: WebXR / headset modes",
  },
  {
    title: "AR Workflows (Field)",
    story:
      "Real-world guidance that teams can trust — readable UX, robust tracking, and offline-ready patterns when needed.",
    bullets: [
      "Guided procedures + checklists",
      "Anchors + annotations / 3D cues",
      "Telemetry-ready events for iteration",
    ],
    micro: "Best for: maintenance, field SOPs • Runs on: ARKit / ARCore",
  },
  {
    title: "AR Product Experience + WebXR",
    story:
      "Explain and demo products in real space, or deliver XR in the browser for maximum reach and minimal friction.",
    bullets: [
      "AR interaction + configurators",
      "WebXR builds + optimized 3D delivery",
      "Analytics events + iteration loop",
    ],
    micro: "Best for: sales enablement, retail, pilots • Runs on: ARKit/ARCore + WebXR",
  },
];

export function XR_CoreOfferings_OptionA_EditorialPillars() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-core-offerings-a" className={cx(WRAP_NOGRID, PAD_NOGRID)}>
      {/* [XR_CORE_OFFERINGS_OPTION_A] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_NoGrid
          title={
            <>
              Core XR service offerings — <span className="text-white/70">editorial pillars.</span>
            </>
          }
          desc="A clean, procurement-friendly way to understand our XR capability: four pillars, written like chapters, separated by quiet dividers."
        />

        <div className="relative">
          <XRGlowRail />

          <div className="pl-5 sm:pl-7">
            {PILLARS_A.map((p, idx) => (
              <div key={p.title} className={cx("py-6 sm:py-7", idx !== 0 && "border-t border-white/10")}>
                <div className="grid gap-4 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
                  <div className="flex flex-col gap-2">
                    <div className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-white">
                      {p.title}
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-white/70">{p.story}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="text-xs tracking-[0.22em] uppercase text-white/55">
                      What we deliver
                    </div>
                    <ul className="grid gap-2">
                      {p.bullets.map((b) => (
                        <Bullet_NoGrid key={b}>{b}</Bullet_NoGrid>
                      ))}
                    </ul>
                    <div className="mt-2 text-xs text-white/55">{p.micro}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-8 -top-10 h-40"
            style={{
              background: "radial-gradient(420px 140px at 12% 0%, rgba(158,243,21,.14), transparent 70%)",
            }}
          />
        </div>

        <div className="mt-7 text-sm text-white/70">
          <span className="text-white/85 font-medium">How it works:</span> we start with the highest-impact workflow, validate
          comfort + performance on-device, then scale scenarios and content.
        </div>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   OPTION B — Split Narrative + Row List (no cards, hover underline)
   ID: xr-core-offerings-b
   Find tag: [XR_CORE_OFFERINGS_OPTION_B]
======================================================================================= */

type Row = {
  title: string;
  desc: string;
  includes: string[];
  runsOn: string;
};

const ROWS_B: Row[] = [
  {
    title: "Training & Simulation",
    desc: "Repeatable learning systems with assessment, reporting, and content scaling.",
    includes: ["Scenario design", "Assessments + reporting", "Telemetry for iteration"],
    runsOn: "Quest • PICO",
  },
  {
    title: "Digital Twins & Spatial Ops",
    desc: "Spatial interfaces that layer operational data onto optimized 3D scenes.",
    includes: ["Twin viewer", "API overlays", "Permissions + views"],
    runsOn: "WebXR • optional headset mode",
  },
  {
    title: "AR Field Workflows",
    desc: "Guided procedures and annotations designed for real environments and readability.",
    includes: ["Checklists", "Anchors + cues", "Offline patterns (if needed)"],
    runsOn: "ARKit • ARCore",
  },
  {
    title: "AR Product + WebXR",
    desc: "Product demos, configurators, and browser XR for low-friction reach.",
    includes: ["Interactions", "Optimized 3D delivery", "Analytics events"],
    runsOn: "ARKit/ARCore • WebXR",
  },
];

function UnderlineRow({
  row,
  active,
  onHover,
}: {
  row: Row;
  active: boolean;
  onHover: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onFocus={onHover}
      className={cx(
        "w-full text-left rounded-2xl px-3 sm:px-4 py-4 transition",
        "hover:bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-white/10"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base sm:text-lg font-semibold tracking-[-0.02em] text-white">
            {row.title}
          </div>
          <div className="mt-1 text-sm text-white/70">{row.desc}</div>
        </div>
        <div className="hidden sm:block text-xs text-white/55 text-right">
          Runs on
          <div className="text-white/70">{row.runsOn}</div>
        </div>
      </div>

      <div
        aria-hidden
        className={cx("mt-4 h-[2px] w-full rounded-full transition-opacity", active ? "opacity-100" : "opacity-40")}
        style={{
          background: "linear-gradient(90deg, rgba(158,243,21,.70), rgba(158,243,21,0))",
          boxShadow: active ? "0 0 20px rgba(158,243,21,.15)" : "none",
        }}
      />
    </button>
  );
}

export function XR_CoreOfferings_OptionB_SplitNarrativeRows() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = useMemo(() => ROWS_B[active], [active]);

  return (
    <section id="xr-core-offerings-b" className={cx(WRAP_NOGRID, PAD_NOGRID)}>
      {/* [XR_CORE_OFFERINGS_OPTION_B] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_NoGrid
          title={
            <>
              Core XR service offerings — <span className="text-white/70">a clean split view.</span>
            </>
          }
          desc="Left: how we approach XR. Right: offerings as clean rows — not cards — with a subtle XR-green underline."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* Left narrative */}
          <div className="flex flex-col gap-4">
            <div className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-white">
              Built for real environments — comfort, performance, rollout.
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-white/70">
              Our XR services are delivered like product work: we define the workflow, design interaction for comfort and
              clarity, build within frame-time budgets, validate on real devices, and ship with telemetry for iteration.
            </p>

            <div className="mt-2">
              <div className="text-xs tracking-[0.22em] uppercase text-white/55">What's consistent across all pillars</div>
              <ul className="mt-2 grid gap-2">
                <Bullet_NoGrid>Device QA + performance budgeting (fps / memory)</Bullet_NoGrid>
                <Bullet_NoGrid>UX for comfort and onboarding (real users)</Bullet_NoGrid>
                <Bullet_NoGrid>Telemetry-ready events to measure adoption</Bullet_NoGrid>
              </ul>
            </div>

            <div className="mt-4 text-xs text-white/55">
              Current focus: <span className="text-white/70">{current.title}</span>
            </div>

            <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs tracking-[0.22em] uppercase text-white/55">Typical deliverables</div>
              <ul className="mt-2 grid gap-2">
                {current.includes.map((x) => (
                  <Bullet_NoGrid key={x}>{x}</Bullet_NoGrid>
                ))}
              </ul>
              <div className="mt-3 text-xs text-white/55">
                Runs on: <span className="text-white/70">{current.runsOn}</span>
              </div>
            </div>
          </div>

          {/* Right rows */}
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-2 sm:p-3">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(520px 200px at 18% 10%, rgba(158,243,21,.10), transparent 60%)",
              }}
            />
            <div className="relative grid gap-1">
              {ROWS_B.map((r, idx) => (
                <UnderlineRow key={r.title} row={r} active={idx === active} onHover={() => setActive(idx)} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   OPTION C — XR Delivery Map (timeline / pipeline-style pillars)
   ID: xr-core-offerings-c
   Find tag: [XR_CORE_OFFERINGS_OPTION_C]
======================================================================================= */

type Step = {
  step: string;
  title: string;
  story: string;
  points: string[];
};

const STEPS_C: Step[] = [
  {
    step: "01",
    title: "Discovery & Workflow Design",
    story: "Align on the real-world task, constraints, and success signals before writing code.",
    points: ["Use-case definition + scope", "Device/platform selection", "Comfort + performance targets"],
  },
  {
    step: "02",
    title: "Interaction & Spatial UX",
    story: "Design for clarity in 3D — minimize friction and reduce cognitive load.",
    points: ["UX flows + onboarding", "Spatial UI patterns", "Accessibility + clarity checks"],
  },
  {
    step: "03",
    title: "Build & Content Pipeline",
    story: "Production builds that scale: reusable systems, optimized 3D, updateable content.",
    points: ["System architecture", "3D optimization (LOD, batching)", "Content versioning pipeline"],
  },
  {
    step: "04",
    title: "Device QA & Performance",
    story: "Validate on real devices with frame-time budgets and comfort-first tuning.",
    points: ["FPS / memory budgets", "Tracking & stability checks", "Usability testing loops"],
  },
  {
    step: "05",
    title: "Deployment & Iteration",
    story: "Ship with telemetry so teams can measure adoption and continuously improve.",
    points: ["Packaging / rollout plan", "Telemetry events + analytics", "Iteration roadmap"],
  },
];

function StepNode({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-10 w-10 items-center justify-center">
      <div
        className={cx(
          "absolute inset-0 rounded-2xl border transition",
          active ? "border-white/14 bg-white/[0.03]" : "border-white/10 bg-white/[0.02]"
        )}
      />
      <div
        className="relative h-2.5 w-2.5 rounded-full"
        style={{
          background: active ? GREEN : "rgba(255,255,255,.25)",
          boxShadow: active ? "0 0 18px rgba(158,243,21,.35)" : "none",
        }}
      />
    </div>
  );
}

export function XR_CoreOfferings_OptionC_DeliveryMap() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = useMemo(() => STEPS_C[active], [active]);

  return (
    <section id="xr-core-offerings-c" className={cx(WRAP_NOGRID, PAD_NOGRID)}>
      {/* [XR_CORE_OFFERINGS_OPTION_C] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_NoGrid
          title={
            <>
              Core XR service offerings — <span className="text-white/70">delivery map.</span>
            </>
          }
          desc="A pipeline-style view of how we deliver XR work — from discovery through deployment — with XR-specific checks at each step."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          {/* Left timeline */}
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                background:
                  "radial-gradient(560px 220px at 12% 0%, rgba(158,243,21,.10), transparent 60%)",
              }}
            />
            <div className="relative">
              {STEPS_C.map((s, idx) => (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={cx(
                    "w-full text-left rounded-2xl px-3 py-3 transition",
                    "hover:bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-white/10"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <StepNode active={idx === active} />
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="text-xs tracking-[0.22em] uppercase text-white/55">{s.step}</div>
                        <div className="hidden sm:block text-xs text-white/55">Click to view</div>
                      </div>
                      <div className="mt-1 text-base font-semibold tracking-[-0.02em] text-white">
                        {s.title}
                      </div>
                      <div className="mt-1 text-sm text-white/70">{s.story}</div>
                      {idx !== STEPS_C.length - 1 ? (
                        <div className="mt-4">
                          <SoftDivider />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right detail */}
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,.35)]">
            <AccentLine_NoGrid />

            <div className="mt-3 text-xs tracking-[0.22em] uppercase text-white/55">
              Step {current.step}
            </div>
            <div className="mt-2 text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-white">
              {current.title}
            </div>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/70">{current.story}</p>

            <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="mt-4 text-xs tracking-[0.22em] uppercase text-white/55">
              What happens here
            </div>
            <ul className="mt-2 grid gap-2">
              {current.points.map((p) => (
                <Bullet_NoGrid key={p}>{p}</Bullet_NoGrid>
              ))}
            </ul>

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
              style={{
                background:
                  "radial-gradient(620px 190px at 20% 100%, rgba(158,243,21,.12), transparent 65%)",
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — SECTION 4: PLATFORMS & DEVICES (3 IDEAS)
 * Wodh Design System v1 (XR Theme): GREEN-forward, NO violet.
 * Base background expected: #0C0722 (page-level)
 *
 * Idea 1 — Device Families (Grouped List)         ID: xr-platforms-idea-1
 * Idea 2 — Compatibility Matrix (Device×Use-case) ID: xr-platforms-idea-2
 * Idea 3 — Interactive Selector (Use-case → recs) ID: xr-platforms-idea-3
 * =======================================================================================
 */

const WRAP_PLATFORMS = "relative mx-auto w-full max-w-6xl px-4 sm:px-6";
const PAD_PLATFORMS = "py-12 sm:py-16";

function SectionHeader_Platforms({
  title,
  desc,
  align = "left",
}: {
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cx("mb-7 sm:mb-9", align === "center" && "text-center")}>
      <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
        {title}
      </h2>
      {desc ? (
        <p
          className={cx(
            "mt-3 text-sm sm:text-base leading-relaxed text-white/70",
            align === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"
          )}
        >
          {desc}
        </p>
      ) : null}

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className={cx("mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2", align === "center" && "justify-center")}>
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
        />
        <span>Device selection • rollout constraints • best-fit guidance</span>
      </div>
    </div>
  );
}

function Bullet_Platforms({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
      <span>{children}</span>
    </li>
  );
}

function AccentLine_Platforms() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

function Shell_Platforms({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative rounded-2xl border border-white/10 bg-white/[0.02]",
        "shadow-[0_10px_40px_rgba(0,0,0,.25)]",
        className
      )}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
        style={{
          background: "radial-gradient(620px 190px at 20% 100%, rgba(158,243,21,.10), transparent 65%)",
        }}
      />
    </div>
  );
}

/* =======================================================================================
   IDEA 1 — Device Families (Grouped List)
   ID: xr-platforms-idea-1
   Find tag: [XR_PLATFORMS_IDEA_1]
======================================================================================= */

type Family = {
  title: string;
  subtitle: string;
  bestFor: string;
  items: string[];
  notes?: string;
};

const FAMILIES: Family[] = [
  {
    title: "VR Headsets",
    subtitle: "Room-scale training, simulation, and multi-step procedures.",
    bestFor: "Training • Simulation • Immersive SOPs",
    items: ["Meta Quest (2/3/Pro)", "PICO (4/Neo)", "HTC Vive Focus (as needed)"],
    notes: "We budget performance for comfort (frame-time first) and validate on-device.",
  },
  {
    title: "Mobile AR",
    subtitle: "Real-world guidance and product experiences on phones/tablets.",
    bestFor: "Field AR • Product AR • Sales enablement",
    items: ["iOS (ARKit)", "Android (ARCore)", "Tablets when larger UI is required"],
    notes: "Tracking quality varies by environment — lighting and surfaces matter.",
  },
  {
    title: "Mixed Reality / Spatial",
    subtitle: "Passthrough MR for hybrid workflows and spatial UI experiments.",
    bestFor: "MR overlays • Spatial ops • Pilot programs",
    items: ["Meta Quest (passthrough MR)", "Apple Vision Pro (optional, project-specific)"],
    notes: "We recommend this when the workflow benefits from seeing the real environment.",
  },
  {
    title: "WebXR",
    subtitle: "XR through the browser for low friction and broad access.",
    bestFor: "Web demos • Lightweight training • Fast pilots",
    items: ["WebXR supported browsers (Chrome/Edge)", "Desktop/mobile entry points (when XR isn't available)"],
    notes: "Best when reach matters more than maximum fidelity; ideal for rapid iteration.",
  },
];

export function XR_Platforms_Idea1_DeviceFamilies() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-platforms-idea-1" className={cx(WRAP_PLATFORMS, PAD_PLATFORMS)}>
      {/* [XR_PLATFORMS_IDEA_1] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Platforms
          title={
            <>
              Platforms & devices — <span className="text-white/70">choose the right hardware.</span>
            </>
          }
          desc="We recommend platforms based on your workflow, environment, and rollout constraints — not hype. Here's the practical landscape."
        />

        <Shell_Platforms className="overflow-hidden">
          <div className="relative p-5 sm:p-7">
            <div className="grid gap-6">
              {FAMILIES.map((f, idx) => (
                <div key={f.title} className={cx(idx !== 0 && "pt-6 border-t border-white/10")}>
                  <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-start">
                    <div className="flex flex-col gap-2">
                      <div className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-white">
                        {f.title}
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed text-white/70">{f.subtitle}</p>
                      <div className="text-xs text-white/55">
                        <span className="text-white/45">Best for: </span>
                        <span className="text-white/70">{f.bestFor}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="text-xs tracking-[0.22em] uppercase text-white/55">Common devices</div>
                      <ul className="grid gap-2">
                        {f.items.map((i) => (
                          <Bullet_Platforms key={i}>{i}</Bullet_Platforms>
                        ))}
                      </ul>
                      {f.notes ? <div className="text-xs text-white/55">{f.notes}</div> : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-10 -top-10 h-44"
              style={{
                background: "radial-gradient(520px 180px at 14% 0%, rgba(158,243,21,.12), transparent 70%)",
              }}
            />
          </div>
        </Shell_Platforms>

        <div className="mt-6 text-sm text-white/70">
          <span className="text-white/85 font-medium">Rule of thumb:</span> headsets for repetition and safety, mobile AR
          for in-the-field guidance and demos, and WebXR when reach and low friction matter most.
        </div>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   IDEA 2 — Compatibility Matrix (Device × Use-case)
   ID: xr-platforms-idea-2
   Find tag: [XR_PLATFORMS_IDEA_2]
======================================================================================= */

type UseCase = "Training" | "Simulation" | "Twins" | "Field AR" | "Product AR" | "WebXR";
const USE_CASES: UseCase[] = ["Training", "Simulation", "Twins", "Field AR", "Product AR", "WebXR"];

type MatrixRow = {
  label: string;
  note: string;
  fit: Record<UseCase, "best" | "good" | "limited" | "none">;
};

const MATRIX_PLATFORMS: MatrixRow[] = [
  {
    label: "Meta Quest / PICO (VR)",
    note: "Best for immersive training & simulation",
    fit: {
      Training: "best",
      Simulation: "best",
      Twins: "good",
      "Field AR": "none",
      "Product AR": "limited",
      WebXR: "good",
    },
  },
  {
    label: "Mobile AR (ARKit/ARCore)",
    note: "Best for real-world guidance & product demos",
    fit: {
      Training: "limited",
      Simulation: "limited",
      Twins: "limited",
      "Field AR": "best",
      "Product AR": "best",
      WebXR: "good",
    },
  },
  {
    label: "WebXR (Browser)",
    note: "Best for reach & low friction pilots",
    fit: {
      Training: "good",
      Simulation: "limited",
      Twins: "good",
      "Field AR": "limited",
      "Product AR": "good",
      WebXR: "best",
    },
  },
  {
    label: "MR / Spatial (project-specific)",
    note: "Best when real environment visibility is required",
    fit: {
      Training: "good",
      Simulation: "good",
      Twins: "good",
      "Field AR": "limited",
      "Product AR": "good",
      WebXR: "limited",
    },
  },
];

function Dot({ level }: { level: "best" | "good" | "limited" | "none" }) {
  const style =
    level === "best"
      ? { background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.35)" }
      : level === "good"
      ? { background: "rgba(158,243,21,.45)" }
      : level === "limited"
      ? { background: "rgba(255,255,255,.25)" }
      : { background: "rgba(255,255,255,.10)" };

  return (
    <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02]">
      <div className="h-2.5 w-2.5 rounded-full" style={style} />
    </div>
  );
}

export function XR_Platforms_Idea2_CompatibilityMatrix() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-platforms-idea-2" className={cx(WRAP_PLATFORMS, PAD_PLATFORMS)}>
      {/* [XR_PLATFORMS_IDEA_2] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Platforms
          title={
            <>
              Platforms & devices — <span className="text-white/70">compatibility matrix.</span>
            </>
          }
          desc="A quick best-fit view: which platforms typically work best for each XR use-case. Final choice depends on environment and rollout constraints."
        />

        <Shell_Platforms className="overflow-hidden">
          <div className="relative p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/55">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.35)" }} />
                Best
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(158,243,21,.45)" }} />
                Good
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(255,255,255,.25)" }} />
                Limited
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(255,255,255,.10)" }} />
                Not typical
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

          <div className="overflow-x-auto">
            <table className="min-w-[920px] w-full">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.22em] text-white/55">
                  <th className="px-5 sm:px-6 py-4 w-[320px]">Platform</th>
                  {USE_CASES.map((u) => (
                    <th key={u} className="px-4 py-4 text-center">
                      {u}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX_PLATFORMS.map((row, idx) => (
                  <tr key={row.label} className={cx(idx !== 0 && "border-t border-white/10")}>
                    <td className="px-5 sm:px-6 py-4">
                      <div className="text-sm font-medium text-white/85">{row.label}</div>
                      <div className="mt-1 text-xs text-white/55">{row.note}</div>
                    </td>
                    {USE_CASES.map((u) => (
                      <td key={u} className="px-4 py-4 text-center">
                        <Dot level={row.fit[u]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-5 sm:p-6 text-sm text-white/70">
            We pick the platform based on environment (space, lighting), rollout constraints (MDM, updates), and comfort/performance budgets.
          </div>
        </Shell_Platforms>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   IDEA 3 — Interactive Selector (Use-case → recommended platforms)
   ID: xr-platforms-idea-3
   Find tag: [XR_PLATFORMS_IDEA_3]
======================================================================================= */

type Key_Platforms = "training" | "simulation" | "twins" | "field" | "product" | "webxr";

const SELECTOR: Array<{
  key: Key_Platforms;
  label: string;
  headline: string;
  primary: string;
  secondary: string;
  devices: string[];
  constraints: string[];
}> = [
  {
    key: "training",
    label: "Training",
    headline: "Training works best on headsets when repetition and immersion matter most.",
    primary: "Meta Quest / PICO",
    secondary: "WebXR (pilot) / Desktop preview",
    devices: ["Meta Quest 3/Pro", "PICO 4/Neo", "Optional: Vive Focus"],
    constraints: ["Comfort & session length", "Space + guardian setup", "Content update strategy"],
  },
  {
    key: "simulation",
    label: "Simulation",
    headline: "Simulation benefits from VR headsets for depth, focus, and safe repetition.",
    primary: "Meta Quest / PICO",
    secondary: "PC VR (project-specific)",
    devices: ["Meta Quest 3/Pro", "PICO lineup", "PC VR if required"],
    constraints: ["Performance budgets (fps)", "Input method consistency", "Usability testing loops"],
  },
  {
    key: "twins",
    label: "Twins",
    headline: "Digital twins often start on WebXR, with optional headset mode for deeper immersion.",
    primary: "WebXR",
    secondary: "Headset mode (optional)",
    devices: ["WebXR browsers", "Headsets for review sessions"],
    constraints: ["Data overlays + permissions", "Scene streaming / LOD", "Connectivity expectations"],
  },
  {
    key: "field",
    label: "Field AR",
    headline: "Field workflows fit mobile AR when guidance must happen in the real world.",
    primary: "ARKit / ARCore",
    secondary: "Tablets for larger UI",
    devices: ["iOS devices", "Android devices", "iPad / tablets"],
    constraints: ["Lighting + surfaces", "Tracking stability", "Offline patterns (if needed)"],
  },
  {
    key: "product",
    label: "Product AR",
    headline: "Product AR fits mobile platforms for quick demos, configurators, and customer reach.",
    primary: "ARKit / ARCore",
    secondary: "WebXR for lightweight demos",
    devices: ["iOS + Android", "Optional: WebXR entry point"],
    constraints: ["Fast load times", "Model optimization", "Capture/share UX"],
  },
  {
    key: "webxr",
    label: "WebXR",
    headline: "WebXR is ideal when reach and low friction matter more than maximum fidelity.",
    primary: "WebXR (browser)",
    secondary: "Mobile/desktop fallbacks",
    devices: ["Chrome/Edge WebXR", "Desktop/mobile preview"],
    constraints: ["Browser compatibility", "Asset size + streaming", "Analytics events"],
  },
];

function SegTabs({
  value,
  onChange,
}: {
  value: Key_Platforms;
  onChange: (v: Key_Platforms) => void;
}) {
  return (
    <div className="inline-flex flex-wrap rounded-2xl border border-white/10 bg-white/[0.02] p-1">
      {SELECTOR.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={cx(
              "px-3 py-2 text-xs sm:text-sm rounded-xl transition",
              active ? "bg-white text-black" : "text-white/75 hover:text-white hover:bg-white/[0.06]"
            )}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export function XR_Platforms_Idea3_InteractiveSelector() {
  const reduceMotion = useReducedMotion();
  const [key, setKey] = useState<Key_Platforms>("training");
  const current = useMemo(() => SELECTOR.find((x) => x.key === key)!, [key]);

  return (
    <section id="xr-platforms-idea-3" className={cx(WRAP_PLATFORMS, PAD_PLATFORMS)}>
      {/* [XR_PLATFORMS_IDEA_3] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Platforms
          align="center"
          title={
            <>
              Platforms & devices — <span className="text-white/70">use-case selector.</span>
            </>
          }
          desc="Pick your goal and see the most practical platform recommendation, typical devices, and constraints that matter during rollout."
        />

        <div className="flex justify-center">
          <SegTabs value={key} onChange={setKey} />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
          <Shell_Platforms className="p-5 sm:p-6">
            <div className="relative">
              <AccentLine_Platforms />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <div className="mt-3 text-lg sm:text-xl font-semibold tracking-[-0.02em] text-white">
                    {current.headline}
                  </div>

                  <div className="mt-4 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                      <div className="text-xs tracking-[0.22em] uppercase text-white/55">Primary</div>
                      <div className="mt-1 text-base font-semibold text-white">{current.primary}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                      <div className="text-xs tracking-[0.22em] uppercase text-white/55">Secondary</div>
                      <div className="mt-1 text-base font-semibold text-white">{current.secondary}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Shell_Platforms>

          <Shell_Platforms className="p-5 sm:p-6">
            <div className="relative">
              <div className="text-xs tracking-[0.22em] uppercase text-white/55">Typical devices</div>
              <ul className="mt-3 grid gap-2">
                {current.devices.map((d) => (
                  <Bullet_Platforms key={d}>{d}</Bullet_Platforms>
                ))}
              </ul>

              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="mt-5 text-xs tracking-[0.22em] uppercase text-white/55">Constraints to plan for</div>
              <ul className="mt-3 grid gap-2">
                {current.constraints.map((c) => (
                  <Bullet_Platforms key={c}>{c}</Bullet_Platforms>
                ))}
              </ul>
            </div>
          </Shell_Platforms>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — PLATFORMS & DEVICES (OPTION B v2 — IMPROVED)
 * Applies:
 * ✅ 1) Subtle XR "device silhouette" backdrop (inline SVG, no assets)
 * ✅ 3) Coverage rail with glowing nodes synced to rows
 * ✅ 6) Constraints preview that updates on hover/focus (alongside deliverables)
 *
 * SECTION ID: xr-platforms-option-b
 * Find tag: [XR_PLATFORMS_OPTION_B_V2]
 * =======================================================================================
 */

const WRAP_OPTIONB_V2 = "relative mx-auto w-full max-w-6xl px-4 sm:px-6";
const PAD_OPTIONB_V2 = "py-12 sm:py-16";

function SectionHeader_OptionB_V2({
  title,
  desc,
}: {
  title: React.ReactNode;
  desc?: React.ReactNode;
}) {
  return (
    <div className="mb-7 sm:mb-9">
      <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">{desc}</p>
      ) : null}

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2">
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
        />
        <span>Platform selection • rollout constraints • best-fit guidance</span>
      </div>
    </div>
  );
}

function Bullet_OptionB_V2({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
      <span>{children}</span>
    </li>
  );
}

function AccentLine_OptionB_V2() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

type Row_OptionB_V2 = {
  title: string;
  desc: string;
  primary: string;
  secondary: string;
  devices: string[];
  deliverables: string[];
  constraints: string[];
};

const ROWS_OptionB_V2: Row_OptionB_V2[] = [
  {
    title: "VR Headsets (Training / Simulation)",
    desc: "Best when repetition, safety, and immersion are the priority — consistent performance and focus.",
    primary: "Meta Quest • PICO",
    secondary: "PC VR (project-specific)",
    devices: ["Meta Quest 3/Pro", "PICO 4/Neo", "Optional: Vive Focus"],
    deliverables: ["Scenario flows + scoring", "Admin reporting + progression", "Telemetry events for iteration"],
    constraints: ["Comfort & session length", "Space + guardian setup", "Update strategy / MDM rollout"],
  },
  {
    title: "Mobile AR (Field Workflows)",
    desc: "Best for real-world guidance — procedures, checklists, and annotations in the environment.",
    primary: "ARKit • ARCore",
    secondary: "Tablets for larger UI",
    devices: ["iOS (ARKit)", "Android (ARCore)", "iPad / tablets"],
    deliverables: ["Guided procedures + checklists", "Anchors + annotations / cues", "Offline-ready patterns (if needed)"],
    constraints: ["Lighting + surfaces affect tracking", "Device variability in the field", "Offline + sync planning (if required)"],
  },
  {
    title: "Product AR (Demos / Configurators)",
    desc: "Best for sales enablement and customer clarity — fast load, stable tracking, measurable engagement.",
    primary: "ARKit • ARCore",
    secondary: "WebXR entry point (lightweight)",
    devices: ["iOS + Android", "Optional: WebXR preview"],
    deliverables: ["Placement + interaction design", "Variant/configurator logic", "Capture/share + analytics events"],
    constraints: ["Model optimization for fast load", "Tracking stability expectations", "Attribution + analytics definitions"],
  },
  {
    title: "WebXR (Browser XR)",
    desc: "Best when reach and low friction matter most — pilots, demos, lightweight training in the browser.",
    primary: "WebXR (Chrome/Edge)",
    secondary: "Desktop/mobile fallback views",
    devices: ["WebXR browsers", "Desktop/mobile preview"],
    deliverables: ["WebXR build + deployment setup", "Optimized 3D delivery (LOD/streaming)", "Analytics + iteration loop"],
    constraints: ["Browser compatibility", "Asset size budgets", "Cross-device testing coverage"],
  },
];

function DeviceBackdrop() {
  // Inline SVG: super faint headset + phone + browser window silhouettes
  // Zero asset dependency; opacity controlled by container.
  return (
    <svg
      aria-hidden
      className="absolute right-4 top-6 h-[320px] w-[520px] opacity-[0.08] sm:opacity-[0.10]"
      viewBox="0 0 520 320"
      fill="none"
    >
      {/* Browser window */}
      <rect x="250" y="40" width="240" height="160" rx="18" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <rect x="268" y="60" width="60" height="8" rx="4" fill="rgba(255,255,255,0.35)" />
      <rect x="250" y="84" width="240" height="2" fill="rgba(255,255,255,0.18)" />

      {/* Phone */}
      <rect x="356" y="210" width="92" height="96" rx="18" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <rect x="378" y="226" width="48" height="6" rx="3" fill="rgba(255,255,255,0.28)" />
      <circle cx="402" cy="292" r="5" fill="rgba(255,255,255,0.24)" />

      {/* Headset silhouette */}
      <path
        d="M60 190c0-40 30-74 72-78l86-8c49-5 94 28 102 76l8 46c4 26-16 50-43 50H120c-33 0-60-27-60-60v-26z"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2"
      />
      <path
        d="M120 272c6 20 20 34 40 34h120c20 0 34-14 40-34"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2"
      />

      {/* XR-green edge highlight */}
      <path
        d="M82 176c2-30 26-56 58-60l98-10c40-4 76 22 84 61l7 41"
        stroke="rgba(158,243,21,0.6)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CoverageRail({
  count,
  active,
}: {
  count: number;
  active: number;
}) {
  return (
    <div aria-hidden className="absolute left-3 top-6 bottom-6 w-10">
      {/* rail line */}
      <div
        className="absolute left-5 top-2 bottom-2 w-px"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,.18), transparent)",
        }}
      />

      {/* nodes */}
      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-2">
        {Array.from({ length: count }).map((_, i) => {
          const isActive = i === active;
          return (
            <div key={i} className="flex items-center justify-center h-14">
              <div
                className="h-8 w-8 rounded-2xl border"
                style={{
                  borderColor: isActive ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.10)",
                  background: isActive ? "rgba(255,255,255,.03)" : "rgba(255,255,255,.02)",
                }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      background: isActive ? GREEN : "rgba(255,255,255,.22)",
                      boxShadow: isActive ? "0 0 18px rgba(158,243,21,.35)" : "none",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RowButton({
  row,
  active,
  onActivate,
}: {
  row: Row_OptionB_V2;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className={cx(
        "w-full text-left rounded-2xl px-4 sm:px-5 py-4 transition relative",
        "hover:bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-white/10"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base sm:text-lg font-semibold tracking-[-0.02em] text-white">
            {row.title}
          </div>
          <div className="mt-1 text-sm text-white/70">{row.desc}</div>
        </div>
        <div className="hidden md:block text-xs text-white/55 text-right">
          Primary
          <div className="text-white/70">{row.primary}</div>
        </div>
      </div>

      <div
        aria-hidden
        className={cx("mt-4 h-[2px] w-full rounded-full transition-opacity", active ? "opacity-100" : "opacity-35")}
        style={{
          background: "linear-gradient(90deg, rgba(158,243,21,.70), rgba(158,243,21,0))",
          boxShadow: active ? "0 0 22px rgba(158,243,21,.16)" : "none",
        }}
      />
    </button>
  );
}

export function XR_Platforms_OptionB_V2_SplitSignature() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = useMemo(() => ROWS_OptionB_V2[active], [active]);

  return (
    <section id="xr-platforms-option-b" className={cx(WRAP_OPTIONB_V2, PAD_OPTIONB_V2)}>
      {/* [XR_PLATFORMS_OPTION_B_V2] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_OptionB_V2
          title={
            <>
              Platforms & devices — <span className="text-white/70">recommended by use-case.</span>
            </>
          }
          desc="We recommend platforms based on workflow, environment, and rollout constraints. Hover a row to see deliverables and planning constraints."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          {/* Left narrative + live preview */}
          <div className="flex flex-col gap-4">
            <div className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-white">
              Pick platforms the way teams adopt them: comfort, constraints, rollout.
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-white/70">
              XR decisions are rarely about "best hardware." They're about environment (space, lighting), operational
              constraints (updates, device management), and the user's comfort. We help you pick a platform that will
              actually ship and stick.
            </p>

            <div className="mt-1 text-sm text-white/60">
              <span className="text-white/45">Device strip:</span>{" "}
              Quest • PICO • ARKit • ARCore • WebXR
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 relative overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "radial-gradient(520px 220px at 14% 0%, rgba(158,243,21,.10), transparent 60%)",
                }}
              />

              <div className="relative">
                <AccentLine_OptionB_V2 />

                <div className="mt-3 text-xs tracking-[0.22em] uppercase text-white/55">
                  Current focus
                </div>
                <div className="mt-2 text-lg sm:text-xl font-semibold tracking-[-0.02em] text-white">
                  {current.title}
                </div>
                <div className="mt-2 text-sm text-white/70">{current.desc}</div>

                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Deliverables preview */}
                  <div>
                    <div className="text-xs tracking-[0.22em] uppercase text-white/55">Typical deliverables</div>
                    <ul className="mt-2 grid gap-2">
                      {current.deliverables.map((x) => (
                        <Bullet_OptionB_V2 key={x}>{x}</Bullet_OptionB_V2>
                      ))}
                    </ul>
                  </div>

                  {/* Constraints preview (NEW) */}
                  <div>
                    <div className="text-xs tracking-[0.22em] uppercase text-white/55">Constraints to plan for</div>
                    <ul className="mt-2 grid gap-2">
                      {current.constraints.map((x) => (
                        <Bullet_OptionB_V2 key={x}>{x}</Bullet_OptionB_V2>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 text-xs text-white/55">
                  <span className="text-white/45">Primary:</span> <span className="text-white/70">{current.primary}</span>
                  <span className="mx-2 text-white/30">•</span>
                  <span className="text-white/45">Secondary:</span>{" "}
                  <span className="text-white/70">{current.secondary}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right list with rail + device backdrop */}
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-4 overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(640px 220px at 22% 12%, rgba(158,243,21,.08), transparent 60%)",
              }}
            />
            {/* SVG backdrop (NEW) */}
            <DeviceBackdrop />

            {/* Coverage rail (NEW) */}
            <CoverageRail count={ROWS_OptionB_V2.length} active={active} />

            <div className="relative pl-12">
              <div className="text-xs tracking-[0.22em] uppercase text-white/55 px-2 pb-3">
                Select a use-case
              </div>

              <div className="grid gap-2">
                {ROWS_OptionB_V2.map((r, idx) => (
                  <RowButton
                    key={r.title}
                    row={r}
                    active={idx === active}
                    onActivate={() => setActive(idx)}
                  />
                ))}
              </div>

              {/* tiny devices list for current */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <div className="text-xs tracking-[0.22em] uppercase text-white/55">Typical devices</div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/70">
                    {current.devices.map((d) => (
                      <span
                        key={d}
                        className="inline-flex items-center rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — TOOLS / STACK LEDGER (LOGO-FORWARD, NOT CARD-GRID)
 * XR Theme: GREEN-only (no violet)
 *
 * SECTION ID: xr-tools
 * Find tag: [XR_TOOLS_STACK_LEDGER]
 *
 * ✅ Includes: Hardware & Devices + Programming Languages + Apple Vision Pro (visionOS)
 * ✅ Uses ONLINE logos via SimpleIcons CDN where available
 * ✅ For brands not on CDN (e.g., PICO / Quest), uses clean inline SVG marks + labels
 *
 * Note: Uses <img> (not next/image) so remote logos work without Next image config.
 * =======================================================================================
 */

const WRAP_TOOLS = "relative mx-auto w-full max-w-6xl px-4 sm:px-6";
const PAD_TOOLS = "py-12 sm:py-16";

type Logo = {
  name: string;
  src?: string; // remote logo
  hint?: string; // small helper text
  kind?: "img" | "inline";
  inline?: React.ReactNode; // fallback icon
};

type Group = {
  title: string;
  purpose: string;
  items: Logo[];
};

function SectionHeader_Tools() {
  return (
    <div className="mb-7 sm:mb-9">
      <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
        Tools & stack — <span className="text-white/70">the way we ship XR.</span>
      </h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
        Tools are not the service — but they reveal how we build, validate, and deliver production XR across headsets,
        mobile AR, and <span className="text-white/85">Apple Vision Pro</span>.
      </p>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2">
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
        />
        <span>Repeatable builds • device QA • frame-time budgets • telemetry-ready</span>
      </div>
    </div>
  );
}

function AccentLine_Tools() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

function simpleIcon(slug: string) {
  // SimpleIcons CDN: monochrome white (works well on dark base)
  return `https://cdn.simpleicons.org/${slug}/ffffff`;
}

/** Minimal inline "device" marks for logos that might not exist on CDN */
function InlineMark({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden
        className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-white/12 bg-white/[0.03]"
        style={{ boxShadow: "0 0 18px rgba(158,243,21,.10)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 10c0-2.5 2-4.5 4.5-4.5h1C15 5.5 17 7.5 17 10v4c0 2.5-2 4.5-4.5 4.5h-1C9 18.5 7 16.5 7 14v-4Z"
            stroke="rgba(255,255,255,.75)"
            strokeWidth="1.6"
          />
          <path
            d="M5.5 12h-1.2c-1 0-1.8.8-1.8 1.8v.4C2.5 15.2 3.3 16 4.3 16h1.2"
            stroke="rgba(255,255,255,.35)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M18.5 12h1.2c1 0 1.8.8 1.8 1.8v.4c0 1-.8 1.8-1.8 1.8h-1.2"
            stroke="rgba(255,255,255,.35)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-xs text-white/80">{label}</span>
    </div>
  );
}

function LogoBadge({ logo }: { logo: Logo }) {
  const hasImg = logo.kind !== "inline" && !!logo.src;

  return (
    <div
      className={cx(
        "group relative inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02]",
        "px-3 py-2 transition",
        "hover:border-white/14 hover:bg-white/[0.03]"
      )}
      style={{ boxShadow: "0 10px 30px rgba(0,0,0,.18)" }}
    >
      {/* hover underline glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-3 right-3 bottom-0 h-[2px] rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, rgba(158,243,21,.70), rgba(158,243,21,0))",
          boxShadow: "0 0 18px rgba(158,243,21,.14)",
        }}
      />

      {hasImg ? (
        <img
          src={logo.src}
          alt={logo.name}
          loading="lazy"
          className="h-5 w-5 opacity-90 group-hover:opacity-100 transition-opacity"
          draggable={false}
        />
      ) : (
        <span className="opacity-95">{logo.inline}</span>
      )}

      <div className="flex flex-col leading-none">
        <span className="text-xs text-white/85">{logo.name}</span>
        {logo.hint ? <span className="mt-1 text-[11px] text-white/45">{logo.hint}</span> : null}
      </div>
    </div>
  );
}

function GroupRow({
  title,
  purpose,
  items,
}: Group) {
  return (
    <div className="relative py-6 sm:py-7 border-t border-white/10">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr] lg:items-start">
        {/* left */}
        <div className="flex flex-col gap-2">
          <AccentLine_Tools />
          <div className="mt-3 text-lg sm:text-xl font-semibold tracking-[-0.02em] text-white">
            {title}
          </div>
          <p className="text-sm leading-relaxed text-white/70">{purpose}</p>
        </div>

        {/* right: logo strip */}
        <div className="relative">
          <div className="flex flex-wrap gap-2">
            {items.map((l) => (
              <LogoBadge key={l.name} logo={l} />
            ))}
          </div>

          {/* subtle XR glow behind */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -top-8 h-32"
            style={{
              background: "radial-gradient(520px 160px at 28% 0%, rgba(158,243,21,.10), transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function XR_Tools_StackLedger() {
  const reduceMotion = useReducedMotion();

  const groups: Group[] = useMemo(
    () => [
      {
        title: "Hardware & devices",
        purpose:
          "We validate on target devices early — comfort, performance, tracking stability, and rollout constraints.",
        items: [
          { name: "Apple Vision Pro", hint: "visionOS", src: simpleIcon("apple") },
          { name: "Meta Quest", hint: "VR / MR headsets", kind: "inline", inline: <InlineMark label="Quest" /> },
          { name: "PICO", hint: "VR headsets", kind: "inline", inline: <InlineMark label="PICO" /> },
          { name: "iPhone / iPad", hint: "ARKit", src: simpleIcon("apple") },
          { name: "Android", hint: "ARCore", src: simpleIcon("android") },
          { name: "Windows / Workstations", hint: "build + profiling", src: simpleIcon("windows") },
        ],
      },
      {
        title: "Platforms & SDKs",
        purpose:
          "Platform layers we target and integrate — including OpenXR standards and Apple's spatial stack.",
        items: [
          { name: "visionOS", hint: "Spatial apps", src: simpleIcon("apple") },
          { name: "RealityKit", hint: "Vision Pro rendering", kind: "inline", inline: <InlineMark label="RK" /> },
          { name: "ARKit", hint: "iOS / visionOS AR", kind: "inline", inline: <InlineMark label="ARKit" /> },
          { name: "ARCore", hint: "Android AR", kind: "inline", inline: <InlineMark label="ARCore" /> },
          { name: "OpenXR", hint: "Cross-device XR", kind: "inline", inline: <InlineMark label="OpenXR" /> },
          { name: "WebXR", hint: "Browser XR", kind: "inline", inline: <InlineMark label="WebXR" /> },
        ],
      },
      {
        title: "Programming languages",
        purpose:
          "The practical language set behind XR delivery — engines, native stacks, web, and tooling.",
        items: [
          { name: "C#", hint: "Unity", src: simpleIcon("csharp") },
          { name: "C++", hint: "Unreal / native", src: simpleIcon("cplusplus") },
          { name: "Swift", hint: "visionOS / iOS", src: simpleIcon("swift") },
          { name: "Kotlin", hint: "Android", src: simpleIcon("kotlin") },
          { name: "TypeScript", hint: "WebXR", src: simpleIcon("typescript") },
          { name: "JavaScript", hint: "WebXR", src: simpleIcon("javascript") },
          { name: "Python", hint: "tooling/scripts", src: simpleIcon("python") },
          { name: "Shaders", hint: "HLSL/GLSL", kind: "inline", inline: <InlineMark label="FX" /> },
        ],
      },
      {
        title: "Engines & runtime",
        purpose:
          "We select engines by constraints and rollout needs — then enforce performance budgets for comfort.",
        items: [
          { name: "Unity", hint: "XR builds", src: simpleIcon("unity") },
          { name: "Unreal Engine", hint: "High-fidelity XR", src: simpleIcon("unrealengine") },
          { name: "Three.js", hint: "WebXR", src: simpleIcon("threedotjs") },
          { name: "Babylon.js", hint: "WebXR", src: simpleIcon("babylondotjs") },
        ],
      },
      {
        title: "3D & content pipeline",
        purpose:
          "Asset creation, optimization, and versioning — tuned for fast load and stable tracking.",
        items: [
          { name: "Blender", hint: "Modeling", src: simpleIcon("blender") },
          { name: "Autodesk Maya", hint: "Animation", src: simpleIcon("autodeskmaya") },
          { name: "Substance 3D", hint: "Materials", src: simpleIcon("adobesubstance3d") },
          { name: "Figma", hint: "UX flows", src: simpleIcon("figma") },
        ],
      },
      {
        title: "Performance & profiling",
        purpose:
          "Frame-time budgets, GPU/CPU hotspots, and device-level checks — before scale.",
        items: [
          { name: "RenderDoc", hint: "GPU capture", src: simpleIcon("renderdoc") },
          { name: "Xcode", hint: "Instruments", src: simpleIcon("xcode") },
          { name: "Android Studio", hint: "Profilers", src: simpleIcon("androidstudio") },
          { name: "Unity Profiler", hint: "Frame-time", kind: "inline", inline: <InlineMark label="Profiler" /> },
        ],
      },
      {
        title: "Collaboration & delivery",
        purpose:
          "Repeatable builds, clear handoffs, and predictable releases across teams.",
        items: [
          { name: "GitHub", hint: "Repo + CI", src: simpleIcon("github") },
          { name: "GitLab", hint: "Repo + CI", src: simpleIcon("gitlab") },
          { name: "Jira", hint: "Tracking", src: simpleIcon("jira") },
          { name: "Notion", hint: "Docs", src: simpleIcon("notion") },
          { name: "Slack", hint: "Comms", src: simpleIcon("slack") },
        ],
      },
      {
        title: "Analytics & telemetry",
        purpose:
          "Instrumentation is built-in so you can measure adoption and iterate based on real usage.",
        items: [
          { name: "Firebase", hint: "Events", src: simpleIcon("firebase") },
          { name: "Amplitude", hint: "Product analytics", src: simpleIcon("amplitude") },
          { name: "Sentry", hint: "Crash reporting", src: simpleIcon("sentry") },
          { name: "Custom events", hint: "Schema-led", kind: "inline", inline: <InlineMark label="Events" /> },
        ],
      },
    ],
    []
  );

  return (
    <section id="xr-tools" className={cx(WRAP_TOOLS, PAD_TOOLS)}>
      {/* [XR_TOOLS_STACK_LEDGER] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Tools />

        <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
          {/* subtle background wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(780px 320px at 12% 0%, rgba(158,243,21,.10), transparent 60%)",
            }}
          />
          <div className="relative p-5 sm:p-7">
            {/* first group without top border */}
            <div className="pb-6 sm:pb-7">
              <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr] lg:items-start">
                <div className="flex flex-col gap-2">
                  <AccentLine_Tools />
                  <div className="mt-3 text-lg sm:text-xl font-semibold tracking-[-0.02em] text-white">
                    {groups[0].title}
                  </div>
                  <p className="text-sm leading-relaxed text-white/70">{groups[0].purpose}</p>
                </div>
                <div className="relative">
                  <div className="flex flex-wrap gap-2">
                    {groups[0].items.map((l) => (
                      <LogoBadge key={l.name} logo={l} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* rest */}
            {groups.slice(1).map((g) => (
              <GroupRow key={g.title} {...g} />
            ))}
          </div>
        </div>

        {/* Guarantees strip */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full"
                style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.35)" }}
              />
              Frame-time budgets enforced
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-white/35" />
              Device QA checklist
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-white/35" />
              Telemetry events included
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden className="h-2 w-2 rounded-full bg-white/35" />
              Repeatable build pipeline
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — TOOLS / STACK LEDGER (V2 — SIGNATURE, LOGO-FORWARD)
 * XR Theme: GREEN-only (no violet)
 *
 * SECTION ID: xr-tools
 * Find tag: [XR_TOOLS_STACK_LEDGER_V2]
 *
 * Fixes applied vs v1:
 * ✅ Stronger hierarchy + less "dashboard/spec-sheet" vibe
 * ✅ Apple Vision Pro is a FEATURED spotlight row (not just another badge)
 * ✅ Real logos where available (SimpleIcons CDN) + distinct inline marks where not
 * ✅ Badge noise reduced via Tier A (primary) + Tier B (expand "More")
 * ✅ Adds Wodh-style XR depth (watermark + corner glow), without turning into card grids
 * ✅ Removes redundant repeated messaging (single guarantees strip only)
 *
 * Note: Uses <img> (not next/image) so remote logos work without Next config.
 * =======================================================================================
 */

const WRAP_TOOLS_V2 = "relative mx-auto w-full max-w-6xl px-4 sm:px-6";
const PAD_TOOLS_V2 = "py-12 sm:py-16";

function simpleIcon_V2(slug: string) {
  // SimpleIcons CDN: monochrome white (great on dark).
  // Example: https://cdn.simpleicons.org/unity/ffffff
  return `https://cdn.simpleicons.org/${slug}/ffffff`;
}

/* ----------------------------- Small primitives ----------------------------- */

function SectionHeader_V2() {
  return (
    <div className="mb-7 sm:mb-9">
      <h2 className="text-balance text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white">
        Tools & stack — <span className="text-white/70">how we ship XR.</span>
      </h2>
      <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-white/70">
        Not a logo wall — a delivery stack. We choose the right platform per workflow, then ship with device QA,
        performance budgets, and telemetry to measure adoption.
      </p>

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2">
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
        />
        <span>Production builds • device QA • frame-time budgets • instrumentation</span>
      </div>
    </div>
  );
}

function AccentLine_Tools_V2() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

function InlineMark_V2({
  label,
  icon = "chip",
}: {
  label: string;
  icon?: "headset" | "chip" | "cube" | "globe" | "code";
}) {
  const glyph =
    icon === "headset" ? (
      <path
        d="M7 10c0-2.5 2-4.5 4.5-4.5h1C15 5.5 17 7.5 17 10v4c0 2.5-2 4.5-4.5 4.5h-1C9 18.5 7 16.5 7 14v-4Z"
        stroke="rgba(255,255,255,.78)"
        strokeWidth="1.6"
      />
    ) : icon === "cube" ? (
      <>
        <path d="M12 2 20 6.5 12 11 4 6.5 12 2Z" stroke="rgba(255,255,255,.78)" strokeWidth="1.6" />
        <path d="M20 6.5V17.5L12 22V11" stroke="rgba(255,255,255,.40)" strokeWidth="1.6" />
        <path d="M4 6.5V17.5L12 22" stroke="rgba(255,255,255,.40)" strokeWidth="1.6" />
      </>
    ) : icon === "globe" ? (
      <>
        <path
          d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
          stroke="rgba(255,255,255,.78)"
          strokeWidth="1.6"
        />
        <path d="M3 12h18" stroke="rgba(255,255,255,.35)" strokeWidth="1.6" />
        <path d="M12 3c3 3 3 15 0 18" stroke="rgba(255,255,255,.35)" strokeWidth="1.6" />
      </>
    ) : icon === "code" ? (
      <>
        <path d="M9 8 5 12l4 4" stroke="rgba(255,255,255,.78)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M15 8l4 4-4 4" stroke="rgba(255,255,255,.78)" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ) : (
      <>
        <path
          d="M9 3h6v3h3v6h-3v3H9v-3H6V6h3V3Z"
          stroke="rgba(255,255,255,.78)"
          strokeWidth="1.6"
        />
        <path d="M9 21h6" stroke="rgba(255,255,255,.35)" strokeWidth="1.6" strokeLinecap="round" />
      </>
    );

  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-white/12 bg-white/[0.03]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          {glyph}
        </svg>
      </span>
      <span className="text-xs text-white/85">{label}</span>
    </div>
  );
}

type LogoItem_V2 = {
  name: string;
  hint?: string;
  src?: string;
  kind?: "img" | "inline";
  inline?: React.ReactNode;
};

function LogoBadge_V2({ item }: { item: LogoItem_V2 }) {
  const hasImg = item.kind !== "inline" && !!item.src;

  return (
    <div
      className={cx(
        "group relative inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02]",
        "px-3 py-2 transition",
        "hover:border-white/14 hover:bg-white/[0.03]"
      )}
      style={{ boxShadow: "0 10px 30px rgba(0,0,0,.18)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-3 right-3 bottom-0 h-[2px] rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, rgba(158,243,21,.70), rgba(158,243,21,0))",
          boxShadow: "0 0 18px rgba(158,243,21,.14)",
        }}
      />

      {hasImg ? (
        <img
          src={item.src}
          alt={item.name}
          loading="lazy"
          className="h-5 w-5 opacity-90 group-hover:opacity-100 transition-opacity"
          draggable={false}
        />
      ) : (
        <span className="opacity-95">{item.inline}</span>
      )}

      <div className="flex flex-col leading-none">
        <span className="text-xs text-white/90">{item.name}</span>
        {item.hint ? <span className="mt-1 text-[11px] text-white/45">{item.hint}</span> : null}
      </div>
    </div>
  );
}

function MoreToggle({
  open,
  onClick,
  count,
}: {
  open: boolean;
  onClick: () => void;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs transition",
        "border-white/10 bg-white/[0.02] text-white/70 hover:text-white hover:border-white/14 hover:bg-white/[0.03]"
      )}
    >
      <span
        aria-hidden
        className="h-2 w-2 rounded-full"
        style={{ background: open ? GREEN : "rgba(255,255,255,.35)", boxShadow: open ? "0 0 14px rgba(158,243,21,.28)" : "none" }}
      />
      {open ? "Hide" : `More (${count})`}
    </button>
  );
}

/* ----------------------------- Spotlight: Vision Pro ----------------------------- */

function VisionProSpotlight() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
      {/* XR depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(158,243,21,.18), transparent 60%)",
          filter: "blur(6px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(158,243,21,.10), transparent 62%)",
          filter: "blur(10px)",
        }}
      />

      {/* watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-3 select-none text-[64px] sm:text-[84px] font-semibold tracking-[-0.06em]"
        style={{
          color: "rgba(255,255,255,.04)",
          WebkitTextStroke: "1px rgba(255,255,255,.06)",
        }}
      >
        visionOS
      </div>

      <div className="relative grid gap-5 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
        <div className="flex flex-col gap-3">
          <AccentLine_Tools_V2 />
          <div className="mt-3">
            <div className="text-xs tracking-[0.24em] uppercase text-white/55">Featured</div>
            <div className="mt-2 text-2xl sm:text-3xl font-semibold tracking-[-0.04em] text-white">
              Apple Vision Pro
            </div>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/70">
              Spatial experiences for training, visualization, and high-trust demos — built with platform-native constraints in mind
              (comfort, performance, interaction clarity).
            </p>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <LogoBadge_V2 item={{ name: "Apple", hint: "Hardware", src: simpleIcon_V2("apple") }} />
            <LogoBadge_V2 item={{ name: "visionOS", hint: "Platform", kind: "inline", inline: <InlineMark_V2 label="visionOS" icon="chip" /> }} />
            <LogoBadge_V2 item={{ name: "RealityKit", hint: "Rendering", kind: "inline", inline: <InlineMark_V2 label="RealityKit" icon="cube" /> }} />
            <LogoBadge_V2 item={{ name: "ARKit", hint: "Spatial APIs", kind: "inline", inline: <InlineMark_V2 label="ARKit" icon="globe" /> }} />
            <LogoBadge_V2 item={{ name: "Swift", hint: "Language", src: simpleIcon_V2("swift") }} />
          </div>

          <div className="mt-3 text-xs text-white/55">
            Best for: <span className="text-white/70">spatial training • product visualization • executive demos</span>
          </div>
        </div>

        {/* right: subtle device silhouette */}
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(520px 220px at 24% 10%, rgba(158,243,21,.10), transparent 60%)",
            }}
          />
          <div className="relative">
            <div className="text-xs tracking-[0.22em] uppercase text-white/55">Typical delivery</div>
            <ul className="mt-3 grid gap-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
                Interaction design tuned for gaze + hands
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
                Performance budgets validated on-device
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
                Instrumentation for adoption and iteration
              </li>
            </ul>

            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="mt-5 flex items-center gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.03]"
                style={{ boxShadow: "0 0 18px rgba(158,243,21,.12)" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6.8 11.2c.2-2.7 2.3-4.9 5-5.2l4.4-.5c3.2-.4 6.1 1.8 6.7 5l.6 3.3c.3 1.9-1.1 3.6-3 3.6H8.9c-2.1 0-3.8-1.7-3.8-3.8v-2.4Z"
                    stroke="rgba(255,255,255,.75)"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M9 18.2c.5 1.5 1.7 2.6 3.5 2.6h2.9c1.8 0 3-1.1 3.5-2.6"
                    stroke="rgba(158,243,21,.55)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <div className="text-xs text-white/55">
                We treat Vision Pro as a{" "}
                <span className="text-white/70">first-class platform</span>, not an afterthought.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Ledger rows (tiered) ----------------------------- */

type Group_V2 = {
  title: string;
  purpose: string;
  primary: LogoItem_V2[];
  more?: LogoItem_V2[];
};

function GroupRow_Tools_V2({
  group,
  open,
  onToggle,
}: {
  group: Group_V2;
  open: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const moreCount = group.more?.length ?? 0;

  return (
    <div className="py-6 sm:py-7 border-t border-white/10">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr] lg:items-start">
        <div className="flex flex-col gap-2">
          <div className="text-lg sm:text-xl font-semibold tracking-[-0.02em] text-white">{group.title}</div>
          <p className="text-sm leading-relaxed text-white/70">{group.purpose}</p>
        </div>

        <div className="relative">
          <div className="flex flex-wrap gap-2">
            {group.primary.map((it) => (
              <LogoBadge_V2 key={it.name} item={it} />
            ))}
            {moreCount > 0 ? <MoreToggle open={open} onClick={onToggle} count={moreCount} /> : null}
          </div>

          <AnimatePresence initial={false}>
            {open && moreCount > 0 ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                  <div className="text-xs tracking-[0.22em] uppercase text-white/55 px-1 pb-2">
                    Additional tools
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.more!.map((it) => (
                      <LogoBadge_V2 key={it.name} item={it} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 -top-8 h-28"
            style={{
              background: "radial-gradient(520px 160px at 28% 0%, rgba(158,243,21,.08), transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Main component ----------------------------- */

export function XR_Tools_StackLedger_V2() {
  const reduceMotion = useReducedMotion();

  const groups: Group_V2[] = useMemo(
    () => [
      {
        title: "Hardware & devices",
        purpose: "We validate on target devices early — comfort, performance, tracking stability, and rollout constraints.",
        primary: [
          { name: "Meta Quest", hint: "VR/MR headsets", kind: "inline", inline: <InlineMark_V2 label="Quest" icon="headset" /> },
          { name: "PICO", hint: "VR headsets", kind: "inline", inline: <InlineMark_V2 label="PICO" icon="headset" /> },
          { name: "iPhone / iPad", hint: "Mobile AR", src: simpleIcon_V2("apple") },
          { name: "Android", hint: "Mobile AR", src: simpleIcon_V2("android") },
        ],
        more: [
          { name: "Windows", hint: "Workstations", src: simpleIcon_V2("windows") },
          { name: "MDM / rollout", hint: "project-specific", kind: "inline", inline: <InlineMark_V2 label="Rollout" icon="chip" /> },
        ],
      },
      {
        title: "Platforms & SDKs",
        purpose: "Platform layers we target and integrate — including OpenXR standards and browser XR.",
        primary: [
          { name: "OpenXR", hint: "Cross-device XR", kind: "inline", inline: <InlineMark_V2 label="OpenXR" icon="globe" /> },
          { name: "Meta XR SDK", hint: "Quest stack", kind: "inline", inline: <InlineMark_V2 label="Meta XR" icon="chip" /> },
          { name: "ARCore", hint: "Android AR", kind: "inline", inline: <InlineMark_V2 label="ARCore" icon="globe" /> },
          { name: "WebXR", hint: "Browser XR", kind: "inline", inline: <InlineMark_V2 label="WebXR" icon="globe" /> },
        ],
        more: [
          { name: "AR Foundation", hint: "Unity AR", kind: "inline", inline: <InlineMark_V2 label="ARF" icon="chip" /> },
          { name: "XR Interaction", hint: "patterns", kind: "inline", inline: <InlineMark_V2 label="XR UX" icon="chip" /> },
        ],
      },
      {
        title: "Programming languages",
        purpose: "Practical language set behind XR delivery — engines, native stacks, web, and tooling.",
        primary: [
          { name: "C#", hint: "Unity", src: simpleIcon_V2("csharp") },
          { name: "Swift", hint: "visionOS/iOS", src: simpleIcon_V2("swift") },
          { name: "TypeScript", hint: "WebXR", src: simpleIcon_V2("typescript") },
          { name: "Kotlin", hint: "Android", src: simpleIcon_V2("kotlin") },
        ],
        more: [
          { name: "C++", hint: "Unreal/native", src: simpleIcon_V2("cplusplus") },
          { name: "JavaScript", hint: "WebXR", src: simpleIcon_V2("javascript") },
          { name: "Python", hint: "tooling", src: simpleIcon_V2("python") },
          { name: "Shaders", hint: "HLSL/GLSL", kind: "inline", inline: <InlineMark_V2 label="FX" icon="code" /> },
        ],
      },
      {
        title: "Engines & runtime",
        purpose: "We select engines by constraints and rollout needs — then enforce performance budgets for comfort.",
        primary: [
          { name: "Unity", hint: "XR builds", src: simpleIcon_V2("unity") },
          { name: "Unreal Engine", hint: "High-fidelity", src: simpleIcon_V2("unrealengine") },
          { name: "Three.js", hint: "WebXR", src: simpleIcon_V2("threedotjs") },
          { name: "Babylon.js", hint: "WebXR", src: simpleIcon_V2("babylondotjs") },
        ],
      },
      {
        title: "3D & content pipeline",
        purpose: "Asset creation, optimization, and versioning — tuned for fast load and stable tracking.",
        primary: [
          { name: "Blender", hint: "Modeling", src: simpleIcon_V2("blender") },
          { name: "Autodesk Maya", hint: "Animation", src: simpleIcon_V2("autodeskmaya") },
          { name: "Substance 3D", hint: "Materials", src: simpleIcon_V2("adobesubstance3d") },
          { name: "Figma", hint: "UX flows", src: simpleIcon_V2("figma") },
        ],
      },
      {
        title: "Performance & profiling",
        purpose: "Frame-time budgets, GPU/CPU hotspots, and device-level checks — before scale.",
        primary: [
          { name: "RenderDoc", hint: "GPU capture", src: simpleIcon_V2("renderdoc") },
          { name: "Xcode", hint: "Instruments", src: simpleIcon_V2("xcode") },
          { name: "Android Studio", hint: "Profilers", src: simpleIcon_V2("androidstudio") },
          { name: "Unity Profiler", hint: "Frame-time", kind: "inline", inline: <InlineMark_V2 label="Profiler" icon="chip" /> },
        ],
      },
      {
        title: "Collaboration, delivery & telemetry",
        purpose: "Repeatable builds, clear handoffs, and instrumentation so you can iterate based on real usage.",
        primary: [
          { name: "GitHub", hint: "Repo + CI", src: simpleIcon_V2("github") },
          { name: "GitLab", hint: "Repo + CI", src: simpleIcon_V2("gitlab") },
          { name: "Jira", hint: "Tracking", src: simpleIcon_V2("jira") },
          { name: "Firebase", hint: "Events", src: simpleIcon_V2("firebase") },
        ],
        more: [
          { name: "Amplitude", hint: "Analytics", src: simpleIcon_V2("amplitude") },
          { name: "Sentry", hint: "Crashes", src: simpleIcon_V2("sentry") },
          { name: "Notion", hint: "Docs", src: simpleIcon_V2("notion") },
          { name: "Slack", hint: "Comms", src: simpleIcon_V2("slack") },
          { name: "Custom events", hint: "schema-led", kind: "inline", inline: <InlineMark_V2 label="Events" icon="code" /> },
        ],
      },
    ],
    []
  );

  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section id="xr-tools" className={cx(WRAP_TOOLS_V2, PAD_TOOLS_V2)}>
      {/* [XR_TOOLS_STACK_LEDGER_V2] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_V2 />

        <div className="relative">
          {/* Wodh-ish watermark behind the whole section */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-8 right-0 select-none text-[88px] sm:text-[120px] font-semibold tracking-[-0.07em]"
            style={{
              color: "rgba(255,255,255,.03)",
              WebkitTextStroke: "1px rgba(255,255,255,.05)",
            }}
          >
            XR STACK
          </div>

          {/* Featured block */}
          <VisionProSpotlight />

          {/* Ledger body */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
            {/* subtle corner glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(158,243,21,.10), transparent 62%)",
                filter: "blur(10px)",
              }}
            />
            <div className="relative p-6 sm:p-7">
              {groups.map((g) => {
                const key = g.title;
                const open = openKey === key;
                return (
                  <GroupRow_Tools_V2
                    key={key}
                    group={g}
                    open={open}
                    onToggle={() => setOpenKey(open ? null : key)}
                  />
                );
              })}
            </div>
          </div>

          {/* Single guarantees strip (no repetition) */}
          <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.35)" }}
                />
                Frame-time budgets enforced
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-2 w-2 rounded-full bg-white/35" />
                Device QA checklist
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-2 w-2 rounded-full bg-white/35" />
                Telemetry events included
              </span>
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-2 w-2 rounded-full bg-white/35" />
                Repeatable build pipeline
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — SECTION 6: INTEGRATION CAPABILITY (3 IDEAS)
 * XR Theme: GREEN-only (no violet)
 *
 * Idea 1 — Integration Ledger (systems we plug into)      ID: xr-integration-idea-1
 * Idea 2 — Integration Map (XR in center + nodes)         ID: xr-integration-idea-2
 * Idea 3 — Integration Guarantees (objection remover)     ID: xr-integration-idea-3
 *
 * =======================================================================================
 */

const WRAP_INTEGRATION = "relative mx-auto w-full max-w-6xl px-4 sm:px-6";
const PAD_INTEGRATION = "py-12 sm:py-16";

function SectionHeader_Integration({
  title,
  desc,
  align = "left",
}: {
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cx("mb-7 sm:mb-9", align === "center" && "text-center")}>
      <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
        {title}
      </h2>
      {desc ? (
        <p
          className={cx(
            "mt-3 text-sm sm:text-base leading-relaxed text-white/70",
            align === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"
          )}
        >
          {desc}
        </p>
      ) : null}

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className={cx("mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2", align === "center" && "justify-center")}>
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
        />
        <span>API-first • enterprise-ready • rollout constraints</span>
      </div>
    </div>
  );
}

function AccentLine_Integration() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

function Bullet_Integration({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
      <span>{children}</span>
    </li>
  );
}

function Shell_Integration({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative rounded-2xl border border-white/10 bg-white/[0.02]",
        "shadow-[0_10px_40px_rgba(0,0,0,.25)] overflow-hidden",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(780px 320px at 12% 0%, rgba(158,243,21,.10), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* =======================================================================================
   IDEA 1 — Integration Ledger (Systems we plug into)
   ID: xr-integration-idea-1
   Find tag: [XR_INTEGRATION_IDEA_1]
======================================================================================= */

type LedgerRow = {
  title: string;
  what: string;
  connects: string[];
  outputs: string[];
  note?: string;
};

const LEDGER: LedgerRow[] = [
  {
    title: "Identity & Access",
    what: "SSO-ready login, role-based access, and permissioned content views.",
    connects: ["SAML / OAuth", "RBAC roles", "Device enrollment (when required)"],
    outputs: ["User sessions", "Role-scoped content", "Audit-friendly access patterns"],
    note: "We align auth with your security posture and rollout constraints.",
  },
  {
    title: "LMS & Training",
    what: "Training systems that report completion, scores, and progression reliably.",
    connects: ["SCORM / xAPI (when required)", "Completion criteria", "Reporting exports"],
    outputs: ["Completion + time-on-task", "Assessment scores", "Cohort reporting"],
    note: "Best for onboarding, compliance, and repeatable simulations.",
  },
  {
    title: "Data & APIs",
    what: "API-first integration to your systems of record — predictable, testable, documented.",
    connects: ["REST / GraphQL", "Webhooks", "Realtime feeds (project-specific)"],
    outputs: ["Sync status", "Operational data overlays", "Event streams"],
  },
  {
    title: "Ops Systems",
    what: "Connect XR workflows to operations tools so usage turns into action.",
    connects: ["ERP/CRM touchpoints", "Ticketing systems", "Asset systems"],
    outputs: ["Task creation", "Incident links", "Asset updates"],
    note: "Useful for field AR and workflow-driven training.",
  },
  {
    title: "Content & Admin",
    what: "Admin portals / CMS-like workflows to manage scenarios, modules, and versions.",
    connects: ["Content versioning", "Permissions", "Release staging"],
    outputs: ["Publish/unpublish controls", "Version history", "Environment separation"],
  },
  {
    title: "Analytics & Telemetry",
    what: "Instrumentation so you can measure adoption and iterate with evidence.",
    connects: ["Event schema", "Dashboards", "Export + retention controls"],
    outputs: ["Usage funnels", "Drop-off points", "Feature performance"],
    note: "Telemetry is optional but recommended for continuous improvement.",
  },
];

export function XR_Integration_Idea1_Ledger() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-integration-idea-1" className={cx(WRAP_INTEGRATION, PAD_INTEGRATION)}>
      {/* [XR_INTEGRATION_IDEA_1] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Integration
          title={
            <>
              Integration capability — <span className="text-white/70">a practical ledger.</span>
            </>
          }
          desc="We integrate XR into your existing stack so usage becomes measurable and operational — not isolated demos."
        />

        <Shell_Integration>
          <div className="p-5 sm:p-7">
            {LEDGER.map((r, idx) => (
              <div key={r.title} className={cx(idx !== 0 && "pt-6 mt-6 border-t border-white/10")}>
                <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                  <div className="flex flex-col gap-2">
                    <AccentLine_Integration />
                    <div className="mt-3 text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-white">
                      {r.title}
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-white/70">{r.what}</p>
                    {r.note ? <div className="text-xs text-white/55">{r.note}</div> : null}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="text-xs tracking-[0.22em] uppercase text-white/55">Connects to</div>
                      <ul className="mt-2 grid gap-2">
                        {r.connects.map((c) => (
                          <Bullet_Integration key={c}>{c}</Bullet_Integration>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs tracking-[0.22em] uppercase text-white/55">Outputs</div>
                      <ul className="mt-2 grid gap-2">
                        {r.outputs.map((o) => (
                          <Bullet_Integration key={o}>{o}</Bullet_Integration>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-7 text-sm text-white/70">
              <span className="text-white/85 font-medium">Integration approach:</span> we define events + data contracts
              early, then build stable connectors and validate against staging environments.
            </div>
          </div>
        </Shell_Integration>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   IDEA 2 — Integration Map (XR in center + nodes)
   ID: xr-integration-idea-2
   Find tag: [XR_INTEGRATION_IDEA_2]
======================================================================================= */

type NodeKey = "sso" | "lms" | "cms" | "iot" | "analytics" | "admin";

const NODES: Array<{
  key: NodeKey;
  title: string;
  subtitle: string;
  bullets: string[];
}> = [
  {
    key: "sso",
    title: "SSO + Roles",
    subtitle: "Identity that matches your org.",
    bullets: ["SAML/OAuth patterns", "RBAC permissions", "Audit-friendly access"],
  },
  {
    key: "lms",
    title: "LMS / Training",
    subtitle: "Completion, scoring, reporting.",
    bullets: ["SCORM/xAPI (when required)", "Progress tracking", "Cohort reporting"],
  },
  {
    key: "cms",
    title: "Content / CMS",
    subtitle: "Manage modules and versions.",
    bullets: ["Publish/unpublish", "Version history", "Staged releases"],
  },
  {
    key: "iot",
    title: "Data feeds / Twins",
    subtitle: "Operational overlays.",
    bullets: ["API overlays", "Realtime feeds (optional)", "Permissioned views"],
  },
  {
    key: "analytics",
    title: "Analytics",
    subtitle: "Measure adoption.",
    bullets: ["Event schema", "Dashboards", "Exports + retention"],
  },
  {
    key: "admin",
    title: "Admin Portal",
    subtitle: "Control rollout & access.",
    bullets: ["Environment separation", "Device rollout controls", "Ops visibility"],
  },
];

function NodeIcon({ active }: { active: boolean }) {
  return (
    <div
      className="h-9 w-9 rounded-2xl border flex items-center justify-center"
      style={{
        borderColor: active ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.10)",
        background: active ? "rgba(255,255,255,.03)" : "rgba(255,255,255,.02)",
      }}
    >
      <div
        className="h-2.5 w-2.5 rounded-full"
        style={{
          background: active ? GREEN : "rgba(255,255,255,.22)",
          boxShadow: active ? "0 0 18px rgba(158,243,21,.35)" : "none",
        }}
      />
    </div>
  );
}

function MapPanel({ node }: { node: (typeof NODES)[number] }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(680px 260px at 20% 10%, rgba(158,243,21,.12), transparent 60%)",
        }}
      />
      <div className="relative">
        <AccentLine_Integration />
        <div className="mt-3 text-xs tracking-[0.22em] uppercase text-white/55">Selected</div>
        <div className="mt-2 text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-white">
          {node.title}
        </div>
        <div className="mt-2 text-sm text-white/70">{node.subtitle}</div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-4 text-xs tracking-[0.22em] uppercase text-white/55">What we implement</div>
        <ul className="mt-2 grid gap-2">
          {node.bullets.map((b) => (
            <Bullet_Integration key={b}>{b}</Bullet_Integration>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function XR_Integration_Idea2_Map() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<NodeKey>("sso");
  const node = useMemo(() => NODES.find((n) => n.key === active)!, [active]);

  return (
    <section id="xr-integration-idea-2" className={cx(WRAP_INTEGRATION, PAD_INTEGRATION)}>
      {/* [XR_INTEGRATION_IDEA_2] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Integration
          align="center"
          title={
            <>
              Integration capability — <span className="text-white/70">a system map.</span>
            </>
          }
          desc="Your XR experience sits inside your stack. This map shows the common integration nodes — click to explore what we implement."
        />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
          {/* Map */}
          <Shell_Integration className="p-6 sm:p-7">
            <div className="relative">
              {/* center */}
              <div className="mx-auto w-full max-w-md">
                <div className="relative flex items-center justify-center py-10">
                  <div
                    className="absolute inset-0"
                    aria-hidden
                    style={{
                      background:
                        "radial-gradient(380px 220px at 50% 50%, rgba(158,243,21,.12), transparent 65%)",
                    }}
                  />
                  <div className="relative">
                    <div
                      className="h-24 w-24 rounded-3xl border border-white/14 bg-white/[0.03] flex items-center justify-center"
                      style={{ boxShadow: "0 0 30px rgba(158,243,21,.12)" }}
                    >
                      <div className="text-center">
                        <div className="text-xs tracking-[0.22em] uppercase text-white/55">Core</div>
                        <div className="mt-1 text-base font-semibold tracking-[-0.02em] text-white">
                          XR Experience
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nodes list (clean, not a ring-drawing circus) */}
                <div className="grid gap-2">
                  {NODES.map((n) => {
                    const isActive = n.key === active;
                    return (
                      <button
                        key={n.key}
                        type="button"
                        onClick={() => setActive(n.key)}
                        className={cx(
                          "w-full rounded-2xl border px-4 py-3 text-left transition",
                          "hover:bg-white/[0.03] focus:outline-none focus:ring-2 focus:ring-white/10",
                          isActive ? "border-white/14 bg-white/[0.03]" : "border-white/10 bg-white/[0.02]"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <NodeIcon active={isActive} />
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-white">{n.title}</div>
                            <div className="mt-1 text-xs text-white/55">{n.subtitle}</div>
                          </div>
                          <div className="text-xs text-white/45">View</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Shell_Integration>

          {/* Details panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={node.key}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <MapPanel node={node} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   IDEA 3 — Integration Guarantees (Objection remover)
   ID: xr-integration-idea-3
   Find tag: [XR_INTEGRATION_IDEA_3]
======================================================================================= */

type Guarantee = {
  title: string;
  story: string;
  checks: string[];
};

const GUARANTEES: Guarantee[] = [
  {
    title: "Security & access",
    story: "Auth, permissions, and audit-ready patterns aligned with enterprise expectations.",
    checks: ["SSO-ready patterns (SAML/OAuth)", "Role-based permissions (RBAC)", "Access and action logging (project-specific)"],
  },
  {
    title: "Deployment & rollout",
    story: "Shipping is part of the scope: environments, staged releases, and device constraints.",
    checks: ["Staging + production separation", "Release staging and rollback patterns", "Offline mode decisions early (if needed)"],
  },
  {
    title: "Data & interoperability",
    story: "Your XR system is API-first — stable contracts and documented integrations.",
    checks: ["REST/GraphQL integrations", "Webhooks + event streams", "Data validation + error handling"],
  },
  {
    title: "Telemetry & iteration",
    story: "Measure adoption and improve with evidence, not guesswork.",
    checks: ["Event schema defined early", "Dashboards or exports", "Retention controls + privacy considerations"],
  },
  {
    title: "Governance & maintainability",
    story: "Builds that remain testable and maintainable across versions and teams.",
    checks: ["Versioning strategy", "Documentation and handoff", "Testability + QA checklists"],
  },
];

function Check_Integration({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span
        aria-hidden
        className="mt-1.5 h-2 w-2 rounded-full"
        style={{ background: GREEN, boxShadow: "0 0 14px rgba(158,243,21,.22)" }}
      />
      <span>{children}</span>
    </li>
  );
}

export function XR_Integration_Idea3_Guarantees() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-integration-idea-3" className={cx(WRAP_INTEGRATION, PAD_INTEGRATION)}>
      {/* [XR_INTEGRATION_IDEA_3] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Integration
          title={
            <>
              Integration capability — <span className="text-white/70">what we guarantee.</span>
            </>
          }
          desc="This section is built to remove objections. It reads like an implementation checklist — because that's how we ship."
        />

        <Shell_Integration>
          <div className="p-5 sm:p-7">
            <div className="grid gap-6 lg:grid-cols-2">
              {GUARANTEES.map((g) => (
                <div key={g.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <AccentLine_Integration />
                  <div className="mt-3 text-lg font-semibold tracking-[-0.02em] text-white">{g.title}</div>
                  <div className="mt-2 text-sm text-white/70">{g.story}</div>
                  <ul className="mt-4 grid gap-2">
                    {g.checks.map((c) => (
                      <Check_Integration key={c}>{c}</Check_Integration>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-7 text-sm text-white/70">
              <span className="text-white/85 font-medium">Default posture:</span> we keep integrations API-first, document
              data contracts, and validate against staging environments before rollout.
            </div>
          </div>
        </Shell_Integration>
      </motion.div>
    </section>
  );
}

/**
 * =======================================================================================
 * WODH — XR DEVELOPMENT — INTEGRATION CAPABILITY (PATTERN VARIANTS)
 * XR Theme: GREEN-only (no violet)
 *
 * Option A — Integration Hub Diagram (signature)      ID: xr-integration-opt-a
 * Option B — Before / After Story (narrative)          ID: xr-integration-opt-b
 * Option C — Implementation Guarantees (editorial)     ID: xr-integration-opt-c
 *
 * Find tags:
 *  - [XR_INTEGRATION_OPT_A]
 *  - [XR_INTEGRATION_OPT_B]
 *  - [XR_INTEGRATION_OPT_C]
 * =======================================================================================
 */

const WRAP_INTEGRATION_OPT = "relative mx-auto w-full max-w-6xl px-4 sm:px-6";
const PAD_INTEGRATION_OPT = "py-12 sm:py-16";

function SectionHeader_Opt({
  title,
  desc,
  align = "left",
}: {
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cx("mb-7 sm:mb-9", align === "center" && "text-center")}>
      <h2 className="text-balance text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
        {title}
      </h2>
      {desc ? (
        <p
          className={cx(
            "mt-3 text-sm sm:text-base leading-relaxed text-white/70",
            align === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"
          )}
        >
          {desc}
        </p>
      ) : null}

      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className={cx("mt-4 text-xs sm:text-sm text-white/55 flex items-center gap-2", align === "center" && "justify-center")}>
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: GREEN, boxShadow: "0 0 16px rgba(158,243,21,.42)" }}
        />
        <span>API-first • enterprise-ready • measurable outcomes</span>
      </div>
    </div>
  );
}

function Bullet_Opt({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/55" />
      <span>{children}</span>
    </li>
  );
}

function Check_Opt({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm text-white/70">
      <span
        aria-hidden
        className="mt-1.5 h-2 w-2 rounded-full"
        style={{ background: GREEN, boxShadow: "0 0 14px rgba(158,243,21,.22)" }}
      />
      <span>{children}</span>
    </li>
  );
}

function AccentLine_Opt() {
  return (
    <div
      aria-hidden
      className="h-[2px] w-full rounded-full"
      style={{ background: "linear-gradient(90deg, rgba(158,243,21,.62), rgba(158,243,21,0))" }}
    />
  );
}

/* =======================================================================================
   OPTION A — Integration Hub Diagram (signature)
   ID: xr-integration-opt-a
   Find tag: [XR_INTEGRATION_OPT_A]
======================================================================================= */

type HubKey = "sso" | "lms" | "cms" | "ops" | "twins" | "analytics";

const HUB_NODES: Array<{
  key: HubKey;
  title: string;
  subtitle: string;
  bullets: string[];
}> = [
  {
    key: "sso",
    title: "SSO + Roles",
    subtitle: "Identity aligned to your org.",
    bullets: ["SAML/OAuth patterns", "RBAC permissions", "Audit-friendly access"],
  },
  {
    key: "lms",
    title: "LMS / Training",
    subtitle: "Completion, scoring, reporting.",
    bullets: ["SCORM/xAPI (when required)", "Progress + assessments", "Cohort reporting"],
  },
  {
    key: "cms",
    title: "Content / CMS",
    subtitle: "Modules, versions, staging.",
    bullets: ["Publish/unpublish", "Version history", "Staged releases"],
  },
  {
    key: "ops",
    title: "Ops Systems",
    subtitle: "Workflows that trigger actions.",
    bullets: ["ERP/CRM touchpoints", "Ticketing/asset links", "Operational handoff"],
  },
  {
    key: "twins",
    title: "Data / Twins",
    subtitle: "Overlays and realtime feeds.",
    bullets: ["REST/GraphQL overlays", "Realtime feeds (optional)", "Permissioned views"],
  },
  {
    key: "analytics",
    title: "Analytics",
    subtitle: "Measure adoption + iterate.",
    bullets: ["Event schema", "Dashboards/exports", "Retention controls"],
  },
];

function HubDiagram({
  active,
  onActive,
}: {
  active: HubKey;
  onActive: (k: HubKey) => void;
}) {
  const reduceMotion = useReducedMotion();

  // Positions are percentage-based so it stays responsive
  const pos: Record<HubKey, { x: number; y: number }> = {
    sso: { x: 18, y: 26 },
    lms: { x: 78, y: 22 },
    cms: { x: 84, y: 58 },
    ops: { x: 62, y: 84 },
    twins: { x: 22, y: 78 },
    analytics: { x: 50, y: 12 },
  };

  const nodes = HUB_NODES.map((n) => ({ ...n, ...pos[n.key] }));

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
      {/* Signature depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(158,243,21,.16), transparent 62%)", filter: "blur(10px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -right-28 h-80 w-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(158,243,21,.10), transparent 62%)", filter: "blur(12px)" }}
      />

      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-2 select-none text-[72px] sm:text-[96px] font-semibold tracking-[-0.07em]"
        style={{ color: "rgba(255,255,255,.03)", WebkitTextStroke: "1px rgba(255,255,255,.05)" }}
      >
        INTEGRATIONS
      </div>

      <div className="relative">
        <div className="text-xs tracking-[0.24em] uppercase text-white/55">Integration hub</div>
        <div className="mt-2 text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-white">
          XR Experience connects to your stack.
        </div>
        <div className="mt-2 text-sm text-white/70">
          Hover or click a node to see what we implement. This is designed to look like a system, not a list.
        </div>

        {/* Diagram stage */}
        <div className="mt-6 relative h-[360px] sm:h-[420px] rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(520px 320px at 50% 50%, rgba(158,243,21,.10), transparent 70%)" }}
          />

          {/* Connector lines (SVG) */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {/* lines from center to nodes */}
            {nodes.map((n) => (
              <line
                key={n.key}
                x1={50}
                y1={50}
                x2={n.x}
                y2={n.y}
                stroke={n.key === active ? "rgba(158,243,21,.55)" : "rgba(255,255,255,.18)"}
                strokeWidth="0.5"
              />
            ))}
            {/* subtle ring */}
            <circle cx="50" cy="50" r="28" fill="none" stroke="rgba(255,255,255,.10)" strokeWidth="0.6" />
            <circle cx="50" cy="50" r="16" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="0.6" />
          </svg>

          {/* Center node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="h-28 w-28 rounded-3xl border border-white/14 bg-white/[0.03] flex items-center justify-center text-center"
              style={{ boxShadow: "0 0 34px rgba(158,243,21,.12)" }}
            >
              <div>
                <div className="text-[11px] tracking-[0.22em] uppercase text-white/55">Core</div>
                <div className="mt-1 text-sm font-semibold text-white">XR</div>
                <div className="text-sm font-semibold text-white">Experience</div>
              </div>
            </div>
          </div>

          {/* Nodes */}
          {nodes.map((n) => {
            const isActive = n.key === active;
            return (
              <button
                key={n.key}
                type="button"
                onMouseEnter={() => onActive(n.key)}
                onFocus={() => onActive(n.key)}
                onClick={() => onActive(n.key)}
                className={cx(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-left transition",
                  "focus:outline-none focus:ring-2 focus:ring-white/10",
                  isActive ? "border-white/16 bg-white/[0.04]" : "border-white/10 bg-white/[0.02] hover:bg-white/[0.03]"
                )}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      background: isActive ? GREEN : "rgba(255,255,255,.22)",
                      boxShadow: isActive ? "0 0 18px rgba(158,243,21,.35)" : "none",
                    }}
                  />
                  <span className="text-xs font-semibold text-white/90">{n.title}</span>
                </div>
                <div className="mt-1 text-[11px] text-white/55">{n.subtitle}</div>
              </button>
            );
          })}

          {/* animated glow pulse at center */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
            animate={
              reduceMotion
                ? {}
                : {
                    opacity: [0.12, 0.22, 0.12],
                    scale: [1, 1.06, 1],
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
            }
            style={{
              background: "radial-gradient(circle, rgba(158,243,21,.22), transparent 60%)",
              filter: "blur(14px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function HubDetail({ node }: { node: (typeof HUB_NODES)[number] }) {
  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(680px 280px at 20% 10%, rgba(158,243,21,.12), transparent 60%)" }}
      />
      <div className="relative">
        <AccentLine_Opt />
        <div className="mt-3 text-xs tracking-[0.24em] uppercase text-white/55">Selected node</div>
        <div className="mt-2 text-2xl sm:text-3xl font-semibold tracking-[-0.04em] text-white">
          {node.title}
        </div>
        <div className="mt-2 text-sm sm:text-base text-white/70">{node.subtitle}</div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-5 text-xs tracking-[0.22em] uppercase text-white/55">What we implement</div>
        <ul className="mt-3 grid gap-2">
          {node.bullets.map((b) => (
            <Bullet_Opt key={b}>{b}</Bullet_Opt>
          ))}
        </ul>

        <div className="mt-6 text-xs text-white/55">
          <span className="text-white/45">Default posture:</span> define data contracts + event schema early, validate
          against staging, then rollout with monitoring.
        </div>
      </div>
    </div>
  );
}

export function XR_Integration_OptionA_HubDiagram() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<HubKey>("sso");
  const node = useMemo(() => HUB_NODES.find((n) => n.key === active)!, [active]);

  return (
    <section id="xr-integration-opt-a" className={cx(WRAP_INTEGRATION_OPT, PAD_INTEGRATION_OPT)}>
      {/* [XR_INTEGRATION_OPT_A] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Opt
          title={
            <>
              Integration capability — <span className="text-white/70">system hub.</span>
            </>
          }
          desc="XR should plug into your stack: identity, training, content, ops, and analytics. This view explains the system in one glance."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
          <HubDiagram active={active} onActive={setActive} />
          <AnimatePresence mode="wait">
            <motion.div
              key={node.key}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <HubDetail node={node} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   OPTION B — Before / After Story (narrative)
   ID: xr-integration-opt-b
   Find tag: [XR_INTEGRATION_OPT_B]
======================================================================================= */

function MiniFlow() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(720px 260px at 18% 10%, rgba(158,243,21,.10), transparent 62%)" }}
      />
      <div className="relative">
        <div className="text-xs tracking-[0.24em] uppercase text-white/55">Data flow (example)</div>
        <div className="mt-2 text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-white">
          XR usage becomes action — not screenshots.
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] items-center">
          {[
            { t: "XR Session", s: "events + progress" },
            { t: "API Layer", s: "contracts + validation" },
            { t: "Your Systems", s: "LMS / Ops / Analytics" },
          ].map((b, i) => (
            <React.Fragment key={b.t}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-sm font-semibold text-white">{b.t}</div>
                <div className="mt-1 text-xs text-white/55">{b.s}</div>
              </div>
              {i < 2 ? (
                <div className="hidden sm:flex items-center justify-center px-1">
                  <div className="h-[2px] w-10 rounded-full bg-white/10" />
                  <div
                    className="ml-2 h-2 w-2 rounded-full"
                    style={{ background: GREEN, boxShadow: "0 0 14px rgba(158,243,21,.22)" }}
                  />
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-5 text-xs text-white/55">
          We implement stable data contracts first, then connect identity, training records, and operational systems.
        </div>
      </div>
    </div>
  );
}

function SplitStory({
  label,
  title,
  points,
  tone,
}: {
  label: string;
  title: string;
  points: string[];
  tone: "bad" | "good";
}) {
  return (
    <div
      className={cx(
        "relative rounded-3xl border p-6 sm:p-7 overflow-hidden",
        tone === "bad" ? "border-white/10 bg-white/[0.02]" : "border-white/12 bg-white/[0.03]"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            tone === "good"
              ? "radial-gradient(720px 260px at 18% 10%, rgba(158,243,21,.12), transparent 62%)"
              : "radial-gradient(720px 260px at 18% 10%, rgba(255,255,255,.06), transparent 62%)",
        }}
      />
      <div className="relative">
        <div className="text-xs tracking-[0.24em] uppercase text-white/55">{label}</div>
        <div className="mt-2 text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-white">{title}</div>
        <ul className="mt-4 grid gap-2">
          {points.map((p) =>
            tone === "good" ? (
              <Check_Opt key={p}>{p}</Check_Opt>
            ) : (
              <li key={p} className="flex items-start gap-2 text-sm text-white/70">
                <span aria-hidden className="mt-1.5 h-2 w-2 rounded-full bg-white/20" />
                <span>{p}</span>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export function XR_Integration_OptionB_BeforeAfterStory() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-integration-opt-b" className={cx(WRAP_INTEGRATION_OPT, PAD_INTEGRATION_OPT)}>
      {/* [XR_INTEGRATION_OPT_B] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Opt
          align="center"
          title={
            <>
              Integration capability — <span className="text-white/70">before vs after.</span>
            </>
          }
          desc="This layout reads like a story: what an isolated XR demo looks like — and what changes when it's integrated."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <SplitStory
            label="Before"
            title="An isolated demo"
            tone="bad"
            points={[
              "No identity alignment (manual logins, no roles)",
              "No training record linkage (completion is anecdotal)",
              "No operational handoff (insights don't become action)",
              "No telemetry (iteration is guesswork)",
            ]}
          />
          <SplitStory
            label="After"
            title="A connected XR system"
            tone="good"
            points={[
              "SSO + roles match your org structure",
              "Training outcomes flow to LMS/reporting",
              "Ops workflows trigger tickets / updates",
              "Telemetry enables continuous improvement",
            ]}
          />
        </div>

        <div className="mt-6">
          <MiniFlow />
        </div>
      </motion.div>
    </section>
  );
}

/* =======================================================================================
   OPTION C — Implementation Guarantees (editorial, no "box ledger" feel)
   ID: xr-integration-opt-c
   Find tag: [XR_INTEGRATION_OPT_C]
======================================================================================= */

type Guarantee_Opt = {
  title: string;
  desc: string;
  checks: string[];
};

const GUARANTEES_OPT: Guarantee_Opt[] = [
  {
    title: "Security & access",
    desc: "Auth, permissions, and audit-ready patterns aligned with enterprise expectations.",
    checks: ["SSO-ready patterns (SAML/OAuth)", "Role-based permissions (RBAC)", "Access/action logging (project-specific)"],
  },
  {
    title: "Deployment & rollout",
    desc: "Shipping is part of the scope: environments, staged releases, and device constraints.",
    checks: ["Staging + production separation", "Release staging and rollback patterns", "Offline mode decisions early (if needed)"],
  },
  {
    title: "Data & interoperability",
    desc: "API-first integration: stable contracts and documented connectors.",
    checks: ["REST/GraphQL integrations", "Webhooks + event streams", "Data validation + error handling"],
  },
  {
    title: "Telemetry & iteration",
    desc: "Measure adoption and iterate with evidence.",
    checks: ["Event schema defined early", "Dashboards or exports", "Retention controls + privacy considerations"],
  },
  {
    title: "Governance & maintainability",
    desc: "Builds that remain testable and maintainable across versions and teams.",
    checks: ["Versioning strategy", "Documentation and handoff", "QA checklists + testability posture"],
  },
];

function EditorialGuarantee({
  g,
  index,
}: {
  g: Guarantee_Opt;
  index: number;
}) {
  return (
    <div className="py-6 sm:py-7 border-t border-white/10">
      <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr] lg:items-start">
        <div className="flex flex-col gap-2">
          <div className="text-xs tracking-[0.24em] uppercase text-white/45">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-white">{g.title}</div>
          <div className="text-sm text-white/70 leading-relaxed">{g.desc}</div>
        </div>
        <ul className="grid gap-2">
          {g.checks.map((c) => (
            <Check_Opt key={c}>{c}</Check_Opt>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function XR_Integration_OptionC_ImplementationGuarantees() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="xr-integration-opt-c" className={cx(WRAP_INTEGRATION_OPT, PAD_INTEGRATION_OPT)}>
      {/* [XR_INTEGRATION_OPT_C] */}
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.21, 1, 0.21, 1] }}
      >
        <SectionHeader_Opt
          title={
            <>
              Integration capability — <span className="text-white/70">implementation guarantees.</span>
            </>
          }
          desc="An editorial checklist that reads like delivery. Minimal layout, maximum confidence."
        />

        <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(158,243,21,.12), transparent 62%)", filter: "blur(12px)" }}
          />
          <div className="relative p-6 sm:p-7">
            <AccentLine_Opt />
            <div className="mt-3 text-sm text-white/70 max-w-2xl">
              We don't "integrate later." We define contracts early, validate in staging, and ship with monitoring.
            </div>

            <div className="mt-6">
              {GUARANTEES_OPT.map((g, idx) => (
                <EditorialGuarantee key={g.title} g={g} index={idx} />
              ))}
            </div>

            <div className="mt-7 text-xs text-white/55">
              <span className="text-white/45">Note:</span> specific standards (SCORM/xAPI, SSO method, MDM) depend on your environment and requirements.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

