import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Required for Cloudflare Pages
  distDir: process.env.CF_PAGES ? '.vercel/output/static' : '.next',
  generateBuildId: async () => {
    return 'my-build-id'
  },
  trailingSlash: true,
};

export default nextConfig;
