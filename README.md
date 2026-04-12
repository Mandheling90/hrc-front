# hrc-front

진료협력센터 프론트 구축

## 기술 스택

### 1. Core Framework & Runtime
- **Next.js 15** (App Router, SSR)
- **React 19**
- **Node.js 20 LTS** / npm 10

### 2. Language
- **TypeScript 5** (strict mode)

### 3. API & Data
- **GraphQL** (Apollo Client 4 + @apollo/client-integration-nextjs)
- **GraphQL Code Generator** (codegen.ts → 타입 자동 생성)

### 4. Styling
- **SCSS Modules** + Sass 1.97
- **Atomic Design Pattern** (Atoms → Molecules → Organisms → Templates)
- **반응형 3단계** (Desktop 1430px+ / Tablet 769~1429px / Mobile ~768px)
- **다크모드** (CSS 변수 기반, `[data-theme='dark']`)

### 5. State Management
- **React Context** (HospitalContext, AuthContext)
- **Apollo Client Cache** (서버 상태)

### 6. Authentication
- **JWT** (Access Token, localStorage 기반 영속화)

### 7. UI Library
- **antd 6** (일부 컴포넌트 활용)
- **카카오맵 JavaScript SDK** (오시는 길 지도)

### 8. Testing
- **Playwright 1.58** (E2E, 설정 완료 / 테스트 미작성)

### 9. Tooling
- **npm**
- **ESLint 8** + **Prettier 3.8**

### 10. Multi-tenant
- **URL 프리픽스 라우팅** (`/anam/...`, `/guro/...`, `/ansan/...`)
- 하나의 빌드로 3개 병원(안암/구로/안산) 서빙

## 프로젝트 구조

