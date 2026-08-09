"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Factory, ShieldCheck } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Counter } from '@/components/motion/Counter';
import { useT } from '@/i18n/LanguageProvider';

const STATS = [
  { to: 26, suffix: '', label: 'Years since founding', note: 'Established 2000' },
  { to: PRODUCTS.length, suffix: '', label: 'Products in catalogue', note: 'Full range' },
  { to: CATEGORIES.length, suffix: '', label: 'Product categories', note: 'Across the portfolio' },
  { to: 2, suffix: '', label: 'Production bases', note: 'China + Bangladesh' },
];

export function CredibilityAndCTA() {
  const t = useT();

  return (
    <>
      {/* ── Credibility ─────────────────────────────────────── */}
      <section className="section bg-[var(--ink)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-60" aria-hidden />
        <div
          className="absolute top-0 right-0 h-full w-[30%] bg-[var(--brand-teal)]/12 hidden lg:block"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
          aria-hidden
        />

        <div className="shell relative grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6">{t('sec.company')}</p>
              <h2 className="text-step-3 mb-6">{t('sec.companyTitle')}</h2>
              <div className="w-20 h-[6px] bg-[var(--brand-red)] mb-8" />
              <p className="text-step-1 text-white/70 leading-relaxed font-light mb-10 max-w-2xl">
                For more than 20 years, HXHD has delivered stable, scalable chemical
                solutions for coatings, waterproofing, adhesives and infrastructure.
                With independent R&amp;D and multi-base manufacturing, we support
                customers who demand consistency, customisation and long-term supply
                reliability.
              </p>
            </Reveal>

            <Stagger className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-10">
              {STATS.map((s) => (
                <StaggerItem key={s.label}>
                  <div className="bg-[var(--ink)] p-5 h-full">
                    <Counter
                      to={s.to}
                      className="block text-step-2 font-bold text-[var(--brand-teal)] leading-none mb-2"
                    />
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-white/85 leading-snug">
                      {s.label}
                    </p>
                    <p className="text-[0.7rem] text-white/40 mt-1">{s.note}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.1}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn btn-primary cut-br group">
                  About HXHD
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link href="/contact" className="btn btn-on-dark">
                  Manufacturing &amp; Quality
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Real facility imagery */}
          <Reveal direction="left" className="lg:col-span-5" delay={0.12}>
            <div className="relative">
              <div className="relative cut-tr-lg overflow-hidden border border-white/12">
                <Image
                  src="/images/about/company.jpg"
                  alt="HXHD — Hubei Hongxing Hongda New Materials head office signage"
                  width={1080}
                  height={800}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              <div className="relative -mt-10 ml-8 sm:ml-14 w-2/3 border-2 border-[var(--ink)] cut-br overflow-hidden shadow-2xl">
                <Image
                  src="/images/about/factory.jpg"
                  alt="Aerial view of the HXHD manufacturing campus"
                  width={400}
                  height={225}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 60vw, 26vw"
                />
              </div>

              <div className="flex gap-6 mt-8 ml-1">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-white/55">
                  <Factory className="w-4 h-4 text-[var(--brand-teal)]" /> Own facility
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-white/55">
                  <ShieldCheck className="w-4 h-4 text-[var(--brand-teal)]" /> QC tested
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Consultation CTA ────────────────────────────────── */}
      <section className="bg-[var(--brand-teal)] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-hatch"
          style={{ filter: 'invert(1)' }}
          aria-hidden
        />
        <div className="shell relative py-14 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <h2 className="text-step-2 text-white mb-2">
              Looking for the right formulation outcome?
            </h2>
            <p className="text-white/80 text-step-0">
              Talk to HXHD&rsquo;s technical team about your performance targets,
              substrates and process conditions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/contact" className="btn btn-primary cut-br whitespace-nowrap">
              Technical Consultation
            </Link>
            <Link
              href="/contact"
              className="btn bg-white text-[var(--brand-teal-dark)] hover:bg-[var(--ink)] hover:text-white whitespace-nowrap"
            >
              Request a Sample
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
