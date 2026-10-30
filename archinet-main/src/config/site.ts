/**
 * Production Site & SEO Configuration
 *
 * CONFIGURATION PLACEHOLDER:
 * The production domain is configured via NEXT_PUBLIC_SITE_URL.
 * If not provided in environment variables, it defaults to 'https://www.archinet.in'.
 * Please configure NEXT_PUBLIC_SITE_URL in your hosting platform (e.g. Vercel)
 * if your live production domain differs.
 */
export const SITE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.archinet.in', // CONFIGURATION PLACEHOLDER: Confirm production domain
  name: 'Archinet',
  locale: 'en_IN',
  ogImage: '/images/audience-hero.jpg', // Existing high-resolution event preview asset (1376x768)
} as const;

