const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

/* Reveal on scroll */
const io = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
  { threshold: 0, rootMargin: '0px 0px -5% 0px' },
);
$$('.reveal').forEach((el) => io.observe(el));
// Fallback: anything at or above the viewport bottom (fast scroll, anchor jumps, reload mid-page) must never stay hidden
const revealPassed = () => $$('.reveal:not(.is-in)').forEach((el) => {
  if (el.getBoundingClientRect().top < innerHeight) { el.classList.add('is-in'); io.unobserve(el); }
});
addEventListener('scroll', revealPassed, { passive: true });
revealPassed();

/* Header: transparent over hero, solid after */
const header = $('#site-header');
const sentinel = $('#hero-sentinel');
if (header && sentinel) {
  new IntersectionObserver(([e]) => header.setAttribute('data-solid', String(!e.isIntersecting)), { threshold: 0 }).observe(sentinel);
}

/* Mobile menu */
const mbtn = $<HTMLButtonElement>('#menu-btn');
const menu = $('#mobile-menu');
const setMenu = (open: boolean) => {
  if (!mbtn || !menu) return;
  mbtn.setAttribute('aria-expanded', String(open));
  mbtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.hidden = !open;
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) $<HTMLElement>('summary, a', menu)?.focus();
};
mbtn?.addEventListener('click', () => setMenu(mbtn.getAttribute('aria-expanded') !== 'true'));
menu?.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('a')) setMenu(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

/* Dialogs: ask drawer + video */
const wireClose = (d: HTMLDialogElement, onClose?: () => void) => {
  d.addEventListener('click', (e) => { if (e.target === d || (e.target as HTMLElement).closest('[data-close]')) d.close(); });
  d.addEventListener('close', () => { document.body.style.overflow = ''; onClose?.(); });
};
const ask = $<HTMLDialogElement>('#ask-dialog');
if (ask) {
  wireClose(ask);
  $('#ask-btn')?.addEventListener('click', () => { ask.showModal(); document.body.style.overflow = 'hidden'; });
}
const vid = $<HTMLDialogElement>('#video-dialog');
if (vid) {
  const frame = $('[data-frame]', vid)!;
  wireClose(vid, () => (frame.innerHTML = ''));
  $('#play-film')?.addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = vid.dataset.src!;
    f.allow = 'autoplay; fullscreen; picture-in-picture';
    f.allowFullscreen = true;
    f.title = 'Welcome film';
    frame.replaceChildren(f);
    vid.showModal();
    document.body.style.overflow = 'hidden';
  });
}

/* Rotating hero headline */
$$('[data-rotating]').forEach((h) => {
  const qs = $$('.q', h);
  if (qs.length < 2 || reduced) return;
  let i = 0;
  setInterval(() => {
    const cur = qs[i];
    i = (i + 1) % qs.length;
    cur.dataset.leaving = 'true';
    cur.dataset.active = 'false';
    cur.setAttribute('aria-hidden', 'true');
    qs[i].dataset.leaving = 'false';
    qs[i].dataset.active = 'true';
    qs[i].setAttribute('aria-hidden', 'false');
  }, Number(h.dataset.interval) || 4000);
});

