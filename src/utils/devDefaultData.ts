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

/** e-Consult 자문의 기본값 (dev 전용) */
export const DEV_ECONSULT_DOCTOR = {
  doctorId: 'anam-consult-01',
  doctorName: '김감염',
  department: '',
  displayText: '김감염'
}

/** e-Consult 자문의 목록 하드코딩 (dev 전용, adminEconsultConsultants 권한 문제 우회) */
export const DEV_ECONSULT_CONSULTANTS = [
  { id: '8038e836-ab40-4edf-b7d9-a614cf28b871', doctorId: '55030', name: '가정의학과일반', email: 'test@test.com', departmentName: '가정의학과' },
  { id: '8a949966-3154-4219-be23-700e9dceb474', doctorId: 'anam-consult-01', name: '김감염', email: 'econsult-anam-01@kumc.or.kr', departmentName: '감염내과' },
  { id: '7cb34e7a-ca0d-4821-81a8-dac6e1c5ada1', doctorId: '09259', name: '김동식', email: 'jhw811@gmail.com', departmentName: '간담췌외과' },
  { id: '826022e4-ec37-47fd-9b19-2f16b00ed86b', doctorId: '03076', name: '김양현', email: 'test2@test.com', departmentName: '가정의학과' },
  { id: '971fe074-b7fe-47e3-9a3a-901ced9434a9', doctorId: 'anam-consult-02', name: '박소아', email: 'econsult-anam-02@kumc.or.kr', departmentName: '소아청소년과' },
  { id: '12e30456-54ca-4399-b189-280440fc577f', doctorId: 'anam-consult-06', name: '오피부', email: 'econsult-anam-06@kumc.or.kr', departmentName: '피부과' },
  { id: '036e1162-4881-449d-9efe-0290114dbab8', doctorId: 'anam-consult-07', name: '윤비뇨', email: 'econsult-anam-07@kumc.or.kr', departmentName: '비뇨의학과' },
  { id: 'd3da27af-d624-4a14-85c4-14aab489a600', doctorId: 'anam-consult-03', name: '이가정', email: 'econsult-anam-03@kumc.or.kr', departmentName: '가정의학과' },
  { id: '7f4c19f6-5f11-4f2a-bbab-e14b267549af', doctorId: 'anam-consult-08', name: '임신경', email: 'econsult-anam-08@kumc.or.kr', departmentName: '뇌신경센터(신경과)' },
  { id: 'f7d9da97-6f77-4e42-8798-c35ac03d9d2d', doctorId: 'anam-consult-05', name: '정정형', email: 'econsult-anam-05@kumc.or.kr', departmentName: '정형외과' },
  { id: '8f63e22b-f4e5-4102-9f45-b0545cfde2c6', doctorId: 'anam-consult-10', name: '조내분비', email: 'econsult-anam-10@kumc.or.kr', departmentName: '내분비내과' },
  { id: '89a0ecf2-881b-4167-b628-ec6dbca32e39', doctorId: 'anam-consult-04', name: '최호흡', email: 'econsult-anam-04@kumc.or.kr', departmentName: '호흡기내과' },
  { id: '15b91483-dbc5-47fa-aaed-ea9459b17f69', doctorId: 'anam-consult-09', name: '한안과', email: 'econsult-anam-09@kumc.or.kr', departmentName: '안과' }
]

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
