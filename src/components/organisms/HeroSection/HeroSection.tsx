'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import styles from './HeroSection.module.scss'

const mainButtons = [
  { href: '#', label: '진료의뢰 신청' },
  { href: '#', label: '진료협진 컨설팅 신청' },
  { href: '#', label: '의뢰환자 조회' },
  { href: '#', label: '회송환자 조희' }
]

const downloadLinks = [
  { href: '#', label: '진료의뢰서' },
  { href: '#', label: '협력병병원 체결 신청서류' },
  { href: '#', label: '진료정보회신 환자 동의서' }
]

const infoLinks = [
  { href: '#', icon: 'doctor', label: '의료진 검색' },
  { href: '#', icon: 'hospital', label: '진료과 안내' },
  { href: '#', icon: 'calendar', label: '외래시간표' },
  { href: '#', icon: 'map', label: '오시는 길' }
]

const contactInfo = [
  { label: '팩스', value: '02-920-6523' },
  { label: '콜센터(진료예약)', value: '1577-0083' },
  { label: '응급실', value: '02-920-5490' }
]

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Video play error:', error)
      })
    }
  }, [])

  return (
    <section className={`section ${styles.section1}`}>
      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload='auto'
          onLoadedData={() => {
            console.log('Video loaded successfully')
          }}
          onError={e => {
            console.error('Video load error:', e)
          }}
          onCanPlay={() => {
            console.log('Video can play')
          }}
        >
          <source src='/assets/video/main-visual.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className='container'>
        <h2 className={styles.title}>
          스마트 협력으로 완성하는 차세대 의료연계
          <strong>고려대학교안암병원 진료협력센터,</strong>
        </h2>
        <div className={styles.quickBox}>
          <div className={`${styles.box} ${styles.gradientsOne}`}>
            {mainButtons.map((button, index) => (
              <Link key={index} href={button.href} className={styles.line}>
                {button.label}
              </Link>
            ))}
          </div>
          <div className={`${styles.box} ${styles.down}`}>
            <p>서식 다운로드</p>
            {downloadLinks.map((link, index) => (
              <Link key={index} href={link.href} className={styles.line}>
                <span>{link.label}</span>
                <em className={`icon icon-download ${styles.icon}`}></em>
              </Link>
            ))}
          </div>
          <div className={`${styles.box} ${styles.square}`}>
            <ul>
              {infoLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <i className={`icon ${link.icon} ${styles.icon}`}></i>
                    <p>{link.label}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.box} ${styles.last}`}>
            <div>
              <i className={`icon ${styles.icon}`}></i>
            </div>
            <p>02-920-5892</p>
            <ul>
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  {contact.label} : {contact.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
