import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SectionHead from '@/components/ui/SectionHead';
import Tabs from '@/components/ui/Tabs';
import { rankingTables, recentResults } from '@/data/ranking';
import { pick } from '@/types';

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
        <div className="overflow-x-auto rounded-xl border border-white/15 bg-navy-950/60 shadow-[0_15px_35px_rgba(0,0,0,0.3)] backdrop-blur-md">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">{t('thCompetition')}</th>
                <th scope="col">{t('thDate')}</th>
                <th scope="col">{t('thCategory')}</th>
                <th scope="col" className="num">
                  {t('thCouples')}
                </th>
                <th scope="col">{t('thWinner')}</th>
              </tr>
            </thead>
            <tbody>
              {recentResults.map((row) => (
                <tr key={row.competition.az + row.date}>
                  <td className="font-medium text-white">{pick(row.competition, locale)}</td>
                  <td className="font-mono text-[0.76rem] text-navy-200">{row.date}</td>
                  <td className="font-mono text-[0.76rem] text-navy-200">
                    {pick(row.category, locale)}
                  </td>
                  <td className="num font-semibold text-white">{row.couples}</td>
                  <td className="text-white/90">{row.winner}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
