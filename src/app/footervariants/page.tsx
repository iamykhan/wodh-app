"use client";

/**
 * WODH — Footer Playground (Variants A–D)
 * Put this file at:
 *   Next.js App Router:  app/footers-playground/page.tsx
 * Or Pages Router:      pages/footers-playground.tsx
 *
 * Requires: TailwindCSS
 * Optional: framer-motion (used). If you don't want it, tell me and I'll remove.
 */

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

/* --------------------------------- Utils --------------------------------- */

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

type StudioMode = "all" | "xr" | "games";
type FooterVariant = "A" | "B" | "C" | "D";

type NavItem = { label: string; href: string };
type NavGroup = { label: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    label: "Services",
    items: [
      { label: "XR Development", href: "/services/xr" },
      { label: "Game Development", href: "/services/games" },
      { label: "3D & Art", href: "/services/3d-art" },
      { label: "Creative Tech", href: "/services/creative-tech" },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { label: "All Work (Index)", href: "/portfolio" },
      { label: "XR Case Studies", href: "/portfolio/xr" },
      { label: "Game Case Studies", href: "/portfolio/games" },
      { label: "3D/Art Portfolio", href: "/portfolio/3d-art" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Blog", href: "/insights" },
      { label: "R&D", href: "/insights/rd" },
    ],
  },
];

const CONTACT: NavItem = { label: "Contact", href: "/contact" };

const SOCIAL: Array<{ label: string; href: string }> = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "ArtStation", href: "https://artstation.com" },
  { label: "Behance", href: "https://behance.net" },
];

function studioAccent(studio: StudioMode) {
  if (studio === "xr")
    return {
      name: "XR",
      glow: "rgba(158, 243, 21, 0.22)",
      line: "rgba(158, 243, 21, 0.58)",
      soft: "rgba(158, 243, 21, 0.10)",
    };
  if (studio === "games")
    return {
      name: "Games",
      glow: "rgba(91, 45, 220, 0.22)",
      line: "rgba(91, 45, 220, 0.60)",
      soft: "rgba(91, 45, 220, 0.10)",
    };
  return {
    name: "All",
    glow: "rgba(140, 160, 255, 0.16)",
    line: "rgba(140, 160, 255, 0.40)",
    soft: "rgba(140, 160, 255, 0.08)",
  };
}

/* ------------------------------- Page Demo -------------------------------- */

