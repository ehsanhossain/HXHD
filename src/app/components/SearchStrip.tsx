"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { ACTIVE_CATEGORIES } from '@/data/products';
import { useI18n } from '@/i18n/LanguageProvider';

/** Six highest-count categories become the quick filters. */
const QUICK = ACTIVE_CATEGORIES.slice(0, 6);

export function SearchStrip() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { t, categoryName } = useI18n();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
  };

  return (
    <div className="w-full bg-[var(--paper-2)] border-b border-[var(--line)]">
      <div className="shell py-7">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-5">
          <form onSubmit={submit} role="search" className="w-full lg:w-[36%] relative">
            <label htmlFor="quick-search" className="sr-only">
              {t('nav.searchProducts')}
            </label>
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--steel-2)] pointer-events-none"
              aria-hidden
            />
            <input
              id="quick-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full h-12 pl-12 pr-4 bg-white border border-[var(--line-strong)] focus:border-[var(--brand-red)] focus:outline-none text-[var(--ink)] placeholder:text-[var(--steel-2)] transition-colors"
            />
          </form>

          <div className="w-full lg:w-[64%] flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[var(--steel)] uppercase tracking-[0.12em] mr-1">
              {t('search.quickFilters')}
            </span>
            {QUICK.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group inline-flex items-center gap-1.5 px-4 h-10 bg-white border border-[var(--line)] text-sm font-bold text-[var(--ink-3)] hover:border-[var(--brand-red)] hover:text-[var(--brand-red)] transition-colors"
              >
                {categoryName(cat.slug, cat.name)}
                <span className="text-[0.68rem] text-[var(--steel-2)] group-hover:text-[var(--brand-red)] tnum">
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
