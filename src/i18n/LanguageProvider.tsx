"use client";

import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { DEFAULT_LOCALE, LOCALE_META, STORAGE_KEY, type Locale } from './config';
import { DICTIONARIES, type Dict } from './dictionaries';
import { PAGE_CONTENT, type PageContent } from './content';
import { localizedSummary } from './productCopy';
import { localizedArticle, type ArticleCopy } from './articleCopy';
import { localizedBody } from './articleBody';
import type { Block } from '@/data/knowledge';

type Vars = Record<string, string | number>;

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Short UI strings. */
  t: (key: keyof Dict, vars?: Vars) => string;
  /** Structured page content for the active locale. */
  c: PageContent;
  /** Localised category name, falling back to the English name in the data. */
  categoryName: (slug: string, fallback?: string) => string;
  /** Fills {placeholders} in any string taken from `c`. */
  fill: (template: string, vars: Vars) => string;
  /** Localised product card summary, falling back to the English one. */
  summary: (slug: string, fallback: string) => string;
  /** Localised article title + summary, falling back to the English one. */
  article: (href: string, fallback: ArticleCopy) => ArticleCopy;
  /** Localised article body blocks, falling back to the English ones. */
  articleBody: (slug: string, fallback: Block[]) => Block[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function interpolate(template: string, vars?: Vars) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in vars ? String(vars[key]) : match
  );
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start from the default so server and first client render agree;
  // the stored preference is applied in an effect after hydration.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && stored in DICTIONARIES) setLocaleState(stored);
    } catch {
      /* storage unavailable — stay on the default */
    }
  }, []);

  // Keep <html lang> honest for screen readers and font/line-break selection
  useEffect(() => {
    document.documentElement.lang = LOCALE_META[locale].htmlLang;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: keyof Dict, vars?: Vars) => {
      const dict = DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
      // Fall back to English if a key is missing from a translation
      const value = dict[key] ?? DICTIONARIES[DEFAULT_LOCALE][key] ?? String(key);
      return interpolate(value, vars);
    },
    [locale]
  );

  const c = PAGE_CONTENT[locale] ?? PAGE_CONTENT[DEFAULT_LOCALE];

  const categoryName = useCallback(
    (slug: string, fallback?: string) =>
      c.categories[slug] ?? PAGE_CONTENT[DEFAULT_LOCALE].categories[slug] ?? fallback ?? slug,
    [c]
  );

  const fill = useCallback((template: string, vars: Vars) => interpolate(template, vars), []);

  const summary = useCallback(
    (slug: string, fallback: string) => localizedSummary(locale, slug, fallback),
    [locale]
  );

  const article = useCallback(
    (href: string, fallback: ArticleCopy) => localizedArticle(locale, href, fallback),
    [locale]
  );

  const articleBody = useCallback(
    (slug: string, fallback: Block[]) => localizedBody(locale, slug, fallback),
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, c, categoryName, fill, summary, article, articleBody }),
    [locale, setLocale, t, c, categoryName, fill, summary, article, articleBody]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>');
  return ctx;
}

/** Convenience hook when only the translate function is needed. */
export function useT() {
  return useI18n().t;
}
