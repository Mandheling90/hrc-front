'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import { useHospital } from '@/hooks'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { useAuthContext } from '@/contexts/AuthContext'
import { HospitalCode } from '@/graphql/__generated__/types'
import { MY_ECONSULTS_QUERY } from '@/graphql/econsult/queries'
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
interface MyEConsultsData {
  myEConsults: {
    items: {
      id: string
      hospitalCode: string
      requesterId: string
      requester?: { userName?: string; email?: string; profile?: { hospName?: string } }
      consultantId: string
      consultant?: { name?: string; department?: string }
      title: string
      content: string
      status: string
      answeredAt?: string
      expiresAt: string
      createdAt: string
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
  consultantName: string
  status: 'waiting' | 'expired' | 'completed'
  registeredDate: string
}

/** HospitalId → HospitalCode 변환 */
const toHospitalCode = (id: string): HospitalCode => {
  const map: Record<string, HospitalCode> = {
    anam: HospitalCode.Anam,
    guro: HospitalCode.Guro,
    ansan: HospitalCode.Ansan
  }
  return map[id] ?? HospitalCode.Anam
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

export default function MypageEConsultListPage() {
  const { hospitalId } = useHospital()
  const router = useHospitalRouter()
  const { user } = useAuthContext()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isTablet, setIsTablet] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 1429 : false))
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false))
  const itemsPerPage = 5

  const hospitalCode = toHospitalCode(hospitalId)
  const statusFilter = statusFilterMap[selectedStatus]

  const { data, loading } = useQuery<MyEConsultsData>(MY_ECONSULTS_QUERY, {
    variables: {
      filter: {
        hospitalCode,
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
    if (!data?.myEConsults?.items) return []
    return data.myEConsults.items.map((item: any, index: number) => ({
      id: item.id,
      number: (currentPage - 1) * itemsPerPage + index + 1,
      title: item.title,
      applicant: item.requester?.userName || user?.userName || '-',
      hospitalName: item.requester?.profile?.hospName || user?.profile?.hospName || '-',
      department: item.consultant?.department || '-',
      consultantName: item.consultant?.name || '-',
      status: mapApiStatus(item.status),
      registeredDate: formatDate(item.createdAt)
    }))
  }, [data, currentPage, itemsPerPage])

  // 클라이언트 측 검색 필터 (검색어는 서버에 보내지 않으므로 클라이언트에서 필터링)
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return items
    const query = searchQuery.toLowerCase()
    return items.filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query) ||
        item.consultantName.toLowerCase().includes(query)
    )
  }, [items, searchQuery])

  // 페이지네이션 (서버 사이드)
  const totalCount = data?.myEConsults?.totalCount || 0
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
        id: 'department',
        label: '진료과',
        width: '150px',
        field: 'department',
        align: 'center'
      },
      {
        id: 'consultantName',
        label: '자문의',
        width: '120px',
        field: 'consultantName',
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
    router.push(`/mypage/e-consult/${item.id}`)
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>e-Consult 조회</h1>

          {/* 안내 메시지 및 검색 필터 영역 */}
          <SearchFilterWithInfo
            selectOptions={statusOptions}
            selectValue={selectedStatus}
            onSelectChange={setSelectedStatus}
            selectWidth={180}
            searchPlaceholder='제목, 진료과, 자문의를 입력해주세요.'
            searchValue={searchQuery}
            onSearchValueChange={setSearchQuery}
            onSearch={handleSearch}
            searchFieldWidth={400}
            // infoMessage='신청일 기준 1달 이내에 e-Consult 답변이 가능합니다.'
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
                        id: 'department',
                        leftContent: <span className={styles.cardDepartment}>{item.department}</span>,
                        rightContent: null
                      },
                      {
                        id: 'consultantName',
                        leftContent: <span className={styles.cardApplicant}>{item.consultantName}</span>,
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
                      id: 'consultantName',
                      leftContent: <span className={styles.cardApplicant}>{item.consultantName}</span>,
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
                  // 상태 클래스 항상 추가 (CSS 미디어 쿼리로 배경색 제어)
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
