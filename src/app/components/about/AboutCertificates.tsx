"use client";

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { CERTIFICATES } from '@/data/certificates';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useI18n } from '@/i18n/LanguageProvider';

/**
 * The group's certificates and patents.
 *
 * Each tile opens a lightbox, because a certificate is unreadable at thumbnail
 * size — the whole point of showing them is that a buyer can read the seal and
 * the issuing body.
 */
export function AboutCertificates() {
  const { c } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? i : (i + delta + CERTIFICATES.length) % CERTIFICATES.length)),
    [],
  );

  // Keyboard control, and don't let the page scroll behind the lightbox.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  return (
    <section className="section bg-white border-t border-[var(--line)]">
      <div className="shell">
        <Reveal className="max-w-2xl mb-12">
          <p className="eyebrow mb-5">{c.about.certsEyebrow}</p>
          <h2 className="text-step-3 mb-5">{c.about.certsTitle}</h2>
          <p className="text-sm text-[var(--steel)] leading-relaxed">{c.about.certsLead}</p>
        </Reveal>

        <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {CERTIFICATES.map((cert, i) => (
            <StaggerItem key={cert.src}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`${c.about.certsTitle} ${cert.index}`}
                className="group relative block w-full aspect-[3/4] bg-[var(--paper-2)] border border-[var(--line)] overflow-hidden hover:border-[var(--brand-red)] transition-colors duration-300 cursor-pointer"
              >
                <Image
                  src={cert.src}
                  alt={`${c.about.certsTitle} ${cert.index}`}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-[var(--ink)]/0 group-hover:bg-[var(--ink)]/5 transition-colors" />
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[100] bg-[var(--ink)]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${c.about.certsTitle} ${CERTIFICATES[open].index}`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 grid place-items-center w-11 h-11 border border-white/25 text-white hover:bg-white hover:text-[var(--ink)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous"
            className="absolute left-2 sm:left-6 grid place-items-center w-11 h-11 border border-white/25 text-white hover:bg-white hover:text-[var(--ink)] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next"
            className="absolute right-2 sm:right-6 grid place-items-center w-11 h-11 border border-white/25 text-white hover:bg-white hover:text-[var(--ink)] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <figure
            className="relative w-full max-w-2xl h-[78vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={CERTIFICATES[open].src}
              alt={`${c.about.certsTitle} ${CERTIFICATES[open].index}`}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </figure>

          <p className="absolute bottom-5 left-0 right-0 text-center text-xs font-bold tracking-[0.14em] text-white/60 tnum">
            {CERTIFICATES[open].index} / {CERTIFICATES.length}
          </p>
        </div>
      )}
    </section>
  );
}
