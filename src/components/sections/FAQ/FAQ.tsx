/**
 * Component: FAQ
 * Frequently asked questions section with search and filtering
 * Refactored to use clean architecture with content separation
 */

"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { colors } from "@/lib/design-tokens";
import { faqContent, faqCategories, faqItems, FAQCategory } from "@/content/home/faq";

/**
 * FAQ section with search and category filtering
 */
export function FAQ() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FAQCategory | "All">("All");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const filteredFAQs = useMemo(() => {
    const searchQuery = query.trim().toLowerCase();
    return faqItems.filter((faq) => {
      const matchCategory = category === "All" || faq.category === category;
      const matchQuery =
        !searchQuery ||
        faq.question.toLowerCase().includes(searchQuery) ||
        faq.answer.toLowerCase().includes(searchQuery);
      return matchCategory && matchQuery;
    });
  }, [query, category]);

  // Keep active index valid when list changes
  useEffect(() => {
    if (activeIndex >= filteredFAQs.length) setActiveIndex(0);
  }, [filteredFAQs.length, activeIndex]);

  const clearSearch = () => {
    setQuery("");
    setActiveIndex(0);
  };

  return (
    <section
      className="relative w-full overflow-hidden px-4 py-16 sm:px-6 lg:px-10 xl:px-16 lg:py-24 text-white"
      style={{ background: colors.background.primary }}
    >
      {/* Neon fog backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(1000px circle at 10% -10%, ${colors.neon.base}1F, transparent 60%), radial-gradient(900px circle at 90% 120%, ${colors.violet.base}8C, transparent 55%)`,
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-xs tracking-[0.35em] uppercase" style={{ color: colors.violet.light }}>
            {faqContent.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold">{faqContent.heading}</h2>
          <div
            className="mx-auto mt-4 h-[2px] w-24"
            style={{
              background: `linear-gradient(90deg, ${colors.neon.base}, ${colors.violet.base})`,
              boxShadow: `0 0 16px ${colors.neon.glow}`,
            }}
          />
          <p className="mt-4 text-sm sm:text-base" style={{ color: colors.text.pale }}>
            {faqContent.description}
          </p>
        </div>

        {/* Search */}
        <div
          className="rounded-2xl border px-4 py-3 flex items-center gap-3"
          style={{
            background: colors.background.panel,
            borderColor: colors.border.primary,
          }}
        >
          <Search size={18} style={{ color: colors.text.pale }} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder={faqContent.searchPlaceholder}
            className="w-full bg-transparent outline-none text-sm"
            style={{
              caretColor: colors.neon.base,
              color: colors.text.primary,
            }}
          />
          {query.trim().length > 0 && (
            <button
              onClick={clearSearch}
              className="flex h-7 w-7 items-center justify-center rounded-full border transition"
              style={{
                borderColor: colors.border.primary,
                color: colors.violet.pale,
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
          {(["All", ...faqCategories] as const).map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setActiveIndex(0);
                }}
                className="rounded-full border px-3 py-1.5 text-xs font-semibold transition"
                style={{
                  background: isActive
                    ? `linear-gradient(90deg, ${colors.neon.base}1F, ${colors.violet.base}2E)`
                    : "transparent",
                  borderColor: isActive ? `${colors.neon.base}8C` : colors.border.primary,
                  color: isActive ? colors.text.primary : colors.violet.pale,
                  boxShadow: isActive ? `0 0 14px ${colors.neon.base}38` : "none",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results + Answer */}
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1.1fr] md:gap-6">
          {/* Question List */}
          <div className="space-y-2">
            {filteredFAQs.length === 0 && (
              <div
                className="rounded-2xl border p-5 text-sm"
                style={{
                  background: colors.background.panel,
                  borderColor: colors.border.primary,
                  color: colors.text.pale,
                }}
              >
                {faqContent.noResults}{" "}
                <button onClick={clearSearch} className="ml-2 underline" style={{ color: colors.violet.pale }}>
                  {faqContent.clearButton}
                </button>
              </div>
            )}
            {filteredFAQs.map((faq, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={faq.question}
                  onClick={() => setActiveIndex(i)}
                  className="w-full text-left rounded-2xl border px-5 py-4 transition"
                  style={{
                    background: isActive ? colors.background.panel : "transparent",
                    borderColor: isActive ? `${colors.neon.base}8C` : colors.border.primary,
                    boxShadow: isActive ? `0 0 18px ${colors.neon.base}38` : "none",
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm sm:text-base font-semibold">{faq.question}</p>
                    <span
                      className="text-[11px] uppercase tracking-wider shrink-0"
                      style={{ color: colors.violet.light }}
                    >
                      {faq.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Answer Panel */}
          <div
            className="rounded-2xl border p-6 sm:p-7 min-h-[190px]"
            style={{
              background: colors.background.panel,
              borderColor: colors.border.primary,
            }}
          >
            <AnimatePresence mode="wait">
              {filteredFAQs[activeIndex] && (
                <motion.div
                  key={filteredFAQs[activeIndex].question}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <p className="text-lg sm:text-xl font-semibold mb-4">
                    {filteredFAQs[activeIndex].question}
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: colors.violet.pale }}>
                    {filteredFAQs[activeIndex].answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
