"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  getProjectBySlug,
  getRelatedProjects,
  Project,
} from "@/data/projects";

// Color tokens
const NEON = "#9EF315";
const VIOLET = "#5B2DDC";
const AMBER = "#F6B74A";
const BG = "#0C0722";
const PANEL = "#0F0A26";
const BORDER = "#2A1E55";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0C0722] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-white/60 mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black"
            style={{ background: NEON }}
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    );
  }

  const relatedProjects = getRelatedProjects(project, 3);
  const accentColor = project.category === "XR" ? NEON : project.category === "3D" ? AMBER : VIOLET;

  return (
    <div className="min-h-screen bg-[#0C0722]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16">
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-40 left-1/4 h-96 w-96 rounded-full blur-3xl opacity-30"
            style={{ background: accentColor }}
          />
          <div
            className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full blur-3xl opacity-20"
            style={{ background: project.category === "XR" ? VIOLET : NEON }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-white/60">
            <a href="/" className="hover:text-white transition">
              Home
            </a>
            <span>/</span>
            <a href="/portfolio" className="hover:text-white transition">
              Portfolio
            </a>
            <span>/</span>
            <span className="text-white">{project.title}</span>
          </nav>

          {/* Header - Simplified */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto mb-10"
          >
            {/* Category Badge */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
                style={{
                  background: `${accentColor}20`,
                  color: accentColor,
                  border: `1px solid ${accentColor}40`,
                }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: accentColor }}
                />
                {project.category === "XR" ? "XR Experience" : project.category === "3D" ? "3D Art" : "Game Project"}
              </span>
              <span className="text-sm text-white/50">{project.year}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              {project.title}
            </h1>

            {/* Tagline */}
            <p className="text-xl text-white/70">{project.tagline}</p>
          </motion.div>

          {/* Media - Full Width */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black/50 shadow-2xl">
              {project.youtubeId ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${project.youtubeId}?rel=0&modestbranding=1&autoplay=1&mute=1`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : project.wistiaId ? (
                <iframe
                  className="h-full w-full"
                  src={`https://fast.wistia.net/embed/iframe/${project.wistiaId}?autoPlay=true&muted=true&endVideoBehavior=loop`}
                  title={project.title}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : project.driveVideoId ? (
                <iframe
                  className="h-full w-full"
                  src={`https://drive.google.com/file/d/${project.driveVideoId}/preview`}
                  title={project.title}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : project.videoUrl ? (
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                >
                  <source src={project.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="py-16 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <div className="text-xs text-white/50 uppercase tracking-wider mb-2">Client</div>
              <div className="text-white font-semibold">{project.client}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <div className="text-xs text-white/50 uppercase tracking-wider mb-2">Year</div>
              <div className="text-white font-semibold">{project.year}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <div className="text-xs text-white/50 uppercase tracking-wider mb-2">Engine</div>
              <div className="text-white font-semibold">{project.engine}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <div className="text-xs text-white/50 uppercase tracking-wider mb-2">Type</div>
              <div className="text-white font-semibold">{project.subcategory}</div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Left: Project Overview (2 cols) */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  {project.description}
                </p>
                <p className="text-white/60 leading-relaxed">
                  This {project.category === "XR" ? "XR experience" : project.category === "3D" ? "3D art project" : "game"} was developed for {project.client} using {project.engine}. 
                  The project showcases our expertise in creating {project.category === "XR" ? "immersive extended reality experiences" : project.category === "3D" ? "stunning 3D visuals and animations" : "engaging interactive entertainment"} 
                  that push the boundaries of what&apos;s possible with modern technology.
                </p>
              </div>

              {/* The Challenge */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">The Challenge</h3>
                <p className="text-white/60 leading-relaxed">
                  {project.client} needed a {project.category === "XR" ? "cutting-edge XR solution" : project.category === "3D" ? "high-quality 3D visualization" : "engaging gaming experience"} that could 
                  {project.category === "XR" ? " deliver immersive experiences across multiple platforms while maintaining high performance and user engagement" : 
                   project.category === "3D" ? " showcase their vision with stunning visuals and seamless integration into their existing workflows" : 
                   " captivate players with compelling gameplay mechanics and polished visuals"}. 
                  Our team was tasked with delivering a solution that met these requirements while pushing creative boundaries.
                </p>
              </div>

              {/* Our Approach */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Our Approach</h3>
                <p className="text-white/60 leading-relaxed mb-4">
                  We adopted an iterative development approach, working closely with {project.client} to ensure every aspect of the project aligned with their vision. 
                  Using {project.engine} as our foundation, we leveraged the latest technologies to create a {project.category === "XR" ? "seamless XR experience" : project.category === "3D" ? "visually stunning result" : "polished gaming experience"}.
                </p>
                <p className="text-white/60 leading-relaxed">
                  Our development process involved rigorous testing across {project.platforms.length > 1 ? "multiple platforms" : project.platforms[0]} to ensure optimal performance and user experience, 
                  resulting in a final product that exceeded expectations.
                </p>
              </div>
            </div>

            {/* Right: Sidebar (1 col) */}
            <div className="space-y-8">
              {/* CTA Buttons */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Get Started</h3>
                <div className="space-y-3">
                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 w-full"
                      style={{ background: accentColor }}
                    >
                      Visit Website
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  {project.playStoreUrl && (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 w-full"
                    >
                      Google Play
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                    </a>
                  )}
                  <a
                    href="/contact"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 w-full"
                  >
                    Start Similar Project →
                  </a>
                </div>
              </div>

              {/* Platforms */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {project.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium"
                      style={{
                        background: `${accentColor}15`,
                        color: accentColor,
                        border: `1px solid ${accentColor}30`,
                      }}
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{ background: `${accentColor}20` }}
                  >
                    <svg
                      className="h-4 w-4"
                      style={{ color: accentColor }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/80 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Results / Impact */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-8">
            <h2 className="text-2xl font-bold text-white mb-6">The Result</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              The final deliverable exceeded {project.client}&apos;s expectations, providing a {project.category === "XR" ? "compelling XR experience" : project.category === "3D" ? "stunning visual showcase" : "polished gaming experience"} that 
              successfully {project.category === "XR" ? "engages users across " + project.platforms.join(" and ") : project.category === "3D" ? "demonstrates their creative vision" : "captivates players with engaging gameplay"}.
            </p>
            <p className="text-white/60 leading-relaxed">
              This project demonstrates our commitment to delivering high-quality {project.category === "XR" ? "XR solutions" : project.category === "3D" ? "3D content" : "games"} that 
              combine technical excellence with creative innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8">Development Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Understanding requirements and defining scope" },
              { step: "02", title: "Design", desc: "Creating prototypes and visual concepts" },
              { step: "03", title: "Development", desc: "Building the solution with iterative testing" },
              { step: "04", title: "Delivery", desc: "Final testing, optimization, and deployment" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div
                  className="text-4xl font-bold mb-3"
                  style={{ color: `${accentColor}40` }}
                >
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((related) => {
                // Prioritize custom thumbnail over YouTube thumbnail
                const relatedThumbnail = related.thumbnailUrl || (related.youtubeId 
                  ? `https://img.youtube.com/vi/${related.youtubeId}/hqdefault.jpg`
                  : undefined);
                return (
                  <a
                    key={related.id}
                    href={`/projects/${related.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/10"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={relatedThumbnail}
                        alt={related.title}
                        className="h-full w-full object-cover transition group-hover:scale-105"
                      />
                      {/* Vignette Effect */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
                    </div>
                    <div className="p-4">
                      <div
                        className="text-xs font-medium mb-2"
                        style={{
                          color:
                            related.category === "XR" ? NEON : related.category === "3D" ? AMBER : VIOLET,
                        }}
                      >
                        {related.subcategory}
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-white/90">
                        {related.title}
                      </h3>
                      <p className="text-sm text-white/60 mt-1 line-clamp-2">
                        {related.tagline}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 border-t border-white/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your project and see how we can bring your vision to
            life with our expertise in {project.category === "XR" ? "XR development" : project.category === "3D" ? "3D art and visualization" : "game development"}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-black transition hover:opacity-90"
              style={{ background: NEON }}
            >
              Start a Project →
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View More Projects
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
