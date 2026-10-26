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
import { getFieldValue } from '../../utils/metadata';

interface AboutSectionProps {
  data?: MetadataField[];
}

export default function AboutSection({ data }: AboutSectionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const sectionLabel = getFieldValue(data, 'section_label') || 'ABOUT ARCHINET';
  const title = getFieldValue(data, 'title');
  const description = getFieldValue(data, 'description');

  const mainImageVal = getFieldValue(data, 'main_image');
  const mainImage =
    mainImageVal && mainImageVal.trim().length > 0
      ? mainImageVal.trim()
      : 'https://utkarshsite.blob.core.windows.net/archinet/ecom-images%2Fba6a620712c643928414b9338d541e23.jpg';

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="about"
      className="w-full py-20 lg:py-32 px-6 lg:px-12 bg-[#070707] border-b border-[rgba(255,255,255,0.06)] overflow-hidden scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Rectangular Rounded Image Frame (Original Shape) */}
        <RevealLeft className="lg:col-span-5 relative w-full">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d0d0d]">
            <img
              src={mainImage}
              alt="About Archinet"
              className="w-full h-full object-cover"
            />
          </div>
        </RevealLeft>

        {/* Right Column: Eyebrow, Heading & 3-Tab Accordion */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Eyebrow */}
          <RevealTitle>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f0ab44]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#f0ab44] font-semibold uppercase">
                {sectionLabel}
              </span>
            </div>
          </RevealTitle>

          {/* Heading */}
          <RevealRight delay={0.1}>
            {title ? (
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light leading-tight tracking-tight whitespace-pre-line">
                {title}
              </h2>
            ) : (
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light leading-tight tracking-tight">
                A bridge between <br />
                <span className="editorial-italic italic font-serif text-[#f0ab44]">
                  brands & visionaries.
                </span>
              </h2>
            )}
          </RevealRight>

          {/* Accordion Group */}
          <RevealUp delay={0.2} className="flex flex-col divide-y divide-white/10 pt-4 border-t border-white/10">
            {/* Accordion Item 01: About Archinet */}
            <div className="py-5">
              <button
                type="button"
                onClick={() => toggleAccordion(0)}
                className="w-full flex items-center justify-between text-left group transition-colors"
                aria-expanded={openIndex === 0}
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-mono text-[#f0ab44] font-medium tracking-wider">
                    01
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-[#f0ab44] transition-colors">
                    About Archinet
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover:border-[#f0ab44] group-hover:text-[#f0ab44] transition-colors shrink-0">
                  {openIndex === 0 ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === 0 && (
                  <motion.div
                    key="content-0"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 flex flex-col gap-4 text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                      <p>
                        {description ||
                          "Archinet\u2122 is a networking and exhibition platform by Riverstone Networking Services, created to connect premium building-material and architectural-product brands with India's architecture and interior-design community."}
                      </p>
                      <p>
                        Our curated format encourages product discovery, direct professional interactions and the development of meaningful business relationships.
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <span className="rounded-full px-4 py-1.5 text-[10px] font-mono tracking-wider border border-white/15 text-white/80 uppercase bg-white/[0.02]">
                          RIVERSTONE NETWORKING SERVICES
                        </span>
                        <span className="rounded-full px-4 py-1.5 text-[10px] font-mono tracking-wider border border-white/15 text-white/80 uppercase bg-white/[0.02]">
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
                  <span className="text-xs font-mono text-[#f0ab44] font-medium tracking-wider">
                    02
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-[#f0ab44] transition-colors">
                    The Archinet Model
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover:border-[#f0ab44] group-hover:text-[#f0ab44] transition-colors shrink-0">
                  {openIndex === 1 ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === 1 && (
                  <motion.div
                    key="content-1"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 flex flex-col gap-4 text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                      <p>
                        Archinet follows a deliberately curated format. We work with a maximum of 20 manufacturing brands per edition and invite 100+ principal architects, interior designers and design decision-makers, representing approximately 100 different firms.
                      </p>
                      <p>
                        The aim is to bring participating brands into a focused environment where they can present their products directly to professionals who influence material selection, design decisions and project specifications.
                      </p>
                      <p>
                        Rather than focusing on mass footfall, Archinet prioritises relevant industry connections, meaningful conversations and opportunities to build lasting professional relationships.
                      </p>

                      {/* 3 Stat Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                          <div className="font-serif text-2xl sm:text-3xl text-[#f0ab44] font-normal">
                            Max 20
                          </div>
                          <div className="text-[10px] font-mono text-white/70 tracking-wider uppercase mt-1">
                            MANUFACTURING BRANDS
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                          <div className="font-serif text-2xl sm:text-3xl text-[#f0ab44] font-normal">
                            100+
                          </div>
                          <div className="text-[10px] font-mono text-white/70 tracking-wider uppercase mt-1">
                            PRINCIPAL ARCHITECTS &amp; DESIGNERS
                          </div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                          <div className="font-serif text-2xl sm:text-3xl text-[#f0ab44] font-normal">
                            ~100
                          </div>
                          <div className="text-[10px] font-mono text-white/70 tracking-wider uppercase mt-1">
                            LEADING DESIGN FIRMS
                          </div>
                        </div>
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
                  <span className="text-xs font-mono text-[#f0ab44] font-medium tracking-wider">
                    03
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-[#f0ab44] transition-colors">
                    What Happens At Archinet
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 group-hover:border-[#f0ab44] group-hover:text-[#f0ab44] transition-colors shrink-0">
                  {openIndex === 2 ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === 2 && (
                  <motion.div
                    key="content-2"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 flex flex-col gap-4 text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                      <p>
                        Each Archinet edition brings participating manufacturing brands and established architecture and interior-design professionals together for a curated industry gathering.
                      </p>

                      {/* 2 Info Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-[11px] font-mono text-[#f0ab44] tracking-widest uppercase font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f0ab44]" />
                            <span>FOR BRANDS</span>
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed font-sans">
                            Brands get the opportunity to showcase their products, introduce new materials and solutions, interact directly with design professionals and build relationships with firms relevant to their business.
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-[11px] font-mono text-[#f0ab44] tracking-widest uppercase font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f0ab44]" />
                            <span>FOR ARCHITECTS &amp; DESIGNERS</span>
                          </div>
                          <p className="text-xs text-white/70 leading-relaxed font-sans">
                            Architects and designers get the opportunity to discover products, understand their applications, meet brand representatives, exchange ideas and explore solutions for their projects.
                          </p>
                        </div>
                      </div>

                      {/* Italic Note */}
                      <p className="text-xs sm:text-sm text-white/70 italic font-serif py-1">
                        &ldquo;The event is designed to create a setting where product discovery and professional networking happen together.&rdquo;
                      </p>

                      {/* CTA Row */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/30 text-white hover:border-[#f0ab44] hover:text-[#f0ab44] font-mono text-xs tracking-wider uppercase transition-colors"
                        >
                          <span>CONNECT WITH US</span>
                          <span className="text-[#f0ab44]">&bull;</span>
                        </a>
                        <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-white/50">
                          <span>&bull; Invite-Only Gathering</span>
                          <span>&bull; 13 Editions Completed</span>
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
