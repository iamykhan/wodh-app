"use client";

import React, { useMemo, useState } from "react";

/**
 * WODH Contact — Merged Page (Refined + Canonical v1 rhythm)
 * Order:
 * 1) Hero — Neon Command Center
 * 2) Key Stats + Trust + Marquee
 * 3) Story — Quote + Signature Paragraph (moved under Key Stats)
 * 4) Project Inquiry — Step-based (Neon Command Center v2)
 * 5) Presence — Full-bleed map + big flag pills
 * 6) FAQ — Command Palette
 * 7) CTA — Final Nudge Banner
 *
 * Notes:
 * ✅ Removed non-standard Tailwind spacing (e.g., py-18) to avoid layout issues
 * ✅ Standardized section rhythm: py-16 sm:py-20, shared container
 * ✅ Unified max width + horizontal padding everywhere
 */

export default function WodhContact_Merged() {
  return (
    <div className="min-h-screen bg-[#0C0722] text-white">
      <GlobalBackdrop />
      <main className="relative">
        <Hero_NeonCommandCenter />
        <KeyStatsTrust_Final />
        <ContactStory_QuoteSignatureParagraph />
        <ProjectInquiry_Steps />
        <Presence_FullBleed_BigPills />
        <FAQ_CommandPalette />
        <CTA_FinalNudge />
      </main>
    </div>
  );
}

/* --------------------------------- Shared -------------------------------- */

const ACCENT_GREEN = "#9EF315";
const ACCENT_VIOLET = "#7C3AED";

function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto max-w-6xl px-6 sm:px-10 ${className}`}>{children}</div>;
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-16 sm:py-20 ${className}`}>
      {children}
    </section>
  );
}

function BlendText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,rgba(158,243,21,1),rgba(167,139,250,1))]">
      {children}
    </span>
  );
}

function Pill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full bg-white/[0.04] px-3 py-1 text-xs text-white/70 ring-1 ring-white/10 " +
        className
      }
    >
      {children}
    </span>
  );
}

