'use client';

import { useLocale, useTranslations } from 'next-intl';
import { CalendarDays, MapPin, Trophy, ArrowRight, FileText, CheckCircle2, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Countdown from '@/components/ui/Countdown';
import { pick } from '@/types';
import type { Competition } from '@/types';

export default function NextCompetitionSection({ next }: { next: Competition }) {
  const t = useTranslations('Hero');
  const tc = useTranslations('Competitions');
  const locale = useLocale();

  return (
    <section className="relative -mt-4 z-10 wrap pb-8 pt-2" aria-labelledby="next-comp-h">
      <div className="overflow-hidden rounded-2xl border border-navy-200/80 bg-white shadow-[0_20px_50px_-12px_rgba(11,23,40,0.18)] transition-all hover:shadow-[0_24px_60px_-10px_rgba(11,23,40,0.22)]">
        {/* Top Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-100 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 px-6 py-3.5 text-white">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mag opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-mag shadow-[0_0_8px_#ED018A]"></span>
            </span>
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white">
              {t('nextCompetition')}
            </span>
            <span className="hidden sm:inline-block text-navy-400">&bull;</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[0.66rem] text-navy-200">
              <CheckCircle2 size={12} className="text-mag" />
              WDSF / AzDSF Rəsmi Turnir
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-mag/20 border border-mag/40 px-3 py-0.5 font-mono text-[0.66rem] font-semibold text-mag">
              {tc('statusOpen')}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid gap-6 p-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-8 lg:p-8">
          {/* Big Date Badge */}
          <div className="flex items-center gap-4 lg:flex-col lg:justify-center lg:border-r lg:border-navy-100 lg:pr-8">
            <div className="flex flex-col items-center justify-center rounded-xl border border-navy-200 bg-gradient-to-b from-navy-50 to-navy-100/60 p-4 min-w-[90px] text-center shadow-inner">
              <span className="font-display text-[2.4rem] font-extrabold leading-none text-navy-900">
                {next.day}
              </span>
              <span className="mt-1 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-mag">
                {pick(next.month, locale)}
              </span>
              <span className="mt-0.5 font-mono text-[0.64rem] font-medium text-navy-600">
                {next.year}
              </span>
            </div>
            <div className="sm:hidden min-w-0">
              <span className="font-display text-lg font-bold text-navy-950">
                {pick(next.name, locale)}
              </span>
              <span className="mt-1 block text-xs text-ink-2">
                {pick(next.venue, locale)}
              </span>
            </div>
          </div>

          {/* Details & Tournament Info */}
          <div className="min-w-0">
            <h2 id="next-comp-h" className="hidden sm:block font-display text-[clamp(1.25rem,2vw,1.65rem)] font-extrabold text-navy-950 leading-tight">
              {pick(next.name, locale)}
            </h2>

            <div className="mt-3 flex flex-wrap gap-y-2 gap-x-5 text-[0.85rem] text-ink-2">
              <span className="inline-flex items-center gap-1.5 font-medium text-navy-900">
                <MapPin size={16} className="text-mag flex-none" />
                {pick(next.venue, locale)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Trophy size={16} className="text-navy-600 flex-none" />
                {pick(next.programme, locale)}
              </span>
              {next.note && (
                <span className="inline-flex items-center gap-1.5 text-navy-700">
                  <CalendarDays size={16} className="text-navy-600 flex-none" />
                  {pick(next.note, locale)}
                </span>
              )}
            </div>

            {/* Countdown Box */}
            <div className="mt-4 max-w-md rounded-lg border border-line bg-surface/80 p-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-navy-700">
                <Clock size={13} className="text-mag" />
                <span>{t('countdownLabel')}</span>
              </div>
              <Countdown
                target={`${next.isoDate}T09:00:00Z`}
                label={t('countdownLabel')}
                units={{
                  days: t('days'),
                  hours: t('hours'),
                  minutes: t('minutes'),
                  seconds: t('seconds')
                }}
              />
            </div>
          </div>

          {/* Actions & Links */}
          <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col lg:border-l lg:border-navy-100 lg:pl-8">
            <Link
              href="/competitions"
              className="btn btn-mag justify-center text-sm shadow-[0_4px_16px_rgba(237,1,138,0.25)]"
            >
              Yarışa qeydiyyat
              <ArrowRight size={15} aria-hidden="true" />
            </Link>

            <Link
              href="/#resurslar"
              className="btn btn-out justify-center text-xs text-navy-700 hover:text-navy-950"
            >
              <FileText size={14} aria-hidden="true" />
              Nizamnamə (PDF)
            </Link>

            <Link
              href="/competitions"
              className="inline-flex items-center justify-center gap-1 text-center font-mono text-[0.7rem] font-semibold text-navy-600 hover:text-mag transition-colors pt-1"
            >
              {tc('fullCalendar')} &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
