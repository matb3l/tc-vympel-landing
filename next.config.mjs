import { withPayload } from '@payloadcms/next/withPayload'

const isDev = process.env.NODE_ENV !== 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    // В dev (за корп-файрволом) Next-сервер не всегда может сам достать Unsplash
    // для оптимизации → ETIMEDOUT. Поэтому в dev отдаём картинки напрямую в
    // браузер, а в проде на Vercel включаем полноценную оптимизацию (AVIF/WebP,
    // ресайз, edge-кеш).
    unoptimized: isDev,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    qualities: [70, 75, 80],
    minimumCacheTTL: 60 * 60 * 24 * 31,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default withPayload(nextConfig)
