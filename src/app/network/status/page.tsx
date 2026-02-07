'use client'

import React, { useState, useMemo } from 'react'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Breadcrumbs } from '@/components/molecules/Breadcrumbs/Breadcrumbs'
import { Select } from '@/components/atoms/Select/Select'
import { Input } from '@/components/atoms/Input/Input'
import { Button } from '@/components/atoms/Button/Button'
import { ClinicCard } from '@/components/molecules/ClinicCard/ClinicCard'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import styles from './page.module.scss'
import { InfoIcon } from '@/components/icons/InfoIcon'
import { InfoNote } from '@/components/molecules/InfoNote/InfoNote'

// 임시 데이터 타입
interface ClinicData {
  id: string
  name: string
  type: 'hospital' | 'clinic'
  address: string
  phone: string
  fax: string
}

// 임시 데이터
const mockClinics: ClinicData[] = [
  {
    id: '1',
    name: '서울송도병원',
    type: 'hospital',
    address: '서울특별시 영등포구 경인로 767(문래동3가)',
    phone: '02-6950-4114',
    fax: '02-6950-4118'
  },
  {
    id: '2',
    name: '서울송도의원',
    type: 'clinic',
    address: '서울특별시 중구 다산로 78(신당동)',
    phone: '02-2231-0900',
    fax: '02-2231-0931'
  },
  {
    id: '3',
    name: '서울숭인병원',
    type: 'hospital',
    address: '서울특별시 종로구 종로 386',
    phone: '02-737-7582',
    fax: '02-737-7541'
  },
  {
    id: '4',
    name: '서울스마트요양병원',
    type: 'hospital',
    address: '서울특별시 양천구 중앙로 181(신정동) 복합메디컬타운 8F',
    phone: '02-2135-7601',
    fax: '02-2135-7622'
  },
  {
    id: '5',
    name: '서울강남의원',
    type: 'clinic',
    address: '서울특별시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    fax: '02-1234-5679'
  },
  {
    id: '6',
    name: '서울강북병원',
    type: 'hospital',
    address: '서울특별시 강북구 도봉로 456',
    phone: '02-2345-6789',
    fax: '02-2345-6790'
  },
  {
    id: '7',
    name: '서울서초의원',
    type: 'clinic',
    address: '서울특별시 서초구 서초대로 789',
    phone: '02-3456-7890',
    fax: '02-3456-7891'
  },
  {
    id: '8',
    name: '서울마포병원',
    type: 'hospital',
    address: '서울특별시 마포구 홍대입구로 321',
    phone: '02-4567-8901',
    fax: '02-4567-8902'
  }
]

// 지역 옵션
const regionOptions = [
  { value: 'all', label: '지역 선택(전체)' },
  { value: 'seoul', label: '서울' },
  { value: 'gyeonggi', label: '경기' },
  { value: 'incheon', label: '인천' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' }
]

// 병원 유형 옵션
const hospitalTypeOptions = [
  { value: 'all', label: '병원 유형(전체)' },
  { value: 'hospital', label: '병원' },
  { value: 'clinic', label: '의원' }
]

export default function ClinicStatusPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [selectedHospitalType, setSelectedHospitalType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedClinicId, setSelectedClinicId] = useState<string>(mockClinics[0]?.id || '')
  const itemsPerPage = 4

  // Breadcrumb 설정
  const breadcrumbItems = useMemo(() => {
    return [
      { label: '', href: '/', icon: null },
      { label: 'network', href: '/network', icon: null },
      { label: 'status', href: '/network/status', icon: null }
    ]
  }, [])

  // 필터링된 데이터
  const filteredClinics = useMemo(() => {
    return mockClinics.filter(clinic => {
      // 지역 필터 (임시로 모든 데이터 통과)
      if (selectedRegion !== 'all') {
        // 실제로는 지역 정보로 필터링
      }

      // 병원 유형 필터 (임시로 모든 데이터 통과)
      if (selectedHospitalType !== 'all') {
        // 실제로는 병원 유형으로 필터링
      }

      // 검색어 필터
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          clinic.name.toLowerCase().includes(query) ||
          clinic.address.toLowerCase().includes(query) ||
          clinic.phone.includes(query)
        )
      }

      return true
    })
  }, [selectedRegion, selectedHospitalType, searchQuery])

  // 페이지네이션된 데이터
  const paginatedClinics = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredClinics.slice(startIndex, endIndex)
  }, [filteredClinics, currentPage])

  // 전체 페이지 수
  const totalPages = Math.ceil(filteredClinics.length / itemsPerPage)

  // 검색 핸들러
  const handleSearch = () => {
    setCurrentPage(1) // 검색 시 첫 페이지로 이동
  }

  // 지도 버튼 클릭 핸들러
  const handleMapClick = (clinicId: string) => {
    // TODO: 지도 표시 또는 지도 페이지로 이동
    console.log('지도 보기:', clinicId)
  }

  // 홈 버튼 클릭 핸들러
  const handleHomeClick = (clinicId: string) => {
    // TODO: 병의원 홈페이지로 이동
    console.log('홈페이지 보기:', clinicId)
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>협력병의원 현황</h1>

          {/* 필터 섹션 */}
          <div className={styles.filterSection}>
            <div className={styles.filterRow}>
              <div className={styles.selectGroup}>
                <Select
                  options={regionOptions}
                  value={selectedRegion}
                  onChange={value => {
                    setSelectedRegion(value)
                    setCurrentPage(1)
                  }}
                  className={styles.regionSelect}
                />
                <Select
                  options={hospitalTypeOptions}
                  value={selectedHospitalType}
                  onChange={value => {
                    setSelectedHospitalType(value)
                    setCurrentPage(1)
                  }}
                  className={styles.hospitalTypeSelect}
                />
              </div>
              <div className={styles.searchGroup}>
                <div className={styles.searchWrapper}>
                  <Input
                    type='text'
                    placeholder='병원명, 전화번호를 입력해주세요.'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        handleSearch()
                      }
                    }}
                    className={styles.searchInput}
                  />
                  <Button variant='primary' size='small' onClick={handleSearch} className={styles.searchButton}>
                    검색
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 지도 및 병의원 리스트 */}
          <div className={styles.contentSection}>
            {/* 위치 기반 검색 안내 */}

            <InfoNote message='현재 내 위치에서 가장 가까운 병의원이 검색됩니다.' />

            {/* 지도와 카드 영역 */}
            <div className={styles.mapAndListContainer}>
              {/* 지도 영역 */}
              <div className={styles.mapContainer}>
                <div className={styles.mapPlaceholder}>
                  <p>지도 영역</p>
                  <p className={styles.mapNote}>지도 API 연동 필요</p>
                </div>
              </div>

              {/* 병의원 리스트 */}
              <div className={styles.clinicListWrapper}>
                <div className={styles.clinicList}>
                  {paginatedClinics.length > 0 ? (
                    <>
                      {paginatedClinics.map((clinic, index) => (
                        <ClinicCard
                          key={clinic.id}
                          name={clinic.name}
                          type={clinic.type}
                          address={clinic.address}
                          phone={clinic.phone}
                          fax={clinic.fax}
                          highlighted={selectedClinicId === clinic.id}
                          onClick={() => setSelectedClinicId(clinic.id)}
                          onMapClick={() => handleMapClick(clinic.id)}
                          onHomeClick={() => handleHomeClick(clinic.id)}
                        />
                      ))}
                    </>
                  ) : (
                    <div className={styles.emptyState}>
                      <p>검색 결과가 없습니다.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
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
