"use client";

import React from "react";
import { motion } from "framer-motion";

const WodhCTA_FullWidthGradient_C: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0C0722] px-4 py-16 text-white sm:px-6 lg:px-10 xl:px-16 lg:py-24">
      {/* Gradient wave backdrop */}
      <motion.div
        className="absolute inset-0 opacity-70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background:
            "radial-gradient(1200px circle at 10% -10%, rgba(158,243,21,0.25), transparent 60%), radial-gradient(1000px circle at 90% 120%, rgba(91,45,220,0.65), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.h2
          className="text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          Let's turn your idea into an{" "}
          <span className="text-[#9EF315]">
            experience people remember.
          </span>
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-2xl text-sm text-[#D1C6FF] sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          {" "}
          XR, games, real-time worlds, interactive products — built with
          precision, shipped with care.{" "}
        </motion.p>

        <motion.div
          className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-[#9EF315] bg-[#9EF315] px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#0C0722] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(158,243,21,0.95)]"
          >
            {" "}
            Start a Project →{" "}
          </a>
          <a
            href="mailto:hello@wodh.io"
            className="text-xs font-medium uppercase tracking-[0.22em] text-[#E8FFD0] hover:text-white"
          >
            {" "}
            hello@wodh.io{" "}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WodhCTA_FullWidthGradient_C;

