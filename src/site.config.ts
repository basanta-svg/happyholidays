// Single place to edit copy and links.
export const site = {
  url: 'https://basanta-svg.github.io/happyholidays',
  name: 'Happy Holidays',
  short: 'Happy Holidays',
  title: 'Happy Holidays | Bhutan Travel Agency',
  tagline: "Let's make your best trip with us.",
  description:
    'Happy Holidays is a Bhutan travel agency crafting cultural, festival and adventure journeys through the Land of the Thunder Dragon since 2010.',
  city: 'Thimphu',
  country: 'Bhutan',
  address: 'Norzin Lam, P.O. Box 552, Thimphu, Bhutan',
  phone: '+975 17129889',
  email: 'happyholidaysed@gmail.com',
  emailOps: 'happyholidaysops@gmail.com',
  phone2: '+975 17421447',
  websites: ['www.bhutanhappy.com', 'www.zenbhutan.com'],
  geo: { lat: 27.4728, lon: 89.639 },
  bookUrl: '/contact',
  toursUrl: '#pillars',
  aboutUrl: '/about',
  bhutanUrl: '/bhutan',
  hotelsUrl: '/hotels',
  whyBhutanUrl: '#why-bhutan',
  contactUrl: '/contact',
  heroVideo: '/video/hero.mp4', // looping mp4 playing behind the hero (public/video/hero.mp4)
  videoId: 'M7lc1UVf-VE', // replace with your film's ID
  videoProvider: 'youtube' as 'youtube' | 'vimeo',
  heroQuestions: [
    'Ready to discover the land where happiness is a way of life?',
    'Ever seen a mask dance up close at a Bhutanese festival?',
    'Where will your next trail in the Himalayas lead?',
    'Which hotel will you wake up in: Paro, Punakha or Bumthang?',
    'Need help with your visa, flights and journey across Bhutan?',
  ],
  heroIntro:
    'Festival, cultural and adventure journeys, handpicked hotels, flights and visas, all planned end to end by our local team in Thimphu.',
  statement: {
    line1: 'Thunder',
    line2: 'Dragon',
    text: 'We focus on lesser-known routes across Bhutan: adventure tours, treks, culture and pilgrimage journeys for Buddhists, and dedicated support for documentary film crews.',
  },
  welcomeTitle: 'Welcome to Happy Holidays',
  introLine: "Let's make your best trip with us.",
  quote: 'Since 2010, turning visitors into friends of Bhutan.',
  hotelsIntro: 'Our hotel partners: handpicked stays across Bhutan, from boutique lodges to five-star resorts.',
  whyTitle: 'Why choose us',
  why: [
    { title: 'Diverse destinations', text: 'Curated options for retreats, cultural immersion and adventure, from Paro to Bumthang and beyond.' },
    { title: 'Expert guides', text: 'Knowledgeable, experienced local guides who share the stories behind every temple, trail and village.' },
    { title: 'Beautiful places', text: 'Itineraries through iconic temples, national parks and scenic resorts, with comfortable stays along the way.' },
  ],
  servicesTitle: 'Tailor-made journeys across Bhutan',
  servicesText:
    'Beyond classic tours, we arrange special-interest trips, private dinners and themed events, all handled end to end by our team in Thimphu.',
  services: ['Culinary tours', 'Spa & wellness', 'Hiking & trekking', 'Golf', 'Bird watching', 'Photography', 'Pilgrimage', 'Film crews'],
  twoUp: {
    left: { title: 'Why Bhutan?', cta: 'Explore', href: '#why-bhutan' },
    right: { title: 'Get in touch', cta: 'Contact us', href: '/contact' },
  },
  footerGroups: [
    { title: 'Explore', links: [{ label: 'About us', href: '/about' }, { label: 'About Bhutan', href: '/bhutan' }, { label: 'Festivities', href: '/festivities' }, { label: 'Activities', href: '/activities' }, { label: 'Flights', href: '/flights' }] },
    { title: 'Plan your trip', links: [{ label: 'Hotels', href: '/hotels' }, { label: 'Visa & information', href: '/information' }, { label: 'Contact us', href: '/contact' }, { label: 'Tour packages', href: '/#pillars' }] },
  ],
  socials: [
    { label: 'Facebook', href: '#', icon: 'facebook' },
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'YouTube', href: '#', icon: 'youtube' },
    { label: 'WhatsApp', href: 'https://wa.me/97517129889', icon: 'whatsapp' },
  ],
  askFaq: [
    { q: 'When is the best time to visit?', a: 'Spring (March–May) and autumn (September–November) offer the clearest skies and the best festivals.' },
    { q: 'Do I need a visa?', a: 'Yes. We arrange your visa and permits as part of your booking.' },
    { q: 'Can I travel independently?', a: 'Independent travel is not permitted. Tours are booked through a licensed operator such as us, and a daily Sustainable Development Fee applies.' },
  ],
};
export type Site = typeof site;
