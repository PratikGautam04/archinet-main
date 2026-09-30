'use client';

import React, { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
}

export default function MobileMenu({ isOpen, onClose, navLinks }: MobileMenuProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-[#070707] flex flex-col justify-between p-8 border-b border-[var(--accent-gold)]/20 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <BrandLogo compact />
        <button
          onClick={onClose}
          className="p-2 text-white hover:text-[var(--accent-gold)] transition-colors"
          aria-label="Close menu"
        >
          <X className="w-7 h-7" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-col gap-6 my-auto">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="font-serif text-3xl sm:text-4xl text-white hover:text-[var(--accent-gold)] transition-colors flex items-center justify-between group"
          >
            <span>{link.label}</span>
            <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent-gold)]" />
          </a>
        ))}
      </nav>

      {/* Bottom CTA */}
      <div className="pt-6 border-t border-[rgba(255,255,255,0.1)] flex flex-col gap-4">
        <a
          href="#contact"
          onClick={onClose}
          className="w-full py-3.5 rounded-full text-center bg-[var(--accent-gold)] text-[#070707] font-mono text-xs font-bold tracking-widest hover:brightness-110"
        >
          REQUEST AN INVITATION
        </a>
        <p className="text-center font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
          ARCHINET SUMMIT // 14TH EDITION · MUMBAI 2027
        </p>
      </div>

    </div>
  );
}
