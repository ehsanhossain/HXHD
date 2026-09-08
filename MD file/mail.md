# mail.md — how hxhdbd.com sends its form mail

Four forms on this site send mail. They all post to one endpoint, are delivered
by one route, and land in the same two inboxes. This is what each one sends,
what protects the endpoint, and what to check when a message does not arrive.

**No passwords in this file.** This repository is public. Runtime secrets belong
in cPanel → Setup Node.js App → Environment variables and nowhere else.

---

## 1. The path a message takes

```
form component
  └─ submitForm()                 src/lib/submitForm.ts
       └─ POST /api/contact       src/app/api/contact/route.ts
            └─ nodemailer → SMTP → FORM_RECIPIENTS
       └─ on failure: mailto: draft opens in the visitor's own mail client
```

| File | What lives there |
|---|---|
| `src/app/api/contact/route.ts` | Validation, throttling, the send itself |
| `src/lib/submitForm.ts` | Client helper; decides send vs. draft |
| `src/data/company.ts` | `FORM_RECIPIENTS` and `mailtoHref()` |
| cPanel env vars | Host, port, mailbox, password, display name |

`nodemailer` is the only dependency. The route is pinned to
`runtime = 'nodejs'` because nodemailer cannot run on the edge, and to
`dynamic = 'force-dynamic'` because every submission is unique and nothing here
may be cached or prerendered.

**The fallback is the point.** When the server cannot send — no credentials, or
a 5xx — `submitForm` opens a pre-addressed, pre-filled mail draft instead of
showing the visitor an error. The enquiry is never silently lost; the visitor
just has to press Send themselves. This is why the route answers with a specific
`not_configured` code rather than a generic failure: the client has to tell
"misconfigured, open the draft" apart from "you typed something wrong".

`submitForm` returns one of three outcomes and never throws:

| Outcome | Meaning | What the form shows |
|---|---|---|
| `sent` | Delivered by the server | Confirmation |
| `mailto` | Draft opened, not yet sent | "Finish in your mail app" |
| `error` | Refused, retrying may work | The error message |

`ContactForm` tracks exactly this as `'idle' \| 'sending' \| 'sent' \| 'mailto'`
and shows a different confirmation for the last two, because in the `mailto`
case nothing has actually been sent yet.

---

## 2. The four forms

| Form | File | `formType` |
|---|---|---|
| Contact / consultation | `components/contact/ContactForm.tsx` | `Enquiry`, or `Enquiry & Consultation Appointment` |
| Newsletter, contact page | `components/contact/NewsletterStrip.tsx` | `Newsletter` |
| Newsletter, products page | `components/products/ProductNewsletter.tsx` | `Product updates` |
| Technical resource access | `components/ResourcesAndInsights.tsx` | `Resource access` |

### Contact / consultation

The only form with a full field set, and the only one that changes shape at
submit time: filling the appointment date switches the `formType` and appends
the meeting to the subject line.

```
Subject:  Enquiry — <enquiry type> — <company or first name> [Meeting: <date>]
```

Fields sent: Name, Company, Role, Email, Phone, Country, Enquiry type, Has a
project, Marketing opt-in, Message — plus **Scheduled Meeting Date**, **Scheduled
Time Slot** and **Meeting Format** only when a date was chosen. An empty time
slot is sent as `Any time during business hours` rather than left blank, so the
recipient never has to guess whether it was skipped.

The form is validated in the browser first (`checkValidity()` + `reportValidity()`),
so the route rarely sees an incomplete submission from a real visitor.

### The two newsletter strips

Both send a single address and identify themselves by page, which is the only
way to tell the two subscription points apart in the inbox:

```ts
fields: { Email: value, Source: 'Contact page' }    // NewsletterStrip
fields: { Email: value, Source: 'Products page' }   // ProductNewsletter
```

### Technical resource access

Sits under Resources & Insights and gates the TDS / download centre. Sends Name,
Company, Email, Country, Role, and a fixed `Request` line reading
`Access to technical documentation (TDS / download centre)` — so the enquiry
explains itself without the recipient needing to know which form it came from.

```
Subject:  Technical resource access — <company, else name, else "Enquiry">
```

---

## 3. Who receives it

`FORM_RECIPIENTS` in `src/data/company.ts`:

```
hongxinghongda7@gmail.com
dibbodutta06@gmail.com
```

Both are on the `To:` line; there is no CC (see §7). Recipients are **code, not
configuration** — changing them is a commit and a deploy. That is deliberate: it
keeps the list reviewable in the diff rather than editable in a panel nobody
audits.

The same list backs `mailtoHref()`, so the draft fallback reaches exactly the
same people.

### What the message looks like

Two bodies are sent. Plain text is `Label: value` per line, closing with
`— Sent from the HXHD website (<formType>) at <ISO timestamp>`. HTML is a
two-column table, labels bold on a grey ground, values in `white-space: pre-wrap`
so a multi-line Message keeps its paragraphs.

`Reply-To` is set to the address the enquirer typed, so pressing Reply in Gmail
answers **them**, not the website mailbox. It is only set when the value looks
like an address — a malformed `Reply-To` makes Gmail reject the whole message,
so one bad entry would cost the enquiry rather than just the convenience.

