'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './SNSSection.module.scss'

const snsPosts = [
  {
    id: 1,
    image: '/images/img-section3-1.jpg',
    title: '고려대학교 안암병원의 새로운 도약, 메디컴플렉스 신관 오픈(다큐멘터리)'
  },
  {
    id: 2,
    image: '/images/img-section3-2.jpg',
    title:
      '[안암인싸] 고려대안암병원 l 산부인과 브이로그 1화 l 안암병원 신관? l 노티? 회진? 바로 알려준다! l 로봇수술은 처음이지?'
  },
  {
    id: 3,
    image: '/images/img-section3-3.jpg',
    title: '고대병원 간호사 이야기 들어볼래?'
  },
  {
    id: 4,
    image: '/images/img-section3-4.jpg',
    title: '고대안암병원 SNS'
  }
]

export const SNSSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const totalSlides = snsPosts.length
  const visibleItems = 2

  // 무한 루프를 위해 앞뒤로 아이템 복제
  const extendedPosts = [...snsPosts.slice(-visibleItems), ...snsPosts, ...snsPosts.slice(0, visibleItems)]

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
        <h3 className={styles.sectionTitle}>고대안암병원 SNS</h3>
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
                  <div key={`${post.id}-${index}`} className={styles.thumbItem}>
                    <div className={styles.thumbImg}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={270}
                        height={150}
                        style={{ borderRadius: '20px', objectFit: 'cover' }}
                      />
                    </div>
                    <p className={styles.thumbTitle}>{post.title}</p>
                  </div>
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
                      d='M15 4L7 12L15 20'
                      stroke='#636363'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
                <button className={styles.next} type='button' onClick={handleNext} aria-label='Next'>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M9 4L17 12L9 20'
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
            <Link href='#'>
              <Image
                src={snsPosts[mainImageIndex].image}
                alt={snsPosts[mainImageIndex].title}
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
