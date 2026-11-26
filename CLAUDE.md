# Photography Studio "Contact Sheet" Starter — project rules

A one-page booking website for an independent photography studio, shipped as **Umber
Studio** (a fictional daylight portrait & still-life studio in Fishtown, Philadelphia) for
the owner to make their own. Its identity lives in `src/site.config.ts`; `CUSTOMIZE.md` is
the prompt that personalizes it. Built around **@profitstudio/booking-engine**
**2.0.0** (pinned; lock in `booking-engine.lock.json`). The engine owns booking;
this project owns the public design.

Read before changing anything:
- `BOOKING_ENGINE.md` — the engine's rules (engine-owned; `npx booking-engine sync` replaces it).
- `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` — the full contract. It wins on technical points.
- `DESIGN.md` — the visual system. `PHOTOS.md` — photo sources and licences.

## The Live Demo layer — leave it alone

- `src/demo/` is the public Live Demo's in-browser engine and sample data. Only
  `npm run dev:demo` / `npm run build:demo` use it (`vite --mode demo` defines
  `__BOOKING_DEMO__`); in every other build it is compiled out. Never read, edit
  or "fix" it while customizing the website.
- Keep the `__BOOKING_DEMO__ ? … : …` branches as they are: the demo wording
  (no email is sent) must stay true in the demo, and the real wording in production.
- `src/demo/engine/` is vendored from the Niche Pack workspace — edit it there.
- `src/admin-main.tsx` passes `emailDelivery={__BOOKING_DEMO__ ? 'none' : undefined}`:
  only the demo's dashboard says no email is sent. Never set it on a real site.

## Engine boundaries (from BOOKING_ENGINE.md)

- All booking data goes through the ONE instance in `src/lib/engine.ts`. Never import
  `@supabase/supabase-js` for booking data, call `booking_*` RPCs or write SQL for booking tables.
- Never edit `supabase/migrations/*_booking_engine_*.sql`, `supabase/functions/booking-mailer/`,
  `booking-engine.lock.json` or `node_modules`.