```
src/
├── app/                 # 페이지 (Next.js App Router)
│   ├── layout.tsx       # 루트 레이아웃
│   ├── page.tsx         # 메인 페이지
│   ├── login/           # 로그인
│   ├── signup/          # 회원가입
│   ├── find-user/       # 아이디/비밀번호 찾기
│   ├── reset-password/  # 비밀번호 재설정
│   ├── referral/        # 진료의뢰
│   ├── network/         # 협력네트워크
│   ├── notice/          # 공지/정보
│   ├── about/           # 센터 소개
│   ├── mypage/          # 마이페이지
│   └── style-guide/     # 스타일 가이드
├── components/          # 컴포넌트 (Atomic Design)
│   ├── atoms/           # 기본 UI 컴포넌트 (10개)
│   ├── molecules/       # 복합 컴포넌트 (53개)
│   ├── organisms/       # 대형 컴포넌트 (35개)
│   ├── icons/           # SVG 아이콘 (99개)
│   ├── templates/       # 페이지 템플릿
│   └── providers/       # Context Provider
├── config/              # 설정 파일
│   ├── hospitals.ts     # 병원별 설정
│   ├── pageContents.ts  # 병원별 페이지 콘텐츠
│   └── iconRegistry.tsx # 아이콘 레지스트리
├── contexts/            # React Context
│   └── HospitalContext.tsx
├── hooks/               # 커스텀 훅
│   └── index.ts         # useHospital
├── styles/              # 스타일
│   ├── variables.scss   # 디자인 토큰
│   ├── mixins.scss      # SCSS 믹스인
│   └── globals.scss     # 전역 스타일
├── types/               # TypeScript 타입 정의
│   ├── hospital.ts      # 병원 관련 타입
│   └── hospital-application.ts  # 신청 폼 타입/상수
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

| 경로                         | 설명                  | 주요 컴포넌트                                |
| ---------------------------- | --------------------- | -------------------------------------------- |
| `/referral`                  | 진료의뢰시스템 소개   | ServiceCard, ServiceSection                  |
| `/referral/request`          | 진료협력센터 의뢰     | ServiceSection, InfoBox, Breadcrumbs         |
| `/referral/request/exchange` | 진료정보교류 의뢰     | SectionTitle, ServiceSection, InfoBox        |
| `/referral/request/hira`     | 심평원중계시스템 의뢰 | SectionTitle, ServiceSection, InfoBox        |
| `/referral/department`       | 진료과 안내           | DepartmentSidebar, ScheduleTable, Pagination |

### 협력네트워크

| 경로                                     | 설명              | 주요 컴포넌트                            |
| ---------------------------------------- | ----------------- | ---------------------------------------- |
| `/network`                               | 협력네트워크 소개 | ServiceSection, ServiceCard              |
| `/network/hospital-application`          | 협력병원 신청     | ProgressSteps, HospitalInfoStep 등       |
| `/network/hospital-application/complete` | 협력병원 신청완료 | CompleteStep                             |
| `/network/clinic-application`            | 협력병의원 신청   | ProgressSteps, ClinicInfoStep 등         |
| `/network/status`                        | 협력병의원 현황   | TabNavigation, ClinicCard, Pagination    |
| `/network/hotline`                       | 교수직통 핫라인   | DoctorCard, ScheduleTable, WeekSelector  |
| `/network/e-consult`                     | e-Consult 소개    | ServiceSection, InfoBox                  |
| `/network/e-consult/login`               | e-Consult 로그인  | LoginForm                                |
| `/network/e-consult/list`                | e-Consult 목록    | Table, Pagination, SearchFilterWithInfo  |
| `/network/e-consult/list/[id]`           | e-Consult 상세    | MedicalReplyModal, DiagnosticDetailModal |

### 공지/정보

| 경로                | 설명          | 주요 컴포넌트        |
| ------------------- | ------------- | -------------------- |
| `/notice/list`      | 공지사항 목록 | Table, Pagination    |
| `/notice/list/[id]` | 공지사항 상세 | PrevNextNavigation   |
| `/notice/event`     | 교육/행사     | CardList, Pagination |

### 진료협력센터 소개

| 경로                  | 설명          | 주요 컴포넌트                                     |
| --------------------- | ------------- | ------------------------------------------------- |
| `/about/intro`        | 센터 소개     | SectionTitle, InfoBox                             |
| `/about/greeting`     | 센터장 인사말 | SectionTitle                                      |
| `/about/organization` | 조직도/연락처 | OperationInfoCards, ScheduleTitle                 |
| `/about/location`     | 오시는 길     | TabNavigation, TransportAccordion, KakaoMap       |

### 마이페이지

| 경로                      | 설명                | 주요 컴포넌트                                 |
| ------------------------- | ------------------- | --------------------------------------------- |
| `/mypage`                 | 마이페이지 메인     | ServiceCard                                   |
| `/mypage/edit-profile`    | 회원정보 수정       | MemberInfoForm, FormField                     |
| `/mypage/edit-hospital`   | 협력병원 정보수정   | HospitalInfoStep, StaffInfoStep 등            |
| `/mypage/edit-clinic`     | 협력병의원 정보수정 | ClinicInfoStep, DirectorInfoStep 등           |
| `/mypage/patient-inquiry` | 의뢰환자 조회       | Table, Pagination, SearchFilterWithInfo       |
| `/mypage/patient-result`  | 의뢰환자 결과조회   | Table, PathologyResultModal, ImageViewerModal |
| `/mypage/withdraw`        | 회원탈퇴            | AlertModal                                    |

### 기타

| 경로           | 설명          | 주요 컴포넌트                   |
| -------------- | ------------- | ------------------------------- |
| `/style-guide` | 스타일 가이드 | 모든 UI 컴포넌트 및 디자인 토큰 |

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

### Molecules (53개)

**폼 관련**

- FormField, LabelInputRow, LabelInputRowGroup
- AddressField, AddressSearchBar
- CheckboxGroup, DoctorSearchModal, ConfirmButtons

**카드/리스트**

- ServiceCard, HorizontalServiceCard, VerticalServiceCard, StepBadgeCard
- IconTitleCard, ClinicCard, DoctorCard
- **CardList** - 카드 목록 컴포넌트
  - variant: 'default' | 'infoCard' (의뢰환자 조회 스타일)
  - columns: 그리드 열 수 지정
  - scrollableHeight: 스크롤 영역 높이 설정
  - 스크롤바 자동 감지 기능
  - InfoRowContent: 라벨-값 쌍 표시 컴포넌트
- NoticeList, ProcedureList, BusStopList

**네비게이션**

- Breadcrumbs, Pagination, PrevNextNavigation
- TabNavigation, ProgressSteps, ProcessSteps

**테이블/데이터**

- Table, ScheduleTable
- ScheduleTitle, WeekSelector

**모달/알림**

- AlertModal, LoadSaveModal
- CarDirectionModal, HospitalSearchModal

**섹션**

- SectionTitle, SectionContainer, SectionHeader
- InfoBox, InfoNote, SystemIntroBox

**교통/지도**

- KakaoMap, MapServiceLinks, ShuttleRouteMap
- TransportAccordion, AirportRoute
- AirportBusTable, AirportBusTableAnsan
- SubwayInfoAnsan, CarDirectionButtons
- FloorMapAnsan

**기타**

- AgreementContent, PrivacyConsentContent
- OperationInfoCards, ProcedureFlow
- SearchFilterWithInfo, VerificationCards

### Organisms (35개)

**레이아웃**

- **Header** - 반응형 GNB 메가 드롭다운 메뉴
  - 데스크톱 (1430px+): 호버 시 메가 드롭다운 메뉴
  - 태블릿 (769px~1429px): 풀스크린 슬라이드 다운 메뉴
  - 모바일 (~768px): 사이드 패널 메뉴
- **Footer** - 파트너 슬라이더, 소셜 링크

**인증**

- LoginForm, SignupForm, FindUserForm, ResetPasswordForm

**회원가입 단계**

- AgreementStep, VerificationStep, MemberInfoStep, MemberInfoForm, CompleteStep

**협력병원 신청 단계**

- HospitalInfoStep, StaffInfoStep, BasicTreatmentStep
- BedAndFacilityStep, CareSystemStep
- HospitalCharacteristicsStep, MedicalDepartmentStep

**병의원 신청 단계**

- ClinicInfoStep, ClinicStaffInfoStep, DirectorInfoStep

**홈페이지 섹션**

- HeroSection, NoticeSection
- PartnerSection, ServiceSection, SNSSection

**기타**

- DepartmentSidebar
- DiagnosticDetailModal, ImageViewerModal
- MedicalReplyModal, PathologyResultModal

### Icons (99개)

**기본 UI 아이콘**

- CheckIcon, ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon
- CloseIcon, SearchIcon, EyeIcon, HomeIcon, InfoIcon, WarningIcon
- ArrowDownIcon, ArrowRightIcon, ArrowRightIcon16, ArrowRightLargeIcon, ArrowRightCircleIcon, ArrowDownloadIcon

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

- DownloadIcon, LoadIcon, SaveIcon, PaperclipIcon, PlusIcon, PlusIcon24

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
$color-primary: #9f1836;        // 주홍색(버건디)
$color-secondary: #c09c63;      // 골드/탄색
$color-secondary-bg: #fdf9f4;   // Secondary 배경색
$color-secondary-hover: #dbbf93; // Secondary 호버색
$color-point: #ec5a29;          // 포인트 주황색

// 시스템 색상
$color-error: #ff0000;
$color-red: #ff4141;
$color-blue: #418be2;

// 그레이스케일 (Gray 1~12)
$gray-1: #fdfdfd ~ $gray-12: #202020;

// 다크모드
$color-bg-dark: #0e0f10;
$color-bg-dark-secondary: #16181b;
$color-text-dark: #f2f3f5;
$color-text-dark-secondary: #d6dae1;
// [data-theme='dark'] 지원
```

