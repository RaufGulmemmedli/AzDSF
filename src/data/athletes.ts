import type { Athlete, Localized } from '@/types';

/**
 * The first block is REAL — federation athletes with their own photographs in
 * `/public/athletes`. Placings come from the Azerbaijan National Championship
 * protocol (see `competitionResults` in `./ranking`). Where an age group or
 * programme is still unknown, `detail` is left out rather than guessed.
 * Everything after the `DEMO DATA` marker is fabricated placeholder content.
 */
export const athletes: Athlete[] = [
  {
    id: 'seferli-esqerzade',
    name: 'Səfərli Kərim / Əsqərzadə Banu',
    detail: {
      az: 'Yunior 2 · Latın 1-ci, Avropa Standart 1-ci',
      en: 'Junior II · Latin 1st, European Standard 1st'
    },
    badge: { az: 'Çempionatın qalibi', en: 'National champion' },
    image: '/athletes/kerim-banu.jpeg',
    seed: 51,
    mode: 'brand'
  },
  {
    id: 'cebrayilov-eliyeva',
    name: 'Cəbrayılov İlyas / Əliyeva Fatimə',
    detail: {
      az: 'Yunior 2 · Latın 2-ci, Avropa Standart 3-cü',
      en: 'Junior II · Latin 2nd, European Standard 3rd'
    },
    badge: { az: 'Çempionat mükafatçısı', en: 'Championship medallist' },
    image: '/athletes/ilyas-fatime-latin.jpeg',
    seed: 52,
    mode: 'mag'
  },
  {
    id: 'konopelkin-huseynova',
    name: 'Konopelkin Daniil / Hüseynova Züleyxa',
    detail: {
      az: 'Yunior 2 · Latın 3-cü, Avropa Standart 2-ci',
      en: 'Junior II · Latin 3rd, European Standard 2nd'
    },
    badge: { az: 'Çempionat mükafatçısı', en: 'Championship medallist' },
    image: '/athletes/daniil-zuleyxa.jpeg',
    seed: 53,
    mode: 'brand'
  },
  {
    id: 'seferli-allahverdiyeva',
    name: 'Səfərli Səid / Allahverdiyeva Leyli',
    detail: { az: 'Yuvenal 1', en: 'Juvenile I' },
    image: '/athletes/seid-leyli.jpeg',
    seed: 54,
    mode: 'light'
  },
  {
    id: 'zeynal-muradi',
    name: 'Zeynal Şakir / Muradi Elina',
    detail: { az: 'Yuvenal 2', en: 'Juvenile II' },
    image: '/athletes/sakir-elina.jpeg',
    seed: 55,
    mode: 'mag'
  },
  {
    id: 'murad-viktoriya',
    name: 'Hüseynov Murad / Meneyeva Viktoriya',
    detail: { az: 'Yunior 1 · 1-ci yer', en: 'Junior I · 1st place' },
    badge: { az: 'Çempionatın qalibi', en: 'National champion' },
    image: '/athletes/murad-viktoriya.jpeg',
    seed: 56,
    mode: 'brand'
  },
  {
    id: 'doncenko-sisters',
    name: 'Donçenko Yelizaveta / Anastasiya / Yekaterina',
    detail: { az: 'Doğum illəri 2013 · 2011 · 2014', en: 'Born 2013 · 2011 · 2014' },
    image: '/athletes/doncenko-sisters.jpeg',
    seed: 57,
    mode: 'light'
  },
  {
    id: 'tairova-zarina',
    name: 'Tairova Zarina',
    detail: { az: 'Solo · 2015', en: 'Solo · 2015' },
    image: '/athletes/tairova-zarina.jpeg',
    seed: 58,
    mode: 'mag'
  },
  {
    id: 'ehmedova-cemile',
    name: 'Əhmədova Cəmilə',
    detail: { az: 'Doğum ili 2012', en: 'Born 2012' },
    image: '/athletes/ehmedova-cemile.jpeg',
    seed: 59,
    mode: 'brand'
  },
  {
    id: 'safiya',
    name: 'Safiya',
    image: '/athletes/safiya.jpeg',
    seed: 60,
    mode: 'light'
  },

  /* ---- DEMO DATA — names and placements are sample entries, not the registry ---- */
  {
    id: 'aliyev-huseynova',
    name: 'Rəşad Əliyev / Nigar Hüseynova',
    detail: {
      az: 'Yetkinlər Latın · S sinfi · Elegance, Bakı',
      en: 'Adults Latin · Class S · Elegance, Baku'
    },
    badge: { az: 'Reytinq №1', en: 'Ranking no. 1' },
    image: '/img/latin-pose-dramatic.png',
    seed: 41,
    mode: 'brand'
  },
  {
    id: 'hasanov-karimova',
    name: 'Murad Həsənov / Zeynəb Kərimova',
    detail: {
      az: 'Yetkinlər Standard · S sinfi · Elegance, Bakı',
      en: 'Adults Standard · Class S · Elegance, Baku'
    },
    badge: { az: 'Reytinq №1', en: 'Ranking no. 1' },
    image: '/img/ballroom-duo-blue.png',
    seed: 42,
    mode: 'mag'
  },
  {
    id: 'jafarov-allahverdiyeva',
    name: 'Elvin Cəfərov / Səbinə Allahverdiyeva',
    detail: {
      az: 'Gənclər Latın · B sinfi · Harmony, Gəncə',
      en: 'Youth Latin · Class B · Harmony, Ganja'
    },
    badge: { az: 'Qış Open qalibi', en: 'Winter Open winner' },
    image: '/img/latin-pose-dynamic.png',
    seed: 43,
    mode: 'brand'
  },
  {
    id: 'aliyev-guliyeva',
    name: 'Nihad Əliyev / Mələk Quliyeva',
    detail: {
      az: 'Uşaqlar Standard · D sinfi · Vals, Sumqayıt',
      en: 'Juvenile Standard · Class D · Vals, Sumqayit'
    },
    badge: { az: 'Klub Liqası I qalibi', en: 'Club League I winner' },
    image: '/img/young-dancers-clapping.png',
    seed: 44,
    mode: 'mag'
  }
];

export const athleteStats: { label: Localized; value: Localized }[] = [
  { label: { az: 'Lisenziyalı cütlük', en: 'Licensed couples' }, value: { az: '214', en: '214' } },
  { label: { az: 'Sertifikatlı məşqçi', en: 'Certified coaches' }, value: { az: '58', en: '58' } },
  { label: { az: 'Milli hakim', en: 'National adjudicators' }, value: { az: '31', en: '31' } },
  { label: { az: '2026 heyəti', en: 'Squad 2026' }, value: { az: '16 cütlük', en: '16 couples' } }
];
