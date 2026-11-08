import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import type { SiteValues } from '../lib/content';
import { useModalDialog } from '../lib/dialog';
import { frames, kindsOf, sameKind } from '../lib/work';
import type { Frame } from '../lib/work';
import { Emphasis } from './Emphasis';
import { Marker } from './Marker';
import { Photo } from './Photo';

interface WorkProps {
  values: SiteValues;
  /** Fields the owner has set — a photo's "Sample" label disappears once they replace it. */
  ownerFields: string[];
}

/**
 * Selected work — the portfolio as a contact sheet that has been edited:
 * frames of mixed shapes in a fixed editorial layout (a staggered two-column
 * rhythm on phones), each numbered like a frame on a roll. Choosing a kind of
 * work circles its frames in grease pencil and lets the others fall back,
 * without reshuffling the layout. Any frame opens larger in a viewer
 * (keyboard: ← →, Esc; swipe on touch).
 */
export function Work({ values, ownerFields }: WorkProps) {
  const items = useMemo(() => frames(values, ownerFields), [values, ownerFields]);
  const kinds = useMemo(() => kindsOf(items), [items]);
  const [kind, setKind] = useState<string | null>(null);
  const [viewing, setViewing] = useState<number | null>(null);
  // The frame that opened the viewer gets focus back when it closes (Safari never focuses a clicked button).
  const opener = useRef<HTMLButtonElement | null>(null);
  const view = useCallback((index: number | null) => {
    setViewing(index);
    if (index === null) requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }));
  }, []);
  const activeKind = kind !== null && kinds.some((k) => sameKind(k, kind)) ? kind : null;
  const marked = activeKind ? items.filter((item) => sameKind(item.kind, activeKind)).length : 0;
  const sample = items.some((item) => item.sample);
  const linkLabel = values['work.linkLabel'].trim();
  const linkUrl = values['work.linkUrl'].trim();
  if (items.length === 0) return null;

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="page">
        <header className="section-head work__head">
          <p className="index" aria-hidden="true">
            01
          </p>
          <h2 id="work-title">
            <Emphasis text={values['work.title']} />
          </h2>
          {values['work.intro'] && <p className="section-intro">{values['work.intro']}</p>}
          {sample && (
            <p className="sample-note">
              <span className="tag">Sample photos</span>
              Licensed stock photographs stand in until the studio adds its own work.
            </p>
          )}
        </header>

        {kinds.length > 1 && (
          <div className="work__filter" role="group" aria-label="Mark a kind of work">
            <button type="button" className="chip" aria-pressed={activeKind === null} onClick={() => setKind(null)}>
              All <span className="chip__n">{items.length}</span>
            </button>
            {kinds.map((k) => (
              <button
                key={k}
                type="button"
                className="chip"
                aria-pressed={sameKind(k, activeKind)}
                onClick={() => setKind((current) => (sameKind(k, current) ? null : k))}
              >
                {k} <span className="chip__n">{items.filter((item) => sameKind(item.kind, k)).length}</span>
              </button>
            ))}
          </div>
        )}
        <p className="sr-only" role="status" aria-live="polite">
          {activeKind ? `${marked} ${marked === 1 ? 'frame' : 'frames'} marked: ${activeKind}.` : ''}
        </p>

        <ol className="folio" role="list" data-marking={activeKind ? '' : undefined}>
          {items.map((item, i) => {
            const isMarked = sameKind(item.kind, activeKind);
            return (
              <li
                key={`${item.n}-${item.photo.src}`}
                className={`folio__item folio__item--${item.n} folio__item--${item.shape}`}
                data-marked={isMarked ? '' : undefined}
              >
                <figure>
                  <div className="folio__frame">
                  <button
                    type="button"
                    className="folio__open"
                    onClick={(event) => {
                      opener.current = event.currentTarget;
                      view(i);
                    }}
                    aria-label={`View larger: ${item.title || item.photo.alt || `frame ${i + 1}`}`}
                  >
                    <Photo
                      image={item.photo}
                      sizes={item.shape === 'landscape' ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 30vw, (min-width: 720px) 34vw, 52vw'}
                      className={`folio__photo folio__photo--${item.shape}`}
                    />
                    {item.sample && <span className="tag tag--on-photo">Sample</span>}
                    <span className="folio__zoom" aria-hidden="true">
                      <svg viewBox="0 0 16 16" width="14" height="14" focusable="false">
                        <path d="M9.5 2.5h4v4M13.5 2.5 9 7M6.5 13.5h-4v-4M2.5 13.5 7 9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  {isMarked && <Marker className="marker--frame" variant={(i % 3) as 0 | 1 | 2} />}
                  </div>
                  <figcaption className="folio__caption">
                    <span className="folio__n" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.title && <span className="folio__title">{item.title}</span>}
                    {item.kind && <span className="folio__kind">{item.kind}</span>}
                  </figcaption>
                </figure>
              </li>
            );
          })}
          <li className="folio__end" aria-hidden={linkLabel && linkUrl ? undefined : true}>
            <p className="folio__end-note">
              End of sheet · {items.length} {items.length === 1 ? 'frame' : 'frames'}
            </p>
            {linkLabel && linkUrl && (
              <a className="link-button" href={linkUrl} target="_blank" rel="noopener noreferrer">
                {linkLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </li>
        </ol>
      </div>
      <Viewer items={items} index={viewing} onIndex={view} />
    </section>
  );
}

interface ViewerProps {
  items: Frame[];
  index: number | null;
  onIndex: (index: number | null) => void;
}

/** The larger view: a modal <dialog> with the photo, its caption and previous / next. */
function Viewer({ items, index, onIndex }: ViewerProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null && index < items.length;
  const close = useCallback(() => onIndex(null), [onIndex]);
  useModalDialog(ref, open, close);
  const count = items.length;
  const step = useCallback((by: number) => onIndex(index === null ? null : (index + by + count) % count), [index, count, onIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1);
      else if (event.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, step]);

  // Swipe sideways on touch screens.
  const start = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (event: ReactPointerEvent) => {
    if (event.pointerType !== 'mouse') start.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: ReactPointerEvent) => {
    const from = start.current;
    start.current = null;
    if (!from) return;
    const dx = event.clientX - from.x;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(event.clientY - from.y) * 1.4) step(dx < 0 ? 1 : -1);
  };

  const item = open ? items[index] : null;
  return (
    <dialog
      ref={ref}
      className="viewer"
      aria-label="Photo viewer"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      {item && (
        <div className="viewer__panel" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          <div className="viewer__bar">
            <p className="viewer__count">
              <span className="sr-only">Frame </span>
              {String(index! + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </p>
            <button type="button" className="icon-button viewer__close" onClick={close} autoFocus>
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
                <path d="M3 3l10 10M13 3 3 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="sr-only">Close the viewer</span>
            </button>
          </div>
          <figure className="viewer__figure" key={item.photo.src}>
            <Photo image={item.photo} sizes="(min-width: 1200px) 70vw, 100vw" className={`viewer__photo viewer__photo--${item.shape}`} />
            <figcaption className="viewer__caption">
              {item.title && <span className="viewer__title">{item.title}</span>}
              {item.kind && <span className="viewer__kind">{item.kind}</span>}
              {item.sample && <span className="tag">Sample — licensed stock photo</span>}
            </figcaption>
          </figure>
          {count > 1 && (
            <div className="viewer__nav">
              <button type="button" className="icon-button" onClick={() => step(-1)}>
                <span aria-hidden="true">←</span>
                <span className="sr-only">Previous photo</span>
              </button>
              <button type="button" className="icon-button" onClick={() => step(1)}>
                <span aria-hidden="true">→</span>
                <span className="sr-only">Next photo</span>
              </button>
            </div>
          )}
        </div>
      )}
    </dialog>
  );
}
