/** 全站設定與常數 —— 旗津老街 Cijinlaojie.com */

export const SITE = {
  name: '旗津老街',
  englishName: 'CIJIN LAOJIE',
  tagline: '旗津景點、美食、渡輪與一日遊指南',
  url: 'https://cijinlaojie.com',
  locale: 'zh-Hant-TW',
  ogLocale: 'zh_TW',
  /** 全站資料最後核對日期 */
  lastChecked: '2026-07-24',
  lastCheckedText: '2026年7月24日',
  defaultOgImage: '/images/cijin-old-street.jpg',
  /** 設定後填入你的 Cloudflare Web Analytics token；留空則不載入 */
  cfBeaconToken: '',
  /** 或填入 GA4 評估 ID（G-XXXX）；留空則不載入 */
  ga4Id: 'G-HXM22WWPKP',
} as const;

export type NavItem = { label: string; href: string };

/** 旗津老街景點核心事實（唯一來源，詳見 Google 商家 / 地圖資訊） */
export const ATTRACTION = {
  name: '旗津老街',
  englishName: 'Cijin Old Street',
  description:
    '旗津老街位於高雄旗津輪渡站附近，以旗津天后宮、現流海鮮與傳統小吃聞名，是旗津最熱鬧的觀光街區。',
  image: '/images/cijin-old-street.jpg',
  address: {
    streetAddress: '廟前路',
    addressLocality: '高雄市旗津區',
    postalCode: '805',
    addressCountry: 'TW',
  },
  geo: { latitude: 22.6149, longitude: 120.2699 },
  telephone: '+886227016880',
  plusCode: 'J779+8F 高雄市旗津區',
  mapsUrl: 'https://maps.app.goo.gl/94fZpoRmL5YQmajc7',
  rating: { value: 4.2, count: 27715 },
  isAccessibleForFree: true,
} as const;

/** 頂欄六個主入口（不要超過六個） */
export const NAV: NavItem[] = [
  { label: '老街美食', href: '/food/' },
  { label: '旗津景點', href: '/attractions/' },
  { label: '渡輪交通', href: '/ferry/' },
  { label: '行程規劃', href: '/itinerary/' },
  { label: '實用地圖', href: '/map/' },
  { label: '最新資訊', href: '/updates/' },
];

export const FOOTER_LINKS: { title: string; items: NavItem[] }[] = [
  {
    title: '規劃行程',
    items: [
      { label: '第一次去旗津', href: '/transport/how-to-get-there/' },
      { label: '旗津半日遊', href: '/itinerary/half-day/' },
      { label: '旗津一日遊', href: '/itinerary/one-day/' },
      { label: '只有 2 小時', href: '/itinerary/2-hours/' },
      { label: '夕陽與晚餐', href: '/itinerary/sunset/' },
    ],
  },
  {
    title: '景點與美食',
    items: [
      { label: '旗津天后宮', href: '/attractions/cijin-tianhou-temple/' },
      { label: '旗后燈塔', href: '/attractions/cihou-lighthouse/' },
      { label: '旗后砲台', href: '/attractions/cihou-fort/' },
      { label: '星空隧道', href: '/attractions/star-tunnel/' },
      { label: '老街必吃', href: '/food/' },
    ],
  },
  {
    title: '交通資訊',
    items: [
      { label: '渡輪票價與時刻', href: '/ferry/' },
      { label: '旗津怎麼去', href: '/transport/how-to-get-there/' },
      { label: '停車場', href: '/transport/parking/' },
      { label: '腳踏車租借', href: '/transport/bike-rental/' },
    ],
  },
  {
    title: '關於',
    items: [
      { label: '關於本站', href: '/about/' },
      { label: '常見問題', href: '/faq/' },
      { label: '最新更新', href: '/updates/' },
    ],
  },
];
