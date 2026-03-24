'use client'

import React, { useEffect } from 'react'
import { InfoBox } from '@/components/molecules/InfoBox/InfoBox'
import { useHospital } from '@/contexts/HospitalContext'
import styles from './ReplyLetterModal.module.scss'

export interface ReplyLetterData {
  /** 의뢰병원 */
  referralHospital: string
  /** 의뢰의사 */
  referralDoctor: string
  /** 의뢰일자 */
  referralDate: string
  /** 환자명 */
  patientName: string
  /** 성별 */
  gender: string
  /** 생년월일 */
  birthDate: string
  /** 진료과 */
  department: string
  /** 진료의 */
  doctor: string
  /** 진료기간 */
  treatmentPeriod: string
  /** 등록번호 */
  registrationNo: string
  /** 상병명 */
  diagnosis: string
  /** 진료소견 & 경과 요약 */
  opinion: string
  /** 작성일자 */
  writtenDate: string
}

interface ReplyLetterModalProps {
  isOpen: boolean
  onClose: () => void
  data: ReplyLetterData
}

export const ReplyLetterModal: React.FC<ReplyLetterModalProps> = ({ isOpen, onClose, data }) => {
  const { hospital } = useHospital()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.badge}>의뢰환자 조회</span>
            <h2 className={styles.title}>진료회신서</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label='닫기'>
            <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </div>

        {/* InfoBox - greeting message */}
        <InfoBox
          messages={[
            '항상 저희 병원에 많은 관심과 도움을 주셔서 감사드립니다.',
            '의뢰해 주신 환자의 진료결과를 다음과 같이 알려드립니다.'
          ]}
        />

        {/* 환자 및 의뢰정보 */}
        <div className={styles.sectionHeader}>
          <svg viewBox='0 0 24 24' fill='currentColor'>
            <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z' />
          </svg>
          <h3 className={styles.sectionTitle}>환자 및 의뢰정보</h3>
        </div>

        <div className={styles.infoTable}>
          {/* Row 1: 의뢰병원 | 의뢰의사 */}
          <div className={styles.infoRow}>
            <div className={styles.infoCell}>
              <div className={styles.infoLabel}>의뢰병원</div>
              <div className={styles.infoValue}>{data.referralHospital}</div>
            </div>
            <div className={styles.infoCell}>
              <div className={styles.infoLabel}>의뢰의사</div>
              <div className={styles.infoValue}>{data.referralDoctor}</div>
            </div>
          </div>

          {/* Row 2: 의뢰일자 | 환자명 */}
          <div className={styles.infoRow}>
            <div className={styles.infoCell}>
              <div className={styles.infoLabel}>의뢰일자</div>
              <div className={styles.infoValue}>{data.referralDate}</div>
            </div>
            <div className={styles.infoCell}>
              <div className={styles.infoLabel}>환자명</div>
              <div className={styles.infoValue}>{data.patientName}</div>
            </div>
          </div>

          {/* Row 3: 성별 | 생년월일 */}
          <div className={styles.infoRow}>
            <div className={styles.infoCell}>
              <div className={styles.infoLabel}>성별</div>
              <div className={styles.infoValue}>{data.gender}</div>
            </div>
            <div className={styles.infoCell}>
              <div className={styles.infoLabel}>생년월일</div>
              <div className={styles.infoValue}>{data.birthDate}</div>
            </div>
          </div>

          {/* Row 4: 진료과 | 진료의 */}
          <div className={styles.infoRow}>
            <div className={styles.infoCell}>
              <div className={styles.infoLabel}>진료과</div>
              <div className={styles.infoValue}>{data.department}</div>
            </div>
            <div className={styles.infoCell}>
              <div className={styles.infoLabel}>진료의</div>
              <div className={styles.infoValue}>{data.doctor}</div>
            </div>
          </div>

          {/* Row 5: 진료기간 | 등록번호 */}
          <div className={styles.infoRow}>
            <div className={styles.infoCell}>
              <div className={styles.infoLabel}>진료기간</div>
              <div className={styles.infoValue}>{data.treatmentPeriod}</div>
            </div>
            <div className={styles.infoCell}>
              <div className={styles.infoLabel}>등록번호</div>
              <div className={styles.infoValue}>{data.registrationNo}</div>
            </div>
          </div>

          {/* Row 6: 상병명 (full width) */}
          <div className={styles.infoCellFull}>
            <div className={styles.infoLabel}>상병명</div>
            <div className={styles.infoValue}>{data.diagnosis}</div>
          </div>
        </div>

        {/* 진료소견 & 경과 요약 */}
        <div className={styles.opinionSection}>
          <div className={styles.opinionHeader}>
            <h3 className={styles.opinionTitle}>진료소견 &amp; 경과 요약</h3>
          </div>
          <div className={styles.opinionBody}>{data.opinion}</div>
        </div>

        {/* 작성일자 */}
        <div className={styles.dateRow}>
          <div className={styles.dateLabel}>작성일자</div>
          <div className={styles.dateValue}>{data.writtenDate}</div>
        </div>

        {/* Hospital logo */}
        <div className={styles.footerLogo}>
          <img src={hospital.logo.footer} alt={hospital.name.full} />
        </div>
      </div>
    </div>
  )
}
