// Custom React Hooks

// Hospital Hook - 병원별 설정 접근
export { useHospital } from '@/contexts/HospitalContext'

// Auth Hooks - 인증 관련
export { useLogin, useSignup, useMe, useLogout } from '@/hooks/useAuth'
export { useAuthContext } from '@/contexts/AuthContext'

// Hospital Hooks - 협력 병·의원 관련
export { useSearchCollaboratingHospitals, useRegisterHospital } from '@/hooks/useCollaboratingHospital'

// Partner Application Hooks - 협력 병·의원 신청
export {
  useApplyPartnerHospital,
  useSaveDraftPartnerApplication,
  useSubmitPartnerApplication,
  useCancelPartnerApplication,
  useMyPartnerApplication,
  useMyPartnerApplications,
  usePartnerApplicationById
} from '@/hooks/usePartnerApplication'

// NICE 본인인증
export { useNiceVerification } from '@/hooks/useNiceVerification'

// Popup/Banner Hooks - 팝업/배너 관련
export { useSlideBanners } from '@/hooks/useSlideBanners'
export { useMiniBanners } from '@/hooks/useMiniBanners'
