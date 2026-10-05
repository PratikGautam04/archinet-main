'use client';

import React from 'react';
import Link from 'next/link';
import BrandLogo from './BrandLogo';
import {
  RevealUp,
  StaggerContainer,
  StaggerItem,
} from '../animations/ScrollReveal';

export interface MetadataField {
  keyName?: string;
  response?: unknown;
  inputType?: string;
  fieldLabel?: string;
  placeholder?: string;
  defaultValue?: string;
  cardJson?: MetadataCard[] | string;
}

export interface MetadataCard {
  fields?: MetadataField[];
  [key: string]: unknown;
}

export interface FooterProps {
  data?: MetadataField[] | Record<string, any>;
}

/* -------------------------------------------------
   Normalize key names (e.g. section_link -> sectionlink)
------------------------------------------------- */
const normalizeKey = (key: string): string => {
  return (key || '')
    .toLowerCase()
    .replace(/[\s_-]/g, '');
};

/* -------------------------------------------------
   Find field in array or object
------------------------------------------------- */
const findField = (
  fields: MetadataField[] | Record<string, any> | undefined,
  keyName: string
): MetadataField | undefined => {
  if (!fields) return undefined;

  const targetKey = normalizeKey(keyName);

  if (Array.isArray(fields)) {
    return fields.find(
      (f) => normalizeKey(f?.keyName || '') === targetKey
    );
  }

  if (typeof fields === 'object') {
    if (fields[keyName]) return fields[keyName];
    for (const k of Object.keys(fields)) {
      if (normalizeKey(k) === targetKey) {
        return fields[k];
      }
    }
  }

  return undefined;
};

/* -------------------------------------------------
   Extract field string response
------------------------------------------------- */
const getFieldResponse = (field?: MetadataField): string => {
  if (!field) return '';
  if (typeof field.response === 'string') return field.response.trim();
  if (field.response !== undefined && field.response !== null) {
    return String(field.response).trim();
  }
  return '';
};

/* -------------------------------------------------
   Normalize cardJson
------------------------------------------------- */
const normalizeCards = (value: unknown): MetadataCard[] => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value as MetadataCard[];
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed as MetadataCard[];
      }
    } catch (error) {
      console.error('Failed to parse cardJson:', error);
      return [];
    }
  }

  return [];
};

/* -------------------------------------------------
   Get field from a card with multiple key candidates
------------------------------------------------- */
const getCardFieldResponse = (
  card: MetadataCard | undefined,
  candidateKeys: string[]
): string => {
  if (!card) return '';

  const targets = candidateKeys.map(normalizeKey);

  // 1. Structure with fields array: { fields: [{ keyName: "title", response: "..." }] }
  if (Array.isArray(card.fields)) {
    const field = card.fields.find((item) =>
      targets.includes(normalizeKey(item?.keyName || ''))
    );
    if (field?.response !== undefined && field?.response !== null) {
      return String(field.response).trim();
    }
  }

  // 2. Direct object structure: { title: "...", links: "..." }
  for (const key of Object.keys(card)) {
    if (targets.includes(normalizeKey(key))) {
      const value = card[key];
      if (typeof value === 'string' || typeof value === 'number') {
        return String(value).trim();
      }
    }
  }

  return '';
};

