# hrc-front

진료협력센터 프론트 구축

## 기술 스택

| 항목        | 버전/기술                           |
| ----------- | ----------------------------------- |
| Framework   | Next.js 15.5.9 (App Router)         |
| React       | 19.2.3                              |
| 언어        | TypeScript (strict mode)            |
| 스타일링    | SCSS + CSS Modules                  |
| 상태 관리   | React Context API (HospitalContext) |
| 코드 스타일 | EditorConfig + ESLint + Prettier    |
| 렌더링      | SSR (Server-Side Rendering)         |
| 디자인 패턴 | Atomic Design Pattern               |
| 반응형      | 미디어쿼리 (반응형 + 적응형)        |
| 테마        | 라이트/다크모드 지원                |
| 멀티테넌트  | 병원별 환경변수 기반 설정           |

## 프로젝트 구조

```
src/
├── app/                 # 페이지 (Next.js App Router)
│   ├── layout.tsx       # 루트 레이아웃
│   ├── page.tsx         # 홈페이지
│   ├── login/           # 로그인 페이지
│   ├── signup/          # 회원가입 페이지
│   ├── find-user/       # 아이디/비밀번호 찾기
│   ├── reset-password/  # 비밀번호 재설정
│   ├── referral/        # 진료의뢰 페이지
│   │   ├── department/  # 진료과 안내
│   │   └── request/     # 진료협력센터 의뢰
│   │       ├── exchange/ # 진료정보교류 의뢰
│   │       └── hira/     # 심평원중계시스템 의뢰
│   ├── network/         # 협력네트워크
│   │   ├── hospital-application/ # 협력병원 신청
│   │   ├── clinic-application/   # 협력병의원 신청
│   │   ├── status/      # 협력병의원 현황
│   │   ├── hotline/     # 교수직통 핫라인
│   │   └── e-consult/   # e-Consult
│   ├── notice/          # 공지/정보
│   │   ├── list/        # 공지사항
│   │   └── event/       # 교육/행사
│   ├── about/           # 진료협력센터 소개
│   │   ├── intro/       # 센터 소개
│   │   ├── greeting/    # 센터장 인사말
│   │   ├── organization/ # 조직도/연락처
│   │   └── location/    # 오시는 길
│   ├── mypage/          # 마이페이지
│   │   ├── edit-profile/ # 회원정보 수정
│   │   ├── edit-hospital/ # 협력병원 정보수정
│   │   ├── edit-clinic/  # 협력병의원 정보수정
│   │   ├── patient-inquiry/ # 의뢰환자 조회
│   │   ├── patient-result/  # 의뢰환자 결과조회
│   │   └── withdraw/     # 회원탈퇴
│   └── style-guide/     # 스타일 가이드 페이지
│
├── components/          # Atomic Design 패턴
│   ├── atoms/           # Button, Input, Checkbox, Radio, Select 등
│   ├── molecules/       # ServiceCard, AlertModal, ProgressSteps 등
│   ├── organisms/       # Header, Footer, LoginForm, SignupForm 등
│   ├── templates/       # MainTemplate
│   ├── icons/           # SVG 아이콘 컴포넌트 (70개+)
│   └── providers/       # 전역 Provider 컴포넌트
│
├── config/              # 설정 파일
│   ├── hospitals.ts     # 병원별 설정 (연락처, 주소, 링크 등)
│   └── pageContents.ts  # 병원별 페이지 콘텐츠
│
├── contexts/            # React Context
│   └── HospitalContext.tsx  # 병원 정보 Context 및 useHospital 훅
│
├── styles/              # 전역 스타일
│   ├── globals.scss     # 전역 스타일 (CSS 변수, 리셋)
│   ├── variables.scss   # 색상, 타이포그래피, 간격 변수
│   └── mixins.scss      # 유틸리티 믹스인
│
├── hooks/               # Custom React Hooks
├── lib/                 # 유틸리티 함수 및 라이브러리
├── types/               # TypeScript 타입 정의
│   └── hospital.ts      # 병원 관련 타입 정의
└── utils/               # 헬퍼 함수
```

## 페이지 구성

### 메인 / 인증

| 경로              | 설명                 | 주요 컴포넌트                                          |
| ----------------- | -------------------- | ------------------------------------------------------ |
| `/`               | 홈페이지             | HeroSection, NoticeSection, SNSSection, PartnerSection |
| `/login`          | 로그인               | LoginForm                                              |
| `/signup`         | 회원가입 (4단계)     | SignupForm, ProgressSteps                              |
| `/find-user`      | 아이디/비밀번호 찾기 | FindUserForm                                           |
| `/reset-password` | 비밀번호 재설정      | ResetPasswordForm                                      |

