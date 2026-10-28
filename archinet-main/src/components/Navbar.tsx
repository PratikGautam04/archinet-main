
'use client';

import React, { useState } from 'react';
import { Layers, Upload, Compass } from 'lucide-react';

interface NavbarProps {
  onOpenSubmit: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({
  onOpenSubmit,
  activeSection,
  setActiveSection,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks: { id: string; label: string }[] = [
    { id: 'vault', label: 'Blueprint Vault' },
    { id: 'viewer', label: 'Interactive CAD Inspector' },
    { id: 'studios', label: 'Architect Network' },
    { id: 'specs', label: 'Parametric Specs' },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full glass-panel border-b border-[var(--border-light)] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setActiveSection('vault')}
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-secondary)] border border-[rgba(215,180,107,0.3)] flex items-center justify-center shadow-lg group">
            <Layers className="w-5 h-5 text-[#D7B46B] transition-transform group-hover:rotate-12" />

            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D7B46B] pulse-node" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-wider text-white">
                ARCHI<span className="text-[#D7B46B]">NET</span>
              </span>

              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[rgba(215,180,107,0.1)] text-[#D7B46B] border border-[rgba(215,180,107,0.3)]">
                v2.4
              </span>
            </div>

            <p className="text-[11px] text-[var(--text-muted)] font-mono tracking-tight">
              STRUCTURAL MATRIX
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-secondary)] p-1.5 rounded-full border border-[var(--border-light)]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => setActiveSection(link.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 ${
                activeSection === link.id
                  ? 'bg-[#D7B46B] text-[#070a11] font-semibold shadow-[0_0_15px_rgba(215,180,107,0.25)]'
                  : 'text-[var(--text-secondary)] hover:text-[#D7B46B] hover:bg-[rgba(215,180,107,0.08)]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop Status and Submit Button */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(0,255,135,0.05)] border border-[rgba(0,255,135,0.2)] text-[11px] font-mono text-[var(--accent-emerald)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
            <span>NODE 07 :: SYDNEY ONLINE</span>
          </div>

          <button
            type="button"
            onClick={onOpenSubmit}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D7B46B] text-[#070a11] font-mono text-xs font-bold shadow-[0_0_20px_rgba(215,180,107,0.2)] hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>SUBMIT BLUEPRINT</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((previous) => !previous)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          className="md:hidden p-2 rounded-lg bg-[var(--bg-secondary)] text-white border border-[var(--border-light)] transition-colors duration-300 hover:border-[#D7B46B] hover:text-[#D7B46B]"
        >
          <Compass className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-[var(--border-light)] flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => {
                setActiveSection(link.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-2 rounded-lg text-xs font-mono transition-all duration-300 ${
                activeSection === link.id
                  ? 'bg-[#D7B46B] text-[#070a11] font-semibold'
                  : 'text-white hover:text-[#D7B46B] hover:bg-[rgba(215,180,107,0.08)]'
              }`}
            >
              {link.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              onOpenSubmit();
              setMobileMenuOpen(false);
            }}
            className="mt-2 w-full py-2.5 rounded-lg bg-[#D7B46B] text-[#070a11] font-mono text-xs font-bold transition-all duration-300 hover:brightness-105 active:scale-[0.98]"
          >
            SUBMIT BLUEPRINT
          </button>
        </div>
      )}
    </header>
  );
}
