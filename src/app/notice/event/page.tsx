'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useHospital } from '@/hooks'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { CardList, CardRow } from '@/components/molecules/CardList/CardList'
import { SearchFilterWithInfo } from '@/components/molecules/SearchFilterWithInfo/SearchFilterWithInfo'
import { Input } from '@/components/atoms/Input/Input'
import { SearchIcon } from '@/components/icons/SearchIcon'
import styles from './page.module.scss'

// 썸네일형 데이터 타입 (구로)
interface EducationEventNotice {
  id: string
  title: string
  registeredDate: string
  thumbnail: string
}

// 게시판형 데이터 타입 (안암/안산)
interface EducationEventBoardData {
  id: string
  number: number
  title: string
  registeredDate: string
}

// 썸네일형 더미 데이터 (구로)
const mockEducationEvents: EducationEventNotice[] = [
  {
    id: '1',
    title: '고려대 안암병원–서울시복지재단, 가족돌봄청소년·청년 건강·자립 지원 업무협약 체결',
    registeredDate: '2025-12-18',
    thumbnail: '/assets/images/img-1.png'
  },
  {
    id: '2',
    title: "고려대의료원, 유튜브 채널 '고대병원' 구독자 100만 돌파 기념 대규모 감사 이벤트 개최",
    registeredDate: '2025-12-15',
    thumbnail: '/assets/images/img-2.png'
  },
  {
    id: '3',
    title: '최종일 교수, 보건복지부 장관표창 수상',
    registeredDate: '2025-12-15',
    thumbnail: '/assets/images/img-3.png'
  },
  {
    id: '4',
    title: '강석호 교수, 필리핀 비뇨의학회에서 원격 라이브서저리 시연',
    registeredDate: '2025-12-08',
    thumbnail: '/assets/images/img-4.png'
  },
  {
    id: '5',
    title: '박영빈 교수, 아시아-오세아니아 임상신경생리학회 우수 포스터상 수상',
    registeredDate: '2025-12-08',
    thumbnail: '/assets/images/img-5.png'
  },
  {
    id: '6',
    title: '2025 K-STAR 심포지엄 성료 - 성별 차이 반영한 심혈관질환 진료 표준 모색',
    registeredDate: '2025-12-01',
    thumbnail: '/assets/images/img-6.png'
  },
  {
    id: '7',
    title: '김병준, 유성혜 교수팀 대한신경두경부영상의학회 우수논문상 수상',
    registeredDate: '2025-11-25',
    thumbnail: '/assets/images/img-7.png'
  },
  {
    id: '8',
    title: '고영윤, 박종웅 교수팀, 대한정형외과학회 \u2018포스터 전시 우수상\u2019 수상',
    registeredDate: '2025-11-24',
    thumbnail: '/assets/images/img-8.png'
  },
  {
    id: '9',
    title: '홍석하, 한승범 교수팀, 대한정형외과학회 \u2018포스터 전시 장려상\u2019 수상',
    registeredDate: '2025-11-24',
    thumbnail: '/assets/images/img.png'
  },
  {
    id: '10',
    title: '고려대 안암병원–서울시복지재단, 가족돌봄청소년·청년 건강·자립 지원 업무협약 체결',
    registeredDate: '2025-12-18',
    thumbnail: '/assets/images/img-1.png'
  },
  {
    id: '11',
    title: "고려대의료원, 유튜브 채널 '고대병원' 구독자 100만 돌파 기념 대규모 감사 이벤트 개최",
    registeredDate: '2025-12-15',
    thumbnail: '/assets/images/img-2.png'
  },
  {
    id: '12',
    title: '최종일 교수, 보건복지부 장관표창 수상',
    registeredDate: '2025-12-15',
    thumbnail: '/assets/images/img-3.png'
  },
  {
    id: '13',
    title: '강석호 교수, 필리핀 비뇨의학회에서 원격 라이브서저리 시연',
    registeredDate: '2025-12-08',
    thumbnail: '/assets/images/img-4.png'
  },
  {
    id: '14',
    title: '박영빈 교수, 아시아-오세아니아 임상신경생리학회 우수 포스터상 수상',
    registeredDate: '2025-12-08',
    thumbnail: '/assets/images/img-5.png'
  },
  {
    id: '15',
    title: '2025 K-STAR 심포지엄 성료 - 성별 차이 반영한 심혈관질환 진료 표준 모색',
    registeredDate: '2025-12-01',
    thumbnail: '/assets/images/img-6.png'
  },
  {
    id: '16',
    title: '김병준, 유성혜 교수팀 대한신경두경부영상의학회 우수논문상 수상',
    registeredDate: '2025-11-25',
    thumbnail: '/assets/images/img-7.png'
  },
  {
    id: '17',
    title: '고영윤, 박종웅 교수팀, 대한정형외과학회 \u2018포스터 전시 우수상\u2019 수상',
    registeredDate: '2025-11-24',
    thumbnail: '/assets/images/img-8.png'
  },
  {
    id: '18',
    title: '홍석하, 한승범 교수팀, 대한정형외과학회 \u2018포스터 전시 장려상\u2019 수상',
    registeredDate: '2025-11-24',
    thumbnail: '/assets/images/img.png'
  }
]

