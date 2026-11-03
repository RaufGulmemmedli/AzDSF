import type { Athlete, Localized } from '@/types';

/** DEMO DATA — names and placements are sample entries, not the federation registry. */
export const athletes: Athlete[] = [
  {
    id: 'aliyev-huseynova',
    couple: 'Rəşad Əliyev / Nigar Hüseynova',
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
    couple: 'Murad Həsənov / Zeynəb Kərimova',
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
    couple: 'Elvin Cəfərov / Səbinə Allahverdiyeva',
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
    couple: 'Nihad Əliyev / Mələk Quliyeva',
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
