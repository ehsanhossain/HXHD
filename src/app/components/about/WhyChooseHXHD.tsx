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
    <section className="section bg-white relative overflow-hidden border-y border-[var(--line)]">
      {/* Deliberately unpatterned. A grid and a hatched wedge were tried here
          and both fought the panels for attention — the section carries its
          structure through the cards, not the ground. */}

      <div className="shell relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Statement */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-6">{t('sec.company')}</p>
              <h2 className="text-step-3 leading-[1.1] mb-6">{c.about.whyTitle}</h2>
              <div className="w-20 h-[6px] bg-[var(--brand-red)] mb-7" />
              <p className="text-[var(--steel)] leading-relaxed text-sm sm:text-base mb-9">
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
                  <article className="group relative h-full bg-[var(--paper-2)] border border-[var(--line)] cut-br overflow-hidden transition-all duration-300 hover:bg-white hover:border-[var(--brand-teal)] hover:-translate-y-1 hover:shadow-[0_10px_30px_-12px_rgba(13,20,24,0.25)]">
                    {/* A single sheen crossing the panel. The hatch that was
                        here read as red cross-hatching over the copy — this
                        moves without competing with the text. */}
                    <span
                      className="pointer-events-none absolute top-0 -left-[60%] h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[var(--brand-teal)]/12 to-transparent transition-all duration-[900ms] ease-out group-hover:left-[130%]"
                      aria-hidden
                    />

                    {/* Oversized outlined numeral, bottom-right, clipped by the
                        chamfer so it reads as printed onto the panel. */}
                    <span
                      className="absolute -bottom-5 -right-1 stroke-text text-[5rem] font-bold leading-none select-none tnum opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="relative p-6 sm:p-7">
                      <span className="grid place-items-center w-12 h-12 bg-white border border-[var(--line)] text-[var(--teal-on-light)] mb-6 transition-colors duration-300 group-hover:border-[var(--brand-teal)] group-hover:bg-[var(--brand-teal)] group-hover:text-white">
                        <Icon className="w-5 h-5" />
                      </span>

                      <h3 className="font-bold leading-snug mb-2.5 text-step-0 text-[var(--ink)]">
                        {p.title}
                      </h3>
                      <p className="text-sm text-[var(--steel)] leading-relaxed max-w-[34ch]">
                        {p.desc}
                      </p>
                    </div>

                    {/* Red rule down the leading edge, drawn top to bottom —
                        the same registration mark the dark sections use. */}
                    <span
                      className="absolute top-0 left-0 w-[3px] h-full bg-[var(--brand-red)] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out"
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
