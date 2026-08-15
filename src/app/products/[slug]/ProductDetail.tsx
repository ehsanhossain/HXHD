"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, Star, FileText } from 'lucide-react';
import type { Product } from '@/data/products';
import { ProductGallery } from '../../components/products/ProductGallery';
import { ProductNewsletter } from '../../components/products/ProductNewsletter';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useI18n } from '@/i18n/LanguageProvider';

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { t, categoryName, summary } = useI18n();

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-[var(--paper-2)] border-b border-[var(--line)]">
        <div className="shell py-3 text-xs text-[var(--steel)] flex flex-wrap items-center gap-1.5">
          <Link href="/" className="hover:text-[var(--brand-red)] transition-colors">{t('nav.home')}</Link>
          <span className="text-[var(--line-strong)]">/</span>
          <Link href="/products" className="hover:text-[var(--brand-red)] transition-colors">{t('nav.products')}</Link>
          <span className="text-[var(--line-strong)]">/</span>
          <Link
            href={`/products?category=${product.categorySlug}`}
            className="hover:text-[var(--brand-red)] transition-colors"
          >
            {categoryName(product.categorySlug, product.category)}
          </Link>
          <span className="text-[var(--line-strong)]">/</span>
          <span className="font-bold text-[var(--ink)] line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="shell py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <Reveal direction="right">
            <ProductGallery images={product.images} name={product.name} />
          </Reveal>

          <Reveal direction="left" delay={0.08}>
            <p className="eyebrow mb-5">{categoryName(product.categorySlug, product.category)}</p>

            <h1 className="text-step-3 leading-[1.1] mb-5">{product.name}</h1>

            <div className="flex flex-wrap items-center gap-3 mb-7">
              {product.code && (
                <span className="px-3 py-1.5 bg-[var(--ink)] text-white text-sm font-bold tracking-wide">
                  {product.code}
                </span>
              )}
              {product.rating && (
                <span className="inline-flex items-center gap-1.5 text-sm text-[var(--steel)]">
                  <Star className="w-4 h-4 fill-[var(--brand-red)] text-[var(--brand-red)]" />
                  <span className="font-bold text-[var(--ink)] tnum">
                    {product.rating.value.toFixed(1)}
                  </span>
                  <span className="tnum">{t('detail.reviews', { n: product.rating.count })}</span>
                </span>
              )}
            </div>

            <p className="text-step-1 text-[var(--ink-3)] leading-relaxed font-light mb-9">
              {summary(product.slug, product.summary)}
            </p>

            {product.highlights.length > 0 && (
              <div className="mb-9 border-l-2 border-[var(--brand-teal)] pl-6">
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink)] mb-4">
                  {t('detail.keyCharacteristics')}
                </h2>
                <ul className="space-y-3">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[var(--ink-3)] leading-relaxed">
                      <Check className="w-[18px] h-[18px] text-[var(--brand-teal)] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary cut-br group">
                {t('cta.requestQuote')}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              {/* Was an outbound link to the group's other domain. TDS is
                  issued on request, same as everywhere else on this site. */}
              <Link href="/contact" className="btn btn-ghost">
                <FileText className="w-4 h-4" /> {t('cta.datasheet')}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Description */}
        {product.body.length > 0 && (
          <Reveal className="mt-20 max-w-4xl">
            <h2 className="text-step-2 mb-2">{t('detail.description')}</h2>
            <div className="w-16 h-[5px] bg-[var(--brand-red)] mb-8" />
            <div className="space-y-4">
              {product.body.map((p, i) => (
                <p key={i} className="text-[var(--ink-3)] leading-[1.8]">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        )}

        {/* Technical tables */}
        {product.specs.length > 0 && (
          <Reveal className="mt-20">
            <h2 className="text-step-2 mb-2">{t('detail.technicalData')}</h2>
            <div className="w-16 h-[5px] bg-[var(--brand-red)] mb-8" />

            <div className="space-y-10">
              {product.specs.map((table, ti) => {
                // Some source tables open with a single-cell title row rather
                // than real headers. Promote that to a caption and use the
                // following row as the header instead.
                const widest = Math.max(
                  table.headers.length,
                  ...table.rows.map((r) => r.length)
                );
                const titleOnly = table.headers.length === 1 && widest > 1;
                const caption = titleOnly ? table.headers[0] : null;
                const headers = titleOnly ? table.rows[0] : table.headers;
                const body = titleOnly ? table.rows.slice(1) : table.rows;

                return (
                  <div key={ti} className="border border-[var(--line)]">
                    {caption && (
                      <p className="bg-[var(--ink-2)] text-white px-4 py-3 text-xs font-bold uppercase tracking-[0.1em]">
                        {caption}
                      </p>
                    )}
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[640px] border-collapse text-sm">
                        <thead>
                          <tr className="bg-[var(--ink)] text-white text-left">
                            {headers.map((h, i) => (
                              <th
                                key={i}
                                scope="col"
                                className="px-4 py-3.5 font-bold text-xs uppercase tracking-[0.08em] border-r border-white/10 last:border-r-0"
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {body.map((row, ri) => (
                            <tr
                              key={ri}
                              className={`${ri % 2 ? 'bg-[var(--paper-2)]' : 'bg-white'} hover:bg-[var(--brand-teal-soft)] transition-colors`}
                            >
                              {row.map((cell, ci) => (
                                <td
                                  key={ci}
                                  className={`px-4 py-3 border-t border-[var(--line)] border-r last:border-r-0 ${
                                    ci === 0
                                      ? 'font-bold text-[var(--ink)]'
                                      : 'text-[var(--ink-3)]'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <Reveal>
              <h2 className="text-step-2 mb-2">{t('detail.moreIn', { category: categoryName(product.categorySlug, product.category) })}</h2>
              <div className="w-16 h-[5px] bg-[var(--brand-red)] mb-8" />
            </Reveal>

            <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((r) => (
                <StaggerItem key={r.slug}>
                  <Link
                    href={`/products/${r.slug}`}
                    className="group flex flex-col h-full bg-white border border-[var(--line)] hover:border-[var(--brand-teal)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-white">
                      <div className="absolute inset-0 bg-hatch opacity-35" aria-hidden />
                      <Image
                        src={r.image}
                        alt={r.name}
                        fill
                        sizes="(max-width: 640px) 90vw, 25vw"
                        className="relative object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow border-t border-[var(--line)]">
                      {r.code && (
                        <span className="self-start px-2 py-1 bg-[var(--ink)] text-white text-[0.65rem] font-bold mb-3">
                          {r.code}
                        </span>
                      )}
                      <h3 className="text-sm font-bold leading-snug line-clamp-3 transition-colors group-hover:text-[var(--brand-red)]">
                        {r.name}
                      </h3>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        )}

        <div className="mt-16">
          <Link
            href="/products"
            className="link-sweep text-[var(--brand-red)] font-bold text-sm uppercase tracking-[0.1em]"
          >
            <ArrowLeft className="w-4 h-4" /> {t('cta.backToProducts')}
          </Link>
        </div>
      </div>

      <ProductNewsletter />
    </div>
  );
}
