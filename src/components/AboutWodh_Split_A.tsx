"use client";

import React from "react";
import { motion } from "framer-motion";

const NEON = "text-[#9EF315]";
const VIOLET = "text-[#B9A8FF]";
const PANEL_BG = "bg-[#0F0A26]";
const BORDER_COLOR = "border-[#2A1E55]";
const FONT_STACK =
  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';

const SectionShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <section
    className="w-full bg-[#0C0722] text-white px-4 sm:px-6 lg:px-10 xl:px-16 py-16 lg:py-24"
    style={{ fontFamily: FONT_STACK }}
  >
    <div className="mx-auto max-w-6xl">{children}</div>
  </section>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-[#2A1E55] bg-[#0F0A26] px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#A8A8C3]">
    <span className="h-1.5 w-1.5 rounded-full bg-[#9EF315] shadow-[0_0_12px_rgba(158,243,21,0.9)]" />
    {children}
  </div>
);

const NeonPill: React.FC<{ label: string }> = ({ label }) => (
  <span className="rounded-full border border-[#2A1E55] bg-[#0A061A] px-3 py-1 text-xs text-[#D1C6FF]">
    {label}
  </span>
);

export const AboutWodh_Split_A: React.FC = () => {
  return (
    <SectionShell>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
        {/* Left: Visual World */}
        <motion.div
          className="relative rounded-3xl border border-[#2A1E55] bg-gradient-to-br from-[#0F0A26] via-[#1D1633] to-[#5B2DDC33] p-6 sm:p-8 overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.75)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* XR / Game Tag */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <Eyebrow>ABOUT THE STUDIO</Eyebrow>
              <h2 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">
                <span className="text-white">Wodh is where </span>
                <span className={NEON}>XR worlds</span>
                <span className="text-white"> and </span>
                <span className={VIOLET}>playable ideas</span>
                <span className="text-white"> are built.</span>
              </h2>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-2 text-right">
              <span className="text-xs uppercase tracking-[0.2em] text-[#A8A8C3]">
                {" "}
                FOUNDED{" "}
              </span>
              <span className="text-lg font-semibold text-white">2013 →</span>
              <span className="text-xs text-[#A8A8C3]">
                Built inside Dev House
              </span>
            </div>
          </div>

          {/* Visual grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <motion.div
              whileHover={{
                y: -4,
                boxShadow: "0 18px 40px rgba(0,0,0,0.9)",
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative rounded-2xl border border-[#2A1E55] bg-[#0A061A] p-4"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#A8A8C3]">
                {" "}
                XR / IMMERSIVE{" "}
              </p>
              <p className="mt-2 text-sm font-medium text-[#F3F3F3]">
                {" "}
                City-scale AR portals, training simulators, retail XR, digital
                twins.{" "}
              </p>
              <p className="mt-3 text-xs text-[#A8A8C3]">
                {" "}
                We design moments that feel calm, precise and usable — not
                gimmicky.{" "}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <NeonPill label="Unity" />
                <NeonPill label="Unreal" />
                <NeonPill label="AR · VR · MR" />
              </div>
            </motion.div>
            <motion.div
              whileHover={{
                y: -4,
                boxShadow: "0 18px 40px rgba(0,0,0,0.9)",
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative rounded-2xl border border-[#2A1E55] bg-[#0A061A] p-4"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#A8A8C3]">
                {" "}
                GAMES & INTERACTIVE{" "}
              </p>
              <p className="mt-2 text-sm font-medium text-[#F3F3F3]">
                {" "}
                Mobile, PC and web games with tight feel, readable feedback and
                polish.{" "}
              </p>
              <p className="mt-3 text-xs text-[#A8A8C3]">
                {" "}
                From hyper-casual sprints to narrative prototypes, we ship fast
                and refine.{" "}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <NeonPill label="Gameplay Prototyping" />
                <NeonPill label="Live Ops Ready" />
              </div>
            </motion.div>
          </div>

          {/* Ambient glow */}
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-56 w-56 rounded-full bg-[#9EF31533] blur-[80px]" />
          <div className="pointer-events-none absolute -top-36 -left-10 h-64 w-64 rounded-full bg-[#5B2DDC55] blur-[90px]" />
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="space-y-6 max-w-xl"
        >
          <Eyebrow>ABOUT WODH</Eyebrow>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
            {" "}
            A <span className={NEON}>creative technology studio</span> for XR
            worlds and playable experiences.{" "}
          </h3>
          <p className="text-sm sm:text-base text-[#D1C6FF] leading-relaxed">
            {" "}
            Wodh is the dedicated XR & game arm of Dev House — a focused team
            that blends engineering discipline with playful experimentation. We
            partner with brands, agencies and product teams to move beyond
            slides and into working, interactive experiences.{" "}
          </p>
          <p className="text-sm sm:text-base text-[#A8A8C3] leading-relaxed">
            {" "}
            From early-stage prototypes to production-ready builds, we care about
            feel, performance and narrative. Every project is treated like a
            small lab: measurable, iterative, and designed to ship — not just
            demo.{" "}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={`rounded-2xl border ${BORDER_COLOR} ${PANEL_BG} p-4`}>
              <p className="text-xs uppercase tracking-[0.18em] text-[#A8A8C3]">
                {" "}
                HOW WE WORK{" "}
              </p>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#D1C6FF]">
                <li>• Small senior squads, no noisy handoffs</li>
                <li>• Tight feedback loops with real builds</li>
                <li>• Transparent scope and milestones</li>
              </ul>
            </div>
            <div className={`rounded-2xl border ${BORDER_COLOR} ${PANEL_BG} p-4`}>
              <p className="text-xs uppercase tracking-[0.18em] text-[#A8A8C3]">
                {" "}
                WHAT WE CARE ABOUT{" "}
              </p>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[#D1C6FF]">
                <li>• Comfort-first XR experiences</li>
                <li>• Games that feel good to touch</li>
                <li>• Long-term technical foundations</li>
              </ul>
            </div>
          </div>
          {/* Brand tag */}
          <p className="pt-1 text-[11px] uppercase tracking-[0.22em] text-[#6E6E90]">
            {" "}
            XR & GAME STUDIO · POWERED BY DEV HOUSE{" "}
          </p>
        </motion.div>
      </div>
    </SectionShell>
  );
};

export default AboutWodh_Split_A;

