"use client";

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useT } from '@/i18n/LanguageProvider';
import type { Dict } from '@/i18n/dictionaries';

interface PageHeroProps {
  /** Dictionary key — takes precedence over `eyebrow`. */
  eyebrowKey?: keyof Dict;
  /** Dictionary key — takes precedence over `title`. */
  titleKey?: keyof Dict;
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** Breadcrumb trail after Home. Pass `labelKey` to translate. */
  crumbs?: { label?: string; labelKey?: keyof Dict; href?: string }[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Shared dark banner used by the secondary pages. */
export function PageHero({
  eyebrowKey,
  titleKey,
  eyebrow,
  title,
  intro,
  crumbs = [],
}: PageHeroProps) {
  const reduced = useReducedMotion();
  const t = useT();

  const eyebrowText = eyebrowKey ? t(eyebrowKey) : eyebrow ?? '';
  const titleText = titleKey ? t(titleKey) : title ?? '';

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: EASE },
  });

  return (
    <>
      <div className="bg-[var(--paper-2)] border-b border-[var(--line)]">
        <div className="shell py-3 text-xs text-[var(--steel)] flex flex-wrap items-center gap-1.5">
          <Link href="/" className="hover:text-[var(--brand-red)] transition-colors">
            {t('nav.home')}
          </Link>
          {crumbs.map((c, i) => {
            const label = c.labelKey ? t(c.labelKey) : c.label ?? '';
            return (
              <span key={c.labelKey ?? c.label ?? i} className="flex items-center gap-1.5">
                <span className="text-[var(--line-strong)]">/</span>
                {c.href && i < crumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-[var(--brand-red)] transition-colors">
                    {label}
                  </Link>
                ) : (
                  <span className="font-bold text-[var(--ink)]">{label}</span>
                )}
              </span>
            );
          })}
        </div>
      </div>

      <div className="relative bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden />
        <div
          className="absolute top-0 right-0 h-full w-1/3 bg-[var(--brand-teal)]/12 hidden md:block"
          style={{ clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0 100%)' }}
          aria-hidden
        />
        <div className="absolute left-0 top-0 h-full w-[3px] bg-[var(--brand-red)]" aria-hidden />

        <div className="shell relative py-16 lg:py-20">
          <motion.p className="eyebrow mb-5" {...rise(0)}>
            {eyebrowText}
          </motion.p>
          <motion.h1 className="text-step-4 max-w-4xl" {...rise(0.06)}>
            {titleText}
          </motion.h1>
          {intro && (
            <motion.p className="mt-6 text-white/60 max-w-3xl text-step-0 leading-relaxed" {...rise(0.12)}>
              {intro}
            </motion.p>
          )}
        </div>
      </div>
    </>
  );
}
