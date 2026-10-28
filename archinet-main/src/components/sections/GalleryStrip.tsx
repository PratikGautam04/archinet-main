
'use client';

import React from 'react';
import { GALLERY_IMAGES } from '../../data';
import { MetadataField } from '../../types/metadata';
import {
  getField,
  getFieldValue,
  getCardJsonData,
} from '../../utils/metadata';

interface GalleryStripProps {
  data?: MetadataField[];
}

export default function GalleryStrip({ data }: GalleryStripProps) {
  // Read repeatable gallery cards from metadata.
  const galleryField = getField(
    data,
    'gallery_image',
    'gallery_images',
    'gallery',
    'image_list'
  );

  const galleryCardData = getCardJsonData<Record<string, string>>(
    galleryField
  );

  let dynamicImages: string[] = [];

  if (galleryCardData.length > 0) {
    dynamicImages = galleryCardData
      .map((item) =>
        (
          item.gallery_image ||
          item.image ||
          item.url ||
          item.src ||
          ''
        ).trim()
      )
      .filter((img) => img.length > 0);
  }

  // Fallback to individual image fields when no repeatable cards exist.
  if (dynamicImages.length === 0) {
    const imageKeys = [
      'image_1',
      'image_2',
      'image_3',
      'image_4',
      'image_5',
      'image_6',
    ];

    imageKeys.forEach((key, idx) => {
      const value = getFieldValue(data, key);

      if (value && value.trim().length > 0) {
        dynamicImages.push(value.trim());
      } else if (GALLERY_IMAGES[idx]) {
        dynamicImages.push(GALLERY_IMAGES[idx]);
      }
    });
  }

  const validImages = dynamicImages.filter(
    (img) => typeof img === 'string' && img.trim().length > 0
  );

  const images = validImages.length > 0 ? validImages : GALLERY_IMAGES;

  return (
    <section className="w-full bg-black overflow-hidden border-b border-[rgba(255,255,255,0.06)]">
     
{/* Static Heading - Exact Reference Typography */}
<div className="w-full px-6 pt-10 pb-10 sm:pt-12 sm:pb-10">
  <h3
    className="font-serif text-[60px] font-normal leading-[60px] tracking-[6px] text-center"
    style={{ color: '#0D0D0D' }}
  >
    SEE YOU IN THE ROOM.
  </h3>
</div>


     {/* Smooth Continuous Image Gallery */}
<div className="w-full overflow-hidden pb-8 sm:pb-10">
  <div className="flex w-max gap-4 sm:gap-5 animate-marquee">
    {[...images, ...images].map((imgUrl, idx) => (
      <div
        key={`${idx}-${imgUrl}`}
        className="w-[240px] sm:w-[300px] lg:w-[350px] aspect-[4/3] shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#111] transition-colors duration-500 hover:border-[#D7B46B]/60 group"
      >
        <div
          className="h-full w-full bg-cover bg-center grayscale brightness-90 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100"
          style={{
            backgroundImage: imgUrl ? `url('${imgUrl}')` : undefined,
          }}
        />
      </div>
    ))}
  </div>
</div>
    </section>
  );
}
