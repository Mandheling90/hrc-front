'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useHospital } from '@/hooks'
import styles from './NoticeSection.module.scss'

// 교육/행사 데이터 (구로병원용)
const educationEvents = [
  // 진료협력센터
  {
    id: 1,
    title: '2025년 상반기 진료협력센터 심포지엄',
    date: '2025.08.15',
    image: '/images/Frame 1000006464.png',
    category: 'center'
  },
  {
    id: 2,
    title: '협력병원 대상 최신 의료기술 세미나',
    date: '2025.07.28',
    image: '/images/Frame 1000006464-1.png',
    category: 'center'
  },
  {
    id: 3,
    title: '의료진 대상 연수 프로그램 안내',
    date: '2025.07.10',
    image: '/images/Frame 1000006464-2.png',
    category: 'center'
  },
  // 고대구로병원
  {
    id: 4,
    title: '고대구로병원 건강강좌 개최',
    date: '2025.08.10',
    image: '/images/Frame 1000006464.png',
    category: 'hospital'
  },
  {
    id: 5,
    title: '지역사회 건강증진 프로그램',
    date: '2025.07.20',
    image: '/images/Frame 1000006464-1.png',
    category: 'hospital'
  },
  {
    id: 6,
    title: '환자안전 캠페인 행사',
    date: '2025.07.05',
    image: '/images/Frame 1000006464-2.png',
    category: 'hospital'
  }
]

const notices = [
  // 진료협력센터
  {
    id: 1,
    title: '2025년 하반기 진료협력센터 협력병원 워크샵 개최 안내',
    date: '2025.08.05',
    category: 'center'
  },
  {
    id: 2,
    title: '진료협력센터 의뢰·회송 시스템 업데이트 안내',
    date: '2025.07.22',
    category: 'center'
  },
  {
    id: 3,
    title: '협력병원 대상 의료정보 공유 플랫폼 오픈',
    date: '2025.07.10',
    category: 'center'
  },
  // 고대안암병원
  {
    id: 4,
    title: '고려대 안암병원–서울시복지재단, 가족돌봄청소년·청년 건강·자립 지원 업무협약 체결자 모집',
    date: '2025.07.29',
    category: 'hospital'
  },
  {
    id: 5,
    title: "고려대의료원, 유튜브 채널 '고대병원' 구독자 100만 돌파 기념 대규모 감사 이벤트 개최",
    date: '2025.07.16',
    category: 'hospital'
  },
  { id: 6, title: '최종일 교수, 보건복지부 장관표창 수상', date: '2025.06.27', category: 'hospital' }
]

const categoriesAnam = [
  { id: 'center', label: '진료협력센터' },
  { id: 'hospital', label: '고대안암병원' }
]

const categoriesGuro = [
  { id: 'center', label: '진료협력센터' },
  { id: 'hospital', label: '고대구로병원' }
]

const slides = [
  { id: 1, image: '/images/img-section2-1.jpg', alt: '의료진 1' },
  { id: 2, image: '/images/img-section2-1.jpg', alt: '의료진 2' }
]

