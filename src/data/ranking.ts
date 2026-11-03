import type { Localized, RankingRow, ResultRow } from '@/types';

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

export const recentResults: ResultRow[] = [
  {
    competition: { az: 'Qış Open', en: 'Winter Open' },
    date: '08.02.2026',
    category: { az: 'Gənclər · Latın', en: 'Youth · Latin' },
    couples: 142,
    winner: 'Elvin Cəfərov / Səbinə Allahverdiyeva'
  },
  {
    competition: { az: 'Klub Liqası I', en: 'Club League I' },
    date: '24.01.2026',
    category: { az: 'Uşaqlar · Standard', en: 'Juvenile · Standard' },
    couples: 96,
    winner: 'Nihad Əliyev / Mələk Quliyeva'
  },
  {
    competition: { az: 'Payız Kuboku', en: 'Autumn Cup' },
    date: '15.11.2025',
    category: { az: 'Yetkinlər · Latın', en: 'Adults · Latin' },
    couples: 118,
    winner: 'Rəşad Əliyev / Nigar Hüseynova'
  },
  {
    competition: { az: 'Regional Turnir', en: 'Regional Tournament' },
    date: '27.09.2025',
    category: { az: 'Yeniyetmələr · Standard', en: 'Junior · Standard' },
    couples: 74,
    winner: 'Ramil Qasımov / Nərmin Şirinova'
  },
  {
    competition: { az: 'Mövsüm Açılışı', en: 'Season Opening' },
    date: '13.09.2025',
    category: { az: 'Yetkinlər · Standard', en: 'Adults · Standard' },
    couples: 103,
    winner: 'Murad Həsənov / Zeynəb Kərimova'
  }
];
