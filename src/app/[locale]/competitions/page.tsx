import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import CompetitionTable from '@/components/home/CompetitionTable';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Competitions' });
  return { title: t('title'), description: t('pageLead') };
}

export default function CompetitionsPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  const t = useTranslations('Competitions');
  const tc = useTranslations('Common');

  return (
    <section className="band">
      <div className="wrap">
        <p className="eyebrow">{t('eyebrow')}</p>
        <h1 className="h2">{t('title')}</h1>
        <p className="lead mb-7 mt-3">{t('pageLead')}</p>
        <p className="mb-5">
          <span className="tag">{tc('demoData')}</span>
        </p>
        <CompetitionTable />
      </div>
    </section>
  );
}
