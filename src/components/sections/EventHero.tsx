'use client';

import React from 'react';
import { EVENT_DATA } from '../../data';
import { useCountdown } from '../../hooks/useCountdown';
import {
  RevealTitle,
  RevealLeft,
  RevealRight,
  StaggerContainer,
  StaggerItem,
} from '../animations/ScrollReveal';

export default function EventHero() {
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATA.targetDateISO);

  return (
    <section 
      id="edition-14" 
      className="relative w-full bg-[#050505] text-[#f4f0e8] overflow-hidden  scroll-mt-16"
    >
      {/* Target anchor for #14th-edition as well */}
      <div id="14th-edition" className="absolute top-0 left-0" />
      <div className="w-full min-h-[620px] lg:min-h-[700px] grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* LEFT COLUMN: EVENT CONTENT, COUNTDOWN & CTAs */}
        <div className="lg:col-span-6 relative flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 bg-[#050505] order-2 lg:order-1">
          
          {/* Giant Faint "14" Watermark in Background */}
          <span 
            className="absolute left-4 bottom-2 sm:bottom-4 font-serif text-[240px] sm:text-[340px] font-extrabold text-white/[0.03] select-none pointer-events-none leading-none z-0"
            aria-hidden="true"
          >
            14
          </span>

          <div className="relative z-10 flex flex-col gap-7 max-w-xl">
            
            {/* Eyebrow */}
            <RevealTitle>
              <span className="text-xs font-mono tracking-[0.35em] text-[#f0ab44] font-medium uppercase">
                {EVENT_DATA.eyebrow || 'THE REFINED CHAPTER'}
              </span>
            </RevealTitle>

            {/* Main Title */}
            <RevealLeft delay={0.1}>
              <h2 className="font-serif text-5xl sm:text-7xl font-normal text-[#f4f0e8] tracking-tight leading-none">
                14th Edition
              </h2>
            </RevealLeft>

            {/* Event Meta Line */}
            <RevealLeft delay={0.15}>
              <p className="text-[11px] sm:text-xs font-mono text-[#f0ab44] tracking-[0.18em] uppercase leading-relaxed">
                20 FEBRUARY 2027 <span className="mx-2 text-[#f0ab44]/60">•</span> THE ST. REGIS, MUMBAI <span className="mx-2 text-[#f0ab44]/60">•</span> BY INVITATION ONLY
              </p>
            </RevealLeft>

            {/* Circular Countdown Timers */}
            <StaggerContainer staggerChildren={0.12} delayChildren={0.2} className="grid grid-cols-4 gap-3 sm:gap-5 py-4">
              
              {/* DAYS */}
              <StaggerItem direction="scale" className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-[#f0ab44]/35 bg-black/40 flex flex-col items-center justify-center text-center shadow-lg transition-transform duration-300 hover:border-[#f0ab44]">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-none">
                  {String(days).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#f0ab44] tracking-widest uppercase mt-1">
                  DAYS
                </span>
              </StaggerItem>

              {/* HRS */}
              <StaggerItem direction="scale" className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-[#f0ab44]/35 bg-black/40 flex flex-col items-center justify-center text-center shadow-lg transition-transform duration-300 hover:border-[#f0ab44]">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-none">
                  {String(hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#f0ab44] tracking-widest uppercase mt-1">
                  HRS
                </span>
              </StaggerItem>

              {/* MINS */}
              <StaggerItem direction="scale" className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-[#f0ab44]/35 bg-black/40 flex flex-col items-center justify-center text-center shadow-lg transition-transform duration-300 hover:border-[#f0ab44]">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-none">
                  {String(minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#f0ab44] tracking-widest uppercase mt-1">
                  MINS
                </span>
              </StaggerItem>

              {/* SECS */}
              <StaggerItem direction="scale" className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border border-[#f0ab44]/35 bg-black/40 flex flex-col items-center justify-center text-center shadow-lg transition-transform duration-300 hover:border-[#f0ab44]">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-none">
                  {String(seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#f0ab44] tracking-widest uppercase mt-1">
                  SECS
                </span>
              </StaggerItem>

            </StaggerContainer>

            {/* Action Buttons */}
            <RevealLeft delay={0.35}>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <a
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-4 bg-[#dfbd75] hover:bg-[#f0ab44] text-black text-xs font-mono font-bold tracking-[0.14em] uppercase transition-colors duration-300 text-center shadow-md"
                >
                  REQUEST AN INVITATION
                </a>

                <a
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#f0ab44]/60 hover:bg-[#f0ab44]/10 text-[#f0ab44] hover:text-white text-xs font-mono font-semibold tracking-[0.14em] uppercase transition-colors duration-300 text-center"
                >
                  EXHIBIT WITH US
                </a>
              </div>
            </RevealLeft>

          </div>

        </div>

        {/* RIGHT COLUMN: FULL-HEIGHT DARK MONOCHROME AUDIENCE PHOTO */}
        <RevealRight className="lg:col-span-6 relative min-h-[350px] sm:min-h-[450px] lg:min-h-full w-full overflow-hidden order-1 lg:order-2">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
            style={{
              backgroundImage: `url('/images/audience-hero.jpg')`,
              filter: 'grayscale(100%) contrast(120%) brightness(48%)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-[#050505] hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent lg:hidden" />
        </RevealRight>

      </div>
    </section>
  );
}
