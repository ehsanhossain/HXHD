# start.md — running the site on your machine

Verified working on 13 August 2026: dev server on port 4310, all pages
returning 200.

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

Default port 3000:

```bash
npm run dev
```

**On a specific port** (use this if 3000 is busy):

```bash
npx next dev -p 4310
```

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
for u in / /products /services /industries /knowledge /contact; do
  printf "%-14s " "$u"
  curl -s -o /dev/null -w "%{http_code}\n" -m 90 "http://localhost:4310$u"
done
```

All six should print `200`. Verified on 13 August 2026, plus
`/knowledge/how-is-acrylic-emulsion-produced` → 200.

Switch languages with the **EN · 中文 · বাংলা** control in the top-right of the
header. The choice is stored in `localStorage`; there are no `/en` or `/bn` URLs.

---

## 5. Production build locally

```bash
npm run build     # compiles and prerenders every page
npm start         # serves the built output on :3000
```

`npm run build` should end with a route table listing 45 routes, including
`● /knowledge/[slug]` with 11 paths and `● /products/[slug]` with 28.

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
    products.ts                  28 products, 21 categories
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
