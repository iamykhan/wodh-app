/**
 * Expertise Section Content
 * Centralized content for expertise/services
 */

export interface ExpertiseItem {
  title: string;
  gradient: "xr" | "games";
  description: string;
  link: string;
}

export const expertiseItems: ExpertiseItem[] = [
  {
    title: "Game Development",
    gradient: "xr",
    description:
      "From concept to launch, we craft interactive experiences for mobile, PC, console & web using Unity, Unreal Engine & proprietary stacks.",
    link: "View Game Projects →",
  },
  {
    title: "XR & Metaverse",
    gradient: "games",
    description:
      "Immersive AR, VR & MR experiences that redefine engagement — built for Apple Vision Pro, Meta Quest, Pico & WebXR.",
    link: "Explore XR Work →",
  },
  {
    title: "3D Design",
    gradient: "xr",
    description:
      "Stylized & realistic assets, environments, characters & cinematics — optimized for real-time engines & XR pipelines.",
    link: "Watch 3D Reel →",
  },
  {
    title: "Creative Tech",
    gradient: "games",
    description:
      "WebGL, gamified funnels, interactive microsites & installations where code, design and play intersect.",
    link: "See Interactive Work →",
  },
];

export const expertiseContent = {
  eyebrow: "Our Expertise",
  title: "The worlds we build.",
  description:
    "Four core dimensions of Wodh — visible from the start, amplified on hover.",
};
