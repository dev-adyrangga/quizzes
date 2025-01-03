import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  i18n: {
    locales: ['default', 'en', 'ar'],
    defaultLocale: 'default',
    localeDetection: false
  },
  eslint: {
    dirs: ['.'],
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  trailingSlash: true,
  reactStrictMode: false
}

export default nextConfig
