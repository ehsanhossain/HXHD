"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { VideoLightbox, type VideoItem } from '@/components/ui/VideoLightbox';
import { videosFor, videoSrc, videoPoster } from '@/data/productVideos';
import { useT } from '@/i18n/LanguageProvider';

/**
 * Demonstration footage for a single product.
 *
 * Renders nothing at all for the products with no matching video, which is
 * most of them — the heading should not appear over an empty grid.
 *
 * Posters only until a card is pressed; the clips run to several megabytes
 * each and a product page should not spend that on a visitor reading specs.
 */
export function ProductVideos({ slug, productName }: { slug: string; productName: string }) {
  const t = useT();
  const videos = videosFor(slug);
  const [open, setOpen] = useState<VideoItem | null>(null);

  if (!videos.length) return null;

  return (
    <section className="mt-20">
      <Reveal>
        <h2 className="text-step-2 mb-2">{t('detail.videos')}</h2>
        <div className="w-16 h-[5px] bg-[var(--brand-red)] mb-8" />
      </Reveal>

      {/* Pick a column count the films actually fill: a fixed three strands the
          fourth beside two empty slots, and leaves a gap next to a pair. Four
          go two-by-two, and fewer than three take a column each. */}
      <Stagger
        className={`grid grid-cols-1 sm:grid-cols-2 gap-5 ${
          { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 4: 'lg:grid-cols-2' }[videos.length] ??
          'lg:grid-cols-3'
        }`}
      >
        {videos.map((v, i) => {
          const item: VideoItem = {
            src: videoSrc(v.id),
            poster: videoPoster(v.id),
            description: `${productName} — ${t('detail.videos')} ${i + 1}`,
          };
          return (
            <StaggerItem key={v.id}>
              <button
                type="button"
                onClick={() => setOpen(item)}
                aria-label={item.description}
                className="group relative block w-full aspect-video overflow-hidden border border-[var(--line)] bg-[var(--ink)] cursor-pointer hover:border-[var(--brand-red)] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-teal)]"
              >
                <Image
                  src={item.poster}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-[var(--ink)]/25" aria-hidden />
                <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
                  <span className="grid place-items-center w-14 h-14 bg-[var(--brand-red)] text-white transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-5 h-5 translate-x-[2px]" fill="currentColor" />
                  </span>
                </span>
              </button>
            </StaggerItem>
          );
        })}
      </Stagger>

      <VideoLightbox item={open} onClose={() => setOpen(null)} closeLabel={t('sec.closeVideo')} />
    </section>
  );
}
