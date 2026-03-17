/** NICE 본인인증 결과 데이터 */
export interface NiceVerifiedData {
  name: string
  phone: string | null
  birthDate: string
  gender: string
  /** 중복가입 확인값 (Duplication Information) */
  di: string
  /** 연계정보 확인값 (Connecting Information) */
  ci: string
  /** 인증 방법 */
  authMethod: string
  /** 국적 정보 */
  nationalInfo: string | null
  /** 후속 작업용 토큰 (아이디 찾기, 비밀번호 재설정 등) */
  verificationToken: string | null
}

/** NICE 콜백 팝업 → 부모 창 postMessage 데이터 */
export interface NiceCallbackData {
  type: 'NICE_CALLBACK'
  webTransactionId: string
}

/** useNiceVerification 훅 옵션 */
export interface UseNiceVerificationOptions {
  /** 중복 가입 체크 여부 (회원가입 시 true) */
  checkDuplicate?: boolean
}

/** useNiceVerification 훅 반환 타입 */
export interface UseNiceVerificationReturn {
  requestVerification: () => void
  isVerified: boolean
  verifiedData: NiceVerifiedData | null
  isLoading: boolean
  error: string | null
  isDuplicate: boolean
  reset: () => void
}
