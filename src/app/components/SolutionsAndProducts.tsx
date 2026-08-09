"use client";

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, ArrowUpRight, Layers, Home, Building2,
  PaintBucket, Briefcase, Zap, Droplets,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useT } from '@/i18n/LanguageProvider';

const APPLICATIONS = [
  { title: 'Cement-Based Waterproof Coatings', icon: Droplets, desc: 'Single & two-component', cat: 'waterproof-emulsion' },
  { title: 'Thermal Insulation Mortar', icon: Layers, desc: 'Energy-efficient bonding', cat: 'waterproof-emulsion' },
  { title: 'Exterior Wall Coatings', icon: Building2, desc: 'Weather resistance & durability', cat: 'architectural-emulsion' },
  { title: 'Interior Wall Coatings', icon: Home, desc: 'Eco-friendly, low-VOC systems', cat: 'interior-wall-paint' },
  { title: 'Tile Bonding Systems', icon: Briefcase, desc: 'Strong adhesion promoters', cat: 'ceramic-tile-adhesive' },
  { title: 'Protective & Anti-Corrosion', icon: PaintBucket, desc: 'Rust conversion & stabilising', cat: 'rust-converter' },
  { title: 'Asphalt & Infrastructure', icon: Zap, desc: 'Roads & bridge-deck waterproofing', cat: 'waterproof-emulsion' },
];

/** Most-reviewed products on the source site, used as the "popular" shortlist. */
const popularProducts = [...PRODUCTS]
  .sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0))
  .slice(0, 5);

export function SolutionsAndProducts() {
  const t = useT();

  return (
    <>
      {/* ── Solutions ───────────────────────────────────────── */}
      <section className="section bg-white relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[38%] h-full bg-grid opacity-60 pointer-events-none"
          aria-hidden
        />

        <div className="shell relative">
          <Reveal className="max-w-3xl mb-14">
            <p className="eyebrow mb-5">{t('sec.applications')}</p>
            <h2 className="text-step-3 mb-5">
              {t('sec.applicationsTitle')}
            </h2>
            <p className="text-[var(--ink-3)] text-step-0 leading-relaxed">
              {t('sec.applicationsLead')}
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[var(--line)] border border-[var(--line)]">
            {APPLICATIONS.map((app, idx) => (
              <StaggerItem key={app.title}>
                <Link
                  href={`/products?category=${app.cat}`}
                  className="group relative flex flex-col h-full bg-white p-7 transition-colors duration-300 hover:bg-[var(--ink)]"
                >
                  <span className="index-num absolute top-5 right-6 transition-colors group-hover:text-white/35">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <span className="grid place-items-center w-12 h-12 border border-[var(--line-strong)] text-[var(--brand-teal)] mb-6 transition-all duration-300 group-hover:border-[var(--brand-teal)] group-hover:bg-[var(--brand-teal)] group-hover:text-white">
                    <app.icon className="w-[22px] h-[22px]" />
                  </span>

                  <h3 className="text-step-1 font-bold mb-2 leading-tight transition-colors group-hover:text-white">
                    {app.title}
                  </h3>
                  <p className="text-sm text-[var(--steel)] mb-6 flex-grow transition-colors group-hover:text-white/55">
                    {app.desc}
                  </p>

                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--brand-red)] transition-colors group-hover:text-white">
                    {t('sec.viewSolutions')}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>

                  {/* Bottom rule sweeps in on hover */}
                  <span className="absolute left-0 bottom-0 h-[3px] w-full bg-[var(--brand-red)] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </StaggerItem>
            ))}

            <StaggerItem>
              <Link
                href="/products"
                className="group flex flex-col justify-center items-start h-full bg-[var(--paper-2)] p-7 hover:bg-[var(--brand-red)] transition-colors duration-300"
              >
                <span className="text-step-1 font-bold leading-tight mb-3 transition-colors group-hover:text-white">
                  {t('sec.exploreAll')}
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--brand-red)] transition-colors group-hover:text-white">
                  {t('sec.allProducts', { n: PRODUCTS.length })}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ── Popular products ────────────────────────────────── */}
      <section className="section bg-[var(--paper-2)] border-y border-[var(--line)]">
        <div className="shell">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div>
              <p className="eyebrow mb-5">{t('sec.catalogue')}</p>
              <h2 className="text-step-3">{t('sec.popular')}</h2>
            </div>
            <Link
              href="/products"
              className="link-sweep text-[var(--brand-red)] font-bold text-sm uppercase tracking-[0.1em]"
            >
              {t('cta.seeAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {popularProducts.map((prod) => (
              <StaggerItem key={prod.slug}>
                <Link
                  href={`/products/${prod.slug}`}
                  className="group flex flex-col h-full bg-white border border-[var(--line)] hover:border-[var(--brand-teal)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-18px_rgba(13,20,24,0.35)]"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-hatch opacity-40" aria-hidden />
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1280px) 33vw, 20vw"
                      className="relative object-contain p-4 transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-grow border-t border-[var(--line)]">
                    {prod.code && (
                      <span className="self-start px-2 py-1 bg-[var(--ink)] text-white text-[0.65rem] font-bold tracking-wider mb-3">
                        {prod.code}
                      </span>
                    )}
                    <h3 className="text-sm font-bold leading-snug mb-2 line-clamp-3 transition-colors group-hover:text-[var(--brand-red)]">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[var(--steel)] mb-5 line-clamp-1">
                      {prod.category}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--brand-teal)] transition-colors group-hover:text-[var(--brand-red)]">
                      {t('cta.viewProduct')}
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
