"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Filter,
  Tag,
  Clock,
  BookOpen,
  Mail,
} from "lucide-react";

type Category = "All" | "XR" | "Games" | "R&D" | "Company";

type Post = {
  id: number;
  title: string;
  excerpt: string;
  category: Exclude<Category, "All">;
  date: string; // e.g., "2025-11-20"
  readMins: number;
  author: string;
  cover: string; // image url
  featured?: boolean;
  tags?: string[];
  series?: string; // optional editorial chip
};

const BG = "#0C0722";
const PANEL = "#0F0A26";
const PANEL_2 = "#0B0720";
const BORDER = "#2A1E55";
const NEON = "#9EF315";
const VIOLET = "#5B2DDC";
const TEXT_DIM = "#A8A8C3";
const TEXT_SOFT = "#D1C6FF";

const CATEGORIES: Category[] = ["All", "XR", "Games", "R&D", "Company"];

// Demo content (replace with CMS later)
const POSTS: Post[] = [
  {
    id: 1,
    title: "Designing City-Scale AR: Lessons from TRACEAR",
    excerpt:
      "What we learned shipping a persistent AR layer across real streets, devices, and user contexts.",
    category: "XR",
    date: "2025-11-10",
    readMins: 7,
    author: "Wodh XR Lab",
    series: "XR Field Notes",
    cover:
      "https://images.unsplash.com/photo-1633621412960-6df85eff8c85?q=80&w=1400&auto=format&fit=crop",
    featured: true,
    tags: ["AR Foundation", "UX", "City AR"],
  },
  {
    id: 2,
    title: "Building Real-Time Worlds in Unreal 5.4",
    excerpt:
      "Streaming, lighting, and gameplay loops that keep performance high and latency low.",
    category: "Games",
    date: "2025-10-28",
    readMins: 5,
    author: "Wodh Games Team",
    series: "Game Dev Diaries",
    cover:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1400&auto=format&fit=crop",
    tags: ["Unreal", "Optimization"],
  },
  {
    id: 3,
    title: "R&D Spotlight: Hand Tracking Beyond Controllers",
    excerpt:
      "Exploring robust gesture systems for enterprise XR training environments.",
    category: "R&D",
    date: "2025-10-11",
    readMins: 6,
    author: "Wodh R&D",
    series: "R&D Drops",
    cover:
      "https://images.unsplash.com/photo-1631701601557-2b6e97f9df1d?q=80&w=1400&auto=format&fit=crop",
    tags: ["Hand Tracking", "Research"],
  },
  {
    id: 4,
    title: "How We Prototype Fast: The Wodh Pipeline",
    excerpt:
      "A practical breakdown of our 5-step production pipeline for XR and games.",
    category: "Company",
    date: "2025-09-30",
    readMins: 4,
    author: "Wodh Studio",
    series: "Production Pipeline",
    cover:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1400&auto=format&fit=crop",
    tags: ["Process"],
  },
  {
    id: 5,
    title: "Performance Budgets for Mobile AR",
    excerpt: "A pragmatic guide to keeping frames stable on real devices.",
    category: "XR",
    date: "2025-09-05",
    readMins: 8,
    author: "Wodh XR Lab",
    series: "XR Field Notes",
    cover:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1400&auto=format&fit=crop",
    tags: ["Mobile", "AR"],
  },
];

const SectionShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <section
    className="w-full text-white px-4 sm:px-6 lg:px-10 xl:px-16 py-16 lg:py-24"
    style={{ background: BG }}
  >
    <div className="mx-auto max-w-6xl">{children}</div>
  </section>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-widest uppercase"
    style={{
      borderColor: BORDER,
      color: TEXT_SOFT,
      background: PANEL,
    }}
  >
    <Sparkles size={14} style={{ color: NEON }} />
    {children}
  </div>
);

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

