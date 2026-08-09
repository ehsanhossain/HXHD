"use client";

import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PRODUCTS, ACTIVE_CATEGORIES } from '@/data/products';
import { useT } from '@/i18n/LanguageProvider';

interface ProductSearchHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function ProductSearchHeader({ query, onQueryChange }: ProductSearchHeaderProps) {
  const reduced = useReducedMotion();
  const t = useT();

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <div className="w-full">
      {/* Title banner */}
      <div className="relative bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden />
        <div
          className="absolute top-0 right-0 h-full w-1/3 bg-[var(--brand-teal)]/12 hidden md:block"
          style={{ clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0 100%)' }}
          aria-hidden
        />
        <div className="absolute left-0 top-0 h-full w-[3px] bg-[var(--brand-red)]" aria-hidden />

        {/* Breadcrumb sits inside the client banner so it can be translated */}
        <div className="shell relative pt-4 text-xs text-white/45 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[var(--brand-teal)] transition-colors">
            {t('nav.home')}
          </Link>
          <span className="text-white/25">/</span>
          <span className="font-bold text-white/80">{t('nav.products')}</span>
        </div>

        <div className="shell relative pt-8 pb-16 lg:pb-20">
          <motion.p className="eyebrow mb-5" {...rise(0)}>
            {t('sec.catalogue')}
          </motion.p>

          <motion.h1 className="text-step-4" {...rise(0.06)}>
            {t('products.title')}
          </motion.h1>

          <motion.p className="mt-5 text-white/60 max-w-2xl" {...rise(0.12)}>
            {t('products.intro', {
              n: PRODUCTS.length,
              c: ACTIVE_CATEGORIES.length,
            })}
          </motion.p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-b border-[var(--line)]">
        <div className="shell py-8">
          <form className="flex w-full h-14" onSubmit={(e) => e.preventDefault()} role="search">
            <div className="relative flex-1">
              <label htmlFor="catalogue-search" className="sr-only">
                {t('nav.searchProducts')}
              </label>
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--steel-2)] pointer-events-none"
                aria-hidden
              />
              <input
                id="catalogue-search"
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder={t('search.cataloguePlaceholder')}
                className="w-full h-full pl-14 pr-12 bg-white border border-[var(--line-strong)] border-r-0 focus:border-[var(--brand-red)] focus:outline-none text-step-0 text-[var(--ink)] placeholder:text-[var(--steel-2)] transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => onQueryChange('')}
                  aria-label={t('search.clear')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--steel-2)] hover:text-[var(--brand-red)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              aria-label={t('search.label')}
              className="w-16 md:w-20 h-full bg-[var(--brand-red)] hover:bg-[var(--brand-red-dark)] text-white transition-colors grid place-items-center"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
