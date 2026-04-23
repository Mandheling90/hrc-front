import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import '@/styles/globals.scss'
import { Providers } from '@/components/providers/Providers'
import { getCurrentHospitalConfig, getCurrentHospitalId } from '@/config/hospitals'

const hospital = getCurrentHospitalConfig()
const hospitalId = getCurrentHospitalId()

// 사이트 URL: 미설정 시 https://{hospitalId}refer.kumc.or.kr 패턴으로 자동 도출
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? `https://${hospitalId}refer.kumc.or.kr`).replace(/\/$/, '')

// OG/JSON-LD용 대표 이미지 (1200x630 권장 — 추후 og 전용 이미지로 교체)
const OG_IMAGE_PATH = `/images/home/building-${hospitalId}.png`
const SITE_DESCRIPTION = `${hospital.name.full}는 1·2차 의료기관과의 진료협력을 위한 진료의뢰, e-Consult, 협력네트워크 서비스를 제공합니다.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: hospital.name.full,
    template: `%s | ${hospital.name.full}`
  },
  description: SITE_DESCRIPTION,
  keywords: [
    hospital.name.hospital,
    hospital.name.center,
    '진료의뢰',
    '진료협력',
    '협력병원',
    '협력의원',
    'e-Consult',
    '의뢰환자조회',
    '교수직통핫라인',
    '고려대학교'
  ],
  applicationName: hospital.name.full,
  authors: [{ name: hospital.name.hospital }],
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: '/'
  },
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.ico'
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: hospital.name.full,
    title: hospital.name.full,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: hospital.name.full
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: hospital.name.full,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE_PATH]
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ]
}

const organizationLdJson = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: hospital.name.full,
  alternateName: hospital.name.english,
  url: SITE_URL,
  logo: `${SITE_URL}/images/common/${hospitalId}/logo-top.png`,
  image: `${SITE_URL}${OG_IMAGE_PATH}`,
  telephone: hospital.contact.referralCenter,
  faxNumber: hospital.contact.fax,
  address: {
    '@type': 'PostalAddress',
    streetAddress: hospital.address.full,
    postalCode: hospital.address.zipCode,
    addressCountry: 'KR'
  },
  parentOrganization: {
    '@type': 'CollegeOrUniversity',
    name: '고려대학교',
    url: 'https://www.korea.ac.kr'
  },
  sameAs: [hospital.links.homepage, hospital.links.youtube].filter(Boolean)
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
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLdJson) }}
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
