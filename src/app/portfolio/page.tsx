"use client";

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ALL_PROJECTS,
  XR_PROJECTS,
  GAME_PROJECTS,
  THREE_D_PROJECTS,
  FEATURED_PROJECTS,
  Project,
  getYouTubeThumbnail,
} from "@/data/projects";

type Category = "All" | "XR" | "Games" | "3D";

const TOKENS = {
  bg0: "#070814",
  bg1: "#050611",
  xr: "#9EF315",
  games: "#5B2DDC",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function rgba(hexOrRgba: string, a: number) {
  if (hexOrRgba.startsWith("rgba")) return hexOrRgba;
  const hex = hexOrRgba.replace("#", "").trim();
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function laneAccent(cat: "XR" | "Game" | "3D") {
  if (cat === "XR") return TOKENS.xr;
  if (cat === "3D") return "#F6B74A";
  return TOKENS.games;
}

export default function PortfolioPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const [cat, setCat] = useState<Category>("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    return {
      All: ALL_PROJECTS.length,
      XR: XR_PROJECTS.length,
      Games: GAME_PROJECTS.length,
      "3D": THREE_D_PROJECTS.length,
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let projects = ALL_PROJECTS;

    if (cat === "XR") projects = XR_PROJECTS;
    else if (cat === "Games") projects = GAME_PROJECTS;
    else if (cat === "3D") projects = THREE_D_PROJECTS;

    if (!q) return projects;

    return projects.filter((p) => {
      const hay = [
        p.title,
        p.tagline,
        p.description,
        p.subcategory,
        p.client,
        p.engine,
        p.platforms.join(" "),
        p.technologies.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [cat, query]);

  const featured = useMemo(() => {
    if (cat === "All") return FEATURED_PROJECTS.slice(0, 4);
    return FEATURED_PROJECTS.filter(
      (p) => p.category === (cat === "Games" ? "Game" : cat)
    ).slice(0, 4);
  }, [cat]);

  return (
    <div
      className="min-h-screen pt-20"
      style={{
        background: `
          radial-gradient(1200px 800px at 12% 0%, rgba(158,243,21,0.08), transparent 56%),
          radial-gradient(1000px 700px at 90% 10%, rgba(91,45,220,0.10), transparent 56%),
          linear-gradient(180deg, ${TOKENS.bg0} 0%, ${TOKENS.bg1} 100%)
        `,
      }}
    >
      {/* Hero Section */}
      <section className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl sm:p-10">
          {/* Background glows */}
          <div
            className="pointer-events-none absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(158,243,21,0.12), transparent 62%)",
            }}
          />
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(91,45,220,0.12), transparent 62%)",
            }}
          />

          <div className="relative flex flex-col gap-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/80">
                Portfolio
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] font-medium text-white/60">
                XR • Games
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] font-medium text-white/60">
                {ALL_PROJECTS.length} Projects
              </span>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-3">
              <h1 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Our Work —
                <span className="block text-white/70">Built to Ship.</span>
              </h1>
              <p className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
                Browse our portfolio of XR experiences and games. Each project
                represents real client work, shipped with precision and care.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="text-[10px] font-semibold text-white/55">
                  XR Projects
                </div>
                <div className="text-lg font-semibold text-white">
                  {XR_PROJECTS.length}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="text-[10px] font-semibold text-white/55">
                  Game Projects
                </div>
                <div className="text-lg font-semibold text-white">
                  {GAME_PROJECTS.length}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <div className="text-[10px] font-semibold text-white/55">
                  Featured
                </div>
                <div className="text-lg font-semibold text-white">
                  {FEATURED_PROJECTS.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="relative mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-2">
            {(["All", "XR", "Games", "3D"] as Category[]).map((c) => {
              const active = cat === c;
              const color =
                c === "XR" ? TOKENS.xr : c === "Games" ? TOKENS.games : c === "3D" ? "#F6B74A" : "#fff";
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={cx(
                    "relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white/80"
                  )}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: active ? color : "rgba(255,255,255,0.3)" }}
                  />
                  {c === "All" ? "All Projects" : c === "XR" ? "XR / AR / VR" : c === "Games" ? "Games" : "3D Art"}
                  <span className="text-xs text-white/40">({counts[c]})</span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85 placeholder:text-white/40 outline-none focus:border-white/20 sm:w-64"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Featured</h2>
            <span className="text-sm text-white/50">Our best work</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {featured.map((project, i) => (
              <FeaturedCard
                key={project.id}
                project={project}
                index={i}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Projects Grid */}
      <section className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            {cat === "All" ? "All Projects" : cat === "XR" ? "XR Projects" : "Game Projects"}
          </h2>
          <span className="text-sm text-white/50">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <p className="text-white/60">No projects found matching your search.</p>
            <button
              onClick={() => {
                setQuery("");
                setCat("All");
              }}
              className="mt-4 text-sm font-medium"
              style={{ color: TOKENS.xr }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} reduceMotion={reduceMotion} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
          <div
            className="pointer-events-none absolute -left-28 -bottom-28 h-96 w-96 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(158,243,21,0.15), transparent 62%)",
            }}
          />
          <div
            className="pointer-events-none absolute -right-28 -bottom-28 h-96 w-96 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(91,45,220,0.15), transparent 62%)",
            }}
          />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">
                Ready to start your project?
              </h3>
              <p className="mt-2 text-white/60">
                Tell us about your vision and we&apos;ll help bring it to life.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                style={{ background: TOKENS.xr }}
              >
                Start a Project →
              </a>
              <a
                href="mailto:hello@wodh.io"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/[0.05]"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Featured Card Component
