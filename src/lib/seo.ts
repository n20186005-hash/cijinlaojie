import { SITE, ATTRACTION } from '../config';

export interface Crumb { name: string; href: string }
export interface FaqPair { q: string; a: string }

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

/** 旗津老街 TouristAttraction 結構化資料（含評分、電話、地址、座標、Google 地圖 sameAs） */
export function touristAttractionJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: ATTRACTION.name,
    alternateName: ATTRACTION.englishName,
    description: ATTRACTION.description,
    url: SITE.url,
    image: abs(ATTRACTION.image),
    telephone: ATTRACTION.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ATTRACTION.address.streetAddress,
      addressLocality: ATTRACTION.address.addressLocality,
      postalCode: ATTRACTION.address.postalCode,
      addressCountry: ATTRACTION.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ATTRACTION.geo.latitude,
      longitude: ATTRACTION.geo.longitude,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ATTRACTION.rating.value,
      reviewCount: ATTRACTION.rating.count,
      bestRating: 5,
    },
    isAccessibleForFree: ATTRACTION.isAccessibleForFree,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [ATTRACTION.mapsUrl],
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'Plus Code',
      value: ATTRACTION.plusCode,
    },
  };
}

/** 由問答陣列產生 FAQPage 結構化資料 */
export function faqPageJsonLd(items: FaqPair[]) {
  if (!items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
