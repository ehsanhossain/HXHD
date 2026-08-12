import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { FORM_RECIPIENTS } from '@/data/company';

/** nodemailer needs Node APIs — this route can never run on the edge runtime. */
export const runtime = 'nodejs';
/** Every submission is unique; nothing here may be cached or statically rendered. */
export const dynamic = 'force-dynamic';

/**
 * Field caps. A legitimate enquiry never approaches these — they exist so a
 * bot cannot post a megabyte of text and turn our SMTP account into a relay.
 */
const MAX_FIELDS = 25;
const MAX_KEY = 64;
const MAX_VALUE = 5_000;
const MAX_TOTAL = 20_000;

/**
 * Crude per-IP throttle. Deliberately in-memory: it resets on redeploy and is
 * per-instance, so it is a speed bump against casual abuse rather than real
 * protection. If this endpoint ever gets seriously targeted, move the counter
 * to a shared store (Upstash/Redis) or put a CAPTCHA in front of the form.
 */
const RATE_LIMIT = { windowMs: 60_000, max: 5 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT.max;
}

/**
 * Strips CR/LF from anything destined for a mail header. Without this a
 * submitted value containing a newline could inject extra headers (Bcc, etc.)
 * and turn the form into an open relay.
 */
function headerSafe(value: string, limit = 200): string {
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, limit);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

interface Payload {
  formType?: unknown;
  subject?: unknown;
  fields?: unknown;
  /** Honeypot — hidden from real users, so any value means a bot filled it. */
  website?: unknown;
}

export async function POST(request: NextRequest) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Not configured yet: tell the client explicitly so it can fall back to
  // opening a mailto: draft rather than silently losing the enquiry.
  if (!user || !pass) {
    return NextResponse.json(
      { ok: false, code: 'not_configured', error: 'Mail transport is not configured.' },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, code: 'rate_limited', error: 'Too many submissions. Please try again shortly.' },
      { status: 429 }
    );
  }

  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: 'bad_json', error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot: succeed silently so the bot has no signal to adapt to.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const rawFields = payload.fields;
  if (!rawFields || typeof rawFields !== 'object' || Array.isArray(rawFields)) {
    return NextResponse.json({ ok: false, code: 'bad_fields', error: 'Missing form fields.' }, { status: 400 });
  }

  const entries = Object.entries(rawFields as Record<string, unknown>)
    .filter(([, v]) => typeof v === 'string' && v.trim() !== '')
    .slice(0, MAX_FIELDS)
    .map(([k, v]) => [k.slice(0, MAX_KEY), (v as string).slice(0, MAX_VALUE)] as const);

  if (entries.length === 0) {
    return NextResponse.json({ ok: false, code: 'empty', error: 'Nothing to send.' }, { status: 400 });
  }
  if (entries.reduce((n, [k, v]) => n + k.length + v.length, 0) > MAX_TOTAL) {
    return NextResponse.json({ ok: false, code: 'too_large', error: 'Submission is too large.' }, { status: 413 });
  }

  const formType = headerSafe(typeof payload.formType === 'string' ? payload.formType : 'Website form', 60);
  const subject = headerSafe(
    typeof payload.subject === 'string' && payload.subject.trim()
      ? payload.subject
      : `${formType} — hxhd website`
  );

  // Reply-To points at the enquirer so hitting Reply in Gmail answers them
  // directly. Only set when it is a plausible address — a malformed value here
  // makes Gmail reject the whole message.
  const submitted = entries.find(([k]) => k.toLowerCase() === 'email')?.[1] ?? '';
  const replyTo = EMAIL_RE.test(submitted) ? headerSafe(submitted, 254) : undefined;

  const text = [
    ...entries.map(([k, v]) => `${k}: ${v}`),
    '',
    `— Sent from the HXHD website (${formType}) at ${new Date().toISOString()}`,
  ].join('\n');

  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:14px">
${entries
  .map(
    ([k, v]) =>
      `<tr><td style="border:1px solid #e5e5e5;background:#fafafa;font-weight:600;vertical-align:top">${escapeHtml(
        k
      )}</td><td style="border:1px solid #e5e5e5;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
  )
  .join('\n')}
</table>
<p style="font-family:system-ui,sans-serif;font-size:12px;color:#777">Sent from the HXHD website (${escapeHtml(
    formType
  )}).</p>`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    // Port 465 is implicit TLS; 587 upgrades via STARTTLS.
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });

  try {
    const info = await transporter.sendMail({
      // Gmail rewrites From to the authenticated account anyway, so the display
      // name is the only part we control here.
      from: `"${process.env.SMTP_FROM_NAME || 'HXHD Website'}" <${user}>`,
      to: [...FORM_RECIPIENTS],
      replyTo,
      subject,
      text,
      html,
    });
    return NextResponse.json({ ok: true, id: info.messageId });
  } catch (err) {
    // Log server-side for diagnosis, but never leak SMTP internals (which can
    // include the account name) to the browser.
    console.error('[contact] send failed:', err);
    const code = (err as { code?: string }).code;
    return NextResponse.json(
      {
        ok: false,
        code: code === 'EAUTH' ? 'auth_failed' : 'send_failed',
        error: 'Could not send the message. Please email us directly.',
      },
      { status: 502 }
    );
  }
}
