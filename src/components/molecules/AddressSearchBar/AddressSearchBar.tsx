'use client'

import React from 'react'
import { SearchIcon } from '@/components/icons/SearchIcon'
import styles from './AddressSearchBar.module.scss'

export interface AddressSearchBarProps {
  /** 지번 주소 */
  jibun: string
  /** 도로명 주소 */
  road: string
  /** 검색 버튼 클릭 핸들러 */
  onSearchClick?: () => void
  /** 추가 클래스명 */
  className?: string
}

export const AddressSearchBar: React.FC<AddressSearchBarProps> = ({ jibun, road, onSearchClick, className = '' }) => {
  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick()
    } else {
      window.open(`https://map.kakao.com/?q=${encodeURIComponent(road)}`, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className={`${styles.addressInfoWrapper} ${className}`}>
      <div className={styles.addressInfo}>
        <span className={styles.addressLabel}>주소</span>
        <div className={styles.addressTabGroup}>
          <div className={styles.addressTab}>
            <span className={styles.addressTabLabel}>지번</span>
            <span className={styles.addressTabText}>{jibun}</span>
          </div>
          <div className={styles.addressTab}>
            <span className={styles.addressTabLabel}>도로명</span>
            <span className={styles.addressTabText}>{road}</span>
          </div>
        </div>
      </div>
      <button type='button' className={styles.searchButton} onClick={handleSearchClick} aria-label='길찾기 검색'>
        <span className={styles.searchButtonText}>길 찾기</span>
        <div className={styles.searchButtonIcon}>
          <SearchIcon width={24} height={24} fill='#ffffff' />
        </div>
      </button>
    </div>
  )
}
