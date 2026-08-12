import { mailtoHref } from '@/data/company';

export type SubmitOutcome =
  /** Delivered by the server to every address in FORM_RECIPIENTS. */
  | { status: 'sent' }
  /**
   * The server could not send (no SMTP credentials, or it was unreachable), so
   * we opened a pre-addressed mail draft instead. The enquiry is not lost, but
   * the visitor still has to press Send in their own mail client.
   */
  | { status: 'mailto' }
  /** The server refused the submission and retrying may work — show the error. */
  | { status: 'error'; message: string };

interface SubmitArgs {
  /** Short label identifying which form this came from, e.g. "Enquiry". */
  formType: string;
  subject: string;
  /** Ordered field label → value. Empty values are dropped server-side. */
  fields: Record<string, string>;
  /** Honeypot value; non-empty means a bot filled the hidden input. */
  website?: string;
}

function plainBody(fields: Record<string, string>): string {
  return Object.entries(fields)
    .map(([k, v]) => `${k}: ${v || '—'}`)
    .join('\n');
}

/**
 * Submits a form to /api/contact, falling back to a `mailto:` draft when the
 * server cannot send. Never throws — callers switch on `status`.
 */
export async function submitForm({
  formType,
  subject,
  fields,
  website = '',
}: SubmitArgs): Promise<SubmitOutcome> {
  const fallback = () => {
    window.location.href = mailtoHref(subject, plainBody(fields));
    return { status: 'mailto' as const };
  };

  let res: Response;
  try {
    res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formType, subject, fields, website }),
    });
  } catch {
    // Offline, blocked, or the route is missing — never drop the enquiry.
    return fallback();
  }

  if (res.ok) return { status: 'sent' };

  let code = '';
  let message = '';
  try {
    const data = await res.json();
    code = String(data.code ?? '');
    message = String(data.error ?? '');
  } catch {
    /* non-JSON error body — fall through to the generic handling below */
  }

  // Mailer not set up (or a server fault): degrade to the draft rather than
  // telling the visitor their enquiry failed.
  if (code === 'not_configured' || res.status >= 500) return fallback();

  return {
    status: 'error',
    message: message || 'Something went wrong. Please try again.',
  };
}
