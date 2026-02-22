'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { StatusBadge } from '@/components/atoms/StatusBadge/StatusBadge'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import { CardList } from '@/components/molecules/CardList/CardList'
import { SearchFilterWithInfo } from '@/components/molecules/SearchFilterWithInfo/SearchFilterWithInfo'
import styles from './page.module.scss'

// e-Consult 데이터 타입
interface EConsultData {
  id: string
  number: number
  title: string
  applicant: string
  hospitalName: string
  department: string // Figma 태블릿에서 표시되는 진료과
  status: 'waiting' | 'expired' | 'completed'
  registeredDate: string
}

// 임시 데이터
const mockEConsults: EConsultData[] = [
  {
    id: '1',
    number: 84,
    title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
    applicant: '김*수',
    hospitalName: '고대협력병원',
    department: '소화기내과',
    status: 'waiting',
    registeredDate: '2025-11-25'
  },
  {
    id: '2',
    number: 84,
    title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
    applicant: '김*수',
    hospitalName: '고대협력병원',
    department: '소화기내과',
    status: 'expired',
    registeredDate: '2025-11-25'
  },
  {
    id: '3',
    number: 84,
    title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
    applicant: '김*수',
    hospitalName: '고대협력병원',
    department: '소화기내과',
    status: 'completed',
    registeredDate: '2025-11-25'
  },
  {
    id: '4',
    number: 84,
    title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
    applicant: '김*수',
    hospitalName: '고대협력병원',
    department: '소화기내과',
    status: 'completed',
    registeredDate: '2025-11-25'
  },
  {
    id: '5',
    number: 84,
    title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
    applicant: '김*수',
    hospitalName: '고대협력병원',
    department: '소화기내과',
    status: 'completed',
    registeredDate: '2025-11-25'
  },
  {
    id: '6',
    number: 84,
    title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
    applicant: '김*수',
    hospitalName: '고대협력병원',
    department: '소화기내과',
    status: 'completed',
    registeredDate: '2025-11-25'
  }
]

// 답변 상태 옵션
const statusOptions = [
  { value: 'all', label: '답변 상태(전체)' },
  { value: 'waiting', label: '답변 대기' },
  { value: 'expired', label: '기간 만료' },
  { value: 'completed', label: '답변 완료' }
]

export default function EConsultListPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isTablet, setIsTablet] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 1429 : false))
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false))
  const itemsPerPage = 5

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

  // 필터링 및 검색
  const filteredData = useMemo(() => {
    let filtered = mockEConsults

    // 상태 필터
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus)
    }

    // 검색어 필터
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(query) ||
          item.applicant.toLowerCase().includes(query) ||
          item.hospitalName.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [selectedStatus, searchQuery])

  // 페이지네이션
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage, itemsPerPage])

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
    // 검색 로직은 이미 필터링에 포함됨
    setCurrentPage(1) // 검색 시 첫 페이지로 이동
  }

  const handleRowClick = (item: EConsultData) => {
    // 상세 페이지로 이동
    const hospitalId = window.location.pathname.split('/')[1]
    const prefix = ['anam', 'guro', 'ansan'].includes(hospitalId) ? `/${hospitalId}` : ''
    window.location.href = `${prefix}/network/e-consult/list/${item.id}`
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
            {isTablet ? (
              /* 태블릿/모바일: 카드형 리스트 */
              <CardList
                cards={paginatedData.map(item => {
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
                getCardKey={(card, index) => paginatedData[index].id}
                getCardClassName={(card, index) => {
                  // 상태 클래스 항상 추가 (CSS 미디어 쿼리로 배경색 제어)
                  const status = paginatedData[index].status
                  const statusClass = `cardStatus${status.charAt(0).toUpperCase() + status.slice(1)}`
                  return statusClass
                }}
                columns={isMobile ? 1 : 2}
                className={styles.eConsultCardList}
                onCardClick={cardIndex => handleRowClick(paginatedData[cardIndex])}
              />
            ) : (
              /* 데스크톱: 테이블 */
              <Table
                columns={columns}
                data={paginatedData}
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
