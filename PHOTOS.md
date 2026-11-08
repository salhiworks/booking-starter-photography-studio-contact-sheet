# Photographs

Fifteen free photographs from Pexels, downloaded into the project (never hot-linked),
cropped for their one use, given one shared light grade and exported as AVIF + WebP at
three widths by the Contact Sheet photo pipeline. **This starter ships only those
processed frames** — the original downloads and the pipeline script stay with the
Niche Pack workspace (`concepts/photography-contact-sheet/photo-pipeline/photos.mjs`),
so the repository never redistributes an unaltered copy. No image-generation tool was
used, and one candidate was rejected because its Pexels account publishes AI images.

They are the website's **defaults** (`src/content/site.ts`): the owner replaces each
one in the dashboard (Website). **They are sample imagery, not Umber Studio's work**
(Umber is fictional): the people in them did not sit for the studio, are not its staff
or clients, and are not named. On the page the first-screen photo, every portfolio frame
and both studio photos carry a **"Sample"** label until the owner replaces that photo;
the portfolio says "Licensed stock photographs stand in until the studio adds its own
work", the viewer labels each frame "Sample — licensed stock photo", and in the Live
Demo and preview the studio section says the room and photographs are stock images.
No photographer is named or implied on the page.

People are identifiable in eight frames (it is a portrait studio). The Pexels License
allows this use but forbids implying that a person endorses a business or showing them in
a bad light: the Sample labels and the copy keep them as illustrations, and captions only
describe what is in the frame.

| Use (content field) | Files (`public/photos/`) | Source page | Photographer | Licence |
|---|---|---|---|---|
| First screen — the chosen frame: a woman in a red dress on a folding chair before a painted canvas backdrop (`hero.photo`) | `sitting-select-{800,1200,1600}` | https://www.pexels.com/photo/elegant-woman-in-red-dress-sitting-on-chair-29368496/ | Darkshade Photos ([@Darkshadephotos](https://www.pexels.com/@darkshadephotos/)) | Pexels License |
| First screen — neighbouring frame 12, same sitting, close over the shoulder (`hero.frame2`) | `sitting-a-{240,400,640}` | https://www.pexels.com/photo/elegant-portrait-of-woman-in-red-cape-29368477/ | Darkshade Photos | Pexels License |
| First screen — neighbouring frame 13, same sitting, full length standing (`hero.frame3`) | `sitting-b-{240,400,640}` | https://www.pexels.com/photo/elegant-portrait-of-woman-in-red-gown-29368466/ | Darkshade Photos | Pexels License |
| Work 1 — a young man in olive on an ochre backdrop (`work.photo1`) | `work-ochre-{480,800,1200}` | https://www.pexels.com/photo/contemplative-portrait-of-young-man-in-olive-shirt-37462717/ | David Fowora | Pexels License |
| Work 2 (wide) — a woman in profile on a sand backdrop (`work.photo2`) | `work-profile-{800,1200,1600}` | https://www.pexels.com/photo/a-side-view-of-a-woman-with-wearing-a-sweater-10209454/ | cottonbro studio ([@cottonbro](https://www.pexels.com/@cottonbro/)) | Pexels License |
| Work 3 — a woman in a stone T-shirt on navy canvas (`work.photo3`) | `work-navy-{480,800,1200}` | https://www.pexels.com/photo/elderly-woman-in-brown-shirt-8727507/ | Tima Miroshnichenko ([@tima-miroshnichenko](https://www.pexels.com/@tima-miroshnichenko/)) | Pexels License |
| Work 4 — clay teapot and vessels on oxblood cloth (`work.photo4`) | `work-teapot-{480,800,1200}` | https://www.pexels.com/photo/elegant-still-life-with-ceramic-teapot-and-vase-39599878/ | Valentin Ivantsov | Pexels License |
| Work 5 — a potter at the wheel (`work.photo5`) | `work-potter-{480,800,1200}` | https://www.pexels.com/photo/man-making-a-clay-pot-6611304/ | Yan Krukau ([@yankrukov](https://www.pexels.com/@yankrukov/)) | Pexels License |
| Work 6 (wide) — a man in a white T-shirt on navy (`work.photo6`) | `work-sitter-{800,1200,1600}` | https://www.pexels.com/photo/serious-man-in-close-up-photography-8727528/ | Tima Miroshnichenko | Pexels License |
| Work 7 — a clay jug in a bar of late light (`work.photo7`) | `work-jug-{480,800,1200}` | https://www.pexels.com/photo/a-close-up-shot-of-a-clay-jar-6692127/ | Tara Winstead ([@tara-winstead](https://www.pexels.com/@tara-winstead/)) | Pexels License |
| Work 8 — hands in an apron holding black-glazed bowls (`work.photo8`) | `work-bowls-{480,800,1200}` | https://www.pexels.com/photo/a-person-in-an-apron-holding-a-bowl-7219608/ | cottonbro studio | Pexels License |
| Work 9 (wide) — unglazed vessels on a plaster ledge (`work.photo9`) | `work-vessels-{800,1200,1600}` | https://www.pexels.com/photo/pottery-on-clay-shelf-15535542/ | Denys Gromov ([@jdgromov](https://www.pexels.com/@jdgromov/)) | Pexels License |
| Work 10 — a woman on a rust backdrop, hand to temple (`work.photo10`) | `work-rust-{480,800,1200}` | https://www.pexels.com/photo/face-of-brunette-woman-7588356/ | Karolina Grabowska / Kaboompics ([@karola-g](https://www.pexels.com/@karola-g/)) | Pexels License |
| The studio — a long daylight studio with an arched window and canvas backdrops (`studio.photoRoom`) | `studio-room-{800,1200,1600}` | https://www.pexels.com/photo/large-window-in-a-bright-studio-8143699/ | Max Vakhtbovych ([@artbovich](https://www.pexels.com/@artbovich/)) | Pexels License |
| The studio — a bentwood chair in window light (`studio.photoDetail`) | `studio-chair-{480,800,1200}` | https://www.pexels.com/photo/brown-wooden-chair-beside-white-wall-7193706/ | Karolina Grabowska / Kaboompics | Pexels License |

