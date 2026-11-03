import type { Localized } from '@/types';

/** DEMO DATA — headline figures for the layout. */
export const federationStats: { value: Localized; label: Localized }[] = [
  { value: { az: '42', en: '42' }, label: { az: 'Akkreditə klub', en: 'Accredited clubs' } },
  { value: { az: '1 280', en: '1 280' }, label: { az: 'Qeydiyyatlı idmançı', en: 'Registered athletes' } },
  { value: { az: '18', en: '18' }, label: { az: '2026-da milli yarış', en: 'National events in 2026' } },
  { value: { az: '11', en: '11' }, label: { az: 'Şəhər', en: 'Cities' } }
];

export const federationFacts: { label: Localized; value: Localized }[] = [
  { label: { az: 'Təsis', en: 'Founded' }, value: { az: '2012', en: '2012' } },
  { label: { az: 'İdarə heyəti', en: 'Board term' }, value: { az: '2024 — 2028', en: '2024 — 2028' } },
  { label: { az: 'Komissiyalar', en: 'Commissions' }, value: { az: '4 daimi', en: '4 standing' } }
];

export const membershipTracks: { title: Localized; body: Localized; cta: Localized }[] = [
  {
    title: { az: 'İdmançı', en: 'Athlete' },
    body: {
      az: 'Yarış lisenziyası, reytinq xalları və bütün milli yarışlara giriş. Klub üzvlüyü və tibbi arayış tələb olunur.',
      en: 'Competition licence, ranking points and entry to all national events. Requires club affiliation and a medical certificate.'
    },
    cta: { az: 'Tələblər →', en: 'Requirements →' }
  },
  {
    title: { az: 'Məşqçi', en: 'Coach' },
    body: {
      az: 'I–III səviyyə sertifikatlaşdırma, seminarlara giriş və cütlükləri federasiya yarışlarına yazdırmaq hüququ.',
      en: 'Certification at levels I–III, access to seminars and the right to enter couples in federation competitions.'
    },
    cta: { az: 'Səviyyələr →', en: 'Levels →' }
  },
  {
    title: { az: 'Hakim', en: 'Adjudicator' },
    body: {
      az: 'İmtahandan sonra milli hakim lisenziyası; hər iki mövsümdən bir təkmilləşdirmə seminarı ilə yenilənmə.',
      en: 'National adjudicator licence after the examination; renewal every two seasons with a refresher seminar.'
    },
    cta: { az: 'İmtahan →', en: 'Examination →' }
  },
  {
    title: { az: 'Klub', en: 'Club' },
    body: {
      az: 'Hüquqi şəxslər üçün akkreditasiya: sertifikatlı məşqçi heyəti, meydança tələblərinə uyğun zal və illik hesabat.',
      en: 'Accreditation for legal entities: certified coaching staff, a hall that meets the floor requirements and annual reporting.'
    },
    cta: { az: 'Akkreditasiya →', en: 'Accreditation →' }
  }
];

export const partners: { name: Localized; role: Localized }[] = [
  { name: { az: 'WDSF', en: 'WDSF' }, role: { az: 'Beynəlxalq qaydalar', en: 'International rules' } },
  { name: { az: 'Tərəfdaş', en: 'Partner' }, role: { az: 'Yer ayrılıb', en: 'Slot reserved' } },
  { name: { az: 'Sponsor', en: 'Sponsor' }, role: { az: 'Yer ayrılıb', en: 'Slot reserved' } },
  { name: { az: 'Media', en: 'Media' }, role: { az: 'Yer ayrılıb', en: 'Slot reserved' } },
  { name: { az: 'Klub şəbəkəsi', en: 'Club network' }, role: { az: 'Yer ayrılıb', en: 'Slot reserved' } }
];
