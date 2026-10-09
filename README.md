# Ahmed Kamar — Data Analyst Portfolio

Personal portfolio for **Ahmed Mohamed Ramadan Kamar**, Data Analyst working with restaurant, retail, and delivery-platform data (HungerStation, Spinneys). Live at [ahmed-kamar-portfolio.vercel.app](https://ahmed-kamar-portfolio.vercel.app/).

- **Seven routes:** home, about, work, skills, method, contact, and a printable CV
- **Bilingual:** English and Arabic (full RTL layout), switchable from the nav and remembered between visits
- **Dark and light themes**, following the system preference until the visitor chooses
- **Fully static** — every page is prerendered, no backend, no database, no API keys
- **Stack:** Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · self-hosted fonts via Fontsource

## Run it

```bash
npm install
npm run dev          # http://localhost:4300
npm run typecheck
npm run build && npm start
```

Requires Node 20+ (`.nvmrc` pins 22). The dev port is 4300 because 3157–3256 are reserved by Windows.

## The site

| Route | What it shows |
|---|---|
| `/` | Hero with portrait and role summary, three headline metrics, then short bands for selected work, a live sample analysis, principles, method, background, and a closing call to action. Every band links to its full page. |
| `/about` | Portrait, professional summary, quick facts, education and training, languages with levels. |
| `/work` | One detailed case file each for HungerStation, Spinneys, and the Sign Language Interpreter project (context → what was done → domain), a reserved slot for the next case study, and the experience ledger. |
| `/skills` | Tool-by-tool skill sheet with honest levels (SQL and Google Sheets advanced; Power BI, Python, Excel intermediate), domain knowledge, and the kinds of work Ahmed can take on. |
| `/method` | The three principles behind the work and the four-stage process — Ask → Clean → Analyze → Share — as a sticky scroll story. |
| `/contact` | Email, LinkedIn, GitHub, availability, copy-email button, and the FAQ. |
| `/cv` | Print-ready English CV generated from the same content. Use *Print → Save as PDF*. |

### Interface details

- **Floating glass nav** with the portrait as the logo, section links, language switch, theme switch, and a Contact button. On phones it opens into a glass panel.
- **Insight board** (home): a small interactive chart window with three views — sales by weekday, menu price versus net-after-commission, and customer ratings. It cycles on its own until the visitor picks a view; hovering a bar or the line shows its value. **All numbers are sample data and are labelled as such on screen** — nothing in it comes from a client.
- **SQL console:** press <kbd>Ctrl</kbd> + <kbd>`</kbd> (or tap the SQL button in the corner) and query the portfolio itself — `show tables;`, `select * from skills;`, `select tool, level from skills where level = 'Advanced';`, `describe experience;`. Also understands `theme dark|light` and `lang en|ar`. Runs entirely in the browser.
- **Scroll progress bar**, scroll-in reveals, and a drifting skills marquee. All motion respects `prefers-reduced-motion`.
- **Accessibility:** semantic landmarks, visible focus rings, `aria-current` on the active nav item, keyboard-reachable chart elements, and logical CSS properties so Arabic mirrors correctly.

### Design

- **Palette:** midnight navy canvas with a single amber accent. Four data colours — sky (query), mint (clean), violet (analyze), rose (flag) — each carry one meaning and appear only in charts, process steps, and skill rows. A paper-and-navy light theme mirrors the same roles.
- **Type:** Bricolage Grotesque for headings, IBM Plex Sans for text, IBM Plex Mono for system labels, IBM Plex Sans Arabic for Arabic.
- **Surfaces:** translucent glass panels with a hairline border and a soft top-edge highlight, over a fixed colour field and a faint blueprint grid.
- **Emphasis:** a marker-style highlight under key phrases (works in both scripts).
- **Tokens:** every colour, radius, size, and easing curve is defined once in `app/globals.css` (`@theme`) and used through semantic classes such as `bg-surface-1`, `text-text-secondary`, and `border-border-subtle`.

## Project structure

```
app/
  page.tsx                 home
  about/ work/ skills/ method/ contact/    one page.tsx each (metadata + sections)
  cv/                      printable CV (page.tsx + print button)
  layout.tsx               fonts, metadata, JSON-LD, nav/footer/console
  globals.css              design tokens, glass, layout, motion, print styles
  sitemap.ts · robots.ts · icon.svg · not-found.tsx
components/
  layout/                  nav, footer
  ui/                      button recipe, icons, page header, section marker, reveal, scroll progress, brand orb
  terminal/                SQL console
  providers/prefs.tsx      language + theme state
features/
  hero/                    hero, insight board
  work/                    home cards, case files, case slot, experience ledger
  home/                    principles, method (story + strip), about, skills, FAQ, contact sheet, CTA band
lib/
  content.ts               all copy and data
  utils.ts                 class helper, series colour map
public/images/             ahmed.webp (hero, about, social preview) · ahmed-avatar.webp (nav and footer)
```

## Editing content

**Everything a visitor reads lives in `lib/content.ts`.** Each string is a pair, `{ en: "…", ar: "…" }`, so both languages stay side by side.

| To change… | Edit in `lib/content.ts` |
|---|---|
| Name, email, links, CV link | `SITE` |
| Hero text, status line, floating chips | `HERO` |
| The three headline numbers | `METRICS` |
| Case files (and the home cards) | `CASES` |
| The reserved "next case study" card | `CASE_SLOT` |
| Experience table | `LEDGER` |
| Principles / process steps | `WHY` / `METHOD` |
| About text, facts, education, languages | `ABOUT` |
| Skills and levels | `SKILLS`, `DOMAIN`, `CAPABILITIES` |
| FAQ and contact copy | `FAQ`, `CONTACT` |
| Page titles and subtitles | `PAGES` |
| Insight-board sample data | `BOARD` |
| Rows the SQL console can return | `SQL_TABLES` |

**Adding a case study:** append an entry to `CASES` — it appears on `/work` and on the home page automatically. When the first dashboard case study exists, add it there and remove `CASE_SLOT`.

**CV:** the *Download CV* buttons open `/cv`. To ship a designed PDF instead, place it in `public/` and change `SITE.cv`.

**Photo:** replace `public/images/ahmed.webp` (portrait, about 4:5) and `ahmed-avatar.webp` (square, about 192 px).

## Deploy (Vercel)

1. Import the GitHub repo in Vercel. Next.js is detected automatically; Node 22 comes from `.nvmrc`.
2. Optional: set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) for a custom domain. Without it the site uses its production `*.vercel.app` domain for canonical links, social previews, and the sitemap.
3. Every push to `main` redeploys.

## Content notes

Confirm these before sharing the link widely:

1. **"350+" menu and catalog items** (HungerStation) is a combined total of menu and catalog entries and should be verified by Ahmed. It is marked `TODO(verify)` in `lib/content.ts`.
2. **Confidentiality:** client work is deliberately summarized. Keeta and Salla, per-type item counts, and the phone number are not on the site; add them only if the NDA allows.
3. **Sign Language Interpreter:** the case links to `github.com/Elshami203/Sign-Language-Interpreter` and states that it is a team project on a teammate's account. That repository still contains a committed `.env` file — remove it and rotate the database password before pointing people there. A short repository README would also help.
4. **Name in Arabic:** the Arabic interface keeps the name in Latin letters rather than guess the spelling.
5. **Authored wording:** the principles, method steps, FAQ answers, and capabilities list are written from Ahmed's CV facts but are not his own words — he should read and adjust them.
6. **Links** (LinkedIn, GitHub, email) came from the brief and have not been click-tested by a person.
7. **Not yet included:** Sign Language screenshots or demo, certificates, and a recommendation quote. None were invented.
