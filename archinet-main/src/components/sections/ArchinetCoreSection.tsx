'use client';

import React from 'react';
import {
  RevealTitle,
  RevealUp,
} from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import { getFieldValue } from '../../utils/metadata';

interface ArchinetCoreSectionProps {
  data?: MetadataField[];
}

export default function ArchinetCoreSection({
  data,
}: ArchinetCoreSectionProps) {
  // Dynamic fields from Metadata Master / API
  const eyebrow =
    getFieldValue(data, 'section_label', 'eyebrow', 'label') ||
    'THE ARCHINET CORE';
  const heading = getFieldValue(data, 'title', 'heading');
  const description =
    getFieldValue(data, 'description', 'paragraph', 'text') ||
    'Archinet brings leading building-material and architectural-product brands together with distinguished architects, principal designers and leaders of established architecture and interior-design firms. Each edition creates an exclusive platform for industry leaders to discover innovations, exchange ideas and build meaningful business relationships.';

  const marqueeText =
    getFieldValue(data, 'marquee_text', 'marquee', 'ticker', 'conference_title') ||
    'ANNUAL CONFERENCE 2027';

  return (
    <section
      id="core"
      className="relative w-full pt-20 sm:pt-28 lg:pt-32 pb-0 bg-[#050505] text-[#f4f0e8] overflow-hidden border-b border-[rgba(255,255,255,0.06)] scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        {/* Eyebrow */}
        <RevealTitle>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-[1px] bg-[#f0ab44]/40" />
            <span className="text-xs font-mono text-[#f0ab44] tracking-[0.25em] uppercase font-semibold">
              {eyebrow}
            </span>
            <span className="w-8 h-[1px] bg-[#f0ab44]/40" />
          </div>
        </RevealTitle>

        {/* Heading with Gold Accents */}
        <RevealUp delay={0.1}>
          {heading ? (
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal text-center tracking-tight leading-tight max-w-4xl mx-auto mb-6 whitespace-pre-line">
              {heading}
            </h2>
          ) : (
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal text-center tracking-tight leading-tight max-w-4xl mx-auto mb-6">
              WHERE LEADING{' '}
              <span className="text-[#f0ab44]">BRANDS</span> MEET<br />
              THE <span className="text-[#f0ab44]">MINDS</span> SHAPING DESIGN.
            </h2>
          )}
        </RevealUp>

        {/* Description */}
        <RevealUp delay={0.15}>
          <p className="text-xs sm:text-sm text-white/60 text-center max-w-3xl mx-auto leading-relaxed font-sans mb-16 sm:mb-20">
            {description}
          </p>
        </RevealUp>
      </div>

      {/* Animated Horizontal Marquee */}
      <div className="w-full py-8 sm:py-10 border-y border-white/10 bg-black/40 overflow-hidden relative select-none">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-12 sm:gap-16 mx-6 sm:mx-8 shrink-0"
            >
              <span className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-wider text-white/90 font-light uppercase">
                {marqueeText}
              </span>
              <span className="font-serif text-2xl sm:text-4xl text-[#f0ab44] select-none">
                *
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
