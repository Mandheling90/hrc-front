// Custom React Hooks

// Hospital Hook - 병원별 설정 접근
export { useHospital } from '@/contexts/HospitalContext'

// Auth Hooks - 인증 관련
export { useLogin, useSignup, useMe, useMyProfile, useWithdrawMember, useLogout } from '@/hooks/useAuth'
export { useAuthContext } from '@/contexts/AuthContext'

// Hospital Hooks - 협력 병·의원 관련
export { useSearchCollaboratingHospitals, useGetCollaboratingHospitalInfo, useRegisterHospital } from '@/hooks/useCollaboratingHospital'

// Referral Patient Hooks - 의뢰환자 조회
export { useReferralPatients } from '@/hooks/useReferralPatients'

// Referral Reply Hooks - 진료회신서 조회
export { useReferralReply } from '@/hooks/useReferralReply'

// Visit History Hooks - 수진이력 조회
export { useVisitHistory } from '@/hooks/useVisitHistory'

// Exam Result Hooks - 검사결과 조회
export { useExamResults, useExamSlips, useSpecialExamResults, useDrugOrders } from '@/hooks/useExamResults'

// Partner Application Hooks - 협력 병·의원 신청
export {
  useApplyPartnerHospital,
  useMyPartnerApplication,
  useMyPartnerApplications,
  useMyPartnerUpdateRequest,
  usePartnerApplicationById,
  useUpdatePartnerApplication
} from '@/hooks/usePartnerApplication'

// Enum Hooks - 코드 목록 조회
export { useEnums } from '@/hooks/useEnum'

// NICE 본인인증
export { useNiceVerification } from '@/hooks/useNiceVerification'

// Consultant e-Consult Hooks - 자문의 e-Consult 할당 확인
export { useConsultantEConsults } from '@/hooks/useConsultantEConsults'

// Hospital Router Hooks - URL 경로 기반 병원 라우팅
export { useHospitalRouter } from '@/hooks/useHospitalRouter'
export { useHospitalPathname } from '@/hooks/useHospitalPathname'

// Hospital SNS
export { useHospitalSns } from '@/hooks/useHospitalSns'

// Hospital News - 병원소식
export { useHospitalNews } from '@/hooks/useHospitalNews'

// Hospital Lectures - 병원 강의/교육
export { useHospitalLectures } from '@/hooks/useHospitalLectures'

// Menu Hooks - GNB 메뉴
export { useMenus } from '@/hooks/useMenus'

// Popup/Banner Hooks - 팝업/배너 관련
export { useSlideBanners } from '@/hooks/useSlideBanners'
export { useMiniBanners } from '@/hooks/useMiniBanners'
export { useActivePopups } from '@/hooks/useActivePopups'
