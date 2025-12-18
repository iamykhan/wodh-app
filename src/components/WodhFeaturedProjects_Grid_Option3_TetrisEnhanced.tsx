"use client";

import React from "react";

type ProjectCategory = "XR" | "Game" | "R&D";

type Project = {
  id: number;
  title: string;
  bigTitle: string;
  subtitle: string;
  category: ProjectCategory;
  year: string;
  tagline: string;
  description: string;
  engine: string;
  platform: string;
  country: string;
  flagCode: string;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "TraceAR City Portal",
    bigTitle: "TRACEAR",
    subtitle: "CITY PORTAL",
    category: "XR",
    year: "2025",
    tagline: "City-scale AR layered calmly onto real streets.",
    description:
      "A persistent XR framework for navigation, retail and storytelling that feels like a quiet digital skin over the city.",
    engine: "Unity · AR Foundation",
    platform: "iOS · Android · On-site kiosks",
    country: "United States",
    flagCode: "us",
  },
  {
    id: 2,
    title: "Neon Drift Arena",
    bigTitle: "NEON",
    subtitle: "DRIFT ARENA",
    category: "Game",
    year: "2024",
    tagline: "Competitive neon racing with tight, replayable sessions.",
    description:
      "Multiplayer-ready arcade racing with reactive tracks, precise controls and a clean, console-inspired interface.",
    engine: "Unity",
    platform: "PC · Console (Prototype)",
    country: "Denmark",
    flagCode: "dk",
  },
  {
    id: 3,
    title: "Museum Timewarp",
    bigTitle: "TIMEWARP",
    subtitle: "MUSEUM XR",
    category: "XR",
    year: "2024",
    tagline: "Exhibits that quietly open into alternate timelines.",
    description:
      "On-site XR where each exhibit becomes a portal into branching stories, overlays and spatial soundscapes.",
    engine: "Unity · WebXR",
    platform: "On-site AR · WebXR",
    country: "United Kingdom",
    flagCode: "gb",
  },
  {
    id: 4,
    title: "XR Sandbox Lab",
    bigTitle: "XR",
    subtitle: "SANDBOX LAB",
    category: "R&D",
    year: "Ongoing",
    tagline: "Internal playground for new XR interactions.",
    description:
      "Gesture systems, spatial UI and physics toys prototyped in a safe environment before they become client-facing features.",
    engine: "Unity · Unreal",
    platform: "Quest · Mobile · WebXR",
    country: "United Arab Emirates",
    flagCode: "ae",
  },
];

const categoryLabel = (c: ProjectCategory) =>
  c === "XR" ? "XR EXPERIENCE" : c === "Game" ? "GAME PROJECT" : "R&D LAB";

type SizeVariant = "xl" | "l" | "m";

function ProjectCardTetris({
  project,
  size,
  className = "",
}: {
  project: Project;
  size: SizeVariant;
  className?: string;
}) {
  const bigTitleClass =
    size === "xl"
      ? "text-[2.8rem] sm:text-[3.3rem] lg:text-[3.7rem]"
      : size === "l"
        ? "text-[2.2rem] sm:text-[2.5rem] lg:text-[2.8rem]"
        : "text-[1.8rem] sm:text-[2.1rem] lg:text-[2.3rem]";

  const paddingClass =
    size === "xl"
      ? "px-7 py-7 sm:px-8 sm:py-8"
      : size === "l"
        ? "px-6 py-6 sm:px-7 sm:py-7"
        : "px-5 py-5 sm:px-6 sm:py-6";

  const descriptionVisible = size !== "m";

  return (
    <article
      className={
        "relative overflow-hidden rounded-3xl border border-[#18112C] bg-[#0F0A26]/95 shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(158,243,21,0.25)] " +
        className
      }
    >
      <div className={`relative min-h-[200px] ${paddingClass}`}>
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#2A1E55] via-[#0C0722] to-[#0A061A]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,#9EF31522,transparent_60%),radial-gradient(circle_at_80%_100%,#5B2DDC44,transparent_60%)]" />
          <div className="absolute inset-0 opacity-30">
            <div className="h-full w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:26px_26px]" />
          </div>
        </div>

        {/* Top meta row */}
        <div className="relative flex items-center justify-between text-[10px] font-medium text-[#D1C6FF]">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0C0722]/80 px-2.5 py-0.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9EF315]" />
            {categoryLabel(project.category)}
          </span>
          <span className="inline-flex items-center gap-2 text-[#A8A8C3]">
            {size !== "m" && (
              <>
                <span className="uppercase tracking-[0.18em] hidden sm:inline">
                  {project.platform}
                </span>
                <span className="h-1 w-1 rounded-full bg-[#5B2DDC]" />
              </>
            )}
            <span className="inline-flex items-center gap-1 text-[#9EF315]">
              <span>{project.year}</span>
              <img
                src={`/flags/${project.flagCode}.svg`}
                alt={`${project.country} flag`}
                className="h-3.5 w-5 rounded-[4px] border border-[#18112C] object-cover"
              />
            </span>
          </span>
        </div>

        {/* Big hero typography */}
        <div className="relative mt-6 space-y-1">
          <h3
            className={`${bigTitleClass} font-semibold uppercase tracking-[0.24em] text-[#F3F3F3]`}
          >
            {project.bigTitle}
          </h3>
          <p className="text-[11px] sm:text-xs tracking-[0.30em] uppercase text-[#B9A8FF]">
            {project.subtitle}
          </p>
        </div>

        {/* Tagline */}
        <p className="relative mt-3 text-[11px] sm:text-sm text-[#A8A8C3] max-w-md">
          {project.tagline}
        </p>

        {descriptionVisible && (
          <p className="relative mt-2 text-[11px] sm:text-xs text-[#6E6E90] max-w-md">
            {project.description}
          </p>
        )}

        {/* Chips */}
        <div className="relative mt-3 flex flex-wrap gap-2 text-[10px] sm:text-[11px] text-[#B9A8FF]">
          <span className="rounded-full bg-[#1D1633] px-2 py-0.5">
            {project.engine}
          </span>
          {descriptionVisible && (
            <span className="rounded-full bg-[#1D1633] px-2 py-0.5 text-[#A8A8C3]">
              {project.platform}
            </span>
          )}
          <span className="rounded-full bg-[#1D1633] px-2 py-0.5 text-[#D1C6FF]">
            {project.country}
          </span>
        </div>
      </div>
    </article>
  );
}

