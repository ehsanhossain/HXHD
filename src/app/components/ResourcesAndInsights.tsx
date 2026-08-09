"use client";

import Link from 'next/link';
import { FileText, Download, Beaker, Library, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { TECHNICAL_ARTICLES } from '@/data/knowledge';
import { useT } from '@/i18n/LanguageProvider';

/** Three real published guides, newest first. */
const ARTICLES = TECHNICAL_ARTICLES.slice(0, 3);

const QUICK_LINKS = [
  { label: 'Find a TDS', icon: FileText, href: '/products' },
  { label: 'Find a SDS', icon: Beaker, href: '/contact' },
  { label: 'Download Center', icon: Download, href: '/contact' },
  { label: 'Technical Library', icon: Library, href: '/knowledge' },
];

const FIELD =
  'w-full h-12 px-4 bg-[var(--paper-2)] border border-[var(--line)] focus:border-[var(--brand-teal)] focus:outline-none text-[var(--ink)] placeholder:text-[var(--steel-2)] transition-colors';

export function ResourcesAndInsights() {
  const t = useT();

  return (
    <>
      {/* ── Technical resources ─────────────────────────────── */}
      <section className="section bg-[var(--paper-2)]">
        <div className="shell grid grid-cols-1 lg:grid-cols-2 gap-14">
          <Reveal>
            <p className="eyebrow mb-5">{t('sec.documentation')}</p>
            <h2 className="text-step-3 mb-4">Get easy access to technical resources</h2>
            <p className="text-[var(--ink-3)] text-step-0 mb-8 leading-relaxed">
              Access TDS, SDS, technical bulletins, application guides and product
              documentation.
            </p>

            <div className="bg-white p-7 sm:p-8 border border-[var(--line)] cut-br">
              <form className="grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="res-name" className="block text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink-3)] mb-2">
                      Name
                    </label>
                    <input id="res-name" type="text" autoComplete="name" className={FIELD} />
                  </div>
                  <div>
                    <label htmlFor="res-company" className="block text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink-3)] mb-2">
                      Company
                    </label>
                    <input id="res-company" type="text" autoComplete="organization" className={FIELD} />
                  </div>
                </div>

                <div>
                  <label htmlFor="res-email" className="block text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink-3)] mb-2">
                    Email
                  </label>
                  <input id="res-email" type="email" autoComplete="email" className={FIELD} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="res-country" className="block text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink-3)] mb-2">
                      Country
                    </label>
                    <select id="res-country" className={FIELD} defaultValue="">
                      <option value="" disabled>Select country</option>
                      <option>China</option>
                      <option>Bangladesh</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="res-role" className="block text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink-3)] mb-2">
                      Role
                    </label>
                    <input id="res-role" type="text" className={FIELD} />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-full mt-2 cut-br">
                  Sign up
                </button>
                <p className="text-xs text-[var(--steel-2)] text-center">
                  By signing up, you agree to our Terms of Use and Privacy Policy.
                </p>
              </form>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5 self-center" delay={0.1}>
            {QUICK_LINKS.map((link) => (
              <StaggerItem key={link.label}>
                <Link
                  href={link.href}
                  className="group relative flex flex-col items-center justify-center gap-4 p-9 h-full bg-white border border-[var(--line)] hover:border-[var(--brand-red)] transition-all duration-300 hover:-translate-y-1"
                >
                  <link.icon className="w-9 h-9 text-[var(--steel-2)] group-hover:text-[var(--brand-red)] transition-colors" />
                  <span className="font-bold text-[var(--ink-2)] group-hover:text-[var(--brand-red)] transition-colors text-center">
                    {link.label}
                  </span>
                  <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-[var(--steel-2)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Knowledge ───────────────────────────────────────── */}
      <section className="section bg-white border-t border-[var(--line)]">
        <div className="shell">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div className="max-w-xl">
              <p className="eyebrow mb-5">{t('sec.knowledge')}</p>
              <h2 className="text-step-3">
                Knowledge that supports better formulation decisions
              </h2>
            </div>
            <Link
              href="/knowledge"
              className="link-sweep text-[var(--brand-teal)] font-bold text-sm uppercase tracking-[0.1em]"
            >
              Explore Knowledge Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--line)] border border-[var(--line)]">
            {ARTICLES.map((article, idx) => (
              <StaggerItem key={article.href}>
                <a
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col h-full bg-white p-8 hover:bg-[var(--ink)] transition-colors duration-300 overflow-hidden"
                >
                  {/* Graphical plate instead of stock photography */}
                  <div className="relative h-32 -mx-8 -mt-8 mb-7 bg-[var(--paper-2)] border-b border-[var(--line)] overflow-hidden transition-colors duration-300 group-hover:bg-[var(--ink-2)] group-hover:border-white/10">
                    <div className="absolute inset-0 bg-hatch opacity-70 group-hover:opacity-0 transition-opacity duration-300" aria-hidden />
                    <div className="absolute inset-0 bg-hatch-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                    <span className="absolute top-5 left-8 stroke-text text-[3.4rem] font-bold leading-none select-none tnum">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="absolute bottom-0 left-8 bg-[var(--brand-red)] text-white px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em]">
                      {article.kind}
                    </span>
                  </div>

                  <h3 className="text-step-1 font-bold mb-3 leading-snug transition-colors group-hover:text-white line-clamp-3">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[var(--steel)] mb-8 transition-colors group-hover:text-white/45">
                    {article.topics.join(' · ')}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[var(--brand-teal)] transition-colors group-hover:text-white">
                    Read article
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
