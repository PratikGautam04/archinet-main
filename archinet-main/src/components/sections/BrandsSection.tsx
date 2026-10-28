
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

  let row1: string[] = ROW_1_BRANDS;
  let row2: string[] = ROW_2_BRANDS;

  // Use brand data from the Metadata API when available.
  if (dynamicBrands.length > 0) {
    const brandNames = dynamicBrands
      .map((brand) =>
        (brand.name || brand.brand || brand.title || '').trim()
      )
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

  // Duplicate the content for continuous marquee scrolling.
  const marqueeRow1 = [...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2];

  return (
    <section className="relative w-full overflow-hidden border-b border-white/10 bg-black py-20 font-sans text-[#AAA59B] sm:py-24 lg:py-28">
      {/* Section heading and introduction */}
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6">
        <div className="mb-14 w-full max-w-4xl text-center sm:mb-16">
          <RevealTitle>
            <h2
              className="whitespace-pre-line font-serif text-[48px] font-normal uppercase leading-[0.9] tracking-normal text-[#D7B46B] sm:text-[64px] lg:text-[88px]"
            >
              {title || (
                <>
                  THE COMPANY
                  <br />
                  WE KEEP.
                </>
              )}
            </h2>
          </RevealTitle>

          {/* Decorative divider */}
          <RevealZoom>
            <div className="my-8 flex items-center justify-center gap-5">
              <div className="h-px w-16 bg-[#D7B46B]/30 sm:w-24" />

              <span className="select-none font-serif text-base text-[#D7B46B]">
                ★
              </span>

              <div className="h-px w-16 bg-[#D7B46B]/30 sm:w-24" />
            </div>
          </RevealZoom>

          {/* Subtitle: Playfair Display, 30px, line-height 36px */}
          <RevealUp>
            <p className="font-serif text-[24px] font-normal italic leading-[36px] tracking-normal text-[#D7B46B] sm:text-[30px]">
              {subtitle}
            </p>
          </RevealUp>

          {/* Description: Manrope, 16px, line-height 24px */}
          <RevealUp>
            <p className="mt-4 font-sans text-[16px] font-normal leading-6 tracking-normal text-[#AAA59B]">
              {description}
            </p>
          </RevealUp>
        </div>
      </div>

      {/* Brand marquee */}
      <div className="relative flex w-full flex-col gap-8 overflow-hidden border-y border-white/[0.04] bg-[#050505] py-8 sm:gap-10 sm:py-10">
        {/* Left gradient fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#050505] to-transparent sm:w-32" />

        {/* Right gradient fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#050505] to-transparent sm:w-32" />

        {/* Row 1: moves left */}
        <div className="flex w-full overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex w-max shrink-0 items-center gap-8 pr-8 sm:gap-11 sm:pr-11"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
              duration: 30,
            }}
          >
            {marqueeRow1.map((brand, index) => (
              <span
                key={`row1-${brand}-${index}`}
                className="cursor-pointer select-none whitespace-nowrap font-serif text-[22px] font-normal uppercase leading-[36px] tracking-[3px] text-[#D7B46B]/40 transition-colors duration-300 hover:text-[#D7B46B] sm:text-[30px]"
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Row 2: moves right */}
        <div className="flex w-full overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex w-max shrink-0 items-center gap-8 pr-8 sm:gap-11 sm:pr-11"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
              duration: 35,
            }}
          >
            {marqueeRow2.map((brand, index) => (
              <span
                key={`row2-${brand}-${index}`}
                className="cursor-pointer select-none whitespace-nowrap font-serif text-[22px] font-normal uppercase leading-[36px] tracking-[3px] text-[#D7B46B]/40 transition-colors duration-300 hover:text-[#D7B46B] sm:text-[30px]"
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
