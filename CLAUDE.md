# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Official website of AzDSF — Azərbaycan İdman Rəqsləri Federasiyası (Azerbaijan DanceSport Federation).
Next.js 14 App Router, TypeScript (strict), Tailwind, next-intl, GSAP + Motion.

**Frontend only — there is no backend.** All content comes from mock modules in `src/data/`, each shaped
to be replaced by one API endpoint later (mapping table at the end of `README.md`). The primary README is
written in Azerbaijani and is the authoritative product-level doc; this file covers what the code requires.

## Commands

```bash
npm run dev        # next dev — http://localhost:3000 redirects to /az
npm run build      # next build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint (eslint-config-next, core-web-vitals)
```

There is no test runner and no test files — `typecheck` + `lint` are the whole verification story, and both
pass clean on the current tree. Keep them clean; don't add a test framework unless asked.

This directory is not a git repository (`git init` has not been run).

## Architecture

### Route shell

`src/middleware.ts` → `next-intl/middleware` with `routing` from `src/i18n/routing.ts`. Locale prefix is
`always`, so every URL is `/az/...` or `/en/...`; default locale `az`.

Everything lives under `src/app/[locale]/`:

- `layout.tsx` — `html`/`body`, `NextIntlClientProvider`, `SiteHeader` + `<main id="top">` + `SiteFooter`,
  `generateMetadata` from the `Meta` namespace.
- `page.tsx` — the landing page; it is just an ordered list of `components/home/*` sections.
- `competitions/page.tsx`, `news/page.tsx`, `not-found.tsx`.

**Every page and layout must call `setRequestLocale(locale)` first** and export `generateStaticParams()`
over `routing.locales`. That is what keeps the tree statically rendered; dropping it silently pushes pages
to dynamic rendering.

The landing page is `export const revalidate = 3600` because `getNextCompetition()` (`src/lib/schedule.ts`)
reads the clock. The chosen competition is resolved **on the server** and passed down as a prop
(`NextCompetitionSection next={next}`) so the client countdown never disagrees about "now".

### Two separate translation channels — this is deliberate

1. **UI chrome** → `messages/az.json` + `messages/en.json`, read with `useTranslations('Namespace')`.
   Both files currently hold exactly 180 matching keys; add a key to both or the other locale breaks.
2. **Content/data** → `{ az: '…', en: '…' }` objects (`Localized` in `src/types/index.ts`) inside
   `src/data/*.ts`, read with `pick(value, locale)`. Competition names, couple names, club names and the
   like stay here because they will come from the API, not from a translation file.

When adding content, pick the channel by *where the string will eventually live*, not by convenience.

### Navigation must go through the i18n wrappers

Import `Link`, `useRouter`, `usePathname`, `redirect`, `getPathname` from `@/i18n/routing` — **never** from
`next/link` or `next/navigation`. The bare Next versions drop the active locale from the URL.

### Data → types → components

`src/types/index.ts` is the single contract (`Competition`, `Discipline`, `RankingRow`, `NewsItem`,
`Athlete`, `City`, `GalleryItem`, …). Components consume types, never raw literals. When an endpoint
arrives: reshape the type first, then swap the data module for a fetch — components should not need edits.

In-page navigation uses **Azerbaijani anchor ids on the home sections**, referenced from
`src/data/navigation.ts` as `/#<id>`: `federasiya`, `xeberler`, `novler`, `yarislar`, `reytinq`,
`idmancilar`, `uzvluk`, `klublar`, `qalereya`, `resurslar`, `elaqe`. These ids are the same in both locales
— don't localize them. `globals.css` sets `scroll-padding-top: 116px` to clear the sticky header.

`src/data/navigation.ts` also defines the mega-menu IA as data: each `NavItem` carries `columns` plus one
`feature` panel that is a discriminated union (`kind: 'cards' | 'rows'`). `MegaPanel` renders that union; the
header's three-column grid assumes two link columns + one feature.

### Styling

Tailwind only, no CSS modules. Brand tokens in `tailwind.config.ts` are sampled from the logo:
navy `#1B467A` (`navy-700`), magenta `#ED018A` (`mag`); neutrals (`surface`, `line`, `ink`, `on-dark`) lean
cool toward navy. `maxWidth.measure` = 1800px, custom easing `swift`.

Repeated patterns live in `@layer components` in `src/app/globals.css`: `.wrap`, `.band`/`.band-tight`,
`.eyebrow`, `.h1`–`.h4`, `.lead`, `.btn` + `.btn-mag`/`.btn-navy`/`.btn-out`/`.btn-on-dark`/`.btn-sm`,
`.tlink`, `.tag`, `.data-table`, `.num`, `.visual`/`.visual-light`/`.vtag`. Reach for these before writing a
new long class string — the point is that JSX stays readable. Note `.data-table` is styled for dark bands
(white text on navy), which is why `RankingSection` and `ContactSection` are the navy-gradient sections.

### Fonts — the `latin-ext` subset is mandatory

