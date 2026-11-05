'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Visual from '@/components/ui/Visual';
import { athletes } from '@/data/athletes';
import { pick } from '@/types';

/**
 * How many cards stay visible before "show more", per breakpoint — one whole
 * grid row at each width (1 / 2 / 4 columns). The overflow stays in the DOM and
 * is hidden with CSS, so the initial count is responsive without reading the
 * viewport in JS, which would disagree with the server render on first paint.
 */
const BASE = 4; // < sm
const SM = 6; //   sm — two rows of two
const LG = 8; //   lg — two rows of four

function collapsedClass(index: number): string {
  if (index < BASE) return '';
  if (index < SM) return 'hidden sm:block';
  if (index < LG) return 'hidden lg:block';
  return 'hidden';
}

export default function AthleteGrid() {
  const t = useTranslations('Athletes');
  const locale = useLocale();
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const collapsing = useRef(false);

  // Nothing is ever hidden when the roster is short enough to fit the first row.
  const hasMore = athletes.length > BASE;

  // Collapsing takes thousands of pixels out of the page, which would otherwise
  // leave the reader stranded in the next section. Run after the commit, when
  // the grid has already shrunk — `globals.css` adds the sticky header offset.
  useEffect(() => {
    if (expanded || !collapsing.current) return;
    collapsing.current = false;
    gridRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [expanded]);

  const toggle = () => {
    if (expanded) collapsing.current = true;
    setExpanded(!expanded);
  };

  return (
    <>
      <div
        ref={gridRef}
        id="athlete-grid"
        className="grid gap-[clamp(1rem,1.8vw,1.5rem)] sm:grid-cols-2 lg:grid-cols-4"
      >
        {athletes.map((athlete, i) => (
          <Reveal
            key={athlete.id}
            delay={(i % 4) * 0.05}
            className={expanded ? undefined : collapsedClass(i)}
          >
            <article className="group h-full overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy-400 hover:shadow-lg">
              <div className="overflow-hidden">
                <Visual
                  seed={athlete.seed}
                  mode={athlete.mode}
                  className="aspect-[3/4] !rounded-none transition-transform duration-500 group-hover:scale-[1.03]"
                  tag={athlete.image ? undefined : t('photoPending')}
                  src={athlete.image}
                  focus={athlete.focus}
                  zoom={athlete.zoom}
                  alt={athlete.detail ? `${athlete.name} — ${pick(athlete.detail, locale)}` : athlete.name}
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-[1rem] font-bold text-navy-950 leading-snug group-hover:text-navy-700 transition-colors">
                  {athlete.name}
                </h3>
                {athlete.detail ? (
                  <p className="mt-1.5 font-mono text-[0.72rem] text-ink-2">
                    {pick(athlete.detail, locale)}
                  </p>
                ) : null}
                {athlete.badge ? (
                  <div className="mt-3 border-t border-line pt-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 border border-navy-100 px-2.5 py-0.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.06em] text-navy-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-mag" />
                      {pick(athlete.badge, locale)}
                    </span>
                  </div>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls="athlete-grid"
            className="btn btn-out btn-sm"
          >
            {expanded ? t('showLess') : t('showMore')}
            {expanded ? (
              <ChevronUp size={14} aria-hidden="true" />
            ) : (
              <ChevronDown size={14} aria-hidden="true" />
            )}
          </button>
        </div>
      ) : null}
    </>
  );
}
