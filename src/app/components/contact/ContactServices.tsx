"use client";

import { Droplets, PaintBucket, Factory, ArrowRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';

/**
 * The source site publishes a single sales contact rather than per-department
 * addresses, so every route below points at the real one instead of inventing
 * department mailboxes.
 */
const SERVICES = [
  {
    icon: Droplets,
    title: 'Construction & Waterproofing Systems',
    desc: 'Cement-based coatings, thermal insulation mortar, bitumen systems.',
  },
  {
    icon: PaintBucket,
    title: 'Coatings & Additives Formulation',
    desc: 'Architectural emulsions, interior/exterior systems, functional additives.',
  },
  {
    icon: Factory,
    title: 'OEM & Manufacturing Partnership',
    desc: 'Custom formulation, in-plant support and export-ready supply.',
  },
];

export function ContactServices() {
  return (
    <section className="section bg-[var(--paper-2)] border-y border-[var(--line)]">
      <div className="shell">
        <Reveal className="max-w-2xl mb-12">
          <p className="eyebrow mb-5">Technical services</p>
          <h2 className="text-step-2 mb-4">How can the team help?</h2>
          <p className="text-[var(--ink-3)] leading-relaxed">
            Serving China, Bangladesh and international partners. Tell us your
            application and we&rsquo;ll route you to the right specialist.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)]">
          {SERVICES.map((service, idx) => (
            <StaggerItem key={service.title}>
              <a
                href="#enquiry"
                className="group relative flex flex-col h-full bg-white p-8 hover:bg-[var(--ink)] transition-colors duration-300"
              >
                <span className="index-num absolute top-6 right-7 transition-colors group-hover:text-white/35">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <span className="grid place-items-center w-12 h-12 border border-[var(--line-strong)] text-[var(--brand-teal)] mb-6 transition-all duration-300 group-hover:bg-[var(--brand-teal)] group-hover:border-[var(--brand-teal)] group-hover:text-white">
                  <service.icon className="w-[22px] h-[22px]" />
                </span>

                <h3 className="text-step-1 font-bold mb-3 leading-snug transition-colors group-hover:text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--steel)] mb-7 flex-grow leading-relaxed transition-colors group-hover:text-white/55">
                  {service.desc}
                </p>

                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--brand-red)] transition-colors group-hover:text-white">
                  Start an enquiry
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                <span className="absolute left-0 bottom-0 h-[3px] w-full bg-[var(--brand-red)] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
