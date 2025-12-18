"use client";

import React from "react";

const WODH_BG = "#0C0722";
const WODH_PANEL = "#0F0A26";
const WODH_BORDER = "#2A1E55";
const WODH_NEON = "#9EF315";
const WODH_VIOLET = "#5B2DDC";

const cardBase =
  "relative rounded-2xl border transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(158,243,21,0.45)]";

type EngineKey = "unity" | "unreal" | "blender";

type Engine = {
  key: EngineKey;
  eyebrow: string;
  name: string;
  role: string;
  description: string;
  features: string[];
  usage: string[];
  stripColor: string;
};

const ENGINES: Engine[] = [
  {
    key: "unity",
    eyebrow: "ENGINE 01",
    name: "Unity",
    role: "XR + GAMES",
    description:
      "Our main engine for XR and cross-platform games. Fast iteration, strong mobile support and one codebase that can serve both XR pilots and full titles.",
    features: [
      "AR Foundation (ARKit / ARCore)",
      "URP / HDRP pipelines",
      "XR Interaction Toolkit",
      "Netcode & Photon multiplayer",
    ],
    usage: [
      "City-scale AR layers",
      "Training & enterprise XR",
      "Casual & midcore games",
    ],
    stripColor: `linear-gradient(180deg, ${WODH_NEON}, transparent)`,
  },
  {
    key: "unreal",
    eyebrow: "ENGINE 02",
    name: "Unreal",
    role: "HIGH-FIDELITY WORLDS",
    description:
      "For realism, lighting and cinematic presence. Perfect for premium XR corridors and high-end PC experiences.",
    features: [
      "Lumen global illumination",
      "Nanite geometry",
      "Sequencer cinematics",
      "OpenXR PC headsets",
    ],
    usage: [
      "Hyper-real XR installations",
      "Branded premium experiences",
      "Cinematic PC scenes",
    ],
    stripColor: `linear-gradient(180deg, ${WODH_VIOLET}, transparent)`,
  },
  {
    key: "blender",
    eyebrow: "ENGINE 03",
    name: "Blender",
    role: "3D PIPELINE · ASSETS",
    description:
      "Shared 3D pipeline for both XR and games. Game-ready meshes, worlds and props tuned specifically for real-time engines.",
    features: [
      "Game-ready meshes & UVs",
      "Baking & optimisation",
      "Stylised & realistic looks",
      "Substance / Quixel friendly",
    ],
    usage: ["Characters & props", "Environment kits", "Optimised XR asset packs"],
    stripColor: `linear-gradient(180deg, rgba(158,243,21,0.7), rgba(91,45,220,0.8))`,
  },
];

function wordGradient(key: EngineKey) {
  switch (key) {
    case "unity":
      return `linear-gradient(120deg, ${WODH_NEON}, #d7ffa0)`;
    case "unreal":
      return `linear-gradient(120deg, ${WODH_VIOLET}, #9b5aff)`;
    case "blender":
      return "linear-gradient(120deg, #B9A8FF, rgba(158,243,21,0.9))";
  }
}

function glowBackground(key: EngineKey) {
  switch (key) {
    case "unity":
      return "radial-gradient(circle, rgba(158,243,21,0.4), transparent 70%)";
    case "unreal":
      return "radial-gradient(circle, rgba(91,45,220,0.5), transparent 70%)";
    case "blender":
      return "radial-gradient(circle, rgba(185,168,255,0.45), transparent 70%)";
  }
}

function underlineGradient(key: EngineKey) {
  switch (key) {
    case "unity":
      return `linear-gradient(90deg, ${WODH_NEON}, #e5ff9c)`;
    case "unreal":
      return `linear-gradient(90deg, ${WODH_VIOLET}, #9b5aff)`;
    case "blender":
      return `linear-gradient(90deg, #B9A8FF, ${WODH_NEON})`;
  }
}

