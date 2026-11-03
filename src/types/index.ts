import type { Locale } from '@/i18n/routing';

/** A string that exists in both site languages. Mock data carries these directly. */
export type Localized = { az: string; en: string };

export function pick(value: Localized, locale: string): string {
  return value[(locale as Locale) ?? 'az'] ?? value.az;
}

/** Palette key for the generated cover composition — see src/lib/paintVisual.ts */
export type VisualMode = 'hero' | 'brand' | 'mag' | 'light';

export type CompetitionStatus = 'open' | 'soon' | 'planned' | 'done';
export type CompetitionScope = 'national' | 'international' | 'regional';

export type Competition = {
  id: string;
  day: string;
  month: Localized;
  year: number;
  isoDate: string;
  name: Localized;
  note: Localized;
  venue: Localized;
  programme: Localized;
  scope: CompetitionScope;
  status: CompetitionStatus;
};

export type Discipline = {
  id: string;
  tab: Localized;
  title: Localized;
  body: Localized;
  dances: Localized[];
  facts: { label: Localized; value: Localized }[];
  /** Photograph under `/public`; the generated composition is used when absent. */
  image?: string;
  seed: number;
  mode: VisualMode;
};

export type RankingRow = {
  position: number;
  couple: string;
  club: Localized;
  danceClass: string;
  points: number;
  delta: number;
};

export type ResultRow = {
  competition: Localized;
  date: string;
  category: Localized;
  couples: number;
  winner: string;
};

export type NewsItem = {
  id: string;
  category: Localized;
  date: string;
  isoDate: string;
  title: Localized;
  excerpt: Localized;
  /** Photograph under `/public`; the generated composition is used when absent. */
  image?: string;
  seed: number;
  mode: VisualMode;
};

export type Athlete = {
  id: string;
  couple: string;
  detail: Localized;
  badge: Localized;
  /** Photograph under `/public`; the generated composition is used when absent. */
  image?: string;
  seed: number;
  mode: VisualMode;
};

export type City = {
  id: string;
  name: Localized;
  clubs: number;
  coaches: number;
  halls: number;
};

export type GalleryItem = {
  id: string;
  caption: Localized;
  kind: 'photo' | 'video';
  /** Photograph under `/public`; the generated composition is used when absent. */
  image?: string;
  seed: number;
  mode: VisualMode;
  span: string;
};