### 진료의뢰

| 경로                         | 설명                  | 주요 컴포넌트                            |
| ---------------------------- | --------------------- | ---------------------------------------- |
| `/referral`                  | 진료의뢰시스템 소개   | ServiceCard, ServiceSection              |
| `/referral/request`          | 진료협력센터 의뢰     | ServiceSection, InfoBox, Breadcrumbs     |
| `/referral/request/exchange` | 진료정보교류 의뢰     | SectionTitle, ServiceSection, InfoBox    |
| `/referral/request/hira`     | 심평원중계시스템 의뢰 | SectionTitle, ServiceSection, InfoBox    |
| `/referral/department`       | 진료과 안내           | DepartmentSidebar, ScheduleTable, Pagination |

### 협력네트워크

| 경로                                | 설명               | 주요 컴포넌트                               |
| ----------------------------------- | ------------------ | ------------------------------------------- |
| `/network`                          | 협력네트워크 소개  | ServiceSection, ServiceCard                 |
| `/network/hospital-application`     | 협력병원 신청      | ProgressSteps, HospitalInfoStep 등          |
| `/network/hospital-application/complete` | 협력병원 신청완료 | CompleteStep                               |
| `/network/clinic-application`       | 협력병의원 신청    | ProgressSteps, ClinicInfoStep 등            |
| `/network/status`                   | 협력병의원 현황    | TabNavigation, ClinicCard, Pagination       |
| `/network/hotline`                  | 교수직통 핫라인    | DoctorCard, ScheduleTable, WeekSelector     |
| `/network/e-consult`                | e-Consult 소개     | ServiceSection, InfoBox                     |
| `/network/e-consult/login`          | e-Consult 로그인   | LoginForm                                   |
| `/network/e-consult/list`           | e-Consult 목록     | Table, Pagination, SearchFilterWithInfo     |
| `/network/e-consult/list/[id]`      | e-Consult 상세     | MedicalReplyModal, DiagnosticDetailModal    |

### 공지/정보

| 경로               | 설명          | 주요 컴포넌트                   |
| ------------------ | ------------- | ------------------------------- |
| `/notice/list`     | 공지사항 목록 | Table, Pagination               |
| `/notice/list/[id]`| 공지사항 상세 | PrevNextNavigation              |
| `/notice/event`    | 교육/행사     | CardList, Pagination            |

### 진료협력센터 소개

| 경로                 | 설명           | 주요 컴포넌트                                   |
| -------------------- | -------------- | ----------------------------------------------- |
| `/about/intro`       | 센터 소개      | SectionTitle, InfoBox                           |
| `/about/greeting`    | 센터장 인사말  | SectionTitle                                    |
| `/about/organization`| 조직도/연락처  | OperationInfoCards, ScheduleTitle               |
| `/about/location`    | 오시는 길      | TabNavigation, TransportAccordion, MapPlaceholder |

### 마이페이지

| 경로                      | 설명              | 주요 컴포넌트                                |
| ------------------------- | ----------------- | -------------------------------------------- |
| `/mypage`                 | 마이페이지 메인   | ServiceCard                                  |
| `/mypage/edit-profile`    | 회원정보 수정     | MemberInfoForm, FormField                    |
| `/mypage/edit-hospital`   | 협력병원 정보수정 | HospitalInfoStep, StaffInfoStep 등           |
| `/mypage/edit-clinic`     | 협력병의원 정보수정| ClinicInfoStep, DirectorInfoStep 등         |
| `/mypage/patient-inquiry` | 의뢰환자 조회     | Table, Pagination, SearchFilterWithInfo      |
| `/mypage/patient-result`  | 의뢰환자 결과조회 | Table, PathologyResultModal, ImageViewerModal|
| `/mypage/withdraw`        | 회원탈퇴          | AlertModal                                   |

### 기타

| 경로           | 설명          | 주요 컴포넌트                        |
| -------------- | ------------- | ------------------------------------ |
| `/style-guide` | 스타일 가이드 | 모든 UI 컴포넌트 및 디자인 토큰      |

## 컴포넌트 구조 (Atomic Design)

### Atoms (10개)

- **Button** - variant: primary/secondary/outline/gray, size: small/medium/large
- **Input** - forwardRef 지원
- **InputLabel**
- **Checkbox** - 접근성 지원
- **Radio**
- **Select**
- **Textarea**
- **ScrollableBox**
- **StatusBadge** - 상태 표시 배지
- **RouteChip** - 교통 노선 칩

