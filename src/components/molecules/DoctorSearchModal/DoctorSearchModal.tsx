'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { DoctorInfoIcon } from '@/components/icons/DoctorInfoIcon'
import { useMedicalStaff, MedicalStaffItem } from '@/hooks/useMedicalStaff'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import styles from './DoctorSearchModal.module.scss'

export interface Doctor {
  /** 자문의 고유 ID (UUID) */
  id?: string
  /** 진료과 */
  department: string
  /** 진료과 코드 */
  departmentCode?: string
  /** 자문의 이름 */
  name: string
  /** 이메일 */
  email: string
  /** 선택 여부 */
  selected: boolean
  /** 의사 ID */
  doctorId?: string
  /** 프로필 사진 URL */
  photoUrl?: string
  /** 전문분야 / 약력 */
  bio?: string
}

export interface DoctorSearchModalProps {
  /** 팝업 표시 여부 */
  isOpen: boolean
  /** 닫기 핸들러 */
  onClose: () => void
  /** 확인 핸들러 */
  onConfirm: (selectedDoctors: Doctor[]) => void
  /** 배경 클릭 시 닫기 여부 (기본값: false) */
  closeOnBackdropClick?: boolean
  /** 추가 클래스명 */
  className?: string
  /** 외부에서 주입하는 자문의 목록 (제공 시 내부 API 호출 생략, 진료과 단계 생략) */
  externalDoctors?: Doctor[]
  /** 외부 데이터 로딩 상태 */
  externalLoading?: boolean
}

function staffToDoctor(item: MedicalStaffItem): Doctor {
  return {
    doctorId: item.doctorId,
    department: item.departmentName || '',
    name: item.doctorName || '',
    email: '',
    photoUrl: item.photoUrl || undefined,
    bio: item.bio || undefined,
    selected: false
  }
}

type ModalStep = 'department' | 'doctor'