// 게시판형 더미 데이터 (안암/안산)
const mockBoardEvents: EducationEventBoardData[] = [
  { id: '1', number: 25, title: '2026년 1분기 협력병의원 대상 교육 안내', registeredDate: '2026-02-20' },
  { id: '2', number: 24, title: '2025년 연말 진료협력 워크숍 개최 안내', registeredDate: '2026-01-15' },
  { id: '3', number: 23, title: '협력병의원 실무자 대상 전자의뢰시스템 교육 안내', registeredDate: '2025-12-18' },
  { id: '4', number: 22, title: '2025년 하반기 협력병의원장 초청 세미나 안내', registeredDate: '2025-12-01' },
  { id: '5', number: 21, title: '진료의뢰·회송 시범사업 설명회 개최 안내', registeredDate: '2025-11-25' },
  { id: '6', number: 20, title: '2025 심혈관질환 최신지견 공동학술대회 안내', registeredDate: '2025-11-15' },
  { id: '7', number: 19, title: '협력병의원 대상 감염관리 교육 프로그램 안내', registeredDate: '2025-11-01' },
  { id: '8', number: 18, title: '2025 통합의료 심포지엄 참가 안내', registeredDate: '2025-10-20' },
  { id: '9', number: 17, title: '협력의원 원장 대상 최신 암 치료 워크숍 안내', registeredDate: '2025-10-08' },
  { id: '10', number: 16, title: '진료협력센터 개소 기념 학술대회 안내', registeredDate: '2025-09-25' },
  { id: '11', number: 15, title: '2025년 상반기 협력병의원 CPR 교육 안내', registeredDate: '2025-09-01' },
  { id: '12', number: 14, title: '재활의학 연수 프로그램 참가 안내', registeredDate: '2025-08-15' },
  { id: '13', number: 13, title: '2025 소화기내과 공동 학술 심포지엄 안내', registeredDate: '2025-08-01' },
  { id: '14', number: 12, title: '협력병의원 대상 의료정보 보안 교육 안내', registeredDate: '2025-07-20' },
  { id: '15', number: 11, title: '2025년 상반기 협력병의원장 초청 간담회 안내', registeredDate: '2025-07-01' },
  { id: '16', number: 10, title: '호흡기질환 최신 치료 동향 세미나 안내', registeredDate: '2025-06-15' },
  { id: '17', number: 9, title: '당뇨병 관리 공동 워크숍 개최 안내', registeredDate: '2025-06-01' },
  { id: '18', number: 8, title: '2025년 1분기 협력병의원 교육 결과 보고회 안내', registeredDate: '2025-05-15' },
  { id: '19', number: 7, title: '협력병의원 대상 응급처치 실습 교육 안내', registeredDate: '2025-05-01' },
  { id: '20', number: 6, title: '의료기기 안전관리 합동교육 안내', registeredDate: '2025-04-15' },
  { id: '21', number: 5, title: '2025년 춘계 학술대회 참가 안내', registeredDate: '2025-04-01' },
  { id: '22', number: 4, title: '진료의뢰 시스템 개편 설명회 안내', registeredDate: '2025-03-15' },
  { id: '23', number: 3, title: '2025년 1분기 협력병의원 대상 교육 안내', registeredDate: '2025-03-01' },
  { id: '24', number: 2, title: '협력병의원 신규 등록 절차 설명회 안내', registeredDate: '2025-02-15' },
  { id: '25', number: 1, title: '2025년도 진료협력센터 사업계획 안내', registeredDate: '2025-02-01' }
]

