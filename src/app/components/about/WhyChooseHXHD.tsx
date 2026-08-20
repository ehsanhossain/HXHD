"use client";

import Link from 'next/link';
import {
  ArrowRight,
  Repeat,
  Factory,
  Gauge,
  Layers,
  Thermometer,
  Beaker,
  FileCheck,
  Headset,
} from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useI18n } from '@/i18n/LanguageProvider';

/**
 * One icon per reason, in the order the copy lists them. Kept here rather than
 * in the dictionary so translators never have to think about icon names.
 */
const ICONS = [Repeat, Factory, Gauge, Layers, Thermometer, Beaker, FileCheck, Headset];

export function WhyChooseHXHD() {
  const { c, t } = useI18n();

  return (
    <section className="section bg-[var(--ink)] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
      {/* A hatched wedge behind the statement column, so the eye lands there
          first rather than on eight equal boxes. */}
      <div
        className="absolute -left-32 -top-20 w-[36rem] h-[36rem] bg-hatch-red opacity-[0.16] rotate-12 hidden lg:block"
        aria-hidden
      />
      <div className="absolute left-0 top-0 h-full w-[3px] bg-[var(--brand-red)]" aria-hidden />

      <div className="shell relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Statement */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow eyebrow-on-dark mb-6">{t('sec.company')}</p>
              <h2 className="text-step-3 leading-[1.1] mb-6">{c.about.whyTitle}</h2>
              <div className="w-20 h-[6px] bg-[var(--brand-red)] mb-7" />
              <p className="text-white/60 leading-relaxed text-sm sm:text-base mb-9">
                {c.about.whyLead}
              </p>
              <Link href="/contact" className="btn btn-primary cut-br group">
                {t('cta.talkToTeam')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {/* Reasons */}
          <Stagger className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5" step={0.05}>
            {c.about.whyPoints.map((p, i) => {
              const Icon = ICONS[i] ?? Repeat;
              return (
                <StaggerItem key={p.title}>
                  <article className="group relative h-full bg-[var(--ink-2)] border border-white/10 cut-br overflow-hidden transition-colors duration-300 hover:border-[var(--brand-teal)]">
                    {/* Hatch fills in on hover — motion that suggests the
                        machined surface the rest of the site uses. */}
                    <span
                      className="absolute inset-0 bg-hatch-red opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      aria-hidden
                    />

                    {/* Oversized outlined numeral, bottom-right, clipped by the
                        chamfer so it reads as printed onto the panel. */}
                    <span
                      className="absolute -bottom-5 -right-1 stroke-text text-[5rem] font-bold leading-none select-none tnum opacity-25 group-hover:opacity-40 transition-opacity duration-300"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="relative p-6 sm:p-7">
                      <span className="grid place-items-center w-12 h-12 bg-[var(--ink)] border border-white/12 text-[var(--teal-on-dark)] mb-6 transition-colors duration-300 group-hover:border-[var(--brand-teal)] group-hover:text-white">
                        <Icon className="w-5 h-5" />
                      </span>

                      <h3 className="font-bold leading-snug mb-2.5 text-step-0">{p.title}</h3>
                      <p className="text-sm text-white/55 leading-relaxed max-w-[34ch]">
                        {p.desc}
                      </p>
                    </div>

                    {/* Red rule that draws itself across the foot on hover. */}
                    <span
                      className="absolute bottom-0 left-0 h-[3px] w-full bg-[var(--brand-red)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      aria-hidden
                    />
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
