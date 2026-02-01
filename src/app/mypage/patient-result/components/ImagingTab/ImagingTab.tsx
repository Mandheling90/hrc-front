'use client'

import React, { useState } from 'react'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { PathologyResultModal } from '@/components/organisms/PathologyResultModal'
import { ImageViewerModal } from '@/components/organisms/ImageViewerModal'
import styles from '../../page.module.scss'

// 영상검사 데이터 타입
export interface ImagingItem {
  id: number
  department: string
  doctor: string
  examName: string
  imageStatus: 'request' | 'received' | 'viewable' // 신청 | 접수 | 보기
}

// Mock 영상검사 데이터
const mockImagingData: ImagingItem[] = [
  {
    id: 1,
    department: '감염내과',
    doctor: '김선용',
    examName: 'SONO GUIDED BIOPSY KINDEY [G]',
    imageStatus: 'request'
  },
  {
    id: 2,
    department: '소화기내과',
    doctor: '박인구',
    examName: 'SONO GUIDED BIOPSY KINDEY [G]',
    imageStatus: 'request'
  },
  {
    id: 3,
    department: '치과',
    doctor: '황순철',
    examName: 'KUB',
    imageStatus: 'received'
  },
  {
    id: 4,
    department: '호흡기내과',
    doctor: '홍상우',
    examName: 'KUB',
    imageStatus: 'viewable'
  },
  {
    id: 5,
    department: '신경외과',
    doctor: '이정민',
    examName: 'Gastrofiberscopy [G]',
    imageStatus: 'viewable'
  }
]

// Mock 영상검사 판독결과 데이터
const mockImagingResults: Record<number, string> = {
  1: '[impression] No significant abnormality detected in kidney ultrasound.\nNormal kidney size and echogenicity.',
  2: '[impression] Small cystic lesion in right kidney, likely benign.\nRecommend follow-up in 6 months.',
  3: '[impression] Normal bowel gas pattern.\nNo evidence of obstruction or free air.',
  4: '[impression] Mild degenerative changes in lumbar spine.\nNo acute abnormality identified.',
  5: '[impression] No significant mucosal abnormality in esophagus, stomach, and duodenum.\nNormal gastrofiberscopy findings.'
}

// Mock 영상 이미지 데이터
const mockImagingImages: Record<number, string[]> = {
  4: Array.from({ length: 20 }, () => '/images/Gastrofiberscopy_sample.png'),
  5: Array.from({ length: 30 }, () => '/images/Gastrofiberscopy_sample.png')
}

// 이미지 상태별 버튼 렌더링
const renderImageButton = (
  item: ImagingItem,
  onRequestClick: (item: ImagingItem) => void,
  onViewImageClick: (item: ImagingItem) => void
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

// 영상검사 테이블 컬럼 정의
const getImagingColumns = (
  onImageClick: (item: ImagingItem) => void,
  onViewImageClick: (item: ImagingItem) => void,
  onViewResultClick: (item: ImagingItem) => void
): TableColumn<ImagingItem>[] => [
  { id: 'department', label: '진료과', field: 'department', width: '160px', align: 'center' },
  { id: 'doctor', label: '진료의', field: 'doctor', width: '130px', align: 'center' },
  { id: 'examName', label: '검사명', field: 'examName', width: '1fr', align: 'center' },
  {
    id: 'image',
    label: '이미지',
    width: '160px',
    align: 'center',
    renderCell: (item: ImagingItem) => renderImageButton(item, onImageClick, onViewImageClick)
  },
  {
    id: 'result',
    label: '판독결과',
    width: '160px',
    align: 'center',
    renderCell: (item: ImagingItem) => (
      <button type='button' className={styles.viewButton} onClick={() => onViewResultClick(item)}>
        보기
      </button>
    )
  }
]

// 영상검사 태블릿 카드 렌더링 함수
const getImagingTabletCard =
  (
    onImageClick: (item: ImagingItem) => void,
    onViewImageClick: (item: ImagingItem) => void,
    onViewResultClick: (item: ImagingItem) => void
  ) =>
  (item: ImagingItem) => (
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

// 영상검사 모바일 카드 렌더링 함수
const getImagingMobileCard =
  (
    onImageClick: (item: ImagingItem) => void,
    onViewImageClick: (item: ImagingItem) => void,
    onViewResultClick: (item: ImagingItem) => void
  ) =>
  (item: ImagingItem) => (
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

export const ImagingTab: React.FC = () => {
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [selectedImaging, setSelectedImaging] = useState<ImagingItem | null>(null)

  // 이미지 신청/접수 클릭 핸들러
  const handleImageClick = (item: ImagingItem) => {
    // TODO: 이미지 신청/접수 기능 구현
    console.log('이미지 신청/접수 클릭:', item)
  }

  // 이미지 보기 클릭 핸들러
  const handleViewImageClick = (item: ImagingItem) => {
    setSelectedImaging(item)
    setIsImageModalOpen(true)
  }

  // 이미지 모달 닫기
  const handleCloseImageModal = () => {
    setIsImageModalOpen(false)
    setSelectedImaging(null)
  }

  // 판독결과 보기 클릭 핸들러
  const handleViewResultClick = (item: ImagingItem) => {
    setSelectedImaging(item)
    setIsResultModalOpen(true)
  }

  // 판독결과 모달 닫기
  const handleCloseResultModal = () => {
    setIsResultModalOpen(false)
    setSelectedImaging(null)
  }

  return (
    <>
      {/* 안내 문구 */}
      <p className={styles.tabNotice}>
        <span className={styles.noticeIcon}>i</span>
        등록된 이미지는 3개월만 열람이 가능합니다.
      </p>

      <Table
        columns={getImagingColumns(handleImageClick, handleViewImageClick, handleViewResultClick)}
        data={mockImagingData}
        getRowKey={item => item.id}
        renderTabletCard={getImagingTabletCard(handleImageClick, handleViewImageClick, handleViewResultClick)}
        renderMobileCard={getImagingMobileCard(handleImageClick, handleViewImageClick, handleViewResultClick)}
      />

      {/* 판독결과 모달 */}
      {selectedImaging && (
        <PathologyResultModal
          isOpen={isResultModalOpen}
          onClose={handleCloseResultModal}
          examName={selectedImaging.examName}
          result={mockImagingResults[selectedImaging.id] || ''}
        />
      )}

      {/* 이미지 뷰어 모달 */}
      {selectedImaging && (
        <ImageViewerModal
          isOpen={isImageModalOpen}
          onClose={handleCloseImageModal}
          examName={selectedImaging.examName}
          images={mockImagingImages[selectedImaging.id] || []}
        />
      )}
    </>
  )
}
