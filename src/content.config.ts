import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// YAML 會把未加引號的 2026-07-24 解析成 Date，統一轉回 YYYY-MM-DD 字串
const dateString = z
  .union([z.string(), z.date()])
  .transform((v) => (typeof v === 'string' ? v : v.toISOString().slice(0, 10)));

const sourceSchema = z.array(
  z.object({ name: z.string(), url: z.string().url().optional() })
).optional();

/** 景點：對應 doc 的 Attraction 資料模型與景點頁固定結構 */
const attractions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/attractions' }),
  schema: z.object({
    name: z.string(),
    englishName: z.string().optional(),
    slug: z.string().optional(),
    summary: z.string(),
    quickAnswer: z.string().optional(),
    image: z.string(),
    imageAlt: z.string(),
    address: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    openingHours: z.string().optional(),
    admission: z.string().optional(),
    suggestedDuration: z.string().optional(),
    distanceFromFerry: z.string().optional(),
    walkTime: z.string().optional(),
    slope: z.string().optional(),
    accessibility: z.string().optional(),
    strollerFriendly: z.boolean().optional(),
    bestTime: z.string().optional(),
    nearby: z.string().optional(),
    order: z.number().default(99),
    lastChecked: dateString,
    sources: sourceSchema,
    draft: z.boolean().default(false),
  }),
});

/** 美食主題頁 */
const food = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/food' }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    priceRange: z.string().optional(),
    order: z.number().default(99),
    lastChecked: dateString,
    sources: sourceSchema,
    draft: z.boolean().default(false),
  }),
});

/** 渡輪與交通資訊頁 */
const ferry = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ferry' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    quickAnswer: z.string().optional(),
    order: z.number().default(99),
    lastChecked: dateString,
    sources: sourceSchema,
    draft: z.boolean().default(false),
  }),
});

/** 行程 */
const itinerary = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/itinerary' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    duration: z.string(),
    totalWalk: z.string().optional(),
    budget: z.string().optional(),
    suitableFor: z.string().optional(),
    bikeSuggested: z.boolean().optional(),
    steps: z.array(z.object({ time: z.string(), place: z.string(), note: z.string().optional() })).optional(),
    order: z.number().default(99),
    lastChecked: dateString,
    sources: sourceSchema,
    draft: z.boolean().default(false),
  }),
});

/** 交通與停車、實用指南（通用內容頁） */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    quickAnswer: z.string().optional(),
    section: z.enum(['transport', 'map', 'guide']).default('guide'),
    order: z.number().default(99),
    lastChecked: dateString,
    sources: sourceSchema,
    draft: z.boolean().default(false),
  }),
});

export const collections = { attractions, food, ferry, itinerary, guides };
