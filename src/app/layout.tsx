import type { Metadata } from 'next'
import Script from 'next/script'
import '@/styles/globals.scss'
import { Providers } from '@/components/providers/Providers'

export const metadata: Metadata = {
  title: {
    default: '고려대학교 진료협력센터',
    template: '%s | 고려대학교 진료협력센터'
  },
  description: '고려대학교 진료협력센터 - 진료의뢰, 협력네트워크, 의료상담 서비스'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko'>
      <body>
        <Script src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' strategy='lazyOnload' />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
