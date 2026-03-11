'use client'

import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react'
import Link from '@/components/atoms/HospitalLink'
import { useHospital, useSlideBanners } from '@/hooks'
import type { SlideBanner } from '@/hooks/useSlideBanners'
import styles from './HeroSection.module.scss'

// 전화 아이콘
// eslint-disable-next-line @next/next/no-img-element
const PhoneIcon = () => <img src='/images/icon-phone.svg' alt='전화' width={57} height={56} />

// 모바일 전화 아이콘
// eslint-disable-next-line @next/next/no-img-element
const PhoneIconMobile = () => <img src='/images/icon-phone.svg' alt='전화' width={32} height={32} />

// 아코디언 화살표 아이콘
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={`${styles.chevronIcon} ${isOpen ? styles.open : ''}`}
  >
    <path d='M9 4L17 12L9 20' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
)

// 다운로드 아이콘
const DownloadIcon = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src='/images/down_load.png'
    alt='다운로드'
    width={20}
    height={16}
    style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))' }}
  />
)

// 카카오톡 아이콘
const KakaoIcon = () => (
  <svg width='18' height='16' viewBox='0 0 18 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_kakao)'>
      <path
        d='M9 0.078125C13.9719 0.078125 18 3.25625 18 7.175C18 11.0938 13.9719 14.2719 9 14.2719C8.45312 14.2719 7.91875 14.2344 7.4 14.1594C6.88125 14.525 3.88125 16.6313 3.59687 16.6719C3.59687 16.6719 3.48125 16.7156 3.38125 16.6594C3.28125 16.6031 3.3 16.45 3.3 16.45C3.33125 16.2438 4.08125 13.6625 4.21875 13.1844C1.68438 11.9312 0 9.70625 0 7.17188C0 3.25312 4.02812 0.078125 9 0.078125ZM2.69375 5.05312C2.4125 5.05312 2.18438 5.28125 2.18438 5.5625C2.18438 5.84375 2.4125 6.07188 2.69375 6.07188H3.50312V9.15625C3.50312 9.43125 3.7375 9.65312 4.02187 9.65312C4.30625 9.65312 4.54063 9.43125 4.54063 9.15625V6.07188H5.35C5.63125 6.07188 5.85938 5.84375 5.85938 5.5625C5.85938 5.28125 5.63125 5.05312 5.35 5.05312H2.69062H2.69375ZM7.09375 5.05312C6.75625 5.05937 6.49062 5.31563 6.40312 5.56563L5.1625 8.83438C5.00625 9.325 5.14375 9.50625 5.28438 9.57187C5.38438 9.61875 5.5 9.64375 5.61562 9.64375C5.83125 9.64375 5.99687 9.55625 6.04688 9.41562L6.30312 8.74063H7.8875L8.14375 9.4125C8.19375 9.55313 8.35938 9.64062 8.575 9.64062C8.69063 9.64062 8.80313 9.61563 8.90625 9.56875C9.05 9.50313 9.1875 9.32188 9.02812 8.83125L7.7875 5.56563C7.7 5.31563 7.43437 5.05937 7.09375 5.05312ZM12.7469 5.05312C12.4594 5.05312 12.2281 5.2875 12.2281 5.57188V9.125C12.2281 9.4125 12.4625 9.64375 12.7469 9.64375C13.0312 9.64375 13.2656 9.40938 13.2656 9.125V7.99375L13.4469 7.8125L14.6625 9.425C14.7625 9.55625 14.9125 9.63125 15.0781 9.63125C15.1906 9.63125 15.3 9.59688 15.3906 9.52812C15.5 9.44375 15.5719 9.32187 15.5906 9.18437C15.6094 9.04688 15.575 8.90938 15.4906 8.8L14.2125 7.10625L15.3969 5.925C15.4781 5.84375 15.5188 5.73125 15.5125 5.60938C15.5062 5.4875 15.45 5.37187 15.3594 5.28125C15.2625 5.18437 15.1313 5.12813 15.0031 5.12813C14.8906 5.12813 14.7906 5.16875 14.7156 5.24375L13.2688 6.69375V5.57812C13.2688 5.29063 13.0344 5.05937 12.75 5.05937L12.7469 5.05312ZM9.89375 5.05312C9.60313 5.05312 9.36563 5.2875 9.36563 5.57188V9.09688C9.36563 9.35938 9.5875 9.57187 9.8625 9.575H11.5281C11.8031 9.575 12.025 9.35938 12.025 9.09688C12.025 8.83438 11.8 8.62187 11.5281 8.62187H10.425V5.57188C10.425 5.28438 10.1875 5.05312 9.89375 5.05312ZM7.6125 7.82188H6.575L7.09375 6.35L7.6125 7.82188Z'
        fill='white'
      />
    </g>
    <defs>
      <clipPath id='clip0_kakao'>
        <rect width='18' height='16' fill='white' />
      </clipPath>
    </defs>
  </svg>
)

