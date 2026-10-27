
'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RevealTitle,
  RevealLeft,
  RevealRight,
  RevealUp,
} from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import {
  getField,
  getFieldValue,
  getCardJsonData,
  parseButtonValue,
} from '../../utils/metadata';

interface AboutSectionProps {
  data?: MetadataField[];
}

export default function AboutSection({ data }: AboutSectionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const sectionLabel =
    getFieldValue(data, 'section_label') || 'ABOUT ARCHINET';
  const title = getFieldValue(data, 'title');
  const description = getFieldValue(data, 'description');

  const mainImageVal = getFieldValue(data, 'main_image');
  const mainImage =
    mainImageVal && mainImageVal.trim().length > 0
      ? mainImageVal.trim()
      : 'https://utkarshsite.blob.core.windows.net/archinet/ecom-images%2Fba6a620712c643928414b9338d541e23.jpg';

  // Tab 01 Metadata
  const aboutTitle =
    getFieldValue(data, 'about_title') || 'About Archinet';

  const aboutDesc1 =
    getFieldValue(data, 'about_description_1') ||
    description ||
    "Archinet\u2122 is a networking and exhibition platform by Riverstone Networking Services, created to connect premium building-material and architectural-product brands with India's architecture and interior-design community.";

  const aboutDesc2 =
    getFieldValue(data, 'about_description_2') ||
    'Our curated format encourages product discovery, direct professional interactions and the development of meaningful business relationships.';

  // Tab 02 Metadata
  const modelTitle =
    getFieldValue(data, 'model_title') || 'The Archinet Model';

  const modelDesc1 =
    getFieldValue(data, 'model_description_1') ||
    'Archinet follows a deliberately curated format. We work with a maximum of 20 manufacturing brands per edition and invite 100+ principal architects, interior designers and design decision-makers, representing approximately 100 different firms.';

  const modelDesc2 =
    getFieldValue(data, 'model_description_2') ||
    'The aim is to bring participating brands into a focused environment where they can present their products directly to professionals who influence material selection, design decisions and project specifications.';

  const modelDesc3 =
    getFieldValue(data, 'model_description_3') ||
    'Rather than focusing on mass footfall, Archinet prioritises relevant industry connections, meaningful conversations and opportunities to build lasting professional relationships.';

  const statCards = getCardJsonData<{
    value?: string;
    number?: string;
    stat?: string;
    label?: string;
    title?: string;
  }>(getField(data, 'model_stat_', 'model_stat', 'statistics'));

  const stats =
    statCards.length > 0
      ? statCards.map((c) => ({
          value: c.value || c.number || c.stat || '',
          label: c.label || c.title || '',
        }))
      : [
          { value: 'Max 20', label: 'MANUFACTURING BRANDS' },
          { value: '100+', label: 'PRINCIPAL ARCHITECTS & DESIGNERS' },
          { value: '~100', label: 'LEADING DESIGN FIRMS' },
        ];

  // Tab 03 Metadata
  const happensTitle =
    getFieldValue(data, 'happens_title') || 'What Happens At Archinet';

  const happensDesc =
    getFieldValue(data, 'happens_description') ||
    'Each Archinet edition brings participating manufacturing brands and established architecture and interior-design professionals together for a curated industry gathering.';

  const happensQuote =
    getFieldValue(data, 'happens_quote') ||
    'The event is designed to create a setting where product discovery and professional networking happen together.';

  const connectButton = parseButtonValue(
    getFieldValue(data, 'connect_button'),
    'CONNECT WITH US',
    '#contact'
  );

  const footerLabel1 =
    getFieldValue(data, 'footer_label_1') || 'Invite-Only Gathering';

  const footerLabel2 =
    getFieldValue(data, 'footer_label_2') || '13 Editions Completed';

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="about"
      className="w-full py-20 lg:py-32 px-6 lg:px-12 bg-black border-b border-[rgba(255,255,255,0.06)] overflow-hidden scroll-mt-16 text-[#AAA59B]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Taller Rectangular Image */}
        <RevealLeft className="lg:col-span-5 relative w-full flex justify-center">
          <div className="relative w-full max-w-[430px] aspect-[3/4] rounded-2xl overflow-hidden border border-[#D9BC78]/35 shadow-2xl bg-[#0d0d0d]">
            <img
              src={mainImage}
              alt="About Archinet"
              className="w-full h-full object-cover"
            />

            {/* Bottom Floating Card */}
            <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-[#D9BC78]/30 shadow-xl flex flex-col gap-1 z-10">
              <div className="flex items-center justify-between text-[10.5px] font-sans">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f0ab44]" />

                  <span className="text-[#D9BC78] font-semibold uppercase tracking-wider">
                    RIVERSTONE NETWORKING SERVICES
                  </span>
                </div>

                <span className="text-[#AAA59B] uppercase tracking-wider text-[10px]">
                  India
                </span>
              </div>

              <p className="text-[11px] font-sans text-[#AAA59B] pl-3.5">
                A Curated Architecture &amp; Design Gathering
              </p>
            </div>
          </div>
        </RevealLeft>

        {/* Right Column: Eyebrow, Heading & Accordion */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Eyebrow Pill */}
          <RevealTitle>
            <div className="inline-flex items-center px-3.5 py-1 rounded-full border border-[#D9BC78]/35 bg-[#0a0a0a] text-[10px] font-sans tracking-[0.25em] text-[#D9BC78] font-semibold uppercase self-start">
              {sectionLabel}
            </div>
          </RevealTitle>

          {/* Main Heading */}
          <RevealRight delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#E8E1D5] font-normal leading-[1.12] tracking-tight">
              Where product discovery
              <br />
              meets
              <br />
              <span className="editorial-italic italic font-serif !text-[#D9BC78]">
                architecture &amp; interior design.
              </span>
            </h2>
          </RevealRight>

          {/* Accordion Group */}
          <RevealUp
            delay={0.2}
            className="flex flex-col divide-y divide-white/10 pt-4 border-t border-white/10"
          >
            {/* Accordion Item 01: About Archinet */}
            <div className="py-5">
              <button
                type="button"
                onClick={() => toggleAccordion(0)}
                className="w-full flex items-center justify-between text-left group transition-colors"
                aria-expanded={openIndex === 0}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-sans text-[#D9BC78] font-medium tracking-wider">
                    01
                  </span>

                  <span
                    className={`font-serif text-2xl sm:text-3xl font-normal transition-colors ${
                      openIndex === 0
                        ? 'text-[#D9BC78]'
                        : 'text-[#E8E1D5] group-hover:text-[#D9BC78]'
                    }`}
                  >
                    {aboutTitle}
                  </span>
                </div>

                <div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                    openIndex === 0
                      ? 'border-[#D9BC78] text-[#D9BC78]'
                      : 'border-white/20 text-[#AAA59B] group-hover:border-[#D9BC78] group-hover:text-[#D9BC78]'
                  }`}
                >
                  {openIndex === 0 ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === 0 && (
                  <motion.div
                    key="content-0"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 flex flex-col gap-4 text-xs sm:text-sm text-[#AAA59B] leading-relaxed font-sans">
                      <p>{aboutDesc1}</p>
                      <p>{aboutDesc2}</p>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <span className="rounded-full px-4 py-1.5 text-[10px] font-sans tracking-wider border border-white/15 text-[#D9BC78] uppercase bg-white/[0.02]">
                          RIVERSTONE NETWORKING SERVICES
                        </span>

                        <span className="rounded-full px-4 py-1.5 text-[10px] font-sans tracking-wider border border-white/15 text-[#AAA59B] uppercase bg-white/[0.02]">
                          PAN-INDIA COMMUNITY
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion Item 02: The Archinet Model */}
            <div className="py-5">
              <button
                type="button"
                onClick={() => toggleAccordion(1)}
                className="w-full flex items-center justify-between text-left group transition-colors"
                aria-expanded={openIndex === 1}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-sans text-[#D9BC78] font-medium tracking-wider">
                    02
                  </span>

                  <span
                    className={`font-serif text-2xl sm:text-3xl font-normal transition-colors ${
                      openIndex === 1
                        ? 'text-[#D9BC78]'
                        : 'text-[#E8E1D5] group-hover:text-[#D9BC78]'
                    }`}
                  >
                    {modelTitle}
                  </span>
                </div>

                <div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                    openIndex === 1
                      ? 'border-[#D9BC78] text-[#D9BC78]'
                      : 'border-white/20 text-[#AAA59B] group-hover:border-[#D9BC78] group-hover:text-[#D9BC78]'
                  }`}
                >
                  {openIndex === 1 ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === 1 && (
                  <motion.div
                    key="content-1"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 flex flex-col gap-4 text-xs sm:text-sm text-[#AAA59B] leading-relaxed font-sans">
                      <p>{modelDesc1}</p>
                      <p>{modelDesc2}</p>
                      <p>{modelDesc3}</p>

                      {/* Stat Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                        {stats.map((stat, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-white/[0.03] border border-white/10"
                          >
                            <div className="font-serif text-2xl sm:text-3xl text-[#D9BC78] font-normal">
                              {stat.value}
                            </div>

                            <div className="text-[10px] font-sans text-[#AAA59B] tracking-wider uppercase mt-1">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion Item 03: What Happens At Archinet */}
            <div className="py-5">
              <button
                type="button"
                onClick={() => toggleAccordion(2)}
                className="w-full flex items-center justify-between text-left group transition-colors"
                aria-expanded={openIndex === 2}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-sans text-[#D9BC78] font-medium tracking-wider">
                    03
                  </span>

                  <span
                    className={`font-serif text-2xl sm:text-3xl font-normal transition-colors ${
                      openIndex === 2
                        ? 'text-[#D9BC78]'
                        : 'text-[#E8E1D5] group-hover:text-[#D9BC78]'
                    }`}
                  >
                    {happensTitle}
                  </span>
                </div>

                <div
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                    openIndex === 2
                      ? 'border-[#D9BC78] text-[#D9BC78]'
                      : 'border-white/20 text-[#AAA59B] group-hover:border-[#D9BC78] group-hover:text-[#D9BC78]'
                  }`}
                >
                  {openIndex === 2 ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === 2 && (
                  <motion.div
                    key="content-2"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 flex flex-col gap-4 text-xs sm:text-sm text-[#AAA59B] leading-relaxed font-sans">
                      <p>{happensDesc}</p>

                      {/* 2 Info Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-[11px] font-sans text-[#D9BC78] tracking-widest uppercase font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f0ab44]" />
                            <span>FOR BRANDS</span>
                          </div>

                          <p className="text-xs text-[#AAA59B] leading-relaxed font-sans">
                            Brands get the opportunity to showcase their products, introduce new materials and solutions, interact directly with design professionals and build relationships with firms relevant to their business.
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-[11px] font-sans text-[#D9BC78] tracking-widest uppercase font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f0ab44]" />
                            <span>FOR ARCHITECTS &amp; DESIGNERS</span>
                          </div>

                          <p className="text-xs text-[#AAA59B] leading-relaxed font-sans">
                            Architects and designers get the opportunity to discover products, understand their applications, meet brand representatives, exchange ideas and explore solutions for their projects.
                          </p>
                        </div>
                      </div>

                      {/* Italic Note */}
                      <p className="text-xs sm:text-sm text-[#AAA59B] italic font-serif py-1">
                        &ldquo;{happensQuote}&rdquo;
                      </p>

                      {/* CTA Row */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                        <a
                          href={connectButton.link}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#D9BC78]/60 bg-transparent text-[#D9BC78] hover:bg-[#D9BC78] hover:text-black font-sans text-xs tracking-wider uppercase transition-colors"
                        >
                          <span>{connectButton.text}</span>
                          <span className="text-[#D9BC78]">&bull;</span>
                        </a>

                        <div className="flex flex-wrap items-center gap-4 text-[11px] font-sans text-[#AAA59B]">
                          <span>&bull; {footerLabel1}</span>
                          <span>&bull; {footerLabel2}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </RevealUp>
        </div>
      </div>
    </section>
  );
}
