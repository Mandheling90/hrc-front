'use client'

import React from 'react'
import styles from './SystemIntroBox.module.scss'

export interface SystemIntroBoxProps {
  icon?: React.ReactNode
  description: string
  className?: string
}

export const SystemIntroBox: React.FC<SystemIntroBoxProps> = ({ icon, description, className = '' }) => {
  return (
    <div className={`${styles.introBox} ${className}`}>
      {icon && <div className={styles.iconWrapper}>{icon}</div>}
      <p className={styles.description}>{description}</p>
    </div>
  )
}
