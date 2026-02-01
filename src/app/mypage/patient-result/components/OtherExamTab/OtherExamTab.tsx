'use client'

import React, { useState } from 'react'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { PathologyResultModal } from '@/components/organisms/PathologyResultModal'
import { ImageViewerModal } from '@/components/organisms/ImageViewerModal'
import styles from '../../page.module.scss'

// 기타검사 데이터 타입
export interface OtherExamItem {
  id: number
  department: string
  doctor: string
  examName: string
  imageStatus: 'request' | 'received' | 'viewable' // 신청 | 접수 | 보기
}

// Mock 기타검사 데이터
const mockOtherExamData: OtherExamItem[] = [
  {
    id: 1,
    department: '감염내과',
    doctor: '김선용',
    examName: 'ECG (심전도)',
    imageStatus: 'request'
  },
  {
    id: 2,
    department: '심장내과',
    doctor: '박인구',
    examName: 'Echocardiography (심초음파)',
    imageStatus: 'request'
  },
  {
    id: 3,
    department: '신경과',
    doctor: '황순철',
    examName: 'EEG (뇌파검사)',
    imageStatus: 'received'
  },
  {
    id: 4,
    department: '호흡기내과',
    doctor: '홍상우',
    examName: 'PFT (폐기능검사)',
    imageStatus: 'viewable'
  },
  {
    id: 5,
    department: '신경과',
    doctor: '이정민',
    examName: 'EMG (근전도검사)',
    imageStatus: 'viewable'
  }
]

// Mock 기타검사 판독결과 데이터
const mockOtherExamResults: Record<number, string> = {
  1: '[impression] Normal sinus rhythm.\nNo significant ST-T changes.',
  2: '[impression] Normal LV systolic function (EF 60%).\nNo regional wall motion abnormality.',
  3: '[impression] Normal background activity.\nNo epileptiform discharge.',
  4: '[impression] Mild restrictive pattern.\nFVC 75%, FEV1 78%, FEV1/FVC 85%.',
  5: '[impression] Normal nerve conduction study.\nNo evidence of peripheral neuropathy.'
}

// Mock 기타검사 이미지 데이터
const mockOtherExamImages: Record<number, string[]> = {
  4: Array.from({ length: 10 }, () => '/images/Gastrofiberscopy_sample.png'),
  5: Array.from({ length: 18 }, () => '/images/Gastrofiberscopy_sample.png')
}

// 이미지 상태별 버튼 렌더링
const renderImageButton = (
  item: OtherExamItem,
  onRequestClick: (item: OtherExamItem) => void,
  onViewImageClick: (item: OtherExamItem) => void
) => {
  switch (item.imageStatus) {
    case 'viewable':
      return (
        <button type='button' className={styles.viewButton} onClick={() => onViewImageClick(item)}>
          보기
        </button>
      )
    case 'received':
      return (
        <button type='button' className={styles.receivedButton} onClick={() => onRequestClick(item)}>
          접수
        </button>
      )
    case 'request':
    default:
      return (
        <button type='button' className={styles.requestButton} onClick={() => onRequestClick(item)}>
          신청
        </button>
      )
  }
}

// 기타검사 테이블 컬럼 정의
const getOtherExamColumns = (
  onImageClick: (item: OtherExamItem) => void,
  onViewImageClick: (item: OtherExamItem) => void,
  onViewResultClick: (item: OtherExamItem) => void
): TableColumn<OtherExamItem>[] => [
  { id: 'department', label: '진료과', field: 'department', width: '160px', align: 'center' },
  { id: 'doctor', label: '진료의', field: 'doctor', width: '130px', align: 'center' },
  { id: 'examName', label: '검사명', field: 'examName', width: '1fr', align: 'center' },
  {
    id: 'image',
    label: '이미지',
    width: '160px',
    align: 'center',
    renderCell: (item: OtherExamItem) => renderImageButton(item, onImageClick, onViewImageClick)
  },
  {
    id: 'result',
    label: '판독결과',
    width: '160px',
    align: 'center',
    renderCell: (item: OtherExamItem) => (
      <button type='button' className={styles.viewButton} onClick={() => onViewResultClick(item)}>
        보기
      </button>
    )
  }
]

