'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { CONSULTANT_ASSIGNED_ECONSULTS_QUERY } from '@/graphql/econsult/queries'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { StatusBadge } from '@/components/atoms/StatusBadge/StatusBadge'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import { CardList } from '@/components/molecules/CardList/CardList'
import { SearchFilterWithInfo } from '@/components/molecules/SearchFilterWithInfo/SearchFilterWithInfo'
import { Skeleton } from '@/components/atoms/Skeleton/Skeleton'
import styles from './page.module.scss'

// API 응답 타입
interface ConsultantAssignedEConsultsData {
  consultantAssignedEConsults: {
    items: {
      id: string
      title: string
      status: string
      createdAt: string
      answeredAt?: string
      requester?: {
        id: string
        userName?: string
        email?: string
        phone?: string
        profile?: { hospName?: string }
      }
      consultant?: {
        id: string
        name?: string
        department?: string
        specialty?: string
        email?: string
      }
    }[]
    totalCount: number
    hasNextPage: boolean
  }
}

// e-Consult 데이터 타입
interface EConsultData {
  id: string
  number: number
  title: string
  applicant: string
  hospitalName: string
  department: string
  status: 'waiting' | 'expired' | 'completed'
  registeredDate: string
}

/** 날짜 포맷 (YYYY-MM-DD) */
const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// 답변 상태 옵션
const statusOptions = [
  { value: 'all', label: '답변 상태(전체)' },
  { value: 'waiting', label: '답변 대기' },
  { value: 'expired', label: '기간 만료' },
  { value: 'completed', label: '답변 완료' }
]

/** 상태 필터값 → API EConsultStatus 변환 */
const statusFilterMap: Record<string, string | undefined> = {
  all: undefined,
  waiting: 'PENDING',
  expired: 'EXPIRED',
  completed: 'ANSWERED'
}

/** API 상태 → UI 상태 변환 */
const mapApiStatus = (status: string): 'waiting' | 'expired' | 'completed' => {
  switch (status) {
    case 'PENDING':
      return 'waiting'
    case 'EXPIRED':
      return 'expired'
    case 'ANSWERED':
      return 'completed'
    default:
      return 'waiting'
  }
}

