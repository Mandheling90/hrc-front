import React, { ReactNode } from 'react'
import { InfoIcon } from '@/components/icons/InfoIcon'
import styles from './InfoNote.module.scss'

export interface InfoNoteProps {
  message: ReactNode
  /** 아이콘 크기 (기본값: 20) */
  iconSize?: number
  /** 아이콘 수직 정렬: 'center' (중앙) | 'top' (상단) (기본값: 'center') */
  iconAlign?: 'center' | 'top'
  className?: string
}

export const InfoNote: React.FC<InfoNoteProps> = ({ message, iconSize = 20, iconAlign = 'center', className = '' }) => {
  return (
    <div className={`${styles.infoNote} ${iconAlign === 'top' ? styles.iconAlignTop : ''} ${className}`}>
      <InfoIcon width={iconSize} height={iconSize} fill='var(--gray-11)' />
      <span>{message}</span>
    </div>
  )
}
