"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronDown,
  Mail,
  CheckCircle2,
  Building,
  GraduationCap,
  Award,
  Globe,
  Sparkles,
  ArrowRight,
  Send,
  Search,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { NewsletterStrip } from '../components/contact/NewsletterStrip';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { useI18n } from '@/i18n/LanguageProvider';
import { COMPANY } from '@/data/company';

const PERK_ICONS = [Building, Globe, GraduationCap, Award];

export function CareerContent() {
  const { t, c } = useI18n();
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('chemist');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const positions = c.career.positions;

  // Extract unique departments and locations
  const departments = ['all', ...Array.from(new Set(positions.map((p) => p.dept)))];
  const locations = ['all', ...Array.from(new Set(positions.map((p) => p.location)))];

  const filteredPositions = positions.filter((p) => {
    const matchesDept = selectedDept === 'all' || p.dept === selectedDept;
    const matchesLoc = selectedLocation === 'all' || p.location === selectedLocation;
    const matchesSearch =
      !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.dept.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesLoc && matchesSearch;
  });

  const handleApply = (positionTitle: string) => {
    const subject = encodeURIComponent(`Application for ${positionTitle} — [Candidate Name]`);
    const body = encodeURIComponent(
      `Dear HXHD Recruitment Team,\n\nI am writing to express my interest in the ${positionTitle} role.\n\n[Please describe your relevant experience and background here]\n\nPlease find attached my CV/Resume.\n\nBest regards,\n[Your Name]\n[Your Phone Number]\n[Your Location]`
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white">
      <PageHero
        eyebrowKey="page.career.eyebrow"
        titleKey="page.career.title"
        intro={c.career.intro}
        crumbs={[{ labelKey: 'nav.career' }]}
      />

      {/* ── Section 1: Why HXHD Perks ──────────────────────────── */}
      <section className="section bg-white">
        <div className="shell">
          <Reveal className="max-w-3xl mb-14">
            <p className="eyebrow mb-4">{c.career.whyTitle}</p>
            <h2 className="text-step-3 mb-4 leading-tight">
              Where Chemical Engineering Meets Real-World Impact
            </h2>
            <p className="text-[var(--ink-3)] text-step-0 leading-relaxed">
              {c.career.whyLead}
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.career.perks.map((perk, i) => {
              const Icon = PERK_ICONS[i] || Sparkles;
              return (
                <StaggerItem key={perk.title}>
                  <div className="group relative flex flex-col h-full bg-[var(--paper-2)] p-7 border border-[var(--line)] hover:border-[var(--brand-teal)] hover:bg-white hover:shadow-md transition-all duration-300">
                    <span className="index-num absolute top-6 right-6">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <span className="grid place-items-center w-12 h-12 bg-white border border-[var(--line)] text-[var(--brand-teal)] mb-6 transition-colors group-hover:bg-[var(--brand-teal)] group-hover:text-white">
                      <Icon className="w-5 h-5" />
                    </span>

                    <h3 className="text-step-1 font-bold mb-3 leading-snug text-[var(--ink)]">
                      {perk.title}
                    </h3>
                    <p className="text-sm text-[var(--steel)] leading-relaxed mt-auto">
                      {perk.desc}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ── Section 2: Open Positions ──────────────────────────── */}
      <section id="openings" className="section bg-[var(--paper-2)] border-t border-[var(--line)] scroll-mt-20">
        <div className="shell">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <Reveal className="max-w-2xl">
              <p className="eyebrow mb-4">{c.career.openingsTitle}</p>
              <h2 className="text-step-3 leading-tight">{c.career.openingsLead}</h2>
            </Reveal>

            {/* Filters */}
            <Reveal delay={0.08} className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="h-11 px-4 pr-9 bg-white border border-[var(--line-strong)] text-xs font-bold uppercase tracking-wider text-[var(--ink)] focus:outline-none focus:border-[var(--brand-red)]"
                >
                  <option value="all">{c.career.allDepartments}</option>
                  {departments
                    .filter((d) => d !== 'all')
                    .map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>
              </div>

              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="h-11 px-4 pr-9 bg-white border border-[var(--line-strong)] text-xs font-bold uppercase tracking-wider text-[var(--ink)] focus:outline-none focus:border-[var(--brand-red)]"
                >
                  <option value="all">{c.career.allLocations}</option>
                  {locations
                    .filter((l) => l !== 'all')
                    .map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                </select>
              </div>
            </Reveal>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {filteredPositions.length === 0 ? (
              <div className="bg-white p-12 text-center border border-[var(--line)]">
                <p className="text-[var(--ink-3)] text-sm">
                  No positions match your active filters. Try resetting the filters or send a general application.
                </p>
                <button
                  onClick={() => {
                    setSelectedDept('all');
                    setSelectedLocation('all');
                    setSearchTerm('');
                  }}
                  className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--brand-red)] hover:underline"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredPositions.map((pos) => {
                const isExpanded = expandedId === pos.id;
                return (
                  <Reveal key={pos.id}>
                    <div
                      className={`bg-white border transition-all duration-200 ${
                        isExpanded
                          ? 'border-[var(--brand-teal)] shadow-md'
                          : 'border-[var(--line)] hover:border-[var(--line-strong)]'
                      }`}
                    >
                      {/* Header Row */}
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : pos.id)}
                        className="w-full text-left p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        aria-expanded={isExpanded}
                      >
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="px-2.5 py-0.5 bg-[var(--brand-teal)]/10 text-[var(--brand-teal)] text-[0.7rem] font-bold uppercase tracking-wider">
                              {pos.dept}
                            </span>
                            <span className="px-2.5 py-0.5 bg-[var(--paper-2)] text-[var(--ink-3)] text-[0.7rem] font-bold uppercase tracking-wider border border-[var(--line)]">
                              {pos.type}
                            </span>
                            <span className="px-2.5 py-0.5 bg-[var(--paper-2)] text-[var(--ink-3)] text-[0.7rem] font-bold uppercase tracking-wider border border-[var(--line)]">
                              Exp: {pos.exp}
                            </span>
                          </div>

                          <h3 className="text-step-1 font-bold text-[var(--ink)] leading-snug">
                            {pos.title}
                          </h3>

                          <div className="flex items-center gap-2 text-xs text-[var(--steel)]">
                            <MapPin className="w-3.5 h-3.5 text-[var(--brand-red)]" />
                            <span>{pos.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 self-end md:self-center shrink-0">
                          <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand-teal)] hidden sm:inline">
                            {isExpanded ? 'Hide Details' : c.career.viewDetails}
                          </span>
                          <span
                            className={`grid place-items-center w-8 h-8 rounded-full border border-[var(--line-strong)] text-[var(--ink)] transition-transform duration-300 ${
                              isExpanded ? 'rotate-180 bg-[var(--paper-2)]' : ''
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </span>
                        </div>
                      </button>

                      {/* Expandable Details */}
                      {isExpanded && (
                        <div className="px-6 md:px-8 pb-8 pt-2 border-t border-[var(--line)] space-y-6">
                          <p className="text-sm text-[var(--ink-3)] leading-relaxed">
                            {pos.desc}
                          </p>

                          <div className="grid md:grid-cols-2 gap-8">
                            {/* Responsibilities */}
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink)] mb-3 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-[var(--brand-teal)]" />
                                {c.career.responsibilitiesLabel}
                              </h4>
                              <ul className="space-y-2">
                                {pos.responsibilities.map((r) => (
                                  <li
                                    key={r}
                                    className="text-xs text-[var(--steel)] leading-relaxed flex items-start gap-2.5"
                                  >
                                    <span className="w-1.5 h-1.5 bg-[var(--brand-teal)] rounded-full shrink-0 mt-1.5" />
                                    <span>{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Requirements */}
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink)] mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[var(--brand-red)]" />
                                {c.career.requirementsLabel}
                              </h4>
                              <ul className="space-y-2">
                                {pos.requirements.map((req) => (
                                  <li
                                    key={req}
                                    className="text-xs text-[var(--steel)] leading-relaxed flex items-start gap-2.5"
                                  >
                                    <span className="w-1.5 h-1.5 bg-[var(--brand-red)] rounded-full shrink-0 mt-1.5" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)]">
                            <button
                              onClick={() => handleApply(pos.title)}
                              className="btn btn-primary cut-br group text-xs !py-2.5 !px-6"
                            >
                              {c.career.applyNow}
                              <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                            <span className="text-xs text-[var(--steel)]">
                              Send your CV directly to{' '}
                              <a
                                href={`mailto:${COMPANY.email}`}
                                className="font-bold text-[var(--brand-red)] hover:underline"
                              >
                                {COMPANY.email}
                              </a>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ── Section 3: General Application Banner ─────────────── */}
      <section className="section bg-[var(--ink)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-60" aria-hidden />
        <div className="shell relative">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <p className="eyebrow mb-4">{c.career.applyTitle}</p>
              <h2 className="text-step-3 mb-4 leading-tight">
                Don’t see your exact role listed?
              </h2>
              <div className="w-16 h-1 bg-[var(--brand-teal)] mx-auto mb-6" />
              <p className="text-step-0 text-white/70 leading-relaxed mb-8">
                {c.career.applyLead} We are continually expanding our R&D, chemical engineering, quality control, and regional technical sales teams in Bangladesh and China.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(
                    'General Application — [Your Name]'
                  )}&body=${encodeURIComponent(
                    'Dear Recruitment Team,\n\nPlease find attached my CV for consideration in future openings at HXHD.\n\nBest regards,\n[Your Name]\n[Phone]\n[Current Role]'
                  )}`}
                  className="btn btn-primary cut-br group"
                >
                  <Mail className="w-4 h-4" />
                  {c.career.applyBtn}
                </a>
                <Link href="/contact" className="btn btn-on-dark">
                  Contact HR Department
                </Link>
              </div>
              <p className="text-xs text-white/40 mt-6">{c.career.applyNote}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <NewsletterStrip />
    </div>
  );
}
