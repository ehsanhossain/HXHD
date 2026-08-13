# deployguide.md — deploying hxhdbd.com

The complete, working procedure. Follow it top to bottom and the site updates in
about two minutes.

**Golden rule: deploy over FTP. Never use cPanel's archive extractor.** Section 8
explains why in detail; briefly, the extractor builds the directory tree but
silently truncates file contents, and the app dies with `MODULE_NOT_FOUND`.

---

## 1. What deployment actually does

```
build locally  →  assemble deploy/  →  FTP-sync to server  →  touch tmp/restart.txt
```

The server runs the app under **Passenger** with Node 20.20.2. Passenger reloads
the app whenever `tmp/restart.txt` changes its modification time — that final
touch is what makes new code take effect.

| | |
|---|---|
| Server | `103.65.138.26` (`hydra.hostseba.com`) |
| App directory | `/home/hxhdbdco/hxhdbd` |
| Startup file | `server.js` |
| Node version | 20.20.2, Production mode |

---

## 2. Deploy — the whole thing

```bash
cd "f:/Claude Projects/HXHDBD"

# 1. stop any running dev server first (see start.md §6)

# 2. clean build
rm -rf .next
NODE_ENV=production npx next build

# 3. assemble the deploy bundle
node scripts/package-deploy.mjs

# 4. sync it up + restart Passenger
#    (script listed in §4 — save it once and reuse)
node ftp-sync.mjs
```

Then verify:

```bash
for u in / /products /services /industries /knowledge /contact; do
  printf "%-14s " "$u"; curl -s -o /dev/null -w "%{http_code}\n" -m 60 "https://hxhdbd.com$u"
done
```

All six must print `200`.

---

## 3. What the packaging step produces

`scripts/package-deploy.mjs` assembles `deploy/` from three sources and strips
what the server does not need:

| Included | Size | Files |
|---|---|---|
| `.next/` (standalone server + static) | 7.1 MB | 239 |
| `public/` (images) | 20 MB | 85 |
| `node_modules/` (runtime deps only) | 32 MB | 1,843 |
| `server.js`, `package.json` | — | 2 |
| **Total** | **~54 MB** | **2,169** |

It **removes** `@img`, `sharp`, `typescript` and `@types` — `sharp` ships
platform-specific binaries, and a Windows build would upload Windows `.node`
files that a Linux server cannot load. This is also why `next.config.ts` sets:

```ts
images: { unoptimized: true }
```

The script refuses to produce an archive if any path contains a backslash, or if
`.next/static/` is missing.

---

## 4. The FTP sync script

Save as `ftp-sync.mjs` in a working folder alongside an `ftp-creds.json`.
Requires `npm i basic-ftp`.

```js
/**
 * Resilient FTP sync. uploadFromDir() is all-or-nothing: when the server drops
 * the data socket mid-run it aborts and leaves the document root half-written.
 * This walks the tree itself, retries individual files, and reconnects when the
 * control channel dies.
 */
import { Client } from 'basic-ftp';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { Readable } from 'node:stream';

const cred = JSON.parse(readFileSync('ftp-creds.json', 'utf8'));
const LOCAL = 'f:/Claude Projects/HXHDBD/deploy';

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push({ local: full, remote: '/' + relative(LOCAL, full).replace(/\\/g, '/') });
  }
  return acc;
}

const files = walk(LOCAL);
console.log(`${files.length} files`);

let client = null;
async function connect() {
  try { client?.close(); } catch {}
  client = new Client(120000);
  await client.access({
    host: cred.host, user: cred.user, password: cred.pass,
    secure: true, secureOptions: { rejectUnauthorized: false },
  });
}
await connect();

const madeDirs = new Set(['/']);
async function ensureDir(remotePath) {
  const dir = remotePath.slice(0, remotePath.lastIndexOf('/')) || '/';
  if (madeDirs.has(dir)) return;
  await client.ensureDir(dir);
  await client.cd('/');
  madeDirs.add(dir);
}

let done = 0;
const failed = [];
for (const f of files) {
  let ok = false;
  for (let attempt = 1; attempt <= 4 && !ok; attempt++) {
    try {
      await ensureDir(f.remote);
      await client.uploadFrom(f.local, f.remote);
      ok = true;
    } catch (e) {
      if (attempt === 4) { failed.push(f.remote); break; }
      madeDirs.clear(); madeDirs.add('/');
      try { await connect(); } catch { await new Promise(r => setTimeout(r, 3000)); }
    }
  }
  if (++done % 250 === 0) console.log(`  ${done}/${files.length}`);
}
console.log(`uploaded ${done - failed.length}/${files.length}`);

// Restart Passenger
await client.ensureDir('/tmp');
await client.cd('/');
await client.uploadFrom(Readable.from(['restart']), '/tmp/restart.txt');
console.log('restart requested');
client.close();
```

`ftp-creds.json`:

```json
{
  "host": "103.65.138.26",
  "user": "deploy@hxhdbd.com",
  "pass": "Hx7#dBd!2026$Deploy",
  "dir": "/home/hxhdbdco/hxhdbd"
}
```

Typical run: **2,169 files in about 70 seconds.**

---

## 5. Verifying a deploy

Beyond the six status codes, check the things that fail *silently*:

```bash
# stylesheet actually resolves — a site with no .next/static still returns 200
HTML=$(curl -s -m 60 https://hxhdbd.com/)
CSS=$(printf '%s' "$HTML" | grep -o '/_next/static/css/[^"]*\.css' | head -1)
curl -s -o /dev/null -w "css $CSS -> %{http_code}\n" "https://hxhdbd.com$CSS"

# the running build matches what you just shipped
echo "local:  $(cat .next/BUILD_ID)"
printf '%s' "$HTML" | grep -c "$(cat .next/BUILD_ID)"   # 1 = the live app is your build
```

