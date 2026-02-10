'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { CardList, CardRow } from '@/components/molecules/CardList/CardList'
import { SearchFilterWithInfo } from '@/components/molecules/SearchFilterWithInfo/SearchFilterWithInfo'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import styles from './page.module.scss'

// 병원소식 데이터 타입
interface NoticeData {
  id: string
  number: number | 'notice'
  title: string
  registeredDate: string
  isNotice: boolean
}

// 임시 데이터
const mockNotices: NoticeData[] = [
  {
    id: 'notice-1',
    number: 'notice',
    title: '【진료의뢰-회송시범사업】중계포털 의뢰서 작성 방법 안내',
    registeredDate: '2025-11-25',
    isNotice: true
  },
  {
    id: 'notice-2',
    number: 'notice',
    title: '고려대학교 안암병원 협력병·의원장 무료주차 서비스 변경 안내',
    registeredDate: '2025-08-13',
    isNotice: true
  },
  {
    id: '3',
    number: 84,
    title: '2025년 12월 외래진료 시간표입니다.',
    registeredDate: '2025-12-01',
    isNotice: false
  },
  {
    id: '4',
    number: 83,
    title: '2025년 11월 외래진료 시간표입니다.',
    registeredDate: '2025-11-01',
    isNotice: false
  },
  {
    id: '5',
    number: 82,
    title: '2025년 10월 외래진료 시간표입니다.',
    registeredDate: '2025-10-01',
    isNotice: false
  },
  {
    id: '6',
    number: 81,
    title: '2025년 9월 외래진료 시간표입니다.',
    registeredDate: '2025-09-01',
    isNotice: false
  },
  {
    id: '7',
    number: 80,
    title: '2025년 8월 외래진료 시간표입니다.',
    registeredDate: '2025-08-01',
    isNotice: false
  },
  {
    id: '8',
    number: 79,
    title: '2025년 7월 외래진료 시간표입니다.',
    registeredDate: '2025-07-01',
    isNotice: false
  },
  {
    id: '9',
    number: 78,
    title: '2025년 6월 외래진료 시간표입니다.',
    registeredDate: '2025-06-01',
    isNotice: false
  },
  {
    id: '10',
    number: 77,
    title:
      'Norem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    registeredDate: '2025-05-01',
    isNotice: false
  },
  {
    id: '11',
    number: 76,
    title: '2025년 5월 외래진료 시간표입니다.',
    registeredDate: '2025-04-01',
    isNotice: false
  },
  {
    id: '12',
    number: 75,
    title: '2025년 4월 외래진료 시간표입니다.',
    registeredDate: '2025-03-01',
    isNotice: false
  },
  {
    id: '13',
    number: 74,
    title: '2025년 3월 외래진료 시간표입니다.',
    registeredDate: '2025-02-01',
    isNotice: false
  },
  {
    id: '14',
    number: 73,
    title: '2025년 2월 외래진료 시간표입니다.',
    registeredDate: '2025-01-01',
    isNotice: false
  },
  {
    id: '15',
    number: 72,
    title: '2025년 1월 외래진료 시간표입니다.',
    registeredDate: '2024-12-01',
    isNotice: false
  },
  {
    id: '16',
    number: 71,
    title: '2024년 12월 외래진료 시간표입니다.',
    registeredDate: '2024-11-01',
    isNotice: false
  },
  {
    id: '17',
    number: 70,
    title: '2024년 11월 외래진료 시간표입니다.',
    registeredDate: '2024-10-01',
    isNotice: false
  },
  {
    id: '18',
    number: 69,
    title: '2024년 10월 외래진료 시간표입니다.',
    registeredDate: '2024-09-01',
    isNotice: false
  },
  {
    id: '19',
    number: 68,
    title: '2024년 9월 외래진료 시간표입니다.',
    registeredDate: '2024-08-01',
    isNotice: false
  },
  {
    id: '20',
    number: 67,
    title: '2024년 8월 외래진료 시간표입니다.',
    registeredDate: '2024-07-01',
    isNotice: false
  },
  {
    id: '21',
    number: 66,
    title: '2024년 7월 외래진료 시간표입니다.',
    registeredDate: '2024-06-01',
    isNotice: false
  },
  {
    id: '22',
    number: 65,
    title: '2024년 6월 외래진료 시간표입니다.',
    registeredDate: '2024-05-01',
    isNotice: false
  },
  {
    id: '23',
    number: 64,
    title: '2024년 5월 외래진료 시간표입니다.',
    registeredDate: '2024-04-01',
    isNotice: false
  },
  {
    id: '24',
    number: 63,
    title: '2024년 4월 외래진료 시간표입니다.',
    registeredDate: '2024-03-01',
    isNotice: false
  },
  {
    id: '25',
    number: 62,
    title: '2024년 3월 외래진료 시간표입니다.',
    registeredDate: '2024-02-01',
    isNotice: false
  },
  {
    id: '26',
    number: 61,
    title: '2024년 2월 외래진료 시간표입니다.',
    registeredDate: '2024-01-01',
    isNotice: false
  },
  {
    id: '27',
    number: 60,
    title: '2024년 1월 외래진료 시간표입니다.',
    registeredDate: '2023-12-01',
    isNotice: false
  },
  {
    id: '28',
    number: 59,
    title: '2023년 12월 외래진료 시간표입니다.',
    registeredDate: '2023-11-01',
    isNotice: false
  },
  {
    id: '29',
    number: 58,
    title: '2023년 11월 외래진료 시간표입니다.',
    registeredDate: '2023-10-01',
    isNotice: false
  },
  {
    id: '30',
    number: 57,
    title: '2023년 10월 외래진료 시간표입니다.',
    registeredDate: '2023-09-01',
    isNotice: false
  }
]

