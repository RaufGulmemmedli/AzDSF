'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@/i18n/routing';
import BallroomStageBackground from '@/components/home/BallroomStageBackground';
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
        .fromTo('[data-hero="cta"]', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.35')
        .fromTo('[data-hero="fact"]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, '-=0.3')
        .fromTo('[data-hero="stage"]', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.85 }, '-=0.75');

      gsap.to('[data-hero="bg"]', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.5 }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const facts = [
    { label: t('factSeason'), value: t('factSeasonValue') },
    { label: t('factDisciplines'), value: t('factDisciplinesValue') },
    { label: t('factAgeGroups'), value: t('factAgeGroupsValue') },
    { label: t('factClasses'), value: t('factClassesValue') }
  ];

  return (
    <section ref={root} className="relative overflow-hidden bg-navy-950 text-white" aria-labelledby="hero-h">
      {/* 3D Ballroom & Breaking Stage Background Canvas */}
      <div data-hero="bg" className="absolute inset-0 z-0">
        <BallroomStageBackground />
      </div>

      <div className="wrap relative z-[2] pb-[clamp(50px,6.5vw,84px)] pt-[clamp(58px,7vw,92px)]">
        <div className="grid items-center gap-[clamp(2.2rem,4vw,3.8rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          {/* Left Column: Official Federation Headline, Info & Stats */}
          <div>
            <div data-hero="eyebrow" className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-mag shadow-[0_0_8px_#ED018A]" />
              <span className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/95">
                {t('eyebrow')}
              </span>
            </div>

            <h1 className="h1 text-white" id="hero-h">
              <span data-hero="line" className="inline-block">
                {t('titleA')}
              </span>{' '}
              <span data-hero="line" className="inline-block text-mag drop-shadow-[0_2px_16px_rgba(237,1,138,0.3)]">
                {t('titleB')}
              </span>
            </h1>
            <p data-hero="sub" className="mt-5 max-w-[54ch] text-[clamp(1rem,1.25vw,1.15rem)] leading-[1.7] text-on-dark-2">
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

            <dl className="mt-[clamp(2.2rem,3.6vw,3rem)] grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/15 bg-white/10 backdrop-blur-md sm:grid-cols-4 shadow-[0_12px_32px_rgba(0,0,0,0.3)]">
              {facts.map((fact) => (
                <div data-hero="fact" key={fact.label} className="bg-navy-950/70 px-4 py-3.5 transition-colors hover:bg-navy-900/80">
                  <dt className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-navy-300">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-display text-[0.95rem] font-bold leading-snug text-white">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right Column: Pure, Unobstructed 3D Performance Stage */}
          <div data-hero="stage" className="relative min-h-[380px] sm:min-h-[440px] lg:min-h-[520px] pointer-events-none" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
