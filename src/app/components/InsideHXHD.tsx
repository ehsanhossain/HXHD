"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { VideoLightbox } from '@/components/ui/VideoLightbox';
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

      <VideoLightbox
        item={open ? { src: open.src, poster: open.poster, description: open.description } : null}
        onClose={() => setOpen(null)}
        closeLabel={t('sec.closeVideo')}
      />
    </section>
  );
}