// 의료진 검색 아이콘
const DoctorIcon = () => (
  <svg width='39' height='45' viewBox='0 0 39 45' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_doctor)'>
      <path
        d='M24.1574 24.3983V29.6406C24.1574 31.8192 19.1212 37.7082 19.1212 37.7082C19.1212 37.7082 14.3555 31.8192 14.3555 29.6406V24.3728'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M28.4423 16.2032C28.4423 21.4455 24.2174 25.7005 19.0122 25.7005C13.7986 25.7005 9.58203 21.4455 9.58203 16.2032V11.6418C9.58203 6.39959 13.7986 2.14453 19.0122 2.14453C24.2258 2.14453 28.4423 6.39959 28.4423 11.6418V16.2032Z'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.63281 13.0117C9.63281 13.0117 15.7421 12.4926 18.7926 7.88013C18.7926 7.88013 23.0513 13.684 28.3917 13.684'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M24.3008 30.4153H25.0106C31.9057 30.4153 37.5081 36.049 37.5081 43.0017'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M1.84375 42.993C1.84375 36.0487 7.43762 30.4065 14.3412 30.4065'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M28.451 35.9978H25.5273V44.6271H28.451V35.9978Z' fill='white' />
      <path d='M31.2753 38.8401H22.707V41.7846H31.2753V38.8401Z' fill='white' />
    </g>
    <defs>
      <clipPath id='clip0_doctor'>
        <rect width='39' height='45' fill='white' />
      </clipPath>
    </defs>
  </svg>
)

interface InquiryLink {
  href: string
  label: string
  icon?: string
}

const inquiryLinksAnam: InquiryLink[] = [
  { href: '/mypage/patient-inquiry', label: '의뢰환자 조회' },
  { href: '/network/e-consult', label: 'E-consult 신청' },
  { href: '/network/hotline', label: '교수직통 핫라인' }
]

const inquiryLinksGuro: InquiryLink[] = [
  { href: '/mypage/patient-inquiry', label: '의뢰환자 조회' },
  { href: '#', label: '진료협력센터 카카오톡', icon: 'kakao' }
]

const inquiryLinksAnsan: InquiryLink[] = [
  { href: '/mypage/patient-inquiry', label: '의뢰환자 조회' },
  { href: '/referral/request/hira', label: '심평원중계시스템 의뢰' }
]

const downloadLinks = [
  { href: '#', label: '진료의뢰서' },
  { href: '#', label: '협력병의원 체결 신청서류' },
  { href: '#', label: '진료정보공개동의서' }
]

