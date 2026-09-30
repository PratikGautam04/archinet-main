'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Layers, ZoomIn, ZoomOut, RefreshCw, Eye, EyeOff, Cpu, Crosshair, Info, CheckCircle2, Zap, Wind, Grid, Download } from 'lucide-react';
import { ScrollReveal, RevealItem } from './animations/ScrollReveal';
import { fadeLeft, fadeRight, fadeUp, scaleIn } from './animations/motionVariants';

interface PresetProject {
  id: string;
  name: string;
  category: string;
  location: string;
  dimensions: string;
  nodesCount: number;
  description: string;
  layers: {
    structural: boolean;
    electrical: boolean;
    hvac: boolean;
    dimensions: boolean;
  };
}

const PRESET_PROJECTS: PresetProject[] = [
  {
    id: 'hyperion',
    name: 'HYPERION SKY-TOWER L42',
    category: 'Commercial High-Rise',
    location: 'Singapore, Marina Bay',
    dimensions: '64.5m x 48.2m',
    nodesCount: 128,
    description: 'High-density parametric core with dynamic wind load dampeners and integrated photovoltaic glass façade.',
    layers: { structural: true, electrical: true, hvac: true, dimensions: true }
  },
  {
    id: 'koto',
    name: 'KOTO ECO-PAVILION',
    category: 'Parametric Timber',
    location: 'Kyoto, Japan',
    dimensions: '32.0m x 28.5m',
    nodesCount: 84,
    description: 'Curvilinear cross-laminated timber shell with passive solar ventilation channels and rainwater harvesting grid.',
    layers: { structural: true, electrical: false, hvac: true, dimensions: true }
  },
  {
    id: 'underground',
    name: 'NEO-MATRIX DATA HUB',
    category: 'Sub-surface Infrastructure',
    location: 'Zurich, Switzerland',
    dimensions: '110.0m x 75.0m',
    nodesCount: 210,
    description: 'Reinforced monolithic subterranean bunker with liquid nitrogen cooling conduits and seismic isolation pads.',
    layers: { structural: true, electrical: true, hvac: true, dimensions: false }
  }
];

