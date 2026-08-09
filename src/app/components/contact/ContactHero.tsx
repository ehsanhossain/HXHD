"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { COMPANY } from '@/data/company';

export function ContactHero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section>
      {/* Breadcrumb */}
      <div className="bg-[var(--paper-2)] border-b border-[var(--line)]">
        <div className="shell py-3 text-xs text-[var(--steel)] flex items-center gap-1.5">
          <Link href="/" className="hover:text-[var(--brand-red)] transition-colors">Home</Link>
          <span className="text-[var(--line-strong)]">/</span>
          <span className="font-bold text-[var(--ink)]">Contact</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Real facility photograph */}
        <div className="w-full lg:w-1/2 relative min-h-[280px] lg:min-h-[520px]">
          <Image
            src="/images/about/company.jpg"
            alt="HXHD — Hubei Hongxing Hongda New Materials head office"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[var(--ink)]/35" aria-hidden />
          <div className="absolute inset-0 bg-grid-dark opacity-40" aria-hidden />
        </div>

        {/* Copy */}
        <div className="w-full lg:w-1/2 relative bg-[var(--ink)] text-white overflow-hidden">
          <div
            className="absolute bottom-0 right-0 h-2/3 w-2/3 bg-[var(--brand-teal)]/10"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
            aria-hidden
          />

          <div className="relative px-8 lg:px-14 py-14 lg:py-20 flex flex-col justify-center h-full">
            <motion.p className="eyebrow mb-5" {...rise(0)}>
              Get in touch
            </motion.p>

            <motion.h1 className="text-step-3 mb-6" {...rise(0.06)}>
              Contact us
            </motion.h1>

            <motion.p className="text-white/65 leading-relaxed mb-9 max-w-xl" {...rise(0.12)}>
              Our sales and technical representatives are here to assist with
              formulation targets, substrates, documentation and supply. Send an
              enquiry below, or reach the team directly.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-3 mb-8" {...rise(0.18)}>
              <a href="#enquiry" className="btn btn-primary cut-br group">
                Send an Enquiry
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link href="/products" className="btn btn-on-dark">
                Browse Products
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-x-8 gap-y-3 pt-7 border-t border-white/12"
              {...rise(0.24)}
            >
              <a
                href={`tel:${COMPANY.phoneHref}`}
                className="inline-flex items-center gap-2.5 text-sm text-white/75 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[var(--brand-teal)]" />
                {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center gap-2.5 text-sm text-white/75 hover:text-white transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[var(--brand-teal)] shrink-0" />
                {COMPANY.email}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
