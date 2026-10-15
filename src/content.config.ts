import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const destinations = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/destinations' }),
  schema: ({ image }) =>
    z.object({ name: z.string(), role: z.string(), photo: image(), order: z.number().default(0) }),
});

const pillars = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/pillars' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      line1: z.string(),
      line2: z.string(),
      question: z.string(),
      description: z.string(),
      color: z.string(),
      textColor: z.string().default('#1A1813'),
      photo: image(),
      photoAlt: z.string(),
      href: z.string(),
      cta: z.string(),
    }),
});

const hotels = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/hotels' }),
  schema: ({ image }) =>
    z.object({ name: z.string(), dzongkhag: z.string(), category: z.string(), description: z.string(), stars: z.number().min(1).max(5).optional(), photo: image(), order: z.number().default(0) }),
});

const nav = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/nav' }),
  schema: z.object({ items: z.array(z.object({ label: z.string(), href: z.string(), children: z.array(z.object({ label: z.string(), href: z.string() })).optional() })) }),
});

export const collections = { destinations, hotels, pillars, nav };
