import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.DOCKER_BUILD === '1' ? { output: 'standalone' } : {}),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'milktea-iku.vercel.app' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
      ],
    },
    {
      source: '/fonts/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
  ],
  outputFileTracingRoot: __dirname,
  experimental: {
    outputFileTracingIncludes: {
      '/**/*': ['./backend/prisma/dev.db'],
    },
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
