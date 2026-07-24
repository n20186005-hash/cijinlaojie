/** 渡輪事實資料 —— 鼓山－旗津航線。
 * 票價與班次會變動，實際以高雄市輪船公司現場與最新公告為準。
 * status: verified | needs-review | temporarily-closed | seasonal | unknown */

export type FactStatus = 'verified' | 'needs-review' | 'temporarily-closed' | 'seasonal' | 'unknown';

export interface Fact<T = string> {
  value: T;
  status: FactStatus;
  note?: string;
}

export const FERRY = {
  route: '鼓山－旗津航線（Gushan–Cijin Ferry）',
  lastChecked: '2026-07-24',
  official: {
    name: '高雄市輪船股份有限公司',
    url: 'https://kcs.kcg.gov.tw/',
  },
  fares: [
    { type: '一般（全票）', price: 'NT$30', note: '單程；可刷卡進出', status: 'needs-review' as FactStatus },
    { type: '兒童／敬老／愛心', price: 'NT$15', note: '單程，優待票', status: 'needs-review' as FactStatus },
    { type: '腳踏車（含人）', price: 'NT$40', note: '含騎乘者', status: 'needs-review' as FactStatus },
    { type: '機車（含騎士）', price: 'NT$50', note: '含騎士，連假可能管制', status: 'needs-review' as FactStatus },
  ],
  payment: {
    value: '悠遊卡、一卡通、現金皆可',
    status: 'verified' as FactStatus,
    note: '刷卡進出站，建議先儲值；現金請自備零錢。',
  },
  duration: { value: '約 5–10 分鐘', status: 'verified' as FactStatus },
  headway: {
    value: '尖峰約 5–10 分鐘一班，離峰班距較長',
    status: 'needs-review' as FactStatus,
    note: '實際班距依現場調度，連假加開。',
  },
  hours: {
    value: '約 05:00 至凌晨（跨日營運）',
    status: 'needs-review' as FactStatus,
    note: '首末班時間依季節與公告調整，夜間班距較長。',
  },
  rules: [
    '行人：直接刷卡或投現進站，於候船區排隊上船。',
    '腳踏車：可連人帶車上船，牽車依動線排隊。',
    '機車：可載運，但連續假期常有數量管制或改道，出發前請查看公告。',
    '尖峰與連假人潮多，請預留排隊時間。',
  ],
} as const;

export const STATUS_LABEL: Record<FactStatus, string> = {
  'verified': '已核對',
  'needs-review': '待重新核對',
  'temporarily-closed': '暫停',
  'seasonal': '季節性',
  'unknown': '未知',
};
