// Prefix root-relative paths with the configured `base` (e.g. /happyholidays on GitHub Pages).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const withBase = (p: string) => (p.startsWith('/') && !p.startsWith('//') ? base + p : p);
