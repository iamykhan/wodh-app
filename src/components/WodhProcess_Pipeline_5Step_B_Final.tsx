"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  TestTube2,
  Cog,
  Sparkles,
  Send,
} from "lucide-react";

const NEON = "#9EF315";
const VIOLET = "#5B2DDC";
const BG = "#0C0722";
const PANEL = "#0F0A26";
const BORDER = "#2A1E55";
const TEXT_DIM = "#A8A8C3";
const TEXT_SOFT = "#D1C6FF";

const stages = [
  {
    title: "Concept",
    icon: Lightbulb,
    desc: "Gameplay / XR vision, story, mechanics, and clear outcomes.",
    tags: ["Workshops", "Story", "Mechanics"],
  },
  {
    title: "Prototype",
    icon: TestTube2,
    desc: "Fast interactive proof-of-concepts to validate direction early.",
    tags: ["POC Builds", "Interaction", "Validation"],
  },
  {
    title: "Production",
    icon: Cog,
    desc: "Full build: systems, 3D assets, animation, UI, networking, AI.",
    tags: ["Systems", "Art + Animation", "Engineering"],
  },
  {
    title: "Polish",
    icon: Sparkles,
    desc: "VFX, performance, UX refinement, stability and QA passes.",
    tags: ["VFX", "Performance", "QA Pass"],
  },
  {
    title: "Ship",
    icon: Send,
    desc: "Launch builds, store submission, deployment, and support.",
    tags: ["Launch", "Deployment", "Support"],
  },
];

const WodhProcess_Pipeline_5Step_B_Final: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-16 sm:px-6 lg:px-10 xl:px-16 lg:py-24 text-white"
      style={{ background: BG }}
    >
      {/* Background wash */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(1100px circle at 8% -10%, rgba(158,243,21,0.15), transparent 60%), radial-gradient(1000px circle at 92% 120%, rgba(91,45,220,0.55), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Head */}
        <div className="mb-10 text-center lg:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[0.35em] uppercase text-[#B9A8FF]"
          >
            {" "}
            Our Production Pipeline{" "}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold"
          >
            {" "}
            Concept to Launch — Without Friction{" "}
          </motion.h2>
          {/* 5) Optional one liner */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mx-auto mt-4 max-w-2xl text-sm sm:text-base"
            style={{ color: TEXT_DIM }}
          >
            {" "}
            A lightweight, sprint-based flow that keeps your XR & game project
            moving forward with full transparency.{" "}
          </motion.p>
        </div>

        {/* Pipeline wrapper */}
        <div className="relative">
          {/* 2) Alive neon line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden md:block">
            <motion.div
              className="h-[2px] w-full"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              style={{
                background: `linear-gradient(90deg, ${NEON}, ${VIOLET}, ${NEON})`,
                boxShadow: `0 0 20px ${NEON}66`,
                transformOrigin: "left",
              }}
            />
            {/* drifting glow overlay */}
            <motion.div
              className="absolute inset-0 h-[2px] w-1/3"
              initial={{ x: "-40%", opacity: 0.25 }}
              animate={{ x: "140%" }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: `linear-gradient(90deg, transparent, ${NEON}, ${VIOLET}, transparent)`,
                filter: "blur(2px)",
              }}
            />
          </div>

          {/* 4) Mobile vertical neon spine */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-2 top-0 bottom-0 w-[2px] md:hidden"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{
              background: `linear-gradient(180deg, ${NEON}, ${VIOLET})`,
              boxShadow: `0 0 14px ${NEON}66`,
              transformOrigin: "top",
            }}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:gap-5">
            {stages.map((st, i) => {
              const Icon = st.icon;
              return (
                <motion.div
                  key={st.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="group relative rounded-2xl border p-5 md:p-6"
                  style={{
                    background: PANEL,
                    borderColor: BORDER,
                  }}
                >
                  {/* Step index */}
                  <div
                    className="absolute -top-3 left-5 rounded-full px-2 py-[2px] text-xs font-semibold border"
                    style={{
                      background: BG,
                      borderColor: `${NEON}70`,
                      color: NEON,
                      boxShadow: `0 0 10px ${NEON}66`,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Icon + Title */}
                  <div className="mb-3 flex items-center gap-2">
                    <div
                      className="rounded-xl border p-2"
                      style={{
                        borderColor: BORDER,
                        background:
                          "linear-gradient(180deg, rgba(158,243,21,0.10), rgba(91,45,220,0.08))",
                      }}
                    >
                      <Icon size={18} style={{ color: NEON }} />
                    </div>
                    {/* 3) stronger hierarchy */}
                    <h3 className="text-lg font-semibold tracking-wide">
                      {st.title}
                    </h3>
                  </div>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: TEXT_DIM }}
                  >
                    {st.desc}
                  </p>

                  {/* 1) micro tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {st.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border px-2.5 py-1 text-[11px] font-medium"
                        style={{
                          borderColor: BORDER,
                          color: TEXT_SOFT,
                          background:
                            "linear-gradient(90deg, rgba(158,243,21,0.08), rgba(91,45,220,0.10))",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: `0 0 0 1px ${NEON}30, 0 0 36px ${NEON}12`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WodhProcess_Pipeline_5Step_B_Final;

