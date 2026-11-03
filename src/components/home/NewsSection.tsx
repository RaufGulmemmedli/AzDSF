import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import Visual from '@/components/ui/Visual';
import { news } from '@/data/news';
import { pick } from '@/types';

export default function NewsSection() {
  const t = useTranslations('News');
  const tc = useTranslations('Common');
  const locale = useLocale();

  const [lead, ...rest] = news;

  return (
    <section className="band bg-surface" id="xeberler" aria-labelledby="news-h">
      <div className="wrap">
        <SectionHead
          eyebrow={t('eyebrow')}
          title={t('title')}
          id="news-h"
          right={
            <>
              <span className="tag">{tc('demoContent')}</span>
              <Link href="/news" className="tlink">
                {t('all')}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </>
          }
        />

        <div className="grid gap-[clamp(1.6rem,2.8vw,2.6rem)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <Reveal>
            <Link href="/news" className="group block rounded-xl border border-line bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-navy-300 hover:shadow-md">
              <div className="overflow-hidden rounded-lg">
                <Visual
                  seed={lead.seed}
                  mode={lead.mode}
                  className="aspect-[16/9] transition-transform duration-500 group-hover:scale-[1.02]"
                  src={lead.image}
                  alt={pick(lead.title, locale)}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
              </div>
              <div className="my-3.5 flex flex-wrap items-center gap-3">
                <em className="rounded-full bg-navy-50 border border-navy-100 px-2.5 py-0.5 font-mono text-[0.66rem] font-semibold uppercase not-italic tracking-[0.08em] text-navy-700">
                  {pick(lead.category, locale)}
                </em>
                <time dateTime={lead.isoDate} className="font-mono text-[0.74rem] text-ink-3">
                  {lead.date}
                </time>
              </div>
              <h3 className="text-[clamp(1.25rem,2vw,1.65rem)] font-bold text-navy-950 leading-snug transition-colors group-hover:text-navy-700">
                {pick(lead.title, locale)}
              </h3>
              <p className="lead mt-2.5 text-[0.88rem]">{pick(lead.excerpt, locale)}</p>
              <span className="tlink mt-4 font-semibold text-navy-700 group-hover:text-mag">
                {t('readMore')}
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
          </Reveal>

          <div className="flex flex-col gap-3.5">
            {rest.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <Link
                  href="/news"
                  className="group grid grid-cols-[100px_minmax(0,1fr)] items-start gap-4 rounded-xl border border-line/70 bg-white p-3.5 shadow-sm transition-all duration-200 hover:border-navy-300 hover:shadow-md sm:grid-cols-[124px_minmax(0,1fr)]"
                >
                  <div className="overflow-hidden rounded-lg">
                    <Visual
                      seed={item.seed}
                      mode={item.mode}
                      className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.03]"
                      src={item.image}
                      alt={pick(item.title, locale)}
                      sizes="124px"
                    />
                  </div>
                  <div>
                    <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
                      <em className="rounded-full bg-navy-50 border border-navy-100 px-2 py-0.5 font-mono text-[0.62rem] font-semibold uppercase not-italic tracking-[0.08em] text-navy-700">
                        {pick(item.category, locale)}
                      </em>
                      <time dateTime={item.isoDate} className="font-mono text-[0.72rem] text-ink-3">
                        {item.date}
                      </time>
                    </div>
                    <h4 className="font-display text-[0.95rem] font-bold text-navy-900 leading-snug transition-colors group-hover:text-navy-700">
                      {pick(item.title, locale)}
                    </h4>
                    <p className="mt-1.5 line-clamp-2 text-[0.78rem] leading-snug text-ink-2">
                      {pick(item.excerpt, locale)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
