"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CUBIC_EASE } from "../animations/motionVariants";
import { MetadataField } from "../../types/metadata";
import { getFieldValue, parseButtonValue } from "../../utils/metadata";

interface HeroSectionVideoProps {
  data?: MetadataField[];
}

export default function HeroSectionVideo({ data }: HeroSectionVideoProps) {
  const heroVideo =
    getFieldValue(data, "hero_video") || "/assets/videos/hero_section_video.mp4";
  const mobileVideo =
    getFieldValue(data, "mobile_video") ||
    "/assets/videos/hero_section_video_mobile.mp4";
  const featuredLabel =
    getFieldValue(data, "featured_label") || "FEATURED";
  const heroDescription =
    getFieldValue(data, "hero_description") ||
    getFieldValue(data, "hero_subtitle") ||
    "A CURATED PLATFORM FOR DESIGN & ARCHITECTURE";
  const cta = parseButtonValue(
    getFieldValue(data, "cta_button"),
    "REQUEST AN INVITATION",
    "#contact"
  );

  return (
    <section
      id="hero"
      className="hero-section relative min-h-[100svh] w-full overflow-hidden bg-[#050505] text-[#f4f0e8] flex items-center justify-center"
      aria-label="Archinet featured architectural summit hero"
    >
      {/* =========================================================
          BACKGROUND MP4 VIDEO (Direct Azure Blob / Local Asset)
      ========================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          key={`${heroVideo}-${mobileVideo}`}
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
            src={heroVideo}
            type="video/mp4"
            media="(min-width: 768px)"
          />
          {/* Mobile hero video (9:16), supplied specifically for small screens. */}
          <source
            src={mobileVideo}
            type="video/mp4"
            media="(max-width: 767px)"
          />
          {/* Fallback for browsers that do not evaluate source media queries. */}
          <source
            src={heroVideo}
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
            {featuredLabel}
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
            {heroDescription}
          </motion.p>

          {/* Primary Call to Action Button: Slide IN from Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: CUBIC_EASE }}
            className="mt-8"
          >
            <Link
              href={cta.link || "#contact"}
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
              {cta.text}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
