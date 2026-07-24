# 旗津老街 Cijinlaojie.com

以旗津老街為入口的繁體中文垂直旅遊站：老街美食、渡輪交通、景點、行程規劃與實用地圖。

## 技術棧

- **Astro 5** + **Content Collections（Markdown/MDX）** — 靜態生成，利於 SEO
- **Tailwind CSS 4**（`@tailwindcss/vite`）
- **系統字體**（不載入外部字體）
- **Cloudflare Pages** 部署
- 分析：**Cloudflare Web Analytics** 或 **GA4**（見下方設定，預設關閉）
- 無資料庫、無登入、無線上預訂

## 開發

```bash
pnpm install
pnpm dev            # 本地開發 http://localhost:4321
pnpm build          # 產出到 dist/
pnpm preview        # 預覽 dist/
pnpm check          # 型別檢查（TypeScript 需 5.x）
```

## 圖片

景點與街景照片來自 [Wikimedia Commons](https://commons.wikimedia.org/)，皆為公眾領域（PD/CC0）或 CC 授權；
餐點卡使用依品項特徵製作的 AI 生成示意圖。來源、素材類型與授權說明列於 `/credits/` 頁面
（資料檔 `src/data/image-credits.json`）。

- `pnpm images:fetch` — 重新抓取原始照片到 `public/images/`（需 Python 3）
- `pnpm images:optimize` — 產生響應式 WebP 與尺寸資料 `src/data/image-meta.json`（需 sharp）

產物（jpg、webp、meta json）已納入版控，正常建置**不需**重新執行上述指令。

## 設定分析（可選）

編輯 `src/config.ts`：

- `cfBeaconToken`：填入 Cloudflare Web Analytics 的 token 後自動載入 beacon。
- `ga4Id`：填入 GA4 評估 ID（`G-XXXX`）後自動載入 gtag。

兩者留空則不載入任何第三方腳本。

## 部署到 Cloudflare Pages

1. 連結 Git 儲存庫。
2. 建置指令：`pnpm build`
3. 輸出目錄：`dist`
4. 綁定網域 `cijinlaojie.com`，並將 `src/config.ts` 的 `SITE.url` 設為正式網域。

`public/_headers` 已設定圖片與靜態資源的長效快取。
`public/robots.txt` 與 `/sitemap-index.xml`（由 `@astrojs/sitemap` 產生）供搜尋引擎索引。

## SEO / 結構化資料

- 每頁獨立 `<title>`、meta description、canonical、Open Graph / Twitter Card。
- 全站 `Organization` + `WebSite`；分類與詳細頁 `BreadcrumbList`。
- 景點頁 `TouristAttraction`；美食／行程頁 `Article`；渡輪、交通與 FAQ 頁 `FAQPage`。
- `<html lang="zh-Hant-TW">`、`og:locale=zh_TW`。
- 每頁先給直接答案、標明資料最後核對日期與來源（GEO / AI 搜尋友善）。

## 內容維護

- 景點：`src/content/attractions/*.md`
- 美食：`src/content/food/*.md`
- 渡輪：`src/content/ferry/*.md`（票價、班距等結構化資料在 `src/data/ferry.ts`）
- 行程：`src/content/itinerary/*.md`
- 交通指南：`src/content/guides/*.md`
- 地圖點位：`src/data/places.ts`
- 最新更新：`src/data/updates.ts`
- 常見問題：`src/data/faq.ts`

每筆易變動資料都應更新 `lastChecked` 與 `sources`。

> 本站為獨立旅遊資訊網站，並非政府或任何景點之官方網站。