// 진료과 안내 아이콘
const HospitalIcon = () => (
  <svg width='49' height='45' viewBox='0 0 49 45' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_hospital)'>
      <path
        d='M41.4288 10.3269H7.57422V43.8958H41.4288V10.3269Z'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M26.3574 0H22.6602V10.7332H26.3574V0Z' fill='white' />
      <path d='M29.9105 3.53394H19.0859V7.20001H29.9105V3.53394Z' fill='white' />
      <path
        d='M1.11328 43.8958H47.886'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.263 19.1609H13.2539V23.1362H17.263V19.1609Z'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.263 29.7615H13.2539V33.7367H17.263V29.7615Z'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M27.3255 19.1609H23.3164V23.1362H27.3255V19.1609Z'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M27.3255 29.7615H23.3164V33.7367H27.3255V29.7615Z'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M37.3841 19.1609H33.375V23.1362H37.3841V19.1609Z'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M37.3841 29.7615H33.375V33.7367H37.3841V29.7615Z'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_hospital'>
        <rect width='49' height='45' fill='white' />
      </clipPath>
    </defs>
  </svg>
)

// 외래시간표 아이콘
const CalendarIcon = () => (
  <svg width='59' height='45' viewBox='0 0 59 45' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_calendar)'>
      <path
        d='M47.6373 5.24585H2.40817C1.80089 5.24585 1.30859 5.72565 1.30859 6.31752V42.6523C1.30859 43.2442 1.80089 43.724 2.40817 43.724H47.6373C48.2446 43.724 48.7369 43.2442 48.7369 42.6523V6.31752C48.7369 5.72565 48.2446 5.24585 47.6373 5.24585Z'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M47.9201 16.1978H1.30859'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M47.9201 30.3643H1.30859'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.2422 43.275V16.8201'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M25.0312 43.275V16.8201'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M36.8125 43.275V16.8201'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.7812 6.66461V1.27563'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.918 6.66461V1.27563'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.66016 6.66461V1.27563'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M35.7227 6.66461V1.27563'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M42.8438 6.66461V1.27563'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M28.5859 6.66461V1.27563'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M47.7415 24.189C53.2359 24.189 57.69 19.8479 57.69 14.493C57.69 9.13796 53.2359 4.79688 47.7415 4.79688C42.2471 4.79688 37.793 9.13796 37.793 14.493C37.793 19.8479 42.2471 24.189 47.7415 24.189Z'
        fill='white'
        stroke='#3A3A3A'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M47.5234 19.0042V14.197L51.262 11.9414'
        stroke='#3A3A3A'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_calendar'>
        <rect width='59' height='45' fill='white' />
      </clipPath>
    </defs>
  </svg>
)

// 오시는 길 아이콘
const MapIcon = () => (
  <svg width='44' height='45' viewBox='0 0 44 45' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_map)'>
      <path
        d='M20.748 1.97266C27.5697 1.24303 33.3007 6.48883 33.3008 13.0176C33.3008 13.0518 33.3019 13.0857 33.3047 13.1191C33.2831 15.4644 32.5179 17.6333 31.2324 19.4258L31.2002 19.4717L22.7998 32.3975C22.4093 32.9195 21.61 32.9198 21.2197 32.3975L12.8203 19.4717L12.7871 19.4229L12.5049 19.0117C11.1372 16.9235 10.4575 14.3604 10.8027 11.6143C11.4355 6.57484 15.5929 2.51838 20.7471 1.97266H20.748Z'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M22.0093 18.0138C25.1081 18.0138 27.6202 15.5377 27.6202 12.4833C27.6202 9.42895 25.1081 6.95288 22.0093 6.95288C18.9105 6.95288 16.3984 9.42895 16.3984 12.4833C16.3984 15.5377 18.9105 18.0138 22.0093 18.0138Z'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.5406 24.5781L11.443 23.6621L0.707031 25.9173V42.9181L12.147 40.8364L21.7707 44.3059L32.7954 40.8364L43.299 42.9181V25.9173L32.7954 23.6621L29.5429 24.5781'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.4414 40.8364V23.6621'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M32.7969 40.8364V23.6621'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21.7656 44.3055V34.5908'
        stroke='white'
        strokeWidth='2.41881'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_map'>
        <rect width='44' height='45' fill='white' />
      </clipPath>
    </defs>
  </svg>
)