export default function EConsultListPage() {
  const router = useHospitalRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isTablet, setIsTablet] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 1429 : false))
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false))
  const itemsPerPage = 5

  const statusFilter = statusFilterMap[selectedStatus]

  const { data, loading } = useQuery<ConsultantAssignedEConsultsData>(CONSULTANT_ASSIGNED_ECONSULTS_QUERY, {
    variables: {
      filter: {
        ...(statusFilter ? { status: statusFilter } : {})
      },
      pagination: {
        page: currentPage,
        limit: itemsPerPage
      }
    },
    fetchPolicy: 'cache-and-network'
  })

  // 태블릿/모바일 여부 확인
  useEffect(() => {
    const checkViewport = () => {
      setIsTablet(window.innerWidth <= 1429)
      setIsMobile(window.innerWidth <= 768)
    }

    checkViewport()
    window.addEventListener('resize', checkViewport)

    return () => {
      window.removeEventListener('resize', checkViewport)
    }
  }, [])

  // 상태 필터 변경 시 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedStatus])

  // API 데이터 → UI 데이터 변환
  const items: EConsultData[] = useMemo(() => {
    if (!data?.consultantAssignedEConsults?.items) return []
    // DEV: API에서 오는 실제 status 값 확인
    if (process.env.NODE_ENV === 'development') {
      console.log('[e-consult list] raw items:', data.consultantAssignedEConsults.items.map(i => ({ id: i.id, status: i.status })))
    }
    return data.consultantAssignedEConsults.items.map((item, index) => ({
      id: item.id,
      number: (currentPage - 1) * itemsPerPage + index + 1,
      title: item.title,
      applicant: item.requester?.userName || '-',
      hospitalName: item.requester?.profile?.hospName || '-',
      department: item.consultant?.department || '-',
      status: mapApiStatus(item.status),
      registeredDate: formatDate(item.createdAt)
    }))
  }, [data, currentPage, itemsPerPage])

  // 클라이언트 측 검색 필터
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return items
    const query = searchQuery.toLowerCase()
    return items.filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.applicant.toLowerCase().includes(query) ||
        item.hospitalName.toLowerCase().includes(query)
    )
  }, [items, searchQuery])

  // 페이지네이션 (서버 사이드)
  const totalCount = data?.consultantAssignedEConsults?.totalCount || 0
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  // 테이블 컬럼 정의
  const columns: TableColumn<EConsultData>[] = useMemo(
    () => [
      {
        id: 'number',
        label: '번호',
        width: '80px',
        field: 'number',
        align: 'center'
      },
      {
        id: 'title',
        label: '제목',
        width: '1fr',
        field: 'title',
        align: 'left'
      },
      {
        id: 'applicant',
        label: '신청자',
        width: '120px',
        field: 'applicant',
        align: 'center'
      },
      {
        id: 'hospitalName',
        label: '의료기관명',
        width: '150px',
        field: 'hospitalName',
        align: 'center'
      },
      {
        id: 'status',
        label: '답변상태',
        width: '120px',
        align: 'center',
        renderCell: item => {
          const statusLabels = {
            waiting: '답변 대기',
            expired: '기간 만료',
            completed: '답변 완료'
          }
          return <StatusBadge variant={item.status}>{statusLabels[item.status]}</StatusBadge>
        }
      },
      {
        id: 'registeredDate',
        label: '등록일',
        width: '120px',
        field: 'registeredDate',
        align: 'center'
      }
    ],
    []
  )

  const handleSearch = () => {
    setCurrentPage(1)
  }

  const handleRowClick = (item: EConsultData) => {
    router.push(`/network/e-consult/list/${item.id}`)
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>자문의 e-Consult 조회</h1>

          {/* 안내 메시지 및 검색 필터 영역 */}
          <SearchFilterWithInfo
            selectOptions={statusOptions}
            selectValue={selectedStatus}
            onSelectChange={setSelectedStatus}
            selectWidth={180}
            searchPlaceholder='제목, 신청자, 의료기관명을 입력해주세요.'
            searchValue={searchQuery}
            onSearchValueChange={setSearchQuery}
            onSearch={handleSearch}
            searchFieldWidth={400}
            infoMessage='신청일 기준 1달 이내에 e-Consult 답변이 가능합니다.'
          />

          {/* 테이블 또는 카드 리스트 */}
          <div className={styles.tableSection}>
            {loading && !data ? (
              <Skeleton width='100%' height={48} variant='rounded' count={5} gap={8} />
            ) : isTablet ? (
              /* 태블릿/모바일: 카드형 리스트 */
              <CardList
                cards={filteredData.map(item => {
                  const statusLabels = {
                    waiting: '답변 대기',
                    expired: '기간 만료',
                    completed: '답변 완료'
                  }

                  // 모바일: 번호 없음, hospitalName 표시
                  // 태블릿: 번호 있음, department 표시
                  if (isMobile) {
                    return [
                      {
                        id: 'title',
                        leftContent: <span className={styles.cardTitle}>{item.title}</span>,
                        rightContent: null
                      },
                      {
                        id: 'hospitalName',
                        leftContent: <span className={styles.cardHospital}>{item.hospitalName}</span>,
                        rightContent: null
                      },
                      {
                        id: 'applicant',
                        leftContent: <span className={styles.cardApplicant}>{item.applicant}</span>,
                        rightContent: null
                      },
                      {
                        id: 'statusAndDate',
                        leftContent: <StatusBadge variant={item.status}>{statusLabels[item.status]}</StatusBadge>,
                        rightContent: <span className={styles.cardDate}>{item.registeredDate}</span>
                      }
                    ]
                  }

                  // 태블릿
                  return [
                    {
                      id: 'number',
                      leftContent: <span className={styles.cardNumber}>{item.number}</span>,
                      rightContent: null
                    },
                    {
                      id: 'title',
                      leftContent: <span className={styles.cardTitle}>{item.title}</span>,
                      rightContent: null
                    },
                    {
                      id: 'department',
                      leftContent: <span className={styles.cardDepartment}>{item.department}</span>,
                      rightContent: null
                    },
                    {
                      id: 'applicant',
                      leftContent: <span className={styles.cardApplicant}>{item.applicant}</span>,
                      rightContent: null
                    },
                    {
                      id: 'statusAndDate',
                      leftContent: <StatusBadge variant={item.status}>{statusLabels[item.status]}</StatusBadge>,
                      rightContent: <span className={styles.cardDate}>{item.registeredDate}</span>
                    }
                  ]
                })}
                getCardKey={(card, index) => filteredData[index].id}
                getCardClassName={(card, index) => {
                  const status = filteredData[index].status
                  const statusClass = `cardStatus${status.charAt(0).toUpperCase() + status.slice(1)}`
                  return statusClass
                }}
                columns={isMobile ? 1 : 2}
                className={styles.eConsultCardList}
                onCardClick={cardIndex => handleRowClick(filteredData[cardIndex])}
              />
            ) : (
              /* 데스크톱: 테이블 */
              <Table
                columns={columns}
                data={filteredData}
                getRowKey={item => item.id}
                onRowClick={handleRowClick}
                className={styles.table}
                enableHoverStyle
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
