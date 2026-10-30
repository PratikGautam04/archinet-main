
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';

interface PageMetadata {
  title: string;
  description: string;
}

const DEFAULT_DESCRIPTION =
  'Archinet connects leading architects, interior designers and premium architectural brands through exclusive networking events and exhibition experiences across India.';

const SLUG_METADATA: Record<string, PageMetadata> = {
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

interface SlugLayoutProps {
  params: Promise<{ slug: string }> | { slug: string };
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);

  const rawSlug = resolvedParams?.slug || '';
  const normalizedSlug = rawSlug.toLowerCase();

  const pageMeta = SLUG_METADATA[normalizedSlug];

  const title =
    pageMeta?.title ||
    `${rawSlug
      ? rawSlug.charAt(0).toUpperCase() + rawSlug.slice(1)
      : 'Edition'} | Archinet`;

  const description = pageMeta?.description || DEFAULT_DESCRIPTION;

  // Build absolute URLs using the production website URL.
  const canonicalUrl = new URL(
    `/${normalizedSlug}`,
    SITE_CONFIG.url
  ).toString();

  const ogImageUrl = new URL(
    SITE_CONFIG.ogImage,
    SITE_CONFIG.url
  ).toString();

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      url: canonicalUrl,
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1376,
          height: 768,
          alt: `${title} preview`,
        },
      ],
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function SlugLayout({ children }: SlugLayoutProps) {
  return <>{children}</>;
}
