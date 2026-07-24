/** 旗津地圖點位 —— 用於實用地圖與首頁地圖模組。
 * 座標為公開地標的概略位置，實際導航請以 Google 地圖為準。 */

export type PlaceCategory =
  | 'ferry' | 'attraction' | 'food' | 'toilet'
  | 'parking' | 'bike' | 'beach';

export interface Place {
  id: string;
  name: string;
  englishName?: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  distanceFromFerry?: string;
  walkTime?: string;
  slope?: boolean;
  suggestedDuration?: string;
  nearby?: string;
  strollerFriendly?: boolean;
  sunset?: boolean;
  rainyOk?: boolean;
  href?: string;
}

export const CATEGORY_LABELS: Record<PlaceCategory, string> = {
  ferry: '渡輪站',
  attraction: '景點',
  food: '美食',
  toilet: '廁所',
  parking: '停車場',
  bike: '腳踏車租借',
  beach: '海灘',
};

export const PLACES: Place[] = [
  {
    id: 'cijin-ferry-terminal', name: '旗津輪渡站', englishName: 'Cijin Ferry Terminal',
    category: 'ferry', lat: 22.6157, lng: 120.2705,
    distanceFromFerry: '起點', walkTime: '—', slope: false,
    nearby: '旗津老街、天后宮', strollerFriendly: true, rainyOk: true,
    href: '/ferry/cijin-terminal/',
  },
  {
    id: 'cijin-old-street', name: '旗津老街（廟前路）', englishName: 'Cijin Old Street',
    category: 'food', lat: 22.6149, lng: 120.2699,
    distanceFromFerry: '約 100 公尺', walkTime: '步行約 2 分鐘', slope: false,
    suggestedDuration: '1–2 小時', nearby: '天后宮、旗后觀光市場',
    strollerFriendly: true, rainyOk: true, href: '/food/',
  },
  {
    id: 'cijin-tianhou-temple', name: '旗津天后宮', englishName: 'Cijin Tianhou Temple',
    category: 'attraction', lat: 22.6146, lng: 120.2696,
    distanceFromFerry: '約 200 公尺', walkTime: '步行約 3 分鐘', slope: false,
    suggestedDuration: '15–30 分鐘', nearby: '旗津老街',
    strollerFriendly: true, rainyOk: true, href: '/attractions/cijin-tianhou-temple/',
  },
  {
    id: 'cijin-beach', name: '旗津海水浴場', englishName: 'Cijin Beach',
    category: 'beach', lat: 22.6112, lng: 120.2668,
    distanceFromFerry: '約 600 公尺', walkTime: '步行約 8 分鐘', slope: false,
    suggestedDuration: '30–60 分鐘', nearby: '海岸公園、星空隧道',
    strollerFriendly: true, sunset: true, href: '/attractions/cijin-beach/',
  },
  {
    id: 'star-tunnel', name: '星空隧道', englishName: 'Star Tunnel',
    category: 'attraction', lat: 22.6135, lng: 120.2635,
    distanceFromFerry: '約 900 公尺', walkTime: '步行約 12 分鐘', slope: false,
    suggestedDuration: '15–20 分鐘', nearby: '旗后砲台、海水浴場',
    strollerFriendly: true, rainyOk: true, href: '/attractions/star-tunnel/',
  },
  {
    id: 'cihou-fort', name: '旗后砲台', englishName: 'Cihou Fort',
    category: 'attraction', lat: 22.6155, lng: 120.2626,
    distanceFromFerry: '約 1.1 公里', walkTime: '步行約 18 分鐘（含爬坡）', slope: true,
    suggestedDuration: '30–45 分鐘', nearby: '旗后燈塔、星空隧道',
    sunset: true, href: '/attractions/cihou-fort/',
  },
  {
    id: 'cihou-lighthouse', name: '旗后燈塔', englishName: 'Cihou Lighthouse',
    category: 'attraction', lat: 22.6178, lng: 120.2645,
    distanceFromFerry: '約 1.3 公里', walkTime: '步行約 20 分鐘（含爬坡與階梯）', slope: true,
    suggestedDuration: '45–60 分鐘', nearby: '旗后砲台',
    sunset: true, href: '/attractions/cihou-lighthouse/',
  },
  {
    id: 'seafood-market', name: '旗后觀光市場', englishName: 'Cihou Market',
    category: 'food', lat: 22.6144, lng: 120.2702,
    distanceFromFerry: '約 150 公尺', walkTime: '步行約 3 分鐘', slope: false,
    suggestedDuration: '30 分鐘', nearby: '旗津老街', strollerFriendly: true, rainyOk: true,
  },
  {
    id: 'rainbow-church', name: '彩虹教堂', englishName: 'Rainbow Church',
    category: 'attraction', lat: 22.6098, lng: 120.2685,
    distanceFromFerry: '約 800 公尺', walkTime: '步行約 12 分鐘', slope: false,
    suggestedDuration: '15 分鐘', nearby: '海岸公園、貝殼館',
    strollerFriendly: true, sunset: true, href: '/attractions/rainbow-church/',
  },
  {
    id: 'windmill-park', name: '旗津風車公園', englishName: 'Cijin Wind Turbine Park',
    category: 'attraction', lat: 22.6045, lng: 120.2712,
    distanceFromFerry: '約 1.8 公里', walkTime: '建議騎腳踏車約 10 分鐘', slope: false,
    suggestedDuration: '30 分鐘', nearby: '海岸自行車道',
    strollerFriendly: true, sunset: true, href: '/attractions/windmill-park/',
  },
  {
    id: 'parking-1', name: '旗津公有停車場', category: 'parking',
    lat: 22.6163, lng: 120.2718, distanceFromFerry: '約 250 公尺',
    walkTime: '步行約 4 分鐘', slope: false, strollerFriendly: true,
  },
  {
    id: 'toilet-street', name: '老街公廁', category: 'toilet',
    lat: 22.6151, lng: 120.2701, distanceFromFerry: '約 120 公尺',
    walkTime: '步行約 2 分鐘', slope: false, strollerFriendly: true, rainyOk: true,
  },
  {
    id: 'toilet-beach', name: '海水浴場公廁', category: 'toilet',
    lat: 22.6116, lng: 120.2672, distanceFromFerry: '約 600 公尺',
    walkTime: '步行約 8 分鐘', slope: false, strollerFriendly: true,
  },
  {
    id: 'bike-1', name: '輪渡站前腳踏車租借', category: 'bike',
    lat: 22.6154, lng: 120.2703, distanceFromFerry: '約 50 公尺',
    walkTime: '步行約 1 分鐘', slope: false,
  },
];

/** 常用步行距離（依可靠地圖資料概估，實際以現場為準） */
export const WALK_LEGS: { from: string; to: string; time: string }[] = [
  { from: '輪渡站', to: '天后宮', time: '約 3 分鐘' },
  { from: '天后宮', to: '海水浴場', time: '約 8 分鐘' },
  { from: '海水浴場', to: '星空隧道', time: '約 10 分鐘' },
  { from: '星空隧道', to: '燈塔', time: '需上坡及爬階梯，約 15 分鐘' },
];
