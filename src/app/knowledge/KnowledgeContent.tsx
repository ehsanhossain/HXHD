"use client";

import Link from 'next/link';
import { ArrowRight, FileText, Beaker, Download, Library } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { NewsletterStrip } from '../components/contact/NewsletterStrip';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { TECHNICAL_ARTICLES, COMPANY_ARTICLES, ARTICLES } from '@/data/knowledge';
import { MILESTONES } from '@/data/company';
import { useI18n } from '@/i18n/LanguageProvider';


const QUICK_LINK_ICONS = [FileText, Library];
const QUICK_LINK_HREFS = ['/products', '/knowledge'];

function ArticleCard({
  article,
  index,
}: {
  article: (typeof ARTICLES)[number];
  index: number;
}) {
  const { c, locale, article: localized } = useI18n();
  const copy = localized(article.slug, { title: article.title, summary: article.summary });

  return (
    <Link
      href={`/knowledge/${article.slug}`}
      className="group relative flex flex-col h-full bg-white border border-[var(--line)] hover:border-[var(--brand-teal)] transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-28 bg-[var(--paper-2)] border-b border-[var(--line)] overflow-hidden">
        <div className="absolute inset-0 bg-hatch opacity-70 group-hover:opacity-0 transition-opacity duration-300" aria-hidden />
        <div className="absolute inset-0 bg-hatch-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
        <span
          aria-hidden
          className="absolute top-4 left-6 stroke-text text-[2.8rem] font-bold leading-none select-none tnum"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute bottom-0 left-6 bg-[var(--brand-red)] text-white px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em]">
          {article.kind === 'Technical' ? c.knowledge.kindTechnical : c.knowledge.kindCompany}
        </span>
      </div>

      <div className="flex flex-col flex-grow p-6">
        <time
          dateTime={article.iso}
          className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[var(--steel)] mb-3"
        >
          {new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : locale === 'bn' ? 'bn-BD' : 'en-GB',
            { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(article.iso))}
        </time>

        <h3 className="text-step-1 font-bold leading-snug mb-3 transition-colors group-hover:text-[var(--brand-red)]">
          {copy.title}
        </h3>

        <p className="text-sm text-[var(--steel)] leading-relaxed mb-5">{copy.summary}</p>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-[var(--line)]">
          <span className="flex flex-wrap gap-1.5">
            {article.topics.map((t) => (
              <span
                key={t}
                className="px-2 py-1 bg-[var(--paper-2)] text-[0.62rem] font-bold uppercase tracking-[0.08em] text-[var(--ink-3)]"
              >
                {c.topics[t] ?? t}
              </span>
            ))}
          </span>
          <ArrowRight className="w-4 h-4 text-[var(--brand-teal)] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export function KnowledgeContent() {
  const { c, fill } = useI18n();
  const QUICK_LINKS = [c.home.findTds, c.home.technicalLibrary].map((label, i) => ({
    label,
    icon: QUICK_LINK_ICONS[i],
    href: QUICK_LINK_HREFS[i],
  }));

  return (
    <div className="bg-white">
      <PageHero
        eyebrowKey="page.knowledge.eyebrow"
        titleKey="page.knowledge.title"
        intro={fill(c.knowledge.intro, { n: TECHNICAL_ARTICLES.length })}
        crumbs={[{ labelKey: 'nav.knowledge' }]}
        image="/images/page/knowledge.webp"
        imageAlt="Transparent waterproof coating brushed along an exterior window reveal"
      />

      {/* Technical guides */}
      <section className="section">
        <div className="shell">
          <Reveal className="flex flex-wrap justify-between items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="eyebrow mb-5">{c.knowledge.guidesEyebrow}</p>
              <h2 className="text-step-3">{c.knowledge.guidesTitle}</h2>
            </div>
            <p className="text-sm text-[var(--steel)]">
              <span className="tnum font-bold text-[var(--ink)]">
                {TECHNICAL_ARTICLES.length}
              </span>{' '}
              {c.knowledge.articlesLabel}
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECHNICAL_ARTICLES.map((a, i) => (
              <StaggerItem key={a.slug}>
                <ArticleCard article={a} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Company timeline */}
      <section className="section bg-[var(--ink)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-60" aria-hidden />

        <div className="shell relative">
          <Reveal className="max-w-2xl mb-14">
            <p className="eyebrow eyebrow-on-dark mb-6">{c.knowledge.timelineEyebrow}</p>
            <h2 className="text-step-3 mb-6">{c.knowledge.timelineTitle}</h2>
            <div className="w-20 h-[6px] bg-[var(--brand-red)]" />
          </Reveal>

          <Stagger className="border-t border-white/12">
            {MILESTONES.map((m, mi) => (
              <StaggerItem key={m.year}>
                <div className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-white/12 items-start">
                  <p className="md:col-span-2 text-step-2 font-bold text-[var(--brand-teal)] leading-none tnum">
                    {m.year}
                  </p>
                  <h3 className="md:col-span-4 text-step-1 font-bold leading-snug">
                    {c.milestones[mi]?.title ?? m.title}
                  </h3>
                  <p className="md:col-span-6 text-white/60 leading-relaxed text-sm">
                    {c.milestones[mi]?.body ?? m.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Company updates */}
      <section className="section bg-[var(--paper-2)] border-b border-[var(--line)]">
        <div className="shell">
          <Reveal className="max-w-2xl mb-12">
            <p className="eyebrow mb-5">{c.knowledge.updatesEyebrow}</p>
            <h2 className="text-step-3">{c.knowledge.updatesTitle}</h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_ARTICLES.map((a, i) => (
              <StaggerItem key={a.slug}>
                <ArticleCard article={a} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Documentation */}
      <section className="section">
        <div className="shell grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="eyebrow mb-5">{c.knowledge.docsTitle ? c.home.resourcesTitle && c.knowledge.updatesEyebrow : ''}</p>
            <h2 className="text-step-3 mb-5">{c.knowledge.docsTitle}</h2>
            <p className="text-[var(--ink-3)] leading-relaxed mb-8">
              {c.knowledge.docsBody}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-primary cut-br group">
                {c.knowledge.browseBtn}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                {c.knowledge.requestDocsBtn}
              </Link>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-2 gap-5" delay={0.08}>
            {QUICK_LINKS.map((link) => (
              <StaggerItem key={link.label}>
                <Link
                  href={link.href}
                  className="group relative flex flex-col items-center justify-center gap-4 p-9 h-full bg-white border border-[var(--line)] hover:border-[var(--brand-red)] transition-all duration-300 hover:-translate-y-1"
                >
                  <link.icon className="w-9 h-9 text-[var(--steel)] group-hover:text-[var(--brand-red)] transition-colors" />
                  <span className="font-bold text-[var(--ink-2)] group-hover:text-[var(--brand-red)] transition-colors text-center">
                    {link.label}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <NewsletterStrip />
    </div>
  );
}
