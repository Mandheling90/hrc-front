'use client'

import React from 'react'
import Image from 'next/image'
import { ScheduleTable, ScheduleSlot } from '@/components/molecules/ScheduleTable/ScheduleTable'
import { DoctorIcon } from '@/components/icons/DoctorIcon'
import { EConsultingIcon } from '@/components/icons/EConsultingIcon'
import { DoctorInfoIcon } from '@/components/icons/DoctorInfoIcon'
import styles from './DoctorCard.module.scss'

export interface DoctorCardProps {
  name: string
  department: string
  imageUrl?: string
  specialties: string[]
  schedule: ScheduleSlot[]
  hasEConsulting?: boolean
  onEConsultingClick?: () => void
  onDoctorInfoClick?: () => void
  className?: string
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  department,
  imageUrl,
  specialties,
  schedule,
  hasEConsulting = false,
  onEConsultingClick,
  onDoctorInfoClick,
  className = ''
}) => {
  return (
    <div className={`${styles.doctorCard} ${className}`}>
      <div className={styles.cardContent}>
        <div className={styles.imageSection}>
          {imageUrl ? (
            <div className={styles.imageWrapper}>
              <Image
                src={imageUrl}
                alt={`${name} ${department}`}
                width={200}
                height={200}
                className={styles.image}
                unoptimized
              />
            </div>
          ) : (
            <div className={styles.placeholderImage}>
              <DoctorIcon width={60} height={60} stroke='#9f1836' />
            </div>
          )}
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoContent}>
            <div className={styles.header}>
              <h3 className={styles.name}>{name}</h3>
              <span className={styles.department}>{department}</span>
            </div>

            <div className={styles.specialties}>
              <span className={styles.specialtiesLabel}>전문분야</span>
              <span className={styles.specialtiesText}>{specialties.join(', ')}</span>
            </div>

            <div className={styles.scheduleSection}>
              <ScheduleTable schedule={schedule} />
            </div>
          </div>

          <div className={styles.actions}>
            {hasEConsulting && (
              <button type='button' className={styles.eConsultButton} onClick={onEConsultingClick}>
                <EConsultingIcon width={48} height={48} fill='white' />
                <span>e-Consulting 신청</span>
              </button>
            )}
            <button type='button' className={styles.doctorInfoButton} onClick={onDoctorInfoClick}>
              <DoctorInfoIcon width={48} height={48} stroke='var(--gray-9)' />
              <span>의료진 소개</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
