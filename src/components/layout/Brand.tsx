import Image from 'next/image';
import { Link } from '@/i18n/routing';

type Props = {
  /** `mark` is the dancer symbol alone; `full` is the complete lockup with the name. */
  variant?: 'mark' | 'full';
  tone?: 'color' | 'white';
  height?: number;
  withWordmark?: boolean;
  wordmarkTop?: string;
  wordmarkBottom?: string;
  ariaLabel: string;
  className?: string;
};

const SIZES = {
  mark: { w: 321, h: 370 },
  full: { w: 558, h: 306 }
};

export default function Brand({
  variant = 'mark',
  tone = 'color',
  height = 50,
  withWordmark = false,
  wordmarkTop,
  wordmarkBottom,
  ariaLabel,
  className = ''
}: Props) {
  const { w, h } = SIZES[variant];
  const src = `/logo/${variant}-${tone}.png`;

  return (
    <Link href="/" aria-label={ariaLabel} className={`flex flex-none items-center gap-2.5 ${className}`}>
      <Image
        src={src}
        alt=""
        width={w}
        height={h}
        priority
        style={{ height, width: 'auto' }}
        className="select-none"
      />
      {withWordmark ? (
        <span className="hidden flex-col gap-0.5 border-l border-line pl-2.5 leading-[1.1] 2xl:flex">
          <span className="whitespace-nowrap font-display text-[0.73rem] font-bold uppercase tracking-[0.055em] text-navy">
            {wordmarkTop}
          </span>
          <span className="whitespace-nowrap font-display text-[0.73rem] font-bold uppercase tracking-[0.055em] text-mag">
            {wordmarkBottom}
          </span>
        </span>
      ) : null}
    </Link>
  );
}
