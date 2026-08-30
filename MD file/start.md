# start.md — running the site on your machine

Verified working on 20 August 2026: dev server on port 4310, all pages
returning 200, CSS applied and every cover image loading.

---

## 1. Requirements

| | |
|---|---|
| Node.js | 24.13.1 installed here; 20+ works. The **server** runs 20.20.2 |
| npm | 11.8.0 |
| Project folder | `f:\Claude Projects\HXHDBD` |

---

## 2. First time only — install dependencies

```bash
cd "f:/Claude Projects/HXHDBD"
NODE_ENV=development npm install --include=dev --legacy-peer-deps
```

**Do not shorten this command.** Both flags are load-bearing:

- `NODE_ENV=development` — this machine has `NODE_ENV=production` set globally,
  and npm silently skips devDependencies when it sees that. The build then fails
  with missing packages that look installed.
- `--legacy-peer-deps` — `react-day-picker@8` declares peer support for React ≤18
  while this project runs React 19. Without the flag npm aborts on the conflict.

Plain `npm install` **will** appear to succeed and then break the build.

---

## 3. Start the dev server

```bash
cd "f:/Claude Projects/HXHDBD"
NODE_ENV=development npx next dev -p 4310
```

**`NODE_ENV=development` is required, not optional.** This machine exports
`NODE_ENV=production` from the shell profile and `next dev` inherits it. The
server then starts, and answers `200`, while serving every page with **no CSS at
all**, logging:

```
⚠ You are using a non-standard "NODE_ENV" value in your environment.
⨯ ./src/app/globals.css
Module parse failed: Unexpected character '@' (1:0)
> @import 'tailwindcss' source(none);
```

Tailwind never runs, so the whole site renders unstyled. Plain `npm run dev`
hits this too — the flag is what avoids it, not the port.

Check with `echo $NODE_ENV`. If it prints `production`, prefix the command.

Expected output:

```
   ▲ Next.js 15.5.23
   - Local:        http://localhost:4310
   - Network:      http://192.168.68.44:4310
   - Environments: .env.local
 ✓ Starting...
```

Open **http://localhost:4310**. The first request to each page compiles on
demand, so it takes a few seconds; after that it is instant.

### Picking a free port

```bash
netstat -ano | grep LISTENING | grep -E ":(3000|3001|4310)"
```

No output means the port is free. Any port from 1024–65535 works — 4310, 5173
and 8080 are all fine.

---

## 4. Check it works

```bash
for u in / /products /services /industries /knowledge /contact /about /career; do
  printf "%-14s " "$u"
  curl -s -o /dev/null -w "%{http_code}\n" -m 180 "http://localhost:4310$u"
done
```

All eight should print `200`. Verified on 20 August 2026, along with
`/knowledge/how-is-acrylic-emulsion-produced` and a product detail page.

**A 200 is not proof the page is right.** An unstyled page still returns 200 —
see section 3. The quickest check is the header's left edge: it should sit at
`x: 0`. At `x: 8` you are seeing the browser's default body margin, which means
no CSS loaded at all.

Switch languages with the **EN · 中文 · বাংলা** control in the top-right of the
header. The choice is stored in `localStorage`; there are no `/en` or `/bn` URLs.

---

## 5. Production build locally

```bash
rm -rf .next      # never build on top of a dev server's .next -- see section 6
npm run build     # compiles and prerenders every page
PORT=4310 npm start
```

`npm run build` should end with `✓ Generating static pages (58/58)`, including
`● /knowledge/[slug]` with 11 paths and `● /products/[slug]` with 35.

`npm start` needs no `NODE_ENV` override — production is what it wants.

---

## 6. ⚠️ The mistake that keeps recurring

**Never run `npm run build` while `npm run dev` is running.**

Both write to `.next/`. The build overwrites files the dev server has open, and
the browser then throws:

```
Runtime TypeError: __webpack_modules__[moduleId] is not a function
```

Nothing is actually broken — the folder is just half-overwritten. To recover:

```bash
# 1. stop the dev server (Ctrl-C)
# 2. delete the build folder
rm -rf .next
# 3. start again
npm run dev
```

This has cost time more than once. Stop the dev server *first*, every time.

### The same trap in reverse: a dead server still answers

If something already holds the port, the new server dies with `EADDRINUSE` —
but launched in the background you see nothing, and `curl` still returns **200**
from the *old* process. You then test the previous build believing it is the new
one.

Read the log after starting, and confirm what owns a port before killing it.
Port 3000 once belonged to an entirely different project:

```bash
netstat -ano | grep -E "TCP.*:4310\s.*LISTENING"
powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Where-Object { $_.CommandLine -like '*HXHDBD*' } | ForEach-Object { '{0}  {1}' -f $_.ProcessId, $_.CommandLine }"
```

Only kill what shows `HXHDBD` in its command line.

---

## 7. Other useful commands

```bash
npm run lint                      # ESLint
npx tsc --noEmit -p tsconfig.json # typecheck — silence means clean
npm run package                   # build the deploy/ bundle (see deployguide.md)
```

---

## 8. Where things live

```
src/
  app/
    page.tsx                     home
    products/, services/, industries/, knowledge/, contact/
    knowledge/[slug]/            article detail pages
    products/[slug]/             product detail pages
    api/contact/route.ts         form endpoint — reads SMTP_* env vars
    components/                  Header, Footer, Hero, section blocks
    globals.css                  design tokens, shapes, script-aware type
  data/
    products.ts                  35 products, 21 categories
    company.ts                   company facts, addresses, contact details
    knowledge.ts                 11 articles with full body text
  i18n/
    dictionaries.ts              short UI strings
    content.ts                   page copy in all three languages
    articleBody.ts               all 111 article blocks in zh + bn
    LanguageProvider.tsx         the language context
scripts/
  package-deploy.mjs             assembles deploy/ for the server
```

### Editing content

| To change | Edit |
|---|---|
| A product | `src/data/products.ts` |
| Company details, address, email | `src/data/company.ts` |
| An article's text | `src/data/knowledge.ts` (English) + `src/i18n/articleBody.ts` (zh/bn) |
| Page headings and body copy | `src/i18n/content.ts` |
| Menus, buttons, labels | `src/i18n/dictionaries.ts` |

`content.ts` and `dictionaries.ts` are typed from the English version, so a
missing Chinese or Bengali key is a **compile error**, not a silent gap.

Article bodies are positional: entry `i` in `articleBody.ts` translates block `i`
in `knowledge.ts`. If the counts stop matching, that article falls back to
English wholesale rather than pairing the wrong text with the wrong paragraph.
