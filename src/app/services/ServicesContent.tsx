"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
  FlaskConical, Factory, FileCheck2, PackageCheck, Headphones, Beaker,
  ArrowRight, MapPin,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { NewsletterStrip } from '../components/contact/NewsletterStrip';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useI18n } from '@/i18n/LanguageProvider';

import { BANGLADESH, CAPACITY, PRODUCTION_BASES } from '@/data/company';
import { PRODUCTS, ACTIVE_CATEGORIES } from '@/data/products';

/** Icons pair positionally with c.services.items. */
const SERVICE_ICONS = [FlaskConical, Beaker, Factory, FileCheck2, PackageCheck, Headphones];

export function ServicesContent() {
  const { t, c, fill } = useI18n();
  const bdBase = PRODUCTION_BASES.find((b) => b.country === 'Bangladesh')!;
  const SERVICES = c.services.items;
  const HOW_IT_WORKS = c.services.steps;
  /** Capacity labels pair positionally with CAPACITY from the data module. */
  const CAP_LABELS = [
    c.services.capWaterBased,
    c.services.capVdc,
    c.services.capLines,
    c.services.capVdcLines,
  ];

  return (
    <div className="bg-white">
      <PageHero
        eyebrowKey="page.services.eyebrow"
        titleKey="page.services.title"
        intro={fill(c.services.intro, { n: PRODUCTS.length, zone: c.zone })}
        crumbs={[{ labelKey: 'nav.services' }]}
      />

      {/* Services grid */}
      <section className="section">
        <div className="shell">
          <Reveal className="max-w-3xl mb-14">
            <p className="eyebrow mb-5">{c.services.whatWeDo}</p>
            <h2 className="text-step-3 mb-5">{c.services.whatWeDoTitle}</h2>
            <p className="text-[var(--ink-3)] text-step-0 leading-relaxed">
              {c.services.whatWeDoLead}
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)]">
            {SERVICES.map((s, idx) => (
              <StaggerItem key={s.title}>
                <div className="group relative flex flex-col h-full bg-white p-8 hover:bg-[var(--ink)] transition-colors duration-300">
                  <span className="index-num absolute top-6 right-7 transition-colors group-hover:text-white/35">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <span className="grid place-items-center w-12 h-12 border border-[var(--line-strong)] text-[var(--brand-teal)] mb-6 transition-all duration-300 group-hover:bg-[var(--brand-teal)] group-hover:border-[var(--brand-teal)] group-hover:text-white">
                    {(() => { const Icon = SERVICE_ICONS[idx]; return <Icon className="w-[22px] h-[22px]" />; })()}
                  </span>

                  <h3 className="text-step-1 font-bold mb-3 leading-tight transition-colors group-hover:text-white">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[var(--steel)] leading-relaxed mb-6 transition-colors group-hover:text-white/55">
                    {s.body}
                  </p>

                  <ul className="mt-auto space-y-2 pt-5 border-t border-[var(--line)] transition-colors group-hover:border-white/12">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--ink-3)] transition-colors group-hover:text-white/70 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-[var(--brand-red)] shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Bangladesh supply */}
      <section className="section bg-[var(--ink)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-60" aria-hidden />

        <div className="shell relative grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow eyebrow-on-dark mb-6">{c.services.bdEyebrow}</p>
              <h2 className="text-step-3 mb-6">{c.services.bdTitle}</h2>
              <div className="w-20 h-[6px] bg-[var(--brand-red)] mb-8" />
              <p className="text-step-1 text-white/70 font-light leading-relaxed mb-8 max-w-2xl">
                {fill(c.services.bdBody, {
                  investment: BANGLADESH.investmentLabel,
                  entity: bdBase.entity,
                  zone: c.zone,
                  jobs: BANGLADESH.jobs,
                  date: c.signedOn,
                })}
              </p>
              <p className="text-sm text-white/45 mb-10 max-w-2xl">{c.witness}.</p>
            </Reveal>

            <Stagger className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10">
              {CAPACITY.map((cap, i) => (
                <StaggerItem key={cap.label}>
                  <div className="bg-[var(--ink)] p-5 h-full">
                    <p className="text-step-2 font-bold text-[var(--brand-teal)] leading-none mb-1 tnum">
                      {cap.value}
                    </p>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/50 mb-2">
                      {cap.unit}
                    </p>
                    <p className="text-xs font-bold text-white/85 leading-snug">
                      {CAP_LABELS[i]}
                    </p>
                    <p className="text-[0.7rem] text-white/60 mt-1">{c.services.capScope}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal direction="left" className="lg:col-span-5" delay={0.1}>
            <div className="relative cut-tr-lg overflow-hidden border border-white/12">
              <Image
                src="/images/about/factory.jpg"
                alt="Aerial view of a Hongxing Hongda manufacturing campus"
                width={400}
                height={225}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="mt-6 border border-white/12">
              {PRODUCTION_BASES.map((b) => (
                <div
                  key={b.entity}
                  className={`flex items-start gap-3 px-5 py-4 border-b border-white/10 last:border-b-0 ${
                    b.primary ? 'bg-[var(--brand-teal)]/12' : ''
                  }`}
                >
                  <MapPin
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      b.primary ? 'text-[var(--teal-on-dark)]' : 'text-white/70'
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white leading-snug">{b.entity}</p>
                    <p className="text-xs text-white/50 mt-0.5">
                      {b.city} · {b.country}
                    </p>
                    {b.note && (
                      <p className="text-xs text-[var(--teal-on-dark)] mt-1">{b.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-[var(--paper-2)] border-y border-[var(--line)]">
        <div className="shell">
          <Reveal className="max-w-2xl mb-12">
            <p className="eyebrow mb-5">{c.services.howEyebrow}</p>
            <h2 className="text-step-3">{c.services.howTitle}</h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((s, i) => (
              <StaggerItem key={s.step}>
                <div className="relative bg-white border border-[var(--line)] p-7 h-full">
                  <span
                    aria-hidden
                    className="stroke-text text-[3rem] font-bold leading-none block mb-4 tnum"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-bold text-step-1 mb-2 leading-snug">{s.step}</h3>
                  <p className="text-sm text-[var(--steel)] leading-relaxed">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-12 flex flex-wrap gap-3" delay={0.1}>
            <Link href="/contact" className="btn btn-primary cut-br group">
              {t('cta.startEnquiry')}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/products" className="btn btn-ghost">
              {fill(c.services.browseCats, { n: ACTIVE_CATEGORIES.length })}
            </Link>
          </Reveal>
        </div>
      </section>

      <NewsletterStrip />
    </div>
  );
}
