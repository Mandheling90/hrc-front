import type { Metadata } from 'next'
import '@/styles/globals.scss'
import { Providers } from '@/components/providers/Providers'
import { getCurrentHospitalConfig } from '@/config/hospitals'

// 서버에서 병원 설정을 가져와 메타데이터 생성
const hospital = getCurrentHospitalConfig()

export const metadata: Metadata = {
  title: {
    default: hospital.name.full,
    template: `%s | ${hospital.name.full}`
  },
  description: `${hospital.name.hospital} ${hospital.name.center} - 진료의뢰, 협력네트워크, 의료상담 서비스`
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ko'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
