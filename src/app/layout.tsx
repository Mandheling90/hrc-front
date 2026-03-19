import type { Metadata } from 'next'
import Script from 'next/script'
import '@/styles/globals.scss'
import { Providers } from '@/components/providers/Providers'

export const metadata: Metadata = {
  title: {
    default: '고려대학교 진료협력센터',
    template: '%s | 고려대학교 진료협력센터'
  },
  description: '고려대학교 진료협력센터 - 진료의뢰, 협력네트워크, 의료상담 서비스',
  icons: {
    icon: '/images/favicon.ico'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <head>
        <link
          rel='stylesheet'
          as='style'
          crossOrigin='anonymous'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css'
        />
        <link
          rel='stylesheet'
          as='style'
          crossOrigin='anonymous'
          href='https://cdn.jsdelivr.net/gh/fonts-archive/Paperlogy/Paperlogy.css'
        />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}})()`
          }}
        />
        <Script src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js' strategy='lazyOnload' />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
