'use client'

import React, { useState } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { Radio } from '@/components/atoms/Radio/Radio'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'
import { TabNavigation, TabItem } from '@/components/molecules/TabNavigation'
import { ListIcon } from '@/components/icons/ListIcon'
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

// Mock 환자 정보
const patientInfo = {
  name: '김*환',
  gender: '남',
  age: 52,
  firstReferralDate: '2017-09-13'
}

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

export default function PatientResultPage() {
  const [activeTab, setActiveTab] = useState('history')
  const [sortOrder, setSortOrder] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)

  const breadcrumbItems = [
    { label: '홈', href: '/' },
    { label: '마이페이지', href: '/mypage' },
    { label: '의뢰환자 조회', href: '/mypage/patient-inquiry' },
    { label: '수진이력' }
  ]

  // 탭 컨텐츠 렌더링
  const renderTabContent = () => {
    switch (activeTab) {
      case 'history':
        return <HistoryTab />
      case 'diagnostic':
        return <DiagnosticTab />
      case 'pathology':
        return <PathologyTab />
      case 'imaging':
        return <ImagingTab />
      case 'endoscopy':
        return <EndoscopyTab />
      case 'other':
        return <OtherExamTab />
      case 'prescription':
        return <PrescriptionTab />
      default:
        // 아직 구현되지 않은 탭은 수진이력 탭을 표시
        return <HistoryTab />
    }
  }

  return (
    <>
      <Header />
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
              <PatientInfoCard patientInfo={patientInfo} />
              <SearchCard />
            </div>
          </div>

          {/* 탭 네비게이션 */}
          <TabNavigation tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 컨텐츠 섹션 */}
          <div className={styles.historySection}>
            <div className={styles.sectionHeader}>
              <SectionTitle title={TAB_TITLES[activeTab] || '수진 이력'} />
              <div className={styles.sortRadio}>
                <Radio name='sortOrder' options={SORT_OPTIONS} value={sortOrder} onChange={setSortOrder} />
              </div>
            </div>

            {/* 탭 컨텐츠 */}
            {renderTabContent()}

            {/* 페이지네이션 */}
            <div className={styles.paginationWrapper}>
              <Pagination currentPage={currentPage} totalPages={5} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
