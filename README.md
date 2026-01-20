# hrc-front

진료협력센터 프론트 구축

## 기술 스택

| 항목        | 버전/기술                           |
| ----------- | ----------------------------------- |
| Framework   | Next.js 15.0.0 (App Router)         |
| React       | 19.0.0                              |
| 언어        | TypeScript (strict mode)            |
| 스타일링    | SCSS + CSS Modules                  |
| 상태 관리   | React Context API (HospitalContext) |
| 코드 스타일 | EditorConfig + ESLint + Prettier    |
| 렌더링      | CSR (Client-Side Rendering)         |
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
│   ├── referral/        # 진료의뢰 페이지
│   │   └── request/     # 진료협력센터 의뢰
│   │       └── exchange/ # 진료정보교류 의뢰
│   └── style-guide/     # 스타일 가이드 페이지
│
├── components/          # Atomic Design 패턴
│   ├── atoms/           # Button, Input, Checkbox, Radio, Select, InputLabel
│   ├── molecules/       # ServiceCard, AlertModal, ProgressSteps 등
│   ├── organisms/       # Header, Footer, LoginForm, SignupForm 등
│   ├── templates/       # MainTemplate
│   ├── icons/           # SVG 아이콘 컴포넌트
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

| 경로                         | 설명                 | 주요 컴포넌트                                          |
| ---------------------------- | -------------------- | ------------------------------------------------------ |
| `/`                          | 홈페이지             | HeroSection, NoticeSection, SNSSection, PartnerSection |
| `/login`                     | 로그인               | LoginForm                                              |
| `/signup`                    | 회원가입 (4단계)     | SignupForm, ProgressSteps                              |
| `/find-user`                 | 아이디/비밀번호 찾기 | FindUserForm, FindPasswordForm                         |
| `/referral`                  | 진료의뢰             | ServiceCard                                            |
| `/referral/request`          | 진료협력센터 의뢰    | ServiceSection, InfoBox, Breadcrumbs                   |
| `/referral/request/exchange` | 진료정보교류 의뢰    | SectionTitle, ServiceSection, InfoBox                  |
| `/style-guide`               | 스타일 가이드        | 모든 UI 컴포넌트 및 디자인 토큰                        |

## 스타일 가이드

프로젝트의 모든 UI 컴포넌트와 디자인 토큰을 한눈에 확인할 수 있는 스타일 가이드 페이지를 제공합니다.

### 접속 방법

```bash
npm run dev
# http://localhost:3000/style-guide 접속
```

### 포함 내용

| 섹션              | 설명                                                                       |
| ----------------- | -------------------------------------------------------------------------- |
| **Colors**        | Primary, System, Gray Scale, Dark Mode 색상 팔레트                         |
| **Typography**    | Font Families, Sizes, Weights, Line Heights                                |
| **Spacing**       | $spacing-1 ~ $spacing-24 (4px ~ 96px)                                      |
| **Border Radius** | $radius-sm ~ $radius-full                                                  |
| **Shadow**        | $shadow-sm ~ $shadow-xl                                                    |
| **Breakpoints**   | 반응형 브레이크포인트 ($breakpoint-sm ~ $breakpoint-2xl)                   |
| **Z-index**       | 레이어 순서 ($z-index-dropdown ~ $z-index-tooltip)                         |
| **Transitions**   | 애니메이션 속도 ($transition-fast ~ $transition-slower)                    |
| **Atoms**         | Button, Input, Checkbox, Radio, Select 컴포넌트                            |
| **Molecules**     | ServiceCard, AlertModal, InfoBox, ProgressSteps, Breadcrumbs, SectionTitle |
| **Icons**         | 24개 아이콘 컴포넌트                                                       |

### 다크모드 지원

스타일 가이드 페이지 우측 상단의 **다크모드 토글** 버튼을 클릭하여 라이트/다크 모드에서의 스타일을 확인할 수 있습니다.

## 컴포넌트 구조 (Atomic Design)

### Atoms (6개)

- Button (variant: primary/secondary/outline/gray, size: small/medium/large)
- Input (forwardRef 지원)
- InputLabel
- Checkbox (접근성 지원)
- Radio
- Select

### Molecules (9개)

- ServiceCard, AlertModal, ProgressSteps, AgreementContent
- Breadcrumbs, InfoBox, NoticeList, SystemIntroBox
- SectionTitle (섹션 제목 컴포넌트)

### Organisms (15개)

- Header, Footer
- LoginForm, SignupForm
- FindPasswordForm, FindUserForm
- AgreementStep, VerificationStep, MemberInfoStep, CompleteStep
- HeroSection, NoticeSection, PartnerSection, ServiceSection, SNSSection

### Icons (24개)

- CheckIcon, ChevronDownIcon, ConsultingIcon, EyeIcon, HomeIcon
- InfoIcon, IPinIcon, LinkIcon, NetworkIcon, PatientIcon
- PhoneIcon, ReferralIcon, SearchIcon, ServiceTitleIcon, ShieldIcon
- SystemIcon, WarningIcon
- **진료의뢰 전용 아이콘**:
  - PhoneRequestIcon (전화의뢰)
  - DocumentReferralIcon (문서 진료의뢰)
  - HospitalPortalIcon (심평원 중계포털)
  - SNSTalkIcon (카카오톡 TALK)
  - ContinuityIcon (진료의 연속성)
  - SafetyIcon (환자 안전)
  - QualityIcon (의료서비스 질 향상)

## 스타일 시스템

### CSS 변수

```scss
// 주요 색상
--color-primary: #9f1836 // 주홍색
  --color-secondary: #fae3ba // 베이지색
  --color-point: #ec5a29 // 포인트 주황색
  // 그레이스케일
  --gray-100 ~--gray-900 // 다크모드
  [data-theme= 'dark'] 지원;
```

### 반응형 브레이크포인트

```scss
$breakpoints: (
  sm: 500px,
  md: 720px,
  lg: 1024px,
  xl: 1200px,
  2xl: 1430px
);
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

### 완성된 부분

- UI 컴포넌트 구조 (Atomic Design)
- 6개 주요 페이지 (홈, 로그인, 회원가입, 진료의뢰, 진료협력센터 의뢰, 진료정보교류 의뢰)
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 다크모드 CSS 변수 준비
- 접근성 지원 (ARIA labels, semantic HTML)
- 스타일 시스템 (변수, 믹스인, CSS Modules)
- 병원별 환경 설정 시스템 (안암/구로/안산)
- HospitalContext 및 useHospital 훅
- 병원별 페이지 콘텐츠 관리
- 진료의뢰 전용 아이콘 컴포넌트 (7개)

### 진행 중인 부분

- 회원가입 프로세스 (4단계)
- ProgressSteps 컴포넌트 반응 형

### 미포함 항목(엔드단)

- API 통신 로직
- 백엔드 연동
- 테스트 코드
- 인증/연동 시스템 구현
- 실제 데이터 바인딩
- 지도 API 연동
