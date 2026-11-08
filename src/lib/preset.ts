import type { Preset } from '@profitstudio/booking-engine';

/**
 * Umber Studio's own preset (INTEGRATION.md §5): the sample sessions, hours
 * and policies preview mode shows, and the starter set the dashboard offers an
 * owner who has no services yet (<BookingAdmin presets>). Prices are in US
 * dollars, in cents.
 *
 * One studio, one sitting at a time: the engine keeps ONE shared calendar, so a
 * session's length is the time the client spends in the studio, and the buffer
 * after it is the studio's reset (backdrop, lights, a coffee). Selecting and
 * retouching photographs happens after the session and is not booked or tracked
 * here. Choosing a photographer, several rooms, deposits, add-ons and multi-day
 * shoots need a new engine version — never custom code here.
 *
 * What a session includes is written at the end of its description after
 * "Includes:", separated by "·" — the website shows it as a short list
 * (src/lib/services.ts, `splitDescription`).
 *
 * The website sorts sessions into groups (Portraits, Headshots, Brand & makers,
 * Still life & product) by the words in their names — see src/lib/services.ts.
 */
export const sitePreset = {
  id: 'photography-studio',
  label: 'Photography Studio',
  terminology: { customer: 'client', customers: 'clients', booking: 'session', bookings: 'sessions' },
  previewBusiness: {
    name: 'Sample Photography Studio',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 215-555-0100',
      address: '100 Example Street, Philadelphia, PA',
    },
  },
  policies: {
    slotIntervalMinutes: 30,
    minNoticeMinutes: 1440,
    maxAdvanceDays: 120,
    autoConfirm: false,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  // Tuesday to Saturday, with a late Thursday for after-work sittings; closed Sunday and Monday.
  workingHours: [
    { weekday: 2, start: '10:00', end: '18:00' },
    { weekday: 3, start: '10:00', end: '18:00' },
    { weekday: 4, start: '12:00', end: '20:00' },
    { weekday: 5, start: '10:00', end: '18:00' },
    { weekday: 6, start: '09:00', end: '15:00' },
  ],
  services: [
    {
      name: 'Studio Portrait',
      description:
        'An unhurried hour for one person, in front of a hand-painted backdrop or by the north window. Includes: 1 hour in the studio · up to two outfits · 12 retouched photographs',
      durationMinutes: 60,
      bufferAfterMinutes: 30,
      priceCents: 32500,
    },
    {
      name: 'Extended Portrait Sitting',
      description:
        'Time to settle in, try more than one backdrop and light, and change between looks. Includes: 2 hours in the studio · up to four outfits · 25 retouched photographs',
      durationMinutes: 120,
      bufferAfterMinutes: 30,
      priceCents: 59500,
    },
    {
      name: 'Couple & Family Portrait',
      description:
        'Two to five people, photographed together and in smaller groupings. Includes: 1 hour 30 minutes in the studio · up to five people · 15 retouched photographs',
      durationMinutes: 90,
      bufferAfterMinutes: 30,
      priceCents: 45000,
      priceFrom: true,
    },
    {
      name: 'Professional Headshot',
      description:
        'A clear, current headshot for work, press or a profile page. Includes: 30 minutes in the studio · one backdrop colour · 3 retouched photographs',
      durationMinutes: 30,
      bufferAfterMinutes: 15,
      priceCents: 17500,
    },
    {
      name: 'Headshot & Portrait',
      description:
        'A headshot, then a looser three-quarter portrait with more of you in it. Includes: 1 hour in the studio · two backdrops · 6 retouched photographs',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 29500,
    },
    {
      name: 'Team Headshots',
      description:
        'Up to six people from one team, back to back, on one matching backdrop. Includes: 2 hours in the studio · up to six people · 2 retouched photographs each',
      durationMinutes: 120,
      bufferAfterMinutes: 30,
      priceCents: 79000,
      priceFrom: true,
    },
    {
      name: 'Personal Brand Session',
      description:
        'Portraits, your hands at work and the details of what you make, for a website, a shop or press. Includes: 2 hours 30 minutes in the studio · portraits and detail shots · 30 retouched photographs',
      durationMinutes: 150,
      bufferAfterMinutes: 30,
      priceCents: 78000,
    },
    {
      name: 'Maker’s Half Day',
      description:
        'For makers with a body of work: portraits, process and finished pieces in one sitting. Includes: 4 hours in the studio · up to three sets · 50 retouched photographs',
      durationMinutes: 240,
      bufferAfterMinutes: 30,
      priceCents: 118000,
      priceFrom: true,
    },
    {
      name: 'Still Life — up to 10 Objects',
      description:
        'Your products or pieces, styled on painted grounds and plaster surfaces in daylight. Includes: 3 hours in the studio · up to 10 objects · 10 finished images',
      durationMinutes: 180,
      bufferAfterMinutes: 30,
      priceCents: 65000,
      priceFrom: true,
    },
    {
      name: 'Product Detail Session',
      description:
        'Close, considered detail shots for a launch or a listing. Includes: 1 hour 30 minutes in the studio · up to 4 objects · 8 finished images',
      durationMinutes: 90,
      bufferAfterMinutes: 30,
      priceCents: 38000,
    },
  ],
} satisfies Preset;
