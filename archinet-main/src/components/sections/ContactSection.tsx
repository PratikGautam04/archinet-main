'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import {
  RevealTitle,
  RevealLeft,
  RevealRight,
  RevealUp,
  RevealZoom,
} from '../animations/ScrollReveal';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    designation: '',
    city: '',
    email: '',
    phone: '',
    interests: [] as string[],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const interestOptions = ['ATTENDING', 'EXHIBITING', 'PARTNERSHIP', 'GENERAL ENQUIRY'];

  const toggleInterest = (option: string) => {
    setFormState((prev) => ({
      ...prev,
      interests: prev.interests.includes(option)
        ? prev.interests.filter((i) => i !== option)
        : [...prev.interests, option],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email) {
      alert('Please provide your email address.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full py-24 lg:py-36 px-6 lg:px-12 bg-[#070707] border-b border-[rgba(255,255,255,0.06)] overflow-hidden">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Info Column (Enters from Left) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <RevealTitle>
            <span className="text-xs font-mono tracking-[0.25em] text-[var(--accent-gold)] uppercase font-semibold">
              GET IN TOUCH
            </span>
          </RevealTitle>

          <RevealLeft delay={0.1}>
            <h2 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-tight leading-tight">
              The <span className="editorial-italic">Conversation</span> Continues.
            </h2>
          </RevealLeft>

          <RevealLeft delay={0.2}>
            <p className="text-xs font-mono text-[var(--accent-gold)] tracking-widest uppercase">
              THANK YOU FOR BEING PART OF THE ROOM.
            </p>
          </RevealLeft>

          <RevealZoom delay={0.25}>
            <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-[rgba(240,171,68,0.2)] flex flex-col gap-4 my-2">
              <span className="text-xs font-mono text-white font-bold tracking-widest uppercase">
                ONE CITY. ONE DAY. ONE VISION.
              </span>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                <MapPin className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>14TH EDITION · MUMBAI 2027</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-gold)]" />
                <span>20 FEBRUARY · THE ST. REGIS</span>
              </div>
            </div>
          </RevealZoom>

          <RevealUp delay={0.3}>
            <div className="flex flex-col gap-3 font-mono text-xs text-[var(--text-secondary)] pt-2">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>invitations@archinet.ai.studio</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>+91 (022) 4890 1200</span>
              </div>
            </div>
          </RevealUp>
        </div>

        {/* Right Form Column (Enters from Right) */}
        <RevealRight className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#0d0d0d] border border-[rgba(255,255,255,0.08)] shadow-2xl">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center gap-4">
              <CheckCircle2 className="w-14 h-14 text-[var(--accent-gold)]" />
              <h3 className="font-serif text-3xl text-white font-light">Invitation Request Transmitted</h3>
              <p className="text-xs font-mono text-[var(--text-secondary)] max-w-md">
                Thank you for your interest in ArchiNet Summit 14th Edition. Our curatorial committee will review your credentials and contact you directly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full border border-[var(--accent-gold)] text-[var(--accent-gold)] font-mono text-xs hover:bg-[var(--accent-gold)] hover:text-[#070707] transition-colors"
              >
                SUBMIT ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase mb-2">
                    DESIGNATION / TITLE
                  </label>
                  <input
                    type="text"
                    value={formState.designation}
                    onChange={(e) => setFormState({ ...formState, designation: e.target.value })}
                    placeholder="Principal Architect / Founder"
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[rgba(255,255,255,0.1)] text-xs font-mono text-white focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase mb-2">
                    CITY & COUNTRY
                  </label>
                  <input
                    type="text"
                    value={formState.city}
                    onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                    placeholder="Mumbai, India"
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[rgba(255,255,255,0.1)] text-xs font-mono text-white focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase mb-2">
                    BUSINESS EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="architect@studio.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[rgba(255,255,255,0.1)] text-xs font-mono text-white focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase mb-2">
                    PHONE / WHATSAPP
                  </label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="+91 98200 00000"
                    className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[rgba(255,255,255,0.1)] text-xs font-mono text-white focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                  />
                </div>
              </div>

              {/* Checkboxes: I AM INTERESTED IN */}
              <div>
                <label className="block text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase mb-3">
                  I AM INTERESTED IN
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((option) => {
                    const isSelected = formState.interests.includes(option);
                    return (
                      <button
                        type="button"
                        key={option}
                        onClick={() => toggleInterest(option)}
                        className={`px-4 py-2 rounded-full font-mono text-xs transition-all ${
                          isSelected
                            ? 'bg-[var(--accent-gold)] text-[#070707] font-bold'
                            : 'bg-[#141414] text-[var(--text-secondary)] border border-[rgba(255,255,255,0.1)] hover:border-[var(--accent-gold)]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-[var(--text-muted)] tracking-widest uppercase mb-2">
                  MESSAGE / NOTES
                </label>
                <textarea
                  rows={3}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell us about your practice or delegation requirement..."
                  className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-[rgba(255,255,255,0.1)] text-xs font-mono text-white focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-light)] text-[#070707] font-mono text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>SUBMIT INVITATION REQUEST</span>
                <Send className="w-4 h-4" />
              </button>

            </form>
          )}
        </RevealRight>

      </div>

    </section>
  );
}
