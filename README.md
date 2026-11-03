# AzDSF — Azərbaycan İdman Rəqsləri Federasiyası

Federasiyanın rəsmi saytı. Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP, Motion, next-intl.

Bu **yalnız frontend-dir**. Backend yoxdur; bütün məzmun `src/data/` altındakı mock fayllardan gəlir və
API hazır olanda hər fayl bir endpoint ilə əvəz olunacaq şəkildə ayrılıb.

## Başlanğıc

```bash
npm install
```

```bash
npm run dev
```

http://localhost:3000 avtomatik olaraq `/az` ünvanına yönləndirilir.

```bash
npm run build
```

```bash
npm run typecheck
```

```bash
npm run lint
```

## Struktur

```
src/
  app/[locale]/
    layout.tsx            html/body, şriftlər, NextIntlClientProvider, header + footer
    page.tsx              landing səhifə — bütün bölmələri sıraya düzür
    competitions/page.tsx tam yarış təqvimi
    news/page.tsx         xəbər siyahısı
    not-found.tsx         404
  app/globals.css         Tailwind + təkrarlanan sinif qatı (.wrap, .btn, .eyebrow, .data-table …)
  components/
    layout/               SiteHeader, MegaPanel, MobileNav, SiteFooter, Brand
    home/                 Hero, QuickTiles, NewsSection, AboutSection, StatsBand,
                          DisciplinesSection, CompetitionsSection + CompetitionTable,
                          RankingSection, AthletesSection, MembershipSection,
                          ClubsSection, GallerySection, PartnersSection, ContactSection
    ui/                   Visual, Reveal, Tabs, Lightbox, Countdown, SectionHead, LocaleSwitcher
  data/                   navigation, competitions, ranking, news, disciplines,
                          athletes, clubs, gallery, federation
  i18n/                   routing.ts (locale-aware Link/useRouter), request.ts
  lib/                    paintVisual.ts (canvas kompozisiyaları), schedule.ts
  types/                  ortaq tiplər + pick() helper
messages/                 az.json, en.json
public/logo/              loqonun 4 variantı (PNG, şəffaf fon)
public/img/               yarış və məşq fotoları (18 ədəd)
```

## Dil (i18n)

`next-intl`, prefiks həmişə görünür: `/az/...`, `/en/...`. Default `az`.

İki ayrı mexanizm var və bu qəsdəndir:

1. **UI mətnləri** → `messages/az.json` və `messages/en.json`, `useTranslations()` ilə.
   Yeni açar əlavə edəndə hər iki faylı yeniləyin.
2. **Məzmun (data)** → `src/data/*.ts` içində `{ az: '…', en: '…' }` obyektləri,
   `pick(value, locale)` ilə oxunur. Yarış adları, cütlük adları, klub adları kimi
   məlumatlar sonra API-dən gələcəyi üçün JSON tərcümə faylına yığılmayıb.

Naviqasiya üçün **həmişə** `@/i18n/routing` faylındakı `Link` və `useRouter`-i import edin,
`next/link` və `next/navigation`-ı yox — əks halda keçid zamanı locale itir.

## Şriftlər

`next/font/google` ilə: **Archivo** (başlıqlar), **IBM Plex Sans** (mətn), **IBM Plex Mono** (rəqəm və etiketlər).

Hər üçündə `subsets: ['latin', 'latin-ext']` var və bu məcburidir: `latin-ext` alt dəsti
U+0259 (**ə**) hərfini, həmçinin ğ, İ, ı, ş hərflərini daşıyır. Onsuz Azərbaycan mətni
hərf-hərf fallback şriftə düşür və səhifə pozulmuş görünür.

Archivo `next/font` məlumat bazasında **variable**-dır, ona görə `weight` verilmir.
IBM Plex Sans və Mono statik sayılır — çəkiləri açıq yazılıb. (Google Fonts API artıq
Plex Sans-ı variable kimi verir, amma `next/font` 14.2 bunu hələ bilmir; `weight`-i
silsəniz typecheck sınır.)

## Dizayn sistemi

Brend rəngləri loqo pikselindən götürülüb: navy `#1B467A`, magenta `#ED018A`.
Neytral rənglər soyuq tərəfə — navy-yə doğru — meyllidir. Hamısı `tailwind.config.ts` içindədir.

Təkrarlanan naxışlar (`.wrap`, `.band`, `.btn`, `.eyebrow`, `.tag`, `.data-table`, `.visual`)
`globals.css` içində `@layer components` qatındadır ki, JSX oxunaqlı qalsın.

