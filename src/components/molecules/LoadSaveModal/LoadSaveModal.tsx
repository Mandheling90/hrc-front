'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { InputLabel } from '@/components/atoms/InputLabel/InputLabel'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { CloseIcon } from '@/components/icons/CloseIcon'
import styles from './LoadSaveModal.module.scss'

export interface LoadSaveModalProps {
  /** 팝업 표시 여부 */
  isOpen: boolean
  /** 닫기 핸들러 */
  onClose: () => void
  /** 불러오기 핸들러 */
  onLoad?: (doctorLicense: string, medicalInstitutionNumber: string) => void
  /** 배경 클릭 시 닫기 여부 (기본값: false) */
  closeOnBackdropClick?: boolean
}

export const LoadSaveModal: React.FC<LoadSaveModalProps> = ({
  isOpen,
  onClose,
  onLoad,
  closeOnBackdropClick = false
}) => {
  const [doctorLicense, setDoctorLicense] = useState<string>('')
  const [medicalInstitutionNumber, setMedicalInstitutionNumber] = useState<string>('')

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

  // 모달이 닫힐 때 입력값 초기화
  useEffect(() => {
    if (!isOpen) {
      setDoctorLicense('')
      setMedicalInstitutionNumber('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleDoctorLicenseSearch = () => {
    // TODO: 의사 면허번호 검색 기능 구현
    console.log('의사 면허번호 검색:', doctorLicense)
  }

  const handleMedicalInstitutionSearch = () => {
    // TODO: 요양 기관번호 검색 기능 구현
    console.log('요양 기관번호 검색:', medicalInstitutionNumber)
  }

  const handleLoad = () => {
    if (onLoad) {
      onLoad(doctorLicense, medicalInstitutionNumber)
    }
    onClose()
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h2 className={styles.title}>임시 저장 불러오기</h2>
          <button type='button' className={styles.closeButton} onClick={onClose} aria-label='닫기'>
            <CloseIcon width={24} height={24} stroke='#000' strokeWidth={1.5} />
          </button>
        </div>

        {/* 본문 */}
        <div className={styles.content}>
          <div className={styles.formFields}>
            {/* 의사 면허번호 */}
            <div className={styles.formField}>
              <InputLabel htmlFor='doctorLicense' required>
                의사 면허번호
              </InputLabel>
              <div className={styles.inputWithButton}>
                <Input
                  type='text'
                  id='doctorLicense'
                  name='doctorLicense'
                  placeholder=''
                  value={doctorLicense}
                  onChange={e => setDoctorLicense(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            {/* 요양 기관번호 */}
            <div className={styles.formField}>
              <InputLabel htmlFor='medicalInstitutionNumber' required>
                요양 기관번호
              </InputLabel>
              <div className={styles.inputWithButton}>
                <Input
                  type='text'
                  id='medicalInstitutionNumber'
                  name='medicalInstitutionNumber'
                  placeholder=''
                  value={medicalInstitutionNumber}
                  onChange={e => setMedicalInstitutionNumber(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* 불러오기 버튼 */}
          <Button variant='primary' size='large' onClick={handleLoad} className={styles.loadButton}>
            불러오기
          </Button>
        </div>
      </div>
    </div>
  )
}
