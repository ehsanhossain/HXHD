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
const ZIP = join(ROOT, 'hxhdbd-deploy.zip');

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

// 5. zip it (PowerShell is always present on Windows; zip/ditto elsewhere)
await rm(ZIP, { force: true });
if (process.platform === 'win32') {
  await run('powershell', [
    '-NoProfile',
    '-Command',
    `Compress-Archive -Path '${OUT}\\*' -DestinationPath '${ZIP}' -CompressionLevel Optimal -Force`,
  ]);
} else {
  await run('zip', ['-qr', ZIP, '.'], { cwd: OUT });
}

const { size } = await stat(ZIP);
console.log(`hxhdbd-deploy.zip: ${mb(size)}`);
console.log('\nUpload it per DEPLOY.md, then Restart the app in cPanel.');
