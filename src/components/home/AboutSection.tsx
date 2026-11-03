import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Reveal from '@/components/ui/Reveal';
import Visual from '@/components/ui/Visual';
import { federationFacts } from '@/data/federation';
import { pick } from '@/types';

export default function AboutSection() {
  const t = useTranslations('About');
  const locale = useLocale();

  return (
    <section className="band bg-white" id="federasiya" aria-labelledby="fed-h">
      <div className="wrap">
        <div className="grid items-center gap-[clamp(2rem,3.6vw,3.6rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <Reveal>
            <div className="overflow-hidden rounded-xl border border-line shadow-md">
              <Visual
                seed={21}
                mode="brand"
                className="aspect-[4/3] !rounded-none"
                src="/img/ballroom-turn.png"
                alt={t('visualAlt')}
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
            </div>
          </Reveal>

          <div>
            <p className="eyebrow">{t('eyebrow')}</p>
            <h2 className="h2 text-navy-950" id="fed-h">
              {t('title')}
            </h2>
            <p className="lead mt-4 text-[0.96rem]">{t('p1')}</p>
            <p className="lead mt-3 text-[0.96rem]">{t('p2')}</p>

            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {federationFacts.map((fact) => (
                <div key={fact.label.az} className="rounded-xl border border-line bg-surface p-4 shadow-sm">
                  <dt className="font-mono text-[0.64rem] font-medium uppercase tracking-[0.1em] text-ink-3">
                    {pick(fact.label, locale)}
                  </dt>
                  <dd className="mt-1 font-display text-[1.1rem] font-extrabold text-navy-700">
                    {pick(fact.value, locale)}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/#resurslar" className="btn btn-navy btn-sm">
                {t('ctaDocuments')}
              </Link>
              <Link href="/#elaqe" className="btn btn-out btn-sm">
                {t('ctaContact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
