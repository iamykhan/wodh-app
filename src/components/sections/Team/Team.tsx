/**
 * Component: Team
 * Core team member showcase section
 * Refactored to use clean architecture with content separation
 */

"use client";

import { Sparkles, ArrowUpRight } from "lucide-react";
import { TeamMemberCard } from "./TeamMemberCard";
import { colors } from "@/lib/design-tokens";
import { teamContent, coreTeamMembers } from "@/content/home/team";

/**
 * Team section with core team member cards
 */
export function Team() {
  return (
    <section
      id="team"
      className="w-full text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-10 xl:px-16"
      style={{ background: colors.background.primary }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wider uppercase"
              style={{
                borderColor: colors.border.primary,
                background: colors.background.panel,
                color: colors.text.pale,
              }}
            >
              <Sparkles size={14} color={colors.neon.base} />
              {teamContent.eyebrow}
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              {teamContent.heading}
            </h2>
            <p className="mt-3 text-base sm:text-lg max-w-2xl" style={{ color: colors.violet.pale }}>
              {teamContent.description}
            </p>
          </div>
          <a
            href={teamContent.fullTeamLink.href}
            className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-90"
            style={{ color: colors.neon.base }}
          >
            {teamContent.fullTeamLink.text} <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Team member cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {coreTeamMembers.map((member, i) => (
            <TeamMemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* Leadership ownership note */}
        <p className="mt-5 text-sm text-center" style={{ color: colors.violet.pale }}>
          {teamContent.bottomNote}
        </p>

        {/* Bottom CTA strip */}
        <div
          className="mt-6 rounded-2xl border px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          style={{
            background: colors.background.overlay,
            borderColor: colors.border.primary,
          }}
        >
          <p style={{ color: colors.violet.pale }}>{teamContent.ctaStrip.text}</p>
          <a href={teamContent.ctaStrip.link.href} className="font-semibold" style={{ color: colors.neon.base }}>
            {teamContent.ctaStrip.link.text}
          </a>
        </div>
      </div>
    </section>
  );
}
