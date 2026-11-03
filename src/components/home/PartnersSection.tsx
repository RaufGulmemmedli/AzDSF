import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import SectionHead from '@/components/ui/SectionHead';
import Reveal from '@/components/ui/Reveal';
import { partners } from '@/data/federation';
import { pick } from '@/types';

export default function PartnersSection() {
  const t = useTranslations('Partners');
  const locale = useLocale();

  return (
    <section className="band" id="resurslar" aria-labelledby="part-h">
      <div className="wrap">
        <SectionHead
          eyebrow={t('eyebrow')}
          title={t('title')}
          id="part-h"
          right={
            <a
              href="https://www.worlddancesport.org/"
              rel="noopener noreferrer"
              target="_blank"
              className="tlink"
            >
              worlddancesport.org ↗
            </a>
          }
        />

        <div className="mb-[clamp(1.8rem,2.8vw,2.4rem)] grid items-center gap-[clamp(1.6rem,3vw,2.8rem)] md:grid-cols-[280px_minmax(0,1fr)]">
          <Reveal>
            <div className="flex items-center justify-center rounded-xl border border-line bg-white p-6 shadow-sm">
              <Image
                src="/logo/full-color.png"
                alt={t('logoAlt')}
                width={558}
                height={306}
                className="h-auto w-full max-w-[220px]"
              />
            </div>
          </Reveal>
          <p className="lead text-[0.96rem]">{t('body')}</p>
        </div>

        <Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((partner) => (
              <div
                key={partner.name.az}
                className="flex min-h-[105px] flex-col items-center justify-center gap-1.5 rounded-xl border border-line bg-white p-4 text-center shadow-sm transition-all hover:border-navy-300 hover:shadow-md"
              >
                <b className="font-display text-[0.98rem] font-bold text-navy-950">
                  {pick(partner.name, locale)}
                </b>
                <span className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.1em] text-ink-3">
                  {pick(partner.role, locale)}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
