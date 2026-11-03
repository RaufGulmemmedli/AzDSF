import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <section className="band">
      <div className="wrap max-w-[60ch] text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="h2">{t('title')}</h1>
        <p className="lead mx-auto mt-4">{t('body')}</p>
        <Link href="/" className="btn btn-mag mt-7">
          {t('home')}
        </Link>
      </div>
    </section>
  );
}
