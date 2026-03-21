import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
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
