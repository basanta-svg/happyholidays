// Photos of our tours with guests. Files live in src/assets/images/guests/
import onSteps from '../assets/images/guests/guests-on-dzong-steps.webp';
import inCourtyard from '../assets/images/guests/guests-in-dzong-courtyard.webp';
import scarves from '../assets/images/guests/guests-welcome-scarves.webp';
import banner from '../assets/images/guests/guests-welcome-banner.webp';
import lunch1 from '../assets/images/guests/guests-lunch-table-1.webp';
import lunch2 from '../assets/images/guests/guests-lunch-table-2.webp';
import courtyardGroup from '../assets/images/guests/guests-dzong-courtyard-group.webp';
import puddle from '../assets/images/guests/monks-puddle-reflection.webp';
import youngMonks from '../assets/images/guests/young-monks-at-dzong.webp';
import outdoorLunch from '../assets/images/guests/guests-outdoor-lunch.webp';
import cloudy from '../assets/images/guests/dzong-courtyard-cloudy-sky.webp';
import groupPhoto from '../assets/images/guests/guests-group-photo.webp';
import dress1 from '../assets/images/guests/guests-traditional-dress-1.webp';
import dress2 from '../assets/images/guests/guests-traditional-dress-2.webp';
import bridge from '../assets/images/guests/guests-prayer-flag-bridge.webp';

export const guests = {
  onSteps: { img: onSteps, alt: 'Guests and their guide on the steps of a dzong' },
  inCourtyard: { img: inCourtyard, alt: 'A group of guests posing in a dzong courtyard' },
  scarves: { img: scarves, alt: 'Guests welcomed with white scarves, standing together' },
  banner: { img: banner, alt: 'Guests holding a welcome banner with their Bhutanese hosts' },
  lunch1: { img: lunch1, alt: 'Guests enjoying lunch together at a long wooden table' },
  lunch2: { img: lunch2, alt: 'Guests smiling over a shared meal in a restaurant with mountain views' },
  courtyardGroup: { img: courtyardGroup, alt: 'A large group of guests and monks sitting in a dzong courtyard' },
  puddle: { img: puddle, alt: 'Monks in red robes reflected in a puddle' },
  youngMonks: { img: youngMonks, alt: 'Young monks posing in front of a dzong' },
  outdoorLunch: { img: outdoorLunch, alt: 'Guests at an outdoor lunch under a red tent' },
  cloudy: { img: cloudy, alt: 'A dzong courtyard under a cloudy sky' },
  groupPhoto: { img: groupPhoto, alt: 'A group of guests posing together in Thimphu' },
  dress1: { img: dress1, alt: 'Guests in traditional Bhutanese dress seated by a painted window' },
  dress2: { img: dress2, alt: 'Guests in traditional Bhutanese dress smiling beside a carved window' },
  bridge: { img: bridge, alt: 'Guests posing on a suspension bridge hung with prayer flags' },
} as const;
export type GuestKey = keyof typeof guests;
