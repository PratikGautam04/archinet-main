"use client";

import React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { CUBIC_EASE } from "../animations/motionVariants";

export default function HeroSectionVideo() {
  const scrollToNext = () => {
    const nextSection =
      document.querySelector("#about") ||
      document.querySelector("main > section:nth-child(2)");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="hero-section relative min-h-[100svh] w-full overflow-hidden bg-[#050505] text-[#f4f0e8] flex items-center justify-center"
      aria-label="Archinet featured architectural summit hero"
    >
      {/* =========================================================
          BACKGROUND MP4 VIDEO (assets/videos/hero_section_video.mp4)
      ========================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          style={{
            filter: "brightness(92%) contrast(105%)",
          }}
          aria-hidden="true"
        >
          {/* Desktop hero video (16:9). */}
          <source
            src="/assets/videos/hero_section_video.mp4"
            type="video/mp4"
            media="(min-width: 768px)"
          />
          {/* Mobile hero video (9:16), supplied specifically for small screens. */}
          <source
            src="/assets/videos/hero_section_video_mobile.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
          {/* Fallback for browsers that do not evaluate source media queries. */}
          <source
            src="/assets/videos/hero_section_video.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* =========================================================
          LIGHT CINEMATIC OVERLAYS & VIGNETTE
      ========================================================== */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#050505] pointer-events-none" />

      {/* =========================================================
          LEFT FEATURED INDICATOR (EDITORIAL SIDEBAR - Slide Left)
      ========================================================== */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: CUBIC_EASE }}
        className="absolute left-[4.5vw] top-1/2 z-20 hidden -translate-y-1/2 md:block pointer-events-none"
      >
        <div className="flex flex-col items-center gap-7">
          <span
            className="
              [writing-mode:vertical-rl]
              rotate-180
              text-[10px]
              font-medium
              tracking-[0.42em]
              text-[#f0ab44]
              uppercase
            "
          >
            FEATURED
          </span>

          <div className="relative h-[145px] w-px bg-white/20">
            <div className="absolute left-1/2 top-0 h-[48px] w-px -translate-x-1/2 bg-[#f0ab44]" />
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[#f0ab44] text-xs">
              ↓
            </span>
          </div>
        </div>
      </motion.div>

      {/* =========================================================
          MAIN HERO CONTENT AT BOTTOM
      ========================================================== */}
      <div className="relative z-20 flex min-h-[100svh] w-full max-w-[1280px] flex-col justify-end items-center px-6 pb-16 pt-24 text-center">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center">
          {/* Mobile/tablet FEATURED badge intentionally hidden.
              The desktop vertical FEATURED indicator remains above (md+). */}

          {/* Commented out "Where Visionaries Meet" headline as requested */}
          {/* 
          <motion.h1
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: CUBIC_EASE }}
            className="
              max-w-[1100px]
              font-serif
              text-[clamp(2.75rem,6.2vw,6.8rem)]
              font-normal
              leading-[0.93]
              tracking-[-0.04em]
              text-[#f4f0e8]
              drop-shadow-lg
            "
          >
            Where Visionaries Meet
          </motion.h1>
          */}

          {/* Supporting Text at Bottom */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: CUBIC_EASE }}
            className="
              mt-4
              max-w-[800px]
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.42em]
              text-[#f1eee7]/90
              sm:text-[11px]
            "
          >
            A CURATED PLATFORM FOR DESIGN &amp; ARCHITECTURE
          </motion.p>

          {/* Primary Call to Action Button: Slide IN from Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: CUBIC_EASE }}
            className="mt-8"
          >
            <Link
              href="#contact"
              className="
                group
                inline-flex
                h-[56px]
                min-w-[285px]
                items-center
                justify-center
                rounded-full
                border
                border-white/75
                bg-black/20
                px-8
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.1em]
                text-white
                backdrop-blur-sm
                transition-all
                duration-500
                hover:border-[#f0ab44]
                hover:bg-[#f0ab44]
                hover:text-black
                hover:shadow-[0_0_25px_rgba(240,171,68,0.35)]
                focus:outline-none
                focus:ring-2
                focus:ring-[#f0ab44]
                focus:ring-offset-2
                focus:ring-offset-[#050505]
              "
            >
              REQUEST AN INVITATION
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
