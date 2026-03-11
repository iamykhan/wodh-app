/**
 * Technologies Section Content
 * Core engine/technology data for the homepage
 */

export type EngineKey = "unity" | "unreal" | "blender";

export interface Engine {
  key: EngineKey;
  eyebrow: string;
  name: string;
  role: string;
  description: string;
  features: string[];
  usage: string[];
}

export const technologiesContent = {
  eyebrow: "Core Technologies",
  heading: "Unity · Unreal · Blender",
  description:
    "Three engines, one unified workflow. Real-time from day zero means faster prototypes, cleaner builds, and sharper shipping.",
};

export const engines: Engine[] = [
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
  },
];
