'use client'

import React from 'react'
import { MapIcon } from '@/components/icons/MapIcon'
import { HomeIcon } from '@/components/icons/HomeIcon'
import styles from './ClinicCard.module.scss'

export interface ClinicCardProps {
  /** 병의원 이름 */
  name: string
  /** 공지 여부 */
  hasNotice?: boolean
  /** 주소 */
  address: string
  /** 전화번호 */
  phone: string
  /** 팩스번호 */
  fax: string
  /** 강조 표시 여부 (첫 번째 카드 등) */
  highlighted?: boolean
  /** 지도 버튼 클릭 핸들러 */
  onMapClick?: () => void
  /** 홈 버튼 클릭 핸들러 */
  onHomeClick?: () => void
  /** className */
  className?: string
}

export const ClinicCard: React.FC<ClinicCardProps> = ({
  name,
  hasNotice = false,
  address,
  phone,
  fax,
  highlighted = false,
  onMapClick,
  onHomeClick,
  className = ''
}) => {
  return (
    <div className={`${styles.card} ${highlighted ? styles.highlighted : ''} ${className}`}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3 className={styles.name}>{name}</h3>
          {hasNotice && (
            <span className={`${styles.badge} ${highlighted ? styles.badgeHighlighted : styles.badgeNormal}`}>
              공지
            </span>
          )}
        </div>
        <div className={styles.buttonGroup}>
          <button
            type='button'
            className={`${styles.iconButton} ${highlighted ? styles.iconButtonHighlighted : styles.iconButtonNormal}`}
            onClick={onMapClick}
            aria-label='지도 보기'
          >
            <MapIcon width={24} height={24} stroke={highlighted ? '#fff' : '#9f1836'} />
          </button>
          <button
            type='button'
            className={`${styles.iconButton} ${highlighted ? styles.iconButtonHomeHighlighted : styles.iconButtonHomeNormal}`}
            onClick={onHomeClick}
            aria-label='홈페이지 보기'
          >
            <HomeIcon width={24} height={24} fill={highlighted ? '#fff' : '#9f1836'} />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.infoRow}>
          <span className={styles.label}>주소</span>
          <span className={styles.separator}>:</span>
          <span className={`${styles.value} ${styles.addressValue}`}>{address}</span>
        </div>
        <div className={styles.infoGroup}>
          <div className={styles.infoRow}>
            <span className={styles.label}>전화번호</span>
            <span className={styles.separator}>:</span>
            <span className={`${styles.value} ${styles.phoneValue}`}>{phone}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>팩스번호</span>
            <span className={styles.separator}>:</span>
            <span className={styles.value}>{fax}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
