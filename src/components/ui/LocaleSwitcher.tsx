'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { locales, usePathname, useRouter } from '@/i18n/routing';

export default function LocaleSwitcher({ label }: { label: string }) {
  const active = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  return (
    <div
      className="flex overflow-hidden rounded-[3px] border border-white/20"
      role="group"
      aria-label={label}
    >
      {locales.map((code) => {
        const current = code === active;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={current}
            disabled={pending}
            onClick={() =>
              startTransition(() => {
                // `pathname` here is already locale-stripped by next-intl's hook,
                // so replacing it with a different locale keeps the same page.
                router.replace(pathname, { locale: code });
              })
            }
            className={`px-2 py-1 font-mono text-[0.68rem] tracking-[0.08em] transition-colors ${
              current ? 'bg-mag text-white' : 'text-on-dark-2 hover:text-white'
            }`}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
