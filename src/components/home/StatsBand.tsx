import { useLocale, useTranslations } from 'next-intl';
import Reveal from '@/components/ui/Reveal';
import { federationStats } from '@/data/federation';
import { pick } from '@/types';

export default function StatsBand() {
  const t = useTranslations('About');
  const locale = useLocale();

  return (
    <section className="band-tight bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white" aria-label={t('statsLabel')}>
      <div className="wrap">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/15 bg-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.3)] md:grid-cols-4">
            {federationStats.map((stat) => (
              <div key={stat.label.az} className="bg-navy-950/85 px-6 py-7 transition-colors hover:bg-navy-900/90">
                <dt className="font-display text-[clamp(2.1rem,3.6vw,2.9rem)] font-extrabold leading-none text-white">
                  {pick(stat.value, locale)}
                </dt>
                <dd className="mt-2.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-navy-200">
                  {pick(stat.label, locale)}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <p className="mt-4 text-[0.78rem] text-navy-300">{t('statsNote')}</p>
      </div>
    </section>
  );
}
