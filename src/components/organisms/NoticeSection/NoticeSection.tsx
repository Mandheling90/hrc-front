'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Link from '@/components/atoms/HospitalLink'
import Image from 'next/image'
import { useQuery } from '@apollo/client/react'
import { useHospital, useMiniBanners, useMenus } from '@/hooks'
import { BOARD_POSTS_QUERY } from '@/graphql/menu/queries'
import styles from './NoticeSection.module.scss'

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

const fallbackSlides = [
  { id: '1', image: '/images/home/img-section2-1.jpg', alt: '의료진 1' },
  { id: '2', image: '/images/home/img-section2-1.jpg', alt: '의료진 2' }
]

const MINI_BANNER_INTERVAL = 4000

export const NoticeSection: React.FC = () => {
  const { isGuro } = useHospital()
  const { banners: miniBanners, loading: miniBannersLoading } = useMiniBanners()
  const { menus } = useMenus()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const hasMiniBanners = miniBanners.length > 0
  const totalSlides = hasMiniBanners ? miniBanners.length : fallbackSlides.length

  // GNB 메뉴에서 공지사항/교육·행사 boardId 찾기
  const { boardId, boardPath } = useMemo(() => {
    const fallbackPath = isGuro ? '/notice/event' : '/notice/list'

    const isTargetMenu = (name: string) => {
      if (isGuro) return name.includes('교육') || name.includes('행사')
      return name.includes('공지사항') || name.includes('공지')
    }

    for (const menu of menus) {
      for (const child of menu.children ?? []) {
        if (child.targetBoardId && isTargetMenu(child.name)) {
          return {
            boardId: child.targetBoardId,
            boardPath: `/board?boardId=${child.targetBoardId}`
          }
        }
      }
    }

    return { boardId: '', boardPath: fallbackPath }
  }, [menus, isGuro])

  // 최근 게시글 3건 조회
  const { data: boardData } = useQuery<BoardPostsData>(BOARD_POSTS_QUERY, {
    variables: {
      boardId,
      pagination: { page: 1, limit: 6 }
    },
    skip: !boardId,
    fetchPolicy: 'cache-and-network'
  })

  // 공지(isPinned) 제외 일반 게시글 3건
  const posts = (boardData?.boardPosts?.items ?? []).filter(post => !post.isPinned).slice(0, 3)

  const formatDate = (dateStr: string) => {
    return dateStr.slice(0, 10).replace(/-/g, '.')
  }

  const handlePrev = useCallback(() => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : totalSlides - 1))
  }, [totalSlides])

  const handleNext = useCallback(() => {
    setCurrentSlide(prev => (prev < totalSlides - 1 ? prev + 1 : 0))
  }, [totalSlides])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev)
  }, [])

  // 미니배너 자동 재생
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
      return
    }
    autoplayRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev < totalSlides - 1 ? prev + 1 : 0))
    }, MINI_BANNER_INTERVAL)
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [isAutoPlaying, totalSlides, currentSlide])

  // 미니배너 클릭 핸들러
  const handleBannerClick = useCallback((banner: (typeof miniBanners)[number]) => {
    if (!banner.linkUrl) return
    const url = /^https?:\/\//.test(banner.linkUrl) ? banner.linkUrl : `https://${banner.linkUrl}`
    if (banner.targetBlank) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = url
    }
  }, [])

  // 핫라인 카드 (공통)
  const hotlineCard = (
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
          {hasMiniBanners
            ? miniBanners.map(banner => (
                <div
                  key={banner.id}
                  className={styles.slide}
                  onClick={() => handleBannerClick(banner)}
                  style={{ cursor: banner.linkUrl ? 'pointer' : 'default' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={banner.imageUrl || ''}
                    alt={banner.altText || '미니배너'}
                    className={styles.doctorImg}
                  />
                </div>
              ))
            : !miniBannersLoading &&
              fallbackSlides.map(slide => (
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
          <button
            className={styles.pauseBtn}
            onClick={toggleAutoPlay}
            aria-label={isAutoPlaying ? '일시정지' : '재생'}
          >
            {isAutoPlaying ? (
              <svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <rect x='1' y='1' width='2' height='8' fill='#fff' />
                <rect x='7' y='1' width='2' height='8' fill='#fff' />
              </svg>
            ) : (
              <svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M2 1L9 5L2 9V1Z' fill='#fff' />
              </svg>
            )}
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
  )

  // 구로병원 레이아웃 (교육/행사)
  if (isGuro) {
    return (
      <section className={styles.section2}>
        <div className={styles.container}>
          <div className={styles.flexGuro}>
            {/* 교육/행사 */}
            <div className={styles.education}>
              <div className={styles.titleWrap}>
                <h3 className={styles.sectionTitle}>교육/행사</h3>
                <Link href={boardPath} className={styles.moreBtn} aria-label='더보기'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src='/images/common/viewPlus.png' alt='더보기' />
                </Link>
              </div>
              <div className={styles.eventCards}>
                {posts.slice(0, 3).map(post => (
                  <Link
                    key={post.id}
                    href={boardId ? `/board/${post.id}?boardId=${boardId}` : `/notice/event`}
                    className={styles.eventCard}
                  >
                    <div className={styles.eventImage}>
                      {post.thumbnailUrl ? (
                        <Image
                          src={post.thumbnailUrl}
                          alt={post.title}
                          width={230}
                          height={230}
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <Image
                          src='/images/home/Frame 1000006464.png'
                          alt={post.title}
                          width={230}
                          height={230}
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                    </div>
                    <div className={styles.eventInfo}>
                      <p className={styles.eventTitle}>{post.title}</p>
                      <span className={styles.eventDate}>{formatDate(post.createdAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 핫라인 카드 */}
            {hotlineCard}
          </div>
        </div>
      </section>
    )
  }

  // 안암/안산병원 레이아웃 (공지사항)
  return (
    <section className={styles.section2}>
      <div className={styles.container}>
        <div className={styles.flex}>
          {/* 공지사항 */}
          <div className={styles.notice}>
            <div className={styles.titleWrap}>
              <h3 className={styles.sectionTitle}>공지사항</h3>
              <Link href={boardPath} className={styles.moreBtn} aria-label='더보기'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src='/images/common/viewPlus.png' alt='더보기' />
              </Link>
            </div>
            <ul className={styles.noticeList}>
              {posts.slice(0, 3).map(post => (
                <li key={post.id}>
                  <Link href={boardId ? `/board/${post.id}?boardId=${boardId}` : `/notice/list`}>
                    <span className={styles.noticeTitle}>{post.title}</span>
                    <span className={styles.divider} />
                    <span className={styles.noticeDate}>{formatDate(post.createdAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 핫라인 카드 */}
          {hotlineCard}
        </div>
      </div>
    </section>
  )
}