const WodhTechnologies_CoreEngines_RowAligned_Hover_AD_Final: React.FC = () => {
  return (
    <section
      className="w-full py-20 px-4"
      style={{ backgroundColor: WODH_BG }}
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER LIKE YOUR SCREENSHOT */}
        <div className="mb-12">
          <div className="mb-2 flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#B9A8FF]">
            <span
              className="h-[1px] w-6"
              style={{
                background: `linear-gradient(90deg, ${WODH_NEON}, ${WODH_VIOLET})`,
              }}
            />
            Core Technologies
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-[32px] font-semibold text-white">
            {" "}
            Unity · Unreal · Blender{" "}
          </h2>
          <p className="mt-2 text-sm md:text-[15px] text-[#A8A8C3] leading-relaxed max-w-2xl">
            {" "}
            Three engines, one unified workflow. Real-time from day zero means
            faster prototypes, cleaner builds, and sharper shipping.{" "}
          </p>
        </div>

        {/* 3 aligned rows: LEFT big word + RIGHT card */}
        <div className="grid gap-x-10 gap-y-6 lg:grid-cols-[0.9fr_1.1fr]">
          {ENGINES.map((engine) => (
            <React.Fragment key={engine.key}>
              {/* LEFT – big hero word with neon glow + lift + underline glow */}
              <div className="flex items-stretch">
                <div className="relative flex h-full items-center">
                  <div className="relative group">
                    {/* Radial neon glow (rounded, not square) */}
                    <div
                      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        width: "140%",
                        height: "80%",
                        borderRadius: "999px",
                        background: glowBackground(engine.key),
                      }}
                    />
                    {/* Word + underline wrapper */}
                    <div className="transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                      <span
                        className="uppercase font-semibold leading-none tracking-[-0.06em] text-[56px] md:text-[80px] lg:text-[104px] block"
                        style={{
                          background: wordGradient(engine.key),
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                        }}
                      >
                        {engine.name.toUpperCase()}
                      </span>
                      {/* Underline glow – expands on hover */}
                      <div className="mt-3 h-[3px] w-0 rounded-full bg-transparent overflow-hidden transition-all duration-300 group-hover:w-full">
                        <div
                          className="h-full w-full rounded-full shadow-[0_0_25px_rgba(158,243,21,0.6)]"
                          style={{
                            background: underlineGradient(engine.key),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT – engine card */}
              <EngineCard engine={engine} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

function EngineCard({ engine }: { engine: Engine }) {
  return (
    <div
      className={`${cardBase} overflow-hidden h-full`}
      style={{
        borderColor: WODH_BORDER,
        background: WODH_PANEL,
      }}
    >
      <div className="flex h-full">
        {/* vertical accent strip */}
        <div
          className="w-1 md:w-[6px]"
          style={{ background: engine.stripColor }}
        />
        <div className="flex-1 p-5 md:p-6 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.23em] text-[#B9A8FF]">
                {engine.eyebrow}
              </p>
              <h3 className="mt-1 text-lg md:text-xl font-semibold text-white">
                {engine.name}
              </h3>
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#A8A8C3] mt-1">
                {engine.role}
              </p>
            </div>
            <span className="rounded-full bg-[#1D1633]/80 px-3 py-1 text-[11px] text-[#D1C6FF]">
              {" "}
              Engine{" "}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#D1C6FF] leading-relaxed">
            {engine.description}
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-2 text-[11px] text-[#A8A8C3]">
            {engine.features.map((f) => (
              <span
                key={f}
                className="rounded-full bg-[#1D1633]/80 px-2.5 py-1"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Usage chips */}
          <div className="flex flex-wrap gap-2 text-[11px] text-[#F3F3F3]">
            {engine.usage.map((u) => (
              <span
                key={u}
                className="rounded-full bg-[#1D1633]/70 px-2.5 py-1"
              >
                {u}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WodhTechnologies_CoreEngines_RowAligned_Hover_AD_Final;

