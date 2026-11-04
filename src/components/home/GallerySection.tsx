'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Play, Square } from 'lucide-react';
import SectionHead from '@/components/ui/SectionHead';
import Visual from '@/components/ui/Visual';
import Lightbox from '@/components/ui/Lightbox';
import { gallery } from '@/data/gallery';
import { pick } from '@/types';

export default function GallerySection() {
  const t = useTranslations('Gallery');
  const locale = useLocale();
  const [index, setIndex] = useState<number | null>(null);

  const captions = gallery.map((item) => pick(item.caption, locale));

  return (
    <section className="band bg-surface" id="qalereya" aria-labelledby="gal-h">
      <div className="wrap">
        <SectionHead
          eyebrow={t('eyebrow')}
          title={t('title')}
          id="gal-h"
          right={<span className="tag">{t('note')}</span>}
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {gallery.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={captions[i]}
              className={`group relative block w-full overflow-hidden rounded-xl border border-line shadow-sm transition-all duration-300 hover:shadow-lg hover:border-navy-400 ${item.span}`}
            >
              <Visual
                seed={item.seed}
                mode={item.mode}
                className="!absolute inset-0 !rounded-none transition-transform duration-700 group-hover:scale-105"
                src={item.image}
                focus={item.focus}
                zoom={item.zoom}
                alt={captions[i]}
                sizes="(min-width: 768px) 50vw, 50vw"
              />
              <span className="absolute inset-0 z-[3] flex flex-col justify-end bg-gradient-to-t from-navy-950/95 via-navy-950/50 to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 text-left">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-0.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-md w-fit mb-2">
                  {item.kind === 'video' ? (
                    <Play size={10} aria-hidden="true" />
                  ) : (
                    <Square size={10} aria-hidden="true" />
                  )}
                  {item.kind === 'video' ? t('video') : t('photo')}
                </span>
                <span className="font-display text-[0.88rem] font-bold text-white line-clamp-2">
                  {captions[i]}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        items={gallery}
        index={index}
        captions={captions}
        labels={{
          dialog: t('dialogLabel'),
          close: t('close'),
          previous: t('previous'),
          next: t('next')
        }}
        onClose={() => setIndex(null)}
        onStep={(d) => setIndex((current) => (current === null ? null : (current + d + gallery.length) % gallery.length))}
      />
    </section>
  );
}
