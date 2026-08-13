# workflow.md — the CI/CD pipeline

**Status: working.** Run #3 deployed and verified end to end on 13 August 2026 —
deploy job green in 11 minutes, verify job green on every check.

Push to `main` → GitHub builds the site, uploads it, restarts Passenger, and
fails loudly if the live site is not healthy afterwards.

---

## 1. The two workflows

| File | Runs when | Does |
|---|---|---|
| `.github/workflows/ci.yml` | pull requests + manual | build, lint, typecheck — no deploy |
| `.github/workflows/deploy.yml` | push to `main` + manual | build, package, FTP-sync, restart, verify |

Watch runs at **github.com/ehsanhossain/HXHD/actions**.

---

## 2. Deploy pipeline, step by step

```
deploy (40 min limit)
  1  checkout                     fetch-depth: 2, for the dependency guard
  2  setup-node 20 + npm cache
  3  npm ci --legacy-peer-deps
  4  npm run build
  5  npm run package              assemble ./deploy
  6  stamp tmp/restart.txt        this is what reloads Passenger
  7  guard against dependency drift
  8  Deploy over FTP              ~11 min
  9  summary

verify  (runs only if deploy succeeded)
  1  sleep 45                     let Passenger come back
  2  every page returns 200
  3  a product detail page returns 200
  4  the stylesheet actually resolves
```

Concurrency is set so a second push **queues** rather than interleaving files
into a half-finished upload:

```yaml
concurrency:
  group: deploy-production
  cancel-in-progress: false
```

---

## 3. Repository secrets

Configured under **Settings → Secrets and variables → Actions**. All four are
already set:

| Secret | Value |
|---|---|
| `FTP_HOST` | `103.65.138.26` |
| `FTP_USER` | `deploy@hxhdbd.com` |
| `FTP_PASSWORD` | `Hx7#dBd!2026$Deploy` |
| `FTP_REMOTE_DIR` | `/` — the deploy account is chrooted to the app root |

Setting them from the command line requires sealing each value with the repo's
public key (libsodium sealed box); the GitHub web UI does the same thing with
less ceremony.

---

## 4. Why node_modules is excluded — read before "fixing" this

The first two runs burned their entire job limit inside "Deploy over FTP"
**without writing a single byte**. Every file on the server still carried the
timestamp of the previous manual sync.

The verbose log showed the cause, and it was not what it looked like. The
connection was perfectly healthy — `250` and `550` responses coming back
normally. But each FTP command was taking **seconds**, and the action was
spending all of them walking `node_modules`:

```
08:46:35  > MKD node_modules
08:46:39  < 550 Can't create directory: File exists
08:47:06  > CWD @edge-runtime
08:47:44  < 250 OK. Current directory is ***
08:48:12  > MKD node_modules
08:49:13  ##[error]The operation was canceled.
```

`node_modules` is **1,843 of the bundle's 2,169 files** and **330 of its 369
directories**. This host answers FTP commands from GitHub's runners far slower
than from a local connection — measured at roughly **15 files/min**, against
about 1,800 files/min locally.

Excluding it drops the sync to **326 files across 39 directories**, which
completes in about 11 minutes. Dependencies are already on the server and only
change when the lockfile does.

```yaml
exclude: |
  **/.git*
  **/.git*/**
  **/node_modules/**
  **/*.map
```

**Do not remove `**/node_modules/**` from that list.** Doing so returns the
pipeline to a state where it never finishes.

---

## 5. The dependency guard

Because `node_modules` is not synced, new application code could otherwise ship
against a stale dependency tree. The pipeline refuses instead:

```yaml
- name: Guard against dependency drift
  run: |
    if git rev-parse HEAD~1 >/dev/null 2>&1 && \
       ! git diff --quiet HEAD~1 HEAD -- package-lock.json package.json; then
      echo "::error::package.json or package-lock.json changed…"
      exit 1
    fi
```

**When you add or upgrade a package**, the deploy will fail on purpose. Do this:

1. Deploy manually once — full sync including `node_modules`
   (`deployguide.md §2`)
2. Re-run the workflow from the Actions tab

After that, pushes go back to deploying automatically.

---

## 6. Normal usage

```bash
git add -A
git commit -m "feat: whatever changed"
git push "https://<GIT-USERNAME>:<TOKEN>@github.com/ehsanhossain/HXHD.git" main
```

Then watch the Actions tab. Expect roughly:

| Stage | Time |
|---|---|
| install + build + package | ~1.5 min |
| FTP sync | ~11 min |
| verify | ~1 min |
| **total** | **~13 min** |

Manual deploy is faster (~70 s) — the pipeline's value is that it always builds
clean, and refuses to leave a broken site unnoticed.

To deploy without a code change: **Actions → Build and deploy to HostSeba → Run
workflow**.

---

## 7. Reading a failure

| Failing step | Meaning | Fix |
|---|---|---|
| Install dependencies | lockfile out of step | `npm install --legacy-peer-deps`, commit the lockfile |
| Build | real compile or type error | reproduce locally with `npm run build` |
| Guard against dependency drift | deps changed | manual full deploy, then re-run — §5 |
| Deploy over FTP | credentials or host trouble | check the four secrets; read `/stderr.log` |
| Check every page responds | app did not restart | confirm `tmp/restart.txt` uploaded; check `/stderr.log` |
| Check CSS actually loaded | `.next/static` did not sync | re-run; if it persists, deploy manually |

Logs only become downloadable **after** a job finishes — an in-progress job
returns `BlobNotFound`. To watch a running deploy, check whether files on the
server are actually being written:

```bash
node ftp-progress.mjs   # counts files with a fresh timestamp
```

That single check is what distinguished "slow but working" from "hung" during
diagnosis, and it is the fastest way to tell them apart again.

---

## 8. The token

Pushing anything under `.github/workflows/` needs a **classic** token with both
`repo` and `workflow` scopes. See `info.md §2` for the current token; it expires
**12 September 2026**.

When it lapses: github.com/settings/tokens/new → tick `repo` and `workflow` →
Generate. The *fine-grained* token page will not work for this repository.

Normal deploys keep running after the token expires — they authenticate with the
stored repository secrets, not the token. Only pushing workflow **file changes**
needs it.

---

## 9. Current pipeline health

| Job | Last result |
|---|---|
| CI — build, lint, typecheck | ✅ success |
| Deploy — FTP sync | ✅ success, 11 min |
| Verify — pages, detail page, CSS | ✅ success |

Run #1 and #2 failed (node_modules, since fixed); #3 is the first green
end-to-end run.
