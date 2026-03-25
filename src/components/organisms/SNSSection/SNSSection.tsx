'use client'

import React, { useState, useEffect } from 'react'
import Link from '@/components/atoms/HospitalLink'
import { useHospital, useHospitalSns } from '@/hooks'
import styles from './SNSSection.module.scss'

function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /youtube\.com\/live\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

function getThumbnailUrl(article: { linkUrl: string | null }): string {
  if (article.linkUrl) {
    const videoId = extractYouTubeVideoId(article.linkUrl)
    if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }
  return '/images/home/img-section3-1.jpg'
}

export const SNSSection: React.FC = () => {
  const { hospital } = useHospital()
  const { articles, loading } = useHospitalSns(4)

  const posts = articles.map(article => ({
    id: article.articleNo,
    image: getThumbnailUrl(article),
    title: article.title,
    linkUrl: article.linkUrl || '#'
  }))

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const totalSlides = posts.length
  const visibleItems = 2

  // 무한 루프를 위해 앞뒤로 아이템 복제
  const extendedPosts = totalSlides > 0
    ? [...posts.slice(-visibleItems), ...posts, ...posts.slice(0, visibleItems)]
    : []

  const handlePrev = () => {
    setIsTransitioning(true)
    setCurrentIndex(prev => prev - 1)
  }

  const handleNext = () => {
    setIsTransitioning(true)
    setCurrentIndex(prev => prev + 1)
  }

  // 무한 루프 처리
  const handleTransitionEnd = () => {
    if (currentIndex >= totalSlides) {
      setIsTransitioning(false)
      setCurrentIndex(0)
    } else if (currentIndex < 0) {
      setIsTransitioning(false)
      setCurrentIndex(totalSlides - 1)
    }
  }

  // 실제 표시할 인덱스 (0 ~ totalSlides-1 범위)
  const displayIndex = currentIndex < 0 ? totalSlides - 1 : currentIndex >= totalSlides ? 0 : currentIndex

  // 메인 이미지 페이드 효과
  const [isFading, setIsFading] = useState(false)
  const [mainImageIndex, setMainImageIndex] = useState(0)

  useEffect(() => {
    setIsFading(true)
    const timer = setTimeout(() => {
      setMainImageIndex(displayIndex)
      setIsFading(false)
    }, 200)
    return () => clearTimeout(timer)
  }, [displayIndex])

  if (loading || totalSlides === 0) return null

  return (
    <section className={`section ${styles.section3}`}>
      <div className={styles.verticalText}>
        <div className={styles.track}>
          <div className={styles.con}>
            <span>Korea University Hospital Referral Center</span>
          </div>
          <div className={styles.con} aria-hidden='true'>
            <span>Korea University Hospital Referral Center</span>
          </div>
        </div>
      </div>
      <div className='container'>
        <h3 className={styles.sectionTitle}>고대{hospital.name.short} SNS</h3>
        <div className={styles.contentWrap}>
          <div className={styles.leftContent}>
            <div className={styles.thumbSlider}>
              <div
                className={styles.thumbTrack}
                style={{
                  transform: `translateX(calc(-${currentIndex + visibleItems} * (50% + 12px)))`,
                  transition: isTransitioning ? 'transform 0.4s ease-in-out' : 'none'
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedPosts.map((post, index) => (
                  <Link key={`${post.id}-${index}`} href={post.linkUrl} target='_blank' className={styles.thumbItem}>
                    <div className={styles.thumbImg}>
                      <img
                        src={post.image}
                        alt={post.title}
                        width={270}
                        height={150}
                        style={{ borderRadius: '0', objectFit: 'cover' }}
                      />
                    </div>
                    <p className={styles.thumbTitle}>{post.title}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className={styles.customControl}>
              <div className={styles.pagination}>
                <span className={styles.current}>{displayIndex + 1}</span>
                <div className={styles.progress}>
                  <span className={styles.bar} style={{ width: `${((displayIndex + 1) / totalSlides) * 100}%` }}></span>
                </div>
                <span className={styles.total}>{totalSlides}</span>
              </div>
              <div className={styles.controlBtns}>
                <button className={styles.prev} type='button' onClick={handlePrev} aria-label='Previous'>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M9.50027 16.5L5.00027 11.75M5.00027 11.75L9.50027 7M5.00027 11.75H19'
                      stroke='#636363'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
                <button className={styles.next} type='button' onClick={handleNext} aria-label='Next'>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' style={{ transform: 'scaleX(-1)' }}>
                    <path
                      d='M9.50027 16.5L5.00027 11.75M5.00027 11.75L9.50027 7M5.00027 11.75H19'
                      stroke='#636363'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className={`${styles.mainImage} ${isFading ? styles.fading : ''}`}>
            <Link href={posts[mainImageIndex].linkUrl} target='_blank'>
              <img
                src={posts[mainImageIndex].image}
                alt={posts[mainImageIndex].title}
                width={738}
                height={415}
                style={{ borderBottomLeftRadius: '40px', borderBottomRightRadius: '40px', objectFit: 'cover' }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
