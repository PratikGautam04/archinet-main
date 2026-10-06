'use client';

import React, { useEffect, useRef, useState } from 'react';
import { STATISTICS_DATA } from '../../data';
import { StaggerContainer, StaggerItem } from '../animations/ScrollReveal';
import { useInView, animate, motion } from 'framer-motion';
import { MetadataField } from '../../types/metadata';
import { getField, getCardJsonData } from '../../utils/metadata';

function CountNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  // once: false ensures the countdown / count-up motion re-triggers every time user scrolls to section
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Extract number and suffix, e.g. "2500+" -> number: 2500, suffix: "+"
  const match = value.match(/(\d+)/);
  const targetNumber = match ? parseInt(match[0], 10) : 0;
  const suffix = match ? value.replace(match[0], '') : '';

  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setCurrentNumber(0);
      return;
    }

    // Smooth counting motion from 0 to target number
    const controls = animate(0, targetNumber, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setCurrentNumber(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, targetNumber]);

  return (
    <motion.span
      ref={ref}
      animate={{
        scale: isInView ? [0.85, 1.05, 1] : 0.85,
        opacity: isInView ? 1 : 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="font-serif text-5xl sm:text-7xl font-light text-[var(--accent-gold)] leading-none mb-3 inline-block tracking-tight drop-shadow-[0_0_20px_rgba(240,171,68,0.3)]"
    >
      {currentNumber}
      {suffix}
    </motion.span>
  );
}

interface StatisticsSectionProps {
  data?: MetadataField[];
}

export default function StatisticsSection({ data }: StatisticsSectionProps) {
  // 1. Try single repeatable card field first (e.g. 'statistic', 'statistics', 'statistic_details', 'statistic_list')
  const statField = getField(data, 'statistic', 'statistics', 'statistic_details', 'statistic_list');
  const statCardData = getCardJsonData<Record<string, string>>(statField);

  let dynamicStats: { value: string; label: string }[] = [];

  if (statCardData.length > 0) {
    dynamicStats = statCardData
      .map((item) => ({
        value: item.value || item.count || item.number || '',
        label: item.label || item.title || item.name || '',
      }))
      .filter((s) => s.value || s.label);
  }

  // 2. Fallback to individual stat keys if repeatable card wasn't provided
  if (dynamicStats.length === 0) {
    const statKeys = ['statistic_1', 'statistic_2', 'statistic_3', 'statistic_4'];
    statKeys.forEach((key) => {
      const field = getField(data, key);
      const cardData = getCardJsonData<Record<string, string>>(field);
      if (cardData && cardData.length > 0) {
        const item = cardData[0];
        if (item.value || item.count || item.number) {
          dynamicStats.push({
            value: item.value || item.count || item.number || '',
            label: item.label || item.title || item.name || '',
          });
        }
      }
    });
  }

  const stats = dynamicStats.length > 0 ? dynamicStats : STATISTICS_DATA;

  return (
    <section className="w-full py-24 bg-[#070707] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <StaggerContainer
          staggerChildren={0.2}
          once={false}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, idx) => (
            <StaggerItem
              key={`${stat.label}-${idx}`}
              direction="up"
              className="flex flex-col items-center text-center"
            >
              <CountNumber value={stat.value} />
              <span className="text-[11px] font-mono text-[var(--text-secondary)] tracking-[0.2em] uppercase max-w-[180px] mt-2 font-medium">
                {stat.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
