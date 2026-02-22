import { HospitalId } from '@/types/hospital'

const VALID_HOSPITALS: HospitalId[] = ['anam', 'guro', 'ansan']

/**
 * URL pathname에서 병원 ID를 추출
 * 예: '/anam/login' → 'anam', '/guro' → 'guro', '/login' → null
 */
export function getHospitalFromPath(pathname: string): HospitalId | null {
  const firstSegment = pathname.split('/')[1]
  if (VALID_HOSPITALS.includes(firstSegment as HospitalId)) {
    return firstSegment as HospitalId
  }
  return null
}

/**
 * pathname에서 병원 prefix를 제거한 경로를 반환
 * 예: '/anam/login' → '/login', '/anam' → '/'
 */
export function stripHospitalPrefix(pathname: string): string {
  const hospitalId = getHospitalFromPath(pathname)
  if (!hospitalId) return pathname
  const rest = pathname.slice(`/${hospitalId}`.length)
  return rest || '/'
}

/**
 * 경로에 병원 prefix를 추가
 * 예: hospitalLink('/login', 'anam') → '/anam/login'
 */
export function prefixHospitalPath(path: string, hospitalId: HospitalId): string {
  // 외부 URL이면 그대로 반환
  if (path.startsWith('http') || path.startsWith('//') || path.startsWith('#')) {
    return path
  }
  // 이미 병원 prefix가 있으면 그대로 반환
  if (getHospitalFromPath(path)) {
    return path
  }
  // prefix 추가
  return `/${hospitalId}${path.startsWith('/') ? '' : '/'}${path}`
}