Server-side errors are logged to `/stderr.log` in the FTP root — read it first
whenever something misbehaves.

---

## 6. Contact form and mail

The form posts to `/api/contact`, which sends through the domain mailbox. Five
environment variables make it work, set in **cPanel → Setup Node.js App →
Environment variables**:

| Variable | Value |
|---|---|
| `SMTP_HOST` | `hydra.hostseba.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `website@hxhdbd.com` |
| `SMTP_PASS` | `HxhdBd2026Mail7x` |
| `SMTP_FROM_NAME` | `HXHD Website` |

Two traps, both hit and fixed:

- **`SMTP_HOST` must not be `localhost`.** The mail server's certificate covers
  `hydra.hostseba.com` only, so STARTTLS fails with *"Hostname/IP does not match
  certificate's altnames"*.
- **Avoid `#`, `!`, `$` in the mailbox password.** The original produced
  `535 Incorrect authentication data`. Alphanumeric works.

`server.js` does **not** read `.env` files. Runtime configuration has to go
through the cPanel panel — putting a `.env` in the app folder does nothing.

Test delivery:

```bash
curl -s -m 150 -X POST https://hxhdbd.com/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"formType":"Enquiry","subject":"Test","fields":{"Name":"Test","Email":"hongxinghongda7@gmail.com","Message":"Delivery test."}}'
# expect: {"ok":true,"id":"<...@hxhdbd.com>"}
```

If it returns `{"ok":false,"code":"not_configured"}` the env vars are missing.
The form falls back to opening a mailto draft in that case, so enquiries are
never lost.

SPF and DKIM are already published (see `info.md §2`), so mail authenticates
rather than landing in spam.

---

## 7. Git

The repository is `github.com/ehsanhossain/HXHD`, branch `main`.

Account credentials are intentionally not recorded here. When a GitHub account
picker appears, choose the account already saved in the local Claude memory (`github-account-dibbotcf`) — no need to ask.

For pushing, use the token from `info.md §2`:

```bash
git push "https://<GIT-USERNAME>:<TOKEN>@github.com/ehsanhossain/HXHD.git" main
```

Two hard-won rules:

- **Classic tokens only.** Fine-grained tokens fail with *"Permission to
  ehsanhossain/HXHD.git denied to <your-user>"* — they cannot reach a repository
  owned by another account, regardless of permissions granted.
- **The token needs both `repo` and `workflow`.** Without `workflow`, any push
  touching `.github/workflows/` is rejected outright.

---

## 8. Traps — every one of these cost real time

### cPanel's extractor corrupts files
It creates the directory tree but truncates contents. Two attempts produced two
*different* missing modules. Always FTP.

### The FTP account is chrooted
Its `/` **is** `/home/hxhdbdco/hxhdbd`. Verifying with absolute server paths
reports everything as MISSING when the files are perfectly fine.

### FTPS data sockets drop mid-transfer
`tlsv1 alert decode error … SSL alert number 50`. The script in §4 reconnects and
retries per file. A plain `uploadFromDir()` aborts and leaves the site broken.

### 0-byte files fail every retry
`client-only/index.js` is legitimately empty and never uploads. Harmless — the
app runs regardless.

### Node version defaults to EOL 10.24.1
The cPanel panel defaults to Node 10, which cannot run Next.js 15. It must be set
to **20.20.2**.

### Windows-built archives break Linux
`Compress-Archive` writes backslash paths, so Linux `unzip` creates files
*named* `.next\static\…` with no directory at all. Use `tar --force-local` with
forward slashes. Already handled by `package-deploy.mjs`.

### Cloudflare hides your email address
Email Obfuscation rewrites `mailto:` links into `/cdn-cgi/l/email-protection#<hex>`.
Grepping the live HTML for the address finds nothing — this is a feature, not a
bug. Browsers decode it automatically and the address displays correctly.

### Cloudflare's "Add record" form cannot be scripted
The record-type control is a custom widget with no `<option>` elements, so
`selectOption()` times out and the value lands in the wrong field. Use
**Import and Export → Import DNS records** with a BIND zone file instead — that
works first time. TXT values over 255 characters must be split into quoted chunks:

```
hxhdbd.com.	300	IN	TXT	"v=spf1 +a +mx +ip4:103.65.138.26 ~all"
default._domainkey.hxhdbd.com.	300	IN	TXT	"first 255 chars…" "remainder…"
```

### Captchas need a human
HostSeba's login uses reCAPTCHA and Cloudflare uses Google SSO. Neither can be
automated — a person must click once, after which the session can be saved and
reused.

---

## 9. Rollback

```bash
git log --oneline -10
git checkout <good-commit>
rm -rf .next && NODE_ENV=production npx next build
node scripts/package-deploy.mjs
node ftp-sync.mjs
```

The site keeps serving the previous build throughout an upload, so a failed
deploy does not take it down — the only risk is an interrupted sync, which the
retry logic in §4 exists to prevent.

---

## 10. Quick reference

| Task | Command |
|---|---|
| Install deps | `NODE_ENV=development npm install --include=dev --legacy-peer-deps` |
| Build | `rm -rf .next && NODE_ENV=production npx next build` |
| Package | `node scripts/package-deploy.mjs` |
| Deploy | `node ftp-sync.mjs` |
| Verify | `curl -o /dev/null -w "%{http_code}" https://hxhdbd.com/` |
| Server errors | read `/stderr.log` over FTP |
| Restart app | upload any content to `/tmp/restart.txt` |
