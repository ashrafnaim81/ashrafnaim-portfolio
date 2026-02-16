import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Security headers are configured in Nginx (not here)
  // due to Next.js 15.5.x compatibility issue with async headers()
};

export default nextConfig;
