'use client';

import React from 'react';
import { Box, Sparkles, Sliders, Database, ArrowRight, ShieldCheck, Activity, Eye } from 'lucide-react';

interface HeroSectionProps {
  onExploreVault: () => void;
  onLaunchInspector: () => void;
}

export default function HeroSection({ onExploreVault, onLaunchInspector }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 px-4 lg:px-8 max-w-7xl mx-auto">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.15),transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(255,159,28,0.1),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Heading & Copy */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel border-[var(--border-glow)] w-fit">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] pulse-node" />
            <span className="text-xs font-mono text-[var(--accent-cyan)] font-medium">ARCHITECTURAL MATRIX // NEXT-GEN VECTOR VAULT</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,255,255,0.06)] text-[var(--text-secondary)] font-mono">BIM 4.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Global Architectural <br />
            <span className="text-gradient-cyan">Vector Intelligence</span> & <br />
            <span className="text-gradient-amber">Structural Matrix</span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            ArchiNet connects architects, structural engineers, and parametric designers worldwide. Inspect live CAD vectors, analyze BIM layers, and collaborate on ultra-precision architectural blueprints.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onLaunchInspector}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[var(--accent-cyan)] to-[#00b4d8] text-[#070a11] font-mono text-sm font-bold shadow-[0_0_30px_rgba(0,240,255,0.35)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>LAUNCH CAD INSPECTOR</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreVault}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl glass-panel-interactive text-white font-mono text-sm font-medium border border-[var(--border-light)] hover:border-[var(--border-glow)] cursor-pointer"
            >
              <Database className="w-4 h-4 text-[var(--accent-amber)]" />
              <span>BROWSE BLUEPRINT VAULT</span>
            </button>
          </div>

          {/* Metrics Telemetry Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[var(--border-light)] mt-4">
            <div>
              <p className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider">BLUEPRINTS</p>
              <p className="text-xl font-mono font-bold text-white tracking-tight">14,280+</p>
              <p className="text-[10px] text-[var(--accent-emerald)] font-mono">+180 this week</p>
            </div>
            <div>
              <p className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider">VERIFIED STUDIOS</p>
              <p className="text-xl font-mono font-bold text-[var(--accent-cyan)] tracking-tight">840 Studio</p>
              <p className="text-[10px] text-[var(--text-muted)] font-mono">Global Mesh</p>
            </div>
            <div>
              <p className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider">CAD LAYERS</p>
              <p className="text-xl font-mono font-bold text-white tracking-tight">99.8%</p>
              <p className="text-[10px] text-[var(--accent-amber)] font-mono">BIM Standard</p>
            </div>
            <div>
              <p className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider">NODE COMPUTE</p>
              <p className="text-xl font-mono font-bold text-[var(--accent-emerald)] tracking-tight">12.4 TFLOPS</p>
              <p className="text-[10px] text-[var(--text-muted)] font-mono">Active Rendering</p>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Blueprint Holographic Preview */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl glass-panel p-5 border border-[var(--border-glow)] shadow-2xl overflow-hidden group">
            
            {/* Header Telemetry */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-light)] mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-emerald)]" />
                <span className="font-mono text-xs font-semibold text-white">SYSTEM // LIVE CAD DISPLAY</span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[rgba(0,240,255,0.1)] text-[var(--accent-cyan)] border border-[rgba(0,240,255,0.2)]">
                MODEL ID #AZ-9902
              </span>
            </div>

            {/* Interactive Blueprint Vector Simulation Box */}
            <div className="relative aspect-square rounded-xl bg-[#04070e] border border-[rgba(0,240,255,0.2)] overflow-hidden p-4 flex flex-col justify-between">
              
              {/* Animated Radar Scanning Line Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,240,255,0.15)] to-transparent h-20 animate-radar pointer-events-none" />

              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.08)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              {/* Architectural Blueprint SVG Graphics */}
              <svg className="w-full h-full text-[var(--accent-cyan)] z-10 opacity-90" viewBox="0 0 400 400" fill="none" stroke="currentColor">
                {/* Structural Outer Grid */}
                <rect x="30" y="30" width="340" height="340" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
                <rect x="60" y="60" width="280" height="280" strokeWidth="2" />
                
                {/* Internal Rooms Partition */}
                <path d="M 60 180 L 340 180" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 190 60 L 190 340" strokeWidth="1.5" />
                <path d="M 190 240 L 340 240" strokeWidth="1.5" strokeDasharray="4 2" />
                
                {/* Structural Columns / Beams (Emerald & Cyan Nodes) */}
                <circle cx="60" cy="60" r="5" fill="#00FF87" />
                <circle cx="340" cy="60" r="5" fill="#00FF87" />
                <circle cx="60" cy="340" r="5" fill="#00FF87" />
                <circle cx="340" cy="340" r="5" fill="#00FF87" />
                <circle cx="190" cy="180" r="6" fill="#00F0FF" className="animate-ping" />

                {/* Stairwell Arc & Radius Curves */}
                <path d="M 60 120 A 60 60 0 0 1 120 60" stroke="#FF9F1C" strokeWidth="2" strokeDasharray="2 2" />
                <path d="M 60 140 A 80 80 0 0 1 140 60" stroke="#FF9F1C" strokeWidth="1.5" strokeDasharray="2 2" />

                {/* Dimension Arrows */}
                <line x1="60" y1="20" x2="340" y2="20" stroke="#8A99AD" strokeWidth="1" />
                <text x="180" y="16" fill="#00F0FF" fontSize="12" fontFamily="monospace" textAnchor="middle">48.50 METERS</text>
                
                <line x1="380" y1="60" x2="380" y2="340" stroke="#8A99AD" strokeWidth="1" />
                <text x="385" y="200" fill="#FF9F1C" fontSize="12" fontFamily="monospace" writingMode="tb">32.20M</text>
              </svg>

              {/* Floating Layer Controls Badge */}
              <div className="relative z-20 flex items-center justify-between bg-[rgba(10,15,26,0.85)] backdrop-blur-md p-3 rounded-lg border border-[var(--border-light)]">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-secondary)]">
                  <Activity className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                  <span>HVAC + ELECTRICAL LOAD: OPTIMAL</span>
                </div>
                <button
                  onClick={onLaunchInspector}
                  className="px-2.5 py-1 rounded bg-[var(--accent-cyan)] text-[#070a11] font-mono text-[10px] font-bold hover:brightness-110"
                >
                  INSPECT LAYER
                </button>
              </div>

            </div>

            {/* Spec Footer */}
            <div className="mt-4 flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
              <span>PROJECT: HYPERION TOWER</span>
              <span>SCALE 1:100</span>
              <span className="text-[var(--accent-cyan)] font-semibold">IFC 4.3 READY</span>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
