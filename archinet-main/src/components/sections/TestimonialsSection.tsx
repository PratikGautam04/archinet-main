'use client';

import React, { useEffect, useState } from 'react';
import { TESTIMONIALS_DATA, Testimonial } from '../../data';
import { motion } from 'framer-motion';
import { RevealLeft, RevealRight, RevealTitle, RevealZoom } from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import { getField, getFieldValue, getCardJsonData } from '../../utils/metadata';

const TESTIMONIAL_VIDEOS = [
  { id: 'vid-canna-patel', label: 'AR. CANNA PATEL', src: '/assets/testimonials videos/AR. Canna Patel_.mp4' },
  { id: 'vid-reza-kabul', label: 'AR. REZA KABUL', src: '/assets/testimonials videos/AR. Reza Kabul.mp4' },
  { id: 'vid-santha-gour', label: 'AR. SANTHA GOUR', src: '/assets/testimonials videos/AR. Santha Gour.mp4' },
  { id: 'vid-seema-puri', label: 'AR. SEEMA PURI', src: '/assets/testimonials videos/AR. Seema Puri.mp4' },
  { id: 'vid-aakif-habib', label: 'ID. AAKIF HABIB', src: '/assets/testimonials videos/ID. Aakif Habib.mp4' },
];

interface TestimonialsSectionProps {
  data?: MetadataField[];
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const sectionLabel = getFieldValue(data, 'section_label') || 'Voices from the network';
  const title = getFieldValue(data, 'title');

  const testimonialKeys = ['testimonial_1', 'testimonial_2', 'testimonial_3', 'testimonial_4'];
  const dynamicTestimonials: Testimonial[] = [];

  testimonialKeys.forEach((key, idx) => {
    const field = getField(data, key);
    const cardData = getCardJsonData<Record<string, string>>(field);
    if (cardData && cardData.length > 0) {
      const item = cardData[0];
      if (item.quote || item.author || item.name) {
        const fallback = TESTIMONIALS_DATA[idx % TESTIMONIALS_DATA.length];
        dynamicTestimonials.push({
          id: `test-${idx + 1}`,
          quote: item.quote || item.message || item.text || fallback.quote,
          author: item.author || item.name || fallback.author,
          title: item.title || item.role || item.designation || fallback.title,
          company: item.company || fallback.company,
          rating: item.rating ? parseInt(item.rating, 10) : fallback.rating,
          avatar: item.avatar || item.image || item.photo || fallback.avatar,
        });
      }
    }
  });

  const testimonials = dynamicTestimonials.length > 0 ? dynamicTestimonials : TESTIMONIALS_DATA;

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [cardStep, setCardStep] = useState(404);
  const total = testimonials.length;

  useEffect(() => {
    const updateStep = () => setCardStep(window.innerWidth >= 1280 ? 404 : 364);
    updateStep();
    window.addEventListener('resize', updateStep);
    return () => window.removeEventListener('resize', updateStep);
  }, []);

