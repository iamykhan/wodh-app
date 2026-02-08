"use client";

/**
 * WODH — Header Playground (Option 1)
 * Drop this file into ONE of these locations:
 * 1) Next.js App Router:  app/headers-playground/page.tsx
 * 2) Next.js Pages Router: pages/headers-playground.tsx
 *
 * Tailwind required. Framer Motion optional but supported (used here).
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* --------------------------------- Helpers -------------------------------- */


type StudioMode = "all" | "xr" | "games";
type HeaderVariant = "A" | "B" | "C" | "D" | "E" | "F";
type PageContext = "default" | "services" | "case-study" | "insights";

type NavItem = { label: string; href: string; desc?: string };
type NavGroup = { label: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    label: "Services",
    items: [
      { label: "XR Development", href: "/services/xr", desc: "Spatial apps, training, simulators, product demos." },
      { label: "Game Development", href: "/services/games", desc: "Full-cycle game production, multiplayer, live ops." },
      { label: "3D & Art", href: "/services/3d-art", desc: "Characters, environments, lookdev, cinematic shots." },
      { label: "Creative Tech", href: "/services/creative-tech", desc: "Installations, AR, webGL, interactive experiences." },
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

function studioAccent(studio: StudioMode) {
  // keep base indigo/black + accent halo
  if (studio === "xr") return { name: "XR", pill: "XR", glow: "rgba(158, 243, 21, 0.22)", line: "rgba(158, 243, 21, 0.55)" };
  if (studio === "games") return { name: "Games", pill: "Games", glow: "rgba(91, 45, 220, 0.22)", line: "rgba(91, 45, 220, 0.55)" };
  return { name: "All", pill: "All", glow: "rgba(140, 160, 255, 0.16)", line: "rgba(140, 160, 255, 0.35)" };
}

function useStickyShadow() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

/* ------------------------------ Playground Page ----------------------------- */

export default function HeaderPlaygroundPage() {
  const [variant, setVariant] = useState<HeaderVariant>("B");
  const [mode, setMode] = useState<"single" | "stacked">("single");
  const [context, setContext] = useState<PageContext>("default");
  const [studio, setStudio] = useState<StudioMode>("all");

  // Hide global header on this page
  useEffect(() => {
    const header = document.querySelector('header.fixed, header[class*="fixed"]');
    if (header) {
      (header as HTMLElement).style.display = 'none';
    }
    return () => {
      if (header) {
        (header as HTMLElement).style.display = '';
      }
    };
  }, []);

  // Load studio from URL (?studio=xr|games|all) or localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qs = params.get("studio");
    const fromQS = (qs === "xr" || qs === "games" || qs === "all") ? (qs as StudioMode) : null;

    const fromLS = (typeof window !== "undefined" ? (window.localStorage.getItem("wodh:studio") as StudioMode | null) : null);
    const pick = fromQS ?? (fromLS === "xr" || fromLS === "games" || fromLS === "all" ? fromLS : null) ?? "all";

    setStudio(pick);
  }, []);

  const accent = useMemo(() => studioAccent(studio), [studio]);

  const headerProps = {
    nav: NAV,
    contact: CONTACT,
    studio,
    setStudio: (next: StudioMode) => {
      setStudio(next);
      try {
        window.localStorage.setItem("wodh:studio", next);
        const url = new URL(window.location.href);
        url.searchParams.set("studio", next);
        window.history.replaceState({}, "", url.toString());
      } catch {}
    },
    context,
  } as const;

  const variants: Array<{ key: HeaderVariant; name: string; sub: string; Component: React.FC<HeaderProps> }> = [
    { key: "A", name: "Variant A — Glass Minimal", sub: "Apple-clean, one-row", Component: HeaderA_GlassMinimal },
    { key: "B", name: "Variant B — Studio Switch", sub: "XR vs Games segmented", Component: HeaderB_StudioSwitch },
    { key: "C", name: "Variant C — Mega Menu", sub: "Big dropdown panels", Component: HeaderC_MegaMenu },
    { key: "D", name: "Variant D — Command Bar", sub: "Search-first, compact nav", Component: HeaderD_CommandBar },
    { key: "E", name: "Variant E — Double Decker", sub: "2nd row anchors per page", Component: HeaderE_DoubleDecker },
    { key: "F", name: "Variant F — Floating Cinematic", sub: "Rounded pill, minimal", Component: HeaderF_FloatingPill },
  ];

  const Selected = variants.find((v) => v.key === variant)?.Component ?? HeaderB_StudioSwitch;

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
                <div className="text-sm font-semibold">Header Playground</div>
                <div className="text-xs text-white/60">Compare variants A–F with locked nav hierarchy</div>
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
                value={context}
                onChange={(v) => setContext(v as PageContext)}
                options={[
                  { value: "default", label: "Default" },
                  { value: "services", label: "Services" },
                  { value: "case-study", label: "Case Study" },
                  { value: "insights", label: "Insights" },
                ]}
              />

              <div className="hidden md:block h-6 w-px bg-white/10 mx-1" />

              <Segmented
                value={studio}
                onChange={(v) => headerProps.setStudio(v as StudioMode)}
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
                  variant === v.key
                    ? "border-white/20 bg-white/10"
                    : "border-white/10 bg-white/5 hover:bg-white/8"
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
              URL studio param supported: <span className="text-white/85">?studio=xr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Pick the header that matches Wodh’s vibe.
          </h1>
          <p className="mt-2 max-w-2xl text-white/65">
            Indigo/black base, glass blur, and accent halos that adapt to XR (green) or Games (purple).
          </p>
        </div>

        {mode === "single" ? (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <Selected {...headerProps} />
            <MockPageBody context={context} />
          </div>
        ) : (
          <div className="space-y-10">
            {variants.map((v) => (
              <div key={v.key} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
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
                <v.Component {...headerProps} />
                <MockPageBody context={context} compact />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* --------------------------------- Types ---------------------------------- */

type HeaderProps = {
  nav: NavGroup[];
  contact: NavItem;
  studio: StudioMode;
  setStudio: (s: StudioMode) => void;
  context: PageContext;
};

/* -------------------------- Shared Header Building -------------------------- */

function Brand({ subtitle }: { subtitle?: string }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(10px 10px at 30% 30%, rgba(255,255,255,0.35), transparent 55%), radial-gradient(18px 18px at 70% 60%, rgba(255,255,255,0.18), transparent 60%)",
          }}
        />
        <div className="relative grid h-full w-full place-items-center">
          <span className="text-xs font-semibold tracking-widest">W</span>
        </div>
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold tracking-tight">Wodh</div>
        {subtitle ? <div className="text-[11px] text-white/55">{subtitle}</div> : null}
      </div>
    </Link>
  );
}

function CTA({ studio }: { studio: StudioMode }) {
  const accent = studioAccent(studio);
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/contact"
        className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
      >
        <MailIcon className="h-4 w-4" />
        Email
      </Link>

      <Link
        href="/contact"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/15"
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 40px ${accent.glow}`,
        }}
      >
        Start a Project
        <ArrowIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}

function StudioSwitch({ studio, setStudio }: { studio: StudioMode; setStudio: (s: StudioMode) => void }) {
  const accent = studioAccent(studio);
  return (
    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1">
      {(["all", "xr", "games"] as StudioMode[]).map((m) => {
        const active = studio === m;
        const label = m === "all" ? "All" : m === "xr" ? "XR" : "Games";
        return (
          <button
            key={m}
            onClick={() => setStudio(m)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs transition",
              active ? "bg-white/12 text-white" : "text-white/70 hover:text-white"
            )}
            style={active ? { boxShadow: `0 0 26px ${accent.glow}` } : undefined}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function DesktopNavInline({ nav, studio }: { nav: NavGroup[]; studio: StudioMode }) {
  const accent = studioAccent(studio);
  return (
    <nav className="hidden lg:flex items-center gap-6 text-sm">
      {nav.map((g) => (
        <div key={g.label} className="text-white/75 hover:text-white transition">
          <span className="relative">
            {g.label}
            <span
              className="absolute -bottom-2 left-0 h-px w-0 transition-all group-hover:w-full"
              style={{ background: accent.line }}
            />
          </span>
        </div>
      ))}
      <Link
        href={CONTACT.href}
        className="text-white/75 hover:text-white transition"
      >
        Contact
      </Link>
    </nav>
  );
}

/* ------------------------------ Mobile Drawer ------------------------------ */

function MobileMenu({
  open,
  onClose,
  nav,
  studio,
  setStudio,
  contact,
}: {
  open: boolean;
  onClose: () => void;
  nav: NavGroup[];
  studio: StudioMode;
  setStudio: (s: StudioMode) => void;
  contact: NavItem;
}) {
  const accent = studioAccent(studio);
  const [expanded, setExpanded] = useState<string | null>(nav[0]?.label ?? null);

  useEffect(() => {
    if (open) setExpanded(nav[0]?.label ?? null);
  }, [open, nav]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-[#070814]/95 backdrop-blur-xl"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <Brand subtitle="Menu" />
              <button
                onClick={onClose}
                className="rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                aria-label="Close menu"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs text-white/60">Studio</div>
                <StudioSwitch studio={studio} setStudio={setStudio} />
              </div>

              <div className="mt-5 space-y-3">
                {nav.map((g) => (
                  <div key={g.label} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                    <button
                      className="w-full px-4 py-3 flex items-center justify-between text-left"
                      onClick={() => setExpanded(expanded === g.label ? null : g.label)}
                    >
                      <div className="text-sm font-semibold">{g.label}</div>
                      <ChevronIcon className={cn("h-4 w-4 transition", expanded === g.label ? "rotate-180" : "")} />
                    </button>

                    <AnimatePresence initial={false}>
                      {expanded === g.label ? (
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
                              onClick={onClose as any}
                              className="block rounded-xl px-3 py-3 text-sm text-white/80 hover:bg-white/10"
                            >
                              <div className="flex items-center justify-between">
                                <span>{it.label}</span>
                                <span className="text-[11px] text-white/45">↗</span>
                              </div>
                              {it.desc ? <div className="mt-1 text-[11px] text-white/50">{it.desc}</div> : null}
                            </Link>
                          ))}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/60">Quick actions</div>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={contact.href}
                    onClick={onClose as any}
                    className="flex-1 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-center hover:bg-white/15"
                    style={{ boxShadow: `0 0 40px ${accent.glow}` }}
                  >
                    Contact
                  </Link>
                  <Link
                    href="/portfolio"
                    onClick={onClose as any}
                    className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-center hover:bg-white/10"
                  >
                    View Work
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4 text-[11px] text-white/55">
              One team. Two studios. • Pakistan • UAE • UK • USA
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ------------------------------ Variant A ---------------------------------- */
/** Glass Minimal: logo + inline labels + CTA. */
function HeaderA_GlassMinimal(props: HeaderProps) {
  const { nav, contact, studio } = props;
  const scrolled = useStickyShadow();
  const accent = studioAccent(studio);
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl",
          scrolled ? "bg-[#070814]/80" : "bg-[#070814]/55"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Brand subtitle="One team. Two studios." />

            <div className="hidden lg:flex items-center gap-6">
              <DesktopNavLinksMinimal nav={nav} contact={contact} studio={studio} />
            </div>

            <div className="flex items-center gap-2">
              <CTA studio={studio} />
              <button
                className="lg:hidden rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* subtle accent line */}
          <div className="mt-3 h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${accent.line}, transparent)` }} />
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} nav={nav} studio={props.studio} setStudio={props.setStudio} contact={props.contact} />
    </>
  );
}

