'use client'

import React from 'react'
import { MapIcon } from '@/components/icons/MapIcon'
import { HomeIcon } from '@/components/icons/HomeIcon'
import styles from './ClinicCard.module.scss'

export interface ClinicCardProps {
  /** 병의원 이름 */
  name: string
  /** 병원/의원 구분 */
  type: 'hospital' | 'clinic'
  /** 주소 */
  address: string
  /** 전화번호 */
  phone: string
  /** 팩스번호 */
  fax: string
  /** 강조 표시 여부 (위치 버튼 클릭 시) */
  highlighted?: boolean
  /** 지도 버튼 클릭 핸들러 */
  onMapClick?: () => void
  /** 홈 버튼 클릭 핸들러 */
  onHomeClick?: () => void
  /** 홈 버튼 표시 여부 (기본값: true) */
  showHomeButton?: boolean
  /** 카드 클릭 핸들러 */
  onClick?: () => void
  /** className */
  className?: string
}

export const ClinicCard: React.FC<ClinicCardProps> = ({
  name,
  type,
  address,
  phone,
  fax,
  highlighted = false,
  onMapClick,
  onHomeClick,
  showHomeButton = true,
  onClick,
  className = ''
}) => {
  return (
    <div
      className={`${styles.card} ${highlighted ? styles.highlighted : ''} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : undefined }}
    >
      <div className={styles.header}>
        <div className={styles.nameGroup}>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.badge}>{type === 'hospital' ? '병원' : '의원'}</span>
        </div>
        <div className={styles.buttonGroup}>
          <button
            type='button'
            className={`${styles.iconButton} ${highlighted ? styles.mapButtonActive : styles.mapButtonNormal}`}
            onClick={e => {
              e.stopPropagation()
              onMapClick?.()
            }}
            aria-label='지도 보기'
          >
            <MapIcon width={24} height={24} fill={highlighted ? '#fff' : '#636363'} className={styles.mapIcon} />
          </button>
          {showHomeButton && (
            <button
              type='button'
              className={`${styles.iconButton} ${highlighted ? styles.homeButtonActive : styles.homeButtonNormal}`}
              onClick={e => {
                e.stopPropagation()
                onHomeClick?.()
              }}
              aria-label='홈페이지 보기'
            >
              <HomeIcon width={24} height={24} fill={highlighted ? '#fff' : '#636363'} className={styles.homeIcon} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.infoRow}>
          <div className={styles.labelGroup}>
            <span className={styles.label}>주소</span>
            <span className={styles.separator}>|</span>
          </div>
          <span className={styles.addressValue}>{address}</span>
        </div>
        <div className={styles.phoneRow}>
          <div className={styles.infoItem}>
            <span className={styles.label}>전화번호</span>
            <span className={styles.separator}>|</span>
            <a href={`tel:${phone}`} className={styles.phoneValue} onClick={e => e.stopPropagation()}>{phone}</a>
          </div>
          {fax && (
            <div className={styles.infoItem}>
              <span className={styles.label}>팩스번호</span>
              <span className={styles.separator}>|</span>
              <span className={styles.faxValue}>{fax}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
