'use client'

import React, { useState } from 'react'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { DiagnosticDetailModal, DiagnosticResultItem } from '@/components/organisms/DiagnosticDetailModal'
import styles from '../../page.module.scss'

// 진단검사 데이터 타입
export interface DiagnosticItem {
  id: number
  department: string
  treatmentDate: string
  examDate: string
  examName: string
}

// Mock 진단검사 데이터
const mockDiagnosticData: DiagnosticItem[] = [
  {
    id: 1,
    department: '감염내과',
    treatmentDate: '2025-11-25',
    examDate: '2025-11-25',
    examName: '자가면역'
  },
  {
    id: 2,
    department: '소화기내과',
    treatmentDate: '2025-11-04',
    examDate: '2025-11-04',
    examName: '미생물영역'
  },
  {
    id: 3,
    department: '치과',
    treatmentDate: '2025-10-30',
    examDate: '2025-10-30',
    examName: '수혈검사'
  },
  {
    id: 4,
    department: '호흡기내과',
    treatmentDate: '2025-10-21',
    examDate: '2025-10-21',
    examName: '뇨/체액화학'
  }
]

// Mock 검사 결과 상세 데이터
const mockDiagnosticResults: Record<number, { results: DiagnosticResultItem[]; remarks?: string }> = {
  1: {
    results: [
      { id: 1, testName: 'WBC Diff. ◇Neut%', result: 9, min: 11, max: 48, isHigh: true },
      { id: 2, testName: 'WBC Diff. ◇Eosi%', result: 38.6, min: 31.5, max: 'MR' },
      { id: 3, testName: 'WBC Diff. ◇Mono%', result: 9, min: 150, max: 400, isLow: true },
      { id: 4, testName: 'Eosinophil Count', result: 0.13, min: 4.0, max: 0.5 }
    ],
    remarks:
      '[impression] Progressed both lung consolidation since last study. Others show no change.\nProgressed both lung consolidation since last study. Others show no change.'
  },
  2: {
    results: [
      { id: 1, testName: 'WBC Diff. ◇Neut%', result: 9, min: 11, max: 48, isHigh: true },
      { id: 2, testName: 'WBC Diff. ◇Eosi%', result: 38.6, min: 31.5, max: 'MR' },
      { id: 3, testName: 'WBC Diff. ◇Mono%', result: 9, min: 150, max: 400, isLow: true },
      { id: 4, testName: 'Eosinophil Count', result: 0.13, min: 4.0, max: 0.5 }
    ],
    remarks:
      '[impression] Progressed both lung consolidation since last study. Others show no change.\nProgressed both lung consolidation since last study. Others show no change.'
  },
  3: {
    results: [
      { id: 1, testName: 'WBC Diff. ◇Neut%', result: 25, min: 11, max: 48 },
      { id: 2, testName: 'WBC Diff. ◇Eosi%', result: 32.1, min: 31.5, max: 'MR' },
      { id: 3, testName: 'WBC Diff. ◇Mono%', result: 200, min: 150, max: 400 },
      { id: 4, testName: 'Eosinophil Count', result: 0.25, min: 4.0, max: 0.5 }
    ]
  },
  4: {
    results: [
      { id: 1, testName: 'WBC Diff. ◇Neut%', result: 15, min: 11, max: 48 },
      { id: 2, testName: 'WBC Diff. ◇Eosi%', result: 35.2, min: 31.5, max: 'MR' },
      { id: 3, testName: 'WBC Diff. ◇Mono%', result: 180, min: 150, max: 400 },
      { id: 4, testName: 'Eosinophil Count', result: 0.3, min: 4.0, max: 0.5 }
    ]
  }
}

// 진단검사 테이블 컬럼 정의
const getDiagnosticColumns = (onDetailClick: (item: DiagnosticItem) => void): TableColumn<DiagnosticItem>[] => [
  { id: 'department', label: '진료과', field: 'department', width: '1fr', align: 'center' },
  { id: 'treatmentDate', label: '진료일', field: 'treatmentDate', width: '180px', align: 'center' },
  { id: 'examDate', label: '검사일', field: 'examDate', width: '180px', align: 'center' },
  { id: 'examName', label: '검사명', field: 'examName', width: '1fr', align: 'center' },
  {
    id: 'result',
    label: '검사결과',
    width: '200px',
    align: 'center',
    renderCell: (item: DiagnosticItem) => (
      <button type='button' className={styles.detailButton} onClick={() => onDetailClick(item)}>
        상세 내역 보기
      </button>
    )
  }
]

// 진단검사 태블릿 카드 렌더링 함수
const getDiagnosticTabletCard = (onDetailClick: (item: DiagnosticItem) => void) => (item: DiagnosticItem) => (
  <div className={styles.tabletCard}>
    <div className={styles.tabletCardHeader}>
      <span className={styles.tabletCardHeaderLabel}>진료과</span>
      <span className={styles.tabletCardHeaderValue}>{item.department}</span>
    </div>
    <div className={styles.tabletCardBody}>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>진료일</span>
        <span className={styles.tabletCardValue}>{item.treatmentDate}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>검사일</span>
        <span className={styles.tabletCardValue}>{item.examDate}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>검사명</span>
        <span className={styles.tabletCardValue}>{item.examName}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>상세내역</span>
        <button type='button' className={styles.detailButton} onClick={() => onDetailClick(item)}>
          상세 내역 보기
        </button>
      </div>
    </div>
  </div>
)

// 진단검사 모바일 카드 렌더링 함수
const getDiagnosticMobileCard = (onDetailClick: (item: DiagnosticItem) => void) => (item: DiagnosticItem) => (
  <div className={styles.mobileCard}>
    <div className={styles.mobileCardHeader}>
      <span className={styles.mobileCardHeaderLabel}>진료과</span>
      <span className={styles.mobileCardHeaderValue}>{item.department}</span>
    </div>
    <div className={styles.mobileCardBody}>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>진료일</span>
        <span className={styles.mobileCardValue}>{item.treatmentDate}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>검사일</span>
        <span className={styles.mobileCardValue}>{item.examDate}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>검사명</span>
        <span className={styles.mobileCardValue}>{item.examName}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>상세내역</span>
        <button type='button' className={styles.detailButton} onClick={() => onDetailClick(item)}>
          상세 내역 보기
        </button>
      </div>
    </div>
  </div>
)

export const DiagnosticTab: React.FC = () => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<DiagnosticItem | null>(null)

  // 상세 내역 모달 열기
  const handleOpenDetailModal = (item: DiagnosticItem) => {
    setSelectedDiagnostic(item)
    setIsDetailModalOpen(true)
  }

  // 상세 내역 모달 닫기
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedDiagnostic(null)
  }

  return (
    <>
      <Table
        columns={getDiagnosticColumns(handleOpenDetailModal)}
        data={mockDiagnosticData}
        getRowKey={item => item.id}
        renderTabletCard={getDiagnosticTabletCard(handleOpenDetailModal)}
        renderMobileCard={getDiagnosticMobileCard(handleOpenDetailModal)}
      />

      {/* 진단검사 상세 내역 모달 */}
      {selectedDiagnostic && (
        <DiagnosticDetailModal
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          examName={selectedDiagnostic.examName}
          results={mockDiagnosticResults[selectedDiagnostic.id]?.results || []}
          remarks={mockDiagnosticResults[selectedDiagnostic.id]?.remarks}
        />
      )}
    </>
  )
}
