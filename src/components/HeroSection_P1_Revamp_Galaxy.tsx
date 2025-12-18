"use client";

import React from "react";

import { motion } from "framer-motion";

import { ArrowRight, Sparkles } from "lucide-react";



/**

 * HeroSection_P1_Revamp_Galaxy.tsx

 * - Same P1 split DNA

 * - Adds hyperspeed/galaxy animated background

 * - Supports OPTIONAL video background (drop mp4/webm url)

 * - Uses real logos for trust strip

 */



const BG = "#0C0722";

const PANEL = "#0F0A26";

const MID = "#2A1E55";

const NEON = "#9EF315";

const VIOLET = "#5B2DDC";

const TEXT_VIOLET = "#B9A8FF";



/** OPTIONAL: add your own galaxy / hyperspeed loop here */

const VIDEO_URL = ""; 

// Example you can try later:

// const VIDEO_URL = "/videos/wodh-hyperspeed.mp4";



const logos = [

  {

    name: "Meta",

    src: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Meta_Platforms_Inc._logo.svg",

  }, // official Meta mark :contentReference[oaicite:1]{index=1}

  {

    name: "Microsoft",

    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",

  }, // Microsoft public-domain logo :contentReference[oaicite:2]{index=2}

  {

    name: "Sony",

    src: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",

  }, // common Sony wordmark

  {

    name: "Unity",

    src: "https://upload.wikimedia.org/wikipedia/commons/1/19/Unity_Technologies_logo.svg",

  }, // Unity official logo :contentReference[oaicite:3]{index=3}

  {

    name: "Unreal Engine",

    src: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Unreal_Engine_Logo.svg",

  }, // Unreal logo :contentReference[oaicite:4]{index=4}

  {

    name: "Niantic",

    src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Niantic_logo.svg",

  },

];



