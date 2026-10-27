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
import ArchinetExperienceSection from '../../components/sections/ArchinetExperienceSection';
import HowArchinetWorksSection from '../../components/sections/HowArchinetWorksSection';
import WhoWeInviteSection from '../../components/sections/WhoWeInviteSection';
import ArchinetCoreSection from '../../components/sections/ArchinetCoreSection';
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
    let isMounted = true;
    const fetchSPAContent = async () => {
      try {
        let response;
        try {
          response = await axios.get(
            API_CONFIG.BASE_URL + API_CONFIG.METADATA_VALUES_ENDPOINT,
            {
              params: {
                groupCompanyId: API_CONFIG.GROUP_COMPANY_ID,
              },
            }
          );
        } catch (initialErr) {
          // If custom groupCompanyId failed, fall back to default working company 13
          if (API_CONFIG.GROUP_COMPANY_ID !== '13') {
            response = await axios.get(
              API_CONFIG.BASE_URL + API_CONFIG.METADATA_VALUES_ENDPOINT,
              {
                params: {
                  groupCompanyId: '13',
                },
              }
            );
          } else {
            throw initialErr;
          }
        }

        if (!isMounted) return;

        const archinetArr = (response.data || []).filter(
          (item: WebTemplate) =>
            item.metadataKey &&
            item.metadataKey.toLowerCase() === API_CONFIG.METADATA_KEY.toLowerCase()
        );

        if (archinetArr.length > 0) {
          setWebTemplate(archinetArr);
        } else if (response.data && response.data.length > 0) {
          const fallbackItem =
            (response.data as WebTemplate[]).find((item) =>
              item?.metadataKey?.toLowerCase().includes('archinet')
            ) || response.data[0];
          setWebTemplate([fallbackItem]);
        }
      } catch (error) {
        console.error('Failed to fetch Archinet metadata:', error);
      }
    };

    fetchSPAContent();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden relative bg-black text-[#AAA59B] selection:bg-[#f0ab44] selection:text-black font-sans">
      <Header />
      <main>
        <HeroSectionVideo data={getSection(metadataValues, 'hero')} />
        <AboutSection data={getSection(metadataValues, 'about')} />
        <Archinet2026VideoSection data={getSection(metadataValues, 'archinet_video', 'archinet video')} />
        <EventHero data={getSection(metadataValues, '14th_edition', '14th edition', 'event_hero', 'event hero')} />
        <ArchinetExperienceSection data={getSection(metadataValues, 'archinet_experience', 'the_archinet_experience', 'experience', 'pillars', 'four_pillars')} />
        <HowArchinetWorksSection data={getSection(metadataValues, 'how_archinet_works', 'how_it_works', 'how it works', 'how archinet works')} />
        <WhoWeInviteSection data={getSection(metadataValues, 'who_we_invite', 'who we invite', 'attendee_profile', 'attendee profile', 'attendees')} />
        {/* <ArchinetCoreSection data={getSection(metadataValues, 'archinet_core', 'the_archinet_core', 'core', 'the archinet core', 'brand_intro')} /> */}
        <IntroStatement data={getSection(metadataValues, 'purpose')} />

        <FixedBackgroundSection
          image="/images/building-divider.jpg"
          overlayOpacity={0.18}
          minHeight="60vh"
        />

        <EditionsSection data={getSection(metadataValues, 'previous_editions', 'PREVIOUS EDITIONS', 'build_over_time', 'build over time', 'editions')} />
        <StatisticsSection data={getSection(metadataValues, 'statistics')} />
        <LeadersSection data={getSection(metadataValues, 'leaders_ship', 'leaders', 'leadership')} />
        <TestimonialsSection data={getSection(metadataValues, 'testimonials')} />
        <BrandsSection data={getSection(metadataValues, 'brands')} />
        <ContactSection data={getSection(metadataValues, 'contact')} />
        <GalleryStrip data={getSection(metadataValues, 'gallery')} />
      </main>
      <Footer data={getSection(metadataValues, 'footer')} />
    </div>
  );
}
