/**
 * Component: About
 * About section with split layout
 * Refactored from legacy monolithic component
 */

"use client";

import React from "react";
import AboutWodh_Split_A from "@/components/AboutWodh_Split_A";

/**
 * About section - temporarily wrapping legacy component
 * TODO: Full refactor to use new architecture
 */
export function About() {
  return <AboutWodh_Split_A />;
}
