// ── 협력 병·의원 신청 Step별 데이터 인터페이스 ──

/** Step ref 핸들 (각 Step이 노출하는 메서드) */
export interface StepRef<T> {
  getData: () => T
  /** 필수값 검증. 미충족 시 에러 메시지 반환, 통과 시 null */
  validate?: () => string | null
}

/** Step 1: 병원 정보 */
export interface HospitalInfoStepData {
  hospitalName: string
  medicalInstitutionNumber: string
  zipCode: string
  address: string
  detailAddress: string
  phoneNumber: string
  faxNumber: string
  website: string
}

/** Step 2: 병원장 정보 */
export interface DirectorInfoStepData {
  directorName: string
  birthDate: string
  licenseNumber: string
  isDirector: boolean
  phone: string
  gender: string
  carNumber: string
  email: string
  school: string
  graduationYear: string
  trainingHospital: string
  department: string
  specialty: string
  smsConsent: string
  emailConsent: string
  replyConsent: string
}

/** Step 3: 실무자 정보 */
export interface StaffInfoStepData {
  staffName: string
  deptType: '부서' | '진료과'
  department: string
  position: string
  contactNumber: string
  mobilePhone: string
  medicalInstitutionType: string
  totalEmployees: string
  specialists: string
  nurses: string
}

/** Step 4: 병상 및 시설 운영 현황 */
export interface BedAndFacilityStepData {
  operatingBeds: string
  premiumRoomChecked: boolean
  premiumRoomCount: string
  multiPersonRoomChecked: boolean
  multiPersonRoomCount: string
  isolationRoomChecked: boolean
  isolationRoomCount: string
  icuChecked: boolean
  icuCount: string
  emergencyRoomChecked: boolean
  emergencyRoomCount: string
  dialysisRoom: string
  surgeryRoom: string
  hospice: string
  psychiatricWard: { general: boolean; closed: boolean }
  rehabilitationTherapy: {
    physical: boolean
    occupational: boolean
    speech: boolean
    swallowing: boolean
    isolation: boolean
  }
}

/** Step 5: 간병 시스템 */
export interface CareSystemStepData {
  integratedNursingCare: string
  guardianNursingCare: string
  jointNursingCare: string
  isolationWardOperation: string
  singleRoom: string
  doubleRoom: string
  tripleRoom: string
  isolationType: {
    vre: boolean
    cre: boolean
    cpe: boolean
    tb: boolean
    other: boolean
  }
  isolationTypeOther: string
  nursingDuringIsolation: {
    joint: boolean
    individual: boolean
    guardian: boolean
  }
  rehabilitationDuringIsolation: {
    no: boolean
    bedside: boolean
    isolationWard: boolean
  }
}

/** Step 6: 진료과 운영 현황 및 주요 보유 장비 */
export interface MedicalDepartmentStepData {
  departments: Record<string, { checked: boolean; count: string }>
  equipment: Record<string, boolean>
  otherEquipment: string[]
}

/** Step 7: 기본 처치 가능 항목 */
export interface BasicTreatmentStepData {
  management: Record<string, boolean>
  prescription: Record<string, boolean>
  dressing: Record<string, boolean>
  treatment: Record<string, boolean>
  otherItems: string[]
}

/** 의원 Step 3: 실무자 정보 + 병상/시설/장비 + 세부정보 */
export interface ClinicStaffInfoStepData {
  staffName: string
  deptType: '부서' | '진료과'
  department: string
  position: string
  contactNumber: string
  mobilePhone: string
  medicalInstitutionType: string
  totalBeds: string
  totalStaff: string
  specialists: string
  nurses: string
  mainEquipment: string
  physicalTherapyRoom: string
  dialysis: { blood: boolean; peritoneal: boolean }
  medication: string
  dermatology: { phototherapy: boolean; excimerLaser: boolean }
  otolaryngology: { earSurgeryDisinfection: boolean; betadineSoaking: boolean }
  other: { surgicalSiteDisinfection: boolean; stitchOut: boolean; chemoportNeedleOut: boolean }
}

/** Step 8: 병원특성 및 기타사항 */
export interface HospitalCharacteristicsStepData {
  hospitalCharacteristics: string
  files: File[]
}