### Molecules (50개+)

**폼 관련**
- FormField, LabelInputRow, LabelInputRowGroup
- AddressField, AddressSearchBar
- CheckboxGroup, DoctorSearchModal

**카드/리스트**
- ServiceCard (Horizontal, Vertical, StepBadge 변형)
- ClinicCard, DoctorCard, CardList
- NoticeList, ProcedureList, BusStopList

**네비게이션**
- Breadcrumbs, Pagination, PrevNextNavigation
- TabNavigation, ProgressSteps, ProcessSteps

**테이블/데이터**
- Table, ScheduleTable
- ScheduleTitle, WeekSelector

**모달/알림**
- AlertModal, LoadSaveModal
- CarDirectionModal

**섹션**
- SectionTitle, SectionContainer, SectionHeader
- InfoBox, InfoNote, SystemIntroBox

**교통/지도**
- MapPlaceholder, MapServiceLinks, ShuttleRouteMap
- TransportAccordion, AirportRoute
- AirportBusTable, AirportBusTableAnsan
- SubwayInfoAnsan, CarDirectionButtons
- FloorMapAnsan

**기타**
- AgreementContent, PrivacyConsentContent
- OperationInfoCards, ProcedureFlow
- SearchFilterWithInfo

### Organisms (30개+)

**레이아웃**
- **Header** - 반응형 GNB 메가 드롭다운 메뉴
  - 데스크톱 (1430px+): 호버 시 메가 드롭다운 메뉴
  - 태블릿 (769px~1429px): 전체화면 슬라이드 다운 메뉴
  - 모바일 (~768px): 우측 사이드 패널 메뉴
- **Footer**

**인증**
- LoginForm, SignupForm
- FindUserForm, ResetPasswordForm

**회원가입 단계**
- AgreementStep, VerificationStep
- MemberInfoStep, MemberInfoForm, CompleteStep

**병원 신청 단계**
- HospitalInfoStep, StaffInfoStep
- BasicTreatmentStep, BedAndFacilityStep
- CareSystemStep, HospitalCharacteristicsStep
- MedicalDepartmentStep

**병의원 신청 단계**
- ClinicInfoStep, ClinicStaffInfoStep, DirectorInfoStep

**홈페이지 섹션**
- HeroSection, NoticeSection
- PartnerSection, ServiceSection, SNSSection

**기타**
- DepartmentSidebar
- DiagnosticDetailModal, ImageViewerModal
- MedicalReplyModal, PathologyResultModal

### Icons (70개+)

**기본 UI 아이콘**
- CheckIcon, ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon
- CloseIcon, SearchIcon, EyeIcon, HomeIcon, InfoIcon, WarningIcon
- ArrowDownIcon, ArrowRightIcon, ArrowRightCircleIcon, ArrowDownloadIcon

**서비스 아이콘**
- ConsultingIcon, NetworkIcon, PatientIcon, ReferralIcon
- SystemIcon, ShieldIcon, LinkIcon, ServiceTitleIcon

**진료의뢰 전용 아이콘**
- PhoneRequestIcon, DocumentReferralIcon, HospitalPortalIcon
- SNSTalkIcon, ContinuityIcon, SafetyIcon, QualityIcon

**프로세스/문서 아이콘**
- ChartStepperIcon, FlowArrowIcon, FlowStep01~05Icon
- DocumentIcon, FileUploadIcon, FileRemoveIcon
- ApprovalIcon, CertificateIcon, ReviewIcon

**인물/시설 아이콘**
- DoctorIcon, DoctorInfoIcon, IPinIcon
- ConsultIcon, ConsultBadgeIcon, EConsultingIcon

**파일/데이터 아이콘**
- DownloadIcon, LoadIcon, SaveIcon, PaperclipIcon, PlusIcon

**교통 아이콘**
- BusIcon, SubwayIcon, CarIcon, BridgeIcon, RoadIcon
- MapIcon, ListIcon

**시간/운영 아이콘**
- CalendarIcon, OperationTimeIcon, OperationPhoneFaxIcon
- EmergencyNightIcon, FaxIcon, PhoneIcon, HandshakeIcon

**기타 아이콘**
- FluentArrowCircleUpRight, CollapseDownIcon, CollapseUpIcon
- RouteChip (버스 노선), NaverLogo, GoogleLogo, DaumLogo

## 스타일 시스템

### CSS 변수

