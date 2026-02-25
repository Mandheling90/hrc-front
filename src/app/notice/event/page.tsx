'use client'

import React, { useMemo, useState } from 'react'
import { useHospitalRouter } from '@/hooks/useHospitalRouter'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import { Input } from '@/components/atoms/Input/Input'
import { SearchIcon } from '@/components/icons/SearchIcon'
import styles from './page.module.scss'

interface EducationEventNotice {
  id: string
  title: string
  registeredDate: string
  thumbnail: string
}

// TODO: API 연동 전까지는 피그마 예시와 동일한 더미 데이터 사용
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
    title: '고영윤, 박종웅 교수팀, 대한정형외과학회 ‘포스터 전시 우수상’ 수상',
    registeredDate: '2025-11-24',
    thumbnail: '/assets/images/img-8.png'
  },
  {
    id: '9',
    title: '홍석하, 한승범 교수팀, 대한정형외과학회 ‘포스터 전시 장려상’ 수상',
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
    title: '고영윤, 박종웅 교수팀, 대한정형외과학회 ‘포스터 전시 우수상’ 수상',
    registeredDate: '2025-11-24',
    thumbnail: '/assets/images/img-8.png'
  },
  {
    id: '18',
    title: '홍석하, 한승범 교수팀, 대한정형외과학회 ‘포스터 전시 장려상’ 수상',
    registeredDate: '2025-11-24',
    thumbnail: '/assets/images/img.png'
  }
]

export default function NoticeEducationEventPage() {
  const router = useHospitalRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const itemsPerPage = 9 // 데스크톱 기준 한 페이지 3 x 3 카드

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return mockEducationEvents
    }

    const query = searchQuery.toLowerCase()
    return mockEducationEvents.filter(item => item.title.toLowerCase().includes(query))
  }, [searchQuery])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage, itemsPerPage])

  const handleSearch = () => {
    // 검색 실행 시 항상 첫 페이지로 이동
    setCurrentPage(1)
  }

  const handleCardClick = (item: EducationEventNotice) => {
    router.push(`/notice/list/${item.id}`)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    handleSearch()
  }

  return (
    <div className={styles.wrap}>
      <Header />
      <main className={styles.main}>
        <div className='container'>
          <h1 className={styles.pageTitle}>교육 / 행사</h1>

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

          <section className={styles.cardGrid} aria-label='교육 및 행사 목록'>
            {paginatedData.map(item => (
              <button key={item.id} type='button' className={styles.card} onClick={() => handleCardClick(item)}>
                <div className={styles.thumbnailWrapper}>
                  <img src={item.thumbnail} alt={item.title} className={styles.thumbnail} />
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.cardTitle}>{item.title}</p>
                  <p className={styles.cardDate}>{item.registeredDate}</p>
                </div>
              </button>
            ))}

            {paginatedData.length === 0 && <div className={styles.emptyState}>검색 결과가 없습니다.</div>}
          </section>

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