export default function BlueprintViewer() {
  const [selectedPreset, setSelectedPreset] = useState<PresetProject>(PRESET_PROJECTS[0]);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [layers, setLayers] = useState({
    structural: true,
    electrical: true,
    hvac: true,
    dimensions: true
  });
  const [activeNode, setActiveNode] = useState<{ id: string; name: string; spec: string; load: string; material: string } | null>(null);
  const [mousePos, setMousePos] = useState({ x: 182, y: 145 });
  const [isExporting, setIsExporting] = useState(false);

  // Handle Layer Toggle
  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Canvas Mouse Move Inspector
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) * (400 / rect.width));
    const y = Math.round((e.clientY - rect.top) * (400 / rect.height));
    setMousePos({ x, y });
  };

  // Node Click Details
  const handleNodeClick = (id: string, name: string, spec: string, load: string, material: string) => {
    setActiveNode({ id, name, spec, load, material });
  };

  const handleExportSim = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`[ARCHINET CAD EXPORT] Vector package for ${selectedPreset.name} (.DXF / .IFC) generated successfully!`);
    }, 1200);
  };

  return (
    <section id="viewer" className="py-12 px-4 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <ScrollReveal staggerChildren={0.1} className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <RevealItem variants={fadeLeft}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-cyan">INTERACTIVE CAD ENGINE</span>
              <span className="text-xs font-mono text-[var(--text-muted)]">// VECTOR MATRIX ENGINE v4.2</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Vector Blueprint & <span className="text-gradient-cyan">Layer Inspector</span>
            </h2>
          </div>
        </RevealItem>

        {/* Preset Switcher */}
        <RevealItem variants={fadeRight}>
          <div className="flex items-center gap-2 bg-[var(--bg-secondary)] p-1.5 rounded-xl border border-[var(--border-light)] overflow-x-auto">
            {PRESET_PROJECTS.map((project) => (
              <button
                key={project.id}
                onClick={() => {
                  setSelectedPreset(project);
                  setActiveNode(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all whitespace-nowrap ${
                  selectedPreset.id === project.id
                    ? 'bg-[var(--accent-cyan)] text-[#070a11] font-bold shadow-md'
                    : 'text-[var(--text-secondary)] hover:text-white'
                }`}
              >
                {project.name}
              </button>
            ))}
          </div>
        </RevealItem>
      </ScrollReveal>

      {/* Main CAD Viewer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Toolbar & Layer Control */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          
          {/* Active Blueprint Meta Panel */}
          <div className="glass-panel p-4 rounded-xl border border-[var(--border-light)]">
            <h3 className="font-mono text-xs text-[var(--accent-cyan)] uppercase font-semibold mb-1">
              SELECTED CAD MODEL
            </h3>
            <p className="font-bold text-white text-base mb-1">{selectedPreset.name}</p>
            <p className="text-xs text-[var(--text-muted)] mb-3">{selectedPreset.category} • {selectedPreset.location}</p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">{selectedPreset.description}</p>
            
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] pt-3 border-t border-[var(--border-light)]">
              <span>BOUNDS: {selectedPreset.dimensions}</span>
              <span className="text-[var(--accent-amber)] font-semibold">{selectedPreset.nodesCount} NODES</span>
            </div>
          </div>

          {/* BIM Layer Matrix Toggles */}
          <div className="glass-panel p-4 rounded-xl border border-[var(--border-light)] flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-light)]">
              <span className="font-mono text-xs font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--accent-cyan)]" />
                BIM LAYER CONTROLS
              </span>
              <span className="text-[10px] font-mono text-[var(--accent-cyan)]">LIVE VECTOR</span>
            </div>

            {/* Structural Layer */}
            <button
              onClick={() => toggleLayer('structural')}
              className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all ${
                layers.structural
                  ? 'bg-[rgba(0,255,135,0.1)] border-[rgba(0,255,135,0.4)] text-[var(--accent-emerald)]'
                  : 'bg-[var(--bg-secondary)] border-[var(--border-light)] text-[var(--text-muted)]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Grid className="w-4 h-4" />
                Structural Core (Steel / Beams)
              </span>
              {layers.structural ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>

            {/* Electrical Grid */}
            <button
              onClick={() => toggleLayer('electrical')}
              className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all ${
                layers.electrical
                  ? 'bg-[rgba(0,240,255,0.1)] border-[rgba(0,240,255,0.4)] text-[var(--accent-cyan)]'
                  : 'bg-[var(--bg-secondary)] border-[var(--border-light)] text-[var(--text-muted)]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Electrical & Optical Grid
              </span>
              {layers.electrical ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>

            {/* HVAC Layer */}
            <button
              onClick={() => toggleLayer('hvac')}
              className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all ${
                layers.hvac
                  ? 'bg-[rgba(255,159,28,0.1)] border-[rgba(255,159,28,0.4)] text-[var(--accent-amber)]'
                  : 'bg-[var(--bg-secondary)] border-[var(--border-light)] text-[var(--text-muted)]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Wind className="w-4 h-4" />
                HVAC / Air Conduits
              </span>
              {layers.hvac ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>

            {/* Dimensions Layer */}
            <button
              onClick={() => toggleLayer('dimensions')}
              className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all ${
                layers.dimensions
                  ? 'bg-[rgba(255,255,255,0.1)] border-[rgba(255,255,255,0.3)] text-white'
                  : 'bg-[var(--bg-secondary)] border-[var(--border-light)] text-[var(--text-muted)]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Crosshair className="w-4 h-4" />
                Dimension & Annotation
              </span>
              {layers.dimensions ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>

          </div>

          {/* Download DXF/IFC Export CTA */}
          <button
            onClick={handleExportSim}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-glow)] text-white font-mono text-xs font-bold hover:bg-[var(--bg-glass-hover)] transition-all cursor-pointer"
          >
            {isExporting ? <RefreshCw className="w-4 h-4 animate-spin text-[var(--accent-cyan)]" /> : <Download className="w-4 h-4 text-[var(--accent-cyan)]" />}
            <span>{isExporting ? 'GENERATING CAD VECTOR...' : 'EXPORT DXF / IFC VECTOR'}</span>
          </button>

        </div>

        {/* Center CAD Display Canvas Viewport */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          
          <div className="relative rounded-2xl glass-panel p-4 border border-[var(--border-glow)] overflow-hidden">
            
            {/* Viewport Top Status & Telemetry Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-light)] text-xs font-mono text-[var(--text-secondary)]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[var(--accent-cyan)] font-semibold">
                  <Crosshair className="w-4 h-4" />
                  X: {mousePos.x}mm | Y: {mousePos.y}mm
                </span>
                <span className="hidden sm:inline text-[var(--text-muted)]">SCALE 1:50</span>
              </div>

              {/* Viewport Zoom Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
                  className="p-1.5 rounded bg-[var(--bg-secondary)] text-white hover:bg-[rgba(255,255,255,0.1)]"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-white text-xs font-bold">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.25))}
                  className="p-1.5 rounded bg-[var(--bg-secondary)] text-white hover:bg-[rgba(255,255,255,0.1)]"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 rounded bg-[var(--bg-secondary)] text-[var(--accent-cyan)] hover:bg-[rgba(255,255,255,0.1)]"
                  title="Reset Viewport"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Vector Canvas Box */}
            <div 
              onMouseMove={handleMouseMove}
              className="relative aspect-[16/10] w-full rounded-xl bg-[#04070e] border border-[rgba(0,240,255,0.2)] overflow-hidden cursor-crosshair flex items-center justify-center select-none"
            >
              
              {/* Scalable Container */}
              <div 
                className="relative w-full h-full transition-transform duration-200"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* Architectural Grid Background Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.06)_1px,transparent_1px)] bg-[size:25px_25px]" />

                <svg className="w-full h-full" viewBox="0 0 500 350" fill="none">
                  
                  {/* STRUCTURAL CORE LAYER */}
                  {layers.structural && (
                    <g stroke="#00FF87" strokeWidth="2">
                      {/* Perimeter Steel Frame */}
                      <rect x="50" y="40" width="400" height="260" rx="4" strokeWidth="2.5" />
                      <line x1="180" y1="40" x2="180" y2="300" strokeDasharray="6 4" />
                      <line x1="330" y1="40" x2="330" y2="300" strokeDasharray="6 4" />
                      <line x1="50" y1="170" x2="450" y2="170" strokeDasharray="6 4" />

                      {/* Structural Load Beams */}
                      <rect x="180" y="100" width="150" height="140" fill="rgba(0,255,135,0.03)" strokeWidth="1.5" />

                      {/* Interactive Column Nodes */}
                      <circle cx="50" cy="40" r="7" fill="#00FF87" className="cursor-pointer hover:scale-125 transition-transform" onClick={() => handleNodeClick('NODE-A1', 'Perimeter Column A1', 'Grade FE-550 Structural Steel', '4,200 kN Vertical Load', 'Recycled Steel Alloy')} />
                      <circle cx="450" cy="40" r="7" fill="#00FF87" className="cursor-pointer hover:scale-125 transition-transform" onClick={() => handleNodeClick('NODE-A2', 'Perimeter Column A2', 'Grade FE-550 Structural Steel', '4,150 kN Vertical Load', 'Recycled Steel Alloy')} />
                      <circle cx="50" cy="300" r="7" fill="#00FF87" className="cursor-pointer hover:scale-125 transition-transform" onClick={() => handleNodeClick('NODE-B1', 'Perimeter Column B1', 'Grade FE-550 Structural Steel', '4,300 kN Vertical Load', 'Recycled Steel Alloy')} />
                      <circle cx="450" cy="300" r="7" fill="#00FF87" className="cursor-pointer hover:scale-125 transition-transform" onClick={() => handleNodeClick('NODE-B2', 'Perimeter Column B2', 'Grade FE-550 Structural Steel', '4,280 kN Vertical Load', 'Recycled Steel Alloy')} />

                      {/* Core Elevator Shaft Nodes */}
                      <circle cx="255" cy="170" r="9" fill="#00F0FF" className="cursor-pointer animate-pulse" onClick={() => handleNodeClick('CORE-SHAFT', 'Central Elevator Shear Core', 'High-Performance Concrete C80', '18,500 kN Core Axial Load', 'Pre-stressed Composite Concrete')} />
                    </g>
                  )}

                  {/* ELECTRICAL & OPTICAL LAYER */}
                  {layers.electrical && (
                    <g stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="4 2">
                      <path d="M 50 100 L 180 100 L 180 170 L 255 170" />
                      <path d="M 450 100 L 330 100 L 330 170 L 255 170" />
                      <path d="M 255 170 L 255 300" />
                      
                      <circle cx="115" cy="100" r="4" fill="#00F0FF" />
                      <circle cx="390" cy="100" r="4" fill="#00F0FF" />
                      <text x="100" y="90" fill="#00F0FF" fontSize="9" fontFamily="monospace">OPTICAL FEED A</text>
                    </g>
                  )}

                  {/* HVAC & VENTILATION LAYER */}
                  {layers.hvac && (
                    <g stroke="#FF9F1C" strokeWidth="2.5" opacity="0.85">
                      <path d="M 80 40 L 80 260 L 180 260" strokeDasharray="8 4" />
                      <path d="M 420 40 L 420 260 L 330 260" strokeDasharray="8 4" />
                      <circle cx="80" cy="150" r="6" fill="#FF9F1C" className="cursor-pointer" onClick={() => handleNodeClick('HVAC-01', 'Air Intake Plenum West', 'Variable Air Volume (VAV)', '1,200 CFM Airflow Rate', 'Galvanized Aluminum Duct')} />
                      <circle cx="420" cy="150" r="6" fill="#FF9F1C" className="cursor-pointer" onClick={() => handleNodeClick('HVAC-02', 'Air Intake Plenum East', 'Variable Air Volume (VAV)', '1,250 CFM Airflow Rate', 'Galvanized Aluminum Duct')} />
                    </g>
                  )}

                  {/* DIMENSION & ANNOTATIONS LAYER */}
                  {layers.dimensions && (
                    <g stroke="#FFFFFF" opacity="0.6" strokeWidth="1">
                      <line x1="50" y1="20" x2="450" y2="20" />
                      <line x1="50" y1="15" x2="50" y2="25" />
                      <line x1="450" y1="15" x2="450" y2="25" />
                      <text x="250" y="15" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle">SPAN: 64.50 METERS</text>

                      <line x1="20" y1="40" x2="20" y2="300" />
                      <line x1="15" y1="40" x2="25" y2="40" />
                      <line x1="15" y1="300" x2="25" y2="300" />
                      <text x="12" y="170" fill="#FFFFFF" fontSize="10" fontFamily="monospace" writingMode="tb">WIDTH: 48.20M</text>
                    </g>
                  )}

                </svg>

                {/* Instructions Overlay */}
                <div className="absolute bottom-3 left-3 bg-[rgba(7,10,17,0.8)] backdrop-blur-md px-3 py-1.5 rounded-lg border border-[var(--border-light)] text-[10px] font-mono text-[var(--text-secondary)]">
                  💡 Click any colored node (Green/Cyan/Amber) to inspect structural properties.
                </div>
              </div>

            </div>

            {/* Selected Node Property Inspector Panel */}
            {activeNode && (
              <div className="mt-4 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-active)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(0,240,255,0.1)] border border-[var(--accent-cyan)] flex items-center justify-center text-[var(--accent-cyan)]">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{activeNode.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[rgba(0,240,255,0.1)] text-[var(--accent-cyan)]">
                        {activeNode.id}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] font-mono">{activeNode.spec}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                  <div>
                    <span className="text-[var(--text-muted)] block text-[10px]">DESIGN LOAD:</span>
                    <span className="text-[var(--accent-amber)] font-bold">{activeNode.load}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block text-[10px]">MATERIAL:</span>
                    <span className="text-white font-bold">{activeNode.material}</span>
                  </div>
                  <button
                    onClick={() => setActiveNode(null)}
                    className="px-2.5 py-1 rounded bg-[rgba(255,255,255,0.08)] text-white hover:bg-[rgba(255,255,255,0.2)] text-[11px]"
                  >
                    Close Inspector
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}
