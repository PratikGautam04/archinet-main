'use client';

import React, { useState } from 'react';
import { Upload, X, CheckCircle, FileCode, Cpu, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmissionModal({ isOpen, onClose }: SubmissionModalProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    title: '',
    architect: '',
    category: 'High-Rise',
    area: '',
    format: 'IFC 4.3 (.ifc)',
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!isOpen) return null;

  const handleStartUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.architect) {
      alert('Please fill out the required title and architect fields.');
      return;
    }

    setStep(2);
    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setStep(3);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const resetAndClose = () => {
    setStep(1);
    setUploadProgress(0);
    setFormData({ title: '', architect: '', category: 'High-Rise', area: '', format: 'IFC 4.3 (.ifc)' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl glass-panel p-6 sm:p-8 rounded-2xl border border-[var(--border-glow)] shadow-2xl animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-light)] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[rgba(0,240,255,0.1)] border border-[var(--accent-cyan)] flex items-center justify-center text-[var(--accent-cyan)]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Submit Blueprint to ArchiNet</h3>
              <p className="text-xs font-mono text-[var(--text-muted)]">NODE CAD INGESTION PORTAL</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-lg bg-[var(--bg-secondary)] text-white hover:bg-white/10 text-xs font-mono"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: Metadata Form */}
        {step === 1 && (
          <form onSubmit={handleStartUpload} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1">
                PROJECT TITLE *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Neo-Matrix Parametric Tower"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-light)] text-xs font-mono text-white focus:outline-none focus:border-[var(--accent-cyan)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1">
                  LEAD ARCHITECT / STUDIO *
                </label>
                <input
                  type="text"
                  required
                  value={formData.architect}
                  onChange={(e) => setFormData({ ...formData, architect: e.target.value })}
                  placeholder="e.g. Vance & Partners"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-light)] text-xs font-mono text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1">
                  CATEGORY
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-light)] text-xs font-mono text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                >
                  <option value="High-Rise">High-Rise</option>
                  <option value="Sustainable">Sustainable</option>
                  <option value="Parametric">Parametric</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Interior Matrix">Interior Matrix</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1">
                  SURFACE AREA (m²)
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="e.g. 45,000 m²"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-light)] text-xs font-mono text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1">
                  CAD / BIM FORMAT
                </label>
                <select
                  value={formData.format}
                  onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-light)] text-xs font-mono text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                >
                  <option value="IFC 4.3 (.ifc)">IFC 4.3 (.ifc)</option>
                  <option value="Revit (.rvt)">Revit (.rvt)</option>
                  <option value="AutoCAD (.dwg)">AutoCAD (.dwg)</option>
                  <option value="Grasshopper (.gh)">Grasshopper (.gh)</option>
                  <option value="Rhino 3D (.3dm)">Rhino 3D (.3dm)</option>
                </select>
              </div>
            </div>

            {/* Simulated Drag and Drop Zone */}
            <div className="mt-2 border-2 border-dashed border-[var(--border-glow)] rounded-xl p-6 text-center bg-[rgba(0,240,255,0.02)]">
              <FileCode className="w-8 h-8 text-[var(--accent-cyan)] mx-auto mb-2" />
              <p className="text-xs font-mono text-white font-medium">Drag & drop CAD Vector / BIM file here</p>
              <p className="text-[10px] font-mono text-[var(--text-muted)] mt-1">Supports IFC, DWG, RVT, STEP up to 250 MB</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-light)] mt-2">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2 rounded-xl bg-[var(--bg-secondary)] text-white text-xs font-mono hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[var(--accent-cyan)] text-[#070a11] font-mono text-xs font-bold hover:brightness-110"
              >
                PROCEED TO CAD PARSING →
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Processing & Verification */}
        {step === 2 && (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <RefreshCw className="w-10 h-10 text-[var(--accent-cyan)] animate-spin mb-4" />
            <h4 className="text-lg font-bold text-white mb-1">Parsing BIM Vector Layers...</h4>
            <p className="text-xs font-mono text-[var(--text-secondary)] mb-6">
              Running structural integrity checks & geometry extraction on <span className="text-[var(--accent-cyan)]">{formData.title}</span>
            </p>

            <div className="w-full bg-[var(--bg-surface)] h-2 rounded-full overflow-hidden border border-[var(--border-light)] max-w-sm mb-2">
              <div
                className="bg-[var(--accent-cyan)] h-full transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.8)]"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-[var(--accent-cyan)]">{uploadProgress}%</span>
          </div>
        )}

        {/* STEP 3: Success Confirmation */}
        {step === 3 && (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-[rgba(0,255,135,0.1)] border border-[var(--accent-emerald)] flex items-center justify-center text-[var(--accent-emerald)] mb-4 pulse-node">
              <CheckCircle className="w-6 h-6" />
            </div>

            <h4 className="text-xl font-bold text-white mb-1">Blueprint Successfully Indexed!</h4>
            <p className="text-xs font-mono text-[var(--text-secondary)] max-w-md mb-6">
              <strong className="text-white">{formData.title}</strong> has passed automated BIM layer compliance. It is now published to the ArchiNet global blueprint matrix.
            </p>

            <div className="w-full p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-light)] text-left text-xs font-mono text-[var(--text-secondary)] mb-6 flex flex-col gap-1.5">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">NODE HASH:</span>
                <span className="text-[var(--accent-cyan)]">0x89F...A41B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">STRUCTURAL SCORE:</span>
                <span className="text-[var(--accent-emerald)] font-bold">98.4% PASSED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">COMPLIANCE:</span>
                <span className="text-white">ISO 16739 / IFC 4.3</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="px-6 py-2.5 rounded-xl bg-[var(--accent-cyan)] text-[#070a11] font-mono text-xs font-bold hover:brightness-110"
            >
              RETURN TO BLUEPRINT VAULT
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
