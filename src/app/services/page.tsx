import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  FlaskConical, Factory, FileCheck2, PackageCheck, Headphones, Beaker,
  ArrowRight, MapPin,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { NewsletterStrip } from '../components/contact/NewsletterStrip';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { BANGLADESH, CAPACITY, PRODUCTION_BASES } from '@/data/company';
import { PRODUCTS, ACTIVE_CATEGORIES } from '@/data/products';

export const metadata: Metadata = {
  title: 'Services | HXHD Bangladesh',
  description:
    'Technical consultation, OEM and custom formulation, local supply from the BEPZA Mirsharai plant, documentation and after-sales support for Bangladesh manufacturers.',
};

const SERVICES = [
  {
    icon: FlaskConical,
    title: 'Technical consultation',
    body: 'Bring your substrate, performance target and process conditions. Our team recommends the emulsion grade and starting formulation, and reviews trial results with you.',
    points: ['Grade selection by application', 'Starting formulations', 'Trial troubleshooting'],
  },
  {
    icon: Beaker,
    title: 'Custom formulation & OEM',
    body: 'Products adjusted to your specification — solid content, Tg, viscosity, film properties — or manufactured under your own brand and packaging.',
    points: ['Spec-to-order grades', 'Private label & packaging', 'Pilot to production scale-up'],
  },
  {
    icon: Factory,
    title: 'Local manufacturing & supply',
    body: `Production inside the ${BANGLADESH.zone} shortens lead times and removes import friction for Bangladesh customers.`,
    points: ['In-country production', 'Shorter lead times', 'Reduced import dependency'],
  },
  {
    icon: FileCheck2,
    title: 'Documentation & compliance',
    body: 'Technical data sheets, safety data sheets, certificates of analysis and the export paperwork required to clear and specify material.',
    points: ['TDS / SDS', 'Certificate of analysis', 'Export documentation'],
  },
  {
    icon: PackageCheck,
    title: 'Samples & trials',
    body: 'Sample quantities for laboratory and line trials before commitment, with batch data so results are reproducible at scale.',
    points: ['Lab & line sample sizes', 'Batch traceability', 'Scale-up guidance'],
  },
  {
    icon: Headphones,
    title: 'After-sales support',
    body: 'Continuing support once a grade is in production — batch consistency questions, process drift, and reformulation as your product changes.',
    points: ['Batch consistency review', 'Process drift diagnosis', 'Ongoing reformulation'],
  },
];

const HOW_IT_WORKS = [
  { step: 'Tell us the application', body: 'Substrate, environment, performance target and the process you run.' },
  { step: 'We recommend a grade', body: 'A product from the catalogue, or an adjusted specification where needed.' },
  { step: 'Sample and trial', body: 'Sample quantity with full batch data so the trial is reproducible.' },
  { step: 'Supply and support', body: 'Production supply, documentation and continuing technical review.' },
];

export default function ServicesPage() {
  const bdBase = PRODUCTION_BASES.find((b) => b.country === 'Bangladesh')!;

  return (
    <div className="bg-white">
      <PageHero
        eyebrowKey="page.services.eyebrow"
        titleKey="page.services.title"
        intro={`From grade selection to production supply — backed by ${PRODUCTS.length} catalogue products, four production bases and a plant inside the ${BANGLADESH.zone}.`}
        crumbs={[{ labelKey: 'nav.services' }]}
      />

      {/* Services grid */}
      <section className="section">
        <div className="shell">
          <Reveal className="max-w-3xl mb-14">
            <p className="eyebrow mb-5">What we do</p>
            <h2 className="text-step-3 mb-5">Six ways the team supports your line</h2>
            <p className="text-[var(--ink-3)] text-step-0 leading-relaxed">
              Hongxing Hongda operates as an integrated group — R&amp;D, production,
              sales and after-sales under one roof — so technical answers come from
              the people who make the material.
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
                    <s.icon className="w-[22px] h-[22px]" />
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
              <p className="eyebrow mb-6">Supplied from Bangladesh</p>
              <h2 className="text-step-3 mb-6">
                A production base inside the BEPZA Economic Zone
              </h2>
              <div className="w-20 h-[6px] bg-[var(--brand-red)] mb-8" />
              <p className="text-step-1 text-white/70 font-light leading-relaxed mb-8 max-w-2xl">
                Hongxing Hongda committed{' '}
                <span className="text-white font-bold">{BANGLADESH.investmentLabel}</span>{' '}
                with Mingda to build {bdBase.entity} in the {BANGLADESH.zone} — a
                project expected to create{' '}
                <span className="text-white font-bold">{BANGLADESH.jobs}+</span> local
                positions. The agreement was signed on {BANGLADESH.signedOn}.
              </p>
              <p className="text-sm text-white/45 mb-10 max-w-2xl">{BANGLADESH.witness}.</p>
            </Reveal>

            <Stagger className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border border-white/10">
              {CAPACITY.map((c) => (
                <StaggerItem key={c.label}>
                  <div className="bg-[var(--ink)] p-5 h-full">
                    <p className="text-step-2 font-bold text-[var(--brand-teal)] leading-none mb-1 tnum">
                      {c.value}
                    </p>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-white/50 mb-2">
                      {c.unit}
                    </p>
                    <p className="text-xs font-bold text-white/85 leading-snug">{c.label}</p>
                    <p className="text-[0.7rem] text-white/35 mt-1">{c.scope}</p>
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
                      b.primary ? 'text-[var(--brand-teal)]' : 'text-white/35'
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white leading-snug">{b.entity}</p>
                    <p className="text-xs text-white/50 mt-0.5">
                      {b.city} · {b.country}
                    </p>
                    {b.note && (
                      <p className="text-xs text-[var(--brand-teal)] mt-1">{b.note}</p>
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
            <p className="eyebrow mb-5">How it works</p>
            <h2 className="text-step-3">From enquiry to production supply</h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((s, i) => (
              <StaggerItem key={s.step}>
                <div className="relative bg-white border border-[var(--line)] p-7 h-full">
                  <span className="stroke-text text-[3rem] font-bold leading-none block mb-4 tnum">
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
              Start an enquiry
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/products" className="btn btn-ghost">
              Browse {ACTIVE_CATEGORIES.length} categories
            </Link>
          </Reveal>
        </div>
      </section>

      <NewsletterStrip />
    </div>
  );
}
