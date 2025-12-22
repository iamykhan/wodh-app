"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * WODH — ABOUT PAGE (REVISION)
 * ✅ Same structure preserved
 * ✅ Updated to WODH Design System v1 background + glow balance (base #0C0722)
 * ✅ Core team cards: 8 → 12 (adds 4) + real online dummy photos for ALL
 * ✅ Keeps reduced-motion respect
 */

function cx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const apply = () => setReduced(!!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);
  return reduced;
}

function useReveal(ids: string[]) {
  const [vis, setVis] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        setVis((p) => {
          const n = { ...p };
          for (const e of entries) if (e.isIntersecting) n[(e.target as HTMLElement).id] = true;
          return n;
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return (id: string) =>
    cx(
      "transition duration-700 will-change-transform",
      vis[id] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
    );
}

function SoftPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
      {children}
    </span>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return <div className="text-xs uppercase tracking-[0.34em] text-[#9EF315]">{children}</div>;
}

function CenterHeader({ kicker, title, sub }: { kicker: string; title: string; sub: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center gap-3 text-xs uppercase tracking-[0.34em] text-white/45">
        <span className="h-px w-10 bg-white/10" />
        <span>{kicker}</span>
        <span className="h-px w-10 bg-white/10" />
      </div>
      <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight">{title}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-pretty text-white/60">{sub}</p>
    </div>
  );
}

function ArrowButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <a
      href={href}
      className={cx(
        "group inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition will-change-transform",
        variant === "primary"
          ? "bg-[#9EF315] text-black hover:brightness-95 active:translate-y-[1px]"
          : "border border-white/10 bg-white/5 text-white/90 hover:border-white/20 hover:bg-white/10 active:translate-y-[1px]"
      )}
    >
      <span>{children}</span>
      <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
    </a>
  );
}

