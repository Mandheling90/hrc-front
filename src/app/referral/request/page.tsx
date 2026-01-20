'use client'

import React, { useMemo } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { ServiceSection } from '@/components/organisms/ServiceSection/ServiceSection'
import { ReferralIcon } from '@/components/icons/ReferralIcon'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { PhoneRequestIcon } from '@/components/icons/PhoneRequestIcon'
import { DocumentReferralIcon } from '@/components/icons/DocumentReferralIcon'
import { HospitalPortalIcon } from '@/components/icons/HospitalPortalIcon'
import { SNSTalkIcon } from '@/components/icons/SNSTalkIcon'
import { useHospital } from '@/hooks'
import styles from './page.module.scss'

export default function ReferralRequestPage() {
  const { pageContent } = useHospital()

  // pageContent에서 request 페이지 정보 가져오기
  const requestInfo = pageContent.referralRequest

  // 아이콘 매핑
  const iconMap = useMemo<Record<string, React.ReactNode>>(
    () => ({
      HomeIcon: <HomeIcon />,
      ChevronDownIcon: <ChevronDownIcon width={12} height={12} />,
      PhoneRequestIcon: <PhoneRequestIcon width={60} height={60} stroke='#720021' />,
      DocumentReferralIcon: <DocumentReferralIcon width={60} height={60} fill='#720021' stroke='#720021' />,
      HospitalPortalIcon: <HospitalPortalIcon width={60} height={60} stroke='#720021' />,
      SNSTalkIcon: <SNSTalkIcon width={60} height={60} fill='#720021' stroke='#720021' />
    }),
    []
  )

  // Breadcrumb 설정 (병원별로 다를 수 있음)
  const breadcrumbItems =
    requestInfo?.breadcrumbs?.map(item => ({
      label: item.label,
      href: item.href,
      icon: item.icon ? iconMap[item.icon] : undefined,
      iconAfter: item.iconAfter
    })) || []

  // 병원별 서비스 목록
  const services = useMemo(() => {
    return (pageContent.referralRequest?.services || []).map(item => ({
      id: item.id,
      icon: iconMap[item.icon] || <ReferralIcon width={60} height={60} fill='#720021' />,
      title: item.title,
      description: item.description,
      href: item.href,
      tabletSpan: item.tabletSpan,
      mobileSpan: item.mobileSpan,
      mobileTitleBelowIcon: item.mobileTitleBelowIcon
    }))
  }, [pageContent.referralRequest?.services, iconMap])

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className={styles.pageTitle}>진료협력센터 의뢰</h1>

          <InfoBox
            variant='guide'
            messages={requestInfo?.intro || []}
            showBullets={false}
            contentAlign='center'
            className={styles.introBox}
          />

          <ServiceSection services={services} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
