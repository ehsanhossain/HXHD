"use client";

import { useEffect, useState } from 'react';
import { Search, ChevronDown, Menu, X, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ProductsMegaMenu } from './header/ProductsMegaMenu';
import { useI18n } from '@/i18n/LanguageProvider';
import { LOCALES, LOCALE_META } from '@/i18n/config';
import { COMPANY } from '@/data/company';

const NAV = [
  { key: 'nav.about', href: '/about', hasMenu: false },
  { key: 'nav.products', href: '/products', hasMenu: true },
  { key: 'nav.services', href: '/services', hasMenu: false },
  { key: 'nav.industries', href: '/industries', hasMenu: false },
  { key: 'nav.knowledge', href: '/knowledge', hasMenu: false },
  { key: 'nav.career', href: '/career', hasMenu: false },
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
      {/* The brand rule. All that survives of the old ink utility bar —
          it keeps red at the top of the page without spending a whole row
          on it. Matches the 3px rule down the left of the hero. */}
      <div className="h-[3px] bg-[var(--brand-red)]" aria-hidden />

      {/* Single bar */}
      <div
        className={`relative bg-white/95 backdrop-blur-sm border-b transition-all duration-300 ${
          scrolled
            ? 'border-[var(--line)] shadow-[0_1px_20px_rgba(13,20,24,0.07)]'
            : 'border-transparent'
        }`}
      >
        <div
          className={`shell flex justify-between items-center gap-4 transition-all duration-300 ${
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

          {/* Desktop nav. xl, not lg: seven uppercase items plus the utility
              cluster measured 208px wider than a 1024 viewport, so 1024-1279
              keeps the drawer. */}
          <nav className="hidden xl:flex items-stretch self-stretch">
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
                    className={`group relative flex items-center gap-1 whitespace-nowrap px-2.5 2xl:px-3.5 text-[0.72rem] 2xl:text-[0.78rem] font-bold uppercase tracking-[0.08em] transition-colors ${
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

          {/* Utilities — absorbed from the retired utility bar */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            <a
              href={`tel:${COMPANY.phoneHref}`}
              className="hidden 2xl:inline-flex items-center gap-1.5 whitespace-nowrap text-[0.78rem] font-bold text-[var(--ink-3)] hover:text-[var(--brand-red)] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {COMPANY.phone}
            </a>

            {/* Segmented locale control. The old inline text buttons were
                14x19px — under the 24x24 floor in WCAG 2.5.8. */}
            <div
              className="flex items-center border border-[var(--line-strong)]"
              role="group"
              aria-label={t('nav.chooseLanguage')}
            >
              {LOCALES.map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  lang={LOCALE_META[l].htmlLang}
                  aria-current={locale === l ? 'true' : undefined}
                  className={`min-w-9 h-8 px-2 text-[0.7rem] font-bold tracking-wide transition-colors ${
                    locale === l
                      ? 'bg-[var(--ink)] text-white'
                      : 'text-[var(--ink-3)] hover:bg-[var(--paper-2)] hover:text-[var(--brand-red)]'
                  }`}
                >
                  {LOCALE_META[l].short}
                </button>
              ))}
            </div>

            <Link
              href="/products"
              aria-label={t('nav.searchProducts')}
              className="hidden 2xl:grid place-items-center w-11 h-11 text-[var(--ink-3)] hover:text-[var(--brand-red)] hover:bg-[var(--paper-2)] transition-colors"
            >
              <Search className="w-[18px] h-[18px]" />
            </Link>

            <Link
              href="/contact"
              className="hidden xl:inline-flex btn btn-primary cut-br !min-h-[2.75rem] !px-4 2xl:!px-6"
            >
              {t('cta.requestSample')}
            </Link>

            {/* Mobile toggle */}
            <button
              className="xl:hidden grid place-items-center w-11 h-11 text-[var(--ink)]"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
            className="xl:hidden absolute w-full left-0 bg-white border-t border-[var(--line)] shadow-xl z-40 overflow-hidden"
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
