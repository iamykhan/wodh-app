"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

const BG = "#0C0722";
const PANEL = "#0F0A26";
const BORDER = "#2A1E55";
const NEON = "#9EF315";
const VIOLET = "#5B2DDC";
const TEXT_DIM = "#A8A8C3";
const TEXT_SOFT = "#D1C6FF";

type Cat = "General" | "Production" | "Tech" | "Collaboration";

const FAQS: { q: string; a: string; cat: Cat }[] = [
  {
    q: "What does Wodh build?",
    a: "XR (AR/VR/MR), real-time simulations, and games across mobile, PC, and headsets — from prototypes to full launches.",
    cat: "General",
  },
  {
    q: "How long does a full production take?",
    a: "Typical timelines are 2–6+ months depending on scope, platform targets, and feature depth. We set milestones early.",
    cat: "Production",
  },
  {
    q: "Do you start with a prototype?",
    a: "Yes. We validate direction early through playable / interactive POC builds before scaling into full production.",
    cat: "Production",
  },
  {
    q: "Which engines do you use?",
    a: "Unity and Unreal Engine are our core. We choose based on your goals, constraints, and platform requirements.",
    cat: "Tech",
  },
  {
    q: "Can you join an existing build mid-way?",
    a: "Absolutely. We can stabilize, optimize, add features, or complete projects already in development.",
    cat: "Collaboration",
  },
  {
    q: "How do we kick off a project?",
    a: "Send a brief → discovery call → roadmap → prototype sprint or production start.",
    cat: "General",
  },
];

const CATS: Cat[] = ["General", "Production", "Tech", "Collaboration"];

const WodhFAQ_CommandPalette_G_Final: React.FC = () => {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Cat | "All">("All");
  const [active, setActive] = useState<number>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const matchCat = cat === "All" || f.cat === cat;
      const matchQ =
        !q ||
        f.q.toLowerCase().includes(q) ||
        f.a.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, cat]);

  // Keep active index valid when list changes
  useEffect(() => {
    if (active >= filtered.length) setActive(0);
  }, [filtered.length, active]);

  const clearSearch = () => {
    setQuery("");
    setActive(0);
  };

  return (
    <section
      className="relative w-full overflow-hidden px-4 py-16 sm:px-6 lg:px-10 xl:px-16 lg:py-24 text-white"
      style={{ background: BG }}
    >
      {/* Neon fog backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(1000px circle at 10% -10%, rgba(158,243,21,0.12), transparent 60%), radial-gradient(900px circle at 90% 120%, rgba(91,45,220,0.55), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Head */}
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-[#B9A8FF]">
            {" "}
            FAQ{" "}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold">
            {" "}
            Ask Anything{" "}
          </h2>
          <div
            className="mx-auto mt-4 h-[2px] w-24"
            style={{
              background: `linear-gradient(90deg, ${NEON}, ${VIOLET})`,
              boxShadow: `0 0 16px ${NEON}66`,
            }}
          />
          <p
            className="mt-4 text-sm sm:text-base"
            style={{ color: TEXT_DIM }}
          >
            {" "}
            Filter by category or type a keyword to find quick answers.{" "}
          </p>
        </div>

        {/* Search */}
        <div
          className="rounded-2xl border px-4 py-3 flex items-center gap-3"
          style={{
            background: PANEL,
            borderColor: BORDER,
          }}
        >
          <Search size={18} style={{ color: TEXT_DIM }} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search questions…"
            className="w-full bg-transparent outline-none text-sm"
            style={{
              caretColor: NEON,
              color: "#FFFFFF",
            }}
          />
          {query.trim().length > 0 && (
            <button
              onClick={clearSearch}
              className="flex h-7 w-7 items-center justify-center rounded-full border transition"
              style={{
                borderColor: BORDER,
                color: TEXT_SOFT,
              }}
              aria-label="Clear search"
              title="Clear"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {(["All", ...CATS] as const).map((c) => {
            const isActive = cat === c;
            return (
              <button
                key={c}
                onClick={() => {
                  setCat(c);
                  setActive(0);
                }}
                className="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
                style={{
                  background: isActive
                    ? "linear-gradient(90deg, rgba(158,243,21,0.12), rgba(91,45,220,0.18))"
                    : "transparent",
                  borderColor: isActive ? `${NEON}55` : BORDER,
                  color: isActive ? "#FFFFFF" : TEXT_SOFT,
                  boxShadow: isActive ? `0 0 14px ${NEON}22` : "none",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Results + Answer */}
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1.1fr] md:gap-6">
          {/* List */}
          <div className="space-y-2">
            {filtered.length === 0 && (
              <div
                className="rounded-2xl border p-5 text-sm"
                style={{
                  background: PANEL,
                  borderColor: BORDER,
                  color: TEXT_DIM,
                }}
              >
                No results found.{" "}
                <button
                  onClick={clearSearch}
                  className="ml-2 underline"
                  style={{ color: TEXT_SOFT }}
                >
                  {" "}
                  Clear search{" "}
                </button>
              </div>
            )}
            {filtered.map((f, i) => {
              const isOn = active === i;
              return (
                <button
                  key={f.q}
                  onClick={() => setActive(i)}
                  className="w-full text-left rounded-2xl border px-5 py-4 transition"
                  style={{
                    background: isOn ? PANEL : "transparent",
                    borderColor: isOn ? `${NEON}55` : BORDER,
                    boxShadow: isOn ? `0 0 18px ${NEON}22` : "none",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm sm:text-base font-semibold">
                      {f.q}
                    </p>
                    <span className="text-[11px] uppercase tracking-wider text-[#B9A8FF] shrink-0">
                      {f.cat}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Answer */}
          <div
            className="rounded-2xl border p-6 sm:p-7 min-h-[190px]"
            style={{
              background: PANEL,
              borderColor: BORDER,
            }}
          >
            <AnimatePresence mode="wait">
              {filtered[active] && (
                <motion.div
                  key={filtered[active].q}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {filtered[active].q}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{ color: TEXT_DIM }}
                  >
                    {filtered[active].a}
                  </p>
                  <div
                    className="mt-5 h-[2px] w-16"
                    style={{
                      background: `linear-gradient(90deg, ${NEON}, ${VIOLET})`,
                      boxShadow: `0 0 12px ${NEON}66`,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WodhFAQ_CommandPalette_G_Final;