---

## 4. Configuration

Set in **cPanel → Setup Node.js App → Environment variables**:

| Variable | Value |
|---|---|
| `SMTP_HOST` | `hydra.hostseba.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `website@hxhdbd.com` |
| `SMTP_PASS` | *(panel only — never in this repo)* |
| `SMTP_FROM_NAME` | `HXHD Website` |

The route derives TLS from the port alone: **465 is implicit TLS, 587 upgrades
via STARTTLS.** Nothing else selects it, so changing the port changes the
transport. We are on 587.

Unset, the transport falls back to `smtp.gmail.com:465`. That default is for
local development, not production.

---

## 5. What protects the endpoint

An open mail endpoint on a public site is a relay waiting to be found.

- **Header injection guard.** `headerSafe()` strips CR/LF from every value bound
  for a header. Without it, a newline in a submitted field injects its own
  headers — `Bcc:` among them — and the form becomes an open relay. This is the
  one protection here with a real exploit behind it; do not remove it.
- **Honeypot.** A hidden field named `website`. Real visitors never see it, so
  any value means a bot: the route returns `{ok:true}` and sends nothing, giving
  the bot no signal to adapt to.
- **Rate limit.** Five posts per IP per minute, counted in memory. It resets on
  redeploy and is per-instance, so treat it as a speed bump against casual abuse
  rather than protection. If this endpoint is ever targeted properly, move the
  counter to a shared store or put a CAPTCHA in front of the form.
- **Size caps.** 25 fields, 64-character keys, 5,000-character values, 20 KB
  total. A real enquiry never approaches these.
- **HTML escaping** on every value rendered into the HTML body.

### Known gap: only one form carries the honeypot

`ContactForm` passes `website: get('website')`. The two newsletter strips and the
resource-access form do not — `submitForm` defaults it to `''`, so those three
post without honeypot cover and lean on the rate limit alone. The newsletters
send one field, so the exposure is small; worth closing if subscription spam ever
starts arriving.

---

## 6. Response codes

Useful when a form misbehaves and you want to know which half is at fault.

| Code | HTTP | Meaning |
|---|---|---|
| `not_configured` | 503 | `SMTP_USER` or `SMTP_PASS` missing — client opens a draft |
| `rate_limited` | 429 | More than 5 posts from one IP in a minute |
| `bad_json` | 400 | Body was not JSON |
| `bad_fields` | 400 | `fields` missing or not an object |
| `empty` | 400 | Every field was blank |
| `too_large` | 413 | Over the 20 KB total |
| `auth_failed` | 502 | SMTP rejected the credentials |
| `send_failed` | 502 | Anything else the mail server refused |

SMTP internals are logged server-side and never returned to the browser — they
can contain the account name. Read them in `/stderr.log` over FTP.

### Testing delivery

```bash
curl -s -m 150 -X POST https://hxhdbd.com/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"formType":"Enquiry","subject":"Test","fields":{"Name":"Test","Email":"hongxinghongda7@gmail.com","Message":"Delivery test."}}'
```

Expect `{"ok":true,"id":"<...@hxhdbd.com>"}`.

`not_configured` means the environment variables are not reaching the app —
check the cPanel panel, not the code. `auth_failed` means the password; check
that before anything else.

---

## 7. Adding a CC

There is none today. Adding one is three edits, and the third is the one that
gets forgotten.

In `src/data/company.ts`:

```ts
export const FORM_CC = ['someone@example.com'] as const;
```

In `src/app/api/contact/route.ts`, alongside the existing `to:`:

```ts
to: [...FORM_RECIPIENTS],
cc: [...FORM_CC],
```

And in `mailtoHref()`, so the draft fallback copies them too — otherwise the CC
disappears on exactly the path that matters most, and nobody notices until an
enquiry goes missing:

```ts
const cc = FORM_CC.join(',');
const query = `cc=${cc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
```

Do not percent-encode the addresses or the commas between them. Encoding the
separator is what breaks multi-recipient drafts in Gmail, Outlook and Apple Mail
— the comment above `mailtoHref()` states the same rule for `to`.

---

## 8. Traps

### `SMTP_HOST` must not be `localhost`
The mail server's certificate covers `hydra.hostseba.com` only. Pointing at
`localhost` fails STARTTLS with *"Hostname/IP does not match certificate's
altnames"* — which reads like a TLS bug and is actually a hostname typo.

### Avoid `#`, `!` and `$` in the mailbox password
The original produced `535 Incorrect authentication data`. Alphanumeric works.

### `server.js` does not read `.env`
A `.env` in the app folder does nothing at all. Runtime configuration has to go
through the cPanel panel. The symptom is a form that keeps opening mailto drafts
while the code looks perfectly correct.

### Cloudflare rewrites the address in the page source
Email Obfuscation turns `mailto:` links into `/cdn-cgi/l/email-protection#<hex>`,
so grepping the live HTML for the address finds nothing. Browsers decode it
automatically and it displays correctly. This is a feature, not a fault.

### SPF and DKIM are already published
See `info.md §2`. Mail authenticates rather than landing in spam. If the sending
domain or host ever changes, both have to be republished or delivery quietly
degrades to the spam folder.
