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
      <div className="absolute inset-0 bg-grid-dark opacity-60" aria-hidden />
      {/* A red wash on one edge, so the section reads as a statement rather
          than another list on a dark background. */}
      <div
        className="absolute -right-24 top-0 h-full w-2/5 bg-hatch-red opacity-[0.07] hidden lg:block"
        aria-hidden
      />

      <div className="shell relative">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Statement column. Sticky was tried here and measured as not
              holding — the reveal wrapper it would sit on is a motion element
              — so it scrolls with the rest rather than carrying a class that
              does nothing. */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow eyebrow-on-dark mb-6">{t('sec.company')}</p>
              <h2 className="text-step-3 leading-[1.12] mb-6">{c.about.whyTitle}</h2>
              <div className="w-20 h-[6px] bg-[var(--brand-red)] mb-7" />
              <p className="text-white/65 leading-relaxed text-sm sm:text-base mb-8">
                {c.about.whyLead}
              </p>
              <Link href="/contact" className="btn btn-primary cut-br group">
                {t('cta.talkToTeam')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          {/* Reasons */}
          <Stagger className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {c.about.whyPoints.map((p, i) => {
              const Icon = ICONS[i] ?? Repeat;
              return (
                <StaggerItem key={p.title}>
                  <div className="group h-full bg-[var(--ink)] p-6 sm:p-7 hover:bg-[var(--ink-2)] transition-colors duration-300 relative">
                    <span
                      className="absolute top-5 right-6 text-xs font-bold tnum text-white/15 group-hover:text-[var(--brand-red)] transition-colors"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="grid place-items-center w-11 h-11 border border-white/15 text-[var(--teal-on-dark)] mb-5 group-hover:border-[var(--brand-teal)] transition-colors">
                      <Icon className="w-5 h-5" />
                    </span>

                    <h3 className="font-bold leading-snug mb-2.5">{p.title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{p.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