/* ------------------------------ Variant B ---------------------------------- */
/** Studio Switch: signature segmented control. */
function HeaderB_StudioSwitch(props: HeaderProps) {
  const { nav, contact, studio, setStudio } = props;
  const scrolled = useStickyShadow();
  const accent = studioAccent(studio);
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl",
          scrolled ? "bg-[#070814]/82" : "bg-[#070814]/60"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <Brand subtitle="XR & Game Studio" />

            <div className="hidden xl:flex items-center gap-4">
              <StudioSwitch studio={studio} setStudio={setStudio} />
              <DesktopNavLinksMinimal nav={nav} contact={contact} studio={studio} />
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <StudioSwitch studio={studio} setStudio={setStudio} />
              </div>
              <CTA studio={studio} />
              <button
                className="xl:hidden rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-[11px] text-white/55">
              {studio === "xr" ? "Spatial systems, training, simulators, product demos." : studio === "games" ? "Game production, multiplayer, polish, live ops." : "End-to-end XR, Games, 3D & Creative Tech."}
            </div>
            <div className="hidden md:block text-[11px] text-white/50">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.line }} />
                Accent adapts to studio mode
              </span>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} nav={nav} studio={props.studio} setStudio={props.setStudio} contact={props.contact} />
    </>
  );
}

