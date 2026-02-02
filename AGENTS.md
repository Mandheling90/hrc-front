# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

This is a **진료협력센터 (Medical Cooperation Center)** project built with:

- **Next.js 15** with App Router
- **React 19**
- **TypeScript 5.x**
- **Atomic Design Pattern**

## Development Commands

### Core Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing Commands

```bash
# Note: No test framework is currently configured
# When adding tests, use one of these patterns:
npm run test         # Run all tests (when configured)
npm run test:watch   # Run tests in watch mode (when configured)
npm run test:single   # Run single test file (when configured)
```

### TypeScript Commands

```bash
npx tsc --noEmit     # Type check without emitting files
npx tsc              # Type check and emit declaration files
```

## Code Style Guidelines

### File Structure & Organization

**Atomic Design Pattern:**

```
src/components/
├── atoms/           # Smallest UI elements (Button, Input, Icon)
├── molecules/       # Combinations of atoms (SearchBar, FormField)
├── organisms/       # Complex UI sections (Header, Sidebar)
├── templates/       # Layout structures (PageLayout)
└── pages/          # Final page components (HomePage, DashboardPage)
```

**Directory Structure:**

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable UI components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and configurations
- `src/types/` - TypeScript type definitions
- `src/utils/` - Helper functions

### Import Conventions

**Path Aliases:**

- Use `@/*` for src directory imports (configured in tsconfig.json)
- Example: `import Button from '@/components/atoms/Button'`

**Import Order:**

1. React/Next.js imports
2. Third-party library imports
3. Internal imports (using @ alias)
4. Type imports (use `import type` when possible)

```typescript
// ✅ Correct
import type { Metadata } from 'next'
import { useState } from 'react'
import { SomeLibrary } from 'third-party-lib'
import { Button } from '@/components/atoms/Button'
import type { User } from '@/types/user'
```

### TypeScript Guidelines

**Type Definitions:**

- Use `interface` for object shapes that can be extended
- Use `type` for unions, intersections, and computed types
- Export types from `src/types/index.ts` when reusable
- Use `import type` for type-only imports

**Component Props:**

```typescript
// ✅ Use interfaces for component props
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
  // Component logic
}
```

**Generic Types:**

- Use descriptive generic parameter names (`T`, `K`, `V` are acceptable)
- Provide constraints where necessary

### Component Guidelines

**Functional Components:**

- Use function declarations for components
- Use `export default` for page components
- Use named exports for reusable components
- Use `React.ReactNode` for children prop type

```typescript
// ✅ Page component
export default function HomePage() {
  return <div>Home</div>;
}

// ✅ Reusable component
export function Button({ children }: { children: React.ReactNode }) {
  return <button>{children}</button>;
}
```

**Component Naming:**

- Use PascalCase for component names
- Use descriptive names that reflect functionality
- File names should match component names

### Styling Guidelines

**CSS Approach:**

- Use Tailwind CSS classes (configured with Next.js)
- Follow mobile-first responsive design
- Use semantic class names when possible

**Class Organization:**

```typescript
// ✅ Organize classes logically
<div className="flex flex-col items-center justify-center p-4 space-y-2">
```

### Error Handling

**Type Safety:**

- Enable strict mode in TypeScript (already configured)
- Use proper error boundaries in React components
- Handle async operations with try-catch or proper error handling

**API Calls:**

```typescript
// ✅ Proper async error handling
async function fetchData() {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw error
  }
}
```

### Export Patterns

**Index Files:**

- Use barrel exports in index.ts files
- Re-export all components from their respective directories
- Maintain consistent export patterns

```typescript
// ✅ src/components/index.ts
export * from './atoms'
export * from './molecules'
export * from './organisms'
export * from './templates'
```

### Naming Conventions

**Files:**

- Component files: `PascalCase.tsx`
- Hook files: `useCamelCase.ts`
- Type files: `camelCase.ts`
- Utility files: `camelCase.ts`

**Variables:**

- Use camelCase for variables and functions
- Use PascalCase for types and interfaces
- Use UPPER_SNAKE_CASE for constants

**Functions:**

- Use descriptive verb-based names for functions
- Use `handle` prefix for event handlers
- Use `use` prefix for custom hooks

### Code Quality

**ESLint:**

- Run `npm run lint` before committing
- Fix all linting errors
- Follow Next.js ESLint configuration

**TypeScript:**

- All files must be properly typed
- Avoid `any` type - use proper typing or `unknown`
- Use type guards for runtime type checking

**Comments:**

- Add comments for complex logic
- Use JSDoc for function documentation when needed
- Keep comments concise and relevant

## Next.js Specific Guidelines

**App Router:**

- Use App Router conventions (already configured)
- Server components by default, client components with "use client"
- Proper metadata handling in layout files

**Routing:**

- File-based routing in `src/app/`
- Use route groups for organization when needed
- Proper loading and error states

**Performance:**

