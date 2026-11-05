import type { HeroSlide } from '@/types';

/**
 * Home-page hero slider. The photographs live in `public/slider`; drop a file
 * in there and add an entry here to extend the sequence.
 *
 * `focus` matters more than usual: the hero box is roughly 2.7:1 while the
 * sources are 1.79:1 (and one is portrait), so each frame loses between a third
 * and three quarters of its height. Centred, that crop lands on the dancers'
 * heads — the values below keep faces in frame and push the subject towards the
 * right half, clear of the headline.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: 'latin-championship',
    image: '/slider/latin_dancers_championship_landscape_png_1793861256426.jpg',
    alt: {
      az: 'Latın proqramı — yarış meydançasında cütlük, tribunalar arxa planda',
      en: 'Latin programme — a couple on the competition floor, stands behind'
    },
    focus: '62% 26%'
  },
  {
    id: 'breaking-freeze',
    image: '/slider/bboy_freeze_urban_3b_png_1793867166299.jpg',
    alt: {
      az: 'Breykinq — b-boy tək əl üstündə friz edir, izləyicilər meydança ətrafında',
      en: 'Breaking — a b-boy holds a one-hand freeze, the crowd around the floor'
    },
    focus: '55% 22%'
  },
  {
    id: 'standard-hall',
    image: '/slider/latin_couple_cream_1a_png_1793866983761.jpg',
    alt: {
      az: 'Standard proqramı — klassik zalda cütlük, qaldırılmış əllər',
      en: 'Standard programme — a couple in a classical hall, hands raised'
    },
    focus: '62% 14%'
  },
  {
    id: 'national-dance',
    image: '/slider/azerbaijani_duo_dance_1793869515961.jpg',
    alt: {
      az: 'Milli rəqs — teatr səhnəsində milli geyimdə cütlük',
      en: 'National dance — a couple in national costume on a theatre stage'
    },
    focus: '52% 28%'
  },
  {
    id: 'breaking-blue',
    image: '/slider/bboy_cyan_blue_stage.jpg',
    alt: {
      az: 'Breykinq — mavi səhnə işığında b-boy çıxışı',
      en: 'Breaking — a b-boy performing under blue stage light'
    },
    focus: '68% 45%'
  }
];