/* ------------------------------ Variant C ---------------------------------- */
/** Mega Menu: hover panels for groups + featured card. */
function HeaderC_MegaMenu(props: HeaderProps) {
  const { nav, contact, studio } = props;
  const scrolled = useStickyShadow();
  const accent = studioAccent(studio);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const hoverRef = useRef<number | null>(null);

  const featured = useMemo(() => {
    // dummy featured (can wire to CMS later)
    const isXR = studio === "xr";
    return {
      title: isXR ? "XR Training Simulator" : studio === "games" ? "Competitive Arena Prototype" : "Cinematic 3D Lookdev",
      label: isXR ? "XR Case Study" : studio === "games" ? "Game Case Study" : "3D Portfolio",
      href: isXR ? "/portfolio/xr" : studio === "games" ? "/portfolio/games" : "/portfolio/3d-art",
      meta: "Pipeline → Build → Polish",
    };
  }, [studio]);

  const onEnter = (label: string) => {
    if (hoverRef.current) window.clearTimeout(hoverRef.current);
    setHover(label);
  };
  const onLeave = () => {
    hoverRef.current = window.setTimeout(() => setHover(null), 120);
  };

  return (
    <>
      <header className={cn("sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl", scrolled ? "bg-[#070814]/84" : "bg-[#070814]/62")}>
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <Brand subtitle="Premium production, enterprise-ready." />

            {/* Mega nav */}
            <div className="hidden lg:flex items-center gap-3">
              {nav.map((g) => (
                <div
                  key={g.label}
                  className="relative"
                  onMouseEnter={() => onEnter(g.label)}
                  onMouseLeave={onLeave}
                >
                  <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10">
                    {g.label}
                    <ChevronIcon className="h-4 w-4 opacity-80" />
                  </button>

                  <AnimatePresence>
                    {hover === g.label ? (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-[52px] w-[720px] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0b1c]/92 backdrop-blur-xl shadow-2xl"
                        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 60px ${accent.glow}` }}
                        onMouseEnter={() => onEnter(g.label)}
                        onMouseLeave={onLeave}
                      >
                        <div className="grid grid-cols-12 gap-0">
                          <div className="col-span-7 p-5">
                            <div className="text-xs text-white/60 mb-3">{g.label}</div>
                            <div className="grid gap-2">
                              {g.items.map((it) => (
                                <Link
                                  key={it.href}
                                  href={it.href}
                                  className="group rounded-2xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="text-sm font-semibold">{it.label}</div>
                                    <ArrowIcon className="h-4 w-4 opacity-70 group-hover:opacity-100" />
                                  </div>
                                  {it.desc ? <div className="mt-1 text-[11px] text-white/55">{it.desc}</div> : null}
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div className="col-span-5 border-l border-white/10 p-5">
                            <div className="text-xs text-white/60 mb-3">Featured</div>
                            <Link
                              href={featured.href}
                              className="block rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
                            >
                              <div className="text-[11px] text-white/60">{featured.label}</div>
                              <div className="mt-2 text-lg font-semibold">{featured.title}</div>
                              <div className="mt-2 text-sm text-white/65">{featured.meta}</div>
                              <div className="mt-4 h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${accent.line}, transparent)` }} />
                              <div className="mt-3 inline-flex items-center gap-2 text-xs text-white/80">
                                Explore <ArrowIcon className="h-4 w-4" />
                              </div>
                            </Link>
                            <div className="mt-4 text-[11px] text-white/50">
                              Hint: this slot can rotate through latest case studies later.
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ))}

              <Link href={contact.href} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10">
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <CTA studio={studio} />
              <button
                className="lg:hidden rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-3 h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${accent.line}, transparent)` }} />
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} nav={nav} studio={props.studio} setStudio={props.setStudio} contact={props.contact} />
    </>
  );
}