function Tag({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "green" | "violet" | "neutral";
}) {
  const cls =
    tone === "green"
      ? "text-[#9EF315] ring-[#9EF315]/20 bg-[#9EF315]/10"
      : tone === "violet"
      ? "text-[#A78BFA] ring-[#7C3AED]/25 bg-[#7C3AED]/12"
      : "text-white/70 ring-white/10 bg-white/[0.04]";
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs ring-1 ${cls}`}>{children}</span>;
}

function TrustChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/[0.04] px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
      {children}
    </span>
  );
}

function ButtonPrimary({
  children,
  href,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const cls =
    "group relative inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-[#0C0722] " +
    className;

  const inner = (
    <>
      <span className="absolute inset-0 rounded-2xl bg-[#9EF315] shadow-[0_0_0_1px_rgba(158,243,21,0.25),0_16px_60px_rgba(158,243,21,0.18)] transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="absolute inset-0 rounded-2xl opacity-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(255,255,255,0.55),transparent_60%)] transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative">{children}</span>
    </>
  );

  if (href) return <a className={cls} href={href}>{inner}</a>;
  return (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}

function ButtonGhost({
  children,
  href,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const cls =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-white/80 ring-1 ring-white/12 bg-white/[0.03] backdrop-blur transition hover:bg-white/[0.05] hover:text-white " +
    className;

  if (href) return <a className={cls} href={href}>{children}</a>;
  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

function Button({
  children,
  variant = "primary",
  href,
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold tracking-[-0.01em] transition-transform duration-200 active:scale-[0.98]";
  const primary =
    "bg-white text-[#0C0722] hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_12px_36px_rgba(0,0,0,0.35)]";
  const secondary =
    "bg-white/[0.06] text-white/85 ring-1 ring-white/10 hover:bg-white/[0.08] hover:-translate-y-0.5";
  const cls = `${base} ${variant === "primary" ? primary : secondary}`;
  if (href) return <a className={cls} href={href}>{children}</a>;
  return (
    <button className={cls} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

function scrollToInquiry() {
  if (typeof window === "undefined") return;
  const el = document.querySelector("#project-inquiry");
  if (el && "scrollIntoView" in el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ------------------------------- 1) HERO --------------------------------- */

function Hero_NeonCommandCenter() {
  return (
    <section className="relative overflow-hidden bg-[#0C0722] text-white">
      <HeroBackdrop />
      <Container className="relative pt-14 pb-16 sm:pt-16 sm:pb-20">
        <HeroParticles />

        <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr]">
          {/* LEFT */}
          <div className="relative">
            <div className="flex flex-wrap gap-2">
              <Tag tone="neutral">Contact</Tag>
              <Tag tone="neutral">Response in 24–48h</Tag>
              <Tag tone="green">XR ↔ Games</Tag>
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em]">
              Let’s build your{" "}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,rgba(158,243,21,1),rgba(167,139,250,1),rgba(158,243,21,1))]">
                  next reality
                </span>
                <span className="pointer-events-none absolute -inset-x-2 -inset-y-2 -z-10 rounded-2xl bg-[#9EF315]/10 blur-xl" />
              </span>
              .
            </h1>

            <p className="mt-4 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
              Share a short brief — we’ll map the fastest path from concept to launch, across XR products and playable worlds.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <MiniStudioCard
                title="XR Studio"
                subtitle="Building Spatial Realities"
                bullets={["Vision Pro / Meta", "AR / VR", "Metaverse systems"]}
                accent="green"
              />
              <MiniStudioCard
                title="Games Studio"
                subtitle="Creating Playable Universes"
                bullets={["Unreal / Unity", "Multiplayer", "Live ops + tooling"]}
                accent="violet"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonPrimary onClick={scrollToInquiry}>Start a Project Inquiry</ButtonPrimary>
              <ButtonGhost href="mailto:hello@wodh.io">Email Us</ButtonGhost>
            </div>
          </div>

          {/* RIGHT — Mini Intake */}
          <GlassCard className="group">
            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold">Project Intake</div>
                  <div className="mt-1 text-xs text-white/60">Enough to start. We’ll follow up with next steps.</div>
                </div>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] text-white/70 ring-1 ring-white/10 bg-white/[0.04]">
                  Secure · Private
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <Field label="Name" placeholder="Your name" />
                <Field label="Email" placeholder="you@company.com" />
                <Field label="What are we building?" placeholder="XR app, game, demo, prototype…" />
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="text-[11px] text-white/55">By sending, you agree to a quick follow-up.</div>
                <button className="group relative inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white">
                  <span className="absolute inset-0 rounded-2xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur transition group-hover:bg-white/[0.08]" />
                  <span className="relative flex items-center gap-2">
                    Send
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#9EF315] shadow-[0_0_24px_rgba(158,243,21,0.45)]" />
                  </span>
                </button>
              </div>

              <div className="pointer-events-none mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70" />
              <div className="pointer-events-none mt-2 h-1 w-full rounded-full bg-[linear-gradient(90deg,transparent,rgba(158,243,21,0.45),rgba(124,58,237,0.45),transparent)] blur-[2px] opacity-70 animate-[shimmer_3.2s_ease-in-out_infinite]" />
            </div>
          </GlassCard>
        </div>
      </Container>

      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-18%); opacity: .35; } 50% { transform: translateX(18%); opacity: .8; } 100% { transform: translateX(-18%); opacity: .35; } }
      `}</style>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_650px_at_20%_10%,rgba(20,15,60,0.95),transparent_60%),radial-gradient(1000px_650px_at_80%_0%,rgba(15,10,40,0.92),transparent_55%),radial-gradient(1100px_700px_at_50%_115%,rgba(20,15,70,0.90),transparent_60%)]" />
      <div className="absolute -top-28 left-1/2 h-64 w-[720px] -translate-x-1/2 rounded-full bg-[#9EF315]/16 blur-3xl" />
      <div className="absolute -bottom-32 left-1/2 h-72 w-[820px] -translate-x-1/2 rounded-full bg-[#7C3AED]/16 blur-3xl" />
      <div className="absolute inset-0 opacity-[0.22] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cfilter id=%22n%22 x=%220%22 y=%220%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%2260%22 height=%2260%22 filter=%22url(%23n)%22 opacity=%220.45%22/%3E%3C/svg%3E')]" />
    </div>
  );
}

function HeroParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-16 left-8 h-44 w-44 rounded-full bg-[#9EF315]/10 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute top-10 right-16 h-32 w-32 rounded-full bg-[#9EF315]/8 blur-3xl animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute -bottom-20 right-10 h-52 w-52 rounded-full bg-[#7C3AED]/12 blur-3xl animate-[float_9s_ease-in-out_infinite]" />
      <div className="absolute bottom-10 left-16 h-36 w-36 rounded-full bg-[#7C3AED]/10 blur-3xl animate-[float_11s_ease-in-out_infinite]" />
      <style>{`
        @keyframes float { 0% { transform: translate3d(0,0,0) scale(1); opacity: .85; } 50% { transform: translate3d(0,-10px,0) scale(1.03); opacity: 1; } 100% { transform: translate3d(0,0,0) scale(1); opacity: .85; } }
      `}</style>
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={"relative rounded-3xl bg-white/[0.05] ring-1 ring-white/10 backdrop-blur overflow-hidden " + className}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_240px_at_20%_10%,rgba(158,243,21,0.10),transparent_55%),radial-gradient(520px_240px_at_80%_120%,rgba(124,58,237,0.12),transparent_55%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <div className="text-[11px] font-semibold text-white/70">{label}</div>
      <input
        placeholder={placeholder}
        className="mt-1 w-full rounded-2xl bg-white/[0.03] px-4 py-3 text-sm text-white/90 placeholder:text-white/35 ring-1 ring-white/10 outline-none transition focus:bg-white/[0.05] focus:ring-white/20"
      />
    </label>
  );
}

