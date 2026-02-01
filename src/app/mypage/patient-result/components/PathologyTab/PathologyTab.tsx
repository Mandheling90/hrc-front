'use client'

import React, { useState } from 'react'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { PathologyResultModal } from '@/components/organisms/PathologyResultModal'
import styles from '../../page.module.scss'

// 병리검사 데이터 타입
export interface PathologyItem {
  id: number
  department: string
  examDate: string
  examName: string
}

// Mock 병리검사 데이터
const mockPathologyData: PathologyItem[] = [
  {
    id: 1,
    department: '소화기내과',
    examDate: '2025-11-25',
    examName: '자가면역역환검사'
  },
  {
    id: 2,
    department: '소화기내과',
    examDate: '2025-11-04',
    examName: '미생물영역'
  },
  {
    id: 3,
    department: '소화기내과',
    examDate: '2025-10-30',
    examName: '수혈검사'
  },
  {
    id: 4,
    department: '소화기내과',
    examDate: '2025-10-21',
    examName: '뇨/체액화학'
  }
]

// Mock 병리검사 판독결과 데이터
const mockPathologyResults: Record<number, string> = {
  1: '[impression] Progressed both lung consolidation since last study. Others show no change.\nProgressed both lung consolidation since last study. Others show no change.',
  2: '[impression] No significant interval change in both lung consolidation.\nStable condition compared to previous study.',
  3: '[impression] Mild improvement in right lung consolidation.\nLeft lung shows no significant change.',
  4: '[impression] Follow-up recommended in 3 months.\nNo evidence of malignancy.'
}

// 병리검사 테이블 컬럼 정의
const getPathologyColumns = (onViewClick: (item: PathologyItem) => void): TableColumn<PathologyItem>[] => [
  { id: 'department', label: '진료과', field: 'department', width: '250px', align: 'center' },
  { id: 'examDate', label: '검사일', field: 'examDate', width: '180px', align: 'center' },
  { id: 'examName', label: '검사명', field: 'examName', width: '1fr', align: 'center' },
  {
    id: 'result',
    label: '판독결과',
    width: '200px',
    align: 'center',
    renderCell: (item: PathologyItem) => (
      <button type='button' className={styles.viewButton} onClick={() => onViewClick(item)}>
        조회
      </button>
    )
  }
]

// 병리검사 태블릿 카드 렌더링 함수
const getPathologyTabletCard = (onViewClick: (item: PathologyItem) => void) => (item: PathologyItem) => (
  <div className={styles.tabletCard}>
    <div className={styles.tabletCardHeader}>
      <span className={styles.tabletCardHeaderLabel}>진료과</span>
      <span className={styles.tabletCardHeaderValue}>{item.department}</span>
    </div>
    <div className={styles.tabletCardBody}>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>검사일</span>
        <span className={styles.tabletCardValue}>{item.examDate}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>검사명</span>
        <span className={styles.tabletCardValue}>{item.examName}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>판독결과</span>
        <button type='button' className={styles.viewButton} onClick={() => onViewClick(item)}>
          조회
        </button>
      </div>
    </div>
  </div>
)

// 병리검사 모바일 카드 렌더링 함수
const getPathologyMobileCard = (onViewClick: (item: PathologyItem) => void) => (item: PathologyItem) => (
  <div className={styles.mobileCard}>
    <div className={styles.mobileCardHeader}>
      <span className={styles.mobileCardHeaderLabel}>진료과</span>
      <span className={styles.mobileCardHeaderValue}>{item.department}</span>
    </div>
    <div className={styles.mobileCardBody}>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>검사일</span>
        <span className={styles.mobileCardValue}>{item.examDate}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>검사명</span>
        <span className={styles.mobileCardValue}>{item.examName}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>판독결과</span>
        <button type='button' className={styles.viewButton} onClick={() => onViewClick(item)}>
          조회
        </button>
      </div>
    </div>
  </div>
)

export const PathologyTab: React.FC = () => {
  const [isPathologyModalOpen, setIsPathologyModalOpen] = useState(false)
  const [selectedPathology, setSelectedPathology] = useState<PathologyItem | null>(null)

  // 병리검사 판독결과 모달 열기
  const handleViewPathologyResult = (item: PathologyItem) => {
    setSelectedPathology(item)
    setIsPathologyModalOpen(true)
  }

  // 병리검사 판독결과 모달 닫기
  const handleClosePathologyModal = () => {
    setIsPathologyModalOpen(false)
    setSelectedPathology(null)
  }

  return (
    <>
      <Table
        columns={getPathologyColumns(handleViewPathologyResult)}
        data={mockPathologyData}
        getRowKey={item => item.id}
        renderTabletCard={getPathologyTabletCard(handleViewPathologyResult)}
        renderMobileCard={getPathologyMobileCard(handleViewPathologyResult)}
      />

      {/* 병리검사 판독결과 모달 */}
      {selectedPathology && (
        <PathologyResultModal
          isOpen={isPathologyModalOpen}
          onClose={handleClosePathologyModal}
          examName={selectedPathology.examName}
          result={mockPathologyResults[selectedPathology.id] || ''}
        />
      )}
    </>
  )
}
