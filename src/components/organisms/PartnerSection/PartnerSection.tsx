'use client'

import React from 'react'
import Link from '@/components/atoms/HospitalLink'
import styles from './PartnerSection.module.scss'

const partners = [
  { id: 1, image: '/images/img-section4-1.png', href: '#' },
  { id: 2, image: '/images/img-section4-2.png', href: '#' },
  { id: 3, image: '/images/img-section4-3.png', href: '#' },
  { id: 4, image: '/images/img-section4-4.png', href: '#' },
  { id: 5, image: '/images/img-section4-5.png', href: '#' },
  { id: 6, image: '/images/img-section4-6.png', href: '#' }
]

export const PartnerSection: React.FC = () => {
  return (
    <section className={`section ${styles.section4}`}>
      <div className='container'>
        <div className={styles.swiper}>
          <div className={styles.swiperWrapper}>
            {partners.map(partner => (
              <div key={partner.id} className={styles.swiperSlide}>
                <Link href={partner.href}>
                  <img src={partner.image} alt={`파트너 ${partner.id}`} />
                </Link>
              </div>
            ))}
          </div>
          <div className={styles.swiperControl}>
            <div className={styles.controlBtn}>
              <button className={styles.swiperButtonPrev} aria-label='Previous slide'></button>
              <button className={styles.swiperPause}></button>
              <button className={styles.swiperButtonNext} aria-label='Next slide'></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
