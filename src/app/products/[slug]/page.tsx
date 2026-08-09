import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProductBySlug, getProductsByCategory } from '@/data/products';
import { ProductDetail } from './ProductDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product not found | HXHD' };

  return {
    title: `${product.name} | HXHD`,
    description: product.summary,
    keywords: product.keywords,
    openGraph: {
      title: product.name,
      description: product.summary,
      images: product.images.length ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return <ProductDetail product={product} related={related} />;
}
