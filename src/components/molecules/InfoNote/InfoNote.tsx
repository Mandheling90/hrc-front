import React, { ReactNode } from 'react'
import { InfoIcon } from '@/components/icons/InfoIcon'
import styles from './InfoNote.module.scss'

export interface InfoNoteProps {
  message: ReactNode
  className?: string
}

export const InfoNote: React.FC<InfoNoteProps> = ({ message, className = '' }) => {
  return (
    <div className={`${styles.infoNote} ${className}`}>
      <InfoIcon width={20} height={20} fill='var(--gray-11)' />
      <span>{message}</span>
    </div>
  )
}
