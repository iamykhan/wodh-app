/**
 * Industries Page Types
 * Centralized type definitions for industries functionality
 */

export type Studio = "XR" | "Games" | "Hybrid";

export interface Industry {
  id: string;
  name: string;
  studio: Studio;
  outcomes: string[];
  seoTitle: string;
  seoIntro: string;
  useCases: string[];
  platforms: string[];
}

export interface Playbook {
  id: string;
  industry: string;
  studio: Studio;
  goal: string;
  typicalBuild: string;
  keySystems: string[];
  shipChecklist: string[];
}

export type Topic =
  | "Overview"
  | "Timeline"
  | "Pricing"
  | "Platforms"
  | "Security"
  | "Process"
  | "IP"
  | "Support";

export interface FAQ {
  id: string;
  topic: Topic;
  studio: Studio;
  q: string;
  a: string;
  keywords: string[];
  linkHref?: string;
  linkLabel?: string;
}

export interface Axis {
  label: string;
  xrValue: number;
  gamesValue: number;
}