// 아이콘 매핑
const iconMap: { [key: string]: React.FC } = {
  doctor: DoctorIcon,
  hospital: HospitalIcon,
  calendar: CalendarIcon,
  map: MapIcon
}

const infoLinks = [
  { href: '#', icon: 'doctor', label: '의료진 검색' },
  { href: '#', icon: 'hospital', label: '진료과 안내' },
  { href: '#', icon: 'calendar', label: '외래시간표' },
  { href: '/about/location', icon: 'map', label: '오시는 길' }
]

const contactInfoAnam = {
  phone: '02-920-5892',
  fax: '02-920-6523',
  callCenter: '1577-0083'
}

const contactInfoGuro = {
  phone: '02-2626-1681',
  fax: '02-2626-1691',
  callCenter: '1577-9966'
}

const contactInfoAnsan = {
  phone: '031-412-5103',
  fax: '031-412-4266',
  callCenter: '1577-7516'
}

// 슬라이드 자동 재생 간격 (ms)
const AUTOPLAY_INTERVAL = 30000

// 임베드 URL 판별 (Vimeo, YouTube 등)
function isEmbedUrl(url: string): boolean {
  return (
    url.includes('player.vimeo.com') ||
    url.includes('vimeo.com') ||
    url.includes('youtube.com') ||
    url.includes('youtu.be')
  )
}

// YouTube URL → embed 형식으로 변환
function toYouTubeEmbedUrl(url: string): string {
  // 이미 embed 형식이면 그대로
  if (url.includes('youtube.com/embed/')) return url

  // https://youtu.be/VIDEO_ID 형식
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`

  // https://www.youtube.com/watch?v=VIDEO_ID 형식
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`

  return url
}

// 임베드 URL에 자동재생/음소거 파라미터 추가
function getEmbedUrl(url: string): string {
  if (url.includes('vimeo.com')) {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}autoplay=1&muted=1&loop=1&background=1`
  }
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const embedUrl = toYouTubeEmbedUrl(url)
    const separator = embedUrl.includes('?') ? '&' : '?'
    return `${embedUrl}${separator}autoplay=1&mute=1&loop=1&controls=0&rel=0&showinfo=0&playlist=${embedUrl.split('/embed/')[1]?.split(/[?&]/)[0] || ''}`
  }
  return url
}

// 모바일 여부 감지 훅
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`)
    setIsMobile(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [breakpoint])

  return isMobile
}

// 다크모드 감지 훅
function useIsDark() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mql.matches)
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return isDark
}

// 슬라이드 배너 미디어 렌더러
const BannerMedia: React.FC<{
  banner: SlideBanner
  isActive: boolean
  isMobile: boolean
  videoRef?: React.RefObject<HTMLVideoElement | null>
}> = ({ banner, isActive, isMobile, videoRef }) => {
  const isVideo = banner.mediaType === 'VIDEO' && banner.videoUrl

  // 모바일에서는 영상 대신 모바일 이미지 표시
  if (isMobile) {
    const mobileImg = banner.mobileImageUrl || banner.imageUrl
    if (mobileImg) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={mobileImg} alt={banner.altText || '배너 이미지'} className={styles.bannerImage} />
      )
    }
    return null
  }

  if (isVideo) {
    const videoUrl = banner.videoUrl!

    // Vimeo/YouTube 임베드 URL
    if (isEmbedUrl(videoUrl)) {
      return (
        <iframe
          src={isActive ? getEmbedUrl(videoUrl) : undefined}
          className={styles.bannerIframe}
          allow='autoplay; fullscreen'
          allowFullScreen
          title={banner.altText || '배너 영상'}
        />
      )
    }

    // 직접 비디오 파일 (.mp4 등)
    return (
      <video ref={videoRef} autoPlay={isActive} muted loop playsInline preload='auto' className={styles.bannerVideo}>
        <source src={videoUrl} type='video/mp4' />
      </video>
    )
  }

  if (banner.imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={banner.imageUrl} alt={banner.altText || '배너 이미지'} className={styles.bannerImage} />
    )
  }

  return null
}

