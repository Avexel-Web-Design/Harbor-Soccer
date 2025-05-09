// import type { NextConfig } from "next"; // Commented out as 'next' is not a dependency

const nextConfig = { // Removed NextConfig type
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
// This committs
