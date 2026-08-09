import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All catalogue imagery is now served locally from public/images/catalog,
    // so no remote hosts need to be allow-listed.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
