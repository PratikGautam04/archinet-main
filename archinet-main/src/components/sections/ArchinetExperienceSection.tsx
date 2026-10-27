'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import {
  RevealTitle,
  RevealUp,
} from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import { getField, getFieldValue, getCardJsonData } from '../../utils/metadata';

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
  // Start with Pillar 02 expanded as approved in reference
  const [activePillar, setActivePillar] = useState<number>(1);

  // Dynamic fields from Metadata Master / API
  const eyebrow =
    getFieldValue(data, 'section_label', 'eyebrow', 'label') ||
    'THE ARCHINET EXPERIENCE';
  const heading =
    getFieldValue(data, 'title', 'heading') ||
    'Four Pillars. One Focused Environment.';
  const subtitle =
    getFieldValue(data, 'subtitle', 'sub_heading', 'description') ||
    'Where material innovation meets specification: purposeful, high-yield dialogue.';

  // Support repeatable cardJson if provided in Metadata Master
  const cardList = getCardJsonData<Record<string, string>>(
    getField(data, 'pillars', 'pillar_list', 'cards', 'experience_cards', 'experience', 'four_pillars')
  );

  const pillars: Pillar[] =
    cardList.length > 0
      ? cardList.map((card, idx) => {
          const defaultPillar = DEFAULT_PILLARS[idx % DEFAULT_PILLARS.length];
          const num = String(idx + 1).padStart(2, '0');
          const title = card.title || card.heading || card.name || defaultPillar.title;
          return {
            number: card.number || num,
            badge: card.badge || card.tag || `${num} • ${title.toUpperCase()}`,
            verticalTitle: card.vertical_title || card.verticalTitle || title.toUpperCase(),
            title,
            description: card.description || card.desc || card.text || defaultPillar.description,
            image: card.image || card.url || card.src || defaultPillar.image,
          };
        })
      : DEFAULT_PILLARS.map((defaultPillar, idx) => {
          const prefix = `pillar_${idx + 1}_`;

          const title =
            getFieldValue(data, `${prefix}title`, `${prefix}heading`) ||
            defaultPillar.title;

          const description =
            getFieldValue(data, `${prefix}description`, `${prefix}desc`) ||
            defaultPillar.description;

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

  return (
    <section
      id="experience"
      className="relative w-full py-20 lg:py-32 px-6 lg:px-12 bg-black text-[#AAA59B] font-sans overflow-hidden border-b border-[rgba(255,255,255,0.06)] scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <RevealTitle>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#f0ab44]/40" />
            <span className="text-xs font-mono text-[#f0ab44] tracking-[0.25em] uppercase font-semibold">
              {eyebrow}
            </span>
            <span className="w-8 h-[1px] bg-[#f0ab44]/40" />
          </div>
        </RevealTitle>

        {/* Heading */}
        <RevealUp delay={0.1}>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal text-center tracking-tight mb-3">
            {heading}
          </h2>
        </RevealUp>

        {/* Subtitle */}
        <RevealUp delay={0.15}>
          <p className="text-xs sm:text-sm font-sans text-[#AAA59B] text-center max-w-2xl mx-auto mb-10 sm:mb-14 leading-relaxed">
            {subtitle}
          </p>
        </RevealUp>

        {/* 4 Interactive Expandable Cards */}
        <div className="w-full flex flex-col lg:flex-row gap-4 h-auto lg:h-[580px]">
          {pillars.map((pillar, idx) => {
            const isExpanded = activePillar === idx;

            return (
              <div
                key={pillar.number}
                onClick={() => setActivePillar(idx)}
                className={`relative rounded-2xl overflow-hidden border transition-all duration-500 ease-in-out cursor-pointer select-none group ${
                  isExpanded
                    ? 'border-[#f0ab44]/60 shadow-[0_0_30px_rgba(240,171,68,0.15)] min-h-[460px] sm:min-h-[500px] lg:min-h-full lg:flex-[3.5]'
                    : 'border-white/10 hover:border-white/25 min-h-[88px] lg:min-h-full lg:flex-1'
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

                {/* Subtle vignette gradient */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isExpanded
                      ? 'bg-gradient-to-t from-black/80 via-black/20 to-black/30'
                      : 'bg-black/40'
                  }`}
                />

                {/* EXPANDED CONTENT */}
                {isExpanded ? (
                  <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-7">
                    {/* Top Gold Badge */}
                    <div className="self-start px-3.5 py-1.5 rounded-full bg-[#f0ab44] text-black text-[10px] font-mono font-bold tracking-wider uppercase shadow-lg">
                      {pillar.badge}
                    </div>

                    {/* Bottom Cream/Ivory Floating Card */}
                    <div className="w-full p-5 sm:p-6 rounded-2xl bg-[#faf7f2] text-black shadow-2xl flex items-center justify-between gap-4 border border-black/5 transition-transform duration-300">
                      <div className="flex flex-col">
                        <h3 className="font-serif text-xl sm:text-2xl text-[#1a1a1a] font-medium tracking-tight mb-1.5">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#4a4a4a] leading-relaxed max-w-xl font-sans">
                          {pillar.description}
                        </p>
                      </div>

                      {/* Circular Gold Button with Up-Right Arrow */}
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f0ab44] flex items-center justify-center shrink-0 shadow-md">
                        <ArrowUpRight className="w-5 h-5 text-black stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* COLLAPSED CONTENT */
                  <div className="relative z-10 w-full h-full flex flex-row lg:flex-col items-center justify-between p-5 lg:py-8 lg:px-2">
                    {/* Number */}
                    <span className="text-xs sm:text-sm font-mono text-[#f0ab44] font-medium tracking-wider">
                      {pillar.number}
                    </span>

                    {/* Title: Horizontal on mobile/tablet, Vertical on Desktop */}
                    <span className="block lg:hidden text-xs sm:text-sm font-mono tracking-[0.2em] text-white/80 uppercase font-semibold">
                      {pillar.verticalTitle}
                    </span>
                    <span className="hidden lg:block [writing-mode:vertical-rl] rotate-180 uppercase tracking-[0.25em] text-[11px] font-mono text-white/60 group-hover:text-white/90 transition-colors font-semibold whitespace-nowrap">
                      {pillar.verticalTitle}
                    </span>

                    {/* Arrow in Circle */}
                    <div className="w-8 h-8 rounded-full border border-white/20 bg-black/40 flex items-center justify-center text-white/60 group-hover:border-[#f0ab44] group-hover:text-[#f0ab44] transition-colors shrink-0">
                      <ArrowRight className="w-4 h-4 block lg:hidden" />
                      <ArrowUpRight className="w-4 h-4 hidden lg:block" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
