
'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react';
import {
  RevealTitle,
  RevealLeft,
  RevealRight,
  RevealUp,
} from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import {
  getField,
  getFieldValue,
  getCardJsonData,
} from '../../utils/metadata';

interface ContactSectionProps {
  data?: MetadataField[];
}

interface ContactFormState {
  fullName: string;
  designation: string;
  company: string;
  city: string;
  email: string;
  phone: string;
  enquiryType: string;
  productCategory: string;
  message: string;
}

interface ApiResponse {
  message?: string;
  success?: boolean;
  status?: string;
  [key: string]: unknown;
}

const CONTACT_API_URL =
  'https://mail.actifyzone.com/API/Archinet/Contact/Us/Mail';

const EMAIL_TO = 'omkar.more@dextero.in';

export default function ContactSection({ data }: ContactSectionProps) {
  const eyebrow =
    getFieldValue(data, 'section_label', 'eyebrow', 'label') ||
    'GET IN TOUCH';

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

  const companyName =
    getFieldValue(data, 'company_name') ||
    'Riverstone Networking Services';

  const phone =
    getFieldValue(data, 'company_phone', 'phone') ||
    '+91 84208 23676';

  const email =
    getFieldValue(data, 'company_email', 'email') ||
    'anshu@riverstonenetworking.com';

  const website =
    getFieldValue(data, 'company_webiste', 'company_website', 'website') ||
    'riverstonenetworking.com';

  const eventInfoCards = getCardJsonData<{
    title?: string;
    event?: string;
    data_venue?: string;
    venue?: string;
    date?: string;
    status?: string;
  }>(getField(data, 'event_information', 'event_info'));

  const eventInfo =
    eventInfoCards.length > 0 ? eventInfoCards[0] : null;

  const eventHeader = eventInfo?.title || '14TH EDITION • MUMBAI';

  const eventVenue =
    eventInfo?.data_venue ||
    eventInfo?.venue ||
    '20 FEBRUARY • THE ST. REGIS, MUMBAI';

  const eventSub =
    eventInfo?.event || 'BY INVITATION & SELECTION ONLY';

  const [formState, setFormState] = useState<ContactFormState>({
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const enquiryOptions = [
    'Manufacturing Brand – Exhibiting Enquiry',
    'Architect / Designer – Invitation Request',
    'Brand Partnership',
    'General Enquiry',
  ];

  const updateField = <K extends keyof ContactFormState>(
    field: K,
    value: ContactFormState[K]
  ) => {
    setFormState((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (
      !formState.fullName.trim() ||
      !formState.designation.trim() ||
      !formState.company.trim() ||
      !formState.city.trim() ||
      !formState.email.trim() ||
      !formState.phone.trim()
    ) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (
      formState.enquiryType ===
        'Manufacturing Brand – Exhibiting Enquiry' &&
      !formState.productCategory.trim()
    ) {
      setErrorMessage('Please enter your product category.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const payload = {
      full_name: formState.fullName.trim(),
      designation: formState.designation.trim(),
      company_name: formState.company.trim(),
      city: formState.city.trim(),
      email: formState.email.trim(),
      phone_number: formState.phone.trim(),
      enquire_type: formState.enquiryType,
      product_category: formState.productCategory.trim(),
      remarks: formState.message.trim(),
      email_to: EMAIL_TO,
    };

    try {
      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();

      let result: ApiResponse | null = null;

      if (responseText.trim()) {
        try {
          result = JSON.parse(responseText) as ApiResponse;
        } catch {
          // Some APIs return plain-text responses instead of JSON.
          result = null;
        }
      }

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Unable to submit your enquiry (HTTP ${response.status}). Please try again.`
        );
      }

      // If the API returns a JSON success flag, respect it.
      if (
        result?.success === false ||
        result?.status?.toLowerCase() === 'error'
      ) {
        throw new Error(
          result.message || 'The server could not process your enquiry.'
        );
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Archinet contact form submission failed:', error);

      if (error instanceof TypeError) {
        setErrorMessage(
          'Unable to connect to the enquiry service. Please check your connection or try again later. If this persists, the API may need a CORS configuration update.'
        );
      } else {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-20 lg:py-32 px-6 lg:px-12 bg-black text-[#AAA59B] font-sans overflow-hidden border-b border-[rgba(255,255,255,0.06)] scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <RevealTitle>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[rgba(215,180,107,0.4)]" />

                <span className="text-xs font-sans text-[#D7B46B] tracking-[0.25em] uppercase font-semibold">
                  {eyebrow}
                </span>

                <span className="w-8 h-px bg-[rgba(215,180,107,0.4)]" />
              </div>
            </RevealTitle>

            <RevealLeft delay={0.1}>
              {title ? (
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#EEEAE2] font-normal tracking-tight leading-tight whitespace-pre-line mb-6">
                  {title}
                </h2>
              ) : (
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#EEEAE2] font-normal tracking-tight leading-tight mb-6">
                  Be Part of the Next
                  <br />
                  <span className="editorial-italic italic font-serif text-[#D7B46B]">
                    Archinet Edition.
                  </span>
                </h2>
              )}
            </RevealLeft>

            <RevealLeft delay={0.15}>
              <div className="flex flex-col gap-3 text-xs sm:text-sm font-sans text-[#AAA59B] leading-relaxed">
                <p>{desc1}</p>
                <p>{desc2}</p>
                <p>{desc3}</p>
              </div>
            </RevealLeft>

            <div className="w-12 h-[1.5px] bg-[#D7B46B] my-6" />

            <RevealUp delay={0.2}>
              <div className="p-5 rounded-2xl bg-[#0c0c0c] border border-[rgba(215,180,107,0.25)] flex flex-col gap-2 my-2">
                <div className="flex items-center justify-between gap-3 text-xs font-sans tracking-wider text-[#D7B46B] uppercase font-semibold">
                  <span>{eventHeader}</span>
                  <span className="text-[#AAA59B]">2027</span>
                </div>

                <div className="text-xs sm:text-sm font-sans text-[#EEEAE2] tracking-wide uppercase">
                  {eventVenue}
                </div>

                <div className="text-[10px] font-sans text-[#AAA59B] tracking-widest uppercase">
                  {eventSub}
                </div>
              </div>
            </RevealUp>
          </div>

          <RevealUp delay={0.25}>
            <div className="flex flex-col gap-1 text-xs font-sans text-[#AAA59B] mt-10">
              <span className="text-xs text-[#EEEAE2] font-medium block">
                {companyName}
              </span>

              <span>{phone}</span>

              <a
                href={`mailto:${email}`}
                className="hover:text-[#D7B46B] transition-colors"
              >
                {email}
              </a>

              <a
                href={`https://${website}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#D7B46B] transition-colors"
              >
                {website}
              </a>
            </div>
          </RevealUp>
        </div>

        {/* Right Column: Contact Form */}
        <RevealRight className="lg:col-span-7 p-7 sm:p-10 rounded-2xl bg-[#0c0c0c] border border-white/10 shadow-2xl">
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center gap-4">
              <CheckCircle2 className="w-14 h-14 text-[#D7B46B]" />

              <h3 className="font-serif text-2xl sm:text-3xl text-[#EEEAE2] font-normal">
                Enquiry Received
              </h3>

              <p className="text-xs sm:text-sm font-sans text-[#AAA59B] max-w-md leading-relaxed">
                Thank you for your enquiry. Our curation team will review
                your submission and connect with you shortly.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setErrorMessage('');
                }}
                className="mt-4 px-6 py-2.5 rounded-full border border-[#D7B46B] text-[#D7B46B] font-sans text-xs hover:bg-[#D7B46B] hover:text-black transition-colors"
              >
                SUBMIT ANOTHER ENQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <h3 className="flex flex-wrap items-center gap-x-1 font-serif text-[24px] font-normal leading-[32px] tracking-normal text-[#EEEAE2]">
                  <span>Participation</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 32"
                    width="24"
                    height="32"
                    aria-hidden="true"
                    className="inline-block shrink-0"
                  >
                    <text
                      x="12"
                      y="25"
                      textAnchor="middle"
                      fontFamily="Playfair Display, serif"
                      fontSize="29"
                      fontStyle="italic"
                      fill="#EEEAE2"
                    >
                      &amp;
                    </text>
                  </svg>

                  <span>Invitation Enquiry</span>
                </h3>

                <p className="text-xs font-sans text-[#AAA59B]">
                  Complete the details below and our team will get in
                  touch with you.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-sans text-[#D7B46B] tracking-wider uppercase mb-1.5 font-semibold">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={formState.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="e.g. Ar. Rajesh Mehta"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-[#EEEAE2] placeholder:text-[#777168] focus:outline-none focus:border-[#D7B46B] transition-colors"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-[10px] font-sans text-[#D7B46B] tracking-wider uppercase mb-1.5 font-semibold">
                    DESIGNATION *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="organization-title"
                    value={formState.designation}
                    onChange={(e) =>
                      updateField('designation', e.target.value)
                    }
                    placeholder="e.g. Principal Architect / Managing Director"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-[#EEEAE2] placeholder:text-[#777168] focus:outline-none focus:border-[#D7B46B] transition-colors"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-[10px] font-sans text-[#D7B46B] tracking-wider uppercase mb-1.5 font-semibold">
                    COMPANY / FIRM NAME *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="organization"
                    value={formState.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    placeholder="e.g. Studio Vista Architecture / Brand Ltd"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-[#EEEAE2] placeholder:text-[#777168] focus:outline-none focus:border-[#D7B46B] transition-colors"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-[10px] font-sans text-[#D7B46B] tracking-wider uppercase mb-1.5 font-semibold">
                    CITY *
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="address-level2"
                    value={formState.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="e.g. Mumbai, Bengaluru, Hyderabad"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-[#EEEAE2] placeholder:text-[#777168] focus:outline-none focus:border-[#D7B46B] transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-sans text-[#D7B46B] tracking-wider uppercase mb-1.5 font-semibold">
                    BUSINESS EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={formState.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-[#EEEAE2] placeholder:text-[#777168] focus:outline-none focus:border-[#D7B46B] transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] font-sans text-[#D7B46B] tracking-wider uppercase mb-1.5 font-semibold">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={formState.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-[#EEEAE2] placeholder:text-[#777168] focus:outline-none focus:border-[#D7B46B] transition-colors"
                  />
                </div>
              </div>

              {/* Enquiry Type */}
              <div>
                <label className="block text-[10px] font-sans text-[#D7B46B] tracking-wider uppercase mb-2.5 font-semibold">
                  ENQUIRY TYPE *
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {enquiryOptions.map((option) => {
                    const isSelected = formState.enquiryType === option;

                    return (
                      <button
                        type="button"
                        key={option}
                        aria-pressed={isSelected}
                        onClick={() => updateField('enquiryType', option)}
                        className={`px-4 py-3 rounded-xl text-left font-sans text-xs flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? 'bg-[rgba(215,180,107,0.1)] border border-[#D7B46B] text-[#EEEAE2] shadow-md'
                            : 'bg-[#070707] border border-white/10 text-[#D7B46B] hover:border-[rgba(215,180,107,0.4)]'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#D7B46B] bg-[#D7B46B]'
                              : 'border-white/30 bg-transparent'
                          }`}
                        >
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                          )}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Category */}
              {formState.enquiryType ===
                'Manufacturing Brand – Exhibiting Enquiry' && (
                <div className="animate-fadeIn">
                  <label className="block text-[10px] font-sans text-[#D7B46B] tracking-wider uppercase mb-1.5 font-semibold">
                    PRODUCT CATEGORY * (FOR MANUFACTURING BRANDS)
                  </label>

                  <input
                    type="text"
                    required
                    value={formState.productCategory}
                    onChange={(e) =>
                      updateField('productCategory', e.target.value)
                    }
                    placeholder="e.g. Architectural Lighting, Facades, High-End Surfaces, Bath & Sanitation, Automation"
                    className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-[rgba(215,180,107,0.4)] text-xs font-sans text-[#EEEAE2] placeholder:text-[#777168] focus:outline-none focus:border-[#D7B46B] transition-colors"
                  />

                  <p className="text-[10px] font-sans text-[#AAA59B] mt-1">
                    Helps the Archinet curation team verify edition category
                    exclusivity.
                  </p>
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-[10px] font-sans text-[#D7B46B] tracking-wider uppercase mb-1.5 font-semibold">
                  MESSAGE
                </label>
                <textarea
                  rows={3}
                  value={formState.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Tell us about your brand, architectural practice or any specific queries..."
                  className="w-full px-4 py-3 rounded-xl bg-[#070707] border border-white/10 text-xs font-sans text-[#EEEAE2] placeholder:text-[#777168] focus:outline-none focus:border-[#D7B46B] transition-colors resize-none"
                />
              </div>

              {/* API Error Message */}
              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                >
                  {errorMessage}
                </div>
              )}

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <span className="text-[10px] font-sans text-[#AAA59B] leading-snug">
                  Strict confidentiality assured for all firm &amp; brand
                  inquiries.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#D7B46B] hover:bg-[#C4A05A] disabled:opacity-60 disabled:cursor-not-allowed text-black font-sans text-xs font-bold tracking-wider uppercase transition-colors shadow-lg cursor-pointer shrink-0 w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                      <span>SUBMITTING...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT ENQUIRY</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </RevealRight>
      </div>
    </section>
  );
}