// 기타검사 태블릿 카드 렌더링 함수
const getOtherExamTabletCard =
  (
    onImageClick: (item: OtherExamItem) => void,
    onViewImageClick: (item: OtherExamItem) => void,
    onViewResultClick: (item: OtherExamItem) => void
  ) =>
  (item: OtherExamItem) => (
    <div className={styles.tabletCard}>
      <div className={styles.tabletCardHeader}>
        <span className={styles.tabletCardHeaderLabel}>진료과</span>
        <span className={styles.tabletCardHeaderValue}>{item.department}</span>
      </div>
      <div className={styles.tabletCardBody}>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>진료의</span>
          <span className={styles.tabletCardValue}>{item.doctor}</span>
        </div>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>검사명</span>
          <span className={styles.tabletCardValue}>{item.examName}</span>
        </div>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>이미지</span>
          {renderImageButton(item, onImageClick, onViewImageClick)}
        </div>
        <div className={styles.tabletCardRow}>
          <span className={styles.tabletCardLabel}>판독결과</span>
          <button type='button' className={styles.viewButton} onClick={() => onViewResultClick(item)}>
            보기
          </button>
        </div>
      </div>
    </div>
  )

// 기타검사 모바일 카드 렌더링 함수
const getOtherExamMobileCard =
  (
    onImageClick: (item: OtherExamItem) => void,
    onViewImageClick: (item: OtherExamItem) => void,
    onViewResultClick: (item: OtherExamItem) => void
  ) =>
  (item: OtherExamItem) => (
    <div className={styles.mobileCard}>
      <div className={styles.mobileCardHeader}>
        <span className={styles.mobileCardHeaderLabel}>진료과</span>
        <span className={styles.mobileCardHeaderValue}>{item.department}</span>
      </div>
      <div className={styles.mobileCardBody}>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>진료의</span>
          <span className={styles.mobileCardValue}>{item.doctor}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>검사명</span>
          <span className={styles.mobileCardValue}>{item.examName}</span>
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>이미지</span>
          {renderImageButton(item, onImageClick, onViewImageClick)}
        </div>
        <div className={styles.mobileCardRow}>
          <span className={styles.mobileCardLabel}>판독결과</span>
          <button type='button' className={styles.viewButton} onClick={() => onViewResultClick(item)}>
            보기
          </button>
        </div>
      </div>
    </div>
  )

export const OtherExamTab: React.FC = () => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedExam, setSelectedExam] = useState<OtherExamItem | null>(null)

  // 이미지 신청/접수 클릭 핸들러
  const handleImageClick = (item: OtherExamItem) => {
    // TODO: 이미지 신청/접수 기능 구현
    console.log('이미지 신청/접수 클릭:', item)
  }

  // 이미지 보기 클릭 핸들러
  const handleViewImageClick = (item: OtherExamItem) => {
    setSelectedExam(item)
    setIsImageModalOpen(true)
  }

  // 이미지 모달 닫기
  const handleCloseImageModal = () => {
    setIsImageModalOpen(false)
    setSelectedExam(null)
  }

  // 판독결과 보기 클릭 핸들러
  const handleViewResultClick = (item: OtherExamItem) => {
    setSelectedExam(item)
    setIsResultModalOpen(true)
  }

  // 판독결과 모달 닫기
  const handleCloseResultModal = () => {
    setIsResultModalOpen(false)
    setSelectedExam(null)
  }

  return (
    <>
      {/* 안내 문구 */}
      <p className={styles.tabNotice}>
        <span className={styles.noticeIcon}>i</span>
        등록된 이미지는 3개월만 열람이 가능합니다.
      </p>

      <Table
        columns={getOtherExamColumns(handleImageClick, handleViewImageClick, handleViewResultClick)}
        data={mockOtherExamData}
        getRowKey={item => item.id}
        renderTabletCard={getOtherExamTabletCard(handleImageClick, handleViewImageClick, handleViewResultClick)}
        renderMobileCard={getOtherExamMobileCard(handleImageClick, handleViewImageClick, handleViewResultClick)}
      />

      {/* 판독결과 모달 */}
      {selectedExam && (
        <PathologyResultModal
          isOpen={isResultModalOpen}
          onClose={handleCloseResultModal}
          examName={selectedExam.examName}
          result={mockOtherExamResults[selectedExam.id] || ''}
        />
      )}

      {/* 이미지 뷰어 모달 */}
      {selectedExam && (
        <ImageViewerModal
          isOpen={isImageModalOpen}
          onClose={handleCloseImageModal}
          examType='기타 검사'
          examName={selectedExam.examName}
          images={mockOtherExamImages[selectedExam.id] || []}
        />
      )}
    </>
  )
}