export const DoctorSearchModal: React.FC<DoctorSearchModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  closeOnBackdropClick = false,
  className = '',
  externalDoctors,
  externalLoading
}) => {
  const useExternal = !!externalDoctors
  const { fetchMedicalStaff, staffList, loading: staffLoading, departmentList, deptLoading } = useMedicalStaff()

  const [step, setStep] = useState<ModalStep>('department')
  const [selectedDepartmentCode, setSelectedDepartmentCode] = useState<string | null>(null)
  const [selectedDepartmentName, setSelectedDepartmentName] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null)

  const isLoading = deptLoading

  // 진료과 목록: useMedicalStaff의 departmentList 사용
  const departments = useMemo(() => {
    return departmentList
      .filter(d => d.departmentName)
      .sort((a, b) => a.departmentName.localeCompare(b.departmentName, 'ko'))
  }, [departmentList])

  // API 응답을 Doctor 형태로 변환 + 검색어 필터링
  const doctors: Doctor[] = useMemo(() => {
    if (useExternal) {
      let filtered = externalDoctors
      if (searchQuery.trim()) {
        filtered = filtered.filter(d => d.name?.includes(searchQuery.trim()))
      }
      return filtered.map(d => ({
        ...d,
        selected: d.doctorId === selectedDoctorId
      }))
    }

    let filtered = staffList
    if (searchQuery.trim()) {
      filtered = filtered.filter(s => s.doctorName?.includes(searchQuery.trim()))
    }
    return filtered.map(item => ({
      ...staffToDoctor(item),
      selected: item.doctorId === selectedDoctorId
    }))
  }, [staffList, searchQuery, selectedDoctorId, useExternal, externalDoctors])

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

  // 모달이 열릴 때 항상 진료과 선택 단계로 / 닫힐 때 초기화
  useEffect(() => {
    if (isOpen) {
      setStep('department')
    } else {
      setStep('department')
      setSelectedDepartmentCode(null)
      setSelectedDepartmentName(null)
      setSearchQuery('')
      setSelectedDoctorId(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleDepartmentClick = (deptCode: string | null, deptName: string | null) => {
    setSelectedDepartmentCode(deptCode)
    setSelectedDepartmentName(deptName)
    // 선택한 진료과 코드로 의료진 조회
    fetchMedicalStaff({ ...(deptCode ? { mcdpCd: deptCode } : {}), spdrQlfcYn: 'Y' })
    setStep('doctor')
  }

  const handleBackToDepartment = () => {
    setStep('department')
    setSelectedDepartmentCode(null)
    setSelectedDepartmentName(null)
    setSearchQuery('')
    setSelectedDoctorId(null)
  }

  const handleSearch = () => {
    // searchQuery 변경 시 useMemo에서 자동 필터링됨
  }

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctorId(doctor.doctorId || null)
    const selectedDoctors = [{ ...doctor, selected: true }]
    onConfirm(selectedDoctors)
    onClose()
  }

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={`${styles.modal} ${className}`}>
        {/* 헤더 */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.eConsultingBadge}>
              <span>e-Consulting</span>
            </div>
            <h2 className={styles.title}>
              {step === 'doctor' && selectedDepartmentName ? (
                <>
                  {'자문의 검색 > '}
                  <span className={styles.titleDepartment}>{selectedDepartmentName}</span>
                </>
              ) : (
                '자문의 검색'
              )}
            </h2>
          </div>
          <button type='button' onClick={onClose} className={styles.closeButton} aria-label='닫기'>
            <CloseIcon width={40} height={40} />
          </button>
        </div>

        {step === 'department' ? (
          /* 1뎁스: 진료과 선택 */
          <div className={styles.departmentSection}>
            <div className={styles.departmentChips}>
              {isLoading ? (
                Array.from({ length: 12 }, (_, i) => (
                  <Skeleton key={i} width={182} height={62} variant='rounded' />
                ))
              ) : (
                <>
                  <button
                    key='__all__'
                    type='button'
                    onClick={() => handleDepartmentClick(null, null)}
                    className={`${styles.departmentChip} ${selectedDepartmentCode === null ? styles.active : ''}`}
                  >
                    전체
                  </button>
                  {departments.map(dept => (
                    <button
                      key={dept.departmentCode}
                      type='button'
                      onClick={() => handleDepartmentClick(dept.departmentCode, dept.departmentName)}
                      className={`${styles.departmentChip} ${selectedDepartmentCode === dept.departmentCode ? styles.active : ''}`}
                    >
                      {dept.departmentName}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        ) : (
          /* 2뎁스: 의사 검색/선택 */
          <>
            <div className={styles.doctorSection}>
              <div className={styles.searchWrapper}>
                <Input
                  id='doctor-search'
                  type='text'
                  placeholder='의료진명을 입력해주세요.'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSearch()
                  }}
                  className={styles.searchInput}
                />
                <button type='button' onClick={handleSearch} className={styles.searchButton}>
                  <span>의료진 검색</span>
                </button>
              </div>

              <div className={styles.cardGrid}>
                {staffLoading ? (
                  Array.from({ length: 4 }, (_, i) => (
                    <Skeleton key={i} width='100%' height={280} variant='rounded' />
                  ))
                ) : (
                  doctors.map((doctor, index) => (
                    <div
                      key={`${doctor.doctorId || doctor.name}-${index}`}
                      className={`${styles.doctorCard} ${doctor.selected ? styles.doctorCardSelected : ''}`}
                    >
                      <div className={styles.doctorCardBody}>
                        <div className={styles.doctorPhoto}>
                          {doctor.photoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={doctor.photoUrl}
                              alt={`${doctor.name} 프로필`}
                              onError={e => {
                                const target = e.currentTarget
                                target.onerror = null
                                target.src = '/images/referral/department/hospital_signature_kr 4.svg'
                                target.style.objectFit = 'contain'
                                target.style.opacity = '0.5'
                                target.style.padding = '10%'
                              }}
                            />
                          ) : (
                            <div className={styles.doctorPhotoPlaceholder}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src='/images/referral/department/hospital_signature_kr 4.svg'
                                alt='병원 로고'
                              />
                            </div>
                          )}
                        </div>
                        <div className={styles.doctorInfo}>
                          <div className={styles.doctorNameRow}>
                            <span className={styles.doctorName}>{doctor.name}</span>
                            <span className={styles.doctorDepartment}>{doctor.department}</span>
                          </div>
                          {doctor.email && (
                            <p className={styles.doctorEmail}>{doctor.email}</p>
                          )}
                          {doctor.bio && (
                            <div className={styles.doctorBio}>
                              <span className={styles.doctorBioLabel}>전문분야</span>
                              <span className={styles.doctorBioText}>{doctor.bio}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={styles.doctorCardActions}>
                        <button
                          type='button'
                          className={styles.selectDoctorButton}
                          onClick={() => handleDoctorSelect(doctor)}
                        >
                          <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M4 10L8.5 14.5L16 5.5' stroke='#ffffff' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
                          </svg>
                          <span>자문의 선택</span>
                        </button>
                        <button
                          type='button'
                          className={styles.doctorInfoButton}
                        >
                          <DoctorInfoIcon width={20} height={20} stroke='#8c8c8c' strokeWidth={2} />
                          <span>의료진 소개</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className={styles.buttonRow}>
              <Button
                type='button'
                variant='primaryOutline'
                onClick={handleBackToDepartment}
                className={styles.actionButton}
              >
                진료과 변경
              </Button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
