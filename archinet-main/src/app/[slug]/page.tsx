'use client';

import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { API_CONFIG } from '../../config/api';
import { WebTemplate } from '../../types/metadata';
import { getSection } from '../../utils/metadata';

import Header from '../../components/layout/Header';
import HeroSectionVideo from '../../components/sections/HeroSectionVideo';
import AboutSection from '../../components/sections/AboutSection';
import Archinet2026VideoSection from '../../components/sections/Archinet2026VideoSection';
import EventHero from '../../components/sections/EventHero';
import IntroStatement from '../../components/sections/IntroStatement';
import FixedBackgroundSection from '../../components/sections/FixedBackgroundSection';
import EditionsSection from '../../components/sections/EditionsSection';
import StatisticsSection from '../../components/sections/StatisticsSection';
import LeadersSection from '../../components/sections/LeadersSection';
import TestimonialsSection from '../../components/sections/TestimonialsSection';
import BrandsSection from '../../components/sections/BrandsSection';
import ContactSection from '../../components/sections/ContactSection';
import GalleryStrip from '../../components/sections/GalleryStrip';
import Footer from '../../components/layout/Footer';

interface DynamicPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default function DynamicPage({ params }: DynamicPageProps) {
  const resolvedParams =
    params && typeof (params as any).then === 'function'
      ? use(params as Promise<{ slug: string }>)
      : (params as { slug: string });

  const { slug } = resolvedParams;

  const [webTemplate, setWebTemplate] = useState<WebTemplate[]>([]);

  const metadataValues = webTemplate[0]?.metadataValues;

  useEffect(() => {
    const fetchSPAContent = async () => {
      try {
        const response = await axios.get(
          API_CONFIG.BASE_URL + API_CONFIG.METADATA_VALUES_ENDPOINT,
          {
            params: {
              groupCompanyId: API_CONFIG.GROUP_COMPANY_ID,
            },
          }
        );

        const archinetArr = (response.data || []).filter(
          (item: WebTemplate) =>
            item.metadataKey &&
            item.metadataKey.toLowerCase() === API_CONFIG.METADATA_KEY.toLowerCase()
        );

        setWebTemplate(archinetArr);
      } catch (error) {
        console.error('Failed to fetch Archinet metadata:', error);
      }
    };

    fetchSPAContent();
  }, [slug]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden relative bg-[#070707] text-[#f5f2eb] selection:bg-[var(--accent-gold)] selection:text-[#070707]">
      <Header />
      <main>
        <HeroSectionVideo data={getSection(metadataValues, 'hero')} />
        <AboutSection data={getSection(metadataValues, 'about')} />
        <Archinet2026VideoSection data={getSection(metadataValues, 'archinet_video', 'archinet video')} />
        <EventHero data={getSection(metadataValues, 'event_hero', 'event hero')} />
        <IntroStatement data={getSection(metadataValues, 'purpose')} />

        <FixedBackgroundSection
          image="/images/hero/hero-01.jpg"
          overlayOpacity={0.18}
          minHeight="60vh"
        />

        <EditionsSection data={getSection(metadataValues, 'build_over_time', 'build over time', 'editions')} />
        <StatisticsSection data={getSection(metadataValues, 'statistics')} />
        <LeadersSection data={getSection(metadataValues, 'leaders')} />
        <TestimonialsSection data={getSection(metadataValues, 'testimonials')} />
        <BrandsSection data={getSection(metadataValues, 'brands')} />
        <ContactSection data={getSection(metadataValues, 'contact')} />
        <GalleryStrip data={getSection(metadataValues, 'gallery')} />
      </main>
      <Footer data={getSection(metadataValues, 'footer')} />
    </div>
  );
}
