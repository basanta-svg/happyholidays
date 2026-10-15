# Happy Holidays: Astro 5 travel agency site

Static, editorial event site built with Astro 5, Tailwind CSS v4 and TypeScript. It uses only a small vanilla script (`src/scripts/main.ts`) and no React.

## Setup

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs ./dist
npm run preview
```

## Editing content

| What | Where |
| --- | --- |
| Brand name, contact details, copy, links, FAQ, socials, hero questions, video ID | `src/site.config.ts` |
| Destinations (marquee) | `src/content/destinations/*.json` |
| Three tour types (title, question, colour, photo) | `src/content/pillars/*.json` |
| Navigation | `src/content/nav/main.json` |
| Design tokens (colours, fonts, radius) | `src/styles/global.css` (`@theme`) |

Set `url` in `site.config.ts` to your real domain before deploying. The sitemap, canonical URL and OG tags use it.

## Images

Placeholders are copied from your `image/` folder.

- **Optimised images** (hero, sections, speakers, pillars) live in `src/assets/images/`. Astro converts them to AVIF/WebP at build time. To replace one, overwrite the file or change the path in the component or JSON. Speaker and pillar JSON files reference `../../assets/images/<file>`.
- **`public/images/og.jpg`** is the social share image. Replace it with a 1200×630 image.
- Hero, statement and welcome images are imported at the top of `Hero.astro`, `Statement.astro` and `Welcome.astro`.

## Components

`Section`, `PillButton`, `ArrowLink`, `CloudMask`, `Marquee`, `Countdown`, `RotatingHeadline` and `WeatherChip` are in `src/components/`. The page sections (`Hero`, `Statement`, `Welcome`, `Pillars` and so on) are composed in `src/pages/index.astro`.

## Notes

- Fonts: Archivo, Space Grotesk and Instrument Serif (the decorative wordmark font) load from Google Fonts. To change the wordmark font, edit `--font-script` and the font link in `BaseLayout.astro`.
- Weather comes from Open-Meteo, with no API key. The coordinates are in `site.config.ts`.
- Smooth scrolling uses native `scroll-behavior`. Add Lenis if you want inertia scrolling.
- All motion respects `prefers-reduced-motion`.
- The "Ask" drawer is a static FAQ with a placeholder input. Connect it to your chat or FAQ backend.

## Deploy

**Netlify:** New site from Git. Build command `npm run build`, publish directory `dist`.

**Vercel:** Import the repository. The Astro preset is detected automatically (build `npm run build`, output `dist`).

Both can also deploy `dist/` as a static folder, for example with `npx netlify deploy --prod --dir=dist`.
