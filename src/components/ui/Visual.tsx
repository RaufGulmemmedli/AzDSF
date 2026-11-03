'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { paintVisual } from '@/lib/paintVisual';
import type { VisualMode } from '@/types';

type Props = {
  seed: number;
  mode?: VisualMode;
  className?: string;
  /** Small caption chip drawn over the bottom-left corner. */
  tag?: string;
  /** Photograph under `/public`. When set it replaces the generated composition. */
  src?: string;
  /** Describes the photograph; only read when `src` is set. */
  alt?: string;
  /** Rendered width of the box, for the `next/image` srcset. */
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
};

/**
 * Cover art for a card or panel. Renders the photograph when one exists and
 * falls back to the generated composition where it does not, so a slot can be
 * filled later by adding `src` alone — the surrounding layout never changes.
 */
export default function Visual({
  seed,
  mode = 'brand',
  className = '',
  tag,
  src,
  alt = '',
  sizes = '100vw',
  priority,
  children
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (src) return;

    const canvas = ref.current;
    if (!canvas) return;

    const draw = () => paintVisual(canvas, seed, mode);
    draw();

    // Tab panels mount at zero size, so repaint when the box actually gets one.
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [seed, mode, src]);

  return (
    <div className={`visual ${mode === 'light' ? 'visual-light' : ''} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <canvas ref={ref} aria-hidden="true" className="absolute inset-0 block h-full w-full" />
      )}
      {tag ? <span className="vtag">{tag}</span> : null}
      {children}
    </div>
  );
}
