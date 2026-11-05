'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@/i18n/routing';
// The hand-drawn canvas stage is kept for reference; the hero now runs a photo
// slider instead — swap these two lines (and the block in the markup) to go back.
// import BallroomStageBackground from '@/components/home/BallroomStageBackground';
import HeroSlider from '@/components/home/HeroSlider';
import type { Competition } from '@/types';

export default function Hero({ next }: { next?: Competition }) {
  const t = useTranslations('Hero');
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' }, delay: 0.08 })
        .fromTo('[data-hero="bg"]', { opacity: 0 }, { opacity: 1, duration: 1.1 })
        .fromTo('[data-hero="eyebrow"]', { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.6 }, '-=0.8')
        .fromTo('[data-hero="line"]', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.09 }, '-=0.45')
        .fromTo('[data-hero="sub"]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65 }, '-=0.45')
        .fromTo('[data-hero="cta"]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.35');

      gsap.to('[data-hero="bg"]', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.5 }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    /*
      The box carries the photographs' own 16:9 shape from `lg` up, so a slide
      is shown practically whole instead of being cropped to a letterbox strip.
      Below that the copy decides the height — a phone is far too narrow for
      16:9 to leave room for it.

      `w-full` is load-bearing: with an `auto` width, `max-h` plus `aspect-ratio`
      makes the browser shrink the WIDTH to keep the ratio, which left a gap down
      the right-hand side of the page. A definite width lets the cap clip the
      height instead, which is what it is for.
    */
    <section
      ref={root}
      className="relative flex w-full min-h-[540px] items-center overflow-hidden bg-navy-950 text-white sm:min-h-[580px] lg:aspect-[16/9] lg:max-h-[1040px] lg:min-h-[620px]"
      aria-labelledby="hero-h"
    >
      {/*
        3D Ballroom & Breaking Stage Background Canvas — replaced by the photo
        slider below. `HeroSlider` carries the same `data-hero="bg"` hook, so the
        GSAP intro and parallax above keep working either way.

        <div data-hero="bg" className="absolute inset-0 z-0">
          <BallroomStageBackground />
        </div>
      */}
      <HeroSlider />

      <div className="wrap relative z-[2] w-full py-[clamp(50px,6vw,80px)]">
        {/*
          Nothing tints the photograph any more, so every piece of copy carries
          its own shadow to stay readable over a bright frame.
        */}
        <div className="max-w-[min(100%,640px)] [text-shadow:0_1px_2px_rgba(9,23,43,0.95),0_2px_16px_rgba(9,23,43,0.9),0_10px_44px_rgba(9,23,43,0.7)]">
          <div
            data-hero="eyebrow"
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-navy-950/55 px-3.5 py-1 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-mag shadow-[0_0_8px_#ED018A]" />
            <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white">
              {t('eyebrow')}
            </span>
          </div>

          <h1 className="h1 text-white" id="hero-h">
            <span data-hero="line" className="inline-block">
              {t('titleA')}
            </span>{' '}
            <span data-hero="line" className="inline-block text-mag">
              {t('titleB')}
            </span>
          </h1>
          <p data-hero="sub" className="mt-5 max-w-[54ch] text-[clamp(1rem,1.25vw,1.15rem)] font-medium leading-[1.7] text-white">
            {t('subtitle')}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link data-hero="cta" href="/competitions" className="btn btn-mag">
              {t('ctaCalendar')}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link data-hero="cta" href="/#uzvluk" className="btn btn-on-dark">
              {t('ctaJoin')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