```scss
// 주요 색상
--color-primary: #9f1836    // 주홍색
--color-secondary: #fae3ba  // 베이지색
--color-point: #ec5a29      // 포인트 주황색

// 그레이스케일
--gray-100 ~ --gray-900

// 다크모드
[data-theme='dark'] 지원
```

### 반응형 브레이크포인트

```scss
// 전역 브레이크포인트 (variables.scss)
$breakpoints: (
  sm: 500px,
  md: 720px,
  lg: 1024px,
  xl: 1200px,
  2xl: 1430px
);

// Header 전용 브레이크포인트
$bp-mobile: 768px;    // 모바일: ~768px
$bp-tablet: 1429px;   // 태블릿: 769px ~ 1429px
                      // 데스크톱: 1430px~
```

## 병원별 환경 설정

이 프로젝트는 하나의 코드베이스로 안암/구로/안산 3개 병원을 지원합니다.

### 지원 병원

| 병원 ID | 병원명              | 환경 파일    |
| ------- | ------------------- | ------------ |
| `anam`  | 고려대학교 안암병원 | `.env.anam`  |
| `guro`  | 고려대학교 구로병원 | `.env.guro`  |
| `ansan` | 고려대학교 안산병원 | `.env.ansan` |

### 환경 변수 설정

```bash
# .env.example 파일을 복사하여 사용
cp .env.example .env.local

# 또는 병원별 환경 파일 사용
cp .env.anam .env.local   # 안암병원
cp .env.guro .env.local   # 구로병원
cp .env.ansan .env.local  # 안산병원
```

### 환경 변수

| 변수명                    | 설명        | 값                      |
| ------------------------- | ----------- | ----------------------- |
| `NEXT_PUBLIC_HOSPITAL_ID` | 병원 식별자 | `anam`, `guro`, `ansan` |

### 병원별 설정 구조

```typescript
// src/config/hospitals.ts
HospitalConfig {
  id: HospitalId           // 병원 ID
  name: { full, short, hospital, center, english }
  contact: { phone, fax, reservation, referralCenter }
  address: { zipCode, full, short }
  links: { homepage, reservation, naver, youtube }
  logo: { header, footer }
  certifications: { emr, isms }
  copyright: string
}
```

### 사용법

```typescript
import { useHospital } from '@/contexts/HospitalContext'

const MyComponent = () => {
  const { hospital, hospitalId, isAnam, isGuro, isAnsan } = useHospital()

  return <div>{hospital.name.full}</div>
}
```

## 스크립트

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm start            # 프로덕션 서버 실행
npm run lint         # ESLint 검사
npm run lint:fix     # ESLint 자동 수정
npm run format       # Prettier 포매팅
npm run format:check # Prettier 검사
```

## 개발 현황

### 퍼블리싱 완료 (전체 35개 페이지)

**메인/인증 (5개)**
- 홈페이지, 로그인, 회원가입(4단계), 아이디/비밀번호 찾기, 비밀번호 재설정

**진료의뢰 (5개)**
- 진료의뢰 소개, 진료협력센터 의뢰, 진료정보교류 의뢰, 심평원중계시스템 의뢰, 진료과 안내

**협력네트워크 (8개)**
- 협력네트워크 소개, 협력병원 신청, 협력병원 신청완료, 협력병의원 신청
- 협력병의원 현황, 교수직통 핫라인, e-Consult 소개, e-Consult 로그인, e-Consult 목록/상세

**공지/정보 (3개)**
- 공지사항 목록/상세, 교육/행사

**진료협력센터 소개 (4개)**
- 센터 소개, 센터장 인사말, 조직도/연락처, 오시는 길

**마이페이지 (7개)**
- 마이페이지 메인, 회원정보 수정, 협력병원 정보수정, 협력병의원 정보수정
- 의뢰환자 조회, 의뢰환자 결과조회, 회원탈퇴

**기타 (1개)**
- 스타일 가이드

### 완성된 기능

- UI 컴포넌트 구조 (Atomic Design)
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 다크모드 CSS 변수 준비
- 접근성 지원 (ARIA labels, semantic HTML)
- 스타일 시스템 (변수, 믹스인, CSS Modules)
- 병원별 환경 설정 시스템 (안암/구로/안산)
- HospitalContext 및 useHospital 훅
- 병원별 페이지 콘텐츠 관리
- Header 컴포넌트 (반응형 GNB)

### 미포함 항목 (백엔드 연동)

- API 통신 로직
- 백엔드 연동
- 테스트 코드
- 인증/연동 시스템 구현
- 실제 데이터 바인딩
- 지도 API 연동
