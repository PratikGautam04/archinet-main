'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import MobileMenu from './MobileMenu';
import BrandLogo from './BrandLogo';
import { motion } from 'framer-motion';
import { PREMIUM_EASE } from '../animations/motionVariants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: '14TH EDITION', href: '#edition-14' },
    { label: 'PAST EDITIONS', href: '#editions' },
    { label: 'LEADERS', href: '#leaders' },
    { label: 'TESTIMONIALS', href: '#testimonials' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: PREMIUM_EASE }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'bg-[#070707]/90 backdrop-blur-md border-b border-[rgba(240,171,68,0.15)] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="group transition-opacity hover:opacity-90" aria-label="Archinet home">
            <BrandLogo compact />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-mono tracking-widest text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--accent-gold)]/40 hover:border-[var(--accent-gold)] bg-transparent hover:bg-[var(--accent-gold)] text-white hover:text-[#070707] text-xs font-mono tracking-wider transition-all duration-300"
            >
              <span>REQUEST INVITATION</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 text-white hover:text-[var(--accent-gold)] transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

        </div>
      </motion.header>

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} navLinks={navLinks} />
    </>
  );
}

