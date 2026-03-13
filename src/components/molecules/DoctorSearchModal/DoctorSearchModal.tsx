'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { InfoIcon } from '@/components/icons/InfoIcon'
import { useMedicalStaff, MedicalStaffItem } from '@/hooks/useMedicalStaff'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import styles from './DoctorSearchModal.module.scss'
import { Table, TableColumn } from '../Table/Table'
import { CardList } from '../CardList/CardList'

export interface Doctor {
  /** 진료과 */
  department: string
  /** 자문의 이름 */
  name: string
  /** 이메일 */
  email: string
  /** 선택 여부 */
  selected: boolean
  /** 의사 ID */
  doctorId?: string
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
}

function staffToDoctor(item: MedicalStaffItem): Doctor {
  return {
    doctorId: item.doctorId,
    department: item.departmentName || '',
    name: item.doctorName || '',
    email: '',
    selected: false
  }
}

type ModalStep = 'department' | 'doctor'

export const DoctorSearchModal: React.FC<DoctorSearchModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  closeOnBackdropClick = false,
  className = ''
}) => {
  const { fetchMedicalStaff, staffList, loading: staffLoading } = useMedicalStaff()

  const [step, setStep] = useState<ModalStep>('department')
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null)
  const [isTablet, setIsTablet] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 1429 : false))
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false))

  // 모달 열릴 때 자문의 목록 조회
  useEffect(() => {
    if (isOpen) {
      fetchMedicalStaff()
    }
  }, [isOpen, fetchMedicalStaff])

  // API 응답에서 진료과 목록 추출
  const departments = useMemo(() => {
    const deptSet = new Set<string>()
    for (const staff of staffList) {
      if (staff.departmentName) {
        deptSet.add(staff.departmentName)
      }
    }
    return Array.from(deptSet).sort((a, b) => a.localeCompare(b, 'ko'))
  }, [staffList])

  // API 응답을 Doctor 형태로 변환 + 선택 상태 반영
  const doctors: Doctor[] = useMemo(() => {
    let filtered = staffList
    if (selectedDepartment) {
      filtered = staffList.filter(s => s.departmentName === selectedDepartment)
    }
    if (searchQuery.trim()) {
      filtered = filtered.filter(s => s.doctorName?.includes(searchQuery.trim()))
    }
    return filtered.map(item => ({
      ...staffToDoctor(item),
      selected: item.doctorId === selectedDoctorId
    }))
  }, [staffList, selectedDepartment, searchQuery, selectedDoctorId])

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

  // 모달이 닫힐 때 초기화
  useEffect(() => {
    if (!isOpen) {
      setStep('department')
      setSelectedDepartment(null)
      setSearchQuery('')
      setSelectedDoctorId(null)
    }
  }, [isOpen])

  // 반응형 체크
  useEffect(() => {
    const checkSize = () => {
      setIsTablet(window.innerWidth <= 1429)
      setIsMobile(window.innerWidth <= 768)
    }

    checkSize()
    window.addEventListener('resize', checkSize)

    return () => {
      window.removeEventListener('resize', checkSize)
    }
  }, [])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleDepartmentClick = (department: string) => {
    setSelectedDepartment(department)
    setStep('doctor')
  }

  const handleBackToDepartment = () => {
    setStep('department')
    setSelectedDepartment(null)
    setSearchQuery('')
    setSelectedDoctorId(null)
  }

  const handleSearch = () => {
    // searchQuery 변경 시 useMemo에서 자동 필터링됨
  }

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctorId(doctor.doctorId || null)
  }

  const handleConfirm = () => {
    const selectedDoctors = doctors.filter(doctor => doctor.selected)
    onConfirm(selectedDoctors)
    onClose()
  }

  // Table 컬럼 정의
  const columns: TableColumn<Doctor>[] = [
    {
      id: 'department',
      label: '진료과',
      width: '280px',
      field: 'department',
      align: 'center'
    },
    {
      id: 'name',
      label: '자문의',
      width: '130px',
      field: 'name',
      align: 'center'
    },
    {
      id: 'email',
      label: '이메일',
      width: '1fr',
      field: 'email',
      align: 'center'
    },
    {
      id: 'selected',
      label: '선택',
      width: '160px',
      align: 'center',
      renderCell: doctor => (
        <input
          type='radio'
          name='doctor-select'
          checked={doctor.selected}
          onChange={() => handleDoctorSelect(doctor)}
          aria-label={`${doctor.name} 선택`}
          className={styles.radio}
        />
      )
    }
  ]

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
              {step === 'doctor' && selectedDepartment ? (
                <>
                  {'자문의 검색 > '}
                  <span className={styles.titleDepartment}>{selectedDepartment}</span>
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
            <div className={styles.infoRow}>
              <InfoIcon width={24} height={24} fill='#636363' />
              <p className={styles.infoText}>신청하실 진료과를 선택해주세요.</p>
            </div>
            <div className={styles.departmentChips}>
              {staffLoading ? (
                <Skeleton width='100%' height={40} variant='rounded' count={6} gap={8} />
              ) : (
                departments.map(dept => (
                  <button
                    key={dept}
                    type='button'
                    onClick={() => handleDepartmentClick(dept)}
                    className={`${styles.departmentChip} ${selectedDepartment === dept ? styles.active : ''}`}
                  >
                    {dept}
                  </button>
                ))
              )}
            </div>
          </div>
        ) : (
          /* 2뎁스: 의사 검색/선택 */
          <>
            <div className={styles.doctorSection}>
              <div className={styles.searchContainer}>
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

                <div className={styles.listContainer}>
                  {staffLoading ? (
                    <Skeleton width='100%' height={48} variant='rounded' count={5} gap={8} />
                  ) : isTablet ? (
                    <CardList
                      cards={doctors.map(doctor => [
                        {
                          id: 'selected',
                          leftContent: <span>선택</span>,
                          rightContent: (
                            <input
                              type='radio'
                              name='doctor-select-card'
                              checked={doctor.selected}
                              onChange={() => handleDoctorSelect(doctor)}
                              aria-label={`${doctor.name} 선택`}
                              className={styles.radio}
                            />
                          ),
                          highlighted: true
                        },
                        {
                          id: 'department',
                          leftContent: <span>진료과</span>,
                          rightContent: <span>{doctor.department}</span>,
                          twoLine: isMobile
                        },
                        {
                          id: 'name',
                          leftContent: <span>자문의</span>,
                          rightContent: <span>{doctor.name}</span>,
                          twoLine: isMobile
                        },
                        {
                          id: 'email',
                          leftContent: <span>이메일</span>,
                          rightContent: <span>{doctor.email}</span>,
                          twoLine: isMobile
                        }
                      ])}
                      getCardKey={(card, index) => `${doctors[index].name}-${index}`}
                      scrollableHeight='100%'
                      className={styles.cardList}
                    />
                  ) : (
                    <Table
                      columns={columns}
                      data={doctors}
                      getRowKey={(doctor, index) => `${doctor.name}-${index}`}
                      className={styles.table}
                      scrollableHeight='100%'
                      defaultTextOverflow='ellipsis'
                      scrollWithHeader
                    />
                  )}
                </div>
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
              <Button
                type='button'
                variant='primaryOutline'
                onClick={handleConfirm}
                className={styles.actionButton}
              >
                자문의 선택
              </Button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
