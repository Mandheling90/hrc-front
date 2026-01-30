'use client'

import React from 'react'
import Image from 'next/image'
import styles from './FloorMapAnsan.module.scss'

interface FloorMapAnsanProps {
  address?: string
  phone?: string
  imageSrc?: string
}

export function FloorMapAnsan({
  address = '(15355) 경기 안산시 단원구 적금로 123 고려대학교 안산병원 본관 지하 1층 (에스컬레이터 옆)',
  phone = '031-412-5103',
  imageSrc = '/images/FloorMapAnsan.png'
}: FloorMapAnsanProps) {
  return (
    <div className={styles.container}>
      {/* 주소/전화번호 정보 */}
      <div className={styles.infoList}>
        <div className={styles.infoItem}>
          <span className={styles.bullet} />
          <span className={styles.infoText}>주소 : {address}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.bullet} />
          <span className={styles.infoText}>전화번호 : {phone}</span>
        </div>
      </div>

      {/* 층별 안내도 이미지 */}
      <div className={styles.mapWrapper}>
        <Image
          src={imageSrc}
          alt='안산병원 지하1층 안내도'
          fill
          className={styles.mapImage}
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
        />
      </div>
    </div>
  )
}
