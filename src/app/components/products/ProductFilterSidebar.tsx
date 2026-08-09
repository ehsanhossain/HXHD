"use client";

import { useState } from 'react';
import { ChevronDown, Check, SlidersHorizontal } from 'lucide-react';
import type { Category } from '@/data/products';

interface ProductFilterSidebarProps {
  categories: Category[];
  selected: string[];
  onToggle: (slug: string) => void;
  onReset: () => void;
}

export function ProductFilterSidebar({
  categories,
  selected,
  onToggle,
  onReset,
}: ProductFilterSidebarProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden w-full mb-6">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-expanded={isMobileOpen}
          className="w-full flex items-center justify-between px-5 h-14 bg-white border border-[var(--line-strong)] font-bold text-[var(--ink)]"
        >
          <span className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-[var(--brand-red)]" />
            Filters
            {selected.length > 0 && (
              <span className="px-2 py-0.5 bg-[var(--brand-red)] text-white text-xs font-bold tnum">
                {selected.length}
              </span>
            )}
          </span>
          <ChevronDown
            className={`w-5 h-5 transition-transform duration-300 ${isMobileOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <aside
        className={`w-full lg:w-80 flex-shrink-0 bg-[var(--paper-2)] border border-[var(--line)] lg:block ${
          isMobileOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-[var(--line)]">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--ink)]">
            Filters
          </h2>
          <button
            onClick={onReset}
            disabled={selected.length === 0}
            className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--brand-red)] hover:underline disabled:opacity-35 disabled:no-underline disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>

        <div className="p-6">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            aria-expanded={isCategoryOpen}
            className="flex justify-between items-center w-full text-left font-bold text-[var(--ink)] mb-4"
          >
            <span className="text-xs uppercase tracking-[0.12em]">Product category</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isCategoryOpen && (
            <div className="space-y-1">
              {categories.map((cat) => {
                const checked = selected.includes(cat.slug);
                return (
                  <label
                    key={cat.slug}
                    className={`flex items-start gap-3 cursor-pointer group py-2 px-2 -mx-2 transition-colors ${
                      checked ? 'bg-white' : 'hover:bg-white/70'
                    }`}
                  >
                    <span className="relative flex items-center mt-0.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggle(cat.slug)}
                        className="peer appearance-none w-5 h-5 border border-[var(--line-strong)] bg-white checked:bg-[var(--brand-red)] checked:border-[var(--brand-red)] transition-colors"
                      />
                      <Check className="w-3.5 h-3.5 text-white absolute left-[3px] top-[3px] opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </span>
                    <span
                      className={`text-sm leading-snug flex-1 transition-colors ${
                        checked
                          ? 'text-[var(--ink)] font-bold'
                          : 'text-[var(--ink-3)] group-hover:text-[var(--brand-red)]'
                      }`}
                    >
                      {cat.name}
                      <span className="text-[var(--steel-2)] font-medium tnum"> ({cat.count})</span>
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
