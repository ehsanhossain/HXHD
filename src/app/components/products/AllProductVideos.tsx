"use client";

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { VideoLightbox, type VideoItem } from '@/components/ui/VideoLightbox';
import { PRODUCTS } from '@/data/products';
import { PRODUCT_VIDEOS, videoSrc, videoPoster } from '@/data/productVideos';
import { useT } from '@/i18n/LanguageProvider';

/**
 * Every product video in one place, at the foot of the catalogue.
 *
 * Each card does two jobs, so it is a card rather than a single control: the
 * poster plays the clip, and the title beneath it goes to the product. A
 * <button> wrapping a <link> would be invalid, and burying the product link
 * inside the player alone would hide it from anyone who only wants to browse.
 * The player carries the same link again, for whoever watches first.
 *
 * Posters only until something is pressed — the clips run to 111 MB in total
 * and this page is a listing, not a viewer.
 */
export function AllProductVideos() {
  const t = useT();
  const [open, setOpen] = useState<VideoItem | null>(null);

  const cards = useMemo(() => {
    const bySlug = new Map(PRODUCTS.map((p) => [p.slug, p]));
    return Object.entries(PRODUCT_VIDEOS).flatMap(([slug, videos]) => {
      const product = bySlug.get(slug);
      if (!product) return [];
      return videos.map((v, i) => ({
        key: v.id,
        href: `/products/${slug}`,
        name: product.name,
        // Only number them where a product has more than one.
        index: videos.length > 1 ? i + 1 : null,
        item: {
          src: videoSrc(v.id),
          poster: videoPoster(v.id),
          description: product.name,
          href: `/products/${slug}`,
          linkLabel: t('cta.viewProduct'),
        } satisfies VideoItem,
      }));
    });
  }, [t]);

  if (!cards.length) return null;

  return (
    <section className="section bg-[var(--ink)] text-white">
      <div className="shell">
        <Reveal className="max-w-2xl mb-12">
          <p className="eyebrow eyebrow-on-dark mb-5">{t('sec.allVideos')}</p>
          <h2 className="text-step-3 mb-5">{t('sec.allVideosTitle')}</h2>
          <p className="text-step-0 text-white/70 leading-relaxed">{t('sec.allVideosLead')}</p>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" delay={0.08}>
          {cards.map((card) => (
            <StaggerItem key={card.key}>
              <div className="group">
                <button
                  type="button"
                  onClick={() => setOpen(card.item)}
                  aria-label={`${card.name}${card.index ? ' ' + card.index : ''}`}
                  className="relative block w-full aspect-video overflow-hidden border border-white/15 bg-black/40 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-teal)]"
                >
                  <Image
                    src={card.item.poster}
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

                <Link
                  href={card.href}
                  className="mt-4 flex items-start justify-between gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <span className="text-step-0 font-bold leading-snug">
                    {card.name}
                    {card.index ? <span className="text-white/50"> · {card.index}</span> : null}
                  </span>
                  <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-[var(--brand-red)]" aria-hidden />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <VideoLightbox item={open} onClose={() => setOpen(null)} closeLabel={t('sec.closeVideo')} />
    </section>
  );
}
