import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { membershipTracks } from '@/data/federation';
import { pick } from '@/types';

export default function MembershipSection() {
  const t = useTranslations('Membership');
  const locale = useLocale();

  return (
    <section className="band bg-surface" id="uzvluk" aria-labelledby="mem-h">
      <div className="wrap">
        <SectionHead
          eyebrow={t('eyebrow')}
          title={t('title')}
          id="mem-h"
          right={<span className="tag !border-navy-200 !bg-navy-50 !text-navy-800">{t('deadline')}</span>}
        />

        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {membershipTracks.map((track) => (
              <div key={track.title.az} className="group flex flex-col rounded-xl border border-line bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-navy-300 hover:shadow-md">
                <b className="font-display text-[1.08rem] font-bold text-navy-950 group-hover:text-navy-700 transition-colors">
                  {pick(track.title, locale)}
                </b>
                <span className="mt-2 text-[0.84rem] leading-relaxed text-ink-2">
                  {pick(track.body, locale)}
                </span>
                <span className="mt-auto pt-4 inline-flex items-center gap-1 font-display text-[0.82rem] font-semibold text-navy-700 group-hover:text-mag transition-colors">
                  {pick(track.cta, locale)}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/#elaqe" className="btn btn-navy btn-sm">
            {t('start')}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <Link href="/#resurslar" className="btn btn-out btn-sm">
            {t('fees')}
          </Link>
        </div>
      </div>
    </section>
  );
}
