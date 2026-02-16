import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Security headers configured in Nginx
  // experimental.serverActions removed - causes POST hang on Next.js 15.5.x
};

export default nextConfig;
