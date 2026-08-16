"use client";

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { ProductFilterSidebar } from './ProductFilterSidebar';
import { ProductGrid } from './ProductGrid';
import { Pagination } from './Pagination';
import { ProductSearchHeader } from './ProductSearchHeader';
import { useI18n } from '@/i18n/LanguageProvider';

const PAGE_SIZE = 9;

export function ProductCatalog() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(queryParam);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
    categoryParam && CATEGORIES.some((c) => c.slug === categoryParam)
      ? [categoryParam]
      : []
  );
  const [page, setPage] = useState(1);

  // Follow ?category= when navigating between mega-menu links on this same page
  useEffect(() => {
    if (categoryParam && CATEGORIES.some((c) => c.slug === categoryParam)) {
      setSelectedCategories([categoryParam]);
      setPage(1);
    }
  }, [categoryParam]);

  // Follow ?q= arriving from the homepage quick-search
  useEffect(() => {
    if (queryParam) {
      setQuery(queryParam);
      setPage(1);
    }
  }, [queryParam]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (selectedCategories.length && !selectedCategories.includes(p.categorySlug)) {
        return false;
      }
      if (!q) return true;
      const haystack = [p.name, p.code, p.category, p.summary, ...p.keywords]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, selectedCategories]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // Clamp during render so a filter change can never leave us on an empty page
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
    setPage(1);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setQuery('');
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <>
      <ProductSearchHeader query={query} onQueryChange={handleSearch} />

      <div className="max-w-screen-2xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <ProductFilterSidebar
            categories={CATEGORIES}
            selected={selectedCategories}
            onToggle={toggleCategory}
            onReset={resetFilters}
          />

          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-8">
              <p className="text-sm text-[var(--steel)] font-medium">
                {t('products.showing', { a: visible.length, b: filtered.length })}
                {selectedCategories.length > 0 || query ? ` ${t('products.filtered')}` : ''}
              </p>
              {(selectedCategories.length > 0 || query) && (
                <button
                  onClick={resetFilters}
                  className="text-sm font-bold text-[var(--brand-red)] hover:underline"
                >
                  {t('products.clearFilters')}
                </button>
              )}
            </div>

            <ProductGrid products={visible} />

            {filtered.length === 0 && (
              <div className="py-24 text-center">
                <p className="text-lg font-bold text-[var(--ink)] mb-2">{t('products.none')}</p>
                <p className="text-sm text-[var(--steel)] mb-6">{t('products.noneHelp')}</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-[var(--brand-red)] text-white font-bold text-sm uppercase tracking-wide hover:bg-[#b00d13] transition-colors"
                >
                  {t('products.resetAll')}
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
