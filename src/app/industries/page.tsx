import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Shirt, Building2, Route, PaintRoller, Layers, ShieldCheck,
  ArrowRight, ArrowUpRight,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { NewsletterStrip } from '../components/contact/NewsletterStrip';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { BANGLADESH } from '@/data/company';
import { PRODUCTS, getProductsByCategory } from '@/data/products';

export const metadata: Metadata = {
  title: 'Industries | HXHD Bangladesh',
  description:
    'Emulsions and functional chemicals for Bangladesh RMG and textiles, construction, infrastructure, paint manufacturing, tile adhesives and anti-corrosion.',
};

/**
 * Sectors chosen for the Bangladesh market. Each maps to real product
 * categories so the "products for this sector" counts stay truthful.
 */
const INDUSTRIES = [
  {
    icon: Shirt,
    name: 'RMG & Textiles',
    lead: "Bangladesh's largest export sector",
    body: 'Pure acrylic textile emulsions for high-grade silk cotton and DuPont cotton — binders for fabric finishing, coating and lamination used across ready-made garment supply chains.',
    categories: ['textile-emulsion'],
  },
  {
    icon: Building2,
    name: 'Construction & Real Estate',
    lead: 'Dhaka and Chattogram development',
    body: 'Waterproof emulsions for cement-based coatings, thermal insulation mortar and two-component systems — plus architectural emulsions for exterior and interior wall finishes.',
    categories: ['waterproof-emulsion', 'architectural-emulsion'],
  },
  {
    icon: Route,
    name: 'Infrastructure & Roads',
    lead: 'Bridges, decks and drainage',
    body: 'Emulsions compatible with anionic, cationic and non-ionic emulsified asphalt, formulated to stay flexible at low temperature and to be applied on damp substrates.',
    categories: ['waterproof-emulsion', 'rg-waterproof-coating'],
  },
  {
    icon: PaintRoller,
    name: 'Paint & Coatings Manufacturing',
    lead: 'Local formulators and brands',
    body: 'Binder emulsions supplied to paint manufacturers, with grade selection support, starting formulations and batch-consistent supply for continuous production.',
    categories: ['architectural-emulsion', 'interior-wall-paint', 'stone-like-paint'],
  },
  {
    icon: Layers,
    name: 'Tile, Adhesives & Bonding',
    lead: 'Fit-out and finishing trades',
    body: 'Ceramic tile adhesives, transparent waterproof adhesives and wall curing agents for interface treatment — engineered for adhesion on demanding construction substrates.',
    categories: ['ceramic-tile-adhesive', 'transparent-waterproof-adhesive', 'wall-curing-agent-adhesive'],
  },
  {
    icon: ShieldCheck,
    name: 'Metal & Anti-Corrosion',
    lead: 'Coastal and industrial assets',
    body: 'Rust converters that turn existing corrosion into a primer layer, and rust stabilising agents for steel and iron exposed to humid, saline coastal conditions.',
    categories: ['rust-converter', 'rust-stabilizer', 'sand-fixing-agent'],
  },
];

export default function IndustriesPage() {
  const sectors = INDUSTRIES.map((ind) => {
    const products = ind.categories.flatMap((c) => getProductsByCategory(c));
    return { ...ind, count: products.length, sample: products[0] };
  });

  return (
    <div className="bg-white">
      <PageHero
        eyebrowKey="page.industries.eyebrow"
        titleKey="page.industries.title"
        intro="From ready-made garments to infrastructure — emulsions, coatings and adhesives selected for local substrates, climate and production conditions."
        crumbs={[{ labelKey: 'nav.industries' }]}
      />

      {/* Sector grid */}
      <section className="section">
        <div className="shell">
          <Reveal className="max-w-3xl mb-14">
            <p className="eyebrow mb-5">Sectors served</p>
            <h2 className="text-step-3 mb-5">Six sectors, one supply chain</h2>
            <p className="text-[var(--ink-3)] text-step-0 leading-relaxed">
              Every sector below links to the products we actually manufacture for
              it — no category is listed that we cannot supply.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((s, idx) => (
              <StaggerItem key={s.name}>
                <Link
                  href={`/products?category=${s.categories[0]}`}
                  className="group relative flex flex-col h-full bg-white border border-[var(--line)] hover:border-[var(--brand-teal)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-20px_rgba(13,20,24,0.4)]"
                >
                  <div className="relative px-7 pt-7 pb-6 border-b border-[var(--line)]">
                    <span className="index-num absolute top-6 right-7">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="grid place-items-center w-12 h-12 border border-[var(--line-strong)] text-[var(--brand-teal)] mb-5 transition-all duration-300 group-hover:bg-[var(--brand-teal)] group-hover:border-[var(--brand-teal)] group-hover:text-white">
                      <s.icon className="w-[22px] h-[22px]" />
                    </span>
                    <h3 className="text-step-1 font-bold leading-tight mb-1 transition-colors group-hover:text-[var(--brand-red)]">
                      {s.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--brand-teal)]">
                      {s.lead}
                    </p>
                  </div>

                  <div className="flex flex-col flex-grow p-7">
                    <p className="text-sm text-[var(--steel)] leading-relaxed mb-6">{s.body}</p>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-5 border-t border-[var(--line)]">
                      <span className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink-3)]">
                        <span className="tnum text-[var(--brand-red)]">{s.count}</span>{' '}
                        product{s.count === 1 ? '' : 's'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--brand-red)]">
                        View
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>

                  <span className="absolute left-0 bottom-0 h-[3px] w-full bg-[var(--brand-red)] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why local supply matters */}
      <section className="section bg-[var(--ink)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-60" aria-hidden />
        <div
          className="absolute top-0 right-0 h-full w-[30%] bg-[var(--brand-teal)]/12 hidden lg:block"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
          aria-hidden
        />

        <div className="shell relative max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-6">Why it matters locally</p>
            <h2 className="text-step-3 mb-6">Made in Bangladesh, for Bangladesh</h2>
            <div className="w-20 h-[6px] bg-[var(--brand-red)] mb-8" />
            <p className="text-step-1 text-white/70 font-light leading-relaxed mb-10">
              Manufacturers here work with humid, saline and monsoon-exposed
              conditions that punish the wrong specification. Producing inside the{' '}
              {BANGLADESH.zone} means shorter lead times, less import dependency and
              a technical team reachable in the same time zone.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { k: BANGLADESH.investmentLabel, v: 'Committed investment' },
              { k: `${BANGLADESH.jobs}+`, v: 'Local positions planned' },
              { k: `${PRODUCTS.length}`, v: 'Products in the catalogue' },
            ].map((s) => (
              <StaggerItem key={s.v}>
                <div className="bg-[var(--ink)] p-6 h-full">
                  <p className="text-step-2 font-bold text-[var(--brand-teal)] leading-none mb-2 tnum">
                    {s.k}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-white/70">
                    {s.v}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-10 flex flex-wrap gap-3" delay={0.1}>
            <Link href="/contact" className="btn btn-primary cut-br group">
              Discuss your sector
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/services" className="btn btn-on-dark">
              See our services
            </Link>
          </Reveal>
        </div>
      </section>

      <NewsletterStrip />
    </div>
  );
}