  const goToSlide = (index: number) => setActiveIndex(index);
  const getOffset = (index: number) => {
    let offset = index - activeIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  const extendedDesktopData = [...testimonials, testimonials[0] || TESTIMONIALS_DATA[0]];
  const currentVideo = TESTIMONIAL_VIDEOS[activeVideoIndex] || TESTIMONIAL_VIDEOS[0];

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden border-b border-white/10 bg-[#050505] text-white"
    >
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-start lg:grid-cols-[0.88fr_1.12fr]">
        {/* Video side */}
        <RevealLeft className="flex w-full self-start flex-col items-center justify-start px-5 py-8 sm:px-8 lg:px-10 lg:py-10 xl:px-14">
          <div className="relative w-full max-w-[370px] overflow-hidden rounded-[18px] border border-[#f0ab44]/45 bg-black shadow-[0_18px_60px_rgba(0,0,0,0.45)] sm:max-w-[390px]">
            <div className="aspect-[9/16] w-full">
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

          <div className="mt-3 flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/10 bg-[#050505]/95 px-3 py-1.5 shadow-xl backdrop-blur-md">
            {TESTIMONIAL_VIDEOS.map((video, index) => (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveVideoIndex(index)}
                className={`rounded-full border px-2.5 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.08em] transition-all sm:text-[10px] ${
                  activeVideoIndex === index
                    ? 'border-[#f0ab44] bg-[#f0ab44] text-black'
                    : 'border-white/20 bg-black/70 text-white/75 hover:border-white/50 hover:text-white'
                }`}
              >
                {video.label}
              </button>
            ))}
          </div>
        </RevealLeft>

        {/* Editorial side */}
        <div className="flex min-w-0 self-start flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-12 2xl:px-16">
          <RevealTitle>
            <div className="mb-7 flex items-end gap-5">
              <div className="h-px w-14 bg-[#f0ab44]/65" />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-[#f0ab44]">
                {sectionLabel}
              </span>
            </div>
            {title ? (
              <h2 className="max-w-[760px] font-serif text-[42px] font-normal uppercase leading-[0.9] tracking-[-0.025em] text-white sm:text-[52px] lg:text-[58px] xl:text-[64px] whitespace-pre-line">
                {title}
              </h2>
            ) : (
              <h2 className="max-w-[760px] font-serif text-[42px] font-normal uppercase leading-[0.9] tracking-[-0.025em] text-white sm:text-[52px] lg:text-[58px] xl:text-[64px]">
                WHAT OUR ATTENDEES
                <br />
                SAY
              </h2>
            )}
          </RevealTitle>

          <RevealRight delay={0.12} className="mt-8 hidden w-full overflow-hidden lg:block">
            <motion.div
              className="flex w-max gap-5"
              animate={{ x: -activeIndex * cardStep }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {extendedDesktopData.map((item, index) => {
                const realIndex = index % total;
                const isActive = index === activeIndex;

                return (
                  <article
                    key={`${item.id}-${index}`}
                    onClick={() => !isActive && goToSlide(realIndex)}
                    className={`relative flex h-[360px] w-[350px] shrink-0 cursor-pointer flex-col justify-between border bg-[#070707] p-6 pt-7 transition-all duration-300 xl:h-[380px] xl:w-[380px] ${
                      isActive
                        ? 'z-20 border-[#f0ab44] opacity-100 shadow-[0_0_45px_rgba(240,171,68,0.10)]'
                        : 'z-10 border-[#f0ab44]/25 opacity-55 hover:opacity-80'
                    }`}
                  >
                    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center bg-[#f0ab44] font-serif text-lg font-bold text-black">
                      “
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="mb-7 flex items-center justify-center gap-1.5 text-xl text-[#f0ab44]">
                        {'★★★★★'.split('').map((star, starIndex) => (
                          <span key={starIndex}>{star}</span>
                        ))}
                      </div>
                      <p className="mx-auto flex max-w-[300px] flex-1 items-center justify-center text-center font-sans text-[13px] leading-[1.75] text-white xl:text-[14px]">
                        “{item.quote}”
                      </p>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <div className="flex items-center gap-3.5">
                        {item.avatar ? (
                          <img
                            src={item.avatar}
                            alt={item.author}
                            className="h-11 w-11 shrink-0 rounded-full border border-[#f0ab44]/45 object-cover"
                          />
                        ) : (
                          <div className="h-11 w-11 shrink-0 rounded-full border border-[#f0ab44]/45 bg-[#141414] flex items-center justify-center text-xs font-mono text-[#f0ab44]">
                            {item.author.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="truncate font-serif text-[13px] font-bold uppercase tracking-wide text-white xl:text-sm">
                            {item.author}
                          </h4>
                          <p className="mt-0.5 truncate font-sans text-[9px] uppercase tracking-[0.16em] text-[#f0ab44]">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </motion.div>

            <div className="mt-5 flex items-center gap-2.5">
              {testimonials.map((item, index) => (
                <button
                  key={`dot-${item.id}-${index}`}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index ? 'w-8 bg-[#f0ab44]' : 'w-2 bg-white/20 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </RevealRight>

          {/* Mobile */}
          <RevealZoom delay={0.12} className="mt-7 block w-full lg:hidden">
            <div className="relative h-[370px] w-full overflow-hidden">
              {testimonials.map((item, index) => {
                const offset = getOffset(index);
                if (offset < -1 || offset > 1) return null;
                return (
                  <motion.article
                    key={`mobile-${item.id}-${index}`}
                    initial={false}
                    animate={{
                      x: offset === -1 ? '-105%' : offset === 1 ? '105%' : '0%',
                      scale: offset === 0 ? 1 : 0.88,
                      opacity: offset === 0 ? 1 : 0.35,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => {
                      if (offset === -1) setActiveIndex((prev) => (prev - 1 + total) % total);
                      if (offset === 1) setActiveIndex((prev) => (prev + 1) % total);
                    }}
                    className={`absolute left-0 top-0 flex h-full w-full flex-col justify-between border bg-[#070707] p-6 ${
                      offset === 0 ? 'border-[#f0ab44]' : 'border-white/10'
                    }`}
                  >
                    <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center bg-[#f0ab44] font-serif text-lg font-bold text-black">“</div>
                    <div className="pt-3">
                      <div className="mb-7 text-lg text-[#f0ab44]">★★★★★</div>
                      <p className="text-left font-sans text-[13px] leading-[1.7] text-white">“{item.quote}”</p>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex items-center gap-3">
                        {item.avatar ? (
                          <img
                            src={item.avatar}
                            alt={item.author}
                            className="h-11 w-11 rounded-full border border-[#f0ab44]/45 object-cover"
                          />
                        ) : (
                          <div className="h-11 w-11 rounded-full border border-[#f0ab44]/45 bg-[#141414] flex items-center justify-center text-xs font-mono text-[#f0ab44]">
                            {item.author.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="truncate font-serif text-xs font-bold uppercase text-white">{item.author}</h4>
                          <p className="mt-0.5 truncate font-sans text-[9px] uppercase tracking-[0.15em] text-[#f0ab44]">{item.title}</p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-2.5">
              {testimonials.map((item, index) => (
                <button
                  key={`mob-dot-${item.id}-${index}`}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index ? 'w-8 bg-[#f0ab44]' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </RevealZoom>
        </div>
      </div>
    </section>
  );
}
