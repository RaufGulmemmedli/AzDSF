'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '@/data/heroSlides';
import { pick } from '@/types';

/** How long a frame holds before the next one fades in. */
const INTERVAL = 6500;

/**
 * Full-bleed photo slider behind the hero copy. It replaces the hand-drawn
 * canvas stage (`BallroomStageBackground`), so it keeps the `data-hero="bg"`
 * hook the GSAP intro and parallax in `Hero` animate.
 *
 * The controls are a separate layer above the copy — the picture layer is
 * parallaxed and must not drag the buttons with it.
 */
export default function HeroSlider() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const reduced = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Only the frames that have been reached are put in the DOM, so the first
  // paint downloads one photograph instead of five.
  const [mounted, setMounted] = useState<number[]>([0]);

  const count = heroSlides.length;
  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    setMounted((current) => {
      const wanted = [index, (index + 1) % count].filter((i) => !current.includes(i));
      return wanted.length ? [...current, ...wanted] : current;
    });
  }, [index, count]);

  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced, paused, count]);

  return (
    <>
      <div
        data-hero="bg"
        className="absolute inset-0 z-0"
        role="group"
        aria-roledescription="carousel"
        aria-label={t('sliderLabel')}
      >
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== index}
            className={`absolute inset-0 ${
              reduced ? '' : 'transition-opacity duration-1000 ease-swift'
            } ${i === index ? 'opacity-100' : 'opacity-0'}`}
          >
            {mounted.includes(i) ? (
              <Image
                src={slide.image}
                alt={pick(slide.alt, locale)}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: slide.focus }}
              />
            ) : null}
          </div>
        ))}

        {/*
          No tint over the photograph — it is shown as it is. The hero copy
          stays readable through the drop shadows set on it in `Hero`.
        */}
      </div>

      {count > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3]">
          <div className="wrap flex justify-center pb-3 lg:justify-end lg:pb-5">
            <div
              className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/20 bg-navy-950/60 px-2 py-1.5 backdrop-blur-md"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label={t('sliderPrevious')}
                className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <ChevronLeft size={15} aria-hidden="true" />
              </button>

              <div className="flex items-center gap-1.5 px-1">
                {heroSlides.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={t('sliderGoTo', { number: i + 1 })}
                    aria-current={i === index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-5 bg-mag' : 'w-1.5 bg-white/45 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label={t('sliderNext')}
                className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <ChevronRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
