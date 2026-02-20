/**
 * Team Section Content
 * Core team member data for the homepage
 */

import { LucideIcon, Cuboid, Gamepad2, CircleDashed } from "lucide-react";

export type Lane = "XR" | "Games" | "R&D";

export interface TeamMember {
  name: string;
  role: string;
  lane: Lane;
  bio: string;
  signature: string;
  image: string;
  linkedin?: string;
}

export const teamContent = {
  eyebrow: "Core Team",
  heading: "The people behind Wodh.",
  description:
    "A tight leadership crew shipping XR, games, and real-time R&D worldwide.",
  fullTeamLink: {
    text: "Meet full team",
    href: "/team",
  },
  bottomNote:
    "This is our leadership nucleus — your project gets direct senior ownership from day one.",
  ctaStrip: {
    text: "The extended roster lives on the Team page.",
    link: {
      text: "View full team →",
      href: "/team",
    },
  },
};

export const laneIcons: Record<Lane, LucideIcon> = {
  XR: Cuboid,
  Games: Gamepad2,
  "R&D": CircleDashed,
};

export const coreTeamMembers: TeamMember[] = [
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
