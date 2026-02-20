/**
 * FAQ Section Content
 * Frequently asked questions for the homepage
 */

export type FAQCategory = "General" | "Production" | "Tech" | "Collaboration";

export interface FAQItem {
  question: string;
  answer: string;
  category: FAQCategory;
}

export const faqContent = {
  eyebrow: "FAQ",
  heading: "Ask Anything",
  description: "Filter by category or type a keyword to find quick answers.",
  searchPlaceholder: "Search questions…",
  clearButton: "Clear search",
  noResults: "No results found.",
};

export const faqCategories: FAQCategory[] = ["General", "Production", "Tech", "Collaboration"];

export const faqItems: FAQItem[] = [
  {
    question: "What does Wodh build?",
    answer:
      "XR (AR/VR/MR), real-time simulations, and games across mobile, PC, and headsets — from prototypes to full launches.",
    category: "General",
  },
  {
    question: "How long does a full production take?",
    answer:
      "Typical timelines are 2–6+ months depending on scope, platform targets, and feature depth. We set milestones early.",
    category: "Production",
  },
  {
    question: "Do you start with a prototype?",
    answer:
      "Yes. We validate direction early through playable / interactive POC builds before scaling into full production.",
    category: "Production",
  },
  {
    question: "Which engines do you use?",
    answer:
      "Unity and Unreal Engine are our core. We choose based on your goals, constraints, and platform requirements.",
    category: "Tech",
  },
  {
    question: "Can you join an existing build mid-way?",
    answer:
      "Absolutely. We can stabilize, optimize, add features, or complete projects already in development.",
    category: "Collaboration",
  },
  {
    question: "How do we kick off a project?",
    answer: "Send a brief → discovery call → roadmap → prototype sprint or production start.",
    category: "General",
  },
];
