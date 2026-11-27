import { formatMoney } from '@profitstudio/booking-engine';
import type { Service } from '@profitstudio/booking-engine';

/**
 * The session list's groups, and what each session includes.
 *
 * The engine (2.0.1) has no service categories and no per-service
 * metadata, and a service's id is a database UUID this site cannot know when
 * it is built — so everything here is read from the service's own engine data:
 *
 *   1. the group, from its NAME against the rules below — the first rule that
 *      matches wins, strongest signal first ("Headshot & Portrait" is a
 *      headshot session; "Personal Brand Session" is brand work even though
 *      its description mentions portraits);
 *   2. if the name has no session words (an owner renamed "Studio Portrait" to
 *      "The Hour"), its DESCRIPTION, against the same rules;
 *   3. otherwise "More sessions" — a genuinely new kind of session (pets,
 *      film workshops) gets its own group instead of a wrong one.
 *
 * What a session includes is the part of its description after "Includes:",
 * split at "·" (or ";") — written by the owner in Dashboard → Services, so it
 * changes with the session and never drifts from it.
 *
 * A truly stable category needs an engine field — see
 * docs/ENGINE-PROPOSAL-photography.md in the Niche Pack workspace.
 */
export type GroupId = 'portrait' | 'headshot' | 'brand' | 'still' | 'more';

/** Content fields that belong to a group (src/content/site.ts). */
export type GroupNote = 'services.notePortrait' | 'services.noteHeadshot' | 'services.noteBrand' | 'services.noteStill';

interface GroupRule {
  id: GroupId;
  label: string;
  note: GroupNote | null;
  match: RegExp;
}

const RULES: GroupRule[] = [
  {
    id: 'headshot',
    label: 'Headshots',
    note: 'services.noteHeadshot',
    match: /\b(head ?shots?|linked ?in|profile (?:photo|picture)s?|corporate|actors?)\b/i,
  },
  {
    id: 'still',
    label: 'Still life & product',
    note: 'services.noteStill',
    match: /\b(still[ -]life|products?|objects?|pack ?shots?|flat ?lays?|e-?commerce|catalog(?:ue)?s?|listings?)\b/i,
  },
  {
    id: 'brand',
    label: 'Brand & makers',
    note: 'services.noteBrand',
    match: /\b(brand(?:ing)?|makers?|founders?|business(?:es)?|workshops?|craft|artisans?|behind the scenes)\b/i,
  },
  {
    id: 'portrait',
    label: 'Portraits',
    note: 'services.notePortrait',
    // Weaker words (a backdrop, outfits, one person) only decide when no group above matched.
    match: /\b(portraits?|sittings?|sitters?|famil(?:y|ies)|couples?|maternity|graduat(?:e|ion)|birthday|milestone|generations?|backdrops?|outfits?|one person|two people)\b/i,
  },
];

const MORE = { id: 'more', label: 'More sessions', note: null } as const;

/** The order groups are shown in. */
const ORDER: GroupId[] = ['portrait', 'headshot', 'brand', 'still', 'more'];

export interface Group {
  id: GroupId;
  label: string;
  note: GroupNote | null;
  services: Service[];
}

export function groupOf(service: Pick<Service, 'name' | 'description'>): GroupRule | typeof MORE {
  const byName = RULES.find((rule) => rule.match.test(service.name));
  if (byName) return byName;
  const { lead } = splitDescription(service.description);
  return RULES.find((rule) => rule.match.test(lead)) ?? RULES.find((rule) => rule.match.test(service.description ?? '')) ?? MORE;
}

/** Sessions in their groups, keeping the owner's display order inside each; empty groups are left out. */
export function group(services: readonly Service[]): Group[] {
  const groups = new Map<GroupId, Group>();
  for (const service of services) {
    const rule = groupOf(service);
    let g = groups.get(rule.id);
    if (!g) {
      g = { id: rule.id, label: rule.label, note: rule.note, services: [] };
      groups.set(rule.id, g);
    }
    g.services.push(service);
  }
  return ORDER.flatMap((id) => (groups.has(id) ? [groups.get(id)!] : []));
}

/**
 * "An unhurried hour… Includes: 1 hour · two outfits · 12 photographs" →
 * { lead: "An unhurried hour…", includes: ["1 hour", "two outfits", "12 photographs"] }.
 * Without "Includes:" the whole description is the lead and the list is empty.
 */
export function splitDescription(description: string | null | undefined): { lead: string; includes: string[] } {
  const text = (description ?? '').trim();
  const match = /(?:^|[\s.])(?:includes?|included|what'?s included)\s*:\s*/i.exec(text);
  if (!match) return { lead: text, includes: [] };
  const lead = text.slice(0, match.index + (match[0].startsWith('.') ? 1 : 0)).trim();
  const includes = text
    .slice(match.index + match[0].length)
    .split(/\s*[·•;]\s*|\s+\|\s+/)
    .map((item) => item.trim().replace(/\.$/, ''))
    .filter(Boolean);
  return { lead, includes };
}

/** "45 min", "1 h 30 min", "4 h" — durations straight from the engine. */
export function durationLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** The same, for screen readers. */
export function durationSpoken(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${minutes} minutes`;
  const hours = `${h} hour${h > 1 ? 's' : ''}`;
  return m ? `${hours} ${m} minutes` : hours;
}

export function priceLabel(service: Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>, locale: string): string {
  if (service.priceCents === null) return 'Price on request';
  const amount = formatMoney(service.priceCents, service.currency, locale);
  return service.priceFrom ? `from ${amount}` : amount;
}

/**
 * The price as the list shows it: the amount, and whether it is a starting
 * price ("from" — the engine's `priceFrom`, for sessions that depend on the
 * number of people or objects). Whole dollars print without ".00".
 */
export function priceParts(service: Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>, locale: string): { from: boolean; amount: string } {
  if (service.priceCents === null) return { from: false, amount: 'Price on request' };
  return { from: service.priceFrom, amount: formatMoney(service.priceCents, service.currency, locale).replace(/([.,])00(?!\d)/, '') };
}

/** Whole-dollar prices print without ".00" — "$175", not "$175.00". */
export function shortPrice(service: Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>, locale: string): string {
  return priceLabel(service, locale).replace(/([.,])00(?!\d)/, '');
}
