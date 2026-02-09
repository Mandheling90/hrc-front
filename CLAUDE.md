# Project Guidelines

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: SCSS Modules + Sass 1.97
- **Linting/Formatting**: ESLint + Prettier
- **Testing**: Playwright (설정 완료, 테스트 미작성)

## Architecture

- 멀티테넌트 SaaS: 고려대학교 3개 병원(안암/구로/안산)을 단일 코드베이스로 운영
- 병원별 환경 변수(`.env.anam`, `.env.guro`, `.env.ansan`)로 구분
- `HospitalContext` + `useHospital` 훅으로 병원별 설정/콘텐츠 주입
- 백엔드 미연동 상태 (UI/프론트엔드만 구현됨)

## Project Structure

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx          # 루트 레이아웃
│   ├── login/              # 인증 (로그인, 회원가입, 아이디/비밀번호 찾기)
│   ├── signup/
│   ├── find-user/
│   ├── reset-password/
│   ├── referral/           # 진료의뢰 (의뢰센터, HIRA, 진료교류, 진료과 안내)
│   ├── network/            # 협력 네트워크 (병원/의원 신청, 현황, 핫라인, e-Consult)
│   ├── notice/             # 공지사항, 행사, 뉴스
│   ├── about/              # 센터 소개, 인사말, 조직도, 오시는 길
│   ├── mypage/             # 마이페이지 (프로필, 병원/의원 정보, 환자조회/결과)
│   └── style-guide/        # 디자인 시스템 쇼케이스
├── components/
│   ├── atoms/              # 기본 UI (Button, Input, Select, Radio, Checkbox 등 10종)
│   ├── molecules/          # 복합 컴포넌트 (FormField, Modal, Card, Table 등 53종)
│   ├── organisms/          # 도메인별 대형 컴포넌트 (Header, Footer, *Step 등 35종)
│   ├── icons/              # SVG 아이콘 컴포넌트 (99종)
│   ├── templates/          # 페이지 템플릿 (MainTemplate)
│   └── providers/          # Context Provider (HospitalProvider)
├── config/                 # 병원별 설정 (hospitals.ts, pageContents.ts, iconRegistry.tsx)
├── contexts/               # React Context (HospitalContext)
├── hooks/                  # 커스텀 훅 (useHospital)
├── styles/                 # 글로벌 스타일
│   ├── variables.scss      # 디자인 토큰 (색상, 타이포, 간격, 브레이크포인트)
│   ├── mixins.scss         # SCSS 믹스인 (반응형, 레이아웃, 타이틀)
│   └── globals.scss        # 전역 리셋 + CSS 변수 + 유틸리티 클래스
├── types/                  # 공용 타입 및 상수
│   ├── hospital.ts         # 병원 설정/페이지 콘텐츠 타입
│   └── hospital-application.ts  # 폼 데이터 타입 + Select 옵션 상수
└── utils/                  # 유틸리티 함수
```

## Component Rules

- **Atomic Design 패턴**: Atoms > Molecules > Organisms > Templates 순서로 구성
- **Select 옵션 데이터**: 컴포넌트 내부에 인라인으로 정의하지 말 것. `@/types/hospital-application.ts` 등 공용 타입 파일에 정의하고 import해서 사용할 것
  - 예: `DEPARTMENT_OPTIONS`, `STAFF_DEPARTMENT_OPTIONS`, `MEDICAL_DEPARTMENT_OPTIONS`
  - 새로운 Select 옵션이 필요하면 해당 타입 파일에 추가 후 import
- **컴포넌트 파일 구조**: 컴포넌트별 디렉토리에 `.tsx` + `.module.scss` 쌍으로 구성
- **Props 타입**: 컴포넌트 파일 내에 interface로 정의 (예: `ButtonProps`, `InputProps`)
- **forwardRef**: Button 등 네이티브 요소 래핑 컴포넌트는 `React.forwardRef` 사용
- **Client Component**: 상태/이벤트가 필요한 컴포넌트는 파일 최상단에 `'use client'` 선언

## Styling

- **SCSS Modules** 사용 (`*.module.scss`) — 컴포넌트 스코프 스타일링
- **디자인 토큰**: `@/styles/variables.scss`에 정의된 변수 사용
  - 색상: `$color-primary` (#9f1836), `$color-secondary` (#c09c63), `$color-point` (#ec5a29)
  - 그레이스케일: `$gray-1` ~ `$gray-12`
  - 폰트: `$font-family-base` (Pretendard), `$font-family-paperlogy`, `$font-family-mono`
  - 간격: `$spacing-1` (4px) ~ `$spacing-24` (96px)
  - 반지름: `$radius-sm` (4px) ~ `$radius-full` (9999px)
  - 그림자: `$shadow-sm`, `$shadow-md`, `$shadow-lg`, `$shadow-xl`
  - Z-index: `$z-index-dropdown` (1000) ~ `$z-index-tooltip` (1070)
- **SCSS 믹스인**: `@/styles/mixins.scss`
  - 반응형: `@include mobile`, `@include tablet`, `@include desktop`
  - 레이아웃: `@include page-wrap`, `@include page-main`, `@include page-main-simple`
  - 타이틀: `@include page-title-large`, `@include page-title-medium`, `@include section-title`
  - 유틸리티: `@include flex-center`, `@include flex-between`, `@include text-ellipsis`
- **반응형 브레이크포인트** (3단계):
  - Desktop: 1430px+
  - Tablet: 769px ~ 1429px
  - Mobile: ≤768px
- **다크모드**: CSS 변수 기반 (`[data-theme='dark']`), 변수 사전 정의 완료

## Naming Conventions

- **컴포넌트**: PascalCase (예: `HospitalInfoStep`, `ConfirmButtons`)
- **파일명**: 컴포넌트명과 동일 (예: `Button.tsx`, `Button.module.scss`)
- **Props**: `{컴포넌트명}Props` (예: `ButtonProps`)
- **타입/인터페이스**: PascalCase (예: `HospitalFormData`, `DepartmentOption`)
- **상수**: UPPER_SNAKE_CASE (예: `DEPARTMENT_OPTIONS`)
- **SCSS 클래스**: camelCase (SCSS Modules 사용)
- **이벤트 핸들러**: `handle{동작}` (예: `handleSearch`, `handleNumberChange`)

## State Management

- **전역 상태**: React Context (`HospitalContext`) — 병원 설정/콘텐츠
- **로컬 상태**: `useState` — 폼 필드별 개별 상태
- **파생 값**: `useMemo` — 조건부 옵션 목록 등
- **DOM 참조**: `useRef` — 파일 입력, 모달 포커스 등
- **외부 상태 라이브러리 없음** (Redux, Zustand 등 미사용)
