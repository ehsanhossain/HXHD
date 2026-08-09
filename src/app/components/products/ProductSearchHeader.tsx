"use client";

import { Search, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { PRODUCTS, ACTIVE_CATEGORIES } from '@/data/products';

interface ProductSearchHeaderProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function ProductSearchHeader({ query, onQueryChange }: ProductSearchHeaderProps) {
  const reduced = useReducedMotion();

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

        <div className="shell relative py-16 lg:py-20">
          <motion.p className="eyebrow mb-5" {...rise(0)}>
            Catalogue
          </motion.p>

          <motion.h1 className="text-step-4" {...rise(0.06)}>
            Products
          </motion.h1>

          <motion.p className="mt-5 text-white/60 max-w-2xl" {...rise(0.12)}>
            <span className="tnum font-bold text-white">{PRODUCTS.length}</span> products
            across{' '}
            <span className="tnum font-bold text-white">{ACTIVE_CATEGORIES.length}</span>{' '}
            categories — emulsions, coatings, adhesives and functional additives.
          </motion.p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-b border-[var(--line)]">
        <div className="shell py-8">
          <form className="flex w-full h-14" onSubmit={(e) => e.preventDefault()} role="search">
            <div className="relative flex-1">
              <label htmlFor="catalogue-search" className="sr-only">
                Search products
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
                placeholder="Search by product name, code or application"
                className="w-full h-full pl-14 pr-12 bg-white border border-[var(--line-strong)] border-r-0 focus:border-[var(--brand-red)] focus:outline-none text-step-0 text-[var(--ink)] placeholder:text-[var(--steel-2)] transition-colors"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => onQueryChange('')}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--steel-2)] hover:text-[var(--brand-red)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              aria-label="Search"
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
