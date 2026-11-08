import { formatMoney } from '@profitstudio/booking-engine';
import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { OpenStatus } from '../lib/hours';
import type { Resource } from '../lib/resource';
import { durationLabel } from '../lib/services';
import { bookLink } from '../lib/bookLink';
import { Emphasis } from './Emphasis';
import { Marker } from './Marker';
import { Photo } from './Photo';

/** Keep in sync with the hero preload in index.html. */
export const HERO_SIZES = '(min-width: 960px) 34vw, 70vw';
const FRAME_SIZES = '(min-width: 960px) 9vw, 22vw';

interface HeroProps {
  values: SiteValues;
  status: OpenStatus | null;
  services: Resource<Service[]>;
  business: Business | null;
  /** Fields the owner has set — the photo's "Sample" label disappears once they replace it. */
  ownerFields: string[];
  onBook: StartBooking;
}

/** Plain facts from the engine: the lowest price and the range of time in the studio. Nothing is invented. */
function sessionFacts(services: Resource<Service[]>, business: Business | null) {
  if (services.status !== 'ready' || services.data.length === 0) return null;
  const lengths = services.data.map((s) => s.durationMinutes);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  const priced = services.data.filter((s) => s.priceCents !== null);
  const cheapest = priced.length ? priced.reduce((a, b) => ((a.priceCents ?? 0) <= (b.priceCents ?? 0) ? a : b)) : null;
  return {
    lengths: min === max ? durationLabel(min) : `${durationLabel(min)} – ${durationLabel(max)}`,
    from: cheapest
      ? formatMoney(cheapest.priceCents ?? 0, cheapest.currency, business?.locale ?? 'en-US').replace(/([.,])00(?!\d)/, '')
      : null,
  };
}

/**
 * The first screen as a page of a contact sheet: the headline and one Book
 * button on warm paper; beside them the chosen frame, circled in grease pencil,
 * with two neighbouring frames from the same sitting and their frame numbers.
 * Engine facts (sessions from, time in the studio, today's hours) run along
 * the foot like the data printed on a film's edge.
 */
export function Hero({ values, ownerFields, status, services, business, onBook }: HeroProps) {
  const sample = !ownerFields.includes('hero.photo');
  const photo = values['hero.photo'];
  const frames = [values['hero.frame2'], values['hero.frame3']].filter((f) => f !== null);
  const facts = sessionFacts(services, business);
  const caption = values['hero.caption'].trim();
  return (
    <section className={`hero ${photo ? '' : 'hero--text-only'}`} id="top" aria-labelledby="hero-title">
      <div className="page hero__inner">
        <div className="hero__text">
          {values['hero.eyebrow'] && <p className="eyebrow hero__eyebrow hero__enter">{values['hero.eyebrow']}</p>}
          <h1 id="hero-title" className="hero__title hero__enter">
            <Emphasis text={values['hero.title']} />
          </h1>
          {values['hero.lede'] && <p className="hero__lede hero__enter">{values['hero.lede']}</p>}
          <div className="hero__actions hero__enter">
            <a className="button button--large" href="#book" onClick={bookLink(onBook)}>
              {values['hero.cta']}
              <span className="button__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="hero__link" href="#work">
              See the work
            </a>
          </div>
          {(facts || status) && (
            <dl className="hero__facts hero__enter">
              {facts?.from && (
                <div>
                  <dt>Sessions from</dt>
                  <dd>{facts.from}</dd>
                </div>
              )}
              {facts && (
                <div>
                  <dt>In the studio</dt>
                  <dd>{facts.lengths}</dd>
                </div>
              )}
              {status && (
                <div className="hero__fact-status">
                  <dt>Today</dt>
                  <dd className="open-status" data-open={status.open}>
                    <span className="open-status__dot" aria-hidden="true" />
                    {status.text}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </div>

        {photo && (
          <figure className={`hero__sheet ${frames.length ? '' : 'hero__sheet--single'}`}>
            <div className="hero__select">
              <div className="hero__select-frame">
                <Photo image={photo} sizes={HERO_SIZES} priority className="hero__photo" />
                <Marker className="marker--hero" />
                {sample && <span className="tag tag--on-photo">Sample</span>}
              </div>
              <p className="edge" aria-hidden="true">
                <span>▸ 14</span>
                <span className="edge__name">{values['brand.wordmark']}</span>
                <span>14A</span>
              </p>
            </div>
            {frames.length > 0 && (
              <div className="hero__strip">
                {frames.map((frame, i) => (
                  <div className="hero__frame" key={`${i}-${frame.src}`}>
                    <Photo image={frame} sizes={FRAME_SIZES} className="hero__frame-photo" />
                    <span className="hero__frame-n" aria-hidden="true">
                      {12 + i}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {caption && <figcaption className="hero__caption">{caption}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
}
