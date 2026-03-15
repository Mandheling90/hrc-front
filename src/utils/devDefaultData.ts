/**
 * 개발 모드 전용: 협력병원/의원 신청 필수값 자동 채움 데이터
 * process.env.NODE_ENV === 'development' 일 때만 사용
 */
import type {
  HospitalInfoStepData,
  DirectorInfoStepData,
  StaffInfoStepData,
  BedAndFacilityStepData,
  ClinicStaffInfoStepData
} from '@/types/partner-application'

/** 병원 정보 중 UserProfile에 없는 필드 (팩스번호) */
export const DEV_HOSPITAL_EXTRA: Partial<HospitalInfoStepData> = {
  faxNumber: '02-1234-5679'
}

/** 병원장 정보 중 UserProfile에 없거나 null일 수 있는 필드 */
export const DEV_DIRECTOR_EXTRA: Partial<DirectorInfoStepData> = {
  phone: '010-9999-8888',
  gender: '남자',
  graduationYear: '2000',
  trainingHospital: '고려대학교 안암병원',
  carNumber: '12가3456'
}

export const DEV_STAFF_INFO: Partial<StaffInfoStepData> = {
  staffName: '[DEV] 김실무',
  deptType: '부서',
  department: '진료협력팀',
  position: '팀장',
  contactNumber: '02-1234-5670',
  mobilePhone: '010-8888-7777',
  staffEmail: 'dev-staff@hospital.dev',
  medicalInstitutionType: '병원',
  totalEmployees: '150',
  specialists: '30',
  nurses: '60'
}

export const DEV_BED_FACILITY: Partial<BedAndFacilityStepData> = {
  totalBedCount: '200',
  operatingBeds: '180'
}


export const DEV_CLINIC_STAFF_INFO: Partial<ClinicStaffInfoStepData> = {
  staffName: '[DEV] 김실무',
  deptType: '부서',
  department: '원무과',
  position: '실장',
  contactNumber: '02-9876-5432',
  mobilePhone: '010-7777-6666',
  staffEmail: 'dev-clinic@clinic.dev',
  medicalInstitutionType: '의원',
  totalBeds: '10',
  totalStaff: '8',
  specialists: '2',
  nurses: '3',
  mainEquipment: 'X-ray, 초음파'
}
