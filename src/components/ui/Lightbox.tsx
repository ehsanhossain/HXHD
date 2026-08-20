"use client";

import { useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxItem {
  src: string;
  alt: string;
  /** Optional line under the image, e.g. a name and role. */
  caption?: string;
}

/**
 * Full-size image overlay.
 *
 * Shared by the certificates grid and the leadership cards: both show images
 * that are unreadable at the size they sit on the page — a certificate seal,
 * a portrait — so both need the same way out of the thumbnail.
 *
 * Escape closes, arrow keys step, the backdrop closes, and the page behind is
 * locked while it is open. Arrows and the counter only appear when there is
 * more than one image to move between.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  /** Null when closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [index, onClose, step]);

  if (index === null) return null;
  const current = items[index];
  const many = items.length > 1;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[var(--ink)]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 grid place-items-center w-11 h-11 border border-white/25 text-white hover:bg-white hover:text-[var(--ink)] transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      {many && (
        <>
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
        </>
      )}

      <figure
        className="relative w-full max-w-2xl h-[78vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-1">
          <Image src={current.src} alt={current.alt} fill sizes="90vw" className="object-contain" priority />
        </div>
        {current.caption && (
          <figcaption className="mt-4 text-center text-sm font-bold text-white/80">
            {current.caption}
          </figcaption>
        )}
      </figure>

      {many && (
        <p className="absolute bottom-5 left-0 right-0 text-center text-xs font-bold tracking-[0.14em] text-white/60 tnum">
          {index + 1} / {items.length}
        </p>
      )}
    </div>
  );
}
