'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { getHospitalFromPath } from '@/utils/hospital'
import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate'
import styles from './page.module.scss'

const hospitals = [
  {
    id: 'anam',
    name: '안암병원',
    fullName: '고려대학교 안암병원 진료협력센터',
    fullNameEn: 'KOREA UNIVERSITY ANAM HOSPITAL REFERRAL CENTER',
    description: '서울시 성북구 고려대로 73',
    logo: '/images/common/anam/logo.png',
    bgImage: '/images/home/building-anam.png'
  },
  {
    id: 'guro',
    name: '구로병원',
    fullName: '고려대학교 구로병원 진료협력센터',
    fullNameEn: 'KOREA UNIVERSITY GURO HOSPITAL REFERRAL CENTER',
    description: '서울시 구로구 구로동로 148',
    logo: '/images/common/guro/logo.png',
    bgImage: '/images/home/building-guro.png'
  },
  {
    id: 'ansan',
    name: '안산병원',
    fullName: '고려대학교 안산병원 진료협력센터',
    fullNameEn: 'KOREA UNIVERSITY ANSAN HOSPITAL REFERRAL CENTER',
    description: '경기도 안산시 단원구 적금로 123',
    logo: '/images/common/ansan/logo.png',
    bgImage: '/images/home/building-ansan.png'
  }
]

export default function Home() {
  const pathname = usePathname()
  const hospitalId = getHospitalFromPath(pathname)

  // 병원 prefix가 있으면 (/anam, /guro, /ansan) → 해당 병원 메인 페이지
  if (hospitalId) {
    return <MainTemplate />
  }

  // 병원 prefix 없으면 (/) → 병원 선택 페이지
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>고려대학교 진료협력센터</h1>
          <p className={styles.subtitle}>Korea University Referral Center</p>
        </div>
        <div className={styles.cards}>
          {hospitals.map(hospital => (
            <a key={hospital.id} href={`/${hospital.id}`} className={styles.card}>
              <div
                className={`${styles.cardBg}${hospital.id === 'anam' ? ` ${styles.cardBgAnam}` : ''}`}
                style={{ backgroundImage: `url(${hospital.bgImage})` }}
              />
              <div className={styles.cardBgOverlay} />
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <h2 className={styles.hospitalName}>
                    {hospital.name}
                    <br />
                    진료협력센터
                  </h2>
                  <p className={styles.hospitalAddress}>{hospital.description}</p>
                </div>
                <div className={styles.cardBottom}>
                  <img src={hospital.logo} alt={hospital.fullName} className={styles.logo} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
