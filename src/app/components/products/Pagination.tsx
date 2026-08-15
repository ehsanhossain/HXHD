"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useT } from '@/i18n/LanguageProvider';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** Page numbers around the current page, with gaps marked as null. */
function pageItems(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: (number | null)[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push(null);
  for (let p = start; p <= end; p++) items.push(p);
  if (end < total - 1) items.push(null);
  items.push(total);

  return items;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const t = useT();
  const items = pageItems(currentPage, totalPages);

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-16 mb-20"
      aria-label={t('products.pagination')}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={t('products.prev')}
        className="p-2 text-[var(--ink-3)] hover:text-[var(--brand-red)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-[var(--ink-3)]"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {items.map((item, idx) =>
        item === null ? (
          <div key={`gap-${idx}`} className="px-2 text-[var(--steel)]">
            ...
          </div>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            aria-current={item === currentPage ? 'page' : undefined}
            className={`w-10 h-10 flex items-center justify-center font-bold text-sm transition-colors ${
              item === currentPage
                ? 'bg-[var(--brand-red)] text-white'
                : 'bg-white border border-[var(--line)] text-[var(--ink-3)] hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]'
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={t('products.next')}
        className="p-2 text-[var(--ink-3)] hover:text-[var(--brand-red)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-[var(--ink-3)]"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