- Use Next.js Image optimization
- Implement proper caching strategies
- Optimize bundle size with dynamic imports

## Development Workflow

> **⚠️ 빌드 검증 관련 주의사항:**
> 작업 완료 후 `npm run build`를 자동으로 실행하지 마세요. 빌드 시간이 오래 걸리므로 사용자가 커밋 직전에 직접 수행합니다.

1. **Before coding:**
   - Run `npm run dev` to start development server
   - Check existing patterns in similar components

2. **During coding:**
   - Follow established patterns and conventions
   - Use TypeScript strictly
   - Test in browser frequently

3. **Before committing:**
   - Run `npm run lint`
   - Run `npx tsc --noEmit` for type checking
   - Ensure all imports are correct
   - **빌드 검증은 사용자가 직접 수행** (에이전트가 자동으로 실행하지 않음)

4. **After changes:**
   - Test the functionality thoroughly
   - Check responsive design
   - Verify accessibility if applicable

## Language & Localization

- **Primary Language:** Korean (ko)
- Set `lang="ko"` in HTML
- Use Korean for UI text and comments where appropriate
- Maintain consistent language throughout the application

## Security Considerations

- Validate all user inputs
- Use proper authentication and authorization
- Sanitize data to prevent XSS attacks
- Follow Next.js security best practices
- Never expose sensitive data in client-side code

## Testing Strategy (Future Implementation)

When adding tests, follow these patterns:

- Unit tests for utility functions and hooks
- Component tests for UI components
- Integration tests for user flows
- E2E tests for critical paths

Use testing frameworks compatible with Next.js 15 and React 19.

---

## 공용 컴포넌트 레퍼런스

> **중요:** UI 구현 시 반드시 기존 공용 컴포넌트를 먼저 확인하고 사용하세요. 새 컴포넌트 생성 전에 아래 목록을 검토하세요.

### Atoms (기본 UI 요소)

| 컴포넌트          | 경로                  | 용도                  | 주요 Props                                                                                                              |
| ----------------- | --------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Button**        | `atoms/Button`        | 버튼                  | `variant`: 'primary' \| 'secondary' \| 'outline' \| 'gray', `size`: 'small' \| 'medium' \| 'large', `fullWidth`, `pill` |
| **Input**         | `atoms/Input`         | 입력 필드             | `label`, `error`, `width`                                                                                               |
| **Select**        | `atoms/Select`        | 드롭다운 선택         | `options: {value, label}[]`, `value`, `onChange`, `placeholder`, `width`                                                |
| **Checkbox**      | `atoms/Checkbox`      | 체크박스              | `checked`, `onChange`, `label`, `minWidth`, `alwaysDark`                                                                |
| **Radio**         | `atoms/Radio`         | 라디오 버튼 그룹      | `name`, `value`, `options: {value, label}[]`, `onChange`, `minWidth`                                                    |
| **Textarea**      | `atoms/Textarea`      | 텍스트 영역           | `label`, `error`, `borderless`, `disableFocusHighlight`                                                                 |
| **InputLabel**    | `atoms/InputLabel`    | 입력 라벨             | `htmlFor`, `required`, `children`                                                                                       |
| **StatusBadge**   | `atoms/StatusBadge`   | 상태 뱃지             | `variant`: 'waiting' \| 'expired' \| 'completed'                                                                        |
| **ScrollableBox** | `atoms/ScrollableBox` | 스크롤 박스           | `maxHeight`, `padding`, `hasBorder`, `hasBackground`                                                                    |
| **RouteChip**     | `atoms/RouteChip`     | 노선 칩 (버스/지하철) | `variant`: 'blue' \| 'deepblue' \| 'green' \| 'red' \| 'yellow', `size`: 'small' \| 'large'                             |

### Molecules (Atoms 조합)

