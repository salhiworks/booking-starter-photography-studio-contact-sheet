# Contact Sheet — the visual system

**Idea:** a photographer's contact sheet on the light table. Before a single print is
made, a photographer lays a sitting out as small frames on one sheet, reads it with a
loupe and circles the select in grease pencil. The site works the same way: warm
fibre-paper pages, the work laid out as numbered frames with their edge print, and **one
grease-pencil colour — the marker** — for the chosen frame, a word worth underlining and
every action. The one dark ground is **umber**, the colour of the studio's painted canvas
backdrops (the studio section, the booking band, the footer). No black "portfolio"
background, no glass, no gradients: the photographs carry the colour.

Kept apart from the rest of the collection: no serif or italics (Atelier, After Hours,
Quiet Nordic, Lacquer), no condensed price list (Cut List), no expanded engineered type or
light lines (Clearcoat), no arches, linen or poured colour fields.

Every raw value lives in `src/styles/tokens.css`. Other stylesheets use the tokens only.

## Colour

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--accent` (owner: *Marker colour*) | `#a3271c` oxblood | Buttons, the marks around chosen frames, underlined headline words, section and frame numbers, the calendar selection, focus rings | white on it 7.3:1 (the editor checks any new colour against `#ffffff` at 4.5:1); on the page 6.4:1 |
| `--accent-glow` | 45 % marker in pale peach | The marker on umber (underlines, numbers, dots) | 6:1 on umber (measured) |
| `--paper` | `#f3efe7` warm fibre paper | The page | — |
| `--raised` | `#fbf9f4` bright paper | Inputs, the booking sheet | — |
| `--oat` | `#e9e3d7` mount board | Good to know, the booking summary, the experience note | muted text 5.16:1 |
| `--ink` / `--ink-soft` / `--muted` | `#1e1915` / `#3a322b` / `#675b4f` | Text | 15.2 / 11 / 5.75:1 on the page |
| `--forest` (umber) | `#2a201a` | The studio, the booking band, the footer, the sheet's header | `--on-forest` 13.7:1, `--on-forest-soft` 9.4:1, `--on-forest-faint` 5.9:1 |
| `--viewer-ground` | `#17120e` | Behind photos in the viewer | — |
| `--clay` | `#9a2c18` | Errors only, always with words | — |

Measured (rendered, Chromium, 1440 and 390 px, page + booking sheet): every text style is
≥ 5.16:1 (`concepts/photography-contact-sheet/contrast.mjs` in the Niche Pack workspace).

## Type

- **Bricolage Grotesque** (variable, OFL; optical size 12–96, weight 200–800) for headlines
  and text. Optical sizing is on, so the 7rem headline uses the tight display cut and body
  text the open text cut. Headlines weight 640, −0.035em tracking, 0.94 leading.
- **DM Mono** (OFL, 400/500) for everything a contact sheet would print on the film's edge:
  eyebrows, nav, frame and section numbers, captions' kinds, durations, the "Includes"
  label, dates in the hours table, tags.
- Heading style (owner): *Grotesk* (default), *Grotesk, light* (weight 380), *Typewriter*
  (headings in DM Mono).
- The name mark: Bricolage 700, tight, with a marker dot ("Umber.").

## Devices (each with a job)

- **The marker frame** (`Marker.tsx`). A hand-drawn rectangle — three slightly different
  hands, so neighbours never look stamped — drawn around the first screen's chosen frame
  and around every frame of the kind a visitor marks in the portfolio. It draws itself
  once from the top-left corner (a clip sweep). Reduced motion: shown at once.
- **The marker underline.** The owner's `*highlight*` in a headline keeps its ink colour
  and gets a hand-drawn grease-pencil stroke beneath, drawn left to right once. On umber it
  uses the lifted marker.
- **Edge print.** Under the chosen frame: `▸ 14   UMBER   14A`; frame numbers under the
  neighbouring frames (12, 13) and before every portfolio caption (01–10); section numbers
  01–06 with a short rule.
- **The contact sheet first screen.** Text on the left; on the right the chosen frame (4:5)
  with two neighbouring frames from the same sitting in a narrow strip. The frame is sized
  by the screen's height *and* width (`--select-h`), so the whole first screen — headline,
  button, frame and facts — fits a 1280×720 laptop. Phones: headline, then the frame and
  strip side by side, then the button; the lede and facts follow.
- **Marking the sheet.** The portfolio filter (All · Portraits · Headshots · Still life ·
  Brand, read from the captions) does not reshuffle the layout: the chosen kind is circled
  and the other frames fall back (32 % opacity, desaturated), still clickable. A polite
  live region announces "3 frames marked: Still life."
- **The viewer.** A full-screen modal `<dialog>` on near-black: the photo uncropped
  (`object-fit: contain`), its caption and kind, a "Sample — licensed stock photo" tag,
  `01 / 10`, previous/next. ← → keys, swipe on touch, Esc or ✕ closes, focus returns to
  the frame (remembered explicitly — Safari never focuses a clicked button).
- **Film sprockets.** A row of small rectangles along the foot of the booking sheet's umber
  header.
- **Develop.** On load the first-screen photos fade in from a lifted, desaturated state, as
  a print comes up in the tray (opacity + filter, ~1 s). Reduced motion: none.

## Layout

- Page width 86rem plus a fluid gutter (`clamp(1.25rem, 4.5vw, 4.5rem)`); one page, no routes.
- **Selected work** is a fixed editorial layout by slot: each of the ten frames has its own
  shape (upright 4:5 or wide 3:2) and place — 12 columns from 1024 px with staggered
  offsets, 6 columns at 720–1023 px, and a 6-column staggered two-up rhythm on phones (wide
  frames full width, upright frames in offset pairs). Removing a photo leaves the others in
  place. The sheet ends with "End of sheet · 10 frames" and the owner's optional link.
- **Sessions** are an index, not cards: a lettered group nav (A Portraits · B Headshots…),
  then each group as a ruled block — the group and its note on the left (sticky from
  1024 px), the sessions as rows on the right: name, description, *Includes* in a line,
  time in the studio and price in mono, and a quiet **Book** that opens the booking on that
  session's time step.
- **The studio** (umber): a wide photo of the room with an upright detail overlapping its
  corner, the text beside it, then a row of plain facts with marker dots.
- **How a session works**: four steps along a rule (a vertical thread on phones); the step
  that is booked online — the session itself — is marked in the marker colour with "The part
  you book online", and a note below separates booking from editing and delivery.
- **Booking band** (umber) → **Visit** (hours, contact, arriving) → **Footer** (umber, the
  name mark set very large).

## Booking sheet

Shared booking styles (`booking.css`) on the tokens: a sheet of paper over the page with an
umber header edged by film sprockets; studio name in mono above the title. Session step:
groups as on the page, each pick with its duration and price in mono and its *Includes*
line. Summary: session, time in the studio, price, includes (hidden in the phone's compact
strip), date, time. Full-screen on phones with the pinned Continue/submit bars clear of the
chosen time and focused fields (`keepFieldClear`).

## Motion

160–420 ms UI transitions; the first screen's text rises in sequence; photos develop; the
marker draws itself (~0.9 s); portfolio photos scale 1.025 on hover. Everything has a
`prefers-reduced-motion` path (no animation, marks and underlines shown at once).

## Accessibility

44 px tap targets everywhere; visible focus (the marker colour, or paper on umber); the
filter is a group of `aria-pressed` buttons with a live summary; every frame button is
named "View larger: <title>"; the viewer is a labelled modal dialog; hidden-from-sight
frame numbers are `aria-hidden`; durations are also spoken in words.