function MiniStudioCard({
  title,
  subtitle,
  bullets,
  accent,
}: {
  title: string;
  subtitle: string;
  bullets: string[];
  accent: "green" | "violet";
}) {
  const dot = accent === "green" ? ACCENT_GREEN : ACCENT_VIOLET;
  const glow = accent === "green" ? "rgba(158,243,21,0.20)" : "rgba(124,58,237,0.20)";
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white/[0.035] ring-1 ring-white/10 p-5 backdrop-blur transition hover:bg-white/[0.05]">
      <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl" style={{ background: glow }} />
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold text-white/80">{title}</div>
        <span className="inline-flex items-center gap-2 text-[11px] text-white/55">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot, boxShadow: `0 0 24px ${glow}` }} />
          Active lane
        </span>
      </div>
      <div className="mt-2 text-sm font-semibold">{subtitle}</div>
      <ul className="mt-3 space-y-1 text-xs text-white/60">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white/35" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------- 2) Key Stats + Trust + Marquee --------------------- */

function KeyStatsTrust_Final() {
  const logos = ["Unity", "Unreal", "Meta", "Apple Vision Pro", "WebXR", "Steam", "PlayStation", "Xbox", "Oculus", "ARKit", "ARCore", "OpenXR"];

  return (
    <Section>
      <Container>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="text-sm font-semibold tracking-wide text-white/85">Key stats + trust</div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">
              Proof at a glance for <BlendText>XR ↔ Games</BlendText>
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-white/65">
              A unified delivery team with two studio strengths — spatial experiences and playable systems.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill>Response: 24–48h</Pill>
            <Pill className="text-[#9EF315] ring-[#9EF315]/25">XR lane</Pill>
            <Pill className="text-[#A78BFA] ring-[#7C3AED]/25">Games lane</Pill>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[28px] bg-white/[0.03] ring-1 ring-white/10 backdrop-blur">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-0 h-64 w-[520px] rounded-full bg-[#9EF315]/14 blur-3xl" />
            <div className="absolute -bottom-28 right-0 h-72 w-[560px] rounded-full bg-[#7C3AED]/14 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(1100px_520px_at_35%_-10%,rgba(158,243,21,0.10),transparent_60%),radial-gradient(950px_520px_at_70%_115%,rgba(124,58,237,0.10),transparent_60%)]" />
          </div>

          <div className="relative p-6 sm:p-8">
            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <FeatureStatCardBlended
                kicker="Key stat"
                value="8+ Years"
                title="Production-grade delivery"
                desc="XR experiences + games built with a system mindset — pipelines, tooling, QA, and launch support."
                chips={["XR", "Games", "Systems"]}
              />
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <SmallStatCard label="Avg response" value="24–48h" note="Fast follow-up + next steps" lane="xr" />
                  <SmallStatCard label="Team" value="80+ engineers" note="Cross-discipline pods" lane="games" />
                  <SmallStatCard label="Projects shipped" value="800+ (all brands)" note="Delivery at scale" lane="xr" />
                  <SmallStatCard label="Timezone coverage" value="PK · UAE · EU" note="Async-friendly workflow" lane="games" />
                </div>
                <TrustStrip title="Trusted stack (preview)" items={logos.slice(0, 8)} />
              </div>
            </div>

            <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-white/14 to-transparent" />
            <div className="mt-7">
              <OneTeamTwoStudios />
            </div>
            <div className="mt-6">
              <MarqueeLogos title="Companies & platforms we’ve worked with (sample)" items={logos} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FeatureStatCardBlended({
  kicker,
  value,
  title,
  desc,
  chips,
}: {
  kicker: string;
  value: string;
  title: string;
  desc: string;
  chips: string[];
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10 p-6 sm:p-7">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#9EF315]/16 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-[#7C3AED]/16 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(650px_260px_at_40%_0%,rgba(158,243,21,0.10),transparent_60%),radial-gradient(650px_260px_at_60%_120%,rgba(124,58,237,0.12),transparent_60%)]" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="text-xs font-semibold text-white/70">{kicker}</div>
          <div className="flex flex-wrap gap-2">{chips.map((c) => <TagBlend key={c}>{c}</TagBlend>)}</div>
        </div>
        <div className="mt-5">
          <div className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] bg-clip-text text-transparent bg-[linear-gradient(90deg,rgba(158,243,21,1),rgba(167,139,250,1),rgba(255,255,255,0.92))]">
            {value}
          </div>
          <div className="mt-2 text-lg font-semibold">{title}</div>
          <div className="mt-2 text-sm text-white/65 leading-relaxed">{desc}</div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <ButtonPrimary onClick={scrollToInquiry}>Start Inquiry</ButtonPrimary>
          <ButtonGhost href="#work">See Work</ButtonGhost>
        </div>
      </div>
    </div>
  );
}

function SmallStatCard({
  label,
  value,
  note,
  lane,
}: {
  label: string;
  value: string;
  note: string;
  lane: "xr" | "games";
}) {
  const isXR = lane === "xr";
  const dot = isXR ? ACCENT_GREEN : ACCENT_VIOLET;
  const glow = isXR ? "rgba(158,243,21,0.22)" : "rgba(124,58,237,0.22)";
  return (
    <div className="rounded-3xl bg-white/[0.035] ring-1 ring-white/10 p-5 backdrop-blur transition hover:bg-white/[0.05]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold text-white/65">{label}</div>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot, boxShadow: `0 0 24px ${glow}` }} />
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-[-0.02em]">{value}</div>
      <div className="mt-2 text-xs text-white/55">{note}</div>
    </div>
  );
}

