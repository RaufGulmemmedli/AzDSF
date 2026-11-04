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

/** One dancer of a placed couple; `born` is the birth year printed on the protocol. */
export type ResultPartner = {
  name: string;
  born: number;
};

export type ResultPlacement = {
  position: number;
  partners: ResultPartner[];
};

/** One programme of one age group, as published in the competition protocol. */
export type ResultCategory = {
  id: string;
  /** Programme name — omitted when the protocol publishes one combined placing table. */
  title?: Localized;
  placements: ResultPlacement[];
};

export type CompetitionResult = {
  id: string;
  competition: Localized;
  ageGroup: Localized;
  categories: ResultCategory[];
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
  /** Couple, trio or solo dancer, exactly as the federation lists them. */
  name: string;
  /** Age group / programme / placing — omitted while it is still unknown. */
  detail?: Localized;
  badge?: Localized;
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
