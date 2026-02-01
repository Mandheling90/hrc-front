'use client'

import React, { useState } from 'react'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'
import { Select } from '@/components/atoms/Select/Select'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { TabNavigation, TabItem } from '@/components/molecules/TabNavigation'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { ListIcon } from '@/components/icons/ListIcon'
import { CalendarIcon } from '@/components/icons/CalendarIcon'
import { CollapseUpIcon } from '@/components/icons/CollapseUpIcon'
import { CollapseDownIcon } from '@/components/icons/CollapseDownIcon'
import styles from './page.module.scss'

// 수진 이력 데이터 타입
interface HistoryItem {
  id: number
  visitDate: string
  visitType: string
  department: string
  doctor: string
  diagnosis: string
}

// 탭 목록
const TABS: TabItem[] = [
  { id: 'history', label: '수진이력' },
  { id: 'diagnostic', label: '진단검사' },
  { id: 'pathology', label: '병리검사' },
  { id: 'imaging', label: '영상검사' },
  { id: 'endoscopy', label: '내시경검사' },
  { id: 'other', label: '기타검사' },
  { id: 'prescription', label: '약 처방 내역' }
]

// 조회기간 옵션
const PERIOD_OPTIONS = [
  { value: '1month', label: '1개월' },
  { value: '3month', label: '3개월' },
  { value: '6month', label: '6개월' },
  { value: '1year', label: '1년' }
]

// 정렬 옵션
const SORT_OPTIONS = [
  { value: 'newest', label: '최신 순' },
  { value: 'oldest', label: '오래된 순' }
]

// 검색 카테고리 옵션
const SEARCH_CATEGORY_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'department', label: '진료과' },
  { value: 'doctor', label: '진료의' },
  { value: 'diagnosis', label: '진단명' }
]

