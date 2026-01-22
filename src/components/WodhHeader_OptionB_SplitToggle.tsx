"use client";

import React, { useEffect, useMemo, useState, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "XR" | "Games";

// Create context to share mode across components
export const ModeContext = createContext<{
  mode: Mode;
  setMode: (mode: Mode) => void;
}>({
  mode: "XR",
  setMode: () => {},
});

export const useMode = () => useContext(ModeContext);

const SERVICE_HUB_LINKS = [
  { label: "Service Hub", href: "/servicehubfinal" },
  { label: "XR Services", href: "/xr-services-357" },
  { label: "Game Services", href: "/gameservicesv3" },
  { label: "3D Art & Design", href: "/3dart-designservicesv3" },
];

const CASE_STUDY_LINKS = [
  { label: "TraceAR City Portal", href: "/projects/trace3d-city-portal" },
  { label: "Soul of King (MOBA)", href: "/projects/soul-of-king" },
  { label: "Project Racer", href: "/projects/project-racer" },
  { label: "HAKI Scaffolding VR", href: "/projects/haki-scaffolding-vr" },
  { label: "AR Museum Game", href: "/projects/ar-museum-game" },
];

const WORK_LINKS = [
  { label: "XR Projects", href: "/portfolio?category=XR" },
  { label: "Game Projects", href: "/portfolio?category=Games" },
  { label: "3D Projects", href: "/portfolio?category=3D" },
  { label: "All Projects", href: "/portfolio" },
];

const COMMON_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const BORDER = "#2A1E55";
const PANEL = "#0F0A26";
const NEON = "#9EF315";
const VIOLET = "#5B2DDC";

const WodhHeader_OptionB_SplitToggle: React.FC = () => {
  const [mode, setMode] = useState<Mode>("XR");
  const [scrolled, setScrolled] = useState(false);
  const [serviceHubOpen, setServiceHubOpen] = useState(false);
  const serviceHubRef = useRef<HTMLDivElement>(null);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const [workOpen, setWorkOpen] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);

  // Store mode in localStorage and dispatch event for other components
  useEffect(() => {
    const savedMode = localStorage.getItem("wodh-mode") as Mode;
    if (savedMode) setMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("wodh-mode", mode);
    // Dispatch custom event so other components can react
    window.dispatchEvent(new CustomEvent("wodh-mode-change", { detail: mode }));
  }, [mode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (serviceHubRef.current && !serviceHubRef.current.contains(event.target as Node)) {
        setServiceHubOpen(false);
      }
      if (caseStudiesRef.current && !caseStudiesRef.current.contains(event.target as Node)) {
        setCaseStudiesOpen(false);
      }
      if (workRef.current && !workRef.current.contains(event.target as Node)) {
        setWorkOpen(false);
      }
    };

    if (serviceHubOpen || caseStudiesOpen || workOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [serviceHubOpen, caseStudiesOpen, workOpen]);

  const activeColor = mode === "XR" ? NEON : VIOLET;

  // Dynamic links based on mode
  const modeSpecificLink = mode === "XR" 
    ? { label: "XR Work", href: "/portfolio?category=XR" }
    : { label: "Game Work", href: "/portfolio?category=Games" };

  return (
    <header className="fixed top-0 left-0 right-0 z-[60]">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "rgba(15,10,38,0.9)"
            : "rgba(12,7,34,0.4)",
          borderColor: scrolled ? BORDER : "rgba(42,30,85,0.35)",
          backdropFilter: scrolled ? "blur(10px)" : "blur(6px)",
        }}
        transition={{ duration: 0.25 }}
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10 py-3 border-b"
      >
        {/* Logo */}
        <a
          href="/"
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-white"
        >
          WODH
        </a>

        {/* Toggle - Switches site focus between XR and Games */}
        <div className="hidden md:flex items-center gap-3">
          <div
            className="relative flex items-center rounded-full p-1 border"
            style={{ borderColor: BORDER, background: PANEL }}
          >
            {(["XR", "Games"] as Mode[]).map((m) => {
              const active = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className="relative z-10 px-4 py-1.5 text-xs font-semibold rounded-full transition"
                  style={{
                    color: active ? "#000" : "rgba(255,255,255,0.8)",
                  }}
                  title={m === "XR" ? "Focus on XR & Metaverse projects" : "Focus on Game Development projects"}
                >
                  {m === "XR" ? "XR" : "GAMES"}
                  {active && (
                    <motion.span
                      layoutId="wodh-mode-pill"
                      className="absolute inset-0 -z-10 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                      }}
                      style={{
                        background: `linear-gradient(90deg, ${activeColor}, ${activeColor}CC)`,
                        boxShadow: `0 10px 24px ${activeColor}40`,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Mode-specific link */}
          <a
            href={modeSpecificLink.href}
            className="group relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition"
          >
            {modeSpecificLink.label}
            <span
              className="absolute left-2 right-2 -bottom-0.5 h-[2px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
              style={{
                background: `linear-gradient(90deg, ${activeColor}, transparent)`,
              }}
            />
          </a>

          {/* Common Links */}
          {COMMON_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition"
            >
              {l.label}
              <span
                className="absolute left-2 right-2 -bottom-0.5 h-[2px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                style={{
                  background: `linear-gradient(90deg, ${activeColor}, transparent)`,
                }}
              />
            </a>
          ))}

          {/* Service Hub Dropdown */}
          <div ref={serviceHubRef} className="relative">
            <button
              onClick={() => setServiceHubOpen(!serviceHubOpen)}
              className="group relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition flex items-center"
            >
              Services
              <span
                className="absolute left-2 right-2 -bottom-0.5 h-[2px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                style={{
                  background: `linear-gradient(90deg, ${activeColor}, transparent)`,
                }}
              />
              <svg
                className={`ml-1 inline-block h-3 w-3 transition-transform duration-200 ${
                  serviceHubOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <AnimatePresence>
              {serviceHubOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 min-w-[200px] rounded-2xl border backdrop-blur-xl overflow-hidden"
                  style={{
                    backgroundColor: "rgba(15,10,38,0.95)",
                    borderColor: BORDER,
                    boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${BORDER}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
                  }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute -left-20 -top-20 h-40 w-40 rounded-full opacity-30 blur-3xl"
                    style={{ backgroundColor: activeColor }}
                  />
                  
                  {/* Top accent line */}
                  <div
                    className="absolute left-0 right-0 top-0 h-px opacity-60"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${activeColor}60, transparent)`,
                    }}
                  />

                  <div className="relative">
                    {SERVICE_HUB_LINKS.map((link, index) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setServiceHubOpen(false)}
                        className="block px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                        style={{
                          borderTop: index > 0 ? `1px solid ${BORDER}40` : "none",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{link.label}</span>
                          <span
                            className="text-xs opacity-50"
                            style={{ color: activeColor }}
                          >
                            →
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Case Studies Dropdown */}
          <div ref={caseStudiesRef} className="relative">
            <button
              onClick={() => setCaseStudiesOpen(!caseStudiesOpen)}
              className="group relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition flex items-center"
            >
              Case Studies
              <span
                className="absolute left-2 right-2 -bottom-0.5 h-[2px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                style={{
                  background: `linear-gradient(90deg, ${activeColor}, transparent)`,
                }}
              />
              <svg
                className={`ml-1 inline-block h-3 w-3 transition-transform duration-200 ${
                  caseStudiesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <AnimatePresence>
              {caseStudiesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 min-w-[200px] rounded-2xl border backdrop-blur-xl overflow-hidden"
                  style={{
                    backgroundColor: "rgba(15,10,38,0.95)",
                    borderColor: BORDER,
                    boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${BORDER}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
                  }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute -left-20 -top-20 h-40 w-40 rounded-full opacity-30 blur-3xl"
                    style={{ backgroundColor: activeColor }}
                  />
                  
                  {/* Top accent line */}
                  <div
                    className="absolute left-0 right-0 top-0 h-px opacity-60"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${activeColor}60, transparent)`,
                    }}
                  />

                  <div className="relative">
                    {CASE_STUDY_LINKS.map((link, index) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setCaseStudiesOpen(false)}
                        className="block px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                        style={{
                          borderTop: index > 0 ? `1px solid ${BORDER}40` : "none",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{link.label}</span>
                          <span
                            className="text-xs opacity-50"
                            style={{ color: activeColor }}
                          >
                            →
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Work Dropdown */}
          <div ref={workRef} className="relative">
            <button
              onClick={() => setWorkOpen(!workOpen)}
              className="group relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition flex items-center"
            >
              Work
              <span
                className="absolute left-2 right-2 -bottom-0.5 h-[2px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                style={{
                  background: `linear-gradient(90deg, ${activeColor}, transparent)`,
                }}
              />
              <svg
                className={`ml-1 inline-block h-3 w-3 transition-transform duration-200 ${
                  workOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <AnimatePresence>
              {workOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 min-w-[200px] rounded-2xl border backdrop-blur-xl overflow-hidden"
                  style={{
                    backgroundColor: "rgba(15,10,38,0.95)",
                    borderColor: BORDER,
                    boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${BORDER}40, inset 0 1px 0 rgba(255,255,255,0.1)`,
                  }}
                >
                  {/* Glow effect */}
                  <div
                    className="absolute -left-20 -top-20 h-40 w-40 rounded-full opacity-30 blur-3xl"
                    style={{ backgroundColor: activeColor }}
                  />
                  
                  {/* Top accent line */}
                  <div
                    className="absolute left-0 right-0 top-0 h-px opacity-60"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${activeColor}60, transparent)`,
                    }}
                  />

                  <div className="relative">
                    {WORK_LINKS.map((link, index) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setWorkOpen(false)}
                        className="block px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                        style={{
                          borderTop: index > 0 ? `1px solid ${BORDER}40` : "none",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{link.label}</span>
                          <span
                            className="text-xs opacity-50"
                            style={{ color: activeColor }}
                          >
                            →
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* CTA */}
        <a
          href="/contact"
          className="relative inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 text-sm font-semibold text-black transition hover:opacity-90"
          style={{
            background: `linear-gradient(90deg, ${activeColor}, ${activeColor}CC)`,
            boxShadow: `0 12px 30px ${activeColor}33`,
          }}
        >
          Start a Project
        </a>
      </motion.div>
    </header>
  );
};

export default WodhHeader_OptionB_SplitToggle;
