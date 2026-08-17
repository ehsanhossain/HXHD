"use client";

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Phone, ArrowRight, Building2 } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { COMPANY } from '@/data/company';
import { useI18n } from '@/i18n/LanguageProvider';

export function ContactHQ() {
  const { c } = useI18n();

  return (
    <section className="section bg-white">
      <div className="shell grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        <Reveal>
          <p className="eyebrow mb-5">{c.contact.hqEyebrow}</p>
          <h2 className="text-step-2 mb-8">{c.contact.hqTitle}</h2>

          <div className="border-l-2 border-[var(--brand-red)] pl-6 mb-10">
            <p className="font-bold text-[var(--ink)] text-step-1 mb-4">
              Hongxing Hongda (BD) Two Win Technology Co., Ltd.
            </p>

            <ul className="space-y-4 text-[var(--ink-3)]">
              <li className="flex items-start gap-3">
                <MapPin className="w-[18px] h-[18px] text-[var(--brand-teal)] shrink-0 mt-1" />
                <span className="leading-relaxed">
                  {COMPANY.address.line1},
                  <br />
                  {COMPANY.address.line2}, {COMPANY.address.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-[18px] h-[18px] text-[var(--brand-teal)] shrink-0" />
                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="hover:text-[var(--brand-red)] transition-colors font-medium"
                >
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-[18px] h-[18px] text-[var(--brand-teal)] shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="hover:text-[var(--brand-red)] transition-colors font-medium break-all"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Building2 className="w-[18px] h-[18px] text-[var(--brand-teal)] shrink-0" />
                <span>{c.contact.intlDept}</span>
              </li>
            </ul>
          </div>

          <div className="pt-8 border-t border-[var(--line)]">
            <h2 className="text-step-1 font-bold mb-4">
              {c.contact.docsTitle}
            </h2>
            <p className="text-[var(--ink-3)] mb-5 leading-relaxed">
              {c.contact.docsBody}
            </p>
            <Link
              href="/products"
              className="link-sweep text-[var(--brand-red)] font-bold text-sm uppercase tracking-[0.1em]"
            >
              {c.contact.datasheetsLink} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        {/* Real facility imagery */}
        <Reveal direction="left" delay={0.1}>
          <div className="relative">
            <div className="relative cut-tr-lg overflow-hidden border border-[var(--line)]">
              <Image
                src="/images/about/factory.jpg"
                alt="Aerial view of the HXHD manufacturing campus"
                width={400}
                height={225}
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)] border-t-0">
              {[
                { k: c.contact.founded, v: '2000' },
                { k: c.contact.bases, v: 'CN · BD' },
                { k: c.contact.exportLabel, v: c.contact.exportValue },
              ].map((s) => (
                <div key={s.k} className="bg-white px-4 py-5 text-center">
                  <p className="text-xs uppercase tracking-[0.1em] text-[var(--steel)] mb-1">
                    {s.k}
                  </p>
                  <p className="font-bold text-[var(--ink)]">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
