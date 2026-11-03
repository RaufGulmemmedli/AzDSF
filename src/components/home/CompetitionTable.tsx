'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { competitions } from '@/data/competitions';
import { pick } from '@/types';
import type { CompetitionScope, CompetitionStatus } from '@/types';

type Filter = 'all' | CompetitionScope;

const STATUS_STYLE: Record<CompetitionStatus, string> = {
  open: 'text-ok bg-ok/10',
  soon: 'text-warn bg-warn/10',
  planned: 'text-ink-2 bg-surface-2',
  done: 'text-ink-3 bg-surface'
};

export default function CompetitionTable() {
  const t = useTranslations('Competitions');
  const locale = useLocale();
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t('filterAll') },
    { id: 'national', label: t('filterNational') },
    { id: 'international', label: t('filterInternational') },
    { id: 'regional', label: t('filterRegional') }
  ];

  const statusLabel: Record<CompetitionStatus, string> = {
    open: t('statusOpen'),
    soon: t('statusSoon'),
    planned: t('statusPlanned'),
    done: t('statusDone')
  };

  const rows = competitions.filter((c) => filter === 'all' || c.scope === filter);

  return (
    <>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label={t('filterLabel')}>
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-4 py-1.5 font-display text-[0.82rem] font-semibold transition-all ${
              filter === f.id
                ? 'border-navy-700 bg-navy-700 text-white shadow-sm'
                : 'border-line-2 bg-white text-navy-800 hover:border-navy-300 hover:bg-navy-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-sm">
        {rows.length === 0 ? (
          <p className="px-5 py-8 text-center text-[0.9rem] text-ink-2">{t('empty')}</p>
        ) : (
          rows.map((row) => (
            <article
              key={row.id}
              className="grid grid-cols-[84px_minmax(0,1fr)] items-center gap-x-4 gap-y-2.5 border-b border-line px-5 py-4.5 transition-colors last:border-b-0 hover:bg-surface/70 lg:grid-cols-[96px_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.9fr)_130px] lg:gap-x-[1.2rem] lg:px-6"
            >
              <div className="row-span-4 self-start rounded-lg bg-navy-50 px-2 py-2.5 text-center border border-navy-100 lg:row-span-1 lg:mr-[-0.2rem] lg:self-center lg:rounded-none lg:border-0 lg:border-r lg:border-line lg:bg-transparent lg:px-0 lg:pr-4">
                <b className="block font-display text-[1.65rem] font-extrabold leading-none text-navy-700">
                  {row.day}
                </b>
                <span className="mt-1 block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-navy-600">
                  {pick(row.month, locale)} {row.year}
                </span>
              </div>

              <h3 className="font-display text-[1.05rem] font-bold leading-snug text-navy-950">
                {pick(row.name, locale)}
                <small className="mt-1 block font-sans text-[0.78rem] font-normal text-ink-3">
                  {pick(row.note, locale)}
                </small>
              </h3>

              <p className="text-[0.82rem] text-ink-2">
                <b className="mb-0.5 block font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-navy-700">
                  {t('labelVenue')}
                </b>
                {pick(row.venue, locale)}
              </p>

              <p className="text-[0.82rem] text-ink-2">
                <b className="mb-0.5 block font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] text-navy-700">
                  {t('labelProgramme')}
                </b>
                {pick(row.programme, locale)}
              </p>

              <div>
                <span
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.06em] ${STATUS_STYLE[row.status]}`}
                >
                  <i className="h-1.5 w-1.5 flex-none rounded-full bg-current" aria-hidden="true" />
                  {statusLabel[row.status]}
                </span>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
}
