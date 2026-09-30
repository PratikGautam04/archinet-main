'use client';

import React, { useState } from 'react';
import { Layers, Activity, Cpu, Upload, Compass, Search } from 'lucide-react';

interface NavbarProps {
  onOpenSubmit: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ onOpenSubmit, activeSection, setActiveSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'vault', label: 'Blueprint Vault' },
    { id: 'viewer', label: 'Interactive CAD Inspector' },
    { id: 'studios', label: 'Architect Network' },
    { id: 'specs', label: 'Parametric Specs' },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full glass-panel border-b border-[var(--border-light)] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('vault')}>
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-secondary)] border border-[var(--border-glow)] flex items-center justify-center shadow-lg group">
            <Layers className="w-5 h-5 text-[var(--accent-cyan)] transition-transform group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[var(--accent-cyan)] pulse-node" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-wider text-white">ARCHI<span className="text-[var(--accent-cyan)]">NET</span></span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[rgba(0,240,255,0.1)] text-[var(--accent-cyan)] border border-[rgba(0,240,255,0.3)]">v2.4</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] font-mono tracking-tight">STRUCTURAL MATRIX</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-secondary)] p-1.5 rounded-full border border-[var(--border-light)]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveSection(link.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
                activeSection === link.id
                  ? 'bg-[var(--accent-cyan)] text-[#070a11] font-semibold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Status & Action CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(0,255,135,0.05)] border border-[rgba(0,255,135,0.2)] text-[11px] font-mono text-[var(--accent-emerald)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
            <span>NODE 07 :: SYDNEY ONLINE</span>
          </div>

          <button
            onClick={onOpenSubmit}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--accent-cyan)] to-[#00a8ff] text-[#070a11] font-mono text-xs font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>SUBMIT BLUEPRINT</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[var(--bg-secondary)] text-white border border-[var(--border-light)]"
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
              onClick={() => {
                setActiveSection(link.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left px-4 py-2 rounded-lg text-xs font-mono ${
                activeSection === link.id ? 'bg-[var(--accent-cyan)] text-[#070a11]' : 'text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenSubmit();
              setMobileMenuOpen(false);
            }}
            className="mt-2 w-full py-2.5 rounded-lg bg-[var(--accent-cyan)] text-[#070a11] font-mono text-xs font-bold"
          >
            SUBMIT BLUEPRINT
          </button>
        </div>
      )}
    </header>
  );
}
