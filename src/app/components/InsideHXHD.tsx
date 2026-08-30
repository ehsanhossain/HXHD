"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play, X } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { HOME_VIDEOS, type HomeVideo } from '@/data/homeVideos';
import { useT } from '@/i18n/LanguageProvider';

/**
 * Plant footage on the homepage.
 *
 * Nothing but the poster loads until a card is clicked — three clips is more
 * than 6 MB, and most visitors will never play one. The <video> is only
 * mounted inside the open player, so the bytes follow the intent.
 *
 * The footage is portrait, so the cards are taller than the usual landscape
 * tile -- but 3:4 rather than the full 9:16, which at three across made the
 * section taller than the viewport twice over. The player shows the whole
 * frame; the card is only a way in.
 */
export function InsideHXHD() {
  const t = useT();
  const [open, setOpen] = useState<HomeVideo | null>(null);

  return (
    <section className="bg-[var(--ink)] text-white py-20 lg:py-24">
      <div className="shell">
        <Reveal className="max-w-2xl mb-12">
          <p className="eyebrow eyebrow-on-dark mb-6">{t('sec.videos')}</p>
          <h2 className="text-step-3 mb-6">{t('sec.videosTitle')}</h2>
          <p className="text-step-0 text-white/70 leading-relaxed">{t('sec.videosLead')}</p>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" delay={0.1}>
          {HOME_VIDEOS.map((v) => (
            <StaggerItem key={v.id}>
              <button
                type="button"
                onClick={() => setOpen(v)}
                className="group relative block w-full aspect-[3/4] overflow-hidden border border-white/15 bg-black/40 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-teal)]"
              >
                <Image
                  src={v.poster}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/90 via-[var(--ink)]/20 to-transparent"
                  aria-hidden
                />
                <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
                  <span className="grid place-items-center w-16 h-16 bg-[var(--brand-red)] text-white transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 translate-x-[2px]" fill="currentColor" />
                  </span>
                </span>
                <span className="absolute left-5 right-5 bottom-5 text-step-0 font-bold leading-snug">
                  {t(v.titleKey)}
                </span>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <VideoPlayer video={open} onClose={() => setOpen(null)} label={t('sec.closeVideo')} />
    </section>
  );
}

/**
 * Full-screen player. Mirrors the image Lightbox's rules so the two feel like
 * one thing: Escape closes, the backdrop closes, the page behind is locked.
 */
function VideoPlayer({
  video,
  onClose,
  label,
}: {
  video: HomeVideo | null;
  onClose: () => void;
  label: string;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!video) return;
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [video, onKey]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.description}
      className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={label}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 grid place-items-center w-11 h-11 bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-teal)]"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Stop the click on the video itself from closing the dialog. */}
      <video
        key={video.src}
        src={video.src}
        poster={video.poster}
        controls
        autoPlay
        playsInline
        onClick={(e) => e.stopPropagation()}
        className="max-h-full max-w-full w-auto h-auto"
      />
    </div>
  );
}
