import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SectionHead from '@/components/ui/SectionHead';
import AthleteGrid from './AthleteGrid';
import { athleteStats } from '@/data/athletes';
import { pick } from '@/types';

export default function AthletesSection() {
  const t = useTranslations('Athletes');
  const tc = useTranslations('Common');
  const locale = useLocale();

  return (
    <section className="band" id="idmancilar" aria-labelledby="ath-h">
      <div className="wrap">
        <SectionHead
          eyebrow={t('eyebrow')}
          title={t('title')}
          id="ath-h"
          right={
            <>
              <span className="tag">{tc('demoData')}</span>
              <Link href="/#idmancilar" className="tlink">
                {t('registry')}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </>
          }
        />

        <AthleteGrid />

        <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {athleteStats.map((stat) => (
            <div key={stat.label.az} className="rounded-xl border border-line bg-surface p-4 shadow-sm">
              <dt className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-ink-3">
                {pick(stat.label, locale)}
              </dt>
              <dd className="mt-1.5 font-display text-[1.1rem] font-extrabold text-navy-700">
                {pick(stat.value, locale)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
