'use client';

import React from 'react';
import { GALLERY_IMAGES } from '../../data';
import { RevealZoom } from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import { getField, getFieldValue, getCardJsonData } from '../../utils/metadata';

interface GalleryStripProps {
  data?: MetadataField[];
}

export default function GalleryStrip({ data }: GalleryStripProps) {
  // 1. Try single repeatable card field first (e.g. 'gallery_image', 'gallery_images', 'gallery', 'image_list')
  const galleryField = getField(data, 'gallery_image', 'gallery_images', 'gallery', 'image_list');
  const galleryCardData = getCardJsonData<Record<string, string>>(galleryField);

  let dynamicImages: string[] = [];

  if (galleryCardData.length > 0) {
    dynamicImages = galleryCardData
      .map((item) => (item.gallery_image || item.image || item.url || item.src || '').trim())
      .filter((img) => img.length > 0);
  }

  // 2. Fallback to individual image keys if repeatable card wasn't provided
  if (dynamicImages.length === 0) {
    const imageKeys = ['image_1', 'image_2', 'image_3', 'image_4', 'image_5', 'image_6'];
    imageKeys.forEach((key, idx) => {
      const val = getFieldValue(data, key);
      if (val && val.trim().length > 0) {
        dynamicImages.push(val.trim());
      } else if (GALLERY_IMAGES[idx]) {
        dynamicImages.push(GALLERY_IMAGES[idx]);
      }
    });
  }

  const validImages = dynamicImages.filter((img) => typeof img === 'string' && img.trim().length > 0);
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
