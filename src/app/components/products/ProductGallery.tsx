"use client";

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

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
      <div className="relative aspect-square w-full bg-white border border-[var(--line)] overflow-hidden ticks">
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
      </div>

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
    </div>
  );
}
