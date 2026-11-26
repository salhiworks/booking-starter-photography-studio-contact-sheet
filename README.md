# Photography Studio Booking Website — "Contact Sheet" Starter

A finished, premium booking website for an independent photography studio, ready
to make your own with Claude Code and publish on Hostinger. It ships as **Umber
Studio**, a fictional daylight portrait and still-life studio in Fishtown,
Philadelphia:

- a one-page studio website — a first screen laid out like a page of a contact
  sheet (the chosen frame circled in grease pencil, two neighbouring frames from the
  same sitting), an editorial portfolio of ten frames where visitors can *mark* a kind
  of work and open any frame in a viewer, sessions and prices in groups (Portraits,
  Headshots, Brand & makers, Still life & product) with what each session includes,
  the studio, how a session works, *Good to know* questions and visiting details —
  from 320 px phones up, with booking in a sheet over the page;
- online booking — session, day and time, details and notes about the shoot, and an
  emailed 6-digit code; the studio confirms each request;
- the owner dashboard at `/admin/` — sessions to confirm, services and prices, opening
  hours and closures, email health, and the website's own text, portfolio photos,
  marker colour and heading style.

The look — *Contact Sheet*: a photographer's contact sheet on the light table. Warm
fibre-paper pages, umber ink, frame numbers and edge print in a monospaced face, and one
grease-pencil colour — the marker (oxblood by default) — that circles chosen frames,
underlines a word or two and marks every action. The one dark ground is umber, the
colour of the studio's painted canvas backdrops. Bricolage Grotesque for headlines and
text, DM Mono for the edge print.

Booking runs on [`@profitstudio/booking-engine`](https://www.npmjs.com/package/@profitstudio/booking-engine)
**2.0.0** (pinned) with your own Supabase project and Resend for email.

## 1. Try it (no accounts needed)

```bash
npm install
npm run dev:demo   # the full Live Demo: book, then manage it at /admin/
npm run dev        # preview mode: the website with sample times, nothing saved
```

In the Live Demo everything stays in your browser — nothing is sent anywhere.

## 2. Make it yours with Claude Code

Open this folder in a Claude Code session and paste the prompt in
[`CUSTOMIZE.md`](CUSTOMIZE.md), filled in with your studio. Claude edits a short list
of files (name, city, words, colours) — the booking system, the dashboard and the
layout stay as they are, so it is quick and cheap.

Sessions, prices, opening hours and contact details are **not** code: you set them in
the dashboard once the booking backend is connected. **Your own photographs** — the
first-screen frames, the ten portfolio frames and the studio photos — go in the
dashboard → Website; each sample photo stays labelled "Sample" until you replace it.

**One studio, one calendar.** The booking engine keeps one shared calendar, so a
session's length is the time a client spends in your studio, and the website only shows
times when the studio is free. Choosing a photographer, booking several rooms, deposits,
add-ons, multi-day shoots, proofing galleries and photo delivery are not part of the
engine — selecting, retouching and delivering photographs is arranged with clients by
email after the session (the page says so).

## 3. Connect real bookings

You need a free Supabase project and a Resend account for booking emails.

```bash
cp .env.example .env.local    # your Supabase Project URL + Publishable key (Windows Command Prompt: copy .env.example .env.local)
npx supabase@2 login          # once, in your own terminal
npx booking-engine connect --admin you@example.com
```

`connect` links the project, sets up the database and the booking-email function, and
tells you exactly what is left for you to do (your dashboard login and the two email
secrets). Full steps: the Profit Studio guide *Build a Premium Booking Website with
Claude Code*, Step 3, or `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` §11.

Never put a Supabase **Secret** key or your Resend API key in `.env.local`, in a prompt
or in Hostinger — the Resend key lives only in Supabase's Edge Function secrets.

## 4. Publish on Hostinger

Push this project to a private GitHub repository, then in Hostinger create a **Web
App** from it (Websites → Create site → Web App → Import Git Repository):

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` (never `build:demo`) |
| Output directory | `dist` |
| Node.js | 22 or newer |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (public values only) |

`dist/` contains the website and `dist/admin/` the dashboard. Every push to `main`
redeploys.

## What is in this folder

| | |
|---|---|
| `src/site.config.ts` | The business name, time zone and preview contact details |
| `src/content/site.ts` | Everything the owner can edit in the dashboard → Website, with its default text and photos |
| `src/styles/tokens.css` | The design's colours, type and spacing (one file); `DESIGN.md` explains the system |
| `src/components/` | The website (`Hero`, `Work` + its viewer, `Sessions`, `Studio`, `Experience`…) and its booking flow (`src/components/booking/`) |
| `src/lib/preset.ts` | The sample sessions and hours used by preview mode and offered in a new dashboard |
| `src/lib/services.ts` | How sessions find their group (by the words in their names) and what they include (from "Includes:" in the description) |
| `src/lib/work.ts` | The portfolio's ten frames and the kinds of work read from their captions |
| `admin/` + `src/admin-main.tsx` | The packaged dashboard, mounted at `/admin/` |
| `src/demo/` | The Live Demo's in-browser engine and sample data — used only by `dev:demo` / `build:demo`; a normal build contains none of it |
| `supabase/` | The engine's database migrations and email function (managed by `npx booking-engine`; do not edit) |
| `CLAUDE.md`, `BOOKING_ENGINE.md` | Rules Claude Code follows in this project |
| `PHOTOS.md`, `ASSETS.md` | The Pexels photos (Pexels License), credited file by file |

## Commands

```bash
npm run dev          # preview mode (sample data) until .env.local exists — http://localhost:5178
npm run dev:demo     # the Live Demo (in-browser data, dashboard included)
npm run build        # production build → dist/
npm run build:demo   # the public Live Demo build → dist/ (never deploy this as your site)
npx booking-engine doctor             # checks versions, engine files and keys
npx booking-engine doctor --dist dist # after a build: also scans the output for secrets
```

## Licence

The code is MIT-licensed — see [`LICENSE`](LICENSE) (Copyright (c) 2026 Youssef
Es-salhi). Photographs and other third-party assets keep their own terms, listed file by
file in [`ASSETS.md`](ASSETS.md).
