import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SectionHead from '@/components/ui/SectionHead';
import CompetitionTable from './CompetitionTable';

export default function CompetitionsSection() {
  const t = useTranslations('Competitions');
  const tc = useTranslations('Common');

  return (
    <section className="band bg-surface" id="yarislar" aria-labelledby="comp-h">
      <div className="wrap">
        <SectionHead
          eyebrow={t('eyebrow')}
          title={t('title')}
          id="comp-h"
          right={<span className="tag">{tc('demoData')}</span>}
        />

        <CompetitionTable />

        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link href="/competitions" className="btn btn-navy btn-sm">
            {t('fullCalendar')}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link href="/#resurslar" className="btn btn-out btn-sm">
            {t('regulations')}
          </Link>
        </div>
      </div>
    </section>
  );
}