function TrustStrip({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-white/[0.03] ring-1 ring-white/10 p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold text-white/70">{title}</div>
        <div className="text-[11px] text-white/55">monochrome chips</div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((l) => (
          <span key={l} className="inline-flex items-center rounded-full bg-white/[0.03] px-3 py-1 text-xs text-white/65 ring-1 ring-white/10">
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function OneTeamTwoStudios() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/[0.035] ring-1 ring-white/10 p-5 sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(680px_240px_at_30%_0%,rgba(158,243,21,0.10),transparent_60%),radial-gradient(680px_240px_at_70%_120%,rgba(124,58,237,0.12),transparent_60%)]" />
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-lg font-semibold tracking-[-0.01em]">
            One team. <BlendText>Two studios</BlendText>.
          </div>
          <div className="mt-1 text-sm text-white/65">
            We’ll help you choose the lane — or blend XR + gameplay into one cohesive experience.
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Tag tone="green">XR + Interaction</Tag>
          <Tag tone="violet">Gameplay + Systems</Tag>
          <Tag tone="neutral">Production pipeline</Tag>
        </div>
      </div>
    </div>
  );
}

function MarqueeLogos({ title, items }: { title: string; items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="rounded-3xl bg-white/[0.03] ring-1 ring-white/10 p-5 overflow-hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold text-white/70">{title}</div>
        <div className="text-[11px] text-white/55">smooth scroll</div>
      </div>
      <div className="relative mt-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-[linear-gradient(to_right,rgba(12,7,34,1),transparent)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-[linear-gradient(to_left,rgba(12,7,34,1),transparent)]" />
        <div className="group relative overflow-hidden">
          <div className="flex w-max gap-2 animate-[marquee_22s_linear_infinite] group-hover:[animation-play-state:paused]">
            {loop.map((l, idx) => (
              <span key={`${l}-${idx}`} className="inline-flex items-center rounded-full bg-white/[0.03] px-3 py-1 text-xs text-white/65 ring-1 ring-white/10">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function TagBlend({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs ring-1 ring-white/10 bg-white/[0.04]">
      <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,rgba(158,243,21,1),rgba(167,139,250,1))] font-semibold">
        {children}
      </span>
    </span>
  );
}

/* -------------------- 3) Story — Quote + Signature (Moved) ---------------- */

function ContactStory_QuoteSignatureParagraph() {
  return (
    <Section>
      <Container>
        <div className="text-sm text-white/60">Our approach</div>

        <div className="mt-4 relative overflow-hidden rounded-[28px] bg-white/[0.03] ring-1 ring-white/10 backdrop-blur">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#9EF315]/10 blur-3xl" />
            <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-[#7C3AED]/10 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_30%_0%,rgba(158,243,21,0.08),transparent_60%),radial-gradient(900px_420px_at_80%_120%,rgba(124,58,237,0.10),transparent_60%)]" />
          </div>

          <div className="relative p-6 sm:p-8">
            <IdeaC_QuoteSignatureParagraph />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function IdeaC_QuoteSignatureParagraph() {
  return (
    <div className="relative">
      <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.03em] leading-tight">
        “We don’t just build experiences — we build the{" "}
        <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,rgba(158,243,21,1),rgba(167,139,250,1))]">
          systems behind them
        </span>
        .”
      </div>

      <p className="mt-4 max-w-3xl text-sm sm:text-base text-white/68 leading-relaxed">
        Wodh is a studio for teams who want XR and games delivered with production discipline. We keep scope clear, progress
        visible, and quality high — from prototype to launch. If you’re not sure what you need yet, we’ll guide the fastest path
        to proof.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm font-semibold">
          One team.{" "}
          <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,rgba(158,243,21,1),rgba(167,139,250,1))]">
            Two studios
          </span>
          .
        </div>

        <div className="flex flex-wrap gap-2">
          <Tag tone="neutral">24–48h response</Tag>
          <Tag tone="neutral">Weekly demos</Tag>
          <Tag tone="neutral">NDA available</Tag>
        </div>
      </div>

      <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/14 to-transparent" />

      <div className="mt-4 text-xs text-white/60">
        Prefer email?{" "}
        <a className="text-white/80 font-semibold hover:text-white" href="mailto:hello@wodh.io">
          hello@wodh.io
        </a>{" "}
        <span className="text-white/25">•</span>{" "}
        Or send a short brief below — we’ll respond with next steps.
      </div>
    </div>
  );
}

/* --------------------- 4) Project Inquiry — Steps ------------------------ */

function ProjectInquiry_Steps() {
  return (
    <Section id="project-inquiry">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm text-white/60">Project Inquiry</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-[-0.04em] leading-[1.05]">
              Tell us what you’re building — we’ll reply with <BlendText>next steps</BlendText>.
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/68 leading-relaxed">
              A short brief is enough. We’ll refine scope and propose a milestone plan.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <TrustChip>24–48h response</TrustChip>
            <TrustChip>NDA available</TrustChip>
            <TrustChip>Weekly demos</TrustChip>
          </div>
        </div>

        <Idea1_NeonCommandCenterV2 />
      </Container>
    </Section>
  );
}

function Idea1_NeonCommandCenterV2() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <GlassCard>
        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap gap-2">
            <Tag tone="neutral">Secure</Tag>
            <Tag tone="neutral">NDA available</Tag>
            <Tag tone="green">XR</Tag>
            <Tag tone="violet">Games</Tag>
          </div>
          <div className="mt-4 text-2xl sm:text-3xl font-semibold tracking-[-0.02em]">
            Your brief → <BlendText>a clear plan</BlendText>
          </div>
          <p className="mt-3 text-sm text-white/65 leading-relaxed">
            We’ll reply with scope guidance, timeline buckets, and recommended next steps — no fluff.
          </p>

          <div className="mt-5 space-y-2">
            <Bullet title="24–48h reply" desc="You’ll get a real response from the team." />
            <Bullet title="Clear scope options" desc="Prototype, MVP, or full production." />
            <Bullet title="Weekly demos" desc="Tight feedback loops, predictable delivery." />
            <Bullet title="Launch support" desc="QA, release help, and iteration." />
          </div>

          <div className="mt-6 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-4">
            <div className="text-xs font-semibold text-white/80">What happens next?</div>
            <div className="mt-2 text-xs text-white/60">
              We’ll review your brief, ask 2–3 clarifying questions, then share a suggested plan and call slot.
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">Project Inquiry</div>
              <div className="mt-1 text-xs text-white/60">Step {step} of 3</div>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((n) => (
                <button key={n} onClick={() => setStep(n as 1 | 2 | 3)} className={stepChip(step === n)}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <div className="h-2 w-full rounded-full bg-white/[0.05] ring-1 ring-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,rgba(158,243,21,0.95),rgba(124,58,237,0.95))] transition-all duration-300"
                style={{ width: step === 1 ? "33.333%" : step === 2 ? "66.666%" : "100%" }}
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {step === 1 && (
              <>
                <div className="flex flex-wrap gap-2">
                  <Tag tone="green">XR</Tag>
                  <Tag tone="violet">Games</Tag>
                  <Tag tone="neutral">Both</Tag>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Company" placeholder="Your company name" />
                  <Field label="Role" placeholder="Founder / PM / Producer…" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select label="Project type" options={["XR", "Game", "XR + Game", "Not sure"]} />
                  <Select label="Goal" options={["Prototype", "MVP", "Full product", "Pitch demo"]} />
                </div>
                <TextArea label="Describe your idea" placeholder="A few lines are enough to begin…" />
              </>
            )}

            {step === 2 && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select label="Timeline" options={["ASAP", "2–4 weeks", "1–3 months", "3+ months"]} />
                  <Select label="Team mode" options={["Full build", "Co-dev", "Consulting", "Staff augmentation"]} />
                </div>
                <div className="rounded-3xl bg-white/[0.03] ring-1 ring-white/10 p-5">
                  <div className="text-xs font-semibold text-white/80">Scope checklist</div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {["Design + UX", "3D / Art support", "Backend / APIs", "Multiplayer / Networking", "Analytics / Telemetry", "QA + Device testing"].map(
                      (label) => (
                        <Check key={label} label={label} />
                      )
                    )}
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select label="Budget range" options={["< $5k", "$5k–$15k", "$15k–$50k", "$50k+"]} />
                  <Select label="Preferred contact" options={["Email", "WhatsApp", "Call", "Meet"]} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" placeholder="Your name" />
                  <Field label="Email" placeholder="you@company.com" />
                </div>
                <Field label="Phone (optional)" placeholder="+92 …" />
                <div className="rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-4">
                  <div className="text-xs text-white/60">
                    By sending, you agree we can contact you about your inquiry. NDA available on request.
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <ButtonGhost onClick={() => setStep(step === 1 ? 1 : ((step - 1) as 1 | 2 | 3))}>Back</ButtonGhost>
              <ButtonGhost onClick={() => setStep(step === 3 ? 3 : ((step + 1) as 1 | 2 | 3))}>Next</ButtonGhost>
            </div>
            <ButtonBlend>Send Inquiry</ButtonBlend>
          </div>

          <div className="pointer-events-none mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70" />
          <div className="pointer-events-none mt-2 h-1 w-full rounded-full bg-[linear-gradient(90deg,transparent,rgba(158,243,21,0.45),rgba(124,58,237,0.45),transparent)] blur-[2px] opacity-70 animate-[shimmer_3.2s_ease-in-out_infinite]" />
        </div>
      </GlassCard>
    </div>
  );
}

function Bullet({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 p-3">
      <span className="mt-1 h-2 w-2 rounded-full bg-white/40" />
      <div>
        <div className="text-xs font-semibold text-white/80">{title}</div>
        <div className="mt-1 text-xs text-white/60">{desc}</div>
      </div>
    </div>
  );
}

function stepChip(active: boolean) {
  return (
    "h-9 w-9 rounded-full text-sm font-semibold ring-1 transition " +
    (active ? "bg-white/[0.10] text-white ring-white/20" : "bg-white/[0.03] text-white/70 ring-white/10 hover:bg-white/[0.06]")
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <div className="text-[11px] font-semibold text-white/70">{label}</div>
      <select className="mt-1 w-full rounded-2xl bg-white/[0.03] px-4 py-3 text-sm text-white/90 ring-1 ring-white/10 outline-none transition focus:bg-white/[0.05] focus:ring-white/20">
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0C0722]">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <div className="text-[11px] font-semibold text-white/70">{label}</div>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="mt-1 w-full resize-none rounded-2xl bg-white/[0.03] px-4 py-3 text-sm text-white/90 placeholder:text-white/35 ring-1 ring-white/10 outline-none transition focus:bg-white/[0.05] focus:ring-white/20"
      />
    </label>
  );
}

function Check({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 px-3 py-2 text-xs text-white/70 hover:bg-white/[0.05] cursor-pointer">
      <input type="checkbox" className="h-4 w-4 accent-[#9EF315]" />
      {label}
    </label>
  );
}

function ButtonBlend({ children }: { children: React.ReactNode }) {
  return (
    <button className="group relative inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold text-white">
      <span className="absolute inset-0 rounded-2xl bg-[linear-gradient(90deg,rgba(158,243,21,0.95),rgba(124,58,237,0.95))] shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_18px_70px_rgba(124,58,237,0.18),0_18px_70px_rgba(158,243,21,0.14)] transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="absolute inset-0 rounded-2xl opacity-0 bg-[radial-gradient(80%_120%_at_50%_0%,rgba(255,255,255,0.45),transparent_60%)] transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative">{children}</span>
    </button>
  );
}

/* -------- 5) Presence — Full-bleed map + big flag pills ------------------ */

function Presence_FullBleed_BigPills() {
  const countries = [
    { key: "pk", name: "Pakistan", flagUrl: "https://flagcdn.com/w640/pk.png", dot: { x: 740, y: 250 } },
    { key: "ae", name: "UAE", flagUrl: "https://flagcdn.com/w640/ae.png", dot: { x: 705, y: 265 } },
    { key: "gb", name: "United Kingdom", flagUrl: "https://flagcdn.com/w640/gb.png", dot: { x: 585, y: 185 } },
    { key: "us", name: "USA", flagUrl: "https://flagcdn.com/w640/us.png", dot: { x: 315, y: 215 } },
  ] as const;

  return (
    <Section className="bg-[#0C0722]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 left-0 h-72 w-[520px] rounded-full bg-[#9EF315]/10 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-[640px] rounded-full bg-[#7C3AED]/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.10] bg-[radial-gradient(1200px_700px_at_20%_10%,rgba(255,255,255,0.10),transparent_60%),radial-gradient(900px_600px_at_80%_0%,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <div className="text-sm text-white/60">Presence</div>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.04em] leading-[1.05]">
              We operate across{" "}
              <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,rgba(158,243,21,1),rgba(167,139,250,1))]">
                4 countries
              </span>
              .
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/68 leading-relaxed">
              One studio workflow, global overlap — built for clear communication, predictable delivery, and long-term support.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <TrustChip>24–48h response</TrustChip>
            <TrustChip>Weekly demos</TrustChip>
            <TrustChip>NDA available</TrustChip>
          </div>
        </div>

        <div className="mt-7 relative overflow-hidden rounded-[28px] bg-white/[0.03] ring-1 ring-white/10 backdrop-blur">
          <div className="relative h-[240px] sm:h-[300px] lg:h-[330px]">
            <WorldMapFullBleed dots={countries.map((c) => c.dot)} />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_420px_at_50%_45%,rgba(255,255,255,0.08),transparent_68%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(12,7,34,0.08),rgba(12,7,34,0.52))]" />
          </div>

          <div className="border-t border-white/10 px-4 py-4 sm:px-5 sm:py-5">
            <div className="flex flex-wrap gap-3">
              {countries.map((c) => (
                <FlagPillBig key={c.key} name={c.name} flagUrl={c.flagUrl} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function FlagPillBig({ name, flagUrl }: { name: string; flagUrl: string }) {
  return (
    <div className="group inline-flex items-center gap-3 rounded-full bg-white/[0.04] px-5 py-3 ring-1 ring-white/10 backdrop-blur transition-transform duration-300 hover:-translate-y-0.5">
      <div className="relative h-[28px] w-[44px] overflow-hidden rounded-[10px] ring-1 ring-white/10">
        <img src={flagUrl} alt={`${name} flag`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.00),rgba(0,0,0,0.22))]" />
      </div>
      <div className="text-base sm:text-lg font-semibold tracking-[-0.02em] text-white/88">{name}</div>
      <span className="h-2.5 w-2.5 rounded-full bg-white/70 shadow-[0_0_26px_rgba(158,243,21,0.18),0_0_26px_rgba(124,58,237,0.16)] opacity-70 group-hover:opacity-90 transition-opacity" />
    </div>
  );
}

function WorldMapFullBleed({ dots }: { dots: Array<{ x: number; y: number }> }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="World map with presence dots"
    >
      <defs>
        <radialGradient id="mapWash" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="70%" stopColor="rgba(255,255,255,0.00)" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="1200" height="520" fill="url(#mapWash)" />
      <g opacity="0.52">
        <path d="M120 165c40-45 120-80 200-80 70 0 135 25 160 60 20 28 10 65-25 90-30 22-60 25-80 55-20 30 0 70-35 95-40 28-110 18-155-20-50-42-95-100-75-140 10-20 10-45 10-60 0-25 10-60 0-80Z" fill="rgba(255,255,255,0.12)" />
        <path d="M315 300c35-15 75 5 95 35 22 34 20 75-5 105-28 35-85 30-115-5-28-34-30-110 25-135Z" fill="rgba(255,255,255,0.10)" />
        <path d="M520 155c30-30 85-45 135-38 45 6 75 25 85 48 12 28-10 55-45 65-35 10-55 18-62 35-8 20 10 45-5 70-22 35-85 40-130 15-42-25-58-75-35-115 12-22 25-45 57-80Z" fill="rgba(255,255,255,0.12)" />
        <path d="M585 285c35-18 80-8 110 22 35 35 40 90 10 130-32 45-105 45-145 5-40-40-40-135 25-157Z" fill="rgba(255,255,255,0.10)" />
        <path d="M690 145c70-35 170-35 250 5 65 33 95 85 75 130-18 40-70 45-110 70-45 30-30 75-70 105-55 40-155 35-220-18-60-50-70-130-35-185 18-30 35-55 60-82 18-20 30-25 50-25Z" fill="rgba(255,255,255,0.12)" />
        <path d="M940 370c45-22 95-10 120 18 30 34 20 80-20 105-45 28-115 18-145-22-25-35-5-80 45-101Z" fill="rgba(255,255,255,0.10)" />
      </g>
      {dots.map((d, i) => (
        <PresenceDot key={i} x={d.x} y={d.y} />
      ))}
    </svg>
  );
}

