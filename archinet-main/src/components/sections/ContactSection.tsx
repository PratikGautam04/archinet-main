'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  RevealTitle,
  RevealLeft,
  RevealRight,
  RevealUp,
} from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import { getField, getFieldValue, getCardJsonData } from '../../utils/metadata';

interface ContactSectionProps {
  data?: MetadataField[];
}

export default function ContactSection({ data }: ContactSectionProps) {
  const eyebrow = getFieldValue(data, 'section_label', 'eyebrow', 'label') || 'GET IN TOUCH';
  const title = getFieldValue(data, 'title');

  const desc1 =
    getFieldValue(data, 'desc_1', 'description_1') ||
    'Are you a building-material or architectural-product brand looking to connect with established architects and interior designers?';
  const desc2 =
    getFieldValue(data, 'desc_2', 'description_2') ||
    'Get in touch with the Archinet team to learn more about exhibiting opportunities, brand participation and upcoming editions.';
  const desc3 =
    getFieldValue(data, 'desc_3', 'description_3') ||
    'Whether you represent a manufacturing brand, an architecture firm or an interior design practice, we would be happy to hear from you.';

  const companyName = getFieldValue(data, 'company_name') || 'Riverstone Networking Services';
  const phone = getFieldValue(data, 'company_phone', 'phone') || '+91 84208 23676';
  const email = getFieldValue(data, 'company_email', 'email') || 'anshu@riverstonenetworking.com';
  const website = getFieldValue(data, 'company_webiste', 'company_website', 'website') || 'riverstonenetworking.com';

  // Dynamic Event Info Card from Metadata Master
  const eventInfoCards = getCardJsonData<{
    title?: string;
    event?: string;
    data_venue?: string;
    venue?: string;
    date?: string;
    status?: string;
  }>(getField(data, 'event_information', 'event_info'));

  const eventInfo = eventInfoCards.length > 0 ? eventInfoCards[0] : null;
  const eventHeader = eventInfo?.title || '14TH EDITION • MUMBAI';
  const eventVenue = eventInfo?.data_venue || eventInfo?.venue || '20 FEBRUARY • THE ST. REGIS, MUMBAI';
  const eventSub = eventInfo?.event || 'BY INVITATION & SELECTION ONLY';

  const [formState, setFormState] = useState({
    fullName: '',
    designation: '',
    company: '',
    city: '',
    email: '',
    phone: '',
    enquiryType: 'Manufacturing Brand – Exhibiting Enquiry',
    productCategory: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const enquiryOptions = [
    'Manufacturing Brand – Exhibiting Enquiry',
    'Architect / Designer – Invitation Request',
    'Brand Partnership',
    'General Enquiry',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.fullName) {
      alert('Please fill in the required fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="w-full py-20 lg:py-32 px-6 lg:px-12 bg-black text-[#AAA59B] font-sans overflow-hidden border-b border-[rgba(255,255,255,0.06)] scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Contact Copy, Divider & Event Card */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            {/* Eyebrow */}
            <RevealTitle>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-[#f0ab44]/40" />
                <span className="text-xs font-mono text-[#f0ab44] tracking-[0.25em] uppercase font-semibold">
                  {eyebrow}
                </span>
                <span className="w-8 h-[1px] bg-[#f0ab44]/40" />
              </div>
            </RevealTitle>

            {/* Heading */}
            <RevealLeft delay={0.1}>
              {title ? (
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight whitespace-pre-line mb-6">
                  {title}
                </h2>
              ) : (
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight mb-6">
                  Be Part of the Next<br />
                  <span className="editorial-italic italic font-serif text-[#f0ab44]">
                    Archinet Edition.
                  </span>
                </h2>
              )}
            </RevealLeft>

            {/* Paragraphs */}
            <RevealLeft delay={0.15}>
              <div className="flex flex-col gap-3 text-xs sm:text-sm font-sans text-[#AAA59B] leading-relaxed">
                <p>{desc1}</p>
                <p>{desc2}</p>
                <p>{desc3}</p>
              </div>
            </RevealLeft>

            {/* Gold Accent Divider */}
            <div className="w-12 h-[1.5px] bg-[#f0ab44] my-6" />

            {/* Event Card */}
            <RevealUp delay={0.2}>
              <div className="p-5 rounded-2xl bg-[#0c0c0c] border border-white/10 flex flex-col gap-2 my-2">
                <div className="flex items-center justify-between text-xs font-mono tracking-wider text-[#f0ab44] uppercase font-semibold">
                  <span>{eventHeader}</span>
                  <span className="text-white/60">2027</span>
                </div>
                <div className="text-xs sm:text-sm font-mono text-white tracking-wide uppercase">
                  {eventVenue}
                </div>
                <div className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
                  {eventSub}
                </div>
              </div>
            </RevealUp>
          </div>

          {/* Organization Details at Bottom */}
          <RevealUp delay={0.25}>
            <div className="flex flex-col gap-1 text-xs font-sans text-white/50 mt-10">
              <span className="text-xs text-white/80 font-medium block">
                {companyName}
              </span>
              <span>{phone}</span>
              <a
                href={`mailto:${email}`}
                className="hover:text-[#f0ab44] transition-colors"
              >
                {email}
              </a>
              <a
                href={`https://${website}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#f0ab44] transition-colors"
              >
                {website}
              </a>
            </div>
          </RevealUp>
        </div>

        {/* Right Column: Participation & Invitation Enquiry Form */}
        <RevealRight className="lg:col-span-7 p-7 sm:p-10 rounded-2xl bg-[#0c0c0c] border border-white/10 shadow-2xl">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center gap-4">
              <CheckCircle2 className="w-14 h-14 text-[#f0ab44]" />
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Enquiry Received
              </h3>
              <p className="text-xs font-sans text-white/70 max-w-md leading-relaxed">
                Thank you for your enquiry. Our curation team will review your submission and connect with you shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full border border-[#f0ab44] text-[#f0ab44] font-mono text-xs hover:bg-[#f0ab44] hover:text-black transition-colors"
              >
                SUBMIT ANOTHER ENQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-1">
                  Participation &amp; Invitation Enquiry
                </h3>
                <p className="text-xs font-sans text-[#AAA59B]">
                  Complete the details below and our team will get in touch with you.
                </p>
              </div>

              {/* 2-Column Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-mono text-white/60 tracking-wider uppercase mb-1.5 font-semibold">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    placeholder="e.g. Ar. Rajesh Mehta"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-white placeholder-white/25 focus:outline-none focus:border-[#f0ab44] transition-colors"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-[10px] font-mono text-white/60 tracking-wider uppercase mb-1.5 font-semibold">
                    DESIGNATION *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.designation}
                    onChange={(e) => setFormState({ ...formState, designation: e.target.value })}
                    placeholder="e.g. Principal Architect / Managing Director"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-white placeholder-white/25 focus:outline-none focus:border-[#f0ab44] transition-colors"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-[10px] font-mono text-white/60 tracking-wider uppercase mb-1.5 font-semibold">
                    COMPANY / FIRM NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    placeholder="e.g. Studio Vista Architecture / Brand Ltd"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-white placeholder-white/25 focus:outline-none focus:border-[#f0ab44] transition-colors"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-[10px] font-mono text-white/60 tracking-wider uppercase mb-1.5 font-semibold">
                    CITY *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.city}
                    onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                    placeholder="e.g. Mumbai, Bengaluru, Hyderabad"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-white placeholder-white/25 focus:outline-none focus:border-[#f0ab44] transition-colors"
                  />
                </div>

                {/* Business Email */}
                <div>
                  <label className="block text-[10px] font-mono text-white/60 tracking-wider uppercase mb-1.5 font-semibold">
                    BUSINESS EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-white placeholder-white/25 focus:outline-none focus:border-[#f0ab44] transition-colors"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[10px] font-mono text-white/60 tracking-wider uppercase mb-1.5 font-semibold">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-white placeholder-white/25 focus:outline-none focus:border-[#f0ab44] transition-colors"
                  />
                </div>
              </div>

              {/* Enquiry Type Options */}
              <div>
                <label className="block text-[10px] font-mono text-white/60 tracking-wider uppercase mb-2.5 font-semibold">
                  ENQUIRY TYPE *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {enquiryOptions.map((option) => {
                    const isSelected = formState.enquiryType === option;
                    return (
                      <button
                        type="button"
                        key={option}
                        onClick={() => setFormState({ ...formState, enquiryType: option })}
                        className={`px-4 py-3 rounded-xl text-left font-sans text-xs flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? 'bg-[#070707] border border-[#f0ab44] text-[#f4f0e8] shadow-md'
                            : 'bg-[#070707] border border-white/10 text-white/60 hover:border-white/20'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#f0ab44] bg-[#f0ab44]'
                              : 'border-white/30 bg-transparent'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </span>
                        <span className="truncate">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conditional Product Category for Manufacturing Brands */}
              {formState.enquiryType === 'Manufacturing Brand – Exhibiting Enquiry' && (
                <div className="animate-fadeIn">
                  <label className="block text-[10px] font-mono text-[#f0ab44] tracking-wider uppercase mb-1.5 font-semibold">
                    PRODUCT CATEGORY * (FOR MANUFACTURING BRANDS)
                  </label>
                  <input
                    type="text"
                    value={formState.productCategory}
                    onChange={(e) => setFormState({ ...formState, productCategory: e.target.value })}
                    placeholder="e.g. Architectural Lighting, Facades, High-End Surfaces, Bath & Sanitation, Automation"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-[#f0ab44]/40 text-xs font-sans text-white placeholder-white/25 focus:outline-none focus:border-[#f0ab44] transition-colors"
                  />
                  <p className="text-[10px] font-sans text-white/40 mt-1">
                    Helps the Archinet curation team verify edition category exclusivity.
                  </p>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-[10px] font-mono text-white/60 tracking-wider uppercase mb-1.5 font-semibold">
                  MESSAGE
                </label>
                <textarea
                  rows={3}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell us about your brand, architectural practice or any specific queries..."
                  className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-white placeholder-white/25 focus:outline-none focus:border-[#f0ab44] transition-colors resize-none"
                />
              </div>

              {/* Footer Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <span className="text-[10px] font-sans text-white/40 leading-snug">
                  Strict confidentiality assured for all firm &amp; brand inquiries.
                </span>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#f0ab44] hover:bg-[#d99732] text-black font-mono text-xs font-bold tracking-wider uppercase transition-colors shadow-lg cursor-pointer shrink-0 w-full sm:w-auto"
                >
                  <span>SUBMIT ENQUIRY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </RevealRight>
      </div>
    </section>
  );
}
