"use client";

import React, { useMemo, useState } from "react";

/**
 * Wodh — Constellation Map (Static SVG)
 * City-level presence as "stars" + subtle constellation lines.
 *
 * Usage:
 * <ConstellationMap active={activeCity} />
 *
 * active: "pk" | "uk" | "dubai" | null
 */

export type CityKey = "pk" | "uk" | "dubai";

const ACCENT_GREEN = "rgb(158, 243, 21)";
const ACCENT_PURPLE = "rgb(91, 45, 220)";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ConstellationMap({
  active,
  className,
}: {
  active: CityKey | null;
  className?: string;
}) {
  const nodes = useMemo(
    () => ({
      uk: { x: 485, y: 175, label: "United Kingdom", tone: "purple" as const },
      dubai: { x: 625, y: 250, label: "Dubai", tone: "green" as const },
      pk: { x: 655, y: 235, label: "Pakistan", tone: "green" as const },
    }),
    []
  );

  const isActive = (k: CityKey) => active === k;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_18px_70px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.75]"
          style={{
            background:
              "radial-gradient(900px 520px at 25% 30%, rgba(91,45,220,0.22), transparent 60%), radial-gradient(900px 520px at 75% 60%, rgba(158,243,21,0.12), transparent 60%), linear-gradient(180deg, rgba(0,0,0,0.20), rgba(0,0,0,0.55))",
          }}
        />
        {/* star dust */}
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 520px at 50% 40%, transparent 48%, rgba(0,0,0,0.75) 92%)",
          }}
        />
      </div>

      <div className="relative p-4 sm:p-5">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-white/85">Constellation Presence</p>
            <p className="text-xs text-white/45">City-level nodes only</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/55">
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: ACCENT_GREEN,
                  boxShadow: "0 0 12px rgba(158,243,21,0.55)",
                }}
              />
              Delivery
            </span>
            <span className="text-white/30">•</span>
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: ACCENT_PURPLE,
                  boxShadow: "0 0 12px rgba(91,45,220,0.55)",
                }}
              />
              Partner
            </span>
          </div>
        </div>

        {/* SVG */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30">
          <svg
            viewBox="0 0 900 520"
            className="h-[300px] w-full sm:h-[340px]"
            role="img"
            aria-label="Constellation map with city-level nodes"
          >
            <defs>
              <filter id="softBlurConst">
                <feGaussianBlur stdDeviation="10" />
              </filter>

              <filter id="hardGlowConst">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <radialGradient id="gGreenConst">
                <stop offset="0" stopColor="rgba(158,243,21,0.95)" />
                <stop offset="1" stopColor="rgba(158,243,21,0.0)" />
              </radialGradient>

              <radialGradient id="gPurpleConst">
                <stop offset="0" stopColor="rgba(91,45,220,0.95)" />
                <stop offset="1" stopColor="rgba(91,45,220,0.0)" />
              </radialGradient>

              <linearGradient id="lineConst" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgba(255,255,255,0.22)" />
                <stop offset="0.5" stopColor="rgba(158,243,21,0.18)" />
                <stop offset="1" stopColor="rgba(91,45,220,0.16)" />
              </linearGradient>
            </defs>

            {/* Soft grid hint (very subtle) */}
            <g opacity="0.12">
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 90}
                  y1={0}
                  x2={i * 90}
                  y2={520}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1={0}
                  y1={i * 86.6}
                  x2={900}
                  y2={i * 86.6}
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1"
                />
              ))}
            </g>

            {/* Constellation lines */}
            <path
              d={`M ${nodes.uk.x} ${nodes.uk.y} C 545 205, 595 225, ${nodes.dubai.x} ${nodes.dubai.y}`}
              stroke="url(#lineConst)"
              strokeWidth={isActive("uk") || isActive("dubai") ? 2.2 : 1.6}
              opacity={isActive("uk") || isActive("dubai") ? 0.85 : 0.55}
              fill="none"
            />
            <path
              d={`M ${nodes.dubai.x} ${nodes.dubai.y} C 635 246, 645 240, ${nodes.pk.x} ${nodes.pk.y}`}
              stroke="url(#lineConst)"
              strokeWidth={isActive("pk") || isActive("dubai") ? 2.2 : 1.6}
              opacity={isActive("pk") || isActive("dubai") ? 0.85 : 0.55}
              fill="none"
            />

            {/* Nodes */}
            {(Object.keys(nodes) as CityKey[]).map((k) => {
              const n = nodes[k];
              const activeK = isActive(k);
              const glowId = n.tone === "green" ? "gGreenConst" : "gPurpleConst";
              const core =
                n.tone === "green"
                  ? "rgba(158,243,21,0.95)"
                  : "rgba(91,45,220,0.95)";
              const ring =
                n.tone === "green"
                  ? "rgba(158,243,21,0.32)"
                  : "rgba(91,45,220,0.32)";

              return (
                <g key={k}>
                  {/* big glow */}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={activeK ? 70 : 46}
                    fill={`url(#${glowId})`}
                    opacity={activeK ? 0.42 : 0.18}
                    filter="url(#softBlurConst)"
                  />
                  {/* mid glow */}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={activeK ? 26 : 18}
                    fill={core}
                    opacity={activeK ? 0.12 : 0.08}
                    filter="url(#softBlurConst)"
                  />
                  {/* core star */}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={activeK ? 6.6 : 5.2}
                    fill={core}
                    filter="url(#hardGlowConst)"
                  />
                  {/* ring */}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={activeK ? 18 : 13}
                    fill="none"
                    stroke={ring}
                    strokeWidth="2"
                    opacity={activeK ? 0.95 : 0.55}
                  />

                  {/* label appears stronger when active */}
                  <g opacity={activeK ? 1 : 0.72}>
                    <rect
                      x={n.x + 12}
                      y={n.y - 18}
                      width={185}
                      height={28}
                      rx={12}
                      fill="rgba(0,0,0,0.38)"
                      stroke="rgba(255,255,255,0.12)"
                    />
                    <text
                      x={n.x + 22}
                      y={n.y + 2}
                      fill="rgba(255,255,255,0.88)"
                      fontSize="12"
                      fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
                    >
                      {n.label}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* tiny random stars (static) */}
            <g opacity="0.55">
              {[
                [120, 90],
                [180, 220],
                [260, 140],
                [340, 310],
                [420, 100],
                [460, 420],
                [540, 120],
                [580, 380],
                [720, 90],
                [780, 160],
                [820, 300],
                [760, 430],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.8 : 1.2} fill="rgba(255,255,255,0.60)" />
              ))}
            </g>
          </svg>

          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
        </div>

        <div className="mt-3 text-xs text-white/50">
          Tip: Use hover on your city cards to set <span className="text-white/70">active</span> and spotlight a node.
        </div>
      </div>
    </div>
  );
}

/* -------------------------- Optional Test Harness ------------------------- */
/**
 * If you want to preview quickly, temporarily render <ConstellationMapDemo />
 * somewhere and delete later.
 */
export function ConstellationMapDemo() {
  const [active, setActive] = useState<CityKey | null>(null);

  return (
    <div className="bg-black p-6 text-white">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm hover:border-white/20"
          onMouseEnter={() => setActive("pk")}
          onMouseLeave={() => setActive(null)}
        >
          Pakistan
        </button>
        <button
          className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm hover:border-white/20"
          onMouseEnter={() => setActive("dubai")}
          onMouseLeave={() => setActive(null)}
        >
          Dubai
        </button>
        <button
          className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm hover:border-white/20"
          onMouseEnter={() => setActive("uk")}
          onMouseLeave={() => setActive(null)}
        >
          UK
        </button>
        <button
          className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm hover:border-white/20"
          onClick={() => setActive(null)}
        >
          Clear
        </button>
      </div>

      <ConstellationMap active={active} />
    </div>
  );
}


