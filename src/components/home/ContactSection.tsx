'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import SectionHead from '@/components/ui/SectionHead';

const FIELD =
  'rounded-lg border border-white/20 bg-white/[0.07] px-3.5 py-2.5 text-[0.92rem] text-white placeholder:text-navy-200/60 transition-all focus:border-white focus:bg-white/[0.12] focus:outline-none';
const LABEL = 'font-mono text-[0.66rem] font-medium uppercase tracking-[0.1em] text-navy-200';

export default function ContactSection() {
  const t = useTranslations('Contact');
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState('');

  const topics = [
    t('topicMembership'),
    t('topicAccreditation'),
    t('topicEntry'),
    t('topicResults'),
    t('topicMedia'),
    t('topicOther')
  ];

  const info = [
    { label: t('infoAddress'), value: t('pending') },
    { label: t('infoEmail'), value: t('pending') },
    { label: t('infoPhone'), value: t('pending') },
    { label: t('infoHours'), value: t('infoHoursValue') }
  ];

  return (
    <section className="band bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white" id="elaqe" aria-labelledby="cont-h">
      <div className="wrap">
        <SectionHead eyebrow={t('eyebrow')} title={t('title')} id="cont-h" onDark />

        <div className="grid gap-[clamp(2rem,3.6vw,3.6rem)] lg:grid-cols-2">
          <form
            ref={formRef}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              setStatus(formRef.current?.checkValidity() ? t('demoNotice') : t('validation'));
            }}
          >
            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="mb-3.5 flex flex-col gap-1.5">
                <label className={LABEL} htmlFor="f-name">
                  {t('name')}
                </label>
                <input
                  id="f-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder={t('namePlaceholder')}
                  className={FIELD}
                />
              </div>
              <div className="mb-3.5 flex flex-col gap-1.5">
                <label className={LABEL} htmlFor="f-mail">
                  {t('email')}
                </label>
                <input
                  id="f-mail"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="ad@example.com"
                  className={FIELD}
                />
              </div>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="mb-3.5 flex flex-col gap-1.5">
                <label className={LABEL} htmlFor="f-topic">
                  {t('topic')}
                </label>
                <select id="f-topic" name="topic" className={`${FIELD} bg-navy-950`}>
                  {topics.map((topic) => (
                    <option key={topic} value={topic} className="bg-navy-950 text-white">
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3.5 flex flex-col gap-1.5">
                <label className={LABEL} htmlFor="f-city">
                  {t('city')}
                </label>
                <input
                  id="f-city"
                  name="city"
                  type="text"
                  placeholder={t('cityPlaceholder')}
                  className={FIELD}
                />
              </div>
            </div>

            <div className="mb-3.5 flex flex-col gap-1.5">
              <label className={LABEL} htmlFor="f-msg">
                {t('message')}
              </label>
              <textarea
                id="f-msg"
                name="message"
                rows={4}
                required
                placeholder={t('messagePlaceholder')}
                className={`${FIELD} min-h-[96px] resize-y`}
              />
            </div>

            <button type="submit" className="btn btn-mag">
              {t('send')}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
            <p className="mt-3 min-h-[1.4rem] font-mono text-[0.8rem] text-navy-200" role="status">
              {status}
            </p>
          </form>

          <div>
            {info.map((row, i) => (
              <div
                key={row.label}
                className={`flex gap-4 border-b border-white/15 py-4 ${i === 0 ? 'border-t' : ''}`}
              >
                <b className="w-[105px] flex-none pt-0.5 font-mono text-[0.66rem] font-medium uppercase tracking-[0.1em] text-navy-200">
                  {row.label}
                </b>
                <span className="text-[0.92rem] font-medium text-white">{row.value}</span>
              </div>
            ))}
            <p className="mt-6 text-[0.8rem] leading-relaxed text-navy-300">{t('note')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
