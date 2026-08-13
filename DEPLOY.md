# Deploying hxhdbd.com

**Domain** hxhdbd.com (Cloudflare DNS) · **Host** HostSeba BDIX Premium
(cPanel + CloudLinux + LiteSpeed) · **Server** `hydra.hostseba.com` →
`103.65.138.26` · **cPanel user** `hxhdbdco`

The site is a Next.js app with a live `/api/contact` route that sends mail over
SMTP, so it runs as a **Node process** — not a folder of static HTML.

Deployment is automated: **push to `main` and it ships.** The manual route is
kept at the bottom for first-time setup and emergencies.

---

## How it works

| Workflow | Trigger | Does |
|---|---|---|
| [`ci.yml`](.github/workflows/ci.yml) | pull request → `main` | Builds, packages, boots the server and smoke-tests every page |
| [`deploy.yml`](.github/workflows/deploy.yml) | push → `main` | Builds, packages, FTP-syncs to the server, restarts Passenger, then verifies the live site |

Building in CI on Ubuntu is not incidental — it removes two failure modes that
bit us building on Windows:

- **`sharp`** ships platform-specific native binaries. A Windows build traced in
  `sharp-win32-x64`, which cannot load on the Linux host.
- **`Compress-Archive`** writes ZIP entries with backslashes (`.next\static\…`).
  The ZIP spec requires forward slashes, so Linux `unzip` created files whose
  *names* contained backslashes and no `.next/` directory ever appeared. The
  upload looked successful and the site would not start.

`npm run package` now asserts both: it refuses to produce an archive containing
backslashed paths or missing `.next/static`.

---

## One-time setup

### 1. Create an FTP account

cPanel → **FTP Accounts** → Add FTP Account

| Field | Value |
|---|---|
| Log In | `deploy` |
| Directory | `/home/hxhdbdco/hxhdbd` |
| Quota | Unlimited |

Note the full username — cPanel makes it `deploy@hxhdbd.com`.

### 2. Add the GitHub secrets

Repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Value |
|---|---|
| `FTP_HOST` | `103.65.138.26` |
| `FTP_USER` | `deploy@hxhdbd.com` |
| `FTP_PASSWORD` | the FTP account password |
| `FTP_REMOTE_DIR` | `/` (the FTP user is already chrooted to the app folder) |

> If the FTP account is created without a directory restriction, set
> `FTP_REMOTE_DIR` to `/hxhdbd/` instead.

### 3. Create the Node.js app (once)

cPanel → **Setup Node.js App** → Create Application

| Field | Value |
|---|---|
| Node.js version | **20.x** |
| Application mode | **Production** |
| Application root | `hxhdbd` |
| Application URL | `hxhdbd.com` |
| Application startup file | `server.js` |

Then add **Environment variables**:

| Name | Value |
|---|---|
| `SMTP_USER` | Gmail address used to authenticate |
| `SMTP_PASS` | 16-character Google **App Password** |
| `SMTP_FROM_NAME` | `HXHD Website` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `NEXT_PUBLIC_SITE_URL` | `https://hxhdbd.com` |
| `NODE_ENV` | `production` |

Save, then **Restart**.

> Without SMTP the site still works — every form falls back to opening a
> pre-addressed mail draft. Nothing breaks; the visitor just has to press Send.
>
> If the host blocks outbound 465, use `SMTP_PORT=587`; the route switches to
> STARTTLS for any port that is not 465.

### 4. Point DNS at the server

Cloudflare → **hxhdbd.com → DNS → Records**

| Type | Name | Content | Proxy |
|---|---|---|---|
| A | `@` | `103.65.138.26` | Proxied |
| A | `www` | `103.65.138.26` | Proxied |

Then **SSL/TLS → Overview → `Full (strict)`** and **Edge Certificates →
Always Use HTTPS**.

> `Flexible` causes a redirect loop against cPanel's own TLS. If the site errors
> right after DNS propagates, sit on `Full` for the hour AutoSSL needs to issue
> a certificate, then raise to `Full (strict)`.

---

## Everyday use

```bash
git push origin main
```

Watch it in the repo's **Actions** tab. The `verify` job fails the run if any
page stops returning 200 — including a check that the stylesheet actually
loads, which catches a partial sync that would otherwise look fine.

To redeploy without a code change: **Actions → Build and deploy → Run workflow**.

---

## Manual deploy (fallback)

```bash
npm run build
npm run package     # → hxhdbd-deploy.tar.gz, paths verified portable
```

cPanel → File Manager → `/home/hxhdbdco/hxhdbd` → Upload → select the archive →
**Extract** → then **Restart** in Setup Node.js App.

Use `.tar.gz`, not a Windows-made `.zip` — see the backslash note above.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| 503 / Passenger error | App not running | Setup Node.js App → **Restart** |
| Loads but unstyled | `.next/static` did not sync | Re-run the deploy; the `verify` job catches this |
| Images 404 | `public/` did not sync | Same |
| Redirect loop | Cloudflare SSL on `Flexible` | Switch to `Full (strict)` |
| Form opens a draft instead of sending | SMTP vars unset | Re-check the five SMTP vars, Restart |
| Form 500s | Port 465 blocked | `SMTP_PORT=587`, Restart |
| FTP step fails auth | Wrong user format | Use the full `deploy@hxhdbd.com` |

---

## Notes

- **Image optimisation is off** (`images.unoptimized`). Now that builds happen
  on Linux in CI, it could be re-enabled — drop the flag and stop stripping
  `@img` in `scripts/package-deploy.mjs`. Left off so a local Windows build
  still produces a working bundle.
- **Secrets never enter the repo.** `.env.local` is gitignored; production SMTP
  credentials live only in cPanel's environment panel, and FTP credentials only
  in GitHub Actions secrets.
