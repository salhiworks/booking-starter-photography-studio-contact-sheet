import type { SiteValues } from '../lib/content';
import { engine } from '../lib/engine';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';

/** The Live Demo and preview mode show a fictional studio: say so beside it. */
const SAMPLE_BUSINESS = __BOOKING_DEMO__ || engine.mode === 'preview';

/**
 * The studio, on the umber ground of a painted backdrop: the room in one wide
 * frame with a detail beside it, the way of working in a few paragraphs, and
 * a short list of plain facts. No named photographer: the studio speaks as "we".
 */
export function Studio({ values, ownerFields }: { values: SiteValues; ownerFields: string[] }) {
  const room = values['studio.photoRoom'];
  const detail = values['studio.photoDetail'];
  const facts = values['studio.facts'];
  const paragraphs = values['studio.text'].split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const sample = (id: string) => !ownerFields.includes(id);
  return (
    <section id="studio" className="section night studio" aria-labelledby="studio-title">
      <div className="page studio__grid">
        <header className="section-head studio__head">
          <p className="index index--night" aria-hidden="true">
            03
          </p>
          <h2 id="studio-title">
            <Emphasis text={values['studio.title']} />
          </h2>
        </header>
        {(room || detail) && (
          <div className={`studio__photos ${room && detail ? '' : 'studio__photos--single'}`}>
            {room && (
              <figure className="studio__room">
                <Photo image={room} sizes="(min-width: 1024px) 46vw, 100vw" className="studio__photo studio__photo--room" />
                {sample('studio.photoRoom') && <span className="tag tag--on-photo">Sample</span>}
              </figure>
            )}
            {detail && (
              <figure className="studio__detail">
                <Photo image={detail} sizes="(min-width: 1024px) 16vw, 40vw" className="studio__photo studio__photo--detail" />
                {sample('studio.photoDetail') && <span className="tag tag--on-photo">Sample</span>}
              </figure>
            )}
          </div>
        )}
        <div className="studio__text">
          {paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? 'studio__lead prewrap' : 'prewrap'}>
              {p}
            </p>
          ))}
          {SAMPLE_BUSINESS && (
            <p className="sample-note sample-note--night">
              <span className="tag">Sample</span>
              {__BOOKING_DEMO__ ? 'This demo shows a fictional studio' : 'Preview shows a fictional studio'}: the room and the photographs are licensed
              stock images, not its own.
            </p>
          )}
        </div>
        {facts.length > 0 && (
          <dl className="studio__facts">
            {facts.map((fact, i) => (
              <div key={`${i}-${fact.title}`}>
                <dt>{fact.title}</dt>
                {fact.text && <dd>{fact.text}</dd>}
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
