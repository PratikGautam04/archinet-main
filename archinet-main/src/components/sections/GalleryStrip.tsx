'use client';

import React from 'react';
import { GALLERY_IMAGES } from '../../data';
import { RevealZoom } from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import { getFieldValue } from '../../utils/metadata';

interface GalleryStripProps {
  data?: MetadataField[];
}

export default function GalleryStrip({ data }: GalleryStripProps) {
  const imageKeys = ['image_1', 'image_2', 'image_3', 'image_4', 'image_5', 'image_6'];
  const apiImages: string[] = [];

  imageKeys.forEach((key, idx) => {
    const val = getFieldValue(data, key);
    if (val && val.trim().length > 0) {
      apiImages.push(val.trim());
    } else if (GALLERY_IMAGES[idx]) {
      apiImages.push(GALLERY_IMAGES[idx]);
    }
  });

  const validImages = apiImages.filter((img) => typeof img === 'string' && img.trim().length > 0);
  const images = validImages.length > 0 ? validImages : GALLERY_IMAGES;

  return (
    <section className="w-full py-12 bg-[#050505] overflow-hidden border-b border-[rgba(255,255,255,0.06)]">
      <RevealZoom className="w-full">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {images.map((imgUrl, idx) => (
            <div
              key={idx}
              className="w-72 sm:w-96 aspect-[16/10] shrink-0 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.12)] group hover:border-[var(--accent-gold)] transition-colors duration-500 bg-[#111]"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 brightness-90 group-hover:brightness-100"
                style={{
                  backgroundImage: imgUrl ? `url('${imgUrl}')` : undefined,
                }}
              />
            </div>
          ))}
          {images.map((imgUrl, idx) => (
            <div
              key={`dup-${idx}`}
              className="w-72 sm:w-96 aspect-[16/10] shrink-0 rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.12)] group hover:border-[var(--accent-gold)] transition-colors duration-500 bg-[#111]"
            >
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 brightness-90 group-hover:brightness-100"
                style={{
                  backgroundImage: imgUrl ? `url('${imgUrl}')` : undefined,
                }}
              />
            </div>
          ))}
        </div>
      </RevealZoom>
    </section>
  );
}
