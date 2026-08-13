import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Emits .next/standalone with a self-contained server.js that bundles only
   * the traced runtime dependencies. Needed for cPanel/Passenger hosting, where
   * uploading the full node_modules tree is impractical — and harmless on
   * platforms like Vercel, which ignore it.
   */
  output: "standalone",
  images: {
    /**
     * All catalogue imagery is served locally from public/images/catalog, so no
     * remote hosts need allow-listing.
     *
     * Optimisation is off deliberately. Next's optimiser needs `sharp`, which
     * ships platform-specific native binaries — a standalone bundle built on
     * Windows carries only sharp-win32-x64 and would fail at runtime on the
     * Linux host. Serving the files as-is removes that whole failure mode.
     * The source images are already sized for the layouts they appear in.
     */
    unoptimized: true,
  },
};

export default nextConfig;
