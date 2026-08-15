"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, CheckCircle2, FlaskConical, Globe2, FileText, Pause, Play,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PRODUCTS, getProductsByCategory } from '@/data/products';
import { useT } from '@/i18n/LanguageProvider';

/** How long each headline slide holds, in milliseconds. */
const SLIDE_DURATION = 12_000;

/** How long each product holds in the plate. Divides into SLIDE_DURATION. */
const PRODUCT_DURATION = 4_000;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Four capability areas. Each names the catalogue categories it covers, so
 * the product plate can rotate through real products for that area — the
 * imagery can never drift from the data module.
 *
 * Slide 1 has no category of its own; it shows the most-reviewed products
 * across the whole catalogue.
 */
const SLIDES = [
  {
    k: 's1',
    accentLine: 1,
    cats: [] as string[],
    // Slide 1 speaks to capability rather than a category, so it gets the
    // plant/QC frame. Each other slide gets the application its copy names.
    image: '/images/hero/lab-qc.webp',
    imageAlt: 'HXHD chemist checking an emulsion batch against spec on the production floor',
  },
  {
    k: 's2',
    accentLine: 1,
    cats: ['waterproof-emulsion'],
    image: '/images/hero/roof-waterproofing.webp',
    imageAlt: 'Applicator rolling waterproof emulsion across a rooftop deck above the Dhaka skyline',
  },
  {
    k: 's3',
    accentLine: 1,
    cats: ['architectural-emulsion'],
    image: '/images/hero/window-sealant.webp',
    imageAlt: 'Transparent waterproof coating being brushed along an exterior window reveal',
  },
  {
    k: 's4',
    accentLine: 1,
    cats: [
      'ceramic-tile-adhesive',
      'transparent-waterproof-adhesive',
      'wall-curing-agent-adhesive',
    ],
    image: '/images/hero/tile-adhesive.webp',
    imageAlt: 'Tiler bedding a large-format tile with HXHD ceramic tile back adhesive',
  },
] as const;

/** Most-reviewed products, used as slide 1's rotation. */
const FEATURED = [...PRODUCTS]
  .sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0))
  .slice(0, 6);

