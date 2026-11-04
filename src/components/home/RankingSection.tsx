import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SectionHead from '@/components/ui/SectionHead';
import Tabs from '@/components/ui/Tabs';
import { competitionResults, rankingTables } from '@/data/ranking';
import { pick } from '@/types';

const PODIUM_STYLE: Record<number, string> = {
  1: 'bg-mag text-white shadow-[0_0_14px_rgba(237,1,138,0.45)]',
  2: 'bg-white/90 text-navy-900',
  3: 'bg-[#C98B4B] text-white'
};

function Delta({ value }: { value: number }) {
  if (value === 0) return <span className="font-mono text-[0.76rem] text-on-dark-2">—</span>;
  const up = value > 0;
  return (
    <span className={`font-mono text-[0.76rem] ${up ? 'text-[#3FD08B]' : 'text-[#FF7A8A]'}`}>
      {up ? '▲' : '▼'} {Math.abs(value)}
    </span>
  );
}

export default function RankingSection() {
  const t = useTranslations('Ranking');
  const tc = useTranslations('Common');
  const locale = useLocale();

  const items = [
    ...rankingTables.map((table) => ({
      id: table.id,
      label: pick(table.tab, locale),
      panel: (
        <div className="overflow-x-auto rounded-xl border border-white/15 bg-navy-950/60 shadow-[0_15px_35px_rgba(0,0,0,0.3)] backdrop-blur-md">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">{t('thCouple')}</th>
                <th scope="col">{t('thClub')}</th>
                <th scope="col">{t('thClass')}</th>
                <th scope="col" className="num">
                  {t('thPoints')}
                </th>
                <th scope="col" className="num">
                  {t('thChange')}
                </th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.position}>
                  <td className="w-12 font-display text-[1.05rem] font-extrabold">
                    <span className={row.position === 1 ? 'text-mag drop-shadow-[0_0_8px_rgba(237,1,138,0.5)]' : row.position <= 3 ? 'text-white' : 'text-navy-300'}>
                      {row.position}
                    </span>
                  </td>
                  <td className="font-medium text-white">{row.couple}</td>
                  <td className="font-mono text-[0.76rem] text-navy-200">{pick(row.club, locale)}</td>
                  <td className="font-mono text-[0.76rem] text-navy-200">{row.danceClass}</td>
                  <td className="num font-semibold text-white">{row.points.toLocaleString('fr-FR')}</td>
                  <td className="num">
                    <Delta value={row.delta} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    })),
    {
      id: 'results',
      label: t('recentResults'),
      panel: (
        <div className="space-y-5">
          {competitionResults.map((event) => (
            <article
              key={event.id}
              className="rounded-xl border border-white/15 bg-navy-950/60 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.3)] backdrop-blur-md sm:p-6"
            >
              <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="font-display text-[1.05rem] font-bold leading-snug text-white sm:text-[1.2rem]">
                  {pick(event.competition, locale)}
                </h3>
                <span className="rounded-full border border-mag/40 bg-mag/15 px-2.5 py-0.5 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-mag">
                  {pick(event.ageGroup, locale)}
                </span>
                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-navy-100">
                  {t('officialResults')}
                </span>
              </header>

              <div
                className={`mt-5 grid gap-4 lg:gap-5 ${
                  event.categories.length > 1 ? 'lg:grid-cols-2' : ''
                }`}
              >
                {event.categories.map((category) => (
                  <section key={category.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    {category.title ? (
                      <h4 className="mb-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-mag">
                        {pick(category.title, locale)}
                      </h4>
                    ) : null}
                    <ol className="space-y-2">
                      {category.placements.map((placement) => (
                        <li
                          key={placement.position}
                          className="flex items-center gap-3 rounded-md border border-white/10 bg-navy-950/60 px-3 py-2.5"
                        >
                          <span
                            className={`flex h-8 w-8 flex-none items-center justify-center rounded-full font-display text-[0.95rem] font-extrabold ${
                              PODIUM_STYLE[placement.position] ?? 'bg-white/10 text-navy-100'
                            }`}
                            aria-label={`${t('place')} ${placement.position}`}
                          >
                            {placement.position}
                          </span>
                          <span className="min-w-0">
                            {placement.partners.map((partner) => (
                              <span key={partner.name} className="block leading-snug text-[0.88rem] text-white">
                                {partner.name}
                                <span className="ml-1.5 font-mono text-[0.72rem] text-navy-300">
                                  {partner.born}
                                </span>
                              </span>
                            ))}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>
      )
    }
  ];

  return (
    <section className="band bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white" id="reytinq" aria-labelledby="rank-h">
      <div className="wrap">
        <SectionHead
          eyebrow={t('eyebrow')}
          title={t('title')}
          id="rank-h"
          onDark
          right={
            <>
              <span className="tag !border-white/20 !bg-white/10 !text-white">{t('updated')}</span>
              <span className="tag !border-white/20 !bg-white/10 !text-white">{tc('demoData')}</span>
            </>
          }
        />

        <Tabs items={items} label={t('tablist')} onDark />

        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link href="/#reytinq" className="btn btn-mag btn-sm">
            {t('full')}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link href="/#reytinq" className="btn btn-on-dark btn-sm">
            {t('allResults')}
          </Link>
        </div>
      </div>
    </section>
  );
}
