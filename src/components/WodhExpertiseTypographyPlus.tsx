"use client";

import { useEffect } from "react";

export default function WodhExpertiseTypographyPlus() {
  useEffect(() => {
    const stack = document.getElementById("expertise-typo-stack");
    const titles =
      stack?.querySelectorAll<HTMLElement>("[data-service-title]");
    const progressBar =
      document.querySelector<HTMLElement>("[data-progress-bar]");
    let maxIndexSeen = -1;

    // Scroll-based progress bar
    if (titles && progressBar) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const index = parseInt(el.dataset.serviceIndex || "0", 10);
            if (index > maxIndexSeen) {
              maxIndexSeen = index;
              const total = titles.length - 1 || 1;
              const ratio = total > 0 ? index / total : 1;
              progressBar.style.height = `${20 + ratio * 80}%`;
            }
          });
        },
        { threshold: 0.4 }
      );

      titles.forEach((el, i) => {
        (el as HTMLElement).dataset.serviceIndex = String(i);
        observer.observe(el);
      });
    }

    // Mouse parallax glow
    const handleMouseMove = (e: MouseEvent) => {
      const glow = document.querySelector<HTMLElement>("[data-bg-glow]");
      if (!glow) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const items = [
    {
      title: "Game Development",
      gradient: "from-[#9EF315] to-[#5B2DDC]",
      desc: "From concept to launch, we craft interactive experiences for mobile, PC, console & web using Unity, Unreal Engine & proprietary stacks.",
      link: "View Game Projects →",
    },
    {
      title: "XR & Metaverse",
      gradient: "from-[#5B2DDC] to-[#9EF315]",
      desc: "Immersive AR, VR & MR experiences that redefine engagement — built for Apple Vision Pro, Meta Quest, Pico & WebXR.",
      link: "Explore XR Work →",
    },
    {
      title: "3D Design",
      gradient: "from-[#9EF315] to-[#5B2DDC]",
      desc: "Stylized & realistic assets, environments, characters & cinematics — optimized for real-time engines & XR pipelines.",
      link: "Watch 3D Reel →",
    },
    {
      title: "Creative Tech",
      gradient: "from-[#5B2DDC] to-[#9EF315]",
      desc: "WebGL, gamified funnels, interactive microsites & installations where code, design and play intersect.",
      link: "See Interactive Work →",
    },
  ];

  return (
    <section
      id="expertise"
      aria-label="Wodh Expertise Typography Stack"
      className="relative bg-[#0C0722] text-white py-28 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        data-bg-glow
        className="pointer-events-none absolute -top-40 -right-10 w-80 h-80 
        bg-[radial-gradient(circle,#5B2DDC44,transparent)] blur-3xl opacity-70 
        transition-transform duration-500"
      />
      <div
        className="pointer-events-none absolute bottom-[-120px] left-[-40px] 
        w-72 h-72 bg-[radial-gradient(circle,#9EF31522,transparent)] blur-3xl opacity-70"
      />
      <div
        className="pointer-events-none absolute inset-0 
        bg-[radial-gradient(circle_at_center,rgba(9,6,26,0.35),transparent)] mix-blend-screen"
      />

      {/* Floating neon particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="particle" />
        <div className="particle particle-delay" />
        <div className="particle particle-alt" />
        <div className="particle particle-small" />
      </div>

      {/* Left progress bar (desktop only) */}
      <div className="hidden md:flex flex-col items-center gap-2 absolute left-8 top-40 bottom-24 z-20">
        <div className="w-px h-full bg-[#1D1633] rounded-full relative overflow-hidden">
          <div
            data-progress-bar
            className="absolute bottom-0 w-full bg-gradient-to-t from-[#9EF315] via-[#5B2DDC] 
            to-transparent rounded-full transition-all duration-500"
            style={{ height: "20%" }}
          />
        </div>
        <span className="text-[8px] tracking-[0.16em] uppercase text-[#B9A8FF]">
          Services
        </span>
      </div>

      {/* Section Heading */}
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10 text-center space-y-4 mb-24">
        <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-[#B9A8FF]">
          Our Expertise
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3F3F3]">
          The worlds we build.
        </h2>
        <p className="text-[#D1C6FF] text-sm md:text-base max-w-2xl mx-auto">
          Four core dimensions of Wodh — visible from the start, amplified on
          hover.
        </p>
      </div>

      {/* Typography Hero Stack */}
      <div
        id="expertise-typo-stack"
        className="relative max-w-7xl mx-auto flex flex-col items-center gap-24 px-6 lg:px-10"
      >
        {items.map((item, index) => (
          <div
            key={item.title}
            data-service-title
            data-service-index={index}
            className="relative group w-full text-center cursor-pointer transition-all duration-500"
          >
            {/* Base visible title */}
            <h3
              className="text-5xl md:text-7xl lg:text-[7.5rem] font-extrabold uppercase tracking-tight 
              select-none transition-all duration-700 ease-out text-[#1D1633] 
              group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.4)]"
              style={{ WebkitTextStroke: "1px #1D1633" }}
            >
              {item.title}
            </h3>

            {/* Hover enhancement */}
            <div
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center 
              opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out"
            >
              <h3
                className={`text-5xl md:text-7xl lg:text-[7.5rem] font-extrabold uppercase tracking-tight 
                bg-clip-text text-transparent bg-gradient-to-r ${item.gradient} 
                drop-shadow-[0_0_16px_rgba(158,243,21,0.45)]`}
              >
                {item.title}
              </h3>
              <p className="mt-3 text-[#F3F3F3] text-xs md:text-sm max-w-xl mx-auto">
                {item.desc}
              </p>
              <a
                href="#case-studies"
                className="mt-2 text-[#9EF315] text-[10px] md:text-xs border-b border-[#9EF315] 
                hover:text-white hover:border-white transition-colors"
              >
                {item.link}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

