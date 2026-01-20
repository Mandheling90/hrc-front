// 병원 ID 타입
export type HospitalId = 'anam' | 'guro' | 'ansan'

// 병원 연락처 정보
export interface HospitalContact {
  phone: string // 대표전화
  fax: string // FAX
  reservation: string // 진료예약
  referralCenter: string // 진료협력센터 전화
}

// 병원 주소 정보
export interface HospitalAddress {
  zipCode: string // 우편번호
  full: string // 전체 주소
  short: string // 짧은 주소 (시/구 까지)
}

// 병원 링크 정보
export interface HospitalLinks {
  homepage: string // 병원 홈페이지
  reservation: string // 예약 페이지
  naver: string // 네이버 지도
  youtube: string // 유튜브
}

// 병원 설정
export interface HospitalConfig {
  id: HospitalId
  name: {
    full: string // 고려대학교 안암병원 진료협력센터
    short: string // 안암병원
    hospital: string // 고려대학교 안암병원
    center: string // 진료협력센터
    english: string // KOREA UNIVERSITY ANAM HOSPITAL REFERRAL CENTER
  }
  contact: HospitalContact
  address: HospitalAddress
  links: HospitalLinks
  logo: {
    header: string // 헤더 로고 경로
    footer: string // 푸터 로고 경로
  }
  certifications: {
    emr: {
      image: string
      scope: string
      validity: string
    }
    isms: {
      image: string
      scope: string
      validity: string
    }
  }
  copyright: string
}

// 서비스 아이템 타입
export interface ServiceItem {
  id: string
  icon: string // 아이콘 컴포넌트 이름
  title: string
  description: string
  href: string
}

// Breadcrumb 아이템 타입
export interface BreadcrumbItemConfig {
  label: string
  href?: string
  icon?: string // 아이콘 이름 ('HomeIcon', 'ChevronDownIcon' 등)
  iconAfter?: boolean
}

// 진료의뢰 카드 타입
export type RequestCardType = 'phone' | 'electronic' | 'sns'

// 진료의뢰 카드 정보
export interface RequestCard {
  type: RequestCardType
  icon: string // 아이콘 컴포넌트 이름
  title: string
  description?: string // 전자카드의 경우 설명
  phone?: string // 전화번호 (phone, sns 타입)
  channel?: string // SNS 채널명 (sns 타입)
  operatingHours?: {
    weekday: string // 평일 운영시간
    saturday?: string // 토요일 운영시간
  }
}

// 진료협력센터 의뢰 페이지 정보
export interface ReferralRequestInfo {
  intro: string[] // InfoBox 메시지
  phone: string // 전화번호
  operatingHours: {
    weekday: string // 평일 운영시간
    saturday: string // 토요일 운영시간
  }
  breadcrumbs?: BreadcrumbItemConfig[] // Breadcrumb 설정 (병원별로 다를 수 있음)
  cards?: RequestCard[] // 커스텀 카드 배열 (구로병원 등)
}

// 페이지 콘텐츠 타입
export interface HospitalPageContent {
  referral: {
    intro: string[] // InfoBox 메시지
    services: ServiceItem[]
  }
  referralRequest?: ReferralRequestInfo // 진료협력센터 의뢰 페이지 정보
}

// 병원 컨텍스트 타입
export interface HospitalContextType {
  hospital: HospitalConfig
  pageContent: HospitalPageContent
  hospitalId: HospitalId
  isAnam: boolean
  isGuro: boolean
  isAnsan: boolean
}
