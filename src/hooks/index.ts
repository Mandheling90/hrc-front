// Custom React Hooks

// Hospital Hook - 병원별 설정 접근
export { useHospital } from '@/contexts/HospitalContext'

// Auth Hooks - 인증 관련
export { useLogin, useSignup, useMe, useLogout } from '@/hooks/useAuth'
export { useAuthContext } from '@/contexts/AuthContext'

// NICE 본인인증
export { useNiceVerification } from '@/hooks/useNiceVerification'
