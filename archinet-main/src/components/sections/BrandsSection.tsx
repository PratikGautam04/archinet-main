'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RevealTitle, RevealUp, RevealZoom } from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import {
  getField,
  getFieldValue,
  getCardJsonData,
} from '../../utils/metadata';

const ROW_1_BRANDS = [
  'Magnum',
  'Galaxy Parking',
  'Glasarc',
  'Verbin & Arkos',
  'Veneto',
  'Ultavo',
  'Greatwhite',
  'Supreme Petrochem',
  'Laze',
  'Pare',
  'Abrado',
  'Dona Modular',
  'Nugreen',
  'Jaipur Rugs',
  'JSW Avante',
  'Assa Abloy',
  'Changi',
  'Loom Craft',
  'Hastens',
  'Fenesta',
  'Red Card',
];

const ROW_2_BRANDS = [
  'Wadbros',
  'Baaya',
  'Expert',
  'Space Of Joy',
  'MCM',
  'Wipro North West',
  'Beyond alliance',
  'TOTO',
  'The Stone Casa',
  'OSUM',
  'Arte Di Lusso',
  'Colour Coats Inhouz',
  'Kuche 7',
  'Hunter Douglas',
  'Nexion',
  'Hybec',
  'Siemens',
  'Legrand',
  'Marshalls',
  'Vihan',
];

interface BrandsSectionProps {
  data?: MetadataField[];
}

export default function BrandsSection({ data }: BrandsSectionProps) {
  const title = getFieldValue(data, 'title');

  const subtitle =
    getFieldValue(data, 'subtitle') ||
    'A legacy built with brands that shape the spaces we live in.';

  const description =
    getFieldValue(data, 'description') ||
    'A selection of brands that have partnered with Archinet™ across thirteen editions.';

  const brandListField = getField(data, 'brand_list');

  const dynamicBrands =
    getCardJsonData<Record<string, string>>(brandListField);

  let row1 = ROW_1_BRANDS;
  let row2 = ROW_2_BRANDS;

  // Use Metadata API brand data when available
  if (dynamicBrands.length > 0) {
    const brandNames = dynamicBrands
      .map((brand) => brand.name || brand.brand || brand.title || '')
      .filter((name) => name.length > 0);

    if (brandNames.length > 0) {
      const half = Math.ceil(brandNames.length / 2);

      row1 = brandNames.slice(0, half);
      row2 = brandNames.slice(half);

      if (row2.length === 0) {
        row2 = row1;
      }
    }
  }

  /*
   * Duplicate the rows so the marquee can continuously move.
   * We use two copies instead of repeatedly generating more elements.
   */
  const marqueeRow1 = [...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2];

  return (
    <section className="w-full py-20 lg:py-28 bg-[#050505] border-b border-white/10 overflow-hidden relative">
      
      {/* =========================
          SECTION HEADER
      ========================== */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="text-center max-w-3xl mb-14 sm:mb-16">

          <RevealTitle>
            {title ? (
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#f0ab44] tracking-tight leading-[1.06] uppercase whitespace-pre-line">
                {title}
              </h2>
            ) : (
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#f0ab44] tracking-tight leading-[1.06] uppercase">
                THE COMPANY
                <br />
                WE KEEP.
              </h2>
            )}
          </RevealTitle>

          {/* Divider */}
          <RevealZoom delay={0.1}>
            <div className="flex items-center justify-center gap-4 my-6">
              <div className="w-16 sm:w-24 h-px bg-[#f0ab44]/30" />

              <span className="text-xs text-[#f0ab44] select-none">
                ★
              </span>

              <div className="w-16 sm:w-24 h-px bg-[#f0ab44]/30" />
            </div>
          </RevealZoom>

          {/* Main subtitle */}
          <RevealUp delay={0.2}>
            <p className="font-serif italic text-lg sm:text-2xl text-white font-normal tracking-wide leading-relaxed">
              {subtitle}
            </p>
          </RevealUp>

          {/* Description */}
          <RevealUp delay={0.4}>
            <p className="text-[11px] sm:text-xs font-mono text-[#d7d4ce] tracking-wider mt-3">
              {description}
            </p>
          </RevealUp>

        </div>
      </div>

      {/* =========================
          BRAND MARQUEE
      ========================== */}
      <div className="w-full bg-[#050505] py-7 sm:py-9 relative overflow-hidden flex flex-col gap-6 sm:gap-8">

        {/* Left fade */}
        <div
          className="
            absolute
            left-0
            top-0
            bottom-0
            w-20
            sm:w-40
            z-20
            bg-gradient-to-r
            from-[#050505]
            to-transparent
            pointer-events-none
          "
        />

        {/* Right fade */}
        <div
          className="
            absolute
            right-0
            top-0
            bottom-0
            w-20
            sm:w-40
            z-20
            bg-gradient-to-l
            from-[#050505]
            to-transparent
            pointer-events-none
          "
        />

        {/* =========================
            ROW 1 — LEFT
        ========================== */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex shrink-0 items-center gap-8 sm:gap-11 pr-8 sm:pr-11"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',

              // MEDIUM-FAST SPEED
              duration: 30,
            }}
          >
            {marqueeRow1.map((brand, index) => (
              <span
                key={`row1-${brand}-${index}`}
                className="
                  font-serif
                  text-base
                  sm:text-lg
                  md:text-xl
                  text-[#f0ab44]/80
                  hover:text-[#f0ab44]
                  tracking-[0.24em]
                  font-light
                  uppercase
                  transition-colors
                  cursor-pointer
                  select-none
                "
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>

        {/* =========================
            ROW 2 — RIGHT
        ========================== */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex shrink-0 items-center gap-8 sm:gap-11 pr-8 sm:pr-11"
            animate={{
              x: ['-50%', '0%'],
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',

              // MEDIUM-FAST SPEED
              duration: 35,
            }}
          >
            {marqueeRow2.map((brand, index) => (
              <span
                key={`row2-${brand}-${index}`}
                className="
                  font-serif
                  text-base
                  sm:text-lg
                  md:text-xl
                  text-[#f0ab44]/80
                  hover:text-[#f0ab44]
                  tracking-[0.24em]
                  font-light
                  uppercase
                  transition-colors
                  cursor-pointer
                  select-none
                "
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}