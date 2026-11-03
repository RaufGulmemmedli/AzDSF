import type { Competition } from '@/types';

/**
 * DEMO DATA — these events are not announced federation competitions.
 * Replace with the API response once the calendar endpoint exists.
 */
export const competitions: Competition[] = [
  {
    id: 'baku-cup-2026',
    day: '14',
    month: { az: 'Mart', en: 'Mar' },
    year: 2026,
    isoDate: '2026-03-14',
    name: { az: 'Bakı Kuboku 2026', en: 'Baku Cup 2026' },
    note: { az: 'Reytinq turniri · 2 gün', en: 'Ranking tournament · 2 days' },
    venue: { az: 'İdman Sarayı, Bakı', en: 'Sports Palace, Baku' },
    programme: { az: 'Standard + Latın · D–S', en: 'Standard + Latin · D–S' },
    scope: 'national',
    status: 'open'
  },
  {
    id: 'azerbaijan-championship-2026',
    day: '25',
    month: { az: 'Aprel', en: 'Apr' },
    year: 2026,
    isoDate: '2026-04-25',
    name: { az: 'Azərbaycan Çempionatı', en: 'Azerbaijan Championship' },
    note: { az: 'Milli titul · bütün yaş qrupları', en: 'National title · all age groups' },
    venue: { az: 'Bakı Konqres Mərkəzi', en: 'Baku Congress Centre' },
    programme: { az: 'Standard / Latın / Ten Dance', en: 'Standard / Latin / Ten Dance' },
    scope: 'national',
    status: 'soon'
  },
  {
    id: 'caspian-open-2026',
    day: '30',
    month: { az: 'May', en: 'May' },
    year: 2026,
    isoDate: '2026-05-30',
    name: { az: 'Xəzər Open 2026', en: 'Caspian Open 2026' },
    note: { az: 'Beynəlxalq dəvət · 14 ölkə', en: 'International invitation · 14 countries' },
    venue: { az: 'Sumqayıt İdman Kompleksi', en: 'Sumqayit Sports Complex' },
    programme: { az: 'Latın · Yetkinlər, Gənclər', en: 'Latin · Adults, Youth' },
    scope: 'international',
    status: 'open'
  },
  {
    id: 'ganja-youth-cup-2026',
    day: '19',
    month: { az: 'Sent', en: 'Sep' },
    year: 2026,
    isoDate: '2026-09-19',
    name: { az: 'Gəncə Gənclər Kuboku', en: 'Ganja Youth Cup' },
    note: { az: 'Regional mərhələ · uşaqlardan gənclərə', en: 'Regional stage · juvenile to youth' },
    venue: { az: 'Gəncə Olimpiya Kompleksi', en: 'Ganja Olympic Complex' },
    programme: { az: 'Standard · E–B', en: 'Standard · E–B' },
    scope: 'regional',
    status: 'planned'
  },
  {
    id: 'formation-championship-2026',
    day: '07',
    month: { az: 'Noy', en: 'Nov' },
    year: 2026,
    isoDate: '2026-11-07',
    name: { az: 'Milli Ansambl Çempionatı', en: 'National Formation Championship' },
    note: { az: 'Səkkiz cütlükdən ibarət komandalar', en: 'Teams of eight couples' },
    venue: { az: 'Heydər Əliyev İdman Sarayı', en: 'Heydar Aliyev Sports Palace' },
    programme: { az: 'Formation Standard / Latın', en: 'Formation Standard / Latin' },
    scope: 'national',
    status: 'planned'
  },
  {
    id: 'winter-open-2026',
    day: '08',
    month: { az: 'Fev', en: 'Feb' },
    year: 2026,
    isoDate: '2026-02-08',
    name: { az: 'Qış Open', en: 'Winter Open' },
    note: { az: 'Keçirilib · 142 cütlük', en: 'Completed · 142 couples' },
    venue: { az: 'Bakı, Nizami r.', en: 'Baku, Nizami district' },
    programme: { az: 'Latın · Gənclər', en: 'Latin · Youth' },
    scope: 'regional',
    status: 'done'
  }
];
