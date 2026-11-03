import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import Reveal from '@/components/ui/Reveal';
import Visual from '@/components/ui/Visual';
import { news } from '@/data/news';
import { pick } from '@/types';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'News' });
  return { title: t('pageTitle'), description: t('pageLead') };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function NewsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  const t = useTranslations('News');
  const tc = useTranslations('Common');

  return (
    <section className="band">
      <div className="wrap">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h1 className="h2">{t('pageTitle')}</h1>
        <p className="lead mb-7 mt-3">{t('pageLead')}</p>
        <p className="mb-7">
          <span className="tag">{tc('demoContent')}</span>
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <article className="group h-full rounded-xl border border-line bg-white p-4.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy-300 hover:shadow-md">
                <div className="overflow-hidden rounded-lg">
                  <Visual
                    seed={item.seed}
                    mode={item.mode}
                    className="aspect-[16/10] transition-transform duration-500 group-hover:scale-105"
                    src={item.image}
                    alt={pick(item.title, locale)}
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                  />
                </div>
                <div className="my-3 flex flex-wrap items-center gap-2.5">
                  <em className="rounded-full bg-navy-50 border border-navy-100 px-2.5 py-0.5 font-mono text-[0.64rem] font-semibold uppercase not-italic tracking-[0.08em] text-navy-700">
                    {pick(item.category, locale)}
                  </em>
                  <time dateTime={item.isoDate} className="font-mono text-[0.74rem] text-ink-3">
                    {item.date}
                  </time>
                </div>
                <h2 className="font-display text-[1.05rem] font-bold text-navy-950 leading-snug transition-colors group-hover:text-navy-700">
                  {pick(item.title, locale)}
                </h2>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-ink-2">
                  {pick(item.excerpt, locale)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
