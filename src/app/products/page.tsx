import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ProductCatalog } from '../components/products/ProductCatalog';
import { ProductNewsletter } from '../components/products/ProductNewsletter';
import { PRODUCTS } from '@/data/products';

export const metadata: Metadata = {
  title: `Products | HXHD — ${PRODUCTS.length} Emulsion & Functional Chemical Solutions`,
  description:
    'Browse the full HXHD range of waterproof emulsions, architectural emulsions, adhesives, coatings and functional additives.',
};

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <Suspense
        fallback={
          <div className="max-w-screen-2xl mx-auto px-6 py-32 text-center text-slate-400">
            Loading products…
          </div>
        }
      >
        <ProductCatalog />
      </Suspense>

      <ProductNewsletter />
    </div>
  );
}
