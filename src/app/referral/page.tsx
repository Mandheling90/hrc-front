'use client'

import React, { useMemo } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { ServiceSection } from '@/components/organisms/ServiceSection/ServiceSection'
import { SystemIcon } from '@/components/icons/SystemIcon'
import { useHospital } from '@/hooks'
import { mapServiceItems } from '@/utils'
import styles from './page.module.scss'

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
          <h1 className={styles.pageTitle}>진료의뢰시스템 소개</h1>

          <InfoBox
            variant='guide'
            icon={<SystemIcon width={48} height={48} fill='#8b6f47' />}
            messages={pageContent.referral.intro}
            showBullets={false}
            contentAlign='center'
            textAlign='center'
          />
          <ServiceSection title='이용가능한 서비스' services={services} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
