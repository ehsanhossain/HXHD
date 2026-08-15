import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ProductCatalog } from '../components/products/ProductCatalog';
import { ProductNewsletter } from '../components/products/ProductNewsletter';
import { PRODUCTS } from '@/data/products';

export const metadata: Metadata = {
  title: `Products Catalogue | HXHD — ${PRODUCTS.length} Emulsion & Chemical Grades`,
  description:
    'Browse the full HXHD range of waterproof emulsions, architectural emulsions, adhesives, coatings and functional additives with TDS technical specifications.',
  openGraph: {
    title: `Products Catalogue | HXHD — ${PRODUCTS.length} Emulsion & Chemical Grades`,
    description:
      'Search and filter our complete range of polymer emulsions, waterproofing systems, and chemical additives engineered for performance.',
    url: '/products',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'HXHD Product Catalogue' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Products Catalogue | HXHD — ${PRODUCTS.length} Emulsion Solutions`,
    description:
      'Browse the full HXHD range of polymer emulsions, adhesives, coatings and functional additives.',
    images: ['/images/og-image.jpg'],
  },
};

export default function ProductsPage() {
  return (
    <div className="bg-white">
      <Suspense
        fallback={
          <div className="max-w-screen-2xl mx-auto px-6 py-32 text-center text-[var(--steel)]">
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
