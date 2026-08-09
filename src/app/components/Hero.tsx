"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, CheckCircle2, FlaskConical, Globe2, FileText, Pause, Play,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PRODUCTS, getProductBySlug } from '@/data/products';
import { useT } from '@/i18n/LanguageProvider';

/** How long each slide holds, in milliseconds. */
const SLIDE_DURATION = 12_000;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Four capability areas, each anchored to a real product from the catalogue.
 * `code` is resolved against PRODUCTS so the imagery and links can never
 * drift from the data module.
 */
const SLIDES = [
  {
    code: 'HX-470',
    k: 's1',
    accentLine: 1,
  },
  {
    code: 'HX-470',
    k: 's2',
    accentLine: 1,
  },
  {
    code: 'HX-303',
    k: 's3',
    accentLine: 1,
  },
  {
    code: 'HX-3086',
    k: 's4',
    accentLine: 1,
  },
] as const;

const MARKERS = [
  { icon: CheckCircle2, k: 'trust.established' },
  { icon: Globe2, k: 'trust.production' },
  { icon: FlaskConical, k: 'trust.oem' },
  { icon: FileText, k: 'trust.docs' },
] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const t = useT();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Track elapsed time so pause/resume continues rather than restarting
  const startedAt = useRef<number>(0);
  const elapsed = useRef<number>(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((next: number) => {
    elapsed.current = 0;
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance. Disabled entirely when the user prefers reduced motion.
  useEffect(() => {
    if (reduced || paused) {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
        elapsed.current += Date.now() - startedAt.current;
      }
      return;
    }

    const remaining = Math.max(SLIDE_DURATION - elapsed.current, 0);
    startedAt.current = Date.now();
    timer.current = setTimeout(() => {
      elapsed.current = 0;
      setIndex((i) => (i + 1) % SLIDES.length);
    }, remaining);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, reduced]);

  // Don't burn through slides while the tab is in the background
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const slide = SLIDES[index];
  const product = getProductBySlug(
    PRODUCTS.find((p) => p.code === slide.code)?.slug ?? ''
  ) ?? PRODUCTS[0];

  const autoRotating = !reduced;

  return (
    <section
      className="relative w-full bg-[var(--ink)] text-white overflow-hidden"
      aria-roledescription="carousel"
      aria-label="HXHD capabilities"
      onMouseEnter={() => autoRotating && setPaused(true)}
      onMouseLeave={() => autoRotating && setPaused(false)}
      onFocusCapture={() => autoRotating && setPaused(true)}
      onBlurCapture={() => autoRotating && setPaused(false)}
    >
      <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden />
      <div
        className="absolute top-0 right-0 h-full w-1/2 opacity-[0.13] hidden md:block"
        style={{ background: 'var(--brand-teal)', clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 0 100%)' }}
        aria-hidden
      />
      <div className="absolute left-0 top-0 h-full w-[3px] bg-[var(--brand-red)]" aria-hidden />

      {/* Fills the viewport below the sticky header (utility bar + main bar
          ≈ 7rem), with content vertically centred inside it. min-height, not
          height, so shorter screens simply scroll rather than clipping. */}
      <div className="shell relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center py-12 lg:py-[clamp(2.5rem,5vh,4rem)] lg:min-h-[calc(100dvh-7rem)]">
        {/* Copy */}
        <div
          className="lg:col-span-7 xl:col-span-6"
          aria-live="polite"
          aria-atomic="false"
        >
          {/* Height reserved so varying copy length can't shift the controls
              and credentials below between slides */}
          <div className="lg:min-h-[21rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -12 }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
            >
              <p className="eyebrow !text-[var(--brand-teal)] mb-5">
                {t(`hero.${slide.k}.eyebrow` as never)}
              </p>

              <h1 className="text-step-4 font-bold mb-5 leading-[1.02]">
                {[1, 2, 3].map((n, i) => (
                  <span
                    key={n}
                    className={`block ${i === slide.accentLine ? 'text-[var(--brand-teal)]' : ''}`}
                  >
                    {t(`hero.${slide.k}.l${n}` as never)}
                  </span>
                ))}
              </h1>

              <p className="text-step-0 text-white/65 max-w-2xl mb-8 leading-relaxed">
                {t(`hero.${slide.k}.copy` as never)}
              </p>
            </motion.div>
          </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link href="/products" className="btn btn-primary cut-br group">
              {t('cta.exploreProducts', { n: PRODUCTS.length })}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="btn btn-on-dark">
              {t('cta.talkToTeam')}
            </Link>
          </div>

          {/* Slide controls */}
          <div className="flex items-center gap-4 mb-[clamp(1.5rem,3vh,2.5rem)]">
            <div className="flex items-center gap-2" role="tablist" aria-label={t('hero.chooseSlide')}>
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${t('hero.chooseSlide')} ${i + 1} / ${SLIDES.length}`}
                  onClick={() => goTo(i)}
                  className="group relative h-9 px-1 flex items-center"
                >
                  <span
                    className={`block h-[3px] transition-all duration-300 ${
                      i === index
                        ? 'w-12 bg-white/25'
                        : 'w-6 bg-white/25 group-hover:bg-white/50'
                    }`}
                  >
                    {i === index && (
                      <span
                        key={`${index}-${paused}-${String(reduced)}`}
                        className={`block h-full bg-[var(--brand-teal)] ${
                          autoRotating ? 'hero-progress' : 'w-full'
                        }`}
                        style={
                          autoRotating
                            ? {
                                ['--hero-duration' as string]: `${SLIDE_DURATION}ms`,
                                animationPlayState: paused ? 'paused' : 'running',
                                animationDelay: `-${elapsed.current}ms`,
                              }
                            : undefined
                        }
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            {autoRotating && (
              <button
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? t('hero.resume') : t('hero.pause')}
                className="grid place-items-center w-9 h-9 border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
              >
                {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            )}

            <span className="index-num !text-white/40">
              {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>
          </div>

          {/* Constant credentials — deliberately static across slides */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 pt-[clamp(1.25rem,2.5vh,1.75rem)] border-t border-white/12">
            {MARKERS.map(({ icon: Icon, k }) => (
              <li key={k} className="flex items-center gap-3 text-sm text-white/70">
                <span className="grid place-items-center w-9 h-9 border border-white/15 text-[var(--brand-teal)] shrink-0">
                  <Icon className="w-[18px] h-[18px]" />
                </span>
                <span className="font-medium">{t(k)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Product plate */}
        <div className="lg:col-span-5 xl:col-span-6 relative">
          <div className="relative mx-auto max-w-lg">
            <div className="absolute -inset-4 border border-white/12 cut-tr-lg hidden sm:block" aria-hidden />

            <div className="relative bg-white cut-tr-lg overflow-hidden ticks">
              <div className="absolute inset-0 bg-hatch opacity-40" aria-hidden />

              <div className="relative aspect-square">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={product.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: reduced ? 1 : 0.98 }}
                    transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 90vw, 40vw"
                      className="object-contain p-10"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Spec plate */}
              <div className="relative bg-[var(--ink)] text-white px-6 py-4 flex items-center justify-between gap-4 min-h-[68px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={product.slug}
                    className="min-w-0"
                    initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                    transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
                  >
                    <p className="index-num !text-[var(--brand-teal)]">
                      {product.code || 'FEATURED'}
                    </p>
                    <p className="font-bold text-sm truncate">{product.category}</p>
                  </motion.div>
                </AnimatePresence>

                <Link
                  href={`/products/${product.slug}`}
                  className="link-sweep text-[var(--brand-teal)] text-xs font-bold uppercase tracking-widest shrink-0"
                >
                  {t('cta.view')} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Count chip — above the plate so it never covers the spec bar */}
            <div className="absolute -top-5 -left-3 sm:-left-6 z-10 bg-[var(--brand-red)] text-white px-5 py-3 cut-br shadow-lg">
              <span className="block text-2xl font-bold leading-none tnum">
                {PRODUCTS.length}
              </span>
              <span className="block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/80 mt-1">
                {t('hero.productsInCatalogue')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
