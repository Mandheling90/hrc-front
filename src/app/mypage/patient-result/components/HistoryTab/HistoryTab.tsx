'use client'

import React from 'react'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import styles from '../../page.module.scss'

// 수진 이력 데이터 타입
export interface HistoryItem {
  id: number
  visitDate: string
  visitType: string
  department: string
  doctor: string
  diagnosis: string
}

// Mock 수진 이력 데이터
const mockHistoryData: HistoryItem[] = [
  {
    id: 1,
    visitDate: '2025-11-25',
    visitType: '외래',
    department: '감염내과',
    doctor: '김선용',
    diagnosis: 'Acute Upper Respiratory Infection (ICD-10: J06.9)'
  },
  {
    id: 2,
    visitDate: '2025-11-04',
    visitType: '외래',
    department: '소화기내과',
    doctor: '박인구',
    diagnosis: 'Gastroesophageal Reflux Disease – GERD (ICD-10: K21.9)'
  },
  {
    id: 3,
    visitDate: '2025-10-30',
    visitType: '입원',
    department: '치과',
    doctor: '황순철',
    diagnosis: 'Lumbar Herniated Intervertebral Disc (ICD-10: M51.2)'
  },
  {
    id: 4,
    visitDate: '2025-10-21',
    visitType: '외래',
    department: '호흡기내과',
    doctor: '홍상우',
    diagnosis: 'Type 2 Diabetes Mellitus – T2DM (ICD-10: E11.9)'
  }
]

// 수진이력 테이블 컬럼 정의
const historyColumns: TableColumn<HistoryItem>[] = [
  { id: 'visitDate', label: '내원일', field: 'visitDate', width: '160px', align: 'center' },
  { id: 'visitType', label: '진료구분', field: 'visitType', width: '130px', align: 'center' },
  { id: 'department', label: '진료과', field: 'department', width: '1fr', align: 'center' },
  { id: 'doctor', label: '진료의', field: 'doctor', width: '130px', align: 'center' },
  { id: 'diagnosis', label: '진단명', field: 'diagnosis', width: '550px', align: 'center' }
]

// 수진이력 태블릿 카드 렌더링 함수
const renderHistoryTabletCard = (item: HistoryItem) => (
  <div className={styles.tabletCard}>
    <div className={styles.tabletCardHeader}>
      <span className={styles.tabletCardHeaderLabel}>내원일</span>
      <span className={styles.tabletCardHeaderValue}>{item.visitDate}</span>
    </div>
    <div className={styles.tabletCardBody}>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>진료구분</span>
        <span className={styles.tabletCardValue}>{item.visitType}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>진료과</span>
        <span className={styles.tabletCardValue}>{item.department}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>진료의</span>
        <span className={styles.tabletCardValue}>{item.doctor}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>진단명</span>
        <span className={styles.tabletCardValue}>{item.diagnosis}</span>
      </div>
    </div>
  </div>
)

// 수진이력 모바일 카드 렌더링 함수
const renderHistoryMobileCard = (item: HistoryItem) => (
  <div className={styles.mobileCard}>
    <div className={styles.mobileCardHeader}>
      <span className={styles.mobileCardHeaderLabel}>내원일</span>
      <span className={styles.mobileCardHeaderValue}>{item.visitDate}</span>
    </div>
    <div className={styles.mobileCardBody}>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>진료구분</span>
        <span className={styles.mobileCardValue}>{item.visitType}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>진료과</span>
        <span className={styles.mobileCardValue}>{item.department}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>진료의</span>
        <span className={styles.mobileCardValue}>{item.doctor}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>진단명</span>
        <span className={styles.mobileCardValue}>{item.diagnosis}</span>
      </div>
    </div>
  </div>
)

export const HistoryTab: React.FC = () => {
  return (
    <Table
      columns={historyColumns}
      data={mockHistoryData}
      getRowKey={item => item.id}
      renderTabletCard={renderHistoryTabletCard}
      renderMobileCard={renderHistoryMobileCard}
    />
  )
}
