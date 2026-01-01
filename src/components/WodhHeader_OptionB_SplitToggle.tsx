"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "XR" | "Games";

const XR_LINKS = [
  { label: "Industries", href: "/industries" },
];

const GAME_LINKS = [
  { label: "Games", href: "#games" },
  { label: "Pipeline", href: "#process" },
  { label: "Engines", href: "#tech" },
  { label: "Projects", href: "#projects" },
];

const SERVICE_HUB_LINKS = [
  { label: "Service Hub", href: "/service-hub" },
  { label: "XR Services 357", href: "/xr-services-357" },
  { label: "Game Services", href: "/gameservicesv3" },
  { label: "3D Art & Design", href: "/3dart-designservicesv1" },
];

const COMMON_LINKS = [
  { label: "About", href: "/about-us" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

const BG = "#0C0722";
const PANEL = "#0F0A26";
const BORDER = "#2A1E55";
const NEON = "#9EF315";
const VIOLET = "#5B2DDC";

const WodhHeader_OptionB_SplitToggle: React.FC = () => {
  const [mode, setMode] = useState<Mode>("XR");
  const [scrolled, setScrolled] = useState(false);
  const [serviceHubOpen, setServiceHubOpen] = useState(false);
  const serviceHubRef = useRef<HTMLDivElement>(null);

  const links = useMemo(
    () => [...(mode === "XR" ? XR_LINKS : GAME_LINKS), ...COMMON_LINKS],
    [mode]
  );

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
    };

    if (serviceHubOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [serviceHubOpen]);

  const activeColor = mode === "XR" ? NEON : VIOLET;

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

        {/* Toggle */}
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
          <AnimatePresence mode="popLayout">
            {links.map((l) => (
              <motion.a
                key={mode + l.label}
                href={l.href}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="group relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition"
              >
                {l.label}
                <span
                  className="absolute left-2 right-2 -bottom-0.5 h-[2px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                  style={{
                    background: `linear-gradient(90deg, ${activeColor}, transparent)`,
                  }}
                />
              </motion.a>
            ))}
          </AnimatePresence>

          {/* Service Hub Dropdown */}
          <div ref={serviceHubRef} className="relative">
            <button
              onClick={() => setServiceHubOpen(!serviceHubOpen)}
              className="group relative px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition"
            >
              Service Hub
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
        </nav>

        {/* CTA */}
        <a
          href="/contact"
          className="relative inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 text-sm font-semibold text-black transition"
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

