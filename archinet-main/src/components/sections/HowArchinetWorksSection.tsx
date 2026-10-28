
'use client';

import React, { useRef, useState } from 'react';
import { Layers, Users, Handshake } from 'lucide-react';
import {
  RevealTitle,
  RevealUp,
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
    icon: <Layers className="h-5 w-5 text-[#D7B46A]" />,
    title: 'Brands Showcase Their Products',
    description:
      'A maximum of 20 participating manufacturing brands present their products, materials and solutions in a dedicated exhibition environment.',
    badge: '• MAX 20 BRANDS',
  },
  {
    number: '02',
    icon: <Users className="h-5 w-5 text-[#D7B46A]" />,
    title: 'Design Professionals Discover and Engage',
    description:
      'We invite 100+ principal architects, interior designers and decision-makers representing approximately 100 different firms to discover products and interact with participating brands.',
    badge: '• 100+ PRINCIPALS • 100 FIRMS',
  },
  {
    number: '03',
    icon: <Handshake className="h-5 w-5 text-[#D7B46A]" />,
    title: 'Conversations Create Opportunities',
    description:
      'The event provides a setting for direct discussions, product discovery, knowledge exchange and the development of professional relationships.',
    badge: '• ENDURING RELATIONSHIPS',
  },
];

export default function HowArchinetWorksSection({
  data,
}: HowArchinetWorksSectionProps) {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Dynamic fields from Metadata Master / API
  const eyebrow =
    getFieldValue(data, 'section_label', 'eyebrow', 'label') ||
    'THE ARCHITECTURE OF THE EVENT';

  const heading =
    getFieldValue(data, 'title', 'heading') || 'How Archinet Works';

  const subtitle =
    getFieldValue(data, 'subtitle', 'sub_heading', 'description') ||
    'A purposeful, three-stage progression engineered to spark material discovery, mutual insight and long-term project specifications.';

  // Support repeatable card JSON from Metadata Master
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

          return {
            number: card.number || String(idx + 1).padStart(2, '0'),
            icon: defaultStep.icon,
            title:
              card.title ||
              card.heading ||
              card.name ||
              defaultStep.title,
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

          return {
            number: defaultStep.number,
            icon: defaultStep.icon,
            title:
              getFieldValue(data, `${prefix}title`, `${prefix}heading`) ||
              defaultStep.title,
            description:
              getFieldValue(data, `${prefix}description`, `${prefix}desc`) ||
              defaultStep.description,
            badge:
              getFieldValue(data, `${prefix}badge`, `${prefix}tag`) ||
              defaultStep.badge,
          };
        });

  // Keep the active pagination dot in sync with mobile scrolling
  const handleCardsScroll = () => {
    const container = cardsContainerRef.current;

    if (!container) return;

    const firstCard =
      container.querySelector<HTMLElement>('[data-step-card]');

    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const styles = window.getComputedStyle(container);
    const gap = parseFloat(styles.columnGap) || 0;
    const stepWidth = cardWidth + gap;

    if (stepWidth <= 0) return;

    const index = Math.round(container.scrollLeft / stepWidth);

    setActiveStepIndex(
      Math.max(0, Math.min(index, steps.length - 1))
    );
  };

  // Navigate using the mobile pagination dots
  const goToStep = (index: number) => {
    const container = cardsContainerRef.current;

    if (!container) return;

    const firstCard =
      container.querySelector<HTMLElement>('[data-step-card]');

    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const styles = window.getComputedStyle(container);
    const gap = parseFloat(styles.columnGap) || 0;

    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth',
    });

    setActiveStepIndex(index);
  };

  return (
    <section
      id="how-it-works"
      className="relative w-full overflow-hidden border-b border-[rgba(255,255,255,0.06)] bg-black px-6 py-20 font-sans text-[#AAA59B] scroll-mt-16 lg:px-12 lg:py-32"
    >
      <div className="mx-auto flex max-w-7xl flex-col">
        {/* Eyebrow */}
        <RevealTitle>
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D7B46A]/40" />

            <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#D7B46A]">
              {eyebrow}
            </span>

            <span className="h-px w-8 bg-[#D7B46A]/40" />
          </div>
        </RevealTitle>

        {/* Heading */}
        <RevealTitle>
          <h2 className="mb-3 text-center font-serif text-3xl font-normal tracking-tight text-[#EEEAE2] sm:text-5xl lg:text-6xl">
            {heading}
          </h2>
        </RevealTitle>

        {/* Subtitle */}
        <RevealUp delay={0.1}>
          <p className="mx-auto mb-14 max-w-2xl text-center font-sans text-xs font-normal leading-relaxed text-[#AAA59B] sm:mb-20 sm:text-sm">
            {subtitle}
          </p>
        </RevealUp>

        {/* Cards: mobile carousel and desktop grid */}
        <div className="relative w-full">
          {/* Connecting line on desktop and tablet */}
          <div
            className="pointer-events-none absolute left-[15%] right-[15%] top-[52px] z-0 hidden h-px bg-gradient-to-r from-[#D7B46A]/20 via-[#D7B46A]/50 to-[#D7B46A]/20 md:block"
            aria-hidden="true"
          />

          <div
            ref={cardsContainerRef}
            onScroll={handleCardsScroll}
            className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-[9vw] pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0"
          >
            {steps.map((step) => (
              <StaggerItem
                key={step.number}
                direction="up"
                data-step-card
                className="group relative flex min-h-[340px] w-[82vw] max-w-[360px] shrink-0 snap-center flex-col justify-between rounded-2xl border border-white/10 bg-[#0c0c0c] p-7 shadow-2xl transition-colors duration-300 hover:border-[#D7B46A]/40 sm:w-auto sm:max-w-none sm:shrink sm:p-8 md:min-h-[340px] md:snap-align-none"
              >
                {/* Number and icon */}
                <div className="flex w-full items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D7B46A]/40 bg-[#070707] font-sans text-xs font-semibold text-[#D7B46A] shadow-md transition-colors group-hover:border-[#D7B46A]">
                    {step.number}
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#070707] shadow-md transition-colors group-hover:border-[#D7B46A]/40">
                    {step.icon}
                  </div>
                </div>

                {/* Card content */}
                <div className="my-6">
                  <h3 className="mb-3 font-serif text-xl font-normal leading-snug text-[#EEEAE2] transition-colors group-hover:text-[#D7B46A] sm:text-2xl">
                    {step.title}
                  </h3>

                  <p className="font-sans text-xs leading-relaxed text-[#AAA59B] sm:text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Bottom badge */}
                <div className="pt-2">
                  <span className="inline-flex items-center rounded-full border border-[#D7B46A]/30 bg-[#D7B46A]/10 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-[#D7B46A]">
                    {step.badge}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </div>

          {/* Matching pagination dots: mobile only */}
          {steps.length > 1 && (
            <div
              className="mt-5 flex items-center justify-center gap-2 md:hidden"
              aria-label="How Archinet Works pagination"
            >
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => goToStep(index)}
                  aria-label={`Go to step ${index + 1}`}
                  aria-current={
                    activeStepIndex === index ? 'true' : undefined
                  }
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeStepIndex === index
                      ? 'w-5 bg-[#D7B46A]'
                      : 'w-1.5 bg-white/25 hover:bg-[#D7B46A]/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
