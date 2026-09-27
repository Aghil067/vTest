import { HelmetProvider, Helmet } from 'react-helmet-async';
import { config } from '@/config';
import type { SEOMeta } from '@/types';

interface SEOProps extends Partial<SEOMeta> {}

export function SEOHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  noIndex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${config.siteName}` : `${config.siteName} — ${config.siteTagline}`;
  const metaDescription = description || config.siteDescription;
  const ogImg = ogImage || `${config.siteUrl}/og-image.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || fullTitle} />
      <meta property="og:description" content={ogDescription || metaDescription} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={config.siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || fullTitle} />
      <meta name="twitter:description" content={ogDescription || metaDescription} />
      <meta name="twitter:image" content={ogImg} />
    </Helmet>
  );
}

export function SEOProvider({ children }: { children: React.ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}
