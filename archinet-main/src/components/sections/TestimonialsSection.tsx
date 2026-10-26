'use client';

import React, { useState, useEffect } from 'react';
import { TESTIMONIALS_DATA, Testimonial } from '../../data';
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
} from '../../utils/metadata';

const TESTIMONIAL_VIDEOS = [
  {
    id: 'vid-canna-patel',
    label: 'AR. CANNA PATEL',
    src: '/assets/testimonials videos/AR. Canna Patel_.mp4',
  },
  {
    id: 'vid-reza-kabul',
    label: 'AR. REZA KABUL',
    src: '/assets/testimonials videos/AR. Reza Kabul.mp4',
  },
  {
    id: 'vid-santha-gour',
    label: 'AR. SANTHA GOUR',
    src: '/assets/testimonials videos/AR. Santha Gour.mp4',
  },
  {
    id: 'vid-seema-puri',
    label: 'AR. SEEMA PURI',
    src: '/assets/testimonials videos/AR. Seema Puri.mp4',
  },
  {
    id: 'vid-aakif-habib',
    label: 'ID. AAKIF HABIB',
    src: '/assets/testimonials videos/ID. Aakif Habib.mp4',
  },
];

interface TestimonialsSectionProps {
  data?: MetadataField[];
}

export default function TestimonialsSection({
  data,
}: TestimonialsSectionProps) {
  const eyebrow =
    getFieldValue(data, 'section_label', 'eyebrow', 'label') ||
    'THE COMMUNITY VOICES';
  const heading =
    getFieldValue(data, 'title', 'heading') ||
    'Experiences from the Archinet Community';
  const subtitle =
    getFieldValue(data, 'subtitle', 'sub_heading', 'description') ||
    'Hear from the brands and design professionals who have been part of Archinet.';

  // Dynamic testimonial data from Metadata API
  const testimonialField = getField(
    data,
    'testimonial_deatils',
    'testimonial_details',
    'testimonials',
    'testimonial_list'
  );
  const cardList = getCardJsonData<Record<string, string>>(testimonialField);

  let dynamicTestimonials: Testimonial[] = [];

  if (cardList.length > 0) {
    dynamicTestimonials = cardList.map((item, idx) => {
      const fallback = TESTIMONIALS_DATA[idx % TESTIMONIALS_DATA.length];
      return {
        id: `testimonial-${idx + 1}`,
        quote: item.testimonial || item.quote || item.text || fallback.quote,
        author: item.person_name || item.name || item.author || fallback.author,
        title: item.designation || item.title || item.role || fallback.title,
        company: item.company || fallback.company,
        rating: Number(item.rating) || 5,
        avatar: item.person_image || item.image || item.avatar || fallback.avatar,
      };
    });
  }

  const testimonials =
    dynamicTestimonials.length > 0 ? dynamicTestimonials : TESTIMONIALS_DATA;

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const currentVideo =
    TESTIMONIAL_VIDEOS[activeVideoIndex] || TESTIMONIAL_VIDEOS[0];

  // Auto advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section
      id="testimonials"
      className="w-full py-20 lg:py-32 px-6 lg:px-12 bg-[#050505] text-[#f4f0e8] overflow-hidden border-b border-[rgba(255,255,255,0.06)] scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Video Testimonial Player */}
        <RevealLeft className="lg:col-span-5 relative w-full flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[370px] sm:max-w-[390px] overflow-hidden rounded-[18px] border border-[#f0ab44]/45 bg-black shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
            <div className="aspect-[9/16] w-full bg-black">
              {currentVideo?.src && (
                <video
                  key={currentVideo.id}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="block h-full w-full object-cover"
                >
                  <source src={currentVideo.src} type="video/mp4" />
                </video>
              )}
            </div>
          </div>

          {/* Video Selector Buttons */}
          <div className="mt-4 flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/10 bg-[#050505]/95 px-3 py-1.5 shadow-xl backdrop-blur-md">
            {TESTIMONIAL_VIDEOS.map((video, index) => (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveVideoIndex(index)}
                className={`rounded-full border px-2.5 py-1 font-sans text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.08em] transition-all duration-200 ${
                  activeVideoIndex === index
                    ? 'border-[#f0ab44] bg-[#f0ab44] text-black shadow-[0_0_12px_rgba(240,171,68,0.35)]'
                    : 'border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20 hover:text-white'
                }`}
              >
                {video.label}
              </button>
            ))}
          </div>
        </RevealLeft>

        {/* Right Column: Community Voices Content & Carousel */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Eyebrow */}
          <RevealTitle>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#f0ab44]/40" />
              <span className="text-xs font-mono text-[#f0ab44] tracking-[0.25em] uppercase font-semibold">
                {eyebrow}
              </span>
              <span className="w-8 h-[1px] bg-[#f0ab44]/40" />
            </div>
          </RevealTitle>

          {/* Heading */}
          <RevealRight delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight mb-2 leading-tight">
              {heading}
            </h2>
          </RevealRight>

          {/* Subtitle */}
          <RevealRight delay={0.15}>
            <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed mb-8 sm:mb-10">
              {subtitle}
            </p>
          </RevealRight>

          {/* Testimonial Cards Carousel Viewport */}
          <RevealUp delay={0.2} className="relative w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {[0, 1].map((offset) => {
                const itemIndex = (activeIndex + offset) % testimonials.length;
                const item = testimonials[itemIndex];

                return (
                  <article
                    key={`${item.id}-${itemIndex}`}
                    className="relative rounded-2xl bg-[#0c0c0c] border border-white/10 hover:border-[#f0ab44]/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl min-h-[300px]"
                  >
                    {/* Gold Quote Mark Badge */}
                    <div className="absolute -top-3.5 left-6 w-8 h-8 rounded-md bg-[#f0ab44] text-black font-serif font-bold text-xl flex items-center justify-center shadow-lg">
                      &ldquo;
                    </div>

                    <div className="pt-2">
                      {/* 5 Gold Stars */}
                      <div className="flex items-center gap-1 text-[#f0ab44] text-xs mb-4">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <span key={i}>&#9733;</span>
                        ))}
                      </div>

                      {/* Quote Text */}
                      <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed italic mb-6">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    {/* Author Information */}
                    <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                      {item.avatar && (
                        <img
                          src={item.avatar}
                          alt={item.author}
                          className="w-10 h-10 rounded-full object-cover border border-[#f0ab44]/40 grayscale"
                        />
                      )}
                      <div className="flex flex-col">
                        <span className="font-serif text-xs sm:text-sm text-white font-medium uppercase tracking-wider block">
                          {item.author}
                        </span>
                        <span className="text-[10px] font-mono text-[#f0ab44] uppercase tracking-wider block mt-0.5">
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx
                      ? 'w-6 bg-[#f0ab44]'
                      : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </RevealUp>
        </div>
      </div>
    </section>
  );
}
