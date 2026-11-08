import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 */
export const demoConfig: DemoConfig = {
  id: 'photography-studio-contact-sheet',
  preset: sitePreset,
  business: {
    name: 'Umber Studio',
    timezone: 'America/New_York',
    email: 'studio@umber.example',
    phone: '+1 215-555-0164',
    address: '1418 Frankford Avenue, Studio 3, Philadelphia, PA 19125',
  },
  ownerEmail: 'owner@umber.example',
  referencePrefix: 'UM',
  sampleNotes: [
    'Headshot for a new role — one on a dark backdrop and one lighter, if there’s time.',
    'We run a small ceramics studio. Bringing eight mugs and two vases for the online shop.',
    'A portrait for my mother’s seventieth. She would love the window light.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Nadia Haddad', email: 'nadia.haddad@example.com', phone: '+1 215 555 0113' },
    { name: 'Thomas Reyes', email: 'thomas.reyes@example.com', phone: '+1 215 555 0126' },
    { name: 'Ama Owusu', email: 'ama.owusu@example.com', phone: '+1 215 555 0131' },
    { name: 'Lena Brandt', email: 'lena.b@example.com', phone: '+1 215 555 0148' },
    { name: 'Marco Bellini', email: 'marco.bellini@example.com', phone: '+1 215 555 0152' },
    { name: 'June Park', email: 'june.park@example.com', phone: '+1 215 555 0167' },
    { name: 'Samuel Ortiz', email: 'sam.ortiz@example.com', phone: '+1 215 555 0174' },
    { name: 'Iris Kowalski', email: 'iris.k@example.com', phone: '+1 215 555 0189' },
    { name: 'Felix Adeyemi', email: 'felix.a@example.com', phone: '+1 215 555 0193' },
    { name: 'Clara Whitman', email: 'clara.w@example.com', phone: '+1 215 555 0108' },
  ],
};
