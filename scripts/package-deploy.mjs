/**
 * Assembles the cPanel/Passenger upload bundle from a completed `next build`.
 *
 * Next's `output: "standalone"` emits a server plus the traced runtime deps,
 * but deliberately leaves out `.next/static` and `public` — they are expected
 * to be served by a CDN. On shared hosting the Node process serves them, so
 * they have to be copied in alongside.
 *
 * Run: npm run package   (after npm run build)
 */
import { cp, rm, mkdir, access, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const ROOT = resolve(import.meta.dirname, '..');
const OUT = join(ROOT, 'deploy');
const ARCHIVE = join(ROOT, 'hxhdbd-deploy.tar.gz');

const STANDALONE = join(ROOT, '.next', 'standalone');

async function dirSize(dir) {
  let total = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    total += entry.isDirectory() ? await dirSize(p) : (await stat(p)).size;
  }
  return total;
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

if (!existsSync(STANDALONE)) {
  console.error(
    'No .next/standalone found.\n' +
      'Run `npm run build` first, and check next.config.ts still sets output: "standalone".'
  );
  process.exit(1);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

// 1. the standalone server + traced node_modules
await cp(STANDALONE, OUT, { recursive: true });

// 2. static assets the standalone output omits
await cp(join(ROOT, '.next', 'static'), join(OUT, '.next', 'static'), { recursive: true });
await cp(join(ROOT, 'public'), join(OUT, 'public'), { recursive: true });

/**
 * 3. Drop dead weight.
 *
 * `sharp` (@img) is traced in even with images.unoptimized, and its native
 * binaries are platform-specific — a Windows build would ship win32 binaries
 * that cannot load on the Linux host. Since optimisation is off, nothing calls
 * it. `typescript` is build-time only.
 */
for (const dead of ['@img', 'sharp', 'typescript', '@types']) {
  await rm(join(OUT, 'node_modules', dead), { recursive: true, force: true });
}

// 4. sanity-check the pieces the server cannot start without
for (const required of ['server.js', '.next/static', 'public', 'node_modules/next']) {
  try {
    await access(join(OUT, required));
  } catch {
    console.error(`Bundle is missing ${required} — refusing to package.`);
    process.exit(1);
  }
}

console.log(`bundle assembled: ${mb(await dirSize(OUT))}`);

/**
 * 5. Archive with `tar`, not PowerShell's Compress-Archive.
 *
 * Compress-Archive writes entry paths using the Windows separator
 * (".next\static\main.js"). The ZIP spec mandates forward slashes, so Linux
 * unzip does not see directories at all — it creates single files whose names
 * literally contain backslashes. The upload looks fine and the site then fails
 * to start because .next/ does not exist. bsdtar (shipped with Windows 10+)
 * writes portable paths, and cPanel extracts .tar.gz natively.
 */
await rm(ARCHIVE, { force: true });

/**
 * GNU tar (the one Git for Windows puts on PATH) reads "F:\..." as a remote
 * host spec and fails with "Cannot connect to F". Forward slashes plus
 * --force-local keep it local, and are harmless to bsdtar and GNU tar on Unix.
 */
const tarPath = (p) => p.replace(/\\/g, '/');
const tarArgs = (extra) => ['--force-local', ...extra];

await run('tar', tarArgs(['-czf', tarPath(ARCHIVE), '-C', tarPath(OUT), '.']), {
  maxBuffer: 64 * 1024 * 1024,
});

// Prove the separators are portable before anyone uploads this
const { stdout: listing } = await run('tar', tarArgs(['-tzf', tarPath(ARCHIVE)]), {
  maxBuffer: 128 * 1024 * 1024,
});
const entries = listing.split('\n').filter(Boolean);
const backslashed = entries.filter((e) => e.includes('\\'));
if (backslashed.length) {
  console.error(
    `${backslashed.length} entries contain backslashes, e.g. ${backslashed[0]}\n` +
      'Refusing to ship an archive Linux cannot extract.'
  );
  process.exit(1);
}
if (!entries.some((e) => e.includes('.next/static/'))) {
  console.error('Archive has no .next/static/ entries — the site would load without CSS.');
  process.exit(1);
}

const { size } = await stat(ARCHIVE);
console.log(`${entries.length} entries, separators verified portable`);
console.log(`hxhdbd-deploy.tar.gz: ${mb(size)}`);
console.log('\nUpload it per DEPLOY.md, then Restart the app in cPanel.');
