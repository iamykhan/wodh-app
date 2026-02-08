/**
 * Design Tokens: Animations
 * Centralized animation configurations for Framer Motion
 * Consistent timing, easing, and transitions across the app
 */

import { Variants, Transition } from "framer-motion";

/**
 * Standard easing curves
 */
export const easing = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  snappy: [0.6, 0.01, 0.05, 0.95],
  bounce: [0.68, -0.55, 0.265, 1.55],
  ease: "easeInOut",
  easeIn: "easeIn",
  easeOut: "easeOut",
  linear: "linear",
} as const;

/**
 * Standard duration values (in seconds)
 */
export const duration = {
  instant: 0.15,
  fast: 0.25,
  normal: 0.4,
  slow: 0.6,
  slower: 0.85,
  slowest: 1.2,
} as const;

/**
 * Standard spring configurations
 */
export const spring = {
  default: {
    type: "spring",
    stiffness: 500,
    damping: 40,
  },
  bouncy: {
    type: "spring",
    stiffness: 400,
    damping: 25,
  },
  stiff: {
    type: "spring",
    stiffness: 700,
    damping: 50,
  },
  smooth: {
    type: "spring",
    stiffness: 300,
    damping: 35,
  },
} as const;

/**
 * Fade variants - for fade in/out animations
 */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * Slide up variants - for slide in from bottom
 */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

/**
 * Slide down variants - for slide in from top
 */
export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

/**
 * Scale variants - for scale in/out animations
 */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

/**
 * Hover lift - for card/button hover states
 */
export const hoverLiftVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.015 },
};

/**
 * Stagger children animation
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Standard transition configurations
 */
export const transitions = {
  default: {
    duration: duration.normal,
    ease: easing.smooth,
  } as Transition,

  fast: {
    duration: duration.fast,
    ease: easing.smooth,
  } as Transition,

  slow: {
    duration: duration.slow,
    ease: easing.smooth,
  } as Transition,

  spring: spring.default as Transition,

  springBouncy: spring.bouncy as Transition,
} as const;

/**
 * Viewport animation config for scroll-triggered animations
 */
export const viewportConfig = {
  once: true,
  margin: "0px 0px -100px 0px",
  amount: 0.3,
} as const;

/**
 * Background blur transition for header
 */
export const headerScrollTransition = {
  scrolled: {
    backgroundColor: "rgba(15, 10, 38, 0.9)",
    backdropFilter: "blur(10px)",
  },
  top: {
    backgroundColor: "rgba(12, 7, 34, 0.4)",
    backdropFilter: "blur(6px)",
  },
  transition: {
    duration: duration.fast,
  },
} as const;

/**
 * Glow pulse animation for accent elements
 */
export const glowPulse = {
  scale: [1, 1.05, 1],
  opacity: [0.6, 1, 0.6],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
} as const;

/**
 * Particle float animation (for CSS keyframes)
 */
export const particleFloatKeyframes = `
  @keyframes floatParticle {
    0% {
      transform: translate3d(0, 0, 0);
      opacity: 0.15;
    }
    25% {
      opacity: 0.5;
    }
    50% {
      transform: translate3d(12px, -18px, 0);
      opacity: 0.35;
    }
    75% {
      opacity: 0.6;
    }
    100% {
      transform: translate3d(-10px, -32px, 0);
      opacity: 0.1;
    }
  }
`;

/**
 * Hyperspeed animation (for CSS keyframes)
 */
export const hyperspeedKeyframes = `
  @keyframes hyperspeedMove {
    0% {
      transform: translateY(0) translateX(0) rotate(12deg);
    }
    100% {
      transform: translateY(35%) translateX(-15%) rotate(12deg);
    }
  }
`;
