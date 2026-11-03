import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import Visual from '@/components/ui/Visual';
import { athletes, athleteStats } from '@/data/athletes';
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

        <div className="grid gap-[clamp(1rem,1.8vw,1.5rem)] sm:grid-cols-2 lg:grid-cols-4">
          {athletes.map((athlete, i) => (
            <Reveal key={athlete.id} delay={i * 0.05}>
              <article className="group h-full overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy-400 hover:shadow-lg">
                <div className="overflow-hidden">
                  <Visual
                    seed={athlete.seed}
                    mode={athlete.mode}
                    className="aspect-[3/4] !rounded-none transition-transform duration-500 group-hover:scale-[1.03]"
                    tag={athlete.image ? undefined : t('photoPending')}
                    src={athlete.image}
                    alt={`${athlete.couple} — ${pick(athlete.detail, locale)}`}
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                  />
                </div>
                <div className="p-4.5">
                  <h3 className="font-display text-[1rem] font-bold text-navy-950 leading-snug group-hover:text-navy-700 transition-colors">
                    {athlete.couple}
                  </h3>
                  <p className="mt-1.5 font-mono text-[0.72rem] text-ink-2">
                    {pick(athlete.detail, locale)}
                  </p>
                  <div className="mt-3 border-t border-line pt-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 border border-navy-100 px-2.5 py-0.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.06em] text-navy-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-mag" />
                      {pick(athlete.badge, locale)}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

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