// 게시판 검색 카테고리 옵션
const categoryOptions = [
  { value: 'all', label: '전체' },
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' }
]

export default function NoticeEducationEventPage() {
  const router = useHospitalRouter()
  const { isGuro } = useHospital()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isMobile, setIsMobile] = useState(false)

  // 구로는 썸네일, 안암/안산은 게시판
  const useThumbnailLayout = isGuro

  const itemsPerPage = useThumbnailLayout ? 9 : 10

  // 모바일 감지 (게시판형에서 Table/CardList 전환용)
  useEffect(() => {
    if (useThumbnailLayout) return
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [useThumbnailLayout])

  // 썸네일형 필터링
  const filteredThumbnailData = useMemo(() => {
    if (!useThumbnailLayout) return []
    if (!searchQuery.trim()) return mockEducationEvents
    const query = searchQuery.toLowerCase()
    return mockEducationEvents.filter(item => item.title.toLowerCase().includes(query))
  }, [searchQuery, useThumbnailLayout])

  // 게시판형 필터링
  const filteredBoardData = useMemo(() => {
    if (useThumbnailLayout) return []
    if (!searchQuery.trim()) return mockBoardEvents
    const query = searchQuery.toLowerCase()
    if (selectedCategory === 'title') {
      return mockBoardEvents.filter(item => item.title.toLowerCase().includes(query))
    }
    // 전체 및 내용 검색 (TODO: content 필드 추가 후)
    return mockBoardEvents.filter(item => item.title.toLowerCase().includes(query))
  }, [searchQuery, selectedCategory, useThumbnailLayout])

  const filteredData = useThumbnailLayout ? filteredThumbnailData : filteredBoardData
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  // 썸네일형 페이지네이션
  const paginatedThumbnailData = useMemo(() => {
    if (!useThumbnailLayout) return []
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredThumbnailData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredThumbnailData, currentPage, itemsPerPage, useThumbnailLayout])

  // 게시판형 페이지네이션
  const paginatedBoardData = useMemo(() => {
    if (useThumbnailLayout) return []
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredBoardData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredBoardData, currentPage, itemsPerPage, useThumbnailLayout])

  const handleSearch = () => {
    setCurrentPage(1)
  }

  const handleThumbnailCardClick = (item: EducationEventNotice) => {
    router.push(`/notice/list/${item.id}`)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    handleSearch()
  }

  // 게시판형 테이블 컬럼
  const boardColumns: TableColumn<EducationEventBoardData>[] = useMemo(
    () => [
      {
        id: 'number',
        label: '번호',
        width: '70px',
        align: 'center',
        renderCell: item => <span className={styles.numberText}>{item.number}</span>
      },
      {
        id: 'title',
        label: '제목',
        width: '1fr',
        align: 'left',
        textOverflow: 'ellipsis',
        renderCell: item => <span className={styles.titleText}>{item.title}</span>
      },
      {
        id: 'registeredDate',
        label: '등록일',
        width: '150px',
        align: 'center',
        renderCell: item => <span className={styles.dateText}>{item.registeredDate}</span>
      }
    ],
    []
  )

  const handleBoardRowClick = (item: EducationEventBoardData) => {
    router.push(`/notice/list/${item.id}`)
  }

  const handleBoardCardClick = (cardIndex: number) => {
    const item = paginatedBoardData[cardIndex]
    if (item) {
      handleBoardRowClick(item)
    }
  }

  // 게시판형 모바일 카드 데이터
  const boardCardData: CardRow[][] = useMemo(() => {
    return paginatedBoardData.map(item => [
      {
        id: 'title',
        leftContent: (
          <div className={styles.boardCardTitleWrapper}>
            <span className={styles.boardCardTitle}>{item.title}</span>
          </div>
        ),
        rightContent: null,
        highlighted: false,
        twoLine: false
      },
      {
        id: 'date',
        leftContent: null,
        rightContent: <span className={styles.boardCardDate}>{item.registeredDate}</span>,
        highlighted: false,
        twoLine: false
      }
    ])
  }, [paginatedBoardData])

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>교육 / 행사</h1>

          {/* 검색 영역: 썸네일형은 단순 검색, 게시판형은 카테고리+검색 */}
          {useThumbnailLayout ? (
            <form className={styles.searchSection} onSubmit={handleSubmit}>
              <div className={styles.searchField}>
                <div className={styles.searchInput}>
                  <Input
                    placeholder='검색어를 입력해주세요.'
                    value={searchQuery}
                    onChange={event => setSearchQuery(event.target.value)}
                    aria-label='교육 / 행사 검색'
                  />
                </div>
                <button type='submit' className={styles.searchButton} aria-label='검색'>
                  <SearchIcon width={24} height={24} />
                </button>
              </div>
            </form>
          ) : (
            <SearchFilterWithInfo
              selectOptions={categoryOptions}
              selectValue={selectedCategory}
              onSelectChange={setSelectedCategory}
              selectWidth={180}
              searchPlaceholder='검색어를 입력해주세요.'
              searchValue={searchQuery}
              onSearchValueChange={setSearchQuery}
              onSearch={handleSearch}
              searchFieldWidth={480}
            />
          )}

          {/* 썸네일형 카드 레이아웃 (구로) */}
          {useThumbnailLayout && (
            <section className={styles.cardGrid} aria-label='교육 및 행사 목록'>
              {paginatedThumbnailData.map(item => (
                <button key={item.id} type='button' className={styles.card} onClick={() => handleThumbnailCardClick(item)}>
                  <div className={styles.thumbnailWrapper}>
                    <img src={item.thumbnail} alt={item.title} className={styles.thumbnail} />
                  </div>
                  <div className={styles.cardContent}>
                    <p className={styles.cardTitle}>{item.title}</p>
                    <p className={styles.cardDate}>{item.registeredDate}</p>
                  </div>
                </button>
              ))}

              {paginatedThumbnailData.length === 0 && <div className={styles.emptyState}>검색 결과가 없습니다.</div>}
            </section>
          )}

          {/* 게시판형 테이블/카드 레이아웃 (안암/안산) */}
          {!useThumbnailLayout && (
            <div className={styles.tableSection}>
              {!isMobile ? (
                <Table
                  columns={boardColumns}
                  data={paginatedBoardData}
                  getRowKey={item => item.id}
                  onRowClick={handleBoardRowClick}
                  className={styles.boardTable}
                  enableHoverStyle
                />
              ) : (
                <CardList
                  cards={boardCardData}
                  getCardKey={(card, index) => paginatedBoardData[index]?.id || index}
                  onCardClick={handleBoardCardClick}
                  className={styles.boardCardList}
                />
              )}

              {paginatedBoardData.length === 0 && <div className={styles.emptyState}>검색 결과가 없습니다.</div>}
            </div>
          )}

          {totalPages > 0 && (
            <div className={styles.paginationWrapper}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                maxVisiblePages={5}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
