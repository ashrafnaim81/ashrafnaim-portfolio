import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increased to support image uploads up to 5MB + overhead
    },
  },
};

export default nextConfig;