### 반응형 브레이크포인트

```scss
// 전역 브레이크포인트 (variables.scss)
$breakpoint-sm: 500px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1200px;
$breakpoint-2xl: 1498px;

// Container 최대 너비
$container-max-width: 1530px;

// Header 전용 브레이크포인트 (mixins.scss)
$header-bp-mobile: 768px; // 모바일: ~768px
$header-bp-tablet: 1429px; // 태블릿: 769px ~ 1429px
// 데스크톱: 1430px~
```

## 병원별 라우팅

이 프로젝트는 **URL 프리픽스 방식**으로 하나의 빌드에서 3개 병원을 모두 서빙합니다.

### 라우팅 구조

| URL | 결과 |
| --- | --- |
| `/` | 병원 선택 페이지 |
| `/anam/login` | 안암병원 로그인 |
| `/guro/about/location` | 구로병원 오시는 길 |
| `/ansan/network` | 안산병원 협력네트워크 |
| `/login` (프리픽스 없음) | `/anam/login`으로 리다이렉트 (폴백) |

### 동작 방식

1. **미들웨어** (`src/middleware.ts`) — URL에서 병원 프리픽스 추출 후 `x-hospital-id` 헤더 주입
2. **HospitalContext** — URL 경로 > 환경변수 순으로 병원 ID 결정
3. **Apollo Client** — `x-hospital-code` 헤더로 백엔드에 병원 정보 전달
4. **HospitalLink / useHospitalRouter** — 내부 링크에 자동으로 병원 프리픽스 추가

### 지원 병원

