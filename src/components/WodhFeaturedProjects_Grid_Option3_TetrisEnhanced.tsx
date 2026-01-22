"use client";

import React, { useState, useEffect } from "react";

type ProjectCategory = "XR" | "Game" | "3D";
type Mode = "XR" | "Games";

type DisplayProject = {
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
  videoUrl?: string;
  youtubeId?: string;
  wistiaId?: string;
  driveVideoId?: string;
  slug?: string;
};

// Featured projects for homepage - Trace, HAKI, Project Racer, Museum Game, Soul of King
const PROJECTS: DisplayProject[] = [
  {
    id: 1,
    title: "TraceAR City Portal",
    bigTitle: "TRACE",
    subtitle: "CITY PORTAL",
    category: "XR",
    year: "2025",
    tagline: "City-scale AR layered calmly onto real streets.",
    description:
      "A persistent XR framework for navigation, retail and storytelling that feels like a natural extension of the city.",
    engine: "Unity · ARKit · ARCore",
    platform: "iOS · Android · Kiosks",
    videoUrl: "/videos/trace3d-hero.mp4",
    slug: "trace3d-city-portal",
  },
  {
    id: 2,
    title: "HAKI Scaffolding VR",
    bigTitle: "HAKI",
    subtitle: "SCAFFOLDING VR",
    category: "XR",
    year: "2024",
    tagline: "VR safety training for industrial scaffolding systems.",
    description:
      "An immersive VR training platform for HAKI, the global leader in scaffolding systems. Workers learn proper assembly and safety protocols.",
    engine: "Unity · XR Toolkit",
    platform: "Quest · PC VR",
    youtubeId: "_Wz9zB2GO4o",
    slug: "haki-scaffolding-vr",
  },
  {
    id: 3,
    title: "Project Racer",
    bigTitle: "PROJECT",
    subtitle: "RACER",
    category: "Game",
    year: "2024",
    tagline: "Competitive racing with tight, replayable sessions.",
    description:
      "Multiplayer-ready arcade racing with reactive tracks, precise controls and a clean, console-inspired interface.",
    engine: "Unity",
    platform: "PC · Console",
    youtubeId: "TD-OLJihG90",
    slug: "project-racer",
  },
  {
    id: 4,
    title: "VR RCC",
    bigTitle: "VR",
    subtitle: "RCC RACING",
    category: "XR",
    year: "2024",
    tagline: "Realistic car controller experience in VR.",
    description:
      "A VR racing experience featuring the Realistic Car Controller system. Feel every bump, drift, and acceleration in immersive virtual reality.",
    engine: "Unity · RCC Pro",
    platform: "Quest · PC VR",
    videoUrl: "/videos/vr-rcc.mp4",
    slug: "vr-rcc",
  },
  {
    id: 5,
    title: "Soul of King",
    bigTitle: "SOUL",
    subtitle: "OF KING",
    category: "Game",
    year: "2024",
    tagline: "Epic MOBA battles with strategic depth.",
    description:
      "A multiplayer online battle arena game featuring unique heroes, strategic team play, and competitive ranked matches.",
    engine: "Unity · Photon",
    platform: "PC · Mobile",
    youtubeId: "IwrKOx1Qz0E",
    slug: "soul-of-king",
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
  project: DisplayProject;
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

  const CardWrapper = project.slug ? "a" : "article";
  const cardProps = project.slug ? { href: `/projects/${project.slug}` } : {};

  // Get thumbnail URL from slug
  const thumbnailUrl = project.slug ? `/images/thumbnails/${project.slug}.jpg` : null;

  return (
    <CardWrapper
      {...cardProps}
      className={
        "relative overflow-hidden rounded-3xl border border-[#18112C] bg-[#0F0A26]/95 shadow-[0_20px_60px_rgba(0,0,0,0.85)] transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(158,243,21,0.25)] block cursor-pointer " +
        className
      }
    >
      <div className={`relative min-h-[200px] ${paddingClass}`}>
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          {/* Static thumbnail background */}
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
          )}
          {/* Vignette Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2A1E55]/70 via-[#0C0722]/60 to-[#0A061A]/70" />
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
          <span className="rounded-full bg-[#1D1633] px-2 py-0.5 text-[#A8A8C3]">
            {project.platform}
          </span>
        </div>
      </div>
    </CardWrapper>
  );
}

type CTAType = "XR" | "Game";

function CTAProjectCard({
  type,
  className = "",
  href = "#",
  highlighted = false,
}: {
  type: CTAType;
  className?: string;
  href?: string;
  highlighted?: boolean;
}) {
  const label = type === "XR" ? "More XR Projects" : "More Game Projects";
  const pill = type === "XR" ? "XR COLLECTION" : "GAME COLLECTION";
  
  // Colors based on type
  const bgColor = type === "XR" ? "#9EF315" : "#5B2DDC";
  const textColor = type === "XR" ? "#0A061A" : "#FFFFFF";
  const shadowColor = type === "XR" ? "rgba(158,243,21,0.35)" : "rgba(91,45,220,0.35)";

  return (
    <a
      href={href}
      className={`relative overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 ${className}`}
      style={{
        backgroundColor: highlighted ? bgColor : "#0F0A26",
        borderColor: highlighted ? `${bgColor}55` : "#2A1E55",
        color: highlighted ? textColor : "#E0E0E0",
        boxShadow: highlighted 
          ? `0 18px 50px ${shadowColor}` 
          : "0 10px 30px rgba(0,0,0,0.3)",
        transform: highlighted ? "scale(1.02)" : "scale(1)",
      }}
    >
      <div className="relative min-h-[200px] px-5 py-5 sm:px-6 sm:py-6 flex flex-col justify-between">
        {/* Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[radial-gradient(circle_at_0%_0%,rgba(12,7,34,0.15),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(12,7,34,0.20),transparent_55%)]" />
        </div>

        {/* Top row */}
        <div className="relative flex items-center justify-between text-[10px] font-medium">
          <span 
            className="inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 border"
            style={{
              backgroundColor: highlighted ? `${textColor}10` : `${bgColor}20`,
              borderColor: highlighted ? `${textColor}20` : `${bgColor}40`,
            }}
          >
            <span 
              className="h-1.5 w-1.5 rounded-full" 
              style={{ backgroundColor: highlighted ? textColor : bgColor }}
            />
            {pill}
          </span>
          <span 
            className="uppercase tracking-[0.16em] text-[9px]"
            style={{ opacity: 0.7 }}
          >
            VIEW ALL
          </span>
        </div>

        {/* Content */}
        <div className="relative space-y-2 mt-3">
          <h3 className="text-lg sm:text-xl font-semibold tracking-tight">
            {label}
          </h3>
          <p className="text-[11px] sm:text-sm" style={{ opacity: 0.8 }}>
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
  const [mode, setMode] = useState<Mode>("XR");

  // Listen for mode changes from header toggle
  useEffect(() => {
    // Get initial mode from localStorage
    const savedMode = localStorage.getItem("wodh-mode") as Mode;
    if (savedMode) setMode(savedMode);

    // Listen for mode change events
    const handleModeChange = (e: CustomEvent<Mode>) => {
      setMode(e.detail);
    };

    window.addEventListener("wodh-mode-change", handleModeChange as EventListener);
    return () => window.removeEventListener("wodh-mode-change", handleModeChange as EventListener);
  }, []);

  // Filter projects based on mode
  const xrProjects = PROJECTS.filter(p => p.category === "XR");
  const gameProjects = PROJECTS.filter(p => p.category === "Game");
  
  // Get projects based on current mode
  const featuredProjects = mode === "XR" ? xrProjects : gameProjects;
  const heroProject = featuredProjects[0] || PROJECTS[0];
  const secondaryProjects = featuredProjects.slice(1, 3);
  const tertiaryProjects = featuredProjects.slice(3, 5);

  // Fill in with other projects if not enough in category
  const allSecondary = secondaryProjects.length >= 2 
    ? secondaryProjects 
    : [...secondaryProjects, ...PROJECTS.filter(p => !featuredProjects.includes(p)).slice(0, 2 - secondaryProjects.length)];
  
  const allTertiary = tertiaryProjects.length >= 2
    ? tertiaryProjects
    : [...tertiaryProjects, ...PROJECTS.filter(p => !featuredProjects.includes(p) && !allSecondary.includes(p)).slice(0, 2 - tertiaryProjects.length)];

  const accentColor = mode === "XR" ? "#9EF315" : "#5B2DDC";
  const secondaryColor = mode === "XR" ? "#5B2DDC" : "#9EF315";

  return (
    <section
      id="featured-projects-grid-tetris-enhanced"
      className="relative isolate overflow-hidden bg-[#0C0722] py-20 sm:py-24"
      style={{
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }}
    >
      {/* Soft glows - color changes based on mode */}
      <div className="pointer-events-none absolute inset-0">
        <div 
          className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl transition-colors duration-500" 
          style={{ backgroundColor: `${accentColor}22` }}
        />
        <div 
          className="absolute -bottom-56 right-10 h-72 w-72 rounded-full blur-3xl transition-colors duration-500"
          style={{ backgroundColor: `${secondaryColor}33` }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header - changes based on mode */}
        <div className="mb-10 space-y-4">
          <div 
            className="inline-flex items-center gap-2 rounded-full bg-[#0F0A26] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-[#D1C6FF] border border-[#2A1E55] transition-all duration-300"
          >
            <span 
              className="h-1.5 w-1.5 rounded-full transition-colors duration-300" 
              style={{ backgroundColor: accentColor }}
            />
            {mode === "XR" ? "FEATURED XR PROJECTS" : "FEATURED GAME PROJECTS"}
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-semibold tracking-tight text-white">
              {mode === "XR" ? "Immersive XR Experiences," : "Engaging Game Experiences,"} <br />
              <span 
                className="bg-clip-text text-transparent transition-all duration-500"
                style={{
                  backgroundImage: mode === "XR" 
                    ? "linear-gradient(90deg, #9EF315, #B9A8FF, #5B2DDC)"
                    : "linear-gradient(90deg, #5B2DDC, #B9A8FF, #9EF315)"
                }}
              >
                crafted with precision.
              </span>
            </h2>
            <p className="max-w-xl text-sm sm:text-base text-[#A8A8C3]">
              {mode === "XR" 
                ? "From city-scale AR to enterprise VR training — explore our featured XR projects that push the boundaries of immersive technology."
                : "From competitive multiplayer to story-driven adventures — explore our featured games that deliver engaging player experiences."
              }
            </p>
          </div>
        </div>

        {/* GRID - Dynamic based on mode */}
        <div className="grid gap-6 md:grid-cols-4 auto-rows-[1fr]">
          {/* Row 1: Hero project (XL - full width) */}
          <ProjectCardTetris project={heroProject} size="xl" className="md:col-span-4" />

          {/* Row 2: Secondary projects */}
          {allSecondary[0] && (
            <ProjectCardTetris project={allSecondary[0]} size="l" className="md:col-span-2" />
          )}
          {allSecondary[1] && (
            <ProjectCardTetris project={allSecondary[1]} size="l" className="md:col-span-2" />
          )}

          {/* Row 3: Tertiary projects */}
          {allTertiary[0] && (
            <ProjectCardTetris project={allTertiary[0]} size="m" className="md:col-span-2" />
          )}
          {allTertiary[1] && (
            <ProjectCardTetris project={allTertiary[1]} size="m" className="md:col-span-2" />
          )}

          {/* Row 4: CTAs - highlighted based on mode */}
          <CTAProjectCard 
            type="XR" 
            className="md:col-span-2" 
            href="/portfolio?category=XR"
            highlighted={mode === "XR"}
          />
          <CTAProjectCard
            type="Game"
            className="md:col-span-2"
            href="/portfolio?category=Games"
            highlighted={mode === "Games"}
          />
        </div>
      </div>
    </section>
  );
}