Loaded in the layout via `next/font/google`: **Archivo** (display), **IBM Plex Sans** (body), **IBM Plex
Mono** (numbers/labels), exposed as the CSS vars `--font-archivo`, `--font-plex-sans`, `--font-plex-mono`.

All three need `subsets: ['latin', 'latin-ext']`. `latin-ext` carries U+0259 (**ə**) plus ğ, İ, ı, ş; without
it Azerbaijani text falls through to the fallback font letter-by-letter and the page looks broken.

Archivo is variable in the `next/font` database so it takes no `weight`; Plex Sans and Mono are treated as
static there and need explicit weights — removing them breaks `typecheck` under `next/font` 14.2.

### Images: photographs first, generated composition as the fallback

Every "photo" slot goes through one component, `<Visual />` (`src/components/ui/Visual.tsx`):

- **With `src`** it renders `next/image` (`fill` + `object-cover`). Always pass `alt` and a `sizes` that
  matches the rendered box — the news side-thumbnails are 124px wide, and without `sizes` they would each
  pull a full-width source.
- **Without `src`** it paints a deterministic ribbon composition on canvas via `src/lib/paintVisual.ts`
  (seeded PRNG + one of four palettes: `hero`/`brand`/`mag`/`light`). Same seed → same image across
  renders, so an unfilled slot still looks designed and never shows a broken image. That branch repaints
  through a `ResizeObserver` because tab panels mount at zero size.

So filling a slot means adding `image` to the record, not touching the layout. The photographs live in
`public/img/*.png` (kebab-case, ASCII — they are URL paths) and are wired through the optional `image`
field on `Discipline`, `NewsItem`, `Athlete` and `GalleryItem`; `AboutSection` passes its `src` inline
because it has no data record. `GallerySection` and its `Lightbox` both read `item.image`, and the
lightbox uses `object-contain` so the whole frame is visible.

Two slots are deliberately still generated: the **Breaking** and **Para DanceSport** discipline tabs,
because no photography of either exists in `public/img`. Leave them on the canvas fallback rather than
illustrating them with a Standard or Latin photo.

Gallery captions in `src/data/gallery.ts` describe what each photograph actually shows — change the
caption when you change the `image`, or the page starts captioning a picture with something it is not.

Remote hosts must be added to `images.remotePatterns` in `next.config.mjs` (currently empty); files under
`public/` need no entry. `sharp` is not installed, so `next start` logs a warning and falls back to the
slower built-in optimizer — `npm i sharp` is the fix if production image serving matters.

Other raster assets: `public/logo/{full,mark}-{color,white}.png`, used through
`components/layout/Brand.tsx`.

### Animation

- **GSAP + ScrollTrigger** — only in `components/home/Hero.tsx`: the opening timeline (driven by
  `data-hero="…"` attributes) and a scroll parallax. Wrapped in `gsap.context()` and `revert()`ed on
  unmount; the whole effect returns early under `prefers-reduced-motion`.
- **Motion** (`motion/react`) — section reveals (`ui/Reveal.tsx`, which renders a plain `div` when
  `useReducedMotion()` is true) and the mobile drawer.
- **Hand-written canvas** — `components/home/BallroomStageBackground.tsx` (~1.6k lines) is the hero
  backdrop: a `requestAnimationFrame` loop on a 24-second cycle that cross-fades a 3D-sorted waltz couple
  against a breaking solo over a parquet floor, podium and spotlights. Module-level `draw*` helpers
  (`drawBreakdancer`, `render3DCouple`, `drawParquetFloor`, `drawPodium`, `drawSpotlights`, …) take a 2D
  context and plain numbers — keep them pure and outside the component.

`globals.css` also clamps all animation/transition durations under `prefers-reduced-motion`.

### Mock vs. real content

Fabricated (and labelled as such in the UI via the `Common.demoData` / `demoContent` tags and a footer
notice): competition names and dates, ranking tables, couple and club names, news headlines, club/coach/hall
counts, federation figures.

Deliberately left **empty rather than invented**: address, e-mail, phone, social accounts. The contact form
does not submit and says so on submit (`ContactSection.tsx`).

Factually real, keep accurate: dance names and tempos (Waltz 28–30, Viennese Waltz 58–60 bars/min), age
groups, the E–S class ladder, and breaking entering the Olympic programme at Paris 2024.

## Known loose ends in the current tree

Useful context, not a work list — don't "fix" these unless asked:

- `Hero` accepts a `next?: Competition` prop that `page.tsx` does not pass; the countdown moved to
  `NextCompetitionSection`.
- `src/components/ui/DanceCoupleAnimation.tsx` (~760 lines) is not imported anywhere.
- Some chrome strings bypass the message files as inline `locale === 'en' ? … : …` ternaries or bare
  Azerbaijani literals (`SiteHeader`, `MobileNav`, `SiteFooter`, `ClubsSection`, `NextCompetitionSection`).
  New chrome text should go into `messages/*.json`.
- `README.md`'s structure listing predates `middleware.ts`, `NextCompetitionSection`,
  `BallroomStageBackground`, `DanceCoupleAnimation` and `public/img/`.
