'use client';

import React from 'react';

interface BrandLogoProps {
  compact?: boolean;
  className?: string;
}

export default function BrandLogo({ compact = false, className = '' }: BrandLogoProps) {
  return (
    <span
      className={`inline-flex items-center ${className}`}
      aria-label="Archinet"
    >
      <img
        src="/assets/branding/archinet-official-logo.png"
        alt="Archinet — We Bridge the Gap"
        className={compact
          ? 'h-auto w-[112px] sm:w-[126px] object-contain'
          : 'h-auto w-[190px] sm:w-[220px] object-contain'}
      />
    </span>
  );
}