function PresenceDot({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={22} fill="rgba(158,243,21,0.18)" />
      <circle cx={x} cy={y} r={22} fill="rgba(124,58,237,0.16)" />
      <circle cx={x} cy={y} r={8} fill="#FFFFFF" opacity="0.92" />
      <circle cx={x} cy={y} r={12} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
    </g>
  );
}

/* --------------------- 6) FAQ — Command Palette -------------------------- */

type FAQ = { q: string; a: string; tag?: string };

const FAQ_ITEMS: FAQ[] = [
  {
    q: "How fast do you respond after I submit the inquiry?",
    a: "Usually within 24–48 hours. If you include links, goals, and a rough deadline, we can reply with clearer scope and timeline on the first response.",
    tag: "Process",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes. Share yours or we can provide a standard NDA. We keep project access scoped and role-based.",
    tag: "Legal",
  },
  {
    q: "Which engines and stacks do you work with?",
    a: "Unity and Unreal for realtime; WebXR where it fits; and supporting pipelines for 3D, UI, backend services, and deployment. We recommend what matches your goal and budget.",
    tag: "Tech",
  },
  {
    q: "What does a typical timeline look like?",
    a: "Prototype: 2–4 weeks. MVP: 4–10 weeks. Full production: 3+ months. You’ll get a milestone plan with deliverables and review checkpoints.",
    tag: "Timeline",
  },
  {
    q: "How do you estimate and price projects?",
    a: "We can do fixed-scope milestones or a monthly retainer. We’ll propose the model that reduces risk for your stage (prototype vs production).",
    tag: "Pricing",
  },
  {
    q: "How do we collaborate across timezones?",
    a: "Async-first with weekly demos. We keep a shared board, weekly deliverables, and short update loops so you always know what shipped and what’s next.",
    tag: "Collab",
  },
  {
    q: "Can you work with an existing team or codebase?",
    a: "Yes. We can join mid-stream, audit, and ship improvements. We start with discovery to map risks and unblock delivery.",
    tag: "Delivery",
  },
  {
    q: "What do you need from me to start?",
    a: "A goal, references, constraints (platform, deadline), and any existing assets. If you’re unsure, describe the outcome — we’ll help define the first milestone.",
    tag: "Start",
  },
];

