# Project Guidelines

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **GraphQL**: Apollo Client 4 + `@apollo/client-integration-nextjs`
- **Code Generation**: GraphQL Code Generator (codegen.ts → `src/graphql/__generated__/types.ts`)
- **Styling**: SCSS Modules + Sass 1.97
- **Linting/Formatting**: ESLint + Prettier
- **Testing**: Playwright (설정 완료, 테스트 미작성)

## Architecture

- 멀티테넌트 SaaS: 고려대학교 3개 병원(안암/구로/안산)을 단일 코드베이스로 운영
- 병원별 환경 변수(`.env.anam`, `.env.guro`, `.env.ansan`)로 구분
- `HospitalContext` + `useHospital` 훅으로 병원별 설정/콘텐츠 주입
- `AuthContext` + `useAuth` 훅으로 인증 상태 관리 (JWT 토큰 기반)
- Apollo Client로 GraphQL 백엔드 연동 (인증 API 구현 완료)

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
│   └── providers/          # Context Provider (ApolloWrapper, AuthProvider, HospitalProvider)
├── config/                 # 병원별 설정 (hospitals.ts, pageContents.ts, iconRegistry.tsx)
├── contexts/               # React Context (HospitalContext, AuthContext)
├── graphql/                # GraphQL 스키마 및 오퍼레이션
│   ├── schema.graphql      # GraphQL 스키마 정의
│   ├── auth/               # 인증 관련 쿼리/뮤테이션
│   │   ├── mutations.ts    # LOGIN, SIGNUP, LOGOUT 뮤테이션
│   │   └── queries.ts      # ME 쿼리
│   └── __generated__/      # GraphQL Code Generator 자동 생성 타입
├── hooks/                  # 커스텀 훅 (useHospital, useLogin, useSignup, useMe, useLogout)
├── lib/
│   └── apollo/             # Apollo Client 설정
│       ├── client.ts       # Apollo Client 인스턴스 생성 (인증 헤더 주입)
│       └── ApolloWrapper.tsx  # Apollo Provider 래퍼 컴포넌트
├── styles/                 # 글로벌 스타일
│   ├── variables.scss      # 디자인 토큰 (색상, 타이포, 간격, 브레이크포인트)
│   ├── mixins.scss         # SCSS 믹스인 (반응형, 레이아웃, 타이틀)
│   └── globals.scss        # 전역 리셋 + CSS 변수 + 유틸리티 클래스
├── types/                  # 공용 타입 및 상수
│   ├── auth.ts             # 인증 타입 (AuthUser, LoginFormData, SignupFormData)
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
- **인증 상태**: React Context (`AuthContext`) — JWT 토큰, 사용자 정보 (localStorage 기반 영속화)
- **서버 상태**: Apollo Client — GraphQL 쿼리/뮤테이션 캐싱
- **로컬 상태**: `useState` — 폼 필드별 개별 상태
- **파생 값**: `useMemo` — 조건부 옵션 목록 등
- **DOM 참조**: `useRef` — 파일 입력, 모달 포커스 등
- **외부 상태 라이브러리 없음** (Redux, Zustand 등 미사용)

## GraphQL

- **스키마**: `src/graphql/schema.graphql` — 백엔드 API 계약 정의
- **오퍼레이션 파일**: 도메인별 디렉토리에 `mutations.ts`, `queries.ts`로 분리
  - 예: `src/graphql/auth/mutations.ts`, `src/graphql/auth/queries.ts`
- **코드 생성**: `codegen.ts` 설정 → `npm run codegen`으로 타입 자동 생성
  - 출력: `src/graphql/__generated__/types.ts`
- **Apollo Client**: `src/lib/apollo/client.ts`에서 인증 헤더(Bearer 토큰) 자동 주입
- **커스텀 훅**: GraphQL 오퍼레이션을 래핑한 훅 사용
  - `useLogin()`, `useSignup()`, `useLogout()`, `useMe()` — 인증 관련
- **새 GraphQL 오퍼레이션 추가 시**: 해당 도메인 디렉토리에 파일 생성 후 `codegen` 실행
- **GraphQL 엔드포인트**: `NEXT_PUBLIC_GRAPHQL_URL` 환경 변수로 설정 (테스트: `https://refer-front-test.vercel.app/api/graphql`)
- **백엔드 스키마 확인 규칙**: 프론트에서 API로 데이터를 보내거나 받을 때, 필드 값의 포맷이 애매한 경우(enum 코드값 vs 표시 텍스트, 날짜 형식 등) 반드시 백엔드 introspection으로 실제 타입/enum 값을 확인할 것
  - `curl -s -X POST $GRAPHQL_URL -H "Content-Type: application/json" -d '{"query":"{ __type(name: \"타입명\") { fields { name type { name kind ofType { name } } } enumValues { name } } }"}'`
  - 예: `directorGender`가 `String` 타입이더라도, 관련 enum(`Gender`)이 `M`/`F`이면 코드값으로 변환하여 전송
  - 예: `DateTime` 스칼라로 내려오는 값(`2000-01-01T00:00:00.000Z`)은 `YYYY-MM-DD`로 정규화 후 전송
  - **UI 표시값과 API 전송값이 다를 수 있음**: 폼에서는 `"남자"/"여자"`, `"동의"/"비동의"` 등 한글로 표시하지만 API에는 `"M"/"F"`, `true/false` 등 코드값으로 변환해서 보내야 함. mapper(`partnerApplicationMapper.ts`)에서 변환 처리
