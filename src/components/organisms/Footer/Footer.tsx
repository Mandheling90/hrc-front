'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useHospital } from '@/hooks'
import styles from './Footer.module.scss'

const partnerLogos = [
  { id: 1, image: '/images/img-section4-1.png', alt: '건강보험심사평가원' },
  { id: 2, image: '/images/img-section4-2.png', alt: '마이차트' },
  { id: 3, image: '/images/img-section4-3.png', alt: '한국보건의료정보원' },
  { id: 4, image: '/images/img-section4-4.png', alt: '안암병원 진료협력센터' },
  { id: 5, image: '/images/img-section4-5.png', alt: '파트너5' },
  { id: 6, image: '/images/img-section4-6.png', alt: '파트너6' }
]

const policyLinks = [
  { href: '#', label: '인터넷이용약관' },
  { href: '#', label: '개인정보처리방침', primary: true },
  { href: '#', label: '환자권리장전' },
  { href: '#', label: '이메일주소수집거부' }
]

const socialLinks = [
  { href: 'https://blog.naver.com/kuanamhospital', label: 'NAVER', icon: 'naver', color: '#3BAE37' },
  { href: 'https://www.youtube.com/@user-gj6oo4jx5u', label: 'YOUTUBE', icon: 'youtube', color: '#FF0000' }
]

const certifications = [
  {
    image: '/images/main/cert-emr.png',
    scope: '[인증범위]전자의무기록시스템(EMR) 인증',
    period: '[유효기간]2022.11.01 ~ 2025.10.31'
  },
  {
    image: '/images/main/cert-isms.png',
    scope: '[인증범위]의료정보시스템(EMR, OCS) 및 홈페이지 서비스 운영',
    period: '[유효기간]2023.10.18 ~ 2026.10.17'
  }
]

export const Footer: React.FC = () => {
  const { hospital } = useHospital()
  const [showDepartment, setShowDepartment] = useState(false)
  const [showFamily, setShowFamily] = useState(false)
  const [partnerIndex, setPartnerIndex] = useState(0)
  const [isPartnerPaused, setIsPartnerPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const totalLogos = partnerLogos.length

  const currentYear = new Date().getFullYear()

  // 무한 루프를 위해 앞뒤로 아이템 복제 (앞에 4개, 뒤에 4개 추가)
  const extendedLogos = [
    ...partnerLogos.slice(-4),
    ...partnerLogos,
    ...partnerLogos.slice(0, 4)
  ]

  const handlePartnerPrev = () => {
    setIsTransitioning(true)
    setPartnerIndex(prev => prev - 1)
  }

  const handlePartnerNext = () => {
    setIsTransitioning(true)
    setPartnerIndex(prev => prev + 1)
  }

  // 무한 루프 처리: 끝에 도달하면 애니메이션 없이 위치 리셋
  const handleTransitionEnd = () => {
    if (partnerIndex >= totalLogos) {
      setIsTransitioning(false)
      setPartnerIndex(0)
    } else if (partnerIndex < 0) {
      setIsTransitioning(false)
      setPartnerIndex(totalLogos - 1)
    }
  }

  return (
    <footer id='footer' className={styles.footer}>
      {/* Partner Section */}
      <div className={styles.partnerBar}>
        <div className={styles.partnerContainer}>
          <div className={styles.partnerContent}>
            <div className={styles.partnerSlider}>
              <div
                className={styles.partnerTrack}
                style={
                  {
                    '--offset': partnerIndex + 4,
                    transform: `translateX(calc(-1 * var(--offset) * var(--step)))`,
                    transition: isTransitioning ? 'transform 0.4s ease-in-out' : 'none'
                  } as React.CSSProperties
                }
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedLogos.map((partner, index) => (
                  <div key={`${partner.id}-${index}`} className={styles.partnerItem}>
                    <Image src={partner.image} alt={partner.alt} width={250} height={40} />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.partnerControl}>
              <button className={styles.controlBtn} onClick={handlePartnerPrev} aria-label='이전'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M15 4L7 12L15 20' stroke='#686868' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </button>
              <button
                className={`${styles.controlBtn} ${styles.pauseBtn}`}
                onClick={() => setIsPartnerPaused(!isPartnerPaused)}
                aria-label={isPartnerPaused ? '재생' : '일시정지'}
              >
                {isPartnerPaused ? (
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M8 5V19L19 12L8 5Z' fill='#686868' />
                  </svg>
                ) : (
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect x='6' y='5' width='4' height='14' fill='#686868' />
                    <rect x='14' y='5' width='4' height='14' fill='#686868' />
                  </svg>
                )}
              </button>
              <button className={styles.controlBtn} onClick={handlePartnerNext} aria-label='다음'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M9 4L17 12L9 20' stroke='#686868' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className={styles.mainFooter}>
        <div className='container'>
          <div className={styles.footerContent}>
            {/* Logo */}
            <div className={styles.footerLogo}>
              <Image src='/images/main/logo-footer.png' alt={hospital.name.full} width={48} height={48} />
              <div className={styles.logoText}>
                <span className={styles.logoTitle}>고려대학교 안암병원 진료협력센터</span>
                <span className={styles.logoSubtitle}>KOREA UNIVERSITY ANAM HOSPITAL REFERRAL CENTER</span>
              </div>
            </div>

            {/* Info */}
            <div className={styles.footerInfo}>
              <div className={styles.policyLinks}>
                {policyLinks.map((link, index) => (
                  <React.Fragment key={link.label}>
                    {index > 0 && <span className={styles.separator}></span>}
                    <Link href={link.href} className={link.primary ? styles.primary : ''}>
                      {link.label}
                    </Link>
                  </React.Fragment>
                ))}
              </div>
              <div className={styles.addressInfo}>
                <p>주소 : (우) {hospital.address.zipCode}. {hospital.address.full}</p>
                <p>대표번호 : {hospital.contact.reservation}</p>
              </div>
              <div className={styles.socialLinks}>
                {socialLinks.map(social => (
                  <Link key={social.label} href={social.href} className={styles.socialBtn} target='_blank'>
                    <span className={styles.socialIcon} style={{ backgroundColor: social.color }}></span>
                    <span>{social.label}</span>
                  </Link>
                ))}
              </div>
              <p className={styles.copyright}>
                Copyright© {currentYear} by Korea University Anam Hospital All Rights Reserved.
              </p>
            </div>

            {/* Right */}
            <div className={styles.footerRight}>
              <div className={styles.dropdownBtns}>
                <button
                  className={`${styles.dropdownBtn} ${showDepartment ? styles.active : ''}`}
                  onClick={() => setShowDepartment(!showDepartment)}
                >
                  진료지원부서
                  <span className={styles.plusIcon}></span>
                </button>
                <button
                  className={`${styles.dropdownBtn} ${showFamily ? styles.active : ''}`}
                  onClick={() => setShowFamily(!showFamily)}
                >
                  패밀리사이트
                  <span className={styles.plusIcon}></span>
                </button>
              </div>
              <div className={styles.certifications}>
                {certifications.map((cert, index) => (
                  <div key={index} className={styles.certItem}>
                    <Image src={cert.image} alt='인증마크' width={50} height={50} />
                    <div className={styles.certText}>
                      <p>{cert.scope}</p>
                      <p>{cert.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
