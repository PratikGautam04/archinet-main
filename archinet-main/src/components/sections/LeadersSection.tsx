'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LEADERS_DATA, Leader } from '../../data';
import {
  RevealTitle,
  RevealLeft,
  RevealRight,
} from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import { getField, getFieldValue, getCardJsonData } from '../../utils/metadata';

interface LeadersSectionProps {
  data?: MetadataField[];
}

export default function LeadersSection({ data }: LeadersSectionProps) {
  const sectionLabel = getFieldValue(data, 'section_label') || 'KEYNOTE VISIONARIES';
  const title = getFieldValue(data, 'title');
  const description =
    getFieldValue(data, 'description') ||
    'DISTINGUISHED PRINCIPALS & CREATIVE DIRECTORS SHAPING GLOBAL SKYLINE DESIGN';

  // 1. Try single repeatable card field first (e.g. 'leader_deatils', 'leader_details', 'leaders', 'leader_list')
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
      .filter((l) => l.name || l.image);
  }

  // 2. Fallback to individual leader keys if repeatable card wasn't provided
  if (dynamicLeaders.length === 0) {
    const leaderKeys = ['leader_1', 'leader_2', 'leader_3', 'leader_4'];
    leaderKeys.forEach((key, idx) => {
      const field = getField(data, key);
      const cardData = getCardJsonData<Record<string, string>>(field);
      if (cardData && cardData.length > 0) {
        const item = cardData[0];
        if (item.name || item.title || item.image) {
          const fallback = LEADERS_DATA[idx % LEADERS_DATA.length];
          dynamicLeaders.push({
            id: `leader-${idx + 1}`,
            name: item.name || item.title || fallback.name,
            role: item.role || item.designation || fallback.role,
            company: item.company || item.organization || fallback.company,
            image: item.image || item.photo || fallback.image,
          });
        }
      }
    });
  }

  const leaders = dynamicLeaders.length > 0 ? dynamicLeaders : LEADERS_DATA;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const touchStartX = useRef<number | null>(null);
  const totalOriginal = leaders.length;
  // Duplicate array for seamless infinite looping
  const extendedLeaders = [...leaders, ...leaders];

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return totalOriginal - 1;
      }
      return prev - 1;
    });
  }, [totalOriginal]);

  // Seamless loop handler when reaching the cloned set boundary
  useEffect(() => {
    if (currentIndex >= totalOriginal) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500); // matches 500ms transition duration
      return () => clearTimeout(timer);
    }
  }, [currentIndex, totalOriginal]);

  // Auto-advance slide every 1 second unless paused on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section id="leaders" className="w-full py-20 lg:py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-14 gap-6 text-center lg:text-left">
          <div>
            <RevealTitle>
              <span className="text-xs font-mono tracking-[0.25em] text-[var(--accent-gold)] uppercase block mb-3 font-medium">
                {sectionLabel}
              </span>
            </RevealTitle>
            <RevealLeft delay={0.1}>
              {title ? (
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight whitespace-pre-line">
                  {title}
                </h2>
              ) : (
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight">
                  Our Industry <span className="editorial-italic">Leaders.</span>
                </h2>
              )}
            </RevealLeft>
          </div>

          <RevealRight delay={0.15}>
            <p className="text-xs font-mono text-[var(--text-muted)] tracking-wider max-w-xs uppercase text-center md:text-right">
              {description}
            </p>
          </RevealRight>
        </div>

        {/* Carousel Container Viewport */}
        <div
          className="relative w-full overflow-hidden select-none group py-4 [--card-step:calc(100%+1.25rem)] sm:[--card-step:calc(50%+0.625rem)] md:[--card-step:calc(33.3333%+0.4166rem)] lg:[--card-step:calc(20%+0.25rem)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Track moving strictly in 1 single horizontal row */}
          <div
            className="flex flex-nowrap gap-5 transition-transform ease-[cubic-bezier(0.25,1,0.35,1)]"
            style={{
              transform: `translateX(calc(-1 * ${currentIndex} * var(--card-step)))`,
              transitionDuration: isTransitioning ? '500ms' : '0ms',
            }}
          >
            {extendedLeaders.map((leader, idx) => (
              <div
                key={`${leader.id}-${idx}`}
                className="flex-none w-full sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2*1.25rem)/3)] lg:w-[calc((100%-4*1.25rem)/5)] group/card flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-3.5 border border-white/10 group-hover/card:border-[var(--accent-gold)] transition-colors duration-500 shadow-lg bg-black/40">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover/card:scale-105 grayscale group-hover/card:grayscale-0 contrast-110 group-hover/card:contrast-100 brightness-90 group-hover/card:brightness-100"
                    style={{
                      backgroundImage: leader.image ? `url('${leader.image}')` : undefined,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-75 group-hover/card:opacity-30 transition-opacity duration-500" />
                </div>

                <h3 className="font-serif text-lg text-white font-medium group-hover/card:text-[var(--accent-gold)] transition-colors truncate">
                  {leader.name}
                </h3>
                <p className="text-xs font-mono text-[var(--accent-gold)] font-medium mt-0.5 truncate uppercase tracking-wider">
                  {leader.role}
                </p>
                <p className="text-xs font-mono text-[var(--text-muted)] truncate">
                  {leader.company}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Progress Indicator Dots */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-6 max-w-sm mx-auto">
          {leaders.map((leader, idx) => {
            const activeDot = currentIndex % totalOriginal === idx;
            return (
              <button
                key={`dot-${leader.id}-${idx}`}
                type="button"
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeDot ? 'w-7 bg-[var(--accent-gold)]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to ${leader.name}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
