'use client'

import React from 'react'
import styles from './MapPlaceholder.module.scss'

export interface MapPlaceholderProps {
  /** 지도 플레이스홀더 메시지 */
  message?: string
  /** 추가 안내 메시지 */
  note?: string
  /** 추가 클래스명 */
  className?: string
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  message = '지도 영역',
  note = '지도 API 연동 필요',
  className = ''
}) => {
  return (
    <div className={`${styles.mapContainer} ${className}`}>
      <div className={styles.mapPlaceholder}>
        <p>{message}</p>
        {note && <p className={styles.mapNote}>{note}</p>}
      </div>
    </div>
  )
}
