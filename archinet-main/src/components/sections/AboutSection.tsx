'use client';

import React from 'react';
import { CheckCircle2, Play, ShieldCheck, Sparkles } from 'lucide-react';
import {
  RevealTitle,
  RevealLeft,
  RevealRight,
  RevealUp,
  RevealZoom,
  StaggerContainer,
  StaggerItem,
} from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import { getField, getFieldValue, getCardJsonData } from '../../utils/metadata';

interface AboutSectionProps {
  data?: MetadataField[];
}

export default function AboutSection({ data }: AboutSectionProps) {
  const sectionLabel = getFieldValue(data, 'section_label') || 'ABOUT ARCHINET';
  const title = getFieldValue(data, 'title');
  const description =
    getFieldValue(data, 'description') ||
    'We curate premium industry experiences that bring together leading architects, interior designers, developers, and forward-thinking brands. Every Archinet experience is designed to create meaningful conversations, strengthen professional relationships, and open doors to new opportunities.';
  
  const mainImageVal = getFieldValue(data, 'main_image');
  const mainImage =
    mainImageVal && mainImageVal.trim().length > 0
      ? mainImageVal.trim()
      : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop';

  const feature1 =
    getFieldValue(data, 'feature_1') || 'Quality and exclusivity over pure footfall';
  const feature2 =
    getFieldValue(data, 'feature_2') || 'Bespoke design dialogue and structural interactions';

  // Cards
  const curatedCardList = getCardJsonData(getField(data, 'curated_network'));
  const curatedHeading =
    curatedCardList[0]?.heading || curatedCardList[0]?.title || 'CURATED NETWORK';
  const curatedDesc =
    curatedCardList[0]?.description ||
    curatedCardList[0]?.text ||
    'We create an environment where the industry’s most relevant people meet.';

  const exclusiveCardList = getCardJsonData(getField(data, 'exclusive_formats'));
  const exclusiveHeading =
    exclusiveCardList[0]?.heading || exclusiveCardList[0]?.title || 'EXCLUSIVE FORMATS';
  const exclusiveDesc =
    exclusiveCardList[0]?.description ||
    exclusiveCardList[0]?.text ||
    'Archinet is where architecture, design, and business connect.';

  const founderCardList = getCardJsonData(getField(data, 'founder_video'));
  const founderSubtitle =
    founderCardList[0]?.subtitle || founderCardList[0]?.role || 'Our Founder';
  const founderTitle =
    founderCardList[0]?.title || founderCardList[0]?.heading || 'Setting new benchmark';
  const founderImageVal = founderCardList[0]?.image || founderCardList[0]?.poster;
  const founderImage =
    founderImageVal && founderImageVal.trim().length > 0
      ? founderImageVal.trim()
      : 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=400&auto=format&fit=crop';

  return (
    <section
      id="about"
      className="w-full py-24 lg:py-36 px-6 lg:px-12 bg-[#070707] border-b border-[rgba(255,255,255,0.06)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Image with Floating Video Card (Enters from Left) */}
        <RevealLeft className="lg:col-span-6 relative">
          {/* Main Large Image */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${mainImage}')`,
                filter: 'grayscale(100%) contrast(110%) brightness(70%)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-60" />
          </div>

          {/* Floating Video Preview Card */}
          <RevealZoom
            delay={0.2}
            className="absolute -bottom-6 -right-4 sm:bottom-8 sm:-right-8 w-64 sm:w-72 p-4 rounded-xl bg-[#0d0d0d]/90 backdrop-blur-md border border-[var(--accent-gold)]/50 shadow-2xl"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-[#141414] group cursor-pointer flex items-center justify-center">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform"
                style={{
                  backgroundImage: `url('${founderImage}')`,
                  filter: 'grayscale(100%) brightness(60%)',
                }}
              />
              <div className="w-10 h-10 rounded-full bg-[var(--accent-gold)] flex items-center justify-center text-[#070707] shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-[#070707] ml-0.5" />
              </div>
            </div>

            <span className="text-[10px] font-mono text-[var(--accent-gold)] tracking-widest uppercase block mb-1">
              {founderSubtitle}
            </span>
            <p className="text-xs font-serif text-white font-medium">{founderTitle}</p>
          </RevealZoom>
        </RevealLeft>

        {/* Right Column: Copy & Specs (Enters with staggered sequence) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <RevealTitle>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(240,171,68,0.1)] border border-[rgba(240,171,68,0.3)] w-fit">
              <span className="text-[11px] font-mono tracking-widest text-[var(--accent-gold)] font-medium uppercase">
                {sectionLabel}
              </span>
            </div>
          </RevealTitle>

          <RevealRight delay={0.1}>
            {title ? (
              <h2 className="font-serif text-4xl sm:text-6xl text-white font-light leading-tight tracking-tight whitespace-pre-line">
                {title}
              </h2>
            ) : (
              <h2 className="font-serif text-4xl sm:text-6xl text-white font-light leading-tight tracking-tight">
                A bridge between <br />
                <span className="editorial-italic">brands & visionaries.</span>
              </h2>
            )}
          </RevealRight>

          <RevealUp delay={0.2}>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-sans">
              {description}
            </p>
          </RevealUp>

          {/* Feature Cards Grid (Staggered Cards) */}
          <StaggerContainer
            staggerChildren={0.15}
            delayChildren={0.3}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2"
          >
            <StaggerItem
              direction="left"
              className="p-4 rounded-xl bg-[#0d0d0d] border border-[rgba(255,255,255,0.08)]"
            >
              <Sparkles className="w-5 h-5 text-[var(--accent-gold)] mb-2" />
              <h3 className="font-serif text-lg text-white font-medium mb-1">
                {curatedHeading}
              </h3>
              <p className="text-xs font-mono text-[var(--text-muted)]">
                {curatedDesc}
              </p>
            </StaggerItem>

            <StaggerItem
              direction="right"
              className="p-4 rounded-xl bg-[#0d0d0d] border border-[rgba(255,255,255,0.08)]"
            >
              <ShieldCheck className="w-5 h-5 text-[var(--accent-gold)] mb-2" />
              <h3 className="font-serif text-lg text-white font-medium mb-1">
                {exclusiveHeading}
              </h3>
              <p className="text-xs font-mono text-[var(--text-muted)]">
                {exclusiveDesc}
              </p>
            </StaggerItem>
          </StaggerContainer>

          {/* Bullet List */}
          <RevealUp delay={0.4}>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-ivory)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                <span>{feature1}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-ivory)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                <span>{feature2}</span>
              </div>
            </div>
          </RevealUp>
        </div>
      </div>
    </section>
  );
}