function HoverCard({
  children,
  className,
  rounded = "rounded-2xl",
}: {
  children: React.ReactNode;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={cx(
        "group relative border border-white/10 bg-white/[0.03] backdrop-blur transition will-change-transform",
        rounded,
        "hover:border-white/20 hover:-translate-y-0.5",
        "hover:shadow-[0_0_0_1px_rgba(158,243,21,0.10)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -inset-10 blur-3xl bg-[radial-gradient(520px_220px_at_25%_25%,rgba(158,243,21,0.10),transparent_62%),radial-gradient(520px_220px_at_85%_20%,rgba(91,45,220,0.10),transparent_65%)]" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionDivider({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="pointer-events-none relative mx-auto max-w-6xl px-5">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {!reducedMotion ? (
        <div className="absolute inset-x-5 -top-6 h-12 bg-[radial-gradient(560px_18px_at_50%_50%,rgba(158,243,21,0.12),transparent_62%),radial-gradient(520px_18px_at_55%_50%,rgba(91,45,220,0.10),transparent_65%)] opacity-70" />
      ) : null}
    </div>
  );
}

function AmbientGlow({
  reducedMotion,
  variant = "green",
  className,
}: {
  reducedMotion: boolean;
  variant?: "green" | "purple" | "mix";
  className?: string;
}) {
  if (reducedMotion) return null;
  const bg =
    variant === "green"
      ? "radial-gradient(circle at 35% 35%, rgba(158,243,21,0.16), rgba(158,243,21,0.0) 62%)"
      : variant === "purple"
      ? "radial-gradient(circle at 65% 35%, rgba(91,45,220,0.18), rgba(91,45,220,0.0) 62%)"
      : "radial-gradient(circle at 42% 52%, rgba(158,243,21,0.12), rgba(158,243,21,0.0) 55%), radial-gradient(circle at 62% 40%, rgba(91,45,220,0.14), rgba(91,45,220,0.0) 55%)";

  return (
    <div
      className={cx(
        "pointer-events-none absolute rounded-full blur-3xl opacity-35",
        "animate-[wodhGlowDrift_16s_ease-in-out_infinite]",
        className
      )}
      style={{ background: bg }}
    />
  );
}

function EditorialMoment({
  kicker,
  lines,
  sub,
  reducedMotion,
}: {
  kicker: string;
  lines: string[];
  sub?: string;
  reducedMotion: boolean;
}) {
  return (
    <div className="relative mx-auto max-w-6xl px-5">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 sm:p-12 backdrop-blur">
        {!reducedMotion ? (
          <div className="pointer-events-none absolute -inset-10 opacity-[0.22] blur-3xl">
            <div className="absolute inset-0 bg-[radial-gradient(820px_340px_at_20%_30%,rgba(91,45,220,0.16),transparent_62%),radial-gradient(820px_340px_at_80%_30%,rgba(158,243,21,0.14),transparent_65%)]" />
          </div>
        ) : null}
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.34em] text-white/45">{kicker}</div>
          <div className="mt-5 space-y-2">
            {lines.map((t, i) => (
              <div key={i} className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                {t}
              </div>
            ))}
          </div>
          {sub ? <p className="mt-5 max-w-3xl text-pretty text-white/60">{sub}</p> : null}
        </div>
      </div>
    </div>
  );
}

function XRGamesSplit({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative">
      <AmbientGlow reducedMotion={reducedMotion} variant="purple" className="-left-28 top-8 h-[520px] w-[520px]" />
      <AmbientGlow reducedMotion={reducedMotion} variant="green" className="-right-28 top-10 h-[520px] w-[520px]" />

      <div className="mx-auto max-w-6xl px-5">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 sm:p-12 backdrop-blur">
          <div className="pointer-events-none absolute inset-0 opacity-[0.10] [mask-image:radial-gradient(520px_260px_at_50%_35%,black,transparent)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
          </div>

          <div className="relative">
            <div className="text-xs uppercase tracking-[0.34em] text-white/45">Two disciplines. One philosophy.</div>

            <div className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              We build for <span className="text-[#9EF315]">immersion</span> and <span className="text-[#5B2DDC]">play</span>.
            </div>
            <p className="mt-4 max-w-3xl text-white/60">
              XR and Games are different problems — performance budgets, interaction models, pacing, and user intent. We build both
              with the same obsession: premium feel under real constraints.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
              <HoverCard className="p-7" rounded="rounded-3xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.34em] text-white/45">XR & Spatial</div>
                    <div className="mt-3 text-xl font-semibold text-white/90">Systems-first immersion.</div>
                    <div className="mt-2 text-sm text-white/60">
                      Training, simulation, spatial UX — where performance and stability are non-negotiable.
                    </div>
                  </div>
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#9EF315]" />
                </div>
                <div className="mt-5 space-y-2 text-sm text-white/65">
                  {["Device constraints & perf budgets", "Spatial interaction + UX", "Pipelines & deliver discipline"].map((x) => (
                    <div key={x} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#9EF315]" />
                      <span>{x}</span>
                    </div>
                  ))}
                </div>
              </HoverCard>

              <div className="hidden lg:flex items-center justify-center px-2">
                <div className="h-full w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
              </div>

              <HoverCard className="p-7" rounded="rounded-3xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.34em] text-white/45">Games & Interactives</div>
                    <div className="mt-3 text-xl font-semibold text-white/90">Playable polish.</div>
                    <div className="mt-2 text-sm text-white/60">
                      Mechanics, feedback, pacing — where feel and clarity decide everything.
                    </div>
                  </div>
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#5B2DDC]" />
                </div>
                <div className="mt-5 space-y-2 text-sm text-white/65">
                  {["Game feel + feedback loops", "UI/UX for play", "Playtest → iterate → ship"].map((x) => (
                    <div key={x} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#5B2DDC]" />
                      <span>{x}</span>
                    </div>
                  ))}
                </div>
              </HoverCard>
            </div>

            <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="mt-5 text-sm text-white/55">
              One bar: premium in the first few seconds — on real devices, not just in a demo.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Marquee({ items, reducedMotion }: { items: string[]; reducedMotion: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0C0722] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0C0722] to-transparent" />
      <div
        className={cx("group flex w-full items-center", reducedMotion ? "" : "hover:[--marqueePlay:paused]")}
        style={{ ["--marqueePlay" as any]: "running" } as React.CSSProperties}
      >
        <div
          className={cx(
            "flex min-w-full items-center gap-3 py-3",
            reducedMotion ? "flex-wrap justify-center" : "animate-[wodhMarquee_32s_linear_infinite]"
          )}
          style={{ animationPlayState: reducedMotion ? "paused" : ("var(--marqueePlay)" as any) }}
        >
          {row.map((c, i) => (
            <div
              key={`${c}-${i}`}
              className={cx(
                "mx-1 flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]",
                "px-4 py-3 text-sm font-semibold tracking-wide text-white/55 opacity-70 transition",
                "hover:opacity-95 hover:border-white/20 hover:shadow-[0_0_0_1px_rgba(91,45,220,0.10)]"
              )}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniMapCard({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
      <div className="pointer-events-none absolute -inset-10 opacity-[0.30] blur-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(640px_260px_at_20%_35%,rgba(158,243,21,0.12),transparent_62%),radial-gradient(640px_260px_at_82%_28%,rgba(91,45,220,0.14),transparent_65%)]" />
      </div>

      <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.34em] text-white/45">Global presence</div>
          <div className="mt-2 text-lg font-semibold text-white/90">Pakistan · UK · Dubai</div>

          <div className="mt-4 relative rounded-2xl border border-white/10 bg-[#0C0722]/50 p-4">
            <svg viewBox="0 0 900 360" className="h-[180px] w-full">
              <g opacity="0.10">
                {Array.from({ length: 9 }).map((_, i) => (
                  <line key={`v-${i}`} x1={i * 100} y1="0" x2={i * 100} y2="360" stroke="white" strokeWidth="1" />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <line key={`h-${i}`} x1="0" y1={i * 90} x2="900" y2={i * 90} stroke="white" strokeWidth="1" />
                ))}
              </g>

              <path
                d="M82 210 C140 140, 200 120, 260 150 C310 176, 352 170, 402 140 C452 110, 520 104, 560 132 C604 162, 650 168, 696 148 C740 128, 796 130, 836 160"
                fill="none"
                stroke="rgba(255,255,255,0.16)"
                strokeWidth="2"
              />
              <path
                d="M110 250 C170 220, 220 228, 280 258 C340 288, 402 290, 468 256 C530 224, 592 220, 656 248 C720 280, 782 282, 842 252"
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="2"
              />

              <path d="M520 190 L600 165 L360 150" fill="none" stroke="rgba(158,243,21,0.26)" strokeWidth="2" />
              <path d="M600 165 L640 170" fill="none" stroke="rgba(91,45,220,0.22)" strokeWidth="2" />

              <g>
                <circle cx="360" cy="150" r="8" fill="rgba(12,7,34,0.95)" stroke="rgba(255,255,255,0.14)" />
                <circle cx="360" cy="150" r="5" fill="rgba(91,45,220,0.90)" />
                {!reducedMotion ? (
                  <circle
                    cx="360"
                    cy="150"
                    r="14"
                    fill="rgba(91,45,220,0.18)"
                    style={{ animation: "wodhNodePulse 2.9s ease-in-out infinite" }}
                  />
                ) : null}

                <circle cx="600" cy="165" r="8" fill="rgba(12,7,34,0.95)" stroke="rgba(255,255,255,0.14)" />
                <circle cx="600" cy="165" r="5" fill="rgba(158,243,21,0.90)" />
                {!reducedMotion ? (
                  <circle
                    cx="600"
                    cy="165"
                    r="14"
                    fill="rgba(158,243,21,0.16)"
                    style={{ animation: "wodhNodePulse 2.6s ease-in-out infinite" }}
                  />
                ) : null}

                <circle cx="640" cy="170" r="8" fill="rgba(12,7,34,0.95)" stroke="rgba(255,255,255,0.14)" />
                <circle cx="640" cy="170" r="5" fill="rgba(158,243,21,0.90)" />
                {!reducedMotion ? (
                  <circle
                    cx="640"
                    cy="170"
                    r="14"
                    fill="rgba(158,243,21,0.14)"
                    style={{ animation: "wodhNodePulse 3.2s ease-in-out infinite" }}
                  />
                ) : null}
              </g>
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { city: "Pakistan", note: "Delivery & Engineering", tone: "green" as const },
            { city: "UK", note: "Business & Partnerships", tone: "purple" as const },
            { city: "Dubai", note: "Regional Presence", tone: "mix" as const },
          ].map((x) => (
            <div
              key={x.city}
              className={cx(
                "rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition",
                "hover:border-white/20 hover:shadow-[0_0_0_1px_rgba(158,243,21,0.08)]"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white/90">{x.city}</div>
                  <div className="mt-1 text-sm text-white/60">{x.note}</div>
                </div>
                <span
                  className={cx(
                    "mt-0.5 inline-flex h-2.5 w-2.5 rounded-full",
                    x.tone === "green"
                      ? "bg-[#9EF315]"
                      : x.tone === "purple"
                      ? "bg-[#5B2DDC]"
                      : "bg-[linear-gradient(135deg,#9EF315,#5B2DDC)]"
                  )}
                />
              </div>
            </div>
          ))}
          <div className="text-sm text-white/55">
            Operating globally — <span className="text-white/80">Pakistan · UK · Dubai</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const DATA = {
  hero: {
    pills: ["Wodh", "XR • Games • Engineering", "Premium under constraints"],
    title: "We Build Worlds",
    desc:
      "Wodh started small — obsessed with craft and consistency. We scaled through shipping, iterating, and raising the quality bar. Today, we build immersive experiences that feel premium, perform smoothly, and ship with confidence — built to last, not just impress.",
    ctas: [
      { label: "What we do", href: "#capabilities", primary: true },
      { label: "Meet the team", href: "#team", primary: false },
    ],
    stats: [
      { value: "8+ yrs", label: "Building & shipping" },
      { value: "XR + Games", label: "Core focus" },
      { value: "Performance-first", label: "Device-ready builds" },
      { value: "Global", label: "Pakistan • UK • Dubai" },
    ],
  },

  story: {
    kicker: "OUR STORY",
    title: "A clear story — in real words",
    sub: "Not a timeline of buzzwords. Just how we grew, why we became selective, and what we protect today.",
    p1:
      'Wodh started small — not as a "big studio," but as a team that cared deeply about how experiences feel when they\'re finished. We were drawn to the work where details matter: interaction, motion, pacing, realism, and polish.',
    p2:
      "As we grew, we learned something simple: quality can't rely on mood or heroics. It has to be supported by systems — clear decisions, reviews, iteration loops, and calm delivery rhythms. That's when we matured on purpose.",
    p3:
      "Today, we're selective. Not to be exclusive — but to be responsible. We take fewer projects so we can protect the quality bar, communicate clearly, and ship work that feels premium under real constraints.",
    tags: ["Small beginnings", "Built systems", "Calm delivery", "Global ambition", "Quality protected"],
    principle: {
      label: "A PRINCIPLE WE KEEP",
      title: "If it doesn't feel premium in the first few seconds, we keep iterating.",
      desc: "This isn't perfectionism. It's respect — for the user, and for the brand behind the product.",
    },
  },

  capabilities: {
    kicker: "CAPABILITIES",
    title: "What we build",
    sub: "Not buzzwords. Real deliverables — designed to feel premium and engineered to scale.",
    cards: [
      {
        tone: "green" as const,
        title: "XR Experiences",
        desc: "Immersive worlds for training, storytelling, and interaction.",
        bullets: ["Unity / Unreal pipelines", "Performance budgets", "Device-ready delivery"],
      },
      {
        tone: "purple" as const,
        title: "Games & Interactives",
        desc: "From prototypes to polished releases with strong game feel.",
        bullets: ["Core mechanics + juice", "UI/UX for play", "Playtest + iterate"],
      },
      {
        tone: "purple" as const,
        title: "3D + Motion",
        desc: "High-fidelity assets, animation, and cinematic scenes.",
        bullets: ["Rigging + animation", "Lighting + look-dev", "Asset optimization"],
      },
      {
        tone: "green" as const,
        title: "Product Engineering",
        desc: "Solid engineering layer under premium design.",
        bullets: ["Clean architecture", "Integrations + APIs", "QA + release discipline"],
      },
    ],
  },

  deliver: {
    kicker: "DELIVERY",
    title: "How we deliver",
    sub: "Systems-first execution — so quality holds up under devices, performance budgets, timelines, and scale.",
    pillars: [
      {
        title: "Clarity Before Production",
        desc: "We align on scope, constraints, platforms, and acceptance criteria before builds begin.",
        bullets: ["Defined technical scope & deliverables", "Constraints agreed early", "Ownership + success criteria"],
      },
      {
        title: "Systems Over Heroics",
        desc: "We rely on pipelines and iteration loops — not crunch or guesswork.",
        bullets: ["Versioned builds + milestones", "Cross-discipline reviews", "Feedback-driven iteration"],
      },
      {
        title: "Performance Is Non-Negotiable",
        desc: "Premium isn't just how it looks — it's how it runs.",
        bullets: ["Performance budgets per platform", "Device-ready builds", "Optimization from day one"],
      },
      {
        title: "Calm, Accountable Delivery",
        desc: "We stay selective so delivery stays focused.",
        bullets: ["Limited parallel engagements", "Clear communication cadence", "Stable delivery rhythm"],
      },
    ],
  },

  team: {
    kicker: "MEET THE TEAM",
    title: "Real people. Real ownership.",
    sub: "Leadership first — then the core team that builds and ships.",
    leadership: [
      {
        name: "Khan Sahb",
        role: "Founder / CEO",
        specialty: "Vision • Partnerships • Delivery Bar",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=70",
        tone: "mix" as const,
      },
      {
        name: "Ayesha R.",
        role: "Creative Director",
        specialty: "Premium UI • Motion • Brand Feel",
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=70",
        tone: "purple" as const,
      },
      {
        name: "Hamza K.",
        role: "XR Lead",
        specialty: "Unity/Unreal • Performance • Devices",
        img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=1400&q=70",
        tone: "green" as const,
      },
      {
        name: "Usman A.",
        role: "Engineering Lead",
        specialty: "Systems • Architecture • QA Discipline",
        img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1400&q=70",
        tone: "green" as const,
      },
    ],
    // ✅ 8 → 12 (adds 4) + unique, real dummy photos
    members: [
      { name: "Sara M.", role: "3D Artist", img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=1200&q=70" },
      { name: "Ali N.", role: "Client Success", img: "https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?auto=format&fit=crop&w=1200&q=70" },
      { name: "Zain H.", role: "Backend Engineer", img: "https://images.unsplash.com/photo-1520975682031-a66f1b47f89b?auto=format&fit=crop&w=1200&q=70" },
      { name: "Maha S.", role: "QA / Release", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=70" },
      { name: "Adeel H.", role: "Game Developer", img: "https://images.unsplash.com/photo-1520975958225-9677dbe57c4a?auto=format&fit=crop&w=1200&q=70" },
      { name: "Hira A.", role: "UI/UX Designer", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=70" },
      { name: "Bilal K.", role: "3D Generalist", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=70" },
      { name: "Noor S.", role: "Project Coordinator", img: "https://images.unsplash.com/photo-1544005316-04ce6b4d2b1b?auto=format&fit=crop&w=1200&q=70" },

      // ✅ Added 4
      { name: "Faizan R.", role: "Unity Developer", img: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=1200&q=70" },
      { name: "Maryam K.", role: "3D Animator", img: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=1200&q=70" },
      { name: "Omer S.", role: "Tech Artist", img: "https://images.unsplash.com/photo-1520975869018-7b2b1d1f1e8a?auto=format&fit=crop&w=1200&q=70" },
      { name: "Iqra N.", role: "Producer", img: "https://images.unsplash.com/photo-1524503033411-f7a2fe8c7f85?auto=format&fit=crop&w=1200&q=70" },
    ],
  },

  proof: {
    kicker: "PROOF",
    title: "Proof / Trust",
    sub: "Signals that matter — kept quiet, shown clearly.",
    stats: [
      { value: "8+ years", label: "Shipping premium work" },
      { value: "XR • Games", label: "Core focus" },
      { value: "Performance-first", label: "Device-ready builds" },
      { value: "Global", label: "Pakistan · UK · Dubai" },
    ],
    clients: ["Client A", "Client B", "Client C", "Client D", "Client E", "Client F", "Client G", "Client H"],
  },

  closing: {
    title: "Let's build something that feels premium.",
    sub: "Bring the idea. We'll shape the experience — and ship it with calm, technical discipline.",
    primary: { label: "Start a conversation", href: "/contact" },
    secondary: { label: "See selected work", href: "/work" },
  },
};

export default function AboutUs() {
  const reducedMotion = usePrefersReducedMotion();

  const ids = useMemo(
    () => ["hero", "story", "editorial1", "split", "capabilities", "deliver", "team", "proof", "closing"].map((x) => `wodh-${x}`),
    []
  );
  const reveal = useReveal(ids);

  const heroSheenRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (reducedMotion) return;
    const el = heroSheenRef.current;
    if (!el) return;
    el.classList.add("wodh-hero-sheen");
    return () => el.classList.remove("wodh-hero-sheen");
  }, [reducedMotion]);

  return (
    <div className="relative min-h-screen bg-[#0C0722] text-white">
      <style>{`
        @keyframes wodhGlowDrift {
          0%,100% { transform: translate3d(0,0,0) scale(1); opacity: .9; }
          50% { transform: translate3d(14px, 10px, 0) scale(1.03); opacity: 1; }
        }
        @keyframes wodhSheen {
          0% { transform: translateX(-30%); opacity: 0; }
          15% { opacity: .55; }
          50% { opacity: .35; }
          100% { transform: translateX(40%); opacity: 0; }
        }
        @keyframes wodhNodePulse {
          0%,100% { transform: scale(1); opacity: .6; }
          50% { transform: scale(1.15); opacity: .95; }
        }
        @keyframes wodhMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .wodh-hero-sheen::after{
          content:"";
          position:absolute;
          inset:-20px;
          background: linear-gradient(120deg, transparent 0%, rgba(158,243,21,.18) 40%, rgba(91,45,220,.16) 55%, transparent 75%);
          filter: blur(14px);
          transform: translateX(-30%);
          animation: wodhSheen 10s ease-in-out infinite;
          pointer-events:none;
        }
      `}</style>

      {/* Shared deep background layering (v1 base + balanced XR green + Games purple) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_720px_at_22%_12%,rgba(158,243,21,0.12),transparent_58%),radial-gradient(1200px_760px_at_78%_22%,rgba(91,45,220,0.16),transparent_58%),radial-gradient(900px_520px_at_50%_70%,rgba(255,255,255,0.05),transparent_62%),linear-gradient(to_bottom,rgba(12,7,34,1),rgba(12,7,34,1))]" />
        <div className="absolute inset-0 opacity-[0.10] [mask-image:radial-gradient(720px_420px_at_50%_12%,black,transparent)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(560px_240px_at_50%_40%,black,transparent)]">
          <div className="absolute inset-0 bg-[radial-gradient(60px_60px_at_10%_20%,rgba(255,255,255,0.10),transparent_60%),radial-gradient(70px_70px_at_80%_30%,rgba(255,255,255,0.08),transparent_60%),radial-gradient(80px_80px_at_55%_70%,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>
      </div>

      {/* HERO */}
      <section id="wodh-hero" className="relative">
        <AmbientGlow reducedMotion={reducedMotion} variant="green" className="-left-24 top-28 h-[560px] w-[560px]" />
        <AmbientGlow reducedMotion={reducedMotion} variant="purple" className="-right-40 top-44 h-[640px] w-[640px]" />

        <div className="mx-auto max-w-6xl px-5 pb-12 pt-20 sm:pt-24">
          <div className={reveal("wodh-hero")}>
            <div className="mx-auto max-w-3xl text-center">
              <div className="flex flex-wrap justify-center gap-2">
                {DATA.hero.pills.map((p) => (
                  <SoftPill key={p}>{p}</SoftPill>
                ))}
              </div>

              <h1 className="mt-8 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
                <span ref={heroSheenRef} className="relative inline-block">
                  {DATA.hero.title}
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
                {DATA.hero.desc}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ArrowButton href={DATA.hero.ctas[0].href} variant="primary">
                  {DATA.hero.ctas[0].label}
                </ArrowButton>
                <ArrowButton href={DATA.hero.ctas[1].href} variant="secondary">
                  {DATA.hero.ctas[1].label}
                </ArrowButton>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-4xl">
              <div className="grid gap-4 sm:grid-cols-4">
                {DATA.hero.stats.map((s) => (
                  <HoverCard key={s.value} className="px-6 py-4">
                    <div className="text-lg font-semibold">{s.value}</div>
                    <div className="mt-1 text-sm text-white/60">{s.label}</div>
                  </HoverCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0C0722]" />
      </section>

      {/* STORY */}
      <section id="wodh-story" className="relative">
        <AmbientGlow reducedMotion={reducedMotion} variant="mix" className="left-[10%] top-24 h-[520px] w-[520px]" />

        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className={reveal("wodh-story")}>
            <div className="mx-auto max-w-[1180px]">
              <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
                <div>
                  <SectionKicker>{DATA.story.kicker}</SectionKicker>
                  <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight">{DATA.story.title}</h2>
                  <p className="mt-3 max-w-3xl text-white/60">{DATA.story.sub}</p>

                  <div className="mt-10 max-w-3xl space-y-6 text-white/70">
                    <p className="leading-relaxed">{DATA.story.p1}</p>
                    <p className="leading-relaxed">
                      {DATA.story.p2.split("systems").map((chunk, i, arr) => (
                        <React.Fragment key={i}>
                          {chunk}
                          {i < arr.length - 1 ? <strong className="text-white">systems</strong> : null}
                        </React.Fragment>
                      ))}
                    </p>
                    <p className="leading-[1.85]">{DATA.story.p3}</p>
                  </div>

                  <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="mt-6 flex flex-wrap gap-2">
                    {DATA.story.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:pt-20">
                  <div className="mx-auto max-w-sm lg:max-w-[360px] lg:pr-2">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur">
                      <div className="pointer-events-none absolute -inset-10 opacity-[0.30] blur-3xl">
                        <div className="absolute inset-0 bg-[radial-gradient(520px_220px_at_25%_25%,rgba(158,243,21,0.14),transparent_62%),radial-gradient(520px_220px_at_85%_20%,rgba(91,45,220,0.12),transparent_65%)]" />
                      </div>
                      <div className="relative">
                        <div className="text-xs uppercase tracking-[0.34em] text-white/45">{DATA.story.principle.label}</div>
                        <div className="mt-4 text-sm font-semibold text-white/90 leading-relaxed">{DATA.story.principle.title}</div>
                        <p className="mt-4 text-sm leading-relaxed text-white/60">{DATA.story.principle.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-14" />
              <SectionDivider reducedMotion={reducedMotion} />
            </div>
          </div>
        </div>
      </section>

      {/* BIG EDITORIAL MOMENT */}
      <section id="wodh-editorial1" className="relative py-10">
        <div className={reveal("wodh-editorial1")}>
          <EditorialMoment
            reducedMotion={reducedMotion}
            kicker="THE BAR"
            lines={["Premium in the first few seconds.", "Proven on real devices."]}
            sub="We don't chase flashy. We chase clarity, feel, and performance — so your experience holds up beyond the demo."
          />
        </div>
      </section>

      {/* XR vs GAMES SPLIT */}
      <section id="wodh-split" className="relative py-10">
        <div className={reveal("wodh-split")}>
          <XRGamesSplit reducedMotion={reducedMotion} />
        </div>
        <div className="mt-14" />
        <SectionDivider reducedMotion={reducedMotion} />
      </section>

      {/* CAPABILITIES */}
      <section id="wodh-capabilities" className="relative">
        <AmbientGlow reducedMotion={reducedMotion} variant="mix" className="right-[8%] top-28 h-[520px] w-[520px]" />

        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className={reveal("wodh-capabilities")}>
            <CenterHeader kicker={DATA.capabilities.kicker} title={DATA.capabilities.title} sub={DATA.capabilities.sub} />

            <div className="mx-auto mt-12 max-w-5xl">
              <div className="grid gap-6 md:grid-cols-2">
                {DATA.capabilities.cards.map((c) => (
                  <HoverCard key={c.title} className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-base font-semibold">{c.title}</div>
                        <div className="mt-2 text-sm text-white/60">{c.desc}</div>
                      </div>
                      <span
                        className={cx(
                          "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65",
                          c.tone === "green"
                            ? "shadow-[0_0_0_1px_rgba(158,243,21,0.10)]"
                            : "shadow-[0_0_0_1px_rgba(91,45,220,0.10)]"
                        )}
                      >
                        {c.tone === "green" ? "XR" : "Games"}
                      </span>
                    </div>

                    <ul className="mt-5 space-y-2 text-sm text-white/65">
                      {c.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#9EF315]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </HoverCard>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-5 backdrop-blur">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold">Our quality bar</div>
                    <div className="mt-1 text-sm text-white/60">If it doesn't feel premium in the first 5 seconds, we keep iterating.</div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#deliver"
                      className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/85 transition hover:border-white/20 hover:bg-white/10"
                    >
                      How we deliver
                    </a>
                    <ArrowButton href="/contact" variant="primary">
                      Start a project
                    </ArrowButton>
                  </div>
                </div>
              </div>

              <div className="mt-14" />
              <SectionDivider reducedMotion={reducedMotion} />
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="wodh-deliver" className="relative">
        <AmbientGlow reducedMotion={reducedMotion} variant="green" className="left-[6%] top-24 h-[520px] w-[520px]" />
        <AmbientGlow reducedMotion={reducedMotion} variant="purple" className="right-[6%] top-44 h-[520px] w-[520px]" />

        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-18">
          <div className={reveal("wodh-deliver")}>
            <CenterHeader kicker={DATA.deliver.kicker} title={DATA.deliver.title} sub={DATA.deliver.sub} />

            <div className="mx-auto mt-14 max-w-5xl grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <div className="lg:sticky lg:top-24">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur transition hover:border-white/20 hover:shadow-[0_0_0_1px_rgba(158,243,21,0.08)]">
                  <div className="pointer-events-none absolute -inset-10 opacity-[0.28] blur-3xl">
                    <div className="absolute inset-0 bg-[radial-gradient(520px_220px_at_25%_25%,rgba(158,243,21,0.14),transparent_62%),radial-gradient(520px_220px_at_85%_20%,rgba(91,45,220,0.12),transparent_65%)]" />
                  </div>

                  <div className="relative">
                    <div className="text-xs uppercase tracking-[0.34em] text-white/45">Delivery OS</div>
                    <div className="mt-3 text-xl font-semibold text-white/90">Calm execution, engineered outcomes.</div>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      We don't rely on heroics. We rely on constraints, pipelines, and iteration loops — so premium holds up beyond the demo.
                    </p>

                    <div className="mt-6 space-y-3 text-sm text-white/65">
                      {[
                        "Versioned builds (no surprises)",
                        "Cross-discipline review loops",
                        "Performance budgets per platform",
                        "Release discipline + QA baked-in",
                      ].map((x) => (
                        <div key={x} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#9EF315]" />
                          <span>{x}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-7 h-px w-full bg-white/10" />
                    <div className="mt-6 flex flex-wrap gap-2">
                      {["Systems over heroics", "Premium under constraints", "Performance-first"].map((t) => (
                        <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute left-4 top-2 hidden h-[calc(100%-8px)] w-px bg-gradient-to-b from-white/15 via-white/10 to-transparent lg:block" />

                <div className="space-y-5">
                  {DATA.deliver.pillars.map((p, idx) => (
                    <HoverCard key={p.title} className="p-7" rounded="rounded-3xl">
                      <div className="hidden lg:block">
                        <div className="absolute left-[7px] top-8 h-3 w-3 rounded-full border border-white/15 bg-[#0C0722]">
                          {!reducedMotion ? (
                            <div
                              className="absolute inset-0 rounded-full bg-[#9EF315] opacity-70 blur-[1px]"
                              style={{ animation: "wodhNodePulse 2.8s ease-in-out infinite" }}
                            />
                          ) : (
                            <div className="absolute inset-0 rounded-full bg-[#9EF315] opacity-70 blur-[1px]" />
                          )}
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-base font-semibold text-white/92">{p.title}</div>
                          <p className="mt-2 text-sm leading-relaxed text-white/60">{p.desc}</p>
                        </div>
                        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <ul className="mt-5 space-y-2 text-sm text-white/65">
                        {p.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#9EF315]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </HoverCard>
                  ))}
                </div>

                <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white/90">Want the exact delivery shape?</div>
                      <div className="mt-1 text-sm text-white/60">We'll map scope → constraints → milestones → acceptance criteria.</div>
                    </div>
                    <ArrowButton href="/contact" variant="primary">
                      Start a conversation
                    </ArrowButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-14" />
            <SectionDivider reducedMotion={reducedMotion} />
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="wodh-team" className="relative">
        <AmbientGlow reducedMotion={reducedMotion} variant="purple" className="left-[4%] top-28 h-[560px] w-[560px]" />
        <AmbientGlow reducedMotion={reducedMotion} variant="mix" className="right-[6%] top-40 h-[520px] w-[520px]" />

        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className={reveal("wodh-team")}>
            <div className="text-center">
              <SectionKicker>{DATA.team.kicker}</SectionKicker>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">{DATA.team.title}</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/60">{DATA.team.sub}</p>
            </div>

            <div className="mx-auto mt-12 max-w-5xl">
              <div className="text-xs uppercase tracking-[0.34em] text-white/45">Leadership</div>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                {DATA.team.leadership.map((l) => (
                  <div
                    key={l.name}
                    className={cx(
                      "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur transition",
                      "hover:border-white/20 hover:-translate-y-0.5",
                      l.tone === "green"
                        ? "hover:shadow-[0_0_0_1px_rgba(158,243,21,0.12)]"
                        : l.tone === "purple"
                        ? "hover:shadow-[0_0_0_1px_rgba(91,45,220,0.14)]"
                        : "hover:shadow-[0_0_0_1px_rgba(158,243,21,0.10)]"
                    )}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={l.img}
                        alt={l.name}
                        className={cx(
                          "h-full w-full object-cover opacity-90 transition duration-300 will-change-transform",
                          "group-hover:opacity-100 group-hover:contrast-110 group-hover:saturate-110 group-hover:scale-[1.02]"
                        )}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(12,7,34,0.92),rgba(12,7,34,0.22),transparent)]" />

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C0722]/45 px-5 py-4 backdrop-blur">
                          <div className="pointer-events-none absolute -inset-10 opacity-0 blur-3xl transition duration-300 group-hover:opacity-100">
                            <div
                              className={cx(
                                "absolute inset-0",
                                l.tone === "green"
                                  ? "bg-[radial-gradient(520px_200px_at_25%_25%,rgba(158,243,21,0.16),transparent_62%)]"
                                  : l.tone === "purple"
                                  ? "bg-[radial-gradient(520px_200px_at_25%_25%,rgba(91,45,220,0.18),transparent_62%)]"
                                  : "bg-[radial-gradient(520px_200px_at_25%_25%,rgba(158,243,21,0.14),transparent_62%),radial-gradient(520px_200px_at_85%_20%,rgba(91,45,220,0.14),transparent_65%)]"
                              )}
                            />
                          </div>

                          <div className="relative">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-base font-semibold">{l.name}</div>
                                <div className="text-sm text-white/60">{l.role}</div>
                              </div>
                              <span
                                className={cx(
                                  "mt-1 inline-flex h-2.5 w-2.5 rounded-full",
                                  l.tone === "green"
                                    ? "bg-[#9EF315]"
                                    : l.tone === "purple"
                                    ? "bg-[#5B2DDC]"
                                    : "bg-[linear-gradient(135deg,#9EF315,#5B2DDC)]"
                                )}
                              />
                            </div>
                            <div className="mt-3 text-sm text-white/70">{l.specialty}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-xs uppercase tracking-[0.34em] text-white/45">Core team</div>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
                {DATA.team.members.map((m) => (
                  <div
                    key={`${m.name}-${m.role}`}
                    className={cx(
                      "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur transition",
                      "hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(91,45,220,0.10)]"
                    )}
                  >
                    <div className="relative aspect-[4/3] lg:aspect-[4/4] overflow-hidden">
                      <img
                        src={m.img}
                        alt={m.name}
                        className={cx(
                          "h-full w-full object-cover opacity-90 transition duration-300 will-change-transform",
                          "group-hover:opacity-100 group-hover:contrast-110 group-hover:saturate-110 group-hover:scale-[1.02]"
                        )}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(12,7,34,0.92),rgba(12,7,34,0.22),transparent)]" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C0722]/45 px-4 py-3 backdrop-blur">
                          <div className="pointer-events-none absolute -inset-10 opacity-0 blur-3xl transition duration-300 group-hover:opacity-100">
                            <div className="absolute inset-0 bg-[radial-gradient(420px_160px_at_25%_25%,rgba(91,45,220,0.14),transparent_62%),radial-gradient(420px_170px_at_85%_20%,rgba(158,243,21,0.10),transparent_65%)]" />
                          </div>
                          <div className="relative">
                            <div className="text-sm font-semibold">{m.name}</div>
                            <div className="text-xs text-white/60">{m.role}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold">If this resonates</div>
                    <div className="mt-2 text-sm text-white/60">
                      If you care about premium feel, clear decisions, and calm delivery — we should talk.
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <ArrowButton href="/contact" variant="primary">
                      Start a conversation
                    </ArrowButton>
                    <a
                      href="/work"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/85 transition hover:border-white/20 hover:bg-white/10"
                    >
                      See selected work
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10" />
              <SectionDivider reducedMotion={reducedMotion} />
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section id="wodh-proof" className="relative">
        <AmbientGlow reducedMotion={reducedMotion} variant="mix" className="left-[10%] top-10 h-[520px] w-[520px]" />

        <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
          <div className={reveal("wodh-proof")}>
            <CenterHeader kicker={DATA.proof.kicker} title={DATA.proof.title} sub={DATA.proof.sub} />

            <div className="mx-auto mt-12 max-w-5xl grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DATA.proof.stats.map((s) => (
                <HoverCard key={s.label} className="px-6 py-5">
                  <div className="text-lg font-semibold">{s.value}</div>
                  <div className="mt-1 text-sm text-white/60">{s.label}</div>
                </HoverCard>
              ))}
            </div>

            <div className="mx-auto mt-10 max-w-5xl">
              <div className="text-xs uppercase tracking-[0.34em] text-white/45">Client partners</div>
              <div className="mt-4">
                <Marquee items={DATA.proof.clients} reducedMotion={reducedMotion} />
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-5xl">
              <MiniMapCard reducedMotion={reducedMotion} />
            </div>

            <div className="mt-14" />
            <SectionDivider reducedMotion={reducedMotion} />
          </div>
        </div>
      </section>

      {/* BIG CTA */}
      <section id="wodh-closing" className="relative">
        <AmbientGlow reducedMotion={reducedMotion} variant="mix" className="left-[18%] bottom-0 h-[640px] w-[640px]" />

        <div className="mx-auto max-w-6xl px-5 py-28">
          <div className={reveal("wodh-closing")}>
            <div className="mx-auto max-w-6xl">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 sm:p-14 backdrop-blur">
                <div className="pointer-events-none absolute -inset-10 opacity-[0.32] blur-3xl">
                  <div className="absolute inset-0 bg-[radial-gradient(720px_320px_at_25%_35%,rgba(158,243,21,0.14),transparent_62%),radial-gradient(720px_320px_at_75%_25%,rgba(91,45,220,0.16),transparent_65%)]" />
                </div>

                <div className="relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
                  <div>
                    <div className="text-xs uppercase tracking-[0.34em] text-white/45">Start a conversation</div>
                    <h2 className="mt-4 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
                      {DATA.closing.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-white/60">{DATA.closing.sub}</p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <ArrowButton href={DATA.closing.primary.href} variant="primary">
                        {DATA.closing.primary.label}
                      </ArrowButton>
                      <a
                        href={DATA.closing.secondary.href}
                        className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/85 transition hover:border-white/20 hover:bg-white/10"
                      >
                        {DATA.closing.secondary.label}
                      </a>
                    </div>
                  </div>

                  <div className="relative rounded-3xl border border-white/10 bg-[#0C0722]/45 p-7">
                    <div className="text-sm font-semibold text-white/90">What you can expect</div>
                    <div className="mt-4 space-y-3 text-sm text-white/65">
                      {[
                        ["Clear scope", "Constraints + acceptance criteria defined early"],
                        ["Premium feel", "UX, motion, polish — validated continuously"],
                        ["Stable delivery", "Versioned builds + calm review rhythm"],
                        ["Performance", "Budgets respected on real devices"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#9EF315]" />
                          <div>
                            <div className="text-white/85 font-medium">{k}</div>
                            <div className="text-white/55">{v}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-7 h-px w-full bg-white/10" />
                    <div className="mt-6 text-xs text-white/45">Apple clarity • XR soul • game-studio discipline</div>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-xs text-white/40">© {new Date().getFullYear()} Wodh. Built with care.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


