'use client'

import React, { useState } from 'react'
import { CollapseUpIcon } from '@/components/icons/CollapseUpIcon'
import { CollapseDownIcon } from '@/components/icons/CollapseDownIcon'
import styles from '../../page.module.scss'

export interface PatientInfo {
  name: string
  gender: string
  age: number
  firstReferralDate: string
}

export interface PatientInfoCardProps {
  patientInfo: PatientInfo
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ patientInfo }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`${styles.patientInfoCard} ${isOpen ? styles.open : ''}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleRow}>
          <h2 className={styles.cardTitle}>환자진료정보</h2>
          <button
            type='button'
            className={styles.toggleButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? '접기' : '펼치기'}
          >
            {isOpen ? <CollapseUpIcon /> : <CollapseDownIcon />}
          </button>
        </div>
        <div className={styles.cardDivider} />
      </div>
      <div className={styles.patientInfoGrid}>
        <div className={styles.infoRow}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>환자명</span>
            <div className={styles.infoDivider} />
            <span className={styles.infoValue}>{patientInfo.name}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>성별</span>
            <div className={styles.infoDivider} />
            <span className={styles.infoValue}>{patientInfo.gender}</span>
          </div>
        </div>
        <div className={styles.infoRow}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>나이</span>
            <div className={styles.infoDivider} />
            <span className={styles.infoValue}>{patientInfo.age}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>최초 의뢰일자</span>
            <div className={styles.infoDivider} />
            <span className={styles.infoValue}>{patientInfo.firstReferralDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
