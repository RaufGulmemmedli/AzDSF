import type { City } from '@/types';

/** DEMO DATA — club, coach and hall counts are sample figures. */
export const cities: City[] = [
  { id: 'baku', name: { az: 'Bakı', en: 'Baku' }, clubs: 18, coaches: 26, halls: 22 },
  { id: 'sumqayit', name: { az: 'Sumqayıt', en: 'Sumqayit' }, clubs: 6, coaches: 9, halls: 7 },
  { id: 'ganja', name: { az: 'Gəncə', en: 'Ganja' }, clubs: 5, coaches: 7, halls: 6 },
  { id: 'mingachevir', name: { az: 'Mingəçevir', en: 'Mingachevir' }, clubs: 3, coaches: 4, halls: 3 },
  { id: 'shaki', name: { az: 'Şəki', en: 'Shaki' }, clubs: 2, coaches: 3, halls: 2 },
  { id: 'lankaran', name: { az: 'Lənkəran', en: 'Lankaran' }, clubs: 2, coaches: 2, halls: 2 },
  { id: 'shirvan', name: { az: 'Şirvan', en: 'Shirvan' }, clubs: 2, coaches: 2, halls: 2 },
  { id: 'nakhchivan', name: { az: 'Naxçıvan', en: 'Nakhchivan' }, clubs: 4, coaches: 5, halls: 4 }
];