// Mock 환자 정보
const patientInfo = {
  name: '김*환',
  gender: '남',
  age: 52,
  firstReferralDate: '2017-09-13'
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

// 테이블 컬럼 정의
const historyColumns: TableColumn<HistoryItem>[] = [
  { id: 'visitDate', label: '내원일', field: 'visitDate', width: '160px', align: 'center' },
  { id: 'visitType', label: '진료구분', field: 'visitType', width: '130px', align: 'center' },
  { id: 'department', label: '진료과', field: 'department', width: '1fr', align: 'center' },
  { id: 'doctor', label: '진료의', field: 'doctor', width: '130px', align: 'center' },
  { id: 'diagnosis', label: '진단명', field: 'diagnosis', width: '550px', align: 'center' }
]

// 태블릿 카드 렌더링 함수
const renderTabletCard = (item: HistoryItem) => (
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

// 모바일 카드 렌더링 함수 (태블릿과 동일한 구조 사용)
const renderMobileCard = (item: HistoryItem) => (
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

export default function PatientResultPage() {
  const [activeTab, setActiveTab] = useState('history')
  const [period, setPeriod] = useState('1month')
  const [sortOrder, setSortOrder] = useState('newest')
  const [startDate, setStartDate] = useState('2025-04-21')
  const [endDate, setEndDate] = useState('2025-05-21')
  const [searchCategory, setSearchCategory] = useState('all')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isPatientInfoOpen, setIsPatientInfoOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const breadcrumbItems = [
    { label: '홈', href: '/' },
    { label: '마이페이지', href: '/mypage' },
    { label: '의뢰환자 조회', href: '/mypage/patient-inquiry' },
    { label: '수진이력' }
  ]

  return (
    <main className={styles.container}>
      <Breadcrumbs items={breadcrumbItems} />

      <h1 className={styles.pageTitle}>의뢰환자 결과조회</h1>

      <div className={styles.content}>
        {/* 상단 카드 섹션 */}
        <div className={styles.topSection}>
          {/* 의뢰환자 목록 버튼 */}
          <div className={styles.listButtonWrapper}>
            <button type='button' className={styles.listButton}>
              <ListIcon width={24} height={24} />
              <span>의뢰환자 목록</span>
            </button>
          </div>

          {/* 카드 컨테이너 */}
          <div className={styles.cardsContainer}>
            {/* 환자진료정보 카드 */}
            <div className={`${styles.patientInfoCard} ${isPatientInfoOpen ? styles.open : ''}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow}>
                  <h2 className={styles.cardTitle}>환자진료정보</h2>
                  <button
                    type='button'
                    className={styles.toggleButton}
                    onClick={() => setIsPatientInfoOpen(!isPatientInfoOpen)}
                    aria-label={isPatientInfoOpen ? '접기' : '펼치기'}
                  >
                    {isPatientInfoOpen ? <CollapseUpIcon /> : <CollapseDownIcon />}
                  </button>
                </div>
                <div className={styles.cardDivider} />
              </div>
              <div className={styles.patientInfoGrid}>
                <div className={styles.infoRow}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>환자명</span>
                    <div className={styles.infoDivider} />
                    <span className={styles.infoValue}>{patientInfo.name}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>성별</span>
                    <div className={styles.infoDivider} />
                    <span className={styles.infoValue}>{patientInfo.gender}</span>
                  </div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>나이</span>
                    <div className={styles.infoDivider} />
                    <span className={styles.infoValue}>{patientInfo.age}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>최초 의뢰일자</span>
                    <div className={styles.infoDivider} />
                    <span className={styles.infoValue}>{patientInfo.firstReferralDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 검색/조회 카드 */}
            <div className={`${styles.searchCard} ${isSearchOpen ? styles.open : ''}`}>
              <div className={styles.cardHeader}>
                <div className={styles.searchCardTitleWrapper}>
                  <div className={styles.cardTitleRow}>
                    <h2 className={styles.searchCardTitle}>검색/조회</h2>
                    <button
                      type='button'
                      className={styles.toggleButton}
                      onClick={() => setIsSearchOpen(!isSearchOpen)}
                      aria-label={isSearchOpen ? '접기' : '펼치기'}
                    >
                      {isSearchOpen ? <CollapseUpIcon /> : <CollapseDownIcon />}
                    </button>
                  </div>
                  <p className={styles.searchCardSubtitle}>의뢰하신 날짜를 기준으로 1년 동안 조회가 가능합니다.</p>
                </div>
                <div className={styles.cardDivider} />
              </div>

              <div className={styles.searchContent}>
                {/* 조회기간 */}
                <div className={styles.searchField}>
                  <span className={styles.fieldLabel}>조회기간</span>
                  <div className={styles.periodWrapper}>
                    <Radio name='period' options={PERIOD_OPTIONS} value={period} onChange={setPeriod} />
                    <div className={styles.dateRangeGroup}>
                      <div className={styles.dateInput}>
                        <input type='text' value={startDate} onChange={e => setStartDate(e.target.value)} readOnly />
                        <CalendarIcon width={24} height={24} />
                      </div>
                      <span className={styles.dateSeparator}>~</span>
                      <div className={styles.dateInput}>
                        <input type='text' value={endDate} onChange={e => setEndDate(e.target.value)} readOnly />
                        <CalendarIcon width={24} height={24} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 상세검색 */}
                <div className={styles.searchField}>
                  <span className={styles.fieldLabel}>상세검색</span>
                  <div className={styles.searchInputWrapper}>
                    <Select
                      options={SEARCH_CATEGORY_OPTIONS}
                      value={searchCategory}
                      onChange={setSearchCategory}
                      className={styles.searchCategorySelect}
                    />
                    <Input
                      placeholder='진료과, 진료의, 진단명으로 검색하세요.'
                      value={searchKeyword}
                      onChange={e => setSearchKeyword(e.target.value)}
                    />
                    <Button variant='primary'>
                      검색
                      <SearchIcon width={22} height={22} fill='white' />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <TabNavigation tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 수진 이력 섹션 */}
        <div className={styles.historySection}>
          <div className={styles.sectionHeader}>
            <SectionTitle title='수진 이력' />
            <div className={styles.sortRadio}>
              <Radio name='sortOrder' options={SORT_OPTIONS} value={sortOrder} onChange={setSortOrder} />
            </div>
          </div>

          {/* 테이블 */}
          <Table
            columns={historyColumns}
            data={mockHistoryData}
            getRowKey={item => item.id}
            renderTabletCard={renderTabletCard}
            renderMobileCard={renderMobileCard}
          />

          {/* 페이지네이션 */}
          <div className={styles.paginationWrapper}>
            <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>
    </main>
  )
}
