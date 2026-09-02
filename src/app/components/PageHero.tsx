"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
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
  /**
   * Cover photograph under the banner, e.g. "/images/page/services.webp".
   * Pass several and the hero cross-fades between them every five seconds.
   */
  image?: string | string[];
  /**
   * Required whenever `image` is set — it carries meaning, not decoration.
   * Give an array matching `image` when several are passed.
   */
  imageAlt?: string | string[];
  /**
   * Tailwind object-position classes for the cover. Defaults to a 70% crop on
   * phones, which suits a subject right of centre; pass `object-center` for a
   * picture whose subject sits in the middle.
   */
  imagePosition?: string;
  /**
   * How hard the cover is veiled.
   *
   * `balanced` suits a photograph with a clear subject. `quiet` is for a busy
   * or typographic picture that would otherwise compete with the heading - it
   * veils the whole frame evenly so the picture reads as texture rather than
   * as a second thing to read.
   */
  imageTone?: 'balanced' | 'quiet';
  /**
   * Aspect class for the banner itself, e.g. "lg:aspect-video".
   *
   * `cover` only crops when the box and the picture disagree about shape, so
   * matching the box to a 16:9 cover shows the whole photograph. Left off, the
   * banner is as tall as its copy and the picture is cropped to fit -- which
   * is what a banner normally wants.
   *
   * Pair the aspect with a cap -- "lg:aspect-video lg:max-h-[30rem]" -- on a
   * full-bleed banner. Unclamped, 16:9 makes the band as tall as the viewport
   * is wide (810px at 1440, 1080px at 1920), which pushes the heading far down
   * the page and leaves a dead field of scrim above it. A photograph that has
   * to be seen whole belongs in a section that can hold it, not behind copy.
   *
   * Applied from `lg` upward by the caller: on a phone the copy needs more
   * height than a wide picture would give it.
   */
  imageAspect?: string;
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
  image,
  imageAlt,
  imagePosition = 'object-[70%_center] sm:object-center',
  imageTone = 'balanced',
  imageAspect,
}: PageHeroProps) {
  const quiet = imageTone === 'quiet';

  const reduced = useReducedMotion();
  const t = useT();

  const covers = image ? (Array.isArray(image) ? image : [image]) : [];
  const alts = imageAlt ? (Array.isArray(imageAlt) ? imageAlt : [imageAlt]) : [];

  /**
   * Which cover is showing. Only ever advances when there is more than one
   * and the visitor has not asked for less motion; a five-second hold is long
   * enough to take a picture in without it becoming a distraction behind the
   * heading.
   */
  const [cover, setCover] = useState(0);
  useEffect(() => {
    if (covers.length < 2 || reduced) return;
    const id = setInterval(() => setCover((c) => (c + 1) % covers.length), 5000);
    return () => clearInterval(id);
  }, [covers.length, reduced]);

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

      <div
        className={`relative bg-[var(--ink)] text-white overflow-hidden ${imageAspect ?? ''}`}
      >
        {covers.length ? (
          <>
            <AnimatePresence initial={false}>
              <motion.div
                key={covers[cover]}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={covers[cover]}
                  alt={alts[cover] ?? alts[0] ?? ''}
                  fill
                  priority={cover === 0}
                  sizes="100vw"
                  className={`object-cover ${imagePosition}`}
                />
              </motion.div>
            </AnimatePresence>
            {/* Two scrims rather than one flat tint: a horizontal ramp keeps
                the left side dark enough for the heading while the right of
                the picture stays legible, and a light vertical wash stops the
                bottom edge from glowing against the section below. */}
            {/* The ramp is weighted to the copy rather than spread evenly: it
                holds its darkness across the column the heading occupies, then
                falls away quickly so the right of the photograph is close to
                unveiled. Spread evenly it was still at 45% out at the edge,
                which greyed the whole picture to protect text that had already
                ended. */}
            <div
              className={
                quiet
                  ? 'absolute inset-0 bg-gradient-to-r from-[var(--ink)]/95 from-0% via-[var(--ink)]/78 via-55% to-[var(--ink)]/35'
                  : 'absolute inset-0 bg-gradient-to-r from-[var(--ink)]/92 from-0% via-[var(--ink)]/58 via-62% to-[var(--ink)]/8'
              }
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/45 via-transparent to-transparent"
              aria-hidden
            />
            {/* On a phone the copy spans the full width, so the horizontal ramp
                no longer protects it — a flat tint does. */}
            <div
              className={`absolute inset-0 ${quiet ? 'bg-[var(--ink)]/25' : 'bg-[var(--ink)]/40 sm:hidden'}`}
              aria-hidden
            />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-grid-dark opacity-70" aria-hidden />
            <div
              className="absolute top-0 right-0 h-full w-1/3 bg-[var(--brand-teal)]/12 hidden md:block"
              style={{ clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0 100%)' }}
              aria-hidden
            />
          </>
        )}
        <div className="absolute left-0 top-0 h-full w-[3px] bg-[var(--brand-red)] z-10" aria-hidden />

        <div className="shell relative z-10 h-full py-16 lg:py-20 min-h-[19rem] flex flex-col justify-center">
          <motion.p className="eyebrow eyebrow-on-dark mb-5" {...rise(0)}>
            {eyebrowText}
          </motion.p>
          <motion.h1 className="text-step-4 max-w-4xl" {...rise(0.06)}>
            {titleText}
          </motion.h1>
          {intro && (
            <motion.p className="mt-6 text-white/75 max-w-3xl text-step-0 leading-relaxed" {...rise(0.12)}>
              {intro}
            </motion.p>
          )}
        </div>
      </div>
    </>
  );
}
