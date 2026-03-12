'use client'

import React from 'react'
import Image from 'next/image'
import styles from './SubwayInfoAnsan.module.scss'
import { SearchIcon } from '@/components/icons/SearchIcon'
import type { SubwayRouteDetail } from '@/types/hospital'

interface SubwayInfoAnsanProps {
  subwayInfo: SubwayRouteDetail[]
}

export function SubwayInfoAnsan({ subwayInfo }: SubwayInfoAnsanProps) {
  if (!subwayInfo || subwayInfo.length === 0) {
    return null
  }

  const info = subwayInfo[0]

  return (
    <div className={styles.container}>
      {/* 노선 정보 */}
      <div className={styles.lineInfo}>
        <div className={styles.lineChips}>
          <span className={`${styles.lineChip} ${styles.line4}`}>4호선</span>
          <span className={`${styles.lineChip} ${styles.lineSuinBundang}`}>수인분당선</span>
        </div>
        <span className={styles.stationName}>{info.station} 하차</span>
      </div>

      {/* 지하철 노선도 이미지 */}
      <div className={styles.mapWrapper}>
        <Image
          src='/images/about/location/subway_map_snsan.png'
          alt='안산 지하철 노선도'
          fill
          className={styles.mapImage}
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
        />
      </div>

      {/* 하단 버튼 및 출처 */}
      <div className={styles.footer}>
        <button type='button' className={styles.searchButton}>
          <span className={styles.searchButtonText}>지하철로 길찾기</span>
          <SearchIcon width={16} height={16} fill='#ffffff' />
        </button>
        <p className={styles.source}>이미지 출처 : 한국철도공사</p>
      </div>
    </div>
  )
}
