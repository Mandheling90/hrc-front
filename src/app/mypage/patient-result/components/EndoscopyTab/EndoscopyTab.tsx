'use client'

import React, { useState } from 'react'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { PathologyResultModal } from '@/components/organisms/PathologyResultModal'
import { ImageViewerModal } from '@/components/organisms/ImageViewerModal'
import styles from '../../page.module.scss'

// 내시경검사 데이터 타입
export interface EndoscopyItem {
  id: number
  department: string
  doctor: string
  examName: string
  imageStatus: 'request' | 'received' | 'viewable' // 신청 | 접수 | 보기
}

// Mock 내시경검사 데이터
const mockEndoscopyData: EndoscopyItem[] = [
  {
    id: 1,
    department: '감염내과',
    doctor: '김선용',
    examName: 'Gastrofiberscopy [G]',
    imageStatus: 'request'
  },
  {
    id: 2,
    department: '소화기내과',
    doctor: '박인구',
    examName: 'Colonoscopy [C]',
    imageStatus: 'request'
  },
  {
    id: 3,
    department: '소화기내과',
    doctor: '황순철',
    examName: 'ERCP',
    imageStatus: 'received'
  },
  {
    id: 4,
    department: '호흡기내과',
    doctor: '홍상우',
    examName: 'Bronchoscopy',
    imageStatus: 'viewable'
  },
  {
    id: 5,
    department: '소화기내과',
    doctor: '이정민',
    examName: 'EUS (Endoscopic Ultrasound)',
    imageStatus: 'viewable'
  }
]

// Mock 내시경검사 판독결과 데이터
const mockEndoscopyResults: Record<number, string> = {
  1: '[impression] Chronic superficial gastritis.\nNo evidence of ulcer or malignancy.',
  2: '[impression] Normal colonoscopy findings.\nNo polyps or masses detected.',
  3: '[impression] Common bile duct stone extraction performed.\nSuccessful ERCP with sphincterotomy.',
  4: '[impression] Normal bronchial tree appearance.\nNo endobronchial lesions identified.',
  5: '[impression] Small submucosal lesion in gastric body.\nEUS findings consistent with GIST.'
}

// Mock 내시경 이미지 데이터
const mockEndoscopyImages: Record<number, string[]> = {
  4: Array.from({ length: 15 }, () => '/images/Gastrofiberscopy_sample.png'),
  5: Array.from({ length: 25 }, () => '/images/Gastrofiberscopy_sample.png')
}

// 이미지 상태별 버튼 렌더링
const renderImageButton = (
  item: EndoscopyItem,
  onRequestClick: (item: EndoscopyItem) => void,
  onViewImageClick: (item: EndoscopyItem) => void
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

// 내시경검사 테이블 컬럼 정의
const getEndoscopyColumns = (
  onImageClick: (item: EndoscopyItem) => void,
  onViewImageClick: (item: EndoscopyItem) => void,
  onViewResultClick: (item: EndoscopyItem) => void
): TableColumn<EndoscopyItem>[] => [
  { id: 'department', label: '진료과', field: 'department', width: '160px', align: 'center' },
  { id: 'doctor', label: '진료의', field: 'doctor', width: '130px', align: 'center' },
  { id: 'examName', label: '검사명', field: 'examName', width: '1fr', align: 'center' },
  {
    id: 'image',
    label: '이미지',
    width: '160px',
    align: 'center',
    renderCell: (item: EndoscopyItem) => renderImageButton(item, onImageClick, onViewImageClick)
  },
  {
    id: 'result',
    label: '판독결과',
    width: '160px',
    align: 'center',
    renderCell: (item: EndoscopyItem) => (
      <button type='button' className={styles.viewButton} onClick={() => onViewResultClick(item)}>
        보기
      </button>
    )
  }
]

// 내시경검사 태블릿 카드 렌더링 함수
const getEndoscopyTabletCard =
  (
    onImageClick: (item: EndoscopyItem) => void,
    onViewImageClick: (item: EndoscopyItem) => void,
    onViewResultClick: (item: EndoscopyItem) => void
  ) =>
  (item: EndoscopyItem) => (
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

// 내시경검사 모바일 카드 렌더링 함수
const getEndoscopyMobileCard =
  (
    onImageClick: (item: EndoscopyItem) => void,
    onViewImageClick: (item: EndoscopyItem) => void,
    onViewResultClick: (item: EndoscopyItem) => void
  ) =>
  (item: EndoscopyItem) => (
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

export const EndoscopyTab: React.FC = () => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedEndoscopy, setSelectedEndoscopy] = useState<EndoscopyItem | null>(null)

  // 이미지 신청/접수 클릭 핸들러
  const handleImageClick = (item: EndoscopyItem) => {
    // TODO: 이미지 신청/접수 기능 구현
    console.log('이미지 신청/접수 클릭:', item)
  }

  // 이미지 보기 클릭 핸들러
  const handleViewImageClick = (item: EndoscopyItem) => {
    setSelectedEndoscopy(item)
    setIsImageModalOpen(true)
  }

  // 이미지 모달 닫기
  const handleCloseImageModal = () => {
    setIsImageModalOpen(false)
    setSelectedEndoscopy(null)
  }

  // 판독결과 보기 클릭 핸들러
  const handleViewResultClick = (item: EndoscopyItem) => {
    setSelectedEndoscopy(item)
    setIsResultModalOpen(true)
  }

  // 판독결과 모달 닫기
  const handleCloseResultModal = () => {
    setIsResultModalOpen(false)
    setSelectedEndoscopy(null)
  }

  return (
    <>
      <Table
        columns={getEndoscopyColumns(handleImageClick, handleViewImageClick, handleViewResultClick)}
        data={mockEndoscopyData}
        getRowKey={item => item.id}
        renderTabletCard={getEndoscopyTabletCard(handleImageClick, handleViewImageClick, handleViewResultClick)}
        renderMobileCard={getEndoscopyMobileCard(handleImageClick, handleViewImageClick, handleViewResultClick)}
      />

      {/* 판독결과 모달 */}
      {selectedEndoscopy && (
        <PathologyResultModal
          isOpen={isResultModalOpen}
          onClose={handleCloseResultModal}
          examName={selectedEndoscopy.examName}
          result={mockEndoscopyResults[selectedEndoscopy.id] || ''}
        />
      )}

      {/* 이미지 뷰어 모달 */}
      {selectedEndoscopy && (
        <ImageViewerModal
          isOpen={isImageModalOpen}
          onClose={handleCloseImageModal}
          examType='내시경 검사'
          examName={selectedEndoscopy.examName}
          images={mockEndoscopyImages[selectedEndoscopy.id] || []}
        />
      )}
    </>
  )
}