/* Weather (Open-Meteo) */
const codes: Record<number, string> = {
  0: 'CLEAR SKY', 1: 'MAINLY CLEAR', 2: 'PARTLY CLOUDY', 3: 'OVERCAST', 45: 'FOG', 48: 'FOG',
  51: 'LIGHT DRIZZLE', 53: 'DRIZZLE', 55: 'DRIZZLE', 61: 'LIGHT RAIN', 63: 'RAIN', 65: 'HEAVY RAIN',
  71: 'LIGHT SNOW', 73: 'SNOW', 75: 'HEAVY SNOW', 80: 'SHOWERS', 81: 'SHOWERS', 82: 'HEAVY SHOWERS', 95: 'THUNDERSTORM',
};
const iconFor = (c: number, day: number) => {
  if (c === 0 || c === 1) return day ? 'sun' : 'moon';
  if (c === 2) return 'partly';
  if (c === 3) return 'cloud';
  if (c === 45 || c === 48) return 'fog';
  if (c >= 71 && c <= 77) return 'snow';
  if (c >= 95) return 'storm';
  if (c >= 51) return 'rain';
  return 'cloud';
};
$$('[data-weather]').forEach(async (el) => {
  try {
    const { lat, lon, city } = el.dataset;
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day`);
    const c = (await r.json()).current;
    el.dataset.icon = iconFor(c.weather_code, c.is_day);
    $('[data-weather-text]', el)!.textContent = `${city} NOW · ${Math.round(c.temperature_2m)}°C · ${codes[c.weather_code] ?? 'FAIR'}`;
  } catch { /* keep fallback text */ }
});

/* Marquee: auto-scroll, pause on hover, drag/swipe */
$$('[data-marquee]').forEach((m) => {
  if (reduced) return;
  const track = $('[data-track]', m)!;
  const half = () => track.scrollWidth / 2;
  let x = 0, hover = false, drag = false, startX = 0, startOff = 0, last = performance.now();
  const wrap = (v: number) => { const w = half(); return ((v % w) + w) % w; };
  m.addEventListener('pointerenter', (e) => { if ((e as PointerEvent).pointerType === 'mouse') hover = true; });
  m.addEventListener('pointerleave', () => (hover = false));
  m.addEventListener('pointerdown', (e) => { drag = true; startX = e.clientX; startOff = x; m.setPointerCapture(e.pointerId); });
  m.addEventListener('pointermove', (e) => { if (drag) x = wrap(startOff - (e.clientX - startX)); });
  const end = () => (drag = false);
  m.addEventListener('pointerup', end);
  m.addEventListener('pointercancel', end);
  m.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') x = wrap(x + 280);
    if (e.key === 'ArrowLeft') x = wrap(x - 280);
  });
  const frame = (t: number) => {
    const dt = t - last; last = t;
    if (!hover && !drag) x = wrap(x + dt * 0.04);
    track.style.transform = `translate3d(${-x}px,0,0)`;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
});

/* Scroll effects: parallax, pillar colours, cloud scale/rotate */
const parallax = $$('[data-parallax]');
const clouds = $$('[data-cloud]');
const pillars = $('[data-pillars]');
const panels = pillars ? $$('.panel', pillars) : [];
let ticking = false;
const update = () => {
  ticking = false;
  const vh = innerHeight;
  if (!reduced) {
    parallax.forEach((el) => {
      const r = el.parentElement!.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      el.style.transform = `translate3d(0,${(r.top + r.height / 2 - vh / 2) * -Number(el.dataset.parallax)}px,0) scale(1.1)`;
    });
    clouds.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const p = Math.min(1, Math.max(-1, (r.top + r.height / 2 - vh / 2) / vh)); // -1..1
      el.style.setProperty('--s', String(1 - Math.abs(p) * 0.12));
      el.style.setProperty('--r', `${p * -6}deg`);
    });
  }
  if (pillars) {
    let best: HTMLElement | null = null, bd = Infinity;
    panels.forEach((p) => {
      const r = p.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - vh / 2);
      if (d < bd) { bd = d; best = p; }
    });
    if (best) { pillars.style.background = (best as HTMLElement).dataset.color!; }
  }
};
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);
update();

/* Hero background video (local mp4, muted loop): fade in once it is actually playing */
$$<HTMLVideoElement>('.backdrop video').forEach((v) => {
  if (reduced) { v.removeAttribute('autoplay'); return; }
  const play = () => { v.muted = true; v.play().catch(() => {}); };
  v.addEventListener('playing', () => v.classList.add('on'));
  play();
  // Retry on first interaction / when the tab returns (autoplay policies on phones)
  ['touchstart', 'pointerdown', 'scroll', 'keydown'].forEach((ev) => addEventListener(ev, play, { once: true, passive: true }));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) play(); });
});
