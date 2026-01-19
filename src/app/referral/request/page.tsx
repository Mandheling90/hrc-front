'use client'

import React from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { PhoneRequestIcon } from '@/components/icons/PhoneRequestIcon'
import { DocumentReferralIcon } from '@/components/icons/DocumentReferralIcon'
import { HospitalPortalIcon } from '@/components/icons/HospitalPortalIcon'
import { HomeIcon } from '@/components/icons/HomeIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import styles from './page.module.scss'

export default function ReferralRequestPage() {
  const breadcrumbItems = [
    { label: '', href: '/', icon: <HomeIcon /> },
    { label: '진료의뢰', href: '/referral', icon: <ChevronDownIcon width={12} height={12} />, iconAfter: true },
    { label: '진료협력센터 의뢰', icon: <ChevronDownIcon width={12} height={12} />, iconAfter: true }
  ]

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className={styles.pageTitle}>진료협력센터 의뢰</h1>

          <InfoBox
            variant='guide'
            messages={[
              '고려대학교안암병원 진료협력센터는 지역병원에서 의뢰된 환자에게 최적의 의료서비스를 제공하는 3차 의료기관으로서의 기능을 수행하고 있습니다.',
              '다양한 진료의뢰시스템을 통해 지역병원 및 지역주민에게 진료의뢰 편의성을 제공하며, 신속한 의료서비스를 제공받으실 수 있도록 최선을 다하고 있습니다.'
            ]}
            showBullets={false}
            contentAlign='center'
            className={styles.introBox}
          />

          <div className={styles.requestMethods}>
            <div className={`${styles.requestCard} ${styles.phoneCard}`}>
              <div className={styles.leftSection}>
                <div className={styles.iconWrapper}>
                  <div className={styles.iconCircle}>
                    <PhoneRequestIcon width={36} height={36} stroke='#720021' />
                  </div>
                </div>
                <h3 className={styles.title}>전화의뢰</h3>
              </div>
              <div className={styles.rightSection}>
                <div className={styles.details}>
                  <p className={styles.detailItem}>T. 02-920-5892~4</p>
                  <div className={styles.detailRow}>
                    <span className={styles.detailText}>평일</span>
                    <span className={styles.detailText}>08:30~17:30</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailText}>토요일</span>
                    <span className={styles.detailText}>09:00~12:30</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.electronicCards}>
              <div className={`${styles.requestCard} ${styles.electronicCard}`}>
                <div className={styles.iconWrapper}>
                  <div className={styles.iconCircle}>
                    <DocumentReferralIcon width={36} height={36} fill='#720021' stroke='#720021' />
                  </div>
                </div>
                <div className={styles.textWrapper}>
                  <h3 className={styles.title}>전자의뢰</h3>
                  <p className={styles.description}>진료정보교류</p>
                </div>
              </div>

              <div className={`${styles.requestCard} ${styles.electronicCard}`}>
                <div className={styles.iconWrapper}>
                  <div className={styles.iconCircle}>
                    <HospitalPortalIcon width={36} height={36} stroke='#720021' />
                  </div>
                </div>
                <div className={styles.textWrapper}>
                  <h3 className={styles.title}>전자의뢰</h3>
                  <p className={styles.description}>심평원 중계포털</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
