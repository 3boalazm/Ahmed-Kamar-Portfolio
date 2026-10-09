# Ahmed Kamar — Data Analyst Portfolio

Mini edition of the Aboalazm OS architecture, rebuilt for a data practice.
Single page · EN / AR (RTL) · dark / light · printable CV · SQL console easter egg.

**Stack:** Next.js 15 (App Router) · TypeScript strict · Tailwind v4 · self-hosted fonts (Fontsource) · no runtime deps beyond React/Next.

```bash
npm install
npm run dev        # http://localhost:4300
npm run build && npm start
```

## What was taken from the OS — and what was changed

| | Aboalazm OS | This site |
|---|---|---|
| Page order | Hero → Work → Why → Method → Background → FAQ → CTA | **Same six beats, same numbered `01–06` markers** |
| Chrome | Floating pill nav, footer columns, scroll progress | Report toolbar (worksheet-tab links), same footer anatomy |
| Tokens | `globals.css @theme`, semantic utilities, 1 easing curve | Same system (`bg-surface-1`, `text-text-secondary`, `ease-physics`) |
| Canvas / accent | Obsidian + Coral | **Midnight Navy + Signal Amber** (CV navy) |
| Type | GC Epicpro · Montserrat · Thmanyah | **Bricolage Grotesque · IBM Plex Sans/Mono · IBM Plex Arabic** |
| Emphasis | Italic coral | Marker highlight (works in Arabic) |
| Atmosphere | Grain + glow | Blueprint grid + chart-axis ticks |
| Shapes | Pills, 12/24px radii | Rectangular, 6/10px radii |
| Hero visual | System constellation | **Insight board** — live bar / line / ratings charts (sample data, labelled) |
| Easter egg | Ctrl+` terminal | **Ctrl+` SQL console** — `select * from skills;` |
| Colour roles | Cyan / mint / pink | Sky = query · Mint = clean · Violet = analyze · Rose = flag |

## Where to edit

Everything user-facing lives in **`lib/content.ts`** (every string is `{ en, ar }`).
Design tokens live in **`app/globals.css`**.

```
app/            page.tsx (the six sections) · cv/ (printable CV) · layout.tsx
components/     layout/ (nav, footer) · ui/ · terminal/ (SQL console) · providers/prefs
features/       hero/ · work/ (cases + ledger) · home/ (why, method, practice, faq/contact)
lib/            content.ts · utils.ts
```

### Adding the first Data case study
`CASE_SLOT` in `lib/content.ts` is the reserved card (Problem → Tools → Insights → Impact).
When the Power BI + SQL project exists, add an entry to `CASES` and delete the slot.

### CV
"Download CV" opens `/cv` — a print-ready page generated from the same content
(use *Print → Save as PDF*). To ship a designed PDF instead: drop it in `public/`
and change `SITE.cv` in `lib/content.ts`.

## ⚠️ Review before publishing

1. **`350+` (HungerStation metric)** — the CV figure is a sum of menu + catalog entries.
   Ahmed must confirm it (`TODO(verify)` in `lib/content.ts`).
2. **Name in Arabic** — the Arabic UI keeps the name in Latin (`Ahmed Mohamed Ramadan Kamar`)
   so no spelling is guessed. Add the Arabic spelling if wanted.
3. **NDA** — client work is shown at summary level. Not included on purpose:
   Keeta / Salla platform names, per-type item counts (111 / 146 / 94), phone number.
   Add them only if Ahmed confirms the NDA allows it.
4. **Sign Language repo** — the card links to `github.com/Elshami203/Sign-Language-Interpreter`
   and states it is a team project on a teammate's account.
   Before the link goes live: **remove the committed `.env` from that repo and rotate the
   database password**, and add a short README.
5. **Copy written for Ahmed** (approve or edit): the *Why* principles, the *Method*
   steps, the FAQ answers, and the "What I can take on" list. They are derived from his
   CV facts but are authored wording.
6. **Insight board** is illustrative sample data (labelled on screen) — not client data.
7. **Links** (LinkedIn, GitHub, email) were taken from the brief and not click-tested.
8. **Missing assets:** professional photo (optional), Sign Language screenshots/demo,
   certificates (none added), a recommendation quote (none invented).

## Deploy on Vercel

1. Import the GitHub repo in Vercel — Next.js is auto-detected (no config needed, Node 22 via `.nvmrc`).
2. Optional: set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to the custom domain. Without it, the
   production `*.vercel.app` domain is used for canonical/OpenGraph/sitemap.
3. Deploy. All routes are static (`/`, `/cv`, sitemap, robots).

## Ports
Dev runs on **4300** (3157–3256 are reserved by Windows; 3100 is used by the OS).
