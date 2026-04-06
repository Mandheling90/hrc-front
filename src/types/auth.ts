export type UserType = 'ADMIN' | 'DOCTOR' | 'HOSPITAL' | 'MEMBER' | 'CONSULTANT'

export type HospitalCode = 'ANAM' | 'GURO' | 'ANSAN'

export type Gender = 'M' | 'F'

export type UserStatus = 'ACTIVE' | 'PENDING' | 'REJECTED' | 'WITHDRAWN'

export type DoctorType = 'DOCTOR' | 'DENTIST' | 'ORIENTAL_DOCTOR'

export interface UserProfile {
  birthDate: string | null
  department: string | null
  gender: Gender | null
  hospAddress: string | null
  hospAddressDetail: string | null
  hospCode: string | null
  hospName: string | null
  hospPhone: string | null
  hospWebsite: string | null
  hospZipCode: string | null
  careInstitutionNo: string | null
  licenseNo: string | null
  representative: string | null
  doctorType: DoctorType | null
  isDirector: boolean | null
  school: string | null
  smsConsent: boolean
  emailConsent: boolean
  replyConsent: boolean
  specialty: string | null
  graduationYear: string | null
  trainingHospital: string | null
}

export interface AuthUser {
  id: string
  userId: string
  email: string
  userName: string
  userType: UserType
  hospitalCode: HospitalCode
  hospitalId: string | null
  doctorId: string | null
  phone: string | null
  status: UserStatus
  mustChangePw: boolean
  profile: UserProfile | null
  createdAt: string
  updatedAt: string
}

export interface LoginFormData {
  userId: string
  password: string
}

export interface SignupFormData {
  userName: string
  birthDate: string
  phone: string
  doctorType: string
  userId: string
  password: string
  passwordConfirm: string
  email: string
  licenseNo: string
  isDirector: boolean
  school: string
  department: string
  specialty?: string
  graduationYear?: string
  trainingHospital?: string
  smsConsent: boolean
  emailConsent: boolean
  replyConsent: boolean
  hospName: string
  careInstitutionNo: string
  hospZipCode: string
  hospAddress: string
  hospAddressDetail?: string
  hospPhone: string
  hospWebsite?: string
}
