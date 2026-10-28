
'use client';

import React, { useRef, useState } from 'react';
import {
  RevealTitle,
  RevealUp,
  StaggerItem,
} from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import { getField, getFieldValue, getCardJsonData } from '../../utils/metadata';

interface WhoWeInviteSectionProps {
  data?: MetadataField[];
}

interface AttendeeCard {
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  highlightTitle?: boolean;
}

const DEFAULT_ATTENDEE_CARDS: AttendeeCard[] = [
  {
    number: '01',
    category: 'ARCHITECTURE LEADERSHIP',
    title: 'Principal Architects',
    description:
      'Visionaries and leaders heading established architectural practices, driving landmark masterplans and key built-environment commissions.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    highlightTitle: true,
  },
  {
    number: '02',
    category: 'PRACTICE OWNERSHIP',
    title: 'Architecture Firm Owners & Partners',
    description:
      'Founders, co-owners and managing partners governing firm expansion, design philosophy and practice-wide specification standards.',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    highlightTitle: false,
  },
  {
    number: '03',
    category: 'INTERIOR DIRECTION',
    title: 'Principal Interior Designers',
    description:
      'Lead practitioners orchestrating bespoke luxury residential, flagship commercial and premier hospitality interior concepts.',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    highlightTitle: true,
  },
  {
    number: '04',
    category: 'STUDIO PRINCIPALS',
    title: 'Interior-Design Firm Owners & Partners',
    description:
      'Studio owners and senior partners managing high-volume interior pipelines and client portfolios across India.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    highlightTitle: false,
  },
  {
    number: '05',
    category: 'SPECIFICATION & VETTING',
    title: 'Design Directors & Decision-Makers',
    description:
      'Senior design directors who evaluate material integrity, conduct technical diligence and provide final project sign-offs.',
    image:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
    highlightTitle: true,
  },
  {
    number: '06',
    category: 'STRATEGIC PROCUREMENT',
    title: 'Builders & Developers — Procurement and Purchase Heads',
    description:
      'Heads of procurement, commercial buying and strategic sourcing steering bulk material specifications for major developments.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    highlightTitle: false,
  },
];

