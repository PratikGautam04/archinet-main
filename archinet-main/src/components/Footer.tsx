'use client';

import React from 'react';
import { Layers, ShieldCheck, Cpu, Globe, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full glass-panel border-t border-[var(--border-light)] mt-20 py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        
        {/* Brand & Mission */}
        <div className="flex flex-col gap-3 max-w-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-glow)] flex items-center justify-center">
              <Layers className="w-4 h-4 text-[var(--accent-cyan)]" />
            </div>
            <span className="font-extrabold text-lg tracking-wider text-white">ARCHI<span className="text-[var(--accent-cyan)]">NET</span></span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-mono">
            The next-generation architectural intelligence platform. Empowering global design firms with open-source vector CAD inspection, parametric BIM data, and structural matrix collaboration.
          </p>
        </div>

        {/* Matrix Standards & Network Status */}
        <div className="flex flex-col gap-2 font-mono text-xs text-[var(--text-secondary)]">
          <span className="text-white font-bold tracking-wider text-xs mb-1">COMPLIANCE & STANDARDS</span>
          <span className="flex items-center gap-2 text-[var(--accent-cyan)]">
            <ShieldCheck className="w-3.5 h-3.5" /> ISO 16739-1:2018 (IFC)
          </span>
          <span>openBIM® Alliance Standard</span>
          <span>GBXML Energy Calculation Protocol</span>
          <span>CoBie Asset Management Mesh</span>
        </div>

        {/* Telemetry Footer Info */}
        <div className="flex flex-col gap-2 font-mono text-xs text-[var(--text-secondary)]">
          <span className="text-white font-bold tracking-wider text-xs mb-1">NETWORK INFRASTRUCTURE</span>
          <span className="flex items-center gap-2 text-[var(--accent-emerald)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
            ALL NODES OPERATIONAL (100.0%)
          </span>
          <span>LATENCY: 14ms (EDGE CANVAS)</span>
          <span>ENCRYPTION: AES-256 PARALLEL</span>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-[var(--border-light)] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[var(--text-muted)] gap-4">
        <span>© {new Date().getFullYear()} ARCHINET STRUCTURAL MATRIX. ALL RIGHTS RESERVED.</span>
        <span className="flex items-center gap-1">
          ENGINEERED WITH NEXT.JS 15 & VECTOR INTELLIGENCE
        </span>
      </div>
    </footer>
  );
}
