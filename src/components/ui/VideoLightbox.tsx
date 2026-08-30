"use client";

import { useCallback, useEffect, useRef } from 'react';

export interface VideoItem {
  src: string;
  poster: string;
  /** Spoken description of the footage, used as the dialog's accessible name. */
  description: string;
}

/**
 * Full-screen video player.
 *
 * The moving-image counterpart to `Lightbox`, and deliberately the same shape:
 * Escape closes, the backdrop closes, the page behind is locked, focus lands
 * on the close button. Shared by the homepage plant footage and the product
 * demonstrations so the two behave identically.
 *
 * The <video> is mounted only while open, which is what keeps a page carrying
 * three clips from fetching any of them until someone asks.
 */
export function VideoLightbox({
  item,
  onClose,
  closeLabel,
}: {
  /** Null when closed. */
  item: VideoItem | null;
  onClose: () => void;
  closeLabel: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!item) return;
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [item, onKey]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.description}
      className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 grid place-items-center w-11 h-11 bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-teal)]"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Clicking the video itself must not close the dialog. */}
      <video
        key={item.src}
        src={item.src}
        poster={item.poster}
        controls
        autoPlay
        playsInline
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full w-auto h-auto"
      />
    </div>
  );
}
