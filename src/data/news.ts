import type { NewsItem } from '@/types';

/** DEMO DATA — sample newsroom entries for the layout. */
export const news: NewsItem[] = [
  {
    id: 'calendar-2026',
    category: { az: 'Rəsmi', en: 'Official' },
    date: '12.02.2026',
    isoDate: '2026-02-12',
    title: {
      az: '2026 yarış təqvimi dərc olundu: altı şəhərdə 18 milli yarış',
      en: 'The 2026 competition calendar is published: 18 national events across six cities'
    },
    excerpt: {
      az: 'Təqvim milli çempionatın, regional mərhələlərin və reytinq turnirlərinin tarixlərini, habelə akkreditə olunmuş klublar üçün qeydiyyat pəncərələrini müəyyən edir.',
      en: 'The calendar sets the dates of the national championship, the regional stages and the ranking tournaments, together with the entry windows for accredited clubs.'
    },
    image: '/img/latin-kick.png',
    seed: 11,
    mode: 'brand'
  },
  {
    id: 'seminar-2026',
    category: { az: 'Təhsil', en: 'Education' },
    date: '04.02.2026',
    isoDate: '2026-02-04',
    title: {
      az: 'Hakim və məşqçi seminarı üçün qeydiyyat açıldı',
      en: 'Registration opens for the adjudicator and coach seminar'
    },
    excerpt: {
      az: 'Qiymətləndirmə meyarları, meydançadan istifadə və skating sistemi üzrə iki gün.',
      en: 'Two days on judging criteria, floorcraft assessment and the skating system.'
    },
    image: '/img/academy-studio-class.png',
    seed: 12,
    mode: 'mag'
  },
  {
    id: 'accreditation-rules',
    category: { az: 'Qaydalar', en: 'Regulations' },
    date: '21.01.2026',
    isoDate: '2026-01-21',
    title: {
      az: 'Rəqs klubları üçün yeni akkreditasiya qaydaları qüvvəyə mindi',
      en: 'New accreditation rules for dance clubs come into force'
    },
    excerpt: {
      az: 'Klublar müraciətlə birlikdə məşqçi sertifikatını və zal göstəricilərini təqdim etməlidir.',
      en: 'Clubs must submit coach certification and hall specifications with the application.'
    },
    image: '/img/tango-ballroom.png',
    seed: 13,
    mode: 'brand'
  },
  {
    id: 'winter-camp',
    category: { az: 'Milli komanda', en: 'National team' },
    date: '09.01.2026',
    isoDate: '2026-01-09',
    title: {
      az: 'Bakıda 24 cütlüyün iştirakı ilə qış təlim-məşq toplanışı keçirildi',
      en: 'Winter training camp held in Baku with 24 couples'
    },
    excerpt: {
      az: 'Texnika, xoreoqrafiya və yarışa hazırlıq üzrə altı gün.',
      en: 'Six days of technique, choreography and competition preparation.'
    },
    image: '/img/class-studio.png',
    seed: 14,
    mode: 'mag'
  }
];
