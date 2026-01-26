'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/atoms/Button/Button'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { CloseIcon } from '@/components/icons/CloseIcon'
import styles from './DoctorSearchModal.module.scss'
import { FormField } from '../FormField/FormField'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { Table, TableColumn } from '../Table/Table'
import { CardList, CardRow } from '../CardList/CardList'

export interface Doctor {
  /** 진료과 */
  department: string
  /** 자문의 이름 */
  name: string
  /** 이메일 */
  email: string
  /** 선택 여부 */
  selected: boolean
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

const categories = [
  '전체',
  '가정의학과',
  '감염내과',
  '비뇨의학과',
  '신장내과',
  '산부인과',
  '심장혈관흉부외과',
  '성형외과',
  '내분비내과',
  '소화기내과',
  '구강악안면외과',
  '순환기내과'
]

// 임시 데이터
const mockDoctors: Doctor[] = [
  { department: '내과', name: '김민우', email: 'abc**@korea.com', selected: true },
  { department: '외과', name: '홍설아', email: 'abc**@korea.com', selected: false },
  { department: '신경외과', name: '강현민', email: 'abc**@korea.com', selected: false },
  { department: '신장내과', name: '김동완', email: 'abc**@korea.com', selected: false },
  { department: '소화기내과', name: '백진혁', email: 'abc**@korea.com', selected: false },
  { department: '산부인과', name: '양호중', email: 'abc**@korea.com', selected: false },
  { department: '감염내과', name: '김선용', email: 'abc**@korea.com', selected: false },
  { department: '감염내과', name: '김선용', email: 'Gastrofiberscopy [G]', selected: false }
]

export const DoctorSearchModal: React.FC<DoctorSearchModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  closeOnBackdropClick = false,
  className = ''
}) => {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [searchQuery, setSearchQuery] = useState('')
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors)
  const [isTablet, setIsTablet] = useState(false)

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

  // 모달이 닫힐 때 검색어 초기화
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
      setSelectedCategory('전체')
    }
  }, [isOpen])

  // 태블릿 여부 확인
  useEffect(() => {
    const checkIsTablet = () => {
      setIsTablet(window.innerWidth <= 1429)
    }

    checkIsTablet()
    window.addEventListener('resize', checkIsTablet)

    return () => {
      window.removeEventListener('resize', checkIsTablet)
    }
  }, [])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSearch = () => {
    // TODO: 검색 기능 구현
    console.log('검색:', searchQuery)
  }

  const handleDoctorToggle = (doctor: Doctor) => {
    setDoctors(prev =>
      prev.map(d =>
        d.name === doctor.name && d.department === doctor.department ? { ...d, selected: !d.selected } : d
      )
    )
  }

  const handleConfirm = () => {
    const selectedDoctors = doctors.filter(doctor => doctor.selected)
    onConfirm(selectedDoctors)
    onClose()
  }

  const filteredDoctors =
    selectedCategory === '전체' ? doctors : doctors.filter(doctor => doctor.department === selectedCategory)

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
        <Checkbox
          checked={doctor.selected}
          onChange={() => handleDoctorToggle(doctor)}
          aria-label={`${doctor.name} 선택`}
        />
      )
    }
  ]

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={`${styles.modal} ${className}`}>
        {/* 헤더 */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>자문의 검색</h2>
            <div className={styles.eConsultingBadge}>
              <span>e-Consulting</span>
            </div>
          </div>
          <button type='button' onClick={onClose} className={styles.closeButton} aria-label='닫기'>
            <CloseIcon width={40} height={40} />
          </button>
        </div>

        {/* 카테고리 및 검색 영역 */}
        <div className={styles.categorySection}>
          <div className={styles.categoryChips}>
            {categories.map(category => (
              <button
                key={category}
                type='button'
                onClick={() => handleCategoryClick(category)}
                className={`${styles.categoryChip} ${selectedCategory === category ? styles.active : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={styles.searchContainer}>
            {/* 검색 영역 */}
            <div className={styles.searchWrapper}>
              <FormField
                id='doctor-search'
                name='doctor-search'
                type='text'
                placeholder='의료진명을 입력해주세요'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSearch()
                }}
                buttonText='의료진 검색'
                onButtonClick={handleSearch}
                buttonIcon={<SearchIcon width={22} height={22} fill='#fff' />}
                error=''
                mobileStack
              />
            </div>

            {/* 리스트 영역 */}
            <div className={styles.listContainer}>
              {isTablet ? (
                /* 태블릿: 카드형 리스트 */
                <CardList
                  cards={filteredDoctors.map(doctor => [
                    {
                      id: 'selected',
                      leftContent: <span>선택</span>,
                      rightContent: (
                        <Checkbox
                          checked={doctor.selected}
                          onChange={() => handleDoctorToggle(doctor)}
                          aria-label={`${doctor.name} 선택`}
                        />
                      ),
                      highlighted: true
                    },
                    {
                      id: 'department',
                      leftContent: <span>진료과</span>,
                      rightContent: <span>{doctor.department}</span>
                    },
                    {
                      id: 'name',
                      leftContent: <span>자문의</span>,
                      rightContent: <span>{doctor.name}</span>
                    },
                    {
                      id: 'email',
                      leftContent: <span>이메일</span>,
                      rightContent: <span>{doctor.email}</span>
                    }
                  ])}
                  getCardKey={(card, index) => `${filteredDoctors[index].name}-${index}`}
                  scrollableHeight='100%'
                  className={styles.cardList}
                />
              ) : (
                /* 데스크톱: 테이블 */
                <Table
                  columns={columns}
                  data={filteredDoctors}
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

        {/* 확인 버튼 */}
        <div className={styles.buttonSection}>
          <Button type='button' variant='primary' onClick={handleConfirm} className={styles.confirmButton}>
            신청하기
          </Button>
        </div>
      </div>
    </div>
  )
}
