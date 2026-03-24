import type { NextConfig } from 'next'

const API_BACKEND = process.env.API_URL || 'http://api-service:8000'

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_BACKEND}/:path*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'anam.kumc.or.kr' },
      { protocol: 'https', hostname: 'guro.kumc.or.kr' },
      { protocol: 'https', hostname: 'ansan.kumc.or.kr' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'fxkowcvsrqduevavurff.supabase.co' }
    ]
  }
}

export default nextConfig
