"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCT_MODELS } from '@/data/products';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useI18n } from '@/i18n/LanguageProvider';

/**
 * The company's official model range.
 *
 * The catalogue above carries a page per product, but several grades the
 * company sells have no page yet. Publishing the sheet here means the full
 * range is visible either way: grades with a page link to it, the rest are
 * listed so a buyer can still ask for them by code.
 *
 * Codes are manufacturer grades, so they are never translated — only the
 * headings and labels around them are.
 */
export function ProductModelRange() {
  const { t, categoryName } = useI18n();

  return (
    <section className="section bg-[var(--paper-2)] border-t border-[var(--line)]">
      <div className="shell">
        <Reveal className="max-w-2xl mb-12">
          <p className="eyebrow mb-5">{t('products.modelsEyebrow')}</p>
          <h2 className="text-step-3 mb-5">{t('products.modelsTitle')}</h2>
          <p className="text-sm text-[var(--steel)] leading-relaxed">{t('products.modelsBody')}</p>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRODUCT_MODELS.map((group) => (
            <StaggerItem key={group.categorySlug}>
              <div className="h-full bg-white border border-[var(--line)] flex flex-col">
                <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-[var(--line)] bg-[var(--paper-2)]">
                  <h3 className="font-bold text-[var(--ink)] leading-snug">
                    {categoryName(group.categorySlug, group.title)}
                  </h3>
                  <span className="shrink-0 text-xs font-bold text-[var(--steel)] tnum">
                    {group.models.length}
                  </span>
                </div>

                <ul className="divide-y divide-[var(--line)]">
                  {group.models.map((m) => {
                    const row = (
                      <span className="flex items-center justify-between gap-4 px-6 py-3">
                        <span className="min-w-0">
                          <span className="font-bold text-[var(--ink)] tnum">{m.code}</span>
                          {m.label && (
                            <span className="block text-xs text-[var(--steel)] mt-0.5">
                              {m.label}
                            </span>
                          )}
                        </span>
                        {m.productSlug && (
                          <ArrowRight className="w-4 h-4 shrink-0 text-[var(--brand-teal)] transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </span>
                    );

                    return (
                      <li key={m.code}>
                        {m.productSlug ? (
                          <Link
                            href={`/products/${m.productSlug}`}
                            className="group block hover:bg-[var(--paper-2)] transition-colors"
                          >
                            {row}
                          </Link>
                        ) : (
                          row
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10">
          <Link href="/contact" className="btn btn-primary cut-br group">
            {t('products.modelsCta')}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
