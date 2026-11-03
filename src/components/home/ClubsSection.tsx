'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { cities } from '@/data/clubs';
import { pick } from '@/types';

export default function ClubsSection() {
  const t = useTranslations('Clubs');
  const locale = useLocale();
  const [selected, setSelected] = useState<string | null>(null);

  const city = cities.find((c) => c.id === selected) ?? null;

  return (
    <section className="band bg-white" id="klublar" aria-labelledby="club-h">
      <div className="wrap">
        <div className="grid items-center gap-[clamp(2rem,3.6vw,3.6rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 className="h2 text-navy-950" id="club-h">
              {t('title')}
            </h2>
            <p className="lead mt-4 text-[0.96rem]">{t('lead')}</p>

            <p
              className="mt-5 min-h-[3.2rem] rounded-r-xl border-l-4 border-navy-700 bg-navy-50/70 p-4 text-[0.9rem] text-navy-900 border-y border-r border-navy-100/80 shadow-sm"
              role="status"
            >
              {city
                ? t('detail', {
                    city: pick(city.name, locale),
                    clubs: city.clubs,
                    coaches: city.coaches,
                    halls: city.halls
                  })
                : t('hint')}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#uzvluk" className="btn btn-navy btn-sm">
                {t('accreditation')}
              </Link>
              <Link href="/#elaqe" className="btn btn-out btn-sm">
                {t('register')}
              </Link>
            </div>
          </div>

          <div
            className="grid gap-2 sm:grid-cols-2 rounded-xl border border-line bg-surface p-3 shadow-sm"
            role="group"
            aria-label={t('cityListLabel')}
          >
            {cities.map((item) => {
              const active = item.id === selected;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(item.id)}
                  className={`flex w-full items-center justify-between gap-3.5 rounded-lg border px-4 py-3.5 text-left transition-all ${
                    active
                      ? 'border-navy-700 bg-navy-700 text-white shadow-sm'
                      : 'border-line/70 bg-white text-navy-900 hover:border-navy-300 hover:bg-navy-50/50'
                  }`}
                >
                  <b className="font-display text-[0.94rem] font-semibold">{pick(item.name, locale)}</b>
                  <span className={`font-mono text-[0.74rem] font-semibold ${active ? 'text-mag-100' : 'text-navy-600'}`}>
                    {item.clubs} {locale === 'en' ? 'clubs' : 'klub'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
