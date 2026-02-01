'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { ServiceTitleIcon } from '@/components/icons/ServiceTitleIcon'
import styles from './MedicalReplyModal.module.scss'

export interface MedicalReplyData {
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
  registrationNumber: string
  /** 상병명 */
  diagnosis: string
  /** 진료소견 & 경과 요약 */
  medicalOpinion: string
  /** 작성일자 */
  createdDate: string
}

export interface MedicalReplyModalProps {
  /** 팝업 표시 여부 */
  isOpen: boolean
  /** 닫기 핸들러 */
  onClose: () => void
  /** 회신서 데이터 */
  data: MedicalReplyData
  /** 추가 클래스명 */
  className?: string
}

// 정보 행 컴포넌트
interface InfoRowProps {
  label: string
  value: string
  fullWidth?: boolean
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, fullWidth }) => (
  <div className={`${styles.infoRow} ${fullWidth ? styles.fullWidth : ''}`}>
    <span className={styles.infoLabel}>{label}</span>
    <div className={styles.infoDivider} />
    <span className={styles.infoValue}>{value}</span>
  </div>
)

export const MedicalReplyModal: React.FC<MedicalReplyModalProps> = ({ isOpen, onClose, data, className = '' }) => {
  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={`${styles.modal} ${className}`}>
        {/* 헤더 */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.badge}>의뢰환자 조회</span>
            <h2 className={styles.title}>진료회신서</h2>
          </div>
          <button type='button' className={styles.closeBtn} onClick={onClose} aria-label='닫기'>
            <CloseIcon width={24} height={24} />
          </button>
        </div>

        {/* 본문 */}
        <div className={styles.body}>
          {/* 안내 문구 */}
          <div className={styles.noticeBox}>
            <p>항상 저희 병원에 많은 관심과 도움을 주셔서 감사드립니다.</p>
            <p>의뢰해 주신 환자의 진료결과를 다음과 같이 알려드립니다.</p>
          </div>

          {/* 환자 및 의뢰정보 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <ServiceTitleIcon className={styles.sectionIcon} />
              <h3 className={styles.sectionTitle}>환자 및 의뢰정보</h3>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoGridRow}>
                <InfoRow label='의뢰병원' value={data.referralHospital} />
                <InfoRow label='의뢰의사' value={data.referralDoctor} />
              </div>
              <div className={styles.infoGridRow}>
                <InfoRow label='의뢰일자' value={data.referralDate} />
                <InfoRow label='환자명' value={data.patientName} />
              </div>
              <div className={styles.infoGridRow}>
                <InfoRow label='성별' value={data.gender} />
                <InfoRow label='생년월일' value={data.birthDate} />
              </div>
              <div className={styles.infoGridRow}>
                <InfoRow label='진료과' value={data.department} />
                <InfoRow label='진료의' value={data.doctor} />
              </div>
              <div className={styles.infoGridRow}>
                <InfoRow label='진료기간' value={data.treatmentPeriod} />
                <InfoRow label='등록번호' value={data.registrationNumber} />
              </div>
              <div className={styles.infoGridRow}>
                <InfoRow label='상병명' value={data.diagnosis} fullWidth />
              </div>
            </div>
          </div>

          {/* 진료소견 & 경과 요약 */}
          <div className={styles.opinionSection}>
            <div className={styles.opinionHeader}>
              <h3 className={styles.opinionTitle}>진료소견 &amp; 경과 요약</h3>
            </div>
            <div className={styles.opinionContent}>
              <p className={styles.opinionText}>{data.medicalOpinion}</p>
            </div>
          </div>

          {/* 작성일자 */}
          <div className={styles.dateRow}>
            <span className={styles.dateLabel}>작성일자</span>
            <div className={styles.dateDivider} />
            <span className={styles.dateValue}>{data.createdDate}</span>
          </div>
        </div>

        {/* 병원 서명 */}
        <div className={styles.signature}>
          <div className={styles.signatureLogo}>
            <Image src='/assets/images/logo-top.png' alt='고려대학교 안암병원' width={300} height={48} />
          </div>
        </div>
      </div>
    </div>
  )
}
