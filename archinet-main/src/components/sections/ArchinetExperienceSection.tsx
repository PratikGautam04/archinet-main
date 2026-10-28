
'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import {
  RevealTitle,
  RevealUp,
} from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import {
  getField,
  getFieldValue,
  getCardJsonData,
} from '../../utils/metadata';

interface ArchinetExperienceSectionProps {
  data?: MetadataField[];
}

interface Pillar {
  number: string;
  badge: string;
  verticalTitle: string;
  title: string;
  description: string;
  image: string;
}

const DEFAULT_PILLARS: Pillar[] = [
  {
    number: '01',
    badge: '01 • PRODUCT SHOWCASES',
    verticalTitle: 'PRODUCT SHOWCASES',
    title: 'Product Showcases',
    description:
      'Participating manufacturing brands present their architectural products, materials and solutions to the invited design community.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    number: '02',
    badge: '02 • DIRECT BRAND INTERACTION',
    verticalTitle: 'DIRECT BRAND INTERACTION',
    title: 'Direct Brand Interaction',
    description:
      'Architects and designers can speak directly with brand representatives, ask questions and learn about products and their applications.',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    number: '03',
    badge: '03 • CURATED INDUSTRY NETWORKING',
    verticalTitle: 'CURATED INDUSTRY NETWORKING',
    title: 'Curated Industry Networking',
    description:
      'Connect with principal architects, interior designers and decision-makers from established architecture and design firms.',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
  },
  {
    number: '04',
    badge: '04 • PROFESSIONAL RELATIONSHIPS',
    verticalTitle: 'PROFESSIONAL RELATIONSHIPS',
    title: 'Professional Relationships',
    description:
      'Create opportunities for conversations, introductions and potential business relationships that can continue beyond the event.',
    image:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function ArchinetExperienceSection({
  data,
}: ArchinetExperienceSectionProps) {
  const [activePillar, setActivePillar] = useState<number>(0);

  // Section content from Metadata Master / API
  const eyebrow =
    getFieldValue(data, 'section_label', 'eyebrow', 'label') ||
    'THE ARCHINET EXPERIENCE';

  const heading =
    getFieldValue(data, 'title', 'heading') ||
    'Four Pillars. One Focused Environment.';

  const subtitle =
    getFieldValue(data, 'subtitle', 'sub_heading', 'description') ||
    'Where material innovation meets specification: purposeful, high-yield dialogue.';

  // Repeatable card data from Metadata Master
  const cardList = getCardJsonData<Record<string, string>>(
    getField(
      data,
      'pillars',
      'pillar_list',
      'cards',
      'experience_cards',
      'experience',
      'four_pillars'
    )
  );

  const pillars: Pillar[] =
    cardList.length > 0
      ? cardList.map((card, idx) => {
          const defaultPillar =
            DEFAULT_PILLARS[idx % DEFAULT_PILLARS.length];

          const num = String(idx + 1).padStart(2, '0');

          const title =
            card.title ||
            card.heading ||
            card.name ||
            defaultPillar.title;

          return {
            number: card.number || num,
            badge:
              card.badge ||
              card.tag ||
              `${num} • ${title.toUpperCase()}`,
            verticalTitle:
              card.vertical_title ||
              card.verticalTitle ||
              title.toUpperCase(),
            title,
            description:
              card.description ||
              card.desc ||
              card.text ||
              defaultPillar.description,
            image:
              card.image ||
              card.url ||
              card.src ||
              defaultPillar.image,
          };
        })
      : DEFAULT_PILLARS.map((defaultPillar, idx) => {
          const prefix = `pillar_${idx + 1}_`;

          const title =
            getFieldValue(data, `${prefix}title`, `${prefix}heading`) ||
            defaultPillar.title;

          const description =
            getFieldValue(
              data,
              `${prefix}description`,
              `${prefix}desc`
            ) || defaultPillar.description;

          const badge =
            getFieldValue(data, `${prefix}badge`, `${prefix}tag`) ||
            defaultPillar.badge;

          const verticalTitle =
            getFieldValue(data, `${prefix}vertical_title`) ||
            defaultPillar.verticalTitle;

          const image =
            getFieldValue(data, `${prefix}image`) ||
            defaultPillar.image;

          return {
            number: defaultPillar.number,
            badge,
            verticalTitle,
            title,
            description,
            image,
          };
        });

  // Navigate to the Contact section without changing the active card
  const handleContactClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden border-b border-[rgba(255,255,255,0.06)] bg-black px-5 py-16 font-sans text-[#AAA59B] scroll-mt-16 sm:px-6 sm:py-20 lg:px-12 lg:py-32"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        {/* Eyebrow */}
        <RevealTitle>
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[rgba(215,180,107,0.4)]" />

            <span
              className="font-sans text-[16px] font-normal leading-6 tracking-normal text-[#D7B46A]"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 400,
                letterSpacing: 'normal',
              }}
            >
              {eyebrow}
            </span>

            <span className="h-px w-8 bg-[rgba(215,180,107,0.4)]" />
          </div>
        </RevealTitle>

        {/* Main Heading */}
        <RevealUp delay={0.1}>
          <h2 className="mb-3 text-center font-serif text-3xl font-normal tracking-tight text-[#EEEAE2] sm:text-5xl lg:text-6xl">
            {heading}
          </h2>
        </RevealUp>

        {/* Subtitle */}
        <RevealUp delay={0.15}>
          <p className="mx-auto mb-10 max-w-2xl text-center font-sans text-xs leading-relaxed text-[#AAA59B] sm:mb-14 sm:text-sm">
            {subtitle}
          </p>
        </RevealUp>

        {/* Four Interactive Expandable Cards */}
        <div className="flex h-auto w-full flex-col gap-4 lg:h-[580px] lg:flex-row">
          {pillars.map((pillar, idx) => {
            const isExpanded = activePillar === idx;

            return (
              <div
                key={pillar.number}
                onClick={() => setActivePillar(idx)}
                onKeyDown={(event) => {
                  if (event.target !== event.currentTarget) return;

                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActivePillar(idx);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={`${pillar.title}${isExpanded ? ', expanded' : ', expand card'}`}
                className={`group relative cursor-pointer select-none overflow-hidden rounded-2xl border transition-all duration-500 ease-in-out ${
                  isExpanded
                    ? 'min-h-[460px] border-[rgba(215,180,107,0.6)] shadow-[0_0_30px_rgba(215,180,107,0.15)] sm:min-h-[500px] lg:min-h-full lg:flex-[3.5]'
                    : 'min-h-[88px] border-white/10 hover:border-[rgba(215,180,107,0.4)] lg:min-h-full lg:flex-1'
                }`}
              >
                {/* Background Image */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
                    isExpanded
                      ? 'scale-105 brightness-100'
                      : 'grayscale brightness-[0.35] group-hover:brightness-[0.45]'
                  }`}
                  style={{
                    backgroundImage: `url('${pillar.image}')`,
                  }}
                />

                {/* Image Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isExpanded
                      ? 'bg-gradient-to-t from-black/80 via-black/20 to-black/30'
                      : 'bg-black/40'
                  }`}
                />

                {isExpanded ? (
                  /* Expanded Card */
                  <div className="relative z-10 flex h-full min-h-[460px] w-full flex-col justify-between gap-6 p-5 sm:min-h-[500px] sm:p-7 lg:min-h-full lg:p-7">
                    {/* Upper Gold Badge */}
                    <div className="self-start rounded-full bg-[#D7B46B] px-3.5 py-1.5 text-[10px] font-sans font-bold uppercase tracking-wider text-black shadow-lg">
                      {pillar.badge}
                    </div>

                    {/* Bottom Description Card */}
                    <div className="mt-auto flex w-full items-center justify-between gap-3 rounded-2xl border border-black/5 bg-[#FAF7F2] p-4 text-black shadow-2xl transition-transform duration-300 sm:gap-4 sm:p-6">
                      <p className="min-w-0 flex-1 font-sans text-xs font-normal leading-[1.6] text-[#4A4A4A] sm:text-sm">
                        {pillar.description}
                      </p>

                      {/* Contact Arrow Button */}
                      <button
                        type="button"
                        onClick={handleContactClick}
                        aria-label={`Contact us about ${pillar.title}`}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D7B46B] shadow-md transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D7B46B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2] sm:h-11 sm:w-11"
                      >
                        <ArrowUpRight className="h-5 w-5 stroke-[2.5] text-black" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Collapsed Card */
                  <div className="relative z-10 flex h-full w-full flex-row items-center justify-between p-5 lg:flex-col lg:py-8 lg:px-2">
                    {/* Number */}
                    <span className="font-sans text-xs font-medium tracking-wider text-[#D7B46B] sm:text-sm">
                      {pillar.number}
                    </span>

                    {/* Horizontal Title on Mobile */}
                    <span className="block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#AAA59B] lg:hidden sm:text-sm">
                      {pillar.verticalTitle}
                    </span>

                    {/* Vertical Title on Desktop */}
                    <span className="hidden whitespace-nowrap font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-[#AAA59B] transition-colors group-hover:text-[#EEEAE2] lg:block [writing-mode:vertical-rl] rotate-180">
                      {pillar.verticalTitle}
                    </span>

                    {/* Arrow */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/40 text-[#AAA59B] transition-colors group-hover:border-[#D7B46B] group-hover:text-[#D7B46B]">
                      <ArrowRight className="block h-4 w-4 lg:hidden" />
                      <ArrowUpRight className="hidden h-4 w-4 lg:block" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Supporting Description */}
        <div className="mt-12 flex w-full justify-center sm:mt-16 lg:mt-20">
          <p className="w-full max-w-[672px] text-center font-sans text-sm font-normal leading-[22.75px] text-[#AAA59B]">
            From curated product showcases to high-level principal dialogues,
            Archinet creates the definitive setting where architectural vision
            transforms into specified reality.
          </p>
        </div>
      </div>
    </section>
  );
}
