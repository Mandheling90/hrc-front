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
  description: string | string[]
  href?: string // 링크 URL (optional)
  tabletSpan?: number // 태블릿에서 차지할 칸 수 (기본값: 1)
  mobileSpan?: number // 모바일에서 차지할 칸 수 (기본값: 1, 2로 설정 시 2열로 표시)
  mobileTitleBelowIcon?: boolean // 모바일에서 title을 아이콘 아래에 배치
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
  services?: ServiceItem[] // 커스텀 카드 배열 (구로병원 등)
  cards?: RequestCard[] // 진료의뢰 카드 배열 (전화/전자/SNS)
}

// ProcedureList 아이템 타입
export interface ProcedureListItem {
  text: string
  highlighted?: boolean
}

// 진료정보교류 의뢰 페이지 정보
export interface ReferralExchangeInfo {
  intro: string[] // InfoBox 메시지
  breadcrumbs?: BreadcrumbItemConfig[] // Breadcrumb 설정
  services?: ServiceItem[] // 진료정보교류 사업 목적 서비스 목록 (없으면 ProcedureList 사용)
  referralDescription?: ProcedureListItem[] // 진료정보교류 진료의뢰 설명 (services가 없을 때 사용)
  procedureSteps?: ProcedureListItem[] // 진료정보교류 진료의뢰 절차
  applicationSteps?: ProcedureListItem[] // 진료정보교류사업 이용 신청 방법
  contact?: string | string[] // 문의 연락처 (문자열 또는 문자열 배열)
}

// 심평원 중계시스템 스텝 이미지 하이라이트 설정
export interface HiraStepHighlight {
  className: string // 하이라이트 박스 클래스명 (highlight1, highlight2 등)
  number: number // 표시할 번호
}

// 심평원 중계시스템 스텝 설명 아이템
export interface HiraStepDescriptionItem {
  number: number // 번호
  text: string // 설명 텍스트
}

// 심평원 중계시스템 스텝 정보
export interface HiraStep {
  stepNumber: string // STEP. 01, STEP. 02 등
  title: string // 스텝 제목
  linkText?: string // 제목 내 링크 텍스트 (있는 경우)
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
  highlights: HiraStepHighlight[] // 이미지 위 하이라이트 박스들
  descriptions: HiraStepDescriptionItem[] // 스텝 설명 목록
}

// 심평원 중계시스템 의뢰 페이지 정보
export interface ReferralHiraInfo {
  pageTitle: string // 페이지 제목
  intro: string[] // InfoBox 메시지
  breadcrumbs?: BreadcrumbItemConfig[] // Breadcrumb 설정
  businessPurpose?: ProcedureListItem[] // 사업 목적 (리스트 형태)
  businessPurposeServices?: ServiceItem[] // 사업 목적 (서비스 카드 형태, 안산병원 등)
  target?: ProcedureListItem[] // 대상 (구로병원 등)
  steps: HiraStep[] // 진료의뢰 절차 스텝들
  contact?: string | string[] // 문의 연락처
}

// 협력네트워크 절차 단계 정보
export interface NetworkProcessStep {
  stepNumber: string // "01", "02" 등
  title: string // 단계 제목
  icon: string // 아이콘 컴포넌트 이름
}

// 협력네트워크 페이지 정보
export interface NetworkInfo {
  intro: string[] // InfoBox 메시지
  breadcrumbs?: BreadcrumbItemConfig[] // Breadcrumb 설정
  benefits?: ProcedureListItem[] // 협력병·의원 혜택안내
  target?: {
    hospital?: ProcedureListItem[] // 협력병원 대상
    clinic?: ProcedureListItem[] // 협력의원 대상
  }
  applicationMethod?: ProcedureListItem[] // 신청방법
  processSteps?: NetworkProcessStep[] // 체결 절차 단계
  contact?: {
    phone?: string // 전화번호
    fax?: string // 팩스번호
  }
  downloadLink?: string // 신청서 다운로드 링크
  applicationLinks?: {
    hospital?: string // 협력병원 온라인 신청 링크
    clinic?: string // 협력의원 온라인 신청 링크
  }
}

// 개인정보 수집 약관 정보
export interface SignupAgreementInfo {
  hospitalName: string // 병원명 (예: "고려대학교 안암병원", "고려대학교 구로병원", "고려대학교안산병원")
  intro: string // 소개 문구
  purpose: {
    title: string // "1. 개인 정보의 수집 목적 및 이용"
    items: string[] // 목적 항목들
  }
  items: {
    title: string // "2. 수집하려는 개인정보의 항목"
    required: string // 필수 항목 설명
    autoCollected: string // 자동 수집 정보 설명
  }
  retention: {
    title: string // "3. 개인정보의 보유 이용기간"
    period: string // 보유 기간 설명
    dormant: string // 휴면계정 설명
  }
  refusal: {
    title: string // "4. 동의를 거부할 권리 / 동의거부에 따른 안내"
    description: string // 거부 권리 설명
  }
}

