'use client'

import React from 'react'
import { NaverLogo } from '@/components/icons/NaverLogo'
import { DaumLogo } from '@/components/icons/DaumLogo'
import { GoogleLogo } from '@/components/icons/GoogleLogo'
import styles from './MapServiceLinks.module.scss'

export interface MapServiceLinksProps {
  /** 네이버 지도 링크 */
  naver?: string
  /** 다음 지도 링크 */
  daum?: string
  /** 구글 지도 링크 */
  google?: string
  /** 추가 클래스명 */
  className?: string
}

export const MapServiceLinks: React.FC<MapServiceLinksProps> = ({ naver, daum, google, className = '' }) => {
  return (
    <div className={`${styles.mapLinks} ${className}`}>
      {naver && (
        <a href={naver} target='_blank' rel='noopener noreferrer' className={styles.mapLink}>
          <div className={styles.mapLinkLogo}>
            <NaverLogo width={80} height={24} className={styles.mapLinkLogoImage} />
          </div>
          <span className={styles.mapLinkText}>네이버 지도</span>
        </a>
      )}
      {daum && (
        <a href={daum} target='_blank' rel='noopener noreferrer' className={styles.mapLink}>
          <div className={styles.mapLinkLogo}>
            <DaumLogo width={80} height={24} className={styles.mapLinkLogoImage} />
          </div>
          <span className={styles.mapLinkText}>다음 지도</span>
        </a>
      )}
      {google && (
        <a href={google} target='_blank' rel='noopener noreferrer' className={styles.mapLink}>
          <div className={styles.mapLinkLogo}>
            <GoogleLogo width={80} height={24} className={styles.mapLinkLogoImage} />
          </div>
          <span className={styles.mapLinkText}>구글지도</span>
        </a>
      )}
    </div>
  )
}