export default function Footer({ data }: FooterProps) {
  /* -----------------------------------------------
     Direct Fields from Metadata
  ------------------------------------------------ */
  const logoField = findField(data, 'logo');
  const logo = getFieldResponse(logoField);

  const taglineField = findField(data, 'tagline');
  const tagline = getFieldResponse(taglineField) || 'WE BRIDGE THE GAP.';

  const descriptionField = findField(data, 'description');
  const description =
    getFieldResponse(descriptionField) ||
    'The premier invitation-only architectural matrix connecting visionary global principals with world-class luxury interior & structural innovators.';

  const copyrightField = findField(data, 'copyright');
  const copyright =
    getFieldResponse(copyrightField) ||
    `© ${new Date().getFullYear()} Archinet. All rights reserved.`;

  const managedByField = findField(data, 'managed_by');
  const managedBy = getFieldResponse(managedByField);

  /* -----------------------------------------------
     Card Data from Metadata
  ------------------------------------------------ */
  const exploreField = findField(data, 'explore_links');
  const exploreCards = normalizeCards(exploreField?.cardJson);

  const contactField = findField(data, 'contact_information');
  const contactCards = normalizeCards(contactField?.cardJson);

  return (
    <footer className="w-full bg-[#050505] text-[var(--text-secondary)] py-16 px-6 lg:px-12 border-t border-[rgba(240,171,68,0.2)]">
      <StaggerContainer
        staggerChildren={0.15}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[rgba(255,255,255,0.08)]"
      >
        {/* =======================================
            BRAND COLUMN
        ======================================= */}
        <StaggerItem direction="left" className="lg:col-span-2 flex flex-col gap-4">
          <Link
            href="#"
            className="inline-flex w-fit transition-opacity hover:opacity-90"
            aria-label="Archinet home"
          >
            {logo ? (
              <img
                src={logo}
                alt="Archinet"
                className="h-auto w-[180px] sm:w-[210px] object-contain"
              />
            ) : (
              <BrandLogo />
            )}
          </Link>

          {tagline && (
            <p className="text-xs font-mono text-[var(--accent-gold)] tracking-widest uppercase font-semibold">
              {tagline}
            </p>
          )}

          {description && (
            <p className="text-xs font-sans text-[var(--text-secondary)] max-w-sm leading-relaxed">
              {description}
            </p>
          )}
        </StaggerItem>

        {/* =======================================
            EXPLORE COLUMN
        ======================================= */}
        <StaggerItem direction="up" className="flex flex-col gap-3 font-mono text-xs">
          <span className="text-white font-bold tracking-widest uppercase mb-1">
            EXPLORE
          </span>

          {exploreCards.length > 0 ? (
            exploreCards.map((card, idx) => {
              const label = getCardFieldResponse(card, [
                'section_link',
                'title',
                'label',
                'name',
              ]);
              const href = getCardFieldResponse(card, [
                'links',
                'link',
                'href',
                'url',
              ]);

              if (!label) return null;

              return (
                <Link
                  key={`${label}-${idx}`}
                  href={href || '#'}
                  className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
                >
                  {label}
                </Link>
              );
            })
          ) : (
            <>
              <Link
                href="#about"
                className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
              >
                ABOUT SUMMIT
              </Link>
              <Link
                href="#edition-14"
                className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
              >
                14TH EDITION MUMBAI
              </Link>
              <Link
                href="#editions"
                className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
              >
                PAST EDITIONS
              </Link>
              <Link
                href="#leaders"
                className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
              >
                INDUSTRY LEADERS
              </Link>
              <Link
                href="#testimonials"
                className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors"
              >
                ATTENDEE WORDS
              </Link>
            </>
          )}
        </StaggerItem>

        {/* =======================================
            CONTACT COLUMN
        ======================================= */}
        <StaggerItem direction="up" className="flex flex-col gap-3 font-mono text-xs">
          <span className="text-white font-bold tracking-widest uppercase mb-1">
            CONTACT
          </span>

          {contactCards.length > 0 ? (
            contactCards.map((card, idx) => {
              const title = getCardFieldResponse(card, [
                'section_title',
                'title',
                'heading',
              ]);
              const details = getCardFieldResponse(card, [
                'contact_details',
                'details',
                'description',
                'text',
              ]);

              if (!title && !details) return null;

              return (
                <div key={`${title || 'contact'}-${idx}`} className="flex flex-col gap-1.5">
                  {title && title.toUpperCase() !== 'CONTACT' && (
                    <span className="text-[var(--accent-gold)] font-semibold tracking-wider uppercase">
                      {title}
                    </span>
                  )}
                  {details && (
                    <p className="whitespace-pre-line text-[var(--text-secondary)] leading-relaxed">
                      {details}
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="whitespace-pre-line text-[var(--text-secondary)] leading-relaxed">
              Mumbai: +91 (022) 4890 1200{'\n'}
              invitations@archinet.ai.studio{'\n'}
              The St. Regis, Lower Parel{'\n'}
              Mumbai, MH 400013, India
            </p>
          )}
        </StaggerItem>
      </StaggerContainer>

      {/* =========================================
          BOTTOM FOOTER
      ========================================= */}
      <RevealUp className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[var(--text-muted)] gap-4">
        <span>{copyright}</span>

        {managedBy && (
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="font-sans text-[14px] sm:text-[15px] font-normal text-[#e5e2db]">
              Managed by
            </span>
            <img
              src="https://unicladsurface.com/_next/image?url=%2Fhome%2FSalesUpBlackBg.png&w=640&q=75"
              alt={managedBy}
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </div>
        )}
      </RevealUp>
    </footer>
  );
}