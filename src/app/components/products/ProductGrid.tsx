"use client";

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/data/products';
import { Stagger, StaggerItem } from '@/components/motion/Reveal';

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col h-full bg-white border border-[var(--line)] hover:border-[var(--brand-teal)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-20px_rgba(13,20,24,0.4)]"
    >
      <span className="index-num absolute top-4 left-4 z-10">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <div className="absolute inset-0 bg-hatch opacity-35" aria-hidden />
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 30vw"
          className="relative object-contain p-8 transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>

      <div className="flex flex-col flex-grow p-6 border-t border-[var(--line)]">
        <div className="flex items-center gap-2 mb-3">
          {product.code && (
            <span className="px-2 py-1 bg-[var(--ink)] text-white text-[0.65rem] font-bold tracking-wider">
              {product.code}
            </span>
          )}
          <span className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[var(--brand-teal)] truncate">
            {product.category}
          </span>
        </div>

        <h3 className="text-step-1 font-bold leading-snug mb-3 line-clamp-3 transition-colors group-hover:text-[var(--brand-red)]">
          {product.name}
        </h3>

        <p className="text-sm text-[var(--steel)] mb-6 leading-relaxed line-clamp-3">
          {product.summary}
        </p>

        <span className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--brand-red)]">
          View product
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>

      <span className="absolute left-0 bottom-0 h-[3px] w-full bg-[var(--brand-red)] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Stagger
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      key={products.map((p) => p.id).join('|')}
    >
      {products.map((product, i) => (
        <StaggerItem key={product.id}>
          <ProductCard product={product} index={i} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
