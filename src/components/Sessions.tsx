import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationLabel, durationSpoken, group, priceParts, splitDescription } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';

interface SessionsProps {
  values: SiteValues;
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

const LETTERS = 'ABCDEFGH';

/**
 * Sessions and prices, straight from the engine: every name, length and price
 * is the one the booking uses. Sessions sit in groups (Portraits, Headshots,
 * Brand & makers, Still life & product) found from their names, set like the
 * index of a printed portfolio: the group on the left with its note, the
 * sessions on the right as ruled rows — what it is, what it includes, the time
 * in the studio, the price, and a Book button that opens the booking with that
 * session chosen.
 */
export function Sessions({ values, services, business, onRetry, onBook }: SessionsProps) {
  const locale = business?.locale ?? 'en-US';
  const groups = services.status === 'ready' ? group(services.data) : [];

  return (
    <section id="sessions" className="section sessions" aria-labelledby="sessions-title">
      <div className="page">
        <header className="section-head sessions__head">
          <p className="index" aria-hidden="true">
            02
          </p>
          <h2 id="sessions-title">
            <Emphasis text={values['services.title']} />
          </h2>
          {values['services.intro'] && <p className="section-intro">{values['services.intro']}</p>}
        </header>

        {services.status === 'loading' && (
          <div className="sessions__loading" aria-busy="true">
            <p className="sr-only" role="status">
              Loading sessions…
            </p>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="skeleton skeleton--service" aria-hidden="true" />
            ))}
          </div>
        )}

        {services.status === 'error' &&
          (services.error.code === 'NOT_CONFIGURED' ? (
            <p className="quiet-state">Our sessions and prices will be listed here soon.</p>
          ) : (
            <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
              <p>We couldn't load our sessions just now.</p>
            </Notice>
          ))}

        {services.status === 'ready' && services.data.length === 0 && (
          <p className="quiet-state">Our sessions will be listed here soon. Call or email the studio to book in the meantime.</p>
        )}

        {groups.length > 1 && (
          <nav className="sessions__index" aria-label="Kinds of session">
            {groups.map((g, i) => (
              <a key={g.id} href={`#sessions-${g.id}`}>
                <span className="sessions__letter" aria-hidden="true">
                  {LETTERS[i]}
                </span>
                {g.label}
              </a>
            ))}
          </nav>
        )}

        {groups.map((g, i) => {
          const note = g.note ? values[g.note] : '';
          return (
            <section className="session-group" id={`sessions-${g.id}`} key={g.id} aria-labelledby={`sessions-${g.id}-title`}>
              <div className="session-group__aside">
                <p className="session-group__letter" aria-hidden="true">
                  {LETTERS[i]}
                </p>
                <h3 className="session-group__title" id={`sessions-${g.id}-title`}>
                  {g.label}
                </h3>
                {note && <p className="session-group__note">{note}</p>}
              </div>
              <ol className="session-list" role="list">
                {g.services.map((s) => {
                  const { lead, includes } = splitDescription(s.description);
                  const price = priceParts(s, locale);
                  return (
                    <li className="session" key={s.id}>
                      <div className="session__main">
                        {s.image && (
                          <img
                            className="session__thumb"
                            src={s.image.url}
                            alt={s.image.alt}
                            width={s.image.width ?? 160}
                            height={s.image.height ?? 200}
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                        <h4 className="session__name">{s.name}</h4>
                        {lead && <p className="session__lead">{lead}</p>}
                        {includes.length > 0 && (
                          <div className="session__includes">
                            <p className="session__includes-label" id={`inc-${s.id}`}>
                              Includes
                            </p>
                            <ul role="list" aria-labelledby={`inc-${s.id}`}>
                              {includes.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <dl className="session__meta">
                        <div>
                          <dt>In the studio</dt>
                          <dd>
                            <span aria-hidden="true">{durationLabel(s.durationMinutes)}</span>
                            <span className="sr-only">{durationSpoken(s.durationMinutes)}</span>
                          </dd>
                        </div>
                        <div>
                          <dt>Price</dt>
                          <dd className="session__price">
                            {price.from && <span className="session__from">from </span>}
                            {price.amount}
                          </dd>
                        </div>
                      </dl>
                      <a className="button button--small button--quiet session__book" href="#book" onClick={bookLink(onBook, s.id)}>
                        Book<span className="sr-only"> {s.name}</span>
                        <span className="button__arrow" aria-hidden="true">
                          →
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </section>
  );
}