// 운영 안내 카드 정보
export interface OperationInfoCardData {
  icon: string // 아이콘 컴포넌트 이름
  title: string // 카드 제목
  rows: {
    label: string // 라벨 (예: "평일", "Tel")
    value: string // 값 (예: "08:30 ~ 17:30", "02-920-5892")
  }[]
}

// 진료의뢰 절차 단계 정보
export interface ProcedureFlowStep {
  chip: string // 단계 제목 (예: "진료의뢰")
  items: ProcedureListItem[] // 단계 설명 항목들
  stepIcon: string // 아이콘 컴포넌트 이름
}

// 진료협력센터 소개 페이지 정보
export interface AboutIntroInfo {
  introBox: {
    title: string // InfoBox 제목 (예: "KRC (Korea University Anam Hospital Referral Center)")
    messages: string[] // InfoBox 메시지 배열
  }
  mainTasks: ProcedureListItem[] // 주요업무 항목들
  operationInfo: {
    cards: OperationInfoCardData[] // 운영 안내 카드들
    note?: string // 안내 메시지 (예: "일요일, 공휴일 휴무입니다.")
  }
  procedureFlow: {
    steps: ProcedureFlowStep[] // 진료의뢰 절차 단계들
  }
}

// 센터장 인사말 슬로건 파트 (안산병원 전용 - 구간별 색상)
export interface GreetingSloganPart {
  text: string
  color: 'black' | 'primary'
}

// 센터장 인사말 페이지 정보
export interface AboutGreetingInfo {
  slogan: string // 슬로건 (단일 문자열, 다른 병원용)
  sloganParts?: GreetingSloganPart[] // 슬로건 파트 배열 (안산병원 전용 - 구간별 색상/스타일)
  image: {
    src: string // 이미지 경로
    alt: string // 이미지 대체 텍스트
    width: number // 이미지 너비
    height: number // 이미지 높이
  }
  message: string[] // 인사말 텍스트 (문단별로 배열)
  signature: {
    name: string // 센터장 이름
    title: string // 센터장 직함
  }
}

// 조직도 조직 정보
export interface OrganizationNode {
  title: string // 직책/부서명
  phone?: string // 전화번호 (선택)
  children?: OrganizationNode[] // 하위 조직
}

// 조직도 페이지 정보
export interface AboutOrganizationInfo {
  nodes: OrganizationNode[] // 조직도 계층 구조
}

// 버스 노선 정보
export interface BusRoute {
  number: string // 버스 번호
  type: 'blue' | 'green' | 'red' | 'yellow' // 버스 타입
}

// 버스 정류장 정보
export interface BusStop {
  name: string // 정류장명
  directions: {
    label: string // 방면 라벨
    routes: BusRoute[] // 버스 노선 배열
  }[]
}

// 지하철 정보
export interface SubwayInfo {
  line: string // 지하철 노선 (예: "6호선")
  station: string // 역명
  exit?: string // 출구 번호
  walkTime?: string // 도보 시간
  description: string // 설명
}

// 인천공항 경로 정보
export interface AirportRoute {
  steps: {
    type: 'bus' | 'subway' | 'destination' // 경로 타입
    label: string // 라벨 (버스 번호, 역명 등)
  }[]
}

// 오시는 길 페이지 정보
export interface AboutLocationInfo {
  address: {
    jibun: string // 지번 주소
    road: string // 도로명 주소
  }
  mapLinks: {
    naver?: string // 네이버 지도 링크
    daum?: string // 다음 지도 링크
    google?: string // 구글 지도 링크
  }
  subway?: SubwayInfo // 지하철 정보
  bus?: BusStop[] // 버스 정보
  airport?: AirportRoute // 인천공항 경로
}

// 페이지 콘텐츠 타입
export interface HospitalPageContent {
  referral: {
    intro: string[] // InfoBox 메시지
    services: ServiceItem[]
  }
  referralRequest?: ReferralRequestInfo // 진료협력센터 의뢰 페이지 정보
  referralExchange?: ReferralExchangeInfo // 진료정보교류 의뢰 페이지 정보
  referralHira?: ReferralHiraInfo // 심평원 중계시스템 의뢰 페이지 정보
  network?: NetworkInfo // 협력네트워크 페이지 정보
  signupAgreement?: SignupAgreementInfo // 회원가입 개인정보 수집 약관 정보
  aboutIntro?: AboutIntroInfo // 진료협력센터 소개 페이지 정보
  aboutGreeting?: AboutGreetingInfo // 센터장 인사말 페이지 정보
  aboutOrganization?: AboutOrganizationInfo // 조직도 페이지 정보
  aboutLocation?: AboutLocationInfo // 오시는 길 페이지 정보
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
