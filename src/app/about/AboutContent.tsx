"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
  Factory,
  ShieldCheck,
  Award,
  Globe,
  MapPin,
  ArrowRight,
  FlaskConical,
  Leaf,
  Layers,
  Sparkles,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { NewsletterStrip } from '../components/contact/NewsletterStrip';
import { AboutLeadership } from '../components/about/AboutLeadership';
import { WhyChooseHXHD } from '../components/about/WhyChooseHXHD';
import { AboutCertificates } from '../components/about/AboutCertificates';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { Counter } from '@/components/motion/Counter';
import { useI18n } from '@/i18n/LanguageProvider';

import {
  COMPANY,
  BANGLADESH,
  CAPACITY,
  PRODUCTION_BASES,
  MILESTONES,
} from '@/data/company';
import { PRODUCTS, CATEGORIES } from '@/data/products';

const VALUE_ICONS = [FlaskConical, Layers, Globe, Leaf];

export function AboutContent() {
  const { t, c, fill } = useI18n();
  const bdBase = PRODUCTION_BASES.find((b) => b.country === 'Bangladesh')!;

  const STATS = [
    { to: 26, suffix: '+', label: c.home.statYears, note: c.home.statYearsNote },
    { to: 200000, suffix: ' t', label: 'Annual Emulsion Capacity', note: 'Flagship China plant' },
    { to: PRODUCTS.length, label: c.home.statProducts, note: c.home.statProductsNote },
    { to: 500, suffix: '+', label: 'Local Jobs Created', note: 'BEPZA Mirsharai Plant' },
  ];

  return (
    <div className="bg-white">
      <PageHero
        eyebrowKey="page.about.eyebrow"
        titleKey="page.about.title"
        intro={c.about.intro}
        crumbs={[{ labelKey: 'nav.about' }]}
      />

      {/* ── Section 1: Lead Story & Heritage ────────────────────── */}
      <section className="section bg-white">
        <div className="shell">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-4">{t('sec.company')}</p>
                <h2 className="text-step-3 mb-6 leading-tight">
                  {COMPANY.legalName}
                </h2>
                <div className="w-16 h-1 bg-[var(--brand-red)] mb-8" />
                <p className="text-step-0 text-[var(--ink-2)] leading-relaxed mb-6">
                  {c.about.leadStory}
                </p>
              </Reveal>

              {/* Mission & Vision Box */}
              <Reveal delay={0.08}>
                <div className="grid sm:grid-cols-2 gap-6 bg-[var(--paper-2)] p-6 border border-[var(--line)] ticks my-8">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--teal-on-light)] mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      {c.about.missionTitle}
                    </h3>
                    <p className="text-sm text-[var(--ink-3)] leading-relaxed">
                      {c.about.mission}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--brand-red)] mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Vision
                    </h3>
                    <p className="text-sm text-[var(--ink-3)] leading-relaxed">
                      {c.about.vision}
                    </p>
                  </div>
                </div>
              </Reveal>

              <Stagger className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)] mt-8">
                {STATS.map((s) => (
                  <StaggerItem key={s.label}>
                    <div className="bg-white p-5 h-full">
                      <div className="flex items-baseline">
                        <Counter
                          to={s.to}
                          className="text-step-2 font-bold text-[var(--brand-red)] leading-none"
                        />
                        {s.suffix && (
                          <span className="text-step-1 font-bold text-[var(--brand-red)] ml-0.5">
                            {s.suffix}
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--ink)] mt-2 leading-snug">
                        {s.label}
                      </p>
                      <p className="text-[0.7rem] text-[var(--steel)] mt-1">{s.note}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Image Composition */}
            <Reveal direction="left" className="lg:col-span-5" delay={0.1}>
              <div className="relative">
                <div className="relative cut-tr-lg overflow-hidden border border-[var(--line)] shadow-lg">
                  <Image
                    src="/images/about/company.jpg"
                    alt="HXHD — Hubei Hongxing Hongda New Materials head office"
                    width={1080}
                    height={800}
                    priority
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>

                <div className="relative -mt-12 ml-8 sm:ml-12 w-3/4 border-2 border-white cut-br overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about/factory.jpg"
                    alt="Aerial view of the HXHD manufacturing campus"
                    width={400}
                    height={225}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 1024px) 60vw, 30vw"
                  />
                </div>

                <div className="flex flex-wrap gap-6 mt-6 ml-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink-3)]">
                    <Factory className="w-4 h-4 text-[var(--brand-teal)]" /> {c.home.ownFacility}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink-3)]">
                    <ShieldCheck className="w-4 h-4 text-[var(--brand-teal)]" /> {c.home.qcTested}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Section 2: Core Values & Principles ─────────────────── */}
      <section className="section bg-[var(--paper-2)] border-y border-[var(--line)]">
        <div className="shell">
          <Reveal className="max-w-3xl mb-14">
            <p className="eyebrow mb-4">{c.about.valuesTitle}</p>
            <h2 className="text-step-3 mb-4 leading-tight">
              Principles that Drive Every Batch & Formula
            </h2>
            <p className="text-[var(--ink-3)] leading-relaxed">
              Our culture unites chemical research precision with industrial manufacturing discipline.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.about.values.map((v, i) => {
              const Icon = VALUE_ICONS[i] || Award;
              return (
                <StaggerItem key={v.title}>
                  <div className="group relative flex flex-col h-full bg-white p-7 border border-[var(--line)] hover:border-[var(--brand-teal)] hover:shadow-md transition-all duration-300">
                    <span className="index-num absolute top-6 right-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="grid place-items-center w-12 h-12 bg-[var(--paper-2)] border border-[var(--line)] text-[var(--brand-teal)] mb-6 transition-colors group-hover:bg-[var(--brand-teal)] group-hover:text-white">
                      <Icon className="w-5 h-5" />
                    </span>

                    <h3 className="text-step-1 font-bold mb-3 leading-snug text-[var(--ink)]">
                      {v.title}
                    </h3>
                    <p className="text-sm text-[var(--steel)] leading-relaxed mt-auto">
                      {v.desc}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <WhyChooseHXHD />

      <AboutLeadership />

      {/* ── Section 3: Manufacturing Bases (China + Bangladesh) ─── */}
      <section className="section bg-[var(--ink)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-60" aria-hidden />

        <div className="shell relative">
          <div className="max-w-3xl mb-14">
            <Reveal>
              <p className="eyebrow eyebrow-on-dark mb-4">{c.about.facilitiesTitle}</p>
              <h2 className="text-step-3 mb-5 leading-tight">{c.about.facilitiesLead}</h2>
              <div className="w-20 h-[5px] bg-[var(--brand-red)] mb-6" />
              <p className="text-white/70 text-step-0 leading-relaxed">
                {fill(c.services.bdBody, {
                  investment: BANGLADESH.investmentLabel,
                  entity: bdBase.entity,
                  zone: c.zone,
                  jobs: BANGLADESH.jobs,
                  date: c.signedOn,
                })}
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Bases Cards */}
            <div className="lg:col-span-7 space-y-4">
              {PRODUCTION_BASES.map((b) => (
                <div
                  key={b.entity}
                  className={`p-6 border transition-all ${
                    b.primary
                      ? 'bg-[var(--brand-teal)]/15 border-[var(--brand-teal)]'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <MapPin
                        className={`w-5 h-5 shrink-0 mt-0.5 ${
                          b.primary ? 'text-[var(--teal-on-dark)]' : 'text-white/70'
                        }`}
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-step-0 font-bold text-white leading-snug">
                            {b.entity}
                          </h4>
                          {b.primary && (
                            <span className="px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider bg-[var(--brand-teal-dark)] text-white">
                              Bangladesh Flagship
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/60 mt-1">
                          {b.city} · {b.country}
                        </p>
                        {b.note && (
                          <p className="text-xs text-[var(--teal-on-dark)] font-medium mt-2">
                            {b.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Capacity Stats */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 p-8">
              <h3 className="text-step-1 font-bold text-white mb-6 flex items-center gap-2">
                <Factory className="w-5 h-5 text-[var(--brand-teal)]" />
                Verified Capacity Figures
              </h3>
              <div className="space-y-5">
                {CAPACITY.map((cap) => (
                  <div key={cap.label} className="pb-4 border-b border-white/10 last:border-b-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-step-2 font-bold text-[var(--brand-teal)] tnum">
                        {cap.value}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-white/50 font-bold">
                        {cap.unit}
                      </span>
                    </div>
                    <p className="text-sm text-white/85 font-medium mt-1">{cap.label}</p>
                    <p className="text-xs text-white/60">{cap.scope}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutCertificates />

      {/* ── Section 4: Interactive Timeline / Milestones ────────── */}
      <section className="section bg-white">
        <div className="shell max-w-5xl">
          <Reveal className="mb-14 text-center max-w-3xl mx-auto">
            <p className="eyebrow mb-4">{c.about.heritageTitle}</p>
            <h2 className="text-step-3 mb-4 leading-tight">{c.about.heritageLead}</h2>
          </Reveal>

          <div className="relative border-l-2 border-[var(--line-strong)] ml-4 md:ml-8 space-y-12 py-2">
            {MILESTONES.map((m, idx) => (
              <Reveal key={m.year} delay={idx * 0.06}>
                <div className="relative pl-8 md:pl-10 group">
                  {/* Timeline Dot */}
                  <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[var(--brand-red)] transition-transform duration-200 group-hover:scale-125" />

                  <div className="bg-[var(--paper-2)] border border-[var(--line)] p-6 md:p-8 hover:border-[var(--brand-teal)] transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-0.5 bg-[var(--brand-red)] text-white text-xs font-bold uppercase tracking-wider">
                        {m.year}
                      </span>
                      <h3 className="text-step-1 font-bold text-[var(--ink)] leading-snug">
                        {c.milestones[idx]?.title || m.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[var(--ink-3)] leading-relaxed mt-3">
                      {c.milestones[idx]?.body || m.body}
                    </p>

                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* ── Section 6: Consultation CTA ───────────────────────── */}
      <section className="bg-[var(--brand-red)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-30" aria-hidden />
        <div className="shell relative py-16 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="max-w-2xl">
            <h2 className="text-step-2 text-white mb-3 font-bold">
              {c.about.ctaTitle}
            </h2>
            <p className="text-white text-step-0 leading-relaxed">
              {c.about.ctaLead}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 shrink-0">
            <Link href="/contact" className="btn bg-white text-[var(--brand-red)] hover:bg-[var(--ink)] hover:text-white cut-br">
              {c.about.ctaContact}
            </Link>
            <Link href="/products" className="btn btn-on-dark">
              {c.about.ctaCatalogue}
            </Link>
          </div>
        </div>
      </section>

      <NewsletterStrip />
    </div>
  );
}
