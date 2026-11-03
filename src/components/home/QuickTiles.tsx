import { useTranslations } from 'next-intl';
import { CalendarDays, BarChart3, UserPlus, MapPin } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function QuickTiles() {
  const t = useTranslations('Tiles');

  const tiles = [
    { href: '/competitions', Icon: CalendarDays, title: t('calendarTitle'), body: t('calendarBody'), cta: t('calendarCta') },
    { href: '/#reytinq', Icon: BarChart3, title: t('rankingTitle'), body: t('rankingBody'), cta: t('rankingCta') },
    { href: '/#uzvluk', Icon: UserPlus, title: t('membershipTitle'), body: t('membershipBody'), cta: t('membershipCta') },
    { href: '/#klublar', Icon: MapPin, title: t('clubsTitle'), body: t('clubsBody'), cta: t('clubsCta') }
  ];

  return (
    <section className="band-tight bg-surface" aria-label={t('quickLinks')}>
      <div className="wrap">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map(({ href, Icon, title, body, cta }) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col rounded-xl border border-line bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-navy-300 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-navy-50 text-navy-700 transition-colors group-hover:bg-mag-50 group-hover:text-mag">
                <Icon size={24} aria-hidden="true" strokeWidth={1.8} />
              </div>
              <b className="font-display text-[1.05rem] font-bold text-navy-900 group-hover:text-navy-700 transition-colors">
                {title}
              </b>
              <span className="mt-2 text-[0.84rem] leading-relaxed text-ink-2">
                {body}
              </span>
              <span className="mt-auto pt-4 inline-flex items-center gap-1 font-display text-[0.82rem] font-semibold text-navy-700 group-hover:text-mag transition-colors">
                {cta}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
