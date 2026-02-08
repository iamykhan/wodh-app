/**
 * Key Stats Section Content
 * Centralized content for statistics section
 */

export interface Stat {
  label: string;
  note: string;
  value: number;
  suffix?: string;
}

export const mainStat: Stat = {
  label: "Years in XR & Game Development",
  value: 8,
  suffix: "+",
  note: "Hands-on production and R&D in immersive tech.",
};

export const stats: Stat[] = [
  {
    label: "AR / VR Projects Delivered",
    value: 45,
    suffix: "+",
    note: "Prototypes, pilots and full-scale experiences.",
  },
  {
    label: "Games Shipped",
    value: 12,
    suffix: "+",
    note: "Across PC, mobile and headset platforms.",
  },
  {
    label: "Active R&D Tracks",
    value: 4,
    note: "AI, procedural worlds, spatial UX and haptics.",
  },
];

export const keyStatsContent = {
  eyebrow: "WODH IN NUMBERS",
  title: "Key stats you",
  titleAccent: "see at a glance.",
  description:
    "No sliders, no extra clicks — just the core XR numbers that show what Wodh has actually shipped and explored.",
  mainStat,
  stats,
};
