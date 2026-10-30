
'use client';

import React, { useEffect, useState } from 'react';
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
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;

    const iosDevice =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    setIsIOS(iosDevice);
  }, []);

  return (
    <section
      className={`relative w-full overflow-clip bg-black ${className}`}
      style={{ minHeight }}
    >
      {/* Background Layer */}
      {isIOS ? (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0 pointer-events-none"
          style={{ backgroundImage: `url('${image}')` }}
        />
      )}

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
