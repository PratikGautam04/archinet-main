
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
import {
  getField,
  getFieldValue,
  getCardJsonData,
  parseButtonValue,
} from '../../utils/metadata';

interface EventHeroProps {
  data?: MetadataField[];
}

export default function EventHero({ data }: EventHeroProps) {
  const { days, hours, minutes, seconds } = useCountdown(
    EVENT_DATA.targetDateISO
  );

  const eyebrow =
    getFieldValue(data, 'section_label', 'eyebrow', 'label') ||
    EVENT_DATA.eyebrow ||
    'THE REFINED CHAPTER';

  const editionTitle =
    getFieldValue(data, 'edition', 'title', 'heading') || '14th Edition';

  const eventDate =
    getFieldValue(data, 'event_date', 'date') || '20 FEBRUARY 2027';

  const venue = getFieldValue(data, 'venue') || 'THE ST. REGIS, MUMBAI';

  const eventStatus =
    getFieldValue(data, 'event_status', 'status') || 'BY INVITATION ONLY';

  const backgroundImage =
    getFieldValue(data, 'background_image', 'image') ||
    '/images/audience-hero.jpg';

  // Support download_brochure as Card field or single button
  const brochureCards = getCardJsonData<{
    label?: string;
    brochure_file?: string;
    file?: string;
    link?: string;
    url?: string;
  }>(getField(data, 'download_brochure', 'brochure'));

  let brochureText = 'DOWNLOAD E-BROCHURE';
  let brochureLink = '/brochure/Archinet-14th-Edition-Brochure.pdf';

  if (
    brochureCards.length > 0 &&
    (brochureCards[0].label ||
      brochureCards[0].brochure_file ||
      brochureCards[0].file)
  ) {
    if (brochureCards[0].label) {
      brochureText = brochureCards[0].label;
    }

    if (
      brochureCards[0].brochure_file ||
      brochureCards[0].file ||
      brochureCards[0].url ||
      brochureCards[0].link
    ) {
      brochureLink =
        brochureCards[0].brochure_file ||
        brochureCards[0].file ||
        brochureCards[0].url ||
        brochureCards[0].link ||
        brochureLink;
    }
  } else {
    const parsed = parseButtonValue(
      getFieldValue(data, 'download_brochure'),
      brochureText,
      brochureLink
    );

    brochureText = parsed.text;
    brochureLink = parsed.link;
  }

  const downloadBrochure = {
    text: brochureText,
    link: brochureLink,
  };

  const exhibitWithUs = parseButtonValue(
    getFieldValue(data, 'exhibit_with_us'),
    'EXHIBIT WITH US',
    '#contact'
  );

  const requestInvitation = parseButtonValue(
    getFieldValue(data, 'request_invitation'),
    'REQUEST AN INVITATION',
    '#contact'
  );

  const desc1 =
    getFieldValue(data, 'description_1', 'desc_1') ||
    'Archinet brings participating manufacturing brands together with an invited community of principal architects, interior designers and decision-makers from established design firms.';

  const desc2 =
    getFieldValue(data, 'description_2', 'desc_2') ||
    'With a maximum of 20 manufacturing brands and 100+ invited design professionals, each edition is designed to create opportunities for product discovery, direct conversations and meaningful industry connections.';

  const desc3 =
    getFieldValue(data, 'description_3', 'desc_3') ||
    'Explore products and materials from participating brands, engage with their teams, exchange perspectives with fellow professionals and discover solutions relevant to the built environment.';

  return (
    <section
      id="edition-14"
      className="relative w-full bg-black text-[#AAA59B] font-sans overflow-hidden scroll-mt-16 border-b border-[rgba(255,255,255,0.06)]"
    >
      {/* Target anchor for #14th-edition */}
      <div id="14th-edition" className="absolute top-0 left-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT COLUMN: EVENT IMAGE WITH BOTTOM FLOATING CARD */}
          <RevealLeft className="lg:col-span-5 relative w-full">
            <div className="relative w-full rounded-2xl overflow-hidden min-h-[460px] sm:min-h-[540px] lg:min-h-[720px] border border-white/10 shadow-2xl bg-[#0f0f0f]">
              <img
                src={backgroundImage}
                alt={editionTitle}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Floating Bottom Venue & Date Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-[#D9BC78]/30 shadow-2xl flex items-center justify-between gap-4 z-10">
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-sans font-semibold text-[#E8E1D5] tracking-wider uppercase block">
                    {venue}
                  </span>

                  <span className="text-[10px] font-sans text-[#AAA59B] block mt-0.5 leading-snug">
                    Exclusive 1-Day Curated Gathering for Architecture &amp;
                    Interior Design Decision-Makers
                  </span>
                </div>

                <span className="text-xs font-sans text-[#D9BC78] font-semibold uppercase tracking-wider whitespace-nowrap shrink-0">
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9BC78]" />

                  <span className="text-xs font-sans tracking-[0.35em] text-[#D9BC78] font-semibold uppercase">
                    {eyebrow}
                  </span>
                </div>
              </RevealTitle>

              {/* Main Title */}
              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-[#E8E1D5] tracking-tight leading-none">
                {editionTitle}
              </h2>

              {/* Event Meta Line */}
              <p className="text-[11px] sm:text-xs font-sans tracking-[0.18em] uppercase leading-relaxed text-[#AAA59B]">
                <span>{eventDate}</span>
                <span className="mx-2 text-[#D9BC78]">&bull;</span>
                <span>{venue}</span>
                <span className="mx-2 text-[#D9BC78]">&bull;</span>
                <span className="text-[#D9BC78] font-semibold">
                  {eventStatus}
                </span>
              </p>

              {/* Circular Countdown Timers */}
              <StaggerContainer
                staggerChildren={0.1}
                delayChildren={0.2}
                className="grid grid-cols-4 gap-2.5 sm:gap-4 py-3 max-w-[380px] sm:max-w-[430px]"
              >
                {[
                  { value: days, label: 'DAYS' },
                  { value: hours, label: 'HRS' },
                  { value: minutes, label: 'MINS' },
                  { value: seconds, label: 'SECS' },
                ].map((item) => (
                  <StaggerItem
                    key={item.label}
                    direction="scale"
                    className="w-[74px] h-[74px] sm:w-[88px] sm:h-[88px] aspect-square rounded-full border border-[#D9BC78]/40 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center shadow-lg transition-all duration-300 hover:border-[#D9BC78] hover:scale-105 shrink-0"
                  >
                    <span className="font-serif text-2xl sm:text-3xl text-[#E8E1D5] font-normal leading-none tracking-tight">
                      {String(item.value).padStart(2, '0')}
                    </span>

                    <span className="text-[8px] sm:text-[9.5px] font-sans text-[#D9BC78] tracking-[0.2em] uppercase mt-1 sm:mt-1.5 font-medium">
                      {item.label}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* 3 Paragraphs */}
              <div className="flex flex-col gap-3 text-xs sm:text-[15px] text-[#AAA59B] leading-relaxed font-sans">
                <p>{desc1}</p>
                <p>{desc2}</p>
                <p>{desc3}</p>
              </div>

              {/* 3 Value Cards: Discover, Engage, Connect */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-sans text-[#D9BC78] tracking-wider uppercase font-semibold mb-1">
                    &bull; DISCOVER
                  </div>

                  <p className="text-xs text-[#AAA59B] leading-relaxed font-sans">
                    Explore architectural products, materials and solutions
                    presented by participating manufacturing brands.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-sans text-[#D9BC78] tracking-wider uppercase font-semibold mb-1">
                    &bull; ENGAGE
                  </div>

                  <p className="text-xs text-[#AAA59B] leading-relaxed font-sans">
                    Interact directly with brand representatives and members
                    of the architecture and interior-design community.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-sans text-[#D9BC78] tracking-wider uppercase font-semibold mb-1">
                    &bull; CONNECT
                  </div>

                  <p className="text-xs text-[#AAA59B] leading-relaxed font-sans">
                    Build professional relationships and continue
                    conversations beyond the event.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
                {/* EXHIBIT WITH US */}
                <a
                  href={exhibitWithUs.link}
                  className="px-6 py-3.5 rounded-full border border-[#D9BC78]/60 bg-transparent hover:bg-[#D9BC78]/10 text-[#D9BC78] hover:text-[#E8E1D5] text-xs font-sans font-semibold tracking-wider uppercase transition-colors text-center"
                >
                  {exhibitWithUs.text}
                </a>

                {/* REQUEST AN INVITATION */}
                <a
                  href={requestInvitation.link}
                  className="px-6 py-3.5 rounded-full bg-[#D9BC78] hover:bg-[#C8AA64] text-black text-xs font-sans font-bold tracking-wider uppercase transition-colors text-center shadow-lg"
                >
                  {requestInvitation.text}
                </a>

                {/* DOWNLOAD E-BROCHURE */}
                <a
                  href={downloadBrochure.link}
                  download={
                    downloadBrochure.link.endsWith('.pdf') ? true : undefined
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/30 hover:border-[#D9BC78] text-[#E8E1D5] hover:text-[#D9BC78] text-xs font-sans font-semibold tracking-wider uppercase transition-colors text-center"
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
