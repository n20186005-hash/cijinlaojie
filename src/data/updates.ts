/** 最新更新／更新日誌。日期新到舊排列。 */

export interface Update {
  date: string;        // YYYY-MM-DD
  title: string;
  detail: string;
  tag: '渡輪' | '施工' | '店家' | '活動' | '景點' | '一般';
}

export const UPDATES: Update[] = [
  {
    date: '2026-07-24',
    title: '更新渡輪站動線與票價核對狀態',
    detail: '重新整理鼓山、旗津兩端輪渡站的排隊動線說明，並標註渡輪票價待重新向官方核對。',
    tag: '渡輪',
  },
  {
    date: '2026-07-18',
    title: '補充海水浴場戲水區資訊',
    detail: '旗津海水浴場夏季開放戲水，部分區域於非開放時段禁止下水，請留意現場告示與救生員指示。',
    tag: '景點',
  },
  {
    date: '2026-07-10',
    title: '重新核對老街餐廳營業狀態',
    detail: '巡查廟前路一帶主要小吃與海鮮店家的營業時間，平日部分店家較晚開；詳見各美食主題頁。',
    tag: '店家',
  },
  {
    date: '2026-06-28',
    title: '旗后燈塔開放時間提醒',
    detail: '旗后燈塔週一通常休館，開放時間依館方公告；上山需爬坡與階梯，請預留體力。',
    tag: '景點',
  },
];

export const UPDATE_INTERVALS: { type: string; freq: string }[] = [
  { type: '渡輪票價與規則', freq: '每月核對' },
  { type: '渡輪特別公告', freq: '每週核對' },
  { type: '景點開放時間', freq: '每月核對' },
  { type: '餐廳營業狀態', freq: '每 2–3 個月' },
  { type: '停車費', freq: '每季核對' },
  { type: '施工狀態', freq: '每週或有公告時' },
];
