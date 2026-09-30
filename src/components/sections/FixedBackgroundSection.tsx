'use client';

import React from 'react';
import { ScrollReveal } from '../animations/ScrollReveal';

export interface FixedBackgroundSectionProps {
  image: string;
  children?: React.ReactNode;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  minHeight?: string;
}

export default function FixedBackgroundSection({
  image,
  children,
  className = '',
  overlay = true,
  overlayOpacity = 0.15,
  minHeight = '120vh',
}: FixedBackgroundSectionProps) {
  return (
    <section
      className={`relative w-full overflow-clip bg-[#050505] ${className}`}
      style={{ minHeight }}
    >
      {/* Fixed Background Layer (bg-fixed / background-attachment: fixed) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0 pointer-events-none"
        style={{ backgroundImage: `url('${image}')` }}
      />

      {/* Configurable Dark Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-black z-[1] pointer-events-none transition-opacity duration-300"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Foreground Content Layer */}
      <ScrollReveal className="relative z-10 w-full min-h-full flex flex-col justify-center items-center py-12">
        {children}
      </ScrollReveal>
    </section>
  );
}

