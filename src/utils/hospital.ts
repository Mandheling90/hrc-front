import { HospitalId } from '@/types/hospital'

/**
 * 환경변수에서 현재 병원 ID를 가져옴
 * 서브도메인 별도 배포 방식이므로 빌드 시 고정됨
 */
export function getCurrentHospitalId(): HospitalId {
  const hospitalId = process.env.NEXT_PUBLIC_HOSPITAL_ID as HospitalId
  if (!hospitalId || !['anam', 'guro', 'ansan'].includes(hospitalId)) {
    return 'anam'
  }
  return hospitalId
}