## Şəkillər

Bütün "foto" sahələri eyni komponentdən keçir — `<Visual />`:

- `src` verilibsə, `next/image` ilə real foto göstərilir (`fill` + `object-cover`).
- `src` yoxdursa, `src/lib/paintVisual.ts` canvas-da brend rənglərində lent kompozisiyası çəkir.
  Hər kompozisiya `seed`-ə görə deterministikdir, ona görə render-dən render-ə dəyişmir.
  Sınıq şəkil linki yoxdur.

Fotolar `public/img/` altındadır və data faylları vasitəsilə qoşulub: `Discipline`, `NewsItem`,
`Athlete` və `GalleryItem` tiplərində `image?: string` sahəsi var. Yəni yeni foto əlavə etmək üçün
tərtibata toxunmaq lazım deyil — data yazısına bir sətir əlavə edin:

```ts
image: '/img/latin-kick.png',
```

Komponentdə `alt` və qutunun real ölçüsünə uyğun `sizes` ötürün (xəbər siyahısındakı kiçik şəkillər
cəmi 124px-dir; `sizes` olmasa hər biri tam enli variantı yükləyər).

**Breaking** və **Para rəqs idmanı** bölmələri qəsdən kompozisiya ilə qalıb: bu iki istiqamətin fotosu
yoxdur, Standard və ya Latın fotosu ilə əvəz etmək düzgün olmazdı.

Qalereya altyazıları (`src/data/gallery.ts`) fotonun məhz nəyi göstərdiyini yazır — `image`-i dəyişəndə
altyazını da yeniləyin.

Xarici host-dan şəkil veriləcəksə, `next.config.mjs` içindəki `images.remotePatterns`-a əlavə edin;
`public/` altındakı fayllar üçün bu lazım deyil.

`sharp` quraşdırılmayıb — `next start` xəbərdarlıq verir və daha yavaş daxili optimizatordan istifadə
edir. Production üçün `npm i sharp` kifayətdir.

## Animasiya

- **GSAP + ScrollTrigger** — yalnız hero: açılış timeline-ı və scroll parallax (`src/components/home/Hero.tsx`).
  `gsap.context()` içindədir və unmount-da `revert()` olunur.
- **Motion** (`motion/react`) — bölmə reveal-ları (`ui/Reveal.tsx`) və mobil menyu keçidləri.

Hər ikisi `prefers-reduced-motion`-a hörmət edir: Reveal animasiyasız render olunur,
Hero timeline-ı isə ümumiyyətlə qurulmur.

## Mock data

Aşağıdakılar **nümunədir**, real deyil: yarış adları və tarixləri, reytinq cədvəlləri,
cütlük və klub adları, xəbər başlıqları, klub/məşqçi/zal sayları, federasiya rəqəmləri.
Səhifədə "Nümunə məlumat" etiketi və footer-də demo xəbərdarlığı var.

⚠️ Fotolar realdır, yanındakı adlar isə yox. "İdmançılar" bölməsində hər kartda real adamın fotosu
uydurulmuş cütlük adı, sinif və reytinqlə birlikdə göstərilir. Bölmədə "Nümunə məlumat" etiketi var,
amma real adlar gələnə qədər hər fotonun həmin şəxslə uyğunluğunu yoxlamaq lazımdır.

**Uydurulmayıb** (boş saxlanılıb): ünvan, e-poçt, telefon, sosial şəbəkə hesabları.
Əlaqə forması göndərilmir — submit edəndə bunu açıq yazır (`ContactSection.tsx`).

Realdır: rəqs adları, tempolar (Vals 28–30, Vyana valsı 58–60 takt/dəq), yaş qrupları,
E–S sinif pilləkəni və breaking-in Paris 2024-də Olimpiya proqramına daxil olması.

## API-yə keçid

Hər data faylı bir endpoint-ə uyğun gəlir:

| Fayl | Gözlənilən endpoint |
| --- | --- |
| `data/competitions.ts` | `GET /competitions?season=2026` |
| `data/ranking.ts` | `GET /ranking/{category}`, `GET /results/recent` |
| `data/news.ts` | `GET /news` |
| `data/athletes.ts` | `GET /athletes/national-team` |
| `data/clubs.ts` | `GET /clubs/cities` |

Tiplər `src/types/index.ts` içindədir — DTO gələndə əvvəlcə orada uyğunlaşdırın,
sonra data faylını fetch ilə əvəz edin. Komponentlərə toxunmaq lazım olmayacaq.
