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
    fullName: '고려대학교 안암병원',
    description: '서울시 성북구 고려대로 73',
    logo: '/images/anam/logo-top.png'
  },
  {
    id: 'guro',
    name: '구로병원',
    fullName: '고려대학교 구로병원',
    description: '서울시 구로구 구로동로 148',
    logo: '/images/guro/logo-top.png'
  },
  {
    id: 'ansan',
    name: '안산병원',
    fullName: '고려대학교 안산병원',
    description: '경기도 안산시 단원구 적금로 123',
    logo: '/images/ansan/logo-top.png'
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
        <h1 className={styles.title}>고려대학교 진료협력센터</h1>
        <p className={styles.subtitle}>병원을 선택해주세요</p>
        <div className={styles.cards}>
          {hospitals.map(hospital => (
            <a key={hospital.id} href={`/${hospital.id}`} className={styles.card}>
              <div className={styles.logoWrapper}>
                <img src={hospital.logo} alt={hospital.fullName} className={styles.logo} />
              </div>
              <h2 className={styles.hospitalName}>{hospital.name}</h2>
              <p className={styles.hospitalFull}>{hospital.fullName} 진료협력센터</p>
              <p className={styles.hospitalAddress}>{hospital.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
