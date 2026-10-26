'use client';

import React from 'react';
import { LEADERS_DATA, Leader } from '../../data';
import {
  RevealTitle,
  RevealUp,
} from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import { getField, getFieldValue, getCardJsonData } from '../../utils/metadata';

interface LeadersSectionProps {
  data?: MetadataField[];
}

export default function LeadersSection({ data }: LeadersSectionProps) {
  const rawEyebrow = getFieldValue(data, 'section_label', 'eyebrow', 'label');
  const eyebrow =
    !rawEyebrow || rawEyebrow.toLowerCase().includes('keynote visionaries')
      ? 'THE LEADERSHIP'
      : rawEyebrow;

  const rawTitle = getFieldValue(data, 'title', 'heading');
  const heading =
    !rawTitle || rawTitle.toLowerCase().includes('our industry leaders')
      ? 'The People Behind the Practice'
      : rawTitle;

  const desc1 =
    getFieldValue(data, 'description_1', 'desc_1') ||
    'Archinet brings together established architects, principal architects, leading interior designers and decision-makers from respected design firms.';
  const desc2 =
    getFieldValue(data, 'description_2', 'desc_2') ||
    'These professionals influence the way spaces are designed, materials are evaluated and products are considered for projects.';
  const desc3 =
    getFieldValue(data, 'description_3', 'desc_3') ||
    'By bringing this community into conversation with participating brands, Archinet creates opportunities for product discovery, the exchange of perspectives and direct engagement between the people designing spaces and the brands supplying the materials.';

  // 1. Try single repeatable card field first
  const leaderField = getField(data, 'leader_deatils', 'leader_details', 'leaders', 'leader_list');
  const leaderCardData = getCardJsonData<Record<string, string>>(leaderField);

  let dynamicLeaders: Leader[] = [];

  if (leaderCardData.length > 0) {
    dynamicLeaders = leaderCardData
      .map((item, idx) => {
        const fallback = LEADERS_DATA[idx % LEADERS_DATA.length];
        return {
          id: `leader-${idx + 1}`,
          name: item.name || item.title || fallback.name,
          role: item.designation || item.role || item.title || fallback.role,
          company: item.company || item.organization || fallback.company,
          image: item.image || item.photo || item.person_image || fallback.image,
        };
      })
      .filter((l) => l.image || l.name);
  }

  const leaders = dynamicLeaders.length > 0 ? dynamicLeaders : LEADERS_DATA;
  // Duplicate list to achieve a seamless, continuous infinite scroll loop
  const marqueeLeaders = [...leaders, ...leaders, ...leaders];

  return (
    <section id="leaders" className="w-full py-20 lg:py-32 bg-[#050505] text-[#f4f0e8] overflow-hidden border-b border-[rgba(255,255,255,0.06)] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
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
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal text-center tracking-tight mb-4 leading-tight">
            {heading === 'The People Behind the Practice' ? (
              <>
                The People Behind the<br className="hidden sm:inline" /> Practice
              </>
            ) : (
              heading
            )}
          </h2>
        </RevealUp>

        {/* 3 Description Paragraphs */}
        <RevealUp delay={0.15}>
          <div className="flex flex-col gap-3 text-xs sm:text-sm font-sans text-white/60 text-center max-w-3xl mx-auto mb-12 sm:mb-16 leading-relaxed">
            <p>{desc1}</p>
            <p>{desc2}</p>
            <p>{desc3}</p>
          </div>
        </RevealUp>
      </div>

      {/* Infinite Continuous Moving Portraits Strip with Low/Gentle Scroll Speed */}
      <div className="relative w-full overflow-hidden py-4 select-none group">
        <div
          className="flex gap-5 sm:gap-6 animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]"
          style={{ animationDuration: '80s' }}
        >
          {marqueeLeaders.map((leader, idx) => (
            <div
              key={`${leader.id}-${idx}`}
              className="w-48 sm:w-56 md:w-64 shrink-0 flex flex-col group/card cursor-pointer"
            >
              {/* Leader Photo */}
              <div className="w-full aspect-[4/5] overflow-hidden bg-[#0d0d0d] mb-3">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover grayscale contrast-110 brightness-90 group-hover/card:grayscale-0 group-hover/card:contrast-100 group-hover/card:brightness-100 transition-all duration-700"
                />
              </div>

              {/* Leader Name Below Photo */}
              <h3 className="font-serif text-sm sm:text-base text-white font-normal truncate block group-hover/card:text-[#f0ab44] transition-colors">
                {leader.name}
              </h3>

              {/* Company / Designation Below Name */}
              <p className="text-[11px] font-sans text-white/50 truncate mt-0.5">
                {leader.company || leader.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
