'use client';

import { useEffect, useState } from 'react';

type Props = {
  /** ISO date of the event this counts down to. */
  target: string;
  label: string;
  units: { days: string; hours: string; minutes: string; seconds: string };
};

function split(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return [
    Math.floor(total / 86400),
    Math.floor((total % 86400) / 3600),
    Math.floor((total % 3600) / 60),
    total % 60
  ];
}

export default function Countdown({ target, label, units }: Props) {
  // Render zeros on the server so the markup matches; the real values arrive on mount.
  const [parts, setParts] = useState<number[] | null>(null);

  useEffect(() => {
    const end = new Date(target).getTime();
    const tick = () => setParts(split(end - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const labels = [units.days, units.hours, units.minutes, units.seconds];
  const shown = parts ?? [0, 0, 0, 0];

  return (
    <div className="mt-3.5 flex gap-1.5 border-t border-line pt-3" aria-label={label}>
      {shown.map((value, i) => (
        <div key={labels[i]} className="flex-1 rounded-[3px] bg-surface px-1 py-1.5 text-center">
          <b className="block font-mono text-base font-normal leading-none text-navy tabular-nums">
            {String(value).padStart(2, '0')}
          </b>
          <span className="mt-1 block font-mono text-[0.56rem] uppercase tracking-[0.08em] text-ink-2">
            {labels[i]}
          </span>
        </div>
      ))}
    </div>
  );
}