| 컴포넌트                 | 경로                             | 용도                      | 주요 Props                                                                                            |
| ------------------------ | -------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Table**                | `molecules/Table`                | 데이터 테이블             | `columns`, `data`, `getRowKey`, `onRowClick`, `scrollableHeight`, `renderMobileCard`                  |
| **Pagination**           | `molecules/Pagination`           | 페이지네이션              | `currentPage`, `totalPages`, `onPageChange`, `maxVisiblePages`                                        |
| **AlertModal**           | `molecules/AlertModal`           | 알림 모달                 | `isOpen`, `message`, `onClose`, `closeButtonText`, `closeOnBackdropClick`                             |
| **Breadcrumbs**          | `molecules/Breadcrumbs`          | 경로 네비게이션           | `items: {label, href?, icon?}[]`                                                                      |
| **FormField**            | `molecules/FormField`            | 폼 필드 (라벨+인풋+버튼)  | `label`, `required`, `id`, `name`, `value`, `onChange`, `buttonText`, `onButtonClick`, `rightElement` |
| **SectionTitle**         | `molecules/SectionTitle`         | 섹션 제목 (아이콘 포함)   | `title`, `showIcon`, `size`: 'default' \| 'small', `noMargin`                                         |
| **InfoNote**             | `molecules/InfoNote`             | 안내 메시지 (아이콘 포함) | `message`                                                                                             |
| **CardList**             | `molecules/CardList`             | 카드 목록                 | `cards: CardRow[][]`, `getCardKey`, `scrollableHeight`, `columns`, `onCardClick`, `variant`           |
| **SearchFilterWithInfo** | `molecules/SearchFilterWithInfo` | 검색 필터 + 안내          | `selectOptions`, `searchValue`, `onSearch`, `infoMessage`                                             |
| **ProgressSteps**        | `molecules/ProgressSteps`        | 진행 단계 표시            | `steps: {id, label}[]`, `currentStep`                                                                 |
| **SectionContainer**     | `molecules/SectionContainer`     | 섹션 래퍼 (구분선 자동)   | `header`, `children`, `scrollable`                                                                    |
| **SectionHeader**        | `molecules/SectionHeader`        | 섹션 헤더                 | `title`, `subtitle`                                                                                   |
| **LabelInputRow**        | `molecules/LabelInputRow`        | 라벨 + 인풋 행            | `labelType`: 'checkbox' \| 'text', `textLabel`, `inputId`, `value`, `onInputChange`                   |
| **CheckboxGroup**        | `molecules/CheckboxGroup`        | 체크박스 그룹             | `options: CheckboxOption[]`, `minWidth`, `gap`, `keepSingleRow`                                       |
| **AddressField**         | `molecules/AddressField`         | 주소 입력 필드            | 주소 검색 + 상세주소 입력                                                                             |
| **DoctorCard**           | `molecules/DoctorCard`           | 의사 정보 카드            | 의사 프로필 표시용                                                                                    |
| **ClinicCard**           | `molecules/ClinicCard`           | 의원 정보 카드            | 의원 정보 표시용                                                                                      |
| **WeekSelector**         | `molecules/WeekSelector`         | 주간 선택기               | 날짜/주 선택용                                                                                        |
| **PrevNextNavigation**   | `molecules/PrevNextNavigation`   | 이전/다음 네비게이션      | 페이지 이동용                                                                                         |

### Organisms (복잡한 UI 섹션)

| 컴포넌트              | 경로                          | 용도                    |
| --------------------- | ----------------------------- | ----------------------- |
| **Header**            | `organisms/Header`            | 사이트 헤더             |
| **Footer**            | `organisms/Footer`            | 사이트 푸터             |
| **LoginForm**         | `organisms/LoginForm`         | 로그인 폼               |
| **SignupForm**        | `organisms/SignupForm`        | 회원가입 폼             |
| **FindUserForm**      | `organisms/FindUserForm`      | 아이디/비밀번호 찾기 폼 |
| **ResetPasswordForm** | `organisms/ResetPasswordForm` | 비밀번호 재설정 폼      |

### Icons

`src/components/icons/` 디렉토리에 70개 이상의 아이콘 컴포넌트가 있습니다.

**자주 사용하는 아이콘:**

- `SearchIcon`, `CheckIcon`, `CloseIcon`, `InfoIcon`, `WarningIcon`
- `ChevronLeftIcon`, `ChevronRightIcon`, `ChevronDownIcon`, `ChevronUpIcon`
- `ArrowRightIcon`, `ArrowDownIcon`, `DownloadIcon`
- `PhoneIcon`, `FaxIcon`, `CalendarIcon`, `HomeIcon`
- `DoctorIcon`, `PatientIcon`, `DocumentIcon`

### 사용 예시

```typescript
// Atoms 사용
import { Button } from '@/components/atoms/Button/Button'
import { Input } from '@/components/atoms/Input/Input'
import { Select } from '@/components/atoms/Select/Select'

// Molecules 사용
import { Table } from '@/components/molecules/Table/Table'
import { Pagination } from '@/components/molecules/Pagination/Pagination'
import { SectionTitle } from '@/components/molecules/SectionTitle/SectionTitle'

// Icons 사용
import { SearchIcon } from '@/components/icons/SearchIcon'
import { CheckIcon } from '@/components/icons/CheckIcon'
```

### 컴포넌트 선택 가이드

1. **버튼이 필요하면** → `Button` (variant로 스타일 조정)
2. **입력 필드가 필요하면** → `Input`, `Select`, `Textarea`, `Checkbox`, `Radio`
3. **테이블이 필요하면** → `Table` + `Pagination`
4. **카드 목록이 필요하면** → `CardList`
5. **모달/알림이 필요하면** → `AlertModal`
6. **폼 필드(라벨+인풋+버튼)가 필요하면** → `FormField`
7. **섹션 제목이 필요하면** → `SectionTitle` 또는 `SectionHeader`
8. **안내 메시지가 필요하면** → `InfoNote`
9. **검색 필터가 필요하면** → `SearchFilterWithInfo`
10. **단계 표시가 필요하면** → `ProgressSteps`
