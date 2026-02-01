'use client'

import React from 'react'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import styles from '../../page.module.scss'

// 약 처방 내역 데이터 타입
export interface PrescriptionItem {
  id: number
  prescriptionDate: string // 처방일
  department: string // 진료과
  doctor: string // 진료의
  drugName: string // 약품명
  singleDose: string // 1회 투여량
  unit: string // 단위
  dailyFrequency: string // 1일 회수
  days: string // 일수
  category: string // 구분
  intakeTime: string // 복용시간
  intakeMethod: string // 복용방법
}

// Mock 약 처방 내역 데이터
const mockPrescriptionData: PrescriptionItem[] = [
  {
    id: 1,
    prescriptionDate: '2025-11-25',
    department: '호흡기·알레르기내과',
    doctor: '김선용',
    drugName: 'SOLONDO 5MG(유한)',
    singleDose: '10',
    unit: 'TAB',
    dailyFrequency: '2',
    days: '14',
    category: '내복약',
    intakeTime: '아침 식후 30분',
    intakeMethod: '1포(정)씩 복용'
  },
  {
    id: 2,
    prescriptionDate: '2025-11-04',
    department: '호흡기·알레르기내과',
    doctor: '박인구',
    drugName: 'INHIBACE 1MG(제일)',
    singleDose: '1',
    unit: 'TAB',
    dailyFrequency: '2',
    days: '14',
    category: '내복약',
    intakeTime: '아침, 저녁 식후 30분',
    intakeMethod: '1포(정)씩 복용'
  },
  {
    id: 3,
    prescriptionDate: '2025-10-30',
    department: '호흡기·알레르기내과',
    doctor: '황순철',
    drugName: 'ASPIRIN PROTECT 100MG(바이엘)',
    singleDose: '50',
    unit: 'CAB',
    dailyFrequency: '2',
    days: '14',
    category: '내복약',
    intakeTime: '아침, 저녁 식후 30분',
    intakeMethod: '1포(정)씩 복용'
  },
  {
    id: 4,
    prescriptionDate: '2025-10-21',
    department: '호흡기·알레르기내과',
    doctor: '홍상우',
    drugName: 'SITRACAL F(대한뉴팜)',
    singleDose: '1',
    unit: 'MG',
    dailyFrequency: '2',
    days: '1',
    category: '내복약',
    intakeTime: '아침 식후 30분',
    intakeMethod: '1포(정)씩 복용'
  },
  {
    id: 5,
    prescriptionDate: '2025-10-15',
    department: '호흡기·알레르기내과',
    doctor: '김선용',
    drugName: 'SOLONDO 5MG(유한)',
    singleDose: '10',
    unit: 'TAB',
    dailyFrequency: '2',
    days: '14',
    category: '내복약',
    intakeTime: '아침 식후 30분',
    intakeMethod: '1포(정)씩 복용'
  }
]

// 약품명 클릭 핸들러
const handleDrugNameClick = (item: PrescriptionItem) => {
  // TODO: 약품 상세 정보 페이지로 이동 또는 모달 표시
  console.log('약품명 클릭:', item.drugName)
}

// 약 처방 내역 테이블 컬럼 정의
const prescriptionColumns: TableColumn<PrescriptionItem>[] = [
  { id: 'prescriptionDate', label: '처방일', field: 'prescriptionDate', width: '120px', align: 'center' },
  { id: 'department', label: '진료과', field: 'department', width: '170px', align: 'center' },
  { id: 'doctor', label: '진료의', field: 'doctor', width: '80px', align: 'center' },
  {
    id: 'drugName',
    label: '약품명',
    width: '1fr', // flex로 남은 공간 채우기
    align: 'center',
    renderCell: (item: PrescriptionItem) => (
      <button type='button' className={styles.drugNameLink} onClick={() => handleDrugNameClick(item)}>
        {item.drugName}
      </button>
    )
  },
  { id: 'singleDose', label: '1회 투여량', field: 'singleDose', width: '90px', align: 'center' },
  { id: 'unit', label: '단위', field: 'unit', width: '40px', align: 'center' },
  { id: 'dailyFrequency', label: '1일 회수', field: 'dailyFrequency', width: '70px', align: 'center' },
  { id: 'days', label: '일수', field: 'days', width: '40px', align: 'center' },
  { id: 'category', label: '구분', field: 'category', width: '70px', align: 'center' },
  { id: 'intakeTime', label: '복용시간', field: 'intakeTime', width: '160px', align: 'center' },
  { id: 'intakeMethod', label: '복용방법', field: 'intakeMethod', width: '140px', align: 'center' }
]

