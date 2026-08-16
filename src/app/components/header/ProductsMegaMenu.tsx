"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import { useI18n } from '@/i18n/LanguageProvider';

interface ProductsMegaMenuProps {
  onClose: () => void;
}

export function ProductsMegaMenu({ onClose }: ProductsMegaMenuProps) {
  const { t, categoryName } = useI18n();
  const featured = PRODUCTS.find((p) => p.code === 'HX-470') ?? PRODUCTS[0];

  return (
    <div 
      className="absolute top-full left-0 w-full bg-white border-t border-[var(--line)] shadow-xl z-50 py-10 animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-12 gap-8">
        
        {/* Column 1: Call to Action Header */}
        <div className="col-span-12 md:col-span-3">
          <Link 
            href="/products"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-[var(--brand-red)] font-bold text-lg hover:underline hover:text-[#b00d13] transition-colors"
          >
            {t('cta.findProduct')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Column 2 & 3: Product Categories */}
        <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-x-8 gap-y-4">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                onClick={onClose}
                className="text-[var(--ink-3)] hover:text-[var(--brand-red)] font-medium transition-colors text-sm"
              >
                {categoryName(category.slug, category.name)}
                {category.count > 0 && (
                  <span className="text-[var(--steel)]"> ({category.count})</span>
                )}
              </Link>
            ))}
        </div>

        {/* Column 4: Featured Product + View All */}
        <div className="col-span-12 md:col-span-3 flex flex-col items-start gap-4">
          {featured && (
            <Link
              href={`/products/${featured.slug}`}
              onClick={onClose}
              className="w-full group"
            >
              <div className="w-full aspect-[4/3] bg-[var(--paper-2)] overflow-hidden relative border border-[var(--line)]">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="mt-3 text-sm font-bold text-[var(--ink-2)] group-hover:text-[var(--brand-red)] transition-colors line-clamp-2">
                {featured.name}
              </p>
            </Link>
          )}
          <Link
            href="/products"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-[var(--brand-red)] font-bold text-sm hover:underline uppercase tracking-wide"
          >
            {t('cta.viewAll', { n: PRODUCTS.length })} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}