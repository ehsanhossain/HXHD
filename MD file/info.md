# info.md — everything you need at a glance

Reference sheet for **hxhdbd.com**. Start here; the other files go deeper.

| File | What it covers |
|---|---|
| `info.md` | This page — accounts, credentials, key facts |
| `start.md` | Running the site locally on any port |
| `deployguide.md` | Deploying to the live server, step by step |
| `workflow.md` | The GitHub Actions CI/CD pipeline |

---

## 1. The site

| | |
|---|---|
| Live URL | **https://hxhdbd.com** (and `www.hxhdbd.com`) |
| Company | Hubei Hongxing Hongda New Materials Co., Ltd. |
| Pages | 45 total — 6 sections, 11 knowledge articles, 28 product pages |
| Languages | English, 中文 (Chinese), বাংলা (Bengali) |
| Framework | Next.js 15.5.23, App Router, React 19, Tailwind CSS v4 |
| Font | Space Grotesk (single font site-wide) |
| Repository | `github.com/ehsanhossain/HXHD`, branch `main` |

### Routes

```
/                                    home
/products                            catalogue (28 products, 21 categories)
/products/[slug]                     product detail
/services                            services
/industries                          industries
/knowledge                           articles index
/knowledge/[slug]                    article detail (11 articles)
/contact                             contact + enquiry form
/api/contact                         form endpoint (POST)
```

---

## 2. Accounts and credentials

> Everything below is real and current. Git account details are deliberately
> omitted — see `deployguide.md §7`.

### Hosting — HostSeba (cPanel)

| Field | Value |
|---|---|
| Client area | https://www.hostseba.com/login |
| Email | `hongxinghongda7@gmail.com` |
| Password | `Hxhd_2026` |
| Plan | BDIX Premium Web Hosting — BDIXPH-Professional |
| Invoice | #1625841, term 12/08/2026 – 11/08/2027 |
| Service ID | 21959 |

**Login requires solving a reCAPTCHA**, so it cannot be fully automated — a human
must click it once per session.

### cPanel (reached via HostSeba single sign-on)

| Field | Value |
|---|---|
| Server IP | `103.65.138.26` |
| Hostname | `hydra.hostseba.com` |
| cPanel user | `hxhdbdco` |
| App directory | `/home/hxhdbdco/hxhdbd` |
| cPanel version | 136.0.32 |

SSO URL (opens cPanel without a separate password):

```
https://www.hostseba.com/clientarea.php?action=productdetails&id=21959&dosinglesignon=1&app=FileManager_Home
```

### FTP — deployment account

| Field | Value |
|---|---|
| Host | `103.65.138.26` |
| Username | `deploy@hxhdbd.com` |
| Password | `Hx7#dBd!2026$Deploy` |
| Protocol | FTPS (explicit TLS), port 21 |
| Server software | Pure-FTPd |

**This account is chrooted.** Its `/` *is* `/home/hxhdbdco/hxhdbd`. Always use
paths like `/.next/static`, never `/home/hxhdbdco/hxhdbd/.next/static`.

### DNS — Cloudflare

| Field | Value |
|---|---|
| Dashboard | https://dash.cloudflare.com/login |
| Email | `hongxinghongda7@gmail.com` |
| Password | `4iqpJ!5q.fK!_uR` |
| Sign-in method | **Google SSO** — the password box alone will not work |
| Account ID | `67e9e1b8cadea9d0ca941cdbe791f34f` |
| Nameservers | `bailey.ns.cloudflare.com`, `kenneth.ns.cloudflare.com` |

DNS records currently published:

| Type | Name | Value | Proxy |
|---|---|---|---|
| A | `hxhdbd.com` | `103.65.138.26` | Proxied |
| A | `www` | `103.65.138.26` | Proxied |
| TXT | `hxhdbd.com` | `v=spf1 +a +mx +ip4:103.65.138.26 ~all` | — |
| TXT | `default._domainkey` | `v=DKIM1; k=rsa; p=MIIBIjANBg…` | — |

### Mail

| Field | Value |
|---|---|
| Public contact address | `hongxinghongda7@gmail.com` |
| Sending mailbox | `website@hxhdbd.com` |
| Mailbox password | `HxhdBd2026Mail7x` |
| SMTP host | `hydra.hostseba.com` — **not** `localhost` |
| SMTP port | `587` (STARTTLS) |

### GitHub token

| Field | Value |
|---|---|
| Token | `ghp_xUZB…oaD9I` — **full value in `token.txt` beside this file** |
| Scopes | `repo`, `workflow` |
| Expires | 12 September 2026 |
| Type | **Classic** — fine-grained tokens are rejected by this repo |

> The literal token is kept in `token.txt`, which git ignores. GitHub's push
> protection refuses any commit containing a recognisable personal access token,
> so writing it here would make this file unpushable. Every other credential on
> this page is committed normally.
>
> If the token expires: github.com/settings/tokens/new → **classic** → tick
> `repo` and `workflow` → paste the new value into `token.txt`.

---

## 3. Company facts used on the site

| | |
|---|---|
| Founded | 2000 |
| Production bases | 4 — three in China, one in Bangladesh |
| Bangladesh plant | BEPZA Economic Zone, Mirsharai, Chittagong |
| Bangladesh investment | USD 76,410,000, with Mingda |
| Jobs created | 500+ |
| Signing date | 8 January 2024 |
| Export markets | 20+ countries across Asia and Africa |
| Phone | +880 1335 203691 |
| Address | House-51, Road No.-07, Nikunja-1, Dhaka-1229, Bangladesh |

Products: polymer emulsions, waterproofing systems, coating emulsions and
functional additives — 28 products across 21 categories, all scraped from the
group's real catalogue.

---

## 4. Environment quirks on this machine

Two things differ from a stock setup and will bite you if forgotten:

1. **`NODE_ENV=production` is set globally.** A plain `npm install` silently
   skips devDependencies, and the build then fails. Always install with
   `NODE_ENV=development`.
2. **`react-day-picker@8` declares peers of React ≤18** while the project runs
   React 19, so npm cannot resolve the tree without `--legacy-peer-deps`.

The one command that satisfies both:

```bash
NODE_ENV=development npm install --include=dev --legacy-peer-deps
```

---

## 5. Current status

| Item | State |
|---|---|
| Site live, HTTPS, all 45 pages | ✅ working |
| Three languages | ✅ working |
| Contact form sends mail | ✅ working |
| SPF + DKIM published | ✅ resolving publicly |
| CI (build, lint, typecheck) | ✅ passing |
| Automated FTP deploy | ⚠️ slow — see `workflow.md §5` |
| Manual FTP deploy | ✅ ~70 seconds |
