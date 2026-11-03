import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['az', 'en'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'az',
  localePrefix: 'always'
});

/**
 * Always import Link / useRouter / usePathname from here, never from `next/link`
 * or `next/navigation` — these wrappers keep the active locale in the URL.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
