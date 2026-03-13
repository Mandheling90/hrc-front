'use client'

import React, { Suspense, useMemo, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@apollo/client/react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { CardList, CardRow } from '@/components/molecules/CardList/CardList'
import { SearchFilterWithInfo } from '@/components/molecules/SearchFilterWithInfo/SearchFilterWithInfo'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import { BOARD_POSTS_QUERY } from '@/graphql/menu/queries'
import { useMenus } from '@/hooks/useMenus'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import styles from './page.module.scss'

interface BoardPost {
  id: string
  title: string
  content: string
  createdAt: string
  thumbnailUrl: string | null
  isPinned: boolean
  viewCount: number
}

interface BoardPostsData {
  boardPosts: {
    items: BoardPost[]
    totalCount: number
  }
  pinnedPosts: BoardPost[]
}

const ITEMS_PER_PAGE = 10

// boardId가 바뀌면 key가 바뀌어 컴포넌트가 리마운트 → state 자동 초기화, 쿼리 1회만 실행
export default function BoardPage() {
  return (
    <Suspense>
      <BoardPageInner />
    </Suspense>
  )
}

function BoardPageInner() {
  const searchParams = useSearchParams()
  const boardId = searchParams.get('boardId')

  if (!boardId) {
    return (
      <div className={styles.wrap}>
        <Header />
        <main className={styles.main}>
          <div className='container'>
            <div className={styles.empty}>게시판을 찾을 수 없습니다.</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return <BoardContent key={boardId} boardId={boardId} />
}

function BoardContent({ boardId }: { boardId: string }) {
  const router = useHospitalRouter()
  const { menus } = useMenus()

  // 메뉴에서 boardId에 해당하는 게시판 이름 찾기
  const boardTitle = useMemo(() => {
    for (const menu of menus) {
      if (menu.targetBoardId === boardId) return menu.name
      for (const child of menu.children ?? []) {
        if (child.targetBoardId === boardId) return child.name
      }
    }
    return ''
  }, [menus, boardId])

  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isMobile, setIsMobile] = useState(false)

  const categoryOptions = [
    { value: 'all', label: '전체' },
    { value: 'title', label: '제목' },
    { value: 'content', label: '내용' }
  ]

  const { data, loading } = useQuery<BoardPostsData>(BOARD_POSTS_QUERY, {
    variables: {
      boardId,
      pagination: { page: currentPage, limit: ITEMS_PER_PAGE },
      search: submittedSearch || undefined
    },
    fetchPolicy: 'network-only'
  })

  const rawPosts = data?.boardPosts.items ?? []
  const pinnedPosts = data?.pinnedPosts ?? []

  // 프론트단 카테고리 필터링 (서버는 전체 검색, 프론트에서 제목/내용 필터)
  const posts = useMemo(() => {
    if (!submittedSearch || selectedCategory === 'all') return rawPosts
    return rawPosts.filter(post => {
      const query = submittedSearch.toLowerCase()
      if (selectedCategory === 'title') return post.title.toLowerCase().includes(query)
      if (selectedCategory === 'content') return post.content.toLowerCase().includes(query)
      return true
    })
  }, [rawPosts, submittedSearch, selectedCategory])

  const totalCount = data?.boardPosts.totalCount ?? 0
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  // 첫 번째 응답 데이터에 thumbnailUrl이 있는지로 썸네일형 판단
  const isThumbnailType = useMemo(() => {
    return posts.some(p => p.thumbnailUrl)
  }, [posts])

  // 고정글 + 일반글 합치기
  const allPosts = useMemo(() => {
    if (isThumbnailType) return posts
    if (currentPage === 1) {
      const pinnedIds = new Set(pinnedPosts.map(p => p.id))
      const normalPosts = posts.filter(p => !pinnedIds.has(p.id))
      return [...pinnedPosts, ...normalPosts]
    }
    return posts
  }, [posts, pinnedPosts, currentPage, isThumbnailType])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSearch = useCallback(() => {
    setSubmittedSearch(searchQuery)
    setCurrentPage(1)
  }, [searchQuery])

  const handleRowClick = useCallback(
    (item: BoardPost) => {
      router.push(`/board/${item.id}?boardId=${boardId}`)
    },
    [router, boardId]
  )

  const handleCardClick = useCallback(
    (cardIndex: number) => {
      const item = allPosts[cardIndex]
      if (item) handleRowClick(item)
    },
    [allPosts, handleRowClick]
  )

  const formatDate = (dateStr: string) => {
    return dateStr.slice(0, 10)
  }

  // 일반글(비고정)만 역순 번호 매핑
  const rowNumberMap = useMemo(() => {
    const map = new Map<string, number>()
    const normalPosts = allPosts.filter(p => !p.isPinned)
    const startNum = totalCount - (currentPage - 1) * ITEMS_PER_PAGE
    normalPosts.forEach((post, i) => {
      map.set(post.id, startNum - i)
    })
    return map
  }, [allPosts, totalCount, currentPage])

  const columns: TableColumn<BoardPost>[] = useMemo(
    () => [
      {
        id: 'number',
        label: '번호',
        width: '70px',
        align: 'center',
        renderCell: item => {
          if (item.isPinned) {
            return <span className={styles.noticeBadge}>공지</span>
          }
          return <span className={styles.numberText}>{rowNumberMap.get(item.id)}</span>
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
        id: 'createdAt',
        label: '등록일',
        width: '150px',
        align: 'center',
        renderCell: item => <span className={styles.dateText}>{formatDate(item.createdAt)}</span>
      }
    ],
    [rowNumberMap]
  )

  const cardData: CardRow[][] = useMemo(() => {
    return allPosts.map(item => {
      const rows: CardRow[] = []

      if (item.isPinned) {
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
          rightContent: <span className={styles.cardDate}>{formatDate(item.createdAt)}</span>,
          highlighted: false,
          twoLine: false
        }
      )

      return rows
    })
  }, [allPosts])

  const getCardClassName = useCallback(
    (_card: CardRow[], index: number) => {
      const item = allPosts[index]
      return item?.isPinned ? styles.noticeCard : ''
    },
    [allPosts]
  )

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          {boardTitle && <h1 className={styles.pageTitle}>{boardTitle}</h1>}

          {/* 검색 영역 */}
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

          {/* 로딩 */}
          {loading && (
            <div className={styles.tableSection}>
              <Skeleton width='100%' height={48} variant='rounded' count={10} gap={4} />
            </div>
          )}

          {/* 썸네일형 */}
          {!loading && isThumbnailType && (
            <section className={styles.cardGrid} aria-label='게시글 목록'>
              {allPosts.map(item => (
                <button
                  key={item.id}
                  type='button'
                  className={styles.thumbnailCard}
                  onClick={() => handleRowClick(item)}
                >
                  <div className={styles.thumbnailWrapper}>
                    {item.thumbnailUrl ? (
                      <img src={item.thumbnailUrl} alt={item.title} className={styles.thumbnail} />
                    ) : (
                      <div className={styles.thumbnailPlaceholder} />
                    )}
                  </div>
                  <div className={styles.thumbnailContent}>
                    <p className={styles.thumbnailTitle}>{item.title}</p>
                    <p className={styles.thumbnailDate}>{formatDate(item.createdAt)}</p>
                  </div>
                </button>
              ))}

              {!loading && allPosts.length === 0 && <div className={styles.empty}>게시글이 없습니다.</div>}
            </section>
          )}

          {/* 리스트형 */}
          {!loading && !isThumbnailType && (
            <div className={styles.tableSection}>
              {!isMobile ? (
                <Table
                  columns={columns}
                  data={allPosts}
                  getRowKey={item => item.id}
                  onRowClick={handleRowClick}
                  className={styles.boardTable}
                  enableHoverStyle
                />
              ) : (
                <CardList
                  cards={cardData}
                  getCardKey={(_card, index) => allPosts[index]?.id || index}
                  onCardClick={handleCardClick}
                  getCardClassName={getCardClassName}
                  className={styles.cardList}
                />
              )}

              {!loading && allPosts.length === 0 && <div className={styles.empty}>게시글이 없습니다.</div>}
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
