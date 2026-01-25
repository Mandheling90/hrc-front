'use client'

import React, { useMemo } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { ServiceSection } from '@/components/organisms/ServiceSection/ServiceSection'
import { useHospital } from '@/hooks'
import { mapServiceItems, mapBreadcrumbItems } from '@/utils'
import styles from './page.module.scss'

export default function ReferralRequestPage() {
  const { pageContent } = useHospital()

  // pageContent에서 request 페이지 정보 가져오기
  const requestInfo = pageContent.referralRequest

  // Breadcrumb 설정
  const breadcrumbItems = useMemo(() => {
    return mapBreadcrumbItems(requestInfo?.breadcrumbs)
  }, [requestInfo?.breadcrumbs])

  // 병원별 서비스 목록
  const services = useMemo(() => {
    return mapServiceItems(requestInfo?.services)
  }, [requestInfo?.services])

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
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
