import { SITE } from '../config';

export interface Crumb { name: string; href: string }

export function abs(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return new URL(path, SITE.url).href;
}

/** 全站 Organization + WebSite JSON-LD */
export function siteJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.name,
      alternateName: SITE.englishName,
      url: SITE.url,
      logo: abs('/images/cijin-old-street.jpg'),
      description: SITE.tagline,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      inLanguage: SITE.locale,
    },
  ];
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  if (!crumbs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.href),
    })),
  };
}
