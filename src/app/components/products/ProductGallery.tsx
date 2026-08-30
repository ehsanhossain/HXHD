"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Lightbox } from '@/components/ui/Lightbox';
import { useT } from '@/i18n/LanguageProvider';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  /** Index being shown full size, or null when the overlay is closed. */
  const [zoomed, setZoomed] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const t = useT();

  if (!images.length) {
    return (
      <div className="aspect-square w-full bg-[var(--paper-2)] border border-[var(--line)] grid place-items-center text-[var(--steel)] text-sm">
        No image available
      </div>
    );
  }

  // Guard against an out-of-range index if the image list ever changes
  const index = Math.min(active, images.length - 1);
  const current = images[index];

  return (
    <div>
      <button
        type="button"
        onClick={() => setZoomed(index)}
        aria-label={t('detail.viewFullSize')}
        className="group relative aspect-square w-full bg-white border border-[var(--line)] overflow-hidden ticks cursor-zoom-in block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-teal)]"
      >
        <div className="absolute inset-0 bg-hatch opacity-35" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: reduced ? 1 : 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={current}
              alt={name}
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-contain p-10"
            />
          </motion.div>
        </AnimatePresence>

        {/* Only a hint that the picture opens — the whole stage is the target. */}
        <span
          className="absolute bottom-4 right-4 grid place-items-center w-10 h-10 bg-[var(--ink)]/80 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300"
          aria-hidden
        >
          <Maximize2 className="w-4 h-4" />
        </span>
      </button>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === index}
              className={`relative aspect-square bg-white overflow-hidden border transition-colors ${
                i === index
                  ? 'border-[var(--brand-red)] border-2'
                  : 'border-[var(--line)] hover:border-[var(--steel-2)]'
              }`}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="120px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        items={images.map((img) => ({ src: img, alt: name }))}
        index={zoomed}
        onClose={() => setZoomed(null)}
        onIndexChange={(next) => {
          setZoomed(next);
          // Keep the stage in step, so closing leaves the picture just viewed.
          setActive(next);
        }}
      />
    </div>
  );
}
