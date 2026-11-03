'use client';

import { useId, useRef, useState, type ReactNode } from 'react';

export type TabItem = { id: string; label: string; panel: ReactNode };

type Props = {
  items: TabItem[];
  label: string;
  onDark?: boolean;
};

/** Roving-focus tablist: arrow keys move between tabs, as WAI-ARIA expects. */
export default function Tabs({ items, label, onDark }: Props) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (index: number) => {
    setActive(index);
    refs.current[index]?.focus();
  };

  return (
    <>
      <div
        role="tablist"
        aria-label={label}
        className={`mb-6 flex flex-wrap gap-1 border-b ${onDark ? 'border-white/15' : 'border-line'}`}
      >
        {items.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${item.id}`}
              aria-controls={`${uid}-panel-${item.id}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') {
                  e.preventDefault();
                  move((i + 1) % items.length);
                }
                if (e.key === 'ArrowLeft') {
                  e.preventDefault();
                  move((i - 1 + items.length) % items.length);
                }
              }}
              className={`-mb-px border-b-[2.5px] px-4 py-3 font-display text-[0.9rem] font-semibold transition-all ${
                selected
                  ? onDark
                    ? 'border-mag text-white'
                    : 'border-navy-700 text-navy-900'
                  : onDark
                    ? 'border-transparent text-navy-200 hover:text-white'
                    : 'border-transparent text-ink-2 hover:text-navy-700'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item, i) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${uid}-panel-${item.id}`}
          aria-labelledby={`${uid}-tab-${item.id}`}
          hidden={i !== active}
        >
          {item.panel}
        </div>
      ))}
    </>
  );
}
