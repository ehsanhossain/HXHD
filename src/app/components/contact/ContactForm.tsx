"use client";

import { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { COMPANY } from '@/data/company';

const CONTACT_EMAIL = COMPANY.email;

const FIELD =
  'w-full h-12 px-4 bg-white border border-[var(--line-strong)] focus:border-[var(--brand-red)] focus:outline-none text-[var(--ink)] placeholder:text-[var(--steel-2)] transition-colors';

const LABEL =
  'block text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink-3)] mb-2';

function Required() {
  return <span className="text-[var(--brand-red)]">*</span>;
}

export function ContactForm() {
  const [error, setError] = useState<string | null>(null);

  /**
   * There is no backend on this site, so rather than faking a "submitted"
   * state the form composes the enquiry into a mail draft addressed to the
   * real sales inbox. The user stays in control of actually sending it.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setError('Please complete the required fields marked with an asterisk.');
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? '').trim();

    const subject = `Enquiry — ${get('help') || 'General'} — ${get('company') || get('firstName')}`;
    const body = [
      `Name: ${get('firstName')} ${get('lastName')}`,
      `Company: ${get('company') || '—'}`,
      `Role: ${get('role')}`,
      `Email: ${get('email')}`,
      `Phone: ${get('phone')}`,
      `Country: ${get('country')}`,
      `Enquiry type: ${get('help') || '—'}`,
      `Has a project: ${get('project')}`,
      '',
      'Message:',
      get('message') || '—',
    ].join('\n');

    setError(null);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="enquiry" className="section bg-white scroll-mt-24">
      <div className="shell max-w-4xl">
        <Reveal className="mb-10">
          <p className="eyebrow mb-5">Enquiry</p>
          <h2 className="text-step-2 mb-4">Submit an enquiry</h2>
          <p className="text-[var(--ink-3)] leading-relaxed">
            Complete the form and it will open a pre-filled message to{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-bold text-[var(--brand-red)] hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            . Fields marked <Required /> are required.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={handleSubmit} noValidate={false} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className={LABEL}>First name <Required /></label>
                <input id="firstName" name="firstName" type="text" autoComplete="given-name" className={FIELD} required />
              </div>
              <div>
                <label htmlFor="lastName" className={LABEL}>Last name <Required /></label>
                <input id="lastName" name="lastName" type="text" autoComplete="family-name" className={FIELD} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className={LABEL}>Email <Required /></label>
                <input id="email" name="email" type="email" autoComplete="email" inputMode="email" className={FIELD} required />
              </div>
              <div>
                <label htmlFor="phone" className={LABEL}>Phone <Required /></label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className={FIELD} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="country" className={LABEL}>Country <Required /></label>
                <select id="country" name="country" className={FIELD} defaultValue="" required>
                  <option value="" disabled>Please select</option>
                  <option>China</option>
                  <option>Bangladesh</option>
                  <option>India</option>
                  <option>Vietnam</option>
                  <option>Indonesia</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="company" className={LABEL}>Company</label>
                <input id="company" name="company" type="text" autoComplete="organization" className={FIELD} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="role" className={LABEL}>I am a <Required /></label>
                <select id="role" name="role" className={FIELD} defaultValue="" required>
                  <option value="" disabled>Please select</option>
                  <option>Manufacturer</option>
                  <option>Distributor</option>
                  <option>Contractor</option>
                  <option>Trader / Importer</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="help" className={LABEL}>How can we help?</label>
                <select id="help" name="help" className={FIELD} defaultValue="">
                  <option value="" disabled>Please select</option>
                  <option>Product enquiry</option>
                  <option>Technical support</option>
                  <option>Documentation (TDS / SDS)</option>
                  <option>Sample request</option>
                  <option>OEM / custom formulation</option>
                  <option>Distribution</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="project" className={LABEL}>Do you have an active project? <Required /></label>
              <select id="project" name="project" className={FIELD} defaultValue="" required>
                <option value="" disabled>Please select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className={LABEL}>
                Comments — substrate, performance targets, volumes
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={`${FIELD} !h-auto py-3 resize-y`}
              />
            </div>

            <div className="pt-4 space-y-4 border-t border-[var(--line)]">
              <p className="text-sm text-[var(--steel)] leading-relaxed">
                HXHD is committed to protecting and respecting your privacy. Your
                information is used only to administer your enquiry.
              </p>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="marketing" className="mt-1 w-4 h-4 accent-[var(--brand-red)]" />
                <span className="text-sm text-[var(--ink-3)]">
                  I would like to receive news about HXHD products and services.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="terms" className="mt-1 w-4 h-4 accent-[var(--brand-red)]" required />
                <span className="text-sm text-[var(--ink-3)]">
                  I have read and agree to the{' '}
                  <a href="#" className="text-[var(--brand-red)] hover:underline">Terms of Use</a> and{' '}
                  <a href="#" className="text-[var(--brand-red)] hover:underline">Privacy Policy</a>. <Required />
                </span>
              </label>
            </div>

            {error && (
              <p
                role="alert"
                className="flex items-center gap-2 text-sm font-bold text-[var(--brand-red)] bg-[var(--brand-red-soft)] border border-[var(--brand-red)]/25 px-4 py-3"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </p>
            )}

            <button type="submit" className="btn btn-primary cut-br group">
              Submit enquiry
              <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
