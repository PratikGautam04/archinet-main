
'use client';

import React from 'react';
import { Layers, Users, Handshake } from 'lucide-react';
import {
  RevealTitle,
  RevealUp,
  StaggerContainer,
  StaggerItem,
} from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import { getField, getFieldValue, getCardJsonData } from '../../utils/metadata';

interface HowArchinetWorksSectionProps {
  data?: MetadataField[];
}

interface StepItem {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
}

const DEFAULT_STEPS: StepItem[] = [
  {
    number: '01',
    icon: <Layers className="w-5 h-5 text-[#D9BC78]" />,
    title: 'Brands Showcase Their Products',
    description:
      'A maximum of 20 participating manufacturing brands present their products, materials and solutions in a dedicated exhibition environment.',
    badge: '• MAX 20 BRANDS',
  },
  {
    number: '02',
    icon: <Users className="w-5 h-5 text-[#D9BC78]" />,
    title: 'Design Professionals Discover and Engage',
    description:
      'We invite 100+ principal architects, interior designers and decision-makers representing approximately 100 different firms to discover products and interact with participating brands.',
    badge: '• 100+ PRINCIPALS • 100 FIRMS',
  },
  {
    number: '03',
    icon: <Handshake className="w-5 h-5 text-[#D9BC78]" />,
    title: 'Conversations Create Opportunities',
    description:
      'The event provides a setting for direct discussions, product discovery, knowledge exchange and the development of professional relationships.',
    badge: '• ENDURING RELATIONSHIPS',
  },
];

export default function HowArchinetWorksSection({
  data,
}: HowArchinetWorksSectionProps) {
  // Dynamic fields from Metadata Master / API
  const eyebrow =
    getFieldValue(data, 'section_label', 'eyebrow', 'label') ||
    'THE ARCHITECTURE OF THE EVENT';

  const heading =
    getFieldValue(data, 'title', 'heading') || 'How Archinet Works';

  const subtitle =
    getFieldValue(data, 'subtitle', 'sub_heading', 'description') ||
    'A purposeful, three-stage progression engineered to spark material discovery, mutual insight and long-term project specifications.';

  // Support repeatable cardJson if provided in Metadata Master
  const cardList = getCardJsonData<Record<string, string>>(
    getField(
      data,
      'experience_cards',
      'experience_cards ',
      'steps',
      'step_list',
      'cards',
      'how_it_works_cards',
      'stages'
    )
  );

  const steps: StepItem[] =
    cardList.length > 0
      ? cardList.map((card, idx) => {
          const defaultStep = DEFAULT_STEPS[idx % DEFAULT_STEPS.length];
          const num = String(idx + 1).padStart(2, '0');

          return {
            number: card.number || num,
            icon: defaultStep.icon,
            title: card.title || card.heading || card.name || defaultStep.title,
            description:
              card.description ||
              card.desc ||
              card.text ||
              defaultStep.description,
            badge: card.badge || card.tag || defaultStep.badge,
          };
        })
      : DEFAULT_STEPS.map((defaultStep, idx) => {
          const prefix = `step_${idx + 1}_`;

          const title =
            getFieldValue(data, `${prefix}title`, `${prefix}heading`) ||
            defaultStep.title;

          const description =
            getFieldValue(data, `${prefix}description`, `${prefix}desc`) ||
            defaultStep.description;

          const badge =
            getFieldValue(data, `${prefix}badge`, `${prefix}tag`) ||
            defaultStep.badge;

          return {
            number: defaultStep.number,
            icon: defaultStep.icon,
            title,
            description,
            badge,
          };
        });

  return (
    <section
      id="how-it-works"
      className="relative w-full py-20 lg:py-32 px-6 lg:px-12 bg-black text-[#AAA59B] font-sans overflow-hidden border-b border-[rgba(255,255,255,0.06)] scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Eyebrow */}
        <RevealTitle>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#D9BC78]/40" />

            <span className="text-xs font-sans text-[#D9BC78] tracking-[0.25em] uppercase font-semibold">
              {eyebrow}
            </span>

            <span className="w-8 h-[1px] bg-[#D9BC78]/40" />
          </div>
        </RevealTitle>

        {/* Title */}
        <RevealTitle>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#E8E1D5] font-normal text-center tracking-tight mb-3">
            {heading}
          </h2>
        </RevealTitle>

        {/* Subtitle */}
        <RevealUp delay={0.1}>
          <p className="text-xs sm:text-sm font-sans text-[#AAA59B] text-center max-w-2xl mx-auto mb-14 sm:mb-20 leading-relaxed">
            {subtitle}
          </p>
        </RevealUp>

        {/* 3 Connected Cards Grid */}
        <div className="relative w-full">
          {/* Connecting Line across circles on Desktop / Tablet */}
          <div
            className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-[#D9BC78]/20 via-[#D9BC78]/50 to-[#D9BC78]/20 pointer-events-none z-0"
            aria-hidden="true"
          />

          <StaggerContainer
            staggerChildren={0.15}
            delayChildren={0.2}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10"
          >
            {steps.map((step) => (
              <StaggerItem
                key={step.number}
                direction="up"
                className="p-7 sm:p-8 rounded-2xl bg-[#0c0c0c] border border-white/10 hover:border-[#D9BC78]/40 transition-colors duration-300 relative flex flex-col justify-between min-h-[340px] shadow-2xl group"
              >
                {/* Top Row: Numbered Circle (Left) & Icon Circle (Right) */}
                <div className="flex items-center justify-between w-full">
                  {/* Number Circle */}
                  <div className="w-11 h-11 rounded-full border border-[#D9BC78]/40 bg-[#070707] flex items-center justify-center font-sans text-xs font-semibold text-[#D9BC78] shadow-md group-hover:border-[#D9BC78] transition-colors">
                    {step.number}
                  </div>

                  {/* Icon Circle */}
                  <div className="w-11 h-11 rounded-full border border-white/10 bg-[#070707] flex items-center justify-center shadow-md group-hover:border-[#D9BC78]/40 transition-colors">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="my-6">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#E8E1D5] font-normal leading-snug mb-3 group-hover:text-[#D9BC78] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#AAA59B] leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Gold Badge */}
                <div className="pt-2">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#D9BC78]/10 border border-[#D9BC78]/30 text-[#D9BC78] text-[10px] font-sans tracking-wider uppercase font-semibold">
                    {step.badge}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
