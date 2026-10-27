
'use client';

import React from 'react';
import {
  RevealTitle,
  RevealUp,
  StaggerContainer,
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
  // Dynamic fields from Metadata Master / API
  const eyebrow =
    getFieldValue(data, 'section_label', 'eyebrow', 'label') ||
    'ATTENDEE PROFILE';

  const heading = getFieldValue(data, 'title', 'heading');

  const subtitle =
    getFieldValue(data, 'subtitle', 'sub_heading', 'description') ||
    'Archinet is an invitation-only gathering engineered specifically for key decision-makers who evaluate, specify and approve building materials and interior solutions.';

  // Support repeatable cardJson if provided in Metadata Master
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

          const num = String(idx + 1).padStart(2, '0');

          return {
            number: card.number || num,
            category:
              card.category || card.label || card.role || defaultCard.category,
            title:
              card.title || card.name || card.heading || defaultCard.title,
            description:
              card.description ||
              card.desc ||
              card.text ||
              defaultCard.description,
            image: card.image || card.url || card.src || defaultCard.image,
            highlightTitle: idx % 2 === 0,
          };
        })
      : DEFAULT_ATTENDEE_CARDS.map((defaultCard, idx) => {
          const prefix = `card_${idx + 1}_`;

          const title =
            cardList[idx]?.title ||
            cardList[idx]?.name ||
            cardList[idx]?.heading ||
            getFieldValue(data, `${prefix}title`, `${prefix}name`) ||
            defaultCard.title;

          const category =
            cardList[idx]?.category ||
            cardList[idx]?.label ||
            cardList[idx]?.role ||
            getFieldValue(data, `${prefix}category`, `${prefix}label`) ||
            defaultCard.category;

          const description =
            cardList[idx]?.description ||
            cardList[idx]?.desc ||
            cardList[idx]?.text ||
            getFieldValue(data, `${prefix}description`, `${prefix}desc`) ||
            defaultCard.description;

          const image =
            cardList[idx]?.image ||
            cardList[idx]?.url ||
            cardList[idx]?.src ||
            getFieldValue(data, `${prefix}image`) ||
            defaultCard.image;

          return {
            number: defaultCard.number,
            category,
            title,
            description,
            image,
            highlightTitle: defaultCard.highlightTitle,
          };
        });

  return (
    <section
      id="who-we-invite"
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

        {/* Heading */}
        <RevealUp delay={0.1}>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#E8E1D5] font-normal text-center tracking-tight mb-3">
            Who We{' '}
            <span className="editorial-italic italic font-serif !text-[#D9BC78]">
              Invite.
            </span>
          </h2>
        </RevealUp>

        {/* Subtitle */}
        <RevealUp delay={0.15}>
          <p className="text-xs sm:text-sm font-sans text-[#AAA59B] text-center max-w-2xl mx-auto mb-12 sm:mb-16 leading-relaxed">
            {subtitle}
          </p>
        </RevealUp>

        {/* 6 Attendee Cards Grid (3-column on desktop) */}
        <StaggerContainer
          staggerChildren={0.1}
          delayChildren={0.2}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {attendeeCards.map((card) => (
            <StaggerItem
              key={card.number}
              direction="up"
              className="rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/10 hover:border-[#D9BC78]/40 transition-all duration-300 flex flex-col group shadow-xl"
            >
              {/* Image with Floating Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Top Elements */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                  {/* Number Circle */}
                  <span className="w-7 h-7 rounded-full bg-black/75 backdrop-blur-md border border-[#D9BC78]/30 flex items-center justify-center text-[11px] font-sans font-semibold text-[#D9BC78] shadow-md">
                    {card.number}
                  </span>

                  {/* Category Pill */}
                  <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-[#D9BC78]/30 text-[9px] font-sans font-semibold text-[#D9BC78] tracking-wider uppercase shadow-md">
                    {card.category}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-normal mb-2 leading-snug text-[#E8E1D5] group-hover:text-[#D9BC78] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-[#AAA59B] leading-relaxed font-sans">
                    {card.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
