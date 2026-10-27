
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { EVENT_DATA } from '../../data';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { ScrollReveal, RevealItem } from '../animations/ScrollReveal';
import { fadeUp } from '../animations/motionVariants';
import { MetadataField } from '../../types/metadata';
import { getFieldValue } from '../../utils/metadata';

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isReducedMotion: boolean;
}

function Word({
  word,
  index,
  total,
  progress,
  isReducedMotion,
}: WordProps) {
  const start = (index / total) * 0.75;
  const end = start + 0.25;

  const opacity = useTransform(progress, [start, end], [0.14, 1]);

  if (isReducedMotion) {
    return (
      <span className="inline-block mx-[0.15em] text-[#E8E1D5]">
        {word}
      </span>
    );
  }

  return (
    <motion.span
      style={{ opacity }}
      className="inline-block mx-[0.15em] text-[#E8E1D5] transition-opacity duration-150 select-none"
    >
      {word}
    </motion.span>
  );
}

interface IntroStatementProps {
  data?: MetadataField[];
}

export default function IntroStatement({ data }: IntroStatementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const updateReducedMotion = () => {
      setIsReducedMotion(mediaQuery.matches);
    };

    updateReducedMotion();
    mediaQuery.addEventListener('change', updateReducedMotion);

    return () => {
      mediaQuery.removeEventListener('change', updateReducedMotion);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 35%'],
  });

  const sectionLabel = 'OUR PURPOSE';

  const statement =
    getFieldValue(data, 'vision_statement') || EVENT_DATA.introStatement;

  const words = statement.split(/\s+/).filter(Boolean);

  return (
    <section
      ref={containerRef}
      className="w-full py-20 sm:py-28 lg:py-40 px-5 sm:px-8 lg:px-12 bg-black flex flex-col items-center justify-center text-center overflow-hidden border-b border-white/10"
    >
      <ScrollReveal className="w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Purpose Label */}
        <RevealItem variants={fadeUp}>
          <span className="block max-w-full text-sm sm:text-base font-sans tracking-[0.2em] sm:tracking-[0.3em] text-[#D9BC78] uppercase mb-7 sm:mb-10 font-bold text-center leading-relaxed">
            {sectionLabel}
          </span>
        </RevealItem>

        {/* Scroll-Driven Statement */}
        <h2 className="w-full max-w-4xl mx-auto font-serif text-xl min-[380px]:text-2xl sm:text-3xl lg:text-4xl text-[#E8E1D5] font-normal leading-[1.7] sm:leading-relaxed tracking-normal sm:tracking-tight uppercase text-center">
          <span className="text-[#D9BC78] opacity-70 mr-1">
            &ldquo;
          </span>

          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              word={word}
              index={i}
              total={words.length}
              progress={scrollYProgress}
              isReducedMotion={isReducedMotion}
            />
          ))}

          <span className="text-[#D9BC78] opacity-70 ml-1">
            &rdquo;
          </span>
        </h2>
      </ScrollReveal>
    </section>
  );
}
