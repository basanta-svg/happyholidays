# Happy Holidays (Bhutan travel agency) — Astro site

Static Astro 5 + Tailwind 4 site. Dev: `npm run dev` (http://localhost:4321). Build: `npx astro build`.
Repo: https://github.com/basanta-svg/happyholidays.git (branch `main`). The first push worked; later pushes may wait on a Git Credential Manager "Select an account" window.

## Structure
- `src/site.config.ts` — single place for copy, contact details, hero questions/intro, footer links.
- `src/pages/` — `index`, `about`, `bhutan`, `festivities`, `activities`, `flights`, `hotels`, `information` (visa, SDF, key places, 4N5D itinerary), `transportation`, `contact`.
- `src/layouts/` — `BaseLayout` (head, fonts, main.ts), `PageLayout` (header + footer + AskPill for inner pages).
- `src/components/` — homepage sections plus `PageHero`, `PageSection` (tones: ink/plum/dusty/paper/sand), `CtaBand`, `LangSwitch`, `Header` (About has a dropdown), `Pillars`.
- `src/styles/global.css` (theme tokens) and `src/styles/pages.css` (shared inner-page patterns `pg-*`).
- `src/content/` — JSON collections: `hotels` (20, from the deck), `pillars` (homepage panels), `nav` (header links, optional `children`), `destinations`.
- `src/assets/images/deck/` — photos extracted from the client's `2026.pptx` (`imageN.jpeg`); `transport/` — fleet photos; `thangka-*.jpg` — crops.
- `public/video/hero.mp4` — compressed 1080p looping hero video (first 45 s of the client's original).

## Decisions made this session
- Hero background: YouTube iframe replaced by a local `<video>` (no play icon / logo). Fades in on the `playing` event.
- Footer background is black. "Book a trip" in the header replaced by a language dropdown (EN / Thai / Chinese) driving a hidden Google Translate widget via the `googtrans` cookie.
- Welcome section: title on three rows ("Welcome to" / "Happy" / "Holidays"), "About us" button instead of Play film (VideoModal is now unused but kept).
- Brand colours taken from the logo: `--color-plum` is `#0810A0` (logo blue, darkened) and `--color-sage` is `#E3B200` (logo yellow, toned down). Used by the homepage pillar panels (`content/pillars/2.json`, `3.json`) and the `plum` PageSection tone. `#280C07` is not used anywhere. Logo red is about `#CB0005`; `--color-brand` is still `#bb3308`.
- Homepage pillar panels now link to site pages: Festive Journeys → `/festivities`, Outdoor Activities → `/activities`, Handpicked Stays → `/hotels`. Each has `href` and `cta` fields in its JSON.
- Thunder Dragon statement links to `/bhutan` ("Discover Bhutan"). About dropdown: About us, About Bhutan, Transportation.
- Hero rotating questions and intro rewritten to match the site's pages (festivals, trails, hotels, visa/flights).
- Contact form is static: it builds a `mailto:` to happyholidaysed@gmail.com. A real backend or form service is not set up.

## Content notes / open items
- Page copy for the deck-based pages comes from `source/2026.pptx` (gitignored). Festivities, Activities (general), About Bhutan and the transport descriptions were written by Claude from general knowledge and need the owner's review. Festival dates are approximate seasons only.
- Deck says the company has operated "since 2010" (About page); homepage copy now also says "since 2010".
- Deck issues: Pemako Thimphu's description claimed a "TAJ joint venture" (omitted); single-room supplement amount missing; thangka group price ambiguous ("10 Person 20 USD"); Kathmandu flight directions unclear; "Dhensa-Gangtey" description mentions Punakha.
- Social links in `site.config.ts` are still `#` placeholders; `site.url` is `https://example.com`.
- Not in git (too large for GitHub): `source/2026.pptx` (594 MB), `src/assets/video/` (565 MB original). Keep it out of `public/` (anything there is copied into `dist`).
- Dev server caches content collections: after changing `src/content/**` or `content.config.ts`, restart `npm run dev` (delete `node_modules/.astro` and `.astro`).
