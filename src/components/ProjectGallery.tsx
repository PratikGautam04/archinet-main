'use client';

import React, { useState } from 'react';
import { Search, Filter, Layers, ExternalLink, ShieldCheck, Download, Eye, Award, Maximize2 } from 'lucide-react';
import { ScrollReveal, RevealItem, RevealGroup } from './animations/ScrollReveal';
import { fadeLeft, fadeRight, cardReveal } from './animations/motionVariants';

interface Project {
  id: string;
  title: string;
  category: 'High-Rise' | 'Sustainable' | 'Parametric' | 'Infrastructure' | 'Interior Matrix';
  architect: string;
  studio: string;
  year: string;
  area: string;
  materials: string;
  format: string;
  rating: number;
  previewColor: string;
  description: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-01',
    title: 'Aero-Dynamic Helix Tower',
    category: 'High-Rise',
    architect: 'Elena Vance',
    studio: 'Vance & Partners Structural',
    year: '2026',
    area: '124,000 m²',
    materials: 'Photovoltaic Glass, Titanium Mesh',
    format: 'IFC 4.3 / RVT 2026',
    rating: 4.9,
    previewColor: '#00F0FF',
    description: 'Ultra-tall residential tower featuring self-regulating aerofoils and carbon-fiber lattice exoskeleton.'
  },
  {
    id: 'proj-02',
    title: 'Solaris Biophilic Pavilion',
    category: 'Sustainable',
    architect: 'Kenzo Takahashi',
    studio: 'Spatial Bio-Labs',
    year: '2025',
    area: '18,500 m²',
    materials: 'Cross-Laminated Timber, Mycelium Insulation',
    format: 'DWG / STEP 3D',
    rating: 4.95,
    previewColor: '#00FF87',
    description: 'Zero-carbon public pavilion utilizing passive airflow thermodynamics and living flora bio-facades.'
  },
  {
    id: 'proj-03',
    title: 'Voxel Parametric Auditorium',
    category: 'Parametric',
    architect: 'Zaha Studio Group',
    studio: 'Zaha Computational Matrix',
    year: '2026',
    area: '42,000 m²',
    materials: 'GFRC Panels, Recycled Aluminum',
    format: 'RVT / Grasshopper Script',
    rating: 4.88,
    previewColor: '#FF9F1C',
    description: 'Acoustically optimized curvilinear concert hall generated via generative acoustic ray-tracing algorithms.'
  },
  {
    id: 'proj-04',
    title: 'Hyperloop Transit Terminal Zero',
    category: 'Infrastructure',
    architect: 'Marcus Thorne',
    studio: 'Thorne Civil Heavy Structures',
    year: '2025',
    area: '210,000 m²',
    materials: 'Ultra-High-Performance Concrete (UHPC)',
    format: 'IFC 4.0 / Bentley DGN',
    rating: 4.92,
    previewColor: '#9D4EDD',
    description: 'High-capacity pneumatic transport hub with integrated maglev subterranean tunnels and solar roof canopy.'
  },
  {
    id: 'proj-05',
    title: 'Sub-Oceanic Habitat Unit 04',
    category: 'Parametric',
    architect: 'Aria Sterling',
    studio: 'DeepSea Structural Group',
    year: '2026',
    area: '9,800 m²',
    materials: 'Acrylic Pressure Spheres, Hydro-steel',
    format: 'STEP / IGES 3D CAD',
    rating: 4.97,
    previewColor: '#00F0FF',
    description: 'Pressurized marine research facility engineered to withstand 40 atmospheres of hydrostatic pressure.'
  },
  {
    id: 'proj-06',
    title: 'Kinetic Façade Commercial Complex',
    category: 'High-Rise',
    architect: 'David Lindqvist',
    studio: 'Nordic Matrix Arch',
    year: '2025',
    area: '88,000 m²',
    materials: 'Smart Glass, Servo-Actuated Shading',
    format: 'RVT / ArchiCAD PLN',
    rating: 4.85,
    previewColor: '#00FF87',
    description: 'Commercial tower with dynamic origami solar shading panels that open and close based on sun angle.'
  }
];

