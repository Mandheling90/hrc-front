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
import type { Metadata } from "next";
import { useState } from 'react';
import { SomeLibrary } from 'third-party-lib';
import { Button } from '@/components/atoms/Button';
import type { User } from '@/types/user';
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
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
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
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
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
export * from "./atoms";
export * from "./molecules";
export * from "./organisms";
export * from "./templates";
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