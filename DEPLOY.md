# Deploying hxhdbd.com

Target: **HostSeba BDIX Premium (cPanel + CloudLinux + LiteSpeed)**, domain
**hxhdbd.com** on **Cloudflare** DNS.

The site is a Next.js app with a live API route (`/api/contact`) that sends
form submissions over SMTP, so it needs a **Node.js process** — it is not a
folder of static HTML.

---

## 0. Build the upload package

```bash
npm run build          # produces .next/standalone
npm run package        # assembles ./deploy and hxhdbd-deploy.zip
```

`hxhdbd-deploy.zip` (~27 MB) contains everything the server needs:

```
server.js          Next's standalone server
node_modules/      only the traced runtime deps
.next/             compiled app + static assets
public/            images, logo, favicon
```

`node_modules` is already inside — **do not run `npm install` on the server.**

---

## 1. Find your server IP (needed for step 3)

1. Log in to <https://www.hostseba.com/login>
2. **Services → My Services →** the BDIX Premium plan (invoice #1625841)
3. Click through to **cPanel**
4. In cPanel's right-hand sidebar, read **Shared IP Address** — e.g. `103.x.x.x`

Keep that IP. Cloudflare needs it.

---

## 2. Upload and start the Node app (cPanel)

### 2a. Upload

1. cPanel → **File Manager**
2. Go to your home directory (`/home/<user>`), **not** `public_html`
3. Create a folder `hxhdbd`
4. **Upload** `hxhdbd-deploy.zip` into it
5. Select the zip → **Extract**

> Why not `public_html`? A Node app is run by Passenger from its own folder.
> `public_html` stays as the document root that Passenger serves through.

### 2b. Create the app

cPanel → **Setup Node.js App** → **Create Application**

| Field | Value |
|---|---|
| Node.js version | **20.x** (or the highest 18+ offered) |
| Application mode | **Production** |
| Application root | `hxhdbd` |
| Application URL | `hxhdbd.com` |
| Application startup file | `server.js` |

Click **Create**.

### 2c. Add environment variables

Still in Setup Node.js App, open the app and add these under
**Environment variables** (values from your `.env.local`):

| Name | Value |
|---|---|
| `SMTP_USER` | the Gmail address that authenticates |
| `SMTP_PASS` | the 16-character Google **App Password** |
| `SMTP_FROM_NAME` | `HXHD Website` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `NEXT_PUBLIC_SITE_URL` | `https://hxhdbd.com` |
| `NODE_ENV` | `production` |

Then **Save** and **Restart** the application.

> If SMTP is left unset the site still works — every form quietly falls back to
> opening a pre-addressed mail draft instead of sending server-side. Nothing
> breaks, but the visitor has to press Send themselves.

> If HostSeba blocks outbound port 465, set `SMTP_PORT=587`. The route switches
> to STARTTLS automatically for any port that isn't 465.

---

## 3. Point DNS at the server (Cloudflare)

<https://dash.cloudflare.com> → select **hxhdbd.com** → **DNS → Records**

Add both records, replacing `<SERVER-IP>` with the IP from step 1:

| Type | Name | Content | Proxy |
|---|---|---|---|
| A | `@` | `<SERVER-IP>` | **Proxied** (orange cloud) |
| A | `www` | `<SERVER-IP>` | **Proxied** (orange cloud) |

Then **SSL/TLS → Overview → set encryption mode to `Full (strict)`**.

> Leaving it on `Flexible` causes a redirect loop once cPanel's own SSL is
> active. Use `Full (strict)` after AutoSSL has issued a certificate; if the
> site errors immediately after DNS propagates, drop to `Full` for the hour or
> so it takes cPanel to issue one.

Also enable **SSL/TLS → Edge Certificates → Always Use HTTPS**.

DNS propagation is usually minutes on Cloudflare, occasionally up to an hour.

---

## 4. Verify

```bash
curl -I https://hxhdbd.com                 # expect 200
curl -I https://hxhdbd.com/products        # expect 200
curl -I https://hxhdbd.com/services
curl -I https://hxhdbd.com/industries
curl -I https://hxhdbd.com/knowledge
curl -I https://hxhdbd.com/contact
```

Then in a browser:

- switch language **EN / 中文 / বাংলা** in the top bar — the whole page should change
- open **/contact**, submit the enquiry form, confirm mail arrives at the
  addresses in `FORM_RECIPIENTS` (`src/data/company.ts`)

---

## Redeploying after a change

```bash
npm run build && npm run package
```

Upload the new `hxhdbd-deploy.zip`, extract over `hxhdbd` (replacing files),
then **Restart** the app in Setup Node.js App. Environment variables persist.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| 503 / "passenger" error page | App not started | Setup Node.js App → **Restart** |
| Site loads, CSS missing | `.next/static` not uploaded | Re-extract the zip; confirm `hxhdbd/.next/static` exists |
| Images 404 | `public/` not uploaded | Confirm `hxhdbd/public/images` exists |
| Redirect loop | Cloudflare SSL on `Flexible` | Switch to `Full (strict)` |
| Form says "opened a draft" instead of sending | SMTP vars missing/wrong | Re-check the 5 SMTP vars, then Restart |
| Form 500s | Port 465 blocked | Set `SMTP_PORT=587`, Restart |

---

## Notes

- **Image optimisation is off** (`images.unoptimized` in `next.config.ts`).
  Next's optimiser needs `sharp`, whose native binaries are platform-specific —
  a bundle built on Windows carries only the Windows build and would fail on the
  Linux host. Images are served as-is instead. If you later want optimisation,
  build on Linux (or in CI) and drop the `unoptimized` flag.
- **Secrets are never committed.** `.env.local` is gitignored; production values
  live only in the cPanel environment-variables panel.
