import type { CompetitionResult, Localized, RankingRow } from '@/types';

/** DEMO DATA — couple names, clubs and points are sample entries, not a real registry. */

export type RankingTable = {
  id: string;
  tab: Localized;
  rows: RankingRow[];
};

export const rankingTables: RankingTable[] = [
  {
    id: 'adults-latin',
    tab: { az: 'Yetkinlər Latın', en: 'Adults Latin' },
    rows: [
      {
        position: 1,
        couple: 'Rəşad Əliyev / Nigar Hüseynova',
        club: { az: 'Elegance, Bakı', en: 'Elegance, Baku' },
        danceClass: 'S',
        points: 1240,
        delta: 0
      },
      {
        position: 2,
        couple: 'Tural Məmmədov / Aysel Quliyeva',
        club: { az: 'Rhythm, Bakı', en: 'Rhythm, Baku' },
        danceClass: 'S',
        points: 1185,
        delta: 1
      },
      {
        position: 3,
        couple: 'Kamran Səfərov / Lalə İsmayılova',
        club: { az: 'Vals, Sumqayıt', en: 'Vals, Sumqayit' },
        danceClass: 'A',
        points: 1072,
        delta: -1
      },
      {
        position: 4,
        couple: 'Orxan Babayev / Günel Rzayeva',
        club: { az: 'Step Up, Bakı', en: 'Step Up, Baku' },
        danceClass: 'A',
        points: 964,
        delta: 2
      },
      {
        position: 5,
        couple: 'Elvin Cəfərov / Səbinə Allahverdiyeva',
        club: { az: 'Harmony, Gəncə', en: 'Harmony, Ganja' },
        danceClass: 'B',
        points: 918,
        delta: 0
      },
      {
        position: 6,
        couple: 'Nicat Əhmədov / Fidan Məmmədli',
        club: { az: 'Tempo, Bakı', en: 'Tempo, Baku' },
        danceClass: 'B',
        points: 870,
        delta: -2
      }
    ]
  },
  {
    id: 'adults-standard',
    tab: { az: 'Yetkinlər Standard', en: 'Adults Standard' },
    rows: [
      {
        position: 1,
        couple: 'Murad Həsənov / Zeynəb Kərimova',
        club: { az: 'Elegance, Bakı', en: 'Elegance, Baku' },
        danceClass: 'S',
        points: 1196,
        delta: 1
      },
      {
        position: 2,
        couple: 'Fərid Nəsirov / Aytən Vəliyeva',
        club: { az: 'Grand, Bakı', en: 'Grand, Baku' },
        danceClass: 'S',
        points: 1154,
        delta: -1
      },
      {
        position: 3,
        couple: 'Ramil Qasımov / Nərmin Şirinova',
        club: { az: 'Vals, Sumqayıt', en: 'Vals, Sumqayit' },
        danceClass: 'A',
        points: 1008,
        delta: 0
      },
      {
        position: 4,
        couple: 'Samir Xəlilov / Ülviyyə Hacıyeva',
        club: { az: 'Harmony, Gəncə', en: 'Harmony, Ganja' },
        danceClass: 'A',
        points: 942,
        delta: 3
      },
      {
        position: 5,
        couple: 'Anar İbrahimov / Leyla Abbasova',
        club: { az: 'Tempo, Bakı', en: 'Tempo, Baku' },
        danceClass: 'B',
        points: 889,
        delta: 0
      },
      {
        position: 6,
        couple: 'Vüqar Sultanov / Günay Əsgərova',
        club: { az: 'Step Up, Bakı', en: 'Step Up, Baku' },
        danceClass: 'B',
        points: 841,
        delta: -2
      }
    ]
  }
];

/**
 * REAL RESULTS — official protocol of the Azerbaijan National Championship
 * (Azərbaycan Birinciliyi və Azərbaycan Çempionatı). Keep names and birth years
 * exactly as published; add further age groups and programmes as their protocols
 * arrive. A category without a `title` is one combined placing table.
 */
export const competitionResults: CompetitionResult[] = [
  {
    id: 'azerbaijan-championship-junior-2',
    competition: {
      az: 'Azərbaycan Birinciliyi və Azərbaycan Çempionatı',
      en: 'Azerbaijan National Championship'
    },
    ageGroup: { az: 'Yunior 2', en: 'Junior II' },
    categories: [
      {
        id: 'latin',
        title: { az: 'Latın', en: 'Latin' },
        placements: [
          {
            position: 1,
            partners: [
              { name: 'Səfərli Kərim', born: 2016 },
              { name: 'Əsqərzadə Banu', born: 2014 }
            ]
          },
          {
            position: 2,
            partners: [
              { name: 'Cəbrayılov İlyas', born: 2012 },
              { name: 'Əliyeva Fatimə', born: 2011 }
            ]
          },
          {
            position: 3,
            partners: [
              { name: 'Konopelkin Daniil', born: 2014 },
              { name: 'Hüseynova Züleyxa', born: 2012 }
            ]
          }
        ]
      },
      {
        id: 'standard',
        title: { az: 'Avropa Standart rəqsləri', en: 'European Standard' },
        placements: [
          {
            position: 1,
            partners: [
              { name: 'Səfərli Kərim', born: 2016 },
              { name: 'Əsqərzadə Banu', born: 2014 }
            ]
          },
          {
            position: 2,
            partners: [
              { name: 'Konopelkin Daniil', born: 2014 },
              { name: 'Hüseynova Züleyxa', born: 2012 }
            ]
          },
          {
            position: 3,
            partners: [
              { name: 'Cəbrayılov İlyas', born: 2012 },
              { name: 'Əliyeva Fatimə', born: 2011 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'azerbaijan-championship-junior-1',
    competition: {
      az: 'Azərbaycan Birinciliyi və Azərbaycan Çempionatı',
      en: 'Azerbaijan National Championship'
    },
    ageGroup: { az: 'Yunior 1', en: 'Junior I' },
    categories: [
      {
        id: 'overall',
        placements: [
          {
            position: 1,
            partners: [
              { name: 'Hüseynov Murad', born: 2014 },
              { name: 'Meneyeva Viktoriya', born: 2015 }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'azerbaijan-championship-juvenile-2',
    competition: {
      az: 'Azərbaycan Birinciliyi və Azərbaycan Çempionatı',
      en: 'Azerbaijan National Championship'
    },
    ageGroup: { az: 'Yuvenal 2', en: 'Juvenile II' },
    categories: [
      {
        id: 'overall',
        placements: [
          {
            position: 2,
            partners: [
              { name: 'Zinin Daniil', born: 2015 },
              { name: 'Əsqərzadə Zeynəb', born: 2016 }
            ]
          }
        ]
      }
    ]
  }
];