const OptionA_PartialEnhanced: React.FC = () => {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(() => {
    if (active === "All") return POSTS;
    return POSTS.filter((p) => p.category === active);
  }, [active]);

  const featured = POSTS.find((p) => p.featured) ?? POSTS[0];
  const rest = filtered.filter((p) => p.id !== featured.id);

  return (
    <SectionShell>
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-4">
          <Eyebrow>Insights / Knowledge Base</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
            {" "}
            Building Immersive Worlds,{" "}
            <span className="ml-2" style={{ color: NEON }}>
              {" "}
              Sharing What We Learn{" "}
            </span>
          </h2>
          <p
            className="max-w-2xl text-sm md:text-base"
            style={{ color: TEXT_DIM }}
          >
            {" "}
            Practical insights from our XR lab and game studio — pipelines,
            experiments, and lessons from shipping real products.{" "}
          </p>
        </div>

        {/* Simple filters (unchanged style) */}
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest px-3 py-2 rounded-full border"
            style={{
              borderColor: BORDER,
              color: TEXT_SOFT,
              background: PANEL,
            }}
          >
            <Filter size={14} />
            Filter
          </div>
          {CATEGORIES.map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="px-4 py-2 rounded-full text-xs md:text-sm border transition-all"
                style={{
                  borderColor: isActive ? NEON : BORDER,
                  color: isActive ? "#0B0A16" : TEXT_SOFT,
                  background: isActive
                    ? `linear-gradient(90deg, ${NEON} 0%, ${VIOLET} 120%)`
                    : PANEL,
                  boxShadow: isActive ? `0 0 24px ${NEON}55` : "none",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured post (stronger layout + typography punch) */}
      {featured && active === "All" && (
        <motion.a
          href="#"
          className="mt-10 block rounded-3xl border overflow-hidden group relative"
          style={{
            borderColor: BORDER,
            background: PANEL,
          }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          {/* subtle aura */}
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background: `radial-gradient(900px circle at -10% -30%, ${NEON}26, transparent 45%), radial-gradient(900px circle at 110% 120%, ${VIOLET}26, transparent 45%)`,
            }}
          />

          <div className="grid md:grid-cols-2 relative">
            <div className="relative min-h-[260px] md:min-h-[380px]">
              <img
                src={featured.cover}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover scale-[1.02] group-hover:scale-[1.06] transition-transform duration-700"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(12,7,34,0.9) 0%, rgba(12,7,34,0.25) 60%, rgba(12,7,34,0.0) 100%)",
                }}
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span
                  className="px-3 py-1 rounded-full text-xs border"
                  style={{
                    borderColor: NEON,
                    color: NEON,
                    background: `${NEON}12`,
                  }}
                >
                  {" "}
                  Featured{" "}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs border"
                  style={{
                    borderColor: BORDER,
                    color: TEXT_SOFT,
                    background: PANEL,
                  }}
                >
                  {" "}
                  {featured.category}{" "}
                </span>
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-between gap-5 relative">
              <div className="space-y-3">
                {featured.series && (
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] border w-fit"
                    style={{
                      borderColor: BORDER,
                      color: TEXT_SOFT,
                      background: PANEL_2,
                    }}
                  >
                    <Tag size={12} style={{ color: NEON }} />
                    {featured.series}
                  </span>
                )}
                <h3 className="text-2xl md:text-4xl font-semibold leading-[1.15] tracking-tight">
                  {featured.title}
                  <span
                    className="block mt-2 h-[2px] w-24 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${NEON}, ${VIOLET})`,
                    }}
                  />
                </h3>
                <p
                  className="text-sm md:text-base"
                  style={{ color: TEXT_DIM }}
                >
                  {featured.excerpt}
                </p>
                {featured.tags?.length ? (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {featured.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border"
                        style={{
                          borderColor: BORDER,
                          color: TEXT_SOFT,
                          background: PANEL_2,
                        }}
                      >
                        <Tag size={12} />
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex items-center justify-between pt-1">
                <div
                  className="flex items-center flex-wrap gap-3 text-xs md:text-sm"
                  style={{ color: TEXT_DIM }}
                >
                  <span className="inline-flex items-center gap-1">
                    <Clock size={14} />
                    {featured.readMins} min read
                  </span>
                  <span>•</span>
                  <span>{formatDate(featured.date)}</span>
                  <span>•</span>
                  <span
                    className="px-2 py-1 rounded-full border text-[11px]"
                    style={{
                      borderColor: BORDER,
                      background: PANEL_2,
                      color: TEXT_SOFT,
                    }}
                  >
                    {featured.author}
                  </span>
                </div>
                <div
                  className="inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: NEON }}
                >
                  {" "}
                  Read Article <ArrowUpRight size={16} />{" "}
                </div>
              </div>
            </div>
          </div>
        </motion.a>
      )}

      {/* Grid (alive cards) */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((p, i) => (
          <motion.a
            href="#"
            key={p.id}
            className="group rounded-2xl border overflow-hidden relative"
            style={{
              borderColor: BORDER,
              background: PANEL,
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            whileHover={{ y: -5, rotate: -0.35 }} // micro tilt/lift
          >
            <div className="relative h-44">
              <img
                src={p.cover}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700"
              />
              {/* neon corner highlight */}
              <div
                className="absolute -top-10 -left-10 h-28 w-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `${NEON}55` }}
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span
                  className="px-2.5 py-1 rounded-full text-[11px] border"
                  style={{
                    borderColor: BORDER,
                    color: TEXT_SOFT,
                    background: PANEL_2,
                  }}
                >
                  {p.category}
                </span>
                {p.series && (
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] border hidden md:inline-flex"
                    style={{
                      borderColor: BORDER,
                      color: TEXT_SOFT,
                      background: PANEL_2,
                    }}
                  >
                    {p.series}
                  </span>
                )}
              </div>
            </div>
            <div className="p-5 space-y-3">
              <h4
                className="text-lg font-semibold leading-snug group-hover:underline decoration-2 underline-offset-4"
                style={{ textDecorationColor: NEON }}
              >
                {p.title}
              </h4>
              <p className="text-sm line-clamp-3" style={{ color: TEXT_DIM }}>
                {p.excerpt}
              </p>
              <div
                className="flex items-center justify-between text-xs pt-1"
                style={{ color: TEXT_DIM }}
              >
                <span className="inline-flex items-center gap-1">
                  <BookOpen size={13} />
                  {p.readMins} min
                </span>
                <span>{formatDate(p.date)}</span>
              </div>
              {/* author chip */}
              <div className="pt-1">
                <span
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full border"
                  style={{
                    borderColor: BORDER,
                    background: PANEL_2,
                    color: TEXT_SOFT,
                  }}
                >
                  {p.author}
                </span>
              </div>
            </div>
            {/* neon hover rim */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                boxShadow: `inset 0 0 0 1px ${NEON}, 0 18px 50px ${NEON}22`,
              }}
            />
          </motion.a>
        ))}
      </div>

      {/* Empty state (only when a filter yields none) */}
      {!rest.length && active !== "All" && (
        <motion.div
          className="mt-8 rounded-2xl border p-8 text-center space-y-3"
          style={{
            borderColor: BORDER,
            background: PANEL,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div
            className="mx-auto h-12 w-12 rounded-2xl flex items-center justify-center border"
            style={{
              borderColor: BORDER,
              background: PANEL_2,
              color: NEON,
            }}
          >
            <Sparkles size={18} />
          </div>
          <h4 className="text-lg font-semibold">
            More {active} insights dropping soon.
          </h4>
          <p className="text-sm" style={{ color: TEXT_DIM }}>
            {" "}
            We're actively publishing new field notes and case studies. Want a
            ping when it's live?{" "}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all"
              style={{
                borderColor: BORDER,
                background: PANEL_2,
                color: "#fff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = `0 0 18px ${NEON}55`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "none")
              }
            >
              Subscribe Updates <Mail size={16} style={{ color: NEON }} />
            </a>
            <button
              onClick={() => setActive("All")}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all"
              style={{
                borderColor: BORDER,
                background: PANEL,
                color: "#fff",
              }}
            >
              View All Insights{" "}
              <ArrowUpRight size={16} style={{ color: NEON }} />
            </button>
          </div>
        </motion.div>
      )}

      {/* Dual CTA row (always visible) */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all"
          style={{
            borderColor: BORDER,
            background: PANEL,
            color: "#fff",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = `0 0 18px ${NEON}55`)
          }
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          Explore All Insights{" "}
          <ArrowUpRight size={16} style={{ color: NEON }} />
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all"
          style={{
            borderColor: BORDER,
            background: PANEL_2,
            color: TEXT_SOFT,
          }}
        >
          Subscribe for Drops <Mail size={16} style={{ color: NEON }} />
        </a>
      </div>
    </SectionShell>
  );
};

export default OptionA_PartialEnhanced;

