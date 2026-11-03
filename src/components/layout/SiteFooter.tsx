import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

type Column = { heading: string; links: { href: string; label: string }[] };

export default async function SiteFooter() {
  const t = await getTranslations('Footer');
  const locale = await getLocale();

  const columns: Column[] = [
    {
      heading: t('colFederation'),
      links: [
        { href: '/#federasiya', label: t('about') },
        { href: '/#federasiya', label: t('board') },
        { href: '/#resurslar', label: t('statutes') },
        { href: '/#resurslar', label: t('transparency') }
      ]
    },
    {
      heading: t('colCompetitions'),
      links: [
        { href: '/competitions', label: t('calendar') },
        { href: '/competitions', label: t('entry') },
        { href: '/#reytinq', label: t('ranking') },
        { href: '/#reytinq', label: t('results') }
      ]
    },
    {
      heading: t('colMembership'),
      links: [
        { href: '/#uzvluk', label: t('individual') },
        { href: '/#uzvluk', label: t('clubMembership') },
        { href: '/#klublar', label: t('accreditedClubs') },
        { href: '/#idmancilar', label: t('adjudicators') }
      ]
    },
    {
      heading: t('colMedia'),
      links: [
        { href: '/news', label: t('news') },
        { href: '/#qalereya', label: t('gallery') },
        { href: '/#elaqe', label: t('pressKit') },
        { href: '/#elaqe', label: t('contact') }
      ]
    }
  ];

  return (
    <footer className="bg-navy-950 border-t border-navy-900 pb-[calc(24px+env(safe-area-inset-bottom,0px))] pt-[clamp(48px,6vw,76px)] text-navy-200">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-8 pb-12 lg:grid-cols-3 xl:grid-cols-[minmax(0,1.5fr)_repeat(4,minmax(0,1fr))]">
          <div className="col-span-2 lg:col-span-3 xl:col-span-1">
            <Link
              href="/"
              aria-label={locale === 'en' ? 'Azerbaijan DanceSport Federation' : 'Azərbaycan İdman Rəqsləri Federasiyası'}
            >
              <Image
                src="/logo/full-white.png"
                alt=""
                width={558}
                height={306}
                style={{ height: 84, width: 'auto' }}
                className="mb-4"
              />
            </Link>
            <p className="max-w-[36ch] text-[0.8rem] leading-relaxed text-navy-300">{t('description')}</p>
            <div className="mt-5 flex gap-2" aria-label={t('socialLabel')}>
              {['IG', 'FB', 'YT'].map((network) => (
                <span
                  key={network}
                  title={t('socialPending')}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 font-mono text-[0.7rem] font-semibold text-white/90 transition-all hover:bg-white/10 hover:border-white/30 cursor-pointer"
                >
                  {network}
                </span>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h5 className="mb-3.5 font-mono text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-white">
                {column.heading}
              </h5>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-[0.85rem] text-navy-200 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-2.5 border-t border-white/10 pt-6 text-[0.76rem] text-navy-400">
          <span>{t('copyright')}</span>
          <span>{t('demoNotice')}</span>
        </div>
      </div>
    </footer>
  );
}
