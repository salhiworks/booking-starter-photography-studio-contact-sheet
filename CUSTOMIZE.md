# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude Code
session opened in this folder. It changes identity and words only, so it finishes in
one short session.

```text
Customize this photography studio starter for my business.

Studio name: <YOUR STUDIO NAME>
City and area: <CITY, AREA>
Time zone (IANA): <e.g. America/Chicago>
What we photograph, and our personality in a few words: <e.g. portraits and headshots, warm and unhurried>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the studio name, city and description in <title>,
   the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my studio: the name mark
   (brand.wordmark — one short word), the line above the headline, headline,
   introduction, the hero caption, the portfolio intro and captions ("Title · Kind" —
   keep the kinds short: Portraits, Headshots, Brand, Still life…), the sessions intro
   and group notes, the studio text and facts, the session steps, Good to know answers,
   the arriving note and the search title and description. Keep field ids, types,
   limits and photos. Keep the sample photos (they stay labelled "Sample" until I
   upload my own work). Headlines may underline one or two words with *asterisks* —
   keep that style.
4. Only if the oxblood marker clearly doesn't fit my studio (otherwise skip this step
   and don't open these files): change the default of brand.accent in
   src/content/site.ts (a deep, warm colour — brick, burnt orange, ink blue, forest),
   the light-mode colour in src/admin-theme.css and the marker stroke in
   public/favicon.svg, keeping white text at 4.5:1 on it.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/lib/work.ts, src/demo/, supabase/, booking-engine.lock.json or
package.json. Do not invent sessions, prices, opening hours, awards, reviews,
publications, clients, a photographer's name or biography, or delivery promises I have
not given — sessions, prices and hours are set in the dashboard. When done, run
npm run build and fix any error, then show me the result with npm run dev.
```

## After the prompt

- **Your sessions:** dashboard → Services. The page puts each session in a group by the
  words in its name — *headshot / LinkedIn / profile photo / corporate*, *still life /
  product / objects / packshot / flat lay*, *brand / maker / founder / business /
  workshop*, *portrait / sitting / family / couple / maternity / graduation* (in that
  order). If you rename a session to something without those words ("The Hour"), its
  description decides instead. Anything else (pets, film workshops) appears under "More
  sessions". The length you set is the time the client spends in the studio.
- **What a session includes:** end its description with `Includes:` and the items
  separated by `·` — for example `Includes: 1 hour in the studio · two outfits · 12
  retouched photographs`. The page and the booking show them as a short list.
- **Your photographs:** dashboard → Website → Welcome (the chosen frame and two small
  neighbouring frames), Selected work (ten frames — upright or wide as labelled — with
  captions "Title · Kind"), The studio (a wide photo of the room and an upright detail).
  Remove a photo to show fewer. Each stays labelled "Sample" until you replace it; show
  only your own work.
- Connect real bookings: README.md, step 3.
