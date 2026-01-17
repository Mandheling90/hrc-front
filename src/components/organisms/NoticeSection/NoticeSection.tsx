'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './NoticeSection.module.scss'

const notices = [
  { id: 1, title: '2025년 9월 외래진료 시간표입니다.', date: '2025.07.29', category: 'center' },
  { id: 2, title: '초진환자 진료 예약 안내', date: '2025.07.16', category: 'hospital' },
  { id: 3, title: '사용자 매뉴얼 안내', date: '2025.06.27', category: 'hospital' }
]

const categories = [
  { id: 'center', label: '진료협력센터' },
  { id: 'hospital', label: '고대안암병원' }
]

export const NoticeSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0)

  const filteredNotices = notices.filter(notice => notice.category === categories[activeCategory].id)

  return (
    <section className={`section ${styles.section2}`}>
      <div className='container'>
        <div className='flex'>
          <div className={styles.notice}>
            <div className={styles.titleWrap}>
              <h3 className={styles.sectionTitle}>공지사항</h3>
              <div className={styles.tabsWrap}>
                <div className={styles.tabs} style={{ '--active-index': activeCategory } as React.CSSProperties}>
                  {categories.map((category, index) => (
                    <button
                      key={category.id}
                      className={activeCategory === index ? 'on' : ''}
                      onClick={() => setActiveCategory(index)}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
                <Link href='#' className={styles.more} title='공지사항 더보기'></Link>
              </div>
            </div>
            <ul>
              {filteredNotices.map(notice => (
                <li key={notice.id}>
                  <Link href='#'>
                    <span>{notice.title}</span>
                    <em>{notice.date}</em>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.swiper}>
            <div className={styles.swiperWrapper}>
              <div className={styles.swiperSlide}>
                <Link href='#'>
                  <img src='/images/img-section2-1.jpg' alt='' />
                </Link>
              </div>
              <div className={styles.swiperSlide}>
                <Link href='#'>
                  <img src='/images/img-section2-1.jpg' alt='' />
                </Link>
              </div>
            </div>
            <div className={styles.swiperControl}>
              <div className={styles.swiperPagination}>
                <span className={styles.current}>01</span>
                <span className={styles.sep}>/</span>
                <span className={styles.total}>02</span>
              </div>
              <div className={styles.controlBtn}>
                <button className={styles.swiperButtonPrev} aria-label='Previous slide'></button>
                <button className={styles.swiperPause}></button>
                <button className={styles.swiperButtonNext} aria-label='Next slide'></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
