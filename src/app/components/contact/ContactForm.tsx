"use client";

import { useState } from 'react';
import { Send, AlertCircle, CheckCircle2, Loader2, CalendarDays, Clock, Video } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { COMPANY } from '@/data/company';
import { submitForm } from '@/lib/submitForm';
import { useI18n } from '@/i18n/LanguageProvider';

/**
 * Shown in the page copy as the public enquiry address. The draft itself goes
 * to every address in FORM_RECIPIENTS — see mailtoHref.
 */
const CONTACT_EMAIL = COMPANY.email;

const FIELD =
  'w-full h-12 px-4 bg-white border border-[var(--line-strong)] focus:border-[var(--brand-red)] focus:outline-none text-[var(--ink)] placeholder:text-[var(--steel-2)] transition-colors';

const LABEL =
  'block text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink-3)] mb-2';

function Required() {
  return <span className="text-[var(--brand-red)]">*</span>;
}

export function ContactForm() {
  const { c, fill } = useI18n();
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'mailto'>('idle');

  /**
   * Posts to /api/contact, which mails every address in FORM_RECIPIENTS. If the
   * server has no SMTP credentials it answers `not_configured` and submitForm
   * falls back to opening a pre-addressed draft, so an enquiry is never lost.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setError(c.contact.errorRequired);
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? '').trim();

    setError(null);
    setState('sending');

    const outcome = await submitForm({
      formType: get('appointmentDate') ? 'Enquiry & Consultation Appointment' : 'Enquiry',
      subject: `Enquiry — ${get('help') || 'General'} — ${get('company') || get('firstName')}${
        get('appointmentDate') ? ` [Meeting: ${get('appointmentDate')}]` : ''
      }`,
      website: get('website'),
      fields: {
        Name: `${get('firstName')} ${get('lastName')}`,
        Company: get('company'),
        Role: get('role'),
        Email: get('email'),
        Phone: get('phone'),
        Country: get('country'),
        'Enquiry type': get('help'),
        'Has a project': get('project'),
        ...(get('appointmentDate')
          ? {
              'Scheduled Meeting Date': get('appointmentDate'),
              'Scheduled Time Slot': get('appointmentTime') || 'Any time during business hours',
              'Meeting Format': get('meetingMode') || 'Online / Direct',
            }
          : {}),
        'Marketing opt-in': get('marketing') ? 'Yes' : 'No',
        Message: get('message'),
      },
    });

    if (outcome.status === 'error') {
      setState('idle');
      setError(fill(c.contact.errorSend, { email: CONTACT_EMAIL }));
      return;
    }

    setState(outcome.status === 'sent' ? 'sent' : 'mailto');
    form.reset();
  };

  if (state === 'sent' || state === 'mailto') {
    return (
      <section id="enquiry" className="section bg-white scroll-mt-24">
        <div className="shell max-w-4xl">
          <Reveal>
            <div className="border-l-2 border-[var(--brand-teal)] bg-[var(--paper-2)] px-7 py-8">
              <p className="flex items-center gap-3 text-step-1 font-bold text-[var(--ink)] mb-3">
                <CheckCircle2 className="w-6 h-6 text-[var(--brand-teal)] shrink-0" />
                {c.contact.sentTitle}
              </p>
              <p className="text-[var(--ink-3)] leading-relaxed">
                {state === 'sent'
                  ? fill(c.contact.sentBody, { email: CONTACT_EMAIL })
                  : c.contact.mailtoNote}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="enquiry" className="section bg-white scroll-mt-24">
      <div className="shell max-w-4xl">
        <Reveal className="mb-10">
          <p className="eyebrow mb-5">{c.contact.formEyebrow}</p>
          <h2 className="text-step-2 mb-4">{c.contact.formTitle}</h2>
          <p className="text-[var(--ink-3)] leading-relaxed">
            {fill(c.contact.formLead, { email: '' }).split('{email}')[0]}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-bold text-[var(--brand-red)] hover:underline break-all"
            >
              {CONTACT_EMAIL}
            </a>
            {fill(c.contact.formLead, { email: '' }).split('{email}')[1] ?? ''}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={handleSubmit} noValidate={false} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className={LABEL}>{c.contact.firstName} <Required /></label>
                <input id="firstName" name="firstName" type="text" autoComplete="given-name" className={FIELD} required />
              </div>
              <div>
                <label htmlFor="lastName" className={LABEL}>{c.contact.lastName} <Required /></label>
                <input id="lastName" name="lastName" type="text" autoComplete="family-name" className={FIELD} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className={LABEL}>{c.contact.email} <Required /></label>
                <input id="email" name="email" type="email" autoComplete="email" inputMode="email" className={FIELD} required />
              </div>
              <div>
                <label htmlFor="phone" className={LABEL}>{c.contact.phone} <Required /></label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className={FIELD} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="country" className={LABEL}>{c.contact.country} <Required /></label>
                <select id="country" name="country" className={FIELD} defaultValue="" required>
                  <option value="" disabled>{c.contact.pleaseSelect}</option>
                  {c.contact.countries.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="company" className={LABEL}>{c.contact.company}</label>
                <input id="company" name="company" type="text" autoComplete="organization" className={FIELD} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="role" className={LABEL}>{c.contact.iAmA} <Required /></label>
                <select id="role" name="role" className={FIELD} defaultValue="" required>
                  <option value="" disabled>{c.contact.pleaseSelect}</option>
                  {c.contact.roles.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="help" className={LABEL}>{c.contact.howHelp}</label>
                <select id="help" name="help" className={FIELD} defaultValue="">
                  <option value="" disabled>{c.contact.pleaseSelect}</option>
                  {c.contact.helpOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="project" className={LABEL}>{c.contact.activeProject} <Required /></label>
              <select id="project" name="project" className={FIELD} defaultValue="" required>
                <option value="" disabled>{c.contact.pleaseSelect}</option>
                <option>{c.contact.yes}</option>
                <option>{c.contact.no}</option>
              </select>
            </div>

            {/* Appointment & Consultation Scheduling */}
            <div className="p-6 bg-[var(--paper-2)] border border-[var(--line)] space-y-4">
              <div className="flex items-start sm:items-center gap-3 text-[var(--ink)]">
                <span className="grid place-items-center w-9 h-9 bg-[var(--brand-red)]/10 text-[var(--brand-red)] shrink-0">
                  <CalendarDays className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--ink)]">
                    {c.contact.scheduleHeading}
                  </h3>
                  <p className="text-xs text-[var(--ink-3)] mt-0.5 leading-relaxed">
                    {c.contact.scheduleLead}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div>
                  <label htmlFor="appointmentDate" className={LABEL}>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-[var(--brand-teal)]" />
                      {c.contact.scheduleDate}
                    </span>
                  </label>
                  <input
                    id="appointmentDate"
                    name="appointmentDate"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className={FIELD}
                  />
                </div>

                <div>
                  <label htmlFor="appointmentTime" className={LABEL}>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--brand-teal)]" />
                      {c.contact.scheduleTime}
                    </span>
                  </label>
                  <select id="appointmentTime" name="appointmentTime" className={FIELD} defaultValue="">
                    <option value="">{c.contact.pleaseSelect}</option>
                    {c.contact.timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="meetingMode" className={LABEL}>
                    <span className="inline-flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-[var(--brand-teal)]" />
                      {c.contact.scheduleMode}
                    </span>
                  </label>
                  <select id="meetingMode" name="meetingMode" className={FIELD} defaultValue="">
                    <option value="">{c.contact.pleaseSelect}</option>
                    {c.contact.meetingModes.map((mode) => (
                      <option key={mode} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className={LABEL}>
                {c.contact.comments}
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
                {c.contact.privacyNote}
              </p>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="marketing" className="mt-1 w-4 h-4 accent-[var(--brand-red)]" />
                <span className="text-sm text-[var(--ink-3)]">
                  {c.contact.marketingOptIn}
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" name="terms" className="mt-1 w-4 h-4 accent-[var(--brand-red)]" required />
                <span className="text-sm text-[var(--ink-3)]">
                  {c.contact.termsAgree}
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

            {/* Honeypot: hidden from people and from screen readers, so only
                bots fill it. Any value makes the server discard the message. */}
            <div className="hidden" aria-hidden>
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button
              type="submit"
              disabled={state === 'sending'}
              className="btn btn-primary cut-br group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === 'sending' ? c.contact.sending : c.contact.submit}
              {state === 'sending' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
