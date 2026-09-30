'use client';

import React, { useState } from 'react';
import { ShieldCheck, MapPin, Award, Users, ArrowUpRight, CheckCircle, MessageSquare } from 'lucide-react';
import { ScrollReveal, RevealItem, RevealGroup } from './animations/ScrollReveal';
import { fadeLeft, fadeRight, cardReveal } from './animations/motionVariants';

interface Studio {
  id: string;
  name: string;
  location: string;
  specialty: string;
  projectsCount: number;
  members: number;
  verified: boolean;
  avatarColor: string;
  featuredDesign: string;
}

const STUDIOS_DATA: Studio[] = [
  {
    id: 'studio-01',
    name: 'Vance & Partners Structural',
    location: 'London, UK / Tokyo, JP',
    specialty: 'Aerodynamic Supertall High-Rise',
    projectsCount: 42,
    members: 18,
    verified: true,
    avatarColor: '#00F0FF',
    featuredDesign: 'Aero-Dynamic Helix Tower'
  },
  {
    id: 'studio-02',
    name: 'Spatial Bio-Labs',
    location: 'Kyoto, Japan',
    specialty: 'Biophilic Timber & Regenerative Shells',
    projectsCount: 29,
    members: 12,
    verified: true,
    avatarColor: '#00FF87',
    featuredDesign: 'Solaris Biophilic Pavilion'
  },
  {
    id: 'studio-03',
    name: 'Zaha Computational Matrix',
    location: 'Zurich, Switzerland',
    specialty: 'Parametric Generative Surfaces',
    projectsCount: 64,
    members: 35,
    verified: true,
    avatarColor: '#FF9F1C',
    featuredDesign: 'Voxel Parametric Auditorium'
  },
  {
    id: 'studio-04',
    name: 'Thorne Heavy Civil',
    location: 'Berlin, Germany',
    specialty: 'Subterranean Transit & Mega-Infrastructure',
    projectsCount: 51,
    members: 24,
    verified: true,
    avatarColor: '#9D4EDD',
    featuredDesign: 'Hyperloop Transit Terminal Zero'
  }
];

export default function ArchitectsNetwork() {
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);

  return (
    <section id="studios" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-light)]">
      
      {/* Section Header */}
      <ScrollReveal staggerChildren={0.1} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <RevealItem variants={fadeLeft}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-cyan">GLOBAL MESH DIRECTORY</span>
              <span className="text-xs font-mono text-[var(--text-muted)]">// VERIFIED ARCHITECTURAL NODES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Leading Studios & <span className="text-gradient-cyan">Architectural Nodes</span>
            </h2>
          </div>
        </RevealItem>
        <RevealItem variants={fadeRight}>
          <p className="text-xs text-[var(--text-secondary)] font-mono max-w-sm">
            Collaborate with accredited architectural firms, share parametric code, and peer-verify BIM structural models.
          </p>
        </RevealItem>
      </ScrollReveal>

      {/* Studio Cards Grid */}
      <RevealGroup staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STUDIOS_DATA.map((studio) => (
          <RevealItem
            key={studio.id}
            variants={cardReveal}
            className="glass-panel-interactive rounded-2xl p-5 border border-[var(--border-light)] flex flex-col justify-between"
          >
            <div>
              {/* Studio Avatar Header */}
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-[#070a11] font-mono font-extrabold text-lg shadow-lg"
                  style={{ backgroundColor: studio.avatarColor }}
                >
                  {studio.name.slice(0, 2).toUpperCase()}
                </div>
                {studio.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[rgba(0,255,135,0.1)] text-[var(--accent-emerald)] border border-[rgba(0,255,135,0.3)]">
                    <ShieldCheck className="w-3 h-3" /> VERIFIED NODE
                  </span>
                )}
              </div>

              {/* Studio Title */}
              <h3 className="text-base font-bold text-white mb-1">{studio.name}</h3>
              <p className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1 mb-3">
                <MapPin className="w-3 h-3 text-[var(--accent-cyan)]" /> {studio.location}
              </p>

              <div className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-light)] mb-4">
                <span className="text-[9px] font-mono text-[var(--text-muted)] block">SPECIALTY FOCUS</span>
                <span className="text-xs font-mono text-white font-medium">{studio.specialty}</span>
              </div>
            </div>

            {/* Studio Metrics & Action */}
            <div className="pt-3 border-t border-[var(--border-light)]">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] mb-3">
                <span>{studio.projectsCount} BLUEPRINTS</span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[var(--accent-cyan)]" /> {studio.members} ENGINEERS
                </span>
              </div>

              <button
                onClick={() => setSelectedStudio(studio)}
                className="w-full py-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[rgba(0,240,255,0.15)] hover:border-[var(--accent-cyan)] text-white text-xs font-mono border border-[var(--border-light)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>CONNECT WITH STUDIO</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </RevealItem>
        ))}
      </RevealGroup>

      {/* Studio Contact Modal */}
      {selectedStudio && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md glass-panel p-6 rounded-2xl border border-[var(--border-glow)] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-light)] mb-4">
              <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[var(--accent-cyan)]" />
                Peer Connection // {selectedStudio.name}
              </h3>
              <button
                onClick={() => setSelectedStudio(null)}
                className="text-xs font-mono text-white hover:text-[var(--accent-cyan)]"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
              Send an encrypted structural inquiry or BIM collaboration request directly to the engineering team at <strong className="text-white">{selectedStudio.name}</strong>.
            </p>

            <div className="flex flex-col gap-3 mb-4">
              <input
                type="text"
                placeholder="Your Studio Name / License ID"
                className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-light)] text-xs font-mono text-white focus:outline-none focus:border-[var(--accent-cyan)]"
              />
              <textarea
                rows={3}
                placeholder="Describe your architectural inquiry or joint project proposal..."
                className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-light)] text-xs font-mono text-white focus:outline-none focus:border-[var(--accent-cyan)]"
              />
            </div>

            <button
              onClick={() => {
                alert(`Inquiry transmitted to ${selectedStudio.name} node successfully!`);
                setSelectedStudio(null);
              }}
              className="w-full py-2.5 rounded-xl bg-[var(--accent-cyan)] text-[#070a11] font-mono text-xs font-bold hover:brightness-110"
            >
              TRANSMIT NODE INQUIRY
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
