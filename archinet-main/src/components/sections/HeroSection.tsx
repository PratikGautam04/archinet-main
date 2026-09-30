"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

export interface HeroSlide {
  id: string;
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

interface HeroSectionProps {
  slides?: HeroSlide[];
  autoPlay?: boolean;
  interval?: number;
}

const defaultSlides: HeroSlide[] = [
  {
    id: "01",
    image: "/images/hero/hero-01.jpg",
    eyebrow: "FEATURED",
    title: "We are Brand Curators",
    subtitle: "THE PREMIER ARCHITECTURE & INTERIOR DESIGN EVENT",
    ctaLabel: "REQUEST AN INVITATION",
    ctaHref: "#contact",
  },
  {
    id: "02",
    image: "/images/hero/hero-02.jpg",
    eyebrow: "FEATURED",
    title: "Where Visionaries Meet",
    subtitle: "A CURATED PLATFORM FOR DESIGN & ARCHITECTURE",
    ctaLabel: "REQUEST AN INVITATION",
    ctaHref: "#contact",
  },
  {
    id: "03",
    image: "/images/hero/hero-03.jpg",
    eyebrow: "FEATURED",
    title: "Curating Extraordinary Spaces",
    subtitle: "CONNECTING BRANDS, ARCHITECTS & DESIGNERS",
    ctaLabel: "REQUEST AN INVITATION",
    ctaHref: "#contact",
  },
];

export default function HeroSection({
  slides = defaultSlides,
  autoPlay = true,
  interval = 6000,
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeSlide = slides[activeIndex];

  const goToSlide = (index: number) => {
    if (index === activeIndex || isTransitioning) return;

    setIsTransitioning(true);
    setActiveIndex(index);

    window.setTimeout(() => {
      setIsTransitioning(false);
    }, 900);
  };

  const nextSlide = () => {
    const nextIndex = (activeIndex + 1) % slides.length;
    goToSlide(nextIndex);
  };

  const previousSlide = () => {
    const previousIndex =
      (activeIndex - 1 + slides.length) % slides.length;

    goToSlide(previousIndex);
  };

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [autoPlay, interval, slides.length]);

  return (
    <section
      id="hero"
      className="hero-section relative min-h-[100svh] w-full overflow-hidden bg-[#050505] text-[#f4f0e8]"
      aria-label="Archinet featured event"
    >
      {/* =========================================================
          BACKGROUND SLIDES
      ========================================================== */}

      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={slide.id}
              className={[
                "absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(.77,0,.18,1)]",
                isActive
                  ? "scale-100 opacity-100"
                  : "scale-[1.04] opacity-0",
              ].join(" ")}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          );
        })}
      </div>

      {/* =========================================================
          DARK CINEMATIC OVERLAY
      ========================================================== */}

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/90" />

      {/* Additional center darkness for typography */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.18)_45%,rgba(0,0,0,.5)_100%)]" />

      {/* =========================================================
          LEFT FEATURED INDICATOR
      ========================================================== */}

      <div className="absolute left-[4.5vw] top-1/2 z-20 hidden -translate-y-1/2 md:block">
        <div className="flex flex-col items-center gap-7">
          <span
            className="
              [writing-mode:vertical-rl]
              rotate-180
              text-[10px]
              font-medium
              tracking-[0.42em]
              text-[#f0ab44]
            "
          >
            {activeSlide.eyebrow || "FEATURED"}
          </span>

          <div className="relative h-[145px] w-px bg-white/20">
            <div className="absolute left-1/2 top-0 h-[48px] w-px -translate-x-1/2 bg-[#f0ab44]" />

            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[#f0ab44]">
              ↓
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          LEFT / RIGHT NAVIGATION
      ========================================================== */}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
            className="
              group
              absolute
              left-[7.5vw]
              top-1/2
              z-30
              hidden
              -translate-y-1/2
              items-center
              justify-center
              md:flex
            "
          >
            <ArrowLeft
              size={34}
              strokeWidth={1}
              className="
                text-white/55
                transition-all
                duration-300
                group-hover:-translate-x-1
                group-hover:text-white
              "
            />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="
              group
              absolute
              right-[7.5vw]
              top-1/2
              z-30
              hidden
              -translate-y-1/2
              items-center
              justify-center
              md:flex
            "
          >
            <ArrowRight
              size={34}
              strokeWidth={1}
              className="
                text-white/55
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:text-white
              "
            />
          </button>
        </>
      )}

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div className="relative z-20 flex min-h-[100svh] flex-col justify-end items-center px-6 pb-16 pt-20">
        <div
          className={[
            "mx-auto flex max-w-[1100px] flex-col items-center text-center",
            "transition-all duration-700",
            isTransitioning
              ? "translate-y-3 opacity-0"
              : "translate-y-0 opacity-100",
          ].join(" ")}
        >
          {/* Commented out headline as requested */}
          {/*
          <h1
            className="
              max-w-[1100px]
              font-serif
              text-[clamp(3rem,6.4vw,6.8rem)]
              font-normal
              leading-[0.92]
              tracking-[-0.045em]
              text-[#f4f0e8]
            "
          >
            {activeSlide.title}
          </h1>
          */}

          {activeSlide.subtitle && (
            <p
              className="
                mt-4
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.42em]
                text-[#f1eee7]
                sm:text-[11px]
              "
            >
              {activeSlide.subtitle}
            </p>
          )}

          {activeSlide.ctaLabel && (
            <Link
              href={activeSlide.ctaHref || "#"}
              className="
                group
                mt-8
                inline-flex
                h-[56px]
                min-w-[285px]
                items-center
                justify-center
                rounded-full
                border
                border-white/75
                px-8
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-white
                transition-all
                duration-500
                hover:border-[#f0ab44]
                hover:bg-[#f0ab44]
                hover:text-black
              "
            >
              {activeSlide.ctaLabel}
            </Link>
          )}
        </div>
      </div>

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================== */}

      {slides.length > 1 && (
        <div className="absolute bottom-24 right-5 z-30 flex gap-2 md:hidden">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur-sm"
          >
            <ArrowLeft size={16} strokeWidth={1.2} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur-sm"
          >
            <ArrowRight size={16} strokeWidth={1.2} />
          </button>
        </div>
      )}
    </section>
  );
}
