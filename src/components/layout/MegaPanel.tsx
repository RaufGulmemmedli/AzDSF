'use client';

import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { pick } from '@/types';
import type { NavItem } from '@/data/navigation';

type Props = {
  item: NavItem;
  locale: string;
  onNavigate: () => void;
};

export default function MegaPanel({ item, locale, onNavigate }: Props) {
  const feature = item.feature;

  return (
    <div className="mx-auto grid max-w-measure grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(318px,0.85fr)]">
      {item.columns?.map((column, i) => (
        <div
          key={i}
          className="border-r border-line px-6 py-7 first:pl-[max(18px,2.2vw,env(safe-area-inset-left,0px))]"
        >
          <h5 className="mb-3.5 font-mono text-[0.66rem] font-medium uppercase tracking-[0.15em] text-ink-3">
            {pick(column.title, locale)}
          </h5>
          <ul>
            {column.links.map((link) => (
              <li key={pick(link.title, locale)}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="-ml-2.5 block rounded px-2.5 py-2 transition-colors hover:bg-surface"
                >
                  <b className="block font-display text-[0.9rem] font-semibold text-navy">
                    {pick(link.title, locale)}
                  </b>
                  <span className="mt-0.5 block text-[0.775rem] leading-snug text-ink-2">
                    {pick(link.desc, locale)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {feature ? (
        <div className="bg-surface px-6 py-7 pr-[max(18px,2.2vw,env(safe-area-inset-right,0px))]">
          <h5 className="mb-3.5 font-mono text-[0.66rem] font-medium uppercase tracking-[0.15em] text-ink-3">
            {pick(feature.title, locale)}
          </h5>

          {feature.kind === 'cards'
            ? feature.cards.map((card, i) => (
                <div key={i} className="mb-2.5 rounded-[5px] border border-line bg-white p-4">
                  <span className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-[0.1em] text-mag">
                    {pick(card.tag, locale)}
                  </span>
                  <span className="block font-display text-[0.95rem] font-bold leading-tight text-navy">
                    {pick(card.title, locale)}
                  </span>
                  <span className="mt-1.5 block font-mono text-[0.76rem] text-ink-2">
                    {pick(card.detail, locale)}
                  </span>
                </div>
              ))
            : feature.rows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-center gap-2.5 border-b border-line py-1.5 last:border-b-0"
                >
                  <b className="w-4 font-display text-[0.95rem] text-mag">{row.key}</b>
                  <span className="min-w-0 flex-1 truncate text-[0.82rem] text-ink">
                    {pick(row.label, locale)}
                  </span>
                  <i className="font-mono text-[0.78rem] not-italic text-ink-2">{row.value}</i>
                </div>
              ))}

          {feature.kind === 'rows' && feature.footnote ? (
            <p className="mt-2.5 text-[0.78rem] text-ink-2">{pick(feature.footnote, locale)}</p>
          ) : null}

          {feature.cta ? (
            <Link
              href={feature.cta.href}
              onClick={onNavigate}
              className={feature.cta.style === 'button' ? 'btn btn-mag btn-sm mt-3' : 'tlink mt-3'}
            >
              {pick(feature.cta.label, locale)}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