export default function ProjectGallery({ onSelectProject }: { onSelectProject?: (proj: Project) => void }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  const categories = ['All', 'High-Rise', 'Sustainable', 'Parametric', 'Infrastructure'];

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.architect.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.studio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="vault" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-light)]">
      
      {/* Header & Controls */}
      <ScrollReveal staggerChildren={0.1} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <RevealItem variants={fadeLeft}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-amber">ARCHITECTURAL VAULT</span>
              <span className="text-xs font-mono text-[var(--text-muted)]">// OPEN VECTOR INDEX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Curated Blueprint <span className="text-gradient-amber">& CAD Repository</span>
            </h2>
          </div>
        </RevealItem>

        {/* Search Input Bar */}
        <RevealItem variants={fadeRight}>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, architect, or studio..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-light)] text-white text-xs font-mono focus:outline-none focus:border-[var(--accent-cyan)] transition-all"
            />
          </div>
        </RevealItem>
      </ScrollReveal>

      {/* Category Tabs */}
      <ScrollReveal variants={fadeLeft} className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-[var(--accent-amber)] text-[#070a11] font-bold shadow-md'
                : 'bg-[var(--bg-glass)] text-[var(--text-secondary)] hover:text-white border border-[var(--border-light)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </ScrollReveal>

      {/* Projects Grid */}
      <RevealGroup staggerChildren={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <RevealItem
            key={project.id}
            variants={cardReveal}
            className="glass-panel-interactive rounded-2xl p-5 border border-[var(--border-light)] flex flex-col justify-between group"
          >
            <div>
              {/* Card Header Thumbnail / Graphic */}
              <div 
                className="relative h-44 rounded-xl mb-4 overflow-hidden flex items-center justify-center border border-[rgba(255,255,255,0.06)]"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${project.previewColor}15 0%, #070a11 80%)`
                }}
              >
                {/* SVG Blueprint Thumbnail Preview */}
                <svg className="w-4/5 h-4/5 opacity-40 group-hover:scale-110 transition-transform duration-500" viewBox="0 0 200 150">
                  <rect x="20" y="20" width="160" height="110" stroke={project.previewColor} strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
                  <path d="M 20 75 L 180 75 M 100 20 L 100 130" stroke={project.previewColor} strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="100" cy="75" r="25" stroke={project.previewColor} strokeWidth="1.5" fill="none" />
                  <polygon points="100,35 125,95 75,95" stroke={project.previewColor} strokeWidth="1" fill="none" />
                </svg>

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 bg-[rgba(7,10,17,0.8)] backdrop-blur-md px-2.5 py-1 rounded-md border border-[var(--border-light)] text-[10px] font-mono text-white">
                  {project.category}
                </div>

                <div className="absolute bottom-3 right-3 bg-[rgba(7,10,17,0.8)] backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-[var(--accent-amber)] border border-[rgba(255,159,28,0.3)]">
                  ★ {project.rating}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[var(--accent-cyan)] transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-mono mb-2">
                By {project.architect} • <span className="text-[var(--text-secondary)]">{project.studio}</span>
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-4">
                {project.description}
              </p>
            </div>

            {/* Spec Details Footer */}
            <div className="pt-4 border-t border-[var(--border-light)]">
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[var(--text-muted)] mb-4">
                <div>
                  <span className="block text-[9px] text-[var(--text-muted)]">SURFACE AREA</span>
                  <span className="text-white font-semibold">{project.area}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-[var(--text-muted)]">CAD FORMAT</span>
                  <span className="text-[var(--accent-cyan)] font-semibold">{project.format}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedModalProject(project)}
                className="w-full py-2.5 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--accent-cyan)] hover:text-[#070a11] text-white font-mono text-xs font-semibold border border-[var(--border-light)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>INSPECT BLUEPRINT DETAILS</span>
              </button>
            </div>

          </RevealItem>
        ))}
      </RevealGroup>

      {/* Blueprint Detail Modal Popup */}
      {selectedModalProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl glass-panel p-6 rounded-2xl border border-[var(--border-glow)] shadow-2xl animate-in zoom-in-95">
            
            <div className="flex items-start justify-between pb-4 border-b border-[var(--border-light)] mb-4">
              <div>
                <span className="badge-cyan mb-2">{selectedModalProject.category} // {selectedModalProject.id}</span>
                <h3 className="text-2xl font-bold text-white">{selectedModalProject.title}</h3>
                <p className="text-xs font-mono text-[var(--text-muted)]">Studio: {selectedModalProject.studio} ({selectedModalProject.year})</p>
              </div>
              <button
                onClick={() => setSelectedModalProject(null)}
                className="px-3 py-1 rounded-lg bg-[var(--bg-secondary)] text-white text-xs font-mono hover:bg-white/10"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-light)]">
                <span className="text-[10px] font-mono text-[var(--text-muted)] block">STRUCTURAL MATERIALS</span>
                <span className="text-xs font-mono text-white font-semibold">{selectedModalProject.materials}</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-light)]">
                <span className="text-[10px] font-mono text-[var(--text-muted)] block">FILE INTEROP FORMATS</span>
                <span className="text-xs font-mono text-[var(--accent-cyan)] font-semibold">{selectedModalProject.format}</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-light)]">
                <span className="text-[10px] font-mono text-[var(--text-muted)] block">TOTAL FLOOR AREA</span>
                <span className="text-xs font-mono text-white font-semibold">{selectedModalProject.area}</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-light)]">
                <span className="text-[10px] font-mono text-[var(--text-muted)] block">ARCHINET VERIFICATION</span>
                <span className="text-xs font-mono text-[var(--accent-emerald)] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> BIM 4.3 VERIFIED
                </span>
              </div>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
              {selectedModalProject.description} Complete structural vector calculations, load diagrams, and parametricGrasshopper scripts are available for verified studio node subscribers.
            </p>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-light)]">
              <button
                onClick={() => {
                  alert(`Downloading CAD asset bundle for ${selectedModalProject.title}...`);
                  setSelectedModalProject(null);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-cyan)] text-[#070a11] font-mono text-xs font-bold hover:brightness-110"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD CAD BUNDLE (.ZIP)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