| 병원 ID | 병원명 | URL 프리픽스 |
| --- | --- | --- |
| `anam` | 고려대학교 안암병원 | `/anam/...` |
| `guro` | 고려대학교 구로병원 | `/guro/...` |
| `ansan` | 고려대학교 안산병원 | `/ansan/...` |

## 환경 변수

### 설정 방법

```bash
# 개발 환경
cp .env.example .env.local

# 운영 환경 (.env.production은 next build/start 시 자동 로드)
# NICE 키 등 실제 값을 채워넣은 후 사용
```

### 클라이언트 (브라우저 노출)

| 변수명 | 설명 | 필수 | 예시 |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_HOSPITAL_ID` | 기본 병원 (URL 프리픽스 없을 때 폴백) | O | `anam` |
| `NEXT_PUBLIC_GRAPHQL_URL` | GraphQL API 엔드포인트 | O | `http://localhost:4000/graphql` |
| `NEXT_PUBLIC_KAKAO_MAP_KEY` | 카카오맵 JavaScript 키 | - | Kakao Developers에서 발급 |
| `NEXT_PUBLIC_SKIP_NICE` | NICE 본인인증 스킵 | - | `true` (인증 없이 로그인) |

### 서버 전용

| 변수명 | 설명 | 필수 | 예시 |
| --- | --- | --- | --- |
| `SKIP_CODEGEN` | GraphQL codegen 스킵 | - | `true` (빌드 시 codegen 생략) |
| `NICE_CLIENT_ID` | NICE CheckPlus 클라이언트 ID | - | (운영 시 필요) |
| `NICE_CLIENT_SECRET` | NICE CheckPlus 시크릿 | - | (운영 시 필요) |
| `NICE_PRODUCT_ID` | NICE 상품 ID | - | `2101979031` |

> **참고**: URL 프리픽스로 병원을 구분하므로 병원별 환경파일(`.env.anam` 등)은 불필요합니다.
> `NEXT_PUBLIC_HOSPITAL_ID`는 프리픽스 없는 URL 접근 시 폴백 용도로만 사용됩니다.

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
// 병원 정보 접근
import { useHospital } from '@/hooks'

const MyComponent = () => {
  const { hospital, hospitalId, isAnam, isGuro, isAnsan, pageContent } = useHospital()
  return <div>{hospital.name.full}</div>
}

// 병원 프리픽스 자동 적용 링크
import { HospitalLink } from '@/components/atoms/HospitalLink/HospitalLink'

<HospitalLink href="/login">로그인</HospitalLink>
// 안암병원일 때 → /anam/login

// 병원 프리픽스 자동 적용 라우터
import { useHospitalRouter } from '@/hooks/useHospitalRouter'

const router = useHospitalRouter()
router.push('/login') // → /anam/login
```

## 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (localhost:3000) |
| `npm run build` | 프로덕션 빌드 (빌드 전 `codegen` 자동 실행) |
| `npm start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 검사 |
| `npm run lint:fix` | ESLint 자동 수정 |
| `npm run format` | Prettier 포맷팅 |
| `npm run format:check` | Prettier 포맷 검사 |
| `npm run codegen` | GraphQL 타입 생성 (`src/graphql/__generated__/types.ts`) |
| `npm run codegen:watch` | GraphQL 타입 생성 (watch 모드) |

### 운영 배포

하나의 빌드로 3개 병원을 모두 서빙하므로 병원별 빌드가 필요 없습니다.

```bash
# 빌드 후 실행
npm run build && npm start
```

## 개발 현황

### 퍼블리싱 완료 (전체 36개 페이지)

**메인/인증 (5개)**

- 홈페이지, 로그인, 회원가입(4단계), 아이디/비밀번호 찾기, 비밀번호 재설정

**진료의뢰 (5개)**

- 진료의뢰 소개, 진료협력센터 의뢰, 진료정보교류 의뢰, 심평원중계시스템 의뢰, 진료과 안내

**협력네트워크 (8개)**

- 협력네트워크 소개, 협력병원 신청, 협력병원 신청완료, 협력병의원 신청
- 협력병의원 현황, 교수직통 핫라인, e-Consult 소개, e-Consult 로그인, e-Consult 목록/상세

**공지/정보 (3개)**

- 공지사항 목록/상세, 교육/행사, 병원소식

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
- 로그인 기능
- 회원가입 기능 (4단계)
- 아이디/비밀번호 찾기 기능
- 비밀번호 재설정 기능
