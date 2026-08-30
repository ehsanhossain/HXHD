"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Lightbox } from '@/components/ui/Lightbox';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useI18n } from '@/i18n/LanguageProvider';

/**
 * The application photography that used to run behind the homepage headline.
 *
 * The homepage hero now carries plant video, so these four frames moved here,
 * where there is room to look at them properly rather than read a headline
 * over them. Each opens full size, the same as the certificates and portraits.
 */
const FRAMES = [
  {
    src: '/images/hero/lab-qc.webp',
    alt: 'HXHD chemist checking an emulsion batch against spec on the production floor',
  },
  {
    src: '/images/hero/roof-waterproofing.webp',
    alt: 'Applicator rolling waterproof emulsion across a rooftop deck above the Dhaka skyline',
  },
  {
    src: '/images/hero/window-sealant.webp',
    alt: 'Transparent waterproof coating being brushed along an exterior window reveal',
  },
  {
    src: '/images/hero/tile-adhesive.webp',
    alt: 'Tiler bedding a large-format tile with HXHD ceramic tile back adhesive',
  },
];

export function AboutGallery() {
  const { c } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section bg-[var(--paper-2)] border-t border-[var(--line)]">
      <div className="shell">
        <Reveal className="max-w-2xl mb-12">
          <p className="eyebrow mb-5">{c.about.galleryEyebrow}</p>
          <h2 className="text-step-3 mb-5">{c.about.galleryTitle}</h2>
          <p className="text-sm text-[var(--steel)] leading-relaxed">{c.about.galleryLead}</p>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {FRAMES.map((frame, i) => (
            <StaggerItem key={frame.src}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={frame.alt}
                className="group relative block w-full aspect-[16/10] bg-[var(--ink)] border border-[var(--line)] overflow-hidden hover:border-[var(--brand-red)] transition-colors duration-300 cursor-pointer"
              >
                <Image
                  src={frame.src}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Lightbox
        items={FRAMES.map((f) => ({ src: f.src, alt: f.alt }))}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </section>
  );
}
