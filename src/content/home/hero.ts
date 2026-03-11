/**
 * Hero Section Content
 * Centralized content for the landing page hero
 */

export interface HeroCardData {
  mode: "xr" | "games";
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  chips: string[];
  buttons: {
    primary: { text: string; href: string };
    secondary: { text: string; href: string };
  };
}

export interface TrustLogo {
  name: string;
  src: string;
}

export const heroCards: Record<"xr" | "games", HeroCardData> = {
  xr: {
    mode: "xr",
    eyebrow: "XR STUDIO",
    title: "BUILDING",
    titleAccent: "SPATIAL REALITIES",
    description:
      "AR activations, VR training, mixed-reality platforms, and location-based XR experiences that feel seamless in the real world.",
    chips: ["AR • VR • MR", "Unity / Unreal", "Real-time worlds"],
    buttons: {
      primary: { text: "Explore XR Work", href: "#xr-projects" },
      secondary: { text: "Start XR Project", href: "/contact" },
    },
  },
  games: {
    mode: "games",
    eyebrow: "GAMES STUDIO",
    title: "CREATING",
    titleAccent: "PLAYABLE UNIVERSES",
    description:
      "Mobile, PC, and multiplayer games with iconic mechanics, authentic art, and long-tail engagement.",
    chips: ["Mobile / PC", "Multiplayer", "Live Ops Ready"],
    buttons: {
      primary: { text: "Explore Game Work", href: "#game-projects" },
      secondary: { text: "Start Game Project", href: "/contact" },
    },
  },
};

export const trustLogos: TrustLogo[] = [
  {
    name: "Meta",
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Meta_Platforms_Inc._logo.svg",
  },
  {
    name: "Microsoft",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Sony",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  },
  {
    name: "Unity",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/19/Unity_Technologies_logo.svg",
  },
  {
    name: "Unreal Engine",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Unreal_Engine_Logo.svg",
  },
  {
    name: "Niantic",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Niantic_logo.svg",
  },
];

export const heroContent = {
  eyebrow: {
    studio: "WODH STUDIO",
    tagline: "XR Studio · Games Studio · R&D Lab",
  },
  trustStrip: {
    title: "TRUSTED BY TEAMS WORLDWIDE",
    logos: trustLogos,
  },
  videoUrl: "", // Optional: add video URL for background
};
