'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown, Menu } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { navigation, utilityLinks } from '@/data/navigation';
import { pick } from '@/types';
import Brand from './Brand';
import MegaPanel from './MegaPanel';
import MobileNav from './MobileNav';
import LocaleSwitcher from '@/components/ui/LocaleSwitcher';

export default function SiteHeader() {
  const locale = useLocale();
  const t = useTranslations('Common');
  const [openId, setOpenId] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && headRef.current && !headRef.current.contains(target)) setOpenId(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <>
      <div
        ref={headRef}
        className="sticky z-[60] top-[env(safe-area-inset-top,0px)]"
        onMouseLeave={() => setOpenId(null)}
      >
        {/* Utility rail */}
        <div className="bg-navy-950 text-navy-200">
          <div className="wrap flex h-[34px] items-center justify-between gap-4">
            <nav aria-label={t('utilityNav')} className="flex items-center gap-5">
              {utilityLinks.map((link, i) => (
                <Link
                  key={link.href + i}
                  href={link.href}
                  className={`whitespace-nowrap text-[0.74rem] transition-colors hover:text-white ${
                    i >= 2 ? 'hidden md:inline' : i === 1 ? 'hidden sm:inline' : ''
                  }`}
                >
                  {pick(link.title, locale)}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3.5">
              <span className="hidden font-mono text-[0.72rem] tracking-[0.1em] sm:inline">
                {t('season')}
              </span>
              <LocaleSwitcher label={t('language')} />
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={`border-b border-line bg-white transition-shadow ${
            stuck ? 'shadow-[0_10px_30px_-22px_rgba(27,70,122,0.3)]' : ''
          }`}
        >
          <div className="wrap flex h-[64px] items-center gap-5 xl:h-[70px]">
            <Brand
              variant="mark"
              height={50}
              withWordmark
              wordmarkTop={locale === 'en' ? 'Azerbaijan DanceSport' : 'Azərbaycan İdman Rəqsləri'}
              wordmarkBottom={locale === 'en' ? 'Federation' : 'Federasiyası'}
              ariaLabel={
                locale === 'en'
                  ? 'Azerbaijan DanceSport Federation — home'
                  : 'Azərbaycan İdman Rəqsləri Federasiyası — ana səhifə'
              }
            />

            <nav aria-label={t('mainNav')} className="ml-auto hidden items-stretch xl:flex">
              {navigation.map((item) => {
                const open = openId === item.id;

                if (item.href) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex h-[70px] items-center whitespace-nowrap border-b-[2.5px] border-transparent px-3.5 font-display text-[0.86rem] font-semibold text-navy-950 transition-colors hover:text-navy-700"
                    >
                      {pick(item.label, locale)}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-expanded={open}
                    aria-controls={`mega-${item.id}`}
                    onClick={() => setOpenId(open ? null : item.id)}
                    onMouseEnter={() => setOpenId(item.id)}
                    onFocus={() => setOpenId(item.id)}
                    className={`flex h-[70px] items-center gap-1.5 whitespace-nowrap border-b-[2.5px] px-3.5 font-display text-[0.86rem] font-semibold transition-all ${
                      open ? 'border-navy-700 text-navy-900' : 'border-transparent text-navy-950 hover:text-navy-700'
                    }`}
                  >
                    {pick(item.label, locale)}
                    <ChevronDown
                      size={13}
                      aria-hidden="true"
                      className={`opacity-60 transition-transform ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="ml-auto flex flex-none items-center gap-2.5 xl:ml-3">
              <Link href="/#reytinq" className="btn btn-out btn-sm hidden lg:inline-flex">
                {locale === 'en' ? 'Ranking' : 'Reytinq'}
              </Link>
              <Link href="/#uzvluk" className="btn btn-navy btn-sm hidden sm:inline-flex">
                {locale === 'en' ? 'Become a member' : 'Üzv ol'}
              </Link>
              <button
                type="button"
                onClick={() => setDrawer(true)}
                aria-label={t('openMenu')}
                aria-expanded={drawer}
                className="flex h-[42px] w-[42px] flex-none items-center justify-center rounded-lg border border-line-2 text-navy-700 xl:hidden"
              >
                <Menu size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega panels */}
        {navigation
          .filter((item) => item.columns)
          .map((item) => (
            <div
              key={item.id}
              id={`mega-${item.id}`}
              className={`absolute inset-x-0 top-full border-t border-b-[3px] border-navy-700 border-t-line bg-white shadow-[0_26px_48px_-28px_rgba(27,70,122,0.3)] ${
                openId === item.id ? 'hidden xl:block' : 'hidden'
              }`}
            >
              <MegaPanel item={item} locale={locale} onNavigate={() => setOpenId(null)} />
            </div>
          ))}
      </div>

      <MobileNav open={drawer} onClose={() => setDrawer(false)} locale={locale} />
    </>
  );
}