export default function WhoWeInviteSection({
  data,
}: WhoWeInviteSectionProps) {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Dynamic section content
  const eyebrow =
    getFieldValue(data, 'section_label', 'eyebrow', 'label') ||
    'ATTENDEE PROFILE';

  const heading = getFieldValue(data, 'title', 'heading');

  const subtitle =
    getFieldValue(data, 'subtitle', 'sub_heading', 'description') ||
    'Archinet is an invitation-only gathering engineered specifically for key decision-makers who evaluate, specify and approve building materials and interior solutions.';

  // Dynamic card data from Metadata Master / API
  const cardList = getCardJsonData<Record<string, string>>(
    getField(
      data,
      'attendee_cards',
      'cards',
      'profiles',
      'invite_cards',
      'attendees',
      'who_we_invite_cards'
    )
  );

  const attendeeCards: AttendeeCard[] =
    cardList.length > 0
      ? cardList.map((card, idx) => {
          const defaultCard =
            DEFAULT_ATTENDEE_CARDS[idx % DEFAULT_ATTENDEE_CARDS.length];

          return {
            number: card.number || String(idx + 1).padStart(2, '0'),
            category:
              card.category ||
              card.label ||
              card.role ||
              defaultCard.category,
            title:
              card.title ||
              card.name ||
              card.heading ||
              defaultCard.title,
            description:
              card.description ||
              card.desc ||
              card.text ||
              defaultCard.description,
            image:
              card.image ||
              card.url ||
              card.src ||
              defaultCard.image,
            highlightTitle: idx % 2 === 0,
          };
        })
      : DEFAULT_ATTENDEE_CARDS.map((defaultCard, idx) => {
          const prefix = `card_${idx + 1}_`;

          const title =
            getFieldValue(data, `${prefix}title`, `${prefix}name`) ||
            defaultCard.title;

          const category =
            getFieldValue(data, `${prefix}category`, `${prefix}label`) ||
            defaultCard.category;

          const description =
            getFieldValue(
              data,
              `${prefix}description`,
              `${prefix}desc`
            ) || defaultCard.description;

          const image =
            getFieldValue(data, `${prefix}image`) || defaultCard.image;

          return {
            number: defaultCard.number,
            category,
            title,
            description,
            image,
            highlightTitle: defaultCard.highlightTitle,
          };
        });

  // Update the active pagination dot while swiping on mobile
  const handleCardsScroll = () => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const firstCard =
      container.querySelector<HTMLElement>('[data-attendee-card]');

    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 16;
    const step = cardWidth + gap;

    const index = Math.round(container.scrollLeft / step);

    setActiveCardIndex(
      Math.max(0, Math.min(index, attendeeCards.length - 1))
    );
  };

  // Navigate using pagination dots
  const goToCard = (index: number) => {
    const container = cardsContainerRef.current;
    if (!container) return;

    const firstCard =
      container.querySelector<HTMLElement>('[data-attendee-card]');

    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 16;

    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth',
    });

    setActiveCardIndex(index);
  };

  return (
    <section
      id="who-we-invite"
      className="relative w-full overflow-hidden border-b border-[rgba(255,255,255,0.06)] bg-black px-6 py-20 font-sans text-[#AAA59B] scroll-mt-16 sm:px-6 lg:px-12 lg:py-32"
    >
      <div className="mx-auto flex max-w-7xl flex-col">
        {/* Section Eyebrow */}
        <RevealTitle>
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D7B46A]/40" />

            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-[#D7B46A]">
              {eyebrow}
            </span>

            <span className="h-px w-8 bg-[#D7B46A]/40" />
          </div>
        </RevealTitle>

        {/* Section Heading */}
        <RevealUp delay={0.1}>
          <h2 className="mb-3 text-center font-serif text-3xl font-normal tracking-tight text-[#EEEAE2] sm:text-5xl lg:text-6xl">
            {heading ? (
              heading
            ) : (
              <>
                Who We{' '}
                <span className="editorial-italic font-serif italic text-[#D7B46A]">
                  Invite.
                </span>
              </>
            )}
          </h2>
        </RevealUp>

        {/* Section Description */}
        <RevealUp delay={0.15}>
          <p className="mx-auto mb-12 max-w-2xl text-center font-sans text-sm font-normal leading-6 text-[#AAA59B] sm:mb-16">
            {subtitle}
          </p>
        </RevealUp>

        {/* Cards: swipeable on mobile, grid on desktop */}
        <div className="relative">
          <div
            ref={cardsContainerRef}
            onScroll={handleCardsScroll}
            className="-mx-6 w-auto snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth px-[9vw] pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:w-full sm:overflow-visible sm:px-0 sm:pb-0"
          >
            <div className="flex w-max min-w-full items-stretch gap-4 sm:grid sm:w-full sm:min-w-0 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {attendeeCards.map((card) => (
                <StaggerItem
                  key={card.number}
                  direction="up"
                  data-attendee-card
                  initial={false}
                  animate="visible"
                  className="group relative flex w-[82vw] max-w-[360px] shrink-0 snap-center flex-col self-stretch overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] shadow-xl transition-colors duration-300 hover:border-[#D7B46A]/40 sm:w-auto sm:max-w-none sm:shrink"
                >
                  {/* Card Image */}
                  <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-[#111] sm:aspect-[16/10]">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Number and Category Badge */}
                    <div className="absolute left-3.5 right-3.5 top-3.5 z-10 flex items-start justify-between gap-3">
                      {/* Number Circle */}
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#D7B46A]/50 bg-black/85 font-serif text-[11px] font-normal text-[#E5C98B] shadow-md backdrop-blur-md">
                        {card.number}
                      </span>

                      {/* Category Label */}
                      <span className="max-w-[calc(100%-2.75rem)] rounded-full border border-[#D7B46A]/30 bg-black/80 px-3 py-1.5 text-right font-sans text-[10px] font-semibold uppercase leading-[15px] tracking-[2px] text-[#E5C98B] shadow-md backdrop-blur-md sm:text-[10px]">
                        {card.category}
                      </span>
                    </div>

                    {/* Bottom Image Gradient */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Card Content: title and description below image */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3
                      className={`mb-2 font-serif text-lg font-normal leading-snug transition-colors duration-300 sm:text-xl ${
                        card.highlightTitle
                          ? 'text-[#E5C98B]'
                          : 'text-[#EEEAE2]'
                      } group-hover:text-[#D7B46A]`}
                    >
                      {card.title}
                    </h3>

                    <p className="font-sans text-[13px] font-normal leading-6 text-[#AAA59B] sm:text-sm">
                      {card.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </div>

          {/* Mobile Pagination Dots — no side arrows */}
          {attendeeCards.length > 1 && (
            <div
              className="mt-5 flex items-center justify-center gap-2 sm:hidden"
              aria-label="Attendee card navigation"
            >
              {attendeeCards.map((card, index) => (
                <button
                  key={card.number}
                  type="button"
                  onClick={() => goToCard(index)}
                  aria-label={`Go to attendee card ${index + 1}`}
                  aria-current={activeCardIndex === index ? 'true' : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeCardIndex === index
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