export default function FootersPlaygroundPage() {
  const [variant, setVariant] = useState<FooterVariant>("A");
  const [mode, setMode] = useState<"single" | "stacked">("single");
  const [studio, setStudio] = useState<StudioMode>("all");

  // persist studio mode + allow ?studio=xr|games|all
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qs = params.get("studio");
    const fromQS = (qs === "xr" || qs === "games" || qs === "all") ? (qs as StudioMode) : null;

    const fromLS = (window.localStorage.getItem("wodh:studio") as StudioMode | null) ?? null;
    const pick = fromQS ?? (fromLS === "xr" || fromLS === "games" || fromLS === "all" ? fromLS : null) ?? "all";
    setStudio(pick);
  }, []);

  const setStudioPersist = (next: StudioMode) => {
    setStudio(next);
    try {
      window.localStorage.setItem("wodh:studio", next);
      const url = new URL(window.location.href);
      url.searchParams.set("studio", next);
      window.history.replaceState({}, "", url.toString());
    } catch {}
  };

  const accent = studioAccent(studio);

  const variants: Array<{
    key: FooterVariant;
    name: string;
    sub: string;
    Component: React.FC<FooterProps>;
  }> = [
    { key: "A", name: "Variant A — CTA Band + Grid", sub: "Default / best all-around", Component: FooterA_CTABandGrid },
    { key: "B", name: "Variant B — Split XR vs Games", sub: "Most on-brand ‘two studios’", Component: FooterB_SplitStudios },
    { key: "C", name: "Variant C — Proof-First", sub: "Logos + stats before links", Component: FooterC_ProofFirst },
    { key: "D", name: "Variant D — Minimal Editorial", sub: "Cinematic ending for case studies", Component: FooterD_MinimalEditorial },
  ];

  const Selected = variants.find((v) => v.key === variant)?.Component ?? FooterA_CTABandGrid;

  return (
    <div className="min-h-screen bg-[#070814] text-white">
      {/* Atmospheric background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            `radial-gradient(900px 450px at 15% 0%, rgba(91,45,220,0.18), transparent 55%),
             radial-gradient(900px 520px at 85% 0%, rgba(158,243,21,0.14), transparent 55%),
             radial-gradient(1200px 700px at 50% 110%, rgba(120,140,255,0.10), transparent 55%),
             linear-gradient(180deg, #050615 0%, #070814 40%, #070814 100%)`,
        }}
      />
      <Noise />

      {/* Playground Controls */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#070814]/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 grid place-items-center">
                <span className="text-xs font-semibold tracking-wide">W</span>
              </div>
              <div>
                <div className="text-sm font-semibold">Footer Playground</div>
                <div className="text-xs text-white/60">Compare variants A–D</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Segmented
                value={mode}
                onChange={(v) => setMode(v as any)}
                options={[
                  { value: "single", label: "Single" },
                  { value: "stacked", label: "Stacked" },
                ]}
              />

              <Segmented
                value={studio}
                onChange={(v) => setStudioPersist(v as StudioMode)}
                options={[
                  { value: "all", label: "All" },
                  { value: "xr", label: "XR" },
                  { value: "games", label: "Games" },
                ]}
              />
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.key}
                onClick={() => setVariant(v.key)}
                className={cn(
                  "rounded-xl border px-3 py-2 text-left transition",
                  variant === v.key ? "border-white/20 bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/8"
                )}
              >
                <div className="text-xs font-semibold">{v.name}</div>
                <div className="text-[11px] text-white/60">{v.sub}</div>
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-white/60">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.line }} />
                Studio: <span className="text-white/85">{accent.name}</span>
              </span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Tip: use <span className="text-white/85">Stacked</span> to compare quickly</span>
            </div>
            <div className="hidden md:block">
              URL studio param: <span className="text-white/85">?studio=xr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page Body */}
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">Choose a footer ending.</h1>
          <p className="mt-3 max-w-2xl text-white/65">
            All variants reuse your locked navigation hierarchy and adapt accent glow by studio mode.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card title="CTA-first" text="Footers should convert, not just list links." />
          <Card title="Trust-forward" text="Proof chips/logos/locations reduce friction." />
          <Card title="Mobile clean" text="Accordion nav, no mega grid overload." />
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-sm font-semibold">Scroll filler</div>
          <p className="mt-2 max-w-2xl text-sm text-white/60">
            This filler exists so you can see spacing rhythm above the footer.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl border border-white/10 bg-white/5" />
            ))}
          </div>
        </div>
      </main>

      {/* Footer Preview */}
      <div className="mt-8">
        {mode === "single" ? (
          <Selected nav={NAV} contact={CONTACT} social={SOCIAL} studio={studio} />
        ) : (
          <div className="space-y-10 pb-16">
            {variants.map((v) => (
              <div key={v.key} className="mx-auto max-w-6xl px-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{v.name}</div>
                    <div className="text-xs text-white/60">{v.sub}</div>
                  </div>
                  <button
                    onClick={() => setVariant(v.key)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10"
                  >
                    Set as active
                  </button>
                </div>
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <v.Component nav={NAV} contact={CONTACT} social={SOCIAL} studio={studio} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* --------------------------------- Types ---------------------------------- */

type FooterProps = {
  nav: NavGroup[];
  contact: NavItem;
  social: Array<{ label: string; href: string }>;
  studio: StudioMode;
};

/* ------------------------------- Variant A --------------------------------- */
/** CTA Band + 4-column grid + bottom utility bar (best default). */
function FooterA_CTABandGrid({ nav, contact, social, studio }: FooterProps) {
  const accent = studioAccent(studio);
  return (
    <footer className="border-t border-white/10 bg-[#050613]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* CTA Band */}
        <div
          className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
          style={{ boxShadow: `0 0 80px ${accent.glow}` }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.line }} />
                One team. Two studios.
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                Let’s build something that feels impossible.
              </h3>
              <p className="mt-2 max-w-xl text-sm text-white/65">
                Premium production, clean handoffs, and a senior team that ships. NDA-friendly by default.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href={contact.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/15"
                style={{ boxShadow: `0 0 50px ${accent.glow}` }}
              >
                Start a Project <ArrowIcon className="h-4 w-4" />
              </Link>
              <Link
                href={contact.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Email Us <MailIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["NDA-friendly", "Global delivery", "Senior team", "Rapid prototypes"].map((chip) => (
              <span key={chip} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                {chip}
              </span>
            ))}
          </div>

          <div
            className="mt-6 h-px w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${accent.line}, transparent)` }}
          />
        </div>

        {/* Main grid */}
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <BrandBlock />
            <div className="mt-4 flex flex-wrap gap-2">
              {["XR", "Games", "3D", "Creative Tech"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-8">
            <FooterGrid nav={nav} contact={contact} />
          </div>
        </div>

        <FooterBottom social={social} />
      </div>
    </footer>
  );
}

/* ------------------------------- Variant B --------------------------------- */
/** Split panels: XR + Games with separate actions, then link grid. */
function FooterB_SplitStudios({ nav, contact, social, studio }: FooterProps) {
  const accent = studioAccent(studio);
  const xr = studioAccent("xr");
  const games = studioAccent("games");

  return (
    <footer className="border-t border-white/10 bg-[#050613]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Split CTA */}
        <div className="grid gap-4 md:grid-cols-2">
          <div
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
            style={{ boxShadow: `0 0 70px ${xr.glow}` }}
          >
            <div className="text-xs text-white/65">XR Studio</div>
            <div className="mt-2 text-xl font-semibold">Spatial products, training, and simulators.</div>
            <p className="mt-2 text-sm text-white/65">Vision Pro • Quest • Pico • Unity/Unreal</p>
            <div className="mt-5 flex gap-2">
              <Link
                href="/portfolio/xr"
                className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/15"
                style={{ boxShadow: `0 0 40px ${xr.glow}` }}
              >
                View XR Work <ArrowIcon className="h-4 w-4 inline" />
              </Link>
              <Link
                href={contact.href}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 hover:bg-white/10"
              >
                Start XR Project
              </Link>
            </div>
          </div>

          <div
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
            style={{ boxShadow: `0 0 70px ${games.glow}` }}
          >
            <div className="text-xs text-white/65">Games Studio</div>
            <div className="mt-2 text-xl font-semibold">Full-cycle game production and polish.</div>
            <p className="mt-2 text-sm text-white/65">Gameplay systems • Multiplayer • Live ops</p>
            <div className="mt-5 flex gap-2">
              <Link
                href="/portfolio/games"
                className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/15"
                style={{ boxShadow: `0 0 40px ${games.glow}` }}
              >
                View Game Work <ArrowIcon className="h-4 w-4 inline" />
              </Link>
              <Link
                href={contact.href}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/85 hover:bg-white/10"
              >
                Start Game Project
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mt-8 h-px w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accent.line}, transparent)` }}
        />

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <BrandBlock />
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/65">
              <div className="font-semibold text-white">One team. Two studios.</div>
              <div className="mt-2 text-sm text-white/60">Same pipeline, same standards — two creative directions.</div>
            </div>
          </div>

          <div className="md:col-span-8">
            <FooterGrid nav={nav} contact={contact} />
          </div>
        </div>

        <FooterBottom social={social} />
      </div>
    </footer>
  );
}

/* ------------------------------- Variant C --------------------------------- */
/** Proof-first: logos + stats strip, then a smaller CTA + links. */
function FooterC_ProofFirst({ nav, contact, social, studio }: FooterProps) {
  const accent = studioAccent(studio);

  return (
    <footer className="border-t border-white/10 bg-[#050613]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Proof strip */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs text-white/60">Trusted by teams that ship.</div>
              <div className="mt-2 text-xl font-semibold">Proof, not promises.</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Senior team", "Client-ready handoff", "NDA-friendly", "Global delivery"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-12 rounded-2xl border border-white/10 bg-white/5 grid place-items-center text-xs text-white/55">
                Logo
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {[
              { k: "8+ years", v: "Production experience" },
              { k: "XR + Games", v: "Two studio tracks" },
              { k: "3D Pipeline", v: "Art & lookdev ready" },
              { k: "Fast prototyping", v: "Weeks, not months" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-lg font-semibold">{s.k}</div>
                <div className="mt-1 text-xs text-white/60">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Smaller CTA */}
        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold">Ready to start?</div>
            <div className="text-sm text-white/60">Tell us what you’re building — we’ll map a production plan.</div>
          </div>
          <div className="flex gap-2">
            <Link
              href={contact.href}
              className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/15"
              style={{ boxShadow: `0 0 50px ${accent.glow}` }}
            >
              Start a Project <ArrowIcon className="h-4 w-4 inline" />
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
            >
              View Work
            </Link>
          </div>
        </div>

        <div
          className="mt-8 h-px w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accent.line}, transparent)` }}
        />

        {/* Links */}
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <BrandBlock />
          </div>
          <div className="md:col-span-8">
            <FooterGrid nav={nav} contact={contact} />
          </div>
        </div>

        <FooterBottom social={social} />
      </div>
    </footer>
  );
}

/* ------------------------------- Variant D --------------------------------- */
/** Minimal editorial: big line + featured card + condensed links. */
function FooterD_MinimalEditorial({ nav, contact, social, studio }: FooterProps) {
  const accent = studioAccent(studio);

  const featured = useMemo(() => {
    if (studio === "xr") return { title: "XR Training Simulator", href: "/portfolio/xr", meta: "Quest • Vision Pro • Pico" };
    if (studio === "games") return { title: "Arena Prototype", href: "/portfolio/games", meta: "Systems • Netcode • Polish" };
    return { title: "Cinematic 3D Lookdev", href: "/portfolio/3d-art", meta: "Lighting • Lookdev • Renders" };
  }, [studio]);

  // Condense nav into fewer columns visually
  const condensed = useMemo(() => {
    const pick = (label: string) => nav.find((g) => g.label === label);
    return [pick("Services"), pick("Portfolio"), pick("Company"), pick("Insights")].filter(Boolean) as NavGroup[];
  }, [nav]);

  return (
    <footer className="border-t border-white/10 bg-[#050613]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="text-xs text-white/60">A clean ending.</div>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              Craft, clarity, and delivery — every time.
            </h3>
            <p className="mt-3 max-w-xl text-sm text-white/65">
              Wodh builds premium XR and games with a production pipeline you can trust.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["One team. Two studios.", "NDA-friendly", "Client-ready handoff"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <Link
                href={contact.href}
                className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/15"
                style={{ boxShadow: `0 0 60px ${accent.glow}` }}
              >
                Start a Project <ArrowIcon className="h-4 w-4 inline" />
              </Link>
              <Link
                href={contact.href}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <Link
              href={featured.href}
              className="group block rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
              style={{ boxShadow: `0 0 70px ${accent.glow}` }}
            >
              <div className="text-xs text-white/60">Featured work</div>
              <div className="mt-2 text-xl font-semibold">{featured.title}</div>
              <div className="mt-1 text-sm text-white/65">{featured.meta}</div>
              <div
                className="mt-5 h-px w-full"
                style={{ background: `linear-gradient(90deg, transparent, ${accent.line}, transparent)` }}
              />
              <div className="mt-3 inline-flex items-center gap-2 text-xs text-white/85">
                Explore <ArrowIcon className="h-4 w-4 opacity-80 group-hover:opacity-100" />
              </div>
            </Link>
          </div>
        </div>

        <div
          className="mt-10 h-px w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accent.line}, transparent)` }}
        />

        {/* Condensed links */}
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <BrandBlock />
          </div>
          <div className="md:col-span-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {condensed.map((g) => (
                <div key={g.label}>
                  <div className="text-xs font-semibold text-white/70">{g.label}</div>
                  <div className="mt-4 space-y-2">
                    {g.items.map((it) => (
                      <FooterLink key={it.href} href={it.href} label={it.label} />
                    ))}
                  </div>
                </div>
              ))}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="text-xs font-semibold text-white/70">Contact</div>
                <div className="mt-4 space-y-2 text-sm text-white/65">
                  <Link className="block hover:text-white" href={contact.href}>
                    {contact.label}
                  </Link>
                  <div className="text-xs text-white/55">Pakistan • UAE • UK • USA</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterBottom social={social} />
      </div>
    </footer>
  );
}

/* ------------------------------ Shared Parts ------------------------------- */

function BrandBlock() {
  return (
    <div>
      <Link href="/" className="inline-flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 grid place-items-center">
          <span className="text-xs font-semibold tracking-widest">W</span>
        </div>
        <div>
          <div className="text-sm font-semibold">Wodh</div>
          <div className="text-xs text-white/55">Premium XR & Game Studio</div>
        </div>
      </Link>

      <p className="mt-4 max-w-sm text-sm text-white/65">
        One pipeline, two studio tracks — built for quality, clarity, and delivery.
      </p>
    </div>
  );
}

function FooterGrid({ nav, contact }: { nav: NavGroup[]; contact: NavItem }) {
  // Desktop grid, mobile accordion
  return (
    <>
      <div className="hidden md:grid grid-cols-4 gap-8">
        {nav.map((g) => (
          <div key={g.label}>
            <div className="text-xs font-semibold text-white/70">{g.label}</div>
            <div className="mt-4 space-y-2">
              {g.items.map((it) => (
                <FooterLink key={it.href} href={it.href} label={it.label} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile accordion */}
      <div className="md:hidden">
        <AccordionGroups groups={nav} />
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs font-semibold text-white/70">Contact</div>
          <div className="mt-2 text-sm text-white/65">
            <Link href={contact.href} className="hover:text-white">
              {contact.label}
            </Link>
          </div>
          <div className="mt-2 text-xs text-white/55">Pakistan • UAE • UK • USA</div>
        </div>
      </div>
    </>
  );
}

function FooterBottom({ social }: { social: Array<{ label: string; href: string }> }) {
  return (
    <div className="mt-10 border-t border-white/10 pt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-xs text-white/55">© {new Date().getFullYear()} Wodh (Dev House). All rights reserved.</div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/privacy" className="text-xs text-white/55 hover:text-white">Privacy</Link>
          <Link href="/terms" className="text-xs text-white/55 hover:text-white">Terms</Link>
          <span className="h-4 w-px bg-white/10" />
          {social.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-xs text-white/55 hover:text-white">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group block text-sm text-white/65 hover:text-white">
      <span className="relative">
        {label}
        <span className="absolute -bottom-1 left-0 h-px w-full scale-x-0 origin-left bg-white/30 transition group-hover:scale-x-100" />
      </span>
    </Link>
  );
}

/* ------------------------------ Mobile Accordion --------------------------- */

function AccordionGroups({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = useState<string | null>(groups[0]?.label ?? null);

  return (
    <div className="space-y-3">
      {groups.map((g) => (
        <div key={g.label} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <button
            onClick={() => setOpen(open === g.label ? null : g.label)}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
          >
            <div className="text-sm font-semibold">{g.label}</div>
            <ChevronIcon className={cn("h-4 w-4 transition", open === g.label ? "rotate-180" : "")} />
          </button>

          <AnimatePresence initial={false}>
            {open === g.label ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-2 pb-2"
              >
                {g.items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className="block rounded-xl px-3 py-3 text-sm text-white/75 hover:bg-white/10"
                  >
                    {it.label}
                  </Link>
                ))}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ UI Controls -------------------------------- */

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs transition",
              active ? "bg-white/12 text-white" : "text-white/70 hover:text-white"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm font-semibold">{title}</div>
      <p className="mt-2 text-sm text-white/65">{text}</p>
      <div className="mt-5 h-20 rounded-2xl border border-white/10 bg-white/5" />
    </div>
  );
}

/* ------------------------------ Noise Layer -------------------------------- */

function Noise() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.08]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/* --------------------------------- Icons ---------------------------------- */

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 7h8v8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M4 7.5h16v9H4v-9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M4.8 8.2 12 13l7.2-4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
