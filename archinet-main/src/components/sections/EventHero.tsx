'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { EVENT_DATA } from '../../data';
import { useCountdown } from '../../hooks/useCountdown';
import {
  RevealTitle,
  RevealLeft,
  RevealRight,
  StaggerContainer,
  StaggerItem,
} from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import { getFieldValue, parseButtonValue } from '../../utils/metadata';

interface EventHeroProps {
  data?: MetadataField[];
}

export default function EventHero({ data }: EventHeroProps) {
  const { days, hours, minutes, seconds } = useCountdown(
    EVENT_DATA.targetDateISO
  );

  const eyebrow = getFieldValue(data, 'section_label') || EVENT_DATA.eyebrow || 'THE REFINED CHAPTER';
  const editionTitle = getFieldValue(data, 'edition') || '14th Edition';
  const eventDate = getFieldValue(data, 'event_date') || '20 FEBRUARY 2027';
  const venue = getFieldValue(data, 'venue') || 'THE ST. REGIS, MUMBAI';
  const eventStatus = getFieldValue(data, 'event_status') || 'BY INVITATION ONLY';
  const backgroundImage = getFieldValue(data, 'background_image') || '/images/audience-hero.jpg';

  const downloadBrochure = parseButtonValue(
    getFieldValue(data, 'download_brochure'),
    'DOWNLOAD E-BROCHURE',
    '/brochure/Archinet-14th-Edition-Brochure.pdf'
  );

  const exhibitWithUs = parseButtonValue(
    getFieldValue(data, 'exhibit_with_us'),
    'EXHIBIT WITH US',
    '#contact'
  );

  return (
    <section
      id="edition-14"
      className="relative w-full bg-[#050505] text-[#f4f0e8] overflow-hidden scroll-mt-16 border-b border-[rgba(255,255,255,0.06)]"
    >
      {/* Target anchor for #14th-edition */}
      <div id="14th-edition" className="absolute top-0 left-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT COLUMN: EVENT IMAGE WITH BOTTOM FLOATING CARD */}
          <RevealLeft className="lg:col-span-5 relative w-full">
            <div className="relative w-full rounded-2xl overflow-hidden min-h-[460px] sm:min-h-[540px] lg:min-h-[720px] border border-white/10 shadow-2xl bg-[#0f0f0f]">
              {/* Event Image in Original Natural Brightness */}
              <img
                src={backgroundImage}
                alt={editionTitle}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Floating Bottom Venue & Date Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-[#f0ab44]/30 shadow-2xl flex items-center justify-between gap-4 z-10">
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-sans font-semibold text-white tracking-wider uppercase block">
                    {venue}
                  </span>
                  <span className="text-[10px] font-sans text-white/60 block mt-0.5 leading-snug">
                    Exclusive 1-Day Curated Gathering for Architecture &amp; Interior Design Decision-Makers
                  </span>
                </div>
                <span className="text-xs font-mono text-[#f0ab44] font-semibold uppercase tracking-wider whitespace-nowrap shrink-0">
                  {eventDate}
                </span>
              </div>
            </div>
          </RevealLeft>

          {/* RIGHT COLUMN: EVENT CONTENT, COUNTDOWN & CTAs */}
          <RevealRight className="lg:col-span-7 relative flex flex-col justify-center">
            {/* Giant Faint "14" Watermark in Background */}
            <span
              className="absolute -right-4 -bottom-6 font-serif text-[240px] sm:text-[340px] font-extrabold text-white/[0.03] select-none pointer-events-none leading-none z-0"
              aria-hidden="true"
            >
              14
            </span>

            <div className="relative z-10 flex flex-col gap-6">
              {/* Eyebrow */}
              <RevealTitle>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f0ab44]" />
                  <span className="text-xs font-mono tracking-[0.35em] text-[#f0ab44] font-semibold uppercase">
                    {eyebrow}
                  </span>
                </div>
              </RevealTitle>

              {/* Main Title */}
              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-[#f4f0e8] tracking-tight leading-none">
                {editionTitle}
              </h2>

              {/* Event Meta Line */}
              <p className="text-[11px] sm:text-xs font-mono text-[#f0ab44] tracking-[0.18em] uppercase leading-relaxed">
                {eventDate}
                <span className="mx-2 text-[#f0ab44]/60">&bull;</span>
                {venue}
                <span className="mx-2 text-[#f0ab44]/60">&bull;</span>
                {eventStatus}
              </p>

              {/* Circular Countdown Timers */}
              <StaggerContainer
                staggerChildren={0.1}
                delayChildren={0.2}
                className="grid grid-cols-4 gap-3 sm:gap-4 py-2 max-w-md"
              >
                {/* DAYS */}
                <StaggerItem
                  direction="scale"
                  className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border border-[#f0ab44]/35 bg-black/40 flex flex-col items-center justify-center text-center shadow-lg transition-transform duration-300 hover:border-[#f0ab44]"
                >
                  <span className="font-serif text-2xl sm:text-3xl text-white font-normal leading-none">
                    {String(days).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#f0ab44] tracking-widest uppercase mt-1">
                    DAYS
                  </span>
                </StaggerItem>

                {/* HRS */}
                <StaggerItem
                  direction="scale"
                  className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border border-[#f0ab44]/35 bg-black/40 flex flex-col items-center justify-center text-center shadow-lg transition-transform duration-300 hover:border-[#f0ab44]"
                >
                  <span className="font-serif text-2xl sm:text-3xl text-white font-normal leading-none">
                    {String(hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#f0ab44] tracking-widest uppercase mt-1">
                    HRS
                  </span>
                </StaggerItem>

                {/* MINS */}
                <StaggerItem
                  direction="scale"
                  className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border border-[#f0ab44]/35 bg-black/40 flex flex-col items-center justify-center text-center shadow-lg transition-transform duration-300 hover:border-[#f0ab44]"
                >
                  <span className="font-serif text-2xl sm:text-3xl text-white font-normal leading-none">
                    {String(minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#f0ab44] tracking-widest uppercase mt-1">
                    MINS
                  </span>
                </StaggerItem>

                {/* SECS */}
                <StaggerItem
                  direction="scale"
                  className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border border-[#f0ab44]/35 bg-black/40 flex flex-col items-center justify-center text-center shadow-lg transition-transform duration-300 hover:border-[#f0ab44]"
                >
                  <span className="font-serif text-2xl sm:text-3xl text-white font-normal leading-none">
                    {String(seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#f0ab44] tracking-widest uppercase mt-1">
                    SECS
                  </span>
                </StaggerItem>
              </StaggerContainer>

              {/* 3 Paragraphs */}
              <div className="flex flex-col gap-3 text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                <p>
                  Archinet brings participating manufacturing brands together with an invited community of principal architects, interior designers and decision-makers from established design firms.
                </p>
                <p>
                  With a maximum of 20 manufacturing brands and 100+ invited design professionals, each edition is designed to create opportunities for product discovery, direct conversations and meaningful industry connections.
                </p>
                <p>
                  Explore products and materials from participating brands, engage with their teams, exchange perspectives with fellow professionals and discover solutions relevant to the built environment.
                </p>
              </div>

              {/* 3 Value Cards: Discover, Engage, Connect */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-[#f0ab44] tracking-wider uppercase font-semibold mb-1">
                    &bull; DISCOVER
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    Explore architectural products, materials and solutions presented by participating manufacturing brands.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-[#f0ab44] tracking-wider uppercase font-semibold mb-1">
                    &bull; ENGAGE
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    Interact directly with brand representatives and members of the architecture and interior-design community.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-[#f0ab44] tracking-wider uppercase font-semibold mb-1">
                    &bull; CONNECT
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    Build professional relationships and continue conversations beyond the event.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
                {/* EXHIBIT WITH US */}
                <a
                  href={exhibitWithUs.link}
                  className="px-6 py-3.5 rounded-full border border-[#f0ab44]/60 bg-transparent hover:bg-[#f0ab44]/10 text-[#f0ab44] hover:text-white text-xs font-mono font-semibold tracking-wider uppercase transition-colors text-center"
                >
                  {exhibitWithUs.text}
                </a>

                {/* REQUEST AN INVITATION */}
                <a
                  href="#contact"
                  className="px-6 py-3.5 rounded-full bg-[#f0ab44] hover:bg-[#d99732] text-black text-xs font-mono font-bold tracking-wider uppercase transition-colors text-center shadow-lg"
                >
                  REQUEST AN INVITATION
                </a>

                {/* DOWNLOAD E-BROCHURE */}
                <a
                  href={downloadBrochure.link}
                  download={downloadBrochure.link.endsWith('.pdf') ? true : undefined}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/30 hover:border-[#f0ab44] text-white hover:text-[#f0ab44] text-xs font-mono font-semibold tracking-wider uppercase transition-colors text-center"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadBrochure.text}</span>
                </a>
              </div>
            </div>
          </RevealRight>
        </div>
      </div>
    </section>
  );
}
