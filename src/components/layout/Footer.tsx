'use client';

import React from 'react';
import {
  RevealTitle,
  RevealUp,
  StaggerContainer,
  StaggerItem,
} from '../animations/ScrollReveal';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-[var(--text-secondary)] py-16 px-6 lg:px-12 border-t border-[rgba(240,171,68,0.2)]">
      <StaggerContainer
        staggerChildren={0.15}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[rgba(255,255,255,0.08)]"
      >
        {/* Brand Column */}
        <StaggerItem direction="left" className="lg:col-span-2 flex flex-col gap-4">
          <a href="#" className="inline-flex w-fit transition-opacity hover:opacity-90" aria-label="Archinet home">
            <BrandLogo />
          </a>
          <p className="text-xs font-mono text-[var(--accent-gold)] tracking-widest uppercase font-semibold">
            WE BRIDGE THE GAP.
          </p>
          <p className="text-xs font-sans text-[var(--text-secondary)] max-w-sm leading-relaxed">
            The premier invitation-only architectural matrix connecting visionary global principals with world-class luxury interior & structural innovators.
          </p>
        </StaggerItem>

        {/* Explore Links */}
        <StaggerItem direction="up" className="flex flex-col gap-3 font-mono text-xs">
          <span className="text-white font-bold tracking-widest uppercase mb-1">EXPLORE</span>
          <a href="#about" className="hover:text-[var(--accent-gold)] transition-colors">About Summit</a>
          <a href="#edition-14" className="hover:text-[var(--accent-gold)] transition-colors">14th Edition Mumbai</a>
          <a href="#editions" className="hover:text-[var(--accent-gold)] transition-colors">Past Editions</a>
          <a href="#leaders" className="hover:text-[var(--accent-gold)] transition-colors">Industry Leaders</a>
          <a href="#testimonials" className="hover:text-[var(--accent-gold)] transition-colors">Attendee Words</a>
        </StaggerItem>

        {/* Contact Info */}
        <StaggerItem direction="up" className="flex flex-col gap-3 font-mono text-xs">
          <span className="text-white font-bold tracking-widest uppercase mb-1">CONTACT</span>
          <span>Mumbai: +91 (022) 4890 1200</span>
          <span>invitations@archinet.ai.studio</span>
          <span>The St. Regis, Lower Parel</span>
          <span>Mumbai, MH 400013, India</span>
        </StaggerItem>

      </StaggerContainer>

      <RevealUp className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[var(--text-muted)] gap-4">
        <span>© 2026 Riverstone Networking Services. All rights reserved.</span>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-sans text-[14px] sm:text-[15px] font-normal text-[#e5e2db]">Managed by</span>
          <img
            src="https://unicladsurface.com/_next/image?url=%2Fhome%2FSalesUpBlackBg.png&w=640&q=75"
            alt="SalesUp"
            className="h-6 sm:h-7 w-auto object-contain"
          />
        </div>
      </RevealUp>
    </footer>
  );
}
