import type { SiteImage } from '@profitstudio/booking-engine';
import type { SiteValues } from './content';

/** The ten frames: each slot keeps its shape and its place in the layout (site.css, `.folio__item--n`). */
const SLOTS = [
  { n: 1, shape: 'portrait' },
  { n: 2, shape: 'landscape' },
  { n: 3, shape: 'portrait' },
  { n: 4, shape: 'portrait' },
  { n: 5, shape: 'portrait' },
  { n: 6, shape: 'landscape' },
  { n: 7, shape: 'portrait' },
  { n: 8, shape: 'portrait' },
  { n: 9, shape: 'landscape' },
  { n: 10, shape: 'portrait' },
] as const;

type PhotoKey = `work.photo${(typeof SLOTS)[number]['n']}`;
type CaptionKey = `work.caption${(typeof SLOTS)[number]['n']}`;

export interface Frame {
  n: number;
  shape: 'portrait' | 'landscape';
  photo: SiteImage;
  title: string;
  /** The kind of work after "·" in the caption — the filter it belongs to. */
  kind: string;
  sample: boolean;
}

/** The slots in order, skipping removed photos; "Title · Kind" captions split in two. */
export function frames(values: SiteValues, ownerFields: string[]): Frame[] {
  return SLOTS.flatMap(({ n, shape }) => {
    const photo = values[`work.photo${n}` as PhotoKey];
    if (!photo) return [];
    const [title = '', ...rest] = values[`work.caption${n}` as CaptionKey].split(/\s+·\s+/);
    return [{ n, shape, photo, title: title.trim(), kind: rest.join(' · ').trim(), sample: !ownerFields.includes(`work.photo${n}`) }];
  });
}

/** Kinds as the owner wrote them, in order of first appearance; "Portraits" and "portraits" are one filter. */
export function kindsOf(items: Frame[]): string[] {
  const seen = new Map<string, string>();
  for (const item of items) {
    const key = item.kind.toLowerCase();
    if (item.kind && !seen.has(key)) seen.set(key, item.kind);
  }
  return [...seen.values()];
}

export const sameKind = (a: string, b: string | null) => b !== null && a.toLowerCase() === b.toLowerCase();