function FeaturedCard({
  project,
  index,
  reduceMotion,
}: {
  project: Project;
  index: number;
  reduceMotion: boolean;
}) {
  const accent = laneAccent(project.category);

  // Get thumbnail URL - prioritize custom thumbnail, fallback to YouTube
  const thumbnailSrc = project.thumbnailUrl || (project.youtubeId 
    ? `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`
    : undefined);

  return (
    <motion.a
      href={`/projects/${project.slug}`}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2 }}
      style={{
        boxShadow: "0 30px 120px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* Image */}
      <div className="relative h-[280px] overflow-hidden sm:h-[320px]">
        {/* Thumbnail */}
        <img
          src={thumbnailSrc}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${rgba(accent, 0.08)} 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)`,
          }}
        />

        {/* Category Badge */}
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur-md"
            style={{
              background: `rgba(0,0,0,0.6)`,
              color: accent,
              border: `1px solid ${accent}60`,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
            {project.category === "XR" ? "XR" : project.category === "3D" ? "3D" : "Game"}
          </span>
          <span className="rounded-full border border-white/20 bg-black/50 backdrop-blur-md px-3 py-1 text-[11px] text-white/80">
            {project.year}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-5 left-5 right-5">
          <div className="text-[11px] font-semibold text-white/60">
            FEATURED {index + 1}
          </div>
          <h3 className="mt-1 text-xl font-semibold text-white sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/70">
            {project.tagline}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {project.platforms.slice(0, 3).map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[11px] text-white/60"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-5">
        <span className="text-[11px] text-white/50">{project.subcategory}</span>
        <span
          className="text-xs font-semibold transition group-hover:translate-x-1"
          style={{ color: accent }}
        >
          View Project →
        </span>
      </div>
    </motion.a>
  );
}

// Regular Project Card
function ProjectCard({
  project,
  reduceMotion,
}: {
  project: Project;
  reduceMotion: boolean;
}) {
  const accent = laneAccent(project.category);

  // Get thumbnail URL - prioritize custom thumbnail, fallback to YouTube
  const thumbnailSrc = project.thumbnailUrl || (project.youtubeId 
    ? `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`
    : undefined);

  return (
    <motion.a
      href={`/projects/${project.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition"
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        {/* Thumbnail */}
        <img
          src={thumbnailSrc}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Category */}
        <div className="absolute left-3 top-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md"
            style={{
              background: `rgba(0,0,0,0.6)`,
              color: accent,
              border: `1px solid ${accent}60`,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-white group-hover:text-white/90">
              {project.title}
            </h3>
            <p className="mt-1 text-xs text-white/50">{project.subcategory}</p>
          </div>
          <span className="shrink-0 text-xs text-white/40">{project.year}</span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-white/60">{project.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.platforms.slice(0, 2).map((p) => (
            <span
              key={p}
              className="rounded-full border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[10px] text-white/50"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
