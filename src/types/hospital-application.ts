export interface HospitalFormData {
  hospitalName: string
  medicalInstitutionNumber: string
  postalCode: string
  address: string
  detailAddress: string
  phoneNumber: string
  faxNumber: string
  website: string
}

export interface DirectorFormData {
  directorName: string
  birthDate: string
  licenseNumber: string
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

export interface DepartmentOption {
  value: string
  label: string
}

export const DEPARTMENT_OPTIONS: DepartmentOption[] = [
  { value: '전체', label: '전체' },
  { value: '내과', label: '내과' },
  { value: '외과', label: '외과' },
  { value: '정형외과', label: '정형외과' },
  { value: '신경외과', label: '신경외과' },
  { value: '산부인과', label: '산부인과' },
  { value: '소아과', label: '소아과' },
  { value: '이비인후과', label: '이비인후과' },
  { value: '안과', label: '안과' },
  { value: '피부과', label: '피부과' },
  { value: '정신건강의학과', label: '정신건강의학과' },
  { value: '재활의학과', label: '재활의학과' },
  { value: '마취통증의학과', label: '마취통증의학과' },
  { value: '영상의학과', label: '영상의학과' },
  { value: '병리과', label: '병리과' },
  { value: '진단검사의학과', label: '진단검사의학과' },
  { value: '응급의학과', label: '응급의학과' }
]

export interface StaffFormData {
  staffName: string
  department: string
  position: string
  contactNumber: string
  mobilePhone: string
}

export type MedicalInstitutionType = '상급종합병원' | '종합병원' | '병원' | '전문병원' | '요양병원' | '한방병원'

export interface PersonnelFormData {
  totalEmployees: string
  specialists: string
  nurses: string
}
