'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { paintVisual } from '@/lib/paintVisual';
import type { GalleryItem } from '@/types';

type Props = {
  items: GalleryItem[];
  index: number | null;
  captions: string[];
  labels: { dialog: string; close: string; previous: string; next: string };
  onClose: () => void;
  onStep: (direction: number) => void;
};

export default function Lightbox({ items, index, captions, labels, onClose, onStep }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;

  const step = useCallback((d: number) => onStep(d), [onStep]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, step]);

  useEffect(() => {
    if (index === null || items[index].image) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const item = items[index];
    const id = requestAnimationFrame(() => paintVisual(canvas, item.seed, item.mode));
    return () => cancelAnimationFrame(id);
  }, [index, items]);

  if (index === null) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={labels.dialog}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[95] flex items-center justify-center bg-[#081426]/95 p-[max(18px,env(safe-area-inset-left,0px))]"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={labels.close}
        className="absolute right-[max(16px,env(safe-area-inset-right,0px))] top-[max(16px,env(safe-area-inset-top,0px))] flex h-10 w-10 items-center justify-center rounded border border-white/25 text-white transition-colors hover:border-mag hover:bg-mag"
      >
        <X size={18} aria-hidden="true" />
      </button>

      <div className="flex w-full max-w-[1020px] flex-col gap-3.5">
        <div className="relative max-h-[70vh] aspect-[16/10] overflow-hidden rounded bg-navy-800">
          {items[index].image ? (
            // Contained, not cropped: the lightbox is where the whole frame should be visible.
            <Image
              src={items[index].image as string}
              alt={captions[index]}
              fill
              sizes="(min-width: 1060px) 1020px, 100vw"
              className="object-contain"
            />
          ) : (
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[0.78rem] text-white">{captions[index]}</span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={labels.previous}
              className="flex h-10 w-10 items-center justify-center rounded border border-white/25 text-white transition-colors hover:border-mag hover:bg-mag"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={labels.next}
              className="flex h-10 w-10 items-center justify-center rounded border border-white/25 text-white transition-colors hover:border-mag hover:bg-mag"
            >
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