/** Products the plate cycles through for a given slide. */
function poolFor(slide: (typeof SLIDES)[number]) {
  if (!slide.cats.length) return FEATURED;
  const pool = slide.cats.flatMap((c) => getProductsByCategory(c));
  return pool.length ? pool : FEATURED;
}

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
  const [productIndex, setProductIndex] = useState(0);
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

  /**
   * Reset the plate to the first product of the new slide's pool.
   *
   * This lives in its own effect rather than alongside setIndex: the slide
   * advance (12s) and the third product tick (3 × 4s) land on the same
   * instant, and batching the two writes together let the tick win — which
   * meant pool[0] was skipped on every slide. An effect keyed on `index`
   * runs after that batch, so the reset always lands last.
   */
  useEffect(() => {
    setProductIndex(0);
  }, [index]);

  /**
   * The plate rotates faster than the headline — one product every
   * PRODUCT_DURATION, so each 12s headline shows three products from its own
   * category. Respects the same pause conditions as the headline.
   */
  useEffect(() => {
    if (reduced || paused) return;

    const id = setInterval(() => {
      setProductIndex((i) => i + 1);
    }, PRODUCT_DURATION);

    return () => clearInterval(id);
  }, [index, paused, reduced]);

  // Don't burn through slides while the tab is in the background
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const slide = SLIDES[index];
  const pool = poolFor(slide);
  // productIndex counts up without bound; wrap it against the current pool
  const product = pool[productIndex % pool.length] ?? PRODUCTS[0];

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
      {/* Application imagery. Decorative here — the headline already carries
          the message — so alt stays empty and the descriptive alt travels
          with the spec card below instead of being read twice. */}
      <div className="absolute inset-0" aria-hidden>
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.k}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.9, ease: EASE }}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-right"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scrim. Held to ~20% across the picture itself, which is where the
          photograph has to read. It only stays heavy over the copy column and
          falls away fast: measured in the copy zone these frames average
          L=0.33-0.62 and every one contains blown-out white, so white text
          needs roughly 60% ink behind it to clear AA in the worst patch.
          Hence 82% at the left edge, still 67% where the longest line ends,
          20% by the right. */}
      <div
        className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[var(--ink)]/88 from-0% via-[var(--ink)]/76 via-55% to-[var(--ink)]/20"
        aria-hidden
      />
      {/* Mobile stacks copy across the whole frame, so there is no clear
          column to fall away to — the scrim stays above the ~60% floor
          everywhere text lands, and only opens up below the fold. */}
      <div
        className="absolute inset-0 lg:hidden bg-gradient-to-b from-[var(--ink)]/82 via-[var(--ink)]/72 via-70% to-[var(--ink)]/62"
        aria-hidden
      />

      <div className="absolute inset-0 bg-grid-dark opacity-25" aria-hidden />
      <div className="absolute left-0 top-0 h-full w-[3px] bg-[var(--brand-red)]" aria-hidden />

      {/* Fills the viewport below the sticky header (utility bar + main bar
          ≈ 7rem), with content vertically centred inside it. min-height, not
          height, so shorter screens simply scroll rather than clipping. */}
      {/* Fills the viewport below the single sticky header (~6.25rem).
          min-height, not height, so shorter screens scroll rather than clip. */}
      <div className="shell relative z-10 flex flex-col justify-center py-14 lg:py-[clamp(2.5rem,5vh,4rem)] lg:min-h-[calc(100dvh-6.25rem)]">
        {/* Copy */}
        <div
          className="max-w-2xl xl:max-w-3xl"
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
              // mode="wait" holds the enter until the exit finishes, so the
              // exit has to be brief — otherwise the headline is simply
              // absent for half a second while the photo keeps moving.
              exit={{
                opacity: 0,
                y: reduced ? 0 : -12,
                transition: { duration: reduced ? 0 : 0.22, ease: EASE },
              }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
            >
              <p className="eyebrow eyebrow-on-dark mb-5">
                {t(`hero.${slide.k}.eyebrow` as never)}
              </p>

              <h1 className="text-step-4 font-bold mb-5 leading-[1.02]">
                {[1, 2, 3].map((n, i) => (
                  <span
                    key={n}
                    className={`block ${i === slide.accentLine ? 'text-[var(--teal-on-dark)]' : ''}`}
                  >
                    {t(`hero.${slide.k}.l${n}` as never)}
                  </span>
                ))}
              </h1>

              {/* /80 not /65: over a photograph the thinner tint measured
                  3.55:1 on the brightest frame. */}
              <p className="text-step-0 text-white/80 max-w-2xl mb-8 leading-relaxed">
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

            <span className="index-num !text-white/60">
              {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </span>
          </div>

          {/* Constant credentials — deliberately static across slides */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 pt-[clamp(1.25rem,2.5vh,1.75rem)] border-t border-white/12">
            {MARKERS.map(({ icon: Icon, k }) => (
              <li key={k} className="flex items-center gap-3 text-sm text-white/70">
                <span className="grid place-items-center w-9 h-9 border border-white/15 text-[var(--teal-on-dark)] shrink-0">
                  <Icon className="w-[18px] h-[18px]" />
                </span>
                <span className="font-medium">{t(k)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* In-focus product. The plate is gone — the photograph carries the
            scene now — but the catalogue path off the hero is worth keeping,
            so it survives as a spec card. xl only: below that the copy column
            and this card would fight for the same width. */}
        <div className="hidden xl:block absolute right-[clamp(1.25rem,0.5rem+3vw,3rem)] bottom-[clamp(2rem,5vh,3.5rem)] w-[22rem]">
          <div className="bg-[var(--ink)]/92 backdrop-blur-sm border border-white/15 cut-tr-lg ticks flex items-stretch">
            <div className="bg-[var(--brand-red)] text-white px-4 py-3 shrink-0 grid place-content-center text-center">
              <span className="block text-2xl font-bold leading-none tnum">
                {PRODUCTS.length}
              </span>
              <span className="block text-[0.58rem] font-bold uppercase tracking-[0.14em] leading-tight mt-1">
                {t('hero.productsInCatalogue')}
              </span>
            </div>

            <div className="min-w-0 flex-1 px-4 py-3 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.slug}
                  className="min-w-0"
                  initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: reduced ? 0 : -8,
                    transition: { duration: reduced ? 0 : 0.15, ease: EASE },
                  }}
                  transition={{ duration: reduced ? 0 : 0.35, ease: EASE }}
                >
                  <p className="index-num !text-[var(--teal-on-dark)]">
                    {product.code || 'FEATURED'}
                  </p>
                  <p className="font-bold text-sm text-white truncate">{product.category}</p>
                </motion.div>
              </AnimatePresence>

              <Link
                href={`/products/${product.slug}`}
                className="link-sweep text-[var(--teal-on-dark)] text-xs font-bold uppercase tracking-widest mt-2 self-start"
              >
                {t('cta.view')} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
