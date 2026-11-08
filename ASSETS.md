# Assets and their terms

The code in this repository is MIT-licensed (`LICENSE`). The assets below are not: each
keeps its own terms.

## Photographs — Pexels License

Fifteen Pexels photographs, downloaded into the project (never hot-linked), then cropped,
graded once for the whole set and exported for their frames. Only the processed frames are
in this repository. They are sample imagery: nobody shown sat for, works at or endorses the
(fictional) studio, and none of it is the studio's work. Full details and crops: `PHOTOS.md`.

| Files (`public/photos/`) | Source | Photographer | Licence (checked 2026-11-08) |
|---|---|---|---|
| `sitting-select-{800,1200,1600}.{avif,webp}` | [Pexels 29368496](https://www.pexels.com/photo/elegant-woman-in-red-dress-sitting-on-chair-29368496/) | Darkshade Photos | Pexels License |
| `sitting-a-{240,400,640}.{avif,webp}` | [Pexels 29368477](https://www.pexels.com/photo/elegant-portrait-of-woman-in-red-cape-29368477/) | Darkshade Photos | Pexels License |
| `sitting-b-{240,400,640}.{avif,webp}` | [Pexels 29368466](https://www.pexels.com/photo/elegant-portrait-of-woman-in-red-gown-29368466/) | Darkshade Photos | Pexels License |
| `work-ochre-{480,800,1200}.{avif,webp}` | [Pexels 37462717](https://www.pexels.com/photo/contemplative-portrait-of-young-man-in-olive-shirt-37462717/) | David Fowora | Pexels License |
| `work-profile-{800,1200,1600}.{avif,webp}` | [Pexels 10209454](https://www.pexels.com/photo/a-side-view-of-a-woman-with-wearing-a-sweater-10209454/) | cottonbro studio | Pexels License |
| `work-navy-{480,800,1200}.{avif,webp}` | [Pexels 8727507](https://www.pexels.com/photo/elderly-woman-in-brown-shirt-8727507/) | Tima Miroshnichenko | Pexels License |
| `work-teapot-{480,800,1200}.{avif,webp}` | [Pexels 39599878](https://www.pexels.com/photo/elegant-still-life-with-ceramic-teapot-and-vase-39599878/) | Valentin Ivantsov | Pexels License |
| `work-potter-{480,800,1200}.{avif,webp}` | [Pexels 6611304](https://www.pexels.com/photo/man-making-a-clay-pot-6611304/) | Yan Krukau | Pexels License |
| `work-sitter-{800,1200,1600}.{avif,webp}` | [Pexels 8727528](https://www.pexels.com/photo/serious-man-in-close-up-photography-8727528/) | Tima Miroshnichenko | Pexels License |
| `work-jug-{480,800,1200}.{avif,webp}` | [Pexels 6692127](https://www.pexels.com/photo/a-close-up-shot-of-a-clay-jar-6692127/) | Tara Winstead | Pexels License |
| `work-bowls-{480,800,1200}.{avif,webp}` | [Pexels 7219608](https://www.pexels.com/photo/a-person-in-an-apron-holding-a-bowl-7219608/) | cottonbro studio | Pexels License |
| `work-vessels-{800,1200,1600}.{avif,webp}` | [Pexels 15535542](https://www.pexels.com/photo/pottery-on-clay-shelf-15535542/) | Denys Gromov | Pexels License |
| `work-rust-{480,800,1200}.{avif,webp}` | [Pexels 7588356](https://www.pexels.com/photo/face-of-brunette-woman-7588356/) | Karolina Grabowska / Kaboompics | Pexels License |
| `studio-room-{800,1200,1600}.{avif,webp}` | [Pexels 8143699](https://www.pexels.com/photo/large-window-in-a-bright-studio-8143699/) | Max Vakhtbovych | Pexels License |
| `studio-chair-{480,800,1200}.{avif,webp}` | [Pexels 7193706](https://www.pexels.com/photo/brown-wooden-chair-beside-white-wall-7193706/) | Karolina Grabowska / Kaboompics | Pexels License |

**Terms.** Pexels License (https://www.pexels.com/license/): free to use and modify,
commercially or not; no selling unaltered copies; no redistribution on other stock-photo or
wallpaper platforms; no implying endorsement by people or brands shown; no portraying
identifiable people in a bad light. **If you build your own studio's site from this starter,
replace every one of these with your own photographs** — a portfolio must show work you made.

## Not in this repository (installed by `npm install`)

| Package | Licence | Notes |
|---|---|---|
| `@profitstudio/booking-engine` 2.0.0-beta.3 | MIT | The booking engine and the packaged dashboard |
| `react`, `react-dom` | MIT | |
| `@fontsource-variable/bricolage-grotesque` | OFL-1.1 | Typeface (Bricolage Grotesque, by Mathieu Triay / Atelier Triay) |
| `@fontsource/dm-mono` | OFL-1.1 | Typeface (DM Mono, by Colophon Foundry for DeepMind) |

Fonts are bundled into your build by Vite; the SIL Open Font License 1.1 allows that (keep
the fonts' licence files in `node_modules` — no action needed).

## Original work (MIT, see LICENSE)

- `public/favicon.svg` — drawn in SVG for this starter (a print on umber, circled in grease pencil).
- Every ornament that is code: the three hand-drawn marker paths (`src/components/Marker.tsx`),
  the marker underline, the edge print and frame numbers, the film-sprocket edge on the
  booking sheet's header (CSS).
- The brand "Umber Studio", its copy and its address are fictional, made for this starter;
  the `.example` addresses and `555` phone numbers are reserved for examples.
