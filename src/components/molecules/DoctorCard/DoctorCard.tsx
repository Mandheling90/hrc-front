'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/atoms/Button/Button'
import { ScheduleTable, ScheduleSlot } from '@/components/molecules/ScheduleTable/ScheduleTable'
import { DoctorIcon } from '@/components/icons/DoctorIcon'
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
                width={120}
                height={120}
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
          <div className={styles.header}>
            <h3 className={styles.name}>
              {name} {department}
            </h3>
          </div>

          <div className={styles.specialties}>
            <span className={styles.specialtiesLabel}>전문분야</span>
            <span className={styles.specialtiesText}>{specialties.join(', ')}</span>
          </div>

          <div className={styles.scheduleSection}>
            <ScheduleTable schedule={schedule} />
          </div>

          <div className={styles.actions}>
            {hasEConsulting && (
              <Button
                variant='primary'
                size='small'
                className={styles.eConsultButton}
                onClick={onEConsultingClick}
              >
                e-Consulting 신청
              </Button>
            )}
            <Button
              variant='outline'
              size='small'
              className={styles.doctorInfoButton}
              onClick={onDoctorInfoClick}
            >
              <DoctorIcon width={16} height={16} stroke='#000' />
              <span>의료진 소개</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
