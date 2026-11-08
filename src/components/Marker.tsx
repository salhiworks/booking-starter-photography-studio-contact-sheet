/**
 * The grease-pencil mark: a hand-drawn rectangle around a chosen frame, as a
 * photographer marks the select on a contact sheet. Purely decorative; it
 * stretches to its frame (the stroke keeps its width) and draws itself once.
 */
export function Marker({ className, variant = 0 }: { className?: string; variant?: 0 | 1 | 2 }) {
  return (
    <svg className={`marker ${className ?? ''}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={PATHS[variant]} pathLength={1} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// Three slightly different hands, so neighbouring marks never look stamped.
const PATHS = [
  'M4 2.6 C28 1.4 66 3.1 97.2 1.9 C98.5 28 97.1 66 98.3 97.4 C70 98.9 31 97.2 2.4 98.6 C1.2 70 2.9 33 1.5 4.4 L9 1.4',
  'M2.2 3.4 C34 2.1 70 3.6 98.1 2.6 C97.4 34 98.9 70 97.6 98.1 C66 97.1 28 98.8 3.1 97.5 C2.2 66 1.1 30 2.6 1.6 L7.5 3.9',
  'M3.4 1.8 C30 3.3 64 1.6 96.6 2.8 C98.4 31 96.9 69 97.9 96.9 C69 98.2 33 96.6 1.9 97.9 C3.1 69 1.6 35 2.9 2.6 L10 2.2',
] as const;
