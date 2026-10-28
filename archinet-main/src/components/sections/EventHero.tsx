
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
      className="relative w-full overflow-hidden scroll-mt-16 border-b border-white/[0.06] bg-black font-sans text-[#AAA59B]"
    >
      <div id="14th-edition" className="absolute left-0 top-0" />

      <div className="mx-auto max-w-[1600px] px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14 xl:px-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8 xl:gap-10">

          {/* LEFT: FULL-WIDTH EVENT IMAGE */}
          <RevealLeft className="relative w-full min-w-0 lg:col-span-6">
            <div className="relative min-h-[420px] w-full aspect-[0.95/1] overflow-hidden border border-white/10 bg-[#0a0909] shadow-2xl sm:min-h-[540px] lg:min-h-[660px] lg:aspect-auto">
              <img
                src={backgroundImage}
                alt={editionTitle}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              {/* Bottom venue and date overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-3 border border-[rgba(215,180,107,0.3)] bg-black/85 p-3 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:gap-4 sm:rounded-xl sm:p-4">
                <div className="flex min-w-0 flex-col">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#EEEAE2] sm:text-sm">
                    {venue}
                  </span>

                  <span className="mt-1 block text-[10px] leading-snug text-[#AAA59B] sm:text-[11px]">
                    Exclusive 1-Day Curated Gathering for Architecture &amp;
                    Interior Design Decision-Makers
                  </span>
                </div>

                <span className="shrink-0 whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-[#D7B46B] sm:text-xs">
                  {eventDate}
                </span>
              </div>
            </div>
          </RevealLeft>

          {/* RIGHT: EVENT INFORMATION */}
          <RevealRight className="relative flex min-w-0 flex-col justify-center lg:col-span-6">
            <span
              className="pointer-events-none absolute -bottom-8 -right-4 z-0 select-none font-serif text-[200px] font-extrabold leading-none text-white/[0.025] sm:text-[260px] lg:text-[300px]"
              aria-hidden="true"
            >
              14
            </span>

            <div className="relative z-10 flex flex-col gap-4 sm:gap-5">

              {/* Eyebrow */}
              <RevealTitle>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D7B46B]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D7B46B] sm:text-xs">
                    {eyebrow}
                  </span>
                </div>
              </RevealTitle>

              {/* Edition title */}
              <h2 className="whitespace-normal font-serif text-5xl font-normal leading-[1.05] tracking-tight text-[#EEEAE2] sm:text-6xl xl:text-7xl">
                {editionTitle}
              </h2>

              {/* Date, venue and event status */}
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase leading-relaxed tracking-[0.12em] text-[#AAA59B] sm:text-[11px] sm:tracking-[0.15em]">
                <span>{eventDate}</span>
                <span className="text-[#D7B46B]">&bull;</span>
                <span>{venue}</span>
                <span className="text-[#D7B46B]">&bull;</span>
                <span className="font-semibold text-[#D7B46B]">
                  {eventStatus}
                </span>
              </p>

              {/* Countdown */}
              <StaggerContainer
                staggerChildren={0.1}
                delayChildren={0.2}
                className="grid max-w-[410px] grid-cols-4 gap-2 py-1 sm:gap-3 sm:py-2"
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
                    className="flex aspect-square w-full max-w-[84px] flex-col items-center justify-center rounded-full border border-[rgba(215,180,107,0.4)] bg-black/60 text-center shadow-lg transition-colors duration-300 hover:border-[#D7B46B]"
                  >
                    <span className="font-serif text-xl font-normal leading-none tracking-tight text-[#EEEAE2] sm:text-2xl lg:text-3xl">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="mt-1 text-[8px] font-medium uppercase tracking-[0.15em] text-[#D7B46B] sm:mt-1.5 sm:text-[9px]">
                      {item.label}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Descriptions */}
              <div className="flex flex-col gap-2.5 text-[13px] leading-[1.65] text-[#AAA59B] sm:text-sm lg:text-[14px]">
                <p>{desc1}</p>
                <p>{desc2}</p>
                <p>{desc3}</p>
              </div>

              {/* Discover, Engage and Connect */}
              <div className="my-1 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3 transition-colors duration-300 hover:border-[rgba(215,180,107,0.4)] sm:p-3.5">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#D7B46B] sm:text-[11px]">
                    &bull; DISCOVER
                  </div>
                  <p className="text-xs leading-relaxed text-[#AAA59B]">
                    Explore architectural products, materials and solutions
                    presented by participating manufacturing brands.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3 transition-colors duration-300 hover:border-[rgba(215,180,107,0.4)] sm:p-3.5">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#D7B46B] sm:text-[11px]">
                    &bull; ENGAGE
                  </div>
                  <p className="text-xs leading-relaxed text-[#AAA59B]">
                    Interact directly with brand representatives and members
                    of the architecture and interior-design community.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3 transition-colors duration-300 hover:border-[rgba(215,180,107,0.4)] sm:p-3.5">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#D7B46B] sm:text-[11px]">
                    &bull; CONNECT
                  </div>
                  <p className="text-xs leading-relaxed text-[#AAA59B]">
                    Build professional relationships and continue
                    conversations beyond the event.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col flex-wrap items-stretch gap-3 pt-1 sm:flex-row sm:items-center">
                <a
                  href={exhibitWithUs.link}
                  className="rounded-full border border-[rgba(215,180,107,0.6)] bg-transparent px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#D7B46B] transition-colors hover:bg-[rgba(215,180,107,0.1)] hover:text-[#EEEAE2] sm:px-5"
                >
                  {exhibitWithUs.text}
                </a>

                <a
                  href={requestInvitation.link}
                  className="rounded-full bg-[#D7B46B] px-5 py-3 text-center text-xs font-bold uppercase tracking-wider text-black shadow-lg transition-colors hover:bg-[#C4A05A] sm:px-5"
                >
                  {requestInvitation.text}
                </a>

                <a
                  href={downloadBrochure.link}
                  download={
                    downloadBrochure.link.endsWith('.pdf') ? true : undefined
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#EEEAE2] transition-colors hover:border-[#D7B46B] hover:text-[#D7B46B] sm:px-5"
                >
                  <Download className="h-4 w-4" />
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
