# Project Guidelines

## Component Rules

- **Select 옵션 데이터**: Select 컴포넌트에 사용하는 옵션 배열은 컴포넌트 내부에 인라인으로 정의하지 말 것. `@/types/hospital-application.ts` 등 공용 타입 파일에 정의하고 import해서 사용할 것.
  - 예: `DEPARTMENT_OPTIONS`, `STAFF_DEPARTMENT_OPTIONS`, `MEDICAL_DEPARTMENT_OPTIONS`
  - 새로운 Select 옵션이 필요하면 해당 타입 파일에 추가 후 import

## Styling

- SCSS Modules 사용 (`*.module.scss`)
- 디자인 토큰은 `@/styles/variables.scss`에 정의된 변수 사용
- Atomic Design 패턴: Atoms > Molecules > Organisms > Templates

## Project Structure

- `@/types/` - 공용 타입 및 상수 정의
- `@/components/atoms/` - 기본 UI 컴포넌트 (Button, Input, Select, Radio, Checkbox 등)
- `@/components/molecules/` - 복합 컴포넌트
- `@/components/organisms/` - 도메인별 대형 컴포넌트
