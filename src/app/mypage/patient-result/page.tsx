'use client'

import React, { useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { TabNavigation, TabItem } from '@/components/molecules/TabNavigation'
import { ListIcon } from '@/components/icons/ListIcon'
import { useHospital, useHospitalRouter } from '@/hooks'
import {
  PatientInfoCard,
  SearchCard,
  HistoryTab,
  DiagnosticTab,
  PathologyTab,
  ImagingTab,
  EndoscopyTab,
  OtherExamTab,
  PrescriptionTab
} from './components'
import type { SearchFilter } from './components/SearchCard/SearchCard'
import styles from './page.module.scss'

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

// 정렬 옵션
const SORT_OPTIONS = [
  { value: 'newest', label: '최신 순' },
  { value: 'oldest', label: '오래된 순' }
]

// 탭별 제목 매핑
const TAB_TITLES: Record<string, string> = {
  history: '수진 이력',
  diagnostic: '진단검사',
  pathology: '병리검사',
  imaging: '영상검사',
  endoscopy: '내시경검사',
  other: '기타검사',
  prescription: '약 처방 내역'
}

// 탭별 안내 문구 (영상검사, 내시경검사, 기타검사)
const TAB_NOTICES: Record<string, string> = {
  imaging: '등록된 이미지는 3개월만 열람이 가능합니다.',
  endoscopy: '등록된 이미지는 3개월만 열람이 가능합니다.',
  other: '등록된 이미지는 3개월만 열람이 가능합니다.'
}

const PAGE_SIZE = 10

export default function PatientResultPage() {
  const searchParams = useSearchParams()
  const { hospitalId } = useHospital()
  const hospitalCode = hospitalId.toUpperCase()

  const ptntNo = searchParams.get('patientNo') ?? ''
  const mcdpCd = searchParams.get('mcdpCd') ?? ''
  const visitDate = searchParams.get('visitDate') ?? '' // YYYY-MM-DD
  const visitDateCompact = visitDate.replace(/-/g, '') // YYYYMMDD

  const patientInfo = {
    name: searchParams.get('patientName') ?? '-',
    gender: searchParams.get('gender') ?? '-',
    age: Number(searchParams.get('age')) || 0,
    firstReferralDate: searchParams.get('referralDate') ?? '-'
  }

  const router = useHospitalRouter()

  const [activeTab, setActiveTab] = useState('history')
  const [sortOrder, setSortOrder] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalFilteredCount, setTotalFilteredCount] = useState(0)
  const [searchFilter, setSearchFilter] = useState<SearchFilter | null>(null)

  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / PAGE_SIZE))

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setCurrentPage(1)
    setSearchFilter(null)
  }

  const handleSearch = useCallback((filter: SearchFilter) => {
    setSearchFilter(filter)
    setCurrentPage(1)
  }, [])

  const handleSortChange = (value: string) => {
    setSortOrder(value)
    setCurrentPage(1)
  }

  const handleTotalCountChange = useCallback((count: number) => {
    setTotalFilteredCount(count)
  }, [])

  // 탭 컨텐츠 렌더링
  const renderTabContent = () => {
    const commonProps = {
      sortOrder,
      searchFilter,
      currentPage,
      pageSize: PAGE_SIZE,
      onTotalCountChange: handleTotalCountChange
    }

    switch (activeTab) {
      case 'history':
        return (
          <HistoryTab
            hospitalCode={hospitalCode}
            ptntNo={ptntNo}
            mcdpCd={mcdpCd || undefined}
            {...commonProps}
          />
        )
      case 'diagnostic':
        return <DiagnosticTab hospitalCode={hospitalCode} ptntNo={ptntNo} mcdpCd={mcdpCd || undefined} {...commonProps} />
      case 'pathology':
        return <PathologyTab hospitalCode={hospitalCode} ptntNo={ptntNo} {...commonProps} />
      case 'imaging':
        return <ImagingTab hospitalCode={hospitalCode} ptntNo={ptntNo} {...commonProps} />
      case 'endoscopy':
        return <EndoscopyTab hospitalCode={hospitalCode} ptntNo={ptntNo} {...commonProps} />
      case 'other':
        return <OtherExamTab hospitalCode={hospitalCode} ptntNo={ptntNo} {...commonProps} />
      case 'prescription':
        return <PrescriptionTab hospitalCode={hospitalCode} ptntNo={ptntNo} mdcrDt={visitDateCompact} {...commonProps} />
      default:
        return (
          <HistoryTab
            hospitalCode={hospitalCode}
            ptntNo={ptntNo}
            mcdpCd={mcdpCd || undefined}
            {...commonProps}
          />
        )
    }
  }

  return (
    <>
      <Header />
      <main className={styles.container}>
        <h1 className={styles.pageTitle}>의뢰환자 결과조회</h1>

        <div className={styles.content}>
          {/* 상단 카드 섹션 */}
          <div className={styles.topSection}>
            {/* 의뢰환자 목록 버튼 */}
            <div className={styles.listButtonWrapper}>
              <button type='button' className={styles.listButton} onClick={() => router.push('/mypage/patient-inquiry')}>
                <ListIcon width={24} height={24} />
                <span>의뢰환자 목록</span>
              </button>
            </div>

            {/* 카드 컨테이너 */}
            <div className={styles.cardsContainer}>
              <PatientInfoCard patientInfo={patientInfo} />
              <SearchCard onSearch={handleSearch} />
            </div>
          </div>

          {/* 탭 네비게이션 */}
          <TabNavigation tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />

          {/* 컨텐츠 섹션 */}
          <div className={styles.historySection}>
            <SectionTitle title={TAB_TITLES[activeTab] || '수진 이력'} noMargin />
            <div className={styles.sectionSubHeader}>
              {TAB_NOTICES[activeTab] ? (
                <p className={styles.tabNotice}>
                  <span className={styles.noticeIcon}>i</span>
                  {TAB_NOTICES[activeTab]}
                </p>
              ) : (
                <div />
              )}
              <div className={styles.sortRadio}>
                <Radio name='sortOrder' options={SORT_OPTIONS} value={sortOrder} onChange={handleSortChange} />
              </div>
            </div>

            {/* 탭 컨텐츠 */}
            {renderTabContent()}

            {/* 페이지네이션 */}
            {totalFilteredCount > PAGE_SIZE && (
              <div className={styles.paginationWrapper}>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
