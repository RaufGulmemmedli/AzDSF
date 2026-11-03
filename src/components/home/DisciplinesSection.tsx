import { useLocale, useTranslations } from 'next-intl';
import SectionHead from '@/components/ui/SectionHead';
import Tabs from '@/components/ui/Tabs';
import Visual from '@/components/ui/Visual';
import { disciplines } from '@/data/disciplines';
import { pick } from '@/types';

export default function DisciplinesSection() {
  const t = useTranslations('Disciplines');
  const locale = useLocale();

  const items = disciplines.map((discipline) => ({
    id: discipline.id,
    label: pick(discipline.tab, locale),
    panel: (
      <div className="grid items-center gap-[clamp(2rem,3.4vw,3.4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div className="overflow-hidden rounded-xl border border-line shadow-md">
          <Visual
            seed={discipline.seed}
            mode={discipline.mode}
            className="aspect-[16/11] !rounded-none"
            tag={pick(discipline.tab, locale)}
            src={discipline.image}
            alt={pick(discipline.title, locale)}
            sizes="(min-width: 1024px) 46vw, 100vw"
          />
        </div>
        <div>
          <h3 className="h3 text-navy-950 font-bold">{pick(discipline.title, locale)}</h3>
          <p className="lead mt-3.5 text-[0.96rem]">{pick(discipline.body, locale)}</p>

          <ul className="my-5 flex flex-wrap gap-2">
            {discipline.dances.map((dance) => (
              <li
                key={dance.az}
                className="rounded-full border border-navy-200/80 bg-navy-50/70 px-3 py-1 font-mono text-[0.74rem] font-medium text-navy-800"
              >
                {pick(dance, locale)}
              </li>
            ))}
          </ul>

          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {discipline.facts.map((fact) => (
              <div key={fact.label.az} className="rounded-xl border border-line bg-surface p-3.5 shadow-sm">
                <dt className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-ink-3">
                  {pick(fact.label, locale)}
                </dt>
                <dd className="mt-1 font-display text-[0.96rem] font-bold text-navy-700">
                  {pick(fact.value, locale)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    )
  }));

  return (
    <section className="band" id="novler" aria-labelledby="disc-h">
      <div className="wrap">
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} id="disc-h" />
        <Tabs items={items} label={t('tablist')} />
      </div>
    </section>
  );
}
