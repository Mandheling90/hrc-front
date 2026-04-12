/**
 * 쿠키 기반 임시저장 유틸리티
 * - Step별로 분리 저장 (쿠키 4KB 제한 대응)
 * - 유효기간: 7일
 * - File 객체는 직렬화 불가하므로 제외
 */

const DRAFT_COOKIE_PREFIX = 'draft'
const EXPIRY_DAYS = 7

/** 쿠키 설정 */
function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`
}

/** 쿠키 읽기 */
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

/** 쿠키 삭제 */
function deleteCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`
}

/** 쿠키 이름 생성 (예: draft_hospital_anam_step1) */
function cookieName(type: 'hospital' | 'clinic', hospitalId: string, step: number) {
  return `${DRAFT_COOKIE_PREFIX}_${type}_${hospitalId}_step${step}`
}

/** 메타 쿠키 이름 (저장된 step 목록 관리) */
function metaCookieName(type: 'hospital' | 'clinic', hospitalId: string) {
  return `${DRAFT_COOKIE_PREFIX}_${type}_${hospitalId}_meta`
}

/**
 * Step 데이터에서 직렬화 불가능한 필드(File 등) 제거
 */
function sanitizeStepData<T>(data: T): T {
  if (!data || typeof data !== 'object') return data
  const sanitized = { ...data } as Record<string, unknown>
  for (const [key, value] of Object.entries(sanitized)) {
    if (value instanceof File || value instanceof FileList) {
      delete sanitized[key]
    } else if (Array.isArray(value)) {
      sanitized[key] = value.filter(item => !(item instanceof File))
      // 파일 배열이 전부 제거되면 빈 배열 유지
    }
  }
  return sanitized as T
}

/**
 * 임시저장 데이터를 쿠키에 저장
 */
export function saveDraftToCookie(
  type: 'hospital' | 'clinic',
  hospitalId: string,
  allStepData: Record<string, unknown>
) {
  const totalSteps = type === 'hospital' ? 8 : 4
  const savedSteps: number[] = []

  for (let i = 1; i <= totalSteps; i++) {
    const stepKey = `step${i}`
    const stepData = allStepData[stepKey]
    if (stepData) {
      const sanitized = sanitizeStepData(stepData)
      const json = JSON.stringify(sanitized)
      setCookie(cookieName(type, hospitalId, i), json, EXPIRY_DAYS)
      savedSteps.push(i)
    }
  }

  // 메타 정보 저장 (어떤 step이 저장되었는지)
  setCookie(metaCookieName(type, hospitalId), JSON.stringify(savedSteps), EXPIRY_DAYS)
}

/**
 * 쿠키에서 임시저장 데이터 불러오기
 * @returns 저장된 step 데이터 객체, 없으면 null
 */
export function loadDraftFromCookie(
  type: 'hospital' | 'clinic',
  hospitalId: string
): Record<string, unknown> | null {
  const metaRaw = getCookie(metaCookieName(type, hospitalId))
  if (!metaRaw) return null

  try {
    const savedSteps: number[] = JSON.parse(metaRaw)
    if (!savedSteps.length) return null

    const result: Record<string, unknown> = {}
    for (const step of savedSteps) {
      const raw = getCookie(cookieName(type, hospitalId, step))
      if (raw) {
        result[`step${step}`] = JSON.parse(raw)
      }
    }

    return Object.keys(result).length > 0 ? result : null
  } catch {
    return null
  }
}

/**
 * 임시저장 쿠키 삭제
 */
export function clearDraftCookie(type: 'hospital' | 'clinic', hospitalId: string) {
  const totalSteps = type === 'hospital' ? 8 : 4
  for (let i = 1; i <= totalSteps; i++) {
    deleteCookie(cookieName(type, hospitalId, i))
  }
  deleteCookie(metaCookieName(type, hospitalId))
}

/**
 * 임시저장 데이터 존재 여부 확인
 */
export function hasDraftCookie(type: 'hospital' | 'clinic', hospitalId: string): boolean {
  return getCookie(metaCookieName(type, hospitalId)) !== null
}