// 카테고리 옵션
const categoryOptions = [
  { value: 'all', label: '전체' },
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' }
]

export default function NoticeListPage() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const itemsPerPage = 10

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 필터링 및 검색
  const filteredData = useMemo(() => {
    let filtered = mockNotices

    // 검색어 필터 (카테고리별 검색 범위)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      if (selectedCategory === 'title') {
        filtered = filtered.filter(item => item.title.toLowerCase().includes(query))
      } else if (selectedCategory === 'content') {
        // TODO: content 필드 추가 후 내용 검색 구현
        filtered = filtered.filter(item => item.title.toLowerCase().includes(query))
      } else {
        // 전체: 제목 + 내용 모두 검색
        filtered = filtered.filter(item => item.title.toLowerCase().includes(query))
      }
    }

    return filtered
  }, [selectedCategory, searchQuery])

  // 페이지네이션
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage, itemsPerPage])

  // 테이블 컬럼 정의
  const columns: TableColumn<NoticeData>[] = useMemo(
    () => [
      {
        id: 'number',
        label: '번호',
        width: '70px',
        align: 'center',
        renderCell: item => {
          if (item.isNotice) {
            return <span className={styles.noticeBadge}>공지</span>
          }
          return <span className={styles.numberText}>{item.number}</span>
        }
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
    // 검색 로직은 이미 필터링에 포함됨
    setCurrentPage(1) // 검색 시 첫 페이지로 이동
  }

  const handleRowClick = (item: NoticeData) => {
    router.push(`/notice/news/${item.id}`)
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
      const rows: CardRow[] = []

      if (item.isNotice) {
        rows.push({
          id: 'notice',
          leftContent: <span className={styles.noticeBadge}>공지</span>,
          rightContent: null
        })
      }

      rows.push(
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
      )

      return rows
    })
  }, [paginatedData])

  const getCardClassName = (card: CardRow[], index: number) => {
    const item = paginatedData[index]
    return item?.isNotice ? styles.noticeCard : ''
  }

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
            {!isMobile ? (
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
                getCardKey={(card, index) => paginatedData[index]?.id || index}
                onCardClick={handleCardClick}
                getCardClassName={getCardClassName}
                className={styles.cardList}
              />
            )}
          </div>

          {/* 페이지네이션 */}
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
