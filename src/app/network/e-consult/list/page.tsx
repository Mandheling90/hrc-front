'use client'

import React, { useMemo, useState } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { Table, TableColumn } from '@/components/molecules/Table/Table'
import { StatusBadge } from '@/components/atoms/StatusBadge/StatusBadge'
import { Select } from '@/components/atoms/Select/Select'
import { Input } from '@/components/atoms/Input/Input'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { InfoIcon } from '@/components/icons/InfoIcon'
import styles from './page.module.scss'

// e-Consult 데이터 타입
interface EConsultData {
  id: string
  number: number
  title: string
  applicant: string
  hospitalName: string
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
    status: 'waiting',
    registeredDate: '2025-11-25'
  },
  {
    id: '2',
    number: 84,
    title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
    applicant: '김*수',
    hospitalName: '고대협력병원',
    status: 'waiting',
    registeredDate: '2025-11-25'
  },
  {
    id: '3',
    number: 84,
    title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
    applicant: '김*수',
    hospitalName: '고대협력병원',
    status: 'expired',
    registeredDate: '2025-11-25'
  },
  {
    id: '4',
    number: 84,
    title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
    applicant: '김*수',
    hospitalName: '고대협력병원',
    status: 'completed',
    registeredDate: '2025-11-25'
  },
  {
    id: '5',
    number: 84,
    title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
    applicant: '김*수',
    hospitalName: '고대협력병원',
    status: 'completed',
    registeredDate: '2025-11-25'
  },
  {
    id: '6',
    number: 84,
    title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
    applicant: '김*수',
    hospitalName: '고대협력병원',
    status: 'completed',
    registeredDate: '2025-11-25'
  },
  {
    id: '7',
    number: 84,
    title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
    applicant: '김*수',
    hospitalName: '고대협력병원',
    status: 'completed',
    registeredDate: '2025-11-25'
  },
  {
    id: '8',
    number: 84,
    title: '소아청소년과 김철수 선생님 자문을 요청드립니다.',
    applicant: '김*수',
    hospitalName: '고대협력병원',
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
  const itemsPerPage = 5

  // Breadcrumb 설정
  const breadcrumbItems = useMemo(() => {
    return [
      { label: '', href: '/', icon: null },
      { label: 'network', href: '/network', icon: null },
      { label: 'e-consult', href: '/network/e-consult', icon: null },
      { label: '자문의 e-Consult 조회', href: '/network/e-consult/list', icon: null }
    ]
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
    // TODO: 상세 페이지로 이동
    console.log('Row clicked:', item)
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>자문의 e-Consult 조회</h1>

          {/* 안내 메시지 및 검색 필터 영역 */}
          <div className={styles.infoAndSearchSection}>
            {/* 안내 메시지 */}
            <div className={styles.infoMessage}>
              <InfoIcon width={24} height={24} />
              <span>신청일 기준 1달 이내에 e-Consult 답변이 가능합니다.</span>
            </div>

            {/* 검색 및 필터 영역 */}
            <div className={styles.searchSection}>
              <Select
                options={statusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
                width={180}
                className={styles.statusSelect}
              />
              <div className={styles.searchField}>
                <Input
                  id='search'
                  name='search'
                  type='text'
                  placeholder='제목, 신청자, 의료기관명을 입력해주세요.'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSearch()
                  }}
                  className={styles.searchInput}
                />
                <button type='button' onClick={handleSearch} className={styles.searchButton} aria-label='검색'>
                  <SearchIcon width={24} height={24} />
                </button>
              </div>
            </div>
          </div>

          {/* 테이블 */}
          <div className={styles.tableSection}>
            <Table
              columns={columns}
              data={paginatedData}
              getRowKey={item => item.id}
              onRowClick={handleRowClick}
              className={styles.table}
              isHighlighted={(item, index) => index === 0}
            />
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
