import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Sessions, prices, durations, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 */
const MARK_HELP = 'Wrap a few words in *asterisks* to underline them with the marker, like a frame picked on a contact sheet.';
const WORK_CAPTION_HELP =
  'A short title, then “·” and the kind of work — for example “Studio portrait, painted backdrop · Portraits”. The kind becomes a filter above the work (Portraits, Headshots, Brand, Still life…). Optional.';
const workPhotoHelp = (shape: 'portrait' | 'landscape') =>
  `${shape === 'portrait' ? 'Upright (4:5)' : 'Wide (3:2)'} in the layout — any photo fits, the frame crops from the centre. A “Sample” label stays on it until you replace it with your own work. Remove it to show fewer frames.`;

/** The ten frames of the portfolio, in page order, with their shape in the layout. */
const WORK = [
  { n: 1, shape: 'portrait', src: '/photos/work-ochre-800.webp', w: 800, h: 1000, caption: 'Leaning in, ochre ground · Portraits', alt: 'A young man in an olive shirt rests his head on one hand against a deep ochre backdrop, looking away in thought.' },
  { n: 2, shape: 'landscape', src: '/photos/work-profile-1200.webp', w: 1200, h: 800, caption: 'Profile on a sand backdrop · Portraits', alt: 'A woman with long dark hair in profile against a plain sand-coloured backdrop, lit softly from the side.' },
  { n: 3, shape: 'portrait', src: '/photos/work-navy-800.webp', w: 800, h: 1000, caption: 'Plain shirt, navy canvas · Headshots', alt: 'A woman with short white hair in a stone T-shirt stands square to the camera in front of a navy canvas backdrop.' },
  { n: 4, shape: 'portrait', src: '/photos/work-teapot-800.webp', w: 800, h: 1000, caption: 'Clay teapot and vessels · Still life', alt: 'A dark clay teapot, a tall red vase and a footed bowl on an oxblood cloth, lit like an old still-life painting.' },
  { n: 5, shape: 'portrait', src: '/photos/work-potter-800.webp', w: 800, h: 1000, caption: 'At the wheel · Brand', alt: 'A potter in a grey apron shapes a tall pale vase on the wheel, his hands wet with slip.' },
  { n: 6, shape: 'landscape', src: '/photos/work-sitter-1200.webp', w: 1200, h: 800, caption: 'A straight look · Headshots', alt: 'A man with close-cropped grey hair in a white T-shirt looks straight into the camera against a navy backdrop.' },
  { n: 7, shape: 'portrait', src: '/photos/work-jug-800.webp', w: 800, h: 1000, caption: 'Clay jug, late light · Still life', alt: 'A round unglazed clay jug in a bar of late sunlight, half of it in deep shadow.' },
  { n: 8, shape: 'portrait', src: '/photos/work-bowls-800.webp', w: 800, h: 1000, caption: 'Black-glazed bowls · Brand', alt: 'Hands in a linen apron hold up a matte black ceramic bowl above two more stacked on a grey table.' },
  { n: 9, shape: 'landscape', src: '/photos/work-vessels-1200.webp', w: 1200, h: 800, caption: 'A shelf of unglazed vessels · Still life', alt: 'Five unglazed terracotta vessels of different heights on a plaster ledge against a warm clay wall.' },
  { n: 10, shape: 'portrait', src: '/photos/work-rust-800.webp', w: 800, h: 1000, caption: 'Rust ground, hand to temple · Portraits', alt: 'A young woman with long dark hair rests a hand at her temple, gazing down, against a rust-coloured backdrop.' },
] as const;

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo, the marker colour and the heading style.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The short name in the header and footer. One short word reads best.',
          default: 'Umber',
          maxLength: 20,
          required: true,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide, dark logo on a transparent background — the header is warm paper. It replaces the name mark in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Marker colour',
          help: 'The grease-pencil colour: the marks around chosen frames, underlined words, the booking calendar and buttons. A deep, warm colour — oxblood, brick, burnt orange, ink blue — suits the design; white text must stay readable on it.',
          default: '#a3271c',
          contrastWith: '#ffffff',
          minContrast: 4.5,
        },
        {
          type: 'choice',
          id: 'brand.headings',
          label: 'Heading style',
          default: 'grotesk',
          options: [
            { value: 'grotesk', label: 'Grotesk', description: 'Tight and confident — the original design.' },
            { value: 'light', label: 'Grotesk, light', description: 'The same letters in a lighter, quieter weight.' },
            { value: 'typewriter', label: 'Typewriter', description: 'Headings in the monospaced type of the frame numbers.' },
          ],
        },
      ],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Umber Studio — portraits, headshots & still life in Philadelphia',
          maxLength: 70,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'A daylight portrait studio in Fishtown, Philadelphia, with hand-painted backdrops: portraits, headshots, brand sessions and still life. See sessions and prices and book online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
    {
      id: 'hero',
      label: 'Welcome',
      description:
        'The first screen: the headline, the button, and your photo marked like the chosen frame on a contact sheet, with two neighbouring frames from the same sitting beside it.',
      fields: [
        {
          type: 'text',
          id: 'hero.eyebrow',
          label: 'Small line above the headline',
          default: 'Portrait & still-life studio · Philadelphia',
          maxLength: 60,
        },
        { type: 'text', id: 'hero.title', label: 'Headline', help: MARK_HELP, default: 'Portraits, *unhurried.*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'A daylight studio in Fishtown with hand-painted backdrops. Portraits, headshots and still life for people and the things they make — one sitting at a time.',
          maxLength: 240,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Button', default: 'Book a session', maxLength: 28, required: true },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo (the chosen frame)',
          help: 'Your strongest portrait, upright (4:5). It carries the marker frame. Keep the face in the upper half — the frame crops from the centre.',
          default: {
            src: '/photos/sitting-select-1200.webp',
            alt: 'A woman in a long red dress sits on a wooden folding chair, chin on her hand, before a hand-painted umber and rust canvas backdrop.',
            width: 1200,
            height: 1500,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'image',
          id: 'hero.frame2',
          label: 'Neighbouring frame 1',
          help: 'Optional. A small frame beside the main photo — ideally from the same sitting. Upright (4:5). Remove both small frames to show the main photo alone.',
          default: {
            src: '/photos/sitting-a-400.webp',
            alt: 'The same sitting, closer: the woman in red seen over her shoulder, eyes lowered, a silver earring catching the light.',
            width: 400,
            height: 500,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'image',
          id: 'hero.frame3',
          label: 'Neighbouring frame 2',
          help: 'Optional. A second small frame from the same sitting. Upright (4:5).',
          default: {
            src: '/photos/sitting-b-400.webp',
            alt: 'The same sitting, full length: the woman stands in the long red dress before the painted backdrop, hands folded.',
            width: 400,
            height: 500,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'text',
          id: 'hero.caption',
          label: 'Caption under the photo',
          help: 'A short line under the frames, like the note on a contact sheet. Optional.',
          default: 'Studio portrait · painted canvas backdrop',
          maxLength: 60,
        },
      ],
    },
    {
      id: 'work',
      label: 'Selected work',
      description:
        'Your portfolio: ten frames in a fixed editorial layout. Each sample photo carries a “Sample” label until you replace it — always show your own work. Remove a photo to show fewer.',
      fields: [
        { type: 'text', id: 'work.title', label: 'Title', help: MARK_HELP, default: 'Selected *work*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'work.intro',
          label: 'Introduction',
          default: 'People, and the things people make — in the same patient light. Choose a kind of work to mark it on the sheet; open any frame to see it larger.',
          maxLength: 240,
          rows: 2,
        },
        ...WORK.flatMap((w) => [
          {
            type: 'image' as const,
            id: `work.photo${w.n}` as const,
            label: `Frame ${w.n} (${w.shape === 'portrait' ? 'upright' : 'wide'})`,
            help: workPhotoHelp(w.shape),
            default: { src: w.src, alt: w.alt, width: w.w, height: w.h },
            aspectRatio: w.shape === 'portrait' ? 4 / 5 : 3 / 2,
          },
          { type: 'text' as const, id: `work.caption${w.n}` as const, label: `Caption ${w.n}`, help: WORK_CAPTION_HELP, default: w.caption, maxLength: 72 },
        ]),
        {
          type: 'text',
          id: 'work.linkLabel',
          label: 'Link text (optional)',
          help: 'For example “More on Instagram”. Leave empty to hide the link.',
          default: '',
          maxLength: 40,
        },
        { type: 'link', id: 'work.linkUrl', label: 'Link address', help: 'Your Instagram or full portfolio, starting with https://', default: '' },
      ],
    },
    {
      id: 'services',
      label: 'Sessions',
      description:
        'Session names, lengths and prices come from Services in this dashboard. The page groups them by the words in their names (portrait, headshot, brand or maker, still life or product) and lists what each includes from its description: end a description with “Includes:” and items separated by “·”.',
      fields: [
        { type: 'text', id: 'services.title', label: 'Title', help: MARK_HELP, default: 'Sessions & *prices*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'services.intro',
          label: 'Introduction',
          default:
            'The time shown is the time you spend in the studio. Choosing and retouching your photographs happens afterwards, and every price includes it. Prices marked “from” depend on the number of people or objects — we agree the final price with you before the session.',
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'longText',
          id: 'services.notePortrait',
          label: 'Note beside “Portraits”',
          default: 'For you, or for the people you love. Painted backdrops, the north window, or both.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'services.noteHeadshot',
          label: 'Note beside “Headshots”',
          default: 'Quick, relaxed and still considered. We help with posture and expression — nobody is good at this alone.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'services.noteBrand',
          label: 'Note beside “Brand & makers”',
          default: 'For people whose work is their name: portraits, process and the pieces themselves, in one consistent light.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'longText',
          id: 'services.noteStill',
          label: 'Note beside “Still life & product”',
          default: 'Bring your objects clean and ready. We style them on painted grounds, plaster and linen.',
          maxLength: 220,
          rows: 2,
        },
      ],
    },
    {
      id: 'studio',
      label: 'The studio',
      description: 'The room and how you work in it. Two photos and a few plain facts.',
      fields: [
        { type: 'text', id: 'studio.title', label: 'Title', help: MARK_HELP, default: 'A room for *sitting still*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'studio.text',
          label: 'Text',
          default:
            'The studio is one long room on the third floor of an old print works, with a tall arched window facing north. The light barely changes through the day, so nobody has to rush.\n\nWe work slowly on purpose: a coffee first, a look at the backdrops together, then time for you to stop performing. Most of the good frames come after the first twenty minutes.',
          maxLength: 900,
          rows: 7,
        },
        {
          type: 'image',
          id: 'studio.photoRoom',
          label: 'Photo of the studio (wide)',
          help: 'The room itself, wide (3:2). Shown with a “Sample” label until you replace it.',
          default: {
            src: '/photos/studio-room-1200.webp',
            alt: 'A long, empty photography studio with a wooden floor, an arched window at the far end and painted canvas backdrops leaning on both walls.',
            width: 1200,
            height: 800,
          },
          aspectRatio: 3 / 2,
        },
        {
          type: 'image',
          id: 'studio.photoDetail',
          label: 'Detail photo (upright)',
          help: 'A detail of the room, upright (4:5). Shown with a “Sample” label until you replace it. Remove it to show the wide photo alone.',
          default: {
            src: '/photos/studio-chair-800.webp',
            alt: 'A bentwood chair alone in a white room, in soft window light.',
            width: 800,
            height: 1000,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'list',
          id: 'studio.facts',
          label: 'Studio facts',
          itemLabel: 'Fact',
          maxItems: 6,
          fields: [
            { type: 'text', id: 'title', label: 'Fact', default: '', maxLength: 48, required: true },
            { type: 'text', id: 'text', label: 'Detail', default: '', maxLength: 90 },
          ],
          default: [
            { title: 'North light', text: 'A tall arched window, soft and even all day.' },
            { title: 'Six painted backdrops', text: 'Umber, rust, olive, navy, sand and stone canvas.' },
            { title: 'A changing room', text: 'With a mirror, a steamer and somewhere to sit.' },
            { title: 'Step-free', text: 'A lift to the third floor, and a ramp at the door.' },
          ],
        },
      ],
    },
    {
      id: 'experience',
      label: 'How a session works',
      description: 'Before, during and after. Keep the session (what is booked) apart from editing and delivery (what happens afterwards).',
      fields: [
        { type: 'text', id: 'experience.title', label: 'Title', help: MARK_HELP, default: 'How a session *works*', maxLength: 60, required: true },
        {
          type: 'list',
          id: 'experience.steps',
          label: 'Steps',
          itemLabel: 'Step',
          maxItems: 4,
          fields: [
            { type: 'text', id: 'when', label: 'When', default: '', maxLength: 40 },
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 40, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 320, rows: 4 },
          ],
          default: [
            {
              when: 'Before',
              title: 'A short note, then a plan',
              text: 'Tell us in the booking notes what the photographs are for. We reply by email with a few questions and a simple guide to clothes, colours and what to bring.',
            },
            {
              when: 'The session',
              title: 'Time in the studio',
              text: 'The time you book is the time in front of the camera, with a few minutes to settle in first. We look at frames together on the screen as we go.',
            },
            {
              when: 'Within a week',
              title: 'Choosing your frames',
              text: 'We send you a private selection by email. You pick your favourites — the number included with your session — and can add more if you like.',
            },
            {
              when: 'About 10 working days',
              title: 'Retouched and delivered',
              text: 'Each chosen frame is retouched by hand, lightly, and sent to you as full-size files ready for print and screen.',
            },
          ],
        },
        {
          type: 'longText',
          id: 'experience.note',
          label: 'Note under the steps',
          default:
            'Booking online reserves your time in the studio. Choosing, retouching and delivering photographs are arranged with you by email after the session.',
          maxLength: 280,
          rows: 3,
        },
      ],
    },
    {
      id: 'goodToKnow',
      label: 'Good to know',
      description: 'The practical questions clients ask before their first session.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Title', help: MARK_HELP, default: 'Good to *know*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 10,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 120, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'What should I wear?',
              answer:
                'What you feel like yourself in. Solid, muted colours and natural fabrics photograph well against the painted backdrops; avoid small, busy patterns and big logos. Bring a second option — there is a changing room.',
            },
            {
              question: 'I don’t like being photographed. Is that a problem?',
              answer:
                'Most of our clients say this. We go slowly, talk you through posture and expression, and never rush the first minutes. You will see frames on the screen as we go.',
            },
            {
              question: 'Can I bring someone with me?',
              answer: 'Of course — a friend, a partner or a stylist is welcome to sit in. For a portrait of two or more people, book a couple & family session.',
            },
            {
              question: 'How can I use the photographs?',
              answer:
                'Portraits and headshots are yours for personal and professional use, including websites, press and social media. Brand and product images include use for your own business; for advertising campaigns, ask us first.',
            },
            {
              question: 'What if I need to change or cancel?',
              answer: 'Let us know as soon as you can, ideally two working days before, so we can offer the time to someone else.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The words around the booking. Times and availability come from the engine.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Title', help: MARK_HELP, default: 'Book a *sitting*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose a session and a time that suits you. No account needed — it takes about a minute, and we reply personally before the day.',
          maxLength: 280,
          rows: 2,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Opening hours, the address, phone and email come from your business settings and opening hours.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Title', help: MARK_HELP, default: 'Find the *studio*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Arriving',
          default:
            'Ring Studio 3 at the green door on Frankford Avenue and take the lift to the third floor. Street parking is metered; the El stops two blocks away at Girard. Arrive ten minutes early if you would like a coffee first.',
          maxLength: 500,
          rows: 4,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [
        {
          type: 'text',
          id: 'footer.tagline',
          label: 'Footer line',
          default: 'Portraits, headshots & still life in daylight — Fishtown, Philadelphia.',
          maxLength: 100,
        },
      ],
    },
  ],
});