// 슬라이드 컨트롤 아이콘들
const PrevArrowIcon = () => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M10 3L5 8L10 13' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
)

const NextArrowIcon = () => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M6 3L11 8L6 13' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
)

const PauseIcon = () => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='4' y='3' width='3' height='10' rx='0.5' fill='white' />
    <rect x='9' y='3' width='3' height='10' rx='0.5' fill='white' />
  </svg>
)

const PlayIcon = () => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M5 3L12 8L5 13V3Z' fill='white' />
  </svg>
)

export const HeroSection: React.FC = () => {
  const { isAnam, isGuro, isAnsan, hospital } = useHospital()
  const { banners, loading: bannersLoading } = useSlideBanners()
  const videoRef = useRef<HTMLVideoElement>(null)
  const fallbackVideoRef = useRef<HTMLVideoElement>(null)
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // 슬라이더 상태
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)

  // 모바일 아코디언 상태
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)

  // 스크롤 최상단 여부
  const [isAtTop, setIsAtTop] = useState(true)
  const lastBoxRef = useRef<HTMLDivElement>(null)
  const [scrollDownRight, setScrollDownRight] = useState<number | null>(null)


  const isMobile = useIsMobile()
  const isDark = useIsDark()
  const hasBanners = banners.length > 0
  const totalSlides = banners.length

  // 병원별 비디오 소스 (배너가 없을 때 폴백)
  const fallbackVideoSrc = useMemo(() => {
    const suffix = isDark ? '-dark' : ''
    if (isGuro) return `/assets/video/main-visual-gu${suffix}.mp4`
    if (isAnsan) return `/assets/video/main-visual-ansan${suffix}.mp4`
    return `/assets/video/main-visual-an${suffix}.mp4`
  }, [isGuro, isAnsan, isDark])

  // 병원별 조회 서비스 링크
  const inquiryLinks = isGuro ? inquiryLinksGuro : isAnsan ? inquiryLinksAnsan : inquiryLinksAnam

  // 병원별 연락처 정보
  const contactInfo = isGuro ? contactInfoGuro : isAnsan ? contactInfoAnsan : contactInfoAnam

  // 병원별 서식 다운로드 링크 (구로/안산: 진료정보공개동의서 제외)
  const filteredDownloadLinks = isAnam
    ? downloadLinks
    : downloadLinks.filter(link => link.label !== '진료정보공개동의서')

  // 현재 활성 배너
  const currentBanner = hasBanners ? banners[currentIndex] : null

  // 슬라이드 이동
  const goToSlide = useCallback(
    (index: number) => {
      if (totalSlides === 0) return
      const nextIndex = ((index % totalSlides) + totalSlides) % totalSlides
      setCurrentIndex(nextIndex)
      setProgress(0)
    },
    [totalSlides]
  )

  const goNext = useCallback(() => {
    goToSlide(currentIndex + 1)
  }, [currentIndex, goToSlide])

  const goPrev = useCallback(() => {
    goToSlide(currentIndex - 1)
  }, [currentIndex, goToSlide])

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  // 자동 재생 및 프로그레스 바
  useEffect(() => {
    if (!hasBanners || !isPlaying) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current)
      if (progressTimerRef.current) clearInterval(progressTimerRef.current)
      return
    }

    setProgress(0)

    const progressInterval = 50
    const steps = AUTOPLAY_INTERVAL / progressInterval

    progressTimerRef.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + 100 / steps
        return next >= 100 ? 100 : next
      })
    }, progressInterval)

    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % totalSlides)
      setProgress(0)
    }, AUTOPLAY_INTERVAL)

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current)
      if (progressTimerRef.current) clearInterval(progressTimerRef.current)
    }
  }, [hasBanners, isPlaying, totalSlides, currentIndex])

  // 비디오 배너일 때 재생/정지 제어
  useEffect(() => {
    if (!currentBanner || currentBanner.mediaType !== 'VIDEO') return

    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
      }
    }
  }, [currentBanner, isPlaying])

  // 폴백 비디오 재생
  useEffect(() => {
    if (!hasBanners && fallbackVideoRef.current) {
      fallbackVideoRef.current.play().catch(error => {
        console.error('Video play error:', error)
      })
    }
  }, [hasBanners, fallbackVideoSrc])

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // scrollDown의 right 위치를 .last 박스 오른쪽 끝에 맞춤 (1870px 미만일 때만)
  useEffect(() => {
    const updateScrollDownRight = () => {
      if (window.innerWidth >= 1870) {
        setScrollDownRight(null)
      } else if (lastBoxRef.current) {
        const rect = lastBoxRef.current.getBoundingClientRect()
        const rightFromViewport = window.innerWidth - rect.right
        setScrollDownRight(rightFromViewport)
      }
    }
    updateScrollDownRight()
    window.addEventListener('resize', updateScrollDownRight)
    return () => window.removeEventListener('resize', updateScrollDownRight)
  }, [])

  // 배너 클릭 핸들러
  const handleBannerClick = useCallback(() => {
    if (!currentBanner?.linkUrl) return
    if (currentBanner.targetBlank) {
      window.open(currentBanner.linkUrl, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = currentBanner.linkUrl
    }
  }, [currentBanner])

  // 현재 슬라이드 번호 포맷 (01, 02 ...)
  const formatSlideNumber = (num: number) => String(num).padStart(2, '0')

  return (
    <section className={`section ${styles.section1}`}>
      {/* 배너 배경 영역 */}
      <div className={styles.videoWrap}>
        {hasBanners ? (
          banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`${styles.bannerSlide} ${index === currentIndex ? styles.active : ''}`}
              onClick={banner.linkUrl ? handleBannerClick : undefined}
              style={{ cursor: banner.linkUrl ? 'pointer' : 'default' }}
            >
              <BannerMedia
                banner={banner}
                isActive={index === currentIndex}
                isMobile={isMobile}
                videoRef={index === currentIndex ? videoRef : undefined}
              />
            </div>
          ))
        ) : !bannersLoading ? (
          isMobile ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={
                isGuro
                  ? '/assets/video/main-visual-gu-img.png'
                  : isAnsan
                    ? '/assets/video/main-visual-ansan-img.png'
                    : '/assets/video/main-visual-an-img.png'
              }
              alt='메인 비주얼'
              className={styles.bannerImage}
            />
          ) : (
            <video ref={fallbackVideoRef} key={fallbackVideoSrc} autoPlay muted loop playsInline preload='auto'>
              <source src={fallbackVideoSrc} type='video/mp4' />
            </video>
          )
        ) : null}
      </div>

      <div className='container'>
        {/* 타이틀 + 슬라이더 컨트롤 */}
        <div className={styles.titleArea}>
          {currentBanner?.mainSlogan || currentBanner?.subSlogan ? (
            <h2 className={styles.title}>
              {currentBanner.subSlogan && <span>{currentBanner.subSlogan}</span>}
              {currentBanner.mainSlogan && <strong>{currentBanner.mainSlogan}</strong>}
            </h2>
          ) : (
            <h2 className={styles.title}>
              <span>
                {isGuro
                  ? 'Fast Link, Better Care'
                  : isAnsan
                    ? '함께하는 진료, 더 넓은 세상으로'
                    : '의료네트워크의 중심,'}
              </span>
              <strong>고려대학교 {hospital.name.short} 진료협력센터</strong>
            </h2>
          )}

          {/* 슬라이더 네비게이션 */}
          {hasBanners && totalSlides > 1 && (
            <div className={styles.sliderNav}>
              <button type='button' className={styles.sliderBtn} onClick={goPrev} aria-label='이전 슬라이드'>
                <PrevArrowIcon />
              </button>
              <div className={styles.sliderProgress}>
                <span className={styles.slideNumber}>{formatSlideNumber(currentIndex + 1)}</span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>
                <span className={styles.slideNumber}>{formatSlideNumber(totalSlides)}</span>
              </div>
              <button
                type='button'
                className={styles.sliderBtn}
                onClick={togglePlay}
                aria-label={isPlaying ? '일시정지' : '재생'}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button type='button' className={styles.sliderBtn} onClick={goNext} aria-label='다음 슬라이드'>
                <NextArrowIcon />
              </button>
            </div>
          )}
        </div>

        {/* 퀵 메뉴 박스 */}
        <div className={styles.quickBox}>
          <div className={`${styles.box} ${styles.inquiry} ${isInquiryOpen ? styles.accordionOpen : ''}`}>
            <button
              className={styles.boxTitle}
              onClick={() => setIsInquiryOpen(!isInquiryOpen)}
              type='button'
              aria-expanded={isInquiryOpen}
            >
              <span>조회 서비스</span>
              <ChevronIcon isOpen={isInquiryOpen} />
            </button>
            <div className={styles.linkList}>
              {inquiryLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`${styles.line} ${link.icon === 'kakao' ? styles.kakaoLink : ''}`}
                >
                  {link.label}
                  {link.icon === 'kakao' && <KakaoIcon />}
                </Link>
              ))}
            </div>
          </div>
          <div className={`${styles.box} ${styles.down} ${isDownloadOpen ? styles.accordionOpen : ''}`}>
            <button
              className={styles.boxTitle}
              onClick={() => setIsDownloadOpen(!isDownloadOpen)}
              type='button'
              aria-expanded={isDownloadOpen}
            >
              <span>서식 다운로드</span>
              <ChevronIcon isOpen={isDownloadOpen} />
            </button>
            <div className={styles.linkList}>
              {filteredDownloadLinks.map((link, index) => (
                <Link key={index} href={link.href} className={styles.line}>
                  <span>{link.label}</span>
                  <DownloadIcon />
                </Link>
              ))}
            </div>
          </div>
          <div className={`${styles.box} ${styles.square}`}>
            <div className={styles.hoverOverlay} aria-hidden='true' />
            <ul>
              {infoLinks.map((link, index) => {
                const IconComponent = iconMap[link.icon]
                return (
                  <li key={index}>
                    <Link href={link.href}>
                      {IconComponent ? <IconComponent /> : <i className={`icon ${link.icon} ${styles.icon}`}></i>}
                      <p>{link.label}</p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div ref={lastBoxRef} className={`${styles.box} ${styles.last}`}>
            <div className={styles.phoneIcon}>
              <span className={styles.phoneIconDesktop}>
                <PhoneIcon />
              </span>
              <span className={styles.phoneIconMobile}>
                <PhoneIconMobile />
              </span>
              <span className={styles.phoneLabel}>문의</span>
            </div>
            <p className={styles.phoneNumber}>{contactInfo.phone}</p>
            <ul className={styles.contactList}>
              <li>팩스 : {contactInfo.fax}</li>
              <li>콜센터(진료예약) : {contactInfo.callCenter}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Scroll Down 인디케이터 - section1 기준 absolute, container 밖 */}
      {isAtTop && (
        <div className={styles.scrollDown} style={scrollDownRight !== null ? { right: `${scrollDownRight}px` } : undefined}>
          <span className={styles.scrollDownText}>Scroll Down</span>
          <div className={styles.scrollDownIcon}>
            <svg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M7 10L11.5 14.5L16 10' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
        </div>
      )}
    </section>
  )
}
