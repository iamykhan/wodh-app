/**
 * TeamMemberCard Component
 * Individual team member card with image and details
 */

"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { colors } from "@/lib/design-tokens";
import { TeamMember, laneIcons } from "@/content/home/team";

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const LaneIcon = laneIcons[member.lane];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className="group rounded-3xl border overflow-hidden relative transition-transform hover:-translate-y-1.5"
      style={{
        background: colors.background.panel,
        borderColor: colors.border.primary,
      }}
    >
      {/* Glare sweep animation keyframes */}
      <style>{`
        @keyframes wodhGlareSweep {
          0% {
            transform: translateX(-120%) rotate(8deg);
            opacity: 0;
          }
          18% {
            opacity: 1;
          }
          100% {
            transform: translateX(120%) rotate(8deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Image section */}
      <div className="relative aspect-[3/4]" style={{ background: colors.background.overlay }}>
        <img
          src={member.image}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:brightness-110 group-hover:contrast-105"
        />

        {/* Character aura (subtle neon/violet energy) */}
        <div
          className="absolute inset-0 opacity-80 pointer-events-none"
          style={{
            background: `radial-gradient(70% 70% at 18% 8%, ${colors.neon.base}47, transparent 60%), radial-gradient(65% 65% at 92% 92%, ${colors.violet.base}57, transparent 65%)`,
            mixBlendMode: "screen",
          }}
        />

        {/* Vignette for readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, ${colors.background.primary}19 0%, transparent 45%, ${colors.background.primary}FA 100%)`,
          }}
        />

        {/* Lane pill */}
        <div
          className="absolute top-3 left-3 text-[11px] px-2 py-1 rounded-full border flex items-center gap-1"
          style={{
            borderColor: colors.border.primary,
            background: `${colors.background.overlay}AA`,
            color: colors.text.primary,
          }}
        >
          <LaneIcon size={14} color={colors.neon.base} />
          {member.lane}
        </div>

        {/* UI spark node */}
        <div
          className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full"
          style={{
            background: colors.neon.base,
            boxShadow: `0 0 18px ${colors.neon.base}`,
          }}
        />

        {/* Neon glare sweep on hover */}
        <div
          className="absolute inset-[-35%] opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `linear-gradient(120deg, transparent 28%, ${colors.neon.base}8C 50%, transparent 72%)`,
            mixBlendMode: "screen",
            animation: "wodhGlareSweep 1.5s ease-in-out forwards",
          }}
        />

        {/* LinkedIn hover reveal */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0 flex items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition"
            aria-label={`${member.name} LinkedIn`}
          >
            <div
              className="inline-flex items-center gap-2 text-xs rounded-full border px-2.5 py-1"
              style={{
                borderColor: colors.border.primary,
                background: `${colors.background.overlay}CC`,
                color: colors.text.primary,
                boxShadow: `0 0 16px ${colors.neon.base}22`,
              }}
            >
              <Linkedin size={14} color={colors.neon.base} />
              View profile
            </div>
          </a>
        )}
      </div>

      {/* Content section */}
      <div className="p-4">
        <p className="text-lg font-semibold">{member.name}</p>
        <p className="text-sm mt-0.5" style={{ color: colors.text.pale }}>
          {member.role}
        </p>
        <p className="text-sm mt-2 leading-relaxed" style={{ color: colors.violet.pale }}>
          {member.bio}
        </p>
        <p className="text-sm mt-1 font-medium" style={{ color: colors.neon.base }}>
          {member.signature}
        </p>
      </div>

      {/* Neon edge glow on hover */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          boxShadow: `0 0 0 1px ${colors.neon.base}66 inset, 0 18px 60px ${colors.neon.base}38`,
        }}
      />
    </motion.article>
  );
}
