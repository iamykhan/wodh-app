"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Cuboid,
  Gamepad2,
  CircleDashed,
  Sparkles,
  ArrowUpRight,
  Linkedin,
} from "lucide-react";

const BG = "#0C0722";
const PANEL = "#0F0A26";
const PANEL_2 = "#0B0720";
const BORDER = "#2A1E55";
const NEON = "#9EF315";
const VIOLET = "#5B2DDC";
const TEXT_DIM = "#A8A8C3";
const TEXT_SOFT = "#D1C6FF";

type Lane = "XR" | "Games" | "R&D";

type Member = {
  name: string;
  role: string;
  lane: Lane;
  bio: string;
  signature: string;
  image: string;
  linkedin?: string;
};

const CORE: Member[] = [
  {
    name: "Ahmad Khan",
    role: "Founder / CEO",
    lane: "XR",
    bio: "Leads Wodh's product direction across immersive tech and games.",
    signature: "Ships with high-fidelity speed.",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1600&auto=format&fit=crop",
    linkedin: "#",
  },
  {
    name: "Talha Rehman",
    role: "Head of Production",
    lane: "R&D",
    bio: "Owns pipelines, delivery rituals, and cross-team alignment.",
    signature: "Turns chaos into launch days.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1600&auto=format&fit=crop",
    linkedin: "#",
  },
  {
    name: "Hira Noor",
    role: "Creative Director",
    lane: "Games",
    bio: "Defines world tone, look-dev direction, and narrative feel.",
    signature: "Designs worlds you remember.",
    image:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1600&auto=format&fit=crop",
    linkedin: "#",
  },
  {
    name: "Saad Ali",
    role: "Tech Director",
    lane: "XR",
    bio: "Architects scalable real-time systems with ruthless performance.",
    signature: "Keeps frames smooth.",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1600&auto=format&fit=crop",
    linkedin: "#",
  },
];

const LaneIcon = ({ lane }: { lane: Lane }) => {
  if (lane === "XR") return <Cuboid size={14} color={NEON} />;
  if (lane === "Games") return <Gamepad2 size={14} color={NEON} />;
  return <CircleDashed size={14} color={NEON} />;
};

const WodhTeam_Core_StaticHomepage_V5_Final: React.FC = () => {
  return (
    <section
      id="team"
      className="w-full text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-10 xl:px-16"
      style={{ background: BG }}
    >
      {/* keyframes once for glare */}
      <style>{`
        @keyframes wodhGlareSweep {
          0% {
            transform: translateX(-120%) rotate(8deg);
            opacity: 0;
          }
          18% {
            opacity: 1;
          }
          100% {
            transform: translateX(120%) rotate(8deg);
            opacity: 0;
          }
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wider uppercase"
              style={{
                borderColor: BORDER,
                background: PANEL,
                color: TEXT_DIM,
              }}
            >
              <Sparkles size={14} color={NEON} />
              Core Team
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              {" "}
              The people behind Wodh.{" "}
            </h2>
            <p
              className="mt-3 text-base sm:text-lg max-w-2xl"
              style={{ color: TEXT_SOFT }}
            >
              {" "}
              A tight leadership crew shipping XR, games, and real-time R&D
              worldwide.{" "}
            </p>
          </div>
          <a
            href="/team"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-90"
            style={{ color: NEON }}
          >
            {" "}
            Meet full team <ArrowUpRight size={16} />{" "}
          </a>
        </div>

        {/* 4 big cards in one row on desktop */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {CORE.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className="group rounded-3xl border overflow-hidden relative transition-transform hover:-translate-y-1.5"
              style={{
                background: PANEL,
                borderColor: BORDER,
              }}
            >
              {/* MEDIA: tall so picture dominates */}
              <div className="relative aspect-[3/4] bg-[#0B0720]">
                <img
                  src={m.image}
                  alt={m.name}
                  className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:brightness-110 group-hover:contrast-105"
                />

                {/* Character aura (subtle NEON/VIOLET energy) */}
                <div
                  className="absolute inset-0 opacity-80 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(70% 70% at 18% 8%, rgba(158,243,21,0.28), transparent 60%), radial-gradient(65% 65% at 92% 92%, rgba(91,45,220,0.34), transparent 65%)",
                    mixBlendMode: "screen",
                  }}
                />

                {/* Vignette for readability */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(12,7,34,0.10) 0%, transparent 45%, rgba(12,7,34,0.98) 100%)",
                  }}
                />

                {/* Lane pill */}
                <div
                  className="absolute top-3 left-3 text-[11px] px-2 py-1 rounded-full border flex items-center gap-1"
                  style={{
                    borderColor: BORDER,
                    background: "#0B0720AA",
                    color: "white",
                  }}
                >
                  <LaneIcon lane={m.lane} />
                  {m.lane}
                </div>

                {/* UI spark node */}
                <div
                  className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full"
                  style={{
                    background: NEON,
                    boxShadow: `0 0 18px ${NEON}`,
                  }}
                />

                {/* CLEAR neon glare sweep on hover */}
                <div
                  className="absolute inset-[-35%] opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 28%, rgba(158,243,21,0.55) 50%, transparent 72%)",
                    mixBlendMode: "screen",
                    animation: "wodhGlareSweep 1.5s ease-in-out forwards",
                  }}
                />

                {/* LinkedIn hover reveal */}
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 flex items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition"
                    aria-label={`${m.name} LinkedIn`}
                  >
                    <div
                      className="inline-flex items-center gap-2 text-xs rounded-full border px-2.5 py-1"
                      style={{
                        borderColor: BORDER,
                        background: "#0B0720CC",
                        color: "white",
                        boxShadow: `0 0 16px ${NEON}22`,
                      }}
                    >
                      <Linkedin size={14} color={NEON} />
                      View profile
                    </div>
                  </a>
                )}
              </div>

              {/* Content (compact to keep media big) */}
              <div className="p-4">
                <p className="text-lg font-semibold">{m.name}</p>
                <p className="text-sm mt-0.5" style={{ color: TEXT_DIM }}>
                  {" "}
                  {m.role}{" "}
                </p>
                <p
                  className="text-sm mt-2 leading-relaxed"
                  style={{ color: TEXT_SOFT }}
                >
                  {" "}
                  {m.bio}{" "}
                </p>
                <p className="text-sm mt-1 font-medium" style={{ color: NEON }}>
                  {" "}
                  {m.signature}{" "}
                </p>
              </div>

              {/* Neon green edge glow on hover */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                  boxShadow: `0 0 0 1px ${NEON}66 inset, 0 18px 60px rgba(158,243,21,0.22)`,
                }}
              />
            </motion.article>
          ))}
        </div>

        {/* Leadership ownership note */}
        <p
          className="mt-5 text-sm text-center"
          style={{ color: TEXT_SOFT }}
        >
          {" "}
          This is our leadership nucleus — your project gets direct senior
          ownership from day one.{" "}
        </p>

        {/* Bottom CTA strip */}
        <div
          className="mt-6 rounded-2xl border px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          style={{
            background: PANEL_2,
            borderColor: BORDER,
          }}
        >
          <p style={{ color: TEXT_SOFT }}>
            {" "}
            The extended roster lives on the Team page.{" "}
          </p>
          <a href="/team" className="font-semibold" style={{ color: NEON }}>
            {" "}
            View full team →{" "}
          </a>
        </div>
      </div>
    </section>
  );
};

export default WodhTeam_Core_StaticHomepage_V5_Final;

