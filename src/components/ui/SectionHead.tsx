import type { ReactNode } from 'react';

type Props = {
  eyebrow: string;
  title: string;
  id?: string;
  right?: ReactNode;
  onDark?: boolean;
};

export default function SectionHead({ eyebrow, title, id, right, onDark }: Props) {
  return (
    <div
      className={`mb-[clamp(1.8rem,2.8vw,2.6rem)] flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-b pb-4.5 ${
        onDark ? 'border-white/15' : 'border-line'
      }`}
    >
      <div>
        <p className={`eyebrow ${onDark ? '!text-navy-200 before:!bg-mag' : ''}`}>{eyebrow}</p>
        <h2 className={`h2 ${onDark ? 'text-white' : 'text-navy-950'}`} id={id}>
          {title}
        </h2>
      </div>
      {right ? <div className="flex flex-wrap items-center gap-3">{right}</div> : null}
    </div>
  );
}
