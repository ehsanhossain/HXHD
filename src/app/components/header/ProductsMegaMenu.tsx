"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ACTIVE_CATEGORIES, PRODUCTS } from '@/data/products';

interface ProductsMegaMenuProps {
  onClose: () => void;
}

export function ProductsMegaMenu({ onClose }: ProductsMegaMenuProps) {
  const featured = PRODUCTS.find((p) => p.code === 'HX-470') ?? PRODUCTS[0];

  return (
    <div 
      className="absolute top-full left-0 w-full bg-white border-t border-slate-200 shadow-xl z-50 py-10 animate-in fade-in slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-12 gap-8">
        
        {/* Column 1: Call to Action Header */}
        <div className="col-span-12 md:col-span-3">
          <Link 
            href="/products"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-[#D61118] font-bold text-lg hover:underline hover:text-[#b00d13] transition-colors"
          >
            Find Your Product <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Column 2 & 3: Product Categories */}
        <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-x-8 gap-y-4">
            {ACTIVE_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                onClick={onClose}
                className="text-slate-600 hover:text-[#D61118] font-medium transition-colors text-sm"
              >
                {category.name}
                <span className="text-slate-400"> ({category.count})</span>
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
              <div className="w-full aspect-[4/3] bg-slate-50 overflow-hidden relative border border-slate-200">
                <img
                  src={featured.image}
                  alt={featured.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="mt-3 text-sm font-bold text-slate-800 group-hover:text-[#D61118] transition-colors line-clamp-2">
                {featured.name}
              </p>
            </Link>
          )}
          <Link
            href="/products"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-[#D61118] font-bold text-sm hover:underline uppercase tracking-wide"
          >
            View All {PRODUCTS.length} Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}