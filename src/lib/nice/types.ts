/** NICE CheckPlus 본인인증 결과 데이터 */
export interface NiceVerifiedData {
  name: string
  phone: string
  birthDate: string
  gender: 'M' | 'F'
  /** 중복가입 확인값 (Duplication Information) */
  di: string
  /** 연계정보 확인값 (Connecting Information) */
  ci: string
}

/** POST /api/nice/request 응답 */
export interface NiceRequestResponse {
  tokenVersionId: string
  encData: string
  integrityValue: string
}

/** POST /api/nice/decrypt 응답 */
export interface NiceDecryptResponse {
  name: string
  phone: string
  birthDate: string
  gender: 'M' | 'F'
  di: string
  ci: string
}

/** NICE 콜백 팝업 → 부모 창 postMessage 데이터 */
export interface NicePostMessageData {
  type: 'NICE_VERIFICATION_RESULT'
  success: boolean
  data?: NiceVerifiedData
  error?: string
}

/** useNiceVerification 훅 반환 타입 */
export interface UseNiceVerificationReturn {
  requestVerification: () => void
  isVerified: boolean
  verifiedData: NiceVerifiedData | null
  isLoading: boolean
  error: string | null
  reset: () => void
}