function FAQ_CommandPalette() {
  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQ_ITEMS;
    return FAQ_ITEMS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm text-white/60">FAQ</div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-[-0.04em] leading-[1.05]">
              Ask anything — get <BlendText>clear answers</BlendText>.
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/68 leading-relaxed">
              Use the command-style search to find what you need before sending your inquiry.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <TrustChip>24–48h response</TrustChip>
            <TrustChip>NDA available</TrustChip>
          </div>
        </div>

        <div className="mt-7 relative">
          <div className="relative rounded-2xl bg-white/[0.02] ring-1 ring-white/10 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <span className="text-white/50">⌘</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything… (e.g., timeline, NDA, pricing)"
                className="w-full bg-transparent outline-none placeholder:text-white/35 text-sm sm:text-base text-white/80"
              />
              <span className="text-xs text-white/40">{items.length} results</span>
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-x-10 -top-10 h-24 bg-[radial-gradient(420px_120px_at_50%_50%,rgba(158,243,21,0.12),transparent_60%)]" />
        </div>

        <div className="mt-5">
          <Accordion items={items} />
        </div>
      </Container>
    </Section>
  );
}

function Accordion({ items }: { items: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="divide-y divide-white/10 rounded-2xl bg-white/[0.02] ring-1 ring-white/10">
      {items.map((it, idx) => {
        const open = openIndex === idx;
        return (
          <button
            key={it.q}
            type="button"
            onClick={() => setOpenIndex(open ? null : idx)}
            className="w-full text-left px-4 py-4 sm:px-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  {it.tag && (
                    <span className="inline-flex items-center rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/60 ring-1 ring-white/10">
                      {it.tag}
                    </span>
                  )}
                  <div className="text-sm sm:text-base font-semibold tracking-[-0.01em] text-white/85">{it.q}</div>
                </div>
                {open && <div className="mt-2 text-sm text-white/65 leading-relaxed">{it.a}</div>}
              </div>
              <span
                className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.03] ring-1 ring-white/10 text-white/70"
                aria-hidden="true"
              >
                <span className={open ? "rotate-45 transition-transform" : "transition-transform"}>+</span>
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ----------------------- 7) CTA — Final Nudge ---------------------------- */

function CTA_FinalNudge() {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-[28px] bg-white/[0.03] ring-1 ring-white/10 backdrop-blur p-6 sm:p-8">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#9EF315]/12 blur-3xl" />
            <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-[#7C3AED]/12 blur-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_30%_0%,rgba(158,243,21,0.10),transparent_60%),radial-gradient(900px_420px_at_80%_120%,rgba(124,58,237,0.10),transparent_60%)]" />
          </div>

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <div className="text-xs text-white/60">Final nudge</div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-[-0.03em] leading-tight">
                Ready when you are — let’s ship something <BlendText>real</BlendText>.
              </h3>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-white/68">
                Send a short brief. We’ll reply with next steps and a milestone plan.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <TrustChip>24–48h response</TrustChip>
                <TrustChip>NDA available</TrustChip>
                <TrustChip>Weekly demos</TrustChip>
                <TrustChip>Clear milestones</TrustChip>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button variant="primary" onClick={scrollToInquiry}>
                Start a Project Inquiry
              </Button>
              <Button variant="secondary" href="mailto:hello@wodh.io">
                Email hello@wodh.io
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------ Global Backdrop --------------------------- */

function GlobalBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#0C0722]" />
      <div className="absolute inset-0 opacity-90 bg-[radial-gradient(1200px_700px_at_20%_10%,rgba(20,15,60,0.9),transparent_60%),radial-gradient(900px_600px_at_80%_0%,rgba(15,10,40,0.9),transparent_55%),radial-gradient(1100px_700px_at_50%_115%,rgba(20,15,70,0.85),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.22] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Cfilter id=%22n%22 x=%220%22 y=%220%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%2260%22 height=%2260%22 filter=%22url(%23n)%22 opacity=%220.45%22/%3E%3C/svg%3E')]" />
    </div>
  );
}