- Only the publishable key may reach the website (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`,
  both or neither). Never a secret/`service_role` key, never an email provider key, in any file or `VITE_` variable.
- Show only the slots `getAvailability()` returns; send `slot.startsAt` back unchanged; show dates and
  times in `business.timezone`. Never compute availability in the browser — the calendar only reshapes
  engine data with the engine's helpers (`monthGrid`, `groupSlotsByPartOfDay`, `isFewLeft`, `nextAvailableDay`…).
- Label slot times with the server's business-local `slot.time` / `confirmation.time` via `formatClockTime`
  (never re-derive them from `startsAt` in the browser: browser and server time-zone data can disagree).
- Book in two steps: `requestBooking()` → code step → `verifyBooking()`. "Send a new code" =
  `resendVerificationCode()`; "Choose another time" = await `cancelBookingRequest()`, then reload availability.
- Handle `ok: false` on every call. Show success only after `verifyBooking()` returned `ok: true`
  (pending → "Request received — we'll confirm your appointment shortly.", confirmed → "Your appointment is booked.").
  Preview answers `PREVIEW_MODE`: say so honestly, never a success screen.
- Read the engine's answer strictly (`src/lib/bookingStatus.ts`): say "booked" only when `status === 'confirmed'`
  and "request received" only when it is `'pending'` — never treat "not pending" as booked. `BOOKING_INACTIVE`
  (the code was accepted earlier, but the request was declined, cancelled or not confirmed in time) is never a
  success: show "This request is no longer active. Please choose a new time or contact the business." with the
  reference, go back to the times, and forget the remembered code so no recovery path verifies it again.
- `business.policies.onlineBookingEnabled === false` (or `BOOKING_DISABLED`) → contact details instead of the flow.
- The engine sends every booking email. Never add an email service to the website.
- Keep the packaged dashboard on `/admin/` (`admin/index.html` → `src/admin-main.tsx`). Never fork or restyle it:
  `src/admin-theme.css` sets only `--pbe-accent` / `--pbe-accent-text` per mode.
- **A new booking feature (choosing a photographer, several rooms or sets booked at once, deposits,
  payments, add-ons, packages with extras, multi-day shoots, proofing galleries, photo delivery, SMS…)
  needs a new engine version — never custom database code in this project.** One shared calendar per
  business — one studio: never offer "choose your photographer", per-room availability or a people
  counter. A session's length is the time the client spends in the studio; a bigger shoot is its own
  session with its own length. Selecting, retouching and delivering photographs happen after the session,
  by email, outside the engine — never say the website or the booking system delivers photos.

## Where things live

| What | Where |
|---|---|
| Engine instance (preview: name, `America/New_York`, placeholder contact) | `src/lib/engine.ts` |
| This site's preset (sample sessions, hours, policies; "clients"/"sessions") — also the dashboard's starter set | `src/lib/preset.ts` (`sitePreset`) |
| Session groups (from the name, then the description), "Includes:" parsing, duration/price labels | `src/lib/services.ts` |
| The portfolio's ten slots (shape per slot), captions "Title · Kind", the kinds for the filter | `src/lib/work.ts` |
| What the owner can edit (texts, the first-screen frames, ten portfolio frames, studio photos, logo, marker colour, heading style) | `src/content/site.ts` (`defineSiteContent`) |
| Content store + brand → CSS variables (`--accent`, `data-headings`) | `src/lib/content.ts` |
| Design tokens — the ONLY file with raw colours, fonts, sizes, spacing | `src/styles/tokens.css` |
| Base / page / booking styles (tokens only) | `src/styles/base.css`, `site.css`, `booking.css` |
| Sections | `src/components/*.tsx` (Header, Hero, Work + its viewer, Sessions, Studio, Experience, GoodToKnow, Visit, Footer; `Marker` draws the grease-pencil frame; `Emphasis` renders the owner's `*highlight*` as the marker underline); the section list for header, phone menu and footer is `src/lib/nav.ts` |
| Booking sheet (a modal `<dialog>` at `#book`; Back/Esc/✕ close it) + the `#book` band | `src/App.tsx` (open/close + history), `src/components/booking/BookingSheet.tsx`, `BookingSection.tsx`, `src/lib/dialog.ts` |
| Booking flow | `src/components/booking/` (BookingFlow = state + engine calls, root `#book-flow`; DayPicker, TimePicker, DetailsForm, CodeStep, Summary, Done) |
| "Open now" + hours changes (from `getOpeningTimes`, fallback to weekly hours) | `src/lib/useOpening.ts`, `src/lib/hours.ts` |
| Photo variant map | `public/photos/`, `src/content/photoVariants.ts` (generated) |
| Content baked into `index.html` at build | `vite.config.ts` (`publishedSiteContent`) |

## Rules for future changes

- **Content fields:** render values as text (never `dangerouslySetInnerHTML`), images from the resolved
  `src`/`alt`. Never rename or reuse a field id on a live site — add a new id. Sessions, prices, durations,
  hours, the address, phone and email are NOT content: they come from the engine. The engine does not allow
  default images inside list fields — that is why the portfolio is ten photo fields (`work.photo1…10`) with
  captions (`work.caption1…10`, "Title · Kind"), and the first screen has three photo fields
  (`hero.photo`, `hero.frame2`, `hero.frame3`).
- `src/content/site.ts` is also imported by `vite.config.ts` (Node): keep it free of local imports.
- **Every Book button** calls `startBooking()` (App): it opens the sheet, or — while online booking is off,
  unconfigured or failing — leads to the `#book` section and its contact details. Keep it that way for any new button.
- **Session groups:** the engine has no categories, and service ids are database UUIDs unknown at build time,
  so `groupOf()` in `src/lib/services.ts` reads the session's NAME, then — if the name has no session
  words — its DESCRIPTION, against `RULES` (first match wins, strongest signal first: headshot → still life →
  brand → portrait); no match → "More sessions". A new group or keyword goes in `RULES` (and a group note
  field in `site.ts`); keep `concepts/photography-contact-sheet/groups.test.mjs` (Niche Pack workspace)
  passing. Never hard-code a session, duration, price or service id on the page.
- **Includes:** what a session includes is the part of its description after "Includes:", split at "·"
  (`splitDescription`). Never add a separate, hard-coded "what's included" list.
- **Portfolio kinds** come from the captions ("Title · Kind", case-insensitive). The filter only marks
  frames; it never reorders or hides them. Keep each slot's shape and place in `site.css`
  (`.folio__item--n`) — the layout is designed for those shapes.
- **Default photos:** add your own variants to `public/photos/` (the original downloads and their script
  are not part of this starter), keep the default `src` in `site.ts` equal to a key in `photoVariants.ts`,
  record the source in `PHOTOS.md`. If the first-screen default changes, update the `<link rel="preload">`
  in `index.html` (its `imagesizes` must match `HERO_SIZES` in `src/components/Hero.tsx`).
- **Sample photos:** the first-screen photo, every portfolio frame and both studio photos carry a "Sample"
  label until the owner replaces that field (`ownerFields`). Never present a stock photo as the studio's own
  work or a client commission, never present a photographed person as the photographer, staff or a client,
  and never invent a named photographer, their biography, awards, publications or client testimonials.
- **Service photos** are the owner's (`service.image`, dashboard → Services; shown as a small upright thumb in
  the session row). Never add stock pictures for single sessions.
- **Copy:** warm, plain, unhurried; "clients" and "sessions"; no guarantees the studio cannot keep, no
  delivery promises beyond what the owner states, no countdowns or scarcity pressure, no
  "award-winning"/"world-class" claims.
- **Style:** plain CSS with the tokens; no UI kit. Keep 44 px tap targets, visible focus, the
  `prefers-reduced-motion` path, and every text/background pair at 4.5:1 (see DESIGN.md). On umber
  sections, marks and underlines use `--accent-glow`, never `--accent`. Inline SVGs that must overflow
  their box (the marker) need `max-width: none` — base.css caps `svg` at 100 %.
- The public site stays one page (sections + in-page booking flow + the photo viewer dialog); no client-side path routes.

## Commands

```bash
npm run dev                              # http://localhost:5178 (preview mode without a backend)
npm run build                            # tsc -b && vite build (multi-page: / and /admin/)
npm run lint                             # oxlint (supabase/functions is ignored)
npm run dev:demo                         # the Live Demo: in-browser engine + dashboard, nothing sent
npm run build:demo                       # the public Live Demo build — never the production site
npx booking-engine doctor                # project check
npx booking-engine doctor --dist dist    # after a build: scans the output for secrets
```

Connecting a backend (Supabase, email) follows INTEGRATION.md §11 — only with the owner's go-ahead.
