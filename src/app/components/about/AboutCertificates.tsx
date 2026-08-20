"use client";

import { useState } from 'react';
import Image from 'next/image';
import { CERTIFICATES } from '@/data/certificates';
import { Lightbox } from '@/components/ui/Lightbox';
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

      <Lightbox
        items={CERTIFICATES.map((cert) => ({
          src: cert.src,
          alt: `${c.about.certsTitle} ${cert.index}`,
        }))}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />

    </section>
  );
}
