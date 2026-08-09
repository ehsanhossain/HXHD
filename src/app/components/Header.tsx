"use client";

import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, Globe, Menu, X, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ProductsMegaMenu } from './header/ProductsMegaMenu';
import { useI18n } from '@/i18n/LanguageProvider';
import { LOCALES, LOCALE_META } from '@/i18n/config';
import { COMPANY } from '@/data/company';

const NAV = [
  { key: 'nav.products', href: '/products', hasMenu: true },
  { key: 'nav.services', href: '/services', hasMenu: false },
  { key: 'nav.industries', href: '/industries', hasMenu: false },
  { key: 'nav.knowledge', href: '/knowledge', hasMenu: false },
  // Support is the contact page — there is one team, one inbox.
  { key: 'nav.support', href: '/contact', hasMenu: false },
] as const;

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { t, locale, setLocale } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Never leave the drawer open across a navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const isActive = (href: string) =>
    href !== '#' && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header
      className="sticky top-0 z-50 w-full"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {/* Utility bar */}
      <div className="bg-[var(--ink)] text-white/80 text-[0.72rem]">
        <div className="shell flex flex-col md:flex-row justify-between items-center gap-1.5 py-2">
          <p className="tracking-wide text-center md:text-left">
            <span className="text-white/50">{t('util.portfolio')}</span>{' '}
            {(['util.china', 'util.bangladesh', 'util.asean'] as const).map((k, i) => (
              <React.Fragment key={k}>
                {i > 0 && <span className="mx-1.5 text-white/25">/</span>}
                <span className="font-medium">{t(k)}</span>
              </React.Fragment>
            ))}
          </p>

          <div className="flex items-center gap-5 font-medium">
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3" />
              {COMPANY.phone}
            </a>

            <div
              className="flex items-center gap-1.5"
              role="group"
              aria-label={t('nav.chooseLanguage')}
            >
              <Globe className="w-3 h-3 text-white/50" aria-hidden />
              {LOCALES.map((l, i) => (
                <React.Fragment key={l}>
                  {i > 0 && <span className="text-white/25">·</span>}
                  <button
                    onClick={() => setLocale(l)}
                    lang={LOCALE_META[l].htmlLang}
                    aria-current={locale === l ? 'true' : undefined}
                    className={`transition-colors ${
                      locale === l
                        ? 'text-white font-bold'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {LOCALE_META[l].short}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`relative bg-white/95 backdrop-blur-sm border-b transition-all duration-300 ${
          scrolled
            ? 'border-[var(--line)] shadow-[0_1px_20px_rgba(13,20,24,0.07)]'
            : 'border-transparent'
        }`}
      >
        <div
          className={`shell flex justify-between items-center transition-all duration-300 ${
            scrolled ? 'py-2.5' : 'py-4'
          }`}
        >
          <Link href="/" className="flex items-center shrink-0" aria-label="HXHD — home">
            <Image
              src="/images/logo.png"
              alt="HXHD — Hongxing Hongda"
              width={240}
              height={72}
              priority
              className={`w-auto transition-all duration-300 ${
                scrolled ? 'h-11 lg:h-12' : 'h-14 lg:h-16'
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-stretch self-stretch">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <div
                  key={item.key}
                  className="relative flex items-stretch"
                  onMouseEnter={() => setActiveDropdown(item.key)}
                >
                  <Link
                    href={item.href}
                    className={`group relative flex items-center gap-1 px-4 text-[0.78rem] font-bold uppercase tracking-[0.1em] transition-colors ${
                      active || activeDropdown === item.key
                        ? 'text-[var(--brand-red)]'
                        : 'text-[var(--ink-2)] hover:text-[var(--brand-red)]'
                    }`}
                  >
                    {t(item.key)}
                    {item.hasMenu && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          activeDropdown === item.key ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                    {/* Active/hover indicator */}
                    <span
                      className={`absolute left-3 right-3 -bottom-px h-[3px] bg-[var(--brand-red)] origin-left transition-transform duration-300 ${
                        active || activeDropdown === item.key ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              href="/products"
              aria-label={t('nav.searchProducts')}
              className="grid place-items-center w-11 h-11 text-[var(--ink-3)] hover:text-[var(--brand-red)] hover:bg-[var(--paper-2)] transition-colors"
            >
              <Search className="w-[18px] h-[18px]" />
            </Link>
            <Link href="/contact" className="btn btn-primary cut-br !min-h-[2.75rem] !px-6">
              {t('cta.requestSample')}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden grid place-items-center w-11 h-11 text-[var(--ink)]"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {activeDropdown === 'nav.products' && (
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -8 }}
              transition={{ duration: reduced ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductsMegaMenu onClose={() => setActiveDropdown(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden absolute w-full left-0 bg-white border-t border-[var(--line)] shadow-xl z-40 overflow-hidden"
            initial={{ height: reduced ? 'auto' : 0, opacity: reduced ? 1 : 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: reduced ? 'auto' : 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell py-5 flex flex-col">
              {NAV.map((item, i) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex items-center justify-between py-3.5 border-b border-[var(--line)] font-bold uppercase text-sm tracking-wider ${
                    isActive(item.href) ? 'text-[var(--brand-red)]' : 'text-[var(--ink-2)]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(item.key)}
                  <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                </Link>
              ))}

              <div className="flex flex-col gap-3 mt-6">
                <Link
                  href="/contact"
                  className="btn btn-primary w-full cut-br"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('cta.requestSample')}
                </Link>
                <a href={`tel:${COMPANY.phoneHref}`} className="btn btn-ghost w-full">
                  <Phone className="w-4 h-4" /> {t('cta.callTeam')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
