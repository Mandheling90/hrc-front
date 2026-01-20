'use client'

import React, { useMemo } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { ServiceSection } from '@/components/organisms/ServiceSection/ServiceSection'
import { SystemIcon } from '@/components/icons/SystemIcon'
import { ReferralIcon } from '@/components/icons/ReferralIcon'
import { PatientIcon } from '@/components/icons/PatientIcon'
import { NetworkIcon } from '@/components/icons/NetworkIcon'
import { ConsultingIcon } from '@/components/icons/ConsultingIcon'
import { useHospital } from '@/hooks'
import { ServiceItem } from '@/types/hospital'
import styles from './page.module.scss'

// 아이콘 이름을 React 컴포넌트로 매핑
const iconMap: Record<string, React.ReactNode> = {
  ReferralIcon: <ReferralIcon width={60} height={60} fill='#720021' />,
  PatientIcon: <PatientIcon width={49} height={54} fill='#720021' stroke='#720021' />,
  ConsultingIcon: <ConsultingIcon width={60} height={60} fill='#720021' stroke='#720021' />,
  NetworkIcon: <NetworkIcon width={60} height={60} fill='#720021' stroke='#720021' />
}

// ServiceItem을 ServiceSection에서 사용하는 형식으로 변환
const mapServiceItems = (items: ServiceItem[]) => {
  return items.map(item => ({
    id: item.id,
    icon: iconMap[item.icon] || <ReferralIcon />,
    title: item.title,
    description: item.description.replace(/\\n/g, '\n'),
    href: item.href
  }))
}

export default function ReferralPage() {
  const { pageContent } = useHospital()

  // 병원별 서비스 목록
  const services = useMemo(() => {
    return mapServiceItems(pageContent.referral.services)
  }, [pageContent.referral.services])

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          {/* <Breadcrumbs items={breadcrumbItems} /> */}
          <h1 className={styles.pageTitle}>진료의뢰시스템 소개</h1>

          <InfoBox
            variant='guide'
            icon={<SystemIcon width={48} height={48} fill='#8b6f47' />}
            messages={pageContent.referral.intro}
            showBullets={true}
            contentAlign='center'
          />
          <ServiceSection title='이용가능한 서비스' services={services} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
