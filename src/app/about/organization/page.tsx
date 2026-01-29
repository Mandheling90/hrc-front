'use client'

import React from 'react'
import Image from 'next/image'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { useHospital } from '@/hooks'
import styles from './page.module.scss'

export default function OrganizationPage() {
  const { hospitalId, isGuro } = useHospital()

  // 병원별 조직도 이미지 경로
  const desktopImageSrc = `/images/organization_${hospitalId}_desktop.png`
  const tabletImageSrc = `/images/organization_${hospitalId}_tablet.png`
  const mobileImageSrc = `/images/organization_${hospitalId}_mobile.png`

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>조직도/연락처</h1>

          {/* 조직도 이미지 */}
          <div className={styles.orgChart}>
            {/* 데스크톱 이미지 */}
            <Image
              src={desktopImageSrc}
              alt='조직도'
              width={1200}
              height={710}
              className={styles.orgImageDesktop}
              priority
            />
            {/* 태블릿 이미지 */}
            <Image
              src={tabletImageSrc}
              alt='조직도'
              width={660}
              height={680}
              className={`${styles.orgImageTablet} ${isGuro ? styles.orgImageTabletGuro : ''}`}
              priority
            />
            {/* 모바일 이미지 */}
            <Image
              src={mobileImageSrc}
              alt='조직도'
              width={320}
              height={930}
              className={styles.orgImageMobile}
              priority
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
