"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Upload,
  CheckCircle2,
  Cuboid,
  Gamepad2,
  CircleDashed,
  Sparkles,
} from "lucide-react";

const BG = "#0C0722";
const PANEL = "#0F0A26";
const PANEL_2 = "#0B0720";
const BORDER = "#2A1E55";
const NEON = "#9EF315";
const VIOLET = "#5B2DDC";
const TEXT_DIM = "#A8A8C3";
const TEXT_SOFT = "#D1C6FF";

type Focus = "XR" | "Games" | "R&D" | "Not sure yet";

const PROJECT_TYPES: Focus[] = ["XR", "Games", "R&D", "Not sure yet"];

const WodhContact_OptionC_Enhanced_Final: React.FC = () => {
  const [focus, setFocus] = useState<Focus>("XR");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  const TypeIcon = ({ t }: { t: Focus }) => {
    if (t === "XR") return <Cuboid size={16} color={NEON} />;
    if (t === "Games") return <Gamepad2 size={16} color={NEON} />;
    if (t === "R&D") return <CircleDashed size={16} color={NEON} />;
    return <Sparkles size={16} color={NEON} />;
  };

  const LeftCard = (c: { k: Focus; title: string; desc: string }) => {
    const active =
      focus === c.k || (focus === "Not sure yet" && c.k !== "Not sure yet");
    return (
      <div
        className="rounded-2xl border p-4 transition"
        style={{
          background: PANEL_2,
          borderColor: active ? `${NEON}88` : BORDER,
          boxShadow: active ? `0 0 0 1px ${NEON}33 inset` : undefined,
          transform: active ? "translateY(-1px)" : undefined,
        }}
      >
        <p className="text-sm font-semibold">{c.title}</p>
        <p className="text-xs mt-1" style={{ color: TEXT_DIM }}>
          {c.desc}
        </p>
      </div>
    );
  };

  return (
    <section
      className="w-full text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-10 xl:px-16"
      style={{ background: BG }}
      id="contact"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* LEFT: Visual Panel */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 rounded-3xl border overflow-hidden relative"
          style={{
            background: PANEL,
            borderColor: BORDER,
          }}
        >
          {/* Ambient gradient blobs */}
          <div
            className="absolute -top-24 -left-28 w-72 h-72 blur-3xl opacity-60"
            style={{ background: NEON }}
          />
          <div
            className="absolute -bottom-24 -right-28 w-80 h-80 blur-3xl opacity-50"
            style={{ background: VIOLET }}
          />

          <div className="relative p-6 sm:p-8 lg:p-9 h-full flex flex-col">
            <p
              className="text-sm tracking-[0.28em] uppercase"
              style={{ color: TEXT_DIM }}
            >
              {" "}
              Project Inquiry{" "}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold leading-tight">
              {" "}
              Build something hohohoho immersive with Wodh.{" "}
            </h2>
            <p className="mt-3 text-base" style={{ color: TEXT_SOFT }}>
              {" "}
              We partner with teams to design, prototype, and ship XR
              experiences and games. Tell us the shape of your idea — we'll map
              the path.{" "}
            </p>

            {/* Showcase cards (auto-highlight based on right selection) */}
            <div className="mt-6 grid grid-cols-1 gap-3">
              <LeftCard
                k="XR"
                title="AR/VR/MR Experiences"
                desc="Training, marketing, retail layers, museum worlds, city-scale portals."
              />
              <LeftCard
                k="Games"
                title="Games & Interactive Worlds"
                desc="Mobile, PC, console, and headset games — from prototype to live ops."
              />
              <LeftCard
                k="R&D"
                title="Real-time Sims & Labs"
                desc="Digital twins, simulation sandboxes, and bespoke engines."
              />
            </div>

            {/* Contact chips (from Option A) */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                className="rounded-2xl border p-4 flex items-center gap-3"
                style={{
                  background: PANEL_2,
                  borderColor: BORDER,
                }}
              >
                <Mail size={18} color={NEON} />
                <div>
                  <p
                    className="text-xs uppercase tracking-wider"
                    style={{ color: TEXT_DIM }}
                  >
                    {" "}
                    Email{" "}
                  </p>
                  <p className="text-sm text-white">hello@wodh.io</p>
                </div>
              </div>
              <div
                className="rounded-2xl border p-4 flex items-center gap-3"
                style={{
                  background: PANEL_2,
                  borderColor: BORDER,
                }}
              >
                <Phone size={18} color={NEON} />
                <div>
                  <p
                    className="text-xs uppercase tracking-wider"
                    style={{ color: TEXT_DIM }}
                  >
                    {" "}
                    Phone{" "}
                  </p>
                  <p className="text-sm text-white">+92 3XX XXX XXXX</p>
                </div>
              </div>
              <div
                className="rounded-2xl border p-4 flex items-center gap-3 sm:col-span-2"
                style={{
                  background: PANEL_2,
                  borderColor: BORDER,
                }}
              >
                <MapPin size={18} color={NEON} />
                <div>
                  <p
                    className="text-xs uppercase tracking-wider"
                    style={{ color: TEXT_DIM }}
                  >
                    {" "}
                    Studio{" "}
                  </p>
                  <p className="text-sm text-white">
                    {" "}
                    Faisalabad, Pakistan · Remote Worldwide{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <a
                href="#featured-projects"
                className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-90"
                style={{ color: NEON }}
              >
                {" "}
                View recent work <ArrowUpRight size={15} />{" "}
              </a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Form Panel */}
        <motion.form
          initial={{ opacity: 0, x: 14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.05 }}
          onSubmit={onSubmit}
          className="lg:col-span-7 rounded-3xl border p-5 sm:p-7 lg:p-8"
          style={{
            background: PANEL,
            borderColor: BORDER,
          }}
        >
          {/* Head */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <p
                className="text-xs uppercase tracking-[0.24em]"
                style={{ color: TEXT_DIM }}
              >
                {" "}
                Start a project{" "}
              </p>
              <h3 className="mt-1 text-2xl sm:text-3xl font-semibold">
                {" "}
                Tell us what you're building.{" "}
              </h3>
              <p
                className="mt-2 text-sm sm:text-base"
                style={{ color: TEXT_SOFT }}
              >
                {" "}
                Share the essentials. We'll reply with next steps and a clean
                plan.{" "}
              </p>
            </div>
          </div>

          {/* Project Type Buttons (from Option B) */}
          <div className="mt-5">
            <p
              className="text-xs uppercase tracking-wider mb-2"
              style={{ color: TEXT_DIM }}
            >
              {" "}
              Project type{" "}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PROJECT_TYPES.map((t) => {
                const active = t === focus;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFocus(t)}
                    className="rounded-2xl border px-3 py-3 text-sm font-medium text-left transition-transform hover:-translate-y-0.5"
                    style={{
                      borderColor: active ? `${NEON}88` : BORDER,
                      background: active
                        ? `linear-gradient(180deg, ${NEON}1A, ${VIOLET}22)`
                        : "transparent",
                      boxShadow: active
                        ? `0 0 0 1px ${NEON}44 inset`
                        : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2">
                        <TypeIcon t={t} />
                        {t}
                      </span>
                      {active && <CheckCircle2 size={16} color={NEON} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fields */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: TEXT_DIM }}
              >
                {" "}
                Name{" "}
              </span>
              <input
                required
                className="rounded-xl bg-transparent border px-3 py-2 outline-none focus:ring-2"
                style={{
                  borderColor: BORDER,
                  color: "#FFFFFF",
                }}
                placeholder="Your full name"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: TEXT_DIM }}
              >
                {" "}
                Email{" "}
              </span>
              <input
                required
                type="email"
                className="rounded-xl bg-transparent border px-3 py-2 outline-none focus:ring-2"
                style={{
                  borderColor: BORDER,
                  color: "#FFFFFF",
                }}
                placeholder="you@company.com"
              />
            </label>
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: TEXT_DIM }}
              >
                {" "}
                Company / Studio (optional){" "}
              </span>
              <input
                className="rounded-xl bg-transparent border px-3 py-2 outline-none focus:ring-2"
                style={{
                  borderColor: BORDER,
                  color: "#FFFFFF",
                }}
                placeholder="Studio / Brand / Organization"
              />
            </label>
            <label className="flex flex-col gap-2 sm:col-span-2">
              <span
                className="text-xs uppercase tracking-wider"
                style={{ color: TEXT_DIM }}
              >
                {" "}
                Project summary{" "}
              </span>
              <textarea
                required
                rows={7}
                className="rounded-xl bg-transparent border px-3 py-2 outline-none focus:ring-2 resize-none"
                style={{
                  borderColor: BORDER,
                  color: "#FFFFFF",
                }}
                placeholder="Goals, platform, key features, audience, and what success looks like."
              />
            </label>
          </div>

          {/* Upload section (from Option B) */}
          <div className="mt-4">
            <label
              className="rounded-2xl border p-4 flex items-center gap-3 cursor-pointer hover:opacity-90 transition"
              style={{
                borderColor: BORDER,
                background: PANEL_2,
              }}
            >
              <Upload size={18} color={NEON} />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Attach brief or references
                </p>
                <p className="text-xs" style={{ color: TEXT_DIM }}>
                  {" "}
                  PDF, deck, videos, links (optional){" "}
                </p>
              </div>
              <input type="file" className="hidden" multiple />
            </label>
          </div>

          {/* Footer row */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-xs" style={{ color: TEXT_DIM }}>
              {" "}
              Prefer a quick call first? Mention it above.{" "}
            </p>
            <button
              type="submit"
              disabled={sending}
              className="rounded-2xl px-5 py-3 font-semibold inline-flex items-center gap-2 transition-transform hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(90deg, ${NEON}33, ${VIOLET}66)`,
                border: `1px solid ${BORDER}`,
                color: "#FFFFFF",
              }}
            >
              {sending ? "Sending..." : "Send Inquiry"}{" "}
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Success line */}
          <AnimatePresence>
            {sent && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="mt-4 text-sm flex items-center gap-2"
                style={{ color: NEON }}
              >
                <CheckCircle2 size={16} />
                Inquiry received — we'll get back to you soon.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
};

export default WodhContact_OptionC_Enhanced_Final;

