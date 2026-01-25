'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'
import { Checkbox } from '@/components/atoms/Checkbox/Checkbox'
import { CloseIcon } from '@/components/icons/CloseIcon'
import styles from './DoctorSearchModal.module.scss'

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

  const handleDoctorToggle = (index: number) => {
    setDoctors(prev => prev.map((doctor, i) => (i === index ? { ...doctor, selected: !doctor.selected } : doctor)))
  }

  const handleConfirm = () => {
    const selectedDoctors = doctors.filter(doctor => doctor.selected)
    onConfirm(selectedDoctors)
    onClose()
  }

  const filteredDoctors =
    selectedCategory === '전체' ? doctors : doctors.filter(doctor => doctor.department === selectedCategory)

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={`${styles.modal} ${className}`}>
        {/* 헤더 */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>자문의 검색</h2>
            <div className={styles.noticeBadge}>
              <span>공지</span>
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

          {/* 검색 영역 */}
          <div className={styles.searchWrapper}>
            <Input
              id='doctor-search'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder='Input Text'
              className={styles.searchInput}
            />
            <Button type='button' variant='primary' onClick={handleSearch} className={styles.searchButton}>
              의료진 검색
            </Button>
          </div>

          {/* 리스트 영역 */}
          <div className={styles.listContainer}>
            <div className={styles.listContent}>
              {/* 헤더 */}
              <div className={styles.listHeader}>
                <div className={styles.headerCell}>진료과</div>
                <div className={styles.headerSeparator}></div>
                <div className={styles.headerCell}>자문의</div>
                <div className={styles.headerSeparator}></div>
                <div className={styles.headerCell}>이메일</div>
                <div className={styles.headerSeparator}></div>
                <div className={styles.headerCell}>선택</div>
              </div>

              {/* 리스트 아이템 */}
              <div className={styles.listItems}>
                {filteredDoctors.map((doctor, index) => (
                  <div key={index} className={styles.listItem}>
                    <div className={styles.itemCell}>{doctor.department}</div>
                    <div className={styles.itemSeparator}></div>
                    <div className={styles.itemCell}>{doctor.name}</div>
                    <div className={styles.itemSeparator}></div>
                    <div className={styles.itemCell}>{doctor.email}</div>
                    <div className={styles.itemSeparator}></div>
                    <div className={styles.itemCell}>
                      <Checkbox
                        checked={doctor.selected}
                        onChange={() => handleDoctorToggle(index)}
                        aria-label={`${doctor.name} 선택`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.scrollbar}></div>
          </div>
        </div>

        {/* 확인 버튼 */}
        <div className={styles.buttonSection}>
          <Button type='button' variant='primary' onClick={handleConfirm} className={styles.confirmButton}>
            확인
          </Button>
        </div>
      </div>
    </div>
  )
}
