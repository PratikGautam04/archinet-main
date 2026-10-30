
import type { Metadata } from 'next';

import { API_CONFIG } from '../../config/api';
import { SITE_CONFIG } from '../../config/site';
import type { WebTemplate } from '../../types/metadata';
import { getFieldValue, getSection } from '../../utils/metadata';

import Header from '../../components/layout/Header';
import HeroSectionVideo from '../../components/sections/HeroSectionVideo';
import AboutSection from '../../components/sections/AboutSection';
import Archinet2026VideoSection from '../../components/sections/Archinet2026VideoSection';
import EventHero from '../../components/sections/EventHero';
import ArchinetExperienceSection from '../../components/sections/ArchinetExperienceSection';
import HowArchinetWorksSection from '../../components/sections/HowArchinetWorksSection';
import WhoWeInviteSection from '../../components/sections/WhoWeInviteSection';
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
  params: Promise<{ slug: string }>;
}

// Static SEO fallback for pages without dynamic SEO fields.
const SLUG_METADATA: Record<
  string,
  { title: string; description: string }
> = {
  archinet: {
    title: 'Archinet | Architecture, Design & Networking Events — India',
    description:
      'Archinet connects leading architects, interior designers and premium architectural brands through exclusive networking events and exhibition experiences across India.',
  },

  about: {
    title: 'About Archinet | Premier Architecture & Design Networking',
    description:
      'Learn about Archinet — bridging the gap between visionary architects, interior designers, and leading architectural brands across India.',
  },

  editions: {
    title: 'Archinet Editions | Curated Architectural Summits Across India',
    description:
      'Explore past and upcoming Archinet editions across India, connecting architecture professionals and industry leaders.',
  },

  exhibiting: {
    title: 'Exhibiting Opportunities | Archinet Brand Showcase',
    description:
      'Showcase premium architectural products and interior materials to leading principal architects and design professionals across India.',
  },

  contact: {
    title: 'Contact & Invitations | Archinet',
    description:
      'Request an exclusive invitation or connect with the Archinet curation team for brand participation and edition alliances.',
  },
};

/**
 * Fetches Archinet website metadata from the Metadata Master API.
 * Uses the configured group company ID and falls back to company ID 13.
 */
