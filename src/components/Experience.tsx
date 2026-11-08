import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';

/**
 * How a session works, as a strip of frames read left to right: before, the
 * session itself, choosing, delivery. The step that is booked online — the
 * time in the studio — is marked as such; the note under the strip says that
 * editing and delivery are arranged with the studio afterwards (the booking
 * system does not deliver photographs).
 */
export function Experience({ values }: { values: SiteValues }) {
  const steps = values['experience.steps'];
  if (steps.length === 0) return null;
  // The booked step: the one whose "when" or title speaks of the session itself.
  const booked = steps.findIndex((s) => /\b(session|sitting|shoot|in the studio|the day)\b/i.test(`${s.when} ${s.title}`));
  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <div className="page">
        <header className="section-head experience__head">
          <p className="index" aria-hidden="true">
            04
          </p>
          <h2 id="experience-title">
            <Emphasis text={values['experience.title']} />
          </h2>
        </header>
        <ol className="steps" role="list" data-count={steps.length}>
          {steps.map((step, i) => (
            <li className={`step ${i === booked ? 'step--booked' : ''}`} key={`${i}-${step.title}`}>
              <p className="step__when">
                <span className="step__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {step.when}
              </p>
              <h3 className="step__title">{step.title}</h3>
              {step.text && <p className="step__text">{step.text}</p>}
              {i === booked && <p className="step__badge">The part you book online</p>}
            </li>
          ))}
        </ol>
        {values['experience.note'] && <p className="experience__note">{values['experience.note']}</p>}
      </div>
    </section>
  );
}
