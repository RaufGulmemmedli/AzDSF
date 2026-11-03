'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { Minus, Plus, X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { navigation } from '@/data/navigation';
import { pick } from '@/types';

type Props = { open: boolean; onClose: () => void; locale: string };

export default function MobileNav({ open, onClose, locale }: Props) {
  const t = useTranslations('Common');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.38, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[80] flex flex-col bg-navy-900 text-white xl:hidden"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-[max(18px,env(safe-area-inset-left,0px))] pb-3.5 pt-[calc(14px+env(safe-area-inset-top,0px))]">
            <Image
              src="/logo/mark-white.png"
              alt=""
              width={321}
              height={370}
              style={{ height: 40, width: 'auto' }}
            />
            <button
              type="button"
              onClick={onClose}
              aria-label={t('closeMenu')}
              className="flex h-[42px] w-[42px] items-center justify-center rounded border border-white/25"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-[max(18px,env(safe-area-inset-left,0px))] pb-8 pt-1">
            {navigation.map((item) => {
              if (item.href) {
                return (
                  <div key={item.id} className="border-b border-white/10">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block py-4 font-display text-[1.05rem] font-semibold"
                    >
                      {pick(item.label, locale)}
                    </Link>
                  </div>
                );
              }

              const isOpen = expanded === item.id;
              return (
                <div key={item.id} className="border-b border-white/10">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left font-display text-[1.05rem] font-semibold"
                  >
                    {pick(item.label, locale)}
                    {isOpen ? (
                      <Minus size={16} className="flex-none text-mag" aria-hidden="true" />
                    ) : (
                      <Plus size={16} className="flex-none text-mag" aria-hidden="true" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="pb-3.5">
                          {item.columns?.flatMap((column) =>
                            column.links.map((link) => (
                              <li key={column.title.az + link.href + pick(link.title, locale)}>
                                <Link
                                  href={link.href}
                                  onClick={onClose}
                                  className="block border-l-2 border-white/15 py-2 pl-3.5 text-[0.92rem] text-on-dark-2 transition-colors hover:border-mag hover:text-white"
                                >
                                  {pick(link.title, locale)}
                                </Link>
                              </li>
                            ))
                          )}
                        </ul>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}

            <div className="flex flex-wrap gap-2.5 pt-6">
              <Link href="/#uzvluk" onClick={onClose} className="btn btn-mag btn-sm">
                {locale === 'en' ? 'Become a member' : 'Üzv ol'}
              </Link>
              <Link href="/#reytinq" onClick={onClose} className="btn btn-on-dark btn-sm">
                {locale === 'en' ? 'Ranking' : 'Reytinq'}
              </Link>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