type CTAType = "XR" | "Game";

function CTAProjectCard({
  type,
  className = "",
  href = "#",
}: {
  type: CTAType;
  className?: string;
  href?: string;
}) {
  const label = type === "XR" ? "More XR Projects" : "More Game Projects";
  const pill = type === "XR" ? "XR COLLECTION" : "GAME COLLECTION";

  return (
    <a
      href={href}
      className={
        "relative overflow-hidden rounded-3xl border border-[#9EF31555] bg-[#9EF315] text-[#0A061A] shadow-[0_18px_50px_rgba(158,243,21,0.35)] transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(158,243,21,0.25)] " +
        className
      }
    >
      <div className="relative min-h-[200px] px-5 py-5 sm:px-6 sm:py-6 flex flex-col justify-between">
        {/* Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[radial-gradient(circle_at_0%_0%,rgba(12,7,34,0.15),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(12,7,34,0.20),transparent_55%)]" />
        </div>

        {/* Top row */}
        <div className="relative flex items-center justify-between text-[10px] font-medium">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#0A061A]/10 px-2.5 py-0.5 border border-[#0A061A20]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0A061A]" />
            {pill}
          </span>
          <span className="text-[#0A061A]/70 uppercase tracking-[0.16em] text-[9px]">
            {" "}
            VIEW ALL{" "}
          </span>
        </div>

        {/* Content */}
        <div className="relative space-y-2 mt-3">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
            {label}
          </h3>
          <p className="text-[11px] sm:text-sm text-[#0A061A]/80">
            Browse the full {type === "XR" ? "XR experience" : "game"}{" "}
            lineup, filters, engines and platforms.
          </p>
        </div>

        {/* Footer */}
        <div className="relative mt-3 flex items-center justify-between text-[11px] sm:text-xs font-medium">
          <span className="inline-flex items-center gap-1">
            Go to {type === "XR" ? "XR work" : "Game work"}
          </span>
          <span className="text-sm">↗</span>
        </div>
      </div>
    </a>
  );
}

export default function WodhFeaturedProjects_Grid_Option3_TetrisEnhanced() {
  const [p0, p1, p2, p3] = PROJECTS;

  return (
    <section
      id="featured-projects-grid-tetris-enhanced"
      className="relative isolate overflow-hidden bg-[#0C0722] py-20 sm:py-24"
      style={{
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }}
    >
      {/* Soft glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#9EF31522] blur-3xl" />
        <div className="absolute -bottom-56 right-10 h-72 w-72 rounded-full bg-[#5B2DDC33] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0F0A26] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-[#D1C6FF] border border-[#2A1E55]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#9EF315]" />
            FEATURED PROJECTS
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-semibold tracking-tight text-white">
              Tetris-style grid, <br />
              <span className="bg-gradient-to-r from-[#9EF315] via-[#B9A8FF] to-[#5B2DDC] bg-clip-text text-transparent">
                {" "}
                with bold hero typography.{" "}
              </span>
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-[#A8A8C3]">
              {" "}
              XL hero on top, then a large and a medium card — plus two big
              neon CTAs to explore XR and game projects. Every card lifts softly
              with a green glow on hover.{" "}
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="grid gap-6 md:grid-cols-4 auto-rows-[1fr]">
          {/* Row 1 */}
          <ProjectCardTetris project={p0} size="xl" className="md:col-span-4" />

          {/* Row 2 */}
          <ProjectCardTetris project={p1} size="l" className="md:col-span-2" />
          <ProjectCardTetris project={p2} size="m" className="md:col-span-2" />

          {/* Row 3 */}
          <ProjectCardTetris project={p3} size="m" className="md:col-span-2" />
          <CTAProjectCard type="XR" className="md:col-span-1" href="/work/xr" />
          <CTAProjectCard
            type="Game"
            className="md:col-span-1"
            href="/work/games"
          />
        </div>
      </div>
    </section>
  );
}

