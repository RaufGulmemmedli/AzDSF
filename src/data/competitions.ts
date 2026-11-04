import type { Competition } from '@/types';

/**
 * The first four entries are REAL announced federation events (posters + press
 * releases supplied by AzDSF) — keep their dates, venues and programmes accurate.
 * Everything after the `DEMO DATA` marker is fabricated placeholder content.
 * Replace the whole array with the API response once the calendar endpoint exists.
 */
export const competitions: Competition[] = [
  {
    id: 'caspian-breaking-battle-2026',
    day: '08',
    month: { az: 'Noy', en: 'Nov' },
    year: 2026,
    isoDate: '2026-11-08',
    name: { az: 'Caspian Breaking Battle', en: 'Caspian Breaking Battle' },
    note: {
      az: 'Zəfər Günü turniri · 12:00–15:30',
      en: 'Victory Day tournament · 12:00–15:30'
    },
    venue: { az: 'Nərgiz Mall, 3-cü mərtəbə, Bakı', en: 'Nargiz Mall, 3rd floor, Baku' },
    programme: { az: 'Breykinq · B-Boy / B-Girl battle', en: 'Breaking · B-Boy / B-Girl battles' },
    scope: 'national',
    status: 'open'
  },
  {
    id: 'turkic-world-2026',
    day: '15',
    month: { az: 'Noy', en: 'Nov' },
    year: 2026,
    isoDate: '2026-11-15',
    name: {
      az: 'Türk Dünyası – 2026 İdman Rəqsləri Müsabiqəsi',
      en: 'Turkic World – 2026 DanceSport Games'
    },
    note: {
      az: '«Eyni kök, daha güclü sabah» · 6 ölkə',
      en: '“Same roots, a stronger tomorrow” · 6 countries'
    },
    venue: { az: 'Sea Breeze, Bakı', en: 'Sea Breeze, Baku' },
    programme: {
      az: 'Latın · Samba, Rumba, Ça-ça-ça, Paso Doble, Jive',
      en: 'Latin · Samba, Rumba, Cha-cha-cha, Paso Doble, Jive'
    },
    scope: 'international',
    status: 'open'
  },
  {
    id: 'ensemble-national-dance-championship-2026',
    day: '06',
    month: { az: 'Dek', en: 'Dec' },
    year: 2026,
    isoDate: '2026-12-06',
    name: {
      az: 'Ansamblların Milli Rəqs Çempionatı 2026',
      en: 'National Dance Championship for Ensembles 2026'
    },
    note: {
      az: 'Tarixdə ilk dəfə · 1 noyabr – 6 dekabr, Qala gecəsi 6 dekabr',
      en: 'First edition · 1 Nov – 6 Dec, gala night 6 Dec'
    },
    venue: { az: 'Bakı', en: 'Baku' },
    programme: { az: 'Milli rəqs · ansambllar', en: 'National dance · ensembles' },
    scope: 'national',
    status: 'planned'
  },
  {
    id: 'breaking-national-championship-2026',
    day: '13',
    month: { az: 'Dek', en: 'Dec' },
    year: 2026,
    isoDate: '2026-12-13',
    name: {
      az: 'Breykinq üzrə Ölkə Birinciliyi və Çempionatı',
      en: 'National Breaking Championship'
    },
    note: {
      az: '«Move & Spin Breaking Battle» · 12:00–17:00',
      en: '“Move & Spin Breaking Battle” · 12:00–17:00'
    },
    venue: {
      az: 'Crescent Mall, Neftçilər pr. 151, Xətai r., Bakı',
      en: 'Crescent Mall, 151 Neftchilar Ave, Khatai, Baku'
    },
    programme: { az: 'Breykinq · B-Boy / B-Girl', en: 'Breaking · B-Boy / B-Girl' },
    scope: 'national',
    status: 'open'
  },

  /* ---- DEMO DATA — not announced federation competitions ---- */
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
