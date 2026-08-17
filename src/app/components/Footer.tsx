"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/products';
import { COMPANY } from '@/data/company';
import { useI18n } from '@/i18n/LanguageProvider';

const SERVICES = [
  { label: 'Technical Consultation', href: '/services' },
  { label: 'OEM & Custom Formulation', href: '/services' },
  { label: 'Local Supply — Bangladesh', href: '/services' },
  { label: 'Documentation & Compliance', href: '/services' },
  { label: 'Industries We Serve', href: '/industries' },
];

const RESOURCES = [
  { label: 'About HXHD', href: '/about' },
  { label: 'Careers & Hiring', href: '/career' },
  { label: 'Technical Guides', href: '/knowledge' },
  { label: 'Company Updates', href: '/knowledge' },
  { label: 'Technical Data Sheets (TDS)', href: '/products' },
  { label: 'Support & Contact', href: '/contact' },
];

export function Footer() {
  const { t, categoryName } = useI18n();

  return (
    <footer className="bg-[var(--ink)] text-[var(--steel-2)]">
      {/* Support band */}
      <div className="bg-[var(--brand-red)] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-40" aria-hidden />
        <div className="shell relative py-14 flex flex-col lg:flex-row items-center justify-between gap-8">
          <h2 className="text-step-2 text-white text-center lg:text-left max-w-xl">
            {t('footer.supportTitle')}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="btn bg-white text-[var(--brand-red)] hover:bg-[var(--ink)] hover:text-white cut-br"
            >
              {t('cta.contact')}
            </Link>
            <Link href="/contact" className="btn btn-on-dark">
              {t('cta.distributor')}
            </Link>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="shell py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 text-sm">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/images/logo.png"
              alt="HXHD"
              width={200}
              height={60}
              className="h-14 w-auto mb-5 brightness-0 invert opacity-95"
            />
            <p className="leading-relaxed text-[var(--steel-2)]/80">
              {t('footer.tagline')}
            </p>

            {/* Relocated from the old header utility bar when the header
                collapsed to a single row — the signal is worth keeping. */}
            <p className="mt-5 text-xs leading-relaxed">
              <span className="block font-bold uppercase tracking-[0.14em] text-[var(--teal-on-dark)] mb-1.5">
                {t('util.portfolio')}
              </span>
              {(['util.china', 'util.bangladesh', 'util.asean'] as const).map((k, i) => (
                <React.Fragment key={k}>
                  {i > 0 && <span className="mx-2 text-white/25">/</span>}
                  <span className="font-medium text-white/80">{t(k)}</span>
                </React.Fragment>
              ))}
            </p>
            <Link
              href="/products"
              className="link-sweep mt-6 inline-flex text-[var(--brand-teal)] font-bold text-xs uppercase tracking-[0.12em]"
            >
              {t('cta.browseCatalogue')} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Categories (real) */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold uppercase tracking-[0.12em] text-xs mb-5">
              {t('footer.categories')}
            </h3>
            <ul className="space-y-2.5">
              {CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="hover:text-[var(--brand-teal)] transition-colors inline-flex items-center gap-2"
                  >
                    {categoryName(cat.slug, cat.name)}
                    {/* A bare "0" beside a name reads as a fault rather than
                        an empty range, so the tally only shows when there is
                        something to count. */}
                    {cat.count > 0 && (
                      <span className="text-[var(--steel)]/60 text-xs tnum">{cat.count}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold uppercase tracking-[0.12em] text-xs mb-5">
              {t('footer.services')}
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="hover:text-[var(--brand-teal)] transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold uppercase tracking-[0.12em] text-xs mb-5">
              {t('footer.resources')}
            </h3>
            <ul className="space-y-2.5">
              {RESOURCES.map((r) => (
                <li key={r.label}>
                  <Link href={r.href} className="hover:text-[var(--brand-teal)] transition-colors">
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold uppercase tracking-[0.12em] text-xs mb-5">
              {t('footer.contact')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--brand-red)] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {COMPANY.address.line1}, {COMPANY.address.line2},
                  <br />
                  {COMPANY.address.country}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--brand-red)] shrink-0" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="hover:text-white transition-colors whitespace-nowrap"
                >
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--brand-red)] shrink-0" />
                <a
                  href={`tel:${COMPANY.phoneHref}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>
            &copy; {new Date().getFullYear()} Hongxing Hongda (BD) Two Win Technology Co., Ltd.{' '}
            {t('footer.rights')}
          </p>
          <div className="flex flex-wrap justify-center gap-6 font-medium">
            {['Privacy Policy', 'Terms of Use', 'Cookies', 'Data Protection'].map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
