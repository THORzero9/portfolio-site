import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable ESLint during build for static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove experimental features that don't work with static export
  experimental: {
    // Remove optimizePackageImports as it may cause issues with static export
  },
};

export default nextConfig;