export const NoticeSection: React.FC = () => {
  const { isGuro } = useHospital()
  const [activeCategory, setActiveCategory] = useState(1)
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = slides.length

  const categories = isGuro ? categoriesGuro : categoriesAnam
  const filteredNotices = notices.filter(notice => notice.category === categories[activeCategory].id)
  const filteredEvents = educationEvents.filter(event => event.category === categories[activeCategory].id)

  const handlePrev = () => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : totalSlides - 1))
  }

  const handleNext = () => {
    setCurrentSlide(prev => (prev < totalSlides - 1 ? prev + 1 : 0))
  }

  // 구로병원 레이아웃
  if (isGuro) {
    return (
      <section className={styles.section2}>
        <div className={styles.container}>
          <div className={styles.flexGuro}>
            {/* 교육/행사 */}
            <div className={styles.education}>
              <div className={styles.titleWrap}>
                <h3 className={styles.sectionTitle}>교육/행사</h3>
                <Link href='/notice/event' className={styles.moreBtn} aria-label='더보기'>
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M8 3V13M3 8H13' stroke='#000' strokeWidth='1.5' strokeLinecap='round' />
                  </svg>
                </Link>
              </div>
              <div className={styles.eventCards}>
                {filteredEvents.slice(0, 3).map(event => (
                  <Link key={event.id} href={`/education/${event.id}`} className={styles.eventCard}>
                    <div className={styles.eventImage}>
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={230}
                        height={230}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className={styles.eventInfo}>
                      <p className={styles.eventTitle}>{event.title}</p>
                      <span className={styles.eventDate}>{event.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 핫라인 카드 */}
            <div className={styles.hotlineCard}>
              {/* 모바일 오버레이 콘텐츠 */}
              <div className={styles.hotlineOverlay}>
                <div className={styles.hotlineTitle}>
                  <span className={styles.hotlineSubtitle}>협력 병·의원 전용</span>
                  <span className={styles.hotlineMain}>의사전용 핫라인 안내</span>
                </div>
                <div className={styles.hotlineBadge}>본 서비스는 로그인 후 이용하실 수 있습니다.</div>
              </div>
              <Link href='#' className={styles.hotlineShortcut}>
                <span>바로가기</span>
                <svg width='17' height='3' viewBox='0 0 17 3' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M0 1.5H17M17 1.5L14 0M17 1.5L14 3' stroke='#000' strokeWidth='0.5' />
                </svg>
              </Link>
              <div className={styles.slideContainer}>
                <div className={styles.slideTrack} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {slides.map(slide => (
                    <div key={slide.id} className={styles.slide}>
                      <Image src={slide.image} alt={slide.alt} fill sizes='600px' className={styles.doctorImg} />
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.hotlineControl}>
                <div className={styles.pagination}>
                  <span className={styles.current}>{currentSlide + 1}</span>
                  <span className={styles.total}>/{totalSlides}</span>
                </div>
                <div className={styles.controlBtns}>
                  <button onClick={handlePrev} aria-label='이전'>
                    <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M8 10L4 6L8 2'
                        stroke='#fff'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                  <button className={styles.pauseBtn} aria-label='일시정지'>
                    <svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <rect x='1' y='1' width='2' height='8' fill='#fff' />
                      <rect x='7' y='1' width='2' height='8' fill='#fff' />
                    </svg>
                  </button>
                  <button onClick={handleNext} aria-label='다음'>
                    <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M4 10L8 6L4 2'
                        stroke='#fff'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // 안암병원 레이아웃 (기본)
  return (
    <section className={styles.section2}>
      <div className={styles.container}>
        <div className={styles.flex}>
          {/* 공지사항 */}
          <div className={styles.notice}>
            <div className={styles.titleWrap}>
              <h3 className={styles.sectionTitle}>공지사항</h3>
              <Link href='/notice/list' className={styles.moreBtn} aria-label='더보기'>
                <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M8 3V13M3 8H13' stroke='#000' strokeWidth='1.5' strokeLinecap='round' />
                </svg>
              </Link>
            </div>
            <ul className={styles.noticeList}>
              {filteredNotices.map(notice => (
                <li key={notice.id}>
                  <Link href={`/notice/list/${notice.id}`}>
                    <span className={styles.noticeTitle}>{notice.title}</span>
                    <span className={styles.divider} />
                    <span className={styles.noticeDate}>{notice.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 핫라인 카드 */}
          <div className={styles.hotlineCard}>
            {/* 모바일 오버레이 콘텐츠 */}
            <div className={styles.hotlineOverlay}>
              <div className={styles.hotlineTitle}>
                <span className={styles.hotlineSubtitle}>협력 병·의원 전용</span>
                <span className={styles.hotlineMain}>의사전용 핫라인 안내</span>
              </div>
              <div className={styles.hotlineBadge}>본 서비스는 로그인 후 이용하실 수 있습니다.</div>
            </div>
            <Link href='#' className={styles.hotlineShortcut}>
              <span>바로가기</span>
              <svg width='17' height='3' viewBox='0 0 17 3' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M0 1.5H17M17 1.5L14 0M17 1.5L14 3' stroke='#000' strokeWidth='0.5' />
              </svg>
            </Link>
            <div className={styles.slideContainer}>
              <div className={styles.slideTrack} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map(slide => (
                  <div key={slide.id} className={styles.slide}>
                    <Image src={slide.image} alt={slide.alt} fill sizes='600px' className={styles.doctorImg} />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.hotlineControl}>
              <div className={styles.pagination}>
                <span className={styles.current}>{currentSlide + 1}</span>
                <span className={styles.total}>/{totalSlides}</span>
              </div>
              <div className={styles.controlBtns}>
                <button onClick={handlePrev} aria-label='이전'>
                  <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M8 10L4 6L8 2'
                      stroke='#fff'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
                <button className={styles.pauseBtn} aria-label='일시정지'>
                  <svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect x='1' y='1' width='2' height='8' fill='#fff' />
                    <rect x='7' y='1' width='2' height='8' fill='#fff' />
                  </svg>
                </button>
                <button onClick={handleNext} aria-label='다음'>
                  <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M4 10L8 6L4 2'
                      stroke='#fff'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
