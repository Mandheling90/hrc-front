'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useHospitalNews } from '@/hooks/useHospitalNews'
import { getHospitalFromPath } from '@/utils/hospital'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { CardList, CardRow } from '@/components/molecules/CardList/CardList'
import { SearchFilterWithInfo } from '@/components/molecules/SearchFilterWithInfo/SearchFilterWithInfo'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import styles from './page.module.scss'

interface NoticeData {
  id: string
  number: number
  title: string
  registeredDate: string
  linkUrl: string | null
}

// 카테고리 옵션
const categoryOptions = [
  { value: 'all', label: '전체' },
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' }
]

export default function NoticeListPage() {
  const router = useHospitalRouter()
  const pathname = usePathname()
  const hospitalId = getHospitalFromPath(pathname)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const itemsPerPage = 10

  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const { articles, totalCount, loading } = useHospitalNews(itemsPerPage, startIndex)

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // API 데이터를 NoticeData로 변환
  const paginatedData: NoticeData[] = useMemo(() => {
    return articles.map(article => ({
      id: String(article.articleNo),
      number: article.articleNo,
      title: article.title,
      registeredDate: article.createdDt.split('T')[0],
      linkUrl: article.linkUrl
    }))
  }, [articles])

  // API의 totalCount가 0을 반환하므로, articles 개수로 다음 페이지 존재 여부를 판단
  const hasNextPage = articles.length === itemsPerPage
  const totalPages = hasNextPage ? currentPage + 1 : currentPage

  // 테이블 컬럼 정의
  const columns: TableColumn<NoticeData>[] = useMemo(
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

  const handleSearch = () => {
    setCurrentPage(1)
  }

  const handleRowClick = (item: NoticeData) => {
    if (hospitalId === 'anam' || hospitalId === 'guro' || hospitalId === 'ansan') {
      window.open(
        `https://${hospitalId}.kumc.or.kr/kr/B022/view.do?article=${item.id}`,
        '_blank',
        'noopener,noreferrer'
      )
    } else if (item.linkUrl) {
      window.open(item.linkUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCardClick = (cardIndex: number) => {
    const item = paginatedData[cardIndex]
    if (item) {
      handleRowClick(item)
    }
  }

  // 모바일용 카드 데이터 변환
  const cardData: CardRow[][] = useMemo(() => {
    return paginatedData.map(item => {
      const rows: CardRow[] = [
        {
          id: 'title',
          leftContent: (
            <div className={styles.cardTitleWrapper}>
              <span className={styles.cardTitle}>{item.title}</span>
            </div>
          ),
          rightContent: null,
          highlighted: false,
          twoLine: false
        },
        {
          id: 'date',
          leftContent: null,
          rightContent: <span className={styles.cardDate}>{item.registeredDate}</span>,
          highlighted: false,
          twoLine: false
        }
      ]

      return rows
    })
  }, [paginatedData])

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>병원소식</h1>

          {/* 검색 및 필터 영역 */}
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

          {/* 데스크톱/태블릿: 테이블, 모바일: 카드 */}
          <div className={styles.tableSection}>
            {loading ? (
              <div className={styles.skeletonWrapper}>
                {Array.from({ length: itemsPerPage }, (_, i) => (
                  <div key={i} className={styles.skeletonRow}>
                    <Skeleton width={50} height={20} variant='text' />
                    <Skeleton width='100%' height={20} variant='text' />
                    <Skeleton width={120} height={20} variant='text' />
                  </div>
                ))}
              </div>
            ) : !isMobile ? (
              <Table
                columns={columns}
                data={paginatedData}
                getRowKey={item => item.id}
                onRowClick={handleRowClick}
                className={styles.noticeTable}
                enableHoverStyle
              />
            ) : (
              <CardList
                cards={cardData}
                getCardKey={(card, index) => paginatedData[index]?.id || String(index)}
                onCardClick={handleCardClick}
                className={styles.cardList}
              />
            )}
          </div>

          {/* 페이지네이션 */}
          {paginatedData.length > 0 && (
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