// 약 처방 내역 태블릿 카드 렌더링 함수
const renderPrescriptionTabletCard = (item: PrescriptionItem) => (
  <div className={styles.tabletCard}>
    <div className={styles.tabletCardHeader}>
      <span className={styles.tabletCardHeaderLabel}>처방일</span>
      <span className={styles.tabletCardHeaderValue}>{item.prescriptionDate}</span>
    </div>
    <div className={styles.tabletCardBody}>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>진료과</span>
        <span className={styles.tabletCardValue}>{item.department}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>진료의</span>
        <span className={styles.tabletCardValue}>{item.doctor}</span>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>약품명</span>
        <button type='button' className={styles.drugNameLink} onClick={() => handleDrugNameClick(item)}>
          {item.drugName}
        </button>
      </div>
      {/* 가로 구분선 */}
      <div className={styles.tabletCardHorizontalDivider} />
      {/* 1회 투여량 | 단위 */}
      <div className={styles.tabletCardDoubleRow}>
        <div className={styles.tabletCardDoubleColumn}>
          <span className={styles.tabletCardDoubleLabel}>1회 투여량</span>
          <span className={styles.tabletCardDoubleValue}>{item.singleDose}</span>
        </div>
        <div className={styles.tabletCardDoubleSeparator} />
        <div className={styles.tabletCardDoubleColumn}>
          <span className={styles.tabletCardDoubleLabel}>단위</span>
          <span className={styles.tabletCardDoubleValue}>{item.unit}</span>
        </div>
      </div>
      {/* 1일 회수 | 일수 */}
      <div className={styles.tabletCardDoubleRow}>
        <div className={styles.tabletCardDoubleColumn}>
          <span className={styles.tabletCardDoubleLabel}>1일 회수</span>
          <span className={styles.tabletCardDoubleValue}>{item.dailyFrequency}</span>
        </div>
        <div className={styles.tabletCardDoubleSeparator} />
        <div className={styles.tabletCardDoubleColumn}>
          <span className={styles.tabletCardDoubleLabel}>일수</span>
          <span className={styles.tabletCardDoubleValue}>{item.days}</span>
        </div>
      </div>
      <div className={styles.tabletCardRow}>
        <span className={styles.tabletCardLabel}>구분</span>
        <span className={styles.tabletCardValue}>{item.category}</span>
      </div>
      {/* 복용시간 | 복용방법 */}
      <div className={styles.tabletCardDoubleRow}>
        <div className={styles.tabletCardDoubleColumn}>
          <span className={styles.tabletCardDoubleLabel}>복용시간</span>
          <span className={styles.tabletCardDoubleValue}>{item.intakeTime}</span>
        </div>
        <div className={styles.tabletCardDoubleSeparator} />
        <div className={styles.tabletCardDoubleColumn}>
          <span className={styles.tabletCardDoubleLabel}>복용방법</span>
          <span className={styles.tabletCardDoubleValue}>{item.intakeMethod}</span>
        </div>
      </div>
    </div>
  </div>
)

// 약 처방 내역 모바일 카드 렌더링 함수
const renderPrescriptionMobileCard = (item: PrescriptionItem) => (
  <div className={styles.mobileCard}>
    <div className={styles.mobileCardHeader}>
      <span className={styles.mobileCardHeaderLabel}>처방일</span>
      <span className={styles.mobileCardHeaderValue}>{item.prescriptionDate}</span>
    </div>
    <div className={styles.mobileCardBody}>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>진료과</span>
        <span className={styles.mobileCardValue}>{item.department}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>진료의</span>
        <span className={styles.mobileCardValue}>{item.doctor}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>약품명</span>
        <button type='button' className={styles.drugNameLink} onClick={() => handleDrugNameClick(item)}>
          {item.drugName}
        </button>
      </div>
      {/* 가로 구분선 */}
      <div className={styles.mobileCardHorizontalDivider} />
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>1회 투여량</span>
        <span className={styles.mobileCardValue}>{item.singleDose}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>단위</span>
        <span className={styles.mobileCardValue}>{item.unit}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>1일 회수</span>
        <span className={styles.mobileCardValue}>{item.dailyFrequency}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>일수</span>
        <span className={styles.mobileCardValue}>{item.days}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>구분</span>
        <span className={styles.mobileCardValue}>{item.category}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>복용시간</span>
        <span className={styles.mobileCardValue}>{item.intakeTime}</span>
      </div>
      <div className={styles.mobileCardRow}>
        <span className={styles.mobileCardLabel}>복용방법</span>
        <span className={styles.mobileCardValue}>{item.intakeMethod}</span>
      </div>
    </div>
  </div>
)

export const PrescriptionTab: React.FC = () => {
  return (
    <Table
      columns={prescriptionColumns}
      data={mockPrescriptionData}
      getRowKey={item => item.id}
      renderTabletCard={renderPrescriptionTabletCard}
      renderMobileCard={renderPrescriptionMobileCard}
    />
  )
}
