import type { GalleryItem } from '@/types';

/**
 * Captions describe what each photograph actually shows — keep them in step
 * when an `image` is swapped. `span` is the Tailwind grid placement on the
 * asymmetric desktop grid.
 */
export const gallery: GalleryItem[] = [
  {
    id: 'final-round',
    caption: {
      az: 'Azərbaycan Çempionatı · final turu',
      en: 'Azerbaijan Championship · final round'
    },
    kind: 'photo',
    image: '/img/ballroom-competitors.png',
    seed: 51,
    mode: 'brand',
    span: 'col-span-2 md:col-span-3 aspect-[16/10]'
  },
  {
    id: 'stage-light',
    caption: { az: 'Latın proqramı · səhnə işığı', en: 'Latin programme · stage light' },
    kind: 'photo',
    image: '/img/latin-curtain-call.png',
    seed: 52,
    mode: 'mag',
    span: 'col-span-2 md:col-span-3 aspect-[16/10]'
  },
  {
    id: 'opening-performance',
    caption: {
      az: 'Açılış çıxışı · milli rəqs ansamblı',
      en: 'Opening performance · national dance ensemble'
    },
    kind: 'video',
    image: '/img/traditional-performance.png',
    seed: 53,
    mode: 'brand',
    span: 'col-span-1 md:col-span-2 aspect-square md:aspect-[4/3]'
  },
  {
    id: 'training',
    caption: { az: 'Məşq zalı · səhər seansı', en: 'Training hall · morning session' },
    kind: 'photo',
    image: '/img/class-mural.png',
    focus: '50% 30%',
    seed: 54,
    mode: 'mag',
    span: 'col-span-1 md:col-span-2 aspect-square md:aspect-[4/3]'
  },
  {
    id: 'press-wall',
    caption: { az: 'Mətbuat divarı · yarış öncəsi', en: 'Press wall · before the competition' },
    kind: 'photo',
    image: '/img/ballroom-pose-dramatic.png',
    focus: '50% 5%',
    seed: 55,
    mode: 'brand',
    span: 'col-span-2 aspect-[16/9] md:col-span-2 md:aspect-[4/3]'
  }
];
