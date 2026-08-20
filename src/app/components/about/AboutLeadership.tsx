"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { LEADERSHIP, type Leader } from '@/data/company';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useI18n } from '@/i18n/LanguageProvider';

/** Initials, used when a portrait is missing or fails to load. */
function monogram(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase();
}

function LeaderCard({ leader, role }: { leader: Leader; role: string }) {
  // A missing portrait must not leave a broken frame on a live page, so the
  // card falls back to a monogram both when no path is set and when the file
  // is not there yet.
  const [failed, setFailed] = useState(false);
  const showPhoto = !!leader.photo && !failed;

  return (
    <div className="group bg-white border border-[var(--line)] overflow-hidden hover:border-[var(--brand-teal)] transition-colors duration-300">
      <div className="relative aspect-[3/4] bg-[var(--paper-2)] overflow-hidden">
        {showPhoto ? (
          <Image
            src={leader.photo!}
            alt={`${leader.name} — ${role}`}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-hatch">
            <span
              className="text-[3.5rem] font-bold text-[var(--steel)]/45 select-none"
              aria-hidden
            >
              {monogram(leader.name)}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 text-center border-t border-[var(--line)]">
        <p className="font-bold text-[var(--ink)] leading-snug">{leader.name}</p>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--teal-on-light)] mt-1.5">
          {role}
        </p>
      </div>
    </div>
  );
}

export function AboutLeadership() {
  const { c } = useI18n();

  const roleFor = (key: Leader['roleKey']) =>
    key === 'chairman' ? c.about.roleChairman : c.about.roleGeneralManager;

  return (
    <section className="section bg-[var(--paper-2)] border-y border-[var(--line)]">
      <div className="shell">
        <Reveal className="max-w-2xl mb-12">
          <p className="eyebrow mb-5">{c.about.leadershipEyebrow}</p>
          <h2 className="text-step-3">{c.about.leadershipTitle}</h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Portraits */}
          <Stagger className="lg:col-span-6 grid grid-cols-2 gap-5 sm:gap-6">
            {LEADERSHIP.map((l) => (
              <StaggerItem key={l.name}>
                <LeaderCard leader={l} role={roleFor(l.roleKey)} />
              </StaggerItem>
            ))}
          </Stagger>

          {/* Chairman's message */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-6">
            <div className="relative bg-white border border-[var(--line)] p-7 sm:p-9 cut-br h-full">
              <Quote
                className="w-9 h-9 text-[var(--brand-red)]/20 absolute top-6 right-6"
                aria-hidden
              />
              <h3 className="text-step-2 mb-5 leading-tight">{c.about.chairmanMessageTitle}</h3>
              <div className="w-16 h-1 bg-[var(--brand-red)] mb-6" />
              <p className="text-[var(--steel)] leading-[1.85] text-sm sm:text-base">
                {c.about.chairmanMessage}
              </p>
              <p className="mt-7 pt-5 border-t border-[var(--line)] font-bold text-[var(--ink)]">
                {LEADERSHIP[0].name}
                <span className="block text-xs font-bold uppercase tracking-[0.12em] text-[var(--steel-2)] mt-1">
                  {c.about.roleChairman}
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