/* ------------------------------ Variant D ---------------------------------- */
/** Command Bar: search-first center, nav compact. */
function HeaderD_CommandBar(props: HeaderProps) {
  const { nav, contact, studio } = props;
  const scrolled = useStickyShadow();
  const accent = studioAccent(studio);
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={cn("sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl", scrolled ? "bg-[#070814]/86" : "bg-[#070814]/62")}>
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <Brand subtitle="Command-style navigation" />

            {/* Command bar */}
            <div className="hidden md:flex flex-1 items-center justify-center px-3">
              <div
                className="flex w-full max-w-xl items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5"
                style={{ boxShadow: `0 0 50px ${accent.glow}` }}
              >
                <SearchIcon className="h-4 w-4 opacity-70" />
                <input
                  placeholder="Search case studies, services, R&D…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-white/45"
                />
                <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/55">⌘ K</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/portfolio"
                className="hidden lg:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
              >
                Work
              </Link>
              <Link
                href="/services"
                className="hidden lg:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
              >
                Services
              </Link>
              <Link
                href={contact.href}
                className="hidden lg:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
              >
                Contact
              </Link>

              <CTA studio={studio} />
              <button
                className="lg:hidden rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* mini quick links row */}
          <div className="mt-3 hidden md:flex items-center gap-2 text-[11px] text-white/55">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.line }} />
              Quick:
            </span>
            {nav.flatMap((g) => g.items.slice(0, 1)).slice(0, 4).map((it) => (
              <Link key={it.href} href={it.href} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 hover:bg-white/10">
                {it.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} nav={nav} studio={props.studio} setStudio={props.setStudio} contact={props.contact} />
    </>
  );
}

/* ------------------------------ Variant E ---------------------------------- */
/** Double Decker: second row appears as contextual anchor bar. */
function HeaderE_DoubleDecker(props: HeaderProps) {
  const { nav, contact, studio, context } = props;
  const scrolled = useStickyShadow();
  const accent = studioAccent(studio);
  const [open, setOpen] = useState(false);

  const anchors: Array<{ label: string; href: string }> = useMemo(() => {
    if (context === "services") return [
      { label: "Offerings", href: "#offerings" },
      { label: "Platforms", href: "#platforms" },
      { label: "Tools", href: "#tools" },
      { label: "Projects", href: "#projects" },
      { label: "FAQ", href: "#faq" },
    ];
    if (context === "case-study") return [
      { label: "Overview", href: "#overview" },
      { label: "Challenge", href: "#challenge" },
      { label: "Pipeline", href: "#pipeline" },
      { label: "Deliverables", href: "#deliverables" },
      { label: "Results", href: "#results" },
    ];
    if (context === "insights") return [
      { label: "Latest", href: "#latest" },
      { label: "R&D", href: "#rd" },
      { label: "Categories", href: "#categories" },
      { label: "Newsletter", href: "#newsletter" },
    ];
    return [];
  }, [context]);

  return (
    <>
      <header className={cn("sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl", scrolled ? "bg-[#070814]/88" : "bg-[#070814]/62")}>
        <div className="mx-auto max-w-6xl px-4 pt-4">
          <div className="flex items-center justify-between gap-3 pb-4">
            <Brand subtitle="Context-aware navigation" />
            <div className="hidden lg:flex items-center gap-4">
              <DesktopNavLinksMinimal nav={nav} contact={contact} studio={studio} />
            </div>
            <div className="flex items-center gap-2">
              <CTA studio={studio} />
              <button
                className="lg:hidden rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {anchors.length ? (
            <div className="pb-4">
              <div className="flex flex-wrap items-center gap-2">
                {anchors.map((a) => (
                  <a
                    key={a.href}
                    href={a.href}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/75 hover:bg-white/10"
                    style={{ boxShadow: `0 0 30px ${accent.glow}` }}
                  >
                    {a.label}
                  </a>
                ))}
                <span className="ml-auto hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.line }} />
                  Sticky anchors for long pages
                </span>
              </div>
            </div>
          ) : null}

          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${accent.line}, transparent)` }} />
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} nav={nav} studio={props.studio} setStudio={props.setStudio} contact={props.contact} />
    </>
  );
}

/* ------------------------------ Variant F ---------------------------------- */
/** Floating pill header: cinematic rounded capsule. */
function HeaderF_FloatingPill(props: HeaderProps) {
  const { nav, contact, studio } = props;
  const scrolled = useStickyShadow();
  const accent = studioAccent(studio);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-40 pt-4">
        <div className="mx-auto max-w-6xl px-4">
          <div
            className={cn(
              "rounded-3xl border border-white/10 backdrop-blur-xl",
              scrolled ? "bg-[#070814]/86" : "bg-[#070814]/60"
            )}
            style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 0 70px ${accent.glow}` }}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <Brand subtitle="Floating cinematic" />

              <div className="hidden lg:flex items-center gap-3">
                <Link href="/portfolio" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10">
                  Work
                </Link>
                <Link href="/services" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10">
                  Services
                </Link>
                <Link href="/about" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10">
                  Company
                </Link>
                <Link href={contact.href} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10">
                  Contact
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <CTA studio={studio} />
                <button
                  className="lg:hidden rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10"
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                >
                  <MenuIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="px-4 pb-3">
              <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${accent.line}, transparent)` }} />
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-white/55">
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Client-ready</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">NDA-friendly</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">Enterprise pipeline</span>
                <span className="ml-auto hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent.line }} />
                  Smooth, minimal, “wow”
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} nav={nav} studio={props.studio} setStudio={props.setStudio} contact={props.contact} />
    </>
  );
}

/* -------------------------- Small shared pieces ----------------------------- */

function DesktopNavLinksMinimal({ nav, contact, studio }: { nav: NavGroup[]; contact: NavItem; studio: StudioMode }) {
  const accent = studioAccent(studio);
  return (
    <div className="flex items-center gap-5 text-sm">
      {nav.map((g) => (
        <div key={g.label} className="group relative text-white/75 hover:text-white transition cursor-default">
          <span>{g.label}</span>
          <span
            className="absolute -bottom-2 left-0 h-px w-full scale-x-0 origin-left transition group-hover:scale-x-100"
            style={{ background: `linear-gradient(90deg, transparent, ${accent.line}, transparent)` }}
          />
        </div>
      ))}
      <Link href={contact.href} className="text-white/75 hover:text-white transition">
        {contact.label}
      </Link>
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

/* ------------------------------ Mock Content -------------------------------- */

function MockPageBody({ context, compact }: { context: PageContext; compact?: boolean }) {
  const sections = useMemo(() => {
    if (context === "services") return [
      { id: "offerings", title: "Offerings", text: "Clear service pillars with outcomes and deliverables." },
      { id: "platforms", title: "Platforms", text: "Vision Pro, Quest, Pico — plus engines and deployment." },
      { id: "tools", title: "Tools", text: "Unity, Unreal, DCC stack, collaboration, QA & builds." },
      { id: "projects", title: "Related Projects", text: "A curated selection tied to this service line." },
      { id: "faq", title: "FAQ", text: "Speed, pipeline, handoff, timelines, NDA, pricing ranges." },
    ];
    if (context === "case-study") return [
      { id: "overview", title: "Overview", text: "A cinematic intro + quick factual brief." },
      { id: "challenge", title: "Challenge", text: "Constraints, stakeholders, and success criteria." },
      { id: "pipeline", title: "Pipeline", text: "How it was built: iteration, tools, approvals, QA." },
      { id: "deliverables", title: "Deliverables", text: "What shipped — and how it’s maintained." },
      { id: "results", title: "Results", text: "Metrics, outcomes, and what improved." },
    ];
    if (context === "insights") return [
      { id: "latest", title: "Latest", text: "Recent posts with punchy editorial leads." },
      { id: "rd", title: "R&D", text: "Experiments, prototypes, and technical writeups." },
      { id: "categories", title: "Categories", text: "XR, Games, 3D, Creative Tech, Production." },
      { id: "newsletter", title: "Newsletter", text: "Short form updates, occasional, high-signal." },
    ];
    return [
      { id: "intro", title: "Hero / Intro", text: "This is placeholder page content under the header preview." },
      { id: "section-1", title: "Section", text: "Scroll to see sticky behaviors and rhythm." },
      { id: "section-2", title: "Section", text: "Spacing and density should stay premium." },
    ];
  }, [context]);

  return (
    <div className={cn("px-5 pb-10", compact ? "pt-8" : "pt-10")}>
      <div className={cn("grid gap-4", compact ? "md:grid-cols-2" : "md:grid-cols-2")}>
        {sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="text-xs text-white/55">#{s.id}</div>
            <h2 className="mt-2 text-lg font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-white/65">{s.text}</p>
            <div className="mt-5 h-28 rounded-2xl border border-white/10 bg-white/5" />
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold">Scroll filler</div>
        <p className="mt-2 text-sm text-white/60 max-w-2xl">
          This area exists so you can test sticky behavior, blur intensity, and the “product shell” feel.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl border border-white/10 bg-white/5" />
          ))}
        </div>
      </div>
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

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
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
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16.8 16.8 21 21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
