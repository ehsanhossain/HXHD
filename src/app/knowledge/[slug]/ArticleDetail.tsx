"use client";

import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import type { Article } from '@/data/knowledge';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useI18n } from '@/i18n/LanguageProvider';

/** Roughly 200 words a minute, floored at one so nothing reads "0 min". */
function readingMinutes(article: Article): number {
  const words = article.body.reduce((n, b) => n + b.text.split(/\s+/).length, 0);
  return Math.max(1, Math.round(words / 200));
}

export function ArticleDetail({
  article,
  related,
}: {
  article: Article;
  related: Article[];
}) {
  const { c, t, locale, fill, article: localized, articleBody } = useI18n();

  const copy = localized(article.slug, { title: article.title, summary: article.summary });
  const body = articleBody(article.slug, article.body);
  const kind = article.kind === 'Technical' ? c.knowledge.kindTechnical : c.knowledge.kindCompany;
  const dateLabel = new Intl.DateTimeFormat(
    locale === 'zh' ? 'zh-CN' : locale === 'bn' ? 'bn-BD' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' },
  ).format(new Date(article.iso));

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-[var(--paper-2)] border-b border-[var(--line)]">
        <div className="shell py-3 text-xs text-[var(--steel)] flex flex-wrap items-center gap-1.5">
          <Link href="/" className="hover:text-[var(--brand-red)] transition-colors">
            {t('nav.home')}
          </Link>
          <span className="text-[var(--line-strong)]">/</span>
          <Link href="/knowledge" className="hover:text-[var(--brand-red)] transition-colors">
            {t('nav.knowledge')}
          </Link>
          <span className="text-[var(--line-strong)]">/</span>
          <span className="font-bold text-[var(--ink)] line-clamp-1">{copy.title}</span>
        </div>
      </div>

      {/* Masthead */}
      <header className="relative bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-60" aria-hidden />
        <div
          className="absolute top-0 right-0 w-1/3 h-full bg-hatch-red opacity-[0.07]"
          aria-hidden
        />

        <div className="shell relative py-14 lg:py-20">
          <Reveal className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-7">
              <span className="bg-[var(--brand-red)] px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em]">
                {kind}
              </span>
              {article.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2.5 py-1.5 border border-white/20 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white/70"
                >
                  {c.topics[topic] ?? topic}
                </span>
              ))}
            </div>

            <h1 className="text-step-4 leading-[1.12] mb-7">{copy.title}</h1>

            <p className="text-white/65 leading-relaxed text-step-0 mb-8 max-w-2xl">
              {copy.summary}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-white/45">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--brand-teal)]" />
                <time dateTime={article.iso} className="tnum">
                  {dateLabel}
                </time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--brand-teal)]" />
                <span className="tnum">
                  {fill(c.knowledge.minRead, { n: readingMinutes(article) })}
                </span>
              </span>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 w-24 h-[6px] bg-[var(--brand-red)]" aria-hidden />
      </header>

      {/* Body */}
      <article className="shell py-14 lg:py-20">
        <div className="max-w-[68ch] mx-auto">
          <Stagger>
            {body.map((block, i) => {
              if (block.tag === 'h') {
                return (
                  <StaggerItem key={i}>
                    <h2 className="text-step-2 leading-snug mt-12 mb-5 first:mt-0">
                      {block.text}
                    </h2>
                  </StaggerItem>
                );
              }
              if (block.tag === 'quote') {
                return (
                  <StaggerItem key={i}>
                    <blockquote className="my-9 pl-6 border-l-[6px] border-[var(--brand-red)] bg-[var(--paper-2)] py-5 pr-6">
                      <p className="text-step-1 leading-relaxed font-medium text-[var(--ink)]">
                        {block.text}
                      </p>
                    </blockquote>
                  </StaggerItem>
                );
              }
              if (block.tag === 'li') {
                return (
                  <StaggerItem key={i}>
                    <p className="relative pl-7 mb-4 leading-[1.85] text-[var(--steel)]">
                      <span
                        className="absolute left-0 top-[0.62em] w-3 h-[3px] bg-[var(--brand-teal)]"
                        aria-hidden
                      />
                      {block.text}
                    </p>
                  </StaggerItem>
                );
              }
              return (
                <StaggerItem key={i}>
                  <p className="mb-6 leading-[1.85] text-[var(--steel)]">{block.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Attribution */}
          <Reveal className="mt-14 pt-7 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-[var(--steel-2)]">{c.knowledge.originallyPublished}</p>
            <a
              href={article.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] text-[var(--brand-teal)] hover:text-[var(--brand-red)] transition-colors"
            >
              {c.knowledge.viewOriginal}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </Reveal>

          <Reveal className="mt-10">
            <Link
              href="/knowledge"
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--ink)] hover:text-[var(--brand-red)] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              {c.knowledge.backToKnowledge}
            </Link>
          </Reveal>
        </div>
      </article>

      {/* Enquiry prompt */}
      <section className="bg-[var(--paper-2)] border-y border-[var(--line)]">
        <div className="shell py-14">
          <Reveal className="flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-step-2 mb-3">{c.knowledge.articleCtaTitle}</h2>
              <p className="text-sm text-[var(--steel)] leading-relaxed">
                {c.knowledge.articleCtaBody}
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary cut-br group">
              {c.knowledge.articleCtaBtn}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section">
          <div className="shell">
            <Reveal className="mb-10">
              <p className="eyebrow mb-5">{c.knowledge.guidesEyebrow}</p>
              <h2 className="text-step-3">{c.knowledge.relatedTitle}</h2>
            </Reveal>

            <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => {
                const rc = localized(r.slug, { title: r.title, summary: r.summary });
                return (
                  <StaggerItem key={r.slug}>
                    <Link
                      href={`/knowledge/${r.slug}`}
                      className="group flex flex-col h-full bg-white border border-[var(--line)] p-7 hover:border-[var(--brand-teal)] transition-all duration-300 hover:-translate-y-1"
                    >
                      <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[var(--brand-red)] mb-4">
                        {r.kind === 'Technical'
                          ? c.knowledge.kindTechnical
                          : c.knowledge.kindCompany}
                      </span>
                      <h3 className="text-step-1 font-bold leading-snug mb-3 transition-colors group-hover:text-[var(--brand-red)]">
                        {rc.title}
                      </h3>
                      <p className="text-sm text-[var(--steel)] leading-relaxed line-clamp-3">
                        {rc.summary}
                      </p>
                      <ArrowRight className="w-4 h-4 text-[var(--brand-teal)] mt-6 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}
    </div>
  );
}