async function fetchArchinetTemplate(): Promise<WebTemplate | null> {
  const fetchByCompanyId = async (
    groupCompanyId: string
  ): Promise<WebTemplate | null> => {
    const url = new URL(
      API_CONFIG.BASE_URL + API_CONFIG.METADATA_VALUES_ENDPOINT
    );

    url.searchParams.set('groupCompanyId', groupCompanyId);

    const response = await fetch(url.toString(), {
      headers: {
        Accept: 'application/json',
      },
      next: {
        revalidate: 300,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Metadata API failed: ${response.status} ${response.statusText}`
      );
    }

    const data: WebTemplate[] = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    // First, find the exact Archinet metadata key.
    const exactMatch = data.find(
      (item) =>
        item.metadataKey?.toLowerCase() ===
        API_CONFIG.METADATA_KEY.toLowerCase()
    );

    if (exactMatch) {
      return exactMatch;
    }

    // Fallback: find another metadata key containing "Archinet".
    const fallbackItem =
      data.find((item) =>
        item?.metadataKey?.toLowerCase().includes('archinet')
      ) || data[0];

    return fallbackItem || null;
  };

  try {
    return await fetchByCompanyId(API_CONFIG.GROUP_COMPANY_ID);
  } catch (initialError) {
    // Preserve the existing fallback to groupCompanyId 13.
    if (API_CONFIG.GROUP_COMPANY_ID !== '13') {
      try {
        return await fetchByCompanyId('13');
      } catch (fallbackError) {
        console.error(
          'Failed to fetch Archinet metadata using fallback company ID:',
          fallbackError
        );
        return null;
      }
    }

    console.error('Failed to fetch Archinet metadata:', initialError);
    return null;
  }
}

/**
 * Safely converts a relative or absolute URL into an absolute URL.
 */
function getAbsoluteUrl(value: string, fallback: string): string {
  try {
    return new URL(value, SITE_CONFIG.url).toString();
  } catch {
    return new URL(fallback, SITE_CONFIG.url).toString();
  }
}

/**
 * Dynamic SEO metadata.
 * Only /archinet uses SEO values from Metadata Master.
 * Other pages use their static fallback metadata.
 */
export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();

  const staticMetadata = SLUG_METADATA[normalizedSlug] || {
    title: 'Archinet | Architecture & Design Networking Events',
    description:
      'Discover Archinet architecture and design networking events across India.',
  };

  let title = staticMetadata.title;
  let description = staticMetadata.description;
  let keywords: string[] | undefined;

  let ogTitle = title;
  let ogDescription = description;
  let ogImage: string = SITE_CONFIG.ogImage;
  let canonicalUrl = getAbsoluteUrl(`/${normalizedSlug}`, SITE_CONFIG.url);

  // Dynamic SEO is required only for the Archinet homepage.
  if (normalizedSlug === 'archinet') {
    const template = await fetchArchinetTemplate();

    const seoFields = getSection(
      template?.metadataValues,
      'seo_metadata'
    );

    // Meta title
    title =
      getFieldValue(seoFields, 'archinet_meta_title') || title;

    // Meta description
    description =
      getFieldValue(seoFields, 'archinet_meta_description') ||
      description;

    // Meta keywords
    const keywordsValue = getFieldValue(
      seoFields,
      'archinet_meta_keywords'
    );

    if (keywordsValue) {
      keywords = keywordsValue
        .split(',')
        .map((keyword) => keyword.trim())
        .filter(Boolean);
    }

    // Canonical URL
    const canonicalValue = getFieldValue(
      seoFields,
      'archinet_canonical_url'
    );

    if (canonicalValue) {
      canonicalUrl = getAbsoluteUrl(
        canonicalValue,
        `/${normalizedSlug}`
      );
    }

    // Open Graph title
    ogTitle =
      getFieldValue(seoFields, 'archinet_og_title') || title;

    // Open Graph description
    ogDescription =
      getFieldValue(seoFields, 'archinet_og_description') ||
      description;

    // Open Graph image
    const ogImageValue = getFieldValue(
      seoFields,
      'archinet_og_image'
    );

    if (ogImageValue) {
      ogImage = ogImageValue;
    }
  }

  const absoluteOgImage = getAbsoluteUrl(
    ogImage,
    SITE_CONFIG.ogImage
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: 'website',
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      url: canonicalUrl,
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: absoluteOgImage,
          width: 1376,
          height: 768,
          alt: 'Archinet Architecture & Design Networking Events India',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [absoluteOgImage],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Main dynamic page.
 * Fetches website content on the server and renders the existing sections.
 */
export default async function DynamicPage({
  params,
}: DynamicPageProps) {
  const { slug } = await params;

  const template = await fetchArchinetTemplate();

  const metadataValues = template?.metadataValues;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden relative bg-black text-[#AAA59B] selection:bg-[#f0ab44] selection:text-black font-sans">
      <Header />

      <main>
        <HeroSectionVideo
          data={getSection(metadataValues, 'hero')}
        />

        <AboutSection
          data={getSection(metadataValues, 'about')}
        />

        <Archinet2026VideoSection
          data={getSection(
            metadataValues,
            'archinet_video',
            'archinet video'
          )}
        />

        <EventHero
          data={getSection(
            metadataValues,
            '14th_edition',
            '14th edition',
            'event_hero',
            'event hero'
          )}
        />

        <ArchinetExperienceSection
          data={getSection(
            metadataValues,
            'archinet_experience',
            'the_archinet_experience',
            'experience',
            'pillars',
            'four_pillars'
          )}
        />

        <HowArchinetWorksSection
          data={getSection(
            metadataValues,
            'how_archinet_works',
            'how_it_works',
            'how it works',
            'how archinet works'
          )}
        />

        <WhoWeInviteSection
          data={getSection(
            metadataValues,
            'who_we_invite',
            'who we invite',
            'attendee_profile',
            'attendee profile',
            'attendees'
          )}
        />

        {/* 
        <ArchinetCoreSection
          data={getSection(
            metadataValues,
            'archinet_core',
            'the_archinet_core',
            'core',
            'the archinet core',
            'brand_intro'
          )}
        />
        */}

        <IntroStatement
          data={getSection(metadataValues, 'purpose')}
        />

        <FixedBackgroundSection
          image="/images/building-divider.jpg"
          overlayOpacity={0.18}
          minHeight="60vh"
        />

        <EditionsSection
          data={getSection(
            metadataValues,
            'previous_editions',
            'PREVIOUS EDITIONS',
            'build_over_time',
            'build over time',
            'editions'
          )}
        />

        <StatisticsSection
          data={getSection(metadataValues, 'statistics')}
        />

        <LeadersSection
          data={getSection(
            metadataValues,
            'leaders_ship',
            'leaders',
            'leadership'
          )}
        />

        <TestimonialsSection
          data={getSection(metadataValues, 'testimonials')}
        />

        <BrandsSection
          data={getSection(metadataValues, 'brands')}
        />

        <ContactSection
          data={getSection(metadataValues, 'contact')}
        />

        <GalleryStrip
          data={getSection(metadataValues, 'gallery')}
        />
      </main>

      <Footer
        data={getSection(metadataValues, 'footer')}
      />
    </div>
  );
}