const HeroSection_P1_Revamp_Galaxy: React.FC = () => {

  return (

    <section

      className="relative w-full overflow-hidden text-white"

      style={{

        background: BG,

        fontFamily:

          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,"Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',

      }}

    >

      {/* =========================

          GALAXY / HYPERSPEED BACKGROUND

         ========================= */}

      <div className="pointer-events-none absolute inset-0">

        {/* Optional video layer */}

        {VIDEO_URL && (

          <video

            className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"

            autoPlay

            muted

            loop

            playsInline

          >

            <source src={VIDEO_URL} />

          </video>

        )}



        {/* Hyperspeed streaks (works even without video) */}

        <div className="absolute inset-0 hyperspeed-layer" />



        {/* Ambient glows on top of streaks */}

        <div

          className="absolute -top-56 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full blur-3xl opacity-35"

          style={{

            background: `radial-gradient(circle, ${VIOLET}66 0%, transparent 60%)`,

          }}

        />

        <div

          className="absolute -bottom-64 right-[-10%] h-[820px] w-[820px] rounded-full blur-3xl opacity-30"

          style={{

            background: `radial-gradient(circle, ${NEON}55 0%, transparent 65%)`,

          }}

        />

      </div>



      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-14 sm:py-18 lg:py-22">

        {/* TOP EYEBROW + MICRO TRUST */}

        <motion.div

          initial={{ opacity: 0, y: 6 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.6 }}

          className="mb-6 flex flex-wrap items-center justify-between gap-3"

        >

          <p className="text-xs sm:text-sm tracking-[0.35em] text-white/70">

            WODH STUDIO

          </p>



          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/60">

            <Sparkles size={14} style={{ color: NEON }} />

            XR Studio · Games Studio · R&D Lab

          </div>

        </motion.div>



        {/* SPLIT HERO */}

        <div className="relative grid gap-4 lg:grid-cols-2">

          {/* XR SIDE */}

          <motion.div

            initial={{ opacity: 0, y: 16 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.85 }}

            whileHover={{ y: -6, scale: 1.015 }}

            className="group relative rounded-3xl border p-7 sm:p-9 min-h-[420px] overflow-hidden"

            style={{

              background:

                `radial-gradient(1000px 650px at 15% 10%, ${NEON}22, transparent 60%), 

                 linear-gradient(180deg, ${PANEL}ee, ${BG}ee)`,

              borderColor: MID,

              boxShadow: "inset 0 0 70px rgba(158,243,21,0.06)",

              backdropFilter: "blur(2px)",

            }}

          >

            {/* Neon glare */}

            <div

              className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full blur-3xl opacity-0 transition group-hover:opacity-100"

              style={{ background: `${NEON}55` }}

            />



            {/* Content */}

            <div className="relative z-10 flex h-full flex-col justify-between">

              <div>

                <p className="text-sm tracking-[0.25em] text-white/65">

                  XR STUDIO

                </p>



                <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.02]">

                  BUILDING

                  <br />

                  <span style={{ color: NEON }}>SPATIAL REALITIES</span>

                </h1>



                <p className="mt-4 max-w-md text-base sm:text-lg text-white/80">

                  AR activations, VR training, mixed-reality platforms, and

                  location-based XR experiences that feel seamless in the real world.

                </p>



                {/* Mini chips */}

                <div className="mt-5 flex flex-wrap gap-2">

                  {["AR • VR • MR", "Unity / Unreal", "Real-time worlds"].map(

                    (chip) => (

                      <span

                        key={chip}

                        className="rounded-full border px-3 py-1 text-xs text-white/75"

                        style={{

                          borderColor: MID,

                          background: "#0A061A66",

                        }}

                      >

                        {chip}

                      </span>

                    )

                  )}

                </div>

              </div>



              <div className="mt-6 flex flex-wrap items-center gap-3">

                <button

                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-black transition hover:-translate-y-0.5"

                  style={{

                    background: NEON,

                    boxShadow: `0 0 44px ${NEON}55`,

                  }}

                >

                  Explore XR Work <ArrowRight size={16} />

                </button>

                <button

                  className="rounded-xl px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"

                  style={{ background: "#0A061A", border: `1px solid ${MID}` }}

                >

                  Start XR Project

                </button>

              </div>

            </div>

          </motion.div>



          {/* GAMES SIDE */}

          <motion.div

            initial={{ opacity: 0, y: 16 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.85, delay: 0.08 }}

            whileHover={{ y: -6, scale: 1.015 }}

            className="group relative rounded-3xl border p-7 sm:p-9 min-h-[420px] overflow-hidden"

            style={{

              background:

                `radial-gradient(1000px 650px at 85% 10%, ${VIOLET}33, transparent 60%), 

                 linear-gradient(180deg, ${PANEL}ee, ${BG}ee)`,

              borderColor: MID,

              boxShadow: "inset 0 0 70px rgba(91,45,220,0.10)",

              backdropFilter: "blur(2px)",

            }}

          >

            {/* Violet glare */}

            <div

              className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full blur-3xl opacity-0 transition group-hover:opacity-100"

              style={{ background: `${VIOLET}66` }}

            />



            <div className="relative z-10 flex h-full flex-col justify-between">

              <div>

                <p className="text-sm tracking-[0.25em] text-white/65">

                  GAMES STUDIO

                </p>



                <h1 className="mt-3 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.02]">

                  CREATING

                  <br />

                  <span style={{ color: TEXT_VIOLET }}>PLAYABLE UNIVERSES</span>

                </h1>



                <p className="mt-4 max-w-md text-base sm:text-lg text-white/80">

                  Mobile, PC, and multiplayer games with iconic mechanics,

                  authentic art, and long-tail engagement.

                </p>



                {/* Mini chips */}

                <div className="mt-5 flex flex-wrap gap-2">

                  {["Mobile / PC", "Multiplayer", "Live Ops Ready"].map((chip) => (

                    <span

                      key={chip}

                      className="rounded-full border px-3 py-1 text-xs text-white/75"

                      style={{

                        borderColor: MID,

                        background: "#0A061A66",

                      }}

                    >

                      {chip}

                      </span>

                  ))}

                </div>

              </div>



              <div className="mt-6 flex flex-wrap items-center gap-3">

                <button

                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"

                  style={{

                    background: `linear-gradient(90deg, ${VIOLET}, ${NEON}55)`,

                    boxShadow: `0 0 44px ${VIOLET}55`,

                  }}

                >

                  Explore Game Work <ArrowRight size={16} />

                </button>

                <button

                  className="rounded-xl px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"

                  style={{ background: "#0A061A", border: `1px solid ${MID}` }}

                >

                  Start Game Project

                </button>

              </div>

            </div>

          </motion.div>



          {/* DIAGONAL ENERGY DIVIDER */}

          <div className="pointer-events-none absolute inset-0 hidden lg:block">

            <div

              className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 opacity-60"

              style={{

                background: `linear-gradient(180deg, transparent, ${MID}, transparent)`,

                transform: "skewX(-8deg)",

              }}

            />

            <div

              className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl opacity-55"

              style={{

                background: `radial-gradient(circle, ${NEON}44, ${VIOLET}33, transparent 65%)`,

              }}

            />

          </div>

        </div>



        {/* TRUST STRIP (REAL LOGOS) */}

        <motion.div

          initial={{ opacity: 0, y: 8 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: 0.3 }}

          className="mt-10 rounded-2xl border px-4 py-4 sm:px-6 sm:py-5"

          style={{ borderColor: MID, background: "#0A061A88" }}

        >

          <p className="mb-3 text-xs tracking-[0.25em] text-white/55">

            TRUSTED BY TEAMS WORLDWIDE

          </p>



          <div className="relative overflow-hidden">

            <motion.div

              className="flex items-center gap-10"

              animate={{ x: ["0%", "-50%"] }}

              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}

            >

              {[...logos, ...logos].map((l, i) => (

                <div

                  key={`${l.name}-${i}`}

                  className="shrink-0 opacity-80 hover:opacity-100 transition"

                >

                  <img

                    src={l.src}

                    alt={l.name}

                    className="h-7 sm:h-8 md:h-9 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition"

                  />

                </div>

              ))}

            </motion.div>

          </div>

        </motion.div>

      </div>



      {/* =========================

          Local CSS for hyperspeed streaks

         ========================= */}

      <style>{`

        .hyperspeed-layer {

          background:

            radial-gradient(1200px 700px at 50% -10%, rgba(91,45,220,0.20), transparent 60%),

            radial-gradient(1000px 600px at 80% 110%, rgba(158,243,21,0.18), transparent 60%);

          position: absolute;

          inset: 0;

          overflow: hidden;

        }

        .hyperspeed-layer::before,

        .hyperspeed-layer::after {

          content: "";

          position: absolute;

          inset: -40% -40%;

          background-image:

            repeating-linear-gradient(

              90deg,

              rgba(255,255,255,0.06) 0px,

              rgba(255,255,255,0.06) 1px,

              transparent 1px,

              transparent 22px

            );

          transform: rotate(12deg);

          animation: hyperspeed-move 7s linear infinite;

          opacity: 0.55;

          filter: blur(1px);

        }

        .hyperspeed-layer::after {

          animation-duration: 11s;

          opacity: 0.35;

          transform: rotate(-9deg) scale(1.1);

        }

        @keyframes hyperspeed-move {

          0% { transform: translateY(0) translateX(0) rotate(12deg); }

          100% { transform: translateY(35%) translateX(-15%) rotate(12deg); }

        }

      `}</style>

    </section>

  );

};



export default HeroSection_P1_Revamp_Galaxy;

