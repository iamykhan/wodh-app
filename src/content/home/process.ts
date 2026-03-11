/**
 * Process Section Content
 * 5-step production pipeline content for the homepage
 */

import { LucideIcon, Lightbulb, TestTube2, Cog, Sparkles, Send } from "lucide-react";

export interface ProcessStage {
  title: string;
  icon: LucideIcon;
  description: string;
  tags: string[];
}

export const processContent = {
  eyebrow: "Our Production Pipeline",
  heading: "Concept to Launch — Without Friction",
  description:
    "A lightweight, sprint-based flow that keeps your XR & game project moving forward with full transparency.",
};

export const processStages: ProcessStage[] = [
  {
    title: "Concept",
    icon: Lightbulb,
    description: "Gameplay / XR vision, story, mechanics, and clear outcomes.",
    tags: ["Workshops", "Story", "Mechanics"],
  },
  {
    title: "Prototype",
    icon: TestTube2,
    description: "Fast interactive proof-of-concepts to validate direction early.",
    tags: ["POC Builds", "Interaction", "Validation"],
  },
  {
    title: "Production",
    icon: Cog,
    description: "Full build: systems, 3D assets, animation, UI, networking, AI.",
    tags: ["Systems", "Art + Animation", "Engineering"],
  },
  {
    title: "Polish",
    icon: Sparkles,
    description: "VFX, performance, UX refinement, stability and QA passes.",
    tags: ["VFX", "Performance", "QA Pass"],
  },
  {
    title: "Ship",
    icon: Send,
    description: "Launch builds, store submission, deployment, and support.",
    tags: ["Launch", "Deployment", "Support"],
  },
];