Licences were checked on each photo's page on 8 November 2026 (license: Pexels; each
page reads "Free to use"). The Pexels License does not require attribution; it is
recorded here anyway.

## How the set was chosen

Two search passes on Pexels (about 120 searches by orientation: window-light and
painted-backdrop portraits, headshots on coloured seamless, makers at work, ceramic still
life, studio interiors) gave well over 1,400 candidates; after filtering out
black-and-white, effects, small originals and non-Pexels licences, about 500 were reviewed
on labelled contact sheets, then a shortlist of 24 at 1400 px. The brief: one
studio's body of work — painterly daylight, coloured canvas and seamless backdrops in
earth tones (umber, ochre, rust, olive, navy), people and the things people make in the
same light.

- **The first screen** is a real sitting: three frames from one session on one painted
  canvas backdrop (Darkshade Photos), so the "contact sheet" shows genuine neighbouring
  frames rather than three unrelated pictures. The photographer published about 60 frames
  of that sitting on Pexels; the two neighbours were chosen from them to differ in scale
  from the seated select — a close frame over the shoulder (29368477) and a full-length
  standing frame (29368466) — as a real sheet would. (Review, 8 Nov 2026: the first
  neighbours, 29368485 and 29368488, were near-duplicates of the select and were replaced.)
- **Headshots** come from one consistent coloured-backdrop series (Tima Miroshnichenko).
- **Rejected:** a beige-blazer studio portrait published by an AI-image account ("Stable
  Diffusion", Pexels 29368584); two frames from the headshot series with pulled faces
  (8727544, 8727553); black-and-white, neon, smoke-effect and colour-gel portraits (off
  the palette); busy flower-shop and kitchen scenes; shots with visible logos, product
  labels or other businesses' names; frames of the sitting with crew, a light stand or the
  backdrop's edge in view (29368483, 29368464, 29368454).

## Processing

Each original was downloaded at 2400 px (Pexels' own resize), cropped to its frame,
graded once for the whole set (saturation × 0.9, a slight lift of the blacks — so navy,
ochre and rust backdrops sit together on the warm paper page), converted to sRGB with
metadata stripped, and exported as AVIF (q54) and WebP (q80). Nothing in a frame is
retouched. 2.9 MB in all.

| Photo | Crop (from the original) | Widths |
|---|---|---|
| sitting-select | 4:5, full width, from 9 % down (the chair and the whole dress in frame) | 800, 1200, 1600 |
| sitting-a, sitting-b | 4:5, full width, from 6 % / 7 % down | 240, 400, 640 |
| work-ochre | 4:5, the whole frame | 480, 800, 1200 |
| work-navy, work-teapot, work-potter, work-jug, work-bowls, work-rust | 4:5, full width, from 15 %, 10 %, 6 %, 10 %, 10 %, 16 % down | 480, 800, 1200 |
| work-profile | 3:2 from the full height, from 2 % across | 800, 1200, 1600 |
| work-sitter, work-vessels, studio-room | 3:2, the whole frame | 800, 1200, 1600 |
| studio-chair | 4:5 from the landscape original, from 4 % across | 480, 800, 1200 |

The site's `<Photo>` component serves `<picture>` with AVIF then WebP sources from
`src/content/photoVariants.ts` (generated); the first-screen AVIF is preloaded in
`index.html`; every other photo is lazy-loaded. Owner uploads arrive resized by the
engine (longest side 2400 px, WebP) and render as one `<img>`.

## Replacing a photo

In the dashboard → Website, each photo field states its shape: 4:5 for the chosen frame,
its two neighbours, the upright portfolio frames and the studio detail; 3:2 for the wide
portfolio frames (2, 6, 9) and the studio room. The page crops with `object-fit: cover`
from the centre, so any upload fits; keep the subject near the centre (a face in the
upper half for portraits). Replacing a photo removes its "Sample" label.
